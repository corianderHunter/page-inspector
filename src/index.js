import {
  isEmpty
} from 'underscore';

import node from './node'
import mouse from './mouse'
import browserWindow from './browserWindow'

import _record from './record'
import _replay from './replay'

let units = [node, mouse, browserWindow]

export let record = {
  ..._record,
  init(interval) {
    domReady()
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

//用来确报，record和replay的时机一致,当开始record时，尝试向父窗口发送消息
let domReady = () => {
  (window !== window.parent) && window.parent.postMessage('INSPECTOR_READY', window.parent.location.origin)
}

window.addEventListener('message', e => {
  /** safety check */
  /** safety check */
  let _data = e.data;
  if (isEmpty(_data)) return;
  if (_data.type !== 'INSPECTOR') return;
  if (_record.status) _record.destroy();
  let {
    action,
    timePoint = 0,
    data
  } = _data;
  _replay[action] && _replay[action](timePoint, units, data)
});

window.pageInspector || (function () {
  window.pageInspector = {
    record,
    replay
  }
})()