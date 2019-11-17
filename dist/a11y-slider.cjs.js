
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var O = 'object';
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == O && globalThis) ||
  check(typeof window == O && window) ||
  check(typeof self == O && self) ||
  check(typeof commonjsGlobal == O && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var path = global_1;

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var hide = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    hide(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.2.1',
  mode:  'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var Symbol$1 = global_1.Symbol;
var store = shared('wks');

var wellKnownSymbol = function (name) {
  return store[name] || (store[name] = nativeSymbol && Symbol$1[name]
    || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
};

var f$1 = wellKnownSymbol;

var wrappedWellKnownSymbol = {
	f: f$1
};

var defineProperty = objectDefineProperty.f;

var defineWellKnownSymbol = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbol.f(NAME)
  });
};

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f$2 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f$2
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$3 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$3
};

var functionToString = shared('native-function-to-string', Function.toString);

var WeakMap = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(functionToString).split('toString');

shared('inspectSource', function (it) {
  return functionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
});
});

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$4
};

var f$5 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$5
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var nativeAssign = Object.assign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
// should work with symbols and should have deterministic property order (V8 bug)
var objectAssign = !nativeAssign || fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
  assign: objectAssign
});

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ( !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var html = getBuiltIn('document', 'documentElement');

var IE_PROTO$1 = sharedKey('IE_PROTO');

var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

hiddenKeys[IE_PROTO$1] = true;

var defineProperty$1 = objectDefineProperty.f;



var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$1 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          hide(CurrentIteratorPrototype, ITERATOR$1, returnThis$1);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
    hide(IterablePrototype, ITERATOR$1, defaultIterator);
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var charAt = stringMultibyte.charAt;



var STRING_ITERATOR = 'String Iterator';
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  hide(ArrayPrototype, UNSCOPABLES, objectCreate(null));
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$1(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var ITERATOR$2 = wellKnownSymbol('iterator');
var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
      hide(CollectionPrototype, ITERATOR$2, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$2] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG$1]) hide(CollectionPrototype, TO_STRING_TAG$1, COLLECTION_NAME);
    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        hide(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
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
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var debounce=function(i,e,o){var t;return void 0===e&&(e=50),void 0===o&&(o={isImmediate:!1}),function(){for(var a=[],d=0;d<arguments.length;d++)a[d]=arguments[d];var n=this,m=o.isImmediate&&void 0===t;void 0!==t&&clearTimeout(t),t=setTimeout(function(){t=void 0,o.isImmediate||i.apply(n,a);},e),m&&i.apply(n,a);}};

var createElement = function createElement(html) {
  return new DOMParser().parseFromString(html, 'text/html').body.firstChild;
};
/**
 * a11yclick - Easily handle keyboard click events on non semantic button elements.
 * https://github.com/svinkle/a11yclick
 * @param {Object} event Click/keyboard event object.
 * @returns {Boolean} Returns true or false depending on event type and code.
 */

var a11yClick = function a11yClick(event) {

  var code = event.charCode || event.keyCode,
      type = event.type;

  if (type === 'click') {
    return true;
  } else if (type === 'keydown') {
    if (code === 32 || code === 13) {
      event.preventDefault();
      return true;
    }
  }

  return false;
}; // Cross browser custom event
// Some code from https://github.com/shystruk/custom-event-js

var crossCustomEvent = function crossCustomEvent(event, params) {
  var evt = document.createEvent('CustomEvent');
  params = params || {
    bubbles: false,
    cancelable: false,
    detail: undefined
  };
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}; // Checks if value is an integer
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill

var isInteger = function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

var SlideDirection;

(function (SlideDirection) {
  SlideDirection[SlideDirection["Prev"] = 0] = "Prev";
  SlideDirection[SlideDirection["Next"] = 1] = "Next";
})(SlideDirection || (SlideDirection = {}));

var SliderState;

(function (SliderState) {
  SliderState[SliderState["Enabled"] = 0] = "Enabled";
  SliderState[SliderState["Disabled"] = 1] = "Disabled";
})(SliderState || (SliderState = {}));

var A11YSlider =
/*#__PURE__*/
function () {
  function A11YSlider(element, options) {
    var _this = this;

    _classCallCheck(this, A11YSlider);

    this.slider = element;
    this.slides = element.children;
    this.sliderContainer = createElement('<div class="a11y-slider-container"></div>');
    this._activeClass = 'a11y-slider-active';
    this._visibleClass = 'a11y-slider-visible';
    this._dotsClass = 'a11y-slider-dots';
    this._sliderClass = 'a11y-slider';
    this._focusable = 'a, area, input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    this.dots = null;
    this.activeSlide = this.slides[0];
    this.visibleSlides = [];
    this.sliderEnabled = SliderState.Disabled;
    this._hasCustomBtns = options && options.prevBtn || options && options.nextBtn ? true : false;
    this.options = {
      container: true,
      navBtns: true,
      prevBtn: options && options.prevBtn || createElement('<button class="a11y-slider-prev">Previous slide</button>'),
      nextBtn: options && options.nextBtn || createElement('<button class="a11y-slider-next">Next slide</button>'),
      dots: true,
      adaptiveHeight: false,
      skipBtn: true,
      items: false
    }; // Set user-inputted options if available

    Object.assign(this.options, options); // Binding

    this._handlePrev = this._handlePrev.bind(this);
    this._handleNext = this._handleNext.bind(this);
    this._checkShouldEnableDebounced = debounce(this._checkShouldEnable.bind(this), 250);
    this._updateHeightDebounced = debounce(this._updateHeight.bind(this), 250);
    this._updateScrollPosition = debounce(function () {
      return _this.scrollToSlide(_this.activeSlide);
    }, 250);
    this._handleScroll = debounce(this._handleScroll.bind(this), 150); // May fire twice depending on browser
    // Initialize slider

    this._init();
  }

  _createClass(A11YSlider, [{
    key: "_init",
    value: function _init() {
      // Check if the slider should be initialized depending on slides shown
      this._checkShouldEnable(); // Enable/disable slider after resize


      window.addEventListener('resize', this._checkShouldEnableDebounced);

      this._dispatchEvent('init', {
        a11ySlider: this
      });
    }
  }, {
    key: "_checkShouldEnable",
    value: function _checkShouldEnable() {
      var _this2 = this;

      var shouldEnable = true; // If 1 or less slides exist then a slider is not needed

      if (this.slides.length <= 1) shouldEnable = false; // If there are no slides outside the slider's viewport a slider is not needed

      this._getActiveAndVisible(function (visibleSlides) {
        if (visibleSlides.length === _this2.slides.length) shouldEnable = false;
      }); // If user explicitly set items to be shown and it's the same number as available


      if (this.slides.length === this.options.items) shouldEnable = false; // Enable/disable slider based on above requirements

      if (shouldEnable && this.sliderEnabled === SliderState.Disabled) {
        this._enableSlider();
      } else if (!shouldEnable && this.sliderEnabled === SliderState.Enabled) {
        this._disableSlider();
      }
    } // Enable all functionality for the slider. Should mirror _disableSlider()

  }, {
    key: "_enableSlider",
    value: function _enableSlider() {
      // Set slider to enabled
      this.sliderEnabled = SliderState.Enabled; // Add slider container to DOM and move slider into it if enabled

      if (this.options.container) {
        this.slider.insertAdjacentElement('beforebegin', this.sliderContainer);
        this.sliderContainer.insertAdjacentElement('afterbegin', this.slider);
      } // Add skip button before slider if enabled


      if (this.options.skipBtn) this._addSkipBtn(); // If prev/next buttons are enabled and user isn't using their own add it to the DOM

      if (this.options.navBtns && !this._hasCustomBtns) {
        if (this.options.prevBtn instanceof HTMLElement) {
          this.slider.insertAdjacentElement('beforebegin', this.options.prevBtn);
        }

        if (this.options.nextBtn instanceof HTMLElement) {
          this.slider.insertAdjacentElement('beforebegin', this.options.nextBtn);
        }
      } // TODO: Move add/removal of buttons into it's own function
      // Add event listeners for prev/next buttons. Possible for there to be multiple so need to loop through them all


      var prevBtns = this.options.prevBtn instanceof HTMLElement ? [this.options.prevBtn] : this.options.prevBtn;
      var nextBtns = this.options.nextBtn instanceof HTMLElement ? [this.options.nextBtn] : this.options.nextBtn;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = prevBtns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prevBtn = _step.value;
          prevBtn.addEventListener('click', this._handlePrev, {
            passive: true
          });
          prevBtn.addEventListener('keypress', this._handlePrev, {
            passive: true
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = nextBtns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var nextBtn = _step2.value;
          nextBtn.addEventListener('click', this._handleNext, {
            passive: true
          });
          nextBtn.addEventListener('keypress', this._handleNext, {
            passive: true
          });
        } // Add dot navigation if enabled

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (this.options.dots) this._generateDots(); // Add listener for when the slider stops moving

      this.slider.addEventListener('scroll', this._handleScroll, false); // Add all CSS needed

      this._setCSS(); // Adaptive height


      if (this.options.adaptiveHeight === true) {
        // Update slider's height based on content of slide
        this._updateHeight(this.activeSlide); // Also add resize listener for it


        window.addEventListener('resize', this._updateHeightDebounced.bind);
      } // On resize make sure to update scroll position as content may change in width/height


      window.addEventListener('resize', this._updateScrollPosition);
    } // Disable all functionality for the slider. Should mirror _enableSlider()

  }, {
    key: "_disableSlider",
    value: function _disableSlider() {
      this.sliderEnabled = SliderState.Disabled; // Remove slider from a11y-slider's container and then remove container from DOM

      if (document.body.contains(this.sliderContainer)) {
        this.sliderContainer.insertAdjacentElement('beforebegin', this.slider);
        this.sliderContainer.parentNode.removeChild(this.sliderContainer);
      } // Remove skip button


      this._removeSkipBtn(); // Remove event listeners for prev/next buttons
      // Possible for there to be multiple so need to loop through them all


      var prevBtns = this.options.prevBtn instanceof HTMLElement ? [this.options.prevBtn] : this.options.prevBtn;
      var nextBtns = this.options.nextBtn instanceof HTMLElement ? [this.options.nextBtn] : this.options.nextBtn;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = prevBtns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var prevBtn = _step3.value;
          prevBtn.removeEventListener('click', this._handlePrev);
          prevBtn.removeEventListener('keypress', this._handlePrev); // Only remove generated buttons, not user-defined ones

          if (!this._hasCustomBtns) prevBtn.parentNode.removeChild(prevBtn);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = nextBtns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var nextBtn = _step4.value;
          nextBtn.removeEventListener('click', this._handleNext);
          nextBtn.removeEventListener('keypress', this._handleNext); // Only remove generated buttons, not user-defined ones

          if (!this._hasCustomBtns) nextBtn.parentNode.removeChild(nextBtn);
        } // Will remove dots if they exist

      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      this._removeDots(); // Remove listener for when the slider stops moving


      this.slider.removeEventListener('scroll', this._handleScroll, false); // Remove all CSS

      this._removeCSS(); // Remove all adaptive height functionality


      this._updateHeight(false);

      window.removeEventListener('resize', this._updateHeightDebounced); // Remove scroll position update check

      window.removeEventListener('resize', this._updateScrollPosition);
    } // Add all CSS needed for the slider. Should mirror _removeCSS()

  }, {
    key: "_setCSS",
    value: function _setCSS() {
      // Update items
      this._updateItemsCSS(); // Update slider instance to get the correct elements


      this._getActiveAndVisible(); // Add main slider class if it doesn't have it already


      this.slider.classList.add(this._sliderClass); // Reset the more dynamic CSS first if it exists

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.slides[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var slide = _step5.value;
          slide.classList.remove(this._activeClass);
          slide.classList.remove(this._visibleClass);
        } // Add in active classes

      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      this.activeSlide.classList.add(this._activeClass); // Add in visible classes

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.visibleSlides[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _slide = _step6.value;

          _slide.classList.add(this._visibleClass);
        } // Trigger dot update

      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      this._updateDots(this.activeSlide); // Update all a11y functionality


      this._addFocusable();
    } // Remove all CSS needed for the slider. Should mirror _setCSS()

  }, {
    key: "_removeCSS",
    value: function _removeCSS() {
      // Remove item CSS if it was set
      this._removeItemsCSS(); // Remove class to slider


      this.slider.classList.remove(this._sliderClass); // Reset all the dynamic classes

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.slides[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var slide = _step7.value;
          slide.classList.remove(this._activeClass);
          slide.classList.remove(this._visibleClass);
        } // Remove all a11y functionality

      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      this._removeFocusable();
    }
  }, {
    key: "_updateItemsCSS",
    value: function _updateItemsCSS() {
      if (isInteger(this.options.items)) {
        // Percentage width of each slide
        var slideWidth = 100 / this.options.items; // Set styles for slider

        this.slider.style.display = 'flex'; // Set styles for items

        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = this.slides[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var slide = _step8.value;
            slide.style.width = "".concat(slideWidth, "%");
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
              _iterator8.return();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }
      } else {
        // Reset everything if number of items not explicitly set
        this.slider.style.removeProperty('display');
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = this.slides[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var _slide2 = _step9.value;

            _slide2.style.removeProperty('width');
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
              _iterator9.return();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }
      }
    } // Reset item styling even if explicitly set in the options

  }, {
    key: "_removeItemsCSS",
    value: function _removeItemsCSS() {
      this.slider.style.removeProperty('display');
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.slides[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var slide = _step10.value;
          slide.style.removeProperty('width');
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    } // Makes only the visible items focusable and readable by screenreaders. Should mirror _removeA11Y()

  }, {
    key: "_addFocusable",
    value: function _addFocusable() {
      // Reset all a11y functionality to default beforehand
      this._removeFocusable();

      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = this.slides[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var slide = _step11.value;
          var focusableItems = slide.querySelectorAll(this._focusable); // If slide is not visible make the slide wrapper not focusable

          if (!slide.classList.contains(this._visibleClass)) {
            slide.setAttribute('tabindex', '-1');
            slide.setAttribute('aria-hidden', 'true');
          }

          var _iteratorNormalCompletion12 = true;
          var _didIteratorError12 = false;
          var _iteratorError12 = undefined;

          try {
            for (var _iterator12 = focusableItems[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
              var focusableItem = _step12.value;

              if (!slide.classList.contains(this._visibleClass)) {
                focusableItem.setAttribute('tabindex', '-1');
              }
            }
          } catch (err) {
            _didIteratorError12 = true;
            _iteratorError12 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
                _iterator12.return();
              }
            } finally {
              if (_didIteratorError12) {
                throw _iteratorError12;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
            _iterator11.return();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }
    } // Reset a11y attributes for slide wrapper. Should mirror _addA11Y()

  }, {
    key: "_removeFocusable",
    value: function _removeFocusable() {
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = this.slides[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var slide = _step13.value;
          var focusableItems = slide.querySelectorAll(this._focusable); // Remove a11y for each slide wrapper

          slide.removeAttribute('tabindex');
          slide.removeAttribute('aria-hidden'); // Reset a11y attributes for slide inner elements

          var _iteratorNormalCompletion14 = true;
          var _didIteratorError14 = false;
          var _iteratorError14 = undefined;

          try {
            for (var _iterator14 = focusableItems[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
              var focusableItem = _step14.value;
              focusableItem.removeAttribute('tabindex');
            }
          } catch (err) {
            _didIteratorError14 = true;
            _iteratorError14 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion14 && _iterator14.return != null) {
                _iterator14.return();
              }
            } finally {
              if (_didIteratorError14) {
                throw _iteratorError14;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13.return != null) {
            _iterator13.return();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }
    }
  }, {
    key: "_addSkipBtn",
    value: function _addSkipBtn() {
      var beforeEl = createElement("<button class=\"a11y-slider-sr-only\" type=\"button\" tabindex=\"0\">Click to skip slider carousel</button>");
      var afterEl = createElement("<div class=\"a11y-slider-sr-only\" tabindex=\"-1\">End of slider carousel</div>"); // Event handler to go to end

      var focusEnd = function focusEnd(event) {
        if (a11yClick(event) === true) afterEl.focus();
      }; // Add event listeners


      beforeEl.addEventListener('click', focusEnd, {
        passive: true
      });
      beforeEl.addEventListener('keypress', focusEnd, {
        passive: true
      }); // Add to DOM

      this.slider.insertAdjacentElement('beforebegin', beforeEl);
      this.slider.insertAdjacentElement('afterend', afterEl);
    }
  }, {
    key: "_removeSkipBtn",
    value: function _removeSkipBtn() {
      var skipElements = document.querySelectorAll('a11y-slider-sr-only');
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = skipElements[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var skipElement = _step15.value;

          if (skipElement instanceof HTMLElement) {
            skipElement.parentNode.removeChild(skipElement);
          }
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15.return != null) {
            _iterator15.return();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
      }
    }
  }, {
    key: "_generateDots",
    value: function _generateDots() {
      var _this3 = this;

      this.dots = createElement("<ul class=\"".concat(this._dotsClass, "\"></ul>"));

      var _loop = function _loop(i) {
        var dotLi = createElement('<li></li>');
        var dotBtn = createElement('<button type="button"></button>'); // Add text

        dotBtn.textContent = "Move slider to item #".concat(i + 1); // Event handlers to switch to slide

        var switchToSlide = function switchToSlide(event) {
          if (a11yClick(event) === true) _this3.scrollToSlide(_this3.slides[i]);
        }; // Add event listeners


        dotBtn.addEventListener('click', switchToSlide, {
          passive: true
        });
        dotBtn.addEventListener('keypress', switchToSlide, {
          passive: true
        }); // Append to UL

        dotLi.insertAdjacentElement('beforeend', dotBtn);

        _this3.dots.insertAdjacentElement('beforeend', dotLi);
      };

      for (var i = 0; i < this.slides.length; i++) {
        _loop(i);
      } // Add dots UL to DOM


      this.slider.insertAdjacentElement('afterend', this.dots);
    }
  }, {
    key: "_removeDots",
    value: function _removeDots() {
      if (this.dots instanceof HTMLElement) {
        this.dots.parentNode.removeChild(this.dots);
      }
    }
  }, {
    key: "_updateDots",
    value: function _updateDots(activeSlide) {
      if (this.dots instanceof HTMLElement) {
        var activeIndex = Array.prototype.indexOf.call(activeSlide.parentNode.children, activeSlide); // Reset children active class if exist

        var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
          for (var _iterator16 = this.dots.children[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var dot = _step16.value;
            dot.querySelector('button').classList.remove('active');
          } // Add class to active dot

        } catch (err) {
          _didIteratorError16 = true;
          _iteratorError16 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion16 && _iterator16.return != null) {
              _iterator16.return();
            }
          } finally {
            if (_didIteratorError16) {
              throw _iteratorError16;
            }
          }
        }

        this.dots.children[activeIndex].querySelector('button').classList.add('active');
      }
    }
  }, {
    key: "_goPrevOrNext",
    value: function _goPrevOrNext(direction) {
      var _this4 = this;

      this._getActiveAndVisible(function (visibleSlides, activeSlide) {
        var firstSlide = _this4.slider.firstElementChild;
        var lastSlide = _this4.slider.lastElementChild;
        var firstVisibleSlide = visibleSlides[0];
        var lastVisibleSlide = visibleSlides[visibleSlides.length - 1];

        if (direction === SlideDirection.Next) {
          // Wrap to the first slide if we're currently on the last
          if (lastVisibleSlide === lastSlide) {
            _this4.scrollToSlide(firstSlide);
          } else {
            _this4.scrollToSlide(activeSlide.nextElementSibling);
          }
        } else if (direction === SlideDirection.Prev) {
          // Wrap to the last slide if we're currently on the first
          if (firstVisibleSlide === firstSlide) {
            _this4.scrollToSlide(lastSlide);
          } else {
            _this4.scrollToSlide(activeSlide.previousElementSibling);
          }
        }
      });
    }
  }, {
    key: "scrollToSlide",
    value: function scrollToSlide(targetSlide) {
      var modernBrowser = !!HTMLElement.prototype.scrollTo; // Dispatch custom event

      this._dispatchEvent('beforeChange', {
        currentSlide: this.activeSlide,
        nextSlide: targetSlide,
        a11ySlider: this
      }); // Update slider's height based on content of slide


      if (this.options.adaptiveHeight === true) this._updateHeight(targetSlide); // Move slider to specific item

      if (modernBrowser) {
        this.slider.scroll({
          left: targetSlide.offsetLeft,
          behavior: 'smooth'
        });
      } else {
        this.slider.scrollLeft = targetSlide.offsetLeft;
      } // Trigger dot update


      this._updateDots(targetSlide);
    }
    /**
     * If element is passed slider's height will match
     *  it otherwise the height of the slider is removed.
     */

  }, {
    key: "_updateHeight",
    value: function _updateHeight(target) {
      if (target instanceof HTMLElement) {
        var targetHeight = target.offsetHeight;
        this.slider.style.height = "".concat(targetHeight, "px");
      } else {
        this.slider.style.height = '';
      }
    }
  }, {
    key: "_getActiveAndVisible",
    value: function _getActiveAndVisible(callback) {
      var visibleSlides = []; // Only detects items in the visible viewport of the parent element

      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = this.slides[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var slide = _step17.value;
          var sliderWidth = this.slider.clientWidth;
          var sliderPosition = this.slider.scrollLeft;
          var slideOffset = slide.offsetLeft;

          if (slideOffset >= sliderPosition && slideOffset < sliderPosition + sliderWidth) {
            visibleSlides.push(slide);
          }
        }
      } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion17 && _iterator17.return != null) {
            _iterator17.return();
          }
        } finally {
          if (_didIteratorError17) {
            throw _iteratorError17;
          }
        }
      }

      this.visibleSlides = visibleSlides;
      this.activeSlide = visibleSlides[0];
      callback && callback(this.visibleSlides, this.activeSlide);
    }
  }, {
    key: "_handlePrev",
    value: function _handlePrev(event) {
      if (a11yClick(event) === true) this._goPrevOrNext(SlideDirection.Prev);
    }
  }, {
    key: "_handleNext",
    value: function _handleNext(event) {
      if (a11yClick(event) === true) this._goPrevOrNext(SlideDirection.Next);
    }
  }, {
    key: "_handleScroll",
    value: function _handleScroll() {
      // Update CSS
      this._setCSS(); // Dispatch custom event


      this._dispatchEvent('afterChange', {
        currentSlide: this.activeSlide,
        a11ySlider: this
      });
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(eventName, detail) {
      var event = crossCustomEvent(eventName, {
        detail: detail
      });
      this.slider.dispatchEvent(event);
    }
    /**
     * Nuke the slider
     */

  }, {
    key: "destroy",
    value: function destroy() {
      // Undos everything from _enableSlider()
      this._disableSlider(); // Undos everything from init()


      window.removeEventListener('resize', this._checkShouldEnableDebounced); // Dispatch custom event

      this._dispatchEvent('destroy', {
        a11ySlider: this
      });
    }
  }]);

  return A11YSlider;
}();

module.exports = A11YSlider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYTExeS1zbGlkZXIuY2pzLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3BhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93cmFwcGVkLXdlbGwta25vd24tc3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLXRvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtYXNzaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuYXNzaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLWl0ZXJhdG9yLWNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy90cy1kZWJvdW5jZS9kaXN0L3NyYy9pbmRleC5qcyIsIi4uL3NyYy91dGlscy50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTyA9ICdvYmplY3QnO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gTyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09IE8gJiYgd2luZG93KSB8fFxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSBPICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gTyAmJiBnbG9iYWwpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG5cbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlRGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGhpZGUoZ2xvYmFsLCBrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IHNldEdsb2JhbChTSEFSRUQsIHt9KTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjIuMScsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICByZXR1cm4gIVN0cmluZyhTeW1ib2woKSk7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcblxudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgc3RvcmUgPSBzaGFyZWQoJ3drcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPSBOQVRJVkVfU1lNQk9MICYmIFN5bWJvbFtuYW1lXVxuICAgIHx8IChOQVRJVkVfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuIiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd3JhcHBlZC13ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChOQU1FKSB7XG4gIHZhciBTeW1ib2wgPSBwYXRoLlN5bWJvbCB8fCAocGF0aC5TeW1ib2wgPSB7fSk7XG4gIGlmICghaGFzKFN5bWJvbCwgTkFNRSkpIGRlZmluZVByb3BlcnR5KFN5bWJvbCwgTkFNRSwge1xuICAgIHZhbHVlOiB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlLmYoTkFNRSlcbiAgfSk7XG59O1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5pdGVyYXRvcmAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN5bWJvbC5pdGVyYXRvclxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgIW5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgc3BsaXQgPSAnJy5zcGxpdDtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwiLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gc2hhcmVkKCduYXRpdmUtZnVuY3Rpb24tdG8tc3RyaW5nJywgRnVuY3Rpb24udG9TdHJpbmcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBuYXRpdmVGdW5jdGlvblRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXRvLXN0cmluZycpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChuYXRpdmVGdW5jdGlvblRvU3RyaW5nLmNhbGwoV2Vha01hcCkpO1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xudmFyIG9iamVjdEhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVApIHtcbiAgdmFyIHN0b3JlID0gbmV3IFdlYWtNYXAoKTtcbiAgdmFyIHdtZ2V0ID0gc3RvcmUuZ2V0O1xuICB2YXIgd21oYXMgPSBzdG9yZS5oYXM7XG4gIHZhciB3bXNldCA9IHN0b3JlLnNldDtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIHdtc2V0LmNhbGwoc3RvcmUsIGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21nZXQuY2FsbChzdG9yZSwgaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21oYXMuY2FsbChzdG9yZSwgaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBoaWRlKGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgbmF0aXZlRnVuY3Rpb25Ub1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi10by1zdHJpbmcnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgVEVNUExBVEUgPSBTdHJpbmcobmF0aXZlRnVuY3Rpb25Ub1N0cmluZykuc3BsaXQoJ3RvU3RyaW5nJyk7XG5cbnNoYXJlZCgnaW5zcGVjdFNvdXJjZScsIGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gbmF0aXZlRnVuY3Rpb25Ub1N0cmluZy5jYWxsKGl0KTtcbn0pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdW5zYWZlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy51bnNhZmUgOiBmYWxzZTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMuZW51bWVyYWJsZSA6IGZhbHNlO1xuICB2YXIgbm9UYXJnZXRHZXQgPSBvcHRpb25zID8gISFvcHRpb25zLm5vVGFyZ2V0R2V0IDogZmFsc2U7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmICFoYXModmFsdWUsICduYW1lJykpIGhpZGUodmFsdWUsICduYW1lJywga2V5KTtcbiAgICBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSkuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8ga2V5IDogJycpO1xuICB9XG4gIGlmIChPID09PSBnbG9iYWwpIHtcbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIHNldEdsb2JhbChrZXksIHZhbHVlKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoIXVuc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gIH0gZWxzZSBpZiAoIW5vVGFyZ2V0R2V0ICYmIE9ba2V5XSkge1xuICAgIHNpbXBsZSA9IHRydWU7XG4gIH1cbiAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gIGVsc2UgaGlkZShPLCBrZXksIHZhbHVlKTtcbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgbmF0aXZlRnVuY3Rpb25Ub1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT0gJ2Z1bmN0aW9uJyA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgVG9JbnRlZ2VyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlcihhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4obGVuZ3RoLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdvd25LZXlzJykgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogdHlwZW9mIGRldGVjdGlvbiA9PSAnZnVuY3Rpb24nID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGUnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBoaWRlKHNvdXJjZVByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNvdXJjZVByb3BlcnR5LCBvcHRpb25zKTtcbiAgfVxufTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcblxudmFyIG5hdGl2ZUFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIGBPYmplY3QuYXNzaWduYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5hc3NpZ25cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhbmF0aXZlQXNzaWduIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBzeW1ib2wgPSBTeW1ib2woKTtcbiAgdmFyIGFscGhhYmV0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtzeW1ib2xdID0gNztcbiAgYWxwaGFiZXQuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGNocikgeyBCW2Nocl0gPSBjaHI7IH0pO1xuICByZXR1cm4gbmF0aXZlQXNzaWduKHt9LCBBKVtzeW1ib2xdICE9IDcgfHwgb2JqZWN0S2V5cyhuYXRpdmVBc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBhbHBoYWJldDtcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICB2YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mO1xuICB3aGlsZSAoYXJndW1lbnRzTGVuZ3RoID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IEluZGV4ZWRPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5U3ltYm9scyA/IG9iamVjdEtleXMoUykuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhTKSkgOiBvYmplY3RLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikge1xuICAgICAga2V5ID0ga2V5c1tqKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogbmF0aXZlQXNzaWduO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1hc3NpZ24nKTtcblxuLy8gYE9iamVjdC5hc3NpZ25gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmFzc2lnblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogT2JqZWN0LmFzc2lnbiAhPT0gYXNzaWduIH0sIHtcbiAgYXNzaWduOiBhc3NpZ25cbn0pO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyBjb2RlUG9pbnRBdCwgYXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HID8gUy5jaGFyQXQocG9zaXRpb24pIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgRi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBudWxsO1xuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBGKCkpICE9PSBGLnByb3RvdHlwZTtcbn0pO1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8vIGBPYmplY3QuZ2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG5tb2R1bGUuZXhwb3J0cyA9IENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90b3R5cGUgOiBudWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBmYWxzZTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0laXRlcmF0b3Jwcm90b3R5cGUlLW9iamVjdFxudmFyIEl0ZXJhdG9yUHJvdG90eXBlLCBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUsIGFycmF5SXRlcmF0b3I7XG5cbmlmIChbXS5rZXlzKSB7XG4gIGFycmF5SXRlcmF0b3IgPSBbXS5rZXlzKCk7XG4gIC8vIFNhZmFyaSA4IGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICBpZiAoISgnbmV4dCcgaW4gYXJyYXlJdGVyYXRvcikpIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSB0cnVlO1xuICBlbHNlIHtcbiAgICBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihnZXRQcm90b3R5cGVPZihhcnJheUl0ZXJhdG9yKSk7XG4gICAgaWYgKFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkgSXRlcmF0b3JQcm90b3R5cGUgPSBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cbn1cblxuaWYgKEl0ZXJhdG9yUHJvdG90eXBlID09IHVuZGVmaW5lZCkgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbmlmICghSVNfUFVSRSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEl0ZXJhdG9yUHJvdG90eXBlOiBJdGVyYXRvclByb3RvdHlwZSxcbiAgQlVHR1lfU0FGQVJJX0lURVJBVE9SUzogQlVHR1lfU0FGQVJJX0lURVJBVE9SU1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIFByb3BlcnRpZXNba2V5XSk7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGRlZmluZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBkb2N1bWVudENyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xuXG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgdmFyIGxlbmd0aCA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgc2NyaXB0ID0gJ3NjcmlwdCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGpzID0gJ2phdmEnICsgc2NyaXB0ICsgJzonO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBodG1sLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSBTdHJpbmcoanMpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgc2NyaXB0ICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnLycgKyBzY3JpcHQgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbbGVuZ3RoXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZGVmaW5lUHJvcGVydGllcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuIiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBUQUcsIFNUQVRJQykge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IFNUQVRJQyA/IGl0IDogaXQucHJvdG90eXBlLCBUT19TVFJJTkdfVEFHKSkge1xuICAgIGRlZmluZVByb3BlcnR5KGl0LCBUT19TVFJJTkdfVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IFRBRyB9KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkgJiYgaXQgIT09IG51bGwpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBzZXQgXCIgKyBTdHJpbmcoaXQpICsgJyBhcyBhIHByb3RvdHlwZScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgYW5PYmplY3QoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlci5jYWxsKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3InKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGUnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJdGVyYXRvcnNDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJyk7XG5cbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IEl0ZXJhdG9yc0NvcmUuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IEl0ZXJhdG9yc0NvcmUuQlVHR1lfU0FGQVJJX0lURVJBVE9SUztcbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xudmFyIEVOVFJJRVMgPSAnZW50cmllcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmFibGUsIE5BTUUsIEl0ZXJhdG9yQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG5cbiAgdmFyIGdldEl0ZXJhdGlvbk1ldGhvZCA9IGZ1bmN0aW9uIChLSU5EKSB7XG4gICAgaWYgKEtJTkQgPT09IERFRkFVTFQgJiYgZGVmYXVsdEl0ZXJhdG9yKSByZXR1cm4gZGVmYXVsdEl0ZXJhdG9yO1xuICAgIGlmICghQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBLSU5EIGluIEl0ZXJhYmxlUHJvdG90eXBlKSByZXR1cm4gSXRlcmFibGVQcm90b3R5cGVbS0lORF07XG4gICAgc3dpdGNoIChLSU5EKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBFTlRSSUVTOiByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMpOyB9O1xuICB9O1xuXG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gZmFsc2U7XG4gIHZhciBJdGVyYWJsZVByb3RvdHlwZSA9IEl0ZXJhYmxlLnByb3RvdHlwZTtcbiAgdmFyIG5hdGl2ZUl0ZXJhdG9yID0gSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdXG4gICAgfHwgSXRlcmFibGVQcm90b3R5cGVbJ0BAaXRlcmF0b3InXVxuICAgIHx8IERFRkFVTFQgJiYgSXRlcmFibGVQcm90b3R5cGVbREVGQVVMVF07XG4gIHZhciBkZWZhdWx0SXRlcmF0b3IgPSAhQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBuYXRpdmVJdGVyYXRvciB8fCBnZXRJdGVyYXRpb25NZXRob2QoREVGQVVMVCk7XG4gIHZhciBhbnlOYXRpdmVJdGVyYXRvciA9IE5BTUUgPT0gJ0FycmF5JyA/IEl0ZXJhYmxlUHJvdG90eXBlLmVudHJpZXMgfHwgbmF0aXZlSXRlcmF0b3IgOiBuYXRpdmVJdGVyYXRvcjtcbiAgdmFyIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgbWV0aG9kcywgS0VZO1xuXG4gIC8vIGZpeCBuYXRpdmVcbiAgaWYgKGFueU5hdGl2ZUl0ZXJhdG9yKSB7XG4gICAgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoYW55TmF0aXZlSXRlcmF0b3IuY2FsbChuZXcgSXRlcmFibGUoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgaWYgKCFJU19QVVJFICYmIGdldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSkgIT09IEl0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgICAgIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgICAgICAgIHNldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSXRlcmF0b3JQcm90b3R5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBoaWRlKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIHRydWUsIHRydWUpO1xuICAgICAgaWYgKElTX1BVUkUpIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGQVVMVCA9PSBWQUxVRVMgJiYgbmF0aXZlSXRlcmF0b3IgJiYgbmF0aXZlSXRlcmF0b3IubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gdHJ1ZTtcbiAgICBkZWZhdWx0SXRlcmF0b3IgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuYXRpdmVJdGVyYXRvci5jYWxsKHRoaXMpOyB9O1xuICB9XG5cbiAgLy8gZGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUlTX1BVUkUgfHwgRk9SQ0VEKSAmJiBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl0gIT09IGRlZmF1bHRJdGVyYXRvcikge1xuICAgIGhpZGUoSXRlcmFibGVQcm90b3R5cGUsIElURVJBVE9SLCBkZWZhdWx0SXRlcmF0b3IpO1xuICB9XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IGRlZmF1bHRJdGVyYXRvcjtcblxuICAvLyBleHBvcnQgYWRkaXRpb25hbCBtZXRob2RzXG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogZ2V0SXRlcmF0aW9uTWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyBkZWZhdWx0SXRlcmF0b3IgOiBnZXRJdGVyYXRpb25NZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiBnZXRJdGVyYXRpb25NZXRob2QoRU5UUklFUylcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoS0VZIGluIG1ldGhvZHMpIHtcbiAgICAgIGlmIChCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB8fCAhKEtFWSBpbiBJdGVyYWJsZVByb3RvdHlwZSkpIHtcbiAgICAgICAgcmVkZWZpbmUoSXRlcmFibGVQcm90b3R5cGUsIEtFWSwgbWV0aG9kc1tLRVldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgJCh7IHRhcmdldDogTkFNRSwgcHJvdG86IHRydWUsIGZvcmNlZDogQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfSwgbWV0aG9kcyk7XG4gIH1cblxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvcicpO1xuXG52YXIgU1RSSU5HX0lURVJBVE9SID0gJ1N0cmluZyBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihTVFJJTkdfSVRFUkFUT1IpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLUBAaXRlcmF0b3JcbmRlZmluZUl0ZXJhdG9yKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBTVFJJTkdfSVRFUkFUT1IsXG4gICAgc3RyaW5nOiBTdHJpbmcoaXRlcmF0ZWQpLFxuICAgIGluZGV4OiAwXG4gIH0pO1xuLy8gYCVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0lc3RyaW5naXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uIG5leHQoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciBzdHJpbmcgPSBzdGF0ZS5zdHJpbmc7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4O1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBzdHJpbmcubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gY2hhckF0KHN0cmluZywgaW5kZXgpO1xuICBzdGF0ZS5pbmRleCArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7IHZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2UgfTtcbn0pO1xuIiwiLy8gaXRlcmFibGUgRE9NIGNvbGxlY3Rpb25zXG4vLyBmbGFnIC0gYGl0ZXJhYmxlYCBpbnRlcmZhY2UgLSAnZW50cmllcycsICdrZXlzJywgJ3ZhbHVlcycsICdmb3JFYWNoJyBtZXRob2RzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IDAsXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IDAsXG4gIENTU1ZhbHVlTGlzdDogMCxcbiAgQ2xpZW50UmVjdExpc3Q6IDAsXG4gIERPTVJlY3RMaXN0OiAwLFxuICBET01TdHJpbmdMaXN0OiAwLFxuICBET01Ub2tlbkxpc3Q6IDEsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiAwLFxuICBGaWxlTGlzdDogMCxcbiAgSFRNTEFsbENvbGxlY3Rpb246IDAsXG4gIEhUTUxDb2xsZWN0aW9uOiAwLFxuICBIVE1MRm9ybUVsZW1lbnQ6IDAsXG4gIEhUTUxTZWxlY3RFbGVtZW50OiAwLFxuICBNZWRpYUxpc3Q6IDAsXG4gIE1pbWVUeXBlQXJyYXk6IDAsXG4gIE5hbWVkTm9kZU1hcDogMCxcbiAgTm9kZUxpc3Q6IDEsXG4gIFBhaW50UmVxdWVzdExpc3Q6IDAsXG4gIFBsdWdpbjogMCxcbiAgUGx1Z2luQXJyYXk6IDAsXG4gIFNWR0xlbmd0aExpc3Q6IDAsXG4gIFNWR051bWJlckxpc3Q6IDAsXG4gIFNWR1BhdGhTZWdMaXN0OiAwLFxuICBTVkdQb2ludExpc3Q6IDAsXG4gIFNWR1N0cmluZ0xpc3Q6IDAsXG4gIFNWR1RyYW5zZm9ybUxpc3Q6IDAsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IDAsXG4gIFN0eWxlU2hlZXRMaXN0OiAwLFxuICBUZXh0VHJhY2tDdWVMaXN0OiAwLFxuICBUZXh0VHJhY2tMaXN0OiAwLFxuICBUb3VjaExpc3Q6IDBcbn07XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGUnKTtcblxudmFyIFVOU0NPUEFCTEVTID0gd2VsbEtub3duU3ltYm9sKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5pZiAoQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZCkge1xuICBoaWRlKEFycmF5UHJvdG90eXBlLCBVTlNDT1BBQkxFUywgY3JlYXRlKG51bGwpKTtcbn1cblxuLy8gYWRkIGEga2V5IHRvIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvcicpO1xuXG52YXIgQVJSQVlfSVRFUkFUT1IgPSAnQXJyYXkgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoQVJSQVlfSVRFUkFUT1IpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmVudHJpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmVudHJpZXNcbi8vIGBBcnJheS5wcm90b3R5cGUua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUua2V5c1xuLy8gYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnZhbHVlc1xuLy8gYEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEBpdGVyYXRvclxuLy8gYENyZWF0ZUFycmF5SXRlcmF0b3JgIGludGVybmFsIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY3JlYXRlYXJyYXlpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVJdGVyYXRvcihBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IEFSUkFZX0lURVJBVE9SLFxuICAgIHRhcmdldDogdG9JbmRleGVkT2JqZWN0KGl0ZXJhdGVkKSwgLy8gdGFyZ2V0XG4gICAgaW5kZXg6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gICAga2luZDoga2luZCAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gIH0pO1xuLy8gYCVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSVhcnJheWl0ZXJhdG9ycHJvdG90eXBlJS5uZXh0XG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciB0YXJnZXQgPSBzdGF0ZS50YXJnZXQ7XG4gIHZhciBraW5kID0gc3RhdGUua2luZDtcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXgrKztcbiAgaWYgKCF0YXJnZXQgfHwgaW5kZXggPj0gdGFyZ2V0Lmxlbmd0aCkge1xuICAgIHN0YXRlLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4geyB2YWx1ZTogaW5kZXgsIGRvbmU6IGZhbHNlIH07XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4geyB2YWx1ZTogdGFyZ2V0W2luZGV4XSwgZG9uZTogZmFsc2UgfTtcbiAgcmV0dXJuIHsgdmFsdWU6IFtpbmRleCwgdGFyZ2V0W2luZGV4XV0sIGRvbmU6IGZhbHNlIH07XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJVxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY3JlYXRldW5tYXBwZWRhcmd1bWVudHNvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWNyZWF0ZW1hcHBlZGFyZ3VtZW50c29iamVjdFxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIEFycmF5SXRlcmF0b3JNZXRob2RzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvcicpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciBBcnJheVZhbHVlcyA9IEFycmF5SXRlcmF0b3JNZXRob2RzLnZhbHVlcztcblxuZm9yICh2YXIgQ09MTEVDVElPTl9OQU1FIGluIERPTUl0ZXJhYmxlcykge1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtDT0xMRUNUSU9OX05BTUVdO1xuICB2YXIgQ29sbGVjdGlvblByb3RvdHlwZSA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlKSB7XG4gICAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gICAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JdICE9PSBBcnJheVZhbHVlcykgdHJ5IHtcbiAgICAgIGhpZGUoQ29sbGVjdGlvblByb3RvdHlwZSwgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl0gPSBBcnJheVZhbHVlcztcbiAgICB9XG4gICAgaWYgKCFDb2xsZWN0aW9uUHJvdG90eXBlW1RPX1NUUklOR19UQUddKSBoaWRlKENvbGxlY3Rpb25Qcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIENPTExFQ1RJT05fTkFNRSk7XG4gICAgaWYgKERPTUl0ZXJhYmxlc1tDT0xMRUNUSU9OX05BTUVdKSBmb3IgKHZhciBNRVRIT0RfTkFNRSBpbiBBcnJheUl0ZXJhdG9yTWV0aG9kcykge1xuICAgICAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gICAgICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZVtNRVRIT0RfTkFNRV0gIT09IEFycmF5SXRlcmF0b3JNZXRob2RzW01FVEhPRF9OQU1FXSkgdHJ5IHtcbiAgICAgICAgaGlkZShDb2xsZWN0aW9uUHJvdG90eXBlLCBNRVRIT0RfTkFNRSwgQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIENvbGxlY3Rpb25Qcm90b3R5cGVbTUVUSE9EX05BTUVdID0gQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0cy5kZWJvdW5jZT1mdW5jdGlvbihpLGUsbyl7dmFyIHQ7cmV0dXJuIHZvaWQgMD09PWUmJihlPTUwKSx2b2lkIDA9PT1vJiYobz17aXNJbW1lZGlhdGU6ITF9KSxmdW5jdGlvbigpe2Zvcih2YXIgYT1bXSxkPTA7ZDxhcmd1bWVudHMubGVuZ3RoO2QrKylhW2RdPWFyZ3VtZW50c1tkXTt2YXIgbj10aGlzLG09by5pc0ltbWVkaWF0ZSYmdm9pZCAwPT09dDt2b2lkIDAhPT10JiZjbGVhclRpbWVvdXQodCksdD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dD12b2lkIDAsby5pc0ltbWVkaWF0ZXx8aS5hcHBseShuLGEpfSxlKSxtJiZpLmFwcGx5KG4sYSl9fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoaHRtbDogc3RyaW5nKTogSFRNTEVsZW1lbnQgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ3RleHQvaHRtbCcpLmJvZHkuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGExMXljbGljayAtIEVhc2lseSBoYW5kbGUga2V5Ym9hcmQgY2xpY2sgZXZlbnRzIG9uIG5vbiBzZW1hbnRpYyBidXR0b24gZWxlbWVudHMuXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmlua2xlL2ExMXljbGlja1xyXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgQ2xpY2sva2V5Ym9hcmQgZXZlbnQgb2JqZWN0LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvbiBldmVudCB0eXBlIGFuZCBjb2RlLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGExMXlDbGljayA9IGZ1bmN0aW9uKGV2ZW50OiBhbnkpOiBib29sZWFuIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgY29kZSA9IGV2ZW50LmNoYXJDb2RlIHx8IGV2ZW50LmtleUNvZGUsXHJcbiAgICAgICAgdHlwZSA9IGV2ZW50LnR5cGU7XHJcblxyXG4gICAgaWYgKHR5cGUgPT09ICdjbGljaycpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2tleWRvd24nKSB7XHJcbiAgICAgICAgaWYgKGNvZGUgPT09IDMyIHx8IGNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vLyBDcm9zcyBicm93c2VyIGN1c3RvbSBldmVudFxyXG4vLyBTb21lIGNvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2h5c3RydWsvY3VzdG9tLWV2ZW50LWpzXHJcbmV4cG9ydCBjb25zdCBjcm9zc0N1c3RvbUV2ZW50ID0gKGV2ZW50OiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XHJcbiAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcblxyXG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZCB9O1xyXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcclxuXHJcbiAgICByZXR1cm4gZXZ0O1xyXG59XHJcblxyXG4vLyBDaGVja3MgaWYgdmFsdWUgaXMgYW4gaW50ZWdlclxyXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9OdW1iZXIvaXNJbnRlZ2VyI1BvbHlmaWxsXHJcbmV4cG9ydCBjb25zdCBpc0ludGVnZXIgPSAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmXHJcbiAgICBpc0Zpbml0ZSh2YWx1ZSkgJiZcclxuICAgIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcclxufTsiLCJpbXBvcnQgJ2NvcmUtanMvZXMvb2JqZWN0L2Fzc2lnbic7XHJcbmltcG9ydCAnY29yZS1qcy9lcy9zeW1ib2wvaXRlcmF0b3InO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ3RzLWRlYm91bmNlJztcclxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgYTExeUNsaWNrLCBjcm9zc0N1c3RvbUV2ZW50LCBpc0ludGVnZXIgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0ICcuL2luZGV4LmNzcyc7XHJcblxyXG5pbnRlcmZhY2UgT3B0aW9ucyB7XHJcbiAgICBjb250YWluZXI6IGJvb2xlYW4sXHJcbiAgICBuYXZCdG5zOiBib29sZWFuLFxyXG4gICAgcHJldkJ0bjogSFRNTEVsZW1lbnQgfCBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PiB8IE5vZGVMaXN0LFxyXG4gICAgbmV4dEJ0bjogSFRNTEVsZW1lbnQgfCBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PiB8IE5vZGVMaXN0LFxyXG4gICAgZG90czogYm9vbGVhbixcclxuICAgIGFkYXB0aXZlSGVpZ2h0OiBib29sZWFuLFxyXG4gICAgc2tpcEJ0bjogYm9vbGVhbixcclxuICAgIGl0ZW1zOiBudW1iZXIgfCBmYWxzZVxyXG59XHJcblxyXG5pbnRlcmZhY2UgQWN0aXZlVmlzaWJsZVNsaWRlcyB7XHJcbiAgICAodmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSwgYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50KTogdm9pZDtcclxufVxyXG5cclxuZW51bSBTbGlkZURpcmVjdGlvbiB7XHJcbiAgICBQcmV2LFxyXG4gICAgTmV4dFxyXG59XHJcblxyXG5lbnVtIFNsaWRlclN0YXRlIHtcclxuICAgIEVuYWJsZWQsXHJcbiAgICBEaXNhYmxlZFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBMTFZU2xpZGVyIHtcclxuICAgIHByaXZhdGUgX2FjdGl2ZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92aXNpYmxlQ2xhc3M6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2RvdHNDbGFzczogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2xpZGVyQ2xhc3M6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2hhc0N1c3RvbUJ0bnM6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9mb2N1c2FibGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkOiBhbnk7XHJcbiAgICBwcml2YXRlIF91cGRhdGVIZWlnaHREZWJvdW5jZWQ6IGFueTtcclxuICAgIHByaXZhdGUgX3VwZGF0ZVNjcm9sbFBvc2l0aW9uOiBhbnk7XHJcbiAgICBwdWJsaWMgc2xpZGVyOiBIVE1MRWxlbWVudDtcclxuICAgIHB1YmxpYyBzbGlkZXM6IEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+O1xyXG4gICAgcHVibGljIGRvdHM6IEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIHB1YmxpYyBhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgdmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXTtcclxuICAgIHB1YmxpYyBzbGlkZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gICAgcHVibGljIG9wdGlvbnM6IE9wdGlvbnM7XHJcbiAgICBwdWJsaWMgc2xpZGVyRW5hYmxlZDogU2xpZGVyU3RhdGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiBPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuc2xpZGVzID0gZWxlbWVudC5jaGlsZHJlbiBhcyBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PjtcclxuICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJzxkaXYgY2xhc3M9XCJhMTF5LXNsaWRlci1jb250YWluZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVDbGFzcyA9ICdhMTF5LXNsaWRlci1hY3RpdmUnO1xyXG4gICAgICAgIHRoaXMuX3Zpc2libGVDbGFzcyA9ICdhMTF5LXNsaWRlci12aXNpYmxlJztcclxuICAgICAgICB0aGlzLl9kb3RzQ2xhc3MgPSAnYTExeS1zbGlkZXItZG90cyc7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyQ2xhc3MgPSAnYTExeS1zbGlkZXInO1xyXG4gICAgICAgIHRoaXMuX2ZvY3VzYWJsZSA9ICdhLCBhcmVhLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgYnV0dG9uLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsICpbdGFiaW5kZXhdLCAqW2NvbnRlbnRlZGl0YWJsZV0nO1xyXG4gICAgICAgIHRoaXMuZG90cyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IHRoaXMuc2xpZGVzWzBdO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZVNsaWRlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9IFNsaWRlclN0YXRlLkRpc2FibGVkO1xyXG4gICAgICAgIHRoaXMuX2hhc0N1c3RvbUJ0bnMgPSBvcHRpb25zICYmIG9wdGlvbnMucHJldkJ0biB8fCBvcHRpb25zICYmIG9wdGlvbnMubmV4dEJ0biA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lcjogdHJ1ZSxcclxuICAgICAgICAgICAgbmF2QnRuczogdHJ1ZSxcclxuICAgICAgICAgICAgcHJldkJ0bjogb3B0aW9ucyAmJiBvcHRpb25zLnByZXZCdG4gfHwgY3JlYXRlRWxlbWVudCgnPGJ1dHRvbiBjbGFzcz1cImExMXktc2xpZGVyLXByZXZcIj5QcmV2aW91cyBzbGlkZTwvYnV0dG9uPicpLFxyXG4gICAgICAgICAgICBuZXh0QnRuOiBvcHRpb25zICYmIG9wdGlvbnMubmV4dEJ0biB8fCBjcmVhdGVFbGVtZW50KCc8YnV0dG9uIGNsYXNzPVwiYTExeS1zbGlkZXItbmV4dFwiPk5leHQgc2xpZGU8L2J1dHRvbj4nKSxcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBza2lwQnRuOiB0cnVlLFxyXG4gICAgICAgICAgICBpdGVtczogZmFsc2VcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZXQgdXNlci1pbnB1dHRlZCBvcHRpb25zIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQmluZGluZ1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZVByZXYgPSB0aGlzLl9oYW5kbGVQcmV2LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlTmV4dCA9IHRoaXMuX2hhbmRsZU5leHQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZURlYm91bmNlZCA9IGRlYm91bmNlKHRoaXMuX2NoZWNrU2hvdWxkRW5hYmxlLmJpbmQodGhpcyksIDI1MCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlSGVpZ2h0RGVib3VuY2VkID0gZGVib3VuY2UodGhpcy5fdXBkYXRlSGVpZ2h0LmJpbmQodGhpcyksIDI1MCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlU2Nyb2xsUG9zaXRpb24gPSBkZWJvdW5jZSgoKSA9PiB0aGlzLnNjcm9sbFRvU2xpZGUodGhpcy5hY3RpdmVTbGlkZSksIDI1MCk7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlU2Nyb2xsID0gZGVib3VuY2UodGhpcy5faGFuZGxlU2Nyb2xsLmJpbmQodGhpcyksIDE1MCk7IC8vIE1heSBmaXJlIHR3aWNlIGRlcGVuZGluZyBvbiBicm93c2VyXHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgc2xpZGVyXHJcbiAgICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXQoKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNsaWRlciBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgZGVwZW5kaW5nIG9uIHNsaWRlcyBzaG93blxyXG4gICAgICAgIHRoaXMuX2NoZWNrU2hvdWxkRW5hYmxlKCk7XHJcblxyXG4gICAgICAgIC8vIEVuYWJsZS9kaXNhYmxlIHNsaWRlciBhZnRlciByZXNpemVcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fY2hlY2tTaG91bGRFbmFibGVEZWJvdW5jZWQpO1xyXG5cclxuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdpbml0Jywge1xyXG4gICAgICAgICAgICBhMTF5U2xpZGVyOiB0aGlzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hlY2tTaG91bGRFbmFibGUoKSB7XHJcbiAgICAgICAgbGV0IHNob3VsZEVuYWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIElmIDEgb3IgbGVzcyBzbGlkZXMgZXhpc3QgdGhlbiBhIHNsaWRlciBpcyBub3QgbmVlZGVkXHJcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzLmxlbmd0aCA8PSAxKSBzaG91bGRFbmFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIHNsaWRlcyBvdXRzaWRlIHRoZSBzbGlkZXIncyB2aWV3cG9ydCBhIHNsaWRlciBpcyBub3QgbmVlZGVkXHJcbiAgICAgICAgdGhpcy5fZ2V0QWN0aXZlQW5kVmlzaWJsZSgodmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmlzaWJsZVNsaWRlcy5sZW5ndGggPT09IHRoaXMuc2xpZGVzLmxlbmd0aCkgc2hvdWxkRW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIElmIHVzZXIgZXhwbGljaXRseSBzZXQgaXRlbXMgdG8gYmUgc2hvd24gYW5kIGl0J3MgdGhlIHNhbWUgbnVtYmVyIGFzIGF2YWlsYWJsZVxyXG4gICAgICAgIGlmICh0aGlzLnNsaWRlcy5sZW5ndGggPT09IHRoaXMub3B0aW9ucy5pdGVtcykgc2hvdWxkRW5hYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEVuYWJsZS9kaXNhYmxlIHNsaWRlciBiYXNlZCBvbiBhYm92ZSByZXF1aXJlbWVudHNcclxuICAgICAgICBpZiAoc2hvdWxkRW5hYmxlICYmIHRoaXMuc2xpZGVyRW5hYmxlZCA9PT0gU2xpZGVyU3RhdGUuRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZW5hYmxlU2xpZGVyKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghc2hvdWxkRW5hYmxlICYmIHRoaXMuc2xpZGVyRW5hYmxlZCA9PT0gU2xpZGVyU3RhdGUuRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlU2xpZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAvLyBFbmFibGUgYWxsIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBzbGlkZXIuIFNob3VsZCBtaXJyb3IgX2Rpc2FibGVTbGlkZXIoKVxyXG4gICAgcHJpdmF0ZSBfZW5hYmxlU2xpZGVyKCkge1xyXG4gICAgICAgIC8vIFNldCBzbGlkZXIgdG8gZW5hYmxlZFxyXG4gICAgICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9IFNsaWRlclN0YXRlLkVuYWJsZWQ7XHJcblxyXG4gICAgICAgIC8vIEFkZCBzbGlkZXIgY29udGFpbmVyIHRvIERPTSBhbmQgbW92ZSBzbGlkZXIgaW50byBpdCBpZiBlbmFibGVkXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRoaXMuc2xpZGVyQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgdGhpcy5zbGlkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIHNraXAgYnV0dG9uIGJlZm9yZSBzbGlkZXIgaWYgZW5hYmxlZFxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2tpcEJ0bikgdGhpcy5fYWRkU2tpcEJ0bigpO1xyXG5cclxuICAgICAgICAvLyBJZiBwcmV2L25leHQgYnV0dG9ucyBhcmUgZW5hYmxlZCBhbmQgdXNlciBpc24ndCB1c2luZyB0aGVpciBvd24gYWRkIGl0IHRvIHRoZSBET01cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm5hdkJ0bnMgJiYgIXRoaXMuX2hhc0N1c3RvbUJ0bnMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcmV2QnRuIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCB0aGlzLm9wdGlvbnMucHJldkJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubmV4dEJ0biBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5vcHRpb25zLm5leHRCdG4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUT0RPOiBNb3ZlIGFkZC9yZW1vdmFsIG9mIGJ1dHRvbnMgaW50byBpdCdzIG93biBmdW5jdGlvblxyXG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHByZXYvbmV4dCBidXR0b25zLiBQb3NzaWJsZSBmb3IgdGhlcmUgdG8gYmUgbXVsdGlwbGUgc28gbmVlZCB0byBsb29wIHRocm91Z2ggdGhlbSBhbGxcclxuICAgICAgICBjb25zdCBwcmV2QnRucyA9IHRoaXMub3B0aW9ucy5wcmV2QnRuIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBbdGhpcy5vcHRpb25zLnByZXZCdG5dIDogdGhpcy5vcHRpb25zLnByZXZCdG47XHJcbiAgICAgICAgY29uc3QgbmV4dEJ0bnMgPSB0aGlzLm9wdGlvbnMubmV4dEJ0biBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gW3RoaXMub3B0aW9ucy5uZXh0QnRuXSA6IHRoaXMub3B0aW9ucy5uZXh0QnRuO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBwcmV2QnRuIG9mIHByZXZCdG5zKSB7XHJcbiAgICAgICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVQcmV2LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVQcmV2LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBuZXh0QnRuIG9mIG5leHRCdG5zKSB7XHJcbiAgICAgICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVOZXh0LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVOZXh0LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgZG90IG5hdmlnYXRpb24gaWYgZW5hYmxlZFxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZG90cykgdGhpcy5fZ2VuZXJhdGVEb3RzKCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lciBmb3Igd2hlbiB0aGUgc2xpZGVyIHN0b3BzIG1vdmluZ1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2hhbmRsZVNjcm9sbCwgZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBBZGQgYWxsIENTUyBuZWVkZWRcclxuICAgICAgICB0aGlzLl9zZXRDU1MoKTtcclxuXHJcbiAgICAgICAgLy8gQWRhcHRpdmUgaGVpZ2h0XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgc2xpZGVyJ3MgaGVpZ2h0IGJhc2VkIG9uIGNvbnRlbnQgb2Ygc2xpZGVcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGVpZ2h0KHRoaXMuYWN0aXZlU2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWxzbyBhZGQgcmVzaXplIGxpc3RlbmVyIGZvciBpdFxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlSGVpZ2h0RGVib3VuY2VkLmJpbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT24gcmVzaXplIG1ha2Ugc3VyZSB0byB1cGRhdGUgc2Nyb2xsIHBvc2l0aW9uIGFzIGNvbnRlbnQgbWF5IGNoYW5nZSBpbiB3aWR0aC9oZWlnaHRcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlU2Nyb2xsUG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERpc2FibGUgYWxsIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBzbGlkZXIuIFNob3VsZCBtaXJyb3IgX2VuYWJsZVNsaWRlcigpXHJcbiAgICBwcml2YXRlIF9kaXNhYmxlU2xpZGVyKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9IFNsaWRlclN0YXRlLkRpc2FibGVkO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgc2xpZGVyIGZyb20gYTExeS1zbGlkZXIncyBjb250YWluZXIgYW5kIHRoZW4gcmVtb3ZlIGNvbnRhaW5lciBmcm9tIERPTVxyXG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHRoaXMuc2xpZGVyQ29udGFpbmVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5zbGlkZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZCh0aGlzLnNsaWRlckNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgc2tpcCBidXR0b25cclxuICAgICAgICB0aGlzLl9yZW1vdmVTa2lwQnRuKCk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgZm9yIHByZXYvbmV4dCBidXR0b25zXHJcbiAgICAgICAgLy8gUG9zc2libGUgZm9yIHRoZXJlIHRvIGJlIG11bHRpcGxlIHNvIG5lZWQgdG8gbG9vcCB0aHJvdWdoIHRoZW0gYWxsXHJcbiAgICAgICAgY29uc3QgcHJldkJ0bnMgPSB0aGlzLm9wdGlvbnMucHJldkJ0biBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gW3RoaXMub3B0aW9ucy5wcmV2QnRuXSA6IHRoaXMub3B0aW9ucy5wcmV2QnRuO1xyXG4gICAgICAgIGNvbnN0IG5leHRCdG5zID0gdGhpcy5vcHRpb25zLm5leHRCdG4gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA/IFt0aGlzLm9wdGlvbnMubmV4dEJ0bl0gOiB0aGlzLm9wdGlvbnMubmV4dEJ0bjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcHJldkJ0biBvZiBwcmV2QnRucykge1xyXG4gICAgICAgICAgICBwcmV2QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlUHJldik7XHJcbiAgICAgICAgICAgIHByZXZCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVQcmV2KTtcclxuXHJcbiAgICAgICAgICAgIC8vIE9ubHkgcmVtb3ZlIGdlbmVyYXRlZCBidXR0b25zLCBub3QgdXNlci1kZWZpbmVkIG9uZXNcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNDdXN0b21CdG5zKSBwcmV2QnRuLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKHByZXZCdG4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgbmV4dEJ0biBvZiBuZXh0QnRucykge1xyXG4gICAgICAgICAgICBuZXh0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlTmV4dCk7XHJcbiAgICAgICAgICAgIG5leHRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVOZXh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIE9ubHkgcmVtb3ZlIGdlbmVyYXRlZCBidXR0b25zLCBub3QgdXNlci1kZWZpbmVkIG9uZXNcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNDdXN0b21CdG5zKSBuZXh0QnRuLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKG5leHRCdG4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gV2lsbCByZW1vdmUgZG90cyBpZiB0aGV5IGV4aXN0XHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlRG90cygpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXIgZm9yIHdoZW4gdGhlIHNsaWRlciBzdG9wcyBtb3ZpbmdcclxuICAgICAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9oYW5kbGVTY3JvbGwsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBDU1NcclxuICAgICAgICB0aGlzLl9yZW1vdmVDU1MoKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBhZGFwdGl2ZSBoZWlnaHQgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUhlaWdodChmYWxzZSk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3VwZGF0ZUhlaWdodERlYm91bmNlZCk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBzY3JvbGwgcG9zaXRpb24gdXBkYXRlIGNoZWNrXHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3VwZGF0ZVNjcm9sbFBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgYWxsIENTUyBuZWVkZWQgZm9yIHRoZSBzbGlkZXIuIFNob3VsZCBtaXJyb3IgX3JlbW92ZUNTUygpXHJcbiAgICBwcml2YXRlIF9zZXRDU1MoKSB7XHJcbiAgICAgICAgLy8gVXBkYXRlIGl0ZW1zXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlSXRlbXNDU1MoKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHNsaWRlciBpbnN0YW5jZSB0byBnZXQgdGhlIGNvcnJlY3QgZWxlbWVudHNcclxuICAgICAgICB0aGlzLl9nZXRBY3RpdmVBbmRWaXNpYmxlKCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBtYWluIHNsaWRlciBjbGFzcyBpZiBpdCBkb2Vzbid0IGhhdmUgaXQgYWxyZWFkeVxyXG4gICAgICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5hZGQodGhpcy5fc2xpZGVyQ2xhc3MpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCB0aGUgbW9yZSBkeW5hbWljIENTUyBmaXJzdCBpZiBpdCBleGlzdHNcclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcykge1xyXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2FjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl92aXNpYmxlQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIGluIGFjdGl2ZSBjbGFzc2VzXHJcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZS5jbGFzc0xpc3QuYWRkKHRoaXMuX2FjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGluIHZpc2libGUgY2xhc3Nlc1xyXG4gICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRoaXMudmlzaWJsZVNsaWRlcykge1xyXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKHRoaXMuX3Zpc2libGVDbGFzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUcmlnZ2VyIGRvdCB1cGRhdGVcclxuICAgICAgICB0aGlzLl91cGRhdGVEb3RzKHRoaXMuYWN0aXZlU2xpZGUpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgYWxsIGExMXkgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgIHRoaXMuX2FkZEZvY3VzYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBhbGwgQ1NTIG5lZWRlZCBmb3IgdGhlIHNsaWRlci4gU2hvdWxkIG1pcnJvciBfc2V0Q1NTKClcclxuICAgIHByaXZhdGUgX3JlbW92ZUNTUygpIHtcclxuICAgICAgICAvLyBSZW1vdmUgaXRlbSBDU1MgaWYgaXQgd2FzIHNldFxyXG4gICAgICAgIHRoaXMuX3JlbW92ZUl0ZW1zQ1NTKCk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBjbGFzcyB0byBzbGlkZXJcclxuICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NsaWRlckNsYXNzKTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgYWxsIHRoZSBkeW5hbWljIGNsYXNzZXNcclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcykge1xyXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2FjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl92aXNpYmxlQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBhMTF5IGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICB0aGlzLl9yZW1vdmVGb2N1c2FibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVJdGVtc0NTUygpIHtcclxuICAgICAgICBpZiAoaXNJbnRlZ2VyKHRoaXMub3B0aW9ucy5pdGVtcykpIHtcclxuICAgICAgICAgICAgLy8gUGVyY2VudGFnZSB3aWR0aCBvZiBlYWNoIHNsaWRlXHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlV2lkdGggPSAxMDAgLyAodGhpcy5vcHRpb25zLml0ZW1zIGFzIG51bWJlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgc3R5bGVzIGZvciBzbGlkZXJcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBzdHlsZXMgZm9yIGl0ZW1zXHJcbiAgICAgICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRoaXMuc2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5zdHlsZS53aWR0aCA9IGAke3NsaWRlV2lkdGh9JWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBSZXNldCBldmVyeXRoaW5nIGlmIG51bWJlciBvZiBpdGVtcyBub3QgZXhwbGljaXRseSBzZXRcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2Rpc3BsYXknKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRoaXMuc2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnd2lkdGgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXNldCBpdGVtIHN0eWxpbmcgZXZlbiBpZiBleHBsaWNpdGx5IHNldCBpbiB0aGUgb3B0aW9uc1xyXG4gICAgcHJpdmF0ZSBfcmVtb3ZlSXRlbXNDU1MoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2Rpc3BsYXknKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGhpcy5zbGlkZXMpIHtcclxuICAgICAgICAgICAgc2xpZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3dpZHRoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE1ha2VzIG9ubHkgdGhlIHZpc2libGUgaXRlbXMgZm9jdXNhYmxlIGFuZCByZWFkYWJsZSBieSBzY3JlZW5yZWFkZXJzLiBTaG91bGQgbWlycm9yIF9yZW1vdmVBMTFZKClcclxuICAgIHByaXZhdGUgX2FkZEZvY3VzYWJsZSgpIHtcclxuICAgICAgICAvLyBSZXNldCBhbGwgYTExeSBmdW5jdGlvbmFsaXR5IHRvIGRlZmF1bHQgYmVmb3JlaGFuZFxyXG4gICAgICAgIHRoaXMuX3JlbW92ZUZvY3VzYWJsZSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBmb2N1c2FibGVJdGVtcyA9IHNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNhYmxlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHNsaWRlIGlzIG5vdCB2aXNpYmxlIG1ha2UgdGhlIHNsaWRlIHdyYXBwZXIgbm90IGZvY3VzYWJsZVxyXG4gICAgICAgICAgICBpZiAoIXNsaWRlLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLl92aXNpYmxlQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZm9jdXNhYmxlSXRlbSBvZiBmb2N1c2FibGVJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzbGlkZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5fdmlzaWJsZUNsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUl0ZW0uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlc2V0IGExMXkgYXR0cmlidXRlcyBmb3Igc2xpZGUgd3JhcHBlci4gU2hvdWxkIG1pcnJvciBfYWRkQTExWSgpXHJcbiAgICBwcml2YXRlIF9yZW1vdmVGb2N1c2FibGUoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGhpcy5zbGlkZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgZm9jdXNhYmxlSXRlbXMgPSBzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzYWJsZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgYTExeSBmb3IgZWFjaCBzbGlkZSB3cmFwcGVyXHJcbiAgICAgICAgICAgIHNsaWRlLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcclxuICAgICAgICAgICAgc2xpZGUucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVzZXQgYTExeSBhdHRyaWJ1dGVzIGZvciBzbGlkZSBpbm5lciBlbGVtZW50c1xyXG4gICAgICAgICAgICBmb3IgKGxldCBmb2N1c2FibGVJdGVtIG9mIGZvY3VzYWJsZUl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICBmb2N1c2FibGVJdGVtLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9hZGRTa2lwQnRuKCkge1xyXG4gICAgICAgIGNvbnN0IGJlZm9yZUVsID0gY3JlYXRlRWxlbWVudChgPGJ1dHRvbiBjbGFzcz1cImExMXktc2xpZGVyLXNyLW9ubHlcIiB0eXBlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCI+Q2xpY2sgdG8gc2tpcCBzbGlkZXIgY2Fyb3VzZWw8L2J1dHRvbj5gKTtcclxuICAgICAgICBjb25zdCBhZnRlckVsID0gY3JlYXRlRWxlbWVudChgPGRpdiBjbGFzcz1cImExMXktc2xpZGVyLXNyLW9ubHlcIiB0YWJpbmRleD1cIi0xXCI+RW5kIG9mIHNsaWRlciBjYXJvdXNlbDwvZGl2PmApO1xyXG5cclxuICAgICAgICAvLyBFdmVudCBoYW5kbGVyIHRvIGdvIHRvIGVuZFxyXG4gICAgICAgIGNvbnN0IGZvY3VzRW5kID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYTExeUNsaWNrKGV2ZW50KSA9PT0gdHJ1ZSkgYWZ0ZXJFbC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIGJlZm9yZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZm9jdXNFbmQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgICAgICBiZWZvcmVFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZvY3VzRW5kLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCB0byBET01cclxuICAgICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgYmVmb3JlRWwpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBhZnRlckVsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9yZW1vdmVTa2lwQnRuKCkge1xyXG4gICAgICAgIGNvbnN0IHNraXBFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ExMXktc2xpZGVyLXNyLW9ubHknKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgc2tpcEVsZW1lbnQgb2Ygc2tpcEVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIGlmIChza2lwRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBza2lwRWxlbWVudC5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZChza2lwRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2VuZXJhdGVEb3RzKCkge1xyXG4gICAgICAgIHRoaXMuZG90cyA9IGNyZWF0ZUVsZW1lbnQoYDx1bCBjbGFzcz1cIiR7dGhpcy5fZG90c0NsYXNzfVwiPjwvdWw+YCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZG90TGkgPSBjcmVhdGVFbGVtZW50KCc8bGk+PC9saT4nKTtcclxuICAgICAgICAgICAgY29uc3QgZG90QnRuID0gY3JlYXRlRWxlbWVudCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+Jyk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgdGV4dFxyXG4gICAgICAgICAgICBkb3RCdG4udGV4dENvbnRlbnQgPSBgTW92ZSBzbGlkZXIgdG8gaXRlbSAjJHtpICsgMX1gO1xyXG5cclxuICAgICAgICAgICAgLy8gRXZlbnQgaGFuZGxlcnMgdG8gc3dpdGNoIHRvIHNsaWRlXHJcbiAgICAgICAgICAgIGNvbnN0IHN3aXRjaFRvU2xpZGUgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYTExeUNsaWNrKGV2ZW50KSA9PT0gdHJ1ZSkgdGhpcy5zY3JvbGxUb1NsaWRlKHRoaXMuc2xpZGVzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgICAgICBkb3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hUb1NsaWRlLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGRvdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHN3aXRjaFRvU2xpZGUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCB0byBVTFxyXG4gICAgICAgICAgICBkb3RMaS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRvdEJ0bik7XHJcbiAgICAgICAgICAgIHRoaXMuZG90cy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRvdExpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgZG90cyBVTCB0byBET01cclxuICAgICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgdGhpcy5kb3RzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9yZW1vdmVEb3RzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvdHMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvdHMucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQodGhpcy5kb3RzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlRG90cyhhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5kb3RzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGFjdGl2ZVNsaWRlLnBhcmVudE5vZGUhLmNoaWxkcmVuLCBhY3RpdmVTbGlkZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNldCBjaGlsZHJlbiBhY3RpdmUgY2xhc3MgaWYgZXhpc3RcclxuICAgICAgICAgICAgZm9yIChsZXQgZG90IG9mIHRoaXMuZG90cy5jaGlsZHJlbikgZG90LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpIS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBjbGFzcyB0byBhY3RpdmUgZG90XHJcbiAgICAgICAgICAgIHRoaXMuZG90cy5jaGlsZHJlblthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvcignYnV0dG9uJykhLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nb1ByZXZPck5leHQoZGlyZWN0aW9uOiBTbGlkZURpcmVjdGlvbikge1xyXG4gICAgICAgIHRoaXMuX2dldEFjdGl2ZUFuZFZpc2libGUoKHZpc2libGVTbGlkZXM6IEhUTUxFbGVtZW50W10sIGFjdGl2ZVNsaWRlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdFNsaWRlID0gdGhpcy5zbGlkZXIuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTbGlkZSA9IHRoaXMuc2xpZGVyLmxhc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0VmlzaWJsZVNsaWRlID0gdmlzaWJsZVNsaWRlc1swXTtcclxuICAgICAgICAgICAgY29uc3QgbGFzdFZpc2libGVTbGlkZSA9IHZpc2libGVTbGlkZXNbdmlzaWJsZVNsaWRlcy5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFNsaWRlRGlyZWN0aW9uLk5leHQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFdyYXAgdG8gdGhlIGZpcnN0IHNsaWRlIGlmIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgbGFzdFxyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RWaXNpYmxlU2xpZGUgPT09IGxhc3RTbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9TbGlkZShmaXJzdFNsaWRlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NsaWRlKGFjdGl2ZVNsaWRlIS5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gU2xpZGVEaXJlY3Rpb24uUHJldikge1xyXG4gICAgICAgICAgICAgICAgLy8gV3JhcCB0byB0aGUgbGFzdCBzbGlkZSBpZiB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIGZpcnN0XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RWaXNpYmxlU2xpZGUgPT09IGZpcnN0U2xpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvU2xpZGUobGFzdFNsaWRlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NsaWRlKGFjdGl2ZVNsaWRlIS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzY3JvbGxUb1NsaWRlKHRhcmdldFNsaWRlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IG1vZGVybkJyb3dzZXI6IGJvb2xlYW4gPSAhIUhUTUxFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxUbztcclxuXHJcbiAgICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50XHJcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnYmVmb3JlQ2hhbmdlJywge1xyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGU6IHRoaXMuYWN0aXZlU2xpZGUsXHJcbiAgICAgICAgICAgIG5leHRTbGlkZTogdGFyZ2V0U2xpZGUsXHJcbiAgICAgICAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHNsaWRlcidzIGhlaWdodCBiYXNlZCBvbiBjb250ZW50IG9mIHNsaWRlXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSkgdGhpcy5fdXBkYXRlSGVpZ2h0KHRhcmdldFNsaWRlKTtcclxuXHJcbiAgICAgICAgLy8gTW92ZSBzbGlkZXIgdG8gc3BlY2lmaWMgaXRlbVxyXG4gICAgICAgIGlmIChtb2Rlcm5Ccm93c2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnNjcm9sbCh7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiB0YXJnZXRTbGlkZS5vZmZzZXRMZWZ0LFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgPSB0YXJnZXRTbGlkZS5vZmZzZXRMZWZ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVHJpZ2dlciBkb3QgdXBkYXRlXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRG90cyh0YXJnZXRTbGlkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBlbGVtZW50IGlzIHBhc3NlZCBzbGlkZXIncyBoZWlnaHQgd2lsbCBtYXRjaFxyXG4gICAgICogIGl0IG90aGVyd2lzZSB0aGUgaGVpZ2h0IG9mIHRoZSBzbGlkZXIgaXMgcmVtb3ZlZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdXBkYXRlSGVpZ2h0KHRhcmdldDogSFRNTEVsZW1lbnQgfCBmYWxzZSkge1xyXG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRIZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5oZWlnaHQgPSBgJHt0YXJnZXRIZWlnaHR9cHhgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLmhlaWdodCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRBY3RpdmVBbmRWaXNpYmxlKGNhbGxiYWNrPzogQWN0aXZlVmlzaWJsZVNsaWRlcykge1xyXG4gICAgICAgIGxldCB2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdID0gW107XHJcblxyXG4gICAgICAgIC8vIE9ubHkgZGV0ZWN0cyBpdGVtcyBpbiB0aGUgdmlzaWJsZSB2aWV3cG9ydCBvZiB0aGUgcGFyZW50IGVsZW1lbnRcclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBzbGlkZXJXaWR0aCA9IHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICBjb25zdCBzbGlkZXJQb3NpdGlvbiA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlT2Zmc2V0ID0gc2xpZGUub2Zmc2V0TGVmdDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzbGlkZU9mZnNldCA+PSBzbGlkZXJQb3NpdGlvbiAmJiBzbGlkZU9mZnNldCA8IChzbGlkZXJQb3NpdGlvbiArIHNsaWRlcldpZHRoKSkge1xyXG4gICAgICAgICAgICAgICAgdmlzaWJsZVNsaWRlcy5wdXNoKHNsaWRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52aXNpYmxlU2xpZGVzID0gdmlzaWJsZVNsaWRlcztcclxuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdmlzaWJsZVNsaWRlc1swXTtcclxuXHJcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sodGhpcy52aXNpYmxlU2xpZGVzLCB0aGlzLmFjdGl2ZVNsaWRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oYW5kbGVQcmV2KGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmIChhMTF5Q2xpY2soZXZlbnQpID09PSB0cnVlKSB0aGlzLl9nb1ByZXZPck5leHQoU2xpZGVEaXJlY3Rpb24uUHJldik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaGFuZGxlTmV4dChldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAoYTExeUNsaWNrKGV2ZW50KSA9PT0gdHJ1ZSkgdGhpcy5fZ29QcmV2T3JOZXh0KFNsaWRlRGlyZWN0aW9uLk5leHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2hhbmRsZVNjcm9sbCgpIHtcclxuICAgICAgICAvLyBVcGRhdGUgQ1NTXHJcbiAgICAgICAgdGhpcy5fc2V0Q1NTKCk7XHJcblxyXG4gICAgICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudFxyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2FmdGVyQ2hhbmdlJywge1xyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGU6IHRoaXMuYWN0aXZlU2xpZGUsXHJcbiAgICAgICAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBkZXRhaWw6IG9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gY3Jvc3NDdXN0b21FdmVudChldmVudE5hbWUsIHsgZGV0YWlsIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlci5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE51a2UgdGhlIHNsaWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgICAgICAvLyBVbmRvcyBldmVyeXRoaW5nIGZyb20gX2VuYWJsZVNsaWRlcigpXHJcbiAgICAgICAgdGhpcy5fZGlzYWJsZVNsaWRlcigpO1xyXG5cclxuICAgICAgICAvLyBVbmRvcyBldmVyeXRoaW5nIGZyb20gaW5pdCgpXHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50XHJcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnZGVzdHJveScsIHtcclxuICAgICAgICAgICAgYTExeVNsaWRlcjogdGhpc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbImdsb2JhbCIsInJlcXVpcmUkJDAiLCJkb2N1bWVudCIsIkRFU0NSSVBUT1JTIiwiY3JlYXRlRWxlbWVudCIsIklFOF9ET01fREVGSU5FIiwiZGVmaW5lUHJvcGVydHlNb2R1bGUiLCJTeW1ib2wiLCJOQVRJVkVfU1lNQk9MIiwid3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSIsImNsYXNzb2YiLCJJbmRleGVkT2JqZWN0IiwicHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUiLCJuYXRpdmVGdW5jdGlvblRvU3RyaW5nIiwiV2Vha01hcCIsImhhcyIsIk5BVElWRV9XRUFLX01BUCIsInN0b3JlIiwib2JqZWN0SGFzIiwiSW50ZXJuYWxTdGF0ZU1vZHVsZSIsIm1pbiIsImhpZGRlbktleXMiLCJpbnRlcm5hbE9iamVjdEtleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiaXNGb3JjZWQiLCIkIiwiYXNzaWduIiwiY3JlYXRlTWV0aG9kIiwiQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSIiwiZ2V0UHJvdG90eXBlT2YiLCJJRV9QUk9UTyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiY3JlYXRlIiwiSXRlcmF0b3JzQ29yZSIsIkJVR0dZX1NBRkFSSV9JVEVSQVRPUlMiLCJJVEVSQVRPUiIsInJldHVyblRoaXMiLCJzZXRQcm90b3R5cGVPZiIsInNldEludGVybmFsU3RhdGUiLCJnZXRJbnRlcm5hbFN0YXRlIiwiVE9fU1RSSU5HX1RBRyIsIkFycmF5SXRlcmF0b3JNZXRob2RzIiwiRE9NSXRlcmFibGVzIiwiaHRtbCIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImJvZHkiLCJmaXJzdENoaWxkIiwiYTExeUNsaWNrIiwiZXZlbnQiLCJjb2RlIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwidHlwZSIsInByZXZlbnREZWZhdWx0IiwiY3Jvc3NDdXN0b21FdmVudCIsInBhcmFtcyIsImV2dCIsImNyZWF0ZUV2ZW50IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJkZXRhaWwiLCJ1bmRlZmluZWQiLCJpbml0Q3VzdG9tRXZlbnQiLCJpc0ludGVnZXIiLCJ2YWx1ZSIsImlzRmluaXRlIiwiTWF0aCIsImZsb29yIiwiU2xpZGVEaXJlY3Rpb24iLCJTbGlkZXJTdGF0ZSIsIkExMVlTbGlkZXIiLCJlbGVtZW50Iiwib3B0aW9ucyIsInNsaWRlciIsInNsaWRlcyIsImNoaWxkcmVuIiwic2xpZGVyQ29udGFpbmVyIiwiX2FjdGl2ZUNsYXNzIiwiX3Zpc2libGVDbGFzcyIsIl9kb3RzQ2xhc3MiLCJfc2xpZGVyQ2xhc3MiLCJfZm9jdXNhYmxlIiwiZG90cyIsImFjdGl2ZVNsaWRlIiwidmlzaWJsZVNsaWRlcyIsInNsaWRlckVuYWJsZWQiLCJEaXNhYmxlZCIsIl9oYXNDdXN0b21CdG5zIiwicHJldkJ0biIsIm5leHRCdG4iLCJjb250YWluZXIiLCJuYXZCdG5zIiwiYWRhcHRpdmVIZWlnaHQiLCJza2lwQnRuIiwiaXRlbXMiLCJPYmplY3QiLCJfaGFuZGxlUHJldiIsImJpbmQiLCJfaGFuZGxlTmV4dCIsIl9jaGVja1Nob3VsZEVuYWJsZURlYm91bmNlZCIsImRlYm91bmNlIiwiX2NoZWNrU2hvdWxkRW5hYmxlIiwiX3VwZGF0ZUhlaWdodERlYm91bmNlZCIsIl91cGRhdGVIZWlnaHQiLCJfdXBkYXRlU2Nyb2xsUG9zaXRpb24iLCJzY3JvbGxUb1NsaWRlIiwiX2hhbmRsZVNjcm9sbCIsIl9pbml0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9kaXNwYXRjaEV2ZW50IiwiYTExeVNsaWRlciIsInNob3VsZEVuYWJsZSIsImxlbmd0aCIsIl9nZXRBY3RpdmVBbmRWaXNpYmxlIiwiX2VuYWJsZVNsaWRlciIsIkVuYWJsZWQiLCJfZGlzYWJsZVNsaWRlciIsImluc2VydEFkamFjZW50RWxlbWVudCIsIl9hZGRTa2lwQnRuIiwiSFRNTEVsZW1lbnQiLCJwcmV2QnRucyIsIm5leHRCdG5zIiwicGFzc2l2ZSIsIl9nZW5lcmF0ZURvdHMiLCJfc2V0Q1NTIiwiY29udGFpbnMiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJfcmVtb3ZlU2tpcEJ0biIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfcmVtb3ZlRG90cyIsIl9yZW1vdmVDU1MiLCJfdXBkYXRlSXRlbXNDU1MiLCJjbGFzc0xpc3QiLCJhZGQiLCJzbGlkZSIsInJlbW92ZSIsIl91cGRhdGVEb3RzIiwiX2FkZEZvY3VzYWJsZSIsIl9yZW1vdmVJdGVtc0NTUyIsIl9yZW1vdmVGb2N1c2FibGUiLCJzbGlkZVdpZHRoIiwic3R5bGUiLCJkaXNwbGF5Iiwid2lkdGgiLCJyZW1vdmVQcm9wZXJ0eSIsImZvY3VzYWJsZUl0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsInNldEF0dHJpYnV0ZSIsImZvY3VzYWJsZUl0ZW0iLCJyZW1vdmVBdHRyaWJ1dGUiLCJiZWZvcmVFbCIsImFmdGVyRWwiLCJmb2N1c0VuZCIsImZvY3VzIiwic2tpcEVsZW1lbnRzIiwic2tpcEVsZW1lbnQiLCJpIiwiZG90TGkiLCJkb3RCdG4iLCJ0ZXh0Q29udGVudCIsInN3aXRjaFRvU2xpZGUiLCJhY3RpdmVJbmRleCIsIkFycmF5IiwicHJvdG90eXBlIiwiaW5kZXhPZiIsImNhbGwiLCJkb3QiLCJxdWVyeVNlbGVjdG9yIiwiZGlyZWN0aW9uIiwiZmlyc3RTbGlkZSIsImZpcnN0RWxlbWVudENoaWxkIiwibGFzdFNsaWRlIiwibGFzdEVsZW1lbnRDaGlsZCIsImZpcnN0VmlzaWJsZVNsaWRlIiwibGFzdFZpc2libGVTbGlkZSIsIk5leHQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJQcmV2IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInRhcmdldFNsaWRlIiwibW9kZXJuQnJvd3NlciIsInNjcm9sbFRvIiwiY3VycmVudFNsaWRlIiwibmV4dFNsaWRlIiwic2Nyb2xsIiwibGVmdCIsIm9mZnNldExlZnQiLCJiZWhhdmlvciIsInNjcm9sbExlZnQiLCJ0YXJnZXQiLCJ0YXJnZXRIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJoZWlnaHQiLCJjYWxsYmFjayIsInNsaWRlcldpZHRoIiwiY2xpZW50V2lkdGgiLCJzbGlkZXJQb3NpdGlvbiIsInNsaWRlT2Zmc2V0IiwicHVzaCIsIl9nb1ByZXZPck5leHQiLCJldmVudE5hbWUiLCJkaXNwYXRjaEV2ZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO0FBQ2pCLElBQUksS0FBSyxHQUFHLFVBQVUsRUFBRSxFQUFFO0VBQ3hCLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztDQUNwQyxDQUFDOzs7QUFHRixZQUFjOztFQUVaLEtBQUssQ0FBQyxPQUFPLFVBQVUsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDO0VBQzNDLEtBQUssQ0FBQyxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDO0VBQ25DLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO0VBQy9CLEtBQUssQ0FBQyxPQUFPQSxjQUFNLElBQUksQ0FBQyxJQUFJQSxjQUFNLENBQUM7O0VBRW5DLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDOztBQ2I1QixRQUFjLEdBQUdDLFFBQThCLENBQUM7O0FDQWhELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7O0FBRXZDLE9BQWMsR0FBRyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUU7RUFDbEMsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUNyQyxDQUFDOztBQ0pGLFNBQWMsR0FBRyxVQUFVLElBQUksRUFBRTtFQUMvQixJQUFJO0lBQ0YsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDakIsQ0FBQyxPQUFPLEtBQUssRUFBRTtJQUNkLE9BQU8sSUFBSSxDQUFDO0dBQ2I7Q0FDRixDQUFDOztBQ0pGO0FBQ0EsZUFBYyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVk7RUFDbEMsT0FBTyxNQUFNLENBQUMsY0FB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
