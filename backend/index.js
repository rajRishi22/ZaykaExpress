const express=require('express')
const app=express()
const port=5000
const mongoDB=require("./db");
const cors = require('cors');  
app.use(cors());
mongoDB();
app.get('/',(req,res)=>{
    res.send('Hello world');
})
app.use((req,res,next)=>{
    res.setHeader("Acess-Control-Allow-Origin","http://localhost:3000");
    res.header("Acess-Control-Allow-Headers",
        "Origin, X-Requested-With, Conten-Type, Accept"
    );
    next();
});
app.use(express.json());
app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));
app.listen(port,()=>{
    console.log("App listening on port 5000");
});
