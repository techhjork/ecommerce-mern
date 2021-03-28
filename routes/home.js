const express = require("express")
const router = express.Router()
const {
	  createProductController,
      homeController,
      shopController,
      cartController,
      wishlistController
     } 
     = require("../controller/homeController")

const {
	  loginController,
	  registerController
     } 
     = require("../controller/authController")

router.route("/")
.get(homeController)

router.route("/shop")
.get(shopController)

router.route("/wishlist")
.get(wishlistController)

router.route("/cart")
.get(cartController)

router.route("/create-product")
.get(createProductController)





module.exports = router