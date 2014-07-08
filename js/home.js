$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.HomePage = function () {
        EUScreenXL.Page.apply(this, arguments);
        this.$navElement = jQuery('#navpanel');
        this.$navbarElement = jQuery('.navbar-header');
        this.$formElement = jQuery('#headerform');
        this.$overlayButtons = jQuery('button[data-overlay]');

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
            this.$overlayButtons.tooltip();
        }
    };

    EUScreenXL.HomePage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.HomePage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.HomePage.prototype.menuButton = jQuery("#menubutton");
    EUScreenXL.HomePage.prototype.name = "home";
    EUScreenXL.HomePage.prototype.events = {

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

    new EUScreenXL.HomePage();
});
