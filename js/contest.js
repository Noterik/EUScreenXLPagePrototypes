$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.ContestPage = function () {
        EUScreenXL.Page.apply(this, arguments);        
        this.$navElement = jQuery('#navpanel');
        this.$navbarElement = jQuery('.navbar-header');
        this.$formElement = jQuery('#headerform');

        // sharing buttons
        this.$twitterButton = jQuery('#button-twitter');
        this.$facebookButton = jQuery('#button-facebook');
        this.$googleButton = jQuery('#button-google');

        var obj = this;

        // nav panel
        this.$navElement.slidePanelJS({
            openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });

        // social buttons
        this.$twitterButton.SocialSharing({ type : 'twitter', url : document.location, text : 'Join EUscreen Video Contest' });
        this.$facebookButton.SocialSharing({ type : 'facebook', url : document.location, text : 'Join EUscreen Video Contest' });
        this.$googleButton.SocialSharing({ type : 'google', url : document.location, text : 'Join EUscreen Video Contest' });
    };

    EUScreenXL.ContestPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.ContestPage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.ContestPage.prototype.menuButton = jQuery("#menubutton");
    EUScreenXL.ContestPage.prototype.name = "contest";
    EUScreenXL.ContestPage.prototype.events = {
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
        }
    }

    new EUScreenXL.ContestPage();
});
