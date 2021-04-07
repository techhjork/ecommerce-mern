const express = require("express")
const router = express.Router()
const {
	  createProductController,
      homeController,
      shopController,
      cartController,
      wishlistController,
      createPostProductController,
      productEditController,
     productEditPostController,
     productDeletePostController,
     productViewController,
     addToCartController,
     buyNowController
     } 
     = require("../controller/homeController")
 
// const {
// 	  loginController,
// 	  registerController
//      } 
//      = require("../controller/authController")

const {protect} = require("../middleware/authValidator")

router.route("/")
.get(protect,homeController)

router.route("/shop")
.get(protect,shopController)

router.route("/wishlist")
.get(wishlistController)

router.route("/cart")
.get(cartController)

router.route("/product/edit/:id")
.get(productEditController)
.post(productEditPostController)

router.route("/product/view/:id")
.get(productViewController)

router.route("/product/delete/:id")
.post(productDeletePostController)



router.route("/create-product")
.get(protect,createProductController)
.post(createPostProductController)

router.route("/cart")
 .get(addToCartController)

router.route("/buy")
 .get(buyNowController)



module.exports = router