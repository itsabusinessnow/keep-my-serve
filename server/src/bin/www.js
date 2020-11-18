#!/usr/bin/env node
/* eslint-disable no-fallthrough */

/**
 * Module dependencies.
 */

import debugLib from 'debug';
import http from 'http';
import mongoose from 'mongoose';
import Organisation from '../models/Organisation';
import Account from '../models/Account';
import Actor from '../models/Actor';
import SimpleText from '../models/SimpleText';
import app from '../app';

const debug = debugLib('keep-my:server');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const portF = parseInt(val, 10);

  if (Number.isNaN(portF)) {
    // named pipe
    return val;
  }

  if (portF >= 0) {
    // port number
    return portF;
  }

  return false;
}

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.MONGO_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  debug(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
