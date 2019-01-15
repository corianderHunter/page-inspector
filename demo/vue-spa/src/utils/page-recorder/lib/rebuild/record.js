let records = {},
  recordStart,
  interval

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
  interval = _interval
  recordStart = Date.now();
  producers.forEach(val => val.record.init(takeRecord, interval))
}


export function destroy(producers) {
  producers.forEach(val => val.record.destroy(interval))
}

export function getData() {
  return {
    interval,
    records
  }
}


export default {
  init,
  destroy,
  getData
}
