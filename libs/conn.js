var conn = function(callback) {
    var MongoClient = require('mongodb').MongoClient,
        assert = require('assert');
    // Connection URL
    var url = 'mongodb://localhost:27017/mp';
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        callback(db, assert);
    });
}
module.exports = conn;
