var express = require('express');
var app = express();

// view engine to ejs -- maybe change this
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('pad');
});

var port = process.env.PORT || 8080;
console.log("listening on port 8080");
app.listen(port);
