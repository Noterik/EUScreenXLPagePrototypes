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
        
        // nav panel
        this.$navElement.slidePanelJS({
	        openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });

        // popover & tooltip
        // bootstrap popover doesn't play too nicely with mobile version
        // and it doesnt fit with euscreenxl the mobile designs
        var overlayButton = this.$overlayButtons,
            overlayContents = this.$overlayContents;
        overlayButton.each(function () {
            var $this = jQuery(this);
            var content = $this.attr("data-overlay");
            $this.click(function(e){
                e.preventDefault();
                self = this;
                if($this.hasClass('active')) { 
                    $(content).hide(); $this.removeClass('active');
                } else { 
                    $(content).show(); $this.addClass('active');
                    overlayButton.not(self).removeClass('active');
                    overlayContents.not($(content)).hide();
                }
            });
        });
    };
    EUScreenXL.ItemPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.ItemPage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.ItemPage.prototype.showExtraFiltersButton = jQuery("#show-extra-filters");
    EUScreenXL.ItemPage.prototype.hideExtraFiltersButton = jQuery("#hide-extra-filters");
    EUScreenXL.ItemPage.prototype.menuButton = jQuery("#menubutton");
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
        }
    };
    EUScreenXL.ItemPage.prototype.name = "item";

    new EUScreenXL.ItemPage();
});
