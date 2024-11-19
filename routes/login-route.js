const express = require('express');
const path = require('path');
const loginRouter = express.Router();
const loginUser = require('../controllers/login-controller.js');

loginRouter.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});
loginRouter.post('/login', loginUser);

module.exports = loginRouter;