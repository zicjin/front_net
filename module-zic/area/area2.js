define(function (require, exports, module) {

//require('underscore');
//require('../../module/artDialog5/amd/artDialog5');

$.fn.area2 = function (options) {
    if(!window.cityHintArea) {
        alert("数据加载失败！");
        return;
    }

    var opts = $.extend({
        valueDom: ".hfarea",
        valueDefault: "请选择省市"
    }, options || {});

    //IE7中，Popup内部的A标签无法使用href属性，否则出现自动close的bug，原因未知。
    var areatemp = "<dl class='clear'><dt><%= key %></dt><dd>\
                    <% _.each(value, function(name) { %> <a class='prov'><%= name %></a> <% }); %>\
                    </dd></dl>";
    var citytemp = "<% _.each(value, function(name) { %> <li><a class='city'><%= name %></a></li> <% }); %>";

    this.each(function () {
        var _this = $(this);
        _this.empty().text(opts.valueDefault);
        
        var valueDom = _this.siblings(opts.valueDom);
        var SetValue = function () {
            _this.text("");
            valueDom.val(opts.valueDefault);
            if(!CacheObj.Prov) return;
            var value = CacheObj.Prov + (CacheObj.City? "，" + CacheObj.City:"" );
            _this.text(value);
            valueDom.val(value);
        }

        var CacheObj = {};
        if (valueDom.val()) {
            var cache = valueDom.val().split('，');
            CacheObj.Prov = cache[0];
            if (cache.length > 1) CacheObj.City = cache[1];
            SetValue();
        }

        var provhint = $('<div class="provhint hide"><a class="close_prov"></a></div>').appendTo("body");
        _.each(window.cityHintArea, function (v, k) {
            provhint.append(_.template(areatemp, { key: k, value: v }));
        });

        _this.on("click", function () {
            $.dialog({
                content: provhint[0],
                initialize: function () {
                    var _that = this;
                    $('a.close_prov', provhint).on("click", function () {
                        SetValue();
                        _that.close();
                    });
                    $("div.d-state-focus").addClass("popup");
                    //$("body>div.aui_state_focus").addClass("popup"); artDialog4
                },
                fixed: true,
                lock: true,
                follow: _this[0]
            });
        });

        var cityhint = $("<ul>", { "class": "cityhint fn-none" }).appendTo(provhint);
        cityhint.on("click", "a", function () {
            CacheObj.City = $(this).text();
            $('a.close_prov', provhint).click();
        });
        $("a.prov", provhint).on("click", function () {
            var _prov = $(this);
            CacheObj.Prov = _prov.text();
            CacheObj.City = '';
            var cm = window.cityHintProv[_prov.text()];
            if(cm.length < 2) {
                $('a.close_prov', provhint).click();
                return;
            }
            $("a.prov.current", provhint).removeClass("current");
            _prov.addClass("current");
            cityhint.html(_.template(citytemp, { value: cm }));
            cityhint.show();
        });

    });
};

});