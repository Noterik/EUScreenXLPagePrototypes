$(document).ready(function () {
    if (!EUScreenXL) {
        throw "EUScreenXL required libraries not there!";
    }

    EUScreenXL.SeriesPage = function () {
        EUScreenXL.Page.apply(this, arguments);
        this.$navElement = jQuery('#navpanel');
        this.$navbarElement = jQuery('.navbar-header');
        this.$formElement = jQuery('#headerform');
        this.$chartElement = jQuery('.chart');
        this.$overlayContents = jQuery('.overlaycontent');
        this.$overlayButtons = jQuery('button[data-overlay]');
        this.$tooltipButtons = jQuery('button[data-toggle]');

        // nav panel
        this.$navElement.slidePanelJS({
            openButton: '#menubutton',
            pageSection:'#page',
            navbarSection:'#navbar',
            speed:200
        });

        // only activates tooltip on desktop
        // otherwise it takes two tap to view overlay content
        if(EUScreenXL.Page.prototype.device == "desktop") {

            // activate tooltip
           this.$tooltipButtons.tooltip();
        }

        // popover overlay
        // bootstrap popover doesn't play too nicely with mobile version
        // and it doesnt fit with euscreenxl the mobile designs
        this.$overlayButtons.popupOverlayJS({
            $overlayContents : this.$overlayContents,
            contentOverlayIdAttr : 'data-overlay'
        });
    };

    EUScreenXL.SeriesPage.prototype = Object.create(EUScreenXL.Page.prototype);
    EUScreenXL.SeriesPage.prototype.searchButton = jQuery("#searchbutton");
    EUScreenXL.SeriesPage.prototype.menuButton = jQuery("#menubutton");
    EUScreenXL.SeriesPage.prototype.showExtraMetadataButton = jQuery("#show-extra-metadata");
    EUScreenXL.SeriesPage.prototype.hideExtraMetadataButton = jQuery("#hide-extra-metadata");
    EUScreenXL.SeriesPage.prototype.name = "series";
    EUScreenXL.SeriesPage.prototype.events = {
        "click #show-extra-metadata": function (event) {
            this.showExtraMetadataButton.hide();
            this.hideExtraMetadataButton.show();
        },
        "click #hide-extra-metadata": function (event) {
            this.hideExtraMetadataButton.hide();
            this.showExtraMetadataButton.show();
        },
    	'click #searchbutton': function(event) {
            if(this.searchButton.hasClass("active")) {
                this.searchButton.removeClass("active"); // toggle style
                this.$navbarElement.removeClass('searchOpened');
                this.menuButton.show();
            } else {
                this.searchButton.addClass("active"); // toggle style
                this.$navbarElement.addClass('searchOpened');
                this.$formElement.find('input[type="text"]').focus();
                this.menuButton.hide();
            }
        }
    }

    new EUScreenXL.SeriesPage();
});