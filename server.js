const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');

// app.use('/', indexRouter);
app.use(bodyParser.json());
app.use('/', indexRouter)

const port = config.port;

// app.listen(port, () => {
//   console.log(`Web Server is listening at port ${port}`);
// });

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});


