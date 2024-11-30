const express = require('express');
const dashboardRouter = express.Router();
const { getChartDataset, getCardValues } = require('../controllers/dashboard-controller.js');

dashboardRouter.get('/api/chart-datasets', getChartDataset);
dashboardRouter.get('/api/card-values', getCardValues);

module.exports = dashboardRouter;