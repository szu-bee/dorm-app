const express = require('express');
const router = express.Router();

const loginModel = require('../schemas/login');
const bcrypt = require('bcrypt');

router.put('/', (req, res) => {
  loginModel.create(req.body, (err, saved) => {
    if (err) {
      res.status(500).send('fail to save pass info.');
    } else {
      res.json(saved);
    }
  });
});

let sessionId = '';
const charMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 
  'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '!', '@', '#', '$', '%', '^', '&', '*', '-', '+', '?', '~', '.'];
let rdStr = '';
for (let i = 0; i < 300; i++) {
  rdStr += charMap[Math.floor(Math.random() * 49) % 50];
}
sessionId += rdStr;
const timeStamp = new Date().getTime() + 12 * 60 * 60 * 1000;
sessionId += timeStamp;

router.post('/', (req, res) => {
  loginModel.find({})
    .then(login => {
      if (bcrypt.compareSync(req.body.pass, login[0].hashedPass)) {
        loginModel.update({ 'sessionId': sessionId })
          .then(sid => {
            res.send(sessionId);
          })
          .catch(err => {
            res.status(500).send('Fail to update sessionId!');
          });
      } else {
        res.status(400).send('Incorrect pass!');
      }
    })
    .catch(err => {
      res.status(500).end();
    });
});


module.exports = router;