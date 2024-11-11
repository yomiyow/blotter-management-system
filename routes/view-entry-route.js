const express = require('express');
const viewEntryRouter = express.Router();
const { getBlotterRecords } = require('../controllers/view-entry-controller.js');

viewEntryRouter.get('/view-entry', getBlotterRecords);

module.exports = viewEntryRouter;