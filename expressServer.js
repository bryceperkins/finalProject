var express = require('express');
var bodyParser = require('body-parser'); 
var basicAuth = require('basic-auth-connect');
var https = require('https'); 
var http = require('http'); 
var fs = require('fs'); 
var url = require('url'); 
var xmlparser = require('express-xml-bodyparser');
var app = express(); 
var ROOT_DIR = './html/';

var options = { 
    host: '127.0.0.1', 
    key: fs.readFileSync('ssl/server.key'), 
    cert: fs.readFileSync('ssl/server.crt') 
}; 



var auth = basicAuth(function(user, pass, callback) {
 var result = (user === 'testUser' && pass === 'testPass');
 callback(null /* error */, result);
});

http.createServer(app).listen(80); 
https.createServer(options, app).listen(443); 

app.get('/noAuth', function(req, res) {
 res.send('Hello World - No Authentication');
});
app.get('/StaringPoint', auth, function (req, res) { 
	res.send("It Works, BOYS."); 
    });
app.use('/', auth ,express.static(ROOT_DIR, {maxAge: 60*60*1000}));

app.get('/pass', auth, function(req, res) {});

app.get('/getcity', function (req, res) {
	var urlObj = url.parse(req.url, true, false);
        var myRe = new RegExp("^" + urlObj.query["q"]);
        fs.readFile(ROOT_DIR + 'cities.dat.txt', function (err, data) {
            if(err) throw err;
            var jsonresult = [];
            console.log(myRe);
            if(myRe != "/^/") { 
                cities = data.toString().split("\n");
                for(var i=0; i < cities.length; i++) {
                    var result = cities[i].search(myRe);
                    if(result != -1) {
                        jsonresult.push({city:cities[i]});
                    }
                }
            }
	    res.json(jsonresult);
	    });
    });

app.get('/comment', function (req, res) {
    console.log("GET call");
    
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost/test1", function(err, db) {
        if(err) throw err;
        
        db.collection("comments", function(err, comments){
            if(err) throw err;
            comments.find(function(err, items){
                items.toArray(function(err, itemArr){
                    console.log("Document Array: ");
                    console.log(itemArr);
                    res.json(itemArr);
                    });
                });
            });
        });
    });
app.post('/comment', auth, function(req, res) {
    console.log("POST call");
    var jsonData = "";
    req.on('data', function (chunk) {
        jsonData += chunk;
        });
    req.on('end', function () {
        var reqObj = JSON.parse(jsonData);
        console.log(reqObj);
        //Put the JSON in the Database
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect("mongodb://localhost/test1", function(err, db) {
            if(err) throw err;
            db.collection('comments').insert(reqObj, function(err, records) {
                console.log("Record added as " + records[0]._id);
                });
            });
        });
    res.send("");
    });
