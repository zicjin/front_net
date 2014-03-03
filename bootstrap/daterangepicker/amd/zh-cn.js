define(function (require, exports, module) {
    moment = require('moment')
    return {
        applyLabel: '确定',
        cancelLabel: '取消',
        fromLabel: '从',
        toLabel: '至',
        weekLabel: '周',
        customRangeLabel: '自定义',
        daysOfWeek: moment()._lang._weekdaysMin,
        monthNames: moment()._lang._monthsShort,
        firstDay: 1
    };
});