const fs = require('fs')
const content = fs.readFileSync('./conf.json')

module.exports = JSON.parse(content)