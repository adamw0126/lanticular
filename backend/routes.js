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

const avatarStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'avatars/'); // Specify the folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize upload
const upload = multer({ storage });
const avatar = multer({ storage: avatarStore });

const interlace_upload = multer({ dest: "interlace_uploads/" });

// controller
const AdminController = require('./controllers/adminCtrl');
const exportController = require('./controllers/exportsCtrl');
const checkoutController = require('./controllers/checkoutCtrl');
const faqsController = require('./controllers/FaqsCtrl');
const SettingController = require('./controllers/settingCtrl');
const interlaceController = require('./controllers/interlaceCtrl');

router.post('/interlace', interlace_upload.none(), interlaceController.interlace);

// Define the routes
router.post('/oauth', AdminController.oAuth);
router.post('/signup', AdminController.addAdmin);
router.post('/signin', AdminController.login);
router.get('/getAdmins', AdminController.getAdmins);
router.post('/uploadImage', upload.single('file'), AdminController.imageSet);
router.post('/uploadVideo', upload.single('file'), AdminController.VideoSet);
router.post('/setAdminPassword', AdminController.setAdminPassword);
router.post('/getVideoUrl', AdminController.getVideoUrl);
router.post('/depthImage', AdminController.depthImage);
router.post('/logout', AdminController.logout);
router.post('/setPermission', AdminController.setPermission);

router.post('/acc/changeName', AdminController.changeName);
router.post('/acc/changePassword', AdminController.changePassword);
router.post('/buyCredits', AdminController.buyCredits);
router.post('/uploadProfileAvatar', avatar.single('file'), AdminController.uploadProfileAvatar);
router.post('/contactUs', AdminController.contactUs);
router.get('/getContacts', AdminController.getContacts);

router.post('/exportsAdd', exportController.exportsAdd);
router.post('/getHistory', exportController.getHistory);

router.post('/create-payment-intent', checkoutController.paymentIntent);

router.post('/addFAQ', faqsController.addFAQ);
router.get('/getFAQsData', faqsController.getFAQsData);
router.post('/deleteFAQ', faqsController.deleteFAQ);

router.post('/setCredit', SettingController.setCredit);
router.post('/setBonusCredit', SettingController.setBonusCredit);
router.get('/getSettingData', SettingController.getSettingData);

// Define a route with a URL parameter
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is: ${userId}`);
});

module.exports = router;
