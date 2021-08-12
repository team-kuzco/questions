var sql = require('db.js');

var Question = function(question) {
  this.body = question.body;
  this.name = question.name;
  this.email = question.email;
  this.productId = question.product_id;
};

Question.create = (newQuestion, result) => {

};

Question.getAll = result => {
 
}