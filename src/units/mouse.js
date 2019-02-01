/**
 * mouse
 */
import {
  throttle
} from '../utils'

let self, interval,
  record
// ,recordType = ['mouse', 'mouseDown'];

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

//replay function
let clickPointNode


function mouseUpdate(data, mouseNode) {
  self.document.getElementById('__page_inspector_mouse').style.left = data.x + 'px'
  self.document.getElementById('__page_inspector_mouse').style.top = data.y + 'px'
}

let getClickPointNode = function () {
  let _point = self.document.createElement('div')
  _point.setAttribute('style', 'position:absolute;width:10px;height:10px;border-radius:10px;background-color:red;opacity: 0.8;z-index:9999;')
  self.document.body.appendChild(_point)
  // self.setTimeout(() => {
  //   nodeRemove(_point)
  // }, 3000)
  return _point
}

function addClickPoint(data, clickPointNode) {
  let _cloneNode = clickPointNode.cloneNode()
  _cloneNode.style.top = data.y + 'px'
  _cloneNode.style.left = data.x + 'px'
  //append somewhere
  self.document.body.appendChild(_cloneNode)
}

export default {
  record: {
    init(_record, _interval = 50) {
      record = _record;
      interval = _interval;
      mount();
    },
    destroy() {
      unmount();
    }
  },
  replay(records, _self = window) {
    self = _self
    let mouse, mouseDown;
    !clickPointNode && (clickPointNode = getClickPointNode());
    mouse = records.mouse
    mouseDown = records.mouseDown
    mouseDown && addClickPoint(mouseDown, clickPointNode)
    mouse && mouseUpdate(mouse)
  }
};