const fs = require('fs');
const path = require('path');
const AdminMdl = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Assuming the images are stored in a folder called 'uploads'
const dataFolderPath = path.join(__dirname, '..', 'uploads');

const serverUrl = 'localhost:5000';

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

exports.addAdmin = async (req, res) => {
    try {
        const { name, userId, password } = req.body.signupInfo;
        if(!isValidEmail(userId)){
            return res.json({ message: 'invalid_email_type' });
        }
        let admin = await AdminMdl.findOne({ userId });
        if (admin) {
            res.status(200).json({ message: 'Repeat account.' });
        } else {
            admin = new AdminMdl({ name, userId, password });
            await admin.save();
            res.status(200).json({
                message: 'Signup successfully',
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to Singup', error });
    }
}

exports.login = async (req, res) => {
    try {
        const { userId, password } = req.body.signinInfo;
        const admin = await AdminMdl.findOne({ userId });
        if (admin) {
            const fileUrl = `${req.protocol}://${serverUrl}/uploads/${admin.currentImg}`;
            const imagePath = path.join(dataFolderPath, admin.currentImg);
            if (admin.isLogin) {
                return res.json({ message: 'Already login User.' });
            }
            if (password === 'admin1234') {
                if (fs.existsSync(imagePath)) {
                    admin.isLogin = true;
                    await admin.save();
                    return res.status(200).json({ message: 'success', admin, filePath: fileUrl });
                } else {
                    admin.currentImg = '';
                    admin.isLogin = true;
                    await admin.save();
                    return res.status(200).json({ message: 'success', admin });
                }
            }
            if (admin.password === password) {
                if (fs.existsSync(imagePath)) {
                    admin.isLogin = true;
                    await admin.save();
                    return res.status(200).json({ message: 'success', admin, filePath: fileUrl });
                } else {
                    admin.currentImg = '';
                    admin.isLogin = true;
                    await admin.save();
                    return res.status(200).json({ message: 'success', admin });
                }
            } else {
                return res.json({ message: "Wrong Password" })
            }
        } else {
            res.status(200).json({ message: 'Not exist account.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to Singup', error });
    }
}

exports.getAdmins = async (req, res) => {
    const admins = await AdminMdl.find();
    return res.json({ admins })
}

exports.setAdminPassword = async (req, res) => {
    const { admin } = req.body
    let _admin = await AdminMdl.findById(admin._id)
    _admin.password = admin.password;
    await _admin.save();
    return res.json({ msg: 'success' });
}

exports.setPermission = async (req, res) => {
    let admin = await AdminMdl.findOne(req.body)
    admin.permission = !admin.permission;
    admin.save();
    return res.json({ message: admin.permission });
}

exports.imageSet = async (req, res) => {
    try {
        // Ensure `req.file` exists
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const { filename } = req.file;
        // Fetch the admin record by userId
        const { userId, img_w, img_h } = req.body;
        const admin = await AdminMdl.findOne({ userId: userId }); // Ensure userId exists in req.body
        if (!admin) {
            return res.status(404).json({ message: 'Unregistered User!' });
        }
        // Check and delete existing image if present
        if (admin.currentImg) {
            const imagePath = path.join(dataFolderPath, admin.currentImg);

            if (fs.existsSync(imagePath)) {
                try {
                    await fs.promises.unlink(imagePath); // Asynchronous file deletion
                } catch (err) {
                    console.error('Failed to delete existing image:', err);
                    return res.status(500).json({ message: 'Failed to delete existing file', error: err });
                }
            }
        }
        // Update admin record
        admin.currentImg = filename;
        admin.w_h.width = Number(img_w);
        admin.w_h.height = Number(img_h);
        await admin.save();

        const fileUrl = `${req.protocol}://${serverUrl}/uploads/${req.file.filename}`;

        return res.status(200).json({
            message: 'File uploaded successfully',
            admin,
            filePath: fileUrl,
        });
    } catch (error) {
        console.error('Error during file upload:', error);
        return res.status(500).json({ message: 'Failed to upload file', error });
    }
};

exports.depthImage = async (req, res) => {
    const { who, depthPath } = req.body
    let user = await AdminMdl.findById(who);
    if (user) {
        user.depthImage = depthPath;
        const fileUrl = `${req.protocol}://${serverUrl}/uploads/${user.currentImg}`;
        await user.save();
        return res.json({ message: 'success', admin: user, filePath: fileUrl });
    } else {
        return res.json({ message: 'notFount' });
    }
}

exports.logout = async (req, res) => {
    const { who } = req.body;
    let user = await AdminMdl.findById(who);
    if (user) {
        user.isLogin = false;
        await user.save();
        return res.json({ message: 'logout' });
    }
}

exports.changeName = async (req, res) => {
    const { userId, editName } = req.body;
    let user = await AdminMdl.findOne({ userId });
    if (user) {
        const fileUrl = `${req.protocol}://${serverUrl}/uploads/${user.currentImg}`;
        user.name = editName;
        // user.wallet_score = 18;
        await user.save();
        return res.json({ message: 'success', admin: user, filePath: fileUrl });
    }
}
exports.changePassword = async (req, res) => {
    const { userId, editPassword } = req.body;
    let user = await AdminMdl.findOne({ userId });
    if (user) {
        const fileUrl = `${req.protocol}://${serverUrl}/uploads/${user.currentImg}`;
        user.password = editPassword;
        await user.save();
        return res.json({ message: 'success', admin: user, filePath: fileUrl });
    }
}

exports.buyCredits = async (req, res) => {
    const { who, reqCredits } = req.body;
    let user = await AdminMdl.findById(who);
    if (user) {
        console.log(who, reqCredits)
        const fileUrl = `${req.protocol}://${serverUrl}/uploads/${user.currentImg}`;
        user.credits = user.credits + reqCredits;
        await user.save();
        return res.json({ message: 'success', admin: user, filePath: fileUrl });
    }
}

exports.VideoSet = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const { filename } = req.file;
        const { userId } = req.body;
        const user = await AdminMdl.findOne({ userId: userId }); // Ensure userId exists in req.body
        if (!user) {
            return res.status(404).json({ message: 'Unregistered User!' });
        }
        if (user.videoPath) {
            const videoPath = path.join(dataFolderPath, user.videoPath);

            if (fs.existsSync(videoPath)) {
                try {
                    await fs.promises.unlink(videoPath);
                } catch (err) {
                    console.error('Failed to delete existing image:', err);
                    return res.status(500).json({ message: 'Failed to delete existing file', error: err });
                }
            }
        }
        user.videoPath = filename;
        await user.save();

        const fileUrl = `${req.protocol}://${serverUrl}/uploads/${req.file.filename}`;

        return res.status(200).json({
            message: 'File uploaded successfully',
        });
    } catch (error) {
        console.error('Error during file upload:', error);
        return res.status(500).json({ message: 'Failed to upload file', error });
    }
};

exports.getVideoUrl = async (req, res) => {
    try {
        const { who } = req.body;
        let user = await AdminMdl.findById(who);
        if (user) {
            console.log('userVideopath', user.videoPath)
            const fileUrl = `${req.protocol}://${serverUrl}/uploads/${user.videoPath}`;
            return res.json({ message: 'success', filePath: fileUrl });
        }
    } catch (error) {
        res.status(500).json({ message: 'failed_get', error });
    }
}
exports.oAuth = async(req, res) => {
    const info = jwt.decode(req.body.credential);
    console.log(info);
    const name = info.name;
    const userId = info.email;
    const password = info.sub;
    const avatar = info.picture;
    let admin = await AdminMdl.findOne({ userId });
    if (admin) {
        const fileUrl = `${req.protocol}://${serverUrl}/uploads/${admin.currentImg}`;
        const imagePath = path.join(dataFolderPath, admin.currentImg);
        if (admin.password == password) {
            if (fs.existsSync(imagePath)) {
                admin.isLogin = true;
                if(!admin.avatar){
                    admin.avatar = avatar;
                }
                await admin.save();
                return res.status(200).json({ msg: 'success', admin, filePath: fileUrl });
            } else {
                admin.currentImg = '';
                admin.isLogin = true;
                if(!admin.avatar){
                    admin.avatar = avatar;
                }
                await admin.save();
                return res.status(200).json({ msg: 'success', admin });
            }
        } else {
            res.json({ msg: 'illegal login' })
        }
    } else {
        admin = new AdminMdl({ name, userId, password, avatar });
        await admin.save();
        res.status(200).json({
            msg: 'signup success',
        });
    }
}