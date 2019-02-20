/**
 * mouse
 */
import {
  throttle
} from '../utils'

let interval,
  record

let mouseMove = throttle(interval, e => {
  record({
    mouse: {
      x: e.pageX,
      y: e.pageY
    }
  });
});

let mouseDown = throttle(interval, e => {
  record({
    mouseDown: {
      x: e.pageX,
      y: e.pageY
    }
  });
});

function mount() {
  document.documentElement.addEventListener('mousemove', mouseMove, false);
  document.documentElement.addEventListener('mousedown', mouseDown, false);
}

function unmount() {
  document.documentElement.removeEventListener('mousemove', mouseMove, false);
  document.documentElement.removeEventListener('mousedown', mouseDown, false);
}



export default {
  init(_record, _interval = 50) {
    record = _record;
    interval = _interval;
    mount();
  },
  destroy() {
    unmount();
  }
}