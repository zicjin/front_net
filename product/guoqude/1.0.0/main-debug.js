define("product/guoqude/1.0.0/front_net/module-zic/jsonhelp-debug", [], function (require, exports) {
    exports.JsondatestrToObj = function (key, value) {
        var d;
        if (typeof value === 'string' && value.slice(0, 5) === 'Date(' && value.slice(-1) === ')') {
            d = new Date(value.slice(5, -1));
            if (d) {
                return d;
            }
        }
        return value;
    }

    exports.TextdatestrToObj = function (key, value) {
        var a;
        if (typeof value === 'string') {
            a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
            if (a) {
                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
            }
        }
        return value;
    }

});
define("product/guoqude/1.0.0/front_net/bootstrap/amd/bootstrap-dropdown-debug", [], function (require, exports, module) { return function (jQuery) {
/* ============================================================
 * bootstrap-dropdown.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
        $this.focus()
      }

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

      $items = $('[role=menu] li:not(.divider) a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    getParent($(toggle))
      .removeClass('open')
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)
    $parent.length || ($parent = $this.parent())

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html')
      .on('click.dropdown.data-api touchstart.dropdown.data-api', clearMenus)
    $('body')
      .on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
      .on('click.dropdown.data-api touchstart.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
      .on('keydown.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)
  })

}(jQuery);
}});

define("product/guoqude/1.0.0/front_net/bootstrap/amd/bootstrap-button-debug", [], function (require, exports, module) { return function (jQuery) {
/* ============================================================
 * bootstrap-button.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON DATA-API
  * =============== */

  $(function () {
    $('body').on('click.button.data-api', '[data-toggle^=button]', function ( e ) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      $btn.button('toggle')
    })
  })

}(jQuery);
}});

define("product/guoqude/1.0.0/front_net/bootstrap/amd/bootstrap-typeahead-zic-debug", [], function (require, exports, module) { return function (jQuery) {
/* =============================================================
 * bootstrap-typeahead.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup', $.proxy(this.keyup, this))
        .on('showAll', $.proxy(this.showAll, this)); //from zic's hack

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
  }

  , showAll: function () { //from zic's hack
      this.render(this.source).show();
  }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = !~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /*   TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}(jQuery);
}});
define("product/guoqude/1.0.0/front_net/bootstrap/amd/bootstrap-datepicker-debug", [], function (require, exports, module) {
    return function (jQuery) {
/* =========================================================
 * bootstrap-datepicker.js 
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
 
!function( $ ) {
	
	// Picker object
	
	var Datepicker = function(element, options){
		this.element = $(element);
		this.format = DPGlobal.parseFormat(options.format||this.element.data('date-format')||'mm/dd/yyyy');
		this.picker = $(DPGlobal.template)
							.appendTo('body')
							.on({
								click: $.proxy(this.click, this),
								mousedown: $.proxy(this.mousedown, this)
							});
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on') : false;
		
		if (this.isInput) {
			this.element.on({
				focus: $.proxy(this.show, this),
				blur: $.proxy(this.hide, this),
				keyup: $.proxy(this.update, this)
			});
		} else {
			if (this.component){
				this.component.on('click', $.proxy(this.show, this));
			} else {
				this.element.on('click', $.proxy(this.show, this));
			}
		}
		
		this.viewMode = 0;
		this.weekStart = options.weekStart||this.element.data('date-weekstart')||0;
		this.weekEnd = this.weekStart == 0 ? 6 : this.weekStart - 1;
		this.fillDow();
		this.fillMonths();
		this.update();
		this.showMode();
	};
	
	Datepicker.prototype = {
		constructor: Datepicker,
		
		show: function(e) {
			this.picker.show();
			this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
			this.place();
			$(window).on('resize', $.proxy(this.place, this));
			if (e ) {
				e.stopPropagation();
				e.preventDefault();
			}
			if (!this.isInput) {
				$(document).on('mousedown', $.proxy(this.hide, this));
			}
			this.element.trigger({
				type: 'show',
				date: this.date
			});
		},
		
		hide: function(){
			this.picker.hide();
			$(window).off('resize', this.place);
			this.viewMode = 0;
			this.showMode();
			if (!this.isInput) {
				$(document).off('mousedown', this.hide);
			}
			this.setValue();
			this.element.trigger({
				type: 'hide',
				date: this.date
			});
		},
		
		setValue: function() {
			var formated = DPGlobal.formatDate(this.date, this.format);
			if (!this.isInput) {
				if (this.component){
					this.element.find('input').prop('value', formated);
				}
				this.element.data('date', formated);
			} else {
				this.element.prop('value', formated);
			}
		},
		
		place: function(){
			var offset = this.component ? this.component.offset() : this.element.offset();
			this.picker.css({
				top: offset.top + this.height,
				left: offset.left
			});
		},
		
		update: function(){
			this.date = DPGlobal.parseDate(
				this.isInput ? this.element.prop('value') : this.element.data('date'),
				this.format
			);
			this.viewDate = new Date(this.date);
			this.fill();
		},
		
		fillDow: function(){
			var dowCnt = this.weekStart;
			var html = '<tr>';
			while (dowCnt < this.weekStart + 7) {
				html += '<th class="dow">'+DPGlobal.dates.daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},
		
		fillMonths: function(){
			var html = '';
			var i = 0
			while (i < 12) {
				html += '<span class="month">'+DPGlobal.dates.monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').append(html);
		},
		
		fill: function() {
			var d = new Date(this.viewDate),
				year = d.getFullYear(),
				month = d.getMonth(),
				currentDate = this.date.valueOf();
			this.picker.find('.datepicker-days th:eq(1)')
						.text(DPGlobal.dates.months[month]+' '+year);
			var prevMonth = new Date(year, month-1, 28,0,0,0,0),
				day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
			prevMonth.setDate(day);
			prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setDate(nextMonth.getDate() + 42);
			nextMonth = nextMonth.valueOf();
			html = [];
			var clsName;
			while(prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getDay() == this.weekStart) {
					html.push('<tr>');
				}
				clsName = '';
				if (prevMonth.getMonth() < month) {
					clsName += ' old';
				} else if (prevMonth.getMonth() > month) {
					clsName += ' new';
				}
				if (prevMonth.valueOf() == currentDate) {
					clsName += ' active';
				}
				html.push('<td class="day'+clsName+'">'+prevMonth.getDate() + '</td>');
				if (prevMonth.getDay() == this.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setDate(prevMonth.getDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
			var currentYear = this.date.getFullYear();
			
			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');
			if (currentYear == year) {
				months.eq(this.date.getMonth()).addClass('active');
			}
			
			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year'+(i == -1 || i == 10 ? ' old' : '')+(currentYear == year ? ' active' : '')+'">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		},
		
		click: function(e) {
			e.stopPropagation();
			e.preventDefault();
			var target = $(e.target).closest('span, td, th');
			if (target.length == 1) {
				switch(target[0].nodeName.toLowerCase()) {
					case 'th':
						switch(target[0].className) {
							case 'switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								this.viewDate['set'+DPGlobal.modes[this.viewMode].navFnc].call(
									this.viewDate,
									this.viewDate['get'+DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) + 
									DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1)
								);
								this.fill();
								break;
						}
						break;
					case 'span':
						if (target.is('.month')) {
							var month = target.parent().find('span').index(target);
							this.viewDate.setMonth(month);
						} else {
							var year = parseInt(target.text(), 10)||0;
							this.viewDate.setFullYear(year);
						}
						this.showMode(-1);
						this.fill();
						break;
					case 'td':
						if (target.is('.day')){
							var day = parseInt(target.text(), 10)||1;
							var month = this.viewDate.getMonth();
							if (target.is('.old')) {
								month -= 1;
							} else if (target.is('.new')) {
								month += 1;
							}
							var year = this.viewDate.getFullYear();
							this.date = new Date(year, month, day,0,0,0,0);
							this.viewDate = new Date(year, month, day,0,0,0,0);
							this.fill();
							this.setValue();
							this.element.trigger({
								type: 'changeDate',
								date: this.date
							});
						}
						break;
				}
			}
		},
		
		mousedown: function(e){
			e.stopPropagation();
			e.preventDefault();
		},
		
		showMode: function(dir) {
			if (dir) {
				this.viewMode = Math.max(0, Math.min(2, this.viewMode + dir));
			}
			this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
		}
	};
	
	$.fn.datepicker = function ( option ) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option == 'object' && option;
			if (!data) {
				$this.data('datepicker', (data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults,options))));
			}
			if (typeof option == 'string') data[option]();
		});
	};

	$.fn.datepicker.defaults = {
	};
	$.fn.datepicker.Constructor = Datepicker;
	
	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
		}],
		dates:{
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		},
		isLeapYear: function (year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
		},
		getDaysInMonth: function (year, month) {
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
		},
		parseFormat: function(format){
			var separator = format.match(/[.\/-].*?/),
				parts = format.split(/\W+/);
			if (!separator || !parts || parts.length == 0){
				throw new Error("Invalid date format.");
			}
			return {separator: separator, parts: parts};
		},
		parseDate: function(date, format) {
			var parts = date.split(format.separator),
				date = new Date(1970, 1, 1, 0, 0, 0),
				val;
			if (parts.length == format.parts.length) {
				for (var i=0, cnt = format.parts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10)||1;
					switch(format.parts[i]) {
						case 'dd':
						case 'd':
							date.setDate(val);
							break;
						case 'mm':
						case 'm':
							date.setMonth(val - 1);
							break;
						case 'yy':
							date.setFullYear(2000 + val);
							break;
						case 'yyyy':
							date.setFullYear(val);
							break;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format){
			var val = {
				d: date.getDate(),
				m: date.getMonth() + 1,
				yy: date.getFullYear().toString().substring(2),
				yyyy: date.getFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			var date = [];
			for (var i=0, cnt = format.parts.length; i < cnt; i++) {
				date.push(val[format.parts[i]]);
			}
			return date.join(format.separator);
		},
		headTemplate: '<thead>'+
							'<tr>'+
								'<th class="prev"><i class="icon-arrow-left"/></th>'+
								'<th colspan="5" class="switch"></th>'+
								'<th class="next"><i class="icon-arrow-right"/></th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
	};
	DPGlobal.template = '<div class="datepicker dropdown-menu">'+
							'<div class="datepicker-days">'+
								'<table class=" table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
								'</table>'+
							'</div>'+
						'</div>';

}( jQuery )

}});
define("product/guoqude/1.0.0/front_net/bootstrap/amd/bootstrap-alert-debug", [], function (require, exports, module) { return function (jQuery) {
/* ==========================================================
 * bootstrap-alert.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT DATA-API
  * ============== */

  $(function () {
    $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
  })

}(jQuery);
}});

define("product/guoqude/1.0.0/front_net/module/jquery-ui/amd/jquery.ui.core-debug", [], function (require, exports, module) { return function (jQuery) {
/*!
 * jQuery UI Core 1.9.2
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
(function( $, undefined ) {

var uuid = 0,
	runiqueId = /^ui-id-\d+$/;

// prevent duplicate loading
// this is only a problem because we proxy existing functions
// and we don't want to double proxy them
$.ui = $.ui || {};
if ( $.ui.version ) {
	return;
}

$.extend( $.ui, {
	version: "1.9.2",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	_focus: $.fn.focus,
	focus: function( delay, fn ) {
		return typeof delay === "number" ?
			this.each(function() {
				var elem = this;
				setTimeout(function() {
					$( elem ).focus();
					if ( fn ) {
						fn.call( elem );
					}
				}, delay );
			}) :
			this._focus.apply( this, arguments );
	},

	scrollParent: function() {
		var scrollParent;
		if (($.ui.ie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.css(this,'position')) && (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
			}).eq(0);
		}

		return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	},

	uniqueId: function() {
		return this.each(function() {
			if ( !this.id ) {
				this.id = "ui-id-" + (++uuid);
			}
		});
	},

	removeUniqueId: function() {
		return this.each(function() {
			if ( runiqueId.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	}
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap=#" + mapName + "]" )[0];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return $.expr.filters.visible( element ) &&
		!$( element ).parents().andSelf().filter(function() {
			return $.css( this, "visibility" ) === "hidden";
		}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support
$(function() {
	var body = document.body,
		div = body.appendChild( div = document.createElement( "div" ) );

	// access offsetHeight before setting the style to prevent a layout bug
	// in IE 9 which causes the element to continue to take up space even
	// after it is removed from the DOM (#8026)
	div.offsetHeight;

	$.extend( div.style, {
		minHeight: "100px",
		height: "auto",
		padding: 0,
		borderWidth: 0
	});

	$.support.minHeight = div.offsetHeight === 100;
	$.support.selectstart = "onselectstart" in div;

	// set display to none to avoid a layout bug in IE
	// http://dev.jquery.com/ticket/4014
	body.removeChild( div ).style.display = "none";
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
	$.fn.removeData = (function( removeData ) {
		return function( key ) {
			if ( arguments.length ) {
				return removeData.call( this, $.camelCase( key ) );
			} else {
				return removeData.call( this );
			}
		};
	})( $.fn.removeData );
}





// deprecated

(function() {
	var uaMatch = /msie ([\w.]+)/.exec( navigator.userAgent.toLowerCase() ) || [];
	$.ui.ie = uaMatch.length ? true : false;
	$.ui.ie6 = parseFloat( uaMatch[ 1 ], 10 ) === 6;
})();

$.fn.extend({
	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
	},

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	}
});

$.extend( $.ui, {
	// $.ui.plugin is deprecated.  Use the proxy pattern instead.
	plugin: {
		add: function( module, option, set ) {
			var i,
				proto = $.ui[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var i,
				set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) {
				return;
			}

			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},

	contains: $.contains,

	// only used by resizable
	hasScroll: function( el, a ) {

		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}

		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;

		if ( el[ scroll ] > 0 ) {
			return true;
		}

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	},

	// these are odd functions, fix the API or move into individual plugins
	isOverAxis: function( x, reference, size ) {
		//Determines when x coordinate is over "b" element axis
		return ( x > reference ) && ( x < ( reference + size ) );
	},
	isOver: function( y, x, top, left, height, width ) {
		//Determines when x, y coordinates is over "b" element
		return $.ui.isOverAxis( y, top, height ) && $.ui.isOverAxis( x, left, width );
	}
});

})( jQuery );
}});

define("product/guoqude/1.0.0/front_net/module/jquery-ui/amd/jquery.ui.widget-debug", [], function (require, exports, module) { return function (jQuery) {
/*!
 * jQuery UI Widget 1.9.2
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
(function( $, undefined ) {

var uuid = 0,
	slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( $.isFunction( value ) ) {
			prototype[ prop ] = (function() {
				var _super = function() {
						return base.prototype[ prop ].apply( this, arguments );
					},
					_superApply = function( args ) {
						return base.prototype[ prop ].apply( this, args );
					};
				return function() {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply( this, arguments );

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			})();
		}
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix : name
	}, prototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		// TODO remove widgetBaseClass, see #8155
		widgetBaseClass: fullName,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			// 1.9 BC for #7810
			// TODO remove dual storage
			$.data( element, this.widgetName, this );
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( value === undefined ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( value === undefined ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			// accept selectors, DOM elements
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && ( $.effects.effect[ effectName ] || $.uiBackCompat !== false && $.effects[ effectName ] ) ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

// DEPRECATED
if ( $.uiBackCompat !== false ) {
	$.Widget.prototype._getCreateOptions = function() {
		return $.metadata && $.metadata.get( this.element[0] )[ this.widgetName ];
	};
}

})( jQuery );
}});

define("product/guoqude/1.0.0/front_net/module/jquery-ui/amd/jquery.ui.mouse-debug", [], function (require, exports, module) { return function (jQuery) {
/*!
 * jQuery UI Mouse 1.9.2
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var mouseHandled = false;
$( document ).mouseup( function( e ) {
	mouseHandled = false;
});

$.widget("ui.mouse", {
	version: "1.9.2",
	options: {
		cancel: 'input,textarea,button,select,option',
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.bind('mousedown.'+this.widgetName, function(event) {
				return that._mouseDown(event);
			})
			.bind('click.'+this.widgetName, function(event) {
				if (true === $.data(event.target, that.widgetName + '.preventClickEvent')) {
					$.removeData(event.target, that.widgetName + '.preventClickEvent');
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind('.'+this.widgetName);
		if ( this._mouseMoveDelegate ) {
			$(document)
				.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
				.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);
		}
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		if( mouseHandled ) { return; }

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + '.preventClickEvent')) {
			$.removeData(event.target, this.widgetName + '.preventClickEvent');
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return that._mouseUp(event);
		};
		$(document)
			.bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// IE mouseup check - mouseup happened when mouse was out of window
		if ($.ui.ie && !(document.documentMode >= 9) && !event.button) {
			return this._mouseUp(event);
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + '.preventClickEvent', true);
			}

			this._mouseStop(event);
		}

		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(event) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(event) {},
	_mouseDrag: function(event) {},
	_mouseStop: function(event) {},
	_mouseCapture: function(event) { return true; }
});

})(jQuery);
}});

define("product/guoqude/1.0.0/front_net/module/jquery-ui/amd/jquery.ui.sortable-debug", [], function (require, exports, module) { return function (jQuery) {
/*!
 * jQuery UI Sortable 1.9.2
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget("ui.sortable", $.ui.mouse, {
	version: "1.9.2",
	widgetEventPrefix: "sort",
	ready: false,
	options: {
		appendTo: "parent",
		axis: false,
		connectWith: false,
		containment: false,
		cursor: 'auto',
		cursorAt: false,
		dropOnEmpty: true,
		forcePlaceholderSize: false,
		forceHelperSize: false,
		grid: false,
		handle: false,
		helper: "original",
		items: '> *',
		opacity: false,
		placeholder: false,
		revert: false,
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		scope: "default",
		tolerance: "intersect",
		zIndex: 1000
	},
	_create: function() {

		var o = this.options;
		this.containerCache = {};
		this.element.addClass("ui-sortable");

		//Get the items
		this.refresh();

		//Let's determine if the items are being displayed horizontally
		this.floating = this.items.length ? o.axis === 'x' || (/left|right/).test(this.items[0].item.css('float')) || (/inline|table-cell/).test(this.items[0].item.css('display')) : false;

		//Let's determine the parent's offset
		this.offset = this.element.offset();

		//Initialize mouse events for interaction
		this._mouseInit();

		//We're ready to go
		this.ready = true

	},

	_destroy: function() {
		this.element
			.removeClass("ui-sortable ui-sortable-disabled");
		this._mouseDestroy();

		for ( var i = this.items.length - 1; i >= 0; i-- )
			this.items[i].item.removeData(this.widgetName + "-item");

		return this;
	},

	_setOption: function(key, value){
		if ( key === "disabled" ) {
			this.options[ key ] = value;

			this.widget().toggleClass( "ui-sortable-disabled", !!value );
		} else {
			// Don't call widget base _setOption for disable as it adds ui-state-disabled class
			$.Widget.prototype._setOption.apply(this, arguments);
		}
	},

	_mouseCapture: function(event, overrideHandle) {
		var that = this;

		if (this.reverting) {
			return false;
		}

		if(this.options.disabled || this.options.type == 'static') return false;

		//We have to refresh the items data once first
		this._refreshItems(event);

		//Find out if the clicked node (or one of its parents) is a actual item in this.items
		var currentItem = null, nodes = $(event.target).parents().each(function() {
			if($.data(this, that.widgetName + '-item') == that) {
				currentItem = $(this);
				return false;
			}
		});
		if($.data(event.target, that.widgetName + '-item') == that) currentItem = $(event.target);

		if(!currentItem) return false;
		if(this.options.handle && !overrideHandle) {
			var validHandle = false;

			$(this.options.handle, currentItem).find("*").andSelf().each(function() { if(this == event.target) validHandle = true; });
			if(!validHandle) return false;
		}

		this.currentItem = currentItem;
		this._removeCurrentsFromItems();
		return true;

	},

	_mouseStart: function(event, overrideHandle, noActivation) {

		var o = this.options;
		this.currentContainer = this;

		//We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
		this.refreshPositions();

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Get the next scrolling parent
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.currentItem.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		// Only after we got the offset, we can change the helper's position to absolute
		// TODO: Still need to figure out a way to make relative sorting possible
		this.helper.css("position", "absolute");
		this.cssPosition = this.helper.css("position");

		//Generate the original position
		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if 'cursorAt' is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Cache the former DOM position
		this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };

		//If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this way
		if(this.helper[0] != this.currentItem[0]) {
			this.currentItem.hide();
		}

		//Create the placeholder
		this._createPlaceholder();

		//Set a containment if given in the options
		if(o.containment)
			this._setContainment();

		if(o.cursor) { // cursor option
			if ($('body').css("cursor")) this._storedCursor = $('body').css("cursor");
			$('body').css("cursor", o.cursor);
		}

		if(o.opacity) { // opacity option
			if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
			this.helper.css("opacity", o.opacity);
		}

		if(o.zIndex) { // zIndex option
			if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
			this.helper.css("zIndex", o.zIndex);
		}

		//Prepare scrolling
		if(this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML')
			this.overflowOffset = this.scrollParent.offset();

		//Call callbacks
		this._trigger("start", event, this._uiHash());

		//Recache the helper size
		if(!this._preserveHelperProportions)
			this._cacheHelperProportions();


		//Post 'activate' events to possible containers
		if(!noActivation) {
			 for (var i = this.containers.length - 1; i >= 0; i--) { this.containers[i]._trigger("activate", event, this._uiHash(this)); }
		}

		//Prepare possible droppables
		if($.ui.ddmanager)
			$.ui.ddmanager.current = this;

		if ($.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(this, event);

		this.dragging = true;

		this.helper.addClass("ui-sortable-helper");
		this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;

	},

	_mouseDrag: function(event) {

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		if (!this.lastPositionAbs) {
			this.lastPositionAbs = this.positionAbs;
		}

		//Do scrolling
		if(this.options.scroll) {
			var o = this.options, scrolled = false;
			if(this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML') {

				if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
				else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity)
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;

				if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
				else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity)
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;

			} else {

				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);

				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);

			}

			if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
				$.ui.ddmanager.prepareOffsets(this, event);
		}

		//Regenerate the absolute position used for position checks
		this.positionAbs = this._convertPositionTo("absolute");

		//Set the helper position
		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';

		//Rearrange
		for (var i = this.items.length - 1; i >= 0; i--) {

			//Cache variables and intersection, continue if no intersection
			var item = this.items[i], itemElement = item.item[0], intersection = this._intersectsWithPointer(item);
			if (!intersection) continue;

			// Only put the placeholder inside the current Container, skip all
			// items form other containers. This works because when moving
			// an item from one container to another the
			// currentContainer is switched before the placeholder is moved.
			//
			// Without this moving items in "sub-sortables" can cause the placeholder to jitter
			// beetween the outer and inner container.
			if (item.instance !== this.currentContainer) continue;

			if (itemElement != this.currentItem[0] //cannot intersect with itself
				&&	this.placeholder[intersection == 1 ? "next" : "prev"]()[0] != itemElement //no useless actions that have been done before
				&&	!$.contains(this.placeholder[0], itemElement) //no action if the item moved is the parent of the item checked
				&& (this.options.type == 'semi-dynamic' ? !$.contains(this.element[0], itemElement) : true)
				//&& itemElement.parentNode == this.placeholder[0].parentNode // only rearrange items within the same container
			) {

				this.direction = intersection == 1 ? "down" : "up";

				if (this.options.tolerance == "pointer" || this._intersectsWithSides(item)) {
					this._rearrange(event, item);
				} else {
					break;
				}

				this._trigger("change", event, this._uiHash());
				break;
			}
		}

		//Post events to containers
		this._contactContainers(event);

		//Interconnect with droppables
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

		//Call callbacks
		this._trigger('sort', event, this._uiHash());

		this.lastPositionAbs = this.positionAbs;
		return false;

	},

	_mouseStop: function(event, noPropagation) {

		if(!event) return;

		//If we are using droppables, inform the manager about the drop
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			$.ui.ddmanager.drop(this, event);

		if(this.options.revert) {
			var that = this;
			var cur = this.placeholder.offset();

			this.reverting = true;

			$(this.helper).animate({
				left: cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
				top: cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
			}, parseInt(this.options.revert, 10) || 500, function() {
				that._clear(event);
			});
		} else {
			this._clear(event, noPropagation);
		}

		return false;

	},

	cancel: function() {

		if(this.dragging) {

			this._mouseUp({ target: null });

			if(this.options.helper == "original")
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			else
				this.currentItem.show();

			//Post deactivating events to containers
			for (var i = this.containers.length - 1; i >= 0; i--){
				this.containers[i]._trigger("deactivate", null, this._uiHash(this));
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", null, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		if (this.placeholder) {
			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
			if(this.placeholder[0].parentNode) this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			if(this.options.helper != "original" && this.helper && this.helper[0].parentNode) this.helper.remove();

			$.extend(this, {
				helper: null,
				dragging: false,
				reverting: false,
				_noFinalSort: null
			});

			if(this.domPosition.prev) {
				$(this.domPosition.prev).after(this.currentItem);
			} else {
				$(this.domPosition.parent).prepend(this.currentItem);
			}
		}

		return this;

	},

	serialize: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected);
		var str = []; o = o || {};

		$(items).each(function() {
			var res = ($(o.item || this).attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/));
			if(res) str.push((o.key || res[1]+'[]')+'='+(o.key && o.expression ? res[1] : res[2]));
		});

		if(!str.length && o.key) {
			str.push(o.key + '=');
		}

		return str.join('&');

	},

	toArray: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected);
		var ret = []; o = o || {};

		items.each(function() { ret.push($(o.item || this).attr(o.attribute || 'id') || ''); });
		return ret;

	},

	/* Be careful with the following core functions */
	_intersectsWith: function(item) {

		var x1 = this.positionAbs.left,
			x2 = x1 + this.helperProportions.width,
			y1 = this.positionAbs.top,
			y2 = y1 + this.helperProportions.height;

		var l = item.left,
			r = l + item.width,
			t = item.top,
			b = t + item.height;

		var dyClick = this.offset.click.top,
			dxClick = this.offset.click.left;

		var isOverElement = (y1 + dyClick) > t && (y1 + dyClick) < b && (x1 + dxClick) > l && (x1 + dxClick) < r;

		if(	   this.options.tolerance == "pointer"
			|| this.options.forcePointerForContainers
			|| (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? 'width' : 'height'] > item[this.floating ? 'width' : 'height'])
		) {
			return isOverElement;
		} else {

			return (l < x1 + (this.helperProportions.width / 2) // Right Half
				&& x2 - (this.helperProportions.width / 2) < r // Left Half
				&& t < y1 + (this.helperProportions.height / 2) // Bottom Half
				&& y2 - (this.helperProportions.height / 2) < b ); // Top Half

		}
	},

	_intersectsWithPointer: function(item) {

		var isOverElementHeight = (this.options.axis === 'x') || $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
			isOverElementWidth = (this.options.axis === 'y') || $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
			isOverElement = isOverElementHeight && isOverElementWidth,
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (!isOverElement)
			return false;

		return this.floating ?
			( ((horizontalDirection && horizontalDirection == "right") || verticalDirection == "down") ? 2 : 1 )
			: ( verticalDirection && (verticalDirection == "down" ? 2 : 1) );

	},

	_intersectsWithSides: function(item) {

		var isOverBottomHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height/2), item.height),
			isOverRightHalf = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (this.floating && horizontalDirection) {
			return ((horizontalDirection == "right" && isOverRightHalf) || (horizontalDirection == "left" && !isOverRightHalf));
		} else {
			return verticalDirection && ((verticalDirection == "down" && isOverBottomHalf) || (verticalDirection == "up" && !isOverBottomHalf));
		}

	},

	_getDragVerticalDirection: function() {
		var delta = this.positionAbs.top - this.lastPositionAbs.top;
		return delta != 0 && (delta > 0 ? "down" : "up");
	},

	_getDragHorizontalDirection: function() {
		var delta = this.positionAbs.left - this.lastPositionAbs.left;
		return delta != 0 && (delta > 0 ? "right" : "left");
	},

	refresh: function(event) {
		this._refreshItems(event);
		this.refreshPositions();
		return this;
	},

	_connectWith: function() {
		var options = this.options;
		return options.connectWith.constructor == String
			? [options.connectWith]
			: options.connectWith;
	},

	_getItemsAsjQuery: function(connected) {

		var items = [];
		var queries = [];
		var connectWith = this._connectWith();

		if(connectWith && connected) {
			for (var i = connectWith.length - 1; i >= 0; i--){
				var cur = $(connectWith[i]);
				for (var j = cur.length - 1; j >= 0; j--){
					var inst = $.data(cur[j], this.widgetName);
					if(inst && inst != this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not('.ui-sortable-placeholder'), inst]);
					}
				};
			};
		}

		queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not('.ui-sortable-placeholder'), this]);

		for (var i = queries.length - 1; i >= 0; i--){
			queries[i][0].each(function() {
				items.push(this);
			});
		};

		return $(items);

	},

	_removeCurrentsFromItems: function() {

		var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

		this.items = $.grep(this.items, function (item) {
			for (var j=0; j < list.length; j++) {
				if(list[j] == item.item[0])
					return false;
			};
			return true;
		});

	},

	_refreshItems: function(event) {

		this.items = [];
		this.containers = [this];
		var items = this.items;
		var queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]];
		var connectWith = this._connectWith();

		if(connectWith && this.ready) { //Shouldn't be run the first time through due to massive slow-down
			for (var i = connectWith.length - 1; i >= 0; i--){
				var cur = $(connectWith[i]);
				for (var j = cur.length - 1; j >= 0; j--){
					var inst = $.data(cur[j], this.widgetName);
					if(inst && inst != this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
						this.containers.push(inst);
					}
				};
			};
		}

		for (var i = queries.length - 1; i >= 0; i--) {
			var targetData = queries[i][1];
			var _queries = queries[i][0];

			for (var j=0, queriesLength = _queries.length; j < queriesLength; j++) {
				var item = $(_queries[j]);

				item.data(this.widgetName + '-item', targetData); // Data for target checking (mouse manager)

				items.push({
					item: item,
					instance: targetData,
					width: 0, height: 0,
					left: 0, top: 0
				});
			};
		};

	},

	refreshPositions: function(fast) {

		//This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
		if(this.offsetParent && this.helper) {
			this.offset.parent = this._getParentOffset();
		}

		for (var i = this.items.length - 1; i >= 0; i--){
			var item = this.items[i];

			//We ignore calculating positions of all connected containers when we're not over them
			if(item.instance != this.currentContainer && this.currentContainer && item.item[0] != this.currentItem[0])
				continue;

			var t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

			if (!fast) {
				item.width = t.outerWidth();
				item.height = t.outerHeight();
			}

			var p = t.offset();
			item.left = p.left;
			item.top = p.top;
		};

		if(this.options.custom && this.options.custom.refreshContainers) {
			this.options.custom.refreshContainers.call(this);
		} else {
			for (var i = this.containers.length - 1; i >= 0; i--){
				var p = this.containers[i].element.offset();
				this.containers[i].containerCache.left = p.left;
				this.containers[i].containerCache.top = p.top;
				this.containers[i].containerCache.width	= this.containers[i].element.outerWidth();
				this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			};
		}

		return this;
	},

	_createPlaceholder: function(that) {
		that = that || this;
		var o = that.options;

		if(!o.placeholder || o.placeholder.constructor == String) {
			var className = o.placeholder;
			o.placeholder = {
				element: function() {

					var el = $(document.createElement(that.currentItem[0].nodeName))
						.addClass(className || that.currentItem[0].className+" ui-sortable-placeholder")
						.removeClass("ui-sortable-helper")[0];

					if(!className)
						el.style.visibility = "hidden";

					return el;
				},
				update: function(container, p) {

					// 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
					// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
					if(className && !o.forcePlaceholderSize) return;

					//If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
					if(!p.height()) { p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css('paddingTop')||0, 10) - parseInt(that.currentItem.css('paddingBottom')||0, 10)); };
					if(!p.width()) { p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css('paddingLeft')||0, 10) - parseInt(that.currentItem.css('paddingRight')||0, 10)); };
				}
			};
		}

		//Create the placeholder
		that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));

		//Append it after the actual current item
		that.currentItem.after(that.placeholder);

		//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
		o.placeholder.update(that, that.placeholder);

	},

	_contactContainers: function(event) {

		// get innermost container that intersects with item
		var innermostContainer = null, innermostIndex = null;


		for (var i = this.containers.length - 1; i >= 0; i--){

			// never consider a container that's located within the item itself
			if($.contains(this.currentItem[0], this.containers[i].element[0]))
				continue;

			if(this._intersectsWith(this.containers[i].containerCache)) {

				// if we've already found a container and it's more "inner" than this, then continue
				if(innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0]))
					continue;

				innermostContainer = this.containers[i];
				innermostIndex = i;

			} else {
				// container doesn't intersect. trigger "out" event if necessary
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", event, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		// if no intersecting containers found, return
		if(!innermostContainer) return;

		// move the item into the container if it's not there already
		if(this.containers.length === 1) {
			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
			this.containers[innermostIndex].containerCache.over = 1;
		} else {

			//When entering a new container, we will find the item with the least distance and append our item near it
			var dist = 10000; var itemWithLeastDistance = null;
			var posProperty = this.containers[innermostIndex].floating ? 'left' : 'top';
			var sizeProperty = this.containers[innermostIndex].floating ? 'width' : 'height';
			var base = this.positionAbs[posProperty] + this.offset.click[posProperty];
			for (var j = this.items.length - 1; j >= 0; j--) {
				if(!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) continue;
				if(this.items[j].item[0] == this.currentItem[0]) continue;
				var cur = this.items[j].item.offset()[posProperty];
				var nearBottom = false;
				if(Math.abs(cur - base) > Math.abs(cur + this.items[j][sizeProperty] - base)){
					nearBottom = true;
					cur += this.items[j][sizeProperty];
				}

				if(Math.abs(cur - base) < dist) {
					dist = Math.abs(cur - base); itemWithLeastDistance = this.items[j];
					this.direction = nearBottom ? "up": "down";
				}
			}

			if(!itemWithLeastDistance && !this.options.dropOnEmpty) //Check if dropOnEmpty is enabled
				return;

			this.currentContainer = this.containers[innermostIndex];
			itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
			this._trigger("change", event, this._uiHash());
			this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));

			//Update the placeholder
			this.options.placeholder.update(this.currentContainer, this.placeholder);

			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
			this.containers[innermostIndex].containerCache.over = 1;
		}


	},

	_createHelper: function(event) {

		var o = this.options;
		var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper == 'clone' ? this.currentItem.clone() : this.currentItem);

		if(!helper.parents('body').length) //Add the helper to the DOM if that didn't happen already
			$(o.appendTo != 'parent' ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);

		if(helper[0] == this.currentItem[0])
			this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };

		if(helper[0].style.width == '' || o.forceHelperSize) helper.width(this.currentItem.width());
		if(helper[0].style.height == '' || o.forceHelperSize) helper.height(this.currentItem.height());

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj == 'string') {
			obj = obj.split(' ');
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ('left' in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ('right' in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ('top' in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ('bottom' in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {


		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if((this.offsetParent[0] == document.body) //This needs to be actually done for all browsers, since pageX/pageY includes this information
		|| (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.ui.ie)) //Ugly IE fix
			po = { top: 0, left: 0 };

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition == "relative") {
			var p = this.currentItem.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),
			top: (parseInt(this.currentItem.css("marginTop"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var o = this.options;
		if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
		if(o.containment == 'document' || o.containment == 'window') this.containment = [
			0 - this.offset.relative.left - this.offset.parent.left,
			0 - this.offset.relative.top - this.offset.parent.top,
			$(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
			($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
		];

		if(!(/^(document|window|parent)$/).test(o.containment)) {
			var ce = $(o.containment)[0];
			var co = $(o.containment).offset();
			var over = ($(ce).css("overflow") != 'hidden');

			this.containment = [
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
			];
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top																	// The absolute mouse position
				+ this.offset.relative.top * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- ( ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left																// The absolute mouse position
				+ this.offset.relative.left * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- ( ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		// This is another very weird special case that only happens for relative elements:
		// 1. If the css position is relative
		// 2. and the scroll parent is the document or similar to the offset parent
		// we have to refresh the relative offset during the scroll so there are no jumps
		if(this.cssPosition == 'relative' && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options

			if(this.containment) {
				if(event.pageX - this.offset.click.left < this.containment[0]) pageX = this.containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < this.containment[1]) pageY = this.containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > this.containment[2]) pageX = this.containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > this.containment[3]) pageY = this.containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top : (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left : (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ( ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ( ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_rearrange: function(event, i, a, hardRefresh) {

		a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == 'down' ? i.item[0] : i.item[0].nextSibling));

		//Various things done here to improve the performance:
		// 1. we create a setTimeout, that calls refreshPositions
		// 2. on the instance, we have a counter variable, that get's higher after every append
		// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
		// 4. this lets only the last addition to the timeout stack through
		this.counter = this.counter ? ++this.counter : 1;
		var counter = this.counter;

		this._delay(function() {
			if(counter == this.counter) this.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
		});

	},

	_clear: function(event, noPropagation) {

		this.reverting = false;
		// We delay all events that have to be triggered to after the point where the placeholder has been removed and
		// everything else normalized again
		var delayedTriggers = [];

		// We first have to update the dom position of the actual currentItem
		// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
		if(!this._noFinalSort && this.currentItem.parent().length) this.placeholder.before(this.currentItem);
		this._noFinalSort = null;

		if(this.helper[0] == this.currentItem[0]) {
			for(var i in this._storedCSS) {
				if(this._storedCSS[i] == 'auto' || this._storedCSS[i] == 'static') this._storedCSS[i] = '';
			}
			this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
		} else {
			this.currentItem.show();
		}

		if(this.fromOutside && !noPropagation) delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });
		if((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !noPropagation) delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changed

		// Check if the items Container has Changed and trigger appropriate
		// events.
		if (this !== this.currentContainer) {
			if(!noPropagation) {
				delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });
				delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.currentContainer));
				delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.currentContainer));
			}
		}


		//Post events to containers
		for (var i = this.containers.length - 1; i >= 0; i--){
			if(!noPropagation) delayedTriggers.push((function(c) { return function(event) { c._trigger("deactivate", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
			if(this.containers[i].containerCache.over) {
				delayedTriggers.push((function(c) { return function(event) { c._trigger("out", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
				this.containers[i].containerCache.over = 0;
			}
		}

		//Do what was originally in plugins
		if(this._storedCursor) $('body').css("cursor", this._storedCursor); //Reset cursor
		if(this._storedOpacity) this.helper.css("opacity", this._storedOpacity); //Reset opacity
		if(this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == 'auto' ? '' : this._storedZIndex); //Reset z-index

		this.dragging = false;
		if(this.cancelHelperRemoval) {
			if(!noPropagation) {
				this._trigger("beforeStop", event, this._uiHash());
				for (var i=0; i < delayedTriggers.length; i++) { delayedTriggers[i].call(this, event); }; //Trigger all delayed events
				this._trigger("stop", event, this._uiHash());
			}

			this.fromOutside = false;
			return false;
		}

		if(!noPropagation) this._trigger("beforeStop", event, this._uiHash());

		//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
		this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

		if(this.helper[0] != this.currentItem[0]) this.helper.remove(); this.helper = null;

		if(!noPropagation) {
			for (var i=0; i < delayedTriggers.length; i++) { delayedTriggers[i].call(this, event); }; //Trigger all delayed events
			this._trigger("stop", event, this._uiHash());
		}

		this.fromOutside = false;
		return true;

	},

	_trigger: function() {
		if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
			this.cancel();
		}
	},

	_uiHash: function(_inst) {
		var inst = _inst || this;
		return {
			helper: inst.helper,
			placeholder: inst.placeholder || $([]),
			position: inst.position,
			originalPosition: inst.originalPosition,
			offset: inst.positionAbs,
			item: inst.currentItem,
			sender: _inst ? _inst.element : null
		};
	}

});

})(jQuery);
}});

define("product/guoqude/1.0.0/front_net/module/artDialog5/amd/artDialog5-debug", ["gallery/jquery/1.8.3/jquery-debug"], function (require, exports, module) {

var $ = require('gallery/jquery/1.8.3/jquery-debug').sub();

/*!
* artDialog 5.0.1
* Date: 2012-07-16
* https://github.com/aui/artDialog, http://aui.github.com/artDialog
* (c) 2009-2012 TangBin, http://www.planeArt.cn
*
* This is licensed under the GNU LGPL, version 2.1 or later.
* For details, see: http://creativecommons.org/licenses/LGPL/2.1/
*/

// artDialog 只支持 xhtml 1.0 或者以上的 DOCTYPE 声明
if (document.compatMode === 'BackCompat') {
    throw new Error('artDialog: Document types require more than xhtml1.0');
};

var _singleton,
    _count = 0,
    _expando = 'artDialog' + + new Date,
    _isIE6 = window.VBArray && !window.XMLHttpRequest,
    _isMobile = 'createTouch' in document && !('onmousemove' in document)
        || /(iPhone|iPad|iPod)/i.test(navigator.userAgent),
    _isFixed = !_isIE6 && !_isMobile;

    
var artDialog = function (config, ok, cancel) {

    config = config || {};
    
    if (typeof config === 'string' || config.nodeType === 1) {
    
        config = {content: config, fixed: !_isMobile};
    };
    
    
    var api, defaults = artDialog.defaults;
    var elem = config.follow = this.nodeType === 1 && this || config.follow;
        
    
    // 合并默认配置
    for (var i in defaults) {
        if (config[i] === undefined) {
            config[i] = defaults[i];
        };
    };

    
    config.id = elem && elem[_expando + 'follow'] || config.id || _expando + _count;
    api = artDialog.list[config.id];
    
    
    
    if (api) {
        if (elem) {
            api.follow(elem)
        };
        api.zIndex().focus();
        return api;
    };
    
    
    
    // 目前主流移动设备对fixed支持不好
    if (!_isFixed) {
        config.fixed = false;
    };
    
    // !$.isArray(config.button)
    if (!config.button || !config.button.push) {
        config.button = [];
    };
    
    
    // 确定按钮
    if (ok !== undefined) {
        config.ok = ok;
    };
    
    if (config.ok) {
        config.button.push({
            id: 'ok',
            value: config.okValue,
            callback: config.ok,
            focus: true
        });
    };
    
    
    // 取消按钮
    if (cancel !== undefined) {
        config.cancel = cancel;
    };
    
    if (config.cancel) {
        config.button.push({
            id: 'cancel',
            value: config.cancelValue,
            callback: config.cancel
        });
    };
    
    // 更新 zIndex 全局配置
    artDialog.defaults.zIndex = config.zIndex;
    
    _count ++;

    return artDialog.list[config.id] = _singleton ?
        _singleton.constructor(config) : new artDialog.fn.constructor(config);
};

artDialog.version = '5.0.1';

artDialog.fn = artDialog.prototype = {
    
    /** @inner */
    constructor: function (config) {
        var dom;
        
        this.closed = false;
        this.config = config;
        this.dom = dom = this.dom || this._getDom();
        
        config.skin && dom.wrap.addClass(config.skin);
        
        dom.wrap.css('position', config.fixed ? 'fixed' : 'absolute');
        dom.close[config.cancel === false ? 'hide' : 'show']();
        dom.content.css('padding', config.padding);
        
        this.button.apply(this, config.button);
        
        this.title(config.title)
        .content(config.content)
        .size(config.width, config.height)
        .time(config.time);
        
        this._reset();
        
        this.zIndex();
        config.lock && this.lock();
        
        this._addEvent();
        this[config.visible ? 'visible' : 'hidden']().focus();
        
        _singleton = null;
        
        config.initialize && config.initialize.call(this);
        
        return this;
    },
    
    
    /**
    * 设置内容
    * @param	{String, HTMLElement, Object}	内容 (可选)
    */
    content: function (message) {
    
        var prev, next, parent, display,
            that = this,
            $content = this.dom.content,
            content = $content[0];
        
        
        if (this._elemBack) {
            this._elemBack();
            delete this._elemBack;
        };
        
        
        if (typeof message === 'string') {
        
            $content.html(message);
        } else
        
        if (message && message.nodeType === 1) {
        
            // 让传入的元素在对话框关闭后可以返回到原来的地方
            display = message.style.display;
            prev = message.previousSibling;
            next = message.nextSibling;
            parent = message.parentNode;
            
            this._elemBack = function () {
                if (prev && prev.parentNode) {
                    prev.parentNode.insertBefore(message, prev.nextSibling);
                } else if (next && next.parentNode) {
                    next.parentNode.insertBefore(message, next);
                } else if (parent) {
                    parent.appendChild(message);
                };
                message.style.display = display;
                that._elemBack = null;
            };
            
            $content.html('');
            content.appendChild(message);
            $(message).show();
            
        };
        
        this._reset();
        
        return this;
    },
    
    
    /**
    * 设置标题
    * @param	{String, Boolean}	标题内容. 为 false 则隐藏标题栏
    */
    title: function (content) {
    
        var dom = this.dom,
            outer = dom.outer,
            $title = dom.title,
            className = 'd-state-noTitle';
        
        if (content === false) {
            $title.hide().html('');
            outer.addClass(className);
        } else {
            $title.show().html(content);
            outer.removeClass(className);
        };
        
        return this;
    },
    

    /** @inner 位置居中 */
    position: function () {
    
        var dom = this.dom,
            wrap = dom.wrap[0],
            $window = dom.window,
            $document = dom.document,
            fixed = this.config.fixed,
            dl = fixed ? 0 : $document.scrollLeft(),
            dt = fixed ? 0 : $document.scrollTop(),
            ww = $window.width(),
            wh = $window.height(),
            ow = wrap.offsetWidth,
            oh = wrap.offsetHeight,
            left = (ww - ow) / 2 + dl,
            top = top = (oh < 4 * wh / 7 ? wh * 0.382 - oh / 2 : (wh - oh) / 2) + dt,
            style = wrap.style;

        style.left = Math.max(left, dl) + 'px';
        style.top = Math.max(top, dt) + 'px';
        
        return this;
    },
    
    
    /**
    *	尺寸
    *	@param	{Number, String}	宽度
    *	@param	{Number, String}	高度
    */
    size: function (width, height) {
    
        var style = this.dom.main[0].style;
        
        if (typeof width === 'number') {
            width = width + 'px';
        };
        
        if (typeof height === 'number') {
            height = height + 'px';
        };
            
        style.width = width;
        style.height = height;
        
        return this;
    },
    
    
    /**
    * 跟随元素
    * @param	{HTMLElement}
    */
    follow: function (elem) {
    
        var $elem = $(elem),
            config = this.config;
        
        
        // 隐藏元素不可用
        if (!elem || !elem.offsetWidth && !elem.offsetHeight) {
        
            return this.position(this._left, this._top);
        };
        
        var fixed = config.fixed,
            expando = _expando + 'follow',
            dom = this.dom,
            $window = dom.window,
            $document = dom.document,
            winWidth = $window.width(),
            winHeight = $window.height(),
            docLeft =  $document.scrollLeft(),
            docTop = $document.scrollTop(),
            offset = $elem.offset(),
            width = elem.offsetWidth,
            height = elem.offsetHeight,
            left = fixed ? offset.left - docLeft : offset.left,
            top = fixed ? offset.top - docTop : offset.top,
            wrap = this.dom.wrap[0],
            style = wrap.style,
            wrapWidth = wrap.offsetWidth,
            wrapHeight = wrap.offsetHeight,
            setLeft = left - (wrapWidth - width) / 2,
            setTop = top + height,
            dl = fixed ? 0 : docLeft,
            dt = fixed ? 0 : docTop;
            
            
        setLeft = setLeft < dl ? left :
        (setLeft + wrapWidth > winWidth) && (left - wrapWidth > dl)
        ? left - wrapWidth + width
        : setLeft;

        
        setTop = (setTop + wrapHeight > winHeight + dt)
        && (top - wrapHeight > dt)
        ? top - wrapHeight
        : setTop;
        
        
        style.left = setLeft + 'px';
        style.top = setTop + 'px';
        
        
        this._follow && this._follow.removeAttribute(expando);
        this._follow = elem;
        elem[expando] = config.id;
        
        return this;
    },
    
    
    /**
    * 自定义按钮
    * @example
        button({
            value: 'login',
            callback: function () {},
            disabled: false,
            focus: true
        }, .., ..)
    */
    button: function () {
    
        var dom = this.dom,
            $buttons = dom.buttons,
            elem = $buttons[0],
            strongButton = 'd-state-highlight',
            listeners = this._listeners = this._listeners || {},
            ags = [].slice.call(arguments);
            
        var i = 0, val, value, id, isNewButton, button;
        
        for (; i < ags.length; i ++) {
            
            val = ags[i];
            
            value = val.value;
            id = val.id || value;
            isNewButton = !listeners[id];
            button = !isNewButton ? listeners[id].elem : document.createElement('input');
            
            button.type = 'button';
            button.className = 'd-button';
                    
            if (!listeners[id]) {
                listeners[id] = {};
            };
            
            if (value) {
                button.value = value;
            };
            
            if (val.width) {
                button.style.width = val.width;
            };
            
            if (val.callback) {
                listeners[id].callback = val.callback;
            };
            
            if (val.focus) {
                this._focus && this._focus.removeClass(strongButton);
                this._focus = $(button).addClass(strongButton);
                this.focus();
            };
            
            button[_expando + 'callback'] = id;
            button.disabled = !!val.disabled;
            

            if (isNewButton) {
                listeners[id].elem = button;
                elem.appendChild(button);
            };
        };
        
        $buttons[0].style.display = ags.length ? '' : 'none';
        
        return this;
    },
    
    
    /** 显示对话框 */
    visible: function () {
        //this.dom.wrap.show();
        this.dom.wrap.css('visibility', 'visible');
        this.dom.outer.addClass('d-state-visible');
        
        if (this._isLock) {
            this._lockMask.show();
        };
        
        return this;
    },
    
    
    /** 隐藏对话框 */
    hidden: function () {
        //this.dom.wrap.hide();
        this.dom.wrap.css('visibility', 'hidden');
        this.dom.outer.removeClass('d-state-visible');
        
        if (this._isLock) {
            this._lockMask.hide();
        };
        
        return this;
    },
    
    
    /** 关闭对话框 */
    close: function () {
    
        if (this.closed) {
            return this;
        };
    
        var dom = this.dom,
            $wrap = dom.wrap,
            list = artDialog.list,
            beforeunload = this.config.beforeunload,
            follow = this.config.follow;
        
        if (beforeunload && beforeunload.call(this) === false) {
            return this;
        };
        
        
        if (artDialog.focus === this) {
            artDialog.focus = null;
        };
        
        
        if (follow) {
            follow.removeAttribute(_expando + 'follow');
        };
        
        
        if (this._elemBack) {
            this._elemBack();
        };
        
        
        
        this.time();
        this.unlock();
        this._removeEvent();
        delete list[this.config.id];

        
        if (_singleton) {
        
            $wrap.remove();
        
        // 使用单例模式
        } else {
        
            _singleton = this;
            
            dom.title.html('');
            dom.content.html('');
            dom.buttons.html('');
            
            $wrap[0].className = $wrap[0].style.cssText = '';
            dom.outer[0].className = 'd-outer';
            
            $wrap.css({
                left: 0,
                top: 0,
                position: _isFixed ? 'fixed' : 'absolute'
            });
            
            for (var i in this) {
                if (this.hasOwnProperty(i) && i !== 'dom') {
                    delete this[i];
                };
            };
            
            this.hidden();
            
        };
        
        this.closed = true;
        return this;
    },
    
    
    /**
    * 定时关闭
    * @param	{Number}	单位毫秒, 无参数则停止计时器
    */
    time: function (time) {
    
        var that = this,
            timer = this._timer;
            
        timer && clearTimeout(timer);
        
        if (time) {
            this._timer = setTimeout(function(){
                that._click('cancel');
            }, time);
        };
        
        
        return this;
    },
    
    /** @inner 设置焦点 */
    focus: function () {

        if (this.config.focus) {
            //setTimeout(function () {
                try {
                    var elem = this._focus && this._focus[0] || this.dom.close[0];
                    elem && elem.focus();
                // IE对不可见元素设置焦点会报错
                } catch (e) {};
            //}, 0);
        };
        
        return this;
    },
    
    
    /** 置顶对话框 */
    zIndex: function () {
    
        var dom = this.dom,
            top = artDialog.focus,
            index = artDialog.defaults.zIndex ++;
        
        // 设置叠加高度
        dom.wrap.css('zIndex', index);
        this._lockMask && this._lockMask.css('zIndex', index - 1);
        
        // 设置最高层的样式
        top && top.dom.outer.removeClass('d-state-focus');
        artDialog.focus = this;
        dom.outer.addClass('d-state-focus');
        
        return this;
    },
    
    
    /** 设置屏锁 */
    lock: function () {
    
        if (this._isLock) {
            return this;
        };
        
        var that = this,
            config = this.config,
            dom = this.dom,
            div = document.createElement('div'),
            $div = $(div),
            index = artDialog.defaults.zIndex - 1;
        
        this.zIndex();
        dom.outer.addClass('d-state-lock');
            
        $div.css({
            zIndex: index,
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        }).addClass('d-mask');
        
        if (!_isFixed) {
            $div.css({
                position: 'absolute',
                width: $(window).width() + 'px',
                height: $(document).height() + 'px'
            });
        };
        
            
        $div.bind('dblclick', function () {
            that._click('cancel');
        });
        
        document.body.appendChild(div);
        
        this._lockMask = $div;
        this._isLock = true;
        
        return this;
    },
    
    
    /** 解开屏锁 */
    unlock: function () {

        if (!this._isLock) {
            return this;
        };
        
        this._lockMask.unbind();
        this._lockMask.hide();
        this._lockMask.remove();
        
        this.dom.outer.removeClass('d-state-lock');
        this._isLock = false;

        return this;
    },
    
    
    // 获取元素
    _getDom: function () {
    
        var body = document.body;
        
        if (!body) {
            throw new Error('artDialog: "documents.body" not ready');
        };
        
        var wrap = document.createElement('div');
            
        wrap.style.cssText = 'position:absolute;left:0;top:0';
        wrap.innerHTML = artDialog._templates;
        body.insertBefore(wrap, body.firstChild);
        
        var name,
            i = 0,
            dom = {},
            els = wrap.getElementsByTagName('*'),
            elsLen = els.length;
            
        for (; i < elsLen; i ++) {
            name = els[i].className.split('d-')[1];
            if (name) {
                dom[name] = $(els[i]);
            };
        };
        
        dom.window = $(window);
        dom.document = $(document);
        dom.wrap = $(wrap);
        
        return dom;
    },
    
    
    // 按钮回调函数触发
    _click: function (id) {
    
        var fn = this._listeners[id] && this._listeners[id].callback;
            
        return typeof fn !== 'function' || fn.call(this) !== false ?
            this.close() : this;
    },
    
    
    // 重置位置
    _reset: function () {
        var elem = this.config.follow;
        elem ? this.follow(elem) : this.position();
    },
    
    
    // 事件代理
    _addEvent: function () {
    
        var that = this,
            dom = this.dom;
        
        
        // 监听点击
        dom.wrap
        .bind('click', function (event) {
        
            var target = event.target, callbackID;
            
            // IE BUG
            if (target.disabled) {
                return false;
            };
            
            if (target === dom.close[0]) {
                that._click('cancel');
                return false;
            } else {
                callbackID = target[_expando + 'callback'];
                callbackID && that._click(callbackID);
            };
            
        })
        .bind('mousedown', function () {
            that.zIndex();
        });
        
    },
    
    
    // 卸载事件代理
    _removeEvent: function () {
        this.dom.wrap.unbind();
    }
    
};

artDialog.fn.constructor.prototype = artDialog.fn;



$.fn.dialog = $.fn.artDialog = function () {
    var config = arguments;
    this[this.live ? 'live' : 'bind']('click', function () {
        artDialog.apply(this, config);
        return false;
    });
    return this;
};



/** 最顶层的对话框API */
artDialog.focus = null;



/**
* 根据 ID 获取某对话框 API
* @param	{String}	对话框 ID
* @return	{Object}	对话框 API (实例)
*/
artDialog.get = function (id) {
    return id === undefined
    ? artDialog.list
    : artDialog.list[id];
};

artDialog.list = {};



// 全局快捷键
$(document).bind('keydown', function (event) {
    var target = event.target,
        nodeName = target.nodeName,
        rinput = /^input|textarea$/i,
        api = artDialog.focus,
        keyCode = event.keyCode;

    if (!api || !api.config.esc || rinput.test(nodeName) && target.type !== 'button') {
        return;
    };
    
    // ESC
    keyCode === 27 && api._click('cancel');
});



// 浏览器窗口改变后重置对话框位置
$(window).bind('resize', function () {
    var dialogs = artDialog.list;
    for (var id in dialogs) {
        dialogs[id]._reset();
    };
});



// XHTML 模板
// 使用 uglifyjs 压缩能够预先处理"+"号合并字符串
// @see	http://marijnhaverbeke.nl/uglifyjs
artDialog._templates = 
'<div class="d-outer">'
+	'<table class="d-border">'
+		'<tbody>'
+			'<tr>'
+				'<td class="d-nw"></td>'
+				'<td class="d-n"></td>'
+				'<td class="d-ne"></td>'
+			'</tr>'
+			'<tr>'
+				'<td class="d-w"></td>'
+				'<td class="d-c">'
+					'<div class="d-inner">'
+					'<table class="d-dialog">'
+						'<tbody>'
+							'<tr>'
+								'<td class="d-header">'
+									'<div class="d-titleBar">'
+										'<div class="d-title"></div>'
+										'<a class="d-close" href="javascript:/*artDialog*/;">'
+											'\xd7'
+										'</a>'
+									'</div>'
+								'</td>'
+							'</tr>'
+							'<tr>'
+								'<td class="d-main">'
+									'<div class="d-content"></div>'
+								'</td>'
+							'</tr>'
+							'<tr>'
+								'<td class="d-footer">'
+									'<div class="d-buttons"></div>'
+								'</td>'
+							'</tr>'
+						'</tbody>'
+					'</table>'
+					'</div>'
+				'</td>'
+				'<td class="d-e"></td>'
+			'</tr>'
+			'<tr>'
+				'<td class="d-sw"></td>'
+				'<td class="d-s"></td>'
+				'<td class="d-se"></td>'
+			'</tr>'
+		'</tbody>'
+	'</table>'
+'</div>';



/**
 * 默认配置
 */
artDialog.defaults = {

    // 消息内容
    content: '<div class="d-loading"><span>loading..</span></div>',
    
    // 标题
    title: 'message',
    
    // 自定义按钮
    button: null,
    
    // 确定按钮回调函数
    ok: null,
    
    // 取消按钮回调函数
    cancel: null,
    
    // 对话框初始化后执行的函数
    initialize: null,
    
    // 对话框关闭前执行的函数
    beforeunload: null,
    
    // 确定按钮文本
    okValue: 'ok',
    
    // 取消按钮文本
    cancelValue: 'cancel',
    
    // 内容宽度
    width: 'auto',
    
    // 内容高度
    height: 'auto',
    
    // 内容与边界填充距离
    padding: '20px 25px',
    
    // 皮肤名(多皮肤共存预留接口)
    skin: null,
    
    // 自动关闭时间
    time: null,
    
    // 是否支持Esc键关闭
    esc: true,
    
    // 是否支持对话框按钮自动聚焦
    focus: true,
    
    // 初始化后是否显示对话框
    visible: true,
    
    // 让对话框跟随某元素
    follow: null,
    
    // 是否锁屏
    lock: false,
    
    // 是否固定定位
    fixed: false,
    
    // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
    zIndex: 1987
    
};

this.artDialog = $.dialog = $.artDialog = artDialog;


/* 更新记录

1.  follow 不再支持 String 类型
2.  button 参数只支持 Array 类型
3.  button name 成员改成 value
4.  button 增加 id 成员
5.  okVal 参数更名为 okValue, 默认值由 '确定' 改为 'ok'
6.  cancelVal 参数更名为 cancelValue, 默认值由 '取消' 改为 'cancel'
6.  close 参数更名为 beforeunload
7.  init 参数更名为 initialize
8.  title 参数默认值由 '消息' 改为 'message'
9.  time 参数与方法参数单位由秒改为毫秒
10. hide 参数方法更名为 hidden
11. 内部为皮肤增加动态样式 d-state-visible 类
12. 给遮罩增添样式 d-mask 类
13. background 参数被取消, 由 CSS 文件定义
14. opacity 参数被取消, 由 CSS 文件定义
15. 取消拖动特性，改由插件支持
16. 取消 left 与 top 参数
17. 取消对 ie6 提供 fixed 支持，自动转换为 absolute
18. 取消对 ie6 提供 alpha png 支持
19. 取消对 ie6 提供 select 标签遮盖支持
20. 增加 focus 参数
21. 取消 position 方法
22. 取消对 <script type="text/dialog"></script> 的支持
23. 取消对 iframe 的支持
24. title 方法不支持空参数
25. content 方法不支持空参数
26. button 方法的参数不支持数组类型
27. 判断 DOCTYPE, 对 xhtml1.0 以下的页面报告错误
28. 修复 IE8 动态等新内容时没有撑开对话框高度，特意为 ie8 取消 .d-content { display:inline-block }
29. show 参数与方法更名为 visible
30. 修正重复调用 close 方法出现的错误
31. 修正设定了follow后再使用content()方法导致其居中的问题

*/

module.exports = $;

});
define("product/guoqude/1.0.0/front_net/module/chosen/chosen-debug", ["gallery/jquery/1.8.3/jquery-debug"], function (require, exports, module) {
var jQuery = require('gallery/jquery/1.8.3/jquery-debug').sub();

// Chosen, a Select Box Enhancer for jQuery and Protoype
// by Patrick Filler for Harvest, http://getharvest.com
// 
// Version 0.9.8
// Full source at https://github.com/harvesthq/chosen
// Copyright (c) 2011 Harvest http://getharvest.com

// MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
// This file is generated by `cake build`, do not edit it by hand.
(function() {
  var SelectParser;

  SelectParser = (function() {

    function SelectParser() {
      this.options_index = 0;
      this.parsed = [];
    }

    SelectParser.prototype.add_node = function(child) {
      if (child.nodeName === "OPTGROUP") {
        return this.add_group(child);
      } else {
        return this.add_option(child);
      }
    };

    SelectParser.prototype.add_group = function(group) {
      var group_position, option, _i, _len, _ref, _results;
      group_position = this.parsed.length;
      this.parsed.push({
        array_index: group_position,
        group: true,
        label: group.label,
        children: 0,
        disabled: group.disabled
      });
      _ref = group.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        _results.push(this.add_option(option, group_position, group.disabled));
      }
      return _results;
    };

    SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
      if (option.nodeName === "OPTION") {
        if (option.text !== "") {
          if (group_position != null) this.parsed[group_position].children += 1;
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            value: option.value,
            text: option.text,
            html: option.innerHTML,
            selected: option.selected,
            disabled: group_disabled === true ? group_disabled : option.disabled,
            group_array_index: group_position,
            classes: option.className,
            style: option.style.cssText
          });
        } else {
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            empty: true
          });
        }
        return this.options_index += 1;
      }
    };

    return SelectParser;

  })();

  SelectParser.select_to_array = function(select) {
    var child, parser, _i, _len, _ref;
    parser = new SelectParser();
    _ref = select.childNodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      parser.add_node(child);
    }
    return parser.parsed;
  };

  this.SelectParser = SelectParser;

}).call(this);

/*
Chosen source: generate output using 'cake build'
Copyright (c) 2011 by Harvest
*/

(function() {
  var AbstractChosen, root;

  root = this;

  AbstractChosen = (function() {

    function AbstractChosen(form_field, options) {
      this.form_field = form_field;
      this.options = options != null ? options : {};
      this.set_default_values();
      this.is_multiple = this.form_field.multiple;
      this.set_default_text();
      this.setup();
      this.set_up_html();
      this.register_observers();
      this.finish_setup();
    }

    AbstractChosen.prototype.set_default_values = function() {
      var _this = this;
      this.click_test_action = function(evt) {
        return _this.test_active_click(evt);
      };
      this.activate_action = function(evt) {
        return _this.activate_field(evt);
      };
      this.active_field = false;
      this.mouse_on_container = false;
      this.results_showing = false;
      this.result_highlighted = null;
      this.result_single_selected = null;
      this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
      this.disable_search_threshold = this.options.disable_search_threshold || 0;
      this.search_contains = this.options.search_contains || false;
      this.choices = 0;
      this.single_backstroke_delete = this.options.single_backstroke_delete || false;
      return this.max_selected_options = this.options.max_selected_options || Infinity;
    };

    AbstractChosen.prototype.set_default_text = function() {
      if (this.form_field.getAttribute("data-placeholder")) {
          this.default_text = this.form_field.getAttribute("data-placeholder");
      } else if (this.is_multiple) {
        this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || "Select Some Options";
      } else {
        this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || "Select an Option";
      }
      return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || "No results match";
    };

    AbstractChosen.prototype.mouse_enter = function() {
      return this.mouse_on_container = true;
    };

    AbstractChosen.prototype.mouse_leave = function() {
      return this.mouse_on_container = false;
    };

    AbstractChosen.prototype.input_focus = function(evt) {
      var _this = this;
      if (!this.active_field) {
        return setTimeout((function() {
          return _this.container_mousedown();
        }), 50);
      }
    };

    AbstractChosen.prototype.input_blur = function(evt) {
      var _this = this;
      if (!this.mouse_on_container) {
        this.active_field = false;
        return setTimeout((function() {
          return _this.blur_test();
        }), 100);
      }
    };

    AbstractChosen.prototype.result_add_option = function(option) {
      var classes, style;
      if (!option.disabled) {
        option.dom_id = this.container_id + "_o_" + option.array_index;
        classes = option.selected && this.is_multiple ? [] : ["active-result"];
        if (option.selected) classes.push("result-selected");
        if (option.group_array_index != null) classes.push("group-option");
        if (option.classes !== "") classes.push(option.classes);
        style = option.style.cssText !== "" ? " style=\"" + option.style + "\"" : "";
        return '<li id="' + option.dom_id + '" class="' + classes.join(' ') + '"' + style + '>' + option.html + '</li>';
      } else {
        return "";
      }
    };

    AbstractChosen.prototype.results_update_field = function() {
      if (!this.is_multiple) this.results_reset_cleanup();
      this.result_clear_highlight();
      this.result_single_selected = null;
      return this.results_build();
    };

    AbstractChosen.prototype.results_toggle = function() {
      if (this.results_showing) {
        return this.results_hide();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.results_search = function(evt) {
      if (this.results_showing) {
        return this.winnow_results();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.keyup_checker = function(evt) {
      var stroke, _ref;
      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
      this.search_field_scale();
      switch (stroke) {
        case 8:
          if (this.is_multiple && this.backstroke_length < 1 && this.choices > 0) {
            return this.keydown_backstroke();
          } else if (!this.pending_backstroke) {
            this.result_clear_highlight();
            return this.results_search();
          }
          break;
        case 13:
          evt.preventDefault();
          if (this.results_showing) return this.result_select(evt);
          break;
        case 27:
          if (this.results_showing) this.results_hide();
          return true;
        case 9:
        case 38:
        case 40:
        case 16:
        case 91:
        case 17:
          break;
        default:
          return this.results_search();
      }
    };

    AbstractChosen.prototype.generate_field_id = function() {
      var new_id;
      new_id = this.generate_random_id();
      this.form_field.id = new_id;
      return new_id;
    };

    AbstractChosen.prototype.generate_random_char = function() {
      var chars, newchar, rand;
      chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      rand = Math.floor(Math.random() * chars.length);
      return newchar = chars.substring(rand, rand + 1);
    };

    return AbstractChosen;

  })();

  root.AbstractChosen = AbstractChosen;

}).call(this);

/*
Chosen source: generate output using 'cake build'
Copyright (c) 2011 by Harvest
*/

(function() {
  var $, Chosen, get_side_border_padding, root,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  root = this;

  $ = jQuery;

  $.fn.extend({
    chosen: function(options) {
      if ($.browser.msie && ($.browser.version === "6.0" || $.browser.version === "7.0")) {
        return this;
      }
      return this.each(function(input_field) {
        var $this;
        $this = $(this);
        if (!$this.hasClass("chzn-done")) {
          return $this.data('chosen', new Chosen(this, options));
        }
      });
    }
  });

  Chosen = (function(_super) {

    __extends(Chosen, _super);

    function Chosen() {
      Chosen.__super__.constructor.apply(this, arguments);
    }

    Chosen.prototype.setup = function() {
      this.form_field_jq = $(this.form_field);
      this.current_value = this.form_field_jq.val();
      return this.is_rtl = this.form_field_jq.hasClass("chzn-rtl");
    };

    Chosen.prototype.finish_setup = function() {
      return this.form_field_jq.addClass("chzn-done");
    };

    Chosen.prototype.set_up_html = function() {
      var container_div, dd_top, dd_width, sf_width;
      this.container_id = this.form_field.id.length ? this.form_field.id.replace(/[^\w]/g, '_') : this.generate_field_id();
      this.container_id += "_chzn";
      this.f_width = this.form_field_jq.outerWidth();
      container_div = $("<div />", {
        id: this.container_id,
        "class": "chzn-container fn-vam " + (this.is_rtl ? ' chzn-rtl' : ''), //zic add 'fn-vam'
        style: 'width: ' + this.f_width + 'px;'
      });
      if (this.is_multiple) {
        container_div.html('<ul class="chzn-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chzn-drop" style="left:-9000px;"><ul class="chzn-results"></ul></div>');
      } else {
        container_div.html('<a href="javascript:void(0)" class="chzn-single chzn-default"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chzn-drop" style="left:-9000px;"><div class="chzn-search"><input type="text" autocomplete="off" /></div><ul class="chzn-results"></ul></div>');
      }
      this.form_field_jq.hide().after(container_div);
      this.container = $('#' + this.container_id);
      this.container.addClass("chzn-container-" + (this.is_multiple ? "multi" : "single"));
      this.dropdown = this.container.find('div.chzn-drop').first();
      dd_top = this.container.height();
      dd_width = this.f_width - get_side_border_padding(this.dropdown);
      this.dropdown.css({
        "width": dd_width + "px",
        "top": dd_top + "px"
      });
      this.search_field = this.container.find('input').first();
      this.search_results = this.container.find('ul.chzn-results').first();
      this.search_field_scale();
      this.search_no_results = this.container.find('li.no-results').first();
      if (this.is_multiple) {
        this.search_choices = this.container.find('ul.chzn-choices').first();
        this.search_container = this.container.find('li.search-field').first();
      } else {
        this.search_container = this.container.find('div.chzn-search').first();
        this.selected_item = this.container.find('.chzn-single').first();
        sf_width = dd_width - get_side_border_padding(this.search_container) - get_side_border_padding(this.search_field);
        this.search_field.css({
          "width": sf_width + "px"
        });
      }
      this.results_build();
      this.set_tab_index();
      return this.form_field_jq.trigger("liszt:ready", {
        chosen: this
      });
    };

    Chosen.prototype.register_observers = function() {
      var _this = this;
      this.container.mousedown(function(evt) {
        return _this.container_mousedown(evt);
      });
      this.container.mouseup(function(evt) {
        return _this.container_mouseup(evt);
      });
      this.container.mouseenter(function(evt) {
        return _this.mouse_enter(evt);
      });
      this.container.mouseleave(function(evt) {
        return _this.mouse_leave(evt);
      });
      this.search_results.mouseup(function(evt) {
        return _this.search_results_mouseup(evt);
      });
      this.search_results.mouseover(function(evt) {
        return _this.search_results_mouseover(evt);
      });
      this.search_results.mouseout(function(evt) {
        return _this.search_results_mouseout(evt);
      });
      this.form_field_jq.bind("liszt:updated", function(evt) {
        return _this.results_update_field(evt);
      });
      this.search_field.blur(function(evt) {
        return _this.input_blur(evt);
      });
      this.search_field.keyup(function(evt) {
        return _this.keyup_checker(evt);
      });
      this.search_field.keydown(function(evt) {
        return _this.keydown_checker(evt);
      });
      if (this.is_multiple) {
        this.search_choices.click(function(evt) {
          return _this.choices_click(evt);
        });
        return this.search_field.focus(function(evt) {
          return _this.input_focus(evt);
        });
      } else {
        return this.container.click(function(evt) {
          return evt.preventDefault();
        });
      }
    };

    Chosen.prototype.search_field_disabled = function() {
      this.is_disabled = this.form_field_jq[0].disabled;
      if (this.is_disabled) {
        this.container.addClass('chzn-disabled');
        this.search_field[0].disabled = true;
        if (!this.is_multiple) {
          this.selected_item.unbind("focus", this.activate_action);
        }
        return this.close_field();
      } else {
        this.container.removeClass('chzn-disabled');
        this.search_field[0].disabled = false;
        if (!this.is_multiple) {
          return this.selected_item.bind("focus", this.activate_action);
        }
      }
    };

    Chosen.prototype.container_mousedown = function(evt) {
      var target_closelink;
      if (!this.is_disabled) {
        target_closelink = evt != null ? ($(evt.target)).hasClass("search-choice-close") : false;
        if (evt && evt.type === "mousedown" && !this.results_showing) {
          evt.stopPropagation();
        }
        if (!this.pending_destroy_click && !target_closelink) {
          if (!this.active_field) {
            if (this.is_multiple) this.search_field.val("");
            $(document).click(this.click_test_action);
            this.results_show();
          } else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chzn-single").length)) {
            evt.preventDefault();
            this.results_toggle();
          }
          return this.activate_field();
        } else {
          return this.pending_destroy_click = false;
        }
      }
    };

    Chosen.prototype.container_mouseup = function(evt) {
      if (evt.target.nodeName === "ABBR" && !this.is_disabled) {
        return this.results_reset(evt);
      }
    };

    Chosen.prototype.blur_test = function(evt) {
      if (!this.active_field && this.container.hasClass("chzn-container-active")) {
        return this.close_field();
      }
    };

    Chosen.prototype.close_field = function() {
      $(document).unbind("click", this.click_test_action);
      if (!this.is_multiple) {
        this.selected_item.attr("tabindex", this.search_field.attr("tabindex"));
        this.search_field.attr("tabindex", -1);
      }
      this.active_field = false;
      this.results_hide();
      this.container.removeClass("chzn-container-active");
      this.winnow_results_clear();
      this.clear_backstroke();
      this.show_search_field_default();
      return this.search_field_scale();
    };

    Chosen.prototype.activate_field = function() {
      if (!this.is_multiple && !this.active_field) {
        this.search_field.attr("tabindex", this.selected_item.attr("tabindex"));
        this.selected_item.attr("tabindex", -1);
      }
      this.container.addClass("chzn-container-active");
      this.active_field = true;
      this.search_field.val(this.search_field.val());
      return this.search_field.focus();
    };

    Chosen.prototype.test_active_click = function(evt) {
      if ($(evt.target).parents('#' + this.container_id).length) {
        return this.active_field = true;
      } else {
        return this.close_field();
      }
    };

    Chosen.prototype.results_build = function() {
      var content, data, _i, _len, _ref;
      this.parsing = true;
      this.results_data = root.SelectParser.select_to_array(this.form_field);
      if (this.is_multiple && this.choices > 0) {
        this.search_choices.find("li.search-choice").remove();
        this.choices = 0;
      } else if (!this.is_multiple) {
        this.selected_item.addClass("chzn-default").find("span").text(this.default_text);
        if (this.form_field.options.length <= this.disable_search_threshold) {
          this.container.addClass("chzn-container-single-nosearch");
        } else {
          this.container.removeClass("chzn-container-single-nosearch");
        }
      }
      content = '';
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        if (data.group) {
          content += this.result_add_group(data);
        } else if (!data.empty) {
          content += this.result_add_option(data);
          if (data.selected && this.is_multiple) {
            this.choice_build(data);
          } else if (data.selected && !this.is_multiple) {
            this.selected_item.removeClass("chzn-default").find("span").text(data.text);
            if (this.allow_single_deselect) this.single_deselect_control_build();
          }
        }
      }
      this.search_field_disabled();
      this.show_search_field_default();
      this.search_field_scale();
      this.search_results.html(content);
      return this.parsing = false;
    };

    Chosen.prototype.result_add_group = function(group) {
      if (!group.disabled) {
        group.dom_id = this.container_id + "_g_" + group.array_index;
        return '<li id="' + group.dom_id + '" class="group-result">' + $("<div />").text(group.label).html() + '</li>';
      } else {
        return "";
      }
    };

    Chosen.prototype.result_do_highlight = function(el) {
      var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
      if (el.length) {
        this.result_clear_highlight();
        this.result_highlight = el;
        this.result_highlight.addClass("highlighted");
        maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
        visible_top = this.search_results.scrollTop();
        visible_bottom = maxHeight + visible_top;
        high_top = this.result_highlight.position().top + this.search_results.scrollTop();
        high_bottom = high_top + this.result_highlight.outerHeight();
        if (high_bottom >= visible_bottom) {
          return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
        } else if (high_top < visible_top) {
          return this.search_results.scrollTop(high_top);
        }
      }
    };

    Chosen.prototype.result_clear_highlight = function() {
      if (this.result_highlight) this.result_highlight.removeClass("highlighted");
      return this.result_highlight = null;
    };

    Chosen.prototype.results_show = function() {
      var dd_top;
      if (!this.is_multiple) {
        this.selected_item.addClass("chzn-single-with-drop");
        if (this.result_single_selected) {
          this.result_do_highlight(this.result_single_selected);
        }
      } else if (this.max_selected_options <= this.choices) {
        this.form_field_jq.trigger("liszt:maxselected", {
          chosen: this
        });
        return false;
      }
      dd_top = this.is_multiple ? this.container.height() : this.container.height() - 1;
      this.form_field_jq.trigger("liszt:showing_dropdown", {
        chosen: this
      });
      this.dropdown.css({
        "top": dd_top + "px",
        "left": 0
      });
      this.results_showing = true;
      this.search_field.focus();
      this.search_field.val(this.search_field.val());
      return this.winnow_results();
    };

    Chosen.prototype.results_hide = function() {
      if (!this.is_multiple) {
        this.selected_item.removeClass("chzn-single-with-drop");
      }
      this.result_clear_highlight();
      this.form_field_jq.trigger("liszt:hiding_dropdown", {
        chosen: this
      });
      this.dropdown.css({
        "left": "-9000px"
      });
      return this.results_showing = false;
    };

    Chosen.prototype.set_tab_index = function(el) {
      var ti;
      if (this.form_field_jq.attr("tabindex")) {
        ti = this.form_field_jq.attr("tabindex");
        this.form_field_jq.attr("tabindex", -1);
        if (this.is_multiple) {
          return this.search_field.attr("tabindex", ti);
        } else {
          this.selected_item.attr("tabindex", ti);
          return this.search_field.attr("tabindex", -1);
        }
      }
    };

    Chosen.prototype.show_search_field_default = function() {
      if (this.is_multiple && this.choices < 1 && !this.active_field) {
        this.search_field.val(this.default_text);
        return this.search_field.addClass("default");
      } else {
        this.search_field.val("");
        return this.search_field.removeClass("default");
      }
    };

    Chosen.prototype.search_results_mouseup = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target.length) {
        this.result_highlight = target;
        return this.result_select(evt);
      }
    };

    Chosen.prototype.search_results_mouseover = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target) return this.result_do_highlight(target);
    };

    Chosen.prototype.search_results_mouseout = function(evt) {
      if ($(evt.target).hasClass("active-result" || $(evt.target).parents('.active-result').first())) {
        return this.result_clear_highlight();
      }
    };

    Chosen.prototype.choices_click = function(evt) {
      evt.preventDefault();
      if (this.active_field && !($(evt.target).hasClass("search-choice" || $(evt.target).parents('.search-choice').first)) && !this.results_showing) {
        return this.results_show();
      }
    };

    Chosen.prototype.choice_build = function(item) {
      var choice_id, link,
        _this = this;
      if (this.is_multiple && this.max_selected_options <= this.choices) {
        this.form_field_jq.trigger("liszt:maxselected", {
          chosen: this
        });
        return false;
      }
      choice_id = this.container_id + "_c_" + item.array_index;
      this.choices += 1;
      this.search_container.before('<li class="search-choice" id="' + choice_id + '"><span>' + item.html + '</span><a href="javascript:void(0)" class="search-choice-close" rel="' + item.array_index + '"></a></li>');
      link = $('#' + choice_id).find("a").first();
      return link.click(function(evt) {
        return _this.choice_destroy_link_click(evt);
      });
    };

    Chosen.prototype.choice_destroy_link_click = function(evt) {
      evt.preventDefault();
      if (!this.is_disabled) {
        this.pending_destroy_click = true;
        return this.choice_destroy($(evt.target));
      } else {
        return evt.stopPropagation;
      }
    };

    Chosen.prototype.choice_destroy = function(link) {
      this.choices -= 1;
      this.show_search_field_default();
      if (this.is_multiple && this.choices > 0 && this.search_field.val().length < 1) {
        this.results_hide();
      }
      this.result_deselect(link.attr("rel"));
      return link.parents('li').first().remove();
    };

    Chosen.prototype.results_reset = function() {
      this.form_field.options[0].selected = true;
      this.selected_item.find("span").text(this.default_text);
      if (!this.is_multiple) this.selected_item.addClass("chzn-default");
      this.show_search_field_default();
      this.results_reset_cleanup();
      this.form_field_jq.trigger("change");
      if (this.active_field) return this.results_hide();
    };

    Chosen.prototype.results_reset_cleanup = function() {
      return this.selected_item.find("abbr").remove();
    };

    Chosen.prototype.result_select = function(evt) {
      var high, high_id, item, position;
      if (this.result_highlight) {
        high = this.result_highlight;
        high_id = high.attr("id");
        this.result_clear_highlight();
        if (this.is_multiple) {
          this.result_deactivate(high);
        } else {
          this.search_results.find(".result-selected").removeClass("result-selected");
          this.result_single_selected = high;
          this.selected_item.removeClass("chzn-default");
        }
        high.addClass("result-selected");
        position = high_id.substr(high_id.lastIndexOf("_") + 1);
        item = this.results_data[position];
        item.selected = true;
        this.form_field.options[item.options_index].selected = true;
        if (this.is_multiple) {
          this.choice_build(item);
        } else {
          this.selected_item.find("span").first().text(item.text);
          if (this.allow_single_deselect) this.single_deselect_control_build();
        }
        if (!(evt.metaKey && this.is_multiple)) this.results_hide();
        this.search_field.val("");
        if (this.is_multiple || this.form_field_jq.val() !== this.current_value) {
          this.form_field_jq.trigger("change", {
            'selected': this.form_field.options[item.options_index].value
          });
        }
        this.current_value = this.form_field_jq.val();
        return this.search_field_scale();
      }
    };

    Chosen.prototype.result_activate = function(el) {
      return el.addClass("active-result");
    };

    Chosen.prototype.result_deactivate = function(el) {
      return el.removeClass("active-result");
    };

    Chosen.prototype.result_deselect = function(pos) {
      var result, result_data;
      result_data = this.results_data[pos];
      result_data.selected = false;
      this.form_field.options[result_data.options_index].selected = false;
      result = $("#" + this.container_id + "_o_" + pos);
      result.removeClass("result-selected").addClass("active-result").show();
      this.result_clear_highlight();
      this.winnow_results();
      this.form_field_jq.trigger("change", {
        deselected: this.form_field.options[result_data.options_index].value
      });
      return this.search_field_scale();
    };

    Chosen.prototype.single_deselect_control_build = function() {
      if (this.allow_single_deselect && this.selected_item.find("abbr").length < 1) {
        return this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
      }
    };

    Chosen.prototype.winnow_results = function() {
      var found, option, part, parts, regex, regexAnchor, result, result_id, results, searchText, startpos, text, zregex, _i, _j, _len, _len2, _ref;
      this.no_results_clear();
      results = 0;
      searchText = this.search_field.val() === this.default_text ? "" : $('<div/>').text($.trim(this.search_field.val())).html();
      regexAnchor = this.search_contains ? "" : "^";
      regex = new RegExp(regexAnchor + searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
      zregex = new RegExp(searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        if (!option.disabled && !option.empty) {
          if (option.group) {
            $('#' + option.dom_id).css('display', 'none');
          } else if (!(this.is_multiple && option.selected)) {
            found = false;
            result_id = option.dom_id;
            result = $("#" + result_id);
            if (regex.test(option.html)) {
              found = true;
              results += 1;
            } else if (option.html.indexOf(" ") >= 0 || option.html.indexOf("[") === 0) {
              parts = option.html.replace(/\[|\]/g, "").split(" ");
              if (parts.length) {
                for (_j = 0, _len2 = parts.length; _j < _len2; _j++) {
                  part = parts[_j];
                  if (regex.test(part)) {
                    found = true;
                    results += 1;
                  }
                }
              }
            }
            if (found) {
              if (searchText.length) {
                startpos = option.html.search(zregex);
                text = option.html.substr(0, startpos + searchText.length) + '</em>' + option.html.substr(startpos + searchText.length);
                text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
              } else {
                text = option.html;
              }
              result.html(text);
              this.result_activate(result);
              if (option.group_array_index != null) {
                $("#" + this.results_data[option.group_array_index].dom_id).css('display', 'list-item');
              }
            } else {
              if (this.result_highlight && result_id === this.result_highlight.attr('id')) {
                this.result_clear_highlight();
              }
              this.result_deactivate(result);
            }
          }
        }
      }
      if (results < 1 && searchText.length) {
        return this.no_results(searchText);
      } else {
        return this.winnow_results_set_highlight();
      }
    };

    Chosen.prototype.winnow_results_clear = function() {
      var li, lis, _i, _len, _results;
      this.search_field.val("");
      lis = this.search_results.find("li");
      _results = [];
      for (_i = 0, _len = lis.length; _i < _len; _i++) {
        li = lis[_i];
        li = $(li);
        if (li.hasClass("group-result")) {
          _results.push(li.css('display', 'auto'));
        } else if (!this.is_multiple || !li.hasClass("result-selected")) {
          _results.push(this.result_activate(li));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Chosen.prototype.winnow_results_set_highlight = function() {
      var do_high, selected_results;
      if (!this.result_highlight) {
        selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
        do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
        if (do_high != null) return this.result_do_highlight(do_high);
      }
    };

    Chosen.prototype.no_results = function(terms) {
      var no_results_html;
      no_results_html = $('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>');
      no_results_html.find("span").first().html(terms);
      return this.search_results.append(no_results_html);
    };

    Chosen.prototype.no_results_clear = function() {
      return this.search_results.find(".no-results").remove();
    };

    Chosen.prototype.keydown_arrow = function() {
      var first_active, next_sib;
      if (!this.result_highlight) {
        first_active = this.search_results.find("li.active-result").first();
        if (first_active) this.result_do_highlight($(first_active));
      } else if (this.results_showing) {
        next_sib = this.result_highlight.nextAll("li.active-result").first();
        if (next_sib) this.result_do_highlight(next_sib);
      }
      if (!this.results_showing) return this.results_show();
    };

    Chosen.prototype.keyup_arrow = function() {
      var prev_sibs;
      if (!this.results_showing && !this.is_multiple) {
        return this.results_show();
      } else if (this.result_highlight) {
        prev_sibs = this.result_highlight.prevAll("li.active-result");
        if (prev_sibs.length) {
          return this.result_do_highlight(prev_sibs.first());
        } else {
          if (this.choices > 0) this.results_hide();
          return this.result_clear_highlight();
        }
      }
    };

    Chosen.prototype.keydown_backstroke = function() {
      if (this.pending_backstroke) {
        this.choice_destroy(this.pending_backstroke.find("a").first());
        return this.clear_backstroke();
      } else {
        this.pending_backstroke = this.search_container.siblings("li.search-choice").last();
        if (this.single_backstroke_delete) {
          return this.keydown_backstroke();
        } else {
          return this.pending_backstroke.addClass("search-choice-focus");
        }
      }
    };

    Chosen.prototype.clear_backstroke = function() {
      if (this.pending_backstroke) {
        this.pending_backstroke.removeClass("search-choice-focus");
      }
      return this.pending_backstroke = null;
    };

    Chosen.prototype.keydown_checker = function(evt) {
      var stroke, _ref;
      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
      this.search_field_scale();
      if (stroke !== 8 && this.pending_backstroke) this.clear_backstroke();
      switch (stroke) {
        case 8:
          this.backstroke_length = this.search_field.val().length;
          break;
        case 9:
          if (this.results_showing && !this.is_multiple) this.result_select(evt);
          this.mouse_on_container = false;
          break;
        case 13:
          evt.preventDefault();
          break;
        case 38:
          evt.preventDefault();
          this.keyup_arrow();
          break;
        case 40:
          this.keydown_arrow();
          break;
      }
    };

    Chosen.prototype.search_field_scale = function() {
      var dd_top, div, h, style, style_block, styles, w, _i, _len;
      if (this.is_multiple) {
        h = 0;
        w = 0;
        style_block = "position:absolute; left: -1000px; top: -1000px; display:none;";
        styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
        for (_i = 0, _len = styles.length; _i < _len; _i++) {
          style = styles[_i];
          style_block += style + ":" + this.search_field.css(style) + ";";
        }
        div = $('<div />', {
          'style': style_block
        });
        div.text(this.search_field.val());
        $('body').append(div);
        w = div.width() + 25;
        div.remove();
        if (w > this.f_width - 10) w = this.f_width - 10;
        this.search_field.css({
          'width': w + 'px'
        });
        dd_top = this.container.height();
        return this.dropdown.css({
          "top": dd_top + "px"
        });
      }
    };

    Chosen.prototype.generate_random_id = function() {
      var string;
      string = "sel" + this.generate_random_char() + this.generate_random_char() + this.generate_random_char();
      while ($("#" + string).length > 0) {
        string += this.generate_random_char();
      }
      return string;
    };

    return Chosen;

  })(AbstractChosen);

  get_side_border_padding = function(elmt) {
    var side_border_padding;
    return side_border_padding = elmt.outerWidth() - elmt.width();
  };

  root.get_side_border_padding = get_side_border_padding;

}).call(this);

module.exports = jQuery;

});
define("product/guoqude/1.0.0/front_net/module/masonry-debug", ["gallery/jquery/1.8.3/jquery-debug"], function (require, exports, module) {
var jQuery = require('gallery/jquery/1.8.3/jquery-debug').sub();

/**
 * jQuery Masonry v2.1.03
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2011 David DeSandro
 */

/*jshint browser: true, curly: true, eqeqeq: true, forin: false, immed: false, newcap: true, noempty: true, strict: true, undef: true */
/*global jQuery: false */

(function( window, $, undefined ){

  'use strict';

  /*
   * smartresize: debounced resize event for jQuery
   *
   * latest version and complete README available on Github:
   * https://github.com/louisremi/jquery.smartresize.js
   *
   * Copyright 2011 @louis_remi
   * Licensed under the MIT license.
   */

  var $event = $.event,
      resizeTimeout;

  $event.special.smartresize = {
    setup: function() {
      $(this).bind( "resize", $event.special.smartresize.handler );
    },
    teardown: function() {
      $(this).unbind( "resize", $event.special.smartresize.handler );
    },
    handler: function( event, execAsap ) {
      // Save the context
      var context = this,
          args = arguments;

      // set correct event type
      event.type = "smartresize";

      if ( resizeTimeout ) { clearTimeout( resizeTimeout ); }
      resizeTimeout = setTimeout(function() {
        jQuery.event.handle.apply( context, args );
      }, execAsap === "execAsap"? 0 : 100 );
    }
  };

  $.fn.smartresize = function( fn ) {
    return fn ? this.bind( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] );
  };



// ========================= Masonry ===============================


  // our "Widget" object constructor
  $.Mason = function( options, element ){
    this.element = $( element );

    this._create( options );
    this._init();
  };

  $.Mason.settings = {
    isResizable: true,
    isAnimated: false,
    animationOptions: {
      queue: false,
      duration: 500
    },
    gutterWidth: 0,
    isRTL: false,
    isFitWidth: false,
    containerStyle: {
      position: 'relative'
    }
  };

  $.Mason.prototype = {

    _filterFindBricks: function( $elems ) {
      var selector = this.options.itemSelector;
      // if there is a selector
      // filter/find appropriate item elements
      return !selector ? $elems : $elems.filter( selector ).add( $elems.find( selector ) );
    },

    _getBricks: function( $elems ) {
      var $bricks = this._filterFindBricks( $elems )
        .css({ position: 'absolute' })
        .addClass('masonry-brick');
      return $bricks;
    },
    
    // sets up widget
    _create : function( options ) {
      
      this.options = $.extend( true, {}, $.Mason.settings, options );
      this.styleQueue = [];

      // get original styles in case we re-apply them in .destroy()
      var elemStyle = this.element[0].style;
      this.originalStyle = {
        // get height
        height: elemStyle.height || ''
      };
      // get other styles that will be overwritten
      var containerStyle = this.options.containerStyle;
      for ( var prop in containerStyle ) {
        this.originalStyle[ prop ] = elemStyle[ prop ] || '';
      }

      this.element.css( containerStyle );

      this.horizontalDirection = this.options.isRTL ? 'right' : 'left';

      this.offset = {
        x: parseInt( this.element.css( 'padding-' + this.horizontalDirection ), 10 ),
        y: parseInt( this.element.css( 'padding-top' ), 10 )
      };
      
      this.isFluid = this.options.columnWidth && typeof this.options.columnWidth === 'function';

      // add masonry class first time around
      var instance = this;
      setTimeout( function() {
        instance.element.addClass('masonry');
      }, 0 );
      
      // bind resize method
      if ( this.options.isResizable ) {
        $(window).bind( 'smartresize.masonry', function() { 
          instance.resize();
        });
      }


      // need to get bricks
      this.reloadItems();

    },
  
    // _init fires when instance is first created
    // and when instance is triggered again -> $el.masonry();
    _init : function( callback ) {
      this._getColumns();
      this._reLayout( callback );
    },

    option: function( key, value ){
      // set options AFTER initialization:
      // signature: $('#foo').bar({ cool:false });
      if ( $.isPlainObject( key ) ){
        this.options = $.extend(true, this.options, key);
      } 
    },
    
    // ====================== General Layout ======================

    // used on collection of atoms (should be filtered, and sorted before )
    // accepts atoms-to-be-laid-out to start with
    layout : function( $bricks, callback ) {

      // place each brick
      for (var i=0, len = $bricks.length; i < len; i++) {
        this._placeBrick( $bricks[i] );
      }
      
      // set the size of the container
      var containerSize = {};
      containerSize.height = Math.max.apply( Math, this.colYs );
      if ( this.options.isFitWidth ) {
        var unusedCols = 0;
        i = this.cols;
        // count unused columns
        while ( --i ) {
          if ( this.colYs[i] !== 0 ) {
            break;
          }
          unusedCols++;
        }
        // fit container to columns that have been used;
        containerSize.width = (this.cols - unusedCols) * this.columnWidth - this.options.gutterWidth;
      }
      this.styleQueue.push({ $el: this.element, style: containerSize });

      // are we animating the layout arrangement?
      // use plugin-ish syntax for css or animate
      var styleFn = !this.isLaidOut ? 'css' : (
            this.options.isAnimated ? 'animate' : 'css'
          ),
          animOpts = this.options.animationOptions;

      // process styleQueue
      var obj;
      for (i=0, len = this.styleQueue.length; i < len; i++) {
        obj = this.styleQueue[i];
        obj.$el[ styleFn ]( obj.style, animOpts );
      }

      // clear out queue for next time
      this.styleQueue = [];

      // provide $elems as context for the callback
      if ( callback ) {
        callback.call( $bricks );
      }
      
      this.isLaidOut = true;
    },
    
    // calculates number of columns
    // i.e. this.columnWidth = 200
    _getColumns : function() {
      var container = this.options.isFitWidth ? this.element.parent() : this.element,
          containerWidth = container.width();

                         // use fluid columnWidth function if there
      this.columnWidth = this.isFluid ? this.options.columnWidth( containerWidth ) :
                    // if not, how about the explicitly set option?
                    this.options.columnWidth ||
                    // or use the size of the first item
                    this.$bricks.outerWidth(true) ||
                    // if there's no items, use size of container
                    containerWidth;

      this.columnWidth += this.options.gutterWidth;

      this.cols = Math.floor( ( containerWidth + this.options.gutterWidth ) / this.columnWidth );
      this.cols = Math.max( this.cols, 1 );

    },

    // layout logic
    _placeBrick: function( brick ) {
      var $brick = $(brick),
          colSpan, groupCount, groupY, groupColY, j;

      //how many columns does this brick span
      colSpan = Math.ceil( $brick.outerWidth(true) /
        ( this.columnWidth + this.options.gutterWidth ) );
      colSpan = Math.min( colSpan, this.cols );

      if ( colSpan === 1 ) {
        // if brick spans only one column, just like singleMode
        groupY = this.colYs;
      } else {
        // brick spans more than one column
        // how many different places could this brick fit horizontally
        groupCount = this.cols + 1 - colSpan;
        groupY = [];

        // for each group potential horizontal position
        for ( j=0; j < groupCount; j++ ) {
          // make an array of colY values for that one group
          groupColY = this.colYs.slice( j, j+colSpan );
          // and get the max value of the array
          groupY[j] = Math.max.apply( Math, groupColY );
        }

      }

      // get the minimum Y value from the columns
      var minimumY = Math.min.apply( Math, groupY ),
          shortCol = 0;
      
      // Find index of short column, the first from the left
      for (var i=0, len = groupY.length; i < len; i++) {
        if ( groupY[i] === minimumY ) {
          shortCol = i;
          break;
        }
      }

      // position the brick
      var position = {
        top: minimumY + this.offset.y
      };
      // position.left or position.right
      position[ this.horizontalDirection ] = this.columnWidth * shortCol + this.offset.x;
      this.styleQueue.push({ $el: $brick, style: position });

      // apply setHeight to necessary columns
      var setHeight = minimumY + $brick.outerHeight(true),
          setSpan = this.cols + 1 - len;
      for ( i=0; i < setSpan; i++ ) {
        this.colYs[ shortCol + i ] = setHeight;
      }

    },
    
    
    resize: function() {
      var prevColCount = this.cols;
      // get updated colCount
      this._getColumns();
      if ( this.isFluid || this.cols !== prevColCount ) {
        // if column count has changed, trigger new layout
        this._reLayout();
      }
    },
    
    
    _reLayout : function( callback ) {
      // reset columns
      var i = this.cols;
      this.colYs = [];
      while (i--) {
        this.colYs.push( 0 );
      }
      // apply layout logic to all bricks
      this.layout( this.$bricks, callback );
    },
    
    // ====================== Convenience methods ======================
    
    // goes through all children again and gets bricks in proper order
    reloadItems : function() {
      this.$bricks = this._getBricks( this.element.children() );
    },
    
    
    reload : function( callback ) {
      this.reloadItems();
      this._init( callback );
    },
    

    // convienence method for working with Infinite Scroll
    appended : function( $content, isAnimatedFromBottom, callback ) {
      if ( isAnimatedFromBottom ) {
        // set new stuff to the bottom
        this._filterFindBricks( $content ).css({ top: this.element.height() });
        var instance = this;
        setTimeout( function(){
          instance._appended( $content, callback );
        }, 1 );
      } else {
        this._appended( $content, callback );
      }
    },
    
    _appended : function( $content, callback ) {
      var $newBricks = this._getBricks( $content );
      // add new bricks to brick pool
      this.$bricks = this.$bricks.add( $newBricks );
      this.layout( $newBricks, callback );
    },
    
    // removes elements from Masonry widget
    remove : function( $content ) {
      this.$bricks = this.$bricks.not( $content );
      $content.remove();
    },
    
    // destroys widget, returns elements and container back (close) to original style
    destroy : function() {

      this.$bricks
        .removeClass('masonry-brick')
        .each(function(){
          this.style.position = '';
          this.style.top = '';
          this.style.left = '';
        });
      
      // re-apply saved container styles
      var elemStyle = this.element[0].style;
      for ( var prop in this.originalStyle ) {
        elemStyle[ prop ] = this.originalStyle[ prop ];
      }

      this.element
        .unbind('.masonry')
        .removeClass('masonry')
        .removeData('masonry');
      
      $(window).unbind('.masonry');

    }
    
  };
  
  
  // ======================= imagesLoaded Plugin ===============================
  /*!
   * jQuery imagesLoaded plugin v1.1.0
   * http://github.com/desandro/imagesloaded
   *
   * MIT License. by Paul Irish et al.
   */


  // $('#my-container').imagesLoaded(myFunction)
  // or
  // $('img').imagesLoaded(myFunction)

  // execute a callback when all images have loaded.
  // needed because .load() doesn't work on cached images

  // callback function gets image collection as argument
  //  `this` is the container

  $.fn.imagesLoaded = function( callback ) {
    var $this = this,
        $images = $this.find('img').add( $this.filter('img') ),
        len = $images.length,
        blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        loaded = [];

    function triggerCallback() {
      callback.call( $this, $images );
    }

    function imgLoaded( event ) {
      var img = event.target;
      if ( img.src !== blank && $.inArray( img, loaded ) === -1 ){
        loaded.push( img );
        if ( --len <= 0 ){
          setTimeout( triggerCallback );
          $images.unbind( '.imagesLoaded', imgLoaded );
        }
      }
    }

    // if no images, trigger immediately
    if ( !len ) {
      triggerCallback();
    }

    $images.bind( 'load.imagesLoaded error.imagesLoaded',  imgLoaded ).each( function() {
      // cached images don't fire load sometimes, so we reset src.
      var src = this.src;
      // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
      // data uri bypasses webkit log warning (thx doug jones)
      this.src = blank;
      this.src = src;
    });

    return $this;
  };


  // helper function for logging errors
  // $.error breaks jQuery chaining
  var logError = function( message ) {
    if ( window.console ) {
      window.console.error( message );
    }
  };
  
  // =======================  Plugin bridge  ===============================
  // leverages data method to either create or return $.Mason constructor
  // A bit from jQuery UI
  //   https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js
  // A bit from jcarousel 
  //   https://github.com/jsor/jcarousel/blob/master/lib/jquery.jcarousel.js

  $.fn.masonry = function( options ) {
    if ( typeof options === 'string' ) {
      // call method
      var args = Array.prototype.slice.call( arguments, 1 );

      this.each(function(){
        var instance = $.data( this, 'masonry' );
        if ( !instance ) {
          logError( "cannot call methods on masonry prior to initialization; " +
            "attempted to call method '" + options + "'" );
          return;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
          logError( "no such method '" + options + "' for masonry instance" );
          return;
        }
        // apply method
        instance[ options ].apply( instance, args );
      });
    } else {
      this.each(function() {
        var instance = $.data( this, 'masonry' );
        if ( instance ) {
          // apply options & init
          instance.option( options || {} );
          instance._init();
        } else {
          // initialize new instance
          $.data( this, 'masonry', new $.Mason( options, this ) );
        }
      });
    }
    return this;
  };

})( window, jQuery );

module.exports = jQuery;

});
define("product/guoqude/1.0.0/front_net/module/royalSlider/royalslider-debug", ["gallery/jquery/1.8.3/jquery-debug"], function (require, exports, module) {
var jQuery = require('gallery/jquery/1.8.3/jquery-debug').sub();

// jQuery RoyalSlider plugin. Custom build. Copyright 2011-2012 Dmitry Semenov http://dimsemenov.com 
// jquery.royalslider v9.2.5
(function(k){function u(b,e){var c=navigator.userAgent.toLowerCase(),g=k.browser,a=this,f=g.webkit;c.indexOf("android");a.isIPAD=c.match(/(ipad)/);for(var d=document.createElement("div").style,i=["webkit","Moz","ms","O"],h="",j=0,m,c=0;c<i.length;c++)m=i[c],!h&&m+"Transform"in d&&(h=m),m=m.toLowerCase(),window.requestAnimationFrame||(window.requestAnimationFrame=window[m+"RequestAnimationFrame"],window.cancelAnimationFrame=window[m+"CancelAnimationFrame"]||window[m+"CancelRequestAnimationFrame"]);
window.requestAnimationFrame||(window.requestAnimationFrame=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-j)),d=window.setTimeout(function(){a(b+c)},c);j=b+c;return d});window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)});a.slider=k(b);a.ev=k({});a._a=k(document);a.st=k.extend({},k.fn.royalSlider.defaults,e);a._b=a.st.transitionSpeed;if(a.st.allowCSS3&&(!f||a.st.allowCSS3OnWebkit))c=h+(h?"T":"t"),a._c=c+"ransform"in d&&c+"ransition"in d,a._c&&(a._d=h+
(h?"P":"p")+"erspective"in d);h=h.toLowerCase();a._e="-"+h+"-";a._f="vertical"===a.st.slidesOrientation?!1:!0;a._g=a._f?"left":"top";a._h=a._f?"width":"height";a._i=-1;a._j="fade"===a.st.transitionType?!1:!0;a._j||(a.st.sliderDrag=!1,a._k=10);a._l=0;a._m=0;k.each(k.rsModules,function(b,c){c.call(a)});a.slides=[];a._n=0;(a.st.slides?k(a.st.slides):a.slider.children().detach()).each(function(){a._o(this,!0)});a.st.randomizeSlides&&a.slides.sort(function(){return 0.5-Math.random()});a.numSlides=a.slides.length;
a._p();a.st.startSlideId>a.numSlides-1&&(a.st.startSlideId=a.numSlides-1);a.staticSlideId=a.currSlideId=a._q=a.st.startSlideId;a.currSlide=a.slides[a.currSlideId];a._r=0;a.slider.addClass((a._f?"rsHor":"rsVer")+(a._j?"":" rsFade"));d='<div class="rsOverflow"><div class="rsContainer">';a.slidesSpacing=a.st.slidesSpacing;a._s=(a._f?a.slider.width():a.slider.height())+a.st.slidesSpacing;a._t=Boolean(0<a._u);1>=a.numSlides&&(a._v=!1);a._w=a._v&&a._j?2===a.numSlides?1:2:0;a._x=6>a.numSlides?a.numSlides:
6;a._y=0;a._z=0;a.slidesJQ=[];for(c=0;c<a.numSlides;c++)a.slidesJQ.push(k('<div style="'+(a._j?"":c!==a.currSlideId?"z-index: 0; display:none; opacity: 0; position: absolute;  left: 0; top: 0;":"z-index: 0;  position: absolute; left: 0; top: 0;")+'" class="rsSlide "></div>'));a.slider.html(d+"</div></div>");a._a1=a.slider.children(".rsOverflow");a._b1=a._a1.children(".rsContainer");a._c1=k('<div class="rsPreloader"></div>');c=a._b1.children(".rsSlide");a._d1=a.slidesJQ[a.currSlideId];a._e1=0;"ontouchstart"in
window||"createTouch"in document?(a.hasTouch=!0,a._f1="touchstart.rs",a._g1="touchmove.rs",a._h1="touchend.rs",a._i1="touchcancel.rs",a._j1=0.5):(a.hasTouch=!1,a._j1=0.2,a.st.sliderDrag&&(g.msie||g.opera?a._k1=a._l1="move":g.mozilla?(a._k1="-moz-grab",a._l1="-moz-grabbing"):f&&-1!=navigator.platform.indexOf("Mac")&&(a._k1="-webkit-grab",a._l1="-webkit-grabbing"),a._m1()),a._f1="mousedown.rs",a._g1="mousemove.rs",a._h1="mouseup.rs",a._i1="mouseup.rs");a._c?(a._n1="transition-property",a._o1="transition-duration",
a._p1="transition-timing-function",a._q1=a._r1=a._e+"transform",a._d?(f&&a.slider.addClass("rsWebkit3d"),a._s1="translate3d(",a._t1="px, ",a._u1="px, 0px)"):(a._s1="translate(",a._t1="px, ",a._u1="px)"),a._j?a._b1[a._e+a._n1]=a._e+"transform":(g={},g[a._e+a._n1]="opacity",g[a._e+a._o1]=a.st.transitionSpeed+"ms",g[a._e+a._p1]=a.st.css3easeInOut,c.css(g))):(a._r1="left",a._q1="top");var l;k(window).on("resize.rs",function(){l&&clearTimeout(l);l=setTimeout(function(){a.updateSliderSize()},50)});a.ev.trigger("rsAfterPropsSetup");
a.updateSliderSize();a.st.keyboardNavEnabled&&a._v1();a.st.arrowsNavHideOnTouch&&a.hasTouch&&(a.st.arrowsNav=!1);a.st.arrowsNav&&(g=a.st.controlsInside?a._a1:a.slider,k('<div class="rsArrow rsArrowLeft"><div class="rsArrowIcn"></div></div><div class="rsArrow rsArrowRight"><div class="rsArrowIcn"></div></div>').appendTo(g),a._w1=g.children(".rsArrowLeft").click(function(b){b.preventDefault();a.prev()}),a._x1=g.children(".rsArrowRight").click(function(b){b.preventDefault();a.next()}),a.st.arrowsNavAutoHide&&
!a.hasTouch&&(a._w1.addClass("rsHidden"),a._x1.addClass("rsHidden"),g.one("mousemove.arrowshover",function(){a._w1.removeClass("rsHidden");a._x1.removeClass("rsHidden")}),g.hover(function(){a._y1||(a._w1.removeClass("rsHidden"),a._x1.removeClass("rsHidden"))},function(){a._y1||(a._w1.addClass("rsHidden"),a._x1.addClass("rsHidden"))})),a.ev.on("rsOnUpdateNav",function(){a._z1()}),a._z1());a._a2=!a.hasTouch&&a.st.sliderDrag||a.hasTouch&&a.st.sliderTouch;if(a._a2)a._b1.on(a._f1,function(b){a._b2(b)});
else a.dragSuccess=!1;var r=["rsPlayBtnIcon","rsPlayBtn","rsCloseVideoBtn","rsCloseVideoIcn"];a._b1.click(function(b){if(!a.dragSuccess){var c=k(b.target).attr("class");if(-1!==k.inArray(c,r)&&a.toggleVideo())return!1;if(a.st.navigateByClick&&!a._c2){if(k(b.target).closest(".rsNoDrag",a._d1).length)return!0;a._d2(b)}a.ev.trigger("rsSlideClick")}});a.ev.trigger("rsAfterInit")}k.rsModules||(k.rsModules={});u.prototype={_d2:function(b){0<b[this._f?"pageX":"pageY"]-this._e2?this.next():this.prev()},_p:function(){var b;
b=this.st.numImagesToPreload;if(this._v=this.st.loop)2===this.numSlides?(this._v=!1,this.st.loopRewind=!0):2>this.numSlides&&(this.st.loopRewind=this._v=!1);this._v&&0<b&&(4>=this.numSlides?b=1:this.st.numImagesToPreload>(this.numSlides-1)/2&&(b=Math.floor((this.numSlides-1)/2)));this._u=b},_o:function(b,e){function c(b,c){a.image=b.attr(!c?"src":c);a.caption=!c?b.attr("alt"):b.contents();a.videoURL=b.attr("data-rsVideo")}var g,a={};this._f2=b=k(b);this.ev.trigger("rsBeforeParseNode",[b,a]);if(!a.stopParsing)return b=
this._f2,a.id=this._n,a.contentAdded=!1,this._n++,a.hasCover||(b.hasClass("rsImg")?(tempEl=b,g=!0):(tempEl=b.find(".rsImg"),tempEl.length&&(g=!0)),g?(a.bigImage=tempEl.attr("data-rsBigImg"),tempEl.is("a")?c(tempEl,"href"):tempEl.is("img")&&c(tempEl)):b.is("img")&&(b.addClass("rsImg"),c(b))),tempEl=b.find(".rsCaption"),tempEl.length&&(a.caption=tempEl.remove()),a.image||(a.isLoaded=!0,a.isRendered=!1,a.isLoading=!1),a.content=b,this.ev.trigger("rsAfterParseNode",[b,a]),e&&this.slides.push(a),a},_v1:function(){function b(a){37===
a?e.prev():39===a&&e.next()}var e=this,c,g;e._a.on("keydown.rskb",function(a){if(!e._g2&&(g=a.keyCode,(37===g||39===g)&&!c))b(g),c=setInterval(function(){b(g)},700)}).on("keyup.rskb",function(){c&&(clearInterval(c),c=null)})},goTo:function(b,e){b!==this.currSlideId&&this._h2(b,this.st.transitionSpeed,!0,!e)},destroy:function(b){var e=this;e.ev.trigger("rsBeforeDestroy");e._a.off("keydown.rskb keyup.rskb "+e._g1+" "+e._h1);e._b1.on(e._f1,function(b){e._b2(b)});e.slider.data("royalSlider","");b&&e.slider.remove()},
_i2:function(b,e){function c(c,e,f){c.isAdded?(g(e,c),a(e,c)):(f||(f=d.slidesJQ[e]),c.holder?f=c.holder:(f=d.slidesJQ[e]=k(f),c.holder=f),c.appendOnLoaded=!1,a(e,c,f),g(e,c),d._k2(c,f,b),appended=c.isAdded=!0)}function g(a,c){c.contentAdded||(d.setItemHtml(c,b),b||(c.contentAdded=!0))}function a(a,b,c){d._j&&(c||(c=d.slidesJQ[a]),c.css(d._g,(a+d._z+r)*d._s))}function f(a){if(j){if(a>m-1)return f(a-m);if(0>a)return f(m+a)}return a}var d=this,i,h,j=d._v,m=d.numSlides;if(!isNaN(e))return f(e);var l=
d.currSlideId,r,n=b?Math.abs(d._j2-d.currSlideId)>=d.numSlides-1?0:1:d._u,p=Math.min(2,n),s=!1,t=!1,q;for(h=l;h<l+1+p;h++)if(q=f(h),(i=d.slides[q])&&(!i.isAdded||!i.positionSet)){s=!0;break}for(h=l-1;h>l-1-p;h--)if(q=f(h),(i=d.slides[q])&&(!i.isAdded||!i.positionSet)){t=!0;break}if(s)for(h=l;h<l+n+1;h++)q=f(h),r=Math.floor((d._q-(l-h))/d.numSlides)*d.numSlides,(i=d.slides[q])&&c(i,q);if(t)for(h=l-1;h>l-1-n;h--)q=f(h),r=Math.floor((d._q-(l-h))/m)*m,(i=d.slides[q])&&c(i,q);if(!b){p=f(l-n);l=f(l+n);
n=p>l?0:p;for(h=0;h<m;h++)if(!(p>l&&h>p-1)&&(h<n||h>l))if((i=d.slides[h])&&i.holder)i.holder.detach(),i.isAdded=!1}},setItemHtml:function(b,e){function c(){a.isWaiting=!0;b.holder.html(g._c1.clone());a.slideId=-99}var g=this,a=b.holder,f=function(a){var b=a.sizeType;return function(d){var f=a.content,h=a.holder;if(d){var i=d.currentTarget;k(i).off("load error");if("error"===d.type){a.isLoaded=!0;a.image="";a.isLoading=!1;f.addClass("rsSlideError");h.html(f);a.holder.trigger("rsAfterContentSet");g.ev.trigger("rsAfterContentSet",
a);return}}if(a.image){if(a.bigImage&&a.sizeType!==b){"med"===b?a.isMedLoading=!1:"big"===b?a.isBigLoading=!1:a.isMedLoading=a.isLoading=!1;return}if(a.isLoaded){if(!a.isRendered&&e){c();return}g._l2(a)}else{var j;f.hasClass("rsImg")?(j=!0,d=f):(j=!1,d=f.find(".rsImg"));d.length&&d.is("a")&&(j?f=k('<img class="rsImg" src="'+a.image+'" />'):f.find(".rsImg").replaceWith('<img class="rsImg" src="'+a.image+'" />'),a.content=f);a.iW=i.width;0<a.iW&&(a.iH=i.height,a.isLoaded=!0,a.isLoading=!1,g._l2(a))}}else{if(!g._t&&
e&&!a.isRendered){a.isRendered=!0;c();return}a.isLoaded=!0;a.isLoading=!1}i=a.id-g._l;!e&&!a.appendOnLoaded&&g.st.fadeinLoadedSlide&&(0===i||(g._m2||g._g2)&&(-1===i||1===i))?(f.css(g._e+"transition","opacity 400ms ease-in-out").css({visibility:"visible",opacity:0}),h.html(f),setTimeout(function(){f.css("opacity",1)},6)):h.html(f);a.isRendered=!0;h.find("a").off("click.rs").on("click.rs",function(){if(g.dragSuccess)return!1;g._c2=!0;setTimeout(function(){g._c2=!1},3)});a.holder.trigger("rsAfterContentSet");
g.ev.trigger("rsAfterContentSet",a);a.appendOnLoaded&&g._k2(a,f,e)}};if(b.isLoaded)f(b)();else if(e)c();else if(b.image)if(b.isLoading){var d=1,i=function(){if(b.isLoading)if(b.isLoaded)f(b)();else{if(0===d%50){var a=b.imageLoader;if(a.complete&&void 0!==a.naturalWidth&&0!==a.naturalWidth&&0!==a.naturalHeight){f(b)();return}}300<d||(setTimeout(i,400),d++)}};i(b.sizeType)}else{var h=k("<img/>"),j=b.image;e?c():b.isLoading||(j||(j=h.attr("src"),h=k("<img/>")),b.holder.html(g._c1.clone()),b.isLoading=
!0,b.imageLoader=h,h.one("load error",f(b)).attr("src",j))}else f(b)()},_k2:function(b,e,c){var g=b.holder,a=b.id-this._l;this._j&&!c&&this.st.fadeinLoadedSlide&&(0===a||(this._m2||this._g2)&&(-1===a||1===a))?(e=b.content,e.css(this._e+"transition","opacity 400ms ease-in-out").css({visibility:"visible",opacity:0}),this._b1.append(g),setTimeout(function(){e.css("opacity",1)},6)):this._b1.append(g);b.appendOnLoaded=!1},_b2:function(b,e){var c=this,g;c.dragSuccess=!1;if(k(b.target).closest(".rsNoDrag",
c._d1).length)return!0;e||c._m2&&c._n2();if(c._g2)c.hasTouch&&(c._o2=!0);else{c.hasTouch&&(c._o2=!1);c._p2();if(c.hasTouch){var a=b.originalEvent.touches;if(a&&0<a.length)g=a[0],1<a.length&&(c._o2=!0);else return}else g=b,b.preventDefault();c._g2=!0;c._a.on(c._g1,function(a){c._q2(a,e)}).on(c._h1,function(a){c._r2(a,e)});c._s2="";c._t2=!1;c._u2=g.pageX;c._v2=g.pageY;c._w2=c._r=(!e?c._f:c._x2)?g.pageX:g.pageY;c._y2=0;c._z2=0;c._a3=!e?c._m:c._b3;c._c3=(new Date).getTime();if(c.hasTouch)c._a1.on(c._i1,
function(a){c._r2(a,e)})}},_d3:function(b,e){if(this._e3){var c=this._f3,g=b.pageX-this._u2,a=b.pageY-this._v2,f=this._a3+g,d=this._a3+a,i=!e?this._f:this._x2,f=i?f:d,h=this._s2;this._t2=!0;this._u2=b.pageX;this._v2=b.pageY;d=i?this._u2:this._v2;"x"===h&&0!==g?this._y2=0<g?1:-1:"y"===h&&0!==a&&(this._z2=0<a?1:-1);g=i?g:a;e?f>this._g3?f=this._a3+g*this._j1:f<this._h3&&(f=this._a3+g*this._j1):this._v||(0>=this.currSlideId&&0<d-this._w2&&(f=this._a3+g*this._j1),this.currSlideId>=this.numSlides-1&&0>
d-this._w2&&(f=this._a3+g*this._j1));this._a3=f;200<c-this._c3&&(this._c3=c,this._r=d);e?this._j3(this._a3):this._j&&this._i3(this._a3)}},_q2:function(b,e){var c=this;if(c.hasTouch){if(c._k3)return;var g=b.originalEvent.touches;if(g){if(1<g.length)return;point=g[0]}else return}else point=b;c._t2||(c._c&&(!e?c._b1:c._l3).css(c._e+c._o1,"0s"),function d(){c._g2&&(c._m3=requestAnimationFrame(d),c._n3&&c._d3(c._n3,e))}());if(c._e3)b.preventDefault(),c._f3=(new Date).getTime(),c._n3=point;else{var g=!e?
c._f:c._x2,a=Math.abs(point.pageX-c._u2)-Math.abs(point.pageY-c._v2)-(g?-7:7);if(7<a){if(g)b.preventDefault(),c._s2="x";else if(c.hasTouch){c._o3();return}c._e3=!0}else if(-7>a){if(g){if(c.hasTouch){c._o3();return}}else b.preventDefault(),c._s2="y";c._e3=!0}}},_o3:function(){this._k3=!0;this._t2=this._g2=!1;this._r2()},_r2:function(b,e){function c(a){return 100>a?100:500<a?500:a}function g(b,d){if(a._j||e)i=(-a._q-a._z)*a._s,h=Math.abs(a._m-i),a._b=h/d,b&&(a._b+=250),a._b=c(a._b),a._q3(i,!1)}var a=
this,f,d,i,h;a.ev.trigger("rsDragRelease");a._n3=null;a._g2=!1;a._k3=!1;a._e3=!1;a._f3=0;cancelAnimationFrame(a._m3);a._t2&&(e?a._j3(a._a3):a._j&&a._i3(a._a3));a._a.off(a._g1).off(a._h1);a.hasTouch&&a._a1.off(a._i1);a._m1();if(!a._t2&&!a._o2&&e&&a._p3){var j=k(b.target).closest(".rsNavItem");j.length&&a.goTo(j.index())}else if(d=!e?a._f:a._x2,a._t2&&!("y"===a._s2&&d||"x"===a._s2&&!d)){a.dragSuccess=!0;a._s2="";var m=a.st.minSlideOffset;f=a.hasTouch?b.originalEvent.changedTouches[0]:b;var l=d?f.pageX:
f.pageY,r=a._w2;f=a._r;var n=a.currSlideId,p=a.numSlides,s=d?a._y2:a._z2,t=a._v;Math.abs(l-r);f=l-f;d=(new Date).getTime()-a._c3;d=Math.abs(f)/d;if(0===s||1>=p)g(!0,d);else{if(!t&&!e)if(0>=n){if(0<s){g(!0,d);return}}else if(n>=p-1&&0>s){g(!0,d);return}if(e){i=a._b3;if(i>a._g3)i=a._g3;else if(i<a._h3)i=a._h3;else{m=d*d/0.006;j=-a._b3;l=a._r3-a._s3+a._b3;0<f&&m>j?(j+=a._s3/(15/(0.003*(m/d))),d=d*j/m,m=j):0>f&&m>l&&(l+=a._s3/(15/(0.003*(m/d))),d=d*l/m,m=l);j=Math.max(Math.round(d/0.003),50);i+=m*(0>
f?-1:1);if(i>a._g3){a._t3(i,j,!0,a._g3,200);return}if(i<a._h3){a._t3(i,j,!0,a._h3,200);return}}a._t3(i,j,!0)}else r+m<l?0>s?g(!1,d):a._h2("prev",c(Math.abs(a._m-(-a._q-a._z+1)*a._s)/d),!1,!0,!0):r-m>l?0<s?g(!1,d):a._h2("next",c(Math.abs(a._m-(-a._q-a._z-1)*a._s)/d),!1,!0,!0):g(!1,d)}}},_i3:function(b){b=this._m=b;this._c?this._b1.css(this._r1,this._s1+(this._f?b+this._t1+0:0+this._t1+b)+this._u1):this._b1.css(this._f?this._r1:this._q1,b)},updateSliderSize:function(b){var e,c;this.st.beforeResize&&
this.st.beforeResize.call(this);if(this.st.autoScaleSlider){var g=this.st.autoScaleSliderWidth,a=this.st.autoScaleSliderHeight;this.st.autoScaleHeight?(e=this.slider.width(),e!=this.width&&(this.slider.css("height",e*(a/g)),e=this.slider.width()),c=this.slider.height()):(c=this.slider.height(),c!=this.height&&(this.slider.css("width",c*(g/a)),c=this.slider.height()),e=this.slider.width())}else e=this.slider.width(),c=this.slider.height();this._e2=this.slider.offset();this._e2=this._e2[this._g];if(b||
e!=this.width||c!=this.height){this.width=e;this.height=c;this._u3=e;this._v3=c;this.ev.trigger("rsBeforeSizeSet");this._a1.css({width:this._u3,height:this._v3});this._s=(this._f?this._u3:this._v3)+this.st.slidesSpacing;this._w3=this.st.imageScalePadding;for(e=0;e<this.slides.length;e++)b=this.slides[e],b.positionSet=!1,b&&(b.image&&b.isLoaded)&&(b.isRendered=!1,this._l2(b));if(this._x3)for(e=0;e<this._x3.length;e++)b=this._x3[e],b.holder.css(this._g,(b.id+this._z)*this._s);this._i2();this._j&&(this._c&&
this._b1.css(this._e+"transition-duration","0s"),this._i3((-this._q-this._z)*this._s));this.ev.trigger("rsOnUpdateNav");this.st.afterResize&&this.st.afterResize.call(this)}},setSlidesOrientation:function(){},appendSlide:function(b,e){var c=this._o(b);if(isNaN(e)||e>this.numSlides)e=this.numSlides;this.slides.splice(e,0,c);this.slidesJQ.splice(e,0,'<div style="'+(this._j?"position: absolute;":"z-index: 0; display:none; opacity: 0; position: absolute;  left: 0; top: 0;")+'" class="rsSlide"></div>');
e<this.currSlideId&&this.currSlideId++;this.ev.trigger("rsOnAppendSlide",[c,e]);this._z3(e);e===this.currSlideId&&this.ev.trigger("rsAfterSlideChange")},removeSlide:function(b){var e=this.slides[b];e&&(e.holder&&e.holder.remove(),b<this.currSlideId&&this.currSlideId++,this.slides.splice(b,1),this.slidesJQ.splice(b,1),this.ev.trigger("rsOnRemoveSlide",[b]),this._z3(b),b===this.currSlideId&&this.ev.trigger("rsAfterSlideChange"))},_z3:function(){var b=this,e=b.numSlides,e=0>=b._q?0:Math.floor(b._q/e);
b.numSlides=b.slides.length;0===b.numSlides?(b.currSlideId=b._z=b._q=0,b.currSlide=b._a4=null):b._q=e*b.numSlides+b.currSlideId;for(e=0;e<b.numSlides;e++)b.slides[e].id=e;b.currSlide=b.slides[b.currSlideId];b._d1=b.slidesJQ[b.currSlideId];b.currSlideId>=b.numSlides?b.goTo(b.numSlides-1):0>b.currSlideId&&b.goTo(0);b._p();b._j&&b._v&&b._b1.css(b._e+b._o1,"0ms");b._b4&&clearTimeout(b._b4);b._b4=setTimeout(function(){b._j&&b._i3((-b._q-b._z)*b._s);b._i2();b._j||b._d1.css({display:"block",opacity:1})},
14);b.ev.trigger("rsOnUpdateNav")},_m1:function(){!this.hasTouch&&this._j&&(this._k1?this._a1.css("cursor",this._k1):(this._a1.removeClass("grabbing-cursor"),this._a1.addClass("grab-cursor")))},_p2:function(){!this.hasTouch&&this._j&&(this._l1?this._a1.css("cursor",this._l1):(this._a1.removeClass("grab-cursor"),this._a1.addClass("grabbing-cursor")))},next:function(b){this._h2("next",this.st.transitionSpeed,!0,!b)},prev:function(b){this._h2("prev",this.st.transitionSpeed,!0,!b)},_h2:function(b,e,c,
g,a){var f=this,d,i,h;f._d4&&f.stopVideo();f.ev.trigger("rsBeforeMove",[b,g]);newItemId="next"===b?f.currSlideId+1:"prev"===b?f.currSlideId-1:b=parseInt(b,10);if(!f._v){if(0>newItemId){f._e4("left",!g);return}if(newItemId>=f.numSlides){f._e4("right",!g);return}}f._m2&&(f._n2(),c=!1);i=newItemId-f.currSlideId;h=f._j2=f.currSlideId;var j=f.currSlideId+i,g=f._q,m;f._v?(j=f._i2(!1,j),g+=i):g=j;f._l=j;f._a4=f.slidesJQ[f.currSlideId];f._q=g;f.currSlideId=f._l;f.currSlide=f.slides[f.currSlideId];f._d1=f.slidesJQ[f.currSlideId];
j=Boolean(0<i);i=Math.abs(i);var l=Math.floor(h/f._u),k=Math.floor((h+(j?2:-2))/f._u),l=(j?Math.max(l,k):Math.min(l,k))*f._u+(j?f._u-1:0);l>f.numSlides-1?l=f.numSlides-1:0>l&&(l=0);h=j?l-h:h-l;h>f._u&&(h=f._u);if(i>h+2){f._z+=(i-(h+2))*(j?-1:1);e*=1.4;for(h=0;h<f.numSlides;h++)f.slides[h].positionSet=!1}f._b=e;f._i2(!0);a||(m=!0);d=(-g-f._z)*f._s;m?setTimeout(function(){f._c4=!1;f._q3(d,b,!1,c);f.ev.trigger("rsOnUpdateNav")},0):(f._q3(d,b,!1,c),f.ev.trigger("rsOnUpdateNav"))},_z1:function(){this.st.arrowsNav&&
(1>=this.numSlides?(this._w1.css("display","none"),this._x1.css("display","none")):(this._w1.css("display","block"),this._x1.css("display","block"),!this._v&&!this.st.loopRewind&&(0===this.currSlideId?this._w1.addClass("rsArrowDisabled"):this._w1.removeClass("rsArrowDisabled"),this.currSlideId===this.numSlides-1?this._x1.addClass("rsArrowDisabled"):this._x1.removeClass("rsArrowDisabled"))))},_q3:function(b,e,c,g,a){function f(){var a;if(i&&(a=i.data("rsTimeout")))i!==h&&i.css({opacity:0,display:"none",
zIndex:0}),clearTimeout(a),i.data("rsTimeout","");if(a=h.data("rsTimeout"))clearTimeout(a),h.data("rsTimeout","")}var d=this,i,h,j={};isNaN(d._b)&&(d._b=400);d._m=d._a3=b;d.ev.trigger("rsBeforeAnimStart");d.st.beforeSlideChange&&d.st.beforeSlideChange.call(d);d._c?d._j?(j[d._e+d._o1]=d._b+"ms",j[d._e+d._p1]=g?k.rsCSS3Easing[d.st.easeInOut]:k.rsCSS3Easing[d.st.easeOut],d._b1.css(j),setTimeout(function(){d._i3(b)},d.hasTouch?5:0)):(d._b=d.st.transitionSpeed,i=d._a4,h=d._d1,h.data("rsTimeout")&&h.css("opacity",
0),f(),i&&i.data("rsTimeout",setTimeout(function(){j[d._e+d._o1]="0ms";j.zIndex=0;j.display="none";i.data("rsTimeout","");i.css(j);setTimeout(function(){i.css("opacity",0)},16)},d._b+60)),j.display="block",j.zIndex=d._k,j.opacity=0,j[d._e+d._o1]="0ms",j[d._e+d._p1]=k.rsCSS3Easing[d.st.easeInOut],h.css(j),h.data("rsTimeout",setTimeout(function(){h.css(d._e+d._o1,d._b+"ms");h.data("rsTimeout",setTimeout(function(){h.css("opacity",1);h.data("rsTimeout","")},20))},20))):d._j?(j[d._f?d._r1:d._q1]=b+"px",
d._b1.animate(j,d._b,g?d.st.easeInOut:d.st.easeOut)):(i=d._a4,h=d._d1,h.stop(!0,!0).css({opacity:0,display:"block",zIndex:d._k}),d._b=d.st.transitionSpeed,h.animate({opacity:1},d._b,d.st.easeInOut),f(),i&&i.data("rsTimeout",setTimeout(function(){i.stop(!0,!0).css({opacity:0,display:"none",zIndex:0})},d._b+60)));d._m2=!0;d.loadingTimeout&&clearTimeout(d.loadingTimeout);d.loadingTimeout=a?setTimeout(function(){d.loadingTimeout=null;a.call()},d._b+60):setTimeout(function(){d.loadingTimeout=null;d._f4(e)},
d._b+60)},_n2:function(){this._m2=!1;clearTimeout(this.loadingTimeout);if(this._j)if(this._c){var b=this._m,e=this._a3=this._g4();this._b1.css(this._e+this._o1,"0ms");b!==e&&this._i3(e)}else this._b1.stop(!0),this._m=parseInt(this._b1.css(this._r1),10);else 20<this._k?this._k=10:this._k++},_g4:function(){var b=window.getComputedStyle(this._b1.get(0),null).getPropertyValue(this._e+"transform").replace(/^matrix\(/i,"").split(/, |\)$/g);return parseInt(b[this._f?4:5],10)},_h4:function(b,e){return this._c?
this._s1+(e?b+this._t1+0:0+this._t1+b)+this._u1:b},_f4:function(){this._j||(this._d1.css("z-index",0),this._k=10);this._m2=!1;this.staticSlideId=this.currSlideId;this._i2();this._i4=!1;this.ev.trigger("rsAfterSlideChange");this.st.afterSlideChange&&this.st.afterSlideChange.call(this)},_e4:function(b,e){var c=this,g=(-c._q-c._z)*c._s;moveDist=30;if(0!==c.numSlides)if(c.st.loopRewind)"left"===b?c.goTo(c.numSlides-1,e):c.goTo(0,e);else if(!c._m2&&c._j&&0!==moveDist){c._b=200;var a=function(){c._m2=!1};
c._q3(g+("left"===b?moveDist:-moveDist),"",!1,!0,function(){c._m2=!1;c._q3(g,"",!1,!0,a)})}},_l2:function(b){if(!b.isRendered){var e=b.content,c="rsImg",g,a=this.st.imageAlignCenter,f=this.st.imageScaleMode,d;b.videoURL&&(c="rsVideoContainer","fill"!==f?g=!0:(d=e,d.hasClass(c)||(d=d.find("."+c)),d.css({width:"100%",height:"100%"}),c="rsImg"));e.hasClass(c)||(e=e.find("."+c));var i=b.iW,c=b.iH;b.isRendered=!0;if("none"!==f||a){bMargin="fill"!==f?this._w3:0;b=this._u3-2*bMargin;d=this._v3-2*bMargin;
var h,j,k={};if("fit-if-smaller"===f&&(i>b||c>d))f="fit";if("fill"===f||"fit"===f)h=b/i,j=d/c,h="fill"==f?h>j?h:j:"fit"==f?h<j?h:j:1,i=Math.ceil(i*h,10),c=Math.ceil(c*h,10);"none"!==f&&(k.width=i,k.height=c,g&&e.find(".rsImg").css({width:"100%",height:"100%"}));a&&(k.marginLeft=Math.floor((b-i)/2)+bMargin,k.marginTop=Math.floor((d-c)/2)+bMargin);e.css(k)}}}};k.rsProto=u.prototype;k.fn.royalSlider=function(b){var e=arguments;return this.each(function(){var c=k(this);if("object"===typeof b||!b)c.data("royalSlider")||
c.data("royalSlider",new u(c,b));else if((c=c.data("royalSlider"))&&c[b])return c[b].apply(c,Array.prototype.slice.call(e,1))})};k.fn.royalSlider.defaults={slidesSpacing:8,startSlideId:0,loop:!1,loopRewind:!1,numImagesToPreload:4,fadeinLoadedSlide:!0,slidesOrientation:"horizontal",transitionType:"move",transitionSpeed:600,controlNavigation:"bullets",controlsInside:!0,arrowsNav:!0,arrowsNavAutoHide:!0,navigateByClick:!0,randomizeSlides:!1,sliderDrag:!0,sliderTouch:!0,keyboardNavEnabled:!1,fadeInAfterLoaded:!0,
allowCSS3:!0,allowCSS3OnWebkit:!0,addActiveClass:!1,autoHeight:!1,easeOut:"easeOutSine",easeInOut:"easeInOutSine",minSlideOffset:10,imageScaleMode:"fit-if-smaller",imageAlignCenter:!0,imageScalePadding:4,autoScaleSlider:!1,autoScaleSliderWidth:800,autoScaleSliderHeight:400,autoScaleHeight:!0,arrowsNavHideOnTouch:!1,globalCaption:!1,beforeSlideChange:null,afterSlideChange:null,beforeResize:null,afterResize:null};k.rsCSS3Easing={easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)"};
k.extend(jQuery.easing,{easeInOutSine:function(b,e,c,g,a){return-g/2*(Math.cos(Math.PI*e/a)-1)+c},easeOutSine:function(b,e,c,g,a){return g*Math.sin(e/a*(Math.PI/2))+c},easeOutCubic:function(b,e,c,g,a){return g*((e=e/a-1)*e*e+1)+c}})})(jQuery,window);
// jquery.rs.bullets v1.0
(function(c){c.extend(c.rsProto,{_f5:function(){var a=this;"bullets"===a.st.controlNavigation&&(a.ev.one("rsAfterPropsSetup",function(){a._g5=!0;a.slider.addClass("rsWithBullets");for(var b='<div class="rsNav rsBullets">',e=0;e<a.numSlides;e++)b+='<div class="rsNavItem rsBullet"><span class=""></span></div>';b=c(b+"</div>");a._t4=b;a._h5=b.children();a.slider.append(b);a._t4.click(function(b){b=c(b.target).closest(".rsNavItem");b.length&&a.goTo(b.index())})}),a.ev.on("rsOnAppendSlide",function(b,
c,d){d>=a.numSlides?a._t4.append('<div class="rsNavItem rsBullet"><span class=""></span></div>'):a._h5.eq(d).before('<div class="rsNavItem rsBullet"><span class=""></span></div>');a._h5=a._t4.children()}),a.ev.on("rsOnRemoveSlide",function(b,c){var d=a._h5.eq(c);d&&(d.remove(),a._h5=a._t4.children())}),a.ev.on("rsOnUpdateNav",function(){var b=a.currSlideId;a._i5&&a._i5.removeClass("rsNavSelected");b=c(a._h5[b]);b.addClass("rsNavSelected");a._i5=b}))}});c.rsModules.bullets=c.rsProto._f5})(jQuery);
// jquery.rs.thumbnails v1.0.2
(function(f){f.extend(f.rsProto,{_y5:function(){var a=this;"thumbnails"===a.st.controlNavigation&&(a._z5={drag:!0,touch:!0,orientation:"horizontal",navigation:!0,arrows:!0,arrowLeft:null,arrowRight:null,spacing:4,arrowsAutoHide:!1,appendSpan:!1,transitionSpeed:600,autoCenter:!0,fitInViewport:!0,firstMargin:!0},a.st.thumbs=f.extend({},a._z5,a.st.thumbs),a.ev.on("rsBeforeParseNode",function(a,b,c){b=f(b);c.thumbnail=b.find(".rsTmb").remove();c.thumbnail.length?c.thumbnail=f(document.createElement("div")).append(c.thumbnail).html():
(c.thumbnail=b.attr("data-rsTmb"),c.thumbnail||(c.thumbnail=b.find(".rsImg").attr("data-rsTmb")),c.thumbnail=c.thumbnail?'<img src="'+c.thumbnail+'"/>':"")}),a.ev.one("rsAfterPropsSetup",function(){a._a6()}),a.ev.on("rsOnUpdateNav",function(){var e=a.currSlideId,b;a._i5&&a._i5.removeClass("rsNavSelected");b=f(a._h5[e]);b.addClass("rsNavSelected");a._b6&&a._c6(e);a._i5=b}),a.ev.on("rsOnAppendSlide",function(e,b,c){e="<div"+a._d6+' class="rsNavItem rsThumb">'+a._e6+b.thumbnail+"</div>";c>=a.numSlides?
a._l3.append(e):a._h5.eq(c).before(e);a._h5=a._l3.children();a.updateThumbsSize()}),a.ev.on("rsOnRemoveSlide",function(e,b){var c=a._h5.eq(b);c&&(c.remove(),a._h5=a._l3.children(),a.updateThumbsSize())}))},_a6:function(){var a=this,e="rsThumbs",b="",c,g,d=a.st.thumbs.spacing;a._g5=!0;0<d?(c=d+"px ",c=' style="margin: 0 '+c+c+'0;"'):c="";a._d6=c;a._x2="vertical"===a.st.thumbs.orientation?!1:!0;a._b3=0;a._f6=!1;a._g6=!1;a._b6=!1;a._h6=a.st.thumbs.arrows&&a.st.thumbs.navigation;g=a._x2?"Hor":"Ver";a.slider.addClass("rsWithThumbs rsWithThumbs"+
g);b+='<div class="rsNav rsThumbs rsThumbs'+g+'"><div class="'+e+'Container">';a._e6=a.st.thumbs.appendSpan?'<span class="thumbIco"></span>':"";for(var h=0;h<a.numSlides;h++)g=a.slides[h],b+="<div"+c+' class="rsNavItem rsThumb">'+a._e6+g.thumbnail+"</div>";b=f(b+"</div></div>");a._l3=f(b).find("."+e+"Container");a._h6&&(e+="Arrow",a.st.thumbs.arrowLeft?a._i6=a.st.thumbs.arrowLeft:(a._i6=f('<div class="'+e+" "+e+'Left"><div class="'+e+'Icn"></div></div>'),b.append(a._i6)),a.st.thumbs.arrowRight?a._j6=
a.st.thumbs.arrowRight:(a._j6=f('<div class="'+e+" "+e+'Right"><div class="'+e+'Icn"></div></div>'),b.append(a._j6)),a._i6.click(function(){var b=(Math.floor(a._b3/a._k6)+a._l6)*a._k6;a._t3(b>a._g3?a._g3:b)}),a._j6.click(function(){var b=(Math.floor(a._b3/a._k6)-a._l6)*a._k6;a._t3(b<a._h3?a._h3:b)}),a.st.thumbs.arrowsAutoHide&&!a.hasTouch&&(a._i6.css("opacity",0),a._j6.css("opacity",0),b.one("mousemove.rsarrowshover",function(){a._b6&&(a._i6.css("opacity",1),a._j6.css("opacity",1))}),b.hover(function(){a._b6&&
(a._i6.css("opacity",1),a._j6.css("opacity",1))},function(){a._b6&&(a._i6.css("opacity",0),a._j6.css("opacity",0))})));a._t4=b;a._h5=a._l3.children();a.slider.append(b);a._p3=!0;a._m6=d;a.st.thumbs.navigation&&a._c&&a._l3.css(a._e+"transition-property",a._e+"transform");a._t4.click(function(b){a._g6||(b=f(b.target).closest(".rsNavItem"),b.length&&a.goTo(b.index()))});a.ev.off("rsBeforeSizeSet.thumbs").on("rsBeforeSizeSet.thumbs",function(){a._n6=a._x2?a._v3:a._u3;a.updateThumbsSize()})},updateThumbsSize:function(){var a=
this,e=a._h5.first(),b={},c=a._h5.length;a._k6=(a._x2?e.outerWidth():e.outerHeight())+a._m6;a._r3=c*a._k6-a._m6;b[a._x2?"width":"height"]=a._r3+a._m6;a._s3=a._x2?a._t4.width():a._t4.height();a._h3=-(a._r3-a._s3)-(a.st.thumbs.firstMargin?a._m6:0);a._g3=a.st.thumbs.firstMargin?a._m6:0;a._l6=Math.floor(a._s3/a._k6);if(a._r3<a._s3)a.st.thumbs.autoCenter&&a._j3((a._s3-a._r3)/2),a.st.thumbs.arrows&&a._i6&&(a._i6.addClass("rsThumbsArrowDisabled"),a._j6.addClass("rsThumbsArrowDisabled")),a._b6=!1,a._g6=!1,
a._t4.off(a._f1);else if(a.st.thumbs.navigation&&!a._b6&&(a._b6=!0,!a.hasTouch&&a.st.thumbs.drag||a.hasTouch&&a.st.thumbs.touch))a._g6=!0,a._t4.on(a._f1,function(b){a._b2(b,!0)});a._l3.css(b);if(a._p3&&(a.isFullscreen||a.st.thumbs.fitInViewport))a._x2?a._v3=a._n6-a._t4.outerHeight():a._u3=a._n6-a._t4.outerWidth()},setThumbsOrientation:function(a,e){this._p3&&(this.st.thumbs.orientation=a,this._t4.remove(),this.slider.removeClass("rsWithThumbsHor rsWithThumbsVer"),this._a6(),this._t4.off(this._f1),
e||this.updateSliderSize(!0))},_j3:function(a){this._b3=a;this._c?this._l3.css(this._r1,this._s1+(this._x2?a+this._t1+0:0+this._t1+a)+this._u1):this._l3.css(this._x2?this._r1:this._q1,a)},_t3:function(a,e,b,c,g){var d=this;if(d._b6){e||(e=d.st.thumbs.transitionSpeed);d._b3=a;d._o6&&clearTimeout(d._o6);d._f6&&(d._c||d._l3.stop(),b=!0);var h={};d._f6=!0;d._c?(h[d._e+"transition-duration"]=e+"ms",h[d._e+"transition-timing-function"]=b?f.rsCSS3Easing[d.st.easeOut]:f.rsCSS3Easing[d.st.easeInOut],d._l3.css(h),
d._j3(a)):(h[d._x2?d._r1:d._q1]=a+"px",d._l3.animate(h,e,b?"easeOutCubic":d.st.easeInOut));c&&(d._b3=c);d._p6();d._o6=setTimeout(function(){d._f6=!1;g&&(d._t3(c,g,!0),g=null)},e)}},_p6:function(){this._h6&&(this._b3===this._g3?this._i6.addClass("rsThumbsArrowDisabled"):this._i6.removeClass("rsThumbsArrowDisabled"),this._b3===this._h3?this._j6.addClass("rsThumbsArrowDisabled"):this._j6.removeClass("rsThumbsArrowDisabled"))},_c6:function(a,e){var b=0,c,f=a*this._k6+2*this._k6-this._m6+this._g3,d=Math.floor(this._b3/
this._k6);this._b6&&(f+this._b3>this._s3?(a===this.numSlides-1&&(b=1),d=-a+this._l6-2+b,c=d*this._k6+this._s3%this._k6+this._m6-this._g3):0!==a?(a-1)*this._k6<=-this._b3+this._g3&&a-1<=this.numSlides-this._l6&&(c=(-a+1)*this._k6+this._g3):c=this._g3,c!==this._b3&&(b=void 0===c?this._b3:c,b>this._g3?this._j3(this._g3):b<this._h3?this._j3(this._h3):void 0!==c&&(e?this._j3(c):this._t3(c))),this._p6())}});f.rsModules.thumbnails=f.rsProto._y5})(jQuery);
// jquery.rs.tabs v1.0.1
(function(e){e.extend(e.rsProto,{_w5:function(){var a=this;"tabs"===a.st.controlNavigation&&(a.ev.on("rsBeforeParseNode",function(a,d,b){d=e(d);b.thumbnail=d.find(".rsTmb").remove();b.thumbnail.length?b.thumbnail=e(document.createElement("div")).append(b.thumbnail).html():(b.thumbnail=d.attr("data-rsTmb"),b.thumbnail||(b.thumbnail=d.find(".rsImg").attr("data-rsTmb")),b.thumbnail=b.thumbnail?'<img src="'+b.thumbnail+'"/>':"")}),a.ev.one("rsAfterPropsSetup",function(){a._x5()}),a.ev.on("rsOnAppendSlide",
function(c,d,b){b>=a.numSlides?a._t4.append('<div class="rsNavItem rsTab">'+d.thumbnail+"</div>"):a._h5.eq(b).before('<div class="rsNavItem rsTab">'+item.thumbnail+"</div>");a._h5=a._t4.children()}),a.ev.on("rsOnRemoveSlide",function(c,d){var b=a._h5.eq(d);b&&(b.remove(),a._h5=a._t4.children())}),a.ev.on("rsOnUpdateNav",function(){var c=a.currSlideId;a._i5&&a._i5.removeClass("rsNavSelected");c=e(a._h5[c]);c.addClass("rsNavSelected");a._i5=c}))},_x5:function(){var a=this,c,d;a._g5=!0;c='<div class="rsNav rsTabs">';
for(var b=0;b<a.numSlides;b++)b===a.numSlides-1&&(style=""),d=a.slides[b],c+='<div class="rsNavItem rsTab">'+d.thumbnail+"</div>";c=e(c+"</div>");a._t4=c;a._h5=c.find(".rsNavItem");a.slider.append(c);a._t4.click(function(b){b=e(b.target).closest(".rsNavItem");b.length&&a.goTo(b.index())})}});e.rsModules.tabs=e.rsProto._w5})(jQuery);
// jquery.rs.fullscreen v1.0.1
(function(c){c.extend(c.rsProto,{_l5:function(){var a=this;a._m5={enabled:!1,keyboardNav:!0,buttonFS:!0,nativeFS:!1,doubleTap:!0};a.st.fullscreen=c.extend({},a._m5,a.st.fullscreen);if(a.st.fullscreen.enabled)a.ev.one("rsBeforeSizeSet",function(){a._n5()})},_n5:function(){var a=this;a._o5=!a.st.keyboardNavEnabled&&a.st.fullscreen.keyboardNav;if(a.st.fullscreen.nativeFS){a._p5={supportsFullScreen:!1,isFullScreen:function(){return!1},requestFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",
prefix:""};var b=["webkit","moz","o","ms","khtml"];if("undefined"!=typeof document.cancelFullScreen)a._p5.supportsFullScreen=!0;else for(var d=0;d<b.length;d++)if(a._p5.prefix=b[d],"undefined"!=typeof document[a._p5.prefix+"CancelFullScreen"]){a._p5.supportsFullScreen=!0;break}a._p5.supportsFullScreen?(a._p5.fullScreenEventName=a._p5.prefix+"fullscreenchange.rs",a._p5.isFullScreen=function(){switch(this.prefix){case "":return document.fullScreen;case "webkit":return document.webkitIsFullScreen;default:return document[this.prefix+
"FullScreen"]}},a._p5.requestFullScreen=function(a){return""===this.prefix?a.requestFullScreen():a[this.prefix+"RequestFullScreen"]()},a._p5.cancelFullScreen=function(){return""===this.prefix?document.cancelFullScreen():document[this.prefix+"CancelFullScreen"]()}):a._p5=!1}a.st.fullscreen.buttonFS&&(a._q5=c('<div class="rsFullscreenBtn"><div class="rsFullscreenIcn"></div></div>').appendTo(a.st.controlsInside?a._a1:a.slider).on("click.rs",function(){a.isFullscreen?a.exitFullscreen():a.enterFullscreen()}))},
enterFullscreen:function(a){var b=this;if(b._p5)if(a)b._p5.requestFullScreen(c("html")[0]);else{b._a.on(b._p5.fullScreenEventName,function(){b._p5.isFullScreen()?b.enterFullscreen(!0):b.exitFullscreen(!0)});b._p5.requestFullScreen(c("html")[0]);return}if(!b._r5){b._r5=!0;b._a.on("keyup.rsfullscreen",function(a){27===a.keyCode&&b.exitFullscreen()});b._o5&&b._v1();b._s5=c("html").attr("style");b._t5=c("body").attr("style");b._u5=b.slider.attr("style");c("body, html").css({overflow:"hidden",height:"100%",
width:"100%",margin:"0",padding:"0"});b.slider.addClass("rsFullscreen");var d;for(d=0;d<b.numSlides;d++)if(a=b.slides[d],a.isRendered=!1,a.bigImage){a.isMedLoaded=a.isLoaded;a.isMedLoading=a.isLoading;a.medImage=a.image;a.medIW=a.iW;a.medIH=a.iH;a.slideId=-99;a.bigImage!==a.medImage&&(a.sizeType="big");a.isLoaded=a.isBigLoaded;a.isLoading=a.isBigLoading;a.image=a.bigImage;a.iW=a.bigIW;a.iH=a.bigIH;a.contentAdded=!1;var e=!a.isLoaded?'<a class="rsImg" href="'+a.image+'"></a>':'<img class="rsImg" src="'+
a.image+'"/>';a.content.hasClass("rsImg")?a.content=c(e):a.content.find(".rsImg").replaceWith(e)}b.isFullscreen=!0;setTimeout(function(){b._r5=!1;b.updateSliderSize();b.ev.trigger("rsEnterFullscreen")},100)}},exitFullscreen:function(a){var b=this;if(b._p5){if(!a){b._p5.cancelFullScreen(c("html")[0]);return}b._a.off(b._p5.fullScreenEventName)}if(!b._r5){b._r5=!0;b._a.off("keyup.rsfullscreen");b._o5&&b._a.off("keydown.rskb");c("html").attr("style",b._s5||"");c("body").attr("style",b._t5||"");b.slider.removeClass("rsFullscreen");
var d;for(d=0;d<b.numSlides;d++)if(a=b.slides[d],a.isRendered=!1,a.bigImage){a.slideId=-99;a.isBigLoaded=a.isLoaded;a.isBigLoading=a.isLoading;a.bigImage=a.image;a.bigIW=a.iW;a.bigIH=a.iH;a.isLoaded=a.isMedLoaded;a.isLoading=a.isMedLoading;a.image=a.medImage;a.iW=a.medIW;a.iH=a.medIH;a.contentAdded=!1;var e=!a.isLoaded?'<a class="rsImg" href="'+a.image+'"></a>':'<img class="rsImg" src="'+a.image+'"/>';a.content.hasClass("rsImg")?a.content=c(e):a.content.find(".rsImg").replaceWith(e);a.holder&&a.holder.html(a.content);
a.bigImage!==a.medImage&&(a.sizeType="med")}b.isFullscreen=!1;setTimeout(function(){b._r5=!1;b.updateSliderSize();b.ev.trigger("rsExitFullscreen")},100)}}});c.rsModules.fullscreen=c.rsProto._l5})(jQuery);
// jquery.rs.autoplay v1.0.4
(function(b){b.extend(b.rsProto,{_u4:function(){var a=this,d;a._v4={enabled:!1,stopAtAction:!0,pauseOnHover:!0,delay:2E3};!a.st.autoPlay&&a.st.autoplay&&(a.st.autoPlay=a.st.autoplay);a.st.autoPlay=b.extend({},a._v4,a.st.autoPlay);a.st.autoPlay.enabled&&(a.ev.on("rsBeforeParseNode",function(a,c,e){c=b(c);if(d=c.attr("data-rsDelay"))e.customDelay=parseInt(d,10)}),a.ev.one("rsAfterInit",function(){a._w4()}),a.ev.on("rsBeforeDestroy",function(){a.stopAutoPlay()}))},_w4:function(){var a=this;a.startAutoPlay();
a.ev.on("rsAfterContentSet",function(d,b){!a._g2&&(!a._m2&&a._x4&&b===a.currSlide)&&a._y4()});a.ev.on("rsDragRelease",function(){a._x4&&a._z4&&(a._z4=!1,a._y4())});a.ev.on("rsAfterSlideChange",function(){a._x4&&a._z4&&(a._z4=!1,a.currSlide.isLoaded&&a._y4())});a.ev.on("rsDragStart",function(){a._x4&&(a.st.autoPlay.stopAtAction?a.stopAutoPlay():(a._z4=!0,a._a5()))});a.ev.on("rsBeforeMove",function(b,f,c){a._x4&&(c&&a.st.autoPlay.stopAtAction?a.stopAutoPlay():(a._z4=!0,a._a5()))});a._b5=!1;a.ev.on("rsVideoStop",
function(){a._x4&&(a._b5=!1,a._y4())});a.ev.on("rsVideoPlay",function(){a._x4&&(a._z4=!1,a._a5(),a._b5=!0)});a.st.autoPlay.pauseOnHover&&(a._c5=!1,a.slider.hover(function(){a._x4&&(a._z4=!1,a._a5(),a._c5=!0)},function(){a._x4&&(a._c5=!1,a._y4())}))},toggleAutoPlay:function(){this._x4?this.stopAutoPlay():this.startAutoPlay()},startAutoPlay:function(){this._x4=!0;this.currSlide.isLoaded&&this._y4()},stopAutoPlay:function(){this._b5=this._c5=this._z4=this._x4=!1;this._a5()},_y4:function(){var a=this;
!a._c5&&!a._b5&&(a._d5=!0,a._e5&&clearTimeout(a._e5),a._e5=setTimeout(function(){var b;!a._v&&!a.st.loopRewind&&(b=!0,a.st.loopRewind=!0);a.next(!0);b&&(a.st.loopRewind=!1)},!a.currSlide.customDelay?a.st.autoPlay.delay:a.currSlide.customDelay))},_a5:function(){!this._c5&&!this._b5&&(this._d5=!1,this._e5&&(clearTimeout(this._e5),this._e5=null))}});b.rsModules.autoplay=b.rsProto._u4})(jQuery);
// jquery.rs.video v1.0.4
(function(e){e.extend(e.rsProto,{_q6:function(){var a=this;a._r6={autoHideArrows:!0,autoHideControlNav:!1,autoHideBlocks:!1,youTubeCode:'<iframe src="http://www.youtube.com/embed/%id%?rel=1&autoplay=1&showinfo=0&autoplay=1&wmode=transparent" frameborder="no"></iframe>',vimeoCode:'<iframe src="http://player.vimeo.com/video/%id%?byline=0&amp;portrait=0&amp;autoplay=1" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'};a.st.video=e.extend({},a._r6,a.st.video);a.ev.on("rsBeforeSizeSet",
function(){a._d4&&setTimeout(function(){var b=a._d1,b=b.hasClass("rsVideoContainer")?b:b.find(".rsVideoContainer");a._s6.css({width:b.width(),height:b.height()})},32)});var c=e.browser.mozilla;a.ev.on("rsAfterParseNode",function(b,f,d){b=e(f);if(d.videoURL){c&&(a._c=a._d=!1);var f=e('<div class="rsVideoContainer"></div>'),g=e('<div class="rsBtnCenterer"><div class="rsPlayBtn"><div class="rsPlayBtnIcon"></div></div></div>');b.hasClass("rsImg")?d.content=f.append(b).append(g):d.content.find(".rsImg").wrap(f).after(g)}})},
toggleVideo:function(){return this._d4?this.stopVideo():this.playVideo()},playVideo:function(){var a=this;if(!a._d4){var c=a.currSlide;if(!c.videoURL)return!1;var b=a._t6=c.content,c=c.videoURL,f,d;c.match(/youtu\.be/i)||c.match(/youtube\.com\/watch/i)?(d=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,(d=c.match(d))&&11==d[7].length&&(f=d[7]),void 0!==f&&(a._s6=a.st.video.youTubeCode.replace("%id%",f))):c.match(/vimeo\.com/i)&&(d=/\/\/(www\.)?vimeo.com\/(\d+)($|\/)/,
(d=c.match(d))&&(f=d[2]),void 0!==f&&(a._s6=a.st.video.vimeoCode.replace("%id%",f)));a.videoObj=e(a._s6);a.ev.trigger("rsOnCreateVideoElement",[c]);a.videoObj.length&&(a._s6=e('<div class="rsVideoFrameHolder"><div class="rsPreloader"></div><div class="rsCloseVideoBtn"><div class="rsCloseVideoIcn"></div></div></div>'),a._s6.find(".rsPreloader").after(a.videoObj),b=b.hasClass("rsVideoContainer")?b:b.find(".rsVideoContainer"),a._s6.css({width:b.width(),height:b.height()}).find(".rsCloseVideoBtn").off("click.rsv").on("click.rsv",
function(b){a.stopVideo();b.preventDefault();b.stopPropagation();return!1}),b.append(a._s6),a.isIPAD&&b.addClass("rsIOSVideo"),a._w1&&a.st.video.autoHideArrows&&(a._w1.addClass("rsHidden"),a._x1.addClass("rsHidden"),a._y1=!0),a._t4&&a.st.video.autoHideControlNav&&a._t4.addClass("rsHidden"),a.st.video.autoHideBlocks&&a.currSlide.animBlocks&&a.currSlide.animBlocks.addClass("rsHidden"),setTimeout(function(){a._s6.addClass("rsVideoActive")},10),a.ev.trigger("rsVideoPlay"),a._d4=!0);return!0}return!1},
stopVideo:function(){var a=this;return a._d4?(a.isIPAD&&a.slider.find(".rsCloseVideoBtn").remove(),a._w1&&a.st.video.autoHideArrows&&(a._w1.removeClass("rsHidden"),a._x1.removeClass("rsHidden"),a._y1=!1),a._t4&&a.st.video.autoHideControlNav&&a._t4.removeClass("rsHidden"),a.st.video.autoHideBlocks&&a.currSlide.animBlocks&&a.currSlide.animBlocks.removeClass("rsHidden"),setTimeout(function(){a.ev.trigger("rsOnDestroyVideoElement",[a.videoObj]);var c=a._s6.find("iframe");c.length&&c.attr("src","");a._s6.remove()},
16),a.ev.trigger("rsVideoStop"),a._d4=!1,!0):!1}});e.rsModules.video=e.rsProto._q6})(jQuery);
// jquery.rs.animated-blocks v1.0.2
(function(i){i.extend(i.rsProto,{_k4:function(){function j(){var e=a.currSlide;if(a.currSlide&&a.currSlide.isLoaded&&a._o4!==e){if(0<a._n4.length){for(b=0;b<a._n4.length;b++)clearTimeout(a._n4[b]);a._n4=[]}if(0<a._m4.length){var g;for(b=0;b<a._m4.length;b++)if(g=a._m4[b])a._c?(g.block.css(a._e+a._o1,"0s"),g.block.css(g.css)):g.running?g.block.stop(!0,!0):g.block.css(g.css),a._o4=null,e.animBlocksDisplayed=!1;a._m4=[]}e.animBlocks&&(e.animBlocksDisplayed=!0,a._o4=e,a._p4(e.animBlocks))}}var a=this,
b;a._l4={fadeEffect:!0,moveEffect:"top",moveOffset:20,speed:400,easing:"easeOutSine",delay:200};a.st.block=i.extend({},a._l4,a.st.block);a._m4=[];a._n4=[];a.ev.on("rsAfterInit",function(){j()});a.ev.on("rsBeforeParseNode",function(a,b,c){b=i(b);c.animBlocks=b.find(".rsABlock").css("display","none");c.animBlocks.length||(c.animBlocks=b.hasClass("rsABlock")?b.css("display","none"):!1)});a.ev.on("rsAfterContentSet",function(b,g){g.id===a.currSlideId&&setTimeout(function(){j()},a.st.fadeinLoadedSlide?
300:0)});a.ev.on("rsAfterSlideChange",function(){j()})},_q4:function(i,a){setTimeout(function(){i.css(a)},6)},_p4:function(j){var a=this,b,e,g,c;a._n4=[];j.each(function(j){b=i(this);e={};g={};c=null;var f=b.data("move-offset");isNaN(f)&&(f=a.st.block.moveOffset);if(0<f){var d=b.data("move-effect");d?(d=d.toLowerCase(),"none"===d?d=!1:"left"!==d&&("top"!==d&&"bottom"!==d&&"right"!==d)&&(d=a.st.block.moveEffect,"none"===d&&(d=!1))):d=a.st.block.moveEffect;if(d){var l;l="right"===d||"left"===d?!0:!1;
var k,h;isOppositeProp=!1;a._c?(k=0,h=a._r1):(l?isNaN(parseInt(b.css("right"),10))?h="left":(h="right",isOppositeProp=!0):isNaN(parseInt(b.css("bottom"),10))?h="top":(h="bottom",isOppositeProp=!0),h="margin-"+h,isOppositeProp&&(f=-f),k=parseInt(b.css(h),10));g[h]=a._h4("top"===d||"left"===d?k-f:k+f,l);e[h]=a._h4(k,l)}}if(f=b.attr("data-fade-effect")){if("none"===f.toLowerCase()||"false"===f.toLowerCase())f=!1}else f=a.st.block.fadeEffect;f&&(g.opacity=0,e.opacity=1);if(f||d)c={},c.hasFade=Boolean(f),
Boolean(d)&&(c.moveProp=h,c.hasMove=!0),c.speed=b.data("speed"),isNaN(c.speed)&&(c.speed=a.st.block.speed),c.easing=b.data("easing"),c.easing||(c.easing=a.st.block.easing),c.css3Easing=i.rsCSS3Easing[c.easing],c.delay=b.data("delay"),isNaN(c.delay)&&(c.delay=a.st.block.delay*j);d={};a._c&&(d[a._e+a._o1]="0ms");d.moveProp=e.moveProp;d.opacity=e.opacity;d.display="none";a._m4.push({block:b,css:d});a._q4(b,g);a._n4.push(setTimeout(function(b,d,c,g){return function(){b.css("display","block");if(c){var f=
{};if(a._c){var e="";c.hasMove&&(e+=c.moveProp);c.hasFade&&(c.hasMove&&(e+=", "),e+="opacity");f[a._e+a._n1]=e;f[a._e+a._o1]=c.speed+"ms";f[a._e+a._p1]=c.css3Easing;b.css(f);setTimeout(function(){b.css(d)},24)}else setTimeout(function(){b.animate(d,c.speed,c.easing)},16)}delete a._n4[g]}}(b,e,c,j),6>=c.delay?12:c.delay))})}});i.rsModules.animatedBlocks=i.rsProto._k4})(jQuery);
// jquery.rs.auto-height v1.0.1
(function(b){b.extend(b.rsProto,{_r4:function(){var a=this;if(a.st.autoHeight){var b,c;a.slider.addClass("rsAutoHeight");a.ev.on("rsAfterInit",function(){setTimeout(function(){d(!1);setTimeout(function(){a.slider.append('<div id="clear" style="clear:both;"></div>');a._c&&a._a1.css(a._e+"transition","height "+a.st.transitionSpeed+"ms ease-in-out")},16)},16)});a.ev.on("rsBeforeAnimStart",function(){d(!0)});a.ev.on("rsBeforeSizeSet",function(){setTimeout(function(){d(!1)},16)});var d=function(f){var e=
a.slides[a.currSlideId];b=e.holder;if(e.isLoaded)b&&(c=b.height(),0!==c&&void 0!==c&&(a._v3=c,a._c||!f?a._a1.css("height",c):a._a1.stop(!0,!0).animate({height:c},a.st.transitionSpeed)));else a.ev.off("rsAfterContentSet.rsAutoHeight").on("rsAfterContentSet.rsAutoHeight",function(a,b){e===b&&d()})}}}});b.rsModules.autoHeight=b.rsProto._r4})(jQuery);
// jquery.rs.global-caption v1.0
(function(b){b.extend(b.rsProto,{_v5:function(){var a=this;a.st.globalCaption&&(a.ev.on("rsAfterInit",function(){a.globalCaption=b('<div class="rsGCaption"></div>').appendTo(a.slider);a.globalCaption.html(a.currSlide.caption)}),a.ev.on("rsBeforeAnimStart",function(){a.globalCaption.html(a.currSlide.caption)}))}});b.rsModules.globalCaption=b.rsProto._v5})(jQuery);
// jquery.rs.active-class v1.0
(function(b){b.rsProto._j4=function(){var c,a=this;if(a.st.addActiveClass){a.ev.on("rsBeforeMove",function(){b()});a.ev.on("rsAfterInit",function(){b()});var b=function(){c&&clearTimeout(c);c=setTimeout(function(){a._a4&&a._a4.removeClass("rsActiveSlide");a._d1&&a._d1.addClass("rsActiveSlide");c=null},50)}}};b.rsModules.activeClass=b.rsProto._j4})(jQuery);
// jquery.rs.deeplinking v1.0.1 + jQuery hashchange plugin v1.3 Copyright (c) 2010
(function(a){a.extend(a.rsProto,{_j5:function(){var b=this,g,d,e;b._k5={enabled:!1,change:!1,prefix:""};b.st.deeplinking=a.extend({},b._k5,b.st.deeplinking);if(b.st.deeplinking.enabled){var j=b.st.deeplinking.change,c="#"+b.st.deeplinking.prefix,f=function(){var a=window.location.hash;return a&&(a=parseInt(a.substring(c.length),10),0<=a)?a-1:-1},h=f();-1!==h&&(b.st.startSlideId=h);if(j)a(window).on("hashchange.rs",function(){if(!g){var a=f();0>a||(a>b.numSlides-1&&(a=b.numSlides-1),b.goTo(a))}});
b.ev.on("rsAfterSlideChange",function(){d&&clearTimeout(d);e&&clearTimeout(e);e=setTimeout(function(){g=!0;window.location.hash=c+(b.currSlideId+1);d=setTimeout(function(){g=!1;d=0},60)},750)})}}});a.rsModules.deeplinking=a.rsProto._j5})(jQuery);
(function(a,b,g){function d(a){a=a||location.href;return"#"+a.replace(/^[^#]*#?(.*)$/,"$1")}"$:nomunge";var e=document,j,c=a.event.special,f=e.documentMode,h="onhashchange"in b&&(f===g||7<f);a.fn.hashchange=function(a){return a?this.bind("hashchange",a):this.trigger("hashchange")};a.fn.hashchange.delay=50;c.hashchange=a.extend(c.hashchange,{setup:function(){if(h)return!1;a(j.start)},teardown:function(){if(h)return!1;a(j.stop)}});var n=function(){var c=d(),e=q(m);c!==m?(p(m=c,e),a(b).trigger("hashchange")):
e!==m&&(location.href=location.href.replace(/#.*/,"")+e);k=setTimeout(n,a.fn.hashchange.delay)},c={},k,m=d(),p=f=function(a){return a},q=f;c.start=function(){k||n()};c.stop=function(){k&&clearTimeout(k);k=g};if(a.browser.msie&&!h){var i,l;c.start=function(){i||(l=(l=a.fn.hashchange.src)&&l+d(),i=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){l||p(d());n()}).attr("src",l||"javascript:0").insertAfter("body")[0].contentWindow,e.onpropertychange=function(){try{"title"===event.propertyName&&
(i.document.title=e.title)}catch(a){}})};c.stop=f;q=function(){return d(i.location.href)};p=function(b,c){var d=i.document,f=a.fn.hashchange.domain;b!==c&&(d.title=e.title,d.open(),f&&d.write('<script>document.domain="'+f+'"<\/script>'),d.close(),i.location.hash=b)}}j=c})(jQuery,this);

module.exports = jQuery;

});
define("product/guoqude/1.0.0/front_net/module/fineuploader/fineuploader-debug", ["gallery/jquery/1.8.3/jquery-debug"], function (require, exports, module) {
var jQuery = require('gallery/jquery/1.8.3/jquery-debug').sub();

/**
 * http://github.com/Valums-File-Uploader/file-uploader
 *
 * Multiple file upload component with progress-bar, drag-and-drop, support for all modern browsers.
 *
 * Original version: 1.0 © 2010 Andrew Valums ( andrew(at)valums.com )
 * Current Maintainer (2.0+): © 2012, Ray Nicholus ( fineuploader(at)garstasio.com )
 *
 * Licensed under MIT license, GNU GPL 2 or later, GNU LGPL 2 or later, see license.txt.
 */

var qq = qq || {};
var qq = function(element) {
    "use strict";

    return {
        hide: function() {
            element.style.display = 'none';
            return this;
        },

        /** Returns the function which detaches attached event */
        attach: function(type, fn) {
            if (element.addEventListener){
                element.addEventListener(type, fn, false);
            } else if (element.attachEvent){
                element.attachEvent('on' + type, fn);
            }
            return function() {
                qq(element).detach(type, fn);
            };
        },

        detach: function(type, fn) {
            if (element.removeEventListener){
                element.removeEventListener(type, fn, false);
            } else if (element.attachEvent){
                element.detachEvent('on' + type, fn);
            }
            return this;
        },

        contains: function(descendant) {
            // compareposition returns false in this case
            if (element == descendant) {
                return true;
            }

            if (element.contains){
                return element.contains(descendant);
            } else {
                return !!(descendant.compareDocumentPosition(element) & 8);
            }
        },

        /**
         * Insert this element before elementB.
         */
        insertBefore: function(elementB) {
            elementB.parentNode.insertBefore(element, elementB);
            return this;
        },

        remove: function() {
            element.parentNode.removeChild(element);
            return this;
        },

        /**
         * Sets styles for an element.
         * Fixes opacity in IE6-8.
         */
        css: function(styles) {
            if (styles.opacity != null){
                if (typeof element.style.opacity != 'string' && typeof(element.filters) != 'undefined'){
                    styles.filter = 'alpha(opacity=' + Math.round(100 * styles.opacity) + ')';
                }
            }
            qq.extend(element.style, styles);

            return this;
        },

        hasClass: function(name) {
            var re = new RegExp('(^| )' + name + '( |$)');
            return re.test(element.className);
        },

        addClass: function(name) {
            if (!qq(element).hasClass(name)){
                element.className += ' ' + name;
            }
            return this;
        },

        removeClass: function(name) {
            var re = new RegExp('(^| )' + name + '( |$)');
            element.className = element.className.replace(re, ' ').replace(/^\s+|\s+$/g, "");
            return this;
        },

        getByClass: function(className) {
            if (element.querySelectorAll){
                return element.querySelectorAll('.' + className);
            }

            var result = [];
            var candidates = element.getElementsByTagName("*");
            var len = candidates.length;

            for (var i = 0; i < len; i++){
                if (qq(candidates[i]).hasClass(className)){
                    result.push(candidates[i]);
                }
            }
            return result;
        },

        children: function() {
            var children = [],
                child = element.firstChild;

            while (child){
                if (child.nodeType == 1){
                    children.push(child);
                }
                child = child.nextSibling;
            }

            return children;
        },

        setText: function(text) {
            element.innerText = text;
            element.textContent = text;
            return this;
        },

        clearText: function() {
            return qq(element).setText("");
        }
    };
};

qq.log = function(message, level) {
    if (window.console) {
        if (!level || level === 'info') {
            window.console.log(message);
        }
        else
        {
            if (window.console[level]) {
                window.console[level](message);
            }
            else {
                window.console.log('<' + level + '> ' + message);
            }
        }
    }
};

qq.isObject = function(variable) {
    "use strict";
    return variable !== null && variable && typeof(variable) === "object" && variable.constructor === Object;
};

qq.extend = function (first, second, extendNested) {
    "use strict";
    var prop;
    for (prop in second) {
        if (second.hasOwnProperty(prop)) {
            if (extendNested && qq.isObject(second[prop])) {
                if (first[prop] === undefined) {
                    first[prop] = {};
                }
                qq.extend(first[prop], second[prop], true);
            }
            else {
                first[prop] = second[prop];
            }
        }
    }
};

/**
 * Searches for a given element in the array, returns -1 if it is not present.
 * @param {Number} [from] The index at which to begin the search
 */
qq.indexOf = function(arr, elt, from){
    if (arr.indexOf) return arr.indexOf(elt, from);

    from = from || 0;
    var len = arr.length;

    if (from < 0) from += len;

    for (; from < len; from++){
        if (from in arr && arr[from] === elt){
            return from;
        }
    }
    return -1;
};

qq.getUniqueId = (function(){
    var id = 0;
    return function(){ return id++; };
})();

//
// Browsers and platforms detection

qq.ie       = function(){ return navigator.userAgent.indexOf('MSIE') != -1; }
qq.ie10     = function(){ return navigator.userAgent.indexOf('MSIE 10') != -1; }
qq.safari   = function(){ return navigator.vendor != undefined && navigator.vendor.indexOf("Apple") != -1; }
qq.chrome   = function(){ return navigator.vendor != undefined && navigator.vendor.indexOf('Google') != -1; }
qq.firefox  = function(){ return (navigator.userAgent.indexOf('Mozilla') != -1 && navigator.vendor != undefined && navigator.vendor == ''); }
qq.windows  = function(){ return navigator.platform == "Win32"; }

//
// Events

qq.preventDefault = function(e){
    if (e.preventDefault){
        e.preventDefault();
    } else{
        e.returnValue = false;
    }
};

/**
 * Creates and returns element from html string
 * Uses innerHTML to create an element
 */
qq.toElement = (function(){
    var div = document.createElement('div');
    return function(html){
        div.innerHTML = html;
        var element = div.firstChild;
        div.removeChild(element);
        return element;
    };
})();

/**
 * obj2url() takes a json-object as argument and generates
 * a querystring. pretty much like jQuery.param()
 *
 * how to use:
 *
 *    `qq.obj2url({a:'b',c:'d'},'http://any.url/upload?otherParam=value');`
 *
 * will result in:
 *
 *    `http://any.url/upload?otherParam=value&a=b&c=d`
 *
 * @param  Object JSON-Object
 * @param  String current querystring-part
 * @return String encoded querystring
 */
qq.obj2url = function(obj, temp, prefixDone){
    var uristrings = [],
        prefix = '&',
        add = function(nextObj, i){
            var nextTemp = temp
                ? (/\[\]$/.test(temp)) // prevent double-encoding
                ? temp
                : temp+'['+i+']'
                : i;
            if ((nextTemp != 'undefined') && (i != 'undefined')) {
                uristrings.push(
                    (typeof nextObj === 'object')
                        ? qq.obj2url(nextObj, nextTemp, true)
                        : (Object.prototype.toString.call(nextObj) === '[object Function]')
                        ? encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj())
                        : encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj)
                );
            }
        };

    if (!prefixDone && temp) {
        prefix = (/\?/.test(temp)) ? (/\?$/.test(temp)) ? '' : '&' : '?';
        uristrings.push(temp);
        uristrings.push(qq.obj2url(obj));
    } else if ((Object.prototype.toString.call(obj) === '[object Array]') && (typeof obj != 'undefined') ) {
        // we wont use a for-in-loop on an array (performance)
        for (var i = 0, len = obj.length; i < len; ++i){
            add(obj[i], i);
        }
    } else if ((typeof obj != 'undefined') && (obj !== null) && (typeof obj === "object")){
        // for anything else but a scalar, we will use for-in-loop
        for (var i in obj){
            add(obj[i], i);
        }
    } else {
        uristrings.push(encodeURIComponent(temp) + '=' + encodeURIComponent(obj));
    }

    if (temp) {
        return uristrings.join(prefix);
    } else {
        return uristrings.join(prefix)
            .replace(/^&/, '')
            .replace(/%20/g, '+');
    }
};

/**
 * A generic module which supports object disposing in dispose() method.
 * */
qq.DisposeSupport = {
    _disposers: [],

    /** Run all registered disposers */
    dispose: function() {
        var disposer;
        while (disposer = this._disposers.shift()) {
            disposer();
        }
    },

    /** Add disposer to the collection */
    addDisposer: function(disposeFunction) {
        this._disposers.push(disposeFunction);
    },

    /** Attach event handler and register de-attacher as a disposer */
    _attach: function() {
        this.addDisposer(qq(arguments[0]).attach.apply(this, Array.prototype.slice.call(arguments, 1)));
    }
};
qq.UploadButton = function(o){
    this._options = {
        element: null,
        // if set to true adds multiple attribute to file input
        multiple: false,
        acceptFiles: null,
        // name attribute of file input
        name: 'file',
        onChange: function(input){},
        hoverClass: 'qq-upload-button-hover',
        focusClass: 'qq-upload-button-focus'
    };

    qq.extend(this._options, o);
    qq.extend(this, qq.DisposeSupport);

    this._element = this._options.element;

    // make button suitable container for input
    qq(this._element).css({
        position: 'relative',
        overflow: 'hidden',
        // Make sure browse button is in the right side
        // in Internet Explorer
        direction: 'ltr'
    });

    this._input = this._createInput();
};

qq.UploadButton.prototype = {
    /* returns file input element */
    getInput: function(){
        return this._input;
    },
    /* cleans/recreates the file input */
    reset: function(){
        if (this._input.parentNode){
            qq(this._input).remove();
        }

        qq(this._element).removeClass(this._options.focusClass);
        this._input = this._createInput();
    },
    _createInput: function(){
        var input = document.createElement("input");

        if (this._options.multiple){
            input.setAttribute("multiple", "multiple");
        }

        if (this._options.acceptFiles) input.setAttribute("accept", this._options.acceptFiles);

        input.setAttribute("type", "file");
        input.setAttribute("name", this._options.name);

        qq(input).css({
            position: 'absolute',
            // in Opera only 'browse' button
            // is clickable and it is located at
            // the right side of the input
            right: 0,
            top: 0,
            fontFamily: 'Arial',
            // 4 persons reported this, the max values that worked for them were 243, 236, 236, 118
            fontSize: '118px',
            margin: 0,
            padding: 0,
            cursor: 'pointer',
            opacity: 0
        });

        this._element.appendChild(input);

        var self = this;
        this._attach(input, 'change', function(){
            self._options.onChange(input);
        });

        this._attach(input, 'mouseover', function(){
            qq(self._element).addClass(self._options.hoverClass);
        });
        this._attach(input, 'mouseout', function(){
            qq(self._element).removeClass(self._options.hoverClass);
        });
        this._attach(input, 'focus', function(){
            qq(self._element).addClass(self._options.focusClass);
        });
        this._attach(input, 'blur', function(){
            qq(self._element).removeClass(self._options.focusClass);
        });

        // IE and Opera, unfortunately have 2 tab stops on file input
        // which is unacceptable in our case, disable keyboard access
        if (window.attachEvent){
            // it is IE or Opera
            input.setAttribute('tabIndex', "-1");
        }

        return input;
    }
};
qq.FineUploaderBasic = function(o){
    var that = this;
    this._options = {
        debug: false,
        button: null,
        multiple: true,
        maxConnections: 3,
        disableCancelForFormUploads: false,
        autoUpload: true,
        request: {
            endpoint: '/server/upload',
            params: {},
            customHeaders: {},
            forceMultipart: false,
            inputName: 'qqfile'
        },
        validation: {
            allowedExtensions: [],
            sizeLimit: 0,
            minSizeLimit: 0,
            stopOnFirstInvalidFile: true
        },
        callbacks: {
            onSubmit: function(id, fileName){}, // return false to cancel submit
            onComplete: function(id, fileName, responseJSON){},
            onCancel: function(id, fileName){},
            onUpload: function(id, fileName, xhr){},
            onProgress: function(id, fileName, loaded, total){},
            onError: function(id, fileName, reason) {},
            onAutoRetry: function(id, fileName, attemptNumber) {},
            onManualRetry: function(id, fileName) {},
            onValidate: function(fileData) {} // return false to prevent upload
        },
        messages: {
            typeError: "{file} has an invalid extension. Valid extension(s): {extensions}.",
            sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
            minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
            emptyError: "{file} is empty, please select files again without it.",
            noFilesError: "No files to upload.",
            onLeave: "The files are being uploaded, if you leave now the upload will be cancelled."
        },
        retry: {
            enableAuto: false,
            maxAutoAttempts: 3,
            autoAttemptDelay: 5,
            preventRetryResponseProperty: 'preventRetry'
        }
    };

    qq.extend(this._options, o, true);
    this._wrapCallbacks();
    qq.extend(this, qq.DisposeSupport);

    // number of files being uploaded
    this._filesInProgress = 0;

    this._storedFileIds = [];

    this._autoRetries = [];
    this._retryTimeouts = [];
    this._preventRetries = [];

    this._handler = this._createUploadHandler();

    if (this._options.button){
        this._button = this._createUploadButton(this._options.button);
    }

    this._preventLeaveInProgress();
};

qq.FineUploaderBasic.prototype = {
    log: function(str, level) {
        if (this._options.debug && (!level || level === 'info')) {
            qq.log('[FineUploader] ' + str);
        }
        else if (level && level !== 'info') {
            qq.log('[FineUploader] ' + str, level);

        }
    },
    setParams: function(params){
        this._options.request.params = params;
    },
    getInProgress: function(){
        return this._filesInProgress;
    },
    uploadStoredFiles: function(){
        "use strict";
        while(this._storedFileIds.length) {
            this._filesInProgress++;
            this._handler.upload(this._storedFileIds.shift(), this._options.request.params);
        }
    },
    clearStoredFiles: function(){
        this._storedFileIds = [];
    },
    retry: function(id) {
        if (this._onBeforeManualRetry(id)) {
            this._handler.retry(id);
            return true;
        }
        else {
            return false;
        }
    },
    cancel: function(fileId) {
        this._handler.cancel(fileId);
    },
    reset: function() {
        this.log("Resetting uploader...");
        this._handler.reset();
        this._filesInProgress = 0;
        this._storedFileIds = [];
        this._autoRetries = [];
        this._retryTimeouts = [];
        this._preventRetries = [];
        this._button.reset();
    },
    _createUploadButton: function(element){
        var self = this;

        var button = new qq.UploadButton({
            element: element,
            multiple: this._options.multiple && qq.UploadHandlerXhr.isSupported(),
            acceptFiles: this._options.validation.acceptFiles,
            onChange: function(input){
                self._onInputChange(input);
            }
        });

        this.addDisposer(function() { button.dispose(); });
        return button;
    },
    _createUploadHandler: function(){
        var self = this,
            handlerClass;

        if(qq.UploadHandlerXhr.isSupported()){
            handlerClass = 'UploadHandlerXhr';
        } else {
            handlerClass = 'UploadHandlerForm';
        }

        var handler = new qq[handlerClass]({
            debug: this._options.debug,
            endpoint: this._options.request.endpoint,
            forceMultipart: this._options.request.forceMultipart,
            maxConnections: this._options.maxConnections,
            customHeaders: this._options.request.customHeaders,
            inputName: this._options.request.inputName,
            demoMode: this._options.demoMode,
            log: this.log,
            onProgress: function(id, fileName, loaded, total){
                self._onProgress(id, fileName, loaded, total);
                self._options.callbacks.onProgress(id, fileName, loaded, total);
            },
            onComplete: function(id, fileName, result, xhr){
                self._onComplete(id, fileName, result, xhr);
                self._options.callbacks.onComplete(id, fileName, result);
            },
            onCancel: function(id, fileName){
                self._onCancel(id, fileName);
                self._options.callbacks.onCancel(id, fileName);
            },
            onUpload: function(id, fileName, xhr){
                self._onUpload(id, fileName, xhr);
                self._options.callbacks.onUpload(id, fileName, xhr);
            },
            onAutoRetry: function(id, fileName, responseJSON, xhr) {
                self._preventRetries[id] = responseJSON[self._options.retry.preventRetryResponseProperty];

                if (self._shouldAutoRetry(id, fileName, responseJSON)) {
                    self._maybeParseAndSendUploadError(id, fileName, responseJSON, xhr);
                    self._options.callbacks.onAutoRetry(id, fileName, self._autoRetries[id] + 1);
                    self._onBeforeAutoRetry(id, fileName);

                    self._retryTimeouts[id] = setTimeout(function() {
                        self._onAutoRetry(id, fileName, responseJSON)
                    }, self._options.retry.autoAttemptDelay * 1000);

                    return true;
                }
                else {
                    return false;
                }
            }
        });

        return handler;
    },
    _preventLeaveInProgress: function(){
        var self = this;

        this._attach(window, 'beforeunload', function(e){
            if (!self._filesInProgress){return;}

            var e = e || window.event;
            // for ie, ff
            e.returnValue = self._options.messages.onLeave;
            // for webkit
            return self._options.messages.onLeave;
        });
    },
    _onSubmit: function(id, fileName){
        if (this._options.autoUpload) {
            this._filesInProgress++;
        }
    },
    _onProgress: function(id, fileName, loaded, total){
    },
    _onComplete: function(id, fileName, result, xhr){
        this._filesInProgress--;
        this._maybeParseAndSendUploadError(id, fileName, result, xhr);
    },
    _onCancel: function(id, fileName){
        clearTimeout(this._retryTimeouts[id]);

        var storedFileIndex = qq.indexOf(this._storedFileIds, id);
        if (this._options.autoUpload || storedFileIndex < 0) {
            this._filesInProgress--;
        }
        else if (!this._options.autoUpload) {
            this._storedFileIds.splice(storedFileIndex, 1);
        }
    },
    _onUpload: function(id, fileName, xhr){
    },
    _onInputChange: function(input){
        if (this._handler instanceof qq.UploadHandlerXhr){
            this._uploadFileList(input.files);
        } else {
            if (this._validateFile(input)){
                this._uploadFile(input);
            }
        }
        this._button.reset();
    },
    _onBeforeAutoRetry: function(id, fileName) {
        this.log("Waiting " + this._options.retry.autoAttemptDelay + " seconds before retrying " + fileName + "...");
    },
    _onAutoRetry: function(id, fileName, responseJSON) {
        this.log("Retrying " + fileName + "...");
        this._autoRetries[id]++;
        this._handler.retry(id);
    },
    _shouldAutoRetry: function(id, fileName, responseJSON) {
        if (!this._preventRetries[id] && this._options.retry.enableAuto) {
            if (this._autoRetries[id] === undefined) {
                this._autoRetries[id] = 0;
            }

            return this._autoRetries[id] < this._options.retry.maxAutoAttempts
        }

        return false;
    },
    //return false if we should not attempt the requested retry
    _onBeforeManualRetry: function(id) {
        if (this._preventRetries[id]) {
            this.log("Retries are forbidden for id " + id, 'warn');
            return false;
        }
        else if (this._handler.isValid(id)) {
            var fileName = this._handler.getName(id);

            if (this._options.callbacks.onManualRetry(id, fileName) === false) {
                return false;
            }

            this.log("Retrying upload for '" + fileName + "' (id: " + id + ")...");
            this._filesInProgress++;
            return true;
        }
        else {
            this.log("'" + id + "' is not a valid file ID", 'error');
            return false;
        }
    },
    _maybeParseAndSendUploadError: function(id, fileName, response, xhr) {
        //assuming no one will actually set the response code to something other than 200 and still set 'success' to true
        if (!response.success){
            if (xhr && xhr.status !== 200 && !response.error) {
                this._options.callbacks.onError(id, fileName, "XHR returned response code " + xhr.status);
            }
            else {
                var errorReason = response.error ? response.error : "Upload failure reason unknown";
                this._options.callbacks.onError(id, fileName, errorReason);
            }
        }
    },
    _uploadFileList: function(files){
        var validationDescriptors, index, batchInvalid;

        validationDescriptors = this._getValidationDescriptors(files);
        if (validationDescriptors.length > 1) {
            batchInvalid = this._options.callbacks.onValidate(validationDescriptors) === false;
        }

        if (!batchInvalid) {
            if (files.length > 0) {
                for (index = 0; index < files.length; index++){
                    if (this._validateFile(files[index])){
                        this._uploadFile(files[index]);
                    } else {
                        if (this._options.validation.stopOnFirstInvalidFile){
                            return;
                        }
                    }
                }
            }
            else {
                this._error('noFilesError', "");
            }
        }
    },
    _uploadFile: function(fileContainer){
        var id = this._handler.add(fileContainer);
        var fileName = this._handler.getName(id);

        if (this._options.callbacks.onSubmit(id, fileName) !== false){
            this._onSubmit(id, fileName);
            if (this._options.autoUpload) {
                this._handler.upload(id, this._options.request.params);
            }
            else {
                this._storeFileForLater(id);
            }
        }
    },
    _storeFileForLater: function(id) {
        this._storedFileIds.push(id);
    },
    _validateFile: function(file){
        var validationDescriptor, name, size;

        validationDescriptor = this._getValidationDescriptor(file);
        name = validationDescriptor.name;
        size = validationDescriptor.size;

        if (this._options.callbacks.onValidate([validationDescriptor]) === false) {
            return false;
        }

        if (!this._isAllowedExtension(name)){
            this._error('typeError', name);
            return false;

        }
        else if (size === 0){
            this._error('emptyError', name);
            return false;

        }
        else if (size && this._options.validation.sizeLimit && size > this._options.validation.sizeLimit){
            this._error('sizeError', name);
            return false;

        }
        else if (size && size < this._options.validation.minSizeLimit){
            this._error('minSizeError', name);
            return false;
        }

        return true;
    },
    _error: function(code, fileName){
        var message = this._options.messages[code];
        function r(name, replacement){ message = message.replace(name, replacement); }

        var extensions = this._options.validation.allowedExtensions.join(', ');

        r('{file}', this._formatFileName(fileName));
        r('{extensions}', extensions);
        r('{sizeLimit}', this._formatSize(this._options.validation.sizeLimit));
        r('{minSizeLimit}', this._formatSize(this._options.validation.minSizeLimit));

        this._options.callbacks.onError(null, fileName, message);

        return message;
    },
    _formatFileName: function(name){
        if (name.length > 33){
            name = name.slice(0, 19) + '...' + name.slice(-13);
        }
        return name;
    },
    _isAllowedExtension: function(fileName){
        var ext = (-1 !== fileName.indexOf('.'))
            ? fileName.replace(/.*[.]/, '').toLowerCase()
            : '';
        var allowed = this._options.validation.allowedExtensions;

        if (!allowed.length){return true;}

        for (var i=0; i<allowed.length; i++){
            if (allowed[i].toLowerCase() == ext){ return true;}
        }

        return false;
    },
    _formatSize: function(bytes){
        var i = -1;
        do {
            bytes = bytes / 1024;
            i++;
        } while (bytes > 99);

        return Math.max(bytes, 0.1).toFixed(1) + ['kB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];
    },
    _wrapCallbacks: function() {
        var self, safeCallback;

        self = this;

        safeCallback = function(name, callback, args) {
            try {
                return callback.apply(self, args);
            }
            catch (exception) {
                self.log("Caught exception in '" + name + "' callback - " + exception, 'error');
            }
        }

        for (var prop in this._options.callbacks) {
            (function() {
                var oldCallback = self._options.callbacks[prop];
                self._options.callbacks[prop] = function() {
                    return safeCallback(prop, oldCallback, arguments);
                }
            }());
        }
    },
    _parseFileName: function(file) {
        var name;

        if (file.value){
            // it is a file input
            // get input value and remove path to normalize
            name = file.value.replace(/.*(\/|\\)/, "");
        } else {
            // fix missing properties in Safari 4 and firefox 11.0a2
            name = (file.fileName !== null && file.fileName !== undefined) ? file.fileName : file.name;
        }

        return name;
    },
    _parseFileSize: function(file) {
        var size;

        if (!file.value){
            // fix missing properties in Safari 4 and firefox 11.0a2
            size = (file.fileSize !== null && file.fileSize !== undefined) ? file.fileSize : file.size;
        }

        return size;
    },
    _getValidationDescriptor: function(file) {
        var name, size, fileDescriptor;

        fileDescriptor = {};
        name = this._parseFileName(file);
        size = this._parseFileSize(file);

        fileDescriptor.name = name;
        if (size) {
            fileDescriptor.size = size;
        }

        return fileDescriptor;
    },
    _getValidationDescriptors: function(files) {
        var index, fileDescriptors;

        fileDescriptors = [];

        for (index = 0; index < files.length; index++) {
            fileDescriptors.push(files[index]);
        }

        return fileDescriptors;
    }
};
/**
 * Class that creates upload widget with drag-and-drop and file list
 * @inherits qq.FineUploaderBasic
 */
qq.FineUploader = function(o){
    // call parent constructor
    qq.FineUploaderBasic.apply(this, arguments);

    // additional options
    qq.extend(this._options, {
        element: null,
        listElement: null,
        dragAndDrop: {
            extraDropzones: [],
            hideDropzones: true,
            disableDefaultDropzone: false
        },
        text: {
            uploadButton: 'Upload a file',
            cancelButton: 'Cancel',
            retryButton: 'Retry',
            failUpload: 'Upload failed',
            dragZone: 'Drop files here to upload',
            formatProgress: "{percent}% of {total_size}",
            waitingForResponse: "Processing..."
        },
        template: '<div class="qq-uploader">' +
            ((!this._options.dragAndDrop || !this._options.dragAndDrop.disableDefaultDropzone) ? '<div class="qq-upload-drop-area"><span>{dragZoneText}</span></div>' : '') +
            (!this._options.button ? '<div class="qq-upload-button"><div>{uploadButtonText}</div></div>' : '') +
            (!this._options.listElement ? '<ul class="qq-upload-list"></ul>' : '') +
            '</div>',

        // template for one item in file list
        fileTemplate: '<li>' +
            '<div class="qq-progress-bar"></div>' +
            '<span class="qq-upload-spinner"></span>' +
            '<span class="qq-upload-finished"></span>' +
            '<span class="qq-upload-file"></span>' +
            '<span class="qq-upload-size"></span>' +
            '<a class="qq-upload-cancel" href="#">{cancelButtonText}</a>' +
            '<a class="qq-upload-retry" href="#">{retryButtonText}</a>' +
            '<span class="qq-upload-status-text">{statusText}</span>' +
            '</li>',
        classes: {
            // used to get elements from templates
            button: 'qq-upload-button',
            drop: 'qq-upload-drop-area',
            dropActive: 'qq-upload-drop-area-active',
            dropDisabled: 'qq-upload-drop-area-disabled',
            list: 'qq-upload-list',
            progressBar: 'qq-progress-bar',
            file: 'qq-upload-file',
            spinner: 'qq-upload-spinner',
            finished: 'qq-upload-finished',
            retrying: 'qq-upload-retrying',
            retryable: 'qq-upload-retryable',
            size: 'qq-upload-size',
            cancel: 'qq-upload-cancel',
            retry: 'qq-upload-retry',
            statusText: 'qq-upload-status-text',

            // added to list item <li> when upload completes
            // used in css to hide progress spinner
            success: 'qq-upload-success',
            fail: 'qq-upload-fail',

            successIcon: null,
            failIcon: null
        },
        failedUploadTextDisplay: {
            mode: 'default', //default, custom, or none
            maxChars: 50,
            responseProperty: 'error',
            enableTooltip: true
        },
        messages: {
            tooManyFilesError: "You may only drop one file"
        },
        retry: {
            showAutoRetryNote: true,
            autoRetryNote: "Retrying {retryNum}/{maxAuto}...",
            showButton: false
        },
        showMessage: function(message){
            alert(message);
        }
    }, true);

    // overwrite options with user supplied
    qq.extend(this._options, o, true);
    this._wrapCallbacks();

    // overwrite the upload button text if any
    // same for the Cancel button and Fail message text
    this._options.template     = this._options.template.replace(/\{dragZoneText\}/g, this._options.text.dragZone);
    this._options.template     = this._options.template.replace(/\{uploadButtonText\}/g, this._options.text.uploadButton);
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{cancelButtonText\}/g, this._options.text.cancelButton);
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{retryButtonText\}/g, this._options.text.retryButton);
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{statusText\}/g, "");

    this._element = this._options.element;
    this._element.innerHTML = this._options.template;
    this._listElement = this._options.listElement || this._find(this._element, 'list');

    this._classes = this._options.classes;

    if (!this._button) {
        this._button = this._createUploadButton(this._find(this._element, 'button'));
    }

    this._bindCancelAndRetryEvents();
    this._setupDragDrop();
};

// inherit from Basic Uploader
qq.extend(qq.FineUploader.prototype, qq.FineUploaderBasic.prototype);

qq.extend(qq.FineUploader.prototype, {
    clearStoredFiles: function() {
        qq.FineUploaderBasic.prototype.clearStoredFiles.apply(this, arguments);
        this._listElement.innerHTML = "";
    },
    addExtraDropzone: function(element){
        this._setupExtraDropzone(element);
    },
    removeExtraDropzone: function(element){
        var dzs = this._options.dragAndDrop.extraDropzones;
        for(var i in dzs) if (dzs[i] === element) return this._options.dragAndDrop.extraDropzones.splice(i,1);
    },
    getItemByFileId: function(id){
        var item = this._listElement.firstChild;

        // there can't be txt nodes in dynamically created list
        // and we can  use nextSibling
        while (item){
            if (item.qqFileId == id) return item;
            item = item.nextSibling;
        }
    },
    reset: function() {
        qq.FineUploaderBasic.prototype.reset.apply(this, arguments);
        this._element.innerHTML = this._options.template;
        this._listElement = this._options.listElement || this._find(this._element, 'list');
        if (!this._options.button) {
            this._button = this._createUploadButton(this._find(this._element, 'button'));
        }
        this._bindCancelAndRetryEvents();
        this._setupDragDrop();
    },
    _leaving_document_out: function(e){
        return ((qq.chrome() || (qq.safari() && qq.windows())) && e.clientX == 0 && e.clientY == 0) // null coords for Chrome and Safari Windows
            || (qq.firefox() && !e.relatedTarget); // null e.relatedTarget for Firefox
    },
    _storeFileForLater: function(id) {
        qq.FineUploaderBasic.prototype._storeFileForLater.apply(this, arguments);
        var item = this.getItemByFileId(id);
        qq(this._find(item, 'spinner')).hide();
    },
    /**
     * Gets one of the elements listed in this._options.classes
     **/
    _find: function(parent, type){
        var element = qq(parent).getByClass(this._options.classes[type])[0];
        if (!element){
            throw new Error('element not found ' + type);
        }

        return element;
    },
    _setupExtraDropzone: function(element){
        this._options.dragAndDrop.extraDropzones.push(element);
        this._setupDropzone(element);
    },
    _setupDropzone: function(dropArea){
        var self = this;

        var dz = new qq.UploadDropZone({
            element: dropArea,
            onEnter: function(e){
                qq(dropArea).addClass(self._classes.dropActive);
                e.stopPropagation();
            },
            onLeave: function(e){
                //e.stopPropagation();
            },
            onLeaveNotDescendants: function(e){
                qq(dropArea).removeClass(self._classes.dropActive);
            },
            onDrop: function(e){
                if (self._options.dragAndDrop.hideDropzones) {
                    qq(dropArea).hide();
                }

                qq(dropArea).removeClass(self._classes.dropActive);
                if (e.dataTransfer.files.length > 1 && !self._options.multiple) {
                    self._error('tooManyFilesError', "");
                }
                else {
                    self._uploadFileList(e.dataTransfer.files);
                }
            }
        });

        this.addDisposer(function() { dz.dispose(); });

        if (this._options.dragAndDrop.hideDropzones) {
            qq(dropArea).hide();
        }
    },
    _setupDragDrop: function(){
        var self, dropArea;

        self = this;

        if (!this._options.dragAndDrop.disableDefaultDropzone) {
            dropArea = this._find(this._element, 'drop');
            this._options.dragAndDrop.extraDropzones.push(dropArea);
        }

        var dropzones = this._options.dragAndDrop.extraDropzones;
        var i;
        for (i=0; i < dropzones.length; i++){
            this._setupDropzone(dropzones[i]);
        }

        // IE <= 9 does not support the File API used for drag+drop uploads
        if (!this._options.dragAndDrop.disableDefaultDropzone && (!qq.ie() || qq.ie10())) {
            this._attach(document, 'dragenter', function(e){
                if (qq(dropArea).hasClass(self._classes.dropDisabled)) return;

                dropArea.style.display = 'block';
                for (i=0; i < dropzones.length; i++){ dropzones[i].style.display = 'block'; }

            });
        }
        this._attach(document, 'dragleave', function(e){
            if (self._options.dragAndDrop.hideDropzones && qq.FineUploader.prototype._leaving_document_out(e)) {
                for (i=0; i < dropzones.length; i++) {
                    qq(dropzones[i]).hide();
                }
            }
        });
        qq(document).attach('drop', function(e){
            if (self._options.dragAndDrop.hideDropzones) {
                for (i=0; i < dropzones.length; i++) {
                    qq(dropzones[i]).hide();
                }
            }
            e.preventDefault();
        });
    },
    _onSubmit: function(id, fileName){
        qq.FineUploaderBasic.prototype._onSubmit.apply(this, arguments);
        this._addToList(id, fileName);
    },
    // Update the progress bar & percentage as the file is uploaded
    _onProgress: function(id, fileName, loaded, total){
        qq.FineUploaderBasic.prototype._onProgress.apply(this, arguments);

        var item, progressBar, text, percent, cancelLink, size;

        item = this.getItemByFileId(id);
        progressBar = this._find(item, 'progressBar');
        percent = Math.round(loaded / total * 100);

        if (loaded === total) {
            cancelLink = this._find(item, 'cancel');
            qq(cancelLink).hide();

            qq(progressBar).hide();
            qq(this._find(item, 'statusText')).setText(this._options.text.waitingForResponse);

            // If last byte was sent, just display final size
            text = this._formatSize(total);
        }
        else {
            // If still uploading, display percentage
            text = this._formatProgress(loaded, total);

            qq(progressBar).css({display: 'block'});
        }

        // Update progress bar element
        qq(progressBar).css({width: percent + '%'});

        size = this._find(item, 'size');
        qq(size).css({display: 'inline'});
        qq(size).setText(text);
    },
    _onComplete: function(id, fileName, result, xhr){
        qq.FineUploaderBasic.prototype._onComplete.apply(this, arguments);

        var item = this.getItemByFileId(id);

        qq(this._find(item, 'statusText')).clearText();

        qq(item).removeClass(this._classes.retrying);
        qq(this._find(item, 'progressBar')).hide();

        if (!this._options.disableCancelForFormUploads || qq.UploadHandlerXhr.isSupported()) {
            qq(this._find(item, 'cancel')).hide();
        }
        qq(this._find(item, 'spinner')).hide();

        if (result.success){
            qq(item).addClass(this._classes.success);
            if (this._classes.successIcon) {
                this._find(item, 'finished').style.display = "inline-block";
                qq(item).addClass(this._classes.successIcon);
            }
        } else {
            qq(item).addClass(this._classes.fail);
            if (this._classes.failIcon) {
                this._find(item, 'finished').style.display = "inline-block";
                qq(item).addClass(this._classes.failIcon);
            }
            if (this._options.retry.showButton && !this._preventRetries[id]) {
                qq(item).addClass(this._classes.retryable);
            }
            this._controlFailureTextDisplay(item, result);
        }
    },
    _onUpload: function(id, fileName, xhr){
        qq.FineUploaderBasic.prototype._onUpload.apply(this, arguments);

        var item = this.getItemByFileId(id);
        this._showSpinner(item);
    },
    _onBeforeAutoRetry: function(id) {
        var item, progressBar, cancelLink, failTextEl, retryNumForDisplay, maxAuto, retryNote;

        qq.FineUploaderBasic.prototype._onBeforeAutoRetry.apply(this, arguments);

        item = this.getItemByFileId(id);
        progressBar = this._find(item, 'progressBar');

        this._showCancelLink(item);
        progressBar.style.width = 0;
        qq(progressBar).hide();

        if (this._options.retry.showAutoRetryNote) {
            failTextEl = this._find(item, 'statusText');
            retryNumForDisplay = this._autoRetries[id] + 1;
            maxAuto = this._options.retry.maxAutoAttempts;

            retryNote = this._options.retry.autoRetryNote.replace(/\{retryNum\}/g, retryNumForDisplay);
            retryNote = retryNote.replace(/\{maxAuto\}/g, maxAuto);

            qq(failTextEl).setText(retryNote);
            if (retryNumForDisplay === 1) {
                qq(item).addClass(this._classes.retrying);
            }
        }
    },
    //return false if we should not attempt the requested retry
    _onBeforeManualRetry: function(id) {
        if (qq.FineUploaderBasic.prototype._onBeforeManualRetry.apply(this, arguments)) {
            var item = this.getItemByFileId(id);
            this._find(item, 'progressBar').style.width = 0;
            qq(item).removeClass(this._classes.fail);
            this._showSpinner(item);
            this._showCancelLink(item);
            return true;
        }
        return false;
    },
    _addToList: function(id, fileName){
        var item = qq.toElement(this._options.fileTemplate);
        if (this._options.disableCancelForFormUploads && !qq.UploadHandlerXhr.isSupported()) {
            var cancelLink = this._find(item, 'cancel');
            qq(cancelLink).remove();
        }

        item.qqFileId = id;

        var fileElement = this._find(item, 'file');
        qq(fileElement).setText(this._formatFileName(fileName));
        qq(this._find(item, 'size')).hide();
        if (!this._options.multiple) this._clearList();
        this._listElement.appendChild(item);
    },
    _clearList: function(){
        this._listElement.innerHTML = '';
        this.clearStoredFiles();
    },
    /**
     * delegate click event for cancel & retry links
     **/
    _bindCancelAndRetryEvents: function(){
        var self = this,
            list = this._listElement;

        this._attach(list, 'click', function(e){
            e = e || window.event;
            var target = e.target || e.srcElement;

            if (qq(target).hasClass(self._classes.cancel) || qq(target).hasClass(self._classes.retry)){
                qq.preventDefault(e);

                var item = target.parentNode;
                while(item.qqFileId == undefined) {
                    item = target = target.parentNode;
                }

                if (qq(target).hasClass(self._classes.cancel)) {
                    self.cancel(item.qqFileId);
                    qq(item).remove();
                }
                else {
                    qq(item).removeClass(self._classes.retryable);
                    self.retry(item.qqFileId);
                }
            }
        });
    },
    _formatProgress: function (uploadedSize, totalSize) {
        var message = this._options.text.formatProgress;
        function r(name, replacement) { message = message.replace(name, replacement); }

        r('{percent}', Math.round(uploadedSize / totalSize * 100));
        r('{total_size}', this._formatSize(totalSize));
        return message;
    },
    _controlFailureTextDisplay: function(item, response) {
        var mode, maxChars, responseProperty, failureReason, shortFailureReason;

        mode = this._options.failedUploadTextDisplay.mode;
        maxChars = this._options.failedUploadTextDisplay.maxChars;
        responseProperty = this._options.failedUploadTextDisplay.responseProperty;

        if (mode === 'custom') {
            failureReason = response[responseProperty];
            if (failureReason) {
                if (failureReason.length > maxChars) {
                    shortFailureReason = failureReason.substring(0, maxChars) + '...';
                }
            }
            else {
                failureReason = this._options.text.failUpload;
                this.log("'" + responseProperty + "' is not a valid property on the server response.", 'warn');
            }

            qq(this._find(item, 'statusText')).setText(shortFailureReason || failureReason);

            if (this._options.failedUploadTextDisplay.enableTooltip) {
                this._showTooltip(item, failureReason);
            }
        }
        else if (mode === 'default') {
            qq(this._find(item, 'statusText')).setText(this._options.text.failUpload);
        }
        else if (mode !== 'none') {
            this.log("failedUploadTextDisplay.mode value of '" + mode + "' is not valid", 'warn');
        }
    },
    //TODO turn this into a real tooltip, with click trigger (so it is usable on mobile devices).  See case #355 for details.
    _showTooltip: function(item, text) {
        item.title = text;
    },
    _showSpinner: function(item) {
        var spinnerEl = this._find(item, 'spinner');
        spinnerEl.style.display = "inline-block";
    },
    _showCancelLink: function(item) {
        if (!this._options.disableCancelForFormUploads || qq.UploadHandlerXhr.isSupported()) {
            var cancelLink = this._find(item, 'cancel');
            cancelLink.style.display = 'inline';
        }
    },
    _error: function(code, fileName){
        var message = qq.FineUploaderBasic.prototype._error.apply(this, arguments);
        this._options.showMessage(message);
    }
});

qq.UploadDropZone = function(o){
    this._options = {
        element: null,
        onEnter: function(e){},
        onLeave: function(e){},
        // is not fired when leaving element by hovering descendants
        onLeaveNotDescendants: function(e){},
        onDrop: function(e){}
    };
    qq.extend(this._options, o);
    qq.extend(this, qq.DisposeSupport);

    this._element = this._options.element;

    this._disableDropOutside();
    this._attachEvents();
};

qq.UploadDropZone.prototype = {
    _dragover_should_be_canceled: function(){
        return qq.safari() || (qq.firefox() && qq.windows());
    },
    _disableDropOutside: function(e){
        // run only once for all instances
        if (!qq.UploadDropZone.dropOutsideDisabled ){

            // for these cases we need to catch onDrop to reset dropArea
            if (this._dragover_should_be_canceled){
                qq(document).attach('dragover', function(e){
                    e.preventDefault();
                });
            } else {
                qq(document).attach('dragover', function(e){
                    if (e.dataTransfer){
                        e.dataTransfer.dropEffect = 'none';
                        e.preventDefault();
                    }
                });
            }

            qq.UploadDropZone.dropOutsideDisabled = true;
        }
    },
    _attachEvents: function(){
        var self = this;

        self._attach(self._element, 'dragover', function(e){
            if (!self._isValidFileDrag(e)) return;

            var effect = qq.ie() ? null : e.dataTransfer.effectAllowed;
            if (effect == 'move' || effect == 'linkMove'){
                e.dataTransfer.dropEffect = 'move'; // for FF (only move allowed)
            } else {
                e.dataTransfer.dropEffect = 'copy'; // for Chrome
            }

            e.stopPropagation();
            e.preventDefault();
        });

        self._attach(self._element, 'dragenter', function(e){
            if (!self._isValidFileDrag(e)) return;

            self._options.onEnter(e);
        });

        self._attach(self._element, 'dragleave', function(e){
            if (!self._isValidFileDrag(e)) return;

            self._options.onLeave(e);

            var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);
            // do not fire when moving a mouse over a descendant
            if (qq(this).contains(relatedTarget)) return;

            self._options.onLeaveNotDescendants(e);
        });

        self._attach(self._element, 'drop', function(e){
            if (!self._isValidFileDrag(e)) return;

            e.preventDefault();
            self._options.onDrop(e);
        });
    },
    _isValidFileDrag: function(e){
        // e.dataTransfer currently causing IE errors
        // IE9 does NOT support file API, so drag-and-drop is not possible
        if (qq.ie() && !qq.ie10()) return false;

        var dt = e.dataTransfer,
        // do not check dt.types.contains in webkit, because it crashes safari 4
            isSafari = qq.safari();

        // dt.effectAllowed is none in Safari 5
        // dt.types.contains check is for firefox
        var effectTest = qq.ie10() ? true : dt.effectAllowed != 'none';
        return dt && effectTest && (dt.files || (!isSafari && dt.types.contains && dt.types.contains('Files')));
    }
};
/**
 * Class for uploading files, uploading itself is handled by child classes
 */
qq.UploadHandlerAbstract = function(o){
    // Default options, can be overridden by the user
    this._options = {
        debug: false,
        endpoint: '/upload.php',
        // maximum number of concurrent uploads
        maxConnections: 999,
        log: function(str, level) {},
        onProgress: function(id, fileName, loaded, total){},
        onComplete: function(id, fileName, response, xhr){},
        onCancel: function(id, fileName){},
        onUpload: function(id, fileName, xhr){},
        onAutoRetry: function(id, fileName, response, xhr){}

    };
    qq.extend(this._options, o);

    this._queue = [];
    // params for files in queue
    this._params = [];

    this.log = this._options.log;
};
qq.UploadHandlerAbstract.prototype = {
    /**
     * Adds file or file input to the queue
     * @returns id
     **/
    add: function(file){},
    /**
     * Sends the file identified by id and additional query params to the server
     */
    upload: function(id, params){
        var len = this._queue.push(id);

        var copy = {};
        qq.extend(copy, params);
        this._params[id] = copy;

        // if too many active uploads, wait...
        if (len <= this._options.maxConnections){
            this._upload(id, this._params[id]);
        }
    },
    retry: function(id) {
        var i = qq.indexOf(this._queue, id);
        if (i >= 0) {
            this._upload(id, this._params[id]);
        }
        else {
            this.upload(id, this._params[id]);
        }
    },
    /**
     * Cancels file upload by id
     */
    cancel: function(id){
        this.log('Cancelling ' + id);
        this._cancel(id);
        this._dequeue(id);
    },
    /**
     * Cancells all uploads
     */
    cancelAll: function(){
        for (var i=0; i<this._queue.length; i++){
            this._cancel(this._queue[i]);
        }
        this._queue = [];
    },
    /**
     * Returns name of the file identified by id
     */
    getName: function(id){},
    /**
     * Returns size of the file identified by id
     */
    getSize: function(id){},
    /**
     * Returns id of files being uploaded or
     * waiting for their turn
     */
    getQueue: function(){
        return this._queue;
    },
    reset: function() {
        this.log('Resetting upload handler');
        this._queue = [];
        this._params = [];
    },
    /**
     * Actual upload method
     */
    _upload: function(id){},
    /**
     * Actual cancel method
     */
    _cancel: function(id){},
    /**
     * Removes element from queue, starts upload of next
     */
    _dequeue: function(id){
        var i = qq.indexOf(this._queue, id);
        this._queue.splice(i, 1);

        var max = this._options.maxConnections;

        if (this._queue.length >= max && i < max){
            var nextId = this._queue[max-1];
            this._upload(nextId, this._params[nextId]);
        }
    },
    /**
     * Determine if the file exists.
     */
    isValid: function(id) {}
};
/**
 * Class for uploading files using form and iframe
 * @inherits qq.UploadHandlerAbstract
 */
qq.UploadHandlerForm = function(o){
    qq.UploadHandlerAbstract.apply(this, arguments);

    this._inputs = {};
    this._detach_load_events = {};
};
// @inherits qq.UploadHandlerAbstract
qq.extend(qq.UploadHandlerForm.prototype, qq.UploadHandlerAbstract.prototype);

qq.extend(qq.UploadHandlerForm.prototype, {
    add: function(fileInput){
        fileInput.setAttribute('name', this._options.inputName);
        var id = 'qq-upload-handler-iframe' + qq.getUniqueId();

        this._inputs[id] = fileInput;

        // remove file input from DOM
        if (fileInput.parentNode){
            qq(fileInput).remove();
        }

        return id;
    },
    getName: function(id){
        // get input value and remove path to normalize
        return this._inputs[id].value.replace(/.*(\/|\\)/, "");
    },
    isValid: function(id) {
        return this._inputs[id] !== undefined;
    },
    reset: function() {
        qq.UploadHandlerAbstract.prototype.reset.apply(this, arguments);
        this._inputs = {};
        this._detach_load_events = {};
    },
    _cancel: function(id){
        this._options.onCancel(id, this.getName(id));

        delete this._inputs[id];
        delete this._detach_load_events[id];

        var iframe = document.getElementById(id);
        if (iframe){
            // to cancel request set src to something else
            // we use src="javascript:false;" because it doesn't
            // trigger ie6 prompt on https
            iframe.setAttribute('src', 'javascript:false;');

            qq(iframe).remove();
        }
    },
    _upload: function(id, params){
        this._options.onUpload(id, this.getName(id), false);
        var input = this._inputs[id];

        if (!input){
            throw new Error('file with passed id was not added, or already uploaded or cancelled');
        }

        var fileName = this.getName(id);
        params[this._options.inputName] = fileName;

        var iframe = this._createIframe(id);
        var form = this._createForm(iframe, params);
        form.appendChild(input);

        var self = this;
        this._attachLoadEvent(iframe, function(){
            self.log('iframe loaded');

            var response = self._getIframeContentJSON(iframe);

            // timeout added to fix busy state in FF3.6
            setTimeout(function(){
                self._detach_load_events[id]();
                delete self._detach_load_events[id];
                qq(iframe).remove();
            }, 1);

            if (!response.success) {
                if (self._options.onAutoRetry(id, fileName, response)) {
                    return;
                }
            }
            self._options.onComplete(id, fileName, response);
            self._dequeue(id);
        });

        this.log('Sending upload request for ' + id);
        form.submit();
        qq(form).remove();

        return id;
    },
    _attachLoadEvent: function(iframe, callback){
        var self = this;
        this._detach_load_events[iframe.id] = qq(iframe).attach('load', function(){
            self.log('Received response for ' + iframe.id);

            // when we remove iframe from dom
            // the request stops, but in IE load
            // event fires
            if (!iframe.parentNode){
                return;
            }

            try {
                // fixing Opera 10.53
                if (iframe.contentDocument &&
                    iframe.contentDocument.body &&
                    iframe.contentDocument.body.innerHTML == "false"){
                    // In Opera event is fired second time
                    // when body.innerHTML changed from false
                    // to server response approx. after 1 sec
                    // when we upload file with iframe
                    return;
                }
            }
            catch (error) {
                //IE may throw an "access is denied" error when attempting to access contentDocument on the iframe in some cases
                self.log('Error when attempting to access iframe during handling of upload response (' + error + ")", 'error');
            }

            callback();
        });
    },
    /**
     * Returns json object received by iframe from server.
     */
    _getIframeContentJSON: function(iframe){
        //IE may throw an "access is denied" error when attempting to access contentDocument on the iframe in some cases
        try {
            // iframe.contentWindow.document - for IE<7
            var doc = iframe.contentDocument ? iframe.contentDocument: iframe.contentWindow.document,
                response;

            var innerHTML = doc.body.innerHTML;
            this.log("converting iframe's innerHTML to JSON");
            this.log("innerHTML = " + innerHTML);
            //plain text response may be wrapped in <pre> tag
            if (innerHTML && innerHTML.match(/^<pre/i)) {
                innerHTML = doc.body.firstChild.firstChild.nodeValue;
            }
            response = eval("(" + innerHTML + ")");
        } catch(error){
            this.log('Error when attempting to parse form upload response (' + error + ")", 'error');
            response = {success: false};
        }

        return response;
    },
    /**
     * Creates iframe with unique name
     */
    _createIframe: function(id){
        // We can't use following code as the name attribute
        // won't be properly registered in IE6, and new window
        // on form submit will open
        // var iframe = document.createElement('iframe');
        // iframe.setAttribute('name', id);

        var iframe = qq.toElement('<iframe src="javascript:false;" name="' + id + '" />');
        // src="javascript:false;" removes ie6 prompt on https

        iframe.setAttribute('id', id);

        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        return iframe;
    },
    /**
     * Creates form, that will be submitted to iframe
     */
    _createForm: function(iframe, params){
        // We can't use the following code in IE6
        // var form = document.createElement('form');
        // form.setAttribute('method', 'post');
        // form.setAttribute('enctype', 'multipart/form-data');
        // Because in this case file won't be attached to request
        var protocol = this._options.demoMode ? "GET" : "POST"
        var form = qq.toElement('<form method="' + protocol + '" enctype="multipart/form-data"></form>');

        var queryString = qq.obj2url(params, this._options.endpoint);

        form.setAttribute('action', queryString);
        form.setAttribute('target', iframe.name);
        form.style.display = 'none';
        document.body.appendChild(form);

        return form;
    }
});
/**
 * Class for uploading files using xhr
 * @inherits qq.UploadHandlerAbstract
 */
qq.UploadHandlerXhr = function(o){
    qq.UploadHandlerAbstract.apply(this, arguments);

    this._files = [];
    this._xhrs = [];

    // current loaded size in bytes for each file
    this._loaded = [];
};

// static method
qq.UploadHandlerXhr.isSupported = function(){
    var input = document.createElement('input');
    input.type = 'file';

    return (
        'multiple' in input &&
            typeof File != "undefined" &&
            typeof FormData != "undefined" &&
            typeof (new XMLHttpRequest()).upload != "undefined" );
};

// @inherits qq.UploadHandlerAbstract
qq.extend(qq.UploadHandlerXhr.prototype, qq.UploadHandlerAbstract.prototype)

qq.extend(qq.UploadHandlerXhr.prototype, {
    /**
     * Adds file to the queue
     * Returns id to use with upload, cancel
     **/
    add: function(file){
        if (!(file instanceof File)){
            throw new Error('Passed obj in not a File (in qq.UploadHandlerXhr)');
        }

        return this._files.push(file) - 1;
    },
    getName: function(id){
        var file = this._files[id];
        // fix missing name in Safari 4
        //NOTE: fixed missing name firefox 11.0a2 file.fileName is actually undefined
        return (file.fileName !== null && file.fileName !== undefined) ? file.fileName : file.name;
    },
    getSize: function(id){
        var file = this._files[id];
        return file.fileSize != null ? file.fileSize : file.size;
    },
    /**
     * Returns uploaded bytes for file identified by id
     */
    getLoaded: function(id){
        return this._loaded[id] || 0;
    },
    isValid: function(id) {
        return this._files[id] !== undefined;
    },
    reset: function() {
        qq.UploadHandlerAbstract.prototype.reset.apply(this, arguments);
        this._files = [];
        this._xhrs = [];
        this._loaded = [];
    },
    /**
     * Sends the file identified by id and additional query params to the server
     * @param {Object} params name-value string pairs
     */
    _upload: function(id, params){
        this._options.onUpload(id, this.getName(id), true);

        var file = this._files[id],
            name = this.getName(id),
            size = this.getSize(id);

        this._loaded[id] = 0;

        var xhr = this._xhrs[id] = new XMLHttpRequest();
        var self = this;

        xhr.upload.onprogress = function(e){
            if (e.lengthComputable){
                self._loaded[id] = e.loaded;
                self._options.onProgress(id, name, e.loaded, e.total);
            }
        };

        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4){
                self._onComplete(id, xhr);
            }
        };

        // build query string
        params = params || {};
        params[this._options.inputName] = name;
        var queryString = qq.obj2url(params, this._options.endpoint);

        var protocol = this._options.demoMode ? "GET" : "POST";
        xhr.open(protocol, queryString, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("X-File-Name", encodeURIComponent(name));
        xhr.setRequestHeader("Cache-Control", "no-cache");
        if (this._options.forceMultipart) {
            var formData = new FormData();
            formData.append(this._options.inputName, file);
            file = formData;
        } else {
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            //NOTE: return mime type in xhr works on chrome 16.0.9 firefox 11.0a2
            xhr.setRequestHeader("X-Mime-Type",file.type );
        }
        for (key in this._options.customHeaders){
            xhr.setRequestHeader(key, this._options.customHeaders[key]);
        };

        this.log('Sending upload request for ' + id);
        xhr.send(file);
    },
    _onComplete: function(id, xhr){
        "use strict";
        // the request was aborted/cancelled
        if (!this._files[id]) { return; }

        var name = this.getName(id);
        var size = this.getSize(id);
        var response; //the parsed JSON response from the server, or the empty object if parsing failed.

        this._options.onProgress(id, name, size, size);

        this.log("xhr - server response received for " + id);
        this.log("responseText = " + xhr.responseText);

        try {
            if (typeof JSON.parse === "function") {
                response = JSON.parse(xhr.responseText);
            } else {
                response = eval("(" + xhr.responseText + ")");
            }
        } catch(error){
            this.log('Error when attempting to parse xhr response text (' + error + ')', 'error');
            response = {};
        }

        if (xhr.status !== 200 || !response.success){
            if (this._options.onAutoRetry(id, name, response, xhr)) {
                return;
            }
        }

        this._options.onComplete(id, name, response, xhr);

        this._xhrs[id] = null;
        this._dequeue(id);
    },
    _cancel: function(id){
        this._options.onCancel(id, this.getName(id));

        this._files[id] = null;

        if (this._xhrs[id]){
            this._xhrs[id].abort();
            this._xhrs[id] = null;
        }
    }
});
(function($) {
    "use strict";
    var uploader, $el, init, dataStore, pluginOption, pluginOptions, addCallbacks, transformOptions, isValidCommand,
        delegateCommand;

    pluginOptions = ['uploaderType'];

    init = function (options) {
        if (options) {
            var xformedOpts = transformOptions(options);
            addCallbacks(xformedOpts);

            if (pluginOption('uploaderType') === 'basic') {
                uploader(new qq.FineUploaderBasic(xformedOpts));
            }
            else {
                uploader(new qq.FineUploader(xformedOpts));
            }
        }

        return $el;
    };

    dataStore = function(key, val) {
        var data = $el.data('fineuploader');

        if (val) {
            if (data === undefined) {
                data = {};
            }
            data[key] = val;
            $el.data('fineuploader', data);
        }
        else {
            if (data === undefined) {
                return null;
            }
            return data[key];
        }
    };

    //the underlying Fine Uploader instance is stored in jQuery's data stored, associated with the element
    // tied to this instance of the plug-in
    uploader = function(instanceToStore) {
        return dataStore('uploader', instanceToStore);
    };

    pluginOption = function(option, optionVal) {
        return dataStore(option, optionVal);
    };

    //implement all callbacks defined in Fine Uploader as functions that trigger appropriately names events and
    // return the result of executing the bound handler back to Fine Uploader
    addCallbacks = function(transformedOpts) {
        var callbacks = transformedOpts.callbacks = {};

        $.each(new qq.FineUploaderBasic()._options.callbacks, function(prop, func) {
            var name, $callbackEl;

            name = /^on(\w+)/.exec(prop)[1];
            name = name.substring(0, 1).toLowerCase() + name.substring(1);
            $callbackEl = $el;

            callbacks[prop] = function() {
                var args = Array.prototype.slice.call(arguments);
                return $callbackEl.triggerHandler(name, args);
            };
        });
    };

    //transform jQuery objects into HTMLElements, and pass along all other option properties
    transformOptions = function(source, dest) {
        var xformed, arrayVals;

        if (dest === undefined) {
            if (source.uploaderType !== 'basic') {
                xformed = { element : $el[0] };
            }
            else {
                xformed = {};
            }
        }
        else {
            xformed = dest;
        }

        $.each(source, function(prop, val) {
            if ($.inArray(prop, pluginOptions) >= 0) {
                pluginOption(prop, val);
            }
            else if (val instanceof $) {
                xformed[prop] = val[0];
            }
            else if ($.isPlainObject(val)) {
                xformed[prop] = {};
                transformOptions(val, xformed[prop]);
            }
            else if ($.isArray(val)) {
                arrayVals = [];
                $.each(val, function(idx, arrayVal) {
                    if (arrayVal instanceof $) {
                        $.merge(arrayVals, arrayVal);
                    }
                    else {
                        arrayVals.push(arrayVal);
                    }
                });
                xformed[prop] = arrayVals;
            }
            else {
                xformed[prop] = val;
            }
        });

        if (dest === undefined) {
            return xformed;
        }
    };

    isValidCommand = function(command) {
        return $.type(command) === "string" &&
            !command.match(/^_/) && //enforce private methods convention
            uploader()[command] !== undefined;
    };

    //assuming we have already verified that this is a valid command, call the associated function in the underlying
    // Fine Uploader instance (passing along the arguments from the caller) and return the result of the call back to the caller
    delegateCommand = function(command) {
        return uploader()[command].apply(uploader(), Array.prototype.slice.call(arguments, 1));
    };

    $.fn.fineUploader = function(optionsOrCommand) {
        $el = this;

        if (uploader() && isValidCommand(optionsOrCommand)) {
            return delegateCommand.apply(this, arguments);
        }
        else if (typeof optionsOrCommand === 'object' || !optionsOrCommand) {
            return init.apply(this, arguments);
        }
        else {
            $.error('Method ' +  optionsOrCommand + ' does not exist on jQuery.fineUploader');
        }

        return this;
    };

}(jQuery));

module.exports = jQuery;

});
define("product/guoqude/1.0.0/front_net/module/validation-debug", [], function (require, exports, module) {
    //vali_delay class可以延迟1毫秒验证
    //所有验证触发始于'input[type=submit], .submit'的click事件
    //在submit buttom中使用title属性可以指定对应表单元素去验证，不使用title则验证其closest('form')中的所有'[class*=validate]'表单项
    //atlast 验证较复杂，相关地方不要随意修改
    //针对IE6做了提示框的宽度计算，_fixPromptWidth
    //validate[func[functionname]] 可以自定义验证函数
    //valiarr[topLeft] 可以指定提示框位置
    //添加_unFieldEvent事件，默认用作焦点进入input时关闭错误提示
	//345（updatePromptsPosition）行bug，修改为 var form = $(this).closest('form');
	//$.validationEngineLanguage.allRules["card_adult"] = { "func": exports.cerd.checkAdult }; //扩展验证方法，而不是内嵌在jq_validation文件
    //_ajax 事件更新，完全自定义回调处理
    //判断 usePlaceholder，为placeholder做Hack
    // 返回 methods 对象给调用者
    // 新增showPassText参数

     return function ($, _, JSON) {
        /*
        * Inline Form Validation Engine 2.2, jQuery plugin
        * http://www.position-absolute.com
        * http://www.crionics.com
        */
        var isAspWebForm = typeof glo_isAspWebForm == "undefined" ? false : glo_isAspWebForm;
        
        $.validationEngineLanguage = {
            allRules: {
                "equals": {
                    "alertText": "前后不一致！"
                },
                "atlast": {
                    "alertText": "至少填写其中项！"
                },
                "required": {
                    "alertText": "* 此项必填",
                    "alertTextCheckboxMultiple": "* 请选择",
                    "alertTextCheckboxe": "* 请先勾选同意本协议"
                },
                "length": {
                    "alertText": "在 ",
                    "alertText2": " 到 ",
                    "alertText3": " 个字符间"
                },
                "minSize": {
                    "alertText": "字符长度不得小于 ",
                    "alertText2": " 位"
                },
                "maxSize": {
                    "alertText": "字符长度不得大于 ",
                    "alertText2": " 位"
                },
                "maxCheckbox": {
                    "alertText": "* Checks allowed Exceeded"
                },
                "minCheckbox": {
                    "alertText": "请选择至少",
                    "alertText2": " 个选项"
                },
                /* FuncVali */
                "dateRegion": {
                    "func": function (val) {
                        var val = val.replace("-", "/");
                        var vald = new Date(val);
                        var nowDate = new Date();
                        if (vald <= nowDate)
                            return "日期不能小于等于今天";
                        else
                            return "ok";
                    }
                },
                "continueSix": {
                    "func": function (val) {
                        var val = val.toLowerCase();
                        var flag, continuation = 1;
                        for (var i = 0; i < val.length; i++) {
                            if (val.charCodeAt(i) == flag) {
                                continuation++;
                                if (continuation > 5)
                                    return "密码过于简单，不能连续6个及以上相同的字母或数字";
                            } else
                                continuation = 1;
                            flag = val.charCodeAt(i);
                        }
                        return "ok";
                    }
                },
                /* compareFunc */
                "equalsSix": {
                    "func": function (val, eqval, eqtitle) {
                        var val = val.toLowerCase();
                        var eqval = eqval.toLowerCase();
                        for (var i = 0; i < val.length; i++) {
                            var valstr = val.substr(i, 6);
                            if (valstr.length < 6) break;
                            for (var x = 0; x < eqval.length; x++) {
                                var eqvalstr = eqval.substr(x, 6);
                                if (eqvalstr.length < 6) break;
                                if (eqvalstr == valstr) {
                                    return "不允许连续6个及以上字符与" + eqtitle + "相同";
                                }
                            }
                        }
                        return "ok";
                    }
                },
                "beMin": {
                    "func": function (val, eqval, eqtitle) {
                        var val = Number(val);
                        var eqval = Number(eqval);
                        if (val < eqval) {
                            return "不允许小于" + eqtitle;
                        }
                        return "ok";
                    }
                },
                /* compareOthers */
                "SHbeMin": {
                    "func": function (val, eqval, eqtitle, eqval2, eqtitle2) {
                        var val = Number(val);
                        var eqval = Number(eqval);
                        var eqval2 = Number(eqval2);
                        if (eqval != 0 && val < eqval2) {
                            return "不允许小于" + eqtitle2;
                        }
                        return "ok";
                    }
                },
                "SHObeMin": {
                    "func": function (val, eqval, eqtitle, eqval2, eqtitle2) {
                        var eqval = Number(eqval);
                        var eqval2 = Number(eqval2);
                        if (eqval != 0 && eqval < eqval2) {
                            return eqtitle + "不允许小于" + eqtitle2;
                        }
                        return "ok";
                    }
                },

                "noPullNumber": {
                    "func": function (val) {
                        var pattern = new RegExp(/^[0-9]+$/);
                        if (pattern.test(val))
                            return "不能由纯数字组成";
                        else
                            return "ok";
                    }
                },
                "ajaxEmailExist": {
                    "url": window.urlprefix + "/people/check",
                    "extraData": "email=eric",
                    "alertText": "* 这个email已被使用",
                    "alertTextLoad": "* 验证中, 请等待"
                },
                /* CustomRegex */
                "telephone": {
                    "regex": /^[0-9\-\(\)\ ]{7,}$/,
                    "alertText": "电话号码格式不正确"
                },
                "validate": {
                    "regex": /^[0-9\-\(\)\ ]+$/,
                    "alertText": "验证码格式不正确"
                },
                "email": {
                    //http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "Email格式不正确"
                },
                "date": {
                    "regex": /^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/,
                    "alertText": "日期格式不正确，必须为'YYYY-MM-DD'格式"
                },
                "chinese": {
                    "regex": /^[\u4e00-\u9fa5]+$/,
                    "alertText": "必须是中文"
                },
                "onlyNumber": {
                    "regex": /^[0-9]+$/,
                    "alertText": "必须是数字"
                },
                "onlyLetter": {
                    "regex": /^[a-zA-Z]+$/,
                    "alertText": "* 必须是英文字母"
                },
                "userName": {
                    "regex": /^[a-zA-Z][0-9a-zA-Z]+$/,
                    "alertText": "* 必须是字母和数字内容，数字不允许开头"
                },
                "price": {
                    "regex": /^[0-9]+(\.[0-9]{1,2})?$/,
                    "alertText": "价格格式不正确"
                },
                "shared": {
                    "regex": /^[0-9]+(\.[0-9]{1,2})?$/,
                    "alertText": "份额格式不正确"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* 错误的 IP 地址"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
                    "alertText": "* 错误的 URL"
                },
                "postCode": {
                    "regex": /^\d{6}$/,
                    "alertText": "邮编格式不正确"
                },
                "passWord": {
                    "regex": /^[0-9a-zA-z]{6,}$/,
                    "alertText": "密码格式不正确，至少6位数字或字母"
                },
                "bankCard": {
                    "regex": /^[0-9]{8}$|^[0-9]{16}$|^[0-9]{18}|^[0-9]{19}$/,
                    "alertText": "银行卡格式不正确"
                },
                "bankCardWithSpace": {
                    "regex": /^[0-9 ]{9}$|^[0-9 ]{19}$|^[0-9 ]{21}|^[0-9 ]{22}$/,
                    "alertText": "银行卡格式不正确"
                }
            }
        };

        var methods = {
            init: function (options) {
                var form = this;
                if (!form.data('jqv') || form.data('jqv') == null) {
                    methods._saveOptions(form, options);
                    $(".formError").live("click", function () {
                        $(this).fadeOut(150, function () {
                            $(this).remove();
                        });
                    });
                }
            },
            attach: function (userOptions) {
                var form = this;
                var options;
                if (userOptions)
                    options = methods._saveOptions(form, userOptions);
                else
                    options = form.data('jqv');

                if (!options.binded) {
                    var field = form.find("[class*=validate]");
                    field.not('[type=checkbox], .vali_delay').bind(options.eventTrigger, methods._onFieldEvent);
                    field.filter('[type=checkbox]').bind("click", methods._onFieldEvent);
                    field.filter('.vali_delay').bind(options.eventTrigger, methods._delay_onFieldEvent);
                    if(options.uneventTrigger)
                        field.not('[type=checkbox]').bind(options.uneventTrigger, methods._unFieldEvent);
                    form.find('input[type=submit], button[type=submit], a.submit').bind("click", methods._onSubmitEvent);
                    //when without jq_vali:
                    //$('a.submit', box).on "click", ->
                    //    $(this).closest('form').submit()
                    options.binded = true;
                    if (options.autoPositionUpdate) {
                        $(window).bind("resize", { "noAnimation": true, "formElem": form }, methods.updatePromptsPosition);
                    }
                }
                return this;
            },
            detach: function () {
                var form = this;
                var options = form.data('jqv');

                var field = form.find("[class*=validate]");
                field.not('[type=checkbox], .vali_delay').unbind(options.eventTrigger, methods._onFieldEvent);
                field.filter('[type=checkbox]').unbind("click", methods._onFieldEvent);
                field.filter('.vali_delay').unbind(options.eventTrigger, methods._delay_onFieldEvent);
                if(options.uneventTrigger)
                    field.not('[type=checkbox]').unbind(options.uneventTrigger, methods._unFieldEvent);
                form.find('input[type=submit], button[type=submit], a.submit').unbind("click", methods._onSubmitEvent);

                form.removeData('jqv');
                if (options.autoPositionUpdate) {
                    $(window).unbind("resize", methods.updatePromptsPosition)
                }
                return this;
            },
            validate: function () {
                return methods._validateFields(this);
            },
            validateField: function (el) {
                var options = $(this).data('jqv');
                var r = methods._validateField($(el), options);
                if (options.onSuccess && options.InvalidFields.length == 0)
                    options.onSuccess();
                else if (options.onFailure && options.InvalidFields.length > 0)
                    options.onFailure();
                return r;
            },
            updatePromptsPosition: function (event) {
                if (event && this == window)
                    var form = event.data.formElem, noAnimation = event.data.noAnimation;
                else
                    var form = $(this).closest('form');

                var options = form.data('jqv');
                form.find('[class*=validate]').not(':hidden').not(":disabled").each(function () {
                    var field = $(this);
                    var prompt = methods._getPrompt(field);
                    var promptText = $(prompt).find(".formErrorContent").html();
                    if (prompt)
                        methods._updatePrompt(field, $(prompt), promptText, undefined, false, options, noAnimation);
                })
                return this;
            },
            showPrompt: function (promptText, type, promptPosition, showArrow) {
                var form = this.closest('form');
                var options = form.data('jqv');
                if (!options)
                    options = methods._saveOptions(this, options);
                if (promptPosition)
                    options.promptPosition = promptPosition;
                options.showArrow = showArrow == true;
                methods._showPrompt(this, promptText, type, false, options);
            },
            hidePrompt: function () {
                var promptClass = "." + methods._getClassName($(this).data("vali_class")) + "formError";
                $(promptClass).fadeTo("fast", 0.3, function () {
                    $(this).remove();
                });
            },
            closePrompt: function (field) {
                return methods._closePrompt(field);
            },
            hide: function () {
                var closingtag;
                if ($(this).is("form")) {
                    closingtag = "parentForm" + $(this).attr('id');
                } else {
                    closingtag = $(this).attr('id') + "formError";
                }
                $('.' + closingtag).fadeTo("fast", 0.3, function () {
                    $(this).remove();
                });
            },
            hideAll: function () {
                $('.formError').fadeTo("fast", 0.3, function () {
                    $(this).remove();
                });
            },

            _saveOptions: function (form, options) {
                var userOptions = $.extend(true,
                    { allrules: $.validationEngineLanguage.allRules },
                    $.validationEngine.defaults,
                    options);
                form.data('jqv', userOptions);
                return userOptions;
            },
            _unFieldEvent: function () {
                methods._closePrompt($(this));
            },
            _onFieldEvent: function (event) {
                var field = $(this);
                var form = field.closest('form');
                var options = form.data('jqv');
                window.setTimeout(function () {
                    methods._validateField(field, options);
                    if (options.InvalidFields.length == 0 && options.onSuccess) {
                        options.onSuccess();
                    } else if (options.InvalidFields.length > 0 && options.onFailure) {
                        options.onFailure();
                    }
                }, (event.data) ? event.data.delay : 0);
            },
            _delay_onFieldEvent: function () {
                var field = this;
                var args = arguments;
                window.setTimeout(function () {
                    methods._onFieldEvent.apply(field, args);
                }, 1000);
            },
            _onSubmitEvent: function (event) {
                var form = $(this).closest('form');
                if($(this).hasClass('.vali_skip'))
                    form.submit();
                var options = form.data('jqv');
                var btntgt = "";
                if ($(event.target).is('[class*=valitarget]'))
                    btntgt = /valitarget\[(.*)\]/.exec($(event.target).attr('class'))[1];
                var r = methods._validateFields(form, true, btntgt);

                if (options.onValidationComplete) {
                    options.onValidationComplete(form, r);
                    return false;
                }

                if(r)
                    form.submit();
                return false;
            },
            _validateFields: function (form, skipAjaxValidation, btntgt) {
                var options = form.data('jqv');
                var errorFound = false;
                form.trigger("jqv.form.validating");
                var fields = form.find('[class*=validate]').not(':hidden');
                if (btntgt)
                    fields = fields.filter('.valitarget_' + btntgt);
                fields.each(function () {
                    errorFound |= methods._validateField($(this), options, skipAjaxValidation);
                });
                form.trigger("jqv.form.result", [errorFound]);

                if (!errorFound) return true;
                if (!options.scroll) return false;
                var destination = Number.MAX_VALUE;
                var fixleft = 0;
                var lst = $(".formError:not('.greenPopup')");
                for (var i = 0; i < lst.length; i++) {
                    var d = $(lst[i]).offset().top;
                    if (d < destination) {
                        destination = d;
                        fixleft = $(lst[i]).offset().left;
                    }
                }
                if (!options.isOverflown)
                    $("html:not(:animated),body:not(:animated)").animate({
                        scrollTop: destination,
                        scrollLeft: fixleft
                    }, 1100);
                else {
                    var overflowDIV = $(options.overflownDIV);
                    var scrollContainerScroll = overflowDIV.scrollTop();
                    var scrollContainerPos = -parseInt(overflowDIV.offset().top);
                    destination += scrollContainerScroll + scrollContainerPos - 5;
                    var scrollContainer = $(options.overflownDIV + ":not(:animated)");
                    scrollContainer.animate({
                        scrollTop: destination
                    }, 1100);
                    $("html:not(:animated),body:not(:animated)").animate({
                        scrollTop: overflowDIV.offset().top,
                        scrollLeft: fixleft
                    }, 1100);
                }
                return false;
            },
            _hasPlaceholderSupport: function () {
                var input = document.createElement('input');
                return ('placeholder' in input);
            },
            _validateField: function (field, options, skipAjaxValidation) {
                var getRules = /validate\[(.*)\]/.exec(field.attr('class'));
                if (!getRules) return false;

                var str = getRules[1];
                var rules = str.split(/\[|,|\]/);
                if (field.val() == "") {
                    rules1 = ['required', 'atlast'];
                    for (var i = 0; i < rules.length; i++) {
                        if (rules[i] == 'atlast')
                            rules1.push(rules[i + 1]);
                    }
                    rules = _.intersection(rules, rules1);
                }

                var form = $(field.closest("form"));
                var isAjaxValidator = false;
                var fieldName = field.attr("name");
                var promptText = "";
                options.isError = false;
                options.showArrow = true;

                var usePlaceholder = false;
                if (!methods._hasPlaceholderSupport() && field.val() == field.attr("placeholder")) {
                    usePlaceholder = true;
                    for (var i = 0; i < rules.length; i++) {
                        switch (rules[i]) {
                            case "required":
                                promptText = "不能为空";
                                options.isError = true;
                                break;
                            default:
                                break;
                        }
                    }
                };

                if (!usePlaceholder) {
                    for (var i = 0; i < rules.length; i++) {
                        var errorMsg = undefined;
                        switch (rules[i]) {
                            case "required":
                                errorMsg = methods._required(field, rules, i, options);
                                break;
                            case "custom":
                                errorMsg = methods._customRegex(field, rules, i, options);
                                break;
                            case "ajax":
                                // ajax has its own prompts handling technique
                                if (!skipAjaxValidation) {
                                    methods._ajax(field, rules, i, options);
                                    isAjaxValidator = true;
                                }
                                break;
                            case "minSize":
                                errorMsg = methods._minSize(field, rules, i, options);
                                break;
                            case "maxSize":
                                errorMsg = methods._maxSize(field, rules, i, options);
                                break;
                            case "min":
                                errorMsg = methods._min(field, rules, i, options);
                                break;
                            case "max":
                                errorMsg = methods._max(field, rules, i, options);
                                break;
                            case "past":
                                errorMsg = methods._past(field, rules, i, options);
                                break;
                            case "future":
                                errorMsg = methods._future(field, rules, i, options);
                                break;
                            case "dateRange":
                                var classGroup = "[class*=" + rules[i + 1] + "]";
                                var firstOfGroup = form.find(classGroup).eq(0);
                                var secondOfGroup = form.find(classGroup).eq(1);
                                if (firstOfGroup[0].value || secondOfGroup[0].value) {
                                    errorMsg = methods._dateRange(firstOfGroup, secondOfGroup, rules, i, options);
                                }
                                if (errorMsg) required = true;
                                options.showArrow = false;
                                break;
                            case "maxCheckbox":
                                errorMsg = methods._maxCheckbox(field, rules, i, options);
                                field = $($("input[name='" + fieldName + "']"));
                                break;
                            case "minCheckbox":
                                errorMsg = methods._minCheckbox(field, rules, i, options);
                                var groupname = fieldName.substring(0, fieldName.length - 1);
                                field = $($("input[name^='" + groupname + "']"));
                                break;
                            case "equals":
                                errorMsg = methods._equals(field, rules, i, options);
                                break;
                            case "func":
                                errorMsg = methods._funcCall(field, rules, i, options);
                                break;
                            case "compareFunc":
                                errorMsg = methods._compareFunc(field, rules, i, options);
                                break;
                            case "compareOthers":
                                errorMsg = methods._compareOthers(field, rules, i, options);
                                break;
                            case "atlast":
                                errorMsg = methods._atlast(field, rules, i, options);
                                break;
                            default:
                                break;
                        }
                        if (errorMsg !== undefined) {
                            promptText += errorMsg + "<br/>";
                            options.isError = true;
                        }
                    }
                }

                var fieldType = field.attr("type");
                if ((fieldType == "radio" || fieldType == "checkbox") && $("input[name='" + fieldName + "']").size() > 1) {
                    field = $($("input[name='" + fieldName + "'][type!=hidden]:first"));
                    options.showArrow = false;
                }
                if (fieldType == "text" && form.find("input[name='" + fieldName + "']").size() > 1) {
                    field = $(form.find("input[name='" + fieldName + "'][type!=hidden]:first"));
                    options.showArrow = false;
                }

                if (options.isError) {
                    methods._showPrompt(field, promptText, "", false, options);
                    field.data("promptText", promptText);
                } else {
                    if (!isAjaxValidator && options.showPassText) {
                        methods._showPrompt(field, options.showPassText, "pass", true, options);
                    }
                    field.data("promptText", "");
                }


                if (!isAjaxValidator)
                    field.trigger("jqv.field.result", [field, options.isError, promptText]);

                /* Record error */
                var errindex = $.inArray(field[0], options.InvalidFields);
                if (errindex == -1) {
                    if (options.isError)
                        options.InvalidFields.push(field[0]);
                } else if (!options.isError) {
                    options.InvalidFields.splice(errindex, 1);
                }

                return options.isError;
            },

            _required: function (field, rules, i, options) {
                switch (field.attr("type")) {
                    case "text":
                    case "password":
                    case "textarea":
                    case "file":
                    default:
                        if (!field.val())
                            return options.allrules[rules[i]].alertText;
                        break;
                    case "radio":
                    case "checkbox":
                        var name = field.attr("name");
                        if ($("input[name='" + name + "']:checked").size() == 0) {

                            if ($("input[name='" + name + "']").size() == 1)
                                return options.allrules[rules[i]].alertTextCheckboxe;
                            else
                                return options.allrules[rules[i]].alertTextCheckboxMultiple;
                        }
                        break;
                    case "select-one":
                        if (!field.val())
                            return options.allrules[rules[i]].alertText;
                        break;
                    case "select-multiple":
                        if (!field.find("option:selected").val())
                            return options.allrules[rules[i]].alertText;
                        break;
                }
            },
            _customRegex: function (field, rules, i, options) {
                var customRule = rules[i + 1];
                var rule = options.allrules[customRule];
                if (!rule) {
                    alert("jqv:custom rule not found " + customRule);
                    return;
                }
                var ex = rule.regex;
                if (!ex) return;
                var pattern = new RegExp(ex);
                if (!pattern.test(field.val()))
                    return options.allrules[customRule].alertText;
            },
            _funcCall: function (field, rules, i, options) {
                var func_name = rules[i + 1];
                var rule = options.allrules[func_name];
                var result = rule.func(field.val());
                if (result != "" && result != "ok") {
                    if (options.allrules[func_name].alertText)
                        return options.allrules[func_name].alertText;
                    else
                        return result;
                }
            },
            _equals: function (field, rules, i, options) {
                var equalsField = rules[i + 1];
                if (field.val() != $("#" + equalsField).val())
                    return options.allrules.equals.alertText;
            },
            _compareFunc: function (field, rules, i, options) {
                var func_name = rules[i + 1];
                var equalsField = $("#" + rules[i + 2]);
                var rule = options.allrules[func_name];
                var result = rule.func(field.val(), equalsField.val() || equalsField.text(), equalsField.attr('title'));
                if (result != "" && result != "ok") {
                    if (options.allrules[func_name].alertText)
                        return options.allrules[func_name].alertText;
                    else
                        return result;
                }
            },
            _compareOthers: function (field, rules, i, options) {
                var func_name = rules[i + 1];
                var equalsField = $("#" + rules[i + 2]);
                var equalsField2 = $("#" + rules[i + 3]);
                var rule = options.allrules[func_name];
                var result = rule.func(field.val(), equalsField.val() || equalsField.text(), equalsField.attr('title'),
                    equalsField2.val() || equalsField2.text(), equalsField2.attr('title'));
                if (result != "" && result != "ok") {
                    if (options.allrules[func_name].alertText)
                        return options.allrules[func_name].alertText;
                    else
                        return result;
                }
            },
            _atlast: function (field, rules, i, options) {
                var atlast_rule = rules[i + 1];
                var form = field.closest('form');
                var inps = $("input[class*='atlast[" + atlast_rule + "]']", form);
                var ok = false;
                inps.each(function () {
                    if ($(this).val() != "") {
                        ok = true;
                        return false;
                    }
                });
                if (ok)
                    return;
                var fields_tips = "";
                inps.each(function () {
                    fields_tips += $(this).attr('title');
                    fields_tips += ',';
                });
                return fields_tips + options.allrules.atlast.alertText;
            },
            _maxSize: function (field, rules, i, options) {
                var max = parseFloat(rules[i + 1]);
                var len = field.val().length;

                if (len > max) {
                    var rule = options.allrules.maxSize;
                    return rule.alertText + max + rule.alertText2;
                }
            },
            _minSize: function (field, rules, i, options) {
                var min = parseFloat(rules[i + 1]);
                var len = field.val().length;

                if (len < min) {
                    var rule = options.allrules.minSize;
                    return rule.alertText + min + rule.alertText2;
                }
            },
            _min: function (field, rules, i, options) {
                var min = parseFloat(rules[i + 1]);
                var len = parseFloat(field.val());

                if (len < min) {
                    return "不得小于" + min;
                }
            },
            _max: function (field, rules, i, options) {
                var max = parseFloat(rules[i + 1]);
                var len = parseFloat(field.val());

                if (len > max) {
                    return "不得大于" + max;
                }
            },
            _past: function (field, rules, i, options) {
                var p = rules[i + 1];
                var pdate = (p.toLowerCase() == "now") ? new Date() : methods._parseDate(p);
                var vdate = methods._parseDate(field.val());

                if (vdate < pdate) {
                    var rule = options.allrules.past;
                    if (rule.alertText2) return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
                    return rule.alertText + methods._dateToString(pdate);
                }
            },
            _future: function (field, rules, i, options) {
                var p = rules[i + 1];
                var pdate = (p.toLowerCase() == "now") ? new Date() : methods._parseDate(p);
                var vdate = methods._parseDate(field.val());
                if (vdate > pdate) {
                    var rule = options.allrules.future;
                    if (rule.alertText2) return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
                    return rule.alertText + methods._dateToString(pdate);
                }
            },
            _isDate: function (value) {
                var dateRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
                if (dateRegEx.test(value))
                    return true;
                return false;
            },
            _dateCompare: function (start, end) {
                return (new Date(start.toString()) < new Date(end.toString()));
            },
            _dateRange: function (first, second, rules, i, options) {
                if ((!first[0].value && second[0].value) || (first[0].value && !second[0].value))
                    return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
                if (!methods._isDate(first[0].value) || !methods._isDate(second[0].value))
                    return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
                if (!methods._dateCompare(first[0].value, second[0].value))
                    return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            },
            _maxCheckbox: function (field, rules, i, options) {
                var nbCheck = rules[i + 1];
                var groupname = field.attr("name");
                var groupSize = $("input[name='" + groupname + "']:checked").size();
                if (groupSize > nbCheck) {
                    options.showArrow = false;
                    if (options.allrules.maxCheckbox.alertText2) return options.allrules.maxCheckbox.alertText + " " + nbCheck + " " + options.allrules.maxCheckbox.alertText2;
                    return options.allrules.maxCheckbox.alertText;
                }
            },
            _minCheckbox: function (field, rules, i, options) {
                var nbCheck = rules[i + 1];
                var attr = field.attr("name");
                var groupname = attr.substring(0, attr.length - 1);
                var groupSize = $("input[name^='" + groupname + "']:checked").size();
                if (groupSize < nbCheck) {
                    options.showArrow = false;
                    return options.allrules.minCheckbox.alertText + " " + nbCheck + " " + options.allrules.minCheckbox.alertText2;
                }
            },
            _ajax: function (field, rules, i, options) {
                if (options.isError) return;
                var errorSelector = rules[i + 1];
                var rule = options.allrules[errorSelector];
                var extraData = rule.extraData;
                var extraDataDynamic = rule.extraDataDynamic;
                if (!extraData)
                    extraData = "";
                if (extraDataDynamic) {
                    var tmpData = [];
                    var domIds = String(extraDataDynamic).split(",");
                    for (var i = 0; i < domIds.length; i++) {
                        var id = domIds[i];
                        if ($("#" + id).length) {
                            var inputValue = $("#" + id).val();
                            var keyValue = id + '=' + escape(inputValue);
                            tmpData.push(keyValue);
                        }
                    }
                    extraDataDynamic = tmpData.join("&");
                    extraData += ("&" + extraDataDynamic);
                }
                var ajaxData = {};
                ajaxData.fieldId = field.attr("id");
                ajaxData.fieldValue = field.val();
                _.each(extraData.split('&'), function (item) {
                    var kv = item.split('=');
                    ajaxData[kv[0]] = kv[1];
                });

                $.ajax({
                    type: "POST",
                    url: rule.url,
                    cache: false,
                    dataType: "json",
                    data: isAspWebForm ? JSON.stringify(ajaxData) : ajaxData,
                    field: field,
                    rule: rule,
                    options: options,
                    beforeSend: function () {
                        var loadingText = rule.alertTextLoad;
                        if (loadingText)
                            methods._showPrompt(field, loadingText, "load", true, options);
                    },
                    error: function (data, transport) {
                        methods._closePrompt(this.field);
                        console.log("Ajax error: " + data.status + " " + transport);
                    },
                    success: function (result) {
                        var msg = "";
                        if (rule.callback)
                            msg = rule.callback(result, this.field, methods);
                        else if (result.d)
                            msg = result.d;
                        else
                            msg = result;
                        var nowPromptText = this.field.data("promptText");
                        if (msg != "ok") {
                            methods._showPrompt(this.field,
                                                rule.alertText + msg + "<br/>" + nowPromptText,
                                                "", true, options);
                        } else if (options.showPassText && !nowPromptText) {
                            methods._showPrompt(field, options.showPassText, "pass", true, options);
                        }
                    }
                });

            },
            _dateToString: function (date) {
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            },
            _parseDate: function (d) {
                var dateParts = d.split("-");
                if (dateParts == d)
                    dateParts = d.split("/");
                return new Date(dateParts[0], (dateParts[1] - 1), dateParts[2]);
            },

            _showPrompt: function (field, promptText, type, ajaxed, options, ajaxform) {
                var prompt = methods._getPrompt(field);
                if (ajaxform) prompt = false;
                if (prompt)
                    methods._updatePrompt(field, prompt, promptText, type, ajaxed, options);
                else
                    methods._buildPrompt(field, promptText, type, ajaxed, options);
            },
            _fixPromptWidth: function (promptText, promptContent) {
                var charlength = 0;
                _.each(promptText.split('<br/>'), function (str) {
                    if (str.length > charlength)
                        charlength = str.length;
                });
                promptContent.width(charlength * 12);
            },
            _buildPrompt: function (field, promptText, type, ajaxed, options) {
                //ready
                var getPosition = /valiarr\[(.*)\]/.exec(field.attr('class'));
                if (getPosition) {
                    field.data('valiarr', getPosition[1].split(/\[|,|\]/)[0]);
                } else {
                    field.data('valiarr', options.promptPosition);
                }
                if (field.attr("id")) {
                    field.data('vali_class', field.attr("id"));
                } else {
                    field.data('vali_class', "jqvali_" + Math.random() * 11);
                }
                var buildClass = function (prompt) {
                    prompt.addClass(methods._getClassName(field.data('vali_class')) + "formError");
                    if (field.is(":input"))
                        prompt.addClass("parentForm" + methods._getClassName(field.parents('form').attr("id")));
                }

                var prompt = $('<div>');
                buildClass(prompt);
                prompt.addClass("formError");

                switch (type) {
                    case "pass":
                        prompt.addClass("greenPopup");
                        break;
                    case "load":
                        prompt.addClass("blackPopup");
                }
                if (ajaxed)
                    prompt.addClass("ajaxed");

                var promptContent = $('<div>').addClass("formErrorContent").html(promptText).appendTo(prompt);
                methods._fixPromptWidth(promptText, promptContent);

                if (options.showArrow) {
                    var arrow = $('<div>').addClass("formErrorArrow");
                    switch (field.data('valiarr')) {
                        case "bottomLeft":
                        case "bottomRight":
                            prompt.find(".formErrorContent").before(arrow);
                            arrow.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
                            break;
                        case "topLeft":
                        case "topRight":
                            arrow.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
                            prompt.append(arrow);
                            break;
                    }
                }

                if (options.isOverflown)
                    field.before(prompt);
                else
                    $("body").append(prompt);

                var pos = methods._calculatePosition(field, prompt, options);
                prompt.css({
                    "top": pos.callerTopPosition,
                    "left": pos.callerleftPosition,
                    "marginTop": pos.marginTopSize,
                    "opacity": 0
                });
                return prompt.animate({
                    "opacity": 0.87
                });

            },
            _updatePrompt: function (field, prompt, promptText, type, ajaxed, options) {
                if (!prompt) return;

                methods._fixPromptWidth(promptText, prompt.children(".formErrorContent"));

                if (type == "pass")
                    prompt.addClass("greenPopup");
                else
                    prompt.removeClass("greenPopup");

                if (type == "load")
                    prompt.addClass("blackPopup");
                else
                    prompt.removeClass("blackPopup");

                if (ajaxed)
                    prompt.addClass("ajaxed");
                else
                    prompt.removeClass("ajaxed");

                prompt.find(".formErrorContent").html(promptText);

                var pos = methods._calculatePosition(field, prompt, options);
                prompt.animate({
                    "top": pos.callerTopPosition,
                    "marginTop": pos.marginTopSize
                });
            },
            _closePrompt: function (field) {
                var prompt = methods._getPrompt(field);
                if (prompt) {
                    prompt.fadeTo("fast", 0, function () {
                        prompt.remove();
                    });
                }
            },
            _getPrompt: function (field) {
                if (!field.data('vali_class')) return;
                var className = "." + methods._getClassName(field.data('vali_class')) + "formError";
                var match = $(className)[0];
                if (match)
                    return $(match);
            },
            _calculatePosition: function (field, promptElmt, options) {
                var promptTopPosition, promptleftPosition, marginTopSize;
                var fieldWidth = field.width();
                var promptHeight = promptElmt.height();
                var overflow = options.isOverflown;
                if (overflow) {
                    promptTopPosition = promptleftPosition = 0;
                    marginTopSize = -promptHeight;
                } else {
                    var offset = field.offset();
                    promptTopPosition = offset.top;
                    promptleftPosition = offset.left;
                    marginTopSize = 0;
                }
                switch (field.data('valiarr')) {
                    default:
                    case "topRight":
                        if (overflow)
                            promptleftPosition += fieldWidth - 30;
                        else {
                            promptleftPosition += fieldWidth - 30;
                            promptTopPosition += -promptHeight;
                        }
                        break;
                    case "topLeft":
                        promptTopPosition += -promptHeight - 0;
                        break;
                    case "centerRight":
                        promptleftPosition += fieldWidth + 13;
                        break;
                    case "bottomLeft":
                        promptTopPosition = promptTopPosition + field.height() + 15;
                        break;
                    case "bottomRight":
                        promptleftPosition += fieldWidth - 30;
                        promptTopPosition += field.height() + 5;
                }
                return {
                    "callerTopPosition": promptTopPosition + "px",
                    "callerleftPosition": promptleftPosition + "px",
                    "marginTopSize": marginTopSize + "px"
                };
            },
            _getClassName: function (className) {
                return className.replace(":", "_").replace(".", "_");
            }
        };

        $.fn.validationEngine = function (method) {
            var form = $(this);
            if (!form[0]) return false;
            if (typeof (method) == 'string' && method.charAt(0) != '_' && methods[method]) {
                // make sure init is called once
                if (method != "showPrompt" && method != "hidePrompt" && method != "hide" && method != "hideAll")
                    methods.init.apply(form);
                return methods[method].apply(form, Array.prototype.slice.call(arguments, 1));
            } else {
                methods.init.apply(form, arguments);
                return methods.attach.apply(form);
            }
        };

        $.validationEngine = {
            defaults: {
                eventTrigger: "blur",
                uneventTrigger: "", //click
                showPassText: "", //&nbsp;
                // Automatically scroll viewport to the first error
                scroll: true,
                // Opening box position, possible locations are: topLeft, topRight, bottomLeft, centerRight, bottomRight
                promptPosition: "centerRight",
                // internal, automatically set to true when it parse a _ajax rule
                inlineAjax: false,
                // The url to send the submit ajax validation (default to action)
                onAjaxFormComplete: $.noop,
                // called right before the ajax call, may return false to cancel
                onBeforeAjaxFormValidation: $.noop,
                // Stops form from submitting and execute function assiciated with it
                onValidationComplete: false,
                // Used when the form is displayed within a scrolling DIV
                isOverflown: false,
                overflownDIV: "",
                // true when form and fields are binded
                binded: false,
                showArrow: true,
                // did one of the validation fail ? kept global to stop further ajax validations
                isError: false,
                // Caches field validation status, typically only bad status are created.
                // the array is used during ajax form validation to detect issues early and prevent an expensive submit
                ajaxValidCache: {},
                // Auto update prompt position after window resize
                autoPositionUpdate: false,
                // Custom FieldVali Success|Failure Func
                InvalidFields: [],
                onSuccess: false,
                onFailure: false
            }
        };
        return methods;
    }
});
define("product/guoqude/1.0.0/front_net/module-zic/plus_anim-debug", ["gallery/jquery/1.8.3/jquery-debug"], function (require, exports, module) {
var $ = require('gallery/jquery/1.8.3/jquery-debug').sub();

$.fn.plusAnim = function (options) {
    var opts = $.extend({
        statusClass: "icon-red",
        itemClass: "red"
    }, options);
    
    this.on("click", function(){
        var _this = $(this);
        if(_this.children("i").hasClass(opts.statusClass)) return;
        var r = _this.offset();
        var i = $("<div class='"+ opts.itemClass +"' style='font-size:10px;z-index:1000'>+1</div>");
        i.appendTo("body");
        r.top += 7;
        r.left += 30;
        i.offset(r).css("display","block").animate(
            {
                "font-size":"64px",
                opacity:0,
                left:"-=40px"
            },
            350,
            "linear",
            function(){ i.remove() }
        );
    })
}

module.exports = $;

});
define("product/guoqude/1.0.0/front_net/module-zic/placeholder-debug", ["gallery/jquery/1.8.3/jquery-debug"], function (require, exports, module) {
var $ = require('gallery/jquery/1.8.3/jquery-debug').sub();

var hasPlaceholderSupport = function() {
    var input = document.createElement('input');
    return ('placeholder' in input);
}

$.fn.placeholder = function (options) {
    if (hasPlaceholderSupport()) return;

    var opts = $.extend({
        holdClass: "txtholding"
    }, options);

    this.each(function () {
        var o = $(this);
        if (o.attr("type") == "password") return;

        o.data("text", $.trim(o.attr("placeholder")));

        if ($.trim(o.val()) == "") {
            o.val(o.data("text"));
            o.addClass(opts.holdClass);
        } else if ($.trim(o.val()) == o.data("text")) {
            o.addClass(opts.holdClass);
        }

        o.focus(function () {
            o.removeClass(opts.holdClass);
            if ($.trim(o.val()) == o.data("text")) o.val("");
        }).blur(function () {
            if ($.trim(o.val()) == "") {
                o.val(o.data("text"));
                o.addClass(opts.holdClass);
            } else if ($.trim(o.val()) == o.data("text")) {
                o.addClass(opts.holdClass);
            }
        });
    });
}

module.exports = $;

});
define("product/guoqude/1.0.0/front_net/module-zic/returntop/returnTop-debug", ["gallery/jquery/1.8.3/jquery-debug"], function (require, exports, module) {
var $ = require('gallery/jquery/1.8.3/jquery-debug').sub();

$.fn.returnTop = function (options) {
    var b = this.click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        var c = $(window).height() + 80 + "px";
        b.data("isClick", !0);
        b.css("bottom", c)
    }),
    c = null;
    $(window).bind("scroll", function () {
        var d = $(document).scrollTop(),
            e = $(window).height();
        0 < d ? b.data("isClick") || b.css({
            opacity: 1,
            bottom: "200px"
        }) : b.css({
            opacity: 0,
            bottom: "-200px"
        }).data("isClick", !1);
        $("html").hasClass("no-postmessage") && (b.hide(), clearTimeout(c), c = setTimeout(function () {
            b.show();
            clearTimeout(c)
        }, 1E3), b.css("top", d + e - 125))
    })
}

module.exports = $;

});
define("product/guoqude/1.0.0/front_net/module-zic/proto-debug", [], function (require, exports) {
    
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

    exports.addLoadEvent = function() {
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

    exports.addClass = function(element, value) {
        if (!element.className) {
            element.className = value;
        } else {
            element.className += " ";
            element.className += value;
        }
    }

    exports.insertAfter = function(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }

    exports.getNextElement = function(node) {
        if (node.nodeType == 1) return node; if (node.nextSibling) {
            return getNextElement(node.nextSibling);
        }
    }

});
define("product/guoqude/1.0.0/front_net/module-zic/area/area2-debug", ["../../module/artDialog5/amd/artDialog5-debug", "gallery/jquery/1.8.3/jquery-debug", "gallery/mustache/0.5.0/mustache-debug", "gallery/underscore/1.4.2/underscore-debug"], function (require, exports, module) {
var $ = require('gallery/jquery/1.8.3/jquery-debug').sub();
var mc = require('gallery/mustache/0.5.0/mustache-debug');
var _ = require('gallery/underscore/1.4.2/underscore-debug');
var ArtDialog = require('../../module/artDialog5/amd/artDialog5-debug');

$.fn.area2 = function (options) {
    if(!window.cityHintArea) {
        alert("数据加载失败！");
        return;
    }

    var opts = $.extend({
        valueDom: ".hfarea"
    }, options || {});

    //IE7中，Popup内部的A标签无法使用href属性，否则出现自动close的bug，原因未知。
    var areatemp = "<dl class='clear'><dt>{{key}}</dt><dd>\
                    {{#value}}<span class='prov hov'>{{.}}</span>{{/value}}\
                    </dd></dl>";
    var citytemp = "{{#value}}<li><a class='city hov'>{{.}}</a></li>{{/value}}";

    var stackProv = [];
    var closeProvDia = function () {
        for (var i = 0; i < stackProv.length; i++) {
            ArtDialog.dialog.list[stackProv[i]].close();
        }
        stackProv = [];
    }

    this.each(function () {
        var _this = $(this);
        _this.empty().text("请选择省市");
        
        var valueDom = _this.siblings(opts.valueDom);
        var SetValue = function () {
            _this.text(CacheObj.Prov + (CacheObj.City? "，" + CacheObj.City:"" ));
            valueDom.val(CacheObj.Prov + (CacheObj.City? "," + CacheObj.City:"" ));
        }

        var CacheObj = {};
        if (valueDom.val()) {
            var cache = valueDom.val().split(',');
            CacheObj.Prov = cache[0];
            if (cache.length > 1) CacheObj.City = cache[1];
            SetValue();
        }

        var provhint = $('<div class="provhint hide"><span class="close_prov"></span></div>').appendTo("body");
        _.each(window.cityHintArea, function (v, k) {
            provhint.append(mc.to_html(areatemp, { key: k, value: v }));
        });
        $("span.prov", provhint).hover(function () { $(this).addClass('hover'); }, function () { $(this).removeClass('hover'); });

        _this.on("click", function () {
            ArtDialog.dialog({
                initialize: function () {
                    var _that = this;
                    $('span.close_prov', provhint).on("click", function () {
                        closeProvDia();
                        _that.close();
                    });
                    $("div.d-state-focus").addClass("popup");
                    //$("body>div.aui_state_focus").addClass("popup"); artDialog4
                },
                fixed: true,
                lock: true,
                content: provhint[0]
            });
        });

        var cityhint = $("<ul class='cityhint clear hide'></ul>").appendTo("body");
        $("span.prov", provhint).on("click", function () {
            var _prov = $(this);
            var cm = window.cityHintProv[_prov.text()];
            if(cm.length < 2) {
                CacheObj.Prov = _prov.text();
                CacheObj.City = '';
                SetValue();
                $('span.close_prov', provhint).click();
                return;
            }
            closeProvDia();
            stackProv.push(_prov.text());
            $("span.prov.current", provhint).removeClass("current");
            _prov.addClass("current");
            cityhint.html(mc.to_html(citytemp, { value: cm }));
            ArtDialog.dialog({
                id: _prov.text(),
                follow: _prov[0],
                fixed: true,
                initialize: function () {
                    $("div.d-state-focus").addClass("popup");
                    //$("body>div.aui_state_focus").addClass("popup"); artDialog4
                },
                content: cityhint[0]
            });
            cityhint.off("click", "a").on("click", "a", function () {
                CacheObj.Prov = _prov.text();
                CacheObj.City = $(this).text();
                SetValue();
                $('span.close_prov', provhint).click();
            });
        });

    });
};

module.exports = $;

});
define("product/guoqude/1.0.0/front_net/module-zic/form_snippet-debug", [], function (require, exports, module) { return function($, _, JSON){

$.fn.serializeFormToJson = function (options) {
    var opts = $.extend({
        filter: '',
        byString: false
    }, options);

    var json = $(":input, select, taxtarea", this).not(opts.filter).serializeArray();
    var obj = {};
    for (var i = 0; i < json.length; i++) {
        obj[json[i].name] = json[i].value;
    }
    if(opts.byString)
        return JSON.stringify(obj);
    return obj;
};

//让非[type=submit]按钮也能通过click事件提交表单，一般只会在ASP.NET MVC中使用到
$.fn.linksubmit = function () {
    this.each(function () {
        $(this).click(function () {
            $(this).closest("form").submit();
        });
    });
}

//目标：让表单中input的回车事件与指定的按钮click事件对应触发
//表单中的input回车事件会自动触发本表单第一个submit按钮（如果有的话）的click事件。
//但是在IE6-8中，如果表单中只有一个input，则不会触发submit按钮的click事件而是直接触发表单的submit事件
//非[type=submit]按钮（如A标签）肯定需要此模块达成目标。
//[type=submit]按钮只有在支持IE6-8的项目中的只有一个input的表单中才需要此模块
//如果要替换“第一个submit按钮”的职位，可以指定form标签的defaultbutton属性。
$.fn.accessform = function (options) {
    var opts = $.extend({
        assistClass: 'access_'
    }, options);
    this.each(function () {
        var o = $(this);
        $("input[accesskey]", o).bind("keydown", function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                var subbtn = $('.' + opts.assistClass + $(this).attr('accesskey'), o);
                subbtn.click();
                if (subbtn.is("[href^='javascript:']")) { //Fix ASP.NET WebForm Feature.
                    _.delay(function () {
                        if ($("body>div.formError").length)
                            return;
                        else
                            eval(subbtn.attr('href'));
                    }, 200);
                }
                return false;
            }
        });
    });
}

//清除所有的表单数据
$.fn.clearinput = function () {
    // run with $(':input', form)
    $(this).each(function() {
        var type = this.type;
        var tag = this.tagName.toLowerCase(); // normalize case
        // it's ok to reset the value attr of text inputs,
        // password inputs, and textareas
        if (type == 'text' || type == 'password' || tag == 'textarea')
        this.value = "";
        // checkboxes and radios need to have their checked state cleared
        // but should *not* have their 'value' changed
        else if (type == 'checkbox' || type == 'radio')
        this.checked = false;
        // select elements need to have their 'selectedIndex' property set to -1
        // (this works for both single and multiple select elements)
        else if (tag == 'select')
        this.selectedIndex = -1;
    });
};

$.fn.oncesubmit = function () {
    $("form", this).on('submit', function(){
        form = $(this)
        if(form.data('onceclick')) return false;
        form.data({'onceclick': true});
        setTimeout(function(){
            form.data({'onceclick': false});
        }, 500)
    });
}

}});
/*1.5.4*/
define("product/guoqude/1.0.0/front_net/module/plupload/amd/plupload-debug", [], function (require, exports) {
    (function () { var f = 0, k = [], m = {}, i = {}, a = { "<": "lt", ">": "gt", "&": "amp", '"': "quot", "'": "#39" }, l = /[<>&\"\']/g, b, c = window.setTimeout, d = {}, e; function h() { this.returnValue = false } function j() { this.cancelBubble = true } (function (n) { var o = n.split(/,/), p, r, q; for (p = 0; p < o.length; p += 2) { q = o[p + 1].split(/ /); for (r = 0; r < q.length; r++) { i[q[r]] = o[p] } } })("application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mpga mpega mp2 mp3,audio/x-wav,wav,audio/mp4,m4a,image/bmp,bmp,image/gif,gif,image/jpeg,jpeg jpg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/vnd.rn-realvideo,rv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe"); var g = { VERSION: "1.5.4", STOPPED: 1, STARTED: 2, QUEUED: 1, UPLOADING: 2, FAILED: 4, DONE: 5, GENERIC_ERROR: -100, HTTP_ERROR: -200, IO_ERROR: -300, SECURITY_ERROR: -400, INIT_ERROR: -500, FILE_SIZE_ERROR: -600, FILE_EXTENSION_ERROR: -601, IMAGE_FORMAT_ERROR: -700, IMAGE_MEMORY_ERROR: -701, IMAGE_DIMENSIONS_ERROR: -702, mimeTypes: i, ua: (function () { var r = navigator, q = r.userAgent, s = r.vendor, o, n, p; o = /WebKit/.test(q); p = o && s.indexOf("Apple") !== -1; n = window.opera && window.opera.buildNumber; return { windows: navigator.platform.indexOf("Win") !== -1, ie: !o && !n && (/MSIE/gi).test(q) && (/Explorer/gi).test(r.appName), webkit: o, gecko: !o && /Gecko/.test(q), safari: p, opera: !!n } }()), typeOf: function (n) { return ({}).toString.call(n).match(/\s([a-z|A-Z]+)/)[1].toLowerCase() }, extend: function (n) { g.each(arguments, function (o, p) { if (p > 0) { g.each(o, function (r, q) { n[q] = r }) } }); return n }, cleanName: function (n) { var o, p; p = [/[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u"]; for (o = 0; o < p.length; o += 2) { n = n.replace(p[o], p[o + 1]) } n = n.replace(/\s+/g, "_"); n = n.replace(/[^a-z0-9_\-\.]+/gi, ""); return n }, addRuntime: function (n, o) { o.name = n; k[n] = o; k.push(o); return o }, guid: function () { var n = new Date().getTime().toString(32), o; for (o = 0; o < 5; o++) { n += Math.floor(Math.random() * 65535).toString(32) } return (g.guidPrefix || "p") + n + (f++).toString(32) }, buildUrl: function (o, n) { var p = ""; g.each(n, function (r, q) { p += (p ? "&" : "") + encodeURIComponent(q) + "=" + encodeURIComponent(r) }); if (p) { o += (o.indexOf("?") > 0 ? "&" : "?") + p } return o }, each: function (q, r) { var p, o, n; if (q) { p = q.length; if (p === b) { for (o in q) { if (q.hasOwnProperty(o)) { if (r(q[o], o) === false) { return } } } } else { for (n = 0; n < p; n++) { if (r(q[n], n) === false) { return } } } } }, formatSize: function (n) { if (n === b || /\D/.test(n)) { return g.translate("N/A") } if (n > 1073741824) { return Math.round(n / 1073741824, 1) + " GB" } if (n > 1048576) { return Math.round(n / 1048576, 1) + " MB" } if (n > 1024) { return Math.round(n / 1024, 1) + " KB" } return n + " b" }, getPos: function (o, s) { var t = 0, r = 0, v, u = document, p, q; o = o; s = s || u.body; function n(B) { var z, A, w = 0, C = 0; if (B) { A = B.getBoundingClientRect(); z = u.compatMode === "CSS1Compat" ? u.documentElement : u.body; w = A.left + z.scrollLeft; C = A.top + z.scrollTop } return { x: w, y: C } } if (o && o.getBoundingClientRect && ((navigator.userAgent.indexOf("MSIE") > 0) && (u.documentMode < 8))) { p = n(o); q = n(s); return { x: p.x - q.x, y: p.y - q.y } } v = o; while (v && v != s && v.nodeType) { t += v.offsetLeft || 0; r += v.offsetTop || 0; v = v.offsetParent } v = o.parentNode; while (v && v != s && v.nodeType) { t -= v.scrollLeft || 0; r -= v.scrollTop || 0; v = v.parentNode } return { x: t, y: r } }, getSize: function (n) { return { w: n.offsetWidth || n.clientWidth, h: n.offsetHeight || n.clientHeight } }, parseSize: function (n) { var o; if (typeof (n) == "string") { n = /^([0-9]+)([mgk]?)$/.exec(n.toLowerCase().replace(/[^0-9mkg]/g, "")); o = n[2]; n = +n[1]; if (o == "g") { n *= 1073741824 } if (o == "m") { n *= 1048576 } if (o == "k") { n *= 1024 } } return n }, xmlEncode: function (n) { return n ? ("" + n).replace(l, function (o) { return a[o] ? "&" + a[o] + ";" : o }) : n }, toArray: function (p) { var o, n = []; for (o = 0; o < p.length; o++) { n[o] = p[o] } return n }, inArray: function (p, q) { if (q) { if (Array.prototype.indexOf) { return Array.prototype.indexOf.call(q, p) } for (var n = 0, o = q.length; n < o; n++) { if (q[n] === p) { return n } } } return -1 }, addI18n: function (n) { return g.extend(m, n) }, translate: function (n) { return m[n] || n }, isEmptyObj: function (n) { if (n === b) { return true } for (var o in n) { return false } return true }, hasClass: function (p, o) { var n; if (p.className == "") { return false } n = new RegExp("(^|\\s+)" + o + "(\\s+|$)"); return n.test(p.className) }, addClass: function (o, n) { if (!g.hasClass(o, n)) { o.className = o.className == "" ? n : o.className.replace(/\s+$/, "") + " " + n } }, removeClass: function (p, o) { var n = new RegExp("(^|\\s+)" + o + "(\\s+|$)"); p.className = p.className.replace(n, function (r, q, s) { return q === " " && s === " " ? " " : "" }) }, getStyle: function (o, n) { if (o.currentStyle) { return o.currentStyle[n] } else { if (window.getComputedStyle) { return window.getComputedStyle(o, null)[n] } } }, addEvent: function (s, n, t) { var r, q, p, o; o = arguments[3]; n = n.toLowerCase(); if (e === b) { e = "Plupload_" + g.guid() } if (s.addEventListener) { r = t; s.addEventListener(n, r, false) } else { if (s.attachEvent) { r = function () { var u = window.event; if (!u.target) { u.target = u.srcElement } u.preventDefault = h; u.stopPropagation = j; t(u) }; s.attachEvent("on" + n, r) } } if (s[e] === b) { s[e] = g.guid() } if (!d.hasOwnProperty(s[e])) { d[s[e]] = {} } q = d[s[e]]; if (!q.hasOwnProperty(n)) { q[n] = [] } q[n].push({ func: r, orig: t, key: o }) }, removeEvent: function (s, n) { var q, t, p; if (typeof (arguments[2]) == "function") { t = arguments[2] } else { p = arguments[2] } n = n.toLowerCase(); if (s[e] && d[s[e]] && d[s[e]][n]) { q = d[s[e]][n] } else { return } for (var o = q.length - 1; o >= 0; o--) { if (q[o].key === p || q[o].orig === t) { if (s.removeEventListener) { s.removeEventListener(n, q[o].func, false) } else { if (s.detachEvent) { s.detachEvent("on" + n, q[o].func) } } q[o].orig = null; q[o].func = null; q.splice(o, 1); if (t !== b) { break } } } if (!q.length) { delete d[s[e]][n] } if (g.isEmptyObj(d[s[e]])) { delete d[s[e]]; try { delete s[e] } catch (r) { s[e] = b } } }, removeAllEvents: function (o) { var n = arguments[1]; if (o[e] === b || !o[e]) { return } g.each(d[o[e]], function (q, p) { g.removeEvent(o, p, n) }) } }; g.Uploader = function (r) { var o = {}, u, t = [], q, p = false; u = new g.QueueProgress(); r = g.extend({ chunk_size: 0, multipart: true, multi_selection: true, file_data_name: "file", filters: [] }, r); function s() { var w, x = 0, v; if (this.state == g.STARTED) { for (v = 0; v < t.length; v++) { if (!w && t[v].status == g.QUEUED) { w = t[v]; w.status = g.UPLOADING; if (this.trigger("BeforeUpload", w)) { this.trigger("UploadFile", w) } } else { x++ } } if (x == t.length) { this.stop(); this.trigger("UploadComplete", t) } } } function n() { var w, v; u.reset(); for (w = 0; w < t.length; w++) { v = t[w]; if (v.size !== b) { u.size += v.size; u.loaded += v.loaded } else { u.size = b } if (v.status == g.DONE) { u.uploaded++ } else { if (v.status == g.FAILED) { u.failed++ } else { u.queued++ } } } if (u.size === b) { u.percent = t.length > 0 ? Math.ceil(u.uploaded / t.length * 100) : 0 } else { u.bytesPerSec = Math.ceil(u.loaded / ((+new Date() - q || 1) / 1000)); u.percent = u.size > 0 ? Math.ceil(u.loaded / u.size * 100) : 0 } } g.extend(this, { state: g.STOPPED, runtime: "", features: {}, files: t, settings: r, total: u, id: g.guid(), init: function () { var A = this, B, x, w, z = 0, y; if (typeof (r.preinit) == "function") { r.preinit(A) } else { g.each(r.preinit, function (D, C) { A.bind(C, D) }) } r.page_url = r.page_url || document.location.pathname.replace(/\/[^\/]+$/g, "/"); if (!/^(\w+:\/\/|\/)/.test(r.url)) { r.url = r.page_url + r.url } r.chunk_size = g.parseSize(r.chunk_size); r.max_file_size = g.parseSize(r.max_file_size); A.bind("FilesAdded", function (C, F) { var E, D, H = 0, I, G = r.filters; if (G && G.length) { I = []; g.each(G, function (J) { g.each(J.extensions.split(/,/), function (K) { if (/^\s*\*\s*$/.test(K)) { I.push("\\.*") } else { I.push("\\." + K.replace(new RegExp("[" + ("/^$.*+?|()[]{}\\".replace(/./g, "\\$&")) + "]", "g"), "\\$&")) } }) }); I = new RegExp(I.join("|") + "$", "i") } for (E = 0; E < F.length; E++) { D = F[E]; D.loaded = 0; D.percent = 0; D.status = g.QUEUED; if (I && !I.test(D.name)) { C.trigger("Error", { code: g.FILE_EXTENSION_ERROR, message: g.translate("File extension error."), file: D }); continue } if (D.size !== b && D.size > r.max_file_size) { C.trigger("Error", { code: g.FILE_SIZE_ERROR, message: g.translate("File size error."), file: D }); continue } t.push(D); H++ } if (H) { c(function () { A.trigger("QueueChanged"); A.refresh() }, 1) } else { return false } }); if (r.unique_names) { A.bind("UploadFile", function (C, D) { var F = D.name.match(/\.([^.]+)$/), E = "tmp"; if (F) { E = F[1] } D.target_name = D.id + "." + E }) } A.bind("UploadProgress", function (C, D) { D.percent = D.size > 0 ? Math.ceil(D.loaded / D.size * 100) : 100; n() }); A.bind("StateChanged", function (C) { if (C.state == g.STARTED) { q = (+new Date()) } else { if (C.state == g.STOPPED) { for (B = C.files.length - 1; B >= 0; B--) { if (C.files[B].status == g.UPLOADING) { C.files[B].status = g.QUEUED; n() } } } } }); A.bind("QueueChanged", n); A.bind("Error", function (C, D) { if (D.file) { D.file.status = g.FAILED; n(); if (C.state == g.STARTED) { c(function () { s.call(A) }, 1) } } }); A.bind("FileUploaded", function (C, D) { D.status = g.DONE; D.loaded = D.size; C.trigger("UploadProgress", D); c(function () { s.call(A) }, 1) }); if (r.runtimes) { x = []; y = r.runtimes.split(/\s?,\s?/); for (B = 0; B < y.length; B++) { if (k[y[B]]) { x.push(k[y[B]]) } } } else { x = k } function v() { var F = x[z++], E, C, D; if (F) { E = F.getFeatures(); C = A.settings.required_features; if (C) { C = C.split(","); for (D = 0; D < C.length; D++) { if (!E[C[D]]) { v(); return } } } F.init(A, function (G) { if (G && G.success) { A.features = E; A.runtime = F.name; A.trigger("Init", { runtime: F.name }); A.trigger("PostInit"); A.refresh() } else { v() } }) } else { A.trigger("Error", { code: g.INIT_ERROR, message: g.translate("Init error.") }) } } v(); if (typeof (r.init) == "function") { r.init(A) } else { g.each(r.init, function (D, C) { A.bind(C, D) }) } }, refresh: function () { this.trigger("Refresh") }, start: function () { if (t.length && this.state != g.STARTED) { this.state = g.STARTED; this.trigger("StateChanged"); s.call(this) } }, stop: function () { if (this.state != g.STOPPED) { this.state = g.STOPPED; this.trigger("CancelUpload"); this.trigger("StateChanged") } }, disableBrowse: function () { p = arguments[0] !== b ? arguments[0] : true; this.trigger("DisableBrowse", p) }, getFile: function (w) { var v; for (v = t.length - 1; v >= 0; v--) { if (t[v].id === w) { return t[v] } } }, removeFile: function (w) { var v; for (v = t.length - 1; v >= 0; v--) { if (t[v].id === w.id) { return this.splice(v, 1)[0] } } }, splice: function (x, v) { var w; w = t.splice(x === b ? 0 : x, v === b ? t.length : v); this.trigger("FilesRemoved", w); this.trigger("QueueChanged"); return w }, trigger: function (w) { var y = o[w.toLowerCase()], x, v; if (y) { v = Array.prototype.slice.call(arguments); v[0] = this; for (x = 0; x < y.length; x++) { if (y[x].func.apply(y[x].scope, v) === false) { return false } } } return true }, hasEventListener: function (v) { return !!o[v.toLowerCase()] }, bind: function (v, x, w) { var y; v = v.toLowerCase(); y = o[v] || []; y.push({ func: x, scope: w || this }); o[v] = y }, unbind: function (v) { v = v.toLowerCase(); var y = o[v], w, x = arguments[1]; if (y) { if (x !== b) { for (w = y.length - 1; w >= 0; w--) { if (y[w].func === x) { y.splice(w, 1); break } } } else { y = [] } if (!y.length) { delete o[v] } } }, unbindAll: function () { var v = this; g.each(o, function (x, w) { v.unbind(w) }) }, destroy: function () { this.stop(); this.trigger("Destroy"); this.unbindAll() } }) }; g.File = function (q, o, p) { var n = this; n.id = q; n.name = o; n.size = p; n.loaded = 0; n.percent = 0; n.status = 0 }; g.Runtime = function () { this.getFeatures = function () { }; this.init = function (n, o) { } }; g.QueueProgress = function () { var n = this; n.size = 0; n.loaded = 0; n.uploaded = 0; n.failed = 0; n.queued = 0; n.percent = 0; n.bytesPerSec = 0; n.reset = function () { n.size = n.loaded = n.uploaded = n.failed = n.queued = n.percent = n.bytesPerSec = 0 } }; g.runtimes = {}; window.plupload = g })();
});
define("product/guoqude/1.0.0/front_net/module/plupload/amd/plupload.html5-debug", [], function (require, exports) {
    (function (h, k, j, e) { var c = {}, g; function m(o, p) { var n; if ("FileReader" in h) { n = new FileReader(); n.readAsDataURL(o); n.onload = function () { p(n.result) } } else { return p(o.getAsDataURL()) } } function l(o, p) { var n; if ("FileReader" in h) { n = new FileReader(); n.readAsBinaryString(o); n.onload = function () { p(n.result) } } else { return p(o.getAsBinary()) } } function d(r, p, n, v) { var q, o, u, s, t = this; m(c[r.id], function (w) { q = k.createElement("canvas"); q.style.display = "none"; k.body.appendChild(q); o = q.getContext("2d"); u = new Image(); u.onerror = u.onabort = function () { v({ success: false }) }; u.onload = function () { var B, x, z, y, A; if (!p.width) { p.width = u.width } if (!p.height) { p.height = u.height } s = Math.min(p.width / u.width, p.height / u.height); if (s < 1 || (s === 1 && n === "image/jpeg")) { B = Math.round(u.width * s); x = Math.round(u.height * s); q.width = B; q.height = x; o.drawImage(u, 0, 0, B, x); if (n === "image/jpeg") { y = new f(atob(w.substring(w.indexOf("base64,") + 7))); if (y.headers && y.headers.length) { A = new a(); if (A.init(y.get("exif")[0])) { A.setExif("PixelXDimension", B); A.setExif("PixelYDimension", x); y.set("exif", A.getBinary()); if (t.hasEventListener("ExifData")) { t.trigger("ExifData", r, A.EXIF()) } if (t.hasEventListener("GpsData")) { t.trigger("GpsData", r, A.GPS()) } } } if (p.quality) { try { w = q.toDataURL(n, p.quality / 100) } catch (C) { w = q.toDataURL(n) } } } else { w = q.toDataURL(n) } w = w.substring(w.indexOf("base64,") + 7); w = atob(w); if (y && y.headers && y.headers.length) { w = y.restore(w); y.purge() } q.parentNode.removeChild(q); v({ success: true, data: w }) } else { v({ success: false }) } }; u.src = w }) } j.runtimes.Html5 = j.addRuntime("html5", { getFeatures: function () { var s, o, r, q, p, n; o = r = p = n = false; if (h.XMLHttpRequest) { s = new XMLHttpRequest(); r = !!s.upload; o = !!(s.sendAsBinary || s.upload) } if (o) { q = !!(s.sendAsBinary || (h.Uint8Array && h.ArrayBuffer)); p = !!(File && (File.prototype.getAsDataURL || h.FileReader) && q); n = !!(File && (File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)) } g = j.ua.safari && j.ua.windows; return { html5: o, dragdrop: (function () { var t = k.createElement("div"); return ("draggable" in t) || ("ondragstart" in t && "ondrop" in t) }()), jpgresize: p, pngresize: p, multipart: p || !!h.FileReader || !!h.FormData, canSendBinary: q, cantSendBlobInFormData: !!(j.ua.gecko && h.FormData && h.FileReader && !FileReader.prototype.readAsArrayBuffer), progress: r, chunks: n, multi_selection: !(j.ua.safari && j.ua.windows), triggerDialog: (j.ua.gecko && h.FormData || j.ua.webkit) } }, init: function (p, r) { var n, q; function o(w) { var u, t, v = [], x, s = {}; for (t = 0; t < w.length; t++) { u = w[t]; if (s[u.name]) { continue } s[u.name] = true; x = j.guid(); c[x] = u; v.push(new j.File(x, u.fileName || u.name, u.fileSize || u.size)) } if (v.length) { p.trigger("FilesAdded", v) } } n = this.getFeatures(); if (!n.html5) { r({ success: false }); return } p.bind("Init", function (w) { var G, F, C = [], v, D, t = w.settings.filters, u, B, s = k.body, E; G = k.createElement("div"); G.id = w.id + "_html5_container"; j.extend(G.style, { position: "absolute", background: p.settings.shim_bgcolor || "transparent", width: "100px", height: "100px", overflow: "hidden", zIndex: 99999, opacity: p.settings.shim_bgcolor ? "" : 0 }); G.className = "plupload html5"; if (p.settings.container) { s = k.getElementById(p.settings.container); if (j.getStyle(s, "position") === "static") { s.style.position = "relative" } } s.appendChild(G); no_type_restriction: for (v = 0; v < t.length; v++) { u = t[v].extensions.split(/,/); for (D = 0; D < u.length; D++) { if (u[D] === "*") { C = []; break no_type_restriction } B = j.mimeTypes[u[D]]; if (B && j.inArray(B, C) === -1) { C.push(B) } } } G.innerHTML = '<input id="' + p.id + '_html5"  style="font-size:999px" type="file" accept="' + C.join(",") + '" ' + (p.settings.multi_selection && p.features.multi_selection ? 'multiple="multiple"' : "") + " />"; G.scrollTop = 100; E = k.getElementById(p.id + "_html5"); if (w.features.triggerDialog) { j.extend(E.style, { position: "absolute", width: "100%", height: "100%" }) } else { j.extend(E.style, { cssFloat: "right", styleFloat: "right" }) } E.onchange = function () { o(this.files); this.value = "" }; F = k.getElementById(w.settings.browse_button); if (F) { var z = w.settings.browse_button_hover, A = w.settings.browse_button_active, x = w.features.triggerDialog ? F : G; if (z) { j.addEvent(x, "mouseover", function () { j.addClass(F, z) }, w.id); j.addEvent(x, "mouseout", function () { j.removeClass(F, z) }, w.id) } if (A) { j.addEvent(x, "mousedown", function () { j.addClass(F, A) }, w.id); j.addEvent(k.body, "mouseup", function () { j.removeClass(F, A) }, w.id) } if (w.features.triggerDialog) { j.addEvent(F, "click", function (H) { var y = k.getElementById(w.id + "_html5"); if (y && !y.disabled) { y.click() } H.preventDefault() }, w.id) } } }); p.bind("PostInit", function () { var s = k.getElementById(p.settings.drop_element); if (s) { if (g) { j.addEvent(s, "dragenter", function (w) { var v, t, u; v = k.getElementById(p.id + "_drop"); if (!v) { v = k.createElement("input"); v.setAttribute("type", "file"); v.setAttribute("id", p.id + "_drop"); v.setAttribute("multiple", "multiple"); j.addEvent(v, "change", function () { o(this.files); j.removeEvent(v, "change", p.id); v.parentNode.removeChild(v) }, p.id); s.appendChild(v) } t = j.getPos(s, k.getElementById(p.settings.container)); u = j.getSize(s); if (j.getStyle(s, "position") === "static") { j.extend(s.style, { position: "relative" }) } j.extend(v.style, { position: "absolute", display: "block", top: 0, left: 0, width: u.w + "px", height: u.h + "px", opacity: 0 }) }, p.id); return } j.addEvent(s, "dragover", function (t) { t.preventDefault() }, p.id); j.addEvent(s, "drop", function (u) { var t = u.dataTransfer; if (t && t.files) { o(t.files) } u.preventDefault() }, p.id) } }); p.bind("Refresh", function (s) { var t, u, v, x, w; t = k.getElementById(p.settings.browse_button); if (t) { u = j.getPos(t, k.getElementById(s.settings.container)); v = j.getSize(t); x = k.getElementById(p.id + "_html5_container"); j.extend(x.style, { top: u.y + "px", left: u.x + "px", width: v.w + "px", height: v.h + "px" }); if (p.features.triggerDialog) { if (j.getStyle(t, "position") === "static") { j.extend(t.style, { position: "relative" }) } w = parseInt(j.getStyle(t, "z-index"), 10); if (isNaN(w)) { w = 0 } j.extend(t.style, { zIndex: w }); j.extend(x.style, { zIndex: w - 1 }) } } }); p.bind("DisableBrowse", function (s, u) { var t = k.getElementById(s.id + "_html5"); if (t) { t.disabled = u } }); p.bind("CancelUpload", function () { if (q && q.abort) { q.abort() } }); p.bind("UploadFile", function (s, u) { var v = s.settings, y, t; function x(A, D, z) { var B; if (File.prototype.slice) { try { A.slice(); return A.slice(D, z) } catch (C) { return A.slice(D, z - D) } } else { if (B = File.prototype.webkitSlice || File.prototype.mozSlice) { return B.call(A, D, z) } else { return null } } } function w(A) { var D = 0, C = 0, z = ("FileReader" in h) ? new FileReader : null; function B() { var I, M, K, L, H, J, F, E = s.settings.url; function G(V) { var T = 0, N = "----pluploadboundary" + j.guid(), O, P = "--", U = "\r\n", R = ""; q = new XMLHttpRequest; if (q.upload) { q.upload.onprogress = function (W) { u.loaded = Math.min(u.size, C + W.loaded - T); s.trigger("UploadProgress", u) } } q.onreadystatechange = function () { var W, Y; if (q.readyState == 4 && s.state !== j.STOPPED) { try { W = q.status } catch (X) { W = 0 } if (W >= 400) { s.trigger("Error", { code: j.HTTP_ERROR, message: j.translate("HTTP Error."), file: u, status: W }) } else { if (K) { Y = { chunk: D, chunks: K, response: q.responseText, status: W }; s.trigger("ChunkUploaded", u, Y); C += J; if (Y.cancelled) { u.status = j.FAILED; return } u.loaded = Math.min(u.size, (D + 1) * H) } else { u.loaded = u.size } s.trigger("UploadProgress", u); V = I = O = R = null; if (!K || ++D >= K) { u.status = j.DONE; s.trigger("FileUploaded", u, { response: q.responseText, status: W }) } else { B() } } } }; if (s.settings.multipart && n.multipart) { L.name = u.target_name || u.name; q.open("post", E, true); j.each(s.settings.headers, function (X, W) { q.setRequestHeader(W, X) }); if (typeof (V) !== "string" && !!h.FormData) { O = new FormData(); j.each(j.extend(L, s.settings.multipart_params), function (X, W) { O.append(W, X) }); O.append(s.settings.file_data_name, V); q.send(O); return } if (typeof (V) === "string") { q.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + N); j.each(j.extend(L, s.settings.multipart_params), function (X, W) { R += P + N + U + 'Content-Disposition: form-data; name="' + W + '"' + U + U; R += unescape(encodeURIComponent(X)) + U }); F = j.mimeTypes[u.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream"; R += P + N + U + 'Content-Disposition: form-data; name="' + s.settings.file_data_name + '"; filename="' + unescape(encodeURIComponent(u.name)) + '"' + U + "Content-Type: " + F + U + U + V + U + P + N + P + U; T = R.length - V.length; V = R; if (q.sendAsBinary) { q.sendAsBinary(V) } else { if (n.canSendBinary) { var S = new Uint8Array(V.length); for (var Q = 0; Q < V.length; Q++) { S[Q] = (V.charCodeAt(Q) & 255) } q.send(S.buffer) } } return } } E = j.buildUrl(s.settings.url, j.extend(L, s.settings.multipart_params)); q.open("post", E, true); q.setRequestHeader("Content-Type", "application/octet-stream"); j.each(s.settings.headers, function (X, W) { q.setRequestHeader(W, X) }); q.send(V) } if (u.status == j.DONE || u.status == j.FAILED || s.state == j.STOPPED) { return } L = { name: u.target_name || u.name }; if (v.chunk_size && u.size > v.chunk_size && (n.chunks || typeof (A) == "string")) { H = v.chunk_size; K = Math.ceil(u.size / H); J = Math.min(H, u.size - (D * H)); if (typeof (A) == "string") { I = A.substring(D * H, D * H + J) } else { I = x(A, D * H, D * H + J) } L.chunk = D; L.chunks = K } else { J = u.size; I = A } if (s.settings.multipart && n.multipart && typeof (I) !== "string" && z && n.cantSendBlobInFormData && n.chunks && s.settings.chunk_size) { z.onload = function () { G(z.result) }; z.readAsBinaryString(I) } else { G(I) } } B() } y = c[u.id]; if (n.jpgresize && s.settings.resize && /\.(png|jpg|jpeg)$/i.test(u.name)) { d.call(s, u, s.settings.resize, /\.png$/i.test(u.name) ? "image/png" : "image/jpeg", function (z) { if (z.success) { u.size = z.data.length; w(z.data) } else { if (n.chunks) { w(y) } else { l(y, w) } } }) } else { if (!n.chunks && n.jpgresize) { l(y, w) } else { w(y) } } }); p.bind("Destroy", function (s) { var u, v, t = k.body, w = { inputContainer: s.id + "_html5_container", inputFile: s.id + "_html5", browseButton: s.settings.browse_button, dropElm: s.settings.drop_element }; for (u in w) { v = k.getElementById(w[u]); if (v) { j.removeAllEvents(v, s.id) } } j.removeAllEvents(k.body, s.id); if (s.settings.container) { t = k.getElementById(s.settings.container) } t.removeChild(k.getElementById(w.inputContainer)) }); r({ success: true }) } }); function b() { var q = false, o; function r(t, v) { var s = q ? 0 : -8 * (v - 1), w = 0, u; for (u = 0; u < v; u++) { w |= (o.charCodeAt(t + u) << Math.abs(s + u * 8)) } return w } function n(u, s, t) { var t = arguments.length === 3 ? t : o.length - s - 1; o = o.substr(0, s) + u + o.substr(t + s) } function p(t, u, w) { var x = "", s = q ? 0 : -8 * (w - 1), v; for (v = 0; v < w; v++) { x += String.fromCharCode((u >> Math.abs(s + v * 8)) & 255) } n(x, t, w) } return { II: function (s) { if (s === e) { return q } else { q = s } }, init: function (s) { q = false; o = s }, SEGMENT: function (s, u, t) { switch (arguments.length) { case 1: return o.substr(s, o.length - s - 1); case 2: return o.substr(s, u); case 3: n(t, s, u); break; default: return o } }, BYTE: function (s) { return r(s, 1) }, SHORT: function (s) { return r(s, 2) }, LONG: function (s, t) { if (t === e) { return r(s, 4) } else { p(s, t, 4) } }, SLONG: function (s) { var t = r(s, 4); return (t > 2147483647 ? t - 4294967296 : t) }, STRING: function (s, t) { var u = ""; for (t += s; s < t; s++) { u += String.fromCharCode(r(s, 1)) } return u } } } function f(s) { var u = { 65505: { app: "EXIF", name: "APP1", signature: "Exif\0" }, 65506: { app: "ICC", name: "APP2", signature: "ICC_PROFILE\0" }, 65517: { app: "IPTC", name: "APP13", signature: "Photoshop 3.0\0" } }, t = [], r, n, p = e, q = 0, o; r = new b(); r.init(s); if (r.SHORT(0) !== 65496) { return } n = 2; o = Math.min(1048576, s.length); while (n <= o) { p = r.SHORT(n); if (p >= 65488 && p <= 65495) { n += 2; continue } if (p === 65498 || p === 65497) { break } q = r.SHORT(n + 2) + 2; if (u[p] && r.STRING(n + 4, u[p].signature.length) === u[p].signature) { t.push({ hex: p, app: u[p].app.toUpperCase(), name: u[p].name.toUpperCase(), start: n, length: q, segment: r.SEGMENT(n, q) }) } n += q } r.init(null); return { headers: t, restore: function (y) { r.init(y); var w = new f(y); if (!w.headers) { return false } for (var x = w.headers.length; x > 0; x--) { var z = w.headers[x - 1]; r.SEGMENT(z.start, z.length, "") } w.purge(); n = r.SHORT(2) == 65504 ? 4 + r.SHORT(4) : 2; for (var x = 0, v = t.length; x < v; x++) { r.SEGMENT(n, 0, t[x].segment); n += t[x].length } return r.SEGMENT() }, get: function (x) { var y = []; for (var w = 0, v = t.length; w < v; w++) { if (t[w].app === x.toUpperCase()) { y.push(t[w].segment) } } return y }, set: function (y, x) { var z = []; if (typeof (x) === "string") { z.push(x) } else { z = x } for (var w = ii = 0, v = t.length; w < v; w++) { if (t[w].app === y.toUpperCase()) { t[w].segment = z[ii]; t[w].length = z[ii].length; ii++ } if (ii >= z.length) { break } } }, purge: function () { t = []; r.init(null) } } } function a() { var q, n, o = {}, t; q = new b(); n = { tiff: { 274: "Orientation", 34665: "ExifIFDPointer", 34853: "GPSInfoIFDPointer" }, exif: { 36864: "ExifVersion", 40961: "ColorSpace", 40962: "PixelXDimension", 40963: "PixelYDimension", 36867: "DateTimeOriginal", 33434: "ExposureTime", 33437: "FNumber", 34855: "ISOSpeedRatings", 37377: "ShutterSpeedValue", 37378: "ApertureValue", 37383: "MeteringMode", 37384: "LightSource", 37385: "Flash", 41986: "ExposureMode", 41987: "WhiteBalance", 41990: "SceneCaptureType", 41988: "DigitalZoomRatio", 41992: "Contrast", 41993: "Saturation", 41994: "Sharpness" }, gps: { 0: "GPSVersionID", 1: "GPSLatitudeRef", 2: "GPSLatitude", 3: "GPSLongitudeRef", 4: "GPSLongitude" } }; t = { ColorSpace: { 1: "sRGB", 0: "Uncalibrated" }, MeteringMode: { 0: "Unknown", 1: "Average", 2: "CenterWeightedAverage", 3: "Spot", 4: "MultiSpot", 5: "Pattern", 6: "Partial", 255: "Other" }, LightSource: { 1: "Daylight", 2: "Fliorescent", 3: "Tungsten", 4: "Flash", 9: "Fine weather", 10: "Cloudy weather", 11: "Shade", 12: "Daylight fluorescent (D 5700 - 7100K)", 13: "Day white fluorescent (N 4600 -5400K)", 14: "Cool white fluorescent (W 3900 - 4500K)", 15: "White fluorescent (WW 3200 - 3700K)", 17: "Standard light A", 18: "Standard light B", 19: "Standard light C", 20: "D55", 21: "D65", 22: "D75", 23: "D50", 24: "ISO studio tungsten", 255: "Other" }, Flash: { 0: "Flash did not fire.", 1: "Flash fired.", 5: "Strobe return light not detected.", 7: "Strobe return light detected.", 9: "Flash fired, compulsory flash mode", 13: "Flash fired, compulsory flash mode, return light not detected", 15: "Flash fired, compulsory flash mode, return light detected", 16: "Flash did not fire, compulsory flash mode", 24: "Flash did not fire, auto mode", 25: "Flash fired, auto mode", 29: "Flash fired, auto mode, return light not detected", 31: "Flash fired, auto mode, return light detected", 32: "No flash function", 65: "Flash fired, red-eye reduction mode", 69: "Flash fired, red-eye reduction mode, return light not detected", 71: "Flash fired, red-eye reduction mode, return light detected", 73: "Flash fired, compulsory flash mode, red-eye reduction mode", 77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected", 79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected", 89: "Flash fired, auto mode, red-eye reduction mode", 93: "Flash fired, auto mode, return light not detected, red-eye reduction mode", 95: "Flash fired, auto mode, return light detected, red-eye reduction mode" }, ExposureMode: { 0: "Auto exposure", 1: "Manual exposure", 2: "Auto bracket" }, WhiteBalance: { 0: "Auto white balance", 1: "Manual white balance" }, SceneCaptureType: { 0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night scene" }, Contrast: { 0: "Normal", 1: "Soft", 2: "Hard" }, Saturation: { 0: "Normal", 1: "Low saturation", 2: "High saturation" }, Sharpness: { 0: "Normal", 1: "Soft", 2: "Hard" }, GPSLatitudeRef: { N: "North latitude", S: "South latitude" }, GPSLongitudeRef: { E: "East longitude", W: "West longitude" } }; function p(u, C) { var w = q.SHORT(u), z, F, G, B, A, v, x, D, E = [], y = {}; for (z = 0; z < w; z++) { x = v = u + 12 * z + 2; G = C[q.SHORT(x)]; if (G === e) { continue } B = q.SHORT(x += 2); A = q.LONG(x += 2); x += 4; E = []; switch (B) { case 1: case 7: if (A > 4) { x = q.LONG(x) + o.tiffHeader } for (F = 0; F < A; F++) { E[F] = q.BYTE(x + F) } break; case 2: if (A > 4) { x = q.LONG(x) + o.tiffHeader } y[G] = q.STRING(x, A - 1); continue; case 3: if (A > 2) { x = q.LONG(x) + o.tiffHeader } for (F = 0; F < A; F++) { E[F] = q.SHORT(x + F * 2) } break; case 4: if (A > 1) { x = q.LONG(x) + o.tiffHeader } for (F = 0; F < A; F++) { E[F] = q.LONG(x + F * 4) } break; case 5: x = q.LONG(x) + o.tiffHeader; for (F = 0; F < A; F++) { E[F] = q.LONG(x + F * 4) / q.LONG(x + F * 4 + 4) } break; case 9: x = q.LONG(x) + o.tiffHeader; for (F = 0; F < A; F++) { E[F] = q.SLONG(x + F * 4) } break; case 10: x = q.LONG(x) + o.tiffHeader; for (F = 0; F < A; F++) { E[F] = q.SLONG(x + F * 4) / q.SLONG(x + F * 4 + 4) } break; default: continue } D = (A == 1 ? E[0] : E); if (t.hasOwnProperty(G) && typeof D != "object") { y[G] = t[G][D] } else { y[G] = D } } return y } function s() { var v = e, u = o.tiffHeader; q.II(q.SHORT(u) == 18761); if (q.SHORT(u += 2) !== 42) { return false } o.IFD0 = o.tiffHeader + q.LONG(u += 2); v = p(o.IFD0, n.tiff); o.exifIFD = ("ExifIFDPointer" in v ? o.tiffHeader + v.ExifIFDPointer : e); o.gpsIFD = ("GPSInfoIFDPointer" in v ? o.tiffHeader + v.GPSInfoIFDPointer : e); return true } function r(w, u, z) { var B, y, x, A = 0; if (typeof (u) === "string") { var v = n[w.toLowerCase()]; for (hex in v) { if (v[hex] === u) { u = hex; break } } } B = o[w.toLowerCase() + "IFD"]; y = q.SHORT(B); for (i = 0; i < y; i++) { x = B + 12 * i + 2; if (q.SHORT(x) == u) { A = x + 8; break } } if (!A) { return false } q.LONG(A, z); return true } return { init: function (u) { o = { tiffHeader: 10 }; if (u === e || !u.length) { return false } q.init(u); if (q.SHORT(0) === 65505 && q.STRING(4, 5).toUpperCase() === "EXIF\0") { return s() } return false }, EXIF: function () { var v; v = p(o.exifIFD, n.exif); if (v.ExifVersion && j.typeOf(v.ExifVersion) === "array") { for (var w = 0, u = ""; w < v.ExifVersion.length; w++) { u += String.fromCharCode(v.ExifVersion[w]) } v.ExifVersion = u } return v }, GPS: function () { var u; u = p(o.gpsIFD, n.gps); if (u.GPSVersionID) { u.GPSVersionID = u.GPSVersionID.join(".") } return u }, setExif: function (u, v) { if (u !== "PixelXDimension" && u !== "PixelYDimension") { return false } return r("exif", u, v) }, getBinary: function () { return q.SEGMENT() } } } })(window, document, plupload);
});
define("product/guoqude/1.0.0/front_net/module/plupload/amd/plupload.html4-debug", [], function (require, exports) {
    (function (d, a, b, c) { function e(f) { return a.getElementById(f) } b.runtimes.Html4 = b.addRuntime("html4", { getFeatures: function () { return { multipart: true, triggerDialog: (b.ua.gecko && d.FormData || b.ua.webkit) } }, init: function (f, g) { f.bind("Init", function (p) { var j = a.body, n, h = "javascript", k, x, q, z = [], r = /MSIE/.test(navigator.userAgent), t = [], m = p.settings.filters, o, l, s, w; no_type_restriction: for (o = 0; o < m.length; o++) { l = m[o].extensions.split(/,/); for (w = 0; w < l.length; w++) { if (l[w] === "*") { t = []; break no_type_restriction } s = b.mimeTypes[l[w]]; if (s && b.inArray(s, t) === -1) { t.push(s) } } } t = t.join(","); function v() { var B, y, i, A; q = b.guid(); z.push(q); B = a.createElement("form"); B.setAttribute("id", "form_" + q); B.setAttribute("method", "post"); B.setAttribute("enctype", "multipart/form-data"); B.setAttribute("encoding", "multipart/form-data"); B.setAttribute("target", p.id + "_iframe"); B.style.position = "absolute"; y = a.createElement("input"); y.setAttribute("id", "input_" + q); y.setAttribute("type", "file"); y.setAttribute("accept", t); y.setAttribute("size", 1); A = e(p.settings.browse_button); if (p.features.triggerDialog && A) { b.addEvent(e(p.settings.browse_button), "click", function (C) { if (!y.disabled) { y.click() } C.preventDefault() }, p.id) } b.extend(y.style, { width: "100%", height: "100%", opacity: 0, fontSize: "99px", cursor: "pointer" }); b.extend(B.style, { overflow: "hidden" }); i = p.settings.shim_bgcolor; if (i) { B.style.background = i } if (r) { b.extend(y.style, { filter: "alpha(opacity=0)" }) } b.addEvent(y, "change", function (F) { var D = F.target, C, E = [], G; if (D.value) { e("form_" + q).style.top = -1048575 + "px"; C = D.value.replace(/\\/g, "/"); C = C.substring(C.length, C.lastIndexOf("/") + 1); E.push(new b.File(q, C)); if (!p.features.triggerDialog) { b.removeAllEvents(B, p.id) } else { b.removeEvent(A, "click", p.id) } b.removeEvent(y, "change", p.id); v(); if (E.length) { f.trigger("FilesAdded", E) } } }, p.id); B.appendChild(y); j.appendChild(B); p.refresh() } function u() { var i = a.createElement("div"); i.innerHTML = '<iframe id="' + p.id + '_iframe" name="' + p.id + '_iframe" src="' + h + ':&quot;&quot;" style="display:none"></iframe>'; n = i.firstChild; j.appendChild(n); b.addEvent(n, "load", function (C) { var D = C.target, B, y; if (!k) { return } try { B = D.contentWindow.document || D.contentDocument || d.frames[D.id].document } catch (A) { p.trigger("Error", { code: b.SECURITY_ERROR, message: b.translate("Security error."), file: k }); return } y = B.body.innerHTML; if (y) { k.status = b.DONE; k.loaded = 1025; k.percent = 100; p.trigger("UploadProgress", k); p.trigger("FileUploaded", k, { response: y }) } }, p.id) } if (p.settings.container) { j = e(p.settings.container); if (b.getStyle(j, "position") === "static") { j.style.position = "relative" } } p.bind("UploadFile", function (i, A) { var B, y; if (A.status == b.DONE || A.status == b.FAILED || i.state == b.STOPPED) { return } B = e("form_" + A.id); y = e("input_" + A.id); y.setAttribute("name", i.settings.file_data_name); B.setAttribute("action", i.settings.url); b.each(b.extend({ name: A.target_name || A.name }, i.settings.multipart_params), function (E, C) { var D = a.createElement("input"); b.extend(D, { type: "hidden", name: C, value: E }); B.insertBefore(D, B.firstChild) }); k = A; e("form_" + q).style.top = -1048575 + "px"; B.submit() }); p.bind("FileUploaded", function (i) { i.refresh() }); p.bind("StateChanged", function (i) { if (i.state == b.STARTED) { u() } else { if (i.state == b.STOPPED) { d.setTimeout(function () { b.removeEvent(n, "load", i.id); if (n.parentNode) { n.parentNode.removeChild(n) } }, 0) } } b.each(i.files, function (A, y) { if (A.status === b.DONE || A.status === b.FAILED) { var B = e("form_" + A.id); if (B) { B.parentNode.removeChild(B) } } }) }); p.bind("Refresh", function (y) { var F, A, B, C, i, G, H, E, D; F = e(y.settings.browse_button); if (F) { i = b.getPos(F, e(y.settings.container)); G = b.getSize(F); H = e("form_" + q); E = e("input_" + q); b.extend(H.style, { top: i.y + "px", left: i.x + "px", width: G.w + "px", height: G.h + "px" }); if (y.features.triggerDialog) { if (b.getStyle(F, "position") === "static") { b.extend(F.style, { position: "relative" }) } D = parseInt(F.style.zIndex, 10); if (isNaN(D)) { D = 0 } b.extend(F.style, { zIndex: D }); b.extend(H.style, { zIndex: D - 1 }) } B = y.settings.browse_button_hover; C = y.settings.browse_button_active; A = y.features.triggerDialog ? F : H; if (B) { b.addEvent(A, "mouseover", function () { b.addClass(F, B) }, y.id); b.addEvent(A, "mouseout", function () { b.removeClass(F, B) }, y.id) } if (C) { b.addEvent(A, "mousedown", function () { b.addClass(F, C) }, y.id); b.addEvent(a.body, "mouseup", function () { b.removeClass(F, C) }, y.id) } } }); f.bind("FilesRemoved", function (y, B) { var A, C; for (A = 0; A < B.length; A++) { C = e("form_" + B[A].id); if (C) { C.parentNode.removeChild(C) } } }); f.bind("DisableBrowse", function (i, A) { var y = a.getElementById("input_" + q); if (y) { y.disabled = A } }); f.bind("Destroy", function (i) { var y, A, B, C = { inputContainer: "form_" + q, inputFile: "input_" + q, browseButton: i.settings.browse_button }; for (y in C) { A = e(C[y]); if (A) { b.removeAllEvents(A, i.id) } } b.removeAllEvents(a.body, i.id); b.each(z, function (E, D) { B = e("form_" + E); if (B) { j.removeChild(B) } }) }); v() }); g({ success: true }) } }) })(window, document, plupload);
});
define("product/guoqude/1.0.0/front_net/module/plupload/amd/plupload.flash-debug", [], function (require, exports) {
    (function (f, b, d, e) { var a = {}, g = {}; function c() { var h; try { h = navigator.plugins["Shockwave Flash"]; h = h.description } catch (j) { try { h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version") } catch (i) { h = "0.0" } } h = h.match(/\d+/g); return parseFloat(h[0] + "." + h[1]) } d.flash = { trigger: function (j, h, i) { setTimeout(function () { var m = a[j], l, k; if (m) { m.trigger("Flash:" + h, i) } }, 0) } }; d.runtimes.Flash = d.addRuntime("flash", { getFeatures: function () { return { jpgresize: true, pngresize: true, maxWidth: 8091, maxHeight: 8091, chunks: true, progress: true, multipart: true, multi_selection: true } }, init: function (m, o) { var k, l, h = 0, i = b.body; if (c() < 10) { o({ success: false }); return } g[m.id] = false; a[m.id] = m; k = b.getElementById(m.settings.browse_button); l = b.createElement("div"); l.id = m.id + "_flash_container"; d.extend(l.style, { position: "absolute", top: "0px", background: m.settings.shim_bgcolor || "transparent", zIndex: 99999, width: "100%", height: "100%" }); l.className = "plupload flash"; if (m.settings.container) { i = b.getElementById(m.settings.container); if (d.getStyle(i, "position") === "static") { i.style.position = "relative" } } i.appendChild(l); (function () { var p, q; p = '<object id="' + m.id + '_flash" type="application/x-shockwave-flash" data="' + m.settings.flash_swf_url + '" '; if (d.ua.ie) { p += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ' } p += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + m.settings.flash_swf_url + '" /><param name="flashvars" value="id=' + escape(m.id) + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>'; if (d.ua.ie) { q = b.createElement("div"); l.appendChild(q); q.outerHTML = p; q = null } else { l.innerHTML = p } }()); function n() { return b.getElementById(m.id + "_flash") } function j() { if (h++ > 5000) { o({ success: false }); return } if (g[m.id] === false) { setTimeout(j, 1) } } j(); k = l = null; m.bind("Destroy", function (p) { var q; d.removeAllEvents(b.body, p.id); delete g[p.id]; delete a[p.id]; q = b.getElementById(p.id + "_flash_container"); if (q) { i.removeChild(q) } }); m.bind("Flash:Init", function () { var r = {}, q; try { n().setFileFilters(m.settings.filters, m.settings.multi_selection) } catch (p) { o({ success: false }); return } if (g[m.id]) { return } g[m.id] = true; m.bind("UploadFile", function (s, u) { var v = s.settings, t = m.settings.resize || {}; n().uploadFile(r[u.id], v.url, { name: u.target_name || u.name, mime: d.mimeTypes[u.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream", chunk_size: v.chunk_size, width: t.width, height: t.height, quality: t.quality, multipart: v.multipart, multipart_params: v.multipart_params || {}, file_data_name: v.file_data_name, format: /\.(jpg|jpeg)$/i.test(u.name) ? "jpg" : "png", headers: v.headers, urlstream_upload: v.urlstream_upload }) }); m.bind("CancelUpload", function () { n().cancelUpload() }); m.bind("Flash:UploadProcess", function (t, s) { var u = t.getFile(r[s.id]); if (u.status != d.FAILED) { u.loaded = s.loaded; u.size = s.size; t.trigger("UploadProgress", u) } }); m.bind("Flash:UploadChunkComplete", function (s, u) { var v, t = s.getFile(r[u.id]); v = { chunk: u.chunk, chunks: u.chunks, response: u.text }; s.trigger("ChunkUploaded", t, v); if (t.status !== d.FAILED && s.state !== d.STOPPED) { n().uploadNextChunk() } if (u.chunk == u.chunks - 1) { t.status = d.DONE; s.trigger("FileUploaded", t, { response: u.text }) } }); m.bind("Flash:SelectFiles", function (s, v) { var u, t, w = [], x; for (t = 0; t < v.length; t++) { u = v[t]; x = d.guid(); r[x] = u.id; r[u.id] = x; w.push(new d.File(x, u.name, u.size)) } if (w.length) { m.trigger("FilesAdded", w) } }); m.bind("Flash:SecurityError", function (s, t) { m.trigger("Error", { code: d.SECURITY_ERROR, message: d.translate("Security error."), details: t.message, file: m.getFile(r[t.id]) }) }); m.bind("Flash:GenericError", function (s, t) { m.trigger("Error", { code: d.GENERIC_ERROR, message: d.translate("Generic error."), details: t.message, file: m.getFile(r[t.id]) }) }); m.bind("Flash:IOError", function (s, t) { m.trigger("Error", { code: d.IO_ERROR, message: d.translate("IO error."), details: t.message, file: m.getFile(r[t.id]) }) }); m.bind("Flash:ImageError", function (s, t) { m.trigger("Error", { code: parseInt(t.code, 10), message: d.translate("Image error."), file: m.getFile(r[t.id]) }) }); m.bind("Flash:StageEvent:rollOver", function (s) { var t, u; t = b.getElementById(m.settings.browse_button); u = s.settings.browse_button_hover; if (t && u) { d.addClass(t, u) } }); m.bind("Flash:StageEvent:rollOut", function (s) { var t, u; t = b.getElementById(m.settings.browse_button); u = s.settings.browse_button_hover; if (t && u) { d.removeClass(t, u) } }); m.bind("Flash:StageEvent:mouseDown", function (s) { var t, u; t = b.getElementById(m.settings.browse_button); u = s.settings.browse_button_active; if (t && u) { d.addClass(t, u); d.addEvent(b.body, "mouseup", function () { d.removeClass(t, u) }, s.id) } }); m.bind("Flash:StageEvent:mouseUp", function (s) { var t, u; t = b.getElementById(m.settings.browse_button); u = s.settings.browse_button_active; if (t && u) { d.removeClass(t, u) } }); m.bind("Flash:ExifData", function (s, t) { m.trigger("ExifData", m.getFile(r[t.id]), t.data) }); m.bind("Flash:GpsData", function (s, t) { m.trigger("GpsData", m.getFile(r[t.id]), t.data) }); m.bind("QueueChanged", function (s) { m.refresh() }); m.bind("FilesRemoved", function (s, u) { var t; for (t = 0; t < u.length; t++) { n().removeFile(r[u[t].id]) } }); m.bind("StateChanged", function (s) { m.refresh() }); m.bind("Refresh", function (s) { var t, u, v; n().setFileFilters(m.settings.filters, m.settings.multi_selection); t = b.getElementById(s.settings.browse_button); if (t) { u = d.getPos(t, b.getElementById(s.settings.container)); v = d.getSize(t); d.extend(b.getElementById(s.id + "_flash_container").style, { top: u.y + "px", left: u.x + "px", width: v.w + "px", height: v.h + "px" }) } }); m.bind("DisableBrowse", function (s, t) { n().disableBrowse(t) }); o({ success: true }) }) } }) })(window, document, plupload);
});
define("product/guoqude/1.0.0/front_net/module/plupload/amd/plupload.cn-debug", [], function (require, exports) {
    // Chinese
    plupload.addI18n({
        'Select files': '选择文件',
        'Add files to the upload queue and click the start button.': '增加文件至队列并开始上传',
        'Filename': '文件名',
        'Status': '状态',
        'Size': '文件大小',
        'Add Files': '增加文件',
        'Stop Upload': '停止上传',
        'Stop upload': '停止上传',
        'Start Upload': '开始上传',
        'Start upload': '开始上传',
        'Add files': '添加文件',
        'Add files.': '添加文件',
        'Stop current upload': '停止当前的上传',
        'Start uploading queue': '开始上传队列',
        'Uploaded %d/%d files': '上传文件 %d/%d',
        'N/A': '无',
        'Drag files here.': '拖拽文件至此',
        'File extension error.': '文件出现异常',
        'File size error.': '文件尺寸错误',
        'File count error.': '文件数量错误',
        'Init error.': '初始化失败',
        'HTTP Error.': 'HTTP 错误',
        'Security error.': '安全错误',
        'Generic error.': '普通错误',
        'IO error.': 'IO 错误',
        'File: %s': '文件: %s',
        'Close': '关闭',
        '%d files queued': '%d 文件队列',
        'Using runtime: ': '正在执行: ',
        'File: %f, size: %s, max file size: %m': '文件: %f, 大小: %s, 最大允许大小: %m',
        'Upload element accepts only %d file(s) at a time. Extra files were stripped.': '仅允许上传文件 %d 。其余文件被排除',
        'Upload URL might be wrong or doesn\'t exist': '上传地址错误或不存在',
        'Error: File too large: ': '错误: 文件过大: ',
        'Error: Invalid file extension: ': '错误: 不被允许的文件类型: '
    });
});
define("product/guoqude/1.0.0/front_net/module/plupload/amd/jquery.plupload.queue-debug", [], function (require, exports) {
    return function (jQuery) {
        (function (c) { var d = {}; function a(e) { return plupload.translate(e) || e } function b(f, e) { e.contents().each(function (g, h) { h = c(h); if (!h.is(".plupload")) { h.remove() } }); e.prepend('<div class="plupload_wrapper plupload_scroll"><div id="' + f + '_container" class="plupload_container"><div class="plupload"><div class="plupload_header"><div class="plupload_header_content"><div class="plupload_header_title">' + a("Select files") + '</div><div class="plupload_header_text">' + a("Add files to the upload queue and click the start button.") + '</div></div></div><div class="plupload_content"><div class="plupload_filelist_header"><div class="plupload_file_name">' + a("Filename") + '</div><div class="plupload_file_action">&nbsp;</div><div class="plupload_file_status"><span>' + a("Status") + '</span></div><div class="plupload_file_size">' + a("Size") + '</div><div class="plupload_clearer">&nbsp;</div></div><ul id="' + f + '_filelist" class="plupload_filelist"></ul><div class="plupload_filelist_footer"><div class="plupload_file_name"><div class="plupload_buttons"><a href="#" class="plupload_button plupload_add">' + a("Add files") + '</a><a href="#" class="plupload_button plupload_start">' + a("Start upload") + '</a></div><span class="plupload_upload_status"></span></div><div class="plupload_file_action"></div><div class="plupload_file_status"><span class="plupload_total_status">0%</span></div><div class="plupload_file_size"><span class="plupload_total_file_size">0 b</span></div><div class="plupload_progress"><div class="plupload_progress_container"><div class="plupload_progress_bar"></div></div></div><div class="plupload_clearer">&nbsp;</div></div></div></div></div><input type="hidden" id="' + f + '_count" name="' + f + '_count" value="0" /></div>') } c.fn.pluploadQueue = function (e) { if (e) { this.each(function () { var j, i, k; i = c(this); k = i.attr("id"); if (!k) { k = plupload.guid(); i.attr("id", k) } j = new plupload.Uploader(c.extend({ dragdrop: true, container: k }, e)); d[k] = j; function h(l) { var n; if (l.status == plupload.DONE) { n = "plupload_done" } if (l.status == plupload.FAILED) { n = "plupload_failed" } if (l.status == plupload.QUEUED) { n = "plupload_delete" } if (l.status == plupload.UPLOADING) { n = "plupload_uploading" } var m = c("#" + l.id).attr("class", n).find("a").css("display", "block"); if (l.hint) { m.attr("title", l.hint) } } function f() { c("span.plupload_total_status", i).html(j.total.percent + "%"); c("div.plupload_progress_bar", i).css("width", j.total.percent + "%"); c("span.plupload_upload_status", i).text(a("Uploaded %d/%d files").replace(/%d\/%d/, j.total.uploaded + "/" + j.files.length)) } function g() { var m = c("ul.plupload_filelist", i).html(""), n = 0, l; c.each(j.files, function (p, o) { l = ""; if (o.status == plupload.DONE) { if (o.target_name) { l += '<input type="hidden" name="' + k + "_" + n + '_tmpname" value="' + plupload.xmlEncode(o.target_name) + '" />' } l += '<input type="hidden" name="' + k + "_" + n + '_name" value="' + plupload.xmlEncode(o.name) + '" />'; l += '<input type="hidden" name="' + k + "_" + n + '_status" value="' + (o.status == plupload.DONE ? "done" : "failed") + '" />'; n++; c("#" + k + "_count").val(n) } m.append('<li id="' + o.id + '"><div class="plupload_file_name"><span>' + o.name + '</span></div><div class="plupload_file_action"><a href="#"></a></div><div class="plupload_file_status">' + o.percent + '%</div><div class="plupload_file_size">' + plupload.formatSize(o.size) + '</div><div class="plupload_clearer">&nbsp;</div>' + l + "</li>"); h(o); c("#" + o.id + ".plupload_delete a").click(function (q) { c("#" + o.id).remove(); j.removeFile(o); q.preventDefault() }) }); c("span.plupload_total_file_size", i).html(plupload.formatSize(j.total.size)); if (j.total.queued === 0) { c("span.plupload_add_text", i).text(a("Add files.")) } else { c("span.plupload_add_text", i).text(j.total.queued + " files queued.") } c("a.plupload_start", i).toggleClass("plupload_disabled", j.files.length == (j.total.uploaded + j.total.failed)); m[0].scrollTop = m[0].scrollHeight; f(); if (!j.files.length && j.features.dragdrop && j.settings.dragdrop) { c("#" + k + "_filelist").append('<li class="plupload_droptext">' + a("Drag files here.") + "</li>") } } j.bind("UploadFile", function (l, m) { c("#" + m.id).addClass("plupload_current_file") }); j.bind("Init", function (l, m) { b(k, i); if (!e.unique_names && e.rename) { c("#" + k + "_filelist div.plupload_file_name span", i).live("click", function (s) { var q = c(s.target), o, r, n, p = ""; o = l.getFile(q.parents("li")[0].id); n = o.name; r = /^(.+)(\.[^.]+)$/.exec(n); if (r) { n = r[1]; p = r[2] } q.hide().after('<input type="text" />'); q.next().val(n).focus().blur(function () { q.show().next().remove() }).keydown(function (u) { var t = c(this); if (u.keyCode == 13) { u.preventDefault(); o.name = t.val() + p; q.text(o.name); t.blur() } }) }) } c("a.plupload_add", i).attr("id", k + "_browse"); l.settings.browse_button = k + "_browse"; if (l.features.dragdrop && l.settings.dragdrop) { l.settings.drop_element = k + "_filelist"; c("#" + k + "_filelist").append('<li class="plupload_droptext">' + a("Drag files here.") + "</li>") } c("#" + k + "_container").attr("title", "Using runtime: " + m.runtime); c("a.plupload_start", i).click(function (n) { if (!c(this).hasClass("plupload_disabled")) { j.start() } n.preventDefault() }); c("a.plupload_stop", i).click(function (n) { n.preventDefault(); j.stop() }); c("a.plupload_start", i).addClass("plupload_disabled") }); j.init(); j.bind("Error", function (l, o) { var m = o.file, n; if (m) { n = o.message; if (o.details) { n += " (" + o.details + ")" } if (o.code == plupload.FILE_SIZE_ERROR) { alert(a("Error: File too large: ") + m.name) } if (o.code == plupload.FILE_EXTENSION_ERROR) { alert(a("Error: Invalid file extension: ") + m.name) } m.hint = n; c("#" + m.id).attr("class", "plupload_failed").find("a").css("display", "block").attr("title", n) } }); j.bind("StateChanged", function () { if (j.state === plupload.STARTED) { c("li.plupload_delete a,div.plupload_buttons", i).hide(); c("span.plupload_upload_status,div.plupload_progress,a.plupload_stop", i).css("display", "block"); c("span.plupload_upload_status", i).text("Uploaded " + j.total.uploaded + "/" + j.files.length + " files"); if (e.multiple_queues) { c("span.plupload_total_status,span.plupload_total_file_size", i).show() } } else { g(); c("a.plupload_stop,div.plupload_progress", i).hide(); c("a.plupload_delete", i).css("display", "block") } }); j.bind("QueueChanged", g); j.bind("FileUploaded", function (l, m) { h(m) }); j.bind("UploadProgress", function (l, m) { c("#" + m.id + " div.plupload_file_status", i).html(m.percent + "%"); h(m); f(); if (e.multiple_queues && j.total.uploaded + j.total.failed == j.files.length) { c(".plupload_buttons,.plupload_upload_status", i).css("display", "inline"); c(".plupload_start", i).addClass("plupload_disabled"); c("span.plupload_total_status,span.plupload_total_file_size", i).hide() } }); if (e.setup) { e.setup(j) } }); return this } else { return d[c(this[0]).attr("id")] } } })(jQuery);
    }
});
define('gallery/mustache/0.5.0/mustache-debug', [], function() {

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
var Mustache = (typeof module !== "undefined" && module.exports) || {};

(function (exports) {

  exports.name = "mustache.js";
  exports.version = "0.5.0-dev";
  exports.tags = ["{{", "}}"];
  exports.parse = parse;
  exports.compile = compile;
  exports.render = render;
  exports.clearCache = clearCache;

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  var _toString = Object.prototype.toString;
  var _isArray = Array.isArray;
  var _forEach = Array.prototype.forEach;
  var _trim = String.prototype.trim;

  var isArray;
  if (_isArray) {
    isArray = _isArray;
  } else {
    isArray = function (obj) {
      return _toString.call(obj) === "[object Array]";
    };
  }

  var forEach;
  if (_forEach) {
    forEach = function (obj, callback, scope) {
      return _forEach.call(obj, callback, scope);
    };
  } else {
    forEach = function (obj, callback, scope) {
      for (var i = 0, len = obj.length; i < len; ++i) {
        callback.call(scope, obj[i], i, obj);
      }
    };
  }

  var spaceRe = /^\s*$/;

  function isWhitespace(string) {
    return spaceRe.test(string);
  }

  var trim;
  if (_trim) {
    trim = function (string) {
      return string == null ? "" : _trim.call(string);
    };
  } else {
    var trimLeft, trimRight;

    if (isWhitespace("\xA0")) {
      trimLeft = /^\s+/;
      trimRight = /\s+$/;
    } else {
      // IE doesn't match non-breaking spaces with \s, thanks jQuery.
      trimLeft = /^[\s\xA0]+/;
      trimRight = /[\s\xA0]+$/;
    }

    trim = function (string) {
      return string == null ? "" :
        String(string).replace(trimLeft, "").replace(trimRight, "");
    };
  }

  var escapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;'
  };

  function escapeHTML(string) {
    return String(string).replace(/&(?!\w+;)|[<>"']/g, function (s) {
      return escapeMap[s] || s;
    });
  }

  /**
   * Adds the `template`, `line`, and `file` properties to the given error
   * object and alters the message to provide more useful debugging information.
   */
  function debug(e, template, line, file) {
    file = file || "<template>";

    var lines = template.split("\n"),
        start = Math.max(line - 3, 0),
        end = Math.min(lines.length, line + 3),
        context = lines.slice(start, end);

    var c;
    for (var i = 0, len = context.length; i < len; ++i) {
      c = i + start + 1;
      context[i] = (c === line ? " >> " : "    ") + context[i];
    }

    e.template = template;
    e.line = line;
    e.file = file;
    e.message = [file + ":" + line, context.join("\n"), "", e.message].join("\n");

    return e;
  }

  /**
   * Looks up the value of the given `name` in the given context `stack`.
   */
  function lookup(name, stack, defaultValue) {
    if (name === ".") {
      return stack[stack.length - 1];
    }

    var names = name.split(".");
    var lastIndex = names.length - 1;
    var target = names[lastIndex];

    var value, context, i = stack.length, j, localStack;
    while (i) {
      localStack = stack.slice(0);
      context = stack[--i];

      j = 0;
      while (j < lastIndex) {
        context = context[names[j++]];

        if (context == null) {
          break;
        }

        localStack.push(context);
      }

      if (context && typeof context === "object" && target in context) {
        value = context[target];
        break;
      }
    }

    // If the value is a function, call it in the current context.
    if (typeof value === "function") {
      value = value.call(localStack[localStack.length - 1]);
    }

    if (value == null)  {
      return defaultValue;
    }

    return value;
  }

  function renderSection(name, stack, callback, inverted) {
    var buffer = "";
    var value =  lookup(name, stack);

    if (inverted) {
      // From the spec: inverted sections may render text once based on the
      // inverse value of the key. That is, they will be rendered if the key
      // doesn't exist, is false, or is an empty list.
      if (value == null || value === false || (isArray(value) && value.length === 0)) {
        buffer += callback();
      }
    } else if (isArray(value)) {
      forEach(value, function (value) {
        stack.push(value);
        buffer += callback();
        stack.pop();
      });
    } else if (typeof value === "object") {
      stack.push(value);
      buffer += callback();
      stack.pop();
    } else if (typeof value === "function") {
      var scope = stack[stack.length - 1];
      var scopedRender = function (template) {
        return render(template, scope);
      };
      buffer += value.call(scope, callback(), scopedRender) || "";
    } else if (value) {
      buffer += callback();
    }

    return buffer;
  }

  /**
   * Parses the given `template` and returns the source of a function that,
   * with the proper arguments, will render the template. Recognized options
   * include the following:
   *
   *   - file     The name of the file the template comes from (displayed in
   *              error messages)
   *   - tags     An array of open and close tags the `template` uses. Defaults
   *              to the value of Mustache.tags
   *   - debug    Set `true` to log the body of the generated function to the
   *              console
   *   - space    Set `true` to preserve whitespace from lines that otherwise
   *              contain only a {{tag}}. Defaults to `false`
   */
  function parse(template, options) {
    options = options || {};

    var tags = options.tags || exports.tags,
        openTag = tags[0],
        closeTag = tags[tags.length - 1];

    var code = [
      'var buffer = "";', // output buffer
      "\nvar line = 1;", // keep track of source line number
      "\ntry {",
      '\nbuffer += "'
    ];

    var spaces = [],      // indices of whitespace in code on the current line
        hasTag = false,   // is there a {{tag}} on the current line?
        nonSpace = false; // is there a non-space char on the current line?

    // Strips all space characters from the code array for the current line
    // if there was a {{tag}} on it and otherwise only spaces.
    var stripSpace = function () {
      if (hasTag && !nonSpace && !options.space) {
        while (spaces.length) {
          code.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    };

    var sectionStack = [], updateLine, nextOpenTag, nextCloseTag;

    var setTags = function (source) {
      tags = trim(source).split(/\s+/);
      nextOpenTag = tags[0];
      nextCloseTag = tags[tags.length - 1];
    };

    var includePartial = function (source) {
      code.push(
        '";',
        updateLine,
        '\nvar partial = partials["' + trim(source) + '"];',
        '\nif (partial) {',
        '\n  buffer += render(partial,stack[stack.length - 1],partials);',
        '\n}',
        '\nbuffer += "'
      );
    };

    var openSection = function (source, inverted) {
      var name = trim(source);

      if (name === "") {
        throw debug(new Error("Section name may not be empty"), template, line, options.file);
      }

      sectionStack.push({name: name, inverted: inverted});

      code.push(
        '";',
        updateLine,
        '\nvar name = "' + name + '";',
        '\nvar callback = (function () {',
        '\n  return function () {',
        '\n    var buffer = "";',
        '\nbuffer += "'
      );
    };

    var openInvertedSection = function (source) {
      openSection(source, true);
    };

    var closeSection = function (source) {
      var name = trim(source);
      var openName = sectionStack.length != 0 && sectionStack[sectionStack.length - 1].name;

      if (!openName || name != openName) {
        throw debug(new Error('Section named "' + name + '" was never opened'), template, line, options.file);
      }

      var section = sectionStack.pop();

      code.push(
        '";',
        '\n    return buffer;',
        '\n  };',
        '\n})();'
      );

      if (section.inverted) {
        code.push("\nbuffer += renderSection(name,stack,callback,true);");
      } else {
        code.push("\nbuffer += renderSection(name,stack,callback);");
      }

      code.push('\nbuffer += "');
    };

    var sendPlain = function (source) {
      code.push(
        '";',
        updateLine,
        '\nbuffer += lookup("' + trim(source) + '",stack,"");',
        '\nbuffer += "'
      );
    };

    var sendEscaped = function (source) {
      code.push(
        '";',
        updateLine,
        '\nbuffer += escapeHTML(lookup("' + trim(source) + '",stack,""));',
        '\nbuffer += "'
      );
    };

    var line = 1, c, callback;
    for (var i = 0, len = template.length; i < len; ++i) {
      if (template.slice(i, i + openTag.length) === openTag) {
        i += openTag.length;
        c = template.substr(i, 1);
        updateLine = '\nline = ' + line + ';';
        nextOpenTag = openTag;
        nextCloseTag = closeTag;
        hasTag = true;

        switch (c) {
        case "!": // comment
          i++;
          callback = null;
          break;
        case "=": // change open/close tags, e.g. {{=<% %>=}}
          i++;
          closeTag = "=" + closeTag;
          callback = setTags;
          break;
        case ">": // include partial
          i++;
          callback = includePartial;
          break;
        case "#": // start section
          i++;
          callback = openSection;
          break;
        case "^": // start inverted section
          i++;
          callback = openInvertedSection;
          break;
        case "/": // end section
          i++;
          callback = closeSection;
          break;
        case "{": // plain variable
          closeTag = "}" + closeTag;
          // fall through
        case "&": // plain variable
          i++;
          nonSpace = true;
          callback = sendPlain;
          break;
        default: // escaped variable
          nonSpace = true;
          callback = sendEscaped;
        }

        var end = template.indexOf(closeTag, i);

        if (end === -1) {
          throw debug(new Error('Tag "' + openTag + '" was not closed properly'), template, line, options.file);
        }

        var source = template.substring(i, end);

        if (callback) {
          callback(source);
        }

        // Maintain line count for \n in source.
        var n = 0;
        while (~(n = source.indexOf("\n", n))) {
          line++;
          n++;
        }

        i = end + closeTag.length - 1;
        openTag = nextOpenTag;
        closeTag = nextCloseTag;
      } else {
        c = template.substr(i, 1);

        switch (c) {
        case '"':
        case "\\":
          nonSpace = true;
          code.push("\\" + c);
          break;
        case "\r":
          // Ignore carriage returns.
          break;
        case "\n":
          spaces.push(code.length);
          code.push("\\n");
          stripSpace(); // Check for whitespace on the current line.
          line++;
          break;
        default:
          if (isWhitespace(c)) {
            spaces.push(code.length);
          } else {
            nonSpace = true;
          }

          code.push(c);
        }
      }
    }

    if (sectionStack.length != 0) {
      throw debug(new Error('Section "' + sectionStack[sectionStack.length - 1].name + '" was not closed properly'), template, line, options.file);
    }

    // Clean up any whitespace from a closing {{tag}} that was at the end
    // of the template without a trailing \n.
    stripSpace();

    code.push(
      '";',
      "\nreturn buffer;",
      "\n} catch (e) { throw {error: e, line: line}; }"
    );

    // Ignore `buffer += "";` statements.
    var body = code.join("").replace(/buffer \+= "";\n/g, "");

    if (options.debug) {
      if (typeof console != "undefined" && console.log) {
        console.log(body);
      } else if (typeof print === "function") {
        print(body);
      }
    }

    return body;
  }

  /**
   * Used by `compile` to generate a reusable function for the given `template`.
   */
  function _compile(template, options) {
    var args = "view,partials,stack,lookup,escapeHTML,renderSection,render";
    var body = parse(template, options);
    var fn = new Function(args, body);

    // This anonymous function wraps the generated function so we can do
    // argument coercion, setup some variables, and handle any errors
    // encountered while executing it.
    return function (view, partials) {
      partials = partials || {};

      var stack = [view]; // context stack

      try {
        return fn(view, partials, stack, lookup, escapeHTML, renderSection, render);
      } catch (e) {
        throw debug(e.error, template, e.line, options.file);
      }
    };
  }

  // Cache of pre-compiled templates.
  var _cache = {};

  /**
   * Clear the cache of compiled templates.
   */
  function clearCache() {
    _cache = {};
  }

  /**
   * Compiles the given `template` into a reusable function using the given
   * `options`. In addition to the options accepted by Mustache.parse,
   * recognized options include the following:
   *
   *   - cache    Set `false` to bypass any pre-compiled version of the given
   *              template. Otherwise, a given `template` string will be cached
   *              the first time it is parsed
   */
  function compile(template, options) {
    options = options || {};

    // Use a pre-compiled version from the cache if we have one.
    if (options.cache !== false) {
      if (!_cache[template]) {
        _cache[template] = _compile(template, options);
      }

      return _cache[template];
    }

    return _compile(template, options);
  }

  /**
   * High-level function that renders the given `template` using the given
   * `view` and `partials`. If you need to use any of the template options (see
   * `compile` above), you must compile in a separate step, and then call that
   * compiled function.
   */
  function render(template, view, partials) {
    return compile(template)(view, partials);
  }

})(Mustache);

return Mustache;
});

define('gallery/json/1.0.2/json-debug', [], function() {
/*
    json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

return this.JSON = JSON;
});

// Generated by CoffeeScript 1.4.0

define("product/guoqude/1.0.0/main-debug", ["./front_net/module-zic/jsonhelp-debug", "./front_net/bootstrap/amd/bootstrap-dropdown-debug", "./front_net/bootstrap/amd/bootstrap-button-debug", "./front_net/bootstrap/amd/bootstrap-typeahead-zic-debug", "./front_net/bootstrap/amd/bootstrap-datepicker-debug", "./front_net/bootstrap/amd/bootstrap-alert-debug", "./front_net/module/jquery-ui/amd/jquery.ui.core-debug", "./front_net/module/jquery-ui/amd/jquery.ui.widget-debug", "./front_net/module/jquery-ui/amd/jquery.ui.mouse-debug", "./front_net/module/jquery-ui/amd/jquery.ui.sortable-debug", "./front_net/module/artDialog5/amd/artDialog5-debug", "./front_net/module/chosen/chosen-debug", "./front_net/module/masonry-debug", "./front_net/module/royalSlider/royalslider-debug", "./front_net/module/fineuploader/fineuploader-debug", "./front_net/module/validation-debug", "./front_net/module-zic/plus_anim-debug", "./front_net/module-zic/placeholder-debug", "./front_net/module-zic/returntop/returnTop-debug", "./front_net/module-zic/proto-debug", "./front_net/module-zic/area/area2-debug", "./front_net/module-zic/form_snippet-debug", "./front_net/module/plupload/amd/plupload-debug", "./front_net/module/plupload/amd/plupload.html5-debug", "./front_net/module/plupload/amd/plupload.html4-debug", "./front_net/module/plupload/amd/plupload.flash-debug", "./front_net/module/plupload/amd/plupload.cn-debug", "./front_net/module/plupload/amd/jquery.plupload.queue-debug", "gallery/mustache/0.5.0/mustache-debug", "gallery/json/1.0.2/json-debug", "gallery/underscore/1.4.2/underscore-debug", "gallery/jquery/1.8.3/jquery-debug"], function(require, exports, module) {
  var $, JSON, PlaceHolder, artDialog, chosen, fineUploader, masonry, mc, plusAnim, royalSlider, _;
  mc = exports.mc = require('gallery/mustache/0.5.0/mustache-debug');
  JSON = exports.JSON = require('gallery/json/1.0.2/json-debug');
  exports.jonHelp = require('./front_net/module-zic/jsonhelp-debug');
  _ = exports._ = require('gallery/underscore/1.4.2/underscore-debug');
  $ = exports.jq = require('gallery/jquery/1.8.3/jquery-debug');
  $.ajaxSetup({
    type: "POST",
    dataType: "json",
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    timeout: 5000
  });
  require('./front_net/bootstrap/amd/bootstrap-dropdown-debug')($);
  require('./front_net/bootstrap/amd/bootstrap-button-debug')($);
  require('./front_net/bootstrap/amd/bootstrap-typeahead-zic-debug')($);
  require('./front_net/bootstrap/amd/bootstrap-datepicker-debug')($);
  require('./front_net/bootstrap/amd/bootstrap-alert-debug')($);
  require('./front_net/module/jquery-ui/amd/jquery.ui.core')($);
  require('./front_net/module/jquery-ui/amd/jquery.ui.widget')($);
  require('./front_net/module/jquery-ui/amd/jquery.ui.mouse')($);
  require('./front_net/module/jquery-ui/amd/jquery.ui.sortable')($);
  artDialog = exports.artDialog = require('./front_net/module/artDialog5/amd/artDialog5-debug');
  chosen = exports.chosen = require('./front_net/module/chosen/chosen-debug');
  masonry = exports.masonry = require('./front_net/module/masonry-debug');
  royalSlider = exports.royalSlider = require('./front_net/module/royalSlider/royalslider-debug');
  fineUploader = exports.fineUploader = require('./front_net/module/fineuploader/fineuploader-debug');
  require('./front_net/module/validation-debug')($, _);
  plusAnim = require('./front_net/module-zic/plus_anim-debug');
  PlaceHolder = require('./front_net/module-zic/placeholder-debug');
  exports.ReturnTop = require('./front_net/module-zic/returntop/returnTop-debug');
  exports._prototype = require('./front_net/module-zic/proto-debug');
  exports.area = require('./front_net/module-zic/area/area2-debug');
  require('./front_net/module-zic/form_snippet-debug')($, _, JSON);
  require('./front_net/module/plupload/amd/plupload-debug');
  require('./front_net/module/plupload/amd/plupload.html5');
  require('./front_net/module/plupload/amd/plupload.html4');
  require('./front_net/module/plupload/amd/plupload.flash');
  require('./front_net/module/plupload/amd/plupload.cn');
  require('./front_net/module/plupload/amd/jquery.plupload.queue')($);
  exports.ld_logo = function() {
    return $("#logo").hover(function() {
      return $(this).animate({
        opacity: 0
      }, 350, "linear");
    }, function() {
      return $(this).animate({
        opacity: 1
      }, 350, "linear");
    });
  };
  exports.dialog_config = {
    fixed: true,
    lock: true,
    opacity: 0.1
  };
  exports.check_result = function(e, request) {
    $("#main-error,#main-alert").hide();
    if (e.error) {
      if (e.error === "need_login") {
        exports.dialogin(request);
      } else {
        $("#main-error").show().children("strong").text(e.error);
      }
      return false;
    }
    if (e.warn) {
      $("#main-alert").show().children("strong").text(e.warn);
    }
    return true;
  };
  exports.dialogin = function(prerequest) {
    var dialogin, dialogin_box;
    dialogin_box = $("#dialogin");
    return dialogin = artDialog.dialog(exports._.extend({
      content: dialogin_box[0],
      initialize: function() {
        dialogin_box.accessform();
        return $("a.submit", dialogin_box).on("click", function() {
          return $.ajax({
            url: "/login",
            data: dialogin_box.serializeFormToJson(),
            success: function(e) {
              if (e.error) {
                $("#dialogin-error").show().children("strong").text(e.error);
                return;
              }
              dialogin.close();
              return $.ajax({
                url: prerequest.url,
                data: prerequest.data,
                success: function(e) {
                  if (!exports.check_result(e)) {
                    return;
                  }
                  return window.location.reload();
                }
              });
            }
          });
        });
      }
    }, exports.dialog_config));
  };
  exports.fix_placeholder = function(box) {
    return PlaceHolder("input[placeholder], textarea[placeholder]", box).placeholder();
  };
  exports.fix_plusanim = function(box) {
    return plusAnim(".plusanim", box).plusAnim({
      statusClass: "icon-red",
      itemClass: "red"
    });
  };
  exports.fix_selall = function(box) {
    return $("input.selall", box).click(function() {
      return $(this).select();
    });
  };
  exports.fix_txttime = function(box) {
    return $('input.txttime').datepicker();
  };
  exports.fix_uitips = function(box) {
    return $(".uitips", box).tooltip({
      position: {
        my: "center bottom",
        at: "center top",
        offset: "0 -5"
      }
    });
  };
  exports.fix_royalSlider = function(box) {
    var items, sliders;
    items = royalSlider('div.item', box);
    sliders = items.children('.royalSlider');
    sliders.royalSlider({
      fullscreen: {
        enabled: true,
        nativeFS: true
      },
      controlNavigation: 'thumbnails',
      imageScaleMode: 'none',
      loop: true,
      numImagesToPreload: 2,
      arrowsNavAutohide: true,
      arrowsNavHideOnTouch: true,
      thumbs: {
        fitInViewport: false
      }
    });
    sliders.hover(function() {
      return $(this).children(".rsThumbs").slideDown("fast");
    }, function() {
      return $(this).children(".rsThumbs").slideUp("fast");
    });
    sliders.find("img.rsTmb").removeClass("fn-hide");
    sliders.find(".rsNavItem").addClass("fn-tac");
    $(".rsFullscreenBtn", sliders).on("click", function() {
      var container;
      container = $(this).siblings(".rsContainer");
      return _.delay(function() {
        return container.find("img").each(function() {
          if (parseInt($(this).css("marginTop")) < 0) {
            return $(this).css("marginTop", 0);
          }
        });
      }, 500);
    });
    if (!$('html').hasClass("generatedcontent")) {
      return items.each(function(i) {
        return $(this).css({
          "z-index": 99 - i
        });
      });
    }
  };
  exports.fix_masonry = function(box) {
    return masonry('#list', box).masonry({
      itemSelector: '.item',
      columnWidth: 510
    });
  };
  exports.app_albumselect = function() {
    var AlbumList, chzn_choices, fixChosen, newAlbum, newAlbum_input;
    chzn_choices = {};
    fixChosen = function() {
      var chzn_container;
      chzn_container = $("div.chzn-container").addClass("fn-vam");
      chzn_choices = $("ul.chzn-choices", chzn_container).css("cursor", "pointer");
      $("li.search-field>input", chzn_choices).attr("disabled", "disabled").css("cursor", "pointer");
      return chzn_choices = $("#AlbumList_chzn ul.chzn-choices");
    };
    fixChosen();
    AlbumList = $("#AlbumList");
    AlbumList.off("change").on("change", function(e) {
      if (AlbumList.val() !== null && AlbumList.val().length > 5) {
        alert('最多选择 5 个专辑！');
        return $("a.search-choice-close", chzn_choices).last().click();
      }
    });
    newAlbum = $("#newAlbum");
    newAlbum_input = $('#newAlbum_input');
    return $("#newAlbum_btn").on("click", function() {
      if (AlbumList.val() !== null && AlbumList.val().length > 5) {
        alert('最多选择 5 个专辑！');
        return;
      }
      return artDialog.dialog(_.extend({
        title: "新建专辑",
        content: newAlbum[0],
        initialize: function() {
          return newAlbum_input.focus();
        },
        okValue: '提交',
        ok: function() {
          var dia;
          dia = this;
          return $.ajax({
            url: "album",
            data: {
              'name': newAlbum_input.val()
            },
            success: function(e) {
              if (!exports.check_result(e, this)) {
                return;
              }
              dia.close();
              AlbumList.append("<option selected='selected' value='" + e.id + "'>" + (newAlbum_input.val()) + "</option>");
              $("#AlbumList_chzn").remove();
              AlbumList.removeClass("chzn-done");
              chosen(AlbumList).chosen();
              return fixChosen();
            }
          });
        }
      }, exports.dialog_config));
    });
  };
  exports.app_albumedit = function() {
    var editalbum, intut_creat;
    editalbum = $("ul.editalbum");
    if (!editalbum.length) {
      return;
    }
    editalbum.on("click", "a.changename", function() {
      var input, span, _this;
      _this = $(this).hide();
      input = _this.siblings("input").show();
      span = _this.siblings("span").hide();
      input.val(span.text());
      _this.siblings("a.submit").show();
      return _this.siblings("a.delete").hide();
    });
    editalbum.on("click", "a.submit", function() {
      var input, _this;
      _this = $(this);
      input = _this.siblings("input");
      return $.ajax({
        url: "/album",
        data: {
          '_method': 'update',
          'id': _this.parent("li").attr("aid"),
          'name': input.val()
        },
        success: function(e) {
          var span;
          if (!exports.check_result(e, this)) {
            return;
          }
          _this.hide();
          input.hide();
          span = _this.siblings("span").show();
          span.text(input.val());
          _this.siblings("a.changename").show();
          return _this.siblings("a.delete").show();
        }
      });
    });
    editalbum.on("click", "a.delete", function() {
      var _this;
      _this = $(this);
      return artDialog.dialog({
        follow: _this[0],
        content: "确定删除 '" + _this.siblings("span").text() + "'？",
        ok: function() {
          return $.ajax({
            context: _this,
            url: "/album",
            data: {
              '_method': 'delete',
              'id': _this.parent("li").attr('aid')
            },
            success: function(e) {
              if (!exports.check_result(e, this)) {
                return;
              }
              return _this.parent("li").remove();
            }
          });
        },
        okValue: "确定"
      });
    });
    intut_creat = $('input.creat');
    return $("a.creat").on("click", function() {
      if (intut_creat.val()) {
        return $.ajax({
          url: "/album",
          data: {
            'name': intut_creat.val()
          },
          success: function(e) {
            if (!exports.check_result(e, this)) {
              return;
            }
            editalbum.append("                            <li aid='" + e.id + "'>                                <span>" + ($('input.creat').val()) + "</span>                                <input type='text' />                                <a class='lk submit'>确定</a>                                <a class='lk changename'>重命名</a>                                <a class='lk delete'>删除</a>                            </li>");
            return intut_creat.val("");
          }
        });
      }
    });
  };
  exports.app_itemact = function() {
    $("a.act_like").on("click", function() {
      var ico, span, _this;
      _this = $(this);
      ico = _this.children("i");
      span = _this.children("span");
      if (ico.hasClass("icon-red")) {
        return $.ajax({
          url: '/like',
          data: {
            'id': _this.attr("iid"),
            '_method': 'delete'
          },
          success: function(e) {
            if (!exports.check_result(e, this)) {
              return;
            }
            ico.removeClass("icon-red");
            return span.text(parseInt(span.text()) - 1);
          }
        });
      } else {
        return $.ajax({
          url: '/like',
          data: {
            'id': _this.attr("iid")
          },
          success: function(e) {
            if (!exports.check_result(e, this)) {
              return;
            }
            ico.addClass("icon-red");
            return span.text(parseInt(span.text()) + 1);
          }
        });
      }
    });
    return $("a.act_delete").on("click", function() {
      var _this;
      _this = $(this);
      return artDialog.dialog({
        follow: _this[0],
        content: "确定删除？",
        okValue: "确定",
        ok: function() {
          return $.ajax({
            url: "/item/" + _this.attr('iid'),
            data: {
              '_method': 'delete'
            },
            success: function(e) {
              var slideFocus;
              if (!exports.check_result(e, this)) {
                return;
              }
              slideFocus = _this.closest("li.slideFocus");
              if (slideFocus.length) {
                return slideFocus.slideUp();
              } else {
                return window.location = "/user/" + $("#userId").attr("uid");
              }
            }
          });
        }
      });
    });
  };
  exports.app_userboard = function() {
    var turnActFolow;
    turnActFolow = function(_this) {
      if (_this.hasClass("btn-primary")) {
        _this.prev("a.btn").remove();
        return _this.attr("title", "点击后关注他/她").html("<i class='icon-plus icon-white'></i> 加关注");
      } else {
        _this.before("<a class='btn btn-mini `sabled'><i class='icon-ok'></i> 已关注</a>");
        return _this.attr("title", "点击后取消关注").html(" 取消");
      }
    };
    return $("a.act_follow").each(function() {
      var _this;
      _this = $(this);
      turnActFolow(_this);
      return _this.on("click", function() {
        if (_this.hasClass("btn-primary")) {
          return $.ajax({
            url: '/following',
            data: {
              'id': _this.attr("iid")
            },
            success: function(e) {
              if (!exports.check_result(e, this)) {
                return;
              }
              _this.removeClass("btn-primary");
              return turnActFolow(_this);
            }
          });
        } else {
          return $.ajax({
            url: '/following',
            data: {
              'id': _this.attr("iid"),
              '_method': "delete"
            },
            success: function(e) {
              if (!exports.check_result(e, this)) {
                return;
              }
              _this.addClass("btn-primary");
              return turnActFolow(_this);
            }
          });
        }
      });
    });
  };
  exports.app_commit = function() {
    var ValiFunc, commit_temp, script_commit;
    ValiFunc = function(o) {
      if (o.val().length > 200) {
        alert("评论内容不能超过200个字符");
        return false;
      }
      return true;
    };
    commit_temp = "<div class='commit' rid='{{replyId}}'>            <p class='gray'>                <a class='gray fn-fw' href='/user/{{authorId}}'>{{authorName}}<a>                <a id='target{{replyId}}' href='/item#target{{replyId}}' class='gray ml10'>{{showCreated}}</a>：            </p>            {{content}}            <a class='replybtn'>回复</a>            <a class='deletebtn'>删除</a>            <p class='replyform'></p>        </div>";
    script_commit = function(freshcommit) {
      freshcommit.hover(function() {
        return $(this).addClass("hover");
      }, function() {
        return $(this).removeClass("hover");
      });
      freshcommit.on("click", "a.replybtn", function() {
        var submit, textarea, _form, _this;
        _this = $(this);
        _this.hide();
        _form = _this.siblings("p.replyform");
        _form.show();
        if (_form.data("init")) {
          return;
        }
        textarea = $("<textarea>", {
          "name": "text",
          "rows": 2,
          "style": "width:90%;margin:0;"
        }).appendTo(_form);
        submit = $("<a>", {
          "class": "btn btn-mini mt5",
          "text": "提交"
        }).appendTo(_form);
        submit.on("click", function() {
          if (!ValiFunc(textarea)) {
            return;
          }
          return $.ajax({
            url: "/reply",
            data: {
              "parentId": _this.parent("div.commit").attr("rid"),
              "itemId": glo_itemId,
              "content": textarea.val()
            },
            success: function(e) {
              var fresh;
              if (!exports.check_result(e, this)) {
                return;
              }
              _this.show();
              _form.hide();
              fresh = $(mc.to_html(commit_temp, e)).insertAfter(_form);
              return script_commit(fresh);
            }
          });
        });
        return _form.data("init", true);
      });
      return freshcommit.on("click", "a.deletebtn", function() {
        var _this;
        _this = $(this);
        return artDialog.dialog({
          follow: _this[0],
          content: "确定删除？",
          ok: function() {
            return $.ajax({
              context: _this,
              url: "/reply",
              data: {
                '_method': 'delete',
                'id': _this.parent("div.commit").attr("rid")
              },
              success: function(e) {
                var _commit;
                if (!exports.check_result(e, this)) {
                  return;
                }
                _commit = _this.parent("div.commit");
                if ($(".commit", _commit).length) {
                  _commit.children(".replybtn, .deletebtn").remove();
                  return _commit.children(".content").html("该评论已被删除");
                } else {
                  return _commit.remove();
                }
              }
            });
          },
          okValue: "确定"
        });
      });
    };
    script_commit($("div.commit"));
    return $("#commitbtn").on("click", function() {
      if (!ValiFunc($("#committext"))) {
        return;
      }
      return $.ajax({
        url: "/reply",
        data: {
          "itemId": glo_itemId,
          "content": $("#committext").val()
        },
        success: function(e) {
          var fresh;
          if (!exports.check_result(e, this)) {
            return;
          }
          fresh = $(mc.to_html(commit_temp, e)).prependTo($("#commitlist"));
          return script_commit(fresh);
        }
      });
    });
  };
  exports.app_avatar = function() {
    var uploader;
    return uploader = new qq.FineUploader({
      element: $('#fine-uploader')[0],
      request: {
        endpoint: 'server/handleUploads'
      }
    });
  };
  exports.app_manageimg = function() {
    var con_uploader, imagesform, imgList, img_temp, injectList, injectListReverse, listBox, uploader;
    con_uploader = $("#uploader");
    if (!con_uploader.length) {
      return;
    }
    listBox = {};
    imagesform = $("#images_id");
    img_temp = '<li iid="{{image_id}}" sort="{{sort}}" class="exist{{exist}}" title="拖动排序">\
            <img src="{{url}}" class="thumb"><a href="javascript:;" class="remove" title="移除"></a></li>';
    imgList = [];
    if (imagesform.hasClass("withexist")) {
      $("option", imagesform).each(function(i) {
        return imgList.push({
          exist: true,
          image_id: $(this).attr("value"),
          url: $(this).attr("url"),
          sort: i
        });
      });
    }
    injectList = function() {
      listBox.empty();
      imgList = _.sortBy(imgList, function(item) {
        return item.sort;
      });
      _.each(imgList, function(item) {
        var newitem;
        newitem = $(mc.to_html(img_temp, item)).appendTo(listBox);
        return $("a.remove", newitem).on("click", function() {
          var btn;
          btn = $(this);
          return artDialog.dialog({
            follow: btn[0],
            content: "确定删除？",
            okValue: "确定",
            ok: function() {
              var file, li;
              li = btn.closest("li");
              imgList = _.filter(imgList, function(obj) {
                return obj.image_id !== li.attr('iid');
              });
              if (li.hasClass("existtrue")) {
                return li.remove();
              } else {
                file = _.find(uploader.files, function(obj) {
                  return obj.iid === li.attr('iid');
                });
                return uploader.removeFile(file);
              }
            }
          });
        });
      });
      return listBox.sortable({
        stop: function(event, ui) {
          return injectListReverse();
        }
      }).disableSelection();
    };
    injectListReverse = function() {
      imgList = [];
      return $("li", listBox).each(function(i) {
        var _this;
        _this = $(this).attr("sort", i);
        return imgList.push({
          exist: _this.hasClass("existtrue"),
          image_id: _this.attr("iid"),
          url: $("img", _this).attr("src"),
          sort: i
        });
      });
    };
    con_uploader.pluploadQueue({
      runtimes: 'html5,flash,html4',
      url: '/image/item',
      max_file_size: '10mb',
      max_file_count: 20,
      unique_names: true,
      flash_swf_url: glo_staticUrl + '/front_net/resource/plupload/plupload.flash.swf',
      multiple_queues: true,
      filters: [
        {
          title: "Image",
          extensions: "jpg,gif,png"
        }
      ],
      preinit: {
        Init: function(up, info) {
          $("div.plupload_header, div.plupload_filelist_header, a.plupload_start", con_uploader).remove();
          $("span.plupload_total_status, span.plupload_total_file_size", con_uploader).text("");
          $("#uploader_container").removeAttr("title");
          listBox = $("#uploader_filelist", con_uploader);
          return injectList();
        }
      },
      init: {
        FilesAdded: function(up, files) {
          if (up.state === 2 || files.length < 1) {
            return;
          }
          if (imgList.length + files.length > 20) {
            _.each(files, function(file) {
              return up.removeFile(file);
            });
            alert("抱歉，图片数量不能超过20张。");
            return;
          }
          return up.start();
        },
        FileUploaded: function(up, file, info) {
          var fileInfo;
          if (info.status !== 200) {
            alert("上传失败...");
          }
          fileInfo = JSON.parse(info.response)[0];
          file.iid = fileInfo.image_id;
          return imgList.push({
            exist: false,
            image_id: fileInfo.image_id,
            url: fileInfo.url,
            sort: imgList.length
          });
        },
        UploadComplete: function(up, files) {
          return injectList();
        },
        FilesRemoved: function(up, files) {
          return _.delay(injectList, 1);
        }
      }
    });
    uploader = con_uploader.pluploadQueue();
    return $("form:first").on('submit', function(e) {
      if (!uploader.files.length) {
        alert("请至少上传一张图片");
        return false;
      }
      imagesform.empty();
      return $("li[iid]", listBox).each(function() {
        return imagesform.append('<option selected="selected" value="' + $(this).attr('iid') + '">.</option>');
      });
    });
  };
});
