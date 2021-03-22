//import library
const mongoose = require('mongoose');

//make connection with db called contact_list_db
mongoose.connect('mongodb://localhost/contact_list_db');

//fetch connection made earlier to check if it is running 
const db = mongoose.connection;

//if error
db.on('error',console.error.bind(console,'there is error connecting to db'));

//if running
db.once('open',function(){
    console.log('connection to db made successfully');
});