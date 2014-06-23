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
        
        // nav panel
        this.$navElement.slidePanelJS({
	        openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });
        
        // tooltip
        $('.media-action a').tooltip();
    };
    EUScreenXL.ItemPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.ItemPage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.ItemPage.prototype.showExtraFiltersButton = jQuery("#show-extra-filters");
    EUScreenXL.ItemPage.prototype.hideExtraFiltersButton = jQuery("#hide-extra-filters");
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
        	} else {
	        	this.searchButton.addClass("active"); // toggle style
	        	this.$navbarElement.addClass('searchOpened');
	        	this.$formElement.find('input[type="text"]').focus();
        	}
        }
    };
    EUScreenXL.ItemPage.prototype.name = "item";

    new EUScreenXL.ItemPage();
});
