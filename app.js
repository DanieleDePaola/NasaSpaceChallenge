var express = require("express");
var bodyParser = require("body-parser");
var client = require("./routes/client.js");
//var fireman = require("./routes/fireman.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//app.use('/api/v1', fireman)0;
app.use('/api', client);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
var server = app.listen(port,function () {
    console.log("app running on port.", server.address().port);
});
app.get('/', function (req, res) {
	res.render('report');
});
