require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.disable('x-powered-by');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`OpenJob API is running on http://${host}:${port}`);
});
