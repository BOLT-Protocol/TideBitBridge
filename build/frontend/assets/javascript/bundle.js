/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n\nexports.byteLength = byteLength\nexports.toByteArray = toByteArray\nexports.fromByteArray = fromByteArray\n\nvar lookup = []\nvar revLookup = []\nvar Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array\n\nvar code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'\nfor (var i = 0, len = code.length; i < len; ++i) {\n  lookup[i] = code[i]\n  revLookup[code.charCodeAt(i)] = i\n}\n\n// Support decoding URL-safe base64 strings, as Node.js does.\n// See: https://en.wikipedia.org/wiki/Base64#URL_applications\nrevLookup['-'.charCodeAt(0)] = 62\nrevLookup['_'.charCodeAt(0)] = 63\n\nfunction getLens (b64) {\n  var len = b64.length\n\n  if (len % 4 > 0) {\n    throw new Error('Invalid string. Length must be a multiple of 4')\n  }\n\n  // Trim off extra bytes after placeholder bytes are found\n  // See: https://github.com/beatgammit/base64-js/issues/42\n  var validLen = b64.indexOf('=')\n  if (validLen === -1) validLen = len\n\n  var placeHoldersLen = validLen === len\n    ? 0\n    : 4 - (validLen % 4)\n\n  return [validLen, placeHoldersLen]\n}\n\n// base64 is 4/3 + up to two characters of the original data\nfunction byteLength (b64) {\n  var lens = getLens(b64)\n  var validLen = lens[0]\n  var placeHoldersLen = lens[1]\n  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen\n}\n\nfunction _byteLength (b64, validLen, placeHoldersLen) {\n  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen\n}\n\nfunction toByteArray (b64) {\n  var tmp\n  var lens = getLens(b64)\n  var validLen = lens[0]\n  var placeHoldersLen = lens[1]\n\n  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))\n\n  var curByte = 0\n\n  // if there are placeholders, only get up to the last complete 4 chars\n  var len = placeHoldersLen > 0\n    ? validLen - 4\n    : validLen\n\n  var i\n  for (i = 0; i < len; i += 4) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 18) |\n      (revLookup[b64.charCodeAt(i + 1)] << 12) |\n      (revLookup[b64.charCodeAt(i + 2)] << 6) |\n      revLookup[b64.charCodeAt(i + 3)]\n    arr[curByte++] = (tmp >> 16) & 0xFF\n    arr[curByte++] = (tmp >> 8) & 0xFF\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  if (placeHoldersLen === 2) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 2) |\n      (revLookup[b64.charCodeAt(i + 1)] >> 4)\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  if (placeHoldersLen === 1) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 10) |\n      (revLookup[b64.charCodeAt(i + 1)] << 4) |\n      (revLookup[b64.charCodeAt(i + 2)] >> 2)\n    arr[curByte++] = (tmp >> 8) & 0xFF\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  return arr\n}\n\nfunction tripletToBase64 (num) {\n  return lookup[num >> 18 & 0x3F] +\n    lookup[num >> 12 & 0x3F] +\n    lookup[num >> 6 & 0x3F] +\n    lookup[num & 0x3F]\n}\n\nfunction encodeChunk (uint8, start, end) {\n  var tmp\n  var output = []\n  for (var i = start; i < end; i += 3) {\n    tmp =\n      ((uint8[i] << 16) & 0xFF0000) +\n      ((uint8[i + 1] << 8) & 0xFF00) +\n      (uint8[i + 2] & 0xFF)\n    output.push(tripletToBase64(tmp))\n  }\n  return output.join('')\n}\n\nfunction fromByteArray (uint8) {\n  var tmp\n  var len = uint8.length\n  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes\n  var parts = []\n  var maxChunkLength = 16383 // must be multiple of 3\n\n  // go through the array every three bytes, we'll deal with trailing stuff later\n  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {\n    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))\n  }\n\n  // pad the end with zeros, but make sure to not forget the extra bytes\n  if (extraBytes === 1) {\n    tmp = uint8[len - 1]\n    parts.push(\n      lookup[tmp >> 2] +\n      lookup[(tmp << 4) & 0x3F] +\n      '=='\n    )\n  } else if (extraBytes === 2) {\n    tmp = (uint8[len - 2] << 8) + uint8[len - 1]\n    parts.push(\n      lookup[tmp >> 10] +\n      lookup[(tmp >> 4) & 0x3F] +\n      lookup[(tmp << 2) & 0x3F] +\n      '='\n    )\n  }\n\n  return parts.join('')\n}\n\n\n//# sourceURL=webpack://tidebit-bridge/./node_modules/base64-js/index.js?");

/***/ }),

