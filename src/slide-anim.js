const inAnimItems = {

	_: [],

	add( el, defaultStyle, timeoutId, onCancelled ) {

		inAnimItems.remove( el );
		inAnimItems._.push( { el, defaultStyle, timeoutId, onCancelled } );

	},

	remove( el ) {

		const index = inAnimItems.findIndex( el );

		if ( index === - 1 ) return;

		const inAnimItem = inAnimItems._[ index ];

		clearTimeout( inAnimItem.timeoutId );
		inAnimItem.onCancelled();
		inAnimItems._.splice( index, 1 );

	},

	find( el ) {

		return inAnimItems._[ inAnimItems.findIndex( el ) ];

	},

	findIndex( el ) {

		let index = - 1;

		inAnimItems._.some( ( item, i ) => {

			if ( item.el === el ) {

				index = i;
				return true;

			}

		} );

		return index;

	}

};

const CSS_EASEOUT_EXPO = 'cubic-bezier( 0.19, 1, 0.22, 1 )';

export function slideDown( el, options ) {

	if ( inAnimItems.findIndex( el ) !== - 1 ) return;

	const defaultStyle = el.getAttribute( 'style' ) || '';
	const style = window.getComputedStyle( el );
	const defaultStyles = getDefaultStyles( el );
	const isBorderBox = /border-box/.test( style.getPropertyValue( 'box-sizing' ) );

	const contentHeight = defaultStyles.height;
	const paddingTop = defaultStyles.paddingTop;
	const paddingBottom = defaultStyles.paddingBottom;
	const borderTop = defaultStyles.borderTop;
	const borderBottom = defaultStyles.borderBottom;

	const duration = options && options.duration || 400;
	const cssDuration = `${ duration }ms`;
	const cssEasing = CSS_EASEOUT_EXPO;
	const cssTransition = [
		`height ${ cssDuration } ${ cssEasing }`,
		`padding ${ cssDuration } ${ cssEasing }`,
		`border-width ${ cssDuration } ${ cssEasing }`
	].join();
	const onComplete  = options && options.onComplete  || function () {};
	const onCancelled = options && options.onCancelled || function () {};

	requestAnimationFrame( () => {

		el.style.height            = 0;
		el.style.paddingTop        = 0;
		el.style.paddingBottom     = 0;
		el.style.borderTopWidth    = 0;
		el.style.borderBottomWidth = 0;
		el.style.display           = 'block';
		el.style.overflow          = 'hidden';
		el.style.visibility        = 'hidden';
		el.style.transition        = cssTransition;
		el.style.webkitTransition  = cssTransition;

		requestAnimationFrame( () => {

			const height = ! isBorderBox ?
				contentHeight - paddingTop - paddingBottom :
				contentHeight + borderTop + borderBottom;

			el.style.height            = `${ height        }px`;
			el.style.paddingTop        = `${ paddingTop    }px`;
			el.style.paddingBottom     = `${ paddingBottom }px`;
			el.style.borderTopWidth    = `${ borderTop     }px`;
			el.style.borderBottomWidth = `${ borderBottom  }px`;
			el.style.visibility        = 'visible';

		} );

	} );

	const timeoutId = setTimeout( () => {

		// el.setAttribute( 'style', defaultStyle );
		resetStyle( el );
		el.style.display = 'block';
		inAnimItems.remove( el );
		onComplete();

	}, duration );

	inAnimItems.add( el, defaultStyle, timeoutId, onCancelled );

}

