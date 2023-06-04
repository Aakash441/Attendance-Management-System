// const mongoose = require("mongoose")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

// const userSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique: true,
//     },
//     password:{
//         type: String,
//         required:true,
//         minlength: 6,
//         select:false,
//     },
    
// });

// userSchema.pre("save",async function(next){
//     if(this.isModified("password")){
//   this.password=await bcrypt.hash(this.password,10);
//     }

//     next();

// })

// userSchema.methods.matchPassword = async function(password){
//     return await bcrypt.compare(password,this.password);
// }

// userSchema.methods.generateToken = function(){
      
//     return jwt.sign({_id:this._id},"kyamaideveloperbanpaarahu")
// }

// module.exports=mongoose.model("User",userSchema)

//MY OWN

const mongoose=require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
        email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
        minlength: 6,
        select:false,
    },
})

//Since the password cannot be saved as it is we use bcrypt to encrypt the password 
//whenever the password will be saved("save") a function will be called

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password,10); //this means it refers to userSchema object only
    }
    next() 

})


userSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password,this.password); //It will compare the stored password and the input password 
}

userSchema.methods.generateToken = function(){
   return jwt.sign({_id:this._id},"whereamI")
}

module.exports=mongoose.model('User',userSchema);
