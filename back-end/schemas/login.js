const connection = require('../utils/db');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  hashedPass: String,
  sessionId: String
});


module.exports = connection.model('login', loginSchema);