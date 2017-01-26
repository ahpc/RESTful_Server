var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');
var dbURL = "mongodb://localhost:27017/database1";
var resultArray = [];

//Insert function
function Insert(err, db, item) {
	assert.equal(null, err);
	db.collection('MongoConnection').insertOne(item, function(err, result){
		assert.equal(null, err);
		db.close();
	})
}

//Retrieve function
function Retrieve(err, db) {
	assert.equal(null, err);
	resultArray = [];
	var cursor = db.collection('MongoConnection').find();
	cursor.forEach(function(doc, err){
		assert.equal(null, err);
		resultArray.push(doc);
	}, function(){
		db.close();
	});
}

//Update function
function Update(err, db, id, item) {
	if(err) { return console.dir(err); }
	var collection = db.collection('MongoConnection');
	collection.update({'_id': ObjectID(id)}, {$set: item}, function(err, result){});
}

//Delete function
function Delete(err, db, id) {
	if(err) { return console.dir(err); }
	var collection = db.collection('MongoConnection');
	collection.remove({'_id': ObjectID(id)}, function(err, result) {});
}

module.exports = {
	// Connect to the db
	OperationPOST: function (item) {
		MongoClient.connect(dbURL, function(err, db) {Insert(err, db, item)});
		MongoClient.connect(dbURL, function(err, db) {Retrieve(err, db);});
	},

	OperationGET: function () {
		MongoClient.connect(dbURL, function(err, db) {Retrieve(err, db);});
		return resultArray;
	},

	OperationPUT: function (id, item) {
		MongoClient.connect(dbURL, function(err, db) {Update(err, db, id, item);});
		MongoClient.connect(dbURL, function(err, db) {Retrieve(err, db);});
	},

	OperationDELETE: function (id) {
		MongoClient.connect(dbURL, function(err, db) {Delete(err, db, id);});
		MongoClient.connect(dbURL, function(err, db) {Retrieve(err, db);});
	}

}
