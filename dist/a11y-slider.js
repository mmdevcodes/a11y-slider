
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.A11YSlider = factory());
}(this, function () { 'use strict';

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

	return A11YSlider;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYTExeS1zbGlkZXIuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcGF0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtc3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dyYXBwZWQtd2VsbC1rbm93bi1zeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tdG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pbmNsdWRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3duLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2h0bWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3RzLWRlYm91bmNlL2Rpc3Qvc3JjL2luZGV4LmpzIiwiLi4vc3JjL3V0aWxzLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBPID0gJ29iamVjdCc7XG52YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSBPICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gTyAmJiB3aW5kb3cpIHx8XG4gIGNoZWNrKHR5cGVvZiBzZWxmID09IE8gJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSBPICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xuXG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0ZUVsZW1lbnQoJ2RpdicpLCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH1cbiAgfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG4vLyBgVG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIFBSRUZFUlJFRF9TVFJJTkcpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGlucHV0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcblxudmFyIG5hdGl2ZURlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgaGlkZShnbG9iYWwsIGtleSwgdmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgc2V0R2xvYmFsKFNIQVJFRCwge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuMi4xJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE5IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJyArIFN0cmluZyhrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5KSArICcpXycgKyAoKytpZCArIHBvc3RmaXgpLnRvU3RyaW5nKDM2KTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gQ2hyb21lIDM4IFN5bWJvbCBoYXMgaW5jb3JyZWN0IHRvU3RyaW5nIGNvbnZlcnNpb25cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHJldHVybiAhU3RyaW5nKFN5bWJvbCgpKTtcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xuXG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBzdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9IE5BVElWRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdXG4gICAgfHwgKE5BVElWRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG4iLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93cmFwcGVkLXdlbGwta25vd24tc3ltYm9sJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE5BTUUpIHtcbiAgdmFyIFN5bWJvbCA9IHBhdGguU3ltYm9sIHx8IChwYXRoLlN5bWJvbCA9IHt9KTtcbiAgaWYgKCFoYXMoU3ltYm9sLCBOQU1FKSkgZGVmaW5lUHJvcGVydHkoU3ltYm9sLCBOQU1FLCB7XG4gICAgdmFsdWU6IHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUuZihOQU1FKVxuICB9KTtcbn07XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLml0ZXJhdG9yYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3ltYm9sLml0ZXJhdG9yXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciBzcGxpdCA9ICcnLnNwbGl0O1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICByZXR1cm4gIU9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09ICdTdHJpbmcnID8gc3BsaXQuY2FsbChpdCwgJycpIDogT2JqZWN0KGl0KTtcbn0gOiBPYmplY3Q7XG4iLCIvLyBgUmVxdWlyZU9iamVjdENvZXJjaWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIXByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzaGFyZWQoJ25hdGl2ZS1mdW5jdGlvbi10by1zdHJpbmcnLCBGdW5jdGlvbi50b1N0cmluZyk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIG5hdGl2ZUZ1bmN0aW9uVG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdG8tc3RyaW5nJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KG5hdGl2ZUZ1bmN0aW9uVG9TdHJpbmcuY2FsbChXZWFrTWFwKSk7XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRlJyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCkge1xuICB2YXIgc3RvcmUgPSBuZXcgV2Vha01hcCgpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGhpZGUoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcbnZhciBuYXRpdmVGdW5jdGlvblRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXRvLXN0cmluZycpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBURU1QTEFURSA9IFN0cmluZyhuYXRpdmVGdW5jdGlvblRvU3RyaW5nKS5zcGxpdCgndG9TdHJpbmcnKTtcblxuc2hhcmVkKCdpbnNwZWN0U291cmNlJywgZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBuYXRpdmVGdW5jdGlvblRvU3RyaW5nLmNhbGwoaXQpO1xufSk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciB1bnNhZmUgPSBvcHRpb25zID8gISFvcHRpb25zLnVuc2FmZSA6IGZhbHNlO1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5lbnVtZXJhYmxlIDogZmFsc2U7XG4gIHZhciBub1RhcmdldEdldCA9IG9wdGlvbnMgPyAhIW9wdGlvbnMubm9UYXJnZXRHZXQgOiBmYWxzZTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgJiYgIWhhcyh2YWx1ZSwgJ25hbWUnKSkgaGlkZSh2YWx1ZSwgJ25hbWUnLCBrZXkpO1xuICAgIGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKS5zb3VyY2UgPSBURU1QTEFURS5qb2luKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBrZXkgOiAnJyk7XG4gIH1cbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2Ugc2V0R2xvYmFsKGtleSwgdmFsdWUpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghdW5zYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgfSBlbHNlIGlmICghbm9UYXJnZXRHZXQgJiYgT1trZXldKSB7XG4gICAgc2ltcGxlID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBoaWRlKE8sIGtleSwgdmFsdWUpO1xuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnNvdXJjZSB8fCBuYXRpdmVGdW5jdGlvblRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PSAnZnVuY3Rpb24nID8gdmFyaWFibGUgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24ocGF0aFtuYW1lc3BhY2VdKSB8fCBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pXG4gICAgOiBwYXRoW25hbWVzcGFjZV0gJiYgcGF0aFtuYW1lc3BhY2VdW21ldGhvZF0gfHwgZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCJ2YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIGBUb0ludGVnZXJgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9pbnRlZ2VyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNOYU4oYXJndW1lbnQgPSArYXJndW1lbnQpID8gMCA6IChhcmd1bWVudCA+IDAgPyBmbG9vciA6IGNlaWwpKGFyZ3VtZW50KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyKGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihsZW5ndGgsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiAgaW5kZXhPZjogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzKGhpZGRlbktleXMsIGtleSkgJiYgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXModGFyZ2V0LCBrZXkpKSBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiB0eXBlb2YgZGV0ZWN0aW9uID09ICdmdW5jdGlvbicgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLm5vVGFyZ2V0R2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIEZPUkNFRCwgdGFyZ2V0LCBrZXksIHRhcmdldFByb3BlcnR5LCBzb3VyY2VQcm9wZXJ0eSwgZGVzY3JpcHRvcjtcbiAgaWYgKEdMT0JBTCkge1xuICAgIHRhcmdldCA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmIChTVEFUSUMpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWxbVEFSR0VUXSB8fCBzZXRHbG9iYWwoVEFSR0VULCB7fSk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0ID0gKGdsb2JhbFtUQVJHRVRdIHx8IHt9KS5wcm90b3R5cGU7XG4gIH1cbiAgaWYgKHRhcmdldCkgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgc291cmNlUHJvcGVydHkgPSBzb3VyY2Vba2V5XTtcbiAgICBpZiAob3B0aW9ucy5ub1RhcmdldEdldCkge1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgICB0YXJnZXRQcm9wZXJ0eSA9IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZTtcbiAgICB9IGVsc2UgdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRba2V5XTtcbiAgICBGT1JDRUQgPSBpc0ZvcmNlZChHTE9CQUwgPyBrZXkgOiBUQVJHRVQgKyAoU1RBVElDID8gJy4nIDogJyMnKSArIGtleSwgb3B0aW9ucy5mb3JjZWQpO1xuICAgIC8vIGNvbnRhaW5lZCBpbiB0YXJnZXRcbiAgICBpZiAoIUZPUkNFRCAmJiB0YXJnZXRQcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIHNvdXJjZVByb3BlcnR5ID09PSB0eXBlb2YgdGFyZ2V0UHJvcGVydHkpIGNvbnRpbnVlO1xuICAgICAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHkpO1xuICAgIH1cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGhpZGUoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xuXG52YXIgbmF0aXZlQXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gYE9iamVjdC5hc3NpZ25gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmFzc2lnblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICFuYXRpdmVBc3NpZ24gfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgpO1xuICB2YXIgYWxwaGFiZXQgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW3N5bWJvbF0gPSA3O1xuICBhbHBoYWJldC5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoY2hyKSB7IEJbY2hyXSA9IGNocjsgfSk7XG4gIHJldHVybiBuYXRpdmVBc3NpZ24oe30sIEEpW3N5bWJvbF0gIT0gNyB8fCBvYmplY3RLZXlzKG5hdGl2ZUFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IGFscGhhYmV0O1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmY7XG4gIHdoaWxlIChhcmd1bWVudHNMZW5ndGggPiBpbmRleCkge1xuICAgIHZhciBTID0gSW5kZXhlZE9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gb2JqZWN0S2V5cyhTKS5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKFMpKSA6IG9iamVjdEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSB7XG4gICAgICBrZXkgPSBrZXlzW2orK107XG4gICAgICBpZiAoIURFU0NSSVBUT1JTIHx8IHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoUywga2V5KSkgVFtrZXldID0gU1trZXldO1xuICAgIH1cbiAgfSByZXR1cm4gVDtcbn0gOiBuYXRpdmVBc3NpZ247XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWFzc2lnbicpO1xuXG4vLyBgT2JqZWN0LmFzc2lnbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBPYmplY3QuYXNzaWduICE9PSBhc3NpZ24gfSwge1xuICBhc3NpZ246IGFzc2lnblxufSk7XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IGNvZGVQb2ludEF0LCBhdCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKENPTlZFUlRfVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIHBvcykge1xuICAgIHZhciBTID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgc2l6ZSA9IFMubGVuZ3RoO1xuICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gc2l6ZSkgcmV0dXJuIENPTlZFUlRfVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgZmlyc3QgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24pO1xuICAgIHJldHVybiBmaXJzdCA8IDB4RDgwMCB8fCBmaXJzdCA+IDB4REJGRiB8fCBwb3NpdGlvbiArIDEgPT09IHNpemVcbiAgICAgIHx8IChzZWNvbmQgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24gKyAxKSkgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGXG4gICAgICAgID8gQ09OVkVSVF9UT19TVFJJTkcgPyBTLmNoYXJBdChwb3NpdGlvbikgOiBmaXJzdFxuICAgICAgICA6IENPTlZFUlRfVE9fU1RSSU5HID8gUy5zbGljZShwb3NpdGlvbiwgcG9zaXRpb24gKyAyKSA6IChmaXJzdCAtIDB4RDgwMCA8PCAxMCkgKyAoc2Vjb25kIC0gMHhEQzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLmNvZGVwb2ludGF0XG4gIGNvZGVBdDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuYXRgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XG4gIGNoYXJBdDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICBGLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IEYoKSkgIT09IEYucHJvdG90eXBlO1xufSk7XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlcicpO1xuXG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLy8gYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0cHJvdG90eXBlb2Zcbm1vZHVsZS5leHBvcnRzID0gQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvdHlwZSA6IG51bGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IGZhbHNlO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbi8vIGAlSXRlcmF0b3JQcm90b3R5cGUlYCBvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSVpdGVyYXRvcnByb3RvdHlwZSUtb2JqZWN0XG52YXIgSXRlcmF0b3JQcm90b3R5cGUsIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSwgYXJyYXlJdGVyYXRvcjtcblxuaWYgKFtdLmtleXMpIHtcbiAgYXJyYXlJdGVyYXRvciA9IFtdLmtleXMoKTtcbiAgLy8gU2FmYXJpIDggaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gIGlmICghKCduZXh0JyBpbiBhcnJheUl0ZXJhdG9yKSkgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IHRydWU7XG4gIGVsc2Uge1xuICAgIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGdldFByb3RvdHlwZU9mKGFycmF5SXRlcmF0b3IpKTtcbiAgICBpZiAoUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSBJdGVyYXRvclByb3RvdHlwZSA9IFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxufVxuXG5pZiAoSXRlcmF0b3JQcm90b3R5cGUgPT0gdW5kZWZpbmVkKSBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxuaWYgKCFJU19QVVJFICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSXRlcmF0b3JQcm90b3R5cGU6IEl0ZXJhdG9yUHJvdG90eXBlLFxuICBCVUdHWV9TQUZBUklfSVRFUkFUT1JTOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTXG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYoTywga2V5ID0ga2V5c1tpbmRleCsrXSwgUHJvcGVydGllc1trZXldKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignZG9jdW1lbnQnLCAnZG9jdW1lbnRFbGVtZW50Jyk7XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG5cbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBzY3JpcHQgPSAnc2NyaXB0JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIganMgPSAnamF2YScgKyBzY3JpcHQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9IFN0cmluZyhqcyk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyBzY3JpcHQgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvJyArIHNjcmlwdCArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChsZW5ndGgtLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbi8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5oaWRkZW5LZXlzW0lFX1BST1RPXSA9IHRydWU7XG4iLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRBRywgU1RBVElDKSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gU1RBVElDID8gaXQgOiBpdC5wcm90b3R5cGUsIFRPX1NUUklOR19UQUcpKSB7XG4gICAgZGVmaW5lUHJvcGVydHkoaXQsIFRPX1NUUklOR19UQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogVEFHIH0pO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJykuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICBJdGVyYXRvckNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yQ29uc3RydWN0b3IsIFRPX1NUUklOR19UQUcsIGZhbHNlLCB0cnVlKTtcbiAgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgcmV0dXJuIEl0ZXJhdG9yQ29uc3RydWN0b3I7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSAmJiBpdCAhPT0gbnVsbCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcIkNhbid0IHNldCBcIiArIFN0cmluZyhpdCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBhUG9zc2libGVQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5zZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3Quc2V0cHJvdG90eXBlb2Zcbi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IGZ1bmN0aW9uICgpIHtcbiAgdmFyIENPUlJFQ1RfU0VUVEVSID0gZmFsc2U7XG4gIHZhciB0ZXN0ID0ge307XG4gIHZhciBzZXR0ZXI7XG4gIHRyeSB7XG4gICAgc2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0O1xuICAgIHNldHRlci5jYWxsKHRlc3QsIFtdKTtcbiAgICBDT1JSRUNUX1NFVFRFUiA9IHRlc3QgaW5zdGFuY2VvZiBBcnJheTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICBhbk9iamVjdChPKTtcbiAgICBhUG9zc2libGVQcm90b3R5cGUocHJvdG8pO1xuICAgIGlmIChDT1JSRUNUX1NFVFRFUikgc2V0dGVyLmNhbGwoTywgcHJvdG8pO1xuICAgIGVsc2UgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICByZXR1cm4gTztcbiAgfTtcbn0oKSA6IHVuZGVmaW5lZCk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3RvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEl0ZXJhdG9yc0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKTtcblxudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gSXRlcmF0b3JzQ29yZS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gSXRlcmF0b3JzQ29yZS5CVUdHWV9TQUZBUklfSVRFUkFUT1JTO1xudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG52YXIgRU5UUklFUyA9ICdlbnRyaWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYWJsZSwgTkFNRSwgSXRlcmF0b3JDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvcihJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcblxuICB2YXIgZ2V0SXRlcmF0aW9uTWV0aG9kID0gZnVuY3Rpb24gKEtJTkQpIHtcbiAgICBpZiAoS0lORCA9PT0gREVGQVVMVCAmJiBkZWZhdWx0SXRlcmF0b3IpIHJldHVybiBkZWZhdWx0SXRlcmF0b3I7XG4gICAgaWYgKCFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIEtJTkQgaW4gSXRlcmFibGVQcm90b3R5cGUpIHJldHVybiBJdGVyYWJsZVByb3RvdHlwZVtLSU5EXTtcbiAgICBzd2l0Y2ggKEtJTkQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIEVOVFJJRVM6IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcyk7IH07XG4gIH07XG5cbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSBmYWxzZTtcbiAgdmFyIEl0ZXJhYmxlUHJvdG90eXBlID0gSXRlcmFibGUucHJvdG90eXBlO1xuICB2YXIgbmF0aXZlSXRlcmF0b3IgPSBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl1cbiAgICB8fCBJdGVyYWJsZVByb3RvdHlwZVsnQEBpdGVyYXRvciddXG4gICAgfHwgREVGQVVMVCAmJiBJdGVyYWJsZVByb3RvdHlwZVtERUZBVUxUXTtcbiAgdmFyIGRlZmF1bHRJdGVyYXRvciA9ICFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIG5hdGl2ZUl0ZXJhdG9yIHx8IGdldEl0ZXJhdGlvbk1ldGhvZChERUZBVUxUKTtcbiAgdmFyIGFueU5hdGl2ZUl0ZXJhdG9yID0gTkFNRSA9PSAnQXJyYXknID8gSXRlcmFibGVQcm90b3R5cGUuZW50cmllcyB8fCBuYXRpdmVJdGVyYXRvciA6IG5hdGl2ZUl0ZXJhdG9yO1xuICB2YXIgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBtZXRob2RzLCBLRVk7XG5cbiAgLy8gZml4IG5hdGl2ZVxuICBpZiAoYW55TmF0aXZlSXRlcmF0b3IpIHtcbiAgICBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihhbnlOYXRpdmVJdGVyYXRvci5jYWxsKG5ldyBJdGVyYWJsZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICBpZiAoIUlTX1BVUkUgJiYgZ2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlKSAhPT0gSXRlcmF0b3JQcm90b3R5cGUpIHtcbiAgICAgICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAgICAgc2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJdGVyYXRvclByb3RvdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGhpZGUoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBpZiAoSVNfUFVSRSkgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgICB9XG4gIH1cblxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZBVUxUID09IFZBTFVFUyAmJiBuYXRpdmVJdGVyYXRvciAmJiBuYXRpdmVJdGVyYXRvci5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSB0cnVlO1xuICAgIGRlZmF1bHRJdGVyYXRvciA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5hdGl2ZUl0ZXJhdG9yLmNhbGwodGhpcyk7IH07XG4gIH1cblxuICAvLyBkZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghSVNfUFVSRSB8fCBGT1JDRUQpICYmIEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXSAhPT0gZGVmYXVsdEl0ZXJhdG9yKSB7XG4gICAgaGlkZShJdGVyYWJsZVByb3RvdHlwZSwgSVRFUkFUT1IsIGRlZmF1bHRJdGVyYXRvcik7XG4gIH1cbiAgSXRlcmF0b3JzW05BTUVdID0gZGVmYXVsdEl0ZXJhdG9yO1xuXG4gIC8vIGV4cG9ydCBhZGRpdGlvbmFsIG1ldGhvZHNcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBnZXRJdGVyYXRpb25NZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/IGRlZmF1bHRJdGVyYXRvciA6IGdldEl0ZXJhdGlvbk1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChFTlRSSUVTKVxuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChLRVkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIHx8ICEoS0VZIGluIEl0ZXJhYmxlUHJvdG90eXBlKSkge1xuICAgICAgICByZWRlZmluZShJdGVyYWJsZVByb3RvdHlwZSwgS0VZLCBtZXRob2RzW0tFWV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSAkKHsgdGFyZ2V0OiBOQU1FLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB9LCBtZXRob2RzKTtcbiAgfVxuXG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGFyQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNoYXJBdDtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBTVFJJTkdfSVRFUkFUT1IgPSAnU3RyaW5nIEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNUUklOR19JVEVSQVRPUik7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUtQEBpdGVyYXRvclxuZGVmaW5lSXRlcmF0b3IoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IFNUUklOR19JVEVSQVRPUixcbiAgICBzdHJpbmc6IFN0cmluZyhpdGVyYXRlZCksXG4gICAgaW5kZXg6IDBcbiAgfSk7XG4vLyBgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSVzdHJpbmdpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHN0cmluZyA9IHN0YXRlLnN0cmluZztcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXg7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IHN0cmluZy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gIHN0YXRlLmluZGV4ICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCIvLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xuXG52YXIgVU5TQ09QQUJMRVMgPSB3ZWxsS25vd25TeW1ib2woJ3Vuc2NvcGFibGVzJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmlmIChBcnJheVByb3RvdHlwZVtVTlNDT1BBQkxFU10gPT0gdW5kZWZpbmVkKSB7XG4gIGhpZGUoQXJyYXlQcm90b3R5cGUsIFVOU0NPUEFCTEVTLCBjcmVhdGUobnVsbCkpO1xufVxuXG4vLyBhZGQgYSBrZXkgdG8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBBUlJBWV9JVEVSQVRPUiA9ICdBcnJheSBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihBUlJBWV9JVEVSQVRPUik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZW50cmllc1xuLy8gYEFycmF5LnByb3RvdHlwZS5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5rZXlzXG4vLyBgQXJyYXkucHJvdG90eXBlLnZhbHVlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUudmFsdWVzXG4vLyBgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQGl0ZXJhdG9yXG4vLyBgQ3JlYXRlQXJyYXlJdGVyYXRvcmAgaW50ZXJuYWwgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1jcmVhdGVhcnJheWl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZUl0ZXJhdG9yKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogQVJSQVlfSVRFUkFUT1IsXG4gICAgdGFyZ2V0OiB0b0luZGV4ZWRPYmplY3QoaXRlcmF0ZWQpLCAvLyB0YXJnZXRcbiAgICBpbmRleDogMCwgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgICBraW5kOiBraW5kICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtpbmRcbiAgfSk7XG4vLyBgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGtpbmQgPSBzdGF0ZS5raW5kO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCsrO1xuICBpZiAoIXRhcmdldCB8fCBpbmRleCA+PSB0YXJnZXQubGVuZ3RoKSB7XG4gICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiB7IHZhbHVlOiBpbmRleCwgZG9uZTogZmFsc2UgfTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiB7IHZhbHVlOiB0YXJnZXRbaW5kZXhdLCBkb25lOiBmYWxzZSB9O1xuICByZXR1cm4geyB2YWx1ZTogW2luZGV4LCB0YXJnZXRbaW5kZXhdXSwgZG9uZTogZmFsc2UgfTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1jcmVhdGV1bm1hcHBlZGFyZ3VtZW50c29iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY3JlYXRlbWFwcGVkYXJndW1lbnRzb2JqZWN0XG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERPTUl0ZXJhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb20taXRlcmFibGVzJyk7XG52YXIgQXJyYXlJdGVyYXRvck1ldGhvZHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRlJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIEFycmF5VmFsdWVzID0gQXJyYXlJdGVyYXRvck1ldGhvZHMudmFsdWVzO1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGUpIHtcbiAgICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl0gIT09IEFycmF5VmFsdWVzKSB0cnkge1xuICAgICAgaGlkZShDb2xsZWN0aW9uUHJvdG90eXBlLCBJVEVSQVRPUiwgQXJyYXlWYWx1ZXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBDb2xsZWN0aW9uUHJvdG90eXBlW0lURVJBVE9SXSA9IEFycmF5VmFsdWVzO1xuICAgIH1cbiAgICBpZiAoIUNvbGxlY3Rpb25Qcm90b3R5cGVbVE9fU1RSSU5HX1RBR10pIGhpZGUoQ29sbGVjdGlvblByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgQ09MTEVDVElPTl9OQU1FKTtcbiAgICBpZiAoRE9NSXRlcmFibGVzW0NPTExFQ1RJT05fTkFNRV0pIGZvciAodmFyIE1FVEhPRF9OQU1FIGluIEFycmF5SXRlcmF0b3JNZXRob2RzKSB7XG4gICAgICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgICAgIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlW01FVEhPRF9OQU1FXSAhPT0gQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdKSB0cnkge1xuICAgICAgICBoaWRlKENvbGxlY3Rpb25Qcm90b3R5cGUsIE1FVEhPRF9OQU1FLCBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgQ29sbGVjdGlvblByb3RvdHlwZVtNRVRIT0RfTkFNRV0gPSBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnRzLmRlYm91bmNlPWZ1bmN0aW9uKGksZSxvKXt2YXIgdDtyZXR1cm4gdm9pZCAwPT09ZSYmKGU9NTApLHZvaWQgMD09PW8mJihvPXtpc0ltbWVkaWF0ZTohMX0pLGZ1bmN0aW9uKCl7Zm9yKHZhciBhPVtdLGQ9MDtkPGFyZ3VtZW50cy5sZW5ndGg7ZCsrKWFbZF09YXJndW1lbnRzW2RdO3ZhciBuPXRoaXMsbT1vLmlzSW1tZWRpYXRlJiZ2b2lkIDA9PT10O3ZvaWQgMCE9PXQmJmNsZWFyVGltZW91dCh0KSx0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0PXZvaWQgMCxvLmlzSW1tZWRpYXRlfHxpLmFwcGx5KG4sYSl9LGUpLG0mJmkuYXBwbHkobixhKX19O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJleHBvcnQgY29uc3QgY3JlYXRlRWxlbWVudCA9IChodG1sOiBzdHJpbmcpOiBIVE1MRWxlbWVudCA9PiB7XHJcbiAgICByZXR1cm4gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAndGV4dC9odG1sJykuYm9keS5maXJzdENoaWxkIGFzIEhUTUxFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogYTExeWNsaWNrIC0gRWFzaWx5IGhhbmRsZSBrZXlib2FyZCBjbGljayBldmVudHMgb24gbm9uIHNlbWFudGljIGJ1dHRvbiBlbGVtZW50cy5cclxuICogaHR0cHM6Ly9naXRodWIuY29tL3N2aW5rbGUvYTExeWNsaWNrXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCBDbGljay9rZXlib2FyZCBldmVudCBvYmplY3QuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uIGV2ZW50IHR5cGUgYW5kIGNvZGUuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYTExeUNsaWNrID0gZnVuY3Rpb24oZXZlbnQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBjb2RlID0gZXZlbnQuY2hhckNvZGUgfHwgZXZlbnQua2V5Q29kZSxcclxuICAgICAgICB0eXBlID0gZXZlbnQudHlwZTtcclxuXHJcbiAgICBpZiAodHlwZSA9PT0gJ2NsaWNrJykge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAna2V5ZG93bicpIHtcclxuICAgICAgICBpZiAoY29kZSA9PT0gMzIgfHwgY29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbi8vIENyb3NzIGJyb3dzZXIgY3VzdG9tIGV2ZW50XHJcbi8vIFNvbWUgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zaHlzdHJ1ay9jdXN0b20tZXZlbnQtanNcclxuZXhwb3J0IGNvbnN0IGNyb3NzQ3VzdG9tRXZlbnQgPSAoZXZlbnQ6IHN0cmluZywgcGFyYW1zOiBhbnkpID0+IHtcclxuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcclxuXHJcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwgeyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH07XHJcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xyXG5cclxuICAgIHJldHVybiBldnQ7XHJcbn1cclxuXHJcbi8vIENoZWNrcyBpZiB2YWx1ZSBpcyBhbiBpbnRlZ2VyXHJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL051bWJlci9pc0ludGVnZXIjUG9seWZpbGxcclxuZXhwb3J0IGNvbnN0IGlzSW50ZWdlciA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiZcclxuICAgIGlzRmluaXRlKHZhbHVlKSAmJlxyXG4gICAgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xyXG59OyIsImltcG9ydCAnY29yZS1qcy9lcy9vYmplY3QvYXNzaWduJztcclxuaW1wb3J0ICdjb3JlLWpzL2VzL3N5bWJvbC9pdGVyYXRvcic7XHJcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndHMtZGVib3VuY2UnO1xyXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBhMTF5Q2xpY2ssIGNyb3NzQ3VzdG9tRXZlbnQsIGlzSW50ZWdlciB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuXHJcbmludGVyZmFjZSBPcHRpb25zIHtcclxuICAgIGNvbnRhaW5lcjogYm9vbGVhbixcclxuICAgIG5hdkJ0bnM6IGJvb2xlYW4sXHJcbiAgICBwcmV2QnRuOiBIVE1MRWxlbWVudCB8IEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+IHwgTm9kZUxpc3QsXHJcbiAgICBuZXh0QnRuOiBIVE1MRWxlbWVudCB8IEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+IHwgTm9kZUxpc3QsXHJcbiAgICBkb3RzOiBib29sZWFuLFxyXG4gICAgYWRhcHRpdmVIZWlnaHQ6IGJvb2xlYW4sXHJcbiAgICBza2lwQnRuOiBib29sZWFuLFxyXG4gICAgaXRlbXM6IG51bWJlciB8IGZhbHNlXHJcbn1cclxuXHJcbmludGVyZmFjZSBBY3RpdmVWaXNpYmxlU2xpZGVzIHtcclxuICAgICh2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdLCBhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQpOiB2b2lkO1xyXG59XHJcblxyXG5lbnVtIFNsaWRlRGlyZWN0aW9uIHtcclxuICAgIFByZXYsXHJcbiAgICBOZXh0XHJcbn1cclxuXHJcbmVudW0gU2xpZGVyU3RhdGUge1xyXG4gICAgRW5hYmxlZCxcclxuICAgIERpc2FibGVkXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEExMVlTbGlkZXIge1xyXG4gICAgcHJpdmF0ZSBfYWN0aXZlQ2xhc3M6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3Zpc2libGVDbGFzczogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZG90c0NsYXNzOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9zbGlkZXJDbGFzczogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaGFzQ3VzdG9tQnRuczogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2ZvY3VzYWJsZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfY2hlY2tTaG91bGRFbmFibGVEZWJvdW5jZWQ6IGFueTtcclxuICAgIHByaXZhdGUgX3VwZGF0ZUhlaWdodERlYm91bmNlZDogYW55O1xyXG4gICAgcHJpdmF0ZSBfdXBkYXRlU2Nyb2xsUG9zaXRpb246IGFueTtcclxuICAgIHB1YmxpYyBzbGlkZXI6IEhUTUxFbGVtZW50O1xyXG4gICAgcHVibGljIHNsaWRlczogSFRNTENvbGxlY3Rpb25PZjxIVE1MRWxlbWVudD47XHJcbiAgICBwdWJsaWMgZG90czogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcHVibGljIGFjdGl2ZVNsaWRlOiBIVE1MRWxlbWVudDtcclxuICAgIHB1YmxpYyB2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdO1xyXG4gICAgcHVibGljIHNsaWRlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgb3B0aW9uczogT3B0aW9ucztcclxuICAgIHB1YmxpYyBzbGlkZXJFbmFibGVkOiBTbGlkZXJTdGF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgb3B0aW9ucz86IE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnNsaWRlciA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5zbGlkZXMgPSBlbGVtZW50LmNoaWxkcmVuIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnPGRpdiBjbGFzcz1cImExMXktc2xpZGVyLWNvbnRhaW5lclwiPjwvZGl2PicpO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUNsYXNzID0gJ2ExMXktc2xpZGVyLWFjdGl2ZSc7XHJcbiAgICAgICAgdGhpcy5fdmlzaWJsZUNsYXNzID0gJ2ExMXktc2xpZGVyLXZpc2libGUnO1xyXG4gICAgICAgIHRoaXMuX2RvdHNDbGFzcyA9ICdhMTF5LXNsaWRlci1kb3RzJztcclxuICAgICAgICB0aGlzLl9zbGlkZXJDbGFzcyA9ICdhMTF5LXNsaWRlcic7XHJcbiAgICAgICAgdGhpcy5fZm9jdXNhYmxlID0gJ2EsIGFyZWEsIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBidXR0b24sIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgKlt0YWJpbmRleF0sICpbY29udGVudGVkaXRhYmxlXSc7XHJcbiAgICAgICAgdGhpcy5kb3RzID0gbnVsbDtcclxuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdGhpcy5zbGlkZXNbMF07XHJcbiAgICAgICAgdGhpcy52aXNpYmxlU2xpZGVzID0gW107XHJcbiAgICAgICAgdGhpcy5zbGlkZXJFbmFibGVkID0gU2xpZGVyU3RhdGUuRGlzYWJsZWQ7XHJcbiAgICAgICAgdGhpcy5faGFzQ3VzdG9tQnRucyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmV2QnRuIHx8IG9wdGlvbnMgJiYgb3B0aW9ucy5uZXh0QnRuID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgY29udGFpbmVyOiB0cnVlLFxyXG4gICAgICAgICAgICBuYXZCdG5zOiB0cnVlLFxyXG4gICAgICAgICAgICBwcmV2QnRuOiBvcHRpb25zICYmIG9wdGlvbnMucHJldkJ0biB8fCBjcmVhdGVFbGVtZW50KCc8YnV0dG9uIGNsYXNzPVwiYTExeS1zbGlkZXItcHJldlwiPlByZXZpb3VzIHNsaWRlPC9idXR0b24+JyksXHJcbiAgICAgICAgICAgIG5leHRCdG46IG9wdGlvbnMgJiYgb3B0aW9ucy5uZXh0QnRuIHx8IGNyZWF0ZUVsZW1lbnQoJzxidXR0b24gY2xhc3M9XCJhMTF5LXNsaWRlci1uZXh0XCI+TmV4dCBzbGlkZTwvYnV0dG9uPicpLFxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNraXBCdG46IHRydWUsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNldCB1c2VyLWlucHV0dGVkIG9wdGlvbnMgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBCaW5kaW5nXHJcbiAgICAgICAgdGhpcy5faGFuZGxlUHJldiA9IHRoaXMuX2hhbmRsZVByZXYuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVOZXh0ID0gdGhpcy5faGFuZGxlTmV4dC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkID0gZGVib3VuY2UodGhpcy5fY2hlY2tTaG91bGRFbmFibGUuYmluZCh0aGlzKSwgMjUwKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVIZWlnaHREZWJvdW5jZWQgPSBkZWJvdW5jZSh0aGlzLl91cGRhdGVIZWlnaHQuYmluZCh0aGlzKSwgMjUwKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbiA9IGRlYm91bmNlKCgpID0+IHRoaXMuc2Nyb2xsVG9TbGlkZSh0aGlzLmFjdGl2ZVNsaWRlKSwgMjUwKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVTY3JvbGwgPSBkZWJvdW5jZSh0aGlzLl9oYW5kbGVTY3JvbGwuYmluZCh0aGlzKSwgMTUwKTsgLy8gTWF5IGZpcmUgdHdpY2UgZGVwZW5kaW5nIG9uIGJyb3dzZXJcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzbGlkZXJcclxuICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdCgpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2xpZGVyIHNob3VsZCBiZSBpbml0aWFsaXplZCBkZXBlbmRpbmcgb24gc2xpZGVzIHNob3duXHJcbiAgICAgICAgdGhpcy5fY2hlY2tTaG91bGRFbmFibGUoKTtcclxuXHJcbiAgICAgICAgLy8gRW5hYmxlL2Rpc2FibGUgc2xpZGVyIGFmdGVyIHJlc2l6ZVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZURlYm91bmNlZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2luaXQnLCB7XHJcbiAgICAgICAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jaGVja1Nob3VsZEVuYWJsZSgpIHtcclxuICAgICAgICBsZXQgc2hvdWxkRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gSWYgMSBvciBsZXNzIHNsaWRlcyBleGlzdCB0aGVuIGEgc2xpZGVyIGlzIG5vdCBuZWVkZWRcclxuICAgICAgICBpZiAodGhpcy5zbGlkZXMubGVuZ3RoIDw9IDEpIHNob3VsZEVuYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gc2xpZGVzIG91dHNpZGUgdGhlIHNsaWRlcidzIHZpZXdwb3J0IGEgc2xpZGVyIGlzIG5vdCBuZWVkZWRcclxuICAgICAgICB0aGlzLl9nZXRBY3RpdmVBbmRWaXNpYmxlKCh2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2aXNpYmxlU2xpZGVzLmxlbmd0aCA9PT0gdGhpcy5zbGlkZXMubGVuZ3RoKSBzaG91bGRFbmFibGUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gSWYgdXNlciBleHBsaWNpdGx5IHNldCBpdGVtcyB0byBiZSBzaG93biBhbmQgaXQncyB0aGUgc2FtZSBudW1iZXIgYXMgYXZhaWxhYmxlXHJcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzLmxlbmd0aCA9PT0gdGhpcy5vcHRpb25zLml0ZW1zKSBzaG91bGRFbmFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gRW5hYmxlL2Rpc2FibGUgc2xpZGVyIGJhc2VkIG9uIGFib3ZlIHJlcXVpcmVtZW50c1xyXG4gICAgICAgIGlmIChzaG91bGRFbmFibGUgJiYgdGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5EaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmFibGVTbGlkZXIoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFzaG91bGRFbmFibGUgJiYgdGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5FbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVTbGlkZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIC8vIEVuYWJsZSBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHNsaWRlci4gU2hvdWxkIG1pcnJvciBfZGlzYWJsZVNsaWRlcigpXHJcbiAgICBwcml2YXRlIF9lbmFibGVTbGlkZXIoKSB7XHJcbiAgICAgICAgLy8gU2V0IHNsaWRlciB0byBlbmFibGVkXHJcbiAgICAgICAgdGhpcy5zbGlkZXJFbmFibGVkID0gU2xpZGVyU3RhdGUuRW5hYmxlZDtcclxuXHJcbiAgICAgICAgLy8gQWRkIHNsaWRlciBjb250YWluZXIgdG8gRE9NIGFuZCBtb3ZlIHNsaWRlciBpbnRvIGl0IGlmIGVuYWJsZWRcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5zbGlkZXJDb250YWluZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCB0aGlzLnNsaWRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgc2tpcCBidXR0b24gYmVmb3JlIHNsaWRlciBpZiBlbmFibGVkXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5za2lwQnRuKSB0aGlzLl9hZGRTa2lwQnRuKCk7XHJcblxyXG4gICAgICAgIC8vIElmIHByZXYvbmV4dCBidXR0b25zIGFyZSBlbmFibGVkIGFuZCB1c2VyIGlzbid0IHVzaW5nIHRoZWlyIG93biBhZGQgaXQgdG8gdGhlIERPTVxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubmF2QnRucyAmJiAhdGhpcy5faGFzQ3VzdG9tQnRucykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByZXZCdG4gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRoaXMub3B0aW9ucy5wcmV2QnRuKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5uZXh0QnRuIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCB0aGlzLm9wdGlvbnMubmV4dEJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRPRE86IE1vdmUgYWRkL3JlbW92YWwgb2YgYnV0dG9ucyBpbnRvIGl0J3Mgb3duIGZ1bmN0aW9uXHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgcHJldi9uZXh0IGJ1dHRvbnMuIFBvc3NpYmxlIGZvciB0aGVyZSB0byBiZSBtdWx0aXBsZSBzbyBuZWVkIHRvIGxvb3AgdGhyb3VnaCB0aGVtIGFsbFxyXG4gICAgICAgIGNvbnN0IHByZXZCdG5zID0gdGhpcy5vcHRpb25zLnByZXZCdG4gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA/IFt0aGlzLm9wdGlvbnMucHJldkJ0bl0gOiB0aGlzLm9wdGlvbnMucHJldkJ0bjtcclxuICAgICAgICBjb25zdCBuZXh0QnRucyA9IHRoaXMub3B0aW9ucy5uZXh0QnRuIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBbdGhpcy5vcHRpb25zLm5leHRCdG5dIDogdGhpcy5vcHRpb25zLm5leHRCdG47XHJcblxyXG4gICAgICAgIGZvciAobGV0IHByZXZCdG4gb2YgcHJldkJ0bnMpIHtcclxuICAgICAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZVByZXYsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZVByZXYsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IG5leHRCdG4gb2YgbmV4dEJ0bnMpIHtcclxuICAgICAgICAgICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZU5leHQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZU5leHQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBkb3QgbmF2aWdhdGlvbiBpZiBlbmFibGVkXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kb3RzKSB0aGlzLl9nZW5lcmF0ZURvdHMoKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGxpc3RlbmVyIGZvciB3aGVuIHRoZSBzbGlkZXIgc3RvcHMgbW92aW5nXHJcbiAgICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5faGFuZGxlU2Nyb2xsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBhbGwgQ1NTIG5lZWRlZFxyXG4gICAgICAgIHRoaXMuX3NldENTUygpO1xyXG5cclxuICAgICAgICAvLyBBZGFwdGl2ZSBoZWlnaHRcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBzbGlkZXIncyBoZWlnaHQgYmFzZWQgb24gY29udGVudCBvZiBzbGlkZVxyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVIZWlnaHQodGhpcy5hY3RpdmVTbGlkZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBbHNvIGFkZCByZXNpemUgbGlzdGVuZXIgZm9yIGl0XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVIZWlnaHREZWJvdW5jZWQuYmluZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPbiByZXNpemUgbWFrZSBzdXJlIHRvIHVwZGF0ZSBzY3JvbGwgcG9zaXRpb24gYXMgY29udGVudCBtYXkgY2hhbmdlIGluIHdpZHRoL2hlaWdodFxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGlzYWJsZSBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHNsaWRlci4gU2hvdWxkIG1pcnJvciBfZW5hYmxlU2xpZGVyKClcclxuICAgIHByaXZhdGUgX2Rpc2FibGVTbGlkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJFbmFibGVkID0gU2xpZGVyU3RhdGUuRGlzYWJsZWQ7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBzbGlkZXIgZnJvbSBhMTF5LXNsaWRlcidzIGNvbnRhaW5lciBhbmQgdGhlbiByZW1vdmUgY29udGFpbmVyIGZyb20gRE9NXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY29udGFpbnModGhpcy5zbGlkZXJDb250YWluZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCB0aGlzLnNsaWRlcik7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKHRoaXMuc2xpZGVyQ29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBza2lwIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuX3JlbW92ZVNraXBCdG4oKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmb3IgcHJldi9uZXh0IGJ1dHRvbnNcclxuICAgICAgICAvLyBQb3NzaWJsZSBmb3IgdGhlcmUgdG8gYmUgbXVsdGlwbGUgc28gbmVlZCB0byBsb29wIHRocm91Z2ggdGhlbSBhbGxcclxuICAgICAgICBjb25zdCBwcmV2QnRucyA9IHRoaXMub3B0aW9ucy5wcmV2QnRuIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBbdGhpcy5vcHRpb25zLnByZXZCdG5dIDogdGhpcy5vcHRpb25zLnByZXZCdG47XHJcbiAgICAgICAgY29uc3QgbmV4dEJ0bnMgPSB0aGlzLm9wdGlvbnMubmV4dEJ0biBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gW3RoaXMub3B0aW9ucy5uZXh0QnRuXSA6IHRoaXMub3B0aW9ucy5uZXh0QnRuO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBwcmV2QnRuIG9mIHByZXZCdG5zKSB7XHJcbiAgICAgICAgICAgIHByZXZCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVQcmV2KTtcclxuICAgICAgICAgICAgcHJldkJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZVByZXYpO1xyXG5cclxuICAgICAgICAgICAgLy8gT25seSByZW1vdmUgZ2VuZXJhdGVkIGJ1dHRvbnMsIG5vdCB1c2VyLWRlZmluZWQgb25lc1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2hhc0N1c3RvbUJ0bnMpIHByZXZCdG4ucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQocHJldkJ0bik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBuZXh0QnRuIG9mIG5leHRCdG5zKSB7XHJcbiAgICAgICAgICAgIG5leHRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVOZXh0KTtcclxuICAgICAgICAgICAgbmV4dEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZU5leHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gT25seSByZW1vdmUgZ2VuZXJhdGVkIGJ1dHRvbnMsIG5vdCB1c2VyLWRlZmluZWQgb25lc1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2hhc0N1c3RvbUJ0bnMpIG5leHRCdG4ucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQobmV4dEJ0bik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBXaWxsIHJlbW92ZSBkb3RzIGlmIHRoZXkgZXhpc3RcclxuICAgICAgICB0aGlzLl9yZW1vdmVEb3RzKCk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBsaXN0ZW5lciBmb3Igd2hlbiB0aGUgc2xpZGVyIHN0b3BzIG1vdmluZ1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2hhbmRsZVNjcm9sbCwgZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgYWxsIENTU1xyXG4gICAgICAgIHRoaXMuX3JlbW92ZUNTUygpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgYWxsIGFkYXB0aXZlIGhlaWdodCBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlSGVpZ2h0KGZhbHNlKTtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlSGVpZ2h0RGVib3VuY2VkKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHNjcm9sbCBwb3NpdGlvbiB1cGRhdGUgY2hlY2tcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlU2Nyb2xsUG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBhbGwgQ1NTIG5lZWRlZCBmb3IgdGhlIHNsaWRlci4gU2hvdWxkIG1pcnJvciBfcmVtb3ZlQ1NTKClcclxuICAgIHByaXZhdGUgX3NldENTUygpIHtcclxuICAgICAgICAvLyBVcGRhdGUgaXRlbXNcclxuICAgICAgICB0aGlzLl91cGRhdGVJdGVtc0NTUygpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgc2xpZGVyIGluc3RhbmNlIHRvIGdldCB0aGUgY29ycmVjdCBlbGVtZW50c1xyXG4gICAgICAgIHRoaXMuX2dldEFjdGl2ZUFuZFZpc2libGUoKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIG1haW4gc2xpZGVyIGNsYXNzIGlmIGl0IGRvZXNuJ3QgaGF2ZSBpdCBhbHJlYWR5XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCh0aGlzLl9zbGlkZXJDbGFzcyk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IHRoZSBtb3JlIGR5bmFtaWMgQ1NTIGZpcnN0IGlmIGl0IGV4aXN0c1xyXG4gICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRoaXMuc2xpZGVzKSB7XHJcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3Zpc2libGVDbGFzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgaW4gYWN0aXZlIGNsYXNzZXNcclxuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlLmNsYXNzTGlzdC5hZGQodGhpcy5fYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAvLyBBZGQgaW4gdmlzaWJsZSBjbGFzc2VzXHJcbiAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGhpcy52aXNpYmxlU2xpZGVzKSB7XHJcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQodGhpcy5fdmlzaWJsZUNsYXNzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRyaWdnZXIgZG90IHVwZGF0ZVxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZURvdHModGhpcy5hY3RpdmVTbGlkZSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBhbGwgYTExeSBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgdGhpcy5fYWRkRm9jdXNhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCBDU1MgbmVlZGVkIGZvciB0aGUgc2xpZGVyLiBTaG91bGQgbWlycm9yIF9zZXRDU1MoKVxyXG4gICAgcHJpdmF0ZSBfcmVtb3ZlQ1NTKCkge1xyXG4gICAgICAgIC8vIFJlbW92ZSBpdGVtIENTUyBpZiBpdCB3YXMgc2V0XHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlSXRlbXNDU1MoKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGNsYXNzIHRvIHNsaWRlclxyXG4gICAgICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2xpZGVyQ2xhc3MpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBhbGwgdGhlIGR5bmFtaWMgY2xhc3Nlc1xyXG4gICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRoaXMuc2xpZGVzKSB7XHJcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3Zpc2libGVDbGFzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgYWxsIGExMXkgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgIHRoaXMuX3JlbW92ZUZvY3VzYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZUl0ZW1zQ1NTKCkge1xyXG4gICAgICAgIGlmIChpc0ludGVnZXIodGhpcy5vcHRpb25zLml0ZW1zKSkge1xyXG4gICAgICAgICAgICAvLyBQZXJjZW50YWdlIHdpZHRoIG9mIGVhY2ggc2xpZGVcclxuICAgICAgICAgICAgY29uc3Qgc2xpZGVXaWR0aCA9IDEwMCAvICh0aGlzLm9wdGlvbnMuaXRlbXMgYXMgbnVtYmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBzdHlsZXMgZm9yIHNsaWRlclxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHN0eWxlcyBmb3IgaXRlbXNcclxuICAgICAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGhpcy5zbGlkZXMpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gYCR7c2xpZGVXaWR0aH0lYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IGV2ZXJ5dGhpbmcgaWYgbnVtYmVyIG9mIGl0ZW1zIG5vdCBleHBsaWNpdGx5IHNldFxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnZGlzcGxheScpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGhpcy5zbGlkZXMpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnN0eWxlLnJlbW92ZVByb3BlcnR5KCd3aWR0aCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlc2V0IGl0ZW0gc3R5bGluZyBldmVuIGlmIGV4cGxpY2l0bHkgc2V0IGluIHRoZSBvcHRpb25zXHJcbiAgICBwcml2YXRlIF9yZW1vdmVJdGVtc0NTUygpIHtcclxuICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnZGlzcGxheScpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcykge1xyXG4gICAgICAgICAgICBzbGlkZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnd2lkdGgnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWFrZXMgb25seSB0aGUgdmlzaWJsZSBpdGVtcyBmb2N1c2FibGUgYW5kIHJlYWRhYmxlIGJ5IHNjcmVlbnJlYWRlcnMuIFNob3VsZCBtaXJyb3IgX3JlbW92ZUExMVkoKVxyXG4gICAgcHJpdmF0ZSBfYWRkRm9jdXNhYmxlKCkge1xyXG4gICAgICAgIC8vIFJlc2V0IGFsbCBhMTF5IGZ1bmN0aW9uYWxpdHkgdG8gZGVmYXVsdCBiZWZvcmVoYW5kXHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlRm9jdXNhYmxlKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRoaXMuc2xpZGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvY3VzYWJsZUl0ZW1zID0gc2xpZGUucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9mb2N1c2FibGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgc2xpZGUgaXMgbm90IHZpc2libGUgbWFrZSB0aGUgc2xpZGUgd3JhcHBlciBub3QgZm9jdXNhYmxlXHJcbiAgICAgICAgICAgIGlmICghc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuX3Zpc2libGVDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBmb2N1c2FibGVJdGVtIG9mIGZvY3VzYWJsZUl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNsaWRlLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLl92aXNpYmxlQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlSXRlbS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVzZXQgYTExeSBhdHRyaWJ1dGVzIGZvciBzbGlkZSB3cmFwcGVyLiBTaG91bGQgbWlycm9yIF9hZGRBMTFZKClcclxuICAgIHByaXZhdGUgX3JlbW92ZUZvY3VzYWJsZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBmb2N1c2FibGVJdGVtcyA9IHNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNhYmxlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhMTF5IGZvciBlYWNoIHNsaWRlIHdyYXBwZXJcclxuICAgICAgICAgICAgc2xpZGUucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xyXG4gICAgICAgICAgICBzbGlkZS5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNldCBhMTF5IGF0dHJpYnV0ZXMgZm9yIHNsaWRlIGlubmVyIGVsZW1lbnRzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGZvY3VzYWJsZUl0ZW0gb2YgZm9jdXNhYmxlSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIGZvY3VzYWJsZUl0ZW0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2FkZFNraXBCdG4oKSB7XHJcbiAgICAgICAgY29uc3QgYmVmb3JlRWwgPSBjcmVhdGVFbGVtZW50KGA8YnV0dG9uIGNsYXNzPVwiYTExeS1zbGlkZXItc3Itb25seVwiIHR5cGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIj5DbGljayB0byBza2lwIHNsaWRlciBjYXJvdXNlbDwvYnV0dG9uPmApO1xyXG4gICAgICAgIGNvbnN0IGFmdGVyRWwgPSBjcmVhdGVFbGVtZW50KGA8ZGl2IGNsYXNzPVwiYTExeS1zbGlkZXItc3Itb25seVwiIHRhYmluZGV4PVwiLTFcIj5FbmQgb2Ygc2xpZGVyIGNhcm91c2VsPC9kaXY+YCk7XHJcblxyXG4gICAgICAgIC8vIEV2ZW50IGhhbmRsZXIgdG8gZ28gdG8gZW5kXHJcbiAgICAgICAgY29uc3QgZm9jdXNFbmQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhMTF5Q2xpY2soZXZlbnQpID09PSB0cnVlKSBhZnRlckVsLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgYmVmb3JlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb2N1c0VuZCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgICAgIGJlZm9yZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZm9jdXNFbmQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHRvIERPTVxyXG4gICAgICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBiZWZvcmVFbCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIGFmdGVyRWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3JlbW92ZVNraXBCdG4oKSB7XHJcbiAgICAgICAgY29uc3Qgc2tpcEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYTExeS1zbGlkZXItc3Itb25seScpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBza2lwRWxlbWVudCBvZiBza2lwRWxlbWVudHMpIHtcclxuICAgICAgICAgICAgaWYgKHNraXBFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHNraXBFbGVtZW50LnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKHNraXBFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZW5lcmF0ZURvdHMoKSB7XHJcbiAgICAgICAgdGhpcy5kb3RzID0gY3JlYXRlRWxlbWVudChgPHVsIGNsYXNzPVwiJHt0aGlzLl9kb3RzQ2xhc3N9XCI+PC91bD5gKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBkb3RMaSA9IGNyZWF0ZUVsZW1lbnQoJzxsaT48L2xpPicpO1xyXG4gICAgICAgICAgICBjb25zdCBkb3RCdG4gPSBjcmVhdGVFbGVtZW50KCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj4nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0ZXh0XHJcbiAgICAgICAgICAgIGRvdEJ0bi50ZXh0Q29udGVudCA9IGBNb3ZlIHNsaWRlciB0byBpdGVtICMke2kgKyAxfWA7XHJcblxyXG4gICAgICAgICAgICAvLyBFdmVudCBoYW5kbGVycyB0byBzd2l0Y2ggdG8gc2xpZGVcclxuICAgICAgICAgICAgY29uc3Qgc3dpdGNoVG9TbGlkZSA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChhMTF5Q2xpY2soZXZlbnQpID09PSB0cnVlKSB0aGlzLnNjcm9sbFRvU2xpZGUodGhpcy5zbGlkZXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgICAgIGRvdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaFRvU2xpZGUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgZG90QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgc3dpdGNoVG9TbGlkZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRvIFVMXHJcbiAgICAgICAgICAgIGRvdExpLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZG90QnRuKTtcclxuICAgICAgICAgICAgdGhpcy5kb3RzLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZG90TGkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBkb3RzIFVMIHRvIERPTVxyXG4gICAgICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCB0aGlzLmRvdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3JlbW92ZURvdHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG90cyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG90cy5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZCh0aGlzLmRvdHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVEb3RzKGFjdGl2ZVNsaWRlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvdHMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVJbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYWN0aXZlU2xpZGUucGFyZW50Tm9kZSEuY2hpbGRyZW4sIGFjdGl2ZVNsaWRlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc2V0IGNoaWxkcmVuIGFjdGl2ZSBjbGFzcyBpZiBleGlzdFxyXG4gICAgICAgICAgICBmb3IgKGxldCBkb3Qgb2YgdGhpcy5kb3RzLmNoaWxkcmVuKSBkb3QucXVlcnlTZWxlY3RvcignYnV0dG9uJykhLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIGNsYXNzIHRvIGFjdGl2ZSBkb3RcclxuICAgICAgICAgICAgdGhpcy5kb3RzLmNoaWxkcmVuW2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKSEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dvUHJldk9yTmV4dChkaXJlY3Rpb246IFNsaWRlRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fZ2V0QWN0aXZlQW5kVmlzaWJsZSgodmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSwgYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0U2xpZGUgPSB0aGlzLnNsaWRlci5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3QgbGFzdFNsaWRlID0gdGhpcy5zbGlkZXIubGFzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3RWaXNpYmxlU2xpZGUgPSB2aXNpYmxlU2xpZGVzWzBdO1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0VmlzaWJsZVNsaWRlID0gdmlzaWJsZVNsaWRlc1t2aXNpYmxlU2xpZGVzLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gU2xpZGVEaXJlY3Rpb24uTmV4dCkge1xyXG4gICAgICAgICAgICAgICAgLy8gV3JhcCB0byB0aGUgZmlyc3Qgc2xpZGUgaWYgd2UncmUgY3VycmVudGx5IG9uIHRoZSBsYXN0XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdFZpc2libGVTbGlkZSA9PT0gbGFzdFNsaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NsaWRlKGZpcnN0U2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvU2xpZGUoYWN0aXZlU2xpZGUhLm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBTbGlkZURpcmVjdGlvbi5QcmV2KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXcmFwIHRvIHRoZSBsYXN0IHNsaWRlIGlmIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgZmlyc3RcclxuICAgICAgICAgICAgICAgIGlmIChmaXJzdFZpc2libGVTbGlkZSA9PT0gZmlyc3RTbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9TbGlkZShsYXN0U2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvU2xpZGUoYWN0aXZlU2xpZGUhLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjcm9sbFRvU2xpZGUodGFyZ2V0U2xpZGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgbW9kZXJuQnJvd3NlcjogYm9vbGVhbiA9ICEhSFRNTEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbFRvO1xyXG5cclxuICAgICAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnRcclxuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdiZWZvcmVDaGFuZ2UnLCB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5hY3RpdmVTbGlkZSxcclxuICAgICAgICAgICAgbmV4dFNsaWRlOiB0YXJnZXRTbGlkZSxcclxuICAgICAgICAgICAgYTExeVNsaWRlcjogdGhpc1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgc2xpZGVyJ3MgaGVpZ2h0IGJhc2VkIG9uIGNvbnRlbnQgb2Ygc2xpZGVcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlKSB0aGlzLl91cGRhdGVIZWlnaHQodGFyZ2V0U2xpZGUpO1xyXG5cclxuICAgICAgICAvLyBNb3ZlIHNsaWRlciB0byBzcGVjaWZpYyBpdGVtXHJcbiAgICAgICAgaWYgKG1vZGVybkJyb3dzZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2Nyb2xsKHtcclxuICAgICAgICAgICAgICAgIGxlZnQ6IHRhcmdldFNsaWRlLm9mZnNldExlZnQsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCA9IHRhcmdldFNsaWRlLm9mZnNldExlZnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUcmlnZ2VyIGRvdCB1cGRhdGVcclxuICAgICAgICB0aGlzLl91cGRhdGVEb3RzKHRhcmdldFNsaWRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIGVsZW1lbnQgaXMgcGFzc2VkIHNsaWRlcidzIGhlaWdodCB3aWxsIG1hdGNoXHJcbiAgICAgKiAgaXQgb3RoZXJ3aXNlIHRoZSBoZWlnaHQgb2YgdGhlIHNsaWRlciBpcyByZW1vdmVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF91cGRhdGVIZWlnaHQodGFyZ2V0OiBIVE1MRWxlbWVudCB8IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEhlaWdodCA9IHRhcmdldC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLmhlaWdodCA9IGAke3RhcmdldEhlaWdodH1weGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldEFjdGl2ZUFuZFZpc2libGUoY2FsbGJhY2s/OiBBY3RpdmVWaXNpYmxlU2xpZGVzKSB7XHJcbiAgICAgICAgbGV0IHZpc2libGVTbGlkZXM6IEhUTUxFbGVtZW50W10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gT25seSBkZXRlY3RzIGl0ZW1zIGluIHRoZSB2aXNpYmxlIHZpZXdwb3J0IG9mIHRoZSBwYXJlbnQgZWxlbWVudFxyXG4gICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRoaXMuc2xpZGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlcldpZHRoID0gdGhpcy5zbGlkZXIuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlclBvc2l0aW9uID0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdDtcclxuICAgICAgICAgICAgY29uc3Qgc2xpZGVPZmZzZXQgPSBzbGlkZS5vZmZzZXRMZWZ0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHNsaWRlT2Zmc2V0ID49IHNsaWRlclBvc2l0aW9uICYmIHNsaWRlT2Zmc2V0IDwgKHNsaWRlclBvc2l0aW9uICsgc2xpZGVyV2lkdGgpKSB7XHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlU2xpZGVzLnB1c2goc2xpZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZpc2libGVTbGlkZXMgPSB2aXNpYmxlU2xpZGVzO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB2aXNpYmxlU2xpZGVzWzBdO1xyXG5cclxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh0aGlzLnZpc2libGVTbGlkZXMsIHRoaXMuYWN0aXZlU2xpZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2hhbmRsZVByZXYoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGExMXlDbGljayhldmVudCkgPT09IHRydWUpIHRoaXMuX2dvUHJldk9yTmV4dChTbGlkZURpcmVjdGlvbi5QcmV2KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oYW5kbGVOZXh0KGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmIChhMTF5Q2xpY2soZXZlbnQpID09PSB0cnVlKSB0aGlzLl9nb1ByZXZPck5leHQoU2xpZGVEaXJlY3Rpb24uTmV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaGFuZGxlU2Nyb2xsKCkge1xyXG4gICAgICAgIC8vIFVwZGF0ZSBDU1NcclxuICAgICAgICB0aGlzLl9zZXRDU1MoKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50XHJcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnYWZ0ZXJDaGFuZ2UnLCB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5hY3RpdmVTbGlkZSxcclxuICAgICAgICAgICAgYTExeVNsaWRlcjogdGhpc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Rpc3BhdGNoRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRldGFpbDogb2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBjcm9zc0N1c3RvbUV2ZW50KGV2ZW50TmFtZSwgeyBkZXRhaWwgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTnVrZSB0aGUgc2xpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgICAgIC8vIFVuZG9zIGV2ZXJ5dGhpbmcgZnJvbSBfZW5hYmxlU2xpZGVyKClcclxuICAgICAgICB0aGlzLl9kaXNhYmxlU2xpZGVyKCk7XHJcblxyXG4gICAgICAgIC8vIFVuZG9zIGV2ZXJ5dGhpbmcgZnJvbSBpbml0KClcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fY2hlY2tTaG91bGRFbmFibGVEZWJvdW5jZWQpO1xyXG5cclxuICAgICAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnRcclxuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdkZXN0cm95Jywge1xyXG4gICAgICAgICAgICBhMTF5U2xpZGVyOiB0aGlzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOlsiZ2xvYmFsIiwicmVxdWlyZSQkMCIsImRvY3VtZW50IiwiREVTQ1JJUFRPUlMiLCJjcmVhdGVFbGVtZW50IiwiSUU4X0RPTV9ERUZJTkUiLCJkZWZpbmVQcm9wZXJ0eU1vZHVsZSIsIlN5bWJvbCIsIk5BVElWRV9TWU1CT0wiLCJ3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlIiwiY2xhc3NvZiIsIkluZGV4ZWRPYmplY3QiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSIsIm5hdGl2ZUZ1bmN0aW9uVG9TdHJpbmciLCJXZWFrTWFwIiwiaGFzIiwiTkFUSVZFX1dFQUtfTUFQIiwic3RvcmUiLCJvYmplY3RIYXMiLCJJbnRlcm5hbFN0YXRlTW9kdWxlIiwibWluIiwiaGlkZGVuS2V5cyIsImludGVybmFsT2JqZWN0S2V5cyIsImdldE93blByb3BlcnR5TmFtZXNNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc0ZvcmNlZCIsIiQiLCJhc3NpZ24iLCJjcmVhdGVNZXRob2QiLCJDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIiLCJnZXRQcm90b3R5cGVPZiIsIklFX1BST1RPIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiSXRlcmF0b3JQcm90b3R5cGUiLCJjcmVhdGUiLCJJdGVyYXRvcnNDb3JlIiwiQlVHR1lfU0FGQVJJX0lURVJBVE9SUyIsIklURVJBVE9SIiwicmV0dXJuVGhpcyIsInNldFByb3RvdHlwZU9mIiwic2V0SW50ZXJuYWxTdGF0ZSIsImdldEludGVybmFsU3RhdGUiLCJUT19TVFJJTkdfVEFHIiwiQXJyYXlJdGVyYXRvck1ldGhvZHMiLCJET01JdGVyYWJsZXMiLCJodG1sIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwiYm9keSIsImZpcnN0Q2hpbGQiLCJhMTF5Q2xpY2siLCJldmVudCIsImNvZGUiLCJjaGFyQ29kZSIsImtleUNvZGUiLCJ0eXBlIiwicHJldmVudERlZmF1bHQiLCJjcm9zc0N1c3RvbUV2ZW50IiwicGFyYW1zIiwiZXZ0IiwiY3JlYXRlRXZlbnQiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsImRldGFpbCIsInVuZGVmaW5lZCIsImluaXRDdXN0b21FdmVudCIsImlzSW50ZWdlciIsInZhbHVlIiwiaXNGaW5pdGUiLCJNYXRoIiwiZmxvb3IiLCJTbGlkZURpcmVjdGlvbiIsIlNsaWRlclN0YXRlIiwiQTExWVNsaWRlciIsImVsZW1lbnQiLCJvcHRpb25zIiwic2xpZGVyIiwic2xpZGVzIiwiY2hpbGRyZW4iLCJzbGlkZXJDb250YWluZXIiLCJfYWN0aXZlQ2xhc3MiLCJfdmlzaWJsZUNsYXNzIiwiX2RvdHNDbGFzcyIsIl9zbGlkZXJDbGFzcyIsIl9mb2N1c2FibGUiLCJkb3RzIiwiYWN0aXZlU2xpZGUiLCJ2aXNpYmxlU2xpZGVzIiwic2xpZGVyRW5hYmxlZCIsIkRpc2FibGVkIiwiX2hhc0N1c3RvbUJ0bnMiLCJwcmV2QnRuIiwibmV4dEJ0biIsImNvbnRhaW5lciIsIm5hdkJ0bnMiLCJhZGFwdGl2ZUhlaWdodCIsInNraXBCdG4iLCJpdGVtcyIsIk9iamVjdCIsIl9oYW5kbGVQcmV2IiwiYmluZCIsIl9oYW5kbGVOZXh0IiwiX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkIiwiZGVib3VuY2UiLCJfY2hlY2tTaG91bGRFbmFibGUiLCJfdXBkYXRlSGVpZ2h0RGVib3VuY2VkIiwiX3VwZGF0ZUhlaWdodCIsIl91cGRhdGVTY3JvbGxQb3NpdGlvbiIsInNjcm9sbFRvU2xpZGUiLCJfaGFuZGxlU2Nyb2xsIiwiX2luaXQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiX2Rpc3BhdGNoRXZlbnQiLCJhMTF5U2xpZGVyIiwic2hvdWxkRW5hYmxlIiwibGVuZ3RoIiwiX2dldEFjdGl2ZUFuZFZpc2libGUiLCJfZW5hYmxlU2xpZGVyIiwiRW5hYmxlZCIsIl9kaXNhYmxlU2xpZGVyIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiX2FkZFNraXBCdG4iLCJIVE1MRWxlbWVudCIsInByZXZCdG5zIiwibmV4dEJ0bnMiLCJwYXNzaXZlIiwiX2dlbmVyYXRlRG90cyIsIl9zZXRDU1MiLCJjb250YWlucyIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsIl9yZW1vdmVTa2lwQnRuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl9yZW1vdmVEb3RzIiwiX3JlbW92ZUNTUyIsIl91cGRhdGVJdGVtc0NTUyIsImNsYXNzTGlzdCIsImFkZCIsInNsaWRlIiwicmVtb3ZlIiwiX3VwZGF0ZURvdHMiLCJfYWRkRm9jdXNhYmxlIiwiX3JlbW92ZUl0ZW1zQ1NTIiwiX3JlbW92ZUZvY3VzYWJsZSIsInNsaWRlV2lkdGgiLCJzdHlsZSIsImRpc3BsYXkiLCJ3aWR0aCIsInJlbW92ZVByb3BlcnR5IiwiZm9jdXNhYmxlSXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2V0QXR0cmlidXRlIiwiZm9jdXNhYmxlSXRlbSIsInJlbW92ZUF0dHJpYnV0ZSIsImJlZm9yZUVsIiwiYWZ0ZXJFbCIsImZvY3VzRW5kIiwiZm9jdXMiLCJza2lwRWxlbWVudHMiLCJza2lwRWxlbWVudCIsImkiLCJkb3RMaSIsImRvdEJ0biIsInRleHRDb250ZW50Iiwic3dpdGNoVG9TbGlkZSIsImFjdGl2ZUluZGV4IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJpbmRleE9mIiwiY2FsbCIsImRvdCIsInF1ZXJ5U2VsZWN0b3IiLCJkaXJlY3Rpb24iLCJmaXJzdFNsaWRlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJsYXN0U2xpZGUiLCJsYXN0RWxlbWVudENoaWxkIiwiZmlyc3RWaXNpYmxlU2xpZGUiLCJsYXN0VmlzaWJsZVNsaWRlIiwiTmV4dCIsIm5leHRFbGVtZW50U2libGluZyIsIlByZXYiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwidGFyZ2V0U2xpZGUiLCJtb2Rlcm5Ccm93c2VyIiwic2Nyb2xsVG8iLCJjdXJyZW50U2xpZGUiLCJuZXh0U2xpZGUiLCJzY3JvbGwiLCJsZWZ0Iiwib2Zmc2V0TGVmdCIsImJlaGF2aW9yIiwic2Nyb2xsTGVmdCIsInRhcmdldCIsInRhcmdldEhlaWdodCIsIm9mZnNldEhlaWdodCIsImhlaWdodCIsImNhbGxiYWNrIiwic2xpZGVyV2lkdGgiLCJjbGllbnRXaWR0aCIsInNsaWRlclBvc2l0aW9uIiwic2xpZGVPZmZzZXQiLCJwdXNoIiwiX2dvUHJldk9yTmV4dCIsImV2ZW50TmFtZSIsImRpc3BhdGNoRXZlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0NBQUEsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO0NBQ2pCLElBQUksS0FBSyxHQUFHLFVBQVUsRUFBRSxFQUFFO0dBQ3hCLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztFQUNwQyxDQUFDOzs7Q0FHRixZQUFjOztHQUVaLEtBQUssQ0FBQyxPQUFPLFVBQVUsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDO0dBQzNDLEtBQUssQ0FBQyxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDO0dBQ25DLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO0dBQy9CLEtBQUssQ0FBQyxPQUFPQSxjQUFNLElBQUksQ0FBQyxJQUFJQSxjQUFNLENBQUM7O0dBRW5DLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDOztDQ2I1QixRQUFjLEdBQUdDLFFBQThCLENBQUM7O0NDQWhELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7O0NBRXZDLE9BQWMsR0FBRyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUU7R0FDbEMsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNyQyxDQUFDOztDQ0pGLFNBQWMsR0FBRyxVQUFVLElBQUksRUFBRTtHQUMvQixJQUFJO0tBQ0YsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakIsQ0FBQyxPQUFPLEtBQUssRUFBRTtLQUNkLE9BQU8sSUFBSSxDQUFDO0lBQ2I7RUFDRixDQUFDOztDQ0pGO0NBQ0EsZUFBYyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVk7R0FDbEMsT0FBTyxNQUFNLENBQUMsY0FB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
