const express = require('express');
const profileRouter = express.Router();
const path = require('path');
const getAccountInfo = require('../controllers/profile-controller.js');

profileRouter.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/profile.html'))
});
profileRouter.post('/api/account-info', getAccountInfo)

module.exports = profileRouter;