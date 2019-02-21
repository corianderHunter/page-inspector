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

let nodesMap;

export function pageRender(domObj, self) {
    if (!self && !self.document) return
    nodesMap = new Map()
    self.document.documentElement.remove()
    self.document.append(plainObjectToDom(domObj, self, function (obj, node) {
        nodesMap.set(obj.id, node)
    }))
    addMouseNode(self)
    return nodesMap
}

export function getNodesMap() {
    return nodesMap
}