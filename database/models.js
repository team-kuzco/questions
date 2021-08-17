var connection = require('./db.js')


var getQuestions = (req, callback) => {
  connection.query('SELECT * FROM questions WHERE product_id = ?', [req.query.product_id], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};


var getAnswers = (req, callback) => {
  connection.query('SELECT * FROM answers WHERE question_id = ?', [req.params.question_id], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      for (let i = 0; i < result.length; i += 1) {
        connection.query(`SELECT * FROM answersPhotos WHERE answer_id = ${result[i].id}`, (error, result1) => {
          if (error) {
            callback(error, null)
          } else {
            result[i].photos = [];
            result[i].photos.push(result1)
            if (i === result.length - 1) {
              callback(null, result)
            }
          }
        })
      }
    }
  })
}

var insertQuestion = (req, callback) => {
  connection.query(`INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (?, ?, ?, ?, ?, 0, 0)`, [req.body.product_id, req.body.body, req.body.date_written, req.body.asker_name, req.body.asker_email], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, req.body)
    }
  });
};

var insertAnswers = (req, callback) => {
  connection.query('INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (?, ?, ?, ?, ?, 0, 0)', [req.body.question_id, req.body.body, req.body.date_written, req.body.answerer_name, req.body.answerer_email], (error, result) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, req.body)
    }
  });
};

var updateHelpfulQuestion = (req, callback) => {
  connection.query('UPDATE questions SET helpful = helpful + 1 WHERE product_id = ?', [req.body.product_id], (error, results) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, results)
    }
  });
};

var updateHelpfulAnswer = (req, callback) => {
  connection.query('UPDATE answers SET helpful = helpful + 1 WHERE question_id = ?', [req.body.question_id], (error, results) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, results)
    }
  });
};

var reportQuestion = (req, callback) => {
  connection.query('UPDATE questions SET reported = 1 WHERE id = ?', [req.body.id], (error) => {
    if (error) {
      res.send(error, null)
    } else {
      res.send(null, results)
    }
  });
};

var reportAnswer = (req, callback) => {
  connection.query('UPDATE answers SET reported = 1 WHERE id = ?', [req.body.id], (error) => {
    if (error) {
      res.send(error)
    } else {
      res.send('successfully reported answer')
    }
  });
};

module.exports = {
  getQuestions,
  getAnswers,
  insertAnswers,
  insertQuestion,
  updateHelpfulQuestion,
  updateHelpfulAnswer,
  reportQuestion,
  reportAnswer
};