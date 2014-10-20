$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.ConfirmPage = function () {
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

    EUScreenXL.ConfirmPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.ConfirmPage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.ConfirmPage.prototype.menuButton = jQuery("#menubutton");
    EUScreenXL.ConfirmPage.prototype.name = "confirm";
    EUScreenXL.ConfirmPage.prototype.events = {
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

    new EUScreenXL.ConfirmPage();
});