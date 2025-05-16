import { Children, cloneElement, useMemo, forwardRef, useState, useCallback, useImperativeHandle, useRef, useEffect, useLayoutEffect, createElement } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

var __spreadArray$3 = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
// As defined on the list of supported events: https://reactjs.org/docs/events.html
var clipboardEvents = ['onCopy', 'onCut', 'onPaste'];
var compositionEvents = ['onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate'];
var focusEvents = ['onFocus', 'onBlur'];
var formEvents = ['onInput', 'onInvalid', 'onReset', 'onSubmit'];
var imageEvents = ['onLoad', 'onError'];
var keyboardEvents = ['onKeyDown', 'onKeyPress', 'onKeyUp'];
var mediaEvents = ['onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted', 'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting'];
var mouseEvents = ['onClick', 'onContextMenu', 'onDoubleClick', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp'];
var dragEvents = ['onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop'];
var selectionEvents = ['onSelect'];
var touchEvents = ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'];
var pointerEvents = ['onPointerDown', 'onPointerMove', 'onPointerUp', 'onPointerCancel', 'onGotPointerCapture', 'onLostPointerCapture', 'onPointerEnter', 'onPointerLeave', 'onPointerOver', 'onPointerOut'];
var uiEvents = ['onScroll'];
var wheelEvents = ['onWheel'];
var animationEvents = ['onAnimationStart', 'onAnimationEnd', 'onAnimationIteration'];
var transitionEvents = ['onTransitionEnd'];
var otherEvents = ['onToggle'];
var changeEvents = ['onChange'];
var allEvents = __spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3([], clipboardEvents, true), compositionEvents, true), focusEvents, true), formEvents, true), imageEvents, true), keyboardEvents, true), mediaEvents, true), mouseEvents, true), dragEvents, true), selectionEvents, true), touchEvents, true), pointerEvents, true), uiEvents, true), wheelEvents, true), animationEvents, true), transitionEvents, true), changeEvents, true), otherEvents, true);
/**
 * Returns an object with on-event callback props curried with provided args.
 * @param {Object} props Props passed to a component.
 * @param {Function=} getArgs A function that returns argument(s) on-event callbacks
 *   shall be curried with.
 */
function makeEventProps(props, getArgs) {
  var eventProps = {};
  allEvents.forEach(function (eventName) {
    var eventHandler = props[eventName];
    if (!eventHandler) {
      return;
    }
    if (getArgs) {
      eventProps[eventName] = function (event) {
        return eventHandler(event, getArgs(eventName));
      };
    } else {
      eventProps[eventName] = eventHandler;
    }
  });
  return eventProps;
}

function r(e) {
  var t,
    f,
    n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var mimicFn_1;
var hasRequiredMimicFn;

function requireMimicFn () {
	if (hasRequiredMimicFn) return mimicFn_1;
	hasRequiredMimicFn = 1;

	const copyProperty = (to, from, property, ignoreNonConfigurable) => {
	  // `Function#length` should reflect the parameters of `to` not `from` since we keep its body.
	  // `Function#prototype` is non-writable and non-configurable so can never be modified.
	  if (property === 'length' || property === 'prototype') {
	    return;
	  }

	  // `Function#arguments` and `Function#caller` should not be copied. They were reported to be present in `Reflect.ownKeys` for some devices in React Native (#41), so we explicitly ignore them here.
	  if (property === 'arguments' || property === 'caller') {
	    return;
	  }
	  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
	  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
	  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
	    return;
	  }
	  Object.defineProperty(to, property, fromDescriptor);
	};

	// `Object.defineProperty()` throws if the property exists, is not configurable and either:
	//  - one its descriptors is changed
	//  - it is non-writable and its value is changed
	const canCopyProperty = function (toDescriptor, fromDescriptor) {
	  return toDescriptor === undefined || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
	};
	const changePrototype = (to, from) => {
	  const fromPrototype = Object.getPrototypeOf(from);
	  if (fromPrototype === Object.getPrototypeOf(to)) {
	    return;
	  }
	  Object.setPrototypeOf(to, fromPrototype);
	};
	const wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/\n${fromBody}`;
	const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, 'toString');
	const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, 'name');

	// We call `from.toString()` early (not lazily) to ensure `from` can be garbage collected.
	// We use `bind()` instead of a closure for the same reason.
	// Calling `from.toString()` early also allows caching it in case `to.toString()` is called several times.
	const changeToString = (to, from, name) => {
	  const withName = name === '' ? '' : `with ${name.trim()}() `;
	  const newToString = wrappedToString.bind(null, withName, from.toString());
	  // Ensure `to.toString.toString` is non-enumerable and has the same `same`
	  Object.defineProperty(newToString, 'name', toStringName);
	  Object.defineProperty(to, 'toString', {
	    ...toStringDescriptor,
	    value: newToString
	  });
	};
	const mimicFn = (to, from, {
	  ignoreNonConfigurable = false
	} = {}) => {
	  const {
	    name
	  } = to;
	  for (const property of Reflect.ownKeys(from)) {
	    copyProperty(to, from, property, ignoreNonConfigurable);
	  }
	  changePrototype(to, from);
	  changeToString(to, from, name);
	  return to;
	};
	mimicFn_1 = mimicFn;
	return mimicFn_1;
}

var dist$2 = {exports: {}};

var pDefer;
var hasRequiredPDefer;

function requirePDefer () {
	if (hasRequiredPDefer) return pDefer;
	hasRequiredPDefer = 1;

	pDefer = () => {
	  const ret = {};
	  ret.promise = new Promise((resolve, reject) => {
	    ret.resolve = resolve;
	    ret.reject = reject;
	  });
	  return ret;
	};
	return pDefer;
}

var dist$1 = dist$2.exports;

var hasRequiredDist$1;

function requireDist$1 () {
	if (hasRequiredDist$1) return dist$2.exports;
	hasRequiredDist$1 = 1;
	(function (module, exports) {

		var __awaiter = dist$1 && dist$1.__awaiter || function (thisArg, _arguments, P, generator) {
		  return new (P || (P = Promise))(function (resolve, reject) {
		    function fulfilled(value) {
		      try {
		        step(generator.next(value));
		      } catch (e) {
		        reject(e);
		      }
		    }
		    function rejected(value) {
		      try {
		        step(generator["throw"](value));
		      } catch (e) {
		        reject(e);
		      }
		    }
		    function step(result) {
		      result.done ? resolve(result.value) : new P(function (resolve) {
		        resolve(result.value);
		      }).then(fulfilled, rejected);
		    }
		    step((generator = generator.apply(thisArg, _arguments || [])).next());
		  });
		};
		var __importDefault = dist$1 && dist$1.__importDefault || function (mod) {
		  return mod && mod.__esModule ? mod : {
		    "default": mod
		  };
		};
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		const p_defer_1 = __importDefault(requirePDefer());
		function mapAgeCleaner(map, property = 'maxAge') {
		  let processingKey;
		  let processingTimer;
		  let processingDeferred;
		  const cleanup = () => __awaiter(this, void 0, void 0, function* () {
		    if (processingKey !== undefined) {
		      // If we are already processing an item, we can safely exit
		      return;
		    }
		    const setupTimer = item => __awaiter(this, void 0, void 0, function* () {
		      processingDeferred = p_defer_1.default();
		      const delay = item[1][property] - Date.now();
		      if (delay <= 0) {
		        // Remove the item immediately if the delay is equal to or below 0
		        map.delete(item[0]);
		        processingDeferred.resolve();
		        return;
		      }
		      // Keep track of the current processed key
		      processingKey = item[0];
		      processingTimer = setTimeout(() => {
		        // Remove the item when the timeout fires
		        map.delete(item[0]);
		        if (processingDeferred) {
		          processingDeferred.resolve();
		        }
		      }, delay);
		      // tslint:disable-next-line:strict-type-predicates
		      if (typeof processingTimer.unref === 'function') {
		        // Don't hold up the process from exiting
		        processingTimer.unref();
		      }
		      return processingDeferred.promise;
		    });
		    try {
		      for (const entry of map) {
		        yield setupTimer(entry);
		      }
		    } catch (_a) {
		      // Do nothing if an error occurs, this means the timer was cleaned up and we should stop processing
		    }
		    processingKey = undefined;
		  });
		  const reset = () => {
		    processingKey = undefined;
		    if (processingTimer !== undefined) {
		      clearTimeout(processingTimer);
		      processingTimer = undefined;
		    }
		    if (processingDeferred !== undefined) {
		      // tslint:disable-line:early-exit
		      processingDeferred.reject(undefined);
		      processingDeferred = undefined;
		    }
		  };
		  const originalSet = map.set.bind(map);
		  map.set = (key, value) => {
		    if (map.has(key)) {
		      // If the key already exist, remove it so we can add it back at the end of the map.
		      map.delete(key);
		    }
		    // Call the original `map.set`
		    const result = originalSet(key, value);
		    // If we are already processing a key and the key added is the current processed key, stop processing it
		    if (processingKey && processingKey === key) {
		      reset();
		    }
		    // Always run the cleanup method in case it wasn't started yet
		    cleanup(); // tslint:disable-line:no-floating-promises
		    return result;
		  };
		  cleanup(); // tslint:disable-line:no-floating-promises
		  return map;
		}
		exports.default = mapAgeCleaner;
		// Add support for CJS
		module.exports = mapAgeCleaner;
		module.exports.default = mapAgeCleaner; 
	} (dist$2, dist$2.exports));
	return dist$2.exports;
}

var dist;
var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;

	const mimicFn = requireMimicFn();
	const mapAgeCleaner = /*@__PURE__*/ requireDist$1();
	const decoratorInstanceMap = new WeakMap();
	const cacheStore = new WeakMap();
	/**
	[Memoize](https://en.wikipedia.org/wiki/Memoization) functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input.

	@param fn - Function to be memoized.

	@example
	```
	import mem = require('mem');

	let i = 0;
	const counter = () => ++i;
	const memoized = mem(counter);

	memoized('foo');
	//=> 1

	// Cached as it's the same arguments
	memoized('foo');
	//=> 1

	// Not cached anymore as the arguments changed
	memoized('bar');
	//=> 2

	memoized('bar');
	//=> 2
	```
	*/
	const mem = (fn, {
	  cacheKey,
	  cache = new Map(),
	  maxAge
	} = {}) => {
	  if (typeof maxAge === 'number') {
	    // TODO: Drop after https://github.com/SamVerschueren/map-age-cleaner/issues/5
	    // @ts-expect-error
	    mapAgeCleaner(cache);
	  }
	  const memoized = function (...arguments_) {
	    const key = cacheKey ? cacheKey(arguments_) : arguments_[0];
	    const cacheItem = cache.get(key);
	    if (cacheItem) {
	      return cacheItem.data;
	    }
	    const result = fn.apply(this, arguments_);
	    cache.set(key, {
	      data: result,
	      maxAge: maxAge ? Date.now() + maxAge : Number.POSITIVE_INFINITY
	    });
	    return result;
	  };
	  mimicFn(memoized, fn, {
	    ignoreNonConfigurable: true
	  });
	  cacheStore.set(memoized, cache);
	  return memoized;
	};
	/**
	@returns A [decorator](https://github.com/tc39/proposal-decorators) to memoize class methods or static class methods.

	@example
	```
	import mem = require('mem');

	class Example {
	    index = 0

	    @mem.decorator()
	    counter() {
	        return ++this.index;
	    }
	}

	class ExampleWithOptions {
	    index = 0

	    @mem.decorator({maxAge: 1000})
	    counter() {
	        return ++this.index;
	    }
	}
	```
	*/
	mem.decorator = (options = {}) => (target, propertyKey, descriptor) => {
	  const input = target[propertyKey];
	  if (typeof input !== 'function') {
	    throw new TypeError('The decorated value must be a function');
	  }
	  delete descriptor.value;
	  delete descriptor.writable;
	  descriptor.get = function () {
	    if (!decoratorInstanceMap.has(this)) {
	      const value = mem(input, options);
	      decoratorInstanceMap.set(this, value);
	      return value;
	    }
	    return decoratorInstanceMap.get(this);
	  };
	};
	/**
	Clear all cached data of a memoized function.

	@param fn - Memoized function.
	*/
	mem.clear = fn => {
	  const cache = cacheStore.get(fn);
	  if (!cache) {
	    throw new TypeError('Can\'t clear a function that was not memoized!');
	  }
	  if (typeof cache.clear !== 'function') {
	    throw new TypeError('The cache Map can\'t be cleared!');
	  }
	  cache.clear();
	};
	dist = mem;
	return dist;
}

var distExports = requireDist();
var mem = /*@__PURE__*/getDefaultExportFromCjs(distExports);

function isString(el) {
  return typeof el === 'string';
}
function isUnique(el, index, arr) {
  return arr.indexOf(el) === index;
}
function isAllLowerCase(el) {
  return el.toLowerCase() === el;
}
function fixCommas(el) {
  return el.indexOf(',') === -1 ? el : el.split(',');
}
function normalizeLocale(locale) {
  if (!locale) {
    return locale;
  }
  if (locale === 'C' || locale === 'posix' || locale === 'POSIX') {
    return 'en-US';
  }
  // If there's a dot (.) in the locale, it's likely in the format of "en-US.UTF-8", so we only take the first part
  if (locale.indexOf('.') !== -1) {
    var _a = locale.split('.')[0],
      actualLocale = _a === void 0 ? '' : _a;
    return normalizeLocale(actualLocale);
  }
  // If there's an at sign (@) in the locale, it's likely in the format of "en-US@posix", so we only take the first part
  if (locale.indexOf('@') !== -1) {
    var _b = locale.split('@')[0],
      actualLocale = _b === void 0 ? '' : _b;
    return normalizeLocale(actualLocale);
  }
  // If there's a dash (-) in the locale and it's not all lower case, it's already in the format of "en-US", so we return it
  if (locale.indexOf('-') === -1 || !isAllLowerCase(locale)) {
    return locale;
  }
  var _c = locale.split('-'),
    splitEl1 = _c[0],
    _d = _c[1],
    splitEl2 = _d === void 0 ? '' : _d;
  return "".concat(splitEl1, "-").concat(splitEl2.toUpperCase());
}
function getUserLocalesInternal(_a) {
  var _b = _a === void 0 ? {} : _a,
    _c = _b.useFallbackLocale,
    useFallbackLocale = _c === void 0 ? true : _c,
    _d = _b.fallbackLocale,
    fallbackLocale = _d === void 0 ? 'en-US' : _d;
  var languageList = [];
  if (typeof navigator !== 'undefined') {
    var rawLanguages = navigator.languages || [];
    var languages = [];
    for (var _i = 0, rawLanguages_1 = rawLanguages; _i < rawLanguages_1.length; _i++) {
      var rawLanguagesItem = rawLanguages_1[_i];
      languages = languages.concat(fixCommas(rawLanguagesItem));
    }
    var rawLanguage = navigator.language;
    var language = rawLanguage ? fixCommas(rawLanguage) : rawLanguage;
    languageList = languageList.concat(languages, language);
  }
  if (useFallbackLocale) {
    languageList.push(fallbackLocale);
  }
  return languageList.filter(isString).map(normalizeLocale).filter(isUnique);
}
var getUserLocales = mem(getUserLocalesInternal, {
  cacheKey: JSON.stringify
});
function getUserLocaleInternal(options) {
  return getUserLocales(options)[0] || null;
}
var getUserLocale = mem(getUserLocaleInternal, {
  cacheKey: JSON.stringify
});
var getUserLocale$1 = getUserLocale;

/**
 * Utils
 */
function makeGetEdgeOfNeighbor(getPeriod, getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborInternal(date, offset) {
    if (offset === void 0) {
      offset = defaultOffset;
    }
    var previousPeriod = getPeriod(date) + offset;
    return getEdgeOfPeriod(previousPeriod);
  };
}
function makeGetEnd(getBeginOfNextPeriod) {
  return function makeGetEndInternal(date) {
    return new Date(getBeginOfNextPeriod(date).getTime() - 1);
  };
}
function makeGetRange(getStart, getEnd) {
  return function makeGetRangeInternal(date) {
    return [getStart(date), getEnd(date)];
  };
}
/**
 * Simple getters - getting a property of a given point in time
 */
/**
 * Gets year from a given date.
 *
 * @param {DateLike} date Date to get year from
 * @returns {number} Year
 */
function getYear(date) {
  if (date instanceof Date) {
    return date.getFullYear();
  }
  if (typeof date === 'number') {
    return date;
  }
  var year = parseInt(date, 10);
  if (typeof date === 'string' && !isNaN(year)) {
    return year;
  }
  throw new Error("Failed to get year from date: ".concat(date, "."));
}
/**
 * Gets month from a given date.
 *
 * @param {Date} date Date to get month from
 * @returns {number} Month
 */
function getMonth(date) {
  if (date instanceof Date) {
    return date.getMonth();
  }
  throw new Error("Failed to get month from date: ".concat(date, "."));
}
/**
 * Gets human-readable month from a given date.
 *
 * @param {Date} date Date to get human-readable month from
 * @returns {number} Human-readable month
 */
function getMonthHuman(date) {
  if (date instanceof Date) {
    return date.getMonth() + 1;
  }
  throw new Error("Failed to get human-readable month from date: ".concat(date, "."));
}
/**
 * Gets day of the month from a given date.
 *
 * @param {Date} date Date to get day of the month from
 * @returns {number} Day of the month
 */
function getDate(date) {
  if (date instanceof Date) {
    return date.getDate();
  }
  throw new Error("Failed to get year from date: ".concat(date, "."));
}
/**
 * Century
 */
/**
 * Gets century start date from a given date.
 *
 * @param {DateLike} date Date to get century start from
 * @returns {Date} Century start date
 */
function getCenturyStart(date) {
  var year = getYear(date);
  var centuryStartYear = year + (-year + 1) % 100;
  var centuryStartDate = new Date();
  centuryStartDate.setFullYear(centuryStartYear, 0, 1);
  centuryStartDate.setHours(0, 0, 0, 0);
  return centuryStartDate;
}
/**
 * Gets previous century start date from a given date.
 *
 * @param {DateLike} date Date to get previous century start from
 * @returns {Date} Previous century start date
 */
var getPreviousCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, -100);
/**
 * Gets next century start date from a given date.
 *
 * @param {DateLike} date Date to get next century start from
 * @returns {Date} Next century start date
 */
var getNextCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, 100);
/**
 * Gets century end date from a given date.
 *
 * @param {DateLike} date Date to get century end from
 * @returns {Date} Century end date
 */
var getCenturyEnd = makeGetEnd(getNextCenturyStart);
/**
 * Gets previous century end date from a given date.
 *
 * @param {DateLike} date Date to get previous century end from
 * @returns {Date} Previous century end date
 */
var getPreviousCenturyEnd = makeGetEdgeOfNeighbor(getYear, getCenturyEnd, -100);
/**
 * Gets century start and end dates from a given date.
 *
 * @param {DateLike} date Date to get century start and end from
 * @returns {[Date, Date]} Century start and end dates
 */
var getCenturyRange = makeGetRange(getCenturyStart, getCenturyEnd);
/**
 * Decade
 */
/**
 * Gets decade start date from a given date.
 *
 * @param {DateLike} date Date to get decade start from
 * @returns {Date} Decade start date
 */
function getDecadeStart(date) {
  var year = getYear(date);
  var decadeStartYear = year + (-year + 1) % 10;
  var decadeStartDate = new Date();
  decadeStartDate.setFullYear(decadeStartYear, 0, 1);
  decadeStartDate.setHours(0, 0, 0, 0);
  return decadeStartDate;
}
/**
 * Gets previous decade start date from a given date.
 *
 * @param {DateLike} date Date to get previous decade start from
 * @returns {Date} Previous decade start date
 */
var getPreviousDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, -10);
/**
 * Gets next decade start date from a given date.
 *
 * @param {DateLike} date Date to get next decade start from
 * @returns {Date} Next decade start date
 */
var getNextDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, 10);
/**
 * Gets decade end date from a given date.
 *
 * @param {DateLike} date Date to get decade end from
 * @returns {Date} Decade end date
 */
var getDecadeEnd = makeGetEnd(getNextDecadeStart);
/**
 * Gets previous decade end date from a given date.
 *
 * @param {DateLike} date Date to get previous decade end from
 * @returns {Date} Previous decade end date
 */
var getPreviousDecadeEnd = makeGetEdgeOfNeighbor(getYear, getDecadeEnd, -10);
/**
 * Gets decade start and end dates from a given date.
 *
 * @param {DateLike} date Date to get decade start and end from
 * @returns {[Date, Date]} Decade start and end dates
 */
var getDecadeRange = makeGetRange(getDecadeStart, getDecadeEnd);
/**
 * Year
 */
/**
 * Gets year start date from a given date.
 *
 * @param {DateLike} date Date to get year start from
 * @returns {Date} Year start date
 */
function getYearStart(date) {
  var year = getYear(date);
  var yearStartDate = new Date();
  yearStartDate.setFullYear(year, 0, 1);
  yearStartDate.setHours(0, 0, 0, 0);
  return yearStartDate;
}
/**
 * Gets previous year start date from a given date.
 *
 * @param {DateLike} date Date to get previous year start from
 * @returns {Date} Previous year start date
 */
var getPreviousYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, -1);
/**
 * Gets next year start date from a given date.
 *
 * @param {DateLike} date Date to get next year start from
 * @returns {Date} Next year start date
 */
var getNextYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, 1);
/**
 * Gets year end date from a given date.
 *
 * @param {DateLike} date Date to get year end from
 * @returns {Date} Year end date
 */
var getYearEnd = makeGetEnd(getNextYearStart);
/**
 * Gets previous year end date from a given date.
 *
 * @param {DateLike} date Date to get previous year end from
 * @returns {Date} Previous year end date
 */
var getPreviousYearEnd = makeGetEdgeOfNeighbor(getYear, getYearEnd, -1);
/**
 * Gets year start and end dates from a given date.
 *
 * @param {DateLike} date Date to get year start and end from
 * @returns {[Date, Date]} Year start and end dates
 */
var getYearRange = makeGetRange(getYearStart, getYearEnd);
/**
 * Month
 */
function makeGetEdgeOfNeighborMonth(getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborMonthInternal(date, offset) {
    if (offset === void 0) {
      offset = defaultOffset;
    }
    var year = getYear(date);
    var month = getMonth(date) + offset;
    var previousPeriod = new Date();
    previousPeriod.setFullYear(year, month, 1);
    previousPeriod.setHours(0, 0, 0, 0);
    return getEdgeOfPeriod(previousPeriod);
  };
}
/**
 * Gets month start date from a given date.
 *
 * @param {DateLike} date Date to get month start from
 * @returns {Date} Month start date
 */
function getMonthStart(date) {
  var year = getYear(date);
  var month = getMonth(date);
  var monthStartDate = new Date();
  monthStartDate.setFullYear(year, month, 1);
  monthStartDate.setHours(0, 0, 0, 0);
  return monthStartDate;
}
/**
 * Gets previous month start date from a given date.
 *
 * @param {DateLike} date Date to get previous month start from
 * @returns {Date} Previous month start date
 */
var getPreviousMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, -1);
/**
 * Gets next month start date from a given date.
 *
 * @param {DateLike} date Date to get next month start from
 * @returns {Date} Next month start date
 */
var getNextMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, 1);
/**
 * Gets month end date from a given date.
 *
 * @param {DateLike} date Date to get month end from
 * @returns {Date} Month end date
 */
var getMonthEnd = makeGetEnd(getNextMonthStart);
/**
 * Gets previous month end date from a given date.
 *
 * @param {DateLike} date Date to get previous month end from
 * @returns {Date} Previous month end date
 */
var getPreviousMonthEnd = makeGetEdgeOfNeighborMonth(getMonthEnd, -1);
/**
 * Gets month start and end dates from a given date.
 *
 * @param {DateLike} date Date to get month start and end from
 * @returns {[Date, Date]} Month start and end dates
 */
var getMonthRange = makeGetRange(getMonthStart, getMonthEnd);
/**
 * Day
 */
function makeGetEdgeOfNeighborDay(getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborDayInternal(date, offset) {
    if (offset === void 0) {
      offset = defaultOffset;
    }
    var year = getYear(date);
    var month = getMonth(date);
    var day = getDate(date) + offset;
    var previousPeriod = new Date();
    previousPeriod.setFullYear(year, month, day);
    previousPeriod.setHours(0, 0, 0, 0);
    return getEdgeOfPeriod(previousPeriod);
  };
}
/**
 * Gets day start date from a given date.
 *
 * @param {DateLike} date Date to get day start from
 * @returns {Date} Day start date
 */
function getDayStart(date) {
  var year = getYear(date);
  var month = getMonth(date);
  var day = getDate(date);
  var dayStartDate = new Date();
  dayStartDate.setFullYear(year, month, day);
  dayStartDate.setHours(0, 0, 0, 0);
  return dayStartDate;
}
/**
 * Gets next day start date from a given date.
 *
 * @param {DateLike} date Date to get next day start from
 * @returns {Date} Next day start date
 */
var getNextDayStart = makeGetEdgeOfNeighborDay(getDayStart, 1);
/**
 * Gets day end date from a given date.
 *
 * @param {DateLike} date Date to get day end from
 * @returns {Date} Day end date
 */
var getDayEnd = makeGetEnd(getNextDayStart);
/**
 * Gets day start and end dates from a given date.
 *
 * @param {DateLike} date Date to get day start and end from
 * @returns {[Date, Date]} Day start and end dates
 */
var getDayRange = makeGetRange(getDayStart, getDayEnd);
/**
 * Other
 */
/**
 * Returns a number of days in a month of a given date.
 *
 * @param {Date} date Date
 * @returns {number} Number of days in a month
 */
function getDaysInMonth(date) {
  return getDate(getMonthEnd(date));
}
function padStart(num, val) {
  if (val === void 0) {
    val = 2;
  }
  var numStr = "".concat(num);
  if (numStr.length >= val) {
    return num;
  }
  return "0000".concat(numStr).slice(-val);
}
/**
 * Returns local month in ISO-like format (YYYY-MM).
 *
 * @param {Date} date Date to get month in ISO-like format from
 * @returns {string} Local month in ISO-like format
 */
function getISOLocalMonth(date) {
  var year = padStart(getYear(date), 4);
  var month = padStart(getMonthHuman(date));
  return "".concat(year, "-").concat(month);
}
/**
 * Returns local date in ISO-like format (YYYY-MM-DD).
 *
 * @param {Date} date Date to get date in ISO-like format from
 * @returns {string} Local date in ISO-like format
 */
function getISOLocalDate(date) {
  var year = padStart(getYear(date), 4);
  var month = padStart(getMonthHuman(date));
  var day = padStart(getDate(date));
  return "".concat(year, "-").concat(month, "-").concat(day);
}

var CALENDAR_TYPES = {
  GREGORY: 'gregory',
  HEBREW: 'hebrew',
  ISLAMIC: 'islamic',
  ISO_8601: 'iso8601'
};
var CALENDAR_TYPE_LOCALES = {
  gregory: ['en-CA', 'en-US', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-DO', 'es-EC', 'es-GT', 'es-HN', 'es-MX', 'es-NI', 'es-PA', 'es-PE', 'es-PR', 'es-SV', 'es-VE', 'pt-BR'],
  hebrew: ['he', 'he-IL'],
  islamic: [
  // ar-LB, ar-MA intentionally missing
  'ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LY', 'ar-OM', 'ar-QA', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-YE', 'dv', 'dv-MV', 'ps', 'ps-AR']
};
var WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

var formatterCache$1 = new Map();
function getFormatter$1(options) {
  return function formatter(locale, date) {
    var localeWithDefault = locale || getUserLocale$1();
    if (!formatterCache$1.has(localeWithDefault)) {
      formatterCache$1.set(localeWithDefault, new Map());
    }
    var formatterCacheLocale = formatterCache$1.get(localeWithDefault);
    if (!formatterCacheLocale.has(options)) {
      formatterCacheLocale.set(options, new Intl.DateTimeFormat(localeWithDefault || undefined, options).format);
    }
    return formatterCacheLocale.get(options)(date);
  };
}
/**
 * Changes the hour in a Date to ensure right date formatting even if DST is messed up.
 * Workaround for bug in WebKit and Firefox with historical dates.
 * For more details, see:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=750465
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1385643
 *
 * @param {Date} date Date.
 * @returns {Date} Date with hour set to 12.
 */
function toSafeHour$1(date) {
  var safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
}
function getSafeFormatter$1(options) {
  return function (locale, date) {
    return getFormatter$1(options)(locale, toSafeHour$1(date));
  };
}
var formatDayOptions = {
  day: 'numeric'
};
var formatLongDateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
};
var formatMonthOptions$1 = {
  month: 'long'
};
var formatMonthYearOptions = {
  month: 'long',
  year: 'numeric'
};
var formatShortWeekdayOptions = {
  weekday: 'short'
};
var formatWeekdayOptions = {
  weekday: 'long'
};
var formatYearOptions = {
  year: 'numeric'
};
var formatDay = getSafeFormatter$1(formatDayOptions);
var formatLongDate = getSafeFormatter$1(formatLongDateOptions);
var formatMonth$1 = getSafeFormatter$1(formatMonthOptions$1);
var formatMonthYear = getSafeFormatter$1(formatMonthYearOptions);
var formatShortWeekday = getSafeFormatter$1(formatShortWeekdayOptions);
var formatWeekday = getSafeFormatter$1(formatWeekdayOptions);
var formatYear = getSafeFormatter$1(formatYearOptions);

var SUNDAY = WEEKDAYS[0];
var FRIDAY = WEEKDAYS[5];
var SATURDAY = WEEKDAYS[6];
/* Simple getters - getting a property of a given point in time */
/**
 * Gets day of the week of a given date.
 * @param {Date} date Date.
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {number} Day of the week.
 */
function getDayOfWeek(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var weekday = date.getDay();
  switch (calendarType) {
    case CALENDAR_TYPES.ISO_8601:
      // Shifts days of the week so that Monday is 0, Sunday is 6
      return (weekday + 6) % 7;
    case CALENDAR_TYPES.ISLAMIC:
      return (weekday + 1) % 7;
    case CALENDAR_TYPES.HEBREW:
    case CALENDAR_TYPES.GREGORY:
      return weekday;
    default:
      throw new Error('Unsupported calendar type.');
  }
}
/**
 * Century
 */
/**
 * Gets the year of the beginning of a century of a given date.
 * @param {Date} date Date.
 * @returns {number} Year of the beginning of a century.
 */
function getBeginOfCenturyYear(date) {
  var beginOfCentury = getCenturyStart(date);
  return getYear(beginOfCentury);
}
/**
 * Decade
 */
/**
 * Gets the year of the beginning of a decade of a given date.
 * @param {Date} date Date.
 * @returns {number} Year of the beginning of a decade.
 */
function getBeginOfDecadeYear(date) {
  var beginOfDecade = getDecadeStart(date);
  return getYear(beginOfDecade);
}
/**
 * Week
 */
/**
 * Returns the beginning of a given week.
 *
 * @param {Date} date Date.
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {Date} Beginning of a given week.
 */
function getBeginOfWeek(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var year = getYear(date);
  var monthIndex = getMonth(date);
  var day = date.getDate() - getDayOfWeek(date, calendarType);
  return new Date(year, monthIndex, day);
}
/**
 * Gets week number according to ISO 8601 or US standard.
 * In ISO 8601, Arabic and Hebrew week 1 is the one with January 4.
 * In US calendar week 1 is the one with January 1.
 *
 * @param {Date} date Date.
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {number} Week number.
 */
function getWeekNumber(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var calendarTypeForWeekNumber = calendarType === CALENDAR_TYPES.GREGORY ? CALENDAR_TYPES.GREGORY : CALENDAR_TYPES.ISO_8601;
  var beginOfWeek = getBeginOfWeek(date, calendarType);
  var year = getYear(date) + 1;
  var dayInWeekOne;
  var beginOfFirstWeek;
  // Look for the first week one that does not come after a given date
  do {
    dayInWeekOne = new Date(year, 0, calendarTypeForWeekNumber === CALENDAR_TYPES.ISO_8601 ? 4 : 1);
    beginOfFirstWeek = getBeginOfWeek(dayInWeekOne, calendarType);
    year -= 1;
  } while (date < beginOfFirstWeek);
  return Math.round((beginOfWeek.getTime() - beginOfFirstWeek.getTime()) / (8.64e7 * 7)) + 1;
}
/**
 * Others
 */
/**
 * Returns the beginning of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} Beginning of a given range.
 */
function getBegin$1(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getCenturyStart(date);
    case 'decade':
      return getDecadeStart(date);
    case 'year':
      return getYearStart(date);
    case 'month':
      return getMonthStart(date);
    case 'day':
      return getDayStart(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
/**
 * Returns the beginning of a previous given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} Beginning of a previous given range.
 */
function getBeginPrevious(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getPreviousCenturyStart(date);
    case 'decade':
      return getPreviousDecadeStart(date);
    case 'year':
      return getPreviousYearStart(date);
    case 'month':
      return getPreviousMonthStart(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
/**
 * Returns the beginning of a next given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} Beginning of a next given range.
 */
function getBeginNext(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getNextCenturyStart(date);
    case 'decade':
      return getNextDecadeStart(date);
    case 'year':
      return getNextYearStart(date);
    case 'month':
      return getNextMonthStart(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getBeginPrevious2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getPreviousDecadeStart(date, -100);
    case 'year':
      return getPreviousYearStart(date, -10);
    case 'month':
      return getPreviousMonthStart(date, -12);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getBeginNext2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getNextDecadeStart(date, 100);
    case 'year':
      return getNextYearStart(date, 10);
    case 'month':
      return getNextMonthStart(date, 12);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
/**
 * Returns the end of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} End of a given range.
 */
function getEnd$1(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getCenturyEnd(date);
    case 'decade':
      return getDecadeEnd(date);
    case 'year':
      return getYearEnd(date);
    case 'month':
      return getMonthEnd(date);
    case 'day':
      return getDayEnd(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
/**
 * Returns the end of a previous given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} End of a previous given range.
 */
function getEndPrevious(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getPreviousCenturyEnd(date);
    case 'decade':
      return getPreviousDecadeEnd(date);
    case 'year':
      return getPreviousYearEnd(date);
    case 'month':
      return getPreviousMonthEnd(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getEndPrevious2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getPreviousDecadeEnd(date, -100);
    case 'year':
      return getPreviousYearEnd(date, -10);
    case 'month':
      return getPreviousMonthEnd(date, -12);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
/**
 * Returns an array with the beginning and the end of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date[]} Beginning and end of a given range.
 */
function getRange(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getCenturyRange(date);
    case 'decade':
      return getDecadeRange(date);
    case 'year':
      return getYearRange(date);
    case 'month':
      return getMonthRange(date);
    case 'day':
      return getDayRange(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
/**
 * Creates a range out of two values, ensuring they are in order and covering entire period ranges.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date1 First date.
 * @param {Date} date2 Second date.
 * @returns {Date[]} Beginning and end of a given range.
 */
function getValueRange(rangeType, date1, date2) {
  var rawNextValue = [date1, date2].sort(function (a, b) {
    return a.getTime() - b.getTime();
  });
  return [getBegin$1(rangeType, rawNextValue[0]), getEnd$1(rangeType, rawNextValue[1])];
}
function toYearLabel(locale, formatYear$1, dates) {
  return dates.map(function (date) {
    return (formatYear$1 || formatYear)(locale, date);
  }).join(' – ');
}
/**
 * @callback FormatYear
 * @param {string} locale Locale.
 * @param {Date} date Date.
 * @returns {string} Formatted year.
 */
/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2001-2100.
 *
 * @param {string} locale Locale.
 * @param {FormatYear} formatYear Function to format a year.
 * @param {Date|string|number} date Date or a year as a string or as a number.
 * @returns {string} String labelling a century of a given date.
 */
function getCenturyLabel(locale, formatYear, date) {
  return toYearLabel(locale, formatYear, getCenturyRange(date));
}
/**
 * Returns a string labelling a decade of a given date.
 * For example, for 2017 it will return 2011-2020.
 *
 * @param {string} locale Locale.
 * @param {FormatYear} formatYear Function to format a year.
 * @param {Date|string|number} date Date or a year as a string or as a number.
 * @returns {string} String labelling a decade of a given date.
 */
function getDecadeLabel(locale, formatYear, date) {
  return toYearLabel(locale, formatYear, getDecadeRange(date));
}
/**
 * Returns a boolean determining whether a given date is the current day of the week.
 *
 * @param {Date} date Date.
 * @returns {boolean} Whether a given date is the current day of the week.
 */
function isCurrentDayOfWeek(date) {
  return date.getDay() === new Date().getDay();
}
/**
 * Returns a boolean determining whether a given date is a weekend day.
 *
 * @param {Date} date Date.
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {boolean} Whether a given date is a weekend day.
 */
function isWeekend(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var weekday = date.getDay();
  switch (calendarType) {
    case CALENDAR_TYPES.ISLAMIC:
    case CALENDAR_TYPES.HEBREW:
      return weekday === FRIDAY || weekday === SATURDAY;
    case CALENDAR_TYPES.ISO_8601:
    case CALENDAR_TYPES.GREGORY:
      return weekday === SATURDAY || weekday === SUNDAY;
    default:
      throw new Error('Unsupported calendar type.');
  }
}

var className$6 = 'react-calendar__navigation';
function Navigation(_a) {
  var activeStartDate = _a.activeStartDate,
    drillUp = _a.drillUp,
    _b = _a.formatMonthYear,
    formatMonthYear$1 = _b === void 0 ? formatMonthYear : _b,
    _c = _a.formatYear,
    formatYear$1 = _c === void 0 ? formatYear : _c,
    locale = _a.locale,
    maxDate = _a.maxDate,
    minDate = _a.minDate,
    _d = _a.navigationAriaLabel,
    navigationAriaLabel = _d === void 0 ? '' : _d,
    navigationAriaLive = _a.navigationAriaLive,
    navigationLabel = _a.navigationLabel,
    _e = _a.next2AriaLabel,
    next2AriaLabel = _e === void 0 ? '' : _e,
    _f = _a.next2Label,
    next2Label = _f === void 0 ? '»' : _f,
    _g = _a.nextAriaLabel,
    nextAriaLabel = _g === void 0 ? '' : _g,
    _h = _a.nextLabel,
    nextLabel = _h === void 0 ? '›' : _h,
    _j = _a.prev2AriaLabel,
    prev2AriaLabel = _j === void 0 ? '' : _j,
    _k = _a.prev2Label,
    prev2Label = _k === void 0 ? '«' : _k,
    _l = _a.prevAriaLabel,
    prevAriaLabel = _l === void 0 ? '' : _l,
    _m = _a.prevLabel,
    prevLabel = _m === void 0 ? '‹' : _m,
    setActiveStartDate = _a.setActiveStartDate,
    showDoubleView = _a.showDoubleView,
    view = _a.view,
    views = _a.views;
  var drillUpAvailable = views.indexOf(view) > 0;
  var shouldShowPrevNext2Buttons = view !== 'century';
  var previousActiveStartDate = getBeginPrevious(view, activeStartDate);
  var previousActiveStartDate2 = shouldShowPrevNext2Buttons ? getBeginPrevious2(view, activeStartDate) : undefined;
  var nextActiveStartDate = getBeginNext(view, activeStartDate);
  var nextActiveStartDate2 = shouldShowPrevNext2Buttons ? getBeginNext2(view, activeStartDate) : undefined;
  var prevButtonDisabled = function () {
    if (previousActiveStartDate.getFullYear() < 0) {
      return true;
    }
    var previousActiveEndDate = getEndPrevious(view, activeStartDate);
    return minDate && minDate >= previousActiveEndDate;
  }();
  var prev2ButtonDisabled = shouldShowPrevNext2Buttons && function () {
    if (previousActiveStartDate2.getFullYear() < 0) {
      return true;
    }
    var previousActiveEndDate = getEndPrevious2(view, activeStartDate);
    return minDate && minDate >= previousActiveEndDate;
  }();
  var nextButtonDisabled = maxDate && maxDate < nextActiveStartDate;
  var next2ButtonDisabled = shouldShowPrevNext2Buttons && maxDate && maxDate < nextActiveStartDate2;
  function onClickPrevious() {
    setActiveStartDate(previousActiveStartDate, 'prev');
  }
  function onClickPrevious2() {
    setActiveStartDate(previousActiveStartDate2, 'prev2');
  }
  function onClickNext() {
    setActiveStartDate(nextActiveStartDate, 'next');
  }
  function onClickNext2() {
    setActiveStartDate(nextActiveStartDate2, 'next2');
  }
  function renderLabel(date) {
    var label = function () {
      switch (view) {
        case 'century':
          return getCenturyLabel(locale, formatYear$1, date);
        case 'decade':
          return getDecadeLabel(locale, formatYear$1, date);
        case 'year':
          return formatYear$1(locale, date);
        case 'month':
          return formatMonthYear$1(locale, date);
        default:
          throw new Error("Invalid view: ".concat(view, "."));
      }
    }();
    return navigationLabel ? navigationLabel({
      date: date,
      label: label,
      locale: locale || getUserLocale() || undefined,
      view: view
    }) : label;
  }
  function renderButton() {
    var labelClassName = "".concat(className$6, "__label");
    return jsxs("button", {
      "aria-label": navigationAriaLabel,
      "aria-live": navigationAriaLive,
      className: labelClassName,
      disabled: !drillUpAvailable,
      onClick: drillUp,
      style: {
        flexGrow: 1
      },
      type: "button",
      children: [jsx("span", {
        className: "".concat(labelClassName, "__labelText ").concat(labelClassName, "__labelText--from"),
        children: renderLabel(activeStartDate)
      }), showDoubleView ? jsxs(Fragment, {
        children: [jsx("span", {
          className: "".concat(labelClassName, "__divider"),
          children: " \u2013 "
        }), jsx("span", {
          className: "".concat(labelClassName, "__labelText ").concat(labelClassName, "__labelText--to"),
          children: renderLabel(nextActiveStartDate)
        })]
      }) : null]
    });
  }
  return jsxs("div", {
    className: className$6,
    children: [prev2Label !== null && shouldShowPrevNext2Buttons ? jsx("button", {
      "aria-label": prev2AriaLabel,
      className: "".concat(className$6, "__arrow ").concat(className$6, "__prev2-button"),
      disabled: prev2ButtonDisabled,
      onClick: onClickPrevious2,
      type: "button",
      children: prev2Label
    }) : null, prevLabel !== null && jsx("button", {
      "aria-label": prevAriaLabel,
      className: "".concat(className$6, "__arrow ").concat(className$6, "__prev-button"),
      disabled: prevButtonDisabled,
      onClick: onClickPrevious,
      type: "button",
      children: prevLabel
    }), renderButton(), nextLabel !== null && jsx("button", {
      "aria-label": nextAriaLabel,
      className: "".concat(className$6, "__arrow ").concat(className$6, "__next-button"),
      disabled: nextButtonDisabled,
      onClick: onClickNext,
      type: "button",
      children: nextLabel
    }), next2Label !== null && shouldShowPrevNext2Buttons ? jsx("button", {
      "aria-label": next2AriaLabel,
      className: "".concat(className$6, "__arrow ").concat(className$6, "__next2-button"),
      disabled: next2ButtonDisabled,
      onClick: onClickNext2,
      type: "button",
      children: next2Label
    }) : null]
  });
}

var __assign$k = undefined && undefined.__assign || function () {
  __assign$k = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$k.apply(this, arguments);
};
var __rest$f = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function toPercent(num) {
  return "".concat(num, "%");
}
function Flex(_a) {
  var children = _a.children,
    className = _a.className,
    count = _a.count,
    direction = _a.direction,
    offset = _a.offset,
    style = _a.style,
    wrap = _a.wrap,
    otherProps = __rest$f(_a, ["children", "className", "count", "direction", "offset", "style", "wrap"]);
  return jsx("div", __assign$k({
    className: className,
    style: __assign$k({
      display: 'flex',
      flexDirection: direction,
      flexWrap: wrap ? 'wrap' : 'nowrap'
    }, style)
  }, otherProps, {
    children: Children.map(children, function (child, index) {
      var marginInlineStart = offset && index === 0 ? toPercent(100 * offset / count) : null;
      return cloneElement(child, __assign$k(__assign$k({}, child.props), {
        style: {
          flexBasis: toPercent(100 / count),
          flexShrink: 0,
          flexGrow: 0,
          overflow: 'hidden',
          marginLeft: marginInlineStart,
          marginInlineStart: marginInlineStart,
          marginInlineEnd: 0
        }
      }));
    })
  }));
}

/**
 * Returns a value no smaller than min and no larger than max.
 *
 * @param {Date} value Value to return.
 * @param {Date} min Minimum return value.
 * @param {Date} max Maximum return value.
 * @returns {Date} Value between min and max.
 */
function between$1(value, min, max) {
  if (min && min > value) {
    return min;
  }
  if (max && max < value) {
    return max;
  }
  return value;
}
function isValueWithinRange(value, range) {
  return range[0] <= value && range[1] >= value;
}
function isRangeWithinRange(greaterRange, smallerRange) {
  return greaterRange[0] <= smallerRange[0] && greaterRange[1] >= smallerRange[1];
}
function doRangesOverlap(range1, range2) {
  return isValueWithinRange(range1[0], range2) || isValueWithinRange(range1[1], range2);
}
function getRangeClassNames(valueRange, dateRange, baseClassName) {
  var isRange = doRangesOverlap(dateRange, valueRange);
  var classes = [];
  if (isRange) {
    classes.push(baseClassName);
    var isRangeStart = isValueWithinRange(valueRange[0], dateRange);
    var isRangeEnd = isValueWithinRange(valueRange[1], dateRange);
    if (isRangeStart) {
      classes.push("".concat(baseClassName, "Start"));
    }
    if (isRangeEnd) {
      classes.push("".concat(baseClassName, "End"));
    }
    if (isRangeStart && isRangeEnd) {
      classes.push("".concat(baseClassName, "BothEnds"));
    }
  }
  return classes;
}
function isCompleteValue(value) {
  if (Array.isArray(value)) {
    return value[0] !== null && value[1] !== null;
  }
  return value !== null;
}
function getTileClasses(args) {
  if (!args) {
    throw new Error('args is required');
  }
  var value = args.value,
    date = args.date,
    hover = args.hover;
  var className = 'react-calendar__tile';
  var classes = [className];
  if (!date) {
    return classes;
  }
  var now = new Date();
  var dateRange = function () {
    if (Array.isArray(date)) {
      return date;
    }
    var dateType = args.dateType;
    if (!dateType) {
      throw new Error('dateType is required when date is not an array of two dates');
    }
    return getRange(dateType, date);
  }();
  if (isValueWithinRange(now, dateRange)) {
    classes.push("".concat(className, "--now"));
  }
  if (!value || !isCompleteValue(value)) {
    return classes;
  }
  var valueRange = function () {
    if (Array.isArray(value)) {
      return value;
    }
    var valueType = args.valueType;
    if (!valueType) {
      throw new Error('valueType is required when value is not an array of two dates');
    }
    return getRange(valueType, value);
  }();
  if (isRangeWithinRange(valueRange, dateRange)) {
    classes.push("".concat(className, "--active"));
  } else if (doRangesOverlap(valueRange, dateRange)) {
    classes.push("".concat(className, "--hasActive"));
  }
  var valueRangeClassNames = getRangeClassNames(valueRange, dateRange, "".concat(className, "--range"));
  classes.push.apply(classes, valueRangeClassNames);
  var valueArray = Array.isArray(value) ? value : [value];
  if (hover && valueArray.length === 1) {
    var hoverRange = hover > valueRange[0] ? [valueRange[0], hover] : [hover, valueRange[0]];
    var hoverRangeClassNames = getRangeClassNames(hoverRange, dateRange, "".concat(className, "--hover"));
    classes.push.apply(classes, hoverRangeClassNames);
  }
  return classes;
}

function TileGroup(_a) {
  var className = _a.className,
    _b = _a.count,
    count = _b === void 0 ? 3 : _b,
    dateTransform = _a.dateTransform,
    dateType = _a.dateType,
    end = _a.end,
    hover = _a.hover,
    offset = _a.offset,
    renderTile = _a.renderTile,
    start = _a.start,
    _c = _a.step,
    step = _c === void 0 ? 1 : _c,
    value = _a.value,
    valueType = _a.valueType;
  var tiles = [];
  for (var point = start; point <= end; point += step) {
    var date = dateTransform(point);
    tiles.push(renderTile({
      classes: getTileClasses({
        date: date,
        dateType: dateType,
        hover: hover,
        value: value,
        valueType: valueType
      }),
      date: date
    }));
  }
  return jsx(Flex, {
    className: className,
    count: count,
    offset: offset,
    wrap: true,
    children: tiles
  });
}

function Tile(props) {
  var activeStartDate = props.activeStartDate,
    children = props.children,
    classes = props.classes,
    date = props.date,
    formatAbbr = props.formatAbbr,
    locale = props.locale,
    maxDate = props.maxDate,
    maxDateTransform = props.maxDateTransform,
    minDate = props.minDate,
    minDateTransform = props.minDateTransform,
    onClick = props.onClick,
    onMouseOver = props.onMouseOver,
    style = props.style,
    tileClassNameProps = props.tileClassName,
    tileContentProps = props.tileContent,
    tileDisabled = props.tileDisabled,
    view = props.view;
  var tileClassName = useMemo(function () {
    var args = {
      activeStartDate: activeStartDate,
      date: date,
      view: view
    };
    return typeof tileClassNameProps === 'function' ? tileClassNameProps(args) : tileClassNameProps;
  }, [activeStartDate, date, tileClassNameProps, view]);
  var tileContent = useMemo(function () {
    var args = {
      activeStartDate: activeStartDate,
      date: date,
      view: view
    };
    return typeof tileContentProps === 'function' ? tileContentProps(args) : tileContentProps;
  }, [activeStartDate, date, tileContentProps, view]);
  return jsxs("button", {
    className: clsx(classes, tileClassName),
    disabled: minDate && minDateTransform(minDate) > date || maxDate && maxDateTransform(maxDate) < date || (tileDisabled === null || tileDisabled === void 0 ? void 0 : tileDisabled({
      activeStartDate: activeStartDate,
      date: date,
      view: view
    })),
    onClick: onClick ? function (event) {
      return onClick(date, event);
    } : undefined,
    onFocus: onMouseOver ? function () {
      return onMouseOver(date);
    } : undefined,
    onMouseOver: onMouseOver ? function () {
      return onMouseOver(date);
    } : undefined,
    style: style,
    type: "button",
    children: [formatAbbr ? jsx("abbr", {
      "aria-label": formatAbbr(locale, date),
      children: children
    }) : children, tileContent]
  });
}

var __assign$j = undefined && undefined.__assign || function () {
  __assign$j = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$j.apply(this, arguments);
};
var __rest$e = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var className$5 = 'react-calendar__century-view__decades__decade';
function Decade(_a) {
  var _b = _a.classes,
    classes = _b === void 0 ? [] : _b,
    currentCentury = _a.currentCentury,
    _c = _a.formatYear,
    formatYear$1 = _c === void 0 ? formatYear : _c,
    otherProps = __rest$e(_a, ["classes", "currentCentury", "formatYear"]);
  var date = otherProps.date,
    locale = otherProps.locale;
  var classesProps = [];
  if (classes) {
    classesProps.push.apply(classesProps, classes);
  }
  if (className$5) {
    classesProps.push(className$5);
  }
  if (getCenturyStart(date).getFullYear() !== currentCentury) {
    classesProps.push("".concat(className$5, "--neighboringCentury"));
  }
  return jsx(Tile, __assign$j({}, otherProps, {
    classes: classesProps,
    maxDateTransform: getDecadeEnd,
    minDateTransform: getDecadeStart,
    view: "century",
    children: getDecadeLabel(locale, formatYear$1, date)
  }));
}

var __assign$i = undefined && undefined.__assign || function () {
  __assign$i = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$i.apply(this, arguments);
};
var __rest$d = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function Decades(props) {
  var activeStartDate = props.activeStartDate,
    hover = props.hover,
    showNeighboringCentury = props.showNeighboringCentury,
    value = props.value,
    valueType = props.valueType,
    otherProps = __rest$d(props, ["activeStartDate", "hover", "showNeighboringCentury", "value", "valueType"]);
  var start = getBeginOfCenturyYear(activeStartDate);
  var end = start + (showNeighboringCentury ? 119 : 99);
  return jsx(TileGroup, {
    className: "react-calendar__century-view__decades",
    dateTransform: getDecadeStart,
    dateType: "decade",
    end: end,
    hover: hover,
    renderTile: function (_a) {
      var date = _a.date,
        otherTileProps = __rest$d(_a, ["date"]);
      return jsx(Decade, __assign$i({}, otherProps, otherTileProps, {
        activeStartDate: activeStartDate,
        currentCentury: start,
        date: date
      }), date.getTime());
    },
    start: start,
    step: 10,
    value: value,
    valueType: valueType
  });
}

var __assign$h = undefined && undefined.__assign || function () {
  __assign$h = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$h.apply(this, arguments);
};
/**
 * Displays a given century.
 */
function CenturyView(props) {
  function renderDecades() {
    return jsx(Decades, __assign$h({}, props));
  }
  return jsx("div", {
    className: "react-calendar__century-view",
    children: renderDecades()
  });
}

var __assign$g = undefined && undefined.__assign || function () {
  __assign$g = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$g.apply(this, arguments);
};
var __rest$c = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var className$4 = 'react-calendar__decade-view__years__year';
function Year(_a) {
  var _b = _a.classes,
    classes = _b === void 0 ? [] : _b,
    currentDecade = _a.currentDecade,
    _c = _a.formatYear,
    formatYear$1 = _c === void 0 ? formatYear : _c,
    otherProps = __rest$c(_a, ["classes", "currentDecade", "formatYear"]);
  var date = otherProps.date,
    locale = otherProps.locale;
  var classesProps = [];
  if (classes) {
    classesProps.push.apply(classesProps, classes);
  }
  if (className$4) {
    classesProps.push(className$4);
  }
  if (getDecadeStart(date).getFullYear() !== currentDecade) {
    classesProps.push("".concat(className$4, "--neighboringDecade"));
  }
  return jsx(Tile, __assign$g({}, otherProps, {
    classes: classesProps,
    maxDateTransform: getYearEnd,
    minDateTransform: getYearStart,
    view: "decade",
    children: formatYear$1(locale, date)
  }));
}

var __assign$f = undefined && undefined.__assign || function () {
  __assign$f = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$f.apply(this, arguments);
};
var __rest$b = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function Years(props) {
  var activeStartDate = props.activeStartDate,
    hover = props.hover,
    showNeighboringDecade = props.showNeighboringDecade,
    value = props.value,
    valueType = props.valueType,
    otherProps = __rest$b(props, ["activeStartDate", "hover", "showNeighboringDecade", "value", "valueType"]);
  var start = getBeginOfDecadeYear(activeStartDate);
  var end = start + (showNeighboringDecade ? 11 : 9);
  return jsx(TileGroup, {
    className: "react-calendar__decade-view__years",
    dateTransform: getYearStart,
    dateType: "year",
    end: end,
    hover: hover,
    renderTile: function (_a) {
      var date = _a.date,
        otherTileProps = __rest$b(_a, ["date"]);
      return jsx(Year, __assign$f({}, otherProps, otherTileProps, {
        activeStartDate: activeStartDate,
        currentDecade: start,
        date: date
      }), date.getTime());
    },
    start: start,
    value: value,
    valueType: valueType
  });
}

var __assign$e = undefined && undefined.__assign || function () {
  __assign$e = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$e.apply(this, arguments);
};
/**
 * Displays a given decade.
 */
function DecadeView(props) {
  function renderYears() {
    return jsx(Years, __assign$e({}, props));
  }
  return jsx("div", {
    className: "react-calendar__decade-view",
    children: renderYears()
  });
}

var __assign$d = undefined && undefined.__assign || function () {
  __assign$d = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$d.apply(this, arguments);
};
var __rest$a = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var __spreadArray$2 = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var className$3 = 'react-calendar__year-view__months__month';
function Month(_a) {
  var _b = _a.classes,
    classes = _b === void 0 ? [] : _b,
    _c = _a.formatMonth,
    formatMonth = _c === void 0 ? formatMonth$1 : _c,
    _d = _a.formatMonthYear,
    formatMonthYear$1 = _d === void 0 ? formatMonthYear : _d,
    otherProps = __rest$a(_a, ["classes", "formatMonth", "formatMonthYear"]);
  var date = otherProps.date,
    locale = otherProps.locale;
  return jsx(Tile, __assign$d({}, otherProps, {
    classes: __spreadArray$2(__spreadArray$2([], classes, true), [className$3], false),
    formatAbbr: formatMonthYear$1,
    maxDateTransform: getMonthEnd,
    minDateTransform: getMonthStart,
    view: "year",
    children: formatMonth(locale, date)
  }));
}

var __assign$c = undefined && undefined.__assign || function () {
  __assign$c = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$c.apply(this, arguments);
};
var __rest$9 = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function Months(props) {
  var activeStartDate = props.activeStartDate,
    hover = props.hover,
    value = props.value,
    valueType = props.valueType,
    otherProps = __rest$9(props, ["activeStartDate", "hover", "value", "valueType"]);
  var start = 0;
  var end = 11;
  var year = getYear(activeStartDate);
  return jsx(TileGroup, {
    className: "react-calendar__year-view__months",
    dateTransform: function (monthIndex) {
      var date = new Date();
      date.setFullYear(year, monthIndex, 1);
      return getMonthStart(date);
    },
    dateType: "month",
    end: end,
    hover: hover,
    renderTile: function (_a) {
      var date = _a.date,
        otherTileProps = __rest$9(_a, ["date"]);
      return jsx(Month, __assign$c({}, otherProps, otherTileProps, {
        activeStartDate: activeStartDate,
        date: date
      }), date.getTime());
    },
    start: start,
    value: value,
    valueType: valueType
  });
}

var __assign$b = undefined && undefined.__assign || function () {
  __assign$b = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$b.apply(this, arguments);
};
/**
 * Displays a given year.
 */
function YearView(props) {
  function renderMonths() {
    return jsx(Months, __assign$b({}, props));
  }
  return jsx("div", {
    className: "react-calendar__year-view",
    children: renderMonths()
  });
}

var __assign$a = undefined && undefined.__assign || function () {
  __assign$a = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$a.apply(this, arguments);
};
var __rest$8 = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var className$2 = 'react-calendar__month-view__days__day';
function Day(_a) {
  var calendarType = _a.calendarType,
    _b = _a.classes,
    classes = _b === void 0 ? [] : _b,
    currentMonthIndex = _a.currentMonthIndex,
    _c = _a.formatDay,
    formatDay$1 = _c === void 0 ? formatDay : _c,
    _d = _a.formatLongDate,
    formatLongDate$1 = _d === void 0 ? formatLongDate : _d,
    otherProps = __rest$8(_a, ["calendarType", "classes", "currentMonthIndex", "formatDay", "formatLongDate"]);
  var date = otherProps.date,
    locale = otherProps.locale;
  var classesProps = [];
  if (classes) {
    classesProps.push.apply(classesProps, classes);
  }
  if (className$2) {
    classesProps.push(className$2);
  }
  if (isWeekend(date, calendarType)) {
    classesProps.push("".concat(className$2, "--weekend"));
  }
  if (date.getMonth() !== currentMonthIndex) {
    classesProps.push("".concat(className$2, "--neighboringMonth"));
  }
  return jsx(Tile, __assign$a({}, otherProps, {
    classes: classesProps,
    formatAbbr: formatLongDate$1,
    maxDateTransform: getDayEnd,
    minDateTransform: getDayStart,
    view: "month",
    children: formatDay$1(locale, date)
  }));
}

var __assign$9 = undefined && undefined.__assign || function () {
  __assign$9 = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$9.apply(this, arguments);
};
var __rest$7 = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function Days(props) {
  var activeStartDate = props.activeStartDate,
    calendarType = props.calendarType,
    hover = props.hover,
    showFixedNumberOfWeeks = props.showFixedNumberOfWeeks,
    showNeighboringMonth = props.showNeighboringMonth,
    value = props.value,
    valueType = props.valueType,
    otherProps = __rest$7(props, ["activeStartDate", "calendarType", "hover", "showFixedNumberOfWeeks", "showNeighboringMonth", "value", "valueType"]);
  var year = getYear(activeStartDate);
  var monthIndex = getMonth(activeStartDate);
  var hasFixedNumberOfWeeks = showFixedNumberOfWeeks || showNeighboringMonth;
  var dayOfWeek = getDayOfWeek(activeStartDate, calendarType);
  var offset = hasFixedNumberOfWeeks ? 0 : dayOfWeek;
  /**
   * Defines on which day of the month the grid shall start. If we simply show current
   * month, we obviously start on day one, but if showNeighboringMonth is set to
   * true, we need to find the beginning of the week the first day of the month is in.
   */
  var start = (hasFixedNumberOfWeeks ? -dayOfWeek : 0) + 1;
  /**
   * Defines on which day of the month the grid shall end. If we simply show current
   * month, we need to stop on the last day of the month, but if showNeighboringMonth
   * is set to true, we need to find the end of the week the last day of the month is in.
   */
  var end = function () {
    if (showFixedNumberOfWeeks) {
      // Always show 6 weeks
      return start + 6 * 7 - 1;
    }
    var daysInMonth = getDaysInMonth(activeStartDate);
    if (showNeighboringMonth) {
      var activeEndDate = new Date();
      activeEndDate.setFullYear(year, monthIndex, daysInMonth);
      activeEndDate.setHours(0, 0, 0, 0);
      var daysUntilEndOfTheWeek = 7 - getDayOfWeek(activeEndDate, calendarType) - 1;
      return daysInMonth + daysUntilEndOfTheWeek;
    }
    return daysInMonth;
  }();
  return jsx(TileGroup, {
    className: "react-calendar__month-view__days",
    count: 7,
    dateTransform: function (day) {
      var date = new Date();
      date.setFullYear(year, monthIndex, day);
      return getDayStart(date);
    },
    dateType: "day",
    hover: hover,
    end: end,
    renderTile: function (_a) {
      var date = _a.date,
        otherTileProps = __rest$7(_a, ["date"]);
      return jsx(Day, __assign$9({}, otherProps, otherTileProps, {
        activeStartDate: activeStartDate,
        calendarType: calendarType,
        currentMonthIndex: monthIndex,
        date: date
      }), date.getTime());
    },
    offset: offset,
    start: start,
    value: value,
    valueType: valueType
  });
}

var className$1 = 'react-calendar__month-view__weekdays';
var weekdayClassName = "".concat(className$1, "__weekday");
function Weekdays(props) {
  var calendarType = props.calendarType,
    _a = props.formatShortWeekday,
    formatShortWeekday$1 = _a === void 0 ? formatShortWeekday : _a,
    _b = props.formatWeekday,
    formatWeekday$1 = _b === void 0 ? formatWeekday : _b,
    locale = props.locale,
    onMouseLeave = props.onMouseLeave;
  var anyDate = new Date();
  var beginOfMonth = getMonthStart(anyDate);
  var year = getYear(beginOfMonth);
  var monthIndex = getMonth(beginOfMonth);
  var weekdays = [];
  for (var weekday = 1; weekday <= 7; weekday += 1) {
    var weekdayDate = new Date(year, monthIndex, weekday - getDayOfWeek(beginOfMonth, calendarType));
    var abbr = formatWeekday$1(locale, weekdayDate);
    weekdays.push(jsx("div", {
      className: clsx(weekdayClassName, isCurrentDayOfWeek(weekdayDate) && "".concat(weekdayClassName, "--current"), isWeekend(weekdayDate, calendarType) && "".concat(weekdayClassName, "--weekend")),
      children: jsx("abbr", {
        "aria-label": abbr,
        title: abbr,
        children: formatShortWeekday$1(locale, weekdayDate).replace('.', '')
      })
    }, weekday));
  }
  return jsx(Flex, {
    className: className$1,
    count: 7,
    onFocus: onMouseLeave,
    onMouseOver: onMouseLeave,
    children: weekdays
  });
}

var __assign$8 = undefined && undefined.__assign || function () {
  __assign$8 = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$8.apply(this, arguments);
};
var __rest$6 = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var className = 'react-calendar__tile';
function WeekNumber(props) {
  var onClickWeekNumber = props.onClickWeekNumber,
    weekNumber = props.weekNumber;
  var children = jsx("span", {
    children: weekNumber
  });
  if (onClickWeekNumber) {
    var date_1 = props.date,
      onClickWeekNumber_1 = props.onClickWeekNumber,
      weekNumber_1 = props.weekNumber,
      otherProps = __rest$6(props, ["date", "onClickWeekNumber", "weekNumber"]);
    return jsx("button", __assign$8({}, otherProps, {
      className: className,
      onClick: function (event) {
        return onClickWeekNumber_1(weekNumber_1, date_1, event);
      },
      type: "button",
      children: children
    }));
    // biome-ignore lint/style/noUselessElse: TypeScript is unhappy if we remove this else
  } else {
    props.date;
      props.onClickWeekNumber;
      props.weekNumber;
      var otherProps = __rest$6(props, ["date", "onClickWeekNumber", "weekNumber"]);
    return jsx("div", __assign$8({}, otherProps, {
      className: className,
      children: children
    }));
  }
}

function WeekNumbers(props) {
  var activeStartDate = props.activeStartDate,
    calendarType = props.calendarType,
    onClickWeekNumber = props.onClickWeekNumber,
    onMouseLeave = props.onMouseLeave,
    showFixedNumberOfWeeks = props.showFixedNumberOfWeeks;
  var numberOfWeeks = function () {
    if (showFixedNumberOfWeeks) {
      return 6;
    }
    var numberOfDays = getDaysInMonth(activeStartDate);
    var startWeekday = getDayOfWeek(activeStartDate, calendarType);
    var days = numberOfDays - (7 - startWeekday);
    return 1 + Math.ceil(days / 7);
  }();
  var dates = function () {
    var year = getYear(activeStartDate);
    var monthIndex = getMonth(activeStartDate);
    var day = getDate(activeStartDate);
    var result = [];
    for (var index = 0; index < numberOfWeeks; index += 1) {
      result.push(getBeginOfWeek(new Date(year, monthIndex, day + index * 7), calendarType));
    }
    return result;
  }();
  var weekNumbers = dates.map(function (date) {
    return getWeekNumber(date, calendarType);
  });
  return jsx(Flex, {
    className: "react-calendar__month-view__weekNumbers",
    count: numberOfWeeks,
    direction: "column",
    onFocus: onMouseLeave,
    onMouseOver: onMouseLeave,
    style: {
      flexBasis: 'calc(100% * (1 / 8)',
      flexShrink: 0
    },
    children: weekNumbers.map(function (weekNumber, weekIndex) {
      var date = dates[weekIndex];
      if (!date) {
        throw new Error('date is not defined');
      }
      return jsx(WeekNumber, {
        date: date,
        onClickWeekNumber: onClickWeekNumber,
        weekNumber: weekNumber
      }, weekNumber);
    })
  });
}

var __assign$7 = undefined && undefined.__assign || function () {
  __assign$7 = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$7.apply(this, arguments);
};
var __rest$5 = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getCalendarTypeFromLocale(locale) {
  if (locale) {
    for (var _i = 0, _a = Object.entries(CALENDAR_TYPE_LOCALES); _i < _a.length; _i++) {
      var _b = _a[_i],
        calendarType = _b[0],
        locales = _b[1];
      if (locales.includes(locale)) {
        return calendarType;
      }
    }
  }
  return CALENDAR_TYPES.ISO_8601;
}
/**
 * Displays a given month.
 */
function MonthView(props) {
  var activeStartDate = props.activeStartDate,
    locale = props.locale,
    onMouseLeave = props.onMouseLeave,
    showFixedNumberOfWeeks = props.showFixedNumberOfWeeks;
  var _a = props.calendarType,
    calendarType = _a === void 0 ? getCalendarTypeFromLocale(locale) : _a,
    formatShortWeekday = props.formatShortWeekday,
    formatWeekday = props.formatWeekday,
    onClickWeekNumber = props.onClickWeekNumber,
    showWeekNumbers = props.showWeekNumbers,
    childProps = __rest$5(props, ["calendarType", "formatShortWeekday", "formatWeekday", "onClickWeekNumber", "showWeekNumbers"]);
  function renderWeekdays() {
    return jsx(Weekdays, {
      calendarType: calendarType,
      formatShortWeekday: formatShortWeekday,
      formatWeekday: formatWeekday,
      locale: locale,
      onMouseLeave: onMouseLeave
    });
  }
  function renderWeekNumbers() {
    if (!showWeekNumbers) {
      return null;
    }
    return jsx(WeekNumbers, {
      activeStartDate: activeStartDate,
      calendarType: calendarType,
      onClickWeekNumber: onClickWeekNumber,
      onMouseLeave: onMouseLeave,
      showFixedNumberOfWeeks: showFixedNumberOfWeeks
    });
  }
  function renderDays() {
    return jsx(Days, __assign$7({
      calendarType: calendarType
    }, childProps));
  }
  var className = 'react-calendar__month-view';
  return jsx("div", {
    className: clsx(className, showWeekNumbers ? "".concat(className, "--weekNumbers") : ''),
    children: jsxs("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end'
      },
      children: [renderWeekNumbers(), jsxs("div", {
        style: {
          flexGrow: 1,
          width: '100%'
        },
        children: [renderWeekdays(), renderDays()]
      })]
    })
  });
}

var __assign$6 = undefined && undefined.__assign || function () {
  __assign$6 = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$6.apply(this, arguments);
};
var baseClassName$1 = 'react-calendar';
var allViews$1 = ['century', 'decade', 'year', 'month'];
var allValueTypes$1 = ['decade', 'year', 'month', 'day'];
var defaultMinDate$1 = new Date();
defaultMinDate$1.setFullYear(1, 0, 1);
defaultMinDate$1.setHours(0, 0, 0, 0);
var defaultMaxDate$1 = new Date(8.64e15);
function toDate$1(value) {
  if (value instanceof Date) {
    return value;
  }
  return new Date(value);
}
/**
 * Returns views array with disallowed values cut off.
 */
function getLimitedViews(minDetail, maxDetail) {
  return allViews$1.slice(allViews$1.indexOf(minDetail), allViews$1.indexOf(maxDetail) + 1);
}
/**
 * Determines whether a given view is allowed with currently applied settings.
 */
function isViewAllowed(view, minDetail, maxDetail) {
  var views = getLimitedViews(minDetail, maxDetail);
  return views.indexOf(view) !== -1;
}
/**
 * Gets either provided view if allowed by minDetail and maxDetail, or gets
 * the default view if not allowed.
 */
function getView(view, minDetail, maxDetail) {
  if (!view) {
    return maxDetail;
  }
  if (isViewAllowed(view, minDetail, maxDetail)) {
    return view;
  }
  return maxDetail;
}
/**
 * Returns value type that can be returned with currently applied settings.
 */
function getValueType$1(view) {
  var index = allViews$1.indexOf(view);
  return allValueTypes$1[index];
}
function getValue$1(value, index) {
  var rawValue = Array.isArray(value) ? value[index] : value;
  if (!rawValue) {
    return null;
  }
  var valueDate = toDate$1(rawValue);
  if (Number.isNaN(valueDate.getTime())) {
    throw new Error("Invalid date: ".concat(value));
  }
  return valueDate;
}
function getDetailValue$1(_a, index) {
  var value = _a.value,
    minDate = _a.minDate,
    maxDate = _a.maxDate,
    maxDetail = _a.maxDetail;
  var valuePiece = getValue$1(value, index);
  if (!valuePiece) {
    return null;
  }
  var valueType = getValueType$1(maxDetail);
  var detailValueFrom = function () {
    switch (index) {
      case 0:
        return getBegin$1(valueType, valuePiece);
      case 1:
        return getEnd$1(valueType, valuePiece);
      default:
        throw new Error("Invalid index value: ".concat(index));
    }
  }();
  return between$1(detailValueFrom, minDate, maxDate);
}
var getDetailValueFrom$1 = function (args) {
  return getDetailValue$1(args, 0);
};
var getDetailValueTo$1 = function (args) {
  return getDetailValue$1(args, 1);
};
var getDetailValueArray$1 = function (args) {
  return [getDetailValueFrom$1, getDetailValueTo$1].map(function (fn) {
    return fn(args);
  });
};
function getActiveStartDate(_a) {
  var maxDate = _a.maxDate,
    maxDetail = _a.maxDetail,
    minDate = _a.minDate,
    minDetail = _a.minDetail,
    value = _a.value,
    view = _a.view;
  var rangeType = getView(view, minDetail, maxDetail);
  var valueFrom = getDetailValueFrom$1({
    value: value,
    minDate: minDate,
    maxDate: maxDate,
    maxDetail: maxDetail
  }) || new Date();
  return getBegin$1(rangeType, valueFrom);
}
function getInitialActiveStartDate(_a) {
  var activeStartDate = _a.activeStartDate,
    defaultActiveStartDate = _a.defaultActiveStartDate,
    defaultValue = _a.defaultValue,
    defaultView = _a.defaultView,
    maxDate = _a.maxDate,
    maxDetail = _a.maxDetail,
    minDate = _a.minDate,
    minDetail = _a.minDetail,
    value = _a.value,
    view = _a.view;
  var rangeType = getView(view, minDetail, maxDetail);
  var valueFrom = activeStartDate || defaultActiveStartDate;
  if (valueFrom) {
    return getBegin$1(rangeType, valueFrom);
  }
  return getActiveStartDate({
    maxDate: maxDate,
    maxDetail: maxDetail,
    minDate: minDate,
    minDetail: minDetail,
    value: value || defaultValue,
    view: view || defaultView
  });
}
function getIsSingleValue(value) {
  return value && (!Array.isArray(value) || value.length === 1);
}
function areDatesEqual(date1, date2) {
  return date1 instanceof Date && date2 instanceof Date && date1.getTime() === date2.getTime();
}
var Calendar = forwardRef(function Calendar(props, ref) {
  var activeStartDateProps = props.activeStartDate,
    allowPartialRange = props.allowPartialRange,
    calendarType = props.calendarType,
    className = props.className,
    defaultActiveStartDate = props.defaultActiveStartDate,
    defaultValue = props.defaultValue,
    defaultView = props.defaultView,
    formatDay = props.formatDay,
    formatLongDate = props.formatLongDate,
    formatMonth = props.formatMonth,
    formatMonthYear = props.formatMonthYear,
    formatShortWeekday = props.formatShortWeekday,
    formatWeekday = props.formatWeekday,
    formatYear = props.formatYear,
    _a = props.goToRangeStartOnSelect,
    goToRangeStartOnSelect = _a === void 0 ? true : _a,
    inputRef = props.inputRef,
    locale = props.locale,
    _b = props.maxDate,
    maxDate = _b === void 0 ? defaultMaxDate$1 : _b,
    _c = props.maxDetail,
    maxDetail = _c === void 0 ? 'month' : _c,
    _d = props.minDate,
    minDate = _d === void 0 ? defaultMinDate$1 : _d,
    _e = props.minDetail,
    minDetail = _e === void 0 ? 'century' : _e,
    navigationAriaLabel = props.navigationAriaLabel,
    navigationAriaLive = props.navigationAriaLive,
    navigationLabel = props.navigationLabel,
    next2AriaLabel = props.next2AriaLabel,
    next2Label = props.next2Label,
    nextAriaLabel = props.nextAriaLabel,
    nextLabel = props.nextLabel,
    onActiveStartDateChange = props.onActiveStartDateChange,
    onChangeProps = props.onChange,
    onClickDay = props.onClickDay,
    onClickDecade = props.onClickDecade,
    onClickMonth = props.onClickMonth,
    onClickWeekNumber = props.onClickWeekNumber,
    onClickYear = props.onClickYear,
    onDrillDown = props.onDrillDown,
    onDrillUp = props.onDrillUp,
    onViewChange = props.onViewChange,
    prev2AriaLabel = props.prev2AriaLabel,
    prev2Label = props.prev2Label,
    prevAriaLabel = props.prevAriaLabel,
    prevLabel = props.prevLabel,
    _f = props.returnValue,
    returnValue = _f === void 0 ? 'start' : _f,
    selectRange = props.selectRange,
    showDoubleView = props.showDoubleView,
    showFixedNumberOfWeeks = props.showFixedNumberOfWeeks,
    _g = props.showNavigation,
    showNavigation = _g === void 0 ? true : _g,
    showNeighboringCentury = props.showNeighboringCentury,
    showNeighboringDecade = props.showNeighboringDecade,
    _h = props.showNeighboringMonth,
    showNeighboringMonth = _h === void 0 ? true : _h,
    showWeekNumbers = props.showWeekNumbers,
    tileClassName = props.tileClassName,
    tileContent = props.tileContent,
    tileDisabled = props.tileDisabled,
    valueProps = props.value,
    viewProps = props.view;
  var _j = useState(defaultActiveStartDate),
    activeStartDateState = _j[0],
    setActiveStartDateState = _j[1];
  var _k = useState(null),
    hoverState = _k[0],
    setHoverState = _k[1];
  var _l = useState(Array.isArray(defaultValue) ? defaultValue.map(function (el) {
      return el !== null ? toDate$1(el) : null;
    }) : defaultValue !== null && defaultValue !== undefined ? toDate$1(defaultValue) : null),
    valueState = _l[0],
    setValueState = _l[1];
  var _m = useState(defaultView),
    viewState = _m[0],
    setViewState = _m[1];
  var activeStartDate = activeStartDateProps || activeStartDateState || getInitialActiveStartDate({
    activeStartDate: activeStartDateProps,
    defaultActiveStartDate: defaultActiveStartDate,
    defaultValue: defaultValue,
    defaultView: defaultView,
    maxDate: maxDate,
    maxDetail: maxDetail,
    minDate: minDate,
    minDetail: minDetail,
    value: valueProps,
    view: viewProps
  });
  var value = function () {
    var rawValue = function () {
      // In the middle of range selection, use value from state
      if (selectRange && getIsSingleValue(valueState)) {
        return valueState;
      }
      return valueProps !== undefined ? valueProps : valueState;
    }();
    if (!rawValue) {
      return null;
    }
    return Array.isArray(rawValue) ? rawValue.map(function (el) {
      return el !== null ? toDate$1(el) : null;
    }) : rawValue !== null ? toDate$1(rawValue) : null;
  }();
  var valueType = getValueType$1(maxDetail);
  var view = getView(viewProps || viewState, minDetail, maxDetail);
  var views = getLimitedViews(minDetail, maxDetail);
  var hover = selectRange ? hoverState : null;
  var drillDownAvailable = views.indexOf(view) < views.length - 1;
  var drillUpAvailable = views.indexOf(view) > 0;
  var getProcessedValue = useCallback(function (value) {
    var processFunction = function () {
      switch (returnValue) {
        case 'start':
          return getDetailValueFrom$1;
        case 'end':
          return getDetailValueTo$1;
        case 'range':
          return getDetailValueArray$1;
        default:
          throw new Error('Invalid returnValue.');
      }
    }();
    return processFunction({
      maxDate: maxDate,
      maxDetail: maxDetail,
      minDate: minDate,
      value: value
    });
  }, [maxDate, maxDetail, minDate, returnValue]);
  var setActiveStartDate = useCallback(function (nextActiveStartDate, action) {
    setActiveStartDateState(nextActiveStartDate);
    var args = {
      action: action,
      activeStartDate: nextActiveStartDate,
      value: value,
      view: view
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
  }, [activeStartDate, onActiveStartDateChange, value, view]);
  var onClickTile = useCallback(function (value, event) {
    var callback = function () {
      switch (view) {
        case 'century':
          return onClickDecade;
        case 'decade':
          return onClickYear;
        case 'year':
          return onClickMonth;
        case 'month':
          return onClickDay;
        default:
          throw new Error("Invalid view: ".concat(view, "."));
      }
    }();
    if (callback) callback(value, event);
  }, [onClickDay, onClickDecade, onClickMonth, onClickYear, view]);
  var drillDown = useCallback(function (nextActiveStartDate, event) {
    if (!drillDownAvailable) {
      return;
    }
    onClickTile(nextActiveStartDate, event);
    var nextView = views[views.indexOf(view) + 1];
    if (!nextView) {
      throw new Error('Attempted to drill down from the lowest view.');
    }
    setActiveStartDateState(nextActiveStartDate);
    setViewState(nextView);
    var args = {
      action: 'drillDown',
      activeStartDate: nextActiveStartDate,
      value: value,
      view: nextView
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
    if (onViewChange && view !== nextView) {
      onViewChange(args);
    }
    if (onDrillDown) {
      onDrillDown(args);
    }
  }, [activeStartDate, drillDownAvailable, onActiveStartDateChange, onClickTile, onDrillDown, onViewChange, value, view, views]);
  var drillUp = useCallback(function () {
    if (!drillUpAvailable) {
      return;
    }
    var nextView = views[views.indexOf(view) - 1];
    if (!nextView) {
      throw new Error('Attempted to drill up from the highest view.');
    }
    var nextActiveStartDate = getBegin$1(nextView, activeStartDate);
    setActiveStartDateState(nextActiveStartDate);
    setViewState(nextView);
    var args = {
      action: 'drillUp',
      activeStartDate: nextActiveStartDate,
      value: value,
      view: nextView
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
    if (onViewChange && view !== nextView) {
      onViewChange(args);
    }
    if (onDrillUp) {
      onDrillUp(args);
    }
  }, [activeStartDate, drillUpAvailable, onActiveStartDateChange, onDrillUp, onViewChange, value, view, views]);
  var onChange = useCallback(function (rawNextValue, event) {
    var previousValue = value;
    onClickTile(rawNextValue, event);
    var isFirstValueInRange = selectRange && !getIsSingleValue(previousValue);
    var nextValue;
    if (selectRange) {
      // Range selection turned on
      if (isFirstValueInRange) {
        // Value has 0 or 2 elements - either way we're starting a new array
        // First value
        nextValue = getBegin$1(valueType, rawNextValue);
      } else {
        if (!previousValue) {
          throw new Error('previousValue is required');
        }
        if (Array.isArray(previousValue)) {
          throw new Error('previousValue must not be an array');
        }
        // Second value
        nextValue = getValueRange(valueType, previousValue, rawNextValue);
      }
    } else {
      // Range selection turned off
      nextValue = getProcessedValue(rawNextValue);
    }
    var nextActiveStartDate =
    // Range selection turned off
    !selectRange ||
    // Range selection turned on, first value
    isFirstValueInRange ||
    // Range selection turned on, second value, goToRangeStartOnSelect toggled on
    goToRangeStartOnSelect ? getActiveStartDate({
      maxDate: maxDate,
      maxDetail: maxDetail,
      minDate: minDate,
      minDetail: minDetail,
      value: nextValue,
      view: view
    }) : null;
    event.persist();
    setActiveStartDateState(nextActiveStartDate);
    setValueState(nextValue);
    var args = {
      action: 'onChange',
      activeStartDate: nextActiveStartDate,
      value: nextValue,
      view: view
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
    if (onChangeProps) {
      if (selectRange) {
        var isSingleValue = getIsSingleValue(nextValue);
        if (!isSingleValue) {
          onChangeProps(nextValue || null, event);
        } else if (allowPartialRange) {
          if (Array.isArray(nextValue)) {
            throw new Error('value must not be an array');
          }
          onChangeProps([nextValue || null, null], event);
        }
      } else {
        onChangeProps(nextValue || null, event);
      }
    }
  }, [activeStartDate, allowPartialRange, getProcessedValue, goToRangeStartOnSelect, maxDate, maxDetail, minDate, minDetail, onActiveStartDateChange, onChangeProps, onClickTile, selectRange, value, valueType, view]);
  function onMouseOver(nextHover) {
    setHoverState(nextHover);
  }
  function onMouseLeave() {
    setHoverState(null);
  }
  useImperativeHandle(ref, function () {
    return {
      activeStartDate: activeStartDate,
      drillDown: drillDown,
      drillUp: drillUp,
      onChange: onChange,
      setActiveStartDate: setActiveStartDate,
      value: value,
      view: view
    };
  }, [activeStartDate, drillDown, drillUp, onChange, setActiveStartDate, value, view]);
  function renderContent(next) {
    var currentActiveStartDate = next ? getBeginNext(view, activeStartDate) : getBegin$1(view, activeStartDate);
    var onClick = drillDownAvailable ? drillDown : onChange;
    var commonProps = {
      activeStartDate: currentActiveStartDate,
      hover: hover,
      locale: locale,
      maxDate: maxDate,
      minDate: minDate,
      onClick: onClick,
      onMouseOver: selectRange ? onMouseOver : undefined,
      tileClassName: tileClassName,
      tileContent: tileContent,
      tileDisabled: tileDisabled,
      value: value,
      valueType: valueType
    };
    switch (view) {
      case 'century':
        {
          return jsx(CenturyView, __assign$6({
            formatYear: formatYear,
            showNeighboringCentury: showNeighboringCentury
          }, commonProps));
        }
      case 'decade':
        {
          return jsx(DecadeView, __assign$6({
            formatYear: formatYear,
            showNeighboringDecade: showNeighboringDecade
          }, commonProps));
        }
      case 'year':
        {
          return jsx(YearView, __assign$6({
            formatMonth: formatMonth,
            formatMonthYear: formatMonthYear
          }, commonProps));
        }
      case 'month':
        {
          return jsx(MonthView, __assign$6({
            calendarType: calendarType,
            formatDay: formatDay,
            formatLongDate: formatLongDate,
            formatShortWeekday: formatShortWeekday,
            formatWeekday: formatWeekday,
            onClickWeekNumber: onClickWeekNumber,
            onMouseLeave: selectRange ? onMouseLeave : undefined,
            showFixedNumberOfWeeks: typeof showFixedNumberOfWeeks !== 'undefined' ? showFixedNumberOfWeeks : showDoubleView,
            showNeighboringMonth: showNeighboringMonth,
            showWeekNumbers: showWeekNumbers
          }, commonProps));
        }
      default:
        throw new Error("Invalid view: ".concat(view, "."));
    }
  }
  function renderNavigation() {
    if (!showNavigation) {
      return null;
    }
    return jsx(Navigation, {
      activeStartDate: activeStartDate,
      drillUp: drillUp,
      formatMonthYear: formatMonthYear,
      formatYear: formatYear,
      locale: locale,
      maxDate: maxDate,
      minDate: minDate,
      navigationAriaLabel: navigationAriaLabel,
      navigationAriaLive: navigationAriaLive,
      navigationLabel: navigationLabel,
      next2AriaLabel: next2AriaLabel,
      next2Label: next2Label,
      nextAriaLabel: nextAriaLabel,
      nextLabel: nextLabel,
      prev2AriaLabel: prev2AriaLabel,
      prev2Label: prev2Label,
      prevAriaLabel: prevAriaLabel,
      prevLabel: prevLabel,
      setActiveStartDate: setActiveStartDate,
      showDoubleView: showDoubleView,
      view: view,
      views: views
    });
  }
  var valueArray = Array.isArray(value) ? value : [value];
  return jsxs("div", {
    className: clsx(baseClassName$1, selectRange && valueArray.length === 1 && "".concat(baseClassName$1, "--selectRange"), showDoubleView && "".concat(baseClassName$1, "--doubleView"), className),
    ref: inputRef,
    children: [renderNavigation(), jsxs("div", {
      className: "".concat(baseClassName$1, "__viewContainer"),
      onBlur: selectRange ? onMouseLeave : undefined,
      onMouseLeave: selectRange ? onMouseLeave : undefined,
      children: [renderContent(), showDoubleView ? renderContent(true) : null]
    })]
  });
});
var Calendar$1 = Calendar;

function getRect(element) {
  return element.getBoundingClientRect();
}
function detectElementOverflow(element, container) {
  return {
    get collidedTop() {
      return getRect(element).top < getRect(container).top;
    },
    get collidedBottom() {
      return getRect(element).bottom > getRect(container).bottom;
    },
    get collidedLeft() {
      return getRect(element).left < getRect(container).left;
    },
    get collidedRight() {
      return getRect(element).right > getRect(container).right;
    },
    get overflowTop() {
      return getRect(container).top - getRect(element).top;
    },
    get overflowBottom() {
      return getRect(element).bottom - getRect(container).bottom;
    },
    get overflowLeft() {
      return getRect(container).left - getRect(element).left;
    },
    get overflowRight() {
      return getRect(element).right - getRect(container).right;
    }
  };
}

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var warning_1;
var hasRequiredWarning;

function requireWarning () {
	if (hasRequiredWarning) return warning_1;
	hasRequiredWarning = 1;
	var warning = function () {};
	{
	  var printWarning = function printWarning(format, args) {
	    var len = arguments.length;
	    args = new Array(len > 1 ? len - 1 : 0);
	    for (var key = 1; key < len; key++) {
	      args[key - 1] = arguments[key];
	    }
	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	  warning = function (condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	    if (!condition) {
	      printWarning.apply(null, [format].concat(args));
	    }
	  };
	}
	warning_1 = warning;
	return warning_1;
}

var warningExports = requireWarning();
var warning = /*@__PURE__*/getDefaultExportFromCjs(warningExports);

var __assign$5 = undefined && undefined.__assign || function () {
  __assign$5 = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$5.apply(this, arguments);
};
var __rest$4 = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var isBrowser$1 = typeof document !== 'undefined';
var isMutationObserverSupported = isBrowser$1 && 'MutationObserver' in window;
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function findScrollContainer(element) {
  var parent = element.parentElement;
  while (parent) {
    var overflow = window.getComputedStyle(parent).overflow;
    if (overflow.split(' ').every(function (o) {
      return o === 'auto' || o === 'scroll';
    })) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.documentElement;
}
function alignAxis(_a) {
  var axis = _a.axis,
    container = _a.container,
    element = _a.element,
    invertAxis = _a.invertAxis,
    scrollContainer = _a.scrollContainer,
    secondary = _a.secondary,
    spacing = _a.spacing;
  var style = window.getComputedStyle(element);
  var parent = container.parentElement;
  if (!parent) {
    return;
  }
  var scrollContainerCollisions = detectElementOverflow(parent, scrollContainer);
  var documentCollisions = detectElementOverflow(parent, document.documentElement);
  var isX = axis === 'x';
  var startProperty = isX ? 'left' : 'top';
  var endProperty = isX ? 'right' : 'bottom';
  var sizeProperty = isX ? 'width' : 'height';
  var overflowStartProperty = "overflow".concat(capitalize(startProperty));
  var overflowEndProperty = "overflow".concat(capitalize(endProperty));
  var scrollProperty = "scroll".concat(capitalize(startProperty));
  var uppercasedSizeProperty = capitalize(sizeProperty);
  var offsetSizeProperty = "offset".concat(uppercasedSizeProperty);
  var clientSizeProperty = "client".concat(uppercasedSizeProperty);
  var minSizeProperty = "min-".concat(sizeProperty);
  var scrollbarWidth = scrollContainer[offsetSizeProperty] - scrollContainer[clientSizeProperty];
  var startSpacing = typeof spacing === 'object' ? spacing[startProperty] : spacing;
  var availableStartSpace = -Math.max(scrollContainerCollisions[overflowStartProperty], documentCollisions[overflowStartProperty] + document.documentElement[scrollProperty]) - startSpacing;
  var endSpacing = typeof spacing === 'object' ? spacing[endProperty] : spacing;
  var availableEndSpace = -Math.max(scrollContainerCollisions[overflowEndProperty], documentCollisions[overflowEndProperty] - document.documentElement[scrollProperty]) - endSpacing - scrollbarWidth;
  if (secondary) {
    availableStartSpace += parent[clientSizeProperty];
    availableEndSpace += parent[clientSizeProperty];
  }
  var offsetSize = element[offsetSizeProperty];
  function displayStart() {
    element.style[startProperty] = 'auto';
    element.style[endProperty] = secondary ? '0' : '100%';
  }
  function displayEnd() {
    element.style[startProperty] = secondary ? '0' : '100%';
    element.style[endProperty] = 'auto';
  }
  function displayIfFits(availableSpace, display) {
    var fits = offsetSize <= availableSpace;
    if (fits) {
      display();
    }
    return fits;
  }
  function displayStartIfFits() {
    return displayIfFits(availableStartSpace, displayStart);
  }
  function displayEndIfFits() {
    return displayIfFits(availableEndSpace, displayEnd);
  }
  function displayWhereverShrinkedFits() {
    var moreSpaceStart = availableStartSpace > availableEndSpace;
    var rawMinSize = style.getPropertyValue(minSizeProperty);
    var minSize = rawMinSize ? parseInt(rawMinSize, 10) : null;
    function shrinkToSize(size) {
      warning(!minSize || size >= minSize, "<Fit />'s child will not fit anywhere with its current ".concat(minSizeProperty, " of ").concat(minSize, "px."));
      var newSize = Math.max(size, minSize || 0);
      warning(false, "<Fit />'s child needed to have its ".concat(sizeProperty, " decreased to ").concat(newSize, "px."));
      element.style[sizeProperty] = "".concat(newSize, "px");
    }
    if (moreSpaceStart) {
      shrinkToSize(availableStartSpace);
      displayStart();
    } else {
      shrinkToSize(availableEndSpace);
      displayEnd();
    }
  }
  var fits;
  if (invertAxis) {
    fits = displayStartIfFits() || displayEndIfFits();
  } else {
    fits = displayEndIfFits() || displayStartIfFits();
  }
  if (!fits) {
    displayWhereverShrinkedFits();
  }
}
function alignMainAxis(args) {
  alignAxis(args);
}
function alignSecondaryAxis(args) {
  alignAxis(__assign$5(__assign$5({}, args), {
    axis: args.axis === 'x' ? 'y' : 'x',
    secondary: true
  }));
}
function alignBothAxis(args) {
  var invertAxis = args.invertAxis,
    invertSecondaryAxis = args.invertSecondaryAxis,
    commonArgs = __rest$4(args, ["invertAxis", "invertSecondaryAxis"]);
  alignMainAxis(__assign$5(__assign$5({}, commonArgs), {
    invertAxis: invertAxis
  }));
  alignSecondaryAxis(__assign$5(__assign$5({}, commonArgs), {
    invertAxis: invertSecondaryAxis
  }));
}
function Fit(_a) {
  var children = _a.children,
    invertAxis = _a.invertAxis,
    invertSecondaryAxis = _a.invertSecondaryAxis,
    _b = _a.mainAxis,
    mainAxis = _b === void 0 ? 'y' : _b,
    _c = _a.spacing,
    spacing = _c === void 0 ? 8 : _c;
  var container = useRef(undefined);
  var element = useRef(undefined);
  var elementWidth = useRef(undefined);
  var elementHeight = useRef(undefined);
  var scrollContainer = useRef(undefined);
  var fit = useCallback(function () {
    if (!scrollContainer.current || !container.current || !element.current) {
      return;
    }
    var currentElementWidth = element.current.clientWidth;
    var currentElementHeight = element.current.clientHeight;
    // No need to recalculate - already did that for current dimensions
    if (elementWidth.current === currentElementWidth && elementHeight.current === currentElementHeight) {
      return;
    }
    // Save the dimensions so that we know we don't need to repeat the function if unchanged
    elementWidth.current = currentElementWidth;
    elementHeight.current = currentElementHeight;
    var parent = container.current.parentElement;
    // Container was unmounted
    if (!parent) {
      return;
    }
    /**
     * We need to ensure that <Fit />'s child has a absolute position. Otherwise,
     * we wouldn't be able to place the child in the correct position.
     */
    var style = window.getComputedStyle(element.current);
    var position = style.position;
    if (position !== 'absolute') {
      element.current.style.position = 'absolute';
    }
    /**
     * We need to ensure that <Fit />'s parent has a relative or absolute position. Otherwise,
     * we wouldn't be able to place the child in the correct position.
     */
    var parentStyle = window.getComputedStyle(parent);
    var parentPosition = parentStyle.position;
    if (parentPosition !== 'relative' && parentPosition !== 'absolute') {
      parent.style.position = 'relative';
    }
    alignBothAxis({
      axis: mainAxis,
      container: container.current,
      element: element.current,
      invertAxis: invertAxis,
      invertSecondaryAxis: invertSecondaryAxis,
      scrollContainer: scrollContainer.current,
      spacing: spacing
    });
  }, [invertAxis, invertSecondaryAxis, mainAxis, spacing]);
  var child = Children.only(children);
  useEffect(function () {
    fit();
    function onMutation() {
      fit();
    }
    if (isMutationObserverSupported && element.current) {
      var mutationObserver = new MutationObserver(onMutation);
      mutationObserver.observe(element.current, {
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    }
  }, [fit]);
  function assignRefs(domElement) {
    if (!domElement || !(domElement instanceof HTMLElement)) {
      return;
    }
    element.current = domElement;
    scrollContainer.current = findScrollContainer(domElement);
  }
  return jsx("span", {
    ref: function (domContainer) {
      if (!domContainer) {
        return;
      }
      container.current = domContainer;
      var domElement = domContainer === null || domContainer === void 0 ? void 0 : domContainer.firstElementChild;
      assignRefs(domElement);
    },
    style: {
      display: 'contents'
    },
    children: child
  });
}

function Divider(_a) {
  var children = _a.children;
  return jsx("span", {
    className: "react-date-picker__inputGroup__divider",
    children: children
  });
}

var allowedVariants = ['normal', 'small-caps'];
/**
 * Gets font CSS shorthand property given element.
 *
 * @param {HTMLElement} element Element to get font CSS shorthand property from
 */
function getFontShorthand(element) {
  if (!element) {
    return '';
  }
  var style = window.getComputedStyle(element);
  if (style.font) {
    return style.font;
  }
  var isFontDefined = style.fontFamily !== '';
  if (!isFontDefined) {
    return '';
  }
  var fontVariant = allowedVariants.includes(style.fontVariant) ? style.fontVariant : 'normal';
  return "".concat(style.fontStyle, " ").concat(fontVariant, " ").concat(style.fontWeight, " ").concat(style.fontSize, " / ").concat(style.lineHeight, " ").concat(style.fontFamily);
}
var cachedCanvas;
/**
 * Measures text width given text and font CSS shorthand.
 *
 * @param {string} text Text to measure
 * @param {string} font Font to use when measuring the text
 */
function measureText(text, font) {
  var canvas = cachedCanvas || (cachedCanvas = document.createElement('canvas'));
  var context = canvas.getContext('2d');
  // Context type not supported
  if (!context) {
    return null;
  }
  context.font = font;
  var width = context.measureText(text).width;
  return Math.ceil(width);
}
/**
 * Updates input element width to fit its content given input element
 * @param {HTMLInputElement} element
 */
function updateInputWidth(element) {
  if (typeof document === 'undefined' || !element) {
    return null;
  }
  var font = getFontShorthand(element);
  var text = element.value || element.placeholder;
  var width = measureText(text, font);
  if (width === null) {
    return null;
  }
  element.style.width = "".concat(width, "px");
  return width;
}

var isBrowser = typeof document !== 'undefined';
var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
var isIEOrEdgeLegacy = isBrowser && /(MSIE|Trident\/|Edge\/)/.test(navigator.userAgent);
var isFirefox = isBrowser && /Firefox/.test(navigator.userAgent);
function onFocus(event) {
  var target = event.target;
  if (isIEOrEdgeLegacy) {
    requestAnimationFrame(function () {
      return target.select();
    });
  } else {
    target.select();
  }
}
function updateInputWidthOnLoad(element) {
  if (document.readyState === 'complete') {
    return;
  }
  function onLoad() {
    updateInputWidth(element);
  }
  window.addEventListener('load', onLoad);
}
function updateInputWidthOnFontLoad(element) {
  if (!document.fonts) {
    return;
  }
  var font = getFontShorthand(element);
  if (!font) {
    return;
  }
  var isFontLoaded = document.fonts.check(font);
  if (isFontLoaded) {
    return;
  }
  function onLoadingDone() {
    updateInputWidth(element);
  }
  document.fonts.addEventListener('loadingdone', onLoadingDone);
}
function getSelectionString(input) {
  /**
   * window.getSelection().toString() returns empty string in IE11 and Firefox,
   * so alternatives come first.
   */
  if (input && 'selectionStart' in input && input.selectionStart !== null && 'selectionEnd' in input && input.selectionEnd !== null) {
    return input.value.slice(input.selectionStart, input.selectionEnd);
  }
  if ('getSelection' in window) {
    var selection = window.getSelection();
    return selection && selection.toString();
  }
  return null;
}
function makeOnKeyPress(maxLength) {
  if (maxLength === null) {
    return undefined;
  }
  /**
   * Prevents keystrokes that would not produce a number or when value after keystroke would
   * exceed maxLength.
   */
  return function onKeyPress(event) {
    if (isFirefox) {
      // See https://github.com/wojtekmaj/react-time-picker/issues/92
      return;
    }
    var key = event.key,
      input = event.target;
    var value = input.value;
    var isNumberKey = key.length === 1 && /\d/.test(key);
    var selection = getSelectionString(input);
    if (!isNumberKey || !(selection || value.length < maxLength)) {
      event.preventDefault();
    }
  };
}
function Input(_a) {
  var ariaLabel = _a.ariaLabel,
    autoFocus = _a.autoFocus,
    className = _a.className,
    disabled = _a.disabled,
    inputRef = _a.inputRef,
    max = _a.max,
    min = _a.min,
    name = _a.name,
    nameForClass = _a.nameForClass,
    onChange = _a.onChange,
    onKeyDown = _a.onKeyDown,
    onKeyUp = _a.onKeyUp,
    _b = _a.placeholder,
    placeholder = _b === void 0 ? '--' : _b,
    required = _a.required,
    showLeadingZeros = _a.showLeadingZeros,
    step = _a.step,
    value = _a.value;
  useIsomorphicLayoutEffect(function () {
    if (!inputRef || !inputRef.current) {
      return;
    }
    updateInputWidth(inputRef.current);
    updateInputWidthOnLoad(inputRef.current);
    updateInputWidthOnFontLoad(inputRef.current);
  }, [inputRef, value]);
  var hasLeadingZero = showLeadingZeros && value && Number(value) < 10 && (value === '0' || !value.toString().startsWith('0'));
  var maxLength = max ? max.toString().length : null;
  return jsxs(Fragment, {
    children: [hasLeadingZero ? jsx("span", {
      className: "".concat(className, "__leadingZero"),
      children: "0"
    }) : null, jsx("input", {
      "aria-label": ariaLabel,
      autoComplete: "off",
      autoFocus: autoFocus,
      className: clsx("".concat(className, "__input"), "".concat(className, "__").concat(nameForClass || name), hasLeadingZero && "".concat(className, "__input--hasLeadingZero")),
      "data-input": "true",
      disabled: disabled,
      inputMode: "numeric",
      max: max,
      min: min,
      name: name,
      onChange: onChange,
      onFocus: onFocus,
      onKeyDown: onKeyDown,
      onKeyPress: makeOnKeyPress(maxLength),
      onKeyUp: function (event) {
        updateInputWidth(event.target);
        if (onKeyUp) {
          onKeyUp(event);
        }
      },
      placeholder: placeholder,
      // Assertion is needed for React 18 compatibility
      ref: inputRef,
      required: required,
      step: step,
      type: "number",
      value: value !== null ? value : ''
    })]
  });
}

/**
 * Returns a value no smaller than min and no larger than max.
 *
 * @param {Date} value Value to return.
 * @param {Date} min Minimum return value.
 * @param {Date} max Maximum return value.
 * @returns {Date} Value between min and max.
 */
function between(value, min, max) {
  if (min && min > value) {
    return min;
  }
  if (max && max < value) {
    return max;
  }
  return value;
}
function isValidNumber(num) {
  return num !== null && num !== false && !Number.isNaN(Number(num));
}
function safeMin() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return Math.min.apply(Math, args.filter(isValidNumber));
}
function safeMax() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return Math.max.apply(Math, args.filter(isValidNumber));
}

var __assign$4 = undefined && undefined.__assign || function () {
  __assign$4 = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$4.apply(this, arguments);
};
var __rest$3 = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function DayInput(_a) {
  var maxDate = _a.maxDate,
    minDate = _a.minDate,
    month = _a.month,
    year = _a.year,
    otherProps = __rest$3(_a, ["maxDate", "minDate", "month", "year"]);
  var currentMonthMaxDays = function () {
    if (!month) {
      return 31;
    }
    return getDaysInMonth(new Date(Number(year), Number(month) - 1, 1));
  }();
  function isSameMonth(date) {
    return year === getYear(date).toString() && month === getMonthHuman(date).toString();
  }
  var maxDay = safeMin(currentMonthMaxDays, maxDate && isSameMonth(maxDate) && getDate(maxDate));
  var minDay = safeMax(1, minDate && isSameMonth(minDate) && getDate(minDate));
  return jsx(Input, __assign$4({
    max: maxDay,
    min: minDay,
    name: "day"
  }, otherProps));
}

var __assign$3 = undefined && undefined.__assign || function () {
  __assign$3 = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$3.apply(this, arguments);
};
var __rest$2 = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function MonthInput(_a) {
  var maxDate = _a.maxDate,
    minDate = _a.minDate,
    year = _a.year,
    otherProps = __rest$2(_a, ["maxDate", "minDate", "year"]);
  function isSameYear(date) {
    return date && year === getYear(date).toString();
  }
  var maxMonth = safeMin(12, maxDate && isSameYear(maxDate) && getMonthHuman(maxDate));
  var minMonth = safeMax(1, minDate && isSameYear(minDate) && getMonthHuman(minDate));
  return jsx(Input, __assign$3({
    max: maxMonth,
    min: minMonth,
    name: "month"
  }, otherProps));
}

var formatterCache = new Map();
function getFormatter(options) {
  return function formatter(locale, date) {
    var localeWithDefault = locale || getUserLocale$1();
    if (!formatterCache.has(localeWithDefault)) {
      formatterCache.set(localeWithDefault, new Map());
    }
    var formatterCacheLocale = formatterCache.get(localeWithDefault);
    if (!formatterCacheLocale.has(options)) {
      formatterCacheLocale.set(options, new Intl.DateTimeFormat(localeWithDefault || undefined, options).format);
    }
    return formatterCacheLocale.get(options)(date);
  };
}
/**
 * Changes the hour in a Date to ensure right date formatting even if DST is messed up.
 * Workaround for bug in WebKit and Firefox with historical dates.
 * For more details, see:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=750465
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1385643
 *
 * @param {Date} date Date.
 * @returns {Date} Date with hour set to 12.
 */
function toSafeHour(date) {
  var safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
}
function getSafeFormatter(options) {
  return function (locale, date) {
    return getFormatter(options)(locale, toSafeHour(date));
  };
}
var formatMonthOptions = {
  month: 'long'
};
var formatShortMonthOptions = {
  month: 'short'
};
var formatMonth = getSafeFormatter(formatMonthOptions);
var formatShortMonth = getSafeFormatter(formatShortMonthOptions);

var __spreadArray$1 = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function MonthSelect(_a) {
  var ariaLabel = _a.ariaLabel,
    autoFocus = _a.autoFocus,
    className = _a.className,
    disabled = _a.disabled,
    inputRef = _a.inputRef,
    locale = _a.locale,
    maxDate = _a.maxDate,
    minDate = _a.minDate,
    onChange = _a.onChange,
    onKeyDown = _a.onKeyDown,
    _b = _a.placeholder,
    placeholder = _b === void 0 ? '--' : _b,
    required = _a.required,
    short = _a.short,
    value = _a.value,
    year = _a.year;
  function isSameYear(date) {
    return date && year === getYear(date).toString();
  }
  var maxMonth = safeMin(12, maxDate && isSameYear(maxDate) && getMonthHuman(maxDate));
  var minMonth = safeMax(1, minDate && isSameYear(minDate) && getMonthHuman(minDate));
  var dates = __spreadArray$1([], Array(12), true).map(function (el, index) {
    return new Date(2019, index, 1);
  });
  var name = 'month';
  var formatter = short ? formatShortMonth : formatMonth;
  return jsxs("select", {
    "aria-label": ariaLabel,
    autoFocus: autoFocus,
    className: clsx("".concat(className, "__input"), "".concat(className, "__").concat(name)),
    "data-input": "true",
    "data-select": "true",
    disabled: disabled,
    name: name,
    onChange: onChange,
    onKeyDown: onKeyDown,
    // Assertion is needed for React 18 compatibility
    ref: inputRef,
    required: required,
    value: value !== null ? value : '',
    children: [!value && jsx("option", {
      value: "",
      children: placeholder
    }), dates.map(function (date) {
      var month = getMonthHuman(date);
      var disabled = month < minMonth || month > maxMonth;
      return jsx("option", {
        disabled: disabled,
        value: month,
        children: formatter(locale, date)
      }, month);
    })]
  });
}

var __assign$2 = undefined && undefined.__assign || function () {
  __assign$2 = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$2.apply(this, arguments);
};
var __rest$1 = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function YearInput(_a) {
  var maxDate = _a.maxDate,
    minDate = _a.minDate,
    _b = _a.placeholder,
    placeholder = _b === void 0 ? '----' : _b,
    valueType = _a.valueType,
    otherProps = __rest$1(_a, ["maxDate", "minDate", "placeholder", "valueType"]);
  var maxYear = safeMin(275760, maxDate && getYear(maxDate));
  var minYear = safeMax(1, minDate && getYear(minDate));
  var yearStep = function () {
    if (valueType === 'century') {
      return 10;
    }
    return 1;
  }();
  return jsx(Input, __assign$2({
    max: maxYear,
    min: minYear,
    name: "year",
    placeholder: placeholder,
    step: yearStep
  }, otherProps));
}

function NativeInput(_a) {
  var ariaLabel = _a.ariaLabel,
    disabled = _a.disabled,
    maxDate = _a.maxDate,
    minDate = _a.minDate,
    name = _a.name,
    onChange = _a.onChange,
    required = _a.required,
    value = _a.value,
    valueType = _a.valueType;
  var nativeInputType = function () {
    switch (valueType) {
      case 'decade':
      case 'year':
        return 'number';
      case 'month':
        return 'month';
      case 'day':
        return 'date';
      default:
        throw new Error('Invalid valueType');
    }
  }();
  var nativeValueParser = function () {
    switch (valueType) {
      case 'decade':
      case 'year':
        return getYear;
      case 'month':
        return getISOLocalMonth;
      case 'day':
        return getISOLocalDate;
      default:
        throw new Error('Invalid valueType');
    }
  }();
  function stopPropagation(event) {
    event.stopPropagation();
  }
  return jsx("input", {
    "aria-label": ariaLabel,
    disabled: disabled,
    hidden: true,
    max: maxDate ? nativeValueParser(maxDate) : undefined,
    min: minDate ? nativeValueParser(minDate) : undefined,
    name: name,
    onChange: onChange,
    onFocus: stopPropagation,
    required: required,
    style: {
      visibility: 'hidden',
      position: 'absolute',
      zIndex: '-999'
    },
    type: nativeInputType,
    value: value ? nativeValueParser(value) : ''
  });
}

/**
 * Returns the beginning of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
function getBegin(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getDecadeStart(date);
    case 'year':
      return getYearStart(date);
    case 'month':
      return getMonthStart(date);
    case 'day':
      return getDayStart(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
/**
 * Returns the end of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
function getEnd(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getDecadeEnd(date);
    case 'year':
      return getYearEnd(date);
    case 'month':
      return getMonthEnd(date);
    case 'day':
      return getDayEnd(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}

var __assign$1 = undefined && undefined.__assign || function () {
  __assign$1 = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var getFormatterOptionsCache = {};
var defaultMinDate = new Date();
defaultMinDate.setFullYear(1, 0, 1);
defaultMinDate.setHours(0, 0, 0, 0);
var defaultMaxDate = new Date(8.64e15);
var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = __spreadArray(__spreadArray([], allViews.slice(1), true), ['day'], false);
function toDate(value) {
  if (value instanceof Date) {
    return value;
  }
  return new Date(value);
}
/**
 * Returns value type that can be returned with currently applied settings.
 */
function getValueType(view) {
  var index = allViews.indexOf(view);
  return allValueTypes[index];
}
function getValue(value, index) {
  var rawValue = Array.isArray(value) ? value[index] : value;
  if (!rawValue) {
    return null;
  }
  var valueDate = toDate(rawValue);
  if (isNaN(valueDate.getTime())) {
    throw new Error("Invalid date: ".concat(value));
  }
  return valueDate;
}
function getDetailValue(_a, index) {
  var value = _a.value,
    minDate = _a.minDate,
    maxDate = _a.maxDate,
    maxDetail = _a.maxDetail;
  var valuePiece = getValue(value, index);
  if (!valuePiece) {
    return null;
  }
  var valueType = getValueType(maxDetail);
  var detailValueFrom = function () {
    switch (index) {
      case 0:
        return getBegin(valueType, valuePiece);
      case 1:
        return getEnd(valueType, valuePiece);
      default:
        throw new Error("Invalid index value: ".concat(index));
    }
  }();
  return between(detailValueFrom, minDate, maxDate);
}
var getDetailValueFrom = function (args) {
  return getDetailValue(args, 0);
};
var getDetailValueTo = function (args) {
  return getDetailValue(args, 1);
};
var getDetailValueArray = function (args) {
  return [getDetailValueFrom, getDetailValueTo].map(function (fn) {
    return fn(args);
  });
};
function isInternalInput(element) {
  return element.dataset.input === 'true';
}
function findInput(element, property) {
  var nextElement = element;
  do {
    nextElement = nextElement[property];
  } while (nextElement && !isInternalInput(nextElement));
  return nextElement;
}
function focus(element) {
  if (element) {
    element.focus();
  }
}
function renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances) {
  var usedFunctions = [];
  var pattern = new RegExp(Object.keys(elementFunctions).map(function (el) {
    return "".concat(el, "+");
  }).join('|'), 'g');
  var matches = placeholder.match(pattern);
  return placeholder.split(pattern).reduce(function (arr, element, index) {
    var divider = element &&
    // eslint-disable-next-line react/no-array-index-key
    jsx(Divider, {
      children: element
    }, "separator_".concat(index));
    arr.push(divider);
    var currentMatch = matches && matches[index];
    if (currentMatch) {
      var renderFunction = elementFunctions[currentMatch] || elementFunctions[Object.keys(elementFunctions).find(function (elementFunction) {
        return currentMatch.match(elementFunction);
      })];
      if (!renderFunction) {
        return arr;
      }
      if (!allowMultipleInstances && usedFunctions.includes(renderFunction)) {
        arr.push(currentMatch);
      } else {
        arr.push(renderFunction(currentMatch, index));
        usedFunctions.push(renderFunction);
      }
    }
    return arr;
  }, []);
}
function DateInput(_a) {
  var autoFocus = _a.autoFocus,
    className = _a.className,
    dayAriaLabel = _a.dayAriaLabel,
    dayPlaceholder = _a.dayPlaceholder,
    disabled = _a.disabled,
    format = _a.format,
    _b = _a.isCalendarOpen,
    isCalendarOpenProps = _b === void 0 ? null : _b,
    locale = _a.locale,
    maxDate = _a.maxDate,
    _c = _a.maxDetail,
    maxDetail = _c === void 0 ? 'month' : _c,
    minDate = _a.minDate,
    monthAriaLabel = _a.monthAriaLabel,
    monthPlaceholder = _a.monthPlaceholder,
    _d = _a.name,
    name = _d === void 0 ? 'date' : _d,
    nativeInputAriaLabel = _a.nativeInputAriaLabel,
    onChangeProps = _a.onChange,
    onInvalidChange = _a.onInvalidChange,
    required = _a.required,
    _e = _a.returnValue,
    returnValue = _e === void 0 ? 'start' : _e,
    showLeadingZeros = _a.showLeadingZeros,
    valueProps = _a.value,
    yearAriaLabel = _a.yearAriaLabel,
    yearPlaceholder = _a.yearPlaceholder;
  var _f = useState(null),
    year = _f[0],
    setYear = _f[1];
  var _g = useState(null),
    month = _g[0],
    setMonth = _g[1];
  var _h = useState(null),
    day = _h[0],
    setDay = _h[1];
  var _j = useState(null),
    value = _j[0],
    setValue = _j[1];
  var yearInput = useRef(null);
  var monthInput = useRef(null);
  var monthSelect = useRef(null);
  var dayInput = useRef(null);
  var _k = useState(isCalendarOpenProps),
    isCalendarOpen = _k[0],
    setIsCalendarOpen = _k[1];
  var lastPressedKey = useRef(undefined);
  useEffect(function () {
    setIsCalendarOpen(isCalendarOpenProps);
  }, [isCalendarOpenProps]);
  useEffect(function () {
    var nextValue = getDetailValueFrom({
      value: valueProps,
      minDate: minDate,
      maxDate: maxDate,
      maxDetail: maxDetail
    });
    if (nextValue) {
      setYear(getYear(nextValue).toString());
      setMonth(getMonthHuman(nextValue).toString());
      setDay(getDate(nextValue).toString());
      setValue(nextValue);
    } else {
      setYear(null);
      setMonth(null);
      setDay(null);
      setValue(null);
    }
  }, [valueProps, minDate, maxDate, maxDetail,
  // Toggling calendar visibility resets values
  isCalendarOpen]);
  var valueType = getValueType(maxDetail);
  var formatDate = function () {
    var level = allViews.indexOf(maxDetail);
    var formatterOptions = getFormatterOptionsCache[level] || function () {
      var options = {
        year: 'numeric'
      };
      if (level >= 2) {
        options.month = 'numeric';
      }
      if (level >= 3) {
        options.day = 'numeric';
      }
      getFormatterOptionsCache[level] = options;
      return options;
    }();
    return getFormatter(formatterOptions);
  }();
  /**
   * Gets current value in a desired format.
   */
  function getProcessedValue(value) {
    var processFunction = function () {
      switch (returnValue) {
        case 'start':
          return getDetailValueFrom;
        case 'end':
          return getDetailValueTo;
        case 'range':
          return getDetailValueArray;
        default:
          throw new Error('Invalid returnValue.');
      }
    }();
    return processFunction({
      value: value,
      minDate: minDate,
      maxDate: maxDate,
      maxDetail: maxDetail
    });
  }
  var placeholder = format || function () {
    var year = 2017;
    var monthIndex = 11;
    var day = 11;
    var date = new Date(year, monthIndex, day);
    var formattedDate = formatDate(locale, date);
    var datePieces = ['year', 'month', 'day'];
    var datePieceReplacements = ['y', 'M', 'd'];
    function formatDatePiece(name, dateToFormat) {
      var formatterOptions = getFormatterOptionsCache[name] || function () {
        var _a;
        var options = (_a = {}, _a[name] = 'numeric', _a);
        getFormatterOptionsCache[name] = options;
        return options;
      }();
      return getFormatter(formatterOptions)(locale, dateToFormat).match(/\d{1,}/);
    }
    var placeholder = formattedDate;
    datePieces.forEach(function (datePiece, index) {
      var match = formatDatePiece(datePiece, date);
      if (match) {
        var formattedDatePiece = match[0];
        var datePieceReplacement = datePieceReplacements[index];
        placeholder = placeholder.replace(formattedDatePiece, datePieceReplacement);
      }
    });
    // See: https://github.com/wojtekmaj/react-date-picker/issues/396
    placeholder = placeholder.replace('17', 'y');
    return placeholder;
  }();
  var divider = function () {
    var dividers = placeholder.match(/[^0-9a-z]/i);
    return dividers ? dividers[0] : null;
  }();
  function onClick(event) {
    if (event.target === event.currentTarget) {
      // Wrapper was directly clicked
      var firstInput = event.target.children[1];
      focus(firstInput);
    }
  }
  function onKeyDown(event) {
    lastPressedKey.current = event.key;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case divider:
        {
          event.preventDefault();
          var input = event.target;
          var property = event.key === 'ArrowLeft' ? 'previousElementSibling' : 'nextElementSibling';
          var nextInput = findInput(input, property);
          focus(nextInput);
          break;
        }
    }
  }
  function onKeyUp(event) {
    var key = event.key,
      input = event.target;
    var isLastPressedKey = lastPressedKey.current === key;
    if (!isLastPressedKey) {
      return;
    }
    var isNumberKey = !isNaN(Number(key));
    if (!isNumberKey) {
      return;
    }
    var max = input.getAttribute('max');
    if (!max) {
      return;
    }
    var value = input.value;
    /**
     * Given 1, the smallest possible number the user could type by adding another digit is 10.
     * 10 would be a valid value given max = 12, so we won't jump to the next input.
     * However, given 2, smallers possible number would be 20, and thus keeping the focus in
     * this field doesn't make sense.
     */
    if (Number(value) * 10 > Number(max) || value.length >= max.length) {
      var property = 'nextElementSibling';
      var nextInput = findInput(input, property);
      focus(nextInput);
    }
  }
  /**
   * Called after internal onChange. Checks input validity. If all fields are valid,
   * calls props.onChange.
   */
  function onChangeExternal() {
    if (!onChangeProps) {
      return;
    }
    function filterBoolean(value) {
      return Boolean(value);
    }
    var formElements = [dayInput.current, monthInput.current, monthSelect.current, yearInput.current].filter(filterBoolean);
    var values = {};
    formElements.forEach(function (formElement) {
      values[formElement.name] = 'valueAsNumber' in formElement ? formElement.valueAsNumber : Number(formElement.value);
    });
    var isEveryValueEmpty = formElements.every(function (formElement) {
      return !formElement.value;
    });
    if (isEveryValueEmpty) {
      onChangeProps(null, false);
      return;
    }
    var isEveryValueFilled = formElements.every(function (formElement) {
      return formElement.value;
    });
    var isEveryValueValid = formElements.every(function (formElement) {
      return formElement.validity.valid;
    });
    if (isEveryValueFilled && isEveryValueValid) {
      var year_1 = Number(values.year || new Date().getFullYear());
      var monthIndex = Number(values.month || 1) - 1;
      var day_1 = Number(values.day || 1);
      var proposedValue = new Date();
      proposedValue.setFullYear(year_1, monthIndex, day_1);
      proposedValue.setHours(0, 0, 0, 0);
      var processedValue = getProcessedValue(proposedValue);
      onChangeProps(processedValue, false);
      return;
    }
    if (!onInvalidChange) {
      return;
    }
    onInvalidChange();
  }
  /**
   * Called when non-native date input is changed.
   */
  function onChange(event) {
    var _a = event.target,
      name = _a.name,
      value = _a.value;
    switch (name) {
      case 'year':
        setYear(value);
        break;
      case 'month':
        setMonth(value);
        break;
      case 'day':
        setDay(value);
        break;
    }
    onChangeExternal();
  }
  /**
   * Called when native date input is changed.
   */
  function onChangeNative(event) {
    var value = event.target.value;
    if (!onChangeProps) {
      return;
    }
    var processedValue = function () {
      if (!value) {
        return null;
      }
      var _a = value.split('-'),
        yearString = _a[0],
        monthString = _a[1],
        dayString = _a[2];
      var year = Number(yearString);
      var monthIndex = Number(monthString) - 1 || 0;
      var day = Number(dayString) || 1;
      var proposedValue = new Date();
      proposedValue.setFullYear(year, monthIndex, day);
      proposedValue.setHours(0, 0, 0, 0);
      return proposedValue;
    }();
    onChangeProps(processedValue, false);
  }
  var commonInputProps = {
    className: className,
    disabled: disabled,
    maxDate: maxDate || defaultMaxDate,
    minDate: minDate || defaultMinDate,
    onChange: onChange,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    // This is only for showing validity when editing
    required: Boolean(required || isCalendarOpen)
  };
  function renderDay(currentMatch, index) {
    if (currentMatch && currentMatch.length > 2) {
      throw new Error("Unsupported token: ".concat(currentMatch));
    }
    var showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;
    return jsx(DayInput, __assign$1({}, commonInputProps, {
      ariaLabel: dayAriaLabel,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: index === 0 && autoFocus,
      inputRef: dayInput,
      month: month,
      placeholder: dayPlaceholder,
      showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros,
      value: day,
      year: year
    }), "day");
  }
  function renderMonth(currentMatch, index) {
    if (currentMatch && currentMatch.length > 4) {
      throw new Error("Unsupported token: ".concat(currentMatch));
    }
    if (currentMatch.length > 2) {
      return jsx(MonthSelect, __assign$1({}, commonInputProps, {
        ariaLabel: monthAriaLabel,
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus: index === 0 && autoFocus,
        inputRef: monthSelect,
        locale: locale,
        placeholder: monthPlaceholder,
        short: currentMatch.length === 3,
        value: month,
        year: year
      }), "month");
    }
    var showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;
    return jsx(MonthInput, __assign$1({}, commonInputProps, {
      ariaLabel: monthAriaLabel,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: index === 0 && autoFocus,
      inputRef: monthInput,
      placeholder: monthPlaceholder,
      showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros,
      value: month,
      year: year
    }), "month");
  }
  function renderYear(currentMatch, index) {
    return jsx(YearInput, __assign$1({}, commonInputProps, {
      ariaLabel: yearAriaLabel,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: index === 0 && autoFocus,
      inputRef: yearInput,
      placeholder: yearPlaceholder,
      value: year,
      valueType: valueType
    }), "year");
  }
  function renderCustomInputsInternal() {
    var elementFunctions = {
      d: renderDay,
      M: renderMonth,
      y: renderYear
    };
    var allowMultipleInstances = typeof format !== 'undefined';
    return renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances);
  }
  function renderNativeInput() {
    return jsx(NativeInput, {
      ariaLabel: nativeInputAriaLabel,
      disabled: disabled,
      maxDate: maxDate || defaultMaxDate,
      minDate: minDate || defaultMinDate,
      name: name,
      onChange: onChangeNative,
      required: required,
      value: value,
      valueType: valueType
    }, "date");
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    jsxs("div", {
      className: className,
      onClick: onClick,
      children: [renderNativeInput(), renderCustomInputsInternal()]
    })
  );
}

var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var baseClassName = 'react-date-picker';
var outsideActionEvents = ['mousedown', 'focusin', 'touchstart'];
var iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 19,
  height: 19,
  viewBox: '0 0 19 19',
  stroke: 'black',
  strokeWidth: 2
};
var CalendarIcon = jsxs("svg", __assign({}, iconProps, {
  className: "".concat(baseClassName, "__calendar-button__icon ").concat(baseClassName, "__button__icon"),
  children: [jsx("rect", {
    fill: "none",
    height: "15",
    width: "15",
    x: "2",
    y: "2"
  }), jsx("line", {
    x1: "6",
    x2: "6",
    y1: "0",
    y2: "4"
  }), jsx("line", {
    x1: "13",
    x2: "13",
    y1: "0",
    y2: "4"
  })]
}));
var ClearIcon = jsxs("svg", __assign({}, iconProps, {
  className: "".concat(baseClassName, "__clear-button__icon ").concat(baseClassName, "__button__icon"),
  children: [jsx("line", {
    x1: "4",
    x2: "15",
    y1: "4",
    y2: "15"
  }), jsx("line", {
    x1: "15",
    x2: "4",
    y1: "4",
    y2: "15"
  })]
}));
function DatePicker(props) {
  var autoFocus = props.autoFocus,
    calendarAriaLabel = props.calendarAriaLabel,
    _a = props.calendarIcon,
    calendarIcon = _a === void 0 ? CalendarIcon : _a,
    className = props.className,
    clearAriaLabel = props.clearAriaLabel,
    _b = props.clearIcon,
    clearIcon = _b === void 0 ? ClearIcon : _b,
    _c = props.closeCalendar,
    shouldCloseCalendarOnSelect = _c === void 0 ? true : _c,
    dataTestid = props["data-testid"],
    dayAriaLabel = props.dayAriaLabel,
    dayPlaceholder = props.dayPlaceholder,
    disableCalendar = props.disableCalendar,
    disabled = props.disabled,
    format = props.format,
    id = props.id,
    _d = props.isOpen,
    isOpenProps = _d === void 0 ? null : _d,
    locale = props.locale,
    maxDate = props.maxDate,
    _e = props.maxDetail,
    maxDetail = _e === void 0 ? 'month' : _e,
    minDate = props.minDate,
    monthAriaLabel = props.monthAriaLabel,
    monthPlaceholder = props.monthPlaceholder,
    _f = props.name,
    name = _f === void 0 ? 'date' : _f,
    nativeInputAriaLabel = props.nativeInputAriaLabel,
    onCalendarClose = props.onCalendarClose,
    onCalendarOpen = props.onCalendarOpen,
    onChangeProps = props.onChange,
    onFocusProps = props.onFocus,
    onInvalidChange = props.onInvalidChange,
    _g = props.openCalendarOnFocus,
    openCalendarOnFocus = _g === void 0 ? true : _g,
    required = props.required,
    _h = props.returnValue,
    returnValue = _h === void 0 ? 'start' : _h,
    shouldCloseCalendar = props.shouldCloseCalendar,
    shouldOpenCalendar = props.shouldOpenCalendar,
    showLeadingZeros = props.showLeadingZeros,
    value = props.value,
    yearAriaLabel = props.yearAriaLabel,
    yearPlaceholder = props.yearPlaceholder,
    otherProps = __rest(props, ["autoFocus", "calendarAriaLabel", "calendarIcon", "className", "clearAriaLabel", "clearIcon", "closeCalendar", 'data-testid', "dayAriaLabel", "dayPlaceholder", "disableCalendar", "disabled", "format", "id", "isOpen", "locale", "maxDate", "maxDetail", "minDate", "monthAriaLabel", "monthPlaceholder", "name", "nativeInputAriaLabel", "onCalendarClose", "onCalendarOpen", "onChange", "onFocus", "onInvalidChange", "openCalendarOnFocus", "required", "returnValue", "shouldCloseCalendar", "shouldOpenCalendar", "showLeadingZeros", "value", "yearAriaLabel", "yearPlaceholder"]);
  var _j = useState(isOpenProps),
    isOpen = _j[0],
    setIsOpen = _j[1];
  var wrapper = useRef(null);
  var calendarWrapper = useRef(null);
  useEffect(function () {
    setIsOpen(isOpenProps);
  }, [isOpenProps]);
  function openCalendar(_a) {
    var reason = _a.reason;
    if (shouldOpenCalendar) {
      if (!shouldOpenCalendar({
        reason: reason
      })) {
        return;
      }
    }
    setIsOpen(true);
    if (onCalendarOpen) {
      onCalendarOpen();
    }
  }
  var closeCalendar = useCallback(function (_a) {
    var reason = _a.reason;
    if (shouldCloseCalendar) {
      if (!shouldCloseCalendar({
        reason: reason
      })) {
        return;
      }
    }
    setIsOpen(false);
    if (onCalendarClose) {
      onCalendarClose();
    }
  }, [onCalendarClose, shouldCloseCalendar]);
  function toggleCalendar() {
    if (isOpen) {
      closeCalendar({
        reason: 'buttonClick'
      });
    } else {
      openCalendar({
        reason: 'buttonClick'
      });
    }
  }
  function onChange(value, shouldCloseCalendar) {
    if (shouldCloseCalendar === void 0) {
      shouldCloseCalendar = shouldCloseCalendarOnSelect;
    }
    if (shouldCloseCalendar) {
      closeCalendar({
        reason: 'select'
      });
    }
    if (onChangeProps) {
      onChangeProps(value);
    }
  }
  function onFocus(event) {
    if (onFocusProps) {
      onFocusProps(event);
    }
    if (
    // Internet Explorer still fires onFocus on disabled elements
    disabled || isOpen || !openCalendarOnFocus || event.target.dataset.select === 'true') {
      return;
    }
    openCalendar({
      reason: 'focus'
    });
  }
  var onKeyDown = useCallback(function (event) {
    if (event.key === 'Escape') {
      closeCalendar({
        reason: 'escape'
      });
    }
  }, [closeCalendar]);
  function clear() {
    onChange(null);
  }
  function stopPropagation(event) {
    event.stopPropagation();
  }
  var onOutsideAction = useCallback(function (event) {
    var wrapperEl = wrapper.current;
    var calendarWrapperEl = calendarWrapper.current;
    // Try event.composedPath first to handle clicks inside a Shadow DOM.
    var target = 'composedPath' in event ? event.composedPath()[0] : event.target;
    if (target && wrapperEl && !wrapperEl.contains(target) && (!calendarWrapperEl || !calendarWrapperEl.contains(target))) {
      closeCalendar({
        reason: 'outsideAction'
      });
    }
  }, [calendarWrapper, closeCalendar, wrapper]);
  var handleOutsideActionListeners = useCallback(function (shouldListen) {
    if (shouldListen === void 0) {
      shouldListen = isOpen;
    }
    outsideActionEvents.forEach(function (event) {
      if (shouldListen) {
        document.addEventListener(event, onOutsideAction);
      } else {
        document.removeEventListener(event, onOutsideAction);
      }
    });
    if (shouldListen) {
      document.addEventListener('keydown', onKeyDown);
    } else {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [isOpen, onOutsideAction, onKeyDown]);
  useEffect(function () {
    handleOutsideActionListeners();
    return function () {
      handleOutsideActionListeners(false);
    };
  }, [handleOutsideActionListeners]);
  function renderInputs() {
    var valueFrom = (Array.isArray(value) ? value : [value])[0];
    var ariaLabelProps = {
      dayAriaLabel: dayAriaLabel,
      monthAriaLabel: monthAriaLabel,
      nativeInputAriaLabel: nativeInputAriaLabel,
      yearAriaLabel: yearAriaLabel
    };
    var placeholderProps = {
      dayPlaceholder: dayPlaceholder,
      monthPlaceholder: monthPlaceholder,
      yearPlaceholder: yearPlaceholder
    };
    return jsxs("div", {
      className: "".concat(baseClassName, "__wrapper"),
      children: [jsx(DateInput, __assign({}, ariaLabelProps, placeholderProps, {
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus: autoFocus,
        className: "".concat(baseClassName, "__inputGroup"),
        disabled: disabled,
        format: format,
        isCalendarOpen: isOpen,
        locale: locale,
        maxDate: maxDate,
        maxDetail: maxDetail,
        minDate: minDate,
        name: name,
        onChange: onChange,
        onInvalidChange: onInvalidChange,
        required: required,
        returnValue: returnValue,
        showLeadingZeros: showLeadingZeros,
        value: valueFrom
      })), clearIcon !== null && jsx("button", {
        "aria-label": clearAriaLabel,
        className: "".concat(baseClassName, "__clear-button ").concat(baseClassName, "__button"),
        disabled: disabled,
        onClick: clear,
        onFocus: stopPropagation,
        type: "button",
        children: typeof clearIcon === 'function' ? createElement(clearIcon) : clearIcon
      }), calendarIcon !== null && !disableCalendar && jsx("button", {
        "aria-expanded": isOpen || false,
        "aria-label": calendarAriaLabel,
        className: "".concat(baseClassName, "__calendar-button ").concat(baseClassName, "__button"),
        disabled: disabled,
        onClick: toggleCalendar,
        onFocus: stopPropagation,
        type: "button",
        children: typeof calendarIcon === 'function' ? createElement(calendarIcon) : calendarIcon
      })]
    });
  }
  function renderCalendar() {
    if (isOpen === null || disableCalendar) {
      return null;
    }
    var calendarProps = props.calendarProps,
      portalContainer = props.portalContainer,
      value = props.value;
    var className = "".concat(baseClassName, "__calendar");
    var classNames = clsx(className, "".concat(className, "--").concat(isOpen ? 'open' : 'closed'));
    var calendar = jsx(Calendar$1, __assign({
      locale: locale,
      maxDate: maxDate,
      maxDetail: maxDetail,
      minDate: minDate,
      onChange: function (value) {
        return onChange(value);
      },
      value: value
    }, calendarProps));
    return portalContainer ? createPortal(jsx("div", {
      ref: calendarWrapper,
      className: classNames,
      children: calendar
    }), portalContainer) : jsx(Fit, {
      children: jsx("div", {
        ref: function (ref) {
          if (ref && !isOpen) {
            ref.removeAttribute('style');
          }
        },
        className: classNames,
        children: calendar
      })
    });
  }
  var eventProps = useMemo(function () {
    return makeEventProps(otherProps);
  }, [otherProps]);
  return jsxs("div", __assign({
    className: clsx(baseClassName, "".concat(baseClassName, "--").concat(isOpen ? 'open' : 'closed'), "".concat(baseClassName, "--").concat(disabled ? 'disabled' : 'enabled'), className),
    "data-testid": dataTestid,
    id: id
  }, eventProps, {
    onFocus: onFocus,
    ref: wrapper,
    children: [renderInputs(), renderCalendar()]
  }));
}

function ReactDatePicker({
  autoFocus,
  autoSelectToday,
  dateAttr,
  dayPlaceholder,
  monthPlaceholder,
  onChangeAction,
  readOnlyStyle,
  showLeadingZeros,
  yearPlaceholder,
  ...rest
}) {
  const id = rest.id || "";
  const style = rest.class || "";
  const widgetName = rest.name || "";
  const [currentValue, setCurrentValue] = useState(() => {
    if (dateAttr.status === "available" && dateAttr.displayValue) {
      return dateAttr.displayValue;
    }
    return autoSelectToday ? new Date() : null;
  });
  const [disabledValue, setDisabledValue] = useState(false);
  useEffect(() => {
    if (dateAttr.status === "available") {
      if (currentValue) {
        dateAttr.setValue(new Date(currentValue));
      } else if (dateAttr.displayValue) {
        setCurrentValue(dateAttr.displayValue);
      }
      if (dateAttr.readOnly === true) {
        setDisabledValue(true);
      }
      if (dateAttr.readOnly === true) {
        setDisabledValue(true);
      }
    }
  }, [autoFocus, currentValue, dateAttr]);
  function onChangeInputAction(event) {
    if (onChangeAction && onChangeAction.canExecute) {
      onChangeAction.execute();
    }
  }
  if (disabledValue && disabledValue === true && readOnlyStyle === "text") {
    return createElement("div", {
      className: `react-date-picker ${style}`
    }, createElement("p", {
      className: `${widgetName} form-control-static`
    }, currentValue || dateAttr.displayValue));
  } else {
    return createElement("div", {
      className: `react-date-picker ${style}`
    }, autoFocus === false && createElement("button", {
      className: "react-date-picker-faux-btn"
    }), createElement(DatePicker, {
      autoFocus: autoFocus,
      showLeadingZeros: showLeadingZeros,
      isOpen: autoFocus,
      calendarAriaLabel: "Toggle calendar",
      className: "form-control",
      clearAriaLabel: "Clear value",
      disableCalendar: disabledValue,
      disabled: disabledValue,
      id: id,
      onChange: date => {
        onChangeInputAction();
        setCurrentValue(date ? new Date(date) : "");
      },
      value: currentValue,
      dayPlaceholder: dayPlaceholder,
      monthPlaceholder: monthPlaceholder,
      yearPlaceholder: yearPlaceholder
    }));
  }
}

export { ReactDatePicker };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3REYXRlUGlja2VyLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21ha2UtZXZlbnQtcHJvcHMvZGlzdC9lc20vaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2xzeC9kaXN0L2Nsc3gubWpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21lbS9ub2RlX21vZHVsZXMvbWltaWMtZm4vaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcC1kZWZlci9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9tYXAtYWdlLWNsZWFuZXIvZGlzdC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9tZW0vZGlzdC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9nZXQtdXNlci1sb2NhbGUvZGlzdC9lc20vaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQHdvanRla21hai9kYXRlLXV0aWxzL2Rpc3QvZXNtL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL3NoYXJlZC9jb25zdC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9zaGFyZWQvZGF0ZUZvcm1hdHRlci5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9zaGFyZWQvZGF0ZXMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vQ2FsZW5kYXIvTmF2aWdhdGlvbi5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9GbGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL3NoYXJlZC91dGlscy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9UaWxlR3JvdXAuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vVGlsZS5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9DZW50dXJ5Vmlldy9EZWNhZGUuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vQ2VudHVyeVZpZXcvRGVjYWRlcy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9DZW50dXJ5Vmlldy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9EZWNhZGVWaWV3L1llYXIuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vRGVjYWRlVmlldy9ZZWFycy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9EZWNhZGVWaWV3LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL1llYXJWaWV3L01vbnRoLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL1llYXJWaWV3L01vbnRocy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9ZZWFyVmlldy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9Nb250aFZpZXcvRGF5LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL01vbnRoVmlldy9EYXlzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL01vbnRoVmlldy9XZWVrZGF5cy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9Nb250aFZpZXcvV2Vla051bWJlci5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9Nb250aFZpZXcvV2Vla051bWJlcnMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vTW9udGhWaWV3LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL0NhbGVuZGFyLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2RldGVjdC1lbGVtZW50LW92ZXJmbG93L2Rpc3QvZXNtL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1maXQvZGlzdC9lc20vRml0LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGUtcGlja2VyL2Rpc3QvZXNtL0RpdmlkZXIuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdXBkYXRlLWlucHV0LXdpZHRoL2Rpc3QvZXNtL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGUtcGlja2VyL2Rpc3QvZXNtL0RhdGVJbnB1dC9JbnB1dC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1kYXRlLXBpY2tlci9kaXN0L2VzbS9zaGFyZWQvdXRpbHMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZS1waWNrZXIvZGlzdC9lc20vRGF0ZUlucHV0L0RheUlucHV0LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGUtcGlja2VyL2Rpc3QvZXNtL0RhdGVJbnB1dC9Nb250aElucHV0LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGUtcGlja2VyL2Rpc3QvZXNtL3NoYXJlZC9kYXRlRm9ybWF0dGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGUtcGlja2VyL2Rpc3QvZXNtL0RhdGVJbnB1dC9Nb250aFNlbGVjdC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1kYXRlLXBpY2tlci9kaXN0L2VzbS9EYXRlSW5wdXQvWWVhcklucHV0LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGUtcGlja2VyL2Rpc3QvZXNtL0RhdGVJbnB1dC9OYXRpdmVJbnB1dC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1kYXRlLXBpY2tlci9kaXN0L2VzbS9zaGFyZWQvZGF0ZXMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZS1waWNrZXIvZGlzdC9lc20vRGF0ZUlucHV0LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGUtcGlja2VyL2Rpc3QvZXNtL0RhdGVQaWNrZXIuanMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvUmVhY3REYXRlUGlja2VyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG4vLyBBcyBkZWZpbmVkIG9uIHRoZSBsaXN0IG9mIHN1cHBvcnRlZCBldmVudHM6IGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9ldmVudHMuaHRtbFxuZXhwb3J0IHZhciBjbGlwYm9hcmRFdmVudHMgPSBbJ29uQ29weScsICdvbkN1dCcsICdvblBhc3RlJ107XG5leHBvcnQgdmFyIGNvbXBvc2l0aW9uRXZlbnRzID0gW1xuICAgICdvbkNvbXBvc2l0aW9uRW5kJyxcbiAgICAnb25Db21wb3NpdGlvblN0YXJ0JyxcbiAgICAnb25Db21wb3NpdGlvblVwZGF0ZScsXG5dO1xuZXhwb3J0IHZhciBmb2N1c0V2ZW50cyA9IFsnb25Gb2N1cycsICdvbkJsdXInXTtcbmV4cG9ydCB2YXIgZm9ybUV2ZW50cyA9IFsnb25JbnB1dCcsICdvbkludmFsaWQnLCAnb25SZXNldCcsICdvblN1Ym1pdCddO1xuZXhwb3J0IHZhciBpbWFnZUV2ZW50cyA9IFsnb25Mb2FkJywgJ29uRXJyb3InXTtcbmV4cG9ydCB2YXIga2V5Ym9hcmRFdmVudHMgPSBbJ29uS2V5RG93bicsICdvbktleVByZXNzJywgJ29uS2V5VXAnXTtcbmV4cG9ydCB2YXIgbWVkaWFFdmVudHMgPSBbXG4gICAgJ29uQWJvcnQnLFxuICAgICdvbkNhblBsYXknLFxuICAgICdvbkNhblBsYXlUaHJvdWdoJyxcbiAgICAnb25EdXJhdGlvbkNoYW5nZScsXG4gICAgJ29uRW1wdGllZCcsXG4gICAgJ29uRW5jcnlwdGVkJyxcbiAgICAnb25FbmRlZCcsXG4gICAgJ29uRXJyb3InLFxuICAgICdvbkxvYWRlZERhdGEnLFxuICAgICdvbkxvYWRlZE1ldGFkYXRhJyxcbiAgICAnb25Mb2FkU3RhcnQnLFxuICAgICdvblBhdXNlJyxcbiAgICAnb25QbGF5JyxcbiAgICAnb25QbGF5aW5nJyxcbiAgICAnb25Qcm9ncmVzcycsXG4gICAgJ29uUmF0ZUNoYW5nZScsXG4gICAgJ29uU2Vla2VkJyxcbiAgICAnb25TZWVraW5nJyxcbiAgICAnb25TdGFsbGVkJyxcbiAgICAnb25TdXNwZW5kJyxcbiAgICAnb25UaW1lVXBkYXRlJyxcbiAgICAnb25Wb2x1bWVDaGFuZ2UnLFxuICAgICdvbldhaXRpbmcnLFxuXTtcbmV4cG9ydCB2YXIgbW91c2VFdmVudHMgPSBbXG4gICAgJ29uQ2xpY2snLFxuICAgICdvbkNvbnRleHRNZW51JyxcbiAgICAnb25Eb3VibGVDbGljaycsXG4gICAgJ29uTW91c2VEb3duJyxcbiAgICAnb25Nb3VzZUVudGVyJyxcbiAgICAnb25Nb3VzZUxlYXZlJyxcbiAgICAnb25Nb3VzZU1vdmUnLFxuICAgICdvbk1vdXNlT3V0JyxcbiAgICAnb25Nb3VzZU92ZXInLFxuICAgICdvbk1vdXNlVXAnLFxuXTtcbmV4cG9ydCB2YXIgZHJhZ0V2ZW50cyA9IFtcbiAgICAnb25EcmFnJyxcbiAgICAnb25EcmFnRW5kJyxcbiAgICAnb25EcmFnRW50ZXInLFxuICAgICdvbkRyYWdFeGl0JyxcbiAgICAnb25EcmFnTGVhdmUnLFxuICAgICdvbkRyYWdPdmVyJyxcbiAgICAnb25EcmFnU3RhcnQnLFxuICAgICdvbkRyb3AnLFxuXTtcbmV4cG9ydCB2YXIgc2VsZWN0aW9uRXZlbnRzID0gWydvblNlbGVjdCddO1xuZXhwb3J0IHZhciB0b3VjaEV2ZW50cyA9IFsnb25Ub3VjaENhbmNlbCcsICdvblRvdWNoRW5kJywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hTdGFydCddO1xuZXhwb3J0IHZhciBwb2ludGVyRXZlbnRzID0gW1xuICAgICdvblBvaW50ZXJEb3duJyxcbiAgICAnb25Qb2ludGVyTW92ZScsXG4gICAgJ29uUG9pbnRlclVwJyxcbiAgICAnb25Qb2ludGVyQ2FuY2VsJyxcbiAgICAnb25Hb3RQb2ludGVyQ2FwdHVyZScsXG4gICAgJ29uTG9zdFBvaW50ZXJDYXB0dXJlJyxcbiAgICAnb25Qb2ludGVyRW50ZXInLFxuICAgICdvblBvaW50ZXJMZWF2ZScsXG4gICAgJ29uUG9pbnRlck92ZXInLFxuICAgICdvblBvaW50ZXJPdXQnLFxuXTtcbmV4cG9ydCB2YXIgdWlFdmVudHMgPSBbJ29uU2Nyb2xsJ107XG5leHBvcnQgdmFyIHdoZWVsRXZlbnRzID0gWydvbldoZWVsJ107XG5leHBvcnQgdmFyIGFuaW1hdGlvbkV2ZW50cyA9IFtcbiAgICAnb25BbmltYXRpb25TdGFydCcsXG4gICAgJ29uQW5pbWF0aW9uRW5kJyxcbiAgICAnb25BbmltYXRpb25JdGVyYXRpb24nLFxuXTtcbmV4cG9ydCB2YXIgdHJhbnNpdGlvbkV2ZW50cyA9IFsnb25UcmFuc2l0aW9uRW5kJ107XG5leHBvcnQgdmFyIG90aGVyRXZlbnRzID0gWydvblRvZ2dsZSddO1xuZXhwb3J0IHZhciBjaGFuZ2VFdmVudHMgPSBbJ29uQ2hhbmdlJ107XG5leHBvcnQgdmFyIGFsbEV2ZW50cyA9IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBjbGlwYm9hcmRFdmVudHMsIHRydWUpLCBjb21wb3NpdGlvbkV2ZW50cywgdHJ1ZSksIGZvY3VzRXZlbnRzLCB0cnVlKSwgZm9ybUV2ZW50cywgdHJ1ZSksIGltYWdlRXZlbnRzLCB0cnVlKSwga2V5Ym9hcmRFdmVudHMsIHRydWUpLCBtZWRpYUV2ZW50cywgdHJ1ZSksIG1vdXNlRXZlbnRzLCB0cnVlKSwgZHJhZ0V2ZW50cywgdHJ1ZSksIHNlbGVjdGlvbkV2ZW50cywgdHJ1ZSksIHRvdWNoRXZlbnRzLCB0cnVlKSwgcG9pbnRlckV2ZW50cywgdHJ1ZSksIHVpRXZlbnRzLCB0cnVlKSwgd2hlZWxFdmVudHMsIHRydWUpLCBhbmltYXRpb25FdmVudHMsIHRydWUpLCB0cmFuc2l0aW9uRXZlbnRzLCB0cnVlKSwgY2hhbmdlRXZlbnRzLCB0cnVlKSwgb3RoZXJFdmVudHMsIHRydWUpO1xuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIG9uLWV2ZW50IGNhbGxiYWNrIHByb3BzIGN1cnJpZWQgd2l0aCBwcm92aWRlZCBhcmdzLlxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIFByb3BzIHBhc3NlZCB0byBhIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb249fSBnZXRBcmdzIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFyZ3VtZW50KHMpIG9uLWV2ZW50IGNhbGxiYWNrc1xuICogICBzaGFsbCBiZSBjdXJyaWVkIHdpdGguXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VFdmVudFByb3BzKHByb3BzLCBnZXRBcmdzKSB7XG4gICAgdmFyIGV2ZW50UHJvcHMgPSB7fTtcbiAgICBhbGxFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgIHZhciBldmVudEhhbmRsZXIgPSBwcm9wc1tldmVudE5hbWVdO1xuICAgICAgICBpZiAoIWV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnZXRBcmdzKSB7XG4gICAgICAgICAgICBldmVudFByb3BzW2V2ZW50TmFtZV0gPSAoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50SGFuZGxlcihldmVudCwgZ2V0QXJncyhldmVudE5hbWUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXZlbnRQcm9wc1tldmVudE5hbWVdID0gZXZlbnRIYW5kbGVyO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGV2ZW50UHJvcHM7XG59XG4iLCJmdW5jdGlvbiByKGUpe3ZhciB0LGYsbj1cIlwiO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlfHxcIm51bWJlclwiPT10eXBlb2YgZSluKz1lO2Vsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIGUpaWYoQXJyYXkuaXNBcnJheShlKSl7dmFyIG89ZS5sZW5ndGg7Zm9yKHQ9MDt0PG87dCsrKWVbdF0mJihmPXIoZVt0XSkpJiYobiYmKG4rPVwiIFwiKSxuKz1mKX1lbHNlIGZvcihmIGluIGUpZVtmXSYmKG4mJihuKz1cIiBcIiksbis9Zik7cmV0dXJuIG59ZXhwb3J0IGZ1bmN0aW9uIGNsc3goKXtmb3IodmFyIGUsdCxmPTAsbj1cIlwiLG89YXJndW1lbnRzLmxlbmd0aDtmPG87ZisrKShlPWFyZ3VtZW50c1tmXSkmJih0PXIoZSkpJiYobiYmKG4rPVwiIFwiKSxuKz10KTtyZXR1cm4gbn1leHBvcnQgZGVmYXVsdCBjbHN4OyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29weVByb3BlcnR5ID0gKHRvLCBmcm9tLCBwcm9wZXJ0eSwgaWdub3JlTm9uQ29uZmlndXJhYmxlKSA9PiB7XG5cdC8vIGBGdW5jdGlvbiNsZW5ndGhgIHNob3VsZCByZWZsZWN0IHRoZSBwYXJhbWV0ZXJzIG9mIGB0b2Agbm90IGBmcm9tYCBzaW5jZSB3ZSBrZWVwIGl0cyBib2R5LlxuXHQvLyBgRnVuY3Rpb24jcHJvdG90eXBlYCBpcyBub24td3JpdGFibGUgYW5kIG5vbi1jb25maWd1cmFibGUgc28gY2FuIG5ldmVyIGJlIG1vZGlmaWVkLlxuXHRpZiAocHJvcGVydHkgPT09ICdsZW5ndGgnIHx8IHByb3BlcnR5ID09PSAncHJvdG90eXBlJykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIGBGdW5jdGlvbiNhcmd1bWVudHNgIGFuZCBgRnVuY3Rpb24jY2FsbGVyYCBzaG91bGQgbm90IGJlIGNvcGllZC4gVGhleSB3ZXJlIHJlcG9ydGVkIHRvIGJlIHByZXNlbnQgaW4gYFJlZmxlY3Qub3duS2V5c2AgZm9yIHNvbWUgZGV2aWNlcyBpbiBSZWFjdCBOYXRpdmUgKCM0MSksIHNvIHdlIGV4cGxpY2l0bHkgaWdub3JlIHRoZW0gaGVyZS5cblx0aWYgKHByb3BlcnR5ID09PSAnYXJndW1lbnRzJyB8fCBwcm9wZXJ0eSA9PT0gJ2NhbGxlcicpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCB0b0Rlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRvLCBwcm9wZXJ0eSk7XG5cdGNvbnN0IGZyb21EZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihmcm9tLCBwcm9wZXJ0eSk7XG5cblx0aWYgKCFjYW5Db3B5UHJvcGVydHkodG9EZXNjcmlwdG9yLCBmcm9tRGVzY3JpcHRvcikgJiYgaWdub3JlTm9uQ29uZmlndXJhYmxlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRvLCBwcm9wZXJ0eSwgZnJvbURlc2NyaXB0b3IpO1xufTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgpYCB0aHJvd3MgaWYgdGhlIHByb3BlcnR5IGV4aXN0cywgaXMgbm90IGNvbmZpZ3VyYWJsZSBhbmQgZWl0aGVyOlxuLy8gIC0gb25lIGl0cyBkZXNjcmlwdG9ycyBpcyBjaGFuZ2VkXG4vLyAgLSBpdCBpcyBub24td3JpdGFibGUgYW5kIGl0cyB2YWx1ZSBpcyBjaGFuZ2VkXG5jb25zdCBjYW5Db3B5UHJvcGVydHkgPSBmdW5jdGlvbiAodG9EZXNjcmlwdG9yLCBmcm9tRGVzY3JpcHRvcikge1xuXHRyZXR1cm4gdG9EZXNjcmlwdG9yID09PSB1bmRlZmluZWQgfHwgdG9EZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSB8fCAoXG5cdFx0dG9EZXNjcmlwdG9yLndyaXRhYmxlID09PSBmcm9tRGVzY3JpcHRvci53cml0YWJsZSAmJlxuXHRcdHRvRGVzY3JpcHRvci5lbnVtZXJhYmxlID09PSBmcm9tRGVzY3JpcHRvci5lbnVtZXJhYmxlICYmXG5cdFx0dG9EZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9PT0gZnJvbURlc2NyaXB0b3IuY29uZmlndXJhYmxlICYmXG5cdFx0KHRvRGVzY3JpcHRvci53cml0YWJsZSB8fCB0b0Rlc2NyaXB0b3IudmFsdWUgPT09IGZyb21EZXNjcmlwdG9yLnZhbHVlKVxuXHQpO1xufTtcblxuY29uc3QgY2hhbmdlUHJvdG90eXBlID0gKHRvLCBmcm9tKSA9PiB7XG5cdGNvbnN0IGZyb21Qcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZnJvbSk7XG5cdGlmIChmcm9tUHJvdG90eXBlID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodG8pKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKHRvLCBmcm9tUHJvdG90eXBlKTtcbn07XG5cbmNvbnN0IHdyYXBwZWRUb1N0cmluZyA9ICh3aXRoTmFtZSwgZnJvbUJvZHkpID0+IGAvKiBXcmFwcGVkICR7d2l0aE5hbWV9Ki9cXG4ke2Zyb21Cb2R5fWA7XG5cbmNvbnN0IHRvU3RyaW5nRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnKTtcbmNvbnN0IHRvU3RyaW5nTmFtZSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLCAnbmFtZScpO1xuXG4vLyBXZSBjYWxsIGBmcm9tLnRvU3RyaW5nKClgIGVhcmx5IChub3QgbGF6aWx5KSB0byBlbnN1cmUgYGZyb21gIGNhbiBiZSBnYXJiYWdlIGNvbGxlY3RlZC5cbi8vIFdlIHVzZSBgYmluZCgpYCBpbnN0ZWFkIG9mIGEgY2xvc3VyZSBmb3IgdGhlIHNhbWUgcmVhc29uLlxuLy8gQ2FsbGluZyBgZnJvbS50b1N0cmluZygpYCBlYXJseSBhbHNvIGFsbG93cyBjYWNoaW5nIGl0IGluIGNhc2UgYHRvLnRvU3RyaW5nKClgIGlzIGNhbGxlZCBzZXZlcmFsIHRpbWVzLlxuY29uc3QgY2hhbmdlVG9TdHJpbmcgPSAodG8sIGZyb20sIG5hbWUpID0+IHtcblx0Y29uc3Qgd2l0aE5hbWUgPSBuYW1lID09PSAnJyA/ICcnIDogYHdpdGggJHtuYW1lLnRyaW0oKX0oKSBgO1xuXHRjb25zdCBuZXdUb1N0cmluZyA9IHdyYXBwZWRUb1N0cmluZy5iaW5kKG51bGwsIHdpdGhOYW1lLCBmcm9tLnRvU3RyaW5nKCkpO1xuXHQvLyBFbnN1cmUgYHRvLnRvU3RyaW5nLnRvU3RyaW5nYCBpcyBub24tZW51bWVyYWJsZSBhbmQgaGFzIHRoZSBzYW1lIGBzYW1lYFxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3VG9TdHJpbmcsICduYW1lJywgdG9TdHJpbmdOYW1lKTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRvLCAndG9TdHJpbmcnLCB7Li4udG9TdHJpbmdEZXNjcmlwdG9yLCB2YWx1ZTogbmV3VG9TdHJpbmd9KTtcbn07XG5cbmNvbnN0IG1pbWljRm4gPSAodG8sIGZyb20sIHtpZ25vcmVOb25Db25maWd1cmFibGUgPSBmYWxzZX0gPSB7fSkgPT4ge1xuXHRjb25zdCB7bmFtZX0gPSB0bztcblxuXHRmb3IgKGNvbnN0IHByb3BlcnR5IG9mIFJlZmxlY3Qub3duS2V5cyhmcm9tKSkge1xuXHRcdGNvcHlQcm9wZXJ0eSh0bywgZnJvbSwgcHJvcGVydHksIGlnbm9yZU5vbkNvbmZpZ3VyYWJsZSk7XG5cdH1cblxuXHRjaGFuZ2VQcm90b3R5cGUodG8sIGZyb20pO1xuXHRjaGFuZ2VUb1N0cmluZyh0bywgZnJvbSwgbmFtZSk7XG5cblx0cmV0dXJuIHRvO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtaW1pY0ZuO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG5cdGNvbnN0IHJldCA9IHt9O1xuXG5cdHJldC5wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHJldC5yZXNvbHZlID0gcmVzb2x2ZTtcblx0XHRyZXQucmVqZWN0ID0gcmVqZWN0O1xuXHR9KTtcblxuXHRyZXR1cm4gcmV0O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBwX2RlZmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInAtZGVmZXJcIikpO1xuZnVuY3Rpb24gbWFwQWdlQ2xlYW5lcihtYXAsIHByb3BlcnR5ID0gJ21heEFnZScpIHtcbiAgICBsZXQgcHJvY2Vzc2luZ0tleTtcbiAgICBsZXQgcHJvY2Vzc2luZ1RpbWVyO1xuICAgIGxldCBwcm9jZXNzaW5nRGVmZXJyZWQ7XG4gICAgY29uc3QgY2xlYW51cCA9ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKHByb2Nlc3NpbmdLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGFscmVhZHkgcHJvY2Vzc2luZyBhbiBpdGVtLCB3ZSBjYW4gc2FmZWx5IGV4aXRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXR1cFRpbWVyID0gKGl0ZW0pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZCA9IHBfZGVmZXJfMS5kZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IGl0ZW1bMV1bcHJvcGVydHldIC0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmIChkZWxheSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpdGVtIGltbWVkaWF0ZWx5IGlmIHRoZSBkZWxheSBpcyBlcXVhbCB0byBvciBiZWxvdyAwXG4gICAgICAgICAgICAgICAgbWFwLmRlbGV0ZShpdGVtWzBdKTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEtlZXAgdHJhY2sgb2YgdGhlIGN1cnJlbnQgcHJvY2Vzc2VkIGtleVxuICAgICAgICAgICAgcHJvY2Vzc2luZ0tleSA9IGl0ZW1bMF07XG4gICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGl0ZW0gd2hlbiB0aGUgdGltZW91dCBmaXJlc1xuICAgICAgICAgICAgICAgIG1hcC5kZWxldGUoaXRlbVswXSk7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NpbmdEZWZlcnJlZCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzdHJpY3QtdHlwZS1wcmVkaWNhdGVzXG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb2Nlc3NpbmdUaW1lci51bnJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vIERvbid0IGhvbGQgdXAgdGhlIHByb2Nlc3MgZnJvbSBleGl0aW5nXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2luZ1RpbWVyLnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzc2luZ0RlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBtYXApIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBzZXR1cFRpbWVyKGVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgICAgIC8vIERvIG5vdGhpbmcgaWYgYW4gZXJyb3Igb2NjdXJzLCB0aGlzIG1lYW5zIHRoZSB0aW1lciB3YXMgY2xlYW5lZCB1cCBhbmQgd2Ugc2hvdWxkIHN0b3AgcHJvY2Vzc2luZ1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3NpbmdLZXkgPSB1bmRlZmluZWQ7XG4gICAgfSk7XG4gICAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgICAgIHByb2Nlc3NpbmdLZXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChwcm9jZXNzaW5nVGltZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHByb2Nlc3NpbmdUaW1lcik7XG4gICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3NpbmdEZWZlcnJlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6ZWFybHktZXhpdFxuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkLnJlamVjdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvcmlnaW5hbFNldCA9IG1hcC5zZXQuYmluZChtYXApO1xuICAgIG1hcC5zZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAobWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUga2V5IGFscmVhZHkgZXhpc3QsIHJlbW92ZSBpdCBzbyB3ZSBjYW4gYWRkIGl0IGJhY2sgYXQgdGhlIGVuZCBvZiB0aGUgbWFwLlxuICAgICAgICAgICAgbWFwLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbGwgdGhlIG9yaWdpbmFsIGBtYXAuc2V0YFxuICAgICAgICBjb25zdCByZXN1bHQgPSBvcmlnaW5hbFNldChrZXksIHZhbHVlKTtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGFscmVhZHkgcHJvY2Vzc2luZyBhIGtleSBhbmQgdGhlIGtleSBhZGRlZCBpcyB0aGUgY3VycmVudCBwcm9jZXNzZWQga2V5LCBzdG9wIHByb2Nlc3NpbmcgaXRcbiAgICAgICAgaWYgKHByb2Nlc3NpbmdLZXkgJiYgcHJvY2Vzc2luZ0tleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICByZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFsd2F5cyBydW4gdGhlIGNsZWFudXAgbWV0aG9kIGluIGNhc2UgaXQgd2Fzbid0IHN0YXJ0ZWQgeWV0XG4gICAgICAgIGNsZWFudXAoKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgY2xlYW51cCgpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgcmV0dXJuIG1hcDtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IG1hcEFnZUNsZWFuZXI7XG4vLyBBZGQgc3VwcG9ydCBmb3IgQ0pTXG5tb2R1bGUuZXhwb3J0cyA9IG1hcEFnZUNsZWFuZXI7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gbWFwQWdlQ2xlYW5lcjtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IG1pbWljRm4gPSByZXF1aXJlKFwibWltaWMtZm5cIik7XG5jb25zdCBtYXBBZ2VDbGVhbmVyID0gcmVxdWlyZShcIm1hcC1hZ2UtY2xlYW5lclwiKTtcbmNvbnN0IGRlY29yYXRvckluc3RhbmNlTWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGNhY2hlU3RvcmUgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG5bTWVtb2l6ZV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTWVtb2l6YXRpb24pIGZ1bmN0aW9ucyAtIEFuIG9wdGltaXphdGlvbiB1c2VkIHRvIHNwZWVkIHVwIGNvbnNlY3V0aXZlIGZ1bmN0aW9uIGNhbGxzIGJ5IGNhY2hpbmcgdGhlIHJlc3VsdCBvZiBjYWxscyB3aXRoIGlkZW50aWNhbCBpbnB1dC5cblxuQHBhcmFtIGZuIC0gRnVuY3Rpb24gdG8gYmUgbWVtb2l6ZWQuXG5cbkBleGFtcGxlXG5gYGBcbmltcG9ydCBtZW0gPSByZXF1aXJlKCdtZW0nKTtcblxubGV0IGkgPSAwO1xuY29uc3QgY291bnRlciA9ICgpID0+ICsraTtcbmNvbnN0IG1lbW9pemVkID0gbWVtKGNvdW50ZXIpO1xuXG5tZW1vaXplZCgnZm9vJyk7XG4vLz0+IDFcblxuLy8gQ2FjaGVkIGFzIGl0J3MgdGhlIHNhbWUgYXJndW1lbnRzXG5tZW1vaXplZCgnZm9vJyk7XG4vLz0+IDFcblxuLy8gTm90IGNhY2hlZCBhbnltb3JlIGFzIHRoZSBhcmd1bWVudHMgY2hhbmdlZFxubWVtb2l6ZWQoJ2JhcicpO1xuLy89PiAyXG5cbm1lbW9pemVkKCdiYXInKTtcbi8vPT4gMlxuYGBgXG4qL1xuY29uc3QgbWVtID0gKGZuLCB7IGNhY2hlS2V5LCBjYWNoZSA9IG5ldyBNYXAoKSwgbWF4QWdlIH0gPSB7fSkgPT4ge1xuICAgIGlmICh0eXBlb2YgbWF4QWdlID09PSAnbnVtYmVyJykge1xuICAgICAgICAvLyBUT0RPOiBEcm9wIGFmdGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9TYW1WZXJzY2h1ZXJlbi9tYXAtYWdlLWNsZWFuZXIvaXNzdWVzLzVcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICBtYXBBZ2VDbGVhbmVyKGNhY2hlKTtcbiAgICB9XG4gICAgY29uc3QgbWVtb2l6ZWQgPSBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuICAgICAgICBjb25zdCBrZXkgPSBjYWNoZUtleSA/IGNhY2hlS2V5KGFyZ3VtZW50c18pIDogYXJndW1lbnRzX1swXTtcbiAgICAgICAgY29uc3QgY2FjaGVJdGVtID0gY2FjaGUuZ2V0KGtleSk7XG4gICAgICAgIGlmIChjYWNoZUl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZUl0ZW0uZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHNfKTtcbiAgICAgICAgY2FjaGUuc2V0KGtleSwge1xuICAgICAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICAgICAgbWF4QWdlOiBtYXhBZ2UgPyBEYXRlLm5vdygpICsgbWF4QWdlIDogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgbWltaWNGbihtZW1vaXplZCwgZm4sIHtcbiAgICAgICAgaWdub3JlTm9uQ29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgY2FjaGVTdG9yZS5zZXQobWVtb2l6ZWQsIGNhY2hlKTtcbiAgICByZXR1cm4gbWVtb2l6ZWQ7XG59O1xuLyoqXG5AcmV0dXJucyBBIFtkZWNvcmF0b3JdKGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWRlY29yYXRvcnMpIHRvIG1lbW9pemUgY2xhc3MgbWV0aG9kcyBvciBzdGF0aWMgY2xhc3MgbWV0aG9kcy5cblxuQGV4YW1wbGVcbmBgYFxuaW1wb3J0IG1lbSA9IHJlcXVpcmUoJ21lbScpO1xuXG5jbGFzcyBFeGFtcGxlIHtcbiAgICBpbmRleCA9IDBcblxuICAgIEBtZW0uZGVjb3JhdG9yKClcbiAgICBjb3VudGVyKCkge1xuICAgICAgICByZXR1cm4gKyt0aGlzLmluZGV4O1xuICAgIH1cbn1cblxuY2xhc3MgRXhhbXBsZVdpdGhPcHRpb25zIHtcbiAgICBpbmRleCA9IDBcblxuICAgIEBtZW0uZGVjb3JhdG9yKHttYXhBZ2U6IDEwMDB9KVxuICAgIGNvdW50ZXIoKSB7XG4gICAgICAgIHJldHVybiArK3RoaXMuaW5kZXg7XG4gICAgfVxufVxuYGBgXG4qL1xubWVtLmRlY29yYXRvciA9IChvcHRpb25zID0ge30pID0+ICh0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSB0YXJnZXRbcHJvcGVydHlLZXldO1xuICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGRlY29yYXRlZCB2YWx1ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG4gICAgZGVsZXRlIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgZGVsZXRlIGRlc2NyaXB0b3Iud3JpdGFibGU7XG4gICAgZGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZGVjb3JhdG9ySW5zdGFuY2VNYXAuaGFzKHRoaXMpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG1lbShpbnB1dCwgb3B0aW9ucyk7XG4gICAgICAgICAgICBkZWNvcmF0b3JJbnN0YW5jZU1hcC5zZXQodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWNvcmF0b3JJbnN0YW5jZU1hcC5nZXQodGhpcyk7XG4gICAgfTtcbn07XG4vKipcbkNsZWFyIGFsbCBjYWNoZWQgZGF0YSBvZiBhIG1lbW9pemVkIGZ1bmN0aW9uLlxuXG5AcGFyYW0gZm4gLSBNZW1vaXplZCBmdW5jdGlvbi5cbiovXG5tZW0uY2xlYXIgPSAoZm4pID0+IHtcbiAgICBjb25zdCBjYWNoZSA9IGNhY2hlU3RvcmUuZ2V0KGZuKTtcbiAgICBpZiAoIWNhY2hlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhblxcJ3QgY2xlYXIgYSBmdW5jdGlvbiB0aGF0IHdhcyBub3QgbWVtb2l6ZWQhJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY2FjaGUuY2xlYXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNhY2hlIE1hcCBjYW5cXCd0IGJlIGNsZWFyZWQhJyk7XG4gICAgfVxuICAgIGNhY2hlLmNsZWFyKCk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBtZW07XG4iLCJpbXBvcnQgbWVtIGZyb20gJ21lbSc7XG5mdW5jdGlvbiBpc1N0cmluZyhlbCkge1xuICAgIHJldHVybiB0eXBlb2YgZWwgPT09ICdzdHJpbmcnO1xufVxuZnVuY3Rpb24gaXNVbmlxdWUoZWwsIGluZGV4LCBhcnIpIHtcbiAgICByZXR1cm4gYXJyLmluZGV4T2YoZWwpID09PSBpbmRleDtcbn1cbmZ1bmN0aW9uIGlzQWxsTG93ZXJDYXNlKGVsKSB7XG4gICAgcmV0dXJuIGVsLnRvTG93ZXJDYXNlKCkgPT09IGVsO1xufVxuZnVuY3Rpb24gZml4Q29tbWFzKGVsKSB7XG4gICAgcmV0dXJuIGVsLmluZGV4T2YoJywnKSA9PT0gLTEgPyBlbCA6IGVsLnNwbGl0KCcsJyk7XG59XG5mdW5jdGlvbiBub3JtYWxpemVMb2NhbGUobG9jYWxlKSB7XG4gICAgaWYgKCFsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICB9XG4gICAgaWYgKGxvY2FsZSA9PT0gJ0MnIHx8IGxvY2FsZSA9PT0gJ3Bvc2l4JyB8fCBsb2NhbGUgPT09ICdQT1NJWCcpIHtcbiAgICAgICAgcmV0dXJuICdlbi1VUyc7XG4gICAgfVxuICAgIC8vIElmIHRoZXJlJ3MgYSBkb3QgKC4pIGluIHRoZSBsb2NhbGUsIGl0J3MgbGlrZWx5IGluIHRoZSBmb3JtYXQgb2YgXCJlbi1VUy5VVEYtOFwiLCBzbyB3ZSBvbmx5IHRha2UgdGhlIGZpcnN0IHBhcnRcbiAgICBpZiAobG9jYWxlLmluZGV4T2YoJy4nKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIF9hID0gbG9jYWxlLnNwbGl0KCcuJylbMF0sIGFjdHVhbExvY2FsZSA9IF9hID09PSB2b2lkIDAgPyAnJyA6IF9hO1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplTG9jYWxlKGFjdHVhbExvY2FsZSk7XG4gICAgfVxuICAgIC8vIElmIHRoZXJlJ3MgYW4gYXQgc2lnbiAoQCkgaW4gdGhlIGxvY2FsZSwgaXQncyBsaWtlbHkgaW4gdGhlIGZvcm1hdCBvZiBcImVuLVVTQHBvc2l4XCIsIHNvIHdlIG9ubHkgdGFrZSB0aGUgZmlyc3QgcGFydFxuICAgIGlmIChsb2NhbGUuaW5kZXhPZignQCcpICE9PSAtMSkge1xuICAgICAgICB2YXIgX2IgPSBsb2NhbGUuc3BsaXQoJ0AnKVswXSwgYWN0dWFsTG9jYWxlID0gX2IgPT09IHZvaWQgMCA/ICcnIDogX2I7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVMb2NhbGUoYWN0dWFsTG9jYWxlKTtcbiAgICB9XG4gICAgLy8gSWYgdGhlcmUncyBhIGRhc2ggKC0pIGluIHRoZSBsb2NhbGUgYW5kIGl0J3Mgbm90IGFsbCBsb3dlciBjYXNlLCBpdCdzIGFscmVhZHkgaW4gdGhlIGZvcm1hdCBvZiBcImVuLVVTXCIsIHNvIHdlIHJldHVybiBpdFxuICAgIGlmIChsb2NhbGUuaW5kZXhPZignLScpID09PSAtMSB8fCAhaXNBbGxMb3dlckNhc2UobG9jYWxlKSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgIH1cbiAgICB2YXIgX2MgPSBsb2NhbGUuc3BsaXQoJy0nKSwgc3BsaXRFbDEgPSBfY1swXSwgX2QgPSBfY1sxXSwgc3BsaXRFbDIgPSBfZCA9PT0gdm9pZCAwID8gJycgOiBfZDtcbiAgICByZXR1cm4gXCJcIi5jb25jYXQoc3BsaXRFbDEsIFwiLVwiKS5jb25jYXQoc3BsaXRFbDIudG9VcHBlckNhc2UoKSk7XG59XG5mdW5jdGlvbiBnZXRVc2VyTG9jYWxlc0ludGVybmFsKF9hKSB7XG4gICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IHt9IDogX2EsIF9jID0gX2IudXNlRmFsbGJhY2tMb2NhbGUsIHVzZUZhbGxiYWNrTG9jYWxlID0gX2MgPT09IHZvaWQgMCA/IHRydWUgOiBfYywgX2QgPSBfYi5mYWxsYmFja0xvY2FsZSwgZmFsbGJhY2tMb2NhbGUgPSBfZCA9PT0gdm9pZCAwID8gJ2VuLVVTJyA6IF9kO1xuICAgIHZhciBsYW5ndWFnZUxpc3QgPSBbXTtcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIHJhd0xhbmd1YWdlcyA9IG5hdmlnYXRvci5sYW5ndWFnZXMgfHwgW107XG4gICAgICAgIHZhciBsYW5ndWFnZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCByYXdMYW5ndWFnZXNfMSA9IHJhd0xhbmd1YWdlczsgX2kgPCByYXdMYW5ndWFnZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciByYXdMYW5ndWFnZXNJdGVtID0gcmF3TGFuZ3VhZ2VzXzFbX2ldO1xuICAgICAgICAgICAgbGFuZ3VhZ2VzID0gbGFuZ3VhZ2VzLmNvbmNhdChmaXhDb21tYXMocmF3TGFuZ3VhZ2VzSXRlbSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByYXdMYW5ndWFnZSA9IG5hdmlnYXRvci5sYW5ndWFnZTtcbiAgICAgICAgdmFyIGxhbmd1YWdlID0gcmF3TGFuZ3VhZ2UgPyBmaXhDb21tYXMocmF3TGFuZ3VhZ2UpIDogcmF3TGFuZ3VhZ2U7XG4gICAgICAgIGxhbmd1YWdlTGlzdCA9IGxhbmd1YWdlTGlzdC5jb25jYXQobGFuZ3VhZ2VzLCBsYW5ndWFnZSk7XG4gICAgfVxuICAgIGlmICh1c2VGYWxsYmFja0xvY2FsZSkge1xuICAgICAgICBsYW5ndWFnZUxpc3QucHVzaChmYWxsYmFja0xvY2FsZSk7XG4gICAgfVxuICAgIHJldHVybiBsYW5ndWFnZUxpc3QuZmlsdGVyKGlzU3RyaW5nKS5tYXAobm9ybWFsaXplTG9jYWxlKS5maWx0ZXIoaXNVbmlxdWUpO1xufVxuZXhwb3J0IHZhciBnZXRVc2VyTG9jYWxlcyA9IG1lbShnZXRVc2VyTG9jYWxlc0ludGVybmFsLCB7IGNhY2hlS2V5OiBKU09OLnN0cmluZ2lmeSB9KTtcbmZ1bmN0aW9uIGdldFVzZXJMb2NhbGVJbnRlcm5hbChvcHRpb25zKSB7XG4gICAgcmV0dXJuIGdldFVzZXJMb2NhbGVzKG9wdGlvbnMpWzBdIHx8IG51bGw7XG59XG5leHBvcnQgdmFyIGdldFVzZXJMb2NhbGUgPSBtZW0oZ2V0VXNlckxvY2FsZUludGVybmFsLCB7IGNhY2hlS2V5OiBKU09OLnN0cmluZ2lmeSB9KTtcbmV4cG9ydCBkZWZhdWx0IGdldFVzZXJMb2NhbGU7XG4iLCIvKipcbiAqIFV0aWxzXG4gKi9cbmZ1bmN0aW9uIG1ha2VHZXRFZGdlT2ZOZWlnaGJvcihnZXRQZXJpb2QsIGdldEVkZ2VPZlBlcmlvZCwgZGVmYXVsdE9mZnNldCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBtYWtlR2V0RWRnZU9mTmVpZ2hib3JJbnRlcm5hbChkYXRlLCBvZmZzZXQpIHtcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gdm9pZCAwKSB7IG9mZnNldCA9IGRlZmF1bHRPZmZzZXQ7IH1cbiAgICAgICAgdmFyIHByZXZpb3VzUGVyaW9kID0gZ2V0UGVyaW9kKGRhdGUpICsgb2Zmc2V0O1xuICAgICAgICByZXR1cm4gZ2V0RWRnZU9mUGVyaW9kKHByZXZpb3VzUGVyaW9kKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gbWFrZUdldEVuZChnZXRCZWdpbk9mTmV4dFBlcmlvZCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBtYWtlR2V0RW5kSW50ZXJuYWwoZGF0ZSkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoZ2V0QmVnaW5PZk5leHRQZXJpb2QoZGF0ZSkuZ2V0VGltZSgpIC0gMSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG1ha2VHZXRSYW5nZShnZXRTdGFydCwgZ2V0RW5kKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1ha2VHZXRSYW5nZUludGVybmFsKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIFtnZXRTdGFydChkYXRlKSwgZ2V0RW5kKGRhdGUpXTtcbiAgICB9O1xufVxuLyoqXG4gKiBTaW1wbGUgZ2V0dGVycyAtIGdldHRpbmcgYSBwcm9wZXJ0eSBvZiBhIGdpdmVuIHBvaW50IGluIHRpbWVcbiAqL1xuLyoqXG4gKiBHZXRzIHllYXIgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCB5ZWFyIGZyb21cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFllYXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFllYXIoZGF0ZSkge1xuICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICB2YXIgeWVhciA9IHBhcnNlSW50KGRhdGUsIDEwKTtcbiAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnICYmICFpc05hTih5ZWFyKSkge1xuICAgICAgICByZXR1cm4geWVhcjtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGdldCB5ZWFyIGZyb20gZGF0ZTogXCIuY29uY2F0KGRhdGUsIFwiLlwiKSk7XG59XG4vKipcbiAqIEdldHMgbW9udGggZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUgdG8gZ2V0IG1vbnRoIGZyb21cbiAqIEByZXR1cm5zIHtudW1iZXJ9IE1vbnRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb250aChkYXRlKSB7XG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZXQgbW9udGggZnJvbSBkYXRlOiBcIi5jb25jYXQoZGF0ZSwgXCIuXCIpKTtcbn1cbi8qKlxuICogR2V0cyBodW1hbi1yZWFkYWJsZSBtb250aCBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZSB0byBnZXQgaHVtYW4tcmVhZGFibGUgbW9udGggZnJvbVxuICogQHJldHVybnMge251bWJlcn0gSHVtYW4tcmVhZGFibGUgbW9udGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1vbnRoSHVtYW4oZGF0ZSkge1xuICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGdldCBodW1hbi1yZWFkYWJsZSBtb250aCBmcm9tIGRhdGU6IFwiLmNvbmNhdChkYXRlLCBcIi5cIikpO1xufVxuLyoqXG4gKiBHZXRzIGRheSBvZiB0aGUgbW9udGggZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUgdG8gZ2V0IGRheSBvZiB0aGUgbW9udGggZnJvbVxuICogQHJldHVybnMge251bWJlcn0gRGF5IG9mIHRoZSBtb250aFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0ZShkYXRlKSB7XG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldERhdGUoKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGdldCB5ZWFyIGZyb20gZGF0ZTogXCIuY29uY2F0KGRhdGUsIFwiLlwiKSk7XG59XG4vKipcbiAqIEdldHMgaG91cnMgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlIHwgc3RyaW5nfSBkYXRlIERhdGUgdG8gZ2V0IGhvdXJzIGZyb21cbiAqIEByZXR1cm5zIHtudW1iZXJ9IEhvdXJzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb3VycyhkYXRlKSB7XG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIGRhdGVQaWVjZXMgPSBkYXRlLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmIChkYXRlUGllY2VzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICB2YXIgaG91cnNTdHJpbmcgPSBkYXRlUGllY2VzWzBdO1xuICAgICAgICAgICAgaWYgKGhvdXJzU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhvdXJzID0gcGFyc2VJbnQoaG91cnNTdHJpbmcsIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKGhvdXJzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaG91cnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZXQgaG91cnMgZnJvbSBkYXRlOiBcIi5jb25jYXQoZGF0ZSwgXCIuXCIpKTtcbn1cbi8qKlxuICogR2V0cyBtaW51dGVzIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZSB8IHN0cmluZ30gZGF0ZSBEYXRlIHRvIGdldCBtaW51dGVzIGZyb21cbiAqIEByZXR1cm5zIHtudW1iZXJ9IE1pbnV0ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1pbnV0ZXMoZGF0ZSkge1xuICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIGRhdGVQaWVjZXMgPSBkYXRlLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmIChkYXRlUGllY2VzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICB2YXIgbWludXRlc1N0cmluZyA9IGRhdGVQaWVjZXNbMV0gfHwgJzAnO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMgPSBwYXJzZUludChtaW51dGVzU3RyaW5nLCAxMCk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKG1pbnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1pbnV0ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGdldCBtaW51dGVzIGZyb20gZGF0ZTogXCIuY29uY2F0KGRhdGUsIFwiLlwiKSk7XG59XG4vKipcbiAqIEdldHMgc2Vjb25kcyBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGUgfCBzdHJpbmd9IGRhdGUgRGF0ZSB0byBnZXQgc2Vjb25kcyBmcm9tXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBTZWNvbmRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWNvbmRzKGRhdGUpIHtcbiAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBkYXRlUGllY2VzID0gZGF0ZS5zcGxpdCgnOicpO1xuICAgICAgICBpZiAoZGF0ZVBpZWNlcy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgdmFyIHNlY29uZHNXaXRoTWlsbGlzZWNvbmRzU3RyaW5nID0gZGF0ZVBpZWNlc1syXSB8fCAnMCc7XG4gICAgICAgICAgICB2YXIgc2Vjb25kcyA9IHBhcnNlSW50KHNlY29uZHNXaXRoTWlsbGlzZWNvbmRzU3RyaW5nLCAxMCk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHNlY29uZHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlY29uZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGdldCBzZWNvbmRzIGZyb20gZGF0ZTogXCIuY29uY2F0KGRhdGUsIFwiLlwiKSk7XG59XG4vKipcbiAqIEdldHMgbWlsbGlzZWNvbmRzIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZSB8IHN0cmluZ30gZGF0ZSBEYXRlIHRvIGdldCBtaWxsaXNlY29uZHMgZnJvbVxuICogQHJldHVybnMge251bWJlcn0gTWlsbGlzZWNvbmRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaWxsaXNlY29uZHMoZGF0ZSkge1xuICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgZGF0ZVBpZWNlcyA9IGRhdGUuc3BsaXQoJzonKTtcbiAgICAgICAgaWYgKGRhdGVQaWVjZXMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIHZhciBzZWNvbmRzV2l0aE1pbGxpc2Vjb25kc1N0cmluZyA9IGRhdGVQaWVjZXNbMl0gfHwgJzAnO1xuICAgICAgICAgICAgdmFyIG1pbGxpc2Vjb25kc1N0cmluZyA9IHNlY29uZHNXaXRoTWlsbGlzZWNvbmRzU3RyaW5nLnNwbGl0KCcuJylbMV0gfHwgJzAnO1xuICAgICAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IHBhcnNlSW50KG1pbGxpc2Vjb25kc1N0cmluZywgMTApO1xuICAgICAgICAgICAgaWYgKCFpc05hTihtaWxsaXNlY29uZHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2V0IHNlY29uZHMgZnJvbSBkYXRlOiBcIi5jb25jYXQoZGF0ZSwgXCIuXCIpKTtcbn1cbi8qKlxuICogQ2VudHVyeVxuICovXG4vKipcbiAqIEdldHMgY2VudHVyeSBzdGFydCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgY2VudHVyeSBzdGFydCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gQ2VudHVyeSBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDZW50dXJ5U3RhcnQoZGF0ZSkge1xuICAgIHZhciB5ZWFyID0gZ2V0WWVhcihkYXRlKTtcbiAgICB2YXIgY2VudHVyeVN0YXJ0WWVhciA9IHllYXIgKyAoKC15ZWFyICsgMSkgJSAxMDApO1xuICAgIHZhciBjZW50dXJ5U3RhcnREYXRlID0gbmV3IERhdGUoKTtcbiAgICBjZW50dXJ5U3RhcnREYXRlLnNldEZ1bGxZZWFyKGNlbnR1cnlTdGFydFllYXIsIDAsIDEpO1xuICAgIGNlbnR1cnlTdGFydERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgcmV0dXJuIGNlbnR1cnlTdGFydERhdGU7XG59XG4vKipcbiAqIEdldHMgcHJldmlvdXMgY2VudHVyeSBzdGFydCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgcHJldmlvdXMgY2VudHVyeSBzdGFydCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gUHJldmlvdXMgY2VudHVyeSBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0UHJldmlvdXNDZW50dXJ5U3RhcnQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0Q2VudHVyeVN0YXJ0LCAtMTAwKTtcbi8qKlxuICogR2V0cyBuZXh0IGNlbnR1cnkgc3RhcnQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IG5leHQgY2VudHVyeSBzdGFydCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gTmV4dCBjZW50dXJ5IHN0YXJ0IGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXROZXh0Q2VudHVyeVN0YXJ0ID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yKGdldFllYXIsIGdldENlbnR1cnlTdGFydCwgMTAwKTtcbi8qKlxuICogR2V0cyBjZW50dXJ5IGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgY2VudHVyeSBlbmQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IENlbnR1cnkgZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXRDZW50dXJ5RW5kID0gbWFrZUdldEVuZChnZXROZXh0Q2VudHVyeVN0YXJ0KTtcbi8qKlxuICogR2V0cyBwcmV2aW91cyBjZW50dXJ5IGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgcHJldmlvdXMgY2VudHVyeSBlbmQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IFByZXZpb3VzIGNlbnR1cnkgZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXRQcmV2aW91c0NlbnR1cnlFbmQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0Q2VudHVyeUVuZCwgLTEwMCk7XG4vKipcbiAqIEdldHMgbmV4dCBjZW50dXJ5IGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgbmV4dCBjZW50dXJ5IGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gTmV4dCBjZW50dXJ5IGVuZCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0TmV4dENlbnR1cnlFbmQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0Q2VudHVyeUVuZCwgMTAwKTtcbi8qKlxuICogR2V0cyBjZW50dXJ5IHN0YXJ0IGFuZCBlbmQgZGF0ZXMgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBjZW50dXJ5IHN0YXJ0IGFuZCBlbmQgZnJvbVxuICogQHJldHVybnMge1tEYXRlLCBEYXRlXX0gQ2VudHVyeSBzdGFydCBhbmQgZW5kIGRhdGVzXG4gKi9cbmV4cG9ydCB2YXIgZ2V0Q2VudHVyeVJhbmdlID0gbWFrZUdldFJhbmdlKGdldENlbnR1cnlTdGFydCwgZ2V0Q2VudHVyeUVuZCk7XG4vKipcbiAqIERlY2FkZVxuICovXG4vKipcbiAqIEdldHMgZGVjYWRlIHN0YXJ0IGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBkZWNhZGUgc3RhcnQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IERlY2FkZSBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWNhZGVTdGFydChkYXRlKSB7XG4gICAgdmFyIHllYXIgPSBnZXRZZWFyKGRhdGUpO1xuICAgIHZhciBkZWNhZGVTdGFydFllYXIgPSB5ZWFyICsgKCgteWVhciArIDEpICUgMTApO1xuICAgIHZhciBkZWNhZGVTdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGRlY2FkZVN0YXJ0RGF0ZS5zZXRGdWxsWWVhcihkZWNhZGVTdGFydFllYXIsIDAsIDEpO1xuICAgIGRlY2FkZVN0YXJ0RGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICByZXR1cm4gZGVjYWRlU3RhcnREYXRlO1xufVxuLyoqXG4gKiBHZXRzIHByZXZpb3VzIGRlY2FkZSBzdGFydCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgcHJldmlvdXMgZGVjYWRlIHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBQcmV2aW91cyBkZWNhZGUgc3RhcnQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldFByZXZpb3VzRGVjYWRlU3RhcnQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0RGVjYWRlU3RhcnQsIC0xMCk7XG4vKipcbiAqIEdldHMgbmV4dCBkZWNhZGUgc3RhcnQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IG5leHQgZGVjYWRlIHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBOZXh0IGRlY2FkZSBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0TmV4dERlY2FkZVN0YXJ0ID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yKGdldFllYXIsIGdldERlY2FkZVN0YXJ0LCAxMCk7XG4vKipcbiAqIEdldHMgZGVjYWRlIGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgZGVjYWRlIGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gRGVjYWRlIGVuZCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0RGVjYWRlRW5kID0gbWFrZUdldEVuZChnZXROZXh0RGVjYWRlU3RhcnQpO1xuLyoqXG4gKiBHZXRzIHByZXZpb3VzIGRlY2FkZSBlbmQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IHByZXZpb3VzIGRlY2FkZSBlbmQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IFByZXZpb3VzIGRlY2FkZSBlbmQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldFByZXZpb3VzRGVjYWRlRW5kID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yKGdldFllYXIsIGdldERlY2FkZUVuZCwgLTEwKTtcbi8qKlxuICogR2V0cyBuZXh0IGRlY2FkZSBlbmQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IG5leHQgZGVjYWRlIGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gTmV4dCBkZWNhZGUgZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXROZXh0RGVjYWRlRW5kID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yKGdldFllYXIsIGdldERlY2FkZUVuZCwgMTApO1xuLyoqXG4gKiBHZXRzIGRlY2FkZSBzdGFydCBhbmQgZW5kIGRhdGVzIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgZGVjYWRlIHN0YXJ0IGFuZCBlbmQgZnJvbVxuICogQHJldHVybnMge1tEYXRlLCBEYXRlXX0gRGVjYWRlIHN0YXJ0IGFuZCBlbmQgZGF0ZXNcbiAqL1xuZXhwb3J0IHZhciBnZXREZWNhZGVSYW5nZSA9IG1ha2VHZXRSYW5nZShnZXREZWNhZGVTdGFydCwgZ2V0RGVjYWRlRW5kKTtcbi8qKlxuICogWWVhclxuICovXG4vKipcbiAqIEdldHMgeWVhciBzdGFydCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgeWVhciBzdGFydCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gWWVhciBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRZZWFyU3RhcnQoZGF0ZSkge1xuICAgIHZhciB5ZWFyID0gZ2V0WWVhcihkYXRlKTtcbiAgICB2YXIgeWVhclN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgeWVhclN0YXJ0RGF0ZS5zZXRGdWxsWWVhcih5ZWFyLCAwLCAxKTtcbiAgICB5ZWFyU3RhcnREYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIHJldHVybiB5ZWFyU3RhcnREYXRlO1xufVxuLyoqXG4gKiBHZXRzIHByZXZpb3VzIHllYXIgc3RhcnQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IHByZXZpb3VzIHllYXIgc3RhcnQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IFByZXZpb3VzIHllYXIgc3RhcnQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldFByZXZpb3VzWWVhclN0YXJ0ID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yKGdldFllYXIsIGdldFllYXJTdGFydCwgLTEpO1xuLyoqXG4gKiBHZXRzIG5leHQgeWVhciBzdGFydCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgbmV4dCB5ZWFyIHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBOZXh0IHllYXIgc3RhcnQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldE5leHRZZWFyU3RhcnQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0WWVhclN0YXJ0LCAxKTtcbi8qKlxuICogR2V0cyB5ZWFyIGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgeWVhciBlbmQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IFllYXIgZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXRZZWFyRW5kID0gbWFrZUdldEVuZChnZXROZXh0WWVhclN0YXJ0KTtcbi8qKlxuICogR2V0cyBwcmV2aW91cyB5ZWFyIGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgcHJldmlvdXMgeWVhciBlbmQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IFByZXZpb3VzIHllYXIgZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXRQcmV2aW91c1llYXJFbmQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0WWVhckVuZCwgLTEpO1xuLyoqXG4gKiBHZXRzIG5leHQgeWVhciBlbmQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IG5leHQgeWVhciBlbmQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IE5leHQgeWVhciBlbmQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldE5leHRZZWFyRW5kID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yKGdldFllYXIsIGdldFllYXJFbmQsIDEpO1xuLyoqXG4gKiBHZXRzIHllYXIgc3RhcnQgYW5kIGVuZCBkYXRlcyBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IHllYXIgc3RhcnQgYW5kIGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7W0RhdGUsIERhdGVdfSBZZWFyIHN0YXJ0IGFuZCBlbmQgZGF0ZXNcbiAqL1xuZXhwb3J0IHZhciBnZXRZZWFyUmFuZ2UgPSBtYWtlR2V0UmFuZ2UoZ2V0WWVhclN0YXJ0LCBnZXRZZWFyRW5kKTtcbi8qKlxuICogTW9udGhcbiAqL1xuZnVuY3Rpb24gbWFrZUdldEVkZ2VPZk5laWdoYm9yTW9udGgoZ2V0RWRnZU9mUGVyaW9kLCBkZWZhdWx0T2Zmc2V0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1ha2VHZXRFZGdlT2ZOZWlnaGJvck1vbnRoSW50ZXJuYWwoZGF0ZSwgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChvZmZzZXQgPT09IHZvaWQgMCkgeyBvZmZzZXQgPSBkZWZhdWx0T2Zmc2V0OyB9XG4gICAgICAgIHZhciB5ZWFyID0gZ2V0WWVhcihkYXRlKTtcbiAgICAgICAgdmFyIG1vbnRoID0gZ2V0TW9udGgoZGF0ZSkgKyBvZmZzZXQ7XG4gICAgICAgIHZhciBwcmV2aW91c1BlcmlvZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHByZXZpb3VzUGVyaW9kLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCAxKTtcbiAgICAgICAgcHJldmlvdXNQZXJpb2Quc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgIHJldHVybiBnZXRFZGdlT2ZQZXJpb2QocHJldmlvdXNQZXJpb2QpO1xuICAgIH07XG59XG4vKipcbiAqIEdldHMgbW9udGggc3RhcnQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IG1vbnRoIHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBNb250aCBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb250aFN0YXJ0KGRhdGUpIHtcbiAgICB2YXIgeWVhciA9IGdldFllYXIoZGF0ZSk7XG4gICAgdmFyIG1vbnRoID0gZ2V0TW9udGgoZGF0ZSk7XG4gICAgdmFyIG1vbnRoU3RhcnREYXRlID0gbmV3IERhdGUoKTtcbiAgICBtb250aFN0YXJ0RGF0ZS5zZXRGdWxsWWVhcih5ZWFyLCBtb250aCwgMSk7XG4gICAgbW9udGhTdGFydERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgcmV0dXJuIG1vbnRoU3RhcnREYXRlO1xufVxuLyoqXG4gKiBHZXRzIHByZXZpb3VzIG1vbnRoIHN0YXJ0IGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBwcmV2aW91cyBtb250aCBzdGFydCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gUHJldmlvdXMgbW9udGggc3RhcnQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldFByZXZpb3VzTW9udGhTdGFydCA9IG1ha2VHZXRFZGdlT2ZOZWlnaGJvck1vbnRoKGdldE1vbnRoU3RhcnQsIC0xKTtcbi8qKlxuICogR2V0cyBuZXh0IG1vbnRoIHN0YXJ0IGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBuZXh0IG1vbnRoIHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBOZXh0IG1vbnRoIHN0YXJ0IGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXROZXh0TW9udGhTdGFydCA9IG1ha2VHZXRFZGdlT2ZOZWlnaGJvck1vbnRoKGdldE1vbnRoU3RhcnQsIDEpO1xuLyoqXG4gKiBHZXRzIG1vbnRoIGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgbW9udGggZW5kIGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBNb250aCBlbmQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldE1vbnRoRW5kID0gbWFrZUdldEVuZChnZXROZXh0TW9udGhTdGFydCk7XG4vKipcbiAqIEdldHMgcHJldmlvdXMgbW9udGggZW5kIGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBwcmV2aW91cyBtb250aCBlbmQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IFByZXZpb3VzIG1vbnRoIGVuZCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0UHJldmlvdXNNb250aEVuZCA9IG1ha2VHZXRFZGdlT2ZOZWlnaGJvck1vbnRoKGdldE1vbnRoRW5kLCAtMSk7XG4vKipcbiAqIEdldHMgbmV4dCBtb250aCBlbmQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IG5leHQgbW9udGggZW5kIGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBOZXh0IG1vbnRoIGVuZCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0TmV4dE1vbnRoRW5kID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yTW9udGgoZ2V0TW9udGhFbmQsIDEpO1xuLyoqXG4gKiBHZXRzIG1vbnRoIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBtb250aCBzdGFydCBhbmQgZW5kIGZyb21cbiAqIEByZXR1cm5zIHtbRGF0ZSwgRGF0ZV19IE1vbnRoIHN0YXJ0IGFuZCBlbmQgZGF0ZXNcbiAqL1xuZXhwb3J0IHZhciBnZXRNb250aFJhbmdlID0gbWFrZUdldFJhbmdlKGdldE1vbnRoU3RhcnQsIGdldE1vbnRoRW5kKTtcbi8qKlxuICogRGF5XG4gKi9cbmZ1bmN0aW9uIG1ha2VHZXRFZGdlT2ZOZWlnaGJvckRheShnZXRFZGdlT2ZQZXJpb2QsIGRlZmF1bHRPZmZzZXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbWFrZUdldEVkZ2VPZk5laWdoYm9yRGF5SW50ZXJuYWwoZGF0ZSwgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChvZmZzZXQgPT09IHZvaWQgMCkgeyBvZmZzZXQgPSBkZWZhdWx0T2Zmc2V0OyB9XG4gICAgICAgIHZhciB5ZWFyID0gZ2V0WWVhcihkYXRlKTtcbiAgICAgICAgdmFyIG1vbnRoID0gZ2V0TW9udGgoZGF0ZSk7XG4gICAgICAgIHZhciBkYXkgPSBnZXREYXRlKGRhdGUpICsgb2Zmc2V0O1xuICAgICAgICB2YXIgcHJldmlvdXNQZXJpb2QgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBwcmV2aW91c1BlcmlvZC5zZXRGdWxsWWVhcih5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgICAgcHJldmlvdXNQZXJpb2Quc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgIHJldHVybiBnZXRFZGdlT2ZQZXJpb2QocHJldmlvdXNQZXJpb2QpO1xuICAgIH07XG59XG4vKipcbiAqIEdldHMgZGF5IHN0YXJ0IGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBkYXkgc3RhcnQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IERheSBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlTdGFydChkYXRlKSB7XG4gICAgdmFyIHllYXIgPSBnZXRZZWFyKGRhdGUpO1xuICAgIHZhciBtb250aCA9IGdldE1vbnRoKGRhdGUpO1xuICAgIHZhciBkYXkgPSBnZXREYXRlKGRhdGUpO1xuICAgIHZhciBkYXlTdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGRheVN0YXJ0RGF0ZS5zZXRGdWxsWWVhcih5ZWFyLCBtb250aCwgZGF5KTtcbiAgICBkYXlTdGFydERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgcmV0dXJuIGRheVN0YXJ0RGF0ZTtcbn1cbi8qKlxuICogR2V0cyBwcmV2aW91cyBkYXkgc3RhcnQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IHByZXZpb3VzIGRheSBzdGFydCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gUHJldmlvdXMgZGF5IHN0YXJ0IGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXRQcmV2aW91c0RheVN0YXJ0ID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yRGF5KGdldERheVN0YXJ0LCAtMSk7XG4vKipcbiAqIEdldHMgbmV4dCBkYXkgc3RhcnQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IG5leHQgZGF5IHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBOZXh0IGRheSBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0TmV4dERheVN0YXJ0ID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yRGF5KGdldERheVN0YXJ0LCAxKTtcbi8qKlxuICogR2V0cyBkYXkgZW5kIGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBkYXkgZW5kIGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBEYXkgZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXREYXlFbmQgPSBtYWtlR2V0RW5kKGdldE5leHREYXlTdGFydCk7XG4vKipcbiAqIEdldHMgcHJldmlvdXMgZGF5IGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgcHJldmlvdXMgZGF5IGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gUHJldmlvdXMgZGF5IGVuZCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0UHJldmlvdXNEYXlFbmQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3JEYXkoZ2V0RGF5RW5kLCAtMSk7XG4vKipcbiAqIEdldHMgbmV4dCBkYXkgZW5kIGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBuZXh0IGRheSBlbmQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IE5leHQgZGF5IGVuZCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0TmV4dERheUVuZCA9IG1ha2VHZXRFZGdlT2ZOZWlnaGJvckRheShnZXREYXlFbmQsIDEpO1xuLyoqXG4gKiBHZXRzIGRheSBzdGFydCBhbmQgZW5kIGRhdGVzIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgZGF5IHN0YXJ0IGFuZCBlbmQgZnJvbVxuICogQHJldHVybnMge1tEYXRlLCBEYXRlXX0gRGF5IHN0YXJ0IGFuZCBlbmQgZGF0ZXNcbiAqL1xuZXhwb3J0IHZhciBnZXREYXlSYW5nZSA9IG1ha2VHZXRSYW5nZShnZXREYXlTdGFydCwgZ2V0RGF5RW5kKTtcbi8qKlxuICogT3RoZXJcbiAqL1xuLyoqXG4gKiBSZXR1cm5zIGEgbnVtYmVyIG9mIGRheXMgaW4gYSBtb250aCBvZiBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE51bWJlciBvZiBkYXlzIGluIGEgbW9udGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERheXNJbk1vbnRoKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0RGF0ZShnZXRNb250aEVuZChkYXRlKSk7XG59XG5mdW5jdGlvbiBwYWRTdGFydChudW0sIHZhbCkge1xuICAgIGlmICh2YWwgPT09IHZvaWQgMCkgeyB2YWwgPSAyOyB9XG4gICAgdmFyIG51bVN0ciA9IFwiXCIuY29uY2F0KG51bSk7XG4gICAgaWYgKG51bVN0ci5sZW5ndGggPj0gdmFsKSB7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfVxuICAgIHJldHVybiBcIjAwMDBcIi5jb25jYXQobnVtU3RyKS5zbGljZSgtdmFsKTtcbn1cbi8qKlxuICogUmV0dXJucyBsb2NhbCBob3VycyBhbmQgbWludXRlcyAoaGg6bW0pLlxuICpcbiAqIEBwYXJhbSB7RGF0ZSB8IHN0cmluZ30gZGF0ZSBEYXRlIHRvIGdldCBob3VycyBhbmQgbWludXRlcyBmcm9tXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBMb2NhbCBob3VycyBhbmQgbWludXRlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG91cnNNaW51dGVzKGRhdGUpIHtcbiAgICB2YXIgaG91cnMgPSBwYWRTdGFydChnZXRIb3VycyhkYXRlKSk7XG4gICAgdmFyIG1pbnV0ZXMgPSBwYWRTdGFydChnZXRNaW51dGVzKGRhdGUpKTtcbiAgICByZXR1cm4gXCJcIi5jb25jYXQoaG91cnMsIFwiOlwiKS5jb25jYXQobWludXRlcyk7XG59XG4vKipcbiAqIFJldHVybnMgbG9jYWwgaG91cnMsIG1pbnV0ZXMgYW5kIHNlY29uZHMgKGhoOm1tOnNzKS5cbiAqXG4gKiBAcGFyYW0ge0RhdGUgfCBzdHJpbmd9IGRhdGUgRGF0ZSB0byBnZXQgaG91cnMsIG1pbnV0ZXMgYW5kIHNlY29uZHMgZnJvbVxuICogQHJldHVybnMge3N0cmluZ30gTG9jYWwgaG91cnMsIG1pbnV0ZXMgYW5kIHNlY29uZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhvdXJzTWludXRlc1NlY29uZHMoZGF0ZSkge1xuICAgIHZhciBob3VycyA9IHBhZFN0YXJ0KGdldEhvdXJzKGRhdGUpKTtcbiAgICB2YXIgbWludXRlcyA9IHBhZFN0YXJ0KGdldE1pbnV0ZXMoZGF0ZSkpO1xuICAgIHZhciBzZWNvbmRzID0gcGFkU3RhcnQoZ2V0U2Vjb25kcyhkYXRlKSk7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KGhvdXJzLCBcIjpcIikuY29uY2F0KG1pbnV0ZXMsIFwiOlwiKS5jb25jYXQoc2Vjb25kcyk7XG59XG4vKipcbiAqIFJldHVybnMgbG9jYWwgbW9udGggaW4gSVNPLWxpa2UgZm9ybWF0IChZWVlZLU1NKS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZSB0byBnZXQgbW9udGggaW4gSVNPLWxpa2UgZm9ybWF0IGZyb21cbiAqIEByZXR1cm5zIHtzdHJpbmd9IExvY2FsIG1vbnRoIGluIElTTy1saWtlIGZvcm1hdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SVNPTG9jYWxNb250aChkYXRlKSB7XG4gICAgdmFyIHllYXIgPSBwYWRTdGFydChnZXRZZWFyKGRhdGUpLCA0KTtcbiAgICB2YXIgbW9udGggPSBwYWRTdGFydChnZXRNb250aEh1bWFuKGRhdGUpKTtcbiAgICByZXR1cm4gXCJcIi5jb25jYXQoeWVhciwgXCItXCIpLmNvbmNhdChtb250aCk7XG59XG4vKipcbiAqIFJldHVybnMgbG9jYWwgZGF0ZSBpbiBJU08tbGlrZSBmb3JtYXQgKFlZWVktTU0tREQpLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlIHRvIGdldCBkYXRlIGluIElTTy1saWtlIGZvcm1hdCBmcm9tXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBMb2NhbCBkYXRlIGluIElTTy1saWtlIGZvcm1hdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SVNPTG9jYWxEYXRlKGRhdGUpIHtcbiAgICB2YXIgeWVhciA9IHBhZFN0YXJ0KGdldFllYXIoZGF0ZSksIDQpO1xuICAgIHZhciBtb250aCA9IHBhZFN0YXJ0KGdldE1vbnRoSHVtYW4oZGF0ZSkpO1xuICAgIHZhciBkYXkgPSBwYWRTdGFydChnZXREYXRlKGRhdGUpKTtcbiAgICByZXR1cm4gXCJcIi5jb25jYXQoeWVhciwgXCItXCIpLmNvbmNhdChtb250aCwgXCItXCIpLmNvbmNhdChkYXkpO1xufVxuLyoqXG4gKiBSZXR1cm5zIGxvY2FsIGRhdGUgJiB0aW1lIGluIElTTy1saWtlIGZvcm1hdCAoWVlZWS1NTS1ERFRoaDptbTpzcykuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUgdG8gZ2V0IGRhdGUgJiB0aW1lIGluIElTTy1saWtlIGZvcm1hdCBmcm9tXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBMb2NhbCBkYXRlICYgdGltZSBpbiBJU08tbGlrZSBmb3JtYXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElTT0xvY2FsRGF0ZVRpbWUoZGF0ZSkge1xuICAgIHJldHVybiBcIlwiLmNvbmNhdChnZXRJU09Mb2NhbERhdGUoZGF0ZSksIFwiVFwiKS5jb25jYXQoZ2V0SG91cnNNaW51dGVzU2Vjb25kcyhkYXRlKSk7XG59XG4iLCJleHBvcnQgdmFyIENBTEVOREFSX1RZUEVTID0ge1xuICAgIEdSRUdPUlk6ICdncmVnb3J5JyxcbiAgICBIRUJSRVc6ICdoZWJyZXcnLFxuICAgIElTTEFNSUM6ICdpc2xhbWljJyxcbiAgICBJU09fODYwMTogJ2lzbzg2MDEnLFxufTtcbmV4cG9ydCB2YXIgQ0FMRU5EQVJfVFlQRV9MT0NBTEVTID0ge1xuICAgIGdyZWdvcnk6IFtcbiAgICAgICAgJ2VuLUNBJyxcbiAgICAgICAgJ2VuLVVTJyxcbiAgICAgICAgJ2VzLUFSJyxcbiAgICAgICAgJ2VzLUJPJyxcbiAgICAgICAgJ2VzLUNMJyxcbiAgICAgICAgJ2VzLUNPJyxcbiAgICAgICAgJ2VzLUNSJyxcbiAgICAgICAgJ2VzLURPJyxcbiAgICAgICAgJ2VzLUVDJyxcbiAgICAgICAgJ2VzLUdUJyxcbiAgICAgICAgJ2VzLUhOJyxcbiAgICAgICAgJ2VzLU1YJyxcbiAgICAgICAgJ2VzLU5JJyxcbiAgICAgICAgJ2VzLVBBJyxcbiAgICAgICAgJ2VzLVBFJyxcbiAgICAgICAgJ2VzLVBSJyxcbiAgICAgICAgJ2VzLVNWJyxcbiAgICAgICAgJ2VzLVZFJyxcbiAgICAgICAgJ3B0LUJSJyxcbiAgICBdLFxuICAgIGhlYnJldzogWydoZScsICdoZS1JTCddLFxuICAgIGlzbGFtaWM6IFtcbiAgICAgICAgLy8gYXItTEIsIGFyLU1BIGludGVudGlvbmFsbHkgbWlzc2luZ1xuICAgICAgICAnYXInLFxuICAgICAgICAnYXItQUUnLFxuICAgICAgICAnYXItQkgnLFxuICAgICAgICAnYXItRFonLFxuICAgICAgICAnYXItRUcnLFxuICAgICAgICAnYXItSVEnLFxuICAgICAgICAnYXItSk8nLFxuICAgICAgICAnYXItS1cnLFxuICAgICAgICAnYXItTFknLFxuICAgICAgICAnYXItT00nLFxuICAgICAgICAnYXItUUEnLFxuICAgICAgICAnYXItU0EnLFxuICAgICAgICAnYXItU0QnLFxuICAgICAgICAnYXItU1knLFxuICAgICAgICAnYXItWUUnLFxuICAgICAgICAnZHYnLFxuICAgICAgICAnZHYtTVYnLFxuICAgICAgICAncHMnLFxuICAgICAgICAncHMtQVInLFxuICAgIF0sXG59O1xuZXhwb3J0IHZhciBXRUVLREFZUyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2XTtcbiIsImltcG9ydCBnZXRVc2VyTG9jYWxlIGZyb20gJ2dldC11c2VyLWxvY2FsZSc7XG52YXIgZm9ybWF0dGVyQ2FjaGUgPSBuZXcgTWFwKCk7XG5mdW5jdGlvbiBnZXRGb3JtYXR0ZXIob3B0aW9ucykge1xuICAgIHJldHVybiBmdW5jdGlvbiBmb3JtYXR0ZXIobG9jYWxlLCBkYXRlKSB7XG4gICAgICAgIHZhciBsb2NhbGVXaXRoRGVmYXVsdCA9IGxvY2FsZSB8fCBnZXRVc2VyTG9jYWxlKCk7XG4gICAgICAgIGlmICghZm9ybWF0dGVyQ2FjaGUuaGFzKGxvY2FsZVdpdGhEZWZhdWx0KSkge1xuICAgICAgICAgICAgZm9ybWF0dGVyQ2FjaGUuc2V0KGxvY2FsZVdpdGhEZWZhdWx0LCBuZXcgTWFwKCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmb3JtYXR0ZXJDYWNoZUxvY2FsZSA9IGZvcm1hdHRlckNhY2hlLmdldChsb2NhbGVXaXRoRGVmYXVsdCk7XG4gICAgICAgIGlmICghZm9ybWF0dGVyQ2FjaGVMb2NhbGUuaGFzKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZXJDYWNoZUxvY2FsZS5zZXQob3B0aW9ucywgbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlV2l0aERlZmF1bHQgfHwgdW5kZWZpbmVkLCBvcHRpb25zKS5mb3JtYXQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZXJDYWNoZUxvY2FsZS5nZXQob3B0aW9ucykoZGF0ZSk7XG4gICAgfTtcbn1cbi8qKlxuICogQ2hhbmdlcyB0aGUgaG91ciBpbiBhIERhdGUgdG8gZW5zdXJlIHJpZ2h0IGRhdGUgZm9ybWF0dGluZyBldmVuIGlmIERTVCBpcyBtZXNzZWQgdXAuXG4gKiBXb3JrYXJvdW5kIGZvciBidWcgaW4gV2ViS2l0IGFuZCBGaXJlZm94IHdpdGggaGlzdG9yaWNhbCBkYXRlcy5cbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZTpcbiAqIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTc1MDQ2NVxuICogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM4NTY0M1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlLlxuICogQHJldHVybnMge0RhdGV9IERhdGUgd2l0aCBob3VyIHNldCB0byAxMi5cbiAqL1xuZnVuY3Rpb24gdG9TYWZlSG91cihkYXRlKSB7XG4gICAgdmFyIHNhZmVEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHNhZmVEYXRlLnNldEhvdXJzKDEyKSk7XG59XG5mdW5jdGlvbiBnZXRTYWZlRm9ybWF0dGVyKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGxvY2FsZSwgZGF0ZSkgeyByZXR1cm4gZ2V0Rm9ybWF0dGVyKG9wdGlvbnMpKGxvY2FsZSwgdG9TYWZlSG91cihkYXRlKSk7IH07XG59XG52YXIgZm9ybWF0RGF0ZU9wdGlvbnMgPSB7XG4gICAgZGF5OiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICdudW1lcmljJyxcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG59O1xudmFyIGZvcm1hdERheU9wdGlvbnMgPSB7IGRheTogJ251bWVyaWMnIH07XG52YXIgZm9ybWF0TG9uZ0RhdGVPcHRpb25zID0ge1xuICAgIGRheTogJ251bWVyaWMnLFxuICAgIG1vbnRoOiAnbG9uZycsXG4gICAgeWVhcjogJ251bWVyaWMnLFxufTtcbnZhciBmb3JtYXRNb250aE9wdGlvbnMgPSB7IG1vbnRoOiAnbG9uZycgfTtcbnZhciBmb3JtYXRNb250aFllYXJPcHRpb25zID0ge1xuICAgIG1vbnRoOiAnbG9uZycsXG4gICAgeWVhcjogJ251bWVyaWMnLFxufTtcbnZhciBmb3JtYXRTaG9ydFdlZWtkYXlPcHRpb25zID0geyB3ZWVrZGF5OiAnc2hvcnQnIH07XG52YXIgZm9ybWF0V2Vla2RheU9wdGlvbnMgPSB7IHdlZWtkYXk6ICdsb25nJyB9O1xudmFyIGZvcm1hdFllYXJPcHRpb25zID0geyB5ZWFyOiAnbnVtZXJpYycgfTtcbmV4cG9ydCB2YXIgZm9ybWF0RGF0ZSA9IGdldFNhZmVGb3JtYXR0ZXIoZm9ybWF0RGF0ZU9wdGlvbnMpO1xuZXhwb3J0IHZhciBmb3JtYXREYXkgPSBnZXRTYWZlRm9ybWF0dGVyKGZvcm1hdERheU9wdGlvbnMpO1xuZXhwb3J0IHZhciBmb3JtYXRMb25nRGF0ZSA9IGdldFNhZmVGb3JtYXR0ZXIoZm9ybWF0TG9uZ0RhdGVPcHRpb25zKTtcbmV4cG9ydCB2YXIgZm9ybWF0TW9udGggPSBnZXRTYWZlRm9ybWF0dGVyKGZvcm1hdE1vbnRoT3B0aW9ucyk7XG5leHBvcnQgdmFyIGZvcm1hdE1vbnRoWWVhciA9IGdldFNhZmVGb3JtYXR0ZXIoZm9ybWF0TW9udGhZZWFyT3B0aW9ucyk7XG5leHBvcnQgdmFyIGZvcm1hdFNob3J0V2Vla2RheSA9IGdldFNhZmVGb3JtYXR0ZXIoZm9ybWF0U2hvcnRXZWVrZGF5T3B0aW9ucyk7XG5leHBvcnQgdmFyIGZvcm1hdFdlZWtkYXkgPSBnZXRTYWZlRm9ybWF0dGVyKGZvcm1hdFdlZWtkYXlPcHRpb25zKTtcbmV4cG9ydCB2YXIgZm9ybWF0WWVhciA9IGdldFNhZmVGb3JtYXR0ZXIoZm9ybWF0WWVhck9wdGlvbnMpO1xuIiwiaW1wb3J0IHsgZ2V0WWVhciwgZ2V0TW9udGggYXMgZ2V0TW9udGhJbmRleCwgZ2V0Q2VudHVyeVN0YXJ0LCBnZXRQcmV2aW91c0NlbnR1cnlTdGFydCwgZ2V0TmV4dENlbnR1cnlTdGFydCwgZ2V0Q2VudHVyeUVuZCwgZ2V0UHJldmlvdXNDZW50dXJ5RW5kLCBnZXRDZW50dXJ5UmFuZ2UsIGdldERlY2FkZVN0YXJ0LCBnZXRQcmV2aW91c0RlY2FkZVN0YXJ0LCBnZXROZXh0RGVjYWRlU3RhcnQsIGdldERlY2FkZUVuZCwgZ2V0UHJldmlvdXNEZWNhZGVFbmQsIGdldERlY2FkZVJhbmdlLCBnZXRZZWFyU3RhcnQsIGdldFByZXZpb3VzWWVhclN0YXJ0LCBnZXROZXh0WWVhclN0YXJ0LCBnZXRZZWFyRW5kLCBnZXRQcmV2aW91c1llYXJFbmQsIGdldFllYXJSYW5nZSwgZ2V0TW9udGhTdGFydCwgZ2V0UHJldmlvdXNNb250aFN0YXJ0LCBnZXROZXh0TW9udGhTdGFydCwgZ2V0TW9udGhFbmQsIGdldFByZXZpb3VzTW9udGhFbmQsIGdldE1vbnRoUmFuZ2UsIGdldERheVN0YXJ0LCBnZXREYXlFbmQsIGdldERheVJhbmdlLCB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5pbXBvcnQgeyBDQUxFTkRBUl9UWVBFUywgV0VFS0RBWVMgfSBmcm9tICcuL2NvbnN0LmpzJztcbmltcG9ydCB7IGZvcm1hdFllYXIgYXMgZGVmYXVsdEZvcm1hdFllYXIgfSBmcm9tICcuL2RhdGVGb3JtYXR0ZXIuanMnO1xudmFyIFNVTkRBWSA9IFdFRUtEQVlTWzBdO1xudmFyIEZSSURBWSA9IFdFRUtEQVlTWzVdO1xudmFyIFNBVFVSREFZID0gV0VFS0RBWVNbNl07XG4vKiBTaW1wbGUgZ2V0dGVycyAtIGdldHRpbmcgYSBwcm9wZXJ0eSBvZiBhIGdpdmVuIHBvaW50IGluIHRpbWUgKi9cbi8qKlxuICogR2V0cyBkYXkgb2YgdGhlIHdlZWsgb2YgYSBnaXZlbiBkYXRlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKiBAcGFyYW0ge0NhbGVuZGFyVHlwZX0gW2NhbGVuZGFyVHlwZT1cImlzbzg2MDFcIl0gQ2FsZW5kYXIgdHlwZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IERheSBvZiB0aGUgd2Vlay5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mV2VlayhkYXRlLCBjYWxlbmRhclR5cGUpIHtcbiAgICBpZiAoY2FsZW5kYXJUeXBlID09PSB2b2lkIDApIHsgY2FsZW5kYXJUeXBlID0gQ0FMRU5EQVJfVFlQRVMuSVNPXzg2MDE7IH1cbiAgICB2YXIgd2Vla2RheSA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgc3dpdGNoIChjYWxlbmRhclR5cGUpIHtcbiAgICAgICAgY2FzZSBDQUxFTkRBUl9UWVBFUy5JU09fODYwMTpcbiAgICAgICAgICAgIC8vIFNoaWZ0cyBkYXlzIG9mIHRoZSB3ZWVrIHNvIHRoYXQgTW9uZGF5IGlzIDAsIFN1bmRheSBpcyA2XG4gICAgICAgICAgICByZXR1cm4gKHdlZWtkYXkgKyA2KSAlIDc7XG4gICAgICAgIGNhc2UgQ0FMRU5EQVJfVFlQRVMuSVNMQU1JQzpcbiAgICAgICAgICAgIHJldHVybiAod2Vla2RheSArIDEpICUgNztcbiAgICAgICAgY2FzZSBDQUxFTkRBUl9UWVBFUy5IRUJSRVc6XG4gICAgICAgIGNhc2UgQ0FMRU5EQVJfVFlQRVMuR1JFR09SWTpcbiAgICAgICAgICAgIHJldHVybiB3ZWVrZGF5O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBjYWxlbmRhciB0eXBlLicpO1xuICAgIH1cbn1cbi8qKlxuICogQ2VudHVyeVxuICovXG4vKipcbiAqIEdldHMgdGhlIHllYXIgb2YgdGhlIGJlZ2lubmluZyBvZiBhIGNlbnR1cnkgb2YgYSBnaXZlbiBkYXRlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBZZWFyIG9mIHRoZSBiZWdpbm5pbmcgb2YgYSBjZW50dXJ5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVnaW5PZkNlbnR1cnlZZWFyKGRhdGUpIHtcbiAgICB2YXIgYmVnaW5PZkNlbnR1cnkgPSBnZXRDZW50dXJ5U3RhcnQoZGF0ZSk7XG4gICAgcmV0dXJuIGdldFllYXIoYmVnaW5PZkNlbnR1cnkpO1xufVxuLyoqXG4gKiBEZWNhZGVcbiAqL1xuLyoqXG4gKiBHZXRzIHRoZSB5ZWFyIG9mIHRoZSBiZWdpbm5pbmcgb2YgYSBkZWNhZGUgb2YgYSBnaXZlbiBkYXRlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBZZWFyIG9mIHRoZSBiZWdpbm5pbmcgb2YgYSBkZWNhZGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCZWdpbk9mRGVjYWRlWWVhcihkYXRlKSB7XG4gICAgdmFyIGJlZ2luT2ZEZWNhZGUgPSBnZXREZWNhZGVTdGFydChkYXRlKTtcbiAgICByZXR1cm4gZ2V0WWVhcihiZWdpbk9mRGVjYWRlKTtcbn1cbi8qKlxuICogV2Vla1xuICovXG4vKipcbiAqIFJldHVybnMgdGhlIGJlZ2lubmluZyBvZiBhIGdpdmVuIHdlZWsuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKiBAcGFyYW0ge0NhbGVuZGFyVHlwZX0gW2NhbGVuZGFyVHlwZT1cImlzbzg2MDFcIl0gQ2FsZW5kYXIgdHlwZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBCZWdpbm5pbmcgb2YgYSBnaXZlbiB3ZWVrLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVnaW5PZldlZWsoZGF0ZSwgY2FsZW5kYXJUeXBlKSB7XG4gICAgaWYgKGNhbGVuZGFyVHlwZSA9PT0gdm9pZCAwKSB7IGNhbGVuZGFyVHlwZSA9IENBTEVOREFSX1RZUEVTLklTT184NjAxOyB9XG4gICAgdmFyIHllYXIgPSBnZXRZZWFyKGRhdGUpO1xuICAgIHZhciBtb250aEluZGV4ID0gZ2V0TW9udGhJbmRleChkYXRlKTtcbiAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCkgLSBnZXREYXlPZldlZWsoZGF0ZSwgY2FsZW5kYXJUeXBlKTtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGhJbmRleCwgZGF5KTtcbn1cbi8qKlxuICogR2V0cyB3ZWVrIG51bWJlciBhY2NvcmRpbmcgdG8gSVNPIDg2MDEgb3IgVVMgc3RhbmRhcmQuXG4gKiBJbiBJU08gODYwMSwgQXJhYmljIGFuZCBIZWJyZXcgd2VlayAxIGlzIHRoZSBvbmUgd2l0aCBKYW51YXJ5IDQuXG4gKiBJbiBVUyBjYWxlbmRhciB3ZWVrIDEgaXMgdGhlIG9uZSB3aXRoIEphbnVhcnkgMS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqIEBwYXJhbSB7Q2FsZW5kYXJUeXBlfSBbY2FsZW5kYXJUeXBlPVwiaXNvODYwMVwiXSBDYWxlbmRhciB0eXBlLlxuICogQHJldHVybnMge251bWJlcn0gV2VlayBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrTnVtYmVyKGRhdGUsIGNhbGVuZGFyVHlwZSkge1xuICAgIGlmIChjYWxlbmRhclR5cGUgPT09IHZvaWQgMCkgeyBjYWxlbmRhclR5cGUgPSBDQUxFTkRBUl9UWVBFUy5JU09fODYwMTsgfVxuICAgIHZhciBjYWxlbmRhclR5cGVGb3JXZWVrTnVtYmVyID0gY2FsZW5kYXJUeXBlID09PSBDQUxFTkRBUl9UWVBFUy5HUkVHT1JZID8gQ0FMRU5EQVJfVFlQRVMuR1JFR09SWSA6IENBTEVOREFSX1RZUEVTLklTT184NjAxO1xuICAgIHZhciBiZWdpbk9mV2VlayA9IGdldEJlZ2luT2ZXZWVrKGRhdGUsIGNhbGVuZGFyVHlwZSk7XG4gICAgdmFyIHllYXIgPSBnZXRZZWFyKGRhdGUpICsgMTtcbiAgICB2YXIgZGF5SW5XZWVrT25lO1xuICAgIHZhciBiZWdpbk9mRmlyc3RXZWVrO1xuICAgIC8vIExvb2sgZm9yIHRoZSBmaXJzdCB3ZWVrIG9uZSB0aGF0IGRvZXMgbm90IGNvbWUgYWZ0ZXIgYSBnaXZlbiBkYXRlXG4gICAgZG8ge1xuICAgICAgICBkYXlJbldlZWtPbmUgPSBuZXcgRGF0ZSh5ZWFyLCAwLCBjYWxlbmRhclR5cGVGb3JXZWVrTnVtYmVyID09PSBDQUxFTkRBUl9UWVBFUy5JU09fODYwMSA/IDQgOiAxKTtcbiAgICAgICAgYmVnaW5PZkZpcnN0V2VlayA9IGdldEJlZ2luT2ZXZWVrKGRheUluV2Vla09uZSwgY2FsZW5kYXJUeXBlKTtcbiAgICAgICAgeWVhciAtPSAxO1xuICAgIH0gd2hpbGUgKGRhdGUgPCBiZWdpbk9mRmlyc3RXZWVrKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoYmVnaW5PZldlZWsuZ2V0VGltZSgpIC0gYmVnaW5PZkZpcnN0V2Vlay5nZXRUaW1lKCkpIC8gKDguNjRlNyAqIDcpKSArIDE7XG59XG4vKipcbiAqIE90aGVyc1xuICovXG4vKipcbiAqIFJldHVybnMgdGhlIGJlZ2lubmluZyBvZiBhIGdpdmVuIHJhbmdlLlxuICpcbiAqIEBwYXJhbSB7UmFuZ2VUeXBlfSByYW5nZVR5cGUgUmFuZ2UgdHlwZSAoZS5nLiAnZGF5JylcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlLlxuICogQHJldHVybnMge0RhdGV9IEJlZ2lubmluZyBvZiBhIGdpdmVuIHJhbmdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVnaW4ocmFuZ2VUeXBlLCBkYXRlKSB7XG4gICAgc3dpdGNoIChyYW5nZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnY2VudHVyeSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q2VudHVyeVN0YXJ0KGRhdGUpO1xuICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgcmV0dXJuIGdldERlY2FkZVN0YXJ0KGRhdGUpO1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRZZWFyU3RhcnQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRNb250aFN0YXJ0KGRhdGUpO1xuICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgcmV0dXJuIGdldERheVN0YXJ0KGRhdGUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCByYW5nZVR5cGU6IFwiLmNvbmNhdChyYW5nZVR5cGUpKTtcbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGJlZ2lubmluZyBvZiBhIHByZXZpb3VzIGdpdmVuIHJhbmdlLlxuICpcbiAqIEBwYXJhbSB7UmFuZ2VUeXBlfSByYW5nZVR5cGUgUmFuZ2UgdHlwZSAoZS5nLiAnZGF5JylcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlLlxuICogQHJldHVybnMge0RhdGV9IEJlZ2lubmluZyBvZiBhIHByZXZpb3VzIGdpdmVuIHJhbmdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVnaW5QcmV2aW91cyhyYW5nZVR5cGUsIGRhdGUpIHtcbiAgICBzd2l0Y2ggKHJhbmdlVHlwZSkge1xuICAgICAgICBjYXNlICdjZW50dXJ5JzpcbiAgICAgICAgICAgIHJldHVybiBnZXRQcmV2aW91c0NlbnR1cnlTdGFydChkYXRlKTtcbiAgICAgICAgY2FzZSAnZGVjYWRlJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRQcmV2aW91c0RlY2FkZVN0YXJ0KGRhdGUpO1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRQcmV2aW91c1llYXJTdGFydChkYXRlKTtcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgcmV0dXJuIGdldFByZXZpb3VzTW9udGhTdGFydChkYXRlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmFuZ2VUeXBlOiBcIi5jb25jYXQocmFuZ2VUeXBlKSk7XG4gICAgfVxufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBiZWdpbm5pbmcgb2YgYSBuZXh0IGdpdmVuIHJhbmdlLlxuICpcbiAqIEBwYXJhbSB7UmFuZ2VUeXBlfSByYW5nZVR5cGUgUmFuZ2UgdHlwZSAoZS5nLiAnZGF5JylcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlLlxuICogQHJldHVybnMge0RhdGV9IEJlZ2lubmluZyBvZiBhIG5leHQgZ2l2ZW4gcmFuZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCZWdpbk5leHQocmFuZ2VUeXBlLCBkYXRlKSB7XG4gICAgc3dpdGNoIChyYW5nZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnY2VudHVyeSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TmV4dENlbnR1cnlTdGFydChkYXRlKTtcbiAgICAgICAgY2FzZSAnZGVjYWRlJzpcbiAgICAgICAgICAgIHJldHVybiBnZXROZXh0RGVjYWRlU3RhcnQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgcmV0dXJuIGdldE5leHRZZWFyU3RhcnQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIHJldHVybiBnZXROZXh0TW9udGhTdGFydChkYXRlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmFuZ2VUeXBlOiBcIi5jb25jYXQocmFuZ2VUeXBlKSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEJlZ2luUHJldmlvdXMyKHJhbmdlVHlwZSwgZGF0ZSkge1xuICAgIHN3aXRjaCAocmFuZ2VUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0UHJldmlvdXNEZWNhZGVTdGFydChkYXRlLCAtMTAwKTtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICByZXR1cm4gZ2V0UHJldmlvdXNZZWFyU3RhcnQoZGF0ZSwgLTEwKTtcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgcmV0dXJuIGdldFByZXZpb3VzTW9udGhTdGFydChkYXRlLCAtMTIpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCByYW5nZVR5cGU6IFwiLmNvbmNhdChyYW5nZVR5cGUpKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVnaW5OZXh0MihyYW5nZVR5cGUsIGRhdGUpIHtcbiAgICBzd2l0Y2ggKHJhbmdlVHlwZSkge1xuICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgcmV0dXJuIGdldE5leHREZWNhZGVTdGFydChkYXRlLCAxMDApO1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHJldHVybiBnZXROZXh0WWVhclN0YXJ0KGRhdGUsIDEwKTtcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgcmV0dXJuIGdldE5leHRNb250aFN0YXJ0KGRhdGUsIDEyKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmFuZ2VUeXBlOiBcIi5jb25jYXQocmFuZ2VUeXBlKSk7XG4gICAgfVxufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlbmQgb2YgYSBnaXZlbiByYW5nZS5cbiAqXG4gKiBAcGFyYW0ge1JhbmdlVHlwZX0gcmFuZ2VUeXBlIFJhbmdlIHR5cGUgKGUuZy4gJ2RheScpXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBFbmQgb2YgYSBnaXZlbiByYW5nZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZChyYW5nZVR5cGUsIGRhdGUpIHtcbiAgICBzd2l0Y2ggKHJhbmdlVHlwZSkge1xuICAgICAgICBjYXNlICdjZW50dXJ5JzpcbiAgICAgICAgICAgIHJldHVybiBnZXRDZW50dXJ5RW5kKGRhdGUpO1xuICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgcmV0dXJuIGdldERlY2FkZUVuZChkYXRlKTtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICByZXR1cm4gZ2V0WWVhckVuZChkYXRlKTtcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgcmV0dXJuIGdldE1vbnRoRW5kKGRhdGUpO1xuICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgcmV0dXJuIGdldERheUVuZChkYXRlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmFuZ2VUeXBlOiBcIi5jb25jYXQocmFuZ2VUeXBlKSk7XG4gICAgfVxufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlbmQgb2YgYSBwcmV2aW91cyBnaXZlbiByYW5nZS5cbiAqXG4gKiBAcGFyYW0ge1JhbmdlVHlwZX0gcmFuZ2VUeXBlIFJhbmdlIHR5cGUgKGUuZy4gJ2RheScpXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBFbmQgb2YgYSBwcmV2aW91cyBnaXZlbiByYW5nZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZFByZXZpb3VzKHJhbmdlVHlwZSwgZGF0ZSkge1xuICAgIHN3aXRjaCAocmFuZ2VUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2NlbnR1cnknOlxuICAgICAgICAgICAgcmV0dXJuIGdldFByZXZpb3VzQ2VudHVyeUVuZChkYXRlKTtcbiAgICAgICAgY2FzZSAnZGVjYWRlJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRQcmV2aW91c0RlY2FkZUVuZChkYXRlKTtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICByZXR1cm4gZ2V0UHJldmlvdXNZZWFyRW5kKGRhdGUpO1xuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0UHJldmlvdXNNb250aEVuZChkYXRlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmFuZ2VUeXBlOiBcIi5jb25jYXQocmFuZ2VUeXBlKSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZFByZXZpb3VzMihyYW5nZVR5cGUsIGRhdGUpIHtcbiAgICBzd2l0Y2ggKHJhbmdlVHlwZSkge1xuICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgcmV0dXJuIGdldFByZXZpb3VzRGVjYWRlRW5kKGRhdGUsIC0xMDApO1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRQcmV2aW91c1llYXJFbmQoZGF0ZSwgLTEwKTtcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgcmV0dXJuIGdldFByZXZpb3VzTW9udGhFbmQoZGF0ZSwgLTEyKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmFuZ2VUeXBlOiBcIi5jb25jYXQocmFuZ2VUeXBlKSk7XG4gICAgfVxufVxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIGJlZ2lubmluZyBhbmQgdGhlIGVuZCBvZiBhIGdpdmVuIHJhbmdlLlxuICpcbiAqIEBwYXJhbSB7UmFuZ2VUeXBlfSByYW5nZVR5cGUgUmFuZ2UgdHlwZSAoZS5nLiAnZGF5JylcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlLlxuICogQHJldHVybnMge0RhdGVbXX0gQmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBnaXZlbiByYW5nZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmdlKHJhbmdlVHlwZSwgZGF0ZSkge1xuICAgIHN3aXRjaCAocmFuZ2VUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2NlbnR1cnknOlxuICAgICAgICAgICAgcmV0dXJuIGdldENlbnR1cnlSYW5nZShkYXRlKTtcbiAgICAgICAgY2FzZSAnZGVjYWRlJzpcbiAgICAgICAgICAgIHJldHVybiBnZXREZWNhZGVSYW5nZShkYXRlKTtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICByZXR1cm4gZ2V0WWVhclJhbmdlKGRhdGUpO1xuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TW9udGhSYW5nZShkYXRlKTtcbiAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIHJldHVybiBnZXREYXlSYW5nZShkYXRlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmFuZ2VUeXBlOiBcIi5jb25jYXQocmFuZ2VUeXBlKSk7XG4gICAgfVxufVxuLyoqXG4gKiBDcmVhdGVzIGEgcmFuZ2Ugb3V0IG9mIHR3byB2YWx1ZXMsIGVuc3VyaW5nIHRoZXkgYXJlIGluIG9yZGVyIGFuZCBjb3ZlcmluZyBlbnRpcmUgcGVyaW9kIHJhbmdlcy5cbiAqXG4gKiBAcGFyYW0ge1JhbmdlVHlwZX0gcmFuZ2VUeXBlIFJhbmdlIHR5cGUgKGUuZy4gJ2RheScpXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUxIEZpcnN0IGRhdGUuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUyIFNlY29uZCBkYXRlLlxuICogQHJldHVybnMge0RhdGVbXX0gQmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBnaXZlbiByYW5nZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlUmFuZ2UocmFuZ2VUeXBlLCBkYXRlMSwgZGF0ZTIpIHtcbiAgICB2YXIgcmF3TmV4dFZhbHVlID0gW2RhdGUxLCBkYXRlMl0uc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5nZXRUaW1lKCkgLSBiLmdldFRpbWUoKTsgfSk7XG4gICAgcmV0dXJuIFtnZXRCZWdpbihyYW5nZVR5cGUsIHJhd05leHRWYWx1ZVswXSksIGdldEVuZChyYW5nZVR5cGUsIHJhd05leHRWYWx1ZVsxXSldO1xufVxuZnVuY3Rpb24gdG9ZZWFyTGFiZWwobG9jYWxlLCBmb3JtYXRZZWFyLCBkYXRlcykge1xuICAgIHJldHVybiBkYXRlcy5tYXAoZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIChmb3JtYXRZZWFyIHx8IGRlZmF1bHRGb3JtYXRZZWFyKShsb2NhbGUsIGRhdGUpOyB9KS5qb2luKCcg4oCTICcpO1xufVxuLyoqXG4gKiBAY2FsbGJhY2sgRm9ybWF0WWVhclxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZSBMb2NhbGUuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEZvcm1hdHRlZCB5ZWFyLlxuICovXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgbGFiZWxsaW5nIGEgY2VudHVyeSBvZiBhIGdpdmVuIGRhdGUuXG4gKiBGb3IgZXhhbXBsZSwgZm9yIDIwMTcgaXQgd2lsbCByZXR1cm4gMjAwMS0yMTAwLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGUgTG9jYWxlLlxuICogQHBhcmFtIHtGb3JtYXRZZWFyfSBmb3JtYXRZZWFyIEZ1bmN0aW9uIHRvIGZvcm1hdCBhIHllYXIuXG4gKiBAcGFyYW0ge0RhdGV8c3RyaW5nfG51bWJlcn0gZGF0ZSBEYXRlIG9yIGEgeWVhciBhcyBhIHN0cmluZyBvciBhcyBhIG51bWJlci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyBsYWJlbGxpbmcgYSBjZW50dXJ5IG9mIGEgZ2l2ZW4gZGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENlbnR1cnlMYWJlbChsb2NhbGUsIGZvcm1hdFllYXIsIGRhdGUpIHtcbiAgICByZXR1cm4gdG9ZZWFyTGFiZWwobG9jYWxlLCBmb3JtYXRZZWFyLCBnZXRDZW50dXJ5UmFuZ2UoZGF0ZSkpO1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIGxhYmVsbGluZyBhIGRlY2FkZSBvZiBhIGdpdmVuIGRhdGUuXG4gKiBGb3IgZXhhbXBsZSwgZm9yIDIwMTcgaXQgd2lsbCByZXR1cm4gMjAxMS0yMDIwLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGUgTG9jYWxlLlxuICogQHBhcmFtIHtGb3JtYXRZZWFyfSBmb3JtYXRZZWFyIEZ1bmN0aW9uIHRvIGZvcm1hdCBhIHllYXIuXG4gKiBAcGFyYW0ge0RhdGV8c3RyaW5nfG51bWJlcn0gZGF0ZSBEYXRlIG9yIGEgeWVhciBhcyBhIHN0cmluZyBvciBhcyBhIG51bWJlci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyBsYWJlbGxpbmcgYSBkZWNhZGUgb2YgYSBnaXZlbiBkYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVjYWRlTGFiZWwobG9jYWxlLCBmb3JtYXRZZWFyLCBkYXRlKSB7XG4gICAgcmV0dXJuIHRvWWVhckxhYmVsKGxvY2FsZSwgZm9ybWF0WWVhciwgZ2V0RGVjYWRlUmFuZ2UoZGF0ZSkpO1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgYm9vbGVhbiBkZXRlcm1pbmluZyB3aGV0aGVyIGEgZ2l2ZW4gZGF0ZSBpcyB0aGUgY3VycmVudCBkYXkgb2YgdGhlIHdlZWsuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBhIGdpdmVuIGRhdGUgaXMgdGhlIGN1cnJlbnQgZGF5IG9mIHRoZSB3ZWVrLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNDdXJyZW50RGF5T2ZXZWVrKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXkoKSA9PT0gbmV3IERhdGUoKS5nZXREYXkoKTtcbn1cbi8qKlxuICogUmV0dXJucyBhIGJvb2xlYW4gZGV0ZXJtaW5pbmcgd2hldGhlciBhIGdpdmVuIGRhdGUgaXMgYSB3ZWVrZW5kIGRheS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqIEBwYXJhbSB7Q2FsZW5kYXJUeXBlfSBbY2FsZW5kYXJUeXBlPVwiaXNvODYwMVwiXSBDYWxlbmRhciB0eXBlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgYSBnaXZlbiBkYXRlIGlzIGEgd2Vla2VuZCBkYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1dlZWtlbmQoZGF0ZSwgY2FsZW5kYXJUeXBlKSB7XG4gICAgaWYgKGNhbGVuZGFyVHlwZSA9PT0gdm9pZCAwKSB7IGNhbGVuZGFyVHlwZSA9IENBTEVOREFSX1RZUEVTLklTT184NjAxOyB9XG4gICAgdmFyIHdlZWtkYXkgPSBkYXRlLmdldERheSgpO1xuICAgIHN3aXRjaCAoY2FsZW5kYXJUeXBlKSB7XG4gICAgICAgIGNhc2UgQ0FMRU5EQVJfVFlQRVMuSVNMQU1JQzpcbiAgICAgICAgY2FzZSBDQUxFTkRBUl9UWVBFUy5IRUJSRVc6XG4gICAgICAgICAgICByZXR1cm4gd2Vla2RheSA9PT0gRlJJREFZIHx8IHdlZWtkYXkgPT09IFNBVFVSREFZO1xuICAgICAgICBjYXNlIENBTEVOREFSX1RZUEVTLklTT184NjAxOlxuICAgICAgICBjYXNlIENBTEVOREFSX1RZUEVTLkdSRUdPUlk6XG4gICAgICAgICAgICByZXR1cm4gd2Vla2RheSA9PT0gU0FUVVJEQVkgfHwgd2Vla2RheSA9PT0gU1VOREFZO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBjYWxlbmRhciB0eXBlLicpO1xuICAgIH1cbn1cbiIsIid1c2UgY2xpZW50JztcbmltcG9ydCB7IGpzeCBhcyBfanN4LCBGcmFnbWVudCBhcyBfRnJhZ21lbnQsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldFVzZXJMb2NhbGUgfSBmcm9tICdnZXQtdXNlci1sb2NhbGUnO1xuaW1wb3J0IHsgZ2V0Q2VudHVyeUxhYmVsLCBnZXREZWNhZGVMYWJlbCwgZ2V0QmVnaW5OZXh0LCBnZXRCZWdpbk5leHQyLCBnZXRCZWdpblByZXZpb3VzLCBnZXRCZWdpblByZXZpb3VzMiwgZ2V0RW5kUHJldmlvdXMsIGdldEVuZFByZXZpb3VzMiwgfSBmcm9tICcuLi9zaGFyZWQvZGF0ZXMuanMnO1xuaW1wb3J0IHsgZm9ybWF0TW9udGhZZWFyIGFzIGRlZmF1bHRGb3JtYXRNb250aFllYXIsIGZvcm1hdFllYXIgYXMgZGVmYXVsdEZvcm1hdFllYXIsIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGVGb3JtYXR0ZXIuanMnO1xudmFyIGNsYXNzTmFtZSA9ICdyZWFjdC1jYWxlbmRhcl9fbmF2aWdhdGlvbic7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOYXZpZ2F0aW9uKF9hKSB7XG4gICAgdmFyIGFjdGl2ZVN0YXJ0RGF0ZSA9IF9hLmFjdGl2ZVN0YXJ0RGF0ZSwgZHJpbGxVcCA9IF9hLmRyaWxsVXAsIF9iID0gX2EuZm9ybWF0TW9udGhZZWFyLCBmb3JtYXRNb250aFllYXIgPSBfYiA9PT0gdm9pZCAwID8gZGVmYXVsdEZvcm1hdE1vbnRoWWVhciA6IF9iLCBfYyA9IF9hLmZvcm1hdFllYXIsIGZvcm1hdFllYXIgPSBfYyA9PT0gdm9pZCAwID8gZGVmYXVsdEZvcm1hdFllYXIgOiBfYywgbG9jYWxlID0gX2EubG9jYWxlLCBtYXhEYXRlID0gX2EubWF4RGF0ZSwgbWluRGF0ZSA9IF9hLm1pbkRhdGUsIF9kID0gX2EubmF2aWdhdGlvbkFyaWFMYWJlbCwgbmF2aWdhdGlvbkFyaWFMYWJlbCA9IF9kID09PSB2b2lkIDAgPyAnJyA6IF9kLCBuYXZpZ2F0aW9uQXJpYUxpdmUgPSBfYS5uYXZpZ2F0aW9uQXJpYUxpdmUsIG5hdmlnYXRpb25MYWJlbCA9IF9hLm5hdmlnYXRpb25MYWJlbCwgX2UgPSBfYS5uZXh0MkFyaWFMYWJlbCwgbmV4dDJBcmlhTGFiZWwgPSBfZSA9PT0gdm9pZCAwID8gJycgOiBfZSwgX2YgPSBfYS5uZXh0MkxhYmVsLCBuZXh0MkxhYmVsID0gX2YgPT09IHZvaWQgMCA/ICfCuycgOiBfZiwgX2cgPSBfYS5uZXh0QXJpYUxhYmVsLCBuZXh0QXJpYUxhYmVsID0gX2cgPT09IHZvaWQgMCA/ICcnIDogX2csIF9oID0gX2EubmV4dExhYmVsLCBuZXh0TGFiZWwgPSBfaCA9PT0gdm9pZCAwID8gJ+KAuicgOiBfaCwgX2ogPSBfYS5wcmV2MkFyaWFMYWJlbCwgcHJldjJBcmlhTGFiZWwgPSBfaiA9PT0gdm9pZCAwID8gJycgOiBfaiwgX2sgPSBfYS5wcmV2MkxhYmVsLCBwcmV2MkxhYmVsID0gX2sgPT09IHZvaWQgMCA/ICfCqycgOiBfaywgX2wgPSBfYS5wcmV2QXJpYUxhYmVsLCBwcmV2QXJpYUxhYmVsID0gX2wgPT09IHZvaWQgMCA/ICcnIDogX2wsIF9tID0gX2EucHJldkxhYmVsLCBwcmV2TGFiZWwgPSBfbSA9PT0gdm9pZCAwID8gJ+KAuScgOiBfbSwgc2V0QWN0aXZlU3RhcnREYXRlID0gX2Euc2V0QWN0aXZlU3RhcnREYXRlLCBzaG93RG91YmxlVmlldyA9IF9hLnNob3dEb3VibGVWaWV3LCB2aWV3ID0gX2Eudmlldywgdmlld3MgPSBfYS52aWV3cztcbiAgICB2YXIgZHJpbGxVcEF2YWlsYWJsZSA9IHZpZXdzLmluZGV4T2YodmlldykgPiAwO1xuICAgIHZhciBzaG91bGRTaG93UHJldk5leHQyQnV0dG9ucyA9IHZpZXcgIT09ICdjZW50dXJ5JztcbiAgICB2YXIgcHJldmlvdXNBY3RpdmVTdGFydERhdGUgPSBnZXRCZWdpblByZXZpb3VzKHZpZXcsIGFjdGl2ZVN0YXJ0RGF0ZSk7XG4gICAgdmFyIHByZXZpb3VzQWN0aXZlU3RhcnREYXRlMiA9IHNob3VsZFNob3dQcmV2TmV4dDJCdXR0b25zXG4gICAgICAgID8gZ2V0QmVnaW5QcmV2aW91czIodmlldywgYWN0aXZlU3RhcnREYXRlKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbmV4dEFjdGl2ZVN0YXJ0RGF0ZSA9IGdldEJlZ2luTmV4dCh2aWV3LCBhY3RpdmVTdGFydERhdGUpO1xuICAgIHZhciBuZXh0QWN0aXZlU3RhcnREYXRlMiA9IHNob3VsZFNob3dQcmV2TmV4dDJCdXR0b25zXG4gICAgICAgID8gZ2V0QmVnaW5OZXh0Mih2aWV3LCBhY3RpdmVTdGFydERhdGUpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIHZhciBwcmV2QnV0dG9uRGlzYWJsZWQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocHJldmlvdXNBY3RpdmVTdGFydERhdGUuZ2V0RnVsbFllYXIoKSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2aW91c0FjdGl2ZUVuZERhdGUgPSBnZXRFbmRQcmV2aW91cyh2aWV3LCBhY3RpdmVTdGFydERhdGUpO1xuICAgICAgICByZXR1cm4gbWluRGF0ZSAmJiBtaW5EYXRlID49IHByZXZpb3VzQWN0aXZlRW5kRGF0ZTtcbiAgICB9KSgpO1xuICAgIHZhciBwcmV2MkJ1dHRvbkRpc2FibGVkID0gc2hvdWxkU2hvd1ByZXZOZXh0MkJ1dHRvbnMgJiZcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChwcmV2aW91c0FjdGl2ZVN0YXJ0RGF0ZTIuZ2V0RnVsbFllYXIoKSA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwcmV2aW91c0FjdGl2ZUVuZERhdGUgPSBnZXRFbmRQcmV2aW91czIodmlldywgYWN0aXZlU3RhcnREYXRlKTtcbiAgICAgICAgICAgIHJldHVybiBtaW5EYXRlICYmIG1pbkRhdGUgPj0gcHJldmlvdXNBY3RpdmVFbmREYXRlO1xuICAgICAgICB9KSgpO1xuICAgIHZhciBuZXh0QnV0dG9uRGlzYWJsZWQgPSBtYXhEYXRlICYmIG1heERhdGUgPCBuZXh0QWN0aXZlU3RhcnREYXRlO1xuICAgIHZhciBuZXh0MkJ1dHRvbkRpc2FibGVkID0gc2hvdWxkU2hvd1ByZXZOZXh0MkJ1dHRvbnMgJiYgbWF4RGF0ZSAmJiBtYXhEYXRlIDwgbmV4dEFjdGl2ZVN0YXJ0RGF0ZTI7XG4gICAgZnVuY3Rpb24gb25DbGlja1ByZXZpb3VzKCkge1xuICAgICAgICBzZXRBY3RpdmVTdGFydERhdGUocHJldmlvdXNBY3RpdmVTdGFydERhdGUsICdwcmV2Jyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uQ2xpY2tQcmV2aW91czIoKSB7XG4gICAgICAgIHNldEFjdGl2ZVN0YXJ0RGF0ZShwcmV2aW91c0FjdGl2ZVN0YXJ0RGF0ZTIsICdwcmV2MicpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbkNsaWNrTmV4dCgpIHtcbiAgICAgICAgc2V0QWN0aXZlU3RhcnREYXRlKG5leHRBY3RpdmVTdGFydERhdGUsICduZXh0Jyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uQ2xpY2tOZXh0MigpIHtcbiAgICAgICAgc2V0QWN0aXZlU3RhcnREYXRlKG5leHRBY3RpdmVTdGFydERhdGUyLCAnbmV4dDInKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyTGFiZWwoZGF0ZSkge1xuICAgICAgICB2YXIgbGFiZWwgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3dpdGNoICh2aWV3KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2VudHVyeSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRDZW50dXJ5TGFiZWwobG9jYWxlLCBmb3JtYXRZZWFyLCBkYXRlKTtcbiAgICAgICAgICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGVjYWRlTGFiZWwobG9jYWxlLCBmb3JtYXRZZWFyLCBkYXRlKTtcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdFllYXIobG9jYWxlLCBkYXRlKTtcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb250aFllYXIobG9jYWxlLCBkYXRlKTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZpZXc6IFwiLmNvbmNhdCh2aWV3LCBcIi5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgICByZXR1cm4gbmF2aWdhdGlvbkxhYmVsXG4gICAgICAgICAgICA/IG5hdmlnYXRpb25MYWJlbCh7XG4gICAgICAgICAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgICAgICAgICAgbG9jYWxlOiBsb2NhbGUgfHwgZ2V0VXNlckxvY2FsZSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB2aWV3OiB2aWV3LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbGFiZWw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlckJ1dHRvbigpIHtcbiAgICAgICAgdmFyIGxhYmVsQ2xhc3NOYW1lID0gXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIl9fbGFiZWxcIik7XG4gICAgICAgIHJldHVybiAoX2pzeHMoXCJidXR0b25cIiwgeyBcImFyaWEtbGFiZWxcIjogbmF2aWdhdGlvbkFyaWFMYWJlbCwgXCJhcmlhLWxpdmVcIjogbmF2aWdhdGlvbkFyaWFMaXZlLCBjbGFzc05hbWU6IGxhYmVsQ2xhc3NOYW1lLCBkaXNhYmxlZDogIWRyaWxsVXBBdmFpbGFibGUsIG9uQ2xpY2s6IGRyaWxsVXAsIHN0eWxlOiB7IGZsZXhHcm93OiAxIH0sIHR5cGU6IFwiYnV0dG9uXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGxhYmVsQ2xhc3NOYW1lLCBcIl9fbGFiZWxUZXh0IFwiKS5jb25jYXQobGFiZWxDbGFzc05hbWUsIFwiX19sYWJlbFRleHQtLWZyb21cIiksIGNoaWxkcmVuOiByZW5kZXJMYWJlbChhY3RpdmVTdGFydERhdGUpIH0pLCBzaG93RG91YmxlVmlldyA/IChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJcIi5jb25jYXQobGFiZWxDbGFzc05hbWUsIFwiX19kaXZpZGVyXCIpLCBjaGlsZHJlbjogXCIgXFx1MjAxMyBcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGxhYmVsQ2xhc3NOYW1lLCBcIl9fbGFiZWxUZXh0IFwiKS5jb25jYXQobGFiZWxDbGFzc05hbWUsIFwiX19sYWJlbFRleHQtLXRvXCIpLCBjaGlsZHJlbjogcmVuZGVyTGFiZWwobmV4dEFjdGl2ZVN0YXJ0RGF0ZSkgfSldIH0pKSA6IG51bGxdIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBjaGlsZHJlbjogW3ByZXYyTGFiZWwgIT09IG51bGwgJiYgc2hvdWxkU2hvd1ByZXZOZXh0MkJ1dHRvbnMgPyAoX2pzeChcImJ1dHRvblwiLCB7IFwiYXJpYS1sYWJlbFwiOiBwcmV2MkFyaWFMYWJlbCwgY2xhc3NOYW1lOiBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX19hcnJvdyBcIikuY29uY2F0KGNsYXNzTmFtZSwgXCJfX3ByZXYyLWJ1dHRvblwiKSwgZGlzYWJsZWQ6IHByZXYyQnV0dG9uRGlzYWJsZWQsIG9uQ2xpY2s6IG9uQ2xpY2tQcmV2aW91czIsIHR5cGU6IFwiYnV0dG9uXCIsIGNoaWxkcmVuOiBwcmV2MkxhYmVsIH0pKSA6IG51bGwsIHByZXZMYWJlbCAhPT0gbnVsbCAmJiAoX2pzeChcImJ1dHRvblwiLCB7IFwiYXJpYS1sYWJlbFwiOiBwcmV2QXJpYUxhYmVsLCBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJfX2Fycm93IFwiKS5jb25jYXQoY2xhc3NOYW1lLCBcIl9fcHJldi1idXR0b25cIiksIGRpc2FibGVkOiBwcmV2QnV0dG9uRGlzYWJsZWQsIG9uQ2xpY2s6IG9uQ2xpY2tQcmV2aW91cywgdHlwZTogXCJidXR0b25cIiwgY2hpbGRyZW46IHByZXZMYWJlbCB9KSksIHJlbmRlckJ1dHRvbigpLCBuZXh0TGFiZWwgIT09IG51bGwgJiYgKF9qc3goXCJidXR0b25cIiwgeyBcImFyaWEtbGFiZWxcIjogbmV4dEFyaWFMYWJlbCwgY2xhc3NOYW1lOiBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX19hcnJvdyBcIikuY29uY2F0KGNsYXNzTmFtZSwgXCJfX25leHQtYnV0dG9uXCIpLCBkaXNhYmxlZDogbmV4dEJ1dHRvbkRpc2FibGVkLCBvbkNsaWNrOiBvbkNsaWNrTmV4dCwgdHlwZTogXCJidXR0b25cIiwgY2hpbGRyZW46IG5leHRMYWJlbCB9KSksIG5leHQyTGFiZWwgIT09IG51bGwgJiYgc2hvdWxkU2hvd1ByZXZOZXh0MkJ1dHRvbnMgPyAoX2pzeChcImJ1dHRvblwiLCB7IFwiYXJpYS1sYWJlbFwiOiBuZXh0MkFyaWFMYWJlbCwgY2xhc3NOYW1lOiBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX19hcnJvdyBcIikuY29uY2F0KGNsYXNzTmFtZSwgXCJfX25leHQyLWJ1dHRvblwiKSwgZGlzYWJsZWQ6IG5leHQyQnV0dG9uRGlzYWJsZWQsIG9uQ2xpY2s6IG9uQ2xpY2tOZXh0MiwgdHlwZTogXCJidXR0b25cIiwgY2hpbGRyZW46IG5leHQyTGFiZWwgfSkpIDogbnVsbF0gfSkpO1xufVxuIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBDaGlsZHJlbiwgY2xvbmVFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuZnVuY3Rpb24gdG9QZXJjZW50KG51bSkge1xuICAgIHJldHVybiBcIlwiLmNvbmNhdChudW0sIFwiJVwiKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZsZXgoX2EpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBfYS5jaGlsZHJlbiwgY2xhc3NOYW1lID0gX2EuY2xhc3NOYW1lLCBjb3VudCA9IF9hLmNvdW50LCBkaXJlY3Rpb24gPSBfYS5kaXJlY3Rpb24sIG9mZnNldCA9IF9hLm9mZnNldCwgc3R5bGUgPSBfYS5zdHlsZSwgd3JhcCA9IF9hLndyYXAsIG90aGVyUHJvcHMgPSBfX3Jlc3QoX2EsIFtcImNoaWxkcmVuXCIsIFwiY2xhc3NOYW1lXCIsIFwiY291bnRcIiwgXCJkaXJlY3Rpb25cIiwgXCJvZmZzZXRcIiwgXCJzdHlsZVwiLCBcIndyYXBcIl0pO1xuICAgIHJldHVybiAoX2pzeChcImRpdlwiLCBfX2Fzc2lnbih7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBzdHlsZTogX19hc3NpZ24oeyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246IGRpcmVjdGlvbiwgZmxleFdyYXA6IHdyYXAgPyAnd3JhcCcgOiAnbm93cmFwJyB9LCBzdHlsZSkgfSwgb3RoZXJQcm9wcywgeyBjaGlsZHJlbjogQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgbWFyZ2luSW5saW5lU3RhcnQgPSBvZmZzZXQgJiYgaW5kZXggPT09IDAgPyB0b1BlcmNlbnQoKDEwMCAqIG9mZnNldCkgLyBjb3VudCkgOiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGNsb25lRWxlbWVudChjaGlsZCwgX19hc3NpZ24oX19hc3NpZ24oe30sIGNoaWxkLnByb3BzKSwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBmbGV4QmFzaXM6IHRvUGVyY2VudCgxMDAgLyBjb3VudCksXG4gICAgICAgICAgICAgICAgICAgIGZsZXhTaHJpbms6IDAsXG4gICAgICAgICAgICAgICAgICAgIGZsZXhHcm93OiAwLFxuICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IG1hcmdpbklubGluZVN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5JbmxpbmVTdGFydDogbWFyZ2luSW5saW5lU3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbklubGluZUVuZDogMCxcbiAgICAgICAgICAgICAgICB9IH0pKTtcbiAgICAgICAgfSkgfSkpKTtcbn1cbiIsImltcG9ydCB7IGdldFJhbmdlIH0gZnJvbSAnLi9kYXRlcy5qcyc7XG4vKipcbiAqIFJldHVybnMgYSB2YWx1ZSBubyBzbWFsbGVyIHRoYW4gbWluIGFuZCBubyBsYXJnZXIgdGhhbiBtYXguXG4gKlxuICogQHBhcmFtIHtEYXRlfSB2YWx1ZSBWYWx1ZSB0byByZXR1cm4uXG4gKiBAcGFyYW0ge0RhdGV9IG1pbiBNaW5pbXVtIHJldHVybiB2YWx1ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gbWF4IE1heGltdW0gcmV0dXJuIHZhbHVlLlxuICogQHJldHVybnMge0RhdGV9IFZhbHVlIGJldHdlZW4gbWluIGFuZCBtYXguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZXR3ZWVuKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIGlmIChtaW4gJiYgbWluID4gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG4gICAgaWYgKG1heCAmJiBtYXggPCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbWF4O1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNWYWx1ZVdpdGhpblJhbmdlKHZhbHVlLCByYW5nZSkge1xuICAgIHJldHVybiByYW5nZVswXSA8PSB2YWx1ZSAmJiByYW5nZVsxXSA+PSB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1JhbmdlV2l0aGluUmFuZ2UoZ3JlYXRlclJhbmdlLCBzbWFsbGVyUmFuZ2UpIHtcbiAgICByZXR1cm4gZ3JlYXRlclJhbmdlWzBdIDw9IHNtYWxsZXJSYW5nZVswXSAmJiBncmVhdGVyUmFuZ2VbMV0gPj0gc21hbGxlclJhbmdlWzFdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRvUmFuZ2VzT3ZlcmxhcChyYW5nZTEsIHJhbmdlMikge1xuICAgIHJldHVybiBpc1ZhbHVlV2l0aGluUmFuZ2UocmFuZ2UxWzBdLCByYW5nZTIpIHx8IGlzVmFsdWVXaXRoaW5SYW5nZShyYW5nZTFbMV0sIHJhbmdlMik7XG59XG5mdW5jdGlvbiBnZXRSYW5nZUNsYXNzTmFtZXModmFsdWVSYW5nZSwgZGF0ZVJhbmdlLCBiYXNlQ2xhc3NOYW1lKSB7XG4gICAgdmFyIGlzUmFuZ2UgPSBkb1Jhbmdlc092ZXJsYXAoZGF0ZVJhbmdlLCB2YWx1ZVJhbmdlKTtcbiAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgIGlmIChpc1JhbmdlKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChiYXNlQ2xhc3NOYW1lKTtcbiAgICAgICAgdmFyIGlzUmFuZ2VTdGFydCA9IGlzVmFsdWVXaXRoaW5SYW5nZSh2YWx1ZVJhbmdlWzBdLCBkYXRlUmFuZ2UpO1xuICAgICAgICB2YXIgaXNSYW5nZUVuZCA9IGlzVmFsdWVXaXRoaW5SYW5nZSh2YWx1ZVJhbmdlWzFdLCBkYXRlUmFuZ2UpO1xuICAgICAgICBpZiAoaXNSYW5nZVN0YXJ0KSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJcIi5jb25jYXQoYmFzZUNsYXNzTmFtZSwgXCJTdGFydFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmFuZ2VFbmQpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIkVuZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmFuZ2VTdGFydCAmJiBpc1JhbmdlRW5kKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJcIi5jb25jYXQoYmFzZUNsYXNzTmFtZSwgXCJCb3RoRW5kc1wiKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNsYXNzZXM7XG59XG5mdW5jdGlvbiBpc0NvbXBsZXRlVmFsdWUodmFsdWUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlWzBdICE9PSBudWxsICYmIHZhbHVlWzFdICE9PSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUgIT09IG51bGw7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0VGlsZUNsYXNzZXMoYXJncykge1xuICAgIGlmICghYXJncykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgdmFyIHZhbHVlID0gYXJncy52YWx1ZSwgZGF0ZSA9IGFyZ3MuZGF0ZSwgaG92ZXIgPSBhcmdzLmhvdmVyO1xuICAgIHZhciBjbGFzc05hbWUgPSAncmVhY3QtY2FsZW5kYXJfX3RpbGUnO1xuICAgIHZhciBjbGFzc2VzID0gW2NsYXNzTmFtZV07XG4gICAgaWYgKCFkYXRlKSB7XG4gICAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgIH1cbiAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICB2YXIgZGF0ZVJhbmdlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXRlVHlwZSA9IGFyZ3MuZGF0ZVR5cGU7XG4gICAgICAgIGlmICghZGF0ZVR5cGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZGF0ZVR5cGUgaXMgcmVxdWlyZWQgd2hlbiBkYXRlIGlzIG5vdCBhbiBhcnJheSBvZiB0d28gZGF0ZXMnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2V0UmFuZ2UoZGF0ZVR5cGUsIGRhdGUpO1xuICAgIH0pKCk7XG4gICAgaWYgKGlzVmFsdWVXaXRoaW5SYW5nZShub3csIGRhdGVSYW5nZSkpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCItLW5vd1wiKSk7XG4gICAgfVxuICAgIGlmICghdmFsdWUgfHwgIWlzQ29tcGxldGVWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgfVxuICAgIHZhciB2YWx1ZVJhbmdlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlVHlwZSA9IGFyZ3MudmFsdWVUeXBlO1xuICAgICAgICBpZiAoIXZhbHVlVHlwZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd2YWx1ZVR5cGUgaXMgcmVxdWlyZWQgd2hlbiB2YWx1ZSBpcyBub3QgYW4gYXJyYXkgb2YgdHdvIGRhdGVzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdldFJhbmdlKHZhbHVlVHlwZSwgdmFsdWUpO1xuICAgIH0pKCk7XG4gICAgaWYgKGlzUmFuZ2VXaXRoaW5SYW5nZSh2YWx1ZVJhbmdlLCBkYXRlUmFuZ2UpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiLS1hY3RpdmVcIikpO1xuICAgIH1cbiAgICBlbHNlIGlmIChkb1Jhbmdlc092ZXJsYXAodmFsdWVSYW5nZSwgZGF0ZVJhbmdlKSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIi0taGFzQWN0aXZlXCIpKTtcbiAgICB9XG4gICAgdmFyIHZhbHVlUmFuZ2VDbGFzc05hbWVzID0gZ2V0UmFuZ2VDbGFzc05hbWVzKHZhbHVlUmFuZ2UsIGRhdGVSYW5nZSwgXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIi0tcmFuZ2VcIikpO1xuICAgIGNsYXNzZXMucHVzaC5hcHBseShjbGFzc2VzLCB2YWx1ZVJhbmdlQ2xhc3NOYW1lcyk7XG4gICAgdmFyIHZhbHVlQXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcbiAgICBpZiAoaG92ZXIgJiYgdmFsdWVBcnJheS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdmFyIGhvdmVyUmFuZ2UgPSBob3ZlciA+IHZhbHVlUmFuZ2VbMF0gPyBbdmFsdWVSYW5nZVswXSwgaG92ZXJdIDogW2hvdmVyLCB2YWx1ZVJhbmdlWzBdXTtcbiAgICAgICAgdmFyIGhvdmVyUmFuZ2VDbGFzc05hbWVzID0gZ2V0UmFuZ2VDbGFzc05hbWVzKGhvdmVyUmFuZ2UsIGRhdGVSYW5nZSwgXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIi0taG92ZXJcIikpO1xuICAgICAgICBjbGFzc2VzLnB1c2guYXBwbHkoY2xhc3NlcywgaG92ZXJSYW5nZUNsYXNzTmFtZXMpO1xuICAgIH1cbiAgICByZXR1cm4gY2xhc3Nlcztcbn1cbiIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgRmxleCBmcm9tICcuL0ZsZXguanMnO1xuaW1wb3J0IHsgZ2V0VGlsZUNsYXNzZXMgfSBmcm9tICcuL3NoYXJlZC91dGlscy5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUaWxlR3JvdXAoX2EpIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gX2EuY2xhc3NOYW1lLCBfYiA9IF9hLmNvdW50LCBjb3VudCA9IF9iID09PSB2b2lkIDAgPyAzIDogX2IsIGRhdGVUcmFuc2Zvcm0gPSBfYS5kYXRlVHJhbnNmb3JtLCBkYXRlVHlwZSA9IF9hLmRhdGVUeXBlLCBlbmQgPSBfYS5lbmQsIGhvdmVyID0gX2EuaG92ZXIsIG9mZnNldCA9IF9hLm9mZnNldCwgcmVuZGVyVGlsZSA9IF9hLnJlbmRlclRpbGUsIHN0YXJ0ID0gX2Euc3RhcnQsIF9jID0gX2Euc3RlcCwgc3RlcCA9IF9jID09PSB2b2lkIDAgPyAxIDogX2MsIHZhbHVlID0gX2EudmFsdWUsIHZhbHVlVHlwZSA9IF9hLnZhbHVlVHlwZTtcbiAgICB2YXIgdGlsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBwb2ludCA9IHN0YXJ0OyBwb2ludCA8PSBlbmQ7IHBvaW50ICs9IHN0ZXApIHtcbiAgICAgICAgdmFyIGRhdGUgPSBkYXRlVHJhbnNmb3JtKHBvaW50KTtcbiAgICAgICAgdGlsZXMucHVzaChyZW5kZXJUaWxlKHtcbiAgICAgICAgICAgIGNsYXNzZXM6IGdldFRpbGVDbGFzc2VzKHtcbiAgICAgICAgICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgICAgICAgICAgIGRhdGVUeXBlOiBkYXRlVHlwZSxcbiAgICAgICAgICAgICAgICBob3ZlcjogaG92ZXIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHZhbHVlVHlwZTogdmFsdWVUeXBlLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiAoX2pzeChGbGV4LCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBjb3VudDogY291bnQsIG9mZnNldDogb2Zmc2V0LCB3cmFwOiB0cnVlLCBjaGlsZHJlbjogdGlsZXMgfSkpO1xufVxuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRpbGUocHJvcHMpIHtcbiAgICB2YXIgYWN0aXZlU3RhcnREYXRlID0gcHJvcHMuYWN0aXZlU3RhcnREYXRlLCBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLCBjbGFzc2VzID0gcHJvcHMuY2xhc3NlcywgZGF0ZSA9IHByb3BzLmRhdGUsIGZvcm1hdEFiYnIgPSBwcm9wcy5mb3JtYXRBYmJyLCBsb2NhbGUgPSBwcm9wcy5sb2NhbGUsIG1heERhdGUgPSBwcm9wcy5tYXhEYXRlLCBtYXhEYXRlVHJhbnNmb3JtID0gcHJvcHMubWF4RGF0ZVRyYW5zZm9ybSwgbWluRGF0ZSA9IHByb3BzLm1pbkRhdGUsIG1pbkRhdGVUcmFuc2Zvcm0gPSBwcm9wcy5taW5EYXRlVHJhbnNmb3JtLCBvbkNsaWNrID0gcHJvcHMub25DbGljaywgb25Nb3VzZU92ZXIgPSBwcm9wcy5vbk1vdXNlT3Zlciwgc3R5bGUgPSBwcm9wcy5zdHlsZSwgdGlsZUNsYXNzTmFtZVByb3BzID0gcHJvcHMudGlsZUNsYXNzTmFtZSwgdGlsZUNvbnRlbnRQcm9wcyA9IHByb3BzLnRpbGVDb250ZW50LCB0aWxlRGlzYWJsZWQgPSBwcm9wcy50aWxlRGlzYWJsZWQsIHZpZXcgPSBwcm9wcy52aWV3O1xuICAgIHZhciB0aWxlQ2xhc3NOYW1lID0gdXNlTWVtbyhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0geyBhY3RpdmVTdGFydERhdGU6IGFjdGl2ZVN0YXJ0RGF0ZSwgZGF0ZTogZGF0ZSwgdmlldzogdmlldyB9O1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRpbGVDbGFzc05hbWVQcm9wcyA9PT0gJ2Z1bmN0aW9uJyA/IHRpbGVDbGFzc05hbWVQcm9wcyhhcmdzKSA6IHRpbGVDbGFzc05hbWVQcm9wcztcbiAgICB9LCBbYWN0aXZlU3RhcnREYXRlLCBkYXRlLCB0aWxlQ2xhc3NOYW1lUHJvcHMsIHZpZXddKTtcbiAgICB2YXIgdGlsZUNvbnRlbnQgPSB1c2VNZW1vKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSB7IGFjdGl2ZVN0YXJ0RGF0ZTogYWN0aXZlU3RhcnREYXRlLCBkYXRlOiBkYXRlLCB2aWV3OiB2aWV3IH07XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGlsZUNvbnRlbnRQcm9wcyA9PT0gJ2Z1bmN0aW9uJyA/IHRpbGVDb250ZW50UHJvcHMoYXJncykgOiB0aWxlQ29udGVudFByb3BzO1xuICAgIH0sIFthY3RpdmVTdGFydERhdGUsIGRhdGUsIHRpbGVDb250ZW50UHJvcHMsIHZpZXddKTtcbiAgICByZXR1cm4gKF9qc3hzKFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBjbHN4KGNsYXNzZXMsIHRpbGVDbGFzc05hbWUpLCBkaXNhYmxlZDogKG1pbkRhdGUgJiYgbWluRGF0ZVRyYW5zZm9ybShtaW5EYXRlKSA+IGRhdGUpIHx8XG4gICAgICAgICAgICAobWF4RGF0ZSAmJiBtYXhEYXRlVHJhbnNmb3JtKG1heERhdGUpIDwgZGF0ZSkgfHxcbiAgICAgICAgICAgICh0aWxlRGlzYWJsZWQgPT09IG51bGwgfHwgdGlsZURpc2FibGVkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0aWxlRGlzYWJsZWQoeyBhY3RpdmVTdGFydERhdGU6IGFjdGl2ZVN0YXJ0RGF0ZSwgZGF0ZTogZGF0ZSwgdmlldzogdmlldyB9KSksIG9uQ2xpY2s6IG9uQ2xpY2sgPyBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIG9uQ2xpY2soZGF0ZSwgZXZlbnQpOyB9IDogdW5kZWZpbmVkLCBvbkZvY3VzOiBvbk1vdXNlT3ZlciA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9uTW91c2VPdmVyKGRhdGUpOyB9IDogdW5kZWZpbmVkLCBvbk1vdXNlT3Zlcjogb25Nb3VzZU92ZXIgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBvbk1vdXNlT3ZlcihkYXRlKTsgfSA6IHVuZGVmaW5lZCwgc3R5bGU6IHN0eWxlLCB0eXBlOiBcImJ1dHRvblwiLCBjaGlsZHJlbjogW2Zvcm1hdEFiYnIgPyBfanN4KFwiYWJiclwiLCB7IFwiYXJpYS1sYWJlbFwiOiBmb3JtYXRBYmJyKGxvY2FsZSwgZGF0ZSksIGNoaWxkcmVuOiBjaGlsZHJlbiB9KSA6IGNoaWxkcmVuLCB0aWxlQ29udGVudF0gfSkpO1xufVxuIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBnZXREZWNhZGVTdGFydCwgZ2V0RGVjYWRlRW5kLCBnZXRDZW50dXJ5U3RhcnQgfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IFRpbGUgZnJvbSAnLi4vVGlsZS5qcyc7XG5pbXBvcnQgeyBnZXREZWNhZGVMYWJlbCB9IGZyb20gJy4uL3NoYXJlZC9kYXRlcy5qcyc7XG5pbXBvcnQgeyBmb3JtYXRZZWFyIGFzIGRlZmF1bHRGb3JtYXRZZWFyIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGVGb3JtYXR0ZXIuanMnO1xudmFyIGNsYXNzTmFtZSA9ICdyZWFjdC1jYWxlbmRhcl9fY2VudHVyeS12aWV3X19kZWNhZGVzX19kZWNhZGUnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGVjYWRlKF9hKSB7XG4gICAgdmFyIF9iID0gX2EuY2xhc3NlcywgY2xhc3NlcyA9IF9iID09PSB2b2lkIDAgPyBbXSA6IF9iLCBjdXJyZW50Q2VudHVyeSA9IF9hLmN1cnJlbnRDZW50dXJ5LCBfYyA9IF9hLmZvcm1hdFllYXIsIGZvcm1hdFllYXIgPSBfYyA9PT0gdm9pZCAwID8gZGVmYXVsdEZvcm1hdFllYXIgOiBfYywgb3RoZXJQcm9wcyA9IF9fcmVzdChfYSwgW1wiY2xhc3Nlc1wiLCBcImN1cnJlbnRDZW50dXJ5XCIsIFwiZm9ybWF0WWVhclwiXSk7XG4gICAgdmFyIGRhdGUgPSBvdGhlclByb3BzLmRhdGUsIGxvY2FsZSA9IG90aGVyUHJvcHMubG9jYWxlO1xuICAgIHZhciBjbGFzc2VzUHJvcHMgPSBbXTtcbiAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICBjbGFzc2VzUHJvcHMucHVzaC5hcHBseShjbGFzc2VzUHJvcHMsIGNsYXNzZXMpO1xuICAgIH1cbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGNsYXNzZXNQcm9wcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIGlmIChnZXRDZW50dXJ5U3RhcnQoZGF0ZSkuZ2V0RnVsbFllYXIoKSAhPT0gY3VycmVudENlbnR1cnkpIHtcbiAgICAgICAgY2xhc3Nlc1Byb3BzLnB1c2goXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIi0tbmVpZ2hib3JpbmdDZW50dXJ5XCIpKTtcbiAgICB9XG4gICAgcmV0dXJuIChfanN4KFRpbGUsIF9fYXNzaWduKHt9LCBvdGhlclByb3BzLCB7IGNsYXNzZXM6IGNsYXNzZXNQcm9wcywgbWF4RGF0ZVRyYW5zZm9ybTogZ2V0RGVjYWRlRW5kLCBtaW5EYXRlVHJhbnNmb3JtOiBnZXREZWNhZGVTdGFydCwgdmlldzogXCJjZW50dXJ5XCIsIGNoaWxkcmVuOiBnZXREZWNhZGVMYWJlbChsb2NhbGUsIGZvcm1hdFllYXIsIGRhdGUpIH0pKSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldERlY2FkZVN0YXJ0IH0gZnJvbSAnQHdvanRla21hai9kYXRlLXV0aWxzJztcbmltcG9ydCBUaWxlR3JvdXAgZnJvbSAnLi4vVGlsZUdyb3VwLmpzJztcbmltcG9ydCBEZWNhZGUgZnJvbSAnLi9EZWNhZGUuanMnO1xuaW1wb3J0IHsgZ2V0QmVnaW5PZkNlbnR1cnlZZWFyIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGVzLmpzJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERlY2FkZXMocHJvcHMpIHtcbiAgICB2YXIgYWN0aXZlU3RhcnREYXRlID0gcHJvcHMuYWN0aXZlU3RhcnREYXRlLCBob3ZlciA9IHByb3BzLmhvdmVyLCBzaG93TmVpZ2hib3JpbmdDZW50dXJ5ID0gcHJvcHMuc2hvd05laWdoYm9yaW5nQ2VudHVyeSwgdmFsdWUgPSBwcm9wcy52YWx1ZSwgdmFsdWVUeXBlID0gcHJvcHMudmFsdWVUeXBlLCBvdGhlclByb3BzID0gX19yZXN0KHByb3BzLCBbXCJhY3RpdmVTdGFydERhdGVcIiwgXCJob3ZlclwiLCBcInNob3dOZWlnaGJvcmluZ0NlbnR1cnlcIiwgXCJ2YWx1ZVwiLCBcInZhbHVlVHlwZVwiXSk7XG4gICAgdmFyIHN0YXJ0ID0gZ2V0QmVnaW5PZkNlbnR1cnlZZWFyKGFjdGl2ZVN0YXJ0RGF0ZSk7XG4gICAgdmFyIGVuZCA9IHN0YXJ0ICsgKHNob3dOZWlnaGJvcmluZ0NlbnR1cnkgPyAxMTkgOiA5OSk7XG4gICAgcmV0dXJuIChfanN4KFRpbGVHcm91cCwgeyBjbGFzc05hbWU6IFwicmVhY3QtY2FsZW5kYXJfX2NlbnR1cnktdmlld19fZGVjYWRlc1wiLCBkYXRlVHJhbnNmb3JtOiBnZXREZWNhZGVTdGFydCwgZGF0ZVR5cGU6IFwiZGVjYWRlXCIsIGVuZDogZW5kLCBob3ZlcjogaG92ZXIsIHJlbmRlclRpbGU6IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBfYS5kYXRlLCBvdGhlclRpbGVQcm9wcyA9IF9fcmVzdChfYSwgW1wiZGF0ZVwiXSk7XG4gICAgICAgICAgICByZXR1cm4gKF9qc3goRGVjYWRlLCBfX2Fzc2lnbih7fSwgb3RoZXJQcm9wcywgb3RoZXJUaWxlUHJvcHMsIHsgYWN0aXZlU3RhcnREYXRlOiBhY3RpdmVTdGFydERhdGUsIGN1cnJlbnRDZW50dXJ5OiBzdGFydCwgZGF0ZTogZGF0ZSB9KSwgZGF0ZS5nZXRUaW1lKCkpKTtcbiAgICAgICAgfSwgc3RhcnQ6IHN0YXJ0LCBzdGVwOiAxMCwgdmFsdWU6IHZhbHVlLCB2YWx1ZVR5cGU6IHZhbHVlVHlwZSB9KSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBEZWNhZGVzIGZyb20gJy4vQ2VudHVyeVZpZXcvRGVjYWRlcy5qcyc7XG4vKipcbiAqIERpc3BsYXlzIGEgZ2l2ZW4gY2VudHVyeS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2VudHVyeVZpZXcocHJvcHMpIHtcbiAgICBmdW5jdGlvbiByZW5kZXJEZWNhZGVzKCkge1xuICAgICAgICByZXR1cm4gX2pzeChEZWNhZGVzLCBfX2Fzc2lnbih7fSwgcHJvcHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVhY3QtY2FsZW5kYXJfX2NlbnR1cnktdmlld1wiLCBjaGlsZHJlbjogcmVuZGVyRGVjYWRlcygpIH0pO1xufVxuIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBnZXRZZWFyU3RhcnQsIGdldFllYXJFbmQsIGdldERlY2FkZVN0YXJ0IH0gZnJvbSAnQHdvanRla21hai9kYXRlLXV0aWxzJztcbmltcG9ydCBUaWxlIGZyb20gJy4uL1RpbGUuanMnO1xuaW1wb3J0IHsgZm9ybWF0WWVhciBhcyBkZWZhdWx0Rm9ybWF0WWVhciB9IGZyb20gJy4uL3NoYXJlZC9kYXRlRm9ybWF0dGVyLmpzJztcbnZhciBjbGFzc05hbWUgPSAncmVhY3QtY2FsZW5kYXJfX2RlY2FkZS12aWV3X195ZWFyc19feWVhcic7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBZZWFyKF9hKSB7XG4gICAgdmFyIF9iID0gX2EuY2xhc3NlcywgY2xhc3NlcyA9IF9iID09PSB2b2lkIDAgPyBbXSA6IF9iLCBjdXJyZW50RGVjYWRlID0gX2EuY3VycmVudERlY2FkZSwgX2MgPSBfYS5mb3JtYXRZZWFyLCBmb3JtYXRZZWFyID0gX2MgPT09IHZvaWQgMCA/IGRlZmF1bHRGb3JtYXRZZWFyIDogX2MsIG90aGVyUHJvcHMgPSBfX3Jlc3QoX2EsIFtcImNsYXNzZXNcIiwgXCJjdXJyZW50RGVjYWRlXCIsIFwiZm9ybWF0WWVhclwiXSk7XG4gICAgdmFyIGRhdGUgPSBvdGhlclByb3BzLmRhdGUsIGxvY2FsZSA9IG90aGVyUHJvcHMubG9jYWxlO1xuICAgIHZhciBjbGFzc2VzUHJvcHMgPSBbXTtcbiAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICBjbGFzc2VzUHJvcHMucHVzaC5hcHBseShjbGFzc2VzUHJvcHMsIGNsYXNzZXMpO1xuICAgIH1cbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGNsYXNzZXNQcm9wcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIGlmIChnZXREZWNhZGVTdGFydChkYXRlKS5nZXRGdWxsWWVhcigpICE9PSBjdXJyZW50RGVjYWRlKSB7XG4gICAgICAgIGNsYXNzZXNQcm9wcy5wdXNoKFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCItLW5laWdoYm9yaW5nRGVjYWRlXCIpKTtcbiAgICB9XG4gICAgcmV0dXJuIChfanN4KFRpbGUsIF9fYXNzaWduKHt9LCBvdGhlclByb3BzLCB7IGNsYXNzZXM6IGNsYXNzZXNQcm9wcywgbWF4RGF0ZVRyYW5zZm9ybTogZ2V0WWVhckVuZCwgbWluRGF0ZVRyYW5zZm9ybTogZ2V0WWVhclN0YXJ0LCB2aWV3OiBcImRlY2FkZVwiLCBjaGlsZHJlbjogZm9ybWF0WWVhcihsb2NhbGUsIGRhdGUpIH0pKSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldFllYXJTdGFydCB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5pbXBvcnQgVGlsZUdyb3VwIGZyb20gJy4uL1RpbGVHcm91cC5qcyc7XG5pbXBvcnQgWWVhciBmcm9tICcuL1llYXIuanMnO1xuaW1wb3J0IHsgZ2V0QmVnaW5PZkRlY2FkZVllYXIgfSBmcm9tICcuLi9zaGFyZWQvZGF0ZXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gWWVhcnMocHJvcHMpIHtcbiAgICB2YXIgYWN0aXZlU3RhcnREYXRlID0gcHJvcHMuYWN0aXZlU3RhcnREYXRlLCBob3ZlciA9IHByb3BzLmhvdmVyLCBzaG93TmVpZ2hib3JpbmdEZWNhZGUgPSBwcm9wcy5zaG93TmVpZ2hib3JpbmdEZWNhZGUsIHZhbHVlID0gcHJvcHMudmFsdWUsIHZhbHVlVHlwZSA9IHByb3BzLnZhbHVlVHlwZSwgb3RoZXJQcm9wcyA9IF9fcmVzdChwcm9wcywgW1wiYWN0aXZlU3RhcnREYXRlXCIsIFwiaG92ZXJcIiwgXCJzaG93TmVpZ2hib3JpbmdEZWNhZGVcIiwgXCJ2YWx1ZVwiLCBcInZhbHVlVHlwZVwiXSk7XG4gICAgdmFyIHN0YXJ0ID0gZ2V0QmVnaW5PZkRlY2FkZVllYXIoYWN0aXZlU3RhcnREYXRlKTtcbiAgICB2YXIgZW5kID0gc3RhcnQgKyAoc2hvd05laWdoYm9yaW5nRGVjYWRlID8gMTEgOiA5KTtcbiAgICByZXR1cm4gKF9qc3goVGlsZUdyb3VwLCB7IGNsYXNzTmFtZTogXCJyZWFjdC1jYWxlbmRhcl9fZGVjYWRlLXZpZXdfX3llYXJzXCIsIGRhdGVUcmFuc2Zvcm06IGdldFllYXJTdGFydCwgZGF0ZVR5cGU6IFwieWVhclwiLCBlbmQ6IGVuZCwgaG92ZXI6IGhvdmVyLCByZW5kZXJUaWxlOiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gX2EuZGF0ZSwgb3RoZXJUaWxlUHJvcHMgPSBfX3Jlc3QoX2EsIFtcImRhdGVcIl0pO1xuICAgICAgICAgICAgcmV0dXJuIChfanN4KFllYXIsIF9fYXNzaWduKHt9LCBvdGhlclByb3BzLCBvdGhlclRpbGVQcm9wcywgeyBhY3RpdmVTdGFydERhdGU6IGFjdGl2ZVN0YXJ0RGF0ZSwgY3VycmVudERlY2FkZTogc3RhcnQsIGRhdGU6IGRhdGUgfSksIGRhdGUuZ2V0VGltZSgpKSk7XG4gICAgICAgIH0sIHN0YXJ0OiBzdGFydCwgdmFsdWU6IHZhbHVlLCB2YWx1ZVR5cGU6IHZhbHVlVHlwZSB9KSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBZZWFycyBmcm9tICcuL0RlY2FkZVZpZXcvWWVhcnMuanMnO1xuLyoqXG4gKiBEaXNwbGF5cyBhIGdpdmVuIGRlY2FkZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGVjYWRlVmlldyhwcm9wcykge1xuICAgIGZ1bmN0aW9uIHJlbmRlclllYXJzKCkge1xuICAgICAgICByZXR1cm4gX2pzeChZZWFycywgX19hc3NpZ24oe30sIHByb3BzKSk7XG4gICAgfVxuICAgIHJldHVybiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJlYWN0LWNhbGVuZGFyX19kZWNhZGUtdmlld1wiLCBjaGlsZHJlbjogcmVuZGVyWWVhcnMoKSB9KTtcbn1cbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgZ2V0TW9udGhTdGFydCwgZ2V0TW9udGhFbmQgfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IFRpbGUgZnJvbSAnLi4vVGlsZS5qcyc7XG5pbXBvcnQgeyBmb3JtYXRNb250aCBhcyBkZWZhdWx0Rm9ybWF0TW9udGgsIGZvcm1hdE1vbnRoWWVhciBhcyBkZWZhdWx0Rm9ybWF0TW9udGhZZWFyLCB9IGZyb20gJy4uL3NoYXJlZC9kYXRlRm9ybWF0dGVyLmpzJztcbnZhciBjbGFzc05hbWUgPSAncmVhY3QtY2FsZW5kYXJfX3llYXItdmlld19fbW9udGhzX19tb250aCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNb250aChfYSkge1xuICAgIHZhciBfYiA9IF9hLmNsYXNzZXMsIGNsYXNzZXMgPSBfYiA9PT0gdm9pZCAwID8gW10gOiBfYiwgX2MgPSBfYS5mb3JtYXRNb250aCwgZm9ybWF0TW9udGggPSBfYyA9PT0gdm9pZCAwID8gZGVmYXVsdEZvcm1hdE1vbnRoIDogX2MsIF9kID0gX2EuZm9ybWF0TW9udGhZZWFyLCBmb3JtYXRNb250aFllYXIgPSBfZCA9PT0gdm9pZCAwID8gZGVmYXVsdEZvcm1hdE1vbnRoWWVhciA6IF9kLCBvdGhlclByb3BzID0gX19yZXN0KF9hLCBbXCJjbGFzc2VzXCIsIFwiZm9ybWF0TW9udGhcIiwgXCJmb3JtYXRNb250aFllYXJcIl0pO1xuICAgIHZhciBkYXRlID0gb3RoZXJQcm9wcy5kYXRlLCBsb2NhbGUgPSBvdGhlclByb3BzLmxvY2FsZTtcbiAgICByZXR1cm4gKF9qc3goVGlsZSwgX19hc3NpZ24oe30sIG90aGVyUHJvcHMsIHsgY2xhc3NlczogX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBjbGFzc2VzLCB0cnVlKSwgW2NsYXNzTmFtZV0sIGZhbHNlKSwgZm9ybWF0QWJicjogZm9ybWF0TW9udGhZZWFyLCBtYXhEYXRlVHJhbnNmb3JtOiBnZXRNb250aEVuZCwgbWluRGF0ZVRyYW5zZm9ybTogZ2V0TW9udGhTdGFydCwgdmlldzogXCJ5ZWFyXCIsIGNoaWxkcmVuOiBmb3JtYXRNb250aChsb2NhbGUsIGRhdGUpIH0pKSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldE1vbnRoU3RhcnQsIGdldFllYXIgfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IFRpbGVHcm91cCBmcm9tICcuLi9UaWxlR3JvdXAuanMnO1xuaW1wb3J0IE1vbnRoIGZyb20gJy4vTW9udGguanMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTW9udGhzKHByb3BzKSB7XG4gICAgdmFyIGFjdGl2ZVN0YXJ0RGF0ZSA9IHByb3BzLmFjdGl2ZVN0YXJ0RGF0ZSwgaG92ZXIgPSBwcm9wcy5ob3ZlciwgdmFsdWUgPSBwcm9wcy52YWx1ZSwgdmFsdWVUeXBlID0gcHJvcHMudmFsdWVUeXBlLCBvdGhlclByb3BzID0gX19yZXN0KHByb3BzLCBbXCJhY3RpdmVTdGFydERhdGVcIiwgXCJob3ZlclwiLCBcInZhbHVlXCIsIFwidmFsdWVUeXBlXCJdKTtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIHZhciBlbmQgPSAxMTtcbiAgICB2YXIgeWVhciA9IGdldFllYXIoYWN0aXZlU3RhcnREYXRlKTtcbiAgICByZXR1cm4gKF9qc3goVGlsZUdyb3VwLCB7IGNsYXNzTmFtZTogXCJyZWFjdC1jYWxlbmRhcl9feWVhci12aWV3X19tb250aHNcIiwgZGF0ZVRyYW5zZm9ybTogZnVuY3Rpb24gKG1vbnRoSW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGRhdGUuc2V0RnVsbFllYXIoeWVhciwgbW9udGhJbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TW9udGhTdGFydChkYXRlKTtcbiAgICAgICAgfSwgZGF0ZVR5cGU6IFwibW9udGhcIiwgZW5kOiBlbmQsIGhvdmVyOiBob3ZlciwgcmVuZGVyVGlsZTogZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IF9hLmRhdGUsIG90aGVyVGlsZVByb3BzID0gX19yZXN0KF9hLCBbXCJkYXRlXCJdKTtcbiAgICAgICAgICAgIHJldHVybiAoX2pzeChNb250aCwgX19hc3NpZ24oe30sIG90aGVyUHJvcHMsIG90aGVyVGlsZVByb3BzLCB7IGFjdGl2ZVN0YXJ0RGF0ZTogYWN0aXZlU3RhcnREYXRlLCBkYXRlOiBkYXRlIH0pLCBkYXRlLmdldFRpbWUoKSkpO1xuICAgICAgICB9LCBzdGFydDogc3RhcnQsIHZhbHVlOiB2YWx1ZSwgdmFsdWVUeXBlOiB2YWx1ZVR5cGUgfSkpO1xufVxuIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgTW9udGhzIGZyb20gJy4vWWVhclZpZXcvTW9udGhzLmpzJztcbi8qKlxuICogRGlzcGxheXMgYSBnaXZlbiB5ZWFyLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBZZWFyVmlldyhwcm9wcykge1xuICAgIGZ1bmN0aW9uIHJlbmRlck1vbnRocygpIHtcbiAgICAgICAgcmV0dXJuIF9qc3goTW9udGhzLCBfX2Fzc2lnbih7fSwgcHJvcHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVhY3QtY2FsZW5kYXJfX3llYXItdmlld1wiLCBjaGlsZHJlbjogcmVuZGVyTW9udGhzKCkgfSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldERheVN0YXJ0LCBnZXREYXlFbmQgfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IFRpbGUgZnJvbSAnLi4vVGlsZS5qcyc7XG5pbXBvcnQgeyBpc1dlZWtlbmQgfSBmcm9tICcuLi9zaGFyZWQvZGF0ZXMuanMnO1xuaW1wb3J0IHsgZm9ybWF0RGF5IGFzIGRlZmF1bHRGb3JtYXREYXksIGZvcm1hdExvbmdEYXRlIGFzIGRlZmF1bHRGb3JtYXRMb25nRGF0ZSwgfSBmcm9tICcuLi9zaGFyZWQvZGF0ZUZvcm1hdHRlci5qcyc7XG52YXIgY2xhc3NOYW1lID0gJ3JlYWN0LWNhbGVuZGFyX19tb250aC12aWV3X19kYXlzX19kYXknO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGF5KF9hKSB7XG4gICAgdmFyIGNhbGVuZGFyVHlwZSA9IF9hLmNhbGVuZGFyVHlwZSwgX2IgPSBfYS5jbGFzc2VzLCBjbGFzc2VzID0gX2IgPT09IHZvaWQgMCA/IFtdIDogX2IsIGN1cnJlbnRNb250aEluZGV4ID0gX2EuY3VycmVudE1vbnRoSW5kZXgsIF9jID0gX2EuZm9ybWF0RGF5LCBmb3JtYXREYXkgPSBfYyA9PT0gdm9pZCAwID8gZGVmYXVsdEZvcm1hdERheSA6IF9jLCBfZCA9IF9hLmZvcm1hdExvbmdEYXRlLCBmb3JtYXRMb25nRGF0ZSA9IF9kID09PSB2b2lkIDAgPyBkZWZhdWx0Rm9ybWF0TG9uZ0RhdGUgOiBfZCwgb3RoZXJQcm9wcyA9IF9fcmVzdChfYSwgW1wiY2FsZW5kYXJUeXBlXCIsIFwiY2xhc3Nlc1wiLCBcImN1cnJlbnRNb250aEluZGV4XCIsIFwiZm9ybWF0RGF5XCIsIFwiZm9ybWF0TG9uZ0RhdGVcIl0pO1xuICAgIHZhciBkYXRlID0gb3RoZXJQcm9wcy5kYXRlLCBsb2NhbGUgPSBvdGhlclByb3BzLmxvY2FsZTtcbiAgICB2YXIgY2xhc3Nlc1Byb3BzID0gW107XG4gICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgY2xhc3Nlc1Byb3BzLnB1c2guYXBwbHkoY2xhc3Nlc1Byb3BzLCBjbGFzc2VzKTtcbiAgICB9XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICBjbGFzc2VzUHJvcHMucHVzaChjbGFzc05hbWUpO1xuICAgIH1cbiAgICBpZiAoaXNXZWVrZW5kKGRhdGUsIGNhbGVuZGFyVHlwZSkpIHtcbiAgICAgICAgY2xhc3Nlc1Byb3BzLnB1c2goXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIi0td2Vla2VuZFwiKSk7XG4gICAgfVxuICAgIGlmIChkYXRlLmdldE1vbnRoKCkgIT09IGN1cnJlbnRNb250aEluZGV4KSB7XG4gICAgICAgIGNsYXNzZXNQcm9wcy5wdXNoKFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCItLW5laWdoYm9yaW5nTW9udGhcIikpO1xuICAgIH1cbiAgICByZXR1cm4gKF9qc3goVGlsZSwgX19hc3NpZ24oe30sIG90aGVyUHJvcHMsIHsgY2xhc3NlczogY2xhc3Nlc1Byb3BzLCBmb3JtYXRBYmJyOiBmb3JtYXRMb25nRGF0ZSwgbWF4RGF0ZVRyYW5zZm9ybTogZ2V0RGF5RW5kLCBtaW5EYXRlVHJhbnNmb3JtOiBnZXREYXlTdGFydCwgdmlldzogXCJtb250aFwiLCBjaGlsZHJlbjogZm9ybWF0RGF5KGxvY2FsZSwgZGF0ZSkgfSkpKTtcbn1cbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgZ2V0WWVhciwgZ2V0TW9udGgsIGdldERheXNJbk1vbnRoLCBnZXREYXlTdGFydCB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5pbXBvcnQgVGlsZUdyb3VwIGZyb20gJy4uL1RpbGVHcm91cC5qcyc7XG5pbXBvcnQgRGF5IGZyb20gJy4vRGF5LmpzJztcbmltcG9ydCB7IGdldERheU9mV2VlayB9IGZyb20gJy4uL3NoYXJlZC9kYXRlcy5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXlzKHByb3BzKSB7XG4gICAgdmFyIGFjdGl2ZVN0YXJ0RGF0ZSA9IHByb3BzLmFjdGl2ZVN0YXJ0RGF0ZSwgY2FsZW5kYXJUeXBlID0gcHJvcHMuY2FsZW5kYXJUeXBlLCBob3ZlciA9IHByb3BzLmhvdmVyLCBzaG93Rml4ZWROdW1iZXJPZldlZWtzID0gcHJvcHMuc2hvd0ZpeGVkTnVtYmVyT2ZXZWVrcywgc2hvd05laWdoYm9yaW5nTW9udGggPSBwcm9wcy5zaG93TmVpZ2hib3JpbmdNb250aCwgdmFsdWUgPSBwcm9wcy52YWx1ZSwgdmFsdWVUeXBlID0gcHJvcHMudmFsdWVUeXBlLCBvdGhlclByb3BzID0gX19yZXN0KHByb3BzLCBbXCJhY3RpdmVTdGFydERhdGVcIiwgXCJjYWxlbmRhclR5cGVcIiwgXCJob3ZlclwiLCBcInNob3dGaXhlZE51bWJlck9mV2Vla3NcIiwgXCJzaG93TmVpZ2hib3JpbmdNb250aFwiLCBcInZhbHVlXCIsIFwidmFsdWVUeXBlXCJdKTtcbiAgICB2YXIgeWVhciA9IGdldFllYXIoYWN0aXZlU3RhcnREYXRlKTtcbiAgICB2YXIgbW9udGhJbmRleCA9IGdldE1vbnRoKGFjdGl2ZVN0YXJ0RGF0ZSk7XG4gICAgdmFyIGhhc0ZpeGVkTnVtYmVyT2ZXZWVrcyA9IHNob3dGaXhlZE51bWJlck9mV2Vla3MgfHwgc2hvd05laWdoYm9yaW5nTW9udGg7XG4gICAgdmFyIGRheU9mV2VlayA9IGdldERheU9mV2VlayhhY3RpdmVTdGFydERhdGUsIGNhbGVuZGFyVHlwZSk7XG4gICAgdmFyIG9mZnNldCA9IGhhc0ZpeGVkTnVtYmVyT2ZXZWVrcyA/IDAgOiBkYXlPZldlZWs7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBvbiB3aGljaCBkYXkgb2YgdGhlIG1vbnRoIHRoZSBncmlkIHNoYWxsIHN0YXJ0LiBJZiB3ZSBzaW1wbHkgc2hvdyBjdXJyZW50XG4gICAgICogbW9udGgsIHdlIG9idmlvdXNseSBzdGFydCBvbiBkYXkgb25lLCBidXQgaWYgc2hvd05laWdoYm9yaW5nTW9udGggaXMgc2V0IHRvXG4gICAgICogdHJ1ZSwgd2UgbmVlZCB0byBmaW5kIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHdlZWsgdGhlIGZpcnN0IGRheSBvZiB0aGUgbW9udGggaXMgaW4uXG4gICAgICovXG4gICAgdmFyIHN0YXJ0ID0gKGhhc0ZpeGVkTnVtYmVyT2ZXZWVrcyA/IC1kYXlPZldlZWsgOiAwKSArIDE7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBvbiB3aGljaCBkYXkgb2YgdGhlIG1vbnRoIHRoZSBncmlkIHNoYWxsIGVuZC4gSWYgd2Ugc2ltcGx5IHNob3cgY3VycmVudFxuICAgICAqIG1vbnRoLCB3ZSBuZWVkIHRvIHN0b3Agb24gdGhlIGxhc3QgZGF5IG9mIHRoZSBtb250aCwgYnV0IGlmIHNob3dOZWlnaGJvcmluZ01vbnRoXG4gICAgICogaXMgc2V0IHRvIHRydWUsIHdlIG5lZWQgdG8gZmluZCB0aGUgZW5kIG9mIHRoZSB3ZWVrIHRoZSBsYXN0IGRheSBvZiB0aGUgbW9udGggaXMgaW4uXG4gICAgICovXG4gICAgdmFyIGVuZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzaG93Rml4ZWROdW1iZXJPZldlZWtzKSB7XG4gICAgICAgICAgICAvLyBBbHdheXMgc2hvdyA2IHdlZWtzXG4gICAgICAgICAgICByZXR1cm4gc3RhcnQgKyA2ICogNyAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGgoYWN0aXZlU3RhcnREYXRlKTtcbiAgICAgICAgaWYgKHNob3dOZWlnaGJvcmluZ01vbnRoKSB7XG4gICAgICAgICAgICB2YXIgYWN0aXZlRW5kRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBhY3RpdmVFbmREYXRlLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoSW5kZXgsIGRheXNJbk1vbnRoKTtcbiAgICAgICAgICAgIGFjdGl2ZUVuZERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICB2YXIgZGF5c1VudGlsRW5kT2ZUaGVXZWVrID0gNyAtIGdldERheU9mV2VlayhhY3RpdmVFbmREYXRlLCBjYWxlbmRhclR5cGUpIC0gMTtcbiAgICAgICAgICAgIHJldHVybiBkYXlzSW5Nb250aCArIGRheXNVbnRpbEVuZE9mVGhlV2VlaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF5c0luTW9udGg7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gKF9qc3goVGlsZUdyb3VwLCB7IGNsYXNzTmFtZTogXCJyZWFjdC1jYWxlbmRhcl9fbW9udGgtdmlld19fZGF5c1wiLCBjb3VudDogNywgZGF0ZVRyYW5zZm9ybTogZnVuY3Rpb24gKGRheSkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcih5ZWFyLCBtb250aEluZGV4LCBkYXkpO1xuICAgICAgICAgICAgcmV0dXJuIGdldERheVN0YXJ0KGRhdGUpO1xuICAgICAgICB9LCBkYXRlVHlwZTogXCJkYXlcIiwgaG92ZXI6IGhvdmVyLCBlbmQ6IGVuZCwgcmVuZGVyVGlsZTogZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IF9hLmRhdGUsIG90aGVyVGlsZVByb3BzID0gX19yZXN0KF9hLCBbXCJkYXRlXCJdKTtcbiAgICAgICAgICAgIHJldHVybiAoX2pzeChEYXksIF9fYXNzaWduKHt9LCBvdGhlclByb3BzLCBvdGhlclRpbGVQcm9wcywgeyBhY3RpdmVTdGFydERhdGU6IGFjdGl2ZVN0YXJ0RGF0ZSwgY2FsZW5kYXJUeXBlOiBjYWxlbmRhclR5cGUsIGN1cnJlbnRNb250aEluZGV4OiBtb250aEluZGV4LCBkYXRlOiBkYXRlIH0pLCBkYXRlLmdldFRpbWUoKSkpO1xuICAgICAgICB9LCBvZmZzZXQ6IG9mZnNldCwgc3RhcnQ6IHN0YXJ0LCB2YWx1ZTogdmFsdWUsIHZhbHVlVHlwZTogdmFsdWVUeXBlIH0pKTtcbn1cbiIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmltcG9ydCB7IGdldFllYXIsIGdldE1vbnRoLCBnZXRNb250aFN0YXJ0IH0gZnJvbSAnQHdvanRla21hai9kYXRlLXV0aWxzJztcbmltcG9ydCBGbGV4IGZyb20gJy4uL0ZsZXguanMnO1xuaW1wb3J0IHsgZ2V0RGF5T2ZXZWVrLCBpc0N1cnJlbnREYXlPZldlZWssIGlzV2Vla2VuZCB9IGZyb20gJy4uL3NoYXJlZC9kYXRlcy5qcyc7XG5pbXBvcnQgeyBmb3JtYXRTaG9ydFdlZWtkYXkgYXMgZGVmYXVsdEZvcm1hdFNob3J0V2Vla2RheSwgZm9ybWF0V2Vla2RheSBhcyBkZWZhdWx0Rm9ybWF0V2Vla2RheSwgfSBmcm9tICcuLi9zaGFyZWQvZGF0ZUZvcm1hdHRlci5qcyc7XG52YXIgY2xhc3NOYW1lID0gJ3JlYWN0LWNhbGVuZGFyX19tb250aC12aWV3X193ZWVrZGF5cyc7XG52YXIgd2Vla2RheUNsYXNzTmFtZSA9IFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJfX3dlZWtkYXlcIik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXZWVrZGF5cyhwcm9wcykge1xuICAgIHZhciBjYWxlbmRhclR5cGUgPSBwcm9wcy5jYWxlbmRhclR5cGUsIF9hID0gcHJvcHMuZm9ybWF0U2hvcnRXZWVrZGF5LCBmb3JtYXRTaG9ydFdlZWtkYXkgPSBfYSA9PT0gdm9pZCAwID8gZGVmYXVsdEZvcm1hdFNob3J0V2Vla2RheSA6IF9hLCBfYiA9IHByb3BzLmZvcm1hdFdlZWtkYXksIGZvcm1hdFdlZWtkYXkgPSBfYiA9PT0gdm9pZCAwID8gZGVmYXVsdEZvcm1hdFdlZWtkYXkgOiBfYiwgbG9jYWxlID0gcHJvcHMubG9jYWxlLCBvbk1vdXNlTGVhdmUgPSBwcm9wcy5vbk1vdXNlTGVhdmU7XG4gICAgdmFyIGFueURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBiZWdpbk9mTW9udGggPSBnZXRNb250aFN0YXJ0KGFueURhdGUpO1xuICAgIHZhciB5ZWFyID0gZ2V0WWVhcihiZWdpbk9mTW9udGgpO1xuICAgIHZhciBtb250aEluZGV4ID0gZ2V0TW9udGgoYmVnaW5PZk1vbnRoKTtcbiAgICB2YXIgd2Vla2RheXMgPSBbXTtcbiAgICBmb3IgKHZhciB3ZWVrZGF5ID0gMTsgd2Vla2RheSA8PSA3OyB3ZWVrZGF5ICs9IDEpIHtcbiAgICAgICAgdmFyIHdlZWtkYXlEYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGhJbmRleCwgd2Vla2RheSAtIGdldERheU9mV2VlayhiZWdpbk9mTW9udGgsIGNhbGVuZGFyVHlwZSkpO1xuICAgICAgICB2YXIgYWJiciA9IGZvcm1hdFdlZWtkYXkobG9jYWxlLCB3ZWVrZGF5RGF0ZSk7XG4gICAgICAgIHdlZWtkYXlzLnB1c2goX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xzeCh3ZWVrZGF5Q2xhc3NOYW1lLCBpc0N1cnJlbnREYXlPZldlZWsod2Vla2RheURhdGUpICYmIFwiXCIuY29uY2F0KHdlZWtkYXlDbGFzc05hbWUsIFwiLS1jdXJyZW50XCIpLCBpc1dlZWtlbmQod2Vla2RheURhdGUsIGNhbGVuZGFyVHlwZSkgJiYgXCJcIi5jb25jYXQod2Vla2RheUNsYXNzTmFtZSwgXCItLXdlZWtlbmRcIikpLCBjaGlsZHJlbjogX2pzeChcImFiYnJcIiwgeyBcImFyaWEtbGFiZWxcIjogYWJiciwgdGl0bGU6IGFiYnIsIGNoaWxkcmVuOiBmb3JtYXRTaG9ydFdlZWtkYXkobG9jYWxlLCB3ZWVrZGF5RGF0ZSkucmVwbGFjZSgnLicsICcnKSB9KSB9LCB3ZWVrZGF5KSk7XG4gICAgfVxuICAgIHJldHVybiAoX2pzeChGbGV4LCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBjb3VudDogNywgb25Gb2N1czogb25Nb3VzZUxlYXZlLCBvbk1vdXNlT3Zlcjogb25Nb3VzZUxlYXZlLCBjaGlsZHJlbjogd2Vla2RheXMgfSkpO1xufVxuIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgY2xhc3NOYW1lID0gJ3JlYWN0LWNhbGVuZGFyX190aWxlJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdlZWtOdW1iZXIocHJvcHMpIHtcbiAgICB2YXIgb25DbGlja1dlZWtOdW1iZXIgPSBwcm9wcy5vbkNsaWNrV2Vla051bWJlciwgd2Vla051bWJlciA9IHByb3BzLndlZWtOdW1iZXI7XG4gICAgdmFyIGNoaWxkcmVuID0gX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogd2Vla051bWJlciB9KTtcbiAgICBpZiAob25DbGlja1dlZWtOdW1iZXIpIHtcbiAgICAgICAgdmFyIGRhdGVfMSA9IHByb3BzLmRhdGUsIG9uQ2xpY2tXZWVrTnVtYmVyXzEgPSBwcm9wcy5vbkNsaWNrV2Vla051bWJlciwgd2Vla051bWJlcl8xID0gcHJvcHMud2Vla051bWJlciwgb3RoZXJQcm9wcyA9IF9fcmVzdChwcm9wcywgW1wiZGF0ZVwiLCBcIm9uQ2xpY2tXZWVrTnVtYmVyXCIsIFwid2Vla051bWJlclwiXSk7XG4gICAgICAgIHJldHVybiAoX2pzeChcImJ1dHRvblwiLCBfX2Fzc2lnbih7fSwgb3RoZXJQcm9wcywgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgb25DbGljazogZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBvbkNsaWNrV2Vla051bWJlcl8xKHdlZWtOdW1iZXJfMSwgZGF0ZV8xLCBldmVudCk7IH0sIHR5cGU6IFwiYnV0dG9uXCIsIGNoaWxkcmVuOiBjaGlsZHJlbiB9KSkpO1xuICAgICAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdHlsZS9ub1VzZWxlc3NFbHNlOiBUeXBlU2NyaXB0IGlzIHVuaGFwcHkgaWYgd2UgcmVtb3ZlIHRoaXMgZWxzZVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGRhdGUgPSBwcm9wcy5kYXRlLCBvbkNsaWNrV2Vla051bWJlcl8yID0gcHJvcHMub25DbGlja1dlZWtOdW1iZXIsIHdlZWtOdW1iZXJfMiA9IHByb3BzLndlZWtOdW1iZXIsIG90aGVyUHJvcHMgPSBfX3Jlc3QocHJvcHMsIFtcImRhdGVcIiwgXCJvbkNsaWNrV2Vla051bWJlclwiLCBcIndlZWtOdW1iZXJcIl0pO1xuICAgICAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgX19hc3NpZ24oe30sIG90aGVyUHJvcHMsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIGNoaWxkcmVuOiBjaGlsZHJlbiB9KSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBnZXRZZWFyLCBnZXRNb250aCwgZ2V0RGF0ZSwgZ2V0RGF5c0luTW9udGggfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IFdlZWtOdW1iZXIgZnJvbSAnLi9XZWVrTnVtYmVyLmpzJztcbmltcG9ydCBGbGV4IGZyb20gJy4uL0ZsZXguanMnO1xuaW1wb3J0IHsgZ2V0QmVnaW5PZldlZWssIGdldERheU9mV2VlaywgZ2V0V2Vla051bWJlciB9IGZyb20gJy4uL3NoYXJlZC9kYXRlcy5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXZWVrTnVtYmVycyhwcm9wcykge1xuICAgIHZhciBhY3RpdmVTdGFydERhdGUgPSBwcm9wcy5hY3RpdmVTdGFydERhdGUsIGNhbGVuZGFyVHlwZSA9IHByb3BzLmNhbGVuZGFyVHlwZSwgb25DbGlja1dlZWtOdW1iZXIgPSBwcm9wcy5vbkNsaWNrV2Vla051bWJlciwgb25Nb3VzZUxlYXZlID0gcHJvcHMub25Nb3VzZUxlYXZlLCBzaG93Rml4ZWROdW1iZXJPZldlZWtzID0gcHJvcHMuc2hvd0ZpeGVkTnVtYmVyT2ZXZWVrcztcbiAgICB2YXIgbnVtYmVyT2ZXZWVrcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzaG93Rml4ZWROdW1iZXJPZldlZWtzKSB7XG4gICAgICAgICAgICByZXR1cm4gNjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbnVtYmVyT2ZEYXlzID0gZ2V0RGF5c0luTW9udGgoYWN0aXZlU3RhcnREYXRlKTtcbiAgICAgICAgdmFyIHN0YXJ0V2Vla2RheSA9IGdldERheU9mV2VlayhhY3RpdmVTdGFydERhdGUsIGNhbGVuZGFyVHlwZSk7XG4gICAgICAgIHZhciBkYXlzID0gbnVtYmVyT2ZEYXlzIC0gKDcgLSBzdGFydFdlZWtkYXkpO1xuICAgICAgICByZXR1cm4gMSArIE1hdGguY2VpbChkYXlzIC8gNyk7XG4gICAgfSkoKTtcbiAgICB2YXIgZGF0ZXMgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgeWVhciA9IGdldFllYXIoYWN0aXZlU3RhcnREYXRlKTtcbiAgICAgICAgdmFyIG1vbnRoSW5kZXggPSBnZXRNb250aChhY3RpdmVTdGFydERhdGUpO1xuICAgICAgICB2YXIgZGF5ID0gZ2V0RGF0ZShhY3RpdmVTdGFydERhdGUpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBudW1iZXJPZldlZWtzOyBpbmRleCArPSAxKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChnZXRCZWdpbk9mV2VlayhuZXcgRGF0ZSh5ZWFyLCBtb250aEluZGV4LCBkYXkgKyBpbmRleCAqIDcpLCBjYWxlbmRhclR5cGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pKCk7XG4gICAgdmFyIHdlZWtOdW1iZXJzID0gZGF0ZXMubWFwKGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBnZXRXZWVrTnVtYmVyKGRhdGUsIGNhbGVuZGFyVHlwZSk7IH0pO1xuICAgIHJldHVybiAoX2pzeChGbGV4LCB7IGNsYXNzTmFtZTogXCJyZWFjdC1jYWxlbmRhcl9fbW9udGgtdmlld19fd2Vla051bWJlcnNcIiwgY291bnQ6IG51bWJlck9mV2Vla3MsIGRpcmVjdGlvbjogXCJjb2x1bW5cIiwgb25Gb2N1czogb25Nb3VzZUxlYXZlLCBvbk1vdXNlT3Zlcjogb25Nb3VzZUxlYXZlLCBzdHlsZTogeyBmbGV4QmFzaXM6ICdjYWxjKDEwMCUgKiAoMSAvIDgpJywgZmxleFNocmluazogMCB9LCBjaGlsZHJlbjogd2Vla051bWJlcnMubWFwKGZ1bmN0aW9uICh3ZWVrTnVtYmVyLCB3ZWVrSW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gZGF0ZXNbd2Vla0luZGV4XTtcbiAgICAgICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZGF0ZSBpcyBub3QgZGVmaW5lZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChfanN4KFdlZWtOdW1iZXIsIHsgZGF0ZTogZGF0ZSwgb25DbGlja1dlZWtOdW1iZXI6IG9uQ2xpY2tXZWVrTnVtYmVyLCB3ZWVrTnVtYmVyOiB3ZWVrTnVtYmVyIH0sIHdlZWtOdW1iZXIpKTtcbiAgICAgICAgfSkgfSkpO1xufVxuIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmltcG9ydCBEYXlzIGZyb20gJy4vTW9udGhWaWV3L0RheXMuanMnO1xuaW1wb3J0IFdlZWtkYXlzIGZyb20gJy4vTW9udGhWaWV3L1dlZWtkYXlzLmpzJztcbmltcG9ydCBXZWVrTnVtYmVycyBmcm9tICcuL01vbnRoVmlldy9XZWVrTnVtYmVycy5qcyc7XG5pbXBvcnQgeyBDQUxFTkRBUl9UWVBFUywgQ0FMRU5EQVJfVFlQRV9MT0NBTEVTIH0gZnJvbSAnLi9zaGFyZWQvY29uc3QuanMnO1xuZnVuY3Rpb24gZ2V0Q2FsZW5kYXJUeXBlRnJvbUxvY2FsZShsb2NhbGUpIHtcbiAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3QuZW50cmllcyhDQUxFTkRBUl9UWVBFX0xPQ0FMRVMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIF9iID0gX2FbX2ldLCBjYWxlbmRhclR5cGUgPSBfYlswXSwgbG9jYWxlcyA9IF9iWzFdO1xuICAgICAgICAgICAgaWYgKGxvY2FsZXMuaW5jbHVkZXMobG9jYWxlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxlbmRhclR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIENBTEVOREFSX1RZUEVTLklTT184NjAxO1xufVxuLyoqXG4gKiBEaXNwbGF5cyBhIGdpdmVuIG1vbnRoLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNb250aFZpZXcocHJvcHMpIHtcbiAgICB2YXIgYWN0aXZlU3RhcnREYXRlID0gcHJvcHMuYWN0aXZlU3RhcnREYXRlLCBsb2NhbGUgPSBwcm9wcy5sb2NhbGUsIG9uTW91c2VMZWF2ZSA9IHByb3BzLm9uTW91c2VMZWF2ZSwgc2hvd0ZpeGVkTnVtYmVyT2ZXZWVrcyA9IHByb3BzLnNob3dGaXhlZE51bWJlck9mV2Vla3M7XG4gICAgdmFyIF9hID0gcHJvcHMuY2FsZW5kYXJUeXBlLCBjYWxlbmRhclR5cGUgPSBfYSA9PT0gdm9pZCAwID8gZ2V0Q2FsZW5kYXJUeXBlRnJvbUxvY2FsZShsb2NhbGUpIDogX2EsIGZvcm1hdFNob3J0V2Vla2RheSA9IHByb3BzLmZvcm1hdFNob3J0V2Vla2RheSwgZm9ybWF0V2Vla2RheSA9IHByb3BzLmZvcm1hdFdlZWtkYXksIG9uQ2xpY2tXZWVrTnVtYmVyID0gcHJvcHMub25DbGlja1dlZWtOdW1iZXIsIHNob3dXZWVrTnVtYmVycyA9IHByb3BzLnNob3dXZWVrTnVtYmVycywgY2hpbGRQcm9wcyA9IF9fcmVzdChwcm9wcywgW1wiY2FsZW5kYXJUeXBlXCIsIFwiZm9ybWF0U2hvcnRXZWVrZGF5XCIsIFwiZm9ybWF0V2Vla2RheVwiLCBcIm9uQ2xpY2tXZWVrTnVtYmVyXCIsIFwic2hvd1dlZWtOdW1iZXJzXCJdKTtcbiAgICBmdW5jdGlvbiByZW5kZXJXZWVrZGF5cygpIHtcbiAgICAgICAgcmV0dXJuIChfanN4KFdlZWtkYXlzLCB7IGNhbGVuZGFyVHlwZTogY2FsZW5kYXJUeXBlLCBmb3JtYXRTaG9ydFdlZWtkYXk6IGZvcm1hdFNob3J0V2Vla2RheSwgZm9ybWF0V2Vla2RheTogZm9ybWF0V2Vla2RheSwgbG9jYWxlOiBsb2NhbGUsIG9uTW91c2VMZWF2ZTogb25Nb3VzZUxlYXZlIH0pKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyV2Vla051bWJlcnMoKSB7XG4gICAgICAgIGlmICghc2hvd1dlZWtOdW1iZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKF9qc3goV2Vla051bWJlcnMsIHsgYWN0aXZlU3RhcnREYXRlOiBhY3RpdmVTdGFydERhdGUsIGNhbGVuZGFyVHlwZTogY2FsZW5kYXJUeXBlLCBvbkNsaWNrV2Vla051bWJlcjogb25DbGlja1dlZWtOdW1iZXIsIG9uTW91c2VMZWF2ZTogb25Nb3VzZUxlYXZlLCBzaG93Rml4ZWROdW1iZXJPZldlZWtzOiBzaG93Rml4ZWROdW1iZXJPZldlZWtzIH0pKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyRGF5cygpIHtcbiAgICAgICAgcmV0dXJuIF9qc3goRGF5cywgX19hc3NpZ24oeyBjYWxlbmRhclR5cGU6IGNhbGVuZGFyVHlwZSB9LCBjaGlsZFByb3BzKSk7XG4gICAgfVxuICAgIHZhciBjbGFzc05hbWUgPSAncmVhY3QtY2FsZW5kYXJfX21vbnRoLXZpZXcnO1xuICAgIHJldHVybiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xzeChjbGFzc05hbWUsIHNob3dXZWVrTnVtYmVycyA/IFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCItLXdlZWtOdW1iZXJzXCIpIDogJycpLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLFxuICAgICAgICAgICAgfSwgY2hpbGRyZW46IFtyZW5kZXJXZWVrTnVtYmVycygpLCBfanN4cyhcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4R3JvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgIH0sIGNoaWxkcmVuOiBbcmVuZGVyV2Vla2RheXMoKSwgcmVuZGVyRGF5cygpXSB9KV0gfSkgfSkpO1xufVxuIiwiJ3VzZSBjbGllbnQnO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBmb3J3YXJkUmVmLCB1c2VDYWxsYmFjaywgdXNlSW1wZXJhdGl2ZUhhbmRsZSwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmltcG9ydCBOYXZpZ2F0aW9uIGZyb20gJy4vQ2FsZW5kYXIvTmF2aWdhdGlvbi5qcyc7XG5pbXBvcnQgQ2VudHVyeVZpZXcgZnJvbSAnLi9DZW50dXJ5Vmlldy5qcyc7XG5pbXBvcnQgRGVjYWRlVmlldyBmcm9tICcuL0RlY2FkZVZpZXcuanMnO1xuaW1wb3J0IFllYXJWaWV3IGZyb20gJy4vWWVhclZpZXcuanMnO1xuaW1wb3J0IE1vbnRoVmlldyBmcm9tICcuL01vbnRoVmlldy5qcyc7XG5pbXBvcnQgeyBnZXRCZWdpbiwgZ2V0QmVnaW5OZXh0LCBnZXRFbmQsIGdldFZhbHVlUmFuZ2UgfSBmcm9tICcuL3NoYXJlZC9kYXRlcy5qcyc7XG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi9zaGFyZWQvdXRpbHMuanMnO1xudmFyIGJhc2VDbGFzc05hbWUgPSAncmVhY3QtY2FsZW5kYXInO1xudmFyIGFsbFZpZXdzID0gWydjZW50dXJ5JywgJ2RlY2FkZScsICd5ZWFyJywgJ21vbnRoJ107XG52YXIgYWxsVmFsdWVUeXBlcyA9IFsnZGVjYWRlJywgJ3llYXInLCAnbW9udGgnLCAnZGF5J107XG52YXIgZGVmYXVsdE1pbkRhdGUgPSBuZXcgRGF0ZSgpO1xuZGVmYXVsdE1pbkRhdGUuc2V0RnVsbFllYXIoMSwgMCwgMSk7XG5kZWZhdWx0TWluRGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbnZhciBkZWZhdWx0TWF4RGF0ZSA9IG5ldyBEYXRlKDguNjRlMTUpO1xuZnVuY3Rpb24gdG9EYXRlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XG59XG4vKipcbiAqIFJldHVybnMgdmlld3MgYXJyYXkgd2l0aCBkaXNhbGxvd2VkIHZhbHVlcyBjdXQgb2ZmLlxuICovXG5mdW5jdGlvbiBnZXRMaW1pdGVkVmlld3MobWluRGV0YWlsLCBtYXhEZXRhaWwpIHtcbiAgICByZXR1cm4gYWxsVmlld3Muc2xpY2UoYWxsVmlld3MuaW5kZXhPZihtaW5EZXRhaWwpLCBhbGxWaWV3cy5pbmRleE9mKG1heERldGFpbCkgKyAxKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgZ2l2ZW4gdmlldyBpcyBhbGxvd2VkIHdpdGggY3VycmVudGx5IGFwcGxpZWQgc2V0dGluZ3MuXG4gKi9cbmZ1bmN0aW9uIGlzVmlld0FsbG93ZWQodmlldywgbWluRGV0YWlsLCBtYXhEZXRhaWwpIHtcbiAgICB2YXIgdmlld3MgPSBnZXRMaW1pdGVkVmlld3MobWluRGV0YWlsLCBtYXhEZXRhaWwpO1xuICAgIHJldHVybiB2aWV3cy5pbmRleE9mKHZpZXcpICE9PSAtMTtcbn1cbi8qKlxuICogR2V0cyBlaXRoZXIgcHJvdmlkZWQgdmlldyBpZiBhbGxvd2VkIGJ5IG1pbkRldGFpbCBhbmQgbWF4RGV0YWlsLCBvciBnZXRzXG4gKiB0aGUgZGVmYXVsdCB2aWV3IGlmIG5vdCBhbGxvd2VkLlxuICovXG5mdW5jdGlvbiBnZXRWaWV3KHZpZXcsIG1pbkRldGFpbCwgbWF4RGV0YWlsKSB7XG4gICAgaWYgKCF2aWV3KSB7XG4gICAgICAgIHJldHVybiBtYXhEZXRhaWw7XG4gICAgfVxuICAgIGlmIChpc1ZpZXdBbGxvd2VkKHZpZXcsIG1pbkRldGFpbCwgbWF4RGV0YWlsKSkge1xuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG4gICAgcmV0dXJuIG1heERldGFpbDtcbn1cbi8qKlxuICogUmV0dXJucyB2YWx1ZSB0eXBlIHRoYXQgY2FuIGJlIHJldHVybmVkIHdpdGggY3VycmVudGx5IGFwcGxpZWQgc2V0dGluZ3MuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlVHlwZSh2aWV3KSB7XG4gICAgdmFyIGluZGV4ID0gYWxsVmlld3MuaW5kZXhPZih2aWV3KTtcbiAgICByZXR1cm4gYWxsVmFsdWVUeXBlc1tpbmRleF07XG59XG5mdW5jdGlvbiBnZXRWYWx1ZSh2YWx1ZSwgaW5kZXgpIHtcbiAgICB2YXIgcmF3VmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlW2luZGV4XSA6IHZhbHVlO1xuICAgIGlmICghcmF3VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciB2YWx1ZURhdGUgPSB0b0RhdGUocmF3VmFsdWUpO1xuICAgIGlmIChOdW1iZXIuaXNOYU4odmFsdWVEYXRlLmdldFRpbWUoKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlOiBcIi5jb25jYXQodmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlRGF0ZTtcbn1cbmZ1bmN0aW9uIGdldERldGFpbFZhbHVlKF9hLCBpbmRleCkge1xuICAgIHZhciB2YWx1ZSA9IF9hLnZhbHVlLCBtaW5EYXRlID0gX2EubWluRGF0ZSwgbWF4RGF0ZSA9IF9hLm1heERhdGUsIG1heERldGFpbCA9IF9hLm1heERldGFpbDtcbiAgICB2YXIgdmFsdWVQaWVjZSA9IGdldFZhbHVlKHZhbHVlLCBpbmRleCk7XG4gICAgaWYgKCF2YWx1ZVBpZWNlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgdmFsdWVUeXBlID0gZ2V0VmFsdWVUeXBlKG1heERldGFpbCk7XG4gICAgdmFyIGRldGFpbFZhbHVlRnJvbSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QmVnaW4odmFsdWVUeXBlLCB2YWx1ZVBpZWNlKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RW5kKHZhbHVlVHlwZSwgdmFsdWVQaWVjZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5kZXggdmFsdWU6IFwiLmNvbmNhdChpbmRleCkpO1xuICAgICAgICB9XG4gICAgfSkoKTtcbiAgICByZXR1cm4gYmV0d2VlbihkZXRhaWxWYWx1ZUZyb20sIG1pbkRhdGUsIG1heERhdGUpO1xufVxudmFyIGdldERldGFpbFZhbHVlRnJvbSA9IGZ1bmN0aW9uIChhcmdzKSB7IHJldHVybiBnZXREZXRhaWxWYWx1ZShhcmdzLCAwKTsgfTtcbnZhciBnZXREZXRhaWxWYWx1ZVRvID0gZnVuY3Rpb24gKGFyZ3MpIHsgcmV0dXJuIGdldERldGFpbFZhbHVlKGFyZ3MsIDEpOyB9O1xudmFyIGdldERldGFpbFZhbHVlQXJyYXkgPSBmdW5jdGlvbiAoYXJncykge1xuICAgIHJldHVybiBbZ2V0RGV0YWlsVmFsdWVGcm9tLCBnZXREZXRhaWxWYWx1ZVRvXS5tYXAoZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbihhcmdzKTsgfSk7XG59O1xuZnVuY3Rpb24gZ2V0QWN0aXZlU3RhcnREYXRlKF9hKSB7XG4gICAgdmFyIG1heERhdGUgPSBfYS5tYXhEYXRlLCBtYXhEZXRhaWwgPSBfYS5tYXhEZXRhaWwsIG1pbkRhdGUgPSBfYS5taW5EYXRlLCBtaW5EZXRhaWwgPSBfYS5taW5EZXRhaWwsIHZhbHVlID0gX2EudmFsdWUsIHZpZXcgPSBfYS52aWV3O1xuICAgIHZhciByYW5nZVR5cGUgPSBnZXRWaWV3KHZpZXcsIG1pbkRldGFpbCwgbWF4RGV0YWlsKTtcbiAgICB2YXIgdmFsdWVGcm9tID0gZ2V0RGV0YWlsVmFsdWVGcm9tKHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBtaW5EYXRlOiBtaW5EYXRlLFxuICAgICAgICBtYXhEYXRlOiBtYXhEYXRlLFxuICAgICAgICBtYXhEZXRhaWw6IG1heERldGFpbCxcbiAgICB9KSB8fCBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiBnZXRCZWdpbihyYW5nZVR5cGUsIHZhbHVlRnJvbSk7XG59XG5mdW5jdGlvbiBnZXRJbml0aWFsQWN0aXZlU3RhcnREYXRlKF9hKSB7XG4gICAgdmFyIGFjdGl2ZVN0YXJ0RGF0ZSA9IF9hLmFjdGl2ZVN0YXJ0RGF0ZSwgZGVmYXVsdEFjdGl2ZVN0YXJ0RGF0ZSA9IF9hLmRlZmF1bHRBY3RpdmVTdGFydERhdGUsIGRlZmF1bHRWYWx1ZSA9IF9hLmRlZmF1bHRWYWx1ZSwgZGVmYXVsdFZpZXcgPSBfYS5kZWZhdWx0VmlldywgbWF4RGF0ZSA9IF9hLm1heERhdGUsIG1heERldGFpbCA9IF9hLm1heERldGFpbCwgbWluRGF0ZSA9IF9hLm1pbkRhdGUsIG1pbkRldGFpbCA9IF9hLm1pbkRldGFpbCwgdmFsdWUgPSBfYS52YWx1ZSwgdmlldyA9IF9hLnZpZXc7XG4gICAgdmFyIHJhbmdlVHlwZSA9IGdldFZpZXcodmlldywgbWluRGV0YWlsLCBtYXhEZXRhaWwpO1xuICAgIHZhciB2YWx1ZUZyb20gPSBhY3RpdmVTdGFydERhdGUgfHwgZGVmYXVsdEFjdGl2ZVN0YXJ0RGF0ZTtcbiAgICBpZiAodmFsdWVGcm9tKSB7XG4gICAgICAgIHJldHVybiBnZXRCZWdpbihyYW5nZVR5cGUsIHZhbHVlRnJvbSk7XG4gICAgfVxuICAgIHJldHVybiBnZXRBY3RpdmVTdGFydERhdGUoe1xuICAgICAgICBtYXhEYXRlOiBtYXhEYXRlLFxuICAgICAgICBtYXhEZXRhaWw6IG1heERldGFpbCxcbiAgICAgICAgbWluRGF0ZTogbWluRGF0ZSxcbiAgICAgICAgbWluRGV0YWlsOiBtaW5EZXRhaWwsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSB8fCBkZWZhdWx0VmFsdWUsXG4gICAgICAgIHZpZXc6IHZpZXcgfHwgZGVmYXVsdFZpZXcsXG4gICAgfSk7XG59XG5mdW5jdGlvbiBnZXRJc1NpbmdsZVZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoID09PSAxKTtcbn1cbmZ1bmN0aW9uIGFyZURhdGVzRXF1YWwoZGF0ZTEsIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRhdGUxIGluc3RhbmNlb2YgRGF0ZSAmJiBkYXRlMiBpbnN0YW5jZW9mIERhdGUgJiYgZGF0ZTEuZ2V0VGltZSgpID09PSBkYXRlMi5nZXRUaW1lKCk7XG59XG52YXIgQ2FsZW5kYXIgPSBmb3J3YXJkUmVmKGZ1bmN0aW9uIENhbGVuZGFyKHByb3BzLCByZWYpIHtcbiAgICB2YXIgYWN0aXZlU3RhcnREYXRlUHJvcHMgPSBwcm9wcy5hY3RpdmVTdGFydERhdGUsIGFsbG93UGFydGlhbFJhbmdlID0gcHJvcHMuYWxsb3dQYXJ0aWFsUmFuZ2UsIGNhbGVuZGFyVHlwZSA9IHByb3BzLmNhbGVuZGFyVHlwZSwgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLCBkZWZhdWx0QWN0aXZlU3RhcnREYXRlID0gcHJvcHMuZGVmYXVsdEFjdGl2ZVN0YXJ0RGF0ZSwgZGVmYXVsdFZhbHVlID0gcHJvcHMuZGVmYXVsdFZhbHVlLCBkZWZhdWx0VmlldyA9IHByb3BzLmRlZmF1bHRWaWV3LCBmb3JtYXREYXkgPSBwcm9wcy5mb3JtYXREYXksIGZvcm1hdExvbmdEYXRlID0gcHJvcHMuZm9ybWF0TG9uZ0RhdGUsIGZvcm1hdE1vbnRoID0gcHJvcHMuZm9ybWF0TW9udGgsIGZvcm1hdE1vbnRoWWVhciA9IHByb3BzLmZvcm1hdE1vbnRoWWVhciwgZm9ybWF0U2hvcnRXZWVrZGF5ID0gcHJvcHMuZm9ybWF0U2hvcnRXZWVrZGF5LCBmb3JtYXRXZWVrZGF5ID0gcHJvcHMuZm9ybWF0V2Vla2RheSwgZm9ybWF0WWVhciA9IHByb3BzLmZvcm1hdFllYXIsIF9hID0gcHJvcHMuZ29Ub1JhbmdlU3RhcnRPblNlbGVjdCwgZ29Ub1JhbmdlU3RhcnRPblNlbGVjdCA9IF9hID09PSB2b2lkIDAgPyB0cnVlIDogX2EsIGlucHV0UmVmID0gcHJvcHMuaW5wdXRSZWYsIGxvY2FsZSA9IHByb3BzLmxvY2FsZSwgX2IgPSBwcm9wcy5tYXhEYXRlLCBtYXhEYXRlID0gX2IgPT09IHZvaWQgMCA/IGRlZmF1bHRNYXhEYXRlIDogX2IsIF9jID0gcHJvcHMubWF4RGV0YWlsLCBtYXhEZXRhaWwgPSBfYyA9PT0gdm9pZCAwID8gJ21vbnRoJyA6IF9jLCBfZCA9IHByb3BzLm1pbkRhdGUsIG1pbkRhdGUgPSBfZCA9PT0gdm9pZCAwID8gZGVmYXVsdE1pbkRhdGUgOiBfZCwgX2UgPSBwcm9wcy5taW5EZXRhaWwsIG1pbkRldGFpbCA9IF9lID09PSB2b2lkIDAgPyAnY2VudHVyeScgOiBfZSwgbmF2aWdhdGlvbkFyaWFMYWJlbCA9IHByb3BzLm5hdmlnYXRpb25BcmlhTGFiZWwsIG5hdmlnYXRpb25BcmlhTGl2ZSA9IHByb3BzLm5hdmlnYXRpb25BcmlhTGl2ZSwgbmF2aWdhdGlvbkxhYmVsID0gcHJvcHMubmF2aWdhdGlvbkxhYmVsLCBuZXh0MkFyaWFMYWJlbCA9IHByb3BzLm5leHQyQXJpYUxhYmVsLCBuZXh0MkxhYmVsID0gcHJvcHMubmV4dDJMYWJlbCwgbmV4dEFyaWFMYWJlbCA9IHByb3BzLm5leHRBcmlhTGFiZWwsIG5leHRMYWJlbCA9IHByb3BzLm5leHRMYWJlbCwgb25BY3RpdmVTdGFydERhdGVDaGFuZ2UgPSBwcm9wcy5vbkFjdGl2ZVN0YXJ0RGF0ZUNoYW5nZSwgb25DaGFuZ2VQcm9wcyA9IHByb3BzLm9uQ2hhbmdlLCBvbkNsaWNrRGF5ID0gcHJvcHMub25DbGlja0RheSwgb25DbGlja0RlY2FkZSA9IHByb3BzLm9uQ2xpY2tEZWNhZGUsIG9uQ2xpY2tNb250aCA9IHByb3BzLm9uQ2xpY2tNb250aCwgb25DbGlja1dlZWtOdW1iZXIgPSBwcm9wcy5vbkNsaWNrV2Vla051bWJlciwgb25DbGlja1llYXIgPSBwcm9wcy5vbkNsaWNrWWVhciwgb25EcmlsbERvd24gPSBwcm9wcy5vbkRyaWxsRG93biwgb25EcmlsbFVwID0gcHJvcHMub25EcmlsbFVwLCBvblZpZXdDaGFuZ2UgPSBwcm9wcy5vblZpZXdDaGFuZ2UsIHByZXYyQXJpYUxhYmVsID0gcHJvcHMucHJldjJBcmlhTGFiZWwsIHByZXYyTGFiZWwgPSBwcm9wcy5wcmV2MkxhYmVsLCBwcmV2QXJpYUxhYmVsID0gcHJvcHMucHJldkFyaWFMYWJlbCwgcHJldkxhYmVsID0gcHJvcHMucHJldkxhYmVsLCBfZiA9IHByb3BzLnJldHVyblZhbHVlLCByZXR1cm5WYWx1ZSA9IF9mID09PSB2b2lkIDAgPyAnc3RhcnQnIDogX2YsIHNlbGVjdFJhbmdlID0gcHJvcHMuc2VsZWN0UmFuZ2UsIHNob3dEb3VibGVWaWV3ID0gcHJvcHMuc2hvd0RvdWJsZVZpZXcsIHNob3dGaXhlZE51bWJlck9mV2Vla3MgPSBwcm9wcy5zaG93Rml4ZWROdW1iZXJPZldlZWtzLCBfZyA9IHByb3BzLnNob3dOYXZpZ2F0aW9uLCBzaG93TmF2aWdhdGlvbiA9IF9nID09PSB2b2lkIDAgPyB0cnVlIDogX2csIHNob3dOZWlnaGJvcmluZ0NlbnR1cnkgPSBwcm9wcy5zaG93TmVpZ2hib3JpbmdDZW50dXJ5LCBzaG93TmVpZ2hib3JpbmdEZWNhZGUgPSBwcm9wcy5zaG93TmVpZ2hib3JpbmdEZWNhZGUsIF9oID0gcHJvcHMuc2hvd05laWdoYm9yaW5nTW9udGgsIHNob3dOZWlnaGJvcmluZ01vbnRoID0gX2ggPT09IHZvaWQgMCA/IHRydWUgOiBfaCwgc2hvd1dlZWtOdW1iZXJzID0gcHJvcHMuc2hvd1dlZWtOdW1iZXJzLCB0aWxlQ2xhc3NOYW1lID0gcHJvcHMudGlsZUNsYXNzTmFtZSwgdGlsZUNvbnRlbnQgPSBwcm9wcy50aWxlQ29udGVudCwgdGlsZURpc2FibGVkID0gcHJvcHMudGlsZURpc2FibGVkLCB2YWx1ZVByb3BzID0gcHJvcHMudmFsdWUsIHZpZXdQcm9wcyA9IHByb3BzLnZpZXc7XG4gICAgdmFyIF9qID0gdXNlU3RhdGUoZGVmYXVsdEFjdGl2ZVN0YXJ0RGF0ZSksIGFjdGl2ZVN0YXJ0RGF0ZVN0YXRlID0gX2pbMF0sIHNldEFjdGl2ZVN0YXJ0RGF0ZVN0YXRlID0gX2pbMV07XG4gICAgdmFyIF9rID0gdXNlU3RhdGUobnVsbCksIGhvdmVyU3RhdGUgPSBfa1swXSwgc2V0SG92ZXJTdGF0ZSA9IF9rWzFdO1xuICAgIHZhciBfbCA9IHVzZVN0YXRlKEFycmF5LmlzQXJyYXkoZGVmYXVsdFZhbHVlKVxuICAgICAgICA/IGRlZmF1bHRWYWx1ZS5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAoZWwgIT09IG51bGwgPyB0b0RhdGUoZWwpIDogbnVsbCk7IH0pXG4gICAgICAgIDogZGVmYXVsdFZhbHVlICE9PSBudWxsICYmIGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRvRGF0ZShkZWZhdWx0VmFsdWUpXG4gICAgICAgICAgICA6IG51bGwpLCB2YWx1ZVN0YXRlID0gX2xbMF0sIHNldFZhbHVlU3RhdGUgPSBfbFsxXTtcbiAgICB2YXIgX20gPSB1c2VTdGF0ZShkZWZhdWx0VmlldyksIHZpZXdTdGF0ZSA9IF9tWzBdLCBzZXRWaWV3U3RhdGUgPSBfbVsxXTtcbiAgICB2YXIgYWN0aXZlU3RhcnREYXRlID0gYWN0aXZlU3RhcnREYXRlUHJvcHMgfHxcbiAgICAgICAgYWN0aXZlU3RhcnREYXRlU3RhdGUgfHxcbiAgICAgICAgZ2V0SW5pdGlhbEFjdGl2ZVN0YXJ0RGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmVTdGFydERhdGU6IGFjdGl2ZVN0YXJ0RGF0ZVByb3BzLFxuICAgICAgICAgICAgZGVmYXVsdEFjdGl2ZVN0YXJ0RGF0ZTogZGVmYXVsdEFjdGl2ZVN0YXJ0RGF0ZSxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuICAgICAgICAgICAgZGVmYXVsdFZpZXc6IGRlZmF1bHRWaWV3LFxuICAgICAgICAgICAgbWF4RGF0ZTogbWF4RGF0ZSxcbiAgICAgICAgICAgIG1heERldGFpbDogbWF4RGV0YWlsLFxuICAgICAgICAgICAgbWluRGF0ZTogbWluRGF0ZSxcbiAgICAgICAgICAgIG1pbkRldGFpbDogbWluRGV0YWlsLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlUHJvcHMsXG4gICAgICAgICAgICB2aWV3OiB2aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgIHZhciB2YWx1ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYXdWYWx1ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBJbiB0aGUgbWlkZGxlIG9mIHJhbmdlIHNlbGVjdGlvbiwgdXNlIHZhbHVlIGZyb20gc3RhdGVcbiAgICAgICAgICAgIGlmIChzZWxlY3RSYW5nZSAmJiBnZXRJc1NpbmdsZVZhbHVlKHZhbHVlU3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlU3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVQcm9wcyAhPT0gdW5kZWZpbmVkID8gdmFsdWVQcm9wcyA6IHZhbHVlU3RhdGU7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIGlmICghcmF3VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHJhd1ZhbHVlKVxuICAgICAgICAgICAgPyByYXdWYWx1ZS5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAoZWwgIT09IG51bGwgPyB0b0RhdGUoZWwpIDogbnVsbCk7IH0pXG4gICAgICAgICAgICA6IHJhd1ZhbHVlICE9PSBudWxsXG4gICAgICAgICAgICAgICAgPyB0b0RhdGUocmF3VmFsdWUpXG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgIH0pKCk7XG4gICAgdmFyIHZhbHVlVHlwZSA9IGdldFZhbHVlVHlwZShtYXhEZXRhaWwpO1xuICAgIHZhciB2aWV3ID0gZ2V0Vmlldyh2aWV3UHJvcHMgfHwgdmlld1N0YXRlLCBtaW5EZXRhaWwsIG1heERldGFpbCk7XG4gICAgdmFyIHZpZXdzID0gZ2V0TGltaXRlZFZpZXdzKG1pbkRldGFpbCwgbWF4RGV0YWlsKTtcbiAgICB2YXIgaG92ZXIgPSBzZWxlY3RSYW5nZSA/IGhvdmVyU3RhdGUgOiBudWxsO1xuICAgIHZhciBkcmlsbERvd25BdmFpbGFibGUgPSB2aWV3cy5pbmRleE9mKHZpZXcpIDwgdmlld3MubGVuZ3RoIC0gMTtcbiAgICB2YXIgZHJpbGxVcEF2YWlsYWJsZSA9IHZpZXdzLmluZGV4T2YodmlldykgPiAwO1xuICAgIHZhciBnZXRQcm9jZXNzZWRWYWx1ZSA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcHJvY2Vzc0Z1bmN0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN3aXRjaCAocmV0dXJuVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXREZXRhaWxWYWx1ZUZyb207XG4gICAgICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldERldGFpbFZhbHVlVG87XG4gICAgICAgICAgICAgICAgY2FzZSAncmFuZ2UnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGV0YWlsVmFsdWVBcnJheTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcmV0dXJuVmFsdWUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHJldHVybiBwcm9jZXNzRnVuY3Rpb24oe1xuICAgICAgICAgICAgbWF4RGF0ZTogbWF4RGF0ZSxcbiAgICAgICAgICAgIG1heERldGFpbDogbWF4RGV0YWlsLFxuICAgICAgICAgICAgbWluRGF0ZTogbWluRGF0ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgfSwgW21heERhdGUsIG1heERldGFpbCwgbWluRGF0ZSwgcmV0dXJuVmFsdWVdKTtcbiAgICB2YXIgc2V0QWN0aXZlU3RhcnREYXRlID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKG5leHRBY3RpdmVTdGFydERhdGUsIGFjdGlvbikge1xuICAgICAgICBzZXRBY3RpdmVTdGFydERhdGVTdGF0ZShuZXh0QWN0aXZlU3RhcnREYXRlKTtcbiAgICAgICAgdmFyIGFyZ3MgPSB7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGFjdGl2ZVN0YXJ0RGF0ZTogbmV4dEFjdGl2ZVN0YXJ0RGF0ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIHZpZXc6IHZpZXcsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChvbkFjdGl2ZVN0YXJ0RGF0ZUNoYW5nZSAmJiAhYXJlRGF0ZXNFcXVhbChhY3RpdmVTdGFydERhdGUsIG5leHRBY3RpdmVTdGFydERhdGUpKSB7XG4gICAgICAgICAgICBvbkFjdGl2ZVN0YXJ0RGF0ZUNoYW5nZShhcmdzKTtcbiAgICAgICAgfVxuICAgIH0sIFthY3RpdmVTdGFydERhdGUsIG9uQWN0aXZlU3RhcnREYXRlQ2hhbmdlLCB2YWx1ZSwgdmlld10pO1xuICAgIHZhciBvbkNsaWNrVGlsZSA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uICh2YWx1ZSwgZXZlbnQpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodmlldykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnR1cnknOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb25DbGlja0RlY2FkZTtcbiAgICAgICAgICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb25DbGlja1llYXI7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvbkNsaWNrTW9udGg7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb25DbGlja0RheTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZpZXc6IFwiLmNvbmNhdCh2aWV3LCBcIi5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjayh2YWx1ZSwgZXZlbnQpO1xuICAgIH0sIFtvbkNsaWNrRGF5LCBvbkNsaWNrRGVjYWRlLCBvbkNsaWNrTW9udGgsIG9uQ2xpY2tZZWFyLCB2aWV3XSk7XG4gICAgdmFyIGRyaWxsRG93biA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uIChuZXh0QWN0aXZlU3RhcnREYXRlLCBldmVudCkge1xuICAgICAgICBpZiAoIWRyaWxsRG93bkF2YWlsYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9uQ2xpY2tUaWxlKG5leHRBY3RpdmVTdGFydERhdGUsIGV2ZW50KTtcbiAgICAgICAgdmFyIG5leHRWaWV3ID0gdmlld3Nbdmlld3MuaW5kZXhPZih2aWV3KSArIDFdO1xuICAgICAgICBpZiAoIW5leHRWaWV3KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byBkcmlsbCBkb3duIGZyb20gdGhlIGxvd2VzdCB2aWV3LicpO1xuICAgICAgICB9XG4gICAgICAgIHNldEFjdGl2ZVN0YXJ0RGF0ZVN0YXRlKG5leHRBY3RpdmVTdGFydERhdGUpO1xuICAgICAgICBzZXRWaWV3U3RhdGUobmV4dFZpZXcpO1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2RyaWxsRG93bicsXG4gICAgICAgICAgICBhY3RpdmVTdGFydERhdGU6IG5leHRBY3RpdmVTdGFydERhdGUsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICB2aWV3OiBuZXh0VmlldyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG9uQWN0aXZlU3RhcnREYXRlQ2hhbmdlICYmICFhcmVEYXRlc0VxdWFsKGFjdGl2ZVN0YXJ0RGF0ZSwgbmV4dEFjdGl2ZVN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgICAgIG9uQWN0aXZlU3RhcnREYXRlQ2hhbmdlKGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvblZpZXdDaGFuZ2UgJiYgdmlldyAhPT0gbmV4dFZpZXcpIHtcbiAgICAgICAgICAgIG9uVmlld0NoYW5nZShhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob25EcmlsbERvd24pIHtcbiAgICAgICAgICAgIG9uRHJpbGxEb3duKGFyZ3MpO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBhY3RpdmVTdGFydERhdGUsXG4gICAgICAgIGRyaWxsRG93bkF2YWlsYWJsZSxcbiAgICAgICAgb25BY3RpdmVTdGFydERhdGVDaGFuZ2UsXG4gICAgICAgIG9uQ2xpY2tUaWxlLFxuICAgICAgICBvbkRyaWxsRG93bixcbiAgICAgICAgb25WaWV3Q2hhbmdlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgdmlldyxcbiAgICAgICAgdmlld3MsXG4gICAgXSk7XG4gICAgdmFyIGRyaWxsVXAgPSB1c2VDYWxsYmFjayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZHJpbGxVcEF2YWlsYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXh0VmlldyA9IHZpZXdzW3ZpZXdzLmluZGV4T2YodmlldykgLSAxXTtcbiAgICAgICAgaWYgKCFuZXh0Vmlldykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0ZWQgdG8gZHJpbGwgdXAgZnJvbSB0aGUgaGlnaGVzdCB2aWV3LicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXh0QWN0aXZlU3RhcnREYXRlID0gZ2V0QmVnaW4obmV4dFZpZXcsIGFjdGl2ZVN0YXJ0RGF0ZSk7XG4gICAgICAgIHNldEFjdGl2ZVN0YXJ0RGF0ZVN0YXRlKG5leHRBY3RpdmVTdGFydERhdGUpO1xuICAgICAgICBzZXRWaWV3U3RhdGUobmV4dFZpZXcpO1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2RyaWxsVXAnLFxuICAgICAgICAgICAgYWN0aXZlU3RhcnREYXRlOiBuZXh0QWN0aXZlU3RhcnREYXRlLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgdmlldzogbmV4dFZpZXcsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChvbkFjdGl2ZVN0YXJ0RGF0ZUNoYW5nZSAmJiAhYXJlRGF0ZXNFcXVhbChhY3RpdmVTdGFydERhdGUsIG5leHRBY3RpdmVTdGFydERhdGUpKSB7XG4gICAgICAgICAgICBvbkFjdGl2ZVN0YXJ0RGF0ZUNoYW5nZShhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob25WaWV3Q2hhbmdlICYmIHZpZXcgIT09IG5leHRWaWV3KSB7XG4gICAgICAgICAgICBvblZpZXdDaGFuZ2UoYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uRHJpbGxVcCkge1xuICAgICAgICAgICAgb25EcmlsbFVwKGFyZ3MpO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBhY3RpdmVTdGFydERhdGUsXG4gICAgICAgIGRyaWxsVXBBdmFpbGFibGUsXG4gICAgICAgIG9uQWN0aXZlU3RhcnREYXRlQ2hhbmdlLFxuICAgICAgICBvbkRyaWxsVXAsXG4gICAgICAgIG9uVmlld0NoYW5nZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHZpZXcsXG4gICAgICAgIHZpZXdzLFxuICAgIF0pO1xuICAgIHZhciBvbkNoYW5nZSA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uIChyYXdOZXh0VmFsdWUsIGV2ZW50KSB7XG4gICAgICAgIHZhciBwcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgICAgIG9uQ2xpY2tUaWxlKHJhd05leHRWYWx1ZSwgZXZlbnQpO1xuICAgICAgICB2YXIgaXNGaXJzdFZhbHVlSW5SYW5nZSA9IHNlbGVjdFJhbmdlICYmICFnZXRJc1NpbmdsZVZhbHVlKHByZXZpb3VzVmFsdWUpO1xuICAgICAgICB2YXIgbmV4dFZhbHVlO1xuICAgICAgICBpZiAoc2VsZWN0UmFuZ2UpIHtcbiAgICAgICAgICAgIC8vIFJhbmdlIHNlbGVjdGlvbiB0dXJuZWQgb25cbiAgICAgICAgICAgIGlmIChpc0ZpcnN0VmFsdWVJblJhbmdlKSB7XG4gICAgICAgICAgICAgICAgLy8gVmFsdWUgaGFzIDAgb3IgMiBlbGVtZW50cyAtIGVpdGhlciB3YXkgd2UncmUgc3RhcnRpbmcgYSBuZXcgYXJyYXlcbiAgICAgICAgICAgICAgICAvLyBGaXJzdCB2YWx1ZVxuICAgICAgICAgICAgICAgIG5leHRWYWx1ZSA9IGdldEJlZ2luKHZhbHVlVHlwZSwgcmF3TmV4dFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzVmFsdWUgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmV2aW91c1ZhbHVlIG11c3Qgbm90IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNlY29uZCB2YWx1ZVxuICAgICAgICAgICAgICAgIG5leHRWYWx1ZSA9IGdldFZhbHVlUmFuZ2UodmFsdWVUeXBlLCBwcmV2aW91c1ZhbHVlLCByYXdOZXh0VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUmFuZ2Ugc2VsZWN0aW9uIHR1cm5lZCBvZmZcbiAgICAgICAgICAgIG5leHRWYWx1ZSA9IGdldFByb2Nlc3NlZFZhbHVlKHJhd05leHRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5leHRBY3RpdmVTdGFydERhdGUgPSBcbiAgICAgICAgLy8gUmFuZ2Ugc2VsZWN0aW9uIHR1cm5lZCBvZmZcbiAgICAgICAgIXNlbGVjdFJhbmdlIHx8XG4gICAgICAgICAgICAvLyBSYW5nZSBzZWxlY3Rpb24gdHVybmVkIG9uLCBmaXJzdCB2YWx1ZVxuICAgICAgICAgICAgaXNGaXJzdFZhbHVlSW5SYW5nZSB8fFxuICAgICAgICAgICAgLy8gUmFuZ2Ugc2VsZWN0aW9uIHR1cm5lZCBvbiwgc2Vjb25kIHZhbHVlLCBnb1RvUmFuZ2VTdGFydE9uU2VsZWN0IHRvZ2dsZWQgb25cbiAgICAgICAgICAgIGdvVG9SYW5nZVN0YXJ0T25TZWxlY3RcbiAgICAgICAgICAgID8gZ2V0QWN0aXZlU3RhcnREYXRlKHtcbiAgICAgICAgICAgICAgICBtYXhEYXRlOiBtYXhEYXRlLFxuICAgICAgICAgICAgICAgIG1heERldGFpbDogbWF4RGV0YWlsLFxuICAgICAgICAgICAgICAgIG1pbkRhdGU6IG1pbkRhdGUsXG4gICAgICAgICAgICAgICAgbWluRGV0YWlsOiBtaW5EZXRhaWwsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5leHRWYWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiB2aWV3LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICBzZXRBY3RpdmVTdGFydERhdGVTdGF0ZShuZXh0QWN0aXZlU3RhcnREYXRlKTtcbiAgICAgICAgc2V0VmFsdWVTdGF0ZShuZXh0VmFsdWUpO1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGFjdGlvbjogJ29uQ2hhbmdlJyxcbiAgICAgICAgICAgIGFjdGl2ZVN0YXJ0RGF0ZTogbmV4dEFjdGl2ZVN0YXJ0RGF0ZSxcbiAgICAgICAgICAgIHZhbHVlOiBuZXh0VmFsdWUsXG4gICAgICAgICAgICB2aWV3OiB2aWV3LFxuICAgICAgICB9O1xuICAgICAgICBpZiAob25BY3RpdmVTdGFydERhdGVDaGFuZ2UgJiYgIWFyZURhdGVzRXF1YWwoYWN0aXZlU3RhcnREYXRlLCBuZXh0QWN0aXZlU3RhcnREYXRlKSkge1xuICAgICAgICAgICAgb25BY3RpdmVTdGFydERhdGVDaGFuZ2UoYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uQ2hhbmdlUHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3RSYW5nZSkge1xuICAgICAgICAgICAgICAgIHZhciBpc1NpbmdsZVZhbHVlID0gZ2V0SXNTaW5nbGVWYWx1ZShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghaXNTaW5nbGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZVByb3BzKG5leHRWYWx1ZSB8fCBudWxsLCBldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFsbG93UGFydGlhbFJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5leHRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndmFsdWUgbXVzdCBub3QgYmUgYW4gYXJyYXknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZVByb3BzKFtuZXh0VmFsdWUgfHwgbnVsbCwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvbkNoYW5nZVByb3BzKG5leHRWYWx1ZSB8fCBudWxsLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIGFjdGl2ZVN0YXJ0RGF0ZSxcbiAgICAgICAgYWxsb3dQYXJ0aWFsUmFuZ2UsXG4gICAgICAgIGdldFByb2Nlc3NlZFZhbHVlLFxuICAgICAgICBnb1RvUmFuZ2VTdGFydE9uU2VsZWN0LFxuICAgICAgICBtYXhEYXRlLFxuICAgICAgICBtYXhEZXRhaWwsXG4gICAgICAgIG1pbkRhdGUsXG4gICAgICAgIG1pbkRldGFpbCxcbiAgICAgICAgb25BY3RpdmVTdGFydERhdGVDaGFuZ2UsXG4gICAgICAgIG9uQ2hhbmdlUHJvcHMsXG4gICAgICAgIG9uQ2xpY2tUaWxlLFxuICAgICAgICBzZWxlY3RSYW5nZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHZhbHVlVHlwZSxcbiAgICAgICAgdmlldyxcbiAgICBdKTtcbiAgICBmdW5jdGlvbiBvbk1vdXNlT3ZlcihuZXh0SG92ZXIpIHtcbiAgICAgICAgc2V0SG92ZXJTdGF0ZShuZXh0SG92ZXIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlTGVhdmUoKSB7XG4gICAgICAgIHNldEhvdmVyU3RhdGUobnVsbCk7XG4gICAgfVxuICAgIHVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoe1xuICAgICAgICBhY3RpdmVTdGFydERhdGU6IGFjdGl2ZVN0YXJ0RGF0ZSxcbiAgICAgICAgZHJpbGxEb3duOiBkcmlsbERvd24sXG4gICAgICAgIGRyaWxsVXA6IGRyaWxsVXAsXG4gICAgICAgIG9uQ2hhbmdlOiBvbkNoYW5nZSxcbiAgICAgICAgc2V0QWN0aXZlU3RhcnREYXRlOiBzZXRBY3RpdmVTdGFydERhdGUsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgdmlldzogdmlldyxcbiAgICB9KTsgfSwgW2FjdGl2ZVN0YXJ0RGF0ZSwgZHJpbGxEb3duLCBkcmlsbFVwLCBvbkNoYW5nZSwgc2V0QWN0aXZlU3RhcnREYXRlLCB2YWx1ZSwgdmlld10pO1xuICAgIGZ1bmN0aW9uIHJlbmRlckNvbnRlbnQobmV4dCkge1xuICAgICAgICB2YXIgY3VycmVudEFjdGl2ZVN0YXJ0RGF0ZSA9IG5leHRcbiAgICAgICAgICAgID8gZ2V0QmVnaW5OZXh0KHZpZXcsIGFjdGl2ZVN0YXJ0RGF0ZSlcbiAgICAgICAgICAgIDogZ2V0QmVnaW4odmlldywgYWN0aXZlU3RhcnREYXRlKTtcbiAgICAgICAgdmFyIG9uQ2xpY2sgPSBkcmlsbERvd25BdmFpbGFibGUgPyBkcmlsbERvd24gOiBvbkNoYW5nZTtcbiAgICAgICAgdmFyIGNvbW1vblByb3BzID0ge1xuICAgICAgICAgICAgYWN0aXZlU3RhcnREYXRlOiBjdXJyZW50QWN0aXZlU3RhcnREYXRlLFxuICAgICAgICAgICAgaG92ZXI6IGhvdmVyLFxuICAgICAgICAgICAgbG9jYWxlOiBsb2NhbGUsXG4gICAgICAgICAgICBtYXhEYXRlOiBtYXhEYXRlLFxuICAgICAgICAgICAgbWluRGF0ZTogbWluRGF0ZSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IG9uQ2xpY2ssXG4gICAgICAgICAgICBvbk1vdXNlT3Zlcjogc2VsZWN0UmFuZ2UgPyBvbk1vdXNlT3ZlciA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRpbGVDbGFzc05hbWU6IHRpbGVDbGFzc05hbWUsXG4gICAgICAgICAgICB0aWxlQ29udGVudDogdGlsZUNvbnRlbnQsXG4gICAgICAgICAgICB0aWxlRGlzYWJsZWQ6IHRpbGVEaXNhYmxlZCxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIHZhbHVlVHlwZTogdmFsdWVUeXBlLFxuICAgICAgICB9O1xuICAgICAgICBzd2l0Y2ggKHZpZXcpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NlbnR1cnknOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfanN4KENlbnR1cnlWaWV3LCBfX2Fzc2lnbih7IGZvcm1hdFllYXI6IGZvcm1hdFllYXIsIHNob3dOZWlnaGJvcmluZ0NlbnR1cnk6IHNob3dOZWlnaGJvcmluZ0NlbnR1cnkgfSwgY29tbW9uUHJvcHMpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdkZWNhZGUnOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfanN4KERlY2FkZVZpZXcsIF9fYXNzaWduKHsgZm9ybWF0WWVhcjogZm9ybWF0WWVhciwgc2hvd05laWdoYm9yaW5nRGVjYWRlOiBzaG93TmVpZ2hib3JpbmdEZWNhZGUgfSwgY29tbW9uUHJvcHMpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzoge1xuICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeChZZWFyVmlldywgX19hc3NpZ24oeyBmb3JtYXRNb250aDogZm9ybWF0TW9udGgsIGZvcm1hdE1vbnRoWWVhcjogZm9ybWF0TW9udGhZZWFyIH0sIGNvbW1vblByb3BzKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnbW9udGgnOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfanN4KE1vbnRoVmlldywgX19hc3NpZ24oeyBjYWxlbmRhclR5cGU6IGNhbGVuZGFyVHlwZSwgZm9ybWF0RGF5OiBmb3JtYXREYXksIGZvcm1hdExvbmdEYXRlOiBmb3JtYXRMb25nRGF0ZSwgZm9ybWF0U2hvcnRXZWVrZGF5OiBmb3JtYXRTaG9ydFdlZWtkYXksIGZvcm1hdFdlZWtkYXk6IGZvcm1hdFdlZWtkYXksIG9uQ2xpY2tXZWVrTnVtYmVyOiBvbkNsaWNrV2Vla051bWJlciwgb25Nb3VzZUxlYXZlOiBzZWxlY3RSYW5nZSA/IG9uTW91c2VMZWF2ZSA6IHVuZGVmaW5lZCwgc2hvd0ZpeGVkTnVtYmVyT2ZXZWVrczogdHlwZW9mIHNob3dGaXhlZE51bWJlck9mV2Vla3MgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNob3dGaXhlZE51bWJlck9mV2Vla3NcbiAgICAgICAgICAgICAgICAgICAgICAgIDogc2hvd0RvdWJsZVZpZXcsIHNob3dOZWlnaGJvcmluZ01vbnRoOiBzaG93TmVpZ2hib3JpbmdNb250aCwgc2hvd1dlZWtOdW1iZXJzOiBzaG93V2Vla051bWJlcnMgfSwgY29tbW9uUHJvcHMpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmlldzogXCIuY29uY2F0KHZpZXcsIFwiLlwiKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyTmF2aWdhdGlvbigpIHtcbiAgICAgICAgaWYgKCFzaG93TmF2aWdhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChfanN4KE5hdmlnYXRpb24sIHsgYWN0aXZlU3RhcnREYXRlOiBhY3RpdmVTdGFydERhdGUsIGRyaWxsVXA6IGRyaWxsVXAsIGZvcm1hdE1vbnRoWWVhcjogZm9ybWF0TW9udGhZZWFyLCBmb3JtYXRZZWFyOiBmb3JtYXRZZWFyLCBsb2NhbGU6IGxvY2FsZSwgbWF4RGF0ZTogbWF4RGF0ZSwgbWluRGF0ZTogbWluRGF0ZSwgbmF2aWdhdGlvbkFyaWFMYWJlbDogbmF2aWdhdGlvbkFyaWFMYWJlbCwgbmF2aWdhdGlvbkFyaWFMaXZlOiBuYXZpZ2F0aW9uQXJpYUxpdmUsIG5hdmlnYXRpb25MYWJlbDogbmF2aWdhdGlvbkxhYmVsLCBuZXh0MkFyaWFMYWJlbDogbmV4dDJBcmlhTGFiZWwsIG5leHQyTGFiZWw6IG5leHQyTGFiZWwsIG5leHRBcmlhTGFiZWw6IG5leHRBcmlhTGFiZWwsIG5leHRMYWJlbDogbmV4dExhYmVsLCBwcmV2MkFyaWFMYWJlbDogcHJldjJBcmlhTGFiZWwsIHByZXYyTGFiZWw6IHByZXYyTGFiZWwsIHByZXZBcmlhTGFiZWw6IHByZXZBcmlhTGFiZWwsIHByZXZMYWJlbDogcHJldkxhYmVsLCBzZXRBY3RpdmVTdGFydERhdGU6IHNldEFjdGl2ZVN0YXJ0RGF0ZSwgc2hvd0RvdWJsZVZpZXc6IHNob3dEb3VibGVWaWV3LCB2aWV3OiB2aWV3LCB2aWV3czogdmlld3MgfSkpO1xuICAgIH1cbiAgICB2YXIgdmFsdWVBcnJheSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNsc3goYmFzZUNsYXNzTmFtZSwgc2VsZWN0UmFuZ2UgJiYgdmFsdWVBcnJheS5sZW5ndGggPT09IDEgJiYgXCJcIi5jb25jYXQoYmFzZUNsYXNzTmFtZSwgXCItLXNlbGVjdFJhbmdlXCIpLCBzaG93RG91YmxlVmlldyAmJiBcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIi0tZG91YmxlVmlld1wiKSwgY2xhc3NOYW1lKSwgcmVmOiBpbnB1dFJlZiwgY2hpbGRyZW46IFtyZW5kZXJOYXZpZ2F0aW9uKCksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIl9fdmlld0NvbnRhaW5lclwiKSwgb25CbHVyOiBzZWxlY3RSYW5nZSA/IG9uTW91c2VMZWF2ZSA6IHVuZGVmaW5lZCwgb25Nb3VzZUxlYXZlOiBzZWxlY3RSYW5nZSA/IG9uTW91c2VMZWF2ZSA6IHVuZGVmaW5lZCwgY2hpbGRyZW46IFtyZW5kZXJDb250ZW50KCksIHNob3dEb3VibGVWaWV3ID8gcmVuZGVyQ29udGVudCh0cnVlKSA6IG51bGxdIH0pXSB9KSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IENhbGVuZGFyO1xuIiwiZnVuY3Rpb24gZ2V0UmVjdChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RFbGVtZW50T3ZlcmZsb3coZWxlbWVudCwgY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0IGNvbGxpZGVkVG9wKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJlY3QoZWxlbWVudCkudG9wIDwgZ2V0UmVjdChjb250YWluZXIpLnRvcDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGNvbGxpZGVkQm90dG9tKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJlY3QoZWxlbWVudCkuYm90dG9tID4gZ2V0UmVjdChjb250YWluZXIpLmJvdHRvbTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGNvbGxpZGVkTGVmdCgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSZWN0KGVsZW1lbnQpLmxlZnQgPCBnZXRSZWN0KGNvbnRhaW5lcikubGVmdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGNvbGxpZGVkUmlnaHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmVjdChlbGVtZW50KS5yaWdodCA+IGdldFJlY3QoY29udGFpbmVyKS5yaWdodDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IG92ZXJmbG93VG9wKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJlY3QoY29udGFpbmVyKS50b3AgLSBnZXRSZWN0KGVsZW1lbnQpLnRvcDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IG92ZXJmbG93Qm90dG9tKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJlY3QoZWxlbWVudCkuYm90dG9tIC0gZ2V0UmVjdChjb250YWluZXIpLmJvdHRvbTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IG92ZXJmbG93TGVmdCgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSZWN0KGNvbnRhaW5lcikubGVmdCAtIGdldFJlY3QoZWxlbWVudCkubGVmdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IG92ZXJmbG93UmlnaHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmVjdChlbGVtZW50KS5yaWdodCAtIGdldFJlY3QoY29udGFpbmVyKS5yaWdodDtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMSA/IGxlbiAtIDEgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAxOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsIid1c2UgY2xpZW50JztcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgQ2hpbGRyZW4sIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBkZXRlY3RFbGVtZW50T3ZlcmZsb3cgZnJvbSAnZGV0ZWN0LWVsZW1lbnQtb3ZlcmZsb3cnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG52YXIgaXNCcm93c2VyID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcbnZhciBpc011dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQgPSBpc0Jyb3dzZXIgJiYgJ011dGF0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdztcbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIChzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSkpO1xufVxuZnVuY3Rpb24gZmluZFNjcm9sbENvbnRhaW5lcihlbGVtZW50KSB7XG4gICAgdmFyIHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgIHZhciBvdmVyZmxvdyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBhcmVudCkub3ZlcmZsb3c7XG4gICAgICAgIGlmIChvdmVyZmxvdy5zcGxpdCgnICcpLmV2ZXJ5KGZ1bmN0aW9uIChvKSB7IHJldHVybiBvID09PSAnYXV0bycgfHwgbyA9PT0gJ3Njcm9sbCc7IH0pKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xufVxuZnVuY3Rpb24gYWxpZ25BeGlzKF9hKSB7XG4gICAgdmFyIGF4aXMgPSBfYS5heGlzLCBjb250YWluZXIgPSBfYS5jb250YWluZXIsIGVsZW1lbnQgPSBfYS5lbGVtZW50LCBpbnZlcnRBeGlzID0gX2EuaW52ZXJ0QXhpcywgc2Nyb2xsQ29udGFpbmVyID0gX2Euc2Nyb2xsQ29udGFpbmVyLCBzZWNvbmRhcnkgPSBfYS5zZWNvbmRhcnksIHNwYWNpbmcgPSBfYS5zcGFjaW5nO1xuICAgIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgIHZhciBwYXJlbnQgPSBjb250YWluZXIucGFyZW50RWxlbWVudDtcbiAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBzY3JvbGxDb250YWluZXJDb2xsaXNpb25zID0gZGV0ZWN0RWxlbWVudE92ZXJmbG93KHBhcmVudCwgc2Nyb2xsQ29udGFpbmVyKTtcbiAgICB2YXIgZG9jdW1lbnRDb2xsaXNpb25zID0gZGV0ZWN0RWxlbWVudE92ZXJmbG93KHBhcmVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcbiAgICB2YXIgaXNYID0gYXhpcyA9PT0gJ3gnO1xuICAgIHZhciBzdGFydFByb3BlcnR5ID0gaXNYID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgdmFyIGVuZFByb3BlcnR5ID0gaXNYID8gJ3JpZ2h0JyA6ICdib3R0b20nO1xuICAgIHZhciBzaXplUHJvcGVydHkgPSBpc1ggPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgdmFyIG92ZXJmbG93U3RhcnRQcm9wZXJ0eSA9IFwib3ZlcmZsb3dcIi5jb25jYXQoY2FwaXRhbGl6ZShzdGFydFByb3BlcnR5KSk7XG4gICAgdmFyIG92ZXJmbG93RW5kUHJvcGVydHkgPSBcIm92ZXJmbG93XCIuY29uY2F0KGNhcGl0YWxpemUoZW5kUHJvcGVydHkpKTtcbiAgICB2YXIgc2Nyb2xsUHJvcGVydHkgPSBcInNjcm9sbFwiLmNvbmNhdChjYXBpdGFsaXplKHN0YXJ0UHJvcGVydHkpKTtcbiAgICB2YXIgdXBwZXJjYXNlZFNpemVQcm9wZXJ0eSA9IGNhcGl0YWxpemUoc2l6ZVByb3BlcnR5KTtcbiAgICB2YXIgb2Zmc2V0U2l6ZVByb3BlcnR5ID0gXCJvZmZzZXRcIi5jb25jYXQodXBwZXJjYXNlZFNpemVQcm9wZXJ0eSk7XG4gICAgdmFyIGNsaWVudFNpemVQcm9wZXJ0eSA9IFwiY2xpZW50XCIuY29uY2F0KHVwcGVyY2FzZWRTaXplUHJvcGVydHkpO1xuICAgIHZhciBtaW5TaXplUHJvcGVydHkgPSBcIm1pbi1cIi5jb25jYXQoc2l6ZVByb3BlcnR5KTtcbiAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxDb250YWluZXJbb2Zmc2V0U2l6ZVByb3BlcnR5XSAtIHNjcm9sbENvbnRhaW5lcltjbGllbnRTaXplUHJvcGVydHldO1xuICAgIHZhciBzdGFydFNwYWNpbmcgPSB0eXBlb2Ygc3BhY2luZyA9PT0gJ29iamVjdCcgPyBzcGFjaW5nW3N0YXJ0UHJvcGVydHldIDogc3BhY2luZztcbiAgICB2YXIgYXZhaWxhYmxlU3RhcnRTcGFjZSA9IC1NYXRoLm1heChzY3JvbGxDb250YWluZXJDb2xsaXNpb25zW292ZXJmbG93U3RhcnRQcm9wZXJ0eV0sIGRvY3VtZW50Q29sbGlzaW9uc1tvdmVyZmxvd1N0YXJ0UHJvcGVydHldICsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50W3Njcm9sbFByb3BlcnR5XSkgLSBzdGFydFNwYWNpbmc7XG4gICAgdmFyIGVuZFNwYWNpbmcgPSB0eXBlb2Ygc3BhY2luZyA9PT0gJ29iamVjdCcgPyBzcGFjaW5nW2VuZFByb3BlcnR5XSA6IHNwYWNpbmc7XG4gICAgdmFyIGF2YWlsYWJsZUVuZFNwYWNlID0gLU1hdGgubWF4KHNjcm9sbENvbnRhaW5lckNvbGxpc2lvbnNbb3ZlcmZsb3dFbmRQcm9wZXJ0eV0sIGRvY3VtZW50Q29sbGlzaW9uc1tvdmVyZmxvd0VuZFByb3BlcnR5XSAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtzY3JvbGxQcm9wZXJ0eV0pIC1cbiAgICAgICAgZW5kU3BhY2luZyAtXG4gICAgICAgIHNjcm9sbGJhcldpZHRoO1xuICAgIGlmIChzZWNvbmRhcnkpIHtcbiAgICAgICAgYXZhaWxhYmxlU3RhcnRTcGFjZSArPSBwYXJlbnRbY2xpZW50U2l6ZVByb3BlcnR5XTtcbiAgICAgICAgYXZhaWxhYmxlRW5kU3BhY2UgKz0gcGFyZW50W2NsaWVudFNpemVQcm9wZXJ0eV07XG4gICAgfVxuICAgIHZhciBvZmZzZXRTaXplID0gZWxlbWVudFtvZmZzZXRTaXplUHJvcGVydHldO1xuICAgIGZ1bmN0aW9uIGRpc3BsYXlTdGFydCgpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZVtzdGFydFByb3BlcnR5XSA9ICdhdXRvJztcbiAgICAgICAgZWxlbWVudC5zdHlsZVtlbmRQcm9wZXJ0eV0gPSBzZWNvbmRhcnkgPyAnMCcgOiAnMTAwJSc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc3BsYXlFbmQoKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGVbc3RhcnRQcm9wZXJ0eV0gPSBzZWNvbmRhcnkgPyAnMCcgOiAnMTAwJSc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGVbZW5kUHJvcGVydHldID0gJ2F1dG8nO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkaXNwbGF5SWZGaXRzKGF2YWlsYWJsZVNwYWNlLCBkaXNwbGF5KSB7XG4gICAgICAgIHZhciBmaXRzID0gb2Zmc2V0U2l6ZSA8PSBhdmFpbGFibGVTcGFjZTtcbiAgICAgICAgaWYgKGZpdHMpIHtcbiAgICAgICAgICAgIGRpc3BsYXkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZml0cztcbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzcGxheVN0YXJ0SWZGaXRzKCkge1xuICAgICAgICByZXR1cm4gZGlzcGxheUlmRml0cyhhdmFpbGFibGVTdGFydFNwYWNlLCBkaXNwbGF5U3RhcnQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkaXNwbGF5RW5kSWZGaXRzKCkge1xuICAgICAgICByZXR1cm4gZGlzcGxheUlmRml0cyhhdmFpbGFibGVFbmRTcGFjZSwgZGlzcGxheUVuZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc3BsYXlXaGVyZXZlclNocmlua2VkRml0cygpIHtcbiAgICAgICAgdmFyIG1vcmVTcGFjZVN0YXJ0ID0gYXZhaWxhYmxlU3RhcnRTcGFjZSA+IGF2YWlsYWJsZUVuZFNwYWNlO1xuICAgICAgICB2YXIgcmF3TWluU2l6ZSA9IHN0eWxlLmdldFByb3BlcnR5VmFsdWUobWluU2l6ZVByb3BlcnR5KTtcbiAgICAgICAgdmFyIG1pblNpemUgPSByYXdNaW5TaXplID8gcGFyc2VJbnQocmF3TWluU2l6ZSwgMTApIDogbnVsbDtcbiAgICAgICAgZnVuY3Rpb24gc2hyaW5rVG9TaXplKHNpemUpIHtcbiAgICAgICAgICAgIHdhcm5pbmcoIW1pblNpemUgfHwgc2l6ZSA+PSBtaW5TaXplLCBcIjxGaXQgLz4ncyBjaGlsZCB3aWxsIG5vdCBmaXQgYW55d2hlcmUgd2l0aCBpdHMgY3VycmVudCBcIi5jb25jYXQobWluU2l6ZVByb3BlcnR5LCBcIiBvZiBcIikuY29uY2F0KG1pblNpemUsIFwicHguXCIpKTtcbiAgICAgICAgICAgIHZhciBuZXdTaXplID0gTWF0aC5tYXgoc2l6ZSwgbWluU2l6ZSB8fCAwKTtcbiAgICAgICAgICAgIHdhcm5pbmcoZmFsc2UsIFwiPEZpdCAvPidzIGNoaWxkIG5lZWRlZCB0byBoYXZlIGl0cyBcIi5jb25jYXQoc2l6ZVByb3BlcnR5LCBcIiBkZWNyZWFzZWQgdG8gXCIpLmNvbmNhdChuZXdTaXplLCBcInB4LlwiKSk7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3NpemVQcm9wZXJ0eV0gPSBcIlwiLmNvbmNhdChuZXdTaXplLCBcInB4XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtb3JlU3BhY2VTdGFydCkge1xuICAgICAgICAgICAgc2hyaW5rVG9TaXplKGF2YWlsYWJsZVN0YXJ0U3BhY2UpO1xuICAgICAgICAgICAgZGlzcGxheVN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzaHJpbmtUb1NpemUoYXZhaWxhYmxlRW5kU3BhY2UpO1xuICAgICAgICAgICAgZGlzcGxheUVuZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBmaXRzO1xuICAgIGlmIChpbnZlcnRBeGlzKSB7XG4gICAgICAgIGZpdHMgPSBkaXNwbGF5U3RhcnRJZkZpdHMoKSB8fCBkaXNwbGF5RW5kSWZGaXRzKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmaXRzID0gZGlzcGxheUVuZElmRml0cygpIHx8IGRpc3BsYXlTdGFydElmRml0cygpO1xuICAgIH1cbiAgICBpZiAoIWZpdHMpIHtcbiAgICAgICAgZGlzcGxheVdoZXJldmVyU2hyaW5rZWRGaXRzKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWxpZ25NYWluQXhpcyhhcmdzKSB7XG4gICAgYWxpZ25BeGlzKGFyZ3MpO1xufVxuZnVuY3Rpb24gYWxpZ25TZWNvbmRhcnlBeGlzKGFyZ3MpIHtcbiAgICBhbGlnbkF4aXMoX19hc3NpZ24oX19hc3NpZ24oe30sIGFyZ3MpLCB7IGF4aXM6IGFyZ3MuYXhpcyA9PT0gJ3gnID8gJ3knIDogJ3gnLCBzZWNvbmRhcnk6IHRydWUgfSkpO1xufVxuZnVuY3Rpb24gYWxpZ25Cb3RoQXhpcyhhcmdzKSB7XG4gICAgdmFyIGludmVydEF4aXMgPSBhcmdzLmludmVydEF4aXMsIGludmVydFNlY29uZGFyeUF4aXMgPSBhcmdzLmludmVydFNlY29uZGFyeUF4aXMsIGNvbW1vbkFyZ3MgPSBfX3Jlc3QoYXJncywgW1wiaW52ZXJ0QXhpc1wiLCBcImludmVydFNlY29uZGFyeUF4aXNcIl0pO1xuICAgIGFsaWduTWFpbkF4aXMoX19hc3NpZ24oX19hc3NpZ24oe30sIGNvbW1vbkFyZ3MpLCB7IGludmVydEF4aXM6IGludmVydEF4aXMgfSkpO1xuICAgIGFsaWduU2Vjb25kYXJ5QXhpcyhfX2Fzc2lnbihfX2Fzc2lnbih7fSwgY29tbW9uQXJncyksIHsgaW52ZXJ0QXhpczogaW52ZXJ0U2Vjb25kYXJ5QXhpcyB9KSk7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGaXQoX2EpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBfYS5jaGlsZHJlbiwgaW52ZXJ0QXhpcyA9IF9hLmludmVydEF4aXMsIGludmVydFNlY29uZGFyeUF4aXMgPSBfYS5pbnZlcnRTZWNvbmRhcnlBeGlzLCBfYiA9IF9hLm1haW5BeGlzLCBtYWluQXhpcyA9IF9iID09PSB2b2lkIDAgPyAneScgOiBfYiwgX2MgPSBfYS5zcGFjaW5nLCBzcGFjaW5nID0gX2MgPT09IHZvaWQgMCA/IDggOiBfYztcbiAgICB2YXIgY29udGFpbmVyID0gdXNlUmVmKHVuZGVmaW5lZCk7XG4gICAgdmFyIGVsZW1lbnQgPSB1c2VSZWYodW5kZWZpbmVkKTtcbiAgICB2YXIgZWxlbWVudFdpZHRoID0gdXNlUmVmKHVuZGVmaW5lZCk7XG4gICAgdmFyIGVsZW1lbnRIZWlnaHQgPSB1c2VSZWYodW5kZWZpbmVkKTtcbiAgICB2YXIgc2Nyb2xsQ29udGFpbmVyID0gdXNlUmVmKHVuZGVmaW5lZCk7XG4gICAgdmFyIGZpdCA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFzY3JvbGxDb250YWluZXIuY3VycmVudCB8fCAhY29udGFpbmVyLmN1cnJlbnQgfHwgIWVsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50RWxlbWVudFdpZHRoID0gZWxlbWVudC5jdXJyZW50LmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgY3VycmVudEVsZW1lbnRIZWlnaHQgPSBlbGVtZW50LmN1cnJlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAvLyBObyBuZWVkIHRvIHJlY2FsY3VsYXRlIC0gYWxyZWFkeSBkaWQgdGhhdCBmb3IgY3VycmVudCBkaW1lbnNpb25zXG4gICAgICAgIGlmIChlbGVtZW50V2lkdGguY3VycmVudCA9PT0gY3VycmVudEVsZW1lbnRXaWR0aCAmJlxuICAgICAgICAgICAgZWxlbWVudEhlaWdodC5jdXJyZW50ID09PSBjdXJyZW50RWxlbWVudEhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNhdmUgdGhlIGRpbWVuc2lvbnMgc28gdGhhdCB3ZSBrbm93IHdlIGRvbid0IG5lZWQgdG8gcmVwZWF0IHRoZSBmdW5jdGlvbiBpZiB1bmNoYW5nZWRcbiAgICAgICAgZWxlbWVudFdpZHRoLmN1cnJlbnQgPSBjdXJyZW50RWxlbWVudFdpZHRoO1xuICAgICAgICBlbGVtZW50SGVpZ2h0LmN1cnJlbnQgPSBjdXJyZW50RWxlbWVudEhlaWdodDtcbiAgICAgICAgdmFyIHBhcmVudCA9IGNvbnRhaW5lci5jdXJyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIC8vIENvbnRhaW5lciB3YXMgdW5tb3VudGVkXG4gICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdlIG5lZWQgdG8gZW5zdXJlIHRoYXQgPEZpdCAvPidzIGNoaWxkIGhhcyBhIGFic29sdXRlIHBvc2l0aW9uLiBPdGhlcndpc2UsXG4gICAgICAgICAqIHdlIHdvdWxkbid0IGJlIGFibGUgdG8gcGxhY2UgdGhlIGNoaWxkIGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudC5jdXJyZW50KTtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gc3R5bGUucG9zaXRpb247XG4gICAgICAgIGlmIChwb3NpdGlvbiAhPT0gJ2Fic29sdXRlJykge1xuICAgICAgICAgICAgZWxlbWVudC5jdXJyZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV2UgbmVlZCB0byBlbnN1cmUgdGhhdCA8Rml0IC8+J3MgcGFyZW50IGhhcyBhIHJlbGF0aXZlIG9yIGFic29sdXRlIHBvc2l0aW9uLiBPdGhlcndpc2UsXG4gICAgICAgICAqIHdlIHdvdWxkbid0IGJlIGFibGUgdG8gcGxhY2UgdGhlIGNoaWxkIGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHBhcmVudFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocGFyZW50KTtcbiAgICAgICAgdmFyIHBhcmVudFBvc2l0aW9uID0gcGFyZW50U3R5bGUucG9zaXRpb247XG4gICAgICAgIGlmIChwYXJlbnRQb3NpdGlvbiAhPT0gJ3JlbGF0aXZlJyAmJiBwYXJlbnRQb3NpdGlvbiAhPT0gJ2Fic29sdXRlJykge1xuICAgICAgICAgICAgcGFyZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgfVxuICAgICAgICBhbGlnbkJvdGhBeGlzKHtcbiAgICAgICAgICAgIGF4aXM6IG1haW5BeGlzLFxuICAgICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIuY3VycmVudCxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQuY3VycmVudCxcbiAgICAgICAgICAgIGludmVydEF4aXM6IGludmVydEF4aXMsXG4gICAgICAgICAgICBpbnZlcnRTZWNvbmRhcnlBeGlzOiBpbnZlcnRTZWNvbmRhcnlBeGlzLFxuICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyOiBzY3JvbGxDb250YWluZXIuY3VycmVudCxcbiAgICAgICAgICAgIHNwYWNpbmc6IHNwYWNpbmcsXG4gICAgICAgIH0pO1xuICAgIH0sIFtpbnZlcnRBeGlzLCBpbnZlcnRTZWNvbmRhcnlBeGlzLCBtYWluQXhpcywgc3BhY2luZ10pO1xuICAgIHZhciBjaGlsZCA9IENoaWxkcmVuLm9ubHkoY2hpbGRyZW4pO1xuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZpdCgpO1xuICAgICAgICBmdW5jdGlvbiBvbk11dGF0aW9uKCkge1xuICAgICAgICAgICAgZml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCAmJiBlbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIob25NdXRhdGlvbik7XG4gICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZWxlbWVudC5jdXJyZW50LCB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnY2xhc3MnLCAnc3R5bGUnXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwgW2ZpdF0pO1xuICAgIGZ1bmN0aW9uIGFzc2lnblJlZnMoZG9tRWxlbWVudCkge1xuICAgICAgICBpZiAoIWRvbUVsZW1lbnQgfHwgIShkb21FbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jdXJyZW50ID0gZG9tRWxlbWVudDtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLmN1cnJlbnQgPSBmaW5kU2Nyb2xsQ29udGFpbmVyKGRvbUVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gKF9qc3goXCJzcGFuXCIsIHsgcmVmOiBmdW5jdGlvbiAoZG9tQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBpZiAoIWRvbUNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5jdXJyZW50ID0gZG9tQ29udGFpbmVyO1xuICAgICAgICAgICAgdmFyIGRvbUVsZW1lbnQgPSBkb21Db250YWluZXIgPT09IG51bGwgfHwgZG9tQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkb21Db250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICBhc3NpZ25SZWZzKGRvbUVsZW1lbnQpO1xuICAgICAgICB9LCBzdHlsZTogeyBkaXNwbGF5OiAnY29udGVudHMnIH0sIGNoaWxkcmVuOiBjaGlsZCB9KSk7XG59XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGl2aWRlcihfYSkge1xuICAgIHZhciBjaGlsZHJlbiA9IF9hLmNoaWxkcmVuO1xuICAgIHJldHVybiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJyZWFjdC1kYXRlLXBpY2tlcl9faW5wdXRHcm91cF9fZGl2aWRlclwiLCBjaGlsZHJlbjogY2hpbGRyZW4gfSk7XG59XG4iLCJ2YXIgYWxsb3dlZFZhcmlhbnRzID0gWydub3JtYWwnLCAnc21hbGwtY2FwcyddO1xuLyoqXG4gKiBHZXRzIGZvbnQgQ1NTIHNob3J0aGFuZCBwcm9wZXJ0eSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0byBnZXQgZm9udCBDU1Mgc2hvcnRoYW5kIHByb3BlcnR5IGZyb21cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZvbnRTaG9ydGhhbmQoZWxlbWVudCkge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgIGlmIChzdHlsZS5mb250KSB7XG4gICAgICAgIHJldHVybiBzdHlsZS5mb250O1xuICAgIH1cbiAgICB2YXIgaXNGb250RGVmaW5lZCA9IHN0eWxlLmZvbnRGYW1pbHkgIT09ICcnO1xuICAgIGlmICghaXNGb250RGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciBmb250VmFyaWFudCA9IGFsbG93ZWRWYXJpYW50cy5pbmNsdWRlcyhzdHlsZS5mb250VmFyaWFudCkgPyBzdHlsZS5mb250VmFyaWFudCA6ICdub3JtYWwnO1xuICAgIHJldHVybiBcIlwiLmNvbmNhdChzdHlsZS5mb250U3R5bGUsIFwiIFwiKS5jb25jYXQoZm9udFZhcmlhbnQsIFwiIFwiKS5jb25jYXQoc3R5bGUuZm9udFdlaWdodCwgXCIgXCIpLmNvbmNhdChzdHlsZS5mb250U2l6ZSwgXCIgLyBcIikuY29uY2F0KHN0eWxlLmxpbmVIZWlnaHQsIFwiIFwiKS5jb25jYXQoc3R5bGUuZm9udEZhbWlseSk7XG59XG52YXIgY2FjaGVkQ2FudmFzO1xuLyoqXG4gKiBNZWFzdXJlcyB0ZXh0IHdpZHRoIGdpdmVuIHRleHQgYW5kIGZvbnQgQ1NTIHNob3J0aGFuZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUZXh0IHRvIG1lYXN1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb250IEZvbnQgdG8gdXNlIHdoZW4gbWVhc3VyaW5nIHRoZSB0ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZWFzdXJlVGV4dCh0ZXh0LCBmb250KSB7XG4gICAgdmFyIGNhbnZhcyA9IGNhY2hlZENhbnZhcyB8fCAoY2FjaGVkQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykpO1xuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgLy8gQ29udGV4dCB0eXBlIG5vdCBzdXBwb3J0ZWRcbiAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnRleHQuZm9udCA9IGZvbnQ7XG4gICAgdmFyIHdpZHRoID0gY29udGV4dC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aDtcbiAgICByZXR1cm4gTWF0aC5jZWlsKHdpZHRoKTtcbn1cbi8qKlxuICogVXBkYXRlcyBpbnB1dCBlbGVtZW50IHdpZHRoIHRvIGZpdCBpdHMgY29udGVudCBnaXZlbiBpbnB1dCBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUlucHV0V2lkdGgoZWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgZm9udCA9IGdldEZvbnRTaG9ydGhhbmQoZWxlbWVudCk7XG4gICAgdmFyIHRleHQgPSBlbGVtZW50LnZhbHVlIHx8IGVsZW1lbnQucGxhY2Vob2xkZXI7XG4gICAgdmFyIHdpZHRoID0gbWVhc3VyZVRleHQodGV4dCwgZm9udCk7XG4gICAgaWYgKHdpZHRoID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQod2lkdGgsIFwicHhcIik7XG4gICAgcmV0dXJuIHdpZHRoO1xufVxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlSW5wdXRXaWR0aDtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBGcmFnbWVudCBhcyBfRnJhZ21lbnQsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsc3ggZnJvbSAnY2xzeCc7XG5pbXBvcnQgdXBkYXRlSW5wdXRXaWR0aCwgeyBnZXRGb250U2hvcnRoYW5kIH0gZnJvbSAndXBkYXRlLWlucHV0LXdpZHRoJztcbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xudmFyIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QgPSBpc0Jyb3dzZXIgPyB1c2VMYXlvdXRFZmZlY3QgOiB1c2VFZmZlY3Q7XG52YXIgaXNJRU9yRWRnZUxlZ2FjeSA9IGlzQnJvd3NlciAmJiAvKE1TSUV8VHJpZGVudFxcL3xFZGdlXFwvKS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbnZhciBpc0ZpcmVmb3ggPSBpc0Jyb3dzZXIgJiYgL0ZpcmVmb3gvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5mdW5jdGlvbiBvbkZvY3VzKGV2ZW50KSB7XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICBpZiAoaXNJRU9yRWRnZUxlZ2FjeSkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFyZ2V0LnNlbGVjdCgpOyB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRhcmdldC5zZWxlY3QoKTtcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVJbnB1dFdpZHRoT25Mb2FkKGVsZW1lbnQpIHtcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdXBkYXRlSW5wdXRXaWR0aChlbGVtZW50KTtcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xufVxuZnVuY3Rpb24gdXBkYXRlSW5wdXRXaWR0aE9uRm9udExvYWQoZWxlbWVudCkge1xuICAgIGlmICghZG9jdW1lbnQuZm9udHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZm9udCA9IGdldEZvbnRTaG9ydGhhbmQoZWxlbWVudCk7XG4gICAgaWYgKCFmb250KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGlzRm9udExvYWRlZCA9IGRvY3VtZW50LmZvbnRzLmNoZWNrKGZvbnQpO1xuICAgIGlmIChpc0ZvbnRMb2FkZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbkxvYWRpbmdEb25lKCkge1xuICAgICAgICB1cGRhdGVJbnB1dFdpZHRoKGVsZW1lbnQpO1xuICAgIH1cbiAgICBkb2N1bWVudC5mb250cy5hZGRFdmVudExpc3RlbmVyKCdsb2FkaW5nZG9uZScsIG9uTG9hZGluZ0RvbmUpO1xufVxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uU3RyaW5nKGlucHV0KSB7XG4gICAgLyoqXG4gICAgICogd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkgcmV0dXJucyBlbXB0eSBzdHJpbmcgaW4gSUUxMSBhbmQgRmlyZWZveCxcbiAgICAgKiBzbyBhbHRlcm5hdGl2ZXMgY29tZSBmaXJzdC5cbiAgICAgKi9cbiAgICBpZiAoaW5wdXQgJiZcbiAgICAgICAgJ3NlbGVjdGlvblN0YXJ0JyBpbiBpbnB1dCAmJlxuICAgICAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCAhPT0gbnVsbCAmJlxuICAgICAgICAnc2VsZWN0aW9uRW5kJyBpbiBpbnB1dCAmJlxuICAgICAgICBpbnB1dC5zZWxlY3Rpb25FbmQgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlLnNsaWNlKGlucHV0LnNlbGVjdGlvblN0YXJ0LCBpbnB1dC5zZWxlY3Rpb25FbmQpO1xuICAgIH1cbiAgICBpZiAoJ2dldFNlbGVjdGlvbicgaW4gd2luZG93KSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gbWFrZU9uS2V5UHJlc3MobWF4TGVuZ3RoKSB7XG4gICAgaWYgKG1heExlbmd0aCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcmV2ZW50cyBrZXlzdHJva2VzIHRoYXQgd291bGQgbm90IHByb2R1Y2UgYSBudW1iZXIgb3Igd2hlbiB2YWx1ZSBhZnRlciBrZXlzdHJva2Ugd291bGRcbiAgICAgKiBleGNlZWQgbWF4TGVuZ3RoLlxuICAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBvbktleVByZXNzKGV2ZW50KSB7XG4gICAgICAgIGlmIChpc0ZpcmVmb3gpIHtcbiAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vd29qdGVrbWFqL3JlYWN0LXRpbWUtcGlja2VyL2lzc3Vlcy85MlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXkgPSBldmVudC5rZXksIGlucHV0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB2YXIgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgdmFyIGlzTnVtYmVyS2V5ID0ga2V5Lmxlbmd0aCA9PT0gMSAmJiAvXFxkLy50ZXN0KGtleSk7XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb25TdHJpbmcoaW5wdXQpO1xuICAgICAgICBpZiAoIWlzTnVtYmVyS2V5IHx8ICEoc2VsZWN0aW9uIHx8IHZhbHVlLmxlbmd0aCA8IG1heExlbmd0aCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW5wdXQoX2EpIHtcbiAgICB2YXIgYXJpYUxhYmVsID0gX2EuYXJpYUxhYmVsLCBhdXRvRm9jdXMgPSBfYS5hdXRvRm9jdXMsIGNsYXNzTmFtZSA9IF9hLmNsYXNzTmFtZSwgZGlzYWJsZWQgPSBfYS5kaXNhYmxlZCwgaW5wdXRSZWYgPSBfYS5pbnB1dFJlZiwgbWF4ID0gX2EubWF4LCBtaW4gPSBfYS5taW4sIG5hbWUgPSBfYS5uYW1lLCBuYW1lRm9yQ2xhc3MgPSBfYS5uYW1lRm9yQ2xhc3MsIG9uQ2hhbmdlID0gX2Eub25DaGFuZ2UsIG9uS2V5RG93biA9IF9hLm9uS2V5RG93biwgb25LZXlVcCA9IF9hLm9uS2V5VXAsIF9iID0gX2EucGxhY2Vob2xkZXIsIHBsYWNlaG9sZGVyID0gX2IgPT09IHZvaWQgMCA/ICctLScgOiBfYiwgcmVxdWlyZWQgPSBfYS5yZXF1aXJlZCwgc2hvd0xlYWRpbmdaZXJvcyA9IF9hLnNob3dMZWFkaW5nWmVyb3MsIHN0ZXAgPSBfYS5zdGVwLCB2YWx1ZSA9IF9hLnZhbHVlO1xuICAgIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWlucHV0UmVmIHx8ICFpbnB1dFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlSW5wdXRXaWR0aChpbnB1dFJlZi5jdXJyZW50KTtcbiAgICAgICAgdXBkYXRlSW5wdXRXaWR0aE9uTG9hZChpbnB1dFJlZi5jdXJyZW50KTtcbiAgICAgICAgdXBkYXRlSW5wdXRXaWR0aE9uRm9udExvYWQoaW5wdXRSZWYuY3VycmVudCk7XG4gICAgfSwgW2lucHV0UmVmLCB2YWx1ZV0pO1xuICAgIHZhciBoYXNMZWFkaW5nWmVybyA9IHNob3dMZWFkaW5nWmVyb3MgJiZcbiAgICAgICAgdmFsdWUgJiZcbiAgICAgICAgTnVtYmVyKHZhbHVlKSA8IDEwICYmXG4gICAgICAgICh2YWx1ZSA9PT0gJzAnIHx8ICF2YWx1ZS50b1N0cmluZygpLnN0YXJ0c1dpdGgoJzAnKSk7XG4gICAgdmFyIG1heExlbmd0aCA9IG1heCA/IG1heC50b1N0cmluZygpLmxlbmd0aCA6IG51bGw7XG4gICAgcmV0dXJuIChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtoYXNMZWFkaW5nWmVybyA/IF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX19sZWFkaW5nWmVyb1wiKSwgY2hpbGRyZW46IFwiMFwiIH0pIDogbnVsbCwgX2pzeChcImlucHV0XCIsIHsgXCJhcmlhLWxhYmVsXCI6IGFyaWFMYWJlbCwgYXV0b0NvbXBsZXRlOiBcIm9mZlwiLCBhdXRvRm9jdXM6IGF1dG9Gb2N1cywgY2xhc3NOYW1lOiBjbHN4KFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJfX2lucHV0XCIpLCBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX19cIikuY29uY2F0KG5hbWVGb3JDbGFzcyB8fCBuYW1lKSwgaGFzTGVhZGluZ1plcm8gJiYgXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIl9faW5wdXQtLWhhc0xlYWRpbmdaZXJvXCIpKSwgXCJkYXRhLWlucHV0XCI6IFwidHJ1ZVwiLCBkaXNhYmxlZDogZGlzYWJsZWQsIGlucHV0TW9kZTogXCJudW1lcmljXCIsIG1heDogbWF4LCBtaW46IG1pbiwgbmFtZTogbmFtZSwgb25DaGFuZ2U6IG9uQ2hhbmdlLCBvbkZvY3VzOiBvbkZvY3VzLCBvbktleURvd246IG9uS2V5RG93biwgb25LZXlQcmVzczogbWFrZU9uS2V5UHJlc3MobWF4TGVuZ3RoKSwgb25LZXlVcDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUlucHV0V2lkdGgoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uS2V5VXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5VXAoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgcGxhY2Vob2xkZXI6IHBsYWNlaG9sZGVyLCBcbiAgICAgICAgICAgICAgICAvLyBBc3NlcnRpb24gaXMgbmVlZGVkIGZvciBSZWFjdCAxOCBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAgICAgcmVmOiBpbnB1dFJlZiwgcmVxdWlyZWQ6IHJlcXVpcmVkLCBzdGVwOiBzdGVwLCB0eXBlOiBcIm51bWJlclwiLCB2YWx1ZTogdmFsdWUgIT09IG51bGwgPyB2YWx1ZSA6ICcnIH0pXSB9KSk7XG59XG4iLCIvKipcbiAqIFJldHVybnMgYSB2YWx1ZSBubyBzbWFsbGVyIHRoYW4gbWluIGFuZCBubyBsYXJnZXIgdGhhbiBtYXguXG4gKlxuICogQHBhcmFtIHtEYXRlfSB2YWx1ZSBWYWx1ZSB0byByZXR1cm4uXG4gKiBAcGFyYW0ge0RhdGV9IG1pbiBNaW5pbXVtIHJldHVybiB2YWx1ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gbWF4IE1heGltdW0gcmV0dXJuIHZhbHVlLlxuICogQHJldHVybnMge0RhdGV9IFZhbHVlIGJldHdlZW4gbWluIGFuZCBtYXguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZXR3ZWVuKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIGlmIChtaW4gJiYgbWluID4gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG4gICAgaWYgKG1heCAmJiBtYXggPCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbWF4O1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiBpc1ZhbGlkTnVtYmVyKG51bSkge1xuICAgIHJldHVybiBudW0gIT09IG51bGwgJiYgbnVtICE9PSBmYWxzZSAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcihudW0pKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzYWZlTWluKCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5taW4uYXBwbHkoTWF0aCwgYXJncy5maWx0ZXIoaXNWYWxpZE51bWJlcikpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVNYXgoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBNYXRoLm1heC5hcHBseShNYXRoLCBhcmdzLmZpbHRlcihpc1ZhbGlkTnVtYmVyKSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldFllYXIsIGdldE1vbnRoSHVtYW4sIGdldERhdGUsIGdldERheXNJbk1vbnRoIH0gZnJvbSAnQHdvanRla21hai9kYXRlLXV0aWxzJztcbmltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0LmpzJztcbmltcG9ydCB7IHNhZmVNaW4sIHNhZmVNYXggfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMuanMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGF5SW5wdXQoX2EpIHtcbiAgICB2YXIgbWF4RGF0ZSA9IF9hLm1heERhdGUsIG1pbkRhdGUgPSBfYS5taW5EYXRlLCBtb250aCA9IF9hLm1vbnRoLCB5ZWFyID0gX2EueWVhciwgb3RoZXJQcm9wcyA9IF9fcmVzdChfYSwgW1wibWF4RGF0ZVwiLCBcIm1pbkRhdGVcIiwgXCJtb250aFwiLCBcInllYXJcIl0pO1xuICAgIHZhciBjdXJyZW50TW9udGhNYXhEYXlzID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFtb250aCkge1xuICAgICAgICAgICAgcmV0dXJuIDMxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnZXREYXlzSW5Nb250aChuZXcgRGF0ZShOdW1iZXIoeWVhciksIE51bWJlcihtb250aCkgLSAxLCAxKSk7XG4gICAgfSkoKTtcbiAgICBmdW5jdGlvbiBpc1NhbWVNb250aChkYXRlKSB7XG4gICAgICAgIHJldHVybiB5ZWFyID09PSBnZXRZZWFyKGRhdGUpLnRvU3RyaW5nKCkgJiYgbW9udGggPT09IGdldE1vbnRoSHVtYW4oZGF0ZSkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdmFyIG1heERheSA9IHNhZmVNaW4oY3VycmVudE1vbnRoTWF4RGF5cywgbWF4RGF0ZSAmJiBpc1NhbWVNb250aChtYXhEYXRlKSAmJiBnZXREYXRlKG1heERhdGUpKTtcbiAgICB2YXIgbWluRGF5ID0gc2FmZU1heCgxLCBtaW5EYXRlICYmIGlzU2FtZU1vbnRoKG1pbkRhdGUpICYmIGdldERhdGUobWluRGF0ZSkpO1xuICAgIHJldHVybiBfanN4KElucHV0LCBfX2Fzc2lnbih7IG1heDogbWF4RGF5LCBtaW46IG1pbkRheSwgbmFtZTogXCJkYXlcIiB9LCBvdGhlclByb3BzKSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldFllYXIsIGdldE1vbnRoSHVtYW4gfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQuanMnO1xuaW1wb3J0IHsgc2FmZU1pbiwgc2FmZU1heCB9IGZyb20gJy4uL3NoYXJlZC91dGlscy5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNb250aElucHV0KF9hKSB7XG4gICAgdmFyIG1heERhdGUgPSBfYS5tYXhEYXRlLCBtaW5EYXRlID0gX2EubWluRGF0ZSwgeWVhciA9IF9hLnllYXIsIG90aGVyUHJvcHMgPSBfX3Jlc3QoX2EsIFtcIm1heERhdGVcIiwgXCJtaW5EYXRlXCIsIFwieWVhclwiXSk7XG4gICAgZnVuY3Rpb24gaXNTYW1lWWVhcihkYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlICYmIHllYXIgPT09IGdldFllYXIoZGF0ZSkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdmFyIG1heE1vbnRoID0gc2FmZU1pbigxMiwgbWF4RGF0ZSAmJiBpc1NhbWVZZWFyKG1heERhdGUpICYmIGdldE1vbnRoSHVtYW4obWF4RGF0ZSkpO1xuICAgIHZhciBtaW5Nb250aCA9IHNhZmVNYXgoMSwgbWluRGF0ZSAmJiBpc1NhbWVZZWFyKG1pbkRhdGUpICYmIGdldE1vbnRoSHVtYW4obWluRGF0ZSkpO1xuICAgIHJldHVybiBfanN4KElucHV0LCBfX2Fzc2lnbih7IG1heDogbWF4TW9udGgsIG1pbjogbWluTW9udGgsIG5hbWU6IFwibW9udGhcIiB9LCBvdGhlclByb3BzKSk7XG59XG4iLCJpbXBvcnQgZ2V0VXNlckxvY2FsZSBmcm9tICdnZXQtdXNlci1sb2NhbGUnO1xudmFyIGZvcm1hdHRlckNhY2hlID0gbmV3IE1hcCgpO1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1hdHRlcihvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZvcm1hdHRlcihsb2NhbGUsIGRhdGUpIHtcbiAgICAgICAgdmFyIGxvY2FsZVdpdGhEZWZhdWx0ID0gbG9jYWxlIHx8IGdldFVzZXJMb2NhbGUoKTtcbiAgICAgICAgaWYgKCFmb3JtYXR0ZXJDYWNoZS5oYXMobG9jYWxlV2l0aERlZmF1bHQpKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZXJDYWNoZS5zZXQobG9jYWxlV2l0aERlZmF1bHQsIG5ldyBNYXAoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZvcm1hdHRlckNhY2hlTG9jYWxlID0gZm9ybWF0dGVyQ2FjaGUuZ2V0KGxvY2FsZVdpdGhEZWZhdWx0KTtcbiAgICAgICAgaWYgKCFmb3JtYXR0ZXJDYWNoZUxvY2FsZS5oYXMob3B0aW9ucykpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlckNhY2hlTG9jYWxlLnNldChvcHRpb25zLCBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGVXaXRoRGVmYXVsdCB8fCB1bmRlZmluZWQsIG9wdGlvbnMpLmZvcm1hdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlckNhY2hlTG9jYWxlLmdldChvcHRpb25zKShkYXRlKTtcbiAgICB9O1xufVxuLyoqXG4gKiBDaGFuZ2VzIHRoZSBob3VyIGluIGEgRGF0ZSB0byBlbnN1cmUgcmlnaHQgZGF0ZSBmb3JtYXR0aW5nIGV2ZW4gaWYgRFNUIGlzIG1lc3NlZCB1cC5cbiAqIFdvcmthcm91bmQgZm9yIGJ1ZyBpbiBXZWJLaXQgYW5kIEZpcmVmb3ggd2l0aCBoaXN0b3JpY2FsIGRhdGVzLlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlOlxuICogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NzUwNDY1XG4gKiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzg1NjQzXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gRGF0ZSB3aXRoIGhvdXIgc2V0IHRvIDEyLlxuICovXG5mdW5jdGlvbiB0b1NhZmVIb3VyKGRhdGUpIHtcbiAgICB2YXIgc2FmZURhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICByZXR1cm4gbmV3IERhdGUoc2FmZURhdGUuc2V0SG91cnMoMTIpKTtcbn1cbmZ1bmN0aW9uIGdldFNhZmVGb3JtYXR0ZXIob3B0aW9ucykge1xuICAgIHJldHVybiBmdW5jdGlvbiAobG9jYWxlLCBkYXRlKSB7IHJldHVybiBnZXRGb3JtYXR0ZXIob3B0aW9ucykobG9jYWxlLCB0b1NhZmVIb3VyKGRhdGUpKTsgfTtcbn1cbnZhciBmb3JtYXRNb250aE9wdGlvbnMgPSB7IG1vbnRoOiAnbG9uZycgfTtcbnZhciBmb3JtYXRTaG9ydE1vbnRoT3B0aW9ucyA9IHsgbW9udGg6ICdzaG9ydCcgfTtcbmV4cG9ydCB2YXIgZm9ybWF0TW9udGggPSBnZXRTYWZlRm9ybWF0dGVyKGZvcm1hdE1vbnRoT3B0aW9ucyk7XG5leHBvcnQgdmFyIGZvcm1hdFNob3J0TW9udGggPSBnZXRTYWZlRm9ybWF0dGVyKGZvcm1hdFNob3J0TW9udGhPcHRpb25zKTtcbiIsInZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmltcG9ydCB7IGdldFllYXIsIGdldE1vbnRoSHVtYW4gfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IHsgZm9ybWF0TW9udGgsIGZvcm1hdFNob3J0TW9udGggfSBmcm9tICcuLi9zaGFyZWQvZGF0ZUZvcm1hdHRlci5qcyc7XG5pbXBvcnQgeyBzYWZlTWluLCBzYWZlTWF4IH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzLmpzJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1vbnRoU2VsZWN0KF9hKSB7XG4gICAgdmFyIGFyaWFMYWJlbCA9IF9hLmFyaWFMYWJlbCwgYXV0b0ZvY3VzID0gX2EuYXV0b0ZvY3VzLCBjbGFzc05hbWUgPSBfYS5jbGFzc05hbWUsIGRpc2FibGVkID0gX2EuZGlzYWJsZWQsIGlucHV0UmVmID0gX2EuaW5wdXRSZWYsIGxvY2FsZSA9IF9hLmxvY2FsZSwgbWF4RGF0ZSA9IF9hLm1heERhdGUsIG1pbkRhdGUgPSBfYS5taW5EYXRlLCBvbkNoYW5nZSA9IF9hLm9uQ2hhbmdlLCBvbktleURvd24gPSBfYS5vbktleURvd24sIF9iID0gX2EucGxhY2Vob2xkZXIsIHBsYWNlaG9sZGVyID0gX2IgPT09IHZvaWQgMCA/ICctLScgOiBfYiwgcmVxdWlyZWQgPSBfYS5yZXF1aXJlZCwgc2hvcnQgPSBfYS5zaG9ydCwgdmFsdWUgPSBfYS52YWx1ZSwgeWVhciA9IF9hLnllYXI7XG4gICAgZnVuY3Rpb24gaXNTYW1lWWVhcihkYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlICYmIHllYXIgPT09IGdldFllYXIoZGF0ZSkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdmFyIG1heE1vbnRoID0gc2FmZU1pbigxMiwgbWF4RGF0ZSAmJiBpc1NhbWVZZWFyKG1heERhdGUpICYmIGdldE1vbnRoSHVtYW4obWF4RGF0ZSkpO1xuICAgIHZhciBtaW5Nb250aCA9IHNhZmVNYXgoMSwgbWluRGF0ZSAmJiBpc1NhbWVZZWFyKG1pbkRhdGUpICYmIGdldE1vbnRoSHVtYW4obWluRGF0ZSkpO1xuICAgIHZhciBkYXRlcyA9IF9fc3ByZWFkQXJyYXkoW10sIEFycmF5KDEyKSwgdHJ1ZSkubWFwKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHsgcmV0dXJuIG5ldyBEYXRlKDIwMTksIGluZGV4LCAxKTsgfSk7XG4gICAgdmFyIG5hbWUgPSAnbW9udGgnO1xuICAgIHZhciBmb3JtYXR0ZXIgPSBzaG9ydCA/IGZvcm1hdFNob3J0TW9udGggOiBmb3JtYXRNb250aDtcbiAgICByZXR1cm4gKF9qc3hzKFwic2VsZWN0XCIsIHsgXCJhcmlhLWxhYmVsXCI6IGFyaWFMYWJlbCwgYXV0b0ZvY3VzOiBhdXRvRm9jdXMsIGNsYXNzTmFtZTogY2xzeChcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX19pbnB1dFwiKSwgXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIl9fXCIpLmNvbmNhdChuYW1lKSksIFwiZGF0YS1pbnB1dFwiOiBcInRydWVcIiwgXCJkYXRhLXNlbGVjdFwiOiBcInRydWVcIiwgZGlzYWJsZWQ6IGRpc2FibGVkLCBuYW1lOiBuYW1lLCBvbkNoYW5nZTogb25DaGFuZ2UsIG9uS2V5RG93bjogb25LZXlEb3duLCBcbiAgICAgICAgLy8gQXNzZXJ0aW9uIGlzIG5lZWRlZCBmb3IgUmVhY3QgMTggY29tcGF0aWJpbGl0eVxuICAgICAgICByZWY6IGlucHV0UmVmLCByZXF1aXJlZDogcmVxdWlyZWQsIHZhbHVlOiB2YWx1ZSAhPT0gbnVsbCA/IHZhbHVlIDogJycsIGNoaWxkcmVuOiBbIXZhbHVlICYmIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJcIiwgY2hpbGRyZW46IHBsYWNlaG9sZGVyIH0pLCBkYXRlcy5tYXAoZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9udGggPSBnZXRNb250aEh1bWFuKGRhdGUpO1xuICAgICAgICAgICAgICAgIHZhciBkaXNhYmxlZCA9IG1vbnRoIDwgbWluTW9udGggfHwgbW9udGggPiBtYXhNb250aDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9qc3goXCJvcHRpb25cIiwgeyBkaXNhYmxlZDogZGlzYWJsZWQsIHZhbHVlOiBtb250aCwgY2hpbGRyZW46IGZvcm1hdHRlcihsb2NhbGUsIGRhdGUpIH0sIG1vbnRoKSk7XG4gICAgICAgICAgICB9KV0gfSkpO1xufVxuIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSAnQHdvanRla21hai9kYXRlLXV0aWxzJztcbmltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0LmpzJztcbmltcG9ydCB7IHNhZmVNYXgsIHNhZmVNaW4gfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMuanMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gWWVhcklucHV0KF9hKSB7XG4gICAgdmFyIG1heERhdGUgPSBfYS5tYXhEYXRlLCBtaW5EYXRlID0gX2EubWluRGF0ZSwgX2IgPSBfYS5wbGFjZWhvbGRlciwgcGxhY2Vob2xkZXIgPSBfYiA9PT0gdm9pZCAwID8gJy0tLS0nIDogX2IsIHZhbHVlVHlwZSA9IF9hLnZhbHVlVHlwZSwgb3RoZXJQcm9wcyA9IF9fcmVzdChfYSwgW1wibWF4RGF0ZVwiLCBcIm1pbkRhdGVcIiwgXCJwbGFjZWhvbGRlclwiLCBcInZhbHVlVHlwZVwiXSk7XG4gICAgdmFyIG1heFllYXIgPSBzYWZlTWluKDI3NTc2MCwgbWF4RGF0ZSAmJiBnZXRZZWFyKG1heERhdGUpKTtcbiAgICB2YXIgbWluWWVhciA9IHNhZmVNYXgoMSwgbWluRGF0ZSAmJiBnZXRZZWFyKG1pbkRhdGUpKTtcbiAgICB2YXIgeWVhclN0ZXAgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodmFsdWVUeXBlID09PSAnY2VudHVyeScpIHtcbiAgICAgICAgICAgIHJldHVybiAxMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9KSgpO1xuICAgIHJldHVybiAoX2pzeChJbnB1dCwgX19hc3NpZ24oeyBtYXg6IG1heFllYXIsIG1pbjogbWluWWVhciwgbmFtZTogXCJ5ZWFyXCIsIHBsYWNlaG9sZGVyOiBwbGFjZWhvbGRlciwgc3RlcDogeWVhclN0ZXAgfSwgb3RoZXJQcm9wcykpKTtcbn1cbiIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBnZXRZZWFyLCBnZXRJU09Mb2NhbERhdGUsIGdldElTT0xvY2FsTW9udGggfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmF0aXZlSW5wdXQoX2EpIHtcbiAgICB2YXIgYXJpYUxhYmVsID0gX2EuYXJpYUxhYmVsLCBkaXNhYmxlZCA9IF9hLmRpc2FibGVkLCBtYXhEYXRlID0gX2EubWF4RGF0ZSwgbWluRGF0ZSA9IF9hLm1pbkRhdGUsIG5hbWUgPSBfYS5uYW1lLCBvbkNoYW5nZSA9IF9hLm9uQ2hhbmdlLCByZXF1aXJlZCA9IF9hLnJlcXVpcmVkLCB2YWx1ZSA9IF9hLnZhbHVlLCB2YWx1ZVR5cGUgPSBfYS52YWx1ZVR5cGU7XG4gICAgdmFyIG5hdGl2ZUlucHV0VHlwZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAodmFsdWVUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbW9udGgnO1xuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWVUeXBlJyk7XG4gICAgICAgIH1cbiAgICB9KSgpO1xuICAgIHZhciBuYXRpdmVWYWx1ZVBhcnNlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAodmFsdWVUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFllYXI7XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldElTT0xvY2FsTW9udGg7XG4gICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRJU09Mb2NhbERhdGU7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZVR5cGUnKTtcbiAgICAgICAgfVxuICAgIH0pKCk7XG4gICAgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICByZXR1cm4gKF9qc3goXCJpbnB1dFwiLCB7IFwiYXJpYS1sYWJlbFwiOiBhcmlhTGFiZWwsIGRpc2FibGVkOiBkaXNhYmxlZCwgaGlkZGVuOiB0cnVlLCBtYXg6IG1heERhdGUgPyBuYXRpdmVWYWx1ZVBhcnNlcihtYXhEYXRlKSA6IHVuZGVmaW5lZCwgbWluOiBtaW5EYXRlID8gbmF0aXZlVmFsdWVQYXJzZXIobWluRGF0ZSkgOiB1bmRlZmluZWQsIG5hbWU6IG5hbWUsIG9uQ2hhbmdlOiBvbkNoYW5nZSwgb25Gb2N1czogc3RvcFByb3BhZ2F0aW9uLCByZXF1aXJlZDogcmVxdWlyZWQsIHN0eWxlOiB7XG4gICAgICAgICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgekluZGV4OiAnLTk5OScsXG4gICAgICAgIH0sIHR5cGU6IG5hdGl2ZUlucHV0VHlwZSwgdmFsdWU6IHZhbHVlID8gbmF0aXZlVmFsdWVQYXJzZXIodmFsdWUpIDogJycgfSkpO1xufVxuIiwiaW1wb3J0IHsgZ2V0RGVjYWRlU3RhcnQsIGdldERlY2FkZUVuZCwgZ2V0WWVhclN0YXJ0LCBnZXRZZWFyRW5kLCBnZXRNb250aFN0YXJ0LCBnZXRNb250aEVuZCwgZ2V0RGF5U3RhcnQsIGdldERheUVuZCwgfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBiZWdpbm5pbmcgb2YgYSBnaXZlbiByYW5nZS5cbiAqXG4gKiBAcGFyYW0ge1JhbmdlVHlwZX0gcmFuZ2VUeXBlIFJhbmdlIHR5cGUgKGUuZy4gJ2RheScpXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEJlZ2luKHJhbmdlVHlwZSwgZGF0ZSkge1xuICAgIHN3aXRjaCAocmFuZ2VUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0RGVjYWRlU3RhcnQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgcmV0dXJuIGdldFllYXJTdGFydChkYXRlKTtcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgcmV0dXJuIGdldE1vbnRoU3RhcnQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0RGF5U3RhcnQoZGF0ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJhbmdlVHlwZTogXCIuY29uY2F0KHJhbmdlVHlwZSkpO1xuICAgIH1cbn1cbi8qKlxuICogUmV0dXJucyB0aGUgZW5kIG9mIGEgZ2l2ZW4gcmFuZ2UuXG4gKlxuICogQHBhcmFtIHtSYW5nZVR5cGV9IHJhbmdlVHlwZSBSYW5nZSB0eXBlIChlLmcuICdkYXknKVxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmQocmFuZ2VUeXBlLCBkYXRlKSB7XG4gICAgc3dpdGNoIChyYW5nZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnZGVjYWRlJzpcbiAgICAgICAgICAgIHJldHVybiBnZXREZWNhZGVFbmQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgcmV0dXJuIGdldFllYXJFbmQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRNb250aEVuZChkYXRlKTtcbiAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIHJldHVybiBnZXREYXlFbmQoZGF0ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJhbmdlVHlwZTogXCIuY29uY2F0KHJhbmdlVHlwZSkpO1xuICAgIH1cbn1cbiIsIid1c2UgY2xpZW50JztcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0WWVhciwgZ2V0TW9udGhIdW1hbiwgZ2V0RGF0ZSB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5pbXBvcnQgRGl2aWRlciBmcm9tICcuL0RpdmlkZXIuanMnO1xuaW1wb3J0IERheUlucHV0IGZyb20gJy4vRGF0ZUlucHV0L0RheUlucHV0LmpzJztcbmltcG9ydCBNb250aElucHV0IGZyb20gJy4vRGF0ZUlucHV0L01vbnRoSW5wdXQuanMnO1xuaW1wb3J0IE1vbnRoU2VsZWN0IGZyb20gJy4vRGF0ZUlucHV0L01vbnRoU2VsZWN0LmpzJztcbmltcG9ydCBZZWFySW5wdXQgZnJvbSAnLi9EYXRlSW5wdXQvWWVhcklucHV0LmpzJztcbmltcG9ydCBOYXRpdmVJbnB1dCBmcm9tICcuL0RhdGVJbnB1dC9OYXRpdmVJbnB1dC5qcyc7XG5pbXBvcnQgeyBnZXRGb3JtYXR0ZXIgfSBmcm9tICcuL3NoYXJlZC9kYXRlRm9ybWF0dGVyLmpzJztcbmltcG9ydCB7IGdldEJlZ2luLCBnZXRFbmQgfSBmcm9tICcuL3NoYXJlZC9kYXRlcy5qcyc7XG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi9zaGFyZWQvdXRpbHMuanMnO1xudmFyIGdldEZvcm1hdHRlck9wdGlvbnNDYWNoZSA9IHt9O1xudmFyIGRlZmF1bHRNaW5EYXRlID0gbmV3IERhdGUoKTtcbmRlZmF1bHRNaW5EYXRlLnNldEZ1bGxZZWFyKDEsIDAsIDEpO1xuZGVmYXVsdE1pbkRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG52YXIgZGVmYXVsdE1heERhdGUgPSBuZXcgRGF0ZSg4LjY0ZTE1KTtcbnZhciBhbGxWaWV3cyA9IFsnY2VudHVyeScsICdkZWNhZGUnLCAneWVhcicsICdtb250aCddO1xudmFyIGFsbFZhbHVlVHlwZXMgPSBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIGFsbFZpZXdzLnNsaWNlKDEpLCB0cnVlKSwgWydkYXknXSwgZmFsc2UpO1xuZnVuY3Rpb24gdG9EYXRlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XG59XG4vKipcbiAqIFJldHVybnMgdmFsdWUgdHlwZSB0aGF0IGNhbiBiZSByZXR1cm5lZCB3aXRoIGN1cnJlbnRseSBhcHBsaWVkIHNldHRpbmdzLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZVR5cGUodmlldykge1xuICAgIHZhciBpbmRleCA9IGFsbFZpZXdzLmluZGV4T2Yodmlldyk7XG4gICAgcmV0dXJuIGFsbFZhbHVlVHlwZXNbaW5kZXhdO1xufVxuZnVuY3Rpb24gZ2V0VmFsdWUodmFsdWUsIGluZGV4KSB7XG4gICAgdmFyIHJhd1ZhbHVlID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZVtpbmRleF0gOiB2YWx1ZTtcbiAgICBpZiAoIXJhd1ZhbHVlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgdmFsdWVEYXRlID0gdG9EYXRlKHJhd1ZhbHVlKTtcbiAgICBpZiAoaXNOYU4odmFsdWVEYXRlLmdldFRpbWUoKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlOiBcIi5jb25jYXQodmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlRGF0ZTtcbn1cbmZ1bmN0aW9uIGdldERldGFpbFZhbHVlKF9hLCBpbmRleCkge1xuICAgIHZhciB2YWx1ZSA9IF9hLnZhbHVlLCBtaW5EYXRlID0gX2EubWluRGF0ZSwgbWF4RGF0ZSA9IF9hLm1heERhdGUsIG1heERldGFpbCA9IF9hLm1heERldGFpbDtcbiAgICB2YXIgdmFsdWVQaWVjZSA9IGdldFZhbHVlKHZhbHVlLCBpbmRleCk7XG4gICAgaWYgKCF2YWx1ZVBpZWNlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgdmFsdWVUeXBlID0gZ2V0VmFsdWVUeXBlKG1heERldGFpbCk7XG4gICAgdmFyIGRldGFpbFZhbHVlRnJvbSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QmVnaW4odmFsdWVUeXBlLCB2YWx1ZVBpZWNlKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RW5kKHZhbHVlVHlwZSwgdmFsdWVQaWVjZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5kZXggdmFsdWU6IFwiLmNvbmNhdChpbmRleCkpO1xuICAgICAgICB9XG4gICAgfSkoKTtcbiAgICByZXR1cm4gYmV0d2VlbihkZXRhaWxWYWx1ZUZyb20sIG1pbkRhdGUsIG1heERhdGUpO1xufVxudmFyIGdldERldGFpbFZhbHVlRnJvbSA9IGZ1bmN0aW9uIChhcmdzKSB7IHJldHVybiBnZXREZXRhaWxWYWx1ZShhcmdzLCAwKTsgfTtcbnZhciBnZXREZXRhaWxWYWx1ZVRvID0gZnVuY3Rpb24gKGFyZ3MpIHsgcmV0dXJuIGdldERldGFpbFZhbHVlKGFyZ3MsIDEpOyB9O1xudmFyIGdldERldGFpbFZhbHVlQXJyYXkgPSBmdW5jdGlvbiAoYXJncykge1xuICAgIHJldHVybiBbZ2V0RGV0YWlsVmFsdWVGcm9tLCBnZXREZXRhaWxWYWx1ZVRvXS5tYXAoZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbihhcmdzKTsgfSk7XG59O1xuZnVuY3Rpb24gaXNJbnRlcm5hbElucHV0KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5kYXRhc2V0LmlucHV0ID09PSAndHJ1ZSc7XG59XG5mdW5jdGlvbiBmaW5kSW5wdXQoZWxlbWVudCwgcHJvcGVydHkpIHtcbiAgICB2YXIgbmV4dEVsZW1lbnQgPSBlbGVtZW50O1xuICAgIGRvIHtcbiAgICAgICAgbmV4dEVsZW1lbnQgPSBuZXh0RWxlbWVudFtwcm9wZXJ0eV07XG4gICAgfSB3aGlsZSAobmV4dEVsZW1lbnQgJiYgIWlzSW50ZXJuYWxJbnB1dChuZXh0RWxlbWVudCkpO1xuICAgIHJldHVybiBuZXh0RWxlbWVudDtcbn1cbmZ1bmN0aW9uIGZvY3VzKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyQ3VzdG9tSW5wdXRzKHBsYWNlaG9sZGVyLCBlbGVtZW50RnVuY3Rpb25zLCBhbGxvd011bHRpcGxlSW5zdGFuY2VzKSB7XG4gICAgdmFyIHVzZWRGdW5jdGlvbnMgPSBbXTtcbiAgICB2YXIgcGF0dGVybiA9IG5ldyBSZWdFeHAoT2JqZWN0LmtleXMoZWxlbWVudEZ1bmN0aW9ucylcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIFwiXCIuY29uY2F0KGVsLCBcIitcIik7IH0pXG4gICAgICAgIC5qb2luKCd8JyksICdnJyk7XG4gICAgdmFyIG1hdGNoZXMgPSBwbGFjZWhvbGRlci5tYXRjaChwYXR0ZXJuKTtcbiAgICByZXR1cm4gcGxhY2Vob2xkZXIuc3BsaXQocGF0dGVybikucmVkdWNlKGZ1bmN0aW9uIChhcnIsIGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICAgIHZhciBkaXZpZGVyID0gZWxlbWVudCAmJiAoXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcbiAgICAgICAgX2pzeChEaXZpZGVyLCB7IGNoaWxkcmVuOiBlbGVtZW50IH0sIFwic2VwYXJhdG9yX1wiLmNvbmNhdChpbmRleCkpKTtcbiAgICAgICAgYXJyLnB1c2goZGl2aWRlcik7XG4gICAgICAgIHZhciBjdXJyZW50TWF0Y2ggPSBtYXRjaGVzICYmIG1hdGNoZXNbaW5kZXhdO1xuICAgICAgICBpZiAoY3VycmVudE1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgcmVuZGVyRnVuY3Rpb24gPSBlbGVtZW50RnVuY3Rpb25zW2N1cnJlbnRNYXRjaF0gfHxcbiAgICAgICAgICAgICAgICBlbGVtZW50RnVuY3Rpb25zW09iamVjdC5rZXlzKGVsZW1lbnRGdW5jdGlvbnMpLmZpbmQoZnVuY3Rpb24gKGVsZW1lbnRGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudE1hdGNoLm1hdGNoKGVsZW1lbnRGdW5jdGlvbik7XG4gICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgaWYgKCFyZW5kZXJGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFsbG93TXVsdGlwbGVJbnN0YW5jZXMgJiYgdXNlZEZ1bmN0aW9ucy5pbmNsdWRlcyhyZW5kZXJGdW5jdGlvbikpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChjdXJyZW50TWF0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2gocmVuZGVyRnVuY3Rpb24oY3VycmVudE1hdGNoLCBpbmRleCkpO1xuICAgICAgICAgICAgICAgIHVzZWRGdW5jdGlvbnMucHVzaChyZW5kZXJGdW5jdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9LCBbXSk7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXRlSW5wdXQoX2EpIHtcbiAgICB2YXIgYXV0b0ZvY3VzID0gX2EuYXV0b0ZvY3VzLCBjbGFzc05hbWUgPSBfYS5jbGFzc05hbWUsIGRheUFyaWFMYWJlbCA9IF9hLmRheUFyaWFMYWJlbCwgZGF5UGxhY2Vob2xkZXIgPSBfYS5kYXlQbGFjZWhvbGRlciwgZGlzYWJsZWQgPSBfYS5kaXNhYmxlZCwgZm9ybWF0ID0gX2EuZm9ybWF0LCBfYiA9IF9hLmlzQ2FsZW5kYXJPcGVuLCBpc0NhbGVuZGFyT3BlblByb3BzID0gX2IgPT09IHZvaWQgMCA/IG51bGwgOiBfYiwgbG9jYWxlID0gX2EubG9jYWxlLCBtYXhEYXRlID0gX2EubWF4RGF0ZSwgX2MgPSBfYS5tYXhEZXRhaWwsIG1heERldGFpbCA9IF9jID09PSB2b2lkIDAgPyAnbW9udGgnIDogX2MsIG1pbkRhdGUgPSBfYS5taW5EYXRlLCBtb250aEFyaWFMYWJlbCA9IF9hLm1vbnRoQXJpYUxhYmVsLCBtb250aFBsYWNlaG9sZGVyID0gX2EubW9udGhQbGFjZWhvbGRlciwgX2QgPSBfYS5uYW1lLCBuYW1lID0gX2QgPT09IHZvaWQgMCA/ICdkYXRlJyA6IF9kLCBuYXRpdmVJbnB1dEFyaWFMYWJlbCA9IF9hLm5hdGl2ZUlucHV0QXJpYUxhYmVsLCBvbkNoYW5nZVByb3BzID0gX2Eub25DaGFuZ2UsIG9uSW52YWxpZENoYW5nZSA9IF9hLm9uSW52YWxpZENoYW5nZSwgcmVxdWlyZWQgPSBfYS5yZXF1aXJlZCwgX2UgPSBfYS5yZXR1cm5WYWx1ZSwgcmV0dXJuVmFsdWUgPSBfZSA9PT0gdm9pZCAwID8gJ3N0YXJ0JyA6IF9lLCBzaG93TGVhZGluZ1plcm9zID0gX2Euc2hvd0xlYWRpbmdaZXJvcywgdmFsdWVQcm9wcyA9IF9hLnZhbHVlLCB5ZWFyQXJpYUxhYmVsID0gX2EueWVhckFyaWFMYWJlbCwgeWVhclBsYWNlaG9sZGVyID0gX2EueWVhclBsYWNlaG9sZGVyO1xuICAgIHZhciBfZiA9IHVzZVN0YXRlKG51bGwpLCB5ZWFyID0gX2ZbMF0sIHNldFllYXIgPSBfZlsxXTtcbiAgICB2YXIgX2cgPSB1c2VTdGF0ZShudWxsKSwgbW9udGggPSBfZ1swXSwgc2V0TW9udGggPSBfZ1sxXTtcbiAgICB2YXIgX2ggPSB1c2VTdGF0ZShudWxsKSwgZGF5ID0gX2hbMF0sIHNldERheSA9IF9oWzFdO1xuICAgIHZhciBfaiA9IHVzZVN0YXRlKG51bGwpLCB2YWx1ZSA9IF9qWzBdLCBzZXRWYWx1ZSA9IF9qWzFdO1xuICAgIHZhciB5ZWFySW5wdXQgPSB1c2VSZWYobnVsbCk7XG4gICAgdmFyIG1vbnRoSW5wdXQgPSB1c2VSZWYobnVsbCk7XG4gICAgdmFyIG1vbnRoU2VsZWN0ID0gdXNlUmVmKG51bGwpO1xuICAgIHZhciBkYXlJbnB1dCA9IHVzZVJlZihudWxsKTtcbiAgICB2YXIgX2sgPSB1c2VTdGF0ZShpc0NhbGVuZGFyT3BlblByb3BzKSwgaXNDYWxlbmRhck9wZW4gPSBfa1swXSwgc2V0SXNDYWxlbmRhck9wZW4gPSBfa1sxXTtcbiAgICB2YXIgbGFzdFByZXNzZWRLZXkgPSB1c2VSZWYodW5kZWZpbmVkKTtcbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRJc0NhbGVuZGFyT3Blbihpc0NhbGVuZGFyT3BlblByb3BzKTtcbiAgICB9LCBbaXNDYWxlbmRhck9wZW5Qcm9wc10pO1xuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZXh0VmFsdWUgPSBnZXREZXRhaWxWYWx1ZUZyb20oe1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlUHJvcHMsXG4gICAgICAgICAgICBtaW5EYXRlOiBtaW5EYXRlLFxuICAgICAgICAgICAgbWF4RGF0ZTogbWF4RGF0ZSxcbiAgICAgICAgICAgIG1heERldGFpbDogbWF4RGV0YWlsLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5leHRWYWx1ZSkge1xuICAgICAgICAgICAgc2V0WWVhcihnZXRZZWFyKG5leHRWYWx1ZSkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBzZXRNb250aChnZXRNb250aEh1bWFuKG5leHRWYWx1ZSkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBzZXREYXkoZ2V0RGF0ZShuZXh0VmFsdWUpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgc2V0VmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldFllYXIobnVsbCk7XG4gICAgICAgICAgICBzZXRNb250aChudWxsKTtcbiAgICAgICAgICAgIHNldERheShudWxsKTtcbiAgICAgICAgICAgIHNldFZhbHVlKG51bGwpO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICB2YWx1ZVByb3BzLFxuICAgICAgICBtaW5EYXRlLFxuICAgICAgICBtYXhEYXRlLFxuICAgICAgICBtYXhEZXRhaWwsXG4gICAgICAgIC8vIFRvZ2dsaW5nIGNhbGVuZGFyIHZpc2liaWxpdHkgcmVzZXRzIHZhbHVlc1xuICAgICAgICBpc0NhbGVuZGFyT3BlbixcbiAgICBdKTtcbiAgICB2YXIgdmFsdWVUeXBlID0gZ2V0VmFsdWVUeXBlKG1heERldGFpbCk7XG4gICAgdmFyIGZvcm1hdERhdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGV2ZWwgPSBhbGxWaWV3cy5pbmRleE9mKG1heERldGFpbCk7XG4gICAgICAgIHZhciBmb3JtYXR0ZXJPcHRpb25zID0gZ2V0Rm9ybWF0dGVyT3B0aW9uc0NhY2hlW2xldmVsXSB8fFxuICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHsgeWVhcjogJ251bWVyaWMnIH07XG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID49IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5tb250aCA9ICdudW1lcmljJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID49IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXkgPSAnbnVtZXJpYyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdldEZvcm1hdHRlck9wdGlvbnNDYWNoZVtsZXZlbF0gPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgcmV0dXJuIGdldEZvcm1hdHRlcihmb3JtYXR0ZXJPcHRpb25zKTtcbiAgICB9KSgpO1xuICAgIC8qKlxuICAgICAqIEdldHMgY3VycmVudCB2YWx1ZSBpbiBhIGRlc2lyZWQgZm9ybWF0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFByb2Nlc3NlZFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHZhciBwcm9jZXNzRnVuY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3dpdGNoIChyZXR1cm5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldERldGFpbFZhbHVlRnJvbTtcbiAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGV0YWlsVmFsdWVUbztcbiAgICAgICAgICAgICAgICBjYXNlICdyYW5nZSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXREZXRhaWxWYWx1ZUFycmF5O1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCByZXR1cm5WYWx1ZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NGdW5jdGlvbih7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBtaW5EYXRlOiBtaW5EYXRlLFxuICAgICAgICAgICAgbWF4RGF0ZTogbWF4RGF0ZSxcbiAgICAgICAgICAgIG1heERldGFpbDogbWF4RGV0YWlsLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHBsYWNlaG9sZGVyID0gZm9ybWF0IHx8XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgeWVhciA9IDIwMTc7XG4gICAgICAgICAgICB2YXIgbW9udGhJbmRleCA9IDExO1xuICAgICAgICAgICAgdmFyIGRheSA9IDExO1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aEluZGV4LCBkYXkpO1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZERhdGUgPSBmb3JtYXREYXRlKGxvY2FsZSwgZGF0ZSk7XG4gICAgICAgICAgICB2YXIgZGF0ZVBpZWNlcyA9IFsneWVhcicsICdtb250aCcsICdkYXknXTtcbiAgICAgICAgICAgIHZhciBkYXRlUGllY2VSZXBsYWNlbWVudHMgPSBbJ3knLCAnTScsICdkJ107XG4gICAgICAgICAgICBmdW5jdGlvbiBmb3JtYXREYXRlUGllY2UobmFtZSwgZGF0ZVRvRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdHRlck9wdGlvbnMgPSBnZXRGb3JtYXR0ZXJPcHRpb25zQ2FjaGVbbmFtZV0gfHxcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gKF9hID0ge30sIF9hW25hbWVdID0gJ251bWVyaWMnLCBfYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGb3JtYXR0ZXJPcHRpb25zQ2FjaGVbbmFtZV0gPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEZvcm1hdHRlcihmb3JtYXR0ZXJPcHRpb25zKShsb2NhbGUsIGRhdGVUb0Zvcm1hdCkubWF0Y2goL1xcZHsxLH0vKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IGZvcm1hdHRlZERhdGU7XG4gICAgICAgICAgICBkYXRlUGllY2VzLmZvckVhY2goZnVuY3Rpb24gKGRhdGVQaWVjZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBmb3JtYXREYXRlUGllY2UoZGF0ZVBpZWNlLCBkYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1hdHRlZERhdGVQaWVjZSA9IG1hdGNoWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZVBpZWNlUmVwbGFjZW1lbnQgPSBkYXRlUGllY2VSZXBsYWNlbWVudHNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyLnJlcGxhY2UoZm9ybWF0dGVkRGF0ZVBpZWNlLCBkYXRlUGllY2VSZXBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS93b2p0ZWttYWovcmVhY3QtZGF0ZS1waWNrZXIvaXNzdWVzLzM5NlxuICAgICAgICAgICAgcGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlci5yZXBsYWNlKCcxNycsICd5Jyk7XG4gICAgICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gICAgICAgIH0pKCk7XG4gICAgdmFyIGRpdmlkZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGl2aWRlcnMgPSBwbGFjZWhvbGRlci5tYXRjaCgvW14wLTlhLXpdL2kpO1xuICAgICAgICByZXR1cm4gZGl2aWRlcnMgPyBkaXZpZGVyc1swXSA6IG51bGw7XG4gICAgfSkoKTtcbiAgICBmdW5jdGlvbiBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIC8vIFdyYXBwZXIgd2FzIGRpcmVjdGx5IGNsaWNrZWRcbiAgICAgICAgICAgIHZhciBmaXJzdElucHV0ID0gZXZlbnQudGFyZ2V0LmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgZm9jdXMoZmlyc3RJbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGxhc3RQcmVzc2VkS2V5LmN1cnJlbnQgPSBldmVudC5rZXk7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBjYXNlIGRpdmlkZXI6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHkgPSBldmVudC5rZXkgPT09ICdBcnJvd0xlZnQnID8gJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnIDogJ25leHRFbGVtZW50U2libGluZyc7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRJbnB1dCA9IGZpbmRJbnB1dChpbnB1dCwgcHJvcGVydHkpO1xuICAgICAgICAgICAgICAgIGZvY3VzKG5leHRJbnB1dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgdmFyIGtleSA9IGV2ZW50LmtleSwgaW5wdXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHZhciBpc0xhc3RQcmVzc2VkS2V5ID0gbGFzdFByZXNzZWRLZXkuY3VycmVudCA9PT0ga2V5O1xuICAgICAgICBpZiAoIWlzTGFzdFByZXNzZWRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNOdW1iZXJLZXkgPSAhaXNOYU4oTnVtYmVyKGtleSkpO1xuICAgICAgICBpZiAoIWlzTnVtYmVyS2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1heCA9IGlucHV0LmdldEF0dHJpYnV0ZSgnbWF4Jyk7XG4gICAgICAgIGlmICghbWF4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHaXZlbiAxLCB0aGUgc21hbGxlc3QgcG9zc2libGUgbnVtYmVyIHRoZSB1c2VyIGNvdWxkIHR5cGUgYnkgYWRkaW5nIGFub3RoZXIgZGlnaXQgaXMgMTAuXG4gICAgICAgICAqIDEwIHdvdWxkIGJlIGEgdmFsaWQgdmFsdWUgZ2l2ZW4gbWF4ID0gMTIsIHNvIHdlIHdvbid0IGp1bXAgdG8gdGhlIG5leHQgaW5wdXQuXG4gICAgICAgICAqIEhvd2V2ZXIsIGdpdmVuIDIsIHNtYWxsZXJzIHBvc3NpYmxlIG51bWJlciB3b3VsZCBiZSAyMCwgYW5kIHRodXMga2VlcGluZyB0aGUgZm9jdXMgaW5cbiAgICAgICAgICogdGhpcyBmaWVsZCBkb2Vzbid0IG1ha2Ugc2Vuc2UuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoTnVtYmVyKHZhbHVlKSAqIDEwID4gTnVtYmVyKG1heCkgfHwgdmFsdWUubGVuZ3RoID49IG1heC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9ICduZXh0RWxlbWVudFNpYmxpbmcnO1xuICAgICAgICAgICAgdmFyIG5leHRJbnB1dCA9IGZpbmRJbnB1dChpbnB1dCwgcHJvcGVydHkpO1xuICAgICAgICAgICAgZm9jdXMobmV4dElucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgaW50ZXJuYWwgb25DaGFuZ2UuIENoZWNrcyBpbnB1dCB2YWxpZGl0eS4gSWYgYWxsIGZpZWxkcyBhcmUgdmFsaWQsXG4gICAgICogY2FsbHMgcHJvcHMub25DaGFuZ2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gb25DaGFuZ2VFeHRlcm5hbCgpIHtcbiAgICAgICAgaWYgKCFvbkNoYW5nZVByb3BzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZmlsdGVyQm9vbGVhbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmb3JtRWxlbWVudHMgPSBbXG4gICAgICAgICAgICBkYXlJbnB1dC5jdXJyZW50LFxuICAgICAgICAgICAgbW9udGhJbnB1dC5jdXJyZW50LFxuICAgICAgICAgICAgbW9udGhTZWxlY3QuY3VycmVudCxcbiAgICAgICAgICAgIHllYXJJbnB1dC5jdXJyZW50LFxuICAgICAgICBdLmZpbHRlcihmaWx0ZXJCb29sZWFuKTtcbiAgICAgICAgdmFyIHZhbHVlcyA9IHt9O1xuICAgICAgICBmb3JtRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZm9ybUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhbHVlc1tmb3JtRWxlbWVudC5uYW1lXSA9XG4gICAgICAgICAgICAgICAgJ3ZhbHVlQXNOdW1iZXInIGluIGZvcm1FbGVtZW50XG4gICAgICAgICAgICAgICAgICAgID8gZm9ybUVsZW1lbnQudmFsdWVBc051bWJlclxuICAgICAgICAgICAgICAgICAgICA6IE51bWJlcihmb3JtRWxlbWVudC52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgaXNFdmVyeVZhbHVlRW1wdHkgPSBmb3JtRWxlbWVudHMuZXZlcnkoZnVuY3Rpb24gKGZvcm1FbGVtZW50KSB7IHJldHVybiAhZm9ybUVsZW1lbnQudmFsdWU7IH0pO1xuICAgICAgICBpZiAoaXNFdmVyeVZhbHVlRW1wdHkpIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlUHJvcHMobnVsbCwgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpc0V2ZXJ5VmFsdWVGaWxsZWQgPSBmb3JtRWxlbWVudHMuZXZlcnkoZnVuY3Rpb24gKGZvcm1FbGVtZW50KSB7IHJldHVybiBmb3JtRWxlbWVudC52YWx1ZTsgfSk7XG4gICAgICAgIHZhciBpc0V2ZXJ5VmFsdWVWYWxpZCA9IGZvcm1FbGVtZW50cy5ldmVyeShmdW5jdGlvbiAoZm9ybUVsZW1lbnQpIHsgcmV0dXJuIGZvcm1FbGVtZW50LnZhbGlkaXR5LnZhbGlkOyB9KTtcbiAgICAgICAgaWYgKGlzRXZlcnlWYWx1ZUZpbGxlZCAmJiBpc0V2ZXJ5VmFsdWVWYWxpZCkge1xuICAgICAgICAgICAgdmFyIHllYXJfMSA9IE51bWJlcih2YWx1ZXMueWVhciB8fCBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICAgICAgdmFyIG1vbnRoSW5kZXggPSBOdW1iZXIodmFsdWVzLm1vbnRoIHx8IDEpIC0gMTtcbiAgICAgICAgICAgIHZhciBkYXlfMSA9IE51bWJlcih2YWx1ZXMuZGF5IHx8IDEpO1xuICAgICAgICAgICAgdmFyIHByb3Bvc2VkVmFsdWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgcHJvcG9zZWRWYWx1ZS5zZXRGdWxsWWVhcih5ZWFyXzEsIG1vbnRoSW5kZXgsIGRheV8xKTtcbiAgICAgICAgICAgIHByb3Bvc2VkVmFsdWUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc2VkVmFsdWUgPSBnZXRQcm9jZXNzZWRWYWx1ZShwcm9wb3NlZFZhbHVlKTtcbiAgICAgICAgICAgIG9uQ2hhbmdlUHJvcHMocHJvY2Vzc2VkVmFsdWUsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9uSW52YWxpZENoYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9uSW52YWxpZENoYW5nZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBub24tbmF0aXZlIGRhdGUgaW5wdXQgaXMgY2hhbmdlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvbkNoYW5nZShldmVudCkge1xuICAgICAgICB2YXIgX2EgPSBldmVudC50YXJnZXQsIG5hbWUgPSBfYS5uYW1lLCB2YWx1ZSA9IF9hLnZhbHVlO1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgIHNldFllYXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgIHNldE1vbnRoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICAgICAgc2V0RGF5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBvbkNoYW5nZUV4dGVybmFsKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIG5hdGl2ZSBkYXRlIGlucHV0IGlzIGNoYW5nZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gb25DaGFuZ2VOYXRpdmUoZXZlbnQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZiAoIW9uQ2hhbmdlUHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJvY2Vzc2VkVmFsdWUgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9hID0gdmFsdWUuc3BsaXQoJy0nKSwgeWVhclN0cmluZyA9IF9hWzBdLCBtb250aFN0cmluZyA9IF9hWzFdLCBkYXlTdHJpbmcgPSBfYVsyXTtcbiAgICAgICAgICAgIHZhciB5ZWFyID0gTnVtYmVyKHllYXJTdHJpbmcpO1xuICAgICAgICAgICAgdmFyIG1vbnRoSW5kZXggPSBOdW1iZXIobW9udGhTdHJpbmcpIC0gMSB8fCAwO1xuICAgICAgICAgICAgdmFyIGRheSA9IE51bWJlcihkYXlTdHJpbmcpIHx8IDE7XG4gICAgICAgICAgICB2YXIgcHJvcG9zZWRWYWx1ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBwcm9wb3NlZFZhbHVlLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoSW5kZXgsIGRheSk7XG4gICAgICAgICAgICBwcm9wb3NlZFZhbHVlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgcmV0dXJuIHByb3Bvc2VkVmFsdWU7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIG9uQ2hhbmdlUHJvcHMocHJvY2Vzc2VkVmFsdWUsIGZhbHNlKTtcbiAgICB9XG4gICAgdmFyIGNvbW1vbklucHV0UHJvcHMgPSB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQsXG4gICAgICAgIG1heERhdGU6IG1heERhdGUgfHwgZGVmYXVsdE1heERhdGUsXG4gICAgICAgIG1pbkRhdGU6IG1pbkRhdGUgfHwgZGVmYXVsdE1pbkRhdGUsXG4gICAgICAgIG9uQ2hhbmdlOiBvbkNoYW5nZSxcbiAgICAgICAgb25LZXlEb3duOiBvbktleURvd24sXG4gICAgICAgIG9uS2V5VXA6IG9uS2V5VXAsXG4gICAgICAgIC8vIFRoaXMgaXMgb25seSBmb3Igc2hvd2luZyB2YWxpZGl0eSB3aGVuIGVkaXRpbmdcbiAgICAgICAgcmVxdWlyZWQ6IEJvb2xlYW4ocmVxdWlyZWQgfHwgaXNDYWxlbmRhck9wZW4pLFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmVuZGVyRGF5KGN1cnJlbnRNYXRjaCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRNYXRjaCAmJiBjdXJyZW50TWF0Y2gubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgdG9rZW46IFwiLmNvbmNhdChjdXJyZW50TWF0Y2gpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2hvd0xlYWRpbmdaZXJvc0Zyb21Gb3JtYXQgPSBjdXJyZW50TWF0Y2ggJiYgY3VycmVudE1hdGNoLmxlbmd0aCA9PT0gMjtcbiAgICAgICAgcmV0dXJuIChfanN4KERheUlucHV0LCBfX2Fzc2lnbih7fSwgY29tbW9uSW5wdXRQcm9wcywgeyBhcmlhTGFiZWw6IGRheUFyaWFMYWJlbCwgXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvbm8tYXV0b2ZvY3VzXG4gICAgICAgICAgICBhdXRvRm9jdXM6IGluZGV4ID09PSAwICYmIGF1dG9Gb2N1cywgaW5wdXRSZWY6IGRheUlucHV0LCBtb250aDogbW9udGgsIHBsYWNlaG9sZGVyOiBkYXlQbGFjZWhvbGRlciwgc2hvd0xlYWRpbmdaZXJvczogc2hvd0xlYWRpbmdaZXJvc0Zyb21Gb3JtYXQgfHwgc2hvd0xlYWRpbmdaZXJvcywgdmFsdWU6IGRheSwgeWVhcjogeWVhciB9KSwgXCJkYXlcIikpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJNb250aChjdXJyZW50TWF0Y2gsIGluZGV4KSB7XG4gICAgICAgIGlmIChjdXJyZW50TWF0Y2ggJiYgY3VycmVudE1hdGNoLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIHRva2VuOiBcIi5jb25jYXQoY3VycmVudE1hdGNoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRNYXRjaC5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICByZXR1cm4gKF9qc3goTW9udGhTZWxlY3QsIF9fYXNzaWduKHt9LCBjb21tb25JbnB1dFByb3BzLCB7IGFyaWFMYWJlbDogbW9udGhBcmlhTGFiZWwsIFxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9uby1hdXRvZm9jdXNcbiAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGluZGV4ID09PSAwICYmIGF1dG9Gb2N1cywgaW5wdXRSZWY6IG1vbnRoU2VsZWN0LCBsb2NhbGU6IGxvY2FsZSwgcGxhY2Vob2xkZXI6IG1vbnRoUGxhY2Vob2xkZXIsIHNob3J0OiBjdXJyZW50TWF0Y2gubGVuZ3RoID09PSAzLCB2YWx1ZTogbW9udGgsIHllYXI6IHllYXIgfSksIFwibW9udGhcIikpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaG93TGVhZGluZ1plcm9zRnJvbUZvcm1hdCA9IGN1cnJlbnRNYXRjaCAmJiBjdXJyZW50TWF0Y2gubGVuZ3RoID09PSAyO1xuICAgICAgICByZXR1cm4gKF9qc3goTW9udGhJbnB1dCwgX19hc3NpZ24oe30sIGNvbW1vbklucHV0UHJvcHMsIHsgYXJpYUxhYmVsOiBtb250aEFyaWFMYWJlbCwgXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvbm8tYXV0b2ZvY3VzXG4gICAgICAgICAgICBhdXRvRm9jdXM6IGluZGV4ID09PSAwICYmIGF1dG9Gb2N1cywgaW5wdXRSZWY6IG1vbnRoSW5wdXQsIHBsYWNlaG9sZGVyOiBtb250aFBsYWNlaG9sZGVyLCBzaG93TGVhZGluZ1plcm9zOiBzaG93TGVhZGluZ1plcm9zRnJvbUZvcm1hdCB8fCBzaG93TGVhZGluZ1plcm9zLCB2YWx1ZTogbW9udGgsIHllYXI6IHllYXIgfSksIFwibW9udGhcIikpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJZZWFyKGN1cnJlbnRNYXRjaCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIChfanN4KFllYXJJbnB1dCwgX19hc3NpZ24oe30sIGNvbW1vbklucHV0UHJvcHMsIHsgYXJpYUxhYmVsOiB5ZWFyQXJpYUxhYmVsLCBcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9uby1hdXRvZm9jdXNcbiAgICAgICAgICAgIGF1dG9Gb2N1czogaW5kZXggPT09IDAgJiYgYXV0b0ZvY3VzLCBpbnB1dFJlZjogeWVhcklucHV0LCBwbGFjZWhvbGRlcjogeWVhclBsYWNlaG9sZGVyLCB2YWx1ZTogeWVhciwgdmFsdWVUeXBlOiB2YWx1ZVR5cGUgfSksIFwieWVhclwiKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlckN1c3RvbUlucHV0c0ludGVybmFsKCkge1xuICAgICAgICB2YXIgZWxlbWVudEZ1bmN0aW9ucyA9IHtcbiAgICAgICAgICAgIGQ6IHJlbmRlckRheSxcbiAgICAgICAgICAgIE06IHJlbmRlck1vbnRoLFxuICAgICAgICAgICAgeTogcmVuZGVyWWVhcixcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGFsbG93TXVsdGlwbGVJbnN0YW5jZXMgPSB0eXBlb2YgZm9ybWF0ICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgcmV0dXJuIHJlbmRlckN1c3RvbUlucHV0cyhwbGFjZWhvbGRlciwgZWxlbWVudEZ1bmN0aW9ucywgYWxsb3dNdWx0aXBsZUluc3RhbmNlcyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlck5hdGl2ZUlucHV0KCkge1xuICAgICAgICByZXR1cm4gKF9qc3goTmF0aXZlSW5wdXQsIHsgYXJpYUxhYmVsOiBuYXRpdmVJbnB1dEFyaWFMYWJlbCwgZGlzYWJsZWQ6IGRpc2FibGVkLCBtYXhEYXRlOiBtYXhEYXRlIHx8IGRlZmF1bHRNYXhEYXRlLCBtaW5EYXRlOiBtaW5EYXRlIHx8IGRlZmF1bHRNaW5EYXRlLCBuYW1lOiBuYW1lLCBvbkNoYW5nZTogb25DaGFuZ2VOYXRpdmUsIHJlcXVpcmVkOiByZXF1aXJlZCwgdmFsdWU6IHZhbHVlLCB2YWx1ZVR5cGU6IHZhbHVlVHlwZSB9LCBcImRhdGVcIikpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzLCBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnNcbiAgICBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBvbkNsaWNrOiBvbkNsaWNrLCBjaGlsZHJlbjogW3JlbmRlck5hdGl2ZUlucHV0KCksIHJlbmRlckN1c3RvbUlucHV0c0ludGVybmFsKCldIH0pKTtcbn1cbiIsIid1c2UgY2xpZW50JztcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgbWFrZUV2ZW50UHJvcHMgZnJvbSAnbWFrZS1ldmVudC1wcm9wcyc7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmltcG9ydCBDYWxlbmRhciBmcm9tICdyZWFjdC1jYWxlbmRhcic7XG5pbXBvcnQgRml0IGZyb20gJ3JlYWN0LWZpdCc7XG5pbXBvcnQgRGF0ZUlucHV0IGZyb20gJy4vRGF0ZUlucHV0LmpzJztcbnZhciBiYXNlQ2xhc3NOYW1lID0gJ3JlYWN0LWRhdGUtcGlja2VyJztcbnZhciBvdXRzaWRlQWN0aW9uRXZlbnRzID0gWydtb3VzZWRvd24nLCAnZm9jdXNpbicsICd0b3VjaHN0YXJ0J107XG52YXIgaWNvblByb3BzID0ge1xuICAgIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgIHdpZHRoOiAxOSxcbiAgICBoZWlnaHQ6IDE5LFxuICAgIHZpZXdCb3g6ICcwIDAgMTkgMTknLFxuICAgIHN0cm9rZTogJ2JsYWNrJyxcbiAgICBzdHJva2VXaWR0aDogMixcbn07XG52YXIgQ2FsZW5kYXJJY29uID0gKF9qc3hzKFwic3ZnXCIsIF9fYXNzaWduKHt9LCBpY29uUHJvcHMsIHsgY2xhc3NOYW1lOiBcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIl9fY2FsZW5kYXItYnV0dG9uX19pY29uIFwiKS5jb25jYXQoYmFzZUNsYXNzTmFtZSwgXCJfX2J1dHRvbl9faWNvblwiKSwgY2hpbGRyZW46IFtfanN4KFwicmVjdFwiLCB7IGZpbGw6IFwibm9uZVwiLCBoZWlnaHQ6IFwiMTVcIiwgd2lkdGg6IFwiMTVcIiwgeDogXCIyXCIsIHk6IFwiMlwiIH0pLCBfanN4KFwibGluZVwiLCB7IHgxOiBcIjZcIiwgeDI6IFwiNlwiLCB5MTogXCIwXCIsIHkyOiBcIjRcIiB9KSwgX2pzeChcImxpbmVcIiwgeyB4MTogXCIxM1wiLCB4MjogXCIxM1wiLCB5MTogXCIwXCIsIHkyOiBcIjRcIiB9KV0gfSkpKTtcbnZhciBDbGVhckljb24gPSAoX2pzeHMoXCJzdmdcIiwgX19hc3NpZ24oe30sIGljb25Qcm9wcywgeyBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiX19jbGVhci1idXR0b25fX2ljb24gXCIpLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIl9fYnV0dG9uX19pY29uXCIpLCBjaGlsZHJlbjogW19qc3goXCJsaW5lXCIsIHsgeDE6IFwiNFwiLCB4MjogXCIxNVwiLCB5MTogXCI0XCIsIHkyOiBcIjE1XCIgfSksIF9qc3goXCJsaW5lXCIsIHsgeDE6IFwiMTVcIiwgeDI6IFwiNFwiLCB5MTogXCI0XCIsIHkyOiBcIjE1XCIgfSldIH0pKSk7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXRlUGlja2VyKHByb3BzKSB7XG4gICAgdmFyIGF1dG9Gb2N1cyA9IHByb3BzLmF1dG9Gb2N1cywgY2FsZW5kYXJBcmlhTGFiZWwgPSBwcm9wcy5jYWxlbmRhckFyaWFMYWJlbCwgX2EgPSBwcm9wcy5jYWxlbmRhckljb24sIGNhbGVuZGFySWNvbiA9IF9hID09PSB2b2lkIDAgPyBDYWxlbmRhckljb24gOiBfYSwgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLCBjbGVhckFyaWFMYWJlbCA9IHByb3BzLmNsZWFyQXJpYUxhYmVsLCBfYiA9IHByb3BzLmNsZWFySWNvbiwgY2xlYXJJY29uID0gX2IgPT09IHZvaWQgMCA/IENsZWFySWNvbiA6IF9iLCBfYyA9IHByb3BzLmNsb3NlQ2FsZW5kYXIsIHNob3VsZENsb3NlQ2FsZW5kYXJPblNlbGVjdCA9IF9jID09PSB2b2lkIDAgPyB0cnVlIDogX2MsIGRhdGFUZXN0aWQgPSBwcm9wc1tcImRhdGEtdGVzdGlkXCJdLCBkYXlBcmlhTGFiZWwgPSBwcm9wcy5kYXlBcmlhTGFiZWwsIGRheVBsYWNlaG9sZGVyID0gcHJvcHMuZGF5UGxhY2Vob2xkZXIsIGRpc2FibGVDYWxlbmRhciA9IHByb3BzLmRpc2FibGVDYWxlbmRhciwgZGlzYWJsZWQgPSBwcm9wcy5kaXNhYmxlZCwgZm9ybWF0ID0gcHJvcHMuZm9ybWF0LCBpZCA9IHByb3BzLmlkLCBfZCA9IHByb3BzLmlzT3BlbiwgaXNPcGVuUHJvcHMgPSBfZCA9PT0gdm9pZCAwID8gbnVsbCA6IF9kLCBsb2NhbGUgPSBwcm9wcy5sb2NhbGUsIG1heERhdGUgPSBwcm9wcy5tYXhEYXRlLCBfZSA9IHByb3BzLm1heERldGFpbCwgbWF4RGV0YWlsID0gX2UgPT09IHZvaWQgMCA/ICdtb250aCcgOiBfZSwgbWluRGF0ZSA9IHByb3BzLm1pbkRhdGUsIG1vbnRoQXJpYUxhYmVsID0gcHJvcHMubW9udGhBcmlhTGFiZWwsIG1vbnRoUGxhY2Vob2xkZXIgPSBwcm9wcy5tb250aFBsYWNlaG9sZGVyLCBfZiA9IHByb3BzLm5hbWUsIG5hbWUgPSBfZiA9PT0gdm9pZCAwID8gJ2RhdGUnIDogX2YsIG5hdGl2ZUlucHV0QXJpYUxhYmVsID0gcHJvcHMubmF0aXZlSW5wdXRBcmlhTGFiZWwsIG9uQ2FsZW5kYXJDbG9zZSA9IHByb3BzLm9uQ2FsZW5kYXJDbG9zZSwgb25DYWxlbmRhck9wZW4gPSBwcm9wcy5vbkNhbGVuZGFyT3Blbiwgb25DaGFuZ2VQcm9wcyA9IHByb3BzLm9uQ2hhbmdlLCBvbkZvY3VzUHJvcHMgPSBwcm9wcy5vbkZvY3VzLCBvbkludmFsaWRDaGFuZ2UgPSBwcm9wcy5vbkludmFsaWRDaGFuZ2UsIF9nID0gcHJvcHMub3BlbkNhbGVuZGFyT25Gb2N1cywgb3BlbkNhbGVuZGFyT25Gb2N1cyA9IF9nID09PSB2b2lkIDAgPyB0cnVlIDogX2csIHJlcXVpcmVkID0gcHJvcHMucmVxdWlyZWQsIF9oID0gcHJvcHMucmV0dXJuVmFsdWUsIHJldHVyblZhbHVlID0gX2ggPT09IHZvaWQgMCA/ICdzdGFydCcgOiBfaCwgc2hvdWxkQ2xvc2VDYWxlbmRhciA9IHByb3BzLnNob3VsZENsb3NlQ2FsZW5kYXIsIHNob3VsZE9wZW5DYWxlbmRhciA9IHByb3BzLnNob3VsZE9wZW5DYWxlbmRhciwgc2hvd0xlYWRpbmdaZXJvcyA9IHByb3BzLnNob3dMZWFkaW5nWmVyb3MsIHZhbHVlID0gcHJvcHMudmFsdWUsIHllYXJBcmlhTGFiZWwgPSBwcm9wcy55ZWFyQXJpYUxhYmVsLCB5ZWFyUGxhY2Vob2xkZXIgPSBwcm9wcy55ZWFyUGxhY2Vob2xkZXIsIG90aGVyUHJvcHMgPSBfX3Jlc3QocHJvcHMsIFtcImF1dG9Gb2N1c1wiLCBcImNhbGVuZGFyQXJpYUxhYmVsXCIsIFwiY2FsZW5kYXJJY29uXCIsIFwiY2xhc3NOYW1lXCIsIFwiY2xlYXJBcmlhTGFiZWxcIiwgXCJjbGVhckljb25cIiwgXCJjbG9zZUNhbGVuZGFyXCIsICdkYXRhLXRlc3RpZCcsIFwiZGF5QXJpYUxhYmVsXCIsIFwiZGF5UGxhY2Vob2xkZXJcIiwgXCJkaXNhYmxlQ2FsZW5kYXJcIiwgXCJkaXNhYmxlZFwiLCBcImZvcm1hdFwiLCBcImlkXCIsIFwiaXNPcGVuXCIsIFwibG9jYWxlXCIsIFwibWF4RGF0ZVwiLCBcIm1heERldGFpbFwiLCBcIm1pbkRhdGVcIiwgXCJtb250aEFyaWFMYWJlbFwiLCBcIm1vbnRoUGxhY2Vob2xkZXJcIiwgXCJuYW1lXCIsIFwibmF0aXZlSW5wdXRBcmlhTGFiZWxcIiwgXCJvbkNhbGVuZGFyQ2xvc2VcIiwgXCJvbkNhbGVuZGFyT3BlblwiLCBcIm9uQ2hhbmdlXCIsIFwib25Gb2N1c1wiLCBcIm9uSW52YWxpZENoYW5nZVwiLCBcIm9wZW5DYWxlbmRhck9uRm9jdXNcIiwgXCJyZXF1aXJlZFwiLCBcInJldHVyblZhbHVlXCIsIFwic2hvdWxkQ2xvc2VDYWxlbmRhclwiLCBcInNob3VsZE9wZW5DYWxlbmRhclwiLCBcInNob3dMZWFkaW5nWmVyb3NcIiwgXCJ2YWx1ZVwiLCBcInllYXJBcmlhTGFiZWxcIiwgXCJ5ZWFyUGxhY2Vob2xkZXJcIl0pO1xuICAgIHZhciBfaiA9IHVzZVN0YXRlKGlzT3BlblByb3BzKSwgaXNPcGVuID0gX2pbMF0sIHNldElzT3BlbiA9IF9qWzFdO1xuICAgIHZhciB3cmFwcGVyID0gdXNlUmVmKG51bGwpO1xuICAgIHZhciBjYWxlbmRhcldyYXBwZXIgPSB1c2VSZWYobnVsbCk7XG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0SXNPcGVuKGlzT3BlblByb3BzKTtcbiAgICB9LCBbaXNPcGVuUHJvcHNdKTtcbiAgICBmdW5jdGlvbiBvcGVuQ2FsZW5kYXIoX2EpIHtcbiAgICAgICAgdmFyIHJlYXNvbiA9IF9hLnJlYXNvbjtcbiAgICAgICAgaWYgKHNob3VsZE9wZW5DYWxlbmRhcikge1xuICAgICAgICAgICAgaWYgKCFzaG91bGRPcGVuQ2FsZW5kYXIoeyByZWFzb246IHJlYXNvbiB9KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICAgIGlmIChvbkNhbGVuZGFyT3Blbikge1xuICAgICAgICAgICAgb25DYWxlbmRhck9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2xvc2VDYWxlbmRhciA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgcmVhc29uID0gX2EucmVhc29uO1xuICAgICAgICBpZiAoc2hvdWxkQ2xvc2VDYWxlbmRhcikge1xuICAgICAgICAgICAgaWYgKCFzaG91bGRDbG9zZUNhbGVuZGFyKHsgcmVhc29uOiByZWFzb24gfSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgaWYgKG9uQ2FsZW5kYXJDbG9zZSkge1xuICAgICAgICAgICAgb25DYWxlbmRhckNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9LCBbb25DYWxlbmRhckNsb3NlLCBzaG91bGRDbG9zZUNhbGVuZGFyXSk7XG4gICAgZnVuY3Rpb24gdG9nZ2xlQ2FsZW5kYXIoKSB7XG4gICAgICAgIGlmIChpc09wZW4pIHtcbiAgICAgICAgICAgIGNsb3NlQ2FsZW5kYXIoeyByZWFzb246ICdidXR0b25DbGljaycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcGVuQ2FsZW5kYXIoeyByZWFzb246ICdidXR0b25DbGljaycgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25DaGFuZ2UodmFsdWUsIHNob3VsZENsb3NlQ2FsZW5kYXIpIHtcbiAgICAgICAgaWYgKHNob3VsZENsb3NlQ2FsZW5kYXIgPT09IHZvaWQgMCkgeyBzaG91bGRDbG9zZUNhbGVuZGFyID0gc2hvdWxkQ2xvc2VDYWxlbmRhck9uU2VsZWN0OyB9XG4gICAgICAgIGlmIChzaG91bGRDbG9zZUNhbGVuZGFyKSB7XG4gICAgICAgICAgICBjbG9zZUNhbGVuZGFyKHsgcmVhc29uOiAnc2VsZWN0JyB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob25DaGFuZ2VQcm9wcykge1xuICAgICAgICAgICAgb25DaGFuZ2VQcm9wcyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25Gb2N1cyhldmVudCkge1xuICAgICAgICBpZiAob25Gb2N1c1Byb3BzKSB7XG4gICAgICAgICAgICBvbkZvY3VzUHJvcHMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgc3RpbGwgZmlyZXMgb25Gb2N1cyBvbiBkaXNhYmxlZCBlbGVtZW50c1xuICAgICAgICBkaXNhYmxlZCB8fFxuICAgICAgICAgICAgaXNPcGVuIHx8XG4gICAgICAgICAgICAhb3BlbkNhbGVuZGFyT25Gb2N1cyB8fFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuc2VsZWN0ID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvcGVuQ2FsZW5kYXIoeyByZWFzb246ICdmb2N1cycgfSk7XG4gICAgfVxuICAgIHZhciBvbktleURvd24gPSB1c2VDYWxsYmFjayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIGNsb3NlQ2FsZW5kYXIoeyByZWFzb246ICdlc2NhcGUnIH0pO1xuICAgICAgICB9XG4gICAgfSwgW2Nsb3NlQ2FsZW5kYXJdKTtcbiAgICBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgb25DaGFuZ2UobnVsbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgdmFyIG9uT3V0c2lkZUFjdGlvbiA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgd3JhcHBlckVsID0gd3JhcHBlci5jdXJyZW50O1xuICAgICAgICB2YXIgY2FsZW5kYXJXcmFwcGVyRWwgPSBjYWxlbmRhcldyYXBwZXIuY3VycmVudDtcbiAgICAgICAgLy8gVHJ5IGV2ZW50LmNvbXBvc2VkUGF0aCBmaXJzdCB0byBoYW5kbGUgY2xpY2tzIGluc2lkZSBhIFNoYWRvdyBET00uXG4gICAgICAgIHZhciB0YXJnZXQgPSAoJ2NvbXBvc2VkUGF0aCcgaW4gZXZlbnQgPyBldmVudC5jb21wb3NlZFBhdGgoKVswXSA6IGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGlmICh0YXJnZXQgJiZcbiAgICAgICAgICAgIHdyYXBwZXJFbCAmJlxuICAgICAgICAgICAgIXdyYXBwZXJFbC5jb250YWlucyh0YXJnZXQpICYmXG4gICAgICAgICAgICAoIWNhbGVuZGFyV3JhcHBlckVsIHx8ICFjYWxlbmRhcldyYXBwZXJFbC5jb250YWlucyh0YXJnZXQpKSkge1xuICAgICAgICAgICAgY2xvc2VDYWxlbmRhcih7IHJlYXNvbjogJ291dHNpZGVBY3Rpb24nIH0pO1xuICAgICAgICB9XG4gICAgfSwgW2NhbGVuZGFyV3JhcHBlciwgY2xvc2VDYWxlbmRhciwgd3JhcHBlcl0pO1xuICAgIHZhciBoYW5kbGVPdXRzaWRlQWN0aW9uTGlzdGVuZXJzID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKHNob3VsZExpc3Rlbikge1xuICAgICAgICBpZiAoc2hvdWxkTGlzdGVuID09PSB2b2lkIDApIHsgc2hvdWxkTGlzdGVuID0gaXNPcGVuOyB9XG4gICAgICAgIG91dHNpZGVBY3Rpb25FdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRMaXN0ZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBvbk91dHNpZGVBY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgb25PdXRzaWRlQWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzaG91bGRMaXN0ZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7XG4gICAgICAgIH1cbiAgICB9LCBbaXNPcGVuLCBvbk91dHNpZGVBY3Rpb24sIG9uS2V5RG93bl0pO1xuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGhhbmRsZU91dHNpZGVBY3Rpb25MaXN0ZW5lcnMoKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhhbmRsZU91dHNpZGVBY3Rpb25MaXN0ZW5lcnMoZmFsc2UpO1xuICAgICAgICB9O1xuICAgIH0sIFtoYW5kbGVPdXRzaWRlQWN0aW9uTGlzdGVuZXJzXSk7XG4gICAgZnVuY3Rpb24gcmVuZGVySW5wdXRzKCkge1xuICAgICAgICB2YXIgdmFsdWVGcm9tID0gKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdKVswXTtcbiAgICAgICAgdmFyIGFyaWFMYWJlbFByb3BzID0ge1xuICAgICAgICAgICAgZGF5QXJpYUxhYmVsOiBkYXlBcmlhTGFiZWwsXG4gICAgICAgICAgICBtb250aEFyaWFMYWJlbDogbW9udGhBcmlhTGFiZWwsXG4gICAgICAgICAgICBuYXRpdmVJbnB1dEFyaWFMYWJlbDogbmF0aXZlSW5wdXRBcmlhTGFiZWwsXG4gICAgICAgICAgICB5ZWFyQXJpYUxhYmVsOiB5ZWFyQXJpYUxhYmVsLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgcGxhY2Vob2xkZXJQcm9wcyA9IHtcbiAgICAgICAgICAgIGRheVBsYWNlaG9sZGVyOiBkYXlQbGFjZWhvbGRlcixcbiAgICAgICAgICAgIG1vbnRoUGxhY2Vob2xkZXI6IG1vbnRoUGxhY2Vob2xkZXIsXG4gICAgICAgICAgICB5ZWFyUGxhY2Vob2xkZXI6IHllYXJQbGFjZWhvbGRlcixcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJcIi5jb25jYXQoYmFzZUNsYXNzTmFtZSwgXCJfX3dyYXBwZXJcIiksIGNoaWxkcmVuOiBbX2pzeChEYXRlSW5wdXQsIF9fYXNzaWduKHt9LCBhcmlhTGFiZWxQcm9wcywgcGxhY2Vob2xkZXJQcm9wcywgeyBcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L25vLWF1dG9mb2N1c1xuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGF1dG9Gb2N1cywgY2xhc3NOYW1lOiBcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIl9faW5wdXRHcm91cFwiKSwgZGlzYWJsZWQ6IGRpc2FibGVkLCBmb3JtYXQ6IGZvcm1hdCwgaXNDYWxlbmRhck9wZW46IGlzT3BlbiwgbG9jYWxlOiBsb2NhbGUsIG1heERhdGU6IG1heERhdGUsIG1heERldGFpbDogbWF4RGV0YWlsLCBtaW5EYXRlOiBtaW5EYXRlLCBuYW1lOiBuYW1lLCBvbkNoYW5nZTogb25DaGFuZ2UsIG9uSW52YWxpZENoYW5nZTogb25JbnZhbGlkQ2hhbmdlLCByZXF1aXJlZDogcmVxdWlyZWQsIHJldHVyblZhbHVlOiByZXR1cm5WYWx1ZSwgc2hvd0xlYWRpbmdaZXJvczogc2hvd0xlYWRpbmdaZXJvcywgdmFsdWU6IHZhbHVlRnJvbSB9KSksIGNsZWFySWNvbiAhPT0gbnVsbCAmJiAoX2pzeChcImJ1dHRvblwiLCB7IFwiYXJpYS1sYWJlbFwiOiBjbGVhckFyaWFMYWJlbCwgY2xhc3NOYW1lOiBcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIl9fY2xlYXItYnV0dG9uIFwiKS5jb25jYXQoYmFzZUNsYXNzTmFtZSwgXCJfX2J1dHRvblwiKSwgZGlzYWJsZWQ6IGRpc2FibGVkLCBvbkNsaWNrOiBjbGVhciwgb25Gb2N1czogc3RvcFByb3BhZ2F0aW9uLCB0eXBlOiBcImJ1dHRvblwiLCBjaGlsZHJlbjogdHlwZW9mIGNsZWFySWNvbiA9PT0gJ2Z1bmN0aW9uJyA/IGNyZWF0ZUVsZW1lbnQoY2xlYXJJY29uKSA6IGNsZWFySWNvbiB9KSksIGNhbGVuZGFySWNvbiAhPT0gbnVsbCAmJiAhZGlzYWJsZUNhbGVuZGFyICYmIChfanN4KFwiYnV0dG9uXCIsIHsgXCJhcmlhLWV4cGFuZGVkXCI6IGlzT3BlbiB8fCBmYWxzZSwgXCJhcmlhLWxhYmVsXCI6IGNhbGVuZGFyQXJpYUxhYmVsLCBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiX19jYWxlbmRhci1idXR0b24gXCIpLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIl9fYnV0dG9uXCIpLCBkaXNhYmxlZDogZGlzYWJsZWQsIG9uQ2xpY2s6IHRvZ2dsZUNhbGVuZGFyLCBvbkZvY3VzOiBzdG9wUHJvcGFnYXRpb24sIHR5cGU6IFwiYnV0dG9uXCIsIGNoaWxkcmVuOiB0eXBlb2YgY2FsZW5kYXJJY29uID09PSAnZnVuY3Rpb24nID8gY3JlYXRlRWxlbWVudChjYWxlbmRhckljb24pIDogY2FsZW5kYXJJY29uIH0pKV0gfSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJDYWxlbmRhcigpIHtcbiAgICAgICAgaWYgKGlzT3BlbiA9PT0gbnVsbCB8fCBkaXNhYmxlQ2FsZW5kYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYWxlbmRhclByb3BzID0gcHJvcHMuY2FsZW5kYXJQcm9wcywgcG9ydGFsQ29udGFpbmVyID0gcHJvcHMucG9ydGFsQ29udGFpbmVyLCB2YWx1ZSA9IHByb3BzLnZhbHVlO1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gXCJcIi5jb25jYXQoYmFzZUNsYXNzTmFtZSwgXCJfX2NhbGVuZGFyXCIpO1xuICAgICAgICB2YXIgY2xhc3NOYW1lcyA9IGNsc3goY2xhc3NOYW1lLCBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiLS1cIikuY29uY2F0KGlzT3BlbiA/ICdvcGVuJyA6ICdjbG9zZWQnKSk7XG4gICAgICAgIHZhciBjYWxlbmRhciA9IChfanN4KENhbGVuZGFyLCBfX2Fzc2lnbih7IGxvY2FsZTogbG9jYWxlLCBtYXhEYXRlOiBtYXhEYXRlLCBtYXhEZXRhaWw6IG1heERldGFpbCwgbWluRGF0ZTogbWluRGF0ZSwgb25DaGFuZ2U6IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gb25DaGFuZ2UodmFsdWUpOyB9LCB2YWx1ZTogdmFsdWUgfSwgY2FsZW5kYXJQcm9wcykpKTtcbiAgICAgICAgcmV0dXJuIHBvcnRhbENvbnRhaW5lciA/IChjcmVhdGVQb3J0YWwoX2pzeChcImRpdlwiLCB7IHJlZjogY2FsZW5kYXJXcmFwcGVyLCBjbGFzc05hbWU6IGNsYXNzTmFtZXMsIGNoaWxkcmVuOiBjYWxlbmRhciB9KSwgcG9ydGFsQ29udGFpbmVyKSkgOiAoX2pzeChGaXQsIHsgY2hpbGRyZW46IF9qc3goXCJkaXZcIiwgeyByZWY6IGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZiAmJiAhaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWYucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgY2xhc3NOYW1lOiBjbGFzc05hbWVzLCBjaGlsZHJlbjogY2FsZW5kYXIgfSkgfSkpO1xuICAgIH1cbiAgICB2YXIgZXZlbnRQcm9wcyA9IHVzZU1lbW8oZnVuY3Rpb24gKCkgeyByZXR1cm4gbWFrZUV2ZW50UHJvcHMob3RoZXJQcm9wcyk7IH0sIFtvdGhlclByb3BzXSk7XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCBfX2Fzc2lnbih7IGNsYXNzTmFtZTogY2xzeChiYXNlQ2xhc3NOYW1lLCBcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIi0tXCIpLmNvbmNhdChpc09wZW4gPyAnb3BlbicgOiAnY2xvc2VkJyksIFwiXCIuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiLS1cIikuY29uY2F0KGRpc2FibGVkID8gJ2Rpc2FibGVkJyA6ICdlbmFibGVkJyksIGNsYXNzTmFtZSksIFwiZGF0YS10ZXN0aWRcIjogZGF0YVRlc3RpZCwgaWQ6IGlkIH0sIGV2ZW50UHJvcHMsIHsgb25Gb2N1czogb25Gb2N1cywgcmVmOiB3cmFwcGVyLCBjaGlsZHJlbjogW3JlbmRlcklucHV0cygpLCByZW5kZXJDYWxlbmRhcigpXSB9KSkpO1xufVxuIiwiaW1wb3J0IFwiLi91aS9SZWFjdERhdGVQaWNrZXIuY3NzXCI7XG5pbXBvcnQgXCJyZWFjdC1jYWxlbmRhci9kaXN0L0NhbGVuZGFyLmNzc1wiO1xuaW1wb3J0IFwicmVhY3QtZGF0ZS1waWNrZXIvZGlzdC9EYXRlUGlja2VyLmNzc1wiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSBcInJlYWN0LWRhdGUtcGlja2VyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFjdERhdGVQaWNrZXIoe1xuICAgIGF1dG9Gb2N1cyxcbiAgICBhdXRvU2VsZWN0VG9kYXksXG4gICAgZGF0ZUF0dHIsXG4gICAgZGF5UGxhY2Vob2xkZXIsXG4gICAgbW9udGhQbGFjZWhvbGRlcixcbiAgICBvbkNoYW5nZUFjdGlvbixcbiAgICByZWFkT25seVN0eWxlLFxuICAgIHNob3dMZWFkaW5nWmVyb3MsXG4gICAgeWVhclBsYWNlaG9sZGVyLFxuICAgIC4uLnJlc3Rcbn0pIHtcbiAgICBjb25zdCBpZCA9IHJlc3QuaWQgfHwgXCJcIjtcbiAgICBjb25zdCBzdHlsZSA9IHJlc3QuY2xhc3MgfHwgXCJcIjtcbiAgICBjb25zdCB3aWRnZXROYW1lID0gcmVzdC5uYW1lIHx8IFwiXCI7XG4gICAgY29uc3QgW2N1cnJlbnRWYWx1ZSwgc2V0Q3VycmVudFZhbHVlXSA9IHVzZVN0YXRlKCgpID0+IHtcbiAgICAgICAgaWYgKGRhdGVBdHRyLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIiAmJiBkYXRlQXR0ci5kaXNwbGF5VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlQXR0ci5kaXNwbGF5VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF1dG9TZWxlY3RUb2RheSA/IG5ldyBEYXRlKCkgOiBudWxsO1xuICAgIH0pO1xuICAgIGNvbnN0IFtkaXNhYmxlZFZhbHVlLCBzZXREaXNhYmxlZFZhbHVlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChkYXRlQXR0ci5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBkYXRlQXR0ci5zZXRWYWx1ZShuZXcgRGF0ZShjdXJyZW50VmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZUF0dHIuZGlzcGxheVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2V0Q3VycmVudFZhbHVlKGRhdGVBdHRyLmRpc3BsYXlWYWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRlQXR0ci5yZWFkT25seSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNldERpc2FibGVkVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRlQXR0ci5yZWFkT25seSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNldERpc2FibGVkVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBbYXV0b0ZvY3VzLCBjdXJyZW50VmFsdWUsIGRhdGVBdHRyXSk7XG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZUlucHV0QWN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChvbkNoYW5nZUFjdGlvbiAmJiBvbkNoYW5nZUFjdGlvbi5jYW5FeGVjdXRlKSB7XG4gICAgICAgICAgICBvbkNoYW5nZUFjdGlvbi5leGVjdXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGlzYWJsZWRWYWx1ZSAmJiBkaXNhYmxlZFZhbHVlID09PSB0cnVlICYmIHJlYWRPbmx5U3R5bGUgPT09IFwidGV4dFwiKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHJlYWN0LWRhdGUtcGlja2VyICR7c3R5bGV9YH0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtgJHt3aWRnZXROYW1lfSBmb3JtLWNvbnRyb2wtc3RhdGljYH0+e2N1cnJlbnRWYWx1ZSB8fCBkYXRlQXR0ci5kaXNwbGF5VmFsdWV9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZS1waWNrZXIgJHtzdHlsZX1gfT5cbiAgICAgICAgICAgICAgICB7YXV0b0ZvY3VzID09PSBmYWxzZSAmJiA8YnV0dG9uIGNsYXNzTmFtZT1cInJlYWN0LWRhdGUtcGlja2VyLWZhdXgtYnRuXCI+PC9idXR0b24+fVxuICAgICAgICAgICAgICAgIDxEYXRlUGlja2VyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1cz17YXV0b0ZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBzaG93TGVhZGluZ1plcm9zPXtzaG93TGVhZGluZ1plcm9zfVxuICAgICAgICAgICAgICAgICAgICBpc09wZW49e2F1dG9Gb2N1c31cbiAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXJBcmlhTGFiZWw9XCJUb2dnbGUgY2FsZW5kYXJcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICBjbGVhckFyaWFMYWJlbD1cIkNsZWFyIHZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUNhbGVuZGFyPXtkaXNhYmxlZFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZGF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZUlucHV0QWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50VmFsdWUoZGF0ZSA/IG5ldyBEYXRlKGRhdGUpIDogXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjdXJyZW50VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGRheVBsYWNlaG9sZGVyPXtkYXlQbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICAgICAgbW9udGhQbGFjZWhvbGRlcj17bW9udGhQbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICAgICAgeWVhclBsYWNlaG9sZGVyPXt5ZWFyUGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJfX3NwcmVhZEFycmF5IiwidGhpcyIsInRvIiwiZnJvbSIsInBhY2siLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJpIiwibCIsImFyIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJjb25jYXQiLCJjbGlwYm9hcmRFdmVudHMiLCJjb21wb3NpdGlvbkV2ZW50cyIsImZvY3VzRXZlbnRzIiwiZm9ybUV2ZW50cyIsImltYWdlRXZlbnRzIiwia2V5Ym9hcmRFdmVudHMiLCJtZWRpYUV2ZW50cyIsIm1vdXNlRXZlbnRzIiwiZHJhZ0V2ZW50cyIsInNlbGVjdGlvbkV2ZW50cyIsInRvdWNoRXZlbnRzIiwicG9pbnRlckV2ZW50cyIsInVpRXZlbnRzIiwid2hlZWxFdmVudHMiLCJhbmltYXRpb25FdmVudHMiLCJ0cmFuc2l0aW9uRXZlbnRzIiwib3RoZXJFdmVudHMiLCJjaGFuZ2VFdmVudHMiLCJhbGxFdmVudHMiLCJtYWtlRXZlbnRQcm9wcyIsInByb3BzIiwiZ2V0QXJncyIsImV2ZW50UHJvcHMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwiZXZlbnRIYW5kbGVyIiwiZXZlbnQiLCJyIiwiZSIsInQiLCJmIiwibiIsImlzQXJyYXkiLCJvIiwiY2xzeCIsImNvcHlQcm9wZXJ0eSIsInByb3BlcnR5IiwiaWdub3JlTm9uQ29uZmlndXJhYmxlIiwidG9EZXNjcmlwdG9yIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZnJvbURlc2NyaXB0b3IiLCJjYW5Db3B5UHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsInVuZGVmaW5lZCIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZW51bWVyYWJsZSIsInZhbHVlIiwiY2hhbmdlUHJvdG90eXBlIiwiZnJvbVByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJ3cmFwcGVkVG9TdHJpbmciLCJ3aXRoTmFtZSIsImZyb21Cb2R5IiwidG9TdHJpbmdEZXNjcmlwdG9yIiwiRnVuY3Rpb24iLCJ0b1N0cmluZ05hbWUiLCJ0b1N0cmluZyIsImNoYW5nZVRvU3RyaW5nIiwibmFtZSIsInRyaW0iLCJuZXdUb1N0cmluZyIsImJpbmQiLCJtaW1pY0ZuIiwiUmVmbGVjdCIsIm93bktleXMiLCJtb2R1bGUiLCJyZXQiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJmdWxmaWxsZWQiLCJzdGVwIiwibmV4dCIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsIl9faW1wb3J0RGVmYXVsdCIsIm1vZCIsIl9fZXNNb2R1bGUiLCJwX2RlZmVyXzEiLCJyZXF1aXJlIiwibWFwQWdlQ2xlYW5lciIsIm1hcCIsInByb2Nlc3NpbmdLZXkiLCJwcm9jZXNzaW5nVGltZXIiLCJwcm9jZXNzaW5nRGVmZXJyZWQiLCJjbGVhbnVwIiwic2V0dXBUaW1lciIsIml0ZW0iLCJkZWZhdWx0IiwiZGVsYXkiLCJEYXRlIiwibm93IiwiZGVsZXRlIiwic2V0VGltZW91dCIsInVucmVmIiwiZW50cnkiLCJfYSIsInJlc2V0IiwiY2xlYXJUaW1lb3V0Iiwib3JpZ2luYWxTZXQiLCJzZXQiLCJrZXkiLCJoYXMiLCJleHBvcnRzIiwicmVxdWlyZSQkMSIsImRlY29yYXRvckluc3RhbmNlTWFwIiwiV2Vha01hcCIsImNhY2hlU3RvcmUiLCJtZW0iLCJmbiIsImNhY2hlS2V5IiwiY2FjaGUiLCJNYXAiLCJtYXhBZ2UiLCJtZW1vaXplZCIsImFyZ3VtZW50c18iLCJjYWNoZUl0ZW0iLCJnZXQiLCJkYXRhIiwiTnVtYmVyIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJkZWNvcmF0b3IiLCJvcHRpb25zIiwidGFyZ2V0IiwicHJvcGVydHlLZXkiLCJkZXNjcmlwdG9yIiwiaW5wdXQiLCJUeXBlRXJyb3IiLCJjbGVhciIsImlzU3RyaW5nIiwiZWwiLCJpc1VuaXF1ZSIsImluZGV4IiwiYXJyIiwiaW5kZXhPZiIsImlzQWxsTG93ZXJDYXNlIiwidG9Mb3dlckNhc2UiLCJmaXhDb21tYXMiLCJzcGxpdCIsIm5vcm1hbGl6ZUxvY2FsZSIsImxvY2FsZSIsImFjdHVhbExvY2FsZSIsIl9iIiwiX2MiLCJzcGxpdEVsMSIsIl9kIiwic3BsaXRFbDIiLCJ0b1VwcGVyQ2FzZSIsImdldFVzZXJMb2NhbGVzSW50ZXJuYWwiLCJ1c2VGYWxsYmFja0xvY2FsZSIsImZhbGxiYWNrTG9jYWxlIiwibGFuZ3VhZ2VMaXN0IiwibmF2aWdhdG9yIiwicmF3TGFuZ3VhZ2VzIiwibGFuZ3VhZ2VzIiwiX2kiLCJyYXdMYW5ndWFnZXNfMSIsInJhd0xhbmd1YWdlc0l0ZW0iLCJyYXdMYW5ndWFnZSIsImxhbmd1YWdlIiwicHVzaCIsImZpbHRlciIsImdldFVzZXJMb2NhbGVzIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFVzZXJMb2NhbGVJbnRlcm5hbCIsImdldFVzZXJMb2NhbGUiLCJtYWtlR2V0RWRnZU9mTmVpZ2hib3IiLCJnZXRQZXJpb2QiLCJnZXRFZGdlT2ZQZXJpb2QiLCJkZWZhdWx0T2Zmc2V0IiwibWFrZUdldEVkZ2VPZk5laWdoYm9ySW50ZXJuYWwiLCJkYXRlIiwib2Zmc2V0IiwicHJldmlvdXNQZXJpb2QiLCJtYWtlR2V0RW5kIiwiZ2V0QmVnaW5PZk5leHRQZXJpb2QiLCJtYWtlR2V0RW5kSW50ZXJuYWwiLCJnZXRUaW1lIiwibWFrZUdldFJhbmdlIiwiZ2V0U3RhcnQiLCJnZXRFbmQiLCJtYWtlR2V0UmFuZ2VJbnRlcm5hbCIsImdldFllYXIiLCJnZXRGdWxsWWVhciIsInllYXIiLCJwYXJzZUludCIsImlzTmFOIiwiRXJyb3IiLCJnZXRNb250aCIsImdldE1vbnRoSHVtYW4iLCJnZXREYXRlIiwiZ2V0Q2VudHVyeVN0YXJ0IiwiY2VudHVyeVN0YXJ0WWVhciIsImNlbnR1cnlTdGFydERhdGUiLCJzZXRGdWxsWWVhciIsInNldEhvdXJzIiwiZ2V0UHJldmlvdXNDZW50dXJ5U3RhcnQiLCJnZXROZXh0Q2VudHVyeVN0YXJ0IiwiZ2V0Q2VudHVyeUVuZCIsImdldFByZXZpb3VzQ2VudHVyeUVuZCIsImdldENlbnR1cnlSYW5nZSIsImdldERlY2FkZVN0YXJ0IiwiZGVjYWRlU3RhcnRZZWFyIiwiZGVjYWRlU3RhcnREYXRlIiwiZ2V0UHJldmlvdXNEZWNhZGVTdGFydCIsImdldE5leHREZWNhZGVTdGFydCIsImdldERlY2FkZUVuZCIsImdldFByZXZpb3VzRGVjYWRlRW5kIiwiZ2V0RGVjYWRlUmFuZ2UiLCJnZXRZZWFyU3RhcnQiLCJ5ZWFyU3RhcnREYXRlIiwiZ2V0UHJldmlvdXNZZWFyU3RhcnQiLCJnZXROZXh0WWVhclN0YXJ0IiwiZ2V0WWVhckVuZCIsImdldFByZXZpb3VzWWVhckVuZCIsImdldFllYXJSYW5nZSIsIm1ha2VHZXRFZGdlT2ZOZWlnaGJvck1vbnRoIiwibWFrZUdldEVkZ2VPZk5laWdoYm9yTW9udGhJbnRlcm5hbCIsIm1vbnRoIiwiZ2V0TW9udGhTdGFydCIsIm1vbnRoU3RhcnREYXRlIiwiZ2V0UHJldmlvdXNNb250aFN0YXJ0IiwiZ2V0TmV4dE1vbnRoU3RhcnQiLCJnZXRNb250aEVuZCIsImdldFByZXZpb3VzTW9udGhFbmQiLCJnZXRNb250aFJhbmdlIiwibWFrZUdldEVkZ2VPZk5laWdoYm9yRGF5IiwibWFrZUdldEVkZ2VPZk5laWdoYm9yRGF5SW50ZXJuYWwiLCJkYXkiLCJnZXREYXlTdGFydCIsImRheVN0YXJ0RGF0ZSIsImdldE5leHREYXlTdGFydCIsImdldERheUVuZCIsImdldERheVJhbmdlIiwiZ2V0RGF5c0luTW9udGgiLCJwYWRTdGFydCIsIm51bSIsInZhbCIsIm51bVN0ciIsImdldElTT0xvY2FsTW9udGgiLCJnZXRJU09Mb2NhbERhdGUiLCJDQUxFTkRBUl9UWVBFUyIsIkdSRUdPUlkiLCJIRUJSRVciLCJJU0xBTUlDIiwiSVNPXzg2MDEiLCJDQUxFTkRBUl9UWVBFX0xPQ0FMRVMiLCJncmVnb3J5IiwiaGVicmV3IiwiaXNsYW1pYyIsIldFRUtEQVlTIiwiZm9ybWF0dGVyQ2FjaGUiLCJnZXRGb3JtYXR0ZXIiLCJmb3JtYXR0ZXIiLCJsb2NhbGVXaXRoRGVmYXVsdCIsImZvcm1hdHRlckNhY2hlTG9jYWxlIiwiSW50bCIsIkRhdGVUaW1lRm9ybWF0IiwiZm9ybWF0IiwidG9TYWZlSG91ciIsInNhZmVEYXRlIiwiZ2V0U2FmZUZvcm1hdHRlciIsImZvcm1hdERheU9wdGlvbnMiLCJmb3JtYXRMb25nRGF0ZU9wdGlvbnMiLCJmb3JtYXRNb250aE9wdGlvbnMiLCJmb3JtYXRNb250aFllYXJPcHRpb25zIiwiZm9ybWF0U2hvcnRXZWVrZGF5T3B0aW9ucyIsIndlZWtkYXkiLCJmb3JtYXRXZWVrZGF5T3B0aW9ucyIsImZvcm1hdFllYXJPcHRpb25zIiwiZm9ybWF0RGF5IiwiZm9ybWF0TG9uZ0RhdGUiLCJmb3JtYXRNb250aCIsImZvcm1hdE1vbnRoWWVhciIsImZvcm1hdFNob3J0V2Vla2RheSIsImZvcm1hdFdlZWtkYXkiLCJmb3JtYXRZZWFyIiwiU1VOREFZIiwiRlJJREFZIiwiU0FUVVJEQVkiLCJnZXREYXlPZldlZWsiLCJjYWxlbmRhclR5cGUiLCJnZXREYXkiLCJnZXRCZWdpbk9mQ2VudHVyeVllYXIiLCJiZWdpbk9mQ2VudHVyeSIsImdldEJlZ2luT2ZEZWNhZGVZZWFyIiwiYmVnaW5PZkRlY2FkZSIsImdldEJlZ2luT2ZXZWVrIiwibW9udGhJbmRleCIsImdldE1vbnRoSW5kZXgiLCJnZXRXZWVrTnVtYmVyIiwiY2FsZW5kYXJUeXBlRm9yV2Vla051bWJlciIsImJlZ2luT2ZXZWVrIiwiZGF5SW5XZWVrT25lIiwiYmVnaW5PZkZpcnN0V2VlayIsIk1hdGgiLCJyb3VuZCIsImdldEJlZ2luIiwicmFuZ2VUeXBlIiwiZ2V0QmVnaW5QcmV2aW91cyIsImdldEJlZ2luTmV4dCIsImdldEJlZ2luUHJldmlvdXMyIiwiZ2V0QmVnaW5OZXh0MiIsImdldEVuZFByZXZpb3VzIiwiZ2V0RW5kUHJldmlvdXMyIiwiZ2V0UmFuZ2UiLCJnZXRWYWx1ZVJhbmdlIiwiZGF0ZTEiLCJkYXRlMiIsInJhd05leHRWYWx1ZSIsInNvcnQiLCJhIiwiYiIsInRvWWVhckxhYmVsIiwiZGF0ZXMiLCJkZWZhdWx0Rm9ybWF0WWVhciIsImpvaW4iLCJnZXRDZW50dXJ5TGFiZWwiLCJnZXREZWNhZGVMYWJlbCIsImlzQ3VycmVudERheU9mV2VlayIsImlzV2Vla2VuZCIsImNsYXNzTmFtZSIsIk5hdmlnYXRpb24iLCJhY3RpdmVTdGFydERhdGUiLCJkcmlsbFVwIiwiZGVmYXVsdEZvcm1hdE1vbnRoWWVhciIsIm1heERhdGUiLCJtaW5EYXRlIiwibmF2aWdhdGlvbkFyaWFMYWJlbCIsIm5hdmlnYXRpb25BcmlhTGl2ZSIsIm5hdmlnYXRpb25MYWJlbCIsIl9lIiwibmV4dDJBcmlhTGFiZWwiLCJfZiIsIm5leHQyTGFiZWwiLCJfZyIsIm5leHRBcmlhTGFiZWwiLCJfaCIsIm5leHRMYWJlbCIsIl9qIiwicHJldjJBcmlhTGFiZWwiLCJfayIsInByZXYyTGFiZWwiLCJfbCIsInByZXZBcmlhTGFiZWwiLCJfbSIsInByZXZMYWJlbCIsInNldEFjdGl2ZVN0YXJ0RGF0ZSIsInNob3dEb3VibGVWaWV3IiwidmlldyIsInZpZXdzIiwiZHJpbGxVcEF2YWlsYWJsZSIsInNob3VsZFNob3dQcmV2TmV4dDJCdXR0b25zIiwicHJldmlvdXNBY3RpdmVTdGFydERhdGUiLCJwcmV2aW91c0FjdGl2ZVN0YXJ0RGF0ZTIiLCJuZXh0QWN0aXZlU3RhcnREYXRlIiwibmV4dEFjdGl2ZVN0YXJ0RGF0ZTIiLCJwcmV2QnV0dG9uRGlzYWJsZWQiLCJwcmV2aW91c0FjdGl2ZUVuZERhdGUiLCJwcmV2MkJ1dHRvbkRpc2FibGVkIiwibmV4dEJ1dHRvbkRpc2FibGVkIiwibmV4dDJCdXR0b25EaXNhYmxlZCIsIm9uQ2xpY2tQcmV2aW91cyIsIm9uQ2xpY2tQcmV2aW91czIiLCJvbkNsaWNrTmV4dCIsIm9uQ2xpY2tOZXh0MiIsInJlbmRlckxhYmVsIiwibGFiZWwiLCJyZW5kZXJCdXR0b24iLCJsYWJlbENsYXNzTmFtZSIsIl9qc3hzIiwiZGlzYWJsZWQiLCJvbkNsaWNrIiwic3R5bGUiLCJmbGV4R3JvdyIsInR5cGUiLCJjaGlsZHJlbiIsIl9qc3giLCJfRnJhZ21lbnQiLCJfX2Fzc2lnbiIsImFzc2lnbiIsInMiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJfX3Jlc3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsInRvUGVyY2VudCIsIkZsZXgiLCJjb3VudCIsImRpcmVjdGlvbiIsIndyYXAiLCJvdGhlclByb3BzIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJmbGV4V3JhcCIsIkNoaWxkcmVuIiwiY2hpbGQiLCJtYXJnaW5JbmxpbmVTdGFydCIsImNsb25lRWxlbWVudCIsImZsZXhCYXNpcyIsImZsZXhTaHJpbmsiLCJvdmVyZmxvdyIsIm1hcmdpbkxlZnQiLCJtYXJnaW5JbmxpbmVFbmQiLCJiZXR3ZWVuIiwibWluIiwibWF4IiwiaXNWYWx1ZVdpdGhpblJhbmdlIiwicmFuZ2UiLCJpc1JhbmdlV2l0aGluUmFuZ2UiLCJncmVhdGVyUmFuZ2UiLCJzbWFsbGVyUmFuZ2UiLCJkb1Jhbmdlc092ZXJsYXAiLCJyYW5nZTEiLCJyYW5nZTIiLCJnZXRSYW5nZUNsYXNzTmFtZXMiLCJ2YWx1ZVJhbmdlIiwiZGF0ZVJhbmdlIiwiYmFzZUNsYXNzTmFtZSIsImlzUmFuZ2UiLCJjbGFzc2VzIiwiaXNSYW5nZVN0YXJ0IiwiaXNSYW5nZUVuZCIsImlzQ29tcGxldGVWYWx1ZSIsImdldFRpbGVDbGFzc2VzIiwiYXJncyIsImhvdmVyIiwiZGF0ZVR5cGUiLCJ2YWx1ZVR5cGUiLCJ2YWx1ZVJhbmdlQ2xhc3NOYW1lcyIsInZhbHVlQXJyYXkiLCJob3ZlclJhbmdlIiwiaG92ZXJSYW5nZUNsYXNzTmFtZXMiLCJUaWxlR3JvdXAiLCJkYXRlVHJhbnNmb3JtIiwiZW5kIiwicmVuZGVyVGlsZSIsInN0YXJ0IiwidGlsZXMiLCJwb2ludCIsIlRpbGUiLCJmb3JtYXRBYmJyIiwibWF4RGF0ZVRyYW5zZm9ybSIsIm1pbkRhdGVUcmFuc2Zvcm0iLCJvbk1vdXNlT3ZlciIsInRpbGVDbGFzc05hbWVQcm9wcyIsInRpbGVDbGFzc05hbWUiLCJ0aWxlQ29udGVudFByb3BzIiwidGlsZUNvbnRlbnQiLCJ0aWxlRGlzYWJsZWQiLCJ1c2VNZW1vIiwib25Gb2N1cyIsIkRlY2FkZSIsImN1cnJlbnRDZW50dXJ5IiwiY2xhc3Nlc1Byb3BzIiwiRGVjYWRlcyIsInNob3dOZWlnaGJvcmluZ0NlbnR1cnkiLCJvdGhlclRpbGVQcm9wcyIsIkNlbnR1cnlWaWV3IiwicmVuZGVyRGVjYWRlcyIsIlllYXIiLCJjdXJyZW50RGVjYWRlIiwiWWVhcnMiLCJzaG93TmVpZ2hib3JpbmdEZWNhZGUiLCJEZWNhZGVWaWV3IiwicmVuZGVyWWVhcnMiLCJNb250aCIsImRlZmF1bHRGb3JtYXRNb250aCIsIk1vbnRocyIsIlllYXJWaWV3IiwicmVuZGVyTW9udGhzIiwiRGF5IiwiY3VycmVudE1vbnRoSW5kZXgiLCJkZWZhdWx0Rm9ybWF0RGF5IiwiZGVmYXVsdEZvcm1hdExvbmdEYXRlIiwiRGF5cyIsInNob3dGaXhlZE51bWJlck9mV2Vla3MiLCJzaG93TmVpZ2hib3JpbmdNb250aCIsImhhc0ZpeGVkTnVtYmVyT2ZXZWVrcyIsImRheU9mV2VlayIsImRheXNJbk1vbnRoIiwiYWN0aXZlRW5kRGF0ZSIsImRheXNVbnRpbEVuZE9mVGhlV2VlayIsIndlZWtkYXlDbGFzc05hbWUiLCJXZWVrZGF5cyIsImRlZmF1bHRGb3JtYXRTaG9ydFdlZWtkYXkiLCJkZWZhdWx0Rm9ybWF0V2Vla2RheSIsIm9uTW91c2VMZWF2ZSIsImFueURhdGUiLCJiZWdpbk9mTW9udGgiLCJ3ZWVrZGF5cyIsIndlZWtkYXlEYXRlIiwiYWJiciIsInRpdGxlIiwicmVwbGFjZSIsIldlZWtOdW1iZXIiLCJvbkNsaWNrV2Vla051bWJlciIsIndlZWtOdW1iZXIiLCJkYXRlXzEiLCJvbkNsaWNrV2Vla051bWJlcl8xIiwid2Vla051bWJlcl8xIiwiV2Vla051bWJlcnMiLCJudW1iZXJPZldlZWtzIiwibnVtYmVyT2ZEYXlzIiwic3RhcnRXZWVrZGF5IiwiZGF5cyIsImNlaWwiLCJ3ZWVrTnVtYmVycyIsIndlZWtJbmRleCIsImdldENhbGVuZGFyVHlwZUZyb21Mb2NhbGUiLCJlbnRyaWVzIiwibG9jYWxlcyIsImluY2x1ZGVzIiwiTW9udGhWaWV3Iiwic2hvd1dlZWtOdW1iZXJzIiwiY2hpbGRQcm9wcyIsInJlbmRlcldlZWtkYXlzIiwicmVuZGVyV2Vla051bWJlcnMiLCJyZW5kZXJEYXlzIiwiYWxpZ25JdGVtcyIsIndpZHRoIiwiYWxsVmlld3MiLCJhbGxWYWx1ZVR5cGVzIiwiZGVmYXVsdE1pbkRhdGUiLCJkZWZhdWx0TWF4RGF0ZSIsInRvRGF0ZSIsImdldExpbWl0ZWRWaWV3cyIsIm1pbkRldGFpbCIsIm1heERldGFpbCIsImlzVmlld0FsbG93ZWQiLCJnZXRWaWV3IiwiZ2V0VmFsdWVUeXBlIiwiZ2V0VmFsdWUiLCJyYXdWYWx1ZSIsInZhbHVlRGF0ZSIsImdldERldGFpbFZhbHVlIiwidmFsdWVQaWVjZSIsImRldGFpbFZhbHVlRnJvbSIsImdldERldGFpbFZhbHVlRnJvbSIsImdldERldGFpbFZhbHVlVG8iLCJnZXREZXRhaWxWYWx1ZUFycmF5IiwiZ2V0QWN0aXZlU3RhcnREYXRlIiwidmFsdWVGcm9tIiwiZ2V0SW5pdGlhbEFjdGl2ZVN0YXJ0RGF0ZSIsImRlZmF1bHRBY3RpdmVTdGFydERhdGUiLCJkZWZhdWx0VmFsdWUiLCJkZWZhdWx0VmlldyIsImdldElzU2luZ2xlVmFsdWUiLCJhcmVEYXRlc0VxdWFsIiwiQ2FsZW5kYXIiLCJmb3J3YXJkUmVmIiwicmVmIiwiYWN0aXZlU3RhcnREYXRlUHJvcHMiLCJhbGxvd1BhcnRpYWxSYW5nZSIsImdvVG9SYW5nZVN0YXJ0T25TZWxlY3QiLCJpbnB1dFJlZiIsIm9uQWN0aXZlU3RhcnREYXRlQ2hhbmdlIiwib25DaGFuZ2VQcm9wcyIsIm9uQ2hhbmdlIiwib25DbGlja0RheSIsIm9uQ2xpY2tEZWNhZGUiLCJvbkNsaWNrTW9udGgiLCJvbkNsaWNrWWVhciIsIm9uRHJpbGxEb3duIiwib25EcmlsbFVwIiwib25WaWV3Q2hhbmdlIiwicmV0dXJuVmFsdWUiLCJzZWxlY3RSYW5nZSIsInNob3dOYXZpZ2F0aW9uIiwidmFsdWVQcm9wcyIsInZpZXdQcm9wcyIsInVzZVN0YXRlIiwiYWN0aXZlU3RhcnREYXRlU3RhdGUiLCJzZXRBY3RpdmVTdGFydERhdGVTdGF0ZSIsImhvdmVyU3RhdGUiLCJzZXRIb3ZlclN0YXRlIiwidmFsdWVTdGF0ZSIsInNldFZhbHVlU3RhdGUiLCJ2aWV3U3RhdGUiLCJzZXRWaWV3U3RhdGUiLCJkcmlsbERvd25BdmFpbGFibGUiLCJnZXRQcm9jZXNzZWRWYWx1ZSIsInVzZUNhbGxiYWNrIiwicHJvY2Vzc0Z1bmN0aW9uIiwiYWN0aW9uIiwib25DbGlja1RpbGUiLCJjYWxsYmFjayIsImRyaWxsRG93biIsIm5leHRWaWV3IiwicHJldmlvdXNWYWx1ZSIsImlzRmlyc3RWYWx1ZUluUmFuZ2UiLCJuZXh0VmFsdWUiLCJwZXJzaXN0IiwiaXNTaW5nbGVWYWx1ZSIsIm5leHRIb3ZlciIsInVzZUltcGVyYXRpdmVIYW5kbGUiLCJyZW5kZXJDb250ZW50IiwiY3VycmVudEFjdGl2ZVN0YXJ0RGF0ZSIsImNvbW1vblByb3BzIiwicmVuZGVyTmF2aWdhdGlvbiIsIm9uQmx1ciIsImdldFJlY3QiLCJlbGVtZW50IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZGV0ZWN0RWxlbWVudE92ZXJmbG93IiwiY29udGFpbmVyIiwiY29sbGlkZWRUb3AiLCJ0b3AiLCJjb2xsaWRlZEJvdHRvbSIsImJvdHRvbSIsImNvbGxpZGVkTGVmdCIsImxlZnQiLCJjb2xsaWRlZFJpZ2h0IiwicmlnaHQiLCJvdmVyZmxvd1RvcCIsIm92ZXJmbG93Qm90dG9tIiwib3ZlcmZsb3dMZWZ0Iiwib3ZlcmZsb3dSaWdodCIsIndhcm5pbmciLCJwcmludFdhcm5pbmciLCJsZW4iLCJhcmdJbmRleCIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiZXJyb3IiLCJ4IiwiY29uZGl0aW9uIiwiaXNCcm93c2VyIiwiZG9jdW1lbnQiLCJpc011dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQiLCJ3aW5kb3ciLCJjYXBpdGFsaXplIiwic3RyaW5nIiwiY2hhckF0IiwiZmluZFNjcm9sbENvbnRhaW5lciIsInBhcmVudCIsInBhcmVudEVsZW1lbnQiLCJnZXRDb21wdXRlZFN0eWxlIiwiZXZlcnkiLCJkb2N1bWVudEVsZW1lbnQiLCJhbGlnbkF4aXMiLCJheGlzIiwiaW52ZXJ0QXhpcyIsInNjcm9sbENvbnRhaW5lciIsInNlY29uZGFyeSIsInNwYWNpbmciLCJzY3JvbGxDb250YWluZXJDb2xsaXNpb25zIiwiZG9jdW1lbnRDb2xsaXNpb25zIiwiaXNYIiwic3RhcnRQcm9wZXJ0eSIsImVuZFByb3BlcnR5Iiwic2l6ZVByb3BlcnR5Iiwib3ZlcmZsb3dTdGFydFByb3BlcnR5Iiwib3ZlcmZsb3dFbmRQcm9wZXJ0eSIsInNjcm9sbFByb3BlcnR5IiwidXBwZXJjYXNlZFNpemVQcm9wZXJ0eSIsIm9mZnNldFNpemVQcm9wZXJ0eSIsImNsaWVudFNpemVQcm9wZXJ0eSIsIm1pblNpemVQcm9wZXJ0eSIsInNjcm9sbGJhcldpZHRoIiwic3RhcnRTcGFjaW5nIiwiYXZhaWxhYmxlU3RhcnRTcGFjZSIsImVuZFNwYWNpbmciLCJhdmFpbGFibGVFbmRTcGFjZSIsIm9mZnNldFNpemUiLCJkaXNwbGF5U3RhcnQiLCJkaXNwbGF5RW5kIiwiZGlzcGxheUlmRml0cyIsImF2YWlsYWJsZVNwYWNlIiwiZml0cyIsImRpc3BsYXlTdGFydElmRml0cyIsImRpc3BsYXlFbmRJZkZpdHMiLCJkaXNwbGF5V2hlcmV2ZXJTaHJpbmtlZEZpdHMiLCJtb3JlU3BhY2VTdGFydCIsInJhd01pblNpemUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwibWluU2l6ZSIsInNocmlua1RvU2l6ZSIsInNpemUiLCJuZXdTaXplIiwiYWxpZ25NYWluQXhpcyIsImFsaWduU2Vjb25kYXJ5QXhpcyIsImFsaWduQm90aEF4aXMiLCJpbnZlcnRTZWNvbmRhcnlBeGlzIiwiY29tbW9uQXJncyIsIkZpdCIsIm1haW5BeGlzIiwidXNlUmVmIiwiZWxlbWVudFdpZHRoIiwiZWxlbWVudEhlaWdodCIsImZpdCIsImN1cnJlbnQiLCJjdXJyZW50RWxlbWVudFdpZHRoIiwiY2xpZW50V2lkdGgiLCJjdXJyZW50RWxlbWVudEhlaWdodCIsImNsaWVudEhlaWdodCIsInBvc2l0aW9uIiwicGFyZW50U3R5bGUiLCJwYXJlbnRQb3NpdGlvbiIsIm9ubHkiLCJ1c2VFZmZlY3QiLCJvbk11dGF0aW9uIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUZpbHRlciIsImFzc2lnblJlZnMiLCJkb21FbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJkb21Db250YWluZXIiLCJmaXJzdEVsZW1lbnRDaGlsZCIsIkRpdmlkZXIiLCJhbGxvd2VkVmFyaWFudHMiLCJnZXRGb250U2hvcnRoYW5kIiwiZm9udCIsImlzRm9udERlZmluZWQiLCJmb250RmFtaWx5IiwiZm9udFZhcmlhbnQiLCJmb250U3R5bGUiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwiY2FjaGVkQ2FudmFzIiwibWVhc3VyZVRleHQiLCJ0ZXh0IiwiY2FudmFzIiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwidXBkYXRlSW5wdXRXaWR0aCIsInBsYWNlaG9sZGVyIiwidXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdCIsInVzZUxheW91dEVmZmVjdCIsImlzSUVPckVkZ2VMZWdhY3kiLCJ0ZXN0IiwidXNlckFnZW50IiwiaXNGaXJlZm94IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2VsZWN0IiwidXBkYXRlSW5wdXRXaWR0aE9uTG9hZCIsInJlYWR5U3RhdGUiLCJvbkxvYWQiLCJhZGRFdmVudExpc3RlbmVyIiwidXBkYXRlSW5wdXRXaWR0aE9uRm9udExvYWQiLCJmb250cyIsImlzRm9udExvYWRlZCIsImNoZWNrIiwib25Mb2FkaW5nRG9uZSIsImdldFNlbGVjdGlvblN0cmluZyIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0aW9uIiwibWFrZU9uS2V5UHJlc3MiLCJtYXhMZW5ndGgiLCJvbktleVByZXNzIiwiaXNOdW1iZXJLZXkiLCJwcmV2ZW50RGVmYXVsdCIsIklucHV0IiwiYXJpYUxhYmVsIiwiYXV0b0ZvY3VzIiwibmFtZUZvckNsYXNzIiwib25LZXlEb3duIiwib25LZXlVcCIsInJlcXVpcmVkIiwic2hvd0xlYWRpbmdaZXJvcyIsImhhc0xlYWRpbmdaZXJvIiwic3RhcnRzV2l0aCIsImF1dG9Db21wbGV0ZSIsImlucHV0TW9kZSIsImlzVmFsaWROdW1iZXIiLCJzYWZlTWluIiwic2FmZU1heCIsIkRheUlucHV0IiwiY3VycmVudE1vbnRoTWF4RGF5cyIsImlzU2FtZU1vbnRoIiwibWF4RGF5IiwibWluRGF5IiwiTW9udGhJbnB1dCIsImlzU2FtZVllYXIiLCJtYXhNb250aCIsIm1pbk1vbnRoIiwiZm9ybWF0U2hvcnRNb250aE9wdGlvbnMiLCJmb3JtYXRTaG9ydE1vbnRoIiwiTW9udGhTZWxlY3QiLCJzaG9ydCIsIlllYXJJbnB1dCIsIm1heFllYXIiLCJtaW5ZZWFyIiwieWVhclN0ZXAiLCJOYXRpdmVJbnB1dCIsIm5hdGl2ZUlucHV0VHlwZSIsIm5hdGl2ZVZhbHVlUGFyc2VyIiwic3RvcFByb3BhZ2F0aW9uIiwiaGlkZGVuIiwidmlzaWJpbGl0eSIsInpJbmRleCIsImdldEZvcm1hdHRlck9wdGlvbnNDYWNoZSIsImlzSW50ZXJuYWxJbnB1dCIsImRhdGFzZXQiLCJmaW5kSW5wdXQiLCJuZXh0RWxlbWVudCIsImZvY3VzIiwicmVuZGVyQ3VzdG9tSW5wdXRzIiwiZWxlbWVudEZ1bmN0aW9ucyIsImFsbG93TXVsdGlwbGVJbnN0YW5jZXMiLCJ1c2VkRnVuY3Rpb25zIiwicGF0dGVybiIsIlJlZ0V4cCIsImtleXMiLCJtYXRjaGVzIiwibWF0Y2giLCJyZWR1Y2UiLCJkaXZpZGVyIiwiY3VycmVudE1hdGNoIiwicmVuZGVyRnVuY3Rpb24iLCJmaW5kIiwiZWxlbWVudEZ1bmN0aW9uIiwiRGF0ZUlucHV0IiwiZGF5QXJpYUxhYmVsIiwiZGF5UGxhY2Vob2xkZXIiLCJpc0NhbGVuZGFyT3BlbiIsImlzQ2FsZW5kYXJPcGVuUHJvcHMiLCJtb250aEFyaWFMYWJlbCIsIm1vbnRoUGxhY2Vob2xkZXIiLCJuYXRpdmVJbnB1dEFyaWFMYWJlbCIsIm9uSW52YWxpZENoYW5nZSIsInllYXJBcmlhTGFiZWwiLCJ5ZWFyUGxhY2Vob2xkZXIiLCJzZXRZZWFyIiwic2V0TW9udGgiLCJzZXREYXkiLCJzZXRWYWx1ZSIsInllYXJJbnB1dCIsIm1vbnRoSW5wdXQiLCJtb250aFNlbGVjdCIsImRheUlucHV0Iiwic2V0SXNDYWxlbmRhck9wZW4iLCJsYXN0UHJlc3NlZEtleSIsImZvcm1hdERhdGUiLCJsZXZlbCIsImZvcm1hdHRlck9wdGlvbnMiLCJmb3JtYXR0ZWREYXRlIiwiZGF0ZVBpZWNlcyIsImRhdGVQaWVjZVJlcGxhY2VtZW50cyIsImZvcm1hdERhdGVQaWVjZSIsImRhdGVUb0Zvcm1hdCIsImRhdGVQaWVjZSIsImZvcm1hdHRlZERhdGVQaWVjZSIsImRhdGVQaWVjZVJlcGxhY2VtZW50IiwiZGl2aWRlcnMiLCJjdXJyZW50VGFyZ2V0IiwiZmlyc3RJbnB1dCIsIm5leHRJbnB1dCIsImlzTGFzdFByZXNzZWRLZXkiLCJnZXRBdHRyaWJ1dGUiLCJvbkNoYW5nZUV4dGVybmFsIiwiZmlsdGVyQm9vbGVhbiIsIkJvb2xlYW4iLCJmb3JtRWxlbWVudHMiLCJ2YWx1ZXMiLCJmb3JtRWxlbWVudCIsInZhbHVlQXNOdW1iZXIiLCJpc0V2ZXJ5VmFsdWVFbXB0eSIsImlzRXZlcnlWYWx1ZUZpbGxlZCIsImlzRXZlcnlWYWx1ZVZhbGlkIiwidmFsaWRpdHkiLCJ2YWxpZCIsInllYXJfMSIsImRheV8xIiwicHJvcG9zZWRWYWx1ZSIsInByb2Nlc3NlZFZhbHVlIiwib25DaGFuZ2VOYXRpdmUiLCJ5ZWFyU3RyaW5nIiwibW9udGhTdHJpbmciLCJkYXlTdHJpbmciLCJjb21tb25JbnB1dFByb3BzIiwicmVuZGVyRGF5Iiwic2hvd0xlYWRpbmdaZXJvc0Zyb21Gb3JtYXQiLCJyZW5kZXJNb250aCIsInJlbmRlclllYXIiLCJyZW5kZXJDdXN0b21JbnB1dHNJbnRlcm5hbCIsImQiLCJNIiwieSIsInJlbmRlck5hdGl2ZUlucHV0Iiwib3V0c2lkZUFjdGlvbkV2ZW50cyIsImljb25Qcm9wcyIsInhtbG5zIiwiaGVpZ2h0Iiwidmlld0JveCIsInN0cm9rZSIsInN0cm9rZVdpZHRoIiwiQ2FsZW5kYXJJY29uIiwiZmlsbCIsIngxIiwieDIiLCJ5MSIsInkyIiwiQ2xlYXJJY29uIiwiRGF0ZVBpY2tlciIsImNhbGVuZGFyQXJpYUxhYmVsIiwiY2FsZW5kYXJJY29uIiwiY2xlYXJBcmlhTGFiZWwiLCJjbGVhckljb24iLCJjbG9zZUNhbGVuZGFyIiwic2hvdWxkQ2xvc2VDYWxlbmRhck9uU2VsZWN0IiwiZGF0YVRlc3RpZCIsImRpc2FibGVDYWxlbmRhciIsImlkIiwiaXNPcGVuIiwiaXNPcGVuUHJvcHMiLCJvbkNhbGVuZGFyQ2xvc2UiLCJvbkNhbGVuZGFyT3BlbiIsIm9uRm9jdXNQcm9wcyIsIm9wZW5DYWxlbmRhck9uRm9jdXMiLCJzaG91bGRDbG9zZUNhbGVuZGFyIiwic2hvdWxkT3BlbkNhbGVuZGFyIiwic2V0SXNPcGVuIiwid3JhcHBlciIsImNhbGVuZGFyV3JhcHBlciIsIm9wZW5DYWxlbmRhciIsInJlYXNvbiIsInRvZ2dsZUNhbGVuZGFyIiwib25PdXRzaWRlQWN0aW9uIiwid3JhcHBlckVsIiwiY2FsZW5kYXJXcmFwcGVyRWwiLCJjb21wb3NlZFBhdGgiLCJjb250YWlucyIsImhhbmRsZU91dHNpZGVBY3Rpb25MaXN0ZW5lcnMiLCJzaG91bGRMaXN0ZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVySW5wdXRzIiwiYXJpYUxhYmVsUHJvcHMiLCJwbGFjZWhvbGRlclByb3BzIiwicmVuZGVyQ2FsZW5kYXIiLCJjYWxlbmRhclByb3BzIiwicG9ydGFsQ29udGFpbmVyIiwiY2xhc3NOYW1lcyIsImNhbGVuZGFyIiwiY3JlYXRlUG9ydGFsIiwicmVtb3ZlQXR0cmlidXRlIiwiUmVhY3REYXRlUGlja2VyIiwiYXV0b1NlbGVjdFRvZGF5IiwiZGF0ZUF0dHIiLCJvbkNoYW5nZUFjdGlvbiIsInJlYWRPbmx5U3R5bGUiLCJyZXN0IiwiY2xhc3MiLCJ3aWRnZXROYW1lIiwiY3VycmVudFZhbHVlIiwic2V0Q3VycmVudFZhbHVlIiwic3RhdHVzIiwiZGlzcGxheVZhbHVlIiwiZGlzYWJsZWRWYWx1ZSIsInNldERpc2FibGVkVmFsdWUiLCJyZWFkT25seSIsIm9uQ2hhbmdlSW5wdXRBY3Rpb24iLCJjYW5FeGVjdXRlIiwiZXhlY3V0ZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQUlB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QTtBQUVkLEdBQUMsTUFBTTtBQUNILElBQUEsT0FDSW5PLGFBQUEsQ0FBQSxLQUFBLEVBQUE7TUFBS3ZaLFNBQVMsRUFBRSxxQkFBcUJvRCxLQUFLLENBQUEsQ0FBQTtBQUFHLEtBQUEsRUFDeENxWSxTQUFTLEtBQUssS0FBSyxJQUFJbEMsYUFBQSxDQUFBLFFBQUEsRUFBQTtBQUFRdlosTUFBQUEsU0FBUyxFQUFDLDRCQUFBO0FBQTRCLEtBQVMsQ0FBQyxFQUNoRnVaLGFBQUEsQ0FBQzhLLFVBQVUsRUFBQTtBQUNQNUksTUFBQUEsU0FBUyxFQUFFQSxTQUFVO0FBQ3JCSyxNQUFBQSxnQkFBZ0IsRUFBRUEsZ0JBQWlCO0FBQ25DaUosTUFBQUEsTUFBTSxFQUFFdEosU0FBVTtBQUNsQjZJLE1BQUFBLGlCQUFpQixFQUFDLGlCQUFpQjtBQUNuQ3RrQixNQUFBQSxTQUFTLEVBQUMsY0FBYztBQUN4QndrQixNQUFBQSxjQUFjLEVBQUMsYUFBYTtBQUM1QkssTUFBQUEsZUFBZSxFQUFFOEMsYUFBYztBQUMvQnprQixNQUFBQSxRQUFRLEVBQUV5a0IsYUFBYztBQUN4QjdDLE1BQUFBLEVBQUUsRUFBRUEsRUFBRztNQUNQaFcsUUFBUSxFQUFFcFksSUFBSSxJQUFJO0FBQ2RveEIsUUFBQUEsbUJBQW1CLEVBQUUsQ0FBQTtRQUNyQk4sZUFBZSxDQUFDOXdCLElBQUksR0FBRyxJQUFJbEYsSUFBSSxDQUFDa0YsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7T0FDN0M7QUFDRnhJLE1BQUFBLEtBQUssRUFBRXE1QixZQUFhO0FBQ3BCbEksTUFBQUEsY0FBYyxFQUFFQSxjQUFlO0FBQy9CSSxNQUFBQSxnQkFBZ0IsRUFBRUEsZ0JBQWlCO0FBQ25DSSxNQUFBQSxlQUFlLEVBQUVBLGVBQUFBO0FBQWdCLEtBQ3BDLENBQ0EsQ0FBQyxDQUFBO0FBRWQsR0FBQTtBQUNKOzs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3XX0=
