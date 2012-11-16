/*! Inline Easing - v0.0.0 - 2012-11-16
* https://github.com/gnarf37/jquery-inline-easing
* Copyright (c) 2012 Corey Frang; Licensed MIT */
(function( jQuery ) {

var uuid = 0;
var inlineEasingUUID = "inlineEasingUUID";

jQuery.Animation.prefilter(function( element, properties, options ) {
	var prop, value, stringName;
	var replaced = [];
	var easing = options.specialEasing;
	for( prop in easing ) {
		value = easing[ prop ];
		if ( jQuery.type( value ) === 'function' ) {
			stringName =
				easing[ prop ] =
				inlineEasingUUID + ( uuid++ );
			jQuery.easing[ stringName ] = value;
			replaced.push( stringName );
		}
	}
	if ( replaced.length ) {
		this.always(function() {
			for ( prop = 0; prop < replaced.length; prop++ ) {
				delete jQuery.easing[ prop ];
			}
		});
	}
});


}( jQuery ));
