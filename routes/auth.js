const express = require("express")
const router = express.Router()
const {registerPostValidtor,loginPostValidtor,loginGetValidtor,registerGetValidtor} = require("../middleware/authValidator")
const {loginController,loginPostController,registerController,registerPostController,logoutController} = require("../controller/authController")

router.route("/login")
.get(loginGetValidtor,loginController)
.post(loginPostValidtor,loginPostController)

router.route("/logout")
.post(logoutController)




router.route("/register")
.get(registerGetValidtor,registerController)
.post(registerPostValidtor,registerPostController)


module.exports = router