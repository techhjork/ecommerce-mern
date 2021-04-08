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
     buyNowController,
     addToCartPostController,
     buyNowPostController
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
.all(protect)
.get(wishlistController)

router.route("/cart")
 .all(protect)
.get(cartController)

router.route("/product/edit/:id")
.all(protect)
.get(productEditController)
.post(productEditPostController)

router.route("/product/view/:id")
.get(productViewController)

router.route("/product/delete/:id")
.post(productDeletePostController)



router.route("/create-product")
 .all(protect)
.get(createProductController)
.post(createPostProductController)

router.route("/cart")
 .get(addToCartController)
 .post(addToCartPostController)


router.route("/buy")
 .get(buyNowController)
 .post(buyNowPostController)



module.exports = router