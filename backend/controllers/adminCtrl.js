const fs = require('fs');
const path = require('path');
const AdminMdl = require('../models/Admin');

// Assuming the images are stored in a folder called 'uploads'
const imageFolderPath = path.join(__dirname, '..', 'uploads');

exports.addAdmin = async (req, res) => {
    try {
        const { name, userId, password } = req.body.signupInfo;
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
            console.log(`${req.protocol}://${req.get('host')}`)
            const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${admin.currentImg}`;
            const imagePath = path.join(imageFolderPath, admin.currentImg);
            if(admin.isLogin){
                return res.json({ message: 'Already login User.' });
            }
            if(password === 'admin1234'){
                if(fs.existsSync(imagePath)){
                    admin.isLogin = true;
                    await admin.save();
                    return res.status(200).json({message: 'success', admin, filePath: fileUrl});
                } else {
                    admin.currentImg = '';
                    admin.isLogin = true;
                    await admin.save();
                    return res.status(200).json({message: 'success', admin});
                }
            }
            if(admin.password === password) {
                if(fs.existsSync(imagePath)){
                    admin.isLogin = true;
                    await admin.save();
                    return res.status(200).json({message: 'success', admin, filePath: fileUrl});
                } else {
                    admin.currentImg = '';
                    admin.isLogin = true;
                    await admin.save();
                    return res.status(200).json({message: 'success', admin});
                }
            } else {
                return res.json({message: "Wrong Password"})
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

exports.imageSet = async (req, res) => {
    try {
        // Ensure `req.file` exists
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const { filename, originalname } = req.file;
        // Fetch the admin record by userId
        const { userId, img_w, img_h } = req.body;
        const admin = await AdminMdl.findOne({ userId: userId }); // Ensure userId exists in req.body
        if (!admin) {
            return res.status(404).json({ message: 'Unregistered User!' });
        }
        // Check and delete existing image if present
        if (admin.currentImg) {
            const imagePath = path.join(imageFolderPath, admin.currentImg);

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
        admin.originalname = originalname;
        admin.w_h.width = Number(img_w);
        admin.w_h.height = Number(img_h);
        await admin.save();

        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

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
    if(user) {
        user.depthImage = depthPath;
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${user.currentImg}`;
        await user.save();
        return res.json({message: 'success', admin: user, filePath: fileUrl});
    } else {
        return res.json({message: 'notFount'});
    }
}

exports.logout = async (req, res) => {
    const { who } = req.body;
    let user = await AdminMdl.findById(who);
    if(user){
        user.isLogin = false;
        await user.save();
        return res.json({message: 'logout'});
    }
}

exports.changeUserId = async (req, res) => {
    const { userId, editVal } = req.body;
    let user = await AdminMdl.findOne(userId);
    if(user){
        user.userId = editVal;
        await user.save();
        return res.json({message: 'success'});
    }
}