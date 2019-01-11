/**
 * window resize and document scroll event
 */

import {
  globalEventBind,
  globalEventUnBind
} from './utils'
import {
  throttle
} from 'underscore'

let interval = 30,
  record;

let scrollEvent;

function scrollObserverInit() {
  window.addEventListener('scroll', scrollEvent = throttle((e) => {
    if (e.target !== document) return;
    record({
      window: {
        sx: window.scrollX,
        sy: window.scrollY
      }
    })
  }, interval), true)
}

function scrollObserverDestroy() {
  window.removeEventListener('scroll', scrollEvent, true)
}

function windowSizeObserverInit() {
  //it my be overwrite
  globalEventBind('onresize', _.throttle(() => {
    record({
      window: {
        w: window.innerWidth,
        h: window.innerHeight,
      }
    })
  }, interval))
}

function windowSizeObserverDestroy() {
  globalEventUnBind('onresize')
}

export default {
  record: {
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
}
