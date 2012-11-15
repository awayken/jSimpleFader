/*jslint devel: false, browser: true, white: true */
/*global $: true, jQuery: true */
(function( $ ){
    "use strict";

    $.simplefader = function( el, numberOfImages, options ){
        var base = this,
            timer = 0,
            index = 0,
            imagePathParts = {},
            parse = '',
            imageUpdate = '',
            imageLoad = function() {
                $( this ).fadeIn( base.options.animationSpeed );
            };
        
        base.$el = $( el );
        base.el = el;
        
        base.$el.data( "simplefader", base );

        parse = function( url ) {
            var separator = '/',
                reDigit = /\d/,
                urlAsArray = [],
                parts = {
                    directory: '',
                    fileName: '',
                    filePattern: 'image#num#.jpg'
                };

            if ( url.indexOf( separator ) === -1 ) {
                separator = '\\';
            }

            urlAsArray = url.split( separator );
            parts.fileName = urlAsArray.pop();
            parts.filePattern = parts.fileName.replace( reDigit, '#num#' );
            parts.directory = urlAsArray.join( separator ) + separator;

            index = parseInt( parts.fileName.match( reDigit )[ 0 ], 10 ) - 1;

            return parts;
        };

        imageUpdate = function() {
            var newRotatorImage = '',
                img = base.$el.find('img:first-child');

            timer = window.setTimeout(function() {
                var newindex = 0;

                index = index + 1;
                
                if ( index >= numberOfImages ) {
                     index = 0;
                } else if ( index < 0) {
                     index = numberOfImages - 1;
                }
                
                newindex = String( index % numberOfImages + 1 );

                newRotatorImage = imagePathParts.directory + imagePathParts.filePattern.replace( '#num#', newindex );

                img.fadeOut( base.options.animationSpeed, function() {
                    img.attr( 'src', newRotatorImage );
                    img.load();
                });
                
                imageUpdate();

            }, base.options.speed );
        };
        
        base.init = function() {
            var img = base.$el.find('img:first-child');

            imagePathParts = parse( img.attr('src') );

            if( typeof( numberOfImages ) === "undefined" || numberOfImages === null ) {
                numberOfImages = 1;
            }

            base.numberOfImages = numberOfImages;
            base.options = $.extend( {}, $.simplefader.defaultOptions, options );

            img.bind( 'load', imageLoad );

            imageUpdate();
        };
        
        base.init();
    };
    
    $.simplefader.defaultOptions = {
        speed: 5000,
        animationSpeed: 600
    };
    
    $.fn.simplefader = function(numberOfImages, options){
        return this.each(function(){
            ( new $.simplefader(this, numberOfImages, options) );
        });
    };
    
    $.fn.getsimplefader = function(){
        this.data("simplefader");
    };
    
}( jQuery ));
