const express = require('express');
const viewEntryRouter = express.Router();
const { getBlotterRecords } = require('../controllers/view-entry-controller.js');
const path = require('path');

viewEntryRouter.get('/view-entry', getBlotterRecords);
viewEntryRouter.get('/nav/view-entry/edit/:blotterId', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/edit-entry.html'));
});
module.exports = viewEntryRouter;