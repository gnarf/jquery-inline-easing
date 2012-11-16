/*global sinon, window*/
(function( $ ) {
	/*
		======== A Handy Little QUnit Reference ========
		http://docs.jquery.com/QUnit

		Test methods:
			expect(numAssertions)
			stop(increment)
			start(decrement)
		Test assertions:
			ok(value, [message])
			equal(actual, expected, [message])
			notEqual(actual, expected, [message])
			deepEqual(actual, expected, [message])
			notDeepEqual(actual, expected, [message])
			strictEqual(actual, expected, [message])
			notStrictEqual(actual, expected, [message])
			raises(block, [expected], [message])
	*/

module( "inline-easing", {
	setup: function() {
		jQuery.fx.interval = 10;
		this.clock = sinon.useFakeTimers();
	},
	teardown: function() {
		this.clock.restore();
	}
});

test( "Standard easing still works", function() {
	expect( 4 );
	jQuery({
		test: 0
	}).animate({
		test: 30
	}, {
		easing: "linear",
		duration: 30,
		progress: function( animation, p ) {
			equal( p * 30, this.test );
		}
	});
	this.clock.tick( 30 );
});

test( "Replaces an easing defined as a function", function() {
	expect( 7 );

	function myEase( p ) {
		return 1 - p;
	}
	var anim = jQuery.Animation({
		test: 0,
		test2: 0
	}, {
		test: 1,
		test2: 1
	}, {
		easing: myEase,
		duration: 30
	});
	var easing = anim.opts.easing;
	equal( jQuery.type( easing ), "string", "Easing is a string" );
	equal( jQuery.easing[ easing ], myEase, "The function in the strings place for easing is correct");
	equal( anim.elem.test, 1 );
	this.clock.tick( 10 );
	// within 1/1000
	equal( ~~(anim.elem.test*100000), ~~((1-(10/30))*100000) );
	this.clock.tick( 10 );
	// within 1/1000
	equal( ~~(anim.elem.test*100000), ~~((1-(20/30))*100000) );
	this.clock.tick( 10 );
	equal( anim.elem.test, 0 );
	equal( jQuery.easing[ easing ], undefined, "Removed when done" );
});

test( "Replaces Special Easing", function() {
	expect( 6 );
	function ease1() {}
	function ease2() {}
	var anim = jQuery.Animation({
		test1: 0,
		test2: 0
	}, {
		test1: [1, ease1],
		test2: [1, ease2]
	}, {
		duration: 10
	});
	var easing1 = anim.opts.specialEasing.test1;
	equal( jQuery.type( easing1 ), "string", "Easing is a string" );
	equal( jQuery.easing[ easing1 ], ease1, "The function in the strings place for easing is correct");
	var easing2 = anim.opts.specialEasing.test2;
	equal( jQuery.type( easing2 ), "string", "Easing is a string" );
	equal( jQuery.easing[ easing2 ], ease2, "The function in the strings place for easing is correct");
	this.clock.tick( 10 );
	equal( jQuery.easing[ easing1 ], undefined, "cleaned up");
	equal( jQuery.easing[ easing2 ], undefined, "cleaned up");
});

}(jQuery));
