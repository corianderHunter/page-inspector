const express = require('express');
const routers = require('./routes');
const wss = require('./wss');

console.log('websocket server listening at port:%s', process.env.WSS_PORT);

const port = process.env.PORT;


let app = express();

app.use(routers)

let server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});