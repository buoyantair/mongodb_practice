var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/video', function(err, db){
	assert.equal(null, err);
	console.log('Successfully connected to server');

	// Find documents in collection
	db.collection('movies').find({}).toArray(function(err, docs){
		// Print the name of document
		docs.forEach(function(doc){
			console.log(doc.name);
		});

		db.close();
	});

	console.log('Called find()');
});
