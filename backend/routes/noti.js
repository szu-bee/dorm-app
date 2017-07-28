const express = require('express');
const router = express.Router();

const notiModel = require('../schemas/noti');

router.put('/', (req, res) => {
  const noti = req.body;
  notiModel.remove((err) => {
    if (err) {
      res.status(500).send('Fail to delete notification!');
    }
    notiModel.create(noti, err => {
      if (err) {
        res.status(500).send('Fail to create notification!');
      }
      res.end('Ok!');
    })
  }).exec()
});

router.get('/', (req, res) => {
  notiModel.findOne((err, notification) => {
    if (err) {
      res.status(500).send('Fail to get notification.')
    }
    console.log(notification);
    res.json(notification);
  }).exec()
});

module.exports = router