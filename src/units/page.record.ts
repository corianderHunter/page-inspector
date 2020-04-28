import {
  domToPlainObject,
  formatUrlAttributes,
  DomObject,
  NodeType,
} from "../helper/domHelper";

function getWindowSize(): WindowSize {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

interface WindowSize {
  width: number;
  height: number;
}

interface PageCollectionType {
  domMap: Map<NodeType, number>;
  maxKey: number;
  domObject: DomObject;
  size: WindowSize;
}

export let pageCollection: PageCollectionType;

export function pageCollector() {
  let domMap = new Map(),
    key = 0,
    domObject;
  domObject = domToPlainObject(document.querySelector("html"), (obj, node) => {
    obj.attributes && formatUrlAttributes(obj.attributes);
    domMap.set(node, ++key);
    obj["id"] = key;
  });
  return (pageCollection = {
    domMap,
    maxKey: key,
    domObject,
    size: getWindowSize(),
  });
}
