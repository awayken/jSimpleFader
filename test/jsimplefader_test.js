(function($) {

  module('jQuery#simplefader', {
    // This will run before each test in this module.
    setup: function() {
      this.fader1 = $('#fader1').simplefader( 4 );
      this.fader2 = $('#fader2').simplefader( 4, { speed: 2500, animationSpeed: 300, animationStyle: 'crossfade' } );
      this.fader3 = $('#fader3').simplefader( 4, { links: [ 'http://google.com', 'http://apple.com', 'http://microsoft.com' ] } );
    }
  });

  test('can attach', function() {
    expect(3);
    equal( this.fader1.length, 1 );
    equal( this.fader2.length, 1 );
    equal( this.fader3.length, 1 );
  });

}(jQuery));
