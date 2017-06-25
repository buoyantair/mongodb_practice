var express = require('express'),
	MongoClient = require('mongodb').MongoClient,
	app = express(),
	engines = require('consolidate'),
	assert = require('assert'),
	bodyParser = require('body-parser');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

MongoClient.connect('mongodb://localhost:27017', function(err, db){
	assert.equal(null, err);
	console.log('Successfully connected to mongodb');
	db = db.db('reactapp')
	app.get('/', function(req, res){
		db.collection('posts').find({}).toArray(function(err, docs){
			res.render('index', {'posts': docs})
		})
	})

		app.post('/add', function(req, res, next){
			var post = req.body.post;
			if(post == ''){
				next('Please provide an entry!')
			} else {
				db.collection('posts').insertOne({'post': post}, function(err,r){
					assert.equal(null, err);
					res.redirect('/');
				})
			}
		});


	app.use(errorHandler);
	var server = app.listen(3000, function(){
		var port = server.address().port;
		console.log("Now listening at port %s", port);
	})
})
