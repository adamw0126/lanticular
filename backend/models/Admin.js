const mongoose = require('mongoose');

const adminsSchema = new mongoose.Schema({
    name: { type: String, default: '', required: true },
    userId: { type: String, default: '', unique : true, required: true },
    password: { type: String, default: '', required: true },
    role: { type: String, default: '' },
    currentImg: { type: String, default: '' },
    depthImage: { type: String, default: '' },
    avatar: { type: String, default: '' },
    w_h: {
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 }
    },
    videoPath: { type: String, default: '' },
    isLogin: { type: Boolean, default: false },
    permission: { type: Boolean, default: false },
    credits: { type: Number, default: 100 },
    exports: { type: Array, default: [] },
    joinedAt: { type: Date, default: Date.now }
});
const Admin = mongoose.model('Admin', adminsSchema);

module.exports = Admin;