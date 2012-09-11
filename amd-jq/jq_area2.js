define(function (require, exports, module) {
    require("./jq_area2Data");

    return function ($, _, mc) {

        $.fn.area2 = function (o) {

            var opts = $.extend({
                valueDom: ".hfarea"
            }, o || {});

            //IE7中，Popup内部的A标签无法使用href属性，否则出现自动close的bug，原因未知。
            var areatemp = "<dl class='clear'><dt>{{key}}</dt><dd>\
                            {{#value}}<span class='prov hov'>{{.}}</span>{{/value}}\
                            </dd></dl>";
            var citytemp = "{{#value}}<li><a class='city hov'>{{.}}</a></li>{{/value}}";
            var stackProv = [];
            var closeProvDia = function () {
                for (var i = 0; i < stackProv.length; i++) {
                    $.dialog.list[stackProv[i]].close();
                }
                stackProv = [];
            }

            this.each(function () {
                var o = $(this);
                var valueDom = o.siblings(opts.valueDom);
                var CacheObj = {};
                var SetValue = function () {
                    o.text(CacheObj.Prov + "，" + CacheObj.City);
                    valueDom.val(CacheObj.Prov + "，" + CacheObj.City);
                }
                if (valueDom.val()) {
                    var cache = valueDom.val().split('，');
                    CacheObj.Prov = cache[0];
                    CacheObj.City = cache[1];
                    SetValue();
                }

                var provhint = $('<div class="provhint hide"><span class="close_prov"></span></div>').appendTo("body");
                _.each(window.cityHintArea, function (v, k) {
                    provhint.append(mc.to_html(areatemp, { key: k, value: v }));
                });
                $("span.prov", provhint).hover(function () { $(this).addClass('hover'); }, function () { $(this).removeClass('hover'); });
                o.on("click", function () {
                    $.dialog({
                        initialize: function () {
                            var that = this;
                            $('span.close_prov', provhint).on("click", function () {
                                closeProvDia();
                                that.close();
                            });
                            $("div.d-state-focus").addClass("popup");
                            //$("body>div.aui_state_focus").addClass("popup"); artDialog4
                        },
                        fixed: true,
                        lock: true,
                        content: provhint[0]
                    });
                });

                var cityhint = $("<ul class='cityhint clear hide'></ul>").appendTo("body");

                $("span.prov", provhint).on("click", function () {
                    var prov = $(this);
                    var cm = window.cityHintProv[prov.text()];
                    if(cm.length < 2) {
                        CacheObj.Prov = prov.text();
                        CacheObj.City = prov.text();
                        SetValue();
                        $('span.close_prov', provhint).click();
                        return;
                    }
                                        
                    closeProvDia();
                    stackProv.push(prov.text());
                    $("span.prov.current", provhint).removeClass("current")
                    prov.addClass("current");
                    cityhint.html(mc.to_html(citytemp, { value: cm }));
                    $.dialog({
                        id: prov.text(),
                        follow: prov[0],
                        fixed: true,
                        initialize: function () {
                            $("div.d-state-focus").addClass("popup");
                        },
                        content: cityhint[0]
                    });
                    cityhint.off("click", "a").on("click", "a", function () {
                        CacheObj.Prov = prov.text();
                        CacheObj.City = $(this).text();
                        SetValue();
                        $('span.close_prov', provhint).click();
                    });
                });

            });
        };

    }

});