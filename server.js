var express = require( 'express' );
var app = express();
var MongoClient = require( 'mongodb' ).MongoClient
var bodyParser = require( 'body-parser' );
app.use( bodyParser.json() );
var ObjectID = require( 'mongodb' ).ObjectID;

var url = 'mongodb://localhost:27017/farm';

//INDEX//
app.get( '/animals', function(req, res) {
  MongoClient.connect( url, function( err, db ) {
      var collection = db.collection( 'animals' )
      collection.find({}).toArray( function( err, docs ) {
          res.json( docs );
          db.close();
      })
  })
})

//CREATE//
app.post( '/animals', function( req, res ) {
  MongoClient.connect( url, function( err, db ) {
      var collection = db.collection( 'animals' )
      collection.insert({name: req.body})
          res.status(200).end();
          db.close();
      })
  console.log( req.body );
});

//UPDATE//
app.put( '/animals/:id', function( req, res ) {
  MongoClient.connect( url, function( err, db ) {
      var collection = db.collection( 'animals' )
      collection.updateOne({_id: new ObjectID(req.params.id)}, {$set: {name: req.body.name, type: req.body.type, age: req.body.age}});
          res.status(200).end();
          db.close();
      })
  console.log( req.body );
});

//DELETE//
app.delete( '/animals/:id', function( req, res ) {
  MongoClient.connect( url, function( err, db ) {
      var collection = db.collection( 'animals' )
      collection.remove({_id: new ObjectID(req.params.id)});
          res.status(200).end();
          db.close();
      })
  console.log( req.body );
});






app.listen( '3000', function() {
  console.log( 'running on 3000!')
})


