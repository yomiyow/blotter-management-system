const express = require('express');
const editEntryRouter = express.Router();
const path = require('path');
const { getBlotterById, updateBlotterById } = require('../controllers/edit-entry-controller.js');

editEntryRouter.get('/nav/view-entry/edit', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/edit-entry.html'));
});
editEntryRouter.get('/api/view-entry/edit', getBlotterById);
editEntryRouter.put('/api/view-entry/edit/:blotterId', updateBlotterById);

module.exports = editEntryRouter;