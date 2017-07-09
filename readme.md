# slide-anim

light weight, stand alone, jQuery like slideDown / slideUp

[![Latest NPM release](https://img.shields.io/npm/v/slide-anim.svg)](https://www.npmjs.com/package/slide-anim)
![MIT License](https://img.shields.io/npm/l/slide-anim.svg)

## demos

- [basic](https://yomotsu.github.io/slide-anim/examples/basic.html)
- [border-box](https://yomotsu.github.io/slide-anim/examples/border-box.html)
- [duration](https://yomotsu.github.io/slide-anim/examples/duration.html)
- [callback](https://yomotsu.github.io/slide-anim/examples/callback.html)

## Usage

### as Standalone lib

Copy slide-anim.js from /dist/slide-anim.js and place it in your project.

```
<script src="./js/slide-anim.js"></script>
```

```javascript
var element = document.getElementById( 'panel' );

function onSlideUpButtonClick () {
	slideAnim.slideUp( element );
}

function onSlideDownButtonClick () {
	slideAnim.slideDown( element );
}
```

### with NPM

```
$ npm install --save slide-anim
```

then

```
import { slideDown, slideUp } from 'slide-anim';

var element = document.getElementById( 'panel' );

function onSlideUpButtonClick () {
	slideUp( element );
}

function onSlideDownButtonClick () {
	slideDown( element );
}
```

### Options

| param         | required |     |
| ------------- | -------- | --- |
| `duration`    | optional | animation duration in ms. default is `600` |
| `onComplete`  | optional | function that is called when the ended |
