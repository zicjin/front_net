define(function (require, exports) {
    exports.open = function (opts) {
        var width = 500;
        var height = 400;
        if (typeof opts.width !== "undefined")
            width = opts.width;
        if (typeof opts.height !== "undefined")
            height = opts.height;

        var left = ($(window).width() - width) / 2;
        var top = ($(window).height() - height) / 2 - 50;
        if (left < 0) left = 0;
        if (top < 0) top = 0;

        var specs = 'width='+width+',height='+height+',left='+left+',top='+top+',menubar=0,toolbar=0';
        var newWin = window.open(opts.url, '_login', specs);
    }

    exports.close = function(){
        if (window.opener && !window.opener.closed) {
            window.opener.location.reload(true);
        }
        window.close()
    }

});