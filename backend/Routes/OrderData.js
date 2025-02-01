const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        let email = req.body.email;
        
        // Check if email exists in Order collection
        let eId = await Order.findOne({ 'email': email });
        
        if (eId === null) {
            // Create new order document
            await Order.create({
                email: email,
                order_data: [data]
            });
        } else {
            // Update existing order document
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: data } }
            );
        }
        
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post('/myOrderData',async(req,res)=>{
    try{
        console.log(req.body.email);
        let eId=await Order.findOne({'email':req.body.email})
        console.log(eId);
        res.json({orderData:eId})
    }
    catch(err){
        console.log(err);
        res.send('Server Error');
    }
});
module.exports = router;