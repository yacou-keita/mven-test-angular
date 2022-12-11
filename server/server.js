const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// DB connection string
const DB = process.env.DATABASE_LOCAL;

// Connect mongoose to DB
mongoose.connect(DB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).
  then(() => console.log('Database connection successfully...!'))
  .catch(err => console.log(err));

// Call express app
const app = require('./app');

// Get Port from env variables
const port = process.env.NODE_PORT || 3002;

// Listen for request
const server = app.listen(port, () => console.log(`'Server running on port ${port}...!'`));
