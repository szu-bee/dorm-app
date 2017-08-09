const express = require('express');
const router = express.Router();

const fs = require('fs');
const formidable = require('formidable');
const mongooseToCsv = require('mongoose-to-csv');

const bookingModel = require('../schemas/booking');
const photosModel = require('../schemas/photos');

const exportCsv = require('../utils/exportCsv');

router.post('/', (req, res) => {
  const body = req.body;
  bookingModel.create(body, err => {
    if (err) {
      res.status(500).send('Fail to store booking information!');
    } else {
      res.send('Succeed!');
    }
  });
});

router.get('/', (req, res) => {
  if (req.query['studentid']) {
    bookingModel.findOne({ studentId: req.query['studentid'] }, (err, booking) => {
      if (err) {
        res.status(500).send('Fail to find by studentId');
      } else if (!booking) {
        res.status(404).send('Student not exsit!');
      } else {
        res.json(booking.agreeStatus);
      }
    });
  } else {
    bookingModel.find((err, bookings) => {
      if (err) {
        res.status(500).send('Fail to get bookings');
        return;
      }
      res.json(bookings);
    });
  }  
});

router.get('/booking.csv', (req, res) => {
  exportCsv(res, 'booking.csv', bookingModel);
});

router.put('/', (req, res) => {
  bookingModel.findByIdAndUpdate(req.body._id, req.body)
    .then(booking => {
      res.send('Succeed!');
    })
    .catch(err => {
      res.status(500).send('Fail to save row status');
    })
});


router.post('/passport_url', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return;
    }
    const file = files.file;
    const content = fs.readFileSync(file.path);
    photosModel.findOne({ phone: fields.phone }, (err, photoItem) => {
      if (err) {
        res.status(500).send('Unable to find photos!');
        return;
      }
      if (!photoItem) {
        photosModel.create({
          phone: fields.phone,
          passportPhoto: content
        })
        .then(() => {
          res.send('Successful!');
        })
        .catch(err => {
          res.status(500).send('Unable to store photos!');
        })
      } else {
        photoItem.update({
          passportPhoto: content
        }, err => {
          if (err) {
            res.status(500).send('Unable to update photos!');
          } else {
            res.send('Successful!');
          }
        });
      }
    });
  });
});

router.post('/stu_card_url', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return;
    }
    const file = files.file;
    const content = fs.readFileSync(file.path);
    photosModel.findOne({ 
      phone: fields.phone 
    }, (err, photoItem) => {
      if (err) {
        res.status(500).send('Unable to find photos!');
        return;
      }
      if (!photoItem) {
        photosModel.create({
          phone: fields.phone,
          stuCardPhoto: content
        })
        .then(() => {
          res.send('Successful!');
        })
        .catch(err => {
          res.status(500).send('Unable to store photos!');
        })
      } else {
        photoItem.update({
          passportPhoto: content
        }, err => {
          if (err) {
            res.status(500).send('Unable to update photos!');
          } else {
            res.send('Successful!');
          }
        });
      }
    });
  });
});


module.exports = router;