"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.Promise = global.Promise;
var organisationSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: 'You must provide an organisation name.'
  },
  token: String
}, {
  timestamps: true
});

var _default = _mongoose.default.model('Organisation', organisationSchema);

exports.default = _default;