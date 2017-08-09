const connection = require('../utils/db');
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  passportPhoto: Buffer,
  stuCardPhoto: Buffer
});


module.exports = connection.model('photos', photoSchema);
