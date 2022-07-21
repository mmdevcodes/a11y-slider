
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.A11YSlider = factory());
}(this, function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
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

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
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

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
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

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
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
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.4',
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

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
	    createNonEnumerableProperty(it, STATE, metadata);
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
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
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
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

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
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
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
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
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
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var defineProperty = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var $forEach = arrayIteration.forEach;



	var STRICT_METHOD = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	var $indexOf = arrayIncludes.indexOf;



	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$1 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $map = arrayIteration.map;



	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
	// FF49- issue
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('map');

	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$2 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

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

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    objectSetPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
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

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$2 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$2(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$2(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$2(3)
	};

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$1 = objectDefineProperty.f;
	var trim = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global_1[NUMBER];
	var NumberPrototype = NativeNumber.prototype;

	// Opera ~12 has broken Object#toString
	var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

	// `ToNumber` abstract operation
	// https://tc39.github.io/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim(it);
	    first = it.charCodeAt(0);
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
	        default: return +it;
	      }
	      digits = it.slice(2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = digits.charCodeAt(index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	// `Number` constructor
	// https://tc39.github.io/ecma262/#sec-number-constructor
	if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var dummy = this;
	    return dummy instanceof NumberWrapper
	      // check on 1..constructor(foo) case
	      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
	        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
	  };
	  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys$1.length > j; j++) {
	    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
	      defineProperty$1(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine(global_1, NUMBER, NumberWrapper);
	}

	var trim$1 = stringTrim.trim;


	var $parseInt = global_1.parseInt;
	var hex = /^[+-]?0[Xx]/;
	var FORCED$1 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

	// `parseInt` method
	// https://tc39.github.io/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED$1 ? function parseInt(string, radix) {
	  var S = trim$1(String(string));
	  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
	} : $parseInt;

	// `Number.parseInt` method
	// https://tc39.github.io/ecma262/#sec-number.parseint
	_export({ target: 'Number', stat: true, forced: Number.parseInt != numberParseInt }, {
	  parseInt: numberParseInt
	});

	var nativeAssign = Object.assign;
	var defineProperty$2 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$2({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$2(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
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

	var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	// `Object.{ entries, values }` methods implementation
	var createMethod$3 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!descriptors || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.github.io/ecma262/#sec-object.entries
	  entries: createMethod$3(true),
	  // `Object.values` method
	  // https://tc39.github.io/ecma262/#sec-object.values
	  values: createMethod$3(false)
	};

	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.github.io/ecma262/#sec-object.entries
	_export({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
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

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
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

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function ownKeys$1(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    if (enumerableOnly) symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    });
	    keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};

	    if (i % 2) {
	      ownKeys$1(Object(source), true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys$1(Object(source)).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	      });
	    }
	  }

	  return target;
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};

	  var target = _objectWithoutPropertiesLoose(source, excluded);

	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
	  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var debounce=function(i,e,o){var t;return void 0===e&&(e=50),void 0===o&&(o={isImmediate:!1}),function(){for(var a=[],d=arguments.length;d--;)a[d]=arguments[d];var n=this,m=o.isImmediate&&void 0===t;void 0!==t&&clearTimeout(t),t=setTimeout(function(){t=void 0,o.isImmediate||i.apply(n,a);},e),m&&i.apply(n,a);}};

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	var createElement = function createElement(html) {
	  var el = new DOMParser().parseFromString(html, 'text/html').body.firstChild;

	  if (el instanceof HTMLElement) {
	    return el;
	  } else {
	    throw new Error("Supplied markup does not create an HTML Element");
	  }
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
	  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value && value != null && !isNaN(Number(value.toString()));
	};
	var isObject$1 = function isObject(value) {
	  return _typeof(value) === 'object' && value !== null;
	}; // https://stackoverflow.com/a/24048615

	var canAccessAsArray = function canAccessAsArray(item) {
	  if (Array.isArray(item)) {
	    return true;
	  } // modern browser such as IE9 / firefox / chrome etc.


	  var result = Object.prototype.toString.call(item);

	  if (result === '[object HTMLCollection]' || result === '[object NodeList]') {
	    return true;
	  } //ie 6/7/8


	  if (_typeof(item) !== 'object' || !item.hasOwnProperty('length') || item.length < 0) {
	    return false;
	  } // a false positive on an empty pseudo-array is OK because there won't be anything
	  // to iterate so we allow anything with .length === 0 to pass the test


	  if (item.length === 0) {
	    return true;
	  } else if (item[0] && item[0].nodeType) {
	    return true;
	  }

	  return false;
	}; // Run a function on all elements even if it's a collection or single

	var everyElement = function everyElement(elements, callback) {
	  // Return if nothing passed
	  if (elements === undefined) return; // Wrap elements in an array if single

	  var els = canAccessAsArray(elements) ? elements : [elements]; // Oldschool array iterator method for IE (avoiding polyfills)

	  Array.prototype.slice.call(els).forEach(function (el) {
	    if (el instanceof HTMLElement) {
	      callback && callback(el);
	    }
	  });
	};
	/**
	 * Get computed width/height with subpixels
	 * https://github.com/Vestride/glen.codes/blob/master/src/posts/getting-element-width.md
	 */

	var getSubpixelStyle = function getSubpixelStyle(element, style, styles) {
	  var HAS_COMPUTED_STYLE = !!window.getComputedStyle;

	  var getStyles = window.getComputedStyle || function () {};

	  var COMPUTED_SIZE_INCLUDES_PADDING = function () {
	    if (!HAS_COMPUTED_STYLE) {
	      return false;
	    }

	    var parent = document.body || document.documentElement;
	    var e = document.createElement('div');
	    e.style.cssText = 'width:10px;padding:2px;' + '-webkit-box-sizing:border-box;box-sizing:border-box;';
	    parent.appendChild(e);
	    var width = getStyles(e, null).width;
	    var ret = width === '10px';
	    parent.removeChild(e);
	    return ret;
	  }();
	  /**
	   * Retrieve the computed style for an element, parsed as a float.
	   * @param {Element} element Element to get style for.
	   * @param {string} style Style property.
	   * @param {CSSStyleDeclaration} [styles] Optionally include clean styles to
	   *     use instead of asking for them again.
	   * @return {number} The parsed computed value or zero if that fails because IE
	   *     will return 'auto' when the element doesn't have margins instead of
	   *     the computed style.
	   */


	  var getNumberStyle = function getNumberStyle(el, elStyle, elStyles) {
	    if (HAS_COMPUTED_STYLE) {
	      elStyles = elStyles || getStyles(el, null);
	      var value = getFloat(elStyles[elStyle]); // Support IE<=11 and W3C spec.

	      if (!COMPUTED_SIZE_INCLUDES_PADDING && elStyle === 'width') {
	        value += getFloat(elStyles.paddingLeft) + getFloat(elStyles.paddingRight) + getFloat(elStyles.borderLeftWidth) + getFloat(elStyles.borderRightWidth);
	      } else if (!COMPUTED_SIZE_INCLUDES_PADDING && elStyle === 'height') {
	        value += getFloat(elStyles.paddingTop) + getFloat(elStyles.paddingBottom) + getFloat(elStyles.borderTopWidth) + getFloat(elStyles.borderBottomWidth);
	      }

	      return value;
	    } else {
	      return getFloat(el.style[elStyle]);
	    }
	  };

	  var isNumber = function isNumber(n) {
	    return !isNaN(parseFloat(n)) && isFinite(n);
	  };

	  var getFloat = function getFloat(value) {
	    value = parseFloat(value);
	    return isNumber(value) ? value : 0;
	  };

	  return getNumberStyle(element, style, styles);
	};
	var getPreviousSiblings = function getPreviousSiblings(element) {
	  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
	  var elements = [];
	  var sibling = element.previousSibling;

	  while (sibling && elements.length < amount) {
	    elements.push(sibling);
	    sibling = sibling.previousSibling;
	  }

	  return elements;
	};
	var getNextSiblings = function getNextSiblings(element) {
	  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
	  var elements = [];
	  var sibling = element.nextSibling;

	  while (sibling && elements.length < amount) {
	    elements.push(sibling);
	    sibling = sibling.nextSibling;
	  }

	  return elements;
	};

	var SlideDirection;

	(function (SlideDirection) {
	  SlideDirection[SlideDirection["Prev"] = 0] = "Prev";
	  SlideDirection[SlideDirection["Next"] = 1] = "Next";
	})(SlideDirection || (SlideDirection = {}));

	var SliderState;

	(function (SliderState) {
	  SliderState[SliderState["Enabled"] = 1] = "Enabled";
	  SliderState[SliderState["Disabled"] = 0] = "Disabled";
	})(SliderState || (SliderState = {}));

	var AutoplaySwitch;

	(function (AutoplaySwitch) {
	  AutoplaySwitch[AutoplaySwitch["Enable"] = 0] = "Enable";
	  AutoplaySwitch[AutoplaySwitch["Disable"] = 1] = "Disable";
	})(AutoplaySwitch || (AutoplaySwitch = {}));

	var IsAutoplaying;

	(function (IsAutoplaying) {
	  IsAutoplaying[IsAutoplaying["Yes"] = 0] = "Yes";
	  IsAutoplaying[IsAutoplaying["No"] = 0] = "No";
	})(IsAutoplaying || (IsAutoplaying = {}));

	var A11YSlider = /*#__PURE__*/function () {
	  function A11YSlider(element, options) {
	    var _this = this;

	    _classCallCheck(this, A11YSlider);

	    // Enforce `element` parameter
	    if (!(element instanceof HTMLElement)) {
	      throw new Error('The required input [element] must be an HTMLElement');
	    } // Make sure options parameter is correct


	    if (options !== undefined && !isObject$1(options)) {
	      throw new Error('The required input [options] must be an Object');
	    }

	    this.slider = element;
	    this.slides = element.children;
	    this.sliderContainer = createElement('<div class="a11y-slider-container"></div>');
	    this._activeClass = 'a11y-slider-active';
	    this._visibleClass = 'a11y-slider-visible';
	    this._dotsClass = 'a11y-slider-dots';
	    this._sliderClass = 'a11y-slider';
	    this._focusable = 'a, area, input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
	    this._autoplayTimer = IsAutoplaying.No;
	    this.autoplayBtn = createElement("<button type=\"button\" class=\"a11y-slider-autoplay\">Toggle slider autoplay</button>");
	    this._pauseOnMouseLeave = false;
	    this._skipBtns = [];
	    this.dots = null;
	    this.swipe = true;
	    this.activeSlide = this.slides[0];
	    this.visibleSlides = [];
	    this.sliderEnabled = SliderState.Disabled;
	    this.modernBrowser = !!HTMLElement.prototype.scrollTo;
	    this.mouseDown = false;
	    this.touchStart = false;
	    this.swipeStartX = 0;
	    this.swipeX = 0;
	    this.swipeXCached = 0;
	    this._hasCustomArrows = options && options.prevArrow || options && options.nextArrow ? true : false;
	    this.options = {
	      container: true,
	      arrows: true,
	      prevArrow: options && options.prevArrow || createElement('<button type="button" class="a11y-slider-prev">Previous slide</button>'),
	      nextArrow: options && options.nextArrow || createElement('<button type="button" class="a11y-slider-next">Next slide</button>'),
	      dots: true,
	      adaptiveHeight: false,
	      skipBtn: true,
	      slidesToShow: null,
	      autoplay: false,
	      autoplaySpeed: 4000,
	      autoplayHoverPause: true,
	      centerMode: false,
	      infinite: true,
	      disable: false,
	      responsive: null,
	      customPaging: null,
	      swipe: true
	    }; // Set user-inputted options if available

	    this.options = _objectSpread2(_objectSpread2({}, this.options), options); // Bindings

	    this._handlePrev = this._handlePrev.bind(this);
	    this._handleNext = this._handleNext.bind(this);
	    this._handleAutoplay = this._handleAutoplay.bind(this);
	    this._handleAutoplayHover = this._handleAutoplayHover.bind(this);
	    this._handleAutoplayEvent = this._handleAutoplayEvent.bind(this);
	    this._checkShouldEnableDebounced = debounce(this._checkShouldEnable.bind(this), 250);
	    this._updateHeightDebounced = debounce(this._updateHeight.bind(this), 250);
	    this._generateDotsDebounced = debounce(this._generateDots.bind(this), 250);
	    this._updateScrollPosition = debounce(function () {
	      return _this.scrollToSlide(_this.activeSlide);
	    }, 250);
	    this._handleScroll = debounce(this._handleScroll.bind(this), 10); // Calls _scrollFinish

	    this._scrollFinish = debounce(this._scrollFinish.bind(this), 175); // May fire twice depending on browser

	    this._swipeMouseDown = this._swipeMouseDown.bind(this);
	    this._swipeMouseUp = this._swipeMouseUp.bind(this);
	    this._swipeMouseMove = this._swipeMouseMove.bind(this);
	    this._swipeTouchStart = this._swipeTouchStart.bind(this);
	    this._swipeTouchEnd = this._swipeTouchEnd.bind(this);
	    this._swipeTouchMove = this._swipeTouchMove.bind(this); // Initialize slider

	    this._init();
	  } // Initialize the slider, should mirror destroy()


	  _createClass(A11YSlider, [{
	    key: "_init",
	    value: function _init() {
	      var _this2 = this;

	      // Firefox moves the slider depending on page load so resetting to 0
	      setTimeout(function () {
	        return _this2.slider.scrollLeft = 0;
	      }, 1); // Generate listeners for responsive options if added

	      if (isObject$1(this.options.responsive)) this._checkResponsive(); // Check if the slider should be initialized depending on slides shown

	      this._checkShouldEnable(); // Enable/disable slider after resize


	      window.addEventListener('resize', this._checkShouldEnableDebounced);

	      this._dispatchEvent('init', {
	        a11ySlider: this
	      });
	    }
	  }, {
	    key: "_checkShouldEnable",
	    value: function _checkShouldEnable() {
	      var _this3 = this;

	      var shouldEnable = true; // If user specified to disable (usually for responsive or updateOptions)

	      if (this.options.disable === true) shouldEnable = false; // If 1 or less slides exist then a slider is not needed

	      if (this.slides.length <= 1) shouldEnable = false; // If user explicitly set slides to be shown and it's the same number as available

	      if (isInteger(this.options.slidesToShow)) {
	        if (this.slides.length === this.options.slidesToShow) shouldEnable = false;
	      } else {
	        // If there are no slides outside the slider's viewport a slider is not needed
	        this._getActiveAndVisible(null, function (visibleSlides) {
	          if (visibleSlides.length === _this3.slides.length) shouldEnable = false;
	        });
	      } // Enable/disable slider based on above requirements


	      if (shouldEnable && this.sliderEnabled === SliderState.Disabled) {
	        this._enableSlider();
	      } else if (!shouldEnable && this.sliderEnabled === SliderState.Enabled) {
	        this._disableSlider();
	      } // Custom buttons should be hidden if not initially enabled


	      if (!shouldEnable && this._hasCustomArrows) {
	        everyElement(this.options.prevArrow, function (prevArrow) {
	          prevArrow.classList.add('a11y-slider-hide');
	        });
	        everyElement(this.options.nextArrow, function (nextArrow) {
	          nextArrow.classList.add('a11y-slider-hide');
	        });
	      }
	    } // Enable all functionality for the slider. Should mirror _disableSlider()

	  }, {
	    key: "_enableSlider",
	    value: function _enableSlider() {
	      var _this4 = this;

	      // Set slider to enabled
	      this.sliderEnabled = SliderState.Enabled; // Add slider container to DOM and move slider into it if enabled

	      if (this.options.container) {
	        this.slider.insertAdjacentElement('beforebegin', this.sliderContainer);
	        this.sliderContainer.insertAdjacentElement('afterbegin', this.slider);
	      } // Add skip button before slider if enabled


	      if (this.options.skipBtn) this._addSkipBtn(); // If prev/next buttons are enabled and user isn't using their own add it to the DOM

	      if (this.options.arrows && !this._hasCustomArrows) {
	        if (this.options.prevArrow instanceof HTMLElement) {
	          this.slider.insertAdjacentElement('beforebegin', this.options.prevArrow);
	        }

	        if (this.options.nextArrow instanceof HTMLElement) {
	          this.slider.insertAdjacentElement('beforebegin', this.options.nextArrow);
	        }
	      } // Possible for there to be multiple so need to loop through them all


	      everyElement(this.options.prevArrow, function (prevArrow) {
	        // Add event listeners for prev/next buttons
	        prevArrow.addEventListener('click', _this4._handlePrev, {
	          passive: true
	        });
	        prevArrow.addEventListener('keypress', _this4._handlePrev, {
	          passive: true
	        });

	        if (_this4._hasCustomArrows) {
	          // User generated buttons get special hide class removed
	          prevArrow.classList.remove('a11y-slider-hide');
	        }
	      });
	      everyElement(this.options.nextArrow, function (nextArrow) {
	        // Add event listeners for prev/next buttons
	        nextArrow.addEventListener('click', _this4._handleNext, {
	          passive: true
	        });
	        nextArrow.addEventListener('keypress', _this4._handleNext, {
	          passive: true
	        });

	        if (_this4._hasCustomArrows) {
	          // User generated buttons get special hide class removed
	          nextArrow.classList.remove('a11y-slider-hide');
	        }
	      }); // Add dot navigation if enabled

	      if (this.options.dots) this._generateDots(); // Add listener for when the slider stops moving

	      this.slider.addEventListener('scroll', this._handleScroll, false); // Add all CSS needed

	      this._setCSS(); // Adaptive height


	      if (this.options.adaptiveHeight === true) {
	        // Update slider's height based on content of slide
	        this._updateHeight(this.activeSlide); // Also add resize listener for it


	        window.addEventListener('resize', this._updateHeightDebounced.bind(this));
	      } // Start autoplay if enabled


	      if (this.options.autoplay) this._enableAutoplay(); // On resize make sure to update scroll position as content may change in width/height

	      window.addEventListener('resize', this._updateScrollPosition); // Add swipe event listeners

	      if (this.options.swipe) this._enableSwipe();
	    } // Disable all functionality for the slider. Should mirror _enableSlider()

	  }, {
	    key: "_disableSlider",
	    value: function _disableSlider() {
	      var _this5 = this;

	      this.sliderEnabled = SliderState.Disabled; // Remove slider from a11y-slider's container and then remove container from DOM

	      if (document.body.contains(this.sliderContainer)) {
	        this.sliderContainer.insertAdjacentElement('beforebegin', this.slider);
	        this.sliderContainer.parentNode && this.sliderContainer.parentNode.removeChild(this.sliderContainer);
	      } // Remove skip button


	      this._removeSkipBtn(); // Possible for there to be multiple so need to loop through them all


	      everyElement(this.options.prevArrow, function (prevArrow) {
	        // Remove event listeners for prev/next buttons
	        prevArrow.removeEventListener('click', _this5._handlePrev);
	        prevArrow.removeEventListener('keypress', _this5._handlePrev);

	        if (!_this5._hasCustomArrows) {
	          // Only remove generated buttons, not user-defined ones
	          prevArrow.parentNode && prevArrow.parentNode.removeChild(prevArrow);
	        } else {
	          // User generated buttons get special hide class removed
	          prevArrow.classList.add('a11y-slider-hide');
	        }
	      });
	      everyElement(this.options.nextArrow, function (nextArrow) {
	        // Remove event listeners for prev/next buttons
	        nextArrow.removeEventListener('click', _this5._handleNext);
	        nextArrow.removeEventListener('keypress', _this5._handleNext);

	        if (!_this5._hasCustomArrows) {
	          // Only remove generated buttons, not user-defined ones
	          nextArrow.parentNode && nextArrow.parentNode.removeChild(nextArrow);
	        } else {
	          // User generated buttons get special hide class removed
	          nextArrow.classList.add('a11y-slider-hide');
	        }
	      }); // Will remove dots if they exist

	      this._removeDots(); // Remove listener for when the slider stops moving


	      this.slider.removeEventListener('scroll', this._handleScroll, false); // Remove all CSS

	      this._removeCSS(); // Remove all adaptive height functionality


	      window.removeEventListener('resize', this._updateHeightDebounced);

	      this._updateHeight(false); // Stop autoplay if enabled


	      if (this.options.autoplay) this._disableAutoplay(); // Remove swipe event listeners

	      this._disableSwipe(); // Remove scroll position update check


	      window.removeEventListener('resize', this._updateScrollPosition); // Remove swipe functionality

	      if (this.options.swipe) this._disableSwipe();
	    } // Add all CSS needed for the slider. Should mirror _removeCSS()

	  }, {
	    key: "_setCSS",
	    value: function _setCSS(activeSlide) {
	      var _this6 = this;

	      // Update slide element CSS
	      this._addSlidesWidth(); // Update slider instance to get the correct elements


	      this._getActiveAndVisible(activeSlide || null); // Add main slider class if it doesn't have it already


	      this.slider.classList.add(this._sliderClass); // Reset the more dynamic CSS first if it exists

	      everyElement(this.slides, function (slide) {
	        slide.classList.remove(_this6._activeClass);
	        slide.classList.remove(_this6._visibleClass);
	      }); // Add in active classes

	      this.activeSlide.classList.add(this._activeClass); // Add in visible classes

	      everyElement(this.visibleSlides, function (slide) {
	        slide.classList.add(_this6._visibleClass);
	      }); // Trigger dot update

	      this._updateDots(this.activeSlide); // Update all a11y functionality


	      this._updateA11Y();
	    } // Remove all CSS needed for the slider. Should mirror _setCSS()

	  }, {
	    key: "_removeCSS",
	    value: function _removeCSS() {
	      var _this7 = this;

	      // Remove item CSS if it was set
	      this._removeSlidesWidth(); // Remove class to slider


	      this.slider.classList.remove(this._sliderClass); // Reset all the dynamic classes

	      everyElement(this.slides, function (slide) {
	        slide.classList.remove(_this7._activeClass);
	        slide.classList.remove(_this7._visibleClass);
	      }); // Remove all a11y functionality

	      this._removeA11Y();
	    } // Add event listeners for breakpoints

	  }, {
	    key: "_checkResponsive",
	    value: function _checkResponsive() {
	      var _this8 = this;

	      if (!isObject$1(this.options.responsive)) return;

	      var _this$options = this.options,
	          responsive = _this$options.responsive,
	          initialOptions = _objectWithoutProperties(_this$options, ["responsive"]);

	      var breakpoints = []; // Sort media queries from lowest to highest

	      var responsiveOptions = Object.entries(this.options.responsive).sort(function (a, b) {
	        return a[1] - b[1];
	      }); // Create a new JS media query for initial options for the lowest MQ and down

	      breakpoints.push({
	        mql: window.matchMedia("screen and (max-width: ".concat(Number.parseInt(responsiveOptions[0][0]) - 1, "px)")),
	        options: initialOptions
	      }); // Loop through all responsive objects and generate a JS media query

	      responsiveOptions.forEach(function (_ref, i) {
	        var _ref2 = _slicedToArray(_ref, 2),
	            breakpoint = _ref2[0],
	            breakpointOptions = _ref2[1];

	        var options = _objectSpread2({}, _this8.options);

	        var mqlString = "screen and (min-width: ".concat(breakpoint, "px)"); // If there are more media queries after this then create a stopping point

	        if (i !== responsiveOptions.length - 1) {
	          mqlString = mqlString.concat(" and (max-width: ".concat(Number.parseInt(responsiveOptions[i + 1][0]) - 1, "px)"));
	        } // Create a layer cake of options from the lowest breakpoint to the highest


	        breakpoints.forEach(function (breakpoint) {
	          Object.assign(options, breakpoint.options);
	        }); // Add this specific breakpoint to the top of the cake 🎂

	        Object.assign(options, breakpointOptions);
	        breakpoints.push({
	          mql: window.matchMedia(mqlString),
	          options: options
	        });
	      }); // For each JS media query add an event listener

	      breakpoints.map(function (breakpoint) {
	        /**
	         * This should in theory be running at the initialization
	         * so make sure the correct options are set.
	         */
	        if (breakpoint.mql.matches) {
	          Object.assign(_this8.options, breakpoint.options);
	        } // Creates a media query listener


	        breakpoint.mql.addListener(function () {
	          if (breakpoint.mql.matches) {
	            // Update slider with new options
	            _this8.updateOptions(breakpoint.options);
	          }
	        });
	      });
	    } // If slidesToShow is used then manually add slide widths

	  }, {
	    key: "_addSlidesWidth",
	    value: function _addSlidesWidth() {
	      if (isInteger(this.options.slidesToShow)) {
	        // Percentage width of each slide
	        var slideWidth = 100 / this.options.slidesToShow; // Set styles for slider

	        this.slider.style.display = 'flex'; // Set styles for items

	        everyElement(this.slides, function (slide) {
	          slide.style.width = "".concat(slideWidth, "%");
	          slide.style.flex = '0 0 auto';
	        });
	      } else {
	        // Reset everything if number of items not explicitly set
	        this._removeSlidesWidth();
	      }
	    } // Reset slide styling even if explicitly set in the options

	  }, {
	    key: "_removeSlidesWidth",
	    value: function _removeSlidesWidth() {
	      this.slider.style.removeProperty('display');
	      everyElement(this.slides, function (slide) {
	        slide.style.removeProperty('width');
	        slide.style.removeProperty('flex');
	      });
	    } // Update all associated a11y functionality. Should mirror _removeA11Y()

	  }, {
	    key: "_updateA11Y",
	    value: function _updateA11Y() {
	      var _this9 = this;

	      // Reset all a11y functionality to default beforehand
	      this._removeA11Y();

	      everyElement(this.slides, function (slide) {
	        var focusableItems = slide.querySelectorAll(_this9._focusable); // If slide is not visible make the slide wrapper not focusable

	        if (!slide.classList.contains(_this9._visibleClass)) {
	          slide.setAttribute('tabindex', '-1');
	          slide.setAttribute('aria-hidden', 'true');
	        }

	        everyElement(focusableItems, function (focusableItem) {
	          if (!slide.classList.contains(_this9._visibleClass)) {
	            focusableItem.setAttribute('tabindex', '-1');
	          }
	        });
	      }); // Buttons will add disabled state if first/last slide

	      if (this.options.infinite === false) {
	        var firstSlide = this.slider.firstElementChild;
	        var lastSlide = this.slider.lastElementChild;
	        var firstVisibleSlide = this.visibleSlides[0];
	        var lastVisibleSlide = this.visibleSlides[this.visibleSlides.length - 1]; // If current active slide is the first element then disable prev

	        if (firstVisibleSlide === firstSlide) {
	          everyElement(this.options.prevArrow, function (prevArrow) {
	            prevArrow.setAttribute('disabled', '');
	          });
	        } // If current active slide is the last element then disable next


	        if (lastVisibleSlide === lastSlide) {
	          everyElement(this.options.nextArrow, function (nextArrow) {
	            nextArrow.setAttribute('disabled', '');
	          });
	        }
	      }
	    } // Reset all associated a11y functionality. Should mirror _updateA11Y()

	  }, {
	    key: "_removeA11Y",
	    value: function _removeA11Y() {
	      var _this10 = this;

	      everyElement(this.slides, function (slide) {
	        var focusableItems = slide.querySelectorAll(_this10._focusable); // Remove a11y for each slide wrapper

	        slide.removeAttribute('tabindex');
	        slide.removeAttribute('aria-hidden'); // Reset a11y attributes for slide inner elements

	        everyElement(focusableItems, function (focusableItem) {
	          focusableItem.removeAttribute('tabindex');
	        });
	      }); // Buttons could potentially have disabled state so removing

	      everyElement(this.options.prevArrow, function (prevArrow) {
	        return prevArrow.removeAttribute('disabled');
	      });
	      everyElement(this.options.nextArrow, function (nextArrow) {
	        return nextArrow.removeAttribute('disabled');
	      });
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
	      this.slider.insertAdjacentElement('afterend', afterEl); // If skip buttons exist for whatever reason, empty array

	      this._skipBtns = []; // Add newly created buttons to library scope

	      this._skipBtns.push(beforeEl, afterEl);
	    }
	  }, {
	    key: "_removeSkipBtn",
	    value: function _removeSkipBtn() {
	      var elements = [].concat(_toConsumableArray(getPreviousSiblings(this.slider)), _toConsumableArray(getNextSiblings(this.slider)));
	      everyElement(this._skipBtns, function (skipBtn) {
	        skipBtn.parentNode && skipBtn.parentNode.removeChild(skipBtn);
	      });
	      everyElement(elements, function (element) {
	        if (element.classList.contains('a11y-slider-sr-only')) {
	          element.parentNode && element.parentNode.removeChild(element);
	        }
	      });
	    }
	  }, {
	    key: "_generateDots",
	    value: function _generateDots() {
	      var _this11 = this;

	      if (this.options.dots === false) return; // Remove dots if they already exist

	      this._removeDots(); // Stop if slider is disabled


	      if (this.sliderEnabled === SliderState.Disabled) return; // Create <ul> wrapper for dots

	      this.dots = createElement("<ul class=\"".concat(this._dotsClass, "\"></ul>"));

	      var _loop = function _loop(i) {
	        var dotLi = createElement('<li></li>');
	        var dotBtn = void 0;

	        if (_this11.options.customPaging) {
	          dotBtn = createElement(_this11.options.customPaging(i, _this11));
	        } else {
	          dotBtn = createElement('<button type="button"></button>');
	          dotBtn.textContent = "Move slider to item #".concat(i + 1);
	        } // Event handlers to switch to slide


	        var switchToSlide = function switchToSlide(event) {
	          if (a11yClick(event) === true) {
	            // Go to slide
	            _this11.scrollToSlide(_this11.slides[i]); // Disable autoplay if enabled


	            _this11._toggleAutoplay(AutoplaySwitch.Disable);
	          }
	        }; // Add event listeners


	        dotBtn.addEventListener('click', switchToSlide, {
	          passive: true
	        });
	        dotBtn.addEventListener('keypress', switchToSlide, {
	          passive: true
	        }); // Append to UL

	        dotLi.insertAdjacentElement('beforeend', dotBtn);

	        _this11.dots.insertAdjacentElement('beforeend', dotLi);
	      };

	      for (var i = 0; i < this._getDotCount(); i++) {
	        _loop(i);
	      } // Update styles of dots before adding to DOM


	      this._updateDots(this.activeSlide); // Add dots UL to DOM


	      this.slider.insertAdjacentElement('afterend', this.dots); // Dots needed may change on screen size so regenerate them from scratch

	      window.addEventListener('resize', this._generateDotsDebounced);
	    }
	  }, {
	    key: "_getDotCount",
	    value: function _getDotCount() {
	      var totalSlides = this.slides.length;
	      var slidesToShow = this.options.slidesToShow || this.visibleSlides.length || 1;
	      var dots = totalSlides - slidesToShow + 1;
	      return dots;
	    }
	  }, {
	    key: "_removeDots",
	    value: function _removeDots() {
	      var _this12 = this;

	      window.removeEventListener('resize', this._generateDotsDebounced);
	      var elements = getNextSiblings(this.slider);

	      if (this.dots instanceof HTMLElement) {
	        this.dots.parentNode && this.dots.parentNode.removeChild(this.dots);
	      }

	      everyElement(elements, function (element) {
	        if (element.classList.contains(_this12._dotsClass)) {
	          element.parentNode && element.parentNode.removeChild(element);
	        }
	      });
	    }
	  }, {
	    key: "_updateDots",
	    value: function _updateDots(activeSlide) {
	      if (this.dots instanceof HTMLElement) {
	        var _this$dots$children$a;

	        var activeIndex = Array.prototype.indexOf.call(activeSlide.parentNode && activeSlide.parentNode.children, activeSlide); // Set dot to last item if active index is higher than amount

	        if (activeIndex > this.dots.children.length) {
	          activeIndex = this.dots.children.length - 1;
	        } // Reset children active class if exist


	        everyElement(this.dots.children, function (dot) {
	          var _dot$querySelector;

	          return (_dot$querySelector = dot.querySelector('button')) === null || _dot$querySelector === void 0 ? void 0 : _dot$querySelector.classList.remove('active');
	        }); // Add class to active dot

	        (_this$dots$children$a = this.dots.children[activeIndex].querySelector('button')) === null || _this$dots$children$a === void 0 ? void 0 : _this$dots$children$a.classList.add('active');
	      }
	    }
	  }, {
	    key: "_enableAutoplay",
	    value: function _enableAutoplay() {
	      // Add event listeners for autoplay
	      this.autoplayBtn.addEventListener('click', this._handleAutoplay, {
	        passive: true
	      });
	      this.autoplayBtn.addEventListener('keypress', this._handleAutoplay, {
	        passive: true
	      });
	      this.slider.addEventListener('click', this._handleAutoplayEvent, {
	        passive: true
	      });
	      this.slider.addEventListener('touchstart', this._handleAutoplayEvent, {
	        passive: true
	      });

	      if (this.options.autoplayHoverPause) {
	        this.slider.addEventListener('mouseenter', this._handleAutoplayHover, {
	          passive: true
	        });
	        this.slider.addEventListener('mouseleave', this._handleAutoplayHover, {
	          passive: true
	        });
	      } // Add autoplay toggle button to DOM


	      this.slider.insertAdjacentElement('beforebegin', this.autoplayBtn); // Start autoplaying

	      this._toggleAutoplay(AutoplaySwitch.Enable);
	    }
	  }, {
	    key: "_disableAutoplay",
	    value: function _disableAutoplay() {
	      var _this$autoplayBtn$par;

	      // Stop autoplaying
	      this._toggleAutoplay(AutoplaySwitch.Disable); // Remove event listeners for autoplay


	      this.autoplayBtn.removeEventListener('click', this._handleAutoplay);
	      this.autoplayBtn.removeEventListener('keypress', this._handleAutoplay);
	      this.slider.removeEventListener('click', this._handleAutoplayEvent);
	      this.slider.removeEventListener('touchstart', this._handleAutoplayEvent);
	      this.slider.removeEventListener('mouseenter', this._handleAutoplayHover);
	      this.slider.removeEventListener('mouseleave', this._handleAutoplayHover); // Remove toggle button from DOM

	      (_this$autoplayBtn$par = this.autoplayBtn.parentNode) === null || _this$autoplayBtn$par === void 0 ? void 0 : _this$autoplayBtn$par.removeChild(this.autoplayBtn);
	    } // Referenced https://codepen.io/fredericrous/pen/xxVXJYX

	  }, {
	    key: "_enableSwipe",
	    value: function _enableSwipe() {
	      if (this.options.swipe) {
	        this.slider.addEventListener('mousedown', this._swipeMouseDown);
	        this.slider.addEventListener('mouseleave', this._swipeMouseUp);
	        this.slider.addEventListener('mouseup', this._swipeMouseUp);
	        this.slider.addEventListener('mousemove', this._swipeMouseMove);
	        this.slider.addEventListener('touchstart', this._swipeTouchStart);
	        this.slider.addEventListener('touchend', this._swipeTouchEnd);
	        this.slider.addEventListener('touchmove', this._swipeTouchMove);
	      }
	    }
	  }, {
	    key: "_swipeMouseDown",
	    value: function _swipeMouseDown(e) {
	      this.mouseDown = true;
	      this.slider.classList.add('a11y-slider-scrolling');
	      this.swipeStartX = e.pageX - this.slider.offsetLeft;
	      this.swipeX = this.slider.scrollLeft;
	      this.swipeXCached = this.slider.scrollLeft;
	    }
	  }, {
	    key: "_swipeMouseUp",
	    value: function _swipeMouseUp() {
	      if (!this.mouseDown) return; // If the moved slider offset is within 1 pixel it will not trigger a move

	      var inRange = (this.swipeXCached - (this.swipeX - 1)) * (this.swipeXCached - (this.swipeX + 1)) <= 0;
	      this.mouseDown = false;
	      this.slider.classList.remove('a11y-slider-scrolling');

	      if (this.modernBrowser) {
	        this.slider.scroll({
	          left: inRange ? this.swipeXCached : this.swipeXCached - 1,
	          behavior: 'smooth'
	        });
	      }
	    }
	  }, {
	    key: "_swipeMouseMove",
	    value: function _swipeMouseMove(e) {
	      if (!this.mouseDown) return;
	      e.preventDefault();
	      var scrollSpeed = 2;
	      var x = e.pageX - this.slider.offsetLeft;
	      var walk = (x - this.swipeStartX) * scrollSpeed;
	      this.slider.scrollLeft = this.swipeX - walk; // Safari has a bug where it doesn't save values properly so caching it for use later

	      this.swipeXCached = this.slider.scrollLeft;
	    }
	  }, {
	    key: "_swipeTouchStart",
	    value: function _swipeTouchStart(e) {
	      this.touchStart = true;
	      this.slider.classList.add('a11y-slider-scrolling');
	      this.swipeStartX = e.touches[0].pageX - this.slider.offsetLeft;
	      this.swipeX = this.slider.scrollLeft;
	      this.swipeXCached = this.slider.scrollLeft;
	    }
	  }, {
	    key: "_swipeTouchEnd",
	    value: function _swipeTouchEnd() {
	      if (!this.touchStart) return; // If the moved slider offset is within 1 pixel it will not trigger a move

	      var inRange = (this.swipeXCached - (this.swipeX - 1)) * (this.swipeXCached - (this.swipeX + 1)) <= 0;
	      this.touchStart = false;
	      this.slider.classList.remove('a11y-slider-scrolling');

	      if (this.modernBrowser) {
	        this.slider.scroll({
	          left: inRange ? this.swipeXCached : this.swipeXCached - 1,
	          behavior: 'smooth'
	        });
	      }
	    }
	  }, {
	    key: "_swipeTouchMove",
	    value: function _swipeTouchMove(e) {
	      if (!this.touchStart) return;
	      e.preventDefault();
	      var scrollSpeed = 2;
	      var x = e.touches[0].pageX - this.slider.offsetLeft;
	      var walk = (x - this.swipeStartX) * scrollSpeed;
	      this.slider.scrollLeft = this.swipeX - walk; // Safari has a bug where it doesn't save values properly so caching it for use later

	      this.swipeXCached = this.slider.scrollLeft;
	    }
	  }, {
	    key: "_disableSwipe",
	    value: function _disableSwipe() {
	      this.slider.removeEventListener('mousedown', this._swipeMouseDown);
	      this.slider.removeEventListener('mouseleave', this._swipeMouseUp);
	      this.slider.removeEventListener('mouseup', this._swipeMouseUp);
	      this.slider.removeEventListener('mousemove', this._swipeMouseMove);
	      this.slider.removeEventListener('touchstart', this._swipeTouchStart);
	      this.slider.removeEventListener('touchend', this._swipeTouchEnd);
	      this.slider.removeEventListener('touchmove', this._swipeTouchMove);
	    }
	  }, {
	    key: "_toggleAutoplay",
	    value: function _toggleAutoplay(setState) {
	      var _this13 = this;

	      var startAutoplaying = function startAutoplaying() {
	        // Start autoplaying
	        _this13._autoplayTimer = window.setInterval(function () {
	          _this13._goPrevOrNext(SlideDirection.Next);
	        }, _this13.options.autoplaySpeed); // Set autoplay button state

	        _this13.autoplayBtn.setAttribute('data-autoplaying', 'true'); // Dispatch custom event


	        _this13._dispatchEvent('autoplayStart', {
	          currentSlide: _this13.activeSlide,
	          a11ySlider: _this13
	        });
	      };

	      var stopAutoplaying = function stopAutoplaying() {
	        // Stop autoplaying
	        window.clearInterval(_this13._autoplayTimer); // Reset autoplay timer

	        _this13._autoplayTimer = IsAutoplaying.No; // Set autoplay button state

	        _this13.autoplayBtn.setAttribute('data-autoplaying', 'false'); // Dispatch custom event


	        _this13._dispatchEvent('autoplayStop', {
	          currentSlide: _this13.activeSlide,
	          a11ySlider: _this13
	        });
	      };

	      if (setState === AutoplaySwitch.Enable) {
	        startAutoplaying();
	      } else if (setState === AutoplaySwitch.Disable) {
	        stopAutoplaying();
	      }
	    }
	  }, {
	    key: "_goPrevOrNext",
	    value: function _goPrevOrNext(direction) {
	      var _this14 = this;

	      this._getActiveAndVisible(null, function (visibleSlides, activeSlide) {
	        var firstSlide = _this14.slider.firstElementChild;
	        var lastSlide = _this14.slider.lastElementChild;
	        var firstVisibleSlide = visibleSlides[0];
	        var lastVisibleSlide = visibleSlides[visibleSlides.length - 1];

	        if (direction === SlideDirection.Next) {
	          // Wrap to the first slide if we're currently on the last
	          if (lastVisibleSlide === lastSlide) {
	            _this14.options.infinite === true && _this14.scrollToSlide(firstSlide);
	          } else {
	            _this14.scrollToSlide(activeSlide && activeSlide.nextElementSibling);
	          }
	        } else if (direction === SlideDirection.Prev) {
	          // Wrap to the last slide if we're currently on the first
	          if (firstVisibleSlide === firstSlide) {
	            _this14.options.infinite === true && _this14.scrollToSlide(lastSlide);
	          } else {
	            _this14.scrollToSlide(activeSlide && activeSlide.previousElementSibling);
	          }
	        }
	      });
	    }
	    /**
	     * Moves slider to target element
	     */

	  }, {
	    key: "scrollToSlide",
	    value: function scrollToSlide(target) {
	      var _this15 = this;

	      var originalPosition = this.slider.scrollLeft;
	      var targetSlide;

	      if (isInteger(target)) {
	        targetSlide = this.slides[target];
	      } else if (target instanceof HTMLElement) {
	        targetSlide = target;
	      } else {
	        throw new Error('scrollToSlide only accepts an HTMLElement or number');
	      } // Dispatch custom event


	      this._dispatchEvent('beforeChange', {
	        currentSlide: this.activeSlide,
	        nextSlide: targetSlide,
	        a11ySlider: this
	      }); // Update slider's height based on content of slide


	      if (this.options.adaptiveHeight === true) this._updateHeight(targetSlide); // Move slider to specific item

	      if (this.modernBrowser) {
	        this.slider.scroll({
	          left: targetSlide.offsetLeft,
	          behavior: 'smooth'
	        });
	      } else {
	        this.slider.scrollLeft = targetSlide.offsetLeft;
	      } // If the slider didn't move make sure to update the slider still


	      setTimeout(function () {
	        if (_this15.slider.scrollLeft === originalPosition && _this15.sliderEnabled === SliderState.Enabled) {
	          _this15._setCSS(targetSlide);
	        }
	      }, 50); // Trigger dot update

	      this._updateDots(targetSlide);
	    }
	    /**
	     * Update the options on the slider instance
	     */

	  }, {
	    key: "updateOptions",
	    value: function updateOptions(options) {
	      // Assign new options
	      Object.assign(this.options, options); // Re-run the initial enable slider option

	      this._disableSlider();

	      this._checkShouldEnable();
	    }
	    /**
	     * If element is passed slider's height will match
	     *  it otherwise the height of the slider is removed.
	     */

	  }, {
	    key: "_updateHeight",
	    value: function _updateHeight(target) {
	      if (target instanceof HTMLElement) {
	        var targetHeight = getSubpixelStyle(target, 'height');
	        this.slider.style.height = "".concat(targetHeight, "px");
	      } else {
	        this.slider.style.height = '';
	      }
	    }
	    /** Manully update height of slider (based off adaptiveHeight option) */

	  }, {
	    key: "refreshHeight",
	    value: function refreshHeight() {
	      this._updateHeight(this.activeSlide);
	    }
	  }, {
	    key: "_getActiveAndVisible",
	    value: function _getActiveAndVisible(explicitActive, callback) {
	      /**
	       * Parent element needs the correct styling for
	       * calculations so backing up the initial styles
	       */
	      var noSliderClass = !this.slider.classList.contains(this._sliderClass);
	      var borderStyle = this.slider.style.borderWidth; // Applying correct styles for calculations

	      this.slider.style.borderWidth = '0px';
	      if (noSliderClass) this.slider.classList.add(this._sliderClass); // Can start storing variables now for calculations

	      var visibleSlides = []; // better cross browser support by getting subpixels then rounding

	      var sliderWidth = Math.round(this.slider.getBoundingClientRect().width); // Add a 1 pixel buffer so that subpixels are more consistent cross-browser

	      var sliderPosition = this.slider.scrollLeft - 1 < 0 ? 0 : this.slider.scrollLeft - 1; // Only detects items in the visible viewport of the parent element

	      everyElement(this.slides, function (slide) {
	        var slideOffset = slide.offsetLeft;

	        if (slideOffset >= sliderPosition && slideOffset < sliderPosition + sliderWidth) {
	          visibleSlides.push(slide);
	        }
	      }); // Add back the original styles

	      this.slider.style.borderWidth = borderStyle;
	      if (noSliderClass) this.slider.classList.remove(this._sliderClass); // Globally set visible slides

	      this.visibleSlides = visibleSlides;

	      if (explicitActive) {
	        this.activeSlide = explicitActive;
	      } else if (this.options.centerMode === true) {
	        this.activeSlide = this.visibleSlides[Math.floor((this.visibleSlides.length - 1) / 2)];
	      } else {
	        var _visibleSlides$;

	        this.activeSlide = (_visibleSlides$ = visibleSlides[0]) !== null && _visibleSlides$ !== void 0 ? _visibleSlides$ : this.slides[0];
	      }

	      callback && callback(this.visibleSlides, this.activeSlide);
	    }
	  }, {
	    key: "_handlePrev",
	    value: function _handlePrev(event) {
	      if (a11yClick(event) === true) {
	        // Go to previous slide
	        this._goPrevOrNext(SlideDirection.Prev); // Disable autoplay if ongoing


	        this._toggleAutoplay(AutoplaySwitch.Disable);
	      }
	    }
	  }, {
	    key: "_handleNext",
	    value: function _handleNext(event) {
	      if (a11yClick(event) === true) {
	        // Go to next slide
	        this._goPrevOrNext(SlideDirection.Next); // Disable autoplay if ongoing


	        this._toggleAutoplay(AutoplaySwitch.Disable);
	      }
	    }
	  }, {
	    key: "_handleAutoplay",
	    value: function _handleAutoplay(event) {
	      if (a11yClick(event) === true) {
	        if (this._autoplayTimer === IsAutoplaying.No) {
	          this._toggleAutoplay(AutoplaySwitch.Enable);
	        } else {
	          this._toggleAutoplay(AutoplaySwitch.Disable);
	        }
	      }
	    }
	  }, {
	    key: "_handleAutoplayHover",
	    value: function _handleAutoplayHover(event) {
	      if (event.type === 'mouseenter') {
	        if (this._autoplayTimer !== IsAutoplaying.No) {
	          this._toggleAutoplay(AutoplaySwitch.Disable);

	          this._pauseOnMouseLeave = true;
	        }
	      } else if (event.type === 'mouseleave' && this._pauseOnMouseLeave) {
	        if (this._autoplayTimer === IsAutoplaying.No) {
	          this._toggleAutoplay(AutoplaySwitch.Enable);

	          this._pauseOnMouseLeave = false;
	        }
	      }
	    }
	  }, {
	    key: "_handleAutoplayEvent",
	    value: function _handleAutoplayEvent(_event) {
	      this._pauseOnMouseLeave = false;

	      this._toggleAutoplay(AutoplaySwitch.Disable);
	    }
	  }, {
	    key: "_handleScroll",
	    value: function _handleScroll() {
	      // This is a debounced function. Will fire once done scrolling
	      this._scrollFinish();
	    }
	  }, {
	    key: "_scrollFinish",
	    value: function _scrollFinish() {
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
	      // TODO: Removal of responsive event listeners should go here
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYTExeS1zbGlkZXIuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdWlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVkZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcGF0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuY29uY2F0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtZnVuY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1mb3ItZWFjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmluZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5tYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5oZXJpdC1pZi1yZXF1aXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaHRtbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtY3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3doaXRlc3BhY2VzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy10cmltLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5udW1iZXIuY29uc3RydWN0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbnVtYmVyLXBhcnNlLWludC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMubnVtYmVyLnBhcnNlLWludC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtYXNzaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuYXNzaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC10by1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmVudHJpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5mb3ItZWFjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy90cy1kZWJvdW5jZS9kaXN0L3NyYy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuc2xpY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXRvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnRvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZmxhZ3MuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnJlZ2V4cC50by1zdHJpbmcuanMiLCIuLi9zcmMvdXRpbHMudHMiLCIuLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gJ29iamVjdCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgY2hlY2sodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cpIHx8XG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPSA3O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgc3BsaXQgPSAnJy5zcGxpdDtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwiLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3ByaW1pdGl2ZVxuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgUFJFRkVSUkVEX1NUUklORykge1xuICBpZiAoIWlzT2JqZWN0KGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFBSRUZFUlJFRF9TVFJJTkcgJiYgdHlwZW9mIChmbiA9IGlucHV0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaW5wdXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVBSRUZFUlJFRF9TVFJJTkcgJiYgdHlwZW9mIChmbiA9IGlucHV0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xuXG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0ZUVsZW1lbnQoJ2RpdicpLCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH1cbiAgfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIXByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG5cbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlRGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShnbG9iYWwsIGtleSwgdmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgc2V0R2xvYmFsKFNIQVJFRCwge30pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlO1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnRvU3RyaW5nO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKHR5cGVvZiBzdG9yZS5pbnNwZWN0U291cmNlICE9ICdmdW5jdGlvbicpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nLmNhbGwoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoaW5zcGVjdFNvdXJjZShXZWFrTWFwKSk7XG4iLCJ2YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy42LjQnLFxuICBtb2RlOiBJU19QVVJFID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMjAgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsInZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgU3RyaW5nKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArICgrK2lkICsgcG9zdGZpeCkudG9TdHJpbmcoMzYpO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xuXG52YXIga2V5cyA9IHNoYXJlZCgna2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGtleXNba2V5XSB8fCAoa2V5c1trZXldID0gdWlkKGtleSkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCkge1xuICB2YXIgc3RvcmUgPSBuZXcgV2Vha01hcCgpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgVEVNUExBVEUgPSBTdHJpbmcoU3RyaW5nKS5zcGxpdCgnU3RyaW5nJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciB1bnNhZmUgPSBvcHRpb25zID8gISFvcHRpb25zLnVuc2FmZSA6IGZhbHNlO1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5lbnVtZXJhYmxlIDogZmFsc2U7XG4gIHZhciBub1RhcmdldEdldCA9IG9wdGlvbnMgPyAhIW9wdGlvbnMubm9UYXJnZXRHZXQgOiBmYWxzZTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgJiYgIWhhcyh2YWx1ZSwgJ25hbWUnKSkgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHZhbHVlLCAnbmFtZScsIGtleSk7XG4gICAgZW5mb3JjZUludGVybmFsU3RhdGUodmFsdWUpLnNvdXJjZSA9IFRFTVBMQVRFLmpvaW4odHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/IGtleSA6ICcnKTtcbiAgfVxuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBzZXRHbG9iYWwoa2V5LCB2YWx1ZSk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKCF1bnNhZmUpIHtcbiAgICBkZWxldGUgT1trZXldO1xuICB9IGVsc2UgaWYgKCFub1RhcmdldEdldCAmJiBPW2tleV0pIHtcbiAgICBzaW1wbGUgPSB0cnVlO1xuICB9XG4gIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICBlbHNlIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShPLCBrZXksIHZhbHVlKTtcbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgaW5zcGVjdFNvdXJjZSh0aGlzKTtcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT0gJ2Z1bmN0aW9uJyA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgVG9JbnRlZ2VyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlcihhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4oaW50ZWdlciwgbGVuZ3RoKS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgdmFyIGludGVnZXIgPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW50ZWdlciA8IDAgPyBtYXgoaW50ZWdlciArIGxlbmd0aCwgMCkgOiBtaW4oaW50ZWdlciwgbGVuZ3RoKTtcbn07XG4iLCJ2YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBpbmRleE9mLCBpbmNsdWRlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIGlmICgoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykgJiYgT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuICBpbmRleE9mOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXMoaGlkZGVuS2V5cywga2V5KSAmJiBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyBJRTgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAnY29uc3RydWN0b3InLFxuICAnaGFzT3duUHJvcGVydHknLFxuICAnaXNQcm90b3R5cGVPZicsXG4gICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd0b1N0cmluZycsXG4gICd2YWx1ZU9mJ1xuXTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbnZhciBoaWRkZW5LZXlzID0gZW51bUJ1Z0tleXMuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGVzIG5vbi1lbnVtZXJhYmxlIGFuZCBzeW1ib2xzXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnb3duS2V5cycpIHx8IGZ1bmN0aW9uIG93bktleXMoaXQpIHtcbiAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYoYW5PYmplY3QoaXQpKTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8ga2V5cy5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgb3duS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vd24ta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuICB2YXIga2V5cyA9IG93bktleXMoc291cmNlKTtcbiAgdmFyIGRlZmluZVByb3BlcnR5ID0gZGVmaW5lUHJvcGVydHlNb2R1bGUuZjtcbiAgdmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoIWhhcyh0YXJnZXQsIGtleSkpIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgfVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IHR5cGVvZiBkZXRlY3Rpb24gPT0gJ2Z1bmN0aW9uJyA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLm5vVGFyZ2V0R2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIEZPUkNFRCwgdGFyZ2V0LCBrZXksIHRhcmdldFByb3BlcnR5LCBzb3VyY2VQcm9wZXJ0eSwgZGVzY3JpcHRvcjtcbiAgaWYgKEdMT0JBTCkge1xuICAgIHRhcmdldCA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmIChTVEFUSUMpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWxbVEFSR0VUXSB8fCBzZXRHbG9iYWwoVEFSR0VULCB7fSk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0ID0gKGdsb2JhbFtUQVJHRVRdIHx8IHt9KS5wcm90b3R5cGU7XG4gIH1cbiAgaWYgKHRhcmdldCkgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgc291cmNlUHJvcGVydHkgPSBzb3VyY2Vba2V5XTtcbiAgICBpZiAob3B0aW9ucy5ub1RhcmdldEdldCkge1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgICB0YXJnZXRQcm9wZXJ0eSA9IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZTtcbiAgICB9IGVsc2UgdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRba2V5XTtcbiAgICBGT1JDRUQgPSBpc0ZvcmNlZChHTE9CQUwgPyBrZXkgOiBUQVJHRVQgKyAoU1RBVElDID8gJy4nIDogJyMnKSArIGtleSwgb3B0aW9ucy5mb3JjZWQpO1xuICAgIC8vIGNvbnRhaW5lZCBpbiB0YXJnZXRcbiAgICBpZiAoIUZPUkNFRCAmJiB0YXJnZXRQcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIHNvdXJjZVByb3BlcnR5ID09PSB0eXBlb2YgdGFyZ2V0UHJvcGVydHkpIGNvbnRpbnVlO1xuICAgICAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHkpO1xuICAgIH1cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShzb3VyY2VQcm9wZXJ0eSwgJ3NoYW0nLCB0cnVlKTtcbiAgICB9XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIHJlZGVmaW5lKHRhcmdldCwga2V5LCBzb3VyY2VQcm9wZXJ0eSwgb3B0aW9ucyk7XG4gIH1cbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG4vLyBgSXNBcnJheWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc2FycmF5XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgcmV0dXJuIGNsYXNzb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgcHJvcGVydHlLZXkgPSB0b1ByaW1pdGl2ZShrZXkpO1xuICBpZiAocHJvcGVydHlLZXkgaW4gb2JqZWN0KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwgcHJvcGVydHlLZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtwcm9wZXJ0eUtleV0gPSB2YWx1ZTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gQ2hyb21lIDM4IFN5bWJvbCBoYXMgaW5jb3JyZWN0IHRvU3RyaW5nIGNvbnZlcnNpb25cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHJldHVybiAhU3RyaW5nKFN5bWJvbCgpKTtcbn0pO1xuIiwidmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9TWU1CT0xcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICYmICFTeW1ib2wuc2hhbVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXMoV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSkge1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhcyhTeW1ib2wsIG5hbWUpKSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgZWxzZSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woJ1N5bWJvbC4nICsgbmFtZSk7XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG4vLyBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSwgbGVuZ3RoKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBlbHNlIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIG5ldyAoQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDKShsZW5ndGggPT09IDAgPyAwIDogbGVuZ3RoKTtcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCduYXZpZ2F0b3InLCAndXNlckFnZW50JykgfHwgJyc7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIHZlcnNpb24gPSBtYXRjaFswXSArIG1hdGNoWzFdO1xufSBlbHNlIGlmICh1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSBtYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb24gJiYgK3ZlcnNpb247XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FKSB7XG4gIC8vIFdlIGNhbid0IHVzZSB0aGlzIGZlYXR1cmUgZGV0ZWN0aW9uIGluIFY4IHNpbmNlIGl0IGNhdXNlc1xuICAvLyBkZW9wdGltaXphdGlvbiBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc3XG4gIHJldHVybiBWOF9WRVJTSU9OID49IDUxIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gYXJyYXkuY29uc3RydWN0b3IgPSB7fTtcbiAgICBjb25zdHJ1Y3RvcltTUEVDSUVTXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7IGZvbzogMSB9O1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5W01FVEhPRF9OQU1FXShCb29sZWFuKS5mb28gIT09IDE7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG5cbnZhciBJU19DT05DQVRfU1BSRUFEQUJMRSA9IHdlbGxLbm93blN5bWJvbCgnaXNDb25jYXRTcHJlYWRhYmxlJyk7XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDB4MUZGRkZGRkZGRkZGRkY7XG52YXIgTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEID0gJ01heGltdW0gYWxsb3dlZCBpbmRleCBleGNlZWRlZCc7XG5cbi8vIFdlIGNhbid0IHVzZSB0aGlzIGZlYXR1cmUgZGV0ZWN0aW9uIGluIFY4IHNpbmNlIGl0IGNhdXNlc1xuLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82NzlcbnZhciBJU19DT05DQVRfU1BSRUFEQUJMRV9TVVBQT1JUID0gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgYXJyYXkgPSBbXTtcbiAgYXJyYXlbSVNfQ09OQ0FUX1NQUkVBREFCTEVdID0gZmFsc2U7XG4gIHJldHVybiBhcnJheS5jb25jYXQoKVswXSAhPT0gYXJyYXk7XG59KTtcblxudmFyIFNQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ2NvbmNhdCcpO1xuXG52YXIgaXNDb25jYXRTcHJlYWRhYmxlID0gZnVuY3Rpb24gKE8pIHtcbiAgaWYgKCFpc09iamVjdChPKSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgc3ByZWFkYWJsZSA9IE9bSVNfQ09OQ0FUX1NQUkVBREFCTEVdO1xuICByZXR1cm4gc3ByZWFkYWJsZSAhPT0gdW5kZWZpbmVkID8gISFzcHJlYWRhYmxlIDogaXNBcnJheShPKTtcbn07XG5cbnZhciBGT1JDRUQgPSAhSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCB8fCAhU1BFQ0lFU19TVVBQT1JUO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmNvbmNhdGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuY29uY2F0XG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAaXNDb25jYXRTcHJlYWRhYmxlIGFuZCBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIGNvbmNhdDogZnVuY3Rpb24gY29uY2F0KGFyZykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGlzKTtcbiAgICB2YXIgQSA9IGFycmF5U3BlY2llc0NyZWF0ZShPLCAwKTtcbiAgICB2YXIgbiA9IDA7XG4gICAgdmFyIGksIGssIGxlbmd0aCwgbGVuLCBFO1xuICAgIGZvciAoaSA9IC0xLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIEUgPSBpID09PSAtMSA/IE8gOiBhcmd1bWVudHNbaV07XG4gICAgICBpZiAoaXNDb25jYXRTcHJlYWRhYmxlKEUpKSB7XG4gICAgICAgIGxlbiA9IHRvTGVuZ3RoKEUubGVuZ3RoKTtcbiAgICAgICAgaWYgKG4gKyBsZW4gPiBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEKTtcbiAgICAgICAgZm9yIChrID0gMDsgayA8IGxlbjsgaysrLCBuKyspIGlmIChrIGluIEUpIGNyZWF0ZVByb3BlcnR5KEEsIG4sIEVba10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG4gPj0gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KEEsIG4rKywgRSk7XG4gICAgICB9XG4gICAgfVxuICAgIEEubGVuZ3RoID0gbjtcbiAgICByZXR1cm4gQTtcbiAgfVxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCk7XG4gICAgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5cbnZhciBwdXNoID0gW10ucHVzaDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGZvckVhY2gsIG1hcCwgZmlsdGVyLCBzb21lLCBldmVyeSwgZmluZCwgZmluZEluZGV4IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PSAxO1xuICB2YXIgSVNfRklMVEVSID0gVFlQRSA9PSAyO1xuICB2YXIgSVNfU09NRSA9IFRZUEUgPT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PSA0O1xuICB2YXIgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNjtcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQsIHNwZWNpZmljQ3JlYXRlKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCgkdGhpcyk7XG4gICAgdmFyIHNlbGYgPSBJbmRleGVkT2JqZWN0KE8pO1xuICAgIHZhciBib3VuZEZ1bmN0aW9uID0gYmluZChjYWxsYmFja2ZuLCB0aGF0LCAzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGNyZWF0ZSA9IHNwZWNpZmljQ3JlYXRlIHx8IGFycmF5U3BlY2llc0NyZWF0ZTtcbiAgICB2YXIgdGFyZ2V0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgdmFsdWUsIHJlc3VsdDtcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpIHtcbiAgICAgIHZhbHVlID0gc2VsZltpbmRleF07XG4gICAgICByZXN1bHQgPSBib3VuZEZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgTyk7XG4gICAgICBpZiAoVFlQRSkge1xuICAgICAgICBpZiAoSVNfTUFQKSB0YXJnZXRbaW5kZXhdID0gcmVzdWx0OyAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0KSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbHVlOyAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcHVzaC5jYWxsKHRhcmdldCwgdmFsdWUpOyAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIGlmIChJU19FVkVSWSkgcmV0dXJuIGZhbHNlOyAgLy8gZXZlcnlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHRhcmdldDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuICBmb3JFYWNoOiBjcmVhdGVNZXRob2QoMCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUubWFwYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLm1hcFxuICBtYXA6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsdGVyXG4gIGZpbHRlcjogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLnNvbWVgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc29tZVxuICBzb21lOiBjcmVhdGVNZXRob2QoMyksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZXZlcnlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZXZlcnlcbiAgZXZlcnk6IGNyZWF0ZU1ldGhvZCg0KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRcbiAgZmluZDogY3JlYXRlTWV0aG9kKDUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhcbiAgZmluZEluZGV4OiBjcmVhdGVNZXRob2QoNilcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBjYWNoZSA9IHt9O1xuXG52YXIgdGhyb3dlciA9IGZ1bmN0aW9uIChpdCkgeyB0aHJvdyBpdDsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIG9wdGlvbnMpIHtcbiAgaWYgKGhhcyhjYWNoZSwgTUVUSE9EX05BTUUpKSByZXR1cm4gY2FjaGVbTUVUSE9EX05BTUVdO1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcbiAgdmFyIG1ldGhvZCA9IFtdW01FVEhPRF9OQU1FXTtcbiAgdmFyIEFDQ0VTU09SUyA9IGhhcyhvcHRpb25zLCAnQUNDRVNTT1JTJykgPyBvcHRpb25zLkFDQ0VTU09SUyA6IGZhbHNlO1xuICB2YXIgYXJndW1lbnQwID0gaGFzKG9wdGlvbnMsIDApID8gb3B0aW9uc1swXSA6IHRocm93ZXI7XG4gIHZhciBhcmd1bWVudDEgPSBoYXMob3B0aW9ucywgMSkgPyBvcHRpb25zWzFdIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiBjYWNoZVtNRVRIT0RfTkFNRV0gPSAhIW1ldGhvZCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIGlmIChBQ0NFU1NPUlMgJiYgIURFU0NSSVBUT1JTKSByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgTyA9IHsgbGVuZ3RoOiAtMSB9O1xuXG4gICAgaWYgKEFDQ0VTU09SUykgZGVmaW5lUHJvcGVydHkoTywgMSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IHRocm93ZXIgfSk7XG4gICAgZWxzZSBPWzFdID0gMTtcblxuICAgIG1ldGhvZC5jYWxsKE8sIGFyZ3VtZW50MCwgYXJndW1lbnQxKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnZm9yRWFjaCcpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ2ZvckVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG5tb2R1bGUuZXhwb3J0cyA9ICghU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEgpID8gZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSA6IFtdLmZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogW10uZm9yRWFjaCAhPSBmb3JFYWNoIH0sIHtcbiAgZm9yRWFjaDogZm9yRWFjaFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBuYXRpdmVJbmRleE9mID0gW10uaW5kZXhPZjtcblxudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUluZGV4T2YgJiYgMSAvIFsxXS5pbmRleE9mKDEsIC0wKSA8IDA7XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2luZGV4T2YnKTtcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdpbmRleE9mJywgeyBBQ0NFU1NPUlM6IHRydWUsIDE6IDAgfSk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogTkVHQVRJVkVfWkVSTyB8fCAhU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gbmF0aXZlSW5kZXhPZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRtYXAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykubWFwO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdtYXAnKTtcbi8vIEZGNDktIGlzc3VlXG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnbWFwJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUubWFwYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkbWFwKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpICYmIGl0ICE9PSBudWxsKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3Qgc2V0IFwiICsgU3RyaW5nKGl0KSArICcgYXMgYSBwcm90b3R5cGUnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFQb3NzaWJsZVByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5zZXRwcm90b3R5cGVvZlxuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gZnVuY3Rpb24gKCkge1xuICB2YXIgQ09SUkVDVF9TRVRURVIgPSBmYWxzZTtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgdmFyIHNldHRlcjtcbiAgdHJ5IHtcbiAgICBzZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQ7XG4gICAgc2V0dGVyLmNhbGwodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIuY2FsbChPLCBwcm90byk7XG4gICAgZWxzZSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgIHJldHVybiBPO1xuICB9O1xufSgpIDogdW5kZWZpbmVkKTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xuXG4vLyBtYWtlcyBzdWJjbGFzc2luZyB3b3JrIGNvcnJlY3QgZm9yIHdyYXBwZWQgYnVpbHQtaW5zXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkdGhpcywgZHVtbXksIFdyYXBwZXIpIHtcbiAgdmFyIE5ld1RhcmdldCwgTmV3VGFyZ2V0UHJvdG90eXBlO1xuICBpZiAoXG4gICAgLy8gaXQgY2FuIHdvcmsgb25seSB3aXRoIG5hdGl2ZSBgc2V0UHJvdG90eXBlT2ZgXG4gICAgc2V0UHJvdG90eXBlT2YgJiZcbiAgICAvLyB3ZSBoYXZlbid0IGNvbXBsZXRlbHkgY29ycmVjdCBwcmUtRVM2IHdheSBmb3IgZ2V0dGluZyBgbmV3LnRhcmdldGAsIHNvIHVzZSB0aGlzXG4gICAgdHlwZW9mIChOZXdUYXJnZXQgPSBkdW1teS5jb25zdHJ1Y3RvcikgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgIE5ld1RhcmdldCAhPT0gV3JhcHBlciAmJlxuICAgIGlzT2JqZWN0KE5ld1RhcmdldFByb3RvdHlwZSA9IE5ld1RhcmdldC5wcm90b3R5cGUpICYmXG4gICAgTmV3VGFyZ2V0UHJvdG90eXBlICE9PSBXcmFwcGVyLnByb3RvdHlwZVxuICApIHNldFByb3RvdHlwZU9mKCR0aGlzLCBOZXdUYXJnZXRQcm90b3R5cGUpO1xuICByZXR1cm4gJHRoaXM7XG59O1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnRpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXkgPSBrZXlzW2luZGV4KytdLCBQcm9wZXJ0aWVzW2tleV0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgZG9jdW1lbnRDcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcblxudmFyIEdUID0gJz4nO1xudmFyIExUID0gJzwnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFNDUklQVCA9ICdzY3JpcHQnO1xudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xuXG52YXIgRW1wdHlDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxudmFyIHNjcmlwdFRhZyA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gIHJldHVybiBMVCArIFNDUklQVCArIEdUICsgY29udGVudCArIExUICsgJy8nICsgU0NSSVBUICsgR1Q7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgQWN0aXZlWCBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVggPSBmdW5jdGlvbiAoYWN0aXZlWERvY3VtZW50KSB7XG4gIGFjdGl2ZVhEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJycpKTtcbiAgYWN0aXZlWERvY3VtZW50LmNsb3NlKCk7XG4gIHZhciB0ZW1wID0gYWN0aXZlWERvY3VtZW50LnBhcmVudFdpbmRvdy5PYmplY3Q7XG4gIGFjdGl2ZVhEb2N1bWVudCA9IG51bGw7IC8vIGF2b2lkIG1lbW9yeSBsZWFrXG4gIHJldHVybiB0ZW1wO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUlGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IGRvY3VtZW50Q3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gIHZhciBKUyA9ICdqYXZhJyArIFNDUklQVCArICc6JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgaHRtbC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNDc1XG4gIGlmcmFtZS5zcmMgPSBTdHJpbmcoSlMpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnZG9jdW1lbnQuRj1PYmplY3QnKSk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIHJldHVybiBpZnJhbWVEb2N1bWVudC5GO1xufTtcblxuLy8gQ2hlY2sgZm9yIGRvY3VtZW50LmRvbWFpbiBhbmQgYWN0aXZlIHggc3VwcG9ydFxuLy8gTm8gbmVlZCB0byB1c2UgYWN0aXZlIHggYXBwcm9hY2ggd2hlbiBkb2N1bWVudC5kb21haW4gaXMgbm90IHNldFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbS9pc3N1ZXMvMTUwXG4vLyB2YXJpYXRpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2tpdGNhbWJyaWRnZS9lczUtc2hpbS9jb21taXQvNGY3MzhhYzA2NjM0NlxuLy8gYXZvaWQgSUUgR0MgYnVnXG52YXIgYWN0aXZlWERvY3VtZW50O1xudmFyIE51bGxQcm90b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAqL1xuICAgIGFjdGl2ZVhEb2N1bWVudCA9IGRvY3VtZW50LmRvbWFpbiAmJiBuZXcgQWN0aXZlWE9iamVjdCgnaHRtbGZpbGUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogaWdub3JlICovIH1cbiAgTnVsbFByb3RvT2JqZWN0ID0gYWN0aXZlWERvY3VtZW50ID8gTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWChhY3RpdmVYRG9jdW1lbnQpIDogTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lKCk7XG4gIHZhciBsZW5ndGggPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkgZGVsZXRlIE51bGxQcm90b09iamVjdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2xlbmd0aF1dO1xuICByZXR1cm4gTnVsbFByb3RvT2JqZWN0KCk7XG59O1xuXG5oaWRkZW5LZXlzW0lFX1BST1RPXSA9IHRydWU7XG5cbi8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eUNvbnN0cnVjdG9yKCk7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBOdWxsUHJvdG9PYmplY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCIvLyBhIHN0cmluZyBvZiBhbGwgdmFsaWQgdW5pY29kZSB3aGl0ZXNwYWNlc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbm1vZHVsZS5leHBvcnRzID0gJ1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkYnO1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyIHdoaXRlc3BhY2UgPSAnWycgKyB3aGl0ZXNwYWNlcyArICddJztcbnZhciBsdHJpbSA9IFJlZ0V4cCgnXicgKyB3aGl0ZXNwYWNlICsgd2hpdGVzcGFjZSArICcqJyk7XG52YXIgcnRyaW0gPSBSZWdFeHAod2hpdGVzcGFjZSArIHdoaXRlc3BhY2UgKyAnKiQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltLCB0cmltU3RhcnQsIHRyaW1FbmQsIHRyaW1MZWZ0LCB0cmltUmlnaHQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICBpZiAoVFlQRSAmIDEpIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGx0cmltLCAnJyk7XG4gICAgaWYgKFRZUEUgJiAyKSBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShydHJpbSwgJycpO1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltTGVmdCwgdHJpbVN0YXJ0IH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltc3RhcnRcbiAgc3RhcnQ6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltUmlnaHQsIHRyaW1FbmQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1lbmRcbiAgZW5kOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnRyaW1gIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgdHJpbTogY3JlYXRlTWV0aG9kKDMpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBpbmhlcml0SWZSZXF1aXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmhlcml0LWlmLXJlcXVpcmVkJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKS5mO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciB0cmltID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy10cmltJykudHJpbTtcblxudmFyIE5VTUJFUiA9ICdOdW1iZXInO1xudmFyIE5hdGl2ZU51bWJlciA9IGdsb2JhbFtOVU1CRVJdO1xudmFyIE51bWJlclByb3RvdHlwZSA9IE5hdGl2ZU51bWJlci5wcm90b3R5cGU7XG5cbi8vIE9wZXJhIH4xMiBoYXMgYnJva2VuIE9iamVjdCN0b1N0cmluZ1xudmFyIEJST0tFTl9DTEFTU09GID0gY2xhc3NvZihjcmVhdGUoTnVtYmVyUHJvdG90eXBlKSkgPT0gTlVNQkVSO1xuXG4vLyBgVG9OdW1iZXJgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9udW1iZXJcbnZhciB0b051bWJlciA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgaXQgPSB0b1ByaW1pdGl2ZShhcmd1bWVudCwgZmFsc2UpO1xuICB2YXIgZmlyc3QsIHRoaXJkLCByYWRpeCwgbWF4Q29kZSwgZGlnaXRzLCBsZW5ndGgsIGluZGV4LCBjb2RlO1xuICBpZiAodHlwZW9mIGl0ID09ICdzdHJpbmcnICYmIGl0Lmxlbmd0aCA+IDIpIHtcbiAgICBpdCA9IHRyaW0oaXQpO1xuICAgIGZpcnN0ID0gaXQuY2hhckNvZGVBdCgwKTtcbiAgICBpZiAoZmlyc3QgPT09IDQzIHx8IGZpcnN0ID09PSA0NSkge1xuICAgICAgdGhpcmQgPSBpdC5jaGFyQ29kZUF0KDIpO1xuICAgICAgaWYgKHRoaXJkID09PSA4OCB8fCB0aGlyZCA9PT0gMTIwKSByZXR1cm4gTmFOOyAvLyBOdW1iZXIoJysweDEnKSBzaG91bGQgYmUgTmFOLCBvbGQgVjggZml4XG4gICAgfSBlbHNlIGlmIChmaXJzdCA9PT0gNDgpIHtcbiAgICAgIHN3aXRjaCAoaXQuY2hhckNvZGVBdCgxKSkge1xuICAgICAgICBjYXNlIDY2OiBjYXNlIDk4OiByYWRpeCA9IDI7IG1heENvZGUgPSA0OTsgYnJlYWs7IC8vIGZhc3QgZXF1YWwgb2YgL14wYlswMV0rJC9pXG4gICAgICAgIGNhc2UgNzk6IGNhc2UgMTExOiByYWRpeCA9IDg7IG1heENvZGUgPSA1NTsgYnJlYWs7IC8vIGZhc3QgZXF1YWwgb2YgL14wb1swLTddKyQvaVxuICAgICAgICBkZWZhdWx0OiByZXR1cm4gK2l0O1xuICAgICAgfVxuICAgICAgZGlnaXRzID0gaXQuc2xpY2UoMik7XG4gICAgICBsZW5ndGggPSBkaWdpdHMubGVuZ3RoO1xuICAgICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvZGUgPSBkaWdpdHMuY2hhckNvZGVBdChpbmRleCk7XG4gICAgICAgIC8vIHBhcnNlSW50IHBhcnNlcyBhIHN0cmluZyB0byBhIGZpcnN0IHVuYXZhaWxhYmxlIHN5bWJvbFxuICAgICAgICAvLyBidXQgVG9OdW1iZXIgc2hvdWxkIHJldHVybiBOYU4gaWYgYSBzdHJpbmcgY29udGFpbnMgdW5hdmFpbGFibGUgc3ltYm9sc1xuICAgICAgICBpZiAoY29kZSA8IDQ4IHx8IGNvZGUgPiBtYXhDb2RlKSByZXR1cm4gTmFOO1xuICAgICAgfSByZXR1cm4gcGFyc2VJbnQoZGlnaXRzLCByYWRpeCk7XG4gICAgfVxuICB9IHJldHVybiAraXQ7XG59O1xuXG4vLyBgTnVtYmVyYCBjb25zdHJ1Y3RvclxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtbnVtYmVyLWNvbnN0cnVjdG9yXG5pZiAoaXNGb3JjZWQoTlVNQkVSLCAhTmF0aXZlTnVtYmVyKCcgMG8xJykgfHwgIU5hdGl2ZU51bWJlcignMGIxJykgfHwgTmF0aXZlTnVtYmVyKCcrMHgxJykpKSB7XG4gIHZhciBOdW1iZXJXcmFwcGVyID0gZnVuY3Rpb24gTnVtYmVyKHZhbHVlKSB7XG4gICAgdmFyIGl0ID0gYXJndW1lbnRzLmxlbmd0aCA8IDEgPyAwIDogdmFsdWU7XG4gICAgdmFyIGR1bW15ID0gdGhpcztcbiAgICByZXR1cm4gZHVtbXkgaW5zdGFuY2VvZiBOdW1iZXJXcmFwcGVyXG4gICAgICAvLyBjaGVjayBvbiAxLi5jb25zdHJ1Y3Rvcihmb28pIGNhc2VcbiAgICAgICYmIChCUk9LRU5fQ0xBU1NPRiA/IGZhaWxzKGZ1bmN0aW9uICgpIHsgTnVtYmVyUHJvdG90eXBlLnZhbHVlT2YuY2FsbChkdW1teSk7IH0pIDogY2xhc3NvZihkdW1teSkgIT0gTlVNQkVSKVxuICAgICAgICA/IGluaGVyaXRJZlJlcXVpcmVkKG5ldyBOYXRpdmVOdW1iZXIodG9OdW1iZXIoaXQpKSwgZHVtbXksIE51bWJlcldyYXBwZXIpIDogdG9OdW1iZXIoaXQpO1xuICB9O1xuICBmb3IgKHZhciBrZXlzID0gREVTQ1JJUFRPUlMgPyBnZXRPd25Qcm9wZXJ0eU5hbWVzKE5hdGl2ZU51bWJlcikgOiAoXG4gICAgLy8gRVMzOlxuICAgICdNQVhfVkFMVUUsTUlOX1ZBTFVFLE5hTixORUdBVElWRV9JTkZJTklUWSxQT1NJVElWRV9JTkZJTklUWSwnICtcbiAgICAvLyBFUzIwMTUgKGluIGNhc2UsIGlmIG1vZHVsZXMgd2l0aCBFUzIwMTUgTnVtYmVyIHN0YXRpY3MgcmVxdWlyZWQgYmVmb3JlKTpcbiAgICAnRVBTSUxPTixpc0Zpbml0ZSxpc0ludGVnZXIsaXNOYU4saXNTYWZlSW50ZWdlcixNQVhfU0FGRV9JTlRFR0VSLCcgK1xuICAgICdNSU5fU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQscGFyc2VJbnQsaXNJbnRlZ2VyJ1xuICApLnNwbGl0KCcsJyksIGogPSAwLCBrZXk7IGtleXMubGVuZ3RoID4gajsgaisrKSB7XG4gICAgaWYgKGhhcyhOYXRpdmVOdW1iZXIsIGtleSA9IGtleXNbal0pICYmICFoYXMoTnVtYmVyV3JhcHBlciwga2V5KSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkoTnVtYmVyV3JhcHBlciwga2V5LCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTmF0aXZlTnVtYmVyLCBrZXkpKTtcbiAgICB9XG4gIH1cbiAgTnVtYmVyV3JhcHBlci5wcm90b3R5cGUgPSBOdW1iZXJQcm90b3R5cGU7XG4gIE51bWJlclByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE51bWJlcldyYXBwZXI7XG4gIHJlZGVmaW5lKGdsb2JhbCwgTlVNQkVSLCBOdW1iZXJXcmFwcGVyKTtcbn1cbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdHJpbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbScpLnRyaW07XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyICRwYXJzZUludCA9IGdsb2JhbC5wYXJzZUludDtcbnZhciBoZXggPSAvXlsrLV0/MFtYeF0vO1xudmFyIEZPUkNFRCA9ICRwYXJzZUludCh3aGl0ZXNwYWNlcyArICcwOCcpICE9PSA4IHx8ICRwYXJzZUludCh3aGl0ZXNwYWNlcyArICcweDE2JykgIT09IDIyO1xuXG4vLyBgcGFyc2VJbnRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcGFyc2VpbnQtc3RyaW5nLXJhZGl4XG5tb2R1bGUuZXhwb3J0cyA9IEZPUkNFRCA/IGZ1bmN0aW9uIHBhcnNlSW50KHN0cmluZywgcmFkaXgpIHtcbiAgdmFyIFMgPSB0cmltKFN0cmluZyhzdHJpbmcpKTtcbiAgcmV0dXJuICRwYXJzZUludChTLCAocmFkaXggPj4+IDApIHx8IChoZXgudGVzdChTKSA/IDE2IDogMTApKTtcbn0gOiAkcGFyc2VJbnQ7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBwYXJzZUludCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9udW1iZXItcGFyc2UtaW50Jyk7XG5cbi8vIGBOdW1iZXIucGFyc2VJbnRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtbnVtYmVyLnBhcnNlaW50XG4kKHsgdGFyZ2V0OiAnTnVtYmVyJywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBOdW1iZXIucGFyc2VJbnQgIT0gcGFyc2VJbnQgfSwge1xuICBwYXJzZUludDogcGFyc2VJbnRcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcblxudmFyIG5hdGl2ZUFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuYXNzaWduYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5hc3NpZ25cbm1vZHVsZS5leHBvcnRzID0gIW5hdGl2ZUFzc2lnbiB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHNob3VsZCBoYXZlIGNvcnJlY3Qgb3JkZXIgb2Ygb3BlcmF0aW9ucyAoRWRnZSBidWcpXG4gIGlmIChERVNDUklQVE9SUyAmJiBuYXRpdmVBc3NpZ24oeyBiOiAxIH0sIG5hdGl2ZUFzc2lnbihkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRoaXMsICdiJywge1xuICAgICAgICB2YWx1ZTogMyxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfSksIHsgYjogMiB9KSkuYiAhPT0gMSkgcmV0dXJuIHRydWU7XG4gIC8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgpO1xuICB2YXIgYWxwaGFiZXQgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW3N5bWJvbF0gPSA3O1xuICBhbHBoYWJldC5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoY2hyKSB7IEJbY2hyXSA9IGNocjsgfSk7XG4gIHJldHVybiBuYXRpdmVBc3NpZ24oe30sIEEpW3N5bWJvbF0gIT0gNyB8fCBvYmplY3RLZXlzKG5hdGl2ZUFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IGFscGhhYmV0O1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmY7XG4gIHdoaWxlIChhcmd1bWVudHNMZW5ndGggPiBpbmRleCkge1xuICAgIHZhciBTID0gSW5kZXhlZE9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gb2JqZWN0S2V5cyhTKS5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKFMpKSA6IG9iamVjdEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSB7XG4gICAgICBrZXkgPSBrZXlzW2orK107XG4gICAgICBpZiAoIURFU0NSSVBUT1JTIHx8IHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoUywga2V5KSkgVFtrZXldID0gU1trZXldO1xuICAgIH1cbiAgfSByZXR1cm4gVDtcbn0gOiBuYXRpdmVBc3NpZ247XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWFzc2lnbicpO1xuXG4vLyBgT2JqZWN0LmFzc2lnbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBPYmplY3QuYXNzaWduICE9PSBhc3NpZ24gfSwge1xuICBhc3NpZ246IGFzc2lnblxufSk7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKS5mO1xuXG4vLyBgT2JqZWN0LnsgZW50cmllcywgdmFsdWVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVE9fRU5UUklFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoaXQpO1xuICAgIHZhciBrZXlzID0gb2JqZWN0S2V5cyhPKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBpKSB7XG4gICAgICBrZXkgPSBrZXlzW2krK107XG4gICAgICBpZiAoIURFU0NSSVBUT1JTIHx8IHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoTywga2V5KSkge1xuICAgICAgICByZXN1bHQucHVzaChUT19FTlRSSUVTID8gW2tleSwgT1trZXldXSA6IE9ba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYE9iamVjdC5lbnRyaWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmVudHJpZXNcbiAgZW50cmllczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgT2JqZWN0LnZhbHVlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC52YWx1ZXNcbiAgdmFsdWVzOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGVudHJpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXRvLWFycmF5JykuZW50cmllcztcblxuLy8gYE9iamVjdC5lbnRyaWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5lbnRyaWVzXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSB9LCB7XG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoTykge1xuICAgIHJldHVybiAkZW50cmllcyhPKTtcbiAgfVxufSk7XG4iLCIvLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgRE9NSXRlcmFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlICYmIENvbGxlY3Rpb25Qcm90b3R5cGUuZm9yRWFjaCAhPT0gZm9yRWFjaCkgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgJ2ZvckVhY2gnLCBmb3JFYWNoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBDb2xsZWN0aW9uUHJvdG90eXBlLmZvckVhY2ggPSBmb3JFYWNoO1xuICB9XG59XG4iLCJleHBvcnRzLmRlYm91bmNlPWZ1bmN0aW9uKGksZSxvKXt2YXIgdDtyZXR1cm4gdm9pZCAwPT09ZSYmKGU9NTApLHZvaWQgMD09PW8mJihvPXtpc0ltbWVkaWF0ZTohMX0pLGZ1bmN0aW9uKCl7Zm9yKHZhciBhPVtdLGQ9YXJndW1lbnRzLmxlbmd0aDtkLS07KWFbZF09YXJndW1lbnRzW2RdO3ZhciBuPXRoaXMsbT1vLmlzSW1tZWRpYXRlJiZ2b2lkIDA9PT10O3ZvaWQgMCE9PXQmJmNsZWFyVGltZW91dCh0KSx0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0PXZvaWQgMCxvLmlzSW1tZWRpYXRlfHxpLmFwcGx5KG4sYSl9LGUpLG0mJmkuYXBwbHkobixhKX19O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ3NsaWNlJyk7XG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnc2xpY2UnLCB7IEFDQ0VTU09SUzogdHJ1ZSwgMDogMCwgMTogMiB9KTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBuYXRpdmVTbGljZSA9IFtdLnNsaWNlO1xudmFyIG1heCA9IE1hdGgubWF4O1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnNsaWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zbGljZVxuLy8gZmFsbGJhY2sgZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmdzIGFuZCBET00gb2JqZWN0c1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCh0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBrID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW5ndGgpO1xuICAgIHZhciBmaW4gPSB0b0Fic29sdXRlSW5kZXgoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiBlbmQsIGxlbmd0aCk7XG4gICAgLy8gaW5saW5lIGBBcnJheVNwZWNpZXNDcmVhdGVgIGZvciB1c2FnZSBuYXRpdmUgYEFycmF5I3NsaWNlYCB3aGVyZSBpdCdzIHBvc3NpYmxlXG4gICAgdmFyIENvbnN0cnVjdG9yLCByZXN1bHQsIG47XG4gICAgaWYgKGlzQXJyYXkoTykpIHtcbiAgICAgIENvbnN0cnVjdG9yID0gTy5jb25zdHJ1Y3RvcjtcbiAgICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgICBpZiAodHlwZW9mIENvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBpc0FycmF5KENvbnN0cnVjdG9yLnByb3RvdHlwZSkpKSB7XG4gICAgICAgIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcltTUEVDSUVTXTtcbiAgICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBudWxsKSBDb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChDb25zdHJ1Y3RvciA9PT0gQXJyYXkgfHwgQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbmF0aXZlU2xpY2UuY2FsbChPLCBrLCBmaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgPSBuZXcgKENvbnN0cnVjdG9yID09PSB1bmRlZmluZWQgPyBBcnJheSA6IENvbnN0cnVjdG9yKShtYXgoZmluIC0gaywgMCkpO1xuICAgIGZvciAobiA9IDA7IGsgPCBmaW47IGsrKywgbisrKSBpZiAoayBpbiBPKSBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIG4sIE9ba10pO1xuICAgIHJlc3VsdC5sZW5ndGggPSBuO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciB0ZXN0ID0ge307XG5cbnRlc3RbVE9fU1RSSU5HX1RBR10gPSAneic7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nKHRlc3QpID09PSAnW29iamVjdCB6XSc7XG4iLCJ2YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGNsYXNzb2ZSYXcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIENPUlJFQ1RfQVJHVU1FTlRTID0gY2xhc3NvZlJhdyhmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxufTtcblxuLy8gZ2V0dGluZyB0YWcgZnJvbSBFUzYrIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYFxubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyBjbGFzc29mUmF3IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCB0YWcsIHJlc3VsdDtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKHRhZyA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVE9fU1RSSU5HX1RBRykpID09ICdzdHJpbmcnID8gdGFnXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBDT1JSRUNUX0FSR1VNRU5UUyA/IGNsYXNzb2ZSYXcoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAocmVzdWx0ID0gY2xhc3NvZlJhdyhPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IHt9LnRvU3RyaW5nIDogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnW29iamVjdCAnICsgY2xhc3NvZih0aGlzKSArICddJztcbn07XG4iLCJ2YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXRvLXN0cmluZycpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nXG5pZiAoIVRPX1NUUklOR19UQUdfU1VQUE9SVCkge1xuICByZWRlZmluZShPYmplY3QucHJvdG90eXBlLCAndG9TdHJpbmcnLCB0b1N0cmluZywgeyB1bnNhZmU6IHRydWUgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLmZsYWdzYCBnZXR0ZXIgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRoYXQgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAodGhhdC5nbG9iYWwpIHJlc3VsdCArPSAnZyc7XG4gIGlmICh0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmICh0aGF0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKHRoYXQuZG90QWxsKSByZXN1bHQgKz0gJ3MnO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBmbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZmxhZ3MnKTtcblxudmFyIFRPX1NUUklORyA9ICd0b1N0cmluZyc7XG52YXIgUmVnRXhwUHJvdG90eXBlID0gUmVnRXhwLnByb3RvdHlwZTtcbnZhciBuYXRpdmVUb1N0cmluZyA9IFJlZ0V4cFByb3RvdHlwZVtUT19TVFJJTkddO1xuXG52YXIgTk9UX0dFTkVSSUMgPSBmYWlscyhmdW5jdGlvbiAoKSB7IHJldHVybiBuYXRpdmVUb1N0cmluZy5jYWxsKHsgc291cmNlOiAnYScsIGZsYWdzOiAnYicgfSkgIT0gJy9hL2InOyB9KTtcbi8vIEZGNDQtIFJlZ0V4cCN0b1N0cmluZyBoYXMgYSB3cm9uZyBuYW1lXG52YXIgSU5DT1JSRUNUX05BTUUgPSBuYXRpdmVUb1N0cmluZy5uYW1lICE9IFRPX1NUUklORztcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKE5PVF9HRU5FUklDIHx8IElOQ09SUkVDVF9OQU1FKSB7XG4gIHJlZGVmaW5lKFJlZ0V4cC5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgdmFyIFIgPSBhbk9iamVjdCh0aGlzKTtcbiAgICB2YXIgcCA9IFN0cmluZyhSLnNvdXJjZSk7XG4gICAgdmFyIHJmID0gUi5mbGFncztcbiAgICB2YXIgZiA9IFN0cmluZyhyZiA9PT0gdW5kZWZpbmVkICYmIFIgaW5zdGFuY2VvZiBSZWdFeHAgJiYgISgnZmxhZ3MnIGluIFJlZ0V4cFByb3RvdHlwZSkgPyBmbGFncy5jYWxsKFIpIDogcmYpO1xuICAgIHJldHVybiAnLycgKyBwICsgJy8nICsgZjtcbiAgfSwgeyB1bnNhZmU6IHRydWUgfSk7XG59XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlRWxlbWVudCA9IChodG1sOiBzdHJpbmcpOiBIVE1MRWxlbWVudCA9PiB7XHJcbiAgY29uc3QgZWwgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGh0bWwsICd0ZXh0L2h0bWwnKS5ib2R5LmZpcnN0Q2hpbGQ7XHJcblxyXG4gIGlmIChlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICByZXR1cm4gZWxcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3VwcGxpZWQgbWFya3VwIGRvZXMgbm90IGNyZWF0ZSBhbiBIVE1MIEVsZW1lbnRcIik7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGExMXljbGljayAtIEVhc2lseSBoYW5kbGUga2V5Ym9hcmQgY2xpY2sgZXZlbnRzIG9uIG5vbiBzZW1hbnRpYyBidXR0b24gZWxlbWVudHMuXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmlua2xlL2ExMXljbGlja1xyXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgQ2xpY2sva2V5Ym9hcmQgZXZlbnQgb2JqZWN0LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvbiBldmVudCB0eXBlIGFuZCBjb2RlLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGExMXlDbGljayA9IGZ1bmN0aW9uKGV2ZW50OiBhbnkpOiBib29sZWFuIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIHZhciBjb2RlID0gZXZlbnQuY2hhckNvZGUgfHwgZXZlbnQua2V5Q29kZSxcclxuICAgIHR5cGUgPSBldmVudC50eXBlO1xyXG5cclxuICBpZiAodHlwZSA9PT0gJ2NsaWNrJykge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSAna2V5ZG93bicpIHtcclxuICAgIGlmIChjb2RlID09PSAzMiB8fCBjb2RlID09PSAxMykge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbi8vIENyb3NzIGJyb3dzZXIgY3VzdG9tIGV2ZW50XHJcbi8vIFNvbWUgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zaHlzdHJ1ay9jdXN0b20tZXZlbnQtanNcclxuZXhwb3J0IGNvbnN0IGNyb3NzQ3VzdG9tRXZlbnQgPSAoZXZlbnQ6IHN0cmluZywgcGFyYW1zOiBhbnkpID0+IHtcclxuICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcblxyXG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWQgfTtcclxuICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xyXG5cclxuICByZXR1cm4gZXZ0O1xyXG59O1xyXG5cclxuLy8gQ2hlY2tzIGlmIHZhbHVlIGlzIGFuIGludGVnZXJcclxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTnVtYmVyL2lzSW50ZWdlciNQb2x5ZmlsbFxyXG5leHBvcnQgY29uc3QgaXNJbnRlZ2VyID0gKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJlxyXG4gICAgaXNGaW5pdGUodmFsdWUpICYmXHJcbiAgICBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUgJiZcclxuICAgIHZhbHVlICE9IG51bGwgJiYgIWlzTmFOKE51bWJlcih2YWx1ZS50b1N0cmluZygpKSlcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0ID0gKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbDtcclxufTtcclxuXHJcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNDA0ODYxNVxyXG5leHBvcnQgY29uc3QgY2FuQWNjZXNzQXNBcnJheSA9IChpdGVtOiBhbnkpOiBib29sZWFuID0+IHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIC8vIG1vZGVybiBicm93c2VyIHN1Y2ggYXMgSUU5IC8gZmlyZWZveCAvIGNocm9tZSBldGMuXHJcbiAgdmFyIHJlc3VsdCA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVtKTtcclxuICBpZiAocmVzdWx0ID09PSAnW29iamVjdCBIVE1MQ29sbGVjdGlvbl0nIHx8IHJlc3VsdCA9PT0gJ1tvYmplY3QgTm9kZUxpc3RdJykge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIC8vaWUgNi83LzhcclxuICBpZiAoXHJcbiAgICB0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcgfHxcclxuICAgICFpdGVtLmhhc093blByb3BlcnR5KCdsZW5ndGgnKSB8fFxyXG4gICAgaXRlbS5sZW5ndGggPCAwXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIC8vIGEgZmFsc2UgcG9zaXRpdmUgb24gYW4gZW1wdHkgcHNldWRvLWFycmF5IGlzIE9LIGJlY2F1c2UgdGhlcmUgd29uJ3QgYmUgYW55dGhpbmdcclxuICAvLyB0byBpdGVyYXRlIHNvIHdlIGFsbG93IGFueXRoaW5nIHdpdGggLmxlbmd0aCA9PT0gMCB0byBwYXNzIHRoZSB0ZXN0XHJcbiAgaWYgKGl0ZW0ubGVuZ3RoID09PSAwKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKGl0ZW1bMF0gJiYgaXRlbVswXS5ub2RlVHlwZSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbi8vIFJ1biBhIGZ1bmN0aW9uIG9uIGFsbCBlbGVtZW50cyBldmVuIGlmIGl0J3MgYSBjb2xsZWN0aW9uIG9yIHNpbmdsZVxyXG5leHBvcnQgY29uc3QgZXZlcnlFbGVtZW50ID0gKFxyXG4gIGVsZW1lbnRzOlxyXG4gICAgfCBIVE1MRWxlbWVudFxyXG4gICAgfCBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PlxyXG4gICAgfCBIVE1MQ29sbGVjdGlvblxyXG4gICAgfCBOb2RlTGlzdFxyXG4gICAgfCBIVE1MRWxlbWVudFtdXHJcbiAgICB8IHVuZGVmaW5lZCxcclxuICBjYWxsYmFjaz86IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZFxyXG4pID0+IHtcclxuICAvLyBSZXR1cm4gaWYgbm90aGluZyBwYXNzZWRcclxuICBpZiAoZWxlbWVudHMgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cclxuICAvLyBXcmFwIGVsZW1lbnRzIGluIGFuIGFycmF5IGlmIHNpbmdsZVxyXG4gIGxldCBlbHMgPSBjYW5BY2Nlc3NBc0FycmF5KGVsZW1lbnRzKSA/IGVsZW1lbnRzIDogW2VsZW1lbnRzXTtcclxuXHJcbiAgLy8gT2xkc2Nob29sIGFycmF5IGl0ZXJhdG9yIG1ldGhvZCBmb3IgSUUgKGF2b2lkaW5nIHBvbHlmaWxscylcclxuICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbHMpLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcclxuICAgIGlmIChlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGVsKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgY29tcHV0ZWQgd2lkdGgvaGVpZ2h0IHdpdGggc3VicGl4ZWxzXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9WZXN0cmlkZS9nbGVuLmNvZGVzL2Jsb2IvbWFzdGVyL3NyYy9wb3N0cy9nZXR0aW5nLWVsZW1lbnQtd2lkdGgubWRcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRTdWJwaXhlbFN0eWxlID0gKFxyXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxyXG4gIHN0eWxlOiAnd2lkdGgnIHwgJ2hlaWdodCcsXHJcbiAgc3R5bGVzPzogQ1NTU3R5bGVEZWNsYXJhdGlvblxyXG4pID0+IHtcclxuICB2YXIgSEFTX0NPTVBVVEVEX1NUWUxFID0gISF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZTtcclxuICB2YXIgZ2V0U3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUgfHwgZnVuY3Rpb24oKSB7fTtcclxuXHJcbiAgdmFyIENPTVBVVEVEX1NJWkVfSU5DTFVERVNfUEFERElORyA9IChmdW5jdGlvbigpIHtcclxuICAgIGlmICghSEFTX0NPTVBVVEVEX1NUWUxFKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcGFyZW50ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZS5zdHlsZS5jc3NUZXh0ID1cclxuICAgICAgJ3dpZHRoOjEwcHg7cGFkZGluZzoycHg7JyArXHJcbiAgICAgICctd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3g7JztcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChlKTtcclxuXHJcbiAgICB2YXIgd2lkdGggPSBnZXRTdHlsZXMoZSwgbnVsbCkud2lkdGg7XHJcbiAgICB2YXIgcmV0ID0gd2lkdGggPT09ICcxMHB4JztcclxuXHJcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZSk7XHJcblxyXG4gICAgcmV0dXJuIHJldDtcclxuICB9KSgpO1xyXG5cclxuICAvKipcclxuICAgKiBSZXRyaWV2ZSB0aGUgY29tcHV0ZWQgc3R5bGUgZm9yIGFuIGVsZW1lbnQsIHBhcnNlZCBhcyBhIGZsb2F0LlxyXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRvIGdldCBzdHlsZSBmb3IuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0eWxlIFN0eWxlIHByb3BlcnR5LlxyXG4gICAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gW3N0eWxlc10gT3B0aW9uYWxseSBpbmNsdWRlIGNsZWFuIHN0eWxlcyB0b1xyXG4gICAqICAgICB1c2UgaW5zdGVhZCBvZiBhc2tpbmcgZm9yIHRoZW0gYWdhaW4uXHJcbiAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgcGFyc2VkIGNvbXB1dGVkIHZhbHVlIG9yIHplcm8gaWYgdGhhdCBmYWlscyBiZWNhdXNlIElFXHJcbiAgICogICAgIHdpbGwgcmV0dXJuICdhdXRvJyB3aGVuIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBtYXJnaW5zIGluc3RlYWQgb2ZcclxuICAgKiAgICAgdGhlIGNvbXB1dGVkIHN0eWxlLlxyXG4gICAqL1xyXG4gIHZhciBnZXROdW1iZXJTdHlsZSA9IGZ1bmN0aW9uKFxyXG4gICAgZWw6IEhUTUxFbGVtZW50LFxyXG4gICAgZWxTdHlsZTogJ3dpZHRoJyB8ICdoZWlnaHQnLFxyXG4gICAgZWxTdHlsZXM/OiBDU1NTdHlsZURlY2xhcmF0aW9uXHJcbiAgKSB7XHJcbiAgICBpZiAoSEFTX0NPTVBVVEVEX1NUWUxFKSB7XHJcbiAgICAgIGVsU3R5bGVzID0gZWxTdHlsZXMgfHwgZ2V0U3R5bGVzKGVsLCBudWxsKTtcclxuICAgICAgdmFyIHZhbHVlID0gZ2V0RmxvYXQoZWxTdHlsZXNbZWxTdHlsZV0pO1xyXG5cclxuICAgICAgLy8gU3VwcG9ydCBJRTw9MTEgYW5kIFczQyBzcGVjLlxyXG4gICAgICBpZiAoIUNPTVBVVEVEX1NJWkVfSU5DTFVERVNfUEFERElORyAmJiBlbFN0eWxlID09PSAnd2lkdGgnKSB7XHJcbiAgICAgICAgdmFsdWUgKz1cclxuICAgICAgICAgIGdldEZsb2F0KGVsU3R5bGVzLnBhZGRpbmdMZWZ0KSArXHJcbiAgICAgICAgICBnZXRGbG9hdChlbFN0eWxlcy5wYWRkaW5nUmlnaHQpICtcclxuICAgICAgICAgIGdldEZsb2F0KGVsU3R5bGVzLmJvcmRlckxlZnRXaWR0aCkgK1xyXG4gICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMuYm9yZGVyUmlnaHRXaWR0aCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIUNPTVBVVEVEX1NJWkVfSU5DTFVERVNfUEFERElORyAmJiBlbFN0eWxlID09PSAnaGVpZ2h0Jykge1xyXG4gICAgICAgIHZhbHVlICs9XHJcbiAgICAgICAgICBnZXRGbG9hdChlbFN0eWxlcy5wYWRkaW5nVG9wKSArXHJcbiAgICAgICAgICBnZXRGbG9hdChlbFN0eWxlcy5wYWRkaW5nQm90dG9tKSArXHJcbiAgICAgICAgICBnZXRGbG9hdChlbFN0eWxlcy5ib3JkZXJUb3BXaWR0aCkgK1xyXG4gICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMuYm9yZGVyQm90dG9tV2lkdGgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZ2V0RmxvYXQoZWwuc3R5bGVbZWxTdHlsZV0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHZhciBpc051bWJlciA9IGZ1bmN0aW9uKG46IGFueSkge1xyXG4gICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiAoaXNGaW5pdGUobikgYXMgYm9vbGVhbik7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGdldEZsb2F0ID0gZnVuY3Rpb24odmFsdWU6IGFueSkge1xyXG4gICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcclxuICAgIHJldHVybiBpc051bWJlcih2YWx1ZSkgPyAodmFsdWUgYXMgbnVtYmVyKSA6IDA7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGdldE51bWJlclN0eWxlKGVsZW1lbnQsIHN0eWxlLCBzdHlsZXMpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFByZXZpb3VzU2libGluZ3MgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQsIGFtb3VudCA9IDEwKSA9PiB7XHJcbiAgY29uc3QgZWxlbWVudHMgPSBbXTtcclxuICBsZXQgc2libGluZyA9IGVsZW1lbnQucHJldmlvdXNTaWJsaW5nIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICB3aGlsZSAoc2libGluZyAmJiBlbGVtZW50cy5sZW5ndGggPCBhbW91bnQpIHtcclxuICAgIGVsZW1lbnRzLnB1c2goc2libGluZyk7XHJcbiAgICBzaWJsaW5nID0gc2libGluZy5wcmV2aW91c1NpYmxpbmcgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gIH1cclxuICByZXR1cm4gZWxlbWVudHM7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TmV4dFNpYmxpbmdzID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhbW91bnQgPSAxMCkgPT4ge1xyXG4gIGNvbnN0IGVsZW1lbnRzID0gW107XHJcbiAgbGV0IHNpYmxpbmcgPSBlbGVtZW50Lm5leHRTaWJsaW5nIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuXHJcbiAgd2hpbGUgKHNpYmxpbmcgJiYgZWxlbWVudHMubGVuZ3RoIDwgYW1vdW50KSB7XHJcbiAgICBlbGVtZW50cy5wdXNoKHNpYmxpbmcpO1xyXG4gICAgc2libGluZyA9IHNpYmxpbmcubmV4dFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVsZW1lbnRzO1xyXG59OyIsImltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndHMtZGVib3VuY2UnO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZUVsZW1lbnQsXHJcbiAgYTExeUNsaWNrLFxyXG4gIGNyb3NzQ3VzdG9tRXZlbnQsXHJcbiAgaXNJbnRlZ2VyLFxyXG4gIGlzT2JqZWN0LFxyXG4gIGV2ZXJ5RWxlbWVudCxcclxuICBnZXRTdWJwaXhlbFN0eWxlLFxyXG4gIGdldE5leHRTaWJsaW5ncyxcclxuICBnZXRQcmV2aW91c1NpYmxpbmdzXHJcbn0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xyXG5cclxuZW51bSBTbGlkZURpcmVjdGlvbiB7XHJcbiAgUHJldixcclxuICBOZXh0XHJcbn1cclxuXHJcbmVudW0gU2xpZGVyU3RhdGUge1xyXG4gIEVuYWJsZWQgPSAxLFxyXG4gIERpc2FibGVkID0gMFxyXG59XHJcblxyXG5lbnVtIEF1dG9wbGF5U3dpdGNoIHtcclxuICBFbmFibGUsXHJcbiAgRGlzYWJsZVxyXG59XHJcblxyXG5lbnVtIElzQXV0b3BsYXlpbmcge1xyXG4gIFllcyxcclxuICBObyA9IDBcclxufVxyXG5cclxuaW50ZXJmYWNlIEFjdGl2ZVZpc2libGVTbGlkZXMge1xyXG4gICh2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdLCBhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQpOiB2b2lkO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQ3VzdG9tUGFnaW5nIHtcclxuICAoaW5kZXg6IG51bWJlciwgYTExeVNsaWRlcjogQTExWVNsaWRlcik6IHN0cmluZztcclxufVxyXG5cclxudHlwZSBPcHRpb25zID0ge1xyXG4gIC8qKiBBZGRzIGEgY29udGFpbmVyIGVsZW1lbnQgYXJvdW5kIHRoZSBzbGlkZXIgKi9cclxuICBjb250YWluZXI/OiBib29sZWFuO1xyXG4gIC8qKiBFbmFibGVzIHByZXYvbmV4dCBidXR0b24gKi9cclxuICBhcnJvd3M/OiBib29sZWFuO1xyXG4gIC8qKiBCdXR0b24gdG8gdHJpZ2dlciBwcmV2aW91cyBzbGlkZS4gQTExWVNsaWRlciB3aWxsIGdlbmVyYXRlIG9uZSBieSBkZWZhdWx0LiBDYW4gYmUgb25lIG9yIG11bHRpcGxlIEhUTUwgZWxlbWVudHMgKi9cclxuICBwcmV2QXJyb3c/OiBIVE1MRWxlbWVudCB8IEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+IHwgTm9kZUxpc3Q7XHJcbiAgLyoqIEJ1dHRvbiB0byB0cmlnZ2VyIG5leHQgc2xpZGUuIEExMVlTbGlkZXIgd2lsbCBnZW5lcmF0ZSBvbmUgYnkgZGVmYXVsdC4gQ2FuIGJlIG9uZSBvciBtdWx0aXBsZSBIVE1MIGVsZW1lbnRzICovXHJcbiAgbmV4dEFycm93PzogSFRNTEVsZW1lbnQgfCBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PiB8IE5vZGVMaXN0O1xyXG4gIC8qKiBHZW5lcmF0ZSBuYXZpZ2F0aW9uIGRvdHMgKi9cclxuICBkb3RzPzogYm9vbGVhbjtcclxuICAvKiogSGVpZ2h0IG9mIHNsaWRlciBjb250YWluZXIgY2hhbmdlcyBhY2NvcmRpbmcgdG8gZWFjaCBzbGlkZSdzIGhlaWdodCAqL1xyXG4gIGFkYXB0aXZlSGVpZ2h0PzogYm9vbGVhbjtcclxuICAvKiogQWRkcyBhIHNraXAgYnV0dG9uIGJlZm9yZSB0aGUgc2xpZGVyIGZvciBhMTF5IGRldmljZXMgKENhbiBiZSBzZWVuIGJ5IHRhYmJpbmcpICovXHJcbiAgc2tpcEJ0bj86IGJvb2xlYW47XHJcbiAgLyoqIFRoZSB0b3RhbCBudW1iZXIgb2YgaXRlbXMgdG8gYmUgc2hvd24uIEJ5IGRlZmF1bHQgQTExWVNsaWRlciB3aWxsIHdvcmsgYnkgZGVmYXVsdCBiYXNlZCBvZmYgeW91ciBDU1Mgc3R5bGluZy4gVGhpcyBvcHRpb24gaGFyZGNvZGVzIHRoZSB3aWR0aCBpbnRvIHRoZSBIVE1MIGZvciB5b3UgKi9cclxuICBzbGlkZXNUb1Nob3c/OiBudW1iZXIgfCBudWxsO1xyXG4gIC8qKiBFbmFibGVzIHRoZSBhdXRvbWF0aWMgY2hhbmdlIG9mIHNsaWRlcyAqL1xyXG4gIGF1dG9wbGF5PzogYm9vbGVhbjtcclxuICAvKiogVGltZSBiZXR3ZWVuIHNsaWRlIGNoYW5nZXMgd2hlbiBhdXRvcGxheSBpcyBlbmFibGVkICovXHJcbiAgYXV0b3BsYXlTcGVlZD86IG51bWJlcjtcclxuICAvKiogSWYgYXV0b3BsYXkgaXMgZW5hYmxlZCB0aGVuIHBhdXNlIHdoZW4gdGhlIHNsaWRlciBpcyBob3ZlcmVkICovXHJcbiAgYXV0b3BsYXlIb3ZlclBhdXNlPzogYm9vbGVhbjtcclxuICAvKiogKiooRVhQRVJJTUVOVEFMKSoqIE1ha2VzIHRoZSBjZW50ZXIgc2xpZGUgYWN0aXZlICovXHJcbiAgY2VudGVyTW9kZT86IGJvb2xlYW47XHJcbiAgLyoqIE1ha2VzIHRoZSBzbGlkZXIgaW5maW5pdGVseSBsb29wICovXHJcbiAgaW5maW5pdGU/OiBib29sZWFuO1xyXG4gIC8qKiBEaXNhYmxlcyB0aGUgc2xpZGVyICovXHJcbiAgZGlzYWJsZT86IGJvb2xlYW47XHJcbiAgLyoqIERlZmluZSBvcHRpb25zIGZvciBkaWZmZXJlbnQgdmlld3BvcnQgd2lkdGhzICovXHJcbiAgcmVzcG9uc2l2ZT86IG9iamVjdCB8IG51bGw7XHJcbiAgLyoqIERlZmluZSB5b3VyIG93biBjdXN0b20gZG90cyB0ZW1wbGF0ZSAqL1xyXG4gIGN1c3RvbVBhZ2luZz86IEN1c3RvbVBhZ2luZyB8IG51bGw7XHJcbiAgLyoqIFN3aXBlIGZ1bmN0aW9uYWxpdHkgKi9cclxuICBzd2lwZT86IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBMTFZU2xpZGVyIHtcclxuICBwcml2YXRlIF9hY3RpdmVDbGFzczogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3Zpc2libGVDbGFzczogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2RvdHNDbGFzczogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3NsaWRlckNsYXNzOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfaGFzQ3VzdG9tQXJyb3dzOiBib29sZWFuO1xyXG4gIHByaXZhdGUgX2ZvY3VzYWJsZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfdXBkYXRlSGVpZ2h0RGVib3VuY2VkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfZ2VuZXJhdGVEb3RzRGVib3VuY2VkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfdXBkYXRlU2Nyb2xsUG9zaXRpb246IGFueTtcclxuICBwcml2YXRlIF9hdXRvcGxheVRpbWVyOiBJc0F1dG9wbGF5aW5nO1xyXG4gIHByaXZhdGUgYXV0b3BsYXlCdG46IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgX3BhdXNlT25Nb3VzZUxlYXZlOiBib29sZWFuO1xyXG4gIHByaXZhdGUgX3NraXBCdG5zOiBIVE1MRWxlbWVudFtdO1xyXG4gIHB1YmxpYyBzbGlkZXI6IEhUTUxFbGVtZW50O1xyXG4gIHB1YmxpYyBzbGlkZXM6IEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+O1xyXG4gIHB1YmxpYyBkb3RzOiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgcHVibGljIHN3aXBlOiBib29sZWFuO1xyXG4gIHB1YmxpYyBhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQ7XHJcbiAgcHVibGljIHZpc2libGVTbGlkZXM6IEhUTUxFbGVtZW50W107XHJcbiAgcHVibGljIHNsaWRlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHVibGljIG9wdGlvbnM6IE9wdGlvbnM7XHJcbiAgcHVibGljIHNsaWRlckVuYWJsZWQ6IFNsaWRlclN0YXRlO1xyXG4gIHB1YmxpYyBtb2Rlcm5Ccm93c2VyOiBib29sZWFuO1xyXG4gIHB1YmxpYyBtb3VzZURvd246IGJvb2xlYW47XHJcbiAgcHVibGljIHRvdWNoU3RhcnQ6IGJvb2xlYW47XHJcbiAgcHVibGljIHN3aXBlU3RhcnRYOiBudW1iZXI7XHJcbiAgcHVibGljIHN3aXBlWDogbnVtYmVyO1xyXG4gIHB1YmxpYyBzd2lwZVhDYWNoZWQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiBPcHRpb25zKSB7XHJcbiAgICAvLyBFbmZvcmNlIGBlbGVtZW50YCBwYXJhbWV0ZXJcclxuICAgIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcmVxdWlyZWQgaW5wdXQgW2VsZW1lbnRdIG11c3QgYmUgYW4gSFRNTEVsZW1lbnQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNYWtlIHN1cmUgb3B0aW9ucyBwYXJhbWV0ZXIgaXMgY29ycmVjdFxyXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiAhaXNPYmplY3Qob3B0aW9ucykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcmVxdWlyZWQgaW5wdXQgW29wdGlvbnNdIG11c3QgYmUgYW4gT2JqZWN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zbGlkZXIgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5zbGlkZXMgPSBlbGVtZW50LmNoaWxkcmVuIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+O1xyXG4gICAgdGhpcy5zbGlkZXJDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFxyXG4gICAgICAnPGRpdiBjbGFzcz1cImExMXktc2xpZGVyLWNvbnRhaW5lclwiPjwvZGl2PidcclxuICAgICk7XHJcbiAgICB0aGlzLl9hY3RpdmVDbGFzcyA9ICdhMTF5LXNsaWRlci1hY3RpdmUnO1xyXG4gICAgdGhpcy5fdmlzaWJsZUNsYXNzID0gJ2ExMXktc2xpZGVyLXZpc2libGUnO1xyXG4gICAgdGhpcy5fZG90c0NsYXNzID0gJ2ExMXktc2xpZGVyLWRvdHMnO1xyXG4gICAgdGhpcy5fc2xpZGVyQ2xhc3MgPSAnYTExeS1zbGlkZXInO1xyXG4gICAgdGhpcy5fZm9jdXNhYmxlID1cclxuICAgICAgJ2EsIGFyZWEsIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBidXR0b24sIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgKlt0YWJpbmRleF0sICpbY29udGVudGVkaXRhYmxlXSc7XHJcbiAgICB0aGlzLl9hdXRvcGxheVRpbWVyID0gSXNBdXRvcGxheWluZy5ObztcclxuICAgIHRoaXMuYXV0b3BsYXlCdG4gPSBjcmVhdGVFbGVtZW50KFxyXG4gICAgICBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhMTF5LXNsaWRlci1hdXRvcGxheVwiPlRvZ2dsZSBzbGlkZXIgYXV0b3BsYXk8L2J1dHRvbj5gXHJcbiAgICApO1xyXG4gICAgdGhpcy5fcGF1c2VPbk1vdXNlTGVhdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuX3NraXBCdG5zID0gW107XHJcbiAgICB0aGlzLmRvdHMgPSBudWxsO1xyXG4gICAgdGhpcy5zd2lwZSA9IHRydWU7XHJcbiAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdGhpcy5zbGlkZXNbMF07XHJcbiAgICB0aGlzLnZpc2libGVTbGlkZXMgPSBbXTtcclxuICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9IFNsaWRlclN0YXRlLkRpc2FibGVkO1xyXG4gICAgdGhpcy5tb2Rlcm5Ccm93c2VyID0gISFIVE1MRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsVG87XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgdGhpcy50b3VjaFN0YXJ0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnN3aXBlU3RhcnRYID0gMDtcclxuICAgIHRoaXMuc3dpcGVYID0gMDtcclxuICAgIHRoaXMuc3dpcGVYQ2FjaGVkID0gMDtcclxuICAgIHRoaXMuX2hhc0N1c3RvbUFycm93cyA9XHJcbiAgICAgIChvcHRpb25zICYmIG9wdGlvbnMucHJldkFycm93KSB8fCAob3B0aW9ucyAmJiBvcHRpb25zLm5leHRBcnJvdylcclxuICAgICAgICA/IHRydWVcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICBjb250YWluZXI6IHRydWUsXHJcbiAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgcHJldkFycm93OlxyXG4gICAgICAgIChvcHRpb25zICYmIG9wdGlvbnMucHJldkFycm93KSB8fFxyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhMTF5LXNsaWRlci1wcmV2XCI+UHJldmlvdXMgc2xpZGU8L2J1dHRvbj4nXHJcbiAgICAgICAgKSxcclxuICAgICAgbmV4dEFycm93OlxyXG4gICAgICAgIChvcHRpb25zICYmIG9wdGlvbnMubmV4dEFycm93KSB8fFxyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhMTF5LXNsaWRlci1uZXh0XCI+TmV4dCBzbGlkZTwvYnV0dG9uPidcclxuICAgICAgICApLFxyXG4gICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICBhZGFwdGl2ZUhlaWdodDogZmFsc2UsXHJcbiAgICAgIHNraXBCdG46IHRydWUsXHJcbiAgICAgIHNsaWRlc1RvU2hvdzogbnVsbCxcclxuICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICBhdXRvcGxheVNwZWVkOiA0MDAwLFxyXG4gICAgICBhdXRvcGxheUhvdmVyUGF1c2U6IHRydWUsXHJcbiAgICAgIGNlbnRlck1vZGU6IGZhbHNlLFxyXG4gICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgZGlzYWJsZTogZmFsc2UsXHJcbiAgICAgIHJlc3BvbnNpdmU6IG51bGwsXHJcbiAgICAgIGN1c3RvbVBhZ2luZzogbnVsbCxcclxuICAgICAgc3dpcGU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgLy8gU2V0IHVzZXItaW5wdXR0ZWQgb3B0aW9ucyBpZiBhdmFpbGFibGVcclxuICAgIHRoaXMub3B0aW9ucyA9IHsgLi4udGhpcy5vcHRpb25zLCAuLi5vcHRpb25zIH07XHJcblxyXG4gICAgLy8gQmluZGluZ3NcclxuICAgIHRoaXMuX2hhbmRsZVByZXYgPSB0aGlzLl9oYW5kbGVQcmV2LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLl9oYW5kbGVOZXh0ID0gdGhpcy5faGFuZGxlTmV4dC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5faGFuZGxlQXV0b3BsYXkgPSB0aGlzLl9oYW5kbGVBdXRvcGxheS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5faGFuZGxlQXV0b3BsYXlIb3ZlciA9IHRoaXMuX2hhbmRsZUF1dG9wbGF5SG92ZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX2hhbmRsZUF1dG9wbGF5RXZlbnQgPSB0aGlzLl9oYW5kbGVBdXRvcGxheUV2ZW50LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZURlYm91bmNlZCA9IGRlYm91bmNlKFxyXG4gICAgICB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZS5iaW5kKHRoaXMpLFxyXG4gICAgICAyNTBcclxuICAgICk7XHJcbiAgICB0aGlzLl91cGRhdGVIZWlnaHREZWJvdW5jZWQgPSBkZWJvdW5jZSh0aGlzLl91cGRhdGVIZWlnaHQuYmluZCh0aGlzKSwgMjUwKTtcclxuICAgIHRoaXMuX2dlbmVyYXRlRG90c0RlYm91bmNlZCA9IGRlYm91bmNlKHRoaXMuX2dlbmVyYXRlRG90cy5iaW5kKHRoaXMpLCAyNTApO1xyXG4gICAgdGhpcy5fdXBkYXRlU2Nyb2xsUG9zaXRpb24gPSBkZWJvdW5jZShcclxuICAgICAgKCkgPT4gdGhpcy5zY3JvbGxUb1NsaWRlKHRoaXMuYWN0aXZlU2xpZGUpLFxyXG4gICAgICAyNTBcclxuICAgICk7XHJcbiAgICB0aGlzLl9oYW5kbGVTY3JvbGwgPSBkZWJvdW5jZSh0aGlzLl9oYW5kbGVTY3JvbGwuYmluZCh0aGlzKSwgMTApOyAvLyBDYWxscyBfc2Nyb2xsRmluaXNoXHJcbiAgICB0aGlzLl9zY3JvbGxGaW5pc2ggPSBkZWJvdW5jZSh0aGlzLl9zY3JvbGxGaW5pc2guYmluZCh0aGlzKSwgMTc1KTsgLy8gTWF5IGZpcmUgdHdpY2UgZGVwZW5kaW5nIG9uIGJyb3dzZXJcclxuICAgIHRoaXMuX3N3aXBlTW91c2VEb3duID0gdGhpcy5fc3dpcGVNb3VzZURvd24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX3N3aXBlTW91c2VVcCA9IHRoaXMuX3N3aXBlTW91c2VVcC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5fc3dpcGVNb3VzZU1vdmUgPSB0aGlzLl9zd2lwZU1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5fc3dpcGVUb3VjaFN0YXJ0ID0gdGhpcy5fc3dpcGVUb3VjaFN0YXJ0LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLl9zd2lwZVRvdWNoRW5kID0gdGhpcy5fc3dpcGVUb3VjaEVuZC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5fc3dpcGVUb3VjaE1vdmUgPSB0aGlzLl9zd2lwZVRvdWNoTW92ZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgc2xpZGVyXHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvLyBJbml0aWFsaXplIHRoZSBzbGlkZXIsIHNob3VsZCBtaXJyb3IgZGVzdHJveSgpXHJcbiAgcHJpdmF0ZSBfaW5pdCgpIHtcclxuICAgIC8vIEZpcmVmb3ggbW92ZXMgdGhlIHNsaWRlciBkZXBlbmRpbmcgb24gcGFnZSBsb2FkIHNvIHJlc2V0dGluZyB0byAwXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLnNsaWRlci5zY3JvbGxMZWZ0ID0gMCksIDEpO1xyXG5cclxuICAgIC8vIEdlbmVyYXRlIGxpc3RlbmVycyBmb3IgcmVzcG9uc2l2ZSBvcHRpb25zIGlmIGFkZGVkXHJcbiAgICBpZiAoaXNPYmplY3QodGhpcy5vcHRpb25zLnJlc3BvbnNpdmUpKSB0aGlzLl9jaGVja1Jlc3BvbnNpdmUoKTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiB0aGUgc2xpZGVyIHNob3VsZCBiZSBpbml0aWFsaXplZCBkZXBlbmRpbmcgb24gc2xpZGVzIHNob3duXHJcbiAgICB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZSgpO1xyXG5cclxuICAgIC8vIEVuYWJsZS9kaXNhYmxlIHNsaWRlciBhZnRlciByZXNpemVcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZURlYm91bmNlZCk7XHJcblxyXG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaW5pdCcsIHtcclxuICAgICAgYTExeVNsaWRlcjogdGhpc1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jaGVja1Nob3VsZEVuYWJsZSgpIHtcclxuICAgIGxldCBzaG91bGRFbmFibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8vIElmIHVzZXIgc3BlY2lmaWVkIHRvIGRpc2FibGUgKHVzdWFsbHkgZm9yIHJlc3BvbnNpdmUgb3IgdXBkYXRlT3B0aW9ucylcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZSA9PT0gdHJ1ZSkgc2hvdWxkRW5hYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLy8gSWYgMSBvciBsZXNzIHNsaWRlcyBleGlzdCB0aGVuIGEgc2xpZGVyIGlzIG5vdCBuZWVkZWRcclxuICAgIGlmICh0aGlzLnNsaWRlcy5sZW5ndGggPD0gMSkgc2hvdWxkRW5hYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLy8gSWYgdXNlciBleHBsaWNpdGx5IHNldCBzbGlkZXMgdG8gYmUgc2hvd24gYW5kIGl0J3MgdGhlIHNhbWUgbnVtYmVyIGFzIGF2YWlsYWJsZVxyXG4gICAgaWYgKGlzSW50ZWdlcih0aGlzLm9wdGlvbnMuc2xpZGVzVG9TaG93KSkge1xyXG4gICAgICBpZiAodGhpcy5zbGlkZXMubGVuZ3RoID09PSB0aGlzLm9wdGlvbnMuc2xpZGVzVG9TaG93KVxyXG4gICAgICAgIHNob3VsZEVuYWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIHNsaWRlcyBvdXRzaWRlIHRoZSBzbGlkZXIncyB2aWV3cG9ydCBhIHNsaWRlciBpcyBub3QgbmVlZGVkXHJcbiAgICAgIHRoaXMuX2dldEFjdGl2ZUFuZFZpc2libGUobnVsbCwgKHZpc2libGVTbGlkZXM6IEhUTUxFbGVtZW50W10pID0+IHtcclxuICAgICAgICBpZiAodmlzaWJsZVNsaWRlcy5sZW5ndGggPT09IHRoaXMuc2xpZGVzLmxlbmd0aCkgc2hvdWxkRW5hYmxlID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEVuYWJsZS9kaXNhYmxlIHNsaWRlciBiYXNlZCBvbiBhYm92ZSByZXF1aXJlbWVudHNcclxuICAgIGlmIChzaG91bGRFbmFibGUgJiYgdGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5EaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLl9lbmFibGVTbGlkZXIoKTtcclxuICAgIH0gZWxzZSBpZiAoIXNob3VsZEVuYWJsZSAmJiB0aGlzLnNsaWRlckVuYWJsZWQgPT09IFNsaWRlclN0YXRlLkVuYWJsZWQpIHtcclxuICAgICAgdGhpcy5fZGlzYWJsZVNsaWRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEN1c3RvbSBidXR0b25zIHNob3VsZCBiZSBoaWRkZW4gaWYgbm90IGluaXRpYWxseSBlbmFibGVkXHJcbiAgICBpZiAoIXNob3VsZEVuYWJsZSAmJiB0aGlzLl9oYXNDdXN0b21BcnJvd3MpIHtcclxuICAgICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2QXJyb3csIHByZXZBcnJvdyA9PiB7XHJcbiAgICAgICAgcHJldkFycm93LmNsYXNzTGlzdC5hZGQoJ2ExMXktc2xpZGVyLWhpZGUnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBldmVyeUVsZW1lbnQodGhpcy5vcHRpb25zLm5leHRBcnJvdywgbmV4dEFycm93ID0+IHtcclxuICAgICAgICBuZXh0QXJyb3cuY2xhc3NMaXN0LmFkZCgnYTExeS1zbGlkZXItaGlkZScpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEVuYWJsZSBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHNsaWRlci4gU2hvdWxkIG1pcnJvciBfZGlzYWJsZVNsaWRlcigpXHJcbiAgcHJpdmF0ZSBfZW5hYmxlU2xpZGVyKCkge1xyXG4gICAgLy8gU2V0IHNsaWRlciB0byBlbmFibGVkXHJcbiAgICB0aGlzLnNsaWRlckVuYWJsZWQgPSBTbGlkZXJTdGF0ZS5FbmFibGVkO1xyXG5cclxuICAgIC8vIEFkZCBzbGlkZXIgY29udGFpbmVyIHRvIERPTSBhbmQgbW92ZSBzbGlkZXIgaW50byBpdCBpZiBlbmFibGVkXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRhaW5lcikge1xyXG4gICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5zbGlkZXJDb250YWluZXIpO1xyXG4gICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCB0aGlzLnNsaWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIHNraXAgYnV0dG9uIGJlZm9yZSBzbGlkZXIgaWYgZW5hYmxlZFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5za2lwQnRuKSB0aGlzLl9hZGRTa2lwQnRuKCk7XHJcblxyXG4gICAgLy8gSWYgcHJldi9uZXh0IGJ1dHRvbnMgYXJlIGVuYWJsZWQgYW5kIHVzZXIgaXNuJ3QgdXNpbmcgdGhlaXIgb3duIGFkZCBpdCB0byB0aGUgRE9NXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFycm93cyAmJiAhdGhpcy5faGFzQ3VzdG9tQXJyb3dzKSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJldkFycm93IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgICAgICAnYmVmb3JlYmVnaW4nLFxyXG4gICAgICAgICAgdGhpcy5vcHRpb25zLnByZXZBcnJvd1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubmV4dEFycm93IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgICAgICAnYmVmb3JlYmVnaW4nLFxyXG4gICAgICAgICAgdGhpcy5vcHRpb25zLm5leHRBcnJvd1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBQb3NzaWJsZSBmb3IgdGhlcmUgdG8gYmUgbXVsdGlwbGUgc28gbmVlZCB0byBsb29wIHRocm91Z2ggdGhlbSBhbGxcclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMucHJldkFycm93LCBwcmV2QXJyb3cgPT4ge1xyXG4gICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBwcmV2L25leHQgYnV0dG9uc1xyXG4gICAgICBwcmV2QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVQcmV2LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgIHByZXZBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZVByZXYsIHtcclxuICAgICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2hhc0N1c3RvbUFycm93cykge1xyXG4gICAgICAgIC8vIFVzZXIgZ2VuZXJhdGVkIGJ1dHRvbnMgZ2V0IHNwZWNpYWwgaGlkZSBjbGFzcyByZW1vdmVkXHJcbiAgICAgICAgcHJldkFycm93LmNsYXNzTGlzdC5yZW1vdmUoJ2ExMXktc2xpZGVyLWhpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5uZXh0QXJyb3csIG5leHRBcnJvdyA9PiB7XHJcbiAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHByZXYvbmV4dCBidXR0b25zXHJcbiAgICAgIG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZU5leHQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgICAgbmV4dEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5faGFuZGxlTmV4dCwge1xyXG4gICAgICAgIHBhc3NpdmU6IHRydWVcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5faGFzQ3VzdG9tQXJyb3dzKSB7XHJcbiAgICAgICAgLy8gVXNlciBnZW5lcmF0ZWQgYnV0dG9ucyBnZXQgc3BlY2lhbCBoaWRlIGNsYXNzIHJlbW92ZWRcclxuICAgICAgICBuZXh0QXJyb3cuY2xhc3NMaXN0LnJlbW92ZSgnYTExeS1zbGlkZXItaGlkZScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBZGQgZG90IG5hdmlnYXRpb24gaWYgZW5hYmxlZFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kb3RzKSB0aGlzLl9nZW5lcmF0ZURvdHMoKTtcclxuXHJcbiAgICAvLyBBZGQgbGlzdGVuZXIgZm9yIHdoZW4gdGhlIHNsaWRlciBzdG9wcyBtb3ZpbmdcclxuICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2hhbmRsZVNjcm9sbCwgZmFsc2UpO1xyXG5cclxuICAgIC8vIEFkZCBhbGwgQ1NTIG5lZWRlZFxyXG4gICAgdGhpcy5fc2V0Q1NTKCk7XHJcblxyXG4gICAgLy8gQWRhcHRpdmUgaGVpZ2h0XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIFVwZGF0ZSBzbGlkZXIncyBoZWlnaHQgYmFzZWQgb24gY29udGVudCBvZiBzbGlkZVxyXG4gICAgICB0aGlzLl91cGRhdGVIZWlnaHQodGhpcy5hY3RpdmVTbGlkZSk7XHJcblxyXG4gICAgICAvLyBBbHNvIGFkZCByZXNpemUgbGlzdGVuZXIgZm9yIGl0XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVIZWlnaHREZWJvdW5jZWQuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RhcnQgYXV0b3BsYXkgaWYgZW5hYmxlZFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvcGxheSkgdGhpcy5fZW5hYmxlQXV0b3BsYXkoKTtcclxuXHJcbiAgICAvLyBPbiByZXNpemUgbWFrZSBzdXJlIHRvIHVwZGF0ZSBzY3JvbGwgcG9zaXRpb24gYXMgY29udGVudCBtYXkgY2hhbmdlIGluIHdpZHRoL2hlaWdodFxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3VwZGF0ZVNjcm9sbFBvc2l0aW9uKTtcclxuXHJcbiAgICAvLyBBZGQgc3dpcGUgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnN3aXBlKSB0aGlzLl9lbmFibGVTd2lwZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gRGlzYWJsZSBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHNsaWRlci4gU2hvdWxkIG1pcnJvciBfZW5hYmxlU2xpZGVyKClcclxuICBwcml2YXRlIF9kaXNhYmxlU2xpZGVyKCkge1xyXG4gICAgdGhpcy5zbGlkZXJFbmFibGVkID0gU2xpZGVyU3RhdGUuRGlzYWJsZWQ7XHJcblxyXG4gICAgLy8gUmVtb3ZlIHNsaWRlciBmcm9tIGExMXktc2xpZGVyJ3MgY29udGFpbmVyIGFuZCB0aGVuIHJlbW92ZSBjb250YWluZXIgZnJvbSBET01cclxuICAgIGlmIChkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHRoaXMuc2xpZGVyQ29udGFpbmVyKSkge1xyXG4gICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5zbGlkZXIpO1xyXG4gICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5wYXJlbnROb2RlICYmXHJcbiAgICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNsaWRlckNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHNraXAgYnV0dG9uXHJcbiAgICB0aGlzLl9yZW1vdmVTa2lwQnRuKCk7XHJcblxyXG4gICAgLy8gUG9zc2libGUgZm9yIHRoZXJlIHRvIGJlIG11bHRpcGxlIHNvIG5lZWQgdG8gbG9vcCB0aHJvdWdoIHRoZW0gYWxsXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5vcHRpb25zLnByZXZBcnJvdywgcHJldkFycm93ID0+IHtcclxuICAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmb3IgcHJldi9uZXh0IGJ1dHRvbnNcclxuICAgICAgcHJldkFycm93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlUHJldik7XHJcbiAgICAgIHByZXZBcnJvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZVByZXYpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLl9oYXNDdXN0b21BcnJvd3MpIHtcclxuICAgICAgICAvLyBPbmx5IHJlbW92ZSBnZW5lcmF0ZWQgYnV0dG9ucywgbm90IHVzZXItZGVmaW5lZCBvbmVzXHJcbiAgICAgICAgcHJldkFycm93LnBhcmVudE5vZGUgJiYgcHJldkFycm93LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocHJldkFycm93KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBVc2VyIGdlbmVyYXRlZCBidXR0b25zIGdldCBzcGVjaWFsIGhpZGUgY2xhc3MgcmVtb3ZlZFxyXG4gICAgICAgIHByZXZBcnJvdy5jbGFzc0xpc3QuYWRkKCdhMTF5LXNsaWRlci1oaWRlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMubmV4dEFycm93LCBuZXh0QXJyb3cgPT4ge1xyXG4gICAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZvciBwcmV2L25leHQgYnV0dG9uc1xyXG4gICAgICBuZXh0QXJyb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVOZXh0KTtcclxuICAgICAgbmV4dEFycm93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5faGFuZGxlTmV4dCk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuX2hhc0N1c3RvbUFycm93cykge1xyXG4gICAgICAgIC8vIE9ubHkgcmVtb3ZlIGdlbmVyYXRlZCBidXR0b25zLCBub3QgdXNlci1kZWZpbmVkIG9uZXNcclxuICAgICAgICBuZXh0QXJyb3cucGFyZW50Tm9kZSAmJiBuZXh0QXJyb3cucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuZXh0QXJyb3cpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFVzZXIgZ2VuZXJhdGVkIGJ1dHRvbnMgZ2V0IHNwZWNpYWwgaGlkZSBjbGFzcyByZW1vdmVkXHJcbiAgICAgICAgbmV4dEFycm93LmNsYXNzTGlzdC5hZGQoJ2ExMXktc2xpZGVyLWhpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gV2lsbCByZW1vdmUgZG90cyBpZiB0aGV5IGV4aXN0XHJcbiAgICB0aGlzLl9yZW1vdmVEb3RzKCk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGxpc3RlbmVyIGZvciB3aGVuIHRoZSBzbGlkZXIgc3RvcHMgbW92aW5nXHJcbiAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9oYW5kbGVTY3JvbGwsIGZhbHNlKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgYWxsIENTU1xyXG4gICAgdGhpcy5fcmVtb3ZlQ1NTKCk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCBhZGFwdGl2ZSBoZWlnaHQgZnVuY3Rpb25hbGl0eVxyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3VwZGF0ZUhlaWdodERlYm91bmNlZCk7XHJcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoZmFsc2UpO1xyXG5cclxuICAgIC8vIFN0b3AgYXV0b3BsYXkgaWYgZW5hYmxlZFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvcGxheSkgdGhpcy5fZGlzYWJsZUF1dG9wbGF5KCk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIHN3aXBlIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgdGhpcy5fZGlzYWJsZVN3aXBlKCk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIHNjcm9sbCBwb3NpdGlvbiB1cGRhdGUgY2hlY2tcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbik7XHJcblxyXG4gICAgLy8gUmVtb3ZlIHN3aXBlIGZ1bmN0aW9uYWxpdHlcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuc3dpcGUpIHRoaXMuX2Rpc2FibGVTd2lwZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gQWRkIGFsbCBDU1MgbmVlZGVkIGZvciB0aGUgc2xpZGVyLiBTaG91bGQgbWlycm9yIF9yZW1vdmVDU1MoKVxyXG4gIHByaXZhdGUgX3NldENTUyhhY3RpdmVTbGlkZT86IEhUTUxFbGVtZW50KSB7XHJcbiAgICAvLyBVcGRhdGUgc2xpZGUgZWxlbWVudCBDU1NcclxuICAgIHRoaXMuX2FkZFNsaWRlc1dpZHRoKCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIHNsaWRlciBpbnN0YW5jZSB0byBnZXQgdGhlIGNvcnJlY3QgZWxlbWVudHNcclxuICAgIHRoaXMuX2dldEFjdGl2ZUFuZFZpc2libGUoYWN0aXZlU2xpZGUgfHwgbnVsbCk7XHJcblxyXG4gICAgLy8gQWRkIG1haW4gc2xpZGVyIGNsYXNzIGlmIGl0IGRvZXNuJ3QgaGF2ZSBpdCBhbHJlYWR5XHJcbiAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKHRoaXMuX3NsaWRlckNsYXNzKTtcclxuXHJcbiAgICAvLyBSZXNldCB0aGUgbW9yZSBkeW5hbWljIENTUyBmaXJzdCBpZiBpdCBleGlzdHNcclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLnNsaWRlcywgc2xpZGUgPT4ge1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2FjdGl2ZUNsYXNzKTtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl92aXNpYmxlQ2xhc3MpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWRkIGluIGFjdGl2ZSBjbGFzc2VzXHJcbiAgICB0aGlzLmFjdGl2ZVNsaWRlLmNsYXNzTGlzdC5hZGQodGhpcy5fYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgIC8vIEFkZCBpbiB2aXNpYmxlIGNsYXNzZXNcclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLnZpc2libGVTbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCh0aGlzLl92aXNpYmxlQ2xhc3MpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVHJpZ2dlciBkb3QgdXBkYXRlXHJcbiAgICB0aGlzLl91cGRhdGVEb3RzKHRoaXMuYWN0aXZlU2xpZGUpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBhbGwgYTExeSBmdW5jdGlvbmFsaXR5XHJcbiAgICB0aGlzLl91cGRhdGVBMTFZKCk7XHJcbiAgfVxyXG5cclxuICAvLyBSZW1vdmUgYWxsIENTUyBuZWVkZWQgZm9yIHRoZSBzbGlkZXIuIFNob3VsZCBtaXJyb3IgX3NldENTUygpXHJcbiAgcHJpdmF0ZSBfcmVtb3ZlQ1NTKCkge1xyXG4gICAgLy8gUmVtb3ZlIGl0ZW0gQ1NTIGlmIGl0IHdhcyBzZXRcclxuICAgIHRoaXMuX3JlbW92ZVNsaWRlc1dpZHRoKCk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGNsYXNzIHRvIHNsaWRlclxyXG4gICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zbGlkZXJDbGFzcyk7XHJcblxyXG4gICAgLy8gUmVzZXQgYWxsIHRoZSBkeW5hbWljIGNsYXNzZXNcclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLnNsaWRlcywgc2xpZGUgPT4ge1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2FjdGl2ZUNsYXNzKTtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl92aXNpYmxlQ2xhc3MpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCBhMTF5IGZ1bmN0aW9uYWxpdHlcclxuICAgIHRoaXMuX3JlbW92ZUExMVkoKTtcclxuICB9XHJcblxyXG4gIC8vIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIGJyZWFrcG9pbnRzXHJcbiAgcHJpdmF0ZSBfY2hlY2tSZXNwb25zaXZlKCkge1xyXG4gICAgaWYgKCFpc09iamVjdCh0aGlzLm9wdGlvbnMucmVzcG9uc2l2ZSkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB7IHJlc3BvbnNpdmUsIC4uLmluaXRpYWxPcHRpb25zIH0gPSB0aGlzLm9wdGlvbnM7XHJcbiAgICBjb25zdCBicmVha3BvaW50czogQXJyYXk8eyBtcWw6IE1lZGlhUXVlcnlMaXN0OyBvcHRpb25zOiBPcHRpb25zIH0+ID0gW107XHJcblxyXG4gICAgLy8gU29ydCBtZWRpYSBxdWVyaWVzIGZyb20gbG93ZXN0IHRvIGhpZ2hlc3RcclxuICAgIGNvbnN0IHJlc3BvbnNpdmVPcHRpb25zID0gT2JqZWN0LmVudHJpZXMoXHJcbiAgICAgIHRoaXMub3B0aW9ucy5yZXNwb25zaXZlIGFzIG9iamVjdFxyXG4gICAgKS5zb3J0KChhLCBiKSA9PiBhWzFdIC0gYlsxXSk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IEpTIG1lZGlhIHF1ZXJ5IGZvciBpbml0aWFsIG9wdGlvbnMgZm9yIHRoZSBsb3dlc3QgTVEgYW5kIGRvd25cclxuICAgIGJyZWFrcG9pbnRzLnB1c2goe1xyXG4gICAgICBtcWw6IHdpbmRvdy5tYXRjaE1lZGlhKFxyXG4gICAgICAgIGBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7XHJcbiAgICAgICAgICBOdW1iZXIucGFyc2VJbnQocmVzcG9uc2l2ZU9wdGlvbnNbMF1bMF0pIC0gMVxyXG4gICAgICAgIH1weClgXHJcbiAgICAgICksXHJcbiAgICAgIG9wdGlvbnM6IGluaXRpYWxPcHRpb25zIGFzIE9wdGlvbnNcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgcmVzcG9uc2l2ZSBvYmplY3RzIGFuZCBnZW5lcmF0ZSBhIEpTIG1lZGlhIHF1ZXJ5XHJcbiAgICByZXNwb25zaXZlT3B0aW9ucy5mb3JFYWNoKFxyXG4gICAgICAoW2JyZWFrcG9pbnQsIGJyZWFrcG9pbnRPcHRpb25zXTogW3N0cmluZywgT3B0aW9uc10sIGkpID0+IHtcclxuICAgICAgICBsZXQgb3B0aW9uczogT3B0aW9ucyA9IHsgLi4udGhpcy5vcHRpb25zIH07XHJcbiAgICAgICAgbGV0IG1xbFN0cmluZyA9IGBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7YnJlYWtwb2ludH1weClgO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbW9yZSBtZWRpYSBxdWVyaWVzIGFmdGVyIHRoaXMgdGhlbiBjcmVhdGUgYSBzdG9wcGluZyBwb2ludFxyXG4gICAgICAgIGlmIChpICE9PSByZXNwb25zaXZlT3B0aW9ucy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICBtcWxTdHJpbmcgPSBtcWxTdHJpbmcuY29uY2F0KFxyXG4gICAgICAgICAgICBgIGFuZCAobWF4LXdpZHRoOiAke1xyXG4gICAgICAgICAgICAgIE51bWJlci5wYXJzZUludChyZXNwb25zaXZlT3B0aW9uc1tpICsgMV1bMF0pIC0gMVxyXG4gICAgICAgICAgICB9cHgpYFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIGxheWVyIGNha2Ugb2Ygb3B0aW9ucyBmcm9tIHRoZSBsb3dlc3QgYnJlYWtwb2ludCB0byB0aGUgaGlnaGVzdFxyXG4gICAgICAgIGJyZWFrcG9pbnRzLmZvckVhY2goYnJlYWtwb2ludCA9PiB7XHJcbiAgICAgICAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIGJyZWFrcG9pbnQub3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCB0aGlzIHNwZWNpZmljIGJyZWFrcG9pbnQgdG8gdGhlIHRvcCBvZiB0aGUgY2FrZSDwn46CXHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCBicmVha3BvaW50T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGJyZWFrcG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgbXFsOiB3aW5kb3cubWF0Y2hNZWRpYShtcWxTdHJpbmcpLFxyXG4gICAgICAgICAgb3B0aW9uc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIEZvciBlYWNoIEpTIG1lZGlhIHF1ZXJ5IGFkZCBhbiBldmVudCBsaXN0ZW5lclxyXG4gICAgYnJlYWtwb2ludHMubWFwKGJyZWFrcG9pbnQgPT4ge1xyXG4gICAgICAvKipcclxuICAgICAgICogVGhpcyBzaG91bGQgaW4gdGhlb3J5IGJlIHJ1bm5pbmcgYXQgdGhlIGluaXRpYWxpemF0aW9uXHJcbiAgICAgICAqIHNvIG1ha2Ugc3VyZSB0aGUgY29ycmVjdCBvcHRpb25zIGFyZSBzZXQuXHJcbiAgICAgICAqL1xyXG4gICAgICBpZiAoYnJlYWtwb2ludC5tcWwubWF0Y2hlcykge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLCBicmVha3BvaW50Lm9wdGlvbnMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDcmVhdGVzIGEgbWVkaWEgcXVlcnkgbGlzdGVuZXJcclxuICAgICAgYnJlYWtwb2ludC5tcWwuYWRkTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICAgIGlmIChicmVha3BvaW50Lm1xbC5tYXRjaGVzKSB7XHJcbiAgICAgICAgICAvLyBVcGRhdGUgc2xpZGVyIHdpdGggbmV3IG9wdGlvbnNcclxuICAgICAgICAgIHRoaXMudXBkYXRlT3B0aW9ucyhicmVha3BvaW50Lm9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIElmIHNsaWRlc1RvU2hvdyBpcyB1c2VkIHRoZW4gbWFudWFsbHkgYWRkIHNsaWRlIHdpZHRoc1xyXG4gIHByaXZhdGUgX2FkZFNsaWRlc1dpZHRoKCkge1xyXG4gICAgaWYgKGlzSW50ZWdlcih0aGlzLm9wdGlvbnMuc2xpZGVzVG9TaG93KSkge1xyXG4gICAgICAvLyBQZXJjZW50YWdlIHdpZHRoIG9mIGVhY2ggc2xpZGVcclxuICAgICAgY29uc3Qgc2xpZGVXaWR0aCA9IDEwMCAvICh0aGlzLm9wdGlvbnMuc2xpZGVzVG9TaG93IGFzIG51bWJlcik7XHJcblxyXG4gICAgICAvLyBTZXQgc3R5bGVzIGZvciBzbGlkZXJcclxuICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHJcbiAgICAgIC8vIFNldCBzdHlsZXMgZm9yIGl0ZW1zXHJcbiAgICAgIGV2ZXJ5RWxlbWVudCh0aGlzLnNsaWRlcywgc2xpZGUgPT4ge1xyXG4gICAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gYCR7c2xpZGVXaWR0aH0lYDtcclxuICAgICAgICBzbGlkZS5zdHlsZS5mbGV4ID0gJzAgMCBhdXRvJztcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBSZXNldCBldmVyeXRoaW5nIGlmIG51bWJlciBvZiBpdGVtcyBub3QgZXhwbGljaXRseSBzZXRcclxuICAgICAgdGhpcy5fcmVtb3ZlU2xpZGVzV2lkdGgoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFJlc2V0IHNsaWRlIHN0eWxpbmcgZXZlbiBpZiBleHBsaWNpdGx5IHNldCBpbiB0aGUgb3B0aW9uc1xyXG4gIHByaXZhdGUgX3JlbW92ZVNsaWRlc1dpZHRoKCkge1xyXG4gICAgdGhpcy5zbGlkZXIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2Rpc3BsYXknKTtcclxuXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgc2xpZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3dpZHRoJyk7XHJcbiAgICAgIHNsaWRlLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdmbGV4Jyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIFVwZGF0ZSBhbGwgYXNzb2NpYXRlZCBhMTF5IGZ1bmN0aW9uYWxpdHkuIFNob3VsZCBtaXJyb3IgX3JlbW92ZUExMVkoKVxyXG4gIHByaXZhdGUgX3VwZGF0ZUExMVkoKSB7XHJcbiAgICAvLyBSZXNldCBhbGwgYTExeSBmdW5jdGlvbmFsaXR5IHRvIGRlZmF1bHQgYmVmb3JlaGFuZFxyXG4gICAgdGhpcy5fcmVtb3ZlQTExWSgpO1xyXG5cclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLnNsaWRlcywgc2xpZGUgPT4ge1xyXG4gICAgICBjb25zdCBmb2N1c2FibGVJdGVtcyA9IHNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNhYmxlKTtcclxuXHJcbiAgICAgIC8vIElmIHNsaWRlIGlzIG5vdCB2aXNpYmxlIG1ha2UgdGhlIHNsaWRlIHdyYXBwZXIgbm90IGZvY3VzYWJsZVxyXG4gICAgICBpZiAoIXNsaWRlLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLl92aXNpYmxlQ2xhc3MpKSB7XHJcbiAgICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xyXG4gICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBldmVyeUVsZW1lbnQoZm9jdXNhYmxlSXRlbXMsIGZvY3VzYWJsZUl0ZW0gPT4ge1xyXG4gICAgICAgIGlmICghc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuX3Zpc2libGVDbGFzcykpIHtcclxuICAgICAgICAgIGZvY3VzYWJsZUl0ZW0uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBCdXR0b25zIHdpbGwgYWRkIGRpc2FibGVkIHN0YXRlIGlmIGZpcnN0L2xhc3Qgc2xpZGVcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlKSB7XHJcbiAgICAgIGNvbnN0IGZpcnN0U2xpZGUgPSB0aGlzLnNsaWRlci5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgY29uc3QgbGFzdFNsaWRlID0gdGhpcy5zbGlkZXIubGFzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgY29uc3QgZmlyc3RWaXNpYmxlU2xpZGUgPSB0aGlzLnZpc2libGVTbGlkZXNbMF07XHJcbiAgICAgIGNvbnN0IGxhc3RWaXNpYmxlU2xpZGUgPVxyXG4gICAgICAgIHRoaXMudmlzaWJsZVNsaWRlc1t0aGlzLnZpc2libGVTbGlkZXMubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAvLyBJZiBjdXJyZW50IGFjdGl2ZSBzbGlkZSBpcyB0aGUgZmlyc3QgZWxlbWVudCB0aGVuIGRpc2FibGUgcHJldlxyXG4gICAgICBpZiAoZmlyc3RWaXNpYmxlU2xpZGUgPT09IGZpcnN0U2xpZGUpIHtcclxuICAgICAgICBldmVyeUVsZW1lbnQodGhpcy5vcHRpb25zLnByZXZBcnJvdywgcHJldkFycm93ID0+IHtcclxuICAgICAgICAgIHByZXZBcnJvdy5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJZiBjdXJyZW50IGFjdGl2ZSBzbGlkZSBpcyB0aGUgbGFzdCBlbGVtZW50IHRoZW4gZGlzYWJsZSBuZXh0XHJcbiAgICAgIGlmIChsYXN0VmlzaWJsZVNsaWRlID09PSBsYXN0U2xpZGUpIHtcclxuICAgICAgICBldmVyeUVsZW1lbnQodGhpcy5vcHRpb25zLm5leHRBcnJvdywgbmV4dEFycm93ID0+IHtcclxuICAgICAgICAgIG5leHRBcnJvdy5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBSZXNldCBhbGwgYXNzb2NpYXRlZCBhMTF5IGZ1bmN0aW9uYWxpdHkuIFNob3VsZCBtaXJyb3IgX3VwZGF0ZUExMVkoKVxyXG4gIHByaXZhdGUgX3JlbW92ZUExMVkoKSB7XHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgY29uc3QgZm9jdXNhYmxlSXRlbXMgPSBzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzYWJsZSk7XHJcblxyXG4gICAgICAvLyBSZW1vdmUgYTExeSBmb3IgZWFjaCBzbGlkZSB3cmFwcGVyXHJcbiAgICAgIHNsaWRlLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcclxuICAgICAgc2xpZGUucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xyXG5cclxuICAgICAgLy8gUmVzZXQgYTExeSBhdHRyaWJ1dGVzIGZvciBzbGlkZSBpbm5lciBlbGVtZW50c1xyXG4gICAgICBldmVyeUVsZW1lbnQoZm9jdXNhYmxlSXRlbXMsIGZvY3VzYWJsZUl0ZW0gPT4ge1xyXG4gICAgICAgIGZvY3VzYWJsZUl0ZW0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEJ1dHRvbnMgY291bGQgcG90ZW50aWFsbHkgaGF2ZSBkaXNhYmxlZCBzdGF0ZSBzbyByZW1vdmluZ1xyXG4gICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2QXJyb3csIHByZXZBcnJvdyA9PlxyXG4gICAgICBwcmV2QXJyb3cucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpXHJcbiAgICApO1xyXG4gICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5uZXh0QXJyb3csIG5leHRBcnJvdyA9PlxyXG4gICAgICBuZXh0QXJyb3cucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYWRkU2tpcEJ0bigpIHtcclxuICAgIGNvbnN0IGJlZm9yZUVsID0gY3JlYXRlRWxlbWVudChcclxuICAgICAgYDxidXR0b24gY2xhc3M9XCJhMTF5LXNsaWRlci1zci1vbmx5XCIgdHlwZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiPkNsaWNrIHRvIHNraXAgc2xpZGVyIGNhcm91c2VsPC9idXR0b24+YFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGFmdGVyRWwgPSBjcmVhdGVFbGVtZW50KFxyXG4gICAgICBgPGRpdiBjbGFzcz1cImExMXktc2xpZGVyLXNyLW9ubHlcIiB0YWJpbmRleD1cIi0xXCI+RW5kIG9mIHNsaWRlciBjYXJvdXNlbDwvZGl2PmBcclxuICAgICk7XHJcblxyXG4gICAgLy8gRXZlbnQgaGFuZGxlciB0byBnbyB0byBlbmRcclxuICAgIGNvbnN0IGZvY3VzRW5kID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoYTExeUNsaWNrKGV2ZW50KSA9PT0gdHJ1ZSkgYWZ0ZXJFbC5mb2N1cygpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICBiZWZvcmVFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZvY3VzRW5kLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICBiZWZvcmVFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZvY3VzRW5kLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcblxyXG4gICAgLy8gQWRkIHRvIERPTVxyXG4gICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIGJlZm9yZUVsKTtcclxuICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBhZnRlckVsKTtcclxuXHJcbiAgICAvLyBJZiBza2lwIGJ1dHRvbnMgZXhpc3QgZm9yIHdoYXRldmVyIHJlYXNvbiwgZW1wdHkgYXJyYXlcclxuICAgIHRoaXMuX3NraXBCdG5zID0gW107XHJcblxyXG4gICAgLy8gQWRkIG5ld2x5IGNyZWF0ZWQgYnV0dG9ucyB0byBsaWJyYXJ5IHNjb3BlXHJcbiAgICB0aGlzLl9za2lwQnRucy5wdXNoKGJlZm9yZUVsLCBhZnRlckVsKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlbW92ZVNraXBCdG4oKSB7XHJcbiAgICBjb25zdCBlbGVtZW50cyA9IFtcclxuICAgICAgLi4uZ2V0UHJldmlvdXNTaWJsaW5ncyh0aGlzLnNsaWRlciksXHJcbiAgICAgIC4uLmdldE5leHRTaWJsaW5ncyh0aGlzLnNsaWRlcilcclxuICAgIF07XHJcblxyXG4gICAgZXZlcnlFbGVtZW50KHRoaXMuX3NraXBCdG5zLCBza2lwQnRuID0+IHtcclxuICAgICAgc2tpcEJ0bi5wYXJlbnROb2RlICYmIHNraXBCdG4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChza2lwQnRuKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGV2ZXJ5RWxlbWVudChlbGVtZW50cywgZWxlbWVudCA9PiB7XHJcbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYTExeS1zbGlkZXItc3Itb25seScpKSB7XHJcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlICYmIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZW5lcmF0ZURvdHMoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRvdHMgPT09IGZhbHNlKSByZXR1cm47XHJcblxyXG4gICAgLy8gUmVtb3ZlIGRvdHMgaWYgdGhleSBhbHJlYWR5IGV4aXN0XHJcbiAgICB0aGlzLl9yZW1vdmVEb3RzKCk7XHJcblxyXG4gICAgLy8gU3RvcCBpZiBzbGlkZXIgaXMgZGlzYWJsZWRcclxuICAgIGlmICh0aGlzLnNsaWRlckVuYWJsZWQgPT09IFNsaWRlclN0YXRlLkRpc2FibGVkKSByZXR1cm47XHJcblxyXG4gICAgLy8gQ3JlYXRlIDx1bD4gd3JhcHBlciBmb3IgZG90c1xyXG4gICAgdGhpcy5kb3RzID0gY3JlYXRlRWxlbWVudChgPHVsIGNsYXNzPVwiJHt0aGlzLl9kb3RzQ2xhc3N9XCI+PC91bD5gKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2dldERvdENvdW50KCk7IGkrKykge1xyXG4gICAgICBjb25zdCBkb3RMaSA9IGNyZWF0ZUVsZW1lbnQoJzxsaT48L2xpPicpO1xyXG4gICAgICBsZXQgZG90QnRuOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY3VzdG9tUGFnaW5nKSB7XHJcbiAgICAgICAgZG90QnRuID0gY3JlYXRlRWxlbWVudCh0aGlzLm9wdGlvbnMuY3VzdG9tUGFnaW5nKGksIHRoaXMpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkb3RCdG4gPSBjcmVhdGVFbGVtZW50KCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj4nKTtcclxuICAgICAgICBkb3RCdG4udGV4dENvbnRlbnQgPSBgTW92ZSBzbGlkZXIgdG8gaXRlbSAjJHtpICsgMX1gO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBFdmVudCBoYW5kbGVycyB0byBzd2l0Y2ggdG8gc2xpZGVcclxuICAgICAgY29uc3Qgc3dpdGNoVG9TbGlkZSA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoYTExeUNsaWNrKGV2ZW50KSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgLy8gR28gdG8gc2xpZGVcclxuICAgICAgICAgIHRoaXMuc2Nyb2xsVG9TbGlkZSh0aGlzLnNsaWRlc1tpXSk7XHJcblxyXG4gICAgICAgICAgLy8gRGlzYWJsZSBhdXRvcGxheSBpZiBlbmFibGVkXHJcbiAgICAgICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5EaXNhYmxlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgIGRvdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaFRvU2xpZGUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgICAgZG90QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgc3dpdGNoVG9TbGlkZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgLy8gQXBwZW5kIHRvIFVMXHJcbiAgICAgIGRvdExpLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZG90QnRuKTtcclxuICAgICAgdGhpcy5kb3RzLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZG90TGkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBzdHlsZXMgb2YgZG90cyBiZWZvcmUgYWRkaW5nIHRvIERPTVxyXG4gICAgdGhpcy5fdXBkYXRlRG90cyh0aGlzLmFjdGl2ZVNsaWRlKTtcclxuXHJcbiAgICAvLyBBZGQgZG90cyBVTCB0byBET01cclxuICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCB0aGlzLmRvdHMpO1xyXG5cclxuICAgIC8vIERvdHMgbmVlZGVkIG1heSBjaGFuZ2Ugb24gc2NyZWVuIHNpemUgc28gcmVnZW5lcmF0ZSB0aGVtIGZyb20gc2NyYXRjaFxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2dlbmVyYXRlRG90c0RlYm91bmNlZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXREb3RDb3VudCgpIHtcclxuICAgIGxldCB0b3RhbFNsaWRlczogbnVtYmVyID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xyXG4gICAgbGV0IHNsaWRlc1RvU2hvdzogbnVtYmVyID1cclxuICAgICAgdGhpcy5vcHRpb25zLnNsaWRlc1RvU2hvdyB8fCB0aGlzLnZpc2libGVTbGlkZXMubGVuZ3RoIHx8IDE7XHJcbiAgICBsZXQgZG90czogbnVtYmVyID0gdG90YWxTbGlkZXMgLSBzbGlkZXNUb1Nob3cgKyAxO1xyXG5cclxuICAgIHJldHVybiBkb3RzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVtb3ZlRG90cygpIHtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9nZW5lcmF0ZURvdHNEZWJvdW5jZWQpO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnRzID0gZ2V0TmV4dFNpYmxpbmdzKHRoaXMuc2xpZGVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5kb3RzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5kb3RzLnBhcmVudE5vZGUgJiYgdGhpcy5kb3RzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kb3RzKTtcclxuICAgIH1cclxuXHJcbiAgICBldmVyeUVsZW1lbnQoZWxlbWVudHMsIGVsZW1lbnQgPT4ge1xyXG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5fZG90c0NsYXNzKSkge1xyXG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZSAmJiBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlRG90cyhhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIGlmICh0aGlzLmRvdHMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICBsZXQgYWN0aXZlSW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKFxyXG4gICAgICAgIGFjdGl2ZVNsaWRlLnBhcmVudE5vZGUgJiYgYWN0aXZlU2xpZGUucGFyZW50Tm9kZS5jaGlsZHJlbixcclxuICAgICAgICBhY3RpdmVTbGlkZVxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gU2V0IGRvdCB0byBsYXN0IGl0ZW0gaWYgYWN0aXZlIGluZGV4IGlzIGhpZ2hlciB0aGFuIGFtb3VudFxyXG4gICAgICBpZiAoYWN0aXZlSW5kZXggPiB0aGlzLmRvdHMuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgYWN0aXZlSW5kZXggPSB0aGlzLmRvdHMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVzZXQgY2hpbGRyZW4gYWN0aXZlIGNsYXNzIGlmIGV4aXN0XHJcbiAgICAgIGV2ZXJ5RWxlbWVudCh0aGlzLmRvdHMuY2hpbGRyZW4sIGRvdCA9PlxyXG4gICAgICAgIGRvdC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKT8uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIEFkZCBjbGFzcyB0byBhY3RpdmUgZG90XHJcbiAgICAgIHRoaXMuZG90cy5jaGlsZHJlblthY3RpdmVJbmRleF1cclxuICAgICAgICAucXVlcnlTZWxlY3RvcignYnV0dG9uJylcclxuICAgICAgICA/LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZW5hYmxlQXV0b3BsYXkoKSB7XHJcbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBhdXRvcGxheVxyXG4gICAgdGhpcy5hdXRvcGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUF1dG9wbGF5LCB7XHJcbiAgICAgIHBhc3NpdmU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hdXRvcGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZUF1dG9wbGF5LCB7XHJcbiAgICAgIHBhc3NpdmU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBdXRvcGxheUV2ZW50LCB7XHJcbiAgICAgIHBhc3NpdmU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX2hhbmRsZUF1dG9wbGF5RXZlbnQsIHtcclxuICAgICAgcGFzc2l2ZTogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvcGxheUhvdmVyUGF1c2UpIHtcclxuICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX2hhbmRsZUF1dG9wbGF5SG92ZXIsIHtcclxuICAgICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5faGFuZGxlQXV0b3BsYXlIb3Zlciwge1xyXG4gICAgICAgIHBhc3NpdmU6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIGF1dG9wbGF5IHRvZ2dsZSBidXR0b24gdG8gRE9NXHJcbiAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5hdXRvcGxheUJ0bik7XHJcblxyXG4gICAgLy8gU3RhcnQgYXV0b3BsYXlpbmdcclxuICAgIHRoaXMuX3RvZ2dsZUF1dG9wbGF5KEF1dG9wbGF5U3dpdGNoLkVuYWJsZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kaXNhYmxlQXV0b3BsYXkoKSB7XHJcbiAgICAvLyBTdG9wIGF1dG9wbGF5aW5nXHJcbiAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5EaXNhYmxlKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZvciBhdXRvcGxheVxyXG4gICAgdGhpcy5hdXRvcGxheUJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUF1dG9wbGF5KTtcclxuICAgIHRoaXMuYXV0b3BsYXlCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVBdXRvcGxheSk7XHJcbiAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUF1dG9wbGF5RXZlbnQpO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX2hhbmRsZUF1dG9wbGF5RXZlbnQpO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX2hhbmRsZUF1dG9wbGF5SG92ZXIpO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX2hhbmRsZUF1dG9wbGF5SG92ZXIpO1xyXG5cclxuICAgIC8vIFJlbW92ZSB0b2dnbGUgYnV0dG9uIGZyb20gRE9NXHJcbiAgICB0aGlzLmF1dG9wbGF5QnRuLnBhcmVudE5vZGU/LnJlbW92ZUNoaWxkKHRoaXMuYXV0b3BsYXlCdG4pO1xyXG4gIH1cclxuXHJcbiAgLy8gUmVmZXJlbmNlZCBodHRwczovL2NvZGVwZW4uaW8vZnJlZGVyaWNyb3VzL3Blbi94eFZYSllYXHJcbiAgcHJpdmF0ZSBfZW5hYmxlU3dpcGUoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnN3aXBlKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX3N3aXBlTW91c2VEb3duKTtcclxuICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX3N3aXBlTW91c2VVcCk7XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9zd2lwZU1vdXNlVXApO1xyXG4gICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9zd2lwZU1vdXNlTW92ZSk7XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9zd2lwZVRvdWNoU3RhcnQpO1xyXG4gICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX3N3aXBlVG91Y2hFbmQpO1xyXG4gICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9zd2lwZVRvdWNoTW92ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zd2lwZU1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XHJcbiAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdhMTF5LXNsaWRlci1zY3JvbGxpbmcnKTtcclxuICAgIHRoaXMuc3dpcGVTdGFydFggPSBlLnBhZ2VYIC0gdGhpcy5zbGlkZXIub2Zmc2V0TGVmdDtcclxuICAgIHRoaXMuc3dpcGVYID0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdDtcclxuICAgIHRoaXMuc3dpcGVYQ2FjaGVkID0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N3aXBlTW91c2VVcCgpIHtcclxuICAgIGlmICghdGhpcy5tb3VzZURvd24pIHJldHVybjtcclxuXHJcbiAgICAvLyBJZiB0aGUgbW92ZWQgc2xpZGVyIG9mZnNldCBpcyB3aXRoaW4gMSBwaXhlbCBpdCB3aWxsIG5vdCB0cmlnZ2VyIGEgbW92ZVxyXG4gICAgY29uc3QgaW5SYW5nZSA9XHJcbiAgICAgICh0aGlzLnN3aXBlWENhY2hlZCAtICh0aGlzLnN3aXBlWCAtIDEpKSAqXHJcbiAgICAgICAgKHRoaXMuc3dpcGVYQ2FjaGVkIC0gKHRoaXMuc3dpcGVYICsgMSkpIDw9XHJcbiAgICAgIDA7XHJcblxyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ExMXktc2xpZGVyLXNjcm9sbGluZycpO1xyXG5cclxuICAgIGlmICh0aGlzLm1vZGVybkJyb3dzZXIpIHtcclxuICAgICAgdGhpcy5zbGlkZXIuc2Nyb2xsKHtcclxuICAgICAgICBsZWZ0OiBpblJhbmdlID8gdGhpcy5zd2lwZVhDYWNoZWQgOiB0aGlzLnN3aXBlWENhY2hlZCAtIDEsXHJcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc3dpcGVNb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xyXG4gICAgaWYgKCF0aGlzLm1vdXNlRG93bikgcmV0dXJuO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IHNjcm9sbFNwZWVkID0gMjtcclxuICAgIGNvbnN0IHggPSBlLnBhZ2VYIC0gdGhpcy5zbGlkZXIub2Zmc2V0TGVmdDtcclxuICAgIGNvbnN0IHdhbGsgPSAoeCAtIHRoaXMuc3dpcGVTdGFydFgpICogc2Nyb2xsU3BlZWQ7XHJcblxyXG4gICAgdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCA9IHRoaXMuc3dpcGVYIC0gd2FsaztcclxuICAgIC8vIFNhZmFyaSBoYXMgYSBidWcgd2hlcmUgaXQgZG9lc24ndCBzYXZlIHZhbHVlcyBwcm9wZXJseSBzbyBjYWNoaW5nIGl0IGZvciB1c2UgbGF0ZXJcclxuICAgIHRoaXMuc3dpcGVYQ2FjaGVkID0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N3aXBlVG91Y2hTdGFydChlOiBUb3VjaEV2ZW50KSB7XHJcbiAgICB0aGlzLnRvdWNoU3RhcnQgPSB0cnVlO1xyXG4gICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnYTExeS1zbGlkZXItc2Nyb2xsaW5nJyk7XHJcbiAgICB0aGlzLnN3aXBlU3RhcnRYID0gZS50b3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5zbGlkZXIub2Zmc2V0TGVmdDtcclxuICAgIHRoaXMuc3dpcGVYID0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdDtcclxuICAgIHRoaXMuc3dpcGVYQ2FjaGVkID0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N3aXBlVG91Y2hFbmQoKSB7XHJcbiAgICBpZiAoIXRoaXMudG91Y2hTdGFydCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIElmIHRoZSBtb3ZlZCBzbGlkZXIgb2Zmc2V0IGlzIHdpdGhpbiAxIHBpeGVsIGl0IHdpbGwgbm90IHRyaWdnZXIgYSBtb3ZlXHJcbiAgICBjb25zdCBpblJhbmdlID1cclxuICAgICAgKHRoaXMuc3dpcGVYQ2FjaGVkIC0gKHRoaXMuc3dpcGVYIC0gMSkpICpcclxuICAgICAgICAodGhpcy5zd2lwZVhDYWNoZWQgLSAodGhpcy5zd2lwZVggKyAxKSkgPD1cclxuICAgICAgMDtcclxuXHJcbiAgICB0aGlzLnRvdWNoU3RhcnQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ExMXktc2xpZGVyLXNjcm9sbGluZycpO1xyXG5cclxuICAgIGlmICh0aGlzLm1vZGVybkJyb3dzZXIpIHtcclxuICAgICAgdGhpcy5zbGlkZXIuc2Nyb2xsKHtcclxuICAgICAgICBsZWZ0OiBpblJhbmdlID8gdGhpcy5zd2lwZVhDYWNoZWQgOiB0aGlzLnN3aXBlWENhY2hlZCAtIDEsXHJcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc3dpcGVUb3VjaE1vdmUoZTogVG91Y2hFdmVudCkge1xyXG4gICAgaWYgKCF0aGlzLnRvdWNoU3RhcnQpIHJldHVybjtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCBzY3JvbGxTcGVlZCA9IDI7XHJcbiAgICBjb25zdCB4ID0gZS50b3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5zbGlkZXIub2Zmc2V0TGVmdDtcclxuICAgIGNvbnN0IHdhbGsgPSAoeCAtIHRoaXMuc3dpcGVTdGFydFgpICogc2Nyb2xsU3BlZWQ7XHJcblxyXG4gICAgdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCA9IHRoaXMuc3dpcGVYIC0gd2FsaztcclxuICAgIC8vIFNhZmFyaSBoYXMgYSBidWcgd2hlcmUgaXQgZG9lc24ndCBzYXZlIHZhbHVlcyBwcm9wZXJseSBzbyBjYWNoaW5nIGl0IGZvciB1c2UgbGF0ZXJcclxuICAgIHRoaXMuc3dpcGVYQ2FjaGVkID0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rpc2FibGVTd2lwZSgpIHtcclxuICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX3N3aXBlTW91c2VEb3duKTtcclxuICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9zd2lwZU1vdXNlVXApO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX3N3aXBlTW91c2VVcCk7XHJcbiAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9zd2lwZU1vdXNlTW92ZSk7XHJcbiAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fc3dpcGVUb3VjaFN0YXJ0KTtcclxuICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fc3dpcGVUb3VjaEVuZCk7XHJcbiAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9zd2lwZVRvdWNoTW92ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF90b2dnbGVBdXRvcGxheShzZXRTdGF0ZTogQXV0b3BsYXlTd2l0Y2gpIHtcclxuICAgIGNvbnN0IHN0YXJ0QXV0b3BsYXlpbmcgPSAoKSA9PiB7XHJcbiAgICAgIC8vIFN0YXJ0IGF1dG9wbGF5aW5nXHJcbiAgICAgIHRoaXMuX2F1dG9wbGF5VGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2dvUHJldk9yTmV4dChTbGlkZURpcmVjdGlvbi5OZXh0KTtcclxuICAgICAgfSwgdGhpcy5vcHRpb25zLmF1dG9wbGF5U3BlZWQpO1xyXG5cclxuICAgICAgLy8gU2V0IGF1dG9wbGF5IGJ1dHRvbiBzdGF0ZVxyXG4gICAgICB0aGlzLmF1dG9wbGF5QnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1hdXRvcGxheWluZycsICd0cnVlJyk7XHJcblxyXG4gICAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnRcclxuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnYXV0b3BsYXlTdGFydCcsIHtcclxuICAgICAgICBjdXJyZW50U2xpZGU6IHRoaXMuYWN0aXZlU2xpZGUsXHJcbiAgICAgICAgYTExeVNsaWRlcjogdGhpc1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc3RvcEF1dG9wbGF5aW5nID0gKCkgPT4ge1xyXG4gICAgICAvLyBTdG9wIGF1dG9wbGF5aW5nXHJcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX2F1dG9wbGF5VGltZXIpO1xyXG5cclxuICAgICAgLy8gUmVzZXQgYXV0b3BsYXkgdGltZXJcclxuICAgICAgdGhpcy5fYXV0b3BsYXlUaW1lciA9IElzQXV0b3BsYXlpbmcuTm87XHJcblxyXG4gICAgICAvLyBTZXQgYXV0b3BsYXkgYnV0dG9uIHN0YXRlXHJcbiAgICAgIHRoaXMuYXV0b3BsYXlCdG4uc2V0QXR0cmlidXRlKCdkYXRhLWF1dG9wbGF5aW5nJywgJ2ZhbHNlJyk7XHJcblxyXG4gICAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnRcclxuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnYXV0b3BsYXlTdG9wJywge1xyXG4gICAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5hY3RpdmVTbGlkZSxcclxuICAgICAgICBhMTF5U2xpZGVyOiB0aGlzXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoc2V0U3RhdGUgPT09IEF1dG9wbGF5U3dpdGNoLkVuYWJsZSkge1xyXG4gICAgICBzdGFydEF1dG9wbGF5aW5nKCk7XHJcbiAgICB9IGVsc2UgaWYgKHNldFN0YXRlID09PSBBdXRvcGxheVN3aXRjaC5EaXNhYmxlKSB7XHJcbiAgICAgIHN0b3BBdXRvcGxheWluZygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ29QcmV2T3JOZXh0KGRpcmVjdGlvbjogU2xpZGVEaXJlY3Rpb24pIHtcclxuICAgIHRoaXMuX2dldEFjdGl2ZUFuZFZpc2libGUoXHJcbiAgICAgIG51bGwsXHJcbiAgICAgICh2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdLCBhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICBjb25zdCBmaXJzdFNsaWRlID0gdGhpcy5zbGlkZXIuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgbGFzdFNsaWRlID0gdGhpcy5zbGlkZXIubGFzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBmaXJzdFZpc2libGVTbGlkZSA9IHZpc2libGVTbGlkZXNbMF07XHJcbiAgICAgICAgY29uc3QgbGFzdFZpc2libGVTbGlkZSA9IHZpc2libGVTbGlkZXNbdmlzaWJsZVNsaWRlcy5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gU2xpZGVEaXJlY3Rpb24uTmV4dCkge1xyXG4gICAgICAgICAgLy8gV3JhcCB0byB0aGUgZmlyc3Qgc2xpZGUgaWYgd2UncmUgY3VycmVudGx5IG9uIHRoZSBsYXN0XHJcbiAgICAgICAgICBpZiAobGFzdFZpc2libGVTbGlkZSA9PT0gbGFzdFNsaWRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSAmJiB0aGlzLnNjcm9sbFRvU2xpZGUoZmlyc3RTbGlkZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvU2xpZGUoXHJcbiAgICAgICAgICAgICAgYWN0aXZlU2xpZGUgJiYgKGFjdGl2ZVNsaWRlLm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gU2xpZGVEaXJlY3Rpb24uUHJldikge1xyXG4gICAgICAgICAgLy8gV3JhcCB0byB0aGUgbGFzdCBzbGlkZSBpZiB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIGZpcnN0XHJcbiAgICAgICAgICBpZiAoZmlyc3RWaXNpYmxlU2xpZGUgPT09IGZpcnN0U2xpZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlICYmIHRoaXMuc2Nyb2xsVG9TbGlkZShsYXN0U2xpZGUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NsaWRlKFxyXG4gICAgICAgICAgICAgIGFjdGl2ZVNsaWRlICYmIChhY3RpdmVTbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmVzIHNsaWRlciB0byB0YXJnZXQgZWxlbWVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzY3JvbGxUb1NsaWRlKHRhcmdldDogSFRNTEVsZW1lbnQgfCBudW1iZXIpIHtcclxuICAgIGNvbnN0IG9yaWdpbmFsUG9zaXRpb24gPSB0aGlzLnNsaWRlci5zY3JvbGxMZWZ0O1xyXG4gICAgbGV0IHRhcmdldFNsaWRlOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAoaXNJbnRlZ2VyKHRhcmdldCkpIHtcclxuICAgICAgdGFyZ2V0U2xpZGUgPSB0aGlzLnNsaWRlc1t0YXJnZXQgYXMgbnVtYmVyXTtcclxuICAgIH0gZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgdGFyZ2V0U2xpZGUgPSB0YXJnZXQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Njcm9sbFRvU2xpZGUgb25seSBhY2NlcHRzIGFuIEhUTUxFbGVtZW50IG9yIG51bWJlcicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudFxyXG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnYmVmb3JlQ2hhbmdlJywge1xyXG4gICAgICBjdXJyZW50U2xpZGU6IHRoaXMuYWN0aXZlU2xpZGUsXHJcbiAgICAgIG5leHRTbGlkZTogdGFyZ2V0U2xpZGUsXHJcbiAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBzbGlkZXIncyBoZWlnaHQgYmFzZWQgb24gY29udGVudCBvZiBzbGlkZVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSkgdGhpcy5fdXBkYXRlSGVpZ2h0KHRhcmdldFNsaWRlKTtcclxuXHJcbiAgICAvLyBNb3ZlIHNsaWRlciB0byBzcGVjaWZpYyBpdGVtXHJcbiAgICBpZiAodGhpcy5tb2Rlcm5Ccm93c2VyKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLnNjcm9sbCh7XHJcbiAgICAgICAgbGVmdDogdGFyZ2V0U2xpZGUub2Zmc2V0TGVmdCxcclxuICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNsaWRlci5zY3JvbGxMZWZ0ID0gdGFyZ2V0U2xpZGUub2Zmc2V0TGVmdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB0aGUgc2xpZGVyIGRpZG4ndCBtb3ZlIG1ha2Ugc3VyZSB0byB1cGRhdGUgdGhlIHNsaWRlciBzdGlsbFxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLnNsaWRlci5zY3JvbGxMZWZ0ID09PSBvcmlnaW5hbFBvc2l0aW9uICYmXHJcbiAgICAgICAgdGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5FbmFibGVkXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuX3NldENTUyh0YXJnZXRTbGlkZSk7XHJcbiAgICAgIH1cclxuICAgIH0sIDUwKTtcclxuXHJcbiAgICAvLyBUcmlnZ2VyIGRvdCB1cGRhdGVcclxuICAgIHRoaXMuX3VwZGF0ZURvdHModGFyZ2V0U2xpZGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBvcHRpb25zIG9uIHRoZSBzbGlkZXIgaW5zdGFuY2VcclxuICAgKi9cclxuICBwdWJsaWMgdXBkYXRlT3B0aW9ucyhvcHRpb25zOiBPcHRpb25zKSB7XHJcbiAgICAvLyBBc3NpZ24gbmV3IG9wdGlvbnNcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBSZS1ydW4gdGhlIGluaXRpYWwgZW5hYmxlIHNsaWRlciBvcHRpb25cclxuICAgIHRoaXMuX2Rpc2FibGVTbGlkZXIoKTtcclxuICAgIHRoaXMuX2NoZWNrU2hvdWxkRW5hYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBlbGVtZW50IGlzIHBhc3NlZCBzbGlkZXIncyBoZWlnaHQgd2lsbCBtYXRjaFxyXG4gICAqICBpdCBvdGhlcndpc2UgdGhlIGhlaWdodCBvZiB0aGUgc2xpZGVyIGlzIHJlbW92ZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdXBkYXRlSGVpZ2h0KHRhcmdldDogSFRNTEVsZW1lbnQgfCBmYWxzZSkge1xyXG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IHRhcmdldEhlaWdodCA9IGdldFN1YnBpeGVsU3R5bGUodGFyZ2V0LCAnaGVpZ2h0Jyk7XHJcbiAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLmhlaWdodCA9IGAke3RhcmdldEhlaWdodH1weGA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNsaWRlci5zdHlsZS5oZWlnaHQgPSAnJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBNYW51bGx5IHVwZGF0ZSBoZWlnaHQgb2Ygc2xpZGVyIChiYXNlZCBvZmYgYWRhcHRpdmVIZWlnaHQgb3B0aW9uKSAqL1xyXG4gIHB1YmxpYyByZWZyZXNoSGVpZ2h0KCkge1xyXG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KHRoaXMuYWN0aXZlU2xpZGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0QWN0aXZlQW5kVmlzaWJsZShcclxuICAgIGV4cGxpY2l0QWN0aXZlOiBIVE1MRWxlbWVudCB8IG51bGwsXHJcbiAgICBjYWxsYmFjaz86IEFjdGl2ZVZpc2libGVTbGlkZXNcclxuICApIHtcclxuICAgIC8qKlxyXG4gICAgICogUGFyZW50IGVsZW1lbnQgbmVlZHMgdGhlIGNvcnJlY3Qgc3R5bGluZyBmb3JcclxuICAgICAqIGNhbGN1bGF0aW9ucyBzbyBiYWNraW5nIHVwIHRoZSBpbml0aWFsIHN0eWxlc1xyXG4gICAgICovXHJcbiAgICBjb25zdCBub1NsaWRlckNsYXNzID0gIXRoaXMuc2xpZGVyLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLl9zbGlkZXJDbGFzcyk7XHJcbiAgICBjb25zdCBib3JkZXJTdHlsZSA9IHRoaXMuc2xpZGVyLnN0eWxlLmJvcmRlcldpZHRoO1xyXG5cclxuICAgIC8vIEFwcGx5aW5nIGNvcnJlY3Qgc3R5bGVzIGZvciBjYWxjdWxhdGlvbnNcclxuICAgIHRoaXMuc2xpZGVyLnN0eWxlLmJvcmRlcldpZHRoID0gJzBweCc7XHJcbiAgICBpZiAobm9TbGlkZXJDbGFzcykgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCh0aGlzLl9zbGlkZXJDbGFzcyk7XHJcblxyXG4gICAgLy8gQ2FuIHN0YXJ0IHN0b3JpbmcgdmFyaWFibGVzIG5vdyBmb3IgY2FsY3VsYXRpb25zXHJcbiAgICBjb25zdCB2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdID0gW107XHJcbiAgICAvLyBiZXR0ZXIgY3Jvc3MgYnJvd3NlciBzdXBwb3J0IGJ5IGdldHRpbmcgc3VicGl4ZWxzIHRoZW4gcm91bmRpbmdcclxuICAgIGNvbnN0IHNsaWRlcldpZHRoID0gTWF0aC5yb3VuZCh0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCk7XHJcbiAgICAvLyBBZGQgYSAxIHBpeGVsIGJ1ZmZlciBzbyB0aGF0IHN1YnBpeGVscyBhcmUgbW9yZSBjb25zaXN0ZW50IGNyb3NzLWJyb3dzZXJcclxuICAgIGNvbnN0IHNsaWRlclBvc2l0aW9uID1cclxuICAgICAgdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCAtIDEgPCAwID8gMCA6IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgLSAxO1xyXG5cclxuICAgIC8vIE9ubHkgZGV0ZWN0cyBpdGVtcyBpbiB0aGUgdmlzaWJsZSB2aWV3cG9ydCBvZiB0aGUgcGFyZW50IGVsZW1lbnRcclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLnNsaWRlcywgc2xpZGUgPT4ge1xyXG4gICAgICBjb25zdCBzbGlkZU9mZnNldCA9IHNsaWRlLm9mZnNldExlZnQ7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgc2xpZGVPZmZzZXQgPj0gc2xpZGVyUG9zaXRpb24gJiZcclxuICAgICAgICBzbGlkZU9mZnNldCA8IHNsaWRlclBvc2l0aW9uICsgc2xpZGVyV2lkdGhcclxuICAgICAgKSB7XHJcbiAgICAgICAgdmlzaWJsZVNsaWRlcy5wdXNoKHNsaWRlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWRkIGJhY2sgdGhlIG9yaWdpbmFsIHN0eWxlc1xyXG4gICAgdGhpcy5zbGlkZXIuc3R5bGUuYm9yZGVyV2lkdGggPSBib3JkZXJTdHlsZTtcclxuICAgIGlmIChub1NsaWRlckNsYXNzKSB0aGlzLnNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NsaWRlckNsYXNzKTtcclxuXHJcbiAgICAvLyBHbG9iYWxseSBzZXQgdmlzaWJsZSBzbGlkZXNcclxuICAgIHRoaXMudmlzaWJsZVNsaWRlcyA9IHZpc2libGVTbGlkZXM7XHJcblxyXG4gICAgaWYgKGV4cGxpY2l0QWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSBleHBsaWNpdEFjdGl2ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9XHJcbiAgICAgICAgdGhpcy52aXNpYmxlU2xpZGVzW01hdGguZmxvb3IoKHRoaXMudmlzaWJsZVNsaWRlcy5sZW5ndGggLSAxKSAvIDIpXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB2aXNpYmxlU2xpZGVzWzBdID8/IHRoaXMuc2xpZGVzWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHRoaXMudmlzaWJsZVNsaWRlcywgdGhpcy5hY3RpdmVTbGlkZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVQcmV2KGV2ZW50OiBFdmVudCkge1xyXG4gICAgaWYgKGExMXlDbGljayhldmVudCkgPT09IHRydWUpIHtcclxuICAgICAgLy8gR28gdG8gcHJldmlvdXMgc2xpZGVcclxuICAgICAgdGhpcy5fZ29QcmV2T3JOZXh0KFNsaWRlRGlyZWN0aW9uLlByZXYpO1xyXG5cclxuICAgICAgLy8gRGlzYWJsZSBhdXRvcGxheSBpZiBvbmdvaW5nXHJcbiAgICAgIHRoaXMuX3RvZ2dsZUF1dG9wbGF5KEF1dG9wbGF5U3dpdGNoLkRpc2FibGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlTmV4dChldmVudDogRXZlbnQpIHtcclxuICAgIGlmIChhMTF5Q2xpY2soZXZlbnQpID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIEdvIHRvIG5leHQgc2xpZGVcclxuICAgICAgdGhpcy5fZ29QcmV2T3JOZXh0KFNsaWRlRGlyZWN0aW9uLk5leHQpO1xyXG5cclxuICAgICAgLy8gRGlzYWJsZSBhdXRvcGxheSBpZiBvbmdvaW5nXHJcbiAgICAgIHRoaXMuX3RvZ2dsZUF1dG9wbGF5KEF1dG9wbGF5U3dpdGNoLkRpc2FibGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlQXV0b3BsYXkoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICBpZiAoYTExeUNsaWNrKGV2ZW50KSA9PT0gdHJ1ZSkge1xyXG4gICAgICBpZiAodGhpcy5fYXV0b3BsYXlUaW1lciA9PT0gSXNBdXRvcGxheWluZy5Obykge1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUF1dG9wbGF5KEF1dG9wbGF5U3dpdGNoLkVuYWJsZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZUF1dG9wbGF5SG92ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmIChldmVudC50eXBlID09PSAnbW91c2VlbnRlcicpIHtcclxuICAgICAgaWYgKHRoaXMuX2F1dG9wbGF5VGltZXIgIT09IElzQXV0b3BsYXlpbmcuTm8pIHtcclxuICAgICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5EaXNhYmxlKTtcclxuICAgICAgICB0aGlzLl9wYXVzZU9uTW91c2VMZWF2ZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlbGVhdmUnICYmIHRoaXMuX3BhdXNlT25Nb3VzZUxlYXZlKSB7XHJcbiAgICAgIGlmICh0aGlzLl9hdXRvcGxheVRpbWVyID09PSBJc0F1dG9wbGF5aW5nLk5vKSB7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRW5hYmxlKTtcclxuICAgICAgICB0aGlzLl9wYXVzZU9uTW91c2VMZWF2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVBdXRvcGxheUV2ZW50KF9ldmVudDogRXZlbnQpIHtcclxuICAgIHRoaXMuX3BhdXNlT25Nb3VzZUxlYXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5EaXNhYmxlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZVNjcm9sbCgpIHtcclxuICAgIC8vIFRoaXMgaXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24uIFdpbGwgZmlyZSBvbmNlIGRvbmUgc2Nyb2xsaW5nXHJcbiAgICB0aGlzLl9zY3JvbGxGaW5pc2goKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Njcm9sbEZpbmlzaCgpIHtcclxuICAgIC8vIFVwZGF0ZSBDU1NcclxuICAgIHRoaXMuX3NldENTUygpO1xyXG5cclxuICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudFxyXG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnYWZ0ZXJDaGFuZ2UnLCB7XHJcbiAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5hY3RpdmVTbGlkZSxcclxuICAgICAgYTExeVNsaWRlcjogdGhpc1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBkZXRhaWw6IG9iamVjdCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSBjcm9zc0N1c3RvbUV2ZW50KGV2ZW50TmFtZSwgeyBkZXRhaWwgfSk7XHJcblxyXG4gICAgdGhpcy5zbGlkZXIuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOdWtlIHRoZSBzbGlkZXJcclxuICAgKi9cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIC8vIFRPRE86IFJlbW92YWwgb2YgcmVzcG9uc2l2ZSBldmVudCBsaXN0ZW5lcnMgc2hvdWxkIGdvIGhlcmVcclxuXHJcbiAgICAvLyBVbmRvcyBldmVyeXRoaW5nIGZyb20gX2VuYWJsZVNsaWRlcigpXHJcbiAgICB0aGlzLl9kaXNhYmxlU2xpZGVyKCk7XHJcblxyXG4gICAgLy8gVW5kb3MgZXZlcnl0aGluZyBmcm9tIGluaXQoKVxyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkKTtcclxuXHJcbiAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnRcclxuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2Rlc3Ryb3knLCB7XHJcbiAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiZ2xvYmFsIiwiY2xhc3NvZiIsIkluZGV4ZWRPYmplY3QiLCJkb2N1bWVudCIsIkRFU0NSSVBUT1JTIiwiY3JlYXRlRWxlbWVudCIsIklFOF9ET01fREVGSU5FIiwicHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUiLCJkZWZpbmVQcm9wZXJ0eU1vZHVsZSIsInN0b3JlIiwiV2Vha01hcCIsImhhcyIsIk5BVElWRV9XRUFLX01BUCIsIm9iamVjdEhhcyIsIkludGVybmFsU3RhdGVNb2R1bGUiLCJtaW4iLCJyZXF1aXJlJCQwIiwiaGlkZGVuS2V5cyIsImludGVybmFsT2JqZWN0S2V5cyIsImdldE93blByb3BlcnR5TmFtZXNNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc0ZvcmNlZCIsIk5BVElWRV9TWU1CT0wiLCJTeW1ib2wiLCJVU0VfU1lNQk9MX0FTX1VJRCIsInVzZXJBZ2VudCIsIlNQRUNJRVMiLCJWOF9WRVJTSU9OIiwiJCIsImFGdW5jdGlvbiIsImNyZWF0ZU1ldGhvZCIsImJpbmQiLCJmb3JFYWNoIiwiU1RSSUNUX01FVEhPRCIsIlVTRVNfVE9fTEVOR1RIIiwic2V0UHJvdG90eXBlT2YiLCJkZWZpbmVQcm9wZXJ0aWVzIiwicmVxdWlyZSQkMSIsImRlZmluZVByb3BlcnR5IiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJjcmVhdGUiLCJrZXlzIiwidHJpbSIsIkZPUkNFRCIsInBhcnNlSW50IiwiYXNzaWduIiwiRE9NSXRlcmFibGVzIiwiSEFTX1NQRUNJRVNfU1VQUE9SVCIsIm1heCIsIlRPX1NUUklOR19UQUciLCJUT19TVFJJTkdfVEFHX1NVUFBPUlQiLCJ0b1N0cmluZyIsImZsYWdzIiwiaHRtbCIsImVsIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwiYm9keSIsImZpcnN0Q2hpbGQiLCJIVE1MRWxlbWVudCIsIkVycm9yIiwiYTExeUNsaWNrIiwiZXZlbnQiLCJjb2RlIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwidHlwZSIsInByZXZlbnREZWZhdWx0IiwiY3Jvc3NDdXN0b21FdmVudCIsInBhcmFtcyIsImV2dCIsImNyZWF0ZUV2ZW50IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJkZXRhaWwiLCJ1bmRlZmluZWQiLCJpbml0Q3VzdG9tRXZlbnQiLCJpc0ludGVnZXIiLCJ2YWx1ZSIsImlzRmluaXRlIiwiTWF0aCIsImZsb29yIiwiaXNOYU4iLCJOdW1iZXIiLCJpc09iamVjdCIsImNhbkFjY2Vzc0FzQXJyYXkiLCJpdGVtIiwiQXJyYXkiLCJpc0FycmF5IiwicmVzdWx0IiwiT2JqZWN0IiwicHJvdG90eXBlIiwiY2FsbCIsImhhc093blByb3BlcnR5IiwibGVuZ3RoIiwibm9kZVR5cGUiLCJldmVyeUVsZW1lbnQiLCJlbGVtZW50cyIsImNhbGxiYWNrIiwiZWxzIiwic2xpY2UiLCJnZXRTdWJwaXhlbFN0eWxlIiwiZWxlbWVudCIsInN0eWxlIiwic3R5bGVzIiwiSEFTX0NPTVBVVEVEX1NUWUxFIiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFN0eWxlcyIsIkNPTVBVVEVEX1NJWkVfSU5DTFVERVNfUEFERElORyIsInBhcmVudCIsImRvY3VtZW50RWxlbWVudCIsImUiLCJjc3NUZXh0IiwiYXBwZW5kQ2hpbGQiLCJ3aWR0aCIsInJldCIsInJlbW92ZUNoaWxkIiwiZ2V0TnVtYmVyU3R5bGUiLCJlbFN0eWxlIiwiZWxTdHlsZXMiLCJnZXRGbG9hdCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwiYm9yZGVyTGVmdFdpZHRoIiwiYm9yZGVyUmlnaHRXaWR0aCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJCb3R0b21XaWR0aCIsImlzTnVtYmVyIiwibiIsInBhcnNlRmxvYXQiLCJnZXRQcmV2aW91c1NpYmxpbmdzIiwiYW1vdW50Iiwic2libGluZyIsInByZXZpb3VzU2libGluZyIsInB1c2giLCJnZXROZXh0U2libGluZ3MiLCJuZXh0U2libGluZyIsIlNsaWRlRGlyZWN0aW9uIiwiU2xpZGVyU3RhdGUiLCJBdXRvcGxheVN3aXRjaCIsIklzQXV0b3BsYXlpbmciLCJBMTFZU2xpZGVyIiwib3B0aW9ucyIsInNsaWRlciIsInNsaWRlcyIsImNoaWxkcmVuIiwic2xpZGVyQ29udGFpbmVyIiwiX2FjdGl2ZUNsYXNzIiwiX3Zpc2libGVDbGFzcyIsIl9kb3RzQ2xhc3MiLCJfc2xpZGVyQ2xhc3MiLCJfZm9jdXNhYmxlIiwiX2F1dG9wbGF5VGltZXIiLCJObyIsImF1dG9wbGF5QnRuIiwiX3BhdXNlT25Nb3VzZUxlYXZlIiwiX3NraXBCdG5zIiwiZG90cyIsInN3aXBlIiwiYWN0aXZlU2xpZGUiLCJ2aXNpYmxlU2xpZGVzIiwic2xpZGVyRW5hYmxlZCIsIkRpc2FibGVkIiwibW9kZXJuQnJvd3NlciIsInNjcm9sbFRvIiwibW91c2VEb3duIiwidG91Y2hTdGFydCIsInN3aXBlU3RhcnRYIiwic3dpcGVYIiwic3dpcGVYQ2FjaGVkIiwiX2hhc0N1c3RvbUFycm93cyIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImNvbnRhaW5lciIsImFycm93cyIsImFkYXB0aXZlSGVpZ2h0Iiwic2tpcEJ0biIsInNsaWRlc1RvU2hvdyIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5SG92ZXJQYXVzZSIsImNlbnRlck1vZGUiLCJpbmZpbml0ZSIsImRpc2FibGUiLCJyZXNwb25zaXZlIiwiY3VzdG9tUGFnaW5nIiwiX2hhbmRsZVByZXYiLCJfaGFuZGxlTmV4dCIsIl9oYW5kbGVBdXRvcGxheSIsIl9oYW5kbGVBdXRvcGxheUhvdmVyIiwiX2hhbmRsZUF1dG9wbGF5RXZlbnQiLCJfY2hlY2tTaG91bGRFbmFibGVEZWJvdW5jZWQiLCJkZWJvdW5jZSIsIl9jaGVja1Nob3VsZEVuYWJsZSIsIl91cGRhdGVIZWlnaHREZWJvdW5jZWQiLCJfdXBkYXRlSGVpZ2h0IiwiX2dlbmVyYXRlRG90c0RlYm91bmNlZCIsIl9nZW5lcmF0ZURvdHMiLCJfdXBkYXRlU2Nyb2xsUG9zaXRpb24iLCJzY3JvbGxUb1NsaWRlIiwiX2hhbmRsZVNjcm9sbCIsIl9zY3JvbGxGaW5pc2giLCJfc3dpcGVNb3VzZURvd24iLCJfc3dpcGVNb3VzZVVwIiwiX3N3aXBlTW91c2VNb3ZlIiwiX3N3aXBlVG91Y2hTdGFydCIsIl9zd2lwZVRvdWNoRW5kIiwiX3N3aXBlVG91Y2hNb3ZlIiwiX2luaXQiLCJzZXRUaW1lb3V0Iiwic2Nyb2xsTGVmdCIsIl9jaGVja1Jlc3BvbnNpdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiX2Rpc3BhdGNoRXZlbnQiLCJhMTF5U2xpZGVyIiwic2hvdWxkRW5hYmxlIiwiX2dldEFjdGl2ZUFuZFZpc2libGUiLCJfZW5hYmxlU2xpZGVyIiwiRW5hYmxlZCIsIl9kaXNhYmxlU2xpZGVyIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiX2FkZFNraXBCdG4iLCJwYXNzaXZlIiwicmVtb3ZlIiwiX3NldENTUyIsIl9lbmFibGVBdXRvcGxheSIsIl9lbmFibGVTd2lwZSIsImNvbnRhaW5zIiwicGFyZW50Tm9kZSIsIl9yZW1vdmVTa2lwQnRuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl9yZW1vdmVEb3RzIiwiX3JlbW92ZUNTUyIsIl9kaXNhYmxlQXV0b3BsYXkiLCJfZGlzYWJsZVN3aXBlIiwiX2FkZFNsaWRlc1dpZHRoIiwic2xpZGUiLCJfdXBkYXRlRG90cyIsIl91cGRhdGVBMTFZIiwiX3JlbW92ZVNsaWRlc1dpZHRoIiwiX3JlbW92ZUExMVkiLCJpbml0aWFsT3B0aW9ucyIsImJyZWFrcG9pbnRzIiwicmVzcG9uc2l2ZU9wdGlvbnMiLCJlbnRyaWVzIiwic29ydCIsImEiLCJiIiwibXFsIiwibWF0Y2hNZWRpYSIsImkiLCJicmVha3BvaW50IiwiYnJlYWtwb2ludE9wdGlvbnMiLCJtcWxTdHJpbmciLCJjb25jYXQiLCJtYXAiLCJtYXRjaGVzIiwiYWRkTGlzdGVuZXIiLCJ1cGRhdGVPcHRpb25zIiwic2xpZGVXaWR0aCIsImRpc3BsYXkiLCJmbGV4IiwicmVtb3ZlUHJvcGVydHkiLCJmb2N1c2FibGVJdGVtcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZXRBdHRyaWJ1dGUiLCJmb2N1c2FibGVJdGVtIiwiZmlyc3RTbGlkZSIsImZpcnN0RWxlbWVudENoaWxkIiwibGFzdFNsaWRlIiwibGFzdEVsZW1lbnRDaGlsZCIsImZpcnN0VmlzaWJsZVNsaWRlIiwibGFzdFZpc2libGVTbGlkZSIsInJlbW92ZUF0dHJpYnV0ZSIsImJlZm9yZUVsIiwiYWZ0ZXJFbCIsImZvY3VzRW5kIiwiZm9jdXMiLCJkb3RMaSIsImRvdEJ0biIsInRleHRDb250ZW50Iiwic3dpdGNoVG9TbGlkZSIsIl90b2dnbGVBdXRvcGxheSIsIkRpc2FibGUiLCJfZ2V0RG90Q291bnQiLCJ0b3RhbFNsaWRlcyIsImFjdGl2ZUluZGV4IiwiaW5kZXhPZiIsImRvdCIsInF1ZXJ5U2VsZWN0b3IiLCJFbmFibGUiLCJwYWdlWCIsIm9mZnNldExlZnQiLCJpblJhbmdlIiwic2Nyb2xsIiwibGVmdCIsImJlaGF2aW9yIiwic2Nyb2xsU3BlZWQiLCJ4Iiwid2FsayIsInRvdWNoZXMiLCJzZXRTdGF0ZSIsInN0YXJ0QXV0b3BsYXlpbmciLCJzZXRJbnRlcnZhbCIsIl9nb1ByZXZPck5leHQiLCJOZXh0IiwiY3VycmVudFNsaWRlIiwic3RvcEF1dG9wbGF5aW5nIiwiY2xlYXJJbnRlcnZhbCIsImRpcmVjdGlvbiIsIm5leHRFbGVtZW50U2libGluZyIsIlByZXYiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwidGFyZ2V0Iiwib3JpZ2luYWxQb3NpdGlvbiIsInRhcmdldFNsaWRlIiwibmV4dFNsaWRlIiwidGFyZ2V0SGVpZ2h0IiwiaGVpZ2h0IiwiZXhwbGljaXRBY3RpdmUiLCJub1NsaWRlckNsYXNzIiwiYm9yZGVyU3R5bGUiLCJib3JkZXJXaWR0aCIsInNsaWRlcldpZHRoIiwicm91bmQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzbGlkZXJQb3NpdGlvbiIsInNsaWRlT2Zmc2V0IiwiX2V2ZW50IiwiZXZlbnROYW1lIiwiZGlzcGF0Y2hFdmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Q0FBQSxJQUFJLEtBQUssR0FBRyxVQUFVLEVBQUUsRUFBRTtHQUN4QixPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7RUFDcEMsQ0FBQzs7O0NBR0YsWUFBYzs7R0FFWixLQUFLLENBQUMsT0FBTyxVQUFVLElBQUksUUFBUSxJQUFJLFVBQVUsQ0FBQztHQUNsRCxLQUFLLENBQUMsT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQztHQUMxQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQztHQUN0QyxLQUFLLENBQUMsT0FBT0EsY0FBTSxJQUFJLFFBQVEsSUFBSUEsY0FBTSxDQUFDOztHQUUxQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQzs7Q0NaNUIsU0FBYyxHQUFHLFVBQVUsSUFBSSxFQUFFO0dBQy9CLElBQUk7S0FDRixPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDLE9BQU8sS0FBSyxFQUFFO0tBQ2QsT0FBTyxJQUFJLENBQUM7SUFDYjtFQUNGLENBQUM7O0NDSkY7Q0FDQSxlQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWTtHQUNsQyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDakYsQ0FBQyxDQUFDOztDQ0pILElBQUksMEJBQTBCLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO0NBQ3pELElBQUksd0JBQXdCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDOzs7Q0FHL0QsSUFBSSxXQUFXLEdBQUcsd0JB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
