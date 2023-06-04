// var mongoose = require('mongoose');
// var csvSchema = new mongoose.Schema({
//     div:{
//         type:String
//     },
//     Name:{
//         type:String
//     },
//     branch:{
//       type:String
//     },
//     attendance: {
//         type: String,
//         required: true,
//         default: 'present'
//       },
//       date: {
//         type: String,
//         default: null
//       },
//       time: {
//         type: String,
//         default: null
//       }
   
// });
// csvSchema.pre('save', function (next) {
//   if (!this.isNew) { // if the object is not new, don't modify the fields
//     return next();
//   }

 
//   this.date = new Date().toISOString().slice(0, 10);
//   this.time = new Date().toLocaleTimeString();
//   next();
// });
// module.exports=mongoose.model('Csv',csvSchema);

var mongoose = require('mongoose');
var csvSchema = new mongoose.Schema({
    div:{
        type:String
    },
    Name:{
        type:String
    },
    branch:{
      type:String
    },
    attendance: {
        type: String,
 
        default:null
      },
      date: {
        type: String,
        default: null
      },
      time: {
        type: String,
        default: null
      }
   
});

csvSchema.pre('save', function (next) {
  if (!this.isNew) { // if the object is not new, don't modify the fields
    return next();
  }

 
  this.date = new Date().toISOString().slice(0, 10);
  this.time = new Date().toLocaleTimeString();
  next();
});

module.exports=mongoose.model('Csv',csvSchema);