export const isUndef = (v: any) => {
  return v === undefined || v === null;
};

export const isObject = (obj: any) => {
  return obj !== null && typeof obj === "object";
};

export const isPlainObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

export const isRegExp = (v: any) => {
  return Object.prototype.toString.call(v) === "[object RegExp]";
};

export const isFunction = (v: any) => {
  return Object.prototype.toString.call(v) === "[object Function]";
};

export function isEmpty(obj: any) {
  if (obj == null) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}

export function isAbsoluteUrl(url: string) {
  return /^(?:[a-z]+:)?\/\//i.test(url);
}
