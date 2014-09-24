$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.HomePage = function () {
        EUScreenXL.Page.apply(this, arguments);
        this.$bodyElement = jQuery('body');
        this.$containerElement = jQuery('.main');
        this.$navElement = jQuery('#navpanel');
        this.$navbarElement = jQuery('.navbar-header');
        this.$formElement = jQuery('#headerform');
        this.$overlayButtons = jQuery('button[data-overlay]');
        this.$tooltipButtons = jQuery('button[data-toggle]');
        this.$modalButtons = jQuery('.modal-button');
        this.$overlayContents = jQuery('.overlaycontent');
        this.$collectionViewerElements = jQuery('#collection-viewer-container');
        this.$modalPlayerElements = jQuery('#player-modal');
        this.$mediaItemLinkElements = jQuery('.media-item a');

        // var
        var obj = this;

        // nav panel
        this.$navElement.slidePanelJS({
            openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });

        // device specific initiation
        if(EUScreenXL.Page.prototype.device == "desktop") {

            // only activates tooltip on desktop
            // otherwise it takes two tap to view overlay content
            this.$tooltipButtons.tooltip();

            // initialize modal on click
            this.$mediaItemLinkElements.click(function(){
                obj.$modalPlayerElements.modal({ backdrop:'static' });
            });

        } else {

            // initialize modal on second click
            // CSS hover works on first tap (show media-hue)
            this.$mediaItemLinkElements.click(function(){

                // show 
                if($('.media-hue',this).css('opacity') == 1) {
                    obj.$modalPlayerElements.modal({ backdrop:'static' });
                }
            });
        }

        // popop overlay
        this.$overlayButtons.popupOverlayJS({
            $overlayContents : this.$overlayContents,
            contentOverlayIdAttr : 'data-overlay'
        });
    };

    EUScreenXL.HomePage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.HomePage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.HomePage.prototype.menuButton = jQuery("#menubutton");
    EUScreenXL.HomePage.prototype.fullscreenButton = jQuery("#fullscreen-button");
    EUScreenXL.HomePage.prototype.name = "home";
    EUScreenXL.HomePage.prototype.events = {

        'click #searchbutton': function(event) {
            if(this.searchButton.hasClass("active")) {
                this.searchButton.removeClass("active"); // toggle style
                this.$navbarElement.removeClass('searchOpened');
                this.menuButton.show();
            } else {

                // go to the top first
                this.searchButton.addClass("active"); // toggle style
                this.$navbarElement.addClass('searchOpened');
                this.$formElement.find('input[type="text"]').focus();
                this.menuButton.hide();
            }
        },
        "click #fullscreen-button": function (event) {
            // check
            if(this.$bodyElement.hasClass('fs')) {
                this.$bodyElement.removeClass('fs'); 
                this.$containerElement.removeClass('container-fluid').addClass('container');
            } else {
                this.$bodyElement.addClass('fs'); 
                this.$containerElement.removeClass('container').addClass('container-fluid');
            }
        }
    }

    new EUScreenXL.HomePage();
});
