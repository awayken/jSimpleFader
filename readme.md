# jSimpleFader #

By [Miles Rausch](http://milesrausch.com)

jSimpleFader is a jQuery plugin to simply fade between images.

Read more in my blog post: http://www.milesrausch.com/2012/11/16/jsimplefader/

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="dist/jquery.simplefader.js"></script>
```

To use your fader, you simply call it on the element containing the image you want to rotate. That image doesn't have to be the only HTML in the element &ndash; the script will use the first image it finds. The only thing you need to provide is the total number of images you want to rotate through. The script assumes you've numbered your images like: "image1.jpg", "image2.jpg", "image3.jpg", &amp;c.

```html
<div id="fader1">
    <span><img src="images/fader1/1.jpg"></span>
</div>
<script>
    $('#fader1').simplefader( 4 );
</script>
```

The image you provide doesn't have to be the first image in your series, but you do need to have images starting at 1. It will start fading from the image you provide, working in order.

You can optionally pass in an options object. Here are the options you can set:

  * speed &ndash; the speed of rotation in ms (default: 5000)
  * animationSpeed &ndash; the speed of fading animation in ms (default: 600)
  * animationStyle &ndash; the style of animation: fade, crossfade (default: fade)
  * links &ndash; an array of hyperlinks

```html
<div id="fader2">
    <img src="images/fader2/image3.jpg">
</div>
<script>
    $('#fader2').simplefader( 4, { speed: 2500, animationSpeed: 300, animationStyle: 'crossfade' } );
</script>
```

You need hyperlinks on your images? Well, say no more! Use the `links` option to define a unique hyperlink for each image in your fader. If you don't list enough links, the plugin will use # instead.

```html
<div id="fader3">
    <a href="http://google.com" target="_blank"><span><img src="images/fader1/1.jpg"></span></a>
</div>
<script>
    $('#fader3').simplefader( 4, { links: [ 'http://google.com', 'http://apple.com', 'http://microsoft.com' ] } );
</script>
```

Browse the `demo/index.html` file to see it in action or browse the [Github Page](http://awayken.github.com/jSimpleFader/).
