const express = require('express');
const editEntryRouter = express.Router();
const { getBlotterById, updateBlotterById } = require('../controllers/edit-entry-controller.js');

editEntryRouter.get('/api/view-entry/edit', getBlotterById);
editEntryRouter.put('/api/view-entry/edit/:blotterId', updateBlotterById);

module.exports = editEntryRouter;