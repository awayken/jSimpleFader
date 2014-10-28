/*
 * jSimpleFader
 *
 *
 * Copyright (c) 2014 Miles Rausch
 * Licensed under the MIT license.
 */

(function ($) {

  var pluginName = 'simplefader';

  // Collection method.
  $.fn[ pluginName ] = function () {
    return this.each(function () {
      // Do something to each selected element.
      $(this).data( pluginName, 'true' );
    });
  };

  // Static method.
  $[ pluginName ] = function ( options ) {
    // Override default options with passed-in options.
    options = $.extend({}, $[ pluginName ].options, options);

    // Return the name of your plugin plus a punctuation character.
    return pluginName + options.punctuation;
  };

  // Static method default options.
  $[ pluginName ].options = {
    punctuation: '.'
  };

}(jQuery));
