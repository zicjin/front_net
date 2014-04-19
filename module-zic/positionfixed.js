define(function (require, exports, module) {
    _ = require('underscore')

    // http://jqueryfordesigners.com/fixed-floating-elements/
    // not support ie6
    // nav{position:relative;
    //     &.fixed{position:fixed;top: 0;}
    // }
    var win = $(window)
    $.fn.positionfixed = function (options) {
        var opts = $.extend({
            margin: 0,
            lazy: 16, //eye critical point
            callBack: false,
            minWidth: 0,
            adaptWidth: false
        }, options)

        this.each(function () {
            var _this = $(this)
            _this.css({
                'top': opts.margin
            });

            var top = _this.offset().top - parseFloat(_this.css('marginTop').replace(/auto/, 0))

            var func = function (event) {
                if (win.width() < opts.minWidth) {
                    _this.css('position', 'static');
                    return;
                }
                if (win.scrollTop() >= top - opts.margin) {
                    if (opts.adaptWidth)
                        _this.css('width', _this.width())
                    _this.css('position', 'fixed')
                } else {
                    _this.css('position', 'static')
                }
                if (opts.callBack) opts.callBack()
            }

            if (opts.lazy) {
                var lazyFunc = _.debounce(func, opts.lazy)
                win.on('scroll', lazyFunc)
            } else {
                win.on('scroll', func)
            }
        });

    }

});