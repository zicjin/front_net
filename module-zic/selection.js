define(function (require, exports, module) {

    return function ($) {
        //$(this).get(0).options.length;
        
        $.fn.selVal = function (v) {
            if ($(this).val() != v) {
                $(this).val(v).trigger("change");
            }
        }

        $.fn.getSelectedIndex = function () {
            return $(this).get(0).selectedIndex;
        }

        $.fn.getSelectedText = function () {
            if ($(this).get(0).options.length < 2) {
                return "";
            }
            else {
                var index = $(this).getSelectedIndex();
                if (index == -1) index = 0;
                return $(this).get(0).options[index].text;
            }
        }

        $.fn.getSelectedValue = function () {
            if ($(this).get(0).options.length == 0) {
                return "";
            }
            else {
                return $(this).val();
            }
        }

        $.fn.setSelectedValue = function (value) {
            $(this).get(0).value = value;
        }

        $.fn.setSelectedText = function (text) {
            var isExist = false;
            var count = $(this).get(0).options.length;
            for (var i = 0; i < count; i++) {
                if ($(this).get(0).options[i].text == text) {
                    $(this).get(0).options[i].selected = true;
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                //alert("none exist");
            }
        }

        $.fn.setSelectedIndex = function (index) {
            var count = $(this).get(0).options.length;
            if (index >= count || index < 0) {
                alert("选中项索引超出范围");
            }
            else {
                $(this).get(0).selectedIndex = index;
            }
        }

        $.fn.isExistItem = function (value) {
            var isExist = false;
            var count = $(this).get(0).options.length;
            for (var i = 0; i < count; i++) {
                if ($(this).get(0).options[i].value == value) {
                    isExist = true;
                    break;
                }
            }
            return isExist;
        }

        $.fn.addOption = function (text, value) {
            if (this.isExistItem(value)) {
                alert("待添加项的值已存在");
            }
            else {
                $(this).get(0).options.add(new Option(text, value));
            }
        }

        $.fn.removeItem = function (value) {
            if (this.isExistItem(value)) {
                var count = $(this).get(0).options.length;
                for (var i = 0; i < count; i++) {
                    if ($(this).get(0).options[i].value == value) {
                        $(this).get(0).remove(i);
                        break;
                    }
                }
            }
            else {
                alert("待删除的项不存在!");
            }
        }

        $.fn.removeIndex = function (index) {
            var count = $(this).get(0).options.length;
            if (index >= count || index < 0) {
                alert("待删除项索引超出范围");
            }
            else {
                $(this).get(0).remove(index);
            }
        }

        $.fn.removeSelected = function () {
            var index = this.getSelectedIndex();
            this.removeIndex(index);
        }

        $.fn.clearAll = function () {
            $(this).get(0).options.length = 0;
        }
    }

});