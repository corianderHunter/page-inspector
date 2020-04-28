import initWs from "./ws";
import node from "./units/node.record";
import mouse from "./units/mouse.record";
import browserWindow from "./units/browserWindow.record";
import { pageCollector } from "./units/page.record";
import memorySizeOf from "./helper/memorySizeOf";
import { isEmpty } from "./helper/is";
import { isBrowser } from "./helper/environment";

if (!isBrowser) {
  throw new Error("page-inspector-record can only be used in browser side!");
}

let ws: WebSocket | null;

let records: Records,
  recordStart: number,
  interval: number,
  status: boolean,
  intervalTimer: number,
  pageCollection;

const producers = [node, mouse, browserWindow];

document.addEventListener("load", () => {
  window.setTimeout(init, 500);
});

/**
 *
 * @param _interval use this to generate timeKey
 */
export const init = async (_interval = 50) => {
  ws = await initWs();
  if (!ws) return console.info("websocket init failed!");
  globalWsFunc();
  status = true;
  interval = _interval;
  recordStart = Date.now();
  pageCollection = pageCollector();
  producers.forEach((val) => val.init(takeRecord, interval));
  console.info("page-inspector-record has inited!!!");
  ws.send(
    JSON.stringify({
      type: "init",
      value: {
        interval,
        userAgent: window.navigator.userAgent,
        origin: window.location.origin,
        path: window.location.pathname,
        page: {
          dom: pageCollection.domObject,
          size: pageCollection.size,
        },
      },
    })
  );
};

const takeRecord: RecordTakeEvent = (data, prop) => {
  let timeKey = Math.floor((Date.now() - recordStart) / interval);
  if (!records[timeKey]) records[timeKey] = {};
  if (prop) {
    if (!records[timeKey][prop]) records[timeKey][prop] = [];
    records[timeKey][prop].push(data);
  } else {
    records[timeKey] = {
      ...records[timeKey],
      ...data,
    };
  }
};

export function destroy() {
  producers.forEach((val) => val.destroy(interval));
  status = false;
  clearInterval(intervalTimer);
}

export function getRecords() {
  if (!status) return console.warn("recorder is not inited");
  return records;
}

function globalWsFunc() {
  intervalTimer = window.setInterval(() => {
    if (memorySizeOf(records) > 1024) {
      wsRecordsSend();
    }
  }, 5000);

  window.onunload = wsRecordsSend;

  window.onbeforeunload = wsRecordsSend;
}

function wsRecordsSend() {
  if (isEmpty(records) || !ws) return;
  try {
    let timeKey = Math.floor((Date.now() - recordStart) / interval);
    ws.send(
      JSON.stringify({
        value: {
          records,
          timeKey,
        },
      })
    );
    records = {};
  } catch (e) {
    console.error(e);
  }
}

export default {
  init,
  status,
  destroy,
  getRecords,
};
