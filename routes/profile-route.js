const express = require('express');
const profileRouter = express.Router();
const path = require('path');

profileRouter.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/profile.html'))
});

module.exports = profileRouter;