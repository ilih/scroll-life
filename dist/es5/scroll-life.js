'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// (function() {
//   ScrollLife = function() {
var eCounterUp = new Event('counterUp');
var eCounterDown = new Event('counterDown');
var firstStep = 0;
var lastStep = 0;

var ScrollBlock = function () {
  function ScrollBlock(params) {
    _classCallCheck(this, ScrollBlock);

    this.start = firstStep === 0 ? firstStep : firstStep - 1;
    this.currentCounter = this.start;
    this.blockItem = params.block;
    this.block = {
      startPoint: {
        counter: parseInt(params.start),
        status: false,
        className: params.liveClasses.enableClass
      },
      endPoint: {
        counter: parseInt(params.start) + parseInt(params.life),
        status: false,
        className: params.liveClasses.disableClass
      }
    };

    this.eventHandler();
  }

  _createClass(ScrollBlock, [{
    key: 'eventHandler',
    value: function eventHandler() {
      var _this = this;

      window.addEventListener('counterUp', function () {
        if (_this.currentCounter > _this.start) {
          _this.decrementeCounter();
        }
      }, false);

      window.addEventListener('counterDown', function () {
        if (_this.currentCounter < lastStep) {
          _this.incrementeCounter();
        }
      }, false);
    }
  }, {
    key: 'incrementeCounter',
    value: function incrementeCounter() {
      ++this.currentCounter;
      this.checkStatus(true);
    }
  }, {
    key: 'decrementeCounter',
    value: function decrementeCounter() {
      --this.currentCounter;
      this.checkStatus(false);
    }
  }, {
    key: 'checkStatus',
    value: function checkStatus(direction) {
      this.setStatus(this.block.startPoint, direction);
      this.setStatus(this.block.endPoint, direction);
    }
  }, {
    key: 'setStatus',
    value: function setStatus(point, direction) {
      if (point.counter === this.currentCounter && direction && !point.status) {
        point.status = true;
        this.blockItem.classList.add(point.className);
      } else if (point.counter === this.currentCounter + 1 && point.status) {
        point.status = false;
        this.blockItem.classList.remove(point.className);
      }
    }
  }]);

  return ScrollBlock;
}();

var ScrollWheel = function () {
  function ScrollWheel(initialBlock) {
    _classCallCheck(this, ScrollWheel);

    this.initialBlock = initialBlock;

    this.init();
  }

  _createClass(ScrollWheel, [{
    key: 'init',
    value: function init() {
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.initialBlock.addEventListener("wheel", function (e) {
          if (e.deltaY > 0) {
            window.dispatchEvent(eCounterDown);
          } else {
            window.dispatchEvent(eCounterUp);
          }
        });
      }
    }
  }]);

  return ScrollWheel;
}();

var ButtonsNav = function () {
  function ButtonsNav(params) {
    _classCallCheck(this, ButtonsNav);

    this.upBtnClass = params.upBtn;
    this.downBtnClass = params.downBtn;
    this.timeout = params.btnHoverTimeout;
    this.interval = null;

    this.init();
  }

  _createClass(ButtonsNav, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var upBtn = document.getElementsByClassName(this.upBtnClass)[0];
      var downBtn = document.getElementsByClassName(this.downBtnClass)[0];

      if (upBtn && downBtn) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          upBtn.addEventListener('touchstart', function () {
            window.dispatchEvent(eCounterUp);
            _this2.frizeBtn(true, eCounterUp);
          });
          upBtn.addEventListener('touchend', function () {
            _this2.frizeBtn(false);
          });
          downBtn.addEventListener('touchstart', function () {
            window.dispatchEvent(eCounterDown);
            _this2.frizeBtn(true, eCounterDown);
          });
          downBtn.addEventListener('touchend', function () {
            _this2.frizeBtn(false);
          });
        } else {
          upBtn.addEventListener('mousedown', function () {
            window.dispatchEvent(eCounterUp);
            _this2.frizeBtn(true, eCounterUp);
          });
          upBtn.addEventListener('mouseup', function () {
            _this2.frizeBtn(false);
          });
          downBtn.addEventListener('mousedown', function () {
            window.dispatchEvent(eCounterDown);
            _this2.frizeBtn(true, eCounterDown);
          });
          downBtn.addEventListener('mouseup', function () {
            _this2.frizeBtn(false);
          });
        }
      }
    }
  }, {
    key: 'frizeBtn',
    value: function frizeBtn(hold, e) {
      if (hold) {
        this.interval = setInterval(function () {
          window.dispatchEvent(e);
        }, this.timeout);
      } else {
        clearInterval(this.interval);
      }
    }
  }]);

  return ButtonsNav;
}();

var ScrollLife = exports.ScrollLife = function () {
  function ScrollLife() {
    var initClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'sll-init';
    var enableClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'sll-enable';
    var disableClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'sll-disable';
    var upBtn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'sll-btn-up';
    var downBtn = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'sll-btn-down';
    var btnHoverTimeout = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1000;

    _classCallCheck(this, ScrollLife);

    this.initialClassName = initClass;
    this.btnParams = {
      upBtn: upBtn,
      downBtn: downBtn,
      btnHoverTimeout: btnHoverTimeout
    };
    this.liveClasses = {
      enableClass: enableClass,
      disableClass: disableClass
    };

    this.init();
  }

  _createClass(ScrollLife, [{
    key: 'init',
    value: function init() {
      var initialBlock = document.getElementById(this.initialClassName);
      this.setCounterLimits(initialBlock);
      this.setStartPoints(initialBlock, 0);
      new ButtonsNav(this.btnParams);
      new ScrollWheel(initialBlock);
    }
  }, {
    key: 'setCounterLimits',
    value: function setCounterLimits(initialBlock) {
      var scenes = [].concat(_toConsumableArray(initialBlock.children)).filter(function (value) {
        return value.matches('[data-sll-start]');
      });

      if (scenes.length) {
        firstStep = parseInt(scenes[0].dataset.sllStart);
        var data = scenes[scenes.length - 1].dataset;
        lastStep = parseInt(data.sllStart) + parseInt(data.sllLife);
      }
    }
  }, {
    key: 'setStartPoints',
    value: function setStartPoints(item, counter) {
      var blocks = item.children;
      if (blocks.length) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var block = _step.value;

            if (block.matches('[data-sll-start]')) {
              var data = block.dataset;
              var newCounter = parseInt(data.sllStart) + counter;
              data.sllStart = newCounter;
              this.setStartPoints(block, newCounter);

              new ScrollBlock({
                start: data.sllStart,
                life: data.sllLife,
                block: block,
                liveClasses: this.liveClasses
              });
            } else {
              this.setStartPoints(block, counter);
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
    }
  }]);

  return ScrollLife;
}();

//   module.exports.ScrollLife = ScrollLife;
// })()


// Initialize main core ------------------

// new ScrollLife();

// new ScrollLife({
//   initClass: 'sll-init',
//   enableClass: 'sll-enable',
//   disableClass: 'sll-disable',
//   upBtn: 'sll-btn-up',
//   downBtn: 'sll-btn-down',
//   btnHoverTimeout: 1000
// });