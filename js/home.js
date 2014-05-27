$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.HomePage = function () {
        EUScreenXL.Page.apply(this, arguments);
    };

    EUScreenXL.HomePage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.HomePage.prototype.name = "home";
    EUScreenXL.HomePage.prototype.events = {
    }

    new EUScreenXL.HomePage();
});
