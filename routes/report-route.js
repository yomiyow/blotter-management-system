const express = require('express');
const reportRouter = express.Router();
const getReports = require('../controllers/report-controller.js');

reportRouter.get('/api/reports', getReports);

module.exports = reportRouter;