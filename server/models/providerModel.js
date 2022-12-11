const mongoose = require('mongoose');
const Client = require('../models/clientModel');


const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A provider must have a name'],
    unique: true,
  }
});

providerSchema.pre('remove', function (next) {
  this.model('Client').updateMany(
    {},
    { "$pull": { "providers": this._id } },
    { "multi": true },
    next,
  );
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = {
  Provider,
  providerSchema
};