define(function (require, exports, module) {
var $ = require('jquery').sub();

$.fn.plusAnim = function (options) {
    var opts = $.extend({
        statusClass: "icon-red",
        itemClass: "red"
    }, options);
    
    this.on("click", function(){
        var _this = $(this);
        if(_this.children("i").hasClass(opts.statusClass)) return;
        var r = _this.offset();
        var i = $("<div class='"+ opts.itemClass +"' style='font-size:10px;z-index:1000'>+1</div>");
        i.appendTo("body");
        r.top += 7;
        r.left += 30;
        i.offset(r).css("display","block").animate(
            {
                "font-size":"64px",
                opacity:0,
                left:"-=40px"
            },
            350,
            "linear",
            function(){ i.remove() }
        );
    })
}

module.exports = $;

});