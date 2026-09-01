var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// vendor/fonteditor-core/lib/nodejs/buffer.js
var require_buffer = __commonJS({
  "vendor/fonteditor-core/lib/nodejs/buffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _default = exports2.default = {
      /**
       * Buffer转换成ArrayBuffer
       *
       * @param {Buffer} buffer 缓冲数组
       * @return {ArrayBuffer}
       */
      toArrayBuffer: function toArrayBuffer(buffer) {
        var length = buffer.length;
        var view = new DataView(new ArrayBuffer(length), 0, length);
        for (var i = 0, l = length; i < l; i++) {
          view.setUint8(i, buffer[i], false);
        }
        return view.buffer;
      },
      /**
       * ArrayBuffer转换成Buffer
       *
       * @param {ArrayBuffer} arrayBuffer 缓冲数组
       * @return {Buffer}
       */
      /**
       * 优化311: ArrayBuffer→Buffer 用 Buffer.from 共享底层内存（零拷贝），
       * 替代逐字节 view.getUint8 循环（千字文 ttf 162KB 输出时为 toBuffer 9% 热点）。
       * write 产出的 ArrayBuffer 后续不再修改，共享安全。
       */
      toBuffer: function toBuffer(arrayBuffer) {
        if (Array.isArray(arrayBuffer)) {
          return Buffer.from(arrayBuffer);
        }
        return Buffer.from(arrayBuffer);
      }
    };
  }
});

// vendor/fonteditor-core/lib/common/lang.js
var require_lang = __commonJS({
  "vendor/fonteditor-core/lib/common/lang.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.clone = clone;
    exports2.curry = curry;
    exports2.debounce = debounce;
    exports2.equals = equals;
    exports2.generic = generic;
    exports2.isArray = isArray;
    exports2.isDate = isDate;
    exports2.isEmptyObject = isEmptyObject;
    exports2.isFunction = isFunction;
    exports2.isObject = isObject;
    exports2.isString = isString;
    exports2.overwrite = overwrite;
    exports2.throttle = throttle;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function isArray(obj) {
      return obj != null && toString.call(obj).slice(8, -1) === "Array";
    }
    function isObject(obj) {
      return obj != null && toString.call(obj).slice(8, -1) === "Object";
    }
    function isString(obj) {
      return obj != null && toString.call(obj).slice(8, -1) === "String";
    }
    function isFunction(obj) {
      return obj != null && toString.call(obj).slice(8, -1) === "Function";
    }
    function isDate(obj) {
      return obj != null && toString.call(obj).slice(8, -1) === "Date";
    }
    function isEmptyObject(object) {
      for (var name in object) {
        if (object.hasOwnProperty(name)) {
          return false;
        }
      }
      return true;
    }
    function curry(fn) {
      for (var _len = arguments.length, cargs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        cargs[_key - 1] = arguments[_key];
      }
      return function() {
        for (var _len2 = arguments.length, rargs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          rargs[_key2] = arguments[_key2];
        }
        var args = cargs.concat(rargs);
        return fn.apply(this, args);
      };
    }
    function generic(method) {
      return function() {
        for (var _len3 = arguments.length, fargs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          fargs[_key3] = arguments[_key3];
        }
        return Function.call.apply(method, fargs);
      };
    }
    function overwrite(thisObj, thatObj, fields) {
      if (!thatObj) {
        return thisObj;
      }
      fields = fields || Object.keys(thatObj);
      fields.forEach(function(field) {
        if (thisObj[field] && _typeof(thisObj[field]) === "object" && thatObj[field] && _typeof(thatObj[field]) === "object") {
          overwrite(thisObj[field], thatObj[field]);
        } else {
          thisObj[field] = thatObj[field];
        }
      });
      return thisObj;
    }
    function clone(source) {
      if (!source || _typeof(source) !== "object") {
        return source;
      }
      var cloned = source;
      if (isArray(source)) {
        cloned = source.slice().map(clone);
      } else if (isObject(source) && "isPrototypeOf" in source) {
        cloned = {};
        for (var _i = 0, _Object$keys = Object.keys(source); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          cloned[key] = clone(source[key]);
        }
      }
      return cloned;
    }
    function throttle(func, wait) {
      var context;
      var args;
      var timeout;
      var result;
      var previous = 0;
      var later = function later2() {
        previous = /* @__PURE__ */ new Date();
        timeout = null;
        result = func.apply(context, args);
      };
      return function() {
        var now = /* @__PURE__ */ new Date();
        var remaining = wait - (now - previous);
        context = this;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          for (var _len4 = arguments.length, args2 = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args2[_key4] = arguments[_key4];
          }
          result = func.apply(context, args2);
        } else if (!timeout) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }
    function debounce(func, wait, immediate) {
      var timeout;
      var result;
      return function() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }
        var context = this;
        var later = function later2() {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
        }
        return result;
      };
    }
    function equals(thisObj, thatObj, fields) {
      if (thisObj === thatObj) {
        return true;
      }
      if (thisObj == null && thatObj == null) {
        return true;
      }
      if (thisObj == null && thatObj != null || thisObj != null && thatObj == null) {
        return false;
      }
      fields = fields || (_typeof(thisObj) === "object" ? Object.keys(thisObj) : []);
      if (!fields.length) {
        return thisObj === thatObj;
      }
      var equal = true;
      for (var i = 0, l = fields.length, field; equal && i < l; i++) {
        field = fields[i];
        if (thisObj[field] && _typeof(thisObj[field]) === "object" && thatObj[field] && _typeof(thatObj[field]) === "object") {
          equal = equal && equals(thisObj[field], thatObj[field]);
        } else {
          equal = equal && thisObj[field] === thatObj[field];
        }
      }
      return equal;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/data/empty.js
var require_empty = __commonJS({
  "vendor/fonteditor-core/lib/ttf/data/empty.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _default = exports2.default = {
      "version": 1,
      "numTables": 10,
      "searchRange": 128,
      "entrySelector": 3,
      "rangeShift": 64,
      "head": {
        "version": 1,
        "fontRevision": 1,
        "checkSumAdjustment": 0,
        "magickNumber": 1594834165,
        "flags": 11,
        "unitsPerEm": 1024,
        "created": 14289408e5,
        "modified": 14289408e5,
        "xMin": 34,
        "yMin": 0,
        "xMax": 306,
        "yMax": 682,
        "macStyle": 0,
        "lowestRecPPEM": 8,
        "fontDirectionHint": 2,
        "indexToLocFormat": 0,
        "glyphDataFormat": 0
      },
      "glyf": [{
        "contours": [[{
          "x": 34,
          "y": 0,
          "onCurve": true
        }, {
          "x": 34,
          "y": 682,
          "onCurve": true
        }, {
          "x": 306,
          "y": 682,
          "onCurve": true
        }, {
          "x": 306,
          "y": 0,
          "onCurve": true
        }], [{
          "x": 68,
          "y": 34,
          "onCurve": true
        }, {
          "x": 272,
          "y": 34,
          "onCurve": true
        }, {
          "x": 272,
          "y": 648,
          "onCurve": true
        }, {
          "x": 68,
          "y": 648,
          "onCurve": true
        }]],
        "xMin": 34,
        "yMin": 0,
        "xMax": 306,
        "yMax": 682,
        "advanceWidth": 374,
        "leftSideBearing": 34,
        "name": ".notdef"
      }],
      "cmap": {},
      "name": {
        "fontFamily": "fonteditor",
        "fontSubFamily": "Medium",
        "uniqueSubFamily": "FontEditor 1.0 : fonteditor",
        "version": "Version 1.0 ; FontEditor (v0.0.1)",
        "postScriptName": "fonteditor",
        "fullName": "fonteditor"
      },
      "hhea": {
        "version": 1,
        "ascent": 812,
        "descent": -212,
        "lineGap": 92,
        "advanceWidthMax": 374,
        "minLeftSideBearing": 34,
        "minRightSideBearing": 68,
        "xMaxExtent": 306,
        "caretSlopeRise": 1,
        "caretSlopeRun": 0,
        "caretOffset": 0,
        "reserved0": 0,
        "reserved1": 0,
        "reserved2": 0,
        "reserved3": 0,
        "metricDataFormat": 0,
        "numOfLongHorMetrics": 1
      },
      "post": {
        "italicAngle": 0,
        "postoints": 65411,
        "underlinePosition": 50,
        "underlineThickness": 0,
        "isFixedPitch": 0,
        "minMemType42": 0,
        "maxMemType42": 0,
        "minMemType1": 0,
        "maxMemType1": 1,
        "format": 2
      },
      "maxp": {
        "version": 1,
        "numGlyphs": 0,
        "maxPoints": 0,
        "maxContours": 0,
        "maxCompositePoints": 0,
        "maxCompositeContours": 0,
        "maxZones": 0,
        "maxTwilightPoints": 0,
        "maxStorage": 0,
        "maxFunctionDefs": 0,
        "maxStackElements": 0,
        "maxSizeOfInstructions": 0,
        "maxComponentElements": 0,
        "maxComponentDepth": 0
      },
      "OS/2": {
        "version": 4,
        "xAvgCharWidth": 1031,
        "usWeightClass": 400,
        "usWidthClass": 5,
        "fsType": 0,
        "ySubscriptXSize": 665,
        "ySubscriptYSize": 716,
        "ySubscriptXOffset": 0,
        "ySubscriptYOffset": 143,
        "ySuperscriptXSize": 665,
        "ySuperscriptYSize": 716,
        "ySuperscriptXOffset": 0,
        "ySuperscriptYOffset": 491,
        "yStrikeoutSize": 51,
        "yStrikeoutPosition": 265,
        "sFamilyClass": 0,
        "bFamilyType": 2,
        "bSerifStyle": 0,
        "bWeight": 6,
        "bProportion": 3,
        "bContrast": 0,
        "bStrokeVariation": 0,
        "bArmStyle": 0,
        "bLetterform": 0,
        "bMidline": 0,
        "bXHeight": 0,
        "ulUnicodeRange1": 1,
        "ulUnicodeRange2": 268435456,
        "ulUnicodeRange3": 0,
        "ulUnicodeRange4": 0,
        "achVendID": "PfEd",
        "fsSelection": 192,
        "usFirstCharIndex": 65535,
        "usLastCharIndex": -1,
        "sTypoAscender": 812,
        "sTypoDescender": -212,
        "sTypoLineGap": 92,
        "usWinAscent": 812,
        "usWinDescent": 212,
        "ulCodePageRange1": 1,
        "ulCodePageRange2": 0,
        "sxHeight": 792,
        "sCapHeight": 0,
        "usDefaultChar": 0,
        "usBreakChar": 32,
        "usMaxContext": 1
      }
    };
  }
});

// vendor/fonteditor-core/lib/ttf/data/default.js
var require_default = __commonJS({
  "vendor/fonteditor-core/lib/ttf/data/default.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _default = exports2.default = {
      // 默认的字体编码
      fontId: "fonteditor",
      // 默认的名字集合
      name: {
        // 默认的字体家族
        fontFamily: "fonteditor",
        fontSubFamily: "Medium",
        uniqueSubFamily: "FontEditor 1.0 : fonteditor",
        version: "Version 1.0; FontEditor (v1.0)",
        postScriptName: "fonteditor"
      }
    };
  }
});

// vendor/fonteditor-core/lib/ttf/getEmptyttfObject.js
var require_getEmptyttfObject = __commonJS({
  "vendor/fonteditor-core/lib/ttf/getEmptyttfObject.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = getEmpty;
    var _lang = require_lang();
    var _empty = _interopRequireDefault(require_empty());
    var _default = _interopRequireDefault(require_default());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getEmpty() {
      var ttf = (0, _lang.clone)(_empty.default);
      Object.assign(ttf.name, _default.default.name);
      ttf.head.created = ttf.head.modified = Date.now();
      return ttf;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/enum/unicodeName.js
var require_unicodeName = __commonJS({
  "vendor/fonteditor-core/lib/ttf/enum/unicodeName.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _default = exports2.default = {
      0: 1,
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 2,
      10: 1,
      11: 1,
      12: 1,
      13: 2,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 1,
      19: 1,
      20: 1,
      21: 1,
      22: 1,
      23: 1,
      24: 1,
      25: 1,
      26: 1,
      27: 1,
      28: 1,
      29: 1,
      30: 1,
      31: 1,
      32: 3,
      33: 4,
      34: 5,
      35: 6,
      36: 7,
      37: 8,
      38: 9,
      39: 10,
      40: 11,
      41: 12,
      42: 13,
      43: 14,
      44: 15,
      45: 16,
      46: 17,
      47: 18,
      48: 19,
      49: 20,
      50: 21,
      51: 22,
      52: 23,
      53: 24,
      54: 25,
      55: 26,
      56: 27,
      57: 28,
      58: 29,
      59: 30,
      60: 31,
      61: 32,
      62: 33,
      63: 34,
      64: 35,
      65: 36,
      66: 37,
      67: 38,
      68: 39,
      69: 40,
      70: 41,
      71: 42,
      72: 43,
      73: 44,
      74: 45,
      75: 46,
      76: 47,
      77: 48,
      78: 49,
      79: 50,
      80: 51,
      81: 52,
      82: 53,
      83: 54,
      84: 55,
      85: 56,
      86: 57,
      87: 58,
      88: 59,
      89: 60,
      90: 61,
      91: 62,
      92: 63,
      93: 64,
      94: 65,
      95: 66,
      96: 67,
      97: 68,
      98: 69,
      99: 70,
      100: 71,
      101: 72,
      102: 73,
      103: 74,
      104: 75,
      105: 76,
      106: 77,
      107: 78,
      108: 79,
      109: 80,
      110: 81,
      111: 82,
      112: 83,
      113: 84,
      114: 85,
      115: 86,
      116: 87,
      117: 88,
      118: 89,
      119: 90,
      120: 91,
      121: 92,
      122: 93,
      123: 94,
      124: 95,
      125: 96,
      126: 97,
      160: 172,
      161: 163,
      162: 132,
      163: 133,
      164: 189,
      165: 150,
      166: 232,
      167: 134,
      168: 142,
      169: 139,
      170: 157,
      171: 169,
      172: 164,
      174: 138,
      175: 218,
      176: 131,
      177: 147,
      178: 242,
      179: 243,
      180: 141,
      181: 151,
      182: 136,
      184: 222,
      185: 241,
      186: 158,
      187: 170,
      188: 245,
      189: 244,
      190: 246,
      191: 162,
      192: 173,
      193: 201,
      194: 199,
      195: 174,
      196: 98,
      197: 99,
      198: 144,
      199: 100,
      200: 203,
      201: 101,
      202: 200,
      203: 202,
      204: 207,
      205: 204,
      206: 205,
      207: 206,
      208: 233,
      209: 102,
      210: 211,
      211: 208,
      212: 209,
      213: 175,
      214: 103,
      215: 240,
      216: 145,
      217: 214,
      218: 212,
      219: 213,
      220: 104,
      221: 235,
      222: 237,
      223: 137,
      224: 106,
      225: 105,
      226: 107,
      227: 109,
      228: 108,
      229: 110,
      230: 160,
      231: 111,
      232: 113,
      233: 112,
      234: 114,
      235: 115,
      236: 117,
      237: 116,
      238: 118,
      239: 119,
      240: 234,
      241: 120,
      242: 122,
      243: 121,
      244: 123,
      245: 125,
      246: 124,
      247: 184,
      248: 161,
      249: 127,
      250: 126,
      251: 128,
      252: 129,
      253: 236,
      254: 238,
      255: 186,
      262: 253,
      263: 254,
      268: 255,
      269: 256,
      273: 257,
      286: 248,
      287: 249,
      304: 250,
      305: 215,
      321: 226,
      322: 227,
      338: 176,
      339: 177,
      350: 251,
      351: 252,
      352: 228,
      353: 229,
      376: 187,
      381: 230,
      382: 231,
      402: 166,
      710: 216,
      711: 225,
      728: 219,
      729: 220,
      730: 221,
      731: 224,
      733: 223,
      960: 155,
      8211: 178,
      8212: 179,
      8216: 182,
      8217: 183,
      8218: 196,
      8220: 180,
      8221: 181,
      8222: 197,
      8224: 130,
      8225: 194,
      8226: 135,
      8230: 171,
      8240: 198,
      8249: 190,
      8250: 191,
      8355: 247,
      8482: 140,
      8486: 159,
      8706: 152,
      8710: 168,
      8719: 154,
      8721: 153,
      8722: 239,
      8725: 188,
      8729: 195,
      8730: 165,
      8734: 146,
      8747: 156,
      8776: 167,
      8800: 143,
      8804: 148,
      8805: 149,
      9674: 185,
      61441: 192,
      61442: 193,
      64257: 192,
      64258: 193,
      65535: 0
      // 0xFFFF指向.notdef
    };
  }
});

// vendor/fonteditor-core/lib/ttf/enum/postName.js
var require_postName = __commonJS({
  "vendor/fonteditor-core/lib/ttf/enum/postName.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _default = exports2.default = {
      0: ".notdef",
      1: ".null",
      2: "nonmarkingreturn",
      3: "space",
      4: "exclam",
      5: "quotedbl",
      6: "numbersign",
      7: "dollar",
      8: "percent",
      9: "ampersand",
      10: "quotesingle",
      11: "parenleft",
      12: "parenright",
      13: "asterisk",
      14: "plus",
      15: "comma",
      16: "hyphen",
      17: "period",
      18: "slash",
      19: "zero",
      20: "one",
      21: "two",
      22: "three",
      23: "four",
      24: "five",
      25: "six",
      26: "seven",
      27: "eight",
      28: "nine",
      29: "colon",
      30: "semicolon",
      31: "less",
      32: "equal",
      33: "greater",
      34: "question",
      35: "at",
      36: "A",
      37: "B",
      38: "C",
      39: "D",
      40: "E",
      41: "F",
      42: "G",
      43: "H",
      44: "I",
      45: "J",
      46: "K",
      47: "L",
      48: "M",
      49: "N",
      50: "O",
      51: "P",
      52: "Q",
      53: "R",
      54: "S",
      55: "T",
      56: "U",
      57: "V",
      58: "W",
      59: "X",
      60: "Y",
      61: "Z",
      62: "bracketleft",
      63: "backslash",
      64: "bracketright",
      65: "asciicircum",
      66: "underscore",
      67: "grave",
      68: "a",
      69: "b",
      70: "c",
      71: "d",
      72: "e",
      73: "f",
      74: "g",
      75: "h",
      76: "i",
      77: "j",
      78: "k",
      79: "l",
      80: "m",
      81: "n",
      82: "o",
      83: "p",
      84: "q",
      85: "r",
      86: "s",
      87: "t",
      88: "u",
      89: "v",
      90: "w",
      91: "x",
      92: "y",
      93: "z",
      94: "braceleft",
      95: "bar",
      96: "braceright",
      97: "asciitilde",
      98: "Adieresis",
      99: "Aring",
      100: "Ccedilla",
      101: "Eacute",
      102: "Ntilde",
      103: "Odieresis",
      104: "Udieresis",
      105: "aacute",
      106: "agrave",
      107: "acircumflex",
      108: "adieresis",
      109: "atilde",
      110: "aring",
      111: "ccedilla",
      112: "eacute",
      113: "egrave",
      114: "ecircumflex",
      115: "edieresis",
      116: "iacute",
      117: "igrave",
      118: "icircumflex",
      119: "idieresis",
      120: "ntilde",
      121: "oacute",
      122: "ograve",
      123: "ocircumflex",
      124: "odieresis",
      125: "otilde",
      126: "uacute",
      127: "ugrave",
      128: "ucircumflex",
      129: "udieresis",
      130: "dagger",
      131: "degree",
      132: "cent",
      133: "sterling",
      134: "section",
      135: "bullet",
      136: "paragraph",
      137: "germandbls",
      138: "registered",
      139: "copyright",
      140: "trademark",
      141: "acute",
      142: "dieresis",
      143: "notequal",
      144: "AE",
      145: "Oslash",
      146: "infinity",
      147: "plusminus",
      148: "lessequal",
      149: "greaterequal",
      150: "yen",
      151: "mu",
      152: "partialdiff",
      153: "summation",
      154: "product",
      155: "pi",
      156: "integral",
      157: "ordfeminine",
      158: "ordmasculine",
      159: "Omega",
      160: "ae",
      161: "oslash",
      162: "questiondown",
      163: "exclamdown",
      164: "logicalnot",
      165: "radical",
      166: "florin",
      167: "approxequal",
      168: "Delta",
      169: "guillemotleft",
      170: "guillemotright",
      171: "ellipsis",
      172: "nonbreakingspace",
      173: "Agrave",
      174: "Atilde",
      175: "Otilde",
      176: "OE",
      177: "oe",
      178: "endash",
      179: "emdash",
      180: "quotedblleft",
      181: "quotedblright",
      182: "quoteleft",
      183: "quoteright",
      184: "divide",
      185: "lozenge",
      186: "ydieresis",
      187: "Ydieresis",
      188: "fraction",
      189: "currency",
      190: "guilsinglleft",
      191: "guilsinglright",
      192: "fi",
      193: "fl",
      194: "daggerdbl",
      195: "periodcentered",
      196: "quotesinglbase",
      197: "quotedblbase",
      198: "perthousand",
      199: "Acircumflex",
      200: "Ecircumflex",
      201: "Aacute",
      202: "Edieresis",
      203: "Egrave",
      204: "Iacute",
      205: "Icircumflex",
      206: "Idieresis",
      207: "Igrave",
      208: "Oacute",
      209: "Ocircumflex",
      210: "apple",
      211: "Ograve",
      212: "Uacute",
      213: "Ucircumflex",
      214: "Ugrave",
      215: "dotlessi",
      216: "circumflex",
      217: "tilde",
      218: "macron",
      219: "breve",
      220: "dotaccent",
      221: "ring",
      222: "cedilla",
      223: "hungarumlaut",
      224: "ogonek",
      225: "caron",
      226: "Lslash",
      227: "lslash",
      228: "Scaron",
      229: "scaron",
      230: "Zcaron",
      231: "zcaron",
      232: "brokenbar",
      233: "Eth",
      234: "eth",
      235: "Yacute",
      236: "yacute",
      237: "Thorn",
      238: "thorn",
      239: "minus",
      240: "multiply",
      241: "onesuperior",
      242: "twosuperior",
      243: "threesuperior",
      244: "onehalf",
      245: "onequarter",
      246: "threequarters",
      247: "franc",
      248: "Gbreve",
      249: "gbreve",
      250: "Idotaccent",
      251: "Scedilla",
      252: "scedilla",
      253: "Cacute",
      254: "cacute",
      255: "Ccaron",
      256: "ccaron",
      257: "dcroat"
    };
  }
});

// vendor/fonteditor-core/lib/ttf/util/string.js
var require_string = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/string.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _unicodeName = _interopRequireDefault(require_unicodeName());
    var _postName = _interopRequireDefault(require_postName());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _utf8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { fatal: false }) : null;
    function stringify(str) {
      if (!str) {
        return str;
      }
      if (str.indexOf("\0") === -1) {
        return str;
      }
      var newStr = "";
      for (var i = 0, l = str.length, ch; i < l; i++) {
        ch = str.charCodeAt(i);
        if (ch === 0) {
          continue;
        }
        newStr += String.fromCharCode(ch);
      }
      return newStr;
    }
    var _default = exports2.default = {
      stringify,
      /**
       * 将双字节编码字符转换成`\uxxxx`形式
       *
       * @param {string} str str字符串
       * @return {string} 转换后字符串
       */
      escape: function(_escape) {
        function escape2(_x) {
          return _escape.apply(this, arguments);
        }
        escape2.toString = function() {
          return _escape.toString();
        };
        return escape2;
      }(function(str) {
        if (!str) {
          return str;
        }
        return String(str).replace(/[\uff-\uffff]/g, function(c) {
          return escape(c).replace("%", "\\");
        });
      }),
      /**
       * bytes to string
       *
       * @param  {Array} bytes 字节数组
       * @return {string}       string
       */
      getString: function getString(bytes) {
        return String.fromCharCode.apply(null, bytes);
      },
      /**
       * 获取unicode的名字值
       *
       * @param {number} unicode unicode
       * @return {string} 名字
       */
      getUnicodeName: function getUnicodeName(unicode) {
        var unicodeNameIndex = _unicodeName.default[unicode];
        if (void 0 !== unicodeNameIndex) {
          return _postName.default[unicodeNameIndex];
        }
        return "uni" + unicode.toString(16).toUpperCase();
      },
      /**
       * 转换成utf8的字节数组
       *
       * @param {string} str 字符串
       * @return {Array.<byte>} 字节数组
       */
      toUTF8Bytes: function toUTF8Bytes(str) {
        str = stringify(str);
        var byteArr = new Uint8Array(str.length * 4);
        var bi = 0;
        for (var i = 0, l = str.length; i < l; i++) {
          var ch = str.charCodeAt(i);
          if (ch <= 127) {
            byteArr[bi++] = ch;
          } else if (ch <= 2047) {
            byteArr[bi++] = 192 | ch >> 6;
            byteArr[bi++] = 128 | ch & 63;
          } else if (ch < 55296 || ch >= 57344) {
            byteArr[bi++] = 224 | ch >> 12;
            byteArr[bi++] = 128 | ch >> 6 & 63;
            byteArr[bi++] = 128 | ch & 63;
          } else {
            var cp = (ch - 55296 << 10) + (str.charCodeAt(++i) - 56320);
            byteArr[bi++] = 240 | cp >> 18;
            byteArr[bi++] = 128 | cp >> 12 & 63;
            byteArr[bi++] = 128 | cp >> 6 & 63;
            byteArr[bi++] = 128 | cp & 63;
          }
        }
        return byteArr.subarray(0, bi);
      },
      /**
       * 转换成usc2的字节数组
       *
       * @param {string} str 字符串
       * @return {Array.<byte>} 字节数组
       */
      toUCS2Bytes: function toUCS2Bytes(str) {
        str = stringify(str);
        var byteArr = new Uint8Array(str.length << 1);
        for (var i = 0, j = 0, l = str.length; i < l; i++, j += 2) {
          var ch = str.charCodeAt(i);
          byteArr[j] = ch >> 8;
          byteArr[j + 1] = ch & 255;
        }
        return byteArr;
      },
      /**
       * 同时编码 UTF-8 与 UCS-2 字节数组（name 表专用优化）
       *
       * name 表 size 阶段对每条记录都要 UTF-8（mac 编码）+ UCS-2（windows 编码）各一份，
       * 原实现两次独立 toUTF8Bytes/toUCS2Bytes 各做一遍 stringify 扫描 + 编码循环。
       * 本函数合并为单次扫描：先判断是否纯 ASCII（含拒绝 \0），是则走超快路径——
       * UTF-8 直接取字节、UCS-2 大端序 [0, ch]，省掉 UTF-8 多字节分支判断与两次扫描；
       * 非 ASCII 或含 \0 时回退原 toUTF8Bytes/toUCS2Bytes（语义完全一致）。
       * 字体 name 字段几乎都是纯 ASCII（版权/字体名/商标），实测 1.7x 加速。
       *
       * @param {string} str 字符串
       * @return {{utf8: Uint8Array, ucs2: Uint8Array}} UTF-8 与 UCS-2 字节数组
       */
      toUTF8AndUCS2Bytes: function toUTF8AndUCS2Bytes(str) {
        var len = str.length;
        var ascii = true;
        for (var i = 0; i < len; i++) {
          var ch = str.charCodeAt(i);
          if (ch > 127 || ch === 0) {
            ascii = false;
            break;
          }
        }
        if (ascii) {
          var utf8 = new Uint8Array(len);
          var ucs2 = new Uint8Array(len << 1);
          for (var i2 = 0, j = 0; i2 < len; i2++, j += 2) {
            var ch2 = str.charCodeAt(i2);
            utf8[i2] = ch2;
            ucs2[j + 1] = ch2;
          }
          return { utf8, ucs2 };
        }
        return { utf8: this.toUTF8Bytes(str), ucs2: this.toUCS2Bytes(str) };
      },
      /**
       * 获取pascal string 字节数组
       *
       * @param {string} str 字符串
       * @return {Array.<byte>} byteArray byte数组
       */
      toPascalStringBytes: function toPascalStringBytes(str) {
        var length = str ? str.length < 256 ? str.length : 255 : 0;
        var bytes = new Uint8Array(1 + (str ? str.length : 0));
        bytes[0] = length;
        for (var i = 0, l = str.length; i < l; i++) {
          var c = str.charCodeAt(i);
          bytes[i + 1] = c < 128 ? c : 42;
        }
        return bytes;
      },
      /**
       * utf8字节转字符串
       *
       * @param {Array} bytes 字节
       * @return {string} 字符串
       */
      getUTF8String: function getUTF8String(bytes) {
        if (_utf8Decoder) {
          return _utf8Decoder.decode(bytes);
        }
        var str = "";
        for (var i = 0, l = bytes.length; i < l; i++) {
          if (bytes[i] < 127) {
            str += String.fromCharCode(bytes[i]);
          } else {
            str += "%" + (256 + bytes[i]).toString(16).slice(1);
          }
        }
        return unescape(str);
      },
      /**
       * ucs2字节转字符串
       *
       * @param {Array} bytes 字节
       * @return {string} 字符串
       */
      getUCS2String: function getUCS2String(bytes) {
        var len = bytes.length;
        if (len === 0) return "";
        var codes = new Array(len >> 1);
        for (var i = 0, j = 0; i < len; i += 2, j++) {
          codes[j] = (bytes[i] << 8) + bytes[i + 1];
        }
        return String.fromCharCode.apply(null, codes);
      },
      /**
       * 读取 pascal string
       *
       * @param {Array.<byte>} byteArray byte数组
       * @return {Array.<string>} 读取后的字符串数组
       */
      getPascalString: function getPascalString(byteArray) {
        var strArray = [];
        var i = 0;
        var l = byteArray.length;
        while (i < l) {
          var strLength = byteArray[i++];
          if (strLength === 0) {
            strArray.push("");
            continue;
          }
          var chars = new Array(strLength);
          var end = Math.min(i + strLength, l);
          for (var j = 0; i < end; j++, i++) {
            chars[j] = byteArray[i];
          }
          var str = String.fromCharCode.apply(null, chars);
          str = stringify(str);
          strArray.push(str);
        }
        return strArray;
      }
    };
  }
});

// vendor/fonteditor-core/lib/graphics/pathAdjust.js
var require_pathAdjust = __commonJS({
  "vendor/fonteditor-core/lib/graphics/pathAdjust.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = pathAdjust;
    function pathAdjust(contour, scaleX, scaleY, offsetX, offsetY) {
      scaleX = scaleX === void 0 ? 1 : scaleX;
      scaleY = scaleY === void 0 ? 1 : scaleY;
      var x = offsetX || 0;
      var y = offsetY || 0;
      var p;
      for (var i = 0, l = contour.length; i < l; i++) {
        p = contour[i];
        p.x = scaleX * (p.x + x);
        p.y = scaleY * (p.y + y);
      }
      return contour;
    }
  }
});

// vendor/fonteditor-core/lib/graphics/pathCeil.js
var require_pathCeil = __commonJS({
  "vendor/fonteditor-core/lib/graphics/pathCeil.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = pathCeil;
    function pathCeil(contour, point) {
      if (!contour.length) {
        return contour;
      }
      if (typeof contour[0] === "number") {
        for (var i = 0, l = contour.length; i < l; i += 3) {
          if (!point) {
            contour[i] = Math.round(contour[i]);
            contour[i + 1] = Math.round(contour[i + 1]);
          } else {
            contour[i] = Number(contour[i].toFixed(point));
            contour[i + 1] = Number(contour[i + 1].toFixed(point));
          }
        }
      } else {
        for (var i = 0, l = contour.length; i < l; i++) {
          var p = contour[i];
          if (!point) {
            p.x = Math.round(p.x);
            p.y = Math.round(p.y);
          } else {
            p.x = Number(p.x.toFixed(point));
            p.y = Number(p.y.toFixed(point));
          }
        }
      }
      return contour;
    }
  }
});

// vendor/fonteditor-core/lib/graphics/pathIterator.js
var require_pathIterator = __commonJS({
  "vendor/fonteditor-core/lib/graphics/pathIterator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = pathIterator;
    function pathIterator(contour, callBack) {
      var curPoint;
      var prevPoint;
      var nextPoint;
      var cursorPoint;
      var tmpPoint = { x: 0, y: 0 };
      for (var i = 0, l = contour.length; i < l; i++) {
        curPoint = contour[i];
        prevPoint = i === 0 ? contour[l - 1] : contour[i - 1];
        nextPoint = i === l - 1 ? contour[0] : contour[i + 1];
        if (i === 0) {
          if (curPoint.onCurve) {
            cursorPoint = curPoint;
          } else if (prevPoint.onCurve) {
            cursorPoint = prevPoint;
          } else {
            tmpPoint.x = (prevPoint.x + curPoint.x) * 0.5;
            tmpPoint.y = (prevPoint.y + curPoint.y) * 0.5;
            cursorPoint = tmpPoint;
          }
        }
        if (curPoint.onCurve && nextPoint.onCurve) {
          if (false === callBack("L", curPoint, nextPoint, 0, i)) {
            break;
          }
          cursorPoint = nextPoint;
        } else if (!curPoint.onCurve) {
          if (nextPoint.onCurve) {
            if (false === callBack("Q", cursorPoint, curPoint, nextPoint, i)) {
              break;
            }
            cursorPoint = nextPoint;
          } else {
            tmpPoint.x = (curPoint.x + nextPoint.x) * 0.5;
            tmpPoint.y = (curPoint.y + nextPoint.y) * 0.5;
            if (false === callBack("Q", cursorPoint, curPoint, tmpPoint, i)) {
              break;
            }
            cursorPoint = tmpPoint;
          }
        }
      }
    }
  }
});

// vendor/fonteditor-core/lib/graphics/computeBoundingBox.js
var require_computeBoundingBox = __commonJS({
  "vendor/fonteditor-core/lib/graphics/computeBoundingBox.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.computePath = exports2.computeBounding = void 0;
    exports2.computePathBox = computePathBox;
    exports2.quadraticBezier = void 0;
    var _pathIterator = _interopRequireDefault(require_pathIterator());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function computeBoundingBox(points) {
      if (points.length === 0) {
        return false;
      }
      var p0 = points[0];
      var left = p0.x;
      var right = p0.x;
      var top = p0.y;
      var bottom = p0.y;
      for (var i = 1; i < points.length; i++) {
        var p = points[i];
        if (p.x < left) {
          left = p.x;
        }
        if (p.x > right) {
          right = p.x;
        }
        if (p.y < top) {
          top = p.y;
        }
        if (p.y > bottom) {
          bottom = p.y;
        }
      }
      return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
      };
    }
    function computeQuadraticBezierBoundingBox(p0, p1, p2) {
      var tmp = p0.x + p2.x - 2 * p1.x;
      var t1;
      if (tmp === 0) {
        t1 = 0.5;
      } else {
        t1 = (p0.x - p1.x) / tmp;
      }
      tmp = p0.y + p2.y - 2 * p1.y;
      var t2;
      if (tmp === 0) {
        t2 = 0.5;
      } else {
        t2 = (p0.y - p1.y) / tmp;
      }
      t1 = Math.max(Math.min(t1, 1), 0);
      t2 = Math.max(Math.min(t2, 1), 0);
      var ct1 = 1 - t1;
      var ct2 = 1 - t2;
      var x1 = ct1 * ct1 * p0.x + 2 * ct1 * t1 * p1.x + t1 * t1 * p2.x;
      var y1 = ct1 * ct1 * p0.y + 2 * ct1 * t1 * p1.y + t1 * t1 * p2.y;
      var x2 = ct2 * ct2 * p0.x + 2 * ct2 * t2 * p1.x + t2 * t2 * p2.x;
      var y2 = ct2 * ct2 * p0.y + 2 * ct2 * t2 * p1.y + t2 * t2 * p2.y;
      return computeBoundingBox([p0, p2, {
        x: x1,
        y: y1
      }, {
        x: x2,
        y: y2
      }]);
    }
    function computePathBoundingBox() {
      var left, right, top, bottom;
      var found = false;
      function updateBounds(x, y) {
        if (!found) {
          left = right = x;
          top = bottom = y;
          found = true;
        } else {
          if (x < left) left = x;
          else if (x > right) right = x;
          if (y < top) top = y;
          else if (y > bottom) bottom = y;
        }
      }
      function updateBoundsQ(p0, p1, p2) {
        var tmp = p0.x + p2.x - 2 * p1.x;
        var t1 = tmp === 0 ? 0.5 : (p0.x - p1.x) / tmp;
        tmp = p0.y + p2.y - 2 * p1.y;
        var t2 = tmp === 0 ? 0.5 : (p0.y - p1.y) / tmp;
        t1 = t1 < 0 ? 0 : t1 > 1 ? 1 : t1;
        t2 = t2 < 0 ? 0 : t2 > 1 ? 1 : t2;
        var ct1 = 1 - t1;
        var ct2 = 1 - t2;
        updateBounds(p0.x, p0.y);
        updateBounds(p2.x, p2.y);
        updateBounds(
          ct1 * ct1 * p0.x + 2 * ct1 * t1 * p1.x + t1 * t1 * p2.x,
          ct1 * ct1 * p0.y + 2 * ct1 * t1 * p1.y + t1 * t1 * p2.y
        );
        updateBounds(
          ct2 * ct2 * p0.x + 2 * ct2 * t2 * p1.x + t2 * t2 * p2.x,
          ct2 * ct2 * p0.y + 2 * ct2 * t2 * p1.y + t2 * t2 * p2.y
        );
      }
      function processContour(contour) {
        (0, _pathIterator.default)(contour, function(c, p0, p1, p2) {
          if (c === "L") {
            updateBounds(p0.x, p0.y);
            updateBounds(p1.x, p1.y);
          } else if (c === "Q") {
            updateBoundsQ(p0, p1, p2);
          }
        });
      }
      if (arguments.length === 1) {
        processContour(arguments[0]);
      } else {
        for (var i = 0, l = arguments.length; i < l; i++) {
          processContour(arguments[i]);
        }
      }
      if (!found) {
        return false;
      }
      return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
      };
    }
    function computePathBox() {
      var left, right, top, bottom;
      var found = false;
      for (var a = 0; a < arguments.length; a++) {
        var contour = arguments[a];
        if (!contour || !contour.length) continue;
        for (var i = 0, l = contour.length; i < l; i++) {
          var p = contour[i];
          if (!found) {
            left = right = p.x;
            top = bottom = p.y;
            found = true;
          } else {
            if (p.x < left) left = p.x;
            else if (p.x > right) right = p.x;
            if (p.y < top) top = p.y;
            else if (p.y > bottom) bottom = p.y;
          }
        }
      }
      if (!found) {
        return { x: 0, y: 0, width: 0, height: 0 };
      }
      return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
      };
    }
    var computeBounding = exports2.computeBounding = computeBoundingBox;
    var quadraticBezier = exports2.quadraticBezier = computeQuadraticBezierBoundingBox;
    var computePath = exports2.computePath = computePathBoundingBox;
  }
});

// vendor/fonteditor-core/lib/ttf/util/transformGlyfContours.js
var require_transformGlyfContours = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/transformGlyfContours.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = transformGlyfContours;
    var _ON_CURVE = 1;
    function buildFlatContoursFromCompact(glyph) {
      var xArr = glyph._xArr;
      var yArr = glyph._yArr;
      var flags = glyph._flags;
      var endPts = glyph.endPtsOfContours;
      if (!xArr || !yArr || !flags || !endPts) {
        return [];
      }
      var contours = new Array(endPts.length);
      var ptStart = 0;
      for (var ci = 0, cl = endPts.length; ci < cl; ci++) {
        var ptEnd = endPts[ci];
        var ptCount = ptEnd - ptStart + 1;
        var contour = new Array(ptCount * 3);
        for (var pi = 0; pi < ptCount; pi++) {
          var pIdx = ptStart + pi;
          contour[pi * 3] = xArr[pIdx];
          contour[pi * 3 + 1] = yArr[pIdx];
          contour[pi * 3 + 2] = flags[pIdx] & _ON_CURVE ? 1 : 0;
        }
        contours[ci] = contour;
        ptStart = ptEnd + 1;
      }
      return contours;
    }
    function transformAndCeilFlat(contour, a, b, c, d, e, f) {
      for (var i = 0, l = contour.length; i < l; i += 3) {
        var x = contour[i];
        var y = contour[i + 1];
        contour[i] = x * a + y * c + e + 0.5 | 0;
        contour[i + 1] = x * b + y * d + f + 0.5 | 0;
      }
      return contour;
    }
    function transformGlyfContours(glyf, ttf) {
      var contoursList = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var glyfIndex = arguments.length > 3 ? arguments[3] : void 0;
      if (!glyf.glyfs) {
        return glyf;
      }
      var compoundContours = [];
      var glyfs = glyf.glyfs;
      for (var gi = 0, gl = glyfs.length; gi < gl; gi++) {
        var g = glyfs[gi];
        var glyph = ttf.glyf[g.glyphIndex];
        if (!glyph || glyph === glyf) {
          continue;
        }
        if (glyph.compound && !contoursList[g.glyphIndex]) {
          transformGlyfContours(glyph, ttf, contoursList, g.glyphIndex);
        }
        var sourceContours = glyph.compound ? contoursList[g.glyphIndex] || [] : glyph.contours;
        if (!sourceContours && glyph._xArr) {
          sourceContours = buildFlatContoursFromCompact(glyph);
        }
        var t = g.transform;
        var ta = t.a, tb = t.b, tc = t.c, td = t.d, te = t.e, tf = t.f;
        if (sourceContours.length && typeof sourceContours[0][0] === "number") {
          for (var i = 0, l = sourceContours.length; i < l; i++) {
            var contour = sourceContours[i].slice();
            compoundContours.push(transformAndCeilFlat(contour, ta, tb, tc, td, te, tf));
          }
        } else {
          for (var i = 0, l = sourceContours.length; i < l; i++) {
            var srcContour = sourceContours[i];
            var newContour = new Array(srcContour.length);
            for (var pi = 0, pl = srcContour.length; pi < pl; pi++) {
              var p = srcContour[pi];
              var px = p.x * ta + p.y * tc + te;
              var py = p.x * tb + p.y * td + tf;
              newContour[pi] = { x: px + 0.5 | 0, y: py + 0.5 | 0, onCurve: p.onCurve };
            }
            compoundContours.push(newContour);
          }
        }
      }
      if (null != glyfIndex) {
        contoursList[glyfIndex] = compoundContours;
      }
      return compoundContours;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/util/compound2simple.js
var require_compound2simple = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/compound2simple.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = compound2simple;
    function compound2simple(glyf, contours) {
      glyf.contours = contours;
      glyf.compound = null;
      glyf.glyfs = null;
      glyf.instructions = null;
      return glyf;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/util/compound2simpleglyf.js
var require_compound2simpleglyf = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/compound2simpleglyf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = compound2simpleglyf;
    var _transformGlyfContours = _interopRequireDefault(require_transformGlyfContours());
    var _compound2simple = _interopRequireDefault(require_compound2simple());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function compound2simpleglyf(glyf, ttf, recrusive) {
      var glyfIndex;
      if (typeof glyf === "number") {
        glyfIndex = glyf;
        glyf = ttf.glyf[glyfIndex];
      } else {
        glyfIndex = ttf.glyf.indexOf(glyf);
        if (-1 === glyfIndex) {
          return glyf;
        }
      }
      if (!glyf.compound || !glyf.glyfs) {
        return glyf;
      }
      var contoursList = {};
      (0, _transformGlyfContours.default)(glyf, ttf, contoursList, glyfIndex);
      if (recrusive) {
        for (var idx in contoursList) {
          var target = ttf.glyf[idx];
          (0, _compound2simple.default)(target, contoursList[idx]);
          if (target.contours && target.contours.length && typeof target.contours[0][0] === "number") {
            target._flatContours = true;
          }
        }
      } else {
        (0, _compound2simple.default)(glyf, contoursList[glyfIndex]);
        if (glyf.contours && glyf.contours.length && typeof glyf.contours[0][0] === "number") {
          glyf._flatContours = true;
        }
      }
      return glyf;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/util/glyfAdjust.js
var require_glyfAdjust = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/glyfAdjust.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = glyfAdjust;
    function glyfAdjust(g) {
      var scaleX = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      var scaleY = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
      var offsetX = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
      var offsetY = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
      var useCeil = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : true;
      var contours = g.contours;
      var needScale = scaleX !== 1 || scaleY !== 1;
      var needOffset = offsetX !== 0 || offsetY !== 0;
      var needCeil = useCeil !== false;
      var needTransform = needScale || needOffset || needCeil;
      var needComputeBound = void 0 === g.xMin || void 0 === g.yMax || void 0 === g.leftSideBearing || void 0 === g.advanceWidth;
      if (contours && contours.length) {
        if (needTransform || needComputeBound) {
          var left, right, top, bottom, found = false;
          for (var ci = 0, cl = contours.length; ci < cl; ci++) {
            var contour = contours[ci];
            if (!contour || !contour.length) continue;
            for (var i = 0, l = contour.length; i < l; i++) {
              var p = contour[i];
              if (needTransform) {
                var nx = needScale ? scaleX * p.x : p.x;
                var ny = needScale ? scaleY * p.y : p.y;
                if (needOffset) {
                  nx += offsetX;
                  ny += offsetY;
                }
                if (needCeil) {
                  nx = Math.round(nx);
                  ny = Math.round(ny);
                }
                p.x = nx;
                p.y = ny;
              }
              if (needComputeBound) {
                if (!found) {
                  left = right = p.x;
                  top = bottom = p.y;
                  found = true;
                } else {
                  if (p.x < left) left = p.x;
                  else if (p.x > right) right = p.x;
                  if (p.y < top) top = p.y;
                  else if (p.y > bottom) bottom = p.y;
                }
              }
            }
          }
          if (needComputeBound) {
            g.xMin = found ? left : 0;
            g.xMax = found ? right : 0;
            g.yMin = found ? top : 0;
            g.yMax = found ? bottom : 0;
            g.leftSideBearing = g.xMin;
            var advanceWidth = g.advanceWidth;
            if (void 0 !== advanceWidth) {
              g.advanceWidth = Math.round(advanceWidth * scaleX + offsetX);
            } else {
              g.advanceWidth = found ? right + Math.abs(left) : 0;
            }
            return g;
          }
        }
      } else if (needComputeBound) {
        g.xMin = 0;
        g.xMax = 0;
        g.yMin = 0;
        g.yMax = 0;
        g.leftSideBearing = 0;
        var advanceWidth2 = g.advanceWidth;
        g.advanceWidth = void 0 !== advanceWidth2 ? Math.round(advanceWidth2 * scaleX + offsetX) : 0;
        return g;
      }
      if (needComputeBound) return g;
      g.xMin = Math.round(g.xMin * scaleX + offsetX);
      g.xMax = Math.round(g.xMax * scaleX + offsetX);
      g.yMin = Math.round(g.yMin * scaleY + offsetY);
      g.yMax = Math.round(g.yMax * scaleY + offsetY);
      g.leftSideBearing = Math.round(g.leftSideBearing * scaleX + offsetX);
      g.advanceWidth = Math.round(g.advanceWidth * scaleX + offsetX);
      return g;
    }
  }
});

// vendor/fonteditor-core/lib/graphics/reducePathFlat.js
var require_reducePathFlat = __commonJS({
  "vendor/fonteditor-core/lib/graphics/reducePathFlat.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = reducePathFlat;
    exports2.ceilReducePathFlat = ceilReducePathFlat;
    function reducePathFlat(contour) {
      if (!contour.length) {
        return contour;
      }
      var len = contour.length;
      var l = len / 3;
      var reduced = null;
      var ri = 0;
      var removed = 0;
      var px = contour[0], py = contour[1], po = contour[2];
      var prevX = contour[(l - 1) * 3], prevY = contour[(l - 1) * 3 + 1], prevO = contour[(l - 1) * 3 + 2];
      var nextX = contour[3], nextY = contour[4], nextO = contour[5];
      var dx = px - nextX;
      var dy = py - nextY;
      if (po === nextO && dx * dx + dy * dy <= 1) {
        removed++;
      } else {
        var cross = dx * (prevY - py) - dy * (prevX - px);
        if (prevO && nextO && !cross) {
          removed++;
        } else {
          reduced = new Array(len);
          reduced[ri++] = px;
          reduced[ri++] = py;
          reduced[ri++] = po;
        }
      }
      for (var i = 1; i < l - 1; i++) {
        var pi = i * 3;
        px = contour[pi];
        py = contour[pi + 1];
        po = contour[pi + 2];
        prevX = contour[pi - 3];
        prevY = contour[pi - 2];
        prevO = contour[pi - 1];
        nextX = contour[pi + 3];
        nextY = contour[pi + 4];
        nextO = contour[pi + 5];
        dx = px - nextX;
        dy = py - nextY;
        if (po === nextO && dx * dx + dy * dy <= 1) {
          removed++;
          continue;
        }
        cross = dx * (prevY - py) - dy * (prevX - px);
        if (prevO && nextO && !cross) {
          removed++;
          continue;
        }
        if (!reduced) reduced = new Array(len);
        reduced[ri++] = px;
        reduced[ri++] = py;
        reduced[ri++] = po;
      }
      if (l > 1) {
        var pi = (l - 1) * 3;
        px = contour[pi];
        py = contour[pi + 1];
        po = contour[pi + 2];
        prevX = contour[pi - 3];
        prevY = contour[pi - 2];
        prevO = contour[pi - 1];
        nextX = contour[0];
        nextY = contour[1];
        nextO = contour[2];
        dx = px - nextX;
        dy = py - nextY;
        if (po === nextO && dx * dx + dy * dy <= 1) {
          removed++;
        } else {
          cross = dx * (prevY - py) - dy * (prevX - px);
          if (prevO && nextO && !cross) {
            removed++;
          } else {
            if (!reduced) reduced = new Array(len);
            reduced[ri++] = px;
            reduced[ri++] = py;
            reduced[ri++] = po;
          }
        }
      }
      if (!reduced) return contour;
      reduced.length = ri;
      return reduced;
    }
    function ceilReducePathFlat(contour) {
      if (!contour.length) {
        return contour;
      }
      var len = contour.length;
      var l = len / 3;
      for (var ci = 0; ci < len; ci += 3) {
        contour[ci] = Math.round(contour[ci]);
        contour[ci + 1] = Math.round(contour[ci + 1]);
      }
      return reducePathFlat(contour);
    }
  }
});

// vendor/fonteditor-core/lib/graphics/reducePath.js
var require_reducePath = __commonJS({
  "vendor/fonteditor-core/lib/graphics/reducePath.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = reducePath;
    var _reducePathFlat = _interopRequireDefault(require_reducePathFlat());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function redundant(prev, p, next) {
      var dx = p.x - next.x;
      var dy = p.y - next.y;
      if (p.onCurve === next.onCurve && dx * dx + dy * dy <= 1) {
        return true;
      }
      var cross = dx * (prev.y - p.y) - dy * (prev.x - p.x);
      if (prev.onCurve && next.onCurve && !cross) {
        return true;
      }
      return false;
    }
    function reducePath(contour) {
      if (!contour.length) {
        return contour;
      }
      if (typeof contour[0] === "number") {
        return (0, _reducePathFlat.default)(contour);
      }
      var len = contour.length;
      var writeIdx = 0;
      for (var i = 0; i < len; i++) {
        var next = i === len - 1 ? contour[0] : contour[i + 1];
        var prev = i === 0 ? contour[len - 1] : contour[i - 1];
        var cur = contour[i];
        if (!redundant(prev, cur, next)) {
          contour[writeIdx++] = cur;
        }
      }
      contour.length = writeIdx;
      return contour;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/util/reduceGlyf.js
var require_reduceGlyf = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/reduceGlyf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = reduceGlyf;
    var _reducePath = _interopRequireDefault(require_reducePath());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function reduceGlyf(glyf) {
      var contours = glyf.contours;
      var isFlat = glyf._flatContours;
      var minLen = isFlat ? 6 : 2;
      var writeIdx = 0;
      for (var j = 0, cl = contours.length; j < cl; j++) {
        var contour = (0, _reducePath.default)(contours[j]);
        if (contour.length > minLen) {
          contours[writeIdx++] = contour;
        }
      }
      contours.length = writeIdx;
      if (0 === writeIdx) {
        glyf.contours = null;
      }
      return glyf;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/enum/glyFlag.js
var require_glyFlag = __commonJS({
  "vendor/fonteditor-core/lib/ttf/enum/glyFlag.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _default = exports2.default = {
      ONCURVE: 1,
      // on curve ,off curve
      XSHORT: 2,
      // x-Short Vector
      YSHORT: 4,
      // y-Short Vector
      REPEAT: 8,
      // next byte is flag repeat count
      XSAME: 16,
      // This x is same (Positive x-Short vector)
      YSAME: 32,
      // This y is same (Positive y-Short vector)
      Reserved1: 64,
      Reserved2: 128
    };
  }
});

// vendor/fonteditor-core/lib/ttf/util/optimizettf.js
var require_optimizettf = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/optimizettf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = optimizettf;
    exports2.ceilReduceAndSizeFlat = ceilReduceAndSizeFlat;
    var _reduceGlyf = _interopRequireDefault(require_reduceGlyf());
    var _glyFlag = _interopRequireDefault(require_glyFlag());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _ONCURVE = _glyFlag.default.ONCURVE;
    var _XSHORT = _glyFlag.default.XSHORT;
    var _YSHORT = _glyFlag.default.YSHORT;
    var _XSAME = _glyFlag.default.XSAME;
    var _YSAME = _glyFlag.default.YSAME;
    var _REPEAT = _glyFlag.default.REPEAT;
    function numericSort(a, b) {
      return a - b;
    }
    function ceilReduceAndSizeFromTypedArrays(glyf) {
      var xArr = glyf._xArr;
      var yArr = glyf._yArr;
      var flagsArr = glyf._flags;
      var endPts = glyf.endPtsOfContours;
      var numContours = endPts.length;
      var ONCURVE = _ONCURVE;
      var XSHORT = _XSHORT;
      var YSHORT = _YSHORT;
      var XSAME = _XSAME;
      var YSAME = _YSAME;
      var REPEAT = _REPEAT;
      var numPoints = xArr.length;
      var flagsC = new Uint8Array(numPoints);
      var fi = 0;
      var prevFlag = -1;
      var repeatPoint = -1;
      var encodedCoordSize = 0;
      var neededSize = numPoints * 2;
      var xCoordBuf = new Uint8Array(neededSize);
      var yCoordBuf = new Uint8Array(neededSize);
      var xbi = 0, ybi = 0;
      if (numPoints > 0) {
        var px = xArr[0], py = yArr[0];
        var onCurve = !!(flagsArr[0] & ONCURVE);
        var flag = onCurve ? ONCURVE : 0;
        if (px === 0) flag += XSAME;
        else if (px > -256 && px < 256) {
          flag += XSHORT;
          if (px > 0) flag += XSAME;
          xCoordBuf[xbi++] = px > 0 ? px : -px;
          encodedCoordSize += 1;
        } else {
          xCoordBuf[xbi++] = px >> 8 & 255;
          xCoordBuf[xbi++] = px & 255;
          encodedCoordSize += 2;
        }
        if (py === 0) flag += YSAME;
        else if (py > -256 && py < 256) {
          flag += YSHORT;
          if (py > 0) flag += YSAME;
          yCoordBuf[ybi++] = py > 0 ? py : -py;
          encodedCoordSize += 1;
        } else {
          yCoordBuf[ybi++] = py >> 8 & 255;
          yCoordBuf[ybi++] = py & 255;
          encodedCoordSize += 2;
        }
        flagsC[fi++] = prevFlag = flag;
        var prevX = px, prevY = py;
        for (var pi = 1; pi < numPoints; pi++) {
          px = xArr[pi];
          py = yArr[pi];
          onCurve = !!(flagsArr[pi] & ONCURVE);
          flag = onCurve ? ONCURVE : 0;
          var dx = px - prevX, dy = py - prevY;
          prevX = px;
          prevY = py;
          if (dx === 0) {
            flag += XSAME;
          } else if (dx > -256 && dx < 256) {
            flag += XSHORT;
            if (dx > 0) flag += XSAME;
            xCoordBuf[xbi++] = dx > 0 ? dx : -dx;
            encodedCoordSize += 1;
          } else {
            xCoordBuf[xbi++] = dx >> 8 & 255;
            xCoordBuf[xbi++] = dx & 255;
            encodedCoordSize += 2;
          }
          if (dy === 0) {
            flag += YSAME;
          } else if (dy > -256 && dy < 256) {
            flag += YSHORT;
            if (dy > 0) flag += YSAME;
            yCoordBuf[ybi++] = dy > 0 ? dy : -dy;
            encodedCoordSize += 1;
          } else {
            yCoordBuf[ybi++] = dy >> 8 & 255;
            yCoordBuf[ybi++] = dy & 255;
            encodedCoordSize += 2;
          }
          if (flag === prevFlag) {
            if (repeatPoint === -1) {
              repeatPoint = fi - 1;
              flagsC[repeatPoint] |= REPEAT;
              flagsC[fi++] = 1;
            } else if (flagsC[repeatPoint + 1] < 255) {
              ++flagsC[repeatPoint + 1];
            } else {
              repeatPoint = -1;
              flagsC[fi++] = flag;
              prevFlag = flag;
            }
          } else {
            repeatPoint = -1;
            flagsC[fi++] = flag;
            prevFlag = flag;
          }
        }
      }
      flagsC = flagsC.subarray(0, fi);
      glyf.contours = { length: numContours };
      glyf._flatContours = true;
      glyf._pointsPerContour = new Array(numContours);
      for (var ci = 0; ci < numContours; ci++) {
        glyf._pointsPerContour[ci] = ci === 0 ? endPts[0] + 1 : endPts[ci] - endPts[ci - 1];
      }
      glyf._numContours = numContours;
      glyf._totalPoints = numPoints;
      glyf._preFlags = flagsC;
      glyf._preEncodedCoordSize = encodedCoordSize;
      glyf._preXBuf = xCoordBuf.subarray(0, xbi);
      glyf._preYBuf = yCoordBuf.subarray(0, ybi);
      glyf._xArr = null;
      glyf._yArr = null;
      glyf._flags = null;
      glyf.endPtsOfContours = null;
    }
    function ceilReduceAndSizeFlat(glyf) {
      if (glyf._precomputedGlyfSupport) {
        return;
      }
      var contours = glyf.contours;
      var writeIdx = 0;
      var totalPoints = 0;
      var ppcArr = new Array(contours.length);
      for (var j = 0, cl = contours.length; j < cl; j++) {
        if (contours[j].length > 6) {
          var pts = contours[j].length / 3 | 0;
          ppcArr[writeIdx] = pts;
          totalPoints += pts;
          contours[writeIdx] = contours[j];
          writeIdx++;
        }
      }
      contours.length = writeIdx;
      ppcArr.length = writeIdx;
      if (0 === contours.length) {
        glyf.contours = null;
        return;
      }
      glyf._pointsPerContour = ppcArr;
      var ONCURVE = _ONCURVE;
      var XSHORT = _XSHORT;
      var YSHORT = _YSHORT;
      var XSAME = _XSAME;
      var YSAME = _YSAME;
      var REPEAT = _REPEAT;
      var flagsC = new Uint8Array(totalPoints);
      var fi = 0;
      var prevFlag = -1;
      var repeatPoint = -1;
      var encodedCoordSize = 0;
      var neededSize = totalPoints * 2;
      var xCoordBuf = new Uint8Array(neededSize);
      var yCoordBuf = new Uint8Array(neededSize);
      var xbi = 0, ybi = 0;
      var firstContour = contours[0];
      var fpx = firstContour[0], fpy = firstContour[1];
      var fOnCurve = firstContour[2];
      var fFlag = fOnCurve ? ONCURVE : 0;
      if (fpx === 0) fFlag += XSAME;
      else if (fpx > -256 && fpx < 256) {
        fFlag += XSHORT;
        if (fpx > 0) fFlag += XSAME;
        xCoordBuf[xbi++] = fpx > 0 ? fpx : -fpx;
        encodedCoordSize += 1;
      } else {
        xCoordBuf[xbi++] = fpx >> 8 & 255;
        xCoordBuf[xbi++] = fpx & 255;
        encodedCoordSize += 2;
      }
      if (fpy === 0) fFlag += YSAME;
      else if (fpy > -256 && fpy < 256) {
        fFlag += YSHORT;
        if (fpy > 0) fFlag += YSAME;
        yCoordBuf[ybi++] = fpy > 0 ? fpy : -fpy;
        encodedCoordSize += 1;
      } else {
        yCoordBuf[ybi++] = fpy >> 8 & 255;
        yCoordBuf[ybi++] = fpy & 255;
        encodedCoordSize += 2;
      }
      flagsC[fi++] = prevFlag = fFlag;
      var prevX = fpx, prevY = fpy;
      var skipFirstContour = true;
      for (var j = 0, cl2 = contours.length; j < cl2; j++) {
        var contour = contours[j];
        var startI = skipFirstContour ? 3 : 0;
        skipFirstContour = false;
        for (var i = startI, l = contour.length; i < l; i += 3) {
          var px = contour[i];
          var py = contour[i + 1];
          var onCurve = contour[i + 2];
          var flag = onCurve ? ONCURVE : 0;
          var dx = px - prevX, dy = py - prevY;
          prevX = px;
          prevY = py;
          if (dx === 0) {
            flag += XSAME;
          } else if (dx > -256 && dx < 256) {
            flag += XSHORT;
            if (dx > 0) flag += XSAME;
            var absDx = dx > 0 ? dx : -dx;
            xCoordBuf[xbi++] = absDx;
            encodedCoordSize += 1;
          } else {
            xCoordBuf[xbi++] = dx >> 8 & 255;
            xCoordBuf[xbi++] = dx & 255;
            encodedCoordSize += 2;
          }
          if (dy === 0) {
            flag += YSAME;
          } else if (dy > -256 && dy < 256) {
            flag += YSHORT;
            if (dy > 0) flag += YSAME;
            var absDy = dy > 0 ? dy : -dy;
            yCoordBuf[ybi++] = absDy;
            encodedCoordSize += 1;
          } else {
            yCoordBuf[ybi++] = dy >> 8 & 255;
            yCoordBuf[ybi++] = dy & 255;
            encodedCoordSize += 2;
          }
          if (flag === prevFlag) {
            if (repeatPoint === -1) {
              repeatPoint = fi - 1;
              flagsC[repeatPoint] |= REPEAT;
              flagsC[fi++] = 1;
            } else if (flagsC[repeatPoint + 1] < 255) {
              ++flagsC[repeatPoint + 1];
            } else {
              repeatPoint = -1;
              flagsC[fi++] = flag;
              prevFlag = flag;
            }
          } else {
            repeatPoint = -1;
            flagsC[fi++] = flag;
            prevFlag = flag;
          }
        }
      }
      flagsC = flagsC.subarray(0, fi);
      glyf._preFlags = flagsC;
      glyf._preEncodedCoordSize = encodedCoordSize;
      glyf._preXBuf = xCoordBuf.subarray(0, xbi);
      glyf._preYBuf = yCoordBuf.subarray(0, ybi);
      glyf._totalPoints = totalPoints;
      glyf._numContours = contours.length;
    }
    function optimizettf(ttf) {
      var checkUnicodeRepeat = {};
      var repeatList = [];
      var glyfs = ttf.glyf;
      var hasCompound = false;
      var m_xMin = 16384, m_yMin = 16384, m_xMax = -16384, m_yMax = -16384;
      var m_advWMax = -1;
      var m_minLSB = 16384, m_minRSB = 16384;
      var m_xAvgSum = 0, m_glyfNotEmpty = 0;
      var m_firstChar = 1114111, m_lastChar = -1;
      var m_maxPoints = 0, m_maxContours = 0;
      for (var index = 0, gl = glyfs.length; index < gl; index++) {
        var glyf = glyfs[index];
        if (glyf.compound) {
          hasCompound = true;
        }
        if (glyf.unicode) {
          if (glyf.unicode.length > 1) {
            glyf.unicode.sort(numericSort);
          }
          var unicode = glyf.unicode;
          for (var ui = 0, ul = unicode.length; ui < ul; ui++) {
            var u = unicode[ui];
            if (checkUnicodeRepeat[u]) {
              repeatList.push(index);
            } else {
              checkUnicodeRepeat[u] = true;
            }
            if (u !== 65535) {
              if (u < m_firstChar) m_firstChar = u;
              if (u > m_lastChar) m_lastChar = u;
            }
          }
        }
        if (!glyf.compound) {
          if (glyf._origBuf) {
            if (glyf._numContours > 0) {
              glyf.contours = { length: glyf._numContours };
              if (glyf._numContours > m_maxContours) m_maxContours = glyf._numContours;
              if (glyf._totalPoints > m_maxPoints) m_maxPoints = glyf._totalPoints;
            }
          } else if (glyf._xArr) {
            ceilReduceAndSizeFromTypedArrays(glyf);
            if (glyf._numContours > 0) {
              if (glyf._numContours > m_maxContours) m_maxContours = glyf._numContours;
              if (glyf._totalPoints > m_maxPoints) m_maxPoints = glyf._totalPoints;
            }
          } else if (glyf.contours) {
            if (glyf._flatContours) {
              ceilReduceAndSizeFlat(glyf);
              if (glyf.contours) {
                if (glyf._numContours > m_maxContours) m_maxContours = glyf._numContours;
                if (glyf._totalPoints > m_maxPoints) m_maxPoints = glyf._totalPoints;
              }
            } else {
              var numC = glyf.contours.length;
              if (numC > 0) {
                if (numC > m_maxContours) m_maxContours = numC;
                var totalPts = 0;
                for (var ci = 0; ci < numC; ci++) {
                  totalPts += glyf.contours[ci].length;
                }
                if (totalPts > m_maxPoints) m_maxPoints = totalPts;
              }
              (0, _reduceGlyf.default)(glyf);
            }
          }
        }
        var gXMin = glyf.xMin || 0;
        var gYMin = glyf.yMin || 0;
        var gXMax = glyf.xMax || 0;
        var gYMax = glyf.yMax || 0;
        if (gXMin < m_xMin) m_xMin = gXMin;
        if (gYMin < m_yMin) m_yMin = gYMin;
        if (gXMax > m_xMax) m_xMax = gXMax;
        if (gYMax > m_yMax) m_yMax = gYMax;
        var gAdvW = glyf.advanceWidth || 0;
        if (gAdvW > m_advWMax) m_advWMax = gAdvW;
        var gLSB = glyf.leftSideBearing || 0;
        if (gLSB < m_minLSB) m_minLSB = gLSB;
        var gRSB = gAdvW - gXMax;
        if (gRSB < m_minRSB) m_minRSB = gRSB;
        if (glyf.advanceWidth != null) {
          m_xAvgSum += gAdvW;
          m_glyfNotEmpty++;
        }
        glyf.xMin = gXMin;
        glyf.xMax = gXMax;
        glyf.yMin = gYMin;
        glyf.yMax = gYMax;
        glyf.leftSideBearing = gLSB;
        glyf.advanceWidth = gAdvW;
      }
      ttf._unicodeSorted = true;
      ttf._metrics = {
        xMin: m_xMin,
        yMin: m_yMin,
        xMax: m_xMax,
        yMax: m_yMax,
        advanceWidthMax: m_advWMax,
        minLeftSideBearing: m_minLSB,
        minRightSideBearing: m_minRSB,
        xMaxExtent: m_xMax,
        xAvgCharWidth: m_xAvgSum / (m_glyfNotEmpty || 1),
        usFirstCharIndex: m_firstChar,
        usLastCharIndex: m_lastChar,
        maxPoints: m_maxPoints,
        maxContours: m_maxContours,
        glyfNotEmpty: m_glyfNotEmpty
      };
      if (!hasCompound) {
        if (ttf.support && ttf.support.maxp) {
          ttf.support.maxp.numGlyphs = glyfs.length;
        }
      }
      if (!repeatList.length) {
        return true;
      }
      return {
        repeat: repeatList
      };
    }
  }
});

// vendor/fonteditor-core/lib/ttf/ttf.js
var require_ttf = __commonJS({
  "vendor/fonteditor-core/lib/ttf/ttf.js"(exports2) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _lang = require_lang();
    var _string = _interopRequireDefault(require_string());
    var _pathAdjust = _interopRequireDefault(require_pathAdjust());
    var _pathCeil = _interopRequireDefault(require_pathCeil());
    var _computeBoundingBox = require_computeBoundingBox();
    var _compound2simpleglyf = _interopRequireDefault(require_compound2simpleglyf());
    var _glyfAdjust = _interopRequireDefault(require_glyfAdjust());
    var _optimizettf = _interopRequireDefault(require_optimizettf());
    var _default = _interopRequireDefault(require_default());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function adjustToEmBox(glyfList, ascent, descent, adjustToEmPadding) {
      glyfList.forEach(function(g) {
        if (g.contours && g.contours.length) {
          var rightSideBearing = g.advanceWidth - g.xMax;
          var bound = _computeBoundingBox.computePath.apply(void 0, _toConsumableArray(g.contours));
          var scale = (ascent - descent - adjustToEmPadding) / bound.height;
          var center = (ascent + descent) / 2;
          var yOffset = center - (bound.y + bound.height / 2) * scale;
          g.contours.forEach(function(contour) {
            if (scale !== 1) {
              (0, _pathAdjust.default)(contour, scale, scale);
            }
            (0, _pathAdjust.default)(contour, 1, 1, 0, yOffset);
            (0, _pathCeil.default)(contour);
          });
          var box = _computeBoundingBox.computePathBox.apply(void 0, _toConsumableArray(g.contours));
          g.xMin = box.x;
          g.xMax = box.x + box.width;
          g.yMin = box.y;
          g.yMax = box.y + box.height;
          g.leftSideBearing = g.xMin;
          g.advanceWidth = g.xMax + rightSideBearing;
        }
      });
      return glyfList;
    }
    function adjustPos(glyfList, leftSideBearing, rightSideBearing, verticalAlign) {
      var changed = false;
      if (null != leftSideBearing) {
        changed = true;
        glyfList.forEach(function(g) {
          if (g.leftSideBearing !== leftSideBearing) {
            (0, _glyfAdjust.default)(g, 1, 1, leftSideBearing - g.leftSideBearing);
          }
        });
      }
      if (null != rightSideBearing) {
        changed = true;
        glyfList.forEach(function(g) {
          g.advanceWidth = g.xMax + rightSideBearing;
        });
      }
      if (null != verticalAlign) {
        changed = true;
        glyfList.forEach(function(g) {
          if (g.contours && g.contours.length) {
            var bound = _computeBoundingBox.computePath.apply(void 0, _toConsumableArray(g.contours));
            var offset = verticalAlign - bound.y;
            (0, _glyfAdjust.default)(g, 1, 1, 0, offset);
          }
        });
      }
      return changed ? glyfList : [];
    }
    function merge(ttf, imported) {
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        scale: true
      };
      var list = imported.glyf.filter(function(g) {
        return (
          // 简单轮廓
          g.contours && g.contours.length && g.name !== ".notdef" && g.name !== ".null" && g.name !== "nonmarkingreturn"
        );
      });
      if (options.adjustGlyf) {
        var ascent = ttf.hhea.ascent;
        var descent = ttf.hhea.descent;
        var adjustToEmPadding = 16;
        adjustPos(list, 16, 16);
        adjustToEmBox(list, ascent, descent, adjustToEmPadding);
        list.forEach(function(g) {
          ttf.glyf.push(g);
        });
      } else if (options.scale) {
        var scale = 1;
        if (imported.head.unitsPerEm && imported.head.unitsPerEm !== ttf.head.unitsPerEm) {
          scale = ttf.head.unitsPerEm / imported.head.unitsPerEm;
        }
        list.forEach(function(g) {
          (0, _glyfAdjust.default)(g, scale, scale);
          ttf.glyf.push(g);
        });
      }
      return list;
    }
    var TTF = exports2.default = /* @__PURE__ */ function() {
      function TTF2(ttf) {
        _classCallCheck(this, TTF2);
        this.ttf = ttf;
      }
      return _createClass(TTF2, [{
        key: "codes",
        value: function codes() {
          return Object.keys(this.ttf.cmap);
        }
        /**
         * 根据编码获取字形索引
         *
         * @param {string} c 字符或者字符编码
         *
         * @return {?number} 返回glyf索引号
         */
      }, {
        key: "getGlyfIndexByCode",
        value: function getGlyfIndexByCode(c) {
          var charCode = typeof c === "number" ? c : c.codePointAt(0);
          var glyfIndex = this.ttf.cmap[charCode] || -1;
          return glyfIndex;
        }
        /**
         * 根据索引获取字形
         *
         * @param {number} glyfIndex glyf的索引
         *
         * @return {?Object} 返回glyf对象
         */
      }, {
        key: "getGlyfByIndex",
        value: function getGlyfByIndex(glyfIndex) {
          var glyfList = this.ttf.glyf;
          var glyf = glyfList[glyfIndex];
          return glyf;
        }
        /**
         * 根据编码获取字形
         *
         * @param {string} c 字符或者字符编码
         *
         * @return {?Object} 返回glyf对象
         */
      }, {
        key: "getGlyfByCode",
        value: function getGlyfByCode(c) {
          var glyfIndex = this.getGlyfIndexByCode(c);
          return this.getGlyfByIndex(glyfIndex);
        }
        /**
         * 设置ttf对象
         *
         * @param {Object} ttf ttf对象
         * @return {this}
         */
      }, {
        key: "set",
        value: function set(ttf) {
          this.ttf = ttf;
          return this;
        }
        /**
         * 获取ttf对象
         *
         * @return {ttfObject} ttf ttf对象
         */
      }, {
        key: "get",
        value: function get() {
          return this.ttf;
        }
        /**
         * 添加glyf
         *
         * @param {Object} glyf glyf对象
         *
         * @return {number} 添加的glyf
         */
      }, {
        key: "addGlyf",
        value: function addGlyf(glyf) {
          return this.insertGlyf(glyf);
        }
        /**
         * 插入glyf
         *
         * @param {Object} glyf glyf对象
         * @param {Object} insertIndex 插入的索引
         * @return {number} 添加的glyf
         */
      }, {
        key: "insertGlyf",
        value: function insertGlyf(glyf, insertIndex) {
          if (insertIndex >= 0 && insertIndex < this.ttf.glyf.length) {
            this.ttf.glyf.splice(insertIndex, 0, glyf);
          } else {
            this.ttf.glyf.push(glyf);
          }
          return [glyf];
        }
        /**
         * 合并两个ttfObject，此处仅合并简单字形
         *
         * @param {Object} imported ttfObject
         * @param {Object} options 参数选项
         * @param {boolean} options.scale 是否自动缩放
         * @param {boolean} options.adjustGlyf 是否调整字形以适应边界
         *                                     (和 options.scale 参数互斥)
         *
         * @return {Array} 添加的glyf
         */
      }, {
        key: "mergeGlyf",
        value: function mergeGlyf(imported, options) {
          var list = merge(this.ttf, imported, options);
          return list;
        }
        /**
         * 删除指定字形
         *
         * @param {Array} indexList 索引列表
         * @return {Array} 删除的glyf
         */
      }, {
        key: "removeGlyf",
        value: function removeGlyf(indexList) {
          var glyf = this.ttf.glyf;
          var removed = [];
          var indexSet = new Set(indexList);
          for (var i = glyf.length - 1; i >= 0; i--) {
            if (indexSet.has(i)) {
              removed.push(glyf[i]);
              glyf.splice(i, 1);
            }
          }
          return removed;
        }
        /**
         * 设置unicode代码
         *
         * @param {string} unicode unicode代码 $E021, $22
         * @param {Array=} indexList 索引列表
         * @param {boolean} isGenerateName 是否生成name
         * @return {Array} 改变的glyf
         */
      }, {
        key: "setUnicode",
        value: function setUnicode(unicode, indexList, isGenerateName) {
          var glyf = this.ttf.glyf;
          var list = [];
          if (indexList && indexList.length) {
            var first = indexList.indexOf(0);
            if (first >= 0) {
              indexList.splice(first, 1);
            }
            list = indexList.map(function(item) {
              return glyf[item];
            });
          } else {
            list = glyf.slice(1);
          }
          if (list.length > 1) {
            var less32 = function less322(u) {
              return u < 33;
            };
            list = list.filter(function(g) {
              return !g.unicode || !g.unicode.some(less32);
            });
          }
          if (list.length) {
            unicode = Number("0x" + unicode.slice(1));
            list.forEach(function(g) {
              if (unicode === 160 || unicode === 12288) {
                unicode++;
              }
              g.unicode = [unicode];
              if (isGenerateName) {
                g.name = _string.default.getUnicodeName(unicode);
              }
              unicode++;
            });
          }
          return list;
        }
        /**
         * 生成字形名称
         *
         * @param {Array=} indexList 索引列表
         * @return {Array} 改变的glyf
         */
      }, {
        key: "genGlyfName",
        value: function genGlyfName(indexList) {
          var glyf = this.ttf.glyf;
          var list = [];
          if (indexList && indexList.length) {
            list = indexList.map(function(item) {
              return glyf[item];
            });
          } else {
            list = glyf;
          }
          if (list.length) {
            var first = this.ttf.glyf[0];
            list.forEach(function(g) {
              if (g === first) {
                g.name = ".notdef";
              } else if (g.unicode && g.unicode.length) {
                g.name = _string.default.getUnicodeName(g.unicode[0]);
              } else {
                g.name = ".notdef";
              }
            });
          }
          return list;
        }
        /**
         * 清除字形名称
         *
         * @param {Array=} indexList 索引列表
         * @return {Array} 改变的glyf
         */
      }, {
        key: "clearGlyfName",
        value: function clearGlyfName(indexList) {
          var glyf = this.ttf.glyf;
          var list = [];
          if (indexList && indexList.length) {
            list = indexList.map(function(item) {
              return glyf[item];
            });
          } else {
            list = glyf;
          }
          if (list.length) {
            for (var i = 0, l = list.length; i < l; i++) {
              list[i].name = null;
            }
          }
          return list;
        }
        /**
         * 添加并体替换指定的glyf
         *
         * @param {Array} glyfList 添加的列表
         * @param {Array=} indexList 需要替换的索引列表
         * @return {Array} 改变的glyf
         */
      }, {
        key: "appendGlyf",
        value: function appendGlyf(glyfList, indexList) {
          var glyf = this.ttf.glyf;
          var result = glyfList.slice(0);
          if (indexList && indexList.length) {
            var l = Math.min(glyfList.length, indexList.length);
            for (var i = 0; i < l; i++) {
              glyf[indexList[i]] = glyfList[i];
            }
            glyfList = glyfList.slice(l);
          }
          if (glyfList.length) {
            Array.prototype.splice.apply(glyf, [glyf.length, 0].concat(_toConsumableArray(glyfList)));
          }
          return result;
        }
        /**
         * 调整glyf位置
         *
         * @param {Array=} indexList 索引列表
         * @param {Object} setting 选项
         * @param {number=} setting.leftSideBearing 左边距
         * @param {number=} setting.rightSideBearing 右边距
         * @param {number=} setting.verticalAlign 垂直对齐
         * @return {Array} 改变的glyf
         */
      }, {
        key: "adjustGlyfPos",
        value: function adjustGlyfPos(indexList, setting) {
          var glyfList = this.getGlyf(indexList);
          return adjustPos(glyfList, setting.leftSideBearing, setting.rightSideBearing, setting.verticalAlign);
        }
        /**
         * 调整glyf
         *
         * @param {Array=} indexList 索引列表
         * @param {Object} setting 选项
         * @param {boolean=} setting.reverse 字形反转操作
         * @param {boolean=} setting.mirror 字形镜像操作
         * @param {number=} setting.scale 字形缩放
         * @param {boolean=} setting.adjustToEmBox  是否调整字形到 em 框
         * @param {number=} setting.adjustToEmPadding 调整到 em 框的留白
         * @return {boolean}
         */
      }, {
        key: "adjustGlyf",
        value: function adjustGlyf(indexList, setting) {
          var glyfList = this.getGlyf(indexList);
          var changed = false;
          setting.adjustToEmBox = setting.ajdustToEmBox || setting.adjustToEmBox;
          setting.adjustToEmPadding = setting.ajdustToEmPadding || setting.adjustToEmPadding;
          if (setting.reverse || setting.mirror) {
            changed = true;
            glyfList.forEach(function(g) {
              if (g.contours && g.contours.length) {
                var offsetX = g.xMax + g.xMin;
                var offsetY = g.yMax + g.yMin;
                g.contours.forEach(function(contour) {
                  (0, _pathAdjust.default)(contour, setting.mirror ? -1 : 1, setting.reverse ? -1 : 1);
                  (0, _pathAdjust.default)(contour, 1, 1, setting.mirror ? offsetX : 0, setting.reverse ? offsetY : 0);
                });
              }
            });
          }
          if (setting.scale && setting.scale !== 1) {
            changed = true;
            var scale = setting.scale;
            glyfList.forEach(function(g) {
              if (g.contours && g.contours.length) {
                (0, _glyfAdjust.default)(g, scale, scale);
              }
            });
          } else if (setting.adjustToEmBox) {
            changed = true;
            var ascent = this.ttf.hhea.ascent;
            var descent = this.ttf.hhea.descent;
            var adjustToEmPadding = 2 * (setting.adjustToEmPadding || 0);
            adjustToEmBox(glyfList, ascent, descent, adjustToEmPadding);
          }
          return changed ? glyfList : [];
        }
        /**
         * 获取glyf列表
         *
         * @param {Array=} indexList 索引列表
         * @return {Array} glyflist
         */
      }, {
        key: "getGlyf",
        value: function getGlyf(indexList) {
          var glyf = this.ttf.glyf;
          if (indexList && indexList.length) {
            return indexList.map(function(item) {
              return glyf[item];
            });
          }
          return glyf;
        }
        /**
         * 查找相关字形
         *
         * @param  {Object} condition 查询条件
         * @param  {Array|number} condition.unicode unicode编码列表或者单个unicode编码
         * @param  {string} condition.name glyf名字，例如`uniE001`, `uniE`
         * @param  {Function} condition.filter 自定义过滤器
         * @example
         *     condition.filter = function (glyf) {
         *         return glyf.name === 'logo';
         *     }
         * @return {Array}  glyf字形索引列表
         */
      }, {
        key: "findGlyf",
        value: function findGlyf(condition) {
          if (!condition) {
            return [];
          }
          var filters = [];
          if (condition.unicode) {
            var unicodeList = Array.isArray(condition.unicode) ? condition.unicode : [condition.unicode];
            var unicodeHash = {};
            unicodeList.forEach(function(unicode) {
              if (typeof unicode === "string") {
                unicode = Number("0x" + unicode.slice(1));
              }
              unicodeHash[unicode] = true;
            });
            filters.push(function(glyf) {
              if (!glyf.unicode || !glyf.unicode.length) {
                return false;
              }
              for (var i = 0, l = glyf.unicode.length; i < l; i++) {
                if (unicodeHash[glyf.unicode[i]]) {
                  return true;
                }
              }
            });
          }
          if (condition.name) {
            var name = condition.name;
            filters.push(function(glyf) {
              return glyf.name && glyf.name.indexOf(name) === 0;
            });
          }
          if (typeof condition.filter === "function") {
            filters.push(condition.filter);
          }
          var indexList = [];
          this.ttf.glyf.forEach(function(glyf, index) {
            for (var filterIndex = 0, filter; filter = filters[filterIndex++]; ) {
              if (true === filter(glyf)) {
                indexList.push(index);
                break;
              }
            }
          });
          return indexList;
        }
        /**
         * 更新指定的glyf
         *
         * @param {Object} glyf glyfobject
         * @param {string} index 需要替换的索引列表
         * @return {Array} 改变的glyf
         */
      }, {
        key: "replaceGlyf",
        value: function replaceGlyf(glyf, index) {
          if (index >= 0 && index < this.ttf.glyf.length) {
            this.ttf.glyf[index] = glyf;
            return [glyf];
          }
          return [];
        }
        /**
         * 设置glyf
         *
         * @param {Array} glyfList glyf列表
         * @return {Array} 设置的glyf列表
         */
      }, {
        key: "setGlyf",
        value: function setGlyf(glyfList) {
          this.glyf = null;
          this.ttf.glyf = glyfList || [];
          return this.ttf.glyf;
        }
        /**
         * 对字形按照unicode编码排序，此处不对复合字形进行排序，如果存在复合字形, 不进行排序
         *
         * @param {Array} glyfList glyf列表
         * @return {Array} 设置的glyf列表
         */
      }, {
        key: "sortGlyf",
        value: function sortGlyf() {
          var glyf = this.ttf.glyf;
          if (glyf.length > 1) {
            var hasCompound = false;
            for (var k = 0, kl = glyf.length; k < kl; k++) {
              if (glyf[k].compound) {
                hasCompound = true;
                break;
              }
            }
            if (hasCompound) {
              return -2;
            }
            var notdef = glyf.shift();
            if (!this.ttf._unicodeSorted) {
              glyf.sort(function(a, b) {
                var aU = a.unicode;
                var bU = b.unicode;
                if (!aU || !aU.length) return bU && bU.length ? 1 : 0;
                if (!bU || !bU.length) return -1;
                return aU[0] - bU[0];
              });
            }
            glyf.unshift(notdef);
            return glyf;
          }
          return -1;
        }
        /**
         * 设置名字
         *
         * @param {string} name 名字字段
         * @return {Object} 名字对象
         */
      }, {
        key: "setName",
        value: function setName(name) {
          if (name) {
            this.ttf.name.fontFamily = this.ttf.name.fullName = name.fontFamily || _default.default.name.fontFamily;
            this.ttf.name.fontSubFamily = name.fontSubFamily || _default.default.name.fontSubFamily;
            this.ttf.name.uniqueSubFamily = name.uniqueSubFamily || "";
            this.ttf.name.postScriptName = name.postScriptName || "";
          }
          return this.ttf.name;
        }
        /**
         * 设置head信息
         *
         * @param {Object} head 头部信息
         * @return {Object} 头对象
         */
      }, {
        key: "setHead",
        value: function setHead(head) {
          if (head) {
            if (head.unitsPerEm && head.unitsPerEm >= 64 && head.unitsPerEm <= 16384) {
              this.ttf.head.unitsPerEm = head.unitsPerEm;
            }
            if (head.lowestRecPPEM && head.lowestRecPPEM >= 8 && head.lowestRecPPEM <= 16384) {
              this.ttf.head.lowestRecPPEM = head.lowestRecPPEM;
            }
            if (head.created) {
              this.ttf.head.created = head.created;
            }
            if (head.modified) {
              this.ttf.head.modified = head.modified;
            }
          }
          return this.ttf.head;
        }
        /**
         * 设置hhea信息
         *
         * @param {Object} fields 字段值
         * @return {Object} 头对象
         */
      }, {
        key: "setHhea",
        value: function setHhea(fields) {
          (0, _lang.overwrite)(this.ttf.hhea, fields, ["ascent", "descent", "lineGap"]);
          return this.ttf.hhea;
        }
        /**
         * 设置OS2信息
         *
         * @param {Object} fields 字段值
         * @return {Object} 头对象
         */
      }, {
        key: "setOS2",
        value: function setOS2(fields) {
          (0, _lang.overwrite)(this.ttf["OS/2"], fields, [
            "usWinAscent",
            "usWinDescent",
            "sTypoAscender",
            "sTypoDescender",
            "sTypoLineGap",
            "sxHeight",
            "bXHeight",
            "usWeightClass",
            "usWidthClass",
            "yStrikeoutPosition",
            "yStrikeoutSize",
            "achVendID",
            // panose
            "bFamilyType",
            "bSerifStyle",
            "bWeight",
            "bProportion",
            "bContrast",
            "bStrokeVariation",
            "bArmStyle",
            "bLetterform",
            "bMidline",
            "bXHeight"
          ]);
          return this.ttf["OS/2"];
        }
        /**
         * 设置post信息
         *
         * @param {Object} fields 字段值
         * @return {Object} 头对象
         */
      }, {
        key: "setPost",
        value: function setPost(fields) {
          (0, _lang.overwrite)(this.ttf.post, fields, ["underlinePosition", "underlineThickness"]);
          return this.ttf.post;
        }
        /**
         * 计算度量信息
         *
         * @return {Object} 度量信息
         */
      }, {
        key: "calcMetrics",
        value: function calcMetrics() {
          var ascent = -16384;
          var descent = 16384;
          var uX = 120;
          var uH = 72;
          var sxHeight;
          var sCapHeight;
          this.ttf.glyf.forEach(function(g) {
            if (g.yMax > ascent) {
              ascent = g.yMax;
            }
            if (g.yMin < descent) {
              descent = g.yMin;
            }
            if (g.unicode) {
              if (g.unicode.indexOf(uX) >= 0) {
                sxHeight = g.yMax;
              }
              if (g.unicode.indexOf(uH) >= 0) {
                sCapHeight = g.yMax;
              }
            }
          });
          ascent = Math.round(ascent);
          descent = Math.round(descent);
          return {
            // 此处非必须自动设置
            ascent,
            descent,
            sTypoAscender: ascent,
            sTypoDescender: descent,
            // 自动设置项目
            usWinAscent: ascent,
            usWinDescent: -descent,
            sxHeight: sxHeight || 0,
            sCapHeight: sCapHeight || 0
          };
        }
        /**
         * 优化ttf字形信息
         *
         * @return {Array} 改变的glyf
         */
      }, {
        key: "optimize",
        value: function optimize() {
          return (0, _optimizettf.default)(this.ttf);
        }
        /**
         * 复合字形转简单字形
         *
         * @param {Array=} indexList 索引列表
         * @return {Array} 改变的glyf
         */
      }, {
        key: "compound2simple",
        value: function compound2simple(indexList) {
          var ttf = this.ttf;
          if (ttf.maxp && !ttf.maxp.maxComponentElements) {
            return [];
          }
          var i;
          var l;
          if (!indexList || !indexList.length) {
            indexList = [];
            for (i = 0, l = ttf.glyf.length; i < l; ++i) {
              if (ttf.glyf[i].compound) {
                indexList.push(i);
              }
            }
          }
          var list = [];
          for (i = 0, l = indexList.length; i < l; ++i) {
            var glyfIndex = indexList[i];
            if (ttf.glyf[glyfIndex] && ttf.glyf[glyfIndex].compound) {
              (0, _compound2simpleglyf.default)(glyfIndex, ttf, true);
              list.push(ttf.glyf[glyfIndex]);
            }
          }
          return list;
        }
      }]);
    }();
  }
});

// vendor/fonteditor-core/lib/common/string.js
var require_string2 = __commonJS({
  "vendor/fonteditor-core/lib/common/string.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _default = exports2.default = {
      /**
       * HTML解码字符串
       *
       * @param {string} source 源字符串
       * @return {string}
       */
      decodeHTML: function decodeHTML(source) {
        var str = String(source).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        return str.replace(/&#([\d]+);/g, function($0, $1) {
          return String.fromCodePoint(parseInt($1, 10));
        });
      },
      /**
       * HTML编码字符串
       *
       * @param {string} source 源字符串
       * @return {string}
       */
      encodeHTML: function encodeHTML(source) {
        return String(source).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
      },
      /**
       * 获取string字节长度
       *
       * @param {string} source 源字符串
       * @return {number} 长度
       */
      getLength: function getLength(source) {
        return String(source).replace(/[^\x00-\xff]/g, "11").length;
      },
      /**
       * 字符串格式化，支持如 ${xxx.xxx} 的语法
       *
       * @param {string} source 模板字符串
       * @param {Object} data 数据
       * @return {string} 格式化后字符串
       */
      format: function format(source, data) {
        return source.replace(/\$\{([\w.]+)\}/g, function($0, $1) {
          var ref = $1.split(".");
          var refObject = data;
          var level;
          while (refObject != null && (level = ref.shift())) {
            refObject = refObject[level];
          }
          return refObject != null ? refObject : "";
        });
      },
      /**
       * 使用指定字符填充字符串,默认`0`
       *
       * @param {string} str 字符串
       * @param {number} size 填充到的大小
       * @param {string=} ch 填充字符
       * @return {string} 字符串
       */
      pad: function pad(str, size, ch) {
        str = String(str);
        if (str.length > size) {
          return str.slice(str.length - size);
        }
        return new Array(size - str.length + 1).join(ch || "0") + str;
      },
      /**
       * 获取字符串哈希编码
       *
       * @param {string} str 字符串
       * @return {number} 哈希值
       */
      hashcode: function hashcode(str) {
        if (!str) {
          return 0;
        }
        var hash = 0;
        for (var i = 0, l = str.length; i < l; i++) {
          hash = 34359738367 & hash * 31 + str.charCodeAt(i);
        }
        return hash;
      }
    };
  }
});

// vendor/fonteditor-core/lib/common/I18n.js
var require_I18n = __commonJS({
  "vendor/fonteditor-core/lib/common/I18n.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function appendLanguage(store, languageList) {
      languageList.forEach(function(item) {
        var language = item[0];
        store[language] = Object.assign(store[language] || {}, item[1]);
      });
      return store;
    }
    var I18n = exports2.default = /* @__PURE__ */ function() {
      function I18n2(languageList, defaultLanguage) {
        _classCallCheck(this, I18n2);
        this.store = appendLanguage({}, languageList);
        this.setLanguage(defaultLanguage || typeof navigator !== "undefined" && navigator.language && navigator.language.toLowerCase() || "en-us");
      }
      return _createClass(I18n2, [{
        key: "setLanguage",
        value: function setLanguage(language) {
          if (!this.store[language]) {
            language = "en-us";
          }
          this.lang = this.store[this.language = language];
          return this;
        }
        /**
         * 添加一个语言字符串
         *
         * @param {string} language 语言
         * @param {Object} langObject 语言对象
         * @return {this}
         */
      }, {
        key: "addLanguage",
        value: function addLanguage(language, langObject) {
          appendLanguage(this.store, [[language, langObject]]);
          return this;
        }
        /**
         * 获取当前语言字符串
         *
         * @param  {string} path 语言路径
         * @return {string}      语言字符串
         */
      }, {
        key: "get",
        value: function get(path) {
          var ref = path.split(".");
          var refObject = this.lang;
          var level;
          while (refObject != null && (level = ref.shift())) {
            refObject = refObject[level];
          }
          return refObject != null ? refObject : "";
        }
      }]);
    }();
  }
});

// vendor/fonteditor-core/lib/ttf/i18n.js
var require_i18n = __commonJS({
  "vendor/fonteditor-core/lib/ttf/i18n.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _I18n = _interopRequireDefault(require_I18n());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var zh = {
      // error define
      10001: "\u8D85\u51FA\u8BFB\u53D6\u8303\u56F4\uFF1A${0}, ${1}",
      10002: "\u8D85\u51FA\u5199\u5165\u8303\u56F4\uFF1A${0}, ${1}",
      10003: "\u672A\u77E5\u6570\u636E\u7C7B\u578B\uFF1A${0}, ${1}",
      10004: "\u4E0D\u652F\u6301svg\u89E3\u6790",
      10101: "\u9519\u8BEF\u7684ttf\u6587\u4EF6",
      10102: "\u9519\u8BEF\u7684woff\u6587\u4EF6",
      10103: "\u9519\u8BEF\u7684svg\u6587\u4EF6",
      10104: "\u8BFB\u53D6ttf\u6587\u4EF6\u9519\u8BEF",
      10105: "\u8BFB\u53D6woff\u6587\u4EF6\u9519\u8BEF",
      10106: "\u8BFB\u53D6svg\u6587\u4EF6\u9519\u8BEF",
      10107: "\u5199\u5165ttf\u6587\u4EF6\u9519\u8BEF",
      10108: "\u5199\u5165woff\u6587\u4EF6\u9519\u8BEF",
      10109: "\u5199\u5165svg\u6587\u4EF6\u9519\u8BEF",
      10112: "\u5199\u5165svg symbol \u9519\u8BEF",
      10110: "\u8BFB\u53D6eot\u6587\u4EF6\u9519\u8BEF",
      10111: "\u8BFB\u53D6eot\u5B57\u4F53\u9519\u8BEF",
      10200: "\u91CD\u590D\u7684unicode\u4EE3\u7801\u70B9\uFF0C\u5B57\u5F62\u5E8F\u53F7\uFF1A${0}",
      10201: "ttf\u5B57\u5F62\u8F6E\u5ED3\u6570\u636E\u4E3A\u7A7A",
      10202: "\u4E0D\u652F\u6301\u6807\u5FD7\u4F4D\uFF1AARGS_ARE_XY_VALUES",
      10203: "\u672A\u627E\u5230\u8868\uFF1A${0}",
      10204: "\u8BFB\u53D6ttf\u8868\u9519\u8BEF",
      10205: "\u672A\u627E\u5230\u89E3\u538B\u51FD\u6570",
      10301: "\u9519\u8BEF\u7684otf\u6587\u4EF6",
      10302: "\u8BFB\u53D6otf\u8868\u9519\u8BEF",
      10303: "otf\u5B57\u5F62\u8F6E\u5ED3\u6570\u636E\u4E3A\u7A7A"
    };
    var en = {
      // error define
      10001: "Reading index out of range: ${0}, ${1}",
      10002: "Writing index out of range: ${0}, ${1}",
      10003: "Unknown datatype: ${0}, ${1}",
      10004: "No svg parser",
      10101: "ttf file damaged",
      10102: "woff file damaged",
      10103: "svg file damaged",
      10104: "Read ttf error",
      10105: "Read woff error",
      10106: "Read svg error",
      10107: "Write ttf error",
      10108: "Write woff error",
      10109: "Write svg error",
      10112: "Write svg symbol error",
      10110: "Read eot error",
      10111: "Write eot error",
      10200: "Repeat unicode, glyph index: ${0}",
      10201: "ttf `glyph` data is empty",
      10202: "Not support compound glyph flag: ARGS_ARE_XY_VALUES",
      10203: "No ttf table: ${0}",
      10204: "Read ttf table data error",
      10205: "No zip deflate function",
      10301: "otf file damaged",
      10302: "Read otf table error",
      10303: "otf `glyph` data is empty"
    };
    var _default = exports2.default = new _I18n.default([["zh-cn", zh], ["en-us", en]], typeof window !== "undefined" ? window.language : "en-us");
  }
});

// vendor/fonteditor-core/lib/ttf/error.js
var require_error = __commonJS({
  "vendor/fonteditor-core/lib/ttf/error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _string = _interopRequireDefault(require_string2());
    var _i18n = _interopRequireDefault(require_i18n());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    var _default = exports2.default = {
      /**
       * 抛出一个异常
       *
       * @param  {Object} e 异常号或者异常对象
       * @param  {...Array} fargs args 参数
       *
       * 例如：
       * e = 1001
       * e = {
       *     number: 1001,
       *     data: 错误数据
       * }
       */
      raise: function raise(e) {
        var number;
        var data;
        if (_typeof(e) === "object") {
          number = e.number || 0;
          data = e.data;
        } else {
          number = e;
        }
        var message = _i18n.default.lang[number];
        for (var _len = arguments.length, fargs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          fargs[_key - 1] = arguments[_key];
        }
        if (fargs.length > 0) {
          var args = _typeof(fargs[0]) === "object" ? fargs[0] : fargs;
          message = _string.default.format(message, args);
        }
        var event = new Error(message);
        event.number = number;
        if (data) {
          event.data = data;
        }
        throw event;
      }
    };
  }
});

// vendor/fonteditor-core/lib/ttf/reader.js
var require_reader = __commonJS({
  "vendor/fonteditor-core/lib/ttf/reader.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _lang = require_lang();
    var _error = _interopRequireDefault(require_error());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    if (typeof ArrayBuffer === "undefined" || typeof DataView === "undefined") {
      throw new Error("not support ArrayBuffer and DataView");
    }
    var dataType = {
      Int8: 1,
      Int16: 2,
      Int32: 4,
      Uint8: 1,
      Uint16: 2,
      Uint32: 4,
      Float32: 4,
      Float64: 8
    };
    var Reader = exports2.default = /* @__PURE__ */ function() {
      function Reader2(buffer, offset, length, littleEndian) {
        _classCallCheck(this, Reader2);
        var bufferLength = buffer.byteLength || buffer.length;
        this.offset = offset || 0;
        this.length = length || bufferLength - this.offset;
        this.littleEndian = littleEndian || false;
        this.view = new DataView(buffer, this.offset, this.length);
      }
      return _createClass(Reader2, [{
        key: "read",
        value: function read(type, offset, littleEndian) {
          if (void 0 === offset) {
            offset = this.offset;
          }
          if (void 0 === littleEndian) {
            littleEndian = this.littleEndian;
          }
          if (void 0 === dataType[type]) {
            return this["read" + type](offset, littleEndian);
          }
          var size = dataType[type];
          this.offset = offset + size;
          switch (type) {
            case "Int8":
              return this.view.getInt8(offset, littleEndian);
            case "Uint8":
              return this.view.getUint8(offset, littleEndian);
            case "Int16":
              return this.view.getInt16(offset, littleEndian);
            case "Uint16":
              return this.view.getUint16(offset, littleEndian);
            case "Int32":
              return this.view.getInt32(offset, littleEndian);
            case "Uint32":
              return this.view.getUint32(offset, littleEndian);
            case "Float32":
              return this.view.getFloat32(offset, littleEndian);
            case "Float64":
              return this.view.getFloat64(offset, littleEndian);
          }
        }
        /**
         * 获取指定的字节数组
         *
         * @param {number} offset 偏移
         * @param {number} length 字节长度
         * @return {Array} 字节数组
         */
      }, {
        key: "readBytes",
        value: function readBytes(offset) {
          var length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          if (length == null) {
            length = offset;
            offset = this.offset;
          }
          if (length < 0 || offset + length > this.length) {
            _error.default.raise(10001, this.length, offset + length);
          }
          var bytes = new Uint8Array(this.view.buffer, this.view.byteOffset + offset, length).slice();
          this.offset = offset + length;
          return bytes;
        }
        /**
         * 读取一个string
         *
         * @param {number} offset 偏移
         * @param {number} length 长度
         * @return {string} 字符串
         */
      }, {
        key: "readString",
        value: function readString(offset) {
          var length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          if (length == null) {
            length = offset;
            offset = this.offset;
          }
          if (length < 0 || offset + length > this.length) {
            _error.default.raise(10001, this.length, offset + length);
          }
          var viewOffset = this.view.byteOffset + offset;
          var bytes = new Uint8Array(this.view.buffer, viewOffset, length);
          this.offset = offset + length;
          if (length <= 1024) {
            return String.fromCharCode.apply(null, bytes);
          }
          var parts = [];
          var chunkSize = 1024;
          for (var ci = 0; ci < length; ci += chunkSize) {
            var end = ci + chunkSize < length ? ci + chunkSize : length;
            parts.push(String.fromCharCode.apply(null, bytes.subarray(ci, end)));
          }
          return parts.join("");
        }
        /**
         * 读取一个字符
         *
         * @param {number} offset 偏移
         * @return {string} 字符串
         */
      }, {
        key: "readChar",
        value: function readChar(offset) {
          return this.readString(offset, 1);
        }
        /**
         * 读取一个uint24整形
         *
         * @param {number} offset 偏移
         * @return {number}
         */
      }, {
        key: "readUint24",
        /** 优化268: 直接 view 读取 3 字节，消除 readBytes + _slicedToArray 的临时数组分配 */
        value: function readUint24(offset) {
          if (offset === void 0) offset = this.offset;
          var vOff = this.view.byteOffset + offset;
          var buf = this.view.buffer;
          return (buf[vOff] << 16) + (buf[vOff + 1] << 8) + buf[vOff + 2];
        }
        /**
         * 读取fixed类型
         *
         * @param {number} offset 偏移
         * @return {number} float
         */
      }, {
        key: "readFixed",
        value: function readFixed(offset) {
          if (void 0 === offset) {
            offset = this.offset;
          }
          var val = this.readInt32(offset, false) / 65536;
          return Math.ceil(val * 1e5) / 1e5;
        }
        /**
         * 读取长日期
         *
         * @param {number} offset 偏移
         * @return {Date} Date对象
         */
      }, {
        key: "readLongDateTime",
        value: function readLongDateTime(offset) {
          if (void 0 === offset) {
            offset = this.offset;
          }
          var delta = -20775456e5;
          var time = this.readUint32(offset + 4, false);
          var date = /* @__PURE__ */ new Date();
          date.setTime(time * 1e3 + delta);
          return date;
        }
        /**
         * 跳转到指定偏移
         *
         * @param {number} offset 偏移
         * @return {Object} this
         */
      }, {
        key: "seek",
        value: function seek(offset) {
          if (void 0 === offset) {
            this.offset = 0;
          }
          if (offset < 0 || offset > this.length) {
            _error.default.raise(10001, this.length, offset);
          }
          this.offset = offset;
          return this;
        }
        /**
         * 注销
         */
      }, {
        key: "dispose",
        value: function dispose() {
          this.view = null;
        }
      }]);
    }();
    Reader.prototype.readInt8 = function(offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 1;
      return this.view.getInt8(offset, this.littleEndian);
    };
    Reader.prototype.readUint8 = function(offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 1;
      return this.view.getUint8(offset, this.littleEndian);
    };
    Reader.prototype.readInt16 = function(offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 2;
      return this.view.getInt16(offset, this.littleEndian);
    };
    Reader.prototype.readUint16 = function(offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 2;
      return this.view.getUint16(offset, this.littleEndian);
    };
    Reader.prototype.readInt32 = function(offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 4;
      return this.view.getInt32(offset, this.littleEndian);
    };
    Reader.prototype.readUint32 = function(offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 4;
      return this.view.getUint32(offset, this.littleEndian);
    };
    Reader.prototype.readFloat32 = function(offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 4;
      return this.view.getFloat32(offset, this.littleEndian);
    };
    Reader.prototype.readFloat64 = function(offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 8;
      return this.view.getFloat64(offset, this.littleEndian);
    };
  }
});

// vendor/fonteditor-core/lib/ttf/writer.js
var require_writer = __commonJS({
  "vendor/fonteditor-core/lib/ttf/writer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _lang = require_lang();
    var _error = _interopRequireDefault(require_error());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    if (typeof ArrayBuffer === "undefined" || typeof DataView === "undefined") {
      throw new Error("not support ArrayBuffer and DataView");
    }
    var _globalView = null;
    var _globalViewBuf = null;
    var _isAllDigits = /^\d+$/;
    var dataType = {
      Int8: 1,
      Int16: 2,
      Int32: 4,
      Uint8: 1,
      Uint16: 2,
      Uint32: 4,
      Float32: 4,
      Float64: 8
    };
    var Writer = /* @__PURE__ */ function() {
      function Writer2(buffer, offset, length, littleEndian) {
        _classCallCheck(this, Writer2);
        var bufferLength = buffer.byteLength || buffer.length;
        this.offset = offset || 0;
        this.length = length || bufferLength - this.offset;
        this.littleEndian = littleEndian || false;
        this.view = new DataView(buffer, this.offset, this.length);
      }
      return _createClass(Writer2, [{
        key: "write",
        value: function write(type, value, offset, littleEndian) {
          if (void 0 === offset) {
            offset = this.offset;
          }
          if (void 0 === littleEndian) {
            littleEndian = this.littleEndian;
          }
          if (void 0 === dataType[type]) {
            return this["write" + type](value, offset, littleEndian);
          }
          var size = dataType[type];
          this.offset = offset + size;
          switch (type) {
            case "Int8":
              this.view.setInt8(offset, value, littleEndian);
              break;
            case "Uint8":
              this.view.setUint8(offset, value, littleEndian);
              break;
            case "Int16":
              this.view.setInt16(offset, value, littleEndian);
              break;
            case "Uint16":
              this.view.setUint16(offset, value, littleEndian);
              break;
            case "Int32":
              this.view.setInt32(offset, value, littleEndian);
              break;
            case "Uint32":
              this.view.setUint32(offset, value, littleEndian);
              break;
            case "Float32":
              this.view.setFloat32(offset, value, littleEndian);
              break;
            case "Float64":
              this.view.setFloat64(offset, value, littleEndian);
              break;
          }
          return this;
        }
        /**
         * 写入指定的字节数组
         *
         * @param {ArrayBuffer} value 写入值
         * @param {number=} length 数组长度
         * @param {number=} offset 起始偏移
         * @return {this}
         */
      }, {
        key: "writeBytes",
        value: function writeBytes(value, length, offset) {
          length = length || value.byteLength || value.length;
          if (!length) {
            return this;
          }
          if (void 0 === offset) {
            offset = this.offset;
          }
          if (length < 0 || offset + length > this.length) {
            _error.default.raise(10002, this.length, offset + length);
          }
          if (_globalViewBuf !== this.view.buffer) {
            _globalViewBuf = this.view.buffer;
            _globalView = new Uint8Array(_globalViewBuf);
          }
          var vOff = this.view.byteOffset + offset;
          if (value instanceof Uint8Array) {
            _globalView.set(value, vOff);
          } else {
            _globalView.set(value instanceof ArrayBuffer ? new Uint8Array(value, 0, length) : new Uint8Array(value), vOff);
          }
          this.offset = offset + length;
          return this;
        }
        /**
         * 写空数据
         *
         * @param {number} length 长度
         * @param {number=} offset 起始偏移
         * @return {this}
         */
      }, {
        key: "writeEmpty",
        value: function writeEmpty(length, offset) {
          if (length < 0) {
            _error.default.raise(10002, this.length, length);
          }
          if (void 0 === offset) {
            offset = this.offset;
          }
          if (_globalViewBuf !== this.view.buffer) {
            _globalViewBuf = this.view.buffer;
            _globalView = new Uint8Array(_globalViewBuf);
          }
          _globalView.fill(0, this.view.byteOffset + offset, this.view.byteOffset + offset + length);
          this.offset = offset + length;
          return this;
        }
        /**
         * 写入一个string
         *
         * @param {string} str 字符串
         * @param {number=} length 长度
         * @param {number=} offset 偏移
         *
         * @return {this}
         */
      }, {
        key: "writeString",
        value: function writeString() {
          var str = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var length = arguments.length > 1 ? arguments[1] : void 0;
          var offset = arguments.length > 2 ? arguments[2] : void 0;
          if (void 0 === offset) {
            offset = this.offset;
          }
          length = length || str.replace(/[^\x00-\xff]/g, "11").length;
          if (length < 0 || offset + length > this.length) {
            _error.default.raise(10002, this.length, offset + length);
          }
          var pos = offset;
          for (var i = 0, l = str.length, charCode; i < l; ++i) {
            charCode = str.charCodeAt(i);
            if (charCode > 127) {
              this.view.setUint16(pos, charCode, this.littleEndian);
              pos += 2;
            } else {
              this.view.setUint8(pos, charCode);
              pos += 1;
            }
          }
          this.offset = offset + length;
          return this;
        }
        /**
         * 写入一个字符
         *
         * @param {string} value 字符
         * @param {number=} offset 偏移
         * @return {this}
         */
      }, {
        key: "writeChar",
        value: function writeChar(value, offset) {
          return this.writeString(value, offset);
        }
        /**
         * 写入fixed类型
         *
         * @param {number} value 写入值
         * @param {number=} offset 偏移
         * @return {number} float
         */
      }, {
        key: "writeFixed",
        value: function writeFixed(value, offset) {
          if (void 0 === offset) {
            offset = this.offset;
          }
          this.writeInt32(value * 65536 + 0.5 | 0, offset);
          return this;
        }
        /**
         * 写入长日期
         *
         * @param {Date} value 日期对象
         * @param {number=} offset 偏移
         *
         * @return {Date} Date对象
         */
      }, {
        key: "writeLongDateTime",
        value: function writeLongDateTime(value, offset) {
          if (void 0 === offset) {
            offset = this.offset;
          }
          var delta = -20775456e5;
          if (typeof value === "undefined") {
            value = delta;
          } else if (typeof value.getTime === "function") {
            value = value.getTime();
          } else if (_isAllDigits.test(value)) {
            value = +value;
          } else {
            value = Date.parse(value);
          }
          var time = Math.round((value - delta) / 1e3);
          this.writeUint32(0, offset);
          this.writeUint32(time, offset + 4);
          return this;
        }
        /**
         * 跳转到指定偏移
         *
         * @param {number=} offset 偏移
         * @return {this}
         */
      }, {
        key: "seek",
        value: function seek(offset) {
          if (void 0 === offset) {
            this.offset = 0;
          }
          if (offset < 0 || offset > this.length) {
            _error.default.raise(10002, this.length, offset);
          }
          this._offset = this.offset;
          this.offset = offset;
          return this;
        }
        /**
         * 跳转到写入头部位置
         *
         * @return {this}
         */
      }, {
        key: "head",
        value: function head() {
          this.offset = this._offset || 0;
          return this;
        }
        /**
         * 获取缓存的byte数组
         *
         * @return {ArrayBuffer}
         */
      }, {
        key: "getBuffer",
        value: function getBuffer() {
          return this.view.buffer;
        }
        /**
         * 注销
         */
      }, {
        key: "dispose",
        value: function dispose() {
          this.view = null;
        }
      }]);
    }();
    Writer.prototype.writeInt8 = function(value, offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 1;
      this.view.setInt8(offset, value, this.littleEndian);
      return this;
    };
    Writer.prototype.writeUint8 = function(value, offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 1;
      this.view.setUint8(offset, value, this.littleEndian);
      return this;
    };
    Writer.prototype.writeInt16 = function(value, offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 2;
      this.view.setInt16(offset, value, this.littleEndian);
      return this;
    };
    Writer.prototype.writeUint16 = function(value, offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 2;
      this.view.setUint16(offset, value, this.littleEndian);
      return this;
    };
    Writer.prototype.writeInt32 = function(value, offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 4;
      this.view.setInt32(offset, value, this.littleEndian);
      return this;
    };
    Writer.prototype.writeUint32 = function(value, offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 4;
      this.view.setUint32(offset, value, this.littleEndian);
      return this;
    };
    Writer.prototype.writeFloat32 = function(value, offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 4;
      this.view.setFloat32(offset, value, this.littleEndian);
      return this;
    };
    Writer.prototype.writeFloat64 = function(value, offset) {
      if (offset === void 0) offset = this.offset;
      this.offset = offset + 8;
      this.view.setFloat64(offset, value, this.littleEndian);
      return this;
    };
    var _default = exports2.default = Writer;
  }
});

// vendor/fonteditor-core/lib/ttf/woff2ttf.js
var require_woff2ttf = __commonJS({
  "vendor/fonteditor-core/lib/ttf/woff2ttf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = woff2ttf;
    var _reader = _interopRequireDefault(require_reader());
    var _writer = _interopRequireDefault(require_writer());
    var _error = _interopRequireDefault(require_error());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function woff2ttf(woffBuffer) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var reader = new _reader.default(woffBuffer);
      var signature = reader.readUint32(0);
      var flavor = reader.readUint32(4);
      if (signature !== 2001684038 || flavor !== 65536 && flavor !== 1330926671) {
        reader.dispose();
        _error.default.raise(10102);
      }
      var numTables = reader.readUint16(12);
      var ttfSize = reader.readUint32(16);
      var tableEntries = [];
      var tableEntry;
      var i;
      var l;
      for (i = 0; i < numTables; ++i) {
        reader.seek(44 + i * 20);
        tableEntry = {
          tag: reader.readString(reader.offset, 4),
          offset: reader.readUint32(),
          compLength: reader.readUint32(),
          length: reader.readUint32(),
          checkSum: reader.readUint32()
        };
        var deflateData = reader.readBytes(tableEntry.offset, tableEntry.compLength);
        if (deflateData.length < tableEntry.length) {
          if (!options.inflate) {
            reader.dispose();
            _error.default.raise(10105);
          }
          tableEntry.data = options.inflate(deflateData);
        } else {
          tableEntry.data = deflateData;
        }
        tableEntry.length = tableEntry.data.length;
        tableEntries.push(tableEntry);
      }
      var writer = new _writer.default(new ArrayBuffer(ttfSize));
      var entrySelector = 31 - Math.clz32(numTables);
      var searchRange = (1 << entrySelector) * 16;
      var rangeShift = numTables * 16 - searchRange;
      writer.writeUint32(flavor);
      writer.writeUint16(numTables);
      writer.writeUint16(searchRange);
      writer.writeUint16(entrySelector);
      writer.writeUint16(rangeShift);
      var tblOffset = 12 + 16 * tableEntries.length;
      for (i = 0, l = tableEntries.length; i < l; ++i) {
        tableEntry = tableEntries[i];
        writer.writeString(tableEntry.tag);
        writer.writeUint32(tableEntry.checkSum);
        writer.writeUint32(tblOffset);
        writer.writeUint32(tableEntry.length);
        tblOffset += tableEntry.length + (tableEntry.length % 4 ? 4 - tableEntry.length % 4 : 0);
      }
      for (i = 0, l = tableEntries.length; i < l; ++i) {
        tableEntry = tableEntries[i];
        writer.writeBytes(tableEntry.data);
        if (tableEntry.length % 4) {
          writer.writeEmpty(4 - tableEntry.length % 4);
        }
      }
      return writer.getBuffer();
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/struct.js
var require_struct = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/struct.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var struct = {
      Int8: 1,
      Uint8: 2,
      Int16: 3,
      Uint16: 4,
      Int32: 5,
      Uint32: 6,
      Fixed: 7,
      // 32-bit signed fixed-point number (16.16)
      FUnit: 8,
      // Smallest measurable distance in the em space
      // 16-bit signed fixed number with the low 14 bits of fraction
      F2Dot14: 11,
      // The long internal format of a date in seconds since 12:00 midnight,
      // January 1, 1904. It is represented as a signed 64-bit integer.
      LongDateTime: 12,
      // extend data type
      Char: 13,
      String: 14,
      Bytes: 15,
      Uint24: 20
    };
    var names = {};
    Object.keys(struct).forEach(function(key) {
      names[struct[key]] = key;
    });
    struct.names = names;
    var _default = exports2.default = struct;
  }
});

// vendor/fonteditor-core/lib/ttf/table/table.js
var require_table = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/table.js"(exports2) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _struct = _interopRequireDefault(require_struct());
    var _error = _interopRequireDefault(require_error());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function read(reader) {
      var offset = this.offset;
      if (void 0 !== offset) {
        reader.seek(offset);
      }
      var me = this;
      var struct = this.struct;
      for (var si = 0, sl = struct.length; si < sl; si++) {
        var item = struct[si];
        var name = item[0];
        var type = item[1];
        var typeName = null;
        switch (type) {
          case _struct.default.Int8:
          case _struct.default.Uint8:
          case _struct.default.Int16:
          case _struct.default.Uint16:
          case _struct.default.Int32:
          case _struct.default.Uint32:
            typeName = _struct.default.names[type];
            me[name] = reader.read(typeName);
            break;
          case _struct.default.Fixed:
            me[name] = reader.readFixed();
            break;
          case _struct.default.LongDateTime:
            me[name] = reader.readLongDateTime();
            break;
          case _struct.default.Bytes:
            me[name] = reader.readBytes(reader.offset, item[2] || 0);
            break;
          case _struct.default.Char:
            me[name] = reader.readChar();
            break;
          case _struct.default.String:
            me[name] = reader.readString(reader.offset, item[2] || 0);
            break;
          default:
            _error.default.raise(10003, name, type);
        }
      }
      return this.valueOf();
    }
    function write(writer, ttf) {
      var table = ttf[this.name];
      if (!table) {
        _error.default.raise(10203, this.name);
      }
      var struct = this.struct;
      for (var si = 0, sl = struct.length; si < sl; si++) {
        var item = struct[si];
        var name = item[0];
        switch (item[1]) {
          case 1:
            writer.write("Int8", table[name]);
            break;
          case 2:
            writer.write("Uint8", table[name]);
            break;
          case 3:
            writer.write("Int16", table[name]);
            break;
          case 4:
            writer.write("Uint16", table[name]);
            break;
          case 5:
            writer.write("Int32", table[name]);
            break;
          case 6:
            writer.write("Uint32", table[name]);
            break;
          case 7:
            writer.writeFixed(table[name]);
            break;
          case 12:
            writer.writeLongDateTime(table[name]);
            break;
          case 13:
            writer.writeChar(table[name]);
            break;
          case 14:
            writer.writeString(table[name], item[2] || 0);
            break;
          case 15:
            writer.writeBytes(table[name], item[2] || 0);
            break;
          default:
            _error.default.raise(10003, name, item[1]);
        }
      }
      return writer;
    }
    var TYPE_SIZES = [0, 1, 1, 2, 2, 4, 4, 4, 0, 0, 0, 2, 8, 1, 0, 0, 0, 0, 0, 0, 3];
    function size() {
      var sz = 0;
      var struct = this.struct;
      for (var si = 0, sl = struct.length; si < sl; si++) {
        var item = struct[si];
        var t = item[1];
        sz += t === 15 || t === 14 ? item[2] || 0 : TYPE_SIZES[t];
      }
      return sz;
    }
    function valueOf() {
      var val = {};
      var me = this;
      var struct = this.struct;
      for (var si = 0, sl = struct.length; si < sl; si++) {
        val[struct[si][0]] = me[struct[si][0]];
      }
      return val;
    }
    var _default = exports2.default = {
      read,
      write,
      size,
      valueOf,
      /**
       * 创建一个表结构
       *
       * @param {string} name 表名
       * @param {Array<[string, number]>} struct 表结构
       * @param {Object} proto 原型
       * @return {Function} 表构造函数
       */
      create: function create(name, struct, proto) {
        var Table = /* @__PURE__ */ _createClass(function Table2(offset) {
          _classCallCheck(this, Table2);
          this.name = name;
          this.struct = struct;
          this.offset = offset;
        });
        Table.prototype.read = read;
        Table.prototype.write = write;
        Table.prototype.size = size;
        Table.prototype.valueOf = valueOf;
        Object.assign(Table.prototype, proto);
        return Table;
      }
    };
  }
});

// vendor/fonteditor-core/lib/ttf/table/directory.js
var require_directory = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/directory.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var KNOWN_TAG_U32 = {
      "OS/2": 1330851634,
      "cmap": 1668112752,
      "glyf": 1735162214,
      "head": 1751474532,
      "hhea": 1751672161,
      "hmtx": 1752003704,
      "loca": 1819239265,
      "maxp": 1835104368,
      "name": 1851878757,
      "post": 1886352244,
      "CFF ": 1128678944,
      "VORG": 1448038983,
      "GPOS": 1196445523,
      "kern": 1801810542,
      "kerx": 1801810552,
      "cvt ": 1668707360,
      "fpgm": 1718642541,
      "prep": 1886545264,
      "gasp": 1734439792
    };
    var _default = exports2.default = _table.default.create("directory", [], {
      read: function read(reader, ttf) {
        var tables = {};
        var numTables = ttf.numTables;
        var offset = this.offset;
        var view = reader.view;
        var vOffset = view.byteOffset + offset;
        for (var i = 0; i < numTables; i++) {
          var name = String.fromCharCode(
            view.getUint8(vOffset),
            view.getUint8(vOffset + 1),
            view.getUint8(vOffset + 2),
            view.getUint8(vOffset + 3)
          ).trim();
          tables[name] = {
            name,
            checkSum: view.getUint32(vOffset + 4, false),
            offset: view.getUint32(vOffset + 8, false),
            length: view.getUint32(vOffset + 12, false)
          };
          vOffset += 16;
        }
        reader.offset = offset + numTables * 16;
        return tables;
      },
      /**
       * 优化111+184: 直接 DataView 批量写入，避免 writer 方法调用开销
       * 优化184: 使用 Uint32 写入 4 字节 tag，减少 4 次 setUint8 调用为 1 次 setUint32
       */
      write: function write(writer, ttf) {
        var tables = ttf.support.tables;
        var view = writer.view;
        var pos = writer.offset;
        for (var i = 0, l = tables.length; i < l; i++) {
          var t = tables[i];
          var tagU32 = KNOWN_TAG_U32[t.name];
          if (tagU32 === void 0) {
            var name = t.name;
            tagU32 = name.charCodeAt(0) << 24 | name.charCodeAt(1) << 16 | name.charCodeAt(2) << 8 | name.charCodeAt(3);
          }
          view.setUint32(pos, tagU32, false);
          pos += 4;
          view.setUint32(pos, t.checkSum, false);
          pos += 4;
          view.setUint32(pos, t.offset, false);
          pos += 4;
          view.setUint32(pos, t.length, false);
          pos += 4;
        }
        writer.offset = pos;
        return writer;
      },
      size: function size(ttf) {
        return ttf.numTables * 16;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/head.js
var require_head = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/head.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    var _struct = _interopRequireDefault(require_struct());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("head", [["version", _struct.default.Fixed], ["fontRevision", _struct.default.Fixed], ["checkSumAdjustment", _struct.default.Uint32], ["magickNumber", _struct.default.Uint32], ["flags", _struct.default.Uint16], ["unitsPerEm", _struct.default.Uint16], ["created", _struct.default.LongDateTime], ["modified", _struct.default.LongDateTime], ["xMin", _struct.default.Int16], ["yMin", _struct.default.Int16], ["xMax", _struct.default.Int16], ["yMax", _struct.default.Int16], ["macStyle", _struct.default.Uint16], ["lowestRecPPEM", _struct.default.Uint16], ["fontDirectionHint", _struct.default.Int16], ["indexToLocFormat", _struct.default.Int16], ["glyphDataFormat", _struct.default.Int16]], {
      size: function() {
        return 54;
      },
      /** 优化178: 全部内联 view 读取 54 字节，LongDateTime 存储为毫秒时间戳 */
      read: function(reader) {
        reader.seek(this.offset);
        var v = reader.view;
        var o = reader.offset;
        var base = -20828448e5;
        this.version = v.getInt32(o, false) / 65536;
        o += 4;
        this.fontRevision = v.getInt32(o, false) / 65536;
        o += 4;
        this.checkSumAdjustment = v.getUint32(o, false);
        o += 4;
        this.magickNumber = v.getUint32(o, false);
        o += 4;
        this.flags = v.getUint16(o, false);
        o += 2;
        this.unitsPerEm = v.getUint16(o, false);
        o += 2;
        this.created = base + v.getUint32(o + 4, false) * 1e3;
        o += 8;
        this.modified = base + v.getUint32(o + 4, false) * 1e3;
        o += 8;
        this.xMin = v.getInt16(o, false);
        o += 2;
        this.yMin = v.getInt16(o, false);
        o += 2;
        this.xMax = v.getInt16(o, false);
        o += 2;
        this.yMax = v.getInt16(o, false);
        o += 2;
        this.macStyle = v.getUint16(o, false);
        o += 2;
        this.lowestRecPPEM = v.getUint16(o, false);
        o += 2;
        this.fontDirectionHint = v.getInt16(o, false);
        o += 2;
        this.indexToLocFormat = v.getInt16(o, false);
        o += 2;
        this.glyphDataFormat = v.getInt16(o, false);
        o += 2;
        reader.offset = o;
        return {
          version: this.version,
          fontRevision: this.fontRevision,
          checkSumAdjustment: this.checkSumAdjustment,
          magickNumber: this.magickNumber,
          flags: this.flags,
          unitsPerEm: this.unitsPerEm,
          created: this.created,
          modified: this.modified,
          xMin: this.xMin,
          yMin: this.yMin,
          xMax: this.xMax,
          yMax: this.yMax,
          macStyle: this.macStyle,
          lowestRecPPEM: this.lowestRecPPEM,
          fontDirectionHint: this.fontDirectionHint,
          indexToLocFormat: this.indexToLocFormat,
          glyphDataFormat: this.glyphDataFormat
        };
      },
      /** 优化178: 全部内联 view 写入 54 字节，包括 LongDateTime */
      write: function(writer, ttf) {
        var head = ttf.head;
        var pos = writer.offset;
        var view = writer.view;
        view.setInt32(pos, head.version * 65536 + 0.5 | 0, false);
        pos += 4;
        view.setInt32(pos, head.fontRevision * 65536 + 0.5 | 0, false);
        pos += 4;
        view.setUint32(pos, head.checkSumAdjustment, false);
        pos += 4;
        view.setUint32(pos, head.magickNumber, false);
        pos += 4;
        view.setUint16(pos, head.flags, false);
        pos += 2;
        view.setUint16(pos, head.unitsPerEm, false);
        pos += 2;
        var delta = -20775456e5;
        var cMs = +head.created;
        view.setUint32(pos, 0, false);
        pos += 4;
        view.setUint32(pos, (cMs - delta + 500 | 0) / 1e3 | 0, false);
        pos += 4;
        var mMs = +head.modified;
        view.setUint32(pos, 0, false);
        pos += 4;
        view.setUint32(pos, (mMs - delta + 500 | 0) / 1e3 | 0, false);
        pos += 4;
        view.setInt16(pos, head.xMin, false);
        pos += 2;
        view.setInt16(pos, head.yMin, false);
        pos += 2;
        view.setInt16(pos, head.xMax, false);
        pos += 2;
        view.setInt16(pos, head.yMax, false);
        pos += 2;
        view.setUint16(pos, head.macStyle, false);
        pos += 2;
        view.setUint16(pos, head.lowestRecPPEM, false);
        pos += 2;
        view.setInt16(pos, head.fontDirectionHint, false);
        pos += 2;
        view.setInt16(pos, head.indexToLocFormat, false);
        pos += 2;
        view.setInt16(pos, head.glyphDataFormat, false);
        pos += 2;
        writer.offset = pos;
        return writer;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/maxp.js
var require_maxp = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/maxp.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    var _struct = _interopRequireDefault(require_struct());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("maxp", [["version", _struct.default.Fixed], ["numGlyphs", _struct.default.Uint16], ["maxPoints", _struct.default.Uint16], ["maxContours", _struct.default.Uint16], ["maxCompositePoints", _struct.default.Uint16], ["maxCompositeContours", _struct.default.Uint16], ["maxZones", _struct.default.Uint16], ["maxTwilightPoints", _struct.default.Uint16], ["maxStorage", _struct.default.Uint16], ["maxFunctionDefs", _struct.default.Uint16], ["maxInstructionDefs", _struct.default.Uint16], ["maxStackElements", _struct.default.Uint16], ["maxSizeOfInstructions", _struct.default.Uint16], ["maxComponentElements", _struct.default.Uint16], ["maxComponentDepth", _struct.default.Int16]], {
      /** 优化178: 直接 view 读取 32 字节 */
      read: function(reader) {
        reader.seek(this.offset);
        var v = reader.view;
        var o = reader.offset;
        var r = {};
        r.version = v.getInt32(o, false) / 65536;
        o += 4;
        r.numGlyphs = v.getUint16(o, false);
        o += 2;
        r.maxPoints = v.getUint16(o, false);
        o += 2;
        r.maxContours = v.getUint16(o, false);
        o += 2;
        r.maxCompositePoints = v.getUint16(o, false);
        o += 2;
        r.maxCompositeContours = v.getUint16(o, false);
        o += 2;
        r.maxZones = v.getUint16(o, false);
        o += 2;
        r.maxTwilightPoints = v.getUint16(o, false);
        o += 2;
        r.maxStorage = v.getUint16(o, false);
        o += 2;
        r.maxFunctionDefs = v.getUint16(o, false);
        o += 2;
        r.maxInstructionDefs = v.getUint16(o, false);
        o += 2;
        r.maxStackElements = v.getUint16(o, false);
        o += 2;
        r.maxSizeOfInstructions = v.getUint16(o, false);
        o += 2;
        r.maxComponentElements = v.getUint16(o, false);
        o += 2;
        r.maxComponentDepth = v.getInt16(o, false);
        o += 2;
        reader.offset = o;
        return r;
      },
      /** 优化178: 直接 view 写入 32 字节，注意写入 ttf.support.maxp */
      write: function write(writer, ttf) {
        var m = ttf.support.maxp;
        var pos = writer.offset;
        var view = writer.view;
        view.setInt32(pos, m.version * 65536 + 0.5 | 0, false);
        pos += 4;
        view.setUint16(pos, m.numGlyphs, false);
        pos += 2;
        view.setUint16(pos, m.maxPoints, false);
        pos += 2;
        view.setUint16(pos, m.maxContours, false);
        pos += 2;
        view.setUint16(pos, m.maxCompositePoints, false);
        pos += 2;
        view.setUint16(pos, m.maxCompositeContours, false);
        pos += 2;
        view.setUint16(pos, m.maxZones, false);
        pos += 2;
        view.setUint16(pos, m.maxTwilightPoints, false);
        pos += 2;
        view.setUint16(pos, m.maxStorage, false);
        pos += 2;
        view.setUint16(pos, m.maxFunctionDefs, false);
        pos += 2;
        view.setUint16(pos, m.maxInstructionDefs, false);
        pos += 2;
        view.setUint16(pos, m.maxStackElements, false);
        pos += 2;
        view.setUint16(pos, m.maxSizeOfInstructions, false);
        pos += 2;
        view.setUint16(pos, m.maxComponentElements, false);
        pos += 2;
        view.setInt16(pos, m.maxComponentDepth, false);
        pos += 2;
        writer.offset = pos;
        return writer;
      },
      size: function size() {
        return 32;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/util/readWindowsAllCodes.js
var require_readWindowsAllCodes = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/readWindowsAllCodes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = readWindowsAllCodes;
    function lookupFormat123(format12, unicode) {
      if (format12._lazyGroups) {
        var view = format12._cmapView;
        var base = format12._groupsOffset;
        var lo = 0, hi = format12.nGroups - 1;
        while (lo <= hi) {
          var mid = lo + hi >> 1;
          var gOff = base + mid * 12;
          var gStart = view.getUint32(gOff, false);
          var gEnd = view.getUint32(gOff + 4, false);
          if (unicode < gStart) {
            hi = mid - 1;
          } else if (unicode > gEnd) {
            lo = mid + 1;
          } else {
            return view.getUint32(gOff + 8, false) + (unicode - gStart);
          }
        }
        return -1;
      }
      var groups = format12.groups;
      var lo2 = 0, hi2 = groups.length / 3 - 1;
      while (lo2 <= hi2) {
        var mid2 = lo2 + hi2 >> 1;
        var gi = mid2 * 3;
        var gStart2 = groups[gi];
        var gEnd2 = groups[gi + 1];
        if (unicode < gStart2) {
          hi2 = mid2 - 1;
        } else if (unicode > gEnd2) {
          lo2 = mid2 + 1;
        } else {
          return groups[gi + 2] + (unicode - gStart2);
        }
      }
      return -1;
    }
    function lookupFormat43(format4, unicode, _graphIdArrayIndexOffset) {
      var segCount = format4.segCount || format4.segCountX2 / 2;
      if (format4._lazySegs) {
        var view = format4._cmapView;
        var endOff = format4._endCodeOff;
        var startOff = format4._startCodeOff;
        var deltaOff = format4._idDeltaOff;
        var rangeOff = format4._idRangeOffsetOff;
        var lo = 0, hi = segCount - 1;
        while (lo <= hi) {
          var mid = lo + hi >> 1;
          var m2 = mid * 2;
          var sCode = view.getUint16(startOff + m2, false);
          if (unicode < sCode) {
            hi = mid - 1;
          } else if (unicode > view.getUint16(endOff + m2, false)) {
            lo = mid + 1;
          } else {
            var idR = view.getUint16(rangeOff + m2, false);
            if (idR === 0) {
              return (unicode + view.getUint16(deltaOff + m2, false)) % 65536;
            }
            var graphIdArrayIndexOffset = _graphIdArrayIndexOffset != null ? _graphIdArrayIndexOffset : (format4.glyphIdArrayOffset - format4.idRangeOffsetOffset) / 2;
            var index = mid + (idR >> 1) + (unicode - sCode) - graphIdArrayIndexOffset;
            var graphId = view.getUint16(format4.glyphIdArrayOffset + index * 2, false);
            if (graphId !== 0) {
              return (graphId + view.getUint16(deltaOff + m2, false)) % 65536;
            }
            return 0;
          }
        }
        return -1;
      }
      var startCode = format4.startCode;
      var endCode = format4.endCode;
      var idDelta = format4.idDelta;
      var idRangeOffset = format4.idRangeOffset;
      var lo2 = 0, hi2 = segCount - 1;
      while (lo2 <= hi2) {
        var mid2 = lo2 + hi2 >> 1;
        if (unicode < startCode[mid2]) {
          hi2 = mid2 - 1;
        } else if (unicode > endCode[mid2]) {
          lo2 = mid2 + 1;
        } else {
          var i = mid2;
          if (idRangeOffset[i] === 0) {
            return (unicode + idDelta[i]) % 65536;
          }
          var graphIdArrayIndexOffset2 = _graphIdArrayIndexOffset != null ? _graphIdArrayIndexOffset : (format4.glyphIdArrayOffset - format4.idRangeOffsetOffset) / 2;
          var index2 = i + (idRangeOffset[i] >> 1) + (unicode - startCode[i]) - graphIdArrayIndexOffset2;
          var graphId2;
          if (format4.glyphIdArray) {
            graphId2 = format4.glyphIdArray[index2];
          } else if (format4._cmapView) {
            graphId2 = format4._cmapView.getUint16(format4.glyphIdArrayOffset + index2 * 2, false);
          } else {
            return 0;
          }
          if (graphId2 !== 0) {
            return (graphId2 + idDelta[i]) % 65536;
          }
          return 0;
        }
      }
      return -1;
    }
    function readWindowsAllCodes(tables, ttf) {
      var subset = ttf.readOptions && ttf.readOptions.subset;
      if (subset && subset.length > 0 && ttf.readOptions && ttf.readOptions.presetCmap) {
        return ttf.readOptions.presetCmap;
      }
      var codes = {};
      var format0 = null, format12 = null, format4 = null, format2 = null, format14 = null;
      for (var fi = 0; fi < tables.length; fi++) {
        var t = tables[fi];
        if (t.format === 0 && !format0) format0 = t;
        else if (t.platformID === 3 && t.encodingID === 10 && t.format === 12 && !format12) format12 = t;
        else if (t.platformID === 3 && t.encodingID === 1 && t.format === 4 && !format4) format4 = t;
        else if (t.platformID === 3 && t.encodingID === 3 && t.format === 2 && !format2) format2 = t;
        else if (t.platformID === 0 && t.encodingID === 5 && t.format === 14 && !format14) format14 = t;
      }
      if (subset && subset.length > 0) {
        var f4GIAO = format4 ? format4.glyphIdArrayIndexOffset != null ? format4.glyphIdArrayIndexOffset : (format4.glyphIdArrayOffset - format4.idRangeOffsetOffset) / 2 : -1;
        if (format12) {
          for (var si = 0, sl = subset.length; si < sl; si++) {
            var u = subset[si];
            if (u < 65536 && format4) {
              var gid = lookupFormat43(format4, u, f4GIAO);
              if (gid >= 0) {
                codes[u] = gid;
                continue;
              }
            }
            var gid12 = lookupFormat123(format12, u);
            if (gid12 >= 0) {
              codes[u] = gid12;
            }
          }
        } else if (format4) {
          for (var si2 = 0, sl2 = subset.length; si2 < sl2; si2++) {
            var u2 = subset[si2];
            var gid4 = lookupFormat43(format4, u2, f4GIAO);
            if (gid4 >= 0) {
              codes[u2] = gid4;
            }
          }
        }
        if (format0 && format0.glyphIdArray) {
          for (var i = 0, l = format0.glyphIdArray.length; i < l; i++) {
            if (format0.glyphIdArray[i]) {
              codes[i] = format0.glyphIdArray[i];
            }
          }
        }
        if (format14 && format14.groups && format14.groups.length) {
          for (var vi = 0, vl = format14.groups.length; vi < vl; vi++) {
            var vg = format14.groups[vi];
            if (vg.unicode) {
              codes[vg.unicode] = vg.glyphId;
            }
          }
        }
        return codes;
      }
      if (format0 && format0.glyphIdArray) {
        for (var i2 = 0, l2 = format0.glyphIdArray.length; i2 < l2; i2++) {
          if (format0.glyphIdArray[i2]) {
            codes[i2] = format0.glyphIdArray[i2];
          }
        }
      }
      if (format14) {
        for (var vi2 = 0, vl2 = format14.groups.length; vi2 < vl2; vi2++) {
          var vg2 = format14.groups[vi2];
          if (vg2.unicode) {
            codes[vg2.unicode] = vg2.glyphId;
          }
        }
      }
      if (format12) {
        var f12Groups = format12.groups;
        if (format12._flatGroups) {
          for (var gi = 0, gl = f12Groups.length; gi < gl; gi += 3) {
            var startId = f12Groups[gi + 2];
            var start = f12Groups[gi];
            var end = f12Groups[gi + 1];
            for (; start <= end; ) {
              codes[start++] = startId++;
            }
          }
        } else {
          for (var gi2 = 0, gl2 = format12.nGroups; gi2 < gl2; gi2++) {
            var group = f12Groups[gi2];
            var startId2 = group.startId;
            var start2 = group.start;
            var end2 = group.end;
            for (; start2 <= end2; ) {
              codes[start2++] = startId2++;
            }
          }
        }
      } else if (format4) {
        var segCount = format4.segCountX2 / 2;
        var graphIdArrayIndexOffset = (format4.glyphIdArrayOffset - format4.idRangeOffsetOffset) / 2;
        var f4StartCode = format4.startCode;
        var f4EndCode = format4.endCode;
        var f4IdDelta = format4.idDelta;
        var f4IdRangeOffset = format4.idRangeOffset;
        var f4GlyphIdArray = format4.glyphIdArray;
        for (var si3 = 0; si3 < segCount; ++si3) {
          var segEnd = f4EndCode[si3];
          if (segEnd > 65534) segEnd = 65534;
          for (var _start = f4StartCode[si3]; _start <= segEnd; ++_start) {
            if (f4IdRangeOffset[si3] === 0) {
              codes[_start] = _start + f4IdDelta[si3] & 65535;
            } else {
              var index = si3 + (f4IdRangeOffset[si3] >> 1) + (_start - f4StartCode[si3]) - graphIdArrayIndexOffset;
              var graphId = f4GlyphIdArray[index];
              if (graphId !== 0) {
                codes[_start] = graphId + f4IdDelta[si3] & 65535;
              } else {
                codes[_start] = 0;
              }
            }
          }
        }
      } else if (format2) {
        var subHeadKeys = format2.subHeadKeys;
        var subHeads = format2.subHeads;
        var glyphs = format2.glyphs;
        var numGlyphs = ttf.maxp.numGlyphs;
        var _index = 0;
        var sh0 = subHeads[0];
        for (var bi = 0; bi < 256; bi++) {
          if (subHeadKeys[bi] === 0) {
            if (bi >= format2.maxPos) {
              _index = 0;
            } else if (bi < sh0.firstCode || bi >= sh0.firstCode + sh0.entryCount || sh0.idRangeOffset + (bi - sh0.firstCode) >= glyphs.length) {
              _index = 0;
            } else if ((_index = glyphs[sh0.idRangeOffset + (bi - sh0.firstCode)]) !== 0) {
              _index = _index + sh0.idDelta;
            }
            if (_index !== 0 && _index < numGlyphs) {
              codes[bi] = _index;
            }
          } else {
            var sh = subHeads[subHeadKeys[bi]];
            var shIdRangeOffset = sh.idRangeOffset;
            var shIdDelta = sh.idDelta;
            var shFirstCode = sh.firstCode;
            for (var j = 0, entryCount = sh.entryCount; j < entryCount; j++) {
              if (shIdRangeOffset + j >= glyphs.length) {
                _index = 0;
              } else if ((_index = glyphs[shIdRangeOffset + j]) !== 0) {
                _index = _index + shIdDelta;
              }
              if (_index !== 0 && _index < numGlyphs) {
                var _unicode = (bi << 8 | j + shFirstCode) & 65535;
                codes[_unicode] = _index;
              }
            }
          }
        }
      }
      return codes;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/cmap/parse.js
var require_parse = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cmap/parse.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = parse;
    var _readWindowsAllCodes = _interopRequireDefault(require_readWindowsAllCodes());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function readSubTable(reader, ttf, subTable, cmapOffset) {
      var startOffset = cmapOffset + subTable.offset;
      var view = reader.view;
      var vOffset = view.byteOffset + startOffset;
      subTable.format = view.getUint16(vOffset, false);
      vOffset += 2;
      if (subTable.format === 0) {
        var isSubset = ttf.readOptions && ttf.readOptions.subset;
        if (isSubset) {
          subTable.format = 0;
        } else {
          var format0 = subTable;
          format0.length = view.getUint16(vOffset, false);
          vOffset += 2;
          format0.language = view.getUint16(vOffset, false);
          vOffset += 2;
          var glyphCount = format0.length - 6;
          var glyphIdArray = new Array(glyphCount);
          for (var i = 0; i < glyphCount; i++) {
            glyphIdArray[i] = view.getUint8(vOffset + i);
          }
          format0.glyphIdArray = glyphIdArray;
        }
      } else if (subTable.format === 2) {
        var format2 = subTable;
        format2.length = view.getUint16(vOffset, false);
        vOffset += 2;
        format2.language = view.getUint16(vOffset, false);
        vOffset += 2;
        var subHeadKeys = new Array(256);
        var maxSubHeadKey = 0;
        var maxPos = -1;
        for (var _i = 0; _i < 256; _i++) {
          subHeadKeys[_i] = view.getUint16(vOffset, false) / 8;
          if (subHeadKeys[_i] > maxSubHeadKey) {
            maxSubHeadKey = subHeadKeys[_i];
            maxPos = _i;
          }
          vOffset += 2;
        }
        var subHeads = new Array(maxSubHeadKey + 1);
        for (var j = 0; j <= maxSubHeadKey; j++) {
          subHeads[j] = {
            firstCode: view.getUint16(vOffset, false),
            entryCount: view.getUint16(vOffset + 2, false),
            idDelta: view.getUint16(vOffset + 4, false),
            idRangeOffset: (view.getUint16(vOffset + 6, false) - (maxSubHeadKey - j) * 8 - 2) / 2
          };
          vOffset += 8;
        }
        var glyphCount2 = (startOffset + format2.length - (vOffset - view.byteOffset)) / 2;
        var glyphs = new Array(glyphCount2);
        for (var k = 0; k < glyphCount2; k++) {
          glyphs[k] = view.getUint16(vOffset, false);
          vOffset += 2;
        }
        format2.subHeadKeys = subHeadKeys;
        format2.maxPos = maxPos;
        format2.subHeads = subHeads;
        format2.glyphs = glyphs;
      } else if (subTable.format === 4) {
        var format4 = subTable;
        format4.length = view.getUint16(vOffset, false);
        vOffset += 2;
        format4.language = view.getUint16(vOffset, false);
        vOffset += 2;
        format4.segCountX2 = view.getUint16(vOffset, false);
        vOffset += 2;
        format4.searchRange = view.getUint16(vOffset, false);
        vOffset += 2;
        format4.entrySelector = view.getUint16(vOffset, false);
        vOffset += 2;
        format4.rangeShift = view.getUint16(vOffset, false);
        vOffset += 2;
        var segCount = format4.segCountX2 / 2;
        format4.segCount = segCount;
        var isSubset4 = ttf.readOptions && ttf.readOptions.subset;
        if (isSubset4) {
          var endCodeOff = vOffset;
          var startCodeOff = endCodeOff + segCount * 2 + 2;
          var idDeltaOff = startCodeOff + segCount * 2;
          var idRangeOffsetOff = idDeltaOff + segCount * 2;
          var glyphIdArrayOff = idRangeOffsetOff + segCount * 2;
          format4._cmapView = view;
          format4._lazySegs = true;
          format4._endCodeOff = endCodeOff;
          format4._startCodeOff = startCodeOff;
          format4._idDeltaOff = idDeltaOff;
          format4._idRangeOffsetOff = idRangeOffsetOff;
          format4.idRangeOffsetOffset = idRangeOffsetOff - view.byteOffset;
          format4.glyphIdArrayOffset = glyphIdArrayOff - view.byteOffset;
          format4.glyphIdArrayIndexOffset = (format4.glyphIdArrayOffset - format4.idRangeOffsetOffset) / 2;
        } else {
          var endCode = new Array(segCount);
          for (var e = 0; e < segCount; e++) {
            endCode[e] = view.getUint16(vOffset, false);
            vOffset += 2;
          }
          format4.endCode = endCode;
          format4.reservedPad = view.getUint16(vOffset, false);
          vOffset += 2;
          var startCode = new Array(segCount);
          for (var s = 0; s < segCount; s++) {
            startCode[s] = view.getUint16(vOffset, false);
            vOffset += 2;
          }
          format4.startCode = startCode;
          var idDelta = new Array(segCount);
          for (var d = 0; d < segCount; d++) {
            idDelta[d] = view.getUint16(vOffset, false);
            vOffset += 2;
          }
          format4.idDelta = idDelta;
          format4.idRangeOffsetOffset = vOffset - view.byteOffset;
          var idRangeOffset = new Array(segCount);
          for (var r = 0; r < segCount; r++) {
            idRangeOffset[r] = view.getUint16(vOffset, false);
            vOffset += 2;
          }
          format4.idRangeOffset = idRangeOffset;
          var glyphCount4 = (format4.length - (vOffset - view.byteOffset - startOffset)) / 2;
          format4.glyphIdArrayOffset = vOffset - view.byteOffset;
          var glyphIdArray4 = new Array(glyphCount4);
          for (var g = 0; g < glyphCount4; g++) {
            glyphIdArray4[g] = view.getUint16(vOffset, false);
            vOffset += 2;
          }
          format4.glyphIdArray = glyphIdArray4;
          format4.glyphIdArrayIndexOffset = (format4.glyphIdArrayOffset - format4.idRangeOffsetOffset) / 2;
        }
      } else if (subTable.format === 6) {
        var format6 = subTable;
        format6.length = view.getUint16(vOffset, false);
        vOffset += 2;
        format6.language = view.getUint16(vOffset, false);
        vOffset += 2;
        format6.firstCode = view.getUint16(vOffset, false);
        vOffset += 2;
        format6.entryCount = view.getUint16(vOffset, false);
        vOffset += 2;
        format6.glyphIdArrayOffset = vOffset - view.byteOffset;
        var entryCount = format6.entryCount;
        var glyphIndexArray = new Array(entryCount);
        for (var f = 0; f < entryCount; f++) {
          glyphIndexArray[f] = view.getUint16(vOffset, false);
          vOffset += 2;
        }
        format6.glyphIdArray = glyphIndexArray;
      } else if (subTable.format === 12) {
        var format12 = subTable;
        format12.reserved = view.getUint16(vOffset, false);
        vOffset += 2;
        format12.length = view.getUint32(vOffset, false);
        vOffset += 4;
        format12.language = view.getUint32(vOffset, false);
        vOffset += 4;
        format12.nGroups = view.getUint32(vOffset, false);
        vOffset += 4;
        var nGroups = format12.nGroups;
        var isSubset12 = ttf.readOptions && ttf.readOptions.subset && ttf.readOptions.subset.length > 0;
        if (isSubset12) {
          format12._cmapView = view;
          format12._groupsOffset = vOffset;
          format12._lazyGroups = true;
        } else {
          var groups = new Array(nGroups * 3);
          for (var h = 0, gi = 0; h < nGroups; h++, gi += 3) {
            groups[gi] = view.getUint32(vOffset, false);
            groups[gi + 1] = view.getUint32(vOffset + 4, false);
            groups[gi + 2] = view.getUint32(vOffset + 8, false);
            vOffset += 12;
          }
          format12.groups = groups;
          format12._flatGroups = true;
        }
      } else if (subTable.format === 14) {
        var isSubset2 = ttf.readOptions && ttf.readOptions.subset;
        if (isSubset2) {
          subTable.format = 14;
          subTable.groups = [];
        } else {
          var format14 = subTable;
          format14.length = view.getUint32(vOffset, false);
          vOffset += 4;
          var numVarSelectorRecords = view.getUint32(vOffset, false);
          vOffset += 4;
          var _groups = [];
          var absOffset = vOffset;
          for (var vs = 0; vs < numVarSelectorRecords; vs++) {
            var varSelector = (view.getUint8(absOffset) << 16) + (view.getUint8(absOffset + 1) << 8) + view.getUint8(absOffset + 2);
            var defaultUVSOffset = view.getUint32(absOffset + 3, false);
            var nonDefaultUVSOffset = view.getUint32(absOffset + 7, false);
            absOffset += 11;
            if (defaultUVSOffset) {
              var numUnicodeValueRanges = view.getUint32(view.byteOffset + startOffset + defaultUVSOffset, false);
              var duvsOffset = view.byteOffset + startOffset + defaultUVSOffset + 4;
              for (var dj = 0; dj < numUnicodeValueRanges; dj++) {
                var startUnicode = (view.getUint8(duvsOffset) << 16) + (view.getUint8(duvsOffset + 1) << 8) + view.getUint8(duvsOffset + 2);
                var additionalCount = view.getUint8(duvsOffset + 3);
                duvsOffset += 4;
                _groups.push({
                  start: startUnicode,
                  end: startUnicode + additionalCount,
                  varSelector
                });
              }
            }
            if (nonDefaultUVSOffset) {
              var numUVSMappings = view.getUint32(view.byteOffset + startOffset + nonDefaultUVSOffset, false);
              var nuvsOffset = view.byteOffset + startOffset + nonDefaultUVSOffset + 4;
              for (var nj = 0; nj < numUVSMappings; nj++) {
                var unicode = (view.getUint8(nuvsOffset) << 16) + (view.getUint8(nuvsOffset + 1) << 8) + view.getUint8(nuvsOffset + 2);
                var glyphId = view.getUint16(nuvsOffset + 3, false);
                nuvsOffset += 5;
                _groups.push({
                  unicode,
                  glyphId,
                  varSelector
                });
              }
            }
          }
          format14.groups = _groups;
        }
      } else {
        console.warn("not support cmap format:" + subTable.format);
      }
    }
    function parse(reader, ttf) {
      if (ttf.readOptions && ttf.readOptions.presetCmap) {
        return ttf.readOptions.presetCmap;
      }
      var tcmap = {};
      var cmapOffset = this.offset;
      reader.seek(cmapOffset);
      tcmap.version = reader.readUint16();
      var numberSubtables = tcmap.numberSubtables = reader.readUint16();
      var subTables = tcmap.tables = [];
      var view = reader.view;
      var dirOffset = view.byteOffset + reader.offset;
      for (var i = 0; i < numberSubtables; i++) {
        var subTable = {};
        subTable.platformID = view.getUint16(dirOffset, false);
        subTable.encodingID = view.getUint16(dirOffset + 2, false);
        subTable.offset = view.getUint32(dirOffset + 4, false);
        readSubTable(reader, ttf, subTable, cmapOffset);
        subTables.push(subTable);
        dirOffset += 8;
      }
      reader.offset = dirOffset - view.byteOffset;
      var cmap = (0, _readWindowsAllCodes.default)(subTables, ttf);
      return cmap;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/cmap/write.js
var require_write = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cmap/write.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = write;
    function writeSubTable0(writer, unicodes) {
      var pos = writer.offset;
      var view = writer.view;
      view.setUint16(pos, 0, false);
      pos += 2;
      view.setUint16(pos, 262, false);
      pos += 2;
      view.setUint16(pos, 0, false);
      pos += 2;
      writer.offset = pos;
      writer.writeEmpty(256);
      var base = writer.offset - 256;
      for (var j = 0; j < unicodes.length; j += 2) {
        pos = base + unicodes[j];
        view.setUint8(pos, unicodes[j + 1]);
      }
      writer.offset = base + 256;
      return writer;
    }
    function writeSubTable4(writer, segments) {
      var pos = writer.offset;
      var view = writer.view;
      var segCount = segments.length / 4 + 1;
      var maxExponent = 31 - Math.clz32(segCount);
      var searchRange = 2 * (1 << maxExponent);
      view.setUint16(pos, 4, false);
      pos += 2;
      view.setUint16(pos, 16 + segCount * 8, false);
      pos += 2;
      view.setUint16(pos, 0, false);
      pos += 2;
      view.setUint16(pos, segCount * 2, false);
      pos += 2;
      view.setUint16(pos, searchRange, false);
      pos += 2;
      view.setUint16(pos, maxExponent, false);
      pos += 2;
      view.setUint16(pos, 2 * segCount - searchRange, false);
      pos += 2;
      var numSegs = segments.length / 4;
      for (var i = 0, off = 0; i < numSegs; i++, off += 4) {
        view.setUint16(pos, segments[off + 1], false);
        pos += 2;
      }
      view.setUint16(pos, 65535, false);
      pos += 2;
      view.setUint16(pos, 0, false);
      pos += 2;
      for (var j = 0, off2 = 0; j < numSegs; j++, off2 += 4) {
        view.setUint16(pos, segments[off2], false);
        pos += 2;
      }
      view.setUint16(pos, 65535, false);
      pos += 2;
      for (var k = 0, off3 = 0; k < numSegs; k++, off3 += 4) {
        view.setUint16(pos, segments[off3 + 3], false);
        pos += 2;
      }
      view.setUint16(pos, 1, false);
      pos += 2;
      var idRangeOffsetLen = (numSegs + 1) * 2;
      new Uint8Array(view.buffer, view.byteOffset + pos, idRangeOffsetLen).fill(0);
      pos += idRangeOffsetLen;
      writer.offset = pos;
      return writer;
    }
    function writeSubTable12(writer, segments) {
      var pos = writer.offset;
      var view = writer.view;
      var numSegs = segments.length / 4;
      view.setUint16(pos, 12, false);
      pos += 2;
      view.setUint16(pos, 0, false);
      pos += 2;
      view.setUint32(pos, 16 + numSegs * 12, false);
      pos += 4;
      view.setUint32(pos, 0, false);
      pos += 4;
      view.setUint32(pos, numSegs, false);
      pos += 4;
      for (var i = 0, off = 0; i < numSegs; i++, off += 4) {
        view.setUint32(pos, segments[off], false);
        pos += 4;
        view.setUint32(pos, segments[off + 1], false);
        pos += 4;
        view.setUint32(pos, segments[off + 2], false);
        pos += 4;
      }
      writer.offset = pos;
      return writer;
    }
    function write(writer, ttf) {
      var cmap = ttf.support.cmap;
      var hasGLyphsOver2Bytes = cmap.hasGLyphsOver2Bytes;
      var hasFormat0 = cmap.hasFormat0;
      var pos = writer.offset;
      var view = writer.view;
      var numRecords = 2 + (hasFormat0 ? 1 : 0) + (hasGLyphsOver2Bytes ? 1 : 0);
      view.setUint16(pos, 0, false);
      pos += 2;
      view.setUint16(pos, numRecords, false);
      pos += 2;
      var headerSize = 4 + numRecords * 8;
      var format4Size = cmap.format4Size;
      var format0Size = cmap.format0Size;
      view.setUint16(pos, 0, false);
      pos += 2;
      view.setUint16(pos, 3, false);
      pos += 2;
      view.setUint32(pos, headerSize, false);
      pos += 4;
      if (hasFormat0) {
        view.setUint16(pos, 1, false);
        pos += 2;
        view.setUint16(pos, 0, false);
        pos += 2;
        view.setUint32(pos, headerSize + format4Size, false);
        pos += 4;
      }
      view.setUint16(pos, 3, false);
      pos += 2;
      view.setUint16(pos, 1, false);
      pos += 2;
      view.setUint32(pos, headerSize, false);
      pos += 4;
      if (hasGLyphsOver2Bytes) {
        view.setUint16(pos, 3, false);
        pos += 2;
        view.setUint16(pos, 10, false);
        pos += 2;
        view.setUint32(pos, headerSize + format4Size + format0Size, false);
        pos += 4;
      }
      writer.offset = pos;
      writeSubTable4(writer, cmap.format4Segments);
      if (hasFormat0) {
        writeSubTable0(writer, cmap.format0Segments);
      }
      if (hasGLyphsOver2Bytes) {
        writeSubTable12(writer, cmap.format12Segments);
      }
      return writer;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/cmap/sizeof.js
var require_sizeof = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cmap/sizeof.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = sizeof;
    function encodeDelta(delta) {
      return delta > 32767 ? delta - 65536 : delta < -32767 ? delta + 65536 : delta;
    }
    function getSegmentsFlat(unicodeArr, idArr, bound) {
      var result = [];
      var len = unicodeArr.length;
      if (len === 0) return result;
      var segStart = -1;
      var segStartId = 0;
      var segDelta = 0;
      var prevUnicode = -1;
      var prevId = 0;
      var hasValid = false;
      for (var i = 0; i < len; i++) {
        var u = unicodeArr[i];
        var id = idArr[i];
        if (bound === void 0 || u <= bound) {
          if (!hasValid) {
            segStart = u;
            segStartId = id;
            segDelta = encodeDelta(id - u);
            hasValid = true;
          } else if (u !== prevUnicode + 1 || id !== prevId + 1) {
            result.push(segStart, prevUnicode, segStartId, segDelta);
            segStart = u;
            segStartId = id;
            segDelta = encodeDelta(id - u);
          }
          prevUnicode = u;
          prevId = id;
        }
      }
      if (hasValid) {
        result.push(segStart, prevUnicode, segStartId, segDelta);
      }
      return result;
    }
    function sizeof(ttf) {
      ttf.support.cmap = {};
      var glyfs = ttf.glyf;
      var gl = glyfs.length;
      var totalCount = 0;
      for (var index = 0; index < gl; index++) {
        var unicodes = glyfs[index].unicode;
        if (unicodes) {
          totalCount += unicodes.length;
        } else if (unicodes === 0 || unicodes === "") {
          totalCount++;
        }
      }
      var unicodeArr = new Array(totalCount);
      var idArr = new Array(totalCount);
      var ai = 0;
      for (var index2 = 0; index2 < gl; index2++) {
        var glyph = glyfs[index2];
        var ucs = glyph.unicode;
        if (ucs) {
          for (var ui = 0, ul = ucs.length; ui < ul; ui++) {
            unicodeArr[ai] = ucs[ui];
            idArr[ai] = ucs[ui] !== 65535 ? index2 : 0;
            ai++;
          }
        } else if (ucs === 0 || ucs === "") {
          unicodeArr[ai] = ucs;
          idArr[ai] = ucs !== 65535 ? index2 : 0;
          ai++;
        }
      }
      var len = ai;
      if (len > 1) {
        var indices = new Int32Array(len);
        for (var ii = 0; ii < len; ii++) indices[ii] = ii;
        indices.sort(function(a, b) {
          return unicodeArr[a] - unicodeArr[b];
        });
        var sortedU = new Array(len);
        var sortedI = new Array(len);
        for (var ii2 = 0; ii2 < len; ii2++) {
          var idx = indices[ii2];
          sortedU[ii2] = unicodeArr[idx];
          sortedI[ii2] = idArr[idx];
        }
        unicodeArr = sortedU;
        idArr = sortedI;
      }
      var format12Segments = getSegmentsFlat(unicodeArr, idArr);
      var cmapSupport = ttf.support.cmap;
      cmapSupport.format12Segments = format12Segments;
      cmapSupport.format12Size = 16 + (format12Segments.length >> 2) * 12;
      var hasOver2Bytes = false;
      for (var ci = 0, cl = format12Segments.length; ci < cl; ci += 4) {
        if (format12Segments[ci + 1] > 65535) {
          hasOver2Bytes = true;
          break;
        }
      }
      if (hasOver2Bytes) {
        cmapSupport.format4Segments = getSegmentsFlat(unicodeArr, idArr, 65535);
      } else {
        cmapSupport.format4Segments = format12Segments;
      }
      cmapSupport.hasGLyphsOver2Bytes = hasOver2Bytes;
      var format4SegCount = cmapSupport.format4Segments.length / 4 + 1;
      cmapSupport.format4Size = 16 + format4SegCount * 8;
      var format0Segments = [];
      for (var fi = 0, fl = len; fi < fl; fi++) {
        if (unicodeArr[fi] < 256) {
          format0Segments.push(unicodeArr[fi], idArr[fi]);
        }
      }
      cmapSupport.format0Segments = format0Segments;
      cmapSupport.hasFormat0 = format0Segments.length > 0;
      cmapSupport.format0Size = cmapSupport.hasFormat0 ? 262 : 0;
      var numRecords = 2 + (cmapSupport.hasFormat0 ? 1 : 0) + (cmapSupport.hasGLyphsOver2Bytes ? 1 : 0);
      var recordHeaderSize = 4 + numRecords * 8;
      var size = recordHeaderSize + cmapSupport.format0Size + cmapSupport.format4Size + (cmapSupport.hasGLyphsOver2Bytes ? cmapSupport.format12Size : 0);
      return size;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/cmap.js
var require_cmap = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cmap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    var _parse = _interopRequireDefault(require_parse());
    var _write = _interopRequireDefault(require_write());
    var _sizeof = _interopRequireDefault(require_sizeof());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("cmap", [], {
      write: _write.default,
      read: _parse.default,
      size: _sizeof.default
    });
  }
});

// vendor/fonteditor-core/lib/ttf/enum/nameId.js
var require_nameId = __commonJS({
  "vendor/fonteditor-core/lib/ttf/enum/nameId.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var nameId = {
      0: "copyright",
      1: "fontFamily",
      2: "fontSubFamily",
      3: "uniqueSubFamily",
      4: "fullName",
      5: "version",
      6: "postScriptName",
      7: "tradeMark",
      8: "manufacturer",
      9: "designer",
      10: "description",
      11: "urlOfFontVendor",
      12: "urlOfFontDesigner",
      13: "licence",
      14: "urlOfLicence",
      16: "preferredFamily",
      17: "preferredSubFamily",
      18: "compatibleFull",
      19: "sampleText"
    };
    var nameIdHash = {};
    Object.keys(nameId).forEach(function(id) {
      nameIdHash[nameId[id]] = +id;
    });
    nameId.names = nameIdHash;
    var _default = exports2.default = nameId;
  }
});

// vendor/fonteditor-core/lib/ttf/enum/platform.js
var require_platform = __commonJS({
  "vendor/fonteditor-core/lib/ttf/enum/platform.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _default = exports2.default = {
      Unicode: 0,
      Macintosh: 1,
      // mac
      reserved: 2,
      Microsoft: 3
      // win
    };
  }
});

// vendor/fonteditor-core/lib/ttf/enum/encoding.js
var require_encoding = __commonJS({
  "vendor/fonteditor-core/lib/ttf/enum/encoding.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.win = exports2.mac = void 0;
    var mac = exports2.mac = {
      "Default": 0,
      // default use
      "Version1.1": 1,
      "ISO10646": 2,
      "UnicodeBMP": 3,
      "UnicodenonBMP": 4,
      "UnicodeVariationSequences": 5,
      "FullUnicodecoverage": 6
    };
    var win = exports2.win = {
      Symbol: 0,
      UCS2: 1,
      // default use
      ShiftJIS: 2,
      PRC: 3,
      BigFive: 4,
      Johab: 5,
      UCS4: 6
    };
  }
});

// vendor/fonteditor-core/lib/ttf/table/name.js
var require_name = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/name.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    var _nameId = _interopRequireDefault(require_nameId());
    var _string = _interopRequireDefault(require_string());
    var _platform = _interopRequireDefault(require_platform());
    var _encoding = require_encoding();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var KEEP_NAME_IDS = { 1: true, 2: true, 4: true, 6: true, 16: true, 17: true };
    var _default = exports2.default = _table.default.create("name", [], {
      read: function read(reader) {
        var offset = this.offset;
        var view = reader.view;
        var vOffset = view.byteOffset + offset;
        var nameTbl = {};
        nameTbl.format = view.getUint16(vOffset, false);
        vOffset += 2;
        nameTbl.count = view.getUint16(vOffset, false);
        vOffset += 2;
        nameTbl.stringOffset = view.getUint16(vOffset, false);
        vOffset += 2;
        var count = nameTbl.count;
        var dirStart = vOffset;
        var platform = _platform.default.Macintosh;
        var encoding = _encoding.mac.Default;
        var language = 0;
        var p = dirStart;
        for (var i = 0; i < count; ++i) {
          if (view.getUint16(p, false) === _platform.default.Microsoft && view.getUint16(p + 2, false) === _encoding.win.UCS2 && view.getUint16(p + 4, false) === 1033) {
            platform = _platform.default.Microsoft;
            encoding = _encoding.win.UCS2;
            language = 1033;
            break;
          }
          p += 12;
        }
        reader.offset = dirStart + count * 12 - view.byteOffset;
        var baseOffset = offset + nameTbl.stringOffset;
        var names = {};
        var isUTF8 = language === 0;
        var p2 = dirStart;
        for (var m = 0; m < count; ++m) {
          if (view.getUint16(p2, false) === platform && view.getUint16(p2 + 2, false) === encoding && view.getUint16(p2 + 4, false) === language) {
            var nameId = view.getUint16(p2 + 6, false);
            var nameKeyId = _nameId.default[nameId];
            if (nameKeyId) {
              var len = view.getUint16(p2 + 8, false);
              var recOff = view.getUint16(p2 + 10, false);
              var nameBytes = reader.readBytes(baseOffset + recOff, len);
              names[nameKeyId] = isUTF8 ? _string.default.getUTF8String(nameBytes) : _string.default.getUCS2String(nameBytes);
            }
          }
          p2 += 12;
        }
        return names;
      },
      write: function write(writer, ttf) {
        var nameRecordTbl = ttf.support.name;
        var pos = writer.offset;
        var view = writer.view;
        view.setUint16(pos, 0, false);
        pos += 2;
        view.setUint16(pos, nameRecordTbl.length, false);
        pos += 2;
        view.setUint16(pos, 6 + nameRecordTbl.length * 12, false);
        pos += 2;
        var offset = 0;
        for (var i = 0, l = nameRecordTbl.length; i < l; i++) {
          var r = nameRecordTbl[i];
          view.setUint16(pos, r.platform, false);
          pos += 2;
          view.setUint16(pos, r.encoding, false);
          pos += 2;
          view.setUint16(pos, r.language, false);
          pos += 2;
          view.setUint16(pos, r.nameId, false);
          pos += 2;
          view.setUint16(pos, r.name.length, false);
          pos += 2;
          view.setUint16(pos, offset, false);
          pos += 2;
          offset += r.name.length;
        }
        var fullView = new Uint8Array(view.buffer, view.byteOffset);
        for (var j = 0, jl = nameRecordTbl.length; j < jl; j++) {
          fullView.set(nameRecordTbl[j].name, pos);
          pos += nameRecordTbl[j].name.length;
        }
        writer.offset = pos;
        return writer;
      },
      size: function size(ttf) {
        var names = ttf.name;
        var nameRecordTbl = [];
        var size2 = 6;
        var nameKeys = Object.keys(names);
        for (var ki = 0, kl = nameKeys.length; ki < kl; ki++) {
          var ki_name = nameKeys[ki];
          var name = ki_name;
          var id = _nameId.default.names[name];
          if (id !== void 0 && !KEEP_NAME_IDS[id]) continue;
          var _pair = _string.default.toUTF8AndUCS2Bytes(names[ki_name]);
          var utf8Bytes = _pair.utf8;
          var usc2Bytes = _pair.ucs2;
          if (void 0 !== id) {
            nameRecordTbl.push({
              nameId: id,
              platform: 1,
              encoding: 0,
              language: 0,
              name: utf8Bytes
            });
            nameRecordTbl.push({
              nameId: id,
              platform: 3,
              encoding: 1,
              language: 1033,
              name: usc2Bytes
            });
            size2 += 12 * 2 + utf8Bytes.length + usc2Bytes.length;
          }
        }
        var namingOrder = ["platform", "encoding", "language", "nameId"];
        nameRecordTbl = nameRecordTbl.sort(function(a, b) {
          for (var ni = 0; ni < 4; ni++) {
            var o = a[namingOrder[ni]] - b[namingOrder[ni]];
            if (o) return o;
          }
          return 0;
        });
        ttf.support.name = nameRecordTbl;
        return size2;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/hhea.js
var require_hhea = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/hhea.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    var _struct = _interopRequireDefault(require_struct());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("hhea", [["version", _struct.default.Fixed], ["ascent", _struct.default.Int16], ["descent", _struct.default.Int16], ["lineGap", _struct.default.Int16], ["advanceWidthMax", _struct.default.Uint16], ["minLeftSideBearing", _struct.default.Int16], ["minRightSideBearing", _struct.default.Int16], ["xMaxExtent", _struct.default.Int16], ["caretSlopeRise", _struct.default.Int16], ["caretSlopeRun", _struct.default.Int16], ["caretOffset", _struct.default.Int16], ["reserved0", _struct.default.Int16], ["reserved1", _struct.default.Int16], ["reserved2", _struct.default.Int16], ["reserved3", _struct.default.Int16], ["metricDataFormat", _struct.default.Int16], ["numOfLongHorMetrics", _struct.default.Uint16]], {
      size: function() {
        return 36;
      },
      /** 优化178: 全部内联 view 读取 36 字节 */
      read: function(reader) {
        reader.seek(this.offset);
        var v = reader.view;
        var o = reader.offset;
        this.version = v.getInt32(o, false) / 65536;
        o += 4;
        this.ascent = v.getInt16(o, false);
        o += 2;
        this.descent = v.getInt16(o, false);
        o += 2;
        this.lineGap = v.getInt16(o, false);
        o += 2;
        this.advanceWidthMax = v.getUint16(o, false);
        o += 2;
        this.minLeftSideBearing = v.getInt16(o, false);
        o += 2;
        this.minRightSideBearing = v.getInt16(o, false);
        o += 2;
        this.xMaxExtent = v.getInt16(o, false);
        o += 2;
        this.caretSlopeRise = v.getInt16(o, false);
        o += 2;
        this.caretSlopeRun = v.getInt16(o, false);
        o += 2;
        this.caretOffset = v.getInt16(o, false);
        o += 2;
        o += 8;
        this.metricDataFormat = v.getInt16(o, false);
        o += 2;
        this.numOfLongHorMetrics = v.getUint16(o, false);
        o += 2;
        reader.offset = o;
        return {
          version: this.version,
          ascent: this.ascent,
          descent: this.descent,
          lineGap: this.lineGap,
          advanceWidthMax: this.advanceWidthMax,
          minLeftSideBearing: this.minLeftSideBearing,
          minRightSideBearing: this.minRightSideBearing,
          xMaxExtent: this.xMaxExtent,
          caretSlopeRise: this.caretSlopeRise,
          caretSlopeRun: this.caretSlopeRun,
          caretOffset: this.caretOffset,
          metricDataFormat: this.metricDataFormat,
          numOfLongHorMetrics: this.numOfLongHorMetrics
        };
      },
      write: function(writer, ttf) {
        var h = ttf.hhea;
        var pos = writer.offset;
        var view = writer.view;
        view.setInt32(pos, h.version * 65536 + 0.5 | 0, false);
        pos += 4;
        view.setInt16(pos, h.ascent, false);
        pos += 2;
        view.setInt16(pos, h.descent, false);
        pos += 2;
        view.setInt16(pos, h.lineGap, false);
        pos += 2;
        view.setUint16(pos, h.advanceWidthMax, false);
        pos += 2;
        view.setInt16(pos, h.minLeftSideBearing, false);
        pos += 2;
        view.setInt16(pos, h.minRightSideBearing, false);
        pos += 2;
        view.setInt16(pos, h.xMaxExtent, false);
        pos += 2;
        view.setInt16(pos, h.caretSlopeRise, false);
        pos += 2;
        view.setInt16(pos, h.caretSlopeRun, false);
        pos += 2;
        view.setInt16(pos, h.caretOffset, false);
        pos += 2;
        pos += 8;
        view.setInt16(pos, h.metricDataFormat, false);
        pos += 2;
        view.setUint16(pos, h.numOfLongHorMetrics, false);
        pos += 2;
        writer.offset = pos;
        return writer;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/hmtx.js
var require_hmtx = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/hmtx.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("hmtx", [], {
      read: function read(reader, ttf) {
        var offset = this.offset;
        reader.seek(offset);
        var numOfLongHorMetrics = ttf.hhea.numOfLongHorMetrics;
        var numGlyphs = ttf.maxp.numGlyphs;
        var view = reader.view;
        var vOffset = view.byteOffset + offset;
        var subsetGids = ttf.readOptions && ttf.readOptions.subset && ttf.readOptions.subset.length > 0 ? ttf.subsetGids : null;
        if (subsetGids) {
          var sl = subsetGids.length;
          var hMetrics = new Int32Array(sl * 2);
          var lastSegOff = vOffset + numOfLongHorMetrics * 4;
          var lastAdvWOff = vOffset + (numOfLongHorMetrics - 1) * 4;
          for (var si = 0; si < sl; si++) {
            var gid = subsetGids[si];
            var idx = si * 2;
            if (gid < numOfLongHorMetrics) {
              var gOff = vOffset + gid * 4;
              hMetrics[idx] = view.getUint16(gOff, false);
              hMetrics[idx + 1] = view.getInt16(gOff + 2, false);
            } else {
              hMetrics[idx] = view.getUint16(lastAdvWOff, false);
              hMetrics[idx + 1] = view.getInt16(lastSegOff + (gid - numOfLongHorMetrics) * 2, false);
            }
          }
          reader.offset = offset + numOfLongHorMetrics * 4 + (numGlyphs - numOfLongHorMetrics) * 2;
          return hMetrics;
        }
        var hMetrics = new Int32Array(numGlyphs * 2);
        if ((vOffset & 1) === 0) {
          var src16 = new Uint16Array(view.buffer, vOffset, numOfLongHorMetrics * 2);
          for (var i = 0; i < numOfLongHorMetrics; i++) {
            var a = src16[i * 2];
            hMetrics[i * 2] = (a & 255) << 8 | a >> 8;
            var l = src16[i * 2 + 1];
            var le = (l & 255) << 8 | l >> 8;
            hMetrics[i * 2 + 1] = le > 32767 ? le - 65536 : le;
          }
          var lastAdvW = hMetrics[(numOfLongHorMetrics - 1) * 2];
          var numOfLast = numGlyphs - numOfLongHorMetrics;
          var lastVOff = vOffset + numOfLongHorMetrics * 4;
          var last16 = new Uint16Array(view.buffer, lastVOff, numOfLast);
          for (var j = 0; j < numOfLast; j++) {
            var idx2 = (numOfLongHorMetrics + j) * 2;
            hMetrics[idx2] = lastAdvW;
            var lv = last16[j];
            var lve = (lv & 255) << 8 | lv >> 8;
            hMetrics[idx2 + 1] = lve > 32767 ? lve - 65536 : lve;
          }
        } else {
          for (var i0 = 0; i0 < numOfLongHorMetrics; i0++) {
            var idx0 = i0 * 2;
            hMetrics[idx0] = view.getUint16(vOffset, false);
            hMetrics[idx0 + 1] = view.getInt16(vOffset + 2, false);
            vOffset += 4;
          }
          var lastAdvW0 = hMetrics[(numOfLongHorMetrics - 1) * 2];
          var numOfLast0 = numGlyphs - numOfLongHorMetrics;
          for (var j0 = 0; j0 < numOfLast0; j0++) {
            var idx20 = (numOfLongHorMetrics + j0) * 2;
            hMetrics[idx20] = lastAdvW0;
            hMetrics[idx20 + 1] = view.getInt16(vOffset, false);
            vOffset += 2;
          }
        }
        reader.offset = offset + numOfLongHorMetrics * 4 + (numGlyphs - numOfLongHorMetrics) * 2;
        return hMetrics;
      },
      write: function write(writer, ttf) {
        var numOfLongHorMetrics = ttf.hhea.numOfLongHorMetrics;
        var wView = writer.view;
        var pos = writer.offset;
        var glyfs = ttf.glyf;
        for (var i = 0; i < numOfLongHorMetrics; i++) {
          var g = glyfs[i];
          wView.setUint16(pos, g.advanceWidth, false);
          wView.setInt16(pos + 2, g.leftSideBearing, false);
          pos += 4;
        }
        var numOfLast = glyfs.length - numOfLongHorMetrics;
        var lastBase = numOfLongHorMetrics;
        for (var j = 0; j < numOfLast; j++) {
          wView.setInt16(pos, glyfs[lastBase + j].leftSideBearing, false);
          pos += 2;
        }
        writer.offset = pos;
        return writer;
      },
      size: function size(ttf) {
        var glyfs = ttf.glyf;
        var gl = glyfs.length;
        var numOfLast = 0;
        var advanceWidth = glyfs[gl - 1].advanceWidth;
        for (var i = gl - 2; i >= 0; i--) {
          if (advanceWidth === glyfs[i].advanceWidth) {
            numOfLast++;
          } else {
            break;
          }
        }
        var nlm = gl - numOfLast;
        ttf.hhea.numOfLongHorMetrics = nlm;
        return 4 * nlm + 2 * numOfLast;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/post.js
var require_post = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/post.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    var _struct = _interopRequireDefault(require_struct());
    var _string = _interopRequireDefault(require_string());
    var _unicodeName = _interopRequireDefault(require_unicodeName());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var Posthead = _table.default.create("posthead", [["format", _struct.default.Fixed], ["italicAngle", _struct.default.Fixed], ["underlinePosition", _struct.default.Int16], ["underlineThickness", _struct.default.Int16], ["isFixedPitch", _struct.default.Uint32], ["minMemType42", _struct.default.Uint32], ["maxMemType42", _struct.default.Uint32], ["minMemType1", _struct.default.Uint32], ["maxMemType1", _struct.default.Uint32]]);
    var EMPTY_PASCAL = new Uint8Array([0]);
    function getPascalStringAt(bytes, offset) {
      var length = bytes[offset];
      if (length === 0) return "";
      var chars = new Array(length);
      for (var i = 0; i < length; i++) {
        chars[i] = bytes[offset + 1 + i];
      }
      return String.fromCharCode.apply(null, chars);
    }
    var _default = exports2.default = _table.default.create("post", [], {
      read: function read(reader, ttf) {
        var tbl = new Posthead(this.offset).read(reader, ttf);
        var format = tbl.format;
        if (format === 2) {
          var numberOfGlyphs = reader.readUint16();
          if (ttf.readOptions && ttf.readOptions.subset) {
            tbl.format = 3;
            tbl.nameIndex = null;
            tbl.names = null;
          } else {
            var view = reader.view;
            var vOffset = view.byteOffset + reader.offset;
            var pascalStringOffset = reader.offset + numberOfGlyphs * 2;
            var pascalStringLength = ttf.tables.post.length - (pascalStringOffset - this.offset);
            var pascalStringBytes = reader.readBytes(pascalStringOffset, pascalStringLength);
            var glyphNameIndex = new Array(numberOfGlyphs);
            for (var i = 0; i < numberOfGlyphs; i++) {
              glyphNameIndex[i] = view.getUint16(vOffset, false);
              vOffset += 2;
            }
            tbl.nameIndex = glyphNameIndex;
            tbl.names = _string.default.getPascalString(pascalStringBytes);
          }
        } else if (format === 2.5) {
          tbl.format = 3;
        }
        return tbl;
      },
      write: function write(writer, ttf) {
        var post = ttf.post || {
          format: 3
        };
        var view = writer.view;
        var pos = writer.offset;
        view.setInt32(pos, post.format * 65536 + 0.5 | 0, false);
        pos += 4;
        view.setInt32(pos, (post.italicAngle || 0) * 65536 + 0.5 | 0, false);
        pos += 4;
        view.setInt16(pos, post.underlinePosition || 0, false);
        pos += 2;
        view.setInt16(pos, post.underlineThickness || 0, false);
        pos += 2;
        view.setUint32(pos, post.isFixedPitch || 0, false);
        pos += 4;
        view.setUint32(pos, post.minMemType42 || 0, false);
        pos += 4;
        view.setUint32(pos, post.maxMemType42 || 0, false);
        pos += 4;
        view.setUint32(pos, post.minMemType1 || 0, false);
        pos += 4;
        view.setUint32(pos, post.maxMemType1 || 0, false);
        pos += 4;
        if (post.format === 2) {
          var numberOfGlyphs = ttf.glyf.length;
          view.setUint16(pos, numberOfGlyphs, false);
          pos += 2;
          var nameIndex = ttf.support.post.nameIndex;
          for (var i = 0, l = nameIndex.length; i < l; i++) {
            view.setUint16(pos, nameIndex[i], false);
            pos += 2;
          }
          writer.offset = pos;
          var names = ttf.support.post.names;
          var uv = new Uint8Array(writer.getBuffer());
          for (var j = 0, jl = names.length; j < jl; j++) {
            var nameBytes = names[j];
            uv.set(nameBytes, pos);
            pos += nameBytes.length;
          }
          writer.offset = pos;
        } else {
          writer.offset = pos;
        }
      },
      size: function size(ttf) {
        var numberOfGlyphs = ttf.glyf.length;
        ttf.post = ttf.post || {};
        ttf.post.format = ttf.post.format || 3;
        ttf.post.maxMemType1 = numberOfGlyphs;
        if (ttf.post.format === 3 || ttf.post.format === 1) {
          ttf.support.post = {};
          return 32;
        }
        var size2 = 34 + numberOfGlyphs * 2;
        var glyphNames = [];
        var nameIndexArr = new Array(numberOfGlyphs);
        var nameIndex = 0;
        for (var i = 0; i < numberOfGlyphs; i++) {
          if (i === 0) {
            nameIndexArr[i] = 0;
          } else {
            var glyf = ttf.glyf[i];
            var unicode = glyf.unicode ? glyf.unicode[0] : 0;
            var unicodeNameIndex = _unicodeName.default[unicode];
            if (void 0 !== unicodeNameIndex) {
              nameIndexArr[i] = unicodeNameIndex;
            } else {
              var name = glyf.name;
              if (!name || name.charCodeAt(0) < 32) {
                nameIndexArr[i] = 258 + nameIndex++;
                glyphNames.push(EMPTY_PASCAL);
                size2++;
              } else {
                nameIndexArr[i] = 258 + nameIndex++;
                var bytes = _string.default.toPascalStringBytes(name);
                glyphNames.push(bytes);
                size2 += bytes.length;
              }
            }
          }
        }
        ttf.support.post = {
          nameIndex: nameIndexArr,
          names: glyphNames
        };
        return size2;
      }
    });
    exports2.getPascalStringAt = getPascalStringAt;
  }
});

// vendor/fonteditor-core/lib/ttf/table/OS2.js
var require_OS2 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/OS2.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    var _struct = _interopRequireDefault(require_struct());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("OS/2", [
      ["version", _struct.default.Uint16],
      ["xAvgCharWidth", _struct.default.Int16],
      ["usWeightClass", _struct.default.Uint16],
      ["usWidthClass", _struct.default.Uint16],
      ["fsType", _struct.default.Uint16],
      ["ySubscriptXSize", _struct.default.Uint16],
      ["ySubscriptYSize", _struct.default.Uint16],
      ["ySubscriptXOffset", _struct.default.Uint16],
      ["ySubscriptYOffset", _struct.default.Uint16],
      ["ySuperscriptXSize", _struct.default.Uint16],
      ["ySuperscriptYSize", _struct.default.Uint16],
      ["ySuperscriptXOffset", _struct.default.Uint16],
      ["ySuperscriptYOffset", _struct.default.Uint16],
      ["yStrikeoutSize", _struct.default.Uint16],
      ["yStrikeoutPosition", _struct.default.Uint16],
      ["sFamilyClass", _struct.default.Uint16],
      // Panose
      ["bFamilyType", _struct.default.Uint8],
      ["bSerifStyle", _struct.default.Uint8],
      ["bWeight", _struct.default.Uint8],
      ["bProportion", _struct.default.Uint8],
      ["bContrast", _struct.default.Uint8],
      ["bStrokeVariation", _struct.default.Uint8],
      ["bArmStyle", _struct.default.Uint8],
      ["bLetterform", _struct.default.Uint8],
      ["bMidline", _struct.default.Uint8],
      ["bXHeight", _struct.default.Uint8],
      // unicode range
      ["ulUnicodeRange1", _struct.default.Uint32],
      ["ulUnicodeRange2", _struct.default.Uint32],
      ["ulUnicodeRange3", _struct.default.Uint32],
      ["ulUnicodeRange4", _struct.default.Uint32],
      // char 4
      ["achVendID", _struct.default.String, 4],
      ["fsSelection", _struct.default.Uint16],
      ["usFirstCharIndex", _struct.default.Uint16],
      ["usLastCharIndex", _struct.default.Uint16],
      ["sTypoAscender", _struct.default.Int16],
      ["sTypoDescender", _struct.default.Int16],
      ["sTypoLineGap", _struct.default.Int16],
      ["usWinAscent", _struct.default.Uint16],
      ["usWinDescent", _struct.default.Uint16],
      // version 0 above 39
      ["ulCodePageRange1", _struct.default.Uint32],
      ["ulCodePageRange2", _struct.default.Uint32],
      // version 1 above 41
      ["sxHeight", _struct.default.Int16],
      ["sCapHeight", _struct.default.Int16],
      ["usDefaultChar", _struct.default.Uint16],
      ["usBreakChar", _struct.default.Uint16],
      ["usMaxContext", _struct.default.Uint16]
      // version 2,3,4 above 46
    ], {
      /** 优化176: 直接 view 写入 96 字节，绕过 table.js 双重 switch 分发 */
      write: function write(writer, ttf) {
        var o = ttf["OS/2"];
        var pos = writer.offset;
        var view = writer.view;
        view.setUint16(pos, o.version, false);
        pos += 2;
        view.setInt16(pos, o.xAvgCharWidth, false);
        pos += 2;
        view.setUint16(pos, o.usWeightClass, false);
        pos += 2;
        view.setUint16(pos, o.usWidthClass, false);
        pos += 2;
        view.setUint16(pos, o.fsType, false);
        pos += 2;
        view.setUint16(pos, o.ySubscriptXSize, false);
        pos += 2;
        view.setUint16(pos, o.ySubscriptYSize, false);
        pos += 2;
        view.setUint16(pos, o.ySubscriptXOffset, false);
        pos += 2;
        view.setUint16(pos, o.ySubscriptYOffset, false);
        pos += 2;
        view.setUint16(pos, o.ySuperscriptXSize, false);
        pos += 2;
        view.setUint16(pos, o.ySuperscriptYSize, false);
        pos += 2;
        view.setUint16(pos, o.ySuperscriptXOffset, false);
        pos += 2;
        view.setUint16(pos, o.ySuperscriptYOffset, false);
        pos += 2;
        view.setUint16(pos, o.yStrikeoutSize, false);
        pos += 2;
        view.setUint16(pos, o.yStrikeoutPosition, false);
        pos += 2;
        view.setUint16(pos, o.sFamilyClass, false);
        pos += 2;
        view.setUint8(pos, o.bFamilyType);
        pos += 1;
        view.setUint8(pos, o.bSerifStyle);
        pos += 1;
        view.setUint8(pos, o.bWeight);
        pos += 1;
        view.setUint8(pos, o.bProportion);
        pos += 1;
        view.setUint8(pos, o.bContrast);
        pos += 1;
        view.setUint8(pos, o.bStrokeVariation);
        pos += 1;
        view.setUint8(pos, o.bArmStyle);
        pos += 1;
        view.setUint8(pos, o.bLetterform);
        pos += 1;
        view.setUint8(pos, o.bMidline);
        pos += 1;
        view.setUint8(pos, o.bXHeight);
        pos += 1;
        view.setUint32(pos, o.ulUnicodeRange1 || 0, false);
        pos += 4;
        view.setUint32(pos, o.ulUnicodeRange2 || 0, false);
        pos += 4;
        view.setUint32(pos, o.ulUnicodeRange3 || 0, false);
        pos += 4;
        view.setUint32(pos, o.ulUnicodeRange4 || 0, false);
        pos += 4;
        var vendor = (o.achVendID || "    ").slice(0, 4);
        view.setUint8(pos, vendor.charCodeAt(0));
        pos += 1;
        view.setUint8(pos, vendor.charCodeAt(1));
        pos += 1;
        view.setUint8(pos, vendor.charCodeAt(2));
        pos += 1;
        view.setUint8(pos, vendor.charCodeAt(3));
        pos += 1;
        view.setUint16(pos, o.fsSelection, false);
        pos += 2;
        view.setUint16(pos, o.usFirstCharIndex, false);
        pos += 2;
        view.setUint16(pos, o.usLastCharIndex, false);
        pos += 2;
        view.setInt16(pos, o.sTypoAscender, false);
        pos += 2;
        view.setInt16(pos, o.sTypoDescender, false);
        pos += 2;
        view.setInt16(pos, o.sTypoLineGap, false);
        pos += 2;
        view.setUint16(pos, o.usWinAscent, false);
        pos += 2;
        view.setUint16(pos, o.usWinDescent, false);
        pos += 2;
        view.setUint32(pos, o.ulCodePageRange1 || 0, false);
        pos += 4;
        view.setUint32(pos, o.ulCodePageRange2 || 0, false);
        pos += 4;
        view.setInt16(pos, o.sxHeight || 0, false);
        pos += 2;
        view.setInt16(pos, o.sCapHeight || 0, false);
        pos += 2;
        view.setUint16(pos, o.usDefaultChar || 0, false);
        pos += 2;
        view.setUint16(pos, o.usBreakChar != null ? o.usBreakChar : 32, false);
        pos += 2;
        view.setUint16(pos, o.usMaxContext || 0, false);
        pos += 2;
        writer.offset = pos;
        return writer;
      },
      read: function read(reader, ttf) {
        var view = reader.view;
        var p = view.byteOffset + this.offset;
        var tbl = {};
        tbl.version = view.getUint16(p, false);
        p += 2;
        tbl.xAvgCharWidth = view.getInt16(p, false);
        p += 2;
        tbl.usWeightClass = view.getUint16(p, false);
        p += 2;
        tbl.usWidthClass = view.getUint16(p, false);
        p += 2;
        tbl.fsType = view.getUint16(p, false);
        p += 2;
        tbl.ySubscriptXSize = view.getUint16(p, false);
        p += 2;
        tbl.ySubscriptYSize = view.getUint16(p, false);
        p += 2;
        tbl.ySubscriptXOffset = view.getUint16(p, false);
        p += 2;
        tbl.ySubscriptYOffset = view.getUint16(p, false);
        p += 2;
        tbl.ySuperscriptXSize = view.getUint16(p, false);
        p += 2;
        tbl.ySuperscriptYSize = view.getUint16(p, false);
        p += 2;
        tbl.ySuperscriptXOffset = view.getUint16(p, false);
        p += 2;
        tbl.ySuperscriptYOffset = view.getUint16(p, false);
        p += 2;
        tbl.yStrikeoutSize = view.getUint16(p, false);
        p += 2;
        tbl.yStrikeoutPosition = view.getUint16(p, false);
        p += 2;
        tbl.sFamilyClass = view.getUint16(p, false);
        p += 2;
        tbl.bFamilyType = view.getUint8(p);
        p += 1;
        tbl.bSerifStyle = view.getUint8(p);
        p += 1;
        tbl.bWeight = view.getUint8(p);
        p += 1;
        tbl.bProportion = view.getUint8(p);
        p += 1;
        tbl.bContrast = view.getUint8(p);
        p += 1;
        tbl.bStrokeVariation = view.getUint8(p);
        p += 1;
        tbl.bArmStyle = view.getUint8(p);
        p += 1;
        tbl.bLetterform = view.getUint8(p);
        p += 1;
        tbl.bMidline = view.getUint8(p);
        p += 1;
        tbl.bXHeight = view.getUint8(p);
        p += 1;
        tbl.ulUnicodeRange1 = view.getUint32(p, false);
        p += 4;
        tbl.ulUnicodeRange2 = view.getUint32(p, false);
        p += 4;
        tbl.ulUnicodeRange3 = view.getUint32(p, false);
        p += 4;
        tbl.ulUnicodeRange4 = view.getUint32(p, false);
        p += 4;
        tbl.achVendID = String.fromCharCode(view.getUint8(p), view.getUint8(p + 1), view.getUint8(p + 2), view.getUint8(p + 3));
        p += 4;
        tbl.fsSelection = view.getUint16(p, false);
        p += 2;
        tbl.usFirstCharIndex = view.getUint16(p, false);
        p += 2;
        tbl.usLastCharIndex = view.getUint16(p, false);
        p += 2;
        tbl.sTypoAscender = view.getInt16(p, false);
        p += 2;
        tbl.sTypoDescender = view.getInt16(p, false);
        p += 2;
        tbl.sTypoLineGap = view.getInt16(p, false);
        p += 2;
        tbl.usWinAscent = view.getUint16(p, false);
        p += 2;
        tbl.usWinDescent = view.getUint16(p, false);
        p += 2;
        if (tbl.version >= 1) {
          tbl.ulCodePageRange1 = view.getUint32(p, false);
          p += 4;
          tbl.ulCodePageRange2 = view.getUint32(p, false);
          p += 4;
        }
        if (tbl.version >= 2) {
          tbl.sxHeight = view.getInt16(p, false);
          p += 2;
          tbl.sCapHeight = view.getInt16(p, false);
          p += 2;
          tbl.usDefaultChar = view.getUint16(p, false);
          p += 2;
          tbl.usBreakChar = view.getUint16(p, false);
          p += 2;
          tbl.usMaxContext = view.getUint16(p, false);
          p += 2;
        }
        if (tbl.ulCodePageRange1 === void 0) tbl.ulCodePageRange1 = 1;
        if (tbl.ulCodePageRange2 === void 0) tbl.ulCodePageRange2 = 0;
        if (tbl.sxHeight === void 0) tbl.sxHeight = 0;
        if (tbl.sCapHeight === void 0) tbl.sCapHeight = 0;
        if (tbl.usDefaultChar === void 0) tbl.usDefaultChar = 0;
        if (tbl.usBreakChar === void 0) tbl.usBreakChar = 32;
        if (tbl.usMaxContext === void 0) tbl.usMaxContext = 0;
        reader.offset = p - view.byteOffset;
        return tbl;
      },
      size: function size(ttf) {
        var os2 = ttf["OS/2"];
        var hhea = ttf.hhea;
        var head = ttf.head;
        var maxp = ttf.maxp || (ttf.maxp = {});
        var metrics = ttf._metrics;
        var hinting = ttf.writeOptions ? ttf.writeOptions.hinting : false;
        if (metrics) {
          os2.version = 4;
          os2.achVendID = (os2.achVendID + "    ").slice(0, 4);
          os2.xAvgCharWidth = metrics.xAvgCharWidth;
          os2.ulUnicodeRange2 = 268435456;
          os2.usFirstCharIndex = metrics.usFirstCharIndex;
          os2.usLastCharIndex = metrics.usLastCharIndex;
          hhea.version = hhea.version || 1;
          hhea.advanceWidthMax = metrics.advanceWidthMax;
          hhea.minLeftSideBearing = metrics.minLeftSideBearing;
          hhea.minRightSideBearing = metrics.minRightSideBearing;
          hhea.xMaxExtent = metrics.xMaxExtent;
          head.version = head.version || 1;
          head.lowestRecPPEM = head.lowestRecPPEM || 8;
          head.xMin = metrics.xMin;
          head.yMin = metrics.yMin;
          head.xMax = metrics.xMax;
          head.yMax = metrics.yMax;
          if (ttf.support.head) {
            var _ttf$support$head = ttf.support.head;
            if (_ttf$support$head.xMin != null) head.xMin = _ttf$support$head.xMin;
            if (_ttf$support$head.yMin != null) head.yMin = _ttf$support$head.yMin;
            if (_ttf$support$head.xMax != null) head.xMax = _ttf$support$head.xMax;
            if (_ttf$support$head.yMax != null) head.yMax = _ttf$support$head.yMax;
          }
          if (ttf.support.hhea) {
            var _ttf$support$hhea = ttf.support.hhea;
            if (_ttf$support$hhea.advanceWidthMax != null) hhea.advanceWidthMax = _ttf$support$hhea.advanceWidthMax;
            if (_ttf$support$hhea.xMaxExtent != null) hhea.xMaxExtent = _ttf$support$hhea.xMaxExtent;
            if (_ttf$support$hhea.minLeftSideBearing != null) hhea.minLeftSideBearing = _ttf$support$hhea.minLeftSideBearing;
            if (_ttf$support$hhea.minRightSideBearing != null) hhea.minRightSideBearing = _ttf$support$hhea.minRightSideBearing;
          }
          ttf.support.maxp = {
            version: 1,
            numGlyphs: ttf.glyf.length,
            maxPoints: metrics.maxPoints,
            maxContours: metrics.maxContours,
            maxCompositePoints: 0,
            maxCompositeContours: 0,
            maxZones: maxp.maxZones || 0,
            maxTwilightPoints: maxp.maxTwilightPoints || 0,
            maxStorage: maxp.maxStorage || 0,
            maxFunctionDefs: maxp.maxFunctionDefs || 0,
            maxStackElements: maxp.maxStackElements || 0,
            maxSizeOfInstructions: 0,
            maxComponentElements: 0,
            maxComponentDepth: 0
          };
          ttf._metrics = null;
          return 96;
        }
        var xMin = 16384, yMin = 16384, xMax = -16384, yMax = -16384;
        var advanceWidthMax = -1;
        var minLeftSideBearing = 16384;
        var minRightSideBearing = 16384;
        var xMaxExtent = -16384;
        var xAvgCharWidth = 0;
        var usFirstCharIndex = 1114111;
        var usLastCharIndex = -1;
        var maxPoints = 0, maxContours = 0;
        var maxCompositePoints = 0, maxCompositeContours = 0;
        var maxSizeOfInstructions = 0;
        var maxComponentElements = 0;
        var glyfNotEmpty = 0;
        if (hinting) {
          var cvtLen = ttf.cvt ? ttf.cvt.length : 0;
          if (cvtLen > maxSizeOfInstructions) maxSizeOfInstructions = cvtLen;
          var prepLen = ttf.prep ? ttf.prep.length : 0;
          if (prepLen > maxSizeOfInstructions) maxSizeOfInstructions = prepLen;
          var fpgmLen = ttf.fpgm ? ttf.fpgm.length : 0;
          if (fpgmLen > maxSizeOfInstructions) maxSizeOfInstructions = fpgmLen;
        }
        var glyfs = ttf.glyf;
        for (var gi = 0, gl = glyfs.length; gi < gl; gi++) {
          var glyf = glyfs[gi];
          if (glyf.compound) {
            var compositeContours = 0;
            var compositePoints = 0;
            var subGlyfs = glyf.glyfs;
            for (var sg = 0, sgl = subGlyfs.length; sg < sgl; sg++) {
              var sgRef = subGlyfs[sg];
              var cglyf = glyfs[sgRef.glyphIndex];
              if (!cglyf) continue;
              if (cglyf._numContours != null) {
                compositeContours += cglyf._numContours;
                compositePoints += cglyf._totalPoints;
              } else {
                var cContours = cglyf.contours;
                if (cContours) {
                  compositeContours += cContours.length;
                  if (cContours.length) {
                    var cIsFlat = cglyf._flatContours;
                    for (var cc = 0, ccl = cContours.length; cc < ccl; cc++) {
                      compositePoints += cIsFlat ? cContours[cc].length / 3 : cContours[cc].length;
                    }
                  }
                }
              }
            }
            if (subGlyfs.length > maxComponentElements) maxComponentElements = subGlyfs.length;
            if (compositePoints > maxCompositePoints) maxCompositePoints = compositePoints;
            if (compositeContours > maxCompositeContours) maxCompositeContours = compositeContours;
          } else if (glyf._numContours != null && glyf._numContours > 0) {
            if (glyf._numContours > maxContours) maxContours = glyf._numContours;
            if (glyf._totalPoints > maxPoints) maxPoints = glyf._totalPoints;
          } else if (glyf.contours && glyf.contours.length) {
            var gContours = glyf.contours;
            if (gContours.length > maxContours) maxContours = gContours.length;
            var points = 0;
            var isFlat = glyf._flatContours;
            for (var ci = 0, cil = gContours.length; ci < cil; ci++) {
              points += isFlat ? gContours[ci].length / 3 | 0 : gContours[ci].length;
            }
            if (points > maxPoints) maxPoints = points;
          }
          if (hinting && glyf.instructions) {
            if (glyf.instructions.length > maxSizeOfInstructions) maxSizeOfInstructions = glyf.instructions.length;
          }
          var gXMin = glyf.xMin;
          var gYMin = glyf.yMin;
          var gXMax = glyf.xMax;
          var gYMax = glyf.yMax;
          if (null != gXMin && gXMin < xMin) xMin = gXMin;
          if (null != gYMin && gYMin < yMin) yMin = gYMin;
          if (null != gXMax && gXMax > xMax) xMax = gXMax;
          if (null != gYMax && gYMax > yMax) yMax = gYMax;
          if (glyf.advanceWidth > advanceWidthMax) advanceWidthMax = glyf.advanceWidth;
          if (glyf.leftSideBearing < minLeftSideBearing) minLeftSideBearing = glyf.leftSideBearing;
          if (null != gXMax) {
            var rsb = glyf.advanceWidth - gXMax;
            if (rsb < minRightSideBearing) minRightSideBearing = rsb;
            if (gXMax > xMaxExtent) xMaxExtent = gXMax;
          }
          if (null != glyf.advanceWidth) {
            xAvgCharWidth += glyf.advanceWidth;
            glyfNotEmpty++;
          }
          var unicodes = glyf.unicode;
          if (typeof unicodes === "number") unicodes = [unicodes];
          if (Array.isArray(unicodes)) {
            for (var ui = 0, ul = unicodes.length; ui < ul; ui++) {
              if (unicodes[ui] !== 65535) {
                if (unicodes[ui] < usFirstCharIndex) usFirstCharIndex = unicodes[ui];
                if (unicodes[ui] > usLastCharIndex) usLastCharIndex = unicodes[ui];
              }
            }
          }
        }
        os2.version = 4;
        os2.achVendID = (os2.achVendID + "    ").slice(0, 4);
        os2.xAvgCharWidth = xAvgCharWidth / (glyfNotEmpty || 1);
        os2.ulUnicodeRange2 = 268435456;
        os2.usFirstCharIndex = usFirstCharIndex;
        os2.usLastCharIndex = usLastCharIndex;
        hhea.version = hhea.version || 1;
        hhea.advanceWidthMax = advanceWidthMax;
        hhea.minLeftSideBearing = minLeftSideBearing;
        hhea.minRightSideBearing = minRightSideBearing;
        hhea.xMaxExtent = xMaxExtent;
        head.version = head.version || 1;
        head.lowestRecPPEM = head.lowestRecPPEM || 8;
        head.xMin = xMin;
        head.yMin = yMin;
        head.xMax = xMax;
        head.yMax = yMax;
        if (ttf.support.head) {
          var _ttf$support$head = ttf.support.head;
          if (_ttf$support$head.xMin != null) head.xMin = _ttf$support$head.xMin;
          if (_ttf$support$head.yMin != null) head.yMin = _ttf$support$head.yMin;
          if (_ttf$support$head.xMax != null) head.xMax = _ttf$support$head.xMax;
          if (_ttf$support$head.yMax != null) head.yMax = _ttf$support$head.yMax;
        }
        if (ttf.support.hhea) {
          var _ttf$support$hhea = ttf.support.hhea;
          if (_ttf$support$hhea.advanceWidthMax != null) hhea.advanceWidthMax = _ttf$support$hhea.advanceWidthMax;
          if (_ttf$support$hhea.xMaxExtent != null) hhea.xMaxExtent = _ttf$support$hhea.xMaxExtent;
          if (_ttf$support$hhea.minLeftSideBearing != null) hhea.minLeftSideBearing = _ttf$support$hhea.minLeftSideBearing;
          if (_ttf$support$hhea.minRightSideBearing != null) hhea.minRightSideBearing = _ttf$support$hhea.minRightSideBearing;
        }
        ttf.support.maxp = {
          version: 1,
          numGlyphs: ttf.glyf.length,
          maxPoints,
          maxContours,
          maxCompositePoints,
          maxCompositeContours,
          maxZones: maxp.maxZones || 0,
          maxTwilightPoints: maxp.maxTwilightPoints || 0,
          maxStorage: maxp.maxStorage || 0,
          maxFunctionDefs: maxp.maxFunctionDefs || 0,
          maxStackElements: maxp.maxStackElements || 0,
          maxSizeOfInstructions,
          maxComponentElements,
          maxComponentDepth: maxComponentElements ? 1 : 0
        };
        return 96;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/cff/encoding.js
var require_encoding2 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cff/encoding.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var cffStandardEncoding = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quoteright", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "quoteleft", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "exclamdown", "cent", "sterling", "fraction", "yen", "florin", "section", "currency", "quotesingle", "quotedblleft", "guillemotleft", "guilsinglleft", "guilsinglright", "fi", "fl", "", "endash", "dagger", "daggerdbl", "periodcentered", "", "paragraph", "bullet", "quotesinglbase", "quotedblbase", "quotedblright", "guillemotright", "ellipsis", "perthousand", "", "questiondown", "", "grave", "acute", "circumflex", "tilde", "macron", "breve", "dotaccent", "dieresis", "", "ring", "cedilla", "", "hungarumlaut", "ogonek", "caron", "emdash", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "AE", "", "ordfeminine", "", "", "", "", "Lslash", "Oslash", "OE", "ordmasculine", "", "", "", "", "", "ae", "", "", "", "dotlessi", "", "", "lslash", "oslash", "oe", "germandbls"];
    var cffExpertEncoding = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "space", "exclamsmall", "Hungarumlautsmall", "", "dollaroldstyle", "dollarsuperior", "ampersandsmall", "Acutesmall", "parenleftsuperior", "parenrightsuperior", "twodotenleader", "onedotenleader", "comma", "hyphen", "period", "fraction", "zerooldstyle", "oneoldstyle", "twooldstyle", "threeoldstyle", "fouroldstyle", "fiveoldstyle", "sixoldstyle", "sevenoldstyle", "eightoldstyle", "nineoldstyle", "colon", "semicolon", "commasuperior", "threequartersemdash", "periodsuperior", "questionsmall", "", "asuperior", "bsuperior", "centsuperior", "dsuperior", "esuperior", "", "", "isuperior", "", "", "lsuperior", "msuperior", "nsuperior", "osuperior", "", "", "rsuperior", "ssuperior", "tsuperior", "", "ff", "fi", "fl", "ffi", "ffl", "parenleftinferior", "", "parenrightinferior", "Circumflexsmall", "hyphensuperior", "Gravesmall", "Asmall", "Bsmall", "Csmall", "Dsmall", "Esmall", "Fsmall", "Gsmall", "Hsmall", "Ismall", "Jsmall", "Ksmall", "Lsmall", "Msmall", "Nsmall", "Osmall", "Psmall", "Qsmall", "Rsmall", "Ssmall", "Tsmall", "Usmall", "Vsmall", "Wsmall", "Xsmall", "Ysmall", "Zsmall", "colonmonetary", "onefitted", "rupiah", "Tildesmall", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "exclamdownsmall", "centoldstyle", "Lslashsmall", "", "", "Scaronsmall", "Zcaronsmall", "Dieresissmall", "Brevesmall", "Caronsmall", "", "Dotaccentsmall", "", "", "Macronsmall", "", "", "figuredash", "hypheninferior", "", "", "Ogoneksmall", "Ringsmall", "Cedillasmall", "", "", "", "onequarter", "onehalf", "threequarters", "questiondownsmall", "oneeighth", "threeeighths", "fiveeighths", "seveneighths", "onethird", "twothirds", "", "", "zerosuperior", "onesuperior", "twosuperior", "threesuperior", "foursuperior", "fivesuperior", "sixsuperior", "sevensuperior", "eightsuperior", "ninesuperior", "zeroinferior", "oneinferior", "twoinferior", "threeinferior", "fourinferior", "fiveinferior", "sixinferior", "seveninferior", "eightinferior", "nineinferior", "centinferior", "dollarinferior", "periodinferior", "commainferior", "Agravesmall", "Aacutesmall", "Acircumflexsmall", "Atildesmall", "Adieresissmall", "Aringsmall", "AEsmall", "Ccedillasmall", "Egravesmall", "Eacutesmall", "Ecircumflexsmall", "Edieresissmall", "Igravesmall", "Iacutesmall", "Icircumflexsmall", "Idieresissmall", "Ethsmall", "Ntildesmall", "Ogravesmall", "Oacutesmall", "Ocircumflexsmall", "Otildesmall", "Odieresissmall", "OEsmall", "Oslashsmall", "Ugravesmall", "Uacutesmall", "Ucircumflexsmall", "Udieresissmall", "Yacutesmall", "Thornsmall", "Ydieresissmall"];
    var _default = exports2.default = {
      standardEncoding: cffStandardEncoding,
      expertEncoding: cffExpertEncoding
    };
  }
});

// vendor/fonteditor-core/lib/ttf/table/cff/cffStandardStrings.js
var require_cffStandardStrings = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cff/cffStandardStrings.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var cffStandardStrings = [".notdef", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quoteright", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "quoteleft", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "exclamdown", "cent", "sterling", "fraction", "yen", "florin", "section", "currency", "quotesingle", "quotedblleft", "guillemotleft", "guilsinglleft", "guilsinglright", "fi", "fl", "endash", "dagger", "daggerdbl", "periodcentered", "paragraph", "bullet", "quotesinglbase", "quotedblbase", "quotedblright", "guillemotright", "ellipsis", "perthousand", "questiondown", "grave", "acute", "circumflex", "tilde", "macron", "breve", "dotaccent", "dieresis", "ring", "cedilla", "hungarumlaut", "ogonek", "caron", "emdash", "AE", "ordfeminine", "Lslash", "Oslash", "OE", "ordmasculine", "ae", "dotlessi", "lslash", "oslash", "oe", "germandbls", "onesuperior", "logicalnot", "mu", "trademark", "Eth", "onehalf", "plusminus", "Thorn", "onequarter", "divide", "brokenbar", "degree", "thorn", "threequarters", "twosuperior", "registered", "minus", "eth", "multiply", "threesuperior", "copyright", "Aacute", "Acircumflex", "Adieresis", "Agrave", "Aring", "Atilde", "Ccedilla", "Eacute", "Ecircumflex", "Edieresis", "Egrave", "Iacute", "Icircumflex", "Idieresis", "Igrave", "Ntilde", "Oacute", "Ocircumflex", "Odieresis", "Ograve", "Otilde", "Scaron", "Uacute", "Ucircumflex", "Udieresis", "Ugrave", "Yacute", "Ydieresis", "Zcaron", "aacute", "acircumflex", "adieresis", "agrave", "aring", "atilde", "ccedilla", "eacute", "ecircumflex", "edieresis", "egrave", "iacute", "icircumflex", "idieresis", "igrave", "ntilde", "oacute", "ocircumflex", "odieresis", "ograve", "otilde", "scaron", "uacute", "ucircumflex", "udieresis", "ugrave", "yacute", "ydieresis", "zcaron", "exclamsmall", "Hungarumlautsmall", "dollaroldstyle", "dollarsuperior", "ampersandsmall", "Acutesmall", "parenleftsuperior", "parenrightsuperior", "266 ff", "onedotenleader", "zerooldstyle", "oneoldstyle", "twooldstyle", "threeoldstyle", "fouroldstyle", "fiveoldstyle", "sixoldstyle", "sevenoldstyle", "eightoldstyle", "nineoldstyle", "commasuperior", "threequartersemdash", "periodsuperior", "questionsmall", "asuperior", "bsuperior", "centsuperior", "dsuperior", "esuperior", "isuperior", "lsuperior", "msuperior", "nsuperior", "osuperior", "rsuperior", "ssuperior", "tsuperior", "ff", "ffi", "ffl", "parenleftinferior", "parenrightinferior", "Circumflexsmall", "hyphensuperior", "Gravesmall", "Asmall", "Bsmall", "Csmall", "Dsmall", "Esmall", "Fsmall", "Gsmall", "Hsmall", "Ismall", "Jsmall", "Ksmall", "Lsmall", "Msmall", "Nsmall", "Osmall", "Psmall", "Qsmall", "Rsmall", "Ssmall", "Tsmall", "Usmall", "Vsmall", "Wsmall", "Xsmall", "Ysmall", "Zsmall", "colonmonetary", "onefitted", "rupiah", "Tildesmall", "exclamdownsmall", "centoldstyle", "Lslashsmall", "Scaronsmall", "Zcaronsmall", "Dieresissmall", "Brevesmall", "Caronsmall", "Dotaccentsmall", "Macronsmall", "figuredash", "hypheninferior", "Ogoneksmall", "Ringsmall", "Cedillasmall", "questiondownsmall", "oneeighth", "threeeighths", "fiveeighths", "seveneighths", "onethird", "twothirds", "zerosuperior", "foursuperior", "fivesuperior", "sixsuperior", "sevensuperior", "eightsuperior", "ninesuperior", "zeroinferior", "oneinferior", "twoinferior", "threeinferior", "fourinferior", "fiveinferior", "sixinferior", "seveninferior", "eightinferior", "nineinferior", "centinferior", "dollarinferior", "periodinferior", "commainferior", "Agravesmall", "Aacutesmall", "Acircumflexsmall", "Atildesmall", "Adieresissmall", "Aringsmall", "AEsmall", "Ccedillasmall", "Egravesmall", "Eacutesmall", "Ecircumflexsmall", "Edieresissmall", "Igravesmall", "Iacutesmall", "Icircumflexsmall", "Idieresissmall", "Ethsmall", "Ntildesmall", "Ogravesmall", "Oacutesmall", "Ocircumflexsmall", "Otildesmall", "Odieresissmall", "OEsmall", "Oslashsmall", "Ugravesmall", "Uacutesmall", "Ucircumflexsmall", "Udieresissmall", "Yacutesmall", "Thornsmall", "Ydieresissmall", "001.000", "001.001", "001.002", "001.003", "Black", "Bold", "Book", "Light", "Medium", "Regular", "Roman", "Semibold"];
    var _default = exports2.default = cffStandardStrings;
  }
});

// vendor/fonteditor-core/lib/ttf/table/cff/getCFFString.js
var require_getCFFString = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cff/getCFFString.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = getCFFString;
    var _cffStandardStrings = _interopRequireDefault(require_cffStandardStrings());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getCFFString(strings, index) {
      if (index <= 390) {
        index = _cffStandardStrings.default[index];
      } else {
        index = strings[index - 391];
      }
      return index;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/cff/parseCFFDict.js
var require_parseCFFDict = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cff/parseCFFDict.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _getCFFString = _interopRequireDefault(require_getCFFString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TOP_DICT_META = [{
      name: "version",
      op: 0,
      type: "SID"
    }, {
      name: "notice",
      op: 1,
      type: "SID"
    }, {
      name: "copyright",
      op: 1200,
      type: "SID"
    }, {
      name: "fullName",
      op: 2,
      type: "SID"
    }, {
      name: "familyName",
      op: 3,
      type: "SID"
    }, {
      name: "weight",
      op: 4,
      type: "SID"
    }, {
      name: "isFixedPitch",
      op: 1201,
      type: "number",
      value: 0
    }, {
      name: "italicAngle",
      op: 1202,
      type: "number",
      value: 0
    }, {
      name: "underlinePosition",
      op: 1203,
      type: "number",
      value: -100
    }, {
      name: "underlineThickness",
      op: 1204,
      type: "number",
      value: 50
    }, {
      name: "paintType",
      op: 1205,
      type: "number",
      value: 0
    }, {
      name: "charstringType",
      op: 1206,
      type: "number",
      value: 2
    }, {
      name: "fontMatrix",
      op: 1207,
      type: ["real", "real", "real", "real", "real", "real"],
      value: [1e-3, 0, 0, 1e-3, 0, 0]
    }, {
      name: "uniqueId",
      op: 13,
      type: "number"
    }, {
      name: "fontBBox",
      op: 5,
      type: ["number", "number", "number", "number"],
      value: [0, 0, 0, 0]
    }, {
      name: "strokeWidth",
      op: 1208,
      type: "number",
      value: 0
    }, {
      name: "xuid",
      op: 14,
      type: [],
      value: null
    }, {
      name: "charset",
      op: 15,
      type: "offset",
      value: 0
    }, {
      name: "encoding",
      op: 16,
      type: "offset",
      value: 0
    }, {
      name: "charStrings",
      op: 17,
      type: "offset",
      value: 0
    }, {
      name: "private",
      op: 18,
      type: ["number", "offset"],
      value: [0, 0]
    }];
    var PRIVATE_DICT_META = [{
      name: "subrs",
      op: 19,
      type: "offset",
      value: 0
    }, {
      name: "defaultWidthX",
      op: 20,
      type: "number",
      value: 0
    }, {
      name: "nominalWidthX",
      op: 21,
      type: "number",
      value: 0
    }];
    function entriesToObject(entries) {
      var hash = {};
      for (var i = 0, l = entries.length; i < l; i++) {
        var key = entries[i][0];
        if (void 0 !== hash[key]) {
          continue;
        }
        var values = entries[i][1];
        hash[key] = values.length === 1 ? values[0] : values;
      }
      return hash;
    }
    var FLOAT_LOOKUP = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "E", "E-", null, "-"];
    function parseFloatOperand(reader) {
      var s = "";
      var eof = 15;
      while (true) {
        var b = reader.readUint8();
        var n1 = b >> 4;
        var n2 = b & 15;
        if (n1 === eof) {
          break;
        }
        s += FLOAT_LOOKUP[n1];
        if (n2 === eof) {
          break;
        }
        s += FLOAT_LOOKUP[n2];
      }
      return parseFloat(s);
    }
    function parseOperand(reader, b0) {
      var b1;
      var b2;
      var b3;
      var b4;
      if (b0 === 28) {
        b1 = reader.readUint8();
        b2 = reader.readUint8();
        return b1 << 8 | b2;
      }
      if (b0 === 29) {
        b1 = reader.readUint8();
        b2 = reader.readUint8();
        b3 = reader.readUint8();
        b4 = reader.readUint8();
        return b1 << 24 | b2 << 16 | b3 << 8 | b4;
      }
      if (b0 === 30) {
        return parseFloatOperand(reader);
      }
      if (b0 >= 32 && b0 <= 246) {
        return b0 - 139;
      }
      if (b0 >= 247 && b0 <= 250) {
        b1 = reader.readUint8();
        return (b0 - 247) * 256 + b1 + 108;
      }
      if (b0 >= 251 && b0 <= 254) {
        b1 = reader.readUint8();
        return -(b0 - 251) * 256 - b1 - 108;
      }
      throw new Error("invalid b0 " + b0 + ",at:" + reader.offset);
    }
    function interpretDict(dict, meta, strings) {
      var newDict = {};
      for (var i = 0, l = meta.length; i < l; i++) {
        var m = meta[i];
        var value = dict[m.op];
        if (value === void 0) {
          value = m.value !== void 0 ? m.value : null;
        }
        if (m.type === "SID") {
          value = (0, _getCFFString.default)(strings, value);
        }
        newDict[m.name] = value;
      }
      return newDict;
    }
    function parseCFFDict(reader, offset, length) {
      if (null != offset) {
        reader.seek(offset);
      }
      var entries = [];
      var operands = [];
      var lastOffset = reader.offset + (null != length ? length : reader.length);
      while (reader.offset < lastOffset) {
        var op = reader.readUint8();
        if (op <= 21) {
          if (op === 12) {
            op = 1200 + reader.readUint8();
          }
          entries.push([op, operands]);
          operands = [];
        } else {
          operands.push(parseOperand(reader, op));
        }
      }
      return entriesToObject(entries);
    }
    function parseTopDict(reader, start, length, strings) {
      var dict = parseCFFDict(reader, start || 0, length || reader.length);
      var topDict = interpretDict(dict, TOP_DICT_META, strings);
      topDict._raw = dict;
      return topDict;
    }
    function parsePrivateDict(reader, start, length, strings) {
      var dict = parseCFFDict(reader, start || 0, length || reader.length);
      return interpretDict(dict, PRIVATE_DICT_META, strings);
    }
    var _default = exports2.default = {
      parseTopDict,
      parsePrivateDict,
      parseCFFDict,
      _parseOperand: parseOperand
    };
  }
});

// vendor/fonteditor-core/lib/ttf/table/cff/parseCFFGlyph.js
var require_parseCFFGlyph = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cff/parseCFFGlyph.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = parseCFFCharstring;
    var ON_CURVE = 1;
    function parseCFFCharstring(code, font, index) {
      var contours = [];
      var contour = [];
      var stack = new Array(48);
      var glyfs = [];
      var nStems = 0;
      var haveWidth = false;
      var width = font.defaultWidthX;
      var subrs = font.subrs;
      var subrsBias = font.subrsBias;
      var resolveSubr = font._resolveSubr;
      var gsubrs = font.gsubrs;
      var gsubrsBias = font.gsubrsBias;
      var nominalWidthX = font.nominalWidthX;
      var open = false;
      var x = 0;
      var y = 0;
      var contourCap = 256;
      var contourBuf = new Array(contourCap);
      var ci = 0;
      function closeContour() {
        if (ci >= 6 && contourBuf[0] === contourBuf[ci - 3] && contourBuf[1] === contourBuf[ci - 2]) {
          ci -= 3;
        }
        var arr = contourBuf.slice(0, ci);
        contours.push(arr);
      }
      function startContour(px, py) {
        if (open) closeContour();
        ci = 0;
        contourBuf[ci++] = px;
        contourBuf[ci++] = py;
        contourBuf[ci++] = ON_CURVE;
        open = true;
      }
      function pushContour(x2, y2, flag) {
        if (ci >= contourCap) {
          contourCap = contourCap << 1;
          var newBuf = new Array(contourCap);
          for (var k = 0; k < ci; k++) newBuf[k] = contourBuf[k];
          contourBuf = newBuf;
        }
        contourBuf[ci++] = x2;
        contourBuf[ci++] = y2;
        contourBuf[ci++] = flag;
      }
      function parse(code2) {
        var b1;
        var b2;
        var b3;
        var b4;
        var codeIndex;
        var subrCode;
        var jpx;
        var jpy;
        var c1x;
        var c1y;
        var c2x;
        var c2y;
        var c3x;
        var c3y;
        var c4x;
        var c4y;
        var i = 0;
        var sp = 0;
        var si = 0;
        while (i < code2.length) {
          var v = code2[i];
          i += 1;
          switch (v) {
            case 1:
            // hstem
            case 3:
            // vstem
            case 18:
            // hstemhm
            case 23:
              {
                var sLen = sp - si;
                if (sLen & 1 && !haveWidth) {
                  width = stack[si++] + nominalWidthX;
                  sLen--;
                }
                nStems += sLen >> 1;
                sp = si = 0;
                haveWidth = true;
              }
              break;
            case 4:
              if (sp - si > 1 && !haveWidth) {
                width = stack[si++] + nominalWidthX;
                haveWidth = true;
              }
              y += stack[--sp];
              si = sp;
              startContour(x, y);
              break;
            case 5:
              var sLen = sp - si;
              while (sLen > 0) {
                x += stack[si++];
                y += stack[si++];
                pushContour(x, y, ON_CURVE);
                sLen -= 2;
              }
              sp = si = 0;
              break;
            case 6:
              sLen = sp - si;
              while (sLen > 0) {
                x += stack[si++];
                pushContour(x, y, ON_CURVE);
                sLen--;
                if (sLen === 0) break;
                y += stack[si++];
                pushContour(x, y, ON_CURVE);
                sLen--;
              }
              sp = si = 0;
              break;
            case 7:
              sLen = sp - si;
              while (sLen > 0) {
                y += stack[si++];
                pushContour(x, y, ON_CURVE);
                sLen--;
                if (sLen === 0) break;
                x += stack[si++];
                pushContour(x, y, ON_CURVE);
                sLen--;
              }
              sp = si = 0;
              break;
            case 8:
              sLen = sp - si;
              while (sLen > 0) {
                c1x = x + stack[si++];
                c1y = y + stack[si++];
                c2x = c1x + stack[si++];
                c2y = c1y + stack[si++];
                x = c2x + stack[si++];
                y = c2y + stack[si++];
                pushContour(c1x, c1y, 0);
                pushContour(c2x, c2y, 0);
                pushContour(x, y, ON_CURVE);
                sLen -= 6;
              }
              sp = si = 0;
              break;
            case 10:
              codeIndex = stack[--sp] + subrsBias;
              subrCode = resolveSubr ? resolveSubr(codeIndex) : subrs[codeIndex];
              if (subrCode) {
                parse(subrCode);
              }
              si = sp;
              break;
            case 11:
              return;
            case 12:
              v = code2[i];
              i += 1;
              switch (v) {
                case 35:
                  c1x = x + stack[si++];
                  c1y = y + stack[si++];
                  c2x = c1x + stack[si++];
                  c2y = c1y + stack[si++];
                  jpx = c2x + stack[si++];
                  jpy = c2y + stack[si++];
                  c3x = jpx + stack[si++];
                  c3y = jpy + stack[si++];
                  c4x = c3x + stack[si++];
                  c4y = c3y + stack[si++];
                  x = c4x + stack[si++];
                  y = c4y + stack[si++];
                  si++;
                  pushContour(c1x, c1y, 0);
                  pushContour(c2x, c2y, 0);
                  pushContour(jpx, jpy, ON_CURVE);
                  pushContour(c3x, c3y, 0);
                  pushContour(c4x, c4y, 0);
                  pushContour(x, y, ON_CURVE);
                  break;
                case 34:
                  c1x = x + stack[si++];
                  c1y = y;
                  c2x = c1x + stack[si++];
                  c2y = c1y + stack[si++];
                  jpx = c2x + stack[si++];
                  jpy = c2y;
                  c3x = jpx + stack[si++];
                  c3y = c2y;
                  c4x = c3x + stack[si++];
                  c4y = y;
                  x = c4x + stack[si++];
                  pushContour(c1x, c1y, 0);
                  pushContour(c2x, c2y, 0);
                  pushContour(jpx, jpy, ON_CURVE);
                  pushContour(c3x, c3y, 0);
                  pushContour(c4x, c4y, 0);
                  pushContour(x, y, ON_CURVE);
                  break;
                case 36:
                  c1x = x + stack[si++];
                  c1y = y + stack[si++];
                  c2x = c1x + stack[si++];
                  c2y = c1y + stack[si++];
                  jpx = c2x + stack[si++];
                  jpy = c2y;
                  c3x = jpx + stack[si++];
                  c3y = c2y;
                  c4x = c3x + stack[si++];
                  c4y = c3y + stack[si++];
                  x = c4x + stack[si++];
                  pushContour(c1x, c1y, 0);
                  pushContour(c2x, c2y, 0);
                  pushContour(jpx, jpy, ON_CURVE);
                  pushContour(c3x, c3y, 0);
                  pushContour(c4x, c4y, 0);
                  pushContour(x, y, ON_CURVE);
                  break;
                case 37:
                  c1x = x + stack[si++];
                  c1y = y + stack[si++];
                  c2x = c1x + stack[si++];
                  c2y = c1y + stack[si++];
                  jpx = c2x + stack[si++];
                  jpy = c2y + stack[si++];
                  c3x = jpx + stack[si++];
                  c3y = jpy + stack[si++];
                  c4x = c3x + stack[si++];
                  c4y = c3y + stack[si++];
                  if (c4x - x > 0 ? c4x - x > -(c4y - y) : -(c4x - x) < c4y - y) {
                    x = c4x + stack[si++];
                  } else {
                    y = c4y + stack[si++];
                  }
                  pushContour(c1x, c1y, 0);
                  pushContour(c2x, c2y, 0);
                  pushContour(jpx, jpy, ON_CURVE);
                  pushContour(c3x, c3y, 0);
                  pushContour(c4x, c4y, 0);
                  pushContour(x, y, ON_CURVE);
                  break;
                default:
                  console.warn("Glyph " + index + ": unknown operator " + (1200 + v));
              }
              sp = si = 0;
              break;
            case 14:
              if (sp - si === 1 && !haveWidth) {
                width = stack[si++] + nominalWidthX;
                haveWidth = true;
              } else if (sp - si === 4) {
                glyfs[1] = {
                  glyphIndex: font.charset.indexOf(font.encoding[stack[--sp]]),
                  transform: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
                };
                glyfs[0] = {
                  glyphIndex: font.charset.indexOf(font.encoding[stack[--sp]]),
                  transform: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
                };
                glyfs[1].transform.f = stack[--sp];
                glyfs[1].transform.e = stack[--sp];
              } else if (sp - si === 5) {
                if (!haveWidth) {
                  width = stack[si++] + nominalWidthX;
                }
                haveWidth = true;
                glyfs[1] = {
                  glyphIndex: font.charset.indexOf(font.encoding[stack[--sp]]),
                  transform: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
                };
                glyfs[0] = {
                  glyphIndex: font.charset.indexOf(font.encoding[stack[--sp]]),
                  transform: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
                };
                glyfs[1].transform.f = stack[--sp];
                glyfs[1].transform.e = stack[--sp];
              }
              if (open) {
                closeContour();
                open = false;
              }
              sp = si = 0;
              break;
            case 19:
            // hintmask
            case 20:
              {
                var sLen2 = sp - si;
                if (sLen2 & 1 && !haveWidth) {
                  width = stack[si++] + nominalWidthX;
                  sLen2--;
                }
                nStems += sLen2 >> 1;
                sp = si = 0;
                haveWidth = true;
                i += nStems + 7 >> 3;
              }
              break;
            case 21:
              if (sp - si > 2 && !haveWidth) {
                width = stack[si++] + nominalWidthX;
                haveWidth = true;
              }
              y += stack[--sp];
              x += stack[--sp];
              si = sp;
              startContour(x, y);
              break;
            case 22:
              if (sp - si > 1 && !haveWidth) {
                width = stack[si++] + nominalWidthX;
                haveWidth = true;
              }
              x += stack[--sp];
              si = sp;
              startContour(x, y);
              break;
            case 24:
              sLen = sp - si;
              while (sLen > 2) {
                c1x = x + stack[si++];
                c1y = y + stack[si++];
                c2x = c1x + stack[si++];
                c2y = c1y + stack[si++];
                x = c2x + stack[si++];
                y = c2y + stack[si++];
                pushContour(c1x, c1y, 0);
                pushContour(c2x, c2y, 0);
                pushContour(x, y, ON_CURVE);
                sLen -= 6;
              }
              x += stack[si++];
              y += stack[si++];
              pushContour(x, y, ON_CURVE);
              sp = si = 0;
              break;
            case 25:
              var _sLen = sp - si;
              while (_sLen > 6) {
                x += stack[si++];
                y += stack[si++];
                pushContour(x, y, ON_CURVE);
                _sLen -= 2;
              }
              c1x = x + stack[si++];
              c1y = y + stack[si++];
              c2x = c1x + stack[si++];
              c2y = c1y + stack[si++];
              x = c2x + stack[si++];
              y = c2y + stack[si++];
              pushContour(c1x, c1y, 0);
              pushContour(c2x, c2y, 0);
              pushContour(x, y, ON_CURVE);
              sp = si = 0;
              break;
            case 26:
              _sLen = sp - si;
              if (_sLen & 1) {
                x += stack[si++];
                _sLen--;
              }
              while (_sLen > 0) {
                c1x = x;
                c1y = y + stack[si++];
                c2x = c1x + stack[si++];
                c2y = c1y + stack[si++];
                x = c2x;
                y = c2y + stack[si++];
                pushContour(c1x, c1y, 0);
                pushContour(c2x, c2y, 0);
                pushContour(x, y, ON_CURVE);
                _sLen -= 4;
              }
              sp = si = 0;
              break;
            case 27:
              _sLen = sp - si;
              if (_sLen & 1) {
                y += stack[si++];
                _sLen--;
              }
              while (_sLen > 0) {
                c1x = x + stack[si++];
                c1y = y;
                c2x = c1x + stack[si++];
                c2y = c1y + stack[si++];
                x = c2x + stack[si++];
                y = c2y;
                pushContour(c1x, c1y, 0);
                pushContour(c2x, c2y, 0);
                pushContour(x, y, ON_CURVE);
                _sLen -= 4;
              }
              sp = si = 0;
              break;
            case 28:
              b1 = code2[i];
              b2 = code2[i + 1];
              stack[sp++] = (b1 << 24 | b2 << 16) >> 16;
              i += 2;
              break;
            case 29:
              codeIndex = stack[--sp] + gsubrsBias;
              subrCode = gsubrs[codeIndex];
              if (subrCode) {
                parse(subrCode);
              }
              si = sp;
              break;
            case 30:
              {
                var vhLen = sp - si;
                while (vhLen > 0) {
                  c1x = x;
                  c1y = y + stack[si++];
                  c2x = c1x + stack[si++];
                  c2y = c1y + stack[si++];
                  x = c2x + stack[si++];
                  vhLen -= 4;
                  if (vhLen === 1) {
                    y = c2y + stack[si++];
                    vhLen = 0;
                  } else {
                    y = c2y;
                  }
                  pushContour(c1x, c1y, 0);
                  pushContour(c2x, c2y, 0);
                  pushContour(x, y, ON_CURVE);
                  if (vhLen === 0) break;
                  c1x = x + stack[si++];
                  c1y = y;
                  c2x = c1x + stack[si++];
                  c2y = c1y + stack[si++];
                  y = c2y + stack[si++];
                  x = c2x;
                  vhLen -= 4;
                  if (vhLen === 1) {
                    x = c2x + stack[si++];
                    vhLen = 0;
                  }
                  pushContour(c1x, c1y, 0);
                  pushContour(c2x, c2y, 0);
                  pushContour(x, y, ON_CURVE);
                }
                sp = si = 0;
              }
              break;
            case 31:
              {
                var hvLen = sp - si;
                while (hvLen > 0) {
                  c1x = x + stack[si++];
                  c1y = y;
                  c2x = c1x + stack[si++];
                  c2y = c1y + stack[si++];
                  y = c2y + stack[si++];
                  hvLen -= 4;
                  if (hvLen === 1) {
                    x = c2x + stack[si++];
                    hvLen = 0;
                  } else {
                    x = c2x;
                  }
                  pushContour(c1x, c1y, 0);
                  pushContour(c2x, c2y, 0);
                  pushContour(x, y, ON_CURVE);
                  if (hvLen === 0) break;
                  c1x = x;
                  c1y = y + stack[si++];
                  c2x = c1x + stack[si++];
                  c2y = c1y + stack[si++];
                  x = c2x + stack[si++];
                  y = c2y;
                  hvLen -= 4;
                  if (hvLen === 1) {
                    y = c2y + stack[si++];
                    hvLen = 0;
                  }
                  pushContour(c1x, c1y, 0);
                  pushContour(c2x, c2y, 0);
                  pushContour(x, y, ON_CURVE);
                }
                sp = si = 0;
              }
              break;
            default:
              if (v < 32) {
                console.warn("Glyph " + index + ": unknown operator " + v);
              } else if (v < 247) {
                stack[sp++] = v - 139;
              } else if (v < 251) {
                b1 = code2[i];
                i += 1;
                stack[sp++] = (v - 247) * 256 + b1 + 108;
              } else if (v < 255) {
                b1 = code2[i];
                i += 1;
                stack[sp++] = -(v - 251) * 256 - b1 - 108;
              } else {
                b1 = code2[i];
                b2 = code2[i + 1];
                b3 = code2[i + 2];
                b4 = code2[i + 3];
                i += 4;
                stack[sp++] = (b1 << 24 | b2 << 16 | b3 << 8 | b4) / 65536;
              }
          }
        }
      }
      parse(code);
      var glyf = {
        contours,
        advanceWidth: width,
        _flatContours: true
      };
      if (glyfs.length) {
        glyf.compound = true;
        glyf.glyfs = glyfs;
      }
      return glyf;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/cff/parseCFFCharset.js
var require_parseCFFCharset = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cff/parseCFFCharset.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = parseCFFCharset;
    var _cffStandardStrings = _interopRequireDefault(require_cffStandardStrings());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var STD_STRINGS = _cffStandardStrings.default;
    function parseCFFCharset(reader, start, nGlyphs, strings, subsetGids) {
      if (start) {
        reader.seek(start);
      }
      var i;
      var sid;
      var count;
      nGlyphs -= 1;
      var hasSubsetPre = subsetGids && subsetGids.length > 1;
      var charset = hasSubsetPre ? { 0: ".notdef" } : new Array(nGlyphs + 1);
      if (!hasSubsetPre) charset[0] = ".notdef";
      var ci = 1;
      var hasSubset = subsetGids && subsetGids.length > 1;
      var sgp = 1;
      function rangeHasTarget(rangeStart, rangeCount) {
        if (!hasSubset) return true;
        var rangeEnd2 = rangeStart + rangeCount;
        while (sgp < subsetGids.length) {
          var g = subsetGids[sgp];
          if (g > rangeEnd2) return false;
          if (g >= rangeStart) return true;
          sgp++;
        }
        return false;
      }
      var format = reader.readUint8();
      if (format === 0) {
        for (i = 0; i < nGlyphs; i += 1) {
          sid = reader.readUint16();
          if (!hasSubset || sgp < subsetGids.length && subsetGids[sgp] === ci) {
            charset[ci] = sid <= 390 ? STD_STRINGS[sid] : strings[sid - 391];
            if (hasSubset) sgp++;
          }
          ci++;
        }
      } else if (format === 1) {
        while (ci <= nGlyphs) {
          if (hasSubset && sgp >= subsetGids.length) break;
          sid = reader.readUint16();
          count = reader.readUint8();
          if (rangeHasTarget(ci, count)) {
            if (hasSubset) {
              var rangeEnd = ci + count;
              while (sgp < subsetGids.length && subsetGids[sgp] <= rangeEnd) {
                var tg = subsetGids[sgp];
                var tsid = sid + (tg - ci);
                charset[tg] = tsid <= 390 ? STD_STRINGS[tsid] : strings[tsid - 391];
                sgp++;
              }
              ci += count + 1;
            } else {
              for (i = 0; i <= count; i += 1) {
                charset[ci] = sid <= 390 ? STD_STRINGS[sid] : strings[sid - 391];
                ci++;
                sid += 1;
              }
            }
          } else {
            ci += count + 1;
          }
        }
      } else if (format === 2) {
        while (ci <= nGlyphs) {
          if (hasSubset && sgp >= subsetGids.length) break;
          sid = reader.readUint16();
          count = reader.readUint16();
          if (rangeHasTarget(ci, count)) {
            if (hasSubset) {
              var _rangeEnd = ci + count;
              while (sgp < subsetGids.length && subsetGids[sgp] <= _rangeEnd) {
                var _tg = subsetGids[sgp];
                var _tsid = sid + (_tg - ci);
                charset[_tg] = _tsid <= 390 ? STD_STRINGS[_tsid] : strings[_tsid - 391];
                sgp++;
              }
              ci += count + 1;
            } else {
              for (i = 0; i <= count; i += 1) {
                charset[ci] = sid <= 390 ? STD_STRINGS[sid] : strings[sid - 391];
                ci++;
                sid += 1;
              }
            }
          } else {
            ci += count + 1;
          }
        }
      } else {
        throw new Error("Unknown charset format " + format);
      }
      return charset;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/cff/parseCFFEncoding.js
var require_parseCFFEncoding = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cff/parseCFFEncoding.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = parseCFFEncoding;
    function parseCFFEncoding(reader, start) {
      if (null != start) {
        reader.seek(start);
      }
      var i;
      var code;
      var encoding = {};
      var format = reader.readUint8();
      if (format === 0) {
        var nCodes = reader.readUint8();
        for (i = 0; i < nCodes; i += 1) {
          code = reader.readUint8();
          encoding[code] = i;
        }
      } else if (format === 1) {
        var nRanges = reader.readUint8();
        code = 1;
        for (i = 0; i < nRanges; i += 1) {
          var first = reader.readUint8();
          var nLeft = reader.readUint8();
          for (var j = first; j <= first + nLeft; j += 1) {
            encoding[j] = code;
            code += 1;
          }
        }
      } else {
        console.warn("unknown encoding format:" + format);
      }
      return encoding;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/CFF.js
var require_CFF = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/CFF.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    var _string = _interopRequireDefault(require_string());
    var _encoding = _interopRequireDefault(require_encoding2());
    var _cffStandardStrings = _interopRequireDefault(require_cffStandardStrings());
    var _parseCFFDict = _interopRequireDefault(require_parseCFFDict());
    var _parseCFFGlyph = _interopRequireDefault(require_parseCFFGlyph());
    var _parseCFFCharset = _interopRequireDefault(require_parseCFFCharset());
    var _parseCFFEncoding = _interopRequireDefault(require_parseCFFEncoding());
    var _reader = _interopRequireDefault(require_reader());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parseCFFHead(reader) {
      var head = {};
      head.startOffset = reader.offset;
      head.endOffset = head.startOffset + 4;
      head.formatMajor = reader.readUint8();
      head.formatMinor = reader.readUint8();
      head.size = reader.readUint8();
      head.offsetSize = reader.readUint8();
      return head;
    }
    function parseCFFIndex(reader, offset, conversionFn) {
      if (offset) {
        reader.seek(offset);
      }
      var start = reader.offset;
      var count = reader.readUint16();
      var offsets = new Array(count + 1);
      var objects = new Array(count);
      var i;
      var l;
      if (count !== 0) {
        var offsetSize = reader.readUint8();
        if (offsetSize === 1) {
          for (i = 0; i <= count; i++) offsets[i] = reader.readUint8();
        } else if (offsetSize === 2) {
          for (i = 0; i <= count; i++) offsets[i] = reader.readUint16();
        } else if (offsetSize === 3) {
          for (i = 0; i <= count; i++) {
            offsets[i] = reader.readUint8() << 16 | reader.readUint8() << 8 | reader.readUint8();
          }
        } else {
          for (i = 0; i <= count; i++) offsets[i] = reader.readUint32();
        }
        var viewByteOffset = reader.view.byteOffset;
        for (i = 0, l = count; i < l; i++) {
          var objSize = offsets[i + 1] - offsets[i];
          var value = new Uint8Array(reader.view.buffer, viewByteOffset + reader.offset, objSize);
          reader.offset += objSize;
          objects[i] = conversionFn ? conversionFn(value) : value;
        }
      }
      return {
        objects,
        startOffset: start,
        endOffset: reader.offset
      };
    }
    function parseCFFIndexOffsets(reader, offset) {
      if (offset) reader.seek(offset);
      var start = reader.offset;
      var count = reader.readUint16();
      var offsets = null;
      if (count !== 0) {
        var offsetSize = reader.readUint8();
        offsets = new Array(count + 1);
        if (offsetSize === 1) {
          for (var i = 0; i <= count; i++) offsets[i] = reader.readUint8();
        } else if (offsetSize === 2) {
          for (var i = 0; i <= count; i++) offsets[i] = reader.readUint16();
        } else if (offsetSize === 3) {
          for (var i = 0; i <= count; i++) {
            offsets[i] = reader.readUint8() << 16 | reader.readUint8() << 8 | reader.readUint8();
          }
        } else {
          for (var i = 0; i <= count; i++) offsets[i] = reader.readUint32();
        }
      }
      return { offsets, count, dataStart: reader.offset, endOffset: reader.offset };
    }
    function parseCFFIndexOffsetsSubset(reader, offset, neededGids) {
      reader.seek(offset);
      var count = reader.readUint16();
      var offsetSize = reader.readUint8();
      var offsetArrayBase = reader.offset;
      var view = reader.view;
      function readOffAt(pos) {
        var off = offsetArrayBase + pos * offsetSize;
        if (offsetSize === 1) return view.getUint8(off);
        if (offsetSize === 2) return view.getUint16(off, false);
        if (offsetSize === 4) return view.getUint32(off, false);
        return view.getUint8(off) << 16 | view.getUint8(off + 1) << 8 | view.getUint8(off + 2);
      }
      var offsets = {};
      for (var gi = 0; gi < neededGids.length; gi++) {
        var gid = neededGids[gi];
        if (gid < 0 || gid > count) continue;
        if (offsets[gid] === void 0) offsets[gid] = readOffAt(gid);
        if (gid + 1 <= count && offsets[gid + 1] === void 0) offsets[gid + 1] = readOffAt(gid + 1);
      }
      var lastOffset = readOffAt(count);
      var dataStart = offsetArrayBase + (count + 1) * offsetSize;
      reader.offset = dataStart;
      return {
        offsets,
        count,
        dataStart,
        /** 标记子集模式并提供按需读取所需信息 */
        _subsetMode: true,
        _offsetArrayBase: offsetArrayBase,
        _offsetSize: offsetSize,
        _totalSize: lastOffset - 1
      };
    }
    function parseCFFIndexOffsetsLazy(reader, offset) {
      reader.seek(offset);
      var count = reader.readUint16();
      var offsetSize = reader.readUint8();
      var offsetArrayBase = reader.offset;
      var view = reader.view;
      var lastOffPos = offsetArrayBase + count * offsetSize;
      var lastOffset;
      if (offsetSize === 1) lastOffset = view.getUint8(lastOffPos);
      else if (offsetSize === 2) lastOffset = view.getUint16(lastOffPos, false);
      else if (offsetSize === 4) lastOffset = view.getUint32(lastOffPos, false);
      else lastOffset = view.getUint8(lastOffPos) << 16 | view.getUint8(lastOffPos + 1) << 8 | view.getUint8(lastOffPos + 2);
      var dataStart = offsetArrayBase + (count + 1) * offsetSize;
      reader.offset = dataStart;
      return {
        /** 优化308: 用普通对象替代 new Array(count+1)，避免大 subrs 表（26550）的数组分配 */
        offsets: {},
        count,
        dataStart,
        _subsetMode: true,
        _offsetArrayBase: offsetArrayBase,
        _offsetSize: offsetSize,
        _totalSize: lastOffset - 1
      };
    }
    function readCFFIndexObject(reader, indexInfo, idx) {
      var off = indexInfo.offsets;
      var view = indexInfo._view;
      if (off && (off[idx] === void 0 || off[idx + 1] === void 0)) {
        var base = indexInfo._offsetArrayBase;
        var os = indexInfo._offsetSize;
        var dv = reader.view;
        var o1 = base + idx * os;
        var o2 = base + (idx + 1) * os;
        if (os === 1) {
          off[idx] = dv.getUint8(o1);
          off[idx + 1] = dv.getUint8(o2);
        } else if (os === 2) {
          off[idx] = dv.getUint16(o1, false);
          off[idx + 1] = dv.getUint16(o2, false);
        } else if (os === 4) {
          off[idx] = dv.getUint32(o1, false);
          off[idx + 1] = dv.getUint32(o2, false);
        } else {
          off[idx] = dv.getUint8(o1) << 16 | dv.getUint8(o1 + 1) << 8 | dv.getUint8(o1 + 2);
          off[idx + 1] = dv.getUint8(o2) << 16 | dv.getUint8(o2 + 1) << 8 | dv.getUint8(o2 + 2);
        }
      }
      if (view) {
        return view.subarray(off[idx] - 1, off[idx + 1] - 1);
      }
      var size = off[idx + 1] - off[idx];
      var start = indexInfo.dataStart + off[idx] - 1;
      return new Uint8Array(reader.view.buffer, reader.view.byteOffset + start, size);
    }
    function prepareCFFIndexView(reader, indexInfo) {
      var off = indexInfo.offsets;
      var totalSize = indexInfo._subsetMode ? indexInfo._totalSize : off && off.length >= 2 ? off[off.length - 1] - 1 : 0;
      if (totalSize <= 0) return;
      var baseOffset = reader.view.byteOffset + indexInfo.dataStart;
      indexInfo._view = new Uint8Array(reader.view.buffer, baseOffset, totalSize);
    }
    function calcCFFSubroutineBias(subrs) {
      var bias;
      if (subrs.length < 1240) {
        bias = 107;
      } else if (subrs.length < 33900) {
        bias = 1131;
      } else {
        bias = 32768;
      }
      return bias;
    }
    function parseFDSelect(reader, offset) {
      reader.seek(offset);
      var format = reader.readUint8();
      if (format === 0) {
        var count = reader.readUint16();
        var dataStart = reader.view.byteOffset + reader.offset;
        var flatData = new Uint8Array(reader.view.buffer, dataStart, count);
        reader.offset += count;
        return { format: 0, ranges: null, flatData };
      }
      var nRanges = reader.readUint16();
      var ranges = new Uint8Array(nRanges * 3);
      for (var r = 0; r < nRanges; r++) {
        var idx = r * 3;
        var first = reader.readUint16();
        ranges[idx] = first & 255;
        ranges[idx + 1] = first >> 8 & 255;
        ranges[idx + 2] = reader.readUint8();
      }
      return { format: 3, ranges, flatData: null };
    }
    function lookupFD(fdSelect, glyphIndex) {
      if (fdSelect.format === 0) {
        return fdSelect.flatData[glyphIndex] || 0;
      }
      var ranges = fdSelect.ranges;
      var numRanges = ranges.length / 3;
      var lo = 0;
      var hi = numRanges - 1;
      while (lo <= hi) {
        var mid = lo + hi >> 1;
        var idx = mid * 3;
        var first = ranges[idx] | ranges[idx + 1] << 8;
        if (glyphIndex < first) {
          hi = mid - 1;
        } else {
          if (mid === numRanges - 1 || glyphIndex < (ranges[idx + 3] | ranges[idx + 4] << 8)) {
            return ranges[idx + 2];
          }
          lo = mid + 1;
        }
      }
      return 0;
    }
    function parseFDPrivate(reader, cffOffset, fdDictData, strings) {
      var dictReader = new _reader.default(new Uint8Array(fdDictData).buffer);
      var fdDict = _parseCFFDict.default.parseCFFDict(dictReader, 0, dictReader.length);
      var result = { subrs: [], subrsBias: 0, defaultWidthX: 0, nominalWidthX: 0 };
      var privateData = fdDict[18];
      if (privateData && privateData.length >= 2) {
        var privLength = privateData[0];
        var privOffset = cffOffset + privateData[1];
        if (privLength > 0) {
          var privDict = _parseCFFDict.default.parsePrivateDict(reader, privOffset, privLength, strings);
          result.defaultWidthX = privDict.defaultWidthX || 0;
          result.nominalWidthX = privDict.nominalWidthX || 0;
          if (privDict.subrs != null && privDict.subrs > 0) {
            var subrIndexInfo = parseCFFIndexOffsetsLazy(reader, privOffset + privDict.subrs);
            prepareCFFIndexView(reader, subrIndexInfo);
            var subrCount = subrIndexInfo.count;
            var lazySubrs = {};
            result.subrs = lazySubrs;
            result.subrsBias = calcCFFSubroutineBias({ length: subrCount });
            result._resolveSubr = function(idx) {
              var s = lazySubrs[idx];
              if (s === void 0) {
                s = readCFFIndexObject(reader, subrIndexInfo, idx);
                lazySubrs[idx] = s;
              }
              return s;
            };
          }
        }
      }
      return result;
    }
    var _default = exports2.default = _table.default.create("cff", [], {
      read: function read(reader, font) {
        var offset = this.offset;
        reader.seek(offset);
        var head = parseCFFHead(reader);
        var nameIndex = parseCFFIndex(reader, head.endOffset, _string.default.getString);
        var topDictIndex = parseCFFIndex(reader, nameIndex.endOffset);
        var stringIndex = parseCFFIndex(reader, topDictIndex.endOffset, _string.default.getString);
        var globalSubrIndex = parseCFFIndex(reader, stringIndex.endOffset);
        var cff = {
          head
        };
        cff.gsubrs = globalSubrIndex.objects;
        cff.gsubrsBias = calcCFFSubroutineBias(globalSubrIndex.objects);
        var topDictData = topDictIndex.objects[0];
        var dictReader = new _reader.default(new Uint8Array(topDictData).buffer);
        var topDict = _parseCFFDict.default.parseTopDict(dictReader, 0, dictReader.length, stringIndex.objects);
        cff.topDict = topDict;
        var rawTopDict = topDict._raw;
        var fdArrayOffset = rawTopDict[1236];
        var fdSelectOffset = rawTopDict[1237];
        var isCID = !!(fdArrayOffset && fdSelectOffset);
        var subset = font.readOptions.subset;
        var subsetGids = null;
        if (subset && subset.length > 0) {
          var _codes = font.cmap;
          var _subsetMap = { 0: true };
          var _subsetGids = [0];
          for (var sci = 0, scl = subset.length; sci < scl; sci++) {
            var sGid = _codes[subset[sci]];
            if (sGid !== void 0 && !_subsetMap[sGid]) {
              _subsetMap[sGid] = true;
              _subsetGids.push(sGid);
            }
          }
          subsetGids = _subsetGids.length > 1 ? _subsetGids.sort(function(a, b) {
            return a - b;
          }) : null;
        }
        var fdSelect = null;
        var fdPrivates = null;
        if (isCID) {
          var charStringsInfo = subsetGids ? parseCFFIndexOffsetsSubset(reader, offset + topDict.charStrings, subsetGids) : parseCFFIndexOffsets(reader, offset + topDict.charStrings);
          var nGlyphs = charStringsInfo.count;
          fdSelect = parseFDSelect(reader, offset + fdSelectOffset);
          var fdArrayIndex = parseCFFIndex(reader, offset + fdArrayOffset);
          fdPrivates = new Array(fdArrayIndex.objects.length);
          if (subsetGids) {
            var neededFds = {};
            neededFds[0] = true;
            for (var fgi = 1; fgi < subsetGids.length; fgi++) {
              neededFds[lookupFD(fdSelect, subsetGids[fgi])] = true;
            }
            for (var fi = 0; fi < fdArrayIndex.objects.length; fi++) {
              if (neededFds[fi]) {
                fdPrivates[fi] = parseFDPrivate(reader, offset, fdArrayIndex.objects[fi], stringIndex.objects);
              }
            }
          } else {
            for (var fi = 0; fi < fdArrayIndex.objects.length; fi++) {
              fdPrivates.push(parseFDPrivate(reader, offset, fdArrayIndex.objects[fi], stringIndex.objects));
            }
          }
        }
        var privateDictLength = topDict.private[0];
        var privateDict = {};
        var privateDictOffset;
        if (privateDictLength) {
          privateDictOffset = offset + topDict.private[1];
          privateDict = _parseCFFDict.default.parsePrivateDict(reader, privateDictOffset, privateDictLength, stringIndex.objects);
          cff.defaultWidthX = privateDict.defaultWidthX;
          cff.nominalWidthX = privateDict.nominalWidthX;
        } else {
          cff.defaultWidthX = 0;
          cff.nominalWidthX = 0;
        }
        if (privateDict.subrs != null && privateDict.subrs > 0) {
          var subrOffset = privateDictOffset + privateDict.subrs;
          var subrIndexInfo = parseCFFIndexOffsetsLazy(reader, subrOffset);
          prepareCFFIndexView(reader, subrIndexInfo);
          var nonCidSubrCount = subrIndexInfo.count;
          var nonCidLazySubrs = {};
          cff.subrs = nonCidLazySubrs;
          cff.subrsBias = calcCFFSubroutineBias({ length: nonCidSubrCount });
          cff._resolveSubr = function(idx) {
            var s = nonCidLazySubrs[idx];
            if (s === void 0) {
              s = readCFFIndexObject(reader, subrIndexInfo, idx);
              nonCidLazySubrs[idx] = s;
            }
            return s;
          };
        } else {
          cff.subrs = [];
          cff.subrsBias = 0;
        }
        cff.privateDict = privateDict;
        if (!isCID) {
          var charStringsInfo = subsetGids ? parseCFFIndexOffsetsSubset(reader, offset + topDict.charStrings, subsetGids) : parseCFFIndexOffsets(reader, offset + topDict.charStrings);
        }
        prepareCFFIndexView(reader, charStringsInfo);
        var nGlyphs = charStringsInfo.count;
        if (topDict.charset < 3) {
          cff.charset = _cffStandardStrings.default;
        } else {
          cff.charset = (0, _parseCFFCharset.default)(reader, offset + topDict.charset, nGlyphs, stringIndex.objects, subsetGids);
        }
        if (topDict.encoding === 0) {
          cff.encoding = _encoding.default.standardEncoding;
        } else if (topDict.encoding === 1) {
          cff.encoding = _encoding.default.expertEncoding;
        } else {
          cff.encoding = (0, _parseCFFEncoding.default)(reader, offset + topDict.encoding);
        }
        cff.glyf = new Array(nGlyphs);
        var fdGlyphFonts = null;
        if (isCID && fdSelect && fdPrivates) {
          fdGlyphFonts = new Array(fdPrivates.length);
          for (var fi = 0; fi < fdPrivates.length; fi++) {
            var fd = fdPrivates[fi];
            if (!fd) continue;
            fdGlyphFonts[fi] = {
              subrs: fd.subrs,
              subrsBias: fd.subrsBias,
              /** 优化296: 透传惰性 subrs 解码器 */
              _resolveSubr: fd._resolveSubr,
              defaultWidthX: fd.defaultWidthX,
              nominalWidthX: fd.nominalWidthX,
              gsubrs: cff.gsubrs,
              gsubrsBias: cff.gsubrsBias
            };
          }
        }
        function getGlyphFont(glyphIndex) {
          if (fdGlyphFonts) {
            var fdIdx = lookupFD(fdSelect, glyphIndex);
            var gfont = fdGlyphFonts[fdIdx];
            if (!gfont && fdArrayIndex) {
              var fdData = fdArrayIndex.objects[fdIdx];
              if (fdData) {
                var lazyFd = parseFDPrivate(reader, offset, fdData, stringIndex.objects);
                fdPrivates[fdIdx] = lazyFd;
                gfont = {
                  subrs: lazyFd.subrs,
                  subrsBias: lazyFd.subrsBias,
                  _resolveSubr: lazyFd._resolveSubr,
                  defaultWidthX: lazyFd.defaultWidthX,
                  nominalWidthX: lazyFd.nominalWidthX,
                  gsubrs: cff.gsubrs,
                  gsubrsBias: cff.gsubrsBias
                };
                fdGlyphFonts[fdIdx] = gfont;
              }
            }
            return gfont || cff;
          }
          return cff;
        }
        var subset = font.readOptions.subset;
        if (subset && subset.length > 0) {
          var finalSubsetGids = subsetGids || [0];
          var subsetMap = { 0: true };
          for (var smi = 1; smi < finalSubsetGids.length; smi++) {
            subsetMap[finalSubsetGids[smi]] = true;
          }
          font.subsetMap = subsetMap;
          if (fdGlyphFonts) {
            for (var si = 0, sl = finalSubsetGids.length; si < sl; si++) {
              var i = finalSubsetGids[si];
              var charstring = readCFFIndexObject(reader, charStringsInfo, i);
              var glyf = (0, _parseCFFGlyph.default)(charstring, getGlyphFont(i), i);
              glyf.name = cff.charset[i];
              cff.glyf[i] = glyf;
            }
          } else {
            for (var si = 0, sl = finalSubsetGids.length; si < sl; si++) {
              var i = finalSubsetGids[si];
              var charstring = readCFFIndexObject(reader, charStringsInfo, i);
              var glyf = (0, _parseCFFGlyph.default)(charstring, cff, i);
              glyf.name = cff.charset[i];
              cff.glyf[i] = glyf;
            }
          }
          font.subsetGids = finalSubsetGids;
        } else {
          var charset = cff.charset;
          var glyfArr = cff.glyf;
          if (fdGlyphFonts) {
            for (var i = 0, l = nGlyphs; i < l; i++) {
              var charstring = readCFFIndexObject(reader, charStringsInfo, i);
              var glyf = (0, _parseCFFGlyph.default)(charstring, getGlyphFont(i), i);
              glyf.name = charset[i];
              glyfArr[i] = glyf;
            }
          } else {
            for (var i = 0, l = nGlyphs; i < l; i++) {
              var charstring = readCFFIndexObject(reader, charStringsInfo, i);
              var glyf = (0, _parseCFFGlyph.default)(charstring, cff, i);
              glyf.name = charset[i];
              glyfArr[i] = glyf;
            }
          }
        }
        return cff;
      },
      // eslint-disable-next-line no-unused-vars
      write: function write(writer, font) {
        throw new Error("not support write cff table");
      },
      // eslint-disable-next-line no-unused-vars
      size: function size(font) {
        throw new Error("not support get cff table size");
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/GPOS.js
var require_GPOS = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/GPOS.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("GPOS", [], {
      read: function read(reader, ttf) {
        var length = ttf.tables.GPOS.length;
        return new Uint8Array(reader.view.buffer, reader.view.byteOffset + this.offset, length);
      },
      write: function write(writer, ttf) {
        if (ttf.GPOS) {
          writer.writeBytes(ttf.GPOS, ttf.GPOS.length);
        }
      },
      size: function size(ttf) {
        return ttf.GPOS ? ttf.GPOS.length : 0;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/kern.js
var require_kern = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/kern.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("kern", [], {
      read: function read(reader, ttf) {
        var length = ttf.tables.kern.length;
        return reader.readBytes(this.offset, length);
      },
      write: function write(writer, ttf) {
        if (ttf.kern) {
          writer.writeBytes(ttf.kern, ttf.kern.length);
        }
      },
      size: function size(ttf) {
        return ttf.kern ? ttf.kern.length : 0;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/support-otf.js
var require_support_otf = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/support-otf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _head = _interopRequireDefault(require_head());
    var _maxp = _interopRequireDefault(require_maxp());
    var _cmap = _interopRequireDefault(require_cmap());
    var _name = _interopRequireDefault(require_name());
    var _hhea = _interopRequireDefault(require_hhea());
    var _hmtx = _interopRequireDefault(require_hmtx());
    var _post = _interopRequireDefault(require_post());
    var _OS = _interopRequireDefault(require_OS2());
    var _CFF = _interopRequireDefault(require_CFF());
    var _GPOS = _interopRequireDefault(require_GPOS());
    var _kern = _interopRequireDefault(require_kern());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = {
      head: _head.default,
      maxp: _maxp.default,
      cmap: _cmap.default,
      name: _name.default,
      hhea: _hhea.default,
      hmtx: _hmtx.default,
      post: _post.default,
      "OS/2": _OS.default,
      CFF: _CFF.default,
      GPOS: _GPOS.default,
      kern: _kern.default
    };
  }
});

// vendor/fonteditor-core/lib/ttf/otfreader.js
var require_otfreader = __commonJS({
  "vendor/fonteditor-core/lib/ttf/otfreader.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _directory = _interopRequireDefault(require_directory());
    var _supportOtf = _interopRequireDefault(require_support_otf());
    var _reader = _interopRequireDefault(require_reader());
    var _error = _interopRequireDefault(require_error());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var OTFReader = exports2.default = /* @__PURE__ */ function() {
      function OTFReader2() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _classCallCheck(this, OTFReader2);
        options.subset = options.subset || [];
        this.options = options;
      }
      return _createClass(OTFReader2, [{
        key: "readBuffer",
        value: function readBuffer(buffer) {
          var reader = new _reader.default(buffer, 0, buffer.byteLength, false);
          var font = {};
          font.version = reader.readString(0, 4);
          if (font.version !== "OTTO") {
            _error.default.raise(10301);
          }
          font.numTables = reader.readUint16();
          if (font.numTables <= 0 || font.numTables > 100) {
            _error.default.raise(10302);
          }
          font.searchRange = reader.readUint16();
          font.entrySelector = reader.readUint16();
          font.rangeShift = reader.readUint16();
          font.tables = new _directory.default(reader.offset).read(reader, font);
          if (!font.tables.head || !font.tables.cmap || !font.tables.CFF) {
            _error.default.raise(10302);
          }
          font.readOptions = this.options;
          var otfTableNames = ["head", "maxp", "cmap", "name", "hhea", "hmtx", "post", "OS/2", "CFF", "GPOS", "kern"];
          var otfSupport = _supportOtf.default;
          for (var ti = 0, tl = otfTableNames.length; ti < tl; ti++) {
            var tableName = otfTableNames[ti];
            if (font.tables[tableName]) {
              var offset = font.tables[tableName].offset;
              font[tableName] = new otfSupport[tableName](offset).read(reader, font);
            }
          }
          if (!font.CFF.glyf) {
            _error.default.raise(10303);
          }
          reader.dispose();
          return font;
        }
        /**
         * 关联glyf相关的信息
         *
         * @param {Object} font font对象
         */
      }, {
        key: "resolveGlyf",
        value: function resolveGlyf(font) {
          var codes = font.cmap;
          var glyf = font.CFF.glyf;
          var subsetMap = font.readOptions.subset ? font.subsetMap : null;
          if (subsetMap && font.readOptions.subset && font.readOptions.subset.length > 0) {
            var subsetList = font.readOptions.subset;
            for (var si = 0, sl = subsetList.length; si < sl; si++) {
              var cp = subsetList[si];
              var gid = codes[cp];
              if (gid === void 0) continue;
              if (!subsetMap[gid]) continue;
              if (!glyf[gid].unicode) glyf[gid].unicode = [];
              glyf[gid].unicode.push(cp);
            }
          } else {
            var cmapKeys = Object.keys(codes);
            if (subsetMap) {
              for (var ki = 0, kl = cmapKeys.length; ki < kl; ki++) {
                var c = cmapKeys[ki];
                var i = codes[c];
                if (!subsetMap[i]) continue;
                if (!glyf[i].unicode) glyf[i].unicode = [];
                glyf[i].unicode.push(+c);
              }
            } else {
              for (var ki2 = 0, kl2 = cmapKeys.length; ki2 < kl2; ki2++) {
                var c2 = cmapKeys[ki2];
                var i2 = codes[c2];
                if (!glyf[i2].unicode) glyf[i2].unicode = [];
                glyf[i2].unicode.push(+c2);
              }
            }
          }
          var hmtxData = font.hmtx;
          var isFlat = hmtxData instanceof Int32Array;
          var hLen = isFlat ? hmtxData.length / 2 : hmtxData.length;
          if (subsetMap && font.subsetGids) {
            var sGids = font.subsetGids;
            if (isFlat) {
              for (var gi = 0, gl = sGids.length; gi < gl; gi++) {
                var gid2 = sGids[gi];
                glyf[gid2].advanceWidth = hmtxData[gid2 * 2] || 0;
                glyf[gid2].leftSideBearing = hmtxData[gid2 * 2 + 1];
              }
            } else {
              for (var gi2 = 0, gl2 = sGids.length; gi2 < gl2; gi2++) {
                var gid3 = sGids[gi2];
                glyf[gid3].advanceWidth = hmtxData[gid3].advanceWidth || 0;
                glyf[gid3].leftSideBearing = hmtxData[gid3].leftSideBearing;
              }
            }
          } else if (subsetMap) {
            if (isFlat) {
              for (var hi = 0, j = 0; hi < hLen; hi++, j += 2) {
                if (!subsetMap[hi]) continue;
                glyf[hi].advanceWidth = hmtxData[j] || 0;
                glyf[hi].leftSideBearing = hmtxData[j + 1];
              }
            } else {
              for (var hi = 0; hi < hLen; hi++) {
                if (!subsetMap[hi]) continue;
                glyf[hi].advanceWidth = hmtxData[hi].advanceWidth || 0;
                glyf[hi].leftSideBearing = hmtxData[hi].leftSideBearing;
              }
            }
          } else {
            if (isFlat) {
              for (var hi = 0, j = 0; hi < hLen; hi++, j += 2) {
                glyf[hi].advanceWidth = hmtxData[j] || 0;
                glyf[hi].leftSideBearing = hmtxData[j + 1];
              }
            } else {
              for (var hi = 0; hi < hLen; hi++) {
                glyf[hi].advanceWidth = hmtxData[hi].advanceWidth || 0;
                glyf[hi].leftSideBearing = hmtxData[hi].leftSideBearing;
              }
            }
          }
          if (subsetMap) {
            var subsetGids = font.subsetGids;
            var subGlyf;
            if (subsetGids) {
              subGlyf = new Array(subsetGids.length);
              for (var si = 0, sl = subsetGids.length; si < sl; si++) {
                subGlyf[si] = glyf[subsetGids[si]];
              }
            } else {
              subGlyf = [];
              var subsetKeys = Object.keys(subsetMap);
              for (var si = 0, sl = subsetKeys.length; si < sl; si++) {
                subGlyf.push(glyf[+subsetKeys[si]]);
              }
            }
            glyf = subGlyf;
          }
          font.glyf = glyf;
        }
        /**
         * 清除非必须的表
         *
         * @param {Object} font font对象
         */
      }, {
        key: "cleanTables",
        value: function cleanTables(font) {
          font.readOptions = null;
          font.tables = null;
          font.hmtx = null;
          font.post.glyphNameIndex = null;
          font.post.names = null;
          font.subsetMap = null;
          var cff = font.CFF;
          cff.glyf = null;
          cff.charset = null;
          cff.encoding = null;
          cff.gsubrs = null;
          cff.gsubrsBias = null;
          cff.subrs = null;
          cff.subrsBias = null;
        }
        /**
         * 获取解析后的ttf文档
         *
         * @param {ArrayBuffer} buffer buffer对象
         *
         * @return {Object} ttf文档
         */
      }, {
        key: "read",
        value: function read(buffer) {
          this.font = this.readBuffer(buffer);
          this.resolveGlyf(this.font);
          this.cleanTables(this.font);
          return this.font;
        }
        /**
         * 注销
         */
      }, {
        key: "dispose",
        value: function dispose() {
          this.font = null;
          this.options = null;
        }
      }]);
    }();
  }
});

// vendor/fonteditor-core/lib/math/bezierCubic2Q2.js
var require_bezierCubic2Q2 = __commonJS({
  "vendor/fonteditor-core/lib/math/bezierCubic2Q2.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = bezierCubic2Q2;
    exports2.bezierCubic2Q2Raw = bezierCubic2Q2Raw;
    exports2.bezierCubic2Q2Push = bezierCubic2Q2Push;
    exports2.bezierCubic2Q2PushRounded = bezierCubic2Q2PushRounded;
    var MAX_DEPTH = 8;
    var FLAT_THRESHOLD = 0.0625;
    var DEGEN_EPS_SQ = 0.25;
    function cubicToQuads(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, depth, result) {
      if (depth >= MAX_DEPTH) {
        result.push(
          3 * (c1x + c2x) - p1x - p2x >> 2,
          3 * (c1y + c2y) - p1y - p2y >> 2,
          p2x,
          p2y
        );
        return;
      }
      var ux = 3 * c1x - 2 * p1x - p2x;
      var uy = 3 * c1y - 2 * p1y - p2y;
      var vx = 3 * c2x - 2 * p2x - p1x;
      var vy = 3 * c2y - 2 * p2y - p1y;
      var d1 = ux * ux + uy * uy;
      var d2 = vx * vx + vy * vy;
      if (d1 <= FLAT_THRESHOLD && d2 <= FLAT_THRESHOLD) {
        result.push(
          3 * (c1x + c2x) - p1x - p2x >> 2,
          3 * (c1y + c2y) - p1y - p2y >> 2,
          p2x,
          p2y
        );
        return;
      }
      var m01x = (p1x + c1x) * 0.5, m01y = (p1y + c1y) * 0.5;
      var m12x = (c1x + c2x) * 0.5, m12y = (c1y + c2y) * 0.5;
      var m23x = (c2x + p2x) * 0.5, m23y = (c2y + p2y) * 0.5;
      var m012x = (m01x + m12x) * 0.5, m012y = (m01y + m12y) * 0.5;
      var m123x = (m12x + m23x) * 0.5, m123y = (m12y + m23y) * 0.5;
      var midx = (m012x + m123x) * 0.5, midy = (m012y + m123y) * 0.5;
      cubicToQuads(p1x, p1y, m01x, m01y, m012x, m012y, midx, midy, depth + 1, result);
      cubicToQuads(midx, midy, m123x, m123y, m23x, m23y, p2x, p2y, depth + 1, result);
    }
    function bezierCubic2Q2Raw(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
      var dx1 = p1x - c1x, dy1 = p1y - c1y;
      var dx2 = c2x - p2x, dy2 = c2y - p2y;
      if (dx1 * dx1 + dy1 * dy1 + dx2 * dx2 + dy2 * dy2 <= DEGEN_EPS_SQ) {
        return [
          (p1x + p2x) * 0.5,
          (p1y + p2y) * 0.5,
          p2x,
          p2y
        ];
      }
      var result = [];
      cubicToQuads(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, 0, result);
      return result;
    }
    function bezierCubic2Q2Push(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, contour, ci) {
      var dx1 = p1x - c1x, dy1 = p1y - c1y;
      var dx2 = c2x - p2x, dy2 = c2y - p2y;
      if (dx1 * dx1 + dy1 * dy1 + dx2 * dx2 + dy2 * dy2 <= DEGEN_EPS_SQ) {
        contour[ci++] = (p1x + p2x) * 0.5;
        contour[ci++] = (p1y + p2y) * 0.5;
        contour[ci++] = 0;
        contour[ci++] = p2x;
        contour[ci++] = p2y;
        contour[ci++] = 1;
        return ci;
      }
      return cubicToQuadsPush(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, 0, contour, ci);
    }
    function bezierCubic2Q2PushRounded(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, contour, ci, bbox) {
      var dx1 = p1x - c1x, dy1 = p1y - c1y;
      var dx2 = c2x - p2x, dy2 = c2y - p2y;
      if (dx1 * dx1 + dy1 * dy1 + dx2 * dx2 + dy2 * dy2 <= DEGEN_EPS_SQ) {
        var qx = (p1x + p2x) * 0.25 + 0.5 | 0;
        var qy = (p1y + p2y) * 0.25 + 0.5 | 0;
        var ex = p2x + 0.5 | 0;
        var ey = p2y + 0.5 | 0;
        contour[ci++] = qx;
        contour[ci++] = qy;
        contour[ci++] = 0;
        contour[ci++] = ex;
        contour[ci++] = ey;
        contour[ci++] = 1;
        if (bbox) {
          if (qx < bbox[0]) bbox[0] = qx;
          else if (qx > bbox[1]) bbox[1] = qx;
          if (qy < bbox[2]) bbox[2] = qy;
          else if (qy > bbox[3]) bbox[3] = qy;
          if (ex < bbox[0]) bbox[0] = ex;
          else if (ex > bbox[1]) bbox[1] = ex;
          if (ey < bbox[2]) bbox[2] = ey;
          else if (ey > bbox[3]) bbox[3] = ey;
        }
        return ci;
      }
      return cubicToQuadsPushRounded(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, 0, contour, ci, bbox);
    }
    function cubicToQuadsPushRounded(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, depth, contour, ci, bbox) {
      if (depth >= MAX_DEPTH) {
        var qx = (3 * (c1x + c2x) - p1x - p2x) * 0.25;
        var qy = (3 * (c1y + c2y) - p1y - p2y) * 0.25;
        var rx = qx + 0.5 | 0;
        var ry = qy + 0.5 | 0;
        var ex = p2x + 0.5 | 0;
        var ey = p2y + 0.5 | 0;
        contour[ci++] = rx;
        contour[ci++] = ry;
        contour[ci++] = 0;
        contour[ci++] = ex;
        contour[ci++] = ey;
        contour[ci++] = 1;
        if (bbox) {
          if (rx < bbox[0]) bbox[0] = rx;
          else if (rx > bbox[1]) bbox[1] = rx;
          if (ry < bbox[2]) bbox[2] = ry;
          else if (ry > bbox[3]) bbox[3] = ry;
          if (ex < bbox[0]) bbox[0] = ex;
          else if (ex > bbox[1]) bbox[1] = ex;
          if (ey < bbox[2]) bbox[2] = ey;
          else if (ey > bbox[3]) bbox[3] = ey;
        }
        return ci;
      }
      var ux = 3 * c1x - 2 * p1x - p2x;
      var uy = 3 * c1y - 2 * p1y - p2y;
      var vx = 3 * c2x - 2 * p2x - p1x;
      var vy = 3 * c2y - 2 * p2y - p1y;
      var d1 = ux * ux + uy * uy;
      var d2 = vx * vx + vy * vy;
      if (d1 <= FLAT_THRESHOLD && d2 <= FLAT_THRESHOLD) {
        var qx2 = (3 * (c1x + c2x) - p1x - p2x) * 0.25;
        var qy2 = (3 * (c1y + c2y) - p1y - p2y) * 0.25;
        var rx2 = qx2 + 0.5 | 0;
        var ry2 = qy2 + 0.5 | 0;
        var ex2 = p2x + 0.5 | 0;
        var ey2 = p2y + 0.5 | 0;
        contour[ci++] = rx2;
        contour[ci++] = ry2;
        contour[ci++] = 0;
        contour[ci++] = ex2;
        contour[ci++] = ey2;
        contour[ci++] = 1;
        if (bbox) {
          if (rx2 < bbox[0]) bbox[0] = rx2;
          else if (rx2 > bbox[1]) bbox[1] = rx2;
          if (ry2 < bbox[2]) bbox[2] = ry2;
          else if (ry2 > bbox[3]) bbox[3] = ry2;
          if (ex2 < bbox[0]) bbox[0] = ex2;
          else if (ex2 > bbox[1]) bbox[1] = ex2;
          if (ey2 < bbox[2]) bbox[2] = ey2;
          else if (ey2 > bbox[3]) bbox[3] = ey2;
        }
        return ci;
      }
      var m01x = (p1x + c1x) * 0.5, m01y = (p1y + c1y) * 0.5;
      var m12x = (c1x + c2x) * 0.5, m12y = (c1y + c2y) * 0.5;
      var m23x = (c2x + p2x) * 0.5, m23y = (c2y + p2y) * 0.5;
      var m012x = (m01x + m12x) * 0.5, m012y = (m01y + m12y) * 0.5;
      var m123x = (m12x + m23x) * 0.5, m123y = (m12y + m23y) * 0.5;
      var midx = (m012x + m123x) * 0.5, midy = (m012y + m123y) * 0.5;
      ci = cubicToQuadsPushRounded(p1x, p1y, m01x, m01y, m012x, m012y, midx, midy, depth + 1, contour, ci, bbox);
      ci = cubicToQuadsPushRounded(midx, midy, m123x, m123y, m23x, m23y, p2x, p2y, depth + 1, contour, ci, bbox);
      return ci;
    }
    function cubicToQuadsPush(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, depth, contour, ci) {
      if (depth >= MAX_DEPTH) {
        contour[ci++] = 3 * (c1x + c2x) - p1x - p2x >> 2;
        contour[ci++] = 3 * (c1y + c2y) - p1y - p2y >> 2;
        contour[ci++] = 0;
        contour[ci++] = p2x;
        contour[ci++] = p2y;
        contour[ci++] = 1;
        return ci;
      }
      var ux = 3 * c1x - 2 * p1x - p2x;
      var uy = 3 * c1y - 2 * p1y - p2y;
      var vx = 3 * c2x - 2 * p2x - p1x;
      var vy = 3 * c2y - 2 * p2y - p1y;
      var d1 = ux * ux + uy * uy;
      var d2 = vx * vx + vy * vy;
      if (d1 <= FLAT_THRESHOLD && d2 <= FLAT_THRESHOLD) {
        contour[ci++] = 3 * (c1x + c2x) - p1x - p2x >> 2;
        contour[ci++] = 3 * (c1y + c2y) - p1y - p2y >> 2;
        contour[ci++] = 0;
        contour[ci++] = p2x;
        contour[ci++] = p2y;
        contour[ci++] = 1;
        return ci;
      }
      var m01x = (p1x + c1x) * 0.5, m01y = (p1y + c1y) * 0.5;
      var m12x = (c1x + c2x) * 0.5, m12y = (c1y + c2y) * 0.5;
      var m23x = (c2x + p2x) * 0.5, m23y = (c2y + p2y) * 0.5;
      var m012x = (m01x + m12x) * 0.5, m012y = (m01y + m12y) * 0.5;
      var m123x = (m12x + m23x) * 0.5, m123y = (m12y + m23y) * 0.5;
      var midx = (m012x + m123x) * 0.5, midy = (m012y + m123y) * 0.5;
      ci = cubicToQuadsPush(p1x, p1y, m01x, m01y, m012x, m012y, midx, midy, depth + 1, contour, ci);
      ci = cubicToQuadsPush(midx, midy, m123x, m123y, m23x, m23y, p2x, p2y, depth + 1, contour, ci);
      return ci;
    }
    function bezierCubic2Q2(p1, c1, c2, p2) {
      return bezierCubic2Q2Raw(p1.x, p1.y, c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
    }
  }
});

// vendor/fonteditor-core/lib/ttf/util/otfContours2ttfContours.js
var require_otfContours2ttfContours = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/otfContours2ttfContours.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = otfContours2ttfContours;
    exports2.otfContours2ttfContoursInPlace = otfContours2ttfContoursInPlace;
    var _bezierCubic2Q = require_bezierCubic2Q2();
    function normalizeContourFlat(arr) {
      var len = arr.length;
      if (len < 6) return arr;
      var firstOnCurve = !!arr[2];
      var prependX, prependY;
      if (!firstOnCurve) {
        var lastIdx = len - 3;
        var lastOnCurve = !!arr[lastIdx + 2];
        if (lastOnCurve) {
          prependX = arr[lastIdx];
          prependY = arr[lastIdx + 1];
        } else {
          prependX = (arr[0] + arr[lastIdx]) * 0.5;
          prependY = (arr[1] + arr[lastIdx + 1]) * 0.5;
        }
      }
      var hasConsecutiveOff = false;
      if (!firstOnCurve) hasConsecutiveOff = true;
      else {
        for (var j = 0; j < len - 3; j += 3) {
          if (!arr[j + 2] && j + 5 < len && !arr[j + 5]) {
            hasConsecutiveOff = true;
            break;
          }
        }
        if (!hasConsecutiveOff && len >= 6 && !arr[len - 1] && !arr[2]) {
          hasConsecutiveOff = true;
        }
      }
      if (!hasConsecutiveOff && firstOnCurve) return arr;
      var maxLen = len + (len / 3 | 0) * 3 + 6;
      var result = new Array(maxLen);
      var ri = 0;
      if (prependX != null) {
        result[ri++] = prependX;
        result[ri++] = prependY;
        result[ri++] = 1;
      }
      for (var k = 0; k < len; k += 3) {
        result[ri++] = arr[k];
        result[ri++] = arr[k + 1];
        result[ri++] = arr[k + 2];
        if (!arr[k + 2] && k + 5 < len && !arr[k + 5]) {
          result[ri++] = (arr[k] + arr[k + 3]) * 0.5;
          result[ri++] = (arr[k + 1] + arr[k + 4]) * 0.5;
          result[ri++] = 1;
        }
      }
      if (prependX == null && len >= 6 && !arr[len - 1] && !arr[2]) {
        result[ri++] = (arr[len - 3] + arr[0]) * 0.5;
        result[ri++] = (arr[len - 2] + arr[1]) * 0.5;
        result[ri++] = 1;
      }
      result.length = ri;
      return result;
    }
    function transformContourFlat(arr) {
      var normalized = normalizeContourFlat(arr);
      if (normalized.length < 6) return null;
      var estimatedMax = normalized.length * 2 + 6;
      var contour = new Array(estimatedMax);
      var ci = 0;
      var firstX = normalized[0], firstY = normalized[1];
      var rX = Math.round(firstX), rY = Math.round(firstY);
      contour[ci++] = rX;
      contour[ci++] = rY;
      contour[ci++] = 1;
      var xMin = rX, xMax = rX, yMin = rY, yMax = rY;
      var lastX = firstX, lastY = firstY;
      var i = 3;
      var nLen = normalized.length;
      var bboxArr = [xMin, xMax, yMin, yMax];
      while (i < nLen) {
        var isOnCurve = normalized[i + 2];
        if (isOnCurve) {
          var px = normalized[i], py = normalized[i + 1];
          rX = Math.round(px);
          rY = Math.round(py);
          contour[ci++] = rX;
          contour[ci++] = rY;
          contour[ci++] = 1;
          lastX = px;
          lastY = py;
          if (rX < xMin) xMin = rX;
          else if (rX > xMax) xMax = rX;
          if (rY < yMin) yMin = rY;
          else if (rY > yMax) yMax = rY;
          i += 3;
        } else {
          var c1x = normalized[i], c1y = normalized[i + 1];
          var nextIdx = i + 3;
          if (nextIdx < nLen && !normalized[nextIdx + 2]) {
            var c2x = normalized[nextIdx], c2y = normalized[nextIdx + 1];
            var endIdx = nextIdx + 3;
            var endX, endY;
            if (endIdx < nLen) {
              endX = normalized[endIdx];
              endY = normalized[endIdx + 1];
            } else {
              endX = firstX;
              endY = firstY;
            }
            i = endIdx + 3;
            bboxArr[0] = xMin;
            bboxArr[1] = xMax;
            bboxArr[2] = yMin;
            bboxArr[3] = yMax;
            ci = (0, _bezierCubic2Q.bezierCubic2Q2PushRounded)(lastX, lastY, c1x, c1y, c2x, c2y, endX, endY, contour, ci, bboxArr);
            lastX = endX;
            lastY = endY;
            xMin = bboxArr[0];
            xMax = bboxArr[1];
            yMin = bboxArr[2];
            yMax = bboxArr[3];
          } else {
            var endX2, endY2;
            if (nextIdx < nLen && normalized[nextIdx + 2]) {
              endX2 = normalized[nextIdx];
              endY2 = normalized[nextIdx + 1];
            } else {
              endX2 = firstX;
              endY2 = firstY;
            }
            i = nextIdx + 3;
            var rc1x = Math.round(c1x), rc1y = Math.round(c1y);
            rX = Math.round(endX2);
            rY = Math.round(endY2);
            contour[ci++] = rc1x;
            contour[ci++] = rc1y;
            contour[ci++] = 0;
            contour[ci++] = rX;
            contour[ci++] = rY;
            contour[ci++] = 1;
            lastX = endX2;
            lastY = endY2;
            if (rc1x < xMin) xMin = rc1x;
            else if (rc1x > xMax) xMax = rc1x;
            if (rc1y < yMin) yMin = rc1y;
            else if (rc1y > yMax) yMax = rc1y;
            if (rX < xMin) xMin = rX;
            else if (rX > xMax) xMax = rX;
            if (rY < yMin) yMin = rY;
            else if (rY > yMax) yMax = rY;
          }
        }
      }
      contour.length = ci;
      return { contour, xMin, yMin, xMax, yMax };
    }
    function otfContours2ttfContours(otfContours) {
      if (!otfContours || !otfContours.length) {
        return { contours: otfContours };
      }
      var contours = new Array(otfContours.length);
      var cLen = 0;
      var left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
      var isFlat = otfContours[0] && (otfContours[0]._flatContours || typeof otfContours[0][0] === "number" && typeof otfContours[0][1] === "number");
      for (var i = 0, l = otfContours.length; i < l; i++) {
        var otfContour = otfContours[i];
        if (!otfContour || otfContour.length < 6) continue;
        var contour;
        var contourBbox;
        if (isFlat) {
          var result = transformContourFlat(otfContour);
          if (!result) continue;
          contour = result.contour;
          contourBbox = result;
        } else {
          contour = transformContourObj(otfContour);
        }
        if (contour.length < 3) continue;
        contours[cLen++] = contour;
        if (contourBbox) {
          if (contourBbox.xMin < left) left = contourBbox.xMin;
          if (contourBbox.xMax > right) right = contourBbox.xMax;
          if (contourBbox.yMin < top) top = contourBbox.yMin;
          if (contourBbox.yMax > bottom) bottom = contourBbox.yMax;
        } else {
          for (var ci = 0, cl = contour.length; ci < cl; ci++) {
            var p = contour[ci];
            if (p.x < left) left = p.x;
            else if (p.x > right) right = p.x;
            if (p.y < top) top = p.y;
            else if (p.y > bottom) bottom = p.y;
          }
        }
      }
      contours.length = cLen;
      return {
        contours,
        xMin: left,
        yMin: top,
        xMax: right,
        yMax: bottom
      };
    }
    function otfContours2ttfContoursInPlace(otfContours, target) {
      if (!otfContours || !otfContours.length) {
        return;
      }
      var contours = new Array(otfContours.length);
      var cLen = 0;
      var left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
      var isFlat = otfContours[0] && (otfContours[0]._flatContours || typeof otfContours[0][0] === "number" && typeof otfContours[0][1] === "number");
      for (var i = 0, l = otfContours.length; i < l; i++) {
        var otfContour = otfContours[i];
        if (!otfContour || otfContour.length < 6) continue;
        var contour;
        var contourBbox;
        if (isFlat) {
          var result = transformContourFlat(otfContour);
          if (!result) continue;
          contour = result.contour;
          contourBbox = result;
        } else {
          contour = transformContourObj(otfContour);
        }
        if (contour.length < 3) continue;
        contours[cLen++] = contour;
        if (contourBbox) {
          if (contourBbox.xMin < left) left = contourBbox.xMin;
          if (contourBbox.xMax > right) right = contourBbox.xMax;
          if (contourBbox.yMin < top) top = contourBbox.yMin;
          if (contourBbox.yMax > bottom) bottom = contourBbox.yMax;
        } else {
          for (var ci = 0, cl = contour.length; ci < cl; ci++) {
            var p = contour[ci];
            if (p.x < left) left = p.x;
            else if (p.x > right) right = p.x;
            if (p.y < top) top = p.y;
            else if (p.y > bottom) bottom = p.y;
          }
        }
      }
      contours.length = cLen;
      target.contours = contours;
      target._flatContours = true;
      if (left !== Infinity) {
        target.xMin = left;
        target.yMin = top;
        target.xMax = right;
        target.yMax = bottom;
      } else {
        target.xMin = 0;
        target.yMin = 0;
        target.xMax = 0;
        target.yMax = 0;
      }
    }
    function transformContourObj(otfContour) {
      if (otfContour.length < 2) return [];
      var contour = [];
      var p0 = otfContour[0];
      contour.push({ x: p0.x + 0.5 | 0, y: p0.y + 0.5 | 0, onCurve: true });
      var i = 1;
      var nLen = otfContour.length;
      while (i < nLen) {
        var cur = otfContour[i];
        if (cur.onCurve) {
          contour.push({ x: cur.x + 0.5 | 0, y: cur.y + 0.5 | 0, onCurve: true });
          i++;
        } else {
          var c1 = cur;
          var c2 = i + 1 < nLen ? otfContour[i + 1] : null;
          var end;
          if (c2 && !c2.onCurve) {
            end = i + 2 < nLen ? otfContour[i + 2] : otfContour[0];
            i += 3;
          } else if (c2 && c2.onCurve) {
            end = c2;
            i += 2;
          } else {
            end = otfContour[0];
            i++;
          }
          var bezierFlat = (0, _bezierCubic2Q.default)(contour[contour.length - 1], c1, c2 || c1, end);
          for (var bi = 0, bl = bezierFlat.length; bi < bl; bi += 4) {
            contour.push({ x: bezierFlat[bi] + 0.5 | 0, y: bezierFlat[bi + 1] + 0.5 | 0 });
            contour.push({ x: bezierFlat[bi + 2] + 0.5 | 0, y: bezierFlat[bi + 3] + 0.5 | 0, onCurve: true });
          }
        }
      }
      return contour;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/otf2ttfobject.js
var require_otf2ttfobject = __commonJS({
  "vendor/fonteditor-core/lib/ttf/otf2ttfobject.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = otf2ttfobject;
    var _error = _interopRequireDefault(require_error());
    var _otfreader = _interopRequireDefault(require_otfreader());
    var _otfContours2ttfContours = require_otfContours2ttfContours();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function otf2ttfobject(otfBuffer, options) {
      var otfObject;
      if (otfBuffer instanceof ArrayBuffer) {
        var otfReader = new _otfreader.default(options);
        otfObject = otfReader.read(otfBuffer);
        otfReader.dispose();
      } else if (otfBuffer.head && otfBuffer.glyf && otfBuffer.cmap) {
        otfObject = otfBuffer;
      } else {
        _error.default.raise(10111);
      }
      var glyf = otfObject.glyf;
      var convertInPlace = _otfContours2ttfContours.otfContours2ttfContoursInPlace;
      for (var i = 0, l = glyf.length; i < l; i++) {
        convertInPlace(glyf[i].contours, glyf[i]);
      }
      otfObject.version = 1;
      otfObject.maxp.version = 1;
      otfObject.maxp.maxZones = otfObject.maxp.maxTwilightPoints ? 2 : 1;
      otfObject.head.flags = (otfObject.head.flags || 0) & ~(8 | 2048);
      otfObject.head.fontDirectionHint = 2;
      otfObject.CFF = null;
      otfObject.VORG = null;
      return otfObject;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/eot2ttf.js
var require_eot2ttf = __commonJS({
  "vendor/fonteditor-core/lib/ttf/eot2ttf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = eot2ttf;
    var _reader = _interopRequireDefault(require_reader());
    var _writer = _interopRequireDefault(require_writer());
    var _error = _interopRequireDefault(require_error());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function eot2ttf(eotBuffer) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var eotReader = new _reader.default(eotBuffer, 0, eotBuffer.byteLength, true);
      var magicNumber = eotReader.readUint16(34);
      if (magicNumber !== 20556) {
        _error.default.raise(10110);
      }
      var version = eotReader.readUint32(8);
      if (version !== 131073 && version !== 65536 && version !== 131074) {
        _error.default.raise(10110);
      }
      var eotSize = eotBuffer.byteLength || eotBuffer.length;
      var fontSize = eotReader.readUint32(4);
      var fontOffset = 82;
      var familyNameSize = eotReader.readUint16(fontOffset);
      fontOffset += 4 + familyNameSize;
      var styleNameSize = eotReader.readUint16(fontOffset);
      fontOffset += 4 + styleNameSize;
      var versionNameSize = eotReader.readUint16(fontOffset);
      fontOffset += 4 + versionNameSize;
      var fullNameSize = eotReader.readUint16(fontOffset);
      fontOffset += 2 + fullNameSize;
      if (version === 131073 || version === 131074) {
        var rootStringSize = eotReader.readUint16(fontOffset + 2);
        fontOffset += 4 + rootStringSize;
      }
      if (version === 131074) {
        fontOffset += 10;
        var signatureSize = eotReader.readUint16(fontOffset);
        fontOffset += 2 + signatureSize;
        fontOffset += 4;
        var eudcFontSize = eotReader.readUint32(fontOffset);
        fontOffset += 4 + eudcFontSize;
      }
      if (fontOffset + fontSize > eotSize) {
        _error.default.raise(10001);
      }
      if (eotBuffer.slice) {
        return eotBuffer.slice(fontOffset, fontOffset + fontSize);
      }
      var bytes = eotReader.readBytes(fontOffset, fontSize);
      return new _writer.default(new ArrayBuffer(fontSize)).writeBytes(bytes).getBuffer();
    }
  }
});

// node_modules/@xmldom/xmldom/lib/conventions.js
var require_conventions = __commonJS({
  "node_modules/@xmldom/xmldom/lib/conventions.js"(exports2) {
    "use strict";
    function find(list, predicate, ac) {
      if (ac === void 0) {
        ac = Array.prototype;
      }
      if (list && typeof ac.find === "function") {
        return ac.find.call(list, predicate);
      }
      for (var i = 0; i < list.length; i++) {
        if (Object.prototype.hasOwnProperty.call(list, i)) {
          var item = list[i];
          if (predicate.call(void 0, item, i, list)) {
            return item;
          }
        }
      }
    }
    function freeze(object, oc) {
      if (oc === void 0) {
        oc = Object;
      }
      return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
    }
    function assign(target, source) {
      if (target === null || typeof target !== "object") {
        throw new TypeError("target is not an object");
      }
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
      return target;
    }
    var MIME_TYPE = freeze({
      /**
       * `text/html`, the only mime type that triggers treating an XML document as HTML.
       *
       * @see DOMParser.SupportedType.isHTML
       * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/HTML Wikipedia
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
       * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
       */
      HTML: "text/html",
      /**
       * Helper method to check a mime type if it indicates an HTML document
       *
       * @param {string} [value]
       * @returns {boolean}
       *
       * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/HTML Wikipedia
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
       * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
      isHTML: function(value) {
        return value === MIME_TYPE.HTML;
      },
      /**
       * `application/xml`, the standard mime type for XML documents.
       *
       * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
       * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_APPLICATION: "application/xml",
      /**
       * `text/html`, an alias for `application/xml`.
       *
       * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
       * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_TEXT: "text/xml",
      /**
       * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
       * but is parsed as an XML document.
       *
       * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
       * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
       */
      XML_XHTML_APPLICATION: "application/xhtml+xml",
      /**
       * `image/svg+xml`,
       *
       * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
       * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
       * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
       */
      XML_SVG_IMAGE: "image/svg+xml"
    });
    var NAMESPACE = freeze({
      /**
       * The XHTML namespace.
       *
       * @see http://www.w3.org/1999/xhtml
       */
      HTML: "http://www.w3.org/1999/xhtml",
      /**
       * Checks if `uri` equals `NAMESPACE.HTML`.
       *
       * @param {string} [uri]
       *
       * @see NAMESPACE.HTML
       */
      isHTML: function(uri) {
        return uri === NAMESPACE.HTML;
      },
      /**
       * The SVG namespace.
       *
       * @see http://www.w3.org/2000/svg
       */
      SVG: "http://www.w3.org/2000/svg",
      /**
       * The `xml:` namespace.
       *
       * @see http://www.w3.org/XML/1998/namespace
       */
      XML: "http://www.w3.org/XML/1998/namespace",
      /**
       * The `xmlns:` namespace
       *
       * @see https://www.w3.org/2000/xmlns/
       */
      XMLNS: "http://www.w3.org/2000/xmlns/"
    });
    exports2.assign = assign;
    exports2.find = find;
    exports2.freeze = freeze;
    exports2.MIME_TYPE = MIME_TYPE;
    exports2.NAMESPACE = NAMESPACE;
  }
});

// node_modules/@xmldom/xmldom/lib/dom.js
var require_dom = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom.js"(exports2) {
    var conventions = require_conventions();
    var find = conventions.find;
    var NAMESPACE = conventions.NAMESPACE;
    function notEmptyString(input) {
      return input !== "";
    }
    function splitOnASCIIWhitespace(input) {
      return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
    }
    function orderedSetReducer(current, element) {
      if (!current.hasOwnProperty(element)) {
        current[element] = true;
      }
      return current;
    }
    function toOrderedSet(input) {
      if (!input) return [];
      var list = splitOnASCIIWhitespace(input);
      return Object.keys(list.reduce(orderedSetReducer, {}));
    }
    function arrayIncludes(list) {
      return function(element) {
        return list && list.indexOf(element) !== -1;
      };
    }
    function copy(src, dest) {
      for (var p in src) {
        if (Object.prototype.hasOwnProperty.call(src, p)) {
          dest[p] = src[p];
        }
      }
    }
    function _extends(Class, Super) {
      var pt = Class.prototype;
      if (!(pt instanceof Super)) {
        let t2 = function() {
        };
        var t = t2;
        ;
        t2.prototype = Super.prototype;
        t2 = new t2();
        copy(pt, t2);
        Class.prototype = pt = t2;
      }
      if (pt.constructor != Class) {
        if (typeof Class != "function") {
          console.error("unknown Class:" + Class);
        }
        pt.constructor = Class;
      }
    }
    var NodeType = {};
    var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
    var TEXT_NODE = NodeType.TEXT_NODE = 3;
    var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
    var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
    var ExceptionCode = {};
    var ExceptionMessage = {};
    var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
    var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
    var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
    var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
    var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
    var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
    var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
    var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
    var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
    var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
    var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
    var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
    var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
    var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
    var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
    function DOMException(code, message) {
      if (message instanceof Error) {
        var error = message;
      } else {
        error = this;
        Error.call(this, ExceptionMessage[code]);
        this.message = ExceptionMessage[code];
        if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
      }
      error.code = code;
      if (message) this.message = this.message + ": " + message;
      return error;
    }
    DOMException.prototype = Error.prototype;
    copy(ExceptionCode, DOMException);
    function NodeList() {
    }
    NodeList.prototype = {
      /**
       * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
       * @standard level1
       */
      length: 0,
      /**
       * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
       * @standard level1
       * @param index  unsigned long
       *   Index into the collection.
       * @return Node
       * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
       */
      item: function(index) {
        return index >= 0 && index < this.length ? this[index] : null;
      },
      toString: function(isHTML, nodeFilter) {
        for (var buf = [], i = 0; i < this.length; i++) {
          serializeToString(this[i], buf, isHTML, nodeFilter);
        }
        return buf.join("");
      },
      /**
       * @private
       * @param {function (Node):boolean} predicate
       * @returns {Node[]}
       */
      filter: function(predicate) {
        return Array.prototype.filter.call(this, predicate);
      },
      /**
       * @private
       * @param {Node} item
       * @returns {number}
       */
      indexOf: function(item) {
        return Array.prototype.indexOf.call(this, item);
      }
    };
    function LiveNodeList(node, refresh) {
      this._node = node;
      this._refresh = refresh;
      _updateLiveList(this);
    }
    function _updateLiveList(list) {
      var inc = list._node._inc || list._node.ownerDocument._inc;
      if (list._inc !== inc) {
        var ls = list._refresh(list._node);
        __set__(list, "length", ls.length);
        if (!list.$$length || ls.length < list.$$length) {
          for (var i = ls.length; i in list; i++) {
            if (Object.prototype.hasOwnProperty.call(list, i)) {
              delete list[i];
            }
          }
        }
        copy(ls, list);
        list._inc = inc;
      }
    }
    LiveNodeList.prototype.item = function(i) {
      _updateLiveList(this);
      return this[i] || null;
    };
    _extends(LiveNodeList, NodeList);
    function NamedNodeMap() {
    }
    function _findNodeIndex(list, node) {
      var i = list.length;
      while (i--) {
        if (list[i] === node) {
          return i;
        }
      }
    }
    function _addNamedNode(el, list, newAttr, oldAttr) {
      if (oldAttr) {
        list[_findNodeIndex(list, oldAttr)] = newAttr;
      } else {
        list[list.length++] = newAttr;
      }
      if (el) {
        newAttr.ownerElement = el;
        var doc = el.ownerDocument;
        if (doc) {
          oldAttr && _onRemoveAttribute(doc, el, oldAttr);
          _onAddAttribute(doc, el, newAttr);
        }
      }
    }
    function _removeNamedNode(el, list, attr) {
      var i = _findNodeIndex(list, attr);
      if (i >= 0) {
        var lastIndex = list.length - 1;
        while (i < lastIndex) {
          list[i] = list[++i];
        }
        list.length = lastIndex;
        if (el) {
          var doc = el.ownerDocument;
          if (doc) {
            _onRemoveAttribute(doc, el, attr);
            attr.ownerElement = null;
          }
        }
      } else {
        throw new DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
      }
    }
    NamedNodeMap.prototype = {
      length: 0,
      item: NodeList.prototype.item,
      getNamedItem: function(key) {
        var i = this.length;
        while (i--) {
          var attr = this[i];
          if (attr.nodeName == key) {
            return attr;
          }
        }
      },
      setNamedItem: function(attr) {
        var el = attr.ownerElement;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        var oldAttr = this.getNamedItem(attr.nodeName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      /* returns Node */
      setNamedItemNS: function(attr) {
        var el = attr.ownerElement, oldAttr;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      /* returns Node */
      removeNamedItem: function(key) {
        var attr = this.getNamedItem(key);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
      //for level2
      removeNamedItemNS: function(namespaceURI, localName) {
        var attr = this.getNamedItemNS(namespaceURI, localName);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      getNamedItemNS: function(namespaceURI, localName) {
        var i = this.length;
        while (i--) {
          var node = this[i];
          if (node.localName == localName && node.namespaceURI == namespaceURI) {
            return node;
          }
        }
        return null;
      }
    };
    function DOMImplementation() {
    }
    DOMImplementation.prototype = {
      /**
       * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
       * The different implementations fairly diverged in what kind of features were reported.
       * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
       *
       * @deprecated It is deprecated and modern browsers return true in all cases.
       *
       * @param {string} feature
       * @param {string} [version]
       * @returns {boolean} always true
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
       * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
       */
      hasFeature: function(feature, version) {
        return true;
      },
      /**
       * Creates an XML Document object of the specified type with its document element.
       *
       * __It behaves slightly different from the description in the living standard__:
       * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
       * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       * - this implementation is not validating names or qualified names
       *   (when parsing XML strings, the SAX parser takes care of that)
       *
       * @param {string|null} namespaceURI
       * @param {string} qualifiedName
       * @param {DocumentType=null} doctype
       * @returns {Document}
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
       *
       * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
       * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
       * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
       */
      createDocument: function(namespaceURI, qualifiedName, doctype) {
        var doc = new Document();
        doc.implementation = this;
        doc.childNodes = new NodeList();
        doc.doctype = doctype || null;
        if (doctype) {
          doc.appendChild(doctype);
        }
        if (qualifiedName) {
          var root = doc.createElementNS(namespaceURI, qualifiedName);
          doc.appendChild(root);
        }
        return doc;
      },
      /**
       * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
       *
       * __This behavior is slightly different from the in the specs__:
       * - this implementation is not validating names or qualified names
       *   (when parsing XML strings, the SAX parser takes care of that)
       *
       * @param {string} qualifiedName
       * @param {string} [publicId]
       * @param {string} [systemId]
       * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
       * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
       *
       * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
       * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
       * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
       */
      createDocumentType: function(qualifiedName, publicId, systemId) {
        var node = new DocumentType();
        node.name = qualifiedName;
        node.nodeName = qualifiedName;
        node.publicId = publicId || "";
        node.systemId = systemId || "";
        return node;
      }
    };
    function Node() {
    }
    Node.prototype = {
      firstChild: null,
      lastChild: null,
      previousSibling: null,
      nextSibling: null,
      attributes: null,
      parentNode: null,
      childNodes: null,
      ownerDocument: null,
      nodeValue: null,
      namespaceURI: null,
      prefix: null,
      localName: null,
      // Modified in DOM Level 2:
      insertBefore: function(newChild, refChild) {
        return _insertBefore(this, newChild, refChild);
      },
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        if (oldChild) {
          this.removeChild(oldChild);
        }
      },
      removeChild: function(oldChild) {
        return _removeChild(this, oldChild);
      },
      appendChild: function(newChild) {
        return this.insertBefore(newChild, null);
      },
      hasChildNodes: function() {
        return this.firstChild != null;
      },
      cloneNode: function(deep) {
        return cloneNode(this.ownerDocument || this, this, deep);
      },
      // Modified in DOM Level 2:
      normalize: function() {
        var child = this.firstChild;
        while (child) {
          var next = child.nextSibling;
          if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
            this.removeChild(next);
            child.appendData(next.data);
          } else {
            child.normalize();
            child = next;
          }
        }
      },
      // Introduced in DOM Level 2:
      isSupported: function(feature, version) {
        return this.ownerDocument.implementation.hasFeature(feature, version);
      },
      // Introduced in DOM Level 2:
      hasAttributes: function() {
        return this.attributes.length > 0;
      },
      /**
       * Look up the prefix associated to the given namespace URI, starting from this node.
       * **The default namespace declarations are ignored by this method.**
       * See Namespace Prefix Lookup for details on the algorithm used by this method.
       *
       * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
       *
       * @param {string | null} namespaceURI
       * @returns {string | null}
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
       * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
       * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
       * @see https://github.com/xmldom/xmldom/issues/322
       */
      lookupPrefix: function(namespaceURI) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            for (var n in map) {
              if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) {
                return n;
              }
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      // Introduced in DOM Level 3:
      lookupNamespaceURI: function(prefix) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            if (Object.prototype.hasOwnProperty.call(map, prefix)) {
              return map[prefix];
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      // Introduced in DOM Level 3:
      isDefaultNamespace: function(namespaceURI) {
        var prefix = this.lookupPrefix(namespaceURI);
        return prefix == null;
      }
    };
    function _xmlEncoder(c) {
      return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
    }
    copy(NodeType, Node);
    copy(NodeType, Node.prototype);
    function _visitNode(node, callback) {
      if (callback(node)) {
        return true;
      }
      if (node = node.firstChild) {
        do {
          if (_visitNode(node, callback)) {
            return true;
          }
        } while (node = node.nextSibling);
      }
    }
    function Document() {
      this.ownerDocument = this;
    }
    function _onAddAttribute(doc, el, newAttr) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
      }
    }
    function _onRemoveAttribute(doc, el, newAttr, remove) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
    }
    function _onUpdateChild(doc, el, newChild) {
      if (doc && doc._inc) {
        doc._inc++;
        var cs = el.childNodes;
        if (newChild) {
          cs[cs.length++] = newChild;
        } else {
          var child = el.firstChild;
          var i = 0;
          while (child) {
            cs[i++] = child;
            child = child.nextSibling;
          }
          cs.length = i;
          delete cs[cs.length];
        }
      }
    }
    function _removeChild(parentNode, child) {
      var previous = child.previousSibling;
      var next = child.nextSibling;
      if (previous) {
        previous.nextSibling = next;
      } else {
        parentNode.firstChild = next;
      }
      if (next) {
        next.previousSibling = previous;
      } else {
        parentNode.lastChild = previous;
      }
      child.parentNode = null;
      child.previousSibling = null;
      child.nextSibling = null;
      _onUpdateChild(parentNode.ownerDocument, parentNode);
      return child;
    }
    function hasValidParentNodeType(node) {
      return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
    }
    function hasInsertableNodeType(node) {
      return node && (isElementNode(node) || isTextNode(node) || isDocTypeNode(node) || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE);
    }
    function isDocTypeNode(node) {
      return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
    }
    function isElementNode(node) {
      return node && node.nodeType === Node.ELEMENT_NODE;
    }
    function isTextNode(node) {
      return node && node.nodeType === Node.TEXT_NODE;
    }
    function isElementInsertionPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function isElementReplacementPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      function hasElementChildThatIsNotChild(node) {
        return isElementNode(node) && node !== child;
      }
      if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function assertPreInsertionValidity1to5(parent, node, child) {
      if (!hasValidParentNodeType(parent)) {
        throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
      }
      if (child && child.parentNode !== parent) {
        throw new DOMException(NOT_FOUND_ERR, "child not in parent");
      }
      if (
        // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
        !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
        // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
        // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
        // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
        isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE
      ) {
        throw new DOMException(
          HIERARCHY_REQUEST_ERR,
          "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
        );
      }
    }
    function assertPreInsertionValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementInsertionPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        if (find(parentChildNodes, isDocTypeNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
        if (!child && parentElementChild) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
        }
      }
    }
    function assertPreReplacementValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementReplacementPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        let hasDoctypeChildThatIsNotChild2 = function(node2) {
          return isDocTypeNode(node2) && node2 !== child;
        };
        var hasDoctypeChildThatIsNotChild = hasDoctypeChildThatIsNotChild2;
        if (find(parentChildNodes, hasDoctypeChildThatIsNotChild2)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
      }
    }
    function _insertBefore(parent, node, child, _inDocumentAssertion) {
      assertPreInsertionValidity1to5(parent, node, child);
      if (parent.nodeType === Node.DOCUMENT_NODE) {
        (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
      }
      var cp = node.parentNode;
      if (cp) {
        cp.removeChild(node);
      }
      if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var newFirst = node.firstChild;
        if (newFirst == null) {
          return node;
        }
        var newLast = node.lastChild;
      } else {
        newFirst = newLast = node;
      }
      var pre = child ? child.previousSibling : parent.lastChild;
      newFirst.previousSibling = pre;
      newLast.nextSibling = child;
      if (pre) {
        pre.nextSibling = newFirst;
      } else {
        parent.firstChild = newFirst;
      }
      if (child == null) {
        parent.lastChild = newLast;
      } else {
        child.previousSibling = newLast;
      }
      do {
        newFirst.parentNode = parent;
        var targetDoc = parent.ownerDocument || parent;
        _updateOwnerDocument(newFirst, targetDoc);
      } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
      _onUpdateChild(parent.ownerDocument || parent, parent);
      if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
        node.firstChild = node.lastChild = null;
      }
      return node;
    }
    function _updateOwnerDocument(node, newOwnerDocument) {
      if (node.ownerDocument === newOwnerDocument) {
        return;
      }
      node.ownerDocument = newOwnerDocument;
      if (node.nodeType === ELEMENT_NODE && node.attributes) {
        for (var i = 0; i < node.attributes.length; i++) {
          var attr = node.attributes.item(i);
          if (attr) {
            attr.ownerDocument = newOwnerDocument;
          }
        }
      }
      var child = node.firstChild;
      while (child) {
        _updateOwnerDocument(child, newOwnerDocument);
        child = child.nextSibling;
      }
    }
    function _appendSingleChild(parentNode, newChild) {
      if (newChild.parentNode) {
        newChild.parentNode.removeChild(newChild);
      }
      newChild.parentNode = parentNode;
      newChild.previousSibling = parentNode.lastChild;
      newChild.nextSibling = null;
      if (newChild.previousSibling) {
        newChild.previousSibling.nextSibling = newChild;
      } else {
        parentNode.firstChild = newChild;
      }
      parentNode.lastChild = newChild;
      _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
      var targetDoc = parentNode.ownerDocument || parentNode;
      _updateOwnerDocument(newChild, targetDoc);
      return newChild;
    }
    Document.prototype = {
      //implementation : null,
      nodeName: "#document",
      nodeType: DOCUMENT_NODE,
      /**
       * The DocumentType node of the document.
       *
       * @readonly
       * @type DocumentType
       */
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(newChild, refChild) {
        if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
          var child = newChild.firstChild;
          while (child) {
            var next = child.nextSibling;
            this.insertBefore(child, refChild);
            child = next;
          }
          return newChild;
        }
        _insertBefore(this, newChild, refChild);
        _updateOwnerDocument(newChild, this);
        if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
          this.documentElement = newChild;
        }
        return newChild;
      },
      removeChild: function(oldChild) {
        if (this.documentElement == oldChild) {
          this.documentElement = null;
        }
        return _removeChild(this, oldChild);
      },
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        _updateOwnerDocument(newChild, this);
        if (oldChild) {
          this.removeChild(oldChild);
        }
        if (isElementNode(newChild)) {
          this.documentElement = newChild;
        }
      },
      // Introduced in DOM Level 2:
      importNode: function(importedNode, deep) {
        return importNode(this, importedNode, deep);
      },
      // Introduced in DOM Level 2:
      getElementById: function(id) {
        var rtv = null;
        _visitNode(this.documentElement, function(node) {
          if (node.nodeType == ELEMENT_NODE) {
            if (node.getAttribute("id") == id) {
              rtv = node;
              return true;
            }
          }
        });
        return rtv;
      },
      /**
       * The `getElementsByClassName` method of `Document` interface returns an array-like object
       * of all child elements which have **all** of the given class name(s).
       *
       * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
       *
       *
       * Warning: This is a live LiveNodeList.
       * Changes in the DOM will reflect in the array as the changes occur.
       * If an element selected by this array no longer qualifies for the selector,
       * it will automatically be removed. Be aware of this for iteration purposes.
       *
       * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
       * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
       */
      getElementsByClassName: function(classNames) {
        var classNamesSet = toOrderedSet(classNames);
        return new LiveNodeList(this, function(base) {
          var ls = [];
          if (classNamesSet.length > 0) {
            _visitNode(base.documentElement, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE) {
                var nodeClassNames = node.getAttribute("class");
                if (nodeClassNames) {
                  var matches = classNames === nodeClassNames;
                  if (!matches) {
                    var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                    matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                  }
                  if (matches) {
                    ls.push(node);
                  }
                }
              }
            });
          }
          return ls;
        });
      },
      //document factory method:
      createElement: function(tagName) {
        var node = new Element();
        node.ownerDocument = this;
        node.nodeName = tagName;
        node.tagName = tagName;
        node.localName = tagName;
        node.childNodes = new NodeList();
        var attrs = node.attributes = new NamedNodeMap();
        attrs._ownerElement = node;
        return node;
      },
      createDocumentFragment: function() {
        var node = new DocumentFragment();
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        return node;
      },
      createTextNode: function(data) {
        var node = new Text();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createComment: function(data) {
        var node = new Comment();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createCDATASection: function(data) {
        var node = new CDATASection();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createProcessingInstruction: function(target, data) {
        var node = new ProcessingInstruction();
        node.ownerDocument = this;
        node.tagName = node.nodeName = node.target = target;
        node.nodeValue = node.data = data;
        return node;
      },
      createAttribute: function(name) {
        var node = new Attr();
        node.ownerDocument = this;
        node.name = name;
        node.nodeName = name;
        node.localName = name;
        node.specified = true;
        return node;
      },
      createEntityReference: function(name) {
        var node = new EntityReference();
        node.ownerDocument = this;
        node.nodeName = name;
        return node;
      },
      // Introduced in DOM Level 2:
      createElementNS: function(namespaceURI, qualifiedName) {
        var node = new Element();
        var pl = qualifiedName.split(":");
        var attrs = node.attributes = new NamedNodeMap();
        node.childNodes = new NodeList();
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.tagName = qualifiedName;
        node.namespaceURI = namespaceURI;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        attrs._ownerElement = node;
        return node;
      },
      // Introduced in DOM Level 2:
      createAttributeNS: function(namespaceURI, qualifiedName) {
        var node = new Attr();
        var pl = qualifiedName.split(":");
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.name = qualifiedName;
        node.namespaceURI = namespaceURI;
        node.specified = true;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        return node;
      }
    };
    _extends(Document, Node);
    function Element() {
      this._nsMap = {};
    }
    Element.prototype = {
      nodeType: ELEMENT_NODE,
      hasAttribute: function(name) {
        return this.getAttributeNode(name) != null;
      },
      getAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        return attr && attr.value || "";
      },
      getAttributeNode: function(name) {
        return this.attributes.getNamedItem(name);
      },
      setAttribute: function(name, value) {
        var attr = this.ownerDocument.createAttribute(name);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      removeAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        attr && this.removeAttributeNode(attr);
      },
      //four real opeartion method
      appendChild: function(newChild) {
        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
          return this.insertBefore(newChild, null);
        } else {
          return _appendSingleChild(this, newChild);
        }
      },
      setAttributeNode: function(newAttr) {
        return this.attributes.setNamedItem(newAttr);
      },
      setAttributeNodeNS: function(newAttr) {
        return this.attributes.setNamedItemNS(newAttr);
      },
      removeAttributeNode: function(oldAttr) {
        return this.attributes.removeNamedItem(oldAttr.nodeName);
      },
      //get real attribute name,and remove it by removeAttributeNode
      removeAttributeNS: function(namespaceURI, localName) {
        var old = this.getAttributeNodeNS(namespaceURI, localName);
        old && this.removeAttributeNode(old);
      },
      hasAttributeNS: function(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName) != null;
      },
      getAttributeNS: function(namespaceURI, localName) {
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        return attr && attr.value || "";
      },
      setAttributeNS: function(namespaceURI, qualifiedName, value) {
        var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      getAttributeNodeNS: function(namespaceURI, localName) {
        return this.attributes.getNamedItemNS(namespaceURI, localName);
      },
      getElementsByTagName: function(tagName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      },
      getElementsByTagNameNS: function(namespaceURI, localName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      }
    };
    Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
    Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
    _extends(Element, Node);
    function Attr() {
    }
    Attr.prototype.nodeType = ATTRIBUTE_NODE;
    _extends(Attr, Node);
    function CharacterData() {
    }
    CharacterData.prototype = {
      data: "",
      substringData: function(offset, count) {
        return this.data.substring(offset, offset + count);
      },
      appendData: function(text) {
        text = this.data + text;
        this.nodeValue = this.data = text;
        this.length = text.length;
      },
      insertData: function(offset, text) {
        this.replaceData(offset, 0, text);
      },
      appendChild: function(newChild) {
        throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
      },
      deleteData: function(offset, count) {
        this.replaceData(offset, count, "");
      },
      replaceData: function(offset, count, text) {
        var start = this.data.substring(0, offset);
        var end = this.data.substring(offset + count);
        text = start + text + end;
        this.nodeValue = this.data = text;
        this.length = text.length;
      }
    };
    _extends(CharacterData, Node);
    function Text() {
    }
    Text.prototype = {
      nodeName: "#text",
      nodeType: TEXT_NODE,
      splitText: function(offset) {
        var text = this.data;
        var newText = text.substring(offset);
        text = text.substring(0, offset);
        this.data = this.nodeValue = text;
        this.length = text.length;
        var newNode = this.ownerDocument.createTextNode(newText);
        if (this.parentNode) {
          this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        return newNode;
      }
    };
    _extends(Text, CharacterData);
    function Comment() {
    }
    Comment.prototype = {
      nodeName: "#comment",
      nodeType: COMMENT_NODE
    };
    _extends(Comment, CharacterData);
    function CDATASection() {
    }
    CDATASection.prototype = {
      nodeName: "#cdata-section",
      nodeType: CDATA_SECTION_NODE
    };
    _extends(CDATASection, CharacterData);
    function DocumentType() {
    }
    DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
    _extends(DocumentType, Node);
    function Notation() {
    }
    Notation.prototype.nodeType = NOTATION_NODE;
    _extends(Notation, Node);
    function Entity() {
    }
    Entity.prototype.nodeType = ENTITY_NODE;
    _extends(Entity, Node);
    function EntityReference() {
    }
    EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
    _extends(EntityReference, Node);
    function DocumentFragment() {
    }
    DocumentFragment.prototype.nodeName = "#document-fragment";
    DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
    _extends(DocumentFragment, Node);
    function ProcessingInstruction() {
    }
    ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
    _extends(ProcessingInstruction, Node);
    function XMLSerializer() {
    }
    XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
      return nodeSerializeToString.call(node, isHtml, nodeFilter);
    };
    Node.prototype.toString = nodeSerializeToString;
    function nodeSerializeToString(isHtml, nodeFilter) {
      var buf = [];
      var refNode = this.nodeType == 9 && this.documentElement || this;
      var prefix = refNode.prefix;
      var uri = refNode.namespaceURI;
      if (uri && prefix == null) {
        var prefix = refNode.lookupPrefix(uri);
        if (prefix == null) {
          var visibleNamespaces = [
            { namespace: uri, prefix: null }
            //{namespace:uri,prefix:''}
          ];
        }
      }
      serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
      return buf.join("");
    }
    function needNamespaceDefine(node, isHTML, visibleNamespaces) {
      var prefix = node.prefix || "";
      var uri = node.namespaceURI;
      if (!uri) {
        return false;
      }
      if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
        return false;
      }
      var i = visibleNamespaces.length;
      while (i--) {
        var ns = visibleNamespaces[i];
        if (ns.prefix === prefix) {
          return ns.namespace !== uri;
        }
      }
      return true;
    }
    function addSerializedAttribute(buf, qualifiedName, value) {
      buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
    }
    function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
      if (!visibleNamespaces) {
        visibleNamespaces = [];
      }
      if (nodeFilter) {
        node = nodeFilter(node);
        if (node) {
          if (typeof node == "string") {
            buf.push(node);
            return;
          }
        } else {
          return;
        }
      }
      switch (node.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var len = attrs.length;
          var child = node.firstChild;
          var nodeName = node.tagName;
          isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML;
          var prefixedNodeName = nodeName;
          if (!isHTML && !node.prefix && node.namespaceURI) {
            var defaultNS;
            for (var ai = 0; ai < attrs.length; ai++) {
              if (attrs.item(ai).name === "xmlns") {
                defaultNS = attrs.item(ai).value;
                break;
              }
            }
            if (!defaultNS) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                  defaultNS = namespace.namespace;
                  break;
                }
              }
            }
            if (defaultNS !== node.namespaceURI) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.namespace === node.namespaceURI) {
                  if (namespace.prefix) {
                    prefixedNodeName = namespace.prefix + ":" + nodeName;
                  }
                  break;
                }
              }
            }
          }
          buf.push("<", prefixedNodeName);
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (attr.prefix == "xmlns") {
              visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
            } else if (attr.nodeName == "xmlns") {
              visibleNamespaces.push({ prefix: "", namespace: attr.value });
            }
          }
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
              var prefix = attr.prefix || "";
              var uri = attr.namespaceURI;
              addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
              visibleNamespaces.push({ prefix, namespace: uri });
            }
            serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
          }
          if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
            var prefix = node.prefix || "";
            var uri = node.namespaceURI;
            addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
            visibleNamespaces.push({ prefix, namespace: uri });
          }
          if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
            buf.push(">");
            if (isHTML && /^script$/i.test(nodeName)) {
              while (child) {
                if (child.data) {
                  buf.push(child.data);
                } else {
                  serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                }
                child = child.nextSibling;
              }
            } else {
              while (child) {
                serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                child = child.nextSibling;
              }
            }
            buf.push("</", prefixedNodeName, ">");
          } else {
            buf.push("/>");
          }
          return;
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var child = node.firstChild;
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
            child = child.nextSibling;
          }
          return;
        case ATTRIBUTE_NODE:
          return addSerializedAttribute(buf, node.name, node.value);
        case TEXT_NODE:
          return buf.push(
            node.data.replace(/[<&>]/g, _xmlEncoder)
          );
        case CDATA_SECTION_NODE:
          return buf.push("<![CDATA[", node.data, "]]>");
        case COMMENT_NODE:
          return buf.push("<!--", node.data, "-->");
        case DOCUMENT_TYPE_NODE:
          var pubid = node.publicId;
          var sysid = node.systemId;
          buf.push("<!DOCTYPE ", node.name);
          if (pubid) {
            buf.push(" PUBLIC ", pubid);
            if (sysid && sysid != ".") {
              buf.push(" ", sysid);
            }
            buf.push(">");
          } else if (sysid && sysid != ".") {
            buf.push(" SYSTEM ", sysid, ">");
          } else {
            var sub = node.internalSubset;
            if (sub) {
              buf.push(" [", sub, "]");
            }
            buf.push(">");
          }
          return;
        case PROCESSING_INSTRUCTION_NODE:
          return buf.push("<?", node.target, " ", node.data, "?>");
        case ENTITY_REFERENCE_NODE:
          return buf.push("&", node.nodeName, ";");
        //case ENTITY_NODE:
        //case NOTATION_NODE:
        default:
          buf.push("??", node.nodeName);
      }
    }
    function importNode(doc, node, deep) {
      var node2;
      switch (node.nodeType) {
        case ELEMENT_NODE:
          node2 = node.cloneNode(false);
          node2.ownerDocument = doc;
        //var attrs = node2.attributes;
        //var len = attrs.length;
        //for(var i=0;i<len;i++){
        //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
        //}
        case DOCUMENT_FRAGMENT_NODE:
          break;
        case ATTRIBUTE_NODE:
          deep = true;
          break;
      }
      if (!node2) {
        node2 = node.cloneNode(false);
      }
      node2.ownerDocument = doc;
      node2.parentNode = null;
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(importNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function cloneNode(doc, node, deep) {
      var node2 = new node.constructor();
      for (var n in node) {
        if (Object.prototype.hasOwnProperty.call(node, n)) {
          var v = node[n];
          if (typeof v != "object") {
            if (v != node2[n]) {
              node2[n] = v;
            }
          }
        }
      }
      if (node.childNodes) {
        node2.childNodes = new NodeList();
      }
      node2.ownerDocument = doc;
      switch (node2.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var attrs2 = node2.attributes = new NamedNodeMap();
          var len = attrs.length;
          attrs2._ownerElement = node2;
          for (var i = 0; i < len; i++) {
            node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
          }
          break;
          ;
        case ATTRIBUTE_NODE:
          deep = true;
      }
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(cloneNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function __set__(object, key, value) {
      object[key] = value;
    }
    try {
      if (Object.defineProperty) {
        let getTextContent2 = function(node) {
          switch (node.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              var buf = [];
              node = node.firstChild;
              while (node) {
                if (node.nodeType !== 7 && node.nodeType !== 8) {
                  buf.push(getTextContent2(node));
                }
                node = node.nextSibling;
              }
              return buf.join("");
            default:
              return node.nodeValue;
          }
        };
        getTextContent = getTextContent2;
        Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            _updateLiveList(this);
            return this.$$length;
          }
        });
        Object.defineProperty(Node.prototype, "textContent", {
          get: function() {
            return getTextContent2(this);
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (this.firstChild) {
                  this.removeChild(this.firstChild);
                }
                if (data || String(data)) {
                  this.appendChild(this.ownerDocument.createTextNode(data));
                }
                break;
              default:
                this.data = data;
                this.value = data;
                this.nodeValue = data;
            }
          }
        });
        __set__ = function(object, key, value) {
          object["$$" + key] = value;
        };
      }
    } catch (e) {
    }
    var getTextContent;
    exports2.DocumentType = DocumentType;
    exports2.DOMException = DOMException;
    exports2.DOMImplementation = DOMImplementation;
    exports2.Element = Element;
    exports2.Node = Node;
    exports2.NodeList = NodeList;
    exports2.XMLSerializer = XMLSerializer;
  }
});

// node_modules/@xmldom/xmldom/lib/entities.js
var require_entities = __commonJS({
  "node_modules/@xmldom/xmldom/lib/entities.js"(exports2) {
    "use strict";
    var freeze = require_conventions().freeze;
    exports2.XML_ENTITIES = freeze({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    });
    exports2.HTML_ENTITIES = freeze({
      Aacute: "\xC1",
      aacute: "\xE1",
      Abreve: "\u0102",
      abreve: "\u0103",
      ac: "\u223E",
      acd: "\u223F",
      acE: "\u223E\u0333",
      Acirc: "\xC2",
      acirc: "\xE2",
      acute: "\xB4",
      Acy: "\u0410",
      acy: "\u0430",
      AElig: "\xC6",
      aelig: "\xE6",
      af: "\u2061",
      Afr: "\u{1D504}",
      afr: "\u{1D51E}",
      Agrave: "\xC0",
      agrave: "\xE0",
      alefsym: "\u2135",
      aleph: "\u2135",
      Alpha: "\u0391",
      alpha: "\u03B1",
      Amacr: "\u0100",
      amacr: "\u0101",
      amalg: "\u2A3F",
      AMP: "&",
      amp: "&",
      And: "\u2A53",
      and: "\u2227",
      andand: "\u2A55",
      andd: "\u2A5C",
      andslope: "\u2A58",
      andv: "\u2A5A",
      ang: "\u2220",
      ange: "\u29A4",
      angle: "\u2220",
      angmsd: "\u2221",
      angmsdaa: "\u29A8",
      angmsdab: "\u29A9",
      angmsdac: "\u29AA",
      angmsdad: "\u29AB",
      angmsdae: "\u29AC",
      angmsdaf: "\u29AD",
      angmsdag: "\u29AE",
      angmsdah: "\u29AF",
      angrt: "\u221F",
      angrtvb: "\u22BE",
      angrtvbd: "\u299D",
      angsph: "\u2222",
      angst: "\xC5",
      angzarr: "\u237C",
      Aogon: "\u0104",
      aogon: "\u0105",
      Aopf: "\u{1D538}",
      aopf: "\u{1D552}",
      ap: "\u2248",
      apacir: "\u2A6F",
      apE: "\u2A70",
      ape: "\u224A",
      apid: "\u224B",
      apos: "'",
      ApplyFunction: "\u2061",
      approx: "\u2248",
      approxeq: "\u224A",
      Aring: "\xC5",
      aring: "\xE5",
      Ascr: "\u{1D49C}",
      ascr: "\u{1D4B6}",
      Assign: "\u2254",
      ast: "*",
      asymp: "\u2248",
      asympeq: "\u224D",
      Atilde: "\xC3",
      atilde: "\xE3",
      Auml: "\xC4",
      auml: "\xE4",
      awconint: "\u2233",
      awint: "\u2A11",
      backcong: "\u224C",
      backepsilon: "\u03F6",
      backprime: "\u2035",
      backsim: "\u223D",
      backsimeq: "\u22CD",
      Backslash: "\u2216",
      Barv: "\u2AE7",
      barvee: "\u22BD",
      Barwed: "\u2306",
      barwed: "\u2305",
      barwedge: "\u2305",
      bbrk: "\u23B5",
      bbrktbrk: "\u23B6",
      bcong: "\u224C",
      Bcy: "\u0411",
      bcy: "\u0431",
      bdquo: "\u201E",
      becaus: "\u2235",
      Because: "\u2235",
      because: "\u2235",
      bemptyv: "\u29B0",
      bepsi: "\u03F6",
      bernou: "\u212C",
      Bernoullis: "\u212C",
      Beta: "\u0392",
      beta: "\u03B2",
      beth: "\u2136",
      between: "\u226C",
      Bfr: "\u{1D505}",
      bfr: "\u{1D51F}",
      bigcap: "\u22C2",
      bigcirc: "\u25EF",
      bigcup: "\u22C3",
      bigodot: "\u2A00",
      bigoplus: "\u2A01",
      bigotimes: "\u2A02",
      bigsqcup: "\u2A06",
      bigstar: "\u2605",
      bigtriangledown: "\u25BD",
      bigtriangleup: "\u25B3",
      biguplus: "\u2A04",
      bigvee: "\u22C1",
      bigwedge: "\u22C0",
      bkarow: "\u290D",
      blacklozenge: "\u29EB",
      blacksquare: "\u25AA",
      blacktriangle: "\u25B4",
      blacktriangledown: "\u25BE",
      blacktriangleleft: "\u25C2",
      blacktriangleright: "\u25B8",
      blank: "\u2423",
      blk12: "\u2592",
      blk14: "\u2591",
      blk34: "\u2593",
      block: "\u2588",
      bne: "=\u20E5",
      bnequiv: "\u2261\u20E5",
      bNot: "\u2AED",
      bnot: "\u2310",
      Bopf: "\u{1D539}",
      bopf: "\u{1D553}",
      bot: "\u22A5",
      bottom: "\u22A5",
      bowtie: "\u22C8",
      boxbox: "\u29C9",
      boxDL: "\u2557",
      boxDl: "\u2556",
      boxdL: "\u2555",
      boxdl: "\u2510",
      boxDR: "\u2554",
      boxDr: "\u2553",
      boxdR: "\u2552",
      boxdr: "\u250C",
      boxH: "\u2550",
      boxh: "\u2500",
      boxHD: "\u2566",
      boxHd: "\u2564",
      boxhD: "\u2565",
      boxhd: "\u252C",
      boxHU: "\u2569",
      boxHu: "\u2567",
      boxhU: "\u2568",
      boxhu: "\u2534",
      boxminus: "\u229F",
      boxplus: "\u229E",
      boxtimes: "\u22A0",
      boxUL: "\u255D",
      boxUl: "\u255C",
      boxuL: "\u255B",
      boxul: "\u2518",
      boxUR: "\u255A",
      boxUr: "\u2559",
      boxuR: "\u2558",
      boxur: "\u2514",
      boxV: "\u2551",
      boxv: "\u2502",
      boxVH: "\u256C",
      boxVh: "\u256B",
      boxvH: "\u256A",
      boxvh: "\u253C",
      boxVL: "\u2563",
      boxVl: "\u2562",
      boxvL: "\u2561",
      boxvl: "\u2524",
      boxVR: "\u2560",
      boxVr: "\u255F",
      boxvR: "\u255E",
      boxvr: "\u251C",
      bprime: "\u2035",
      Breve: "\u02D8",
      breve: "\u02D8",
      brvbar: "\xA6",
      Bscr: "\u212C",
      bscr: "\u{1D4B7}",
      bsemi: "\u204F",
      bsim: "\u223D",
      bsime: "\u22CD",
      bsol: "\\",
      bsolb: "\u29C5",
      bsolhsub: "\u27C8",
      bull: "\u2022",
      bullet: "\u2022",
      bump: "\u224E",
      bumpE: "\u2AAE",
      bumpe: "\u224F",
      Bumpeq: "\u224E",
      bumpeq: "\u224F",
      Cacute: "\u0106",
      cacute: "\u0107",
      Cap: "\u22D2",
      cap: "\u2229",
      capand: "\u2A44",
      capbrcup: "\u2A49",
      capcap: "\u2A4B",
      capcup: "\u2A47",
      capdot: "\u2A40",
      CapitalDifferentialD: "\u2145",
      caps: "\u2229\uFE00",
      caret: "\u2041",
      caron: "\u02C7",
      Cayleys: "\u212D",
      ccaps: "\u2A4D",
      Ccaron: "\u010C",
      ccaron: "\u010D",
      Ccedil: "\xC7",
      ccedil: "\xE7",
      Ccirc: "\u0108",
      ccirc: "\u0109",
      Cconint: "\u2230",
      ccups: "\u2A4C",
      ccupssm: "\u2A50",
      Cdot: "\u010A",
      cdot: "\u010B",
      cedil: "\xB8",
      Cedilla: "\xB8",
      cemptyv: "\u29B2",
      cent: "\xA2",
      CenterDot: "\xB7",
      centerdot: "\xB7",
      Cfr: "\u212D",
      cfr: "\u{1D520}",
      CHcy: "\u0427",
      chcy: "\u0447",
      check: "\u2713",
      checkmark: "\u2713",
      Chi: "\u03A7",
      chi: "\u03C7",
      cir: "\u25CB",
      circ: "\u02C6",
      circeq: "\u2257",
      circlearrowleft: "\u21BA",
      circlearrowright: "\u21BB",
      circledast: "\u229B",
      circledcirc: "\u229A",
      circleddash: "\u229D",
      CircleDot: "\u2299",
      circledR: "\xAE",
      circledS: "\u24C8",
      CircleMinus: "\u2296",
      CirclePlus: "\u2295",
      CircleTimes: "\u2297",
      cirE: "\u29C3",
      cire: "\u2257",
      cirfnint: "\u2A10",
      cirmid: "\u2AEF",
      cirscir: "\u29C2",
      ClockwiseContourIntegral: "\u2232",
      CloseCurlyDoubleQuote: "\u201D",
      CloseCurlyQuote: "\u2019",
      clubs: "\u2663",
      clubsuit: "\u2663",
      Colon: "\u2237",
      colon: ":",
      Colone: "\u2A74",
      colone: "\u2254",
      coloneq: "\u2254",
      comma: ",",
      commat: "@",
      comp: "\u2201",
      compfn: "\u2218",
      complement: "\u2201",
      complexes: "\u2102",
      cong: "\u2245",
      congdot: "\u2A6D",
      Congruent: "\u2261",
      Conint: "\u222F",
      conint: "\u222E",
      ContourIntegral: "\u222E",
      Copf: "\u2102",
      copf: "\u{1D554}",
      coprod: "\u2210",
      Coproduct: "\u2210",
      COPY: "\xA9",
      copy: "\xA9",
      copysr: "\u2117",
      CounterClockwiseContourIntegral: "\u2233",
      crarr: "\u21B5",
      Cross: "\u2A2F",
      cross: "\u2717",
      Cscr: "\u{1D49E}",
      cscr: "\u{1D4B8}",
      csub: "\u2ACF",
      csube: "\u2AD1",
      csup: "\u2AD0",
      csupe: "\u2AD2",
      ctdot: "\u22EF",
      cudarrl: "\u2938",
      cudarrr: "\u2935",
      cuepr: "\u22DE",
      cuesc: "\u22DF",
      cularr: "\u21B6",
      cularrp: "\u293D",
      Cup: "\u22D3",
      cup: "\u222A",
      cupbrcap: "\u2A48",
      CupCap: "\u224D",
      cupcap: "\u2A46",
      cupcup: "\u2A4A",
      cupdot: "\u228D",
      cupor: "\u2A45",
      cups: "\u222A\uFE00",
      curarr: "\u21B7",
      curarrm: "\u293C",
      curlyeqprec: "\u22DE",
      curlyeqsucc: "\u22DF",
      curlyvee: "\u22CE",
      curlywedge: "\u22CF",
      curren: "\xA4",
      curvearrowleft: "\u21B6",
      curvearrowright: "\u21B7",
      cuvee: "\u22CE",
      cuwed: "\u22CF",
      cwconint: "\u2232",
      cwint: "\u2231",
      cylcty: "\u232D",
      Dagger: "\u2021",
      dagger: "\u2020",
      daleth: "\u2138",
      Darr: "\u21A1",
      dArr: "\u21D3",
      darr: "\u2193",
      dash: "\u2010",
      Dashv: "\u2AE4",
      dashv: "\u22A3",
      dbkarow: "\u290F",
      dblac: "\u02DD",
      Dcaron: "\u010E",
      dcaron: "\u010F",
      Dcy: "\u0414",
      dcy: "\u0434",
      DD: "\u2145",
      dd: "\u2146",
      ddagger: "\u2021",
      ddarr: "\u21CA",
      DDotrahd: "\u2911",
      ddotseq: "\u2A77",
      deg: "\xB0",
      Del: "\u2207",
      Delta: "\u0394",
      delta: "\u03B4",
      demptyv: "\u29B1",
      dfisht: "\u297F",
      Dfr: "\u{1D507}",
      dfr: "\u{1D521}",
      dHar: "\u2965",
      dharl: "\u21C3",
      dharr: "\u21C2",
      DiacriticalAcute: "\xB4",
      DiacriticalDot: "\u02D9",
      DiacriticalDoubleAcute: "\u02DD",
      DiacriticalGrave: "`",
      DiacriticalTilde: "\u02DC",
      diam: "\u22C4",
      Diamond: "\u22C4",
      diamond: "\u22C4",
      diamondsuit: "\u2666",
      diams: "\u2666",
      die: "\xA8",
      DifferentialD: "\u2146",
      digamma: "\u03DD",
      disin: "\u22F2",
      div: "\xF7",
      divide: "\xF7",
      divideontimes: "\u22C7",
      divonx: "\u22C7",
      DJcy: "\u0402",
      djcy: "\u0452",
      dlcorn: "\u231E",
      dlcrop: "\u230D",
      dollar: "$",
      Dopf: "\u{1D53B}",
      dopf: "\u{1D555}",
      Dot: "\xA8",
      dot: "\u02D9",
      DotDot: "\u20DC",
      doteq: "\u2250",
      doteqdot: "\u2251",
      DotEqual: "\u2250",
      dotminus: "\u2238",
      dotplus: "\u2214",
      dotsquare: "\u22A1",
      doublebarwedge: "\u2306",
      DoubleContourIntegral: "\u222F",
      DoubleDot: "\xA8",
      DoubleDownArrow: "\u21D3",
      DoubleLeftArrow: "\u21D0",
      DoubleLeftRightArrow: "\u21D4",
      DoubleLeftTee: "\u2AE4",
      DoubleLongLeftArrow: "\u27F8",
      DoubleLongLeftRightArrow: "\u27FA",
      DoubleLongRightArrow: "\u27F9",
      DoubleRightArrow: "\u21D2",
      DoubleRightTee: "\u22A8",
      DoubleUpArrow: "\u21D1",
      DoubleUpDownArrow: "\u21D5",
      DoubleVerticalBar: "\u2225",
      DownArrow: "\u2193",
      Downarrow: "\u21D3",
      downarrow: "\u2193",
      DownArrowBar: "\u2913",
      DownArrowUpArrow: "\u21F5",
      DownBreve: "\u0311",
      downdownarrows: "\u21CA",
      downharpoonleft: "\u21C3",
      downharpoonright: "\u21C2",
      DownLeftRightVector: "\u2950",
      DownLeftTeeVector: "\u295E",
      DownLeftVector: "\u21BD",
      DownLeftVectorBar: "\u2956",
      DownRightTeeVector: "\u295F",
      DownRightVector: "\u21C1",
      DownRightVectorBar: "\u2957",
      DownTee: "\u22A4",
      DownTeeArrow: "\u21A7",
      drbkarow: "\u2910",
      drcorn: "\u231F",
      drcrop: "\u230C",
      Dscr: "\u{1D49F}",
      dscr: "\u{1D4B9}",
      DScy: "\u0405",
      dscy: "\u0455",
      dsol: "\u29F6",
      Dstrok: "\u0110",
      dstrok: "\u0111",
      dtdot: "\u22F1",
      dtri: "\u25BF",
      dtrif: "\u25BE",
      duarr: "\u21F5",
      duhar: "\u296F",
      dwangle: "\u29A6",
      DZcy: "\u040F",
      dzcy: "\u045F",
      dzigrarr: "\u27FF",
      Eacute: "\xC9",
      eacute: "\xE9",
      easter: "\u2A6E",
      Ecaron: "\u011A",
      ecaron: "\u011B",
      ecir: "\u2256",
      Ecirc: "\xCA",
      ecirc: "\xEA",
      ecolon: "\u2255",
      Ecy: "\u042D",
      ecy: "\u044D",
      eDDot: "\u2A77",
      Edot: "\u0116",
      eDot: "\u2251",
      edot: "\u0117",
      ee: "\u2147",
      efDot: "\u2252",
      Efr: "\u{1D508}",
      efr: "\u{1D522}",
      eg: "\u2A9A",
      Egrave: "\xC8",
      egrave: "\xE8",
      egs: "\u2A96",
      egsdot: "\u2A98",
      el: "\u2A99",
      Element: "\u2208",
      elinters: "\u23E7",
      ell: "\u2113",
      els: "\u2A95",
      elsdot: "\u2A97",
      Emacr: "\u0112",
      emacr: "\u0113",
      empty: "\u2205",
      emptyset: "\u2205",
      EmptySmallSquare: "\u25FB",
      emptyv: "\u2205",
      EmptyVerySmallSquare: "\u25AB",
      emsp: "\u2003",
      emsp13: "\u2004",
      emsp14: "\u2005",
      ENG: "\u014A",
      eng: "\u014B",
      ensp: "\u2002",
      Eogon: "\u0118",
      eogon: "\u0119",
      Eopf: "\u{1D53C}",
      eopf: "\u{1D556}",
      epar: "\u22D5",
      eparsl: "\u29E3",
      eplus: "\u2A71",
      epsi: "\u03B5",
      Epsilon: "\u0395",
      epsilon: "\u03B5",
      epsiv: "\u03F5",
      eqcirc: "\u2256",
      eqcolon: "\u2255",
      eqsim: "\u2242",
      eqslantgtr: "\u2A96",
      eqslantless: "\u2A95",
      Equal: "\u2A75",
      equals: "=",
      EqualTilde: "\u2242",
      equest: "\u225F",
      Equilibrium: "\u21CC",
      equiv: "\u2261",
      equivDD: "\u2A78",
      eqvparsl: "\u29E5",
      erarr: "\u2971",
      erDot: "\u2253",
      Escr: "\u2130",
      escr: "\u212F",
      esdot: "\u2250",
      Esim: "\u2A73",
      esim: "\u2242",
      Eta: "\u0397",
      eta: "\u03B7",
      ETH: "\xD0",
      eth: "\xF0",
      Euml: "\xCB",
      euml: "\xEB",
      euro: "\u20AC",
      excl: "!",
      exist: "\u2203",
      Exists: "\u2203",
      expectation: "\u2130",
      ExponentialE: "\u2147",
      exponentiale: "\u2147",
      fallingdotseq: "\u2252",
      Fcy: "\u0424",
      fcy: "\u0444",
      female: "\u2640",
      ffilig: "\uFB03",
      fflig: "\uFB00",
      ffllig: "\uFB04",
      Ffr: "\u{1D509}",
      ffr: "\u{1D523}",
      filig: "\uFB01",
      FilledSmallSquare: "\u25FC",
      FilledVerySmallSquare: "\u25AA",
      fjlig: "fj",
      flat: "\u266D",
      fllig: "\uFB02",
      fltns: "\u25B1",
      fnof: "\u0192",
      Fopf: "\u{1D53D}",
      fopf: "\u{1D557}",
      ForAll: "\u2200",
      forall: "\u2200",
      fork: "\u22D4",
      forkv: "\u2AD9",
      Fouriertrf: "\u2131",
      fpartint: "\u2A0D",
      frac12: "\xBD",
      frac13: "\u2153",
      frac14: "\xBC",
      frac15: "\u2155",
      frac16: "\u2159",
      frac18: "\u215B",
      frac23: "\u2154",
      frac25: "\u2156",
      frac34: "\xBE",
      frac35: "\u2157",
      frac38: "\u215C",
      frac45: "\u2158",
      frac56: "\u215A",
      frac58: "\u215D",
      frac78: "\u215E",
      frasl: "\u2044",
      frown: "\u2322",
      Fscr: "\u2131",
      fscr: "\u{1D4BB}",
      gacute: "\u01F5",
      Gamma: "\u0393",
      gamma: "\u03B3",
      Gammad: "\u03DC",
      gammad: "\u03DD",
      gap: "\u2A86",
      Gbreve: "\u011E",
      gbreve: "\u011F",
      Gcedil: "\u0122",
      Gcirc: "\u011C",
      gcirc: "\u011D",
      Gcy: "\u0413",
      gcy: "\u0433",
      Gdot: "\u0120",
      gdot: "\u0121",
      gE: "\u2267",
      ge: "\u2265",
      gEl: "\u2A8C",
      gel: "\u22DB",
      geq: "\u2265",
      geqq: "\u2267",
      geqslant: "\u2A7E",
      ges: "\u2A7E",
      gescc: "\u2AA9",
      gesdot: "\u2A80",
      gesdoto: "\u2A82",
      gesdotol: "\u2A84",
      gesl: "\u22DB\uFE00",
      gesles: "\u2A94",
      Gfr: "\u{1D50A}",
      gfr: "\u{1D524}",
      Gg: "\u22D9",
      gg: "\u226B",
      ggg: "\u22D9",
      gimel: "\u2137",
      GJcy: "\u0403",
      gjcy: "\u0453",
      gl: "\u2277",
      gla: "\u2AA5",
      glE: "\u2A92",
      glj: "\u2AA4",
      gnap: "\u2A8A",
      gnapprox: "\u2A8A",
      gnE: "\u2269",
      gne: "\u2A88",
      gneq: "\u2A88",
      gneqq: "\u2269",
      gnsim: "\u22E7",
      Gopf: "\u{1D53E}",
      gopf: "\u{1D558}",
      grave: "`",
      GreaterEqual: "\u2265",
      GreaterEqualLess: "\u22DB",
      GreaterFullEqual: "\u2267",
      GreaterGreater: "\u2AA2",
      GreaterLess: "\u2277",
      GreaterSlantEqual: "\u2A7E",
      GreaterTilde: "\u2273",
      Gscr: "\u{1D4A2}",
      gscr: "\u210A",
      gsim: "\u2273",
      gsime: "\u2A8E",
      gsiml: "\u2A90",
      Gt: "\u226B",
      GT: ">",
      gt: ">",
      gtcc: "\u2AA7",
      gtcir: "\u2A7A",
      gtdot: "\u22D7",
      gtlPar: "\u2995",
      gtquest: "\u2A7C",
      gtrapprox: "\u2A86",
      gtrarr: "\u2978",
      gtrdot: "\u22D7",
      gtreqless: "\u22DB",
      gtreqqless: "\u2A8C",
      gtrless: "\u2277",
      gtrsim: "\u2273",
      gvertneqq: "\u2269\uFE00",
      gvnE: "\u2269\uFE00",
      Hacek: "\u02C7",
      hairsp: "\u200A",
      half: "\xBD",
      hamilt: "\u210B",
      HARDcy: "\u042A",
      hardcy: "\u044A",
      hArr: "\u21D4",
      harr: "\u2194",
      harrcir: "\u2948",
      harrw: "\u21AD",
      Hat: "^",
      hbar: "\u210F",
      Hcirc: "\u0124",
      hcirc: "\u0125",
      hearts: "\u2665",
      heartsuit: "\u2665",
      hellip: "\u2026",
      hercon: "\u22B9",
      Hfr: "\u210C",
      hfr: "\u{1D525}",
      HilbertSpace: "\u210B",
      hksearow: "\u2925",
      hkswarow: "\u2926",
      hoarr: "\u21FF",
      homtht: "\u223B",
      hookleftarrow: "\u21A9",
      hookrightarrow: "\u21AA",
      Hopf: "\u210D",
      hopf: "\u{1D559}",
      horbar: "\u2015",
      HorizontalLine: "\u2500",
      Hscr: "\u210B",
      hscr: "\u{1D4BD}",
      hslash: "\u210F",
      Hstrok: "\u0126",
      hstrok: "\u0127",
      HumpDownHump: "\u224E",
      HumpEqual: "\u224F",
      hybull: "\u2043",
      hyphen: "\u2010",
      Iacute: "\xCD",
      iacute: "\xED",
      ic: "\u2063",
      Icirc: "\xCE",
      icirc: "\xEE",
      Icy: "\u0418",
      icy: "\u0438",
      Idot: "\u0130",
      IEcy: "\u0415",
      iecy: "\u0435",
      iexcl: "\xA1",
      iff: "\u21D4",
      Ifr: "\u2111",
      ifr: "\u{1D526}",
      Igrave: "\xCC",
      igrave: "\xEC",
      ii: "\u2148",
      iiiint: "\u2A0C",
      iiint: "\u222D",
      iinfin: "\u29DC",
      iiota: "\u2129",
      IJlig: "\u0132",
      ijlig: "\u0133",
      Im: "\u2111",
      Imacr: "\u012A",
      imacr: "\u012B",
      image: "\u2111",
      ImaginaryI: "\u2148",
      imagline: "\u2110",
      imagpart: "\u2111",
      imath: "\u0131",
      imof: "\u22B7",
      imped: "\u01B5",
      Implies: "\u21D2",
      in: "\u2208",
      incare: "\u2105",
      infin: "\u221E",
      infintie: "\u29DD",
      inodot: "\u0131",
      Int: "\u222C",
      int: "\u222B",
      intcal: "\u22BA",
      integers: "\u2124",
      Integral: "\u222B",
      intercal: "\u22BA",
      Intersection: "\u22C2",
      intlarhk: "\u2A17",
      intprod: "\u2A3C",
      InvisibleComma: "\u2063",
      InvisibleTimes: "\u2062",
      IOcy: "\u0401",
      iocy: "\u0451",
      Iogon: "\u012E",
      iogon: "\u012F",
      Iopf: "\u{1D540}",
      iopf: "\u{1D55A}",
      Iota: "\u0399",
      iota: "\u03B9",
      iprod: "\u2A3C",
      iquest: "\xBF",
      Iscr: "\u2110",
      iscr: "\u{1D4BE}",
      isin: "\u2208",
      isindot: "\u22F5",
      isinE: "\u22F9",
      isins: "\u22F4",
      isinsv: "\u22F3",
      isinv: "\u2208",
      it: "\u2062",
      Itilde: "\u0128",
      itilde: "\u0129",
      Iukcy: "\u0406",
      iukcy: "\u0456",
      Iuml: "\xCF",
      iuml: "\xEF",
      Jcirc: "\u0134",
      jcirc: "\u0135",
      Jcy: "\u0419",
      jcy: "\u0439",
      Jfr: "\u{1D50D}",
      jfr: "\u{1D527}",
      jmath: "\u0237",
      Jopf: "\u{1D541}",
      jopf: "\u{1D55B}",
      Jscr: "\u{1D4A5}",
      jscr: "\u{1D4BF}",
      Jsercy: "\u0408",
      jsercy: "\u0458",
      Jukcy: "\u0404",
      jukcy: "\u0454",
      Kappa: "\u039A",
      kappa: "\u03BA",
      kappav: "\u03F0",
      Kcedil: "\u0136",
      kcedil: "\u0137",
      Kcy: "\u041A",
      kcy: "\u043A",
      Kfr: "\u{1D50E}",
      kfr: "\u{1D528}",
      kgreen: "\u0138",
      KHcy: "\u0425",
      khcy: "\u0445",
      KJcy: "\u040C",
      kjcy: "\u045C",
      Kopf: "\u{1D542}",
      kopf: "\u{1D55C}",
      Kscr: "\u{1D4A6}",
      kscr: "\u{1D4C0}",
      lAarr: "\u21DA",
      Lacute: "\u0139",
      lacute: "\u013A",
      laemptyv: "\u29B4",
      lagran: "\u2112",
      Lambda: "\u039B",
      lambda: "\u03BB",
      Lang: "\u27EA",
      lang: "\u27E8",
      langd: "\u2991",
      langle: "\u27E8",
      lap: "\u2A85",
      Laplacetrf: "\u2112",
      laquo: "\xAB",
      Larr: "\u219E",
      lArr: "\u21D0",
      larr: "\u2190",
      larrb: "\u21E4",
      larrbfs: "\u291F",
      larrfs: "\u291D",
      larrhk: "\u21A9",
      larrlp: "\u21AB",
      larrpl: "\u2939",
      larrsim: "\u2973",
      larrtl: "\u21A2",
      lat: "\u2AAB",
      lAtail: "\u291B",
      latail: "\u2919",
      late: "\u2AAD",
      lates: "\u2AAD\uFE00",
      lBarr: "\u290E",
      lbarr: "\u290C",
      lbbrk: "\u2772",
      lbrace: "{",
      lbrack: "[",
      lbrke: "\u298B",
      lbrksld: "\u298F",
      lbrkslu: "\u298D",
      Lcaron: "\u013D",
      lcaron: "\u013E",
      Lcedil: "\u013B",
      lcedil: "\u013C",
      lceil: "\u2308",
      lcub: "{",
      Lcy: "\u041B",
      lcy: "\u043B",
      ldca: "\u2936",
      ldquo: "\u201C",
      ldquor: "\u201E",
      ldrdhar: "\u2967",
      ldrushar: "\u294B",
      ldsh: "\u21B2",
      lE: "\u2266",
      le: "\u2264",
      LeftAngleBracket: "\u27E8",
      LeftArrow: "\u2190",
      Leftarrow: "\u21D0",
      leftarrow: "\u2190",
      LeftArrowBar: "\u21E4",
      LeftArrowRightArrow: "\u21C6",
      leftarrowtail: "\u21A2",
      LeftCeiling: "\u2308",
      LeftDoubleBracket: "\u27E6",
      LeftDownTeeVector: "\u2961",
      LeftDownVector: "\u21C3",
      LeftDownVectorBar: "\u2959",
      LeftFloor: "\u230A",
      leftharpoondown: "\u21BD",
      leftharpoonup: "\u21BC",
      leftleftarrows: "\u21C7",
      LeftRightArrow: "\u2194",
      Leftrightarrow: "\u21D4",
      leftrightarrow: "\u2194",
      leftrightarrows: "\u21C6",
      leftrightharpoons: "\u21CB",
      leftrightsquigarrow: "\u21AD",
      LeftRightVector: "\u294E",
      LeftTee: "\u22A3",
      LeftTeeArrow: "\u21A4",
      LeftTeeVector: "\u295A",
      leftthreetimes: "\u22CB",
      LeftTriangle: "\u22B2",
      LeftTriangleBar: "\u29CF",
      LeftTriangleEqual: "\u22B4",
      LeftUpDownVector: "\u2951",
      LeftUpTeeVector: "\u2960",
      LeftUpVector: "\u21BF",
      LeftUpVectorBar: "\u2958",
      LeftVector: "\u21BC",
      LeftVectorBar: "\u2952",
      lEg: "\u2A8B",
      leg: "\u22DA",
      leq: "\u2264",
      leqq: "\u2266",
      leqslant: "\u2A7D",
      les: "\u2A7D",
      lescc: "\u2AA8",
      lesdot: "\u2A7F",
      lesdoto: "\u2A81",
      lesdotor: "\u2A83",
      lesg: "\u22DA\uFE00",
      lesges: "\u2A93",
      lessapprox: "\u2A85",
      lessdot: "\u22D6",
      lesseqgtr: "\u22DA",
      lesseqqgtr: "\u2A8B",
      LessEqualGreater: "\u22DA",
      LessFullEqual: "\u2266",
      LessGreater: "\u2276",
      lessgtr: "\u2276",
      LessLess: "\u2AA1",
      lesssim: "\u2272",
      LessSlantEqual: "\u2A7D",
      LessTilde: "\u2272",
      lfisht: "\u297C",
      lfloor: "\u230A",
      Lfr: "\u{1D50F}",
      lfr: "\u{1D529}",
      lg: "\u2276",
      lgE: "\u2A91",
      lHar: "\u2962",
      lhard: "\u21BD",
      lharu: "\u21BC",
      lharul: "\u296A",
      lhblk: "\u2584",
      LJcy: "\u0409",
      ljcy: "\u0459",
      Ll: "\u22D8",
      ll: "\u226A",
      llarr: "\u21C7",
      llcorner: "\u231E",
      Lleftarrow: "\u21DA",
      llhard: "\u296B",
      lltri: "\u25FA",
      Lmidot: "\u013F",
      lmidot: "\u0140",
      lmoust: "\u23B0",
      lmoustache: "\u23B0",
      lnap: "\u2A89",
      lnapprox: "\u2A89",
      lnE: "\u2268",
      lne: "\u2A87",
      lneq: "\u2A87",
      lneqq: "\u2268",
      lnsim: "\u22E6",
      loang: "\u27EC",
      loarr: "\u21FD",
      lobrk: "\u27E6",
      LongLeftArrow: "\u27F5",
      Longleftarrow: "\u27F8",
      longleftarrow: "\u27F5",
      LongLeftRightArrow: "\u27F7",
      Longleftrightarrow: "\u27FA",
      longleftrightarrow: "\u27F7",
      longmapsto: "\u27FC",
      LongRightArrow: "\u27F6",
      Longrightarrow: "\u27F9",
      longrightarrow: "\u27F6",
      looparrowleft: "\u21AB",
      looparrowright: "\u21AC",
      lopar: "\u2985",
      Lopf: "\u{1D543}",
      lopf: "\u{1D55D}",
      loplus: "\u2A2D",
      lotimes: "\u2A34",
      lowast: "\u2217",
      lowbar: "_",
      LowerLeftArrow: "\u2199",
      LowerRightArrow: "\u2198",
      loz: "\u25CA",
      lozenge: "\u25CA",
      lozf: "\u29EB",
      lpar: "(",
      lparlt: "\u2993",
      lrarr: "\u21C6",
      lrcorner: "\u231F",
      lrhar: "\u21CB",
      lrhard: "\u296D",
      lrm: "\u200E",
      lrtri: "\u22BF",
      lsaquo: "\u2039",
      Lscr: "\u2112",
      lscr: "\u{1D4C1}",
      Lsh: "\u21B0",
      lsh: "\u21B0",
      lsim: "\u2272",
      lsime: "\u2A8D",
      lsimg: "\u2A8F",
      lsqb: "[",
      lsquo: "\u2018",
      lsquor: "\u201A",
      Lstrok: "\u0141",
      lstrok: "\u0142",
      Lt: "\u226A",
      LT: "<",
      lt: "<",
      ltcc: "\u2AA6",
      ltcir: "\u2A79",
      ltdot: "\u22D6",
      lthree: "\u22CB",
      ltimes: "\u22C9",
      ltlarr: "\u2976",
      ltquest: "\u2A7B",
      ltri: "\u25C3",
      ltrie: "\u22B4",
      ltrif: "\u25C2",
      ltrPar: "\u2996",
      lurdshar: "\u294A",
      luruhar: "\u2966",
      lvertneqq: "\u2268\uFE00",
      lvnE: "\u2268\uFE00",
      macr: "\xAF",
      male: "\u2642",
      malt: "\u2720",
      maltese: "\u2720",
      Map: "\u2905",
      map: "\u21A6",
      mapsto: "\u21A6",
      mapstodown: "\u21A7",
      mapstoleft: "\u21A4",
      mapstoup: "\u21A5",
      marker: "\u25AE",
      mcomma: "\u2A29",
      Mcy: "\u041C",
      mcy: "\u043C",
      mdash: "\u2014",
      mDDot: "\u223A",
      measuredangle: "\u2221",
      MediumSpace: "\u205F",
      Mellintrf: "\u2133",
      Mfr: "\u{1D510}",
      mfr: "\u{1D52A}",
      mho: "\u2127",
      micro: "\xB5",
      mid: "\u2223",
      midast: "*",
      midcir: "\u2AF0",
      middot: "\xB7",
      minus: "\u2212",
      minusb: "\u229F",
      minusd: "\u2238",
      minusdu: "\u2A2A",
      MinusPlus: "\u2213",
      mlcp: "\u2ADB",
      mldr: "\u2026",
      mnplus: "\u2213",
      models: "\u22A7",
      Mopf: "\u{1D544}",
      mopf: "\u{1D55E}",
      mp: "\u2213",
      Mscr: "\u2133",
      mscr: "\u{1D4C2}",
      mstpos: "\u223E",
      Mu: "\u039C",
      mu: "\u03BC",
      multimap: "\u22B8",
      mumap: "\u22B8",
      nabla: "\u2207",
      Nacute: "\u0143",
      nacute: "\u0144",
      nang: "\u2220\u20D2",
      nap: "\u2249",
      napE: "\u2A70\u0338",
      napid: "\u224B\u0338",
      napos: "\u0149",
      napprox: "\u2249",
      natur: "\u266E",
      natural: "\u266E",
      naturals: "\u2115",
      nbsp: "\xA0",
      nbump: "\u224E\u0338",
      nbumpe: "\u224F\u0338",
      ncap: "\u2A43",
      Ncaron: "\u0147",
      ncaron: "\u0148",
      Ncedil: "\u0145",
      ncedil: "\u0146",
      ncong: "\u2247",
      ncongdot: "\u2A6D\u0338",
      ncup: "\u2A42",
      Ncy: "\u041D",
      ncy: "\u043D",
      ndash: "\u2013",
      ne: "\u2260",
      nearhk: "\u2924",
      neArr: "\u21D7",
      nearr: "\u2197",
      nearrow: "\u2197",
      nedot: "\u2250\u0338",
      NegativeMediumSpace: "\u200B",
      NegativeThickSpace: "\u200B",
      NegativeThinSpace: "\u200B",
      NegativeVeryThinSpace: "\u200B",
      nequiv: "\u2262",
      nesear: "\u2928",
      nesim: "\u2242\u0338",
      NestedGreaterGreater: "\u226B",
      NestedLessLess: "\u226A",
      NewLine: "\n",
      nexist: "\u2204",
      nexists: "\u2204",
      Nfr: "\u{1D511}",
      nfr: "\u{1D52B}",
      ngE: "\u2267\u0338",
      nge: "\u2271",
      ngeq: "\u2271",
      ngeqq: "\u2267\u0338",
      ngeqslant: "\u2A7E\u0338",
      nges: "\u2A7E\u0338",
      nGg: "\u22D9\u0338",
      ngsim: "\u2275",
      nGt: "\u226B\u20D2",
      ngt: "\u226F",
      ngtr: "\u226F",
      nGtv: "\u226B\u0338",
      nhArr: "\u21CE",
      nharr: "\u21AE",
      nhpar: "\u2AF2",
      ni: "\u220B",
      nis: "\u22FC",
      nisd: "\u22FA",
      niv: "\u220B",
      NJcy: "\u040A",
      njcy: "\u045A",
      nlArr: "\u21CD",
      nlarr: "\u219A",
      nldr: "\u2025",
      nlE: "\u2266\u0338",
      nle: "\u2270",
      nLeftarrow: "\u21CD",
      nleftarrow: "\u219A",
      nLeftrightarrow: "\u21CE",
      nleftrightarrow: "\u21AE",
      nleq: "\u2270",
      nleqq: "\u2266\u0338",
      nleqslant: "\u2A7D\u0338",
      nles: "\u2A7D\u0338",
      nless: "\u226E",
      nLl: "\u22D8\u0338",
      nlsim: "\u2274",
      nLt: "\u226A\u20D2",
      nlt: "\u226E",
      nltri: "\u22EA",
      nltrie: "\u22EC",
      nLtv: "\u226A\u0338",
      nmid: "\u2224",
      NoBreak: "\u2060",
      NonBreakingSpace: "\xA0",
      Nopf: "\u2115",
      nopf: "\u{1D55F}",
      Not: "\u2AEC",
      not: "\xAC",
      NotCongruent: "\u2262",
      NotCupCap: "\u226D",
      NotDoubleVerticalBar: "\u2226",
      NotElement: "\u2209",
      NotEqual: "\u2260",
      NotEqualTilde: "\u2242\u0338",
      NotExists: "\u2204",
      NotGreater: "\u226F",
      NotGreaterEqual: "\u2271",
      NotGreaterFullEqual: "\u2267\u0338",
      NotGreaterGreater: "\u226B\u0338",
      NotGreaterLess: "\u2279",
      NotGreaterSlantEqual: "\u2A7E\u0338",
      NotGreaterTilde: "\u2275",
      NotHumpDownHump: "\u224E\u0338",
      NotHumpEqual: "\u224F\u0338",
      notin: "\u2209",
      notindot: "\u22F5\u0338",
      notinE: "\u22F9\u0338",
      notinva: "\u2209",
      notinvb: "\u22F7",
      notinvc: "\u22F6",
      NotLeftTriangle: "\u22EA",
      NotLeftTriangleBar: "\u29CF\u0338",
      NotLeftTriangleEqual: "\u22EC",
      NotLess: "\u226E",
      NotLessEqual: "\u2270",
      NotLessGreater: "\u2278",
      NotLessLess: "\u226A\u0338",
      NotLessSlantEqual: "\u2A7D\u0338",
      NotLessTilde: "\u2274",
      NotNestedGreaterGreater: "\u2AA2\u0338",
      NotNestedLessLess: "\u2AA1\u0338",
      notni: "\u220C",
      notniva: "\u220C",
      notnivb: "\u22FE",
      notnivc: "\u22FD",
      NotPrecedes: "\u2280",
      NotPrecedesEqual: "\u2AAF\u0338",
      NotPrecedesSlantEqual: "\u22E0",
      NotReverseElement: "\u220C",
      NotRightTriangle: "\u22EB",
      NotRightTriangleBar: "\u29D0\u0338",
      NotRightTriangleEqual: "\u22ED",
      NotSquareSubset: "\u228F\u0338",
      NotSquareSubsetEqual: "\u22E2",
      NotSquareSuperset: "\u2290\u0338",
      NotSquareSupersetEqual: "\u22E3",
      NotSubset: "\u2282\u20D2",
      NotSubsetEqual: "\u2288",
      NotSucceeds: "\u2281",
      NotSucceedsEqual: "\u2AB0\u0338",
      NotSucceedsSlantEqual: "\u22E1",
      NotSucceedsTilde: "\u227F\u0338",
      NotSuperset: "\u2283\u20D2",
      NotSupersetEqual: "\u2289",
      NotTilde: "\u2241",
      NotTildeEqual: "\u2244",
      NotTildeFullEqual: "\u2247",
      NotTildeTilde: "\u2249",
      NotVerticalBar: "\u2224",
      npar: "\u2226",
      nparallel: "\u2226",
      nparsl: "\u2AFD\u20E5",
      npart: "\u2202\u0338",
      npolint: "\u2A14",
      npr: "\u2280",
      nprcue: "\u22E0",
      npre: "\u2AAF\u0338",
      nprec: "\u2280",
      npreceq: "\u2AAF\u0338",
      nrArr: "\u21CF",
      nrarr: "\u219B",
      nrarrc: "\u2933\u0338",
      nrarrw: "\u219D\u0338",
      nRightarrow: "\u21CF",
      nrightarrow: "\u219B",
      nrtri: "\u22EB",
      nrtrie: "\u22ED",
      nsc: "\u2281",
      nsccue: "\u22E1",
      nsce: "\u2AB0\u0338",
      Nscr: "\u{1D4A9}",
      nscr: "\u{1D4C3}",
      nshortmid: "\u2224",
      nshortparallel: "\u2226",
      nsim: "\u2241",
      nsime: "\u2244",
      nsimeq: "\u2244",
      nsmid: "\u2224",
      nspar: "\u2226",
      nsqsube: "\u22E2",
      nsqsupe: "\u22E3",
      nsub: "\u2284",
      nsubE: "\u2AC5\u0338",
      nsube: "\u2288",
      nsubset: "\u2282\u20D2",
      nsubseteq: "\u2288",
      nsubseteqq: "\u2AC5\u0338",
      nsucc: "\u2281",
      nsucceq: "\u2AB0\u0338",
      nsup: "\u2285",
      nsupE: "\u2AC6\u0338",
      nsupe: "\u2289",
      nsupset: "\u2283\u20D2",
      nsupseteq: "\u2289",
      nsupseteqq: "\u2AC6\u0338",
      ntgl: "\u2279",
      Ntilde: "\xD1",
      ntilde: "\xF1",
      ntlg: "\u2278",
      ntriangleleft: "\u22EA",
      ntrianglelefteq: "\u22EC",
      ntriangleright: "\u22EB",
      ntrianglerighteq: "\u22ED",
      Nu: "\u039D",
      nu: "\u03BD",
      num: "#",
      numero: "\u2116",
      numsp: "\u2007",
      nvap: "\u224D\u20D2",
      nVDash: "\u22AF",
      nVdash: "\u22AE",
      nvDash: "\u22AD",
      nvdash: "\u22AC",
      nvge: "\u2265\u20D2",
      nvgt: ">\u20D2",
      nvHarr: "\u2904",
      nvinfin: "\u29DE",
      nvlArr: "\u2902",
      nvle: "\u2264\u20D2",
      nvlt: "<\u20D2",
      nvltrie: "\u22B4\u20D2",
      nvrArr: "\u2903",
      nvrtrie: "\u22B5\u20D2",
      nvsim: "\u223C\u20D2",
      nwarhk: "\u2923",
      nwArr: "\u21D6",
      nwarr: "\u2196",
      nwarrow: "\u2196",
      nwnear: "\u2927",
      Oacute: "\xD3",
      oacute: "\xF3",
      oast: "\u229B",
      ocir: "\u229A",
      Ocirc: "\xD4",
      ocirc: "\xF4",
      Ocy: "\u041E",
      ocy: "\u043E",
      odash: "\u229D",
      Odblac: "\u0150",
      odblac: "\u0151",
      odiv: "\u2A38",
      odot: "\u2299",
      odsold: "\u29BC",
      OElig: "\u0152",
      oelig: "\u0153",
      ofcir: "\u29BF",
      Ofr: "\u{1D512}",
      ofr: "\u{1D52C}",
      ogon: "\u02DB",
      Ograve: "\xD2",
      ograve: "\xF2",
      ogt: "\u29C1",
      ohbar: "\u29B5",
      ohm: "\u03A9",
      oint: "\u222E",
      olarr: "\u21BA",
      olcir: "\u29BE",
      olcross: "\u29BB",
      oline: "\u203E",
      olt: "\u29C0",
      Omacr: "\u014C",
      omacr: "\u014D",
      Omega: "\u03A9",
      omega: "\u03C9",
      Omicron: "\u039F",
      omicron: "\u03BF",
      omid: "\u29B6",
      ominus: "\u2296",
      Oopf: "\u{1D546}",
      oopf: "\u{1D560}",
      opar: "\u29B7",
      OpenCurlyDoubleQuote: "\u201C",
      OpenCurlyQuote: "\u2018",
      operp: "\u29B9",
      oplus: "\u2295",
      Or: "\u2A54",
      or: "\u2228",
      orarr: "\u21BB",
      ord: "\u2A5D",
      order: "\u2134",
      orderof: "\u2134",
      ordf: "\xAA",
      ordm: "\xBA",
      origof: "\u22B6",
      oror: "\u2A56",
      orslope: "\u2A57",
      orv: "\u2A5B",
      oS: "\u24C8",
      Oscr: "\u{1D4AA}",
      oscr: "\u2134",
      Oslash: "\xD8",
      oslash: "\xF8",
      osol: "\u2298",
      Otilde: "\xD5",
      otilde: "\xF5",
      Otimes: "\u2A37",
      otimes: "\u2297",
      otimesas: "\u2A36",
      Ouml: "\xD6",
      ouml: "\xF6",
      ovbar: "\u233D",
      OverBar: "\u203E",
      OverBrace: "\u23DE",
      OverBracket: "\u23B4",
      OverParenthesis: "\u23DC",
      par: "\u2225",
      para: "\xB6",
      parallel: "\u2225",
      parsim: "\u2AF3",
      parsl: "\u2AFD",
      part: "\u2202",
      PartialD: "\u2202",
      Pcy: "\u041F",
      pcy: "\u043F",
      percnt: "%",
      period: ".",
      permil: "\u2030",
      perp: "\u22A5",
      pertenk: "\u2031",
      Pfr: "\u{1D513}",
      pfr: "\u{1D52D}",
      Phi: "\u03A6",
      phi: "\u03C6",
      phiv: "\u03D5",
      phmmat: "\u2133",
      phone: "\u260E",
      Pi: "\u03A0",
      pi: "\u03C0",
      pitchfork: "\u22D4",
      piv: "\u03D6",
      planck: "\u210F",
      planckh: "\u210E",
      plankv: "\u210F",
      plus: "+",
      plusacir: "\u2A23",
      plusb: "\u229E",
      pluscir: "\u2A22",
      plusdo: "\u2214",
      plusdu: "\u2A25",
      pluse: "\u2A72",
      PlusMinus: "\xB1",
      plusmn: "\xB1",
      plussim: "\u2A26",
      plustwo: "\u2A27",
      pm: "\xB1",
      Poincareplane: "\u210C",
      pointint: "\u2A15",
      Popf: "\u2119",
      popf: "\u{1D561}",
      pound: "\xA3",
      Pr: "\u2ABB",
      pr: "\u227A",
      prap: "\u2AB7",
      prcue: "\u227C",
      prE: "\u2AB3",
      pre: "\u2AAF",
      prec: "\u227A",
      precapprox: "\u2AB7",
      preccurlyeq: "\u227C",
      Precedes: "\u227A",
      PrecedesEqual: "\u2AAF",
      PrecedesSlantEqual: "\u227C",
      PrecedesTilde: "\u227E",
      preceq: "\u2AAF",
      precnapprox: "\u2AB9",
      precneqq: "\u2AB5",
      precnsim: "\u22E8",
      precsim: "\u227E",
      Prime: "\u2033",
      prime: "\u2032",
      primes: "\u2119",
      prnap: "\u2AB9",
      prnE: "\u2AB5",
      prnsim: "\u22E8",
      prod: "\u220F",
      Product: "\u220F",
      profalar: "\u232E",
      profline: "\u2312",
      profsurf: "\u2313",
      prop: "\u221D",
      Proportion: "\u2237",
      Proportional: "\u221D",
      propto: "\u221D",
      prsim: "\u227E",
      prurel: "\u22B0",
      Pscr: "\u{1D4AB}",
      pscr: "\u{1D4C5}",
      Psi: "\u03A8",
      psi: "\u03C8",
      puncsp: "\u2008",
      Qfr: "\u{1D514}",
      qfr: "\u{1D52E}",
      qint: "\u2A0C",
      Qopf: "\u211A",
      qopf: "\u{1D562}",
      qprime: "\u2057",
      Qscr: "\u{1D4AC}",
      qscr: "\u{1D4C6}",
      quaternions: "\u210D",
      quatint: "\u2A16",
      quest: "?",
      questeq: "\u225F",
      QUOT: '"',
      quot: '"',
      rAarr: "\u21DB",
      race: "\u223D\u0331",
      Racute: "\u0154",
      racute: "\u0155",
      radic: "\u221A",
      raemptyv: "\u29B3",
      Rang: "\u27EB",
      rang: "\u27E9",
      rangd: "\u2992",
      range: "\u29A5",
      rangle: "\u27E9",
      raquo: "\xBB",
      Rarr: "\u21A0",
      rArr: "\u21D2",
      rarr: "\u2192",
      rarrap: "\u2975",
      rarrb: "\u21E5",
      rarrbfs: "\u2920",
      rarrc: "\u2933",
      rarrfs: "\u291E",
      rarrhk: "\u21AA",
      rarrlp: "\u21AC",
      rarrpl: "\u2945",
      rarrsim: "\u2974",
      Rarrtl: "\u2916",
      rarrtl: "\u21A3",
      rarrw: "\u219D",
      rAtail: "\u291C",
      ratail: "\u291A",
      ratio: "\u2236",
      rationals: "\u211A",
      RBarr: "\u2910",
      rBarr: "\u290F",
      rbarr: "\u290D",
      rbbrk: "\u2773",
      rbrace: "}",
      rbrack: "]",
      rbrke: "\u298C",
      rbrksld: "\u298E",
      rbrkslu: "\u2990",
      Rcaron: "\u0158",
      rcaron: "\u0159",
      Rcedil: "\u0156",
      rcedil: "\u0157",
      rceil: "\u2309",
      rcub: "}",
      Rcy: "\u0420",
      rcy: "\u0440",
      rdca: "\u2937",
      rdldhar: "\u2969",
      rdquo: "\u201D",
      rdquor: "\u201D",
      rdsh: "\u21B3",
      Re: "\u211C",
      real: "\u211C",
      realine: "\u211B",
      realpart: "\u211C",
      reals: "\u211D",
      rect: "\u25AD",
      REG: "\xAE",
      reg: "\xAE",
      ReverseElement: "\u220B",
      ReverseEquilibrium: "\u21CB",
      ReverseUpEquilibrium: "\u296F",
      rfisht: "\u297D",
      rfloor: "\u230B",
      Rfr: "\u211C",
      rfr: "\u{1D52F}",
      rHar: "\u2964",
      rhard: "\u21C1",
      rharu: "\u21C0",
      rharul: "\u296C",
      Rho: "\u03A1",
      rho: "\u03C1",
      rhov: "\u03F1",
      RightAngleBracket: "\u27E9",
      RightArrow: "\u2192",
      Rightarrow: "\u21D2",
      rightarrow: "\u2192",
      RightArrowBar: "\u21E5",
      RightArrowLeftArrow: "\u21C4",
      rightarrowtail: "\u21A3",
      RightCeiling: "\u2309",
      RightDoubleBracket: "\u27E7",
      RightDownTeeVector: "\u295D",
      RightDownVector: "\u21C2",
      RightDownVectorBar: "\u2955",
      RightFloor: "\u230B",
      rightharpoondown: "\u21C1",
      rightharpoonup: "\u21C0",
      rightleftarrows: "\u21C4",
      rightleftharpoons: "\u21CC",
      rightrightarrows: "\u21C9",
      rightsquigarrow: "\u219D",
      RightTee: "\u22A2",
      RightTeeArrow: "\u21A6",
      RightTeeVector: "\u295B",
      rightthreetimes: "\u22CC",
      RightTriangle: "\u22B3",
      RightTriangleBar: "\u29D0",
      RightTriangleEqual: "\u22B5",
      RightUpDownVector: "\u294F",
      RightUpTeeVector: "\u295C",
      RightUpVector: "\u21BE",
      RightUpVectorBar: "\u2954",
      RightVector: "\u21C0",
      RightVectorBar: "\u2953",
      ring: "\u02DA",
      risingdotseq: "\u2253",
      rlarr: "\u21C4",
      rlhar: "\u21CC",
      rlm: "\u200F",
      rmoust: "\u23B1",
      rmoustache: "\u23B1",
      rnmid: "\u2AEE",
      roang: "\u27ED",
      roarr: "\u21FE",
      robrk: "\u27E7",
      ropar: "\u2986",
      Ropf: "\u211D",
      ropf: "\u{1D563}",
      roplus: "\u2A2E",
      rotimes: "\u2A35",
      RoundImplies: "\u2970",
      rpar: ")",
      rpargt: "\u2994",
      rppolint: "\u2A12",
      rrarr: "\u21C9",
      Rrightarrow: "\u21DB",
      rsaquo: "\u203A",
      Rscr: "\u211B",
      rscr: "\u{1D4C7}",
      Rsh: "\u21B1",
      rsh: "\u21B1",
      rsqb: "]",
      rsquo: "\u2019",
      rsquor: "\u2019",
      rthree: "\u22CC",
      rtimes: "\u22CA",
      rtri: "\u25B9",
      rtrie: "\u22B5",
      rtrif: "\u25B8",
      rtriltri: "\u29CE",
      RuleDelayed: "\u29F4",
      ruluhar: "\u2968",
      rx: "\u211E",
      Sacute: "\u015A",
      sacute: "\u015B",
      sbquo: "\u201A",
      Sc: "\u2ABC",
      sc: "\u227B",
      scap: "\u2AB8",
      Scaron: "\u0160",
      scaron: "\u0161",
      sccue: "\u227D",
      scE: "\u2AB4",
      sce: "\u2AB0",
      Scedil: "\u015E",
      scedil: "\u015F",
      Scirc: "\u015C",
      scirc: "\u015D",
      scnap: "\u2ABA",
      scnE: "\u2AB6",
      scnsim: "\u22E9",
      scpolint: "\u2A13",
      scsim: "\u227F",
      Scy: "\u0421",
      scy: "\u0441",
      sdot: "\u22C5",
      sdotb: "\u22A1",
      sdote: "\u2A66",
      searhk: "\u2925",
      seArr: "\u21D8",
      searr: "\u2198",
      searrow: "\u2198",
      sect: "\xA7",
      semi: ";",
      seswar: "\u2929",
      setminus: "\u2216",
      setmn: "\u2216",
      sext: "\u2736",
      Sfr: "\u{1D516}",
      sfr: "\u{1D530}",
      sfrown: "\u2322",
      sharp: "\u266F",
      SHCHcy: "\u0429",
      shchcy: "\u0449",
      SHcy: "\u0428",
      shcy: "\u0448",
      ShortDownArrow: "\u2193",
      ShortLeftArrow: "\u2190",
      shortmid: "\u2223",
      shortparallel: "\u2225",
      ShortRightArrow: "\u2192",
      ShortUpArrow: "\u2191",
      shy: "\xAD",
      Sigma: "\u03A3",
      sigma: "\u03C3",
      sigmaf: "\u03C2",
      sigmav: "\u03C2",
      sim: "\u223C",
      simdot: "\u2A6A",
      sime: "\u2243",
      simeq: "\u2243",
      simg: "\u2A9E",
      simgE: "\u2AA0",
      siml: "\u2A9D",
      simlE: "\u2A9F",
      simne: "\u2246",
      simplus: "\u2A24",
      simrarr: "\u2972",
      slarr: "\u2190",
      SmallCircle: "\u2218",
      smallsetminus: "\u2216",
      smashp: "\u2A33",
      smeparsl: "\u29E4",
      smid: "\u2223",
      smile: "\u2323",
      smt: "\u2AAA",
      smte: "\u2AAC",
      smtes: "\u2AAC\uFE00",
      SOFTcy: "\u042C",
      softcy: "\u044C",
      sol: "/",
      solb: "\u29C4",
      solbar: "\u233F",
      Sopf: "\u{1D54A}",
      sopf: "\u{1D564}",
      spades: "\u2660",
      spadesuit: "\u2660",
      spar: "\u2225",
      sqcap: "\u2293",
      sqcaps: "\u2293\uFE00",
      sqcup: "\u2294",
      sqcups: "\u2294\uFE00",
      Sqrt: "\u221A",
      sqsub: "\u228F",
      sqsube: "\u2291",
      sqsubset: "\u228F",
      sqsubseteq: "\u2291",
      sqsup: "\u2290",
      sqsupe: "\u2292",
      sqsupset: "\u2290",
      sqsupseteq: "\u2292",
      squ: "\u25A1",
      Square: "\u25A1",
      square: "\u25A1",
      SquareIntersection: "\u2293",
      SquareSubset: "\u228F",
      SquareSubsetEqual: "\u2291",
      SquareSuperset: "\u2290",
      SquareSupersetEqual: "\u2292",
      SquareUnion: "\u2294",
      squarf: "\u25AA",
      squf: "\u25AA",
      srarr: "\u2192",
      Sscr: "\u{1D4AE}",
      sscr: "\u{1D4C8}",
      ssetmn: "\u2216",
      ssmile: "\u2323",
      sstarf: "\u22C6",
      Star: "\u22C6",
      star: "\u2606",
      starf: "\u2605",
      straightepsilon: "\u03F5",
      straightphi: "\u03D5",
      strns: "\xAF",
      Sub: "\u22D0",
      sub: "\u2282",
      subdot: "\u2ABD",
      subE: "\u2AC5",
      sube: "\u2286",
      subedot: "\u2AC3",
      submult: "\u2AC1",
      subnE: "\u2ACB",
      subne: "\u228A",
      subplus: "\u2ABF",
      subrarr: "\u2979",
      Subset: "\u22D0",
      subset: "\u2282",
      subseteq: "\u2286",
      subseteqq: "\u2AC5",
      SubsetEqual: "\u2286",
      subsetneq: "\u228A",
      subsetneqq: "\u2ACB",
      subsim: "\u2AC7",
      subsub: "\u2AD5",
      subsup: "\u2AD3",
      succ: "\u227B",
      succapprox: "\u2AB8",
      succcurlyeq: "\u227D",
      Succeeds: "\u227B",
      SucceedsEqual: "\u2AB0",
      SucceedsSlantEqual: "\u227D",
      SucceedsTilde: "\u227F",
      succeq: "\u2AB0",
      succnapprox: "\u2ABA",
      succneqq: "\u2AB6",
      succnsim: "\u22E9",
      succsim: "\u227F",
      SuchThat: "\u220B",
      Sum: "\u2211",
      sum: "\u2211",
      sung: "\u266A",
      Sup: "\u22D1",
      sup: "\u2283",
      sup1: "\xB9",
      sup2: "\xB2",
      sup3: "\xB3",
      supdot: "\u2ABE",
      supdsub: "\u2AD8",
      supE: "\u2AC6",
      supe: "\u2287",
      supedot: "\u2AC4",
      Superset: "\u2283",
      SupersetEqual: "\u2287",
      suphsol: "\u27C9",
      suphsub: "\u2AD7",
      suplarr: "\u297B",
      supmult: "\u2AC2",
      supnE: "\u2ACC",
      supne: "\u228B",
      supplus: "\u2AC0",
      Supset: "\u22D1",
      supset: "\u2283",
      supseteq: "\u2287",
      supseteqq: "\u2AC6",
      supsetneq: "\u228B",
      supsetneqq: "\u2ACC",
      supsim: "\u2AC8",
      supsub: "\u2AD4",
      supsup: "\u2AD6",
      swarhk: "\u2926",
      swArr: "\u21D9",
      swarr: "\u2199",
      swarrow: "\u2199",
      swnwar: "\u292A",
      szlig: "\xDF",
      Tab: "	",
      target: "\u2316",
      Tau: "\u03A4",
      tau: "\u03C4",
      tbrk: "\u23B4",
      Tcaron: "\u0164",
      tcaron: "\u0165",
      Tcedil: "\u0162",
      tcedil: "\u0163",
      Tcy: "\u0422",
      tcy: "\u0442",
      tdot: "\u20DB",
      telrec: "\u2315",
      Tfr: "\u{1D517}",
      tfr: "\u{1D531}",
      there4: "\u2234",
      Therefore: "\u2234",
      therefore: "\u2234",
      Theta: "\u0398",
      theta: "\u03B8",
      thetasym: "\u03D1",
      thetav: "\u03D1",
      thickapprox: "\u2248",
      thicksim: "\u223C",
      ThickSpace: "\u205F\u200A",
      thinsp: "\u2009",
      ThinSpace: "\u2009",
      thkap: "\u2248",
      thksim: "\u223C",
      THORN: "\xDE",
      thorn: "\xFE",
      Tilde: "\u223C",
      tilde: "\u02DC",
      TildeEqual: "\u2243",
      TildeFullEqual: "\u2245",
      TildeTilde: "\u2248",
      times: "\xD7",
      timesb: "\u22A0",
      timesbar: "\u2A31",
      timesd: "\u2A30",
      tint: "\u222D",
      toea: "\u2928",
      top: "\u22A4",
      topbot: "\u2336",
      topcir: "\u2AF1",
      Topf: "\u{1D54B}",
      topf: "\u{1D565}",
      topfork: "\u2ADA",
      tosa: "\u2929",
      tprime: "\u2034",
      TRADE: "\u2122",
      trade: "\u2122",
      triangle: "\u25B5",
      triangledown: "\u25BF",
      triangleleft: "\u25C3",
      trianglelefteq: "\u22B4",
      triangleq: "\u225C",
      triangleright: "\u25B9",
      trianglerighteq: "\u22B5",
      tridot: "\u25EC",
      trie: "\u225C",
      triminus: "\u2A3A",
      TripleDot: "\u20DB",
      triplus: "\u2A39",
      trisb: "\u29CD",
      tritime: "\u2A3B",
      trpezium: "\u23E2",
      Tscr: "\u{1D4AF}",
      tscr: "\u{1D4C9}",
      TScy: "\u0426",
      tscy: "\u0446",
      TSHcy: "\u040B",
      tshcy: "\u045B",
      Tstrok: "\u0166",
      tstrok: "\u0167",
      twixt: "\u226C",
      twoheadleftarrow: "\u219E",
      twoheadrightarrow: "\u21A0",
      Uacute: "\xDA",
      uacute: "\xFA",
      Uarr: "\u219F",
      uArr: "\u21D1",
      uarr: "\u2191",
      Uarrocir: "\u2949",
      Ubrcy: "\u040E",
      ubrcy: "\u045E",
      Ubreve: "\u016C",
      ubreve: "\u016D",
      Ucirc: "\xDB",
      ucirc: "\xFB",
      Ucy: "\u0423",
      ucy: "\u0443",
      udarr: "\u21C5",
      Udblac: "\u0170",
      udblac: "\u0171",
      udhar: "\u296E",
      ufisht: "\u297E",
      Ufr: "\u{1D518}",
      ufr: "\u{1D532}",
      Ugrave: "\xD9",
      ugrave: "\xF9",
      uHar: "\u2963",
      uharl: "\u21BF",
      uharr: "\u21BE",
      uhblk: "\u2580",
      ulcorn: "\u231C",
      ulcorner: "\u231C",
      ulcrop: "\u230F",
      ultri: "\u25F8",
      Umacr: "\u016A",
      umacr: "\u016B",
      uml: "\xA8",
      UnderBar: "_",
      UnderBrace: "\u23DF",
      UnderBracket: "\u23B5",
      UnderParenthesis: "\u23DD",
      Union: "\u22C3",
      UnionPlus: "\u228E",
      Uogon: "\u0172",
      uogon: "\u0173",
      Uopf: "\u{1D54C}",
      uopf: "\u{1D566}",
      UpArrow: "\u2191",
      Uparrow: "\u21D1",
      uparrow: "\u2191",
      UpArrowBar: "\u2912",
      UpArrowDownArrow: "\u21C5",
      UpDownArrow: "\u2195",
      Updownarrow: "\u21D5",
      updownarrow: "\u2195",
      UpEquilibrium: "\u296E",
      upharpoonleft: "\u21BF",
      upharpoonright: "\u21BE",
      uplus: "\u228E",
      UpperLeftArrow: "\u2196",
      UpperRightArrow: "\u2197",
      Upsi: "\u03D2",
      upsi: "\u03C5",
      upsih: "\u03D2",
      Upsilon: "\u03A5",
      upsilon: "\u03C5",
      UpTee: "\u22A5",
      UpTeeArrow: "\u21A5",
      upuparrows: "\u21C8",
      urcorn: "\u231D",
      urcorner: "\u231D",
      urcrop: "\u230E",
      Uring: "\u016E",
      uring: "\u016F",
      urtri: "\u25F9",
      Uscr: "\u{1D4B0}",
      uscr: "\u{1D4CA}",
      utdot: "\u22F0",
      Utilde: "\u0168",
      utilde: "\u0169",
      utri: "\u25B5",
      utrif: "\u25B4",
      uuarr: "\u21C8",
      Uuml: "\xDC",
      uuml: "\xFC",
      uwangle: "\u29A7",
      vangrt: "\u299C",
      varepsilon: "\u03F5",
      varkappa: "\u03F0",
      varnothing: "\u2205",
      varphi: "\u03D5",
      varpi: "\u03D6",
      varpropto: "\u221D",
      vArr: "\u21D5",
      varr: "\u2195",
      varrho: "\u03F1",
      varsigma: "\u03C2",
      varsubsetneq: "\u228A\uFE00",
      varsubsetneqq: "\u2ACB\uFE00",
      varsupsetneq: "\u228B\uFE00",
      varsupsetneqq: "\u2ACC\uFE00",
      vartheta: "\u03D1",
      vartriangleleft: "\u22B2",
      vartriangleright: "\u22B3",
      Vbar: "\u2AEB",
      vBar: "\u2AE8",
      vBarv: "\u2AE9",
      Vcy: "\u0412",
      vcy: "\u0432",
      VDash: "\u22AB",
      Vdash: "\u22A9",
      vDash: "\u22A8",
      vdash: "\u22A2",
      Vdashl: "\u2AE6",
      Vee: "\u22C1",
      vee: "\u2228",
      veebar: "\u22BB",
      veeeq: "\u225A",
      vellip: "\u22EE",
      Verbar: "\u2016",
      verbar: "|",
      Vert: "\u2016",
      vert: "|",
      VerticalBar: "\u2223",
      VerticalLine: "|",
      VerticalSeparator: "\u2758",
      VerticalTilde: "\u2240",
      VeryThinSpace: "\u200A",
      Vfr: "\u{1D519}",
      vfr: "\u{1D533}",
      vltri: "\u22B2",
      vnsub: "\u2282\u20D2",
      vnsup: "\u2283\u20D2",
      Vopf: "\u{1D54D}",
      vopf: "\u{1D567}",
      vprop: "\u221D",
      vrtri: "\u22B3",
      Vscr: "\u{1D4B1}",
      vscr: "\u{1D4CB}",
      vsubnE: "\u2ACB\uFE00",
      vsubne: "\u228A\uFE00",
      vsupnE: "\u2ACC\uFE00",
      vsupne: "\u228B\uFE00",
      Vvdash: "\u22AA",
      vzigzag: "\u299A",
      Wcirc: "\u0174",
      wcirc: "\u0175",
      wedbar: "\u2A5F",
      Wedge: "\u22C0",
      wedge: "\u2227",
      wedgeq: "\u2259",
      weierp: "\u2118",
      Wfr: "\u{1D51A}",
      wfr: "\u{1D534}",
      Wopf: "\u{1D54E}",
      wopf: "\u{1D568}",
      wp: "\u2118",
      wr: "\u2240",
      wreath: "\u2240",
      Wscr: "\u{1D4B2}",
      wscr: "\u{1D4CC}",
      xcap: "\u22C2",
      xcirc: "\u25EF",
      xcup: "\u22C3",
      xdtri: "\u25BD",
      Xfr: "\u{1D51B}",
      xfr: "\u{1D535}",
      xhArr: "\u27FA",
      xharr: "\u27F7",
      Xi: "\u039E",
      xi: "\u03BE",
      xlArr: "\u27F8",
      xlarr: "\u27F5",
      xmap: "\u27FC",
      xnis: "\u22FB",
      xodot: "\u2A00",
      Xopf: "\u{1D54F}",
      xopf: "\u{1D569}",
      xoplus: "\u2A01",
      xotime: "\u2A02",
      xrArr: "\u27F9",
      xrarr: "\u27F6",
      Xscr: "\u{1D4B3}",
      xscr: "\u{1D4CD}",
      xsqcup: "\u2A06",
      xuplus: "\u2A04",
      xutri: "\u25B3",
      xvee: "\u22C1",
      xwedge: "\u22C0",
      Yacute: "\xDD",
      yacute: "\xFD",
      YAcy: "\u042F",
      yacy: "\u044F",
      Ycirc: "\u0176",
      ycirc: "\u0177",
      Ycy: "\u042B",
      ycy: "\u044B",
      yen: "\xA5",
      Yfr: "\u{1D51C}",
      yfr: "\u{1D536}",
      YIcy: "\u0407",
      yicy: "\u0457",
      Yopf: "\u{1D550}",
      yopf: "\u{1D56A}",
      Yscr: "\u{1D4B4}",
      yscr: "\u{1D4CE}",
      YUcy: "\u042E",
      yucy: "\u044E",
      Yuml: "\u0178",
      yuml: "\xFF",
      Zacute: "\u0179",
      zacute: "\u017A",
      Zcaron: "\u017D",
      zcaron: "\u017E",
      Zcy: "\u0417",
      zcy: "\u0437",
      Zdot: "\u017B",
      zdot: "\u017C",
      zeetrf: "\u2128",
      ZeroWidthSpace: "\u200B",
      Zeta: "\u0396",
      zeta: "\u03B6",
      Zfr: "\u2128",
      zfr: "\u{1D537}",
      ZHcy: "\u0416",
      zhcy: "\u0436",
      zigrarr: "\u21DD",
      Zopf: "\u2124",
      zopf: "\u{1D56B}",
      Zscr: "\u{1D4B5}",
      zscr: "\u{1D4CF}",
      zwj: "\u200D",
      zwnj: "\u200C"
    });
    exports2.entityMap = exports2.HTML_ENTITIES;
  }
});

// node_modules/@xmldom/xmldom/lib/sax.js
var require_sax = __commonJS({
  "node_modules/@xmldom/xmldom/lib/sax.js"(exports2) {
    var NAMESPACE = require_conventions().NAMESPACE;
    var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
    var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
    var S_TAG = 0;
    var S_ATTR = 1;
    var S_ATTR_SPACE = 2;
    var S_EQ = 3;
    var S_ATTR_NOQUOT_VALUE = 4;
    var S_ATTR_END = 5;
    var S_TAG_SPACE = 6;
    var S_TAG_CLOSE = 7;
    function ParseError(message, locator) {
      this.message = message;
      this.locator = locator;
      if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
    }
    ParseError.prototype = new Error();
    ParseError.prototype.name = ParseError.name;
    function XMLReader() {
    }
    XMLReader.prototype = {
      parse: function(source, defaultNSMap, entityMap) {
        var domBuilder = this.domBuilder;
        domBuilder.startDocument();
        _copy(defaultNSMap, defaultNSMap = {});
        parse(
          source,
          defaultNSMap,
          entityMap,
          domBuilder,
          this.errorHandler
        );
        domBuilder.endDocument();
      }
    };
    function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
      function fixedFromCharCode(code) {
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        } else {
          return String.fromCharCode(code);
        }
      }
      function entityReplacer(a2) {
        var k = a2.slice(1, -1);
        if (Object.hasOwnProperty.call(entityMap, k)) {
          return entityMap[k];
        } else if (k.charAt(0) === "#") {
          return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
        } else {
          errorHandler.error("entity not found:" + a2);
          return a2;
        }
      }
      function appendText(end2) {
        if (end2 > start) {
          var xt = source.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
          locator && position(start);
          domBuilder.characters(xt, 0, end2 - start);
          start = end2;
        }
      }
      function position(p, m) {
        while (p >= lineEnd && (m = linePattern.exec(source))) {
          lineStart = m.index;
          lineEnd = lineStart + m[0].length;
          locator.lineNumber++;
        }
        locator.columnNumber = p - lineStart + 1;
      }
      var lineStart = 0;
      var lineEnd = 0;
      var linePattern = /.*(?:\r\n?|\n)|.*$/g;
      var locator = domBuilder.locator;
      var parseStack = [{ currentNSMap: defaultNSMapCopy }];
      var closeMap = {};
      var start = 0;
      while (true) {
        try {
          var tagStart = source.indexOf("<", start);
          if (tagStart < 0) {
            if (!source.substr(start).match(/^\s*$/)) {
              var doc = domBuilder.doc;
              var text = doc.createTextNode(source.substr(start));
              doc.appendChild(text);
              domBuilder.currentElement = text;
            }
            return;
          }
          if (tagStart > start) {
            appendText(tagStart);
          }
          switch (source.charAt(tagStart + 1)) {
            case "/":
              var end = source.indexOf(">", tagStart + 3);
              var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
              var config = parseStack.pop();
              if (end < 0) {
                tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
                end = tagStart + 1 + tagName.length;
              } else if (tagName.match(/\s</)) {
                tagName = tagName.replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " maybe not complete");
                end = tagStart + 1 + tagName.length;
              }
              var localNSMap = config.localNSMap;
              var endMatch = config.tagName == tagName;
              var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
              if (endIgnoreCaseMach) {
                domBuilder.endElement(config.uri, config.localName, tagName);
                if (localNSMap) {
                  for (var prefix in localNSMap) {
                    if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                      domBuilder.endPrefixMapping(prefix);
                    }
                  }
                }
                if (!endMatch) {
                  errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
                }
              } else {
                parseStack.push(config);
              }
              end++;
              break;
            // end elment
            case "?":
              locator && position(tagStart);
              end = parseInstruction(source, tagStart, domBuilder);
              break;
            case "!":
              locator && position(tagStart);
              end = parseDCC(source, tagStart, domBuilder, errorHandler);
              break;
            default:
              locator && position(tagStart);
              var el = new ElementAttributes();
              var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
              var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
              var len = el.length;
              if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
                el.closed = true;
                if (!entityMap.nbsp) {
                  errorHandler.warning("unclosed xml attribute");
                }
              }
              if (locator && len) {
                var locator2 = copyLocator(locator, {});
                for (var i = 0; i < len; i++) {
                  var a = el[i];
                  position(a.offset);
                  a.locator = copyLocator(locator, {});
                }
                domBuilder.locator = locator2;
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
                domBuilder.locator = locator;
              } else {
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
              }
              if (NAMESPACE.isHTML(el.uri) && !el.closed) {
                end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
              } else {
                end++;
              }
          }
        } catch (e) {
          if (e instanceof ParseError) {
            throw e;
          }
          errorHandler.error("element parse error: " + e);
          end = -1;
        }
        if (end > start) {
          start = end;
        } else {
          appendText(Math.max(tagStart, start) + 1);
        }
      }
    }
    function copyLocator(f, t) {
      t.lineNumber = f.lineNumber;
      t.columnNumber = f.columnNumber;
      return t;
    }
    function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
      function addAttribute(qname, value2, startIndex) {
        if (el.attributeNames.hasOwnProperty(qname)) {
          errorHandler.fatalError("Attribute " + qname + " redefined");
        }
        el.addValue(
          qname,
          // @see https://www.w3.org/TR/xml/#AVNormalize
          // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
          // - recursive replacement of (DTD) entity references
          // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
          value2.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer),
          startIndex
        );
      }
      var attrName;
      var value;
      var p = ++start;
      var s = S_TAG;
      while (true) {
        var c = source.charAt(p);
        switch (c) {
          case "=":
            if (s === S_ATTR) {
              attrName = source.slice(start, p);
              s = S_EQ;
            } else if (s === S_ATTR_SPACE) {
              s = S_EQ;
            } else {
              throw new Error("attribute equal must after attrName");
            }
            break;
          case "'":
          case '"':
            if (s === S_EQ || s === S_ATTR) {
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source.slice(start, p);
              }
              start = p + 1;
              p = source.indexOf(c, start);
              if (p > 0) {
                value = source.slice(start, p);
                addAttribute(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                throw new Error("attribute value no end '" + c + "' match");
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
              value = source.slice(start, p);
              addAttribute(attrName, value, start);
              errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
              start = p + 1;
              s = S_ATTR_END;
            } else {
              throw new Error('attribute value must after "="');
            }
            break;
          case "/":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                s = S_TAG_CLOSE;
                el.closed = true;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                break;
              case S_ATTR_SPACE:
                el.closed = true;
                break;
              //case S_EQ:
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            errorHandler.error("unexpected end of input");
            if (s == S_TAG) {
              el.setTagName(source.slice(start, p));
            }
            return p;
          case ">":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                break;
              //normal
              case S_ATTR_NOQUOT_VALUE:
              //Compatible state
              case S_ATTR:
                value = source.slice(start, p);
                if (value.slice(-1) === "/") {
                  el.closed = true;
                  value = value.slice(0, -1);
                }
              case S_ATTR_SPACE:
                if (s === S_ATTR_SPACE) {
                  value = attrName;
                }
                if (s == S_ATTR_NOQUOT_VALUE) {
                  errorHandler.warning('attribute "' + value + '" missed quot(")!');
                  addAttribute(attrName, value, start);
                } else {
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                  }
                  addAttribute(value, value, start);
                }
                break;
              case S_EQ:
                throw new Error("attribute value missed!!");
            }
            return p;
          /*xml space '\x20' | #x9 | #xD | #xA; */
          case "\x80":
            c = " ";
          default:
            if (c <= " ") {
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                  s = S_TAG_SPACE;
                  break;
                case S_ATTR:
                  attrName = source.slice(start, p);
                  s = S_ATTR_SPACE;
                  break;
                case S_ATTR_NOQUOT_VALUE:
                  var value = source.slice(start, p);
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  addAttribute(attrName, value, start);
                case S_ATTR_END:
                  s = S_TAG_SPACE;
                  break;
              }
            } else {
              switch (s) {
                //case S_TAG:void();break;
                //case S_ATTR:void();break;
                //case S_ATTR_NOQUOT_VALUE:void();break;
                case S_ATTR_SPACE:
                  var tagName = el.tagName;
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                  }
                  addAttribute(attrName, attrName, start);
                  start = p;
                  s = S_ATTR;
                  break;
                case S_ATTR_END:
                  errorHandler.warning('attribute space is required"' + attrName + '"!!');
                case S_TAG_SPACE:
                  s = S_ATTR;
                  start = p;
                  break;
                case S_EQ:
                  s = S_ATTR_NOQUOT_VALUE;
                  start = p;
                  break;
                case S_TAG_CLOSE:
                  throw new Error("elements closed character '/' and '>' must be connected to");
              }
            }
        }
        p++;
      }
    }
    function appendElement(el, domBuilder, currentNSMap) {
      var tagName = el.tagName;
      var localNSMap = null;
      var i = el.length;
      while (i--) {
        var a = el[i];
        var qName = a.qName;
        var value = a.value;
        var nsp = qName.indexOf(":");
        if (nsp > 0) {
          var prefix = a.prefix = qName.slice(0, nsp);
          var localName = qName.slice(nsp + 1);
          var nsPrefix = prefix === "xmlns" && localName;
        } else {
          localName = qName;
          prefix = null;
          nsPrefix = qName === "xmlns" && "";
        }
        a.localName = localName;
        if (nsPrefix !== false) {
          if (localNSMap == null) {
            localNSMap = {};
            _copy(currentNSMap, currentNSMap = {});
          }
          currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
          a.uri = NAMESPACE.XMLNS;
          domBuilder.startPrefixMapping(nsPrefix, value);
        }
      }
      var i = el.length;
      while (i--) {
        a = el[i];
        var prefix = a.prefix;
        if (prefix) {
          if (prefix === "xml") {
            a.uri = NAMESPACE.XML;
          }
          if (prefix !== "xmlns") {
            a.uri = currentNSMap[prefix || ""];
          }
        }
      }
      var nsp = tagName.indexOf(":");
      if (nsp > 0) {
        prefix = el.prefix = tagName.slice(0, nsp);
        localName = el.localName = tagName.slice(nsp + 1);
      } else {
        prefix = null;
        localName = el.localName = tagName;
      }
      var ns = el.uri = currentNSMap[prefix || ""];
      domBuilder.startElement(ns, localName, tagName, el);
      if (el.closed) {
        domBuilder.endElement(ns, localName, tagName);
        if (localNSMap) {
          for (prefix in localNSMap) {
            if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
              domBuilder.endPrefixMapping(prefix);
            }
          }
        }
      } else {
        el.currentNSMap = currentNSMap;
        el.localNSMap = localNSMap;
        return true;
      }
    }
    function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
      if (/^(?:script|textarea)$/i.test(tagName)) {
        var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
        var text = source.substring(elStartEnd + 1, elEndStart);
        if (/[&<]/.test(text)) {
          if (/^script$/i.test(tagName)) {
            domBuilder.characters(text, 0, text.length);
            return elEndStart;
          }
          text = text.replace(/&#?\w+;/g, entityReplacer);
          domBuilder.characters(text, 0, text.length);
          return elEndStart;
        }
      }
      return elStartEnd + 1;
    }
    function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
      var pos = closeMap[tagName];
      if (pos == null) {
        pos = source.lastIndexOf("</" + tagName + ">");
        if (pos < elStartEnd) {
          pos = source.lastIndexOf("</" + tagName);
        }
        closeMap[tagName] = pos;
      }
      return pos < elStartEnd;
    }
    function _copy(source, target) {
      for (var n in source) {
        if (Object.prototype.hasOwnProperty.call(source, n)) {
          target[n] = source[n];
        }
      }
    }
    function parseDCC(source, start, domBuilder, errorHandler) {
      var next = source.charAt(start + 2);
      switch (next) {
        case "-":
          if (source.charAt(start + 3) === "-") {
            var end = source.indexOf("-->", start + 4);
            if (end > start) {
              domBuilder.comment(source, start + 4, end - start - 4);
              return end + 3;
            } else {
              errorHandler.error("Unclosed comment");
              return -1;
            }
          } else {
            return -1;
          }
        default:
          if (source.substr(start + 3, 6) == "CDATA[") {
            var end = source.indexOf("]]>", start + 9);
            domBuilder.startCDATA();
            domBuilder.characters(source, start + 9, end - start - 9);
            domBuilder.endCDATA();
            return end + 3;
          }
          var matchs = split(source, start);
          var len = matchs.length;
          if (len > 1 && /!doctype/i.test(matchs[0][0])) {
            var name = matchs[1][0];
            var pubid = false;
            var sysid = false;
            if (len > 3) {
              if (/^public$/i.test(matchs[2][0])) {
                pubid = matchs[3][0];
                sysid = len > 4 && matchs[4][0];
              } else if (/^system$/i.test(matchs[2][0])) {
                sysid = matchs[3][0];
              }
            }
            var lastMatch = matchs[len - 1];
            domBuilder.startDTD(name, pubid, sysid);
            domBuilder.endDTD();
            return lastMatch.index + lastMatch[0].length;
          }
      }
      return -1;
    }
    function parseInstruction(source, start, domBuilder) {
      var end = source.indexOf("?>", start);
      if (end) {
        var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
        if (match) {
          var len = match[0].length;
          domBuilder.processingInstruction(match[1], match[2]);
          return end + 2;
        } else {
          return -1;
        }
      }
      return -1;
    }
    function ElementAttributes() {
      this.attributeNames = {};
    }
    ElementAttributes.prototype = {
      setTagName: function(tagName) {
        if (!tagNamePattern.test(tagName)) {
          throw new Error("invalid tagName:" + tagName);
        }
        this.tagName = tagName;
      },
      addValue: function(qName, value, offset) {
        if (!tagNamePattern.test(qName)) {
          throw new Error("invalid attribute:" + qName);
        }
        this.attributeNames[qName] = this.length;
        this[this.length++] = { qName, value, offset };
      },
      length: 0,
      getLocalName: function(i) {
        return this[i].localName;
      },
      getLocator: function(i) {
        return this[i].locator;
      },
      getQName: function(i) {
        return this[i].qName;
      },
      getURI: function(i) {
        return this[i].uri;
      },
      getValue: function(i) {
        return this[i].value;
      }
      //	,getIndex:function(uri, localName)){
      //		if(localName){
      //
      //		}else{
      //			var qName = uri
      //		}
      //	},
      //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
      //	getType:function(uri,localName){}
      //	getType:function(i){},
    };
    function split(source, start) {
      var match;
      var buf = [];
      var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
      reg.lastIndex = start;
      reg.exec(source);
      while (match = reg.exec(source)) {
        buf.push(match);
        if (match[1]) return buf;
      }
    }
    exports2.XMLReader = XMLReader;
    exports2.ParseError = ParseError;
  }
});

// node_modules/@xmldom/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports2) {
    var conventions = require_conventions();
    var dom = require_dom();
    var entities = require_entities();
    var sax = require_sax();
    var DOMImplementation = dom.DOMImplementation;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = sax.ParseError;
    var XMLReader = sax.XMLReader;
    function normalizeLineEndings(input) {
      return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
    }
    function DOMParser(options) {
      this.options = options || { locator: {} };
    }
    DOMParser.prototype.parseFromString = function(source, mimeType) {
      var options = this.options;
      var sax2 = new XMLReader();
      var domBuilder = options.domBuilder || new DOMHandler();
      var errorHandler = options.errorHandler;
      var locator = options.locator;
      var defaultNSMap = options.xmlns || {};
      var isHTML = /\/x?html?$/.test(mimeType);
      var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
      if (locator) {
        domBuilder.setDocumentLocator(locator);
      }
      sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
      sax2.domBuilder = options.domBuilder || domBuilder;
      if (isHTML) {
        defaultNSMap[""] = NAMESPACE.HTML;
      }
      defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
      var normalize = options.normalizeLineEndings || normalizeLineEndings;
      if (source && typeof source === "string") {
        sax2.parse(
          normalize(source),
          defaultNSMap,
          entityMap
        );
      } else {
        sax2.errorHandler.error("invalid doc source");
      }
      return domBuilder.doc;
    };
    function buildErrorHandler(errorImpl, domBuilder, locator) {
      if (!errorImpl) {
        if (domBuilder instanceof DOMHandler) {
          return domBuilder;
        }
        errorImpl = domBuilder;
      }
      var errorHandler = {};
      var isCallback = errorImpl instanceof Function;
      locator = locator || {};
      function build(key) {
        var fn = errorImpl[key];
        if (!fn && isCallback) {
          fn = errorImpl.length == 2 ? function(msg) {
            errorImpl(key, msg);
          } : errorImpl;
        }
        errorHandler[key] = fn && function(msg) {
          fn("[xmldom " + key + "]	" + msg + _locator(locator));
        } || function() {
        };
      }
      build("warning");
      build("error");
      build("fatalError");
      return errorHandler;
    }
    function DOMHandler() {
      this.cdata = false;
    }
    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    DOMHandler.prototype = {
      startDocument: function() {
        this.doc = new DOMImplementation().createDocument(null, null, null);
        if (this.locator) {
          this.doc.documentURI = this.locator.systemId;
        }
      },
      startElement: function(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function(namespaceURI, localName, qName) {
        var current = this.currentElement;
        var tagName = current.tagName;
        this.currentElement = current.parentNode;
      },
      startPrefixMapping: function(prefix, uri) {
      },
      endPrefixMapping: function(prefix) {
      },
      processingInstruction: function(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function(ch, start, length) {
      },
      characters: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }
          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode);
          }
          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function(name) {
      },
      endDocument: function() {
        this.doc.normalize();
      },
      setDocumentLocator: function(locator) {
        if (this.locator = locator) {
          locator.lineNumber = 0;
        }
      },
      //LexicalHandler
      comment: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function() {
        this.cdata = true;
      },
      endCDATA: function() {
        this.cdata = false;
      },
      startDTD: function(name, publicId, systemId) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name, publicId, systemId);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
          this.doc.doctype = dt;
        }
      },
      /**
       * @see org.xml.sax.ErrorHandler
       * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
       */
      warning: function(error) {
        console.warn("[xmldom warning]	" + error, _locator(this.locator));
      },
      error: function(error) {
        console.error("[xmldom error]	" + error, _locator(this.locator));
      },
      fatalError: function(error) {
        throw new ParseError(error, this.locator);
      }
    };
    function _locator(l) {
      if (l) {
        return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
    }
    function _toString(chars, start, length) {
      if (typeof chars == "string") {
        return chars.substr(start, length);
      } else {
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + "";
        }
        return chars;
      }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
      DOMHandler.prototype[key] = function() {
        return null;
      };
    });
    function appendElement(hander, node) {
      if (!hander.currentElement) {
        hander.doc.appendChild(node);
      } else {
        hander.currentElement.appendChild(node);
      }
    }
    exports2.__DOMHandler = DOMHandler;
    exports2.normalizeLineEndings = normalizeLineEndings;
    exports2.DOMParser = DOMParser;
  }
});

// node_modules/@xmldom/xmldom/lib/index.js
var require_lib = __commonJS({
  "node_modules/@xmldom/xmldom/lib/index.js"(exports2) {
    var dom = require_dom();
    exports2.DOMImplementation = dom.DOMImplementation;
    exports2.XMLSerializer = dom.XMLSerializer;
    exports2.DOMParser = require_dom_parser().DOMParser;
  }
});

// vendor/fonteditor-core/lib/common/DOMParser.js
var require_DOMParser = __commonJS({
  "vendor/fonteditor-core/lib/common/DOMParser.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _default = exports2.default = typeof window !== "undefined" && window.DOMParser ? window.DOMParser : require_lib().DOMParser;
  }
});

// vendor/fonteditor-core/lib/graphics/getArc.js
var require_getArc = __commonJS({
  "vendor/fonteditor-core/lib/graphics/getArc.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = getArc;
    var _bezierCubic2Q = _interopRequireDefault(require_bezierCubic2Q2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TAU = Math.PI * 2;
    function vectorAngle(ux, uy, vx, vy) {
      var sign = ux * vy - uy * vx < 0 ? -1 : 1;
      var umag = Math.sqrt(ux * ux + uy * uy);
      var vmag = Math.sqrt(ux * ux + uy * uy);
      var dot = ux * vx + uy * vy;
      var div = dot / (umag * vmag);
      if (div > 1 || div < -1) {
        div = Math.max(div, -1);
        div = Math.min(div, 1);
      }
      return sign * Math.acos(div);
    }
    function correctRadii(midx, midy, rx, ry) {
      rx = Math.abs(rx);
      ry = Math.abs(ry);
      var \u039B = midx * midx / (rx * rx) + midy * midy / (ry * ry);
      if (\u039B > 1) {
        rx *= Math.sqrt(\u039B);
        ry *= Math.sqrt(\u039B);
      }
      return [rx, ry];
    }
    function getArcCenter(x1, y1, x2, y2, fa, fs, rx, ry, sin_\u03C6, cos_\u03C6) {
      var x1p = cos_\u03C6 * (x1 - x2) / 2 + sin_\u03C6 * (y1 - y2) / 2;
      var y1p = -sin_\u03C6 * (x1 - x2) / 2 + cos_\u03C6 * (y1 - y2) / 2;
      var rx_sq = rx * rx;
      var ry_sq = ry * ry;
      var x1p_sq = x1p * x1p;
      var y1p_sq = y1p * y1p;
      var radicant = rx_sq * ry_sq - rx_sq * y1p_sq - ry_sq * x1p_sq;
      if (radicant < 0) {
        radicant = 0;
      }
      radicant /= rx_sq * y1p_sq + ry_sq * x1p_sq;
      radicant = Math.sqrt(radicant) * (fa === fs ? -1 : 1);
      var cxp = radicant * rx / ry * y1p;
      var cyp = radicant * -ry / rx * x1p;
      var cx = cos_\u03C6 * cxp - sin_\u03C6 * cyp + (x1 + x2) / 2;
      var cy = sin_\u03C6 * cxp + cos_\u03C6 * cyp + (y1 + y2) / 2;
      var v1x = (x1p - cxp) / rx;
      var v1y = (y1p - cyp) / ry;
      var v2x = (-x1p - cxp) / rx;
      var v2y = (-y1p - cyp) / ry;
      var \u03B81 = vectorAngle(1, 0, v1x, v1y);
      var \u0394\u03B8 = vectorAngle(v1x, v1y, v2x, v2y);
      if (fs === 0 && \u0394\u03B8 > 0) {
        \u0394\u03B8 -= TAU;
      }
      if (fs === 1 && \u0394\u03B8 < 0) {
        \u0394\u03B8 += TAU;
      }
      return [cx, cy, \u03B81, \u0394\u03B8];
    }
    function approximateUnitArc(\u03B81, \u0394\u03B8) {
      var \u03B1 = 4 / 3 * Math.tan(\u0394\u03B8 / 4);
      var x1 = Math.cos(\u03B81);
      var y1 = Math.sin(\u03B81);
      var x2 = Math.cos(\u03B81 + \u0394\u03B8);
      var y2 = Math.sin(\u03B81 + \u0394\u03B8);
      return [x1, y1, x1 - y1 * \u03B1, y1 + x1 * \u03B1, x2 + y2 * \u03B1, y2 - x2 * \u03B1, x2, y2];
    }
    function a2c(x1, y1, x2, y2, fa, fs, rx, ry, \u03C6) {
      var sin_\u03C6 = Math.sin(\u03C6 * TAU / 360);
      var cos_\u03C6 = Math.cos(\u03C6 * TAU / 360);
      var x1p = cos_\u03C6 * (x1 - x2) / 2 + sin_\u03C6 * (y1 - y2) / 2;
      var y1p = -sin_\u03C6 * (x1 - x2) / 2 + cos_\u03C6 * (y1 - y2) / 2;
      if (x1p === 0 && y1p === 0) {
        return [];
      }
      if (rx === 0 || ry === 0) {
        return [];
      }
      var radii = correctRadii(x1p, y1p, rx, ry);
      rx = radii[0];
      ry = radii[1];
      var cc = getArcCenter(x1, y1, x2, y2, fa, fs, rx, ry, sin_\u03C6, cos_\u03C6);
      var result = [];
      var \u03B81 = cc[2];
      var \u0394\u03B8 = cc[3];
      var segments = Math.max(Math.ceil(Math.abs(\u0394\u03B8) / (TAU / 4)), 1);
      \u0394\u03B8 /= segments;
      for (var i = 0; i < segments; i++) {
        result.push(approximateUnitArc(\u03B81, \u0394\u03B8));
        \u03B81 += \u0394\u03B8;
      }
      return result.map(function(curve) {
        for (var _i = 0; _i < curve.length; _i += 2) {
          var x = curve[_i + 0];
          var y = curve[_i + 1];
          x *= rx;
          y *= ry;
          var xp = cos_\u03C6 * x - sin_\u03C6 * y;
          var yp = sin_\u03C6 * x + cos_\u03C6 * y;
          curve[_i + 0] = xp + cc[0];
          curve[_i + 1] = yp + cc[1];
        }
        return curve;
      });
    }
    function getArc(rx, ry, angle, largeArc, sweep, p0, p1) {
      var result = a2c(p0.x, p0.y, p1.x, p1.y, largeArc, sweep, rx, ry, angle);
      var path = [];
      if (result.length) {
        path.push({
          x: result[0][0],
          y: result[0][1],
          onCurve: true
        });
        result.forEach(function(c) {
          var q2Array = (0, _bezierCubic2Q.default)({
            x: c[0],
            y: c[1]
          }, {
            x: c[2],
            y: c[3]
          }, {
            x: c[4],
            y: c[5]
          }, {
            x: c[6],
            y: c[7]
          });
          q2Array[0][2].onCurve = true;
          path.push(q2Array[0][1]);
          path.push(q2Array[0][2]);
          if (q2Array[1]) {
            q2Array[1][2].onCurve = true;
            path.push(q2Array[1][1]);
            path.push(q2Array[1][2]);
          }
        });
      }
      return path;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/svg/parseParams.js
var require_parseParams = __commonJS({
  "vendor/fonteditor-core/lib/ttf/svg/parseParams.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = _default;
    var SEGMENT_REGEX = /-?\d+(?:\.\d+)?(?:e[-+]?\d+)?\b/g;
    function getSegment(d) {
      return +d.trim();
    }
    function _default(str) {
      if (!str) {
        return [];
      }
      var matchs = str.match(SEGMENT_REGEX);
      return matchs ? matchs.map(getSegment) : [];
    }
  }
});

// vendor/fonteditor-core/lib/ttf/svg/path2contours.js
var require_path2contours = __commonJS({
  "vendor/fonteditor-core/lib/ttf/svg/path2contours.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = path2contours;
    var _bezierCubic2Q = _interopRequireDefault(require_bezierCubic2Q2());
    var _getArc = _interopRequireDefault(require_getArc());
    var _parseParams = _interopRequireDefault(require_parseParams());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function cubic2Points(cubicList, contour) {
      var i;
      var l;
      var q2List = [];
      cubicList.forEach(function(c) {
        var list = (0, _bezierCubic2Q.default)(c[0], c[1], c[2], c[3]);
        for (i = 0, l = list.length; i < l; i++) {
          q2List.push(list[i]);
        }
      });
      var q2;
      var prevq2;
      for (i = 0, l = q2List.length; i < l; i++) {
        q2 = q2List[i];
        if (i === 0) {
          contour.push({
            x: q2[1].x,
            y: q2[1].y
          });
          contour.push({
            x: q2[2].x,
            y: q2[2].y,
            onCurve: true
          });
        } else {
          prevq2 = q2List[i - 1];
          if (prevq2[1].x + q2[1].x === 2 * q2[0].x && prevq2[1].y + q2[1].y === 2 * q2[0].y) {
            contour.pop();
          }
          contour.push({
            x: q2[1].x,
            y: q2[1].y
          });
          contour.push({
            x: q2[2].x,
            y: q2[2].y,
            onCurve: true
          });
        }
      }
      contour.push({
        x: q2[2].x,
        y: q2[2].y,
        onCurve: true
      });
      return contour;
    }
    function segments2Contours(segments) {
      var contours = [];
      var contour = [];
      var prevX = 0;
      var prevY = 0;
      var segment;
      var args;
      var cmd;
      var relative;
      var q;
      var ql;
      var px;
      var py;
      var cubicList;
      var p1;
      var p2;
      var c1;
      var c2;
      var prevCubicC1;
      for (var i = 0, l = segments.length; i < l; i++) {
        segment = segments[i];
        cmd = segment.cmd;
        relative = segment.relative;
        args = segment.args;
        if (args && !args.length && cmd !== "Z") {
          console.warn("`" + cmd + "` command args empty!");
          continue;
        }
        if (cmd === "Z") {
          contours.push(contour);
          contour = [];
        } else if (cmd === "M" || cmd === "L") {
          if (args.length % 2) {
            throw new Error("`M` command error:" + args.join(","));
          }
          if (relative) {
            px = prevX;
            py = prevY;
          } else {
            px = 0;
            py = 0;
          }
          for (q = 0, ql = args.length; q < ql; q += 2) {
            if (relative) {
              px += args[q];
              py += args[q + 1];
            } else {
              px = args[q];
              py = args[q + 1];
            }
            contour.push({
              x: px,
              y: py,
              onCurve: true
            });
          }
          prevX = px;
          prevY = py;
        } else if (cmd === "H") {
          if (relative) {
            prevX += args[0];
          } else {
            prevX = args[0];
          }
          contour.push({
            x: prevX,
            y: prevY,
            onCurve: true
          });
        } else if (cmd === "V") {
          if (relative) {
            prevY += args[0];
          } else {
            prevY = args[0];
          }
          contour.push({
            x: prevX,
            y: prevY,
            onCurve: true
          });
        } else if (cmd === "Q") {
          if (relative) {
            px = prevX;
            py = prevY;
          } else {
            px = 0;
            py = 0;
          }
          for (q = 0, ql = args.length; q < ql; q += 4) {
            contour.push({
              x: px + args[q],
              y: py + args[q + 1]
            });
            contour.push({
              x: px + args[q + 2],
              y: py + args[q + 3],
              onCurve: true
            });
            if (relative) {
              px += args[q + 2];
              py += args[q + 3];
            } else {
              px = 0;
              py = 0;
            }
          }
          if (relative) {
            prevX = px;
            prevY = py;
          } else {
            prevX = args[ql - 2];
            prevY = args[ql - 1];
          }
        } else if (cmd === "T") {
          var last = contour.pop();
          var pc = contour[contour.length - 1];
          if (!pc) {
            pc = last;
          }
          contour.push(pc = {
            x: 2 * last.x - pc.x,
            y: 2 * last.y - pc.y
          });
          px = prevX;
          py = prevY;
          for (q = 0, ql = args.length - 2; q < ql; q += 2) {
            if (relative) {
              px += args[q];
              py += args[q + 1];
            } else {
              px = args[q];
              py = args[q + 1];
            }
            last = {
              x: px,
              y: py
            };
            contour.push(pc = {
              x: 2 * last.x - pc.x,
              y: 2 * last.y - pc.y
            });
          }
          if (relative) {
            prevX = px + args[ql];
            prevY = py + args[ql + 1];
          } else {
            prevX = args[ql];
            prevY = args[ql + 1];
          }
          contour.push({
            x: prevX,
            y: prevY,
            onCurve: true
          });
        } else if (cmd === "C") {
          if (args.length % 6) {
            throw new Error("`C` command params error:" + args.join(","));
          }
          cubicList = [];
          if (relative) {
            px = prevX;
            py = prevY;
          } else {
            px = 0;
            py = 0;
          }
          p1 = {
            x: prevX,
            y: prevY
          };
          for (q = 0, ql = args.length; q < ql; q += 6) {
            c1 = {
              x: px + args[q],
              y: py + args[q + 1]
            };
            c2 = {
              x: px + args[q + 2],
              y: py + args[q + 3]
            };
            p2 = {
              x: px + args[q + 4],
              y: py + args[q + 5]
            };
            cubicList.push([p1, c1, c2, p2]);
            p1 = p2;
            if (relative) {
              px += args[q + 4];
              py += args[q + 5];
            } else {
              px = 0;
              py = 0;
            }
          }
          if (relative) {
            prevX = px;
            prevY = py;
          } else {
            prevX = args[ql - 2];
            prevY = args[ql - 1];
          }
          cubic2Points(cubicList, contour);
          prevCubicC1 = cubicList[cubicList.length - 1][2];
        } else if (cmd === "S") {
          if (args.length % 4) {
            throw new Error("`S` command params error:" + args.join(","));
          }
          cubicList = [];
          if (relative) {
            px = prevX;
            py = prevY;
          } else {
            px = 0;
            py = 0;
          }
          p1 = contour.pop();
          if (!prevCubicC1) {
            prevCubicC1 = p1;
          }
          c1 = {
            x: 2 * p1.x - prevCubicC1.x,
            y: 2 * p1.y - prevCubicC1.y
          };
          for (q = 0, ql = args.length; q < ql; q += 4) {
            c2 = {
              x: px + args[q],
              y: py + args[q + 1]
            };
            p2 = {
              x: px + args[q + 2],
              y: py + args[q + 3]
            };
            cubicList.push([p1, c1, c2, p2]);
            p1 = p2;
            c1 = {
              x: 2 * p1.x - c2.x,
              y: 2 * p1.y - c2.y
            };
            if (relative) {
              px += args[q + 2];
              py += args[q + 3];
            } else {
              px = 0;
              py = 0;
            }
          }
          if (relative) {
            prevX = px;
            prevY = py;
          } else {
            prevX = args[ql - 2];
            prevY = args[ql - 1];
          }
          cubic2Points(cubicList, contour);
          prevCubicC1 = cubicList[cubicList.length - 1][2];
        } else if (cmd === "A") {
          if (args.length % 7) {
            throw new Error("arc command params error:" + args.join(","));
          }
          for (q = 0, ql = args.length; q < ql; q += 7) {
            var ex = args[q + 5];
            var ey = args[q + 6];
            if (relative) {
              ex = prevX + ex;
              ey = prevY + ey;
            }
            var path = (0, _getArc.default)(args[q], args[q + 1], args[q + 2], args[q + 3], args[q + 4], {
              x: prevX,
              y: prevY
            }, {
              x: ex,
              y: ey
            });
            if (path && path.length > 1) {
              for (var r = 1, rl = path.length; r < rl; r++) {
                contour.push(path[r]);
              }
            }
            prevX = ex;
            prevY = ey;
          }
        }
      }
      return contours;
    }
    function path2contours(path) {
      if (!path || !path.length) {
        return null;
      }
      path = path.trim();
      if (path[0] !== "M" && path[0] !== "m") {
        path = "M 0 0" + path;
      }
      path = path.replace(/(\d+)\s*(m|$)/gi, "$1z$2");
      var segments = [];
      var cmd;
      var relative = false;
      var lastIndex;
      var args;
      for (var i = 0, l = path.length; i < l; i++) {
        var c = path[i].toUpperCase();
        var r = c !== path[i];
        switch (c) {
          case "M":
            if (i === 0) {
              cmd = c;
              lastIndex = 1;
              break;
            }
          // eslint-disable-next-line no-fallthrough
          case "Q":
          case "T":
          case "C":
          case "S":
          case "H":
          case "V":
          case "L":
          case "A":
          case "Z":
            if (cmd === "Z") {
              segments.push({
                cmd: "Z"
              });
            } else {
              args = path.slice(lastIndex, i);
              segments.push({
                cmd,
                relative,
                args: (0, _parseParams.default)(args)
              });
            }
            cmd = c;
            relative = r;
            lastIndex = i + 1;
            break;
        }
      }
      segments.push({
        cmd: "Z"
      });
      return segments2Contours(segments);
    }
  }
});

// vendor/fonteditor-core/lib/graphics/path/circle.js
var require_circle = __commonJS({
  "vendor/fonteditor-core/lib/graphics/path/circle.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _default = exports2.default = [{
      x: 582,
      y: 0
    }, {
      x: 758,
      y: 75
    }, {
      x: 890,
      y: 208
    }, {
      x: 965,
      y: 384
    }, {
      x: 965,
      y: 583
    }, {
      x: 890,
      y: 760
    }, {
      x: 758,
      y: 891
    }, {
      x: 582,
      y: 966
    }, {
      x: 383,
      y: 966
    }, {
      x: 207,
      y: 891
    }, {
      x: 75,
      y: 760
    }, {
      x: 0,
      y: 583
    }, {
      x: 0,
      y: 384
    }, {
      x: 75,
      y: 208
    }, {
      x: 207,
      y: 75
    }, {
      x: 383,
      y: 0
    }];
  }
});

// vendor/fonteditor-core/lib/ttf/svg/oval2contour.js
var require_oval2contour = __commonJS({
  "vendor/fonteditor-core/lib/ttf/svg/oval2contour.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = oval2contour;
    var _computeBoundingBox = require_computeBoundingBox();
    var _pathAdjust = _interopRequireDefault(require_pathAdjust());
    var _circle = _interopRequireDefault(require_circle());
    var _lang = require_lang();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function oval2contour(cx, cy, rx, ry) {
      if (void 0 === ry) {
        ry = rx;
      }
      var bound = (0, _computeBoundingBox.computePath)(_circle.default);
      var scaleX = +rx * 2 / bound.width;
      var scaleY = +ry * 2 / bound.height;
      var centerX = bound.width * scaleX / 2;
      var centerY = bound.height * scaleY / 2;
      var contour = (0, _lang.clone)(_circle.default);
      (0, _pathAdjust.default)(contour, scaleX, scaleY);
      (0, _pathAdjust.default)(contour, 1, 1, +cx - centerX, +cy - centerY);
      return contour;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/svg/polygon2contour.js
var require_polygon2contour = __commonJS({
  "vendor/fonteditor-core/lib/ttf/svg/polygon2contour.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = polygon2contour;
    var _parseParams = _interopRequireDefault(require_parseParams());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function polygon2contour(points) {
      if (!points || !points.length) {
        return null;
      }
      var contours = [];
      var segments = (0, _parseParams.default)(points);
      for (var i = 0, l = segments.length; i < l; i += 2) {
        contours.push({
          x: segments[i],
          y: segments[i + 1],
          onCurve: true
        });
      }
      return contours;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/svg/rect2contour.js
var require_rect2contour = __commonJS({
  "vendor/fonteditor-core/lib/ttf/svg/rect2contour.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = rect2contour;
    function rect2contour(x, y, width, height) {
      x = +x;
      y = +y;
      width = +width;
      height = +height;
      return [{
        x,
        y,
        onCurve: true
      }, {
        x: x + width,
        y,
        onCurve: true
      }, {
        x: x + width,
        y: y + height,
        onCurve: true
      }, {
        x,
        y: y + height,
        onCurve: true
      }];
    }
  }
});

// vendor/fonteditor-core/lib/ttf/svg/parseTransform.js
var require_parseTransform = __commonJS({
  "vendor/fonteditor-core/lib/ttf/svg/parseTransform.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = parseTransform;
    var _parseParams = _interopRequireDefault(require_parseParams());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TRANSFORM_REGEX = /(\w+)\s*\(([\d-.,\s]*)\)/g;
    function parseTransform(str) {
      if (!str) {
        return false;
      }
      TRANSFORM_REGEX.lastIndex = 0;
      var transforms = [];
      var match;
      while (match = TRANSFORM_REGEX.exec(str)) {
        transforms.push({
          name: match[1],
          params: (0, _parseParams.default)(match[2])
        });
      }
      return transforms;
    }
  }
});

// vendor/fonteditor-core/lib/graphics/matrix.js
var require_matrix = __commonJS({
  "vendor/fonteditor-core/lib/graphics/matrix.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.mul = mul;
    exports2.multiply = multiply;
    function mul() {
      var matrix1 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [1, 0, 0, 1];
      var matrix2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [1, 0, 0, 1];
      if (matrix1.length === 4) {
        return [matrix1[0] * matrix2[0] + matrix1[2] * matrix2[1], matrix1[1] * matrix2[0] + matrix1[3] * matrix2[1], matrix1[0] * matrix2[2] + matrix1[2] * matrix2[3], matrix1[1] * matrix2[2] + matrix1[3] * matrix2[3]];
      }
      return [matrix1[0] * matrix2[0] + matrix1[2] * matrix2[1], matrix1[1] * matrix2[0] + matrix1[3] * matrix2[1], matrix1[0] * matrix2[2] + matrix1[2] * matrix2[3], matrix1[1] * matrix2[2] + matrix1[3] * matrix2[3], matrix1[0] * matrix2[4] + matrix1[2] * matrix2[5] + matrix1[4], matrix1[1] * matrix2[4] + matrix1[3] * matrix2[5] + matrix1[5]];
    }
    function multiply() {
      var result = arguments.length <= 0 ? void 0 : arguments[0];
      for (var i = 1, matrix; matrix = i < 0 || arguments.length <= i ? void 0 : arguments[i]; i++) {
        result = mul(result, matrix);
      }
      return result;
    }
  }
});

// vendor/fonteditor-core/lib/graphics/pathTransform.js
var require_pathTransform = __commonJS({
  "vendor/fonteditor-core/lib/graphics/pathTransform.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = transform;
    function transform(contour, a, b, c, d, e, f) {
      if (!contour.length) {
        return contour;
      }
      if (typeof contour[0] === "number") {
        for (var i = 0, l = contour.length; i < l; i += 3) {
          var x = contour[i];
          var y = contour[i + 1];
          contour[i] = x * a + y * c + e;
          contour[i + 1] = x * b + y * d + f;
        }
      } else {
        for (var i = 0, l = contour.length; i < l; i++) {
          var p = contour[i];
          var x = p.x;
          var y = p.y;
          p.x = x * a + y * c + e;
          p.y = x * b + y * d + f;
        }
      }
      return contour;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/svg/contoursTransform.js
var require_contoursTransform = __commonJS({
  "vendor/fonteditor-core/lib/ttf/svg/contoursTransform.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = contoursTransform;
    var _matrix = require_matrix();
    var _pathTransform = _interopRequireDefault(require_pathTransform());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function contoursTransform(contours, transforms) {
      if (!contours || !contours.length || !transforms || !transforms.length) {
        return contours;
      }
      var matrix = [1, 0, 0, 1, 0, 0];
      for (var i = 0, l = transforms.length; i < l; i++) {
        var transform = transforms[i];
        var params = transform.params;
        var radian = null;
        switch (transform.name) {
          case "translate":
            matrix = (0, _matrix.mul)(matrix, [1, 0, 0, 1, params[0], params[1]]);
            break;
          case "scale":
            matrix = (0, _matrix.mul)(matrix, [params[0], 0, 0, params[1], 0, 0]);
            break;
          case "matrix":
            matrix = (0, _matrix.mul)(matrix, [params[0], params[1], params[2], params[3], params[4], params[5]]);
            break;
          case "rotate":
            radian = params[0] * Math.PI / 180;
            if (params.length > 1) {
              matrix = (0, _matrix.multiply)(matrix, [1, 0, 0, 1, -params[1], -params[2]], [Math.cos(radian), Math.sin(radian), -Math.sin(radian), Math.cos(radian), 0, 0], [1, 0, 0, 1, params[1], params[2]]);
            } else {
              matrix = (0, _matrix.mul)(matrix, [Math.cos(radian), Math.sin(radian), -Math.sin(radian), Math.cos(radian), 0, 0]);
            }
            break;
          case "skewX":
            matrix = (0, _matrix.mul)(matrix, [1, 0, Math.tan(params[0] * Math.PI / 180), 1, 0, 0]);
            break;
          case "skewY":
            matrix = (0, _matrix.mul)(matrix, [1, Math.tan(params[0] * Math.PI / 180), 0, 1, 0, 0]);
            break;
        }
      }
      contours.forEach(function(p) {
        (0, _pathTransform.default)(p, matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
      });
      return contours;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/svg/svgnode2contours.js
var require_svgnode2contours = __commonJS({
  "vendor/fonteditor-core/lib/ttf/svg/svgnode2contours.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = svgnode2contours;
    var _path2contours = _interopRequireDefault(require_path2contours());
    var _oval2contour = _interopRequireDefault(require_oval2contour());
    var _polygon2contour = _interopRequireDefault(require_polygon2contour());
    var _rect2contour = _interopRequireDefault(require_rect2contour());
    var _parseTransform = _interopRequireDefault(require_parseTransform());
    var _contoursTransform = _interopRequireDefault(require_contoursTransform());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var support = {
      path: {
        parse: _path2contours.default,
        // 解析器
        params: ["d"],
        // 参数列表
        contours: true
        // 是否是多个轮廓
      },
      circle: {
        parse: _oval2contour.default,
        params: ["cx", "cy", "r"]
      },
      ellipse: {
        parse: _oval2contour.default,
        params: ["cx", "cy", "rx", "ry"]
      },
      rect: {
        parse: _rect2contour.default,
        params: ["x", "y", "width", "height"]
      },
      polygon: {
        parse: _polygon2contour.default,
        params: ["points"]
      },
      polyline: {
        parse: _polygon2contour.default,
        params: ["points"]
      }
    };
    function svgnode2contours(xmlNodes) {
      var i;
      var length;
      var j;
      var jlength;
      var segment;
      var parsedSegments = [];
      if (xmlNodes.length) {
        var _loop = function _loop2() {
          var node = xmlNodes[i];
          var name = node.tagName;
          if (support[name]) {
            var supportParams = support[name].params;
            var params = [];
            for (j = 0, jlength = supportParams.length; j < jlength; j++) {
              params.push(node.getAttribute(supportParams[j]));
            }
            segment = {
              name,
              params,
              transform: (0, _parseTransform.default)(node.getAttribute("transform"))
            };
            if (node.parentNode) {
              var curNode = node.parentNode;
              var transforms = segment.transform || [];
              var transAttr;
              var iterator = function iterator2(t) {
                transforms.unshift(t);
              };
              while (curNode !== null && curNode.tagName !== "svg") {
                transAttr = curNode.getAttribute("transform");
                if (transAttr) {
                  (0, _parseTransform.default)(transAttr).reverse().forEach(iterator);
                }
                curNode = curNode.parentNode;
              }
              segment.transform = transforms.length ? transforms : null;
            }
            parsedSegments.push(segment);
          }
        };
        for (i = 0, length = xmlNodes.length; i < length; i++) {
          _loop();
        }
      }
      if (parsedSegments.length) {
        var result = [];
        for (i = 0, length = parsedSegments.length; i < length; i++) {
          segment = parsedSegments[i];
          var parser = support[segment.name];
          var contour = parser.parse.apply(null, segment.params);
          if (contour && contour.length) {
            var contours = parser.contours ? contour : [contour];
            if (segment.transform) {
              contours = (0, _contoursTransform.default)(contours, segment.transform);
            }
            for (j = 0, jlength = contours.length; j < jlength; j++) {
              result.push(contours[j]);
            }
          }
        }
        return result;
      }
      return false;
    }
  }
});

// vendor/fonteditor-core/lib/graphics/pathRotate.js
var require_pathRotate = __commonJS({
  "vendor/fonteditor-core/lib/graphics/pathRotate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = pathRotate;
    function pathRotate(contour, angle, centerX, centerY) {
      angle = angle === void 0 ? 0 : angle;
      var x = centerX || 0;
      var y = centerY || 0;
      var cos = Math.cos(angle);
      var sin = Math.sin(angle);
      var px;
      var py;
      var p;
      for (var i = 0, l = contour.length; i < l; i++) {
        p = contour[i];
        px = cos * (p.x - x) - sin * (p.y - y);
        py = cos * (p.y - y) + sin * (p.x - x);
        p.x = px + x;
        p.y = py + y;
      }
      return contour;
    }
  }
});

// vendor/fonteditor-core/lib/graphics/pathsUtil.js
var require_pathsUtil = __commonJS({
  "vendor/fonteditor-core/lib/graphics/pathsUtil.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _computeBoundingBox = require_computeBoundingBox();
    var _pathAdjust = _interopRequireDefault(require_pathAdjust());
    var _pathRotate = _interopRequireDefault(require_pathRotate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function mirrorPaths(paths, xScale, yScale) {
      var _computePath = _computeBoundingBox.computePath.apply(void 0, _toConsumableArray(paths)), x = _computePath.x, y = _computePath.y, width = _computePath.width, height = _computePath.height;
      if (xScale === -1) {
        paths.forEach(function(p) {
          (0, _pathAdjust.default)(p, -1, 1, -x, 0);
          (0, _pathAdjust.default)(p, 1, 1, x + width, 0);
          p.reverse();
        });
      }
      if (yScale === -1) {
        paths.forEach(function(p) {
          (0, _pathAdjust.default)(p, 1, -1, 0, -y);
          (0, _pathAdjust.default)(p, 1, 1, 0, y + height);
          p.reverse();
        });
      }
      return paths;
    }
    var _default = exports2.default = {
      /**
       * 旋转路径
       *
       * @param {Array} paths 路径数组
       * @param {number} angle 弧度
       * @return {Array} 变换后的路径
       */
      rotate: function rotate(paths, angle) {
        if (!angle) {
          return paths;
        }
        var bound = _computeBoundingBox.computePath.apply(void 0, _toConsumableArray(paths));
        var cx = bound.x + bound.width / 2;
        var cy = bound.y + bound.height / 2;
        paths.forEach(function(p) {
          (0, _pathRotate.default)(p, angle, cx, cy);
        });
        return paths;
      },
      /**
       * 路径组变换
       *
       * @param {Array} paths 路径数组
       * @param {number} x x 方向缩放
       * @param {number} y y 方向缩放
       * @return {Array} 变换后的路径
       */
      move: function move(paths, x, y) {
        var bound = _computeBoundingBox.computePath.apply(void 0, _toConsumableArray(paths));
        paths.forEach(function(path) {
          (0, _pathAdjust.default)(path, 1, 1, x - bound.x, y - bound.y);
        });
        return paths;
      },
      mirror: function mirror(paths) {
        return mirrorPaths(paths, -1, 1);
      },
      flip: function flip(paths) {
        return mirrorPaths(paths, 1, -1);
      }
    };
  }
});

// vendor/fonteditor-core/lib/ttf/svg2ttfobject.js
var require_svg2ttfobject = __commonJS({
  "vendor/fonteditor-core/lib/ttf/svg2ttfobject.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = svg2ttfObject;
    var _string = _interopRequireDefault(require_string2());
    var _DOMParser = _interopRequireDefault(require_DOMParser());
    var _path2contours = _interopRequireDefault(require_path2contours());
    var _svgnode2contours = _interopRequireDefault(require_svgnode2contours());
    var _computeBoundingBox = require_computeBoundingBox();
    var _pathsUtil = _interopRequireDefault(require_pathsUtil());
    var _glyfAdjust = _interopRequireDefault(require_glyfAdjust());
    var _error = _interopRequireDefault(require_error());
    var _getEmptyttfObject = _interopRequireDefault(require_getEmptyttfObject());
    var _reduceGlyf = _interopRequireDefault(require_reduceGlyf());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function loadXML(xml) {
      if (_DOMParser.default) {
        try {
          var domParser = new _DOMParser.default();
          var xmlDoc = domParser.parseFromString(xml, "text/xml");
          return xmlDoc;
        } catch (exp) {
          _error.default.raise(10103);
        }
      }
      _error.default.raise(10004);
    }
    function resolveSVG(svg) {
      svg = svg.replace(/\s+xmlns(?::[\w-]+)?=("|')[^"']*\1/g, " ").replace(/<defs[>\s][\s\S]+?\/defs>/g, function(text) {
        if (text.indexOf("</font>") >= 0) {
          return text;
        }
        return "";
      }).replace(/<use[>\s][\s\S]+?\/use>/g, "");
      return svg;
    }
    function getEmptyTTF() {
      var ttf = (0, _getEmptyttfObject.default)();
      ttf.head.unitsPerEm = 0;
      ttf.from = "svgfont";
      return ttf;
    }
    function getEmptyObject() {
      return {
        "from": "svg",
        "OS/2": {},
        "name": {},
        "hhea": {},
        "head": {},
        "post": {},
        "glyf": []
      };
    }
    function getUnitsPerEm(xMin, xMax, yMin, yMax) {
      var seed = Math.ceil(Math.min(yMax - yMin, xMax - xMin));
      if (!seed) {
        return 1024;
      }
      if (seed <= 128) {
        return seed;
      }
      var unitsPerEm = 128;
      while (unitsPerEm < 16384) {
        if (seed <= 1.2 * unitsPerEm) {
          return unitsPerEm;
        }
        unitsPerEm <<= 1;
      }
      return 1024;
    }
    function resolve(ttf) {
      if (ttf.from === "svgfont" && ttf.head.unitsPerEm > 128) {
        ttf.glyf.forEach(function(g) {
          if (g.contours) {
            (0, _glyfAdjust.default)(g);
            (0, _reduceGlyf.default)(g);
          }
        });
      } else {
        var xMin = 16384;
        var xMax = -16384;
        var yMin = 16384;
        var yMax = -16384;
        ttf.glyf.forEach(function(g) {
          if (g.contours) {
            var bound = _computeBoundingBox.computePathBox.apply(void 0, _toConsumableArray(g.contours));
            if (bound) {
              xMin = Math.min(xMin, bound.x);
              xMax = Math.max(xMax, bound.x + bound.width);
              yMin = Math.min(yMin, bound.y);
              yMax = Math.max(yMax, bound.y + bound.height);
            }
          }
        });
        var unitsPerEm = getUnitsPerEm(xMin, xMax, yMin, yMax);
        var scale = 1024 / unitsPerEm;
        ttf.glyf.forEach(function(g) {
          (0, _glyfAdjust.default)(g, scale, scale);
          (0, _reduceGlyf.default)(g);
        });
        ttf.head.unitsPerEm = 1024;
      }
      return ttf;
    }
    function parseFont(xmlDoc, ttf) {
      var metaNode = xmlDoc.getElementsByTagName("metadata")[0];
      var fontNode = xmlDoc.getElementsByTagName("font")[0];
      var fontFaceNode = xmlDoc.getElementsByTagName("font-face")[0];
      if (metaNode && metaNode.textContent) {
        ttf.metadata = _string.default.decodeHTML(metaNode.textContent.trim());
      }
      if (fontNode) {
        ttf.id = fontNode.getAttribute("id") || "";
        ttf.hhea.advanceWidthMax = +(fontNode.getAttribute("horiz-adv-x") || 0);
        ttf.from = "svgfont";
      }
      if (fontFaceNode) {
        var OS2 = ttf["OS/2"];
        ttf.name.fontFamily = fontFaceNode.getAttribute("font-family") || "";
        OS2.usWeightClass = +(fontFaceNode.getAttribute("font-weight") || 0);
        ttf.head.unitsPerEm = +(fontFaceNode.getAttribute("units-per-em") || 0);
        var panose = (fontFaceNode.getAttribute("panose-1") || "").split(" ");
        ["bFamilyType", "bSerifStyle", "bWeight", "bProportion", "bContrast", "bStrokeVariation", "bArmStyle", "bLetterform", "bMidline", "bXHeight"].forEach(function(name, i) {
          OS2[name] = +(panose[i] || 0);
        });
        ttf.hhea.ascent = +(fontFaceNode.getAttribute("ascent") || 0);
        ttf.hhea.descent = +(fontFaceNode.getAttribute("descent") || 0);
        OS2.bXHeight = +(fontFaceNode.getAttribute("x-height") || 0);
        var box = (fontFaceNode.getAttribute("bbox") || "").split(" ");
        ["xMin", "yMin", "xMax", "yMax"].forEach(function(name, i) {
          ttf.head[name] = +(box[i] || "");
        });
        ttf.post.underlineThickness = +(fontFaceNode.getAttribute("underline-thickness") || 0);
        ttf.post.underlinePosition = +(fontFaceNode.getAttribute("underline-position") || 0);
        var unicodeRange = fontFaceNode.getAttribute("unicode-range");
        if (unicodeRange) {
          unicodeRange.replace(/u\+([0-9A-Z]+)(-[0-9A-Z]+)?/i, function($0, a, b) {
            OS2.usFirstCharIndex = Number("0x" + a);
            OS2.usLastCharIndex = b ? Number("0x" + b.slice(1)) : 4294967295;
          });
        }
      }
      return ttf;
    }
    function parseGlyf(xmlDoc, ttf) {
      var missingNode = xmlDoc.getElementsByTagName("missing-glyph")[0];
      var d;
      var unicode;
      if (missingNode) {
        var missing = {
          name: ".notdef"
        };
        if (missingNode.getAttribute("horiz-adv-x")) {
          missing.advanceWidth = +missingNode.getAttribute("horiz-adv-x");
        }
        if (d = missingNode.getAttribute("d")) {
          missing.contours = (0, _path2contours.default)(d);
        }
        if (ttf.glyf[0] && ttf.glyf[0].name === ".notdef") {
          ttf.glyf.splice(0, 1);
        }
        ttf.glyf.unshift(missing);
      }
      var glyfNodes = xmlDoc.getElementsByTagName("glyph");
      if (glyfNodes.length) {
        for (var i = 0, l = glyfNodes.length; i < l; i++) {
          var node = glyfNodes[i];
          var glyf = {
            name: node.getAttribute("glyph-name") || node.getAttribute("name") || ""
          };
          if (node.getAttribute("horiz-adv-x")) {
            glyf.advanceWidth = +node.getAttribute("horiz-adv-x");
          }
          if (unicode = node.getAttribute("unicode")) {
            var nextUnicode = [];
            var totalCodePoints = 0;
            for (var ui = 0; ui < unicode.length; ui++) {
              var ucp = unicode.codePointAt(ui);
              nextUnicode.push(ucp);
              ui = ucp > 65535 ? ui + 1 : ui;
              totalCodePoints += 1;
            }
            if (totalCodePoints === 1) {
              glyf.unicode = nextUnicode;
              if (d = node.getAttribute("d")) {
                glyf.contours = (0, _path2contours.default)(d);
              }
              ttf.glyf.push(glyf);
            }
          }
        }
      }
      return ttf;
    }
    function parsePath(xmlDoc, ttf) {
      var contours;
      var glyf;
      var node;
      var pathNodes = xmlDoc.getElementsByTagName("path");
      if (pathNodes.length) {
        for (var i = 0, l = pathNodes.length; i < l; i++) {
          node = pathNodes[i];
          glyf = {
            name: node.getAttribute("name") || ""
          };
          contours = (0, _svgnode2contours.default)([node]);
          glyf.contours = contours;
          ttf.glyf.push(glyf);
        }
      }
      contours = (0, _svgnode2contours.default)(Array.prototype.slice.call(xmlDoc.getElementsByTagName("*")).filter(function(node2) {
        return node2.tagName !== "path";
      }));
      if (contours) {
        glyf = {
          name: ""
        };
        glyf.contours = contours;
        ttf.glyf.push(glyf);
      }
    }
    function parseXML(xmlDoc, options) {
      if (!xmlDoc.getElementsByTagName("svg").length) {
        _error.default.raise(10106);
      }
      var ttf;
      if (xmlDoc.getElementsByTagName("font")[0]) {
        ttf = getEmptyTTF();
        parseFont(xmlDoc, ttf);
        parseGlyf(xmlDoc, ttf);
      } else {
        ttf = getEmptyObject();
        parsePath(xmlDoc, ttf);
      }
      if (!ttf.glyf.length) {
        _error.default.raise(10201);
      }
      if (ttf.from === "svg") {
        var glyf = ttf.glyf;
        var i;
        var l;
        if (options.combinePath) {
          var combined = [];
          for (i = 0, l = glyf.length; i < l; i++) {
            var contours = glyf[i].contours;
            for (var index = 0, length = contours.length; index < length; index++) {
              combined.push(contours[index]);
            }
          }
          glyf[0].contours = combined;
          glyf.splice(1);
        }
        for (i = 0, l = glyf.length; i < l; i++) {
          glyf[i].contours = _pathsUtil.default.flip(glyf[i].contours);
        }
      }
      return ttf;
    }
    function svg2ttfObject(svg) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        combinePath: false
      };
      var xmlDoc = svg;
      if (typeof svg === "string") {
        svg = resolveSVG(svg);
        xmlDoc = loadXML(svg);
      }
      var ttf = parseXML(xmlDoc, options);
      return resolve(ttf);
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/loca.js
var require_loca = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/loca.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    var _struct = _interopRequireDefault(require_struct());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("loca", [], {
      read: function read(reader, ttf) {
        var offset = this.offset;
        var indexToLocFormat = ttf.head.indexToLocFormat;
        var numGlyphs = ttf.maxp.numGlyphs;
        var subset = ttf.readOptions && ttf.readOptions.subset && ttf.readOptions.subset.length > 0;
        if (subset) {
          var viewSub = reader.view;
          var dvOff = viewSub.byteOffset + offset;
          var cache = /* @__PURE__ */ new Map();
          var getLoca = function(gid) {
            var v = cache.get(gid);
            if (v !== void 0) return v;
            v = indexToLocFormat === 0 ? viewSub.getUint16(dvOff + gid * 2, false) * 2 : viewSub.getUint32(dvOff + gid * 4, false);
            cache.set(gid, v);
            return v;
          };
          reader.offset = offset + (indexToLocFormat === 0 ? numGlyphs * 2 : numGlyphs * 4);
          return new Proxy({}, {
            get: function(_t, key) {
              var g = typeof key === "string" ? +key : key;
              return typeof g === "number" && g >= 0 && g < numGlyphs ? getLoca(g) : void 0;
            }
          });
        }
        var view = reader.view;
        var srcByteOff = view.byteOffset + offset;
        if (indexToLocFormat === 0) {
          if ((srcByteOff & 1) === 0) {
            var src16 = new Uint16Array(view.buffer, srcByteOff, numGlyphs);
            var wordOffset = new Uint32Array(numGlyphs);
            for (var i = 0; i < numGlyphs; i++) {
              var v16 = src16[i];
              wordOffset[i] = ((v16 >> 8 | v16 << 8) >>> 0 & 65535) * 2;
            }
          } else {
            var wordOffset = new Uint32Array(numGlyphs);
            var vOff0 = srcByteOff;
            for (var i0 = 0; i0 < numGlyphs; i0++) {
              wordOffset[i0] = view.getUint16(vOff0, false) * 2;
              vOff0 += 2;
            }
          }
        } else {
          if ((srcByteOff & 3) === 0) {
            var src32 = new Uint32Array(view.buffer, srcByteOff, numGlyphs);
            var wordOffset = new Uint32Array(numGlyphs);
            for (var j = 0; j < numGlyphs; j++) {
              var v32 = src32[j];
              wordOffset[j] = v32 >>> 24 | v32 >> 8 & 65280 | v32 << 8 & 16711680 | v32 << 24;
            }
          } else {
            var wordOffset = new Uint32Array(numGlyphs);
            var vOff1 = srcByteOff;
            for (var j1 = 0; j1 < numGlyphs; j1++) {
              wordOffset[j1] = view.getUint32(vOff1, false);
              vOff1 += 4;
            }
          }
        }
        reader.offset = offset + (indexToLocFormat === 0 ? numGlyphs * 2 : numGlyphs * 4);
        return wordOffset;
      },
      write: function write(writer, ttf) {
        var glyfSupport = ttf.support.glyf;
        var offset = ttf.support.glyf.offset || 0;
        var indexToLocFormat = ttf.head.indexToLocFormat;
        var numGlyphs = ttf.glyf.length;
        var wView = writer.view;
        var pos = writer.offset;
        if (indexToLocFormat) {
          for (var i = 0; i < numGlyphs; i++) {
            wView.setUint32(pos, offset, false);
            pos += 4;
            offset += glyfSupport[i].size;
          }
          wView.setUint32(pos, offset, false);
          pos += 4;
        } else {
          for (var j = 0; j < numGlyphs; j++) {
            wView.setUint16(pos, offset >> 1, false);
            pos += 2;
            offset += glyfSupport[j].size;
          }
          wView.setUint16(pos, offset >> 1, false);
          pos += 2;
        }
        writer.offset = pos;
        return writer;
      },
      size: function size(ttf) {
        var locaCount = ttf.glyf.length + 1;
        return ttf.head.indexToLocFormat ? locaCount * 4 : locaCount * 2;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/enum/componentFlag.js
var require_componentFlag = __commonJS({
  "vendor/fonteditor-core/lib/ttf/enum/componentFlag.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _default = exports2.default = {
      ARG_1_AND_2_ARE_WORDS: 1,
      ARGS_ARE_XY_VALUES: 2,
      ROUND_XY_TO_GRID: 4,
      WE_HAVE_A_SCALE: 8,
      RESERVED: 16,
      MORE_COMPONENTS: 32,
      WE_HAVE_AN_X_AND_Y_SCALE: 64,
      WE_HAVE_A_TWO_BY_TWO: 128,
      WE_HAVE_INSTRUCTIONS: 256,
      USE_MY_METRICS: 512,
      OVERLAP_COMPOUND: 1024,
      SCALED_COMPONENT_OFFSET: 2048,
      UNSCALED_COMPONENT_OFFSET: 4096
    };
  }
});

// vendor/fonteditor-core/lib/ttf/table/glyf/parse.js
var require_parse2 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/glyf/parse.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = parseGlyf;
    var _glyFlag = _interopRequireDefault(require_glyFlag());
    var _componentFlag = _interopRequireDefault(require_componentFlag());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var MAX_INSTRUCTION_LENGTH = 5e3;
    var MAX_NUMBER_OF_COORDINATES = 2e4;
    function parseSimpleGlyf(reader, glyf) {
      var offset = reader.offset;
      var endPtsOfContours = glyf.endPtsOfContours;
      var numberOfCoordinates = endPtsOfContours[endPtsOfContours.length - 1] + 1;
      if (numberOfCoordinates > MAX_NUMBER_OF_COORDINATES) {
        return glyf;
      }
      var REPEAT = _glyFlag.default.REPEAT;
      var XSHORT = _glyFlag.default.XSHORT;
      var XSAME = _glyFlag.default.XSAME;
      var YSHORT = _glyFlag.default.YSHORT;
      var YSAME = _glyFlag.default.YSAME;
      var ONCURVE = _glyFlag.default.ONCURVE;
      var view = reader.view;
      var vOffset = view.byteOffset + reader.offset;
      var flags = new Uint8Array(numberOfCoordinates);
      var fi = 0;
      while (fi < numberOfCoordinates) {
        var flag = view.getUint8(vOffset++);
        flags[fi++] = flag;
        if (flag & REPEAT && fi < numberOfCoordinates) {
          var repeat = view.getUint8(vOffset++);
          var fillCount = repeat < numberOfCoordinates - fi ? repeat : numberOfCoordinates - fi;
          flags.fill(flag, fi, fi + fillCount);
          fi += fillCount;
        }
      }
      var xArr = new Int32Array(numberOfCoordinates);
      var prevX = 0;
      for (var xi = 0; xi < numberOfCoordinates; xi++) {
        var x = 0;
        var xflag = flags[xi];
        if (!(xflag & XSHORT) && xflag & XSAME) {
        } else if (xflag & XSHORT) {
          x = view.getUint8(vOffset++);
          if (!(xflag & XSAME)) x = -x;
        } else {
          x = view.getInt16(vOffset);
          vOffset += 2;
        }
        prevX += x;
        xArr[xi] = prevX;
      }
      var yArr = new Int32Array(numberOfCoordinates);
      var prevY = 0;
      for (var yi = 0; yi < numberOfCoordinates; yi++) {
        var y = 0;
        var yflag = flags[yi];
        if (!(yflag & YSHORT) && yflag & YSAME) {
        } else if (yflag & YSHORT) {
          y = view.getUint8(vOffset++);
          if (!(yflag & YSAME)) y = -y;
        } else {
          y = view.getInt16(vOffset);
          vOffset += 2;
        }
        prevY += y;
        yArr[yi] = prevY;
      }
      reader.offset = vOffset - view.byteOffset;
      glyf._xArr = xArr;
      glyf._yArr = yArr;
      glyf._flags = flags;
      return glyf;
    }
    var _ARG_1_AND_2_ARE_WORDS = _componentFlag.default.ARG_1_AND_2_ARE_WORDS;
    var _WE_HAVE_A_SCALE = _componentFlag.default.WE_HAVE_A_SCALE;
    var _WE_HAVE_AN_X_AND_Y_SCALE = _componentFlag.default.WE_HAVE_AN_X_AND_Y_SCALE;
    var _WE_HAVE_A_TWO_BY_TWO = _componentFlag.default.WE_HAVE_A_TWO_BY_TWO;
    var _ARGS_ARE_XY_VALUES = _componentFlag.default.ARGS_ARE_XY_VALUES;
    var _USE_MY_METRICS = _componentFlag.default.USE_MY_METRICS;
    var _OVERLAP_COMPOUND = _componentFlag.default.OVERLAP_COMPOUND;
    var _MORE_COMPONENTS = _componentFlag.default.MORE_COMPONENTS;
    var _WE_HAVE_INSTRUCTIONS = _componentFlag.default.WE_HAVE_INSTRUCTIONS;
    function parseCompoundGlyf(reader, glyf) {
      glyf.compound = true;
      glyf.glyfs = [];
      var flags;
      var ARG_1_AND_2_ARE_WORDS = _ARG_1_AND_2_ARE_WORDS;
      var WE_HAVE_A_SCALE = _WE_HAVE_A_SCALE;
      var WE_HAVE_AN_X_AND_Y_SCALE = _WE_HAVE_AN_X_AND_Y_SCALE;
      var WE_HAVE_A_TWO_BY_TWO = _WE_HAVE_A_TWO_BY_TWO;
      var ARGS_ARE_XY_VALUES = _ARGS_ARE_XY_VALUES;
      var USE_MY_METRICS = _USE_MY_METRICS;
      var OVERLAP_COMPOUND = _OVERLAP_COMPOUND;
      var MORE_COMPONENTS = _MORE_COMPONENTS;
      var WE_HAVE_INSTRUCTIONS = _WE_HAVE_INSTRUCTIONS;
      var view = reader.view;
      var vOffset = view.byteOffset + reader.offset;
      var F2DOT14_INV = 6103515625e-14;
      do {
        flags = view.getUint16(vOffset, false);
        vOffset += 2;
        var glyphIndex = view.getUint16(vOffset, false);
        vOffset += 2;
        var arg1 = 0;
        var arg2 = 0;
        var scaleX = 16384;
        var scaleY = 16384;
        var scale01 = 0;
        var scale10 = 0;
        if (ARG_1_AND_2_ARE_WORDS & flags) {
          arg1 = view.getInt16(vOffset, false);
          vOffset += 2;
          arg2 = view.getInt16(vOffset, false);
          vOffset += 2;
        } else {
          arg1 = view.getInt8(vOffset);
          vOffset += 1;
          arg2 = view.getInt8(vOffset);
          vOffset += 1;
        }
        if (WE_HAVE_A_SCALE & flags) {
          scaleX = view.getInt16(vOffset, false);
          vOffset += 2;
          scaleY = scaleX;
        } else if (WE_HAVE_AN_X_AND_Y_SCALE & flags) {
          scaleX = view.getInt16(vOffset, false);
          vOffset += 2;
          scaleY = view.getInt16(vOffset, false);
          vOffset += 2;
        } else if (WE_HAVE_A_TWO_BY_TWO & flags) {
          scaleX = view.getInt16(vOffset, false);
          vOffset += 2;
          scale01 = view.getInt16(vOffset, false);
          vOffset += 2;
          scale10 = view.getInt16(vOffset, false);
          vOffset += 2;
          scaleY = view.getInt16(vOffset, false);
          vOffset += 2;
        }
        if (ARGS_ARE_XY_VALUES & flags) {
          glyf.glyfs.push({
            flags,
            glyphIndex,
            useMyMetrics: !!(flags & USE_MY_METRICS),
            overlapCompound: !!(flags & OVERLAP_COMPOUND),
            transform: { a: scaleX * F2DOT14_INV, b: scale01 * F2DOT14_INV, c: scale10 * F2DOT14_INV, d: scaleY * F2DOT14_INV, e: arg1, f: arg2 }
          });
        } else {
          glyf.glyfs.push({
            flags,
            glyphIndex,
            points: [arg1, arg2],
            transform: { a: scaleX * F2DOT14_INV, b: scale01 * F2DOT14_INV, c: scale10 * F2DOT14_INV, d: scaleY * F2DOT14_INV, e: 0, f: 0 }
          });
        }
      } while (MORE_COMPONENTS & flags);
      if (WE_HAVE_INSTRUCTIONS & flags) {
        var length = view.getUint16(vOffset, false);
        vOffset += 2;
        if (length < MAX_INSTRUCTION_LENGTH) {
          var instructions = new Array(length);
          for (var i = 0; i < length; ++i) {
            instructions[i] = view.getUint8(vOffset + i);
          }
          glyf.instructions = instructions;
        }
        vOffset += length;
      }
      reader.offset = vOffset - view.byteOffset;
      return glyf;
    }
    function parseGlyf(reader, ttf, offset) {
      if (null != offset) {
        reader.seek(offset);
      }
      var glyf = {};
      var readOpts = ttf.readOptions || {};
      var hinting = readOpts.hinting;
      var view = reader.view;
      var vOffset = view.byteOffset + reader.offset;
      var numberOfContours = view.getInt16(vOffset, false);
      glyf.xMin = view.getInt16(vOffset + 2, false);
      glyf.yMin = view.getInt16(vOffset + 4, false);
      glyf.xMax = view.getInt16(vOffset + 6, false);
      glyf.yMax = view.getInt16(vOffset + 8, false);
      vOffset += 10;
      if (numberOfContours >= 0) {
        if (numberOfContours > 0) {
          glyf.endPtsOfContours = new Array(numberOfContours);
          for (var i = 0; i < numberOfContours; i++) {
            glyf.endPtsOfContours[i] = view.getUint16(vOffset, false);
            vOffset += 2;
          }
        } else {
          glyf.xMin = 0;
          glyf.yMin = 0;
          glyf.xMax = 0;
          glyf.yMax = 0;
        }
        var instrLength = view.getUint16(vOffset, false);
        vOffset += 2;
        if (hinting && instrLength && instrLength < MAX_INSTRUCTION_LENGTH) {
          var instructions = new Array(instrLength);
          for (var j = 0; j < instrLength; j++) {
            instructions[j] = view.getUint8(vOffset + j);
          }
          glyf.instructions = instructions;
        }
        vOffset += instrLength;
        reader.offset = vOffset - view.byteOffset;
        parseSimpleGlyf(reader, glyf);
      } else {
        reader.offset = vOffset - view.byteOffset;
        parseCompoundGlyf(reader, glyf);
      }
      return glyf;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/glyf/write.js
var require_write2 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/glyf/write.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = write;
    var _componentFlag = _interopRequireDefault(require_componentFlag());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function write(writer, ttf) {
      var writeOpts = ttf.writeOptions || {};
      var hinting = writeOpts.hinting;
      var writeZeroContoursGlyfData = writeOpts.writeZeroContoursGlyfData;
      var glyfSupport = ttf.support.glyf;
      var glyfs = ttf.glyf;
      var view = writer.view;
      var buf = view.buffer;
      var vbo = view.byteOffset;
      var fullView = new Uint8Array(buf, vbo);
      var ARG_1_AND_2_ARE_WORDS = _componentFlag.default.ARG_1_AND_2_ARE_WORDS;
      var ROUND_XY_TO_GRID = _componentFlag.default.ROUND_XY_TO_GRID;
      var WE_HAVE_A_SCALE = _componentFlag.default.WE_HAVE_A_SCALE;
      var WE_HAVE_AN_X_AND_Y_SCALE = _componentFlag.default.WE_HAVE_AN_X_AND_Y_SCALE;
      var WE_HAVE_A_TWO_BY_TWO = _componentFlag.default.WE_HAVE_A_TWO_BY_TWO;
      var ARGS_ARE_XY_VALUES = _componentFlag.default.ARGS_ARE_XY_VALUES;
      var USE_MY_METRICS = _componentFlag.default.USE_MY_METRICS;
      var OVERLAP_COMPOUND = _componentFlag.default.OVERLAP_COMPOUND;
      var MORE_COMPONENTS = _componentFlag.default.MORE_COMPONENTS;
      for (var index = 0, gl = glyfs.length; index < gl; index++) {
        var glyf = glyfs[index];
        var gSupport = glyfSupport[index];
        if (!glyf.compound && !writeZeroContoursGlyfData && (!glyf.contours || !glyf.contours.length)) {
          continue;
        }
        var pos = writer.offset;
        var origBuf = glyf._origBuf;
        if (origBuf) {
          if (glyf._instrOff >= 0) {
            var instrRelOff = glyf._instrOff - glyf._origOff;
            fullView.set(new Uint8Array(origBuf, glyf._origOff, instrRelOff), pos);
            pos += instrRelOff;
            view.setUint16(pos, 0, false);
            pos += 2;
            var afterOff = glyf._origOff + instrRelOff + 2 + glyf._instrLen;
            var afterLen = glyf._origLen - (instrRelOff + 2 + glyf._instrLen);
            if (afterLen > 0) {
              fullView.set(new Uint8Array(origBuf, afterOff, afterLen), pos);
              pos += afterLen;
            }
          } else {
            var origBytes = new Uint8Array(origBuf, glyf._origOff, glyf._origLen);
            fullView.set(origBytes, pos);
            pos += glyf._origLen;
          }
        } else {
          var numC = glyf._numContours != null ? glyf._numContours : glyf.contours ? glyf.contours.length : 0;
          view.setInt16(pos, glyf.compound ? -1 : numC, false);
          view.setInt16(pos + 2, glyf.xMin, false);
          view.setInt16(pos + 4, glyf.yMin, false);
          view.setInt16(pos + 6, glyf.xMax, false);
          view.setInt16(pos + 8, glyf.yMax, false);
          pos += 10;
          if (glyf.compound) {
            var subGlyfs = glyf.glyfs;
            for (var gi = 0, gl2 = subGlyfs.length; gi < gl2; gi++) {
              var g = subGlyfs[gi];
              var flags = g.points ? 0 : ARGS_ARE_XY_VALUES | ROUND_XY_TO_GRID;
              if (gi < gl2 - 1) flags |= MORE_COMPONENTS;
              if (g.useMyMetrics) flags |= USE_MY_METRICS;
              if (g.overlapCompound) flags |= OVERLAP_COMPOUND;
              var transform = g.transform;
              var a = transform.a;
              var b = transform.b;
              var c = transform.c;
              var d = transform.d;
              var pts = g.points;
              var e = pts ? pts[0] : transform.e;
              var f = pts ? pts[1] : transform.f;
              if (e < 0 || e > 127 || f < 0 || f > 127) {
                flags |= ARG_1_AND_2_ARE_WORDS;
              }
              if (b || c) {
                flags |= WE_HAVE_A_TWO_BY_TWO;
              } else if ((a !== 1 || d !== 1) && a === d) {
                flags |= WE_HAVE_A_SCALE;
              } else if (a !== 1 || d !== 1) {
                flags |= WE_HAVE_AN_X_AND_Y_SCALE;
              }
              view.setUint16(pos, flags, false);
              pos += 2;
              view.setUint16(pos, g.glyphIndex, false);
              pos += 2;
              if (ARG_1_AND_2_ARE_WORDS & flags) {
                view.setInt16(pos, e, false);
                pos += 2;
                view.setInt16(pos, f, false);
                pos += 2;
              } else {
                view.setUint8(pos, e);
                pos += 1;
                view.setUint8(pos, f);
                pos += 1;
              }
              var sa = a * 16384 + 0.5 | 0;
              if (WE_HAVE_A_SCALE & flags) {
                view.setInt16(pos, sa, false);
                pos += 2;
              } else if (WE_HAVE_AN_X_AND_Y_SCALE & flags) {
                var sd = d * 16384 + 0.5 | 0;
                view.setInt16(pos, sa, false);
                pos += 2;
                view.setInt16(pos, sd, false);
                pos += 2;
              } else if (WE_HAVE_A_TWO_BY_TWO & flags) {
                var sb = b * 16384 + 0.5 | 0;
                var sc = c * 16384 + 0.5 | 0;
                var sd = d * 16384 + 0.5 | 0;
                view.setInt16(pos, sa, false);
                pos += 2;
                view.setInt16(pos, sb, false);
                pos += 2;
                view.setInt16(pos, sc, false);
                pos += 2;
                view.setInt16(pos, sd, false);
                pos += 2;
              }
            }
          } else {
            var contours = glyf.contours;
            var endPts = -1;
            var ppc = glyf._pointsPerContour;
            if (ppc) {
              for (var ci = 0, cl = ppc.length; ci < cl; ci++) {
                endPts += ppc[ci];
                view.setUint16(pos, endPts, false);
                pos += 2;
              }
            } else {
              var isFlat = glyf._flatContours;
              for (var ci2 = 0, cl2 = contours.length; ci2 < cl2; ci2++) {
                endPts += isFlat ? contours[ci2].length / 3 : contours[ci2].length;
                view.setUint16(pos, endPts, false);
                pos += 2;
              }
            }
            if (hinting && glyf.instructions) {
              var instructions = glyf.instructions;
              view.setUint16(pos, instructions.length, false);
              pos += 2;
              if (instructions.length > 0) {
                var instrArr = instructions instanceof Uint8Array ? instructions : new Uint8Array(instructions);
                fullView.set(instrArr, pos);
              }
              pos += instructions.length;
            } else {
              view.setUint16(pos, 0, false);
              pos += 2;
            }
            var flags = gSupport.flags;
            if (flags && flags.length > 0) {
              fullView.set(flags, pos);
              pos += flags.length;
            }
            if (gSupport.xEncoded) {
              fullView.set(gSupport.xEncoded, pos);
              pos += gSupport.xEncoded.length;
            } else {
              var xCoord = gSupport.xCoord || [];
              for (var xi = 0, xl = xCoord.length; xi < xl; xi++) {
                var xv = xCoord[xi];
                if (0 <= xv && xv <= 255) {
                  view.setUint8(pos, xv);
                  pos += 1;
                } else {
                  view.setInt16(pos, xv, false);
                  pos += 2;
                }
              }
            }
            if (gSupport.yEncoded) {
              fullView.set(gSupport.yEncoded, pos);
              pos += gSupport.yEncoded.length;
            } else {
              var yCoord = gSupport.yCoord || [];
              for (var yi = 0, yl = yCoord.length; yi < yl; yi++) {
                var yv = yCoord[yi];
                if (0 <= yv && yv <= 255) {
                  view.setUint8(pos, yv);
                  pos += 1;
                } else {
                  view.setInt16(pos, yv, false);
                  pos += 2;
                }
              }
            }
          }
        }
        var glyfSize = gSupport.glyfSize;
        var pad = glyfSize % 4;
        if (pad) {
          fullView.fill(0, pos, pos + (4 - pad));
          pos += 4 - pad;
        }
        writer.offset = pos;
      }
      return writer;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/glyf/sizeof.js
var require_sizeof2 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/glyf/sizeof.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = sizeof;
    var _glyFlag = _interopRequireDefault(require_glyFlag());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _ONCURVE = _glyFlag.default.ONCURVE;
    var _XSHORT = _glyFlag.default.XSHORT;
    var _YSHORT = _glyFlag.default.YSHORT;
    var _XSAME = _glyFlag.default.XSAME;
    var _YSAME = _glyFlag.default.YSAME;
    var _REPEAT = _glyFlag.default.REPEAT;
    function getFlagsAndSize(glyf, glyfSupport, hinting) {
      if (!glyf.contours || glyf.contours.length === 0) {
        return 0;
      }
      var pre = glyf._precomputedGlyfSupport || (glyf._preFlags ? glyf : null);
      if (pre) {
        glyfSupport.flags = pre.flags || pre._preFlags;
        var pxBuf = pre.xBuf || pre._preXBuf;
        if (pxBuf) {
          glyfSupport.xEncoded = pxBuf;
          glyfSupport.yEncoded = pre.yBuf || pre._preYBuf;
        } else {
          glyfSupport.xCoord = pre.xCoord;
          glyfSupport.yCoord = pre.yCoord;
        }
        glyf._precomputedGlyfSupport = null;
        var instructionSize = hinting && glyf.instructions ? glyf.instructions.length : 0;
        var nc = glyf._numContours != null ? glyf._numContours : glyf.contours.length;
        var encSz = pre.encodedCoordSize || pre._preEncodedCoordSize;
        return 12 + nc * 2 + glyfSupport.flags.length + encSz + instructionSize;
      }
      var ONCURVE = _ONCURVE;
      var XSHORT = _XSHORT;
      var YSHORT = _YSHORT;
      var XSAME = _XSAME;
      var YSAME = _YSAME;
      var REPEAT = _REPEAT;
      var contours = glyf.contours;
      var isFlat = glyf._flatContours;
      var totalPts = 0;
      for (var tc = 0, tcl = contours.length; tc < tcl; tc++) {
        totalPts += isFlat ? contours[tc].length / 3 | 0 : contours[tc].length;
      }
      var flagsC = new Uint8Array(totalPts);
      var xCoordBuf = new Uint8Array(totalPts * 2);
      var yCoordBuf = new Uint8Array(totalPts * 2);
      var xbi = 0, ybi = 0;
      var prevX = 0, prevY = 0;
      var prevFlag = -1;
      var repeatPoint = -1;
      var fi = 0;
      var encodedCoordSize = 0;
      var started = false;
      for (var j = 0, cl = contours.length; j < cl; j++) {
        var contour = contours[j];
        var step, cLen;
        if (isFlat) {
          step = 3;
          cLen = contour.length;
        } else {
          step = 1;
          cLen = contour.length;
        }
        for (var i = 0; i < cLen; i += step) {
          var px, py, onCurve;
          if (isFlat) {
            px = contour[i];
            py = contour[i + 1];
            onCurve = contour[i + 2];
          } else {
            px = contour[i].x;
            py = contour[i].y;
            onCurve = contour[i].onCurve;
          }
          var flag = onCurve ? ONCURVE : 0;
          var dx, dy;
          if (!started) {
            dx = px;
            dy = py;
            started = true;
          } else {
            dx = px - prevX;
            dy = py - prevY;
          }
          prevX = px;
          prevY = py;
          if (dx === 0) {
            flag += XSAME;
          } else if (dx > -256 && dx < 256) {
            flag += XSHORT;
            if (dx > 0) flag += XSAME;
            xCoordBuf[xbi++] = dx > 0 ? dx : -dx;
            encodedCoordSize += 1;
          } else {
            xCoordBuf[xbi++] = dx >> 8 & 255;
            xCoordBuf[xbi++] = dx & 255;
            encodedCoordSize += 2;
          }
          if (dy === 0) {
            flag += YSAME;
          } else if (dy > -256 && dy < 256) {
            flag += YSHORT;
            if (dy > 0) flag += YSAME;
            yCoordBuf[ybi++] = dy > 0 ? dy : -dy;
            encodedCoordSize += 1;
          } else {
            yCoordBuf[ybi++] = dy >> 8 & 255;
            yCoordBuf[ybi++] = dy & 255;
            encodedCoordSize += 2;
          }
          if (flag === prevFlag && started) {
            if (repeatPoint === -1) {
              repeatPoint = fi - 1;
              flagsC[repeatPoint] |= REPEAT;
              flagsC[fi++] = 1;
            } else if (flagsC[repeatPoint + 1] < 255) {
              ++flagsC[repeatPoint + 1];
            } else {
              repeatPoint = -1;
              flagsC[fi++] = prevFlag = flag;
            }
          } else {
            repeatPoint = -1;
            flagsC[fi++] = prevFlag = flag;
          }
        }
      }
      flagsC = flagsC.subarray(0, fi);
      glyfSupport.flags = flagsC;
      glyfSupport.xEncoded = xCoordBuf.subarray(0, xbi);
      glyfSupport.yEncoded = yCoordBuf.subarray(0, ybi);
      var instructionSize = hinting && glyf.instructions ? glyf.instructions.length : 0;
      return 12 + contours.length * 2 + flagsC.length + encodedCoordSize + instructionSize;
    }
    function sizeofCompound(glyf) {
      var size = 10;
      var glyfs = glyf.glyfs;
      for (var i = 0, l = glyfs.length; i < l; i++) {
        var transform = glyfs[i].transform;
        var e = transform.e, f = transform.f;
        var a = transform.a, b = transform.b, c = transform.c, d = transform.d;
        size += 4;
        if (e < 0 || e > 127 || f < 0 || f > 127) {
          size += 4;
        } else {
          size += 2;
        }
        if (b || c) {
          size += 8;
        } else if (a !== 1 || d !== 1) {
          size += a === d ? 2 : 4;
        }
      }
      return size;
    }
    var EMPTY_GLYF_SUPPORT = { glyfSize: 0, size: 0 };
    function sizeof(ttf) {
      var glyfs = ttf.glyf;
      var glyfSupportArr = new Array(glyfs.length);
      ttf.support.glyf = glyfSupportArr;
      var tableSize = 0;
      var opts = ttf.writeOptions || {};
      var hinting = opts.hinting;
      var writeZeroContoursGlyfData = opts.writeZeroContoursGlyfData;
      for (var i = 0, gl = glyfs.length; i < gl; i++) {
        var glyf = glyfs[i];
        var glyfSupport;
        var glyfSize;
        if (glyf.compound) {
          glyfSupport = {};
          glyfSize = sizeofCompound(glyf);
        } else if (!writeZeroContoursGlyfData && (!glyf.contours || !glyf.contours.length)) {
          glyfSize = 0;
          glyfSupport = EMPTY_GLYF_SUPPORT;
        } else if (glyf._origBuf) {
          glyfSupport = {};
          glyfSize = glyf._origLen - (glyf._instrOff >= 0 ? glyf._instrLen : 0);
        } else {
          glyfSupport = {};
          glyfSize = getFlagsAndSize(glyf, glyfSupport, hinting);
        }
        var size = glyfSize + 3 & ~3;
        glyfSupport.glyfSize = glyfSize;
        glyfSupport.size = size;
        glyfSupportArr[i] = glyfSupport;
        tableSize += size;
      }
      ttf.head.indexToLocFormat = tableSize > 65536 ? 1 : 0;
      return tableSize;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/table/glyf.js
var require_glyf = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/glyf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    var _parse = _interopRequireDefault(require_parse2());
    var _write = _interopRequireDefault(require_write2());
    var _sizeof = _interopRequireDefault(require_sizeof2());
    var _lang = require_lang();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("glyf", [], {
      read: function read(reader, ttf) {
        var startOffset = this.offset;
        var loca = ttf.loca;
        var numGlyphs = ttf.maxp.numGlyphs;
        var glyphs = [];
        reader.seek(startOffset);
        var subset = ttf.readOptions.subset;
        if (subset && subset.length > 0) {
          var subsetMap = { 0: true };
          var subsetGids = [0];
          var cmap = ttf.cmap;
          var subsetUnicodeMap = {};
          for (var si = 0, sl = subset.length; si < sl; si++) {
            var u = subset[si];
            var gid = cmap[u];
            if (gid !== void 0) {
              subsetUnicodeMap[u] = gid;
              if (!subsetMap[gid]) {
                subsetMap[gid] = true;
                subsetGids.push(gid);
              }
            }
          }
          ttf.subsetMap = subsetMap;
          ttf.subsetGids = subsetGids;
          ttf._subsetUnicodeMap = subsetUnicodeMap;
          var extraSubsetGids = ttf.readOptions.extraSubsetGids;
          if (extraSubsetGids && extraSubsetGids.length > 0) {
            for (var ei = 0, el = extraSubsetGids.length; ei < el; ei++) {
              var eg = extraSubsetGids[ei];
              if (!subsetMap[eg]) {
                subsetMap[eg] = true;
                subsetGids.push(eg);
              }
            }
          }
          var parsedGlyfMap = {};
          var view = reader.view;
          var fullBuf = view.buffer;
          var fullBufOff = view.byteOffset;
          var componentGids = {};
          var queue = subsetGids;
          while (queue.length > 0) {
            var nextQueue = [];
            for (var qi = 0, ql = queue.length; qi < ql; qi++) {
              var index = queue[qi];
              parsedGlyfMap[index] = true;
              var gStart = startOffset + loca[index];
              var gEnd = startOffset + loca[index + 1];
              if (gStart === gEnd) {
                glyphs[index] = { contours: [] };
              } else {
                var vOff = fullBufOff + gStart;
                var numberOfContours = view.getInt16(vOff, false);
                if (numberOfContours >= 0 && !componentGids[index]) {
                  var _instrOff = -1;
                  var _instrLen = 0;
                  if (numberOfContours > 0) {
                    var _instrLenPos = vOff + 10 + numberOfContours * 2;
                    if (_instrLenPos + 2 <= vOff + (gEnd - gStart)) {
                      _instrLen = view.getUint16(_instrLenPos, false);
                      if (_instrLen > 0) _instrOff = _instrLenPos;
                    }
                  }
                  var glyfObj = {
                    xMin: view.getInt16(vOff + 2, false),
                    yMin: view.getInt16(vOff + 4, false),
                    xMax: view.getInt16(vOff + 6, false),
                    yMax: view.getInt16(vOff + 8, false),
                    _origBuf: fullBuf,
                    _origOff: fullBufOff + gStart,
                    _origLen: gEnd - gStart,
                    _numContours: numberOfContours,
                    _totalPoints: numberOfContours > 0 ? view.getUint16(vOff + 10 + (numberOfContours - 1) * 2, false) + 1 : 0,
                    _instrOff,
                    _instrLen
                  };
                  glyphs[index] = glyfObj;
                } else {
                  glyphs[index] = (0, _parse.default)(reader, ttf, gStart);
                }
              }
              if (glyphs[index].compound) {
                var glyfs = glyphs[index].glyfs;
                for (var gi = 0, gl = glyfs.length; gi < gl; gi++) {
                  var compGid = glyfs[gi].glyphIndex;
                  componentGids[compGid] = true;
                  if (parsedGlyfMap[compGid] && glyphs[compGid] && glyphs[compGid]._origBuf) {
                    var cgStart = startOffset + loca[compGid];
                    glyphs[compGid] = (0, _parse.default)(reader, ttf, cgStart);
                  }
                  if (!parsedGlyfMap[compGid]) {
                    nextQueue.push(compGid);
                  }
                }
              }
            }
            queue = nextQueue;
          }
          return glyphs;
        }
        for (var i = 0, l = numGlyphs - 1; i < l; i++) {
          if (loca[i] === loca[i + 1]) {
            glyphs[i] = { contours: [] };
          } else {
            glyphs[i] = (0, _parse.default)(reader, ttf, startOffset + loca[i]);
          }
        }
        if (ttf.tables.glyf.length - loca[i] < 5) {
          glyphs[i] = { contours: [] };
        } else {
          glyphs[i] = (0, _parse.default)(reader, ttf, startOffset + loca[i]);
        }
        return glyphs;
      },
      write: _write.default,
      size: _sizeof.default
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/fpgm.js
var require_fpgm = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/fpgm.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("fpgm", [], {
      read: function read(reader, ttf) {
        var length = ttf.tables.fpgm.length;
        return reader.readBytes(this.offset, length);
      },
      write: function write(writer, ttf) {
        if (ttf.fpgm) {
          writer.writeBytes(ttf.fpgm, ttf.fpgm.length);
        }
      },
      size: function size(ttf) {
        return ttf.fpgm ? ttf.fpgm.length : 0;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/cvt.js
var require_cvt = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/cvt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("cvt", [], {
      read: function read(reader, ttf) {
        var length = ttf.tables.cvt.length;
        return reader.readBytes(this.offset, length);
      },
      write: function write(writer, ttf) {
        if (ttf.cvt) {
          writer.writeBytes(ttf.cvt, ttf.cvt.length);
        }
      },
      size: function size(ttf) {
        return ttf.cvt ? ttf.cvt.length : 0;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/prep.js
var require_prep = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/prep.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("prep", [], {
      read: function read(reader, ttf) {
        var length = ttf.tables.prep.length;
        return reader.readBytes(this.offset, length);
      },
      write: function write(writer, ttf) {
        if (ttf.prep) {
          writer.writeBytes(ttf.prep, ttf.prep.length);
        }
      },
      size: function size(ttf) {
        return ttf.prep ? ttf.prep.length : 0;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/gasp.js
var require_gasp = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/gasp.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("gasp", [], {
      read: function read(reader, ttf) {
        var length = ttf.tables.gasp.length;
        return reader.readBytes(this.offset, length);
      },
      write: function write(writer, ttf) {
        if (ttf.gasp) {
          writer.writeBytes(ttf.gasp, ttf.gasp.length);
        }
      },
      size: function size(ttf) {
        return ttf.gasp ? ttf.gasp.length : 0;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/GSUB.js
var require_GSUB = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/GSUB.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("GSUB", [], {
      read: function read(reader, ttf) {
        var length = ttf.tables.GSUB.length;
        return new Uint8Array(reader.view.buffer, reader.view.byteOffset + this.offset, length);
      },
      write: function write(writer, ttf) {
        if (ttf.GSUB) {
          writer.writeBytes(ttf.GSUB, ttf.GSUB.length);
        }
      },
      size: function size(ttf) {
        return ttf.GSUB ? ttf.GSUB.length : 0;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/kerx.js
var require_kerx = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/kerx.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _table = _interopRequireDefault(require_table());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = _table.default.create("kerx", [], {
      read: function read(reader, ttf) {
        var length = ttf.tables.kerx.length;
        return reader.readBytes(this.offset, length);
      },
      write: function write(writer, ttf) {
        if (ttf.kerx) {
          writer.writeBytes(ttf.kerx, ttf.kerx.length);
        }
      },
      size: function size(ttf) {
        return ttf.kerx ? ttf.kerx.length : 0;
      }
    });
  }
});

// vendor/fonteditor-core/lib/ttf/table/support.js
var require_support = __commonJS({
  "vendor/fonteditor-core/lib/ttf/table/support.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _head = _interopRequireDefault(require_head());
    var _maxp = _interopRequireDefault(require_maxp());
    var _loca = _interopRequireDefault(require_loca());
    var _cmap = _interopRequireDefault(require_cmap());
    var _glyf = _interopRequireDefault(require_glyf());
    var _name = _interopRequireDefault(require_name());
    var _hhea = _interopRequireDefault(require_hhea());
    var _hmtx = _interopRequireDefault(require_hmtx());
    var _post = _interopRequireDefault(require_post());
    var _OS = _interopRequireDefault(require_OS2());
    var _fpgm = _interopRequireDefault(require_fpgm());
    var _cvt = _interopRequireDefault(require_cvt());
    var _prep = _interopRequireDefault(require_prep());
    var _gasp = _interopRequireDefault(require_gasp());
    var _GPOS = _interopRequireDefault(require_GPOS());
    var _GSUB = _interopRequireDefault(require_GSUB());
    var _kern = _interopRequireDefault(require_kern());
    var _kerx = _interopRequireDefault(require_kerx());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = exports2.default = {
      head: _head.default,
      maxp: _maxp.default,
      loca: _loca.default,
      cmap: _cmap.default,
      glyf: _glyf.default,
      name: _name.default,
      hhea: _hhea.default,
      hmtx: _hmtx.default,
      post: _post.default,
      "OS/2": _OS.default,
      fpgm: _fpgm.default,
      cvt: _cvt.default,
      prep: _prep.default,
      gasp: _gasp.default,
      GPOS: _GPOS.default,
      GSUB: _GSUB.default,
      kern: _kern.default,
      kerx: _kerx.default
    };
  }
});

// vendor/fonteditor-core/lib/ttf/ttfreader.js
var require_ttfreader = __commonJS({
  "vendor/fonteditor-core/lib/ttf/ttfreader.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _directory = _interopRequireDefault(require_directory());
    var _support = _interopRequireDefault(require_support());
    var _reader = _interopRequireDefault(require_reader());
    var _postName = _interopRequireDefault(require_postName());
    var _error = _interopRequireDefault(require_error());
    var _compound2simpleglyf = _interopRequireDefault(require_compound2simpleglyf());
    var _post = require_post();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TTF_TABLE_NAMES = ["head", "maxp", "loca", "cmap", "glyf", "name", "hhea", "hmtx", "post", "OS/2", "fpgm", "cvt", "prep", "gasp", "GPOS", "GSUB", "kern", "kerx"];
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    var TTFReader = exports2.default = /* @__PURE__ */ function() {
      function TTFReader2() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        options.subset = options.subset || [];
        options.hinting = options.hinting || false;
        options.kerning = options.kerning || false;
        options.compound2simple = options.compound2simple || false;
        this.options = options;
      }
      return _createClass(TTFReader2, [{
        key: "readBuffer",
        value: function readBuffer(buffer) {
          var reader = new _reader.default(buffer, 0, buffer.byteLength, false);
          var ttf = {};
          var view = reader.view;
          var vOffset = view.byteOffset;
          ttf.version = view.getInt32(vOffset, false) / 65536;
          if (ttf.version !== 1) {
            _error.default.raise(10101);
          }
          ttf.numTables = view.getUint16(vOffset + 4, false);
          if (ttf.numTables <= 0 || ttf.numTables > 100) {
            _error.default.raise(10101);
          }
          ttf.searchRange = view.getUint16(vOffset + 6, false);
          ttf.entrySelector = view.getUint16(vOffset + 8, false);
          ttf.rangeShift = view.getUint16(vOffset + 10, false);
          reader.offset = 12;
          ttf.tables = new _directory.default(reader.offset).read(reader, ttf);
          if (!ttf.tables.glyf || !ttf.tables.head || !ttf.tables.cmap || !ttf.tables.hmtx) {
            _error.default.raise(10204);
          }
          ttf.readOptions = this.options;
          var hinting = this.options.hinting;
          var kerning = this.options.kerning;
          var supportTables = _support.default;
          var tableInstances = {};
          var ttfTableNames = TTF_TABLE_NAMES;
          for (var ti = 0, tl = ttfTableNames.length; ti < tl; ti++) {
            var tableName = ttfTableNames[ti];
            if (ttf.tables[tableName]) {
              if (!hinting && (tableName === "fpgm" || tableName === "cvt" || tableName === "prep" || tableName === "gasp")) {
                continue;
              }
              if (!hinting && !kerning && (tableName === "GPOS" || tableName === "GSUB" || tableName === "kern" || tableName === "kerx")) {
                continue;
              }
              var offset = ttf.tables[tableName].offset;
              if (!tableInstances[tableName]) {
                tableInstances[tableName] = new supportTables[tableName](offset);
              } else {
                tableInstances[tableName].offset = offset;
              }
              ttf[tableName] = tableInstances[tableName].read(reader, ttf);
            }
          }
          if (!ttf.glyf) {
            _error.default.raise(10201);
          }
          reader.dispose();
          return ttf;
        }
      }, {
        key: "resolveGlyf",
        value: function resolveGlyf(ttf) {
          var codes = ttf.cmap;
          var glyf = ttf.glyf;
          var subsetMap = ttf.readOptions.subset ? ttf.subsetMap : null;
          var subsetGids = ttf.readOptions.subset ? ttf.subsetGids : null;
          if (ttf._subsetUnicodeMap) {
            var sum = ttf._subsetUnicodeMap;
            for (var uStr in sum) {
              var u = +uStr;
              var i = sum[u];
              if (!glyf[i].unicode) {
                glyf[i].unicode = [u];
              } else {
                glyf[i].unicode.push(u);
              }
            }
            ttf._subsetUnicodeMap = null;
          } else {
            for (var c in codes) {
              var i = codes[c];
              var code = +c;
              if (!glyf[i].unicode) {
                glyf[i].unicode = [code];
              } else {
                glyf[i].unicode.push(code);
              }
            }
          }
          var hmtx = ttf.hmtx;
          if (subsetGids) {
            for (var gi = 0, gl = subsetGids.length; gi < gl; gi++) {
              var idxNum = subsetGids[gi];
              var hIdx = gi * 2;
              glyf[idxNum].advanceWidth = hmtx[hIdx];
              glyf[idxNum].leftSideBearing = hmtx[hIdx + 1];
            }
          } else {
            for (var hi = 0, hl = hmtx.length / 2; hi < hl; hi++) {
              var hIdx2 = hi * 2;
              glyf[hi].advanceWidth = hmtx[hIdx2];
              glyf[hi].leftSideBearing = hmtx[hIdx2 + 1];
            }
          }
          if (ttf.post && 2 === ttf.post.format) {
            var nameIndex = ttf.post.nameIndex;
            var names = ttf.post.names;
            var pascalBytes = ttf.post._pascalStringBytes;
            var pascalOffsets = ttf.post._pascalStringOffsets;
            var niView = ttf.post._nameIndexView;
            var niViewOffset = ttf.post._nameIndexViewOffset;
            if (subsetGids) {
              for (var niIdx = 0, nl2 = subsetGids.length; niIdx < nl2; niIdx++) {
                var niNum = subsetGids[niIdx];
                var nIdx = niView ? niView.getUint16(niViewOffset + niNum * 2, false) : nameIndex && nameIndex[niNum];
                if (nIdx === void 0 || nIdx === null) continue;
                if (nIdx <= 257) {
                  glyf[niNum].name = _postName.default[nIdx];
                } else if (names) {
                  glyf[niNum].name = names[nIdx - 258] || "";
                } else if (pascalBytes) {
                  var off = pascalOffsets ? pascalOffsets[nIdx - 258] : null;
                  if (off === null) {
                    var pOff = 0;
                    for (var pk = 0; pk < nIdx - 258; pk++) {
                      pOff += 1 + (pascalBytes[pOff] || 0);
                    }
                    off = pOff;
                  }
                  glyf[niNum].name = off !== void 0 ? _post.getPascalStringAt(pascalBytes, off) : "";
                }
              }
            } else if (nameIndex) {
              for (var ni2 = 0, nl = nameIndex.length; ni2 < nl; ni2++) {
                var nIdx2 = nameIndex[ni2];
                if (nIdx2 <= 257) {
                  glyf[ni2].name = _postName.default[nIdx2];
                } else if (names) {
                  glyf[ni2].name = names[nIdx2 - 258] || "";
                } else if (pascalBytes && pascalOffsets) {
                  var off2 = pascalOffsets[nIdx2 - 258];
                  glyf[ni2].name = off2 !== void 0 ? _post.getPascalStringAt(pascalBytes, off2) : "";
                }
              }
            }
          }
          if (subsetGids) {
            var subGlyf = new Array(subsetGids.length);
            for (var si = 0, sl = subsetGids.length; si < sl; si++) {
              var siNum = subsetGids[si];
              if (glyf[siNum].compound) {
                (0, _compound2simpleglyf.default)(siNum, ttf, true);
              }
              subGlyf[si] = glyf[siNum];
            }
            ttf.glyf = subGlyf;
            ttf.maxp.maxComponentElements = 0;
            ttf.maxp.maxComponentDepth = 0;
          }
        }
      }, {
        key: "cleanTables",
        value: function cleanTables(ttf) {
          ttf.readOptions = null;
          ttf.tables = null;
          ttf.hmtx = null;
          ttf.loca = null;
          if (ttf.post) {
            ttf.post.nameIndex = null;
            ttf.post.names = null;
            ttf.post._pascalStringBytes = null;
            ttf.post._pascalStringOffsets = null;
          }
          ttf.subsetMap = null;
          if (!this.options.hinting) {
            ttf.fpgm = null;
            ttf.cvt = null;
            ttf.prep = null;
            var glyfs = ttf.glyf;
            for (var i = 0, l = glyfs.length; i < l; i++) {
              glyfs[i].instructions = null;
            }
          }
          if (!this.options.hinting && !this.options.kerning) {
            ttf.GPOS = null;
            ttf.GSUB = null;
            ttf.kern = null;
            ttf.kerx = null;
          }
          if (this.options.compound2simple && ttf.maxp.maxComponentElements) {
            var glyfs2 = ttf.glyf;
            for (var j = 0, jl = glyfs2.length; j < jl; j++) {
              if (glyfs2[j].compound) {
                (0, _compound2simpleglyf.default)(j, ttf, true);
              }
            }
            ttf.maxp.maxComponentElements = 0;
            ttf.maxp.maxComponentDepth = 0;
          }
        }
      }, {
        key: "read",
        value: function read(buffer) {
          this.ttf = this.readBuffer(buffer);
          this.resolveGlyf(this.ttf);
          this.cleanTables(this.ttf);
          return this.ttf;
        }
      }, {
        key: "dispose",
        value: function dispose() {
          this.ttf = null;
          this.options = null;
        }
      }]);
    }();
  }
});

// vendor/fonteditor-core/lib/ttf/util/checkSum.js
var require_checkSum = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/checkSum.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = checkSum;
    exports2.checkSumArrayBuffer = checkSumArrayBuffer;
    function checkSumArrayBuffer(buffer, offset, length, bytes, view) {
      if (offset === void 0) offset = 0;
      length = length == null ? buffer.byteLength : length;
      if (offset + length > buffer.byteLength) {
        throw new Error("check sum out of bound");
      }
      var useGlobalView = view && view.byteLength >= offset + length;
      if (!useGlobalView) {
        if (!bytes) {
          bytes = new Uint8Array(buffer, offset, length);
        } else if (offset > 0) {
          bytes = bytes.subarray(offset, offset + length);
        }
        view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        offset = 0;
      }
      var nLongs = length >> 2;
      var sum = 0;
      var i = 0;
      while (i < nLongs) {
        sum = sum + view.getUint32(offset + (i << 2), false) | 0;
        i++;
      }
      var leftBytes = length - nLongs * 4;
      if (leftBytes) {
        var off = offset + (nLongs << 2);
        var val = 0;
        for (var k = 0; k < leftBytes; k++) {
          val = val << 8 | view.getUint8(off + k);
        }
        sum = sum + val | 0;
      }
      return sum >>> 0;
    }
    function checkSumArray(buffer, offset, length) {
      if (offset === void 0) offset = 0;
      length = length || buffer.length;
      if (offset + length > buffer.length) {
        throw new Error("check sum out of bound");
      }
      var nLongs = length >> 2;
      var sum = 0;
      var i = 0;
      while (i < nLongs) {
        sum = sum + ((buffer[i] << 24 | buffer[i + 1] << 16 | buffer[i + 2] << 8 | buffer[i + 3]) >>> 0) | 0;
        i += 4;
      }
      var leftBytes = length - nLongs * 4;
      if (leftBytes) {
        var off = nLongs << 2;
        var val = 0;
        for (var k = 0; k < leftBytes; k++) {
          val = val << 8 | buffer[off + k];
        }
        sum = sum + val | 0;
      }
      return sum >>> 0;
    }
    function checkSum(buffer, offset, length) {
      if (buffer instanceof ArrayBuffer) {
        return checkSumArrayBuffer(buffer, offset, length);
      } else if (buffer instanceof Array) {
        return checkSumArray(buffer, offset, length);
      }
      throw new Error("not support checksum buffer type");
    }
  }
});

// vendor/fonteditor-core/lib/ttf/ttfwriter.js
var require_ttfwriter = __commonJS({
  "vendor/fonteditor-core/lib/ttf/ttfwriter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _writer = _interopRequireDefault(require_writer());
    var _directory = _interopRequireDefault(require_directory());
    var _support = _interopRequireDefault(require_support());
    var _checkSum = _interopRequireDefault(require_checkSum());
    var _checkSumArrayBuffer = _interopRequireDefault(require_checkSum()).checkSumArrayBuffer;
    var _error = _interopRequireDefault(require_error());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    var SUPPORT_TABLES = ["OS/2", "cmap", "glyf", "head", "hhea", "hmtx", "loca", "maxp", "name", "post"];
    var ALL_DIGITS = /^\d+$/;
    var TTFWriter = exports2.default = /* @__PURE__ */ function() {
      function TTFWriter2() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        this.options = {
          writeZeroContoursGlyfData: options.writeZeroContoursGlyfData || false,
          hinting: options.hinting || false,
          kerning: options.kerning || false,
          support: options.support,
          /** 优化316: woff2/woff/eot 输出会重新编码，不消费 TTF directory 的 per-table checksum 与
           *  head.checkSumAdjustment（encodeTTFToWOFF2 只读 directory 的 tag/offset/length，重建自己的 directory）。
           *  跳过 checksum 计算可省大字集下 ~5% 的 checkSumArrayBuffer 开销。head.checkSumAdjustment 保持 0 占位
           *  （resolveTTF 已置 0），浏览器渲染不依赖该字段。仅 ttf 直出（消费 directory checksum）时不能跳过。 */
          skipCheckSum: options.skipCheckSum || false
        };
      }
      return _createClass(TTFWriter2, [{
        key: "resolveTTF",
        value: function resolveTTF(ttf) {
          ttf.version = ttf.version || 1;
          ttf.numTables = ttf.writeOptions.tables.length;
          ttf.entrySelector = 31 - Math.clz32(ttf.numTables);
          ttf.searchRange = 2 << ttf.entrySelector;
          ttf.rangeShift = ttf.numTables * 16 - ttf.searchRange;
          ttf.head.checkSumAdjustment = 0;
          ttf.head.magickNumber = 1594834165;
          if (typeof ttf.head.created === "string") {
            ttf.head.created = ALL_DIGITS.test(ttf.head.created) ? +ttf.head.created : Date.parse(ttf.head.created);
          }
          if (typeof ttf.head.modified === "string") {
            ttf.head.modified = /^\d+$/.test(ttf.head.modified) ? +ttf.head.modified : Date.parse(ttf.head.modified);
          }
          if (!ttf.head.created) {
            ttf.head.created = Date.now();
          }
          if (!ttf.head.modified) {
            ttf.head.modified = ttf.head.created;
          }
          if (!ttf._unicodeSorted) {
            var checkUnicodeRepeat = {};
            var glyfs = ttf.glyf;
            for (var index = 0, gl = glyfs.length; index < gl; index++) {
              var glyf = glyfs[index];
              if (glyf.unicode) {
                glyf.unicode.sort(function(a, b) {
                  return a - b;
                });
                var unicode = glyf.unicode;
                for (var ui = 0, ul = unicode.length; ui < ul; ui++) {
                  var u = unicode[ui];
                  if (checkUnicodeRepeat[u]) {
                    _error.default.raise({ number: 10200, data: index }, index);
                  } else {
                    checkUnicodeRepeat[u] = true;
                  }
                }
              }
            }
          }
        }
      }, {
        key: "dump",
        value: function dump(ttf) {
          ttf.support = this.options.support ? Object.assign({}, this.options.support) : {};
          var ttfSize = 12 + ttf.numTables * 16;
          var ttfHeadOffset = 0;
          var writeTables = ttf.writeOptions.tables;
          var supportTables = _support.default;
          var tableInstances = {};
          var supportTablesArr = new Array(writeTables.length);
          ttf.support.tables = supportTablesArr;
          for (var ti = 0, tl = writeTables.length; ti < tl; ti++) {
            var tableName = writeTables[ti];
            var offset = ttfSize;
            if (!tableInstances[tableName]) {
              tableInstances[tableName] = new supportTables[tableName]();
            }
            var tableSize = tableInstances[tableName].size(ttf);
            var size = tableSize;
            if (tableName === "head") {
              ttfHeadOffset = offset;
            }
            size = size + 3 & ~3;
            supportTablesArr[ti] = {
              name: tableName,
              checkSum: 0,
              offset,
              length: tableSize,
              size
            };
            ttfSize += size;
          }
          var writer = new _writer.default(new ArrayBuffer(ttfSize));
          var wView = writer.view;
          var pos = writer.offset;
          wView.setInt32(pos, ttf.version * 65536 + 0.5 | 0, false);
          pos += 4;
          wView.setUint16(pos, ttf.numTables, false);
          pos += 2;
          wView.setUint16(pos, ttf.searchRange, false);
          pos += 2;
          wView.setUint16(pos, ttf.entrySelector, false);
          pos += 2;
          wView.setUint16(pos, ttf.rangeShift, false);
          pos += 2;
          writer.offset = pos;
          if (!tableInstances["directory"]) {
            tableInstances["directory"] = new _directory.default();
          }
          tableInstances["directory"].write(writer, ttf);
          var supportTableList = ttf.support.tables;
          var buf = writer.getBuffer();
          var skipCheckSum = this.options.skipCheckSum;
          var wholeCheckSum = 0;
          var fullView = new Uint8Array(buf);
          var fullDataView = skipCheckSum ? null : new DataView(buf);
          for (var si = 0, sl = supportTableList.length; si < sl; si++) {
            var table = supportTableList[si];
            var tableStart = writer.offset;
            var tName = table.name;
            if (!tableInstances[tName]) {
              tableInstances[tName] = new supportTables[tName]();
            }
            tableInstances[tName].write(writer, ttf);
            var pad = table.length % 4;
            if (pad) {
              fullView.fill(0, wView.byteOffset + writer.offset, wView.byteOffset + writer.offset + (4 - pad));
              writer.offset += 4 - pad;
            }
            if (!skipCheckSum) {
              table.checkSum = _checkSumArrayBuffer(buf, tableStart, table.size, fullView, fullDataView);
              wholeCheckSum = wholeCheckSum + table.checkSum >>> 0;
            }
          }
          if (!skipCheckSum) {
            var csView = writer.view;
            for (var ci = 0, cl = supportTableList.length; ci < cl; ci++) {
              var offset2 = 12 + ci * 16 + 4;
              csView.setUint32(offset2, supportTableList[ci].checkSum, false);
            }
            var ttfCheckSum = 2981146554 - wholeCheckSum >>> 0;
            csView.setUint32(ttfHeadOffset + 8, ttfCheckSum, false);
          }
          ttf.writeOptions = null;
          ttf.support = null;
          writer.dispose();
          return buf;
        }
      }, {
        key: "prepareDump",
        value: function prepareDump(ttf) {
          if (!ttf.glyf || ttf.glyf.length === 0) {
            _error.default.raise(10201);
          }
          if (!ttf["OS/2"] || !ttf.head || !ttf.name) {
            _error.default.raise(10204);
          }
          var tables = SUPPORT_TABLES;
          ttf.writeOptions = {};
          if (this.options.hinting || this.options.kerning) {
            tables = SUPPORT_TABLES.slice();
            var added = {};
            if (this.options.hinting) {
              var hintTables = ["cvt", "fpgm", "prep", "gasp", "GPOS", "kern", "kerx"];
              for (var i = 0; i < hintTables.length; i++) {
                var tn = hintTables[i];
                if (ttf[tn] && !added[tn]) {
                  tables.push(tn);
                  added[tn] = true;
                }
              }
            }
            if (this.options.kerning) {
              var kernTables = ["GPOS", "GSUB", "kern", "kerx"];
              for (var j = 0; j < kernTables.length; j++) {
                var kn = kernTables[j];
                if (ttf[kn] && !added[kn]) {
                  tables.push(kn);
                  added[kn] = true;
                }
              }
            }
          }
          ttf.writeOptions.writeZeroContoursGlyfData = !!this.options.writeZeroContoursGlyfData;
          ttf.writeOptions.hinting = !!this.options.hinting;
          ttf.writeOptions.kerning = !!this.options.kerning;
          ttf.writeOptions.tables = tables;
        }
      }, {
        key: "write",
        value: function write(ttf) {
          this.prepareDump(ttf);
          this.resolveTTF(ttf);
          var buffer = this.dump(ttf);
          return buffer;
        }
      }, {
        key: "dispose",
        value: function dispose() {
          this.options = null;
        }
      }]);
    }();
  }
});

// vendor/fonteditor-core/lib/ttf/ttf2eot.js
var require_ttf2eot = __commonJS({
  "vendor/fonteditor-core/lib/ttf/ttf2eot.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = ttf2eot;
    var _reader = _interopRequireDefault(require_reader());
    var _writer = _interopRequireDefault(require_writer());
    var _string = _interopRequireDefault(require_string());
    var _error = _interopRequireDefault(require_error());
    var _table = _interopRequireDefault(require_table());
    var _struct = _interopRequireDefault(require_struct());
    var _name = _interopRequireDefault(require_name());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var EotHead = _table.default.create("head", [["EOTSize", _struct.default.Uint32], ["FontDataSize", _struct.default.Uint32], ["Version", _struct.default.Uint32], ["Flags", _struct.default.Uint32], ["PANOSE", _struct.default.Bytes, 10], ["Charset", _struct.default.Uint8], ["Italic", _struct.default.Uint8], ["Weight", _struct.default.Uint32], ["fsType", _struct.default.Uint16], ["MagicNumber", _struct.default.Uint16], ["UnicodeRange", _struct.default.Bytes, 16], ["CodePageRange", _struct.default.Bytes, 8], ["CheckSumAdjustment", _struct.default.Uint32], ["Reserved", _struct.default.Bytes, 16], ["Padding1", _struct.default.Uint16]]);
    function ttf2eot(ttfBuffer) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var eotHead = new EotHead();
      var eotHeaderSize = eotHead.size();
      var eot = {};
      eot.head = eotHead.read(new _reader.default(new ArrayBuffer(eotHeaderSize)));
      eot.head.FontDataSize = ttfBuffer.byteLength || ttfBuffer.length;
      eot.head.Version = 131073;
      eot.head.Flags = 0;
      eot.head.Charset = 1;
      eot.head.MagicNumber = 20556;
      eot.head.Padding1 = 0;
      var ttfReader = new _reader.default(ttfBuffer);
      var numTables = ttfReader.readUint16(4);
      if (numTables <= 0 || numTables > 100) {
        _error.default.raise(10101);
      }
      ttfReader.seek(12);
      var tblReaded = 0;
      for (var i = 0; i < numTables && tblReaded !== 7; ++i) {
        var tableEntry = {
          tag: ttfReader.readString(ttfReader.offset, 4),
          checkSum: ttfReader.readUint32(),
          offset: ttfReader.readUint32(),
          length: ttfReader.readUint32()
        };
        var entryOffset = ttfReader.offset;
        if (tableEntry.tag === "head") {
          eot.head.CheckSumAdjustment = ttfReader.readUint32(tableEntry.offset + 8);
          tblReaded += 1;
        } else if (tableEntry.tag === "OS/2") {
          eot.head.PANOSE = ttfReader.readBytes(tableEntry.offset + 32, 10);
          eot.head.Italic = ttfReader.readUint16(tableEntry.offset + 62);
          eot.head.Weight = ttfReader.readUint16(tableEntry.offset + 4);
          eot.head.fsType = ttfReader.readUint16(tableEntry.offset + 8);
          eot.head.UnicodeRange = ttfReader.readBytes(tableEntry.offset + 42, 16);
          eot.head.CodePageRange = ttfReader.readBytes(tableEntry.offset + 78, 8);
          tblReaded += 2;
        } else if (tableEntry.tag === "name") {
          var names = new _name.default(tableEntry.offset).read(ttfReader);
          eot.FamilyName = _string.default.toUCS2Bytes(names.fontFamily || "");
          eot.FamilyNameSize = eot.FamilyName.length;
          eot.StyleName = _string.default.toUCS2Bytes(names.fontStyle || "");
          eot.StyleNameSize = eot.StyleName.length;
          eot.VersionName = _string.default.toUCS2Bytes(names.version || "");
          eot.VersionNameSize = eot.VersionName.length;
          eot.FullName = _string.default.toUCS2Bytes(names.fullName || "");
          eot.FullNameSize = eot.FullName.length;
          tblReaded += 3;
        }
        ttfReader.seek(entryOffset);
      }
      eot.head.EOTSize = eotHeaderSize + 4 + eot.FamilyNameSize + 4 + eot.StyleNameSize + 4 + eot.VersionNameSize + 4 + eot.FullNameSize + 2 + eot.head.FontDataSize;
      var eotWriter = new _writer.default(new ArrayBuffer(eot.head.EOTSize), 0, eot.head.EOTSize, true);
      eotHead.write(eotWriter, eot);
      eotWriter.writeUint16(eot.FamilyNameSize);
      eotWriter.writeBytes(eot.FamilyName, eot.FamilyNameSize);
      eotWriter.writeUint16(0);
      eotWriter.writeUint16(eot.StyleNameSize);
      eotWriter.writeBytes(eot.StyleName, eot.StyleNameSize);
      eotWriter.writeUint16(0);
      eotWriter.writeUint16(eot.VersionNameSize);
      eotWriter.writeBytes(eot.VersionName, eot.VersionNameSize);
      eotWriter.writeUint16(0);
      eotWriter.writeUint16(eot.FullNameSize);
      eotWriter.writeBytes(eot.FullName, eot.FullNameSize);
      eotWriter.writeUint16(0);
      eotWriter.writeUint16(0);
      eotWriter.writeBytes(ttfBuffer, eot.head.FontDataSize);
      return eotWriter.getBuffer();
    }
  }
});

// vendor/fonteditor-core/lib/ttf/ttf2woff.js
var require_ttf2woff = __commonJS({
  "vendor/fonteditor-core/lib/ttf/ttf2woff.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = ttf2woff;
    var _reader = _interopRequireDefault(require_reader());
    var _writer = _interopRequireDefault(require_writer());
    var _string = _interopRequireDefault(require_string2());
    var _string2 = _interopRequireDefault(require_string());
    var _error = _interopRequireDefault(require_error());
    var _default = _interopRequireDefault(require_default());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function metadata2xml(metadata) {
      var xml = '<?xml version="1.0" encoding="UTF-8"?><metadata version="1.0">';
      metadata.uniqueid = metadata.uniqueid || _default.default.fontId + "." + Date.now();
      xml += '<uniqueid id="' + _string.default.encodeHTML(metadata.uniqueid) + '" />';
      if (metadata.vendor) {
        xml += '<vendor name="' + _string.default.encodeHTML(metadata.vendor.name) + '" url="' + _string.default.encodeHTML(metadata.vendor.url) + '" />';
      }
      if (metadata.credit) {
        xml += "<credits>";
        var credits = metadata.credit instanceof Array ? metadata.credit : [metadata.credit];
        credits.forEach(function(credit) {
          xml += '<credit name="' + _string.default.encodeHTML(credit.name) + '" url="' + _string.default.encodeHTML(credit.url) + '" role="' + _string.default.encodeHTML(credit.role || "Contributor") + '" />';
        });
        xml += "</credits>";
      }
      if (metadata.description) {
        xml += '<description><text xml:lang="en">' + _string.default.encodeHTML(metadata.description) + "</text></description>";
      }
      if (metadata.license) {
        xml += '<license url="' + _string.default.encodeHTML(metadata.license.url) + '" id="' + _string.default.encodeHTML(metadata.license.id) + '"><text xml:lang="en">';
        xml += _string.default.encodeHTML(metadata.license.text);
        xml += "</text></license>";
      }
      if (metadata.copyright) {
        xml += '<copyright><text xml:lang="en">';
        xml += _string.default.encodeHTML(metadata.copyright);
        xml += "</text></copyright>";
      }
      if (metadata.trademark) {
        xml += '<trademark><text xml:lang="en">' + _string.default.encodeHTML(metadata.trademark) + "</text></trademark>";
      }
      if (metadata.licensee) {
        xml += '<licensee name="' + _string.default.encodeHTML(metadata.licensee) + '"/>';
      }
      xml += "</metadata>";
      return xml;
    }
    function ttf2woff(ttfBuffer) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var woffHeader = {
        signature: 2001684038,
        // for woff
        flavor: 65536,
        // for ttf
        length: 0,
        numTables: 0,
        reserved: 0,
        totalSfntSize: 0,
        majorVersion: 0,
        minorVersion: 0,
        metaOffset: 0,
        metaLength: 0,
        metaOrigLength: 0,
        privOffset: 0,
        privLength: 0
      };
      var ttfReader = new _reader.default(ttfBuffer);
      var tableEntries = [];
      var numTables = ttfReader.readUint16(4);
      var tableEntry;
      var deflatedData;
      var i;
      var l;
      if (numTables <= 0 || numTables > 100) {
        _error.default.raise(10101);
      }
      ttfReader.seek(12);
      for (i = 0; i < numTables; ++i) {
        tableEntry = {
          tag: ttfReader.readString(ttfReader.offset, 4),
          checkSum: ttfReader.readUint32(),
          offset: ttfReader.readUint32(),
          length: ttfReader.readUint32()
        };
        var entryOffset = ttfReader.offset;
        if (tableEntry.tag === "head") {
          woffHeader.majorVersion = ttfReader.readUint16(tableEntry.offset + 4);
          woffHeader.minorVersion = ttfReader.readUint16(tableEntry.offset + 6);
        }
        var sfntData = ttfReader.readBytes(tableEntry.offset, tableEntry.length);
        if (options.deflate) {
          deflatedData = options.deflate(sfntData);
          if (deflatedData.length < sfntData.length) {
            tableEntry.data = deflatedData;
            tableEntry.deflated = true;
          } else {
            tableEntry.data = sfntData;
          }
        } else {
          tableEntry.data = sfntData;
        }
        tableEntry.compLength = tableEntry.data.length;
        tableEntries.push(tableEntry);
        ttfReader.seek(entryOffset);
      }
      if (!tableEntries.length) {
        _error.default.raise(10204);
      }
      tableEntries = tableEntries.sort(function(a, b) {
        return a.tag === b.tag ? 0 : a.tag < b.tag ? -1 : 1;
      });
      var woffSize = 44 + 20 * numTables;
      var ttfSize = 12 + 16 * numTables;
      for (i = 0, l = tableEntries.length; i < l; ++i) {
        tableEntry = tableEntries[i];
        tableEntry.offset = woffSize;
        woffSize += tableEntry.compLength + (tableEntry.compLength % 4 ? 4 - tableEntry.compLength % 4 : 0);
        ttfSize += tableEntry.length + (tableEntry.length % 4 ? 4 - tableEntry.length % 4 : 0);
      }
      var metadata = null;
      if (options.metadata) {
        var xml = _string2.default.toUTF8Bytes(metadata2xml(options.metadata));
        if (options.deflate) {
          deflatedData = options.deflate(xml);
          if (deflatedData.length < xml.length) {
            metadata = deflatedData;
          } else {
            metadata = xml;
          }
        } else {
          metadata = xml;
        }
        woffHeader.metaLength = metadata.length;
        woffHeader.metaOrigLength = xml.length;
        woffHeader.metaOffset = woffSize;
        woffSize += woffHeader.metaLength + (woffHeader.metaLength % 4 ? 4 - woffHeader.metaLength % 4 : 0);
      }
      woffHeader.numTables = tableEntries.length;
      woffHeader.length = woffSize;
      woffHeader.totalSfntSize = ttfSize;
      var woffWriter = new _writer.default(new ArrayBuffer(woffSize));
      woffWriter.writeUint32(woffHeader.signature);
      woffWriter.writeUint32(woffHeader.flavor);
      woffWriter.writeUint32(woffHeader.length);
      woffWriter.writeUint16(woffHeader.numTables);
      woffWriter.writeUint16(woffHeader.reserved);
      woffWriter.writeUint32(woffHeader.totalSfntSize);
      woffWriter.writeUint16(woffHeader.majorVersion);
      woffWriter.writeUint16(woffHeader.minorVersion);
      woffWriter.writeUint32(woffHeader.metaOffset);
      woffWriter.writeUint32(woffHeader.metaLength);
      woffWriter.writeUint32(woffHeader.metaOrigLength);
      woffWriter.writeUint32(woffHeader.privOffset);
      woffWriter.writeUint32(woffHeader.privLength);
      for (i = 0, l = tableEntries.length; i < l; ++i) {
        tableEntry = tableEntries[i];
        woffWriter.writeString(tableEntry.tag);
        woffWriter.writeUint32(tableEntry.offset);
        woffWriter.writeUint32(tableEntry.compLength);
        woffWriter.writeUint32(tableEntry.length);
        woffWriter.writeUint32(tableEntry.checkSum);
      }
      for (i = 0, l = tableEntries.length; i < l; ++i) {
        tableEntry = tableEntries[i];
        woffWriter.writeBytes(tableEntry.data);
        if (tableEntry.compLength % 4) {
          woffWriter.writeEmpty(4 - tableEntry.compLength % 4);
        }
      }
      if (metadata) {
        woffWriter.writeBytes(metadata);
        if (woffHeader.metaLength % 4) {
          woffWriter.writeEmpty(4 - woffHeader.metaLength % 4);
        }
      }
      return woffWriter.getBuffer();
    }
  }
});

// vendor/fonteditor-core/lib/ttf/util/contour2svg.js
var require_contour2svg = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/contour2svg.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = contour2svg;
    function contour2svg(contour) {
      var precision = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
      if (!contour.length) {
        return "";
      }
      var factor = precision <= 0 ? 1 : Math.pow(10, precision);
      var invFactor = 1 / factor;
      var ceil = function ceil2(number) {
        return Math.round(number * factor) * invFactor;
      };
      var pathArr = [];
      var curPoint;
      var prevPoint;
      var nextPoint;
      var x;
      var y;
      for (var i = 0, l = contour.length; i < l; i++) {
        curPoint = contour[i];
        prevPoint = i === 0 ? contour[l - 1] : contour[i - 1];
        nextPoint = i === l - 1 ? contour[0] : contour[i + 1];
        if (i === 0) {
          if (curPoint.onCurve) {
            x = curPoint.x;
            y = curPoint.y;
            pathArr.push("M" + ceil(x) + " " + ceil(y));
          } else if (prevPoint.onCurve) {
            x = prevPoint.x;
            y = prevPoint.y;
            pathArr.push("M" + ceil(x) + " " + ceil(y));
          } else {
            x = (prevPoint.x + curPoint.x) / 2;
            y = (prevPoint.y + curPoint.y) / 2;
            pathArr.push("M" + ceil(x) + " " + ceil(y));
          }
        }
        if (curPoint.onCurve && nextPoint.onCurve) {
          pathArr.push("l" + ceil(nextPoint.x - x) + " " + ceil(nextPoint.y - y));
          x = nextPoint.x;
          y = nextPoint.y;
        } else if (!curPoint.onCurve) {
          if (nextPoint.onCurve) {
            pathArr.push("q" + ceil(curPoint.x - x) + " " + ceil(curPoint.y - y) + " " + ceil(nextPoint.x - x) + " " + ceil(nextPoint.y - y));
            x = nextPoint.x;
            y = nextPoint.y;
          } else {
            var x1 = (curPoint.x + nextPoint.x) / 2;
            var y1 = (curPoint.y + nextPoint.y) / 2;
            pathArr.push("q" + ceil(curPoint.x - x) + " " + ceil(curPoint.y - y) + " " + ceil(x1 - x) + " " + ceil(y1 - y));
            x = x1;
            y = y1;
          }
        }
      }
      pathArr.push("Z");
      return pathArr.join(" ");
    }
  }
});

// vendor/fonteditor-core/lib/ttf/util/contours2svg.js
var require_contours2svg = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/contours2svg.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = contours2svg;
    var _contour2svg = _interopRequireDefault(require_contour2svg());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function contours2svg(contours, precision) {
      if (!contours.length) {
        return "";
      }
      var path = "";
      for (var i = 0, l = contours.length; i < l; i++) {
        path += (0, _contour2svg.default)(contours[i], precision);
      }
      return path;
    }
  }
});

// vendor/fonteditor-core/lib/ttf/util/unicode2xml.js
var require_unicode2xml = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/unicode2xml.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = unicode2xml;
    var _string = _interopRequireDefault(require_string2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function unicode2xml(unicodeList) {
      if (typeof unicodeList === "number") {
        unicodeList = [unicodeList];
      }
      return unicodeList.map(function(u) {
        if (u < 32) {
          return "";
        }
        return u >= 32 && u <= 255 ? _string.default.encodeHTML(String.fromCharCode(u)) : "&#x" + u.toString(16) + ";";
      }).join("");
    }
  }
});

// vendor/fonteditor-core/lib/ttf/ttf2svg.js
var require_ttf2svg = __commonJS({
  "vendor/fonteditor-core/lib/ttf/ttf2svg.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = ttf2svg;
    var _string = _interopRequireDefault(require_string2());
    var _string2 = _interopRequireDefault(require_string());
    var _ttfreader = _interopRequireDefault(require_ttfreader());
    var _contours2svg = _interopRequireDefault(require_contours2svg());
    var _unicode2xml = _interopRequireDefault(require_unicode2xml());
    var _error = _interopRequireDefault(require_error());
    var _default = _interopRequireDefault(require_default());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var SVG_FONT_ID = _default.default.fontId;
    var XML_TPL = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" ><svg xmlns="http://www.w3.org/2000/svg"><metadata>${metadata}</metadata><defs><font id="${id}" horiz-adv-x="${advanceWidth}"><font-face font-family="${fontFamily}" font-weight="${fontWeight}" font-stretch="normal" units-per-em="${unitsPerEm}" panose-1="${panose}" ascent="${ascent}" descent="${descent}" x-height="${xHeight}" bbox="${bbox}" underline-thickness="${underlineThickness}" underline-position="${underlinePosition}" unicode-range="${unicodeRange}" /><missing-glyph horiz-adv-x="${missing.advanceWidth}" ${missing.d} />${glyphList}</font></defs></svg>';
    var GLYPH_TPL = '<glyph glyph-name="${name}" unicode="${unicode}" d="${d}" />';
    function ttfobject2svg(ttf, options) {
      var OS2 = ttf["OS/2"];
      var xmlObject = {
        id: ttf.name.uniqueSubFamily || SVG_FONT_ID,
        metadata: _string.default.encodeHTML(options.metadata || ""),
        advanceWidth: ttf.hhea.advanceWidthMax,
        fontFamily: ttf.name.fontFamily,
        fontWeight: OS2.usWeightClass,
        unitsPerEm: ttf.head.unitsPerEm,
        panose: [OS2.bFamilyType, OS2.bSerifStyle, OS2.bWeight, OS2.bProportion, OS2.bContrast, OS2.bStrokeVariation, OS2.bArmStyle, OS2.bLetterform, OS2.bMidline, OS2.bXHeight].join(" "),
        ascent: ttf.hhea.ascent,
        descent: ttf.hhea.descent,
        xHeight: OS2.bXHeight,
        bbox: [ttf.head.xMin, ttf.head.yMin, ttf.head.xMax, ttf.head.yMax].join(" "),
        underlineThickness: ttf.post.underlineThickness,
        underlinePosition: ttf.post.underlinePosition,
        unicodeRange: "U+" + _string.default.pad(OS2.usFirstCharIndex.toString(16), 4) + "-" + _string.default.pad(OS2.usLastCharIndex.toString(16), 4)
      };
      xmlObject.missing = {};
      xmlObject.missing.advanceWidth = ttf.glyf[0].advanceWidth || 0;
      xmlObject.missing.d = ttf.glyf[0].contours && ttf.glyf[0].contours.length ? 'd="' + (0, _contours2svg.default)(ttf.glyf[0].contours) + '"' : "";
      var glyphList = "";
      for (var i = 1, l = ttf.glyf.length; i < l; i++) {
        var glyf = ttf.glyf[i];
        if (!glyf.compound && glyf.contours && glyf.unicode && glyf.unicode.length) {
          var glyfObject = {
            name: _string2.default.escape(glyf.name),
            unicode: (0, _unicode2xml.default)(glyf.unicode),
            d: (0, _contours2svg.default)(glyf.contours)
          };
          glyphList += _string.default.format(GLYPH_TPL, glyfObject);
        }
      }
      xmlObject.glyphList = glyphList;
      return _string.default.format(XML_TPL, xmlObject);
    }
    function ttf2svg(ttfBuffer) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (ttfBuffer instanceof ArrayBuffer) {
        var reader = new _ttfreader.default();
        var ttfObject = reader.read(ttfBuffer);
        reader.dispose();
        return ttfobject2svg(ttfObject, options);
      } else if (ttfBuffer.version && ttfBuffer.glyf) {
        return ttfobject2svg(ttfBuffer, options);
      }
      _error.default.raise(10109);
    }
  }
});

// vendor/fonteditor-core/lib/ttf/ttf2symbol.js
var require_ttf2symbol = __commonJS({
  "vendor/fonteditor-core/lib/ttf/ttf2symbol.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = ttf2symbol;
    exports2.getSymbolId = getSymbolId;
    var _string = _interopRequireDefault(require_string2());
    var _ttfreader = _interopRequireDefault(require_ttfreader());
    var _contours2svg = _interopRequireDefault(require_contours2svg());
    var _pathsUtil = _interopRequireDefault(require_pathsUtil());
    var _error = _interopRequireDefault(require_error());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var XML_TPL = '<svg style="position: absolute; width: 0; height: 0;" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>${symbolList}</defs></svg>';
    var SYMBOL_TPL = '<symbol id="${id}" viewBox="0 ${descent} ${unitsPerEm} ${unitsPerEm}"><path d="${d}"></path></symbol>';
    function getSymbolId(glyf, index) {
      if (glyf.name) {
        return glyf.name;
      }
      if (glyf.unicode && glyf.unicode.length) {
        return "uni-" + glyf.unicode[0];
      }
      return "symbol-" + index;
    }
    function ttfobject2symbol(ttf) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var xmlObject = {};
      var unitsPerEm = ttf.head.unitsPerEm;
      var descent = ttf.hhea.descent;
      var symbolList = "";
      for (var i = 1, l = ttf.glyf.length; i < l; i++) {
        var glyf = ttf.glyf[i];
        if (!glyf.compound && glyf.contours) {
          var contours = _pathsUtil.default.flip(glyf.contours);
          var glyfObject = {
            descent,
            unitsPerEm,
            id: getSymbolId(glyf, i),
            d: (0, _contours2svg.default)(contours)
          };
          symbolList += _string.default.format(SYMBOL_TPL, glyfObject);
        }
      }
      xmlObject.symbolList = symbolList;
      return _string.default.format(XML_TPL, xmlObject);
    }
    function ttf2symbol(ttfBuffer) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (ttfBuffer instanceof ArrayBuffer) {
        var reader = new _ttfreader.default();
        var ttfObject = reader.read(ttfBuffer);
        reader.dispose();
        return ttfobject2symbol(ttfObject, options);
      } else if (ttfBuffer.version && ttfBuffer.glyf) {
        return ttfobject2symbol(ttfBuffer, options);
      }
      _error.default.raise(10112);
    }
  }
});

// vendor/fonteditor-core/woff2/woff2-encode.js
var require_woff2_encode = __commonJS({
  "vendor/fonteditor-core/woff2/woff2-encode.js"(exports2, module2) {
    var zlib;
    try {
      zlib = require("node:zlib");
    } catch (_) {
      zlib = require("zlib");
    }
    var brotliCompressSync = zlib.brotliCompressSync;
    var BROTLI_PARAM_QUALITY = zlib.constants?.BROTLI_PARAM_QUALITY ?? 3;
    var BROTLI_PARAM_SIZE_HINT = zlib.constants?.BROTLI_PARAM_SIZE_HINT ?? 4;
    var BROTLI_OPTIONS_BASE = {
      params: { [BROTLI_PARAM_QUALITY]: 2 }
    };
    var BROTLI_OPTIONS_WITH_HINT = {
      params: { [BROTLI_PARAM_QUALITY]: 2, [BROTLI_PARAM_SIZE_HINT]: 0 }
    };
    function readU16(arr, off) {
      return arr[off] << 8 | arr[off + 1];
    }
    function readI16(arr, off) {
      const v = arr[off] << 8 | arr[off + 1];
      return v > 32767 ? v - 65536 : v;
    }
    function readU32(arr, off) {
      return (arr[off] << 24 | arr[off + 1] << 16 | arr[off + 2] << 8 | arr[off + 3]) >>> 0;
    }
    function writeU16(buf, v, p) {
      buf[p] = v >> 8;
      buf[p + 1] = v & 255;
    }
    function writeU32(buf, v, p) {
      buf[p] = v >> 24;
      buf[p + 1] = v >> 16 & 255;
      buf[p + 2] = v >> 8 & 255;
      buf[p + 3] = v & 255;
    }
    var KNOWN_TAGS = [
      "cmap",
      "head",
      "hhea",
      "hmtx",
      "maxp",
      "name",
      "OS/2",
      "post",
      "cvt ",
      "fpgm",
      "glyf",
      "loca",
      "prep ",
      "CFF ",
      "VORG ",
      "EBDT",
      "EBLC",
      "EBSC",
      "CBDT",
      "CBLC",
      "COLR",
      "CPAL",
      "SVG ",
      "sbix",
      "acnt",
      "avar",
      "bdat",
      "bloc",
      "bsln",
      "cvar",
      "fdsc",
      "feat",
      "fmtx",
      "fvar",
      "gvar",
      "gdef",
      "hsty",
      "jstf",
      "lcar",
      "mort",
      "morx",
      "opbd",
      "prop",
      "trak",
      "Zapf",
      "Silf",
      "Glat",
      "Gloc",
      "Feat",
      "Sill"
    ];
    var EMPTY_UINT8 = new Uint8Array(0);
    var KNOWN_TAG_MAP = /* @__PURE__ */ new Map();
    for (let i = 0; i < KNOWN_TAGS.length; i++) {
      KNOWN_TAG_MAP.set(KNOWN_TAGS[i], i);
    }
    var KNOWN_TAG_U32_MAP = /* @__PURE__ */ new Map();
    for (let i = 0; i < KNOWN_TAGS.length; i++) {
      const t = KNOWN_TAGS[i];
      KNOWN_TAG_U32_MAP.set((t.charCodeAt(0) << 24 | t.charCodeAt(1) << 16 | t.charCodeAt(2) << 8 | t.charCodeAt(3)) >>> 0, i);
    }
    function getTagIndexU32(tagU32) {
      const idx = KNOWN_TAG_U32_MAP.get(tagU32);
      return idx !== void 0 ? idx : 63;
    }
    function calcUIntBase128Size(value) {
      if (value < 128) return 1;
      if (value < 16384) return 2;
      if (value < 2097152) return 3;
      if (value < 268435456) return 4;
      return 5;
    }
    function encodeUIntBase128(value, buf, offset) {
      if (value < 128) {
        buf[offset] = value;
        return 1;
      }
      if (value < 16384) {
        buf[offset] = value >>> 7 | 128;
        buf[offset + 1] = value & 127;
        return 2;
      }
      if (value < 2097152) {
        buf[offset] = value >>> 14 | 128;
        buf[offset + 1] = value >>> 7 & 127 | 128;
        buf[offset + 2] = value & 127;
        return 3;
      }
      if (value < 268435456) {
        buf[offset] = value >>> 21 | 128;
        buf[offset + 1] = value >>> 14 & 127 | 128;
        buf[offset + 2] = value >>> 7 & 127 | 128;
        buf[offset + 3] = value & 127;
        return 4;
      }
      buf[offset] = value >>> 28 | 128;
      buf[offset + 1] = value >>> 21 & 127 | 128;
      buf[offset + 2] = value >>> 14 & 127 | 128;
      buf[offset + 3] = value >>> 7 & 127 | 128;
      buf[offset + 4] = value & 127;
      return 5;
    }
    function encode255UInt16(value, buf, offset) {
      if (value < 253) {
        buf[offset] = value;
        return 1;
      }
      if (value < 506) {
        buf[offset] = 255;
        buf[offset + 1] = value - 253;
        return 2;
      }
      if (value < 762) {
        buf[offset] = 254;
        buf[offset + 1] = value - 506;
        return 2;
      }
      buf[offset] = 253;
      buf[offset + 1] = value >> 8;
      buf[offset + 2] = value;
      return 3;
    }
    function size255UInt16(value) {
      if (value <= 252) return 1;
      if (value <= 762) return 2;
      return 3;
    }
    var sizeUIntBase128 = calcUIntBase128Size;
    var _reuseXCoords = new Int32Array(256);
    var _reuseEnc255 = [0, 0, 0];
    function transformGlyfAndLoca(glyfData, locaData, indexFormat, numGlyphs) {
      const offsets = new Int32Array(numGlyphs + 1);
      if (indexFormat === 0) {
        for (let i = 0; i <= numGlyphs; i++) {
          offsets[i] = readU16(locaData, i * 2) * 2;
        }
      } else {
        for (let i = 0; i <= numGlyphs; i++) {
          offsets[i] = readU32(locaData, i * 4);
        }
      }
      const XSHORT_FLAG = 2;
      const XSAME_FLAG = 16;
      const YSHORT_FLAG = 4;
      const YSAME_FLAG = 32;
      const REPEAT_FLAG = 8;
      const OVERLAP_FLAG = 64;
      const ONCURVE_FLAG = 1;
      const initialCap = glyfData.length;
      let flagAccumCap = initialCap;
      let flagAccum = new Uint8Array(flagAccumCap);
      let flagAccumLen = 0;
      let glyphAccumCap = initialCap;
      let glyphAccum = new Uint8Array(glyphAccumCap);
      let glyphAccumLen = 0;
      let instrAccumCap = 256;
      let instrAccum = new Uint8Array(instrAccumCap);
      let instrAccumLen = 0;
      let totalNPointsSize = 0;
      let glyphStreamSize = 0;
      let bboxStreamSize = 0;
      let hasOverlapBitmap = false;
      const bboxBitmapSize = numGlyphs + 31 >>> 5 << 2;
      const bboxBitmap = new Uint8Array(bboxBitmapSize);
      const overlapBitmap = new Uint8Array(bboxBitmapSize);
      const glyphInfos = new Array(numGlyphs);
      for (let gi = 0; gi < numGlyphs; gi++) {
        const glyphStart = offsets[gi];
        const glyphEnd = offsets[gi + 1];
        if (glyphStart === glyphEnd) {
          glyphInfos[gi] = null;
          continue;
        }
        const numberOfContours = readI16(glyfData, glyphStart);
        if (numberOfContours < 0) {
          const xMin = readI16(glyfData, glyphStart + 2);
          const yMin = readI16(glyfData, glyphStart + 4);
          const xMax = readI16(glyfData, glyphStart + 6);
          const yMax = readI16(glyfData, glyphStart + 8);
          let compOff = glyphStart + 10;
          let haveInstructions = false;
          let instrLength = 0;
          let instrOffset2 = 0;
          const MORE_COMPONENTS = 32;
          const WE_HAVE_INSTRUCTIONS = 256;
          while (compOff < glyphEnd) {
            const compFlags = readU16(glyfData, compOff);
            compOff += 2;
            compOff += 2;
            if (compFlags & 1) compOff += 4;
            else compOff += 2;
            if (compFlags & 8) compOff += 2;
            else if (compFlags & 64) compOff += 4;
            else if (compFlags & 128) compOff += 8;
            if (!(compFlags & MORE_COMPONENTS)) {
              haveInstructions = !!(compFlags & WE_HAVE_INSTRUCTIONS);
              break;
            }
          }
          const componentDataEnd = compOff;
          if (haveInstructions && compOff + 2 <= glyphEnd) {
            instrLength = readU16(glyfData, compOff);
            compOff += 2;
            if (instrLength > 0 && compOff + instrLength <= glyphEnd) {
              instrOffset2 = compOff;
            } else {
              instrLength = 0;
            }
          }
          const rawOffset = glyphStart + 10;
          const rawLength = componentDataEnd - glyphStart - 10;
          glyphInfos[gi] = {
            composite: true,
            xMin,
            yMin,
            xMax,
            yMax,
            rawOffset,
            rawLength,
            instrOffset: instrOffset2,
            instrLength
          };
          bboxBitmap[gi >> 3] |= 128 >> (gi & 7);
          bboxStreamSize += 8;
          if (glyphAccumLen + rawLength > glyphAccumCap) {
            while (glyphAccumLen + rawLength > glyphAccumCap) glyphAccumCap *= 2;
            const nb = new Uint8Array(glyphAccumCap);
            nb.set(glyphAccum.subarray(0, glyphAccumLen));
            glyphAccum = nb;
          }
          glyphAccum.set(glyfData.subarray(rawOffset, rawOffset + rawLength), glyphAccumLen);
          glyphAccumLen += rawLength;
          glyphStreamSize += rawLength;
          if (instrLength > 0) {
            if (instrAccumLen + instrLength > instrAccumCap) {
              while (instrAccumLen + instrLength > instrAccumCap) instrAccumCap *= 2;
              const ib = new Uint8Array(instrAccumCap);
              ib.set(instrAccum.subarray(0, instrAccumLen));
              instrAccum = ib;
            }
            instrAccum.set(glyfData.subarray(instrOffset2, instrOffset2 + instrLength), instrAccumLen);
            instrAccumLen += instrLength;
            const n = encode255UInt16(instrLength, _reuseEnc255, 0);
            if (glyphAccumLen + n > glyphAccumCap) {
              while (glyphAccumLen + n > glyphAccumCap) glyphAccumCap *= 2;
              const nb2 = new Uint8Array(glyphAccumCap);
              nb2.set(glyphAccum.subarray(0, glyphAccumLen));
              glyphAccum = nb2;
            }
            for (let e = 0; e < n; e++) glyphAccum[glyphAccumLen++] = _reuseEnc255[e];
            glyphStreamSize += n;
          }
          continue;
        }
        let dataOff = glyphStart + 10;
        const nPointsDeltas = new Int16Array(numberOfContours);
        let nPointsBytes = 0;
        let prevEnd = -1;
        let lastEndPt = -1;
        for (let c = 0; c < numberOfContours; c++) {
          const endPt = readU16(glyfData, dataOff);
          dataOff += 2;
          const delta = endPt - prevEnd;
          nPointsDeltas[c] = delta;
          nPointsBytes += size255UInt16(delta);
          prevEnd = endPt;
        }
        lastEndPt = prevEnd;
        totalNPointsSize += nPointsBytes;
        const instructionLength = readU16(glyfData, dataOff);
        dataOff += 2;
        const instrOffset = dataOff;
        dataOff += instructionLength;
        if (instructionLength > 0) {
          if (instrAccumLen + instructionLength > instrAccumCap) {
            while (instrAccumLen + instructionLength > instrAccumCap) instrAccumCap *= 2;
            const ib = new Uint8Array(instrAccumCap);
            ib.set(instrAccum.subarray(0, instrAccumLen));
            instrAccum = ib;
          }
          instrAccum.set(glyfData.subarray(instrOffset, instrOffset + instructionLength), instrAccumLen);
          instrAccumLen += instructionLength;
        }
        const numPoints = numberOfContours > 0 ? lastEndPt + 1 : 0;
        if (numberOfContours > 0) {
          if (flagAccumLen + numPoints > flagAccumCap) {
            while (flagAccumLen + numPoints > flagAccumCap) flagAccumCap *= 2;
            const fb = new Uint8Array(flagAccumCap);
            fb.set(flagAccum.subarray(0, flagAccumLen));
            flagAccum = fb;
          }
        }
        let hasOverlap = false;
        let fi = 0;
        let flagWriteBase = flagAccumLen;
        while (fi < numPoints) {
          const flag = glyfData[dataOff++];
          if (flag & OVERLAP_FLAG) hasOverlap = true;
          flagAccum[flagAccumLen++] = flag;
          fi++;
          if (flag & REPEAT_FLAG && fi < numPoints) {
            const repeat = glyfData[dataOff++];
            const count = repeat < numPoints - fi ? repeat : numPoints - fi;
            flagAccum.fill(flag, flagAccumLen, flagAccumLen + count);
            flagAccumLen += count;
            fi += count;
          }
        }
        if (numberOfContours > 0) {
          if (hasOverlap) {
            hasOverlapBitmap = true;
            overlapBitmap[gi >> 3] |= 128 >> (gi & 7);
          }
        }
        if (numPoints > _reuseXCoords.length) {
          const cap = _reuseXCoords.length;
          const newCap = cap * 2 > numPoints ? cap * 2 : numPoints;
          _reuseXCoords = new Int32Array(newCap);
        }
        const xCoords = _reuseXCoords;
        for (let xi = 0; xi < numPoints; xi++) {
          const f = flagAccum[flagWriteBase + xi];
          if (f & XSHORT_FLAG) {
            xCoords[xi] = glyfData[dataOff++] * ((f >> 4 & 1) * 2 - 1);
          } else if (!(f & XSAME_FLAG)) {
            let dx = glyfData[dataOff] << 8 | glyfData[dataOff + 1];
            if (dx > 32767) dx -= 65536;
            xCoords[xi] = dx;
            dataOff += 2;
          } else {
            xCoords[xi] = 0;
          }
        }
        if (numberOfContours > 0) {
          const maxAdd = numPoints * 4;
          if (glyphAccumLen + maxAdd > glyphAccumCap) {
            while (glyphAccumLen + maxAdd > glyphAccumCap) glyphAccumCap *= 2;
            const nb = new Uint8Array(glyphAccumCap);
            nb.set(glyphAccum.subarray(0, glyphAccumLen));
            glyphAccum = nb;
          }
          const gsBase = glyphAccumLen;
          let gsbi = 0;
          const _gs = glyphAccum;
          const _fa = flagAccum;
          const _fwb = flagWriteBase;
          const _gd = glyfData;
          for (let yi = 0; yi < numPoints; yi++) {
            const f = _fa[_fwb + yi];
            let dy;
            if (f & YSHORT_FLAG) {
              dy = _gd[dataOff++] * ((f >> 5 & 1) * 2 - 1);
            } else if (!(f & YSAME_FLAG)) {
              let dy0 = _gd[dataOff] << 8 | _gd[dataOff + 1];
              if (dy0 > 32767) dy0 -= 65536;
              dy = dy0;
              dataOff += 2;
            } else {
              dy = 0;
            }
            const dx = xCoords[yi];
            const curveBit = (f & 1 ^ 1) << 7;
            const dxSgn = dx >> 31;
            const dySgn = dy >> 31;
            const absDx = (dx ^ dxSgn) - dxSgn;
            const absDy = (dy ^ dySgn) - dySgn;
            const xSignBit = dxSgn + 1;
            const ySignBit = dySgn + 1;
            const wpos = gsBase + gsbi;
            let flag;
            let adv;
            if (dx === 0 && absDy < 1280) {
              _gs[wpos] = absDy & 255;
              flag = curveBit + ((absDy & 3840) >> 7) + ySignBit;
              adv = 1;
            } else if (dy === 0 && absDx < 1280) {
              _gs[wpos] = absDx & 255;
              flag = curveBit + 10 + ((absDx & 3840) >> 7) + xSignBit;
              adv = 1;
            } else if (absDx < 65 && absDy < 65) {
              const ax = absDx - 1;
              const ay = absDy - 1;
              _gs[wpos] = (ax & 15) << 4 | ay & 15;
              flag = curveBit + 20 + (ax & 48) + ((ay & 48) >> 2) + xSignBit + 2 * ySignBit;
              adv = 1;
            } else if (absDx < 769 && absDy < 769) {
              const ax = absDx - 1;
              const ay = absDy - 1;
              _gs[wpos] = ax & 255;
              _gs[wpos + 1] = ay & 255;
              flag = curveBit + 84 + 12 * ((ax & 768) >> 8) + ((ay & 768) >> 6) + xSignBit + 2 * ySignBit;
              adv = 2;
            } else if (absDx < 4096 && absDy < 4096) {
              _gs[wpos] = absDx >> 4;
              _gs[wpos + 1] = (absDx & 15) << 4 | absDy >> 8;
              _gs[wpos + 2] = absDy & 255;
              flag = curveBit + 120 + xSignBit + 2 * ySignBit;
              adv = 3;
            } else {
              _gs[wpos] = absDx >> 8 & 255;
              _gs[wpos + 1] = absDx & 255;
              _gs[wpos + 2] = absDy >> 8 & 255;
              _gs[wpos + 3] = absDy & 255;
              flag = curveBit + 124 + xSignBit + 2 * ySignBit;
              adv = 4;
            }
            _fa[_fwb + yi] = flag;
            gsbi += adv;
          }
          glyphAccumLen += gsbi;
          glyphStreamSize += gsbi;
          const n = encode255UInt16(instructionLength, _reuseEnc255, 0);
          if (glyphAccumLen + n > glyphAccumCap) {
            while (glyphAccumLen + n > glyphAccumCap) glyphAccumCap *= 2;
            const nb2 = new Uint8Array(glyphAccumCap);
            nb2.set(glyphAccum.subarray(0, glyphAccumLen));
            glyphAccum = nb2;
          }
          for (let e = 0; e < n; e++) glyphAccum[glyphAccumLen++] = _reuseEnc255[e];
          glyphStreamSize += n;
        } else {
          for (let yi0 = 0; yi0 < numPoints; yi0++) {
            const f = flagAccum[flagWriteBase + yi0];
            if (f & YSHORT_FLAG) {
              dataOff++;
            } else if (!(f & YSAME_FLAG)) {
              dataOff += 2;
            }
          }
        }
        glyphInfos[gi] = numberOfContours > 0 ? {
          composite: false,
          numberOfContours,
          nPointsDeltas
        } : {
          composite: false,
          numberOfContours: 0
        };
      }
      const nContourStreamSize = numGlyphs * 2;
      const headerSize = 36;
      const flagStreamSize = flagAccumLen;
      const instructionStreamSize = instrAccumLen;
      const overlapBitmapSize = hasOverlapBitmap ? bboxBitmapSize : 0;
      const totalSize = headerSize + nContourStreamSize + totalNPointsSize + flagStreamSize + glyphStreamSize + bboxBitmapSize + bboxStreamSize + instructionStreamSize + overlapBitmapSize;
      const result = new Uint8Array(totalSize);
      let pos = 0;
      writeU16(result, 0, pos);
      pos += 2;
      writeU16(result, hasOverlapBitmap ? 1 : 0, pos);
      pos += 2;
      writeU16(result, numGlyphs, pos);
      pos += 2;
      writeU16(result, indexFormat, pos);
      pos += 2;
      writeU32(result, nContourStreamSize, pos);
      pos += 4;
      writeU32(result, totalNPointsSize, pos);
      pos += 4;
      writeU32(result, flagStreamSize, pos);
      pos += 4;
      writeU32(result, glyphStreamSize, pos);
      pos += 4;
      writeU32(result, 0, pos);
      pos += 4;
      writeU32(result, bboxBitmapSize + bboxStreamSize, pos);
      pos += 4;
      writeU32(result, instructionStreamSize, pos);
      pos += 4;
      const nContourEnd = pos + nContourStreamSize;
      let nContourPos = pos;
      let nPointsPos = nContourEnd;
      pos = nContourEnd + totalNPointsSize;
      const flagStreamStart = pos;
      pos += flagStreamSize;
      const glyphStreamStart = pos;
      pos += glyphStreamSize;
      const bboxBitmapStart = pos;
      pos += bboxBitmapSize;
      const bboxStreamStart = pos;
      pos += bboxStreamSize;
      const instructionStreamStart = pos;
      pos += instructionStreamSize;
      const overlapBitmapStart = pos;
      let bboxPos = bboxStreamStart;
      for (let gi = 0; gi < numGlyphs; gi++) {
        const g = glyphInfos[gi];
        if (!g) {
          nContourPos += 2;
          continue;
        }
        if (g.composite) {
          result[nContourPos] = 255;
          result[nContourPos + 1] = 255;
        } else {
          const nc2 = g.numberOfContours;
          result[nContourPos] = nc2 >> 8;
          result[nContourPos + 1] = nc2 & 255;
        }
        nContourPos += 2;
        if (g.composite) {
          result[bboxPos] = g.xMin >> 8;
          result[bboxPos + 1] = g.xMin & 255;
          result[bboxPos + 2] = g.yMin >> 8;
          result[bboxPos + 3] = g.yMin & 255;
          result[bboxPos + 4] = g.xMax >> 8;
          result[bboxPos + 5] = g.xMax & 255;
          result[bboxPos + 6] = g.yMax >> 8;
          result[bboxPos + 7] = g.yMax & 255;
          bboxPos += 8;
          continue;
        }
        if (g.numberOfContours === 0) continue;
        const deltas = g.nPointsDeltas;
        const nc = g.numberOfContours;
        for (let c = 0; c < nc; c++) {
          nPointsPos += encode255UInt16(deltas[c], result, nPointsPos);
        }
      }
      result.set(flagAccum.subarray(0, flagStreamSize), flagStreamStart);
      result.set(glyphAccum.subarray(0, glyphStreamSize), glyphStreamStart);
      if (instructionStreamSize > 0) {
        result.set(instrAccum.subarray(0, instructionStreamSize), instructionStreamStart);
      }
      result.set(bboxBitmap, bboxBitmapStart);
      if (hasOverlapBitmap) {
        result.set(overlapBitmap, overlapBitmapStart);
      }
      const locaOrigLength = indexFormat === 0 ? (numGlyphs + 1) * 2 : (numGlyphs + 1) * 4;
      return {
        transformedGlyf: result,
        locaOrigLength,
        locaTransformLength: 0
      };
    }
    function sortDirEntries(a, b) {
      var d = a.tagIndex - b.tagIndex;
      return d ? d : a.tagU32 < b.tagU32 ? -1 : a.tagU32 > b.tagU32 ? 1 : 0;
    }
    var WOFF2_SIGNATURE = 2001684018;
    var WOFF2_HEADER_SIZE = 48;
    function encodeTTFToWOFF22(ttfBuffer) {
      const data = ttfBuffer instanceof Uint8Array ? ttfBuffer : new Uint8Array(ttfBuffer);
      const flavor = readU32(data, 0);
      const numTables = readU16(data, 4);
      const tables = new Array(numTables);
      for (let i = 0; i < numTables; i++) {
        const off = 12 + i * 16;
        const tagU32 = (data[off] << 24 | data[off + 1] << 16 | data[off + 2] << 8 | data[off + 3]) >>> 0;
        const offset = readU32(data, off + 8);
        const length = readU32(data, off + 12);
        tables[i] = { tagU32, offset, length, tagIndex: getTagIndexU32(tagU32) };
      }
      const TAG_DSIG = (68 << 24 | 83 << 16 | 73 << 8 | 71) >>> 0;
      const TAG_head = (104 << 24 | 101 << 16 | 97 << 8 | 100) >>> 0;
      const TAG_maxp = (109 << 24 | 97 << 16 | 120 << 8 | 112) >>> 0;
      const TAG_glyf = (103 << 24 | 108 << 16 | 121 << 8 | 102) >>> 0;
      const TAG_loca = (108 << 24 | 111 << 16 | 99 << 8 | 97) >>> 0;
      let writeIdx = 0;
      for (let i = 0; i < numTables; i++) {
        if (tables[i].tagU32 !== TAG_DSIG) {
          tables[writeIdx++] = tables[i];
        }
      }
      tables.length = writeIdx;
      const filtered = tables;
      filtered.sort(sortDirEntries);
      let indexToLocFormat = 0;
      let numGlyphs = 0;
      let glyfTable = null;
      let locaTable = null;
      for (var fi = 0, fl = filtered.length; fi < fl; fi++) {
        var t = filtered[fi];
        if (t.tagU32 === TAG_head) indexToLocFormat = readU16(data, t.offset + 50);
        if (t.tagU32 === TAG_maxp) numGlyphs = readU16(data, t.offset + 4);
        if (t.tagU32 === TAG_glyf) glyfTable = t;
        if (t.tagU32 === TAG_loca) locaTable = t;
      }
      let glyfTransformed = null;
      if (glyfTable && locaTable) {
        const glyfData = data.subarray(glyfTable.offset, glyfTable.offset + glyfTable.length);
        const locaData = data.subarray(locaTable.offset, locaTable.offset + locaTable.length);
        const result = transformGlyfAndLoca(glyfData, locaData, indexToLocFormat, numGlyphs);
        glyfTransformed = result;
      }
      const dirEntries = new Array(filtered.length);
      let dirIdx = 0;
      let totalDirSize = 0;
      const entrySize = (tagIndex, origLength, hasTransform, transformLength) => 1 + (tagIndex === 63 ? 4 : 0) + sizeUIntBase128(origLength) + (hasTransform ? sizeUIntBase128(transformLength) : 0);
      for (var fi2 = 0, fl2 = filtered.length; fi2 < fl2; fi2++) {
        var t = filtered[fi2];
        if (t.tagU32 === TAG_loca) {
          const origLength = glyfTransformed ? glyfTransformed.locaOrigLength : t.length;
          dirEntries[dirIdx++] = {
            tagU32: t.tagU32,
            tagIndex: t.tagIndex,
            flags: t.tagIndex,
            origLength,
            transformLength: 0,
            data: EMPTY_UINT8,
            hasTransform: true
          };
          totalDirSize += entrySize(t.tagIndex, origLength, true, 0);
          continue;
        }
        if (t.tagU32 === TAG_glyf && glyfTransformed) {
          dirEntries[dirIdx++] = {
            tagU32: t.tagU32,
            tagIndex: t.tagIndex,
            flags: t.tagIndex,
            origLength: t.length,
            transformLength: glyfTransformed.transformedGlyf.length,
            data: glyfTransformed.transformedGlyf,
            hasTransform: true
          };
          totalDirSize += entrySize(t.tagIndex, t.length, true, glyfTransformed.transformedGlyf.length);
          continue;
        }
        let tableData = data.subarray(t.offset, t.offset + t.length);
        dirEntries[dirIdx++] = {
          tagU32: t.tagU32,
          tagIndex: t.tagIndex,
          flags: t.tagIndex,
          origLength: t.length,
          transformLength: t.length,
          data: tableData,
          isHead: t.tagU32 === TAG_head
        };
        totalDirSize += entrySize(t.tagIndex, t.length, false, t.length);
      }
      dirEntries.length = dirIdx;
      let totalSfntSize = 12 + filtered.length * 16;
      for (let i = 0; i < filtered.length; i++) {
        const len = filtered[i].length;
        totalSfntSize += len + (len & 3 ? 4 - (len & 3) : 0);
      }
      let totalTableDataSize = 0;
      for (let i = 0; i < dirEntries.length; i++) totalTableDataSize += dirEntries[i].transformLength;
      const uncompressedData = new Uint8Array(totalTableDataSize);
      let dataPos = 0;
      for (let di = 0; di < dirEntries.length; di++) {
        const entry = dirEntries[di];
        if (entry.transformLength > 0) {
          uncompressedData.set(entry.data, dataPos);
          if (entry.isHead) {
            const base = dataPos;
            uncompressedData[base + 8] = uncompressedData[base + 9] = uncompressedData[base + 10] = uncompressedData[base + 11] = 0;
            const headFlags = uncompressedData[base + 44] << 8 | uncompressedData[base + 45];
            const newFlags = headFlags | 1 << 11;
            uncompressedData[base + 44] = newFlags >> 8 & 255;
            uncompressedData[base + 45] = newFlags & 255;
          }
          dataPos += entry.transformLength;
        }
      }
      if (totalTableDataSize > 0) {
        BROTLI_OPTIONS_WITH_HINT.params[BROTLI_PARAM_SIZE_HINT] = totalTableDataSize;
        var brotliOptions = BROTLI_OPTIONS_WITH_HINT;
      } else {
        var brotliOptions = BROTLI_OPTIONS_BASE;
      }
      const compressedData = brotliCompressSync(uncompressedData, brotliOptions);
      const rawLength = WOFF2_HEADER_SIZE + totalDirSize + compressedData.length;
      const paddedLength = rawLength + 3 & ~3;
      const woff2 = new Uint8Array(paddedLength);
      writeU32(woff2, WOFF2_SIGNATURE, 0);
      writeU32(woff2, flavor, 4);
      writeU32(woff2, paddedLength, 8);
      writeU16(woff2, dirEntries.length, 12);
      writeU16(woff2, 0, 14);
      writeU32(woff2, totalSfntSize, 16);
      writeU32(woff2, compressedData.length, 20);
      writeU16(woff2, 1, 24);
      writeU16(woff2, 0, 26);
      writeU32(woff2, 0, 28);
      writeU32(woff2, 0, 32);
      writeU32(woff2, 0, 36);
      writeU32(woff2, 0, 40);
      writeU32(woff2, 0, 44);
      let dirPos = WOFF2_HEADER_SIZE;
      for (let di = 0; di < dirEntries.length; di++) {
        const entry = dirEntries[di];
        woff2[dirPos++] = entry.flags;
        if (entry.tagIndex === 63) {
          var tu = entry.tagU32;
          woff2[dirPos++] = tu >>> 24 & 255;
          woff2[dirPos++] = tu >>> 16 & 255;
          woff2[dirPos++] = tu >>> 8 & 255;
          woff2[dirPos++] = tu & 255;
        }
        dirPos += encodeUIntBase128(entry.origLength, woff2, dirPos);
        if (entry.hasTransform) {
          dirPos += encodeUIntBase128(entry.transformLength, woff2, dirPos);
        }
      }
      woff2.set(compressedData, dirPos);
      return woff2;
    }
    module2.exports = { encodeTTFToWOFF2: encodeTTFToWOFF22 };
  }
});

// vendor/fonteditor-core/woff2/index.js
var require_woff2 = __commonJS({
  "vendor/fonteditor-core/woff2/index.js"(exports2, module2) {
    var { encodeTTFToWOFF2: encodeTTFToWOFF22 } = require_woff2_encode();
    var zlib;
    try {
      zlib = require("node:zlib");
    } catch (_) {
      zlib = require("zlib");
    }
    var brotliDecompressSync = zlib.brotliDecompressSync;
    var woff2Module = {
      /**
       * 是否已经加载完毕（纯 JS 实现不需要初始化）
       *
       * @return {boolean}
       */
      isInited() {
        return true;
      },
      /**
       * 初始化（纯 JS 实现不需要初始化）
       *
       * @return {Promise}
       */
      init() {
        return Promise.resolve(this);
      },
      /**
       * 将ttf buffer 转换成 woff2 buffer
       *
       * @param {ArrayBuffer|Buffer|Array} ttfBuffer ttf buffer
       * @return {Uint8Array} uint8 array
       */
      /** 优化267: encodeTTFToWOFF2 直接返回 Uint8Array，消除二次包装 */
      encode(ttfBuffer) {
        return encodeTTFToWOFF22(ttfBuffer);
      },
      /**
       * 将woff2 buffer 转换成 ttf buffer
       *
       * @param {ArrayBuffer|Buffer|Array} woff2Buffer woff2 buffer
       * @return {Uint8Array} uint8 array
       */
      decode(woff2Buffer) {
        const data = new Uint8Array(woff2Buffer);
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        const numTables = view.getUint16(12);
        const totalCompressedSize = view.getUint32(20);
        const dirEnd = 48 + numTables * 20;
        const compressedData = data.subarray(dirEnd, dirEnd + totalCompressedSize);
        const decompressed = brotliDecompressSync(compressedData);
        return new Uint8Array(decompressed.buffer, decompressed.byteOffset, decompressed.byteLength);
      }
    };
    module2.exports = woff2Module;
  }
});

// vendor/fonteditor-core/lib/ttf/ttftowoff2.js
var require_ttftowoff2 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/ttftowoff2.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = ttftowoff2;
    exports2.ttftowoff2async = ttftowoff2async;
    var _index = _interopRequireDefault(require_woff2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function ttftowoff2(ttfBuffer) {
      var result = _index.default.encode(ttfBuffer);
      return result;
    }
    function ttftowoff2async(ttfBuffer) {
      return Promise.resolve(ttftowoff2(ttfBuffer));
    }
  }
});

// vendor/fonteditor-core/lib/ttf/woff2tottf.js
var require_woff2tottf = __commonJS({
  "vendor/fonteditor-core/lib/ttf/woff2tottf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = woff2tottf;
    exports2.woff2tottfasync = woff2tottfasync;
    var _index = _interopRequireDefault(require_woff2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function woff2tottf(woff2Buffer) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var result = _index.default.decode(woff2Buffer);
      return result.buffer || result;
    }
    function woff2tottfasync(woff2Buffer) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return Promise.resolve(woff2tottf(woff2Buffer, options));
    }
  }
});

// vendor/fonteditor-core/lib/ttf/util/bytes2base64.js
var require_bytes2base64 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/util/bytes2base64.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = bytes2base64;
    function bytes2base64(buffer) {
      var str = "";
      var length;
      var i;
      if (buffer instanceof ArrayBuffer) {
        length = buffer.byteLength;
        var view = new DataView(buffer, 0, length);
        for (i = 0; i < length; i++) {
          str += String.fromCharCode(view.getUint8(i, false));
        }
      } else if (buffer.length) {
        length = buffer.length;
        for (i = 0; i < length; i++) {
          str += String.fromCharCode(buffer[i]);
        }
      }
      if (!str) {
        return "";
      }
      return typeof btoa !== "undefined" ? btoa(str) : Buffer.from(str, "binary").toString("base64");
    }
  }
});

// vendor/fonteditor-core/lib/ttf/ttf2base64.js
var require_ttf2base64 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/ttf2base64.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = ttf2base64;
    var _bytes2base = _interopRequireDefault(require_bytes2base64());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function ttf2base64(arrayBuffer) {
      return "data:font/ttf;charset=utf-8;base64," + (0, _bytes2base.default)(arrayBuffer);
    }
  }
});

// vendor/fonteditor-core/lib/ttf/eot2base64.js
var require_eot2base64 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/eot2base64.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = eot2base64;
    var _bytes2base = _interopRequireDefault(require_bytes2base64());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function eot2base64(arrayBuffer) {
      return "data:font/eot;charset=utf-8;base64," + (0, _bytes2base.default)(arrayBuffer);
    }
  }
});

// vendor/fonteditor-core/lib/ttf/woff2base64.js
var require_woff2base64 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/woff2base64.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = woff2base64;
    var _bytes2base = _interopRequireDefault(require_bytes2base64());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function woff2base64(arrayBuffer) {
      return "data:font/woff;charset=utf-8;base64," + (0, _bytes2base.default)(arrayBuffer);
    }
  }
});

// vendor/fonteditor-core/lib/ttf/svg2base64.js
var require_svg2base64 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/svg2base64.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = svg2base64;
    function svg2base64(svg) {
      var scheme = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "font/svg";
      if (typeof btoa === "undefined") {
        return "data:" + scheme + ";charset=utf-8;base64," + Buffer.from(svg, "binary").toString("base64");
      }
      return "data:" + scheme + ";charset=utf-8;base64," + btoa(svg);
    }
  }
});

// vendor/fonteditor-core/lib/ttf/woff2tobase64.js
var require_woff2tobase64 = __commonJS({
  "vendor/fonteditor-core/lib/ttf/woff2tobase64.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = woff2tobase64;
    var _bytes2base = _interopRequireDefault(require_bytes2base64());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function woff2tobase64(arrayBuffer) {
      return "data:font/woff2;charset=utf-8;base64," + (0, _bytes2base.default)(arrayBuffer);
    }
  }
});

// vendor/fonteditor-core/lib/ttf/font.js
var require_font = __commonJS({
  "vendor/fonteditor-core/lib/ttf/font.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.Font = void 0;
    exports2.createFont = createFont;
    exports2.default = void 0;
    var _buffer = _interopRequireDefault(require_buffer());
    var _getEmptyttfObject = _interopRequireDefault(require_getEmptyttfObject());
    var _ttf = _interopRequireDefault(require_ttf());
    var _woff2ttf = _interopRequireDefault(require_woff2ttf());
    var _otf2ttfobject = _interopRequireDefault(require_otf2ttfobject());
    var _eot2ttf = _interopRequireDefault(require_eot2ttf());
    var _svg2ttfobject = _interopRequireDefault(require_svg2ttfobject());
    var _ttfreader = _interopRequireDefault(require_ttfreader());
    var _ttfwriter = _interopRequireDefault(require_ttfwriter());
    var _ttf2eot = _interopRequireDefault(require_ttf2eot());
    var _ttf2woff = _interopRequireDefault(require_ttf2woff());
    var _ttf2svg = _interopRequireDefault(require_ttf2svg());
    var _ttf2symbol = _interopRequireDefault(require_ttf2symbol());
    var _ttftowoff = _interopRequireDefault(require_ttftowoff2());
    var _woff2tottf = _interopRequireDefault(require_woff2tottf());
    var _ttf2base = _interopRequireDefault(require_ttf2base64());
    var _eot2base = _interopRequireDefault(require_eot2base64());
    var _woff2base = _interopRequireDefault(require_woff2base64());
    var _svg2base = _interopRequireDefault(require_svg2base64());
    var _bytes2base = _interopRequireDefault(require_bytes2base64());
    var _woff2tobase = _interopRequireDefault(require_woff2tobase64());
    var _optimizettf = _interopRequireDefault(require_optimizettf());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    var SUPPORT_BUFFER = (typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && _typeof(process.versions) === "object" && typeof process.versions.node !== "undefined" && typeof Buffer === "function";
    var Font2 = exports2.Font = /* @__PURE__ */ function() {
      function Font3(buffer) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
          type: "ttf"
        };
        _classCallCheck(this, Font3);
        if (_typeof(buffer) === "object" && buffer.glyf) {
          this.set(buffer);
        } else if (buffer) {
          this.read(buffer, options);
        } else {
          this.readEmpty();
        }
      }
      return _createClass(Font3, [{
        key: "readEmpty",
        value: (
          /**
           * 设置一个空的 ttfObject 对象
           *
           * @return {Font}
           */
          function readEmpty() {
            this.data = (0, _getEmptyttfObject.default)();
            return this;
          }
        )
        /**
         * 读取字体数据
         *
         * @param {ArrayBuffer|Buffer|string|Document} buffer  字体数据
         * @param {Object} options  读取参数
         * @param {string} options.type 字体类型
         *
         * ttf, woff , eot 读取配置
         * @param {boolean} options.hinting 是否保留 hinting 信息
         * @param {boolean} options.kerning 是否保留 kerning 信息
         * @param {boolean} options.compound2simple 复合字形转简单字形
         *
         * woff 读取配置
         * @param {Function} options.inflate 解压相关函数
         *
         * svg 读取配置
         * @param {boolean} options.combinePath 是否合并成单个字形，仅限于普通svg导入
         * @return {Font}
         */
      }, {
        key: "read",
        value: function read(buffer, options) {
          if (SUPPORT_BUFFER) {
            if (buffer instanceof Buffer) {
              buffer = _buffer.default.toArrayBuffer(buffer);
            }
          }
          if (options.type === "ttf") {
            this.data = new _ttfreader.default(options).read(buffer);
          } else if (options.type === "otf") {
            this.data = (0, _otf2ttfobject.default)(buffer, options);
          } else if (options.type === "eot") {
            buffer = (0, _eot2ttf.default)(buffer, options);
            this.data = new _ttfreader.default(options).read(buffer);
          } else if (options.type === "woff") {
            buffer = (0, _woff2ttf.default)(buffer, options);
            this.data = new _ttfreader.default(options).read(buffer);
          } else if (options.type === "woff2") {
            buffer = (0, _woff2tottf.default)(buffer, options);
            this.data = new _ttfreader.default(options).read(buffer);
          } else if (options.type === "svg") {
            this.data = (0, _svg2ttfobject.default)(buffer, options);
          } else {
            throw new Error("not support font type" + options.type);
          }
          this.type = options.type;
          return this;
        }
        /**
         * 写入字体数据
         *
         * @param {Object} options  写入参数
         * @param {string} options.type   字体类型, 默认 ttf
         * @param {boolean} options.toBuffer nodejs 环境中返回 Buffer 对象, 默认 true
         *
         * ttf 字体参数
         * @param {boolean} options.hinting 是否保留 hinting 信息
         * @param {boolean} options.kerning 是否保留 kerning 信息
         * svg,woff 字体参数
         * @param {Object} options.metadata 字体相关的信息
         *
         * woff 字体参数
         * @param {Function} options.deflate 压缩相关函数
         * @return {Buffer|ArrayBuffer|string}
         */
      }, {
        key: "write",
        value: function write() {
          var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          if (!options.type) {
            options.type = this.type;
          }
          var buffer = null;
          if (options.type === "ttf") {
            buffer = new _ttfwriter.default(options).write(this.data);
          } else if (options.type === "eot") {
            buffer = new _ttfwriter.default(options).write(this.data);
            buffer = (0, _ttf2eot.default)(buffer, options);
          } else if (options.type === "woff") {
            buffer = new _ttfwriter.default(options).write(this.data);
            buffer = (0, _ttf2woff.default)(buffer, options);
          } else if (options.type === "woff2") {
            buffer = new _ttfwriter.default(Object.assign({}, options, { skipCheckSum: true })).write(this.data);
            buffer = (0, _ttftowoff.default)(buffer, options);
          } else if (options.type === "svg") {
            buffer = (0, _ttf2svg.default)(this.data, options);
          } else if (options.type === "symbol") {
            buffer = (0, _ttf2symbol.default)(this.data, options);
          } else {
            throw new Error("not support font type" + options.type);
          }
          if (SUPPORT_BUFFER) {
            if (false !== options.toBuffer && buffer instanceof ArrayBuffer) {
              buffer = _buffer.default.toBuffer(buffer);
            }
          }
          return buffer;
        }
        /**
         * 转换成 base64编码
         *
         * @param {Object} options  写入参数
         * @param {string} options.type   字体类型, 默认 ttf
         * 其他 options参数, 参考 write
         * @see write
         *
         * @param {ArrayBuffer=} buffer  如果提供了buffer数据则使用 buffer数据, 否则转换现有的 font
         * @return {string}
         */
      }, {
        key: "toBase64",
        value: function toBase64(options, buffer) {
          if (!options.type) {
            options.type = this.type;
          }
          if (buffer) {
            if (SUPPORT_BUFFER) {
              if (buffer instanceof Buffer) {
                buffer = _buffer.default.toArrayBuffer(buffer);
              }
            }
          } else {
            options.toBuffer = false;
            buffer = this.write(options);
          }
          var base64Str;
          if (options.type === "ttf") {
            base64Str = (0, _ttf2base.default)(buffer);
          } else if (options.type === "eot") {
            base64Str = (0, _eot2base.default)(buffer);
          } else if (options.type === "woff") {
            base64Str = (0, _woff2base.default)(buffer);
          } else if (options.type === "woff2") {
            base64Str = (0, _woff2tobase.default)(buffer);
          } else if (options.type === "svg") {
            base64Str = (0, _svg2base.default)(buffer);
          } else if (options.type === "symbol") {
            base64Str = (0, _svg2base.default)(buffer, "image/svg+xml");
          } else {
            throw new Error("not support font type" + options.type);
          }
          return base64Str;
        }
        /**
         * 设置 font 对象
         *
         * @param {Object} data font的ttfObject对象
         * @return {this}
         */
      }, {
        key: "set",
        value: function set(data) {
          this.data = data;
          return this;
        }
        /**
         * 获取 font 数据
         *
         * @return {Object} ttfObject 对象
         */
      }, {
        key: "get",
        value: function get() {
          return this.data;
        }
        /**
         * 对字形数据进行优化
         *
         * @param  {Object} out  输出结果
         * @param  {boolean|Object} out.result `true` 或者有问题的地方
         * @return {Font}
         */
      }, {
        key: "optimize",
        value: function optimize(out) {
          var result = (0, _optimizettf.default)(this.data);
          if (out) {
            out.result = result;
          }
          return this;
        }
        /**
         * 将字体中的复合字形转为简单字形
         *
         * @return {this}
         */
      }, {
        key: "compound2simple",
        value: function compound2simple() {
          var ttfHelper = this.getHelper();
          ttfHelper.compound2simple();
          this.data = ttfHelper.get();
          return this;
        }
        /**
         * 对字形按照unicode编码排序
         *
         * @return {this}
         */
      }, {
        key: "sort",
        value: function sort() {
          var ttfHelper = this.getHelper();
          ttfHelper.sortGlyf();
          this.data = ttfHelper.get();
          return this;
        }
        /**
         * 查找相关字形
         *
         * @param  {Object} condition 查询条件
         * @param  {Array|number} condition.unicode unicode编码列表或者单个unicode编码
         * @param  {string} condition.name glyf名字，例如`uniE001`, `uniE`
         * @param  {Function} condition.filter 自定义过滤器
         * @example
         *     condition.filter(glyf) {
         *         return glyf.name === 'logo';
         *     }
         * @return {Array}  glyf字形列表
         */
      }, {
        key: "find",
        value: function find(condition) {
          var ttfHelper = this.getHelper();
          var indexList = ttfHelper.findGlyf(condition);
          return indexList.length ? ttfHelper.getGlyf(indexList) : indexList;
        }
        /**
         * 合并 font 到当前的 font
         *
         * @param {Object} font Font 对象
         * @param {Object} options 参数选项
         * @param {boolean} options.scale 是否自动缩放
         * @param {boolean} options.adjustGlyf 是否调整字形以适应边界
         *                                     (和 options.scale 参数互斥)
         *
         * @return {Font}
         */
      }, {
        key: "merge",
        value: function merge(font, options) {
          var ttfHelper = this.getHelper();
          ttfHelper.mergeGlyf(font.get(), options);
          this.data = ttfHelper.get();
          return this;
        }
        /**
         * 获取 TTF helper 实例
         */
      }, {
        key: "getHelper",
        value: function getHelper() {
          return new _ttf.default(this.data);
        }
      }], [{
        key: "create",
        value: function create(buffer, options) {
          return new Font3(buffer, options);
        }
      }]);
    }();
    Font2.toBase64 = function(buffer) {
      if (typeof buffer === "string") {
        if (typeof btoa === "undefined") {
          return Buffer.from(buffer, "binary").toString("base64");
        }
        return btoa(buffer);
      }
      return (0, _bytes2base.default)(buffer);
    };
    function createFont(buffer, options) {
      return new Font2(buffer, options);
    }
    var _default = exports2.default = Font2;
  }
});

// vendor/web-font-subset/font.ts
var font_exports = {};
__export(font_exports, {
  createSubsetFont: () => createSubsetFont,
  fontSubset: () => fontSubset,
  optimizeFont: () => optimizeFont,
  textToCodePoints: () => textToCodePoints,
  writeFont: () => writeFont
});
module.exports = __toCommonJS(font_exports);
var import_font = __toESM(require_font());

// vendor/web-font-subset/ot-bytes.ts
var OTWriter = class {
  /** 优化（Uint8Array 底层缓冲）：原用 number[] + push 累积字节，每个 writeUint8/16 触发
   *  数字装箱与数组扩容；gsub-subset 逐字节 writeUint8 复制 ScriptList/FeatureList 字节块
   *  极慢。改用 Uint8Array 容量缓冲 + size 指针：writeUint8/16 索引写入（无装箱），
   *  writeBytes 用 TypedArray.set 批量复制，toUint8Array 零拷贝 subarray。
   *
   *  优化327: 初始容量 256→2048，并让 writeUint16/writeInt16/reserveOffset16 内联容量检查。
   *  GPOS/GSUB 输出常达数 KB（思源 GPOS 978B、令东 GSUB 数十 KB），256 起步触发多次 2× 扩容
   *  （每次扩容 new Uint8Array + set 全拷贝）。更关键的是 writeUint16 是序列化第一热点
   *  （思源 subsetGPOS 207 次/call 占 ~58%），原实现每次调 private ensure()——V8 对 class
   *  private method 内联不充分，per-call 函数调用开销在百次累计下显著。改为内联容量判断
   *  （够用直接写，不够才调 grow），消除热路径上的函数调用。 */
  /** 初始容量：默认 2048；subsetGPOS/subsetGSUB 主 Writer 按原表大小预分配避免多次 grow 全拷贝 */
  buf;
  size = 0;
  patches = [];
  /** 预估输出容量的 Writer（省去从默认容量多次 2× 扩容的全拷贝）。initialCapacity 为 0/省略时用默认 2048。 */
  constructor(initialCapacity = 2048) {
    this.buf = new Uint8Array(initialCapacity > 0 ? initialCapacity : 2048);
  }
  get length() {
    return this.size;
  }
  /** 容量不足时扩容（仅在 write 路径内联判断发现不够时调用） */
  grow(required) {
    let cap = this.buf.byteLength;
    while (cap < required) cap *= 2;
    const grown = new Uint8Array(cap);
    grown.set(this.buf);
    this.buf = grown;
  }
  /** 回退到指定字节位置，丢弃之后写入的字节与对应的偏移量槽（用于 subtable 重映射失败的保守降级）。
   *  patches 按 pos 单调递增追加，故从尾部 pop 掉 pos >= 阈值的项即可，无需全量 filter
   *  （subsetGSUB 每个失败的 subtable 都 rollback，FiraCode 实测 392 次/call，filter 改 pop 后此热点消失）。 */
  rollback(pos) {
    this.size = pos;
    const patches = this.patches;
    while (patches.length > 0 && patches[patches.length - 1].pos >= pos) patches.pop();
  }
  writeUint8(v) {
    const s = this.size;
    if (s + 1 > this.buf.byteLength) this.grow(s + 1);
    this.buf[s] = v & 255;
    this.size = s + 1;
  }
  writeUint16(v) {
    const s = this.size;
    if (s + 2 > this.buf.byteLength) this.grow(s + 2);
    this.buf[s] = v >>> 8 & 255;
    this.buf[s + 1] = v & 255;
    this.size = s + 2;
  }
  /** 批量写入字节块（TypedArray.set，远快于逐字节 writeUint8 循环） */
  writeBytes(arr) {
    const n = arr.byteLength;
    const s = this.size;
    const required = s + n;
    if (required > this.buf.byteLength) this.grow(required);
    this.buf.set(arr, s);
    this.size = required;
  }
  /** 在当前末尾写入 int16（大端，支持负数；如 SingleSubst format1 的 deltaGlyphID）。
   *  原实现依赖 number[] 索引赋值到 length 位置隐式扩展数组，Uint8Array 版需显式 ensure + 推进 size。 */
  writeInt16(v) {
    const s = this.size;
    if (s + 2 > this.buf.byteLength) this.grow(s + 2);
    const u16 = v < 0 ? 65536 + (v & 65535) : v & 65535;
    this.buf[s] = u16 >>> 8 & 255;
    this.buf[s + 1] = u16 & 255;
    this.size = s + 2;
  }
  /** 在指定绝对位置写入 int16（支持负数；同时用于 flush 回填可能为负的偏移量）。
   *  pos 必须已在已写入范围内（由 reserveOffset16 的 ensure 保证），仅覆盖不扩展。 */
  writeInt16At(pos, v) {
    const u16 = v < 0 ? 65536 + (v & 65535) : v & 65535;
    this.buf[pos] = u16 >>> 8 & 255;
    this.buf[pos + 1] = u16 & 255;
  }
  /** 预留一个 uint16 偏移量槽位，flush 时写入 (targetGetter() - base) */
  reserveOffset16(base, targetGetter) {
    const pos = this.size;
    if (pos + 2 > this.buf.byteLength) this.grow(pos + 2);
    this.size = pos + 2;
    this.patches.push({ pos, base, targetGetter });
  }
  /** flush 所有预留偏移量，必须在所有字节写完后调用 */
  flush() {
    for (const p of this.patches) {
      this.writeInt16At(p.pos, p.targetGetter() - p.base);
    }
  }
  toUint8Array() {
    return this.buf.subarray(0, this.size);
  }
};
var OTReader = class {
  errorFlag = false;
  /** 原始 DataView，热路径（如 coverage 解析）可直接用 getUint16 绕过 u16 的逐次边界检查 */
  dv;
  constructor(dv) {
    this.dv = dv;
  }
  u16(off) {
    if (off < 0 || off + 2 > this.dv.byteLength) {
      this.errorFlag = true;
      return 0;
    }
    return this.dv.getUint16(off, false);
  }
  i16(off) {
    if (off < 0 || off + 2 > this.dv.byteLength) {
      this.errorFlag = true;
      return 0;
    }
    return this.dv.getInt16(off, false);
  }
  u32(off) {
    if (off < 0 || off + 4 > this.dv.byteLength) {
      this.errorFlag = true;
      return 0;
    }
    return this.dv.getUint32(off, false);
  }
  /** 清除 errorFlag（开始解析新 subtable 前调用） */
  clearError() {
    this.errorFlag = false;
  }
};
function scriptListSpan(r, listAbs) {
  r.clearError();
  const scriptCount = r.u16(listAbs);
  let span = 2 + scriptCount * 6;
  for (let i = 0; i < scriptCount; i++) {
    const scriptRel = r.u16(listAbs + 2 + i * 6 + 4);
    const scriptAbs = listAbs + scriptRel;
    const defaultLangSysOff = r.u16(scriptAbs);
    const langSysCount = r.u16(scriptAbs + 2);
    span = Math.max(span, scriptRel + 4 + langSysCount * 6);
    if (defaultLangSysOff !== 0) {
      const dlAbs = scriptAbs + defaultLangSysOff;
      const dlRel = scriptRel + defaultLangSysOff;
      const fic = r.u16(dlAbs + 4);
      span = Math.max(span, dlRel + 6 + fic * 2);
    }
    for (let li = 0; li < langSysCount; li++) {
      const lsRel = r.u16(scriptAbs + 4 + li * 6 + 4);
      const lsAbs = scriptAbs + lsRel;
      const fic = r.u16(lsAbs + 4);
      span = Math.max(span, scriptRel + lsRel + 6 + fic * 2);
    }
  }
  return r.errorFlag ? -1 : span;
}
function featureListSpan(r, listAbs) {
  r.clearError();
  const featureCount = r.u16(listAbs);
  let span = 2 + featureCount * 6;
  for (let i = 0; i < featureCount; i++) {
    const ftRel = r.u16(listAbs + 2 + i * 6 + 4);
    const ftAbs = listAbs + ftRel;
    const lookupIndexCount = r.u16(ftAbs + 2);
    span = Math.max(span, ftRel + 4 + lookupIndexCount * 2);
  }
  return r.errorFlag ? -1 : span;
}
function serializeScriptList(r, listAbs) {
  r.clearError();
  const w = new OTWriter();
  const scriptCount = r.u16(listAbs);
  w.writeUint16(scriptCount);
  const scriptNewOffs = new Array(scriptCount);
  for (let i = 0; i < scriptCount; i++) {
    const recAbs = listAbs + 2 + i * 6;
    w.writeUint8(r.u16(recAbs) >>> 8);
    w.writeUint8(r.u16(recAbs) & 255);
    w.writeUint8(r.u16(recAbs + 2) >>> 8);
    w.writeUint8(r.u16(recAbs + 2) & 255);
    w.reserveOffset16(0, /* @__PURE__ */ ((idx) => () => scriptNewOffs[idx])(i));
  }
  for (let i = 0; i < scriptCount; i++) {
    scriptNewOffs[i] = w.length;
    const scriptOldOff = listAbs + r.u16(listAbs + 2 + i * 6 + 4);
    const defaultLangSysOff = r.u16(scriptOldOff);
    const langSysCount = r.u16(scriptOldOff + 2);
    const langSysNewOffs = new Array(langSysCount);
    const stStart = w.length;
    const defaultSlotHolder = [0];
    w.reserveOffset16(stStart, () => defaultSlotHolder[0]);
    w.writeUint16(langSysCount);
    for (let li = 0; li < langSysCount; li++) {
      const lr = scriptOldOff + 4 + li * 6;
      w.writeUint8(r.u16(lr) >>> 8);
      w.writeUint8(r.u16(lr) & 255);
      w.writeUint8(r.u16(lr + 2) >>> 8);
      w.writeUint8(r.u16(lr + 2) & 255);
      w.reserveOffset16(stStart, /* @__PURE__ */ ((idx) => () => langSysNewOffs[idx])(li));
    }
    if (defaultLangSysOff !== 0) {
      defaultSlotHolder[0] = w.length;
      copyLangSys(w, r, scriptOldOff + defaultLangSysOff);
    }
    for (let li = 0; li < langSysCount; li++) {
      const lr = scriptOldOff + 4 + li * 6;
      const lsOldOff = scriptOldOff + r.u16(lr + 4);
      langSysNewOffs[li] = w.length;
      copyLangSys(w, r, lsOldOff);
    }
  }
  if (r.errorFlag) return null;
  w.flush();
  return w.toUint8Array();
}
function copyLangSys(w, r, absOff) {
  w.writeUint16(0);
  w.writeUint16(r.u16(absOff + 2));
  const fic = r.u16(absOff + 4);
  w.writeUint16(fic);
  for (let fi = 0; fi < fic; fi++) w.writeUint16(r.u16(absOff + 6 + fi * 2));
}
function serializeFeatureList(r, listAbs) {
  r.clearError();
  const w = new OTWriter();
  const featureCount = r.u16(listAbs);
  w.writeUint16(featureCount);
  const featureNewOffs = new Array(featureCount);
  for (let i = 0; i < featureCount; i++) {
    const recAbs = listAbs + 2 + i * 6;
    w.writeUint8(r.u16(recAbs) >>> 8);
    w.writeUint8(r.u16(recAbs) & 255);
    w.writeUint8(r.u16(recAbs + 2) >>> 8);
    w.writeUint8(r.u16(recAbs + 2) & 255);
    w.reserveOffset16(0, /* @__PURE__ */ ((idx) => () => featureNewOffs[idx])(i));
  }
  for (let i = 0; i < featureCount; i++) {
    featureNewOffs[i] = w.length;
    const ftOldOff = listAbs + r.u16(listAbs + 2 + i * 6 + 4);
    const featureParamsOff = r.u16(ftOldOff);
    const lookupIndexCount = r.u16(ftOldOff + 2);
    w.writeUint16(featureParamsOff);
    w.writeUint16(lookupIndexCount);
    for (let li = 0; li < lookupIndexCount; li++) w.writeUint16(r.u16(ftOldOff + 4 + li * 2));
  }
  if (r.errorFlag) return null;
  w.flush();
  return w.toUint8Array();
}

// vendor/web-font-subset/gpos-subset.ts
var VF_X_PLACEMENT = 1;
var VF_Y_PLACEMENT = 2;
var VF_X_ADVANCE = 4;
var VF_Y_ADVANCE = 8;
var VF_X_PLA_DEVICE = 16;
var VF_Y_PLA_DEVICE = 32;
var VF_X_ADV_DEVICE = 64;
var VF_Y_ADV_DEVICE = 128;
function valueRecordSize(valueFormat) {
  let n = 0;
  for (let bits = valueFormat & 255; bits; bits >>>= 1) n += bits & 1;
  return n;
}
var LT_SINGLE_POS = 1;
var LT_PAIR_POS = 2;
var LT_MARKBASE_POS = 4;
var LT_MARKLIG_POS = 5;
var LT_MARKMARK_POS = 6;
var LT_EXTENSION = 9;
function writeEmptyPosSubtable(w, effectiveType) {
  const subStart = w.length;
  w.writeUint16(1);
  if (effectiveType === LT_MARKBASE_POS || effectiveType === LT_MARKLIG_POS || effectiveType === LT_MARKMARK_POS) {
    const markCovHolder = [0];
    const baseCovHolder = [0];
    const markArrayHolder = [0];
    const baseArrayHolder = [0];
    w.reserveOffset16(subStart, () => markCovHolder[0]);
    w.reserveOffset16(subStart, () => baseCovHolder[0]);
    w.writeUint16(0);
    w.reserveOffset16(subStart, () => markArrayHolder[0]);
    w.reserveOffset16(subStart, () => baseArrayHolder[0]);
    markCovHolder[0] = w.length;
    writeEmptyCoverage(w);
    baseCovHolder[0] = w.length;
    writeEmptyCoverage(w);
    markArrayHolder[0] = w.length;
    w.writeUint16(0);
    baseArrayHolder[0] = w.length;
    w.writeUint16(0);
    return;
  }
  const coverageOffConst = effectiveType === LT_PAIR_POS ? 10 : 6;
  w.writeUint16(coverageOffConst);
  if (effectiveType === LT_SINGLE_POS) {
    w.writeUint16(0);
  } else if (effectiveType === LT_PAIR_POS) {
    w.writeUint16(0);
    w.writeUint16(0);
    w.writeUint16(0);
  } else {
    w.writeUint16(0);
  }
  writeEmptyCoverage(w);
}
function writeEmptyCoverage(w) {
  w.writeUint16(1);
  w.writeUint16(0);
}
function subsetGPOS(gposBytes, origToNew) {
  const dv = new DataView(gposBytes.buffer, gposBytes.byteOffset, gposBytes.byteLength);
  const r = new OTReader(dv);
  let maxOrigGid = 0;
  for (const g of origToNew.keys()) if (g > maxOrigGid) maxOrigGid = g;
  const gidLookup = new Int32Array(maxOrigGid + 1).fill(-1);
  for (const [g, n] of origToNew) gidLookup[g] = n;
  const major = dv.getUint16(0, false);
  const minor = dv.getUint16(2, false);
  if (major !== 1 || minor > 1) return null;
  const scriptListOff = dv.getUint16(4, false);
  const featureListOff = dv.getUint16(6, false);
  const lookupListOff = dv.getUint16(8, false);
  if (minor === 1 && r.u32(10) !== 0) return null;
  const lookupCount = dv.getUint16(lookupListOff, false);
  const lookupRelOffs = [];
  for (let i = 0; i < lookupCount; i++) {
    lookupRelOffs.push(dv.getUint16(lookupListOff + 2 + i * 2, false));
  }
  const lookups = [];
  for (let i = 0; i < lookupCount; i++) {
    const lOff = lookupListOff + lookupRelOffs[i];
    const lookupType = dv.getUint16(lOff, false);
    const subTableCount = dv.getUint16(lOff + 4, false);
    const subtableAbsOffs = [];
    let effectiveType = lookupType;
    for (let j = 0; j < subTableCount; j++) {
      const subOff = lOff + dv.getUint16(lOff + 6 + j * 2, false);
      if (lookupType === LT_EXTENSION) {
        if (dv.getUint16(subOff, false) !== 1) {
          effectiveType = -1;
          continue;
        }
        effectiveType = dv.getUint16(subOff + 2, false);
        subtableAbsOffs.push(subOff + r.u32(subOff + 4));
      } else {
        subtableAbsOffs.push(subOff);
      }
    }
    const supported = effectiveType === LT_SINGLE_POS || effectiveType === LT_PAIR_POS;
    lookups.push({ supported, effectiveType, subtableAbsOffs, origLookupOff: lOff });
  }
  const subtableHits = [];
  for (let i = 0; i < lookupCount; i++) {
    const lk = lookups[i];
    const hits = [];
    if (lk.supported) {
      for (let j = 0; j < lk.subtableAbsOffs.length; j++) {
        hits.push(subtableCoverageHits(r, lk.subtableAbsOffs[j], gidLookup));
      }
    }
    subtableHits.push(hits);
  }
  const slSpan = scriptListSpan(r, scriptListOff);
  const slContiguous = slSpan >= 0 && scriptListOff + slSpan <= featureListOff;
  const scriptListBytes = slContiguous ? gposBytes.subarray(scriptListOff, scriptListOff + slSpan) : serializeScriptList(r, scriptListOff);
  const flSpan = featureListSpan(r, featureListOff);
  const flContiguous = flSpan >= 0 && featureListOff + flSpan <= lookupListOff;
  const featureListBytes = flContiguous ? gposBytes.subarray(featureListOff, featureListOff + flSpan) : serializeFeatureList(r, featureListOff);
  r.clearError();
  if (!scriptListBytes || !featureListBytes) return null;
  const w = new OTWriter(gposBytes.byteLength);
  w.writeUint16(1);
  w.writeUint16(0);
  const scriptListAbsHolder = [];
  w.reserveOffset16(0, () => scriptListAbsHolder[0]);
  const featureListAbsHolder = [];
  w.reserveOffset16(0, () => featureListAbsHolder[0]);
  const lookupListAbsHolder = [];
  w.reserveOffset16(0, () => lookupListAbsHolder[0]);
  scriptListAbsHolder.push(w.length);
  w.writeBytes(scriptListBytes);
  featureListAbsHolder.push(w.length);
  w.writeBytes(featureListBytes);
  const lookupListAbs = w.length;
  lookupListAbsHolder.push(lookupListAbs);
  w.writeUint16(lookupCount);
  const lookupSlotsStart = w.length;
  for (let i = 0; i < lookupCount; i++) {
    w.writeUint16(0);
  }
  const lookupAbsPositions = new Array(lookupCount);
  for (let i = 0; i < lookupCount; i++) {
    lookupAbsPositions[i] = w.length;
    const lk = lookups[i];
    if (lk.supported) {
      const lookupFlag = r.u16(lk.origLookupOff + 2);
      const useMarkFilteringSet = (lookupFlag & 16) !== 0;
      const hits = subtableHits[i];
      let anyHit = false;
      for (let j = 0; j < hits.length; j++) {
        if (hits[j]) {
          anyHit = true;
          break;
        }
      }
      if (!anyHit) {
        w.writeUint16(lk.effectiveType);
        w.writeUint16(lookupFlag);
        w.writeUint16(1);
        const lookupStart = w.length - 6;
        const subtableSlotsStart = w.length;
        w.writeUint16(0);
        if (useMarkFilteringSet) {
          w.writeUint16(r.u16(lk.origLookupOff + 6 + lk.subtableAbsOffs.length * 2));
        }
        const subtablePos = w.length;
        writeEmptyPosSubtable(w, lk.effectiveType);
        w.writeInt16At(subtableSlotsStart, subtablePos - lookupStart);
      } else {
        const hitIdxs = [];
        for (let j = 0; j < hits.length; j++) {
          if (hits[j]) hitIdxs.push(j);
        }
        const keptCount = hitIdxs.length;
        w.writeUint16(lk.effectiveType);
        w.writeUint16(lookupFlag);
        w.writeUint16(keptCount);
        const lookupStart = w.length - 6;
        const subtableAbsPositions = new Array(keptCount);
        const subtableSlotsStart = w.length;
        for (let j = 0; j < keptCount; j++) {
          w.writeUint16(0);
        }
        if (useMarkFilteringSet) {
          w.writeUint16(r.u16(lk.origLookupOff + 6 + lk.subtableAbsOffs.length * 2));
        }
        for (let j = 0; j < keptCount; j++) {
          const origIdx = hitIdxs[j];
          subtableAbsPositions[j] = w.length;
          r.clearError();
          const ok = serializeSubtable(w, r, lk.subtableAbsOffs[origIdx], lk.effectiveType, gidLookup, hits[origIdx]);
          if (!ok || r.errorFlag) return null;
          w.writeInt16At(subtableSlotsStart + j * 2, subtableAbsPositions[j] - lookupStart);
        }
      }
    } else {
      const lookupFlag = r.u16(lk.origLookupOff + 2);
      const useMarkFilteringSet = (lookupFlag & 16) !== 0;
      w.writeUint16(r.u16(lk.origLookupOff));
      w.writeUint16(lookupFlag);
      w.writeUint16(1);
      const lookupStart = w.length - 6;
      const subtableSlotsStart = w.length;
      w.writeUint16(0);
      if (useMarkFilteringSet) {
        w.writeUint16(r.u16(lk.origLookupOff + 6 + lk.subtableAbsOffs.length * 2));
      }
      const subtablePos = w.length;
      writeEmptyPosSubtable(w, lk.effectiveType);
      w.writeInt16At(subtableSlotsStart, subtablePos - lookupStart);
    }
    w.writeInt16At(lookupSlotsStart + i * 2, lookupAbsPositions[i] - lookupListAbs);
  }
  w.flush();
  return w.toUint8Array();
}
function serializeSubtable(w, r, subAbs, type, gidLookup, coverageHit) {
  if (!coverageHit) {
    writeEmptyPosSubtable(w, type);
    return true;
  }
  if (type === LT_SINGLE_POS) return serializeSinglePos(w, r, subAbs, gidLookup);
  if (type === LT_PAIR_POS) return serializePairPos(w, r, subAbs, gidLookup);
  return false;
}
function remapGid(origGid, gidLookup) {
  return origGid < gidLookup.length ? gidLookup[origGid] : -1;
}
function subtableCoverageHits(r, subAbs, gidLookup) {
  const dv = r.dv;
  const len = dv.byteLength;
  const coverageOff = r.u16(subAbs + 2);
  const covAbs = subAbs + coverageOff;
  if (covAbs + 4 > len) return false;
  const fmt = dv.getUint16(covAbs, false);
  if (fmt === 1) {
    const count = dv.getUint16(covAbs + 2, false);
    const base = covAbs + 4;
    if (base + count * 2 > len) return false;
    for (let i = 0; i < count; i++) {
      if (gidLookup[dv.getUint16(base + i * 2, false)] >= 0) return true;
    }
    return false;
  }
  if (fmt === 2) {
    const rangeCount = dv.getUint16(covAbs + 2, false);
    let p = covAbs + 4;
    for (let i = 0; i < rangeCount; i++) {
      if (p + 6 > len) break;
      const start = dv.getUint16(p, false);
      const end = dv.getUint16(p + 2, false);
      for (let g = start; g <= end; g++) {
        if (gidLookup[g] >= 0) return true;
      }
      p += 6;
    }
    return false;
  }
  return true;
}
function writeValueRecord(w, r, absOff, valueFormat) {
  if (valueFormat & (VF_X_PLA_DEVICE | VF_Y_PLA_DEVICE | VF_X_ADV_DEVICE | VF_Y_ADV_DEVICE)) {
    return false;
  }
  let off = absOff;
  if (valueFormat & VF_X_PLACEMENT) {
    w.writeInt16(r.i16(off));
    off += 2;
  }
  if (valueFormat & VF_Y_PLACEMENT) {
    w.writeInt16(r.i16(off));
    off += 2;
  }
  if (valueFormat & VF_X_ADVANCE) {
    w.writeInt16(r.i16(off));
    off += 2;
  }
  if (valueFormat & VF_Y_ADVANCE) {
    w.writeInt16(r.i16(off));
    off += 2;
  }
  return true;
}
function vrCount(valueFormat) {
  return valueRecordSize(valueFormat);
}
function readCoverageGids(r, coverageAbs) {
  const dv = r.dv;
  const fmt = dv.getUint16(coverageAbs, false);
  const out = [];
  if (fmt === 1) {
    const count = dv.getUint16(coverageAbs + 2, false);
    const base = coverageAbs + 4;
    for (let i = 0; i < count; i++) out.push(dv.getUint16(base + i * 2, false));
    return out;
  }
  if (fmt === 2) {
    const rangeCount = dv.getUint16(coverageAbs + 2, false);
    for (let i = 0; i < rangeCount; i++) {
      const recOff = coverageAbs + 4 + i * 6;
      const start = dv.getUint16(recOff, false);
      const end = dv.getUint16(recOff + 2, false);
      for (let g = start; g <= end; g++) out.push(g);
    }
    return out;
  }
  return null;
}
function emitCoverageFromGids(w, sorted) {
  if (sorted.length === 0) {
    w.writeUint16(1);
    w.writeUint16(0);
    return true;
  }
  const ranges = [];
  let curStart = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === prev + 1) {
      prev = sorted[i];
    } else {
      ranges.push({ start: curStart, end: prev });
      curStart = sorted[i];
      prev = sorted[i];
    }
  }
  ranges.push({ start: curStart, end: prev });
  const listCost = 4 + sorted.length * 2;
  const rangeCost = 4 + ranges.length * 6;
  if (rangeCost < listCost) {
    w.writeUint16(2);
    w.writeUint16(ranges.length);
    let startCoverageIndex = 0;
    for (const rg of ranges) {
      w.writeUint16(rg.start);
      w.writeUint16(rg.end);
      w.writeUint16(startCoverageIndex);
      startCoverageIndex += rg.end - rg.start + 1;
    }
  } else {
    w.writeUint16(1);
    w.writeUint16(sorted.length);
    for (const g of sorted) w.writeUint16(g);
  }
  return true;
}
function emitClassDefFromClassMap(w, classMap) {
  const entries = [...classMap.entries()].sort((a, b) => a[0] - b[0]);
  if (entries.length === 0) {
    w.writeUint16(1);
    w.writeUint16(0);
    w.writeUint16(0);
    return true;
  }
  const ranges = [];
  let curStart = entries[0][0];
  let curCls = entries[0][1];
  let prev = entries[0][0];
  for (let i = 1; i < entries.length; i++) {
    const [gid, cls] = entries[i];
    if (gid === prev + 1 && cls === curCls) {
      prev = gid;
    } else {
      ranges.push({ start: curStart, end: prev, cls: curCls });
      curStart = gid;
      curCls = cls;
      prev = gid;
    }
  }
  ranges.push({ start: curStart, end: prev, cls: curCls });
  const listStart = entries[0][0];
  const listCount = entries[entries.length - 1][0] - listStart + 1;
  const listCost = 6 + listCount * 2;
  const rangeCost = 4 + ranges.length * 6;
  if (rangeCost < listCost) {
    w.writeUint16(2);
    w.writeUint16(ranges.length);
    for (const rg of ranges) {
      w.writeUint16(rg.start);
      w.writeUint16(rg.end);
      w.writeUint16(rg.cls);
    }
  } else {
    w.writeUint16(1);
    w.writeUint16(listStart);
    w.writeUint16(listCount);
    for (let gid = listStart; gid <= listStart + listCount - 1; gid++) {
      w.writeUint16(classMap.get(gid) ?? 0);
    }
  }
  return true;
}
function readClassDefMap(r, classDefAbs, gidLookup) {
  const out = /* @__PURE__ */ new Map();
  const dv = r.dv;
  const fmt = dv.getUint16(classDefAbs, false);
  if (fmt === 1) {
    const startGlyph = dv.getUint16(classDefAbs + 2, false);
    const glyphCount = dv.getUint16(classDefAbs + 4, false);
    for (let i = 0; i < glyphCount; i++) {
      const ng = remapGid(startGlyph + i, gidLookup);
      if (ng < 0) continue;
      out.set(ng, dv.getUint16(classDefAbs + 6 + i * 2, false));
    }
  } else if (fmt === 2) {
    const rangeCount = dv.getUint16(classDefAbs + 2, false);
    for (let i = 0; i < rangeCount; i++) {
      const recOff = classDefAbs + 4 + i * 6;
      const start = dv.getUint16(recOff, false);
      const end = dv.getUint16(recOff + 2, false);
      const cls = dv.getUint16(recOff + 4, false);
      for (let g = start; g <= end; g++) {
        const ng = remapGid(g, gidLookup);
        if (ng >= 0) out.set(ng, cls);
      }
    }
  } else {
    return null;
  }
  return out;
}
function serializeSinglePos(w, r, subAbs, gidLookup) {
  const fmt = r.u16(subAbs);
  const coverageOff = r.u16(subAbs + 2);
  const valueFormat = r.u16(subAbs + 4);
  const origGids = readCoverageGids(r, subAbs + coverageOff);
  if (!origGids) return false;
  const sz = vrCount(valueFormat);
  const kept = [];
  for (let idx = 0; idx < origGids.length; idx++) {
    const ng = remapGid(origGids[idx], gidLookup);
    if (ng < 0) continue;
    if (fmt === 1) {
      kept.push({ newGid: ng, valueAbs: subAbs + 6 });
    } else if (fmt === 2) {
      kept.push({ newGid: ng, valueAbs: subAbs + 8 + idx * sz * 2 });
    } else {
      return false;
    }
  }
  kept.sort((a, b) => a.newGid - b.newGid);
  const subStart = w.length;
  if (fmt === 1) {
    w.writeUint16(1);
  } else {
    w.writeUint16(2);
  }
  const covSlot = w.length;
  w.writeUint16(0);
  w.writeUint16(valueFormat);
  if (fmt === 2) {
    w.writeUint16(kept.length);
  }
  for (const e of kept) {
    if (!writeValueRecord(w, r, e.valueAbs, valueFormat)) return false;
  }
  const covPos = w.length;
  emitCoverageFromGids(w, kept.map((e) => e.newGid));
  w.writeInt16At(covSlot, covPos - subStart);
  return true;
}
function serializePairPos(w, r, subAbs, gidLookup) {
  const fmt = r.u16(subAbs);
  const coverageOff = r.u16(subAbs + 2);
  const valueFormat1 = r.u16(subAbs + 4);
  const valueFormat2 = r.u16(subAbs + 6);
  if (fmt === 1) {
    return serializePairPosFormat1(w, r, subAbs, coverageOff, valueFormat1, valueFormat2, gidLookup);
  }
  if (fmt === 2) {
    return serializePairPosFormat2(w, r, subAbs, coverageOff, valueFormat1, valueFormat2, gidLookup);
  }
  return false;
}
function serializePairPosFormat1(w, r, subAbs, coverageOff, valueFormat1, valueFormat2, gidLookup) {
  const firstGids = readCoverageGids(r, subAbs + coverageOff);
  if (!firstGids) return false;
  const dv = r.dv;
  const pairSetCount = dv.getUint16(subAbs + 8, false);
  const vr1 = vrCount(valueFormat1);
  const vr2 = vrCount(valueFormat2);
  const rebuilt = [];
  for (let idx = 0; idx < pairSetCount; idx++) {
    const newFirstGid = remapGid(firstGids[idx], gidLookup);
    if (newFirstGid < 0) continue;
    const pairSetOff = subAbs + dv.getUint16(subAbs + 10 + idx * 2, false);
    const pairValueCount = dv.getUint16(pairSetOff, false);
    const keptSeconds = [];
    for (let p = 0; p < pairValueCount; p++) {
      const recAbs = pairSetOff + 2 + p * (2 + vr1 * 2 + vr2 * 2);
      const newSecondGid = remapGid(dv.getUint16(recAbs, false), gidLookup);
      if (newSecondGid < 0) continue;
      keptSeconds.push({ newSecondGid, recAbs });
    }
    keptSeconds.sort((a, b) => a.newSecondGid - b.newSecondGid);
    const pw = new OTWriter();
    pw.writeUint16(keptSeconds.length);
    for (const ks of keptSeconds) {
      pw.writeUint16(ks.newSecondGid);
      if (vr1 > 0 && !writeValueRecord(pw, r, ks.recAbs + 2, valueFormat1)) return false;
      if (vr2 > 0 && !writeValueRecord(pw, r, ks.recAbs + 2 + vr1 * 2, valueFormat2)) return false;
    }
    pw.flush();
    rebuilt.push({ newFirstGid, pairSetBytes: pw.toUint8Array() });
  }
  rebuilt.sort((a, b) => a.newFirstGid - b.newFirstGid);
  const subStart = w.length;
  w.writeUint16(1);
  const covSlot = w.length;
  w.writeUint16(0);
  w.writeUint16(valueFormat1);
  w.writeUint16(valueFormat2);
  w.writeUint16(rebuilt.length);
  const pairSetAbsPositions = new Array(rebuilt.length);
  for (let i = 0; i < rebuilt.length; i++) {
    const slotIdx = i;
    w.reserveOffset16(subStart, () => pairSetAbsPositions[slotIdx]);
  }
  for (let i = 0; i < rebuilt.length; i++) {
    pairSetAbsPositions[i] = w.length;
    w.writeBytes(rebuilt[i].pairSetBytes);
  }
  const covPos = w.length;
  emitCoverageFromGids(w, rebuilt.map((e) => e.newFirstGid));
  w.writeInt16At(covSlot, covPos - subStart);
  return true;
}
function serializePairPosFormat2(w, r, subAbs, coverageOff, valueFormat1, valueFormat2, gidLookup) {
  const classDef1Off = r.u16(subAbs + 8);
  const classDef2Off = r.u16(subAbs + 10);
  const class2Count = r.u16(subAbs + 14);
  const gidToClass1 = readClassDefMap(r, subAbs + classDef1Off, gidLookup);
  const gidToClass2 = readClassDefMap(r, subAbs + classDef2Off, gidLookup);
  if (!gidToClass1 || !gidToClass2) return false;
  const usedClass1 = /* @__PURE__ */ new Set([0]);
  for (const cls of gidToClass1.values()) usedClass1.add(cls);
  const usedClass2 = /* @__PURE__ */ new Set([0]);
  for (const cls of gidToClass2.values()) usedClass2.add(cls);
  const class1Remap = /* @__PURE__ */ new Map();
  [...usedClass1].sort((a, b) => a - b).forEach((c, i) => class1Remap.set(c, i));
  const class2Remap = /* @__PURE__ */ new Map();
  [...usedClass2].sort((a, b) => a - b).forEach((c, i) => class2Remap.set(c, i));
  const newClass1Count = class1Remap.size;
  const newClass2Count = class2Remap.size;
  const newC1ToOld = /* @__PURE__ */ new Map();
  for (const [oldC, newC] of class1Remap) newC1ToOld.set(newC, oldC);
  const newC2ToOld = /* @__PURE__ */ new Map();
  for (const [oldC, newC] of class2Remap) newC2ToOld.set(newC, oldC);
  const compactCD1 = /* @__PURE__ */ new Map();
  for (const [gid, cls] of gidToClass1) compactCD1.set(gid, class1Remap.get(cls));
  const compactCD2 = /* @__PURE__ */ new Map();
  for (const [gid, cls] of gidToClass2) compactCD2.set(gid, class2Remap.get(cls));
  const covGids = readCoverageGids(r, subAbs + coverageOff);
  if (!covGids) return false;
  const newCovGids = [];
  for (const g of covGids) {
    const ng = remapGid(g, gidLookup);
    if (ng >= 0) newCovGids.push(ng);
  }
  newCovGids.sort((a, b) => a - b);
  const vr1 = vrCount(valueFormat1);
  const vr2 = vrCount(valueFormat2);
  const class2RecSize = vr1 * 2 + vr2 * 2;
  const subStart = w.length;
  w.writeUint16(2);
  const covSlot = w.length;
  w.writeUint16(0);
  w.writeUint16(valueFormat1);
  w.writeUint16(valueFormat2);
  const cd1Slot = w.length;
  w.writeUint16(0);
  const cd2Slot = w.length;
  w.writeUint16(0);
  w.writeUint16(newClass1Count);
  w.writeUint16(newClass2Count);
  for (let nc1 = 0; nc1 < newClass1Count; nc1++) {
    const oc1 = newC1ToOld.get(nc1);
    for (let nc2 = 0; nc2 < newClass2Count; nc2++) {
      const oc2 = newC2ToOld.get(nc2);
      const recAbs = subAbs + 16 + (oc1 * class2Count + oc2) * class2RecSize;
      if (vr1 > 0 && !writeValueRecord(w, r, recAbs, valueFormat1)) return false;
      if (vr2 > 0 && !writeValueRecord(w, r, recAbs + vr1 * 2, valueFormat2)) return false;
    }
  }
  const cd1Pos = w.length;
  if (!emitClassDefFromClassMap(w, compactCD1)) return false;
  const cd2Pos = w.length;
  if (!emitClassDefFromClassMap(w, compactCD2)) return false;
  const covPos = w.length;
  emitCoverageFromGids(w, newCovGids);
  w.writeInt16At(cd1Slot, cd1Pos - subStart);
  w.writeInt16At(cd2Slot, cd2Pos - subStart);
  w.writeInt16At(covSlot, covPos - subStart);
  return true;
}

// vendor/web-font-subset/gsub-reachable.ts
var LT_SINGLE = 1;
var LT_MULTIPLE = 2;
var LT_ALTERNATE = 3;
var LT_LIGATURE = 4;
var LT_CHAIN = 6;
var LT_EXTENSION2 = 7;
function readCoverageGids2(r, off, cache) {
  const hit = cache.get(off);
  if (hit !== void 0) return hit;
  const dv = r.dv;
  const format = dv.getUint16(off, false);
  const gids = [];
  if (format === 1) {
    const count = dv.getUint16(off + 2, false);
    const base = off + 4;
    const byteOff = dv.byteOffset + base;
    if (count > 8 && (byteOff & 1) === 0) {
      const src16 = new Uint16Array(dv.buffer, byteOff, count);
      for (let i = 0; i < count; i++) {
        const raw = src16[i];
        gids.push((raw & 255) << 8 | raw >> 8);
      }
    } else {
      for (let i = 0; i < count; i++) gids.push(dv.getUint16(base + i * 2, false));
    }
  } else if (format === 2) {
    const rangeCount = dv.getUint16(off + 2, false);
    let p = off + 4;
    for (let i = 0; i < rangeCount; i++) {
      const start = dv.getUint16(p, false);
      const end = dv.getUint16(p + 2, false);
      for (let g = start; g <= end; g++) gids.push(g);
      p += 6;
    }
  }
  cache.set(off, gids);
  return gids;
}
function coverageFirstExcludedGid(r, off, cache, inSubset) {
  const cached = cache.get(off);
  if (cached !== void 0) {
    for (const g of cached) if (!inSubset(g)) return g;
    return -1;
  }
  const dv = r.dv;
  const format = dv.getUint16(off, false);
  if (format === 1) {
    const count = dv.getUint16(off + 2, false);
    const base = off + 4;
    for (let i = 0; i < count; i++) {
      const g = dv.getUint16(base + i * 2, false);
      if (!inSubset(g)) return g;
    }
    return -1;
  } else if (format === 2) {
    const rangeCount = dv.getUint16(off + 2, false);
    let p = off + 4;
    for (let i = 0; i < rangeCount; i++) {
      const start = dv.getUint16(p, false);
      const end = dv.getUint16(p + 2, false);
      for (let g = start; g <= end; g++) {
        if (!inSubset(g)) return g;
      }
      p += 6;
    }
    return -1;
  }
  return -1;
}
function coverageIndexOf(r, off, gid) {
  const dv = r.dv;
  const format = dv.getUint16(off, false);
  if (format === 1) {
    const count = dv.getUint16(off + 2, false);
    const base = off + 4;
    let lo = 0, hi = count;
    while (lo < hi) {
      const mid = lo + hi >> 1;
      const mg = dv.getUint16(base + mid * 2, false);
      if (mg < gid) lo = mid + 1;
      else if (mg > gid) hi = mid;
      else return mid;
    }
    return -1;
  } else if (format === 2) {
    const rangeCount = dv.getUint16(off + 2, false);
    const base = off + 4;
    let lo = 0, hi = rangeCount;
    while (lo < hi) {
      const mid = lo + hi >> 1;
      const end2 = dv.getUint16(base + mid * 6 + 2, false);
      if (end2 < gid) lo = mid + 1;
      else hi = mid;
    }
    if (lo >= rangeCount) return -1;
    const rangeOff = base + lo * 6;
    const start = dv.getUint16(rangeOff, false);
    const end = dv.getUint16(rangeOff + 2, false);
    if (gid < start || gid > end) return -1;
    let prefix = 0;
    for (let i = 0; i < lo; i++) {
      const s = dv.getUint16(base + i * 6, false);
      const e = dv.getUint16(base + i * 6 + 2, false);
      prefix += e - s + 1;
    }
    return prefix + (gid - start);
  }
  return -1;
}
function coverageCount(r, off) {
  const dv = r.dv;
  const format = dv.getUint16(off, false);
  if (format === 1) {
    return dv.getUint16(off + 2, false);
  } else if (format === 2) {
    const rangeCount = dv.getUint16(off + 2, false);
    const base = off + 4;
    let total = 0;
    for (let i = 0; i < rangeCount; i++) {
      const s = dv.getUint16(base + i * 6, false);
      const e = dv.getUint16(base + i * 6 + 2, false);
      total += e - s + 1;
    }
    return total;
  }
  return 0;
}
function collectReachableGsubTargets(gsubBytes, seedGids) {
  const dv = new DataView(gsubBytes.buffer, gsubBytes.byteOffset, gsubBytes.byteLength);
  const r = new OTReader(dv);
  const covCache = /* @__PURE__ */ new Map();
  const major = r.u16(0);
  const minor = r.u16(2);
  if (major !== 1 || minor > 1) return /* @__PURE__ */ new Set();
  const lookupListOff = r.u16(8);
  const lookupCount = r.u16(lookupListOff);
  const lookups = [];
  for (let i = 0; i < lookupCount; i++) {
    const lOff = lookupListOff + dv.getUint16(lookupListOff + 2 + i * 2, false);
    const lookupType = dv.getUint16(lOff, false);
    const subTableCount = dv.getUint16(lOff + 4, false);
    const subtableAbsOffs = [];
    let effectiveType = lookupType;
    for (let j = 0; j < subTableCount; j++) {
      const subOff = lOff + dv.getUint16(lOff + 6 + j * 2, false);
      if (lookupType === LT_EXTENSION2) {
        if (dv.getUint16(subOff, false) !== 1) {
          effectiveType = -1;
          continue;
        }
        effectiveType = dv.getUint16(subOff + 2, false);
        subtableAbsOffs.push(subOff + r.u32(subOff + 4));
      } else {
        subtableAbsOffs.push(subOff);
      }
    }
    lookups.push({ effectiveType, subtableAbsOffs });
  }
  const reachable = new Set(seedGids);
  let changed = true;
  const inSubset = (gid) => reachable.has(gid);
  const refsReuse = /* @__PURE__ */ new Set();
  const ctxGidsReuse = /* @__PURE__ */ new Set();
  const settledChain = /* @__PURE__ */ new Set();
  const failGidMap = /* @__PURE__ */ new Map();
  const failGidBox = { v: -1 };
  while (changed) {
    changed = false;
    for (let i = 0; i < lookupCount; i++) {
      const lk = lookups[i];
      for (const subAbs of lk.subtableAbsOffs) {
        if (lk.effectiveType === LT_CHAIN) {
          if (settledChain.has(subAbs)) continue;
          const knownFail = failGidMap.get(subAbs);
          if (knownFail !== void 0 && !reachable.has(knownFail)) continue;
          {
            let fastFailGid = -1;
            if (subAbs + 6 <= dv.byteLength && dv.getUint16(subAbs, false) === 3) {
              let segCntPos = subAbs + 2;
              let segCnt = dv.getUint16(subAbs + 2, false);
              for (let seg = 0; seg < 3 && fastFailGid < 0; seg++) {
                if (segCnt > 0) {
                  const covOffPos = segCntPos + 2;
                  if (covOffPos + 2 <= dv.byteLength) {
                    const covOff = subAbs + dv.getUint16(covOffPos, false);
                    if (covOff + 6 <= dv.byteLength) {
                      const covFormat = dv.getUint16(covOff, false);
                      const covCount = dv.getUint16(covOff + 2, false);
                      if ((covFormat === 1 || covFormat === 2) && covCount > 0) {
                        const firstGid = dv.getUint16(covOff + 4, false);
                        if (!inSubset(firstGid)) fastFailGid = firstGid;
                      }
                    }
                  }
                }
                const nextSegCntPos = segCntPos + 2 + segCnt * 2;
                if (nextSegCntPos + 2 > dv.byteLength) break;
                segCntPos = nextSegCntPos;
                segCnt = dv.getUint16(segCntPos, false);
              }
            }
            if (fastFailGid >= 0) {
              failGidMap.set(subAbs, fastFailGid);
              continue;
            }
          }
          refsReuse.clear();
          ctxGidsReuse.clear();
          failGidBox.v = -1;
          const stable = collectChainRefs(r, subAbs, refsReuse, ctxGidsReuse, inSubset, covCache, failGidBox);
          for (const g of ctxGidsReuse) {
            if (!reachable.has(g)) {
              reachable.add(g);
              changed = true;
            }
          }
          for (const li of refsReuse) {
            const refLk = lookups[li];
            if (!refLk) continue;
            for (const refSub of refLk.subtableAbsOffs) {
              const refTargets = collectSubtableTargets(r, refSub, refLk.effectiveType, inSubset, covCache, reachable);
              for (const g of refTargets) {
                if (!reachable.has(g)) {
                  reachable.add(g);
                  changed = true;
                }
              }
            }
          }
          if (stable) {
            settledChain.add(subAbs);
            failGidMap.delete(subAbs);
          } else if (failGidBox.v >= 0) {
            failGidMap.set(subAbs, failGidBox.v);
          }
        } else {
          const newTargets = collectSubtableTargets(r, subAbs, lk.effectiveType, inSubset, covCache, reachable);
          for (const g of newTargets) {
            if (!reachable.has(g)) {
              reachable.add(g);
              changed = true;
            }
          }
        }
      }
    }
    if (r.errorFlag) break;
  }
  return reachable;
}
function collectSubtableTargets(r, off, type, inSubset, covCache, reachable) {
  const targets = [];
  const dv = r.dv;
  if (type === LT_SINGLE) {
    const format = r.u16(off);
    const covOff = off + r.u16(off + 2);
    if (format === 1) {
      const delta = r.i16(off + 4);
      if (coverageCount(r, covOff) > reachable.size) {
        for (const g of reachable) {
          if (coverageIndexOf(r, covOff, g) >= 0) targets.push(g + delta & 65535);
        }
      } else {
        const covGids = readCoverageGids2(r, covOff, covCache);
        for (const g of covGids) {
          if (inSubset(g)) targets.push(g + delta & 65535);
        }
      }
    } else if (format === 2) {
      const count = r.u16(off + 4);
      const gidArrBase = off + 6;
      if (coverageCount(r, covOff) > reachable.size) {
        for (const g of reachable) {
          const idx = coverageIndexOf(r, covOff, g);
          if (idx >= 0 && idx < count) targets.push(dv.getUint16(gidArrBase + idx * 2, false));
        }
      } else {
        const covGids = readCoverageGids2(r, covOff, covCache);
        const lim = covGids.length < count ? covGids.length : count;
        for (let i = 0; i < lim; i++) {
          if (inSubset(covGids[i])) targets.push(dv.getUint16(gidArrBase + i * 2, false));
        }
      }
    }
  } else if (type === LT_MULTIPLE) {
    const covOff = off + r.u16(off + 2);
    const seqCount = r.u16(off + 4);
    const covGids = readCoverageGids2(r, covOff, covCache);
    for (let i = 0; i < covGids.length && i < seqCount; i++) {
      if (!inSubset(covGids[i])) continue;
      const seqOff = off + dv.getUint16(off + 6 + i * 2, false);
      const glyphCount = dv.getUint16(seqOff, false);
      for (let k = 0; k < glyphCount; k++) targets.push(dv.getUint16(seqOff + 2 + k * 2, false));
    }
  } else if (type === LT_ALTERNATE) {
    const covOff = off + r.u16(off + 2);
    const altCount = r.u16(off + 4);
    const covGids = readCoverageGids2(r, covOff, covCache);
    const lim = covGids.length < altCount ? covGids.length : altCount;
    if (covGids.length > reachable.size) {
      for (const g of reachable) {
        let lo = 0, hi = lim;
        while (lo < hi) {
          const mid = lo + hi >> 1;
          const mg = covGids[mid];
          if (mg < g) lo = mid + 1;
          else if (mg > g) hi = mid;
          else {
            const altOff = off + dv.getUint16(off + 6 + mid * 2, false);
            const cnt = dv.getUint16(altOff, false);
            for (let k = 0; k < cnt; k++) targets.push(dv.getUint16(altOff + 2 + k * 2, false));
            break;
          }
        }
      }
    } else {
      for (let i = 0; i < lim; i++) {
        if (!inSubset(covGids[i])) continue;
        const altOff = off + dv.getUint16(off + 6 + i * 2, false);
        const cnt = dv.getUint16(altOff, false);
        for (let k = 0; k < cnt; k++) targets.push(dv.getUint16(altOff + 2 + k * 2, false));
      }
    }
  } else if (type === LT_LIGATURE) {
    const covOff = off + r.u16(off + 2);
    const setCount = r.u16(off + 4);
    const covGids = readCoverageGids2(r, covOff, covCache);
    for (let i = 0; i < covGids.length && i < setCount; i++) {
      if (!inSubset(covGids[i])) continue;
      const setOff = off + dv.getUint16(off + 6 + i * 2, false);
      const ligCount = dv.getUint16(setOff, false);
      for (let j = 0; j < ligCount; j++) {
        const ligOff = setOff + dv.getUint16(setOff + 2 + j * 2, false);
        const compCount = dv.getUint16(ligOff, false);
        const target = dv.getUint16(ligOff + 2, false);
        let allIn = true;
        for (let k = 0; k < compCount - 1; k++) {
          if (!inSubset(dv.getUint16(ligOff + 4 + k * 2, false))) {
            allIn = false;
            break;
          }
        }
        if (allIn) targets.push(target);
      }
    }
  }
  return targets;
}
function collectChainRefs(r, off, refs, contextGids, inSubset, covCache, failGid) {
  const format = r.u16(off);
  const dv = r.dv;
  if (format === 1) {
    const covOff = off + r.u16(off + 2);
    const covGids = readCoverageGids2(r, covOff, covCache);
    const setCount = r.u16(off + 4);
    for (let i = 0; i < covGids.length && i < setCount; i++) {
      if (!inSubset(covGids[i])) continue;
      contextGids.add(covGids[i]);
      const setOffRel = dv.getUint16(off + 6 + i * 2, false);
      if (setOffRel === 0) continue;
      const setOff = off + setOffRel;
      const ruleCount = dv.getUint16(setOff, false);
      for (let j = 0; j < ruleCount; j++) {
        const ruleOff = setOff + dv.getUint16(setOff + 2 + j * 2, false);
        collectChainRuleRefs(r, ruleOff, refs, contextGids, inSubset, true);
      }
    }
    return false;
  } else if (format === 2) {
    const classSetCount = r.u16(off + 10);
    for (let i = 0; i < classSetCount; i++) {
      const setOffRel = dv.getUint16(off + 12 + i * 2, false);
      if (setOffRel === 0) continue;
      const setOff = off + setOffRel;
      const ruleCount = dv.getUint16(setOff, false);
      for (let j = 0; j < ruleCount; j++) {
        const ruleOff = setOff + dv.getUint16(setOff + 2 + j * 2, false);
        collectChainRuleRefs(r, ruleOff, refs, contextGids, inSubset, false);
      }
    }
    return true;
  } else if (format === 3) {
    let p = off + 2;
    let triggerable = true;
    for (let seg = 0; seg < 3 && triggerable; seg++) {
      const cnt = r.u16(p);
      p += 2;
      for (let k = 0; k < cnt; k++) {
        const covOff = off + dv.getUint16(p + k * 2, false);
        const covFormat = dv.getUint16(covOff, false);
        const covCount = dv.getUint16(covOff + 2, false);
        if ((covFormat === 1 || covFormat === 2) && covCount > 0) {
          const firstGid = dv.getUint16(covOff + 4, false);
          if (!inSubset(firstGid)) {
            triggerable = false;
            failGid.v = firstGid;
            break;
          }
        }
        const excluded = coverageFirstExcludedGid(r, covOff, covCache, inSubset);
        if (excluded >= 0) {
          triggerable = false;
          failGid.v = excluded;
          break;
        }
      }
      p += cnt * 2;
    }
    if (triggerable) {
      let p2 = off + 2;
      for (let seg = 0; seg < 3; seg++) {
        const cnt = r.u16(p2);
        p2 += 2;
        for (let k = 0; k < cnt; k++) {
          const covGids = readCoverageGids2(r, off + dv.getUint16(p2 + k * 2, false), covCache);
          for (const g of covGids) contextGids.add(g);
        }
        p2 += cnt * 2;
      }
      const substCount = r.u16(p2);
      for (let k = 0; k < substCount; k++) refs.add(dv.getUint16(p2 + 2 + k * 4 + 2, false));
      return true;
    }
    return false;
  }
  return false;
}
function collectChainRuleRefs(r, ruleOff, refs, contextGids, inSubset, isGidFormat) {
  const dv = r.dv;
  let p = ruleOff;
  const backtrackCount = r.u16(p);
  p += 2;
  const backtrackEnd = p + backtrackCount * 2;
  const inputCount = r.u16(backtrackEnd);
  p = backtrackEnd + 2;
  const inputLen = inputCount > 0 ? inputCount - 1 : 0;
  const inputEnd = p + inputLen * 2;
  const lookaheadCount = r.u16(inputEnd);
  p = inputEnd + 2;
  const lookaheadEnd = p + lookaheadCount * 2;
  const substCount = r.u16(lookaheadEnd);
  p = lookaheadEnd + 2;
  if (isGidFormat) {
    let q = ruleOff + 2;
    for (let k = 0; k < backtrackCount; k++) {
      if (!inSubset(dv.getUint16(q + k * 2, false))) return;
    }
    q += backtrackCount * 2 + 2;
    for (let k = 0; k < inputLen; k++) {
      if (!inSubset(dv.getUint16(q + k * 2, false))) return;
    }
    q += inputLen * 2 + 2;
    for (let k = 0; k < lookaheadCount; k++) {
      if (!inSubset(dv.getUint16(q + k * 2, false))) return;
    }
    q = ruleOff + 2;
    for (let k = 0; k < backtrackCount; k++) contextGids.add(dv.getUint16(q + k * 2, false));
    q += backtrackCount * 2 + 2;
    for (let k = 0; k < inputLen; k++) contextGids.add(dv.getUint16(q + k * 2, false));
    q += inputLen * 2 + 2;
    for (let k = 0; k < lookaheadCount; k++) contextGids.add(dv.getUint16(q + k * 2, false));
  }
  for (let k = 0; k < substCount; k++) {
    refs.add(dv.getUint16(p + k * 4 + 2, false));
  }
}

// vendor/web-font-subset/gsub-subset.ts
var LT_SINGLE2 = 1;
var LT_MULTIPLE2 = 2;
var LT_ALTERNATE2 = 3;
var LT_LIGATURE2 = 4;
var LT_CHAIN2 = 6;
var LT_EXTENSION3 = 7;
var COV_LIST = 1;
var COV_RANGE = 2;
function remapGid2(origToNew, gid) {
  const m = origToNew.get(gid);
  return m === void 0 ? null : m;
}
var COVERAGE_MAX_EXPAND = 65536;
var EMPTY_GIDS = [];
var currentSortedSubsetGids = null;
var currentSortedSubsetSource = null;
function getSortedSubsetGids() {
  if (currentSortedSubsetGids === null) {
    currentSortedSubsetGids = currentSortedSubsetSource ? Array.from(currentSortedSubsetSource.keys()).sort((a, b) => a - b) : [];
  }
  return currentSortedSubsetGids;
}
function readCoverageGids3(r, off, cache) {
  if (cache) {
    const hit = cache.get(off);
    if (hit !== void 0 && hit.gids !== EMPTY_GIDS) return hit.gids;
  }
  const dv = r.dv;
  const len = dv.byteLength;
  if (off < 0 || off + 4 > len) {
    if (cache) mergeGidsEntry(cache, off, []);
    return [];
  }
  const format = dv.getUint16(off, false);
  let gids = [];
  if (format === COV_LIST) {
    const count = dv.getUint16(off + 2, false);
    const base = off + 4;
    if (base + count * 2 > len) {
      if (cache) mergeGidsEntry(cache, off, []);
      return [];
    }
    gids = new Array(count);
    for (let i = 0; i < count; i++) gids[i] = dv.getUint16(base + i * 2, false);
  } else if (format === COV_RANGE) {
    const rangeCount = dv.getUint16(off + 2, false);
    let p = off + 4;
    for (let i = 0; i < rangeCount; i++) {
      if (p + 6 > len) break;
      const start = dv.getUint16(p, false);
      const end = dv.getUint16(p + 2, false);
      if (end >= start && end - start < COVERAGE_MAX_EXPAND && gids.length + (end - start + 1) <= COVERAGE_MAX_EXPAND) {
        for (let g = start; g <= end; g++) gids.push(g);
      }
      p += 6;
    }
  }
  if (cache) mergeGidsEntry(cache, off, gids);
  return gids;
}
function mergeGidsEntry(cache, off, gids) {
  const existing = cache.get(off);
  if (existing !== void 0) {
    existing.gids = gids;
  } else {
    cache.set(off, { gids, remapped: null, outOfSubset: false });
  }
}
function readCoverageRemapped(r, off, gidLookup, cache) {
  let entry = cache.get(off);
  if (entry !== void 0) {
    if (entry.gids !== EMPTY_GIDS) {
      const ogids = entry.gids;
      const m = new Array(ogids.length);
      let w2 = 0;
      for (let i = 0; i < ogids.length; i++) {
        const ng = gidLookup[ogids[i]];
        if (ng >= 0) m[w2++] = ng;
      }
      m.length = w2;
      const oos = w2 === 0 && ogids.length > 0;
      entry.remapped = m;
      entry.outOfSubset = oos;
      return oos ? null : m;
    }
    return entry.outOfSubset ? null : entry.remapped;
  }
  const dv = r.dv;
  const len = dv.byteLength;
  let newGids = [];
  let origNonEmpty = false;
  let outOfSubset = false;
  if (off < 0 || off + 4 > len) {
  } else {
    const format = dv.getUint16(off, false);
    if (format === COV_LIST) {
      const count = dv.getUint16(off + 2, false);
      const numGlyphs = gidLookup.length;
      const base = off + 4;
      if (base + count * 2 > len) {
      } else if (count > numGlyphs) {
        origNonEmpty = count > 0;
      } else {
        origNonEmpty = count > 0;
        const buf = new Array(count);
        let w = 0;
        const gidArrByteOff = dv.byteOffset + base;
        if ((gidArrByteOff & 1) === 0) {
          const src16 = new Uint16Array(dv.buffer, gidArrByteOff, count);
          for (let i = 0; i < count; i++) {
            const raw = src16[i];
            const m = gidLookup[(raw & 255) << 8 | raw >> 8];
            if (m >= 0) buf[w++] = m;
          }
        } else {
          for (let i = 0; i < count; i++) {
            const m = gidLookup[dv.getUint16(base + i * 2, false)];
            if (m >= 0) buf[w++] = m;
          }
        }
        buf.length = w;
        newGids = buf;
      }
    } else if (format === COV_RANGE) {
      const rangeCount = dv.getUint16(off + 2, false);
      const numGlyphs = gidLookup.length;
      const subsetGids = getSortedSubsetGids();
      const subsetLen = subsetGids.length;
      let p = off + 4;
      for (let i = 0; i < rangeCount; i++) {
        if (p + 6 > len) break;
        const start = dv.getUint16(p, false);
        const end = dv.getUint16(p + 2, false);
        if (end >= start && end - start < COVERAGE_MAX_EXPAND && newGids.length + (end - start + 1) <= COVERAGE_MAX_EXPAND) {
          if (start >= numGlyphs) {
            origNonEmpty = true;
          } else if (subsetLen > 0) {
            const e = end < numGlyphs ? end : numGlyphs - 1;
            origNonEmpty = true;
            if (!(e < subsetGids[0] || start > subsetGids[subsetLen - 1])) {
              let lo = 0;
              let hi = subsetLen;
              while (lo < hi) {
                const mid = lo + hi >>> 1;
                if (subsetGids[mid] < start) lo = mid + 1;
                else hi = mid;
              }
              for (let j = lo; j < subsetLen; j++) {
                const g = subsetGids[j];
                if (g > e) break;
                newGids.push(gidLookup[g]);
              }
            }
          } else {
            origNonEmpty = true;
          }
        }
        p += 6;
      }
    }
  }
  if (newGids.length === 0 && origNonEmpty) outOfSubset = true;
  if (!outOfSubset && newGids.length > 1) newGids.sort((a, b) => a - b);
  cache.set(off, { gids: EMPTY_GIDS, remapped: newGids, outOfSubset });
  return outOfSubset ? null : newGids;
}
function emitCoverage(w, newGids) {
  const off = w.length;
  const n = newGids.length;
  const rangeStarts = [];
  const rangeEnds = [];
  for (let i = 0; i < n; ) {
    const start = newGids[i];
    let j = i;
    while (j + 1 < n && newGids[j + 1] === newGids[j] + 1) j++;
    rangeStarts.push(start);
    rangeEnds.push(newGids[j]);
    i = j + 1;
  }
  const rangeCount = rangeStarts.length;
  if (rangeCount > 0 && rangeCount * 6 < n * 2) {
    w.writeUint16(COV_RANGE);
    w.writeUint16(rangeCount);
    let covIndex = 0;
    for (let k = 0; k < rangeCount; k++) {
      w.writeUint16(rangeStarts[k]);
      w.writeUint16(rangeEnds[k]);
      w.writeUint16(covIndex);
      covIndex += rangeEnds[k] - rangeStarts[k] + 1;
    }
  } else {
    w.writeUint16(COV_LIST);
    w.writeUint16(n);
    for (let i = 0; i < n; i++) w.writeUint16(newGids[i]);
  }
  return off;
}
function serializeSingleSubst(w, r, off, gidLookup) {
  const dv = r.dv;
  const format = r.u16(off);
  const covOff = off + r.u16(off + 2);
  const entries = [];
  const subsetGids = getSortedSubsetGids();
  const covGidCount = coverageCount(r, covOff);
  const useReverse = covGidCount > subsetGids.length * 4 && covGidCount > 16;
  if (useReverse) {
    if (format === 1) {
      const delta = r.i16(off + 4);
      for (const g of subsetGids) {
        if (coverageIndexOf(r, covOff, g) < 0) continue;
        const fromNew = gidLookup[g];
        const toNew = gidLookup[g + delta & 65535];
        if (fromNew >= 0 && toNew >= 0) entries.push({ from: fromNew, to: toNew });
      }
    } else if (format === 2) {
      for (const g of subsetGids) {
        const idx = coverageIndexOf(r, covOff, g);
        if (idx < 0) continue;
        const fromNew = gidLookup[g];
        const toNew = gidLookup[dv.getUint16(off + 6 + idx * 2, false)];
        if (fromNew >= 0 && toNew >= 0) entries.push({ from: fromNew, to: toNew });
      }
    } else {
      return false;
    }
  } else {
    const covGids = readCoverageGids3(r, covOff);
    if (format === 1) {
      const delta = r.i16(off + 4);
      for (const g of covGids) {
        const fromNew = gidLookup[g];
        const toNew = gidLookup[g + delta & 65535];
        if (fromNew >= 0 && toNew >= 0) entries.push({ from: fromNew, to: toNew });
      }
    } else if (format === 2) {
      const count = r.u16(off + 4);
      for (let i = 0; i < covGids.length && i < count; i++) {
        const fromNew = gidLookup[covGids[i]];
        const toNew = gidLookup[dv.getUint16(off + 6 + i * 2, false)];
        if (fromNew >= 0 && toNew >= 0) entries.push({ from: fromNew, to: toNew });
      }
    } else {
      return false;
    }
  }
  if (entries.length === 0) return false;
  entries.sort((a, b) => a.from - b.from);
  let uniform = true;
  const firstDelta = entries[0].to - entries[0].from & 65535;
  for (const e of entries) {
    if ((e.to - e.from & 65535) !== firstDelta) {
      uniform = false;
      break;
    }
  }
  const subStart = w.length;
  const coveragePosHolder = [0];
  if (uniform) {
    w.writeUint16(1);
    w.reserveOffset16(subStart, () => coveragePosHolder[0]);
    w.writeUint16(firstDelta);
  } else {
    w.writeUint16(2);
    w.reserveOffset16(subStart, () => coveragePosHolder[0]);
    w.writeUint16(entries.length);
    for (const e of entries) w.writeUint16(e.to);
  }
  coveragePosHolder[0] = emitCoverage(w, entries.map((e) => e.from));
  return true;
}
function writeEmptySubtable(w, effectiveType) {
  const format = effectiveType === LT_SINGLE2 ? 2 : 1;
  w.writeUint16(format);
  w.writeUint16(6);
  w.writeUint16(0);
  w.writeUint16(1);
  w.writeUint16(0);
}
function serializeMultipleSubst(w, r, off, gidLookup) {
  const dv = r.dv;
  const covOff = off + r.u16(off + 2);
  const seqCount = r.u16(off + 4);
  const entries = [];
  const subsetGids = getSortedSubsetGids();
  const covGidCount = coverageCount(r, covOff);
  const useReverse = covGidCount > subsetGids.length * 4 && covGidCount > 16;
  if (useReverse) {
    for (const g of subsetGids) {
      const idx = coverageIndexOf(r, covOff, g);
      if (idx < 0 || idx >= seqCount) continue;
      const fromNew = gidLookup[g];
      if (!(fromNew >= 0)) continue;
      const seqOff = off + dv.getUint16(off + 6 + idx * 2, false);
      const glyphCount = dv.getUint16(seqOff, false);
      const newSeq = [];
      for (let k = 0; k < glyphCount; k++) {
        const gg = gidLookup[dv.getUint16(seqOff + 2 + k * 2, false)];
        if (gg >= 0) newSeq.push(gg);
      }
      if (newSeq.length > 0) entries.push({ from: fromNew, seq: newSeq });
    }
  } else {
    const covGids = readCoverageGids3(r, covOff);
    for (let i = 0; i < covGids.length && i < seqCount; i++) {
      const fromNew = gidLookup[covGids[i]];
      if (!(fromNew >= 0)) continue;
      const seqOff = off + dv.getUint16(off + 6 + i * 2, false);
      const glyphCount = dv.getUint16(seqOff, false);
      const newSeq = [];
      for (let k = 0; k < glyphCount; k++) {
        const g = gidLookup[dv.getUint16(seqOff + 2 + k * 2, false)];
        if (g >= 0) newSeq.push(g);
      }
      if (newSeq.length > 0) entries.push({ from: fromNew, seq: newSeq });
    }
  }
  if (entries.length === 0) return false;
  entries.sort((a, b) => a.from - b.from);
  const subStart = w.length;
  const coveragePosHolder = [0];
  const seqOffHolders = entries.map(() => [0]);
  w.writeUint16(1);
  w.reserveOffset16(subStart, () => coveragePosHolder[0]);
  w.writeUint16(entries.length);
  for (const h of seqOffHolders) w.reserveOffset16(subStart, () => h[0]);
  coveragePosHolder[0] = emitCoverage(w, entries.map((e) => e.from));
  for (let i = 0; i < entries.length; i++) {
    seqOffHolders[i][0] = w.length;
    w.writeUint16(entries[i].seq.length);
    for (const g of entries[i].seq) w.writeUint16(g);
  }
  return true;
}
function serializeAlternateSubst(w, r, off, gidLookup) {
  const dv = r.dv;
  const covOff = off + r.u16(off + 2);
  const altCount = r.u16(off + 4);
  const entries = [];
  const subsetGids = getSortedSubsetGids();
  const covGidCount = coverageCount(r, covOff);
  const useReverse = covGidCount > subsetGids.length * 4 && covGidCount > 16;
  if (useReverse) {
    for (const g of subsetGids) {
      const idx = coverageIndexOf(r, covOff, g);
      if (idx < 0 || idx >= altCount) continue;
      const fromNew = gidLookup[g];
      if (!(fromNew >= 0)) continue;
      const altOff = off + dv.getUint16(off + 6 + idx * 2, false);
      const cnt = dv.getUint16(altOff, false);
      const newAlts = [];
      for (let k = 0; k < cnt; k++) {
        const gg = gidLookup[dv.getUint16(altOff + 2 + k * 2, false)];
        if (gg >= 0) newAlts.push(gg);
      }
      if (newAlts.length > 0) entries.push({ from: fromNew, alts: newAlts });
    }
  } else {
    const covGids = readCoverageGids3(r, covOff);
    for (let i = 0; i < covGids.length && i < altCount; i++) {
      const fromNew = gidLookup[covGids[i]];
      if (!(fromNew >= 0)) continue;
      const altOff = off + dv.getUint16(off + 6 + i * 2, false);
      const cnt = dv.getUint16(altOff, false);
      const newAlts = [];
      for (let k = 0; k < cnt; k++) {
        const g = gidLookup[dv.getUint16(altOff + 2 + k * 2, false)];
        if (g >= 0) newAlts.push(g);
      }
      if (newAlts.length > 0) entries.push({ from: fromNew, alts: newAlts });
    }
  }
  if (entries.length === 0) return false;
  entries.sort((a, b) => a.from - b.from);
  const subStart = w.length;
  const coveragePosHolder = [0];
  const altOffHolders = entries.map(() => [0]);
  w.writeUint16(1);
  w.reserveOffset16(subStart, () => coveragePosHolder[0]);
  w.writeUint16(entries.length);
  for (const h of altOffHolders) w.reserveOffset16(subStart, () => h[0]);
  coveragePosHolder[0] = emitCoverage(w, entries.map((e) => e.from));
  for (let i = 0; i < entries.length; i++) {
    altOffHolders[i][0] = w.length;
    w.writeUint16(entries[i].alts.length);
    for (const g of entries[i].alts) w.writeUint16(g);
  }
  return true;
}
function serializeLigatureSubst(w, r, off, gidLookup) {
  const dv = r.dv;
  const covOff = off + r.u16(off + 2);
  const setCount = r.u16(off + 4);
  const entries = [];
  const subsetGids = getSortedSubsetGids();
  const covGidCount = coverageCount(r, covOff);
  const useReverse = covGidCount > subsetGids.length * 4 && covGidCount > 16;
  if (useReverse) {
    for (const g of subsetGids) {
      const idx = coverageIndexOf(r, covOff, g);
      if (idx < 0 || idx >= setCount) continue;
      const fromNew = gidLookup[g];
      if (!(fromNew >= 0)) continue;
      const setOff = off + dv.getUint16(off + 6 + idx * 2, false);
      const ligCount = dv.getUint16(setOff, false);
      const newLigs = [];
      for (let j = 0; j < ligCount; j++) {
        const ligOff = setOff + dv.getUint16(setOff + 2 + j * 2, false);
        const compCount = dv.getUint16(ligOff, false);
        const ligNew = gidLookup[dv.getUint16(ligOff + 2, false)];
        if (ligNew < 0) continue;
        const compNew = [fromNew];
        let ok = true;
        for (let k = 0; k < compCount - 1; k++) {
          const c = gidLookup[dv.getUint16(ligOff + 4 + k * 2, false)];
          if (c < 0) {
            ok = false;
            break;
          }
          compNew.push(c);
        }
        if (ok) newLigs.push({ comp: compNew, lig: ligNew });
      }
      if (newLigs.length > 0) entries.push({ from: fromNew, ligs: newLigs });
    }
  } else {
    const covGids = readCoverageGids3(r, covOff);
    for (let i = 0; i < covGids.length && i < setCount; i++) {
      const fromNew = gidLookup[covGids[i]];
      if (!(fromNew >= 0)) continue;
      const setOff = off + dv.getUint16(off + 6 + i * 2, false);
      const ligCount = dv.getUint16(setOff, false);
      const newLigs = [];
      for (let j = 0; j < ligCount; j++) {
        const ligOff = setOff + dv.getUint16(setOff + 2 + j * 2, false);
        const compCount = dv.getUint16(ligOff, false);
        const ligNew = gidLookup[dv.getUint16(ligOff + 2, false)];
        if (ligNew < 0) continue;
        const compNew = [fromNew];
        let ok = true;
        for (let k = 0; k < compCount - 1; k++) {
          const c = gidLookup[dv.getUint16(ligOff + 4 + k * 2, false)];
          if (c < 0) {
            ok = false;
            break;
          }
          compNew.push(c);
        }
        if (ok) newLigs.push({ comp: compNew, lig: ligNew });
      }
      if (newLigs.length > 0) entries.push({ from: fromNew, ligs: newLigs });
    }
  }
  if (entries.length === 0) return false;
  entries.sort((a, b) => a.from - b.from);
  const subStart = w.length;
  const coveragePosHolder = [0];
  const setOffHolders = entries.map(() => [0]);
  w.writeUint16(1);
  w.reserveOffset16(subStart, () => coveragePosHolder[0]);
  w.writeUint16(entries.length);
  for (const h of setOffHolders) w.reserveOffset16(subStart, () => h[0]);
  coveragePosHolder[0] = emitCoverage(w, entries.map((e) => e.from));
  for (let i = 0; i < entries.length; i++) {
    setOffHolders[i][0] = w.length;
    const ligs = entries[i].ligs;
    w.writeUint16(ligs.length);
    const ligOffHolders = ligs.map(() => [0]);
    for (const h of ligOffHolders) w.reserveOffset16(setOffHolders[i][0], () => h[0]);
    for (let j = 0; j < ligs.length; j++) {
      ligOffHolders[j][0] = w.length;
      w.writeUint16(ligs[j].comp.length);
      w.writeUint16(ligs[j].lig);
      for (let k = 1; k < ligs[j].comp.length; k++) w.writeUint16(ligs[j].comp[k]);
    }
  }
  return true;
}
function readClassDefMap2(r, off, gidLookup) {
  const result = /* @__PURE__ */ new Map();
  if (off === 0) return result;
  const dv = r.dv;
  const format = r.u16(off);
  if (format === 1) {
    const startGid = r.u16(off + 2);
    const count = r.u16(off + 4);
    for (let i = 0; i < count; i++) {
      const origGid = startGid + i;
      const newGid = gidLookup[origGid];
      if (newGid >= 0) result.set(newGid, dv.getUint16(off + 6 + i * 2, false));
    }
  } else if (format === 2) {
    const rangeCount = r.u16(off + 2);
    const subsetGids = getSortedSubsetGids();
    const subsetLen = subsetGids.length;
    if (subsetLen === 0) return result;
    const rangesBase = off + 4;
    const minSubset = subsetGids[0];
    const maxSubset = subsetGids[subsetLen - 1];
    for (let i = 0; i < rangeCount; i++) {
      const p = rangesBase + i * 6;
      const start = dv.getUint16(p, false);
      const end = dv.getUint16(p + 2, false);
      if (end < minSubset || start > maxSubset) continue;
      const cls = dv.getUint16(p + 4, false);
      let lo = 0;
      let hi = subsetLen;
      while (lo < hi) {
        const mid = lo + hi >>> 1;
        if (subsetGids[mid] < start) lo = mid + 1;
        else hi = mid;
      }
      for (let j = lo; j < subsetLen; j++) {
        const g = subsetGids[j];
        if (g > end) break;
        result.set(gidLookup[g], cls);
      }
    }
  }
  return result;
}
function writeClassDefFromMap(w, newGidToClass) {
  const off = w.length;
  if (newGidToClass.size === 0) {
    w.writeUint16(2);
    w.writeUint16(0);
    return off;
  }
  const entries = Array.from(newGidToClass.entries()).sort((a, b) => a[0] - b[0]);
  const ranges = [];
  for (let i = 0; i < entries.length; ) {
    const cls = entries[i][1];
    let j = i;
    while (j + 1 < entries.length && entries[j + 1][0] === entries[j][0] + 1 && entries[j + 1][1] === cls) j++;
    ranges.push({ start: entries[i][0], end: entries[j][0], cls });
    i = j + 1;
  }
  w.writeUint16(2);
  w.writeUint16(ranges.length);
  for (const rg of ranges) {
    w.writeUint16(rg.start);
    w.writeUint16(rg.end);
    w.writeUint16(rg.cls);
  }
  return off;
}
function serializeChainedContextSubst(w, r, off, origToNew, covCache, gidLookup) {
  const format = r.u16(off);
  const dv = r.dv;
  if (format === 1) {
    const covOff = off + r.u16(off + 2);
    const covGids = readCoverageGids3(r, covOff, covCache);
    const ruleSetCount = r.u16(off + 4);
    if (ruleSetCount > 32767) return false;
    const entries = [];
    for (let i = 0; i < covGids.length && i < ruleSetCount; i++) {
      const firstNew = remapGid2(origToNew, covGids[i]);
      if (firstNew === null) continue;
      const setOff = off + dv.getUint16(off + 6 + i * 2, false);
      const ruleCount = dv.getUint16(setOff, false);
      if (ruleCount > 32767) return false;
      const validRules = [];
      for (let j = 0; j < ruleCount; j++) {
        const ruleOff = setOff + dv.getUint16(setOff + 2 + j * 2, false);
        const parsed = parseChainRuleFormat1or2(r, ruleOff, origToNew, true);
        if (parsed) validRules.push(parsed);
      }
      if (validRules.length > 0) entries.push({ firstGid: firstNew, rules: validRules });
    }
    if (entries.length === 0) return false;
    entries.sort((a, b) => a.firstGid - b.firstGid);
    writeChainFormat1(w, entries);
    return true;
  }
  if (format === 2) {
    const coverageOff = off + r.u16(off + 2);
    const backtrackCDOff = off + r.u16(off + 4);
    const inputCDOff = off + r.u16(off + 6);
    const lookaheadCDOff = off + r.u16(off + 8);
    const classSetCount = r.u16(off + 10);
    if (classSetCount > 256) return false;
    const classToRules = /* @__PURE__ */ new Map();
    for (let i = 0; i < classSetCount; i++) {
      const setOffRel = dv.getUint16(off + 12 + i * 2, false);
      if (setOffRel === 0) continue;
      const setOff = off + setOffRel;
      const ruleCount = dv.getUint16(setOff, false);
      if (ruleCount > 32767) return false;
      for (let j = 0; j < ruleCount; j++) {
        const ruleOff = setOff + dv.getUint16(setOff + 2 + j * 2, false);
        const parsed = parseChainRuleFormat1or2(r, ruleOff, origToNew, false);
        if (!parsed) continue;
        const list = classToRules.get(i) ?? [];
        list.push(parsed);
        classToRules.set(i, list);
      }
    }
    if (classToRules.size === 0) return false;
    writeChainFormat2(w, r, coverageOff, backtrackCDOff, inputCDOff, lookaheadCDOff, classToRules, covCache, gidLookup);
    return true;
  }
  if (format === 3) {
    const parsed = parseChainFormat3(r, off, covCache, gidLookup);
    if (!parsed) return false;
    writeChainFormat3(w, parsed);
    return true;
  }
  return false;
}
function parseChainRuleFormat1or2(r, ruleOff, origToNew, isGidFormat) {
  const dv = r.dv;
  const backCount = r.u16(ruleOff);
  if (backCount > 255) return null;
  let p = ruleOff + 2;
  const readSeq = (count) => {
    if (count === 0) return [];
    if (isGidFormat) {
      const out = [];
      for (let k = 0; k < count; k++) {
        const m = remapGid2(origToNew, dv.getUint16(p + k * 2, false));
        if (m === null) return null;
        out.push(m);
      }
      return out;
    }
    const out2 = [];
    for (let k = 0; k < count; k++) out2.push(dv.getUint16(p + k * 2, false));
    return out2;
  };
  const back = readSeq(backCount);
  if (back === null) return null;
  p += backCount * 2;
  const inputCount = r.u16(p);
  if (inputCount === 0 || inputCount > 255) return null;
  p += 2;
  const input = readSeq(inputCount - 1);
  if (input === null) return null;
  p += (inputCount - 1) * 2;
  const lookCount = r.u16(p);
  if (lookCount > 255) return null;
  p += 2;
  const look = readSeq(lookCount);
  if (look === null) return null;
  p += lookCount * 2;
  const seqCount = r.u16(p);
  if (seqCount > 255) return null;
  p += 2;
  const records = [];
  for (let k = 0; k < seqCount; k++) {
    records.push({ seq: dv.getUint16(p + k * 4, false), lookup: dv.getUint16(p + k * 4 + 2, false) });
  }
  return { back, input, look, records };
}
function writeChainFormat1(w, entries) {
  const subStart = w.length;
  const coverageHolder = [0];
  const setOffHolders = entries.map(() => [0]);
  w.writeUint16(1);
  w.reserveOffset16(subStart, () => coverageHolder[0]);
  w.writeUint16(entries.length);
  for (const h of setOffHolders) w.reserveOffset16(subStart, () => h[0]);
  coverageHolder[0] = emitCoverage(w, entries.map((e) => e.firstGid));
  for (let i = 0; i < entries.length; i++) {
    setOffHolders[i][0] = w.length;
    const rules = entries[i].rules;
    w.writeUint16(rules.length);
    const ruleOffHolders = rules.map(() => [0]);
    for (const h of ruleOffHolders) w.reserveOffset16(setOffHolders[i][0], () => h[0]);
    for (let j = 0; j < rules.length; j++) {
      ruleOffHolders[j][0] = w.length;
      writeChainRuleBody(w, rules[j]);
    }
  }
}
function writeChainRuleBody(w, rule) {
  w.writeUint16(rule.back.length);
  for (const g of rule.back) w.writeUint16(g);
  w.writeUint16(rule.input.length + 1);
  for (const g of rule.input) w.writeUint16(g);
  w.writeUint16(rule.look.length);
  for (const g of rule.look) w.writeUint16(g);
  w.writeUint16(rule.records.length);
  for (const rc of rule.records) {
    w.writeUint16(rc.seq);
    w.writeUint16(rc.lookup);
  }
}
function writeChainFormat2(w, r, coverageOff, backtrackCDOff, inputCDOff, lookaheadCDOff, classToRules, covCache, gidLookup) {
  const subStart = w.length;
  const coverageHolder = [0];
  const backHolder = [0];
  const inputHolder = [0];
  const lookHolder = [0];
  w.writeUint16(2);
  w.reserveOffset16(subStart, () => coverageHolder[0]);
  w.reserveOffset16(subStart, () => backHolder[0]);
  w.reserveOffset16(subStart, () => inputHolder[0]);
  w.reserveOffset16(subStart, () => lookHolder[0]);
  let maxClass = -1;
  for (const cls of classToRules.keys()) if (cls > maxClass) maxClass = cls;
  const classSetCount = maxClass + 1;
  w.writeUint16(classSetCount);
  const setOffHolders = [];
  for (let i = 0; i < classSetCount; i++) {
    if (classToRules.has(i)) {
      const h = [0];
      setOffHolders.push(h);
      w.reserveOffset16(subStart, () => h[0]);
    } else {
      setOffHolders.push(null);
      w.writeUint16(0);
    }
  }
  const newCovGids = readCoverageRemapped(r, coverageOff, gidLookup, covCache) ?? [];
  coverageHolder[0] = emitCoverage(w, newCovGids);
  const backMap = readClassDefMap2(r, backtrackCDOff, gidLookup);
  const inputMap = readClassDefMap2(r, inputCDOff, gidLookup);
  const lookMap = readClassDefMap2(r, lookaheadCDOff, gidLookup);
  backHolder[0] = writeClassDefFromMap(w, backMap);
  inputHolder[0] = writeClassDefFromMap(w, inputMap);
  lookHolder[0] = writeClassDefFromMap(w, lookMap);
  for (let i = 0; i < classSetCount; i++) {
    const rules = classToRules.get(i);
    if (!rules) continue;
    setOffHolders[i][0] = w.length;
    w.writeUint16(rules.length);
    const ruleOffHolders = rules.map(() => [0]);
    for (const h of ruleOffHolders) w.reserveOffset16(setOffHolders[i][0], () => h[0]);
    for (let j = 0; j < rules.length; j++) {
      ruleOffHolders[j][0] = w.length;
      writeChainRuleBody(w, rules[j]);
    }
  }
}
function parseChainFormat3(r, off, covCache, gidLookup) {
  const dv = r.dv;
  let p = off + 2;
  const readCovArr = () => {
    const count = r.u16(p);
    p += 2;
    const arr = new Array(count);
    for (let k = 0; k < count; k++) {
      const covOff = off + dv.getUint16(p + k * 2, false);
      const newGids = readCoverageRemapped(r, covOff, gidLookup, covCache);
      if (newGids === null) return null;
      arr[k] = newGids;
    }
    p += count * 2;
    return arr;
  };
  const backCovs = readCovArr();
  const inputCovs = readCovArr();
  const lookCovs = readCovArr();
  if (backCovs === null || inputCovs === null || lookCovs === null) return null;
  const seqCount = r.u16(p);
  p += 2;
  const records = new Array(seqCount);
  for (let k = 0; k < seqCount; k++) {
    records[k] = { seq: dv.getUint16(p + k * 4, false), lookup: dv.getUint16(p + k * 4 + 2, false) };
  }
  return { backCovs, inputCovs, lookCovs, records };
}
function writeChainFormat3(w, parsed) {
  const subStart = w.length;
  const totalCovSlots = parsed.backCovs.length + parsed.inputCovs.length + parsed.lookCovs.length;
  const covSlotPositions = new Array(totalCovSlots);
  let slotIdx = 0;
  const reserveCovSlot = () => {
    covSlotPositions[slotIdx++] = w.length;
    w.writeUint16(0);
  };
  w.writeUint16(3);
  w.writeUint16(parsed.backCovs.length);
  for (let k = 0; k < parsed.backCovs.length; k++) reserveCovSlot();
  w.writeUint16(parsed.inputCovs.length);
  for (let k = 0; k < parsed.inputCovs.length; k++) reserveCovSlot();
  w.writeUint16(parsed.lookCovs.length);
  for (let k = 0; k < parsed.lookCovs.length; k++) reserveCovSlot();
  w.writeUint16(parsed.records.length);
  for (const rc of parsed.records) {
    w.writeUint16(rc.seq);
    w.writeUint16(rc.lookup);
  }
  let posIdx = 0;
  for (const cov of parsed.backCovs) {
    w.writeInt16At(covSlotPositions[posIdx++], emitCoverage(w, cov) - subStart);
  }
  for (const cov of parsed.inputCovs) {
    w.writeInt16At(covSlotPositions[posIdx++], emitCoverage(w, cov) - subStart);
  }
  for (const cov of parsed.lookCovs) {
    w.writeInt16At(covSlotPositions[posIdx++], emitCoverage(w, cov) - subStart);
  }
}
function isSubtableSkipableByCoverage(r, off, type, gidLookup) {
  const dv = r.dv;
  const len = dv.byteLength;
  if (type === LT_CHAIN2) {
    if (off + 2 > len) return false;
    const chainFmt = dv.getUint16(off, false);
    if (chainFmt === 2) return false;
    if (chainFmt === 3) {
      let p = off + 2;
      for (let grp = 0; grp < 3; grp++) {
        if (p + 2 > len) return false;
        const cnt = dv.getUint16(p, false);
        p += 2;
        for (let k = 0; k < cnt; k++) {
          if (p + 2 > len) return false;
          const covOff2 = off + dv.getUint16(p + k * 2, false);
          if (coverageAllOutOfSubset(dv, covOff2, len, gidLookup)) return true;
        }
        p += cnt * 2;
      }
      return false;
    }
  }
  if (off + 4 > len) return false;
  const covOff = off + dv.getUint16(off + 2, false);
  return coverageAllOutOfSubset(dv, covOff, len, gidLookup) === true;
}
function coverageAllOutOfSubset(dv, covOff, len, gidLookup) {
  if (covOff + 4 > len) return false;
  const format = dv.getUint16(covOff, false);
  if (format === COV_LIST) {
    const count = dv.getUint16(covOff + 2, false);
    if (count === 0) return false;
    const base = covOff + 4;
    if (base + count * 2 > len) return false;
    for (let i = 0; i < count; i++) {
      if (gidLookup[dv.getUint16(base + i * 2, false)] >= 0) return false;
    }
    return true;
  }
  if (format === COV_RANGE) {
    const rangeCount = dv.getUint16(covOff + 2, false);
    const sortedGids = getSortedSubsetGids();
    const subsetN = sortedGids.length;
    let p = covOff + 4;
    let origNonEmpty = false;
    for (let i = 0; i < rangeCount; i++) {
      if (p + 6 > len) break;
      const start = dv.getUint16(p, false);
      const end = dv.getUint16(p + 2, false);
      if (end >= start && end - start < COVERAGE_MAX_EXPAND) {
        origNonEmpty = true;
        if (subsetN > 0 && start <= sortedGids[subsetN - 1] && end >= sortedGids[0]) {
          let lo = 0, hi = subsetN;
          while (lo < hi) {
            const mid = lo + hi >>> 1;
            if (sortedGids[mid] < start) lo = mid + 1;
            else hi = mid;
          }
          if (lo < subsetN && sortedGids[lo] <= end) return false;
        }
      }
      p += 6;
    }
    return origNonEmpty;
  }
  return false;
}
function serializeSubtable2(w, r, off, type, origToNew, covCache, gidLookup, preCheckedSkipable) {
  r.clearError();
  if (preCheckedSkipable !== void 0 ? preCheckedSkipable : isSubtableSkipableByCoverage(r, off, type, gidLookup)) return false;
  let ok;
  switch (type) {
    case LT_SINGLE2:
      ok = serializeSingleSubst(w, r, off, gidLookup);
      break;
    case LT_MULTIPLE2:
      ok = serializeMultipleSubst(w, r, off, gidLookup);
      break;
    case LT_ALTERNATE2:
      ok = serializeAlternateSubst(w, r, off, gidLookup);
      break;
    case LT_LIGATURE2:
      ok = serializeLigatureSubst(w, r, off, gidLookup);
      break;
    case LT_CHAIN2:
      ok = serializeChainedContextSubst(w, r, off, origToNew, covCache, gidLookup);
      break;
    default:
      return false;
  }
  if (r.errorFlag) return false;
  return ok;
}
function subsetGSUB(gsubBytes, origToNew) {
  const dv = new DataView(gsubBytes.buffer, gsubBytes.byteOffset, gsubBytes.byteLength);
  const r = new OTReader(dv);
  const covCache = /* @__PURE__ */ new Map();
  let maxOrigGid = 0;
  for (const g of origToNew.keys()) if (g > maxOrigGid) maxOrigGid = g;
  const gidLookup = new Int32Array(maxOrigGid + 1).fill(-1);
  for (const [g, n] of origToNew) gidLookup[g] = n;
  currentSortedSubsetSource = origToNew;
  currentSortedSubsetGids = null;
  const major = dv.getUint16(0, false);
  const minor = dv.getUint16(2, false);
  if (major !== 1 || minor > 1) {
    return gsubBytes;
  }
  const scriptListOff = dv.getUint16(4, false);
  const featureListOff = dv.getUint16(6, false);
  const lookupListOff = dv.getUint16(8, false);
  const lookupCount = dv.getUint16(lookupListOff, false);
  const lookupRelOffs = [];
  for (let i = 0; i < lookupCount; i++) {
    lookupRelOffs.push(dv.getUint16(lookupListOff + 2 + i * 2, false));
  }
  const lookups = [];
  for (let i = 0; i < lookupCount; i++) {
    const lOff = lookupListOff + lookupRelOffs[i];
    const lookupType = dv.getUint16(lOff, false);
    const subTableCount = dv.getUint16(lOff + 4, false);
    const subtableAbsOffs = [];
    let effectiveType = lookupType;
    for (let j = 0; j < subTableCount; j++) {
      const subOff = lOff + dv.getUint16(lOff + 6 + j * 2, false);
      if (lookupType === LT_EXTENSION3) {
        if (dv.getUint16(subOff, false) !== 1) {
          effectiveType = -1;
          continue;
        }
        effectiveType = dv.getUint16(subOff + 2, false);
        subtableAbsOffs.push(subOff + r.u32(subOff + 4));
      } else {
        subtableAbsOffs.push(subOff);
      }
    }
    const supported = effectiveType === LT_SINGLE2 || effectiveType === LT_MULTIPLE2 || effectiveType === LT_ALTERNATE2 || effectiveType === LT_LIGATURE2 || effectiveType === LT_CHAIN2;
    lookups.push({ supported, effectiveType, subtableAbsOffs, origLookupOff: lOff, allEmpty: false, subtableSkipable: [] });
  }
  for (let i = 0; i < lookupCount; i++) {
    const lk = lookups[i];
    if (!lk.supported) continue;
    const subs = lk.subtableAbsOffs;
    const skipable = new Array(subs.length);
    let allEmpty = subs.length > 0;
    for (let j = 0; j < subs.length; j++) {
      const sk = isSubtableSkipableByCoverage(r, subs[j], lk.effectiveType, gidLookup);
      skipable[j] = sk;
      if (!sk) allEmpty = false;
    }
    lk.subtableSkipable = skipable;
    lk.allEmpty = allEmpty;
  }
  const slSpan = scriptListSpan(r, scriptListOff);
  const slContiguous = slSpan >= 0 && scriptListOff + slSpan <= featureListOff;
  const scriptListBytes = slContiguous ? gsubBytes.subarray(scriptListOff, scriptListOff + slSpan) : serializeScriptList(r, scriptListOff);
  const flSpan = featureListSpan(r, featureListOff);
  const flContiguous = flSpan >= 0 && featureListOff + flSpan <= lookupListOff;
  const featureListBytes = flContiguous ? gsubBytes.subarray(featureListOff, featureListOff + flSpan) : serializeFeatureList(r, featureListOff);
  r.clearError();
  if (!scriptListBytes || !featureListBytes) return gsubBytes;
  const w = new OTWriter(gsubBytes.byteLength);
  w.writeUint16(1);
  w.writeUint16(minor);
  const scriptListAbsHolder = [0];
  const featureListAbsHolder = [0];
  const lookupListAbsHolder = [0];
  w.reserveOffset16(0, () => scriptListAbsHolder[0]);
  w.reserveOffset16(0, () => featureListAbsHolder[0]);
  w.reserveOffset16(0, () => lookupListAbsHolder[0]);
  scriptListAbsHolder[0] = w.length;
  w.writeBytes(scriptListBytes);
  featureListAbsHolder[0] = w.length;
  w.writeBytes(featureListBytes);
  lookupListAbsHolder[0] = w.length;
  const lookupListAbs = lookupListAbsHolder[0];
  w.writeUint16(lookupCount);
  const lookupSlotsStart = w.length;
  for (let i = 0; i < lookupCount; i++) {
    w.writeUint16(0);
  }
  const lookupAbsPositions = new Array(lookupCount);
  for (let i = 0; i < lookupCount; i++) {
    lookupAbsPositions[i] = w.length;
    const lk = lookups[i];
    if (lk.supported) {
      const lookupFlag = r.u16(lk.origLookupOff + 2);
      const useMarkFilteringSet = (lookupFlag & 16) !== 0;
      w.writeUint16(lk.effectiveType);
      w.writeUint16(lookupFlag);
      if (lk.allEmpty) {
        w.writeUint16(1);
        const lookupStart = w.length - 6;
        const subtableSlotsStart = w.length;
        w.writeUint16(0);
        if (useMarkFilteringSet) {
          w.writeUint16(r.u16(lk.origLookupOff + 6 + lk.subtableAbsOffs.length * 2));
        }
        const subtablePos = w.length;
        writeEmptySubtable(w, lk.effectiveType);
        w.writeInt16At(subtableSlotsStart, subtablePos - lookupStart);
      } else {
        const keptIdxs = [];
        for (let j = 0; j < lk.subtableSkipable.length; j++) {
          if (!lk.subtableSkipable[j]) keptIdxs.push(j);
        }
        const keptCount = keptIdxs.length;
        w.writeUint16(keptCount);
        const lookupStart = w.length - 6;
        const subtableSlotsStart = w.length;
        for (let j = 0; j < keptCount; j++) {
          w.writeUint16(0);
        }
        if (useMarkFilteringSet) {
          w.writeUint16(r.u16(lk.origLookupOff + 6 + lk.subtableAbsOffs.length * 2));
        }
        for (let j = 0; j < keptCount; j++) {
          const origIdx = keptIdxs[j];
          const before = w.length;
          const ok = serializeSubtable2(w, r, lk.subtableAbsOffs[origIdx], lk.effectiveType, origToNew, covCache, gidLookup, lk.subtableSkipable[origIdx]);
          if (!ok) {
            w.rollback(before);
            writeEmptySubtable(w, lk.effectiveType);
          }
          w.writeInt16At(subtableSlotsStart + j * 2, before - lookupStart);
        }
      }
    } else {
      const lookupFlag = r.u16(lk.origLookupOff + 2);
      const useMarkFilteringSet = (lookupFlag & 16) !== 0;
      w.writeUint16(r.u16(lk.origLookupOff));
      w.writeUint16(lookupFlag);
      w.writeUint16(1);
      const lookupStart = w.length - 6;
      const subtableSlotsStart = w.length;
      w.writeUint16(0);
      if (useMarkFilteringSet) {
        w.writeUint16(r.u16(lk.origLookupOff + 6 + lk.subtableAbsOffs.length * 2));
      }
      const subtablePos = w.length;
      writeEmptySubtable(w, lk.effectiveType);
      w.writeInt16At(subtableSlotsStart, subtablePos - lookupStart);
    }
    w.writeInt16At(lookupSlotsStart + i * 2, lookupAbsPositions[i] - lookupListAbs);
  }
  w.flush();
  return w.toUint8Array();
}

// vendor/web-font-subset/gsub-probe.ts
function readTableEntry(dv, tag) {
  if (dv.byteLength < 12) return null;
  const numTables = dv.getUint16(4, false);
  if (numTables <= 0 || numTables > 100) return null;
  let off = 12;
  for (let i = 0; i < numTables; i++) {
    const recOff = off + i * 16;
    if (recOff + 16 > dv.byteLength) return null;
    const t0 = dv.getUint8(recOff);
    const t1 = dv.getUint8(recOff + 1);
    const t2 = dv.getUint8(recOff + 2);
    const t3 = dv.getUint8(recOff + 3);
    if (t0 === tag.charCodeAt(0) && t1 === tag.charCodeAt(1) && t2 === tag.charCodeAt(2) && t3 === tag.charCodeAt(3)) {
      return { offset: dv.getUint32(recOff + 8, false), length: dv.getUint32(recOff + 12, false) };
    }
  }
  return null;
}
function lookupFormat4(dv, subOff, unicode) {
  if (unicode > 65535) return -1;
  const segCountX2 = dv.getUint16(subOff + 6, false);
  const segCount = segCountX2 >>> 1;
  const endCodeBase = subOff + 14;
  const startCodeBase = endCodeBase + segCount * 2 + 2;
  const idDeltaBase = startCodeBase + segCount * 2;
  const idRangeOffsetBase = idDeltaBase + segCount * 2;
  const lo = 0;
  let hi = segCount - 1;
  let l = lo, h = hi;
  while (l <= h) {
    const mid = l + h >> 1;
    const start = dv.getUint16(startCodeBase + mid * 2, false);
    const end = dv.getUint16(endCodeBase + mid * 2, false);
    if (unicode < start) {
      h = mid - 1;
    } else if (unicode > end) {
      l = mid + 1;
    } else {
      const idDelta = dv.getInt16(idDeltaBase + mid * 2, false);
      const idRangeOffset = dv.getUint16(idRangeOffsetBase + mid * 2, false);
      if (idRangeOffset === 0) {
        return unicode + idDelta & 65535;
      }
      const glyphOff = idRangeOffsetBase + mid * 2 + idRangeOffset + (unicode - start) * 2;
      if (glyphOff + 2 > dv.byteLength) return 0;
      const glyphId = dv.getUint16(glyphOff, false);
      if (glyphId === 0) return 0;
      return glyphId + idDelta & 65535;
    }
  }
  return -1;
}
function lookupFormat12(dv, subOff, unicode) {
  const nGroups = dv.getUint32(subOff + 12, false);
  const groupsBase = subOff + 16;
  let l = 0, h = nGroups - 1;
  while (l <= h) {
    const mid = l + h >> 1;
    const gOff = groupsBase + mid * 12;
    const gStart = dv.getUint32(gOff, false);
    const gEnd = dv.getUint32(gOff + 4, false);
    if (unicode < gStart) {
      h = mid - 1;
    } else if (unicode > gEnd) {
      l = mid + 1;
    } else {
      return dv.getUint32(gOff + 8, false) + (unicode - gStart);
    }
  }
  return -1;
}
function selectCmapSubtables(dv, cmapOff) {
  const numberSubtables = dv.getUint16(cmapOff + 2, false);
  let fmt4Off = -1;
  let fmt12Off = -1;
  let dirOff = cmapOff + 4;
  for (let i = 0; i < numberSubtables; i++) {
    const platformID = dv.getUint16(dirOff, false);
    const encodingID = dv.getUint16(dirOff + 2, false);
    const subRelOff = dv.getUint32(dirOff + 4, false);
    const subOff = cmapOff + subRelOff;
    if (subOff + 2 <= dv.byteLength) {
      const format = dv.getUint16(subOff, false);
      if (format === 12 && platformID === 3 && encodingID === 10 && fmt12Off < 0) {
        fmt12Off = subOff;
      } else if (format === 4 && platformID === 3 && encodingID === 1 && fmt4Off < 0) {
        fmt4Off = subOff;
      }
    }
    dirOff += 8;
  }
  return { fmt4Off, fmt12Off };
}
function probeGsubAndCmap(fontBuffer, codePoints, sourceType) {
  if (sourceType === "otf") return { ok: false, needsFallback: false };
  const dv = new DataView(fontBuffer);
  const gsubEntry = readTableEntry(dv, "GSUB");
  if (gsubEntry === null) return { ok: false, needsFallback: false };
  const gsubBytes = new Uint8Array(fontBuffer, gsubEntry.offset, gsubEntry.length);
  const cmapEntry = readTableEntry(dv, "cmap");
  if (cmapEntry === null) return { ok: false, needsFallback: true };
  const { fmt4Off, fmt12Off } = selectCmapSubtables(dv, cmapEntry.offset);
  if (fmt4Off < 0 && fmt12Off < 0) return { ok: false, needsFallback: true };
  const gidMap = /* @__PURE__ */ new Map();
  for (const cp of codePoints) {
    if (gidMap.has(cp)) continue;
    let gid = -1;
    if (cp < 65536 && fmt4Off >= 0) {
      gid = lookupFormat4(dv, fmt4Off, cp);
    }
    if (gid < 0 && fmt12Off >= 0) {
      gid = lookupFormat12(dv, fmt12Off, cp);
    }
    if (gid >= 0) gidMap.set(cp, gid);
  }
  return {
    ok: true,
    gsubBytes,
    lookup: {
      get(cp) {
        const g = gidMap.get(cp);
        return g === void 0 ? void 0 : g;
      }
    }
  };
}

// vendor/web-font-subset/cff-subset.ts
function readIndex(b, pos) {
  const count = b[pos] << 8 | b[pos + 1];
  if (count === 0) return { start: pos, count: 0, offSize: 0, offsets: [], dataStart: pos + 2, end: pos + 2 };
  const offSize = b[pos + 2];
  let op = pos + 3;
  const offsets = new Array(count + 1);
  for (let i = 0; i <= count; i++) {
    let v = 0;
    for (let j = 0; j < offSize; j++) v = v << 8 | b[op++];
    offsets[i] = v;
  }
  const dataStart = op;
  return { start: pos, count, offSize, offsets, dataStart, end: dataStart + offsets[count] - 1 };
}
function readIndexHeader(b, pos) {
  const count = b[pos] << 8 | b[pos + 1];
  if (count === 0) return { start: pos, count: 0, offSize: 0, offBase: pos + 2, dataStart: pos + 2, end: pos + 2 };
  const offSize = b[pos + 2];
  const offBase = pos + 3;
  const dataStart = offBase + (count + 1) * offSize;
  let lastOff = 0;
  let op = offBase + count * offSize;
  for (let j = 0; j < offSize; j++) lastOff = lastOff << 8 | b[op++];
  return { start: pos, count, offSize, offBase, dataStart, end: dataStart + lastOff - 1 };
}
function readIndexOffset(b, h, i) {
  let v = 0;
  let op = h.offBase + i * h.offSize;
  for (let j = 0; j < h.offSize; j++) v = v << 8 | b[op++];
  return v;
}
function indexByteRange(b, pos) {
  const count = b[pos] << 8 | b[pos + 1];
  if (count === 0) return { start: pos, end: pos + 2 };
  const offSize = b[pos + 2];
  const dataStart = pos + 3 + (count + 1) * offSize;
  let lastOff = 0;
  const lp = pos + 3 + count * offSize;
  for (let j = 0; j < offSize; j++) lastOff = lastOff << 8 | b[lp + j];
  return { start: pos, end: dataStart + lastOff - 1 };
}
function parseDict(b, start, end) {
  const dict = /* @__PURE__ */ new Map();
  const operands = [];
  let p = start;
  while (p < end) {
    const b0 = b[p++];
    if (b0 <= 21) {
      let op = b0;
      if (b0 === 12) op = 12 << 8 | b[p++];
      dict.set(op, operands.splice(0, operands.length));
    } else if (b0 === 28) {
      operands.push((b[p] << 24 | b[p + 1] << 16) >> 16);
      p += 2;
    } else if (b0 === 29) {
      operands.push(b[p] << 24 | b[p + 1] << 16 | b[p + 2] << 8 | b[p + 3] | 0);
      p += 4;
    } else if (b0 >= 32 && b0 <= 246) {
      operands.push(b0 - 139);
    } else if (b0 >= 247 && b0 <= 250) {
      operands.push((b0 - 247) * 256 + b[p] + 108);
      p += 1;
    } else if (b0 >= 251 && b0 <= 254) {
      operands.push(-(b0 - 251) * 256 - b[p] - 108);
      p += 1;
    }
  }
  return dict;
}
function encodeDictInt(v) {
  if (v >= -107 && v <= 107) return [v + 139];
  if (v >= 108 && v <= 1131) {
    const v0 = v - 108;
    return [247 + (v0 >> 8), v0 & 255];
  }
  if (v >= -1131 && v <= -108) {
    const v0 = -v - 108;
    return [251 + (v0 >> 8), v0 & 255];
  }
  if (v >= -32768 && v <= 32767) return [28, v >> 8 & 255, v & 255];
  return [29, v >>> 24 & 255, v >> 16 & 255, v >> 8 & 255, v & 255];
}
var T2_CALLSUBR = 10;
var T2_ENDCHAR = 14;
var T2_HSTEM = 1;
var T2_VSTEM = 3;
var T2_HSTEMHM = 18;
var T2_VSTEMHM = 23;
var T2_HINTMASK = 19;
var T2_CNTRMASK = 20;
var T2_CALLGSUBR = 29;
function subrBias(nSubrs) {
  if (nSubrs < 1240) return 107;
  if (nSubrs < 33900) return 1131;
  return 32768;
}
function collectSubrRefs(b, start, end, localBias, localCount, localRefs, gsubrRefs) {
  let p = start;
  let stackLen = 0;
  let lastVal = NaN;
  let stemCount = 0;
  let hasSubr = false;
  while (p < end) {
    const b0 = b[p++];
    if (b0 >= 32) {
      if (b0 <= 246) {
        lastVal = b0 - 139;
        stackLen++;
      } else if (b0 === 255) {
        lastVal = NaN;
        stackLen++;
        p += 4;
      } else if (b0 <= 250) {
        lastVal = (b0 - 247) * 256 + b[p] + 108;
        stackLen++;
        p += 1;
      } else {
        lastVal = -(b0 - 251) * 256 - b[p] - 108;
        stackLen++;
        p += 1;
      }
    } else if (b0 === 28) {
      lastVal = (b[p] << 24 | b[p + 1] << 16) >> 16;
      stackLen++;
      p += 2;
    } else if (b0 === 29) {
      lastVal = b[p] << 24 | b[p + 1] << 16 | b[p + 2] << 8 | b[p + 3] | 0;
      stackLen++;
      p += 4;
    } else {
      if (b0 === 12) {
        p += 1;
        stackLen = 0;
      } else if (b0 === T2_HSTEM || b0 === T2_VSTEM || b0 === T2_HSTEMHM || b0 === T2_VSTEMHM) {
        stemCount += stackLen >> 1;
        stackLen = 0;
      } else if (b0 === T2_HINTMASK || b0 === T2_CNTRMASK) {
        p += stemCount + 7 >>> 3;
        stackLen = 0;
      } else if (b0 === T2_CALLSUBR) {
        hasSubr = true;
        if (Number.isInteger(lastVal)) {
          const sn = lastVal + localBias;
          if (sn >= 0 && sn < localCount) localRefs.add(sn);
        }
        stackLen = 0;
      } else if (b0 === T2_CALLGSUBR) {
        if (Number.isInteger(lastVal)) gsubrRefs.add(lastVal);
        stackLen = 0;
      } else if (b0 === T2_ENDCHAR) {
        break;
      } else {
        stackLen = 0;
      }
    }
  }
  return hasSubr;
}
function rewriteCharstring(b, start, end, localBias, localRemap, newLocalCount) {
  const newLocalBias = subrBias(newLocalCount);
  const cap = (end - start << 1) + 16;
  const out = new Uint8Array(cap);
  let wp = 0;
  let stackLen = 0;
  let lastVal = NaN;
  let lastStart = 0;
  let stemCount = 0;
  let p = start;
  while (p < end) {
    const b0 = b[p++];
    if (b0 >= 32) {
      if (b0 <= 246) {
        lastStart = wp;
        lastVal = b0 - 139;
        out[wp++] = b0;
        stackLen++;
      } else if (b0 === 255) {
        lastStart = wp;
        lastVal = NaN;
        out[wp] = 255;
        out[wp + 1] = b[p];
        out[wp + 2] = b[p + 1];
        out[wp + 3] = b[p + 2];
        out[wp + 4] = b[p + 3];
        wp += 5;
        p += 4;
        stackLen++;
      } else if (b0 <= 250) {
        lastStart = wp;
        lastVal = (b0 - 247) * 256 + b[p] + 108;
        out[wp] = b0;
        out[wp + 1] = b[p];
        wp += 2;
        p += 1;
        stackLen++;
      } else {
        lastStart = wp;
        lastVal = -(b0 - 251) * 256 - b[p] - 108;
        out[wp] = b0;
        out[wp + 1] = b[p];
        wp += 2;
        p += 1;
        stackLen++;
      }
    } else if (b0 === 28) {
      lastStart = wp;
      lastVal = (b[p] << 24 | b[p + 1] << 16) >> 16;
      out[wp] = 28;
      out[wp + 1] = b[p];
      out[wp + 2] = b[p + 1];
      wp += 3;
      p += 2;
      stackLen++;
    } else if (b0 === 29) {
      lastStart = wp;
      lastVal = b[p] << 24 | b[p + 1] << 16 | b[p + 2] << 8 | b[p + 3] | 0;
      out[wp] = 29;
      out[wp + 1] = b[p];
      out[wp + 2] = b[p + 1];
      out[wp + 3] = b[p + 2];
      out[wp + 4] = b[p + 3];
      wp += 5;
      p += 4;
      stackLen++;
    } else {
      if (b0 === 12) {
        out[wp] = 12;
        out[wp + 1] = b[p];
        wp += 2;
        p += 1;
        stackLen = 0;
      } else if (b0 === T2_HSTEM || b0 === T2_VSTEM || b0 === T2_HSTEMHM || b0 === T2_VSTEMHM) {
        stemCount += stackLen >> 1;
        out[wp++] = b0;
        stackLen = 0;
      } else if (b0 === T2_HINTMASK || b0 === T2_CNTRMASK) {
        out[wp++] = b0;
        const maskBytes = stemCount + 7 >>> 3;
        out.set(b.subarray(p, p + maskBytes), wp);
        wp += maskBytes;
        p += maskBytes;
        stackLen = 0;
      } else if (b0 === T2_CALLSUBR) {
        const oldSn = Number.isInteger(lastVal) ? lastVal + localBias : -1;
        const newSn = localRemap.get(oldSn);
        if (newSn === void 0) {
          out[wp++] = T2_CALLSUBR;
        } else {
          wp = lastStart;
          const delta = newSn - newLocalBias;
          if (delta >= -107 && delta <= 107) {
            out[wp++] = delta + 139;
          } else if (delta >= 108 && delta <= 1131) {
            const v0 = delta - 108;
            out[wp] = 247 + (v0 >> 8);
            out[wp + 1] = v0 & 255;
            wp += 2;
          } else if (delta >= -1131 && delta <= -108) {
            const v0 = -delta - 108;
            out[wp] = 251 + (v0 >> 8);
            out[wp + 1] = v0 & 255;
            wp += 2;
          } else if (delta >= -32768 && delta <= 32767) {
            out[wp] = 28;
            out[wp + 1] = delta >> 8 & 255;
            out[wp + 2] = delta & 255;
            wp += 3;
          } else {
            out[wp] = 29;
            out[wp + 1] = delta >>> 24 & 255;
            out[wp + 2] = delta >> 16 & 255;
            out[wp + 3] = delta >> 8 & 255;
            out[wp + 4] = delta & 255;
            wp += 5;
          }
          out[wp++] = T2_CALLSUBR;
        }
        stackLen = 0;
      } else if (b0 === T2_CALLGSUBR) {
        out[wp++] = T2_CALLGSUBR;
        stackLen = 0;
      } else if (b0 === T2_ENDCHAR) {
        out[wp++] = b0;
        break;
      } else {
        out[wp++] = b0;
        stackLen = 0;
      }
    }
  }
  return out.subarray(0, wp);
}
function writeIndex(objects) {
  const count = objects.length;
  if (count === 0) return new Uint8Array(2);
  let totalData = 0;
  for (const o of objects) totalData += o.len;
  const maxOffset = totalData + 1;
  let offSize = 1;
  if (maxOffset > 65535) offSize = 4;
  else if (maxOffset > 255) offSize = 2;
  let tmp = maxOffset;
  while (tmp > 255 && offSize < 4) {
    offSize++;
    tmp >>>= 8;
  }
  const offsetsSize = (count + 1) * offSize;
  const totalSize = 2 + 1 + offsetsSize + totalData;
  const out = new Uint8Array(totalSize);
  out[0] = count >> 8 & 255;
  out[1] = count & 255;
  out[2] = offSize;
  let op = 3;
  let acc = 1;
  const writeOffset = (v) => {
    for (let s = (offSize - 1) * 8; s >= 0; s -= 8) out[op++] = v >>> s & 255;
  };
  writeOffset(acc);
  for (const o of objects) {
    acc += o.len;
    writeOffset(acc);
  }
  let dp = 3 + offsetsSize;
  for (const o of objects) {
    out.set(o.bytes.subarray(o.start, o.start + o.len), dp);
    dp += o.len;
  }
  return out;
}
var OP_charset = 15;
var OP_charStrings = 17;
var OP_Private = 18;
var OP_LocalSubr = 19;
var OP_FDArray = 12 << 8 | 36;
var OP_FDSelect = 12 << 8 | 37;
var OP_ROS = 12 << 8 | 30;
function lookupFDSelect(b, fdSelectOff, gid) {
  const fmt = b[fdSelectOff];
  if (fmt === 0) return b[fdSelectOff + 1 + gid];
  const nRanges = b[fdSelectOff + 1] << 8 | b[fdSelectOff + 2];
  const rangesStart = fdSelectOff + 3;
  let lo = 0;
  let hi = nRanges - 1;
  while (lo < hi) {
    const mid = lo + hi + 1 >> 1;
    const first = b[rangesStart + mid * 3] << 8 | b[rangesStart + mid * 3 + 1];
    if (first <= gid) lo = mid;
    else hi = mid - 1;
  }
  return b[rangesStart + lo * 3 + 2];
}
function encodeFDSelect(gidToFd) {
  let singleFd = gidToFd.length > 0 ? gidToFd[0] : 0;
  let isSingle = gidToFd.length > 0;
  for (const fd of gidToFd) {
    if (fd !== singleFd) {
      isSingle = false;
      break;
    }
  }
  if (isSingle) {
    const out2 = new Uint8Array(1 + gidToFd.length);
    out2[0] = 0;
    for (let i = 0; i < gidToFd.length; i++) out2[1 + i] = gidToFd[i];
    return out2;
  }
  const ranges = [];
  let curFirst = 0;
  let curFd = gidToFd[0];
  for (let i = 1; i < gidToFd.length; i++) {
    if (gidToFd[i] !== curFd) {
      ranges.push({ first: curFirst, fd: curFd });
      curFirst = i;
      curFd = gidToFd[i];
    }
  }
  ranges.push({ first: curFirst, fd: curFd });
  const nRanges = ranges.length;
  const out = new Uint8Array(3 + nRanges * 3 + 2);
  out[0] = 3;
  out[1] = nRanges >> 8 & 255;
  out[2] = nRanges & 255;
  let p = 3;
  for (const r of ranges) {
    out[p] = r.first >> 8 & 255;
    out[p + 1] = r.first & 255;
    out[p + 2] = r.fd;
    p += 3;
  }
  const sentinel = gidToFd.length;
  out[p] = sentinel >> 8 & 255;
  out[p + 1] = sentinel & 255;
  return out;
}
function subsetCFF(cffBytes, subsetGids) {
  const b = cffBytes;
  const hdrSize = b[2];
  const nameRange = indexByteRange(b, hdrSize);
  const topDictIndex = readIndex(b, nameRange.end);
  if (topDictIndex.count < 1) return null;
  const topDictDataStart = topDictIndex.dataStart + topDictIndex.offsets[0] - 1;
  const topDictDataEnd = topDictIndex.dataStart + topDictIndex.offsets[1] - 1;
  const topDict = parseDict(b, topDictDataStart, topDictDataEnd);
  if (!topDict.has(OP_ROS)) return null;
  const stringRange = indexByteRange(b, topDictIndex.end);
  const globalSubrRange = indexByteRange(b, stringRange.end);
  const charStringsOff = topDict.get(OP_charStrings)?.[0];
  const charsetOff = topDict.get(OP_charset)?.[0];
  const fdArrayOff = topDict.get(OP_FDArray)?.[0];
  const fdSelectOff = topDict.get(OP_FDSelect)?.[0];
  if (charStringsOff === void 0 || charsetOff === void 0 || fdArrayOff === void 0 || fdSelectOff === void 0) {
    return null;
  }
  const csCount = b[charStringsOff] << 8 | b[charStringsOff + 1];
  const csOffSize = b[charStringsOff + 2];
  const csOffArrStart = charStringsOff + 3;
  const csDataStart = csOffArrStart + (csCount + 1) * csOffSize;
  if (subsetGids.length === 0) return null;
  const newSubsetGids = subsetGids[0] === 0 ? subsetGids : [0, ...subsetGids];
  const newSubsetNumGlyphs = newSubsetGids.length;
  const charStringRanges = new Array(newSubsetNumGlyphs);
  for (let gi = 0; gi < newSubsetNumGlyphs; gi++) {
    const gid = newSubsetGids[gi];
    let o0 = 0;
    let o1 = 0;
    const p0 = csOffArrStart + gid * csOffSize;
    const p1 = csOffArrStart + (gid + 1) * csOffSize;
    for (let j = 0; j < csOffSize; j++) o0 = o0 << 8 | b[p0 + j];
    for (let j = 0; j < csOffSize; j++) o1 = o1 << 8 | b[p1 + j];
    charStringRanges[gi] = { start: csDataStart + o0 - 1, end: csDataStart + o1 - 1 };
  }
  const gidHasSubr = new Uint8Array(newSubsetNumGlyphs);
  const newCharsetBody = [];
  for (let i = 1; i < newSubsetNumGlyphs; i++) {
    newCharsetBody.push(lookupCharsetCID(b, charsetOff, newSubsetGids[i]));
  }
  const newCharset = encodeCharsetFormat0(newCharsetBody);
  const fdRemap = /* @__PURE__ */ new Map();
  const usedFds = [];
  const gidOrigFds = new Array(newSubsetNumGlyphs);
  for (let i = 0; i < newSubsetNumGlyphs; i++) {
    const gid = newSubsetGids[i];
    const fd = lookupFDSelect(b, fdSelectOff, gid);
    gidOrigFds[i] = fd;
    if (!fdRemap.has(fd)) {
      fdRemap.set(fd, usedFds.length);
      usedFds.push(fd);
    }
  }
  const fdArrayIndex = readIndex(b, fdArrayOff);
  const privSegCache = /* @__PURE__ */ new Map();
  const privLocalRefs = /* @__PURE__ */ new Map();
  const dummyGsubrRefs = /* @__PURE__ */ new Set();
  const fdInfos = [];
  for (const fd of usedFds) {
    const s = fdArrayIndex.dataStart + fdArrayIndex.offsets[fd] - 1;
    const e = fdArrayIndex.dataStart + fdArrayIndex.offsets[fd + 1] - 1;
    const dictBytes = b.subarray(s, e);
    const fdDict = parseDict(b, s, e);
    const priv = fdDict.get(OP_Private);
    if (!priv || priv.length < 2) {
      fdInfos.push({ dictBytes, priv: { origOff: -1, len: 0, localSubr: null, localSubrIdx: null, localBias: 0, localRemap: null, newLocalCount: 0, newLocalSubr: null } });
      continue;
    }
    const privLen = priv[0];
    const privOrigOff = priv[1];
    let info = privSegCache.get(privOrigOff);
    if (!info) {
      const privDict = parseDict(b, privOrigOff, privOrigOff + privLen);
      const subrRel = privDict.get(OP_LocalSubr)?.[0];
      let localSubr = null;
      let localSubrIdx = null;
      let localBias = 0;
      if (subrRel !== void 0) {
        const subrAbs = privOrigOff + subrRel;
        localSubrIdx = readIndexHeader(b, subrAbs);
        localBias = subrBias(localSubrIdx.count);
        localSubr = b.subarray(localSubrIdx.start, localSubrIdx.end);
      }
      info = { origOff: privOrigOff, len: privLen, localSubr, localSubrIdx, localBias, localRemap: null, newLocalCount: localSubrIdx ? localSubrIdx.count : 0, newLocalSubr: localSubr };
      privSegCache.set(privOrigOff, info);
      privLocalRefs.set(privOrigOff, /* @__PURE__ */ new Set());
    }
    fdInfos.push({ dictBytes, priv: info });
    const refs = privLocalRefs.get(info.origOff);
    if (info.localSubrIdx) {
      const idx = info.localSubrIdx;
      for (let i = 0; i < newSubsetNumGlyphs; i++) {
        if (gidOrigFds[i] !== fd) continue;
        const r = charStringRanges[i];
        if (collectSubrRefs(b, r.start, r.end, info.localBias, idx.count, refs, dummyGsubrRefs)) {
          gidHasSubr[i] = 1;
        }
      }
    }
  }
  if (privLocalRefs.size > 0) {
    let changed = true;
    let guard = 0;
    while (changed && guard < 64) {
      changed = false;
      guard++;
      for (const [privOrigOff, refs] of privLocalRefs) {
        const info = privSegCache.get(privOrigOff);
        const idx = info.localSubrIdx;
        if (!idx) continue;
        const before = refs.size;
        for (const sn of [...refs]) {
          const ss = idx.dataStart + readIndexOffset(b, idx, sn) - 1;
          const se = idx.dataStart + readIndexOffset(b, idx, sn + 1) - 1;
          collectSubrRefs(b, ss, se, info.localBias, idx.count, refs, dummyGsubrRefs);
        }
        if (refs.size > before) changed = true;
      }
    }
  }
  for (const [privOrigOff, refs] of privLocalRefs) {
    const info = privSegCache.get(privOrigOff);
    const idx = info.localSubrIdx;
    if (!idx) continue;
    const sortedRefs = [...refs].sort((a, c) => a - c);
    const remap = /* @__PURE__ */ new Map();
    for (let i = 0; i < sortedRefs.length; i++) remap.set(sortedRefs[i], i);
    info.localRemap = remap;
    info.newLocalCount = sortedRefs.length;
    if (sortedRefs.length === 0) {
      info.newLocalSubr = new Uint8Array(2);
    } else {
      const objects = [];
      for (const oldSn of sortedRefs) {
        const ss = idx.dataStart + readIndexOffset(b, idx, oldSn) - 1;
        const se = idx.dataStart + readIndexOffset(b, idx, oldSn + 1) - 1;
        const rewritten = rewriteCharstring(b, ss, se, info.localBias, remap, sortedRefs.length);
        objects.push({ bytes: rewritten, start: 0, len: rewritten.length });
      }
      info.newLocalSubr = writeIndex(objects);
    }
  }
  const newCharStringObjects = [];
  for (let gi = 0; gi < newSubsetNumGlyphs; gi++) {
    const r = charStringRanges[gi];
    const origFd = gidOrigFds[gi];
    const fdIdx = fdRemap.get(origFd);
    const privInfo = fdIdx !== void 0 ? fdInfos[fdIdx].priv : null;
    if (privInfo && privInfo.localRemap && gidHasSubr[gi]) {
      const rewritten = rewriteCharstring(b, r.start, r.end, privInfo.localBias, privInfo.localRemap, privInfo.newLocalCount);
      newCharStringObjects.push({ bytes: rewritten, start: 0, len: rewritten.length });
    } else {
      newCharStringObjects.push({ bytes: b, start: r.start, len: r.end - r.start });
    }
  }
  const newCharStrings = writeIndex(newCharStringObjects);
  const newGidToFd = new Array(newSubsetNumGlyphs);
  for (let i = 0; i < newSubsetNumGlyphs; i++) {
    newGidToFd[i] = fdRemap.get(gidOrigFds[i]) ?? 0;
  }
  const newFdSelectBody = encodeFDSelect(newGidToFd);
  const headerNameBytes = combineBytes([b.subarray(0, hdrSize), b.subarray(nameRange.start, nameRange.end)]);
  const stringSeg = b.subarray(stringRange.start, stringRange.end);
  const globalSubrSeg = b.subarray(globalSubrRange.start, globalSubrRange.end);
  const topDictBytes = b.subarray(topDictDataStart, topDictDataEnd);
  const charsetSeg = newCharset;
  const charStringsSeg = newCharStrings;
  const fdSelectSeg = newFdSelectBody;
  let topDictLen = topDictDataEnd - topDictDataStart;
  let fdArrayTotalLen = 0;
  const uniquePrivInfos = [];
  const privOrigToUniqueIdx = /* @__PURE__ */ new Map();
  for (const info of fdInfos) {
    if (info.priv.origOff >= 0 && !privOrigToUniqueIdx.has(info.priv.origOff)) {
      privOrigToUniqueIdx.set(info.priv.origOff, uniquePrivInfos.length);
      uniquePrivInfos.push(info.priv);
    }
  }
  let patchedPrivSegs = [];
  let privSegsTotalLen = 0;
  let patchedTopDict = topDictBytes;
  let newFdArrayBytes = new Uint8Array(0);
  for (let iter = 0; iter < 8; iter++) {
    const curPatchedPriv = [];
    for (const pi of uniquePrivInfos) {
      const patchedPriv = patchPrivateDict(b, pi.origOff, pi.len, pi.newLocalSubr !== null);
      curPatchedPriv.push({ dict: patchedPriv, subr: pi.newLocalSubr });
    }
    let curPrivTotal = 0;
    for (const pp of curPatchedPriv) {
      curPrivTotal += pp.dict.length;
      if (pp.subr) curPrivTotal += pp.subr.length;
    }
    const tdOffSize = patchedTopDictOffSize(topDictLen + 1);
    const tdIdxTotalLen = 2 + 1 + 2 * tdOffSize + topDictLen;
    const stringOff = headerNameBytes.length + tdIdxTotalLen;
    const gsubrOff = stringOff + stringSeg.length;
    const charsetOff2 = gsubrOff + globalSubrSeg.length;
    const charStringsOff2 = charsetOff2 + charsetSeg.length;
    const fdArrayOff2 = charStringsOff2 + charStringsSeg.length;
    const fdSelectOff2 = fdArrayOff2 + fdArrayTotalLen;
    const privateOff = fdSelectOff2 + fdSelectSeg.length;
    let pAcc = privateOff;
    const origToNewPrivOff = /* @__PURE__ */ new Map();
    for (const [origOff, uid] of privOrigToUniqueIdx) {
      origToNewPrivOff.set(origOff, pAcc);
      pAcc += curPatchedPriv[uid].dict.length;
      if (curPatchedPriv[uid].subr) pAcc += curPatchedPriv[uid].subr.length;
    }
    const patchedFdObjects = [];
    for (const info of fdInfos) {
      if (info.priv.origOff < 0) {
        patchedFdObjects.push({ bytes: info.dictBytes, start: 0, len: info.dictBytes.length });
      } else {
        const uid = privOrigToUniqueIdx.get(info.priv.origOff);
        const newPrivOff = origToNewPrivOff.get(info.priv.origOff);
        const newPrivLen = curPatchedPriv[uid].dict.length;
        const patched = patchFdDictPrivate(info.dictBytes, newPrivLen, newPrivOff);
        patchedFdObjects.push({ bytes: patched, start: 0, len: patched.length });
      }
    }
    const candidateFdArray = writeIndex(patchedFdObjects);
    const candidateTopDict = replaceDictOffsets(topDictBytes, /* @__PURE__ */ new Map([
      [OP_charset, charsetOff2],
      [OP_charStrings, charStringsOff2],
      [OP_FDArray, fdArrayOff2],
      [OP_FDSelect, fdSelectOff2]
    ]));
    const tdConverged = candidateTopDict.length === topDictLen;
    const fdConverged = candidateFdArray.length === fdArrayTotalLen;
    const privConverged = curPrivTotal === privSegsTotalLen;
    patchedTopDict = candidateTopDict;
    newFdArrayBytes = candidateFdArray;
    patchedPrivSegs = curPatchedPriv;
    topDictLen = candidateTopDict.length;
    fdArrayTotalLen = candidateFdArray.length;
    privSegsTotalLen = curPrivTotal;
    if (tdConverged && fdConverged && privConverged) break;
  }
  const newTopDictIndex = writeIndex([{ bytes: patchedTopDict, start: 0, len: patchedTopDict.length }]);
  const privParts = [];
  for (const pp of patchedPrivSegs) {
    privParts.push(pp.dict);
    if (pp.subr) privParts.push(pp.subr);
  }
  const newPrivateSeg = combineBytes(privParts);
  return combineBytes([headerNameBytes, newTopDictIndex, stringSeg, globalSubrSeg, charsetSeg, charStringsSeg, newFdArrayBytes, fdSelectSeg, newPrivateSeg]);
}
function patchedTopDictOffSize(maxOffset) {
  if (maxOffset > 65535) return 4;
  if (maxOffset > 255) return 2;
  return 1;
}
function patchFdDictPrivate(dictBytes, privLen, newPrivOff) {
  const chunks = [];
  let p = 0;
  let operandStart = 0;
  const len = dictBytes.length;
  while (p < len) {
    const b0 = dictBytes[p++];
    if (b0 <= 21) {
      let op = b0;
      if (b0 === 12) op = 12 << 8 | dictBytes[p++];
      if (op === OP_Private) {
        const enc1 = encodeDictInt(privLen);
        const enc2 = encodeDictInt(newPrivOff);
        const combined = new Uint8Array(enc1.length + enc2.length + 1);
        combined.set(enc1, 0);
        combined.set(enc2, enc1.length);
        combined[enc1.length + enc2.length] = 18;
        chunks.push(combined);
      } else {
        chunks.push(dictBytes.subarray(operandStart, p));
      }
      operandStart = p;
    } else if (b0 === 28) {
      p += 2;
    } else if (b0 === 29) {
      p += 4;
    } else if (b0 >= 247 && b0 <= 254) {
      p += 1;
    }
  }
  return combineBytes(chunks);
}
function patchPrivateDict(b, privOrigOff, privLen, hasSubr) {
  if (!hasSubr) return b.subarray(privOrigOff, privOrigOff + privLen);
  let cur = b.subarray(privOrigOff, privOrigOff + privLen);
  for (let iter = 0; iter < 4; iter++) {
    const patched = replaceDictOffsets(cur, /* @__PURE__ */ new Map([[OP_LocalSubr, cur.length]]));
    if (patched.length === cur.length) return patched;
    cur = patched;
  }
  return cur;
}
function combineBytes(parts) {
  let total = 0;
  for (const p of parts) total += p.length;
  const out = new Uint8Array(total);
  let off = 0;
  for (const p of parts) {
    out.set(p, off);
    off += p.length;
  }
  return out;
}
function lookupCharsetCID(b, charsetOff, gid) {
  if (gid === 0) return 0;
  const fmt = b[charsetOff];
  if (fmt === 0) {
    const o = charsetOff + 1 + (gid - 1) * 2;
    return b[o] << 8 | b[o + 1];
  }
  let p = charsetOff + 1;
  let rangeFirstGid = 1;
  if (fmt === 1) {
    for (; ; ) {
      const firstCID = b[p] << 8 | b[p + 1];
      const nLeft = b[p + 2];
      if (gid >= rangeFirstGid && gid <= rangeFirstGid + nLeft) return firstCID + (gid - rangeFirstGid);
      rangeFirstGid += nLeft + 1;
      p += 3;
    }
  }
  for (; ; ) {
    const firstCID = b[p] << 8 | b[p + 1];
    const nLeft = b[p + 2] << 8 | b[p + 3];
    if (gid >= rangeFirstGid && gid <= rangeFirstGid + nLeft) return firstCID + (gid - rangeFirstGid);
    rangeFirstGid += nLeft + 1;
    p += 4;
  }
}
function encodeCharsetFormat0(cids) {
  const out = new Uint8Array(1 + cids.length * 2);
  out[0] = 0;
  for (let i = 0; i < cids.length; i++) {
    out[1 + i * 2] = cids[i] >> 8 & 255;
    out[1 + i * 2 + 1] = cids[i] & 255;
  }
  return out;
}
function replaceDictOffsets(dictBytes, replacements) {
  const cap = dictBytes.length + replacements.size * 4 + 16;
  const out = new Uint8Array(cap);
  let wp = 0;
  let p = 0;
  let operandStart = 0;
  const len = dictBytes.length;
  while (p < len) {
    const b0 = dictBytes[p++];
    if (b0 <= 21) {
      let op = b0;
      if (b0 === 12) op = 12 << 8 | dictBytes[p++];
      if (replacements.has(op)) {
        const newVal = replacements.get(op);
        if (newVal >= -107 && newVal <= 107) {
          out[wp++] = newVal + 139;
        } else if (newVal >= 108 && newVal <= 1131) {
          const v0 = newVal - 108;
          out[wp] = 247 + (v0 >> 8);
          out[wp + 1] = v0 & 255;
          wp += 2;
        } else if (newVal >= -1131 && newVal <= -108) {
          const v0 = -newVal - 108;
          out[wp] = 251 + (v0 >> 8);
          out[wp + 1] = v0 & 255;
          wp += 2;
        } else if (newVal >= -32768 && newVal <= 32767) {
          out[wp] = 28;
          out[wp + 1] = newVal >> 8 & 255;
          out[wp + 2] = newVal & 255;
          wp += 3;
        } else {
          out[wp] = 29;
          out[wp + 1] = newVal >>> 24 & 255;
          out[wp + 2] = newVal >> 16 & 255;
          out[wp + 3] = newVal >> 8 & 255;
          out[wp + 4] = newVal & 255;
          wp += 5;
        }
        if (op >= 256) {
          out[wp] = 12;
          out[wp + 1] = op & 255;
          wp += 2;
        } else {
          out[wp++] = op;
        }
      } else {
        out.set(dictBytes.subarray(operandStart, p), wp);
        wp += p - operandStart;
      }
      operandStart = p;
    } else if (b0 === 28) {
      p += 2;
    } else if (b0 === 29) {
      p += 4;
    } else if (b0 === 30) {
      while (p < len) {
        const byte = dictBytes[p++];
        if (byte >> 4 === 15 || (byte & 15) === 15) break;
      }
    } else if (b0 >= 247 && b0 <= 254) {
      p += 1;
    }
  }
  return out.subarray(0, wp);
}

// vendor/web-font-subset/otf-subset.ts
function readSfntTables(dv) {
  const numTables = dv.getUint16(4, false);
  const tables = [];
  for (let i = 0; i < numTables; i++) {
    const off = 12 + i * 16;
    const tag = String.fromCharCode(dv.getUint8(off), dv.getUint8(off + 1), dv.getUint8(off + 2), dv.getUint8(off + 3));
    tables.push({ tag, offset: dv.getUint32(off + 8, false), length: dv.getUint32(off + 12, false) });
  }
  return tables;
}
function findTable(tables, tag) {
  for (const t of tables) if (t.tag === tag) return t;
  return void 0;
}
function lookupFormat42(dv, fmt4Off, unicode) {
  const segCountX2 = dv.getUint16(fmt4Off + 6, false);
  const segCount = segCountX2 >>> 1;
  const endCodeBase = fmt4Off + 14;
  const startCodeBase = endCodeBase + segCount * 2 + 2;
  const idDeltaBase = startCodeBase + segCount * 2;
  const idRangeOffsetBase = idDeltaBase + segCount * 2;
  let lo = 0;
  let hi = segCount - 1;
  while (lo <= hi) {
    const mid = lo + hi >> 1;
    const start = dv.getUint16(startCodeBase + mid * 2, false);
    const end = dv.getUint16(endCodeBase + mid * 2, false);
    if (unicode < start) {
      hi = mid - 1;
    } else if (unicode > end) {
      lo = mid + 1;
    } else {
      const idDelta = dv.getInt16(idDeltaBase + mid * 2, false);
      const idRangeOffset = dv.getUint16(idRangeOffsetBase + mid * 2, false);
      if (idRangeOffset === 0) return unicode + idDelta & 65535 & 65535;
      const idRangeOffsetAddr = idRangeOffsetBase + mid * 2;
      const gidAddr = idRangeOffsetAddr + idRangeOffset + (unicode - start) * 2;
      const gid = dv.getUint16(gidAddr, false);
      if (gid === 0) return 0;
      return gid + idDelta & 65535;
    }
  }
  return 0;
}
function lookupFormat122(dv, fmt12Off, unicode) {
  const numGroups = dv.getUint32(fmt12Off + 12, false);
  let lo = 0;
  let hi = numGroups - 1;
  while (lo <= hi) {
    const mid = lo + hi >> 1;
    const gOff = fmt12Off + 16 + mid * 12;
    const start = dv.getUint32(gOff, false);
    const end = dv.getUint32(gOff + 4, false);
    if (unicode < start) {
      hi = mid - 1;
    } else if (unicode > end) {
      lo = mid + 1;
    } else {
      const startGlyphID = dv.getUint32(gOff + 8, false);
      return startGlyphID + (unicode - start);
    }
  }
  return 0;
}
function selectCmapSubtables2(dv, cmapOff) {
  const numSub = dv.getUint16(cmapOff + 2, false);
  let fmt4Off = -1;
  let fmt12Off = -1;
  for (let i = 0; i < numSub; i++) {
    const r = cmapOff + 4 + i * 8;
    const pid = dv.getUint16(r, false);
    const eid = dv.getUint16(r + 2, false);
    const suboff = cmapOff + dv.getUint32(r + 4, false);
    const fmt = dv.getUint16(suboff, false);
    if (pid === 3 && eid === 10 && fmt === 12 && fmt12Off < 0) fmt12Off = suboff;
    else if (pid === 3 && eid === 1 && fmt === 4 && fmt4Off < 0) fmt4Off = suboff;
    else if (pid === 0 && fmt === 12 && fmt12Off < 0) fmt12Off = suboff;
    else if (pid === 0 && fmt === 4 && fmt4Off < 0) fmt4Off = suboff;
  }
  return { fmt4Off, fmt12Off };
}
function buildSubsetGids(dv, cmapOff, codePoints) {
  const { fmt4Off, fmt12Off } = selectCmapSubtables2(dv, cmapOff);
  const subsetGids = [0];
  const gidToNewGid = /* @__PURE__ */ new Map([[0, 0]]);
  const cpToNewGid = /* @__PURE__ */ new Map();
  for (const cp of codePoints) {
    if (cpToNewGid.has(cp)) continue;
    let gid = 0;
    if (cp < 65536 && fmt4Off >= 0) gid = lookupFormat42(dv, fmt4Off, cp);
    if (gid === 0 && fmt12Off >= 0) gid = lookupFormat122(dv, fmt12Off, cp);
    if (gid === 0) continue;
    let newGid = gidToNewGid.get(gid);
    if (newGid === void 0) {
      newGid = subsetGids.length;
      subsetGids.push(gid);
      gidToNewGid.set(gid, newGid);
    }
    cpToNewGid.set(cp, newGid);
  }
  return { subsetGids, cpToNewGid };
}
function buildSubsetCmap(cpToNewGid) {
  const entries = [];
  for (const [cp, gid] of cpToNewGid) {
    if (cp < 65536 && cp > 0) entries.push({ cp, gid });
  }
  entries.sort((a, b2) => a.cp - b2.cp);
  const segs = [];
  for (const e of entries) {
    const last = segs[segs.length - 1];
    if (last && e.cp === last.end + 1 && e.gid - e.cp === last.delta << 16 >> 16) {
      last.end = e.cp;
    } else {
      segs.push({ start: e.cp, end: e.cp, delta: e.gid - e.cp & 65535 });
    }
  }
  segs.push({ start: 65535, end: 65535, delta: 1 });
  const segCount = segs.length;
  const segCountX2 = segCount * 2;
  const searchRange = (1 << 31 - Math.clz32(segCount)) * 2;
  const entrySelector = 31 - Math.clz32(segCount);
  const rangeShift = segCountX2 - searchRange;
  const bodySize = 14 + segCount * 8 + 2;
  const headerSize = 4 + 8;
  const fmt4Length = bodySize;
  const out = new Uint8Array(headerSize + fmt4Length);
  const dv = new DataView(out.buffer);
  dv.setUint16(0, 0, false);
  dv.setUint16(2, 1, false);
  dv.setUint16(4, 3, false);
  dv.setUint16(6, 1, false);
  dv.setUint32(8, 12, false);
  const b = 12;
  dv.setUint16(b, 4, false);
  dv.setUint16(b + 2, fmt4Length, false);
  dv.setUint16(b + 4, 0, false);
  dv.setUint16(b + 6, segCountX2, false);
  dv.setUint16(b + 8, searchRange, false);
  dv.setUint16(b + 10, entrySelector, false);
  dv.setUint16(b + 12, rangeShift, false);
  const endCodeBase = b + 14;
  for (let i = 0; i < segCount; i++) dv.setUint16(endCodeBase + i * 2, segs[i].end, false);
  dv.setUint16(endCodeBase + segCount * 2, 0, false);
  const startCodeBase = endCodeBase + segCount * 2 + 2;
  for (let i = 0; i < segCount; i++) dv.setUint16(startCodeBase + i * 2, segs[i].start, false);
  const idDeltaBase = startCodeBase + segCount * 2;
  for (let i = 0; i < segCount; i++) dv.setInt16(idDeltaBase + i * 2, segs[i].delta << 16 >> 16, false);
  const idRangeOffsetBase = idDeltaBase + segCount * 2;
  for (let i = 0; i < segCount; i++) dv.setUint16(idRangeOffsetBase + i * 2, 0, false);
  return out;
}
function buildSubsetMetrics(srcDv, metricsOff, numberOfHMetrics, subsetGids) {
  const lastAdv = numberOfHMetrics > 0 ? srcDv.getUint16(metricsOff + (numberOfHMetrics - 1) * 4, false) : 0;
  const advs = new Array(subsetGids.length);
  const lsbs = new Array(subsetGids.length);
  for (let i = 0; i < subsetGids.length; i++) {
    const gid = subsetGids[i];
    if (gid < numberOfHMetrics) {
      advs[i] = srcDv.getUint16(metricsOff + gid * 4, false);
      lsbs[i] = srcDv.getInt16(metricsOff + gid * 4 + 2, false);
    } else {
      advs[i] = lastAdv;
      const lsbArrOff = metricsOff + numberOfHMetrics * 4;
      lsbs[i] = srcDv.getInt16(lsbArrOff + (gid - numberOfHMetrics) * 2, false);
    }
  }
  let numLongMetrics = advs.length;
  if (advs.length > 1) {
    const tailAdv = advs[advs.length - 1];
    for (let i = advs.length - 1; i >= 1; i--) {
      if (advs[i] !== tailAdv) {
        numLongMetrics = i + 1;
        break;
      }
      numLongMetrics = i;
    }
  }
  const out = new Uint8Array(numLongMetrics * 4 + (advs.length - numLongMetrics) * 2);
  const dv = new DataView(out.buffer);
  let off = 0;
  for (let i = 0; i < advs.length; i++) {
    if (i < numLongMetrics) {
      dv.setUint16(off, advs[i], false);
      dv.setInt16(off + 2, lsbs[i], false);
      off += 4;
    } else {
      dv.setInt16(off, lsbs[i], false);
      off += 2;
    }
  }
  return { bytes: out, numberOfHMetrics: numLongMetrics };
}
function buildSubsetMaxp(subsetCount) {
  const out = new Uint8Array(6);
  const dv = new DataView(out.buffer);
  dv.setUint32(0, 20480, false);
  dv.setUint16(4, subsetCount, false);
  return out;
}
function buildSubsetPost() {
  const out = new Uint8Array(32);
  const dv = new DataView(out.buffer);
  dv.setUint32(0, 196608, false);
  return out;
}
function buildSubsetOS2(srcDv, off, len, codePoints) {
  const out = new Uint8Array(srcDv.buffer, srcDv.byteOffset + off, len).slice();
  const dv = new DataView(out.buffer);
  let minCp = 65535;
  let maxCp = 0;
  for (const cp of codePoints) {
    if (cp > 0 && cp < 65536) {
      if (cp < minCp) minCp = cp;
      if (cp > maxCp) maxCp = cp;
    }
  }
  if (minCp > maxCp) {
    minCp = 0;
    maxCp = 65535;
  }
  dv.setUint16(64, minCp, false);
  dv.setUint16(66, maxCp, false);
  return out;
}
function buildSubsetName(srcDv, nameOff) {
  const count = srcDv.getUint16(nameOff + 2, false);
  const stringOff = nameOff + srcDv.getUint16(nameOff + 4, false);
  const KEEP = /* @__PURE__ */ new Set([1, 2, 4, 6, 16, 17]);
  const records = [];
  const seenNameId = /* @__PURE__ */ new Set();
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < count; i++) {
      const r = nameOff + 6 + i * 12;
      const platformID = srcDv.getUint16(r, false);
      const encodingID = srcDv.getUint16(r + 2, false);
      const languageID = srcDv.getUint16(r + 4, false);
      const nameID = srcDv.getUint16(r + 6, false);
      if (!KEEP.has(nameID)) continue;
      const isWin = platformID === 3 && encodingID === 1;
      if (pass === 0 && !isWin) continue;
      if (pass === 1 && seenNameId.has(nameID)) continue;
      if (pass === 0 && seenNameId.has(nameID)) continue;
      const length = srcDv.getUint16(r + 8, false);
      const offset = srcDv.getUint16(r + 10, false);
      records.push({ platformID, encodingID, languageID, nameID, bytes: new Uint8Array(srcDv.buffer, srcDv.byteOffset + stringOff + offset, length) });
      seenNameId.add(nameID);
    }
  }
  const headerSize = 6 + records.length * 12;
  let stringSize = 0;
  for (const rec of records) stringSize += rec.bytes.length;
  const out = new Uint8Array(headerSize + stringSize);
  const dv = new DataView(out.buffer);
  dv.setUint16(0, 0, false);
  dv.setUint16(2, records.length, false);
  dv.setUint16(4, headerSize, false);
  let strAcc = 0;
  for (let i = 0; i < records.length; i++) {
    const rec = records[i];
    const r = 6 + i * 12;
    dv.setUint16(r, rec.platformID, false);
    dv.setUint16(r + 2, rec.encodingID, false);
    dv.setUint16(r + 4, rec.languageID, false);
    dv.setUint16(r + 6, rec.nameID, false);
    dv.setUint16(r + 8, rec.bytes.length, false);
    dv.setUint16(r + 10, strAcc, false);
    out.set(rec.bytes, headerSize + strAcc);
    strAcc += rec.bytes.length;
  }
  return out;
}
function passthroughHead(srcDv, off, len) {
  const out = new Uint8Array(srcDv.buffer, srcDv.byteOffset + off, len).slice();
  const dv = new DataView(out.buffer);
  dv.setUint32(8, 0, false);
  return out;
}
function calcTableChecksum(bytes) {
  const n = bytes.length;
  const dv = new DataView(bytes.buffer, bytes.byteOffset, n);
  const fullQuads = n >>> 2;
  let sum = 0;
  for (let i = 0; i < fullQuads; i++) sum = sum + dv.getUint32(i * 4, false) >>> 0;
  const tail = n & 3;
  if (tail) {
    const base = fullQuads * 4;
    let last = 0;
    for (let j = 0; j < tail; j++) last = last << 8 | bytes[base + j];
    last = last << (4 - tail) * 8 >>> 0;
    sum = sum + last >>> 0;
  }
  return sum >>> 0;
}
function assembleSfnt(tables, skipCheckSum) {
  tables.sort((a, b) => a.tag < b.tag ? -1 : a.tag > b.tag ? 1 : 0);
  const numTables = tables.length;
  const entrySelector = numTables > 0 ? 31 - Math.clz32(numTables) : 0;
  const searchRange = (1 << entrySelector) * 16;
  const rangeShift = numTables * 16 - searchRange;
  const dirSize = 12 + numTables * 16;
  const paddedLens = tables.map((t) => t.bytes.length + 3 & ~3);
  let dataTotal = 0;
  for (const pl of paddedLens) dataTotal += pl;
  const out = new Uint8Array(dirSize + dataTotal);
  const dv = new DataView(out.buffer);
  out[0] = 79;
  out[1] = 84;
  out[2] = 84;
  out[3] = 79;
  dv.setUint16(4, numTables, false);
  dv.setUint16(6, searchRange, false);
  dv.setUint16(8, entrySelector, false);
  dv.setUint16(10, rangeShift, false);
  let dataOff = dirSize;
  const headIdx = tables.findIndex((t) => t.tag === "head");
  let tablesDataSum = 0;
  for (let i = 0; i < numTables; i++) {
    const r = 12 + i * 16;
    out[r] = tables[i].tag.charCodeAt(0);
    out[r + 1] = tables[i].tag.charCodeAt(1);
    out[r + 2] = tables[i].tag.charCodeAt(2);
    out[r + 3] = tables[i].tag.charCodeAt(3);
    if (skipCheckSum) {
      dv.setUint32(r + 8, dataOff, false);
      dv.setUint32(r + 12, tables[i].bytes.length, false);
    } else {
      const checksum = calcTableChecksum(tables[i].bytes);
      tablesDataSum = tablesDataSum + checksum >>> 0;
      dv.setUint32(r + 4, checksum, false);
      dv.setUint32(r + 8, dataOff, false);
      dv.setUint32(r + 12, tables[i].bytes.length, false);
    }
    out.set(tables[i].bytes, dataOff);
    dataOff += paddedLens[i];
  }
  if (!skipCheckSum && headIdx >= 0) {
    const headRecOff = 12 + headIdx * 16;
    const headDataOff = dv.getUint32(headRecOff + 8, false);
    let dirSum = 0;
    for (let i = 0; i < dirSize; i += 4) {
      dirSum = dirSum + (out[i] << 24 | out[i + 1] << 16 | out[i + 2] << 8 | out[i + 3]) >>> 0;
    }
    const wholeSum = dirSum + tablesDataSum >>> 0;
    const adjustment = 2981146554 - wholeSum >>> 0;
    dv.setUint32(headDataOff + 8, adjustment, false);
  }
  return out;
}
function subsetOTF(fontBuffer, codePoints, keepGSUB, outType) {
  const dv = new DataView(fontBuffer.buffer, fontBuffer.byteOffset, fontBuffer.byteLength);
  const tables = readSfntTables(dv);
  const cff = findTable(tables, "CFF ");
  const cmap = findTable(tables, "cmap");
  const hmtx = findTable(tables, "hmtx");
  const hhea = findTable(tables, "hhea");
  const head = findTable(tables, "head");
  const maxp = findTable(tables, "maxp");
  if (!cff || !cmap || !hmtx || !hhea || !head || !maxp) return null;
  const { subsetGids, cpToNewGid } = buildSubsetGids(dv, cmap.offset, codePoints);
  const gsub = keepGSUB ? findTable(tables, "GSUB") : void 0;
  const gpos = keepGSUB ? findTable(tables, "GPOS") : void 0;
  if (gsub) {
    const gsubBytes = new Uint8Array(dv.buffer, dv.byteOffset + gsub.offset, gsub.length);
    const seed = new Set(subsetGids);
    const reachable = collectReachableGsubTargets(gsubBytes, seed);
    if (reachable.size > 0) {
      for (const gid of reachable) {
        if (gid > 0 && !seed.has(gid)) {
          seed.add(gid);
          subsetGids.push(gid);
        }
      }
    }
  }
  const cffBytes = new Uint8Array(fontBuffer.buffer, fontBuffer.byteOffset + cff.offset, cff.length);
  const newCFF = subsetCFF(cffBytes, subsetGids);
  if (!newCFF) return null;
  const newCmap = buildSubsetCmap(cpToNewGid);
  const numberOfHMetrics = dv.getUint16(hhea.offset + 34, false);
  const hmtxResult = buildSubsetMetrics(dv, hmtx.offset, numberOfHMetrics, subsetGids);
  const outTables = [];
  outTables.push({ tag: "CFF ", bytes: newCFF });
  outTables.push({ tag: "cmap", bytes: newCmap });
  outTables.push({ tag: "hmtx", bytes: hmtxResult.bytes });
  outTables.push({ tag: "maxp", bytes: buildSubsetMaxp(subsetGids.length) });
  outTables.push({ tag: "post", bytes: buildSubsetPost() });
  outTables.push({ tag: "head", bytes: passthroughHead(dv, head.offset, head.length) });
  {
    const hheaBytes = new Uint8Array(dv.buffer, dv.byteOffset + hhea.offset, hhea.length).slice();
    const hheaDv = new DataView(hheaBytes.buffer);
    hheaDv.setUint16(34, hmtxResult.numberOfHMetrics, false);
    outTables.push({ tag: "hhea", bytes: hheaBytes });
  }
  const os2 = findTable(tables, "OS/2");
  if (os2) outTables.push({ tag: "OS/2", bytes: buildSubsetOS2(dv, os2.offset, os2.length, codePoints) });
  const name = findTable(tables, "name");
  if (name) outTables.push({ tag: "name", bytes: buildSubsetName(dv, name.offset) });
  const vhea = findTable(tables, "vhea");
  const vmtx = findTable(tables, "vmtx");
  if (vhea && vmtx) {
    const numOfLongVerMetrics = dv.getUint16(vhea.offset + 34, false);
    const vmtxResult = buildSubsetMetrics(dv, vmtx.offset, numOfLongVerMetrics, subsetGids);
    outTables.push({ tag: "vmtx", bytes: vmtxResult.bytes });
    const vheaBytes = new Uint8Array(dv.buffer, dv.byteOffset + vhea.offset, vhea.length).slice();
    const vheaDv = new DataView(vheaBytes.buffer);
    vheaDv.setUint16(34, vmtxResult.numberOfHMetrics, false);
    outTables.push({ tag: "vhea", bytes: vheaBytes });
  }
  if (keepGSUB) {
    const origToNew = /* @__PURE__ */ new Map();
    for (let newGid = 0; newGid < subsetGids.length; newGid++) origToNew.set(subsetGids[newGid], newGid);
    if (gsub) {
      const gsubBytes = new Uint8Array(dv.buffer, dv.byteOffset + gsub.offset, gsub.length);
      outTables.push({ tag: "GSUB", bytes: subsetGSUB(gsubBytes, origToNew) });
    }
    if (gpos) {
      const gposBytes = new Uint8Array(dv.buffer, dv.byteOffset + gpos.offset, gpos.length);
      const newGpos = subsetGPOS(gposBytes, origToNew);
      if (newGpos) outTables.push({ tag: "GPOS", bytes: newGpos });
    }
  }
  return assembleSfnt(outTables, outType === "woff2");
}

// vendor/web-font-subset/font.ts
var import_woff2_encode = __toESM(require_woff2_encode());
var textEncoder = new TextEncoder();
var textToCodePoints = (text) => {
  const result = [];
  for (let i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i);
    result.push(cp);
    if (cp > 65535) i++;
  }
  return result;
};
var createSubsetFont = (fontBuffer, codePoints, sourceType) => import_font.Font.create(fontBuffer, {
  type: sourceType,
  subset: codePoints,
  kerning: true
});
var optimizeFont = (font) => {
  const optimized = font.optimize();
  return optimized;
};
var rewriteLayoutTablesForSubset = (subsetOptimized, subsetGids) => {
  const ttf = subsetOptimized.get();
  const origToNew = /* @__PURE__ */ new Map();
  for (let i = 0; i < subsetGids.length; i++) origToNew.set(subsetGids[i], i);
  const origGPOS = ttf.GPOS;
  if (origGPOS) {
    const gposBytes = origGPOS instanceof Uint8Array ? origGPOS : new Uint8Array(origGPOS);
    if (gposBytes.byteLength > 0) {
      const rewritten = subsetGPOS(gposBytes, origToNew);
      if (rewritten) ttf.GPOS = rewritten;
    }
  }
  const origGSUB = ttf.GSUB;
  if (origGSUB) {
    const gsubBytes = origGSUB instanceof Uint8Array ? origGSUB : new Uint8Array(origGSUB);
    if (gsubBytes.byteLength > 0) {
      ttf.GSUB = subsetGSUB(gsubBytes, origToNew);
    }
  }
};
var writeFont = (font, outType) => {
  const result = font.write({ type: outType, kerning: true });
  if (typeof result === "string") {
    return textEncoder.encode(result);
  }
  if (result instanceof Uint8Array) {
    return result;
  }
  return new Uint8Array(result);
};
var fontSubset = (fontBuffer, subString, option) => {
  const codePoints = textToCodePoints(subString);
  if (option.sourceType === "otf") {
    const fontU8 = new Uint8Array(fontBuffer);
    const otfBytes = subsetOTF(fontU8, codePoints, true, option.outType);
    if (otfBytes !== null) {
      if (option.outType === "woff2") {
        return (0, import_woff2_encode.encodeTTFToWOFF2)(otfBytes);
      }
      return otfBytes;
    }
  }
  let extraSubsetGids;
  const probe = probeGsubAndCmap(fontBuffer, codePoints, option.sourceType);
  let probedSeedGids;
  let probedGsubBytes;
  let presetCmap;
  if (probe.ok) {
    probedGsubBytes = probe.gsubBytes;
    probedSeedGids = /* @__PURE__ */ new Set();
    probedSeedGids.add(0);
    presetCmap = {};
    for (const cp of codePoints) {
      const gid = probe.lookup.get(cp);
      if (gid !== void 0) {
        probedSeedGids.add(gid);
        presetCmap[cp] = gid;
      }
    }
  } else if (probe.needsFallback) {
    const probeFont = import_font.Font.create(fontBuffer, {
      type: option.sourceType,
      subset: codePoints,
      kerning: true
    });
    const probeTtf = probeFont.get();
    const origGSUB = probeTtf.GSUB;
    const origCmap = probeTtf.cmap;
    if (origGSUB && origCmap) {
      probedGsubBytes = origGSUB instanceof Uint8Array ? origGSUB : new Uint8Array(origGSUB);
      probedSeedGids = /* @__PURE__ */ new Set();
      probedSeedGids.add(0);
      for (const cp of codePoints) {
        const gid = origCmap[cp];
        if (gid !== void 0) probedSeedGids.add(gid);
      }
    }
  }
  if (probedGsubBytes && probedSeedGids) {
    const reachable = collectReachableGsubTargets(probedGsubBytes, probedSeedGids);
    if (reachable.size > 0) extraSubsetGids = [...reachable];
  }
  const font = import_font.Font.create(fontBuffer, {
    type: option.sourceType,
    subset: codePoints,
    kerning: true,
    extraSubsetGids,
    /** presetCmap 复用 probe 结果，跳过 readWindowsAllCodes 的 format4/12 二分查找（优化315） */
    presetCmap
  });
  const preOptTtf = font.get();
  const subsetGids = preOptTtf.subsetGids ?? [];
  const optimized = optimizeFont(font);
  rewriteLayoutTablesForSubset(optimized, subsetGids);
  return writeFont(optimized, option.outType);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSubsetFont,
  fontSubset,
  optimizeFont,
  textToCodePoints,
  writeFont
});
