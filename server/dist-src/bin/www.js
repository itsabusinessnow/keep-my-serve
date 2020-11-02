#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";

var _app = _interopRequireDefault(require("../app"));

var _debug = _interopRequireDefault(require("debug"));

var _http = _interopRequireDefault(require("http"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug.default)('keep-my:server'); // Connect to our Database and handle any bad connections

_mongoose.default.connect(process.env.MONGO_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

_mongoose.default.Promise = global.Promise; // Tell Mongoose to use ES6 promises

_mongoose.default.connection.on('error', err => {
  debug("\uD83D\uDE45 \uD83D\uDEAB \uD83D\uDE45 \uD83D\uDEAB \uD83D\uDE45 \uD83D\uDEAB \uD83D\uDE45 \uD83D\uDEAB \u2192 ".concat(err.message));
}); // import all of our models

/**
 * Get port from environment and store in Express.
 */


var port = normalizePort(process.env.PORT || '3000');

_app.default.set('port', port);
/**
 * Create HTTP server.
 */


var server = _http.default.createServer(_app.default);
/**
 * Listen on provided port, on all network interfaces.
 */


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);

    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}