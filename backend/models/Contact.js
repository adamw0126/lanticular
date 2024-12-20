const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    company: { type: String, default: '' },
    message: { type: String, default: '' },
    date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;