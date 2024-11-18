const express = require('express');
const viewEntryRouter = express.Router();
const { getBlotterRecords, searchBlotterRecord } = require('../controllers/view-entry-controller.js');

viewEntryRouter.get('/api/view-entry', getBlotterRecords);
viewEntryRouter.get('/api/search', searchBlotterRecord);

module.exports = viewEntryRouter;