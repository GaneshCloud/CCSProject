//'use strict';

var mysql = require('mysql'),
    dateFormat = require('dateformat'),
    db = require('../config/db');

var connection = mysql.createConnection(db);

exports.data = function(req, res) {
  connection.query('Select * from project',function(err,result) {

    if (err) {
      console.log('Error when get project data : ' + err);
    }else {
      console.log(result);
      res.send(result);
    }
  });
};


exports.projectHistory = function(req, res) {
  connection.query('Select * from projectDetails',function(err,result) {

    if (err) {
      console.log('Error when get projectHistory data : ' + err);
    }else {
      console.log(result);
      res.send(result);
    }
  });
};

exports.chartData = function(req, res) {
  connection.query('Select * from chart', function(err,result) {

    if (err) {
      console.log('Error when get chart data : ' + err);
    }else {
      console.log(result);
      //Var values=[result];
      res.send(result);
    }
  });
};

exports.imageData = function(req, res) {
  connection.query('select * from images where fileName like \'CB2-1516-CSD0001%\'', function(err,result) {

    if (err) {
      console.log('Error when get imageData : ' + err);
    }else {
      console.log(result);
      res.send(result);

    }
  });
};

exports.postQuestion = function(req, res) {
  var now = new Date();
  connection.query('Insert into questions(Question, createdBy, createdAt) values(\'' + req.body + '\',\'Ganesh\',\'' + dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT') + '\')', function(err,result) {

    if (err) {
      console.log('Error when get postQuestion data : ' + err);
    }else {
      console.log(result);
      res.send(result);
    }

  });
};