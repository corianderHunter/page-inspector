export default function (
  wssUrl = process.env.WSS_URL
): Promise<WebSocket | null> {
  if (!wssUrl) {
    console.error("missing websocket server address!");
    return Promise.reject(false);
  }
  let ws = new WebSocket(wssUrl);
  ws.onclose = () => {
    console.info("ws close");
  };

  ws.onmessage = (data) => {
    console.info("ws client receive message:" + data);
  };

  return new Promise((resolve, reject) => {
    ws.onerror = () => {
      console.info("ws error");
      reject(null);
    };
    ws.onopen = () => {
      console.info("ws open");
      resolve(ws);
    };
  });
}
