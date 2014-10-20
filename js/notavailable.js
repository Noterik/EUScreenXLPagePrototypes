$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.NotAvailablePage = function () {
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

    EUScreenXL.NotAvailablePage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.NotAvailablePage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.NotAvailablePage.prototype.menuButton = jQuery("#menubutton");
    EUScreenXL.NotAvailablePage.prototype.name = "notavailable";
    EUScreenXL.NotAvailablePage.prototype.events = {
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

    new EUScreenXL.NotAvailablePage();
});
