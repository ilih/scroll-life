readme!!! The JS library which can create chain animations
## Demo page
[scroll-life](http://www.scroll-life.artygeek.net/)

## How to use
### Installation
* NPM
```
npm install scroll-life --save
```
* HTML
```html
<div id="sll-init">
  <div data-sll-start="1" data-sll-life="5">
    <div data-sll-start="0" data-sll-life="1">...</div>
    <div data-sll-start="1" data-sll-life="2">...</div>
    <div data-sll-start="3">...</div>
  </div>
</div>
```
* JavaScript
##### Default initialization
```javascript
let ScrollLife = require('scroll-life');

new ScrollLife();
```

##### Custom initialization
```javascript
new ScrollLife({
 initClass: 'sll-init',
 enableClass: 'sll-enable',
 disableClass: 'sll-disable',
 upBtn: 'sll-btn-up',
 downBtn: 'sll-btn-down',
 btnHoverTimeout: 1000
});
```
* CSS
```scss
.animated-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background: red;

  //added on data-sll-start = main counter
  &.sll-enable {
    left: 100px;
  }
  //added on data-sll-start + data-sll-life = main counter
  &.sll-disable {
    left: 200px;
  }
}
```
