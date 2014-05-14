$(document).ready(function(){

    var $moreInfoButton = $('button.more-info');
    var $lessInfoButton = $('button.less-info');
    var $moreInfo = $('.row.more-info');

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
    };

    createPopovers();

    $moreInfoButton.on('click', function(){
        $(this).hide();
        $moreInfo.addClass('visible');
    });

    $lessInfoButton.on('click', function(){
        $moreInfo.removeClass('visible');
        $moreInfoButton.show();
    })

});
