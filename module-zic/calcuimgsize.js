//_ = require('underscore');

$.fn.calcuimgsize = function (options) {

    var opts = $.extend({
        temp: "<img src='/img/<%= id %>_<%= size %>.jpg' />",
        widthAttr: "imgWidth",
        heightAttr: "imgHeigth"
    }, options);

    this.each(function () {
        var _this = $(this);
        var iid = _this.attr(id);
        var boxWidth = _this.width();
        var boxHeight = _this.height();
        var imgWidth = _this.attr(opts.widthAttr)
        var imgHeigth = _this.attr(opts.heightAttr)
        var rangeWidth = imgWidth - boxWidth;
        var rangeHeight = imgHeigth - boxHeight;
        var imgDom;
        if(rangeWidth > 0 && rangeHeight > 0){
            if (rangeWidth > rangeHeight) {
                imgDom = $(_.template(opts.temp, { size: boxWidth, id: iid }));
            } else {
                imgDom = $(_.template(opts.temp, { size: boxHeight, id: iid }));
            }
        } else if(rangeWidth > 0){
            _this.html(mc.html(opts.temp, {size:boxWidth, id:iid}));
        } else if(rangeHeight > 0){
            _this.html(mc.html(opts.temp, {size:boxHeight, id:iid}));
        } else {
            imgDom = $(mc.html(opts.temp, {size:"origin", id:iid}));
            if (rangeWidth > rangeHeight) {
                imgDom.css({width: "100%"});
            } else {
                imgDom.css({height: "100%"});
            }
        }
        _this.html(imgDom);
    });

}
