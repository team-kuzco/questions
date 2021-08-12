var express = require('express');
var connection = require('../database/db.js')
var app = express();
var port = 3006;
var fs = require('fs');

app.use(express.json());

app.get('/', (req, res) => {
  connection.query('SELECT * FROM questions WHERE product_id = 1', (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  })
})



app.listen(port, () => {
  console.log(`listening on ${port}...`);
})