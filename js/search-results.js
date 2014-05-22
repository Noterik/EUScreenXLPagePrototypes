$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.SearchResultsPage = function () {
        EUScreenXL.Page.apply(this, arguments);

        this.extraFilters.hide(); //Bootstrap seems to override the display: none on mobile devices. Hide it again, by doing this.
    };

    EUScreenXL.SearchResultsPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.SearchResultsPage.prototype.name = "search-results";
    EUScreenXL.SearchResultsPage.prototype.extraFilters = jQuery(".extra-option");
    EUScreenXL.SearchResultsPage.prototype.showExtraFiltersButton = jQuery("#show-extra-filters");
    EUScreenXL.SearchResultsPage.prototype.hideExtraFiltersButton = jQuery("#hide-extra-filters");
    EUScreenXL.SearchResultsPage.prototype.events = {
        "click #show-extra-filters": function (event) {
            this.extraFilters.show();
            this.showExtraFiltersButton.hide();
            this.hideExtraFiltersButton.show();
        },
        "click #hide-extra-filters": function (event) {
            this.extraFilters.hide();
            this.hideExtraFiltersButton.hide();
            this.showExtraFiltersButton.show();
        }
    }

    new EUScreenXL.SearchResultsPage();
});
