const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
app.use(bodyParser.json())

// call book model
require('./BooksModel')
const Book=mongoose.model('Book')

//


mongoose.connect('mongodb://127.0.0.1:27017/books');

app.post('/books',async (req,res)=>{
    let {title,author,numberPages,publisher}=req.body;
    const newBook=new Book({title,author,numberPages,publisher});
    try{
        let saveBook=await newBook.save()
        res.status(201).json(saveBook);
    }catch(e){
        console.log(e);
        res.status(400).json({message:"erreu dans database"})
    }  
})

app.get("/books",async(req,res)=>{
    const books=await Book.find()
    if(!books){
        res.status(204).json({message:"No content"});
    }
    res.status(200).json(books)
})
app.get("/books/:id",async (req,res)=>{
    const id=req.params.id
    try{
        const book=await Book.findById(id);  
        res.status(200).json(book);
    }catch(e){
        res.status(404).json({error:"le id n'existe pas"})
    }
    
})

app.put("/books/:id",async (req,res)=>{
    const id=req.params.id;
    const {title,author,numberPages,publisher}=req.body
    try{
        const book=await Book.findById(id)
        book.title=title || book.title;
        book.author=author || book.author;
        book.numberPages=numberPages || book.numberPages;
        book.publisher=publisher || book.publisher;
        book.save()
        res.status(200).json(book)
    }catch(e){
        res.status(404).json({error:"book not found"})
    }
})

app.delete("/books/:id",async (req,res)=>{
    const id=req.params.id;
    try{    
        const bookDeleted =await Book.findByIdAndDelete(id)
        if (!bookDeleted) {
            res.status(404).send('Ressource non trouvée.');
        } else {
          res.status(200).json({ message: 'Ressource supprimée avec succès.' });
        }
    }catch(e){
        res.status(500).json({error:"Erreur lors de la suppression de la ressource."})
    }
})

app.listen(3000,()=>{
    console.log('server runnign in port 3000');
})