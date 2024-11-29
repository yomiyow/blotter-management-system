const express = require('express');
const path = require('path');

const navRouter = express.Router();

navRouter.get('/nav/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});
navRouter.get('/nav/add-blotter', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/add-blotter.html'));
});
navRouter.get('/nav/view-blotter', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/view-blotter.html'));
});
navRouter.get('/nav/view-blotter/edit', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/edit-blotter.html'));
});
navRouter.get('/nav/report', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/report.html'));
});

module.exports = navRouter;