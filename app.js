const express = require('express')
const handlebars = require('express-handlebars')

const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const app = express()
const port = 3000


const passport = require('./config/passport')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/upload', express.static(__dirname + '/upload'))
app.use(bodyParser.json())

app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  helpers: require('./config/handlebars-helpers')
}))
app.set('view engine', 'handlebars')
// const exphbs = require('express-handlebars')
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');



// view engine setup

// app.set('view engine', 'hbs');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.engine('.hbs', exphbs({
//   extname: '.hbs',
//   defaultLayout: 'main',
//   helpers: require('./config/handlebars-helpers')
// }));


app.use(session({
  secret: 'copy cat',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use(express.static('public'))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.user = req.user
  next()
})

app.use('/', indexRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_messages')
  res.locals.error_msg = req.flash('error_messages')
  next()
});



app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))



