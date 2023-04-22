const express = require('express');
const app = express();
const config = require('./config');
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

const port = config.port;

app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});
