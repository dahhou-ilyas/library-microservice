const mongoose=require('mongoose');

mongoose.model('Customers',{
    name:{
        type:String,
        require:true,
    },
    age:{
        type:Number,
        require:true
    },
    adress:{
        type:String,
        require:true
    }
})