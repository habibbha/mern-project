const User =require("../models/userSchema")
const bcrypt =require ("bcrypt")
const jwt = require ("jsonwebtoken")
const {validationResult}= require("express-validator") // check condition that we added (number of characters and symbols etc..)

// register role :user
// methode post 
//path /register
//access public

const register = async(req,res)=>{                                   //adding check
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){                // error not empty
            return res.status(400).json({errors:errors.array()})  //errors from the array in userRoutes => check
                               }

        const {name,email,password} = req.body
        const newUser = await User.findOne({email})
            if (newUser) res.status(400).json({msg:"user exist ,try to login"})
            else{
        const hashPWD = await bcrypt.hash(password,10)
        const createUser= await User.create({email,name,password:hashPWD})
        const token = jwt.sign({id:createUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"15d"})
        res.status(201).json({msg:"user created",token:token,user:createUser})

            }

    }
    catch(err){
        res.status(500).json({msg:"something went wrong in registration!",err: err.message})
    }
}

// login role :user
// methode post 
//path /login
//access public

const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
            if (!user) res.status(400).json({msg:"user does not exist ,try to register"})
            else{
        const checkPWD = await bcrypt.compare(password,user.password)
          if(!checkPWD) res.status(400).json({msg:"wrong password!,please try again"})

        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"15d"})
        res.status(201).json({msg:"successful to login !",token:token,user:user})

            }

    }
    catch(err){
        res.status(500).json({msg:"something went wrong in login !",err: err.message})
    }
}

// getUserData role :user
// methode get 
//path /
//access public

const getUserData = async(req,res)=>{
    try{
        const user =await User.findOne({_id: req.body.userId})
        if(!user) res.status(400).json({msg:"user does not exist, try to register !"})
            res.status(201).json({msg:"user info success !", user:user})
    }
    catch(err){
        res.status(500).json({msg:"something went wrong in getting info !"})
    }
}

// getProduct role :user
// methode get 
//path /getProduct
//access public

const getProduct = async(req,res)=>{
    try{
        const products =await Product.find()
        
            res.status(201).json({msg:"get all products !", products:products})
    }
    catch(err){
        res.status(500).json({msg:"something went wrong in getting products !"})
    }
}

// createOrder role :user
// methode post 
//path /createorder
//access public

const createOrder = async(req,res)=>{
    try{
        const {userId,productList} = req.body
        const newOrder =await Order.create({Products:productList,owner:userId})
        
            res.status(201).json({msg:"Order sent !", newOrder:newOrder})
    }
    catch(err){
        res.status(500).json({msg:"something went wrong in creating order !"})
    }
}

// getUserOrders role :user
// methode get 
//path /getuserorders
//access public

const getUserOrders= async(req,res)=>{
    try{
        const {userId}=req.body
        const userOrder = await Order.find({owner:userId})
        
            res.status(201).json({msg:"get all user orders !", userOrder:userOrder})
    }
    catch(err){
        res.status(500).json({msg:"something went wrong in getting orders!"})
    }
}

module.exports={register,login,getUserData,getProduct,createOrder,getUserOrders}