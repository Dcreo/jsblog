var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var app = express();
var indexRouter = require('./routes/index');
var adminUsersRouter = require('./routes/admin/users');
var adminArticlesRouter = require('./routes/admin/articles');
var adminSessionsRouter = require('./routes/admin/sessions');
const userMiddleware = require('./middlewares/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: '1234567',
  resave: false,
  saveUninitialized: false,
  maxAge: 60000
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(userMiddleware.currentUser);

app.use('/', indexRouter);
app.use('/users', adminUsersRouter);
app.use('/admin/articles', adminArticlesRouter);
app.use('/sessions', adminSessionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
