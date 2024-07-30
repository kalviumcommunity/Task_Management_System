const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User')
const {Todo} = require('../models/Data')
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config(); // Load environment variables

router.post('/tasks', async (req, res) => {
  const { task } = req.body;
  try {
    const newTask =  Todo({
      task
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Error adding task' });
  }
});

// Sign Up Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    return res.json({ status: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Error registering user' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User is not registered' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Password is incorrect' });
      }
  
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.cookie('authToken', token, { maxAge: 3600000, httpOnly: true });
      res.cookie('username', user.username, { maxAge: 3600000 });
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Error logging in' });
    }
  });
  
  router.get("/todos",async (req,res)=>{
    try{
      const todos=await Todo.find();
      res.json(todos);
      }catch(error){
        console.error("Error fetching todos:",error);
        res.status(500).json({message:"Error fetching todos"});
  }})
  

  module.exports = router;