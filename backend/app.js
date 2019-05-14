var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config=require('../config')
var bodyParser = require('body-parser')



var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var loginRouter=require('./controllers/loginController');
var registerRouter=require('./controllers/registerController')
//var deleteRouter=require('./controllers/getAndDeleteUserController')
var getUserRouter=require('./controllers/userActionsController')
var getAddressRouter=require('./controllers/adresController')
var newPassRouter=require('./controllers/passwordController')
var searchedUsers=require('./controllers/getSearchedUsersController')
var recordStatistics=require('./controllers/getRecordStatisticsController')
var profilePicture=require('./controllers/userActionsController')
var app = express();

// add mongoose 
var mongoose = require('mongoose');
mongoose.connect(config.mongoConnectionString);

// add cors 
var cors = require('cors');
app.use(cors({
  origin:'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api',loginRouter);
app.use('/api',registerRouter);
//app.use('/api',deleteRouter);
app.use('/api',getUserRouter);
app.use('/api',getAddressRouter)
app.use('/api',newPassRouter)
app.use('/api',searchedUsers)
app.use('/api',recordStatistics)
app.use('/api',profilePicture)



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
