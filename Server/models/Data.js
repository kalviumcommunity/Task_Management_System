const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: { type: String },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required:true}
  });

  const Todo = mongoose.model('Todo', TodoSchema);

  module.exports = {Todo}