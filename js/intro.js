$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.IntroPage = function () {
        EUScreenXL.Page.apply(this, arguments);        
        this.$navElement = jQuery('#navpanel');
        this.$navbarElement = jQuery('.navbar-header');
        this.$formElement = jQuery('#headerform');
        this.$overlayContents = jQuery('.overlaycontent');
        this.$overlayButtons = jQuery('button[data-overlay]');
        var obj = this;

        // nav panel
        this.$navElement.slidePanelJS({
            openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });
    };

    EUScreenXL.IntroPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.IntroPage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.IntroPage.prototype.menuButton = jQuery("#menubutton");
    EUScreenXL.IntroPage.prototype.signupButton = jQuery("#signup-button");
    EUScreenXL.IntroPage.prototype.signinButton = jQuery("#signin-button");
    EUScreenXL.IntroPage.prototype.name = "intro";
    EUScreenXL.IntroPage.prototype.events = {
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
        'click #signup-button': function(event) {
        	var btn = this.signupButton;
		    btn.button('loading');
        },
        'click #signin-button': function(event) {
        	var btn = this.signinButton;
		    btn.button('loading');
        }
    }

    new EUScreenXL.IntroPage();
});
