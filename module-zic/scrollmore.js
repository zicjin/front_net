_ = require('underscore')

// http://jqueryfordesigners.com/fixed-floating-elements/
// not support ie6
// nav{position:relative;
//     &.fixed{position:fixed;top: 0;}
// }
$.fn.scrollmore = function (options) {
    var opts = $.extend({
        doc: $(document), //change it if jq isnt windows
        margin: 20,
        callBack: false,
        lazy: 0, //normal 300
    }, options)

    win = $(this)
    var func = function (event) {
        if (win.scrollTop() + win.height() + opts.margin >= opts.doc.height()) {
            opts.callBack()
        }
    }

    if (opts.lazy) {
        var lazyFunc = _.debounce(func, opts.lazy)
        win.scroll(lazyFunc)
    } else {
        win.scroll(func)
    }

}