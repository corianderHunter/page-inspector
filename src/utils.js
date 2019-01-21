const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

function detect() {
  if (typeof navigator !== 'undefined') {
    return parseUserAgent(navigator.userAgent);
  }

  return getNodeVersion();
}

function detectOS(userAgentString) {
  let rules = getOperatingSystemRules();
  let detected = rules.filter(function (os) {
    return os.rule && os.rule.test(userAgentString);
  })[0];

  return detected ? detected.name : null;
}

function getNodeVersion() {
  let isNode = typeof process !== 'undefined' && process.version;
  return isNode && {
    name: 'node',
    version: process.version.slice(1),
    os: process.platform
  };
}

function parseUserAgent(userAgentString) {
  let browsers = getBrowserRules();
  if (!userAgentString) {
    return null;
  }

  let detected = browsers.map(function (browser) {
    let match = browser.rule.exec(userAgentString);
    let version = match && match[1].split(/[._]/).slice(0, 3);

    if (version && version.length < 3) {
      version = version.concat(version.length == 1 ? [0, 0] : [0]);
    }

    return match && {
      name: browser.name,
      version: version.join('.')
    };
  }).filter(Boolean)[0] || null;

  if (detected) {
    detected.os = detectOS(userAgentString);
  }

  if (/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(userAgentString)) {
    detected = detected || {};
    detected.bot = true;
  }

  return detected;
}

function getBrowserRules() {
  return buildRules([
    ['aol', /AOLShield\/([0-9\._]+)/],
    ['edge', /Edge\/([0-9\._]+)/],
    ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
    ['vivaldi', /Vivaldi\/([0-9\.]+)/],
    ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
    ['samsung', /SamsungBrowser\/([0-9\.]+)/],
    ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
    ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
    ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
    ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
    ['fxios', /FxiOS\/([0-9\.]+)/],
    ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
    ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
    ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
    ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
    ['ie', /MSIE\s(7\.0)/],
    ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
    ['android', /Android\s([0-9\.]+)/],
    ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
    ['safari', /Version\/([0-9\._]+).*Safari/],
    ['facebook', /FBAV\/([0-9\.]+)/],
    ['instagram', /Instagram\s([0-9\.]+)/],
    ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/]
  ]);
}

function getOperatingSystemRules() {
  return buildRules([
    ['iOS', /iP(hone|od|ad)/],
    ['Android OS', /Android/],
    ['BlackBerry OS', /BlackBerry|BB10/],
    ['Windows Mobile', /IEMobile/],
    ['Amazon OS', /Kindle/],
    ['Windows 3.11', /Win16/],
    ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
    ['Windows 98', /(Windows 98)|(Win98)/],
    ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
    ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
    ['Windows Server 2003', /(Windows NT 5.2)/],
    ['Windows Vista', /(Windows NT 6.0)/],
    ['Windows 7', /(Windows NT 6.1)/],
    ['Windows 8', /(Windows NT 6.2)/],
    ['Windows 8.1', /(Windows NT 6.3)/],
    ['Windows 10', /(Windows NT 10.0)/],
    ['Windows ME', /Windows ME/],
    ['Open BSD', /OpenBSD/],
    ['Sun OS', /SunOS/],
    ['Linux', /(Linux)|(X11)/],
    ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
    ['QNX', /QNX/],
    ['BeOS', /BeOS/],
    ['OS/2', /OS\/2/],
    ['Search Bot', /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/]
  ]);
}

function buildRules(ruleTuples) {
  return ruleTuples.map(function (tuple) {
    return {
      name: tuple[0],
      rule: tuple[1]
    };
  });
}

/**
 * transform dom node object to a array of plain object,record part of object props
 * attra
 * @param {*} node 
 * @returns {Array} arr
 */
function domToPlainObject(node, format = () => {}) {
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
  }
  switch (node.nodeType) {
    case 1:
    case 9:
      plainObject.tagName = node.tagName;
      if (node.attributes.length) {
        let attributes = plainObject.attributes = {}
        for (let i = 0; i < node.attributes.length; i++) {
          attributes[node.attributes[i].nodeName] = node.attributes[i].nodeValue
        }
      }
      if (node.childNodes && node.childNodes.length) {
        plainObject.childNodes = [...node.childNodes].map(val => domToPlainObject(val, format))
      }
      break
    default:
      plainObject.textContent = node.textContent
      break
  }
  format(plainObject, node)
  return plainObject
}

