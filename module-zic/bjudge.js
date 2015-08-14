define(function(require, exports) {

    var uaMatch = function (ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };

    var matched = uaMatch(navigator.userAgent);
    var browser = {};

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
    }

    if (browser.chrome) {
        browser.webkit = true;
    } else if (browser.webkit) {
        browser.safari = true;
    }

    exports.browser = browser;

    exports.JudgeIe = function(min,max){
        if (!browser.msie) return false;
        var ver = Math.floor(browser.version)
        if (ver >= min && ver <= max) return true
        return false
    }

    exports.IeVerClass = function () {
        if (!browser["msie"]) return;
        var classVal = "ie" + browser.version;
        var html = document.getElementsByTagName("html")[0];
        if (!html.className) {
            html.className = classVal;
        } else {
            html.className += " ";
            html.className += classVal;
        }
    }

})