if (!window.EUScreenXL) {
    EUScreenXL = {};
}

EUScreenXL.DeviceDetect = function () {
    var device,
        orientation = "landscape";

    var detectDeviceContext = function () {
    	/*
    		The division of the adaptive interface is as follows:
    			- By default, the interface is mobile version and we scale up to desktop version (0 - 768px) is Mobile [portrait & landscape]
    			- When the screen size is more than 768px, we shift the UI to smaller desktop version (768px - 992px) is Tablet [portrait]
    			- When the screen size is more than 992px, we shift the UI to bigger desktop version (992px - 1200px) is Tablet [landscape] & Desktop [small]
    			- When the screen is bigger than 1200, we shift the UI to a more bigger desktop version (>= 1200px) is Desktop [large]
    	*/
        var mobileMediaQuery = "(max-width: 768px)"; // less than 768, Mobile [portrait & landscape]
        var tabletPortraitMediaQuery = "(max-width: 992px)"; // less than 992, Tablet [portrait]
        var tabletLandscapeMediaQuery = "(max-width: 1025px)"; // less than 1025, Tablet [landscape]
        if (window.matchMedia(mobileMediaQuery).matches) {
            device = "mobile";
        } else if (window.matchMedia(tabletPortraitMediaQuery).matches) {
            device = "tablet";
            orientation = "portrait";
        } else if (window.matchMedia(tabletLandscapeMediaQuery).matches) {
            device = "tablet";
            orientation = "landscape";
        } else {
            device = "desktop"; // more than 992, Tablet [landscape] and Desktop [small & large]
        }
    };

    //This adds the device name to the .page element as a class.
    var addDeviceClass = function () {
        $('body > .page').addClass(device);
    };

    this.getDevice = function () {
        return device;
    }

    this.getOrientation = function(){
        return orientation;
    }

    detectDeviceContext();
    addDeviceClass();
};