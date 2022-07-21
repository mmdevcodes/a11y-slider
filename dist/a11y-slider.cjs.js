
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
'use strict';

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

module.exports = A11YSlider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYTExeS1zbGlkZXIuY2pzLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1zdG9yZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3BhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWludGVnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pbmRleC1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkubWFwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2h0bWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93aGl0ZXNwYWNlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctdHJpbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMubnVtYmVyLmNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL251bWJlci1wYXJzZS1pbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm51bWJlci5wYXJzZS1pbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtdG8tYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5lbnRyaWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuZm9yLWVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvdHMtZGVib3VuY2UvZGlzdC9zcmMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnNsaWNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC50by1zdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAudG8tc3RyaW5nLmpzIiwiLi4vc3JjL3V0aWxzLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBjaGVjayA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgJiYgaXQuTWF0aCA9PSBNYXRoICYmIGl0O1xufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbm1vZHVsZS5leHBvcnRzID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgMSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSlbMV0gIT0gNztcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgIW5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyIHNwbGl0ID0gJycuc3BsaXQ7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIHJldHVybiAhT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT0gJ1N0cmluZycgPyBzcGxpdC5jYWxsKGl0LCAnJykgOiBPYmplY3QoaXQpO1xufSA6IE9iamVjdDtcbiIsIi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG4vLyBgVG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIFBSRUZFUlJFRF9TVFJJTkcpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGlucHV0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xuXG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZURlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoZ2xvYmFsLCBrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IHNldEdsb2JhbChTSEFSRUQsIHt9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSBGdW5jdGlvbi50b1N0cmluZztcblxuLy8gdGhpcyBoZWxwZXIgYnJva2VuIGluIGAzLjQuMS0zLjQuNGAsIHNvIHdlIGNhbid0IHVzZSBgc2hhcmVkYCBoZWxwZXJcbmlmICh0eXBlb2Ygc3RvcmUuaW5zcGVjdFNvdXJjZSAhPSAnZnVuY3Rpb24nKSB7XG4gIHN0b3JlLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25Ub1N0cmluZy5jYWxsKGl0KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZS5pbnNwZWN0U291cmNlO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KGluc3BlY3RTb3VyY2UoV2Vha01hcCkpO1xuIiwidmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuNi40JyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDIwIERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJyArIFN0cmluZyhrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5KSArICcpXycgKyAoKytpZCArIHBvc3RmaXgpLnRvU3RyaW5nKDM2KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIG9iamVjdEhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVApIHtcbiAgdmFyIHN0b3JlID0gbmV3IFdlYWtNYXAoKTtcbiAgdmFyIHdtZ2V0ID0gc3RvcmUuZ2V0O1xuICB2YXIgd21oYXMgPSBzdG9yZS5oYXM7XG4gIHZhciB3bXNldCA9IHN0b3JlLnNldDtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIHdtc2V0LmNhbGwoc3RvcmUsIGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21nZXQuY2FsbChzdG9yZSwgaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21oYXMuY2FsbChzdG9yZSwgaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xuXG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xudmFyIGVuZm9yY2VJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5lbmZvcmNlO1xudmFyIFRFTVBMQVRFID0gU3RyaW5nKFN0cmluZykuc3BsaXQoJ1N0cmluZycpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdW5zYWZlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy51bnNhZmUgOiBmYWxzZTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMuZW51bWVyYWJsZSA6IGZhbHNlO1xuICB2YXIgbm9UYXJnZXRHZXQgPSBvcHRpb25zID8gISFvcHRpb25zLm5vVGFyZ2V0R2V0IDogZmFsc2U7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmICFoYXModmFsdWUsICduYW1lJykpIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh2YWx1ZSwgJ25hbWUnLCBrZXkpO1xuICAgIGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKS5zb3VyY2UgPSBURU1QTEFURS5qb2luKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBrZXkgOiAnJyk7XG4gIH1cbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2Ugc2V0R2xvYmFsKGtleSwgdmFsdWUpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghdW5zYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgfSBlbHNlIGlmICghbm9UYXJnZXRHZXQgJiYgT1trZXldKSB7XG4gICAgc2ltcGxlID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoTywga2V5LCB2YWx1ZSk7XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xuIiwidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09ICdmdW5jdGlvbicgPyB2YXJpYWJsZSA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihwYXRoW25hbWVzcGFjZV0pIHx8IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSlcbiAgICA6IHBhdGhbbmFtZXNwYWNlXSAmJiBwYXRoW25hbWVzcGFjZV1bbWV0aG9kXSB8fCBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b2ludGVnZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBpc05hTihhcmd1bWVudCA9ICthcmd1bWVudCkgPyAwIDogKGFyZ3VtZW50ID4gMCA/IGZsb29yIDogY2VpbCkoYXJndW1lbnQpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50ID4gMCA/IG1pbih0b0ludGVnZXIoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiAgaW5kZXhPZjogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzKGhpZGRlbktleXMsIGtleSkgJiYgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXModGFyZ2V0LCBrZXkpKSBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiB0eXBlb2YgZGV0ZWN0aW9uID09ICdmdW5jdGlvbicgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxuLy8gYElzQXJyYXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNhcnJheVxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjbGFzc29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIHByb3BlcnR5S2V5ID0gdG9QcmltaXRpdmUoa2V5KTtcbiAgaWYgKHByb3BlcnR5S2V5IGluIG9iamVjdCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIHByb3BlcnR5S2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbcHJvcGVydHlLZXldID0gdmFsdWU7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICByZXR1cm4gIVN0cmluZyhTeW1ib2woKSk7XG59KTtcbiIsInZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAmJiAhU3ltYm9sLnNoYW1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCc7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgY3JlYXRlV2VsbEtub3duU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBTeW1ib2wgOiBTeW1ib2wgJiYgU3ltYm9sLndpdGhvdXRTZXR0ZXIgfHwgdWlkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghaGFzKFdlbGxLbm93blN5bWJvbHNTdG9yZSwgbmFtZSkpIHtcbiAgICBpZiAoTkFUSVZFX1NZTUJPTCAmJiBoYXMoU3ltYm9sLCBuYW1lKSkgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gU3ltYm9sW25hbWVdO1xuICAgIGVsc2UgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gY3JlYXRlV2VsbEtub3duU3ltYm9sKCdTeW1ib2wuJyArIG5hbWUpO1xuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheXNwZWNpZXNjcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsQXJyYXksIGxlbmd0aCkge1xuICB2YXIgQztcbiAgaWYgKGlzQXJyYXkob3JpZ2luYWxBcnJheSkpIHtcbiAgICBDID0gb3JpZ2luYWxBcnJheS5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmICh0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpIEMgPSB1bmRlZmluZWQ7XG4gICAgZWxzZSBpZiAoaXNPYmplY3QoQykpIHtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYgKEMgPT09IG51bGwpIEMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBuZXcgKEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQykobGVuZ3RoID09PSAwID8gMCA6IGxlbmd0aCk7XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignbmF2aWdhdG9yJywgJ3VzZXJBZ2VudCcpIHx8ICcnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4O1xudmFyIG1hdGNoLCB2ZXJzaW9uO1xuXG5pZiAodjgpIHtcbiAgbWF0Y2ggPSB2OC5zcGxpdCgnLicpO1xuICB2ZXJzaW9uID0gbWF0Y2hbMF0gKyBtYXRjaFsxXTtcbn0gZWxzZSBpZiAodXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uICYmICt2ZXJzaW9uO1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEUgPSB3ZWxsS25vd25TeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgaW5kZXggZXhjZWVkZWQnO1xuXG4vLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbi8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCA9IFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGFycmF5W0lTX0NPTkNBVF9TUFJFQURBQkxFXSA9IGZhbHNlO1xuICByZXR1cm4gYXJyYXkuY29uY2F0KClbMF0gIT09IGFycmF5O1xufSk7XG5cbnZhciBTUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdjb25jYXQnKTtcblxudmFyIGlzQ29uY2F0U3ByZWFkYWJsZSA9IGZ1bmN0aW9uIChPKSB7XG4gIGlmICghaXNPYmplY3QoTykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNwcmVhZGFibGUgPSBPW0lTX0NPTkNBVF9TUFJFQURBQkxFXTtcbiAgcmV0dXJuIHNwcmVhZGFibGUgIT09IHVuZGVmaW5lZCA/ICEhc3ByZWFkYWJsZSA6IGlzQXJyYXkoTyk7XG59O1xuXG52YXIgRk9SQ0VEID0gIUlTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgfHwgIVNQRUNJRVNfU1VQUE9SVDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5jb25jYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmNvbmNhdFxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQGlzQ29uY2F0U3ByZWFkYWJsZSBhbmQgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwge1xuICBjb25jYXQ6IGZ1bmN0aW9uIGNvbmNhdChhcmcpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgMCk7XG4gICAgdmFyIG4gPSAwO1xuICAgIHZhciBpLCBrLCBsZW5ndGgsIGxlbiwgRTtcbiAgICBmb3IgKGkgPSAtMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBFID0gaSA9PT0gLTEgPyBPIDogYXJndW1lbnRzW2ldO1xuICAgICAgaWYgKGlzQ29uY2F0U3ByZWFkYWJsZShFKSkge1xuICAgICAgICBsZW4gPSB0b0xlbmd0aChFLmxlbmd0aCk7XG4gICAgICAgIGlmIChuICsgbGVuID4gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCBsZW47IGsrKywgbisrKSBpZiAoayBpbiBFKSBjcmVhdGVQcm9wZXJ0eShBLCBuLCBFW2tdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChuID49IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShBLCBuKyssIEUpO1xuICAgICAgfVxuICAgIH1cbiAgICBBLmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQpO1xuICAgIH07XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xuXG52YXIgcHVzaCA9IFtdLnB1c2g7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBmb3JFYWNoLCBtYXAsIGZpbHRlciwgc29tZSwgZXZlcnksIGZpbmQsIGZpbmRJbmRleCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgdmFyIElTX01BUCA9IFRZUEUgPT0gMTtcbiAgdmFyIElTX0ZJTFRFUiA9IFRZUEUgPT0gMjtcbiAgdmFyIElTX1NPTUUgPSBUWVBFID09IDM7XG4gIHZhciBJU19FVkVSWSA9IFRZUEUgPT0gNDtcbiAgdmFyIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDY7XG4gIHZhciBOT19IT0xFUyA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYO1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0LCBzcGVjaWZpY0NyZWF0ZSkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSW5kZXhlZE9iamVjdChPKTtcbiAgICB2YXIgYm91bmRGdW5jdGlvbiA9IGJpbmQoY2FsbGJhY2tmbiwgdGhhdCwgMyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBjcmVhdGUgPSBzcGVjaWZpY0NyZWF0ZSB8fCBhcnJheVNwZWNpZXNDcmVhdGU7XG4gICAgdmFyIHRhcmdldCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHZhbHVlLCByZXN1bHQ7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKSB7XG4gICAgICB2YWx1ZSA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzdWx0ID0gYm91bmRGdW5jdGlvbih2YWx1ZSwgaW5kZXgsIE8pO1xuICAgICAgaWYgKFRZUEUpIHtcbiAgICAgICAgaWYgKElTX01BUCkgdGFyZ2V0W2luZGV4XSA9IHJlc3VsdDsgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdCkgc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWx1ZTsgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHB1c2guY2FsbCh0YXJnZXQsIHZhbHVlKTsgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZiAoSVNfRVZFUlkpIHJldHVybiBmYWxzZTsgIC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiB0YXJnZXQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbiAgZm9yRWFjaDogY3JlYXRlTWV0aG9kKDApLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbiAgbWFwOiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbHRlclxuICBmaWx0ZXI6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvbWVcbiAgc29tZTogY3JlYXRlTWV0aG9kKDMpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmV2ZXJ5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmV2ZXJ5XG4gIGV2ZXJ5OiBjcmVhdGVNZXRob2QoNCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4gIGZpbmQ6IGNyZWF0ZU1ldGhvZCg1KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZEluZGV4XG4gIGZpbmRJbmRleDogY3JlYXRlTWV0aG9kKDYpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBhcmd1bWVudCkge1xuICB2YXIgbWV0aG9kID0gW11bTUVUSE9EX05BTUVdO1xuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNhbGwsbm8tdGhyb3ctbGl0ZXJhbFxuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgdGhyb3cgMTsgfSwgMSk7XG4gIH0pO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgY2FjaGUgPSB7fTtcblxudmFyIHRocm93ZXIgPSBmdW5jdGlvbiAoaXQpIHsgdGhyb3cgaXQ7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBvcHRpb25zKSB7XG4gIGlmIChoYXMoY2FjaGUsIE1FVEhPRF9OQU1FKSkgcmV0dXJuIGNhY2hlW01FVEhPRF9OQU1FXTtcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHZhciBBQ0NFU1NPUlMgPSBoYXMob3B0aW9ucywgJ0FDQ0VTU09SUycpID8gb3B0aW9ucy5BQ0NFU1NPUlMgOiBmYWxzZTtcbiAgdmFyIGFyZ3VtZW50MCA9IGhhcyhvcHRpb25zLCAwKSA/IG9wdGlvbnNbMF0gOiB0aHJvd2VyO1xuICB2YXIgYXJndW1lbnQxID0gaGFzKG9wdGlvbnMsIDEpID8gb3B0aW9uc1sxXSA6IHVuZGVmaW5lZDtcblxuICByZXR1cm4gY2FjaGVbTUVUSE9EX05BTUVdID0gISFtZXRob2QgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoQUNDRVNTT1JTICYmICFERVNDUklQVE9SUykgcmV0dXJuIHRydWU7XG4gICAgdmFyIE8gPSB7IGxlbmd0aDogLTEgfTtcblxuICAgIGlmIChBQ0NFU1NPUlMpIGRlZmluZVByb3BlcnR5KE8sIDEsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiB0aHJvd2VyIH0pO1xuICAgIGVsc2UgT1sxXSA9IDE7XG5cbiAgICBtZXRob2QuY2FsbChPLCBhcmd1bWVudDAsIGFyZ3VtZW50MSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2ZvckVhY2gnKTtcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdmb3JFYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxubW9kdWxlLmV4cG9ydHMgPSAoIVNUUklDVF9NRVRIT0QgfHwgIVVTRVNfVE9fTEVOR1RIKSA/IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgcmV0dXJuICRmb3JFYWNoKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbn0gOiBbXS5mb3JFYWNoO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFtdLmZvckVhY2ggIT0gZm9yRWFjaCB9LCB7XG4gIGZvckVhY2g6IGZvckVhY2hcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgbmF0aXZlSW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbnZhciBORUdBVElWRV9aRVJPID0gISFuYXRpdmVJbmRleE9mICYmIDEgLyBbMV0uaW5kZXhPZigxLCAtMCkgPCAwO1xudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdpbmRleE9mJyk7XG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnaW5kZXhPZicsIHsgQUNDRVNTT1JTOiB0cnVlLCAxOiAwIH0pO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IE5FR0FUSVZFX1pFUk8gfHwgIVNUUklDVF9NRVRIT0QgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qICwgZnJvbUluZGV4ID0gMCAqLykge1xuICAgIHJldHVybiBORUdBVElWRV9aRVJPXG4gICAgICAvLyBjb252ZXJ0IC0wIHRvICswXG4gICAgICA/IG5hdGl2ZUluZGV4T2YuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCAwXG4gICAgICA6ICRpbmRleE9mKHRoaXMsIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkbWFwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLm1hcDtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnbWFwJyk7XG4vLyBGRjQ5LSBpc3N1ZVxudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ21hcCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgbWFwOiBmdW5jdGlvbiBtYXAoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJG1hcCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSAmJiBpdCAhPT0gbnVsbCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcIkNhbid0IHNldCBcIiArIFN0cmluZyhpdCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBhUG9zc2libGVQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5zZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3Quc2V0cHJvdG90eXBlb2Zcbi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IGZ1bmN0aW9uICgpIHtcbiAgdmFyIENPUlJFQ1RfU0VUVEVSID0gZmFsc2U7XG4gIHZhciB0ZXN0ID0ge307XG4gIHZhciBzZXR0ZXI7XG4gIHRyeSB7XG4gICAgc2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0O1xuICAgIHNldHRlci5jYWxsKHRlc3QsIFtdKTtcbiAgICBDT1JSRUNUX1NFVFRFUiA9IHRlc3QgaW5zdGFuY2VvZiBBcnJheTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICBhbk9iamVjdChPKTtcbiAgICBhUG9zc2libGVQcm90b3R5cGUocHJvdG8pO1xuICAgIGlmIChDT1JSRUNUX1NFVFRFUikgc2V0dGVyLmNhbGwoTywgcHJvdG8pO1xuICAgIGVsc2UgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICByZXR1cm4gTztcbiAgfTtcbn0oKSA6IHVuZGVmaW5lZCk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcblxuLy8gbWFrZXMgc3ViY2xhc3Npbmcgd29yayBjb3JyZWN0IGZvciB3cmFwcGVkIGJ1aWx0LWluc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHRoaXMsIGR1bW15LCBXcmFwcGVyKSB7XG4gIHZhciBOZXdUYXJnZXQsIE5ld1RhcmdldFByb3RvdHlwZTtcbiAgaWYgKFxuICAgIC8vIGl0IGNhbiB3b3JrIG9ubHkgd2l0aCBuYXRpdmUgYHNldFByb3RvdHlwZU9mYFxuICAgIHNldFByb3RvdHlwZU9mICYmXG4gICAgLy8gd2UgaGF2ZW4ndCBjb21wbGV0ZWx5IGNvcnJlY3QgcHJlLUVTNiB3YXkgZm9yIGdldHRpbmcgYG5ldy50YXJnZXRgLCBzbyB1c2UgdGhpc1xuICAgIHR5cGVvZiAoTmV3VGFyZ2V0ID0gZHVtbXkuY29uc3RydWN0b3IpID09ICdmdW5jdGlvbicgJiZcbiAgICBOZXdUYXJnZXQgIT09IFdyYXBwZXIgJiZcbiAgICBpc09iamVjdChOZXdUYXJnZXRQcm90b3R5cGUgPSBOZXdUYXJnZXQucHJvdG90eXBlKSAmJlxuICAgIE5ld1RhcmdldFByb3RvdHlwZSAhPT0gV3JhcHBlci5wcm90b3R5cGVcbiAgKSBzZXRQcm90b3R5cGVPZigkdGhpcywgTmV3VGFyZ2V0UHJvdG90eXBlKTtcbiAgcmV0dXJuICR0aGlzO1xufTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYoTywga2V5ID0ga2V5c1tpbmRleCsrXSwgUHJvcGVydGllc1trZXldKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignZG9jdW1lbnQnLCAnZG9jdW1lbnRFbGVtZW50Jyk7XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG5cbnZhciBHVCA9ICc+JztcbnZhciBMVCA9ICc8JztcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBTQ1JJUFQgPSAnc2NyaXB0JztcbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcblxudmFyIEVtcHR5Q29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cbnZhciBzY3JpcHRUYWcgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICByZXR1cm4gTFQgKyBTQ1JJUFQgKyBHVCArIGNvbnRlbnQgKyBMVCArICcvJyArIFNDUklQVCArIEdUO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIEFjdGl2ZVggT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYID0gZnVuY3Rpb24gKGFjdGl2ZVhEb2N1bWVudCkge1xuICBhY3RpdmVYRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCcnKSk7XG4gIGFjdGl2ZVhEb2N1bWVudC5jbG9zZSgpO1xuICB2YXIgdGVtcCA9IGFjdGl2ZVhEb2N1bWVudC5wYXJlbnRXaW5kb3cuT2JqZWN0O1xuICBhY3RpdmVYRG9jdW1lbnQgPSBudWxsOyAvLyBhdm9pZCBtZW1vcnkgbGVha1xuICByZXR1cm4gdGVtcDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgSlMgPSAnamF2YScgKyBTQ1JJUFQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzQ3NVxuICBpZnJhbWUuc3JjID0gU3RyaW5nKEpTKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJ2RvY3VtZW50LkY9T2JqZWN0JykpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICByZXR1cm4gaWZyYW1lRG9jdW1lbnQuRjtcbn07XG5cbi8vIENoZWNrIGZvciBkb2N1bWVudC5kb21haW4gYW5kIGFjdGl2ZSB4IHN1cHBvcnRcbi8vIE5vIG5lZWQgdG8gdXNlIGFjdGl2ZSB4IGFwcHJvYWNoIHdoZW4gZG9jdW1lbnQuZG9tYWluIGlzIG5vdCBzZXRcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0vaXNzdWVzLzE1MFxuLy8gdmFyaWF0aW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9raXRjYW1icmlkZ2UvZXM1LXNoaW0vY29tbWl0LzRmNzM4YWMwNjYzNDZcbi8vIGF2b2lkIElFIEdDIGJ1Z1xudmFyIGFjdGl2ZVhEb2N1bWVudDtcbnZhciBOdWxsUHJvdG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLyogZ2xvYmFsIEFjdGl2ZVhPYmplY3QgKi9cbiAgICBhY3RpdmVYRG9jdW1lbnQgPSBkb2N1bWVudC5kb21haW4gJiYgbmV3IEFjdGl2ZVhPYmplY3QoJ2h0bWxmaWxlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGlnbm9yZSAqLyB9XG4gIE51bGxQcm90b09iamVjdCA9IGFjdGl2ZVhEb2N1bWVudCA/IE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVgoYWN0aXZlWERvY3VtZW50KSA6IE51bGxQcm90b09iamVjdFZpYUlGcmFtZSgpO1xuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBOdWxsUHJvdG9PYmplY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIE51bGxQcm90b09iamVjdCgpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHlDb25zdHJ1Y3RvcigpO1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gTnVsbFByb3RvT2JqZWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwiLy8gYSBzdHJpbmcgb2YgYWxsIHZhbGlkIHVuaWNvZGUgd2hpdGVzcGFjZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5tb2R1bGUuZXhwb3J0cyA9ICdcXHUwMDA5XFx1MDAwQVxcdTAwMEJcXHUwMDBDXFx1MDAwRFxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGJztcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciB3aGl0ZXNwYWNlID0gJ1snICsgd2hpdGVzcGFjZXMgKyAnXSc7XG52YXIgbHRyaW0gPSBSZWdFeHAoJ14nICsgd2hpdGVzcGFjZSArIHdoaXRlc3BhY2UgKyAnKicpO1xudmFyIHJ0cmltID0gUmVnRXhwKHdoaXRlc3BhY2UgKyB3aGl0ZXNwYWNlICsgJyokJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbSwgdHJpbVN0YXJ0LCB0cmltRW5kLCB0cmltTGVmdCwgdHJpbVJpZ2h0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzKSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgaWYgKFRZUEUgJiAxKSBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShsdHJpbSwgJycpO1xuICAgIGlmIChUWVBFICYgMikgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocnRyaW0sICcnKTtcbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbUxlZnQsIHRyaW1TdGFydCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbXN0YXJ0XG4gIHN0YXJ0OiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbVJpZ2h0LCB0cmltRW5kIH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltZW5kXG4gIGVuZDogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS50cmltYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltXG4gIHRyaW06IGNyZWF0ZU1ldGhvZCgzKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5oZXJpdC1pZi1yZXF1aXJlZCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgdHJpbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbScpLnRyaW07XG5cbnZhciBOVU1CRVIgPSAnTnVtYmVyJztcbnZhciBOYXRpdmVOdW1iZXIgPSBnbG9iYWxbTlVNQkVSXTtcbnZhciBOdW1iZXJQcm90b3R5cGUgPSBOYXRpdmVOdW1iZXIucHJvdG90eXBlO1xuXG4vLyBPcGVyYSB+MTIgaGFzIGJyb2tlbiBPYmplY3QjdG9TdHJpbmdcbnZhciBCUk9LRU5fQ0xBU1NPRiA9IGNsYXNzb2YoY3JlYXRlKE51bWJlclByb3RvdHlwZSkpID09IE5VTUJFUjtcblxuLy8gYFRvTnVtYmVyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvbnVtYmVyXG52YXIgdG9OdW1iZXIgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGl0ID0gdG9QcmltaXRpdmUoYXJndW1lbnQsIGZhbHNlKTtcbiAgdmFyIGZpcnN0LCB0aGlyZCwgcmFkaXgsIG1heENvZGUsIGRpZ2l0cywgbGVuZ3RoLCBpbmRleCwgY29kZTtcbiAgaWYgKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBpdC5sZW5ndGggPiAyKSB7XG4gICAgaXQgPSB0cmltKGl0KTtcbiAgICBmaXJzdCA9IGl0LmNoYXJDb2RlQXQoMCk7XG4gICAgaWYgKGZpcnN0ID09PSA0MyB8fCBmaXJzdCA9PT0gNDUpIHtcbiAgICAgIHRoaXJkID0gaXQuY2hhckNvZGVBdCgyKTtcbiAgICAgIGlmICh0aGlyZCA9PT0gODggfHwgdGhpcmQgPT09IDEyMCkgcmV0dXJuIE5hTjsgLy8gTnVtYmVyKCcrMHgxJykgc2hvdWxkIGJlIE5hTiwgb2xkIFY4IGZpeFxuICAgIH0gZWxzZSBpZiAoZmlyc3QgPT09IDQ4KSB7XG4gICAgICBzd2l0Y2ggKGl0LmNoYXJDb2RlQXQoMSkpIHtcbiAgICAgICAgY2FzZSA2NjogY2FzZSA5ODogcmFkaXggPSAyOyBtYXhDb2RlID0gNDk7IGJyZWFrOyAvLyBmYXN0IGVxdWFsIG9mIC9eMGJbMDFdKyQvaVxuICAgICAgICBjYXNlIDc5OiBjYXNlIDExMTogcmFkaXggPSA4OyBtYXhDb2RlID0gNTU7IGJyZWFrOyAvLyBmYXN0IGVxdWFsIG9mIC9eMG9bMC03XSskL2lcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuICtpdDtcbiAgICAgIH1cbiAgICAgIGRpZ2l0cyA9IGl0LnNsaWNlKDIpO1xuICAgICAgbGVuZ3RoID0gZGlnaXRzLmxlbmd0aDtcbiAgICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb2RlID0gZGlnaXRzLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgICAgICAvLyBwYXJzZUludCBwYXJzZXMgYSBzdHJpbmcgdG8gYSBmaXJzdCB1bmF2YWlsYWJsZSBzeW1ib2xcbiAgICAgICAgLy8gYnV0IFRvTnVtYmVyIHNob3VsZCByZXR1cm4gTmFOIGlmIGEgc3RyaW5nIGNvbnRhaW5zIHVuYXZhaWxhYmxlIHN5bWJvbHNcbiAgICAgICAgaWYgKGNvZGUgPCA0OCB8fCBjb2RlID4gbWF4Q29kZSkgcmV0dXJuIE5hTjtcbiAgICAgIH0gcmV0dXJuIHBhcnNlSW50KGRpZ2l0cywgcmFkaXgpO1xuICAgIH1cbiAgfSByZXR1cm4gK2l0O1xufTtcblxuLy8gYE51bWJlcmAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW51bWJlci1jb25zdHJ1Y3RvclxuaWYgKGlzRm9yY2VkKE5VTUJFUiwgIU5hdGl2ZU51bWJlcignIDBvMScpIHx8ICFOYXRpdmVOdW1iZXIoJzBiMScpIHx8IE5hdGl2ZU51bWJlcignKzB4MScpKSkge1xuICB2YXIgTnVtYmVyV3JhcHBlciA9IGZ1bmN0aW9uIE51bWJlcih2YWx1ZSkge1xuICAgIHZhciBpdCA9IGFyZ3VtZW50cy5sZW5ndGggPCAxID8gMCA6IHZhbHVlO1xuICAgIHZhciBkdW1teSA9IHRoaXM7XG4gICAgcmV0dXJuIGR1bW15IGluc3RhbmNlb2YgTnVtYmVyV3JhcHBlclxuICAgICAgLy8gY2hlY2sgb24gMS4uY29uc3RydWN0b3IoZm9vKSBjYXNlXG4gICAgICAmJiAoQlJPS0VOX0NMQVNTT0YgPyBmYWlscyhmdW5jdGlvbiAoKSB7IE51bWJlclByb3RvdHlwZS52YWx1ZU9mLmNhbGwoZHVtbXkpOyB9KSA6IGNsYXNzb2YoZHVtbXkpICE9IE5VTUJFUilcbiAgICAgICAgPyBpbmhlcml0SWZSZXF1aXJlZChuZXcgTmF0aXZlTnVtYmVyKHRvTnVtYmVyKGl0KSksIGR1bW15LCBOdW1iZXJXcmFwcGVyKSA6IHRvTnVtYmVyKGl0KTtcbiAgfTtcbiAgZm9yICh2YXIga2V5cyA9IERFU0NSSVBUT1JTID8gZ2V0T3duUHJvcGVydHlOYW1lcyhOYXRpdmVOdW1iZXIpIDogKFxuICAgIC8vIEVTMzpcbiAgICAnTUFYX1ZBTFVFLE1JTl9WQUxVRSxOYU4sTkVHQVRJVkVfSU5GSU5JVFksUE9TSVRJVkVfSU5GSU5JVFksJyArXG4gICAgLy8gRVMyMDE1IChpbiBjYXNlLCBpZiBtb2R1bGVzIHdpdGggRVMyMDE1IE51bWJlciBzdGF0aWNzIHJlcXVpcmVkIGJlZm9yZSk6XG4gICAgJ0VQU0lMT04saXNGaW5pdGUsaXNJbnRlZ2VyLGlzTmFOLGlzU2FmZUludGVnZXIsTUFYX1NBRkVfSU5URUdFUiwnICtcbiAgICAnTUlOX1NBRkVfSU5URUdFUixwYXJzZUZsb2F0LHBhcnNlSW50LGlzSW50ZWdlcidcbiAgKS5zcGxpdCgnLCcpLCBqID0gMCwga2V5OyBrZXlzLmxlbmd0aCA+IGo7IGorKykge1xuICAgIGlmIChoYXMoTmF0aXZlTnVtYmVyLCBrZXkgPSBrZXlzW2pdKSAmJiAhaGFzKE51bWJlcldyYXBwZXIsIGtleSkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KE51bWJlcldyYXBwZXIsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE5hdGl2ZU51bWJlciwga2V5KSk7XG4gICAgfVxuICB9XG4gIE51bWJlcldyYXBwZXIucHJvdG90eXBlID0gTnVtYmVyUHJvdG90eXBlO1xuICBOdW1iZXJQcm90b3R5cGUuY29uc3RydWN0b3IgPSBOdW1iZXJXcmFwcGVyO1xuICByZWRlZmluZShnbG9iYWwsIE5VTUJFUiwgTnVtYmVyV3JhcHBlcik7XG59XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHRyaW0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0nKS50cmltO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciAkcGFyc2VJbnQgPSBnbG9iYWwucGFyc2VJbnQ7XG52YXIgaGV4ID0gL15bKy1dPzBbWHhdLztcbnZhciBGT1JDRUQgPSAkcGFyc2VJbnQod2hpdGVzcGFjZXMgKyAnMDgnKSAhPT0gOCB8fCAkcGFyc2VJbnQod2hpdGVzcGFjZXMgKyAnMHgxNicpICE9PSAyMjtcblxuLy8gYHBhcnNlSW50YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXBhcnNlaW50LXN0cmluZy1yYWRpeFxubW9kdWxlLmV4cG9ydHMgPSBGT1JDRUQgPyBmdW5jdGlvbiBwYXJzZUludChzdHJpbmcsIHJhZGl4KSB7XG4gIHZhciBTID0gdHJpbShTdHJpbmcoc3RyaW5nKSk7XG4gIHJldHVybiAkcGFyc2VJbnQoUywgKHJhZGl4ID4+PiAwKSB8fCAoaGV4LnRlc3QoUykgPyAxNiA6IDEwKSk7XG59IDogJHBhcnNlSW50O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgcGFyc2VJbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbnVtYmVyLXBhcnNlLWludCcpO1xuXG4vLyBgTnVtYmVyLnBhcnNlSW50YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW51bWJlci5wYXJzZWludFxuJCh7IHRhcmdldDogJ051bWJlcicsIHN0YXQ6IHRydWUsIGZvcmNlZDogTnVtYmVyLnBhcnNlSW50ICE9IHBhcnNlSW50IH0sIHtcbiAgcGFyc2VJbnQ6IHBhcnNlSW50XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG5cbnZhciBuYXRpdmVBc3NpZ24gPSBPYmplY3QuYXNzaWduO1xudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG4vLyBgT2JqZWN0LmFzc2lnbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG5tb2R1bGUuZXhwb3J0cyA9ICFuYXRpdmVBc3NpZ24gfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBzaG91bGQgaGF2ZSBjb3JyZWN0IG9yZGVyIG9mIG9wZXJhdGlvbnMgKEVkZ2UgYnVnKVxuICBpZiAoREVTQ1JJUFRPUlMgJiYgbmF0aXZlQXNzaWduKHsgYjogMSB9LCBuYXRpdmVBc3NpZ24oZGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYicsIHtcbiAgICAgICAgdmFsdWU6IDMsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH0pLCB7IGI6IDIgfSkpLmIgIT09IDEpIHJldHVybiB0cnVlO1xuICAvLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1ZylcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBzeW1ib2wgPSBTeW1ib2woKTtcbiAgdmFyIGFscGhhYmV0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtzeW1ib2xdID0gNztcbiAgYWxwaGFiZXQuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGNocikgeyBCW2Nocl0gPSBjaHI7IH0pO1xuICByZXR1cm4gbmF0aXZlQXNzaWduKHt9LCBBKVtzeW1ib2xdICE9IDcgfHwgb2JqZWN0S2V5cyhuYXRpdmVBc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBhbHBoYWJldDtcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICB2YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mO1xuICB3aGlsZSAoYXJndW1lbnRzTGVuZ3RoID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IEluZGV4ZWRPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5U3ltYm9scyA/IG9iamVjdEtleXMoUykuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhTKSkgOiBvYmplY3RLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikge1xuICAgICAga2V5ID0ga2V5c1tqKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogbmF0aXZlQXNzaWduO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1hc3NpZ24nKTtcblxuLy8gYE9iamVjdC5hc3NpZ25gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmFzc2lnblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogT2JqZWN0LmFzc2lnbiAhPT0gYXNzaWduIH0sIHtcbiAgYXNzaWduOiBhc3NpZ25cbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJykuZjtcblxuLy8gYE9iamVjdC57IGVudHJpZXMsIHZhbHVlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRPX0VOVFJJRVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KGl0KTtcbiAgICB2YXIga2V5cyA9IG9iamVjdEtleXMoTyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaSkge1xuICAgICAga2V5ID0ga2V5c1tpKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKE8sIGtleSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goVE9fRU5UUklFUyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBPYmplY3QuZW50cmllc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5lbnRyaWVzXG4gIGVudHJpZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYE9iamVjdC52YWx1ZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QudmFsdWVzXG4gIHZhbHVlczogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRlbnRyaWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC10by1hcnJheScpLmVudHJpZXM7XG5cbi8vIGBPYmplY3QuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZW50cmllc1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUgfSwge1xuICBlbnRyaWVzOiBmdW5jdGlvbiBlbnRyaWVzKE8pIHtcbiAgICByZXR1cm4gJGVudHJpZXMoTyk7XG4gIH1cbn0pO1xuIiwiLy8gaXRlcmFibGUgRE9NIGNvbGxlY3Rpb25zXG4vLyBmbGFnIC0gYGl0ZXJhYmxlYCBpbnRlcmZhY2UgLSAnZW50cmllcycsICdrZXlzJywgJ3ZhbHVlcycsICdmb3JFYWNoJyBtZXRob2RzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IDAsXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IDAsXG4gIENTU1ZhbHVlTGlzdDogMCxcbiAgQ2xpZW50UmVjdExpc3Q6IDAsXG4gIERPTVJlY3RMaXN0OiAwLFxuICBET01TdHJpbmdMaXN0OiAwLFxuICBET01Ub2tlbkxpc3Q6IDEsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiAwLFxuICBGaWxlTGlzdDogMCxcbiAgSFRNTEFsbENvbGxlY3Rpb246IDAsXG4gIEhUTUxDb2xsZWN0aW9uOiAwLFxuICBIVE1MRm9ybUVsZW1lbnQ6IDAsXG4gIEhUTUxTZWxlY3RFbGVtZW50OiAwLFxuICBNZWRpYUxpc3Q6IDAsXG4gIE1pbWVUeXBlQXJyYXk6IDAsXG4gIE5hbWVkTm9kZU1hcDogMCxcbiAgTm9kZUxpc3Q6IDEsXG4gIFBhaW50UmVxdWVzdExpc3Q6IDAsXG4gIFBsdWdpbjogMCxcbiAgUGx1Z2luQXJyYXk6IDAsXG4gIFNWR0xlbmd0aExpc3Q6IDAsXG4gIFNWR051bWJlckxpc3Q6IDAsXG4gIFNWR1BhdGhTZWdMaXN0OiAwLFxuICBTVkdQb2ludExpc3Q6IDAsXG4gIFNWR1N0cmluZ0xpc3Q6IDAsXG4gIFNWR1RyYW5zZm9ybUxpc3Q6IDAsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IDAsXG4gIFN0eWxlU2hlZXRMaXN0OiAwLFxuICBUZXh0VHJhY2tDdWVMaXN0OiAwLFxuICBUZXh0VHJhY2tMaXN0OiAwLFxuICBUb3VjaExpc3Q6IDBcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERPTUl0ZXJhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb20taXRlcmFibGVzJyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxuZm9yICh2YXIgQ09MTEVDVElPTl9OQU1FIGluIERPTUl0ZXJhYmxlcykge1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtDT0xMRUNUSU9OX05BTUVdO1xuICB2YXIgQ29sbGVjdGlvblByb3RvdHlwZSA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZSAmJiBDb2xsZWN0aW9uUHJvdG90eXBlLmZvckVhY2ggIT09IGZvckVhY2gpIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsICdmb3JFYWNoJywgZm9yRWFjaCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgQ29sbGVjdGlvblByb3RvdHlwZS5mb3JFYWNoID0gZm9yRWFjaDtcbiAgfVxufVxuIiwiZXhwb3J0cy5kZWJvdW5jZT1mdW5jdGlvbihpLGUsbyl7dmFyIHQ7cmV0dXJuIHZvaWQgMD09PWUmJihlPTUwKSx2b2lkIDA9PT1vJiYobz17aXNJbW1lZGlhdGU6ITF9KSxmdW5jdGlvbigpe2Zvcih2YXIgYT1bXSxkPWFyZ3VtZW50cy5sZW5ndGg7ZC0tOylhW2RdPWFyZ3VtZW50c1tkXTt2YXIgbj10aGlzLG09by5pc0ltbWVkaWF0ZSYmdm9pZCAwPT09dDt2b2lkIDAhPT10JiZjbGVhclRpbWVvdXQodCksdD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dD12b2lkIDAsby5pc0ltbWVkaWF0ZXx8aS5hcHBseShuLGEpfSxlKSxtJiZpLmFwcGx5KG4sYSl9fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdzbGljZScpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ3NsaWNlJywgeyBBQ0NFU1NPUlM6IHRydWUsIDA6IDAsIDE6IDIgfSk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgbmF0aXZlU2xpY2UgPSBbXS5zbGljZTtcbnZhciBtYXggPSBNYXRoLm1heDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zbGljZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc2xpY2Vcbi8vIGZhbGxiYWNrIGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5ncyBhbmQgRE9NIG9iamVjdHNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFIQVNfU1BFQ0lFU19TVVBQT1JUIHx8ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgayA9IHRvQWJzb2x1dGVJbmRleChzdGFydCwgbGVuZ3RoKTtcbiAgICB2YXIgZmluID0gdG9BYnNvbHV0ZUluZGV4KGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogZW5kLCBsZW5ndGgpO1xuICAgIC8vIGlubGluZSBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBmb3IgdXNhZ2UgbmF0aXZlIGBBcnJheSNzbGljZWAgd2hlcmUgaXQncyBwb3NzaWJsZVxuICAgIHZhciBDb25zdHJ1Y3RvciwgcmVzdWx0LCBuO1xuICAgIGlmIChpc0FycmF5KE8pKSB7XG4gICAgICBDb25zdHJ1Y3RvciA9IE8uY29uc3RydWN0b3I7XG4gICAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgICAgaWYgKHR5cGVvZiBDb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIChDb25zdHJ1Y3RvciA9PT0gQXJyYXkgfHwgaXNBcnJheShDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSkge1xuICAgICAgICBDb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoQ29uc3RydWN0b3IpKSB7XG4gICAgICAgIENvbnN0cnVjdG9yID0gQ29uc3RydWN0b3JbU1BFQ0lFU107XG4gICAgICAgIGlmIChDb25zdHJ1Y3RvciA9PT0gbnVsbCkgQ29uc3RydWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoQ29uc3RydWN0b3IgPT09IEFycmF5IHx8IENvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVNsaWNlLmNhbGwoTywgaywgZmluKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ID0gbmV3IChDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDb25zdHJ1Y3RvcikobWF4KGZpbiAtIGssIDApKTtcbiAgICBmb3IgKG4gPSAwOyBrIDwgZmluOyBrKyssIG4rKykgaWYgKGsgaW4gTykgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBuLCBPW2tdKTtcbiAgICByZXN1bHQubGVuZ3RoID0gbjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgdGVzdCA9IHt9O1xuXG50ZXN0W1RPX1NUUklOR19UQUddID0gJ3onO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZyh0ZXN0KSA9PT0gJ1tvYmplY3Qgel0nO1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBDT1JSRUNUX0FSR1VNRU5UUyA9IGNsYXNzb2ZSYXcoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8gY2xhc3NvZlJhdyA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgdGFnLCByZXN1bHQ7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mICh0YWcgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRPX1NUUklOR19UQUcpKSA9PSAnc3RyaW5nJyA/IHRhZ1xuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQ09SUkVDVF9BUkdVTUVOVFMgPyBjbGFzc29mUmF3KE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKHJlc3VsdCA9IGNsYXNzb2ZSYXcoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyB7fS50b1N0cmluZyA6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG59O1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcnKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKCFUT19TVFJJTkdfVEFHX1NVUFBPUlQpIHtcbiAgcmVkZWZpbmUoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgdG9TdHJpbmcsIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG5cbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG52YXIgbmF0aXZlVG9TdHJpbmcgPSBSZWdFeHBQcm90b3R5cGVbVE9fU1RSSU5HXTtcblxudmFyIE5PVF9HRU5FUklDID0gZmFpbHMoZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlVG9TdHJpbmcuY2FsbCh7IHNvdXJjZTogJ2EnLCBmbGFnczogJ2InIH0pICE9ICcvYS9iJzsgfSk7XG4vLyBGRjQ0LSBSZWdFeHAjdG9TdHJpbmcgaGFzIGEgd3JvbmcgbmFtZVxudmFyIElOQ09SUkVDVF9OQU1FID0gbmF0aXZlVG9TdHJpbmcubmFtZSAhPSBUT19TVFJJTkc7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbmlmIChOT1RfR0VORVJJQyB8fCBJTkNPUlJFQ1RfTkFNRSkge1xuICByZWRlZmluZShSZWdFeHAucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHZhciBSID0gYW5PYmplY3QodGhpcyk7XG4gICAgdmFyIHAgPSBTdHJpbmcoUi5zb3VyY2UpO1xuICAgIHZhciByZiA9IFIuZmxhZ3M7XG4gICAgdmFyIGYgPSBTdHJpbmcocmYgPT09IHVuZGVmaW5lZCAmJiBSIGluc3RhbmNlb2YgUmVnRXhwICYmICEoJ2ZsYWdzJyBpbiBSZWdFeHBQcm90b3R5cGUpID8gZmxhZ3MuY2FsbChSKSA6IHJmKTtcbiAgICByZXR1cm4gJy8nICsgcCArICcvJyArIGY7XG4gIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoaHRtbDogc3RyaW5nKTogSFRNTEVsZW1lbnQgPT4ge1xyXG4gIGNvbnN0IGVsID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAndGV4dC9odG1sJykuYm9keS5maXJzdENoaWxkO1xyXG5cclxuICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGVsXHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN1cHBsaWVkIG1hcmt1cCBkb2VzIG5vdCBjcmVhdGUgYW4gSFRNTCBFbGVtZW50XCIpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBhMTF5Y2xpY2sgLSBFYXNpbHkgaGFuZGxlIGtleWJvYXJkIGNsaWNrIGV2ZW50cyBvbiBub24gc2VtYW50aWMgYnV0dG9uIGVsZW1lbnRzLlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3ZpbmtsZS9hMTF5Y2xpY2tcclxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IENsaWNrL2tleWJvYXJkIGV2ZW50IG9iamVjdC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb24gZXZlbnQgdHlwZSBhbmQgY29kZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBhMTF5Q2xpY2sgPSBmdW5jdGlvbihldmVudDogYW55KTogYm9vbGVhbiB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICB2YXIgY29kZSA9IGV2ZW50LmNoYXJDb2RlIHx8IGV2ZW50LmtleUNvZGUsXHJcbiAgICB0eXBlID0gZXZlbnQudHlwZTtcclxuXHJcbiAgaWYgKHR5cGUgPT09ICdjbGljaycpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2tleWRvd24nKSB7XHJcbiAgICBpZiAoY29kZSA9PT0gMzIgfHwgY29kZSA9PT0gMTMpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vLyBDcm9zcyBicm93c2VyIGN1c3RvbSBldmVudFxyXG4vLyBTb21lIGNvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2h5c3RydWsvY3VzdG9tLWV2ZW50LWpzXHJcbmV4cG9ydCBjb25zdCBjcm9zc0N1c3RvbUV2ZW50ID0gKGV2ZW50OiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XHJcbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xyXG5cclxuICBwYXJhbXMgPSBwYXJhbXMgfHwgeyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH07XHJcbiAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcclxuXHJcbiAgcmV0dXJuIGV2dDtcclxufTtcclxuXHJcbi8vIENoZWNrcyBpZiB2YWx1ZSBpcyBhbiBpbnRlZ2VyXHJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL051bWJlci9pc0ludGVnZXIjUG9seWZpbGxcclxuZXhwb3J0IGNvbnN0IGlzSW50ZWdlciA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiZcclxuICAgIGlzRmluaXRlKHZhbHVlKSAmJlxyXG4gICAgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlICYmXHJcbiAgICB2YWx1ZSAhPSBudWxsICYmICFpc05hTihOdW1iZXIodmFsdWUudG9TdHJpbmcoKSkpXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc09iamVjdCA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGw7XHJcbn07XHJcblxyXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjQwNDg2MTVcclxuZXhwb3J0IGNvbnN0IGNhbkFjY2Vzc0FzQXJyYXkgPSAoaXRlbTogYW55KTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICAvLyBtb2Rlcm4gYnJvd3NlciBzdWNoIGFzIElFOSAvIGZpcmVmb3ggLyBjaHJvbWUgZXRjLlxyXG4gIHZhciByZXN1bHQgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSk7XHJcbiAgaWYgKHJlc3VsdCA9PT0gJ1tvYmplY3QgSFRNTENvbGxlY3Rpb25dJyB8fCByZXN1bHQgPT09ICdbb2JqZWN0IE5vZGVMaXN0XScpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICAvL2llIDYvNy84XHJcbiAgaWYgKFxyXG4gICAgdHlwZW9mIGl0ZW0gIT09ICdvYmplY3QnIHx8XHJcbiAgICAhaXRlbS5oYXNPd25Qcm9wZXJ0eSgnbGVuZ3RoJykgfHxcclxuICAgIGl0ZW0ubGVuZ3RoIDwgMFxyXG4gICkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICAvLyBhIGZhbHNlIHBvc2l0aXZlIG9uIGFuIGVtcHR5IHBzZXVkby1hcnJheSBpcyBPSyBiZWNhdXNlIHRoZXJlIHdvbid0IGJlIGFueXRoaW5nXHJcbiAgLy8gdG8gaXRlcmF0ZSBzbyB3ZSBhbGxvdyBhbnl0aGluZyB3aXRoIC5sZW5ndGggPT09IDAgdG8gcGFzcyB0aGUgdGVzdFxyXG4gIGlmIChpdGVtLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChpdGVtWzBdICYmIGl0ZW1bMF0ubm9kZVR5cGUpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vLyBSdW4gYSBmdW5jdGlvbiBvbiBhbGwgZWxlbWVudHMgZXZlbiBpZiBpdCdzIGEgY29sbGVjdGlvbiBvciBzaW5nbGVcclxuZXhwb3J0IGNvbnN0IGV2ZXJ5RWxlbWVudCA9IChcclxuICBlbGVtZW50czpcclxuICAgIHwgSFRNTEVsZW1lbnRcclxuICAgIHwgSFRNTENvbGxlY3Rpb25PZjxIVE1MRWxlbWVudD5cclxuICAgIHwgSFRNTENvbGxlY3Rpb25cclxuICAgIHwgTm9kZUxpc3RcclxuICAgIHwgSFRNTEVsZW1lbnRbXVxyXG4gICAgfCB1bmRlZmluZWQsXHJcbiAgY2FsbGJhY2s/OiAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWRcclxuKSA9PiB7XHJcbiAgLy8gUmV0dXJuIGlmIG5vdGhpbmcgcGFzc2VkXHJcbiAgaWYgKGVsZW1lbnRzID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgLy8gV3JhcCBlbGVtZW50cyBpbiBhbiBhcnJheSBpZiBzaW5nbGVcclxuICBsZXQgZWxzID0gY2FuQWNjZXNzQXNBcnJheShlbGVtZW50cykgPyBlbGVtZW50cyA6IFtlbGVtZW50c107XHJcblxyXG4gIC8vIE9sZHNjaG9vbCBhcnJheSBpdGVyYXRvciBtZXRob2QgZm9yIElFIChhdm9pZGluZyBwb2x5ZmlsbHMpXHJcbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWxzKS5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XHJcbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlbCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IGNvbXB1dGVkIHdpZHRoL2hlaWdodCB3aXRoIHN1YnBpeGVsc1xyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vVmVzdHJpZGUvZ2xlbi5jb2Rlcy9ibG9iL21hc3Rlci9zcmMvcG9zdHMvZ2V0dGluZy1lbGVtZW50LXdpZHRoLm1kXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0U3VicGl4ZWxTdHlsZSA9IChcclxuICBlbGVtZW50OiBIVE1MRWxlbWVudCxcclxuICBzdHlsZTogJ3dpZHRoJyB8ICdoZWlnaHQnLFxyXG4gIHN0eWxlcz86IENTU1N0eWxlRGVjbGFyYXRpb25cclxuKSA9PiB7XHJcbiAgdmFyIEhBU19DT01QVVRFRF9TVFlMRSA9ICEhd2luZG93LmdldENvbXB1dGVkU3R5bGU7XHJcbiAgdmFyIGdldFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIHx8IGZ1bmN0aW9uKCkge307XHJcblxyXG4gIHZhciBDT01QVVRFRF9TSVpFX0lOQ0xVREVTX1BBRERJTkcgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIUhBU19DT01QVVRFRF9TVFlMRSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHBhcmVudCA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGUuc3R5bGUuY3NzVGV4dCA9XHJcbiAgICAgICd3aWR0aDoxMHB4O3BhZGRpbmc6MnB4OycgK1xyXG4gICAgICAnLXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94Oyc7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZSk7XHJcblxyXG4gICAgdmFyIHdpZHRoID0gZ2V0U3R5bGVzKGUsIG51bGwpLndpZHRoO1xyXG4gICAgdmFyIHJldCA9IHdpZHRoID09PSAnMTBweCc7XHJcblxyXG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKGUpO1xyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmUgdGhlIGNvbXB1dGVkIHN0eWxlIGZvciBhbiBlbGVtZW50LCBwYXJzZWQgYXMgYSBmbG9hdC5cclxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0byBnZXQgc3R5bGUgZm9yLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZSBTdHlsZSBwcm9wZXJ0eS5cclxuICAgKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IFtzdHlsZXNdIE9wdGlvbmFsbHkgaW5jbHVkZSBjbGVhbiBzdHlsZXMgdG9cclxuICAgKiAgICAgdXNlIGluc3RlYWQgb2YgYXNraW5nIGZvciB0aGVtIGFnYWluLlxyXG4gICAqIEByZXR1cm4ge251bWJlcn0gVGhlIHBhcnNlZCBjb21wdXRlZCB2YWx1ZSBvciB6ZXJvIGlmIHRoYXQgZmFpbHMgYmVjYXVzZSBJRVxyXG4gICAqICAgICB3aWxsIHJldHVybiAnYXV0bycgd2hlbiB0aGUgZWxlbWVudCBkb2Vzbid0IGhhdmUgbWFyZ2lucyBpbnN0ZWFkIG9mXHJcbiAgICogICAgIHRoZSBjb21wdXRlZCBzdHlsZS5cclxuICAgKi9cclxuICB2YXIgZ2V0TnVtYmVyU3R5bGUgPSBmdW5jdGlvbihcclxuICAgIGVsOiBIVE1MRWxlbWVudCxcclxuICAgIGVsU3R5bGU6ICd3aWR0aCcgfCAnaGVpZ2h0JyxcclxuICAgIGVsU3R5bGVzPzogQ1NTU3R5bGVEZWNsYXJhdGlvblxyXG4gICkge1xyXG4gICAgaWYgKEhBU19DT01QVVRFRF9TVFlMRSkge1xyXG4gICAgICBlbFN0eWxlcyA9IGVsU3R5bGVzIHx8IGdldFN0eWxlcyhlbCwgbnVsbCk7XHJcbiAgICAgIHZhciB2YWx1ZSA9IGdldEZsb2F0KGVsU3R5bGVzW2VsU3R5bGVdKTtcclxuXHJcbiAgICAgIC8vIFN1cHBvcnQgSUU8PTExIGFuZCBXM0Mgc3BlYy5cclxuICAgICAgaWYgKCFDT01QVVRFRF9TSVpFX0lOQ0xVREVTX1BBRERJTkcgJiYgZWxTdHlsZSA9PT0gJ3dpZHRoJykge1xyXG4gICAgICAgIHZhbHVlICs9XHJcbiAgICAgICAgICBnZXRGbG9hdChlbFN0eWxlcy5wYWRkaW5nTGVmdCkgK1xyXG4gICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMucGFkZGluZ1JpZ2h0KSArXHJcbiAgICAgICAgICBnZXRGbG9hdChlbFN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpICtcclxuICAgICAgICAgIGdldEZsb2F0KGVsU3R5bGVzLmJvcmRlclJpZ2h0V2lkdGgpO1xyXG4gICAgICB9IGVsc2UgaWYgKCFDT01QVVRFRF9TSVpFX0lOQ0xVREVTX1BBRERJTkcgJiYgZWxTdHlsZSA9PT0gJ2hlaWdodCcpIHtcclxuICAgICAgICB2YWx1ZSArPVxyXG4gICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMucGFkZGluZ1RvcCkgK1xyXG4gICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMucGFkZGluZ0JvdHRvbSkgK1xyXG4gICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMuYm9yZGVyVG9wV2lkdGgpICtcclxuICAgICAgICAgIGdldEZsb2F0KGVsU3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGdldEZsb2F0KGVsLnN0eWxlW2VsU3R5bGVdKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgaXNOdW1iZXIgPSBmdW5jdGlvbihuOiBhbnkpIHtcclxuICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgKGlzRmluaXRlKG4pIGFzIGJvb2xlYW4pO1xyXG4gIH07XHJcblxyXG4gIHZhciBnZXRGbG9hdCA9IGZ1bmN0aW9uKHZhbHVlOiBhbnkpIHtcclxuICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICByZXR1cm4gaXNOdW1iZXIodmFsdWUpID8gKHZhbHVlIGFzIG51bWJlcikgOiAwO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBnZXROdW1iZXJTdHlsZShlbGVtZW50LCBzdHlsZSwgc3R5bGVzKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQcmV2aW91c1NpYmxpbmdzID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhbW91bnQgPSAxMCkgPT4ge1xyXG4gIGNvbnN0IGVsZW1lbnRzID0gW107XHJcbiAgbGV0IHNpYmxpbmcgPSBlbGVtZW50LnByZXZpb3VzU2libGluZyBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgd2hpbGUgKHNpYmxpbmcgJiYgZWxlbWVudHMubGVuZ3RoIDwgYW1vdW50KSB7XHJcbiAgICBlbGVtZW50cy5wdXNoKHNpYmxpbmcpO1xyXG4gICAgc2libGluZyA9IHNpYmxpbmcucHJldmlvdXNTaWJsaW5nIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICB9XHJcbiAgcmV0dXJuIGVsZW1lbnRzO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE5leHRTaWJsaW5ncyA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgYW1vdW50ID0gMTApID0+IHtcclxuICBjb25zdCBlbGVtZW50cyA9IFtdO1xyXG4gIGxldCBzaWJsaW5nID0gZWxlbWVudC5uZXh0U2libGluZyBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcblxyXG4gIHdoaWxlIChzaWJsaW5nICYmIGVsZW1lbnRzLmxlbmd0aCA8IGFtb3VudCkge1xyXG4gICAgZWxlbWVudHMucHVzaChzaWJsaW5nKTtcclxuICAgIHNpYmxpbmcgPSBzaWJsaW5nLm5leHRTaWJsaW5nIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBlbGVtZW50cztcclxufTsiLCJpbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ3RzLWRlYm91bmNlJztcclxuaW1wb3J0IHtcclxuICBjcmVhdGVFbGVtZW50LFxyXG4gIGExMXlDbGljayxcclxuICBjcm9zc0N1c3RvbUV2ZW50LFxyXG4gIGlzSW50ZWdlcixcclxuICBpc09iamVjdCxcclxuICBldmVyeUVsZW1lbnQsXHJcbiAgZ2V0U3VicGl4ZWxTdHlsZSxcclxuICBnZXROZXh0U2libGluZ3MsXHJcbiAgZ2V0UHJldmlvdXNTaWJsaW5nc1xyXG59IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuXHJcbmVudW0gU2xpZGVEaXJlY3Rpb24ge1xyXG4gIFByZXYsXHJcbiAgTmV4dFxyXG59XHJcblxyXG5lbnVtIFNsaWRlclN0YXRlIHtcclxuICBFbmFibGVkID0gMSxcclxuICBEaXNhYmxlZCA9IDBcclxufVxyXG5cclxuZW51bSBBdXRvcGxheVN3aXRjaCB7XHJcbiAgRW5hYmxlLFxyXG4gIERpc2FibGVcclxufVxyXG5cclxuZW51bSBJc0F1dG9wbGF5aW5nIHtcclxuICBZZXMsXHJcbiAgTm8gPSAwXHJcbn1cclxuXHJcbmludGVyZmFjZSBBY3RpdmVWaXNpYmxlU2xpZGVzIHtcclxuICAodmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSwgYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50KTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIEN1c3RvbVBhZ2luZyB7XHJcbiAgKGluZGV4OiBudW1iZXIsIGExMXlTbGlkZXI6IEExMVlTbGlkZXIpOiBzdHJpbmc7XHJcbn1cclxuXHJcbnR5cGUgT3B0aW9ucyA9IHtcclxuICAvKiogQWRkcyBhIGNvbnRhaW5lciBlbGVtZW50IGFyb3VuZCB0aGUgc2xpZGVyICovXHJcbiAgY29udGFpbmVyPzogYm9vbGVhbjtcclxuICAvKiogRW5hYmxlcyBwcmV2L25leHQgYnV0dG9uICovXHJcbiAgYXJyb3dzPzogYm9vbGVhbjtcclxuICAvKiogQnV0dG9uIHRvIHRyaWdnZXIgcHJldmlvdXMgc2xpZGUuIEExMVlTbGlkZXIgd2lsbCBnZW5lcmF0ZSBvbmUgYnkgZGVmYXVsdC4gQ2FuIGJlIG9uZSBvciBtdWx0aXBsZSBIVE1MIGVsZW1lbnRzICovXHJcbiAgcHJldkFycm93PzogSFRNTEVsZW1lbnQgfCBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PiB8IE5vZGVMaXN0O1xyXG4gIC8qKiBCdXR0b24gdG8gdHJpZ2dlciBuZXh0IHNsaWRlLiBBMTFZU2xpZGVyIHdpbGwgZ2VuZXJhdGUgb25lIGJ5IGRlZmF1bHQuIENhbiBiZSBvbmUgb3IgbXVsdGlwbGUgSFRNTCBlbGVtZW50cyAqL1xyXG4gIG5leHRBcnJvdz86IEhUTUxFbGVtZW50IHwgSFRNTENvbGxlY3Rpb25PZjxIVE1MRWxlbWVudD4gfCBOb2RlTGlzdDtcclxuICAvKiogR2VuZXJhdGUgbmF2aWdhdGlvbiBkb3RzICovXHJcbiAgZG90cz86IGJvb2xlYW47XHJcbiAgLyoqIEhlaWdodCBvZiBzbGlkZXIgY29udGFpbmVyIGNoYW5nZXMgYWNjb3JkaW5nIHRvIGVhY2ggc2xpZGUncyBoZWlnaHQgKi9cclxuICBhZGFwdGl2ZUhlaWdodD86IGJvb2xlYW47XHJcbiAgLyoqIEFkZHMgYSBza2lwIGJ1dHRvbiBiZWZvcmUgdGhlIHNsaWRlciBmb3IgYTExeSBkZXZpY2VzIChDYW4gYmUgc2VlbiBieSB0YWJiaW5nKSAqL1xyXG4gIHNraXBCdG4/OiBib29sZWFuO1xyXG4gIC8qKiBUaGUgdG90YWwgbnVtYmVyIG9mIGl0ZW1zIHRvIGJlIHNob3duLiBCeSBkZWZhdWx0IEExMVlTbGlkZXIgd2lsbCB3b3JrIGJ5IGRlZmF1bHQgYmFzZWQgb2ZmIHlvdXIgQ1NTIHN0eWxpbmcuIFRoaXMgb3B0aW9uIGhhcmRjb2RlcyB0aGUgd2lkdGggaW50byB0aGUgSFRNTCBmb3IgeW91ICovXHJcbiAgc2xpZGVzVG9TaG93PzogbnVtYmVyIHwgbnVsbDtcclxuICAvKiogRW5hYmxlcyB0aGUgYXV0b21hdGljIGNoYW5nZSBvZiBzbGlkZXMgKi9cclxuICBhdXRvcGxheT86IGJvb2xlYW47XHJcbiAgLyoqIFRpbWUgYmV0d2VlbiBzbGlkZSBjaGFuZ2VzIHdoZW4gYXV0b3BsYXkgaXMgZW5hYmxlZCAqL1xyXG4gIGF1dG9wbGF5U3BlZWQ/OiBudW1iZXI7XHJcbiAgLyoqIElmIGF1dG9wbGF5IGlzIGVuYWJsZWQgdGhlbiBwYXVzZSB3aGVuIHRoZSBzbGlkZXIgaXMgaG92ZXJlZCAqL1xyXG4gIGF1dG9wbGF5SG92ZXJQYXVzZT86IGJvb2xlYW47XHJcbiAgLyoqICoqKEVYUEVSSU1FTlRBTCkqKiBNYWtlcyB0aGUgY2VudGVyIHNsaWRlIGFjdGl2ZSAqL1xyXG4gIGNlbnRlck1vZGU/OiBib29sZWFuO1xyXG4gIC8qKiBNYWtlcyB0aGUgc2xpZGVyIGluZmluaXRlbHkgbG9vcCAqL1xyXG4gIGluZmluaXRlPzogYm9vbGVhbjtcclxuICAvKiogRGlzYWJsZXMgdGhlIHNsaWRlciAqL1xyXG4gIGRpc2FibGU/OiBib29sZWFuO1xyXG4gIC8qKiBEZWZpbmUgb3B0aW9ucyBmb3IgZGlmZmVyZW50IHZpZXdwb3J0IHdpZHRocyAqL1xyXG4gIHJlc3BvbnNpdmU/OiBvYmplY3QgfCBudWxsO1xyXG4gIC8qKiBEZWZpbmUgeW91ciBvd24gY3VzdG9tIGRvdHMgdGVtcGxhdGUgKi9cclxuICBjdXN0b21QYWdpbmc/OiBDdXN0b21QYWdpbmcgfCBudWxsO1xyXG4gIC8qKiBTd2lwZSBmdW5jdGlvbmFsaXR5ICovXHJcbiAgc3dpcGU/OiBib29sZWFuO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQTExWVNsaWRlciB7XHJcbiAgcHJpdmF0ZSBfYWN0aXZlQ2xhc3M6IHN0cmluZztcclxuICBwcml2YXRlIF92aXNpYmxlQ2xhc3M6IHN0cmluZztcclxuICBwcml2YXRlIF9kb3RzQ2xhc3M6IHN0cmluZztcclxuICBwcml2YXRlIF9zbGlkZXJDbGFzczogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2hhc0N1c3RvbUFycm93czogYm9vbGVhbjtcclxuICBwcml2YXRlIF9mb2N1c2FibGU6IHN0cmluZztcclxuICBwcml2YXRlIF9jaGVja1Nob3VsZEVuYWJsZURlYm91bmNlZDogYW55O1xyXG4gIHByaXZhdGUgX3VwZGF0ZUhlaWdodERlYm91bmNlZDogYW55O1xyXG4gIHByaXZhdGUgX2dlbmVyYXRlRG90c0RlYm91bmNlZDogYW55O1xyXG4gIHByaXZhdGUgX3VwZGF0ZVNjcm9sbFBvc2l0aW9uOiBhbnk7XHJcbiAgcHJpdmF0ZSBfYXV0b3BsYXlUaW1lcjogSXNBdXRvcGxheWluZztcclxuICBwcml2YXRlIGF1dG9wbGF5QnRuOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIF9wYXVzZU9uTW91c2VMZWF2ZTogYm9vbGVhbjtcclxuICBwcml2YXRlIF9za2lwQnRuczogSFRNTEVsZW1lbnRbXTtcclxuICBwdWJsaWMgc2xpZGVyOiBIVE1MRWxlbWVudDtcclxuICBwdWJsaWMgc2xpZGVzOiBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PjtcclxuICBwdWJsaWMgZG90czogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gIHB1YmxpYyBzd2lwZTogYm9vbGVhbjtcclxuICBwdWJsaWMgYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50O1xyXG4gIHB1YmxpYyB2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdO1xyXG4gIHB1YmxpYyBzbGlkZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIHB1YmxpYyBvcHRpb25zOiBPcHRpb25zO1xyXG4gIHB1YmxpYyBzbGlkZXJFbmFibGVkOiBTbGlkZXJTdGF0ZTtcclxuICBwdWJsaWMgbW9kZXJuQnJvd3NlcjogYm9vbGVhbjtcclxuICBwdWJsaWMgbW91c2VEb3duOiBib29sZWFuO1xyXG4gIHB1YmxpYyB0b3VjaFN0YXJ0OiBib29sZWFuO1xyXG4gIHB1YmxpYyBzd2lwZVN0YXJ0WDogbnVtYmVyO1xyXG4gIHB1YmxpYyBzd2lwZVg6IG51bWJlcjtcclxuICBwdWJsaWMgc3dpcGVYQ2FjaGVkOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBvcHRpb25zPzogT3B0aW9ucykge1xyXG4gICAgLy8gRW5mb3JjZSBgZWxlbWVudGAgcGFyYW1ldGVyXHJcbiAgICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHJlcXVpcmVkIGlucHV0IFtlbGVtZW50XSBtdXN0IGJlIGFuIEhUTUxFbGVtZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWFrZSBzdXJlIG9wdGlvbnMgcGFyYW1ldGVyIGlzIGNvcnJlY3RcclxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgIWlzT2JqZWN0KG9wdGlvbnMpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHJlcXVpcmVkIGlucHV0IFtvcHRpb25zXSBtdXN0IGJlIGFuIE9iamVjdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2xpZGVyID0gZWxlbWVudDtcclxuICAgIHRoaXMuc2xpZGVzID0gZWxlbWVudC5jaGlsZHJlbiBhcyBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PjtcclxuICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcclxuICAgICAgJzxkaXYgY2xhc3M9XCJhMTF5LXNsaWRlci1jb250YWluZXJcIj48L2Rpdj4nXHJcbiAgICApO1xyXG4gICAgdGhpcy5fYWN0aXZlQ2xhc3MgPSAnYTExeS1zbGlkZXItYWN0aXZlJztcclxuICAgIHRoaXMuX3Zpc2libGVDbGFzcyA9ICdhMTF5LXNsaWRlci12aXNpYmxlJztcclxuICAgIHRoaXMuX2RvdHNDbGFzcyA9ICdhMTF5LXNsaWRlci1kb3RzJztcclxuICAgIHRoaXMuX3NsaWRlckNsYXNzID0gJ2ExMXktc2xpZGVyJztcclxuICAgIHRoaXMuX2ZvY3VzYWJsZSA9XHJcbiAgICAgICdhLCBhcmVhLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgYnV0dG9uLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsICpbdGFiaW5kZXhdLCAqW2NvbnRlbnRlZGl0YWJsZV0nO1xyXG4gICAgdGhpcy5fYXV0b3BsYXlUaW1lciA9IElzQXV0b3BsYXlpbmcuTm87XHJcbiAgICB0aGlzLmF1dG9wbGF5QnRuID0gY3JlYXRlRWxlbWVudChcclxuICAgICAgYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYTExeS1zbGlkZXItYXV0b3BsYXlcIj5Ub2dnbGUgc2xpZGVyIGF1dG9wbGF5PC9idXR0b24+YFxyXG4gICAgKTtcclxuICAgIHRoaXMuX3BhdXNlT25Nb3VzZUxlYXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9za2lwQnRucyA9IFtdO1xyXG4gICAgdGhpcy5kb3RzID0gbnVsbDtcclxuICAgIHRoaXMuc3dpcGUgPSB0cnVlO1xyXG4gICAgdGhpcy5hY3RpdmVTbGlkZSA9IHRoaXMuc2xpZGVzWzBdO1xyXG4gICAgdGhpcy52aXNpYmxlU2xpZGVzID0gW107XHJcbiAgICB0aGlzLnNsaWRlckVuYWJsZWQgPSBTbGlkZXJTdGF0ZS5EaXNhYmxlZDtcclxuICAgIHRoaXMubW9kZXJuQnJvd3NlciA9ICEhSFRNTEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbFRvO1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuICAgIHRoaXMudG91Y2hTdGFydCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zd2lwZVN0YXJ0WCA9IDA7XHJcbiAgICB0aGlzLnN3aXBlWCA9IDA7XHJcbiAgICB0aGlzLnN3aXBlWENhY2hlZCA9IDA7XHJcbiAgICB0aGlzLl9oYXNDdXN0b21BcnJvd3MgPVxyXG4gICAgICAob3B0aW9ucyAmJiBvcHRpb25zLnByZXZBcnJvdykgfHwgKG9wdGlvbnMgJiYgb3B0aW9ucy5uZXh0QXJyb3cpXHJcbiAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgY29udGFpbmVyOiB0cnVlLFxyXG4gICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgIHByZXZBcnJvdzpcclxuICAgICAgICAob3B0aW9ucyAmJiBvcHRpb25zLnByZXZBcnJvdykgfHxcclxuICAgICAgICBjcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYTExeS1zbGlkZXItcHJldlwiPlByZXZpb3VzIHNsaWRlPC9idXR0b24+J1xyXG4gICAgICAgICksXHJcbiAgICAgIG5leHRBcnJvdzpcclxuICAgICAgICAob3B0aW9ucyAmJiBvcHRpb25zLm5leHRBcnJvdykgfHxcclxuICAgICAgICBjcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYTExeS1zbGlkZXItbmV4dFwiPk5leHQgc2xpZGU8L2J1dHRvbj4nXHJcbiAgICAgICAgKSxcclxuICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxyXG4gICAgICBza2lwQnRuOiB0cnVlLFxyXG4gICAgICBzbGlkZXNUb1Nob3c6IG51bGwsXHJcbiAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcclxuICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlOiB0cnVlLFxyXG4gICAgICBjZW50ZXJNb2RlOiBmYWxzZSxcclxuICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgIGRpc2FibGU6IGZhbHNlLFxyXG4gICAgICByZXNwb25zaXZlOiBudWxsLFxyXG4gICAgICBjdXN0b21QYWdpbmc6IG51bGwsXHJcbiAgICAgIHN3aXBlOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFNldCB1c2VyLWlucHV0dGVkIG9wdGlvbnMgaWYgYXZhaWxhYmxlXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucywgLi4ub3B0aW9ucyB9O1xyXG5cclxuICAgIC8vIEJpbmRpbmdzXHJcbiAgICB0aGlzLl9oYW5kbGVQcmV2ID0gdGhpcy5faGFuZGxlUHJldi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5faGFuZGxlTmV4dCA9IHRoaXMuX2hhbmRsZU5leHQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX2hhbmRsZUF1dG9wbGF5ID0gdGhpcy5faGFuZGxlQXV0b3BsYXkuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX2hhbmRsZUF1dG9wbGF5SG92ZXIgPSB0aGlzLl9oYW5kbGVBdXRvcGxheUhvdmVyLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLl9oYW5kbGVBdXRvcGxheUV2ZW50ID0gdGhpcy5faGFuZGxlQXV0b3BsYXlFdmVudC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5fY2hlY2tTaG91bGRFbmFibGVEZWJvdW5jZWQgPSBkZWJvdW5jZShcclxuICAgICAgdGhpcy5fY2hlY2tTaG91bGRFbmFibGUuYmluZCh0aGlzKSxcclxuICAgICAgMjUwXHJcbiAgICApO1xyXG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0RGVib3VuY2VkID0gZGVib3VuY2UodGhpcy5fdXBkYXRlSGVpZ2h0LmJpbmQodGhpcyksIDI1MCk7XHJcbiAgICB0aGlzLl9nZW5lcmF0ZURvdHNEZWJvdW5jZWQgPSBkZWJvdW5jZSh0aGlzLl9nZW5lcmF0ZURvdHMuYmluZCh0aGlzKSwgMjUwKTtcclxuICAgIHRoaXMuX3VwZGF0ZVNjcm9sbFBvc2l0aW9uID0gZGVib3VuY2UoXHJcbiAgICAgICgpID0+IHRoaXMuc2Nyb2xsVG9TbGlkZSh0aGlzLmFjdGl2ZVNsaWRlKSxcclxuICAgICAgMjUwXHJcbiAgICApO1xyXG4gICAgdGhpcy5faGFuZGxlU2Nyb2xsID0gZGVib3VuY2UodGhpcy5faGFuZGxlU2Nyb2xsLmJpbmQodGhpcyksIDEwKTsgLy8gQ2FsbHMgX3Njcm9sbEZpbmlzaFxyXG4gICAgdGhpcy5fc2Nyb2xsRmluaXNoID0gZGVib3VuY2UodGhpcy5fc2Nyb2xsRmluaXNoLmJpbmQodGhpcyksIDE3NSk7IC8vIE1heSBmaXJlIHR3aWNlIGRlcGVuZGluZyBvbiBicm93c2VyXHJcbiAgICB0aGlzLl9zd2lwZU1vdXNlRG93biA9IHRoaXMuX3N3aXBlTW91c2VEb3duLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLl9zd2lwZU1vdXNlVXAgPSB0aGlzLl9zd2lwZU1vdXNlVXAuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX3N3aXBlTW91c2VNb3ZlID0gdGhpcy5fc3dpcGVNb3VzZU1vdmUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX3N3aXBlVG91Y2hTdGFydCA9IHRoaXMuX3N3aXBlVG91Y2hTdGFydC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5fc3dpcGVUb3VjaEVuZCA9IHRoaXMuX3N3aXBlVG91Y2hFbmQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX3N3aXBlVG91Y2hNb3ZlID0gdGhpcy5fc3dpcGVUb3VjaE1vdmUuYmluZCh0aGlzKTtcclxuXHJcbiAgICAvLyBJbml0aWFsaXplIHNsaWRlclxyXG4gICAgdGhpcy5faW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gSW5pdGlhbGl6ZSB0aGUgc2xpZGVyLCBzaG91bGQgbWlycm9yIGRlc3Ryb3koKVxyXG4gIHByaXZhdGUgX2luaXQoKSB7XHJcbiAgICAvLyBGaXJlZm94IG1vdmVzIHRoZSBzbGlkZXIgZGVwZW5kaW5nIG9uIHBhZ2UgbG9hZCBzbyByZXNldHRpbmcgdG8gMFxyXG4gICAgc2V0VGltZW91dCgoKSA9PiAodGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCA9IDApLCAxKTtcclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBsaXN0ZW5lcnMgZm9yIHJlc3BvbnNpdmUgb3B0aW9ucyBpZiBhZGRlZFxyXG4gICAgaWYgKGlzT2JqZWN0KHRoaXMub3B0aW9ucy5yZXNwb25zaXZlKSkgdGhpcy5fY2hlY2tSZXNwb25zaXZlKCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGhlIHNsaWRlciBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgZGVwZW5kaW5nIG9uIHNsaWRlcyBzaG93blxyXG4gICAgdGhpcy5fY2hlY2tTaG91bGRFbmFibGUoKTtcclxuXHJcbiAgICAvLyBFbmFibGUvZGlzYWJsZSBzbGlkZXIgYWZ0ZXIgcmVzaXplXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fY2hlY2tTaG91bGRFbmFibGVEZWJvdW5jZWQpO1xyXG5cclxuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2luaXQnLCB7XHJcbiAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2hlY2tTaG91bGRFbmFibGUoKSB7XHJcbiAgICBsZXQgc2hvdWxkRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBJZiB1c2VyIHNwZWNpZmllZCB0byBkaXNhYmxlICh1c3VhbGx5IGZvciByZXNwb25zaXZlIG9yIHVwZGF0ZU9wdGlvbnMpXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGUgPT09IHRydWUpIHNob3VsZEVuYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8vIElmIDEgb3IgbGVzcyBzbGlkZXMgZXhpc3QgdGhlbiBhIHNsaWRlciBpcyBub3QgbmVlZGVkXHJcbiAgICBpZiAodGhpcy5zbGlkZXMubGVuZ3RoIDw9IDEpIHNob3VsZEVuYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8vIElmIHVzZXIgZXhwbGljaXRseSBzZXQgc2xpZGVzIHRvIGJlIHNob3duIGFuZCBpdCdzIHRoZSBzYW1lIG51bWJlciBhcyBhdmFpbGFibGVcclxuICAgIGlmIChpc0ludGVnZXIodGhpcy5vcHRpb25zLnNsaWRlc1RvU2hvdykpIHtcclxuICAgICAgaWYgKHRoaXMuc2xpZGVzLmxlbmd0aCA9PT0gdGhpcy5vcHRpb25zLnNsaWRlc1RvU2hvdylcclxuICAgICAgICBzaG91bGRFbmFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBzbGlkZXMgb3V0c2lkZSB0aGUgc2xpZGVyJ3Mgdmlld3BvcnQgYSBzbGlkZXIgaXMgbm90IG5lZWRlZFxyXG4gICAgICB0aGlzLl9nZXRBY3RpdmVBbmRWaXNpYmxlKG51bGwsICh2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdKSA9PiB7XHJcbiAgICAgICAgaWYgKHZpc2libGVTbGlkZXMubGVuZ3RoID09PSB0aGlzLnNsaWRlcy5sZW5ndGgpIHNob3VsZEVuYWJsZSA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFbmFibGUvZGlzYWJsZSBzbGlkZXIgYmFzZWQgb24gYWJvdmUgcmVxdWlyZW1lbnRzXHJcbiAgICBpZiAoc2hvdWxkRW5hYmxlICYmIHRoaXMuc2xpZGVyRW5hYmxlZCA9PT0gU2xpZGVyU3RhdGUuRGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5fZW5hYmxlU2xpZGVyKCk7XHJcbiAgICB9IGVsc2UgaWYgKCFzaG91bGRFbmFibGUgJiYgdGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5FbmFibGVkKSB7XHJcbiAgICAgIHRoaXMuX2Rpc2FibGVTbGlkZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDdXN0b20gYnV0dG9ucyBzaG91bGQgYmUgaGlkZGVuIGlmIG5vdCBpbml0aWFsbHkgZW5hYmxlZFxyXG4gICAgaWYgKCFzaG91bGRFbmFibGUgJiYgdGhpcy5faGFzQ3VzdG9tQXJyb3dzKSB7XHJcbiAgICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMucHJldkFycm93LCBwcmV2QXJyb3cgPT4ge1xyXG4gICAgICAgIHByZXZBcnJvdy5jbGFzc0xpc3QuYWRkKCdhMTF5LXNsaWRlci1oaWRlJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5uZXh0QXJyb3csIG5leHRBcnJvdyA9PiB7XHJcbiAgICAgICAgbmV4dEFycm93LmNsYXNzTGlzdC5hZGQoJ2ExMXktc2xpZGVyLWhpZGUnKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBFbmFibGUgYWxsIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBzbGlkZXIuIFNob3VsZCBtaXJyb3IgX2Rpc2FibGVTbGlkZXIoKVxyXG4gIHByaXZhdGUgX2VuYWJsZVNsaWRlcigpIHtcclxuICAgIC8vIFNldCBzbGlkZXIgdG8gZW5hYmxlZFxyXG4gICAgdGhpcy5zbGlkZXJFbmFibGVkID0gU2xpZGVyU3RhdGUuRW5hYmxlZDtcclxuXHJcbiAgICAvLyBBZGQgc2xpZGVyIGNvbnRhaW5lciB0byBET00gYW5kIG1vdmUgc2xpZGVyIGludG8gaXQgaWYgZW5hYmxlZFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250YWluZXIpIHtcclxuICAgICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRoaXMuc2xpZGVyQ29udGFpbmVyKTtcclxuICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgdGhpcy5zbGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBza2lwIGJ1dHRvbiBiZWZvcmUgc2xpZGVyIGlmIGVuYWJsZWRcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2tpcEJ0bikgdGhpcy5fYWRkU2tpcEJ0bigpO1xyXG5cclxuICAgIC8vIElmIHByZXYvbmV4dCBidXR0b25zIGFyZSBlbmFibGVkIGFuZCB1c2VyIGlzbid0IHVzaW5nIHRoZWlyIG93biBhZGQgaXQgdG8gdGhlIERPTVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hcnJvd3MgJiYgIXRoaXMuX2hhc0N1c3RvbUFycm93cykge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnByZXZBcnJvdyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxyXG4gICAgICAgICAgJ2JlZm9yZWJlZ2luJyxcclxuICAgICAgICAgIHRoaXMub3B0aW9ucy5wcmV2QXJyb3dcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5leHRBcnJvdyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxyXG4gICAgICAgICAgJ2JlZm9yZWJlZ2luJyxcclxuICAgICAgICAgIHRoaXMub3B0aW9ucy5uZXh0QXJyb3dcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUG9zc2libGUgZm9yIHRoZXJlIHRvIGJlIG11bHRpcGxlIHNvIG5lZWQgdG8gbG9vcCB0aHJvdWdoIHRoZW0gYWxsXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5vcHRpb25zLnByZXZBcnJvdywgcHJldkFycm93ID0+IHtcclxuICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgcHJldi9uZXh0IGJ1dHRvbnNcclxuICAgICAgcHJldkFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlUHJldiwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgICBwcmV2QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVQcmV2LCB7XHJcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLl9oYXNDdXN0b21BcnJvd3MpIHtcclxuICAgICAgICAvLyBVc2VyIGdlbmVyYXRlZCBidXR0b25zIGdldCBzcGVjaWFsIGhpZGUgY2xhc3MgcmVtb3ZlZFxyXG4gICAgICAgIHByZXZBcnJvdy5jbGFzc0xpc3QucmVtb3ZlKCdhMTF5LXNsaWRlci1oaWRlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMubmV4dEFycm93LCBuZXh0QXJyb3cgPT4ge1xyXG4gICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBwcmV2L25leHQgYnV0dG9uc1xyXG4gICAgICBuZXh0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVOZXh0LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgIG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZU5leHQsIHtcclxuICAgICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2hhc0N1c3RvbUFycm93cykge1xyXG4gICAgICAgIC8vIFVzZXIgZ2VuZXJhdGVkIGJ1dHRvbnMgZ2V0IHNwZWNpYWwgaGlkZSBjbGFzcyByZW1vdmVkXHJcbiAgICAgICAgbmV4dEFycm93LmNsYXNzTGlzdC5yZW1vdmUoJ2ExMXktc2xpZGVyLWhpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWRkIGRvdCBuYXZpZ2F0aW9uIGlmIGVuYWJsZWRcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZG90cykgdGhpcy5fZ2VuZXJhdGVEb3RzKCk7XHJcblxyXG4gICAgLy8gQWRkIGxpc3RlbmVyIGZvciB3aGVuIHRoZSBzbGlkZXIgc3RvcHMgbW92aW5nXHJcbiAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9oYW5kbGVTY3JvbGwsIGZhbHNlKTtcclxuXHJcbiAgICAvLyBBZGQgYWxsIENTUyBuZWVkZWRcclxuICAgIHRoaXMuX3NldENTUygpO1xyXG5cclxuICAgIC8vIEFkYXB0aXZlIGhlaWdodFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBVcGRhdGUgc2xpZGVyJ3MgaGVpZ2h0IGJhc2VkIG9uIGNvbnRlbnQgb2Ygc2xpZGVcclxuICAgICAgdGhpcy5fdXBkYXRlSGVpZ2h0KHRoaXMuYWN0aXZlU2xpZGUpO1xyXG5cclxuICAgICAgLy8gQWxzbyBhZGQgcmVzaXplIGxpc3RlbmVyIGZvciBpdFxyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlSGVpZ2h0RGVib3VuY2VkLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN0YXJ0IGF1dG9wbGF5IGlmIGVuYWJsZWRcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b3BsYXkpIHRoaXMuX2VuYWJsZUF1dG9wbGF5KCk7XHJcblxyXG4gICAgLy8gT24gcmVzaXplIG1ha2Ugc3VyZSB0byB1cGRhdGUgc2Nyb2xsIHBvc2l0aW9uIGFzIGNvbnRlbnQgbWF5IGNoYW5nZSBpbiB3aWR0aC9oZWlnaHRcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbik7XHJcblxyXG4gICAgLy8gQWRkIHN3aXBlIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zd2lwZSkgdGhpcy5fZW5hYmxlU3dpcGUoKTtcclxuICB9XHJcblxyXG4gIC8vIERpc2FibGUgYWxsIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBzbGlkZXIuIFNob3VsZCBtaXJyb3IgX2VuYWJsZVNsaWRlcigpXHJcbiAgcHJpdmF0ZSBfZGlzYWJsZVNsaWRlcigpIHtcclxuICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9IFNsaWRlclN0YXRlLkRpc2FibGVkO1xyXG5cclxuICAgIC8vIFJlbW92ZSBzbGlkZXIgZnJvbSBhMTF5LXNsaWRlcidzIGNvbnRhaW5lciBhbmQgdGhlbiByZW1vdmUgY29udGFpbmVyIGZyb20gRE9NXHJcbiAgICBpZiAoZG9jdW1lbnQuYm9keS5jb250YWlucyh0aGlzLnNsaWRlckNvbnRhaW5lcikpIHtcclxuICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRoaXMuc2xpZGVyKTtcclxuICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIucGFyZW50Tm9kZSAmJlxyXG4gICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zbGlkZXJDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBza2lwIGJ1dHRvblxyXG4gICAgdGhpcy5fcmVtb3ZlU2tpcEJ0bigpO1xyXG5cclxuICAgIC8vIFBvc3NpYmxlIGZvciB0aGVyZSB0byBiZSBtdWx0aXBsZSBzbyBuZWVkIHRvIGxvb3AgdGhyb3VnaCB0aGVtIGFsbFxyXG4gICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2QXJyb3csIHByZXZBcnJvdyA9PiB7XHJcbiAgICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgZm9yIHByZXYvbmV4dCBidXR0b25zXHJcbiAgICAgIHByZXZBcnJvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZVByZXYpO1xyXG4gICAgICBwcmV2QXJyb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVQcmV2KTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5faGFzQ3VzdG9tQXJyb3dzKSB7XHJcbiAgICAgICAgLy8gT25seSByZW1vdmUgZ2VuZXJhdGVkIGJ1dHRvbnMsIG5vdCB1c2VyLWRlZmluZWQgb25lc1xyXG4gICAgICAgIHByZXZBcnJvdy5wYXJlbnROb2RlICYmIHByZXZBcnJvdy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHByZXZBcnJvdyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVXNlciBnZW5lcmF0ZWQgYnV0dG9ucyBnZXQgc3BlY2lhbCBoaWRlIGNsYXNzIHJlbW92ZWRcclxuICAgICAgICBwcmV2QXJyb3cuY2xhc3NMaXN0LmFkZCgnYTExeS1zbGlkZXItaGlkZScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5vcHRpb25zLm5leHRBcnJvdywgbmV4dEFycm93ID0+IHtcclxuICAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmb3IgcHJldi9uZXh0IGJ1dHRvbnNcclxuICAgICAgbmV4dEFycm93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlTmV4dCk7XHJcbiAgICAgIG5leHRBcnJvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZU5leHQpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLl9oYXNDdXN0b21BcnJvd3MpIHtcclxuICAgICAgICAvLyBPbmx5IHJlbW92ZSBnZW5lcmF0ZWQgYnV0dG9ucywgbm90IHVzZXItZGVmaW5lZCBvbmVzXHJcbiAgICAgICAgbmV4dEFycm93LnBhcmVudE5vZGUgJiYgbmV4dEFycm93LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobmV4dEFycm93KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBVc2VyIGdlbmVyYXRlZCBidXR0b25zIGdldCBzcGVjaWFsIGhpZGUgY2xhc3MgcmVtb3ZlZFxyXG4gICAgICAgIG5leHRBcnJvdy5jbGFzc0xpc3QuYWRkKCdhMTF5LXNsaWRlci1oaWRlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFdpbGwgcmVtb3ZlIGRvdHMgaWYgdGhleSBleGlzdFxyXG4gICAgdGhpcy5fcmVtb3ZlRG90cygpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBsaXN0ZW5lciBmb3Igd2hlbiB0aGUgc2xpZGVyIHN0b3BzIG1vdmluZ1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5faGFuZGxlU2Nyb2xsLCBmYWxzZSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCBDU1NcclxuICAgIHRoaXMuX3JlbW92ZUNTUygpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBhbGwgYWRhcHRpdmUgaGVpZ2h0IGZ1bmN0aW9uYWxpdHlcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVIZWlnaHREZWJvdW5jZWQpO1xyXG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KGZhbHNlKTtcclxuXHJcbiAgICAvLyBTdG9wIGF1dG9wbGF5IGlmIGVuYWJsZWRcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b3BsYXkpIHRoaXMuX2Rpc2FibGVBdXRvcGxheSgpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBzd2lwZSBldmVudCBsaXN0ZW5lcnNcclxuICAgIHRoaXMuX2Rpc2FibGVTd2lwZSgpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBzY3JvbGwgcG9zaXRpb24gdXBkYXRlIGNoZWNrXHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlU2Nyb2xsUG9zaXRpb24pO1xyXG5cclxuICAgIC8vIFJlbW92ZSBzd2lwZSBmdW5jdGlvbmFsaXR5XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnN3aXBlKSB0aGlzLl9kaXNhYmxlU3dpcGUoKTtcclxuICB9XHJcblxyXG4gIC8vIEFkZCBhbGwgQ1NTIG5lZWRlZCBmb3IgdGhlIHNsaWRlci4gU2hvdWxkIG1pcnJvciBfcmVtb3ZlQ1NTKClcclxuICBwcml2YXRlIF9zZXRDU1MoYWN0aXZlU2xpZGU/OiBIVE1MRWxlbWVudCkge1xyXG4gICAgLy8gVXBkYXRlIHNsaWRlIGVsZW1lbnQgQ1NTXHJcbiAgICB0aGlzLl9hZGRTbGlkZXNXaWR0aCgpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBzbGlkZXIgaW5zdGFuY2UgdG8gZ2V0IHRoZSBjb3JyZWN0IGVsZW1lbnRzXHJcbiAgICB0aGlzLl9nZXRBY3RpdmVBbmRWaXNpYmxlKGFjdGl2ZVNsaWRlIHx8IG51bGwpO1xyXG5cclxuICAgIC8vIEFkZCBtYWluIHNsaWRlciBjbGFzcyBpZiBpdCBkb2Vzbid0IGhhdmUgaXQgYWxyZWFkeVxyXG4gICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCh0aGlzLl9zbGlkZXJDbGFzcyk7XHJcblxyXG4gICAgLy8gUmVzZXQgdGhlIG1vcmUgZHluYW1pYyBDU1MgZmlyc3QgaWYgaXQgZXhpc3RzXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9hY3RpdmVDbGFzcyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fdmlzaWJsZUNsYXNzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFkZCBpbiBhY3RpdmUgY2xhc3Nlc1xyXG4gICAgdGhpcy5hY3RpdmVTbGlkZS5jbGFzc0xpc3QuYWRkKHRoaXMuX2FjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAvLyBBZGQgaW4gdmlzaWJsZSBjbGFzc2VzXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy52aXNpYmxlU2xpZGVzLCBzbGlkZSA9PiB7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQodGhpcy5fdmlzaWJsZUNsYXNzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFRyaWdnZXIgZG90IHVwZGF0ZVxyXG4gICAgdGhpcy5fdXBkYXRlRG90cyh0aGlzLmFjdGl2ZVNsaWRlKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgYWxsIGExMXkgZnVuY3Rpb25hbGl0eVxyXG4gICAgdGhpcy5fdXBkYXRlQTExWSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gUmVtb3ZlIGFsbCBDU1MgbmVlZGVkIGZvciB0aGUgc2xpZGVyLiBTaG91bGQgbWlycm9yIF9zZXRDU1MoKVxyXG4gIHByaXZhdGUgX3JlbW92ZUNTUygpIHtcclxuICAgIC8vIFJlbW92ZSBpdGVtIENTUyBpZiBpdCB3YXMgc2V0XHJcbiAgICB0aGlzLl9yZW1vdmVTbGlkZXNXaWR0aCgpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBjbGFzcyB0byBzbGlkZXJcclxuICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2xpZGVyQ2xhc3MpO1xyXG5cclxuICAgIC8vIFJlc2V0IGFsbCB0aGUgZHluYW1pYyBjbGFzc2VzXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9hY3RpdmVDbGFzcyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fdmlzaWJsZUNsYXNzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJlbW92ZSBhbGwgYTExeSBmdW5jdGlvbmFsaXR5XHJcbiAgICB0aGlzLl9yZW1vdmVBMTFZKCk7XHJcbiAgfVxyXG5cclxuICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBicmVha3BvaW50c1xyXG4gIHByaXZhdGUgX2NoZWNrUmVzcG9uc2l2ZSgpIHtcclxuICAgIGlmICghaXNPYmplY3QodGhpcy5vcHRpb25zLnJlc3BvbnNpdmUpKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgeyByZXNwb25zaXZlLCAuLi5pbml0aWFsT3B0aW9ucyB9ID0gdGhpcy5vcHRpb25zO1xyXG4gICAgY29uc3QgYnJlYWtwb2ludHM6IEFycmF5PHsgbXFsOiBNZWRpYVF1ZXJ5TGlzdDsgb3B0aW9uczogT3B0aW9ucyB9PiA9IFtdO1xyXG5cclxuICAgIC8vIFNvcnQgbWVkaWEgcXVlcmllcyBmcm9tIGxvd2VzdCB0byBoaWdoZXN0XHJcbiAgICBjb25zdCByZXNwb25zaXZlT3B0aW9ucyA9IE9iamVjdC5lbnRyaWVzKFxyXG4gICAgICB0aGlzLm9wdGlvbnMucmVzcG9uc2l2ZSBhcyBvYmplY3RcclxuICAgICkuc29ydCgoYSwgYikgPT4gYVsxXSAtIGJbMV0pO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIG5ldyBKUyBtZWRpYSBxdWVyeSBmb3IgaW5pdGlhbCBvcHRpb25zIGZvciB0aGUgbG93ZXN0IE1RIGFuZCBkb3duXHJcbiAgICBicmVha3BvaW50cy5wdXNoKHtcclxuICAgICAgbXFsOiB3aW5kb3cubWF0Y2hNZWRpYShcclxuICAgICAgICBgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke1xyXG4gICAgICAgICAgTnVtYmVyLnBhcnNlSW50KHJlc3BvbnNpdmVPcHRpb25zWzBdWzBdKSAtIDFcclxuICAgICAgICB9cHgpYFxyXG4gICAgICApLFxyXG4gICAgICBvcHRpb25zOiBpbml0aWFsT3B0aW9ucyBhcyBPcHRpb25zXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBMb29wIHRocm91Z2ggYWxsIHJlc3BvbnNpdmUgb2JqZWN0cyBhbmQgZ2VuZXJhdGUgYSBKUyBtZWRpYSBxdWVyeVxyXG4gICAgcmVzcG9uc2l2ZU9wdGlvbnMuZm9yRWFjaChcclxuICAgICAgKFticmVha3BvaW50LCBicmVha3BvaW50T3B0aW9uc106IFtzdHJpbmcsIE9wdGlvbnNdLCBpKSA9PiB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IE9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucyB9O1xyXG4gICAgICAgIGxldCBtcWxTdHJpbmcgPSBgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke2JyZWFrcG9pbnR9cHgpYDtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG1vcmUgbWVkaWEgcXVlcmllcyBhZnRlciB0aGlzIHRoZW4gY3JlYXRlIGEgc3RvcHBpbmcgcG9pbnRcclxuICAgICAgICBpZiAoaSAhPT0gcmVzcG9uc2l2ZU9wdGlvbnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgbXFsU3RyaW5nID0gbXFsU3RyaW5nLmNvbmNhdChcclxuICAgICAgICAgICAgYCBhbmQgKG1heC13aWR0aDogJHtcclxuICAgICAgICAgICAgICBOdW1iZXIucGFyc2VJbnQocmVzcG9uc2l2ZU9wdGlvbnNbaSArIDFdWzBdKSAtIDFcclxuICAgICAgICAgICAgfXB4KWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBsYXllciBjYWtlIG9mIG9wdGlvbnMgZnJvbSB0aGUgbG93ZXN0IGJyZWFrcG9pbnQgdG8gdGhlIGhpZ2hlc3RcclxuICAgICAgICBicmVha3BvaW50cy5mb3JFYWNoKGJyZWFrcG9pbnQgPT4ge1xyXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCBicmVha3BvaW50Lm9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgdGhpcyBzcGVjaWZpYyBicmVha3BvaW50IHRvIHRoZSB0b3Agb2YgdGhlIGNha2Ug8J+OglxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgYnJlYWtwb2ludE9wdGlvbnMpO1xyXG5cclxuICAgICAgICBicmVha3BvaW50cy5wdXNoKHtcclxuICAgICAgICAgIG1xbDogd2luZG93Lm1hdGNoTWVkaWEobXFsU3RyaW5nKSxcclxuICAgICAgICAgIG9wdGlvbnNcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBGb3IgZWFjaCBKUyBtZWRpYSBxdWVyeSBhZGQgYW4gZXZlbnQgbGlzdGVuZXJcclxuICAgIGJyZWFrcG9pbnRzLm1hcChicmVha3BvaW50ID0+IHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIFRoaXMgc2hvdWxkIGluIHRoZW9yeSBiZSBydW5uaW5nIGF0IHRoZSBpbml0aWFsaXphdGlvblxyXG4gICAgICAgKiBzbyBtYWtlIHN1cmUgdGhlIGNvcnJlY3Qgb3B0aW9ucyBhcmUgc2V0LlxyXG4gICAgICAgKi9cclxuICAgICAgaWYgKGJyZWFrcG9pbnQubXFsLm1hdGNoZXMpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucywgYnJlYWtwb2ludC5vcHRpb25zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ3JlYXRlcyBhIG1lZGlhIHF1ZXJ5IGxpc3RlbmVyXHJcbiAgICAgIGJyZWFrcG9pbnQubXFsLmFkZExpc3RlbmVyKCgpID0+IHtcclxuICAgICAgICBpZiAoYnJlYWtwb2ludC5tcWwubWF0Y2hlcykge1xyXG4gICAgICAgICAgLy8gVXBkYXRlIHNsaWRlciB3aXRoIG5ldyBvcHRpb25zXHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoYnJlYWtwb2ludC5vcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBJZiBzbGlkZXNUb1Nob3cgaXMgdXNlZCB0aGVuIG1hbnVhbGx5IGFkZCBzbGlkZSB3aWR0aHNcclxuICBwcml2YXRlIF9hZGRTbGlkZXNXaWR0aCgpIHtcclxuICAgIGlmIChpc0ludGVnZXIodGhpcy5vcHRpb25zLnNsaWRlc1RvU2hvdykpIHtcclxuICAgICAgLy8gUGVyY2VudGFnZSB3aWR0aCBvZiBlYWNoIHNsaWRlXHJcbiAgICAgIGNvbnN0IHNsaWRlV2lkdGggPSAxMDAgLyAodGhpcy5vcHRpb25zLnNsaWRlc1RvU2hvdyBhcyBudW1iZXIpO1xyXG5cclxuICAgICAgLy8gU2V0IHN0eWxlcyBmb3Igc2xpZGVyXHJcbiAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblxyXG4gICAgICAvLyBTZXQgc3R5bGVzIGZvciBpdGVtc1xyXG4gICAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgICBzbGlkZS5zdHlsZS53aWR0aCA9IGAke3NsaWRlV2lkdGh9JWA7XHJcbiAgICAgICAgc2xpZGUuc3R5bGUuZmxleCA9ICcwIDAgYXV0byc7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gUmVzZXQgZXZlcnl0aGluZyBpZiBudW1iZXIgb2YgaXRlbXMgbm90IGV4cGxpY2l0bHkgc2V0XHJcbiAgICAgIHRoaXMuX3JlbW92ZVNsaWRlc1dpZHRoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBSZXNldCBzbGlkZSBzdHlsaW5nIGV2ZW4gaWYgZXhwbGljaXRseSBzZXQgaW4gdGhlIG9wdGlvbnNcclxuICBwcml2YXRlIF9yZW1vdmVTbGlkZXNXaWR0aCgpIHtcclxuICAgIHRoaXMuc2xpZGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdkaXNwbGF5Jyk7XHJcblxyXG4gICAgZXZlcnlFbGVtZW50KHRoaXMuc2xpZGVzLCBzbGlkZSA9PiB7XHJcbiAgICAgIHNsaWRlLnN0eWxlLnJlbW92ZVByb3BlcnR5KCd3aWR0aCcpO1xyXG4gICAgICBzbGlkZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnZmxleCcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGUgYWxsIGFzc29jaWF0ZWQgYTExeSBmdW5jdGlvbmFsaXR5LiBTaG91bGQgbWlycm9yIF9yZW1vdmVBMTFZKClcclxuICBwcml2YXRlIF91cGRhdGVBMTFZKCkge1xyXG4gICAgLy8gUmVzZXQgYWxsIGExMXkgZnVuY3Rpb25hbGl0eSB0byBkZWZhdWx0IGJlZm9yZWhhbmRcclxuICAgIHRoaXMuX3JlbW92ZUExMVkoKTtcclxuXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgY29uc3QgZm9jdXNhYmxlSXRlbXMgPSBzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzYWJsZSk7XHJcblxyXG4gICAgICAvLyBJZiBzbGlkZSBpcyBub3QgdmlzaWJsZSBtYWtlIHRoZSBzbGlkZSB3cmFwcGVyIG5vdCBmb2N1c2FibGVcclxuICAgICAgaWYgKCFzbGlkZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5fdmlzaWJsZUNsYXNzKSkge1xyXG4gICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcclxuICAgICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXZlcnlFbGVtZW50KGZvY3VzYWJsZUl0ZW1zLCBmb2N1c2FibGVJdGVtID0+IHtcclxuICAgICAgICBpZiAoIXNsaWRlLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLl92aXNpYmxlQ2xhc3MpKSB7XHJcbiAgICAgICAgICBmb2N1c2FibGVJdGVtLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQnV0dG9ucyB3aWxsIGFkZCBkaXNhYmxlZCBzdGF0ZSBpZiBmaXJzdC9sYXN0IHNsaWRlXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xyXG4gICAgICBjb25zdCBmaXJzdFNsaWRlID0gdGhpcy5zbGlkZXIuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGNvbnN0IGxhc3RTbGlkZSA9IHRoaXMuc2xpZGVyLmxhc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGNvbnN0IGZpcnN0VmlzaWJsZVNsaWRlID0gdGhpcy52aXNpYmxlU2xpZGVzWzBdO1xyXG4gICAgICBjb25zdCBsYXN0VmlzaWJsZVNsaWRlID1cclxuICAgICAgICB0aGlzLnZpc2libGVTbGlkZXNbdGhpcy52aXNpYmxlU2xpZGVzLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgICAgLy8gSWYgY3VycmVudCBhY3RpdmUgc2xpZGUgaXMgdGhlIGZpcnN0IGVsZW1lbnQgdGhlbiBkaXNhYmxlIHByZXZcclxuICAgICAgaWYgKGZpcnN0VmlzaWJsZVNsaWRlID09PSBmaXJzdFNsaWRlKSB7XHJcbiAgICAgICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2QXJyb3csIHByZXZBcnJvdyA9PiB7XHJcbiAgICAgICAgICBwcmV2QXJyb3cuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgY3VycmVudCBhY3RpdmUgc2xpZGUgaXMgdGhlIGxhc3QgZWxlbWVudCB0aGVuIGRpc2FibGUgbmV4dFxyXG4gICAgICBpZiAobGFzdFZpc2libGVTbGlkZSA9PT0gbGFzdFNsaWRlKSB7XHJcbiAgICAgICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5uZXh0QXJyb3csIG5leHRBcnJvdyA9PiB7XHJcbiAgICAgICAgICBuZXh0QXJyb3cuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gUmVzZXQgYWxsIGFzc29jaWF0ZWQgYTExeSBmdW5jdGlvbmFsaXR5LiBTaG91bGQgbWlycm9yIF91cGRhdGVBMTFZKClcclxuICBwcml2YXRlIF9yZW1vdmVBMTFZKCkge1xyXG4gICAgZXZlcnlFbGVtZW50KHRoaXMuc2xpZGVzLCBzbGlkZSA9PiB7XHJcbiAgICAgIGNvbnN0IGZvY3VzYWJsZUl0ZW1zID0gc2xpZGUucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9mb2N1c2FibGUpO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIGExMXkgZm9yIGVhY2ggc2xpZGUgd3JhcHBlclxyXG4gICAgICBzbGlkZS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XHJcbiAgICAgIHNsaWRlLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcclxuXHJcbiAgICAgIC8vIFJlc2V0IGExMXkgYXR0cmlidXRlcyBmb3Igc2xpZGUgaW5uZXIgZWxlbWVudHNcclxuICAgICAgZXZlcnlFbGVtZW50KGZvY3VzYWJsZUl0ZW1zLCBmb2N1c2FibGVJdGVtID0+IHtcclxuICAgICAgICBmb2N1c2FibGVJdGVtLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBCdXR0b25zIGNvdWxkIHBvdGVudGlhbGx5IGhhdmUgZGlzYWJsZWQgc3RhdGUgc28gcmVtb3ZpbmdcclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMucHJldkFycm93LCBwcmV2QXJyb3cgPT5cclxuICAgICAgcHJldkFycm93LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG4gICAgKTtcclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMubmV4dEFycm93LCBuZXh0QXJyb3cgPT5cclxuICAgICAgbmV4dEFycm93LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FkZFNraXBCdG4oKSB7XHJcbiAgICBjb25zdCBiZWZvcmVFbCA9IGNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgIGA8YnV0dG9uIGNsYXNzPVwiYTExeS1zbGlkZXItc3Itb25seVwiIHR5cGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIj5DbGljayB0byBza2lwIHNsaWRlciBjYXJvdXNlbDwvYnV0dG9uPmBcclxuICAgICk7XHJcbiAgICBjb25zdCBhZnRlckVsID0gY3JlYXRlRWxlbWVudChcclxuICAgICAgYDxkaXYgY2xhc3M9XCJhMTF5LXNsaWRlci1zci1vbmx5XCIgdGFiaW5kZXg9XCItMVwiPkVuZCBvZiBzbGlkZXIgY2Fyb3VzZWw8L2Rpdj5gXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEV2ZW50IGhhbmRsZXIgdG8gZ28gdG8gZW5kXHJcbiAgICBjb25zdCBmb2N1c0VuZCA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGExMXlDbGljayhldmVudCkgPT09IHRydWUpIGFmdGVyRWwuZm9jdXMoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgYmVmb3JlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb2N1c0VuZCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgYmVmb3JlRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmb2N1c0VuZCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG5cclxuICAgIC8vIEFkZCB0byBET01cclxuICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBiZWZvcmVFbCk7XHJcbiAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgYWZ0ZXJFbCk7XHJcblxyXG4gICAgLy8gSWYgc2tpcCBidXR0b25zIGV4aXN0IGZvciB3aGF0ZXZlciByZWFzb24sIGVtcHR5IGFycmF5XHJcbiAgICB0aGlzLl9za2lwQnRucyA9IFtdO1xyXG5cclxuICAgIC8vIEFkZCBuZXdseSBjcmVhdGVkIGJ1dHRvbnMgdG8gbGlicmFyeSBzY29wZVxyXG4gICAgdGhpcy5fc2tpcEJ0bnMucHVzaChiZWZvcmVFbCwgYWZ0ZXJFbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZW1vdmVTa2lwQnRuKCkge1xyXG4gICAgY29uc3QgZWxlbWVudHMgPSBbXHJcbiAgICAgIC4uLmdldFByZXZpb3VzU2libGluZ3ModGhpcy5zbGlkZXIpLFxyXG4gICAgICAuLi5nZXROZXh0U2libGluZ3ModGhpcy5zbGlkZXIpXHJcbiAgICBdO1xyXG5cclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLl9za2lwQnRucywgc2tpcEJ0biA9PiB7XHJcbiAgICAgIHNraXBCdG4ucGFyZW50Tm9kZSAmJiBza2lwQnRuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2tpcEJ0bik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBldmVyeUVsZW1lbnQoZWxlbWVudHMsIGVsZW1lbnQgPT4ge1xyXG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2ExMXktc2xpZGVyLXNyLW9ubHknKSkge1xyXG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZSAmJiBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2VuZXJhdGVEb3RzKCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kb3RzID09PSBmYWxzZSkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJlbW92ZSBkb3RzIGlmIHRoZXkgYWxyZWFkeSBleGlzdFxyXG4gICAgdGhpcy5fcmVtb3ZlRG90cygpO1xyXG5cclxuICAgIC8vIFN0b3AgaWYgc2xpZGVyIGlzIGRpc2FibGVkXHJcbiAgICBpZiAodGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5EaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIENyZWF0ZSA8dWw+IHdyYXBwZXIgZm9yIGRvdHNcclxuICAgIHRoaXMuZG90cyA9IGNyZWF0ZUVsZW1lbnQoYDx1bCBjbGFzcz1cIiR7dGhpcy5fZG90c0NsYXNzfVwiPjwvdWw+YCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9nZXREb3RDb3VudCgpOyBpKyspIHtcclxuICAgICAgY29uc3QgZG90TGkgPSBjcmVhdGVFbGVtZW50KCc8bGk+PC9saT4nKTtcclxuICAgICAgbGV0IGRvdEJ0bjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmN1c3RvbVBhZ2luZykge1xyXG4gICAgICAgIGRvdEJ0biA9IGNyZWF0ZUVsZW1lbnQodGhpcy5vcHRpb25zLmN1c3RvbVBhZ2luZyhpLCB0aGlzKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG90QnRuID0gY3JlYXRlRWxlbWVudCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+Jyk7XHJcbiAgICAgICAgZG90QnRuLnRleHRDb250ZW50ID0gYE1vdmUgc2xpZGVyIHRvIGl0ZW0gIyR7aSArIDF9YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRXZlbnQgaGFuZGxlcnMgdG8gc3dpdGNoIHRvIHNsaWRlXHJcbiAgICAgIGNvbnN0IHN3aXRjaFRvU2xpZGUgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGExMXlDbGljayhldmVudCkgPT09IHRydWUpIHtcclxuICAgICAgICAgIC8vIEdvIHRvIHNsaWRlXHJcbiAgICAgICAgICB0aGlzLnNjcm9sbFRvU2xpZGUodGhpcy5zbGlkZXNbaV0pO1xyXG5cclxuICAgICAgICAgIC8vIERpc2FibGUgYXV0b3BsYXkgaWYgZW5hYmxlZFxyXG4gICAgICAgICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICBkb3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hUb1NsaWRlLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgIGRvdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHN3aXRjaFRvU2xpZGUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgIC8vIEFwcGVuZCB0byBVTFxyXG4gICAgICBkb3RMaS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRvdEJ0bik7XHJcbiAgICAgIHRoaXMuZG90cy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRvdExpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgc3R5bGVzIG9mIGRvdHMgYmVmb3JlIGFkZGluZyB0byBET01cclxuICAgIHRoaXMuX3VwZGF0ZURvdHModGhpcy5hY3RpdmVTbGlkZSk7XHJcblxyXG4gICAgLy8gQWRkIGRvdHMgVUwgdG8gRE9NXHJcbiAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgdGhpcy5kb3RzKTtcclxuXHJcbiAgICAvLyBEb3RzIG5lZWRlZCBtYXkgY2hhbmdlIG9uIHNjcmVlbiBzaXplIHNvIHJlZ2VuZXJhdGUgdGhlbSBmcm9tIHNjcmF0Y2hcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9nZW5lcmF0ZURvdHNEZWJvdW5jZWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0RG90Q291bnQoKSB7XHJcbiAgICBsZXQgdG90YWxTbGlkZXM6IG51bWJlciA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcclxuICAgIGxldCBzbGlkZXNUb1Nob3c6IG51bWJlciA9XHJcbiAgICAgIHRoaXMub3B0aW9ucy5zbGlkZXNUb1Nob3cgfHwgdGhpcy52aXNpYmxlU2xpZGVzLmxlbmd0aCB8fCAxO1xyXG4gICAgbGV0IGRvdHM6IG51bWJlciA9IHRvdGFsU2xpZGVzIC0gc2xpZGVzVG9TaG93ICsgMTtcclxuXHJcbiAgICByZXR1cm4gZG90cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlbW92ZURvdHMoKSB7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fZ2VuZXJhdGVEb3RzRGVib3VuY2VkKTtcclxuXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IGdldE5leHRTaWJsaW5ncyh0aGlzLnNsaWRlcik7XHJcblxyXG4gICAgaWYgKHRoaXMuZG90cyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuZG90cy5wYXJlbnROb2RlICYmIHRoaXMuZG90cy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZG90cyk7XHJcbiAgICB9XHJcblxyXG4gICAgZXZlcnlFbGVtZW50KGVsZW1lbnRzLCBlbGVtZW50ID0+IHtcclxuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuX2RvdHNDbGFzcykpIHtcclxuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUgJiYgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZURvdHMoYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBpZiAodGhpcy5kb3RzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChcclxuICAgICAgICBhY3RpdmVTbGlkZS5wYXJlbnROb2RlICYmIGFjdGl2ZVNsaWRlLnBhcmVudE5vZGUuY2hpbGRyZW4sXHJcbiAgICAgICAgYWN0aXZlU2xpZGVcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIFNldCBkb3QgdG8gbGFzdCBpdGVtIGlmIGFjdGl2ZSBpbmRleCBpcyBoaWdoZXIgdGhhbiBhbW91bnRcclxuICAgICAgaWYgKGFjdGl2ZUluZGV4ID4gdGhpcy5kb3RzLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIGFjdGl2ZUluZGV4ID0gdGhpcy5kb3RzLmNoaWxkcmVuLmxlbmd0aCAtIDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlc2V0IGNoaWxkcmVuIGFjdGl2ZSBjbGFzcyBpZiBleGlzdFxyXG4gICAgICBldmVyeUVsZW1lbnQodGhpcy5kb3RzLmNoaWxkcmVuLCBkb3QgPT5cclxuICAgICAgICBkb3QucXVlcnlTZWxlY3RvcignYnV0dG9uJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBBZGQgY2xhc3MgdG8gYWN0aXZlIGRvdFxyXG4gICAgICB0aGlzLmRvdHMuY2hpbGRyZW5bYWN0aXZlSW5kZXhdXHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpXHJcbiAgICAgICAgPy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2VuYWJsZUF1dG9wbGF5KCkge1xyXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgYXV0b3BsYXlcclxuICAgIHRoaXMuYXV0b3BsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBdXRvcGxheSwge1xyXG4gICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuYXV0b3BsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVBdXRvcGxheSwge1xyXG4gICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQXV0b3BsYXlFdmVudCwge1xyXG4gICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9oYW5kbGVBdXRvcGxheUV2ZW50LCB7XHJcbiAgICAgIHBhc3NpdmU6IHRydWVcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b3BsYXlIb3ZlclBhdXNlKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9oYW5kbGVBdXRvcGxheUhvdmVyLCB7XHJcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX2hhbmRsZUF1dG9wbGF5SG92ZXIsIHtcclxuICAgICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBhdXRvcGxheSB0b2dnbGUgYnV0dG9uIHRvIERPTVxyXG4gICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRoaXMuYXV0b3BsYXlCdG4pO1xyXG5cclxuICAgIC8vIFN0YXJ0IGF1dG9wbGF5aW5nXHJcbiAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5FbmFibGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGlzYWJsZUF1dG9wbGF5KCkge1xyXG4gICAgLy8gU3RvcCBhdXRvcGxheWluZ1xyXG4gICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmb3IgYXV0b3BsYXlcclxuICAgIHRoaXMuYXV0b3BsYXlCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBdXRvcGxheSk7XHJcbiAgICB0aGlzLmF1dG9wbGF5QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5faGFuZGxlQXV0b3BsYXkpO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBdXRvcGxheUV2ZW50KTtcclxuICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9oYW5kbGVBdXRvcGxheUV2ZW50KTtcclxuICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9oYW5kbGVBdXRvcGxheUhvdmVyKTtcclxuICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9oYW5kbGVBdXRvcGxheUhvdmVyKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgdG9nZ2xlIGJ1dHRvbiBmcm9tIERPTVxyXG4gICAgdGhpcy5hdXRvcGxheUJ0bi5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZCh0aGlzLmF1dG9wbGF5QnRuKTtcclxuICB9XHJcblxyXG4gIC8vIFJlZmVyZW5jZWQgaHR0cHM6Ly9jb2RlcGVuLmlvL2ZyZWRlcmljcm91cy9wZW4veHhWWEpZWFxyXG4gIHByaXZhdGUgX2VuYWJsZVN3aXBlKCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zd2lwZSkge1xyXG4gICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9zd2lwZU1vdXNlRG93bik7XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9zd2lwZU1vdXNlVXApO1xyXG4gICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fc3dpcGVNb3VzZVVwKTtcclxuICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fc3dpcGVNb3VzZU1vdmUpO1xyXG4gICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fc3dpcGVUb3VjaFN0YXJ0KTtcclxuICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9zd2lwZVRvdWNoRW5kKTtcclxuICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fc3dpcGVUb3VjaE1vdmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc3dpcGVNb3VzZURvd24oZTogTW91c2VFdmVudCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xyXG4gICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnYTExeS1zbGlkZXItc2Nyb2xsaW5nJyk7XHJcbiAgICB0aGlzLnN3aXBlU3RhcnRYID0gZS5wYWdlWCAtIHRoaXMuc2xpZGVyLm9mZnNldExlZnQ7XHJcbiAgICB0aGlzLnN3aXBlWCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgICB0aGlzLnN3aXBlWENhY2hlZCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zd2lwZU1vdXNlVXAoKSB7XHJcbiAgICBpZiAoIXRoaXMubW91c2VEb3duKSByZXR1cm47XHJcblxyXG4gICAgLy8gSWYgdGhlIG1vdmVkIHNsaWRlciBvZmZzZXQgaXMgd2l0aGluIDEgcGl4ZWwgaXQgd2lsbCBub3QgdHJpZ2dlciBhIG1vdmVcclxuICAgIGNvbnN0IGluUmFuZ2UgPVxyXG4gICAgICAodGhpcy5zd2lwZVhDYWNoZWQgLSAodGhpcy5zd2lwZVggLSAxKSkgKlxyXG4gICAgICAgICh0aGlzLnN3aXBlWENhY2hlZCAtICh0aGlzLnN3aXBlWCArIDEpKSA8PVxyXG4gICAgICAwO1xyXG5cclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhMTF5LXNsaWRlci1zY3JvbGxpbmcnKTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2Rlcm5Ccm93c2VyKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLnNjcm9sbCh7XHJcbiAgICAgICAgbGVmdDogaW5SYW5nZSA/IHRoaXMuc3dpcGVYQ2FjaGVkIDogdGhpcy5zd2lwZVhDYWNoZWQgLSAxLFxyXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N3aXBlTW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5tb3VzZURvd24pIHJldHVybjtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCBzY3JvbGxTcGVlZCA9IDI7XHJcbiAgICBjb25zdCB4ID0gZS5wYWdlWCAtIHRoaXMuc2xpZGVyLm9mZnNldExlZnQ7XHJcbiAgICBjb25zdCB3YWxrID0gKHggLSB0aGlzLnN3aXBlU3RhcnRYKSAqIHNjcm9sbFNwZWVkO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgPSB0aGlzLnN3aXBlWCAtIHdhbGs7XHJcbiAgICAvLyBTYWZhcmkgaGFzIGEgYnVnIHdoZXJlIGl0IGRvZXNuJ3Qgc2F2ZSB2YWx1ZXMgcHJvcGVybHkgc28gY2FjaGluZyBpdCBmb3IgdXNlIGxhdGVyXHJcbiAgICB0aGlzLnN3aXBlWENhY2hlZCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zd2lwZVRvdWNoU3RhcnQoZTogVG91Y2hFdmVudCkge1xyXG4gICAgdGhpcy50b3VjaFN0YXJ0ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ2ExMXktc2xpZGVyLXNjcm9sbGluZycpO1xyXG4gICAgdGhpcy5zd2lwZVN0YXJ0WCA9IGUudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuc2xpZGVyLm9mZnNldExlZnQ7XHJcbiAgICB0aGlzLnN3aXBlWCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgICB0aGlzLnN3aXBlWENhY2hlZCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zd2lwZVRvdWNoRW5kKCkge1xyXG4gICAgaWYgKCF0aGlzLnRvdWNoU3RhcnQpIHJldHVybjtcclxuXHJcbiAgICAvLyBJZiB0aGUgbW92ZWQgc2xpZGVyIG9mZnNldCBpcyB3aXRoaW4gMSBwaXhlbCBpdCB3aWxsIG5vdCB0cmlnZ2VyIGEgbW92ZVxyXG4gICAgY29uc3QgaW5SYW5nZSA9XHJcbiAgICAgICh0aGlzLnN3aXBlWENhY2hlZCAtICh0aGlzLnN3aXBlWCAtIDEpKSAqXHJcbiAgICAgICAgKHRoaXMuc3dpcGVYQ2FjaGVkIC0gKHRoaXMuc3dpcGVYICsgMSkpIDw9XHJcbiAgICAgIDA7XHJcblxyXG4gICAgdGhpcy50b3VjaFN0YXJ0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhMTF5LXNsaWRlci1zY3JvbGxpbmcnKTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2Rlcm5Ccm93c2VyKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLnNjcm9sbCh7XHJcbiAgICAgICAgbGVmdDogaW5SYW5nZSA/IHRoaXMuc3dpcGVYQ2FjaGVkIDogdGhpcy5zd2lwZVhDYWNoZWQgLSAxLFxyXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N3aXBlVG91Y2hNb3ZlKGU6IFRvdWNoRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy50b3VjaFN0YXJ0KSByZXR1cm47XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsU3BlZWQgPSAyO1xyXG4gICAgY29uc3QgeCA9IGUudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuc2xpZGVyLm9mZnNldExlZnQ7XHJcbiAgICBjb25zdCB3YWxrID0gKHggLSB0aGlzLnN3aXBlU3RhcnRYKSAqIHNjcm9sbFNwZWVkO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgPSB0aGlzLnN3aXBlWCAtIHdhbGs7XHJcbiAgICAvLyBTYWZhcmkgaGFzIGEgYnVnIHdoZXJlIGl0IGRvZXNuJ3Qgc2F2ZSB2YWx1ZXMgcHJvcGVybHkgc28gY2FjaGluZyBpdCBmb3IgdXNlIGxhdGVyXHJcbiAgICB0aGlzLnN3aXBlWENhY2hlZCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kaXNhYmxlU3dpcGUoKSB7XHJcbiAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9zd2lwZU1vdXNlRG93bik7XHJcbiAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fc3dpcGVNb3VzZVVwKTtcclxuICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9zd2lwZU1vdXNlVXApO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fc3dpcGVNb3VzZU1vdmUpO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX3N3aXBlVG91Y2hTdGFydCk7XHJcbiAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX3N3aXBlVG91Y2hFbmQpO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fc3dpcGVUb3VjaE1vdmUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdG9nZ2xlQXV0b3BsYXkoc2V0U3RhdGU6IEF1dG9wbGF5U3dpdGNoKSB7XHJcbiAgICBjb25zdCBzdGFydEF1dG9wbGF5aW5nID0gKCkgPT4ge1xyXG4gICAgICAvLyBTdGFydCBhdXRvcGxheWluZ1xyXG4gICAgICB0aGlzLl9hdXRvcGxheVRpbWVyID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9nb1ByZXZPck5leHQoU2xpZGVEaXJlY3Rpb24uTmV4dCk7XHJcbiAgICAgIH0sIHRoaXMub3B0aW9ucy5hdXRvcGxheVNwZWVkKTtcclxuXHJcbiAgICAgIC8vIFNldCBhdXRvcGxheSBidXR0b24gc3RhdGVcclxuICAgICAgdGhpcy5hdXRvcGxheUJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYXV0b3BsYXlpbmcnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50XHJcbiAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2F1dG9wbGF5U3RhcnQnLCB7XHJcbiAgICAgICAgY3VycmVudFNsaWRlOiB0aGlzLmFjdGl2ZVNsaWRlLFxyXG4gICAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHN0b3BBdXRvcGxheWluZyA9ICgpID0+IHtcclxuICAgICAgLy8gU3RvcCBhdXRvcGxheWluZ1xyXG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLl9hdXRvcGxheVRpbWVyKTtcclxuXHJcbiAgICAgIC8vIFJlc2V0IGF1dG9wbGF5IHRpbWVyXHJcbiAgICAgIHRoaXMuX2F1dG9wbGF5VGltZXIgPSBJc0F1dG9wbGF5aW5nLk5vO1xyXG5cclxuICAgICAgLy8gU2V0IGF1dG9wbGF5IGJ1dHRvbiBzdGF0ZVxyXG4gICAgICB0aGlzLmF1dG9wbGF5QnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1hdXRvcGxheWluZycsICdmYWxzZScpO1xyXG5cclxuICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50XHJcbiAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2F1dG9wbGF5U3RvcCcsIHtcclxuICAgICAgICBjdXJyZW50U2xpZGU6IHRoaXMuYWN0aXZlU2xpZGUsXHJcbiAgICAgICAgYTExeVNsaWRlcjogdGhpc1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHNldFN0YXRlID09PSBBdXRvcGxheVN3aXRjaC5FbmFibGUpIHtcclxuICAgICAgc3RhcnRBdXRvcGxheWluZygpO1xyXG4gICAgfSBlbHNlIGlmIChzZXRTdGF0ZSA9PT0gQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSkge1xyXG4gICAgICBzdG9wQXV0b3BsYXlpbmcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dvUHJldk9yTmV4dChkaXJlY3Rpb246IFNsaWRlRGlyZWN0aW9uKSB7XHJcbiAgICB0aGlzLl9nZXRBY3RpdmVBbmRWaXNpYmxlKFxyXG4gICAgICBudWxsLFxyXG4gICAgICAodmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSwgYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlyc3RTbGlkZSA9IHRoaXMuc2xpZGVyLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGxhc3RTbGlkZSA9IHRoaXMuc2xpZGVyLmxhc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgZmlyc3RWaXNpYmxlU2xpZGUgPSB2aXNpYmxlU2xpZGVzWzBdO1xyXG4gICAgICAgIGNvbnN0IGxhc3RWaXNpYmxlU2xpZGUgPSB2aXNpYmxlU2xpZGVzW3Zpc2libGVTbGlkZXMubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFNsaWRlRGlyZWN0aW9uLk5leHQpIHtcclxuICAgICAgICAgIC8vIFdyYXAgdG8gdGhlIGZpcnN0IHNsaWRlIGlmIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgbGFzdFxyXG4gICAgICAgICAgaWYgKGxhc3RWaXNpYmxlU2xpZGUgPT09IGxhc3RTbGlkZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUgJiYgdGhpcy5zY3JvbGxUb1NsaWRlKGZpcnN0U2xpZGUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NsaWRlKFxyXG4gICAgICAgICAgICAgIGFjdGl2ZVNsaWRlICYmIChhY3RpdmVTbGlkZS5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFNsaWRlRGlyZWN0aW9uLlByZXYpIHtcclxuICAgICAgICAgIC8vIFdyYXAgdG8gdGhlIGxhc3Qgc2xpZGUgaWYgd2UncmUgY3VycmVudGx5IG9uIHRoZSBmaXJzdFxyXG4gICAgICAgICAgaWYgKGZpcnN0VmlzaWJsZVNsaWRlID09PSBmaXJzdFNsaWRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSAmJiB0aGlzLnNjcm9sbFRvU2xpZGUobGFzdFNsaWRlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9TbGlkZShcclxuICAgICAgICAgICAgICBhY3RpdmVTbGlkZSAmJiAoYWN0aXZlU2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyBzbGlkZXIgdG8gdGFyZ2V0IGVsZW1lbnRcclxuICAgKi9cclxuICBwdWJsaWMgc2Nyb2xsVG9TbGlkZSh0YXJnZXQ6IEhUTUxFbGVtZW50IHwgbnVtYmVyKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbFBvc2l0aW9uID0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdDtcclxuICAgIGxldCB0YXJnZXRTbGlkZTogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKGlzSW50ZWdlcih0YXJnZXQpKSB7XHJcbiAgICAgIHRhcmdldFNsaWRlID0gdGhpcy5zbGlkZXNbdGFyZ2V0IGFzIG51bWJlcl07XHJcbiAgICB9IGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgIHRhcmdldFNsaWRlID0gdGFyZ2V0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzY3JvbGxUb1NsaWRlIG9ubHkgYWNjZXB0cyBhbiBIVE1MRWxlbWVudCBvciBudW1iZXInKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnRcclxuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2JlZm9yZUNoYW5nZScsIHtcclxuICAgICAgY3VycmVudFNsaWRlOiB0aGlzLmFjdGl2ZVNsaWRlLFxyXG4gICAgICBuZXh0U2xpZGU6IHRhcmdldFNsaWRlLFxyXG4gICAgICBhMTF5U2xpZGVyOiB0aGlzXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBVcGRhdGUgc2xpZGVyJ3MgaGVpZ2h0IGJhc2VkIG9uIGNvbnRlbnQgb2Ygc2xpZGVcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUpIHRoaXMuX3VwZGF0ZUhlaWdodCh0YXJnZXRTbGlkZSk7XHJcblxyXG4gICAgLy8gTW92ZSBzbGlkZXIgdG8gc3BlY2lmaWMgaXRlbVxyXG4gICAgaWYgKHRoaXMubW9kZXJuQnJvd3Nlcikge1xyXG4gICAgICB0aGlzLnNsaWRlci5zY3JvbGwoe1xyXG4gICAgICAgIGxlZnQ6IHRhcmdldFNsaWRlLm9mZnNldExlZnQsXHJcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCA9IHRhcmdldFNsaWRlLm9mZnNldExlZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgdGhlIHNsaWRlciBkaWRuJ3QgbW92ZSBtYWtlIHN1cmUgdG8gdXBkYXRlIHRoZSBzbGlkZXIgc3RpbGxcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCA9PT0gb3JpZ2luYWxQb3NpdGlvbiAmJlxyXG4gICAgICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9PT0gU2xpZGVyU3RhdGUuRW5hYmxlZFxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLl9zZXRDU1ModGFyZ2V0U2xpZGUpO1xyXG4gICAgICB9XHJcbiAgICB9LCA1MCk7XHJcblxyXG4gICAgLy8gVHJpZ2dlciBkb3QgdXBkYXRlXHJcbiAgICB0aGlzLl91cGRhdGVEb3RzKHRhcmdldFNsaWRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgb3B0aW9ucyBvbiB0aGUgc2xpZGVyIGluc3RhbmNlXHJcbiAgICovXHJcbiAgcHVibGljIHVwZGF0ZU9wdGlvbnMob3B0aW9uczogT3B0aW9ucykge1xyXG4gICAgLy8gQXNzaWduIG5ldyBvcHRpb25zXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gUmUtcnVuIHRoZSBpbml0aWFsIGVuYWJsZSBzbGlkZXIgb3B0aW9uXHJcbiAgICB0aGlzLl9kaXNhYmxlU2xpZGVyKCk7XHJcbiAgICB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSWYgZWxlbWVudCBpcyBwYXNzZWQgc2xpZGVyJ3MgaGVpZ2h0IHdpbGwgbWF0Y2hcclxuICAgKiAgaXQgb3RoZXJ3aXNlIHRoZSBoZWlnaHQgb2YgdGhlIHNsaWRlciBpcyByZW1vdmVkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZUhlaWdodCh0YXJnZXQ6IEhUTUxFbGVtZW50IHwgZmFsc2UpIHtcclxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICBjb25zdCB0YXJnZXRIZWlnaHQgPSBnZXRTdWJwaXhlbFN0eWxlKHRhcmdldCwgJ2hlaWdodCcpO1xyXG4gICAgICB0aGlzLnNsaWRlci5zdHlsZS5oZWlnaHQgPSBgJHt0YXJnZXRIZWlnaHR9cHhgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogTWFudWxseSB1cGRhdGUgaGVpZ2h0IG9mIHNsaWRlciAoYmFzZWQgb2ZmIGFkYXB0aXZlSGVpZ2h0IG9wdGlvbikgKi9cclxuICBwdWJsaWMgcmVmcmVzaEhlaWdodCgpIHtcclxuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCh0aGlzLmFjdGl2ZVNsaWRlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldEFjdGl2ZUFuZFZpc2libGUoXHJcbiAgICBleHBsaWNpdEFjdGl2ZTogSFRNTEVsZW1lbnQgfCBudWxsLFxyXG4gICAgY2FsbGJhY2s/OiBBY3RpdmVWaXNpYmxlU2xpZGVzXHJcbiAgKSB7XHJcbiAgICAvKipcclxuICAgICAqIFBhcmVudCBlbGVtZW50IG5lZWRzIHRoZSBjb3JyZWN0IHN0eWxpbmcgZm9yXHJcbiAgICAgKiBjYWxjdWxhdGlvbnMgc28gYmFja2luZyB1cCB0aGUgaW5pdGlhbCBzdHlsZXNcclxuICAgICAqL1xyXG4gICAgY29uc3Qgbm9TbGlkZXJDbGFzcyA9ICF0aGlzLnNsaWRlci5jbGFzc0xpc3QuY29udGFpbnModGhpcy5fc2xpZGVyQ2xhc3MpO1xyXG4gICAgY29uc3QgYm9yZGVyU3R5bGUgPSB0aGlzLnNsaWRlci5zdHlsZS5ib3JkZXJXaWR0aDtcclxuXHJcbiAgICAvLyBBcHBseWluZyBjb3JyZWN0IHN0eWxlcyBmb3IgY2FsY3VsYXRpb25zXHJcbiAgICB0aGlzLnNsaWRlci5zdHlsZS5ib3JkZXJXaWR0aCA9ICcwcHgnO1xyXG4gICAgaWYgKG5vU2xpZGVyQ2xhc3MpIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5hZGQodGhpcy5fc2xpZGVyQ2xhc3MpO1xyXG5cclxuICAgIC8vIENhbiBzdGFydCBzdG9yaW5nIHZhcmlhYmxlcyBub3cgZm9yIGNhbGN1bGF0aW9uc1xyXG4gICAgY29uc3QgdmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG4gICAgLy8gYmV0dGVyIGNyb3NzIGJyb3dzZXIgc3VwcG9ydCBieSBnZXR0aW5nIHN1YnBpeGVscyB0aGVuIHJvdW5kaW5nXHJcbiAgICBjb25zdCBzbGlkZXJXaWR0aCA9IE1hdGgucm91bmQodGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpO1xyXG4gICAgLy8gQWRkIGEgMSBwaXhlbCBidWZmZXIgc28gdGhhdCBzdWJwaXhlbHMgYXJlIG1vcmUgY29uc2lzdGVudCBjcm9zcy1icm93c2VyXHJcbiAgICBjb25zdCBzbGlkZXJQb3NpdGlvbiA9XHJcbiAgICAgIHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgLSAxIDwgMCA/IDAgOiB0aGlzLnNsaWRlci5zY3JvbGxMZWZ0IC0gMTtcclxuXHJcbiAgICAvLyBPbmx5IGRldGVjdHMgaXRlbXMgaW4gdGhlIHZpc2libGUgdmlld3BvcnQgb2YgdGhlIHBhcmVudCBlbGVtZW50XHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgY29uc3Qgc2xpZGVPZmZzZXQgPSBzbGlkZS5vZmZzZXRMZWZ0O1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHNsaWRlT2Zmc2V0ID49IHNsaWRlclBvc2l0aW9uICYmXHJcbiAgICAgICAgc2xpZGVPZmZzZXQgPCBzbGlkZXJQb3NpdGlvbiArIHNsaWRlcldpZHRoXHJcbiAgICAgICkge1xyXG4gICAgICAgIHZpc2libGVTbGlkZXMucHVzaChzbGlkZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFkZCBiYWNrIHRoZSBvcmlnaW5hbCBzdHlsZXNcclxuICAgIHRoaXMuc2xpZGVyLnN0eWxlLmJvcmRlcldpZHRoID0gYm9yZGVyU3R5bGU7XHJcbiAgICBpZiAobm9TbGlkZXJDbGFzcykgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zbGlkZXJDbGFzcyk7XHJcblxyXG4gICAgLy8gR2xvYmFsbHkgc2V0IHZpc2libGUgc2xpZGVzXHJcbiAgICB0aGlzLnZpc2libGVTbGlkZXMgPSB2aXNpYmxlU2xpZGVzO1xyXG5cclxuICAgIGlmIChleHBsaWNpdEFjdGl2ZSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gZXhwbGljaXRBY3RpdmU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPVxyXG4gICAgICAgIHRoaXMudmlzaWJsZVNsaWRlc1tNYXRoLmZsb29yKCh0aGlzLnZpc2libGVTbGlkZXMubGVuZ3RoIC0gMSkgLyAyKV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdmlzaWJsZVNsaWRlc1swXSA/PyB0aGlzLnNsaWRlc1swXTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh0aGlzLnZpc2libGVTbGlkZXMsIHRoaXMuYWN0aXZlU2xpZGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlUHJldihldmVudDogRXZlbnQpIHtcclxuICAgIGlmIChhMTF5Q2xpY2soZXZlbnQpID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIEdvIHRvIHByZXZpb3VzIHNsaWRlXHJcbiAgICAgIHRoaXMuX2dvUHJldk9yTmV4dChTbGlkZURpcmVjdGlvbi5QcmV2KTtcclxuXHJcbiAgICAgIC8vIERpc2FibGUgYXV0b3BsYXkgaWYgb25nb2luZ1xyXG4gICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5EaXNhYmxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZU5leHQoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICBpZiAoYTExeUNsaWNrKGV2ZW50KSA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBHbyB0byBuZXh0IHNsaWRlXHJcbiAgICAgIHRoaXMuX2dvUHJldk9yTmV4dChTbGlkZURpcmVjdGlvbi5OZXh0KTtcclxuXHJcbiAgICAgIC8vIERpc2FibGUgYXV0b3BsYXkgaWYgb25nb2luZ1xyXG4gICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5EaXNhYmxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZUF1dG9wbGF5KGV2ZW50OiBFdmVudCkge1xyXG4gICAgaWYgKGExMXlDbGljayhldmVudCkgPT09IHRydWUpIHtcclxuICAgICAgaWYgKHRoaXMuX2F1dG9wbGF5VGltZXIgPT09IElzQXV0b3BsYXlpbmcuTm8pIHtcclxuICAgICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5FbmFibGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUF1dG9wbGF5KEF1dG9wbGF5U3dpdGNoLkRpc2FibGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVBdXRvcGxheUhvdmVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZW50ZXInKSB7XHJcbiAgICAgIGlmICh0aGlzLl9hdXRvcGxheVRpbWVyICE9PSBJc0F1dG9wbGF5aW5nLk5vKSB7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSk7XHJcbiAgICAgICAgdGhpcy5fcGF1c2VPbk1vdXNlTGVhdmUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWxlYXZlJyAmJiB0aGlzLl9wYXVzZU9uTW91c2VMZWF2ZSkge1xyXG4gICAgICBpZiAodGhpcy5fYXV0b3BsYXlUaW1lciA9PT0gSXNBdXRvcGxheWluZy5Obykge1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUF1dG9wbGF5KEF1dG9wbGF5U3dpdGNoLkVuYWJsZSk7XHJcbiAgICAgICAgdGhpcy5fcGF1c2VPbk1vdXNlTGVhdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlQXV0b3BsYXlFdmVudChfZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICB0aGlzLl9wYXVzZU9uTW91c2VMZWF2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVTY3JvbGwoKSB7XHJcbiAgICAvLyBUaGlzIGlzIGEgZGVib3VuY2VkIGZ1bmN0aW9uLiBXaWxsIGZpcmUgb25jZSBkb25lIHNjcm9sbGluZ1xyXG4gICAgdGhpcy5fc2Nyb2xsRmluaXNoKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zY3JvbGxGaW5pc2goKSB7XHJcbiAgICAvLyBVcGRhdGUgQ1NTXHJcbiAgICB0aGlzLl9zZXRDU1MoKTtcclxuXHJcbiAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnRcclxuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2FmdGVyQ2hhbmdlJywge1xyXG4gICAgICBjdXJyZW50U2xpZGU6IHRoaXMuYWN0aXZlU2xpZGUsXHJcbiAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGlzcGF0Y2hFdmVudChldmVudE5hbWU6IHN0cmluZywgZGV0YWlsOiBvYmplY3QpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gY3Jvc3NDdXN0b21FdmVudChldmVudE5hbWUsIHsgZGV0YWlsIH0pO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTnVrZSB0aGUgc2xpZGVyXHJcbiAgICovXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICAvLyBUT0RPOiBSZW1vdmFsIG9mIHJlc3BvbnNpdmUgZXZlbnQgbGlzdGVuZXJzIHNob3VsZCBnbyBoZXJlXHJcblxyXG4gICAgLy8gVW5kb3MgZXZlcnl0aGluZyBmcm9tIF9lbmFibGVTbGlkZXIoKVxyXG4gICAgdGhpcy5fZGlzYWJsZVNsaWRlcigpO1xyXG5cclxuICAgIC8vIFVuZG9zIGV2ZXJ5dGhpbmcgZnJvbSBpbml0KClcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZURlYm91bmNlZCk7XHJcblxyXG4gICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50XHJcbiAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdkZXN0cm95Jywge1xyXG4gICAgICBhMTF5U2xpZGVyOiB0aGlzXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImdsb2JhbCIsImNsYXNzb2YiLCJJbmRleGVkT2JqZWN0IiwiZG9jdW1lbnQiLCJERVNDUklQVE9SUyIsImNyZWF0ZUVsZW1lbnQiLCJJRThfRE9NX0RFRklORSIsInByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlIiwiZGVmaW5lUHJvcGVydHlNb2R1bGUiLCJzdG9yZSIsIldlYWtNYXAiLCJoYXMiLCJOQVRJVkVfV0VBS19NQVAiLCJvYmplY3RIYXMiLCJJbnRlcm5hbFN0YXRlTW9kdWxlIiwibWluIiwicmVxdWlyZSQkMCIsImhpZGRlbktleXMiLCJpbnRlcm5hbE9iamVjdEtleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiaXNGb3JjZWQiLCJOQVRJVkVfU1lNQk9MIiwiU3ltYm9sIiwiVVNFX1NZTUJPTF9BU19VSUQiLCJ1c2VyQWdlbnQiLCJTUEVDSUVTIiwiVjhfVkVSU0lPTiIsIiQiLCJhRnVuY3Rpb24iLCJjcmVhdGVNZXRob2QiLCJiaW5kIiwiZm9yRWFjaCIsIlNUUklDVF9NRVRIT0QiLCJVU0VTX1RPX0xFTkdUSCIsInNldFByb3RvdHlwZU9mIiwiZGVmaW5lUHJvcGVydGllcyIsInJlcXVpcmUkJDEiLCJkZWZpbmVQcm9wZXJ0eSIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwiY3JlYXRlIiwia2V5cyIsInRyaW0iLCJGT1JDRUQiLCJwYXJzZUludCIsImFzc2lnbiIsIkRPTUl0ZXJhYmxlcyIsIkhBU19TUEVDSUVTX1NVUFBPUlQiLCJtYXgiLCJUT19TVFJJTkdfVEFHIiwiVE9fU1RSSU5HX1RBR19TVVBQT1JUIiwidG9TdHJpbmciLCJmbGFncyIsImh0bWwiLCJlbCIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImJvZHkiLCJmaXJzdENoaWxkIiwiSFRNTEVsZW1lbnQiLCJFcnJvciIsImExMXlDbGljayIsImV2ZW50IiwiY29kZSIsImNoYXJDb2RlIiwia2V5Q29kZSIsInR5cGUiLCJwcmV2ZW50RGVmYXVsdCIsImNyb3NzQ3VzdG9tRXZlbnQiLCJwYXJhbXMiLCJldnQiLCJjcmVhdGVFdmVudCIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiZGV0YWlsIiwidW5kZWZpbmVkIiwiaW5pdEN1c3RvbUV2ZW50IiwiaXNJbnRlZ2VyIiwidmFsdWUiLCJpc0Zpbml0ZSIsIk1hdGgiLCJmbG9vciIsImlzTmFOIiwiTnVtYmVyIiwiaXNPYmplY3QiLCJjYW5BY2Nlc3NBc0FycmF5IiwiaXRlbSIsIkFycmF5IiwiaXNBcnJheSIsInJlc3VsdCIsIk9iamVjdCIsInByb3RvdHlwZSIsImNhbGwiLCJoYXNPd25Qcm9wZXJ0eSIsImxlbmd0aCIsIm5vZGVUeXBlIiwiZXZlcnlFbGVtZW50IiwiZWxlbWVudHMiLCJjYWxsYmFjayIsImVscyIsInNsaWNlIiwiZ2V0U3VicGl4ZWxTdHlsZSIsImVsZW1lbnQiLCJzdHlsZSIsInN0eWxlcyIsIkhBU19DT01QVVRFRF9TVFlMRSIsIndpbmRvdyIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRTdHlsZXMiLCJDT01QVVRFRF9TSVpFX0lOQ0xVREVTX1BBRERJTkciLCJwYXJlbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJlIiwiY3NzVGV4dCIsImFwcGVuZENoaWxkIiwid2lkdGgiLCJyZXQiLCJyZW1vdmVDaGlsZCIsImdldE51bWJlclN0eWxlIiwiZWxTdHlsZSIsImVsU3R5bGVzIiwiZ2V0RmxvYXQiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImJvcmRlckxlZnRXaWR0aCIsImJvcmRlclJpZ2h0V2lkdGgiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsImJvcmRlclRvcFdpZHRoIiwiYm9yZGVyQm90dG9tV2lkdGgiLCJpc051bWJlciIsIm4iLCJwYXJzZUZsb2F0IiwiZ2V0UHJldmlvdXNTaWJsaW5ncyIsImFtb3VudCIsInNpYmxpbmciLCJwcmV2aW91c1NpYmxpbmciLCJwdXNoIiwiZ2V0TmV4dFNpYmxpbmdzIiwibmV4dFNpYmxpbmciLCJTbGlkZURpcmVjdGlvbiIsIlNsaWRlclN0YXRlIiwiQXV0b3BsYXlTd2l0Y2giLCJJc0F1dG9wbGF5aW5nIiwiQTExWVNsaWRlciIsIm9wdGlvbnMiLCJzbGlkZXIiLCJzbGlkZXMiLCJjaGlsZHJlbiIsInNsaWRlckNvbnRhaW5lciIsIl9hY3RpdmVDbGFzcyIsIl92aXNpYmxlQ2xhc3MiLCJfZG90c0NsYXNzIiwiX3NsaWRlckNsYXNzIiwiX2ZvY3VzYWJsZSIsIl9hdXRvcGxheVRpbWVyIiwiTm8iLCJhdXRvcGxheUJ0biIsIl9wYXVzZU9uTW91c2VMZWF2ZSIsIl9za2lwQnRucyIsImRvdHMiLCJzd2lwZSIsImFjdGl2ZVNsaWRlIiwidmlzaWJsZVNsaWRlcyIsInNsaWRlckVuYWJsZWQiLCJEaXNhYmxlZCIsIm1vZGVybkJyb3dzZXIiLCJzY3JvbGxUbyIsIm1vdXNlRG93biIsInRvdWNoU3RhcnQiLCJzd2lwZVN0YXJ0WCIsInN3aXBlWCIsInN3aXBlWENhY2hlZCIsIl9oYXNDdXN0b21BcnJvd3MiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJjb250YWluZXIiLCJhcnJvd3MiLCJhZGFwdGl2ZUhlaWdodCIsInNraXBCdG4iLCJzbGlkZXNUb1Nob3ciLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJhdXRvcGxheUhvdmVyUGF1c2UiLCJjZW50ZXJNb2RlIiwiaW5maW5pdGUiLCJkaXNhYmxlIiwicmVzcG9uc2l2ZSIsImN1c3RvbVBhZ2luZyIsIl9oYW5kbGVQcmV2IiwiX2hhbmRsZU5leHQiLCJfaGFuZGxlQXV0b3BsYXkiLCJfaGFuZGxlQXV0b3BsYXlIb3ZlciIsIl9oYW5kbGVBdXRvcGxheUV2ZW50IiwiX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkIiwiZGVib3VuY2UiLCJfY2hlY2tTaG91bGRFbmFibGUiLCJfdXBkYXRlSGVpZ2h0RGVib3VuY2VkIiwiX3VwZGF0ZUhlaWdodCIsIl9nZW5lcmF0ZURvdHNEZWJvdW5jZWQiLCJfZ2VuZXJhdGVEb3RzIiwiX3VwZGF0ZVNjcm9sbFBvc2l0aW9uIiwic2Nyb2xsVG9TbGlkZSIsIl9oYW5kbGVTY3JvbGwiLCJfc2Nyb2xsRmluaXNoIiwiX3N3aXBlTW91c2VEb3duIiwiX3N3aXBlTW91c2VVcCIsIl9zd2lwZU1vdXNlTW92ZSIsIl9zd2lwZVRvdWNoU3RhcnQiLCJfc3dpcGVUb3VjaEVuZCIsIl9zd2lwZVRvdWNoTW92ZSIsIl9pbml0Iiwic2V0VGltZW91dCIsInNjcm9sbExlZnQiLCJfY2hlY2tSZXNwb25zaXZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9kaXNwYXRjaEV2ZW50IiwiYTExeVNsaWRlciIsInNob3VsZEVuYWJsZSIsIl9nZXRBY3RpdmVBbmRWaXNpYmxlIiwiX2VuYWJsZVNsaWRlciIsIkVuYWJsZWQiLCJfZGlzYWJsZVNsaWRlciIsImNsYXNzTGlzdCIsImFkZCIsImluc2VydEFkamFjZW50RWxlbWVudCIsIl9hZGRTa2lwQnRuIiwicGFzc2l2ZSIsInJlbW92ZSIsIl9zZXRDU1MiLCJfZW5hYmxlQXV0b3BsYXkiLCJfZW5hYmxlU3dpcGUiLCJjb250YWlucyIsInBhcmVudE5vZGUiLCJfcmVtb3ZlU2tpcEJ0biIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfcmVtb3ZlRG90cyIsIl9yZW1vdmVDU1MiLCJfZGlzYWJsZUF1dG9wbGF5IiwiX2Rpc2FibGVTd2lwZSIsIl9hZGRTbGlkZXNXaWR0aCIsInNsaWRlIiwiX3VwZGF0ZURvdHMiLCJfdXBkYXRlQTExWSIsIl9yZW1vdmVTbGlkZXNXaWR0aCIsIl9yZW1vdmVBMTFZIiwiaW5pdGlhbE9wdGlvbnMiLCJicmVha3BvaW50cyIsInJlc3BvbnNpdmVPcHRpb25zIiwiZW50cmllcyIsInNvcnQiLCJhIiwiYiIsIm1xbCIsIm1hdGNoTWVkaWEiLCJpIiwiYnJlYWtwb2ludCIsImJyZWFrcG9pbnRPcHRpb25zIiwibXFsU3RyaW5nIiwiY29uY2F0IiwibWFwIiwibWF0Y2hlcyIsImFkZExpc3RlbmVyIiwidXBkYXRlT3B0aW9ucyIsInNsaWRlV2lkdGgiLCJkaXNwbGF5IiwiZmxleCIsInJlbW92ZVByb3BlcnR5IiwiZm9jdXNhYmxlSXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2V0QXR0cmlidXRlIiwiZm9jdXNhYmxlSXRlbSIsImZpcnN0U2xpZGUiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImxhc3RTbGlkZSIsImxhc3RFbGVtZW50Q2hpbGQiLCJmaXJzdFZpc2libGVTbGlkZSIsImxhc3RWaXNpYmxlU2xpZGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJiZWZvcmVFbCIsImFmdGVyRWwiLCJmb2N1c0VuZCIsImZvY3VzIiwiZG90TGkiLCJkb3RCdG4iLCJ0ZXh0Q29udGVudCIsInN3aXRjaFRvU2xpZGUiLCJfdG9nZ2xlQXV0b3BsYXkiLCJEaXNhYmxlIiwiX2dldERvdENvdW50IiwidG90YWxTbGlkZXMiLCJhY3RpdmVJbmRleCIsImluZGV4T2YiLCJkb3QiLCJxdWVyeVNlbGVjdG9yIiwiRW5hYmxlIiwicGFnZVgiLCJvZmZzZXRMZWZ0IiwiaW5SYW5nZSIsInNjcm9sbCIsImxlZnQiLCJiZWhhdmlvciIsInNjcm9sbFNwZWVkIiwieCIsIndhbGsiLCJ0b3VjaGVzIiwic2V0U3RhdGUiLCJzdGFydEF1dG9wbGF5aW5nIiwic2V0SW50ZXJ2YWwiLCJfZ29QcmV2T3JOZXh0IiwiTmV4dCIsImN1cnJlbnRTbGlkZSIsInN0b3BBdXRvcGxheWluZyIsImNsZWFySW50ZXJ2YWwiLCJkaXJlY3Rpb24iLCJuZXh0RWxlbWVudFNpYmxpbmciLCJQcmV2IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInRhcmdldCIsIm9yaWdpbmFsUG9zaXRpb24iLCJ0YXJnZXRTbGlkZSIsIm5leHRTbGlkZSIsInRhcmdldEhlaWdodCIsImhlaWdodCIsImV4cGxpY2l0QWN0aXZlIiwibm9TbGlkZXJDbGFzcyIsImJvcmRlclN0eWxlIiwiYm9yZGVyV2lkdGgiLCJzbGlkZXJXaWR0aCIsInJvdW5kIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2xpZGVyUG9zaXRpb24iLCJzbGlkZU9mZnNldCIsIl9ldmVudCIsImV2ZW50TmFtZSIsImRpc3BhdGNoRXZlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFJLEtBQUssR0FBRyxVQUFVLEVBQUUsRUFBRTtFQUN4QixPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7Q0FDcEMsQ0FBQzs7O0FBR0YsWUFBYzs7RUFFWixLQUFLLENBQUMsT0FBTyxVQUFVLElBQUksUUFBUSxJQUFJLFVBQVUsQ0FBQztFQUNsRCxLQUFLLENBQUMsT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQztFQUMxQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQztFQUN0QyxLQUFLLENBQUMsT0FBT0EsY0FBTSxJQUFJLFFBQVEsSUFBSUEsY0FBTSxDQUFDOztFQUUxQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQzs7QUNaNUIsU0FBYyxHQUFHLFVBQVUsSUFBSSxFQUFFO0VBQy9CLElBQUk7SUFDRixPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNqQixDQUFDLE9BQU8sS0FBSyxFQUFFO0lBQ2QsT0FBTyxJQUFJLENBQUM7R0FDYjtDQUNGLENBQUM7O0FDSkY7QUFDQSxlQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWTtFQUNsQyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDakYsQ0FBQyxDQUFDOztBQ0pILElBQUksMEJBQTBCLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO0FBQ3pELElBQUksd0JBQXdCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDOzs7QUFHL0QsSUFBSSxXQUFXLEdBQUcsd0JB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
