/*! jQuery Inline Easing - v0.1.0 - 2013-01-16
* https://github.com/gnarf37/jquery-inline-easing
* Copyright (c) 2013 Corey Frang; Licensed MIT */

(function( jQuery ) {

var uuid = 0;
var inlineEasingUUID = "inlineEasingUUID";

jQuery.Animation.prefilter(function( element, properties, options ) {
	var prop;
	var replaced = [];
	var easing = options.specialEasing;

	function mapFn( value ) {
		var stringName;
		if ( jQuery.type( value ) === 'function' ) {
			stringName =
				inlineEasingUUID + ( uuid++ );
			jQuery.easing[ stringName ] = value;
			replaced.push( stringName );
		}
		return stringName || value;
	}

	for( prop in easing ) {
		easing[ prop ] = mapFn( easing[ prop ] );
	}
	options.easing = mapFn( options.easing );

	if ( replaced.length ) {
		this.always(function() {
			for ( prop = 0; prop < replaced.length; prop++ ) {
				delete jQuery.easing[ replaced[ prop ] ];
			}
		});
	}
});


}( jQuery ));
