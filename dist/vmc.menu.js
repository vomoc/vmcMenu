/**
 * VmcMenu 导航菜单插件 v1.1.0
 * 维米客网页工作室 Vomoc Web Studio
 * http://www.vomoc.com/vmc/menu/
 * vomoc@qq.com
 * 2015/11/15
 **/
;(function ($, undefined) {
    var dataKey = 'vomoc';
    $.fn.vmcMenu = function (settings) {
        var run = $.type(settings) === 'string', args = [].slice.call(arguments, 1);
        if (!this.length) return;
        return this.each(function () {
            var $element = $(this), instance = $element.data(dataKey);
            if (run && settings.charAt(0) !== '_' && instance) {
                vmcMenu.prototype[settings] && vmcMenu.prototype[settings].apply(instance, args)
            } else if (!run && !instance) {
                instance = new vmcMenu($element, settings);
                instance._init();
                $element.data(dataKey, instance)
            }
        })
    };
    var vmcMenu = function ($element, settings) {
        var the = this;
        the.options = $.extend({}, the.options, settings);
        the.elem = $element
    };
    vmcMenu.prototype.options = {duration: 400, easing: 'easeOutBack', currentBar: true};
    vmcMenu.prototype._init = function () {
        var the = this, opts = the.options;
        the._createCurrentBar();
        var itemHeight = the.elem.find('.vui-main').height();
        var mainWidth = the.elem.find('.vui-main').width();
        the.elem.find('.vui-item').each(function () {
            var pos = $(this).position();
            var itemWidth = $(this).width();
            var $child = $(this).children('.vui-children');
            var childWidth = $child.width();
            childWidth = Math.max(itemWidth, childWidth);
            var childLeft = mainWidth - pos.left - childWidth;
            childLeft = childLeft > 0 ? 0 : childLeft;
            $child.css({'top': itemHeight, 'left': childLeft, 'width': childWidth})
        }).hover(function () {
            $(this).children('.vui-children').stop(true, true).slideDown({
                duration: opts.duration,
                easing: opts.easing,
                queue: false
            });
            $(this).children('.vui-item-value').addClass('vui-item-hover');
            if (true === opts.currentBar) {
                the.elem.find('.vui-current-bar').stop().animate({
                    'left': $(this).position().left,
                    'width': $(this).width()
                }, {duration: 300, easing: 'easeOutBack', queue: false})
            }
        }, function () {
            var that = $(this);
            if (that.find('.vui-child-item').length > 0) {
                that.children('.vui-children').stop(true, true).slideUp({
                    duration: opts.duration / 2,
                    queue: false,
                    complete: function () {
                        that.children('.vui-item-value').removeClass('vui-item-hover')
                    }
                })
            } else {
                that.children('.vui-item-value').removeClass('vui-item-hover')
            }
        });
        the.elem.find('.vui-child-item').css({'float': 'none', 'display': 'block'});
        the.elem.find('.vui-child-value').css({'float': 'none', 'display': 'block'}).hover(function () {
            $(this).addClass('vui-child-hover')
        }, function () {
            $(this).removeClass('vui-child-hover')
        });
        the.elem.find('.vui-children').css('visibility', 'visible').hide()
    };
    vmcMenu.prototype._createCurrentBar = function () {
        var the = this, opts = the.options;
        if (false === opts.currentBar) return;
        var $currentBarBox = $('<div class="vui-current-bar-box"></div>').hide().appendTo(the.elem);
        var $currentBar = $('<div class="vui-current-bar"></div>').appendTo($currentBarBox);
        the.elem.hover(function () {
            $currentBarBox.stop(false, true).fadeIn({duration: 400, queue: false})
        }, function () {
            $currentBarBox.stop(false, true).fadeOut({duration: 400, queue: false})
        })
    }
})(jQuery);