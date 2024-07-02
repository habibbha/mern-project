const Product = require("../models/productSchema")
const Order = require("../models/orderSchema")


// add product role:admin
// methode post
//path /api/admin/addproduct
//access private

const addProduct = async(req,res)=>{                                   //adding check
    try{
        const Product = {title,description,price,poster} = req.body
        const newProduct = await Product.create(req.body)
           
        res.status(201).json({msg:"product added successfully",token:token,product:newProduct})

            }
catch(err){
        res.status(500).json({msg:"something went wrong in adding product!",err: err.message})
    }
}

// updateproduct role :admin
// methode put
//path /api/admin/updatepruduct/id
//access private

const updateProduct = async(req,res)=>{
    try{
        const  updateProduct = await Product.findByIdAndUpdate(req.params.id,{...req.body})
        res.status(201).json({msg:"product updated successfully",product:updateProduct}) //syncro in postman => verify this

            }
catch(err){
        res.status(500).json({msg:"something went wrong in updating product!",err: err.message})
    }
    
}
// deleteProduct role :admin
// methode delete
//path /api/admin/deleteproduct/id
//access private

const deleteProduct = async(req,res)=>{
    try{
        
        const deleteProduct = await Product.findByIdAndDelete(req.params.id) // no need to check body like the update
           
        res.status(201).json({msg:"product deleted successfully",product:deleteProduct}) // product:deleteProduct => product is the thing affected by the update

            }
catch(err){
        res.status(500).json({msg:"something went wrong in deleting product!",err: err.message})
    }
    
}
// getOrders role :admin
// methode get
//path /getorders
//access private

const getOrders = async(req,res)=>{
    try{
        const Orders = await Order.find()
           
        res.status(201).json({msg:"Orders found successfully !", Orders})

            }
catch(err){
        res.status(500).json({msg:"something went wrong in getting orders !",err: err.message})
    }
    
}



module.exports={addProduct,updateProduct,deleteProduct,getOrders}