const express = require('express');
const path = require('path');

const navRouter = express.Router();

navRouter.get('/nav/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});
navRouter.get('/nav/new-entry', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/new-entry.html'));
});
navRouter.get('/nav/view-entry', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/view-entry.html'));
});
navRouter.get('/nav/report', (req, res) => {
  // res.sendFile(path.join(__dirname, '../views/dashboard.html'));
  res.send('Report Page');
});

module.exports = navRouter;