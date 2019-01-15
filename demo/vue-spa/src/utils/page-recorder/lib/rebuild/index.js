import node from './node'
import mouse from './mouse'
import browserWindow from './browserWindow'

import _record from './record'

let producers = [node, mouse, browserWindow]

export let record = {
  ..._record,
  init(interval) {
    _record.init(producers, interval)
  },
  destroy() {
    _record.init(producers)
  }
}
