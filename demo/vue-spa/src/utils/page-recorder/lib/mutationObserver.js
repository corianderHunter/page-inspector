import unique from 'unique-selector';
import _ from 'underscore'

const selectorOptions = {
  selectorTypes: ['ID', 'Class', 'Tag', 'NthChild']
}

let mutationObserver;

let transformMutation = function (mutation) {
  /**
   * @param {Object} MutationRecord
   */
  // console.log('nodeType', mutation.target.nodeType)
  console.log(mutation)
  if (!mutation.target.parentNode) return;
  let result = {}
  result.type = mutation.type
  result.target = unique(mutation.target, selectorOptions)
  switch (mutation.type) {
    case 'attributes':
      result = {
        ...result,
        attributeName: mutation.attributeName,
        newValue: mutation.target.getAttribute(mutation.attributeName)
      }
      break;
    case 'characterData':
      result = {
        ...result,
        newValue: mutation.target.data
      }
      break;
    case 'childList':
      //定位变动dom的前后节点，后面用于操作  
      let addedNodes = _.compact([...mutation.addedNodes].filter(node => node.parentNode).map(node => node.outerHTML || ''));
      !addedNodes.length && !mutation.previousSibling && !mutation.nextSibling ? result = null :
        result = {
          ...result,
          addedNodes,
          prevNode: unique(mutation.previousSibling),
          nextNode: unique(mutation.nextSibling),
        }
      break;
    default:
      break;
  }
  return result;
}

//mutationObserver无法watch到input areatext 之类的变化

let inputEvent;
let inputObserverInit = (callback) => {
  document.documentElement.addEventListener('input', inputEvent = (e) => {
    callback.call(null, {
      type: 'input',
      newValue: e.target.value,
      target: unique(e.target, selectorOptions)
    })
  }, false)
}

let inputObserverDestory = () => {
  document.documentElement.removeEventListener('input', inputEvent, false)
}


let observe = (callback, ele = document.documentElement) => {
  if (!mutationObserver) {
    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        callback.call(null, transformMutation(mutation))
      })
    })
  }

  mutationObserver.observe(ele, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  })

  inputObserverInit(callback)
}

let disconnect = () => {
  if (mutationObserver) {
    mutationObserver.disconnect()
    mutationObserver = null
    inputObserverDestory()
    inputEvent = null
  } else {
    console.log('mutationObserver', mutationObserver)
  }
};

export default {
  observe,
  disconnect
}
