import {
    resolve
} from "url";

export default function (url) {
    let wssUrl = url || process.env.WSS_URL
    if (!wssUrl) {
        console.error('missing websocket server address!')
        return false
    }
    let ws = new WebSocket(wssUrl);
    ws.onclose = () => {
        console.info('ws close')
    }

    ws.onmessage = (data) => {
        console.info('ws client receive message:' + data);
    }
    return new Promise((resolve, reject) => {
        ws.onerror = () => {
            console.info('ws error')
            reject()
        }

        ws.onopen = () => {
            console.info('ws open')
            resolve(ws)
        }

    })
}