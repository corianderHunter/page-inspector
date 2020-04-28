import { getNodesMap } from './page.replay';
import { isUndef } from '../helper/is';
import { nodeRemove, plainObjectToDom } from '../helper/domHelper';

let self,
  recordType = 'nodes';

function recordReplay(data) {
  let nodesMap_replay = getNodesMap();
  let target = nodesMap_replay.get(data.id);
  if (isUndef(target)) return;
  switch (data.type) {
    case 'attributes':
      if (target.tagName === 'A' && data.attributeName === 'href') {
        target.setAttribute('_href', data.newValue);
      } else {
        target.setAttribute(data.attributeName, data.newValue);
      }

      break;
    case 'characterData':
      target.data = data.newValue;
      break;
    case 'childList':
      data.removedNodes.forEach(val => {
        nodeRemove(nodesMap_replay.get(val));
        nodesMap_replay.delete(val);
      });
      let fragNode = self.document.createDocumentFragment();
      data.addedNodes.forEach(val => {
        let _dom = plainObjectToDom(val, self, (obj, node) => {
          nodesMap_replay.set(obj.id, node);
        });
        _dom && fragNode.appendChild(_dom);
      });
      let xx = 1;
      if (data.prevNode) {
        xx--;
        let _prevNode = nodesMap_replay.get(data.prevNode);
        _prevNode && _prevNode.after(fragNode);
      }
      if (xx && data.nextNode) {
        xx--;
        let _nextNode = nodesMap_replay.get(data.nextNode);
        _nextNode && _nextNode.before(fragNode);
      }
      xx && target.appendChild(fragNode);
      break;
    case 'input':
      target.value = data.newValue;
      break;
    case 'scroll':
      target.scrollTo(...data.newValue);
      break;
  }
}

export default function(records, _self = window) {
  self = _self;
  records[recordType] &&
    records[recordType].forEach(val => {
      recordReplay(val);
    });
}
