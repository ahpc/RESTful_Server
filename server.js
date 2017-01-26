var http = require('http');
var connect = require('connect');
var app = connect();
var bodyParser = require('body-parser');
var RESTfulFunctions = require('./RESTfulModule');
var MongoDBoperations = require('./MongodbConnection');

function Send404Response(response){
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("Error 404: Page not found!");
	response.end();
}

function OnRequest(request, response){
	switch( request.method ) {
		case 'GET':
			RESTfulFunctions.GET(request, response);
			console.log('GET: return results!');
			break;
		case 'POST':
			RESTfulFunctions.POST(request, response, request.body.name, request.body.age);
			console.log('POST: saved!');
			break;
		case 'PUT':
			RESTfulFunctions.PUT(request, response, request.body.id, request.body.name, request.body.age);
			console.log('PUT: updated!');
			break;
		case 'DELETE':
			RESTfulFunctions.DELETE(request, response, request.body.id);
			console.log('DELETE: Deleted!');
			break;
		default:
			Send404Response(response);
	}
}

app.use(bodyParser.json());
app.use('/json', OnRequest);

http.createServer(app).listen(3000, function(){
	console.log("Server is running on port 3000!");
	MongoDBoperations.OperationGET();
});