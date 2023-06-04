// const express= require("express");
// const app=express();

// require("dotenv").config({path:"backend/config/config.env"})

// //USING MIDDLEWARE
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// //IMPORTING ROUTES
// const user = require("./routes/user");


// //USING ROUTES
// app.use("/api/v1",user);

// module.exports=app;


//MY OWN

const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




const user=require("./routes/user");
app.use("/api/v1",user);




module.exports=app;










