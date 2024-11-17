const express = require('express');
const viewPdfRouter = express.Router();
const buildPdf = require('../controllers/view-pdf-controller.js');

viewPdfRouter.get('/nav/view-entry/pdf', buildPdf);

module.exports = viewPdfRouter;