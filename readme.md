# slide-anim

Light weight, stand alone, jQuery like slideExpand / slideCollapse

[![Latest NPM release](https://img.shields.io/npm/v/slide-anim.svg)](https://www.npmjs.com/package/slide-anim)
![MIT License](https://img.shields.io/npm/l/slide-anim.svg)

## demos

- [basic](https://yomotsu.github.io/slide-anim/examples/basic.html)
- [border-box](https://yomotsu.github.io/slide-anim/examples/border-box.html)
- [none-block-box](https://yomotsu.github.io/slide-anim/examples/none-block-box.html)
- [duration](https://yomotsu.github.io/slide-anim/examples/duration.html)
- [duration function](https://yomotsu.github.io/slide-anim/examples/speed.html)
- [callback](https://yomotsu.github.io/slide-anim/examples/callback.html)
- [end-height(experimental)](https://yomotsu.github.io/slide-anim/examples/end-height.html)

## Usage

```shell
$ npm install --save slide-anim
```

then

```javascript
import { slideExpand, slideCollapse, slideStop, isVisible } from 'slide-anim';

var element = document.getElementById( 'panel' );

function onSlideCollapseButtonClick () {
	slideStop( element );
	slideCollapse( element );
}

function onSlideExpandButtonClick () {
	slideStop( element );
	slideExpand( element );
}

function onSlideStopButtonClick () {
	slideStop( element );
}
```

### as a standalone JS lib

Copy slide-anim.js from /dist/slide-anim.js and place it in your project.

```html
<script src="./js/slide-anim.js"></script>
```

```javascript
var element = document.getElementById( 'panel' );

function onSlideCollapseButtonClick () {
	slideAnim.slideStop( element );
	slideAnim.slideCollapse( element );
}

function onSlideExpandButtonClick () {
	slideAnim.slideStop( element );
	slideAnim.slideExpand( element );
}
```

### Functions

- `slideCollapse( element )` : Slide up
- `slideExpand( element )` : Slide down
- `slideStop( element )` : Stop current slide animation. Useful to start another slide 
animation.
- `isVisible( element )` : return wheather the element is shown or `display: none`.

### Options

| param         | required |     |
| ------------- | -------- | --- |
| `duration`    | optional | animation duration in ms. default is `400` |
| `display`     | optional | default CSS display, such as `'flex'`. default is `'block'` |
| `autoClear`   | optional | whether to clear the element's `display` style attributes after animation. default is `false` |

e.g.
```javascript
slideCollapse( element, {
	duration: 800,
	display: 'flex'
} );
```

### Callbacks

`slideExpand` and `slideCollapse` return a Promise.

e.g
```javascript
slideCollapse( element ).then( function() {

	console.log( 'done!' );

} );
```
