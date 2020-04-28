let self, clickPointNode;

function mouseUpdate(data) {
  self.document.getElementById('__page_inspector_mouse').style.left =
    data.x + 'px';
  self.document.getElementById('__page_inspector_mouse').style.top =
    data.y + 'px';
}

let getClickPointNode = function() {
  let _point = self.document.createElement('div');
  _point.setAttribute(
    'style',
    'position:absolute;width:10px;height:10px;border-radius:10px;background-color:red;opacity: 0.8;z-index:9999;'
  );
  self.document.body.appendChild(_point);
  // self.setTimeout(() => {
  //   nodeRemove(_point)
  // }, 3000)
  return _point;
};

function addClickPoint(data, clickPointNode) {
  let _cloneNode = clickPointNode.cloneNode();
  _cloneNode.style.top = data.y + 'px';
  _cloneNode.style.left = data.x + 'px';
  //append somewhere
  self.document.body.appendChild(_cloneNode);
}

export default function(records, _self = window) {
  self = _self;
  let mouse, mouseDown;
  !clickPointNode && (clickPointNode = getClickPointNode());
  mouse = records.mouse;
  mouseDown = records.mouseDown;
  mouseDown && addClickPoint(mouseDown, clickPointNode);
  mouse && mouseUpdate(mouse);
}
