define(function (require, exports, module) {

    return function ($, _, mc) {

        $.fn.area2 = function (o) {
            if(!window.cityHintArea) {
                alert("数据加载失败！");
                return;
            }

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
                var _this = $(this);
                _this.empty().text("请选择省市");
                
                var valueDom = _this.siblings(opts.valueDom);
                var SetValue = function () {
                    _this.text(CacheObj.Prov + (CacheObj.City? "，" + CacheObj.City:"" ));
                    valueDom.val(CacheObj.Prov + (CacheObj.City? "," + CacheObj.City:"" ));
                }

                var CacheObj = {};
                if (valueDom.val()) {
                    var cache = valueDom.val().split(',');
                    CacheObj.Prov = cache[0];
                    if (cache.length > 1) CacheObj.City = cache[1];
                    SetValue();
                }

                var provhint = $('<div class="provhint hide"><span class="close_prov"></span></div>').appendTo("body");
                _.each(window.cityHintArea, function (v, k) {
                    provhint.append(mc.to_html(areatemp, { key: k, value: v }));
                });
                $("span.prov", provhint).hover(function () { $(this).addClass('hover'); }, function () { $(this).removeClass('hover'); });

                _this.on("click", function () {
                    $.dialog({
                        initialize: function () {
                            var _that = this;
                            $('span.close_prov', provhint).on("click", function () {
                                closeProvDia();
                                _that.close();
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
                    var _prov = $(this);
                    var cm = window.cityHintProv[_prov.text()];
                    if(cm.length < 2) {
                        CacheObj.Prov = _prov.text();
                        CacheObj.City = '';
                        SetValue();
                        $('span.close_prov', provhint).click();
                        return;
                    }
                    closeProvDia();
                    stackProv.push(_prov.text());
                    $("span.prov.current", provhint).removeClass("current");
                    _prov.addClass("current");
                    cityhint.html(mc.to_html(citytemp, { value: cm }));
                    $.dialog({
                        id: _prov.text(),
                        follow: _prov[0],
                        fixed: true,
                        initialize: function () {
                            $("div.d-state-focus").addClass("popup");
                            //$("body>div.aui_state_focus").addClass("popup"); artDialog4
                        },
                        content: cityhint[0]
                    });
                    cityhint.off("click", "a").on("click", "a", function () {
                        CacheObj.Prov = _prov.text();
                        CacheObj.City = $(this).text();
                        SetValue();
                        $('span.close_prov', provhint).click();
                    });
                });

            });
        };

    }

});