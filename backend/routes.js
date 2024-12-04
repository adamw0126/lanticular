const express = require('express');
const router = express.Router();
const multer = require('multer');

// Set up storage engine using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize upload
const upload = multer({ storage });

// controller
const AdminController = require('./controllers/adminCtrl');
const exportController = require('./controllers/exportsCtrl');

// Define the routes
router.post('/signup', AdminController.addAdmin);
router.post('/signin', AdminController.login);
router.get('/getAdmins', AdminController.getAdmins);
router.post('/uploadImage', upload.single('file'), AdminController.imageSet);
router.post('/uploadVideo', upload.single('file'), AdminController.VideoSet);
router.post('/setAdminPassword', AdminController.setAdminPassword);
router.post('/getVideoUrl', AdminController.getVideoUrl);
router.post('/depthImage', AdminController.depthImage);
router.post('/logout', AdminController.logout);

router.post('/acc/changeName', AdminController.changeName);
router.post('/acc/changePassword', AdminController.changePassword);
router.post('/buyCredits', AdminController.buyCredits);

router.post('/exportsAdd', exportController.exportsAdd);
router.post('/getHistory', exportController.getHistory);

// Define a route with a URL parameter
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is: ${userId}`);
});

module.exports = router;
