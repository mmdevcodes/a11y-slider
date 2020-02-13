
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

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$5
	};

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var f$6 = wellKnownSymbol;

	var wellKnownSymbolWrapped = {
		f: f$6
	};

	var defineProperty = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var defineProperty$1 = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

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

	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineProperty$2 = objectDefineProperty.f;


	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;

	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$2(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var defineProperty$3 = Object.defineProperty;
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

	    if (ACCESSORS) defineProperty$3(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var $indexOf = arrayIncludes.indexOf;



	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$1 : null;
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
	if ( !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
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
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$1);
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
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
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

	var nativeAssign = Object.assign;
	var defineProperty$4 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$4({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$4(this, 'b', {
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

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
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
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
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

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$2 = function (CONVERT_TO_STRING) {
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
	  codeAt: createMethod$2(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$2(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$2(this);
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

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$2] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	    }
	    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
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
	}; // Run a function on all elements even if it's a collection or single

	var everyElement = function everyElement(elements, callback) {
	  var els = elements instanceof HTMLElement ? [elements] : elements;
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = els[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var el = _step.value;

	      if (el instanceof HTMLElement) {
	        callback && callback(el);
	      }
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
	    this._autoplayTimer = IsAutoplaying.No;
	    this._autoplayBtn = createElement("<button type=\"button\" class=\"a11y-slider-autoplay\">Toggle slider autoplay</button>");
	    this._pauseOnMouseLeave = false;
	    this._skipBtns = [];
	    this.dots = null;
	    this.activeSlide = this.slides[0];
	    this.visibleSlides = [];
	    this.sliderEnabled = SliderState.Disabled;
	    this._hasCustomArrows = options && options.prevArrow || options && options.nextArrow ? true : false;
	    this.options = {
	      container: true,
	      arrows: true,
	      prevArrow: options && options.prevArrow || createElement('<button type="button" class="a11y-slider-prev">Previous slide</button>'),
	      nextArrow: options && options.nextArrow || createElement('<button type="button" class="a11y-slider-next">Next slide</button>'),
	      dots: true,
	      adaptiveHeight: false,
	      skipBtn: true,
	      slidesToShow: false,
	      autoplay: false,
	      autoplaySpeed: 4000,
	      autoplayHoverPause: true,
	      centerMode: false
	    }; // Set user-inputted options if available

	    Object.assign(this.options, options); // Binding

	    this._handlePrev = this._handlePrev.bind(this);
	    this._handleNext = this._handleNext.bind(this);
	    this._handleAutoplay = this._handleAutoplay.bind(this);
	    this._handleAutoplayHover = this._handleAutoplayHover.bind(this);
	    this._checkShouldEnableDebounced = debounce(this._checkShouldEnable.bind(this), 250);
	    this._updateHeightDebounced = debounce(this._updateHeight.bind(this), 250);
	    this._generateDotsDebounced = debounce(this._generateDots.bind(this), 250);
	    this._updateScrollPosition = debounce(function () {
	      return _this.scrollToSlide(_this.activeSlide);
	    }, 250);
	    this._handleScroll = debounce(this._handleScroll.bind(this), 175); // May fire twice depending on browser
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

	      this._getActiveAndVisible(null, function (visibleSlides) {
	        if (visibleSlides.length === _this2.slides.length) shouldEnable = false;
	      }); // If user explicitly set items to be shown and it's the same number as available


	      if (this.slides.length === this.options.slidesToShow) shouldEnable = false; // Enable/disable slider based on above requirements

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
	      var _this3 = this;

	      // Set slider to enabled
	      this.sliderEnabled = SliderState.Enabled; // Firefox moves the slider depending on page load so resetting to 0

	      setTimeout(function () {
	        return _this3.slider.scrollLeft = 0;
	      }, 1); // Add slider container to DOM and move slider into it if enabled

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
	        prevArrow.addEventListener('click', _this3._handlePrev, {
	          passive: true
	        });
	        prevArrow.addEventListener('keypress', _this3._handlePrev, {
	          passive: true
	        });

	        if (_this3._hasCustomArrows) {
	          // User generated buttons get special hide class removed
	          prevArrow.classList.remove('a11y-slider-hide');
	        }
	      });
	      everyElement(this.options.nextArrow, function (nextArrow) {
	        // Add event listeners for prev/next buttons
	        nextArrow.addEventListener('click', _this3._handleNext, {
	          passive: true
	        });
	        nextArrow.addEventListener('keypress', _this3._handleNext, {
	          passive: true
	        });

	        if (_this3._hasCustomArrows) {
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

	      window.addEventListener('resize', this._updateScrollPosition);
	    } // Disable all functionality for the slider. Should mirror _enableSlider()

	  }, {
	    key: "_disableSlider",
	    value: function _disableSlider() {
	      var _this4 = this;

	      this.sliderEnabled = SliderState.Disabled; // Remove slider from a11y-slider's container and then remove container from DOM

	      if (document.body.contains(this.sliderContainer)) {
	        this.sliderContainer.insertAdjacentElement('beforebegin', this.slider);
	        this.sliderContainer.parentNode && this.sliderContainer.parentNode.removeChild(this.sliderContainer);
	      } // Remove skip button


	      this._removeSkipBtn(); // Possible for there to be multiple so need to loop through them all


	      everyElement(this.options.prevArrow, function (prevArrow) {
	        // Remove event listeners for prev/next buttons
	        prevArrow.removeEventListener('click', _this4._handlePrev);
	        prevArrow.removeEventListener('keypress', _this4._handlePrev);

	        if (!_this4._hasCustomArrows) {
	          // Only remove generated buttons, not user-defined ones
	          prevArrow.parentNode && prevArrow.parentNode.removeChild(prevArrow);
	        } else {
	          // User generated buttons get special hide class removed
	          prevArrow.classList.add('a11y-slider-hide');
	        }
	      });
	      everyElement(this.options.nextArrow, function (nextArrow) {
	        // Remove event listeners for prev/next buttons
	        nextArrow.removeEventListener('click', _this4._handleNext);
	        nextArrow.removeEventListener('keypress', _this4._handleNext);

	        if (!_this4._hasCustomArrows) {
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


	      if (this.options.autoplay) this._disableAutoplay(); // Remove scroll position update check

	      window.removeEventListener('resize', this._updateScrollPosition);
	    } // Add all CSS needed for the slider. Should mirror _removeCSS()

	  }, {
	    key: "_setCSS",
	    value: function _setCSS(activeSlide) {
	      // Update items
	      this._updateItemsCSS(); // Update slider instance to get the correct elements


	      this._getActiveAndVisible(activeSlide || null); // Add main slider class if it doesn't have it already


	      this.slider.classList.add(this._sliderClass); // Reset the more dynamic CSS first if it exists

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.slides[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var slide = _step.value;
	          slide.classList.remove(this._activeClass);
	          slide.classList.remove(this._visibleClass);
	        } // Add in active classes

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

	      this.activeSlide.classList.add(this._activeClass); // Add in visible classes

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.visibleSlides[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var _slide = _step2.value;

	          _slide.classList.add(this._visibleClass);
	        } // Trigger dot update

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

	      this._updateDots(this.activeSlide); // Update all a11y functionality


	      this._addFocusable();
	    } // Remove all CSS needed for the slider. Should mirror _setCSS()

	  }, {
	    key: "_removeCSS",
	    value: function _removeCSS() {
	      // Remove item CSS if it was set
	      this._removeItemsCSS(); // Remove class to slider


	      this.slider.classList.remove(this._sliderClass); // Reset all the dynamic classes

	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this.slides[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var slide = _step3.value;
	          slide.classList.remove(this._activeClass);
	          slide.classList.remove(this._visibleClass);
	        } // Remove all a11y functionality

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

	      this._removeFocusable();
	    }
	  }, {
	    key: "_updateItemsCSS",
	    value: function _updateItemsCSS() {
	      if (isInteger(this.options.slidesToShow)) {
	        // Percentage width of each slide
	        var slideWidth = 100 / this.options.slidesToShow; // Set styles for slider

	        this.slider.style.display = 'flex'; // Set styles for items

	        var _iteratorNormalCompletion4 = true;
	        var _didIteratorError4 = false;
	        var _iteratorError4 = undefined;

	        try {
	          for (var _iterator4 = this.slides[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	            var slide = _step4.value;
	            slide.style.width = "".concat(slideWidth, "%");
	          }
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
	      } else {
	        // Reset everything if number of items not explicitly set
	        this.slider.style.removeProperty('display');
	        var _iteratorNormalCompletion5 = true;
	        var _didIteratorError5 = false;
	        var _iteratorError5 = undefined;

	        try {
	          for (var _iterator5 = this.slides[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	            var _slide2 = _step5.value;

	            _slide2.style.removeProperty('width');
	          }
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
	      }
	    } // Reset item styling even if explicitly set in the options

	  }, {
	    key: "_removeItemsCSS",
	    value: function _removeItemsCSS() {
	      this.slider.style.removeProperty('display');
	      var _iteratorNormalCompletion6 = true;
	      var _didIteratorError6 = false;
	      var _iteratorError6 = undefined;

	      try {
	        for (var _iterator6 = this.slides[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	          var slide = _step6.value;
	          slide.style.removeProperty('width');
	        }
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
	    } // Makes only the visible items focusable and readable by screenreaders. Should mirror _removeA11Y()

	  }, {
	    key: "_addFocusable",
	    value: function _addFocusable() {
	      // Reset all a11y functionality to default beforehand
	      this._removeFocusable();

	      var _iteratorNormalCompletion7 = true;
	      var _didIteratorError7 = false;
	      var _iteratorError7 = undefined;

	      try {
	        for (var _iterator7 = this.slides[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	          var slide = _step7.value;
	          var focusableItems = slide.querySelectorAll(this._focusable); // If slide is not visible make the slide wrapper not focusable

	          if (!slide.classList.contains(this._visibleClass)) {
	            slide.setAttribute('tabindex', '-1');
	            slide.setAttribute('aria-hidden', 'true');
	          }

	          var _iteratorNormalCompletion8 = true;
	          var _didIteratorError8 = false;
	          var _iteratorError8 = undefined;

	          try {
	            for (var _iterator8 = focusableItems[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	              var focusableItem = _step8.value;

	              if (!slide.classList.contains(this._visibleClass)) {
	                focusableItem.setAttribute('tabindex', '-1');
	              }
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
	        }
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
	    } // Reset a11y attributes for slide wrapper. Should mirror _addA11Y()

	  }, {
	    key: "_removeFocusable",
	    value: function _removeFocusable() {
	      var _iteratorNormalCompletion9 = true;
	      var _didIteratorError9 = false;
	      var _iteratorError9 = undefined;

	      try {
	        for (var _iterator9 = this.slides[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	          var slide = _step9.value;
	          var focusableItems = slide.querySelectorAll(this._focusable); // Remove a11y for each slide wrapper

	          slide.removeAttribute('tabindex');
	          slide.removeAttribute('aria-hidden'); // Reset a11y attributes for slide inner elements

	          var _iteratorNormalCompletion10 = true;
	          var _didIteratorError10 = false;
	          var _iteratorError10 = undefined;

	          try {
	            for (var _iterator10 = focusableItems[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	              var focusableItem = _step10.value;
	              focusableItem.removeAttribute('tabindex');
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
	      everyElement(this._skipBtns, function (skipBtn) {
	        skipBtn.parentNode && skipBtn.parentNode.removeChild(skipBtn);
	      });
	    }
	  }, {
	    key: "_generateDots",
	    value: function _generateDots() {
	      var _this5 = this;

	      // Remove dots if they already exist
	      this._removeDots(); // Stop if slider is disabled


	      if (this.sliderEnabled === SliderState.Disabled) return; // Create <ul> wrapper for dots

	      this.dots = createElement("<ul class=\"".concat(this._dotsClass, "\"></ul>"));

	      var _loop = function _loop(i) {
	        var dotLi = createElement('<li></li>');
	        var dotBtn = createElement('<button type="button"></button>'); // Add text

	        dotBtn.textContent = "Move slider to item #".concat(i + 1); // Event handlers to switch to slide

	        var switchToSlide = function switchToSlide(event) {
	          if (a11yClick(event) === true) {
	            // Go to slide
	            _this5.scrollToSlide(_this5.slides[i]); // Disable autoplay if enabled


	            _this5._toggleAutoplay(AutoplaySwitch.Disable);
	          }
	        }; // Add event listeners


	        dotBtn.addEventListener('click', switchToSlide, {
	          passive: true
	        });
	        dotBtn.addEventListener('keypress', switchToSlide, {
	          passive: true
	        }); // Append to UL

	        dotLi.insertAdjacentElement('beforeend', dotBtn);

	        _this5.dots.insertAdjacentElement('beforeend', dotLi);
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
	      var slidesToShow = this.options.slidesToShow || this.visibleSlides.length;
	      var dots = totalSlides - slidesToShow + 1;
	      return dots;
	    }
	  }, {
	    key: "_removeDots",
	    value: function _removeDots() {
	      window.removeEventListener('resize', this._generateDotsDebounced);

	      if (this.dots instanceof HTMLElement) {
	        this.dots.parentNode && this.dots.parentNode.removeChild(this.dots);
	      }
	    }
	  }, {
	    key: "_updateDots",
	    value: function _updateDots(activeSlide) {
	      if (this.dots instanceof HTMLElement) {
	        var activeIndex = Array.prototype.indexOf.call(activeSlide.parentNode && activeSlide.parentNode.children, activeSlide); // Set dot to last item if active index is higher than amount

	        if (activeIndex > this.dots.children.length) {
	          activeIndex = this.dots.children.length - 1;
	        } // Reset children active class if exist


	        var _iteratorNormalCompletion11 = true;
	        var _didIteratorError11 = false;
	        var _iteratorError11 = undefined;

	        try {
	          for (var _iterator11 = this.dots.children[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	            var dot = _step11.value;
	            dot.querySelector('button').classList.remove('active');
	          } // Add class to active dot

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

	        this.dots.children[activeIndex].querySelector('button').classList.add('active');
	      }
	    }
	  }, {
	    key: "_enableAutoplay",
	    value: function _enableAutoplay() {
	      // Add event listeners for autoplay
	      this._autoplayBtn.addEventListener('click', this._handleAutoplay, {
	        passive: true
	      });

	      this._autoplayBtn.addEventListener('keypress', this._handleAutoplay, {
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


	      this.slider.insertAdjacentElement('beforebegin', this._autoplayBtn); // Start autoplaying

	      this._toggleAutoplay(AutoplaySwitch.Enable);
	    }
	  }, {
	    key: "_disableAutoplay",
	    value: function _disableAutoplay() {
	      // Stop autoplaying
	      this._toggleAutoplay(AutoplaySwitch.Disable); // Remove event listeners for autoplay


	      this._autoplayBtn.removeEventListener('click', this._handleAutoplay);

	      this._autoplayBtn.removeEventListener('keypress', this._handleAutoplay);

	      this.slider.removeEventListener('mouseenter', this._handleAutoplayHover);
	      this.slider.removeEventListener('mouseleave', this._handleAutoplayHover); // Remove toggle button from DOM

	      this._autoplayBtn.parentNode && this._autoplayBtn.parentNode.removeChild(this._autoplayBtn);
	    }
	  }, {
	    key: "_toggleAutoplay",
	    value: function _toggleAutoplay(setState) {
	      var _this6 = this;

	      var startAutoplaying = function startAutoplaying() {
	        // Start autoplaying
	        _this6._autoplayTimer = window.setInterval(function () {
	          _this6._goPrevOrNext(SlideDirection.Next);
	        }, _this6.options.autoplaySpeed); // Set autoplay button state

	        _this6._autoplayBtn.setAttribute('data-autoplaying', 'true');
	      };

	      var stopAutoplaying = function stopAutoplaying() {
	        // Stop autoplaying
	        window.clearInterval(_this6._autoplayTimer); // Reset autoplay timer

	        _this6._autoplayTimer = IsAutoplaying.No; // Set autoplay button state

	        _this6._autoplayBtn.setAttribute('data-autoplaying', 'false');
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
	      var _this7 = this;

	      this._getActiveAndVisible(null, function (visibleSlides, activeSlide) {
	        var firstSlide = _this7.slider.firstElementChild;
	        var lastSlide = _this7.slider.lastElementChild;
	        var firstVisibleSlide = visibleSlides[0];
	        var lastVisibleSlide = visibleSlides[visibleSlides.length - 1];

	        if (direction === SlideDirection.Next) {
	          // Wrap to the first slide if we're currently on the last
	          if (lastVisibleSlide === lastSlide) {
	            _this7.scrollToSlide(firstSlide);
	          } else {
	            _this7.scrollToSlide(activeSlide && activeSlide.nextElementSibling);
	          }
	        } else if (direction === SlideDirection.Prev) {
	          // Wrap to the last slide if we're currently on the first
	          if (firstVisibleSlide === firstSlide) {
	            _this7.scrollToSlide(lastSlide);
	          } else {
	            _this7.scrollToSlide(activeSlide && activeSlide.previousElementSibling);
	          }
	        }
	      });
	    }
	    /**
	     * Moves slider to target element
	     */

	  }, {
	    key: "scrollToSlide",
	    value: function scrollToSlide(targetSlide) {
	      var _this8 = this;

	      var modernBrowser = !!HTMLElement.prototype.scrollTo;
	      var originalPosition = this.slider.scrollLeft; // Dispatch custom event

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
	      } // If the slider didn't move make sure to update the slider still


	      setTimeout(function () {
	        if (_this8.slider.scrollLeft === originalPosition && _this8.sliderEnabled === SliderState.Enabled) {
	          _this8._setCSS(targetSlide);
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
	  }, {
	    key: "refreshHeight",
	    value: function refreshHeight() {
	      this._updateHeight(this.activeSlide);
	    }
	  }, {
	    key: "_getActiveAndVisible",
	    value: function _getActiveAndVisible(explicitActive, callback) {
	      var visibleSlides = []; // better cross browser support by getting subpixels then rounding

	      var sliderWidth = Math.round(this.slider.getBoundingClientRect().width); // Add a 1 pixel buffer so that subpixels are more consistent cross-browser

	      var sliderPosition = this.slider.scrollLeft - 1 < 0 ? 1 : this.slider.scrollLeft - 1;
	      console.log(this.slider, sliderWidth, sliderPosition); // Only detects items in the visible viewport of the parent element

	      var _iteratorNormalCompletion12 = true;
	      var _didIteratorError12 = false;
	      var _iteratorError12 = undefined;

	      try {
	        for (var _iterator12 = this.slides[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	          var slide = _step12.value;
	          var slideOffset = slide.offsetLeft;
	          console.log(slideOffset);

	          if (slideOffset >= sliderPosition && slideOffset < sliderPosition + sliderWidth) {
	            visibleSlides.push(slide);
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

	      this.visibleSlides = visibleSlides;
	      console.log('visible', this.visibleSlides);

	      if (explicitActive) {
	        this.activeSlide = explicitActive;
	      } else if (this.options.centerMode === true) {
	        this.activeSlide = this.visibleSlides[Math.floor((this.visibleSlides.length - 1) / 2)];
	      } else {
	        this.activeSlide = visibleSlides[0];
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
	      if (event.type === "mouseenter") {
	        if (this._autoplayTimer !== IsAutoplaying.No) {
	          this._toggleAutoplay(AutoplaySwitch.Disable);

	          this._pauseOnMouseLeave = true;
	        }
	      } else if (event.type === "mouseleave" && this._pauseOnMouseLeave) {
	        if (this._autoplayTimer === IsAutoplaying.No) {
	          this._toggleAutoplay(AutoplaySwitch.Enable);

	          this._pauseOnMouseLeave = false;
	        }
	      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYTExeS1zbGlkZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1wcmltaXRpdmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1nbG9iYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdWlkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVkZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcGF0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtYXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1mdW5jdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN5bWJvbC5kZXNjcmlwdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLml0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pbmRleC1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1hc3NpZ24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5hc3NpZ24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXRvLXN0cmluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnRvLXN0cmluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy90cy1kZWJvdW5jZS9kaXN0L3NyYy9pbmRleC5qcyIsIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgY2hlY2sodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICFuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciBzcGxpdCA9ICcnLnNwbGl0O1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICByZXR1cm4gIU9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09ICdTdHJpbmcnID8gc3BsaXQuY2FsbChpdCwgJycpIDogT2JqZWN0KGl0KTtcbn0gOiBPYmplY3Q7XG4iLCIvLyBgUmVxdWlyZU9iamVjdENvZXJjaWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcblxudmFyIG5hdGl2ZURlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGdsb2JhbCwga2V5LCB2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gRnVuY3Rpb24udG9TdHJpbmc7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAodHlwZW9mIHN0b3JlLmluc3BlY3RTb3VyY2UgIT0gJ2Z1bmN0aW9uJykge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChpbnNwZWN0U291cmNlKFdlYWtNYXApKTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjYuNCcsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAyMCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBvYmplY3RIYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQKSB7XG4gIHZhciBzdG9yZSA9IG5ldyBXZWFrTWFwKCk7XG4gIHZhciB3bWdldCA9IHN0b3JlLmdldDtcbiAgdmFyIHdtaGFzID0gc3RvcmUuaGFzO1xuICB2YXIgd21zZXQgPSBzdG9yZS5zZXQ7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICB3bXNldC5jYWxsKHN0b3JlLCBpdCwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtZ2V0LmNhbGwoc3RvcmUsIGl0KSB8fCB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtaGFzLmNhbGwoc3RvcmUsIGl0KTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBTVEFURSA9IHNoYXJlZEtleSgnc3RhdGUnKTtcbiAgaGlkZGVuS2V5c1tTVEFURV0gPSB0cnVlO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHVuc2FmZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMudW5zYWZlIDogZmFsc2U7XG4gIHZhciBzaW1wbGUgPSBvcHRpb25zID8gISFvcHRpb25zLmVudW1lcmFibGUgOiBmYWxzZTtcbiAgdmFyIG5vVGFyZ2V0R2V0ID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5ub1RhcmdldEdldCA6IGZhbHNlO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiAhaGFzKHZhbHVlLCAnbmFtZScpKSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodmFsdWUsICduYW1lJywga2V5KTtcbiAgICBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSkuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8ga2V5IDogJycpO1xuICB9XG4gIGlmIChPID09PSBnbG9iYWwpIHtcbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIHNldEdsb2JhbChrZXksIHZhbHVlKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoIXVuc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gIH0gZWxzZSBpZiAoIW5vVGFyZ2V0R2V0ICYmIE9ba2V5XSkge1xuICAgIHNpbXBsZSA9IHRydWU7XG4gIH1cbiAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gIGVsc2UgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KE8sIGtleSwgdmFsdWUpO1xuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnNvdXJjZSB8fCBpbnNwZWN0U291cmNlKHRoaXMpO1xufSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PSAnZnVuY3Rpb24nID8gdmFyaWFibGUgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24ocGF0aFtuYW1lc3BhY2VdKSB8fCBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pXG4gICAgOiBwYXRoW25hbWVzcGFjZV0gJiYgcGF0aFtuYW1lc3BhY2VdW21ldGhvZF0gfHwgZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCJ2YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIGBUb0ludGVnZXJgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9pbnRlZ2VyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNOYU4oYXJndW1lbnQgPSArYXJndW1lbnQpID8gMCA6IChhcmd1bWVudCA+IDAgPyBmbG9vciA6IGNlaWwpKGFyZ3VtZW50KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyKGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdvd25LZXlzJykgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogdHlwZW9mIGRldGVjdGlvbiA9PSAnZnVuY3Rpb24nID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG5cbi8qXG4gIG9wdGlvbnMudGFyZ2V0ICAgICAgLSBuYW1lIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIG9wdGlvbnMuZ2xvYmFsICAgICAgLSB0YXJnZXQgaXMgdGhlIGdsb2JhbCBvYmplY3RcbiAgb3B0aW9ucy5zdGF0ICAgICAgICAtIGV4cG9ydCBhcyBzdGF0aWMgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5wcm90byAgICAgICAtIGV4cG9ydCBhcyBwcm90b3R5cGUgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5yZWFsICAgICAgICAtIHJlYWwgcHJvdG90eXBlIG1ldGhvZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMuZm9yY2VkICAgICAgLSBleHBvcnQgZXZlbiBpZiB0aGUgbmF0aXZlIGZlYXR1cmUgaXMgYXZhaWxhYmxlXG4gIG9wdGlvbnMuYmluZCAgICAgICAgLSBiaW5kIG1ldGhvZHMgdG8gdGhlIHRhcmdldCwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLndyYXAgICAgICAgIC0gd3JhcCBjb25zdHJ1Y3RvcnMgdG8gcHJldmVudGluZyBnbG9iYWwgcG9sbHV0aW9uLCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMudW5zYWZlICAgICAgLSB1c2UgdGhlIHNpbXBsZSBhc3NpZ25tZW50IG9mIHByb3BlcnR5IGluc3RlYWQgb2YgZGVsZXRlICsgZGVmaW5lUHJvcGVydHlcbiAgb3B0aW9ucy5zaGFtICAgICAgICAtIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgb3B0aW9ucy5lbnVtZXJhYmxlICAtIGV4cG9ydCBhcyBlbnVtZXJhYmxlIHByb3BlcnR5XG4gIG9wdGlvbnMubm9UYXJnZXRHZXQgLSBwcmV2ZW50IGNhbGxpbmcgYSBnZXR0ZXIgb24gdGFyZ2V0XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IHNldEdsb2JhbChUQVJHRVQsIHt9KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQgPSAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcbiAgfVxuICBpZiAodGFyZ2V0KSBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBzb3VyY2VQcm9wZXJ0eSA9IHNvdXJjZVtrZXldO1xuICAgIGlmIChvcHRpb25zLm5vVGFyZ2V0R2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgICAgIHRhcmdldFByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbmVkIGluIHRhcmdldFxuICAgIGlmICghRk9SQ0VEICYmIHRhcmdldFByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlUHJvcGVydHkgPT09IHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSkgY29udGludWU7XG4gICAgICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSk7XG4gICAgfVxuICAgIC8vIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgICBpZiAob3B0aW9ucy5zaGFtIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHNvdXJjZVByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNvdXJjZVByb3BlcnR5LCBvcHRpb25zKTtcbiAgfVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgcmV0dXJuICFTdHJpbmcoU3ltYm9sKCkpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgJiYgIVN5bWJvbC5zaGFtXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxuLy8gYElzQXJyYXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNhcnJheVxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjbGFzc29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmtleXNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIFByb3BlcnRpZXNba2V5XSk7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGRlZmluZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBkb2N1bWVudENyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xuXG52YXIgR1QgPSAnPic7XG52YXIgTFQgPSAnPCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgU0NSSVBUID0gJ3NjcmlwdCc7XG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG5cbnZhciBFbXB0eUNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuXG52YXIgc2NyaXB0VGFnID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgcmV0dXJuIExUICsgU0NSSVBUICsgR1QgKyBjb250ZW50ICsgTFQgKyAnLycgKyBTQ1JJUFQgKyBHVDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBBY3RpdmVYIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWCA9IGZ1bmN0aW9uIChhY3RpdmVYRG9jdW1lbnQpIHtcbiAgYWN0aXZlWERvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnJykpO1xuICBhY3RpdmVYRG9jdW1lbnQuY2xvc2UoKTtcbiAgdmFyIHRlbXAgPSBhY3RpdmVYRG9jdW1lbnQucGFyZW50V2luZG93Lk9iamVjdDtcbiAgYWN0aXZlWERvY3VtZW50ID0gbnVsbDsgLy8gYXZvaWQgbWVtb3J5IGxlYWtcbiAgcmV0dXJuIHRlbXA7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgdmFyIEpTID0gJ2phdmEnICsgU0NSSVBUICsgJzonO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBodG1sLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy80NzVcbiAgaWZyYW1lLnNyYyA9IFN0cmluZyhKUyk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCdkb2N1bWVudC5GPU9iamVjdCcpKTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgcmV0dXJuIGlmcmFtZURvY3VtZW50LkY7XG59O1xuXG4vLyBDaGVjayBmb3IgZG9jdW1lbnQuZG9tYWluIGFuZCBhY3RpdmUgeCBzdXBwb3J0XG4vLyBObyBuZWVkIHRvIHVzZSBhY3RpdmUgeCBhcHByb2FjaCB3aGVuIGRvY3VtZW50LmRvbWFpbiBpcyBub3Qgc2V0XG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltL2lzc3Vlcy8xNTBcbi8vIHZhcmlhdGlvbiBvZiBodHRwczovL2dpdGh1Yi5jb20va2l0Y2FtYnJpZGdlL2VzNS1zaGltL2NvbW1pdC80ZjczOGFjMDY2MzQ2XG4vLyBhdm9pZCBJRSBHQyBidWdcbnZhciBhY3RpdmVYRG9jdW1lbnQ7XG52YXIgTnVsbFByb3RvT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8qIGdsb2JhbCBBY3RpdmVYT2JqZWN0ICovXG4gICAgYWN0aXZlWERvY3VtZW50ID0gZG9jdW1lbnQuZG9tYWluICYmIG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBpZ25vcmUgKi8gfVxuICBOdWxsUHJvdG9PYmplY3QgPSBhY3RpdmVYRG9jdW1lbnQgPyBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYKGFjdGl2ZVhEb2N1bWVudCkgOiBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUoKTtcbiAgdmFyIGxlbmd0aCA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSBkZWxldGUgTnVsbFByb3RvT2JqZWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbbGVuZ3RoXV07XG4gIHJldHVybiBOdWxsUHJvdG9PYmplY3QoKTtcbn07XG5cbmhpZGRlbktleXNbSUVfUFJPVE9dID0gdHJ1ZTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5Q29uc3RydWN0b3IoKTtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IE51bGxQcm90b09iamVjdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZGVmaW5lUHJvcGVydGllcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcblxudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyhpdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJ1xuICAgID8gZ2V0V2luZG93TmFtZXMoaXQpXG4gICAgOiBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKHRvSW5kZXhlZE9iamVjdChpdCkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXMoV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSkge1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhcyhTeW1ib2wsIG5hbWUpKSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgZWxzZSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woJ1N5bWJvbC4nICsgbmFtZSk7XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbmV4cG9ydHMuZiA9IHdlbGxLbm93blN5bWJvbDtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE5BTUUpIHtcbiAgdmFyIFN5bWJvbCA9IHBhdGguU3ltYm9sIHx8IChwYXRoLlN5bWJvbCA9IHt9KTtcbiAgaWYgKCFoYXMoU3ltYm9sLCBOQU1FKSkgZGVmaW5lUHJvcGVydHkoU3ltYm9sLCBOQU1FLCB7XG4gICAgdmFsdWU6IHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUuZihOQU1FKVxuICB9KTtcbn07XG4iLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRBRywgU1RBVElDKSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gU1RBVElDID8gaXQgOiBpdC5wcm90b3R5cGUsIFRPX1NUUklOR19UQUcpKSB7XG4gICAgZGVmaW5lUHJvcGVydHkoaXQsIFRPX1NUUklOR19UQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogVEFHIH0pO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQpO1xuICAgIH07XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheXNwZWNpZXNjcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsQXJyYXksIGxlbmd0aCkge1xuICB2YXIgQztcbiAgaWYgKGlzQXJyYXkob3JpZ2luYWxBcnJheSkpIHtcbiAgICBDID0gb3JpZ2luYWxBcnJheS5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmICh0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpIEMgPSB1bmRlZmluZWQ7XG4gICAgZWxzZSBpZiAoaXNPYmplY3QoQykpIHtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYgKEMgPT09IG51bGwpIEMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBuZXcgKEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQykobGVuZ3RoID09PSAwID8gMCA6IGxlbmd0aCk7XG59O1xuIiwidmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xuXG52YXIgcHVzaCA9IFtdLnB1c2g7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBmb3JFYWNoLCBtYXAsIGZpbHRlciwgc29tZSwgZXZlcnksIGZpbmQsIGZpbmRJbmRleCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgdmFyIElTX01BUCA9IFRZUEUgPT0gMTtcbiAgdmFyIElTX0ZJTFRFUiA9IFRZUEUgPT0gMjtcbiAgdmFyIElTX1NPTUUgPSBUWVBFID09IDM7XG4gIHZhciBJU19FVkVSWSA9IFRZUEUgPT0gNDtcbiAgdmFyIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDY7XG4gIHZhciBOT19IT0xFUyA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYO1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0LCBzcGVjaWZpY0NyZWF0ZSkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSW5kZXhlZE9iamVjdChPKTtcbiAgICB2YXIgYm91bmRGdW5jdGlvbiA9IGJpbmQoY2FsbGJhY2tmbiwgdGhhdCwgMyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBjcmVhdGUgPSBzcGVjaWZpY0NyZWF0ZSB8fCBhcnJheVNwZWNpZXNDcmVhdGU7XG4gICAgdmFyIHRhcmdldCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHZhbHVlLCByZXN1bHQ7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKSB7XG4gICAgICB2YWx1ZSA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzdWx0ID0gYm91bmRGdW5jdGlvbih2YWx1ZSwgaW5kZXgsIE8pO1xuICAgICAgaWYgKFRZUEUpIHtcbiAgICAgICAgaWYgKElTX01BUCkgdGFyZ2V0W2luZGV4XSA9IHJlc3VsdDsgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdCkgc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWx1ZTsgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHB1c2guY2FsbCh0YXJnZXQsIHZhbHVlKTsgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZiAoSVNfRVZFUlkpIHJldHVybiBmYWxzZTsgIC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiB0YXJnZXQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbiAgZm9yRWFjaDogY3JlYXRlTWV0aG9kKDApLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbiAgbWFwOiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbHRlclxuICBmaWx0ZXI6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvbWVcbiAgc29tZTogY3JlYXRlTWV0aG9kKDMpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmV2ZXJ5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmV2ZXJ5XG4gIGV2ZXJ5OiBjcmVhdGVNZXRob2QoNCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4gIGZpbmQ6IGNyZWF0ZU1ldGhvZCg1KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZEluZGV4XG4gIGZpbmRJbmRleDogY3JlYXRlTWV0aG9kKDYpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBuYXRpdmVPYmplY3RDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLWV4dGVybmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkJyk7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG5cbnZhciBISURERU4gPSBzaGFyZWRLZXkoJ2hpZGRlbicpO1xudmFyIFNZTUJPTCA9ICdTeW1ib2wnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNZTUJPTCk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJHN0cmluZ2lmeSA9IGdldEJ1aWx0SW4oJ0pTT04nLCAnc3RyaW5naWZ5Jyk7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwuZjtcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmY7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvdHlwZVN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzdHJpbmctdG8tc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXRvLXN0cmluZy1yZWdpc3RyeScpO1xudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgVVNFX1NFVFRFUiA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2NyaXB0b3IgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RDcmVhdGUobmF0aXZlRGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24gKE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgdmFyIE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0UHJvdG90eXBlLCBQKTtcbiAgaWYgKE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IpIGRlbGV0ZSBPYmplY3RQcm90b3R5cGVbUF07XG4gIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICBpZiAoT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvciAmJiBPICE9PSBPYmplY3RQcm90b3R5cGUpIHtcbiAgICBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPYmplY3RQcm90b3R5cGUsIFAsIE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IpO1xuICB9XG59IDogbmF0aXZlRGVmaW5lUHJvcGVydHk7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHRhZywgZGVzY3JpcHRpb24pIHtcbiAgdmFyIHN5bWJvbCA9IEFsbFN5bWJvbHNbdGFnXSA9IG5hdGl2ZU9iamVjdENyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzZXRJbnRlcm5hbFN0YXRlKHN5bWJvbCwge1xuICAgIHR5cGU6IFNZTUJPTCxcbiAgICB0YWc6IHRhZyxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25cbiAgfSk7XG4gIGlmICghREVTQ1JJUFRPUlMpIHN5bWJvbC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICByZXR1cm4gc3ltYm9sO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChpdCkgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgaWYgKE8gPT09IE9iamVjdFByb3RvdHlwZSkgJGRlZmluZVByb3BlcnR5KE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIFAsIEF0dHJpYnV0ZXMpO1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFBdHRyaWJ1dGVzLmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKE8sIEhJRERFTikpIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIEhJRERFTiwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHt9KSk7XG4gICAgICBPW0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXMoTywgSElEREVOKSAmJiBPW0hJRERFTl1ba2V5XSkgT1tISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEF0dHJpYnV0ZXMgPSBuYXRpdmVPYmplY3RDcmVhdGUoQXR0cmlidXRlcywgeyBlbnVtZXJhYmxlOiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2NyaXB0b3IoTywga2V5LCBBdHRyaWJ1dGVzKTtcbiAgfSByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywga2V5LCBBdHRyaWJ1dGVzKTtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIHByb3BlcnRpZXMgPSB0b0luZGV4ZWRPYmplY3QoUHJvcGVydGllcyk7XG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhwcm9wZXJ0aWVzKS5jb25jYXQoJGdldE93blByb3BlcnR5U3ltYm9scyhwcm9wZXJ0aWVzKSk7XG4gICRmb3JFYWNoKGtleXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIURFU0NSSVBUT1JTIHx8ICRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHByb3BlcnRpZXMsIGtleSkpICRkZWZpbmVQcm9wZXJ0eShPLCBrZXksIHByb3BlcnRpZXNba2V5XSk7XG4gIH0pO1xuICByZXR1cm4gTztcbn07XG5cbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IG5hdGl2ZU9iamVjdENyZWF0ZShPKSA6ICRkZWZpbmVQcm9wZXJ0aWVzKG5hdGl2ZU9iamVjdENyZWF0ZShPKSwgUHJvcGVydGllcyk7XG59O1xuXG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgUCA9IHRvUHJpbWl0aXZlKFYsIHRydWUpO1xuICB2YXIgZW51bWVyYWJsZSA9IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodGhpcywgUCk7XG4gIGlmICh0aGlzID09PSBPYmplY3RQcm90b3R5cGUgJiYgaGFzKEFsbFN5bWJvbHMsIFApICYmICFoYXMoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgUCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGVudW1lcmFibGUgfHwgIWhhcyh0aGlzLCBQKSB8fCAhaGFzKEFsbFN5bWJvbHMsIFApIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtQXSA/IGVudW1lcmFibGUgOiB0cnVlO1xufTtcblxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICB2YXIgaXQgPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90b3R5cGUgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBkZXNjcmlwdG9yID0gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpO1xuICBpZiAoZGVzY3JpcHRvciAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSB7XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICB2YXIgbmFtZXMgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKHRvSW5kZXhlZE9iamVjdChPKSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgJGZvckVhY2gobmFtZXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoaGlkZGVuS2V5cywga2V5KSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhPKSB7XG4gIHZhciBJU19PQkpFQ1RfUFJPVE9UWVBFID0gTyA9PT0gT2JqZWN0UHJvdG90eXBlO1xuICB2YXIgbmFtZXMgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKElTX09CSkVDVF9QUk9UT1RZUEUgPyBPYmplY3RQcm90b3R5cGVTeW1ib2xzIDogdG9JbmRleGVkT2JqZWN0KE8pKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICAkZm9yRWFjaChuYW1lcywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSAmJiAoIUlTX09CSkVDVF9QUk9UT1RZUEUgfHwgaGFzKE9iamVjdFByb3RvdHlwZSwga2V5KSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIGBTeW1ib2xgIGNvbnN0cnVjdG9yXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wtY29uc3RydWN0b3JcbmlmICghTkFUSVZFX1NZTUJPTCkge1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCkgdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICB2YXIgZGVzY3JpcHRpb24gPSAhYXJndW1lbnRzLmxlbmd0aCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IFN0cmluZyhhcmd1bWVudHNbMF0pO1xuICAgIHZhciB0YWcgPSB1aWQoZGVzY3JpcHRpb24pO1xuICAgIHZhciBzZXR0ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzID09PSBPYmplY3RQcm90b3R5cGUpIHNldHRlci5jYWxsKE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKSB0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzY3JpcHRvcih0aGlzLCB0YWcsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYgKERFU0NSSVBUT1JTICYmIFVTRV9TRVRURVIpIHNldFN5bWJvbERlc2NyaXB0b3IoT2JqZWN0UHJvdG90eXBlLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6IHNldHRlciB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcsIGRlc2NyaXB0aW9uKTtcbiAgfTtcblxuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnRhZztcbiAgfSk7XG5cbiAgcmVkZWZpbmUoJFN5bWJvbCwgJ3dpdGhvdXRTZXR0ZXInLCBmdW5jdGlvbiAoZGVzY3JpcHRpb24pIHtcbiAgICByZXR1cm4gd3JhcCh1aWQoZGVzY3JpcHRpb24pLCBkZXNjcmlwdGlvbik7XG4gIH0pO1xuXG4gIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIGRlZmluZVByb3BlcnR5TW9kdWxlLmYgPSAkZGVmaW5lUHJvcGVydHk7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mID0gZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsLmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUuZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHdyYXAod2VsbEtub3duU3ltYm9sKG5hbWUpLCBuYW1lKTtcbiAgfTtcblxuICBpZiAoREVTQ1JJUFRPUlMpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1TeW1ib2wtZGVzY3JpcHRpb25cbiAgICBuYXRpdmVEZWZpbmVQcm9wZXJ0eSgkU3ltYm9sW1BST1RPVFlQRV0sICdkZXNjcmlwdGlvbicsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gZGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLmRlc2NyaXB0aW9uO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghSVNfUFVSRSkge1xuICAgICAgcmVkZWZpbmUoT2JqZWN0UHJvdG90eXBlLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHsgdW5zYWZlOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxufVxuXG4kKHsgZ2xvYmFsOiB0cnVlLCB3cmFwOiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MLCBzaGFtOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIFN5bWJvbDogJFN5bWJvbFxufSk7XG5cbiRmb3JFYWNoKG9iamVjdEtleXMoV2VsbEtub3duU3ltYm9sc1N0b3JlKSwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgZGVmaW5lV2VsbEtub3duU3ltYm9sKG5hbWUpO1xufSk7XG5cbiQoeyB0YXJnZXQ6IFNZTUJPTCwgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIC8vIGBTeW1ib2wuZm9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3ltYm9sLmZvclxuICAnZm9yJzogZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcoa2V5KTtcbiAgICBpZiAoaGFzKFN0cmluZ1RvU3ltYm9sUmVnaXN0cnksIHN0cmluZykpIHJldHVybiBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5W3N0cmluZ107XG4gICAgdmFyIHN5bWJvbCA9ICRTeW1ib2woc3RyaW5nKTtcbiAgICBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5W3N0cmluZ10gPSBzeW1ib2w7XG4gICAgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeVtzeW1ib2xdID0gc3RyaW5nO1xuICAgIHJldHVybiBzeW1ib2w7XG4gIH0sXG4gIC8vIGBTeW1ib2wua2V5Rm9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3ltYm9sLmtleWZvclxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCcpO1xuICAgIGlmIChoYXMoU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSwgc3ltKSkgcmV0dXJuIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnlbc3ltXTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiAoKSB7IFVTRV9TRVRURVIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgVVNFX1NFVFRFUiA9IGZhbHNlOyB9XG59KTtcblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIC8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvcnNcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yXG59KTtcblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wgfSwge1xuICAvLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlzeW1ib2xzXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIENocm9tZSAzOCBhbmQgMzkgYE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNgIGZhaWxzIG9uIHByaW1pdGl2ZXNcbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTM0NDNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IGZhaWxzKGZ1bmN0aW9uICgpIHsgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYoMSk7IH0pIH0sIHtcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYodG9PYmplY3QoaXQpKTtcbiAgfVxufSk7XG5cbi8vIGBKU09OLnN0cmluZ2lmeWAgbWV0aG9kIGJlaGF2aW9yIHdpdGggc3ltYm9sc1xuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtanNvbi5zdHJpbmdpZnlcbmlmICgkc3RyaW5naWZ5KSB7XG4gIHZhciBGT1JDRURfSlNPTl9TVFJJTkdJRlkgPSAhTkFUSVZFX1NZTUJPTCB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN5bWJvbCA9ICRTeW1ib2woKTtcbiAgICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAgIHJldHVybiAkc3RyaW5naWZ5KFtzeW1ib2xdKSAhPSAnW251bGxdJ1xuICAgICAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gICAgICB8fCAkc3RyaW5naWZ5KHsgYTogc3ltYm9sIH0pICE9ICd7fSdcbiAgICAgIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gICAgICB8fCAkc3RyaW5naWZ5KE9iamVjdChzeW1ib2wpKSAhPSAne30nO1xuICB9KTtcblxuICAkKHsgdGFyZ2V0OiAnSlNPTicsIHN0YXQ6IHRydWUsIGZvcmNlZDogRk9SQ0VEX0pTT05fU1RSSU5HSUZZIH0sIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCwgcmVwbGFjZXIsIHNwYWNlKSB7XG4gICAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgICB2YXIgaW5kZXggPSAxO1xuICAgICAgdmFyICRyZXBsYWNlcjtcbiAgICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaW5kZXgpIGFyZ3MucHVzaChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgICAgJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgICBpZiAoIWlzT2JqZWN0KHJlcGxhY2VyKSAmJiBpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgJHJlcGxhY2VyID09ICdmdW5jdGlvbicpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgICAgcmV0dXJuICRzdHJpbmdpZnkuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gYFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS1AQHRvcHJpbWl0aXZlXG5pZiAoISRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdKSB7XG4gIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xufVxuLy8gYFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11gIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLUBAdG9zdHJpbmd0YWdcbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsIFNZTUJPTCk7XG5cbmhpZGRlbktleXNbSElEREVOXSA9IHRydWU7XG4iLCIvLyBgU3ltYm9sLnByb3RvdHlwZS5kZXNjcmlwdGlvbmAgZ2V0dGVyXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLmRlc2NyaXB0aW9uXG4ndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcblxudmFyIE5hdGl2ZVN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG5cbmlmIChERVNDUklQVE9SUyAmJiB0eXBlb2YgTmF0aXZlU3ltYm9sID09ICdmdW5jdGlvbicgJiYgKCEoJ2Rlc2NyaXB0aW9uJyBpbiBOYXRpdmVTeW1ib2wucHJvdG90eXBlKSB8fFxuICAvLyBTYWZhcmkgMTIgYnVnXG4gIE5hdGl2ZVN5bWJvbCgpLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWRcbikpIHtcbiAgdmFyIEVtcHR5U3RyaW5nRGVzY3JpcHRpb25TdG9yZSA9IHt9O1xuICAvLyB3cmFwIFN5bWJvbCBjb25zdHJ1Y3RvciBmb3IgY29ycmVjdCB3b3JrIHdpdGggdW5kZWZpbmVkIGRlc2NyaXB0aW9uXG4gIHZhciBTeW1ib2xXcmFwcGVyID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIHZhciBkZXNjcmlwdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPCAxIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogU3RyaW5nKGFyZ3VtZW50c1swXSk7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMgaW5zdGFuY2VvZiBTeW1ib2xXcmFwcGVyXG4gICAgICA/IG5ldyBOYXRpdmVTeW1ib2woZGVzY3JpcHRpb24pXG4gICAgICAvLyBpbiBFZGdlIDEzLCBTdHJpbmcoU3ltYm9sKHVuZGVmaW5lZCkpID09PSAnU3ltYm9sKHVuZGVmaW5lZCknXG4gICAgICA6IGRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQgPyBOYXRpdmVTeW1ib2woKSA6IE5hdGl2ZVN5bWJvbChkZXNjcmlwdGlvbik7XG4gICAgaWYgKGRlc2NyaXB0aW9uID09PSAnJykgRW1wdHlTdHJpbmdEZXNjcmlwdGlvblN0b3JlW3Jlc3VsdF0gPSB0cnVlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoU3ltYm9sV3JhcHBlciwgTmF0aXZlU3ltYm9sKTtcbiAgdmFyIHN5bWJvbFByb3RvdHlwZSA9IFN5bWJvbFdyYXBwZXIucHJvdG90eXBlID0gTmF0aXZlU3ltYm9sLnByb3RvdHlwZTtcbiAgc3ltYm9sUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ltYm9sV3JhcHBlcjtcblxuICB2YXIgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBuYXRpdmUgPSBTdHJpbmcoTmF0aXZlU3ltYm9sKCd0ZXN0JykpID09ICdTeW1ib2wodGVzdCknO1xuICB2YXIgcmVnZXhwID0gL15TeW1ib2xcXCgoLiopXFwpW14pXSskLztcbiAgZGVmaW5lUHJvcGVydHkoc3ltYm9sUHJvdG90eXBlLCAnZGVzY3JpcHRpb24nLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZGVzY3JpcHRpb24oKSB7XG4gICAgICB2YXIgc3ltYm9sID0gaXNPYmplY3QodGhpcykgPyB0aGlzLnZhbHVlT2YoKSA6IHRoaXM7XG4gICAgICB2YXIgc3RyaW5nID0gc3ltYm9sVG9TdHJpbmcuY2FsbChzeW1ib2wpO1xuICAgICAgaWYgKGhhcyhFbXB0eVN0cmluZ0Rlc2NyaXB0aW9uU3RvcmUsIHN5bWJvbCkpIHJldHVybiAnJztcbiAgICAgIHZhciBkZXNjID0gbmF0aXZlID8gc3RyaW5nLnNsaWNlKDcsIC0xKSA6IHN0cmluZy5yZXBsYWNlKHJlZ2V4cCwgJyQxJyk7XG4gICAgICByZXR1cm4gZGVzYyA9PT0gJycgPyB1bmRlZmluZWQgOiBkZXNjO1xuICAgIH1cbiAgfSk7XG5cbiAgJCh7IGdsb2JhbDogdHJ1ZSwgZm9yY2VkOiB0cnVlIH0sIHtcbiAgICBTeW1ib2w6IFN5bWJvbFdyYXBwZXJcbiAgfSk7XG59XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLml0ZXJhdG9yYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3ltYm9sLml0ZXJhdG9yXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBjYWNoZSA9IHt9O1xuXG52YXIgdGhyb3dlciA9IGZ1bmN0aW9uIChpdCkgeyB0aHJvdyBpdDsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIG9wdGlvbnMpIHtcbiAgaWYgKGhhcyhjYWNoZSwgTUVUSE9EX05BTUUpKSByZXR1cm4gY2FjaGVbTUVUSE9EX05BTUVdO1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcbiAgdmFyIG1ldGhvZCA9IFtdW01FVEhPRF9OQU1FXTtcbiAgdmFyIEFDQ0VTU09SUyA9IGhhcyhvcHRpb25zLCAnQUNDRVNTT1JTJykgPyBvcHRpb25zLkFDQ0VTU09SUyA6IGZhbHNlO1xuICB2YXIgYXJndW1lbnQwID0gaGFzKG9wdGlvbnMsIDApID8gb3B0aW9uc1swXSA6IHRocm93ZXI7XG4gIHZhciBhcmd1bWVudDEgPSBoYXMob3B0aW9ucywgMSkgPyBvcHRpb25zWzFdIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiBjYWNoZVtNRVRIT0RfTkFNRV0gPSAhIW1ldGhvZCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIGlmIChBQ0NFU1NPUlMgJiYgIURFU0NSSVBUT1JTKSByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgTyA9IHsgbGVuZ3RoOiAtMSB9O1xuXG4gICAgaWYgKEFDQ0VTU09SUykgZGVmaW5lUHJvcGVydHkoTywgMSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IHRocm93ZXIgfSk7XG4gICAgZWxzZSBPWzFdID0gMTtcblxuICAgIG1ldGhvZC5jYWxsKE8sIGFyZ3VtZW50MCwgYXJndW1lbnQxKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgbmF0aXZlSW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbnZhciBORUdBVElWRV9aRVJPID0gISFuYXRpdmVJbmRleE9mICYmIDEgLyBbMV0uaW5kZXhPZigxLCAtMCkgPCAwO1xudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdpbmRleE9mJyk7XG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnaW5kZXhPZicsIHsgQUNDRVNTT1JTOiB0cnVlLCAxOiAwIH0pO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IE5FR0FUSVZFX1pFUk8gfHwgIVNUUklDVF9NRVRIT0QgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qICwgZnJvbUluZGV4ID0gMCAqLykge1xuICAgIHJldHVybiBORUdBVElWRV9aRVJPXG4gICAgICAvLyBjb252ZXJ0IC0wIHRvICswXG4gICAgICA/IG5hdGl2ZUluZGV4T2YuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCAwXG4gICAgICA6ICRpbmRleE9mKHRoaXMsIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbnZhciBVTlNDT1BBQkxFUyA9IHdlbGxLbm93blN5bWJvbCgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxuLy8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuaWYgKEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpIHtcbiAgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihBcnJheVByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGNyZWF0ZShudWxsKVxuICB9KTtcbn1cblxuLy8gYWRkIGEga2V5IHRvIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGKCkgeyAvKiBlbXB0eSAqLyB9XG4gIEYucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgRigpKSAhPT0gRi5wcm90b3R5cGU7XG59KTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyJyk7XG5cbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vLyBgT2JqZWN0LmdldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRwcm90b3R5cGVvZlxubW9kdWxlLmV4cG9ydHMgPSBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG90eXBlIDogbnVsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IGZhbHNlO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbi8vIGAlSXRlcmF0b3JQcm90b3R5cGUlYCBvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSVpdGVyYXRvcnByb3RvdHlwZSUtb2JqZWN0XG52YXIgSXRlcmF0b3JQcm90b3R5cGUsIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSwgYXJyYXlJdGVyYXRvcjtcblxuaWYgKFtdLmtleXMpIHtcbiAgYXJyYXlJdGVyYXRvciA9IFtdLmtleXMoKTtcbiAgLy8gU2FmYXJpIDggaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gIGlmICghKCduZXh0JyBpbiBhcnJheUl0ZXJhdG9yKSkgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IHRydWU7XG4gIGVsc2Uge1xuICAgIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGdldFByb3RvdHlwZU9mKGFycmF5SXRlcmF0b3IpKTtcbiAgICBpZiAoUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSBJdGVyYXRvclByb3RvdHlwZSA9IFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxufVxuXG5pZiAoSXRlcmF0b3JQcm90b3R5cGUgPT0gdW5kZWZpbmVkKSBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxuaWYgKCFJU19QVVJFICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkge1xuICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEl0ZXJhdG9yUHJvdG90eXBlOiBJdGVyYXRvclByb3RvdHlwZSxcbiAgQlVHR1lfU0FGQVJJX0lURVJBVE9SUzogQlVHR1lfU0FGQVJJX0lURVJBVE9SU1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkgJiYgaXQgIT09IG51bGwpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBzZXQgXCIgKyBTdHJpbmcoaXQpICsgJyBhcyBhIHByb3RvdHlwZScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgYW5PYmplY3QoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlci5jYWxsKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3InKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSXRlcmF0b3JzQ29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpO1xuXG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSBJdGVyYXRvcnNDb3JlLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBJdGVyYXRvcnNDb3JlLkJVR0dZX1NBRkFSSV9JVEVSQVRPUlM7XG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcbnZhciBFTlRSSUVTID0gJ2VudHJpZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEl0ZXJhYmxlLCBOQU1FLCBJdGVyYXRvckNvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yKEl0ZXJhdG9yQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuXG4gIHZhciBnZXRJdGVyYXRpb25NZXRob2QgPSBmdW5jdGlvbiAoS0lORCkge1xuICAgIGlmIChLSU5EID09PSBERUZBVUxUICYmIGRlZmF1bHRJdGVyYXRvcikgcmV0dXJuIGRlZmF1bHRJdGVyYXRvcjtcbiAgICBpZiAoIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgS0lORCBpbiBJdGVyYWJsZVByb3RvdHlwZSkgcmV0dXJuIEl0ZXJhYmxlUHJvdG90eXBlW0tJTkRdO1xuICAgIHN3aXRjaCAoS0lORCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgRU5UUklFUzogcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzKTsgfTtcbiAgfTtcblxuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IGZhbHNlO1xuICB2YXIgSXRlcmFibGVQcm90b3R5cGUgPSBJdGVyYWJsZS5wcm90b3R5cGU7XG4gIHZhciBuYXRpdmVJdGVyYXRvciA9IEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXVxuICAgIHx8IEl0ZXJhYmxlUHJvdG90eXBlWydAQGl0ZXJhdG9yJ11cbiAgICB8fCBERUZBVUxUICYmIEl0ZXJhYmxlUHJvdG90eXBlW0RFRkFVTFRdO1xuICB2YXIgZGVmYXVsdEl0ZXJhdG9yID0gIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgbmF0aXZlSXRlcmF0b3IgfHwgZ2V0SXRlcmF0aW9uTWV0aG9kKERFRkFVTFQpO1xuICB2YXIgYW55TmF0aXZlSXRlcmF0b3IgPSBOQU1FID09ICdBcnJheScgPyBJdGVyYWJsZVByb3RvdHlwZS5lbnRyaWVzIHx8IG5hdGl2ZUl0ZXJhdG9yIDogbmF0aXZlSXRlcmF0b3I7XG4gIHZhciBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIG1ldGhvZHMsIEtFWTtcblxuICAvLyBmaXggbmF0aXZlXG4gIGlmIChhbnlOYXRpdmVJdGVyYXRvcikge1xuICAgIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGFueU5hdGl2ZUl0ZXJhdG9yLmNhbGwobmV3IEl0ZXJhYmxlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIGlmICghSVNfUFVSRSAmJiBnZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUpICE9PSBJdGVyYXRvclByb3RvdHlwZSkge1xuICAgICAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgICAgICBzZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIHRydWUsIHRydWUpO1xuICAgICAgaWYgKElTX1BVUkUpIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGQVVMVCA9PSBWQUxVRVMgJiYgbmF0aXZlSXRlcmF0b3IgJiYgbmF0aXZlSXRlcmF0b3IubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gdHJ1ZTtcbiAgICBkZWZhdWx0SXRlcmF0b3IgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuYXRpdmVJdGVyYXRvci5jYWxsKHRoaXMpOyB9O1xuICB9XG5cbiAgLy8gZGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUlTX1BVUkUgfHwgRk9SQ0VEKSAmJiBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl0gIT09IGRlZmF1bHRJdGVyYXRvcikge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShJdGVyYWJsZVByb3RvdHlwZSwgSVRFUkFUT1IsIGRlZmF1bHRJdGVyYXRvcik7XG4gIH1cbiAgSXRlcmF0b3JzW05BTUVdID0gZGVmYXVsdEl0ZXJhdG9yO1xuXG4gIC8vIGV4cG9ydCBhZGRpdGlvbmFsIG1ldGhvZHNcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBnZXRJdGVyYXRpb25NZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/IGRlZmF1bHRJdGVyYXRvciA6IGdldEl0ZXJhdGlvbk1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChFTlRSSUVTKVxuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChLRVkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIHx8ICEoS0VZIGluIEl0ZXJhYmxlUHJvdG90eXBlKSkge1xuICAgICAgICByZWRlZmluZShJdGVyYWJsZVByb3RvdHlwZSwgS0VZLCBtZXRob2RzW0tFWV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSAkKHsgdGFyZ2V0OiBOQU1FLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB9LCBtZXRob2RzKTtcbiAgfVxuXG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBBUlJBWV9JVEVSQVRPUiA9ICdBcnJheSBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihBUlJBWV9JVEVSQVRPUik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZW50cmllc1xuLy8gYEFycmF5LnByb3RvdHlwZS5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5rZXlzXG4vLyBgQXJyYXkucHJvdG90eXBlLnZhbHVlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUudmFsdWVzXG4vLyBgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQGl0ZXJhdG9yXG4vLyBgQ3JlYXRlQXJyYXlJdGVyYXRvcmAgaW50ZXJuYWwgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1jcmVhdGVhcnJheWl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZUl0ZXJhdG9yKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogQVJSQVlfSVRFUkFUT1IsXG4gICAgdGFyZ2V0OiB0b0luZGV4ZWRPYmplY3QoaXRlcmF0ZWQpLCAvLyB0YXJnZXRcbiAgICBpbmRleDogMCwgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgICBraW5kOiBraW5kICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtpbmRcbiAgfSk7XG4vLyBgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGtpbmQgPSBzdGF0ZS5raW5kO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCsrO1xuICBpZiAoIXRhcmdldCB8fCBpbmRleCA+PSB0YXJnZXQubGVuZ3RoKSB7XG4gICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiB7IHZhbHVlOiBpbmRleCwgZG9uZTogZmFsc2UgfTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiB7IHZhbHVlOiB0YXJnZXRbaW5kZXhdLCBkb25lOiBmYWxzZSB9O1xuICByZXR1cm4geyB2YWx1ZTogW2luZGV4LCB0YXJnZXRbaW5kZXhdXSwgZG9uZTogZmFsc2UgfTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1jcmVhdGV1bm1hcHBlZGFyZ3VtZW50c29iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY3JlYXRlbWFwcGVkYXJndW1lbnRzb2JqZWN0XG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xuXG52YXIgbmF0aXZlQXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5hc3NpZ25gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmFzc2lnblxubW9kdWxlLmV4cG9ydHMgPSAhbmF0aXZlQXNzaWduIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gc2hvdWxkIGhhdmUgY29ycmVjdCBvcmRlciBvZiBvcGVyYXRpb25zIChFZGdlIGJ1ZylcbiAgaWYgKERFU0NSSVBUT1JTICYmIG5hdGl2ZUFzc2lnbih7IGI6IDEgfSwgbmF0aXZlQXNzaWduKGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGhpcywgJ2InLCB7XG4gICAgICAgIHZhbHVlOiAzLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9KSwgeyBiOiAyIH0pKS5iICE9PSAxKSByZXR1cm4gdHJ1ZTtcbiAgLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgc3ltYm9sID0gU3ltYm9sKCk7XG4gIHZhciBhbHBoYWJldCA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbc3ltYm9sXSA9IDc7XG4gIGFscGhhYmV0LnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChjaHIpIHsgQltjaHJdID0gY2hyOyB9KTtcbiAgcmV0dXJuIG5hdGl2ZUFzc2lnbih7fSwgQSlbc3ltYm9sXSAhPSA3IHx8IG9iamVjdEtleXMobmF0aXZlQXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gYWxwaGFiZXQ7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFyZ3VtZW50c0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgdmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZjtcbiAgd2hpbGUgKGFyZ3VtZW50c0xlbmd0aCA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJbmRleGVkT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBvYmplY3RLZXlzKFMpLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoUykpIDogb2JqZWN0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIHtcbiAgICAgIGtleSA9IGtleXNbaisrXTtcbiAgICAgIGlmICghREVTQ1JJUFRPUlMgfHwgcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChTLCBrZXkpKSBUW2tleV0gPSBTW2tleV07XG4gICAgfVxuICB9IHJldHVybiBUO1xufSA6IG5hdGl2ZUFzc2lnbjtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtYXNzaWduJyk7XG5cbi8vIGBPYmplY3QuYXNzaWduYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5hc3NpZ25cbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IE9iamVjdC5hc3NpZ24gIT09IGFzc2lnbiB9LCB7XG4gIGFzc2lnbjogYXNzaWduXG59KTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgdGVzdCA9IHt9O1xuXG50ZXN0W1RPX1NUUklOR19UQUddID0gJ3onO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZyh0ZXN0KSA9PT0gJ1tvYmplY3Qgel0nO1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBDT1JSRUNUX0FSR1VNRU5UUyA9IGNsYXNzb2ZSYXcoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8gY2xhc3NvZlJhdyA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgdGFnLCByZXN1bHQ7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mICh0YWcgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRPX1NUUklOR19UQUcpKSA9PSAnc3RyaW5nJyA/IHRhZ1xuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQ09SUkVDVF9BUkdVTUVOVFMgPyBjbGFzc29mUmF3KE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKHJlc3VsdCA9IGNsYXNzb2ZSYXcoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyB7fS50b1N0cmluZyA6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG59O1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcnKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKCFUT19TVFJJTkdfVEFHX1NVUFBPUlQpIHtcbiAgcmVkZWZpbmUoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgdG9TdHJpbmcsIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyBjb2RlUG9pbnRBdCwgYXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HID8gUy5jaGFyQXQocG9zaXRpb24pIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGFyQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNoYXJBdDtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBTVFJJTkdfSVRFUkFUT1IgPSAnU3RyaW5nIEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNUUklOR19JVEVSQVRPUik7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUtQEBpdGVyYXRvclxuZGVmaW5lSXRlcmF0b3IoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IFNUUklOR19JVEVSQVRPUixcbiAgICBzdHJpbmc6IFN0cmluZyhpdGVyYXRlZCksXG4gICAgaW5kZXg6IDBcbiAgfSk7XG4vLyBgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSVzdHJpbmdpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHN0cmluZyA9IHN0YXRlLnN0cmluZztcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXg7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IHN0cmluZy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gIHN0YXRlLmluZGV4ICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCIvLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgRE9NSXRlcmFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMnKTtcbnZhciBBcnJheUl0ZXJhdG9yTWV0aG9kcyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIEFycmF5VmFsdWVzID0gQXJyYXlJdGVyYXRvck1ldGhvZHMudmFsdWVzO1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGUpIHtcbiAgICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl0gIT09IEFycmF5VmFsdWVzKSB0cnkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIENvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JdID0gQXJyYXlWYWx1ZXM7XG4gICAgfVxuICAgIGlmICghQ29sbGVjdGlvblByb3RvdHlwZVtUT19TVFJJTkdfVEFHXSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIENPTExFQ1RJT05fTkFNRSk7XG4gICAgfVxuICAgIGlmIChET01JdGVyYWJsZXNbQ09MTEVDVElPTl9OQU1FXSkgZm9yICh2YXIgTUVUSE9EX05BTUUgaW4gQXJyYXlJdGVyYXRvck1ldGhvZHMpIHtcbiAgICAgIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICAgICAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGVbTUVUSE9EX05BTUVdICE9PSBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV0pIHRyeSB7XG4gICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCBNRVRIT0RfTkFNRSwgQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIENvbGxlY3Rpb25Qcm90b3R5cGVbTUVUSE9EX05BTUVdID0gQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0cy5kZWJvdW5jZT1mdW5jdGlvbihpLGUsbyl7dmFyIHQ7cmV0dXJuIHZvaWQgMD09PWUmJihlPTUwKSx2b2lkIDA9PT1vJiYobz17aXNJbW1lZGlhdGU6ITF9KSxmdW5jdGlvbigpe2Zvcih2YXIgYT1bXSxkPTA7ZDxhcmd1bWVudHMubGVuZ3RoO2QrKylhW2RdPWFyZ3VtZW50c1tkXTt2YXIgbj10aGlzLG09by5pc0ltbWVkaWF0ZSYmdm9pZCAwPT09dDt2b2lkIDAhPT10JiZjbGVhclRpbWVvdXQodCksdD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dD12b2lkIDAsby5pc0ltbWVkaWF0ZXx8aS5hcHBseShuLGEpfSxlKSxtJiZpLmFwcGx5KG4sYSl9fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoaHRtbDogc3RyaW5nKTogSFRNTEVsZW1lbnQgPT4ge1xuICAgIHJldHVybiBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGh0bWwsICd0ZXh0L2h0bWwnKS5ib2R5LmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XG59XG5cbi8qKlxuICogYTExeWNsaWNrIC0gRWFzaWx5IGhhbmRsZSBrZXlib2FyZCBjbGljayBldmVudHMgb24gbm9uIHNlbWFudGljIGJ1dHRvbiBlbGVtZW50cy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmlua2xlL2ExMXljbGlja1xuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IENsaWNrL2tleWJvYXJkIGV2ZW50IG9iamVjdC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uIGV2ZW50IHR5cGUgYW5kIGNvZGUuXG4gKi9cbmV4cG9ydCBjb25zdCBhMTF5Q2xpY2sgPSBmdW5jdGlvbihldmVudDogYW55KTogYm9vbGVhbiB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGNvZGUgPSBldmVudC5jaGFyQ29kZSB8fCBldmVudC5rZXlDb2RlLFxuICAgICAgICB0eXBlID0gZXZlbnQudHlwZTtcblxuICAgIGlmICh0eXBlID09PSAnY2xpY2snKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICAgIGlmIChjb2RlID09PSAzMiB8fCBjb2RlID09PSAxMykge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLy8gQ3Jvc3MgYnJvd3NlciBjdXN0b20gZXZlbnRcbi8vIFNvbWUgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zaHlzdHJ1ay9jdXN0b20tZXZlbnQtanNcbmV4cG9ydCBjb25zdCBjcm9zc0N1c3RvbUV2ZW50ID0gKGV2ZW50OiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XG4gICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZCB9O1xuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG5cbiAgICByZXR1cm4gZXZ0O1xufVxuXG4vLyBDaGVja3MgaWYgdmFsdWUgaXMgYW4gaW50ZWdlclxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTnVtYmVyL2lzSW50ZWdlciNQb2x5ZmlsbFxuZXhwb3J0IGNvbnN0IGlzSW50ZWdlciA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmXG4gICAgaXNGaW5pdGUodmFsdWUpICYmXG4gICAgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xufTtcblxuLy8gUnVuIGEgZnVuY3Rpb24gb24gYWxsIGVsZW1lbnRzIGV2ZW4gaWYgaXQncyBhIGNvbGxlY3Rpb24gb3Igc2luZ2xlXG5leHBvcnQgY29uc3QgZXZlcnlFbGVtZW50ID0gKGVsZW1lbnRzOiBIVE1MRWxlbWVudCB8IEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+IHwgTm9kZUxpc3QgfCBIVE1MRWxlbWVudFtdLCBjYWxsYmFjaz86IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZCkgPT4ge1xuICAgIGNvbnN0IGVscyA9IGVsZW1lbnRzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBbZWxlbWVudHNdIDogZWxlbWVudHM7XG5cbiAgICBmb3IgKGxldCBlbCBvZiBlbHMpIHtcbiAgICAgICAgaWYgKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGVsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgY29tcHV0ZWQgd2lkdGgvaGVpZ2h0IHdpdGggc3VicGl4ZWxzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vVmVzdHJpZGUvZ2xlbi5jb2Rlcy9ibG9iL21hc3Rlci9zcmMvcG9zdHMvZ2V0dGluZy1lbGVtZW50LXdpZHRoLm1kXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTdWJwaXhlbFN0eWxlID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdHlsZTogJ3dpZHRoJyB8ICdoZWlnaHQnLCBzdHlsZXM/OiBDU1NTdHlsZURlY2xhcmF0aW9uKSA9PiB7XG4gICAgdmFyIEhBU19DT01QVVRFRF9TVFlMRSA9ICEhd2luZG93LmdldENvbXB1dGVkU3R5bGU7XG4gICAgdmFyIGdldFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIHx8IGZ1bmN0aW9uICgpIHsgfTtcblxuICAgIHZhciBDT01QVVRFRF9TSVpFX0lOQ0xVREVTX1BBRERJTkcgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIUhBU19DT01QVVRFRF9TVFlMRSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcmVudCA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlLnN0eWxlLmNzc1RleHQgPSAnd2lkdGg6MTBweDtwYWRkaW5nOjJweDsnICtcbiAgICAgICAgICAgICctd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3g7JztcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGUpO1xuXG4gICAgICAgIHZhciB3aWR0aCA9IGdldFN0eWxlcyhlLCBudWxsKS53aWR0aDtcbiAgICAgICAgdmFyIHJldCA9IHdpZHRoID09PSAnMTBweCc7XG5cbiAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGUpO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSgpKTtcblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSBjb21wdXRlZCBzdHlsZSBmb3IgYW4gZWxlbWVudCwgcGFyc2VkIGFzIGEgZmxvYXQuXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdG8gZ2V0IHN0eWxlIGZvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3R5bGUgU3R5bGUgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBbc3R5bGVzXSBPcHRpb25hbGx5IGluY2x1ZGUgY2xlYW4gc3R5bGVzIHRvXG4gICAgICogICAgIHVzZSBpbnN0ZWFkIG9mIGFza2luZyBmb3IgdGhlbSBhZ2Fpbi5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBwYXJzZWQgY29tcHV0ZWQgdmFsdWUgb3IgemVybyBpZiB0aGF0IGZhaWxzIGJlY2F1c2UgSUVcbiAgICAgKiAgICAgd2lsbCByZXR1cm4gJ2F1dG8nIHdoZW4gdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIG1hcmdpbnMgaW5zdGVhZCBvZlxuICAgICAqICAgICB0aGUgY29tcHV0ZWQgc3R5bGUuXG4gICAgICovXG4gICAgdmFyIGdldE51bWJlclN0eWxlID0gZnVuY3Rpb24gKGVsOiBIVE1MRWxlbWVudCwgZWxTdHlsZTogJ3dpZHRoJyB8ICdoZWlnaHQnLCBlbFN0eWxlcz86IENTU1N0eWxlRGVjbGFyYXRpb24pIHtcbiAgICAgICAgaWYgKEhBU19DT01QVVRFRF9TVFlMRSkge1xuICAgICAgICAgICAgZWxTdHlsZXMgPSBlbFN0eWxlcyB8fCBnZXRTdHlsZXMoZWwsIG51bGwpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gZ2V0RmxvYXQoZWxTdHlsZXNbZWxTdHlsZV0pO1xuXG4gICAgICAgICAgICAvLyBTdXBwb3J0IElFPD0xMSBhbmQgVzNDIHNwZWMuXG4gICAgICAgICAgICBpZiAoIUNPTVBVVEVEX1NJWkVfSU5DTFVERVNfUEFERElORyAmJiBlbFN0eWxlID09PSAnd2lkdGgnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gZ2V0RmxvYXQoZWxTdHlsZXMucGFkZGluZ0xlZnQpICtcbiAgICAgICAgICAgICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMucGFkZGluZ1JpZ2h0KSArXG4gICAgICAgICAgICAgICAgICAgIGdldEZsb2F0KGVsU3R5bGVzLmJvcmRlckxlZnRXaWR0aCkgK1xuICAgICAgICAgICAgICAgICAgICBnZXRGbG9hdChlbFN0eWxlcy5ib3JkZXJSaWdodFdpZHRoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIUNPTVBVVEVEX1NJWkVfSU5DTFVERVNfUEFERElORyAmJiBlbFN0eWxlID09PSAnaGVpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IGdldEZsb2F0KGVsU3R5bGVzLnBhZGRpbmdUb3ApICtcbiAgICAgICAgICAgICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMucGFkZGluZ0JvdHRvbSkgK1xuICAgICAgICAgICAgICAgICAgICBnZXRGbG9hdChlbFN0eWxlcy5ib3JkZXJUb3BXaWR0aCkgK1xuICAgICAgICAgICAgICAgICAgICBnZXRGbG9hdChlbFN0eWxlcy5ib3JkZXJCb3R0b21XaWR0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRGbG9hdChlbC5zdHlsZVtlbFN0eWxlXSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGlzTnVtYmVyID0gZnVuY3Rpb24gKG46IGFueSkge1xuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pIGFzIGJvb2xlYW47XG4gICAgfVxuXG4gICAgdmFyIGdldEZsb2F0ID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGlzTnVtYmVyKHZhbHVlKSA/IHZhbHVlIGFzIG51bWJlciA6IDBcbiAgICB9O1xuXG4gICAgcmV0dXJuIGdldE51bWJlclN0eWxlKGVsZW1lbnQsIHN0eWxlLCBzdHlsZXMpO1xufSIsImltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndHMtZGVib3VuY2UnO1xuaW1wb3J0IHtcbiAgICBjcmVhdGVFbGVtZW50LFxuICAgIGExMXlDbGljayxcbiAgICBjcm9zc0N1c3RvbUV2ZW50LFxuICAgIGlzSW50ZWdlcixcbiAgICBldmVyeUVsZW1lbnQsXG4gICAgZ2V0U3VicGl4ZWxTdHlsZVxufSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xuXG5pbnRlcmZhY2UgT3B0aW9ucyB7XG4gICAgY29udGFpbmVyOiBib29sZWFuLFxuICAgIGFycm93czogYm9vbGVhbixcbiAgICBwcmV2QXJyb3c6IEhUTUxFbGVtZW50IHwgSFRNTENvbGxlY3Rpb25PZjxIVE1MRWxlbWVudD4gfCBOb2RlTGlzdCxcbiAgICBuZXh0QXJyb3c6IEhUTUxFbGVtZW50IHwgSFRNTENvbGxlY3Rpb25PZjxIVE1MRWxlbWVudD4gfCBOb2RlTGlzdCxcbiAgICBkb3RzOiBib29sZWFuLFxuICAgIGFkYXB0aXZlSGVpZ2h0OiBib29sZWFuLFxuICAgIHNraXBCdG46IGJvb2xlYW4sXG4gICAgc2xpZGVzVG9TaG93OiBudW1iZXIgfCBmYWxzZSxcbiAgICBhdXRvcGxheTogYm9vbGVhbixcbiAgICBhdXRvcGxheVNwZWVkOiBudW1iZXIsXG4gICAgYXV0b3BsYXlIb3ZlclBhdXNlOiBib29sZWFuLFxuICAgIGNlbnRlck1vZGU6IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIEFjdGl2ZVZpc2libGVTbGlkZXMge1xuICAgICh2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdLCBhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQpOiB2b2lkO1xufVxuXG5lbnVtIFNsaWRlRGlyZWN0aW9uIHtcbiAgICBQcmV2LFxuICAgIE5leHRcbn1cblxuZW51bSBTbGlkZXJTdGF0ZSB7XG4gICAgRW5hYmxlZCA9IDEsXG4gICAgRGlzYWJsZWQgPSAwXG59XG5cbmVudW0gQXV0b3BsYXlTd2l0Y2gge1xuICAgIEVuYWJsZSxcbiAgICBEaXNhYmxlXG59XG5cbmVudW0gSXNBdXRvcGxheWluZyB7XG4gICAgWWVzLFxuICAgIE5vID0gMFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBMTFZU2xpZGVyIHtcbiAgICBwcml2YXRlIF9hY3RpdmVDbGFzczogc3RyaW5nO1xuICAgIHByaXZhdGUgX3Zpc2libGVDbGFzczogc3RyaW5nO1xuICAgIHByaXZhdGUgX2RvdHNDbGFzczogc3RyaW5nO1xuICAgIHByaXZhdGUgX3NsaWRlckNsYXNzOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfaGFzQ3VzdG9tQXJyb3dzOiBib29sZWFuO1xuICAgIHByaXZhdGUgX2ZvY3VzYWJsZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkOiBhbnk7XG4gICAgcHJpdmF0ZSBfdXBkYXRlSGVpZ2h0RGVib3VuY2VkOiBhbnk7XG4gICAgcHJpdmF0ZSBfZ2VuZXJhdGVEb3RzRGVib3VuY2VkOiBhbnk7XG4gICAgcHJpdmF0ZSBfdXBkYXRlU2Nyb2xsUG9zaXRpb246IGFueTtcbiAgICBwcml2YXRlIF9hdXRvcGxheVRpbWVyOiBJc0F1dG9wbGF5aW5nO1xuICAgIHByaXZhdGUgX2F1dG9wbGF5QnRuOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIF9wYXVzZU9uTW91c2VMZWF2ZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9za2lwQnRuczogSFRNTEVsZW1lbnRbXTtcbiAgICBwdWJsaWMgc2xpZGVyOiBIVE1MRWxlbWVudDtcbiAgICBwdWJsaWMgc2xpZGVzOiBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PjtcbiAgICBwdWJsaWMgZG90czogSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIHB1YmxpYyBhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQ7XG4gICAgcHVibGljIHZpc2libGVTbGlkZXM6IEhUTUxFbGVtZW50W107XG4gICAgcHVibGljIHNsaWRlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgcHVibGljIG9wdGlvbnM6IE9wdGlvbnM7XG4gICAgcHVibGljIHNsaWRlckVuYWJsZWQ6IFNsaWRlclN0YXRlO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiBPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuc2xpZGVyID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5zbGlkZXMgPSBlbGVtZW50LmNoaWxkcmVuIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJzxkaXYgY2xhc3M9XCJhMTF5LXNsaWRlci1jb250YWluZXJcIj48L2Rpdj4nKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlQ2xhc3MgPSAnYTExeS1zbGlkZXItYWN0aXZlJztcbiAgICAgICAgdGhpcy5fdmlzaWJsZUNsYXNzID0gJ2ExMXktc2xpZGVyLXZpc2libGUnO1xuICAgICAgICB0aGlzLl9kb3RzQ2xhc3MgPSAnYTExeS1zbGlkZXItZG90cyc7XG4gICAgICAgIHRoaXMuX3NsaWRlckNsYXNzID0gJ2ExMXktc2xpZGVyJztcbiAgICAgICAgdGhpcy5fZm9jdXNhYmxlID0gJ2EsIGFyZWEsIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBidXR0b24sIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgKlt0YWJpbmRleF0sICpbY29udGVudGVkaXRhYmxlXSc7XG4gICAgICAgIHRoaXMuX2F1dG9wbGF5VGltZXIgPSBJc0F1dG9wbGF5aW5nLk5vO1xuICAgICAgICB0aGlzLl9hdXRvcGxheUJ0biA9IGNyZWF0ZUVsZW1lbnQoYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYTExeS1zbGlkZXItYXV0b3BsYXlcIj5Ub2dnbGUgc2xpZGVyIGF1dG9wbGF5PC9idXR0b24+YCk7XG4gICAgICAgIHRoaXMuX3BhdXNlT25Nb3VzZUxlYXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3NraXBCdG5zID0gW107XG4gICAgICAgIHRoaXMuZG90cyA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB0aGlzLnNsaWRlc1swXTtcbiAgICAgICAgdGhpcy52aXNpYmxlU2xpZGVzID0gW107XG4gICAgICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9IFNsaWRlclN0YXRlLkRpc2FibGVkO1xuICAgICAgICB0aGlzLl9oYXNDdXN0b21BcnJvd3MgPSBvcHRpb25zICYmIG9wdGlvbnMucHJldkFycm93IHx8IG9wdGlvbnMgJiYgb3B0aW9ucy5uZXh0QXJyb3cgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbnRhaW5lcjogdHJ1ZSxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZBcnJvdzogb3B0aW9ucyAmJiBvcHRpb25zLnByZXZBcnJvdyB8fCBjcmVhdGVFbGVtZW50KCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImExMXktc2xpZGVyLXByZXZcIj5QcmV2aW91cyBzbGlkZTwvYnV0dG9uPicpLFxuICAgICAgICAgICAgbmV4dEFycm93OiBvcHRpb25zICYmIG9wdGlvbnMubmV4dEFycm93IHx8IGNyZWF0ZUVsZW1lbnQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYTExeS1zbGlkZXItbmV4dFwiPk5leHQgc2xpZGU8L2J1dHRvbj4nKSxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogZmFsc2UsXG4gICAgICAgICAgICBza2lwQnRuOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDQwMDAsXG4gICAgICAgICAgICBhdXRvcGxheUhvdmVyUGF1c2U6IHRydWUsXG4gICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNldCB1c2VyLWlucHV0dGVkIG9wdGlvbnMgaWYgYXZhaWxhYmxlXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBCaW5kaW5nXG4gICAgICAgIHRoaXMuX2hhbmRsZVByZXYgPSB0aGlzLl9oYW5kbGVQcmV2LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZU5leHQgPSB0aGlzLl9oYW5kbGVOZXh0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUF1dG9wbGF5ID0gdGhpcy5faGFuZGxlQXV0b3BsYXkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5faGFuZGxlQXV0b3BsYXlIb3ZlciA9IHRoaXMuX2hhbmRsZUF1dG9wbGF5SG92ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fY2hlY2tTaG91bGRFbmFibGVEZWJvdW5jZWQgPSBkZWJvdW5jZSh0aGlzLl9jaGVja1Nob3VsZEVuYWJsZS5iaW5kKHRoaXMpLCAyNTApO1xuICAgICAgICB0aGlzLl91cGRhdGVIZWlnaHREZWJvdW5jZWQgPSBkZWJvdW5jZSh0aGlzLl91cGRhdGVIZWlnaHQuYmluZCh0aGlzKSwgMjUwKTtcbiAgICAgICAgdGhpcy5fZ2VuZXJhdGVEb3RzRGVib3VuY2VkID0gZGVib3VuY2UodGhpcy5fZ2VuZXJhdGVEb3RzLmJpbmQodGhpcyksIDI1MCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbFBvc2l0aW9uID0gZGVib3VuY2UoKCkgPT4gdGhpcy5zY3JvbGxUb1NsaWRlKHRoaXMuYWN0aXZlU2xpZGUpLCAyNTApO1xuICAgICAgICB0aGlzLl9oYW5kbGVTY3JvbGwgPSBkZWJvdW5jZSh0aGlzLl9oYW5kbGVTY3JvbGwuYmluZCh0aGlzKSwgMTc1KTsgLy8gTWF5IGZpcmUgdHdpY2UgZGVwZW5kaW5nIG9uIGJyb3dzZXJcblxuICAgICAgICAvLyBJbml0aWFsaXplIHNsaWRlclxuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdCgpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNsaWRlciBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgZGVwZW5kaW5nIG9uIHNsaWRlcyBzaG93blxuICAgICAgICB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZSgpO1xuXG4gICAgICAgIC8vIEVuYWJsZS9kaXNhYmxlIHNsaWRlciBhZnRlciByZXNpemVcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkKTtcblxuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdpbml0Jywge1xuICAgICAgICAgICAgYTExeVNsaWRlcjogdGhpc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGVja1Nob3VsZEVuYWJsZSgpIHtcbiAgICAgICAgbGV0IHNob3VsZEVuYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAgICAgLy8gSWYgMSBvciBsZXNzIHNsaWRlcyBleGlzdCB0aGVuIGEgc2xpZGVyIGlzIG5vdCBuZWVkZWRcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzLmxlbmd0aCA8PSAxKSBzaG91bGRFbmFibGUgPSBmYWxzZTtcblxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gc2xpZGVzIG91dHNpZGUgdGhlIHNsaWRlcidzIHZpZXdwb3J0IGEgc2xpZGVyIGlzIG5vdCBuZWVkZWRcbiAgICAgICAgdGhpcy5fZ2V0QWN0aXZlQW5kVmlzaWJsZShudWxsLCAodmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSkgPT4ge1xuICAgICAgICAgICAgaWYgKHZpc2libGVTbGlkZXMubGVuZ3RoID09PSB0aGlzLnNsaWRlcy5sZW5ndGgpIHNob3VsZEVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJZiB1c2VyIGV4cGxpY2l0bHkgc2V0IGl0ZW1zIHRvIGJlIHNob3duIGFuZCBpdCdzIHRoZSBzYW1lIG51bWJlciBhcyBhdmFpbGFibGVcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzLmxlbmd0aCA9PT0gdGhpcy5vcHRpb25zLnNsaWRlc1RvU2hvdykgc2hvdWxkRW5hYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gRW5hYmxlL2Rpc2FibGUgc2xpZGVyIGJhc2VkIG9uIGFib3ZlIHJlcXVpcmVtZW50c1xuICAgICAgICBpZiAoc2hvdWxkRW5hYmxlICYmIHRoaXMuc2xpZGVyRW5hYmxlZCA9PT0gU2xpZGVyU3RhdGUuRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZVNsaWRlcigpO1xuICAgICAgICB9IGVsc2UgaWYgKCFzaG91bGRFbmFibGUgJiYgdGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5FbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlU2xpZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDdXN0b20gYnV0dG9ucyBzaG91bGQgYmUgaGlkZGVuIGlmIG5vdCBpbml0aWFsbHkgZW5hYmxlZFxuICAgICAgICBpZiAoIXNob3VsZEVuYWJsZSAmJiB0aGlzLl9oYXNDdXN0b21BcnJvd3MpIHtcbiAgICAgICAgICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMucHJldkFycm93LCBwcmV2QXJyb3cgPT4ge1xuICAgICAgICAgICAgICAgIHByZXZBcnJvdy5jbGFzc0xpc3QuYWRkKCdhMTF5LXNsaWRlci1oaWRlJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5uZXh0QXJyb3csIG5leHRBcnJvdyA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dEFycm93LmNsYXNzTGlzdC5hZGQoJ2ExMXktc2xpZGVyLWhpZGUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIC8vIEVuYWJsZSBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHNsaWRlci4gU2hvdWxkIG1pcnJvciBfZGlzYWJsZVNsaWRlcigpXG4gICAgcHJpdmF0ZSBfZW5hYmxlU2xpZGVyKCkge1xuICAgICAgICAvLyBTZXQgc2xpZGVyIHRvIGVuYWJsZWRcbiAgICAgICAgdGhpcy5zbGlkZXJFbmFibGVkID0gU2xpZGVyU3RhdGUuRW5hYmxlZDtcblxuICAgICAgICAvLyBGaXJlZm94IG1vdmVzIHRoZSBzbGlkZXIgZGVwZW5kaW5nIG9uIHBhZ2UgbG9hZCBzbyByZXNldHRpbmcgdG8gMFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgPSAwLCAxKTtcblxuICAgICAgICAvLyBBZGQgc2xpZGVyIGNvbnRhaW5lciB0byBET00gYW5kIG1vdmUgc2xpZGVyIGludG8gaXQgaWYgZW5hYmxlZFxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRoaXMuc2xpZGVyQ29udGFpbmVyKTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHRoaXMuc2xpZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBza2lwIGJ1dHRvbiBiZWZvcmUgc2xpZGVyIGlmIGVuYWJsZWRcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5za2lwQnRuKSB0aGlzLl9hZGRTa2lwQnRuKCk7XG5cbiAgICAgICAgLy8gSWYgcHJldi9uZXh0IGJ1dHRvbnMgYXJlIGVuYWJsZWQgYW5kIHVzZXIgaXNuJ3QgdXNpbmcgdGhlaXIgb3duIGFkZCBpdCB0byB0aGUgRE9NXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXJyb3dzICYmICF0aGlzLl9oYXNDdXN0b21BcnJvd3MpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJldkFycm93IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5vcHRpb25zLnByZXZBcnJvdyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubmV4dEFycm93IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5vcHRpb25zLm5leHRBcnJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQb3NzaWJsZSBmb3IgdGhlcmUgdG8gYmUgbXVsdGlwbGUgc28gbmVlZCB0byBsb29wIHRocm91Z2ggdGhlbSBhbGxcbiAgICAgICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2QXJyb3csIHByZXZBcnJvdyA9PiB7XG4gICAgICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBwcmV2L25leHQgYnV0dG9uc1xuICAgICAgICAgICAgcHJldkFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlUHJldiwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgICAgICAgcHJldkFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5faGFuZGxlUHJldiwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5faGFzQ3VzdG9tQXJyb3dzKSB7XG4gICAgICAgICAgICAgICAgLy8gVXNlciBnZW5lcmF0ZWQgYnV0dG9ucyBnZXQgc3BlY2lhbCBoaWRlIGNsYXNzIHJlbW92ZWRcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3cuY2xhc3NMaXN0LnJlbW92ZSgnYTExeS1zbGlkZXItaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBldmVyeUVsZW1lbnQodGhpcy5vcHRpb25zLm5leHRBcnJvdywgbmV4dEFycm93ID0+IHtcbiAgICAgICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHByZXYvbmV4dCBidXR0b25zXG4gICAgICAgICAgICBuZXh0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVOZXh0LCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgICAgICAgICBuZXh0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVOZXh0LCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9oYXNDdXN0b21BcnJvd3MpIHtcbiAgICAgICAgICAgICAgICAvLyBVc2VyIGdlbmVyYXRlZCBidXR0b25zIGdldCBzcGVjaWFsIGhpZGUgY2xhc3MgcmVtb3ZlZFxuICAgICAgICAgICAgICAgIG5leHRBcnJvdy5jbGFzc0xpc3QucmVtb3ZlKCdhMTF5LXNsaWRlci1oaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFkZCBkb3QgbmF2aWdhdGlvbiBpZiBlbmFibGVkXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZG90cykgdGhpcy5fZ2VuZXJhdGVEb3RzKCk7XG5cbiAgICAgICAgLy8gQWRkIGxpc3RlbmVyIGZvciB3aGVuIHRoZSBzbGlkZXIgc3RvcHMgbW92aW5nXG4gICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2hhbmRsZVNjcm9sbCwgZmFsc2UpO1xuXG4gICAgICAgIC8vIEFkZCBhbGwgQ1NTIG5lZWRlZFxuICAgICAgICB0aGlzLl9zZXRDU1MoKTtcblxuICAgICAgICAvLyBBZGFwdGl2ZSBoZWlnaHRcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gVXBkYXRlIHNsaWRlcidzIGhlaWdodCBiYXNlZCBvbiBjb250ZW50IG9mIHNsaWRlXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVIZWlnaHQodGhpcy5hY3RpdmVTbGlkZSk7XG5cbiAgICAgICAgICAgIC8vIEFsc28gYWRkIHJlc2l6ZSBsaXN0ZW5lciBmb3IgaXRcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVIZWlnaHREZWJvdW5jZWQuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGFydCBhdXRvcGxheSBpZiBlbmFibGVkXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b3BsYXkpIHRoaXMuX2VuYWJsZUF1dG9wbGF5KCk7XG5cbiAgICAgICAgLy8gT24gcmVzaXplIG1ha2Ugc3VyZSB0byB1cGRhdGUgc2Nyb2xsIHBvc2l0aW9uIGFzIGNvbnRlbnQgbWF5IGNoYW5nZSBpbiB3aWR0aC9oZWlnaHRcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3VwZGF0ZVNjcm9sbFBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBEaXNhYmxlIGFsbCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgc2xpZGVyLiBTaG91bGQgbWlycm9yIF9lbmFibGVTbGlkZXIoKVxuICAgIHByaXZhdGUgX2Rpc2FibGVTbGlkZXIoKSB7XG4gICAgICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9IFNsaWRlclN0YXRlLkRpc2FibGVkO1xuXG4gICAgICAgIC8vIFJlbW92ZSBzbGlkZXIgZnJvbSBhMTF5LXNsaWRlcidzIGNvbnRhaW5lciBhbmQgdGhlbiByZW1vdmUgY29udGFpbmVyIGZyb20gRE9NXG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHRoaXMuc2xpZGVyQ29udGFpbmVyKSkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRoaXMuc2xpZGVyKTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyLnBhcmVudE5vZGUgJiYgdGhpcy5zbGlkZXJDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNsaWRlckNvbnRhaW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgc2tpcCBidXR0b25cbiAgICAgICAgdGhpcy5fcmVtb3ZlU2tpcEJ0bigpO1xuXG4gICAgICAgIC8vIFBvc3NpYmxlIGZvciB0aGVyZSB0byBiZSBtdWx0aXBsZSBzbyBuZWVkIHRvIGxvb3AgdGhyb3VnaCB0aGVtIGFsbFxuICAgICAgICBldmVyeUVsZW1lbnQodGhpcy5vcHRpb25zLnByZXZBcnJvdywgcHJldkFycm93ID0+IHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgZm9yIHByZXYvbmV4dCBidXR0b25zXG4gICAgICAgICAgICBwcmV2QXJyb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVQcmV2KTtcbiAgICAgICAgICAgIHByZXZBcnJvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZVByZXYpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2hhc0N1c3RvbUFycm93cykge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgcmVtb3ZlIGdlbmVyYXRlZCBidXR0b25zLCBub3QgdXNlci1kZWZpbmVkIG9uZXNcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3cucGFyZW50Tm9kZSAmJiBwcmV2QXJyb3cucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwcmV2QXJyb3cpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBVc2VyIGdlbmVyYXRlZCBidXR0b25zIGdldCBzcGVjaWFsIGhpZGUgY2xhc3MgcmVtb3ZlZFxuICAgICAgICAgICAgICAgIHByZXZBcnJvdy5jbGFzc0xpc3QuYWRkKCdhMTF5LXNsaWRlci1oaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMubmV4dEFycm93LCBuZXh0QXJyb3cgPT4ge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmb3IgcHJldi9uZXh0IGJ1dHRvbnNcbiAgICAgICAgICAgIG5leHRBcnJvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZU5leHQpO1xuICAgICAgICAgICAgbmV4dEFycm93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5faGFuZGxlTmV4dCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5faGFzQ3VzdG9tQXJyb3dzKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSByZW1vdmUgZ2VuZXJhdGVkIGJ1dHRvbnMsIG5vdCB1c2VyLWRlZmluZWQgb25lc1xuICAgICAgICAgICAgICAgIG5leHRBcnJvdy5wYXJlbnROb2RlICYmIG5leHRBcnJvdy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5leHRBcnJvdyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFVzZXIgZ2VuZXJhdGVkIGJ1dHRvbnMgZ2V0IHNwZWNpYWwgaGlkZSBjbGFzcyByZW1vdmVkXG4gICAgICAgICAgICAgICAgbmV4dEFycm93LmNsYXNzTGlzdC5hZGQoJ2ExMXktc2xpZGVyLWhpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gV2lsbCByZW1vdmUgZG90cyBpZiB0aGV5IGV4aXN0XG4gICAgICAgIHRoaXMuX3JlbW92ZURvdHMoKTtcblxuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXIgZm9yIHdoZW4gdGhlIHNsaWRlciBzdG9wcyBtb3ZpbmdcbiAgICAgICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5faGFuZGxlU2Nyb2xsLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBDU1NcbiAgICAgICAgdGhpcy5fcmVtb3ZlQ1NTKCk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBhZGFwdGl2ZSBoZWlnaHQgZnVuY3Rpb25hbGl0eVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlSGVpZ2h0RGVib3VuY2VkKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlSGVpZ2h0KGZhbHNlKTtcblxuICAgICAgICAvLyBTdG9wIGF1dG9wbGF5IGlmIGVuYWJsZWRcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvcGxheSkgdGhpcy5fZGlzYWJsZUF1dG9wbGF5KCk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHNjcm9sbCBwb3NpdGlvbiB1cGRhdGUgY2hlY2tcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3VwZGF0ZVNjcm9sbFBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYWxsIENTUyBuZWVkZWQgZm9yIHRoZSBzbGlkZXIuIFNob3VsZCBtaXJyb3IgX3JlbW92ZUNTUygpXG4gICAgcHJpdmF0ZSBfc2V0Q1NTKGFjdGl2ZVNsaWRlPzogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgLy8gVXBkYXRlIGl0ZW1zXG4gICAgICAgIHRoaXMuX3VwZGF0ZUl0ZW1zQ1NTKCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHNsaWRlciBpbnN0YW5jZSB0byBnZXQgdGhlIGNvcnJlY3QgZWxlbWVudHNcbiAgICAgICAgdGhpcy5fZ2V0QWN0aXZlQW5kVmlzaWJsZShhY3RpdmVTbGlkZSB8fCBudWxsKTtcblxuICAgICAgICAvLyBBZGQgbWFpbiBzbGlkZXIgY2xhc3MgaWYgaXQgZG9lc24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCh0aGlzLl9zbGlkZXJDbGFzcyk7XG5cbiAgICAgICAgLy8gUmVzZXQgdGhlIG1vcmUgZHluYW1pYyBDU1MgZmlyc3QgaWYgaXQgZXhpc3RzXG4gICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRoaXMuc2xpZGVzKSB7XG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2FjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fdmlzaWJsZUNsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBpbiBhY3RpdmUgY2xhc3Nlc1xuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlLmNsYXNzTGlzdC5hZGQodGhpcy5fYWN0aXZlQ2xhc3MpO1xuXG4gICAgICAgIC8vIEFkZCBpbiB2aXNpYmxlIGNsYXNzZXNcbiAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGhpcy52aXNpYmxlU2xpZGVzKSB7XG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKHRoaXMuX3Zpc2libGVDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcmlnZ2VyIGRvdCB1cGRhdGVcbiAgICAgICAgdGhpcy5fdXBkYXRlRG90cyh0aGlzLmFjdGl2ZVNsaWRlKTtcblxuICAgICAgICAvLyBVcGRhdGUgYWxsIGExMXkgZnVuY3Rpb25hbGl0eVxuICAgICAgICB0aGlzLl9hZGRGb2N1c2FibGUoKTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYWxsIENTUyBuZWVkZWQgZm9yIHRoZSBzbGlkZXIuIFNob3VsZCBtaXJyb3IgX3NldENTUygpXG4gICAgcHJpdmF0ZSBfcmVtb3ZlQ1NTKCkge1xuICAgICAgICAvLyBSZW1vdmUgaXRlbSBDU1MgaWYgaXQgd2FzIHNldFxuICAgICAgICB0aGlzLl9yZW1vdmVJdGVtc0NTUygpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBjbGFzcyB0byBzbGlkZXJcbiAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zbGlkZXJDbGFzcyk7XG5cbiAgICAgICAgLy8gUmVzZXQgYWxsIHRoZSBkeW5hbWljIGNsYXNzZXNcbiAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGhpcy5zbGlkZXMpIHtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl92aXNpYmxlQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBhMTF5IGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgdGhpcy5fcmVtb3ZlRm9jdXNhYmxlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlSXRlbXNDU1MoKSB7XG4gICAgICAgIGlmIChpc0ludGVnZXIodGhpcy5vcHRpb25zLnNsaWRlc1RvU2hvdykpIHtcbiAgICAgICAgICAgIC8vIFBlcmNlbnRhZ2Ugd2lkdGggb2YgZWFjaCBzbGlkZVxuICAgICAgICAgICAgY29uc3Qgc2xpZGVXaWR0aCA9IDEwMCAvICh0aGlzLm9wdGlvbnMuc2xpZGVzVG9TaG93IGFzIG51bWJlcik7XG5cbiAgICAgICAgICAgIC8vIFNldCBzdHlsZXMgZm9yIHNsaWRlclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcblxuICAgICAgICAgICAgLy8gU2V0IHN0eWxlcyBmb3IgaXRlbXNcbiAgICAgICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRoaXMuc2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgc2xpZGUuc3R5bGUud2lkdGggPSBgJHtzbGlkZVdpZHRofSVgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVzZXQgZXZlcnl0aGluZyBpZiBudW1iZXIgb2YgaXRlbXMgbm90IGV4cGxpY2l0bHkgc2V0XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnZGlzcGxheScpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcykge1xuICAgICAgICAgICAgICAgIHNsaWRlLnN0eWxlLnJlbW92ZVByb3BlcnR5KCd3aWR0aCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgaXRlbSBzdHlsaW5nIGV2ZW4gaWYgZXhwbGljaXRseSBzZXQgaW4gdGhlIG9wdGlvbnNcbiAgICBwcml2YXRlIF9yZW1vdmVJdGVtc0NTUygpIHtcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2Rpc3BsYXknKTtcblxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcykge1xuICAgICAgICAgICAgc2xpZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3dpZHRoJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlcyBvbmx5IHRoZSB2aXNpYmxlIGl0ZW1zIGZvY3VzYWJsZSBhbmQgcmVhZGFibGUgYnkgc2NyZWVucmVhZGVycy4gU2hvdWxkIG1pcnJvciBfcmVtb3ZlQTExWSgpXG4gICAgcHJpdmF0ZSBfYWRkRm9jdXNhYmxlKCkge1xuICAgICAgICAvLyBSZXNldCBhbGwgYTExeSBmdW5jdGlvbmFsaXR5IHRvIGRlZmF1bHQgYmVmb3JlaGFuZFxuICAgICAgICB0aGlzLl9yZW1vdmVGb2N1c2FibGUoKTtcblxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcykge1xuICAgICAgICAgICAgY29uc3QgZm9jdXNhYmxlSXRlbXMgPSBzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzYWJsZSk7XG5cbiAgICAgICAgICAgIC8vIElmIHNsaWRlIGlzIG5vdCB2aXNpYmxlIG1ha2UgdGhlIHNsaWRlIHdyYXBwZXIgbm90IGZvY3VzYWJsZVxuICAgICAgICAgICAgaWYgKCFzbGlkZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5fdmlzaWJsZUNsYXNzKSkge1xuICAgICAgICAgICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgICAgICAgICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgZm9jdXNhYmxlSXRlbSBvZiBmb2N1c2FibGVJdGVtcykge1xuICAgICAgICAgICAgICAgIGlmICghc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuX3Zpc2libGVDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlSXRlbS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgYTExeSBhdHRyaWJ1dGVzIGZvciBzbGlkZSB3cmFwcGVyLiBTaG91bGQgbWlycm9yIF9hZGRBMTFZKClcbiAgICBwcml2YXRlIF9yZW1vdmVGb2N1c2FibGUoKSB7XG4gICAgICAgIGZvciAobGV0IHNsaWRlIG9mIHRoaXMuc2xpZGVzKSB7XG4gICAgICAgICAgICBjb25zdCBmb2N1c2FibGVJdGVtcyA9IHNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNhYmxlKTtcblxuICAgICAgICAgICAgLy8gUmVtb3ZlIGExMXkgZm9yIGVhY2ggc2xpZGUgd3JhcHBlclxuICAgICAgICAgICAgc2xpZGUucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICAgICAgc2xpZGUucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuXG4gICAgICAgICAgICAvLyBSZXNldCBhMTF5IGF0dHJpYnV0ZXMgZm9yIHNsaWRlIGlubmVyIGVsZW1lbnRzXG4gICAgICAgICAgICBmb3IgKGxldCBmb2N1c2FibGVJdGVtIG9mIGZvY3VzYWJsZUl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgZm9jdXNhYmxlSXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRTa2lwQnRuKCkge1xuICAgICAgICBjb25zdCBiZWZvcmVFbCA9IGNyZWF0ZUVsZW1lbnQoYDxidXR0b24gY2xhc3M9XCJhMTF5LXNsaWRlci1zci1vbmx5XCIgdHlwZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiPkNsaWNrIHRvIHNraXAgc2xpZGVyIGNhcm91c2VsPC9idXR0b24+YCk7XG4gICAgICAgIGNvbnN0IGFmdGVyRWwgPSBjcmVhdGVFbGVtZW50KGA8ZGl2IGNsYXNzPVwiYTExeS1zbGlkZXItc3Itb25seVwiIHRhYmluZGV4PVwiLTFcIj5FbmQgb2Ygc2xpZGVyIGNhcm91c2VsPC9kaXY+YCk7XG5cbiAgICAgICAgLy8gRXZlbnQgaGFuZGxlciB0byBnbyB0byBlbmRcbiAgICAgICAgY29uc3QgZm9jdXNFbmQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoYTExeUNsaWNrKGV2ZW50KSA9PT0gdHJ1ZSkgYWZ0ZXJFbC5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICBiZWZvcmVFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZvY3VzRW5kLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgICAgIGJlZm9yZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZm9jdXNFbmQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgICAvLyBBZGQgdG8gRE9NXG4gICAgICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBiZWZvcmVFbCk7XG4gICAgICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBhZnRlckVsKTtcblxuICAgICAgICAvLyBJZiBza2lwIGJ1dHRvbnMgZXhpc3QgZm9yIHdoYXRldmVyIHJlYXNvbiwgZW1wdHkgYXJyYXlcbiAgICAgICAgdGhpcy5fc2tpcEJ0bnMgPSBbXTtcblxuICAgICAgICAvLyBBZGQgbmV3bHkgY3JlYXRlZCBidXR0b25zIHRvIGxpYnJhcnkgc2NvcGVcbiAgICAgICAgdGhpcy5fc2tpcEJ0bnMucHVzaChiZWZvcmVFbCwgYWZ0ZXJFbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZlU2tpcEJ0bigpIHtcbiAgICAgICAgZXZlcnlFbGVtZW50KHRoaXMuX3NraXBCdG5zLCBza2lwQnRuID0+IHtcbiAgICAgICAgICAgIHNraXBCdG4ucGFyZW50Tm9kZSAmJiBza2lwQnRuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2tpcEJ0bik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dlbmVyYXRlRG90cygpIHtcbiAgICAgICAgLy8gUmVtb3ZlIGRvdHMgaWYgdGhleSBhbHJlYWR5IGV4aXN0XG4gICAgICAgIHRoaXMuX3JlbW92ZURvdHMoKTtcblxuICAgICAgICAvLyBTdG9wIGlmIHNsaWRlciBpcyBkaXNhYmxlZFxuICAgICAgICBpZiAodGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5EaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIENyZWF0ZSA8dWw+IHdyYXBwZXIgZm9yIGRvdHNcbiAgICAgICAgdGhpcy5kb3RzID0gY3JlYXRlRWxlbWVudChgPHVsIGNsYXNzPVwiJHt0aGlzLl9kb3RzQ2xhc3N9XCI+PC91bD5gKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2dldERvdENvdW50KCk7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZG90TGkgPSBjcmVhdGVFbGVtZW50KCc8bGk+PC9saT4nKTtcbiAgICAgICAgICAgIGNvbnN0IGRvdEJ0biA9IGNyZWF0ZUVsZW1lbnQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPicpO1xuXG4gICAgICAgICAgICAvLyBBZGQgdGV4dFxuICAgICAgICAgICAgZG90QnRuLnRleHRDb250ZW50ID0gYE1vdmUgc2xpZGVyIHRvIGl0ZW0gIyR7aSArIDF9YDtcblxuICAgICAgICAgICAgLy8gRXZlbnQgaGFuZGxlcnMgdG8gc3dpdGNoIHRvIHNsaWRlXG4gICAgICAgICAgICBjb25zdCBzd2l0Y2hUb1NsaWRlID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhMTF5Q2xpY2soZXZlbnQpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEdvIHRvIHNsaWRlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9TbGlkZSh0aGlzLnNsaWRlc1tpXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRGlzYWJsZSBhdXRvcGxheSBpZiBlbmFibGVkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvZ2dsZUF1dG9wbGF5KEF1dG9wbGF5U3dpdGNoLkRpc2FibGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgICAgZG90QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpdGNoVG9TbGlkZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgICAgICAgZG90QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgc3dpdGNoVG9TbGlkZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgICAgICAgICAvLyBBcHBlbmQgdG8gVUxcbiAgICAgICAgICAgIGRvdExpLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZG90QnRuKTtcbiAgICAgICAgICAgIHRoaXMuZG90cy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRvdExpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSBzdHlsZXMgb2YgZG90cyBiZWZvcmUgYWRkaW5nIHRvIERPTVxuICAgICAgICB0aGlzLl91cGRhdGVEb3RzKHRoaXMuYWN0aXZlU2xpZGUpO1xuXG4gICAgICAgIC8vIEFkZCBkb3RzIFVMIHRvIERPTVxuICAgICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgdGhpcy5kb3RzKTtcblxuICAgICAgICAvLyBEb3RzIG5lZWRlZCBtYXkgY2hhbmdlIG9uIHNjcmVlbiBzaXplIHNvIHJlZ2VuZXJhdGUgdGhlbSBmcm9tIHNjcmF0Y2hcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2dlbmVyYXRlRG90c0RlYm91bmNlZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RG90Q291bnQoKSB7XG4gICAgICAgIGxldCB0b3RhbFNsaWRlczogbnVtYmVyID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgICAgICBsZXQgc2xpZGVzVG9TaG93OiBudW1iZXIgPSB0aGlzLm9wdGlvbnMuc2xpZGVzVG9TaG93IHx8IHRoaXMudmlzaWJsZVNsaWRlcy5sZW5ndGg7XG4gICAgICAgIGxldCBkb3RzOiBudW1iZXIgPSB0b3RhbFNsaWRlcyAtIHNsaWRlc1RvU2hvdyArIDE7XG5cbiAgICAgICAgcmV0dXJuIGRvdHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZlRG90cygpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2dlbmVyYXRlRG90c0RlYm91bmNlZCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZG90cyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmRvdHMucGFyZW50Tm9kZSAmJiB0aGlzLmRvdHMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRvdHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlRG90cyhhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZG90cyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGFjdGl2ZVNsaWRlLnBhcmVudE5vZGUgJiYgYWN0aXZlU2xpZGUucGFyZW50Tm9kZS5jaGlsZHJlbiwgYWN0aXZlU2xpZGUpO1xuXG4gICAgICAgICAgICAvLyBTZXQgZG90IHRvIGxhc3QgaXRlbSBpZiBhY3RpdmUgaW5kZXggaXMgaGlnaGVyIHRoYW4gYW1vdW50XG4gICAgICAgICAgICBpZiAoYWN0aXZlSW5kZXggPiB0aGlzLmRvdHMuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXggPSB0aGlzLmRvdHMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmVzZXQgY2hpbGRyZW4gYWN0aXZlIGNsYXNzIGlmIGV4aXN0XG4gICAgICAgICAgICBmb3IgKGxldCBkb3Qgb2YgdGhpcy5kb3RzLmNoaWxkcmVuKSBkb3QucXVlcnlTZWxlY3RvcignYnV0dG9uJykhLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAvLyBBZGQgY2xhc3MgdG8gYWN0aXZlIGRvdFxuICAgICAgICAgICAgdGhpcy5kb3RzLmNoaWxkcmVuW2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKSEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9lbmFibGVBdXRvcGxheSgpIHtcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgYXV0b3BsYXlcbiAgICAgICAgdGhpcy5fYXV0b3BsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBdXRvcGxheSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLl9hdXRvcGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZUF1dG9wbGF5LCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvcGxheUhvdmVyUGF1c2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9oYW5kbGVBdXRvcGxheUhvdmVyLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5faGFuZGxlQXV0b3BsYXlIb3ZlciwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGF1dG9wbGF5IHRvZ2dsZSBidXR0b24gdG8gRE9NXG4gICAgICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCB0aGlzLl9hdXRvcGxheUJ0bik7XG5cbiAgICAgICAgLy8gU3RhcnQgYXV0b3BsYXlpbmdcbiAgICAgICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRW5hYmxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlQXV0b3BsYXkoKSB7XG4gICAgICAgIC8vIFN0b3AgYXV0b3BsYXlpbmdcbiAgICAgICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmb3IgYXV0b3BsYXlcbiAgICAgICAgdGhpcy5fYXV0b3BsYXlCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBdXRvcGxheSk7XG4gICAgICAgIHRoaXMuX2F1dG9wbGF5QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5faGFuZGxlQXV0b3BsYXkpO1xuICAgICAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5faGFuZGxlQXV0b3BsYXlIb3Zlcik7XG4gICAgICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9oYW5kbGVBdXRvcGxheUhvdmVyKTtcblxuICAgICAgICAvLyBSZW1vdmUgdG9nZ2xlIGJ1dHRvbiBmcm9tIERPTVxuICAgICAgICB0aGlzLl9hdXRvcGxheUJ0bi5wYXJlbnROb2RlICYmIHRoaXMuX2F1dG9wbGF5QnRuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fYXV0b3BsYXlCdG4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RvZ2dsZUF1dG9wbGF5KHNldFN0YXRlOiBBdXRvcGxheVN3aXRjaCkge1xuICAgICAgICBjb25zdCBzdGFydEF1dG9wbGF5aW5nID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gU3RhcnQgYXV0b3BsYXlpbmdcbiAgICAgICAgICAgIHRoaXMuX2F1dG9wbGF5VGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dvUHJldk9yTmV4dChTbGlkZURpcmVjdGlvbi5OZXh0KTtcbiAgICAgICAgICAgIH0sIHRoaXMub3B0aW9ucy5hdXRvcGxheVNwZWVkKTtcblxuICAgICAgICAgICAgLy8gU2V0IGF1dG9wbGF5IGJ1dHRvbiBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5fYXV0b3BsYXlCdG4uc2V0QXR0cmlidXRlKCdkYXRhLWF1dG9wbGF5aW5nJywgJ3RydWUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0b3BBdXRvcGxheWluZyA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIFN0b3AgYXV0b3BsYXlpbmdcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX2F1dG9wbGF5VGltZXIpO1xuXG4gICAgICAgICAgICAvLyBSZXNldCBhdXRvcGxheSB0aW1lclxuICAgICAgICAgICAgdGhpcy5fYXV0b3BsYXlUaW1lciA9IElzQXV0b3BsYXlpbmcuTm87XG5cbiAgICAgICAgICAgIC8vIFNldCBhdXRvcGxheSBidXR0b24gc3RhdGVcbiAgICAgICAgICAgIHRoaXMuX2F1dG9wbGF5QnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1hdXRvcGxheWluZycsICdmYWxzZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldFN0YXRlID09PSBBdXRvcGxheVN3aXRjaC5FbmFibGUpIHtcbiAgICAgICAgICAgIHN0YXJ0QXV0b3BsYXlpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmIChzZXRTdGF0ZSA9PT0gQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSkge1xuICAgICAgICAgICAgc3RvcEF1dG9wbGF5aW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nb1ByZXZPck5leHQoZGlyZWN0aW9uOiBTbGlkZURpcmVjdGlvbikge1xuICAgICAgICB0aGlzLl9nZXRBY3RpdmVBbmRWaXNpYmxlKG51bGwsICh2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdLCBhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0U2xpZGUgPSB0aGlzLnNsaWRlci5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTbGlkZSA9IHRoaXMuc2xpZGVyLmxhc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBmaXJzdFZpc2libGVTbGlkZSA9IHZpc2libGVTbGlkZXNbMF07XG4gICAgICAgICAgICBjb25zdCBsYXN0VmlzaWJsZVNsaWRlID0gdmlzaWJsZVNsaWRlc1t2aXNpYmxlU2xpZGVzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBTbGlkZURpcmVjdGlvbi5OZXh0KSB7XG4gICAgICAgICAgICAgICAgLy8gV3JhcCB0byB0aGUgZmlyc3Qgc2xpZGUgaWYgd2UncmUgY3VycmVudGx5IG9uIHRoZSBsYXN0XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RWaXNpYmxlU2xpZGUgPT09IGxhc3RTbGlkZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvU2xpZGUoZmlyc3RTbGlkZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NsaWRlKGFjdGl2ZVNsaWRlICYmIGFjdGl2ZVNsaWRlLm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFNsaWRlRGlyZWN0aW9uLlByZXYpIHtcbiAgICAgICAgICAgICAgICAvLyBXcmFwIHRvIHRoZSBsYXN0IHNsaWRlIGlmIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgZmlyc3RcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RWaXNpYmxlU2xpZGUgPT09IGZpcnN0U2xpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NsaWRlKGxhc3RTbGlkZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NsaWRlKGFjdGl2ZVNsaWRlICYmIGFjdGl2ZVNsaWRlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZXMgc2xpZGVyIHRvIHRhcmdldCBlbGVtZW50XG4gICAgICovXG4gICAgcHVibGljIHNjcm9sbFRvU2xpZGUodGFyZ2V0U2xpZGU6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG1vZGVybkJyb3dzZXI6IGJvb2xlYW4gPSAhIUhUTUxFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxUbztcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxQb3NpdGlvbiA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XG5cbiAgICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2JlZm9yZUNoYW5nZScsIHtcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5hY3RpdmVTbGlkZSxcbiAgICAgICAgICAgIG5leHRTbGlkZTogdGFyZ2V0U2xpZGUsXG4gICAgICAgICAgICBhMTF5U2xpZGVyOiB0aGlzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBzbGlkZXIncyBoZWlnaHQgYmFzZWQgb24gY29udGVudCBvZiBzbGlkZVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlKSB0aGlzLl91cGRhdGVIZWlnaHQodGFyZ2V0U2xpZGUpO1xuXG4gICAgICAgIC8vIE1vdmUgc2xpZGVyIHRvIHNwZWNpZmljIGl0ZW1cbiAgICAgICAgaWYgKG1vZGVybkJyb3dzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnNjcm9sbCh7XG4gICAgICAgICAgICAgICAgbGVmdDogdGFyZ2V0U2xpZGUub2Zmc2V0TGVmdCxcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCA9IHRhcmdldFNsaWRlLm9mZnNldExlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgc2xpZGVyIGRpZG4ndCBtb3ZlIG1ha2Ugc3VyZSB0byB1cGRhdGUgdGhlIHNsaWRlciBzdGlsbFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5zY3JvbGxMZWZ0ID09PSBvcmlnaW5hbFBvc2l0aW9uICYmXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5FbmFibGVkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRDU1ModGFyZ2V0U2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA1MCk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBkb3QgdXBkYXRlXG4gICAgICAgIHRoaXMuX3VwZGF0ZURvdHModGFyZ2V0U2xpZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgb3B0aW9ucyBvbiB0aGUgc2xpZGVyIGluc3RhbmNlXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZU9wdGlvbnMob3B0aW9uczogT3B0aW9ucykge1xuICAgICAgICAvLyBBc3NpZ24gbmV3IG9wdGlvbnNcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIFJlLXJ1biB0aGUgaW5pdGlhbCBlbmFibGUgc2xpZGVyIG9wdGlvblxuICAgICAgICB0aGlzLl9kaXNhYmxlU2xpZGVyKCk7XG4gICAgICAgIHRoaXMuX2NoZWNrU2hvdWxkRW5hYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgZWxlbWVudCBpcyBwYXNzZWQgc2xpZGVyJ3MgaGVpZ2h0IHdpbGwgbWF0Y2hcbiAgICAgKiAgaXQgb3RoZXJ3aXNlIHRoZSBoZWlnaHQgb2YgdGhlIHNsaWRlciBpcyByZW1vdmVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgX3VwZGF0ZUhlaWdodCh0YXJnZXQ6IEhUTUxFbGVtZW50IHwgZmFsc2UpIHtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRIZWlnaHQgPSBnZXRTdWJwaXhlbFN0eWxlKHRhcmdldCwgJ2hlaWdodCcpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0SGVpZ2h0fXB4YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlZnJlc2hIZWlnaHQoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUhlaWdodCh0aGlzLmFjdGl2ZVNsaWRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRBY3RpdmVBbmRWaXNpYmxlKGV4cGxpY2l0QWN0aXZlOiBIVE1MRWxlbWVudCB8IG51bGwsIGNhbGxiYWNrPzogQWN0aXZlVmlzaWJsZVNsaWRlcykge1xuICAgICAgICBsZXQgdmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAvLyBiZXR0ZXIgY3Jvc3MgYnJvd3NlciBzdXBwb3J0IGJ5IGdldHRpbmcgc3VicGl4ZWxzIHRoZW4gcm91bmRpbmdcbiAgICAgICAgY29uc3Qgc2xpZGVyV2lkdGggPSBNYXRoLnJvdW5kKHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKTtcbiAgICAgICAgLy8gQWRkIGEgMSBwaXhlbCBidWZmZXIgc28gdGhhdCBzdWJwaXhlbHMgYXJlIG1vcmUgY29uc2lzdGVudCBjcm9zcy1icm93c2VyXG4gICAgICAgIGNvbnN0IHNsaWRlclBvc2l0aW9uID0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCAtIDEgPCAwID8gMSA6IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgLSAxO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2xpZGVyLCBzbGlkZXJXaWR0aCwgc2xpZGVyUG9zaXRpb24pO1xuXG4gICAgICAgIC8vIE9ubHkgZGV0ZWN0cyBpdGVtcyBpbiB0aGUgdmlzaWJsZSB2aWV3cG9ydCBvZiB0aGUgcGFyZW50IGVsZW1lbnRcbiAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGhpcy5zbGlkZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlT2Zmc2V0ID0gc2xpZGUub2Zmc2V0TGVmdDtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coc2xpZGVPZmZzZXQpO1xuXG4gICAgICAgICAgICBpZiAoc2xpZGVPZmZzZXQgPj0gc2xpZGVyUG9zaXRpb24gJiYgc2xpZGVPZmZzZXQgPCAoc2xpZGVyUG9zaXRpb24gKyBzbGlkZXJXaWR0aCkpIHtcbiAgICAgICAgICAgICAgICB2aXNpYmxlU2xpZGVzLnB1c2goc2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aXNpYmxlU2xpZGVzID0gdmlzaWJsZVNsaWRlcztcblxuICAgICAgICBjb25zb2xlLmxvZygndmlzaWJsZScsIHRoaXMudmlzaWJsZVNsaWRlcyk7XG5cbiAgICAgICAgaWYgKGV4cGxpY2l0QWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gZXhwbGljaXRBY3RpdmU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB0aGlzLnZpc2libGVTbGlkZXNbTWF0aC5mbG9vcigodGhpcy52aXNpYmxlU2xpZGVzLmxlbmd0aCAtIDEpIC8gMildO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IHZpc2libGVTbGlkZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh0aGlzLnZpc2libGVTbGlkZXMsIHRoaXMuYWN0aXZlU2xpZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hhbmRsZVByZXYoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmIChhMTF5Q2xpY2soZXZlbnQpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBHbyB0byBwcmV2aW91cyBzbGlkZVxuICAgICAgICAgICAgdGhpcy5fZ29QcmV2T3JOZXh0KFNsaWRlRGlyZWN0aW9uLlByZXYpO1xuXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGF1dG9wbGF5IGlmIG9uZ29pbmdcbiAgICAgICAgICAgIHRoaXMuX3RvZ2dsZUF1dG9wbGF5KEF1dG9wbGF5U3dpdGNoLkRpc2FibGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFuZGxlTmV4dChldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKGExMXlDbGljayhldmVudCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIEdvIHRvIG5leHQgc2xpZGVcbiAgICAgICAgICAgIHRoaXMuX2dvUHJldk9yTmV4dChTbGlkZURpcmVjdGlvbi5OZXh0KTtcblxuICAgICAgICAgICAgLy8gRGlzYWJsZSBhdXRvcGxheSBpZiBvbmdvaW5nXG4gICAgICAgICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5EaXNhYmxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2hhbmRsZUF1dG9wbGF5KGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoYTExeUNsaWNrKGV2ZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2F1dG9wbGF5VGltZXIgPT09IElzQXV0b3BsYXlpbmcuTm8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5FbmFibGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5EaXNhYmxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYW5kbGVBdXRvcGxheUhvdmVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNlZW50ZXJcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2F1dG9wbGF5VGltZXIgIT09IElzQXV0b3BsYXlpbmcuTm8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5EaXNhYmxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXVzZU9uTW91c2VMZWF2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gXCJtb3VzZWxlYXZlXCIgJiYgdGhpcy5fcGF1c2VPbk1vdXNlTGVhdmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hdXRvcGxheVRpbWVyID09PSBJc0F1dG9wbGF5aW5nLk5vKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRW5hYmxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXVzZU9uTW91c2VMZWF2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFuZGxlU2Nyb2xsKCkge1xuICAgICAgICAvLyBVcGRhdGUgQ1NTXG4gICAgICAgIHRoaXMuX3NldENTUygpO1xuXG4gICAgICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudFxuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdhZnRlckNoYW5nZScsIHtcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5hY3RpdmVTbGlkZSxcbiAgICAgICAgICAgIGExMXlTbGlkZXI6IHRoaXNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzcGF0Y2hFdmVudChldmVudE5hbWU6IHN0cmluZywgZGV0YWlsOiBvYmplY3QpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBjcm9zc0N1c3RvbUV2ZW50KGV2ZW50TmFtZSwgeyBkZXRhaWwgfSk7XG5cbiAgICAgICAgdGhpcy5zbGlkZXIuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTnVrZSB0aGUgc2xpZGVyXG4gICAgICovXG4gICAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgICAgIC8vIFVuZG9zIGV2ZXJ5dGhpbmcgZnJvbSBfZW5hYmxlU2xpZGVyKClcbiAgICAgICAgdGhpcy5fZGlzYWJsZVNsaWRlcigpO1xuXG4gICAgICAgIC8vIFVuZG9zIGV2ZXJ5dGhpbmcgZnJvbSBpbml0KClcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkKTtcblxuICAgICAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnRcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnZGVzdHJveScsIHtcbiAgICAgICAgICAgIGExMXlTbGlkZXI6IHRoaXNcbiAgICAgICAgfSk7XG4gICAgfVxufSJdLCJuYW1lcyI6WyJnbG9iYWwiLCJjbGFzc29mIiwiSW5kZXhlZE9iamVjdCIsImRvY3VtZW50IiwiREVTQ1JJUFRPUlMiLCJjcmVhdGVFbGVtZW50IiwiSUU4X0RPTV9ERUZJTkUiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSIsImRlZmluZVByb3BlcnR5TW9kdWxlIiwic3RvcmUiLCJXZWFrTWFwIiwiaGFzIiwiTkFUSVZFX1dFQUtfTUFQIiwib2JqZWN0SGFzIiwiSW50ZXJuYWxTdGF0ZU1vZHVsZSIsIm1pbiIsInJlcXVpcmUkJDAiLCJoaWRkZW5LZXlzIiwiaW50ZXJuYWxPYmplY3RLZXlzIiwiZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSIsImdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzRm9yY2VkIiwiTkFUSVZFX1NZTUJPTCIsImRlZmluZVByb3BlcnRpZXMiLCJ0b1N0cmluZyIsIlN5bWJvbCIsIlVTRV9TWU1CT0xfQVNfVUlEIiwid3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSIsImRlZmluZVByb3BlcnR5IiwiYUZ1bmN0aW9uIiwiY3JlYXRlTWV0aG9kIiwiYmluZCIsIlBST1RPVFlQRSIsIm5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIm5hdGl2ZURlZmluZVByb3BlcnR5IiwibmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyIsImdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbCIsIm5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlIiwiV2VsbEtub3duU3ltYm9sc1N0b3JlIiwibmF0aXZlT2JqZWN0Q3JlYXRlIiwiJCIsImNyZWF0ZSIsIklFX1BST1RPIiwiT2JqZWN0UHJvdG90eXBlIiwiQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSIiwiZ2V0UHJvdG90eXBlT2YiLCJJdGVyYXRvclByb3RvdHlwZSIsIkl0ZXJhdG9yc0NvcmUiLCJCVUdHWV9TQUZBUklfSVRFUkFUT1JTIiwiSVRFUkFUT1IiLCJyZXR1cm5UaGlzIiwic2V0UHJvdG90eXBlT2YiLCJzZXRJbnRlcm5hbFN0YXRlIiwiZ2V0SW50ZXJuYWxTdGF0ZSIsImFzc2lnbiIsIlRPX1NUUklOR19UQUciLCJUT19TVFJJTkdfVEFHX1NVUFBPUlQiLCJBcnJheUl0ZXJhdG9yTWV0aG9kcyIsIkRPTUl0ZXJhYmxlcyIsImh0bWwiLCJET01QYXJzZXIiLCJwYXJzZUZyb21TdHJpbmciLCJib2R5IiwiZmlyc3RDaGlsZCIsImExMXlDbGljayIsImV2ZW50IiwiY29kZSIsImNoYXJDb2RlIiwia2V5Q29kZSIsInR5cGUiLCJwcmV2ZW50RGVmYXVsdCIsImNyb3NzQ3VzdG9tRXZlbnQiLCJwYXJhbXMiLCJldnQiLCJjcmVhdGVFdmVudCIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiZGV0YWlsIiwidW5kZWZpbmVkIiwiaW5pdEN1c3RvbUV2ZW50IiwiaXNJbnRlZ2VyIiwidmFsdWUiLCJpc0Zpbml0ZSIsIk1hdGgiLCJmbG9vciIsImV2ZXJ5RWxlbWVudCIsImVsZW1lbnRzIiwiY2FsbGJhY2siLCJlbHMiLCJIVE1MRWxlbWVudCIsImVsIiwiZ2V0U3VicGl4ZWxTdHlsZSIsImVsZW1lbnQiLCJzdHlsZSIsInN0eWxlcyIsIkhBU19DT01QVVRFRF9TVFlMRSIsIndpbmRvdyIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRTdHlsZXMiLCJDT01QVVRFRF9TSVpFX0lOQ0xVREVTX1BBRERJTkciLCJwYXJlbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJlIiwiY3NzVGV4dCIsImFwcGVuZENoaWxkIiwid2lkdGgiLCJyZXQiLCJyZW1vdmVDaGlsZCIsImdldE51bWJlclN0eWxlIiwiZWxTdHlsZSIsImVsU3R5bGVzIiwiZ2V0RmxvYXQiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImJvcmRlckxlZnRXaWR0aCIsImJvcmRlclJpZ2h0V2lkdGgiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsImJvcmRlclRvcFdpZHRoIiwiYm9yZGVyQm90dG9tV2lkdGgiLCJpc051bWJlciIsIm4iLCJpc05hTiIsInBhcnNlRmxvYXQiLCJTbGlkZURpcmVjdGlvbiIsIlNsaWRlclN0YXRlIiwiQXV0b3BsYXlTd2l0Y2giLCJJc0F1dG9wbGF5aW5nIiwiQTExWVNsaWRlciIsIm9wdGlvbnMiLCJzbGlkZXIiLCJzbGlkZXMiLCJjaGlsZHJlbiIsInNsaWRlckNvbnRhaW5lciIsIl9hY3RpdmVDbGFzcyIsIl92aXNpYmxlQ2xhc3MiLCJfZG90c0NsYXNzIiwiX3NsaWRlckNsYXNzIiwiX2ZvY3VzYWJsZSIsIl9hdXRvcGxheVRpbWVyIiwiTm8iLCJfYXV0b3BsYXlCdG4iLCJfcGF1c2VPbk1vdXNlTGVhdmUiLCJfc2tpcEJ0bnMiLCJkb3RzIiwiYWN0aXZlU2xpZGUiLCJ2aXNpYmxlU2xpZGVzIiwic2xpZGVyRW5hYmxlZCIsIkRpc2FibGVkIiwiX2hhc0N1c3RvbUFycm93cyIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImNvbnRhaW5lciIsImFycm93cyIsImFkYXB0aXZlSGVpZ2h0Iiwic2tpcEJ0biIsInNsaWRlc1RvU2hvdyIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5SG92ZXJQYXVzZSIsImNlbnRlck1vZGUiLCJPYmplY3QiLCJfaGFuZGxlUHJldiIsIl9oYW5kbGVOZXh0IiwiX2hhbmRsZUF1dG9wbGF5IiwiX2hhbmRsZUF1dG9wbGF5SG92ZXIiLCJfY2hlY2tTaG91bGRFbmFibGVEZWJvdW5jZWQiLCJkZWJvdW5jZSIsIl9jaGVja1Nob3VsZEVuYWJsZSIsIl91cGRhdGVIZWlnaHREZWJvdW5jZWQiLCJfdXBkYXRlSGVpZ2h0IiwiX2dlbmVyYXRlRG90c0RlYm91bmNlZCIsIl9nZW5lcmF0ZURvdHMiLCJfdXBkYXRlU2Nyb2xsUG9zaXRpb24iLCJzY3JvbGxUb1NsaWRlIiwiX2hhbmRsZVNjcm9sbCIsIl9pbml0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9kaXNwYXRjaEV2ZW50IiwiYTExeVNsaWRlciIsInNob3VsZEVuYWJsZSIsImxlbmd0aCIsIl9nZXRBY3RpdmVBbmRWaXNpYmxlIiwiX2VuYWJsZVNsaWRlciIsIkVuYWJsZWQiLCJfZGlzYWJsZVNsaWRlciIsImNsYXNzTGlzdCIsImFkZCIsInNldFRpbWVvdXQiLCJzY3JvbGxMZWZ0IiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiX2FkZFNraXBCdG4iLCJwYXNzaXZlIiwicmVtb3ZlIiwiX3NldENTUyIsIl9lbmFibGVBdXRvcGxheSIsImNvbnRhaW5zIiwicGFyZW50Tm9kZSIsIl9yZW1vdmVTa2lwQnRuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl9yZW1vdmVEb3RzIiwiX3JlbW92ZUNTUyIsIl9kaXNhYmxlQXV0b3BsYXkiLCJfdXBkYXRlSXRlbXNDU1MiLCJzbGlkZSIsIl91cGRhdGVEb3RzIiwiX2FkZEZvY3VzYWJsZSIsIl9yZW1vdmVJdGVtc0NTUyIsIl9yZW1vdmVGb2N1c2FibGUiLCJzbGlkZVdpZHRoIiwiZGlzcGxheSIsInJlbW92ZVByb3BlcnR5IiwiZm9jdXNhYmxlSXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2V0QXR0cmlidXRlIiwiZm9jdXNhYmxlSXRlbSIsInJlbW92ZUF0dHJpYnV0ZSIsImJlZm9yZUVsIiwiYWZ0ZXJFbCIsImZvY3VzRW5kIiwiZm9jdXMiLCJwdXNoIiwiaSIsImRvdExpIiwiZG90QnRuIiwidGV4dENvbnRlbnQiLCJzd2l0Y2hUb1NsaWRlIiwiX3RvZ2dsZUF1dG9wbGF5IiwiRGlzYWJsZSIsIl9nZXREb3RDb3VudCIsInRvdGFsU2xpZGVzIiwiYWN0aXZlSW5kZXgiLCJBcnJheSIsInByb3RvdHlwZSIsImluZGV4T2YiLCJjYWxsIiwiZG90IiwicXVlcnlTZWxlY3RvciIsIkVuYWJsZSIsInNldFN0YXRlIiwic3RhcnRBdXRvcGxheWluZyIsInNldEludGVydmFsIiwiX2dvUHJldk9yTmV4dCIsIk5leHQiLCJzdG9wQXV0b3BsYXlpbmciLCJjbGVhckludGVydmFsIiwiZGlyZWN0aW9uIiwiZmlyc3RTbGlkZSIsImZpcnN0RWxlbWVudENoaWxkIiwibGFzdFNsaWRlIiwibGFzdEVsZW1lbnRDaGlsZCIsImZpcnN0VmlzaWJsZVNsaWRlIiwibGFzdFZpc2libGVTbGlkZSIsIm5leHRFbGVtZW50U2libGluZyIsIlByZXYiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwidGFyZ2V0U2xpZGUiLCJtb2Rlcm5Ccm93c2VyIiwic2Nyb2xsVG8iLCJvcmlnaW5hbFBvc2l0aW9uIiwiY3VycmVudFNsaWRlIiwibmV4dFNsaWRlIiwic2Nyb2xsIiwibGVmdCIsIm9mZnNldExlZnQiLCJiZWhhdmlvciIsInRhcmdldCIsInRhcmdldEhlaWdodCIsImhlaWdodCIsImV4cGxpY2l0QWN0aXZlIiwic2xpZGVyV2lkdGgiLCJyb3VuZCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInNsaWRlclBvc2l0aW9uIiwiY29uc29sZSIsImxvZyIsInNsaWRlT2Zmc2V0IiwiZXZlbnROYW1lIiwiZGlzcGF0Y2hFdmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Q0FBQSxJQUFJLEtBQUssR0FBRyxVQUFVLEVBQUUsRUFBRTtHQUN4QixPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7RUFDcEMsQ0FBQzs7O0NBR0YsWUFBYzs7R0FFWixLQUFLLENBQUMsT0FBTyxVQUFVLElBQUksUUFBUSxJQUFJLFVBQVUsQ0FBQztHQUNsRCxLQUFLLENBQUMsT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQztHQUMxQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQztHQUN0QyxLQUFLLENBQUMsT0FBT0EsY0FBTSxJQUFJLFFBQVEsSUFBSUEsY0FBTSxDQUFDOztHQUUxQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQzs7Q0NaNUIsU0FBYyxHQUFHLFVBQVUsSUFBSSxFQUFFO0dBQy9CLElBQUk7S0FDRixPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDLE9BQU8sS0FBSyxFQUFFO0tBQ2QsT0FBTyxJQUFJLENBQUM7SUFDYjtFQUNGLENBQUM7O0NDSkY7Q0FDQSxlQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWTtHQUNsQyxPQUFPLE1BQU0sQ0FBQyxj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
