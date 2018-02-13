let eCounterUp   = new Event('counterUp');
let eCounterDown = new Event('counterDown');
let firstStep    = 0;
let lastStep     = 0;

class ScrollBlock {
  constructor(params) {
    this.start = (firstStep === 0)?firstStep:firstStep - 1;
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

  eventHandler() {
    window.addEventListener('counterUp', () => {
      if(this.currentCounter > this.start) {
        this.decrementeCounter();
      }
    }, false);

    window.addEventListener('counterDown', () => {
      if(this.currentCounter < lastStep) {
        this.incrementeCounter();
      }
    }, false);
  }

  incrementeCounter() {
    ++this.currentCounter;
    this.checkStatus(true);
  }

  decrementeCounter() {
    --this.currentCounter;
    this.checkStatus(false);
  }

  checkStatus(direction) {
    this.setStatus(this.block.startPoint, direction);
    this.setStatus(this.block.endPoint, direction);
  }

  setStatus(point, direction) {
    if (point.counter === this.currentCounter && direction && !point.status) {
      point.status = true;
      this.blockItem.classList.add(point.className);
    } else if(point.counter === (this.currentCounter + 1) && point.status) {
      point.status = false;
      this.blockItem.classList.remove(point.className);
    }
  }
}

class ScrollWheel {
  constructor(initialBlock) {
    this.initialBlock = initialBlock;

    this.init();
  }

  init() {
    if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.initialBlock.addEventListener("wheel", (e) => {
        if(e.deltaY > 0) {
          window.dispatchEvent(eCounterDown);
        } else {
          window.dispatchEvent(eCounterUp);
        }
      });
    }
  }
}

class ButtonsNav {
  constructor(params) {
    this.upBtnClass   = params.upBtn;
    this.downBtnClass = params.downBtn;
    this.timeout      = params.btnHoverTimeout;
    this.interval     = null;

    this.init();
  }

  init() {
    let upBtn = document.getElementsByClassName(this.upBtnClass)[0];
    let downBtn = document.getElementsByClassName(this.downBtnClass)[0];

    if(upBtn && downBtn) {
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        upBtn.addEventListener('touchstart', () => {
          window.dispatchEvent(eCounterUp);
          this.frizeBtn(true, eCounterUp);
        });
        upBtn.addEventListener('touchend', () => {
          this.frizeBtn(false);
        });
        downBtn.addEventListener('touchstart', () => {
          window.dispatchEvent(eCounterDown);
          this.frizeBtn(true, eCounterDown);
        });
        downBtn.addEventListener('touchend', () => {
          this.frizeBtn(false);
        });
      } else {
        upBtn.addEventListener('mousedown', () => {
          window.dispatchEvent(eCounterUp);
          this.frizeBtn(true, eCounterUp);
        });
        upBtn.addEventListener('mouseup', () => {
          this.frizeBtn(false);
        });
        downBtn.addEventListener('mousedown', () => {
          window.dispatchEvent(eCounterDown);
          this.frizeBtn(true, eCounterDown);
        });
        downBtn.addEventListener('mouseup', () => {
          this.frizeBtn(false);
        });
      }
    }
  }

  frizeBtn(hold, e) {
    if(hold) {
      this.interval = setInterval(() => {
        window.dispatchEvent(e);
      }, this.timeout);
    } else {
      clearInterval(this.interval);
    }
  }
}

class ScrollLife {
  constructor(
    initClass       = 'sll-init',
    enableClass     = 'sll-enable',
    disableClass    = 'sll-disable',
    upBtn           = 'sll-btn-up',
    downBtn         = 'sll-btn-down',
    btnHoverTimeout = 1000
  ) {
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

  init() {
    let initialBlock = document.getElementById(this.initialClassName);
    this.setCounterLimits(initialBlock);
    this.setStartPoints(initialBlock, 0);
    new ButtonsNav(this.btnParams);
    new ScrollWheel(initialBlock);
  }

  setCounterLimits(initialBlock) {
    let scenes = [...initialBlock.children].filter(function(value) {
      return value.matches('[data-sll-start]');
    });

    if(scenes.length) {
      firstStep = parseInt(scenes[0].dataset.sllStart);
      let data = scenes[scenes.length - 1].dataset;
      lastStep = parseInt(data.sllStart) + parseInt(data.sllLife);
    }
  }

  setStartPoints(item, counter) {
    let blocks = item.children;
    if(blocks.length) {
      for (let block of blocks) {
        if(block.matches('[data-sll-start]')) {
          let data = block.dataset;
          let newCounter = parseInt(data.sllStart) + counter;
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
    }
  }
}

// Initialize main core ------------------
new ScrollLife();
// new ScrollLife({
//   initClass: 'sll-init',
//   enableClass: 'sll-enable',
//   disableClass: 'sll-disable',
//   upBtn: 'sll-btn-up',
//   downBtn: 'sll-btn-down',
//   btnHoverTimeout: 1000
// });