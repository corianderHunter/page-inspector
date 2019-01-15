import {
    isEmpty
} from 'underscore'
import {
    isFunction
} from './utils'


let init = (consumers, data, startPoint) => {
    if (isEmpty(data) || isEmpty(data.records)) return;
    let interval = data.interval,
        replayers;
    replayers = consumers.map(val => {
        if (isFunction(val.replay))
            return val.replay
        val.replay.init();
        return val.replay.do

    }) || []
    for (let timePoint in data.records) {
        setTimeout(() => {
            replayers.forEach(func => {
                func(data.records[timePoint])
            })
        }, interval * (timePoint - 0));
    }
}

export default {
    init
}