/***/ "./node_modules/bn.js/lib/bn.js":
/*!**************************************!*\
  !*** ./node_modules/bn.js/lib/bn.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n(function (module, exports) {\n  'use strict';\n\n  // Utils\n  function assert (val, msg) {\n    if (!val) throw new Error(msg || 'Assertion failed');\n  }\n\n  // Could use `inherits` module, but don't want to move from single file\n  // architecture yet.\n  function inherits (ctor, superCtor) {\n    ctor.super_ = superCtor;\n    var TempCtor = function () {};\n    TempCtor.prototype = superCtor.prototype;\n    ctor.prototype = new TempCtor();\n    ctor.prototype.constructor = ctor;\n  }\n\n  // BN\n\n  function BN (number, base, endian) {\n    if (BN.isBN(number)) {\n      return number;\n    }\n\n    this.negative = 0;\n    this.words = null;\n    this.length = 0;\n\n    // Reduction context\n    this.red = null;\n\n    if (number !== null) {\n      if (base === 'le' || base === 'be') {\n        endian = base;\n        base = 10;\n      }\n\n      this._init(number || 0, base || 10, endian || 'be');\n    }\n  }\n  if (typeof module === 'object') {\n    module.exports = BN;\n  } else {\n    exports.BN = BN;\n  }\n\n  BN.BN = BN;\n  BN.wordSize = 26;\n\n  var Buffer;\n  try {\n    if (typeof window !== 'undefined' && typeof window.Buffer !== 'undefined') {\n      Buffer = window.Buffer;\n    } else {\n      Buffer = __webpack_require__(/*! buffer */ \"?8131\").Buffer;\n    }\n  } catch (e) {\n  }\n\n  BN.isBN = function isBN (num) {\n    if (num instanceof BN) {\n      return true;\n    }\n\n    return num !== null && typeof num === 'object' &&\n      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);\n  };\n\n  BN.max = function max (left, right) {\n    if (left.cmp(right) > 0) return left;\n    return right;\n  };\n\n  BN.min = function min (left, right) {\n    if (left.cmp(right) < 0) return left;\n    return right;\n  };\n\n  BN.prototype._init = function init (number, base, endian) {\n    if (typeof number === 'number') {\n      return this._initNumber(number, base, endian);\n    }\n\n    if (typeof number === 'object') {\n      return this._initArray(number, base, endian);\n    }\n\n    if (base === 'hex') {\n      base = 16;\n    }\n    assert(base === (base | 0) && base >= 2 && base <= 36);\n\n    number = number.toString().replace(/\\s+/g, '');\n    var start = 0;\n    if (number[0] === '-') {\n      start++;\n      this.negative = 1;\n    }\n\n    if (start < number.length) {\n      if (base === 16) {\n        this._parseHex(number, start, endian);\n      } else {\n        this._parseBase(number, base, start);\n        if (endian === 'le') {\n          this._initArray(this.toArray(), base, endian);\n        }\n      }\n    }\n  };\n\n  BN.prototype._initNumber = function _initNumber (number, base, endian) {\n    if (number < 0) {\n      this.negative = 1;\n      number = -number;\n    }\n    if (number < 0x4000000) {\n      this.words = [ number & 0x3ffffff ];\n      this.length = 1;\n    } else if (number < 0x10000000000000) {\n      this.words = [\n        number & 0x3ffffff,\n        (number / 0x4000000) & 0x3ffffff\n      ];\n      this.length = 2;\n    } else {\n      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)\n      this.words = [\n        number & 0x3ffffff,\n        (number / 0x4000000) & 0x3ffffff,\n        1\n      ];\n      this.length = 3;\n    }\n\n    if (endian !== 'le') return;\n\n    // Reverse the bytes\n    this._initArray(this.toArray(), base, endian);\n  };\n\n  BN.prototype._initArray = function _initArray (number, base, endian) {\n    // Perhaps a Uint8Array\n    assert(typeof number.length === 'number');\n    if (number.length <= 0) {\n      this.words = [ 0 ];\n      this.length = 1;\n      return this;\n    }\n\n    this.length = Math.ceil(number.length / 3);\n    this.words = new Array(this.length);\n    for (var i = 0; i < this.length; i++) {\n      this.words[i] = 0;\n    }\n\n    var j, w;\n    var off = 0;\n    if (endian === 'be') {\n      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {\n        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);\n        this.words[j] |= (w << off) & 0x3ffffff;\n        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;\n        off += 24;\n        if (off >= 26) {\n          off -= 26;\n          j++;\n        }\n      }\n    } else if (endian === 'le') {\n      for (i = 0, j = 0; i < number.length; i += 3) {\n        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);\n        this.words[j] |= (w << off) & 0x3ffffff;\n        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;\n        off += 24;\n        if (off >= 26) {\n          off -= 26;\n          j++;\n        }\n      }\n    }\n    return this.strip();\n  };\n\n  function parseHex4Bits (string, index) {\n    var c = string.charCodeAt(index);\n    // 'A' - 'F'\n    if (c >= 65 && c <= 70) {\n      return c - 55;\n    // 'a' - 'f'\n    } else if (c >= 97 && c <= 102) {\n      return c - 87;\n    // '0' - '9'\n    } else {\n      return (c - 48) & 0xf;\n    }\n  }\n\n  function parseHexByte (string, lowerBound, index) {\n    var r = parseHex4Bits(string, index);\n    if (index - 1 >= lowerBound) {\n      r |= parseHex4Bits(string, index - 1) << 4;\n    }\n    return r;\n  }\n\n  BN.prototype._parseHex = function _parseHex (number, start, endian) {\n    // Create possibly bigger array to ensure that it fits the number\n    this.length = Math.ceil((number.length - start) / 6);\n    this.words = new Array(this.length);\n    for (var i = 0; i < this.length; i++) {\n      this.words[i] = 0;\n    }\n\n    // 24-bits chunks\n    var off = 0;\n    var j = 0;\n\n    var w;\n    if (endian === 'be') {\n      for (i = number.length - 1; i >= start; i -= 2) {\n        w = parseHexByte(number, start, i) << off;\n        this.words[j] |= w & 0x3ffffff;\n        if (off >= 18) {\n          off -= 18;\n          j += 1;\n          this.words[j] |= w >>> 26;\n        } else {\n          off += 8;\n        }\n      }\n    } else {\n      var parseLength = number.length - start;\n      for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {\n        w = parseHexByte(number, start, i) << off;\n        this.words[j] |= w & 0x3ffffff;\n        if (off >= 18) {\n          off -= 18;\n          j += 1;\n          this.words[j] |= w >>> 26;\n        } else {\n          off += 8;\n        }\n      }\n    }\n\n    this.strip();\n  };\n\n  function parseBase (str, start, end, mul) {\n    var r = 0;\n    var len = Math.min(str.length, end);\n    for (var i = start; i < len; i++) {\n      var c = str.charCodeAt(i) - 48;\n\n      r *= mul;\n\n      // 'a'\n      if (c >= 49) {\n        r += c - 49 + 0xa;\n\n      // 'A'\n      } else if (c >= 17) {\n        r += c - 17 + 0xa;\n\n      // '0' - '9'\n      } else {\n        r += c;\n      }\n    }\n    return r;\n  }\n\n  BN.prototype._parseBase = function _parseBase (number, base, start) {\n    // Initialize as zero\n    this.words = [ 0 ];\n    this.length = 1;\n\n    // Find length of limb in base\n    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {\n      limbLen++;\n    }\n    limbLen--;\n    limbPow = (limbPow / base) | 0;\n\n    var total = number.length - start;\n    var mod = total % limbLen;\n    var end = Math.min(total, total - mod) + start;\n\n    var word = 0;\n    for (var i = start; i < end; i += limbLen) {\n      word = parseBase(number, i, i + limbLen, base);\n\n      this.imuln(limbPow);\n      if (this.words[0] + word < 0x4000000) {\n        this.words[0] += word;\n      } else {\n        this._iaddn(word);\n      }\n    }\n\n    if (mod !== 0) {\n      var pow = 1;\n      word = parseBase(number, i, number.length, base);\n\n      for (i = 0; i < mod; i++) {\n        pow *= base;\n      }\n\n      this.imuln(pow);\n      if (this.words[0] + word < 0x4000000) {\n        this.words[0] += word;\n      } else {\n        this._iaddn(word);\n      }\n    }\n\n    this.strip();\n  };\n\n  BN.prototype.copy = function copy (dest) {\n    dest.words = new Array(this.length);\n    for (var i = 0; i < this.length; i++) {\n      dest.words[i] = this.words[i];\n    }\n    dest.length = this.length;\n    dest.negative = this.negative;\n    dest.red = this.red;\n  };\n\n  BN.prototype.clone = function clone () {\n    var r = new BN(null);\n    this.copy(r);\n    return r;\n  };\n\n  BN.prototype._expand = function _expand (size) {\n    while (this.length < size) {\n      this.words[this.length++] = 0;\n    }\n    return this;\n  };\n\n  // Remove leading `0` from `this`\n  BN.prototype.strip = function strip () {\n    while (this.length > 1 && this.words[this.length - 1] === 0) {\n      this.length--;\n    }\n    return this._normSign();\n  };\n\n  BN.prototype._normSign = function _normSign () {\n    // -0 = 0\n    if (this.length === 1 && this.words[0] === 0) {\n      this.negative = 0;\n    }\n    return this;\n  };\n\n  BN.prototype.inspect = function inspect () {\n    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';\n  };\n\n  /*\n\n  var zeros = [];\n  var groupSizes = [];\n  var groupBases = [];\n\n  var s = '';\n  var i = -1;\n  while (++i < BN.wordSize) {\n    zeros[i] = s;\n    s += '0';\n  }\n  groupSizes[0] = 0;\n  groupSizes[1] = 0;\n  groupBases[0] = 0;\n  groupBases[1] = 0;\n  var base = 2 - 1;\n  while (++base < 36 + 1) {\n    var groupSize = 0;\n    var groupBase = 1;\n    while (groupBase < (1 << BN.wordSize) / base) {\n      groupBase *= base;\n      groupSize += 1;\n    }\n    groupSizes[base] = groupSize;\n    groupBases[base] = groupBase;\n  }\n\n  */\n\n  var zeros = [\n    '',\n    '0',\n    '00',\n    '000',\n    '0000',\n    '00000',\n    '000000',\n    '0000000',\n    '00000000',\n    '000000000',\n    '0000000000',\n    '00000000000',\n    '000000000000',\n    '0000000000000',\n    '00000000000000',\n    '000000000000000',\n    '0000000000000000',\n    '00000000000000000',\n    '000000000000000000',\n    '0000000000000000000',\n    '00000000000000000000',\n    '000000000000000000000',\n    '0000000000000000000000',\n    '00000000000000000000000',\n    '000000000000000000000000',\n    '0000000000000000000000000'\n  ];\n\n  var groupSizes = [\n    0, 0,\n    25, 16, 12, 11, 10, 9, 8,\n    8, 7, 7, 7, 7, 6, 6,\n    6, 6, 6, 6, 6, 5, 5,\n    5, 5, 5, 5, 5, 5, 5,\n    5, 5, 5, 5, 5, 5, 5\n  ];\n\n  var groupBases = [\n    0, 0,\n    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,\n    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,\n    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,\n    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,\n    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176\n  ];\n\n  BN.prototype.toString = function toString (base, padding) {\n    base = base || 10;\n    padding = padding | 0 || 1;\n\n    var out;\n    if (base === 16 || base === 'hex') {\n      out = '';\n      var off = 0;\n      var carry = 0;\n      for (var i = 0; i < this.length; i++) {\n        var w = this.words[i];\n        var word = (((w << off) | carry) & 0xffffff).toString(16);\n        carry = (w >>> (24 - off)) & 0xffffff;\n        if (carry !== 0 || i !== this.length - 1) {\n          out = zeros[6 - word.length] + word + out;\n        } else {\n          out = word + out;\n        }\n        off += 2;\n        if (off >= 26) {\n          off -= 26;\n          i--;\n        }\n      }\n      if (carry !== 0) {\n        out = carry.toString(16) + out;\n      }\n      while (out.length % padding !== 0) {\n        out = '0' + out;\n      }\n      if (this.negative !== 0) {\n        out = '-' + out;\n      }\n      return out;\n    }\n\n    if (base === (base | 0) && base >= 2 && base <= 36) {\n      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));\n      var groupSize = groupSizes[base];\n      // var groupBase = Math.pow(base, groupSize);\n      var groupBase = groupBases[base];\n      out = '';\n      var c = this.clone();\n      c.negative = 0;\n      while (!c.isZero()) {\n        var r = c.modn(groupBase).toString(base);\n        c = c.idivn(groupBase);\n\n        if (!c.isZero()) {\n          out = zeros[groupSize - r.length] + r + out;\n        } else {\n          out = r + out;\n        }\n      }\n      if (this.isZero()) {\n        out = '0' + out;\n      }\n      while (out.length % padding !== 0) {\n        out = '0' + out;\n      }\n      if (this.negative !== 0) {\n        out = '-' + out;\n      }\n      return out;\n    }\n\n    assert(false, 'Base should be between 2 and 36');\n  };\n\n  BN.prototype.toNumber = function toNumber () {\n    var ret = this.words[0];\n    if (this.length === 2) {\n      ret += this.words[1] * 0x4000000;\n    } else if (this.length === 3 && this.words[2] === 0x01) {\n      // NOTE: at this stage it is known that the top bit is set\n      ret += 0x10000000000000 + (this.words[1] * 0x4000000);\n    } else if (this.length > 2) {\n      assert(false, 'Number can only safely store up to 53 bits');\n    }\n    return (this.negative !== 0) ? -ret : ret;\n  };\n\n  BN.prototype.toJSON = function toJSON () {\n    return this.toString(16);\n  };\n\n  BN.prototype.toBuffer = function toBuffer (endian, length) {\n    assert(typeof Buffer !== 'undefined');\n    return this.toArrayLike(Buffer, endian, length);\n  };\n\n  BN.prototype.toArray = function toArray (endian, length) {\n    return this.toArrayLike(Array, endian, length);\n  };\n\n  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {\n    var byteLength = this.byteLength();\n    var reqLength = length || Math.max(1, byteLength);\n    assert(byteLength <= reqLength, 'byte array longer than desired length');\n    assert(reqLength > 0, 'Requested array length <= 0');\n\n    this.strip();\n    var littleEndian = endian === 'le';\n    var res = new ArrayType(reqLength);\n\n    var b, i;\n    var q = this.clone();\n    if (!littleEndian) {\n      // Assume big-endian\n      for (i = 0; i < reqLength - byteLength; i++) {\n        res[i] = 0;\n      }\n\n      for (i = 0; !q.isZero(); i++) {\n        b = q.andln(0xff);\n        q.iushrn(8);\n\n        res[reqLength - i - 1] = b;\n      }\n    } else {\n      for (i = 0; !q.isZero(); i++) {\n        b = q.andln(0xff);\n        q.iushrn(8);\n\n        res[i] = b;\n      }\n\n      for (; i < reqLength; i++) {\n        res[i] = 0;\n      }\n    }\n\n    return res;\n  };\n\n  if (Math.clz32) {\n    BN.prototype._countBits = function _countBits (w) {\n      return 32 - Math.clz32(w);\n    };\n  } else {\n    BN.prototype._countBits = function _countBits (w) {\n      var t = w;\n      var r = 0;\n      if (t >= 0x1000) {\n        r += 13;\n        t >>>= 13;\n      }\n      if (t >= 0x40) {\n        r += 7;\n        t >>>= 7;\n      }\n      if (t >= 0x8) {\n        r += 4;\n        t >>>= 4;\n      }\n      if (t >= 0x02) {\n        r += 2;\n        t >>>= 2;\n      }\n      return r + t;\n    };\n  }\n\n  BN.prototype._zeroBits = function _zeroBits (w) {\n    // Short-cut\n    if (w === 0) return 26;\n\n    var t = w;\n    var r = 0;\n    if ((t & 0x1fff) === 0) {\n      r += 13;\n      t >>>= 13;\n    }\n    if ((t & 0x7f) === 0) {\n      r += 7;\n      t >>>= 7;\n    }\n    if ((t & 0xf) === 0) {\n      r += 4;\n      t >>>= 4;\n    }\n    if ((t & 0x3) === 0) {\n      r += 2;\n      t >>>= 2;\n    }\n    if ((t & 0x1) === 0) {\n      r++;\n    }\n    return r;\n  };\n\n  // Return number of used bits in a BN\n  BN.prototype.bitLength = function bitLength () {\n    var w = this.words[this.length - 1];\n    var hi = this._countBits(w);\n    return (this.length - 1) * 26 + hi;\n  };\n\n  function toBitArray (num) {\n    var w = new Array(num.bitLength());\n\n    for (var bit = 0; bit < w.length; bit++) {\n      var off = (bit / 26) | 0;\n      var wbit = bit % 26;\n\n      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;\n    }\n\n    return w;\n  }\n\n  // Number of trailing zero bits\n  BN.prototype.zeroBits = function zeroBits () {\n    if (this.isZero()) return 0;\n\n    var r = 0;\n    for (var i = 0; i < this.length; i++) {\n      var b = this._zeroBits(this.words[i]);\n      r += b;\n      if (b !== 26) break;\n    }\n    return r;\n  };\n\n  BN.prototype.byteLength = function byteLength () {\n    return Math.ceil(this.bitLength() / 8);\n  };\n\n  BN.prototype.toTwos = function toTwos (width) {\n    if (this.negative !== 0) {\n      return this.abs().inotn(width).iaddn(1);\n    }\n    return this.clone();\n  };\n\n  BN.prototype.fromTwos = function fromTwos (width) {\n    if (this.testn(width - 1)) {\n      return this.notn(width).iaddn(1).ineg();\n    }\n    return this.clone();\n  };\n\n  BN.prototype.isNeg = function isNeg () {\n    return this.negative !== 0;\n  };\n\n  // Return negative clone of `this`\n  BN.prototype.neg = function neg () {\n    return this.clone().ineg();\n  };\n\n  BN.prototype.ineg = function ineg () {\n    if (!this.isZero()) {\n      this.negative ^= 1;\n    }\n\n    return this;\n  };\n\n  // Or `num` with `this` in-place\n  BN.prototype.iuor = function iuor (num) {\n    while (this.length < num.length) {\n      this.words[this.length++] = 0;\n    }\n\n    for (var i = 0; i < num.length; i++) {\n      this.words[i] = this.words[i] | num.words[i];\n    }\n\n    return this.strip();\n  };\n\n  BN.prototype.ior = function ior (num) {\n    assert((this.negative | num.negative) === 0);\n    return this.iuor(num);\n  };\n\n  // Or `num` with `this`\n  BN.prototype.or = function or (num) {\n    if (this.length > num.length) return this.clone().ior(num);\n    return num.clone().ior(this);\n  };\n\n  BN.prototype.uor = function uor (num) {\n    if (this.length > num.length) return this.clone().iuor(num);\n    return num.clone().iuor(this);\n  };\n\n  // And `num` with `this` in-place\n  BN.prototype.iuand = function iuand (num) {\n    // b = min-length(num, this)\n    var b;\n    if (this.length > num.length) {\n      b = num;\n    } else {\n      b = this;\n    }\n\n    for (var i = 0; i < b.length; i++) {\n      this.words[i] = this.words[i] & num.words[i];\n    }\n\n    this.length = b.length;\n\n    return this.strip();\n  };\n\n  BN.prototype.iand = function iand (num) {\n    assert((this.negative | num.negative) === 0);\n    return this.iuand(num);\n  };\n\n  // And `num` with `this`\n  BN.prototype.and = function and (num) {\n    if (this.length > num.length) return this.clone().iand(num);\n    return num.clone().iand(this);\n  };\n\n  BN.prototype.uand = function uand (num) {\n    if (this.length > num.length) return this.clone().iuand(num);\n    return num.clone().iuand(this);\n  };\n\n  // Xor `num` with `this` in-place\n  BN.prototype.iuxor = function iuxor (num) {\n    // a.length > b.length\n    var a;\n    var b;\n    if (this.length > num.length) {\n      a = this;\n      b = num;\n    } else {\n      a = num;\n      b = this;\n    }\n\n    for (var i = 0; i < b.length; i++) {\n      this.words[i] = a.words[i] ^ b.words[i];\n    }\n\n    if (this !== a) {\n      for (; i < a.length; i++) {\n        this.words[i] = a.words[i];\n      }\n    }\n\n    this.length = a.length;\n\n    return this.strip();\n  };\n\n  BN.prototype.ixor = function ixor (num) {\n    assert((this.negative | num.negative) === 0);\n    return this.iuxor(num);\n  };\n\n  // Xor `num` with `this`\n  BN.prototype.xor = function xor (num) {\n    if (this.length > num.length) return this.clone().ixor(num);\n    return num.clone().ixor(this);\n  };\n\n  BN.prototype.uxor = function uxor (num) {\n    if (this.length > num.length) return this.clone().iuxor(num);\n    return num.clone().iuxor(this);\n  };\n\n  // Not ``this`` with ``width`` bitwidth\n  BN.prototype.inotn = function inotn (width) {\n    assert(typeof width === 'number' && width >= 0);\n\n    var bytesNeeded = Math.ceil(width / 26) | 0;\n    var bitsLeft = width % 26;\n\n    // Extend the buffer with leading zeroes\n    this._expand(bytesNeeded);\n\n    if (bitsLeft > 0) {\n      bytesNeeded--;\n    }\n\n    // Handle complete words\n    for (var i = 0; i < bytesNeeded; i++) {\n      this.words[i] = ~this.words[i] & 0x3ffffff;\n    }\n\n    // Handle the residue\n    if (bitsLeft > 0) {\n      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));\n    }\n\n    // And remove leading zeroes\n    return this.strip();\n  };\n\n  BN.prototype.notn = function notn (width) {\n    return this.clone().inotn(width);\n  };\n\n  // Set `bit` of `this`\n  BN.prototype.setn = function setn (bit, val) {\n    assert(typeof bit === 'number' && bit >= 0);\n\n    var off = (bit / 26) | 0;\n    var wbit = bit % 26;\n\n    this._expand(off + 1);\n\n    if (val) {\n      this.words[off] = this.words[off] | (1 << wbit);\n    } else {\n      this.words[off] = this.words[off] & ~(1 << wbit);\n    }\n\n    return this.strip();\n  };\n\n  // Add `num` to `this` in-place\n  BN.prototype.iadd = function iadd (num) {\n    var r;\n\n    // negative + positive\n    if (this.negative !== 0 && num.negative === 0) {\n      this.negative = 0;\n      r = this.isub(num);\n      this.negative ^= 1;\n      return this._normSign();\n\n    // positive + negative\n    } else if (this.negative === 0 && num.negative !== 0) {\n      num.negative = 0;\n      r = this.isub(num);\n      num.negative = 1;\n      return r._normSign();\n    }\n\n    // a.length > b.length\n    var a, b;\n    if (this.length > num.length) {\n      a = this;\n      b = num;\n    } else {\n      a = num;\n      b = this;\n    }\n\n    var carry = 0;\n    for (var i = 0; i < b.length; i++) {\n      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;\n      this.words[i] = r & 0x3ffffff;\n      carry = r >>> 26;\n    }\n    for (; carry !== 0 && i < a.length; i++) {\n      r = (a.words[i] | 0) + carry;\n      this.words[i] = r & 0x3ffffff;\n      carry = r >>> 26;\n    }\n\n    this.length = a.length;\n    if (carry !== 0) {\n      this.words[this.length] = carry;\n      this.length++;\n    // Copy the rest of the words\n    } else if (a !== this) {\n      for (; i < a.length; i++) {\n        this.words[i] = a.words[i];\n      }\n    }\n\n    return this;\n  };\n\n  // Add `num` to `this`\n  BN.prototype.add = function add (num) {\n    var res;\n    if (num.negative !== 0 && this.negative === 0) {\n      num.negative = 0;\n      res = this.sub(num);\n      num.negative ^= 1;\n      return res;\n    } else if (num.negative === 0 && this.negative !== 0) {\n      this.negative = 0;\n      res = num.sub(this);\n      this.negative = 1;\n      return res;\n    }\n\n    if (this.length > num.length) return this.clone().iadd(num);\n\n    return num.clone().iadd(this);\n  };\n\n  // Subtract `num` from `this` in-place\n  BN.prototype.isub = function isub (num) {\n    // this - (-num) = this + num\n    if (num.negative !== 0) {\n      num.negative = 0;\n      var r = this.iadd(num);\n      num.negative = 1;\n      return r._normSign();\n\n    // -this - num = -(this + num)\n    } else if (this.negative !== 0) {\n      this.negative = 0;\n      this.iadd(num);\n      this.negative = 1;\n      return this._normSign();\n    }\n\n    // At this point both numbers are positive\n    var cmp = this.cmp(num);\n\n    // Optimization - zeroify\n    if (cmp === 0) {\n      this.negative = 0;\n      this.length = 1;\n      this.words[0] = 0;\n      return this;\n    }\n\n    // a > b\n    var a, b;\n    if (cmp > 0) {\n      a = this;\n      b = num;\n    } else {\n      a = num;\n      b = this;\n    }\n\n    var carry = 0;\n    for (var i = 0; i < b.length; i++) {\n      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;\n      carry = r >> 26;\n      this.words[i] = r & 0x3ffffff;\n    }\n    for (; carry !== 0 && i < a.length; i++) {\n      r = (a.words[i] | 0) + carry;\n      carry = r >> 26;\n      this.words[i] = r & 0x3ffffff;\n    }\n\n    // Copy rest of the words\n    if (carry === 0 && i < a.length && a !== this) {\n      for (; i < a.length; i++) {\n        this.words[i] = a.words[i];\n      }\n    }\n\n    this.length = Math.max(this.length, i);\n\n    if (a !== this) {\n      this.negative = 1;\n    }\n\n    return this.strip();\n  };\n\n  // Subtract `num` from `this`\n  BN.prototype.sub = function sub (num) {\n    return this.clone().isub(num);\n  };\n\n  function smallMulTo (self, num, out) {\n    out.negative = num.negative ^ self.negative;\n    var len = (self.length + num.length) | 0;\n    out.length = len;\n    len = (len - 1) | 0;\n\n    // Peel one iteration (compiler can't do it, because of code complexity)\n    var a = self.words[0] | 0;\n    var b = num.words[0] | 0;\n    var r = a * b;\n\n    var lo = r & 0x3ffffff;\n    var carry = (r / 0x4000000) | 0;\n    out.words[0] = lo;\n\n    for (var k = 1; k < len; k++) {\n      // Sum all words with the same `i + j = k` and accumulate `ncarry`,\n      // note that ncarry could be >= 0x3ffffff\n      var ncarry = carry >>> 26;\n      var rword = carry & 0x3ffffff;\n      var maxJ = Math.min(k, num.length - 1);\n      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {\n        var i = (k - j) | 0;\n        a = self.words[i] | 0;\n        b = num.words[j] | 0;\n        r = a * b + rword;\n        ncarry += (r / 0x4000000) | 0;\n        rword = r & 0x3ffffff;\n      }\n      out.words[k] = rword | 0;\n      carry = ncarry | 0;\n    }\n    if (carry !== 0) {\n      out.words[k] = carry | 0;\n    } else {\n      out.length--;\n    }\n\n    return out.strip();\n  }\n\n  // TODO(indutny): it may be reasonable to omit it for users who don't need\n  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit\n  // multiplication (like elliptic secp256k1).\n  var comb10MulTo = function comb10MulTo (self, num, out) {\n    var a = self.words;\n    var b = num.words;\n    var o = out.words;\n    var c = 0;\n    var lo;\n    var mid;\n    var hi;\n    var a0 = a[0] | 0;\n    var al0 = a0 & 0x1fff;\n    var ah0 = a0 >>> 13;\n    var a1 = a[1] | 0;\n    var al1 = a1 & 0x1fff;\n    var ah1 = a1 >>> 13;\n    var a2 = a[2] | 0;\n    var al2 = a2 & 0x1fff;\n    var ah2 = a2 >>> 13;\n    var a3 = a[3] | 0;\n    var al3 = a3 & 0x1fff;\n    var ah3 = a3 >>> 13;\n    var a4 = a[4] | 0;\n    var al4 = a4 & 0x1fff;\n    var ah4 = a4 >>> 13;\n    var a5 = a[5] | 0;\n    var al5 = a5 & 0x1fff;\n    var ah5 = a5 >>> 13;\n    var a6 = a[6] | 0;\n    var al6 = a6 & 0x1fff;\n    var ah6 = a6 >>> 13;\n    var a7 = a[7] | 0;\n    var al7 = a7 & 0x1fff;\n    var ah7 = a7 >>> 13;\n    var a8 = a[8] | 0;\n    var al8 = a8 & 0x1fff;\n    var ah8 = a8 >>> 13;\n    var a9 = a[9] | 0;\n    var al9 = a9 & 0x1fff;\n    var ah9 = a9 >>> 13;\n    var b0 = b[0] | 0;\n    var bl0 = b0 & 0x1fff;\n    var bh0 = b0 >>> 13;\n    var b1 = b[1] | 0;\n    var bl1 = b1 & 0x1fff;\n    var bh1 = b1 >>> 13;\n    var b2 = b[2] | 0;\n    var bl2 = b2 & 0x1fff;\n    var bh2 = b2 >>> 13;\n    var b3 = b[3] | 0;\n    var bl3 = b3 & 0x1fff;\n    var bh3 = b3 >>> 13;\n    var b4 = b[4] | 0;\n    var bl4 = b4 & 0x1fff;\n    var bh4 = b4 >>> 13;\n    var b5 = b[5] | 0;\n    var bl5 = b5 & 0x1fff;\n    var bh5 = b5 >>> 13;\n    var b6 = b[6] | 0;\n    var bl6 = b6 & 0x1fff;\n    var bh6 = b6 >>> 13;\n    var b7 = b[7] | 0;\n    var bl7 = b7 & 0x1fff;\n    var bh7 = b7 >>> 13;\n    var b8 = b[8] | 0;\n    var bl8 = b8 & 0x1fff;\n    var bh8 = b8 >>> 13;\n    var b9 = b[9] | 0;\n    var bl9 = b9 & 0x1fff;\n    var bh9 = b9 >>> 13;\n\n    out.negative = self.negative ^ num.negative;\n    out.length = 19;\n    /* k = 0 */\n    lo = Math.imul(al0, bl0);\n    mid = Math.imul(al0, bh0);\n    mid = (mid + Math.imul(ah0, bl0)) | 0;\n    hi = Math.imul(ah0, bh0);\n    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;\n    w0 &= 0x3ffffff;\n    /* k = 1 */\n    lo = Math.imul(al1, bl0);\n    mid = Math.imul(al1, bh0);\n    mid = (mid + Math.imul(ah1, bl0)) | 0;\n    hi = Math.imul(ah1, bh0);\n    lo = (lo + Math.imul(al0, bl1)) | 0;\n    mid = (mid + Math.imul(al0, bh1)) | 0;\n    mid = (mid + Math.imul(ah0, bl1)) | 0;\n    hi = (hi + Math.imul(ah0, bh1)) | 0;\n    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;\n    w1 &= 0x3ffffff;\n    /* k = 2 */\n    lo = Math.imul(al2, bl0);\n    mid = Math.imul(al2, bh0);\n    mid = (mid + Math.imul(ah2, bl0)) | 0;\n    hi = Math.imul(ah2, bh0);\n    lo = (lo + Math.imul(al1, bl1)) | 0;\n    mid = (mid + Math.imul(al1, bh1)) | 0;\n    mid = (mid + Math.imul(ah1, bl1)) | 0;\n    hi = (hi + Math.imul(ah1, bh1)) | 0;\n    lo = (lo + Math.imul(al0, bl2)) | 0;\n    mid = (mid + Math.imul(al0, bh2)) | 0;\n    mid = (mid + Math.imul(ah0, bl2)) | 0;\n    hi = (hi + Math.imul(ah0, bh2)) | 0;\n    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;\n    w2 &= 0x3ffffff;\n    /* k = 3 */\n    lo = Math.imul(al3, bl0);\n    mid = Math.imul(al3, bh0);\n    mid = (mid + Math.imul(ah3, bl0)) | 0;\n    hi = Math.imul(ah3, bh0);\n    lo = (lo + Math.imul(al2, bl1)) | 0;\n    mid = (mid + Math.imul(al2, bh1)) | 0;\n    mid = (mid + Math.imul(ah2, bl1)) | 0;\n    hi = (hi + Math.imul(ah2, bh1)) | 0;\n    lo = (lo + Math.imul(al1, bl2)) | 0;\n    mid = (mid + Math.imul(al1, bh2)) | 0;\n    mid = (mid + Math.imul(ah1, bl2)) | 0;\n    hi = (hi + Math.imul(ah1, bh2)) | 0;\n    lo = (lo + Math.imul(al0, bl3)) | 0;\n    mid = (mid + Math.imul(al0, bh3)) | 0;\n    mid = (mid + Math.imul(ah0, bl3)) | 0;\n    hi = (hi + Math.imul(ah0, bh3)) | 0;\n    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;\n    w3 &= 0x3ffffff;\n    /* k = 4 */\n    lo = Math.imul(al4, bl0);\n    mid = Math.imul(al4, bh0);\n    mid = (mid + Math.imul(ah4, bl0)) | 0;\n    hi = Math.imul(ah4, bh0);\n    lo = (lo + Math.imul(al3, bl1)) | 0;\n    mid = (mid + Math.imul(al3, bh1)) | 0;\n    mid = (mid + Math.imul(ah3, bl1)) | 0;\n    hi = (hi + Math.imul(ah3, bh1)) | 0;\n    lo = (lo + Math.imul(al2, bl2)) | 0;\n    mid = (mid + Math.imul(al2, bh2)) | 0;\n    mid = (mid + Math.imul(ah2, bl2)) | 0;\n    hi = (hi + Math.imul(ah2, bh2)) | 0;\n    lo = (lo + Math.imul(al1, bl3)) | 0;\n    mid = (mid + Math.imul(al1, bh3)) | 0;\n    mid = (mid + Math.imul(ah1, bl3)) | 0;\n    hi = (hi + Math.imul(ah1, bh3)) | 0;\n    lo = (lo + Math.imul(al0, bl4)) | 0;\n    mid = (mid + Math.imul(al0, bh4)) | 0;\n    mid = (mid + Math.imul(ah0, bl4)) | 0;\n    hi = (hi + Math.imul(ah0, bh4)) | 0;\n    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;\n    w4 &= 0x3ffffff;\n    /* k = 5 */\n    lo = Math.imul(al5, bl0);\n    mid = Math.imul(al5, bh0);\n    mid = (mid + Math.imul(ah5, bl0)) | 0;\n    hi = Math.imul(ah5, bh0);\n    lo = (lo + Math.imul(al4, bl1)) | 0;\n    mid = (mid + Math.imul(al4, bh1)) | 0;\n    mid = (mid + Math.imul(ah4, bl1)) | 0;\n    hi = (hi + Math.imul(ah4, bh1)) | 0;\n    lo = (lo + Math.imul(al3, bl2)) | 0;\n    mid = (mid + Math.imul(al3, bh2)) | 0;\n    mid = (mid + Math.imul(ah3, bl2)) | 0;\n    hi = (hi + Math.imul(ah3, bh2)) | 0;\n    lo = (lo + Math.imul(al2, bl3)) | 0;\n    mid = (mid + Math.imul(al2, bh3)) | 0;\n    mid = (mid + Math.imul(ah2, bl3)) | 0;\n    hi = (hi + Math.imul(ah2, bh3)) | 0;\n    lo = (lo + Math.imul(al1, bl4)) | 0;\n    mid = (mid + Math.imul(al1, bh4)) | 0;\n    mid = (mid + Math.imul(ah1, bl4)) | 0;\n    hi = (hi + Math.imul(ah1, bh4)) | 0;\n    lo = (lo + Math.imul(al0, bl5)) | 0;\n    mid = (mid + Math.imul(al0, bh5)) | 0;\n    mid = (mid + Math.imul(ah0, bl5)) | 0;\n    hi = (hi + Math.imul(ah0, bh5)) | 0;\n    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;\n    w5 &= 0x3ffffff;\n    /* k = 6 */\n    lo = Math.imul(al6, bl0);\n    mid = Math.imul(al6, bh0);\n    mid = (mid + Math.imul(ah6, bl0)) | 0;\n    hi = Math.imul(ah6, bh0);\n    lo = (lo + Math.imul(al5, bl1)) | 0;\n    mid = (mid + Math.imul(al5, bh1)) | 0;\n    mid = (mid + Math.imul(ah5, bl1)) | 0;\n    hi = (hi + Math.imul(ah5, bh1)) | 0;\n    lo = (lo + Math.imul(al4, bl2)) | 0;\n    mid = (mid + Math.imul(al4, bh2)) | 0;\n    mid = (mid + Math.imul(ah4, bl2)) | 0;\n    hi = (hi + Math.imul(ah4, bh2)) | 0;\n    lo = (lo + Math.imul(al3, bl3)) | 0;\n    mid = (mid + Math.imul(al3, bh3)) | 0;\n    mid = (mid + Math.imul(ah3, bl3)) | 0;\n    hi = (hi + Math.imul(ah3, bh3)) | 0;\n    lo = (lo + Math.imul(al2, bl4)) | 0;\n    mid = (mid + Math.imul(al2, bh4)) | 0;\n    mid = (mid + Math.imul(ah2, bl4)) | 0;\n    hi = (hi + Math.imul(ah2, bh4)) | 0;\n    lo = (lo + Math.imul(al1, bl5)) | 0;\n    mid = (mid + Math.imul(al1, bh5)) | 0;\n    mid = (mid + Math.imul(ah1, bl5)) | 0;\n    hi = (hi + Math.imul(ah1, bh5)) | 0;\n    lo = (lo + Math.imul(al0, bl6)) | 0;\n    mid = (mid + Math.imul(al0, bh6)) | 0;\n    mid = (mid + Math.imul(ah0, bl6)) | 0;\n    hi = (hi + Math.imul(ah0, bh6)) | 0;\n    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;\n    w6 &= 0x3ffffff;\n    /* k = 7 */\n    lo = Math.imul(al7, bl0);\n    mid = Math.imul(al7, bh0);\n    mid = (mid + Math.imul(ah7, bl0)) | 0;\n    hi = Math.imul(ah7, bh0);\n    lo = (lo + Math.imul(al6, bl1)) | 0;\n    mid = (mid + Math.imul(al6, bh1)) | 0;\n    mid = (mid + Math.imul(ah6, bl1)) | 0;\n    hi = (hi + Math.imul(ah6, bh1)) | 0;\n    lo = (lo + Math.imul(al5, bl2)) | 0;\n    mid = (mid + Math.imul(al5, bh2)) | 0;\n    mid = (mid + Math.imul(ah5, bl2)) | 0;\n    hi = (hi + Math.imul(ah5, bh2)) | 0;\n    lo = (lo + Math.imul(al4, bl3)) | 0;\n    mid = (mid + Math.imul(al4, bh3)) | 0;\n    mid = (mid + Math.imul(ah4, bl3)) | 0;\n    hi = (hi + Math.imul(ah4, bh3)) | 0;\n    lo = (lo + Math.imul(al3, bl4)) | 0;\n    mid = (mid + Math.imul(al3, bh4)) | 0;\n    mid = (mid + Math.imul(ah3, bl4)) | 0;\n    hi = (hi + Math.imul(ah3, bh4)) | 0;\n    lo = (lo + Math.imul(al2, bl5)) | 0;\n    mid = (mid + Math.imul(al2, bh5)) | 0;\n    mid = (mid + Math.imul(ah2, bl5)) | 0;\n    hi = (hi + Math.imul(ah2, bh5)) | 0;\n    lo = (lo + Math.imul(al1, bl6)) | 0;\n    mid = (mid + Math.imul(al1, bh6)) | 0;\n    mid = (mid + Math.imul(ah1, bl6)) | 0;\n    hi = (hi + Math.imul(ah1, bh6)) | 0;\n    lo = (lo + Math.imul(al0, bl7)) | 0;\n    mid = (mid + Math.imul(al0, bh7)) | 0;\n    mid = (mid + Math.imul(ah0, bl7)) | 0;\n    hi = (hi + Math.imul(ah0, bh7)) | 0;\n    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;\n    w7 &= 0x3ffffff;\n    /* k = 8 */\n    lo = Math.imul(al8, bl0);\n    mid = Math.imul(al8, bh0);\n    mid = (mid + Math.imul(ah8, bl0)) | 0;\n    hi = Math.imul(ah8, bh0);\n    lo = (lo + Math.imul(al7, bl1)) | 0;\n    mid = (mid + Math.imul(al7, bh1)) | 0;\n    mid = (mid + Math.imul(ah7, bl1)) | 0;\n    hi = (hi + Math.imul(ah7, bh1)) | 0;\n    lo = (lo + Math.imul(al6, bl2)) | 0;\n    mid = (mid + Math.imul(al6, bh2)) | 0;\n    mid = (mid + Math.imul(ah6, bl2)) | 0;\n    hi = (hi + Math.imul(ah6, bh2)) | 0;\n    lo = (lo + Math.imul(al5, bl3)) | 0;\n    mid = (mid + Math.imul(al5, bh3)) | 0;\n    mid = (mid + Math.imul(ah5, bl3)) | 0;\n    hi = (hi + Math.imul(ah5, bh3)) | 0;\n    lo = (lo + Math.imul(al4, bl4)) | 0;\n    mid = (mid + Math.imul(al4, bh4)) | 0;\n    mid = (mid + Math.imul(ah4, bl4)) | 0;\n    hi = (hi + Math.imul(ah4, bh4)) | 0;\n    lo = (lo + Math.imul(al3, bl5)) | 0;\n    mid = (mid + Math.imul(al3, bh5)) | 0;\n    mid = (mid + Math.imul(ah3, bl5)) | 0;\n    hi = (hi + Math.imul(ah3, bh5)) | 0;\n    lo = (lo + Math.imul(al2, bl6)) | 0;\n    mid = (mid + Math.imul(al2, bh6)) | 0;\n    mid = (mid + Math.imul(ah2, bl6)) | 0;\n    hi = (hi + Math.imul(ah2, bh6)) | 0;\n    lo = (lo + Math.imul(al1, bl7)) | 0;\n    mid = (mid + Math.imul(al1, bh7)) | 0;\n    mid = (mid + Math.imul(ah1, bl7)) | 0;\n    hi = (hi + Math.imul(ah1, bh7)) | 0;\n    lo = (lo + Math.imul(al0, bl8)) | 0;\n    mid = (mid + Math.imul(al0, bh8)) | 0;\n    mid = (mid + Math.imul(ah0, bl8)) | 0;\n    hi = (hi + Math.imul(ah0, bh8)) | 0;\n    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;\n    w8 &= 0x3ffffff;\n    /* k = 9 */\n    lo = Math.imul(al9, bl0);\n    mid = Math.imul(al9, bh0);\n    mid = (mid + Math.imul(ah9, bl0)) | 0;\n    hi = Math.imul(ah9, bh0);\n    lo = (lo + Math.imul(al8, bl1)) | 0;\n    mid = (mid + Math.imul(al8, bh1)) | 0;\n    mid = (mid + Math.imul(ah8, bl1)) | 0;\n    hi = (hi + Math.imul(ah8, bh1)) | 0;\n    lo = (lo + Math.imul(al7, bl2)) | 0;\n    mid = (mid + Math.imul(al7, bh2)) | 0;\n    mid = (mid + Math.imul(ah7, bl2)) | 0;\n    hi = (hi + Math.imul(ah7, bh2)) | 0;\n    lo = (lo + Math.imul(al6, bl3)) | 0;\n    mid = (mid + Math.imul(al6, bh3)) | 0;\n    mid = (mid + Math.imul(ah6, bl3)) | 0;\n    hi = (hi + Math.imul(ah6, bh3)) | 0;\n    lo = (lo + Math.imul(al5, bl4)) | 0;\n    mid = (mid + Math.imul(al5, bh4)) | 0;\n    mid = (mid + Math.imul(ah5, bl4)) | 0;\n    hi = (hi + Math.imul(ah5, bh4)) | 0;\n    lo = (lo + Math.imul(al4, bl5)) | 0;\n    mid = (mid + Math.imul(al4, bh5)) | 0;\n    mid = (mid + Math.imul(ah4, bl5)) | 0;\n    hi = (hi + Math.imul(ah4, bh5)) | 0;\n    lo = (lo + Math.imul(al3, bl6)) | 0;\n    mid = (mid + Math.imul(al3, bh6)) | 0;\n    mid = (mid + Math.imul(ah3, bl6)) | 0;\n    hi = (hi + Math.imul(ah3, bh6)) | 0;\n    lo = (lo + Math.imul(al2, bl7)) | 0;\n    mid = (mid + Math.imul(al2, bh7)) | 0;\n    mid = (mid + Math.imul(ah2, bl7)) | 0;\n    hi = (hi + Math.imul(ah2, bh7)) | 0;\n    lo = (lo + Math.imul(al1, bl8)) | 0;\n    mid = (mid + Math.imul(al1, bh8)) | 0;\n    mid = (mid + Math.imul(ah1, bl8)) | 0;\n    hi = (hi + Math.imul(ah1, bh8)) | 0;\n    lo = (lo + Math.imul(al0, bl9)) | 0;\n    mid = (mid + Math.imul(al0, bh9)) | 0;\n    mid = (mid + Math.imul(ah0, bl9)) | 0;\n    hi = (hi + Math.imul(ah0, bh9)) | 0;\n    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;\n    w9 &= 0x3ffffff;\n    /* k = 10 */\n    lo = Math.imul(al9, bl1);\n    mid = Math.imul(al9, bh1);\n    mid = (mid + Math.imul(ah9, bl1)) | 0;\n    hi = Math.imul(ah9, bh1);\n    lo = (lo + Math.imul(al8, bl2)) | 0;\n    mid = (mid + Math.imul(al8, bh2)) | 0;\n    mid = (mid + Math.imul(ah8, bl2)) | 0;\n    hi = (hi + Math.imul(ah8, bh2)) | 0;\n    lo = (lo + Math.imul(al7, bl3)) | 0;\n    mid = (mid + Math.imul(al7, bh3)) | 0;\n    mid = (mid + Math.imul(ah7, bl3)) | 0;\n    hi = (hi + Math.imul(ah7, bh3)) | 0;\n    lo = (lo + Math.imul(al6, bl4)) | 0;\n    mid = (mid + Math.imul(al6, bh4)) | 0;\n    mid = (mid + Math.imul(ah6, bl4)) | 0;\n    hi = (hi + Math.imul(ah6, bh4)) | 0;\n    lo = (lo + Math.imul(al5, bl5)) | 0;\n    mid = (mid + Math.imul(al5, bh5)) | 0;\n    mid = (mid + Math.imul(ah5, bl5)) | 0;\n    hi = (hi + Math.imul(ah5, bh5)) | 0;\n    lo = (lo + Math.imul(al4, bl6)) | 0;\n    mid = (mid + Math.imul(al4, bh6)) | 0;\n    mid = (mid + Math.imul(ah4, bl6)) | 0;\n    hi = (hi + Math.imul(ah4, bh6)) | 0;\n    lo = (lo + Math.imul(al3, bl7)) | 0;\n    mid = (mid + Math.imul(al3, bh7)) | 0;\n    mid = (mid + Math.imul(ah3, bl7)) | 0;\n    hi = (hi + Math.imul(ah3, bh7)) | 0;\n    lo = (lo + Math.imul(al2, bl8)) | 0;\n    mid = (mid + Math.imul(al2, bh8)) | 0;\n    mid = (mid + Math.imul(ah2, bl8)) | 0;\n    hi = (hi + Math.imul(ah2, bh8)) | 0;\n    lo = (lo + Math.imul(al1, bl9)) | 0;\n    mid = (mid + Math.imul(al1, bh9)) | 0;\n    mid = (mid + Math.imul(ah1, bl9)) | 0;\n    hi = (hi + Math.imul(ah1, bh9)) | 0;\n    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;\n    w10 &= 0x3ffffff;\n    /* k = 11 */\n    lo = Math.imul(al9, bl2);\n    mid = Math.imul(al9, bh2);\n    mid = (mid + Math.imul(ah9, bl2)) | 0;\n    hi = Math.imul(ah9, bh2);\n    lo = (lo + Math.imul(al8, bl3)) | 0;\n    mid = (mid + Math.imul(al8, bh3)) | 0;\n    mid = (mid + Math.imul(ah8, bl3)) | 0;\n    hi = (hi + Math.imul(ah8, bh3)) | 0;\n    lo = (lo + Math.imul(al7, bl4)) | 0;\n    mid = (mid + Math.imul(al7, bh4)) | 0;\n    mid = (mid + Math.imul(ah7, bl4)) | 0;\n    hi = (hi + Math.imul(ah7, bh4)) | 0;\n    lo = (lo + Math.imul(al6, bl5)) | 0;\n    mid = (mid + Math.imul(al6, bh5)) | 0;\n    mid = (mid + Math.imul(ah6, bl5)) | 0;\n    hi = (hi + Math.imul(ah6, bh5)) | 0;\n    lo = (lo + Math.imul(al5, bl6)) | 0;\n    mid = (mid + Math.imul(al5, bh6)) | 0;\n    mid = (mid + Math.imul(ah5, bl6)) | 0;\n    hi = (hi + Math.imul(ah5, bh6)) | 0;\n    lo = (lo + Math.imul(al4, bl7)) | 0;\n    mid = (mid + Math.imul(al4, bh7)) | 0;\n    mid = (mid + Math.imul(ah4, bl7)) | 0;\n    hi = (hi + Math.imul(ah4, bh7)) | 0;\n    lo = (lo + Math.imul(al3, bl8)) | 0;\n    mid = (mid + Math.imul(al3, bh8)) | 0;\n    mid = (mid + Math.imul(ah3, bl8)) | 0;\n    hi = (hi + Math.imul(ah3, bh8)) | 0;\n    lo = (lo + Math.imul(al2, bl9)) | 0;\n    mid = (mid + Math.imul(al2, bh9)) | 0;\n    mid = (mid + Math.imul(ah2, bl9)) | 0;\n    hi = (hi + Math.imul(ah2, bh9)) | 0;\n    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;\n    w11 &= 0x3ffffff;\n    /* k = 12 */\n    lo = Math.imul(al9, bl3);\n    mid = Math.imul(al9, bh3);\n    mid = (mid + Math.imul(ah9, bl3)) | 0;\n    hi = Math.imul(ah9, bh3);\n    lo = (lo + Math.imul(al8, bl4)) | 0;\n    mid = (mid + Math.imul(al8, bh4)) | 0;\n    mid = (mid + Math.imul(ah8, bl4)) | 0;\n    hi = (hi + Math.imul(ah8, bh4)) | 0;\n    lo = (lo + Math.imul(al7, bl5)) | 0;\n    mid = (mid + Math.imul(al7, bh5)) | 0;\n    mid = (mid + Math.imul(ah7, bl5)) | 0;\n    hi = (hi + Math.imul(ah7, bh5)) | 0;\n    lo = (lo + Math.imul(al6, bl6)) | 0;\n    mid = (mid + Math.imul(al6, bh6)) | 0;\n    mid = (mid + Math.imul(ah6, bl6)) | 0;\n    hi = (hi + Math.imul(ah6, bh6)) | 0;\n    lo = (lo + Math.imul(al5, bl7)) | 0;\n    mid = (mid + Math.imul(al5, bh7)) | 0;\n    mid = (mid + Math.imul(ah5, bl7)) | 0;\n    hi = (hi + Math.imul(ah5, bh7)) | 0;\n    lo = (lo + Math.imul(al4, bl8)) | 0;\n    mid = (mid + Math.imul(al4, bh8)) | 0;\n    mid = (mid + Math.imul(ah4, bl8)) | 0;\n    hi = (hi + Math.imul(ah4, bh8)) | 0;\n    lo = (lo + Math.imul(al3, bl9)) | 0;\n    mid = (mid + Math.imul(al3, bh9)) | 0;\n    mid = (mid + Math.imul(ah3, bl9)) | 0;\n    hi = (hi + Math.imul(ah3, bh9)) | 0;\n    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;\n    w12 &= 0x3ffffff;\n    /* k = 13 */\n    lo = Math.imul(al9, bl4);\n    mid = Math.imul(al9, bh4);\n    mid = (mid + Math.imul(ah9, bl4)) | 0;\n    hi = Math.imul(ah9, bh4);\n    lo = (lo + Math.imul(al8, bl5)) | 0;\n    mid = (mid + Math.imul(al8, bh5)) | 0;\n    mid = (mid + Math.imul(ah8, bl5)) | 0;\n    hi = (hi + Math.imul(ah8, bh5)) | 0;\n    lo = (lo + Math.imul(al7, bl6)) | 0;\n    mid = (mid + Math.imul(al7, bh6)) | 0;\n    mid = (mid + Math.imul(ah7, bl6)) | 0;\n    hi = (hi + Math.imul(ah7, bh6)) | 0;\n    lo = (lo + Math.imul(al6, bl7)) | 0;\n    mid = (mid + Math.imul(al6, bh7)) | 0;\n    mid = (mid + Math.imul(ah6, bl7)) | 0;\n    hi = (hi + Math.imul(ah6, bh7)) | 0;\n    lo = (lo + Math.imul(al5, bl8)) | 0;\n    mid = (mid + Math.imul(al5, bh8)) | 0;\n    mid = (mid + Math.imul(ah5, bl8)) | 0;\n    hi = (hi + Math.imul(ah5, bh8)) | 0;\n    lo = (lo + Math.imul(al4, bl9)) | 0;\n    mid = (mid + Math.imul(al4, bh9)) | 0;\n    mid = (mid + Math.imul(ah4, bl9)) | 0;\n    hi = (hi + Math.imul(ah4, bh9)) | 0;\n    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;\n    w13 &= 0x3ffffff;\n    /* k = 14 */\n    lo = Math.imul(al9, bl5);\n    mid = Math.imul(al9, bh5);\n    mid = (mid + Math.imul(ah9, bl5)) | 0;\n    hi = Math.imul(ah9, bh5);\n    lo = (lo + Math.imul(al8, bl6)) | 0;\n    mid = (mid + Math.imul(al8, bh6)) | 0;\n    mid = (mid + Math.imul(ah8, bl6)) | 0;\n    hi = (hi + Math.imul(ah8, bh6)) | 0;\n    lo = (lo + Math.imul(al7, bl7)) | 0;\n    mid = (mid + Math.imul(al7, bh7)) | 0;\n    mid = (mid + Math.imul(ah7, bl7)) | 0;\n    hi = (hi + Math.imul(ah7, bh7)) | 0;\n    lo = (lo + Math.imul(al6, bl8)) | 0;\n    mid = (mid + Math.imul(al6, bh8)) | 0;\n    mid = (mid + Math.imul(ah6, bl8)) | 0;\n    hi = (hi + Math.imul(ah6, bh8)) | 0;\n    lo = (lo + Math.imul(al5, bl9)) | 0;\n    mid = (mid + Math.imul(al5, bh9)) | 0;\n    mid = (mid + Math.imul(ah5, bl9)) | 0;\n    hi = (hi + Math.imul(ah5, bh9)) | 0;\n    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;\n    w14 &= 0x3ffffff;\n    /* k = 15 */\n    lo = Math.imul(al9, bl6);\n    mid = Math.imul(al9, bh6);\n    mid = (mid + Math.imul(ah9, bl6)) | 0;\n    hi = Math.imul(ah9, bh6);\n    lo = (lo + Math.imul(al8, bl7)) | 0;\n    mid = (mid + Math.imul(al8, bh7)) | 0;\n    mid = (mid + Math.imul(ah8, bl7)) | 0;\n    hi = (hi + Math.imul(ah8, bh7)) | 0;\n    lo = (lo + Math.imul(al7, bl8)) | 0;\n    mid = (mid + Math.imul(al7, bh8)) | 0;\n    mid = (mid + Math.imul(ah7, bl8)) | 0;\n    hi = (hi + Math.imul(ah7, bh8)) | 0;\n    lo = (lo + Math.imul(al6, bl9)) | 0;\n    mid = (mid + Math.imul(al6, bh9)) | 0;\n    mid = (mid + Math.imul(ah6, bl9)) | 0;\n    hi = (hi + Math.imul(ah6, bh9)) | 0;\n    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;\n    w15 &= 0x3ffffff;\n    /* k = 16 */\n    lo = Math.imul(al9, bl7);\n    mid = Math.imul(al9, bh7);\n    mid = (mid + Math.imul(ah9, bl7)) | 0;\n    hi = Math.imul(ah9, bh7);\n    lo = (lo + Math.imul(al8, bl8)) | 0;\n    mid = (mid + Math.imul(al8, bh8)) | 0;\n    mid = (mid + Math.imul(ah8, bl8)) | 0;\n    hi = (hi + Math.imul(ah8, bh8)) | 0;\n    lo = (lo + Math.imul(al7, bl9)) | 0;\n    mid = (mid + Math.imul(al7, bh9)) | 0;\n    mid = (mid + Math.imul(ah7, bl9)) | 0;\n    hi = (hi + Math.imul(ah7, bh9)) | 0;\n    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;\n    w16 &= 0x3ffffff;\n    /* k = 17 */\n    lo = Math.imul(al9, bl8);\n    mid = Math.imul(al9, bh8);\n    mid = (mid + Math.imul(ah9, bl8)) | 0;\n    hi = Math.imul(ah9, bh8);\n    lo = (lo + Math.imul(al8, bl9)) | 0;\n    mid = (mid + Math.imul(al8, bh9)) | 0;\n    mid = (mid + Math.imul(ah8, bl9)) | 0;\n    hi = (hi + Math.imul(ah8, bh9)) | 0;\n    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;\n    w17 &= 0x3ffffff;\n    /* k = 18 */\n    lo = Math.imul(al9, bl9);\n    mid = Math.imul(al9, bh9);\n    mid = (mid + Math.imul(ah9, bl9)) | 0;\n    hi = Math.imul(ah9, bh9);\n    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;\n    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;\n    w18 &= 0x3ffffff;\n    o[0] = w0;\n    o[1] = w1;\n    o[2] = w2;\n    o[3] = w3;\n    o[4] = w4;\n    o[5] = w5;\n    o[6] = w6;\n    o[7] = w7;\n    o[8] = w8;\n    o[9] = w9;\n    o[10] = w10;\n    o[11] = w11;\n    o[12] = w12;\n    o[13] = w13;\n    o[14] = w14;\n    o[15] = w15;\n    o[16] = w16;\n    o[17] = w17;\n    o[18] = w18;\n    if (c !== 0) {\n      o[19] = c;\n      out.length++;\n    }\n    return out;\n  };\n\n  // Polyfill comb\n  if (!Math.imul) {\n    comb10MulTo = smallMulTo;\n  }\n\n  function bigMulTo (self, num, out) {\n    out.negative = num.negative ^ self.negative;\n    out.length = self.length + num.length;\n\n    var carry = 0;\n    var hncarry = 0;\n    for (var k = 0; k < out.length - 1; k++) {\n      // Sum all words with the same `i + j = k` and accumulate `ncarry`,\n      // note that ncarry could be >= 0x3ffffff\n      var ncarry = hncarry;\n      hncarry = 0;\n      var rword = carry & 0x3ffffff;\n      var maxJ = Math.min(k, num.length - 1);\n      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {\n        var i = k - j;\n        var a = self.words[i] | 0;\n        var b = num.words[j] | 0;\n        var r = a * b;\n\n        var lo = r & 0x3ffffff;\n        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;\n        lo = (lo + rword) | 0;\n        rword = lo & 0x3ffffff;\n        ncarry = (ncarry + (lo >>> 26)) | 0;\n\n        hncarry += ncarry >>> 26;\n        ncarry &= 0x3ffffff;\n      }\n      out.words[k] = rword;\n      carry = ncarry;\n      ncarry = hncarry;\n    }\n    if (carry !== 0) {\n      out.words[k] = carry;\n    } else {\n      out.length--;\n    }\n\n    return out.strip();\n  }\n\n  function jumboMulTo (self, num, out) {\n    var fftm = new FFTM();\n    return fftm.mulp(self, num, out);\n  }\n\n  BN.prototype.mulTo = function mulTo (num, out) {\n    var res;\n    var len = this.length + num.length;\n    if (this.length === 10 && num.length === 10) {\n      res = comb10MulTo(this, num, out);\n    } else if (len < 63) {\n      res = smallMulTo(this, num, out);\n    } else if (len < 1024) {\n      res = bigMulTo(this, num, out);\n    } else {\n      res = jumboMulTo(this, num, out);\n    }\n\n    return res;\n  };\n\n  // Cooley-Tukey algorithm for FFT\n  // slightly revisited to rely on looping instead of recursion\n\n  function FFTM (x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  FFTM.prototype.makeRBT = function makeRBT (N) {\n    var t = new Array(N);\n    var l = BN.prototype._countBits(N) - 1;\n    for (var i = 0; i < N; i++) {\n      t[i] = this.revBin(i, l, N);\n    }\n\n    return t;\n  };\n\n  // Returns binary-reversed representation of `x`\n  FFTM.prototype.revBin = function revBin (x, l, N) {\n    if (x === 0 || x === N - 1) return x;\n\n    var rb = 0;\n    for (var i = 0; i < l; i++) {\n      rb |= (x & 1) << (l - i - 1);\n      x >>= 1;\n    }\n\n    return rb;\n  };\n\n  // Performs \"tweedling\" phase, therefore 'emulating'\n  // behaviour of the recursive algorithm\n  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {\n    for (var i = 0; i < N; i++) {\n      rtws[i] = rws[rbt[i]];\n      itws[i] = iws[rbt[i]];\n    }\n  };\n\n  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {\n    this.permute(rbt, rws, iws, rtws, itws, N);\n\n    for (var s = 1; s < N; s <<= 1) {\n      var l = s << 1;\n\n      var rtwdf = Math.cos(2 * Math.PI / l);\n      var itwdf = Math.sin(2 * Math.PI / l);\n\n      for (var p = 0; p < N; p += l) {\n        var rtwdf_ = rtwdf;\n        var itwdf_ = itwdf;\n\n        for (var j = 0; j < s; j++) {\n          var re = rtws[p + j];\n          var ie = itws[p + j];\n\n          var ro = rtws[p + j + s];\n          var io = itws[p + j + s];\n\n          var rx = rtwdf_ * ro - itwdf_ * io;\n\n          io = rtwdf_ * io + itwdf_ * ro;\n          ro = rx;\n\n          rtws[p + j] = re + ro;\n          itws[p + j] = ie + io;\n\n          rtws[p + j + s] = re - ro;\n          itws[p + j + s] = ie - io;\n\n          /* jshint maxdepth : false */\n          if (j !== l) {\n            rx = rtwdf * rtwdf_ - itwdf * itwdf_;\n\n            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;\n            rtwdf_ = rx;\n          }\n        }\n      }\n    }\n  };\n\n  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {\n    var N = Math.max(m, n) | 1;\n    var odd = N & 1;\n    var i = 0;\n    for (N = N / 2 | 0; N; N = N >>> 1) {\n      i++;\n    }\n\n    return 1 << i + 1 + odd;\n  };\n\n  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {\n    if (N <= 1) return;\n\n    for (var i = 0; i < N / 2; i++) {\n      var t = rws[i];\n\n      rws[i] = rws[N - i - 1];\n      rws[N - i - 1] = t;\n\n      t = iws[i];\n\n      iws[i] = -iws[N - i - 1];\n      iws[N - i - 1] = -t;\n    }\n  };\n\n  FFTM.prototype.normalize13b = function normalize13b (ws, N) {\n    var carry = 0;\n    for (var i = 0; i < N / 2; i++) {\n      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +\n        Math.round(ws[2 * i] / N) +\n        carry;\n\n      ws[i] = w & 0x3ffffff;\n\n      if (w < 0x4000000) {\n        carry = 0;\n      } else {\n        carry = w / 0x4000000 | 0;\n      }\n    }\n\n    return ws;\n  };\n\n  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {\n    var carry = 0;\n    for (var i = 0; i < len; i++) {\n      carry = carry + (ws[i] | 0);\n\n      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;\n      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;\n    }\n\n    // Pad with zeroes\n    for (i = 2 * len; i < N; ++i) {\n      rws[i] = 0;\n    }\n\n    assert(carry === 0);\n    assert((carry & ~0x1fff) === 0);\n  };\n\n  FFTM.prototype.stub = function stub (N) {\n    var ph = new Array(N);\n    for (var i = 0; i < N; i++) {\n      ph[i] = 0;\n    }\n\n    return ph;\n  };\n\n  FFTM.prototype.mulp = function mulp (x, y, out) {\n    var N = 2 * this.guessLen13b(x.length, y.length);\n\n    var rbt = this.makeRBT(N);\n\n    var _ = this.stub(N);\n\n    var rws = new Array(N);\n    var rwst = new Array(N);\n    var iwst = new Array(N);\n\n    var nrws = new Array(N);\n    var nrwst = new Array(N);\n    var niwst = new Array(N);\n\n    var rmws = out.words;\n    rmws.length = N;\n\n    this.convert13b(x.words, x.length, rws, N);\n    this.convert13b(y.words, y.length, nrws, N);\n\n    this.transform(rws, _, rwst, iwst, N, rbt);\n    this.transform(nrws, _, nrwst, niwst, N, rbt);\n\n    for (var i = 0; i < N; i++) {\n      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];\n      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];\n      rwst[i] = rx;\n    }\n\n    this.conjugate(rwst, iwst, N);\n    this.transform(rwst, iwst, rmws, _, N, rbt);\n    this.conjugate(rmws, _, N);\n    this.normalize13b(rmws, N);\n\n    out.negative = x.negative ^ y.negative;\n    out.length = x.length + y.length;\n    return out.strip();\n  };\n\n  // Multiply `this` by `num`\n  BN.prototype.mul = function mul (num) {\n    var out = new BN(null);\n    out.words = new Array(this.length + num.length);\n    return this.mulTo(num, out);\n  };\n\n  // Multiply employing FFT\n  BN.prototype.mulf = function mulf (num) {\n    var out = new BN(null);\n    out.words = new Array(this.length + num.length);\n    return jumboMulTo(this, num, out);\n  };\n\n  // In-place Multiplication\n  BN.prototype.imul = function imul (num) {\n    return this.clone().mulTo(num, this);\n  };\n\n  BN.prototype.imuln = function imuln (num) {\n    assert(typeof num === 'number');\n    assert(num < 0x4000000);\n\n    // Carry\n    var carry = 0;\n    for (var i = 0; i < this.length; i++) {\n      var w = (this.words[i] | 0) * num;\n      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);\n      carry >>= 26;\n      carry += (w / 0x4000000) | 0;\n      // NOTE: lo is 27bit maximum\n      carry += lo >>> 26;\n      this.words[i] = lo & 0x3ffffff;\n    }\n\n    if (carry !== 0) {\n      this.words[i] = carry;\n      this.length++;\n    }\n\n    return this;\n  };\n\n  BN.prototype.muln = function muln (num) {\n    return this.clone().imuln(num);\n  };\n\n  // `this` * `this`\n  BN.prototype.sqr = function sqr () {\n    return this.mul(this);\n  };\n\n  // `this` * `this` in-place\n  BN.prototype.isqr = function isqr () {\n    return this.imul(this.clone());\n  };\n\n  // Math.pow(`this`, `num`)\n  BN.prototype.pow = function pow (num) {\n    var w = toBitArray(num);\n    if (w.length === 0) return new BN(1);\n\n    // Skip leading zeroes\n    var res = this;\n    for (var i = 0; i < w.length; i++, res = res.sqr()) {\n      if (w[i] !== 0) break;\n    }\n\n    if (++i < w.length) {\n      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {\n        if (w[i] === 0) continue;\n\n        res = res.mul(q);\n      }\n    }\n\n    return res;\n  };\n\n  // Shift-left in-place\n  BN.prototype.iushln = function iushln (bits) {\n    assert(typeof bits === 'number' && bits >= 0);\n    var r = bits % 26;\n    var s = (bits - r) / 26;\n    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);\n    var i;\n\n    if (r !== 0) {\n      var carry = 0;\n\n      for (i = 0; i < this.length; i++) {\n        var newCarry = this.words[i] & carryMask;\n        var c = ((this.words[i] | 0) - newCarry) << r;\n        this.words[i] = c | carry;\n        carry = newCarry >>> (26 - r);\n      }\n\n      if (carry) {\n        this.words[i] = carry;\n        this.length++;\n      }\n    }\n\n    if (s !== 0) {\n      for (i = this.length - 1; i >= 0; i--) {\n        this.words[i + s] = this.words[i];\n      }\n\n      for (i = 0; i < s; i++) {\n        this.words[i] = 0;\n      }\n\n      this.length += s;\n    }\n\n    return this.strip();\n  };\n\n  BN.prototype.ishln = function ishln (bits) {\n    // TODO(indutny): implement me\n    assert(this.negative === 0);\n    return this.iushln(bits);\n  };\n\n  // Shift-right in-place\n  // NOTE: `hint` is a lowest bit before trailing zeroes\n  // NOTE: if `extended` is present - it will be filled with destroyed bits\n  BN.prototype.iushrn = function iushrn (bits, hint, extended) {\n    assert(typeof bits === 'number' && bits >= 0);\n    var h;\n    if (hint) {\n      h = (hint - (hint % 26)) / 26;\n    } else {\n      h = 0;\n    }\n\n    var r = bits % 26;\n    var s = Math.min((bits - r) / 26, this.length);\n    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);\n    var maskedWords = extended;\n\n    h -= s;\n    h = Math.max(0, h);\n\n    // Extended mode, copy masked part\n    if (maskedWords) {\n      for (var i = 0; i < s; i++) {\n        maskedWords.words[i] = this.words[i];\n      }\n      maskedWords.length = s;\n    }\n\n    if (s === 0) {\n      // No-op, we should not move anything at all\n    } else if (this.length > s) {\n      this.length -= s;\n      for (i = 0; i < this.length; i++) {\n        this.words[i] = this.words[i + s];\n      }\n    } else {\n      this.words[0] = 0;\n      this.length = 1;\n    }\n\n    var carry = 0;\n    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {\n      var word = this.words[i] | 0;\n      this.words[i] = (carry << (26 - r)) | (word >>> r);\n      carry = word & mask;\n    }\n\n    // Push carried bits as a mask\n    if (maskedWords && carry !== 0) {\n      maskedWords.words[maskedWords.length++] = carry;\n    }\n\n    if (this.length === 0) {\n      this.words[0] = 0;\n      this.length = 1;\n    }\n\n    return this.strip();\n  };\n\n  BN.prototype.ishrn = function ishrn (bits, hint, extended) {\n    // TODO(indutny): implement me\n    assert(this.negative === 0);\n    return this.iushrn(bits, hint, extended);\n  };\n\n  // Shift-left\n  BN.prototype.shln = function shln (bits) {\n    return this.clone().ishln(bits);\n  };\n\n  BN.prototype.ushln = function ushln (bits) {\n    return this.clone().iushln(bits);\n  };\n\n  // Shift-right\n  BN.prototype.shrn = function shrn (bits) {\n    return this.clone().ishrn(bits);\n  };\n\n  BN.prototype.ushrn = function ushrn (bits) {\n    return this.clone().iushrn(bits);\n  };\n\n  // Test if n bit is set\n  BN.prototype.testn = function testn (bit) {\n    assert(typeof bit === 'number' && bit >= 0);\n    var r = bit % 26;\n    var s = (bit - r) / 26;\n    var q = 1 << r;\n\n    // Fast case: bit is much higher than all existing words\n    if (this.length <= s) return false;\n\n    // Check bit and return\n    var w = this.words[s];\n\n    return !!(w & q);\n  };\n\n  // Return only lowers bits of number (in-place)\n  BN.prototype.imaskn = function imaskn (bits) {\n    assert(typeof bits === 'number' && bits >= 0);\n    var r = bits % 26;\n    var s = (bits - r) / 26;\n\n    assert(this.negative === 0, 'imaskn works only with positive numbers');\n\n    if (this.length <= s) {\n      return this;\n    }\n\n    if (r !== 0) {\n      s++;\n    }\n    this.length = Math.min(s, this.length);\n\n    if (r !== 0) {\n      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);\n      this.words[this.length - 1] &= mask;\n    }\n\n    return this.strip();\n  };\n\n  // Return only lowers bits of number\n  BN.prototype.maskn = function maskn (bits) {\n    return this.clone().imaskn(bits);\n  };\n\n  // Add plain number `num` to `this`\n  BN.prototype.iaddn = function iaddn (num) {\n    assert(typeof num === 'number');\n    assert(num < 0x4000000);\n    if (num < 0) return this.isubn(-num);\n\n    // Possible sign change\n    if (this.negative !== 0) {\n      if (this.length === 1 && (this.words[0] | 0) < num) {\n        this.words[0] = num - (this.words[0] | 0);\n        this.negative = 0;\n        return this;\n      }\n\n      this.negative = 0;\n      this.isubn(num);\n      this.negative = 1;\n      return this;\n    }\n\n    // Add without checks\n    return this._iaddn(num);\n  };\n\n  BN.prototype._iaddn = function _iaddn (num) {\n    this.words[0] += num;\n\n    // Carry\n    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {\n      this.words[i] -= 0x4000000;\n      if (i === this.length - 1) {\n        this.words[i + 1] = 1;\n      } else {\n        this.words[i + 1]++;\n      }\n    }\n    this.length = Math.max(this.length, i + 1);\n\n    return this;\n  };\n\n  // Subtract plain number `num` from `this`\n  BN.prototype.isubn = function isubn (num) {\n    assert(typeof num === 'number');\n    assert(num < 0x4000000);\n    if (num < 0) return this.iaddn(-num);\n\n    if (this.negative !== 0) {\n      this.negative = 0;\n      this.iaddn(num);\n      this.negative = 1;\n      return this;\n    }\n\n    this.words[0] -= num;\n\n    if (this.length === 1 && this.words[0] < 0) {\n      this.words[0] = -this.words[0];\n      this.negative = 1;\n    } else {\n      // Carry\n      for (var i = 0; i < this.length && this.words[i] < 0; i++) {\n        this.words[i] += 0x4000000;\n        this.words[i + 1] -= 1;\n      }\n    }\n\n    return this.strip();\n  };\n\n  BN.prototype.addn = function addn (num) {\n    return this.clone().iaddn(num);\n  };\n\n  BN.prototype.subn = function subn (num) {\n    return this.clone().isubn(num);\n  };\n\n  BN.prototype.iabs = function iabs () {\n    this.negative = 0;\n\n    return this;\n  };\n\n  BN.prototype.abs = function abs () {\n    return this.clone().iabs();\n  };\n\n  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {\n    var len = num.length + shift;\n    var i;\n\n    this._expand(len);\n\n    var w;\n    var carry = 0;\n    for (i = 0; i < num.length; i++) {\n      w = (this.words[i + shift] | 0) + carry;\n      var right = (num.words[i] | 0) * mul;\n      w -= right & 0x3ffffff;\n      carry = (w >> 26) - ((right / 0x4000000) | 0);\n      this.words[i + shift] = w & 0x3ffffff;\n    }\n    for (; i < this.length - shift; i++) {\n      w = (this.words[i + shift] | 0) + carry;\n      carry = w >> 26;\n      this.words[i + shift] = w & 0x3ffffff;\n    }\n\n    if (carry === 0) return this.strip();\n\n    // Subtraction overflow\n    assert(carry === -1);\n    carry = 0;\n    for (i = 0; i < this.length; i++) {\n      w = -(this.words[i] | 0) + carry;\n      carry = w >> 26;\n      this.words[i] = w & 0x3ffffff;\n    }\n    this.negative = 1;\n\n    return this.strip();\n  };\n\n  BN.prototype._wordDiv = function _wordDiv (num, mode) {\n    var shift = this.length - num.length;\n\n    var a = this.clone();\n    var b = num;\n\n    // Normalize\n    var bhi = b.words[b.length - 1] | 0;\n    var bhiBits = this._countBits(bhi);\n    shift = 26 - bhiBits;\n    if (shift !== 0) {\n      b = b.ushln(shift);\n      a.iushln(shift);\n      bhi = b.words[b.length - 1] | 0;\n    }\n\n    // Initialize quotient\n    var m = a.length - b.length;\n    var q;\n\n    if (mode !== 'mod') {\n      q = new BN(null);\n      q.length = m + 1;\n      q.words = new Array(q.length);\n      for (var i = 0; i < q.length; i++) {\n        q.words[i] = 0;\n      }\n    }\n\n    var diff = a.clone()._ishlnsubmul(b, 1, m);\n    if (diff.negative === 0) {\n      a = diff;\n      if (q) {\n        q.words[m] = 1;\n      }\n    }\n\n    for (var j = m - 1; j >= 0; j--) {\n      var qj = (a.words[b.length + j] | 0) * 0x4000000 +\n        (a.words[b.length + j - 1] | 0);\n\n      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max\n      // (0x7ffffff)\n      qj = Math.min((qj / bhi) | 0, 0x3ffffff);\n\n      a._ishlnsubmul(b, qj, j);\n      while (a.negative !== 0) {\n        qj--;\n        a.negative = 0;\n        a._ishlnsubmul(b, 1, j);\n        if (!a.isZero()) {\n          a.negative ^= 1;\n        }\n      }\n      if (q) {\n        q.words[j] = qj;\n      }\n    }\n    if (q) {\n      q.strip();\n    }\n    a.strip();\n\n    // Denormalize\n    if (mode !== 'div' && shift !== 0) {\n      a.iushrn(shift);\n    }\n\n    return {\n      div: q || null,\n      mod: a\n    };\n  };\n\n  // NOTE: 1) `mode` can be set to `mod` to request mod only,\n  //       to `div` to request div only, or be absent to\n  //       request both div & mod\n  //       2) `positive` is true if unsigned mod is requested\n  BN.prototype.divmod = function divmod (num, mode, positive) {\n    assert(!num.isZero());\n\n    if (this.isZero()) {\n      return {\n        div: new BN(0),\n        mod: new BN(0)\n      };\n    }\n\n    var div, mod, res;\n    if (this.negative !== 0 && num.negative === 0) {\n      res = this.neg().divmod(num, mode);\n\n      if (mode !== 'mod') {\n        div = res.div.neg();\n      }\n\n      if (mode !== 'div') {\n        mod = res.mod.neg();\n        if (positive && mod.negative !== 0) {\n          mod.iadd(num);\n        }\n      }\n\n      return {\n        div: div,\n        mod: mod\n      };\n    }\n\n    if (this.negative === 0 && num.negative !== 0) {\n      res = this.divmod(num.neg(), mode);\n\n      if (mode !== 'mod') {\n        div = res.div.neg();\n      }\n\n      return {\n        div: div,\n        mod: res.mod\n      };\n    }\n\n    if ((this.negative & num.negative) !== 0) {\n      res = this.neg().divmod(num.neg(), mode);\n\n      if (mode !== 'div') {\n        mod = res.mod.neg();\n        if (positive && mod.negative !== 0) {\n          mod.isub(num);\n        }\n      }\n\n      return {\n        div: res.div,\n        mod: mod\n      };\n    }\n\n    // Both numbers are positive at this point\n\n    // Strip both numbers to approximate shift value\n    if (num.length > this.length || this.cmp(num) < 0) {\n      return {\n        div: new BN(0),\n        mod: this\n      };\n    }\n\n    // Very short reduction\n    if (num.length === 1) {\n      if (mode === 'div') {\n        return {\n          div: this.divn(num.words[0]),\n          mod: null\n        };\n      }\n\n      if (mode === 'mod') {\n        return {\n          div: null,\n          mod: new BN(this.modn(num.words[0]))\n        };\n      }\n\n      return {\n        div: this.divn(num.words[0]),\n        mod: new BN(this.modn(num.words[0]))\n      };\n    }\n\n    return this._wordDiv(num, mode);\n  };\n\n  // Find `this` / `num`\n  BN.prototype.div = function div (num) {\n    return this.divmod(num, 'div', false).div;\n  };\n\n  // Find `this` % `num`\n  BN.prototype.mod = function mod (num) {\n    return this.divmod(num, 'mod', false).mod;\n  };\n\n  BN.prototype.umod = function umod (num) {\n    return this.divmod(num, 'mod', true).mod;\n  };\n\n  // Find Round(`this` / `num`)\n  BN.prototype.divRound = function divRound (num) {\n    var dm = this.divmod(num);\n\n    // Fast case - exact division\n    if (dm.mod.isZero()) return dm.div;\n\n    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;\n\n    var half = num.ushrn(1);\n    var r2 = num.andln(1);\n    var cmp = mod.cmp(half);\n\n    // Round down\n    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;\n\n    // Round up\n    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);\n  };\n\n  BN.prototype.modn = function modn (num) {\n    assert(num <= 0x3ffffff);\n    var p = (1 << 26) % num;\n\n    var acc = 0;\n    for (var i = this.length - 1; i >= 0; i--) {\n      acc = (p * acc + (this.words[i] | 0)) % num;\n    }\n\n    return acc;\n  };\n\n  // In-place division by number\n  BN.prototype.idivn = function idivn (num) {\n    assert(num <= 0x3ffffff);\n\n    var carry = 0;\n    for (var i = this.length - 1; i >= 0; i--) {\n      var w = (this.words[i] | 0) + carry * 0x4000000;\n      this.words[i] = (w / num) | 0;\n      carry = w % num;\n    }\n\n    return this.strip();\n  };\n\n  BN.prototype.divn = function divn (num) {\n    return this.clone().idivn(num);\n  };\n\n  BN.prototype.egcd = function egcd (p) {\n    assert(p.negative === 0);\n    assert(!p.isZero());\n\n    var x = this;\n    var y = p.clone();\n\n    if (x.negative !== 0) {\n      x = x.umod(p);\n    } else {\n      x = x.clone();\n    }\n\n    // A * x + B * y = x\n    var A = new BN(1);\n    var B = new BN(0);\n\n    // C * x + D * y = y\n    var C = new BN(0);\n    var D = new BN(1);\n\n    var g = 0;\n\n    while (x.isEven() && y.isEven()) {\n      x.iushrn(1);\n      y.iushrn(1);\n      ++g;\n    }\n\n    var yp = y.clone();\n    var xp = x.clone();\n\n    while (!x.isZero()) {\n      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);\n      if (i > 0) {\n        x.iushrn(i);\n        while (i-- > 0) {\n          if (A.isOdd() || B.isOdd()) {\n            A.iadd(yp);\n            B.isub(xp);\n          }\n\n          A.iushrn(1);\n          B.iushrn(1);\n        }\n      }\n\n      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);\n      if (j > 0) {\n        y.iushrn(j);\n        while (j-- > 0) {\n          if (C.isOdd() || D.isOdd()) {\n            C.iadd(yp);\n            D.isub(xp);\n          }\n\n          C.iushrn(1);\n          D.iushrn(1);\n        }\n      }\n\n      if (x.cmp(y) >= 0) {\n        x.isub(y);\n        A.isub(C);\n        B.isub(D);\n      } else {\n        y.isub(x);\n        C.isub(A);\n        D.isub(B);\n      }\n    }\n\n    return {\n      a: C,\n      b: D,\n      gcd: y.iushln(g)\n    };\n  };\n\n  // This is reduced incarnation of the binary EEA\n  // above, designated to invert members of the\n  // _prime_ fields F(p) at a maximal speed\n  BN.prototype._invmp = function _invmp (p) {\n    assert(p.negative === 0);\n    assert(!p.isZero());\n\n    var a = this;\n    var b = p.clone();\n\n    if (a.negative !== 0) {\n      a = a.umod(p);\n    } else {\n      a = a.clone();\n    }\n\n    var x1 = new BN(1);\n    var x2 = new BN(0);\n\n    var delta = b.clone();\n\n    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {\n      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);\n      if (i > 0) {\n        a.iushrn(i);\n        while (i-- > 0) {\n          if (x1.isOdd()) {\n            x1.iadd(delta);\n          }\n\n          x1.iushrn(1);\n        }\n      }\n\n      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);\n      if (j > 0) {\n        b.iushrn(j);\n        while (j-- > 0) {\n          if (x2.isOdd()) {\n            x2.iadd(delta);\n          }\n\n          x2.iushrn(1);\n        }\n      }\n\n      if (a.cmp(b) >= 0) {\n        a.isub(b);\n        x1.isub(x2);\n      } else {\n        b.isub(a);\n        x2.isub(x1);\n      }\n    }\n\n    var res;\n    if (a.cmpn(1) === 0) {\n      res = x1;\n    } else {\n      res = x2;\n    }\n\n    if (res.cmpn(0) < 0) {\n      res.iadd(p);\n    }\n\n    return res;\n  };\n\n  BN.prototype.gcd = function gcd (num) {\n    if (this.isZero()) return num.abs();\n    if (num.isZero()) return this.abs();\n\n    var a = this.clone();\n    var b = num.clone();\n    a.negative = 0;\n    b.negative = 0;\n\n    // Remove common factor of two\n    for (var shift = 0; a.isEven() && b.isEven(); shift++) {\n      a.iushrn(1);\n      b.iushrn(1);\n    }\n\n    do {\n      while (a.isEven()) {\n        a.iushrn(1);\n      }\n      while (b.isEven()) {\n        b.iushrn(1);\n      }\n\n      var r = a.cmp(b);\n      if (r < 0) {\n        // Swap `a` and `b` to make `a` always bigger than `b`\n        var t = a;\n        a = b;\n        b = t;\n      } else if (r === 0 || b.cmpn(1) === 0) {\n        break;\n      }\n\n      a.isub(b);\n    } while (true);\n\n    return b.iushln(shift);\n  };\n\n  // Invert number in the field F(num)\n  BN.prototype.invm = function invm (num) {\n    return this.egcd(num).a.umod(num);\n  };\n\n  BN.prototype.isEven = function isEven () {\n    return (this.words[0] & 1) === 0;\n  };\n\n  BN.prototype.isOdd = function isOdd () {\n    return (this.words[0] & 1) === 1;\n  };\n\n  // And first word and num\n  BN.prototype.andln = function andln (num) {\n    return this.words[0] & num;\n  };\n\n  // Increment at the bit position in-line\n  BN.prototype.bincn = function bincn (bit) {\n    assert(typeof bit === 'number');\n    var r = bit % 26;\n    var s = (bit - r) / 26;\n    var q = 1 << r;\n\n    // Fast case: bit is much higher than all existing words\n    if (this.length <= s) {\n      this._expand(s + 1);\n      this.words[s] |= q;\n      return this;\n    }\n\n    // Add bit and propagate, if needed\n    var carry = q;\n    for (var i = s; carry !== 0 && i < this.length; i++) {\n      var w = this.words[i] | 0;\n      w += carry;\n      carry = w >>> 26;\n      w &= 0x3ffffff;\n      this.words[i] = w;\n    }\n    if (carry !== 0) {\n      this.words[i] = carry;\n      this.length++;\n    }\n    return this;\n  };\n\n  BN.prototype.isZero = function isZero () {\n    return this.length === 1 && this.words[0] === 0;\n  };\n\n  BN.prototype.cmpn = function cmpn (num) {\n    var negative = num < 0;\n\n    if (this.negative !== 0 && !negative) return -1;\n    if (this.negative === 0 && negative) return 1;\n\n    this.strip();\n\n    var res;\n    if (this.length > 1) {\n      res = 1;\n    } else {\n      if (negative) {\n        num = -num;\n      }\n\n      assert(num <= 0x3ffffff, 'Number is too big');\n\n      var w = this.words[0] | 0;\n      res = w === num ? 0 : w < num ? -1 : 1;\n    }\n    if (this.negative !== 0) return -res | 0;\n    return res;\n  };\n\n  // Compare two numbers and return:\n  // 1 - if `this` > `num`\n  // 0 - if `this` == `num`\n  // -1 - if `this` < `num`\n  BN.prototype.cmp = function cmp (num) {\n    if (this.negative !== 0 && num.negative === 0) return -1;\n    if (this.negative === 0 && num.negative !== 0) return 1;\n\n    var res = this.ucmp(num);\n    if (this.negative !== 0) return -res | 0;\n    return res;\n  };\n\n  // Unsigned comparison\n  BN.prototype.ucmp = function ucmp (num) {\n    // At this point both numbers have the same sign\n    if (this.length > num.length) return 1;\n    if (this.length < num.length) return -1;\n\n    var res = 0;\n    for (var i = this.length - 1; i >= 0; i--) {\n      var a = this.words[i] | 0;\n      var b = num.words[i] | 0;\n\n      if (a === b) continue;\n      if (a < b) {\n        res = -1;\n      } else if (a > b) {\n        res = 1;\n      }\n      break;\n    }\n    return res;\n  };\n\n  BN.prototype.gtn = function gtn (num) {\n    return this.cmpn(num) === 1;\n  };\n\n  BN.prototype.gt = function gt (num) {\n    return this.cmp(num) === 1;\n  };\n\n  BN.prototype.gten = function gten (num) {\n    return this.cmpn(num) >= 0;\n  };\n\n  BN.prototype.gte = function gte (num) {\n    return this.cmp(num) >= 0;\n  };\n\n  BN.prototype.ltn = function ltn (num) {\n    return this.cmpn(num) === -1;\n  };\n\n  BN.prototype.lt = function lt (num) {\n    return this.cmp(num) === -1;\n  };\n\n  BN.prototype.lten = function lten (num) {\n    return this.cmpn(num) <= 0;\n  };\n\n  BN.prototype.lte = function lte (num) {\n    return this.cmp(num) <= 0;\n  };\n\n  BN.prototype.eqn = function eqn (num) {\n    return this.cmpn(num) === 0;\n  };\n\n  BN.prototype.eq = function eq (num) {\n    return this.cmp(num) === 0;\n  };\n\n  //\n  // A reduce context, could be using montgomery or something better, depending\n  // on the `m` itself.\n  //\n  BN.red = function red (num) {\n    return new Red(num);\n  };\n\n  BN.prototype.toRed = function toRed (ctx) {\n    assert(!this.red, 'Already a number in reduction context');\n    assert(this.negative === 0, 'red works only with positives');\n    return ctx.convertTo(this)._forceRed(ctx);\n  };\n\n  BN.prototype.fromRed = function fromRed () {\n    assert(this.red, 'fromRed works only with numbers in reduction context');\n    return this.red.convertFrom(this);\n  };\n\n  BN.prototype._forceRed = function _forceRed (ctx) {\n    this.red = ctx;\n    return this;\n  };\n\n  BN.prototype.forceRed = function forceRed (ctx) {\n    assert(!this.red, 'Already a number in reduction context');\n    return this._forceRed(ctx);\n  };\n\n  BN.prototype.redAdd = function redAdd (num) {\n    assert(this.red, 'redAdd works only with red numbers');\n    return this.red.add(this, num);\n  };\n\n  BN.prototype.redIAdd = function redIAdd (num) {\n    assert(this.red, 'redIAdd works only with red numbers');\n    return this.red.iadd(this, num);\n  };\n\n  BN.prototype.redSub = function redSub (num) {\n    assert(this.red, 'redSub works only with red numbers');\n    return this.red.sub(this, num);\n  };\n\n  BN.prototype.redISub = function redISub (num) {\n    assert(this.red, 'redISub works only with red numbers');\n    return this.red.isub(this, num);\n  };\n\n  BN.prototype.redShl = function redShl (num) {\n    assert(this.red, 'redShl works only with red numbers');\n    return this.red.shl(this, num);\n  };\n\n  BN.prototype.redMul = function redMul (num) {\n    assert(this.red, 'redMul works only with red numbers');\n    this.red._verify2(this, num);\n    return this.red.mul(this, num);\n  };\n\n  BN.prototype.redIMul = function redIMul (num) {\n    assert(this.red, 'redMul works only with red numbers');\n    this.red._verify2(this, num);\n    return this.red.imul(this, num);\n  };\n\n  BN.prototype.redSqr = function redSqr () {\n    assert(this.red, 'redSqr works only with red numbers');\n    this.red._verify1(this);\n    return this.red.sqr(this);\n  };\n\n  BN.prototype.redISqr = function redISqr () {\n    assert(this.red, 'redISqr works only with red numbers');\n    this.red._verify1(this);\n    return this.red.isqr(this);\n  };\n\n  // Square root over p\n  BN.prototype.redSqrt = function redSqrt () {\n    assert(this.red, 'redSqrt works only with red numbers');\n    this.red._verify1(this);\n    return this.red.sqrt(this);\n  };\n\n  BN.prototype.redInvm = function redInvm () {\n    assert(this.red, 'redInvm works only with red numbers');\n    this.red._verify1(this);\n    return this.red.invm(this);\n  };\n\n  // Return negative clone of `this` % `red modulo`\n  BN.prototype.redNeg = function redNeg () {\n    assert(this.red, 'redNeg works only with red numbers');\n    this.red._verify1(this);\n    return this.red.neg(this);\n  };\n\n  BN.prototype.redPow = function redPow (num) {\n    assert(this.red && !num.red, 'redPow(normalNum)');\n    this.red._verify1(this);\n    return this.red.pow(this, num);\n  };\n\n  // Prime numbers with efficient reduction\n  var primes = {\n    k256: null,\n    p224: null,\n    p192: null,\n    p25519: null\n  };\n\n  // Pseudo-Mersenne prime\n  function MPrime (name, p) {\n    // P = 2 ^ N - K\n    this.name = name;\n    this.p = new BN(p, 16);\n    this.n = this.p.bitLength();\n    this.k = new BN(1).iushln(this.n).isub(this.p);\n\n    this.tmp = this._tmp();\n  }\n\n  MPrime.prototype._tmp = function _tmp () {\n    var tmp = new BN(null);\n    tmp.words = new Array(Math.ceil(this.n / 13));\n    return tmp;\n  };\n\n  MPrime.prototype.ireduce = function ireduce (num) {\n    // Assumes that `num` is less than `P^2`\n    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)\n    var r = num;\n    var rlen;\n\n    do {\n      this.split(r, this.tmp);\n      r = this.imulK(r);\n      r = r.iadd(this.tmp);\n      rlen = r.bitLength();\n    } while (rlen > this.n);\n\n    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);\n    if (cmp === 0) {\n      r.words[0] = 0;\n      r.length = 1;\n    } else if (cmp > 0) {\n      r.isub(this.p);\n    } else {\n      if (r.strip !== undefined) {\n        // r is BN v4 instance\n        r.strip();\n      } else {\n        // r is BN v5 instance\n        r._strip();\n      }\n    }\n\n    return r;\n  };\n\n  MPrime.prototype.split = function split (input, out) {\n    input.iushrn(this.n, 0, out);\n  };\n\n  MPrime.prototype.imulK = function imulK (num) {\n    return num.imul(this.k);\n  };\n\n  function K256 () {\n    MPrime.call(\n      this,\n      'k256',\n      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');\n  }\n  inherits(K256, MPrime);\n\n  K256.prototype.split = function split (input, output) {\n    // 256 = 9 * 26 + 22\n    var mask = 0x3fffff;\n\n    var outLen = Math.min(input.length, 9);\n    for (var i = 0; i < outLen; i++) {\n      output.words[i] = input.words[i];\n    }\n    output.length = outLen;\n\n    if (input.length <= 9) {\n      input.words[0] = 0;\n      input.length = 1;\n      return;\n    }\n\n    // Shift by 9 limbs\n    var prev = input.words[9];\n    output.words[output.length++] = prev & mask;\n\n    for (i = 10; i < input.length; i++) {\n      var next = input.words[i] | 0;\n      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);\n      prev = next;\n    }\n    prev >>>= 22;\n    input.words[i - 10] = prev;\n    if (prev === 0 && input.length > 10) {\n      input.length -= 10;\n    } else {\n      input.length -= 9;\n    }\n  };\n\n  K256.prototype.imulK = function imulK (num) {\n    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]\n    num.words[num.length] = 0;\n    num.words[num.length + 1] = 0;\n    num.length += 2;\n\n    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390\n    var lo = 0;\n    for (var i = 0; i < num.length; i++) {\n      var w = num.words[i] | 0;\n      lo += w * 0x3d1;\n      num.words[i] = lo & 0x3ffffff;\n      lo = w * 0x40 + ((lo / 0x4000000) | 0);\n    }\n\n    // Fast length reduction\n    if (num.words[num.length - 1] === 0) {\n      num.length--;\n      if (num.words[num.length - 1] === 0) {\n        num.length--;\n      }\n    }\n    return num;\n  };\n\n  function P224 () {\n    MPrime.call(\n      this,\n      'p224',\n      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');\n  }\n  inherits(P224, MPrime);\n\n  function P192 () {\n    MPrime.call(\n      this,\n      'p192',\n      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');\n  }\n  inherits(P192, MPrime);\n\n  function P25519 () {\n    // 2 ^ 255 - 19\n    MPrime.call(\n      this,\n      '25519',\n      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');\n  }\n  inherits(P25519, MPrime);\n\n  P25519.prototype.imulK = function imulK (num) {\n    // K = 0x13\n    var carry = 0;\n    for (var i = 0; i < num.length; i++) {\n      var hi = (num.words[i] | 0) * 0x13 + carry;\n      var lo = hi & 0x3ffffff;\n      hi >>>= 26;\n\n      num.words[i] = lo;\n      carry = hi;\n    }\n    if (carry !== 0) {\n      num.words[num.length++] = carry;\n    }\n    return num;\n  };\n\n  // Exported mostly for testing purposes, use plain name instead\n  BN._prime = function prime (name) {\n    // Cached version of prime\n    if (primes[name]) return primes[name];\n\n    var prime;\n    if (name === 'k256') {\n      prime = new K256();\n    } else if (name === 'p224') {\n      prime = new P224();\n    } else if (name === 'p192') {\n      prime = new P192();\n    } else if (name === 'p25519') {\n      prime = new P25519();\n    } else {\n      throw new Error('Unknown prime ' + name);\n    }\n    primes[name] = prime;\n\n    return prime;\n  };\n\n  //\n  // Base reduction engine\n  //\n  function Red (m) {\n    if (typeof m === 'string') {\n      var prime = BN._prime(m);\n      this.m = prime.p;\n      this.prime = prime;\n    } else {\n      assert(m.gtn(1), 'modulus must be greater than 1');\n      this.m = m;\n      this.prime = null;\n    }\n  }\n\n  Red.prototype._verify1 = function _verify1 (a) {\n    assert(a.negative === 0, 'red works only with positives');\n    assert(a.red, 'red works only with red numbers');\n  };\n\n  Red.prototype._verify2 = function _verify2 (a, b) {\n    assert((a.negative | b.negative) === 0, 'red works only with positives');\n    assert(a.red && a.red === b.red,\n      'red works only with red numbers');\n  };\n\n  Red.prototype.imod = function imod (a) {\n    if (this.prime) return this.prime.ireduce(a)._forceRed(this);\n    return a.umod(this.m)._forceRed(this);\n  };\n\n  Red.prototype.neg = function neg (a) {\n    if (a.isZero()) {\n      return a.clone();\n    }\n\n    return this.m.sub(a)._forceRed(this);\n  };\n\n  Red.prototype.add = function add (a, b) {\n    this._verify2(a, b);\n\n    var res = a.add(b);\n    if (res.cmp(this.m) >= 0) {\n      res.isub(this.m);\n    }\n    return res._forceRed(this);\n  };\n\n  Red.prototype.iadd = function iadd (a, b) {\n    this._verify2(a, b);\n\n    var res = a.iadd(b);\n    if (res.cmp(this.m) >= 0) {\n      res.isub(this.m);\n    }\n    return res;\n  };\n\n  Red.prototype.sub = function sub (a, b) {\n    this._verify2(a, b);\n\n    var res = a.sub(b);\n    if (res.cmpn(0) < 0) {\n      res.iadd(this.m);\n    }\n    return res._forceRed(this);\n  };\n\n  Red.prototype.isub = function isub (a, b) {\n    this._verify2(a, b);\n\n    var res = a.isub(b);\n    if (res.cmpn(0) < 0) {\n      res.iadd(this.m);\n    }\n    return res;\n  };\n\n  Red.prototype.shl = function shl (a, num) {\n    this._verify1(a);\n    return this.imod(a.ushln(num));\n  };\n\n  Red.prototype.imul = function imul (a, b) {\n    this._verify2(a, b);\n    return this.imod(a.imul(b));\n  };\n\n  Red.prototype.mul = function mul (a, b) {\n    this._verify2(a, b);\n    return this.imod(a.mul(b));\n  };\n\n  Red.prototype.isqr = function isqr (a) {\n    return this.imul(a, a.clone());\n  };\n\n  Red.prototype.sqr = function sqr (a) {\n    return this.mul(a, a);\n  };\n\n  Red.prototype.sqrt = function sqrt (a) {\n    if (a.isZero()) return a.clone();\n\n    var mod3 = this.m.andln(3);\n    assert(mod3 % 2 === 1);\n\n    // Fast case\n    if (mod3 === 3) {\n      var pow = this.m.add(new BN(1)).iushrn(2);\n      return this.pow(a, pow);\n    }\n\n    // Tonelli-Shanks algorithm (Totally unoptimized and slow)\n    //\n    // Find Q and S, that Q * 2 ^ S = (P - 1)\n    var q = this.m.subn(1);\n    var s = 0;\n    while (!q.isZero() && q.andln(1) === 0) {\n      s++;\n      q.iushrn(1);\n    }\n    assert(!q.isZero());\n\n    var one = new BN(1).toRed(this);\n    var nOne = one.redNeg();\n\n    // Find quadratic non-residue\n    // NOTE: Max is such because of generalized Riemann hypothesis.\n    var lpow = this.m.subn(1).iushrn(1);\n    var z = this.m.bitLength();\n    z = new BN(2 * z * z).toRed(this);\n\n    while (this.pow(z, lpow).cmp(nOne) !== 0) {\n      z.redIAdd(nOne);\n    }\n\n    var c = this.pow(z, q);\n    var r = this.pow(a, q.addn(1).iushrn(1));\n    var t = this.pow(a, q);\n    var m = s;\n    while (t.cmp(one) !== 0) {\n      var tmp = t;\n      for (var i = 0; tmp.cmp(one) !== 0; i++) {\n        tmp = tmp.redSqr();\n      }\n      assert(i < m);\n      var b = this.pow(c, new BN(1).iushln(m - i - 1));\n\n      r = r.redMul(b);\n      c = b.redSqr();\n      t = t.redMul(c);\n      m = i;\n    }\n\n    return r;\n  };\n\n  Red.prototype.invm = function invm (a) {\n    var inv = a._invmp(this.m);\n    if (inv.negative !== 0) {\n      inv.negative = 0;\n      return this.imod(inv).redNeg();\n    } else {\n      return this.imod(inv);\n    }\n  };\n\n  Red.prototype.pow = function pow (a, num) {\n    if (num.isZero()) return new BN(1).toRed(this);\n    if (num.cmpn(1) === 0) return a.clone();\n\n    var windowSize = 4;\n    var wnd = new Array(1 << windowSize);\n    wnd[0] = new BN(1).toRed(this);\n    wnd[1] = a;\n    for (var i = 2; i < wnd.length; i++) {\n      wnd[i] = this.mul(wnd[i - 1], a);\n    }\n\n    var res = wnd[0];\n    var current = 0;\n    var currentLen = 0;\n    var start = num.bitLength() % 26;\n    if (start === 0) {\n      start = 26;\n    }\n\n    for (i = num.length - 1; i >= 0; i--) {\n      var word = num.words[i];\n      for (var j = start - 1; j >= 0; j--) {\n        var bit = (word >> j) & 1;\n        if (res !== wnd[0]) {\n          res = this.sqr(res);\n        }\n\n        if (bit === 0 && current === 0) {\n          currentLen = 0;\n          continue;\n        }\n\n        current <<= 1;\n        current |= bit;\n        currentLen++;\n        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;\n\n        res = this.mul(res, wnd[current]);\n        currentLen = 0;\n        current = 0;\n      }\n      start = 26;\n    }\n\n    return res;\n  };\n\n  Red.prototype.convertTo = function convertTo (num) {\n    var r = num.umod(this.m);\n\n    return r === num ? r.clone() : r;\n  };\n\n  Red.prototype.convertFrom = function convertFrom (num) {\n    var res = num.clone();\n    res.red = null;\n    return res;\n  };\n\n  //\n  // Montgomery method engine\n  //\n\n  BN.mont = function mont (num) {\n    return new Mont(num);\n  };\n\n  function Mont (m) {\n    Red.call(this, m);\n\n    this.shift = this.m.bitLength();\n    if (this.shift % 26 !== 0) {\n      this.shift += 26 - (this.shift % 26);\n    }\n\n    this.r = new BN(1).iushln(this.shift);\n    this.r2 = this.imod(this.r.sqr());\n    this.rinv = this.r._invmp(this.m);\n\n    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);\n    this.minv = this.minv.umod(this.r);\n    this.minv = this.r.sub(this.minv);\n  }\n  inherits(Mont, Red);\n\n  Mont.prototype.convertTo = function convertTo (num) {\n    return this.imod(num.ushln(this.shift));\n  };\n\n  Mont.prototype.convertFrom = function convertFrom (num) {\n    var r = this.imod(num.mul(this.rinv));\n    r.red = null;\n    return r;\n  };\n\n  Mont.prototype.imul = function imul (a, b) {\n    if (a.isZero() || b.isZero()) {\n      a.words[0] = 0;\n      a.length = 1;\n      return a;\n    }\n\n    var t = a.imul(b);\n    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);\n    var u = t.isub(c).iushrn(this.shift);\n    var res = u;\n\n    if (u.cmp(this.m) >= 0) {\n      res = u.isub(this.m);\n    } else if (u.cmpn(0) < 0) {\n      res = u.iadd(this.m);\n    }\n\n    return res._forceRed(this);\n  };\n\n  Mont.prototype.mul = function mul (a, b) {\n    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);\n\n    var t = a.mul(b);\n    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);\n    var u = t.isub(c).iushrn(this.shift);\n    var res = u;\n    if (u.cmp(this.m) >= 0) {\n      res = u.isub(this.m);\n    } else if (u.cmpn(0) < 0) {\n      res = u.iadd(this.m);\n    }\n\n    return res._forceRed(this);\n  };\n\n  Mont.prototype.invm = function invm (a) {\n    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R\n    var res = this.imod(a._invmp(this.m).mul(this.r2));\n    return res._forceRed(this);\n  };\n})( false || module, this);\n\n\n//# sourceURL=webpack://tidebit-bridge/./node_modules/bn.js/lib/bn.js?");

