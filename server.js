var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = require('express-myconnection');
var app = express();
var basePath = "/service";

app.use(bodyParser.json()); //supports json-encoded bodies
app.use(bodyParser.urlencoded({ //supports url-encoded bodies
    extended: true
}));

app.use(connection(mysql, {
    host: 'localhost',
    user: 'personuser2',
    password: '12345',
    database: 'personrepository'
}, 'request'));

var getGetObj = { //retrieve grocerylist and specific item
    grocery: {
        url: basePath + "/grocery",
        ids: [],
        query: "SELECT * FROM grocerylist"
    },
    groceryId: {
        url: basePath + "/grocery/:itemid",
        ids: ["itemid"],
        query: "SELECT * FROM grocerylist where itemid = ?"
    }
}

var getPostObj = { //add to grocerylist
    grocery: {
        url: basePath + "/grocery",
        ids: [],
        query: "INSERT INTO grocerylist SET ?"
    }
}

var getPutObj = {
    groceryId: {
        url: basePath + "/grocery/:itemid",
        ids: ["itemid"],
        query: "UPDATE grocerylist SET ? WHERE itemid = ?"
    },
    
}

var getDeleteObj = {
    groceryId: {
        url: basePath + "/grocery/:itemid",
        ids: ["itemid"],
        query: "DELETE FROM grocerylist WHERE itemid = ?"
    }
}

for(var key in getGetObj) {
    getService(getGetObj[key].url, getGetObj[key].ids, getGetObj[key].query);
}

for(var key in getPostObj) {
    postService(getPostObj[key].url, getPostObj[key].ids, getPostObj[key].query);
}

for(var key in getPutObj) {
    putService(getPutObj[key].url, getPutObj[key].ids, getPutObj[key].query);
}

for(var key in getDeleteObj) {
    deleteService(getDeleteObj[key].url, getDeleteObj[key].ids, getDeleteObj[key].query);
}

function getService(url, ids, query) {
    app.get(url, function(req, res, next) {
        var id = req.params[ids];
        req.getConnection(function(err, connection) {
            if(err) {
                return next(err);
            }
            connection.query(query, id, function(err, results) {
                if(err) {
                    console.log(err);
                    return next("Mysql error, check GET query");
                }
                res.json(results);
            });
        });
    });
}

function postService(url, ids, query) {
    app.post(url, function(req, res, next) {
        var reqObj = req.body;
        req.getConnection(function(err, connection) {
            if(err) {
                return next(err);
            }
            connection.query(query, reqObj, function(err, results) {
                if(err) {
                    console.log(err);
                    return next("Mysql error, check POST query");
                }
                res.json(results);
            });
        });
    });
}

function putService(url, ids, query) {
    app.put(url, function(req, res, next) {
        var id = req.params[ids];
        var reqObj = req.body;
        req.getConnection(function(err, connection) {
            if(err) {
                return next(err);
            }
            connection.query(query, [reqObj, id], function(err, results) {
                if(err) {
                    console.log(err);
                    return next("Mysql error, check PUT query");
                }
                res.json(results);
            });
        });
    });
}

function deleteService(url, ids, query) {
    app.delete(url, function(req, res, next) {
        var id = req.params[ids];
        req.getConnection(function(err, connection) {
            if(err) {
                return next(err);
            }
            connection.query(query, id, function(err, results) {
                if(err) {
                    console.log(err);
                    return next("Mysql error, check DELETE query");
                }
                res.json(results);
            });
        });
    });
}

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.redirect('/source_code/views/index.html');
});

app.listen(3000, function(req, res) {
    console.log('listening to port 3000 - project_grocery-list');
});