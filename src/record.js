import initWs from './ws'
import {
  pageCollector
} from './page'
import {
  memorySizeOf,
  isEmpty
} from './utils'
import node from './units/node'
import mouse from './units/mouse'
import browserWindow from './units/browserWindow'

let ws,
  messageConfig = {
    init: 1,
    close: 0,
    record: 9,
    freeze: 2
  }

let producers = [node, mouse, browserWindow]

let records = {},
  recordStart,
  interval,
  status,
  pageCollection

function takeRecord(data, prop) {
  let timeKey = Math.floor((Date.now() - recordStart) / interval);
  if (!records[timeKey]) records[timeKey] = {}
  if (prop) {
    if (!records[timeKey][prop]) records[timeKey][prop] = []
    records[timeKey][prop].push(data)
  } else {
    records[timeKey] = {
      ...records[timeKey],
      ...data
    }
  }
}

export async function init(_interval = 50) {
  ws = await initWs()
  if (!ws)
    return console.error('websocket init failed!')
  globalWsFunc();
  status = true;
  interval = _interval
  recordStart = Date.now();
  pageCollection = pageCollector();
  producers.forEach(val => val.record.init(takeRecord, interval))
  ws.send(JSON.stringify({
    type: 'init',
    value: {
      interval,
      userAgent: window.navigator.userAgent,
      origin: window.location.origin,
      path: window.location.pathname,
      page: getDomObject(),
    }
  }))
}

export function destroy() {
  producers.forEach(val => val.record.destroy(interval))
  status = false
}

export function getDomObject() {
  if (!status)
    return console.warn('recorder is not inited')
  return pageCollection.domObject
}

export function getDomMap() {
  if (!status)
    return console.warn('recorder is not inited')
  return pageCollection.domMap
}

export function getRecords() {
  if (!status)
    return console.warn('recorder is not inited')
  return {
    interval,
    records
  }
}

window.setTimeout(init, 300)

function globalWsFunc() {
  window.setInterval(() => {
    if (memorySizeOf(records) > 1024) {
      wsRecordsSend()
    }
  }, 5000)

  window.onunload = wsRecordsSend

  window.onbeforeunload = wsRecordsSend
}

function wsRecordsSend() {
  if (isEmpty(records)) return;
  try {
    let timeKey = Math.floor((Date.now() - recordStart) / interval)
    ws.send(JSON.stringify({
      value: {
        records,
        timeKey
      },
    }));
  } catch (e) {
    console.error(e)
  }
  records = {}
}

export default {
  init,
  status,
  destroy,
  getDomObject,
  getRecords
}