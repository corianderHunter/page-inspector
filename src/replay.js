import {
    isEmpty
} from 'underscore';
import {
    isFunction
} from './utils';

let interval,
    records,
    startPoint,
    replayers,
    funcMap = new Map(),
    timerMap = new Map();

let init = (_startPoint = 0, consumers, data, ) => {
    if (isEmpty(data) || isEmpty(data.records))
        return console.error('record data is empty');
    startPoint = _startPoint;
    interval = data.interval;
    records = data.records;
    replayers =
        consumers.map(val => {
            if (isFunction(val.replay)) return val.replay;
            val.replay.init();
            return val.replay.do;
        }) || [];
    for (let timePoint in records) {
        if (timePoint - 0 <= startPoint) {
            replayers.forEach(func => {
                func(data.records[timePoint]);
            });
            continue;
        }
        funcMap.set(timePoint - 0, () => {
            replayers.forEach(func => {
                func(data.records[timePoint]);
            });
        });
    }
    play()
};

let play = (currPoint = startPoint) => {
    for (let timePoint in funcMap) {
        if (timePoint >= currPoint)
            timerMap.set(
                timePoint - 0,
                setTimeout(() => {
                    funcMap.get(timePoint);
                    timerMap.delete(timePoint);
                }, (timePoint - currPoint) * interval));
    }
};

let stop = currPoint => {
    for (timePoint in timerMap) {
        clearInterval(timerMap.get(timePoint));
    }
};

export default {
    init,
    play,
    stop
};