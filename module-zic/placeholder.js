define(function (require, exports, module) {
var $ = require('jquery');

var hasPlaceholderSupport = function() {
    var input = document.createElement('input');
    return ('placeholder' in input);
}

$.fn.placeholder = function (options) {
    if (hasPlaceholderSupport()) return;

    var opts = $.extend({
        holdClass: "txtholding"
    }, options);

    this.each(function () {
        var o = $(this);
        if (o.attr("type") == "password") return;

        o.data("text", $.trim(o.attr("placeholder")));

        if ($.trim(o.val()) == "") {
            o.val(o.data("text"));
            o.addClass(opts.holdClass);
        } else if ($.trim(o.val()) == o.data("text")) {
            o.addClass(opts.holdClass);
        }

        o.focus(function () {
            o.removeClass(opts.holdClass);
            if ($.trim(o.val()) == o.data("text")) o.val("");
        }).blur(function () {
            if ($.trim(o.val()) == "") {
                o.val(o.data("text"));
                o.addClass(opts.holdClass);
            } else if ($.trim(o.val()) == o.data("text")) {
                o.addClass(opts.holdClass);
            }
        });
    });
}

});