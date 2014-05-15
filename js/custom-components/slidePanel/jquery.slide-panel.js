var SlidePanelContext = function(){
};
SlidePanelContext.prototype.panels = [];
SlidePanelContext.prototype.add = function(panel){
    this.panels.push(panel);
};
SlidePanelContext.prototype.remove = function(panel){
    this.panels.splice(this.panels.indexOf(panel), 1);
};
SlidePanelContext.prototype.closeAll = function(panel){
    var openPanels = this.panels.filter(function(panel){
        return panel.open;
    });

    if(!openPanels.length){
        return Promise.resolve();
    }else{
        return Promise.all(openPanels.map(function(panel){
            panel.hide()
        }));
    }

};

var context = new SlidePanelContext();

var SlidePanel = function(triggeringElement, options){
    console.log("new SlidePanel()");
    $.extend(this, options);

    this.context.add(this);

    this.triggeringElement = $(triggeringElement);
    this.inserted = false;

    this.init();
};
SlidePanel.prototype.placement = "bottom";
SlidePanel.prototype.height = "auto";
SlidePanel.prototype.content = null;
SlidePanel.prototype.template = '<div class="slide-panel"><div class="header"><div class="title"></div><button class="btn btn-default btn-sm slide-away"><span class="glyphicon glyphicon-chevron-down"></span></button></div></div>';
SlidePanel.prototype.element = null;
SlidePanel.prototype.triggeringElement = null;
SlidePanel.prototype.container = "body";
SlidePanel.prototype.title = null;
SlidePanel.prototype.context = null;
SlidePanel.prototype.open = false;
SlidePanel.prototype.createPanel = function(){
    this.handleHeight();
    if(typeof this.content === "function"){
        this.content = this.content();
    }
    this.element.append(this.content);
    this.element.height(this.height);
    this.setTitle();
    this.listenToClose();
};
SlidePanel.prototype.positionPanel = function(){
    this.element.css(this.placement, -(this.element.height()));
};
SlidePanel.prototype.insertPanel = function(){
    console.log(this.element);
    var self = this;
    $(this.container).append(this.element);
    this.positionPanel();
    this.inserted = true;
    setTimeout(function(){
        self.element.addClass('inserted');
        self.element.css(self.placement, 0);
    }, 1);

};
SlidePanel.prototype.show = function(){
    var self = this;
    this.context.closeAll().then(function(){
        self.open = true;
        if(!self.inserted) {
            self.insertPanel();
        }else{
            self.element.css(self.placement, 0);
        }
        return new Promise(function(resolve){
            self.element.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
                resolve();
            });
        });
    });

};
SlidePanel.prototype.hide = function(){
    console.log("SlidePanel.hide()");
    var self = this;

    this.open = false;
    this.element.css(this.placement, -(this.element.height()));
    return new Promise(function(resolve){
        self.element.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
            resolve();
        });
    });
};
SlidePanel.prototype.handleHeight = function(){
    if(/[0-9]*\.?[0-9]+%/.test(this.height)){
        var percentage = parseInt(this.height);
        this.height = $(window).height() / 100 * percentage;
    }
};
SlidePanel.prototype.listenToTrigger = function(){
    var self = this;
    this.triggeringElement.on('click', function(){
        self.show.apply(self);
    });
};
SlidePanel.prototype.listenToClose = function(){
    var self = this;
    this.element.find('button.slide-away').on('click', function(){
        self.hide.apply(self);
    });
}
SlidePanel.prototype.setTitle = function(){
  console.log("SlidePanel.setTitle()");
  this.element.find('.title').text(this.title);
};
SlidePanel.prototype.init = function(){
    this.element = $(this.template);
    this.createPanel();
    this.listenToTrigger();
};

(function ( $ ) {
    $.fn.slidePanel = function(options) {
        options.context = context;
        console.log("jQuery.slidePanel()");
        this.each(function(){
            new SlidePanel(this, options);
        });
        return this;
    };

}( jQuery ));