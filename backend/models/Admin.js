const mongoose = require('mongoose');

const adminsSchema = new mongoose.Schema({
    name: { type: String, default: '', required: true },
    userId: { type: String, default: '', unique : true, required: true },
    password: { type: String, default: '', required: true },
    currentImg: { type: String, default: '' },
    depthImage: { type: String, default: '' },
    w_h: {
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 }
    },
    joinedAt: { type: Date, default: Date.now }
});
const Admin = mongoose.model('Admin', adminsSchema);

module.exports = Admin;