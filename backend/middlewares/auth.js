// const User = require("../model/User")
// const jwt=require("jsonwebtoken")


// exports.isAuthenticated = async(req,res,next)=>{

//   try {
//     const{token}=req.cookies
//     if(!token){
//         return res.status(401).json({
//             message:"Please login first"
//         })

//     }

//     const decoded = await jwt.verify(token,"kyamaideveloperbanpaarahu")

//     req.user=await User.findById(decoded._id);

//     next()
//   } catch (error) {
//     res.status(500).json({
//         message: error.message
//     })
//   }

// }

//MY OWN
const User =require('../model/User');
const jwt = require('jsonwebtoken');

 
exports.isAuthenticated= async(req,res,next)=>{

  try {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({
            message:"please login firsty"
        })
    }
    const decoded= await jwt.verify(token,"whereamI")
    req.user = await User.findById(decoded._id)
    next()
  } catch (error) {
    //     res.status(500).json({
//         message: error.message
//     })
  }
}