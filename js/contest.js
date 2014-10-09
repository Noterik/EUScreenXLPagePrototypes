$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.ContestPage = function () {
        EUScreenXL.Page.apply(this, arguments);        
        this.$navElement = jQuery('#navpanel');
        this.$navbarElement = jQuery('.navbar-header');
        this.$formElement = jQuery('#headerform');
        var obj = this;

        // nav panel
        this.$navElement.slidePanelJS({
            openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });
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
