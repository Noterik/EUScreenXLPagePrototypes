$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.MYEUscreenPage = function () {
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

        // only on tablet & desktop
        if(EUScreenXL.Page.prototype.device == "mobile") {
           
            // hide headroom
            $(".navbar").headroom();
        }
    };

    EUScreenXL.MYEUscreenPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.MYEUscreenPage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.MYEUscreenPage.prototype.menuButton = jQuery("#menubutton");
    EUScreenXL.MYEUscreenPage.prototype.name = "myeuscreen";
    EUScreenXL.MYEUscreenPage.prototype.events = {
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

    new EUScreenXL.MYEUscreenPage();
});
