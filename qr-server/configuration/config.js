var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var firebase = require('firebase');

var vm = this;
vm.firebase = null;

var config = function(app){

    app.use(express.static(__dirname + '/www'));
    app.use(express.static('www'));

    
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    return app;
}

var setupFirebaseDatabase = function(firebaseInstance){
    var fbConfig = require("./db.config.json");
    firebase.initializeApp(fbConfig);
    return firebaseInstance;
}

module.exports = {
    setupApplication : function(app){
        return config(app);
    },
    setupFirebaseDatabase : function(firebaseInstance){
        return setupFirebaseDatabase(firebaseInstance);
    },
    configuredFirebase : vm.firebase
};