/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("/*!\n * The buffer module from node.js, for the browser.\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n/* eslint-disable no-proto */\n\n\n\nconst base64 = __webpack_require__(/*! base64-js */ \"./node_modules/base64-js/index.js\")\nconst ieee754 = __webpack_require__(/*! ieee754 */ \"./node_modules/ieee754/index.js\")\nconst customInspectSymbol =\n  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation\n    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation\n    : null\n\nexports.Buffer = Buffer\nexports.SlowBuffer = SlowBuffer\nexports.INSPECT_MAX_BYTES = 50\n\nconst K_MAX_LENGTH = 0x7fffffff\nexports.kMaxLength = K_MAX_LENGTH\n\n/**\n * If `Buffer.TYPED_ARRAY_SUPPORT`:\n *   === true    Use Uint8Array implementation (fastest)\n *   === false   Print warning and recommend using `buffer` v4.x which has an Object\n *               implementation (most compatible, even IE6)\n *\n * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,\n * Opera 11.6+, iOS 4.2+.\n *\n * We report that the browser does not support typed arrays if the are not subclassable\n * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`\n * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support\n * for __proto__ and has a buggy typed array implementation.\n */\nBuffer.TYPED_ARRAY_SUPPORT = typedArraySupport()\n\nif (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&\n    typeof console.error === 'function') {\n  console.error(\n    'This browser lacks typed array (Uint8Array) support which is required by ' +\n    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'\n  )\n}\n\nfunction typedArraySupport () {\n  // Can typed array instances can be augmented?\n  try {\n    const arr = new Uint8Array(1)\n    const proto = { foo: function () { return 42 } }\n    Object.setPrototypeOf(proto, Uint8Array.prototype)\n    Object.setPrototypeOf(arr, proto)\n    return arr.foo() === 42\n  } catch (e) {\n    return false\n  }\n}\n\nObject.defineProperty(Buffer.prototype, 'parent', {\n  enumerable: true,\n  get: function () {\n    if (!Buffer.isBuffer(this)) return undefined\n    return this.buffer\n  }\n})\n\nObject.defineProperty(Buffer.prototype, 'offset', {\n  enumerable: true,\n  get: function () {\n    if (!Buffer.isBuffer(this)) return undefined\n    return this.byteOffset\n  }\n})\n\nfunction createBuffer (length) {\n  if (length > K_MAX_LENGTH) {\n    throw new RangeError('The value \"' + length + '\" is invalid for option \"size\"')\n  }\n  // Return an augmented `Uint8Array` instance\n  const buf = new Uint8Array(length)\n  Object.setPrototypeOf(buf, Buffer.prototype)\n  return buf\n}\n\n/**\n * The Buffer constructor returns instances of `Uint8Array` that have their\n * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of\n * `Uint8Array`, so the returned instances will have all the node `Buffer` methods\n * and the `Uint8Array` methods. Square bracket notation works as expected -- it\n * returns a single octet.\n *\n * The `Uint8Array` prototype remains unmodified.\n */\n\nfunction Buffer (arg, encodingOrOffset, length) {\n  // Common case.\n  if (typeof arg === 'number') {\n    if (typeof encodingOrOffset === 'string') {\n      throw new TypeError(\n        'The \"string\" argument must be of type string. Received type number'\n      )\n    }\n    return allocUnsafe(arg)\n  }\n  return from(arg, encodingOrOffset, length)\n}\n\nBuffer.poolSize = 8192 // not used by this implementation\n\nfunction from (value, encodingOrOffset, length) {\n  if (typeof value === 'string') {\n    return fromString(value, encodingOrOffset)\n  }\n\n  if (ArrayBuffer.isView(value)) {\n    return fromArrayView(value)\n  }\n\n  if (value == null) {\n    throw new TypeError(\n      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +\n      'or Array-like Object. Received type ' + (typeof value)\n    )\n  }\n\n  if (isInstance(value, ArrayBuffer) ||\n      (value && isInstance(value.buffer, ArrayBuffer))) {\n    return fromArrayBuffer(value, encodingOrOffset, length)\n  }\n\n  if (typeof SharedArrayBuffer !== 'undefined' &&\n      (isInstance(value, SharedArrayBuffer) ||\n      (value && isInstance(value.buffer, SharedArrayBuffer)))) {\n    return fromArrayBuffer(value, encodingOrOffset, length)\n  }\n\n  if (typeof value === 'number') {\n    throw new TypeError(\n      'The \"value\" argument must not be of type number. Received type number'\n    )\n  }\n\n  const valueOf = value.valueOf && value.valueOf()\n  if (valueOf != null && valueOf !== value) {\n    return Buffer.from(valueOf, encodingOrOffset, length)\n  }\n\n  const b = fromObject(value)\n  if (b) return b\n\n  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&\n      typeof value[Symbol.toPrimitive] === 'function') {\n    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)\n  }\n\n  throw new TypeError(\n    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +\n    'or Array-like Object. Received type ' + (typeof value)\n  )\n}\n\n/**\n * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError\n * if value is a number.\n * Buffer.from(str[, encoding])\n * Buffer.from(array)\n * Buffer.from(buffer)\n * Buffer.from(arrayBuffer[, byteOffset[, length]])\n **/\nBuffer.from = function (value, encodingOrOffset, length) {\n  return from(value, encodingOrOffset, length)\n}\n\n// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:\n// https://github.com/feross/buffer/pull/148\nObject.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)\nObject.setPrototypeOf(Buffer, Uint8Array)\n\nfunction assertSize (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('\"size\" argument must be of type number')\n  } else if (size < 0) {\n    throw new RangeError('The value \"' + size + '\" is invalid for option \"size\"')\n  }\n}\n\nfunction alloc (size, fill, encoding) {\n  assertSize(size)\n  if (size <= 0) {\n    return createBuffer(size)\n  }\n  if (fill !== undefined) {\n    // Only pay attention to encoding if it's a string. This\n    // prevents accidentally sending in a number that would\n    // be interpreted as a start offset.\n    return typeof encoding === 'string'\n      ? createBuffer(size).fill(fill, encoding)\n      : createBuffer(size).fill(fill)\n  }\n  return createBuffer(size)\n}\n\n/**\n * Creates a new filled Buffer instance.\n * alloc(size[, fill[, encoding]])\n **/\nBuffer.alloc = function (size, fill, encoding) {\n  return alloc(size, fill, encoding)\n}\n\nfunction allocUnsafe (size) {\n  assertSize(size)\n  return createBuffer(size < 0 ? 0 : checked(size) | 0)\n}\n\n/**\n * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.\n * */\nBuffer.allocUnsafe = function (size) {\n  return allocUnsafe(size)\n}\n/**\n * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.\n */\nBuffer.allocUnsafeSlow = function (size) {\n  return allocUnsafe(size)\n}\n\nfunction fromString (string, encoding) {\n  if (typeof encoding !== 'string' || encoding === '') {\n    encoding = 'utf8'\n  }\n\n  if (!Buffer.isEncoding(encoding)) {\n    throw new TypeError('Unknown encoding: ' + encoding)\n  }\n\n  const length = byteLength(string, encoding) | 0\n  let buf = createBuffer(length)\n\n  const actual = buf.write(string, encoding)\n\n  if (actual !== length) {\n    // Writing a hex string, for example, that contains invalid characters will\n    // cause everything after the first invalid character to be ignored. (e.g.\n    // 'abxxcd' will be treated as 'ab')\n    buf = buf.slice(0, actual)\n  }\n\n  return buf\n}\n\nfunction fromArrayLike (array) {\n  const length = array.length < 0 ? 0 : checked(array.length) | 0\n  const buf = createBuffer(length)\n  for (let i = 0; i < length; i += 1) {\n    buf[i] = array[i] & 255\n  }\n  return buf\n}\n\nfunction fromArrayView (arrayView) {\n  if (isInstance(arrayView, Uint8Array)) {\n    const copy = new Uint8Array(arrayView)\n    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)\n  }\n  return fromArrayLike(arrayView)\n}\n\nfunction fromArrayBuffer (array, byteOffset, length) {\n  if (byteOffset < 0 || array.byteLength < byteOffset) {\n    throw new RangeError('\"offset\" is outside of buffer bounds')\n  }\n\n  if (array.byteLength < byteOffset + (length || 0)) {\n    throw new RangeError('\"length\" is outside of buffer bounds')\n  }\n\n  let buf\n  if (byteOffset === undefined && length === undefined) {\n    buf = new Uint8Array(array)\n  } else if (length === undefined) {\n    buf = new Uint8Array(array, byteOffset)\n  } else {\n    buf = new Uint8Array(array, byteOffset, length)\n  }\n\n  // Return an augmented `Uint8Array` instance\n  Object.setPrototypeOf(buf, Buffer.prototype)\n\n  return buf\n}\n\nfunction fromObject (obj) {\n  if (Buffer.isBuffer(obj)) {\n    const len = checked(obj.length) | 0\n    const buf = createBuffer(len)\n\n    if (buf.length === 0) {\n      return buf\n    }\n\n    obj.copy(buf, 0, 0, len)\n    return buf\n  }\n\n  if (obj.length !== undefined) {\n    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {\n      return createBuffer(0)\n    }\n    return fromArrayLike(obj)\n  }\n\n  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {\n    return fromArrayLike(obj.data)\n  }\n}\n\nfunction checked (length) {\n  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when\n  // length is NaN (which is otherwise coerced to zero.)\n  if (length >= K_MAX_LENGTH) {\n    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +\n                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')\n  }\n  return length | 0\n}\n\nfunction SlowBuffer (length) {\n  if (+length != length) { // eslint-disable-line eqeqeq\n    length = 0\n  }\n  return Buffer.alloc(+length)\n}\n\nBuffer.isBuffer = function isBuffer (b) {\n  return b != null && b._isBuffer === true &&\n    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false\n}\n\nBuffer.compare = function compare (a, b) {\n  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)\n  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)\n  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {\n    throw new TypeError(\n      'The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array'\n    )\n  }\n\n  if (a === b) return 0\n\n  let x = a.length\n  let y = b.length\n\n  for (let i = 0, len = Math.min(x, y); i < len; ++i) {\n    if (a[i] !== b[i]) {\n      x = a[i]\n      y = b[i]\n      break\n    }\n  }\n\n  if (x < y) return -1\n  if (y < x) return 1\n  return 0\n}\n\nBuffer.isEncoding = function isEncoding (encoding) {\n  switch (String(encoding).toLowerCase()) {\n    case 'hex':\n    case 'utf8':\n    case 'utf-8':\n    case 'ascii':\n    case 'latin1':\n    case 'binary':\n    case 'base64':\n    case 'ucs2':\n    case 'ucs-2':\n    case 'utf16le':\n    case 'utf-16le':\n      return true\n    default:\n      return false\n  }\n}\n\nBuffer.concat = function concat (list, length) {\n  if (!Array.isArray(list)) {\n    throw new TypeError('\"list\" argument must be an Array of Buffers')\n  }\n\n  if (list.length === 0) {\n    return Buffer.alloc(0)\n  }\n\n  let i\n  if (length === undefined) {\n    length = 0\n    for (i = 0; i < list.length; ++i) {\n      length += list[i].length\n    }\n  }\n\n  const buffer = Buffer.allocUnsafe(length)\n  let pos = 0\n  for (i = 0; i < list.length; ++i) {\n    let buf = list[i]\n    if (isInstance(buf, Uint8Array)) {\n      if (pos + buf.length > buffer.length) {\n        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)\n        buf.copy(buffer, pos)\n      } else {\n        Uint8Array.prototype.set.call(\n          buffer,\n          buf,\n          pos\n        )\n      }\n    } else if (!Buffer.isBuffer(buf)) {\n      throw new TypeError('\"list\" argument must be an Array of Buffers')\n    } else {\n      buf.copy(buffer, pos)\n    }\n    pos += buf.length\n  }\n  return buffer\n}\n\nfunction byteLength (string, encoding) {\n  if (Buffer.isBuffer(string)) {\n    return string.length\n  }\n  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {\n    return string.byteLength\n  }\n  if (typeof string !== 'string') {\n    throw new TypeError(\n      'The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. ' +\n      'Received type ' + typeof string\n    )\n  }\n\n  const len = string.length\n  const mustMatch = (arguments.length > 2 && arguments[2] === true)\n  if (!mustMatch && len === 0) return 0\n\n  // Use a for loop to avoid recursion\n  let loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'ascii':\n      case 'latin1':\n      case 'binary':\n        return len\n      case 'utf8':\n      case 'utf-8':\n        return utf8ToBytes(string).length\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return len * 2\n      case 'hex':\n        return len >>> 1\n      case 'base64':\n        return base64ToBytes(string).length\n      default:\n        if (loweredCase) {\n          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8\n        }\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\nBuffer.byteLength = byteLength\n\nfunction slowToString (encoding, start, end) {\n  let loweredCase = false\n\n  // No need to verify that \"this.length <= MAX_UINT32\" since it's a read-only\n  // property of a typed array.\n\n  // This behaves neither like String nor Uint8Array in that we set start/end\n  // to their upper/lower bounds if the value passed is out of range.\n  // undefined is handled specially as per ECMA-262 6th Edition,\n  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.\n  if (start === undefined || start < 0) {\n    start = 0\n  }\n  // Return early if start > this.length. Done here to prevent potential uint32\n  // coercion fail below.\n  if (start > this.length) {\n    return ''\n  }\n\n  if (end === undefined || end > this.length) {\n    end = this.length\n  }\n\n  if (end <= 0) {\n    return ''\n  }\n\n  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.\n  end >>>= 0\n  start >>>= 0\n\n  if (end <= start) {\n    return ''\n  }\n\n  if (!encoding) encoding = 'utf8'\n\n  while (true) {\n    switch (encoding) {\n      case 'hex':\n        return hexSlice(this, start, end)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Slice(this, start, end)\n\n      case 'ascii':\n        return asciiSlice(this, start, end)\n\n      case 'latin1':\n      case 'binary':\n        return latin1Slice(this, start, end)\n\n      case 'base64':\n        return base64Slice(this, start, end)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return utf16leSlice(this, start, end)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = (encoding + '').toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\n// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)\n// to detect a Buffer instance. It's not possible to use `instanceof Buffer`\n// reliably in a browserify context because there could be multiple different\n// copies of the 'buffer' package in use. This method works even for Buffer\n// instances that were created from another copy of the `buffer` package.\n// See: https://github.com/feross/buffer/issues/154\nBuffer.prototype._isBuffer = true\n\nfunction swap (b, n, m) {\n  const i = b[n]\n  b[n] = b[m]\n  b[m] = i\n}\n\nBuffer.prototype.swap16 = function swap16 () {\n  const len = this.length\n  if (len % 2 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 16-bits')\n  }\n  for (let i = 0; i < len; i += 2) {\n    swap(this, i, i + 1)\n  }\n  return this\n}\n\nBuffer.prototype.swap32 = function swap32 () {\n  const len = this.length\n  if (len % 4 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 32-bits')\n  }\n  for (let i = 0; i < len; i += 4) {\n    swap(this, i, i + 3)\n    swap(this, i + 1, i + 2)\n  }\n  return this\n}\n\nBuffer.prototype.swap64 = function swap64 () {\n  const len = this.length\n  if (len % 8 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 64-bits')\n  }\n  for (let i = 0; i < len; i += 8) {\n    swap(this, i, i + 7)\n    swap(this, i + 1, i + 6)\n    swap(this, i + 2, i + 5)\n    swap(this, i + 3, i + 4)\n  }\n  return this\n}\n\nBuffer.prototype.toString = function toString () {\n  const length = this.length\n  if (length === 0) return ''\n  if (arguments.length === 0) return utf8Slice(this, 0, length)\n  return slowToString.apply(this, arguments)\n}\n\nBuffer.prototype.toLocaleString = Buffer.prototype.toString\n\nBuffer.prototype.equals = function equals (b) {\n  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')\n  if (this === b) return true\n  return Buffer.compare(this, b) === 0\n}\n\nBuffer.prototype.inspect = function inspect () {\n  let str = ''\n  const max = exports.INSPECT_MAX_BYTES\n  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()\n  if (this.length > max) str += ' ... '\n  return '<Buffer ' + str + '>'\n}\nif (customInspectSymbol) {\n  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect\n}\n\nBuffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {\n  if (isInstance(target, Uint8Array)) {\n    target = Buffer.from(target, target.offset, target.byteLength)\n  }\n  if (!Buffer.isBuffer(target)) {\n    throw new TypeError(\n      'The \"target\" argument must be one of type Buffer or Uint8Array. ' +\n      'Received type ' + (typeof target)\n    )\n  }\n\n  if (start === undefined) {\n    start = 0\n  }\n  if (end === undefined) {\n    end = target ? target.length : 0\n  }\n  if (thisStart === undefined) {\n    thisStart = 0\n  }\n  if (thisEnd === undefined) {\n    thisEnd = this.length\n  }\n\n  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {\n    throw new RangeError('out of range index')\n  }\n\n  if (thisStart >= thisEnd && start >= end) {\n    return 0\n  }\n  if (thisStart >= thisEnd) {\n    return -1\n  }\n  if (start >= end) {\n    return 1\n  }\n\n  start >>>= 0\n  end >>>= 0\n  thisStart >>>= 0\n  thisEnd >>>= 0\n\n  if (this === target) return 0\n\n  let x = thisEnd - thisStart\n  let y = end - start\n  const len = Math.min(x, y)\n\n  const thisCopy = this.slice(thisStart, thisEnd)\n  const targetCopy = target.slice(start, end)\n\n  for (let i = 0; i < len; ++i) {\n    if (thisCopy[i] !== targetCopy[i]) {\n      x = thisCopy[i]\n      y = targetCopy[i]\n      break\n    }\n  }\n\n  if (x < y) return -1\n  if (y < x) return 1\n  return 0\n}\n\n// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,\n// OR the last index of `val` in `buffer` at offset <= `byteOffset`.\n//\n// Arguments:\n// - buffer - a Buffer to search\n// - val - a string, Buffer, or number\n// - byteOffset - an index into `buffer`; will be clamped to an int32\n// - encoding - an optional encoding, relevant is val is a string\n// - dir - true for indexOf, false for lastIndexOf\nfunction bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {\n  // Empty buffer means no match\n  if (buffer.length === 0) return -1\n\n  // Normalize byteOffset\n  if (typeof byteOffset === 'string') {\n    encoding = byteOffset\n    byteOffset = 0\n  } else if (byteOffset > 0x7fffffff) {\n    byteOffset = 0x7fffffff\n  } else if (byteOffset < -0x80000000) {\n    byteOffset = -0x80000000\n  }\n  byteOffset = +byteOffset // Coerce to Number.\n  if (numberIsNaN(byteOffset)) {\n    // byteOffset: it it's undefined, null, NaN, \"foo\", etc, search whole buffer\n    byteOffset = dir ? 0 : (buffer.length - 1)\n  }\n\n  // Normalize byteOffset: negative offsets start from the end of the buffer\n  if (byteOffset < 0) byteOffset = buffer.length + byteOffset\n  if (byteOffset >= buffer.length) {\n    if (dir) return -1\n    else byteOffset = buffer.length - 1\n  } else if (byteOffset < 0) {\n    if (dir) byteOffset = 0\n    else return -1\n  }\n\n  // Normalize val\n  if (typeof val === 'string') {\n    val = Buffer.from(val, encoding)\n  }\n\n  // Finally, search either indexOf (if dir is true) or lastIndexOf\n  if (Buffer.isBuffer(val)) {\n    // Special case: looking for empty string/buffer always fails\n    if (val.length === 0) {\n      return -1\n    }\n    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)\n  } else if (typeof val === 'number') {\n    val = val & 0xFF // Search for a byte value [0-255]\n    if (typeof Uint8Array.prototype.indexOf === 'function') {\n      if (dir) {\n        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)\n      } else {\n        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)\n      }\n    }\n    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)\n  }\n\n  throw new TypeError('val must be string, number or Buffer')\n}\n\nfunction arrayIndexOf (arr, val, byteOffset, encoding, dir) {\n  let indexSize = 1\n  let arrLength = arr.length\n  let valLength = val.length\n\n  if (encoding !== undefined) {\n    encoding = String(encoding).toLowerCase()\n    if (encoding === 'ucs2' || encoding === 'ucs-2' ||\n        encoding === 'utf16le' || encoding === 'utf-16le') {\n      if (arr.length < 2 || val.length < 2) {\n        return -1\n      }\n      indexSize = 2\n      arrLength /= 2\n      valLength /= 2\n      byteOffset /= 2\n    }\n  }\n\n  function read (buf, i) {\n    if (indexSize === 1) {\n      return buf[i]\n    } else {\n      return buf.readUInt16BE(i * indexSize)\n    }\n  }\n\n  let i\n  if (dir) {\n    let foundIndex = -1\n    for (i = byteOffset; i < arrLength; i++) {\n      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {\n        if (foundIndex === -1) foundIndex = i\n        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize\n      } else {\n        if (foundIndex !== -1) i -= i - foundIndex\n        foundIndex = -1\n      }\n    }\n  } else {\n    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength\n    for (i = byteOffset; i >= 0; i--) {\n      let found = true\n      for (let j = 0; j < valLength; j++) {\n        if (read(arr, i + j) !== read(val, j)) {\n          found = false\n          break\n        }\n      }\n      if (found) return i\n    }\n  }\n\n  return -1\n}\n\nBuffer.prototype.includes = function includes (val, byteOffset, encoding) {\n  return this.indexOf(val, byteOffset, encoding) !== -1\n}\n\nBuffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)\n}\n\nBuffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)\n}\n\nfunction hexWrite (buf, string, offset, length) {\n  offset = Number(offset) || 0\n  const remaining = buf.length - offset\n  if (!length) {\n    length = remaining\n  } else {\n    length = Number(length)\n    if (length > remaining) {\n      length = remaining\n    }\n  }\n\n  const strLen = string.length\n\n  if (length > strLen / 2) {\n    length = strLen / 2\n  }\n  let i\n  for (i = 0; i < length; ++i) {\n    const parsed = parseInt(string.substr(i * 2, 2), 16)\n    if (numberIsNaN(parsed)) return i\n    buf[offset + i] = parsed\n  }\n  return i\n}\n\nfunction utf8Write (buf, string, offset, length) {\n  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nfunction asciiWrite (buf, string, offset, length) {\n  return blitBuffer(asciiToBytes(string), buf, offset, length)\n}\n\nfunction base64Write (buf, string, offset, length) {\n  return blitBuffer(base64ToBytes(string), buf, offset, length)\n}\n\nfunction ucs2Write (buf, string, offset, length) {\n  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nBuffer.prototype.write = function write (string, offset, length, encoding) {\n  // Buffer#write(string)\n  if (offset === undefined) {\n    encoding = 'utf8'\n    length = this.length\n    offset = 0\n  // Buffer#write(string, encoding)\n  } else if (length === undefined && typeof offset === 'string') {\n    encoding = offset\n    length = this.length\n    offset = 0\n  // Buffer#write(string, offset[, length][, encoding])\n  } else if (isFinite(offset)) {\n    offset = offset >>> 0\n    if (isFinite(length)) {\n      length = length >>> 0\n      if (encoding === undefined) encoding = 'utf8'\n    } else {\n      encoding = length\n      length = undefined\n    }\n  } else {\n    throw new Error(\n      'Buffer.write(string, encoding, offset[, length]) is no longer supported'\n    )\n  }\n\n  const remaining = this.length - offset\n  if (length === undefined || length > remaining) length = remaining\n\n  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {\n    throw new RangeError('Attempt to write outside buffer bounds')\n  }\n\n  if (!encoding) encoding = 'utf8'\n\n  let loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'hex':\n        return hexWrite(this, string, offset, length)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Write(this, string, offset, length)\n\n      case 'ascii':\n      case 'latin1':\n      case 'binary':\n        return asciiWrite(this, string, offset, length)\n\n      case 'base64':\n        // Warning: maxLength not taken into account in base64Write\n        return base64Write(this, string, offset, length)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return ucs2Write(this, string, offset, length)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\nBuffer.prototype.toJSON = function toJSON () {\n  return {\n    type: 'Buffer',\n    data: Array.prototype.slice.call(this._arr || this, 0)\n  }\n}\n\nfunction base64Slice (buf, start, end) {\n  if (start === 0 && end === buf.length) {\n    return base64.fromByteArray(buf)\n  } else {\n    return base64.fromByteArray(buf.slice(start, end))\n  }\n}\n\nfunction utf8Slice (buf, start, end) {\n  end = Math.min(buf.length, end)\n  const res = []\n\n  let i = start\n  while (i < end) {\n    const firstByte = buf[i]\n    let codePoint = null\n    let bytesPerSequence = (firstByte > 0xEF)\n      ? 4\n      : (firstByte > 0xDF)\n          ? 3\n          : (firstByte > 0xBF)\n              ? 2\n              : 1\n\n    if (i + bytesPerSequence <= end) {\n      let secondByte, thirdByte, fourthByte, tempCodePoint\n\n      switch (bytesPerSequence) {\n        case 1:\n          if (firstByte < 0x80) {\n            codePoint = firstByte\n          }\n          break\n        case 2:\n          secondByte = buf[i + 1]\n          if ((secondByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)\n            if (tempCodePoint > 0x7F) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 3:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)\n            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 4:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          fourthByte = buf[i + 3]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)\n            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {\n              codePoint = tempCodePoint\n            }\n          }\n      }\n    }\n\n    if (codePoint === null) {\n      // we did not generate a valid codePoint so insert a\n      // replacement char (U+FFFD) and advance only 1 byte\n      codePoint = 0xFFFD\n      bytesPerSequence = 1\n    } else if (codePoint > 0xFFFF) {\n      // encode to utf16 (surrogate pair dance)\n      codePoint -= 0x10000\n      res.push(codePoint >>> 10 & 0x3FF | 0xD800)\n      codePoint = 0xDC00 | codePoint & 0x3FF\n    }\n\n    res.push(codePoint)\n    i += bytesPerSequence\n  }\n\n  return decodeCodePointsArray(res)\n}\n\n// Based on http://stackoverflow.com/a/22747272/680742, the browser with\n// the lowest limit is Chrome, with 0x10000 args.\n// We go 1 magnitude less, for safety\nconst MAX_ARGUMENTS_LENGTH = 0x1000\n\nfunction decodeCodePointsArray (codePoints) {\n  const len = codePoints.length\n  if (len <= MAX_ARGUMENTS_LENGTH) {\n    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()\n  }\n\n  // Decode in chunks to avoid \"call stack size exceeded\".\n  let res = ''\n  let i = 0\n  while (i < len) {\n    res += String.fromCharCode.apply(\n      String,\n      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)\n    )\n  }\n  return res\n}\n\nfunction asciiSlice (buf, start, end) {\n  let ret = ''\n  end = Math.min(buf.length, end)\n\n  for (let i = start; i < end; ++i) {\n    ret += String.fromCharCode(buf[i] & 0x7F)\n  }\n  return ret\n}\n\nfunction latin1Slice (buf, start, end) {\n  let ret = ''\n  end = Math.min(buf.length, end)\n\n  for (let i = start; i < end; ++i) {\n    ret += String.fromCharCode(buf[i])\n  }\n  return ret\n}\n\nfunction hexSlice (buf, start, end) {\n  const len = buf.length\n\n  if (!start || start < 0) start = 0\n  if (!end || end < 0 || end > len) end = len\n\n  let out = ''\n  for (let i = start; i < end; ++i) {\n    out += hexSliceLookupTable[buf[i]]\n  }\n  return out\n}\n\nfunction utf16leSlice (buf, start, end) {\n  const bytes = buf.slice(start, end)\n  let res = ''\n  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)\n  for (let i = 0; i < bytes.length - 1; i += 2) {\n    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))\n  }\n  return res\n}\n\nBuffer.prototype.slice = function slice (start, end) {\n  const len = this.length\n  start = ~~start\n  end = end === undefined ? len : ~~end\n\n  if (start < 0) {\n    start += len\n    if (start < 0) start = 0\n  } else if (start > len) {\n    start = len\n  }\n\n  if (end < 0) {\n    end += len\n    if (end < 0) end = 0\n  } else if (end > len) {\n    end = len\n  }\n\n  if (end < start) end = start\n\n  const newBuf = this.subarray(start, end)\n  // Return an augmented `Uint8Array` instance\n  Object.setPrototypeOf(newBuf, Buffer.prototype)\n\n  return newBuf\n}\n\n/*\n * Need to make sure that buffer isn't trying to write out of bounds.\n */\nfunction checkOffset (offset, ext, length) {\n  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')\n  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')\n}\n\nBuffer.prototype.readUintLE =\nBuffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  let val = this[offset]\n  let mul = 1\n  let i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUintBE =\nBuffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) {\n    checkOffset(offset, byteLength, this.length)\n  }\n\n  let val = this[offset + --byteLength]\n  let mul = 1\n  while (byteLength > 0 && (mul *= 0x100)) {\n    val += this[offset + --byteLength] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUint8 =\nBuffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  return this[offset]\n}\n\nBuffer.prototype.readUint16LE =\nBuffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return this[offset] | (this[offset + 1] << 8)\n}\n\nBuffer.prototype.readUint16BE =\nBuffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return (this[offset] << 8) | this[offset + 1]\n}\n\nBuffer.prototype.readUint32LE =\nBuffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return ((this[offset]) |\n      (this[offset + 1] << 8) |\n      (this[offset + 2] << 16)) +\n      (this[offset + 3] * 0x1000000)\n}\n\nBuffer.prototype.readUint32BE =\nBuffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] * 0x1000000) +\n    ((this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    this[offset + 3])\n}\n\nBuffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {\n  offset = offset >>> 0\n  validateNumber(offset, 'offset')\n  const first = this[offset]\n  const last = this[offset + 7]\n  if (first === undefined || last === undefined) {\n    boundsError(offset, this.length - 8)\n  }\n\n  const lo = first +\n    this[++offset] * 2 ** 8 +\n    this[++offset] * 2 ** 16 +\n    this[++offset] * 2 ** 24\n\n  const hi = this[++offset] +\n    this[++offset] * 2 ** 8 +\n    this[++offset] * 2 ** 16 +\n    last * 2 ** 24\n\n  return BigInt(lo) + (BigInt(hi) << BigInt(32))\n})\n\nBuffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {\n  offset = offset >>> 0\n  validateNumber(offset, 'offset')\n  const first = this[offset]\n  const last = this[offset + 7]\n  if (first === undefined || last === undefined) {\n    boundsError(offset, this.length - 8)\n  }\n\n  const hi = first * 2 ** 24 +\n    this[++offset] * 2 ** 16 +\n    this[++offset] * 2 ** 8 +\n    this[++offset]\n\n  const lo = this[++offset] * 2 ** 24 +\n    this[++offset] * 2 ** 16 +\n    this[++offset] * 2 ** 8 +\n    last\n\n  return (BigInt(hi) << BigInt(32)) + BigInt(lo)\n})\n\nBuffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  let val = this[offset]\n  let mul = 1\n  let i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  let i = byteLength\n  let mul = 1\n  let val = this[offset + --i]\n  while (i > 0 && (mul *= 0x100)) {\n    val += this[offset + --i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readInt8 = function readInt8 (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  if (!(this[offset] & 0x80)) return (this[offset])\n  return ((0xff - this[offset] + 1) * -1)\n}\n\nBuffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  const val = this[offset] | (this[offset + 1] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  const val = this[offset + 1] | (this[offset] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset]) |\n    (this[offset + 1] << 8) |\n    (this[offset + 2] << 16) |\n    (this[offset + 3] << 24)\n}\n\nBuffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] << 24) |\n    (this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    (this[offset + 3])\n}\n\nBuffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {\n  offset = offset >>> 0\n  validateNumber(offset, 'offset')\n  const first = this[offset]\n  const last = this[offset + 7]\n  if (first === undefined || last === undefined) {\n    boundsError(offset, this.length - 8)\n  }\n\n  const val = this[offset + 4] +\n    this[offset + 5] * 2 ** 8 +\n    this[offset + 6] * 2 ** 16 +\n    (last << 24) // Overflow\n\n  return (BigInt(val) << BigInt(32)) +\n    BigInt(first +\n    this[++offset] * 2 ** 8 +\n    this[++offset] * 2 ** 16 +\n    this[++offset] * 2 ** 24)\n})\n\nBuffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {\n  offset = offset >>> 0\n  validateNumber(offset, 'offset')\n  const first = this[offset]\n  const last = this[offset + 7]\n  if (first === undefined || last === undefined) {\n    boundsError(offset, this.length - 8)\n  }\n\n  const val = (first << 24) + // Overflow\n    this[++offset] * 2 ** 16 +\n    this[++offset] * 2 ** 8 +\n    this[++offset]\n\n  return (BigInt(val) << BigInt(32)) +\n    BigInt(this[++offset] * 2 ** 24 +\n    this[++offset] * 2 ** 16 +\n    this[++offset] * 2 ** 8 +\n    last)\n})\n\nBuffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, true, 23, 4)\n}\n\nBuffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, false, 23, 4)\n}\n\nBuffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, true, 52, 8)\n}\n\nBuffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, false, 52, 8)\n}\n\nfunction checkInt (buf, value, offset, ext, max, min) {\n  if (!Buffer.isBuffer(buf)) throw new TypeError('\"buffer\" argument must be a Buffer instance')\n  if (value > max || value < min) throw new RangeError('\"value\" argument is out of bounds')\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\n}\n\nBuffer.prototype.writeUintLE =\nBuffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) {\n    const maxBytes = Math.pow(2, 8 * byteLength) - 1\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\n  }\n\n  let mul = 1\n  let i = 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUintBE =\nBuffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) {\n    const maxBytes = Math.pow(2, 8 * byteLength) - 1\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\n  }\n\n  let i = byteLength - 1\n  let mul = 1\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUint8 =\nBuffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)\n  this[offset] = (value & 0xff)\n  return offset + 1\n}\n\nBuffer.prototype.writeUint16LE =\nBuffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  this[offset] = (value & 0xff)\n  this[offset + 1] = (value >>> 8)\n  return offset + 2\n}\n\nBuffer.prototype.writeUint16BE =\nBuffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  this[offset] = (value >>> 8)\n  this[offset + 1] = (value & 0xff)\n  return offset + 2\n}\n\nBuffer.prototype.writeUint32LE =\nBuffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  this[offset + 3] = (value >>> 24)\n  this[offset + 2] = (value >>> 16)\n  this[offset + 1] = (value >>> 8)\n  this[offset] = (value & 0xff)\n  return offset + 4\n}\n\nBuffer.prototype.writeUint32BE =\nBuffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  this[offset] = (value >>> 24)\n  this[offset + 1] = (value >>> 16)\n  this[offset + 2] = (value >>> 8)\n  this[offset + 3] = (value & 0xff)\n  return offset + 4\n}\n\nfunction wrtBigUInt64LE (buf, value, offset, min, max) {\n  checkIntBI(value, min, max, buf, offset, 7)\n\n  let lo = Number(value & BigInt(0xffffffff))\n  buf[offset++] = lo\n  lo = lo >> 8\n  buf[offset++] = lo\n  lo = lo >> 8\n  buf[offset++] = lo\n  lo = lo >> 8\n  buf[offset++] = lo\n  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))\n  buf[offset++] = hi\n  hi = hi >> 8\n  buf[offset++] = hi\n  hi = hi >> 8\n  buf[offset++] = hi\n  hi = hi >> 8\n  buf[offset++] = hi\n  return offset\n}\n\nfunction wrtBigUInt64BE (buf, value, offset, min, max) {\n  checkIntBI(value, min, max, buf, offset, 7)\n\n  let lo = Number(value & BigInt(0xffffffff))\n  buf[offset + 7] = lo\n  lo = lo >> 8\n  buf[offset + 6] = lo\n  lo = lo >> 8\n  buf[offset + 5] = lo\n  lo = lo >> 8\n  buf[offset + 4] = lo\n  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))\n  buf[offset + 3] = hi\n  hi = hi >> 8\n  buf[offset + 2] = hi\n  hi = hi >> 8\n  buf[offset + 1] = hi\n  hi = hi >> 8\n  buf[offset] = hi\n  return offset + 8\n}\n\nBuffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {\n  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))\n})\n\nBuffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {\n  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))\n})\n\nBuffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    const limit = Math.pow(2, (8 * byteLength) - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  let i = 0\n  let mul = 1\n  let sub = 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {\n      sub = 1\n    }\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    const limit = Math.pow(2, (8 * byteLength) - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  let i = byteLength - 1\n  let mul = 1\n  let sub = 0\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {\n      sub = 1\n    }\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)\n  if (value < 0) value = 0xff + value + 1\n  this[offset] = (value & 0xff)\n  return offset + 1\n}\n\nBuffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  this[offset] = (value & 0xff)\n  this[offset + 1] = (value >>> 8)\n  return offset + 2\n}\n\nBuffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  this[offset] = (value >>> 8)\n  this[offset + 1] = (value & 0xff)\n  return offset + 2\n}\n\nBuffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  this[offset] = (value & 0xff)\n  this[offset + 1] = (value >>> 8)\n  this[offset + 2] = (value >>> 16)\n  this[offset + 3] = (value >>> 24)\n  return offset + 4\n}\n\nBuffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  if (value < 0) value = 0xffffffff + value + 1\n  this[offset] = (value >>> 24)\n  this[offset + 1] = (value >>> 16)\n  this[offset + 2] = (value >>> 8)\n  this[offset + 3] = (value & 0xff)\n  return offset + 4\n}\n\nBuffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {\n  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))\n})\n\nBuffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {\n  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))\n})\n\nfunction checkIEEE754 (buf, value, offset, ext, max, min) {\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\n  if (offset < 0) throw new RangeError('Index out of range')\n}\n\nfunction writeFloat (buf, value, offset, littleEndian, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 23, 4)\n  return offset + 4\n}\n\nBuffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, false, noAssert)\n}\n\nfunction writeDouble (buf, value, offset, littleEndian, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 52, 8)\n  return offset + 8\n}\n\nBuffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, false, noAssert)\n}\n\n// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)\nBuffer.prototype.copy = function copy (target, targetStart, start, end) {\n  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')\n  if (!start) start = 0\n  if (!end && end !== 0) end = this.length\n  if (targetStart >= target.length) targetStart = target.length\n  if (!targetStart) targetStart = 0\n  if (end > 0 && end < start) end = start\n\n  // Copy 0 bytes; we're done\n  if (end === start) return 0\n  if (target.length === 0 || this.length === 0) return 0\n\n  // Fatal error conditions\n  if (targetStart < 0) {\n    throw new RangeError('targetStart out of bounds')\n  }\n  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')\n  if (end < 0) throw new RangeError('sourceEnd out of bounds')\n\n  // Are we oob?\n  if (end > this.length) end = this.length\n  if (target.length - targetStart < end - start) {\n    end = target.length - targetStart + start\n  }\n\n  const len = end - start\n\n  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {\n    // Use built-in when available, missing from IE11\n    this.copyWithin(targetStart, start, end)\n  } else {\n    Uint8Array.prototype.set.call(\n      target,\n      this.subarray(start, end),\n      targetStart\n    )\n  }\n\n  return len\n}\n\n// Usage:\n//    buffer.fill(number[, offset[, end]])\n//    buffer.fill(buffer[, offset[, end]])\n//    buffer.fill(string[, offset[, end]][, encoding])\nBuffer.prototype.fill = function fill (val, start, end, encoding) {\n  // Handle string cases:\n  if (typeof val === 'string') {\n    if (typeof start === 'string') {\n      encoding = start\n      start = 0\n      end = this.length\n    } else if (typeof end === 'string') {\n      encoding = end\n      end = this.length\n    }\n    if (encoding !== undefined && typeof encoding !== 'string') {\n      throw new TypeError('encoding must be a string')\n    }\n    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {\n      throw new TypeError('Unknown encoding: ' + encoding)\n    }\n    if (val.length === 1) {\n      const code = val.charCodeAt(0)\n      if ((encoding === 'utf8' && code < 128) ||\n          encoding === 'latin1') {\n        // Fast path: If `val` fits into a single byte, use that numeric value.\n        val = code\n      }\n    }\n  } else if (typeof val === 'number') {\n    val = val & 255\n  } else if (typeof val === 'boolean') {\n    val = Number(val)\n  }\n\n  // Invalid ranges are not set to a default, so can range check early.\n  if (start < 0 || this.length < start || this.length < end) {\n    throw new RangeError('Out of range index')\n  }\n\n  if (end <= start) {\n    return this\n  }\n\n  start = start >>> 0\n  end = end === undefined ? this.length : end >>> 0\n\n  if (!val) val = 0\n\n  let i\n  if (typeof val === 'number') {\n    for (i = start; i < end; ++i) {\n      this[i] = val\n    }\n  } else {\n    const bytes = Buffer.isBuffer(val)\n      ? val\n      : Buffer.from(val, encoding)\n    const len = bytes.length\n    if (len === 0) {\n      throw new TypeError('The value \"' + val +\n        '\" is invalid for argument \"value\"')\n    }\n    for (i = 0; i < end - start; ++i) {\n      this[i + start] = bytes[i % len]\n    }\n  }\n\n  return this\n}\n\n// CUSTOM ERRORS\n// =============\n\n// Simplified versions from Node, changed for Buffer-only usage\nconst errors = {}\nfunction E (sym, getMessage, Base) {\n  errors[sym] = class NodeError extends Base {\n    constructor () {\n      super()\n\n      Object.defineProperty(this, 'message', {\n        value: getMessage.apply(this, arguments),\n        writable: true,\n        configurable: true\n      })\n\n      // Add the error code to the name to include it in the stack trace.\n      this.name = `${this.name} [${sym}]`\n      // Access the stack to generate the error message including the error code\n      // from the name.\n      this.stack // eslint-disable-line no-unused-expressions\n      // Reset the name to the actual name.\n      delete this.name\n    }\n\n    get code () {\n      return sym\n    }\n\n    set code (value) {\n      Object.defineProperty(this, 'code', {\n        configurable: true,\n        enumerable: true,\n        value,\n        writable: true\n      })\n    }\n\n    toString () {\n      return `${this.name} [${sym}]: ${this.message}`\n    }\n  }\n}\n\nE('ERR_BUFFER_OUT_OF_BOUNDS',\n  function (name) {\n    if (name) {\n      return `${name} is outside of buffer bounds`\n    }\n\n    return 'Attempt to access memory outside buffer bounds'\n  }, RangeError)\nE('ERR_INVALID_ARG_TYPE',\n  function (name, actual) {\n    return `The \"${name}\" argument must be of type number. Received type ${typeof actual}`\n  }, TypeError)\nE('ERR_OUT_OF_RANGE',\n  function (str, range, input) {\n    let msg = `The value of \"${str}\" is out of range.`\n    let received = input\n    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {\n      received = addNumericalSeparator(String(input))\n    } else if (typeof input === 'bigint') {\n      received = String(input)\n      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {\n        received = addNumericalSeparator(received)\n      }\n      received += 'n'\n    }\n    msg += ` It must be ${range}. Received ${received}`\n    return msg\n  }, RangeError)\n\nfunction addNumericalSeparator (val) {\n  let res = ''\n  let i = val.length\n  const start = val[0] === '-' ? 1 : 0\n  for (; i >= start + 4; i -= 3) {\n    res = `_${val.slice(i - 3, i)}${res}`\n  }\n  return `${val.slice(0, i)}${res}`\n}\n\n// CHECK FUNCTIONS\n// ===============\n\nfunction checkBounds (buf, offset, byteLength) {\n  validateNumber(offset, 'offset')\n  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {\n    boundsError(offset, buf.length - (byteLength + 1))\n  }\n}\n\nfunction checkIntBI (value, min, max, buf, offset, byteLength) {\n  if (value > max || value < min) {\n    const n = typeof min === 'bigint' ? 'n' : ''\n    let range\n    if (byteLength > 3) {\n      if (min === 0 || min === BigInt(0)) {\n        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`\n      } else {\n        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +\n                `${(byteLength + 1) * 8 - 1}${n}`\n      }\n    } else {\n      range = `>= ${min}${n} and <= ${max}${n}`\n    }\n    throw new errors.ERR_OUT_OF_RANGE('value', range, value)\n  }\n  checkBounds(buf, offset, byteLength)\n}\n\nfunction validateNumber (value, name) {\n  if (typeof value !== 'number') {\n    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)\n  }\n}\n\nfunction boundsError (value, length, type) {\n  if (Math.floor(value) !== value) {\n    validateNumber(value, type)\n    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)\n  }\n\n  if (length < 0) {\n    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()\n  }\n\n  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',\n                                    `>= ${type ? 1 : 0} and <= ${length}`,\n                                    value)\n}\n\n// HELPER FUNCTIONS\n// ================\n\nconst INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g\n\nfunction base64clean (str) {\n  // Node takes equal signs as end of the Base64 encoding\n  str = str.split('=')[0]\n  // Node strips out invalid characters like \\n and \\t from the string, base64-js does not\n  str = str.trim().replace(INVALID_BASE64_RE, '')\n  // Node converts strings with length < 2 to ''\n  if (str.length < 2) return ''\n  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not\n  while (str.length % 4 !== 0) {\n    str = str + '='\n  }\n  return str\n}\n\nfunction utf8ToBytes (string, units) {\n  units = units || Infinity\n  let codePoint\n  const length = string.length\n  let leadSurrogate = null\n  const bytes = []\n\n  for (let i = 0; i < length; ++i) {\n    codePoint = string.charCodeAt(i)\n\n    // is surrogate component\n    if (codePoint > 0xD7FF && codePoint < 0xE000) {\n      // last char was a lead\n      if (!leadSurrogate) {\n        // no lead yet\n        if (codePoint > 0xDBFF) {\n          // unexpected trail\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        } else if (i + 1 === length) {\n          // unpaired lead\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        }\n\n        // valid lead\n        leadSurrogate = codePoint\n\n        continue\n      }\n\n      // 2 leads in a row\n      if (codePoint < 0xDC00) {\n        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n        leadSurrogate = codePoint\n        continue\n      }\n\n      // valid surrogate pair\n      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000\n    } else if (leadSurrogate) {\n      // valid bmp char, but last char was a lead\n      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n    }\n\n    leadSurrogate = null\n\n    // encode utf8\n    if (codePoint < 0x80) {\n      if ((units -= 1) < 0) break\n      bytes.push(codePoint)\n    } else if (codePoint < 0x800) {\n      if ((units -= 2) < 0) break\n      bytes.push(\n        codePoint >> 0x6 | 0xC0,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x10000) {\n      if ((units -= 3) < 0) break\n      bytes.push(\n        codePoint >> 0xC | 0xE0,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x110000) {\n      if ((units -= 4) < 0) break\n      bytes.push(\n        codePoint >> 0x12 | 0xF0,\n        codePoint >> 0xC & 0x3F | 0x80,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else {\n      throw new Error('Invalid code point')\n    }\n  }\n\n  return bytes\n}\n\nfunction asciiToBytes (str) {\n  const byteArray = []\n  for (let i = 0; i < str.length; ++i) {\n    // Node's code seems to be doing this and not & 0x7F..\n    byteArray.push(str.charCodeAt(i) & 0xFF)\n  }\n  return byteArray\n}\n\nfunction utf16leToBytes (str, units) {\n  let c, hi, lo\n  const byteArray = []\n  for (let i = 0; i < str.length; ++i) {\n    if ((units -= 2) < 0) break\n\n    c = str.charCodeAt(i)\n    hi = c >> 8\n    lo = c % 256\n    byteArray.push(lo)\n    byteArray.push(hi)\n  }\n\n  return byteArray\n}\n\nfunction base64ToBytes (str) {\n  return base64.toByteArray(base64clean(str))\n}\n\nfunction blitBuffer (src, dst, offset, length) {\n  let i\n  for (i = 0; i < length; ++i) {\n    if ((i + offset >= dst.length) || (i >= src.length)) break\n    dst[i + offset] = src[i]\n  }\n  return i\n}\n\n// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass\n// the `instanceof` check but they should be treated as of that type.\n// See: https://github.com/feross/buffer/issues/166\nfunction isInstance (obj, type) {\n  return obj instanceof type ||\n    (obj != null && obj.constructor != null && obj.constructor.name != null &&\n      obj.constructor.name === type.name)\n}\nfunction numberIsNaN (obj) {\n  // For IE11 support\n  return obj !== obj // eslint-disable-line no-self-compare\n}\n\n// Create lookup table for `toString('hex')`\n// See: https://github.com/feross/buffer/issues/219\nconst hexSliceLookupTable = (function () {\n  const alphabet = '0123456789abcdef'\n  const table = new Array(256)\n  for (let i = 0; i < 16; ++i) {\n    const i16 = i * 16\n    for (let j = 0; j < 16; ++j) {\n      table[i16 + j] = alphabet[i] + alphabet[j]\n    }\n  }\n  return table\n})()\n\n// Return not function with Error if BigInt not supported\nfunction defineBigIntMethod (fn) {\n  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn\n}\n\nfunction BufferBigIntNotDefined () {\n  throw new Error('BigInt not supported')\n}\n\n\n//# sourceURL=webpack://tidebit-bridge/./node_modules/buffer/index.js?");

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */\nexports.read = function (buffer, offset, isLE, mLen, nBytes) {\n  var e, m\n  var eLen = (nBytes * 8) - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var nBits = -7\n  var i = isLE ? (nBytes - 1) : 0\n  var d = isLE ? -1 : 1\n  var s = buffer[offset + i]\n\n  i += d\n\n  e = s & ((1 << (-nBits)) - 1)\n  s >>= (-nBits)\n  nBits += eLen\n  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}\n\n  m = e & ((1 << (-nBits)) - 1)\n  e >>= (-nBits)\n  nBits += mLen\n  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}\n\n  if (e === 0) {\n    e = 1 - eBias\n  } else if (e === eMax) {\n    return m ? NaN : ((s ? -1 : 1) * Infinity)\n  } else {\n    m = m + Math.pow(2, mLen)\n    e = e - eBias\n  }\n  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)\n}\n\nexports.write = function (buffer, value, offset, isLE, mLen, nBytes) {\n  var e, m, c\n  var eLen = (nBytes * 8) - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)\n  var i = isLE ? 0 : (nBytes - 1)\n  var d = isLE ? 1 : -1\n  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0\n\n  value = Math.abs(value)\n\n  if (isNaN(value) || value === Infinity) {\n    m = isNaN(value) ? 1 : 0\n    e = eMax\n  } else {\n    e = Math.floor(Math.log(value) / Math.LN2)\n    if (value * (c = Math.pow(2, -e)) < 1) {\n      e--\n      c *= 2\n    }\n    if (e + eBias >= 1) {\n      value += rt / c\n    } else {\n      value += rt * Math.pow(2, 1 - eBias)\n    }\n    if (value * c >= 2) {\n      e++\n      c /= 2\n    }\n\n    if (e + eBias >= eMax) {\n      m = 0\n      e = eMax\n    } else if (e + eBias >= 1) {\n      m = ((value * c) - 1) * Math.pow(2, mLen)\n      e = e + eBias\n    } else {\n      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)\n      e = 0\n    }\n  }\n\n  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}\n\n  e = (e << mLen) | m\n  eLen += mLen\n  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}\n\n  buffer[offset + i - d] |= s * 128\n}\n\n\n//# sourceURL=webpack://tidebit-bridge/./node_modules/ieee754/index.js?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* eslint-env browser */\n\n/*\n  eslint-disable\n  no-console,\n  func-names\n*/\nvar normalizeUrl = __webpack_require__(/*! ./normalize-url */ \"./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js\");\n\nvar srcByModuleId = Object.create(null);\nvar noDocument = typeof document === 'undefined';\nvar forEach = Array.prototype.forEach;\n\nfunction debounce(fn, time) {\n  var timeout = 0;\n  return function () {\n    var self = this; // eslint-disable-next-line prefer-rest-params\n\n    var args = arguments;\n\n    var functionCall = function functionCall() {\n      return fn.apply(self, args);\n    };\n\n    clearTimeout(timeout);\n    timeout = setTimeout(functionCall, time);\n  };\n}\n\nfunction noop() {}\n\nfunction getCurrentScriptUrl(moduleId) {\n  var src = srcByModuleId[moduleId];\n\n  if (!src) {\n    if (document.currentScript) {\n      src = document.currentScript.src;\n    } else {\n      var scripts = document.getElementsByTagName('script');\n      var lastScriptTag = scripts[scripts.length - 1];\n\n      if (lastScriptTag) {\n        src = lastScriptTag.src;\n      }\n    }\n\n    srcByModuleId[moduleId] = src;\n  }\n\n  return function (fileMap) {\n    if (!src) {\n      return null;\n    }\n\n    var splitResult = src.split(/([^\\\\/]+)\\.js$/);\n    var filename = splitResult && splitResult[1];\n\n    if (!filename) {\n      return [src.replace('.js', '.css')];\n    }\n\n    if (!fileMap) {\n      return [src.replace('.js', '.css')];\n    }\n\n    return fileMap.split(',').map(function (mapRule) {\n      var reg = new RegExp(\"\".concat(filename, \"\\\\.js$\"), 'g');\n      return normalizeUrl(src.replace(reg, \"\".concat(mapRule.replace(/{fileName}/g, filename), \".css\")));\n    });\n  };\n}\n\nfunction updateCss(el, url) {\n  if (!url) {\n    if (!el.href) {\n      return;\n    } // eslint-disable-next-line\n\n\n    url = el.href.split('?')[0];\n  }\n\n  if (!isUrlRequest(url)) {\n    return;\n  }\n\n  if (el.isLoaded === false) {\n    // We seem to be about to replace a css link that hasn't loaded yet.\n    // We're probably changing the same file more than once.\n    return;\n  }\n\n  if (!url || !(url.indexOf('.css') > -1)) {\n    return;\n  } // eslint-disable-next-line no-param-reassign\n\n\n  el.visited = true;\n  var newEl = el.cloneNode();\n  newEl.isLoaded = false;\n  newEl.addEventListener('load', function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.addEventListener('error', function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.href = \"\".concat(url, \"?\").concat(Date.now());\n\n  if (el.nextSibling) {\n    el.parentNode.insertBefore(newEl, el.nextSibling);\n  } else {\n    el.parentNode.appendChild(newEl);\n  }\n}\n\nfunction getReloadUrl(href, src) {\n  var ret; // eslint-disable-next-line no-param-reassign\n\n  href = normalizeUrl(href, {\n    stripWWW: false\n  }); // eslint-disable-next-line array-callback-return\n\n  src.some(function (url) {\n    if (href.indexOf(src) > -1) {\n      ret = url;\n    }\n  });\n  return ret;\n}\n\nfunction reloadStyle(src) {\n  if (!src) {\n    return false;\n  }\n\n  var elements = document.querySelectorAll('link');\n  var loaded = false;\n  forEach.call(elements, function (el) {\n    if (!el.href) {\n      return;\n    }\n\n    var url = getReloadUrl(el.href, src);\n\n    if (!isUrlRequest(url)) {\n      return;\n    }\n\n    if (el.visited === true) {\n      return;\n    }\n\n    if (url) {\n      updateCss(el, url);\n      loaded = true;\n    }\n  });\n  return loaded;\n}\n\nfunction reloadAll() {\n  var elements = document.querySelectorAll('link');\n  forEach.call(elements, function (el) {\n    if (el.visited === true) {\n      return;\n    }\n\n    updateCss(el);\n  });\n}\n\nfunction isUrlRequest(url) {\n  // An URL is not an request if\n  // It is not http or https\n  if (!/^https?:/i.test(url)) {\n    return false;\n  }\n\n  return true;\n}\n\nmodule.exports = function (moduleId, options) {\n  if (noDocument) {\n    console.log('no window.document found, will not HMR CSS');\n    return noop;\n  }\n\n  var getScriptSrc = getCurrentScriptUrl(moduleId);\n\n  function update() {\n    var src = getScriptSrc(options.filename);\n    var reloaded = reloadStyle(src);\n\n    if (options.locals) {\n      console.log('[HMR] Detected local css modules. Reload all css');\n      reloadAll();\n      return;\n    }\n\n    if (reloaded) {\n      console.log('[HMR] css reload %s', src.join(' '));\n    } else {\n      console.log('[HMR] Reload all css');\n      reloadAll();\n    }\n  }\n\n  return debounce(update, 50);\n};\n\n//# sourceURL=webpack://tidebit-bridge/./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* eslint-disable */\nfunction normalizeUrl(pathComponents) {\n  return pathComponents.reduce(function (accumulator, item) {\n    switch (item) {\n      case '..':\n        accumulator.pop();\n        break;\n\n      case '.':\n        break;\n\n      default:\n        accumulator.push(item);\n    }\n\n    return accumulator;\n  }, []).join('/');\n}\n\nmodule.exports = function (urlString) {\n  urlString = urlString.trim();\n\n  if (/^data:/i.test(urlString)) {\n    return urlString;\n  }\n\n  var protocol = urlString.indexOf('//') !== -1 ? urlString.split('//')[0] + '//' : '';\n  var components = urlString.replace(new RegExp(protocol, 'i'), '').split('/');\n  var host = components[0].toLowerCase().replace(/\\.$/, '');\n  components[0] = '';\n  var path = normalizeUrl(components);\n  return protocol + host + path;\n};\n\n//# sourceURL=webpack://tidebit-bridge/./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js?");

