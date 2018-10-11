var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler');

var isProduction = process.env.NODE_ENV === 'production';
// Crear variable global app
var app = express();
app.use(cors());

// Configuracion basica express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(session({ secret: 'app-login', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
    app.use(errorhandler());
  }
require('./models/User');
require('./config/passport'); //estrategia local passport
app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  /// error handlers
  
  // development error handler
  // will print stacktrace
  if (!isProduction) {
    app.use(function(err, req, res, next) {
      console.log(err.stack);
  
      res.status(err.status || 500);
  
      res.json({'errors': {
        message: err.message,
        error: err
      }});
    });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });
  
  // Iniciar servidor...
  var server = app.listen( process.env.PORT || 3000, function(){
    console.log('Escuchando en el puerto ' + server.address().port);
  });
  