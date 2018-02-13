readme!!! The JS library which can create chain animations
## How to use
### Install
```
npm install scroll-life --save
```
##### Add lib to your code. Default initialization
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
