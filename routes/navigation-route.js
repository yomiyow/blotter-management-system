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
navRouter.get('/nav/view-entry/edit', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/edit-entry.html'));
});
// navRouter.get('/nav/view-entry/pdf', (req, res) => {
//   // res.sendFile(path.join(__dirname, '../views/edit-entry.html'));
//   res.send('PDF view...');
// });
navRouter.get('/nav/report', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/report.html'));
});

module.exports = navRouter;