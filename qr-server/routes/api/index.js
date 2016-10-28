var express = require('express');
var router = express.Router();

var users = require('./users');

module.exports = {
    users: users
};