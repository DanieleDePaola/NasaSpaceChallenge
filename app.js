var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
var server = app.listen(port,function () {
    console.log("app running on port.", server.address().port);
});

var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });
}

module.exports = appRouter;