const express=require('express');
const app=express();

const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/books');

app.post('/books',(req,res)=>{
    
})

app.listen(3000,()=>{
    console.log('server runnign in port 3000');
})