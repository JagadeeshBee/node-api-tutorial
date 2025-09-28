// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch {
    res.status(400).send('Invalid ID');
  }
});

// POST new user
router.post('/', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    designation: req.body.designation
  });
  await newUser.save();
  res.status(201).json(newUser);
});

// PATCH update user
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    if (req.body.name) user.name = req.body.name;
    if (req.body.designation) user.designation = req.body.designation;
    await user.save();
    res.json(user);
  } catch {
    res.status(400).send('Invalid ID');
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch {
    res.status(400).send('Invalid ID');
  }
});

module.exports = router;