/***/ }),

/***/ "./src/frontend/scss/main.scss":
/*!*************************************!*\
  !*** ./src/frontend/scss/main.scss ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n    if(true) {\n      // 1623230482174\n      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ \"./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js\")(module.id, {\"locals\":false});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack://tidebit-bridge/./src/frontend/scss/main.scss?");

/***/ }),

/***/ "./node_modules/rlp/dist/index.js":
/*!****************************************!*\
  !*** ./node_modules/rlp/dist/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ \"./node_modules/buffer/index.js\")[\"Buffer\"];\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getLength = exports.decode = exports.encode = void 0;\nvar BN = __webpack_require__(/*! bn.js */ \"./node_modules/bn.js/lib/bn.js\");\n/**\n * RLP Encoding based on: https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP\n * This function takes in a data, convert it to buffer if not, and a length for recursion\n * @param input - will be converted to buffer\n * @returns returns buffer of encoded data\n **/\nfunction encode(input) {\n    if (Array.isArray(input)) {\n        var output = [];\n        for (var i = 0; i < input.length; i++) {\n            output.push(encode(input[i]));\n        }\n        var buf = Buffer.concat(output);\n        return Buffer.concat([encodeLength(buf.length, 192), buf]);\n    }\n    else {\n        var inputBuf = toBuffer(input);\n        return inputBuf.length === 1 && inputBuf[0] < 128\n            ? inputBuf\n            : Buffer.concat([encodeLength(inputBuf.length, 128), inputBuf]);\n    }\n}\nexports.encode = encode;\n/**\n * Parse integers. Check if there is no leading zeros\n * @param v The value to parse\n * @param base The base to parse the integer into\n */\nfunction safeParseInt(v, base) {\n    if (v.slice(0, 2) === '00') {\n        throw new Error('invalid RLP: extra zeros');\n    }\n    return parseInt(v, base);\n}\nfunction encodeLength(len, offset) {\n    if (len < 56) {\n        return Buffer.from([len + offset]);\n    }\n    else {\n        var hexLength = intToHex(len);\n        var lLength = hexLength.length / 2;\n        var firstByte = intToHex(offset + 55 + lLength);\n        return Buffer.from(firstByte + hexLength, 'hex');\n    }\n}\nfunction decode(input, stream) {\n    if (stream === void 0) { stream = false; }\n    if (!input || input.length === 0) {\n        return Buffer.from([]);\n    }\n    var inputBuffer = toBuffer(input);\n    var decoded = _decode(inputBuffer);\n    if (stream) {\n        return decoded;\n    }\n    if (decoded.remainder.length !== 0) {\n        throw new Error('invalid remainder');\n    }\n    return decoded.data;\n}\nexports.decode = decode;\n/**\n * Get the length of the RLP input\n * @param input\n * @returns The length of the input or an empty Buffer if no input\n */\nfunction getLength(input) {\n    if (!input || input.length === 0) {\n        return Buffer.from([]);\n    }\n    var inputBuffer = toBuffer(input);\n    var firstByte = inputBuffer[0];\n    if (firstByte <= 0x7f) {\n        return inputBuffer.length;\n    }\n    else if (firstByte <= 0xb7) {\n        return firstByte - 0x7f;\n    }\n    else if (firstByte <= 0xbf) {\n        return firstByte - 0xb6;\n    }\n    else if (firstByte <= 0xf7) {\n        // a list between  0-55 bytes long\n        return firstByte - 0xbf;\n    }\n    else {\n        // a list  over 55 bytes long\n        var llength = firstByte - 0xf6;\n        var length = safeParseInt(inputBuffer.slice(1, llength).toString('hex'), 16);\n        return llength + length;\n    }\n}\nexports.getLength = getLength;\n/** Decode an input with RLP */\nfunction _decode(input) {\n    var length, llength, data, innerRemainder, d;\n    var decoded = [];\n    var firstByte = input[0];\n    if (firstByte <= 0x7f) {\n        // a single byte whose value is in the [0x00, 0x7f] range, that byte is its own RLP encoding.\n        return {\n            data: input.slice(0, 1),\n            remainder: input.slice(1),\n        };\n    }\n    else if (firstByte <= 0xb7) {\n        // string is 0-55 bytes long. A single byte with value 0x80 plus the length of the string followed by the string\n        // The range of the first byte is [0x80, 0xb7]\n        length = firstByte - 0x7f;\n        // set 0x80 null to 0\n        if (firstByte === 0x80) {\n            data = Buffer.from([]);\n        }\n        else {\n            data = input.slice(1, length);\n        }\n        if (length === 2 && data[0] < 0x80) {\n            throw new Error('invalid rlp encoding: byte must be less 0x80');\n        }\n        return {\n            data: data,\n            remainder: input.slice(length),\n        };\n    }\n    else if (firstByte <= 0xbf) {\n        // string is greater than 55 bytes long. A single byte with the value (0xb7 plus the length of the length),\n        // followed by the length, followed by the string\n        llength = firstByte - 0xb6;\n        if (input.length - 1 < llength) {\n            throw new Error('invalid RLP: not enough bytes for string length');\n        }\n        length = safeParseInt(input.slice(1, llength).toString('hex'), 16);\n        if (length <= 55) {\n            throw new Error('invalid RLP: expected string length to be greater than 55');\n        }\n        data = input.slice(llength, length + llength);\n        if (data.length < length) {\n            throw new Error('invalid RLP: not enough bytes for string');\n        }\n        return {\n            data: data,\n            remainder: input.slice(length + llength),\n        };\n    }\n    else if (firstByte <= 0xf7) {\n        // a list between  0-55 bytes long\n        length = firstByte - 0xbf;\n        innerRemainder = input.slice(1, length);\n        while (innerRemainder.length) {\n            d = _decode(innerRemainder);\n            decoded.push(d.data);\n            innerRemainder = d.remainder;\n        }\n        return {\n            data: decoded,\n            remainder: input.slice(length),\n        };\n    }\n    else {\n        // a list  over 55 bytes long\n        llength = firstByte - 0xf6;\n        length = safeParseInt(input.slice(1, llength).toString('hex'), 16);\n        var totalLength = llength + length;\n        if (totalLength > input.length) {\n            throw new Error('invalid rlp: total length is larger than the data');\n        }\n        innerRemainder = input.slice(llength, totalLength);\n        if (innerRemainder.length === 0) {\n            throw new Error('invalid rlp, List has a invalid length');\n        }\n        while (innerRemainder.length) {\n            d = _decode(innerRemainder);\n            decoded.push(d.data);\n            innerRemainder = d.remainder;\n        }\n        return {\n            data: decoded,\n            remainder: input.slice(totalLength),\n        };\n    }\n}\n/** Check if a string is prefixed by 0x */\nfunction isHexPrefixed(str) {\n    return str.slice(0, 2) === '0x';\n}\n/** Removes 0x from a given String */\nfunction stripHexPrefix(str) {\n    if (typeof str !== 'string') {\n        return str;\n    }\n    return isHexPrefixed(str) ? str.slice(2) : str;\n}\n/** Transform an integer into its hexadecimal value */\nfunction intToHex(integer) {\n    if (integer < 0) {\n        throw new Error('Invalid integer as argument, must be unsigned!');\n    }\n    var hex = integer.toString(16);\n    return hex.length % 2 ? \"0\" + hex : hex;\n}\n/** Pad a string to be even */\nfunction padToEven(a) {\n    return a.length % 2 ? \"0\" + a : a;\n}\n/** Transform an integer into a Buffer */\nfunction intToBuffer(integer) {\n    var hex = intToHex(integer);\n    return Buffer.from(hex, 'hex');\n}\n/** Transform anything into a Buffer */\nfunction toBuffer(v) {\n    if (!Buffer.isBuffer(v)) {\n        if (typeof v === 'string') {\n            if (isHexPrefixed(v)) {\n                return Buffer.from(padToEven(stripHexPrefix(v)), 'hex');\n            }\n            else {\n                return Buffer.from(v);\n            }\n        }\n        else if (typeof v === 'number' || typeof v === 'bigint') {\n            if (!v) {\n                return Buffer.from([]);\n            }\n            else {\n                return intToBuffer(v);\n            }\n        }\n        else if (v === null || v === undefined) {\n            return Buffer.from([]);\n        }\n        else if (v instanceof Uint8Array) {\n            return Buffer.from(v);\n        }\n        else if (BN.isBN(v)) {\n            // converts a BN to a Buffer\n            return Buffer.from(v.toArray());\n        }\n        else {\n            throw new Error('invalid type');\n        }\n    }\n    return v;\n}\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://tidebit-bridge/./node_modules/rlp/dist/index.js?");

