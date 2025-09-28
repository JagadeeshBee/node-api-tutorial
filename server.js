// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/userApiTutorial', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
