'use strict';
import express from 'express';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import './resources/mongooseSchema.js';

//#region Constants
const app = express();
//const mongoose = mongoose.connect
const PORT = 80;
const HOST = '0.0.0.0';
const sqlServer = 'cluster0.dc4xm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const sqlUsr = 'openelec';
const sqlPass = '';
const sqlDB = 'openelec'
const sqlPort = '27017'
const sqlUri = 'mongodb+srv://' + sqlUsr  + ':' + sqlPass + '@' + sqlServer;
//#endregion
//#region Vars
var connectionCounter = 0;
//#endregion

//#region Functions
function startWebServer() {
  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);
}
function clientConnect(req) {
  connectionCounter = connectionCounter + 1;
  console.log('Total Connection Count: ' + connectionCounter + ';');
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
  res.set({APIVersions: ['v1']});
  res.send();
});
app.get('/api/v1/users', (req, res) => {
  res = goodHTTPConnection(req, res);
  res.send();
  clientConnect();
});
app.post('/api/v1/users', (req,res) => {
  res = goodHTTPConnection(req, res);
  const users = new Users({
    guid: uuid,
    email: req.email,
    passwordHash: req.passwordHash
  });
  users.save()
  .then(res.set(result))
  .catch(console.log(err));
  //send email verification
  //
  res.send();

})
//#endregion
//#region Main
mongoose.connect(sqlUri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log('Connected to sql server: '+sqlServer))
.then(startWebServer())
.catch((err) => console.log(err));
//#endregion