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
        	settings.pageSection.animate({left:obj.width()}, settings.speed);
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
        	settings.pageSection.animate({left:0}, settings.speed);
        	settings.navbarSection.animate({left:0}, settings.speed, function(){ settings.pageSection.removeClass('slided'); });
        	
        	// reset scrolling
	        settings.body.css({'overflow-x':'auto'});
	        settings.html.css({'overflow-x':'auto'});
        };
        
        // init
        init();
        
	};
})(jQuery);