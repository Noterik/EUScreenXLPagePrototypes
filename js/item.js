$(document).ready(function () {

    //Device and orientation variables
    var device, orientation;

    //Buttons
    var $moreInfoButton = $('button.more-info');
    var $lessInfoButton = $('button.less-info');
    var $loginButton = $('form.login input[type="submit"]');
    var $moreInfo = $('.euscr-row.more-info');

    //Other elements
    var $loginElement = $('.login-form');
    var $bookmarksElement = $('.bookmarks');

    //This detects the device by using CSS media queries and saves it to the device variable.
    var detectDeviceContext = function () {
        var mobileMediaQuery = "(min-device-width : 320px) and (max-device-width : 480px)";
        var tabletMediaQuery = "(min-device-width: 768px) and (max-device-width: 1024px)";
        if (window.matchMedia(mobileMediaQuery).matches) {
            device = "mobile";
        } else if (window.matchMedia(tabletMediaQuery).matches) {
            device = "tablet";
        } else {
            device = "desktop";
        }
    };

    //This adds the device name to the .page element as a class.
    var addDeviceClass = function () {
        $('body > .page').addClass(device);
    };

    //This inserts the correct stylesheet into the page.
    var addDeviceSpecificStylesheet = function () {
        var genericStyleElement = $('<link rel="stylesheet" href="css/generic/' + device + '.css">');
        var styleElement = $('<link rel="stylesheet" href="css/item/' + device + '.css">');
        $('head').append(genericStyleElement);
        $('head').append(styleElement);
    };

    //This function creates the popups you see when you press an action button on the page. Depending on the device should either use bootstrap popover or our custom jquery.slidePanel to display the popup
    var createPopups = function () {

        var popupMethod;

        switch (device) {
            case "mobile":
                popupMethod = 'slidePanel';
                break;
            case "tablet":
            case "desktop":
                popupMethod = 'popover';
                break;
        }

        var popupButtons = $('button[data-popup]')
        popupButtons.each(function () {
            var $this = $(this);
            var selector = $this.attr('data-popup');
            var placement = $this.attr('data-placement');
            var container = $this.attr('data-container');
            var title = $this.attr('data-title');
            var height = $this.attr('data-height');
            $this[popupMethod]({
                html: true,
                container: ".page",
                placement: placement,
                container: container,
                title: title,
                height: height,
                content: function () {
                    return $(selector).children();
                }
            }).on('show.bs.popover', function () {
                var self = this;
                popupButtons.filter(function () {
                    return this != self;
                }).popover('hide');
            });
        });
    };

    //Button listeners
    /*
     $moreInfoButton.on('click', function(){
     console.log($(this).selector);
     $(this).hide();
     $moreInfo.addClass('visible');
     });*/

    $lessInfoButton.on('click', function () {
        $moreInfo.removeClass('visible');
        $moreInfoButton.show();
    });

    $loginButton.on('click', function () {
        event.preventDefault();
        $loginElement.removeClass('visible');
        $bookmarksElement.addClass('visible');
    });
    //END Button listeners

    //Initializing functions, calls all the necessary initialization functions.
    var initializePage = function () {
        detectDeviceContext();
        addDeviceClass();
        addDeviceSpecificStylesheet();
        createPopups();
    }

    initializePage();
});
