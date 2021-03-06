require("dotenv").config();
const jwt = require("jsonwebtoken") 
const nodemailer = require("nodemailer");

const sendMail = require("../utils/email")

const pool = require('../config/pool')
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken")
const catchAsync = require("../utils/catchAsync");


const cookieOptions = {
  expires:new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
  path: '/',
  secure: false
}



exports.loginController = catchAsync( async (req,res)=> {
  res.render("login")
})


exports.loginPostController = catchAsync(async (req,res)=>{

   let {email,password} = req.body
   let userExist = await pool.execute(`SELECT * FROM user WHERE email=?`, [email]);
   let hashpassword = await bcrypt.compare(password,userExist[0][0].password)

   console.log(email,hashpassword)
   if(userExist[0].length > 0 && hashpassword){
     
     const {name,email,id,role} = userExist[0][0]
     // JWT  
     const payload = {
        user:{ 
          id:id,
          name:name,
          email:email,
          role:role
        }
      };


    const token = generateToken(payload)
    
    res.cookie('jwt', token, cookieOptions);
    res.redirect("/");
   }else{
    res.redirect(`/auth/login?error=${encodeURIComponent(`CREDENTIAL NOT MATCH`)}`)
     // res.render("login",{errors:[{msg:`credential not match`}]})
   }
})







exports.registerController =catchAsync( async (req,res)=>{
  res.render("register")
})





exports.registerPostController = catchAsync( async (req,res)=>{
    let {name,email,password,cpassword} = req.body
    console.log(req.body)

    
    if(password != cpassword){
         // res.redirect(`/auth/register?error=${encodeURIComponent(`password and confirm password would me same`)}`);
         res.render(`register`,{errors:[{msg:`password and confirm password should me same`}]});
         // res.json({errors:[{msg:"password and confirm password would me same"}]})
      }


    try{
      let salt = await bcrypt.genSalt(10)
      let hashPassword = await bcrypt.hash(password,salt)
      let userExist = await pool.execute(`SELECT * FROM user WHERE email=?`, [email]);
      console.log(userExist[0])
      if(userExist[0].length > 0){
        //?error=${encodeURIComponent(`user with this ${email} already exist`)}
         res.render(`register`,{errors:[{msg:`user with email: ${email} already exist`}]});
        // res.json({errors:`user with this ${email} already exist`}) 
      }else{
        
         let data = await pool.execute(`INSERT INTO user(name,email,password) VALUES(?,?,?)`, [name,email,hashPassword]);
         

 
          await sendMail({
            email,
            message:"Hellow bro",
            subject: 'Your Account Activation Link for Blogen App !',
            text: "Hello world?", 
             html: "<b>Hello world?</b>", 
            // user: newUser,
            // template: 'signupEmail.ejs',
            // url: activationURL,
          });


         res.redirect(`/auth/login`);
         // res.json(data)  
      }

    }catch(err){
     console.log(err)
      res.send("err",err.message)
    }   
})

    // pool.execute(`INSERT INTO user(name,email,password) VALUES(?,?,?)`,
    //   [name,email,hashPassword]
    //   ).then((result)=>{
    //     res.json(result[0])
    // }).catch(err=>{ 
    //   console.log(err)
    //   res.send("err",err.message)
    // })

// exports.logoutController = async function(req,res){
//       console.log('Before: Calling Logout Controller Post',req.session)
 
//   req.session.destroy((err)=>{
//     if(err) console.log(err)
//       console.log('Before: Calling Logout Controller Post',req.session)
//     delete req.session
//      console.log('After: Calling Logout Controller Post',req.session)
//     res.redirect("/")
//   })
// }
     
exports.logoutController = catchAsync( async (req,res)=>{
     if (!req.cookies.jwt) {
      // console.log('NOT logged in');
        // req.flash('message', 'You must Login First');
        return res.redirect(`/auth/login?error=${encodeURIComponent(`you need to login first`)}`);
      }
   
    res.cookie('jwt',"", {
      expires: new Date(Date.now()),
      httpOnly: true,
      maxAge: 0
    });
    // res.clearCookie("jwt");
    res.redirect('/');
})