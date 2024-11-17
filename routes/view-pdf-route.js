const express = require('express');
const viewPdfRouter = express.Router();
const buildPdf = require('../controllers/view-pdf-controller.js');
const { getBlotterById } = require('../controllers/edit-entry-controller.js');

viewPdfRouter.get('/nav/view-entry/pdf', buildPdf);

module.exports = viewPdfRouter;