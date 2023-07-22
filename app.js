const express = require("express");
const path = require("path");
const fs=require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser")
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

}
const port = 8500;

//Defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: String,
    phone: String,
    email: String,
    address: String,
    choice: String
  });
  const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res)=>{
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res)=>{
    const params = { }
    res.status(200).render('services.pug', params);
})
app.get('/submit', (req, res)=>{
    const params = { }
    res.status(200).render('submit.pug', params);
})
app.get('/classinfo', (req, res)=>{
    const params = { }
    res.status(200).render('classinfo.pug', params);
})
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.render('submit.pug')
    })

})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});