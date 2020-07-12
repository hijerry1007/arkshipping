var createError = require('http-errors');
var express = require('express');
const handlebars = require('express-handlebars')

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
// const exphbs = require('express-handlebars')
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup

// app.set('view engine', 'hbs');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.engine('.hbs', exphbs({
//   extname: '.hbs',
//   defaultLayout: 'main',
//   helpers: require('./config/handlebars-helpers')
// }));
app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  helpers: require('./config/handlebars-helpers')
}))
app.set('view engine', 'handlebars')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(session({
  secret: 'copy cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_messages')
  res.locals.error_msg = req.flash('error_messages')

  next()
});


module.exports = app;
