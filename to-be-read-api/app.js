var express = require('express');
var cors = require('cors')
//var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var livrosRouter = require('./routes/livros');
var app = express();

//app.set('views', pathjoin(__dirname, 'views'));
//app.set('view engine', 'ejs');

;
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE','OPTIONS','HEAD'],
    credentials: true
  }));

app.use(session({
    secret: 'issoehsegredo',
    resave: false, //para não salvar uma nova sessão a cada requisição
    saveUninitialized: false //obrigatório para logins
  }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/livros', livrosRouter);

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
 