/***/ }),

/***/ "./src/frontend/javascript/component/scroll_item.js":
/*!**********************************************************!*\
  !*** ./src/frontend/javascript/component/scroll_item.js ***!
  \**********************************************************/
/***/ ((module) => {

eval("const scrollViewItem = (asset, selectedAsset,i) => {\n    const markup = `\n    <li index=${i} class=\"scrollview__item\">\n      <input type=\"radio\" name=\"assets-list\" id=\"assets-${(\n        asset.symbol + asset.network\n      ).toLowerCase()}\" class=\"scrollview__radio\" ${\n      asset.available ? (i === selectedAsset ? \"checked\" : \"enabled\") : \"disabled\"\n    }>\n      <label class=\"icontile\" for=\"assets-${(\n        asset.symbol + asset.network\n      ).toLowerCase()}\">\n        <div class=\"icontile__leading margin__right--small\">\n          <img src=${asset.icon} alt=${asset.symbol} class=\"icontile__icon\">\n        </div>\n        <div class=\"icontile__title-box\">\n          <div class=\"icontile__title--main\">${asset.symbol}</div>\n          <div class=\"icontile__title--sub\">${\n            asset.name + \" \" + asset.network\n          }</div>\n        </div>\n        <div class=\"icontile__suffix\"><i class=\"fas fa-check\"></i></div>\n      </label>\n    </li>\n    `;\n    return markup;\n  };\n\n  module.exports = scrollViewItem;\n\n//# sourceURL=webpack://tidebit-bridge/./src/frontend/javascript/component/scroll_item.js?");

/***/ }),

