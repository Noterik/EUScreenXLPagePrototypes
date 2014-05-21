$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.SearchResultsPage = function () {
        EUScreenXL.Page.apply(this, arguments);
    };

    EUScreenXL.SearchResultsPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.SearchResultsPage.prototype.name = "search-results";

    new EUScreenXL.SearchResultsPage();
});
