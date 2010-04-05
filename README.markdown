# HTML5 placeholder plugin, version 0.3.2
Copyright (c) 2010-The End of Time, Mike Taylor, http://miketaylr.com
Modified by Matt Farmer, http://mattfarmer.net | http://github.com/m14t

MIT Licensed: http://www.opensource.org/licenses/mit-license.php

Enables cross-browser* html5 placeholder for inputs, by first testing for a native implementation before building one.

##USAGE:
`$('input[placeholder]').placeholder();`

`<input type="text" placeholder="username">`

###CHANGELOG:
#### 0.3.2
 * Added check for null placeholder attribute
 * Added support for <textarea>s in browsers that support the placeholder tag only on input elements (safari)

#### 0.3.1
 * Added support for IE6 (or at least 6.0.2800.1106)
 * Added check to only work if placeholder attribute actually exsists
 * Added Closure Compiler options to source
 * Don't use ID's that start with numbers (this is applying backwards compatibility afterall)
 * Do a better job at creating unique ID's

#### 0.3
 * Fork from http://github.com/miketaylr/jQuery-html5-placeholder
