define(function (require, exports, module) {
    exports.run = function(){
        var bow = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? bow.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? bow.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? bow.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? bow.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? bow.safari = s[1] : 0;

        var html = document.getElementsByTagName("html")[0];
        if (bow.ie) {
            switch (bow.ie) {
                case "6.0":
                    window.bow = "ie6";
                    exports.addClass(html, "ie6");
                    break;
                case "7.0":
                    window.bow = "ie7";
                    exports.addClass(html, "ie6");
                    break;
                case "8.0":
                    window.bow = "ie8";
                    exports.addClass(html, "ie6");
                    break;
                case "9.0":
                    window.bow = "ie9";
                    exports.addClass(html, "ie6");                
                default:
                    window.bow = "ie10";
                    exports.addClass(html, "ie10");
            }
        } else if (bow.firefox) {
            window.bow = "mozilla";
            exports.addClass(html, "mozilla");
        } else if (bow.chrome) {
            window.bow = "chrome";
            exports.addClass(html, "chrome");
        } else if (bow.opera) {
            window.bow = "opera";
            exports.addClass(html, "opera");
        } else if (bow.safari){
            window.bow = "safari";
            exports.addClass(html, "safari");
        }

    }

    exports.addClass = function(element,value) {
        if (!element.className) {
            element.className = value;
        } else {
            element.className+= " ";
            element.className+= value;
        }
    }
    
});