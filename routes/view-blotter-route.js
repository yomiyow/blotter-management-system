const express = require('express');
const viewBlotterRouter = express.Router();
const { getBlotterRecords, getSortedBlotterRecords, searchBlotterRecord } = require('../controllers/view-blotter-controller.js');

viewBlotterRouter.get('/api/view-blotter', getBlotterRecords);
viewBlotterRouter.get('/api/search', searchBlotterRecord);
viewBlotterRouter.get('/api/sort', getSortedBlotterRecords);

module.exports = viewBlotterRouter;