// HTML5 placeholder plugin version 0.2
// Copyright (c) 2010-The End of Time, Mike Taylor, http://miketaylr.com
// MIT Licensed: http://www.opensource.org/licenses/mit-license.php
//
// Enables cross-browser* html5 placeholder for inputs, by first testing
// for a native implementation before building one.
//
// *NOTE: This is totally untested in IE (or any Windows-based browser right now)
//
// USAGE: 
//$('input[placeholder]').placeholder();

// <input type="text" placeholder="username">

$.fn.placeholder = function(options) {
  //global config opts
  var defaults = {
    //you can pass in a custom wrapper if that floats your boat
    //inline styles! oh no!
    inputWrapper: '<span style="position:relative"></span>',
    
    //more or less just emulating what webkit does here
    //tweak to your hearts content
    
    //this could be rewritten so you don't have to pass in the 
    //whole object to the method to change these values. just sayin'.
    placeholderCSS: {
      'font':'0.75em sans-serif', 
      'color':'#bababa', 
      'position': 'absolute', 
      'left':'5px',
      'top':'20%', //basically for Opera, top:0 works for everyone else :/
      'overflow-x': 'hidden'
    }
  };
  
  //merge in passed in options, if any
  var opts = $.extend(defaults, options);
  
  //first test for native placeholder support before continuing
  //feature detection inspired by ye olde jquery 1.4 hawtness, with paul irish
  return ('placeholder' in document.createElement('input')) ? this : this.each(function() {
    
    //local vars
    var $this = $(this),
        inputVal = $.trim($this.val()),
        inputWidth = $this.width(),
        inputHeight = $this.height(),
        //grab the inputs id for the <label for>, or make a new one from the Date
        //ids can start with numbers in html5, btw
        inputId = ($this.attr('id') !== '') ? $this.attr('id') : + new Date(),
        placeholderText = $this.attr('placeholder'),
        placeholder = $('<label for='+ inputId +'>'+ placeholderText + '</label>');
        
        //stuff in some calculated values into the placeholderCSS object
        opts.placeholderCSS['width'] = inputWidth;
        opts.placeholderCSS['height'] = inputHeight;
        // this is because opera has super ugly bg graphics for certain input types. ugg.
        opts.placeholderCSS['left'] = $.browser.opera ? '10%' : opts.placeholderCSS['left'];
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