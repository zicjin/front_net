define(function (require, exports) {
    
    //slice截取的是两个下标位置之间的元素
    //insert时插入参数下标的后面
    //remove时删除参数下标所代表的元素    
    exports.Arrayhelp = function () {
        Array.prototype.insertAt = function (index, value) {
            var part1 = this.slice(0, index);
            var part2 = this.slice(index);
            part1.push(value);
            return (part1.concat(part2));
        };
        Array.prototype.removeAt = function (index) {
            var part1 = this.slice(0, index + 1);
            var part2 = this.slice(index + 1);
            part1.pop();
            return (part1.concat(part2));
        }
    }

});