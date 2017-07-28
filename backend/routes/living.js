const express = require('express');
const router = express.Router();
const livingModel = require('../schemas/living');
const exportCsv = require('../utils/exportCsv');

router.post('/', (req, res) => {
  livingModel.create(req.body, (err, saved) => {
    if (err) {
      res.status(500).send('fail to save living info.');
    } else {
      res.json(saved);
    }
  });
});

router.get('/', (req, res) => {
  livingModel.find((err, livings) => {
    if (err) {
      res.status(500).send('fail to retrieve living info.');
    } else {
      res.json(livings);
    }
  });
});

router.get('/living.csv', (req, res) => {
  exportCsv(res, 'living.csv', livingModel);
});

router.get('/statistics', (req, res) => {
  livingModel.find({})
    .then(livings => {
      const countryStat = {};
      livings.map(living => living.country)
        .forEach(country => {
          if (!country) return;
          const count = countryStat[country];
          countryStat[country] = (count ? count + 1 : 1);
        });

      const sexStat = {};
      livings.map(living => living.sex)
        .forEach(sex => {
          if (!sex) return;
          const count = sexStat[sex];
          sexStat[sex] = count ? count + 1 : 1;
        });

      res.json([countryStat, sexStat]);
    })
    .catch(err => {
      res.status(500).send('Fail to get statistics');
    });
});

router.put('/', (req, res) => {
  livingModel.findOneAndUpdate({
      _id: req.body._id
    },
    req.body, (err) => {
      if (err) {
        res.status(500).send('fail to update living info.');
      } else {
        res.send('living info update.');
      }
    })
});

router.delete('/', (req, res) => {
  livingModel.findByIdAndRemove(req.query.id)
    .then(() => {
      res.send('Succeed!');
    })
    .catch(err => {
      res.status(500).send('Fail to delete row');
    });
});

module.exports = router;