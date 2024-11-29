const express = require('express');
const editBlotterRouter = express.Router();
const { getBlotterById, updateBlotterById } = require('../controllers/edit-blotter-controller.js');

editBlotterRouter.get('/api/view-entry/edit', getBlotterById);
editBlotterRouter.put('/api/view-entry/edit/:blotterId', updateBlotterById);

module.exports = editBlotterRouter;