_ = require('underscore')

// http://jqueryfordesigners.com/fixed-floating-elements/
// not support ie6
// nav{position:relative;
//     &.fixed{position:fixed;top: 0;}
// }
$.fn.positionfixed = function (options) {
    var opts = $.extend({
        margin: 0,
        lazy: 0, //normal 300
        callBack: false
    }, options)

    _this = $(this)
    win = $(window)
    var top = _this.offset().top - parseFloat(_this.css('marginTop').replace(/auto/, 0))

    var func = function (event) {
        if (win.scrollTop() >= top - opts.margin) {
            _this.addClass('fixed')
        } else {
            _this.removeClass('fixed')
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