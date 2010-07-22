// HTML5 placeholder plugin version 1.0
// Copyright (c) 2010-The End of Time, Mike Taylor, http://miketaylr.com
// MIT Licensed: http://www.opensource.org/licenses/mit-license.php
//
// Enables cross-browser* html5 placeholder for inputs, by first testing
// for a native implementation before building one.
//
//
// USAGE: 
//$('input[placeholder]').placeholder();

// <input type="text" placeholder="username">
(function($){
  
  $.fn.placeholder = function(options) {
    //merge in passed in options, if any
    var opts = $.extend($.fn.placeholder.defaults, options),
    //cache the original 'left' value, for use by Opera later
    o_left = opts.placeholderCSS.left;
  
    //sniffy sniff sniff -- just to give extra left padding for the older
    //graphics for type=email and type=url
    var isOldOpera = function() {
      return $.browser.opera && $.browser.version < 10.5;
    };
  
    //first test for native placeholder support before continuing
    //feature detection inspired by ye olde jquery 1.4 hawtness, with paul irish
    return ('placeholder' in document.createElement('input')) ? 
      this : this.each(function() {
    
      //local vars
      var $this = $(this),
          inputVal = $.trim($this.val()),
          inputWidth = $this.width(),
          inputHeight = $this.height(),

          //grab the inputs id for the <label @for>, or make a new one from the Date
          //ids can start with numbers in html5, btw
          inputId = (this.id) ? this.id : + new Date(),
          placeholderText = $this.attr('placeholder'),
          placeholder = $('<label for='+ inputId +'>'+ placeholderText + '</label>');
        
          //stuff in some calculated values into the placeholderCSS object
          opts.placeholderCSS['width'] = inputWidth;
          opts.placeholderCSS['height'] = inputHeight;

          // adjust position of placeholder 
          opts.placeholderCSS.left = (isOldOpera() && (this.type == 'email' || this.type == 'url')) ?
            '11%' : o_left;
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
      'top':'3px', 
      'overflow-x': 'hidden'
    }
  };
})(jQuery);
