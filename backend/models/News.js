const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    urls: { type: String, default: '' },
    content: { type: String, default: '' }
});
const News = mongoose.model('Quizs', newsSchema);

module.exports = News;