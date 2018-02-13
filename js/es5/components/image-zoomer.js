'use strict';

var w = document.querySelector('#sl-init .cut-wrapper > .container');
var ww = w.clientWidth;
var wh = w.clientHeight;

if (ww < 1280 || wh < 1000) {
  var images = document.querySelectorAll('#sl-init img');
  var hc = wh / ww;
  var fc = 0;

  if (hc < 0.5) {
    fc = 0.5;
  } else if (hc < 0.6) {
    fc = 0.65;
  } else if (hc < 0.7) {
    fc = 0.75;
  } else {
    fc = 1;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var image = _step.value;

      if (ww <= 400) {
        image.width *= 0.35 * fc;
      } else if (ww <= 550) {
        image.width *= 0.5 * fc;
      } else if (ww <= 768) {
        image.width *= 0.65 * fc;
      } else if (ww <= 1024) {
        image.width *= 0.75 * fc;
      } else {
        image.width *= 0.9 * fc;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}