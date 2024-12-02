const express = require('express');
const editBlotterRouter = express.Router();
const { getBlotterById, updateBlotterById } = require('../controllers/edit-blotter-controller.js');
const checkUserPermission = require('./authorization.js');

editBlotterRouter.get('/api/view-blotter/edit', checkUserPermission('Edit Blotter'), getBlotterById);
editBlotterRouter.put('/api/view-blotter/edit/:blotterId', updateBlotterById);

module.exports = editBlotterRouter;