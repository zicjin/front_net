//slice截取的是两个下标位置之间的元素
//insert时插入参数下标的后面
//remove时删除参数下标所代表的元素    
exports.insertAt = function (array, index, value) {
    var part1 = array.slice(0, index);
    var part2 = array.slice(index);
    part1.push(value);
    return (part1.concat(part2));
};
exports.removeAt = function (array, index) {
    var part1 = array.slice(0, index + 1);
    var part2 = array.slice(index + 1);
    part1.pop();
    return (part1.concat(part2));
}

exports.addLoadEvent = function () {
    var oldonload = window.onload
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

exports.addClass = function (element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        element.className += " ";
        element.className += value;
    }
}

exports.insertAfter = function (newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

exports.getNextElement = function (node) {
    if (node.nodeType == 1) return node; if (node.nextSibling) {
        return getNextElement(node.nextSibling);
    }
}