import {
  domToPlainObject,
  plainObjectToDom,
  isUndef,
  watchInputNode,
  nodeRemove
} from "./utils"
import {
  throttle
} from 'underscore'


let interval = 50, //the minimum time interval,
  record,
  nodesMap_record = new Map(),
  recordType = 'nodes',
  nodesIdx_record;

//add all nodes(nodeType is Node.ELEMENT_NODE=1) into a Map for record,
function initNodesRecordMap() {
  let nodesArray = document.querySelectorAll('*');
  for (let i = 0; i < nodesArray.length; i++) {
    nodesMap_record.set(nodesArray[i], i)
  }
  nodesIdx_record = nodesMap_record.size + 100
}

//use MutationObserver to observer all of the node mutations 
let commonNodeObserver,
  observerOptions = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  };

function commonNodeObserverInit(ele = document.documentElement) {
  commonNodeObserver = new MutationObserver(mutations => {
    [...mutations].forEach(mutation => nodeMutationCollector(mutation))
  })
  commonNodeObserver.observe(ele, observerOptions)
}

function commonNodeObserverDestory() {
  if (!commonNodeObserver) return;
  commonNodeObserver.disconnect();
  commonNodeObserver = null;
}

function nodeMutationCollector(mutation) {
  let id = nodesMap_record.get(mutation.target),
    type = mutation.type;
  switch (type) {
    case 'attributes':
      record({
        type,
        attributeName: mutation.attributeName,
        newValue: mutation.target.getAttribute(mutation.attributeName),
        id
      }, recordType)
      break;
    case 'characterData':
      record({
        type,
        newValue: mutation.target.data,
        id
      }, recordType)
      break;
    case 'childList':
      let removedNodes = [...mutation.removedNodes].map(val => {
        //remove all children nodes from nodesMap_record
        if (val.nodeType === 1) {
          [...(val.querySelectorAll('*'))].forEach(_val => {
            nodesMap_record.delete(_val)
          })
        }
        let id = nodesMap_record.get(val)
        nodesMap_record.delete(val)
        return id
      })
      let addedNodes = [...mutation.addedNodes].map(val => {
        //add the added node into nodesMap_record
        nodesMap_record.set(val, ++nodesIdx_record)
        //transform node to object ,and set it and its childNodes into nodesMap_record
        return domToPlainObject(val, (obj, node) => {
          obj['id'] = ++nodesIdx_record
          nodesMap_record.set(node, nodesIdx_record)
        })
      })
      let prevNode, nextNode
      if (mutation.previousSibling) {
        if (mutation.previousSibling.nodeType === 1) {
          prevNode = nodesMap_record.get(mutation.previousSibling)
        } else {
          prevNode = nodesMap_record.get(mutation.previousSibling.previousElementSibling)
        }
      }
      if (mutation.nextSibling) {
        if (mutation.nextSibling.nodeType === 1) {
          nextNode = nodesMap_record.get(mutation.nextSibling)
        } else {
          nextNode = nodesMap_record.get(mutation.nextSibling.nextElementSibling)
        }
      }
      record({
        type,
        id,
        removedNodes,
        addedNodes,
        prevNode,
        nextNode,
      }, recordType)
      break;
    default:
      break;
  }
}

//<input> <textarea> <select>  input event add mutationObserver
let watchInput;

function inputMutationCollector(e) {
  record({
    type: 'input',
    newValue: e.target.value,
    id: nodesMap_record.get(e.target)
  }, recordType)
}

function inputNodeObserverInit() {
  document.documentElement.addEventListener('input', inputMutationCollector, false)
  watchInput = watchInputNode((node) => {
    record({
      type: 'input',
      newValue: node.value,
      id: nodesMap_record.get(node)
    }, recordType)
  })
}

function inputNodeObserverDestory() {
  document.documentElement.removeEventListener('input', inputMutationCollector, false)
  watchInput()
}

//observer the element scroll Event expect the top document
let scrollEvent;

function nodeScrollObserverInit() {
  window.addEventListener('scroll', scrollEvent = throttle((e) => {
    let target = e.target;
    if (target === document) return; //the top scroll Event ,see in window.js
    record({
      type: 'scroll',
      id: nodesMap_record.get(target),
      newValue: [target.scrollLeft, target.scrollTop]
    }, recordType)
  }, interval), true)
}

function nodeScrollObserverDestory() {
  window.removeEventListener('scroll', scrollEvent, true)
}

//replay function

let nodesMap_replay = new Map()

function initNodesReplayMap() {
  let nodesArray = document.querySelectorAll('*');
  for (let i = 0; i < nodesArray.length; i++) {
    nodesMap_replay.set(i, nodesArray[i])
  }
  // nodesIdx_replay = nodesMap_replay.size
}

function recordReplay(data) {
  let target = nodesMap_replay.get(data.id)
  if (isUndef(target)) return;
  switch (data.type) {
    case 'attributes':
      target.setAttribute(data.attributeName, data.newValue)
      break;
    case 'characterData':
      target.data = data.newValue
      break;
    case 'childList':
      data.removedNodes.forEach(val => {
        nodeRemove(nodesMap_replay.get(val))
        nodesMap_replay.delete(val)
      })
      let fragNode = document.createDocumentFragment()
      data.addedNodes.forEach(val => {
        let _dom = plainObjectToDom(val, (obj, node) => {
          nodesMap_replay.set(obj.id, node)
        })
        _dom && fragNode.appendChild(_dom)
      })
      let xx = 1
      if (data.prevNode) {
        xx--;
        console.log(data, fragNode)
        let _prevNode = nodesMap_replay.get(data.prevNode)
        _prevNode && _prevNode.after(fragNode)
      }
      if (xx && data.nextNode) {
        xx--;
        let _nextNode = nodesMap_replay.get(data.nextNode)
        _nextNode && _nextNode.before(fragNode)
      }
      xx && target.appendChild(fragNode)
      break;
    case 'input':
      target.value = data.newValue
      break;
    case 'scroll':
      target.scrollTo(...data.newValue)
      break;
  }
}




export default {
  record: {
    init(_record, _interval = 50) {
      record = _record;
      interval = _interval
      initNodesRecordMap()
      commonNodeObserverInit()
      inputNodeObserverInit()
      nodeScrollObserverInit()
    },
    destroy(record, interval = 50) {
      commonNodeObserverDestory()
      inputNodeObserverDestory()
      nodeScrollObserverDestory()
    }
  },
  replay: {
    init: initNodesReplayMap,
    do(records) {
      records[recordType] && records[recordType].forEach(val => {
        recordReplay(val)
      })
    }

  }
}