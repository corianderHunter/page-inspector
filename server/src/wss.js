const WebSocket = require('ws')
const mongoose = require('mongoose');

const Website = mongoose.model('Website')
const Session = mongoose.model('Session')
const Record = mongoose.model('Record')

const messageConfig = {
    init: 1,
    close: 0,
    record: 9,
    freeze: 2,
}

const wss = new WebSocket.Server({
    port: process.env.WSS_PORT,
    perMessageDeflate: {
        zlibDeflateOptions: {
            // See zlib defaults.
            chunkSize: 1024,
            memLevel: 7,
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed.
    }
});

let messageHandler = {
    async init(value) {
        let {
            origin,
            version = '',
            userAgent,
            page,
            path,
            interval,
            userSession = ''
        } = value
        let website = await Website.findOneAndUpdate({
                origin,
                version
            }, {
                $set: {
                    lastestVisited: Date.now()
                }
            })
            .exec()
            .then((data) => {
                if (!data) {
                    return (new Website({
                        origin,
                        version,
                        createdAt: Date.now(),
                        lastestVisited: Date.now()
                    })).save()
                }
                return data
            })
        await (new Session({
            websiteId: website._id || '',
            userAgent,
            page,
            path,
            interval,
            version,
            createdAt: Date.now(),
            userSession
        })).save()
    },
    close(value) {

    },
    async record(value) {

    },
    freeze() {}
}

function statusFunc(message) {}

function heartbeat() {
    this.isAlive = true;
}

wss.on('connection', function connection(ws) {
    let isInit = false;
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    ws.on('message', function incoming(message) {
        let type,
            value
        try {
            let _mess = JSON.parse(message)
            type = _mess.type || 'record'
            value = _mess.value || {}
        } catch (e) {
            console.error(e)
        }
        if (type === 'init') {
            isInit = true
            messageHandler['init'](value)
            return
        }
        if (!isInit) return console.info('wss receive meassge from client,waiting "init" message');
        try {
            messageHandler[type] && messageHandler[type](value)
        } catch (e) {
            console.error('wss handle message error:' + e)
        }
    });
});

const interval = setInterval(function ping() {
    // if(!wss.clients.length) clearInterval()
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping(() => {});
    });
}, 30000);

module.exports = wss