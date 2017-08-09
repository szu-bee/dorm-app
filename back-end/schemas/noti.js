const connection = require('../utils/db');
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const notiSchema = new Schema({
  title: String,
  content: String
});

notiSchema.plugin(autoIncrement.plugin, 'noti');
module.exports = connection.model('noti', notiSchema)