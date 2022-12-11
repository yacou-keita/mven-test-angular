const mongoose = require('mongoose');
const validator = require('validator');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A client must have a name'],
    trim: true,
    minlength: [2, 'A client name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'A client must have an email'],
    lowercase: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Your email is invalid'
    }
  },
  phone: {
    type: String,
    unique: true,
  },
  providers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Provider',
    }
  ]
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;