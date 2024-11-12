const insertBlotter = require('../controllers/new-entry-controller.js');

const express = require('express');
const path = require('path');
const newEntryRouter = express.Router();

newEntryRouter.post('/api/new-entry', insertBlotter);

module.exports = newEntryRouter;