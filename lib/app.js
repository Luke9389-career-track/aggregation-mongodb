const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');

// MIDDLEWARE
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(express.static('public'));
app.use(express.json());
app.use(checkConnection);

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

// API ROUTES
const zips = require('./routes/zip-routes');
const students = require('./routes/student-routes');
const trades = require('./routes/trade-routes');
const grades = require('./routes/grade-routes');
const books = require('./routes/book-routes');

app.use('/api/zips', zips);
app.use('/api/students', students);
app.use('/api/trades', trades);
app.use('/api/grades', grades);
app.use('/api/books', books);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
// using express default 404 for non-api routes

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;