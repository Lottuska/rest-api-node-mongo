var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    title: {type: String, required: true, maxlength: 200},
    author: {type: String, required: true, maxlength: 200},
    published: {type: Date, required: true},
    genre: [{type: String, required: false, maxlength: 150}]
  }
);

module.exports = mongoose.model('Book', BookSchema);
