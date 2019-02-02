import {
    isEmpty
} from './utils'
import {
    pageRender
} from './page'
import node from './units/node'
import mouse from './units/mouse'
import browserWindow from './units/browserWindow'

let ws, self, records, domObj, interval, replayers;

let consumers = [node, mouse, browserWindow]

function getReplayers() {
    return consumers.map(val => val.replay) || []
}


function init(_self, _dom, data) {

    self = _self
    domObj = _dom
    records = data.records
    interval = data.interval
    if (!records || isEmpty(records)) return
    replayers = getReplayers()
    buildFuncMap()
    play(0, true)
}

let funcMap = new Map(),
    timerMap = new Map()

function buildFuncMap() {
    for (let timePoint in records) {
        funcMap.set(timePoint - 0, () => {
            replayers.forEach(func => {
                func(records[timePoint], self)
            })
        })
    }
}

function play(startPoint = 0, fresh) {
    stop();
    fresh && pageRender(domObj, self)
    for (let [timePoint, timeFunc] of funcMap) {
        if (timePoint >= startPoint) {
            timerMap.set(timePoint - 0, self.setTimeout(() => {
                timeFunc()
                timerMap.delete(timePoint)
            }, (timePoint - startPoint) * interval))
        } else {
            fresh && timeFunc()
            fresh && timerMap.delete(timePoint)
        }
    }
}

function stop() {
    for (let [key, timer] of timerMap) {
        self.clearInterval(timer)
        timerMap.delete(key)
    }

}

export default {
    init,
    play,
    stop
}