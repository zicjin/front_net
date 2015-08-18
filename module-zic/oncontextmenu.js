exports.run = function (arr) {
    document.oncontextmenu = function () {
        event.returnValue = false
    }
}