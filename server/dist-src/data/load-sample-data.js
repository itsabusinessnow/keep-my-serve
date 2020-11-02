"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Organisation = _interopRequireDefault(require("../models/Organisation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config({
  path: __dirname + '/../../.env'
});

_mongoose.default.connect(process.env.MONGO_URI_DEV);

_mongoose.default.Promise = global.Promise; // Tell Mongoose to use ES6 promises
// import all of our models - they need to be imported only once

var organisations = JSON.parse(_fs.default.readFileSync('sample-data/organisation.json', 'utf-8'));

function deleteData() {
  return _deleteData.apply(this, arguments);
}

function _deleteData() {
  _deleteData = _asyncToGenerator(function* () {
    console.log('😢😢 Goodbye Data...');
    yield _Organisation.default.remove();
    console.log('Data Deleted. To load sample data, run\n\n\t npm run load-sample\n\n');
    process.exit();
  });
  return _deleteData.apply(this, arguments);
}

function loadData() {
  return _loadData.apply(this, arguments);
}

function _loadData() {
  _loadData = _asyncToGenerator(function* () {
    try {
      yield _Organisation.default.insertMany(organisations);
      console.log('👍👍👍👍👍👍👍👍 Done!');
      process.exit();
    } catch (e) {
      console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run flush-sample\n\n\n');
      console.log(e);
      process.exit();
    }
  });
  return _loadData.apply(this, arguments);
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}