const mongoose = require('mongoose');

const faqsSchema = new mongoose.Schema({
    quiz: { type: String, default: '' },
    answer: { type: String, default: '' }
});
const FAQs = mongoose.model('FAQs', faqsSchema);

module.exports = FAQs;