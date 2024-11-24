const express = require('express');
const viewEntryRouter = express.Router();
const { getBlotterRecords, getSortedBlotterRecords, searchBlotterRecord } = require('../controllers/view-entry-controller.js');

viewEntryRouter.get('/api/view-entry', getBlotterRecords);
viewEntryRouter.get('/api/search', searchBlotterRecord);
viewEntryRouter.get('/api/sort', getSortedBlotterRecords);

module.exports = viewEntryRouter;