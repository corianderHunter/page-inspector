const mongoose = require('mongoose');
const { debounce } = require('underscore');

let connect = () => {
    let uri = `mongodb://${process.env.MONGO_USERNAME}:${
        process.env.MONGO_PASSWORD
    }@${process.env.MONGO_URI}`;
    let options = {
        dbName: process.env.MONGO_DATABASE
    };
    mongoose.connect(uri, options);
    return mongoose.connection;
};

let initServer = () => {
    require('./models/session');
    require('./models/website');
    require('./models/canvasImage');
    const express = require('express');
    const routers = require('./routes');
    const bodyParser = require('body-parser');
    const compression = require('compression');

    require('./wss');
    console.log('websocket server listening at port:%s', process.env.WSS_PORT);

    const port = process.env.PORT;
    let app = express();
    app.use(bodyParser.json());
    app.use(compression());
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );

    app.use(routers);
    let server = app.listen(port, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log(
            'page-inspector server listening at http://%s:%s',
            host,
            port
        );
    });
};

connect()
    .on('error', console.log)
    .on('disconnected', debounce(connect, 3000))
    .once('open', initServer);
