const express = require('express');
const path = require('path');
const authRouter = require('./routes/auth-route.js');
const navRouter = require('./routes/navigation-route.js');
const dashboardRouter = require('./routes/dashboard-route.js')
const addBlotterRouter = require('./routes/add-blotter-route.js');
const viewBlotterRouter = require('./routes/view-blotter-route.js');
const editBlotterRouter = require('./routes/edit-blotter-routes.js');
const viewPdfRouter = require('./routes/view-pdf-route.js');
const reportRouter = require('./routes/report-route.js');
const profileRouter = require('./routes/profile-route.js');

const app = express();
const port = 3000;

/* Middlewares */

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(navRouter);
app.use(dashboardRouter);
app.use(addBlotterRouter);
app.use(viewBlotterRouter);
app.use(editBlotterRouter);
app.use(viewPdfRouter);
app.use(reportRouter);
app.use(profileRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});