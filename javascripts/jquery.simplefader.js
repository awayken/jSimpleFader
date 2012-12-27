/*jshint browser: true, jquery: true*/

(function( $ ){
    "use strict";

    $.simplefader = function( el, numberOfImages, options ){
        var base = this,
            timer = 0,
            index = 0,
            images = [],
            parseData,
            imageUpdateFade,
            imageUpdateCrossFade,
            getNewRotatorImage,
            getNewRotatorLink,
            imageLoadFade = function() {
                $( this ).fadeIn( base.options.animationSpeed );
            },
            imageLoadCrossFade = function() {
                var jself = $( this ),
                    img = jself.prev();

                if ( img.length ) {
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
                }
            };
        
        base.$el = $( el );
        base.el = el;
        
        base.$el.data( "simplefader", base );

        parseData = function( url ) {
            var i = 0,
                separator = '/',
                reDigit = /\d/,
                urlAsArray = [],
                parts = {
                    directory: '',
                    fileName: '',
                    filePattern: 'image#num#.jpg'
                },
                linksLength = base.options.links.length;

            if ( url.indexOf( separator ) === -1 ) {
                separator = '\\';
            }

            urlAsArray = url.split( separator );
            parts.fileName = urlAsArray.pop();
            parts.filePattern = parts.fileName.replace( reDigit, '#num#' );
            parts.directory = urlAsArray.join( separator ) + separator;

            index = parseInt( parts.fileName.match( reDigit )[ 0 ], 10 ) - 1;

            for ( i = 1; i <= base.numberOfImages; i++ ) {
                images.push( parts.directory + parts.filePattern.replace( '#num#', i ) );
                if ( linksLength && linksLength < i ) {
                    base.options.links.push('#');
                }
            }
        };

        imageUpdateFade = function() {
            var img = base.$el.find('img:first-child');

            timer = window.setTimeout(function() {
                img.fadeOut( base.options.animationSpeed, function() {
                    img.attr( 'src', getNewRotatorImage() );
                    if ( base.imageLink.length ) {
                        base.imageLink.attr( 'href', getNewRotatorLink() );
                    }
                    img.load();
                    imageUpdateFade();
                });
            }, base.options.speed );
        };

        imageUpdateCrossFade = function() {
            var img = base.$el.find('img:first-child'),
                cacheBuster = new Date().getMilliseconds(),
                newImg = $('<img src="' + getNewRotatorImage() + '?v=' + cacheBuster + '">').css({
                    position: 'absolute',
                    visibility: 'hidden'
                }).bind('load', imageLoadCrossFade );

            timer = window.setTimeout(function() {
                if ( base.imageLink.length ) {
                    base.imageLink.attr( 'href', getNewRotatorLink() );
                }
                newImg.insertAfter( img ).load();
            }, base.options.speed );
        };

        getNewRotatorImage = function() {
            var newindex = 0;

            index = index + 1;
            
            if ( index >= base.numberOfImages ) {
                 index = 0;
            }
            
            newindex = String( index % base.numberOfImages );

            return images[ newindex ];
        };

        getNewRotatorLink = function() {
            var newindex = 0;
            
            newindex = String( index % base.numberOfImages );

            return base.options.links[ newindex ];
        };
        
        base.init = function() {
            var img = base.$el.find('img:first-child');

            if( typeof( numberOfImages ) === "undefined" || numberOfImages === null ) {
                numberOfImages = 1;
            }

            base.numberOfImages = numberOfImages;
            base.options = $.extend( {}, $.simplefader.defaultOptions, options );

            if ( base.options.links.length ) {
                base.imageLink = base.$el.find('a').has( img );
            } else {
                base.imageLink = '';
            }

            parseData( img.attr('src') );

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
        animationStyle: 'fade',
        links: []
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
