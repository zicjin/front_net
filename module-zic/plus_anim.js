define(function (require, exports, module) {

    $.fn.plusAnim = function (options) {
        var opts = $.extend({
            statusClass: "actived",
            itemClass: "plusanim",
            animationChar: "+1",
            fontSize: '48px',
            offsetTop: 7,
            offsetLeft: 14
        }, options);

        this.on("click.plusanim", function () {
            var _this = $(this);
            if (_this.hasClass(opts.statusClass)) return;
            var r = _this.offset();
            var i = $('<div>', { class: opts.itemClass, style: 'font-size:10px;z-index:1000', text: opts.animationChar });
            i.appendTo("body");
            r.top += opts.offsetTop;
            r.left += opts.offsetLeft;
            i.offset(r).css("display", "block").animate({
                    "font-size": opts.fontSize,
                    opacity: 0
                },
                350,
                "linear",
                function () { i.remove() }
            );
        })
    }
});