const mongoose = require('mongoose');



//lets create a schema
const mdmodel = mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
        
    },
   
    date: {
        type: String,
        required: true,
    },
    email:{
        type:String ,
        required : true ,
    },
});

//if i want to find the notes the i have to provide the email address and the id of the note and create the link 


//lets create a model
const md = mongoose.model('Markdown', mdmodel);

module.exports = md ;