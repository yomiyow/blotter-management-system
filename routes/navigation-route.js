const express = require('express');
const path = require('path');

const navRouter = express.Router();

navRouter.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});
navRouter.get('/new-entry', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/new-entry.html'));
});
navRouter.get('/view-entry', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/view-entry.html'));
});
navRouter.get('/report', (req, res) => {
  // res.sendFile(path.join(__dirname, '../views/dashboard.html'));
  res.send('Report Page');
});

module.exports = navRouter;