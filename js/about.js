$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.AboutPage = function () {
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

    EUScreenXL.AboutPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.AboutPage.prototype.name = "about";
    EUScreenXL.AboutPage.prototype.events = {
    }

    new EUScreenXL.AboutPage();
});
