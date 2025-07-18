const { createBlotterEntry } = require('../controllers/add-blotter-controller.js');

const express = require('express');
const path = require('path');
const addBlotterRouter = express.Router();

addBlotterRouter.post('/api/add-blotter', createBlotterEntry);

module.exports = addBlotterRouter;