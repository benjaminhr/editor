var express = require('express');
var app = express();
var sharejs = require('share');
require('redis');

// view engine to ejs -- maybe change this
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('pad');
});

app.get('/(:id)', (req,res) => {
  res.render('pad');
});

var options = {
  db: {
    type:'redis'
  },
}

sharejs.server.attach(app, options);

var port = process.env.PORT || 8080;
console.log("listening on port 8080");
app.listen(port);
