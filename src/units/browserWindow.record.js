/**
 * window resize and document scroll event
 */

import {
  throttle
} from '../utils'

let interval = 30,
  record;

let scrollEvent,resizeEvent;

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
  window.addEventListener('resize', resizeEvent = throttle(interval, () => {
    record({
      window: {
        w: window.innerWidth,
        h: window.innerHeight,
      }
    })
  }))
}

function windowSizeObserverDestroy() {
  window.removeEventListener('resize', resizeEvent)
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