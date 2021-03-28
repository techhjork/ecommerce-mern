

exports.homeController =function(req,res){
  console.log("homeController",req.user)
  res.render("index",{user:req.user})
}

exports.shopController =function(req,res){
  const user = req.cookies
  res.render("shop",{user})
}


exports.cartController =function(req,res){
  res.render("cart")
}

exports.wishlistController =function(req,res){
  res.render("wishlist")
}

exports.createProductController =function(req,res){
  res.render("create-product")
}


