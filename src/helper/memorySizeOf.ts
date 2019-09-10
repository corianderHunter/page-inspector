/** memorySizeOf*/
/**
 * code from 'https://gist.github.com/zensh/4975495'
 */

function formatByteSize(bytes, format) {
  switch (format) {
    case 'BT':
      return bytes;
    case 'KB':
      return (bytes / 1024).toFixed(3);
    case 'MB':
      return (bytes / 1048576).toFixed(3);
    case 'GB':
      return (bytes / 1073741824).toFixed(3);
    default:
      console.error('supported data format:BT,KB,MB,GB');
      return bytes;
  }
}

export default function memorySizeOf(obj, format = 'KB') {
  let bytes = 0;

  function sizeOf(obj) {
    if (obj !== null && obj !== undefined) {
      switch (typeof obj) {
        case 'number':
          bytes += 8;
          break;
        case 'string':
          bytes += obj.length * 2;
          break;
        case 'boolean':
          bytes += 4;
          break;
        case 'object':
          let objClass = Object.prototype.toString.call(obj).slice(8, -1);
          if (objClass === 'Object' || objClass === 'Array') {
            for (let key in obj) {
              if (!obj.hasOwnProperty(key)) continue;
              sizeOf(obj[key]);
            }
          } else bytes += obj.toString().length * 2;
          break;
      }
    }
    return bytes;
  }

  return formatByteSize(sizeOf(obj), format);
}
