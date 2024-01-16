const mongoose=require("mongoose");

mongoose.model('Orders',{
    customersId:{
        type:mongoose.SchemaTypes.ObjectId,
        required: true
    },
    bookID:{
        type:mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate:{
        type:Date,
        required: true
    },
    deliveryDate:{
        type:Date,
        required: true
    }
})