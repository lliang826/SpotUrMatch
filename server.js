const express = require('express');
const app = express();
const fs = require("fs");

// GENERAL CONSTANTS
const msg404 = 'These are not the codes that you are looking for.';


// STATIC DIRECTORIES


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use(function (req, res, next) {
  res.status(404).send(msg404);
});

// RUN SERVER
let port = 8000;

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});