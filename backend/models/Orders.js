const mongoose=require('mongoose');

const {Schema} = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    order_data: [{
        Order_date: String,
        items: [{
            foodName: String,
            qty: Number,
            size: String,
            price: Number
        }],
        totalPrice: Number
    }]
});

module.exports=mongoose.model('order',OrderSchema)