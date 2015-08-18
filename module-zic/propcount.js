exports.run = function (oo) {
    var count = 0;
    for (var o in oo) {
        count++;
    }
    return count;
}