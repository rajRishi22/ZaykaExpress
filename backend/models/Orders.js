const mongoose=require('mongoose');

const {Schema} = mongoose;



const OrderSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    order_data:{
        type:Array,
        required:true,
    },
})

module.export=mongoose.model('order',OrderSchema)