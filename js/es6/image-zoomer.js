let w  = document.querySelector('#sl-init .cut-wrapper > .container');
let ww = w.clientWidth;
let wh = w.clientHeight;

if(ww < 1280 || wh < 1000) {
  let images = document.querySelectorAll('#sl-init img');
  let hc     = wh / ww;
  let fc     = 0;

  if (hc < 0.5) {
    fc = 0.5;
  } else if (hc < 0.6) {
    fc = 0.65;
  } else if (hc < 0.7) {
    fc = 0.75;
  } else {
    fc = 1;
  }

  for(let image of images) {
    if(ww <= 400) {
      image.width *= 0.35*fc;
    } else if(ww <= 550) {
      image.width *= 0.5*fc;
    } else if(ww <= 768) {
      image.width *= 0.65*fc;
    } else if(ww <= 1024) {
      image.width *= 0.75*fc;
    } else {
      image.width *= 0.9*fc;
    }
  }
}


