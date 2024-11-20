const express = require('express');
const path = require('path');
const authRouter = express.Router();
const { loginUser, registerUser } = require('../controllers/auth-controller.js');

// Login routes

authRouter.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});
authRouter.post('/login', loginUser);

// Register routes

authRouter.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
});
authRouter.post('/register', registerUser);

module.exports = authRouter;