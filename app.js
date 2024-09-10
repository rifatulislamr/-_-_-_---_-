require("dotenv").config();
// const dotenv = require("dotenv")
const express = require("express");
const app = express();
const mongoose =require("mongoose");
const allRouter=require('./routes');

// dotenv.config();


//parse the request to body-parser



app.use (express.json());
mongoose.connect(process.env.DATABASE,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // // useCreateIndex: true,
})
.then(() =>{
    console.log("DB is Connected Successfully");
});


app.use('/', allRouter);
// app.use('/', (req,res) =>{
//     res.send('Hello World')
// })

const port = 5000

app.listen(port,()=>{
    console.log(`App is listening on port the ${port}`);
})