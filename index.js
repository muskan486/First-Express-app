const express = require('express');
const path = require('path');
const port = 8000;

//include my mongoose before express has fired
const db = require('./configuration/mongoose');

//include schema(model) for db , use this const to alter my db below 
const dbSchema = require('./models/schema');

//firing express
const app = express();

var contacts = [
    {
        name:'muskan',
        phone:'123456789'
    },
    {
        name:'ujjwal',
        phone:'098765432'
    },
    {
        name:'kajal',
        phone:'1111111111'
    }
];
//including ejs as my view
app.set('view engine','ejs');

app.set('views',path.join(__dirname , 'views'));

// middleware default
app.use(express.urlencoded());

// my own middleware,we can have multiple..
app.use(function(req,res,next){
console.log('middleware 1 called');
next();
});

// adding static files
app.use(express.static('assets'));

//controllers
//find{} is used to select all data ,we have changed the list which has been parsed to view at 'home' with db const 
app.get('/',function(req,res){
   //res.send('<h1> cool!! you did it , congo muskan </h1>');
   dbSchema.find({},function(err,allcontacts){
       if(err)
       {
           console.log('error in finnding contacts from db');
           return;
       }
       res.render('home',{
        title:'My Contacts List',
        contact_list:allcontacts
     });

   });
   
  
});

//creating new item in list
app.post('/contact-add',function(req,res){
    //res.redirect('/play');
    //contacts.push(req.body);
    //return res.redirect('back');
    dbSchema.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('not able to create new contact in db');
        return;
              }
        console.log('created',newContact);
        return res.redirect('back');
    });

});

app.get('/play',function(req,res){
    res.render('playing',{title:'lets play'});
});

// deleting contact from list/array
app.get('/del-contact',function(req,res){
   // console.log(req.query);

   //get the id from query in the url

   //let phone = req.query.phone;
   let id=req.query.id;
   //let contactIndex = contacts.findIndex(contact => contact.phone == phone);
   
   //find the contact in db using id and delete
       dbSchema.findByIdAndDelete(id,function(err){
           if(err){console.log('error in del an object from db');
        return;
            }
            return res.redirect('back');
       });
//    if(contactIndex != -1)
//    {
//      contacts.splice(contactIndex,1);
//    }
   //return res.redirect('back');
});


app.listen(port,function(err){
    if(err){
        console.log('catched error',err);
        return;
    }
    console.log('wohooo! no error');
    
});