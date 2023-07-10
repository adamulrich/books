// Get dependencies
var index = require('./server/routes/app');
const bookRoutes = require('./server/routes/books');
const authorRoutes = require('./server/routes/authors');
const mongoose = require('./database/connect');

var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);


// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.

// Tell the server to start listening on the provided port
//start
const server = app.listen(port, async (res, req) => {

  console.log(`App listening at ${port}`)
  try {
      const db = await mongoose.getDb();
        console.log("connected via mongoose to mongo db");
  } catch (error) {
      console.log(error);
  }
})

