/**
 * storage the entire page
 */

import {
    domToPlainObject,
    plainObjectToDom,
    formatUrlAttributes
} from './utils'

export function pageCollector() {
    let domMap = new Map(),
        key = 0,
        domObject
    domObject = domToPlainObject(document.querySelector('html'), (obj, node) => {
        formatUrlAttributes(obj)
        domMap.set(node, ++key)
        obj['id'] = key
    })
    return {
        domMap,
        maxKey: key,
        domObject
    }
}

export function pageRender() {}