function plainObjectToDom(obj, callback = () => {}) {
  if (!isPlainObject(obj)) return
  let _node
  try {
    switch (obj.nodeType) {
      case 1:
      case 9:
        _node = document.createElement(obj.tagName)
        if (!_node) return;
        if (obj.attributes) {
          for (let pro in obj.attributes) {
            _node.setAttribute(pro, obj.attributes[pro])
          }
        }
        obj.childNodes && obj.childNodes.forEach(val => {
          let _dom = plainObjectToDom(val, callback)
          _dom && _node.appendChild(_dom)
        })
        break;
      case 3:
        _node = new Text()
        _node.textContent = obj.textContent
        break;
      case 8:
        _node = new Comment()
        _node.textContent = obj.textContent
        break;
      default:
        break;
    }
  } catch (e) {
    console.error(e)
  }
  callback(obj, _node)
  return _node;
}

//watch all of the input value change caused by js code
function watchInputNode(callback) {
  function collectAndCheck() {
    tagNames.forEach(tagName => {
      nodes = [...nodes, ...document.getElementsByTagName(tagName)]
    })
    let newMap = new Map()
    nodes.forEach(node => {
      newMap.set(node, node.value || '')
      let _value = cacheMap.get(node)
      if (_value !== undefined) {
        _value === node.value ? null : callback(node)
      }
    })
    cacheMap = newMap
  }
  let tagNames = ['INPUT', 'TEXTAREA', 'SELECT'],
    nodes = [],
    cacheMap = new Map()
  collectAndCheck()
  let _timer = setInterval(function () {
    collectAndCheck()
  }, 300)
  return function () {
    clearInterval(_timer)
  }
}

/** memorySizeOf*/
/**
 * code from 'https://gist.github.com/zensh/4975495'
 */
function memorySizeOf(obj, format) {
  let bytes = 0;

  function sizeOf(obj) {
    if (obj !== null && obj !== undefined) {
      switch (typeof obj) {
        case "number":
          bytes += 8;
          break;
        case "string":
          bytes += obj.length * 2;
          break;
        case "boolean":
          bytes += 4;
          break;
        case "object":
          let objClass = Object.prototype.toString
            .call(obj)
            .slice(8, -1);
          if (objClass === "Object" || objClass === "Array") {
            for (let key in obj) {
              if (!obj.hasOwnProperty(key)) continue;
              sizeOf(obj[key]);
            }
          } else bytes += obj.toString().length * 2;
          break;
      }
    }
    return bytes;
  }

  function formatByteSize(bytes, format) {
    switch (format) {
      case 'BT':
        return bytes
      case 'KB':
        return (bytes / 1024).toFixed(3)
      case 'MB':
        return (bytes / 1048576).toFixed(3)
      case 'GB':
        return (bytes / 1073741824).toFixed(3)
      default:
        console.error('supported data format:BT,KB,MB,GB')
        return bytes;
    }
  }

  return formatByteSize(sizeOf(obj), format);
}
/** memorySizeOf*/

//under risk
let globalOldEvents = {};
//under risk
function globalEventBind(eventName, callback) {
  globalOldEvents[eventName] = window[eventName];
  window[eventName] = (e) => {
    typeof globalOldEvents[eventName] === 'function' ? globalOldEvents[eventName].call(null, e) : null;
    callback.call(null, e)
  }
}
//under risk
function globalEventUnBind(eventName) {
  if (eventName !== undefined) {
    window[eventName] = globalOldEvents[eventName]
  } else {
    for (let pro in globalOldEvents) {
      window[pro] = globalOldEvents[pro]
    }
  }

}

function isUndef(v) {
  return v === undefined || v === null
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function isRegExp(v) {
  return Object.prototype.toString.call(v) === '[object RegExp]'
}

function isFunction(v) {
  return typeof v === 'function' || false;
};

function nodeRemove(node) {
  if (!node || !node.nodeType) return
  if (Element.prototype.remove)
    return node.remove()
  if (node.parentNode)
    return node.parentNode.removeChild(node)
}

export {
  isBrowser,
  isNode,
  detect,
  detectOS,
  getNodeVersion,
  parseUserAgent,
  globalEventBind,
  globalEventUnBind,
  isUndef,
  isObject,
  isPlainObject,
  isRegExp,
  isFunction,
  domToPlainObject,
  plainObjectToDom,
  watchInputNode,
  memorySizeOf,
  nodeRemove
};