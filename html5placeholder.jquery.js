// HTML5 placeholder plugin version 1.1
// Copyright (c) 2010-2014, Rene Pot
// Thanks to Mike Taylor, http://miketaylr.com for setting up initial version
// MIT Licensed: http://www.opensource.org/licenses/mit-license.php
// GitHub: https://github.com/Topener/jQuery-html5-placeholder
//
// Enables cross-browser HTML5 placeholder for inputs, by first testing
// for a native implementation before building one.
//
// This is from the fork by Adam Lynch; https://github.com/adam-lynch/jQuery-html5-placeholder
//
//
// USAGE:
//$('input[placeholder]').placeholder();

// <input type="text" placeholder="username">
(function ($) {
    //feature detection
    var hasPlaceholder = 'placeholder' in document.createElement('input');

    //sniffy sniff sniff -- just to give extra left padding for the older
    //graphics for type=email and type=url
    var isOldOpera = window.opera && parseFloat(window.opera.version()) < 10.5;

    $.fn.placeholder = function (options) {
        var inheritStyle = false;//assume that default styling should be set

        if ("undefined" !== typeof options.inheritStyle) {

            if (options.inheritStyle) {
                inheritStyle = true;
            }
            else {//it was passed, but as a falsy value
                delete options.inheritStyle; //remove so it's not added to element later
            }
        }

        //merge in passed in options, if any and inheritStyle was not specified
        options = inheritStyle ? {} : $.extend({}, $.fn.placeholder.defaults, options);

        //cache the original 'left' value, for use by Opera later
        var o_left = options.placeholderCSS && options.placeholderCSS.left || 'auto';

        //first test for native placeholder support before continuing
        //feature detection inspired by ye olde jquery 1.4 hawtness, with paul irish
        return (hasPlaceholder) ? this : this.each(function () {
            //TODO: if this element already has a placeholder, exit

            //local vars
            var $this = $(this),
                inputVal = $.trim($this.val()),
                inputWidth = $this.width(),
                inputHeight = $this.height(),

            //grab the inputs id for the <label @for>, or make a new one from the Date
                inputId = (this.id) ? this.id : 'placeholder' + (Math.floor(Math.random() * 1123456789)),
                placeholderText = $this.attr('placeholder'),
                placeholderClass = 'placeholder-polyfill',
                placeholder = $('<label for=' + inputId + ' class="' + placeholderClass + '">' + placeholderText + '</label>');

            if('undefined' === typeof options.placeholderCSS){
                options.placeholderCSS = {};
            }
            //stuff in some calculated values into the placeholderCSS object
            options.placeholderCSS['width'] = inputWidth;
            options.placeholderCSS['height'] = inputHeight;
            options.placeholderCSS['color'] = options.placeholderCSS.color;

            // adjust position of placeholder
            options.placeholderCSS.left = (isOldOpera && (this.type == 'email' || this.type == 'url')) ?
                '11%' : o_left;
            placeholder.css(options.placeholderCSS);

            //place the placeholder
            $this.wrap(options.inputWrapper);
            $this.attr('id', inputId).after(placeholder);

            //if the input isn't empty
            if (inputVal) {
                placeholder.hide();
            };

            //hide placeholder on focus
            $this.focus(function () {
                if (!$.trim($this.val())) {
                    placeholder.hide();
                };
            });

            //show placeholder if the input is empty
            $this.blur(function () {
                if (!$.trim($this.val())) {
                    placeholder.show();
                };
            });
        });
    };

    //expose defaults
    $.fn.placeholder.defaults = {
        //you can pass in a custom wrapper
        inputWrapper: '<span style="position:relative; display:block;"></span>',

        //more or less just emulating what webkit does here
        //tweak to your hearts content
        placeholderCSS: {
            'font': '0.75em sans-serif',
            'color': '#bababa',
            'position': 'absolute',
            'left': '5px',
            'top': '3px',
            'overflow-x': 'hidden',
            'display': 'block',
            'cursor': 'text'
        }
    };
})(jQuery);
