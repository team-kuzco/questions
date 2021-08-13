var express = require('express');
var connection = require('../database/db.js')
var app = express();
var port = 3006;
var fs = require('fs');

app.use(express.json());

app.get('/qa/questions', (req, res) => {
  console.log(req)
  connection.query('SELECT * FROM questions WHERE product_id = ?', [req.query.product_id], (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  })
})
// what would i need to create in order to aquire the data which    would act as input for the VALUES below
  // data = input from the client
    // look into using req.body
app.post('/qa/questions', (req, res) => {
  connection.query(`INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (?, ?, ?, ?, ?, 0, 0)`, [req.body.product_id, req.body.body, req.body.date_written, req.body.asker_name, req.body.asker_email], (error) => {
    if (error) {
      res.send(error);
    } else {
      res.status(201)
      res.send(req.body)
    }
  });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  connection.query('INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (?, ?, ?, ?, ?, 0, 0)', [req.body.question_id, req.body.body, req.body.date_written, req.body.answerer_name, req.body.answerer_email], (error) => {
    if (error) {
      res.send(error)
    } else {
      res.status(201)
      res.send(req.body)
    }
  });
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  connection.query('UPDATE questions SET helpful = helpful + 1 WHERE product_id = ?', [req.body.product_id], (error) => {
    if (error) {
      res.send(error)
    } else {
      res.status(200)
      res.send('success')
    }
  });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  connection.query('UPDATE answers SET helpful = helpful + 1 WHERE question_id = ?', [req.body.question_id], (error) => {
    if (error) {
      res.send(error)
    } else {
      res.status(200)
      res.send('success')
    }
  });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  connection.query('UPDATE questions SET reported = 1 WHERE id = ?', [req.body.id], (error) => {
    if (error) {
      res.send(error)
    } else {
      res.status(200)
      res.send('successlly reported question')
    }
  });
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  connection.query('UPDATE answers SET reported = 1 WHERE id = ?', [req.body.id], (error) => {
    if (error) {
      res.send(error)
    } else {
      res.status(200)
      res.send('successfully reported answer')
    }
  });
});



app.listen(port, () => {
  console.log(`listening on ${port}...`);
})