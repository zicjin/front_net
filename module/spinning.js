define(function (require, exports, module) {

    var bjudge = require('../module-zic/bjudge')

    var TRANSFORM = bjudge.browser.webkit ? '-webkit-transform' :
                    bjudge.browser.mozilla ? '-moz-transform' :
                    bjudge.browser.opera ? '-o-transform' : 'transform'

    function random(x) { return Math.random() * x }


    function Spinning(container, opacity, rendomPosition) {
        this.container = $(container)
        this.icons = this.container.children()
        this.spinnings = []
        this.opacity = opacity ? opacity : .6
        this.rendomPosition = rendomPosition
    }

    Spinning.prototype.render = function () {
        this._init()
        this.container.show()
        this._spin()
    }

    Spinning.prototype._init = function (rendomPosition) {
        var spinnings = this.spinnings
        var opacity = this.opacity
        $(this.icons).each(function (n) {
            var startDeg = random(360)
            var node = $(this)
            var timer
            if (this.rendomPosition) {
                node.css({
                    top: random(40),
                    left: n * 50 + random(10)
                })
            }
            node.css({
                zIndex: 1000
            }).hover(
                function () {
                    node.fadeTo(250, 1)
                        .css('zIndex', 1001)
                        .css(TRANSFORM, 'rotate(0deg)')

                },
                function () {
                    node.fadeTo(250, opacity).css('zIndex', 1000)
                    timer && clearTimeout(timer)
                    timer = setTimeout(spin, Math.ceil(random(10000)))
                }
            )

            function spin() {
                node.css(TRANSFORM, 'rotate(' + startDeg + 'deg)')
            }

            spinnings[n] = spin
        })

        return this
    }

    Spinning.prototype._spin = function () {

        $(this.spinnings).each(function (i, fn) {
            setTimeout(fn, Math.ceil(random(3000)))
        })

        return this
    }


    module.exports = Spinning
});