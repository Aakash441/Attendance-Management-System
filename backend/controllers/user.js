// const User = require("../model/User");

// exports.register=async(req,res)=>{
//     try {

//         const{name,email,password}=req.body;
//         let user = await User.findOne({email});
//         if(user){
//             return res.status(400).json({success:false,message:"User already exist"})
//         }
//         user=await User.create({name,email,password});

//         res.status(201).json({success:true,user});

//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             message: error.message,
//         })
//     }
// }

// exports.login = async (req,res)=>{

//     try {
//         const{email,password}=req.body;
//         const user = await User.findOne({email}).select("+password");
//         if(!user){
//              return res.status(400).json({
//                 success:false,
//                 message:"User does not exist"
//              })

//         }
//         const isMatch = await user.matchPassword(password)
//         if(!isMatch){
//                return res.status(400).json({
//                    success:false,
//                    message:"Incorrect Password"
//                })
//         }
//         const token = await user.generateToken()
//         res.status(200).cookie("token",token,{expires: new Date(Date.now()+90*24*60*60*1000),httpOnly:true}).json({
//             success:true,
//             user,
//             token

//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

//MY OWN
//So first we import the model we created and then we create a function to register our user by importing the values of user from db
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const User = require('../model/User');
const Csv = require('../model/Csv');


exports.register = async(req,res)=>{
    try{
       const{name,email,password} = req.body;
       
       let user = await User.findOne({email});
       if(user){
        return res.status(400).json({success:false,message:"User already exist"})
       }
       user = await User.create({email,name,password})
       res.status(201).json({success:true,user});

    }
    catch(err){
      res.status(500).json({
        success:false,
        message:err.message
      })
    }

}

exports.login= async (req,res)=>{
      try {
        const{email,password}=req.body;
        const user = await User.findOne({email}).select("+password");//since we have kept select pass as false in model we use .select to check
        if(!user){
         return res.json({
            success:false,
            message:"User does not exist"
          })
        }
        const isMatch = await user.matchPassword(password)
        
        if(!isMatch){
         return res.status(404).json({
            success:false,
            message:"Password wrong"
          })
        }
        //so after sending the user in response, to know that we have logged in we generate a token ans store it inside the cookie
        const token = await user.generateToken();
        res.status(200).cookie("token",token,{expires:new Date(Date.now()+90*24*60*60*1000),httpOnly:true}).json({
          success:true,
          user,
          token
        })

      } catch (error) {
            res.status(500).json({
            success: false,
            message: error.message
        })
      }
}

exports.logout=async(req,res)=>{
  try {
    res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
      success:true,
      message:"logged out"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
  })
  }
}

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.create=async(req,res)=>{
  console.log(req.file);
  const totalRecords = [];
try{
const {name,branch }=req.body;
console.log(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
  fs.createReadStream(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', (row) => {
      row.div=name;
      row.branch=branch;
      totalRecords.push(row)
      
    })
    .on('end', async rowCount => {
      try{
        console.log(name);
        const users = await Csv.insertMany(totalRecords);
        res.json(users);
      }catch(err){
        res.status(400).json(err);
      }
    });

  }catch(error){
    res.status(400).json(error)
  }
}

exports.getData=async(req,res)=>{
  const{div}=req.query
  try 
  {
    const data = await Csv.distinct('date', { div });
   res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.attend=async(req,res)=>{
  const { students, date, time } = req.body;
  const promises = [];

  students.forEach(student => {
    const attendanceRecord = new Csv({
      div: student.div,
      Name: student.Name,
      attendance: student.attendance,
      date, 
      time
    });
    promises.push(attendanceRecord.save());
  });

  Promise.all(promises)
    .then(updatedStudents => {
      res.json(updatedStudents);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
    
}

exports.getAttendance=async(req,res)=>{
  const{div}=req.query
  try 
  {
    const attendanceDates = await Csv.distinct('date', { div: div });
    res.json(attendanceDates); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.takeAttend=async(req,res)=>{
  const{div}=req.query
  try 
  {
   const data = await Csv.find({div,attendance: null, date: null, time: null });
   res.json(data) 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.showAttend=async(req,res)=>{
const{div,date}=req.query
try{
  const records=await Csv.find({div,date});
  res.json(records);
}catch (error) {
  res.status(500).json({ message: error.message });
}
}