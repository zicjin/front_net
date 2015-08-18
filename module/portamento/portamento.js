bjudge = require('../../module-zic/bjudge');

/*!
    * 
    * Portamento  v1.1.1 - 2011-09-02
    * http://simianstudios.com/portamento
    *   
    * Copyright 2011 Kris Noble except where noted.
    * 
    * Dual-licensed under the GPLv3 and Apache 2.0 licenses: 
    * http://www.gnu.org/licenses/gpl-3.0.html
    * http://www.apache.org/licenses/LICENSE-2.0
    * 
    */
/**
    * 
    * Creates a sliding panel that respects the boundaries of
    * a given wrapper, and also has sensible behaviour if the
    * viewport is too small to display the whole panel.
    * 
    * Full documentation at http://simianstudios.com/portamento
    * 
    * ----
    * 
    * Uses the viewportOffset plugin by Ben Alman aka Cowboy:
    * http://benalman.com/projects/jquery-misc-plugins/#viewportoffset
    * 
    * Uses a portion of CFT by Juriy Zaytsev aka Kangax:
    * http://kangax.github.com/cft/#IS_POSITION_FIXED_SUPPORTED
    * 
    * Uses code by Matthew Eernisse:
    * http://www.fleegix.org/articles/2006-05-30-getting-the-scrollbar-width-in-pixels
    * 
    * Builds on work by Remy Sharp:
    * http://jqueryfordesigners.com/fixed-floating-elements/
    * 
    */
(function ($) {

    $.fn.portamento = function (options) {

        // we'll use the window and document objects a lot, so
        // saving them as variables now saves a lot of function calls
        var thisWindow = $(window);
        var thisDocument = $(document);

        /**
            * NOTE by Kris - included here so as to avoid namespace clashes.
            * 
            * jQuery viewportOffset - v0.3 - 2/3/2010
            * http://benalman.com/projects/jquery-misc-plugins/
            * 
            * Copyright (c) 2010 "Cowboy" Ben Alman
            * Dual licensed under the MIT and GPL licenses.
            * http://benalman.com/about/license/
            */
        $.fn.viewportOffset = function () {
            var win = $(window);
            var offset = $(this).offset();

            return {
                left: offset.left - win.scrollLeft(),
                top: offset.top - win.scrollTop()
            };
        };

        // ---------------------------------------------------------------------------------------------------

        // get the definitive options
        var opts = $.extend({}, $.fn.portamento.defaults, options);

        // setup the vars accordingly
        var panel = this;
        var wrapper = opts.wrapper;
        var gap = opts.gap;
        var containerId = opts.containerId;
        var disableWorkaround = opts.disableWorkaround;
        var fullyCapableBrowser = !bjudge.browser.msie || bjudge.JudgeIe(7, 12);

        if (panel.length != 1) {
            // die gracefully if the user has tried to pass multiple elements 
            // (multiple element support is on the TODO list!) or no elements...
            return this;
        }

        if (!fullyCapableBrowser && disableWorkaround) {
            // just stop here, as the dev doesn't want to use the workaround
            return this;
        }

        // wrap the floating panel in a div, then set a sensible min-height and width
        panel.wrap('<div id="' + containerId + '" />');
        var float_container = $('#' + containerId);
        float_container.css({
            'min-height': panel.outerHeight(),
            'width': panel.outerWidth() ? panel.outerWidth() : '100%'
        });

        // calculate the upper scrolling boundary
        var panelOffset = panel.offset().top;
        var panelMargin = parseFloat(panel.css('marginTop').replace(/auto/, 0));
        var realPanelOffset = panelOffset - panelMargin;
        var topScrollBoundary = realPanelOffset - gap;

        // a couple of numbers to account for margins and padding on the relevant elements
        var wrapperPaddingFix = parseFloat(wrapper.css('paddingTop').replace(/auto/, 0));
        var containerMarginFix = parseFloat(float_container.css('marginTop').replace(/auto/, 0));

        // ---------------------------------------------------------------------------------------------------

        thisWindow.bind("scroll.portamento", function () {

            if (thisWindow.height() > panel.outerHeight()) { // don't scroll if the window isn't height enough

                var y = thisDocument.scrollTop(); // current scroll position of the document

                if (y >= (topScrollBoundary)) { // if we're at or past the upper scrolling boundary
                    if ((panel.innerHeight() - wrapper.viewportOffset().top) - wrapperPaddingFix + gap >= wrapper.height()) { // if we're at or past the bottom scrolling boundary
                        if (panel.hasClass('fixed') || thisWindow.height() >= panel.outerHeight()) { // check that there's work to do
                            panel.removeClass('fixed');
                            panel.css('top', (wrapper.height() - panel.innerHeight()) + 'px');
                        }
                    } else { // if we're somewhere in the middle
                        opts.addFixedCallback();
                        panel.addClass('fixed');

                        if (fullyCapableBrowser) { // supports position:fixed
                            panel.css('top', gap + 'px'); // to keep the gap
                        } else {
                            panel.clearQueue();
                            panel.css('position', 'absolute').animate({ top: (0 - float_container.viewportOffset().top + gap) });
                        }
                    }
                } else {
                    opts.removeFixedCallback();
                    // if we're above the top scroll boundary
                    panel.removeClass('fixed');
                    panel.css('top', '0'); // remove any added gap
                }
            } else {
                if (opts.elasticityFixed)
                    panel.removeClass('fixed');
            }
        });

        // ---------------------------------------------------------------------------------------------------

        thisWindow.bind("resize.portamento", function () {
            // stop users getting undesirable behaviour if they resize the window too small
            if (thisWindow.height() <= panel.outerHeight() || thisWindow.width() < thisDocument.width()) {
                if (opts.elasticityFixed && panel.hasClass('fixed')) {
                    panel.removeClass('fixed');
                    panel.css('top', '0');
                }
            } else {
                thisWindow.trigger('scroll.portamento'); // trigger the scroll event to place the panel correctly
            }
        });

        // ---------------------------------------------------------------------------------------------------

        thisWindow.bind("orientationchange.portamento", function () {
            // if device orientation changes, trigger the resize event
            thisWindow.trigger('resize.portamento');
        });

        // ---------------------------------------------------------------------------------------------------

        // trigger the scroll event immediately so that the panel is positioned correctly if the page loads anywhere other than the top.
        thisWindow.trigger('scroll.portamento');

        // return this to maintain chainability
        return this;
    };

    // set some sensible defaults
    $.fn.portamento.defaults = {
        'wrapper': $('body'), // the element that will act as the sliding panel's boundaries
        'gap': 10, // the gap (in pixels) left between the top of the viewport and the top of the panel
        'disableWorkaround': false, // option to disable the workaround for not-quite capable browsers 
        'containerId': "portamento_container",
        'elasticityFixed': true,
        removeFixedCallback: function () { },
        addFixedCallback: function () { }
    };

})(jQuery);