const fs = require('fs');
const path = require('path');
const AdminMdl = require('../models/Admin');

exports.exportsAdd = async (req, res) => {
    try {
        const { who, whatExport } = req.body;
        let user = await AdminMdl.findById(who);
        if (user) {
            user.exports.push({ what: whatExport, when: getCurrentDateTime() });
            await user.save();
            return res.status(200).json({
                message: `success_export`,
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'failed_save', error });
    }
}

exports.getHistory = async (req, res) => {
    try {
        const { who } = req.body;
        let user = await AdminMdl.findById(who);
        if(user){
            return res.json({ message: 'success', histroy: user.exports });
        }
    } catch (error) {
        res.status(500).json({ message: 'failed_get', error });
    }
}

function getCurrentDateTime() {
    const now = new Date();

    const date = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0');

    const time = String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');

    return date + ' ' + time;
}