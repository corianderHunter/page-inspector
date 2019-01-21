let httpProxy = require('http-proxy');

let {
    proxyPort
} = require('./const')

httpProxy.createProxyServer({
    target: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor',
    secure: false
}).listen(proxyPort);