var express = require("express");

var app = new express();

var parser = require("body-parser");

var React = require("React");
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');
var GroceryItem = require("./models/GroceryItem.js");

require('babel/register');
require("./database.js");

app.get('/', function(req, res) {
    var application = React.createFactory(require("./../app/components/GroceryItemList.jsx"));
    GroceryItem.find(function(err, docs){
        var generated = ReactDOMServer.renderToString(application({
            items: docs
        }));
        
        res.render('./../app/index.ejs', {reactOutput: generated});
    });
})
.use(express.static(__dirname + '/../.tmp'))
.listen(6767);

app.use(parser.json());
app.use(parser.urlencoded({extended:false}));

require('./routes/items.js')(app);

