define(function (require, exports, module) {
    _ = require('underscore')

    // http://jqueryfordesigners.com/fixed-floating-elements/
    // not support ie6
    // nav{position:relative;
    //     &.fixed{position:fixed;top: 0;}
    // }
    $.fn.positionfixed = function (options) {
        var opts = $.extend({
            margin: 0,
            lazy: 10, //eye critical point
            callBack: false,
            minWidth: 0
        }, options)

        _this = $(this)
        _this.css({
            'top': opts.margin
        });
        win = $(window)
        var top = _this.offset().top - parseFloat(_this.css('marginTop').replace(/auto/, 0))

        var func = function (event) {
            if (win.width() < opts.minWidth) {
                _this.css('position', 'static');
                return;
            }
            if (win.scrollTop() >= top - opts.margin) {
                _this.css('width', _this.width());
                _this.css('position', 'fixed')
            } else {
                _this.css('position', 'static')
            }
            if (opts.callBack) opts.callBack()
        }

        if (opts.lazy) {
            var lazyFunc = _.debounce(func, opts.lazy)
            win.scroll(lazyFunc)
        } else {
            win.scroll(func)
        }

    }

});