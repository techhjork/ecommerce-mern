require("dotenv").config()
const pool = require("./config/pool")
const bcrypt = require("bcryptjs")
const generateToken = require("./utils/generateToken")

module.exports = async function seed(){
	console.log("SEEDING FILE")
	 await pool.execute("truncate table user");
	  const users = [{
          id:1,
          name:"admin",
          email:"admin@gmail.com",
          password:"admin",
          role:"admin"
      },{
          id:2,
          name:"user",
          email:"user@gmail.com",
          password:"user",
          role:"user"
      }];
  users.forEach(async (user)=>{
     let salt = await bcrypt.genSalt(10)
     let hashPassword = await bcrypt.hash(user.password,salt)
    
     await pool.execute("INSERT INTO user(name,email,password,role) VALUES(?,?,?,?)",[user.name,user.email,hashPassword,user.role]);
  })
	 
} 