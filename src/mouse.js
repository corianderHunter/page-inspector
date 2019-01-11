/**
 * mouse
 */
let interval, record

let recordMouseDown = (e) => {
  record({
    mouseDown: {
      x: e.pageX,
      y: e.pageY
    }
  })
}

let recordMousePosition = (e) => {
  record({
    mouse: {
      x: e.pageX,
      y: e.pageY
    }
  })
}

let mouseMove = _.throttle((e) => {
  recordMousePosition(e)
}, interval)

let mouseDown = _.throttle((e) => {
  recordMouseDown(e)
}, interval)

export function mount(_interval = 50) {
  interval = _interval
  document.documentElement.addEventListener('mousemove', mouseMove, false)
  document.documentElement.addEventListener('mousedown', mouseDown, false)
}

export function unmount() {
  document.documentElement.removeEventListener('mousemove', mouseMove, false)
  document.documentElement.removeEventListener('mousedown', mouseDown, false)
}

export default {
  record: {
    init(_record, _interval) {
      record = _record;
      interval = _interval
      mount()
    },
    destroy() {
      unmount()
    },
  }
}