/***/ "./src/frontend/javascript/constant/assets.js":
/*!****************************************************!*\
  !*** ./src/frontend/javascript/constant/assets.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"assets\": () => (/* binding */ assets)\n/* harmony export */ });\nconst assets = [\n  {\n    symbol: \"BTC\",\n    name: \"Bitcoin\",\n    network: \"mainnet\",\n    available: true,\n    icon: \"https://www.tidebit.one/icons/btc.png\",\n    dailyLimit: 2,\n    minimumAmount: 0.00364,\n    maximumAmount: 0.45,\n  },\n  {\n    symbol: \"ETH\",\n    name: \"Ethereum\",\n    network: \"mainnet\",\n    available: true,\n    icon: \"https://www.tidebit.one/icons/eth.png\",\n    dailyLimit: 25.97,\n    minimumAmount: 0.052,\n    maximumAmount: 13.1,\n    chainId: \"0x1\",\n  },\n  {\n    symbol: \"ETH\",\n    name: \"Ethereum\",\n    network: \"ropsten\",\n    available: true,\n    icon: \"https://www.tidebit.one/icons/eth.png\",\n    dailyLimit: 25.97,\n    minimumAmount: 0.052,\n    maximumAmount: 13.1,\n    chainId: \"0x3\",\n  },\n  {\n    symbol: \"BCH\",\n    name: \"Bitcoin Cash\",\n    network: \"mainnet\",\n    available: false,\n    icon: \"https://www.tidebit.one/icons/bch.png\",\n  },\n  {\n    symbol: \"USDT\",\n    name: \"TetherUS\",\n    network: \"mainnet\",\n    available: false,\n    icon: \"https://www.tidebit.one/icons/usdt.png\",\n  },\n];\n\nconst getUrl = (asset) => {\n  let url;\n  switch (asset.network.toLowerCase()) {\n    case \"ropsten\":\n      url = \"https://ropsten.tidewallet.io\";\n      break;\n    case \"mainnet\":\n      url = \"https://ethereum.tidewallet.io\";\n      break;\n    default:\n      url = \"https://ropsten.tidewallet.io\";\n      break;\n  }\n  return url;\n};\n\n\n//# sourceURL=webpack://tidebit-bridge/./src/frontend/javascript/constant/assets.js?");

/***/ }),

