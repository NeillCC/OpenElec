'use strict';

//#region Constants
const express = require('express');
const PORT = 80;
const HOST = '0.0.0.0';
const app = express();
const mongoose = require('mongoose');
const sqlServer = 'mongo'
const sqlUsr = 'openelec';
const sqlPass = 'password';
const sqlDB = 'openelec'
const sqlPort = '27017'
const sqlUri = 'mongodb://' + sqlUsr  + ':' + sqlPass + '@' + sqlServer + ':' + sqlPort + '/';
mongoose.connect(sqlUri, { useNewUrlParser: true })
//#endregion

//#region Vars
var connectionCounter = 0;
//#endregion

//#region Functions
function goodStartup() {
  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);
}
function clientConnect(req) {
  connectionCounter = connectionCounter + 1;
  console.log('Total Connection Count: ' + connectionCounter + ';' + '');
}
function goodHTTPConnection(req, res) {
  res.set({
    'StatusCode': '200',
    'StatusDescription': 'OK',
    'Content-Type': 'text/plain',
    'ConnectionCount': connectionCounter,
    'Content': 'Hello World'
  });
  clientConnect(req);
  return res;
}
//#endregion
//#region  API
app.get('/api/', (req, res) => {
  res = goodHTTPConnection(req, res);
  res.send();
});
app.get('/api/user', (req, res) => {
  res = goodHTTPConnection(req, res);
  mongoClient.connect(sqlUri, function(err, db) {
    console.log('connected to sql');
    db.close();
  });
  res.set({
    
  })
  res.send();
  clientConnect();
});
//#endregion
goodStartup();