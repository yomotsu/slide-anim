/*!
 * slide-anim
 * https://github.com/yomotsu/slide-anim
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
var inAnimItems = {

	_: [],

	add: function add(el, defaultStyle, timeoutId, onCancelled) {

		inAnimItems.remove(el);
		inAnimItems._.push({ el: el, defaultStyle: defaultStyle, timeoutId: timeoutId, onCancelled: onCancelled });
	},
	remove: function remove(el) {

		var index = inAnimItems.findIndex(el);

		if (index === -1) return;

		var inAnimItem = inAnimItems._[index];

		clearTimeout(inAnimItem.timeoutId);
		inAnimItem.onCancelled();
		inAnimItems._.splice(index, 1);
	},
	find: function find(el) {

		return inAnimItems._[inAnimItems.findIndex(el)];
	},
	findIndex: function findIndex(el) {

		var index = -1;

		inAnimItems._.some(function (item, i) {

			if (item.el === el) {

				index = i;
				return true;
			}
		});

		return index;
	}
};

var CSS_EASEOUT_EXPO = 'cubic-bezier( 0.19, 1, 0.22, 1 )';

function slideDown(el, options) {

	if (inAnimItems.findIndex(el) !== -1) return;

	var defaultStyle = el.getAttribute('style') || '';
	var style = window.getComputedStyle(el);
	var defaultStyles = getDefaultStyles(el);
	var isBorderBox = /border-box/.test(style.getPropertyValue('box-sizing'));

	var contentHeight = defaultStyles.height;
	var paddingTop = defaultStyles.paddingTop;
	var paddingBottom = defaultStyles.paddingBottom;
	var borderTop = defaultStyles.borderTop;
	var borderBottom = defaultStyles.borderBottom;

	var duration = options && options.duration || 400;
	var cssDuration = duration + 'ms';
	var cssEasing = CSS_EASEOUT_EXPO;
	var cssTransition = ['height ' + cssDuration + ' ' + cssEasing, 'padding ' + cssDuration + ' ' + cssEasing, 'border-width ' + cssDuration + ' ' + cssEasing].join();
	var onComplete = options && options.onComplete || function () {};
	var onCancelled = options && options.onCancelled || function () {};

	requestAnimationFrame(function () {

		el.style.height = 0;
		el.style.paddingTop = 0;
		el.style.paddingBottom = 0;
		el.style.borderTopWidth = 0;
		el.style.borderBottomWidth = 0;
		el.style.display = 'block';
		el.style.overflow = 'hidden';
		el.style.visibility = 'hidden';
		el.style.transition = cssTransition;
		el.style.webkitTransition = cssTransition;

		requestAnimationFrame(function () {

			var height = !isBorderBox ? contentHeight - paddingTop - paddingBottom : contentHeight + borderTop + borderBottom;

			el.style.height = height + 'px';
			el.style.paddingTop = paddingTop + 'px';
			el.style.paddingBottom = paddingBottom + 'px';
			el.style.borderTopWidth = borderTop + 'px';
			el.style.borderBottomWidth = borderBottom + 'px';
			el.style.visibility = 'visible';
		});
	});

	var timeoutId = setTimeout(function () {

		// el.setAttribute( 'style', defaultStyle );
		resetStyle(el);
		el.style.display = 'block';
		inAnimItems.remove(el);
		onComplete();
	}, duration);

	inAnimItems.add(el, defaultStyle, timeoutId, onCancelled);
}

function slideUp(el, options) {

	if (inAnimItems.findIndex(el) !== -1) return;

	var defaultStyle = el.getAttribute('style') || '';
	var style = window.getComputedStyle(el);
	var isBorderBox = /border-box/.test(style.getPropertyValue('box-sizing'));
	var paddingTop = +style.getPropertyValue('padding-top').replace(/px/, '');
	var paddingBottom = +style.getPropertyValue('padding-bottom').replace(/px/, '');
	var borderTop = +style.getPropertyValue('border-top-width').replace(/px/, '');
	var borderBottom = +style.getPropertyValue('border-bottom-width').replace(/px/, '');
	var contentHeight = el.scrollHeight;
	var duration = options && options.duration || 400;
	var cssDuration = duration + 'ms';
	var cssEasing = CSS_EASEOUT_EXPO;
	var cssTransition = ['height ' + cssDuration + ' ' + cssEasing, 'padding ' + cssDuration + ' ' + cssEasing, 'border-width ' + cssDuration + ' ' + cssEasing].join();
	var onComplete = options && options.onComplete || function () {};
	var onCancelled = options && options.onCancelled || function () {};

	requestAnimationFrame(function () {

		var height = !isBorderBox ? contentHeight - paddingTop - paddingBottom : contentHeight + borderTop + borderBottom;

		el.style.height = height + 'px';
		el.style.paddingTop = paddingTop + 'px';
		el.style.paddingBottom = paddingBottom + 'px';
		el.style.borderTopWidth = borderTop + 'px';
		el.style.borderBottomWidth = borderBottom + 'px';
		el.style.overflow = 'hidden';
		el.style.transition = cssTransition;
		el.style.webkitTransition = cssTransition;

		requestAnimationFrame(function () {

			el.style.height = 0;
			el.style.paddingTop = 0;
			el.style.paddingBottom = 0;
			el.style.borderTopWidth = 0;
			el.style.borderBottomWidth = 0;
		});
	});

	var timeoutId = setTimeout(function () {

		// el.setAttribute( 'style', defaultStyle );
		resetStyle(el);
		el.style.display = 'none';
		inAnimItems.remove(el);
		onComplete();
	}, duration);

	inAnimItems.add(el, defaultStyle, timeoutId, onCancelled);
}

function slideStop(el) {

	var elementObject = inAnimItems.find(el);

	if (!elementObject) return;

	var defaultStyle = elementObject.defaultStyle;
	var style = window.getComputedStyle(el);
	var height = style.height;
	var paddingTop = style.paddingTop;
	var paddingBottom = style.paddingBottom;
	var borderTopWidth = style.borderTopWidth;
	var borderBottomWidth = style.borderBottomWidth;

	// el.setAttribute( 'style', defaultStyle );
	resetStyle(el);
	el.style.height = height;
	el.style.paddingTop = paddingTop;
	el.style.paddingBottom = paddingBottom;
	el.style.borderTopWidth = borderTopWidth;
	el.style.borderBottomWidth = borderBottomWidth;
	el.style.overflow = 'hidden';
	inAnimItems.remove(el);
}

function resetStyle(el) {

	el.style.visibility = null;
	el.style.height = null;
	el.style.paddingTop = null;
	el.style.paddingBottom = null;
	el.style.borderTopWidth = null;
	el.style.borderBottomWidth = null;
	el.style.overflow = null;
	el.style.transition = null;
	el.style.webkitTransition = null;
}

function getDefaultStyles(el) {

	var defaultStyle = el.getAttribute('style') || '';

	el.style.position = 'absolute';
	el.style.visibility = 'hidden';
	el.style.display = 'block';
	el.style.height = null;
	el.style.paddingTop = null;
	el.style.paddingBottom = null;
	el.style.borderTopWidth = null;
	el.style.borderBottomWidth = null;

	var style = window.getComputedStyle(el);
	var paddingTop = +style.getPropertyValue('padding-top').replace(/px/, '');
	var paddingBottom = +style.getPropertyValue('padding-bottom').replace(/px/, '');
	var borderTop = +style.getPropertyValue('border-top-width').replace(/px/, '');
	var borderBottom = +style.getPropertyValue('border-bottom-width').replace(/px/, '');
	var height = el.scrollHeight;

	el.setAttribute('style', defaultStyle);

	return {
		height: height,
		paddingTop: paddingTop,
		paddingBottom: paddingBottom,
		borderTop: borderTop,
		borderBottom: borderBottom
	};
}

export { slideDown, slideUp, slideStop };
