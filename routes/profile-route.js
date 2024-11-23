const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAccountInfo, updateAccountInfo } = require('../controllers/profile-controller.js');

const profileRouter = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/avatar'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

profileRouter.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/profile.html'));
});
profileRouter.post('/api/account-info', getAccountInfo);
profileRouter.put('/api/account-info/update', upload.single('avatar'), updateAccountInfo);

module.exports = profileRouter;