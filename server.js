'use strict';

const express = require('express');
const { MongoClient } = require("mongodb");


// Constants
const PORT = 80;
const HOST = '0.0.0.0';
var connectionCounter = 0;
var sqlUsr = "openelec";
var sqlPass = "password";
const uri = "mongodb+srv://localhsot:27017/?poolSize=20&writeConcern=majority";

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// App
const app = express();
app.get('/', (req, res) => {
  connectionCounter++;
  res.send('Hello World');
  console.log(connectionCounter);
  var client = new MongoClient(uri);

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);