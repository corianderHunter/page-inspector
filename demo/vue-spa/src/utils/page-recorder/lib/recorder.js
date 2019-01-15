import _ from 'underscore'
import mutationObserver from './mutationObserver'
import circularJSON from 'circular-json';
import unique from 'unique-selector';

const selectorOptions = {
  selectorTypes: ['ID', 'Class', 'Tag', 'NthChild']
}

let interval = 30, //the minimum time interval
  records = {},
  record_start,
  globalOldEvents = {};

let globalEventBind = (eventName, callback) => {
  globalOldEvents[eventName] = window[eventName];
  window[eventName] = (e) => {
    typeof globalOldEvents[eventName] === 'function' ? globalOldEvents[eventName].call(null, e) : null;
    callback.call(null, e)
  }
}

let start = () => {
  record_start = Date.now(), records = {}
  mutationObserver.observe((mutation) => {
    takeRecord(mutation, 'mutations')
  })
  document.documentElement.addEventListener('mousemove', mouseMove, false)
  document.documentElement.addEventListener('mousedown', mouseDown, false)
  window.addEventListener('scroll', scrollEvent, true)
  globalEventBind('onresize', _.throttle(recordWindowAttrs, interval))
}

let destroy = () => {
  document.documentElement.removeEventListener('mousemove', mouseMove, false)
  document.documentElement.removeEventListener('mousedown', mouseDown, false)
  window.removeEventListener('scroll', scrollEvent, false)
  for (let pro in globalOldEvents) {
    window[pro] = globalOldEvents[pro]
  }
  mutationObserver.disconnect()
}

let getData = function () {
  try {
    return circularJSON.parse(circularJSON.stringify({
      interval,
      records
    }))
  } catch (e) {
    console.error(e)
  }
}

let takeRecord = function (record, prop) {
  if (!record) return
  let timeKey = Math.floor((Date.now() - record_start) / interval); //以最小时间间隔取整次数计数时间
  if (!records[timeKey]) records[timeKey] = {}
  if (prop) {
    if (!records[timeKey][prop]) records[timeKey][prop] = []
    records[timeKey][prop].push(record)
  } else {
    records[timeKey] = {
      ...records[timeKey],
      ...record
    }
  }
}

let mouseMove = _.throttle((e) => {
  recordMousePosition(e)
}, interval)

let mouseDown = _.throttle((e) => {
  recordMouseDown(e)
}, interval)

let scrollEvent = _.throttle((e) => {
  let target = e.target

  if (target === document) {
    recordWindowAttrs()
  } else {
    if (!target.parentNode) return;
    takeRecord({
      type: 'scroll',
      target: unique(e.target, selectorOptions),
      newValue: [target.scrollLeft, target.scrollTop]
    }, 'mutations')
  }

}, interval)

let recordMouseDown = (e) => {
  takeRecord({
    mouseDown: {
      x: e.pageX,
      y: e.pageY
    }
  })
}

let recordMousePosition = (e) => {
  takeRecord({
    mouse: {
      x: e.pageX,
      y: e.pageY
    }
  })

}

let recordWindowAttrs = () => {
  takeRecord({
    window: {
      w: window.innerWidth,
      h: window.innerHeight,
      sx: window.scrollX,
      sy: window.scrollY
    }
  })
}




export default {
  start,
  destroy,
  getData
}
