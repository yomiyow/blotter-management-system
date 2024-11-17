const express = require('express');
const path = require('path');
const navRouter = require('./routes/navigation-route.js');
const dashboardRouter = require('./routes/dashboard-route.js')
const newEntryRouter = require('./routes/new-entry-route.js');
const viewEntryRouter = require('./routes/view-entry-route.js');
const editEntryRouter = require('./routes/edit-entry-routes.js');
const viewPdfRouter = require('./routes/view-pdf-route.js');

const app = express();
const port = 3000;

/* Middlewares */

app.use((req, res, next) => {
  console.log('Client request: ' + req.method, req.url, req.body);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(navRouter);
app.use(dashboardRouter);
app.use(newEntryRouter);
app.use(viewEntryRouter);
app.use(editEntryRouter);
app.use(viewPdfRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});