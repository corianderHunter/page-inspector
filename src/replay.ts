import { isEmpty } from './helper/is';
import node from './units/node.record';
import mouse from './units/mouse.record';
import browserWindow from './units/browserWindow.record';
import { pageRender } from './units/page.replay';

let self, records, page, interval, replayers;

let consumers = [node, mouse, browserWindow];

function getReplayers() {
  return consumers.map(val => val) || [];
}

function init(...args) {
  [self, page, records, interval] = args;
  if (!records || isEmpty(records)) return;
  replayers = getReplayers();
  buildFuncMap();
  play(0, true);
}

let funcMap = new Map<number, Function>(),
  timerMap = new Map();

function buildFuncMap() {
  for (let timePoint in records) {
    funcMap.set(Number(timePoint) - 0, () => {
      replayers.forEach(func => {
        func(records[timePoint], self);
      });
    });
  }
}

function play(startPoint = 0, fresh) {
  stop();
  fresh && pageRender(page, self);
  for (let [timePoint, timeFunc] of funcMap) {
    if (timePoint >= startPoint) {
      timerMap.set(
        timePoint - 0,
        self.setTimeout(() => {
          timeFunc();
          timerMap.delete(timePoint);
        }, (timePoint - startPoint) * interval)
      );
    } else {
      fresh && timeFunc();
      fresh && timerMap.delete(timePoint);
    }
  }
}

function stop() {
  for (let [key, timer] of timerMap) {
    self.clearInterval(timer);
    timerMap.delete(key);
  }
}

export default {
  init,
  play,
  stop
};
