$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.ItemPage = function () {
        EUScreenXL.Page.apply(this, arguments);

        this.$loginElement = jQuery('.login-form');
        this.$bookmarksElement = jQuery('.bookmarks');
    };
    EUScreenXL.ItemPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.ItemPage.prototype.events = {
        'click button.more-info': function () {
            console.log("MORE INFO BUTTON CLICKED!");
        },
        'click form.login input[type="submit"]': function (event, element) {
            event.preventDefault();
            this.$loginElement.removeClass('visible');
            this.$bookmarksElement.addClass('visible');
        }
    };

    new EUScreenXL.ItemPage();
});
