const {Schema, model} = require("mongoose");

const ContactSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email:{type: String, required: true},
    message: {type: String, required: true},
});

const Contact = new model('Contact',ContactSchema);
module.exports =Contact;