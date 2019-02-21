import {
    domToPlainObject,
    formatUrlAttributes
} from '../utils'

function getWindowSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

export let pageCollection;

export function pageCollector() {
    let domMap = new Map(),
        key = 0,
        domObject
    domObject = domToPlainObject(document.querySelector('html'), (obj, node) => {
        obj.attributes && formatUrlAttributes(obj.attributes)
        domMap.set(node, ++key)
        obj['id'] = key
    })
    return pageCollection = {
        domMap,
        maxKey: key,
        domObject,
        size: getWindowSize()
    }
}