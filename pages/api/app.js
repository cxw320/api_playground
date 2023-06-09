const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');


const app = express();

require('dotenv').config();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

const promptResponse = require('./routes/promptResponse');

app.use('/api/promptResponse', promptResponse);

app.use(notFound);
app.use(errorHandler);

module.exports = app;