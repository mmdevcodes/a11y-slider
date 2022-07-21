
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
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

export default A11YSlider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYTExeS1zbGlkZXIuZXNtLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1zdG9yZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3BhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWludGVnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pbmRleC1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkubWFwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2h0bWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93aGl0ZXNwYWNlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctdHJpbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMubnVtYmVyLmNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL251bWJlci1wYXJzZS1pbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm51bWJlci5wYXJzZS1pbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtdG8tYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5lbnRyaWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuZm9yLWVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvdHMtZGVib3VuY2UvZGlzdC9zcmMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnNsaWNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC50by1zdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAudG8tc3RyaW5nLmpzIiwiLi4vc3JjL3V0aWxzLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBjaGVjayA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgJiYgaXQuTWF0aCA9PSBNYXRoICYmIGl0O1xufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbm1vZHVsZS5leHBvcnRzID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgMSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSlbMV0gIT0gNztcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgIW5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyIHNwbGl0ID0gJycuc3BsaXQ7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIHJldHVybiAhT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT0gJ1N0cmluZycgPyBzcGxpdC5jYWxsKGl0LCAnJykgOiBPYmplY3QoaXQpO1xufSA6IE9iamVjdDtcbiIsIi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG4vLyBgVG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIFBSRUZFUlJFRF9TVFJJTkcpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGlucHV0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xuXG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZURlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoZ2xvYmFsLCBrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IHNldEdsb2JhbChTSEFSRUQsIHt9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSBGdW5jdGlvbi50b1N0cmluZztcblxuLy8gdGhpcyBoZWxwZXIgYnJva2VuIGluIGAzLjQuMS0zLjQuNGAsIHNvIHdlIGNhbid0IHVzZSBgc2hhcmVkYCBoZWxwZXJcbmlmICh0eXBlb2Ygc3RvcmUuaW5zcGVjdFNvdXJjZSAhPSAnZnVuY3Rpb24nKSB7XG4gIHN0b3JlLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25Ub1N0cmluZy5jYWxsKGl0KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZS5pbnNwZWN0U291cmNlO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KGluc3BlY3RTb3VyY2UoV2Vha01hcCkpO1xuIiwidmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuNi40JyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDIwIERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJyArIFN0cmluZyhrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5KSArICcpXycgKyAoKytpZCArIHBvc3RmaXgpLnRvU3RyaW5nKDM2KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIG9iamVjdEhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVApIHtcbiAgdmFyIHN0b3JlID0gbmV3IFdlYWtNYXAoKTtcbiAgdmFyIHdtZ2V0ID0gc3RvcmUuZ2V0O1xuICB2YXIgd21oYXMgPSBzdG9yZS5oYXM7XG4gIHZhciB3bXNldCA9IHN0b3JlLnNldDtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIHdtc2V0LmNhbGwoc3RvcmUsIGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21nZXQuY2FsbChzdG9yZSwgaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21oYXMuY2FsbChzdG9yZSwgaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xuXG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xudmFyIGVuZm9yY2VJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5lbmZvcmNlO1xudmFyIFRFTVBMQVRFID0gU3RyaW5nKFN0cmluZykuc3BsaXQoJ1N0cmluZycpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdW5zYWZlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy51bnNhZmUgOiBmYWxzZTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMuZW51bWVyYWJsZSA6IGZhbHNlO1xuICB2YXIgbm9UYXJnZXRHZXQgPSBvcHRpb25zID8gISFvcHRpb25zLm5vVGFyZ2V0R2V0IDogZmFsc2U7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmICFoYXModmFsdWUsICduYW1lJykpIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh2YWx1ZSwgJ25hbWUnLCBrZXkpO1xuICAgIGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKS5zb3VyY2UgPSBURU1QTEFURS5qb2luKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBrZXkgOiAnJyk7XG4gIH1cbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2Ugc2V0R2xvYmFsKGtleSwgdmFsdWUpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghdW5zYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgfSBlbHNlIGlmICghbm9UYXJnZXRHZXQgJiYgT1trZXldKSB7XG4gICAgc2ltcGxlID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoTywga2V5LCB2YWx1ZSk7XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xuIiwidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09ICdmdW5jdGlvbicgPyB2YXJpYWJsZSA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihwYXRoW25hbWVzcGFjZV0pIHx8IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSlcbiAgICA6IHBhdGhbbmFtZXNwYWNlXSAmJiBwYXRoW25hbWVzcGFjZV1bbWV0aG9kXSB8fCBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b2ludGVnZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBpc05hTihhcmd1bWVudCA9ICthcmd1bWVudCkgPyAwIDogKGFyZ3VtZW50ID4gMCA/IGZsb29yIDogY2VpbCkoYXJndW1lbnQpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50ID4gMCA/IG1pbih0b0ludGVnZXIoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiAgaW5kZXhPZjogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzKGhpZGRlbktleXMsIGtleSkgJiYgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXModGFyZ2V0LCBrZXkpKSBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiB0eXBlb2YgZGV0ZWN0aW9uID09ICdmdW5jdGlvbicgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxuLy8gYElzQXJyYXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNhcnJheVxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjbGFzc29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIHByb3BlcnR5S2V5ID0gdG9QcmltaXRpdmUoa2V5KTtcbiAgaWYgKHByb3BlcnR5S2V5IGluIG9iamVjdCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIHByb3BlcnR5S2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbcHJvcGVydHlLZXldID0gdmFsdWU7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICByZXR1cm4gIVN0cmluZyhTeW1ib2woKSk7XG59KTtcbiIsInZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAmJiAhU3ltYm9sLnNoYW1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCc7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgY3JlYXRlV2VsbEtub3duU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBTeW1ib2wgOiBTeW1ib2wgJiYgU3ltYm9sLndpdGhvdXRTZXR0ZXIgfHwgdWlkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghaGFzKFdlbGxLbm93blN5bWJvbHNTdG9yZSwgbmFtZSkpIHtcbiAgICBpZiAoTkFUSVZFX1NZTUJPTCAmJiBoYXMoU3ltYm9sLCBuYW1lKSkgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gU3ltYm9sW25hbWVdO1xuICAgIGVsc2UgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gY3JlYXRlV2VsbEtub3duU3ltYm9sKCdTeW1ib2wuJyArIG5hbWUpO1xuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheXNwZWNpZXNjcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsQXJyYXksIGxlbmd0aCkge1xuICB2YXIgQztcbiAgaWYgKGlzQXJyYXkob3JpZ2luYWxBcnJheSkpIHtcbiAgICBDID0gb3JpZ2luYWxBcnJheS5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmICh0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpIEMgPSB1bmRlZmluZWQ7XG4gICAgZWxzZSBpZiAoaXNPYmplY3QoQykpIHtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYgKEMgPT09IG51bGwpIEMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBuZXcgKEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQykobGVuZ3RoID09PSAwID8gMCA6IGxlbmd0aCk7XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignbmF2aWdhdG9yJywgJ3VzZXJBZ2VudCcpIHx8ICcnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4O1xudmFyIG1hdGNoLCB2ZXJzaW9uO1xuXG5pZiAodjgpIHtcbiAgbWF0Y2ggPSB2OC5zcGxpdCgnLicpO1xuICB2ZXJzaW9uID0gbWF0Y2hbMF0gKyBtYXRjaFsxXTtcbn0gZWxzZSBpZiAodXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uICYmICt2ZXJzaW9uO1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEUgPSB3ZWxsS25vd25TeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgaW5kZXggZXhjZWVkZWQnO1xuXG4vLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbi8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCA9IFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGFycmF5W0lTX0NPTkNBVF9TUFJFQURBQkxFXSA9IGZhbHNlO1xuICByZXR1cm4gYXJyYXkuY29uY2F0KClbMF0gIT09IGFycmF5O1xufSk7XG5cbnZhciBTUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdjb25jYXQnKTtcblxudmFyIGlzQ29uY2F0U3ByZWFkYWJsZSA9IGZ1bmN0aW9uIChPKSB7XG4gIGlmICghaXNPYmplY3QoTykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNwcmVhZGFibGUgPSBPW0lTX0NPTkNBVF9TUFJFQURBQkxFXTtcbiAgcmV0dXJuIHNwcmVhZGFibGUgIT09IHVuZGVmaW5lZCA/ICEhc3ByZWFkYWJsZSA6IGlzQXJyYXkoTyk7XG59O1xuXG52YXIgRk9SQ0VEID0gIUlTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgfHwgIVNQRUNJRVNfU1VQUE9SVDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5jb25jYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmNvbmNhdFxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQGlzQ29uY2F0U3ByZWFkYWJsZSBhbmQgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwge1xuICBjb25jYXQ6IGZ1bmN0aW9uIGNvbmNhdChhcmcpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgMCk7XG4gICAgdmFyIG4gPSAwO1xuICAgIHZhciBpLCBrLCBsZW5ndGgsIGxlbiwgRTtcbiAgICBmb3IgKGkgPSAtMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBFID0gaSA9PT0gLTEgPyBPIDogYXJndW1lbnRzW2ldO1xuICAgICAgaWYgKGlzQ29uY2F0U3ByZWFkYWJsZShFKSkge1xuICAgICAgICBsZW4gPSB0b0xlbmd0aChFLmxlbmd0aCk7XG4gICAgICAgIGlmIChuICsgbGVuID4gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCBsZW47IGsrKywgbisrKSBpZiAoayBpbiBFKSBjcmVhdGVQcm9wZXJ0eShBLCBuLCBFW2tdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChuID49IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShBLCBuKyssIEUpO1xuICAgICAgfVxuICAgIH1cbiAgICBBLmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQpO1xuICAgIH07XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xuXG52YXIgcHVzaCA9IFtdLnB1c2g7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBmb3JFYWNoLCBtYXAsIGZpbHRlciwgc29tZSwgZXZlcnksIGZpbmQsIGZpbmRJbmRleCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgdmFyIElTX01BUCA9IFRZUEUgPT0gMTtcbiAgdmFyIElTX0ZJTFRFUiA9IFRZUEUgPT0gMjtcbiAgdmFyIElTX1NPTUUgPSBUWVBFID09IDM7XG4gIHZhciBJU19FVkVSWSA9IFRZUEUgPT0gNDtcbiAgdmFyIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDY7XG4gIHZhciBOT19IT0xFUyA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYO1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0LCBzcGVjaWZpY0NyZWF0ZSkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSW5kZXhlZE9iamVjdChPKTtcbiAgICB2YXIgYm91bmRGdW5jdGlvbiA9IGJpbmQoY2FsbGJhY2tmbiwgdGhhdCwgMyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBjcmVhdGUgPSBzcGVjaWZpY0NyZWF0ZSB8fCBhcnJheVNwZWNpZXNDcmVhdGU7XG4gICAgdmFyIHRhcmdldCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHZhbHVlLCByZXN1bHQ7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKSB7XG4gICAgICB2YWx1ZSA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzdWx0ID0gYm91bmRGdW5jdGlvbih2YWx1ZSwgaW5kZXgsIE8pO1xuICAgICAgaWYgKFRZUEUpIHtcbiAgICAgICAgaWYgKElTX01BUCkgdGFyZ2V0W2luZGV4XSA9IHJlc3VsdDsgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdCkgc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWx1ZTsgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHB1c2guY2FsbCh0YXJnZXQsIHZhbHVlKTsgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZiAoSVNfRVZFUlkpIHJldHVybiBmYWxzZTsgIC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiB0YXJnZXQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbiAgZm9yRWFjaDogY3JlYXRlTWV0aG9kKDApLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbiAgbWFwOiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbHRlclxuICBmaWx0ZXI6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvbWVcbiAgc29tZTogY3JlYXRlTWV0aG9kKDMpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmV2ZXJ5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmV2ZXJ5XG4gIGV2ZXJ5OiBjcmVhdGVNZXRob2QoNCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4gIGZpbmQ6IGNyZWF0ZU1ldGhvZCg1KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZEluZGV4XG4gIGZpbmRJbmRleDogY3JlYXRlTWV0aG9kKDYpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBhcmd1bWVudCkge1xuICB2YXIgbWV0aG9kID0gW11bTUVUSE9EX05BTUVdO1xuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNhbGwsbm8tdGhyb3ctbGl0ZXJhbFxuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgdGhyb3cgMTsgfSwgMSk7XG4gIH0pO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgY2FjaGUgPSB7fTtcblxudmFyIHRocm93ZXIgPSBmdW5jdGlvbiAoaXQpIHsgdGhyb3cgaXQ7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBvcHRpb25zKSB7XG4gIGlmIChoYXMoY2FjaGUsIE1FVEhPRF9OQU1FKSkgcmV0dXJuIGNhY2hlW01FVEhPRF9OQU1FXTtcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHZhciBBQ0NFU1NPUlMgPSBoYXMob3B0aW9ucywgJ0FDQ0VTU09SUycpID8gb3B0aW9ucy5BQ0NFU1NPUlMgOiBmYWxzZTtcbiAgdmFyIGFyZ3VtZW50MCA9IGhhcyhvcHRpb25zLCAwKSA/IG9wdGlvbnNbMF0gOiB0aHJvd2VyO1xuICB2YXIgYXJndW1lbnQxID0gaGFzKG9wdGlvbnMsIDEpID8gb3B0aW9uc1sxXSA6IHVuZGVmaW5lZDtcblxuICByZXR1cm4gY2FjaGVbTUVUSE9EX05BTUVdID0gISFtZXRob2QgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoQUNDRVNTT1JTICYmICFERVNDUklQVE9SUykgcmV0dXJuIHRydWU7XG4gICAgdmFyIE8gPSB7IGxlbmd0aDogLTEgfTtcblxuICAgIGlmIChBQ0NFU1NPUlMpIGRlZmluZVByb3BlcnR5KE8sIDEsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiB0aHJvd2VyIH0pO1xuICAgIGVsc2UgT1sxXSA9IDE7XG5cbiAgICBtZXRob2QuY2FsbChPLCBhcmd1bWVudDAsIGFyZ3VtZW50MSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2ZvckVhY2gnKTtcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdmb3JFYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxubW9kdWxlLmV4cG9ydHMgPSAoIVNUUklDVF9NRVRIT0QgfHwgIVVTRVNfVE9fTEVOR1RIKSA/IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgcmV0dXJuICRmb3JFYWNoKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbn0gOiBbXS5mb3JFYWNoO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFtdLmZvckVhY2ggIT0gZm9yRWFjaCB9LCB7XG4gIGZvckVhY2g6IGZvckVhY2hcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgbmF0aXZlSW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbnZhciBORUdBVElWRV9aRVJPID0gISFuYXRpdmVJbmRleE9mICYmIDEgLyBbMV0uaW5kZXhPZigxLCAtMCkgPCAwO1xudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdpbmRleE9mJyk7XG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnaW5kZXhPZicsIHsgQUNDRVNTT1JTOiB0cnVlLCAxOiAwIH0pO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IE5FR0FUSVZFX1pFUk8gfHwgIVNUUklDVF9NRVRIT0QgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qICwgZnJvbUluZGV4ID0gMCAqLykge1xuICAgIHJldHVybiBORUdBVElWRV9aRVJPXG4gICAgICAvLyBjb252ZXJ0IC0wIHRvICswXG4gICAgICA/IG5hdGl2ZUluZGV4T2YuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCAwXG4gICAgICA6ICRpbmRleE9mKHRoaXMsIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkbWFwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLm1hcDtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnbWFwJyk7XG4vLyBGRjQ5LSBpc3N1ZVxudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ21hcCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgbWFwOiBmdW5jdGlvbiBtYXAoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJG1hcCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSAmJiBpdCAhPT0gbnVsbCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcIkNhbid0IHNldCBcIiArIFN0cmluZyhpdCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBhUG9zc2libGVQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5zZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3Quc2V0cHJvdG90eXBlb2Zcbi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IGZ1bmN0aW9uICgpIHtcbiAgdmFyIENPUlJFQ1RfU0VUVEVSID0gZmFsc2U7XG4gIHZhciB0ZXN0ID0ge307XG4gIHZhciBzZXR0ZXI7XG4gIHRyeSB7XG4gICAgc2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0O1xuICAgIHNldHRlci5jYWxsKHRlc3QsIFtdKTtcbiAgICBDT1JSRUNUX1NFVFRFUiA9IHRlc3QgaW5zdGFuY2VvZiBBcnJheTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICBhbk9iamVjdChPKTtcbiAgICBhUG9zc2libGVQcm90b3R5cGUocHJvdG8pO1xuICAgIGlmIChDT1JSRUNUX1NFVFRFUikgc2V0dGVyLmNhbGwoTywgcHJvdG8pO1xuICAgIGVsc2UgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICByZXR1cm4gTztcbiAgfTtcbn0oKSA6IHVuZGVmaW5lZCk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcblxuLy8gbWFrZXMgc3ViY2xhc3Npbmcgd29yayBjb3JyZWN0IGZvciB3cmFwcGVkIGJ1aWx0LWluc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHRoaXMsIGR1bW15LCBXcmFwcGVyKSB7XG4gIHZhciBOZXdUYXJnZXQsIE5ld1RhcmdldFByb3RvdHlwZTtcbiAgaWYgKFxuICAgIC8vIGl0IGNhbiB3b3JrIG9ubHkgd2l0aCBuYXRpdmUgYHNldFByb3RvdHlwZU9mYFxuICAgIHNldFByb3RvdHlwZU9mICYmXG4gICAgLy8gd2UgaGF2ZW4ndCBjb21wbGV0ZWx5IGNvcnJlY3QgcHJlLUVTNiB3YXkgZm9yIGdldHRpbmcgYG5ldy50YXJnZXRgLCBzbyB1c2UgdGhpc1xuICAgIHR5cGVvZiAoTmV3VGFyZ2V0ID0gZHVtbXkuY29uc3RydWN0b3IpID09ICdmdW5jdGlvbicgJiZcbiAgICBOZXdUYXJnZXQgIT09IFdyYXBwZXIgJiZcbiAgICBpc09iamVjdChOZXdUYXJnZXRQcm90b3R5cGUgPSBOZXdUYXJnZXQucHJvdG90eXBlKSAmJlxuICAgIE5ld1RhcmdldFByb3RvdHlwZSAhPT0gV3JhcHBlci5wcm90b3R5cGVcbiAgKSBzZXRQcm90b3R5cGVPZigkdGhpcywgTmV3VGFyZ2V0UHJvdG90eXBlKTtcbiAgcmV0dXJuICR0aGlzO1xufTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYoTywga2V5ID0ga2V5c1tpbmRleCsrXSwgUHJvcGVydGllc1trZXldKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignZG9jdW1lbnQnLCAnZG9jdW1lbnRFbGVtZW50Jyk7XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG5cbnZhciBHVCA9ICc+JztcbnZhciBMVCA9ICc8JztcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBTQ1JJUFQgPSAnc2NyaXB0JztcbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcblxudmFyIEVtcHR5Q29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cbnZhciBzY3JpcHRUYWcgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICByZXR1cm4gTFQgKyBTQ1JJUFQgKyBHVCArIGNvbnRlbnQgKyBMVCArICcvJyArIFNDUklQVCArIEdUO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIEFjdGl2ZVggT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYID0gZnVuY3Rpb24gKGFjdGl2ZVhEb2N1bWVudCkge1xuICBhY3RpdmVYRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCcnKSk7XG4gIGFjdGl2ZVhEb2N1bWVudC5jbG9zZSgpO1xuICB2YXIgdGVtcCA9IGFjdGl2ZVhEb2N1bWVudC5wYXJlbnRXaW5kb3cuT2JqZWN0O1xuICBhY3RpdmVYRG9jdW1lbnQgPSBudWxsOyAvLyBhdm9pZCBtZW1vcnkgbGVha1xuICByZXR1cm4gdGVtcDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgSlMgPSAnamF2YScgKyBTQ1JJUFQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzQ3NVxuICBpZnJhbWUuc3JjID0gU3RyaW5nKEpTKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJ2RvY3VtZW50LkY9T2JqZWN0JykpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICByZXR1cm4gaWZyYW1lRG9jdW1lbnQuRjtcbn07XG5cbi8vIENoZWNrIGZvciBkb2N1bWVudC5kb21haW4gYW5kIGFjdGl2ZSB4IHN1cHBvcnRcbi8vIE5vIG5lZWQgdG8gdXNlIGFjdGl2ZSB4IGFwcHJvYWNoIHdoZW4gZG9jdW1lbnQuZG9tYWluIGlzIG5vdCBzZXRcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0vaXNzdWVzLzE1MFxuLy8gdmFyaWF0aW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9raXRjYW1icmlkZ2UvZXM1LXNoaW0vY29tbWl0LzRmNzM4YWMwNjYzNDZcbi8vIGF2b2lkIElFIEdDIGJ1Z1xudmFyIGFjdGl2ZVhEb2N1bWVudDtcbnZhciBOdWxsUHJvdG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLyogZ2xvYmFsIEFjdGl2ZVhPYmplY3QgKi9cbiAgICBhY3RpdmVYRG9jdW1lbnQgPSBkb2N1bWVudC5kb21haW4gJiYgbmV3IEFjdGl2ZVhPYmplY3QoJ2h0bWxmaWxlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGlnbm9yZSAqLyB9XG4gIE51bGxQcm90b09iamVjdCA9IGFjdGl2ZVhEb2N1bWVudCA/IE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVgoYWN0aXZlWERvY3VtZW50KSA6IE51bGxQcm90b09iamVjdFZpYUlGcmFtZSgpO1xuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBOdWxsUHJvdG9PYmplY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIE51bGxQcm90b09iamVjdCgpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHlDb25zdHJ1Y3RvcigpO1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gTnVsbFByb3RvT2JqZWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwiLy8gYSBzdHJpbmcgb2YgYWxsIHZhbGlkIHVuaWNvZGUgd2hpdGVzcGFjZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5tb2R1bGUuZXhwb3J0cyA9ICdcXHUwMDA5XFx1MDAwQVxcdTAwMEJcXHUwMDBDXFx1MDAwRFxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGJztcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciB3aGl0ZXNwYWNlID0gJ1snICsgd2hpdGVzcGFjZXMgKyAnXSc7XG52YXIgbHRyaW0gPSBSZWdFeHAoJ14nICsgd2hpdGVzcGFjZSArIHdoaXRlc3BhY2UgKyAnKicpO1xudmFyIHJ0cmltID0gUmVnRXhwKHdoaXRlc3BhY2UgKyB3aGl0ZXNwYWNlICsgJyokJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbSwgdHJpbVN0YXJ0LCB0cmltRW5kLCB0cmltTGVmdCwgdHJpbVJpZ2h0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzKSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgaWYgKFRZUEUgJiAxKSBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShsdHJpbSwgJycpO1xuICAgIGlmIChUWVBFICYgMikgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocnRyaW0sICcnKTtcbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbUxlZnQsIHRyaW1TdGFydCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbXN0YXJ0XG4gIHN0YXJ0OiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbVJpZ2h0LCB0cmltRW5kIH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltZW5kXG4gIGVuZDogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS50cmltYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltXG4gIHRyaW06IGNyZWF0ZU1ldGhvZCgzKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5oZXJpdC1pZi1yZXF1aXJlZCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgdHJpbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbScpLnRyaW07XG5cbnZhciBOVU1CRVIgPSAnTnVtYmVyJztcbnZhciBOYXRpdmVOdW1iZXIgPSBnbG9iYWxbTlVNQkVSXTtcbnZhciBOdW1iZXJQcm90b3R5cGUgPSBOYXRpdmVOdW1iZXIucHJvdG90eXBlO1xuXG4vLyBPcGVyYSB+MTIgaGFzIGJyb2tlbiBPYmplY3QjdG9TdHJpbmdcbnZhciBCUk9LRU5fQ0xBU1NPRiA9IGNsYXNzb2YoY3JlYXRlKE51bWJlclByb3RvdHlwZSkpID09IE5VTUJFUjtcblxuLy8gYFRvTnVtYmVyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvbnVtYmVyXG52YXIgdG9OdW1iZXIgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGl0ID0gdG9QcmltaXRpdmUoYXJndW1lbnQsIGZhbHNlKTtcbiAgdmFyIGZpcnN0LCB0aGlyZCwgcmFkaXgsIG1heENvZGUsIGRpZ2l0cywgbGVuZ3RoLCBpbmRleCwgY29kZTtcbiAgaWYgKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBpdC5sZW5ndGggPiAyKSB7XG4gICAgaXQgPSB0cmltKGl0KTtcbiAgICBmaXJzdCA9IGl0LmNoYXJDb2RlQXQoMCk7XG4gICAgaWYgKGZpcnN0ID09PSA0MyB8fCBmaXJzdCA9PT0gNDUpIHtcbiAgICAgIHRoaXJkID0gaXQuY2hhckNvZGVBdCgyKTtcbiAgICAgIGlmICh0aGlyZCA9PT0gODggfHwgdGhpcmQgPT09IDEyMCkgcmV0dXJuIE5hTjsgLy8gTnVtYmVyKCcrMHgxJykgc2hvdWxkIGJlIE5hTiwgb2xkIFY4IGZpeFxuICAgIH0gZWxzZSBpZiAoZmlyc3QgPT09IDQ4KSB7XG4gICAgICBzd2l0Y2ggKGl0LmNoYXJDb2RlQXQoMSkpIHtcbiAgICAgICAgY2FzZSA2NjogY2FzZSA5ODogcmFkaXggPSAyOyBtYXhDb2RlID0gNDk7IGJyZWFrOyAvLyBmYXN0IGVxdWFsIG9mIC9eMGJbMDFdKyQvaVxuICAgICAgICBjYXNlIDc5OiBjYXNlIDExMTogcmFkaXggPSA4OyBtYXhDb2RlID0gNTU7IGJyZWFrOyAvLyBmYXN0IGVxdWFsIG9mIC9eMG9bMC03XSskL2lcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuICtpdDtcbiAgICAgIH1cbiAgICAgIGRpZ2l0cyA9IGl0LnNsaWNlKDIpO1xuICAgICAgbGVuZ3RoID0gZGlnaXRzLmxlbmd0aDtcbiAgICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb2RlID0gZGlnaXRzLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgICAgICAvLyBwYXJzZUludCBwYXJzZXMgYSBzdHJpbmcgdG8gYSBmaXJzdCB1bmF2YWlsYWJsZSBzeW1ib2xcbiAgICAgICAgLy8gYnV0IFRvTnVtYmVyIHNob3VsZCByZXR1cm4gTmFOIGlmIGEgc3RyaW5nIGNvbnRhaW5zIHVuYXZhaWxhYmxlIHN5bWJvbHNcbiAgICAgICAgaWYgKGNvZGUgPCA0OCB8fCBjb2RlID4gbWF4Q29kZSkgcmV0dXJuIE5hTjtcbiAgICAgIH0gcmV0dXJuIHBhcnNlSW50KGRpZ2l0cywgcmFkaXgpO1xuICAgIH1cbiAgfSByZXR1cm4gK2l0O1xufTtcblxuLy8gYE51bWJlcmAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW51bWJlci1jb25zdHJ1Y3RvclxuaWYgKGlzRm9yY2VkKE5VTUJFUiwgIU5hdGl2ZU51bWJlcignIDBvMScpIHx8ICFOYXRpdmVOdW1iZXIoJzBiMScpIHx8IE5hdGl2ZU51bWJlcignKzB4MScpKSkge1xuICB2YXIgTnVtYmVyV3JhcHBlciA9IGZ1bmN0aW9uIE51bWJlcih2YWx1ZSkge1xuICAgIHZhciBpdCA9IGFyZ3VtZW50cy5sZW5ndGggPCAxID8gMCA6IHZhbHVlO1xuICAgIHZhciBkdW1teSA9IHRoaXM7XG4gICAgcmV0dXJuIGR1bW15IGluc3RhbmNlb2YgTnVtYmVyV3JhcHBlclxuICAgICAgLy8gY2hlY2sgb24gMS4uY29uc3RydWN0b3IoZm9vKSBjYXNlXG4gICAgICAmJiAoQlJPS0VOX0NMQVNTT0YgPyBmYWlscyhmdW5jdGlvbiAoKSB7IE51bWJlclByb3RvdHlwZS52YWx1ZU9mLmNhbGwoZHVtbXkpOyB9KSA6IGNsYXNzb2YoZHVtbXkpICE9IE5VTUJFUilcbiAgICAgICAgPyBpbmhlcml0SWZSZXF1aXJlZChuZXcgTmF0aXZlTnVtYmVyKHRvTnVtYmVyKGl0KSksIGR1bW15LCBOdW1iZXJXcmFwcGVyKSA6IHRvTnVtYmVyKGl0KTtcbiAgfTtcbiAgZm9yICh2YXIga2V5cyA9IERFU0NSSVBUT1JTID8gZ2V0T3duUHJvcGVydHlOYW1lcyhOYXRpdmVOdW1iZXIpIDogKFxuICAgIC8vIEVTMzpcbiAgICAnTUFYX1ZBTFVFLE1JTl9WQUxVRSxOYU4sTkVHQVRJVkVfSU5GSU5JVFksUE9TSVRJVkVfSU5GSU5JVFksJyArXG4gICAgLy8gRVMyMDE1IChpbiBjYXNlLCBpZiBtb2R1bGVzIHdpdGggRVMyMDE1IE51bWJlciBzdGF0aWNzIHJlcXVpcmVkIGJlZm9yZSk6XG4gICAgJ0VQU0lMT04saXNGaW5pdGUsaXNJbnRlZ2VyLGlzTmFOLGlzU2FmZUludGVnZXIsTUFYX1NBRkVfSU5URUdFUiwnICtcbiAgICAnTUlOX1NBRkVfSU5URUdFUixwYXJzZUZsb2F0LHBhcnNlSW50LGlzSW50ZWdlcidcbiAgKS5zcGxpdCgnLCcpLCBqID0gMCwga2V5OyBrZXlzLmxlbmd0aCA+IGo7IGorKykge1xuICAgIGlmIChoYXMoTmF0aXZlTnVtYmVyLCBrZXkgPSBrZXlzW2pdKSAmJiAhaGFzKE51bWJlcldyYXBwZXIsIGtleSkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KE51bWJlcldyYXBwZXIsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE5hdGl2ZU51bWJlciwga2V5KSk7XG4gICAgfVxuICB9XG4gIE51bWJlcldyYXBwZXIucHJvdG90eXBlID0gTnVtYmVyUHJvdG90eXBlO1xuICBOdW1iZXJQcm90b3R5cGUuY29uc3RydWN0b3IgPSBOdW1iZXJXcmFwcGVyO1xuICByZWRlZmluZShnbG9iYWwsIE5VTUJFUiwgTnVtYmVyV3JhcHBlcik7XG59XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHRyaW0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0nKS50cmltO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciAkcGFyc2VJbnQgPSBnbG9iYWwucGFyc2VJbnQ7XG52YXIgaGV4ID0gL15bKy1dPzBbWHhdLztcbnZhciBGT1JDRUQgPSAkcGFyc2VJbnQod2hpdGVzcGFjZXMgKyAnMDgnKSAhPT0gOCB8fCAkcGFyc2VJbnQod2hpdGVzcGFjZXMgKyAnMHgxNicpICE9PSAyMjtcblxuLy8gYHBhcnNlSW50YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXBhcnNlaW50LXN0cmluZy1yYWRpeFxubW9kdWxlLmV4cG9ydHMgPSBGT1JDRUQgPyBmdW5jdGlvbiBwYXJzZUludChzdHJpbmcsIHJhZGl4KSB7XG4gIHZhciBTID0gdHJpbShTdHJpbmcoc3RyaW5nKSk7XG4gIHJldHVybiAkcGFyc2VJbnQoUywgKHJhZGl4ID4+PiAwKSB8fCAoaGV4LnRlc3QoUykgPyAxNiA6IDEwKSk7XG59IDogJHBhcnNlSW50O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgcGFyc2VJbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbnVtYmVyLXBhcnNlLWludCcpO1xuXG4vLyBgTnVtYmVyLnBhcnNlSW50YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW51bWJlci5wYXJzZWludFxuJCh7IHRhcmdldDogJ051bWJlcicsIHN0YXQ6IHRydWUsIGZvcmNlZDogTnVtYmVyLnBhcnNlSW50ICE9IHBhcnNlSW50IH0sIHtcbiAgcGFyc2VJbnQ6IHBhcnNlSW50XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG5cbnZhciBuYXRpdmVBc3NpZ24gPSBPYmplY3QuYXNzaWduO1xudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG4vLyBgT2JqZWN0LmFzc2lnbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG5tb2R1bGUuZXhwb3J0cyA9ICFuYXRpdmVBc3NpZ24gfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBzaG91bGQgaGF2ZSBjb3JyZWN0IG9yZGVyIG9mIG9wZXJhdGlvbnMgKEVkZ2UgYnVnKVxuICBpZiAoREVTQ1JJUFRPUlMgJiYgbmF0aXZlQXNzaWduKHsgYjogMSB9LCBuYXRpdmVBc3NpZ24oZGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYicsIHtcbiAgICAgICAgdmFsdWU6IDMsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH0pLCB7IGI6IDIgfSkpLmIgIT09IDEpIHJldHVybiB0cnVlO1xuICAvLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1ZylcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBzeW1ib2wgPSBTeW1ib2woKTtcbiAgdmFyIGFscGhhYmV0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtzeW1ib2xdID0gNztcbiAgYWxwaGFiZXQuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGNocikgeyBCW2Nocl0gPSBjaHI7IH0pO1xuICByZXR1cm4gbmF0aXZlQXNzaWduKHt9LCBBKVtzeW1ib2xdICE9IDcgfHwgb2JqZWN0S2V5cyhuYXRpdmVBc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBhbHBoYWJldDtcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICB2YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mO1xuICB3aGlsZSAoYXJndW1lbnRzTGVuZ3RoID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IEluZGV4ZWRPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5U3ltYm9scyA/IG9iamVjdEtleXMoUykuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhTKSkgOiBvYmplY3RLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikge1xuICAgICAga2V5ID0ga2V5c1tqKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogbmF0aXZlQXNzaWduO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1hc3NpZ24nKTtcblxuLy8gYE9iamVjdC5hc3NpZ25gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmFzc2lnblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogT2JqZWN0LmFzc2lnbiAhPT0gYXNzaWduIH0sIHtcbiAgYXNzaWduOiBhc3NpZ25cbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJykuZjtcblxuLy8gYE9iamVjdC57IGVudHJpZXMsIHZhbHVlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRPX0VOVFJJRVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KGl0KTtcbiAgICB2YXIga2V5cyA9IG9iamVjdEtleXMoTyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaSkge1xuICAgICAga2V5ID0ga2V5c1tpKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKE8sIGtleSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goVE9fRU5UUklFUyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBPYmplY3QuZW50cmllc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5lbnRyaWVzXG4gIGVudHJpZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYE9iamVjdC52YWx1ZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QudmFsdWVzXG4gIHZhbHVlczogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRlbnRyaWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC10by1hcnJheScpLmVudHJpZXM7XG5cbi8vIGBPYmplY3QuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZW50cmllc1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUgfSwge1xuICBlbnRyaWVzOiBmdW5jdGlvbiBlbnRyaWVzKE8pIHtcbiAgICByZXR1cm4gJGVudHJpZXMoTyk7XG4gIH1cbn0pO1xuIiwiLy8gaXRlcmFibGUgRE9NIGNvbGxlY3Rpb25zXG4vLyBmbGFnIC0gYGl0ZXJhYmxlYCBpbnRlcmZhY2UgLSAnZW50cmllcycsICdrZXlzJywgJ3ZhbHVlcycsICdmb3JFYWNoJyBtZXRob2RzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IDAsXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IDAsXG4gIENTU1ZhbHVlTGlzdDogMCxcbiAgQ2xpZW50UmVjdExpc3Q6IDAsXG4gIERPTVJlY3RMaXN0OiAwLFxuICBET01TdHJpbmdMaXN0OiAwLFxuICBET01Ub2tlbkxpc3Q6IDEsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiAwLFxuICBGaWxlTGlzdDogMCxcbiAgSFRNTEFsbENvbGxlY3Rpb246IDAsXG4gIEhUTUxDb2xsZWN0aW9uOiAwLFxuICBIVE1MRm9ybUVsZW1lbnQ6IDAsXG4gIEhUTUxTZWxlY3RFbGVtZW50OiAwLFxuICBNZWRpYUxpc3Q6IDAsXG4gIE1pbWVUeXBlQXJyYXk6IDAsXG4gIE5hbWVkTm9kZU1hcDogMCxcbiAgTm9kZUxpc3Q6IDEsXG4gIFBhaW50UmVxdWVzdExpc3Q6IDAsXG4gIFBsdWdpbjogMCxcbiAgUGx1Z2luQXJyYXk6IDAsXG4gIFNWR0xlbmd0aExpc3Q6IDAsXG4gIFNWR051bWJlckxpc3Q6IDAsXG4gIFNWR1BhdGhTZWdMaXN0OiAwLFxuICBTVkdQb2ludExpc3Q6IDAsXG4gIFNWR1N0cmluZ0xpc3Q6IDAsXG4gIFNWR1RyYW5zZm9ybUxpc3Q6IDAsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IDAsXG4gIFN0eWxlU2hlZXRMaXN0OiAwLFxuICBUZXh0VHJhY2tDdWVMaXN0OiAwLFxuICBUZXh0VHJhY2tMaXN0OiAwLFxuICBUb3VjaExpc3Q6IDBcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERPTUl0ZXJhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb20taXRlcmFibGVzJyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxuZm9yICh2YXIgQ09MTEVDVElPTl9OQU1FIGluIERPTUl0ZXJhYmxlcykge1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtDT0xMRUNUSU9OX05BTUVdO1xuICB2YXIgQ29sbGVjdGlvblByb3RvdHlwZSA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZSAmJiBDb2xsZWN0aW9uUHJvdG90eXBlLmZvckVhY2ggIT09IGZvckVhY2gpIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsICdmb3JFYWNoJywgZm9yRWFjaCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgQ29sbGVjdGlvblByb3RvdHlwZS5mb3JFYWNoID0gZm9yRWFjaDtcbiAgfVxufVxuIiwiZXhwb3J0cy5kZWJvdW5jZT1mdW5jdGlvbihpLGUsbyl7dmFyIHQ7cmV0dXJuIHZvaWQgMD09PWUmJihlPTUwKSx2b2lkIDA9PT1vJiYobz17aXNJbW1lZGlhdGU6ITF9KSxmdW5jdGlvbigpe2Zvcih2YXIgYT1bXSxkPWFyZ3VtZW50cy5sZW5ndGg7ZC0tOylhW2RdPWFyZ3VtZW50c1tkXTt2YXIgbj10aGlzLG09by5pc0ltbWVkaWF0ZSYmdm9pZCAwPT09dDt2b2lkIDAhPT10JiZjbGVhclRpbWVvdXQodCksdD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dD12b2lkIDAsby5pc0ltbWVkaWF0ZXx8aS5hcHBseShuLGEpfSxlKSxtJiZpLmFwcGx5KG4sYSl9fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdzbGljZScpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ3NsaWNlJywgeyBBQ0NFU1NPUlM6IHRydWUsIDA6IDAsIDE6IDIgfSk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgbmF0aXZlU2xpY2UgPSBbXS5zbGljZTtcbnZhciBtYXggPSBNYXRoLm1heDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zbGljZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc2xpY2Vcbi8vIGZhbGxiYWNrIGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5ncyBhbmQgRE9NIG9iamVjdHNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFIQVNfU1BFQ0lFU19TVVBQT1JUIHx8ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgayA9IHRvQWJzb2x1dGVJbmRleChzdGFydCwgbGVuZ3RoKTtcbiAgICB2YXIgZmluID0gdG9BYnNvbHV0ZUluZGV4KGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogZW5kLCBsZW5ndGgpO1xuICAgIC8vIGlubGluZSBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBmb3IgdXNhZ2UgbmF0aXZlIGBBcnJheSNzbGljZWAgd2hlcmUgaXQncyBwb3NzaWJsZVxuICAgIHZhciBDb25zdHJ1Y3RvciwgcmVzdWx0LCBuO1xuICAgIGlmIChpc0FycmF5KE8pKSB7XG4gICAgICBDb25zdHJ1Y3RvciA9IE8uY29uc3RydWN0b3I7XG4gICAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgICAgaWYgKHR5cGVvZiBDb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIChDb25zdHJ1Y3RvciA9PT0gQXJyYXkgfHwgaXNBcnJheShDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSkge1xuICAgICAgICBDb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoQ29uc3RydWN0b3IpKSB7XG4gICAgICAgIENvbnN0cnVjdG9yID0gQ29uc3RydWN0b3JbU1BFQ0lFU107XG4gICAgICAgIGlmIChDb25zdHJ1Y3RvciA9PT0gbnVsbCkgQ29uc3RydWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoQ29uc3RydWN0b3IgPT09IEFycmF5IHx8IENvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVNsaWNlLmNhbGwoTywgaywgZmluKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ID0gbmV3IChDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDb25zdHJ1Y3RvcikobWF4KGZpbiAtIGssIDApKTtcbiAgICBmb3IgKG4gPSAwOyBrIDwgZmluOyBrKyssIG4rKykgaWYgKGsgaW4gTykgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBuLCBPW2tdKTtcbiAgICByZXN1bHQubGVuZ3RoID0gbjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgdGVzdCA9IHt9O1xuXG50ZXN0W1RPX1NUUklOR19UQUddID0gJ3onO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZyh0ZXN0KSA9PT0gJ1tvYmplY3Qgel0nO1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBDT1JSRUNUX0FSR1VNRU5UUyA9IGNsYXNzb2ZSYXcoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8gY2xhc3NvZlJhdyA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgdGFnLCByZXN1bHQ7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mICh0YWcgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRPX1NUUklOR19UQUcpKSA9PSAnc3RyaW5nJyA/IHRhZ1xuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQ09SUkVDVF9BUkdVTUVOVFMgPyBjbGFzc29mUmF3KE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKHJlc3VsdCA9IGNsYXNzb2ZSYXcoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyB7fS50b1N0cmluZyA6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG59O1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcnKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKCFUT19TVFJJTkdfVEFHX1NVUFBPUlQpIHtcbiAgcmVkZWZpbmUoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgdG9TdHJpbmcsIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG5cbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG52YXIgbmF0aXZlVG9TdHJpbmcgPSBSZWdFeHBQcm90b3R5cGVbVE9fU1RSSU5HXTtcblxudmFyIE5PVF9HRU5FUklDID0gZmFpbHMoZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlVG9TdHJpbmcuY2FsbCh7IHNvdXJjZTogJ2EnLCBmbGFnczogJ2InIH0pICE9ICcvYS9iJzsgfSk7XG4vLyBGRjQ0LSBSZWdFeHAjdG9TdHJpbmcgaGFzIGEgd3JvbmcgbmFtZVxudmFyIElOQ09SUkVDVF9OQU1FID0gbmF0aXZlVG9TdHJpbmcubmFtZSAhPSBUT19TVFJJTkc7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbmlmIChOT1RfR0VORVJJQyB8fCBJTkNPUlJFQ1RfTkFNRSkge1xuICByZWRlZmluZShSZWdFeHAucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHZhciBSID0gYW5PYmplY3QodGhpcyk7XG4gICAgdmFyIHAgPSBTdHJpbmcoUi5zb3VyY2UpO1xuICAgIHZhciByZiA9IFIuZmxhZ3M7XG4gICAgdmFyIGYgPSBTdHJpbmcocmYgPT09IHVuZGVmaW5lZCAmJiBSIGluc3RhbmNlb2YgUmVnRXhwICYmICEoJ2ZsYWdzJyBpbiBSZWdFeHBQcm90b3R5cGUpID8gZmxhZ3MuY2FsbChSKSA6IHJmKTtcbiAgICByZXR1cm4gJy8nICsgcCArICcvJyArIGY7XG4gIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoaHRtbDogc3RyaW5nKTogSFRNTEVsZW1lbnQgPT4ge1xyXG4gIGNvbnN0IGVsID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAndGV4dC9odG1sJykuYm9keS5maXJzdENoaWxkO1xyXG5cclxuICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGVsXHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN1cHBsaWVkIG1hcmt1cCBkb2VzIG5vdCBjcmVhdGUgYW4gSFRNTCBFbGVtZW50XCIpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBhMTF5Y2xpY2sgLSBFYXNpbHkgaGFuZGxlIGtleWJvYXJkIGNsaWNrIGV2ZW50cyBvbiBub24gc2VtYW50aWMgYnV0dG9uIGVsZW1lbnRzLlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3ZpbmtsZS9hMTF5Y2xpY2tcclxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IENsaWNrL2tleWJvYXJkIGV2ZW50IG9iamVjdC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb24gZXZlbnQgdHlwZSBhbmQgY29kZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBhMTF5Q2xpY2sgPSBmdW5jdGlvbihldmVudDogYW55KTogYm9vbGVhbiB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICB2YXIgY29kZSA9IGV2ZW50LmNoYXJDb2RlIHx8IGV2ZW50LmtleUNvZGUsXHJcbiAgICB0eXBlID0gZXZlbnQudHlwZTtcclxuXHJcbiAgaWYgKHR5cGUgPT09ICdjbGljaycpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2tleWRvd24nKSB7XHJcbiAgICBpZiAoY29kZSA9PT0gMzIgfHwgY29kZSA9PT0gMTMpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vLyBDcm9zcyBicm93c2VyIGN1c3RvbSBldmVudFxyXG4vLyBTb21lIGNvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2h5c3RydWsvY3VzdG9tLWV2ZW50LWpzXHJcbmV4cG9ydCBjb25zdCBjcm9zc0N1c3RvbUV2ZW50ID0gKGV2ZW50OiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XHJcbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xyXG5cclxuICBwYXJhbXMgPSBwYXJhbXMgfHwgeyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH07XHJcbiAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcclxuXHJcbiAgcmV0dXJuIGV2dDtcclxufTtcclxuXHJcbi8vIENoZWNrcyBpZiB2YWx1ZSBpcyBhbiBpbnRlZ2VyXHJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL051bWJlci9pc0ludGVnZXIjUG9seWZpbGxcclxuZXhwb3J0IGNvbnN0IGlzSW50ZWdlciA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiZcclxuICAgIGlzRmluaXRlKHZhbHVlKSAmJlxyXG4gICAgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlICYmXHJcbiAgICB2YWx1ZSAhPSBudWxsICYmICFpc05hTihOdW1iZXIodmFsdWUudG9TdHJpbmcoKSkpXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc09iamVjdCA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGw7XHJcbn07XHJcblxyXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjQwNDg2MTVcclxuZXhwb3J0IGNvbnN0IGNhbkFjY2Vzc0FzQXJyYXkgPSAoaXRlbTogYW55KTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICAvLyBtb2Rlcm4gYnJvd3NlciBzdWNoIGFzIElFOSAvIGZpcmVmb3ggLyBjaHJvbWUgZXRjLlxyXG4gIHZhciByZXN1bHQgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSk7XHJcbiAgaWYgKHJlc3VsdCA9PT0gJ1tvYmplY3QgSFRNTENvbGxlY3Rpb25dJyB8fCByZXN1bHQgPT09ICdbb2JqZWN0IE5vZGVMaXN0XScpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICAvL2llIDYvNy84XHJcbiAgaWYgKFxyXG4gICAgdHlwZW9mIGl0ZW0gIT09ICdvYmplY3QnIHx8XHJcbiAgICAhaXRlbS5oYXNPd25Qcm9wZXJ0eSgnbGVuZ3RoJykgfHxcclxuICAgIGl0ZW0ubGVuZ3RoIDwgMFxyXG4gICkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICAvLyBhIGZhbHNlIHBvc2l0aXZlIG9uIGFuIGVtcHR5IHBzZXVkby1hcnJheSBpcyBPSyBiZWNhdXNlIHRoZXJlIHdvbid0IGJlIGFueXRoaW5nXHJcbiAgLy8gdG8gaXRlcmF0ZSBzbyB3ZSBhbGxvdyBhbnl0aGluZyB3aXRoIC5sZW5ndGggPT09IDAgdG8gcGFzcyB0aGUgdGVzdFxyXG4gIGlmIChpdGVtLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChpdGVtWzBdICYmIGl0ZW1bMF0ubm9kZVR5cGUpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vLyBSdW4gYSBmdW5jdGlvbiBvbiBhbGwgZWxlbWVudHMgZXZlbiBpZiBpdCdzIGEgY29sbGVjdGlvbiBvciBzaW5nbGVcclxuZXhwb3J0IGNvbnN0IGV2ZXJ5RWxlbWVudCA9IChcclxuICBlbGVtZW50czpcclxuICAgIHwgSFRNTEVsZW1lbnRcclxuICAgIHwgSFRNTENvbGxlY3Rpb25PZjxIVE1MRWxlbWVudD5cclxuICAgIHwgSFRNTENvbGxlY3Rpb25cclxuICAgIHwgTm9kZUxpc3RcclxuICAgIHwgSFRNTEVsZW1lbnRbXVxyXG4gICAgfCB1bmRlZmluZWQsXHJcbiAgY2FsbGJhY2s/OiAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWRcclxuKSA9PiB7XHJcbiAgLy8gUmV0dXJuIGlmIG5vdGhpbmcgcGFzc2VkXHJcbiAgaWYgKGVsZW1lbnRzID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgLy8gV3JhcCBlbGVtZW50cyBpbiBhbiBhcnJheSBpZiBzaW5nbGVcclxuICBsZXQgZWxzID0gY2FuQWNjZXNzQXNBcnJheShlbGVtZW50cykgPyBlbGVtZW50cyA6IFtlbGVtZW50c107XHJcblxyXG4gIC8vIE9sZHNjaG9vbCBhcnJheSBpdGVyYXRvciBtZXRob2QgZm9yIElFIChhdm9pZGluZyBwb2x5ZmlsbHMpXHJcbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWxzKS5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XHJcbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlbCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IGNvbXB1dGVkIHdpZHRoL2hlaWdodCB3aXRoIHN1YnBpeGVsc1xyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vVmVzdHJpZGUvZ2xlbi5jb2Rlcy9ibG9iL21hc3Rlci9zcmMvcG9zdHMvZ2V0dGluZy1lbGVtZW50LXdpZHRoLm1kXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0U3VicGl4ZWxTdHlsZSA9IChcclxuICBlbGVtZW50OiBIVE1MRWxlbWVudCxcclxuICBzdHlsZTogJ3dpZHRoJyB8ICdoZWlnaHQnLFxyXG4gIHN0eWxlcz86IENTU1N0eWxlRGVjbGFyYXRpb25cclxuKSA9PiB7XHJcbiAgdmFyIEhBU19DT01QVVRFRF9TVFlMRSA9ICEhd2luZG93LmdldENvbXB1dGVkU3R5bGU7XHJcbiAgdmFyIGdldFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIHx8IGZ1bmN0aW9uKCkge307XHJcblxyXG4gIHZhciBDT01QVVRFRF9TSVpFX0lOQ0xVREVTX1BBRERJTkcgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIUhBU19DT01QVVRFRF9TVFlMRSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHBhcmVudCA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGUuc3R5bGUuY3NzVGV4dCA9XHJcbiAgICAgICd3aWR0aDoxMHB4O3BhZGRpbmc6MnB4OycgK1xyXG4gICAgICAnLXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94Oyc7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZSk7XHJcblxyXG4gICAgdmFyIHdpZHRoID0gZ2V0U3R5bGVzKGUsIG51bGwpLndpZHRoO1xyXG4gICAgdmFyIHJldCA9IHdpZHRoID09PSAnMTBweCc7XHJcblxyXG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKGUpO1xyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmUgdGhlIGNvbXB1dGVkIHN0eWxlIGZvciBhbiBlbGVtZW50LCBwYXJzZWQgYXMgYSBmbG9hdC5cclxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0byBnZXQgc3R5bGUgZm9yLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZSBTdHlsZSBwcm9wZXJ0eS5cclxuICAgKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IFtzdHlsZXNdIE9wdGlvbmFsbHkgaW5jbHVkZSBjbGVhbiBzdHlsZXMgdG9cclxuICAgKiAgICAgdXNlIGluc3RlYWQgb2YgYXNraW5nIGZvciB0aGVtIGFnYWluLlxyXG4gICAqIEByZXR1cm4ge251bWJlcn0gVGhlIHBhcnNlZCBjb21wdXRlZCB2YWx1ZSBvciB6ZXJvIGlmIHRoYXQgZmFpbHMgYmVjYXVzZSBJRVxyXG4gICAqICAgICB3aWxsIHJldHVybiAnYXV0bycgd2hlbiB0aGUgZWxlbWVudCBkb2Vzbid0IGhhdmUgbWFyZ2lucyBpbnN0ZWFkIG9mXHJcbiAgICogICAgIHRoZSBjb21wdXRlZCBzdHlsZS5cclxuICAgKi9cclxuICB2YXIgZ2V0TnVtYmVyU3R5bGUgPSBmdW5jdGlvbihcclxuICAgIGVsOiBIVE1MRWxlbWVudCxcclxuICAgIGVsU3R5bGU6ICd3aWR0aCcgfCAnaGVpZ2h0JyxcclxuICAgIGVsU3R5bGVzPzogQ1NTU3R5bGVEZWNsYXJhdGlvblxyXG4gICkge1xyXG4gICAgaWYgKEhBU19DT01QVVRFRF9TVFlMRSkge1xyXG4gICAgICBlbFN0eWxlcyA9IGVsU3R5bGVzIHx8IGdldFN0eWxlcyhlbCwgbnVsbCk7XHJcbiAgICAgIHZhciB2YWx1ZSA9IGdldEZsb2F0KGVsU3R5bGVzW2VsU3R5bGVdKTtcclxuXHJcbiAgICAgIC8vIFN1cHBvcnQgSUU8PTExIGFuZCBXM0Mgc3BlYy5cclxuICAgICAgaWYgKCFDT01QVVRFRF9TSVpFX0lOQ0xVREVTX1BBRERJTkcgJiYgZWxTdHlsZSA9PT0gJ3dpZHRoJykge1xyXG4gICAgICAgIHZhbHVlICs9XHJcbiAgICAgICAgICBnZXRGbG9hdChlbFN0eWxlcy5wYWRkaW5nTGVmdCkgK1xyXG4gICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMucGFkZGluZ1JpZ2h0KSArXHJcbiAgICAgICAgICBnZXRGbG9hdChlbFN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpICtcclxuICAgICAgICAgIGdldEZsb2F0KGVsU3R5bGVzLmJvcmRlclJpZ2h0V2lkdGgpO1xyXG4gICAgICB9IGVsc2UgaWYgKCFDT01QVVRFRF9TSVpFX0lOQ0xVREVTX1BBRERJTkcgJiYgZWxTdHlsZSA9PT0gJ2hlaWdodCcpIHtcclxuICAgICAgICB2YWx1ZSArPVxyXG4gICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMucGFkZGluZ1RvcCkgK1xyXG4gICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMucGFkZGluZ0JvdHRvbSkgK1xyXG4gICAgICAgICAgZ2V0RmxvYXQoZWxTdHlsZXMuYm9yZGVyVG9wV2lkdGgpICtcclxuICAgICAgICAgIGdldEZsb2F0KGVsU3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGdldEZsb2F0KGVsLnN0eWxlW2VsU3R5bGVdKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgaXNOdW1iZXIgPSBmdW5jdGlvbihuOiBhbnkpIHtcclxuICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgKGlzRmluaXRlKG4pIGFzIGJvb2xlYW4pO1xyXG4gIH07XHJcblxyXG4gIHZhciBnZXRGbG9hdCA9IGZ1bmN0aW9uKHZhbHVlOiBhbnkpIHtcclxuICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICByZXR1cm4gaXNOdW1iZXIodmFsdWUpID8gKHZhbHVlIGFzIG51bWJlcikgOiAwO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBnZXROdW1iZXJTdHlsZShlbGVtZW50LCBzdHlsZSwgc3R5bGVzKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQcmV2aW91c1NpYmxpbmdzID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhbW91bnQgPSAxMCkgPT4ge1xyXG4gIGNvbnN0IGVsZW1lbnRzID0gW107XHJcbiAgbGV0IHNpYmxpbmcgPSBlbGVtZW50LnByZXZpb3VzU2libGluZyBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgd2hpbGUgKHNpYmxpbmcgJiYgZWxlbWVudHMubGVuZ3RoIDwgYW1vdW50KSB7XHJcbiAgICBlbGVtZW50cy5wdXNoKHNpYmxpbmcpO1xyXG4gICAgc2libGluZyA9IHNpYmxpbmcucHJldmlvdXNTaWJsaW5nIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICB9XHJcbiAgcmV0dXJuIGVsZW1lbnRzO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE5leHRTaWJsaW5ncyA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgYW1vdW50ID0gMTApID0+IHtcclxuICBjb25zdCBlbGVtZW50cyA9IFtdO1xyXG4gIGxldCBzaWJsaW5nID0gZWxlbWVudC5uZXh0U2libGluZyBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcblxyXG4gIHdoaWxlIChzaWJsaW5nICYmIGVsZW1lbnRzLmxlbmd0aCA8IGFtb3VudCkge1xyXG4gICAgZWxlbWVudHMucHVzaChzaWJsaW5nKTtcclxuICAgIHNpYmxpbmcgPSBzaWJsaW5nLm5leHRTaWJsaW5nIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBlbGVtZW50cztcclxufTsiLCJpbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ3RzLWRlYm91bmNlJztcclxuaW1wb3J0IHtcclxuICBjcmVhdGVFbGVtZW50LFxyXG4gIGExMXlDbGljayxcclxuICBjcm9zc0N1c3RvbUV2ZW50LFxyXG4gIGlzSW50ZWdlcixcclxuICBpc09iamVjdCxcclxuICBldmVyeUVsZW1lbnQsXHJcbiAgZ2V0U3VicGl4ZWxTdHlsZSxcclxuICBnZXROZXh0U2libGluZ3MsXHJcbiAgZ2V0UHJldmlvdXNTaWJsaW5nc1xyXG59IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuXHJcbmVudW0gU2xpZGVEaXJlY3Rpb24ge1xyXG4gIFByZXYsXHJcbiAgTmV4dFxyXG59XHJcblxyXG5lbnVtIFNsaWRlclN0YXRlIHtcclxuICBFbmFibGVkID0gMSxcclxuICBEaXNhYmxlZCA9IDBcclxufVxyXG5cclxuZW51bSBBdXRvcGxheVN3aXRjaCB7XHJcbiAgRW5hYmxlLFxyXG4gIERpc2FibGVcclxufVxyXG5cclxuZW51bSBJc0F1dG9wbGF5aW5nIHtcclxuICBZZXMsXHJcbiAgTm8gPSAwXHJcbn1cclxuXHJcbmludGVyZmFjZSBBY3RpdmVWaXNpYmxlU2xpZGVzIHtcclxuICAodmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSwgYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50KTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIEN1c3RvbVBhZ2luZyB7XHJcbiAgKGluZGV4OiBudW1iZXIsIGExMXlTbGlkZXI6IEExMVlTbGlkZXIpOiBzdHJpbmc7XHJcbn1cclxuXHJcbnR5cGUgT3B0aW9ucyA9IHtcclxuICAvKiogQWRkcyBhIGNvbnRhaW5lciBlbGVtZW50IGFyb3VuZCB0aGUgc2xpZGVyICovXHJcbiAgY29udGFpbmVyPzogYm9vbGVhbjtcclxuICAvKiogRW5hYmxlcyBwcmV2L25leHQgYnV0dG9uICovXHJcbiAgYXJyb3dzPzogYm9vbGVhbjtcclxuICAvKiogQnV0dG9uIHRvIHRyaWdnZXIgcHJldmlvdXMgc2xpZGUuIEExMVlTbGlkZXIgd2lsbCBnZW5lcmF0ZSBvbmUgYnkgZGVmYXVsdC4gQ2FuIGJlIG9uZSBvciBtdWx0aXBsZSBIVE1MIGVsZW1lbnRzICovXHJcbiAgcHJldkFycm93PzogSFRNTEVsZW1lbnQgfCBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PiB8IE5vZGVMaXN0O1xyXG4gIC8qKiBCdXR0b24gdG8gdHJpZ2dlciBuZXh0IHNsaWRlLiBBMTFZU2xpZGVyIHdpbGwgZ2VuZXJhdGUgb25lIGJ5IGRlZmF1bHQuIENhbiBiZSBvbmUgb3IgbXVsdGlwbGUgSFRNTCBlbGVtZW50cyAqL1xyXG4gIG5leHRBcnJvdz86IEhUTUxFbGVtZW50IHwgSFRNTENvbGxlY3Rpb25PZjxIVE1MRWxlbWVudD4gfCBOb2RlTGlzdDtcclxuICAvKiogR2VuZXJhdGUgbmF2aWdhdGlvbiBkb3RzICovXHJcbiAgZG90cz86IGJvb2xlYW47XHJcbiAgLyoqIEhlaWdodCBvZiBzbGlkZXIgY29udGFpbmVyIGNoYW5nZXMgYWNjb3JkaW5nIHRvIGVhY2ggc2xpZGUncyBoZWlnaHQgKi9cclxuICBhZGFwdGl2ZUhlaWdodD86IGJvb2xlYW47XHJcbiAgLyoqIEFkZHMgYSBza2lwIGJ1dHRvbiBiZWZvcmUgdGhlIHNsaWRlciBmb3IgYTExeSBkZXZpY2VzIChDYW4gYmUgc2VlbiBieSB0YWJiaW5nKSAqL1xyXG4gIHNraXBCdG4/OiBib29sZWFuO1xyXG4gIC8qKiBUaGUgdG90YWwgbnVtYmVyIG9mIGl0ZW1zIHRvIGJlIHNob3duLiBCeSBkZWZhdWx0IEExMVlTbGlkZXIgd2lsbCB3b3JrIGJ5IGRlZmF1bHQgYmFzZWQgb2ZmIHlvdXIgQ1NTIHN0eWxpbmcuIFRoaXMgb3B0aW9uIGhhcmRjb2RlcyB0aGUgd2lkdGggaW50byB0aGUgSFRNTCBmb3IgeW91ICovXHJcbiAgc2xpZGVzVG9TaG93PzogbnVtYmVyIHwgbnVsbDtcclxuICAvKiogRW5hYmxlcyB0aGUgYXV0b21hdGljIGNoYW5nZSBvZiBzbGlkZXMgKi9cclxuICBhdXRvcGxheT86IGJvb2xlYW47XHJcbiAgLyoqIFRpbWUgYmV0d2VlbiBzbGlkZSBjaGFuZ2VzIHdoZW4gYXV0b3BsYXkgaXMgZW5hYmxlZCAqL1xyXG4gIGF1dG9wbGF5U3BlZWQ/OiBudW1iZXI7XHJcbiAgLyoqIElmIGF1dG9wbGF5IGlzIGVuYWJsZWQgdGhlbiBwYXVzZSB3aGVuIHRoZSBzbGlkZXIgaXMgaG92ZXJlZCAqL1xyXG4gIGF1dG9wbGF5SG92ZXJQYXVzZT86IGJvb2xlYW47XHJcbiAgLyoqICoqKEVYUEVSSU1FTlRBTCkqKiBNYWtlcyB0aGUgY2VudGVyIHNsaWRlIGFjdGl2ZSAqL1xyXG4gIGNlbnRlck1vZGU/OiBib29sZWFuO1xyXG4gIC8qKiBNYWtlcyB0aGUgc2xpZGVyIGluZmluaXRlbHkgbG9vcCAqL1xyXG4gIGluZmluaXRlPzogYm9vbGVhbjtcclxuICAvKiogRGlzYWJsZXMgdGhlIHNsaWRlciAqL1xyXG4gIGRpc2FibGU/OiBib29sZWFuO1xyXG4gIC8qKiBEZWZpbmUgb3B0aW9ucyBmb3IgZGlmZmVyZW50IHZpZXdwb3J0IHdpZHRocyAqL1xyXG4gIHJlc3BvbnNpdmU/OiBvYmplY3QgfCBudWxsO1xyXG4gIC8qKiBEZWZpbmUgeW91ciBvd24gY3VzdG9tIGRvdHMgdGVtcGxhdGUgKi9cclxuICBjdXN0b21QYWdpbmc/OiBDdXN0b21QYWdpbmcgfCBudWxsO1xyXG4gIC8qKiBTd2lwZSBmdW5jdGlvbmFsaXR5ICovXHJcbiAgc3dpcGU/OiBib29sZWFuO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQTExWVNsaWRlciB7XHJcbiAgcHJpdmF0ZSBfYWN0aXZlQ2xhc3M6IHN0cmluZztcclxuICBwcml2YXRlIF92aXNpYmxlQ2xhc3M6IHN0cmluZztcclxuICBwcml2YXRlIF9kb3RzQ2xhc3M6IHN0cmluZztcclxuICBwcml2YXRlIF9zbGlkZXJDbGFzczogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2hhc0N1c3RvbUFycm93czogYm9vbGVhbjtcclxuICBwcml2YXRlIF9mb2N1c2FibGU6IHN0cmluZztcclxuICBwcml2YXRlIF9jaGVja1Nob3VsZEVuYWJsZURlYm91bmNlZDogYW55O1xyXG4gIHByaXZhdGUgX3VwZGF0ZUhlaWdodERlYm91bmNlZDogYW55O1xyXG4gIHByaXZhdGUgX2dlbmVyYXRlRG90c0RlYm91bmNlZDogYW55O1xyXG4gIHByaXZhdGUgX3VwZGF0ZVNjcm9sbFBvc2l0aW9uOiBhbnk7XHJcbiAgcHJpdmF0ZSBfYXV0b3BsYXlUaW1lcjogSXNBdXRvcGxheWluZztcclxuICBwcml2YXRlIGF1dG9wbGF5QnRuOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIF9wYXVzZU9uTW91c2VMZWF2ZTogYm9vbGVhbjtcclxuICBwcml2YXRlIF9za2lwQnRuczogSFRNTEVsZW1lbnRbXTtcclxuICBwdWJsaWMgc2xpZGVyOiBIVE1MRWxlbWVudDtcclxuICBwdWJsaWMgc2xpZGVzOiBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PjtcclxuICBwdWJsaWMgZG90czogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gIHB1YmxpYyBzd2lwZTogYm9vbGVhbjtcclxuICBwdWJsaWMgYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50O1xyXG4gIHB1YmxpYyB2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdO1xyXG4gIHB1YmxpYyBzbGlkZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIHB1YmxpYyBvcHRpb25zOiBPcHRpb25zO1xyXG4gIHB1YmxpYyBzbGlkZXJFbmFibGVkOiBTbGlkZXJTdGF0ZTtcclxuICBwdWJsaWMgbW9kZXJuQnJvd3NlcjogYm9vbGVhbjtcclxuICBwdWJsaWMgbW91c2VEb3duOiBib29sZWFuO1xyXG4gIHB1YmxpYyB0b3VjaFN0YXJ0OiBib29sZWFuO1xyXG4gIHB1YmxpYyBzd2lwZVN0YXJ0WDogbnVtYmVyO1xyXG4gIHB1YmxpYyBzd2lwZVg6IG51bWJlcjtcclxuICBwdWJsaWMgc3dpcGVYQ2FjaGVkOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBvcHRpb25zPzogT3B0aW9ucykge1xyXG4gICAgLy8gRW5mb3JjZSBgZWxlbWVudGAgcGFyYW1ldGVyXHJcbiAgICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHJlcXVpcmVkIGlucHV0IFtlbGVtZW50XSBtdXN0IGJlIGFuIEhUTUxFbGVtZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWFrZSBzdXJlIG9wdGlvbnMgcGFyYW1ldGVyIGlzIGNvcnJlY3RcclxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgIWlzT2JqZWN0KG9wdGlvbnMpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHJlcXVpcmVkIGlucHV0IFtvcHRpb25zXSBtdXN0IGJlIGFuIE9iamVjdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2xpZGVyID0gZWxlbWVudDtcclxuICAgIHRoaXMuc2xpZGVzID0gZWxlbWVudC5jaGlsZHJlbiBhcyBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PjtcclxuICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcclxuICAgICAgJzxkaXYgY2xhc3M9XCJhMTF5LXNsaWRlci1jb250YWluZXJcIj48L2Rpdj4nXHJcbiAgICApO1xyXG4gICAgdGhpcy5fYWN0aXZlQ2xhc3MgPSAnYTExeS1zbGlkZXItYWN0aXZlJztcclxuICAgIHRoaXMuX3Zpc2libGVDbGFzcyA9ICdhMTF5LXNsaWRlci12aXNpYmxlJztcclxuICAgIHRoaXMuX2RvdHNDbGFzcyA9ICdhMTF5LXNsaWRlci1kb3RzJztcclxuICAgIHRoaXMuX3NsaWRlckNsYXNzID0gJ2ExMXktc2xpZGVyJztcclxuICAgIHRoaXMuX2ZvY3VzYWJsZSA9XHJcbiAgICAgICdhLCBhcmVhLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgYnV0dG9uLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsICpbdGFiaW5kZXhdLCAqW2NvbnRlbnRlZGl0YWJsZV0nO1xyXG4gICAgdGhpcy5fYXV0b3BsYXlUaW1lciA9IElzQXV0b3BsYXlpbmcuTm87XHJcbiAgICB0aGlzLmF1dG9wbGF5QnRuID0gY3JlYXRlRWxlbWVudChcclxuICAgICAgYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYTExeS1zbGlkZXItYXV0b3BsYXlcIj5Ub2dnbGUgc2xpZGVyIGF1dG9wbGF5PC9idXR0b24+YFxyXG4gICAgKTtcclxuICAgIHRoaXMuX3BhdXNlT25Nb3VzZUxlYXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9za2lwQnRucyA9IFtdO1xyXG4gICAgdGhpcy5kb3RzID0gbnVsbDtcclxuICAgIHRoaXMuc3dpcGUgPSB0cnVlO1xyXG4gICAgdGhpcy5hY3RpdmVTbGlkZSA9IHRoaXMuc2xpZGVzWzBdO1xyXG4gICAgdGhpcy52aXNpYmxlU2xpZGVzID0gW107XHJcbiAgICB0aGlzLnNsaWRlckVuYWJsZWQgPSBTbGlkZXJTdGF0ZS5EaXNhYmxlZDtcclxuICAgIHRoaXMubW9kZXJuQnJvd3NlciA9ICEhSFRNTEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbFRvO1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuICAgIHRoaXMudG91Y2hTdGFydCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zd2lwZVN0YXJ0WCA9IDA7XHJcbiAgICB0aGlzLnN3aXBlWCA9IDA7XHJcbiAgICB0aGlzLnN3aXBlWENhY2hlZCA9IDA7XHJcbiAgICB0aGlzLl9oYXNDdXN0b21BcnJvd3MgPVxyXG4gICAgICAob3B0aW9ucyAmJiBvcHRpb25zLnByZXZBcnJvdykgfHwgKG9wdGlvbnMgJiYgb3B0aW9ucy5uZXh0QXJyb3cpXHJcbiAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgY29udGFpbmVyOiB0cnVlLFxyXG4gICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgIHByZXZBcnJvdzpcclxuICAgICAgICAob3B0aW9ucyAmJiBvcHRpb25zLnByZXZBcnJvdykgfHxcclxuICAgICAgICBjcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYTExeS1zbGlkZXItcHJldlwiPlByZXZpb3VzIHNsaWRlPC9idXR0b24+J1xyXG4gICAgICAgICksXHJcbiAgICAgIG5leHRBcnJvdzpcclxuICAgICAgICAob3B0aW9ucyAmJiBvcHRpb25zLm5leHRBcnJvdykgfHxcclxuICAgICAgICBjcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYTExeS1zbGlkZXItbmV4dFwiPk5leHQgc2xpZGU8L2J1dHRvbj4nXHJcbiAgICAgICAgKSxcclxuICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxyXG4gICAgICBza2lwQnRuOiB0cnVlLFxyXG4gICAgICBzbGlkZXNUb1Nob3c6IG51bGwsXHJcbiAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcclxuICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlOiB0cnVlLFxyXG4gICAgICBjZW50ZXJNb2RlOiBmYWxzZSxcclxuICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgIGRpc2FibGU6IGZhbHNlLFxyXG4gICAgICByZXNwb25zaXZlOiBudWxsLFxyXG4gICAgICBjdXN0b21QYWdpbmc6IG51bGwsXHJcbiAgICAgIHN3aXBlOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFNldCB1c2VyLWlucHV0dGVkIG9wdGlvbnMgaWYgYXZhaWxhYmxlXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucywgLi4ub3B0aW9ucyB9O1xyXG5cclxuICAgIC8vIEJpbmRpbmdzXHJcbiAgICB0aGlzLl9oYW5kbGVQcmV2ID0gdGhpcy5faGFuZGxlUHJldi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5faGFuZGxlTmV4dCA9IHRoaXMuX2hhbmRsZU5leHQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX2hhbmRsZUF1dG9wbGF5ID0gdGhpcy5faGFuZGxlQXV0b3BsYXkuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX2hhbmRsZUF1dG9wbGF5SG92ZXIgPSB0aGlzLl9oYW5kbGVBdXRvcGxheUhvdmVyLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLl9oYW5kbGVBdXRvcGxheUV2ZW50ID0gdGhpcy5faGFuZGxlQXV0b3BsYXlFdmVudC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5fY2hlY2tTaG91bGRFbmFibGVEZWJvdW5jZWQgPSBkZWJvdW5jZShcclxuICAgICAgdGhpcy5fY2hlY2tTaG91bGRFbmFibGUuYmluZCh0aGlzKSxcclxuICAgICAgMjUwXHJcbiAgICApO1xyXG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0RGVib3VuY2VkID0gZGVib3VuY2UodGhpcy5fdXBkYXRlSGVpZ2h0LmJpbmQodGhpcyksIDI1MCk7XHJcbiAgICB0aGlzLl9nZW5lcmF0ZURvdHNEZWJvdW5jZWQgPSBkZWJvdW5jZSh0aGlzLl9nZW5lcmF0ZURvdHMuYmluZCh0aGlzKSwgMjUwKTtcclxuICAgIHRoaXMuX3VwZGF0ZVNjcm9sbFBvc2l0aW9uID0gZGVib3VuY2UoXHJcbiAgICAgICgpID0+IHRoaXMuc2Nyb2xsVG9TbGlkZSh0aGlzLmFjdGl2ZVNsaWRlKSxcclxuICAgICAgMjUwXHJcbiAgICApO1xyXG4gICAgdGhpcy5faGFuZGxlU2Nyb2xsID0gZGVib3VuY2UodGhpcy5faGFuZGxlU2Nyb2xsLmJpbmQodGhpcyksIDEwKTsgLy8gQ2FsbHMgX3Njcm9sbEZpbmlzaFxyXG4gICAgdGhpcy5fc2Nyb2xsRmluaXNoID0gZGVib3VuY2UodGhpcy5fc2Nyb2xsRmluaXNoLmJpbmQodGhpcyksIDE3NSk7IC8vIE1heSBmaXJlIHR3aWNlIGRlcGVuZGluZyBvbiBicm93c2VyXHJcbiAgICB0aGlzLl9zd2lwZU1vdXNlRG93biA9IHRoaXMuX3N3aXBlTW91c2VEb3duLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLl9zd2lwZU1vdXNlVXAgPSB0aGlzLl9zd2lwZU1vdXNlVXAuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX3N3aXBlTW91c2VNb3ZlID0gdGhpcy5fc3dpcGVNb3VzZU1vdmUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX3N3aXBlVG91Y2hTdGFydCA9IHRoaXMuX3N3aXBlVG91Y2hTdGFydC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5fc3dpcGVUb3VjaEVuZCA9IHRoaXMuX3N3aXBlVG91Y2hFbmQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX3N3aXBlVG91Y2hNb3ZlID0gdGhpcy5fc3dpcGVUb3VjaE1vdmUuYmluZCh0aGlzKTtcclxuXHJcbiAgICAvLyBJbml0aWFsaXplIHNsaWRlclxyXG4gICAgdGhpcy5faW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gSW5pdGlhbGl6ZSB0aGUgc2xpZGVyLCBzaG91bGQgbWlycm9yIGRlc3Ryb3koKVxyXG4gIHByaXZhdGUgX2luaXQoKSB7XHJcbiAgICAvLyBGaXJlZm94IG1vdmVzIHRoZSBzbGlkZXIgZGVwZW5kaW5nIG9uIHBhZ2UgbG9hZCBzbyByZXNldHRpbmcgdG8gMFxyXG4gICAgc2V0VGltZW91dCgoKSA9PiAodGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCA9IDApLCAxKTtcclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBsaXN0ZW5lcnMgZm9yIHJlc3BvbnNpdmUgb3B0aW9ucyBpZiBhZGRlZFxyXG4gICAgaWYgKGlzT2JqZWN0KHRoaXMub3B0aW9ucy5yZXNwb25zaXZlKSkgdGhpcy5fY2hlY2tSZXNwb25zaXZlKCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGhlIHNsaWRlciBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgZGVwZW5kaW5nIG9uIHNsaWRlcyBzaG93blxyXG4gICAgdGhpcy5fY2hlY2tTaG91bGRFbmFibGUoKTtcclxuXHJcbiAgICAvLyBFbmFibGUvZGlzYWJsZSBzbGlkZXIgYWZ0ZXIgcmVzaXplXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fY2hlY2tTaG91bGRFbmFibGVEZWJvdW5jZWQpO1xyXG5cclxuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2luaXQnLCB7XHJcbiAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2hlY2tTaG91bGRFbmFibGUoKSB7XHJcbiAgICBsZXQgc2hvdWxkRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBJZiB1c2VyIHNwZWNpZmllZCB0byBkaXNhYmxlICh1c3VhbGx5IGZvciByZXNwb25zaXZlIG9yIHVwZGF0ZU9wdGlvbnMpXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGUgPT09IHRydWUpIHNob3VsZEVuYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8vIElmIDEgb3IgbGVzcyBzbGlkZXMgZXhpc3QgdGhlbiBhIHNsaWRlciBpcyBub3QgbmVlZGVkXHJcbiAgICBpZiAodGhpcy5zbGlkZXMubGVuZ3RoIDw9IDEpIHNob3VsZEVuYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8vIElmIHVzZXIgZXhwbGljaXRseSBzZXQgc2xpZGVzIHRvIGJlIHNob3duIGFuZCBpdCdzIHRoZSBzYW1lIG51bWJlciBhcyBhdmFpbGFibGVcclxuICAgIGlmIChpc0ludGVnZXIodGhpcy5vcHRpb25zLnNsaWRlc1RvU2hvdykpIHtcclxuICAgICAgaWYgKHRoaXMuc2xpZGVzLmxlbmd0aCA9PT0gdGhpcy5vcHRpb25zLnNsaWRlc1RvU2hvdylcclxuICAgICAgICBzaG91bGRFbmFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBzbGlkZXMgb3V0c2lkZSB0aGUgc2xpZGVyJ3Mgdmlld3BvcnQgYSBzbGlkZXIgaXMgbm90IG5lZWRlZFxyXG4gICAgICB0aGlzLl9nZXRBY3RpdmVBbmRWaXNpYmxlKG51bGwsICh2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdKSA9PiB7XHJcbiAgICAgICAgaWYgKHZpc2libGVTbGlkZXMubGVuZ3RoID09PSB0aGlzLnNsaWRlcy5sZW5ndGgpIHNob3VsZEVuYWJsZSA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFbmFibGUvZGlzYWJsZSBzbGlkZXIgYmFzZWQgb24gYWJvdmUgcmVxdWlyZW1lbnRzXHJcbiAgICBpZiAoc2hvdWxkRW5hYmxlICYmIHRoaXMuc2xpZGVyRW5hYmxlZCA9PT0gU2xpZGVyU3RhdGUuRGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5fZW5hYmxlU2xpZGVyKCk7XHJcbiAgICB9IGVsc2UgaWYgKCFzaG91bGRFbmFibGUgJiYgdGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5FbmFibGVkKSB7XHJcbiAgICAgIHRoaXMuX2Rpc2FibGVTbGlkZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDdXN0b20gYnV0dG9ucyBzaG91bGQgYmUgaGlkZGVuIGlmIG5vdCBpbml0aWFsbHkgZW5hYmxlZFxyXG4gICAgaWYgKCFzaG91bGRFbmFibGUgJiYgdGhpcy5faGFzQ3VzdG9tQXJyb3dzKSB7XHJcbiAgICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMucHJldkFycm93LCBwcmV2QXJyb3cgPT4ge1xyXG4gICAgICAgIHByZXZBcnJvdy5jbGFzc0xpc3QuYWRkKCdhMTF5LXNsaWRlci1oaWRlJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5uZXh0QXJyb3csIG5leHRBcnJvdyA9PiB7XHJcbiAgICAgICAgbmV4dEFycm93LmNsYXNzTGlzdC5hZGQoJ2ExMXktc2xpZGVyLWhpZGUnKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBFbmFibGUgYWxsIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBzbGlkZXIuIFNob3VsZCBtaXJyb3IgX2Rpc2FibGVTbGlkZXIoKVxyXG4gIHByaXZhdGUgX2VuYWJsZVNsaWRlcigpIHtcclxuICAgIC8vIFNldCBzbGlkZXIgdG8gZW5hYmxlZFxyXG4gICAgdGhpcy5zbGlkZXJFbmFibGVkID0gU2xpZGVyU3RhdGUuRW5hYmxlZDtcclxuXHJcbiAgICAvLyBBZGQgc2xpZGVyIGNvbnRhaW5lciB0byBET00gYW5kIG1vdmUgc2xpZGVyIGludG8gaXQgaWYgZW5hYmxlZFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250YWluZXIpIHtcclxuICAgICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRoaXMuc2xpZGVyQ29udGFpbmVyKTtcclxuICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgdGhpcy5zbGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBza2lwIGJ1dHRvbiBiZWZvcmUgc2xpZGVyIGlmIGVuYWJsZWRcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2tpcEJ0bikgdGhpcy5fYWRkU2tpcEJ0bigpO1xyXG5cclxuICAgIC8vIElmIHByZXYvbmV4dCBidXR0b25zIGFyZSBlbmFibGVkIGFuZCB1c2VyIGlzbid0IHVzaW5nIHRoZWlyIG93biBhZGQgaXQgdG8gdGhlIERPTVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hcnJvd3MgJiYgIXRoaXMuX2hhc0N1c3RvbUFycm93cykge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnByZXZBcnJvdyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxyXG4gICAgICAgICAgJ2JlZm9yZWJlZ2luJyxcclxuICAgICAgICAgIHRoaXMub3B0aW9ucy5wcmV2QXJyb3dcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5leHRBcnJvdyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxyXG4gICAgICAgICAgJ2JlZm9yZWJlZ2luJyxcclxuICAgICAgICAgIHRoaXMub3B0aW9ucy5uZXh0QXJyb3dcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUG9zc2libGUgZm9yIHRoZXJlIHRvIGJlIG11bHRpcGxlIHNvIG5lZWQgdG8gbG9vcCB0aHJvdWdoIHRoZW0gYWxsXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5vcHRpb25zLnByZXZBcnJvdywgcHJldkFycm93ID0+IHtcclxuICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgcHJldi9uZXh0IGJ1dHRvbnNcclxuICAgICAgcHJldkFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlUHJldiwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgICBwcmV2QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVQcmV2LCB7XHJcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLl9oYXNDdXN0b21BcnJvd3MpIHtcclxuICAgICAgICAvLyBVc2VyIGdlbmVyYXRlZCBidXR0b25zIGdldCBzcGVjaWFsIGhpZGUgY2xhc3MgcmVtb3ZlZFxyXG4gICAgICAgIHByZXZBcnJvdy5jbGFzc0xpc3QucmVtb3ZlKCdhMTF5LXNsaWRlci1oaWRlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMubmV4dEFycm93LCBuZXh0QXJyb3cgPT4ge1xyXG4gICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBwcmV2L25leHQgYnV0dG9uc1xyXG4gICAgICBuZXh0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVOZXh0LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgIG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZU5leHQsIHtcclxuICAgICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2hhc0N1c3RvbUFycm93cykge1xyXG4gICAgICAgIC8vIFVzZXIgZ2VuZXJhdGVkIGJ1dHRvbnMgZ2V0IHNwZWNpYWwgaGlkZSBjbGFzcyByZW1vdmVkXHJcbiAgICAgICAgbmV4dEFycm93LmNsYXNzTGlzdC5yZW1vdmUoJ2ExMXktc2xpZGVyLWhpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWRkIGRvdCBuYXZpZ2F0aW9uIGlmIGVuYWJsZWRcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZG90cykgdGhpcy5fZ2VuZXJhdGVEb3RzKCk7XHJcblxyXG4gICAgLy8gQWRkIGxpc3RlbmVyIGZvciB3aGVuIHRoZSBzbGlkZXIgc3RvcHMgbW92aW5nXHJcbiAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9oYW5kbGVTY3JvbGwsIGZhbHNlKTtcclxuXHJcbiAgICAvLyBBZGQgYWxsIENTUyBuZWVkZWRcclxuICAgIHRoaXMuX3NldENTUygpO1xyXG5cclxuICAgIC8vIEFkYXB0aXZlIGhlaWdodFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBVcGRhdGUgc2xpZGVyJ3MgaGVpZ2h0IGJhc2VkIG9uIGNvbnRlbnQgb2Ygc2xpZGVcclxuICAgICAgdGhpcy5fdXBkYXRlSGVpZ2h0KHRoaXMuYWN0aXZlU2xpZGUpO1xyXG5cclxuICAgICAgLy8gQWxzbyBhZGQgcmVzaXplIGxpc3RlbmVyIGZvciBpdFxyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlSGVpZ2h0RGVib3VuY2VkLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN0YXJ0IGF1dG9wbGF5IGlmIGVuYWJsZWRcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b3BsYXkpIHRoaXMuX2VuYWJsZUF1dG9wbGF5KCk7XHJcblxyXG4gICAgLy8gT24gcmVzaXplIG1ha2Ugc3VyZSB0byB1cGRhdGUgc2Nyb2xsIHBvc2l0aW9uIGFzIGNvbnRlbnQgbWF5IGNoYW5nZSBpbiB3aWR0aC9oZWlnaHRcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbik7XHJcblxyXG4gICAgLy8gQWRkIHN3aXBlIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zd2lwZSkgdGhpcy5fZW5hYmxlU3dpcGUoKTtcclxuICB9XHJcblxyXG4gIC8vIERpc2FibGUgYWxsIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBzbGlkZXIuIFNob3VsZCBtaXJyb3IgX2VuYWJsZVNsaWRlcigpXHJcbiAgcHJpdmF0ZSBfZGlzYWJsZVNsaWRlcigpIHtcclxuICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9IFNsaWRlclN0YXRlLkRpc2FibGVkO1xyXG5cclxuICAgIC8vIFJlbW92ZSBzbGlkZXIgZnJvbSBhMTF5LXNsaWRlcidzIGNvbnRhaW5lciBhbmQgdGhlbiByZW1vdmUgY29udGFpbmVyIGZyb20gRE9NXHJcbiAgICBpZiAoZG9jdW1lbnQuYm9keS5jb250YWlucyh0aGlzLnNsaWRlckNvbnRhaW5lcikpIHtcclxuICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRoaXMuc2xpZGVyKTtcclxuICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIucGFyZW50Tm9kZSAmJlxyXG4gICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zbGlkZXJDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBza2lwIGJ1dHRvblxyXG4gICAgdGhpcy5fcmVtb3ZlU2tpcEJ0bigpO1xyXG5cclxuICAgIC8vIFBvc3NpYmxlIGZvciB0aGVyZSB0byBiZSBtdWx0aXBsZSBzbyBuZWVkIHRvIGxvb3AgdGhyb3VnaCB0aGVtIGFsbFxyXG4gICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2QXJyb3csIHByZXZBcnJvdyA9PiB7XHJcbiAgICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgZm9yIHByZXYvbmV4dCBidXR0b25zXHJcbiAgICAgIHByZXZBcnJvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZVByZXYpO1xyXG4gICAgICBwcmV2QXJyb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVQcmV2KTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5faGFzQ3VzdG9tQXJyb3dzKSB7XHJcbiAgICAgICAgLy8gT25seSByZW1vdmUgZ2VuZXJhdGVkIGJ1dHRvbnMsIG5vdCB1c2VyLWRlZmluZWQgb25lc1xyXG4gICAgICAgIHByZXZBcnJvdy5wYXJlbnROb2RlICYmIHByZXZBcnJvdy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHByZXZBcnJvdyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVXNlciBnZW5lcmF0ZWQgYnV0dG9ucyBnZXQgc3BlY2lhbCBoaWRlIGNsYXNzIHJlbW92ZWRcclxuICAgICAgICBwcmV2QXJyb3cuY2xhc3NMaXN0LmFkZCgnYTExeS1zbGlkZXItaGlkZScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5vcHRpb25zLm5leHRBcnJvdywgbmV4dEFycm93ID0+IHtcclxuICAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmb3IgcHJldi9uZXh0IGJ1dHRvbnNcclxuICAgICAgbmV4dEFycm93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlTmV4dCk7XHJcbiAgICAgIG5leHRBcnJvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX2hhbmRsZU5leHQpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLl9oYXNDdXN0b21BcnJvd3MpIHtcclxuICAgICAgICAvLyBPbmx5IHJlbW92ZSBnZW5lcmF0ZWQgYnV0dG9ucywgbm90IHVzZXItZGVmaW5lZCBvbmVzXHJcbiAgICAgICAgbmV4dEFycm93LnBhcmVudE5vZGUgJiYgbmV4dEFycm93LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobmV4dEFycm93KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBVc2VyIGdlbmVyYXRlZCBidXR0b25zIGdldCBzcGVjaWFsIGhpZGUgY2xhc3MgcmVtb3ZlZFxyXG4gICAgICAgIG5leHRBcnJvdy5jbGFzc0xpc3QuYWRkKCdhMTF5LXNsaWRlci1oaWRlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFdpbGwgcmVtb3ZlIGRvdHMgaWYgdGhleSBleGlzdFxyXG4gICAgdGhpcy5fcmVtb3ZlRG90cygpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBsaXN0ZW5lciBmb3Igd2hlbiB0aGUgc2xpZGVyIHN0b3BzIG1vdmluZ1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5faGFuZGxlU2Nyb2xsLCBmYWxzZSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCBDU1NcclxuICAgIHRoaXMuX3JlbW92ZUNTUygpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBhbGwgYWRhcHRpdmUgaGVpZ2h0IGZ1bmN0aW9uYWxpdHlcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVIZWlnaHREZWJvdW5jZWQpO1xyXG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KGZhbHNlKTtcclxuXHJcbiAgICAvLyBTdG9wIGF1dG9wbGF5IGlmIGVuYWJsZWRcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b3BsYXkpIHRoaXMuX2Rpc2FibGVBdXRvcGxheSgpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBzd2lwZSBldmVudCBsaXN0ZW5lcnNcclxuICAgIHRoaXMuX2Rpc2FibGVTd2lwZSgpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBzY3JvbGwgcG9zaXRpb24gdXBkYXRlIGNoZWNrXHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlU2Nyb2xsUG9zaXRpb24pO1xyXG5cclxuICAgIC8vIFJlbW92ZSBzd2lwZSBmdW5jdGlvbmFsaXR5XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnN3aXBlKSB0aGlzLl9kaXNhYmxlU3dpcGUoKTtcclxuICB9XHJcblxyXG4gIC8vIEFkZCBhbGwgQ1NTIG5lZWRlZCBmb3IgdGhlIHNsaWRlci4gU2hvdWxkIG1pcnJvciBfcmVtb3ZlQ1NTKClcclxuICBwcml2YXRlIF9zZXRDU1MoYWN0aXZlU2xpZGU/OiBIVE1MRWxlbWVudCkge1xyXG4gICAgLy8gVXBkYXRlIHNsaWRlIGVsZW1lbnQgQ1NTXHJcbiAgICB0aGlzLl9hZGRTbGlkZXNXaWR0aCgpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBzbGlkZXIgaW5zdGFuY2UgdG8gZ2V0IHRoZSBjb3JyZWN0IGVsZW1lbnRzXHJcbiAgICB0aGlzLl9nZXRBY3RpdmVBbmRWaXNpYmxlKGFjdGl2ZVNsaWRlIHx8IG51bGwpO1xyXG5cclxuICAgIC8vIEFkZCBtYWluIHNsaWRlciBjbGFzcyBpZiBpdCBkb2Vzbid0IGhhdmUgaXQgYWxyZWFkeVxyXG4gICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCh0aGlzLl9zbGlkZXJDbGFzcyk7XHJcblxyXG4gICAgLy8gUmVzZXQgdGhlIG1vcmUgZHluYW1pYyBDU1MgZmlyc3QgaWYgaXQgZXhpc3RzXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9hY3RpdmVDbGFzcyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fdmlzaWJsZUNsYXNzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFkZCBpbiBhY3RpdmUgY2xhc3Nlc1xyXG4gICAgdGhpcy5hY3RpdmVTbGlkZS5jbGFzc0xpc3QuYWRkKHRoaXMuX2FjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAvLyBBZGQgaW4gdmlzaWJsZSBjbGFzc2VzXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy52aXNpYmxlU2xpZGVzLCBzbGlkZSA9PiB7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQodGhpcy5fdmlzaWJsZUNsYXNzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFRyaWdnZXIgZG90IHVwZGF0ZVxyXG4gICAgdGhpcy5fdXBkYXRlRG90cyh0aGlzLmFjdGl2ZVNsaWRlKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgYWxsIGExMXkgZnVuY3Rpb25hbGl0eVxyXG4gICAgdGhpcy5fdXBkYXRlQTExWSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gUmVtb3ZlIGFsbCBDU1MgbmVlZGVkIGZvciB0aGUgc2xpZGVyLiBTaG91bGQgbWlycm9yIF9zZXRDU1MoKVxyXG4gIHByaXZhdGUgX3JlbW92ZUNTUygpIHtcclxuICAgIC8vIFJlbW92ZSBpdGVtIENTUyBpZiBpdCB3YXMgc2V0XHJcbiAgICB0aGlzLl9yZW1vdmVTbGlkZXNXaWR0aCgpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBjbGFzcyB0byBzbGlkZXJcclxuICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2xpZGVyQ2xhc3MpO1xyXG5cclxuICAgIC8vIFJlc2V0IGFsbCB0aGUgZHluYW1pYyBjbGFzc2VzXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9hY3RpdmVDbGFzcyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fdmlzaWJsZUNsYXNzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJlbW92ZSBhbGwgYTExeSBmdW5jdGlvbmFsaXR5XHJcbiAgICB0aGlzLl9yZW1vdmVBMTFZKCk7XHJcbiAgfVxyXG5cclxuICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBicmVha3BvaW50c1xyXG4gIHByaXZhdGUgX2NoZWNrUmVzcG9uc2l2ZSgpIHtcclxuICAgIGlmICghaXNPYmplY3QodGhpcy5vcHRpb25zLnJlc3BvbnNpdmUpKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgeyByZXNwb25zaXZlLCAuLi5pbml0aWFsT3B0aW9ucyB9ID0gdGhpcy5vcHRpb25zO1xyXG4gICAgY29uc3QgYnJlYWtwb2ludHM6IEFycmF5PHsgbXFsOiBNZWRpYVF1ZXJ5TGlzdDsgb3B0aW9uczogT3B0aW9ucyB9PiA9IFtdO1xyXG5cclxuICAgIC8vIFNvcnQgbWVkaWEgcXVlcmllcyBmcm9tIGxvd2VzdCB0byBoaWdoZXN0XHJcbiAgICBjb25zdCByZXNwb25zaXZlT3B0aW9ucyA9IE9iamVjdC5lbnRyaWVzKFxyXG4gICAgICB0aGlzLm9wdGlvbnMucmVzcG9uc2l2ZSBhcyBvYmplY3RcclxuICAgICkuc29ydCgoYSwgYikgPT4gYVsxXSAtIGJbMV0pO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIG5ldyBKUyBtZWRpYSBxdWVyeSBmb3IgaW5pdGlhbCBvcHRpb25zIGZvciB0aGUgbG93ZXN0IE1RIGFuZCBkb3duXHJcbiAgICBicmVha3BvaW50cy5wdXNoKHtcclxuICAgICAgbXFsOiB3aW5kb3cubWF0Y2hNZWRpYShcclxuICAgICAgICBgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke1xyXG4gICAgICAgICAgTnVtYmVyLnBhcnNlSW50KHJlc3BvbnNpdmVPcHRpb25zWzBdWzBdKSAtIDFcclxuICAgICAgICB9cHgpYFxyXG4gICAgICApLFxyXG4gICAgICBvcHRpb25zOiBpbml0aWFsT3B0aW9ucyBhcyBPcHRpb25zXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBMb29wIHRocm91Z2ggYWxsIHJlc3BvbnNpdmUgb2JqZWN0cyBhbmQgZ2VuZXJhdGUgYSBKUyBtZWRpYSBxdWVyeVxyXG4gICAgcmVzcG9uc2l2ZU9wdGlvbnMuZm9yRWFjaChcclxuICAgICAgKFticmVha3BvaW50LCBicmVha3BvaW50T3B0aW9uc106IFtzdHJpbmcsIE9wdGlvbnNdLCBpKSA9PiB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IE9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucyB9O1xyXG4gICAgICAgIGxldCBtcWxTdHJpbmcgPSBgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke2JyZWFrcG9pbnR9cHgpYDtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG1vcmUgbWVkaWEgcXVlcmllcyBhZnRlciB0aGlzIHRoZW4gY3JlYXRlIGEgc3RvcHBpbmcgcG9pbnRcclxuICAgICAgICBpZiAoaSAhPT0gcmVzcG9uc2l2ZU9wdGlvbnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgbXFsU3RyaW5nID0gbXFsU3RyaW5nLmNvbmNhdChcclxuICAgICAgICAgICAgYCBhbmQgKG1heC13aWR0aDogJHtcclxuICAgICAgICAgICAgICBOdW1iZXIucGFyc2VJbnQocmVzcG9uc2l2ZU9wdGlvbnNbaSArIDFdWzBdKSAtIDFcclxuICAgICAgICAgICAgfXB4KWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBsYXllciBjYWtlIG9mIG9wdGlvbnMgZnJvbSB0aGUgbG93ZXN0IGJyZWFrcG9pbnQgdG8gdGhlIGhpZ2hlc3RcclxuICAgICAgICBicmVha3BvaW50cy5mb3JFYWNoKGJyZWFrcG9pbnQgPT4ge1xyXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCBicmVha3BvaW50Lm9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgdGhpcyBzcGVjaWZpYyBicmVha3BvaW50IHRvIHRoZSB0b3Agb2YgdGhlIGNha2Ug8J+OglxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgYnJlYWtwb2ludE9wdGlvbnMpO1xyXG5cclxuICAgICAgICBicmVha3BvaW50cy5wdXNoKHtcclxuICAgICAgICAgIG1xbDogd2luZG93Lm1hdGNoTWVkaWEobXFsU3RyaW5nKSxcclxuICAgICAgICAgIG9wdGlvbnNcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBGb3IgZWFjaCBKUyBtZWRpYSBxdWVyeSBhZGQgYW4gZXZlbnQgbGlzdGVuZXJcclxuICAgIGJyZWFrcG9pbnRzLm1hcChicmVha3BvaW50ID0+IHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIFRoaXMgc2hvdWxkIGluIHRoZW9yeSBiZSBydW5uaW5nIGF0IHRoZSBpbml0aWFsaXphdGlvblxyXG4gICAgICAgKiBzbyBtYWtlIHN1cmUgdGhlIGNvcnJlY3Qgb3B0aW9ucyBhcmUgc2V0LlxyXG4gICAgICAgKi9cclxuICAgICAgaWYgKGJyZWFrcG9pbnQubXFsLm1hdGNoZXMpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucywgYnJlYWtwb2ludC5vcHRpb25zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ3JlYXRlcyBhIG1lZGlhIHF1ZXJ5IGxpc3RlbmVyXHJcbiAgICAgIGJyZWFrcG9pbnQubXFsLmFkZExpc3RlbmVyKCgpID0+IHtcclxuICAgICAgICBpZiAoYnJlYWtwb2ludC5tcWwubWF0Y2hlcykge1xyXG4gICAgICAgICAgLy8gVXBkYXRlIHNsaWRlciB3aXRoIG5ldyBvcHRpb25zXHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoYnJlYWtwb2ludC5vcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBJZiBzbGlkZXNUb1Nob3cgaXMgdXNlZCB0aGVuIG1hbnVhbGx5IGFkZCBzbGlkZSB3aWR0aHNcclxuICBwcml2YXRlIF9hZGRTbGlkZXNXaWR0aCgpIHtcclxuICAgIGlmIChpc0ludGVnZXIodGhpcy5vcHRpb25zLnNsaWRlc1RvU2hvdykpIHtcclxuICAgICAgLy8gUGVyY2VudGFnZSB3aWR0aCBvZiBlYWNoIHNsaWRlXHJcbiAgICAgIGNvbnN0IHNsaWRlV2lkdGggPSAxMDAgLyAodGhpcy5vcHRpb25zLnNsaWRlc1RvU2hvdyBhcyBudW1iZXIpO1xyXG5cclxuICAgICAgLy8gU2V0IHN0eWxlcyBmb3Igc2xpZGVyXHJcbiAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblxyXG4gICAgICAvLyBTZXQgc3R5bGVzIGZvciBpdGVtc1xyXG4gICAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgICBzbGlkZS5zdHlsZS53aWR0aCA9IGAke3NsaWRlV2lkdGh9JWA7XHJcbiAgICAgICAgc2xpZGUuc3R5bGUuZmxleCA9ICcwIDAgYXV0byc7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gUmVzZXQgZXZlcnl0aGluZyBpZiBudW1iZXIgb2YgaXRlbXMgbm90IGV4cGxpY2l0bHkgc2V0XHJcbiAgICAgIHRoaXMuX3JlbW92ZVNsaWRlc1dpZHRoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBSZXNldCBzbGlkZSBzdHlsaW5nIGV2ZW4gaWYgZXhwbGljaXRseSBzZXQgaW4gdGhlIG9wdGlvbnNcclxuICBwcml2YXRlIF9yZW1vdmVTbGlkZXNXaWR0aCgpIHtcclxuICAgIHRoaXMuc2xpZGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdkaXNwbGF5Jyk7XHJcblxyXG4gICAgZXZlcnlFbGVtZW50KHRoaXMuc2xpZGVzLCBzbGlkZSA9PiB7XHJcbiAgICAgIHNsaWRlLnN0eWxlLnJlbW92ZVByb3BlcnR5KCd3aWR0aCcpO1xyXG4gICAgICBzbGlkZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnZmxleCcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGUgYWxsIGFzc29jaWF0ZWQgYTExeSBmdW5jdGlvbmFsaXR5LiBTaG91bGQgbWlycm9yIF9yZW1vdmVBMTFZKClcclxuICBwcml2YXRlIF91cGRhdGVBMTFZKCkge1xyXG4gICAgLy8gUmVzZXQgYWxsIGExMXkgZnVuY3Rpb25hbGl0eSB0byBkZWZhdWx0IGJlZm9yZWhhbmRcclxuICAgIHRoaXMuX3JlbW92ZUExMVkoKTtcclxuXHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgY29uc3QgZm9jdXNhYmxlSXRlbXMgPSBzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzYWJsZSk7XHJcblxyXG4gICAgICAvLyBJZiBzbGlkZSBpcyBub3QgdmlzaWJsZSBtYWtlIHRoZSBzbGlkZSB3cmFwcGVyIG5vdCBmb2N1c2FibGVcclxuICAgICAgaWYgKCFzbGlkZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5fdmlzaWJsZUNsYXNzKSkge1xyXG4gICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcclxuICAgICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXZlcnlFbGVtZW50KGZvY3VzYWJsZUl0ZW1zLCBmb2N1c2FibGVJdGVtID0+IHtcclxuICAgICAgICBpZiAoIXNsaWRlLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLl92aXNpYmxlQ2xhc3MpKSB7XHJcbiAgICAgICAgICBmb2N1c2FibGVJdGVtLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQnV0dG9ucyB3aWxsIGFkZCBkaXNhYmxlZCBzdGF0ZSBpZiBmaXJzdC9sYXN0IHNsaWRlXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xyXG4gICAgICBjb25zdCBmaXJzdFNsaWRlID0gdGhpcy5zbGlkZXIuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGNvbnN0IGxhc3RTbGlkZSA9IHRoaXMuc2xpZGVyLmxhc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGNvbnN0IGZpcnN0VmlzaWJsZVNsaWRlID0gdGhpcy52aXNpYmxlU2xpZGVzWzBdO1xyXG4gICAgICBjb25zdCBsYXN0VmlzaWJsZVNsaWRlID1cclxuICAgICAgICB0aGlzLnZpc2libGVTbGlkZXNbdGhpcy52aXNpYmxlU2xpZGVzLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgICAgLy8gSWYgY3VycmVudCBhY3RpdmUgc2xpZGUgaXMgdGhlIGZpcnN0IGVsZW1lbnQgdGhlbiBkaXNhYmxlIHByZXZcclxuICAgICAgaWYgKGZpcnN0VmlzaWJsZVNsaWRlID09PSBmaXJzdFNsaWRlKSB7XHJcbiAgICAgICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2QXJyb3csIHByZXZBcnJvdyA9PiB7XHJcbiAgICAgICAgICBwcmV2QXJyb3cuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgY3VycmVudCBhY3RpdmUgc2xpZGUgaXMgdGhlIGxhc3QgZWxlbWVudCB0aGVuIGRpc2FibGUgbmV4dFxyXG4gICAgICBpZiAobGFzdFZpc2libGVTbGlkZSA9PT0gbGFzdFNsaWRlKSB7XHJcbiAgICAgICAgZXZlcnlFbGVtZW50KHRoaXMub3B0aW9ucy5uZXh0QXJyb3csIG5leHRBcnJvdyA9PiB7XHJcbiAgICAgICAgICBuZXh0QXJyb3cuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gUmVzZXQgYWxsIGFzc29jaWF0ZWQgYTExeSBmdW5jdGlvbmFsaXR5LiBTaG91bGQgbWlycm9yIF91cGRhdGVBMTFZKClcclxuICBwcml2YXRlIF9yZW1vdmVBMTFZKCkge1xyXG4gICAgZXZlcnlFbGVtZW50KHRoaXMuc2xpZGVzLCBzbGlkZSA9PiB7XHJcbiAgICAgIGNvbnN0IGZvY3VzYWJsZUl0ZW1zID0gc2xpZGUucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9mb2N1c2FibGUpO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIGExMXkgZm9yIGVhY2ggc2xpZGUgd3JhcHBlclxyXG4gICAgICBzbGlkZS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XHJcbiAgICAgIHNsaWRlLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcclxuXHJcbiAgICAgIC8vIFJlc2V0IGExMXkgYXR0cmlidXRlcyBmb3Igc2xpZGUgaW5uZXIgZWxlbWVudHNcclxuICAgICAgZXZlcnlFbGVtZW50KGZvY3VzYWJsZUl0ZW1zLCBmb2N1c2FibGVJdGVtID0+IHtcclxuICAgICAgICBmb2N1c2FibGVJdGVtLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBCdXR0b25zIGNvdWxkIHBvdGVudGlhbGx5IGhhdmUgZGlzYWJsZWQgc3RhdGUgc28gcmVtb3ZpbmdcclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMucHJldkFycm93LCBwcmV2QXJyb3cgPT5cclxuICAgICAgcHJldkFycm93LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG4gICAgKTtcclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLm9wdGlvbnMubmV4dEFycm93LCBuZXh0QXJyb3cgPT5cclxuICAgICAgbmV4dEFycm93LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FkZFNraXBCdG4oKSB7XHJcbiAgICBjb25zdCBiZWZvcmVFbCA9IGNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgIGA8YnV0dG9uIGNsYXNzPVwiYTExeS1zbGlkZXItc3Itb25seVwiIHR5cGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIj5DbGljayB0byBza2lwIHNsaWRlciBjYXJvdXNlbDwvYnV0dG9uPmBcclxuICAgICk7XHJcbiAgICBjb25zdCBhZnRlckVsID0gY3JlYXRlRWxlbWVudChcclxuICAgICAgYDxkaXYgY2xhc3M9XCJhMTF5LXNsaWRlci1zci1vbmx5XCIgdGFiaW5kZXg9XCItMVwiPkVuZCBvZiBzbGlkZXIgY2Fyb3VzZWw8L2Rpdj5gXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEV2ZW50IGhhbmRsZXIgdG8gZ28gdG8gZW5kXHJcbiAgICBjb25zdCBmb2N1c0VuZCA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGExMXlDbGljayhldmVudCkgPT09IHRydWUpIGFmdGVyRWwuZm9jdXMoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgYmVmb3JlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb2N1c0VuZCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgYmVmb3JlRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmb2N1c0VuZCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG5cclxuICAgIC8vIEFkZCB0byBET01cclxuICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBiZWZvcmVFbCk7XHJcbiAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgYWZ0ZXJFbCk7XHJcblxyXG4gICAgLy8gSWYgc2tpcCBidXR0b25zIGV4aXN0IGZvciB3aGF0ZXZlciByZWFzb24sIGVtcHR5IGFycmF5XHJcbiAgICB0aGlzLl9za2lwQnRucyA9IFtdO1xyXG5cclxuICAgIC8vIEFkZCBuZXdseSBjcmVhdGVkIGJ1dHRvbnMgdG8gbGlicmFyeSBzY29wZVxyXG4gICAgdGhpcy5fc2tpcEJ0bnMucHVzaChiZWZvcmVFbCwgYWZ0ZXJFbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZW1vdmVTa2lwQnRuKCkge1xyXG4gICAgY29uc3QgZWxlbWVudHMgPSBbXHJcbiAgICAgIC4uLmdldFByZXZpb3VzU2libGluZ3ModGhpcy5zbGlkZXIpLFxyXG4gICAgICAuLi5nZXROZXh0U2libGluZ3ModGhpcy5zbGlkZXIpXHJcbiAgICBdO1xyXG5cclxuICAgIGV2ZXJ5RWxlbWVudCh0aGlzLl9za2lwQnRucywgc2tpcEJ0biA9PiB7XHJcbiAgICAgIHNraXBCdG4ucGFyZW50Tm9kZSAmJiBza2lwQnRuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2tpcEJ0bik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBldmVyeUVsZW1lbnQoZWxlbWVudHMsIGVsZW1lbnQgPT4ge1xyXG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2ExMXktc2xpZGVyLXNyLW9ubHknKSkge1xyXG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZSAmJiBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2VuZXJhdGVEb3RzKCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kb3RzID09PSBmYWxzZSkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJlbW92ZSBkb3RzIGlmIHRoZXkgYWxyZWFkeSBleGlzdFxyXG4gICAgdGhpcy5fcmVtb3ZlRG90cygpO1xyXG5cclxuICAgIC8vIFN0b3AgaWYgc2xpZGVyIGlzIGRpc2FibGVkXHJcbiAgICBpZiAodGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5EaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIENyZWF0ZSA8dWw+IHdyYXBwZXIgZm9yIGRvdHNcclxuICAgIHRoaXMuZG90cyA9IGNyZWF0ZUVsZW1lbnQoYDx1bCBjbGFzcz1cIiR7dGhpcy5fZG90c0NsYXNzfVwiPjwvdWw+YCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9nZXREb3RDb3VudCgpOyBpKyspIHtcclxuICAgICAgY29uc3QgZG90TGkgPSBjcmVhdGVFbGVtZW50KCc8bGk+PC9saT4nKTtcclxuICAgICAgbGV0IGRvdEJ0bjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmN1c3RvbVBhZ2luZykge1xyXG4gICAgICAgIGRvdEJ0biA9IGNyZWF0ZUVsZW1lbnQodGhpcy5vcHRpb25zLmN1c3RvbVBhZ2luZyhpLCB0aGlzKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG90QnRuID0gY3JlYXRlRWxlbWVudCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+Jyk7XHJcbiAgICAgICAgZG90QnRuLnRleHRDb250ZW50ID0gYE1vdmUgc2xpZGVyIHRvIGl0ZW0gIyR7aSArIDF9YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRXZlbnQgaGFuZGxlcnMgdG8gc3dpdGNoIHRvIHNsaWRlXHJcbiAgICAgIGNvbnN0IHN3aXRjaFRvU2xpZGUgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGExMXlDbGljayhldmVudCkgPT09IHRydWUpIHtcclxuICAgICAgICAgIC8vIEdvIHRvIHNsaWRlXHJcbiAgICAgICAgICB0aGlzLnNjcm9sbFRvU2xpZGUodGhpcy5zbGlkZXNbaV0pO1xyXG5cclxuICAgICAgICAgIC8vIERpc2FibGUgYXV0b3BsYXkgaWYgZW5hYmxlZFxyXG4gICAgICAgICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICBkb3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hUb1NsaWRlLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgIGRvdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHN3aXRjaFRvU2xpZGUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgIC8vIEFwcGVuZCB0byBVTFxyXG4gICAgICBkb3RMaS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRvdEJ0bik7XHJcbiAgICAgIHRoaXMuZG90cy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRvdExpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgc3R5bGVzIG9mIGRvdHMgYmVmb3JlIGFkZGluZyB0byBET01cclxuICAgIHRoaXMuX3VwZGF0ZURvdHModGhpcy5hY3RpdmVTbGlkZSk7XHJcblxyXG4gICAgLy8gQWRkIGRvdHMgVUwgdG8gRE9NXHJcbiAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgdGhpcy5kb3RzKTtcclxuXHJcbiAgICAvLyBEb3RzIG5lZWRlZCBtYXkgY2hhbmdlIG9uIHNjcmVlbiBzaXplIHNvIHJlZ2VuZXJhdGUgdGhlbSBmcm9tIHNjcmF0Y2hcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9nZW5lcmF0ZURvdHNEZWJvdW5jZWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0RG90Q291bnQoKSB7XHJcbiAgICBsZXQgdG90YWxTbGlkZXM6IG51bWJlciA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcclxuICAgIGxldCBzbGlkZXNUb1Nob3c6IG51bWJlciA9XHJcbiAgICAgIHRoaXMub3B0aW9ucy5zbGlkZXNUb1Nob3cgfHwgdGhpcy52aXNpYmxlU2xpZGVzLmxlbmd0aCB8fCAxO1xyXG4gICAgbGV0IGRvdHM6IG51bWJlciA9IHRvdGFsU2xpZGVzIC0gc2xpZGVzVG9TaG93ICsgMTtcclxuXHJcbiAgICByZXR1cm4gZG90cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlbW92ZURvdHMoKSB7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fZ2VuZXJhdGVEb3RzRGVib3VuY2VkKTtcclxuXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IGdldE5leHRTaWJsaW5ncyh0aGlzLnNsaWRlcik7XHJcblxyXG4gICAgaWYgKHRoaXMuZG90cyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuZG90cy5wYXJlbnROb2RlICYmIHRoaXMuZG90cy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZG90cyk7XHJcbiAgICB9XHJcblxyXG4gICAgZXZlcnlFbGVtZW50KGVsZW1lbnRzLCBlbGVtZW50ID0+IHtcclxuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuX2RvdHNDbGFzcykpIHtcclxuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUgJiYgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZURvdHMoYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBpZiAodGhpcy5kb3RzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChcclxuICAgICAgICBhY3RpdmVTbGlkZS5wYXJlbnROb2RlICYmIGFjdGl2ZVNsaWRlLnBhcmVudE5vZGUuY2hpbGRyZW4sXHJcbiAgICAgICAgYWN0aXZlU2xpZGVcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIFNldCBkb3QgdG8gbGFzdCBpdGVtIGlmIGFjdGl2ZSBpbmRleCBpcyBoaWdoZXIgdGhhbiBhbW91bnRcclxuICAgICAgaWYgKGFjdGl2ZUluZGV4ID4gdGhpcy5kb3RzLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIGFjdGl2ZUluZGV4ID0gdGhpcy5kb3RzLmNoaWxkcmVuLmxlbmd0aCAtIDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlc2V0IGNoaWxkcmVuIGFjdGl2ZSBjbGFzcyBpZiBleGlzdFxyXG4gICAgICBldmVyeUVsZW1lbnQodGhpcy5kb3RzLmNoaWxkcmVuLCBkb3QgPT5cclxuICAgICAgICBkb3QucXVlcnlTZWxlY3RvcignYnV0dG9uJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBBZGQgY2xhc3MgdG8gYWN0aXZlIGRvdFxyXG4gICAgICB0aGlzLmRvdHMuY2hpbGRyZW5bYWN0aXZlSW5kZXhdXHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpXHJcbiAgICAgICAgPy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2VuYWJsZUF1dG9wbGF5KCkge1xyXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgYXV0b3BsYXlcclxuICAgIHRoaXMuYXV0b3BsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBdXRvcGxheSwge1xyXG4gICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuYXV0b3BsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVBdXRvcGxheSwge1xyXG4gICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQXV0b3BsYXlFdmVudCwge1xyXG4gICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9oYW5kbGVBdXRvcGxheUV2ZW50LCB7XHJcbiAgICAgIHBhc3NpdmU6IHRydWVcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b3BsYXlIb3ZlclBhdXNlKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9oYW5kbGVBdXRvcGxheUhvdmVyLCB7XHJcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX2hhbmRsZUF1dG9wbGF5SG92ZXIsIHtcclxuICAgICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBhdXRvcGxheSB0b2dnbGUgYnV0dG9uIHRvIERPTVxyXG4gICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRoaXMuYXV0b3BsYXlCdG4pO1xyXG5cclxuICAgIC8vIFN0YXJ0IGF1dG9wbGF5aW5nXHJcbiAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5FbmFibGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGlzYWJsZUF1dG9wbGF5KCkge1xyXG4gICAgLy8gU3RvcCBhdXRvcGxheWluZ1xyXG4gICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmb3IgYXV0b3BsYXlcclxuICAgIHRoaXMuYXV0b3BsYXlCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBdXRvcGxheSk7XHJcbiAgICB0aGlzLmF1dG9wbGF5QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5faGFuZGxlQXV0b3BsYXkpO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBdXRvcGxheUV2ZW50KTtcclxuICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9oYW5kbGVBdXRvcGxheUV2ZW50KTtcclxuICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9oYW5kbGVBdXRvcGxheUhvdmVyKTtcclxuICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9oYW5kbGVBdXRvcGxheUhvdmVyKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgdG9nZ2xlIGJ1dHRvbiBmcm9tIERPTVxyXG4gICAgdGhpcy5hdXRvcGxheUJ0bi5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZCh0aGlzLmF1dG9wbGF5QnRuKTtcclxuICB9XHJcblxyXG4gIC8vIFJlZmVyZW5jZWQgaHR0cHM6Ly9jb2RlcGVuLmlvL2ZyZWRlcmljcm91cy9wZW4veHhWWEpZWFxyXG4gIHByaXZhdGUgX2VuYWJsZVN3aXBlKCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zd2lwZSkge1xyXG4gICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9zd2lwZU1vdXNlRG93bik7XHJcbiAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9zd2lwZU1vdXNlVXApO1xyXG4gICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fc3dpcGVNb3VzZVVwKTtcclxuICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fc3dpcGVNb3VzZU1vdmUpO1xyXG4gICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fc3dpcGVUb3VjaFN0YXJ0KTtcclxuICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9zd2lwZVRvdWNoRW5kKTtcclxuICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fc3dpcGVUb3VjaE1vdmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc3dpcGVNb3VzZURvd24oZTogTW91c2VFdmVudCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xyXG4gICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnYTExeS1zbGlkZXItc2Nyb2xsaW5nJyk7XHJcbiAgICB0aGlzLnN3aXBlU3RhcnRYID0gZS5wYWdlWCAtIHRoaXMuc2xpZGVyLm9mZnNldExlZnQ7XHJcbiAgICB0aGlzLnN3aXBlWCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgICB0aGlzLnN3aXBlWENhY2hlZCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zd2lwZU1vdXNlVXAoKSB7XHJcbiAgICBpZiAoIXRoaXMubW91c2VEb3duKSByZXR1cm47XHJcblxyXG4gICAgLy8gSWYgdGhlIG1vdmVkIHNsaWRlciBvZmZzZXQgaXMgd2l0aGluIDEgcGl4ZWwgaXQgd2lsbCBub3QgdHJpZ2dlciBhIG1vdmVcclxuICAgIGNvbnN0IGluUmFuZ2UgPVxyXG4gICAgICAodGhpcy5zd2lwZVhDYWNoZWQgLSAodGhpcy5zd2lwZVggLSAxKSkgKlxyXG4gICAgICAgICh0aGlzLnN3aXBlWENhY2hlZCAtICh0aGlzLnN3aXBlWCArIDEpKSA8PVxyXG4gICAgICAwO1xyXG5cclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhMTF5LXNsaWRlci1zY3JvbGxpbmcnKTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2Rlcm5Ccm93c2VyKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLnNjcm9sbCh7XHJcbiAgICAgICAgbGVmdDogaW5SYW5nZSA/IHRoaXMuc3dpcGVYQ2FjaGVkIDogdGhpcy5zd2lwZVhDYWNoZWQgLSAxLFxyXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N3aXBlTW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5tb3VzZURvd24pIHJldHVybjtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCBzY3JvbGxTcGVlZCA9IDI7XHJcbiAgICBjb25zdCB4ID0gZS5wYWdlWCAtIHRoaXMuc2xpZGVyLm9mZnNldExlZnQ7XHJcbiAgICBjb25zdCB3YWxrID0gKHggLSB0aGlzLnN3aXBlU3RhcnRYKSAqIHNjcm9sbFNwZWVkO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgPSB0aGlzLnN3aXBlWCAtIHdhbGs7XHJcbiAgICAvLyBTYWZhcmkgaGFzIGEgYnVnIHdoZXJlIGl0IGRvZXNuJ3Qgc2F2ZSB2YWx1ZXMgcHJvcGVybHkgc28gY2FjaGluZyBpdCBmb3IgdXNlIGxhdGVyXHJcbiAgICB0aGlzLnN3aXBlWENhY2hlZCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zd2lwZVRvdWNoU3RhcnQoZTogVG91Y2hFdmVudCkge1xyXG4gICAgdGhpcy50b3VjaFN0YXJ0ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ2ExMXktc2xpZGVyLXNjcm9sbGluZycpO1xyXG4gICAgdGhpcy5zd2lwZVN0YXJ0WCA9IGUudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuc2xpZGVyLm9mZnNldExlZnQ7XHJcbiAgICB0aGlzLnN3aXBlWCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgICB0aGlzLnN3aXBlWENhY2hlZCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zd2lwZVRvdWNoRW5kKCkge1xyXG4gICAgaWYgKCF0aGlzLnRvdWNoU3RhcnQpIHJldHVybjtcclxuXHJcbiAgICAvLyBJZiB0aGUgbW92ZWQgc2xpZGVyIG9mZnNldCBpcyB3aXRoaW4gMSBwaXhlbCBpdCB3aWxsIG5vdCB0cmlnZ2VyIGEgbW92ZVxyXG4gICAgY29uc3QgaW5SYW5nZSA9XHJcbiAgICAgICh0aGlzLnN3aXBlWENhY2hlZCAtICh0aGlzLnN3aXBlWCAtIDEpKSAqXHJcbiAgICAgICAgKHRoaXMuc3dpcGVYQ2FjaGVkIC0gKHRoaXMuc3dpcGVYICsgMSkpIDw9XHJcbiAgICAgIDA7XHJcblxyXG4gICAgdGhpcy50b3VjaFN0YXJ0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhMTF5LXNsaWRlci1zY3JvbGxpbmcnKTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2Rlcm5Ccm93c2VyKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLnNjcm9sbCh7XHJcbiAgICAgICAgbGVmdDogaW5SYW5nZSA/IHRoaXMuc3dpcGVYQ2FjaGVkIDogdGhpcy5zd2lwZVhDYWNoZWQgLSAxLFxyXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N3aXBlVG91Y2hNb3ZlKGU6IFRvdWNoRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy50b3VjaFN0YXJ0KSByZXR1cm47XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsU3BlZWQgPSAyO1xyXG4gICAgY29uc3QgeCA9IGUudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuc2xpZGVyLm9mZnNldExlZnQ7XHJcbiAgICBjb25zdCB3YWxrID0gKHggLSB0aGlzLnN3aXBlU3RhcnRYKSAqIHNjcm9sbFNwZWVkO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgPSB0aGlzLnN3aXBlWCAtIHdhbGs7XHJcbiAgICAvLyBTYWZhcmkgaGFzIGEgYnVnIHdoZXJlIGl0IGRvZXNuJ3Qgc2F2ZSB2YWx1ZXMgcHJvcGVybHkgc28gY2FjaGluZyBpdCBmb3IgdXNlIGxhdGVyXHJcbiAgICB0aGlzLnN3aXBlWENhY2hlZCA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kaXNhYmxlU3dpcGUoKSB7XHJcbiAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9zd2lwZU1vdXNlRG93bik7XHJcbiAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fc3dpcGVNb3VzZVVwKTtcclxuICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9zd2lwZU1vdXNlVXApO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fc3dpcGVNb3VzZU1vdmUpO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX3N3aXBlVG91Y2hTdGFydCk7XHJcbiAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX3N3aXBlVG91Y2hFbmQpO1xyXG4gICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fc3dpcGVUb3VjaE1vdmUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdG9nZ2xlQXV0b3BsYXkoc2V0U3RhdGU6IEF1dG9wbGF5U3dpdGNoKSB7XHJcbiAgICBjb25zdCBzdGFydEF1dG9wbGF5aW5nID0gKCkgPT4ge1xyXG4gICAgICAvLyBTdGFydCBhdXRvcGxheWluZ1xyXG4gICAgICB0aGlzLl9hdXRvcGxheVRpbWVyID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9nb1ByZXZPck5leHQoU2xpZGVEaXJlY3Rpb24uTmV4dCk7XHJcbiAgICAgIH0sIHRoaXMub3B0aW9ucy5hdXRvcGxheVNwZWVkKTtcclxuXHJcbiAgICAgIC8vIFNldCBhdXRvcGxheSBidXR0b24gc3RhdGVcclxuICAgICAgdGhpcy5hdXRvcGxheUJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYXV0b3BsYXlpbmcnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50XHJcbiAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2F1dG9wbGF5U3RhcnQnLCB7XHJcbiAgICAgICAgY3VycmVudFNsaWRlOiB0aGlzLmFjdGl2ZVNsaWRlLFxyXG4gICAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHN0b3BBdXRvcGxheWluZyA9ICgpID0+IHtcclxuICAgICAgLy8gU3RvcCBhdXRvcGxheWluZ1xyXG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLl9hdXRvcGxheVRpbWVyKTtcclxuXHJcbiAgICAgIC8vIFJlc2V0IGF1dG9wbGF5IHRpbWVyXHJcbiAgICAgIHRoaXMuX2F1dG9wbGF5VGltZXIgPSBJc0F1dG9wbGF5aW5nLk5vO1xyXG5cclxuICAgICAgLy8gU2V0IGF1dG9wbGF5IGJ1dHRvbiBzdGF0ZVxyXG4gICAgICB0aGlzLmF1dG9wbGF5QnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1hdXRvcGxheWluZycsICdmYWxzZScpO1xyXG5cclxuICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50XHJcbiAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2F1dG9wbGF5U3RvcCcsIHtcclxuICAgICAgICBjdXJyZW50U2xpZGU6IHRoaXMuYWN0aXZlU2xpZGUsXHJcbiAgICAgICAgYTExeVNsaWRlcjogdGhpc1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHNldFN0YXRlID09PSBBdXRvcGxheVN3aXRjaC5FbmFibGUpIHtcclxuICAgICAgc3RhcnRBdXRvcGxheWluZygpO1xyXG4gICAgfSBlbHNlIGlmIChzZXRTdGF0ZSA9PT0gQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSkge1xyXG4gICAgICBzdG9wQXV0b3BsYXlpbmcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dvUHJldk9yTmV4dChkaXJlY3Rpb246IFNsaWRlRGlyZWN0aW9uKSB7XHJcbiAgICB0aGlzLl9nZXRBY3RpdmVBbmRWaXNpYmxlKFxyXG4gICAgICBudWxsLFxyXG4gICAgICAodmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSwgYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlyc3RTbGlkZSA9IHRoaXMuc2xpZGVyLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGxhc3RTbGlkZSA9IHRoaXMuc2xpZGVyLmxhc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgZmlyc3RWaXNpYmxlU2xpZGUgPSB2aXNpYmxlU2xpZGVzWzBdO1xyXG4gICAgICAgIGNvbnN0IGxhc3RWaXNpYmxlU2xpZGUgPSB2aXNpYmxlU2xpZGVzW3Zpc2libGVTbGlkZXMubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFNsaWRlRGlyZWN0aW9uLk5leHQpIHtcclxuICAgICAgICAgIC8vIFdyYXAgdG8gdGhlIGZpcnN0IHNsaWRlIGlmIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgbGFzdFxyXG4gICAgICAgICAgaWYgKGxhc3RWaXNpYmxlU2xpZGUgPT09IGxhc3RTbGlkZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUgJiYgdGhpcy5zY3JvbGxUb1NsaWRlKGZpcnN0U2xpZGUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NsaWRlKFxyXG4gICAgICAgICAgICAgIGFjdGl2ZVNsaWRlICYmIChhY3RpdmVTbGlkZS5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFNsaWRlRGlyZWN0aW9uLlByZXYpIHtcclxuICAgICAgICAgIC8vIFdyYXAgdG8gdGhlIGxhc3Qgc2xpZGUgaWYgd2UncmUgY3VycmVudGx5IG9uIHRoZSBmaXJzdFxyXG4gICAgICAgICAgaWYgKGZpcnN0VmlzaWJsZVNsaWRlID09PSBmaXJzdFNsaWRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSAmJiB0aGlzLnNjcm9sbFRvU2xpZGUobGFzdFNsaWRlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9TbGlkZShcclxuICAgICAgICAgICAgICBhY3RpdmVTbGlkZSAmJiAoYWN0aXZlU2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyBzbGlkZXIgdG8gdGFyZ2V0IGVsZW1lbnRcclxuICAgKi9cclxuICBwdWJsaWMgc2Nyb2xsVG9TbGlkZSh0YXJnZXQ6IEhUTUxFbGVtZW50IHwgbnVtYmVyKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbFBvc2l0aW9uID0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdDtcclxuICAgIGxldCB0YXJnZXRTbGlkZTogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKGlzSW50ZWdlcih0YXJnZXQpKSB7XHJcbiAgICAgIHRhcmdldFNsaWRlID0gdGhpcy5zbGlkZXNbdGFyZ2V0IGFzIG51bWJlcl07XHJcbiAgICB9IGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgIHRhcmdldFNsaWRlID0gdGFyZ2V0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzY3JvbGxUb1NsaWRlIG9ubHkgYWNjZXB0cyBhbiBIVE1MRWxlbWVudCBvciBudW1iZXInKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnRcclxuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2JlZm9yZUNoYW5nZScsIHtcclxuICAgICAgY3VycmVudFNsaWRlOiB0aGlzLmFjdGl2ZVNsaWRlLFxyXG4gICAgICBuZXh0U2xpZGU6IHRhcmdldFNsaWRlLFxyXG4gICAgICBhMTF5U2xpZGVyOiB0aGlzXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBVcGRhdGUgc2xpZGVyJ3MgaGVpZ2h0IGJhc2VkIG9uIGNvbnRlbnQgb2Ygc2xpZGVcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUpIHRoaXMuX3VwZGF0ZUhlaWdodCh0YXJnZXRTbGlkZSk7XHJcblxyXG4gICAgLy8gTW92ZSBzbGlkZXIgdG8gc3BlY2lmaWMgaXRlbVxyXG4gICAgaWYgKHRoaXMubW9kZXJuQnJvd3Nlcikge1xyXG4gICAgICB0aGlzLnNsaWRlci5zY3JvbGwoe1xyXG4gICAgICAgIGxlZnQ6IHRhcmdldFNsaWRlLm9mZnNldExlZnQsXHJcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCA9IHRhcmdldFNsaWRlLm9mZnNldExlZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgdGhlIHNsaWRlciBkaWRuJ3QgbW92ZSBtYWtlIHN1cmUgdG8gdXBkYXRlIHRoZSBzbGlkZXIgc3RpbGxcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCA9PT0gb3JpZ2luYWxQb3NpdGlvbiAmJlxyXG4gICAgICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9PT0gU2xpZGVyU3RhdGUuRW5hYmxlZFxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLl9zZXRDU1ModGFyZ2V0U2xpZGUpO1xyXG4gICAgICB9XHJcbiAgICB9LCA1MCk7XHJcblxyXG4gICAgLy8gVHJpZ2dlciBkb3QgdXBkYXRlXHJcbiAgICB0aGlzLl91cGRhdGVEb3RzKHRhcmdldFNsaWRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgb3B0aW9ucyBvbiB0aGUgc2xpZGVyIGluc3RhbmNlXHJcbiAgICovXHJcbiAgcHVibGljIHVwZGF0ZU9wdGlvbnMob3B0aW9uczogT3B0aW9ucykge1xyXG4gICAgLy8gQXNzaWduIG5ldyBvcHRpb25zXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gUmUtcnVuIHRoZSBpbml0aWFsIGVuYWJsZSBzbGlkZXIgb3B0aW9uXHJcbiAgICB0aGlzLl9kaXNhYmxlU2xpZGVyKCk7XHJcbiAgICB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSWYgZWxlbWVudCBpcyBwYXNzZWQgc2xpZGVyJ3MgaGVpZ2h0IHdpbGwgbWF0Y2hcclxuICAgKiAgaXQgb3RoZXJ3aXNlIHRoZSBoZWlnaHQgb2YgdGhlIHNsaWRlciBpcyByZW1vdmVkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZUhlaWdodCh0YXJnZXQ6IEhUTUxFbGVtZW50IHwgZmFsc2UpIHtcclxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICBjb25zdCB0YXJnZXRIZWlnaHQgPSBnZXRTdWJwaXhlbFN0eWxlKHRhcmdldCwgJ2hlaWdodCcpO1xyXG4gICAgICB0aGlzLnNsaWRlci5zdHlsZS5oZWlnaHQgPSBgJHt0YXJnZXRIZWlnaHR9cHhgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogTWFudWxseSB1cGRhdGUgaGVpZ2h0IG9mIHNsaWRlciAoYmFzZWQgb2ZmIGFkYXB0aXZlSGVpZ2h0IG9wdGlvbikgKi9cclxuICBwdWJsaWMgcmVmcmVzaEhlaWdodCgpIHtcclxuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCh0aGlzLmFjdGl2ZVNsaWRlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldEFjdGl2ZUFuZFZpc2libGUoXHJcbiAgICBleHBsaWNpdEFjdGl2ZTogSFRNTEVsZW1lbnQgfCBudWxsLFxyXG4gICAgY2FsbGJhY2s/OiBBY3RpdmVWaXNpYmxlU2xpZGVzXHJcbiAgKSB7XHJcbiAgICAvKipcclxuICAgICAqIFBhcmVudCBlbGVtZW50IG5lZWRzIHRoZSBjb3JyZWN0IHN0eWxpbmcgZm9yXHJcbiAgICAgKiBjYWxjdWxhdGlvbnMgc28gYmFja2luZyB1cCB0aGUgaW5pdGlhbCBzdHlsZXNcclxuICAgICAqL1xyXG4gICAgY29uc3Qgbm9TbGlkZXJDbGFzcyA9ICF0aGlzLnNsaWRlci5jbGFzc0xpc3QuY29udGFpbnModGhpcy5fc2xpZGVyQ2xhc3MpO1xyXG4gICAgY29uc3QgYm9yZGVyU3R5bGUgPSB0aGlzLnNsaWRlci5zdHlsZS5ib3JkZXJXaWR0aDtcclxuXHJcbiAgICAvLyBBcHBseWluZyBjb3JyZWN0IHN0eWxlcyBmb3IgY2FsY3VsYXRpb25zXHJcbiAgICB0aGlzLnNsaWRlci5zdHlsZS5ib3JkZXJXaWR0aCA9ICcwcHgnO1xyXG4gICAgaWYgKG5vU2xpZGVyQ2xhc3MpIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5hZGQodGhpcy5fc2xpZGVyQ2xhc3MpO1xyXG5cclxuICAgIC8vIENhbiBzdGFydCBzdG9yaW5nIHZhcmlhYmxlcyBub3cgZm9yIGNhbGN1bGF0aW9uc1xyXG4gICAgY29uc3QgdmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG4gICAgLy8gYmV0dGVyIGNyb3NzIGJyb3dzZXIgc3VwcG9ydCBieSBnZXR0aW5nIHN1YnBpeGVscyB0aGVuIHJvdW5kaW5nXHJcbiAgICBjb25zdCBzbGlkZXJXaWR0aCA9IE1hdGgucm91bmQodGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpO1xyXG4gICAgLy8gQWRkIGEgMSBwaXhlbCBidWZmZXIgc28gdGhhdCBzdWJwaXhlbHMgYXJlIG1vcmUgY29uc2lzdGVudCBjcm9zcy1icm93c2VyXHJcbiAgICBjb25zdCBzbGlkZXJQb3NpdGlvbiA9XHJcbiAgICAgIHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgLSAxIDwgMCA/IDAgOiB0aGlzLnNsaWRlci5zY3JvbGxMZWZ0IC0gMTtcclxuXHJcbiAgICAvLyBPbmx5IGRldGVjdHMgaXRlbXMgaW4gdGhlIHZpc2libGUgdmlld3BvcnQgb2YgdGhlIHBhcmVudCBlbGVtZW50XHJcbiAgICBldmVyeUVsZW1lbnQodGhpcy5zbGlkZXMsIHNsaWRlID0+IHtcclxuICAgICAgY29uc3Qgc2xpZGVPZmZzZXQgPSBzbGlkZS5vZmZzZXRMZWZ0O1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHNsaWRlT2Zmc2V0ID49IHNsaWRlclBvc2l0aW9uICYmXHJcbiAgICAgICAgc2xpZGVPZmZzZXQgPCBzbGlkZXJQb3NpdGlvbiArIHNsaWRlcldpZHRoXHJcbiAgICAgICkge1xyXG4gICAgICAgIHZpc2libGVTbGlkZXMucHVzaChzbGlkZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFkZCBiYWNrIHRoZSBvcmlnaW5hbCBzdHlsZXNcclxuICAgIHRoaXMuc2xpZGVyLnN0eWxlLmJvcmRlcldpZHRoID0gYm9yZGVyU3R5bGU7XHJcbiAgICBpZiAobm9TbGlkZXJDbGFzcykgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zbGlkZXJDbGFzcyk7XHJcblxyXG4gICAgLy8gR2xvYmFsbHkgc2V0IHZpc2libGUgc2xpZGVzXHJcbiAgICB0aGlzLnZpc2libGVTbGlkZXMgPSB2aXNpYmxlU2xpZGVzO1xyXG5cclxuICAgIGlmIChleHBsaWNpdEFjdGl2ZSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gZXhwbGljaXRBY3RpdmU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPVxyXG4gICAgICAgIHRoaXMudmlzaWJsZVNsaWRlc1tNYXRoLmZsb29yKCh0aGlzLnZpc2libGVTbGlkZXMubGVuZ3RoIC0gMSkgLyAyKV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdmlzaWJsZVNsaWRlc1swXSA/PyB0aGlzLnNsaWRlc1swXTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh0aGlzLnZpc2libGVTbGlkZXMsIHRoaXMuYWN0aXZlU2xpZGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlUHJldihldmVudDogRXZlbnQpIHtcclxuICAgIGlmIChhMTF5Q2xpY2soZXZlbnQpID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIEdvIHRvIHByZXZpb3VzIHNsaWRlXHJcbiAgICAgIHRoaXMuX2dvUHJldk9yTmV4dChTbGlkZURpcmVjdGlvbi5QcmV2KTtcclxuXHJcbiAgICAgIC8vIERpc2FibGUgYXV0b3BsYXkgaWYgb25nb2luZ1xyXG4gICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5EaXNhYmxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZU5leHQoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICBpZiAoYTExeUNsaWNrKGV2ZW50KSA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBHbyB0byBuZXh0IHNsaWRlXHJcbiAgICAgIHRoaXMuX2dvUHJldk9yTmV4dChTbGlkZURpcmVjdGlvbi5OZXh0KTtcclxuXHJcbiAgICAgIC8vIERpc2FibGUgYXV0b3BsYXkgaWYgb25nb2luZ1xyXG4gICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5EaXNhYmxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZUF1dG9wbGF5KGV2ZW50OiBFdmVudCkge1xyXG4gICAgaWYgKGExMXlDbGljayhldmVudCkgPT09IHRydWUpIHtcclxuICAgICAgaWYgKHRoaXMuX2F1dG9wbGF5VGltZXIgPT09IElzQXV0b3BsYXlpbmcuTm8pIHtcclxuICAgICAgICB0aGlzLl90b2dnbGVBdXRvcGxheShBdXRvcGxheVN3aXRjaC5FbmFibGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUF1dG9wbGF5KEF1dG9wbGF5U3dpdGNoLkRpc2FibGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVBdXRvcGxheUhvdmVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZW50ZXInKSB7XHJcbiAgICAgIGlmICh0aGlzLl9hdXRvcGxheVRpbWVyICE9PSBJc0F1dG9wbGF5aW5nLk5vKSB7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSk7XHJcbiAgICAgICAgdGhpcy5fcGF1c2VPbk1vdXNlTGVhdmUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWxlYXZlJyAmJiB0aGlzLl9wYXVzZU9uTW91c2VMZWF2ZSkge1xyXG4gICAgICBpZiAodGhpcy5fYXV0b3BsYXlUaW1lciA9PT0gSXNBdXRvcGxheWluZy5Obykge1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUF1dG9wbGF5KEF1dG9wbGF5U3dpdGNoLkVuYWJsZSk7XHJcbiAgICAgICAgdGhpcy5fcGF1c2VPbk1vdXNlTGVhdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlQXV0b3BsYXlFdmVudChfZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICB0aGlzLl9wYXVzZU9uTW91c2VMZWF2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5fdG9nZ2xlQXV0b3BsYXkoQXV0b3BsYXlTd2l0Y2guRGlzYWJsZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVTY3JvbGwoKSB7XHJcbiAgICAvLyBUaGlzIGlzIGEgZGVib3VuY2VkIGZ1bmN0aW9uLiBXaWxsIGZpcmUgb25jZSBkb25lIHNjcm9sbGluZ1xyXG4gICAgdGhpcy5fc2Nyb2xsRmluaXNoKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zY3JvbGxGaW5pc2goKSB7XHJcbiAgICAvLyBVcGRhdGUgQ1NTXHJcbiAgICB0aGlzLl9zZXRDU1MoKTtcclxuXHJcbiAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnRcclxuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2FmdGVyQ2hhbmdlJywge1xyXG4gICAgICBjdXJyZW50U2xpZGU6IHRoaXMuYWN0aXZlU2xpZGUsXHJcbiAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGlzcGF0Y2hFdmVudChldmVudE5hbWU6IHN0cmluZywgZGV0YWlsOiBvYmplY3QpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gY3Jvc3NDdXN0b21FdmVudChldmVudE5hbWUsIHsgZGV0YWlsIH0pO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTnVrZSB0aGUgc2xpZGVyXHJcbiAgICovXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICAvLyBUT0RPOiBSZW1vdmFsIG9mIHJlc3BvbnNpdmUgZXZlbnQgbGlzdGVuZXJzIHNob3VsZCBnbyBoZXJlXHJcblxyXG4gICAgLy8gVW5kb3MgZXZlcnl0aGluZyBmcm9tIF9lbmFibGVTbGlkZXIoKVxyXG4gICAgdGhpcy5fZGlzYWJsZVNsaWRlcigpO1xyXG5cclxuICAgIC8vIFVuZG9zIGV2ZXJ5dGhpbmcgZnJvbSBpbml0KClcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZURlYm91bmNlZCk7XHJcblxyXG4gICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50XHJcbiAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdkZXN0cm95Jywge1xyXG4gICAgICBhMTF5U2xpZGVyOiB0aGlzXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImdsb2JhbCIsImNsYXNzb2YiLCJJbmRleGVkT2JqZWN0IiwiZG9jdW1lbnQiLCJERVNDUklQVE9SUyIsImNyZWF0ZUVsZW1lbnQiLCJJRThfRE9NX0RFRklORSIsInByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlIiwiZGVmaW5lUHJvcGVydHlNb2R1bGUiLCJzdG9yZSIsIldlYWtNYXAiLCJoYXMiLCJOQVRJVkVfV0VBS19NQVAiLCJvYmplY3RIYXMiLCJJbnRlcm5hbFN0YXRlTW9kdWxlIiwibWluIiwicmVxdWlyZSQkMCIsImhpZGRlbktleXMiLCJpbnRlcm5hbE9iamVjdEtleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiaXNGb3JjZWQiLCJOQVRJVkVfU1lNQk9MIiwiU3ltYm9sIiwiVVNFX1NZTUJPTF9BU19VSUQiLCJ1c2VyQWdlbnQiLCJTUEVDSUVTIiwiVjhfVkVSU0lPTiIsIiQiLCJhRnVuY3Rpb24iLCJjcmVhdGVNZXRob2QiLCJiaW5kIiwiZm9yRWFjaCIsIlNUUklDVF9NRVRIT0QiLCJVU0VTX1RPX0xFTkdUSCIsInNldFByb3RvdHlwZU9mIiwiZGVmaW5lUHJvcGVydGllcyIsInJlcXVpcmUkJDEiLCJkZWZpbmVQcm9wZXJ0eSIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwiY3JlYXRlIiwia2V5cyIsInRyaW0iLCJGT1JDRUQiLCJwYXJzZUludCIsImFzc2lnbiIsIkRPTUl0ZXJhYmxlcyIsIkhBU19TUEVDSUVTX1NVUFBPUlQiLCJtYXgiLCJUT19TVFJJTkdfVEFHIiwiVE9fU1RSSU5HX1RBR19TVVBQT1JUIiwidG9TdHJpbmciLCJmbGFncyIsImh0bWwiLCJlbCIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImJvZHkiLCJmaXJzdENoaWxkIiwiSFRNTEVsZW1lbnQiLCJFcnJvciIsImExMXlDbGljayIsImV2ZW50IiwiY29kZSIsImNoYXJDb2RlIiwia2V5Q29kZSIsInR5cGUiLCJwcmV2ZW50RGVmYXVsdCIsImNyb3NzQ3VzdG9tRXZlbnQiLCJwYXJhbXMiLCJldnQiLCJjcmVhdGVFdmVudCIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiZGV0YWlsIiwidW5kZWZpbmVkIiwiaW5pdEN1c3RvbUV2ZW50IiwiaXNJbnRlZ2VyIiwidmFsdWUiLCJpc0Zpbml0ZSIsIk1hdGgiLCJmbG9vciIsImlzTmFOIiwiTnVtYmVyIiwiaXNPYmplY3QiLCJjYW5BY2Nlc3NBc0FycmF5IiwiaXRlbSIsIkFycmF5IiwiaXNBcnJheSIsInJlc3VsdCIsIk9iamVjdCIsInByb3RvdHlwZSIsImNhbGwiLCJoYXNPd25Qcm9wZXJ0eSIsImxlbmd0aCIsIm5vZGVUeXBlIiwiZXZlcnlFbGVtZW50IiwiZWxlbWVudHMiLCJjYWxsYmFjayIsImVscyIsInNsaWNlIiwiZ2V0U3VicGl4ZWxTdHlsZSIsImVsZW1lbnQiLCJzdHlsZSIsInN0eWxlcyIsIkhBU19DT01QVVRFRF9TVFlMRSIsIndpbmRvdyIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRTdHlsZXMiLCJDT01QVVRFRF9TSVpFX0lOQ0xVREVTX1BBRERJTkciLCJwYXJlbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJlIiwiY3NzVGV4dCIsImFwcGVuZENoaWxkIiwid2lkdGgiLCJyZXQiLCJyZW1vdmVDaGlsZCIsImdldE51bWJlclN0eWxlIiwiZWxTdHlsZSIsImVsU3R5bGVzIiwiZ2V0RmxvYXQiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImJvcmRlckxlZnRXaWR0aCIsImJvcmRlclJpZ2h0V2lkdGgiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsImJvcmRlclRvcFdpZHRoIiwiYm9yZGVyQm90dG9tV2lkdGgiLCJpc051bWJlciIsIm4iLCJwYXJzZUZsb2F0IiwiZ2V0UHJldmlvdXNTaWJsaW5ncyIsImFtb3VudCIsInNpYmxpbmciLCJwcmV2aW91c1NpYmxpbmciLCJwdXNoIiwiZ2V0TmV4dFNpYmxpbmdzIiwibmV4dFNpYmxpbmciLCJTbGlkZURpcmVjdGlvbiIsIlNsaWRlclN0YXRlIiwiQXV0b3BsYXlTd2l0Y2giLCJJc0F1dG9wbGF5aW5nIiwiQTExWVNsaWRlciIsIm9wdGlvbnMiLCJzbGlkZXIiLCJzbGlkZXMiLCJjaGlsZHJlbiIsInNsaWRlckNvbnRhaW5lciIsIl9hY3RpdmVDbGFzcyIsIl92aXNpYmxlQ2xhc3MiLCJfZG90c0NsYXNzIiwiX3NsaWRlckNsYXNzIiwiX2ZvY3VzYWJsZSIsIl9hdXRvcGxheVRpbWVyIiwiTm8iLCJhdXRvcGxheUJ0biIsIl9wYXVzZU9uTW91c2VMZWF2ZSIsIl9za2lwQnRucyIsImRvdHMiLCJzd2lwZSIsImFjdGl2ZVNsaWRlIiwidmlzaWJsZVNsaWRlcyIsInNsaWRlckVuYWJsZWQiLCJEaXNhYmxlZCIsIm1vZGVybkJyb3dzZXIiLCJzY3JvbGxUbyIsIm1vdXNlRG93biIsInRvdWNoU3RhcnQiLCJzd2lwZVN0YXJ0WCIsInN3aXBlWCIsInN3aXBlWENhY2hlZCIsIl9oYXNDdXN0b21BcnJvd3MiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJjb250YWluZXIiLCJhcnJvd3MiLCJhZGFwdGl2ZUhlaWdodCIsInNraXBCdG4iLCJzbGlkZXNUb1Nob3ciLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJhdXRvcGxheUhvdmVyUGF1c2UiLCJjZW50ZXJNb2RlIiwiaW5maW5pdGUiLCJkaXNhYmxlIiwicmVzcG9uc2l2ZSIsImN1c3RvbVBhZ2luZyIsIl9oYW5kbGVQcmV2IiwiX2hhbmRsZU5leHQiLCJfaGFuZGxlQXV0b3BsYXkiLCJfaGFuZGxlQXV0b3BsYXlIb3ZlciIsIl9oYW5kbGVBdXRvcGxheUV2ZW50IiwiX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkIiwiZGVib3VuY2UiLCJfY2hlY2tTaG91bGRFbmFibGUiLCJfdXBkYXRlSGVpZ2h0RGVib3VuY2VkIiwiX3VwZGF0ZUhlaWdodCIsIl9nZW5lcmF0ZURvdHNEZWJvdW5jZWQiLCJfZ2VuZXJhdGVEb3RzIiwiX3VwZGF0ZVNjcm9sbFBvc2l0aW9uIiwic2Nyb2xsVG9TbGlkZSIsIl9oYW5kbGVTY3JvbGwiLCJfc2Nyb2xsRmluaXNoIiwiX3N3aXBlTW91c2VEb3duIiwiX3N3aXBlTW91c2VVcCIsIl9zd2lwZU1vdXNlTW92ZSIsIl9zd2lwZVRvdWNoU3RhcnQiLCJfc3dpcGVUb3VjaEVuZCIsIl9zd2lwZVRvdWNoTW92ZSIsIl9pbml0Iiwic2V0VGltZW91dCIsInNjcm9sbExlZnQiLCJfY2hlY2tSZXNwb25zaXZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9kaXNwYXRjaEV2ZW50IiwiYTExeVNsaWRlciIsInNob3VsZEVuYWJsZSIsIl9nZXRBY3RpdmVBbmRWaXNpYmxlIiwiX2VuYWJsZVNsaWRlciIsIkVuYWJsZWQiLCJfZGlzYWJsZVNsaWRlciIsImNsYXNzTGlzdCIsImFkZCIsImluc2VydEFkamFjZW50RWxlbWVudCIsIl9hZGRTa2lwQnRuIiwicGFzc2l2ZSIsInJlbW92ZSIsIl9zZXRDU1MiLCJfZW5hYmxlQXV0b3BsYXkiLCJfZW5hYmxlU3dpcGUiLCJjb250YWlucyIsInBhcmVudE5vZGUiLCJfcmVtb3ZlU2tpcEJ0biIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfcmVtb3ZlRG90cyIsIl9yZW1vdmVDU1MiLCJfZGlzYWJsZUF1dG9wbGF5IiwiX2Rpc2FibGVTd2lwZSIsIl9hZGRTbGlkZXNXaWR0aCIsInNsaWRlIiwiX3VwZGF0ZURvdHMiLCJfdXBkYXRlQTExWSIsIl9yZW1vdmVTbGlkZXNXaWR0aCIsIl9yZW1vdmVBMTFZIiwiaW5pdGlhbE9wdGlvbnMiLCJicmVha3BvaW50cyIsInJlc3BvbnNpdmVPcHRpb25zIiwiZW50cmllcyIsInNvcnQiLCJhIiwiYiIsIm1xbCIsIm1hdGNoTWVkaWEiLCJpIiwiYnJlYWtwb2ludCIsImJyZWFrcG9pbnRPcHRpb25zIiwibXFsU3RyaW5nIiwiY29uY2F0IiwibWFwIiwibWF0Y2hlcyIsImFkZExpc3RlbmVyIiwidXBkYXRlT3B0aW9ucyIsInNsaWRlV2lkdGgiLCJkaXNwbGF5IiwiZmxleCIsInJlbW92ZVByb3BlcnR5IiwiZm9jdXNhYmxlSXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2V0QXR0cmlidXRlIiwiZm9jdXNhYmxlSXRlbSIsImZpcnN0U2xpZGUiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImxhc3RTbGlkZSIsImxhc3RFbGVtZW50Q2hpbGQiLCJmaXJzdFZpc2libGVTbGlkZSIsImxhc3RWaXNpYmxlU2xpZGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJiZWZvcmVFbCIsImFmdGVyRWwiLCJmb2N1c0VuZCIsImZvY3VzIiwiZG90TGkiLCJkb3RCdG4iLCJ0ZXh0Q29udGVudCIsInN3aXRjaFRvU2xpZGUiLCJfdG9nZ2xlQXV0b3BsYXkiLCJEaXNhYmxlIiwiX2dldERvdENvdW50IiwidG90YWxTbGlkZXMiLCJhY3RpdmVJbmRleCIsImluZGV4T2YiLCJkb3QiLCJxdWVyeVNlbGVjdG9yIiwiRW5hYmxlIiwicGFnZVgiLCJvZmZzZXRMZWZ0IiwiaW5SYW5nZSIsInNjcm9sbCIsImxlZnQiLCJiZWhhdmlvciIsInNjcm9sbFNwZWVkIiwieCIsIndhbGsiLCJ0b3VjaGVzIiwic2V0U3RhdGUiLCJzdGFydEF1dG9wbGF5aW5nIiwic2V0SW50ZXJ2YWwiLCJfZ29QcmV2T3JOZXh0IiwiTmV4dCIsImN1cnJlbnRTbGlkZSIsInN0b3BBdXRvcGxheWluZyIsImNsZWFySW50ZXJ2YWwiLCJkaXJlY3Rpb24iLCJuZXh0RWxlbWVudFNpYmxpbmciLCJQcmV2IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInRhcmdldCIsIm9yaWdpbmFsUG9zaXRpb24iLCJ0YXJnZXRTbGlkZSIsIm5leHRTbGlkZSIsInRhcmdldEhlaWdodCIsImhlaWdodCIsImV4cGxpY2l0QWN0aXZlIiwibm9TbGlkZXJDbGFzcyIsImJvcmRlclN0eWxlIiwiYm9yZGVyV2lkdGgiLCJzbGlkZXJXaWR0aCIsInJvdW5kIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2xpZGVyUG9zaXRpb24iLCJzbGlkZU9mZnNldCIsIl9ldmVudCIsImV2ZW50TmFtZSIsImRpc3BhdGNoRXZlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFLEVBQUU7RUFDeEIsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0NBQ3BDLENBQUM7OztBQUdGLFlBQWM7O0VBRVosS0FBSyxDQUFDLE9BQU8sVUFBVSxJQUFJLFFBQVEsSUFBSSxVQUFVLENBQUM7RUFDbEQsS0FBSyxDQUFDLE9BQU8sTUFBTSxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUM7RUFDMUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUM7RUFDdEMsS0FBSyxDQUFDLE9BQU9BLGNBQU0sSUFBSSxRQUFRLElBQUlBLGNBQU0sQ0FBQzs7RUFFMUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7O0FDWjVCLFNBQWMsR0FBRyxVQUFVLElBQUksRUFBRTtFQUMvQixJQUFJO0lBQ0YsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDakIsQ0FBQyxPQUFPLEtBQUssRUFBRTtJQUNkLE9BQU8sSUFBSSxDQUFDO0dBQ2I7Q0FDRixDQUFDOztBQ0pGO0FBQ0EsZUFBYyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVk7RUFDbEMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2pGLENBQUMsQ0FBQzs7QUNKSCxJQUFJLDBCQUEwQixHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztBQUN6RCxJQUFJLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQzs7O0FBRy9ELElBQUksV0FBVyxHQUFHLHdCQUF3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
