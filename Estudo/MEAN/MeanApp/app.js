console.log("Load packages...");
var express = require('express');
var load = require('express-load');
var path = require('path');

var app = express();

console.log("Configure directory");
app.set("port", process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

console.log("App settings");
app.set(express.favicon());
app.set(express.json());
app.set(express.urlencoded());
app.set(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/public')));

console.log("Verifying mode...");
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    console.log("Development mode on");
} else {
    console.log("Development mode off");
}

load('models').then('controllers').then('routes').into(app);

console.log("Set port...");
app.listen(app.get("port"));

console.log("Server ON");