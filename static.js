var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
	console.log(urlObj);
//Install route for getcity
if(urlObj.pathname.indexOf("getcity")!= -1){
	//console.log("in getcity");
   fs.readFile("cities.dat.txt", function (err,data){
	if(err) throw err;
	var cities = data.toString().split("\n");
	var myRe = new RegExp("^"+urlObj.query["q"]);
	console.log(myRe);
	var jsonresult = [];
	for (var i = 0; i < cities.length; i++){
	  var result = cities[i].search(myRe);
    	  if(result != -1) {
	  	jsonresult.push({city:cities[i]});
     	 	console.log(cities[i]);
	  }
	}
	console.log(JSON.stringify(jsonresult));
	res.writeHead(200);
	res.end(JSON.stringify(jsonresult));
});
}else{
  fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}
}).listen(80);
