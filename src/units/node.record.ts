import { pageCollection } from "./page.record";
import {
  formatUrlAttribute,
  domToPlainObject,
  formatUrlAttributes,
  watchInputNode,
  NodeType,
} from "../helper/domHelper";
import throttle from "../helper/throttle";

let interval = 50, //the minimum time interval,
  record: RecordTakeEvent,
  nodesMap_record: Map<NodeType, number>,
  recordType = "nodes",
  nodesIdx_record;

//add all nodes(nodeType is Node.ELEMENT_NODE=1) into a Map for record,
function initNodesRecordMap() {
  nodesMap_record = pageCollection.domMap;
  nodesIdx_record = nodesMap_record.size;
}

//use MutationObserver to observer all of the node mutations
let commonNodeObserver: MutationObserver,
  observerOptions: MutationObserverInit = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true,
  };

function commonNodeObserverInit(ele = document.documentElement) {
  commonNodeObserver = new MutationObserver((mutations) => {
    [...mutations].forEach((mutation) => nodeMutationCollector(mutation));
  });
  commonNodeObserver.observe(ele, observerOptions);
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
    case "attributes":
      record(
        {
          type,
          attributeName: mutation.attributeName,
          newValue: formatUrlAttribute(
            mutation.attributeName,
            mutation.target.getAttribute(mutation.attributeName)
          ),
          id,
        },
        recordType
      );
      break;
    case "characterData":
      record(
        {
          type,
          newValue: mutation.target.data,
          id,
        },
        recordType
      );
      break;
    case "childList":
      let removedNodes = [...mutation.removedNodes].map((val) => {
        //remove all children nodes from nodesMap_record
        if (val.nodeType === 1) {
          [...val.querySelectorAll("*")].forEach((_val) => {
            nodesMap_record.delete(_val);
          });
        }
        let id = nodesMap_record.get(val);
        nodesMap_record.delete(val);
        return id;
      });
      let addedNodes = [...mutation.addedNodes].map((val) => {
        //add the added node into nodesMap_record
        nodesMap_record.set(val, ++nodesIdx_record);
        //transform node to object ,and set it and its childNodes into nodesMap_record
        return domToPlainObject(val, (obj, node) => {
          obj.attributes && formatUrlAttributes(obj.attributes);
          obj["id"] = ++nodesIdx_record;
          nodesMap_record.set(node, nodesIdx_record);
        });
      });
      let prevNode, nextNode;
      if (mutation.previousSibling)
        (prevNode = nodesMap_record.get(mutation.previousSibling)) ||
          (prevNode = nodesMap_record.get(
            mutation.previousSibling.previousElementSibling
          ));
      if (mutation.nextSibling)
        (nextNode = nodesMap_record.get(mutation.nextSibling)) ||
          (nextNode = nodesMap_record.get(
            mutation.nextSibling.previousElementSibling
          ));
      record(
        {
          type,
          id,
          removedNodes,
          addedNodes,
          prevNode,
          nextNode,
        },
        recordType
      );
      break;
    default:
      break;
  }
}

//<input> <textarea> <select>  input event add mutationObserver
let watchInputEvent: Function;

function inputMutationCollector(e) {
  record(
    {
      type: "input",
      newValue: e.target.value,
      id: nodesMap_record.get(e.target),
    },
    recordType
  );
}

function inputNodeObserverInit() {
  document.documentElement.addEventListener(
    "input",
    inputMutationCollector,
    false
  );
  watchInputEvent = watchInputNode((node) => {
    record(
      {
        type: "input",
        newValue: node.value,
        id: nodesMap_record.get(node),
      },
      recordType
    );
  });
}

function inputNodeObserverDestory() {
  document.documentElement.removeEventListener(
    "input",
    inputMutationCollector,
    false
  );
  watchInputEvent();
}

//observer the element scroll Event expect the top document
let scrollEvent;

function nodeScrollObserverInit() {
  window.addEventListener(
    "scroll",
    (scrollEvent = throttle(interval, (e) => {
      let target = e.target;
      if (target === document) return; //the top scroll Event ,see in browserWindow.record.ts
      record(
        {
          type: "scroll",
          id: nodesMap_record.get(target),
          newValue: [target.scrollLeft, target.scrollTop],
        },
        recordType
      );
    })),
    true
  );
}

function nodeScrollObserverDestory() {
  window.removeEventListener("scroll", scrollEvent, true);
}

export default {
  init(_record, _interval = 50) {
    record = _record;
    interval = _interval;
    initNodesRecordMap();
    commonNodeObserverInit();
    inputNodeObserverInit();
    nodeScrollObserverInit();
  },
  destroy(record, interval = 50) {
    commonNodeObserverDestory();
    inputNodeObserverDestory();
    nodeScrollObserverDestory();
  },
};
