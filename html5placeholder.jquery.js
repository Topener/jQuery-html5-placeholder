// HTML5 placeholder plugin version 0.3.1
// Copyright (c) 2010-The End of Time, Mike Taylor, http://miketaylr.com
// Modified by Matt Farmer, http://mattfarmer.net | http://github.com/m14t to:
//   - Added support for IE6 (or at least 6.0.2800.1106)
//   - Added check to only work if placeholder attribute actually exsists
//   - Added Closure Compiler options to source
//   - Don't use ID's that start with numbers (this is applying backwards compatibility afterall)
//   - Do a better job at creating unique ID's

// MIT Licensed: http://www.opensource.org/licenses/mit-license.php
//
// Enables cross-browser* html5 placeholder for inputs, by first testing
// for a native implementation before building one.
//
// USAGE:
//$('input[placeholder]').placeholder();

// <input type="text" placeholder="username">

// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name html5placeholder.jquery.min.js
// ==/ClosureCompiler==

(function($){

  $.fn.placeholder = function(options) {
    //merge in passed in options, if any
    var opts = $.extend($.fn.placeholder.defaults, options),
    //cache the original 'left' and 'top' values, for use by Opera/IE6 later
    o_left = opts.placeholderCSS.left;
    o_top = opts.placeholderCSS.top;

    //sniffy sniff sniff
    var isOpera = function() {
      return $.browser.opera;
    };
    var isIE6 = function() {
      return $.browser.msie && '6.0' === $.browser.version;
    };

    //first test for native placeholder support before continuing
    //feature detection inspired by ye olde jquery 1.4 hawtness, with paul irish
    return ('placeholder' in document.createElement('input')) ? this : this.each(function(index) {

      //local vars
      var $this = $(this);
      if ( "undefined" !== typeof($this.attr('placeholder')) ) {
        var inputVal = $.trim($this.val()),
            inputWidth = $this.width(),
            inputHeight = $this.height(),
            //grab the inputs id for the <label for>, or make a new one from the Date
            //ids can start with numbers in html5, but if we're using this plugin its because its not supported
            //Also, use the index here so we don't get dup ID's (it's happened).
            inputId = ($this.attr('id') !== '') ? $this.attr('id') : 'id'+ new Date().getTime() +index,
            placeholderText = $this.attr('placeholder'),
            placeholder = $('<label for='+ inputId +'>'+ placeholderText + '</label>');

            //stuff in some calculated values into the placeholderCSS object
            opts.placeholderCSS['width'] = inputWidth;
            opts.placeholderCSS['height'] = inputHeight;
            // adjust position of placeholder to accomodate opera's super ugly 'email' and 'url' graphics
            opts.placeholderCSS.left = (isOpera() && this.getAttribute('type')==='email' || isOpera() && this.getAttribute('type')==='url') ? '11%' : o_left;
            // adjust position in IE6
            opts.placeholderCSS.top = isIE6() ? ($this.outerHeight()-opts.placeholderCSS['height']) : o_top;
            placeholder.css(opts.placeholderCSS);

        //place the placeholder if the input is empty
        if (!inputVal){
          $this.wrap(opts.inputWrapper);
          $this.attr('id', inputId).after(placeholder);
        };

        //hide placeholder on focus
        $this.focus(function(){
          if (!$.trim($this.val())){
           $this.next().hide();
          };
        });

        //show placeholder if the input is empty
        $this.blur(function(){
          if (!$.trim($this.val())){
            $this.next().show();
          };
        });
      }
    });
  };

  //expose defaults
  $.fn.placeholder.defaults = {
    //you can pass in a custom wrapper
    inputWrapper: '<span style="position:relative"></span>',

    //more or less just emulating what webkit does here
    //tweak to your hearts content
    placeholderCSS: {
      'font':'0.75em sans-serif',
      'color':'#bababa',
      'position': 'absolute',
      'left':'5px',
      'top':'20%', //basically for Opera, top:0 works for everyone else :/
      'overflow-x': 'hidden'
    }
  };
})(jQuery);
