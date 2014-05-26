$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.AboutPage = function () {
        EUScreenXL.Page.apply(this, arguments);
    };

    EUScreenXL.AboutPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.AboutPage.prototype.name = "about";
    EUScreenXL.AboutPage.prototype.events = {
    }

    new EUScreenXL.AboutPage();
});
