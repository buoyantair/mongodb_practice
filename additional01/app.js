var express = require('express'),
	MongoClient = require('mongodb').MongoClient,
	app = express(),
	engines = require('consolidate'),
	assert = require('assert')

MongoClient.connect('mongodb://localhost:27017', function(err, db){
	assert.equal(null, err);
	console.log('Successfully connected to mongodb');

	app.use('html', engines.nunjucks);
	app.use('view engine', 'html');
	app.use('views', __dirname + '/views');
	app.use(express.bodyParser());
	app.use(app.router);

	app.get('/', function(req, res){
		res.render('index');
	})
})