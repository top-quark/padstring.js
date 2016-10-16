/**
 * Adds padding methods to String.prototype
 * Copyright (C) 2016 Christopher Williams.
 * This is distributed under the terms of the Apache License,
 *   http://www.apache.org/licenses/LICENSE-2.0
 * in the hope that you may find it useful.
 */
 
(function() {
    "use strict";
    // Returns true if x is defined
    var _def = function(x) {
        return (!(x === undefined || x === null));
    },
    
    // String.prototype methods should be written generically so that other objects can
    // be passed via String.prototype.xxx.call; however a TypeError should be raised if
    // this is null or undefined
    _check = function(s) {
        if (_def(s)) {
            // Coerce to string
            return "" + s;
        }
        throw new TypeError("can't convert " + s + " to object");
    },
    
    // Padding worker function
    _pad = function(s, padTo, padWith, right) {
        s = _check(s);
        // Coerce to a number >= 0
        padTo >>= 0;
        padWith = (undefined === padWith) ? " " : "" + padWith;
        var pad = "", toPad = Math.max(padTo, s.length) - s.length, 
            pLen = padWith.length;
        if (!(pLen && toPad)) {
            // Nothing to do
            return s;
        }
        // How many times do we need to append padWith?
        var n = toPad / pLen;
        if (toPad % pLen) {
            ++n;
        }
        while (n) {
            if (n & 1) {
                pad += padWith;
            }
            n >>>= 1;
            if (n) {
                padWith += padWith;
            }
        }
        pad = pad.substring(0, toPad);
        return right ? s + pad : pad + s;
    },
    
    pMethods = {
        padStart: function(t, w) {
            return _pad(this, t, w);
        },
        padEnd: function(t, w) {
            return _pad(this, t, w, true);
        }
    },
    obj = String.prototype, mName, m;
    for (mName in pMethods) {
        if (mName in obj) {
            continue;
        }
        m = pMethods[mName];            
        try {
            Object.defineProperty(obj, mName, {
                enumerable : false,
                value : m
            });
        }
        catch(e) {
            obj[mName] = m;
        }
    }
})();
 
