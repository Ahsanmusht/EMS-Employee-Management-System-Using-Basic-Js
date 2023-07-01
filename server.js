const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('Enter your db url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Routes
// Add your routes here
// Routes

const candidateRouter = require('./routes/candidates');

// ...

app.use('/candidates', candidateRouter);

// ...


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
