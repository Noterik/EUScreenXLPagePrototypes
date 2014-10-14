$(document).ready(function () {

    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.ItemPage = function () {
        EUScreenXL.Page.apply(this, arguments);
        this.$navElement = jQuery('#navpanel');
        this.$loginElement = jQuery('.login-form');
        this.$bookmarksElement = jQuery('.bookmarks');
        this.$navbarElement = jQuery('.navbar-header');
        this.$formElement = jQuery('#headerform');
        this.$popElement = jQuery('#media-action');
        this.$overlayContents = jQuery('.overlaycontent');
        this.$overlayButtons = jQuery('button[data-overlay]');
        this.$tooltipButtons = jQuery('button[data-toggle]');
        
        // sharing buttons
        this.$twitterButton = jQuery('#button-twitter');
        this.$facebookButton = jQuery('#button-facebook');
        this.$googleButton = jQuery('#button-google');

        // terms ofuse
        this.$termsOfUseElement = jQuery('#terms-of-use');
        this.$contactProviderElement = jQuery('#contact-provider');
        
        // nav panel
        this.$navElement.slidePanelJS({
	        openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });

        // only activates tooltip on desktop
        // otherwise it takes two tap to view overlay content
        if(EUScreenXL.Page.prototype.device == "desktop") {
            // activate tooltip
           this.$tooltipButtons.tooltip();
        }

        // popover overlay
        // bootstrap popover doesn't play too nicely with mobile version
        // and it doesnt fit with euscreenxl the mobile designs
        this.$overlayButtons.popupOverlayJS({
            $overlayContents : this.$overlayContents,
            contentOverlayIdAttr : 'data-overlay'
        });

        // image player
        if($('.image-player').length != 0) {
            $('.image-player a').click(function (e) {
                $('#image-modal #image-modal-src').attr('src', $(this).attr('data-img-url'));
                $('#image-modal #image-modal-nav').attr('href', $(this).attr('data-img-url'));
            });
        }
        
        // audio player
        if($('.audio-player').length != 0) {
        	
        	// initialize jplayer
            $("#jquery_jplayer_1").jPlayer({
				ready: function () {
					$(this).jPlayer("setMedia", {
						mp3: "http://localhost:8888/ink.mp3"
					});
				},
				supplied: "mp3"
			});
        }
        
        // social buttons
        this.$twitterButton.SocialSharing({ type : 'twitter', url : document.location, text : $('#media-title').html() });
        this.$facebookButton.SocialSharing({ type : 'facebook', url : document.location, text : $('#media-title').html() });
        this.$googleButton.SocialSharing({ type : 'google', url : document.location, text : $('#media-title').html() });
    };
    EUScreenXL.ItemPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.ItemPage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.ItemPage.prototype.showExtraFiltersButton = jQuery("#show-extra-filters");
    EUScreenXL.ItemPage.prototype.hideExtraFiltersButton = jQuery("#hide-extra-filters");
    EUScreenXL.ItemPage.prototype.menuButton = jQuery("#menubutton");
    EUScreenXL.ItemPage.prototype.contactButton = jQuery("#contact-button");
    EUScreenXL.ItemPage.prototype.termsButton = jQuery("#terms-button");
    EUScreenXL.ItemPage.prototype.submitContactButton = jQuery("#btn-submit-contact");
    EUScreenXL.ItemPage.prototype.events = {
    	"click #show-extra-filters": function (event) {
            this.showExtraFiltersButton.hide();
            this.hideExtraFiltersButton.show();
        },
        "click #hide-extra-filters": function (event) {
            this.hideExtraFiltersButton.hide();
            this.showExtraFiltersButton.show();
        },
        'click button.more-info': function () {
            console.log("MORE INFO BUTTON CLICKED!");
        },
        'click form.login input[type="submit"]': function (event, element) {
            event.preventDefault();
            this.$loginElement.removeClass('visible');
            this.$bookmarksElement.addClass('visible');
        },
        'click #searchbutton': function(event) {
	        if(this.searchButton.hasClass("active")) {
	        	this.searchButton.removeClass("active"); // toggle style
	        	this.$navbarElement.removeClass('searchOpened');
	        	this.menuButton.show();
        	} else {
	        	this.searchButton.addClass("active"); // toggle style
	        	this.$navbarElement.addClass('searchOpened');
	        	this.$formElement.find('input[type="text"]').focus();
	        	this.menuButton.hide();
        	}
        },
        'click #contact-button': function(event) {
            this.$termsOfUseElement.hide();
            this.$contactProviderElement.show();
        },
        'click #terms-button': function(event) {
            this.$contactProviderElement.hide();
            this.$termsOfUseElement.show();
        },
        'click #btn-submit-contact': function(event) {
        	var btn = this.submitContactButton;
		    btn.button('loading');
		    
        }
    };
    EUScreenXL.ItemPage.prototype.name = "item";

    new EUScreenXL.ItemPage();
});
