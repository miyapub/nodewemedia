var Promise = require('bluebird');
var assert = require('assert');
var db = require('../../libs/db');
var contents = {
    get_contents: function() {
        var get_docs = function(resolve, reject) {
            db.then(function(db) {
                var collection = db.collection('contents');
                // Find some documents
                collection.find({}).toArray(function(err, docs) {
                    assert.equal(err, null);
                    console.log("Found the following records");
                    console.log(docs);
                    resolve(docs);
                    //db.close();
                });
            });
        }
        return new Promise(get_docs);
    },
    get_contents_by_page: function(req, res, next) {

    }
}
module.exports = contents;
