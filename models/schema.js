//this will use the earlier called instance of mongoose
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

//MVC ka M - Model part , join our list to this schema
const Contact = mongoose.model('contacts',contactSchema);

//export this Contact
module.exports = Contact;