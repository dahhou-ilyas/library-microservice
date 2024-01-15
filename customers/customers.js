const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/customers');

// call customer model
require('./CustomersModel')
const Customer=mongoose.model('Customer')
//

app.post('/customers',async (req,res)=>{
    let {name,age,adress}=req.body;
    const newCustomer=new Customer({name,age,adress});
    try{
        let saveCustomer=await newCustomer.save()
        res.status(201).json(saveCustomer);
    }catch(e){
        console.log(e);
        res.status(400).json({message:"erreu dans database"})
    }  
})

app.get("/customers",async(req,res)=>{
    const customers=await Customer.find()
    if(!customers){
        res.status(204).json({message:"No content"});
    }
    res.status(200).json(customers)
})

app.get("/customers/:id",async (req,res)=>{
    const id=req.params.id
    try{
        const customer=await Customer.findById(id);  
        res.status(200).json(customer);
    }catch(e){
        res.status(404).json({error:"le id n'existe pas"})
    }
    
})

app.put("/customers/:id",async (req,res)=>{
    const id=req.params.id;
    const {name,age,adress}=req.body
    try{
        const customer=await Customer.findById(id)
        customer.name=name || customer.name;
        customer.age=age || customer.age;
        customer.adress=adress || customer.adress;
        customer.save()
        res.status(200).json(customer)
    }catch(e){
        res.status(404).json({error:"customers not found"})
    }
})

app.delete("/customers/:id",async (req,res)=>{
    const id=req.params.id;
    try{    
        const customersDeleted =await Customer.findByIdAndDelete(id)
        if (!customersDeleted) {
            res.status(404).send('Ressource non trouvée.');
        } else {
          res.status(200).json({ message: 'Ressource supprimée avec succès.' });
        }
    }catch(e){
        res.status(500).json({error:"Erreur lors de la suppression de la ressource."})
    }
})

app.listen(3001,()=>{
    console.log("app listen in port 3001");
})