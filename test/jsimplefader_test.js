(function($) {

  module('jQuery#simplefader', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.simplefader(), this.elems, 'should be chainable');
  });

  module('jQuery.simplefader');

  test('is simplefader', function() {
    expect(2);
    strictEqual($.simplefader(), 'simplefader.', 'should be simplefader');
    strictEqual($.simplefader({punctuation: '!'}), 'simplefader!', 'should be thoroughly simplefader');
  });

}(jQuery));
