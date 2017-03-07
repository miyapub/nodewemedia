var Promise = require('bluebird');
var assert = require('assert');
var db = require('../../libs/db');
var ObjectId = require('mongodb').ObjectId;
var content = {
    get_content_by_content_id: function(content_id) {
        var get_doc = function(resolve, reject) {
            db.then(function(db) {
                var collection = db.collection('contents');
                // Find some documents
                collection.find({'_id' : ObjectId(content_id)}).toArray(function(err, docs) {
                    assert.equal(err, null);
                    console.log("Found the following records");
                    console.log(docs);
                    resolve(docs[0]);
                    //db.close();
                });
            });
        }
        return new Promise(get_doc);
    },
    get_contents_by_page: function(req, res, next) {

    }
}
module.exports = content;
