import {
  pageCollector
} from './page'

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


export function init(producers, _interval = 50) {
  status = true;
  interval = _interval
  recordStart = Date.now();
  pageCollection = pageCollector();
  producers.forEach(val => val.record.init(takeRecord, interval))
}

export function destroy(producers) {
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


export default {
  init,
  status,
  destroy,
  getDomObject,
  getRecords
}