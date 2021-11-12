var express = require('express');
var connection = require('../database/db.js');
var model = require('../database/models.js');
var app = express();
var port = 5050;
var fs = require('fs');

app.use(express.json());

app.get('/qa/questions', (req, res) => {
  model.getQuestions(req, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

app.get(`/qa/questions/:question_id/answers`, (req, res) => {
  model.getAnswers(req, (error, results) => {
    if (error) {
      res.status(400);
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

app.post('/qa/questions', (req, res) => {
  model.insertQuestion(req, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(201);
      res.send(results);
    }
  });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  model.insertAnswers(req, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(201);
      res.send(results);
    }
  });
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  model.updateHelpfulQuestion(req, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200);
      res.send('this question was helpful!');
    }
  });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  model.updateHelpfulAnswer(req, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200);
      res.send('this answer was helpful!');
    }
  });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  model.reportQuestion(req, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200);
      res.send('successlly reported question');
    }
  });
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  model.reportAnswer(req, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200);
      res.send('successfully reported answer');
    }
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}...`);
})