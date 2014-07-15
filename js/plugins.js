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
		var settings = $.extend({
            parentElement:	'#parentDiv'             
        }, customSettings || {});
        
        // vars 
        settings.parentElement = $(settings.parentElement);
        obj = this;
        
        // do
        var leftOffset = obj.offset().top,
        	rightOffset = settings.parentElement.offset().top,
        	leftHeight  = obj.height(),
        	rightHeight  = settings.parentElement.height(),
        	rightBottomPosition = rightOffset + rightHeight;
        
        $(window).bind("scroll", function() {
        	var offset = $(this).scrollTop(),
        		leftPosition = offset + leftOffset;
        	if((leftPosition + leftHeight) <= rightBottomPosition) {
	        	obj.css({'margin-top':offset+'px'});
        	}
        });
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