const express = require('express');
const viewPdfRouter = express.Router();
const buildPdf = require('../controllers/view-pdf-controller.js');

viewPdfRouter.get('/nav/view-blotter/pdf', buildPdf);

module.exports = viewPdfRouter;