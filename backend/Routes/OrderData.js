const express = require('express');
const router=express.Router();  
const Order= require('../models/Orders')

router.post('/orderData',async(req,res)=>{
    let data=req.body.order_data;
    console.log(data);
    // await data.splice(0,0,{Order_date:req.body.order_date})
    let eId= await Order.find({'email':req.body.email})
    console.log(eId)
    if(eId===null){
        try{
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({sucess:true})
            })
        } catch(error){
            console.log(error.message)
            res.send("Server Error".error.message)
        }
    }else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
            {$push:{order_data:data}}).then(()=>{ //push yahan pe append karne ka kaam kr rahi hai warna purana data chala
                res.json({sucess:true})
            })
        }catch(error){
            res.send("Server Error",error.message)
        }
    }
})

// router.post('/myOrderData',async(req,res)=>{
//     try{
//         console.log(req.body.email);
//         let eId=await Order.findOne({'email':req.body.email})
//         console.log(eId);
//         res.json({orderData:eId})
//     }
//     catch(err){
//         console.log(err);
//         res.send('Server Error');
//     }
// });
module.exports=router;