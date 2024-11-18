const express = require('express');
const dashboardRouter = express.Router();
const { getTodayTotalEntries, getMonthlyBlotterEntries } = require('../controllers/dashboard-controller.js');

dashboardRouter.get('/api/dashboard-card-value', getTodayTotalEntries);
dashboardRouter.get('/api/monthly-blotter-entries', getMonthlyBlotterEntries);

module.exports = dashboardRouter;