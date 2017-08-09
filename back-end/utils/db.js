const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const url_join = require('url-join')
const conf = require('./conf.js')

const connection = mongoose.createConnection(url_join(conf.src, conf.db))
autoIncrement.initialize(connection)

module.exports = connection