$(document).ready(function(){

    var createPopovers = function(){
        $('button.popover-button').each(function(){
            var $this = $(this);
            var content = $($this.attr('data-contentContainer')).html();
            $(this).popover({
                content: content,
                html: true
            }).on('show.bs.popover', function(){
                var self = this;
                $('button.popover-button').filter(function(){
                    return this != self;
                }).popover('hide');
            })
        })
    }

    createPopovers();
});
