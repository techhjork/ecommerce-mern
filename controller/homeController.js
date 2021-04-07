const catchAsync = require("../utils/catchAsync");
const pool = require('../config/pool')
const multer = require('multer')


exports.homeController = catchAsync(async (req,res)=>{
  console.log("homeController",req.user)
  res.render("index",{user:req.user})
})

exports.shopController = catchAsync(async (req,res)=>{
  // const user = req.cookies  
  const data = await pool.execute(`SELECT * FROM product`)
   const role = req.user.role
   console.log(role)
  res.render("shop",{products:data[0],role:role,user:req.user})
})

 
exports.cartController = catchAsync(async (req,res)=>{
  res.render("cart") 
})

exports.wishlistController = catchAsync(async (req,res)=>{
  res.render("wishlist")
})

exports.createProductController = catchAsync( async (req,res)=>{
  res.render("create-product",{user:req.user})
})  


exports.createPostProductController =  catchAsync( async (req,res)=>{
  
  const {product,price,qty,description} = req.body
  console.log({product,price,qty,description})
  let file,fileName 
  if(product.trim() === "" || price.trim() === "" || description.trim() ==="" || qty.trim() ===""){
    console.log('can\'t be empety')
    res.redirect(`/create-product?error=${encodeURIComponent(`All input is important`)}`)
  }

  if(req.files){
   file = req.files.file;
   fileName = `${Date.now()}-${file.name}`
   file.mv('./public/uploads/'+ fileName);
   const product_status = await pool.execute(`INSERT INTO product(product_name,price,image_path,description,qty) VALUES(?,?,?,?,?)` , [product,price,`/uploads/${fileName}`,description,+qty])
   res.redirect("/shop")
  }else{
    res.redirect(`/create-product?error=${encodeURIComponent(`File is important`)}`)
  }
})


exports.productEditController = catchAsync(async (req,res)=>{
  const id = req.params.id
  const product = await pool.execute('SELECT * FROM product WHERE product_id=?',[id]); 
  res.render("product-edit",{product:product[0][0],user:req.user})
})


exports.productEditPostController = catchAsync(async (req,res)=>{
   const id = req.params.id
   console.log("THIS IS ID :   ",id)
   const {product,price,qty,description} = req.body
   if(product.trim() === "" || price.trim() === "" || description.trim() ==="" || qty.trim() ===""){
      console.log('can\'t be empety')
   }
   
  const product_status = await pool.execute(`UPDATE product SET  product_name=?, price=?, description=? , qty=? WHERE product_id=?` , [product,price,description,+qty,id])
 
  res.redirect(`/shop`)
})


exports.productViewController = catchAsync( async (req,res)=>{
  const id = req.params.id
  const product = await pool.execute('SELECT * FROM product WHERE product_id=?',[id]); 
  res.render("product-view",{product:product[0][0],user:req.user})
})

exports.productDeletePostController = catchAsync( async (req,res)=>{
    const id = req.params.id
    const product = await pool.execute('DELETE FROM product WHERE product_id=?',[id]); 
    res.redirect("/shop")
})



exports.addToCartController = catchAsync(async (req,res)=>{
  res.send("addToCart");
})


exports.buyNowController = catchAsync(async (req,res)=>{
  res.send("buyNow");
})