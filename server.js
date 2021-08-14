'use strict';

const express = require('express');
const { MongoClient } = require("mongodb");


// Constants
const PORT = 80;
const HOST = '0.0.0.0';
var connectionCounter = 0;
// var sqlUsr = "openelec";
// var sqlPass = "password";
//const uri = "mongodb+srv://localhsot:27017/?poolSize=20&writeConcern=majority";

function clientConnect() {
  connectionCounter = connectionCounter + 1;
  console.log("Connection " + connectionCounter);
}
// App
const app = express();
app.get('/', (req, res) => {
  res.set({
    'StatusCode': '200',
    'StatusDescription': 'OK',
    'Content-Type': 'text/plain',
    'ConnectionCount': connectionCounter,
    'Content': 'Hello World'
  });
  res.send();
  clientConnect();
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);