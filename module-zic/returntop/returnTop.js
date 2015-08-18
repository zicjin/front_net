$.fn.returnTop = function (options) {
    var b = this.click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        var c = $(window).height() + 80 + "px";
        b.data("isClick", !0);
        b.css("bottom", c)
    }),
    c = null;
    $(window).bind("scroll", function () {
        var d = $(document).scrollTop(),
            e = $(window).height();
        0 < d ? b.data("isClick") || b.css({
            opacity: 1,
            bottom: "200px"
        }) : b.css({
            opacity: 0,
            bottom: "-200px"
        }).data("isClick", !1);
        $("html").hasClass("no-postmessage") && (b.hide(), clearTimeout(c), c = setTimeout(function () {
            b.show();
            clearTimeout(c)
        }, 1E3), b.css("top", d + e - 125))
    })
}
