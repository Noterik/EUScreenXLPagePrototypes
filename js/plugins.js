// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/*
    slidePanelJS
*/
(function($) {
	$.fn.slidePanelJS = function(customSettings) {
		var settings = $.extend({
            openButton: 	'#openButton' ,
            pageSection:	'#pageSection',
            navbarSection:	'#navbarSection',
            speed:		   	200                
        }, customSettings || {});
        
        // vars 
        settings.openButton = $(settings.openButton);
        settings.body = $('body');
        settings.html = $('html');
        settings.pageSection = $(settings.pageSection);
        settings.navbarSection = $(settings.navbarSection);
        var obj = this;
        
        // events
        settings.openButton.click(function(event){
            event.preventDefault();
        });
        
        // init
        var init = function() {
        	settings.openButton.click(function(){
	            if (obj.hasClass('open')) {
	                slideIn();
	            } else {
		            slideOut();
	            }
            });
        };
        
        // functions
        var slideOut = function() {
        	
        	// set style
        	obj.addClass("open");
        	settings.openButton.addClass("active");
        	settings.pageSection.addClass('slided');
        	
        	// animate
        	obj.animate({left:0}, settings.speed);
        	settings.pageSection.animate({marginLeft:obj.width()}, settings.speed);
        	settings.navbarSection.css({width:'100%'}).animate({left:obj.width()}, settings.speed);
        	
        	// hide scrolling
	        settings.body.css({'overflow-x':'hidden'});
	        settings.html.css({'overflow-x':'hidden'});
        };
        
        var slideIn = function() {
        
        	// set style
        	obj.removeClass("open");
        	settings.openButton.removeClass("active");
        	
        	// animate
        	obj.animate({left:'-'+obj.width()}, settings.speed);
        	settings.pageSection.animate({marginLeft:0}, settings.speed);
        	settings.navbarSection.animate({left:0}, settings.speed, function(){ settings.pageSection.removeClass('slided'); });
        	
        	// reset scrolling
	        settings.body.css({'overflow-x':'auto'});
	        settings.html.css({'overflow-x':'auto'});
        };
        
        // init
        init();
        
	};
})(jQuery);

/*
    stickySidebarJS
*/
(function($) {
	$.fn.stickySidebarJS = function(customSettings) {
		
		// settings
		var settings = $.extend({
            followParent : '#main',
        	device : 'desktop',
        	sidebarHeight : 400,
        	bottom : 0,
        	startClass : 'fix',
        	endClass : 'fix-bottom'             
        }, customSettings || {});
        var obj = this;
        
        // init
        var init = function() {
        	
        	// add class
        	addDefaultClass();
        	
        	// set height on desktop & mobile
        	setFloatingHeight();
        };
        
        
        // add default class
        var addDefaultClass = function(){
	        obj.addClass(settings.startClass);
        	$(settings.followParent).addClass(settings.startClass);
        };
        
        // setFloatingHeight
        var setFloatingHeight = function(){
	        if(settings.device != 'mobile') {
		        obj.css('height',settings.sidebarHeight+"px");
	        }
        }
        
        // scroll
        $(window).bind("scroll", function() {
        	if($(this).scrollTop() + $(this).height() > $(document).height() - settings.bottom) {
		    	if(!obj.hasClass('fix-bottom')) {
		    		obj.addClass('fix-bottom');
		    	}
		    } else {
		    	if(obj.hasClass('fix-bottom')) {
				    obj.removeClass('fix-bottom');
		    	}
		    }
        });
        
        // init
        init();
	};
})(jQuery);

/*
    popupOverlayJS
*/
(function($) {
    $.fn.popupOverlayJS = function(customSettings) {
        var settings = $.extend({
            $overlayContents:  '.contentOverlay',
            contentOverlayIdAttr: 'data-overlay'             
        }, customSettings || {});
        
        // var
        var overlayButton = this;
        overlayButton.each(function () {
            var $this = jQuery(this);
            var content = $this.attr(settings.contentOverlayIdAttr);
            $this.click(function(e){
                e.preventDefault();
                self = this;
                if($(content).is(":visible")) { 
                    $(content).hide(); $(self).removeClass('active');
                } else { 
                    $(content).show(); $(self).addClass('active');
                    overlayButton.not(self).removeClass('active');
                    settings.$overlayContents.not($(content)).hide();
                }
            });
        });
    };
})(jQuery);


/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a,b){"use strict";function c(a){this.callback=a,this.ticking=!1}function d(b){return b&&"undefined"!=typeof a&&(b===a||b.nodeType)}function e(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var b,c,f=a||{};for(c=1;c<arguments.length;c++){var g=arguments[c]||{};for(b in g)f[b]="object"!=typeof f[b]||d(f[b])?f[b]||g[b]:e(f[b],g[b])}return f}function f(a){return a===Object(a)?a:{down:a,up:a}}function g(a,b){b=e(b,g.options),this.lastKnownScrollY=0,this.elem=a,this.debouncer=new c(this.update.bind(this)),this.tolerance=f(b.tolerance),this.classes=b.classes,this.offset=b.offset,this.scroller=b.scroller,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop}var h={bind:!!function(){}.bind,classList:"classList"in b.documentElement,rAF:!!(a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame)};a.requestAnimationFrame=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame,c.prototype={constructor:c,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},g.prototype={constructor:g,init:function(){return g.cutsTheMustard?(this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var a=this.classes;this.initialised=!1,this.elem.classList.remove(a.unpinned,a.pinned,a.top,a.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;(a.contains(b.pinned)||!a.contains(b.unpinned))&&(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(b.documentElement||b.body.parentNode||b.body).scrollTop},getViewportHeight:function(){return a.innerHeight||b.documentElement.clientHeight||b.body.clientHeight},getDocumentHeight:function(){var a=b.body,c=b.documentElement;return Math.max(a.scrollHeight,c.scrollHeight,a.offsetHeight,c.offsetHeight,a.clientHeight,c.clientHeight)},getElementHeight:function(a){return Math.max(a.scrollHeight,a.offsetHeight,a.clientHeight)},getScrollerHeight:function(){return this.scroller===a||this.scroller===b.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(a){var b=0>a,c=a+this.getViewportHeight()>this.getScrollerHeight();return b||c},toleranceExceeded:function(a,b){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance[b]},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=a>this.lastKnownScrollY?"down":"up",c=this.toleranceExceeded(a,b);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),this.shouldUnpin(a,c)?this.unpin():this.shouldPin(a,c)&&this.pin(),this.lastKnownScrollY=a)}},g.options={tolerance:{up:0,down:0},offset:0,scroller:a,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",initial:"headroom"}},g.cutsTheMustard="undefined"!=typeof h&&h.rAF&&h.bind&&h.classList,a.Headroom=g}(window,document);

!function(o){o&&(o.fn.headroom=function(t){return this.each(function(){var a=o(this),e=a.data("headroom"),n="object"==typeof t&&t;n=o.extend(!0,{},Headroom.options,n),e||(e=new Headroom(this,n),e.init(),a.data("headroom",e)),"string"==typeof t&&e[t]()})},o("[data-headroom]").each(function(){var t=o(this);t.headroom(t.data())}))}(window.Zepto||window.jQuery);

