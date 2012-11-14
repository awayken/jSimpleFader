/*jslint devel: false, browser: false, white: true */
/*global $: true, jQuery: true */
(function( $ ){
    $.simplefader = function( el, numberOfImages, options ){
        var base = this,
            timer = 0,
            index = 0,
            imageUpdate = '',
            imageLoad = function() {
                $( this ).fadeIn();
            };
        
        base.$el = $( el );
        base.el = el;
        
        base.$el.data( "simplefader", base );
        
        base.init = function(){
            var img = base.$el.find('img:first-child');
            
            img.bind( 'load', imageLoad );

            if( typeof( numberOfImages ) === "undefined" || numberOfImages === null ) numberOfImages = 1;
            
            base.numberOfImages = numberOfImages;
            
            base.options = $.extend( {},$.simplefader.defaultOptions, options );

            imageUpdate();
        };

        imageUpdate = function() {
            var newRotatorImage = '',
                img = base.$el.find('img:first-child');

            timer = window.setTimeout(function() {
                index = index + 1;
                
                if ( index >= numberOfImages ) {
                     index = 0;
                } else if ( index < 0) {
                     index = numberOfImages - 1;
                }
                
                newRotatorImage = '/lib/images/slideshow'  + String( index % numberOfImages + 1 ) + '.jpg';

                img.fadeOut( base.options.animationSpeed, function() {
                    img.attr( 'src', newRotatorImage );
                    img.load();
                });
                
                imageUpdate();

            }, base.options.speed );
        };
        
        base.init();
    };
    
    $.simplefader.defaultOptions = {
        speed: 5000,
        animationSpeed: 300
    };
    
    $.fn.simplefader = function(numberOfImages, options){
        return this.each(function(){
            (new $.simplefader(this, numberOfImages, options));
        });
    };
    
    $.fn.getsimplefader = function(){
        this.data("simplefader");
    };
    
})( jQuery );
