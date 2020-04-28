import { isUndef } from "../../dist/types/helper/is";

let self;

export default function (record, _self = window) {
  self = _self;
  let _window = record.window;
  _window &&
    !isUndef(_window.sx) &&
    !isUndef(_window.sy) &&
    self.scrollTo(_window.sx, _window.sy);
}
