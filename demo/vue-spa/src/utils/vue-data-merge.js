import Vue from 'vue';

const objectTag = '[object Object]',
  arrayTag = '[object Array]';

let objectMerge = function (data, source) {
  if (!isSameType(data, source)) return console.warn('请保证合并数据的类型一致:', 'data:', data, 'source:', source)
  for (let pro in source) {
    if (data[pro] === undefined) {
      Vue.set(data, pro, source[pro]);
    } else {
      gateways(data, source[pro], pro)
    }
  }
}

let arrayMerge = function (data, source) {
  if (!isSameType(data, source)) return console.warn('请保证合并数据的类型一致:', 'data:' + data, 'source:' + source)
  for (let i = 0; i < source.length; i++) {
    if (data[i] === undefined) {
      data.push(source[i]);
    } else {
      gateways(data, source[i], i)
    }
  }
}

let isSameType = function (data, source) {
  return Object.prototype.toString.call(data) === Object.prototype.toString.call(source)
}

let gateways = function (data, source, propOrIndex) {
  switch (Object.prototype.toString.call(source)) {
    case objectTag:
      objectMerge(data[propOrIndex], source)
      return;
    case arrayTag:
      arrayMerge(data[propOrIndex], source)
      return;
    default:
      Vue.set(data, propOrIndex, source)
  }
}

let vueMerge = function (data, source, ignores = [null, undefined]) {
  switch (Object.prototype.toString.call(source)) {
    case objectTag:
      objectMerge(data, source)
      return;
    case arrayTag:
      arrayMerge(data, source)
      return;
    default:
      return console.warn('合并目标的类型只能是简单对象或者数组!')
  }

}

export default vueMerge
