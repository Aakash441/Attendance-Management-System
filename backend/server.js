const app=require("./app");
const { connectDatabase } = require("./config/database");

connectDatabase();
// app.get('/',(req,res)=>{
//     res.send('hi')
// })
app.listen(4000,()=>{ //Running server on port
    console.log(`Running on ${4000}`)
});
