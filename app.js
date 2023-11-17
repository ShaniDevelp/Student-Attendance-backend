var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const studentRouter = require('./routes/studentRoutes');
const adminRouter = require('./routes/adminRoutes');

var app = express();


const mongoose = require('mongoose');

// DB Connection
mongoose.set('strictQuery', false);
const db = 'mongodb+srv://Admin:4tXywV6DNVGfI6HQ@cluster0.ilwkopa.mongodb.net/Student_Attendance?retryWrites=true&w=majority'
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(db)
  console.log('database connected')
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/student', studentRouter);
app.use('/admin', adminRouter);

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
