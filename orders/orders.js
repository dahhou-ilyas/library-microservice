const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
app.use(bodyParser.json());
const axios=require('axios')

mongoose.connect('mongodb://127.0.0.1:27017/orders');

// call customer model
require('./OrdersModel');
const Order=mongoose.model('Orders');
//

app.post("/orders",(req,res)=>{
    let newOrder={
        customersId:req.body.customersId,
        bookID:req.body.bookID,
        initialDate:req.body.initialDate,
        deliveryDate:req.body.deliveryDate
    }; 
    const order=new Order(newOrder);
    order.save().then(()=>{
        res.status(201).json(newOrder);
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
});

app.get("/orders",async (req,res)=>{
    const orders=await Order.find();
    if(!orders){
        res.status(404).json({message:"ressource not found"})
    }
    res.status(200).json(orders)
})

app.get("/orders/:id",async (req,res)=>{
    try{
        const order=await Order.findById(req.params.id);
        if(!order){
            res.status(404).json({message:"ressource not found"});
        }
        const [res1,res2]=await Promise.all([
            axios.get("http://localhost:3001/customers/"+order.customersId),
            axios.get("http://localhost:3000/books/"+order.bookID),
        ])
        res.status(200).json({customer:res1.data,book:res2.data,initialDate:order.initialDate,deliveryDate:order.deliveryDate})
    }catch(e){
        res.status(500).json({error:"server not responde"})
    }  

})

app.listen(3002,()=>{
    console.log("app listen in port 3002");
})