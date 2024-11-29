const { createBlotterEntry } = require('../controllers/new-entry-controller.js');

const express = require('express');
const path = require('path');
const addBlotterRouter = express.Router();

addBlotterRouter.post('/api/new-entry', createBlotterEntry);

module.exports = addBlotterRouter;