$(document).ready(function () {

    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.ItemPage = function () {
        EUScreenXL.Page.apply(this, arguments);

        this.$loginElement = jQuery('.login-form');
        this.$bookmarksElement = jQuery('.bookmarks');
        this.$navbarElement = jQuery('.navbar-header');
        this.$logoElement = jQuery('.navbar-brand');
        this.$formElement = jQuery('#headerform');
        this.$navElement = jQuery('#navpanel');
        
        // nav panel
        this.$navElement.slidePanelJS({
	        openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });
    };
    EUScreenXL.ItemPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.ItemPage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.ItemPage.prototype.headerForm = jQuery("#headerform");
    EUScreenXL.ItemPage.prototype.events = {
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
	        	this.$navbarElement.removeClass('searchopened');
        	} else {
	        	this.searchButton.addClass("active"); // toggle style
	        	this.$navbarElement.addClass('searchopened');
	        	this.$formElement.find('input[type="text"]').focus();
        	}
        }
    };
    EUScreenXL.ItemPage.prototype.name = "item";

    new EUScreenXL.ItemPage();
});