export function slideUp( el, options ) {

	if ( inAnimItems.findIndex( el ) !== - 1 ) return;

	const defaultStyle = el.getAttribute( 'style' ) || '';
	const style = window.getComputedStyle( el );
	const isBorderBox = /border-box/.test( style.getPropertyValue( 'box-sizing' ) );
	const paddingTop = + style.getPropertyValue( 'padding-top' ).replace( /px/, '' );
	const paddingBottom = + style.getPropertyValue( 'padding-bottom' ).replace( /px/, '' );
	const borderTop = + style.getPropertyValue( 'border-top-width' ).replace( /px/, '' );
	const borderBottom = + style.getPropertyValue( 'border-bottom-width' ).replace( /px/, '' );
	const contentHeight = el.scrollHeight;
	const duration = options && options.duration || 400;
	const cssDuration = duration + 'ms';
	const cssEasing = CSS_EASEOUT_EXPO;
	const cssTransition = [
		`height ${ cssDuration } ${ cssEasing }`,
		`padding ${ cssDuration } ${ cssEasing }`,
		`border-width ${ cssDuration } ${ cssEasing }`
	].join();
	const onComplete  = options && options.onComplete  || function () {};
	const onCancelled = options && options.onCancelled || function () {};

	requestAnimationFrame( () => {

		const height = ! isBorderBox ?
			contentHeight - paddingTop - paddingBottom :
			contentHeight + borderTop + borderBottom;

		el.style.height            = `${height        }px`;
		el.style.paddingTop        = `${paddingTop    }px`;
		el.style.paddingBottom     = `${paddingBottom }px`;
		el.style.borderTopWidth    = `${borderTop     }px`;
		el.style.borderBottomWidth = `${borderBottom  }px`;
		el.style.overflow          = 'hidden';
		el.style.transition        = cssTransition;
		el.style.webkitTransition  = cssTransition;

		requestAnimationFrame( () => {

			el.style.height            = 0;
			el.style.paddingTop        = 0;
			el.style.paddingBottom     = 0;
			el.style.borderTopWidth    = 0;
			el.style.borderBottomWidth = 0;

		} );

	} );

	const timeoutId = setTimeout( () => {

		// el.setAttribute( 'style', defaultStyle );
		resetStyle( el );
		el.style.display = 'none';
		inAnimItems.remove( el );
		onComplete();

	}, duration );

	inAnimItems.add( el, defaultStyle, timeoutId, onCancelled );

}

export function slideStop( el ) {

	const elementObject = inAnimItems.find( el );

	if ( ! elementObject ) return;

	const style = window.getComputedStyle( el );
	const height            = style.height;
	const paddingTop        = style.paddingTop;
	const paddingBottom     = style.paddingBottom;
	const borderTopWidth    = style.borderTopWidth;
	const borderBottomWidth = style.borderBottomWidth;

	resetStyle( el );
	el.style.height            = height;
	el.style.paddingTop        = paddingTop;
	el.style.paddingBottom     = paddingBottom;
	el.style.borderTopWidth    = borderTopWidth;
	el.style.borderBottomWidth = borderBottomWidth;
	el.style.overflow          = 'hidden';
	inAnimItems.remove( el );

}

function resetStyle( el ) {

	el.style.visibility        = null;
	el.style.height            = null;
	el.style.paddingTop        = null;
	el.style.paddingBottom     = null;
	el.style.borderTopWidth    = null;
	el.style.borderBottomWidth = null;
	el.style.overflow          = null;
	el.style.transition        = null;
	el.style.webkitTransition  = null;

}

function getDefaultStyles( el ) {

	const defaultStyle = el.getAttribute( 'style' ) || '';
	const style = window.getComputedStyle( el );

	el.style.visibility = 'hidden';
	el.style.display    = 'block';

	const width = + style.getPropertyValue( 'width' ).replace( /px/, '' );

	el.style.position = 'absolute';
	el.style.width    = `${ width }px`;
	el.style.height            = null;
	el.style.paddingTop        = null;
	el.style.paddingBottom     = null;
	el.style.borderTopWidth    = null;
	el.style.borderBottomWidth = null;

	const paddingTop = + style.getPropertyValue( 'padding-top' ).replace( /px/, '' );
	const paddingBottom = + style.getPropertyValue( 'padding-bottom' ).replace( /px/, '' );
	const borderTop = + style.getPropertyValue( 'border-top-width' ).replace( /px/, '' );
	const borderBottom = + style.getPropertyValue( 'border-bottom-width' ).replace( /px/, '' );
	const height = el.scrollHeight;

	el.setAttribute( 'style', defaultStyle );

	return {
		height,
		paddingTop,
		paddingBottom,
		borderTop,
		borderBottom
	};

}
