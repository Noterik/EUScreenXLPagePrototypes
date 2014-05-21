if (!window.EUScreenXL) {
    EUScreenXL = {};
}

EUScreenXL.DeviceDetect = function () {
    var device;

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

    this.getDevice = function () {
        return device;
    }

    detectDeviceContext();
    addDeviceClass();
};