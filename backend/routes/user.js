// const express = require("express");
// const { register,login } = require("../controllers/user");

// const router = express.Router();

// router.route("/register").post(register);
// router.route("/login").post(login);


// module.exports=router;

//MY OWN
const express=require('express')
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {register, login, myProfile, logout,create, getData, attend,getAttendance, takeAttend, showAttend} = require("../controllers/user");
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

/*CSV FILE*/



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync("public")) {
        fs.mkdirSync("public");
      }
  
      if (!fs.existsSync("public/csv")) {
        fs.mkdirSync("public/csv");
      }
  
      cb(null, "public/csv");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });


const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      var ext = path.extname(file.originalname);
  
      if (ext !== ".csv") {
        return cb(new Error("Only csvs are allowed!"));
      }
  
      cb(null, true);
    },
  });


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticated,myProfile)
router.post("/create",upload.single('csvFile'),create);
router.route('/getdata').get(getData);
router.route('/getattendance').get(getAttendance);
router.route('/attendance').put(attend);
router.route('/takeattendance').get(takeAttend);
router.route('/showattendance').get(showAttend);

module.exports=router;
