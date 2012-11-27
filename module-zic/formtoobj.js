define(function (require, exports) {
    return function ($) {

        $.fn.formtoobj = function (options) {
            var opts = $.extend({
                filter: ''
            }, options);

            var obj = {};
            $(":input, select, taxtarea", this).not(opts.filter).each(function () {
                var o = $(this);
                if(o.attr("type") == "checkbox")
                    obj[o.attr("name")] = o.is(":checked")? true: false;
                else
                    obj[o.attr("name")] = o.val();
            });

            return obj;
        }

    }
});