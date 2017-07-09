const inAnimItems = {

	_: [],

	add( el, timeoutId, onCancelled ) {

		inAnimItems.remove( el );
		inAnimItems._.push( { el, timeoutId, onCancelled } );

	},

	remove( el ) {

		const index = inAnimItems.findIndex( el );

		if ( index === - 1 ) return;

		const inAnimItem = inAnimItems._[ index ];

		clearTimeout( inAnimItem.timeoutId );
		inAnimItem.onCancelled();
		inAnimItems._.splice( index, 1 );

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

	if ( inAnimItems.findIndex( el ) !== -1 ) return;

	const defaultStyle = el.getAttribute( 'style' ) || '';
	const style = window.getComputedStyle( el );
	const isBorderBox = /border-box/.test( style.getPropertyValue( 'box-sizing' ) );
	const paddingTop = + style.getPropertyValue( 'padding-top' ).replace( /px/, '' );
	const paddingBottom = + style.getPropertyValue( 'padding-bottom' ).replace( /px/, '' );
	const borderTop = + style.getPropertyValue( 'border-top-width' ).replace( /px/, '' );
	const borderBottom = + style.getPropertyValue( 'border-bottom-width' ).replace( /px/, '' );
	const contentHeight = getHiddenHeight( el );
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

		el.style.height            = 0;
		el.style.paddingTop        = 0;
		el.style.paddingBottom     = 0;
		el.style.borderTopWidth    = 0;
		el.style.borderBottomWidth = 0;
		el.style.display = 'block';
		el.style.overflow = 'hidden';
		el.style.visibility = 'hidden';
		el.style.transition = cssTransition;
		el.style.webkitTransition = cssTransition;

		requestAnimationFrame( () => {

			const height = ! isBorderBox ?
				contentHeight - paddingTop - paddingBottom :
				contentHeight + borderTop + borderBottom;

			el.style.height            = height        + 'px';
			el.style.paddingTop        = paddingTop    + 'px';
			el.style.paddingBottom     = paddingBottom + 'px';
			el.style.borderTopWidth    = borderTop     + 'px';
			el.style.borderBottomWidth = borderBottom  + 'px';
			el.style.visibility = 'visible';

		} );

	} );

	const timeoutId = setTimeout( () => {

		el.setAttribute( 'style', defaultStyle );
		el.style.display = 'block';
		inAnimItems.remove( el );
		onComplete();

	}, duration );

	inAnimItems.add( el, timeoutId, onCancelled );

}

export function slideUp( el, options ) {

	if ( inAnimItems.findIndex( el ) !== -1 ) return;

	const defaultStyle = el.getAttribute( 'style' ) || '';
	const style = window.getComputedStyle( el );
	const isBorderBox = /border-box/.test( style.getPropertyValue( 'box-sizing' ) );
	const paddingTop = + style.getPropertyValue( 'padding-top' ).replace( /px/, '' );
	const paddingBottom = + style.getPropertyValue('padding-bottom').replace( /px/, '' );
	const borderTop = + style.getPropertyValue( 'border-top-width' ).replace( /px/, '' );
	const borderBottom = + style.getPropertyValue('border-bottom-width').replace( /px/, '' );
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

		el.style.height            = height        + 'px';
		el.style.paddingTop        = paddingTop    + 'px';
		el.style.paddingBottom     = paddingBottom + 'px';
		el.style.borderTopWidth    = borderTop     + 'px';
		el.style.borderBottomWidth = borderBottom  + 'px';
		el.style.overflow = 'hidden';
		el.style.transition = cssTransition;
		el.style.webkitTransition = cssTransition;

		requestAnimationFrame( () => {

			el.style.height            = 0;
			el.style.paddingTop        = 0;
			el.style.paddingBottom     = 0;
			el.style.borderTopWidth    = 0;
			el.style.borderBottomWidth = 0;

		} );

	} );

	const timeoutId = setTimeout( () => {

		el.setAttribute( 'style', defaultStyle );
		el.style.display = 'none';
		inAnimItems.remove( el );
		onComplete();

	}, duration );

	inAnimItems.add( el, timeoutId, onCancelled );

}

function getHiddenHeight ( el ) {

	const defaultStyle = el.getAttribute( 'style' ) || '';

	el.style.position   = 'absolute';
	el.style.visibility = 'hidden';
	el.style.display    = 'block';

	const height = el.scrollHeight;

	el.setAttribute( 'style', defaultStyle );

	return height;

}
