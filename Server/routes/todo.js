const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { Todo } = require('../models/Data');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

router.post('/tasks', async (req, res) => {
  const { task } = req.body;
  try {
    const newTask = Todo({
      task,
      userId: req.userId,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Error adding task' });
  }
});

router.get('/todo', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.status(200).send({ message: 'Todos found', todos });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

module.exports = router;
