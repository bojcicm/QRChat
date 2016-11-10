var express = require('express');
var router = express.Router();

var users = require('./api/users');

module.exports = {
    users: users
};