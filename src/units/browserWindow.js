/**
 * window resize and document scroll event
 */

import {
  globalEventBind,
  globalEventUnBind,
  isUndef,
  throttle
} from '../utils'

let self, interval = 30,
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
  },
  replay(record, _self = window) {
    self = _self
    let _window = record.window;
    _window && !isUndef(_window.sx) && !isUndef(_window.sy) && self.scrollTo(_window.sx, _window.sy)
  }
}