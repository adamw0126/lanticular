const FAQs = require('../models/Faqs');

exports.addFAQ = async (req, res) => {
    const { addQuestion: quiz, addAnswer: answer } = req.body
    let quizData = await FAQs.find();
    if(quizData){
        quizData = new FAQs({
            quiz,
            answer
        });
        await quizData.save();
        return res.json({ msg: 'success' });
    } else {
        return res.json({ msg: 'Not exist Collection.' });
    }
}

exports.getFAQsData = async (req, res) => {
    let quizData = await FAQs.find();
    return res.json({ quizData });
}

exports.deleteFAQ = (req, res) => {
    const { _id } = req.body
    FAQs.deleteOne({_id}).then(async result => {
        if(result.deletedCount > 0){
            return res.json({ message: 'success' });
        }
    }).catch(err => res.json({ message: 'Failed to deleted file', err }));
}