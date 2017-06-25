var express = require('express'),
  app = express(),
  engines = require('consolidate'),
  bodyParser = require('body-parser'),
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert');


app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname+'/views');
app.use(bodyParser.urlencoded({extended: true}));


MongoClient.connect('mongodb://localhost:27017', function(err, db){
  assert.equal(null, err);
  console.log("Successfully connected to db");
  db = db.db('reactapp');
  app.get('/', function(req, res){
    db.collection('posts').find({}).toArray(function(err, docs){
      
    })
  })
})
