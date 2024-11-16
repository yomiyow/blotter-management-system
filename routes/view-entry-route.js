const express = require('express');
const viewEntryRouter = express.Router();
const { getBlotterRecords } = require('../controllers/view-entry-controller.js');

viewEntryRouter.get('/api/view-entry', getBlotterRecords);

module.exports = viewEntryRouter;