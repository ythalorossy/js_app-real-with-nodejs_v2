/**
 * Module dependencies.
 */
var express = require('express'),
    app = express(),
    error = require('./middleware/error'),
    load = require('express-load'),
    //flash = require('connect-flash'),
    server = require('http').createServer(app),
    mongoose = require('mongoose'),
    io = require('socket.io').listen(server);

app.db = mongoose.connect('mongodb://localhost/ntalk');

const SECRET = 'Ntalk',
      KEY = 'ntalk.sid';

var cookie = express.cookieParser(SECRET),
    store = new express.session.MemoryStore(),
    session = express.session({secret: SECRET, key: KEY, store: store}),
    bodyParser = express.bodyParser(),
    methodOverride = express.methodOverride();

// all environments
app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(cookie);
  app.use(session);
  app.use(bodyParser);
  app.use(methodOverride);
  //app.use(flash());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(error.notFound);
  app.use(error.serverError);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

io.set('authorization', function(data, accept) {
  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[KEY];
    store.get(sessionID, function(err, session) {
      if (err || !session) {
        accept(null, false);
      } else {
        data.session = session;
        accept(null, true);
      }
    });
  });
});

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

load('sockets')
    .into(io);

server.listen(3000, function () {
    console.log('Ntalk no ar ouvindo na porta ' + 3000);
});