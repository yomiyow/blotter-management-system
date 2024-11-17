const express = require('express');
const dashboardRouter = express.Router();
const todayTotalEntries = require('../controllers/dashboard-controller.js');

dashboardRouter.get('/api/dashboard', todayTotalEntries);

module.exports = dashboardRouter;