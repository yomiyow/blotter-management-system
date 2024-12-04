const express = require('express');
const reportRouter = express.Router();
const {
  getReports, searchBlotterRecord,
  getSortedBlotterRecords,
  getFilteredBlotterRecords,
  getBarangays
} = require('../controllers/report-controller.js');

reportRouter.get('/api/reports', getReports);
reportRouter.get('/api/search-report', searchBlotterRecord);
reportRouter.get('/api/sort-reports', getSortedBlotterRecords);
reportRouter.get('/api/filter-reports', getFilteredBlotterRecords);
reportRouter.get('/api/barangay', getBarangays);

module.exports = reportRouter;