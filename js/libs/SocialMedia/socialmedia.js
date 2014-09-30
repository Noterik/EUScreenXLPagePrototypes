(function($) {
	
    $.fn.SocialSharing = function(customSettings) {
        var settings = $.extend({
            type:  'twitter',
            url: 'http://beta.euscreenxl.eu/item.html?id=EUS_7E0602627F8844AC9FFFDA2E96374804',
            text : 'Take a look at this item on EUscreen'             
        }, customSettings || {});
        
        // attach event
        this.click(function(){
	        switch(settings.type) {
		        case "twitter":
		        	shareTwitter();
		        	break;
		        case "facebook":
		        	shareFacebook();
		        	break;
		        case "google":
		        	shareGoogle();
		        	break;
	        }
        });
        
        // setFloatingHeight
        var shareTwitter = function(){
	        var width  = 575,
		        height = 400,
		        uri = encodeURIComponent(settings.url),
		        text = encodeURIComponent(settings.text),
		        hashtag = encodeURIComponent('#nohashtag'),
		        left   = ($(window).width()  - width)  / 2,
		        top    = ($(window).height() - height) / 2,
		        url    = 'http://twitter.com/share?text='+text+'&url='+uri,
		        opts   = 'status=1' +
		                 ',width='  + width  +
		                 ',height=' + height +
		                 ',top='    + top    +
		                 ',left='   + left;
		    
		    window.open(url, 'twitter', opts);
		    return false;
        }
        
         // setFloatingHeight
        var shareFacebook = function(){
	        var width  = 575,
		        height = 400,
		        uri = encodeURIComponent(settings.url),
		        text = encodeURIComponent(settings.text),
		        left   = ($(window).width()  - width)  / 2,
		        top    = ($(window).height() - height) / 2,
		        url    = 'https://www.facebook.com/sharer/sharer.php?'+
		        		 'p[url]='+uri,
		        opts   = 'status=1' +
		                 ',width='  + width  +
		                 ',height=' + height +
		                 ',top='    + top    +
		                 ',left='   + left;
		    
		    window.open(url, 'facebook', opts);
		    return false;
        }
        
         // share to google
        var shareGoogle = function(){
	        var width  = 575,
		        height = 400,
		        uri = encodeURIComponent(settings.url),
		        text = encodeURIComponent(settings.text),
		        left   = ($(window).width()  - width)  / 2,
		        top    = ($(window).height() - height) / 2,
		        url    = 'https://plus.google.com/share?url='+uri,
		        opts   = 'status=1' +
		                 ',width='  + width  +
		                 ',height=' + height +
		                 ',top='    + top    +
		                 ',left='   + left;
		    
		    window.open(url, 'google', opts);
		    return false;
        }
    };
})(jQuery);