const express = require('express');
const router=express.Router();  
router.post('/foodData',async(req,res)=>{
    try{
        console.log(global.foodData2);
        res.send([global.foodData2,global.foodCategory]);
    }catch(err){
        console.log(err);
        res.send('Server Error');
    }
});

module.exports=router;