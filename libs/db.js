var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var Promise = require('bluebird');
var db = function(resolve, reject) {
    // Connection URL
    var url = 'mongodb://localhost:27017/mp';
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        resolve(db);
    });
}
module.exports = new Promise(db);