/***/ "./src/frontend/javascript/constant/contract.js":
/*!******************************************************!*\
  !*** ./src/frontend/javascript/constant/contract.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CROSS_CHAIN_CHANNEL\": () => (/* binding */ CROSS_CHAIN_CHANNEL)\n/* harmony export */ });\nconst CROSS_CHAIN_CHANNEL = '0xc72c4102da25b3a84d8e892fcce7a74c2f3588f0';\n\n\n\n//# sourceURL=webpack://tidebit-bridge/./src/frontend/javascript/constant/contract.js?");

/***/ }),

/***/ "./src/frontend/javascript/constant/node.js":
/*!**************************************************!*\
  !*** ./src/frontend/javascript/constant/node.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getUrl\": () => (/* binding */ getUrl)\n/* harmony export */ });\nconst getUrl = (asset) => {\n    let url;\n    switch (asset.network.toLowerCase()) {\n      case \"ropsten\":\n        url = \"https://ropsten.tidewallet.io\";\n        break;\n      case \"mainnet\":\n        url = \"https://ethereum.tidewallet.io\";\n        break;\n      default:\n        url = \"https://ropsten.tidewallet.io\";\n        break;\n    }\n    return url;\n  };\n\n//# sourceURL=webpack://tidebit-bridge/./src/frontend/javascript/constant/node.js?");

/***/ }),

