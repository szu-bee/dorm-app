const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const helmet = require('helmet');
const cors = require('cors');

const index = require('./routes/index');
const login = require('./routes/login');
const living = require('./routes/living');
const noti = require('./routes/noti');
const booking = require('./routes/booking');

const loginModel = require('./schemas/login');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use('/be', express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(cors());
app.use('/be/api/login', login);

app.use((req, res, next) => {
  if (req.path === '/be/api/noti' && req.method === 'GET') {
    next();
    return;
  }

  const sid = req.cookies.sid;
  if (!sid) {
    res.status(403).send('No cookie!');
    return;
  }
  if (sid.length !== 313) {
    res.status(403).send('False sid!');
    return;
  }

  loginModel.find({})
    .then(login => {
      const expectedSid = login[0].sessionId;
      const isTimeOut = sid.substring(sid.length - 13) > 
        expectedSid.substring(expectedSid.length - 13);

      if (sid !== expectedSid || isTimeOut) {
        res.send(403).send('False sid!');
      }
      next();
    })
    .catch(err => {
      res.status(500).send('Fail to find sid from db!');
    });
});

app.use('/be/api', index);
app.use('/be/api/living', living);
app.use('/be/api/noti', noti);
app.use('/be/api/booking', booking);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;