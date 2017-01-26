var MongoDBoperations = require('./MongodbConnection');
var bodyParser = require('body-parser');

//set item
function SetItem(name, age) {
	var item = {
		name: name,
		age: age
	};
	return item;
}

module.exports = {

	GET: function (request, response) {
		var result = MongoDBoperations.OperationGET();
		response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
		response.end(JSON.stringify(result));
	},

	POST: function (request, response, name, age) {
		var item = SetItem(name, age);
		MongoDBoperations.OperationPOST(item);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("POST!");
		response.end();
	},

	PUT: function (request, response, id, name, age) {
		var item = SetItem(name, age);
		MongoDBoperations.OperationPUT(id, item);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("PUT!");
		response.end();
	},

	DELETE: function (request, response, id) {
		MongoDBoperations.OperationDELETE(id);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("DELETE!");
		response.end();
	},

};