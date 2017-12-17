# slide-anim

Light weight, stand alone, jQuery like slideDown / slideUp

[![Latest NPM release](https://img.shields.io/npm/v/slide-anim.svg)](https://www.npmjs.com/package/slide-anim)
![MIT License](https://img.shields.io/npm/l/slide-anim.svg)

## demos

- [basic](https://yomotsu.github.io/slide-anim/examples/basic.html)
- [border-box](https://yomotsu.github.io/slide-anim/examples/border-box.html)
- [duration](https://yomotsu.github.io/slide-anim/examples/duration.html)
- [callback](https://yomotsu.github.io/slide-anim/examples/callback.html)

## Usage

### as a standalone lib

Copy slide-anim.js from /dist/slide-anim.js and place it in your project.

```html
<script src="./js/slide-anim.js"></script>
```

```javascript
var element = document.getElementById( 'panel' );

function onSlideUpButtonClick () {
	slideAnim.slideStop( element );
	slideAnim.slideUp( element );
}

function onSlideDownButtonClick () {
	slideAnim.slideStop( element );
	slideAnim.slideDown( element );
}
```

### with NPM

```
$ npm install --save slide-anim
```

then

```javascript
import { slideDown, slideUp, slideStop } from 'slide-anim';

var element = document.getElementById( 'panel' );

function onSlideUpButtonClick () {
	slideStop( element );
	slideUp( element );
}

function onSlideDownButtonClick () {
	slideStop( element );
	slideDown( element );
}

function onSlideStopButtonClick () {
	slideStop( element );
}
```

### Functions

- `slideUp( element )`  : slide up
- `slideDown( element )` : slide down
- `slideStop( element )` : Stop previous slide animation.

### Options

| param         | required |     |
| ------------- | -------- | --- |
| `duration`    | optional | animation duration in ms. default is `600` |
| `onComplete`  | optional | function that is called when the ended |

e.g.
```javascript
slideUp( element, {
	duration: 800,
	onComplete() {
		console.log( 'done!' );
	}
);
```
