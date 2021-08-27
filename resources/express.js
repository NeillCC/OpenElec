//#region Functions
class web {
    startWebServer(PORT, HOST) {
        app.listen(PORT, HOST);
        console.log(`Running on http://${HOST}:${PORT}`);
    }
    clientConnect(req) {
        connectionCounter = connectionCounter + 1;
        console.log('Total Connection Count: ' + connectionCounter + ';');
    }
    goodHTTPConnection(req, res) {
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
}
  //#endregion
  export { web }