$(document).ready(function () {
	
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.SearchResultsPage = function () {
        EUScreenXL.Page.apply(this, arguments);
        this.$navElement = jQuery('#navpanel');
        
        // nav panel
        this.$navElement.slidePanelJS({
	        openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });
    };

    EUScreenXL.SearchResultsPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.SearchResultsPage.prototype.name = "search-results";
    EUScreenXL.SearchResultsPage.prototype.extraFilters = jQuery(".extra-option");
    EUScreenXL.SearchResultsPage.prototype.showExtraFiltersButton = jQuery("#show-extra-filters");
    EUScreenXL.SearchResultsPage.prototype.hideExtraFiltersButton = jQuery("#hide-extra-filters");
    EUScreenXL.SearchResultsPage.prototype.optionButton = jQuery("#optionbutton");
    EUScreenXL.SearchResultsPage.prototype.filtersSection = jQuery(".filters");
    EUScreenXL.SearchResultsPage.prototype.mediaSelector = jQuery(".mediaselector");
    EUScreenXL.SearchResultsPage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.SearchResultsPage.prototype.searchInputText = jQuery("#searchkeyword");
    EUScreenXL.SearchResultsPage.prototype.events = {
        "click #show-extra-filters": function (event) {
            this.showExtraFiltersButton.hide();
            this.hideExtraFiltersButton.show();
        },
        "click #hide-extra-filters": function (event) {
            this.hideExtraFiltersButton.hide();
            this.showExtraFiltersButton.show();
        },
        "show.bs.collapse .filtercontent": function(event) {
        	$("#"+event.currentTarget.id).parent().find("i").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        },
        "hide.bs.collapse .filtercontent": function(event) {
	    	$("#"+event.currentTarget.id).parent().find("i").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        },
        "click #optionbutton": function(event) {
        	if(this.optionButton.hasClass("active")) {
	        	this.optionButton.removeClass("active"); // toggle style
	        	this.filtersSection.removeClass('mobile'); // hide the filter
	        	this.mediaSelector.removeClass('mobile'); // hide the media selector
        	} else {
	        	this.optionButton.addClass("active"); // toggle style
	        	this.filtersSection.addClass('mobile'); // show the filter
	        	this.mediaSelector.addClass('mobile'); // show the media selector
        	}
        },
        "click #searchbutton": function(event) {
	        this.searchInputText.focus(); // focus on the search field
        }
    }

    new EUScreenXL.SearchResultsPage();
});
