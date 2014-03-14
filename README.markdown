# HTML5 placeholder plugin, version 1.01
Copyright (c) 2010-2014, Rene Pot, https://github.com/Topener/

Thanks to Mike Taylor, http://miketaylr.com for setting up initial version

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

`$('input[placeholder]').placeholder({
   inheritStyle: true /*no default styles will be applied*/
});`

`<input type="text" placeholder="username">`

