$(document).ready(function () {

    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.ItemPage = function () {
        EUScreenXL.Page.apply(this, arguments);

        this.$loginElement = jQuery('.login-form');
        this.$bookmarksElement = jQuery('.bookmarks');
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
    EUScreenXL.ItemPage.prototype.name = "item";

    new EUScreenXL.ItemPage();
});
