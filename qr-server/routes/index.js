var express = require('express');
var router = express.Router();

var users = require('./api/users');

var setRoutes = function(app){
    
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/www/index.html'));
    });

    app.use('/api/users', users);

    return app;
}

module.exports = {
    setRouters: function(app){
        return setRoutes(app);
    }
};