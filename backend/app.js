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

app.use('/be/api', index);
app.use('/be/api/login', login);
app.use('/be/api/living', living);
app.use('/be/api/noti', noti);
app.use('/be/api/booking', booking);

app.use((req, res, next) => {
  if (req.path === '/login' && 
    req.method === 'POST') {
    next();
  }

  const sid = req.body.sessionId;
  if (sid.length !== 313) {
    return;
  }

  loginModel.findOne(login[0])
    .then(res => {
      const expectedSid = res.sessionId;
      console.log(res);
      console.log(expectedSid);

      const isTimeOut = sid.substring(sid.length - 13) > 
        expectedSid.substring(expectedSid.length - 13);

      if (sid !== expectedSid || isTimeOut) {
        res.send(400).end();
      }
      next();
    })
    .catch(err => {
      res.status(500).send('Could not find sessionId!');
    });
});

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