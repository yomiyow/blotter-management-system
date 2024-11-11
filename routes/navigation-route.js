const express = require('express');
const path = require('path');

const navRouter = express.Router();

navRouter.get('/api/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});
navRouter.get('/api/new-entry', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/new-entry.html'));
});
navRouter.get('/api/view-entry', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/view-entry.html'));
});
navRouter.get('api/report', (req, res) => {
  // res.sendFile(path.join(__dirname, '../views/dashboard.html'));
  res.send('Report Page');
});

module.exports = navRouter;