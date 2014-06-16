/*
 * jquery.slide-panel.java
 *
 * Copyright (c) 2013 Noterik B.V.
 *
 * This file is part of SlidePanel, a component used within Noterik applications
 * related to the Noterik Springfield project.
 *
 * SlidePanel is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SlidePanel is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SlidePanel.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @modules jquery.slide-panel
 * @requires bootstrap
 */

/**
 * Keeps track of all the active panels, can be used to make sure that all panels are closed before a new one is opened
 * @constructor
 */
var SlidePanelContext = function () {
};

/**
 * Array that contains all SlidePanel objects.
 * @type {Array}
 * @default []
 */
SlidePanelContext.prototype.panels = [];
/**
 * Adds a panel to the panels array.
 * @param panel
 */
SlidePanelContext.prototype.add = function (panel) {
    this.panels.push(panel);
};
/**
 * Removes a panel from the panel array.
 * @param panel A SlidePanel object
 */
SlidePanelContext.prototype.remove = function (panel) {
    this.panels.splice(this.panels.indexOf(panel), 1);
};
/**
 * Closes all open SlidePanels. Returns a promise that resolves once all the SlidePanel.hide() methods have resolved.
 * @param panel
 * @returns {Promise}
 */
SlidePanelContext.prototype.closeAll = function (panel) {
    var openPanels = this.panels.filter(function (panel) {
        return panel.open;
    });

    if (!openPanels.length) {
        return Promise.resolve();
    } else {
        return Promise.all(openPanels.map(function (panel) {
            panel.hide()
        }));
    }

};

/**
 * A panel that can slide in from a given direction and overlays all other content in the page. Is triggered when clicking an object (the triggeringElement).
 * @param triggeringElement Listens to this element, when its clicked shows the panel
 * @param options Contains variables, these will override the default prototype variables.
 * @constructor
 */
var SlidePanel = function (triggeringElement, options) {
    $.extend(this, options); //Extends the prototype variables (overrides or adds if they don't exist)

    this.context.add(this); //Add the panel to the context

    this.triggeringElement = $(triggeringElement);
    this.inserted = false;

    this.init();
};
/**
 * Declares where the panel should slide in from.
 * @type {string}
 * @default "bottom"
 */
SlidePanel.prototype.placement = "bottom";
/**
 * Declares the height of the panel
 * @type {string}
 * @default "auto"
 */
SlidePanel.prototype.height = "auto";
/**
 * The content that will be added to the element, can either be a function that returns some HTML elements or string, Can also be just a string. Will be appended to the panel.
 * @type {function} | {string}
 */
SlidePanel.prototype.content = null;
/**
 * Template of the html that will be wrapped around the content. The basic HTML of the panel.
 * @type {string}
 */
SlidePanel.prototype.template = '<div class="slide-panel"><div class="header"><div class="title"></div><button class="btn btn-default btn-sm slide-away"><span class="glyphicon glyphicon-chevron-down"></span></button></div></div>';
/**
 * The HTML element of the panel
 * @type {jQueryElement}
 */
SlidePanel.prototype.element = null;
/**
 * The element that triggers the SlidePanel to show up.
 * @type {HTMLElement}
 */
SlidePanel.prototype.triggeringElement = null;
/**
 * The container to which the SlidePanel will be appended.
 * @type {HTMLElement}
 */
SlidePanel.prototype.container = "body";
/**
 * The title that will be shown in the SlidePanel.
 * @type {string}
 */
SlidePanel.prototype.title = null;
/**
 * The context to which SlidePanel is bound.
 * @type {SlidePanelContext}
 */
SlidePanel.prototype.context = null;
/**
 * Defines if the SlidePanel is open and visible at this moment.
 * @type {boolean}
 * @default false
 */
SlidePanel.prototype.open = false;
/**
 * The close button that will trigger the hiding of the SlidePanel
 * @type {HTMLElement}
 */
SlidePanel.prototype.closeButton = null;
/**
 * Slides the SlidePanel into the users viewport. Resolves once the animation has finished.
 * @return {Promise}
 */
SlidePanel.prototype.show = function () {
    var self = this;
    this.context.closeAll().then(function () {
        self.open = true;
        if (!self.inserted) {
            self._insertPanel();
        } else {
            self.element.css(self.placement, 0);
        }
        return new Promise(function (resolve) {
            self.element.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                resolve();
            });
        });
    });

};
/**
 * Slides the SlidePanel out of the users viewport. Resolves once the animation has finished.
 * @returns {Promise}
 */
SlidePanel.prototype.hide = function () {
    var self = this;

    this.open = false;
    this.element.css(this.placement, -(this.element.height()));
    return new Promise(function (resolve) {
        self.element.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
            resolve();
        });
    });
};
/**
 * Creates the panel HTML.
 * @private
 */
SlidePanel.prototype._createPanel = function () {
    this._handleHeight();
    if (typeof this.content === "function") {
        this.content = this.content();
    }
    this.element.append(this.content);
    this.element.height(this.height);
    this._handleCloseButton();
    this._handleTitle();
    this._listenToClose();
};
/**
 * Inserts the panel into the dom at the position specified in SlidePanel.container
 * @private
 */
SlidePanel.prototype._insertPanel = function () {
    var self = this;
    $(this.container).append(this.element);
    this._positionPanel();
    this.inserted = true;
    setTimeout(function () {
        self.element.addClass('inserted');
        self.element.addClass(self.placement);
        self.element.css(self.placement, 0);
    }, 1);

};
/**
 * Puts the panel in the position so that it can be animated into the viewport at a later moment. Hides it in the direction specified in SlidePanel.placement.
 * @private
 */
SlidePanel.prototype._positionPanel = function () {
    this.element.css(this.placement, -(this.element.height()));
};
/**
 * Height can be set in multiple ways, such as percentage or pixels or auto. This method normalizes percentage values to pixel values.
 * @private
 */
SlidePanel.prototype._handleHeight = function () {
    if (/[0-9]*\.?[0-9]+%/.test(this.height)) {
        var percentage = parseInt(this.height);
        this.height = $(window).height() / 100 * percentage;
    }
};
SlidePanel.prototype._handleCloseButton = function () {
    var defaultCloseButton = this.element.find('button.slide-away');
    var possibleCloseButton = this.element.find('button[data-popup-close]');
    if (possibleCloseButton.length) {
        this.closeButton = possibleCloseButton
        defaultCloseButton.remove();
    } else {
        this.closeButton = defaultCloseButton;
    }
};
/**
 * Starts listening to the triggering element. If its clicked, show the slide panel.
 * @private
 */
SlidePanel.prototype._listenToTrigger = function () {
    var self = this;
    this.triggeringElement.on('click', function () {
        self.show.apply(self);
    });
};
/**
 * Starts listening to the close button. If its clicked, hide the slide panel.
 * @private
 */
SlidePanel.prototype._listenToClose = function () {
    var self = this;
    this.closeButton.on('click', function () {
        self.hide.apply(self);
    });
};
/**
 * Adds the title to the html.
 * @private
 */
SlidePanel.prototype._handleTitle = function () {
    if (this.title) {
        this.element.find('.title').text(this.title);
    } else {
        this.element.find('title').remove();
    }
};

/**
 * Initialize the SlidePanel.
 */
SlidePanel.prototype.init = function () {
    this.element = $(this.template);
    this._createPanel();
    this._listenToTrigger();
};

var context = new SlidePanelContext(); //Create new SlidePanelContext

(function ($) {
    $.fn.slidePanel = function (options) {
        options.context = context;
        this.each(function () {
            new SlidePanel(this, options);
        });
        return this;
    };

}(jQuery));