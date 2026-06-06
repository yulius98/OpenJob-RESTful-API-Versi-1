require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler');

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`OpenJob API is running on http://${host}:${port}`);
});
