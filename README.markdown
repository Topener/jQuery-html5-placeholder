### Note: This repo is mostly unmaintained by me (as you can see from the Issues). If anyone is interested in taking over ownership officially, please comment in issue #21. 

# HTML5 placeholder plugin, version 1.01
Copyright (c) 2010-The End of Time, Mike Taylor, http://miketaylr.com

MIT Licensed: http://www.opensource.org/licenses/mit-license.php

Enables cross-browser html5 placeholder for inputs, by first testing for a native implementation before building one.
Special thanks to Ben Alman (http://benalman.com/) for suggesting a number of improvements.

The general strategy is one of adding a "position: absolute" label *on top of* the input element.

## Known Issues

Firefox pre-filling input items causes issues.  A possible workaround is to also set `autocomplete=false` on the input element(s) in question, if this makes user experience sense to do so (e.g. perhaps on a search box, but not the username field).

## USAGE: 
`$('input[placeholder]').placeholder();`

`$('input[placeholder]').placeholder({
   color: '#bada55'
});`

`<input type="text" placeholder="username">`

