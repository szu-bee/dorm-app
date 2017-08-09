const axios = require('axios');
const xlsx2json = require('xlsx2json');

xlsx2json('living.xls', {
  dataStartingRow : 2,
  mapping: {
    'room': 'A',
    'name': 'B',
    'sex': 'C',
    'country': 'D',
    'eduBackground': 'E',
    'passport': 'F',
    'studentId': 'G',
    'regiDate': 'H',
    'visaId': 'I',
    'visaDue': 'J',
    'bookRemark': 'K',
    'deposit': 'L',
    'paymentRecord': 'M',
    'endTime': 'N',
    'phone': 'O'
  }
})
.then(json => {
  json[0].filter(row => row && row.room)
    .forEach(transRow => {
      axios.post('http://localhost:4567/be/api/living', transRow)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.error(e);
        });
  });
})
.catch(err => {
  console.error(err);
});