/***/ "./src/frontend/javascript/dom/elements.js":
/*!*************************************************!*\
  !*** ./src/frontend/javascript/dom/elements.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"connectWalletButton\": () => (/* binding */ connectWalletButton),\n/* harmony export */   \"pannelClose\": () => (/* binding */ pannelClose),\n/* harmony export */   \"loginStatus\": () => (/* binding */ loginStatus),\n/* harmony export */   \"userInfo\": () => (/* binding */ userInfo),\n/* harmony export */   \"toAddress\": () => (/* binding */ toAddress),\n/* harmony export */   \"scrollViewList\": () => (/* binding */ scrollViewList),\n/* harmony export */   \"selectedAssetLabel\": () => (/* binding */ selectedAssetLabel),\n/* harmony export */   \"accountBalance\": () => (/* binding */ accountBalance),\n/* harmony export */   \"addAssetButtun\": () => (/* binding */ addAssetButtun),\n/* harmony export */   \"hintTextAmountUint\": () => (/* binding */ hintTextAmountUint),\n/* harmony export */   \"minimunTransferAmount\": () => (/* binding */ minimunTransferAmount),\n/* harmony export */   \"maximunTransferAmount\": () => (/* binding */ maximunTransferAmount),\n/* harmony export */   \"dailyLimit\": () => (/* binding */ dailyLimit),\n/* harmony export */   \"totalSent\": () => (/* binding */ totalSent),\n/* harmony export */   \"inputAmount\": () => (/* binding */ inputAmount),\n/* harmony export */   \"nextButton\": () => (/* binding */ nextButton),\n/* harmony export */   \"alertDialog\": () => (/* binding */ alertDialog),\n/* harmony export */   \"dialogContent\": () => (/* binding */ dialogContent),\n/* harmony export */   \"dialogHintText\": () => (/* binding */ dialogHintText)\n/* harmony export */ });\nconst connectWalletButton = document.querySelector(\n    \".popup--wallet-connect .popup__button\"\n);\nconst pannelClose = document.querySelector(\"#pannel-close\");\nconst loginStatus = document.querySelector(\"#login-status\");\nconst userInfo = document.querySelector(\".header__user .header__user-address--path\");\nconst toAddress = document.querySelector(\".form .form__to-address\");\nconst scrollViewList = document.querySelector(\".scrollview__list\");\nconst selectedAssetLabel = document.querySelector(\"label[for='assets-selector']\");\nconst accountBalance = document.querySelector(\".form__walletconnected-amount\");\nconst addAssetButtun = document.querySelector(\"#add-asset\");\nconst hintTextAmountUint = document.querySelector(\".form__hint-text--unit\");\nconst minimunTransferAmount = document.querySelector(\".form__amount-minimum span\");\nconst maximunTransferAmount = document.querySelector(\".form__amount-maximumn span\");\nconst dailyLimit = document.querySelectorAll(\".daily__limit\");\nconst totalSent = document.querySelector(\".daily__total-sent\");\nconst inputAmount = document.querySelector(\"#amount\");\nconst nextButton = document.querySelector(\".form .form__button\");\nconst alertDialog = document.querySelector(\"#alert-dialog\");\nconst dialogContent = document.querySelector(\".popup--alert .circle-loader\");\nconst dialogHintText = document.querySelector(\".popup--alert .popup__hint-text div\");\n\n//# sourceURL=webpack://tidebit-bridge/./src/frontend/javascript/dom/elements.js?");

/***/ }),

/***/ "./src/frontend/javascript/index.js":
/*!******************************************!*\
  !*** ./src/frontend/javascript/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rlp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rlp */ \"./node_modules/rlp/dist/index.js\");\n\n\nconst metamask = __webpack_require__(/*! ./utils/ethereum */ \"./src/frontend/javascript/utils/ethereum.js\");\nconst rpc = __webpack_require__(/*! ./utils/rpc */ \"./src/frontend/javascript/utils/rpc.js\");\nconst elements = __webpack_require__(/*! ./dom/elements */ \"./src/frontend/javascript/dom/elements.js\");\nconst scrollViewItem = __webpack_require__(/*! ./component/scroll_item */ \"./src/frontend/javascript/component/scroll_item.js\");\nconst _assets = __webpack_require__(/*! ./constant/assets */ \"./src/frontend/javascript/constant/assets.js\");\n\nconst assets = _assets.assets.map((_asset) => ({ ..._asset }));\n\nlet userAccount;\nlet selectedAsset = 2; // index\nlet chainId;\n\nconst listScrollView = () => {\n  let asset = assets[selectedAsset];\n  elements.selectedAssetLabel.innerText = asset.symbol;\n  elements.scrollViewList.replaceChildren();\n  assets.forEach((asset, i) =>\n    elements.scrollViewList.insertAdjacentHTML(\n      \"beforeend\",\n      scrollViewItem(asset, selectedAsset, i)\n    )\n  );\n};\n\nconst updateSelectedAsset = async (isLogin) => {\n  let asset = assets[selectedAsset];\n  if (isLogin || elements.loginStatus.checked) {\n    elements.minimunTransferAmount.textContent =\n      asset.minimumAmount + \" \" + asset.symbol;\n    elements.maximunTransferAmount.textContent =\n      asset.maximumAmount + \" \" + asset.symbol;\n    elements.loginStatus.checked = true;\n    // update account address\n    elements.userInfo.textContent =\n      userAccount.slice(0, 5) +\n      \"...\" +\n      userAccount.slice(userAccount.length - 5, userAccount.length);\n    elements.toAddress.textContent =\n      userAccount.slice(0, 8) +\n      \"...\" +\n      userAccount.slice(userAccount.length - 8, userAccount.length);\n    // update account balance\n    console.log(\"elements.dailyLimit e\", elements.dailyLimit);\n    Array.from(elements.dailyLimit).forEach((e) => {\n      console.log(\"elements.dailyLimit e\", e.textContent);\n      e.textContent = asset.dailyLimit + \" \" + asset.symbol;\n    });\n    asset.balance = await rpc.getBalance(asset, userAccount);\n    elements.accountBalance.textContent = asset.balance + \" \" + asset.symbol;\n  }\n  elements.addAssetButtun.textContent = asset.symbol;\n  elements.hintTextAmountUint.textContent = asset.symbol;\n  elements.selectedAssetLabel.textContent = asset.symbol;\n};\n\nconst connectWallet = async () => {\n  console.log(\"click connectWallet\");\n  const optionsOfWallet = document.querySelectorAll(\n    '.popup--wallet-connect input[name=\"connectwallet\"]'\n  );\n  let selectedOption = Array.prototype.slice\n    .call(optionsOfWallet)\n    .find((option) => option.checked);\n  console.log(selectedOption);\n  if (selectedOption !== undefined) {\n    elements.pannelClose.checked = true;\n    switch (selectedOption.id) {\n      case \"metamask\":\n        const account = await metamask.connect();\n        if (account) {\n          userAccount = account;\n          // ++ TODO\n          const _chainId = await metamask.getChainId();\n          console.log(_chainId);\n          if (_chainId) chainId = _chainId;\n          await updateSelectedAsset(true);\n        }\n        break;\n      case \"tidebit\":\n        console.log(\"tidebit: comming soon\");\n        break;\n      case \"walletconnect\":\n        console.log(\"walletconnect: comming soon\");\n        break;\n    }\n  }\n  return;\n};\n\nelements.connectWalletButton.addEventListener(\"click\", () => connectWallet());\n\nelements.scrollViewList.addEventListener(\"click\", async (el) => {\n  if (el.target.parentNode.attributes.index) {\n    selectedAsset = el.target.parentNode.attributes.index.value;\n    await updateSelectedAsset();\n    console.log(\"selectedAsset\", selectedAsset);\n  }\n});\nelements.nextButton.addEventListener(\"click\", async () => {\n  const [error, result] = await metamask.sendTransaction(\n    userAccount,\n    elements.inputAmount.value,\n    assets[selectedAsset]\n  );\n  if (error) {\n    console.log(error);\n    elements.alertDialog.checked = true;\n    elements.dialogContent.classList.remove(\"success\");\n    elements.dialogContent.classList.add(\"failed\");\n    elements.dialogHintText.textContent = \"Transaction Failed\";\n  } else {\n    console.log(result);\n    elements.alertDialog.checked = true;\n    elements.dialogContent.classList.remove(\"failed\");\n    elements.dialogContent.classList.add(\"success\");\n    elements.dialogHintText.textContent = \"Transaction Success\";\n  }\n});\n\nethereum.on(\"accountsChanged\", (accounts) => {\n  window.location.reload();\n  // Handle the new accounts, or lack thereof.\n  console.log(accounts);\n});\n\nethereum.on(\"chainChanged\", (_chainId) => {\n  console.log(_chainId);\n  chainId = _chainId;\n  // We recommend reloading the page, unless you must do otherwise\n  // window.location.reload();\n});\n\nlistScrollView();\n\n(() => {\n  const data = rlp__WEBPACK_IMPORTED_MODULE_0__.encode(\"0xd86b75c7\");\n  console.log(data);\n  console.log(data.toString(\"hex\"));\n  console.log(rlp__WEBPACK_IMPORTED_MODULE_0__.encode([]));\n  elements.alertDialog.checked = true;\n  elements.dialogContent.classList.remove(\"failed\");\n  elements.dialogContent.classList.add(\"success\");\n  elements.dialogHintText.textContent = \"Transaction Success\";\n})();\n\n\n//# sourceURL=webpack://tidebit-bridge/./src/frontend/javascript/index.js?");

/***/ }),

/***/ "./src/frontend/javascript/utils/ethereum.js":
/*!***************************************************!*\
  !*** ./src/frontend/javascript/utils/ethereum.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const utils = __webpack_require__(/*! ./utils */ \"./src/frontend/javascript/utils/utils.js\");\nconst rpc = __webpack_require__(/*! ./rpc */ \"./src/frontend/javascript/utils/rpc.js\");\n// ++ get from toml later\nconst contract = __webpack_require__(/*! ../constant/contract */ \"./src/frontend/javascript/constant/contract.js\");\n\nconst requestPermissions = async () => {\n  const [error, permissions] = await utils.to(\n    ethereum.request({\n      method: \"wallet_requestPermissions\",\n      params: [{ eth_accounts: {} }],\n    })\n  );\n  if (error) {\n    if (error.code === 4001) {\n      // EIP-1193 userRejectedRequest error\n      console.log(\"Permissions needed to continue.\");\n    } else {\n      console.error(error);\n    }\n  } else {\n    const accountsPermission = permissions.find(\n      (permission) => permission.parentCapability === \"eth_accounts\"\n    );\n    if (accountsPermission) {\n      console.log(\"eth_accounts permission successfully requested!\");\n    }\n  }\n};\n\nconst checkLoginStatus = () => {\n  console.log(ethereum.isConnected());\n  // if (typeof window.ethereum !== \"undefined\" && ethereum.isConnected()) {\n  //   connect();\n  // }\n};\n\nconst sendTransaction = async (account, amount, asset) => {\n  return await utils.to(\n    ethereum.request({\n      method: \"eth_sendTransaction\",\n      params: [\n        {\n          from: account,\n          to: contract.CROSS_CHAIN_CHANNEL,\n          // gas: \"0x76c0\", // 30400\n          gasPrice: await rpc.getGasPrice(asset), //\"0x9184e72a000\", // 10000000000000\n          value: utils.bnToHex(utils.toWei(parseFloat(amount), \"ether\")), // 2441406250\n          data: \"0xd86b75c7\", //\"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675\",\n          chainId: asset.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.\n        },\n      ],\n    })\n  );\n};\n\nconst connect = async () => {\n  if (typeof window.ethereum !== \"undefined\") {\n    const [error, accounts] = await utils.to(\n      // https://docs.metamask.io/guide/getting-started.html#basic-considerations\n      ethereum.request({\n        method: \"eth_requestAccounts\",\n      })\n    );\n    if (error) {\n      if (error.code === 4001) {\n        // 4001\n        // The request was rejected by the user\n        // -32602\n        // The parameters were invalid\n        // -32603\n        // Internal error\n        console.log(\"Please connect to MetaMask.\");\n        //++ open extension\n      } else {\n        console.error(error);\n      }\n      return false;\n    } else {\n      const account = accounts[0];\n      // We currently only ever provide a single account,\n      // but the array gives us some room to grow.\n      console.log(account);\n      return account;\n    }\n  }\n  console.log(\"MetaMask isn't installed!\");\n  return false;\n};\n\nconst getChainId = async () => {\n  const [error, result] = await utils.to(\n    ethereum.request({ method: \"eth_chainId\" })\n  );\n  if (error) {\n    // ++\n    return false;\n  } else {\n    // Hex\tDecimal\t    Network\n    // 0x1\t  1\t        Ethereum  Main Network (Mainnet)\n    // 0x3\t  3\t        Ropsten Test Network\n    // 0x4\t  4\t        Rinkeby Test Network\n    // 0x5\t  5\t        Goerli Test Network\n    // 0x2a\t  42\t      Kovan Test Network\n    return result;\n  }\n};\n\nmodule.exports.connect = connect;\nmodule.exports.getChainId = getChainId;\nmodule.exports.sendTransaction = sendTransaction;\n\n\n//# sourceURL=webpack://tidebit-bridge/./src/frontend/javascript/utils/ethereum.js?");

/***/ }),

/***/ "./src/frontend/javascript/utils/rpc.js":
/*!**********************************************!*\
  !*** ./src/frontend/javascript/utils/rpc.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const utils = __webpack_require__(/*! ./utils */ \"./src/frontend/javascript/utils/utils.js\");\nconst node = __webpack_require__(/*! ../constant/node */ \"./src/frontend/javascript/constant/node.js\");\n\nconst jsonRPC = (method, asset, account) => {\n  console.log(\"method\", method);\n  console.log(\"asset\", asset);\n  console.log(\"account\", account);\n\n  const opts = {};\n  opts.headers = { \"content-type\": \"application/json\" };\n  opts.method = \"POST\";\n  opts.url = node.getUrl(asset);\n  switch (method) {\n    case \"eth_getTransactionCount\":\n      opts.payload = `{\n        \"jsonrpc\":\"2.0\",\n        \"method\":\"eth_getTransactionCount\",\n        \"params\":[\"${account}\",\"latest\"],\n        \"id\": \"${utils.randomID()}\"\n      }`;\n      break;\n    case \"eth_getBalance\":\n      opts.payload = `{\n          \"jsonrpc\":\"2.0\",\n          \"method\":\"eth_getBalance\",\n          \"params\":[\"${account}\",\"latest\"],\n          \"id\": \"${utils.randomID()}\"\n        }`;\n      break;\n    case \"eth_gasPrice\":\n      opts.payload = `{\n          \"jsonrpc\":\"2.0\",\n          \"method\":\"eth_gasPrice\", \n          \"params\":[],\n          \"id\": \"${utils.randomID()}\"\n        }`;\n      break;\n    case \"eth_estimateGas\":\n      opts.payload = `{\n          \"jsonrpc\":\"2.0\",\n          \"method\":\"eth_estimateGas\",\n          \"params\":[],\n          \"id\": \"${utils.randomID()}\"\n        }`;\n      break;\n  }\n  return opts;\n};\n\nconst estimateGas = async (txHex) => {\n  const [error, resultObj] = await utils.to(\n    utils.request(jsonRPC(\"eth_estimateGas\", txHex))\n  );\n  if (error) {\n    console.log(error);\n  } else {\n    console.log(resultObj); // --\n    const estimateGas = resultObj.result;\n    console.log(estimateGas); // \"0x5208\" // 21000\n    return estimateGas;\n  }\n};\nconst getGasPrice = async (asset) => {\n  const [error, resultObj] = await utils.to(\n    utils.request(jsonRPC(\"eth_gasPrice\", asset))\n  );\n  if (error) {\n    console.log(error);\n  } else {\n    console.log(resultObj); // --\n    const gasPrice = resultObj.result;\n    console.log(gasPrice); // \"0x1dfd14000\" // 8049999872 Wei\n    return gasPrice;\n  }\n};\nconst getBalance = async (asset, account) => {\n  console.log(\"getBalance\", account);\n  const [error, resultObj] = await utils.to(\n    utils.request(jsonRPC(\"eth_getBalance\", asset, account))\n  );\n  if (error) {\n    console.log(error);\n  } else {\n    console.log(resultObj); // --\n    const balance = utils.toEther(parseInt(resultObj.result), \"wei\");\n    console.log(balance); // --\n    return balance;\n  }\n};\n\nmodule.exports.getBalance = getBalance;\nmodule.exports.getGasPrice = getGasPrice;\nmodule.exports.estimateGas = estimateGas;\n\n// module.exports = {\n//     getBalance: getBalance,\n// }\n\n\n//# sourceURL=webpack://tidebit-bridge/./src/frontend/javascript/utils/rpc.js?");

/***/ }),

/***/ "./src/frontend/javascript/utils/utils.js":
/*!************************************************!*\
  !*** ./src/frontend/javascript/utils/utils.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"randomID\": () => (/* binding */ randomID),\n/* harmony export */   \"to\": () => (/* binding */ to),\n/* harmony export */   \"request\": () => (/* binding */ request),\n/* harmony export */   \"toEther\": () => (/* binding */ toEther),\n/* harmony export */   \"toWei\": () => (/* binding */ toWei),\n/* harmony export */   \"bnToHex\": () => (/* binding */ bnToHex),\n/* harmony export */   \"encodeMessage\": () => (/* binding */ encodeMessage)\n/* harmony export */ });\nconst randomID = (n) => {\n  var ID = \"\";\n  var text = \"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\";\n  n = parseInt(n);\n  if (!(n > 0)) {\n    n = 8;\n  }\n  while (ID.length < n) {\n    ID = ID.concat(text.charAt(parseInt(Math.random() * text.length)));\n  }\n  return ID;\n};\n\nconst to = (promise) => {\n  return promise\n    .then((data) => {\n      return [null, data];\n    })\n    .catch((err) => [err, null]);\n};\n\nconst request = (opts) => {\n  const xhr = new XMLHttpRequest();\n  // xhr.responseType = \"arraybuffer\";\n  if (opts.responseType === \"arraybuffer\") {\n    xhr.responseType = \"arraybuffer\";\n  }\n  return new Promise((resolve, reject) => {\n    xhr.onreadystatechange = () => {\n      // only run if the request is complete\n      if (xhr.readyState !== 4) return;\n      if (xhr.status >= 200 && xhr.status < 300) {\n        // If successful\n        opts.responseType === \"arraybuffer\"\n          ? resolve(new Uint8Array(xhr.response))\n          : resolve(JSON.parse(xhr.responseText));\n      } else {\n        // If false\n        reject(xhr.response);\n      }\n    };\n    // Setup HTTP request\n    xhr.open(opts.method || \"GET\", opts.url, true);\n    if (opts.headers) {\n      Object.keys(opts.headers).forEach((key) =>\n        xhr.setRequestHeader(key, opts.headers[key])\n      );\n    }\n    // Send the request\n    if (opts.contentType === \"application/json\") {\n      xhr.setRequestHeader(\"content-type\", \"application/json\");\n      xhr.send(JSON.stringify(opts.payload));\n    } else {\n      xhr.send(opts.payload);\n    }\n  });\n};\n\nconst toEther = (amount, unit) => {\n  switch (unit) {\n    case \"wei\":\n      return amount / Math.pow(10, 18);\n    case \"gwei\":\n      return amount / Math.pow(10, 9);\n  }\n};\n\nconst toWei = (amount, unit) => {\n  switch (unit) {\n    case \"ether\":\n      return amount * Math.pow(10, 18);\n    case \"gwei\":\n      return amount * Math.pow(10, 9);\n  }\n};\nconst bitnot =(bn) =>{\n  bn = -bn;\n  var bin = (bn).toString(2)\n  var prefix = '';\n  while (bin.length % 8) { bin = '0' + bin; }\n  if ('1' === bin[0] && -1 !== bin.slice(1).indexOf('1')) {\n    prefix = '11111111';\n  }\n  bin = bin.split('').map(function (i) {\n    return '0' === i ? '1' : '0';\n  }).join('');\n  return BigInt('0b' + prefix + bin) + BigInt(1);\n}\n\nconst bnToHex = (bn) => {\n  let pos = true;\n  bn = BigInt(bn);\n\n  // I've noticed that for some operations BigInts can\n  // only be compared to other BigInts (even small ones).\n  // However, <, >, and == allow mix and match\n  if (bn < 0) {\n    pos = false;\n    bn = bitnot(bn);\n  }\n\n  var base = 16;\n  var hex = bn.toString(base);\n  if (hex.length % 2) {\n    hex = \"0x0\" + hex;\n  }\n\n  // Check the high byte _after_ proper hex padding\n  var highbyte = parseInt(hex.slice(0, 2), 16);\n  var highbit = 0x80 & highbyte;\n\n  if (pos && highbit) {\n    // A 32-byte positive integer _may_ be\n    // represented in memory as 33 bytes if needed\n    hex = \"0x\" + hex;\n  }\n\n  return hex;\n};\n\nconst encodeMessage = (message, amount) => {\n  const encodedMessage =\n    \"0x\" +\n    // pack(\"erc20Func\") +//-- 錯的\n    userAccount?.slice(2) +\n    utils.bnToHex(utils.toWei(amount, \"ether\")).slice(2) +\n    (!message ? \"\" : encodeURI(message).toString(\"hex\"));\n  return encodedMessage;\n};\n\n//# sourceURL=webpack://tidebit-bridge/./src/frontend/javascript/utils/utils.js?");

/***/ }),

/***/ "./src/frontend/main.js":
/*!******************************!*\
  !*** ./src/frontend/main.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/main.scss */ \"./src/frontend/scss/main.scss\");\n/* harmony import */ var _javascript_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./javascript/index.js */ \"./src/frontend/javascript/index.js\");\n\n\n\n//# sourceURL=webpack://tidebit-bridge/./src/frontend/main.js?");

/***/ }),

/***/ "?8131":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://tidebit-bridge/buffer_(ignored)?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("2a5cbfa06478da9d5a45")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "tidebit-bridge:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				registeredStatusHandlers[i].call(null, newStatus);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			setStatus("check");
/******/ 			return __webpack_require__.hmrM().then(function (update) {
/******/ 				if (!update) {
/******/ 					setStatus(applyInvalidatedModules() ? "ready" : "idle");
/******/ 					return null;
/******/ 				}
/******/ 		
/******/ 				setStatus("prepare");
/******/ 		
/******/ 				var updatedModules = [];
/******/ 				blockingPromises = [];
/******/ 				currentUpdateApplyHandlers = [];
/******/ 		
/******/ 				return Promise.all(
/******/ 					Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 						promises,
/******/ 						key
/******/ 					) {
/******/ 						__webpack_require__.hmrC[key](
/******/ 							update.c,
/******/ 							update.r,
/******/ 							update.m,
/******/ 							promises,
/******/ 							currentUpdateApplyHandlers,
/******/ 							updatedModules
/******/ 						);
/******/ 						return promises;
/******/ 					},
/******/ 					[])
/******/ 				).then(function () {
/******/ 					return waitForBlockingPromises(function () {
/******/ 						if (applyOnUpdate) {
/******/ 							return internalApply(applyOnUpdate);
/******/ 						} else {
/******/ 							setStatus("ready");
/******/ 		
/******/ 							return updatedModules;
/******/ 						}
/******/ 					});
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				setStatus("abort");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			// handle errors in accept handlers and self accepted module load
/******/ 			if (error) {
/******/ 				setStatus("fail");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw error;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			if (queuedInvalidatedModules) {
/******/ 				return internalApply(options).then(function (list) {
/******/ 					outdatedModules.forEach(function (moduleId) {
/******/ 						if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 					});
/******/ 					return list;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			setStatus("idle");
/******/ 			return Promise.resolve(outdatedModules);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		var createStylesheet = (chunkId, fullhref, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatetidebit_bridge"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/frontend/main.js");
/******/ 	
/******/ })()
;