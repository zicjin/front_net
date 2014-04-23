define(function (require, exports, module) {

    // 拖拽支持
    var DragEvent = function () {
        var that = this,
            proxy = function (name) {
                var fn = that[name];
                that[name] = function () {
                    return fn.apply(that, arguments);
                };
            };

        proxy('start');
        proxy('over');
        proxy('end');
    };


    DragEvent.prototype = {

        // 开始拖拽
        // onstart: function () {},
        start: function (event) {
            $(document)
            .bind('mousemove', this.over)
            .bind('mouseup', this.end);

            this._sClientX = event.clientX;
            this._sClientY = event.clientY;
            this.onstart(event.clientX, event.clientY);

            return false;
        },

        // 正在拖拽
        // onover: function () {},
        over: function (event) {
            this._mClientX = event.clientX;
            this._mClientY = event.clientY;
            this.onover(
                event.clientX - this._sClientX,
                event.clientY - this._sClientY
            );

            return false;
        },

        // 结束拖拽
        // onend: function () {},
        end: function (event) {
            $(document)
            .unbind('mousemove', this.over)
            .unbind('mouseup', this.end);

            this.onend(event.clientX, event.clientY);
            return false;
        }

    };

    var $window = $(window),
        $document = $(document),
        html = document.documentElement,
        isIE6 = !('minWidth' in html.style),
        isLosecapture = !isIE6 && 'onlosecapture' in html,
        isSetCapture = 'setCapture' in html,
        dragstart = function () {
            return false
        };

    var dragInit = function (event) {

        var dragEvent = new DragEvent,
            api = artDialog.focus,
            dom = api.dom,
            $wrap = dom.wrap,
            $title = dom.title,
            $main = dom.main,
            wrap = $wrap[0],
            title = $title[0],
            main = $main[0],
            wrapStyle = wrap.style,
            mainStyle = main.style;


        var isResize = event.target === dom.se[0] ? true : false;
        var isFixed = wrap.style.position === 'fixed',
            minX = isFixed ? 0 : $document.scrollLeft(),
            minY = isFixed ? 0 : $document.scrollTop(),
            maxX = $window.width() - wrap.offsetWidth + minX,
            maxY = $window.height() - wrap.offsetHeight + minY;


        var startWidth, startHeight, startLeft, startTop;


        // 对话框准备拖动
        dragEvent.onstart = function (x, y) {

            if (isResize) {
                startWidth = main.offsetWidth;
                startHeight = main.offsetHeight;
            } else {
                startLeft = wrap.offsetLeft;
                startTop = wrap.offsetTop;
            };

            $document.bind('dblclick', dragEvent.end)
            .bind('dragstart', dragstart);

            if (isLosecapture) {
                $title.bind('losecapture', dragEvent.end)
            } else {
                $window.bind('blur', dragEvent.end)
            };

            isSetCapture && title.setCapture();

            $wrap.addClass('d-state-drag');
            api.focus();
        };

        // 对话框拖动进行中
        dragEvent.onover = function (x, y) {

            if (isResize) {
                var width = x + startWidth,
                    height = y + startHeight;

                wrapStyle.width = 'auto';
                mainStyle.width = Math.max(0, width) + 'px';
                wrapStyle.width = wrap.offsetWidth + 'px';

                mainStyle.height = Math.max(0, height) + 'px';

            } else {
                var left = Math.max(minX, Math.min(maxX, x + startLeft)),
                    top = Math.max(minY, Math.min(maxY, y + startTop));

                wrapStyle.left = left + 'px';
                wrapStyle.top = top + 'px';
            };


        };

        // 对话框拖动结束
        dragEvent.onend = function (x, y) {

            $document.unbind('dblclick', dragEvent.end)
            .unbind('dragstart', dragstart);

            if (isLosecapture) {
                $title.unbind('losecapture', dragEvent.end);
            } else {
                $window.unbind('blur', dragEvent.end)
            };

            isSetCapture && title.releaseCapture();

            $wrap.removeClass('d-state-drag');
        };


        dragEvent.start(event);

    };


    // 代理 mousedown 事件触发对话框拖动
    $(document).bind('mousedown', function (event) {
        var api = artDialog.focus;
        if (!api) return;

        var target = event.target,
            config = api.config,
            dom = api.dom;

        if (config.drag !== false && target === dom.title[0]
        || config.resize !== false && target === dom.se[0]) {
            dragInit(event);

            // 防止firefox与chrome滚屏
            return false;
        };
    });

});