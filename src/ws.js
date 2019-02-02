export default function (url) {
    let wssUrl = url || process.env.WSS_URL
    if (wssUrl) {
        console.error('missing websocket server address!')
        return false
    }
    let ws = new WebSocket(wssUrl);

    ws.onerror = () => {
        console.info('ws error')
    }

    ws.onopen = () => {
        console.info('ws open')
    }

    ws.onclose = () => {
        console.info('ws close')
    }

    ws.onmessage = (data) => {
        console.log(data);
    }

    return ws
}