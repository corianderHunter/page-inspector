import recorder from './lib/recorder'
import replayer from './lib/replayer'

let inspector = {
  recorder,
  replayer
}

if (window && !window.inspector) {
  window.inspector = inspector
}

export {
  recorder,
  replayer
};

export default inspector
