/*jslint devel: false, browser: true, white: true */
/*global jQuery: true */
(function( $ ){
    "use strict";

    $.simplefader = function( el, numberOfImages, options ){
        var base = this,
            timer = 0,
            index = 0,
            images = [],
            parseImages,
            imageUpdateFade,
            imageUpdateCrossFade,
            getNewRotatorImage,
            imageLoadFade = function() {
                $( this ).fadeIn( base.options.animationSpeed );
            },
            imageLoadCrossFade = function() {
                var jself = $( this ),
                    img = jself.prev();

                jself.css({
                    position: 'static',
                    visibility: 'inherit'
                });

                img.css({
                    position: 'absolute',
                    zIndex: 10
                }).fadeOut( base.options.animationSpeed, function() {
                    img.remove();
                    imageUpdateCrossFade();
                });
            };
        
        base.$el = $( el );
        base.el = el;
        
        base.$el.data( "simplefader", base );

        parseImages = function( url ) {
            var i = 0,
                separator = '/',
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

            for ( i = 1; i <= numberOfImages; i++ ) {
                images.push( parts.directory + parts.filePattern.replace( '#num#', i ) );
            }
        };

        imageUpdateFade = function() {
            var img = base.$el.find('img[src="' + images[ index ] +'"]');

            timer = window.setTimeout(function() {
                img.fadeOut( base.options.animationSpeed, function() {
                    img.attr( 'src', getNewRotatorImage() );
                    img.load();
                    imageUpdateFade();
                });
            }, base.options.speed );
        };

        imageUpdateCrossFade = function() {
            var img = base.$el.find('img[src="' + images[ index ] +'"]'),
                newImg = $('<img src="' + getNewRotatorImage() + '">').css({
                    position: 'absolute',
                    visibility: 'hidden'
                }).bind('load', imageLoadCrossFade );

            timer = window.setTimeout(function() {
                newImg.insertAfter( img ).load();
            }, base.options.speed );
        };

        getNewRotatorImage = function() {
            var newindex = 0;

            index = index + 1;
            
            if ( index >= numberOfImages ) {
                 index = 0;
            }
            
            newindex = String( index % numberOfImages );

            return images[ newindex ];
        };
        
        base.init = function() {
            var img = base.$el.find('img:first-child');

            if( typeof( numberOfImages ) === "undefined" || numberOfImages === null ) {
                numberOfImages = 1;
            }

            base.numberOfImages = numberOfImages;
            base.options = $.extend( {}, $.simplefader.defaultOptions, options );

            parseImages( img.attr('src') );

            switch( base.options.animationStyle.toLowerCase() ) {
                case 'crossfade':
                    img.bind( 'load', imageLoadCrossFade );
                    imageUpdateCrossFade();
                    break;

                case 'fade':
                    img.bind( 'load', imageLoadFade );
                    imageUpdateFade();
                    break;
                    
                default:
                    img.bind( 'load', imageLoadFade );
                    imageUpdateFade();
            }
        };
        
        base.init();
    };
    
    $.simplefader.defaultOptions = {
        speed: 5000,
        animationSpeed: 600,
        animationStyle: 'fade'
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
