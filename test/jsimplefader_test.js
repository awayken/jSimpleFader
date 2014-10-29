(function( $ ) {

  module('jQuery#simplefader', {
    setup: function() {
      this.fader1 = $('#fader1').simplefader( 4 );
    }
  });

  test('can attach', function() {
    expect( 1 );

    equal( this.fader1.length, 1 );
  });

  test('can get itself', function() {
    expect( 1 );

    equal( $('#fader1').getsimplefader().$el[ 0 ], this.fader1[ 0 ] );
  });




  module('jQuery#simplefader with speed options', {
    setup: function() {
      var fader2 = $('#fader2');

      this.fader2image = fader2.find('img');
      this.fader2 = fader2.simplefader( 4, { speed: 2500, animationSpeed: 300, animationStyle: 'crossfade' } );
    }
  });

  test('can attach', function() {
    expect( 1 );

    equal( this.fader2.length, 1 );
  });

  asyncTest('can rotate between images', function() {
    var self = this;

    expect( 1 );

    setTimeout(function() {
      var newImage = self.fader2.find('img').attr('src'),
        originalImage = self.fader2image.attr('src');

      notEqual( originalImage, newImage );

      start();
    }, 2900 );
  });




  module('jQuery#simplefader with link options', {
    setup: function() {
      var fader3 = $('#fader3');

      this.fader3link = 'http://google.com';
      this.fader3 = fader3.simplefader( 4, { links: [ 'http://google.com', 'http://apple.com', 'http://microsoft.com' ] } );
    }
  });

  test('can attach', function() {
    expect( 1 );

    equal( this.fader3.length, 1 );
  });

  asyncTest('can rotate between images', function() {
    var self = this;

    expect( 1 );

    setTimeout(function() {
      var newLink = self.fader3.find('a').attr('href'),
        originalLink = self.fader3link;

      //console.log( originalLink, newLink );

      notEqual( originalLink, newLink );

      start();
    }, 5800 );
  });

}( jQuery ));
