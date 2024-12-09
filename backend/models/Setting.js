const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    common: {
        creditCnt: { type: Number, default: 0 },
        price: { type: Number, default: 0 }
    },
    bonus: {
        creditCnt: { type: Number, default: 0 },
        price: { type: Number, default: 0 }
    }
});
const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;