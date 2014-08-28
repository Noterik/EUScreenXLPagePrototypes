$(document).ready(function () {
	
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.SearchResultsPage = function () {
        EUScreenXL.Page.apply(this, arguments);
        this.$navElement = jQuery('#navpanel');
        this.$sideBarElements = jQuery('#sidebar');
        this.$searchInputElement = jQuery('#searchkeyword');

        // nav panel
        this.$navElement.slidePanelJS({
	        openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });
        
        // only on tablet & desktop
        if(EUScreenXL.Page.prototype.device != "mobile") {
	       
	       // sticky sidebar
	       this.$sideBarElements.stickySidebarJS({
	        	followParent : '#results',
	        	device : EUScreenXL.Page.prototype.device,
	        	sidebarHeight : $(window).height() - $('.navbar').height(),
	        	bottom : 120,
	        	startClass : 'fix',
	        	endClass : 'fix-bottom'
	        }); 
        } else {
        
	        // hide headroom
	        $(".navbar").headroom();
        }
    };

    EUScreenXL.SearchResultsPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.SearchResultsPage.prototype.name = "search-results";
    EUScreenXL.SearchResultsPage.prototype.extraFilters = jQuery(".extra-option");
    EUScreenXL.SearchResultsPage.prototype.showExtraFiltersButton = jQuery("#show-extra-filters");
    EUScreenXL.SearchResultsPage.prototype.hideExtraFiltersButton = jQuery("#hide-extra-filters");
    EUScreenXL.SearchResultsPage.prototype.optionButton = jQuery("#optionbutton");
    EUScreenXL.SearchResultsPage.prototype.searchButton = jQuery("#searchbutton");
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
	        	this.$sideBarElements.removeClass("optionOpened"); // will hide the filters and media selector
        	} else {
	        	this.optionButton.addClass("active"); // toggle style
	        	this.$sideBarElements.addClass("optionOpened"); // will show the filters and media selector
        	}
        },
        "click #searchbutton": function(event) {
        	$(window).scrollTop(0);
	        this.$searchInputElement.focus(); // focus on the search field, instead of opening the searchbox on top
        }
    }

    new EUScreenXL.SearchResultsPage();
});
