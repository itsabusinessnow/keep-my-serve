"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _routes = _interopRequireDefault(require("./routes"));

var _errorHandlers = _interopRequireDefault(require("./handlers/errorHandlers"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // Bodyparser Middleware

app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.static(_path.default.join(__dirname, '../../public'))); // After allllll that above middleware, we finally handle our own routes!

app.use('/', _routes.default); // If that above routes didnt work, we 404 them and forward to error handler

app.use(_errorHandlers.default.notFound);
var _default = app;
exports.default = _default;