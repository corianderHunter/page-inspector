/**
 * window resize and document scroll event
 */

import {
  globalEventBind,
  globalEventUnBind,
  throttle
} from '../utils'

let interval = 30,
  record;

let scrollEvent;

function scrollObserverInit() {
  window.addEventListener('scroll', scrollEvent = throttle(interval, (e) => {
    if (e.target !== document) return;
    record({
      window: {
        sx: window.scrollX,
        sy: window.scrollY
      }
    })
  }), true)
}

function scrollObserverDestroy() {
  window.removeEventListener('scroll', scrollEvent, true)
}

function windowSizeObserverInit() {
  //it my be overwrite
  globalEventBind('onresize', throttle(interval, () => {
    record({
      window: {
        w: window.innerWidth,
        h: window.innerHeight,
      }
    })
  }))
}

function windowSizeObserverDestroy() {
  globalEventUnBind('onresize')
}


export default {
  init(_record, _interval) {
    record = _record;
    interval = _interval
    scrollObserverInit()
    windowSizeObserverInit()
  },
  destroy() {
    scrollObserverDestroy()
    windowSizeObserverDestroy()
  },
}