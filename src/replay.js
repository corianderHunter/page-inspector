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

let init = (consumers, data, _startPoint = 0) => {
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
};

let play = (currPoint = startPoint) => {
    for (let timePoint in funcMap) {
        if (timePoint >= currPoint)
            timerMap.set(
                timePoint - 0,
                setTimeout(() => {
                    funcMap[timePoint]();
                    timerMap.delete(timePoint);
                }, (timePoint - currPoint) * interval)
            );
    }
};

let stop = currPoint => {
    for (timePoint in timerMap) {
        clearInterval(timerMap.get(timePoint));
    }
};

let actions = {
    init,
    play,
    stop
};

let postMessageInit = (function () {
    window.addEventListener('message', e => {
        /** safety check */
        /** safety check */
        let _data = e.data;
        let action, startPoint, data;
        action = _data.action;
        startPoint = _data.startPoint;
        data = _data.data;
        actions[_data.action] && actions[_data.action](_data.data);
    });
})();
//

export default {};