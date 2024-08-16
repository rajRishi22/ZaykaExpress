const express=require('express')
const app=express()
const port=process.env.PORT || 5000 
const mongoDB=require("./db");
const cors = require('cors');  
app.use(cors());
mongoDB();
app.get('/',(req,res)=>{
    res.send('Hello world');
})
app.use((req,res,next)=>{
    res.setHeader("Acess-Control-Allow-Origin","https://zayka-express-f1j7.vercel.app/");
    res.header("Acess-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.json());
app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));
app.listen(port,()=>{
    console.log("App listening on port 5000");
});
