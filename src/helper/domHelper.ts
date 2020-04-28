import { isPlainObject, isAbsoluteUrl } from "./is";

export type DomObject = {
  id?: number;
  nodeType: number;
  tagName: string;
  attributes?: {
    [key: string]: any;
  };
  childNodes?: DomObject[];
  textContent?: string;
};

export type NodeType = Element | Text | Comment;

const NETWORKATTRIBUTES = ["src", "href"];

export function domToPlainObject(
  node: Element,
  format = (obj: DomObject, node: Element) => {}
): DomObject {
  /**
   * Node Types:
   * Node.ELEMENT_NODE  1   An Element node such as <p> or <div>
   * others:
   * Node.TEXT_NODE     3   The actual Text of Element or Attr
   * Node.COMMENT_NODE  8   A Comment node.
   * ....
   */

  let plainObject = {
    nodeType: node.nodeType,
  } as DomObject;
  switch (node.nodeType) {
    case 1:
    case 9:
      plainObject.tagName = node.tagName;
      if (node.attributes.length) {
        let attributes = (plainObject.attributes = {}) as {
          [key: string]: any;
        };
        for (let i = 0; i < node.attributes.length; i++) {
          attributes[node.attributes[i].nodeName] =
            node.attributes[i].nodeValue;
        }
      }
      if (node.childNodes && node.childNodes.length) {
        plainObject.childNodes = [...(node.childNodes as any)].map((val) =>
          domToPlainObject(val as Element, format)
        );
      }
      break;
    default:
      if (node.parentElement) {
        plainObject.textContent =
          node.parentElement.tagName === "STYLE"
            ? handleStyleUrl(node.textContent)
            : node.textContent;
      } else {
        plainObject.textContent = node.textContent;
      }
      break;
  }
  format(plainObject, node);
  return plainObject;
}

export function plainObjectToDom(
  obj: DomObject,
  self = window,
  callback = (obj: DomObject, node: NodeType) => {}
): NodeType {
  if (!isPlainObject(obj)) return;
  let _node: NodeType;
  try {
    switch (obj.nodeType) {
      case 1:
      case 9:
        if (obj.tagName.toUpperCase() === "SCRIPT") {
          _node = self.document.createElement("NO-SCRIPT");
        } else {
          _node = self.document.createElement(obj.tagName);
        }
        if (!_node) return;
        if (obj.attributes) {
          for (let pro in obj.attributes) {
            _node.setAttribute(pro, obj.attributes[pro]);
          }
          if (obj.tagName.toUpperCase() === "A") {
            _node.removeAttribute("href");
            obj.attributes["href"] &&
              _node.setAttribute("_href", obj.attributes["href"]);
          }
        }
        obj.childNodes &&
          obj.childNodes.forEach((val) => {
            let _dom = plainObjectToDom(val, self, callback);
            _dom && _node.appendChild(_dom);
          });
        break;
      case 3:
        _node = new Text();
        _node.textContent = obj.textContent;
        break;
      case 8:
        _node = new Comment();
        _node.textContent = obj.textContent;
        break;
      default:
        break;
    }
  } catch (e) {
    console.error(e);
  }
  callback(obj, _node);
  return _node;
}

export function nodeRemove(node: Element) {
  if (!node || !node.nodeType) return;
  if (Element.prototype.remove) return node.remove();
  if (node.parentNode) return node.parentNode.removeChild(node);
}

function handleStyleUrl(content: string) {
  return content.replace(
    /url\("?(.*?)"?\)/g,
    `url(/proxy?target=${new URL("$1", window.location.origin).href})`
  );
}

export function formatUrlAttributes(attrs: { [key: string]: any }) {
  if (!attrs) return;
  NETWORKATTRIBUTES.forEach((val) => {
    if (attrs[val] && !isAbsoluteUrl(attrs[val])) {
      try {
        attrs[val] = new URL(attrs[val], window.location.origin).href;
        return attrs;
      } catch (e) {
        console.error(e);
      }
    }
  });
}

//watch all of the input value change caused by js code
export function watchInputNode(callback) {
  function collectAndCheck() {
    tagNames.forEach((tagName) => {
      nodes = [...nodes, ...[document.getElementsByTagName(tagName) as any]];
    });
    let newMap = new Map();
    nodes.forEach((node) => {
      newMap.set(node, node.value || "");
      let _value = cacheMap.get(node);
      if (_value !== undefined) {
        _value === node.value ? null : callback(node);
      }
    });
    cacheMap = newMap;
  }
  let tagNames = ["INPUT", "TEXTAREA", "SELECT"],
    nodes = [],
    cacheMap = new Map();
  collectAndCheck();
  let _timer = setInterval(function () {
    collectAndCheck();
  }, 300);
  return function () {
    clearInterval(_timer);
  };
}

export function formatUrlAttribute(attr: string, value: string) {
  if (!attr || !value) return value;
  if (NETWORKATTRIBUTES.includes(attr)) {
    if (value && !isAbsoluteUrl(value)) {
      try {
        console.log(value, attr, new URL(value, window.location.origin).href);
        return new URL(value, window.location.origin).href;
      } catch (e) {
        console.error(e);
      }
    }
  }
  return value;
}
