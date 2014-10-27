/*
 * jSimpleFader
 * 
 *
 * Copyright (c) 2014 Miles Rausch
 * Licensed under the MIT license.
 */

(function ($) {

  // Collection method.
  $.fn.jsimplefader = function () {
    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('jsimplefader' + i);
    });
  };

  // Static method.
  $.jsimplefader = function (options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.jsimplefader.options, options);
    // Return the name of your plugin plus a punctuation character.
    return 'jsimplefader' + options.punctuation;
  };

  // Static method default options.
  $.jsimplefader.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].jsimplefader = function (elem) {
    // Does this element contain the name of your plugin?
    return $(elem).text().indexOf('jsimplefader') !== -1;
  };

}(jQuery));
