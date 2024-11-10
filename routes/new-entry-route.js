const insertBlotter = require('../controllers/new-entry-controller.js');

const express = require('express');
const path = require('path');
const newEntryRouter = express.Router();

// Middleware
newEntryRouter.use((req, res, next) => {
  console.log('Client request: ' + req.method, req.url, req.body);
  next();
});

newEntryRouter.post('/new-entry', insertBlotter);

module.exports = newEntryRouter;