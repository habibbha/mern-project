const express= require ("express")
const router = express.Router()
const adminMiddleware =require("../middleware/adminMiddleware.js")
const {addProduct,updateProduct,deleteProduct,getOrders} = require("../controllers/adminController.js")


router.post("/addproduct",adminMiddleware,addProduct)
router.put("/updateproduct/:id",adminMiddleware,updateProduct)
router.delete("/deleteproduct/:id",adminMiddleware,deleteProduct)
router.get("/getorders",adminMiddleware,getOrders)

module.exports = router