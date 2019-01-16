import node from './node'
import mouse from './mouse'
import browserWindow from './browserWindow'

import _record from './record'
import _replay from './replay'

let units = [node, mouse, browserWindow]



export let record = {
  ..._record,
  init(interval) {
    _record.init(units, interval)
  },
  destroy() {
    _record.init(units)
  }
}

export let replay = {
  init(data, startPoint = 0) {
    _replay.init(units, data, startPoint)
  }
}

window.pageInspector || (function () {
  window.pageInspector = {
    record,
    replay
  }
})()