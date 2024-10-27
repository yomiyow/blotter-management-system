import express from 'express';

const app = express();
const port = 3000;

/* Middlewares */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});