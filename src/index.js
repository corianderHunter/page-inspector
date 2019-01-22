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
  play(data, startPoint = 0) {
    _replay.init(startPoint, units, data, )
  }
}


window.addEventListener('message', e => {
  /** safety check */
  /** safety check */
  let _data = e.data;
  if (isEmpty(_data)) return;
  if (_data.type !== 'INSPECTOR') return;
  let {
    action,
    timePoint = 0,
    data
  } = _data;
  _replay[action] && actions[action](timePoint, units, data);
});

window.pageInspector || (function () {
  window.pageInspector = {
    record,
    replay
  }
})()