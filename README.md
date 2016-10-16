# padstring.js
Micro framework to add padding methods to String.prototype.

## Methods
Two String methods are added:
```
padStart(padTo, padWith)
padEnd(padTo, padWith)
```
`padTo` is the minimum width of the output while `padWith` is the character to pad with.
`padWith` is optional and defaults to " ". `padStart` applies padding before the start of 
the input while `padEnd` applies it to the end.

## Usage
```javascript
// Turn a string into a series of \uxxxx sequences
var str = "Ελλάδα",
    uLit = Array.from(str).reduce(function(s, c) {
    return s + "\\u" + c.charCodeAt(0).toString(16).padStart(4, '0');
}, ""); // "\u0395\u03bb\u03bb\u03ac\u03b4\u03b1"
```
You can also call the methods generically as `String.prototype.padStart.call(x)` where `x'
does not have to be a String object. Can't quite see the use case for this myself, but 
other String methods are generic so these are as well. If you pass in null or undefined,
a `TypeError` is raised. This also follows specification.
