import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { v4 as uuid } from 'uuid';
import { User , Device } from './resources/mongooseSchema.js';
dotenv.config()
//#region Constants
const app = express();
const PORT = process.env.WEBSERVER_LISTENPORT;
const HOST = process.env.WEBSERVER_LISTENADDR;
const sqlUri = process.env.DATABASE_PROTOCOL + 
'://' + process.env.DATABASE_USER + ':' + 
process.env.DATABASE_PASSWORD + '@' + process.env.DATABASE_DNS + 
'/' + process.env.DATABASE_DNS_ARGS;
//#endregion
//#region Vars
var connectionCounter = 0;
var apiVersions = ['v1']
//#endregion

//#region Functions
function startWebServer() {
  app.use(express.json());
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
    'Content-Type': 'application/json',
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
  res.set({APIVersions: apiVersions});
  res.send();
});
app.get('/api/v1/users', (req, res) => {
  res = goodHTTPConnection(req, res);
  res.send();
  clientConnect();
});
app.post('/api/v1/users', (req,res) => {
  res = goodHTTPConnection(req, res);
  //TODO this needs handling for invalid input. UnhandledPromiseRejectionWarning
  // let user = new User({
  //   email: req.header.email,
  //   passwordHash: req.header.passwordHash
  // });
  // user.save()
  // .then(res.set(user))
  // .catch(console.log(err));
  res.set(req.header.email);
  //TODO send email verification
  //
  res.send();

})
//#endregion
//#region Main
mongoose.connect(sqlUri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log('Connected to sql server: ' + process.env.DATABASE_DNS + ' as ' + process.env.DATABASE_USER))
.then(startWebServer())
.catch((err) => console.log(err));
//#endregion