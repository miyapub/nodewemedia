var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var Promise = require('bluebird');

var conn = function() {
    var fn = function(resolve, reject) {
        // Connection URL
        var url = 'mongodb://localhost:27017/mp';
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            resolve(db);
        });
    }
    return new Promise(fn);
}

var Create = function(collectionName, insertManyObjs) {
    fn = function(resolve, reject) {
        conn().then(function(db) {
            var collection = db.collection(collectionName);
            collection.insertMany(insertManyObjs, function(err, result) {
                assert.equal(err, null);
                resolve(result);
            });
        });
    }
    return new Promise(fn);
}

var Read = function(collectionName, queryObj) {
    fn = function(resolve, reject) {
        conn().then(function(db) {
            var collection = db.collection(collectionName);
            collection.find(queryObj).toArray(function(err, docs) {
                assert.equal(err, null);
                resolve(docs);
            });
        });
    }
    return new Promise(fn);
}

var Update = function(collectionName, queryObj, setObj) {
    console.log('queryObj',queryObj);
    fn = function(resolve, reject) {
        conn().then(function(db) {
            var collection = db.collection(collectionName);
            collection.updateOne(queryObj, {
                $set: setObj
            }, function(err, result) {
                assert.equal(err, null);
                console.log("Updated the document with the field a equal to 2");
                resolve(result);
            });
        });
    }
    return new Promise(fn);
}

var Delete = function() {

}

var CRUD = {
    Create: Create,
    Read: Read,
    Update: Update,
    Delete: Delete
}
module.exports = CRUD;
