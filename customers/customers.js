const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
app.use(bodyParser.json())



mongoose.connect('mongodb://127.0.0.1:27017/customers');

require('./CustomersModel')
const Customers=mongoose.model('Customers')

app.listen("3001",()=>{
    console.log("app listen in port 3001 ");
})