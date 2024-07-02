const express = require ("express")
const router = express.Router()
const {check} = require ("express-validator")
const{register,login,getUserData,getProduct,createOrder,getUserOrders}=require("../controllers/userController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

router.post("/register",[check("email","email is not valid").isEmail().normalizeEmail(),
    check("password","your password must at least contain 8 characters, one number,one symbol").isStrongPassword({

        minLenght :5 , minSymbols:1, minLowercase:1 ,minUppercase:1 , minNumbers:1})],register)
router.post("/login",login)
router.get("/",authMiddleware,getUserData) // test the data with postman by methode get (after register or login test data if registered or not )
router.get("/getproduct",getProduct)  // no need authMiddleware (bring data from database already created by admin)
router.post("/createorder",authMiddleware,createOrder)
router.get("/getuserorders",authMiddleware,getUserOrders)           

module.exports=router