// HTML5 placeholder plugin version 1.01
// Copyright (c) 2010-The End of Time, Mike Taylor, http://miketaylr.com
// MIT Licensed: http://www.opensource.org/licenses/mit-license.php
//
// Enables cross-browser HTML5 placeholder for inputs, by first testing
// for a native implementation before building one.
//
//
// USAGE: 
//$('input[placeholder]').placeholder();
// <input type="text" placeholder="username">
(function(a){var b="placeholder"in document.createElement("input"),c=a.browser.opera&&a.browser.version<10.5;a.fn.placeholder=function(d){var d=a.extend({},a.fn.placeholder.defaults,d),e=d.placeholderCSS.left;return b?this:this.each(function(){var b=a(this),f=a.trim(b.val()),g=b.width(),h=b.height(),i=this.id?this.id:"placeholder"+ +(new Date),j=b.attr("placeholder"),k=a("<label for="+i+">"+j+"</label>");d.placeholderCSS.width=g,d.placeholderCSS.height=h,d.placeholderCSS.color=d.color,d.placeholderCSS.left=!c||this.type!="email"&&this.type!="url"?e:"11%",k.css(d.placeholderCSS),b.wrap(d.inputWrapper),b.attr("id",i).after(k),f&&k.hide(),b.focus(function(){a.trim(b.val())||k.hide()}),b.blur(function(){a.trim(b.val())||k.show()})})},a.fn.placeholder.defaults={inputWrapper:'<span style="position:relative; display:block;"></span>',placeholderCSS:{font:"0.75em sans-serif",color:"#bababa",position:"absolute",left:"5px",top:"3px","overflow-x":"hidden",display:"block"}}})(jQuery);