const express = require('express');
const path = require('path');
const navRouter = require('./routes/navigation-route.js');
const newEntryRouter = require('./routes/new-entry-route.js');
const viewEntryRouter = require('./routes/view-entry-route.js');

const app = express();
const port = 3000;

/* Middlewares */

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(navRouter);
app.use(newEntryRouter);
app.use(viewEntryRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});