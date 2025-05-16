define(['exports', 'react', 'react/jsx-runtime', 'react-dom'], (function (exports, react, jsxRuntime, reactDom) { 'use strict';

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
        return jsxRuntime.jsxs("button", {
          "aria-label": navigationAriaLabel,
          "aria-live": navigationAriaLive,
          className: labelClassName,
          disabled: !drillUpAvailable,
          onClick: drillUp,
          style: {
            flexGrow: 1
          },
          type: "button",
          children: [jsxRuntime.jsx("span", {
            className: "".concat(labelClassName, "__labelText ").concat(labelClassName, "__labelText--from"),
            children: renderLabel(activeStartDate)
          }), showDoubleView ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [jsxRuntime.jsx("span", {
              className: "".concat(labelClassName, "__divider"),
              children: " \u2013 "
            }), jsxRuntime.jsx("span", {
              className: "".concat(labelClassName, "__labelText ").concat(labelClassName, "__labelText--to"),
              children: renderLabel(nextActiveStartDate)
            })]
          }) : null]
        });
      }
      return jsxRuntime.jsxs("div", {
        className: className$6,
        children: [prev2Label !== null && shouldShowPrevNext2Buttons ? jsxRuntime.jsx("button", {
          "aria-label": prev2AriaLabel,
          className: "".concat(className$6, "__arrow ").concat(className$6, "__prev2-button"),
          disabled: prev2ButtonDisabled,
          onClick: onClickPrevious2,
          type: "button",
          children: prev2Label
        }) : null, prevLabel !== null && jsxRuntime.jsx("button", {
          "aria-label": prevAriaLabel,
          className: "".concat(className$6, "__arrow ").concat(className$6, "__prev-button"),
          disabled: prevButtonDisabled,
          onClick: onClickPrevious,
          type: "button",
          children: prevLabel
        }), renderButton(), nextLabel !== null && jsxRuntime.jsx("button", {
          "aria-label": nextAriaLabel,
          className: "".concat(className$6, "__arrow ").concat(className$6, "__next-button"),
          disabled: nextButtonDisabled,
          onClick: onClickNext,
          type: "button",
          children: nextLabel
        }), next2Label !== null && shouldShowPrevNext2Buttons ? jsxRuntime.jsx("button", {
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
      return jsxRuntime.jsx("div", __assign$k({
        className: className,
        style: __assign$k({
          display: 'flex',
          flexDirection: direction,
          flexWrap: wrap ? 'wrap' : 'nowrap'
        }, style)
      }, otherProps, {
        children: react.Children.map(children, function (child, index) {
          var marginInlineStart = offset && index === 0 ? toPercent(100 * offset / count) : null;
          return react.cloneElement(child, __assign$k(__assign$k({}, child.props), {
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
      return jsxRuntime.jsx(Flex, {
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
      var tileClassName = react.useMemo(function () {
        var args = {
          activeStartDate: activeStartDate,
          date: date,
          view: view
        };
        return typeof tileClassNameProps === 'function' ? tileClassNameProps(args) : tileClassNameProps;
      }, [activeStartDate, date, tileClassNameProps, view]);
      var tileContent = react.useMemo(function () {
        var args = {
          activeStartDate: activeStartDate,
          date: date,
          view: view
        };
        return typeof tileContentProps === 'function' ? tileContentProps(args) : tileContentProps;
      }, [activeStartDate, date, tileContentProps, view]);
      return jsxRuntime.jsxs("button", {
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
        children: [formatAbbr ? jsxRuntime.jsx("abbr", {
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
      return jsxRuntime.jsx(Tile, __assign$j({}, otherProps, {
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
      return jsxRuntime.jsx(TileGroup, {
        className: "react-calendar__century-view__decades",
        dateTransform: getDecadeStart,
        dateType: "decade",
        end: end,
        hover: hover,
        renderTile: function (_a) {
          var date = _a.date,
            otherTileProps = __rest$d(_a, ["date"]);
          return jsxRuntime.jsx(Decade, __assign$i({}, otherProps, otherTileProps, {
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
        return jsxRuntime.jsx(Decades, __assign$h({}, props));
      }
      return jsxRuntime.jsx("div", {
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
      return jsxRuntime.jsx(Tile, __assign$g({}, otherProps, {
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
      return jsxRuntime.jsx(TileGroup, {
        className: "react-calendar__decade-view__years",
        dateTransform: getYearStart,
        dateType: "year",
        end: end,
        hover: hover,
        renderTile: function (_a) {
          var date = _a.date,
            otherTileProps = __rest$b(_a, ["date"]);
          return jsxRuntime.jsx(Year, __assign$f({}, otherProps, otherTileProps, {
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
        return jsxRuntime.jsx(Years, __assign$e({}, props));
      }
      return jsxRuntime.jsx("div", {
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
      return jsxRuntime.jsx(Tile, __assign$d({}, otherProps, {
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
      return jsxRuntime.jsx(TileGroup, {
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
          return jsxRuntime.jsx(Month, __assign$c({}, otherProps, otherTileProps, {
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
        return jsxRuntime.jsx(Months, __assign$b({}, props));
      }
      return jsxRuntime.jsx("div", {
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
      return jsxRuntime.jsx(Tile, __assign$a({}, otherProps, {
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
      return jsxRuntime.jsx(TileGroup, {
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
          return jsxRuntime.jsx(Day, __assign$9({}, otherProps, otherTileProps, {
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
        weekdays.push(jsxRuntime.jsx("div", {
          className: clsx(weekdayClassName, isCurrentDayOfWeek(weekdayDate) && "".concat(weekdayClassName, "--current"), isWeekend(weekdayDate, calendarType) && "".concat(weekdayClassName, "--weekend")),
          children: jsxRuntime.jsx("abbr", {
            "aria-label": abbr,
            title: abbr,
            children: formatShortWeekday$1(locale, weekdayDate).replace('.', '')
          })
        }, weekday));
      }
      return jsxRuntime.jsx(Flex, {
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
      var children = jsxRuntime.jsx("span", {
        children: weekNumber
      });
      if (onClickWeekNumber) {
        var date_1 = props.date,
          onClickWeekNumber_1 = props.onClickWeekNumber,
          weekNumber_1 = props.weekNumber,
          otherProps = __rest$6(props, ["date", "onClickWeekNumber", "weekNumber"]);
        return jsxRuntime.jsx("button", __assign$8({}, otherProps, {
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
        return jsxRuntime.jsx("div", __assign$8({}, otherProps, {
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
      return jsxRuntime.jsx(Flex, {
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
          return jsxRuntime.jsx(WeekNumber, {
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
        return jsxRuntime.jsx(Weekdays, {
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
        return jsxRuntime.jsx(WeekNumbers, {
          activeStartDate: activeStartDate,
          calendarType: calendarType,
          onClickWeekNumber: onClickWeekNumber,
          onMouseLeave: onMouseLeave,
          showFixedNumberOfWeeks: showFixedNumberOfWeeks
        });
      }
      function renderDays() {
        return jsxRuntime.jsx(Days, __assign$7({
          calendarType: calendarType
        }, childProps));
      }
      var className = 'react-calendar__month-view';
      return jsxRuntime.jsx("div", {
        className: clsx(className, showWeekNumbers ? "".concat(className, "--weekNumbers") : ''),
        children: jsxRuntime.jsxs("div", {
          style: {
            display: 'flex',
            alignItems: 'flex-end'
          },
          children: [renderWeekNumbers(), jsxRuntime.jsxs("div", {
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
    var Calendar = react.forwardRef(function Calendar(props, ref) {
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
      var _j = react.useState(defaultActiveStartDate),
        activeStartDateState = _j[0],
        setActiveStartDateState = _j[1];
      var _k = react.useState(null),
        hoverState = _k[0],
        setHoverState = _k[1];
      var _l = react.useState(Array.isArray(defaultValue) ? defaultValue.map(function (el) {
          return el !== null ? toDate$1(el) : null;
        }) : defaultValue !== null && defaultValue !== undefined ? toDate$1(defaultValue) : null),
        valueState = _l[0],
        setValueState = _l[1];
      var _m = react.useState(defaultView),
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
      var getProcessedValue = react.useCallback(function (value) {
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
      var setActiveStartDate = react.useCallback(function (nextActiveStartDate, action) {
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
      var onClickTile = react.useCallback(function (value, event) {
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
      var drillDown = react.useCallback(function (nextActiveStartDate, event) {
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
      var drillUp = react.useCallback(function () {
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
      var onChange = react.useCallback(function (rawNextValue, event) {
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
      react.useImperativeHandle(ref, function () {
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
              return jsxRuntime.jsx(CenturyView, __assign$6({
                formatYear: formatYear,
                showNeighboringCentury: showNeighboringCentury
              }, commonProps));
            }
          case 'decade':
            {
              return jsxRuntime.jsx(DecadeView, __assign$6({
                formatYear: formatYear,
                showNeighboringDecade: showNeighboringDecade
              }, commonProps));
            }
          case 'year':
            {
              return jsxRuntime.jsx(YearView, __assign$6({
                formatMonth: formatMonth,
                formatMonthYear: formatMonthYear
              }, commonProps));
            }
          case 'month':
            {
              return jsxRuntime.jsx(MonthView, __assign$6({
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
        return jsxRuntime.jsx(Navigation, {
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
      return jsxRuntime.jsxs("div", {
        className: clsx(baseClassName$1, selectRange && valueArray.length === 1 && "".concat(baseClassName$1, "--selectRange"), showDoubleView && "".concat(baseClassName$1, "--doubleView"), className),
        ref: inputRef,
        children: [renderNavigation(), jsxRuntime.jsxs("div", {
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
      var container = react.useRef(undefined);
      var element = react.useRef(undefined);
      var elementWidth = react.useRef(undefined);
      var elementHeight = react.useRef(undefined);
      var scrollContainer = react.useRef(undefined);
      var fit = react.useCallback(function () {
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
      var child = react.Children.only(children);
      react.useEffect(function () {
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
      return jsxRuntime.jsx("span", {
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
      return jsxRuntime.jsx("span", {
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
    var useIsomorphicLayoutEffect = isBrowser ? react.useLayoutEffect : react.useEffect;
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
      return jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [hasLeadingZero ? jsxRuntime.jsx("span", {
          className: "".concat(className, "__leadingZero"),
          children: "0"
        }) : null, jsxRuntime.jsx("input", {
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
      return jsxRuntime.jsx(Input, __assign$4({
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
      return jsxRuntime.jsx(Input, __assign$3({
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
      return jsxRuntime.jsxs("select", {
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
        children: [!value && jsxRuntime.jsx("option", {
          value: "",
          children: placeholder
        }), dates.map(function (date) {
          var month = getMonthHuman(date);
          var disabled = month < minMonth || month > maxMonth;
          return jsxRuntime.jsx("option", {
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
      return jsxRuntime.jsx(Input, __assign$2({
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
      return jsxRuntime.jsx("input", {
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
        jsxRuntime.jsx(Divider, {
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
      var _f = react.useState(null),
        year = _f[0],
        setYear = _f[1];
      var _g = react.useState(null),
        month = _g[0],
        setMonth = _g[1];
      var _h = react.useState(null),
        day = _h[0],
        setDay = _h[1];
      var _j = react.useState(null),
        value = _j[0],
        setValue = _j[1];
      var yearInput = react.useRef(null);
      var monthInput = react.useRef(null);
      var monthSelect = react.useRef(null);
      var dayInput = react.useRef(null);
      var _k = react.useState(isCalendarOpenProps),
        isCalendarOpen = _k[0],
        setIsCalendarOpen = _k[1];
      var lastPressedKey = react.useRef(undefined);
      react.useEffect(function () {
        setIsCalendarOpen(isCalendarOpenProps);
      }, [isCalendarOpenProps]);
      react.useEffect(function () {
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
        return jsxRuntime.jsx(DayInput, __assign$1({}, commonInputProps, {
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
          return jsxRuntime.jsx(MonthSelect, __assign$1({}, commonInputProps, {
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
        return jsxRuntime.jsx(MonthInput, __assign$1({}, commonInputProps, {
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
        return jsxRuntime.jsx(YearInput, __assign$1({}, commonInputProps, {
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
        return jsxRuntime.jsx(NativeInput, {
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
        jsxRuntime.jsxs("div", {
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
    var CalendarIcon = jsxRuntime.jsxs("svg", __assign({}, iconProps, {
      className: "".concat(baseClassName, "__calendar-button__icon ").concat(baseClassName, "__button__icon"),
      children: [jsxRuntime.jsx("rect", {
        fill: "none",
        height: "15",
        width: "15",
        x: "2",
        y: "2"
      }), jsxRuntime.jsx("line", {
        x1: "6",
        x2: "6",
        y1: "0",
        y2: "4"
      }), jsxRuntime.jsx("line", {
        x1: "13",
        x2: "13",
        y1: "0",
        y2: "4"
      })]
    }));
    var ClearIcon = jsxRuntime.jsxs("svg", __assign({}, iconProps, {
      className: "".concat(baseClassName, "__clear-button__icon ").concat(baseClassName, "__button__icon"),
      children: [jsxRuntime.jsx("line", {
        x1: "4",
        x2: "15",
        y1: "4",
        y2: "15"
      }), jsxRuntime.jsx("line", {
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
      var _j = react.useState(isOpenProps),
        isOpen = _j[0],
        setIsOpen = _j[1];
      var wrapper = react.useRef(null);
      var calendarWrapper = react.useRef(null);
      react.useEffect(function () {
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
      var closeCalendar = react.useCallback(function (_a) {
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
      var onKeyDown = react.useCallback(function (event) {
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
      var onOutsideAction = react.useCallback(function (event) {
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
      var handleOutsideActionListeners = react.useCallback(function (shouldListen) {
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
      react.useEffect(function () {
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
        return jsxRuntime.jsxs("div", {
          className: "".concat(baseClassName, "__wrapper"),
          children: [jsxRuntime.jsx(DateInput, __assign({}, ariaLabelProps, placeholderProps, {
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
          })), clearIcon !== null && jsxRuntime.jsx("button", {
            "aria-label": clearAriaLabel,
            className: "".concat(baseClassName, "__clear-button ").concat(baseClassName, "__button"),
            disabled: disabled,
            onClick: clear,
            onFocus: stopPropagation,
            type: "button",
            children: typeof clearIcon === 'function' ? react.createElement(clearIcon) : clearIcon
          }), calendarIcon !== null && !disableCalendar && jsxRuntime.jsx("button", {
            "aria-expanded": isOpen || false,
            "aria-label": calendarAriaLabel,
            className: "".concat(baseClassName, "__calendar-button ").concat(baseClassName, "__button"),
            disabled: disabled,
            onClick: toggleCalendar,
            onFocus: stopPropagation,
            type: "button",
            children: typeof calendarIcon === 'function' ? react.createElement(calendarIcon) : calendarIcon
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
        var calendar = jsxRuntime.jsx(Calendar$1, __assign({
          locale: locale,
          maxDate: maxDate,
          maxDetail: maxDetail,
          minDate: minDate,
          onChange: function (value) {
            return onChange(value);
          },
          value: value
        }, calendarProps));
        return portalContainer ? reactDom.createPortal(jsxRuntime.jsx("div", {
          ref: calendarWrapper,
          className: classNames,
          children: calendar
        }), portalContainer) : jsxRuntime.jsx(Fit, {
          children: jsxRuntime.jsx("div", {
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
      var eventProps = react.useMemo(function () {
        return makeEventProps(otherProps);
      }, [otherProps]);
      return jsxRuntime.jsxs("div", __assign({
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
      const [currentValue, setCurrentValue] = react.useState(() => {
        if (dateAttr.status === "available" && dateAttr.displayValue) {
          return dateAttr.displayValue;
        }
        return autoSelectToday ? new Date() : null;
      });
      const [disabledValue, setDisabledValue] = react.useState(false);
      react.useEffect(() => {
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
        return react.createElement("div", {
          className: `react-date-picker ${style}`
        }, react.createElement("p", {
          className: `${widgetName} form-control-static`
        }, currentValue || dateAttr.displayValue));
      } else {
        return react.createElement("div", {
          className: `react-date-picker ${style}`
        }, autoFocus === false && react.createElement("button", {
          className: "react-date-picker-faux-btn"
        }), react.createElement(DatePicker, {
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

    exports.ReactDatePicker = ReactDatePicker;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3REYXRlUGlja2VyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbWFrZS1ldmVudC1wcm9wcy9kaXN0L2VzbS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbHN4L2Rpc3QvY2xzeC5tanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbWVtL25vZGVfbW9kdWxlcy9taW1pYy1mbi9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wLWRlZmVyL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21hcC1hZ2UtY2xlYW5lci9kaXN0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21lbS9kaXN0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2dldC11c2VyLWxvY2FsZS9kaXN0L2VzbS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ad29qdGVrbWFqL2RhdGUtdXRpbHMvZGlzdC9lc20vaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vc2hhcmVkL2NvbnN0LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL3NoYXJlZC9kYXRlRm9ybWF0dGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL3NoYXJlZC9kYXRlcy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9DYWxlbmRhci9OYXZpZ2F0aW9uLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL0ZsZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vc2hhcmVkL3V0aWxzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL1RpbGVHcm91cC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9UaWxlLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL0NlbnR1cnlWaWV3L0RlY2FkZS5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9DZW50dXJ5Vmlldy9EZWNhZGVzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL0NlbnR1cnlWaWV3LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL0RlY2FkZVZpZXcvWWVhci5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9EZWNhZGVWaWV3L1llYXJzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL0RlY2FkZVZpZXcuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vWWVhclZpZXcvTW9udGguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vWWVhclZpZXcvTW9udGhzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL1llYXJWaWV3LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL01vbnRoVmlldy9EYXkuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vTW9udGhWaWV3L0RheXMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vTW9udGhWaWV3L1dlZWtkYXlzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL01vbnRoVmlldy9XZWVrTnVtYmVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNhbGVuZGFyL2Rpc3QvZXNtL01vbnRoVmlldy9XZWVrTnVtYmVycy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jYWxlbmRhci9kaXN0L2VzbS9Nb250aFZpZXcuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY2FsZW5kYXIvZGlzdC9lc20vQ2FsZW5kYXIuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGV0ZWN0LWVsZW1lbnQtb3ZlcmZsb3cvZGlzdC9lc20vaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvd2FybmluZy93YXJuaW5nLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWZpdC9kaXN0L2VzbS9GaXQuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZS1waWNrZXIvZGlzdC9lc20vRGl2aWRlci5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91cGRhdGUtaW5wdXQtd2lkdGgvZGlzdC9lc20vaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZS1waWNrZXIvZGlzdC9lc20vRGF0ZUlucHV0L0lucHV0LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGUtcGlja2VyL2Rpc3QvZXNtL3NoYXJlZC91dGlscy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1kYXRlLXBpY2tlci9kaXN0L2VzbS9EYXRlSW5wdXQvRGF5SW5wdXQuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZS1waWNrZXIvZGlzdC9lc20vRGF0ZUlucHV0L01vbnRoSW5wdXQuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZS1waWNrZXIvZGlzdC9lc20vc2hhcmVkL2RhdGVGb3JtYXR0ZXIuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZS1waWNrZXIvZGlzdC9lc20vRGF0ZUlucHV0L01vbnRoU2VsZWN0LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGUtcGlja2VyL2Rpc3QvZXNtL0RhdGVJbnB1dC9ZZWFySW5wdXQuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZS1waWNrZXIvZGlzdC9lc20vRGF0ZUlucHV0L05hdGl2ZUlucHV0LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGUtcGlja2VyL2Rpc3QvZXNtL3NoYXJlZC9kYXRlcy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1kYXRlLXBpY2tlci9kaXN0L2VzbS9EYXRlSW5wdXQuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZS1waWNrZXIvZGlzdC9lc20vRGF0ZVBpY2tlci5qcyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9SZWFjdERhdGVQaWNrZXIuanN4Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbi8vIEFzIGRlZmluZWQgb24gdGhlIGxpc3Qgb2Ygc3VwcG9ydGVkIGV2ZW50czogaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL2V2ZW50cy5odG1sXG5leHBvcnQgdmFyIGNsaXBib2FyZEV2ZW50cyA9IFsnb25Db3B5JywgJ29uQ3V0JywgJ29uUGFzdGUnXTtcbmV4cG9ydCB2YXIgY29tcG9zaXRpb25FdmVudHMgPSBbXG4gICAgJ29uQ29tcG9zaXRpb25FbmQnLFxuICAgICdvbkNvbXBvc2l0aW9uU3RhcnQnLFxuICAgICdvbkNvbXBvc2l0aW9uVXBkYXRlJyxcbl07XG5leHBvcnQgdmFyIGZvY3VzRXZlbnRzID0gWydvbkZvY3VzJywgJ29uQmx1ciddO1xuZXhwb3J0IHZhciBmb3JtRXZlbnRzID0gWydvbklucHV0JywgJ29uSW52YWxpZCcsICdvblJlc2V0JywgJ29uU3VibWl0J107XG5leHBvcnQgdmFyIGltYWdlRXZlbnRzID0gWydvbkxvYWQnLCAnb25FcnJvciddO1xuZXhwb3J0IHZhciBrZXlib2FyZEV2ZW50cyA9IFsnb25LZXlEb3duJywgJ29uS2V5UHJlc3MnLCAnb25LZXlVcCddO1xuZXhwb3J0IHZhciBtZWRpYUV2ZW50cyA9IFtcbiAgICAnb25BYm9ydCcsXG4gICAgJ29uQ2FuUGxheScsXG4gICAgJ29uQ2FuUGxheVRocm91Z2gnLFxuICAgICdvbkR1cmF0aW9uQ2hhbmdlJyxcbiAgICAnb25FbXB0aWVkJyxcbiAgICAnb25FbmNyeXB0ZWQnLFxuICAgICdvbkVuZGVkJyxcbiAgICAnb25FcnJvcicsXG4gICAgJ29uTG9hZGVkRGF0YScsXG4gICAgJ29uTG9hZGVkTWV0YWRhdGEnLFxuICAgICdvbkxvYWRTdGFydCcsXG4gICAgJ29uUGF1c2UnLFxuICAgICdvblBsYXknLFxuICAgICdvblBsYXlpbmcnLFxuICAgICdvblByb2dyZXNzJyxcbiAgICAnb25SYXRlQ2hhbmdlJyxcbiAgICAnb25TZWVrZWQnLFxuICAgICdvblNlZWtpbmcnLFxuICAgICdvblN0YWxsZWQnLFxuICAgICdvblN1c3BlbmQnLFxuICAgICdvblRpbWVVcGRhdGUnLFxuICAgICdvblZvbHVtZUNoYW5nZScsXG4gICAgJ29uV2FpdGluZycsXG5dO1xuZXhwb3J0IHZhciBtb3VzZUV2ZW50cyA9IFtcbiAgICAnb25DbGljaycsXG4gICAgJ29uQ29udGV4dE1lbnUnLFxuICAgICdvbkRvdWJsZUNsaWNrJyxcbiAgICAnb25Nb3VzZURvd24nLFxuICAgICdvbk1vdXNlRW50ZXInLFxuICAgICdvbk1vdXNlTGVhdmUnLFxuICAgICdvbk1vdXNlTW92ZScsXG4gICAgJ29uTW91c2VPdXQnLFxuICAgICdvbk1vdXNlT3ZlcicsXG4gICAgJ29uTW91c2VVcCcsXG5dO1xuZXhwb3J0IHZhciBkcmFnRXZlbnRzID0gW1xuICAgICdvbkRyYWcnLFxuICAgICdvbkRyYWdFbmQnLFxuICAgICdvbkRyYWdFbnRlcicsXG4gICAgJ29uRHJhZ0V4aXQnLFxuICAgICdvbkRyYWdMZWF2ZScsXG4gICAgJ29uRHJhZ092ZXInLFxuICAgICdvbkRyYWdTdGFydCcsXG4gICAgJ29uRHJvcCcsXG5dO1xuZXhwb3J0IHZhciBzZWxlY3Rpb25FdmVudHMgPSBbJ29uU2VsZWN0J107XG5leHBvcnQgdmFyIHRvdWNoRXZlbnRzID0gWydvblRvdWNoQ2FuY2VsJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaE1vdmUnLCAnb25Ub3VjaFN0YXJ0J107XG5leHBvcnQgdmFyIHBvaW50ZXJFdmVudHMgPSBbXG4gICAgJ29uUG9pbnRlckRvd24nLFxuICAgICdvblBvaW50ZXJNb3ZlJyxcbiAgICAnb25Qb2ludGVyVXAnLFxuICAgICdvblBvaW50ZXJDYW5jZWwnLFxuICAgICdvbkdvdFBvaW50ZXJDYXB0dXJlJyxcbiAgICAnb25Mb3N0UG9pbnRlckNhcHR1cmUnLFxuICAgICdvblBvaW50ZXJFbnRlcicsXG4gICAgJ29uUG9pbnRlckxlYXZlJyxcbiAgICAnb25Qb2ludGVyT3ZlcicsXG4gICAgJ29uUG9pbnRlck91dCcsXG5dO1xuZXhwb3J0IHZhciB1aUV2ZW50cyA9IFsnb25TY3JvbGwnXTtcbmV4cG9ydCB2YXIgd2hlZWxFdmVudHMgPSBbJ29uV2hlZWwnXTtcbmV4cG9ydCB2YXIgYW5pbWF0aW9uRXZlbnRzID0gW1xuICAgICdvbkFuaW1hdGlvblN0YXJ0JyxcbiAgICAnb25BbmltYXRpb25FbmQnLFxuICAgICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicsXG5dO1xuZXhwb3J0IHZhciB0cmFuc2l0aW9uRXZlbnRzID0gWydvblRyYW5zaXRpb25FbmQnXTtcbmV4cG9ydCB2YXIgb3RoZXJFdmVudHMgPSBbJ29uVG9nZ2xlJ107XG5leHBvcnQgdmFyIGNoYW5nZUV2ZW50cyA9IFsnb25DaGFuZ2UnXTtcbmV4cG9ydCB2YXIgYWxsRXZlbnRzID0gX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIGNsaXBib2FyZEV2ZW50cywgdHJ1ZSksIGNvbXBvc2l0aW9uRXZlbnRzLCB0cnVlKSwgZm9jdXNFdmVudHMsIHRydWUpLCBmb3JtRXZlbnRzLCB0cnVlKSwgaW1hZ2VFdmVudHMsIHRydWUpLCBrZXlib2FyZEV2ZW50cywgdHJ1ZSksIG1lZGlhRXZlbnRzLCB0cnVlKSwgbW91c2VFdmVudHMsIHRydWUpLCBkcmFnRXZlbnRzLCB0cnVlKSwgc2VsZWN0aW9uRXZlbnRzLCB0cnVlKSwgdG91Y2hFdmVudHMsIHRydWUpLCBwb2ludGVyRXZlbnRzLCB0cnVlKSwgdWlFdmVudHMsIHRydWUpLCB3aGVlbEV2ZW50cywgdHJ1ZSksIGFuaW1hdGlvbkV2ZW50cywgdHJ1ZSksIHRyYW5zaXRpb25FdmVudHMsIHRydWUpLCBjaGFuZ2VFdmVudHMsIHRydWUpLCBvdGhlckV2ZW50cywgdHJ1ZSk7XG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHdpdGggb24tZXZlbnQgY2FsbGJhY2sgcHJvcHMgY3VycmllZCB3aXRoIHByb3ZpZGVkIGFyZ3MuXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgUHJvcHMgcGFzc2VkIHRvIGEgY29tcG9uZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbj19IGdldEFyZ3MgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYXJndW1lbnQocykgb24tZXZlbnQgY2FsbGJhY2tzXG4gKiAgIHNoYWxsIGJlIGN1cnJpZWQgd2l0aC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZUV2ZW50UHJvcHMocHJvcHMsIGdldEFyZ3MpIHtcbiAgICB2YXIgZXZlbnRQcm9wcyA9IHt9O1xuICAgIGFsbEV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgdmFyIGV2ZW50SGFuZGxlciA9IHByb3BzW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghZXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdldEFyZ3MpIHtcbiAgICAgICAgICAgIGV2ZW50UHJvcHNbZXZlbnROYW1lXSA9IChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnRIYW5kbGVyKGV2ZW50LCBnZXRBcmdzKGV2ZW50TmFtZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBldmVudFByb3BzW2V2ZW50TmFtZV0gPSBldmVudEhhbmRsZXI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZXZlbnRQcm9wcztcbn1cbiIsImZ1bmN0aW9uIHIoZSl7dmFyIHQsZixuPVwiXCI7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGV8fFwibnVtYmVyXCI9PXR5cGVvZiBlKW4rPWU7ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgZSlpZihBcnJheS5pc0FycmF5KGUpKXt2YXIgbz1lLmxlbmd0aDtmb3IodD0wO3Q8bzt0KyspZVt0XSYmKGY9cihlW3RdKSkmJihuJiYobis9XCIgXCIpLG4rPWYpfWVsc2UgZm9yKGYgaW4gZSllW2ZdJiYobiYmKG4rPVwiIFwiKSxuKz1mKTtyZXR1cm4gbn1leHBvcnQgZnVuY3Rpb24gY2xzeCgpe2Zvcih2YXIgZSx0LGY9MCxuPVwiXCIsbz1hcmd1bWVudHMubGVuZ3RoO2Y8bztmKyspKGU9YXJndW1lbnRzW2ZdKSYmKHQ9cihlKSkmJihuJiYobis9XCIgXCIpLG4rPXQpO3JldHVybiBufWV4cG9ydCBkZWZhdWx0IGNsc3g7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb3B5UHJvcGVydHkgPSAodG8sIGZyb20sIHByb3BlcnR5LCBpZ25vcmVOb25Db25maWd1cmFibGUpID0+IHtcblx0Ly8gYEZ1bmN0aW9uI2xlbmd0aGAgc2hvdWxkIHJlZmxlY3QgdGhlIHBhcmFtZXRlcnMgb2YgYHRvYCBub3QgYGZyb21gIHNpbmNlIHdlIGtlZXAgaXRzIGJvZHkuXG5cdC8vIGBGdW5jdGlvbiNwcm90b3R5cGVgIGlzIG5vbi13cml0YWJsZSBhbmQgbm9uLWNvbmZpZ3VyYWJsZSBzbyBjYW4gbmV2ZXIgYmUgbW9kaWZpZWQuXG5cdGlmIChwcm9wZXJ0eSA9PT0gJ2xlbmd0aCcgfHwgcHJvcGVydHkgPT09ICdwcm90b3R5cGUnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gYEZ1bmN0aW9uI2FyZ3VtZW50c2AgYW5kIGBGdW5jdGlvbiNjYWxsZXJgIHNob3VsZCBub3QgYmUgY29waWVkLiBUaGV5IHdlcmUgcmVwb3J0ZWQgdG8gYmUgcHJlc2VudCBpbiBgUmVmbGVjdC5vd25LZXlzYCBmb3Igc29tZSBkZXZpY2VzIGluIFJlYWN0IE5hdGl2ZSAoIzQxKSwgc28gd2UgZXhwbGljaXRseSBpZ25vcmUgdGhlbSBoZXJlLlxuXHRpZiAocHJvcGVydHkgPT09ICdhcmd1bWVudHMnIHx8IHByb3BlcnR5ID09PSAnY2FsbGVyJykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IHRvRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG8sIHByb3BlcnR5KTtcblx0Y29uc3QgZnJvbURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGZyb20sIHByb3BlcnR5KTtcblxuXHRpZiAoIWNhbkNvcHlQcm9wZXJ0eSh0b0Rlc2NyaXB0b3IsIGZyb21EZXNjcmlwdG9yKSAmJiBpZ25vcmVOb25Db25maWd1cmFibGUpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodG8sIHByb3BlcnR5LCBmcm9tRGVzY3JpcHRvcik7XG59O1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5KClgIHRocm93cyBpZiB0aGUgcHJvcGVydHkgZXhpc3RzLCBpcyBub3QgY29uZmlndXJhYmxlIGFuZCBlaXRoZXI6XG4vLyAgLSBvbmUgaXRzIGRlc2NyaXB0b3JzIGlzIGNoYW5nZWRcbi8vICAtIGl0IGlzIG5vbi13cml0YWJsZSBhbmQgaXRzIHZhbHVlIGlzIGNoYW5nZWRcbmNvbnN0IGNhbkNvcHlQcm9wZXJ0eSA9IGZ1bmN0aW9uICh0b0Rlc2NyaXB0b3IsIGZyb21EZXNjcmlwdG9yKSB7XG5cdHJldHVybiB0b0Rlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCB8fCB0b0Rlc2NyaXB0b3IuY29uZmlndXJhYmxlIHx8IChcblx0XHR0b0Rlc2NyaXB0b3Iud3JpdGFibGUgPT09IGZyb21EZXNjcmlwdG9yLndyaXRhYmxlICYmXG5cdFx0dG9EZXNjcmlwdG9yLmVudW1lcmFibGUgPT09IGZyb21EZXNjcmlwdG9yLmVudW1lcmFibGUgJiZcblx0XHR0b0Rlc2NyaXB0b3IuY29uZmlndXJhYmxlID09PSBmcm9tRGVzY3JpcHRvci5jb25maWd1cmFibGUgJiZcblx0XHQodG9EZXNjcmlwdG9yLndyaXRhYmxlIHx8IHRvRGVzY3JpcHRvci52YWx1ZSA9PT0gZnJvbURlc2NyaXB0b3IudmFsdWUpXG5cdCk7XG59O1xuXG5jb25zdCBjaGFuZ2VQcm90b3R5cGUgPSAodG8sIGZyb20pID0+IHtcblx0Y29uc3QgZnJvbVByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihmcm9tKTtcblx0aWYgKGZyb21Qcm90b3R5cGUgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0bykpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YodG8sIGZyb21Qcm90b3R5cGUpO1xufTtcblxuY29uc3Qgd3JhcHBlZFRvU3RyaW5nID0gKHdpdGhOYW1lLCBmcm9tQm9keSkgPT4gYC8qIFdyYXBwZWQgJHt3aXRoTmFtZX0qL1xcbiR7ZnJvbUJvZHl9YDtcblxuY29uc3QgdG9TdHJpbmdEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihGdW5jdGlvbi5wcm90b3R5cGUsICd0b1N0cmluZycpO1xuY29uc3QgdG9TdHJpbmdOYW1lID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcsICduYW1lJyk7XG5cbi8vIFdlIGNhbGwgYGZyb20udG9TdHJpbmcoKWAgZWFybHkgKG5vdCBsYXppbHkpIHRvIGVuc3VyZSBgZnJvbWAgY2FuIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxuLy8gV2UgdXNlIGBiaW5kKClgIGluc3RlYWQgb2YgYSBjbG9zdXJlIGZvciB0aGUgc2FtZSByZWFzb24uXG4vLyBDYWxsaW5nIGBmcm9tLnRvU3RyaW5nKClgIGVhcmx5IGFsc28gYWxsb3dzIGNhY2hpbmcgaXQgaW4gY2FzZSBgdG8udG9TdHJpbmcoKWAgaXMgY2FsbGVkIHNldmVyYWwgdGltZXMuXG5jb25zdCBjaGFuZ2VUb1N0cmluZyA9ICh0bywgZnJvbSwgbmFtZSkgPT4ge1xuXHRjb25zdCB3aXRoTmFtZSA9IG5hbWUgPT09ICcnID8gJycgOiBgd2l0aCAke25hbWUudHJpbSgpfSgpIGA7XG5cdGNvbnN0IG5ld1RvU3RyaW5nID0gd3JhcHBlZFRvU3RyaW5nLmJpbmQobnVsbCwgd2l0aE5hbWUsIGZyb20udG9TdHJpbmcoKSk7XG5cdC8vIEVuc3VyZSBgdG8udG9TdHJpbmcudG9TdHJpbmdgIGlzIG5vbi1lbnVtZXJhYmxlIGFuZCBoYXMgdGhlIHNhbWUgYHNhbWVgXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdUb1N0cmluZywgJ25hbWUnLCB0b1N0cmluZ05hbWUpO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodG8sICd0b1N0cmluZycsIHsuLi50b1N0cmluZ0Rlc2NyaXB0b3IsIHZhbHVlOiBuZXdUb1N0cmluZ30pO1xufTtcblxuY29uc3QgbWltaWNGbiA9ICh0bywgZnJvbSwge2lnbm9yZU5vbkNvbmZpZ3VyYWJsZSA9IGZhbHNlfSA9IHt9KSA9PiB7XG5cdGNvbnN0IHtuYW1lfSA9IHRvO1xuXG5cdGZvciAoY29uc3QgcHJvcGVydHkgb2YgUmVmbGVjdC5vd25LZXlzKGZyb20pKSB7XG5cdFx0Y29weVByb3BlcnR5KHRvLCBmcm9tLCBwcm9wZXJ0eSwgaWdub3JlTm9uQ29uZmlndXJhYmxlKTtcblx0fVxuXG5cdGNoYW5nZVByb3RvdHlwZSh0bywgZnJvbSk7XG5cdGNoYW5nZVRvU3RyaW5nKHRvLCBmcm9tLCBuYW1lKTtcblxuXHRyZXR1cm4gdG87XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1pbWljRm47XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcblx0Y29uc3QgcmV0ID0ge307XG5cblx0cmV0LnByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0cmV0LnJlc29sdmUgPSByZXNvbHZlO1xuXHRcdHJldC5yZWplY3QgPSByZWplY3Q7XG5cdH0pO1xuXG5cdHJldHVybiByZXQ7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHBfZGVmZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicC1kZWZlclwiKSk7XG5mdW5jdGlvbiBtYXBBZ2VDbGVhbmVyKG1hcCwgcHJvcGVydHkgPSAnbWF4QWdlJykge1xuICAgIGxldCBwcm9jZXNzaW5nS2V5O1xuICAgIGxldCBwcm9jZXNzaW5nVGltZXI7XG4gICAgbGV0IHByb2Nlc3NpbmdEZWZlcnJlZDtcbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAocHJvY2Vzc2luZ0tleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgYWxyZWFkeSBwcm9jZXNzaW5nIGFuIGl0ZW0sIHdlIGNhbiBzYWZlbHkgZXhpdFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldHVwVGltZXIgPSAoaXRlbSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkID0gcF9kZWZlcl8xLmRlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gaXRlbVsxXVtwcm9wZXJ0eV0gLSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKGRlbGF5IDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGl0ZW0gaW1tZWRpYXRlbHkgaWYgdGhlIGRlbGF5IGlzIGVxdWFsIHRvIG9yIGJlbG93IDBcbiAgICAgICAgICAgICAgICBtYXAuZGVsZXRlKGl0ZW1bMF0pO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGUgY3VycmVudCBwcm9jZXNzZWQga2V5XG4gICAgICAgICAgICBwcm9jZXNzaW5nS2V5ID0gaXRlbVswXTtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaXRlbSB3aGVuIHRoZSB0aW1lb3V0IGZpcmVzXG4gICAgICAgICAgICAgICAgbWFwLmRlbGV0ZShpdGVtWzBdKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2luZ0RlZmVycmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN0cmljdC10eXBlLXByZWRpY2F0ZXNcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvY2Vzc2luZ1RpbWVyLnVucmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gRG9uJ3QgaG9sZCB1cCB0aGUgcHJvY2VzcyBmcm9tIGV4aXRpbmdcbiAgICAgICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzaW5nRGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIG1hcCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHNldHVwVGltZXIoZW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgLy8gRG8gbm90aGluZyBpZiBhbiBlcnJvciBvY2N1cnMsIHRoaXMgbWVhbnMgdGhlIHRpbWVyIHdhcyBjbGVhbmVkIHVwIGFuZCB3ZSBzaG91bGQgc3RvcCBwcm9jZXNzaW5nXG4gICAgICAgIH1cbiAgICAgICAgcHJvY2Vzc2luZ0tleSA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICAgICAgcHJvY2Vzc2luZ0tleSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHByb2Nlc3NpbmdUaW1lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQocHJvY2Vzc2luZ1RpbWVyKTtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzc2luZ0RlZmVycmVkICE9PSB1bmRlZmluZWQpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTplYXJseS1leGl0XG4gICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQucmVqZWN0KHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG9yaWdpbmFsU2V0ID0gbWFwLnNldC5iaW5kKG1hcCk7XG4gICAgbWFwLnNldCA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBrZXkgYWxyZWFkeSBleGlzdCwgcmVtb3ZlIGl0IHNvIHdlIGNhbiBhZGQgaXQgYmFjayBhdCB0aGUgZW5kIG9mIHRoZSBtYXAuXG4gICAgICAgICAgICBtYXAuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2FsbCB0aGUgb3JpZ2luYWwgYG1hcC5zZXRgXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsU2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAvLyBJZiB3ZSBhcmUgYWxyZWFkeSBwcm9jZXNzaW5nIGEga2V5IGFuZCB0aGUga2V5IGFkZGVkIGlzIHRoZSBjdXJyZW50IHByb2Nlc3NlZCBrZXksIHN0b3AgcHJvY2Vzc2luZyBpdFxuICAgICAgICBpZiAocHJvY2Vzc2luZ0tleSAmJiBwcm9jZXNzaW5nS2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWx3YXlzIHJ1biB0aGUgY2xlYW51cCBtZXRob2QgaW4gY2FzZSBpdCB3YXNuJ3Qgc3RhcnRlZCB5ZXRcbiAgICAgICAgY2xlYW51cCgpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBjbGVhbnVwKCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICByZXR1cm4gbWFwO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gbWFwQWdlQ2xlYW5lcjtcbi8vIEFkZCBzdXBwb3J0IGZvciBDSlNcbm1vZHVsZS5leHBvcnRzID0gbWFwQWdlQ2xlYW5lcjtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtYXBBZ2VDbGVhbmVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgbWltaWNGbiA9IHJlcXVpcmUoXCJtaW1pYy1mblwiKTtcbmNvbnN0IG1hcEFnZUNsZWFuZXIgPSByZXF1aXJlKFwibWFwLWFnZS1jbGVhbmVyXCIpO1xuY29uc3QgZGVjb3JhdG9ySW5zdGFuY2VNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgY2FjaGVTdG9yZSA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbltNZW1vaXplXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NZW1vaXphdGlvbikgZnVuY3Rpb25zIC0gQW4gb3B0aW1pemF0aW9uIHVzZWQgdG8gc3BlZWQgdXAgY29uc2VjdXRpdmUgZnVuY3Rpb24gY2FsbHMgYnkgY2FjaGluZyB0aGUgcmVzdWx0IG9mIGNhbGxzIHdpdGggaWRlbnRpY2FsIGlucHV0LlxuXG5AcGFyYW0gZm4gLSBGdW5jdGlvbiB0byBiZSBtZW1vaXplZC5cblxuQGV4YW1wbGVcbmBgYFxuaW1wb3J0IG1lbSA9IHJlcXVpcmUoJ21lbScpO1xuXG5sZXQgaSA9IDA7XG5jb25zdCBjb3VudGVyID0gKCkgPT4gKytpO1xuY29uc3QgbWVtb2l6ZWQgPSBtZW0oY291bnRlcik7XG5cbm1lbW9pemVkKCdmb28nKTtcbi8vPT4gMVxuXG4vLyBDYWNoZWQgYXMgaXQncyB0aGUgc2FtZSBhcmd1bWVudHNcbm1lbW9pemVkKCdmb28nKTtcbi8vPT4gMVxuXG4vLyBOb3QgY2FjaGVkIGFueW1vcmUgYXMgdGhlIGFyZ3VtZW50cyBjaGFuZ2VkXG5tZW1vaXplZCgnYmFyJyk7XG4vLz0+IDJcblxubWVtb2l6ZWQoJ2JhcicpO1xuLy89PiAyXG5gYGBcbiovXG5jb25zdCBtZW0gPSAoZm4sIHsgY2FjaGVLZXksIGNhY2hlID0gbmV3IE1hcCgpLCBtYXhBZ2UgfSA9IHt9KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBtYXhBZ2UgPT09ICdudW1iZXInKSB7XG4gICAgICAgIC8vIFRPRE86IERyb3AgYWZ0ZXIgaHR0cHM6Ly9naXRodWIuY29tL1NhbVZlcnNjaHVlcmVuL21hcC1hZ2UtY2xlYW5lci9pc3N1ZXMvNVxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgIG1hcEFnZUNsZWFuZXIoY2FjaGUpO1xuICAgIH1cbiAgICBjb25zdCBtZW1vaXplZCA9IGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGNhY2hlS2V5ID8gY2FjaGVLZXkoYXJndW1lbnRzXykgOiBhcmd1bWVudHNfWzBdO1xuICAgICAgICBjb25zdCBjYWNoZUl0ZW0gPSBjYWNoZS5nZXQoa2V5KTtcbiAgICAgICAgaWYgKGNhY2hlSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlSXRlbS5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50c18pO1xuICAgICAgICBjYWNoZS5zZXQoa2V5LCB7XG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXG4gICAgICAgICAgICBtYXhBZ2U6IG1heEFnZSA/IERhdGUubm93KCkgKyBtYXhBZ2UgOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFlcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBtaW1pY0ZuKG1lbW9pemVkLCBmbiwge1xuICAgICAgICBpZ25vcmVOb25Db25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBjYWNoZVN0b3JlLnNldChtZW1vaXplZCwgY2FjaGUpO1xuICAgIHJldHVybiBtZW1vaXplZDtcbn07XG4vKipcbkByZXR1cm5zIEEgW2RlY29yYXRvcl0oaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtZGVjb3JhdG9ycykgdG8gbWVtb2l6ZSBjbGFzcyBtZXRob2RzIG9yIHN0YXRpYyBjbGFzcyBtZXRob2RzLlxuXG5AZXhhbXBsZVxuYGBgXG5pbXBvcnQgbWVtID0gcmVxdWlyZSgnbWVtJyk7XG5cbmNsYXNzIEV4YW1wbGUge1xuICAgIGluZGV4ID0gMFxuXG4gICAgQG1lbS5kZWNvcmF0b3IoKVxuICAgIGNvdW50ZXIoKSB7XG4gICAgICAgIHJldHVybiArK3RoaXMuaW5kZXg7XG4gICAgfVxufVxuXG5jbGFzcyBFeGFtcGxlV2l0aE9wdGlvbnMge1xuICAgIGluZGV4ID0gMFxuXG4gICAgQG1lbS5kZWNvcmF0b3Ioe21heEFnZTogMTAwMH0pXG4gICAgY291bnRlcigpIHtcbiAgICAgICAgcmV0dXJuICsrdGhpcy5pbmRleDtcbiAgICB9XG59XG5gYGBcbiovXG5tZW0uZGVjb3JhdG9yID0gKG9wdGlvbnMgPSB7fSkgPT4gKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRhcmdldFtwcm9wZXJ0eUtleV07XG4gICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgZGVjb3JhdGVkIHZhbHVlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cbiAgICBkZWxldGUgZGVzY3JpcHRvci52YWx1ZTtcbiAgICBkZWxldGUgZGVzY3JpcHRvci53cml0YWJsZTtcbiAgICBkZXNjcmlwdG9yLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkZWNvcmF0b3JJbnN0YW5jZU1hcC5oYXModGhpcykpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbWVtKGlucHV0LCBvcHRpb25zKTtcbiAgICAgICAgICAgIGRlY29yYXRvckluc3RhbmNlTWFwLnNldCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlY29yYXRvckluc3RhbmNlTWFwLmdldCh0aGlzKTtcbiAgICB9O1xufTtcbi8qKlxuQ2xlYXIgYWxsIGNhY2hlZCBkYXRhIG9mIGEgbWVtb2l6ZWQgZnVuY3Rpb24uXG5cbkBwYXJhbSBmbiAtIE1lbW9pemVkIGZ1bmN0aW9uLlxuKi9cbm1lbS5jbGVhciA9IChmbikgPT4ge1xuICAgIGNvbnN0IGNhY2hlID0gY2FjaGVTdG9yZS5nZXQoZm4pO1xuICAgIGlmICghY2FjaGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FuXFwndCBjbGVhciBhIGZ1bmN0aW9uIHRoYXQgd2FzIG5vdCBtZW1vaXplZCEnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjYWNoZS5jbGVhciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2FjaGUgTWFwIGNhblxcJ3QgYmUgY2xlYXJlZCEnKTtcbiAgICB9XG4gICAgY2FjaGUuY2xlYXIoKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IG1lbTtcbiIsImltcG9ydCBtZW0gZnJvbSAnbWVtJztcbmZ1bmN0aW9uIGlzU3RyaW5nKGVsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlbCA9PT0gJ3N0cmluZyc7XG59XG5mdW5jdGlvbiBpc1VuaXF1ZShlbCwgaW5kZXgsIGFycikge1xuICAgIHJldHVybiBhcnIuaW5kZXhPZihlbCkgPT09IGluZGV4O1xufVxuZnVuY3Rpb24gaXNBbGxMb3dlckNhc2UoZWwpIHtcbiAgICByZXR1cm4gZWwudG9Mb3dlckNhc2UoKSA9PT0gZWw7XG59XG5mdW5jdGlvbiBmaXhDb21tYXMoZWwpIHtcbiAgICByZXR1cm4gZWwuaW5kZXhPZignLCcpID09PSAtMSA/IGVsIDogZWwuc3BsaXQoJywnKTtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUxvY2FsZShsb2NhbGUpIHtcbiAgICBpZiAoIWxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgIH1cbiAgICBpZiAobG9jYWxlID09PSAnQycgfHwgbG9jYWxlID09PSAncG9zaXgnIHx8IGxvY2FsZSA9PT0gJ1BPU0lYJykge1xuICAgICAgICByZXR1cm4gJ2VuLVVTJztcbiAgICB9XG4gICAgLy8gSWYgdGhlcmUncyBhIGRvdCAoLikgaW4gdGhlIGxvY2FsZSwgaXQncyBsaWtlbHkgaW4gdGhlIGZvcm1hdCBvZiBcImVuLVVTLlVURi04XCIsIHNvIHdlIG9ubHkgdGFrZSB0aGUgZmlyc3QgcGFydFxuICAgIGlmIChsb2NhbGUuaW5kZXhPZignLicpICE9PSAtMSkge1xuICAgICAgICB2YXIgX2EgPSBsb2NhbGUuc3BsaXQoJy4nKVswXSwgYWN0dWFsTG9jYWxlID0gX2EgPT09IHZvaWQgMCA/ICcnIDogX2E7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVMb2NhbGUoYWN0dWFsTG9jYWxlKTtcbiAgICB9XG4gICAgLy8gSWYgdGhlcmUncyBhbiBhdCBzaWduIChAKSBpbiB0aGUgbG9jYWxlLCBpdCdzIGxpa2VseSBpbiB0aGUgZm9ybWF0IG9mIFwiZW4tVVNAcG9zaXhcIiwgc28gd2Ugb25seSB0YWtlIHRoZSBmaXJzdCBwYXJ0XG4gICAgaWYgKGxvY2FsZS5pbmRleE9mKCdAJykgIT09IC0xKSB7XG4gICAgICAgIHZhciBfYiA9IGxvY2FsZS5zcGxpdCgnQCcpWzBdLCBhY3R1YWxMb2NhbGUgPSBfYiA9PT0gdm9pZCAwID8gJycgOiBfYjtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZUxvY2FsZShhY3R1YWxMb2NhbGUpO1xuICAgIH1cbiAgICAvLyBJZiB0aGVyZSdzIGEgZGFzaCAoLSkgaW4gdGhlIGxvY2FsZSBhbmQgaXQncyBub3QgYWxsIGxvd2VyIGNhc2UsIGl0J3MgYWxyZWFkeSBpbiB0aGUgZm9ybWF0IG9mIFwiZW4tVVNcIiwgc28gd2UgcmV0dXJuIGl0XG4gICAgaWYgKGxvY2FsZS5pbmRleE9mKCctJykgPT09IC0xIHx8ICFpc0FsbExvd2VyQ2FzZShsb2NhbGUpKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgfVxuICAgIHZhciBfYyA9IGxvY2FsZS5zcGxpdCgnLScpLCBzcGxpdEVsMSA9IF9jWzBdLCBfZCA9IF9jWzFdLCBzcGxpdEVsMiA9IF9kID09PSB2b2lkIDAgPyAnJyA6IF9kO1xuICAgIHJldHVybiBcIlwiLmNvbmNhdChzcGxpdEVsMSwgXCItXCIpLmNvbmNhdChzcGxpdEVsMi50b1VwcGVyQ2FzZSgpKTtcbn1cbmZ1bmN0aW9uIGdldFVzZXJMb2NhbGVzSW50ZXJuYWwoX2EpIHtcbiAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgX2MgPSBfYi51c2VGYWxsYmFja0xvY2FsZSwgdXNlRmFsbGJhY2tMb2NhbGUgPSBfYyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9jLCBfZCA9IF9iLmZhbGxiYWNrTG9jYWxlLCBmYWxsYmFja0xvY2FsZSA9IF9kID09PSB2b2lkIDAgPyAnZW4tVVMnIDogX2Q7XG4gICAgdmFyIGxhbmd1YWdlTGlzdCA9IFtdO1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgcmF3TGFuZ3VhZ2VzID0gbmF2aWdhdG9yLmxhbmd1YWdlcyB8fCBbXTtcbiAgICAgICAgdmFyIGxhbmd1YWdlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHJhd0xhbmd1YWdlc18xID0gcmF3TGFuZ3VhZ2VzOyBfaSA8IHJhd0xhbmd1YWdlc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIHJhd0xhbmd1YWdlc0l0ZW0gPSByYXdMYW5ndWFnZXNfMVtfaV07XG4gICAgICAgICAgICBsYW5ndWFnZXMgPSBsYW5ndWFnZXMuY29uY2F0KGZpeENvbW1hcyhyYXdMYW5ndWFnZXNJdGVtKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJhd0xhbmd1YWdlID0gbmF2aWdhdG9yLmxhbmd1YWdlO1xuICAgICAgICB2YXIgbGFuZ3VhZ2UgPSByYXdMYW5ndWFnZSA/IGZpeENvbW1hcyhyYXdMYW5ndWFnZSkgOiByYXdMYW5ndWFnZTtcbiAgICAgICAgbGFuZ3VhZ2VMaXN0ID0gbGFuZ3VhZ2VMaXN0LmNvbmNhdChsYW5ndWFnZXMsIGxhbmd1YWdlKTtcbiAgICB9XG4gICAgaWYgKHVzZUZhbGxiYWNrTG9jYWxlKSB7XG4gICAgICAgIGxhbmd1YWdlTGlzdC5wdXNoKGZhbGxiYWNrTG9jYWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIGxhbmd1YWdlTGlzdC5maWx0ZXIoaXNTdHJpbmcpLm1hcChub3JtYWxpemVMb2NhbGUpLmZpbHRlcihpc1VuaXF1ZSk7XG59XG5leHBvcnQgdmFyIGdldFVzZXJMb2NhbGVzID0gbWVtKGdldFVzZXJMb2NhbGVzSW50ZXJuYWwsIHsgY2FjaGVLZXk6IEpTT04uc3RyaW5naWZ5IH0pO1xuZnVuY3Rpb24gZ2V0VXNlckxvY2FsZUludGVybmFsKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZ2V0VXNlckxvY2FsZXMob3B0aW9ucylbMF0gfHwgbnVsbDtcbn1cbmV4cG9ydCB2YXIgZ2V0VXNlckxvY2FsZSA9IG1lbShnZXRVc2VyTG9jYWxlSW50ZXJuYWwsIHsgY2FjaGVLZXk6IEpTT04uc3RyaW5naWZ5IH0pO1xuZXhwb3J0IGRlZmF1bHQgZ2V0VXNlckxvY2FsZTtcbiIsIi8qKlxuICogVXRpbHNcbiAqL1xuZnVuY3Rpb24gbWFrZUdldEVkZ2VPZk5laWdoYm9yKGdldFBlcmlvZCwgZ2V0RWRnZU9mUGVyaW9kLCBkZWZhdWx0T2Zmc2V0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1ha2VHZXRFZGdlT2ZOZWlnaGJvckludGVybmFsKGRhdGUsIG9mZnNldCkge1xuICAgICAgICBpZiAob2Zmc2V0ID09PSB2b2lkIDApIHsgb2Zmc2V0ID0gZGVmYXVsdE9mZnNldDsgfVxuICAgICAgICB2YXIgcHJldmlvdXNQZXJpb2QgPSBnZXRQZXJpb2QoZGF0ZSkgKyBvZmZzZXQ7XG4gICAgICAgIHJldHVybiBnZXRFZGdlT2ZQZXJpb2QocHJldmlvdXNQZXJpb2QpO1xuICAgIH07XG59XG5mdW5jdGlvbiBtYWtlR2V0RW5kKGdldEJlZ2luT2ZOZXh0UGVyaW9kKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1ha2VHZXRFbmRJbnRlcm5hbChkYXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShnZXRCZWdpbk9mTmV4dFBlcmlvZChkYXRlKS5nZXRUaW1lKCkgLSAxKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gbWFrZUdldFJhbmdlKGdldFN0YXJ0LCBnZXRFbmQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbWFrZUdldFJhbmdlSW50ZXJuYWwoZGF0ZSkge1xuICAgICAgICByZXR1cm4gW2dldFN0YXJ0KGRhdGUpLCBnZXRFbmQoZGF0ZSldO1xuICAgIH07XG59XG4vKipcbiAqIFNpbXBsZSBnZXR0ZXJzIC0gZ2V0dGluZyBhIHByb3BlcnR5IG9mIGEgZ2l2ZW4gcG9pbnQgaW4gdGltZVxuICovXG4vKipcbiAqIEdldHMgeWVhciBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IHllYXIgZnJvbVxuICogQHJldHVybnMge251bWJlcn0gWWVhclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0WWVhcihkYXRlKSB7XG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICAgIHZhciB5ZWFyID0gcGFyc2VJbnQoZGF0ZSwgMTApO1xuICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycgJiYgIWlzTmFOKHllYXIpKSB7XG4gICAgICAgIHJldHVybiB5ZWFyO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2V0IHllYXIgZnJvbSBkYXRlOiBcIi5jb25jYXQoZGF0ZSwgXCIuXCIpKTtcbn1cbi8qKlxuICogR2V0cyBtb250aCBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZSB0byBnZXQgbW9udGggZnJvbVxuICogQHJldHVybnMge251bWJlcn0gTW9udGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1vbnRoKGRhdGUpIHtcbiAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGdldCBtb250aCBmcm9tIGRhdGU6IFwiLmNvbmNhdChkYXRlLCBcIi5cIikpO1xufVxuLyoqXG4gKiBHZXRzIGh1bWFuLXJlYWRhYmxlIG1vbnRoIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlIHRvIGdldCBodW1hbi1yZWFkYWJsZSBtb250aCBmcm9tXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBIdW1hbi1yZWFkYWJsZSBtb250aFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhIdW1hbihkYXRlKSB7XG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2V0IGh1bWFuLXJlYWRhYmxlIG1vbnRoIGZyb20gZGF0ZTogXCIuY29uY2F0KGRhdGUsIFwiLlwiKSk7XG59XG4vKipcbiAqIEdldHMgZGF5IG9mIHRoZSBtb250aCBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZSB0byBnZXQgZGF5IG9mIHRoZSBtb250aCBmcm9tXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBEYXkgb2YgdGhlIG1vbnRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRlKGRhdGUpIHtcbiAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2V0IHllYXIgZnJvbSBkYXRlOiBcIi5jb25jYXQoZGF0ZSwgXCIuXCIpKTtcbn1cbi8qKlxuICogR2V0cyBob3VycyBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGUgfCBzdHJpbmd9IGRhdGUgRGF0ZSB0byBnZXQgaG91cnMgZnJvbVxuICogQHJldHVybnMge251bWJlcn0gSG91cnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhvdXJzKGRhdGUpIHtcbiAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgZGF0ZVBpZWNlcyA9IGRhdGUuc3BsaXQoJzonKTtcbiAgICAgICAgaWYgKGRhdGVQaWVjZXMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIHZhciBob3Vyc1N0cmluZyA9IGRhdGVQaWVjZXNbMF07XG4gICAgICAgICAgICBpZiAoaG91cnNTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgaG91cnMgPSBwYXJzZUludChob3Vyc1N0cmluZywgMTApO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oaG91cnMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBob3VycztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGdldCBob3VycyBmcm9tIGRhdGU6IFwiLmNvbmNhdChkYXRlLCBcIi5cIikpO1xufVxuLyoqXG4gKiBHZXRzIG1pbnV0ZXMgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlIHwgc3RyaW5nfSBkYXRlIERhdGUgdG8gZ2V0IG1pbnV0ZXMgZnJvbVxuICogQHJldHVybnMge251bWJlcn0gTWludXRlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWludXRlcyhkYXRlKSB7XG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgZGF0ZVBpZWNlcyA9IGRhdGUuc3BsaXQoJzonKTtcbiAgICAgICAgaWYgKGRhdGVQaWVjZXMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIHZhciBtaW51dGVzU3RyaW5nID0gZGF0ZVBpZWNlc1sxXSB8fCAnMCc7XG4gICAgICAgICAgICB2YXIgbWludXRlcyA9IHBhcnNlSW50KG1pbnV0ZXNTdHJpbmcsIDEwKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4obWludXRlcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWludXRlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2V0IG1pbnV0ZXMgZnJvbSBkYXRlOiBcIi5jb25jYXQoZGF0ZSwgXCIuXCIpKTtcbn1cbi8qKlxuICogR2V0cyBzZWNvbmRzIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZSB8IHN0cmluZ30gZGF0ZSBEYXRlIHRvIGdldCBzZWNvbmRzIGZyb21cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFNlY29uZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlY29uZHMoZGF0ZSkge1xuICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIGRhdGVQaWVjZXMgPSBkYXRlLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmIChkYXRlUGllY2VzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICB2YXIgc2Vjb25kc1dpdGhNaWxsaXNlY29uZHNTdHJpbmcgPSBkYXRlUGllY2VzWzJdIHx8ICcwJztcbiAgICAgICAgICAgIHZhciBzZWNvbmRzID0gcGFyc2VJbnQoc2Vjb25kc1dpdGhNaWxsaXNlY29uZHNTdHJpbmcsIDEwKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4oc2Vjb25kcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Vjb25kcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2V0IHNlY29uZHMgZnJvbSBkYXRlOiBcIi5jb25jYXQoZGF0ZSwgXCIuXCIpKTtcbn1cbi8qKlxuICogR2V0cyBtaWxsaXNlY29uZHMgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlIHwgc3RyaW5nfSBkYXRlIERhdGUgdG8gZ2V0IG1pbGxpc2Vjb25kcyBmcm9tXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBNaWxsaXNlY29uZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1pbGxpc2Vjb25kcyhkYXRlKSB7XG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldE1pbGxpc2Vjb25kcygpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBkYXRlUGllY2VzID0gZGF0ZS5zcGxpdCgnOicpO1xuICAgICAgICBpZiAoZGF0ZVBpZWNlcy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgdmFyIHNlY29uZHNXaXRoTWlsbGlzZWNvbmRzU3RyaW5nID0gZGF0ZVBpZWNlc1syXSB8fCAnMCc7XG4gICAgICAgICAgICB2YXIgbWlsbGlzZWNvbmRzU3RyaW5nID0gc2Vjb25kc1dpdGhNaWxsaXNlY29uZHNTdHJpbmcuc3BsaXQoJy4nKVsxXSB8fCAnMCc7XG4gICAgICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gcGFyc2VJbnQobWlsbGlzZWNvbmRzU3RyaW5nLCAxMCk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKG1pbGxpc2Vjb25kcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZXQgc2Vjb25kcyBmcm9tIGRhdGU6IFwiLmNvbmNhdChkYXRlLCBcIi5cIikpO1xufVxuLyoqXG4gKiBDZW50dXJ5XG4gKi9cbi8qKlxuICogR2V0cyBjZW50dXJ5IHN0YXJ0IGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBjZW50dXJ5IHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBDZW50dXJ5IHN0YXJ0IGRhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENlbnR1cnlTdGFydChkYXRlKSB7XG4gICAgdmFyIHllYXIgPSBnZXRZZWFyKGRhdGUpO1xuICAgIHZhciBjZW50dXJ5U3RhcnRZZWFyID0geWVhciArICgoLXllYXIgKyAxKSAlIDEwMCk7XG4gICAgdmFyIGNlbnR1cnlTdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGNlbnR1cnlTdGFydERhdGUuc2V0RnVsbFllYXIoY2VudHVyeVN0YXJ0WWVhciwgMCwgMSk7XG4gICAgY2VudHVyeVN0YXJ0RGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICByZXR1cm4gY2VudHVyeVN0YXJ0RGF0ZTtcbn1cbi8qKlxuICogR2V0cyBwcmV2aW91cyBjZW50dXJ5IHN0YXJ0IGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBwcmV2aW91cyBjZW50dXJ5IHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBQcmV2aW91cyBjZW50dXJ5IHN0YXJ0IGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXRQcmV2aW91c0NlbnR1cnlTdGFydCA9IG1ha2VHZXRFZGdlT2ZOZWlnaGJvcihnZXRZZWFyLCBnZXRDZW50dXJ5U3RhcnQsIC0xMDApO1xuLyoqXG4gKiBHZXRzIG5leHQgY2VudHVyeSBzdGFydCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgbmV4dCBjZW50dXJ5IHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBOZXh0IGNlbnR1cnkgc3RhcnQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldE5leHRDZW50dXJ5U3RhcnQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0Q2VudHVyeVN0YXJ0LCAxMDApO1xuLyoqXG4gKiBHZXRzIGNlbnR1cnkgZW5kIGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBjZW50dXJ5IGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gQ2VudHVyeSBlbmQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldENlbnR1cnlFbmQgPSBtYWtlR2V0RW5kKGdldE5leHRDZW50dXJ5U3RhcnQpO1xuLyoqXG4gKiBHZXRzIHByZXZpb3VzIGNlbnR1cnkgZW5kIGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBwcmV2aW91cyBjZW50dXJ5IGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gUHJldmlvdXMgY2VudHVyeSBlbmQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldFByZXZpb3VzQ2VudHVyeUVuZCA9IG1ha2VHZXRFZGdlT2ZOZWlnaGJvcihnZXRZZWFyLCBnZXRDZW50dXJ5RW5kLCAtMTAwKTtcbi8qKlxuICogR2V0cyBuZXh0IGNlbnR1cnkgZW5kIGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBuZXh0IGNlbnR1cnkgZW5kIGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBOZXh0IGNlbnR1cnkgZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXROZXh0Q2VudHVyeUVuZCA9IG1ha2VHZXRFZGdlT2ZOZWlnaGJvcihnZXRZZWFyLCBnZXRDZW50dXJ5RW5kLCAxMDApO1xuLyoqXG4gKiBHZXRzIGNlbnR1cnkgc3RhcnQgYW5kIGVuZCBkYXRlcyBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IGNlbnR1cnkgc3RhcnQgYW5kIGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7W0RhdGUsIERhdGVdfSBDZW50dXJ5IHN0YXJ0IGFuZCBlbmQgZGF0ZXNcbiAqL1xuZXhwb3J0IHZhciBnZXRDZW50dXJ5UmFuZ2UgPSBtYWtlR2V0UmFuZ2UoZ2V0Q2VudHVyeVN0YXJ0LCBnZXRDZW50dXJ5RW5kKTtcbi8qKlxuICogRGVjYWRlXG4gKi9cbi8qKlxuICogR2V0cyBkZWNhZGUgc3RhcnQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IGRlY2FkZSBzdGFydCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gRGVjYWRlIHN0YXJ0IGRhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlY2FkZVN0YXJ0KGRhdGUpIHtcbiAgICB2YXIgeWVhciA9IGdldFllYXIoZGF0ZSk7XG4gICAgdmFyIGRlY2FkZVN0YXJ0WWVhciA9IHllYXIgKyAoKC15ZWFyICsgMSkgJSAxMCk7XG4gICAgdmFyIGRlY2FkZVN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgZGVjYWRlU3RhcnREYXRlLnNldEZ1bGxZZWFyKGRlY2FkZVN0YXJ0WWVhciwgMCwgMSk7XG4gICAgZGVjYWRlU3RhcnREYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIHJldHVybiBkZWNhZGVTdGFydERhdGU7XG59XG4vKipcbiAqIEdldHMgcHJldmlvdXMgZGVjYWRlIHN0YXJ0IGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBwcmV2aW91cyBkZWNhZGUgc3RhcnQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IFByZXZpb3VzIGRlY2FkZSBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0UHJldmlvdXNEZWNhZGVTdGFydCA9IG1ha2VHZXRFZGdlT2ZOZWlnaGJvcihnZXRZZWFyLCBnZXREZWNhZGVTdGFydCwgLTEwKTtcbi8qKlxuICogR2V0cyBuZXh0IGRlY2FkZSBzdGFydCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgbmV4dCBkZWNhZGUgc3RhcnQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IE5leHQgZGVjYWRlIHN0YXJ0IGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXROZXh0RGVjYWRlU3RhcnQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0RGVjYWRlU3RhcnQsIDEwKTtcbi8qKlxuICogR2V0cyBkZWNhZGUgZW5kIGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBkZWNhZGUgZW5kIGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBEZWNhZGUgZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXREZWNhZGVFbmQgPSBtYWtlR2V0RW5kKGdldE5leHREZWNhZGVTdGFydCk7XG4vKipcbiAqIEdldHMgcHJldmlvdXMgZGVjYWRlIGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgcHJldmlvdXMgZGVjYWRlIGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gUHJldmlvdXMgZGVjYWRlIGVuZCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0UHJldmlvdXNEZWNhZGVFbmQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0RGVjYWRlRW5kLCAtMTApO1xuLyoqXG4gKiBHZXRzIG5leHQgZGVjYWRlIGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgbmV4dCBkZWNhZGUgZW5kIGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBOZXh0IGRlY2FkZSBlbmQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldE5leHREZWNhZGVFbmQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0RGVjYWRlRW5kLCAxMCk7XG4vKipcbiAqIEdldHMgZGVjYWRlIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBkZWNhZGUgc3RhcnQgYW5kIGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7W0RhdGUsIERhdGVdfSBEZWNhZGUgc3RhcnQgYW5kIGVuZCBkYXRlc1xuICovXG5leHBvcnQgdmFyIGdldERlY2FkZVJhbmdlID0gbWFrZUdldFJhbmdlKGdldERlY2FkZVN0YXJ0LCBnZXREZWNhZGVFbmQpO1xuLyoqXG4gKiBZZWFyXG4gKi9cbi8qKlxuICogR2V0cyB5ZWFyIHN0YXJ0IGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCB5ZWFyIHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBZZWFyIHN0YXJ0IGRhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFllYXJTdGFydChkYXRlKSB7XG4gICAgdmFyIHllYXIgPSBnZXRZZWFyKGRhdGUpO1xuICAgIHZhciB5ZWFyU3RhcnREYXRlID0gbmV3IERhdGUoKTtcbiAgICB5ZWFyU3RhcnREYXRlLnNldEZ1bGxZZWFyKHllYXIsIDAsIDEpO1xuICAgIHllYXJTdGFydERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgcmV0dXJuIHllYXJTdGFydERhdGU7XG59XG4vKipcbiAqIEdldHMgcHJldmlvdXMgeWVhciBzdGFydCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgcHJldmlvdXMgeWVhciBzdGFydCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gUHJldmlvdXMgeWVhciBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0UHJldmlvdXNZZWFyU3RhcnQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0WWVhclN0YXJ0LCAtMSk7XG4vKipcbiAqIEdldHMgbmV4dCB5ZWFyIHN0YXJ0IGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBuZXh0IHllYXIgc3RhcnQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IE5leHQgeWVhciBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0TmV4dFllYXJTdGFydCA9IG1ha2VHZXRFZGdlT2ZOZWlnaGJvcihnZXRZZWFyLCBnZXRZZWFyU3RhcnQsIDEpO1xuLyoqXG4gKiBHZXRzIHllYXIgZW5kIGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCB5ZWFyIGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gWWVhciBlbmQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldFllYXJFbmQgPSBtYWtlR2V0RW5kKGdldE5leHRZZWFyU3RhcnQpO1xuLyoqXG4gKiBHZXRzIHByZXZpb3VzIHllYXIgZW5kIGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBwcmV2aW91cyB5ZWFyIGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gUHJldmlvdXMgeWVhciBlbmQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldFByZXZpb3VzWWVhckVuZCA9IG1ha2VHZXRFZGdlT2ZOZWlnaGJvcihnZXRZZWFyLCBnZXRZZWFyRW5kLCAtMSk7XG4vKipcbiAqIEdldHMgbmV4dCB5ZWFyIGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgbmV4dCB5ZWFyIGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gTmV4dCB5ZWFyIGVuZCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0TmV4dFllYXJFbmQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3IoZ2V0WWVhciwgZ2V0WWVhckVuZCwgMSk7XG4vKipcbiAqIEdldHMgeWVhciBzdGFydCBhbmQgZW5kIGRhdGVzIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgeWVhciBzdGFydCBhbmQgZW5kIGZyb21cbiAqIEByZXR1cm5zIHtbRGF0ZSwgRGF0ZV19IFllYXIgc3RhcnQgYW5kIGVuZCBkYXRlc1xuICovXG5leHBvcnQgdmFyIGdldFllYXJSYW5nZSA9IG1ha2VHZXRSYW5nZShnZXRZZWFyU3RhcnQsIGdldFllYXJFbmQpO1xuLyoqXG4gKiBNb250aFxuICovXG5mdW5jdGlvbiBtYWtlR2V0RWRnZU9mTmVpZ2hib3JNb250aChnZXRFZGdlT2ZQZXJpb2QsIGRlZmF1bHRPZmZzZXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbWFrZUdldEVkZ2VPZk5laWdoYm9yTW9udGhJbnRlcm5hbChkYXRlLCBvZmZzZXQpIHtcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gdm9pZCAwKSB7IG9mZnNldCA9IGRlZmF1bHRPZmZzZXQ7IH1cbiAgICAgICAgdmFyIHllYXIgPSBnZXRZZWFyKGRhdGUpO1xuICAgICAgICB2YXIgbW9udGggPSBnZXRNb250aChkYXRlKSArIG9mZnNldDtcbiAgICAgICAgdmFyIHByZXZpb3VzUGVyaW9kID0gbmV3IERhdGUoKTtcbiAgICAgICAgcHJldmlvdXNQZXJpb2Quc2V0RnVsbFllYXIoeWVhciwgbW9udGgsIDEpO1xuICAgICAgICBwcmV2aW91c1BlcmlvZC5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgcmV0dXJuIGdldEVkZ2VPZlBlcmlvZChwcmV2aW91c1BlcmlvZCk7XG4gICAgfTtcbn1cbi8qKlxuICogR2V0cyBtb250aCBzdGFydCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgbW9udGggc3RhcnQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IE1vbnRoIHN0YXJ0IGRhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1vbnRoU3RhcnQoZGF0ZSkge1xuICAgIHZhciB5ZWFyID0gZ2V0WWVhcihkYXRlKTtcbiAgICB2YXIgbW9udGggPSBnZXRNb250aChkYXRlKTtcbiAgICB2YXIgbW9udGhTdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIG1vbnRoU3RhcnREYXRlLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCAxKTtcbiAgICBtb250aFN0YXJ0RGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICByZXR1cm4gbW9udGhTdGFydERhdGU7XG59XG4vKipcbiAqIEdldHMgcHJldmlvdXMgbW9udGggc3RhcnQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IHByZXZpb3VzIG1vbnRoIHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBQcmV2aW91cyBtb250aCBzdGFydCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0UHJldmlvdXNNb250aFN0YXJ0ID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yTW9udGgoZ2V0TW9udGhTdGFydCwgLTEpO1xuLyoqXG4gKiBHZXRzIG5leHQgbW9udGggc3RhcnQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IG5leHQgbW9udGggc3RhcnQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IE5leHQgbW9udGggc3RhcnQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldE5leHRNb250aFN0YXJ0ID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yTW9udGgoZ2V0TW9udGhTdGFydCwgMSk7XG4vKipcbiAqIEdldHMgbW9udGggZW5kIGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBtb250aCBlbmQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IE1vbnRoIGVuZCBkYXRlXG4gKi9cbmV4cG9ydCB2YXIgZ2V0TW9udGhFbmQgPSBtYWtlR2V0RW5kKGdldE5leHRNb250aFN0YXJ0KTtcbi8qKlxuICogR2V0cyBwcmV2aW91cyBtb250aCBlbmQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IHByZXZpb3VzIG1vbnRoIGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gUHJldmlvdXMgbW9udGggZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXRQcmV2aW91c01vbnRoRW5kID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yTW9udGgoZ2V0TW9udGhFbmQsIC0xKTtcbi8qKlxuICogR2V0cyBuZXh0IG1vbnRoIGVuZCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgbmV4dCBtb250aCBlbmQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IE5leHQgbW9udGggZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXROZXh0TW9udGhFbmQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3JNb250aChnZXRNb250aEVuZCwgMSk7XG4vKipcbiAqIEdldHMgbW9udGggc3RhcnQgYW5kIGVuZCBkYXRlcyBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IG1vbnRoIHN0YXJ0IGFuZCBlbmQgZnJvbVxuICogQHJldHVybnMge1tEYXRlLCBEYXRlXX0gTW9udGggc3RhcnQgYW5kIGVuZCBkYXRlc1xuICovXG5leHBvcnQgdmFyIGdldE1vbnRoUmFuZ2UgPSBtYWtlR2V0UmFuZ2UoZ2V0TW9udGhTdGFydCwgZ2V0TW9udGhFbmQpO1xuLyoqXG4gKiBEYXlcbiAqL1xuZnVuY3Rpb24gbWFrZUdldEVkZ2VPZk5laWdoYm9yRGF5KGdldEVkZ2VPZlBlcmlvZCwgZGVmYXVsdE9mZnNldCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBtYWtlR2V0RWRnZU9mTmVpZ2hib3JEYXlJbnRlcm5hbChkYXRlLCBvZmZzZXQpIHtcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gdm9pZCAwKSB7IG9mZnNldCA9IGRlZmF1bHRPZmZzZXQ7IH1cbiAgICAgICAgdmFyIHllYXIgPSBnZXRZZWFyKGRhdGUpO1xuICAgICAgICB2YXIgbW9udGggPSBnZXRNb250aChkYXRlKTtcbiAgICAgICAgdmFyIGRheSA9IGdldERhdGUoZGF0ZSkgKyBvZmZzZXQ7XG4gICAgICAgIHZhciBwcmV2aW91c1BlcmlvZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHByZXZpb3VzUGVyaW9kLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICBwcmV2aW91c1BlcmlvZC5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgcmV0dXJuIGdldEVkZ2VPZlBlcmlvZChwcmV2aW91c1BlcmlvZCk7XG4gICAgfTtcbn1cbi8qKlxuICogR2V0cyBkYXkgc3RhcnQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IGRheSBzdGFydCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gRGF5IHN0YXJ0IGRhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERheVN0YXJ0KGRhdGUpIHtcbiAgICB2YXIgeWVhciA9IGdldFllYXIoZGF0ZSk7XG4gICAgdmFyIG1vbnRoID0gZ2V0TW9udGgoZGF0ZSk7XG4gICAgdmFyIGRheSA9IGdldERhdGUoZGF0ZSk7XG4gICAgdmFyIGRheVN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgZGF5U3RhcnREYXRlLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIGRheVN0YXJ0RGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICByZXR1cm4gZGF5U3RhcnREYXRlO1xufVxuLyoqXG4gKiBHZXRzIHByZXZpb3VzIGRheSBzdGFydCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgcHJldmlvdXMgZGF5IHN0YXJ0IGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBQcmV2aW91cyBkYXkgc3RhcnQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldFByZXZpb3VzRGF5U3RhcnQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3JEYXkoZ2V0RGF5U3RhcnQsIC0xKTtcbi8qKlxuICogR2V0cyBuZXh0IGRheSBzdGFydCBkYXRlIGZyb20gYSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZUxpa2V9IGRhdGUgRGF0ZSB0byBnZXQgbmV4dCBkYXkgc3RhcnQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IE5leHQgZGF5IHN0YXJ0IGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXROZXh0RGF5U3RhcnQgPSBtYWtlR2V0RWRnZU9mTmVpZ2hib3JEYXkoZ2V0RGF5U3RhcnQsIDEpO1xuLyoqXG4gKiBHZXRzIGRheSBlbmQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IGRheSBlbmQgZnJvbVxuICogQHJldHVybnMge0RhdGV9IERheSBlbmQgZGF0ZVxuICovXG5leHBvcnQgdmFyIGdldERheUVuZCA9IG1ha2VHZXRFbmQoZ2V0TmV4dERheVN0YXJ0KTtcbi8qKlxuICogR2V0cyBwcmV2aW91cyBkYXkgZW5kIGRhdGUgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBwcmV2aW91cyBkYXkgZW5kIGZyb21cbiAqIEByZXR1cm5zIHtEYXRlfSBQcmV2aW91cyBkYXkgZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXRQcmV2aW91c0RheUVuZCA9IG1ha2VHZXRFZGdlT2ZOZWlnaGJvckRheShnZXREYXlFbmQsIC0xKTtcbi8qKlxuICogR2V0cyBuZXh0IGRheSBlbmQgZGF0ZSBmcm9tIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGVMaWtlfSBkYXRlIERhdGUgdG8gZ2V0IG5leHQgZGF5IGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7RGF0ZX0gTmV4dCBkYXkgZW5kIGRhdGVcbiAqL1xuZXhwb3J0IHZhciBnZXROZXh0RGF5RW5kID0gbWFrZUdldEVkZ2VPZk5laWdoYm9yRGF5KGdldERheUVuZCwgMSk7XG4vKipcbiAqIEdldHMgZGF5IHN0YXJ0IGFuZCBlbmQgZGF0ZXMgZnJvbSBhIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlTGlrZX0gZGF0ZSBEYXRlIHRvIGdldCBkYXkgc3RhcnQgYW5kIGVuZCBmcm9tXG4gKiBAcmV0dXJucyB7W0RhdGUsIERhdGVdfSBEYXkgc3RhcnQgYW5kIGVuZCBkYXRlc1xuICovXG5leHBvcnQgdmFyIGdldERheVJhbmdlID0gbWFrZUdldFJhbmdlKGdldERheVN0YXJ0LCBnZXREYXlFbmQpO1xuLyoqXG4gKiBPdGhlclxuICovXG4vKipcbiAqIFJldHVybnMgYSBudW1iZXIgb2YgZGF5cyBpbiBhIG1vbnRoIG9mIGEgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gTnVtYmVyIG9mIGRheXMgaW4gYSBtb250aFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0luTW9udGgoZGF0ZSkge1xuICAgIHJldHVybiBnZXREYXRlKGdldE1vbnRoRW5kKGRhdGUpKTtcbn1cbmZ1bmN0aW9uIHBhZFN0YXJ0KG51bSwgdmFsKSB7XG4gICAgaWYgKHZhbCA9PT0gdm9pZCAwKSB7IHZhbCA9IDI7IH1cbiAgICB2YXIgbnVtU3RyID0gXCJcIi5jb25jYXQobnVtKTtcbiAgICBpZiAobnVtU3RyLmxlbmd0aCA+PSB2YWwpIHtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG4gICAgcmV0dXJuIFwiMDAwMFwiLmNvbmNhdChudW1TdHIpLnNsaWNlKC12YWwpO1xufVxuLyoqXG4gKiBSZXR1cm5zIGxvY2FsIGhvdXJzIGFuZCBtaW51dGVzIChoaDptbSkuXG4gKlxuICogQHBhcmFtIHtEYXRlIHwgc3RyaW5nfSBkYXRlIERhdGUgdG8gZ2V0IGhvdXJzIGFuZCBtaW51dGVzIGZyb21cbiAqIEByZXR1cm5zIHtzdHJpbmd9IExvY2FsIGhvdXJzIGFuZCBtaW51dGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb3Vyc01pbnV0ZXMoZGF0ZSkge1xuICAgIHZhciBob3VycyA9IHBhZFN0YXJ0KGdldEhvdXJzKGRhdGUpKTtcbiAgICB2YXIgbWludXRlcyA9IHBhZFN0YXJ0KGdldE1pbnV0ZXMoZGF0ZSkpO1xuICAgIHJldHVybiBcIlwiLmNvbmNhdChob3VycywgXCI6XCIpLmNvbmNhdChtaW51dGVzKTtcbn1cbi8qKlxuICogUmV0dXJucyBsb2NhbCBob3VycywgbWludXRlcyBhbmQgc2Vjb25kcyAoaGg6bW06c3MpLlxuICpcbiAqIEBwYXJhbSB7RGF0ZSB8IHN0cmluZ30gZGF0ZSBEYXRlIHRvIGdldCBob3VycywgbWludXRlcyBhbmQgc2Vjb25kcyBmcm9tXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBMb2NhbCBob3VycywgbWludXRlcyBhbmQgc2Vjb25kc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG91cnNNaW51dGVzU2Vjb25kcyhkYXRlKSB7XG4gICAgdmFyIGhvdXJzID0gcGFkU3RhcnQoZ2V0SG91cnMoZGF0ZSkpO1xuICAgIHZhciBtaW51dGVzID0gcGFkU3RhcnQoZ2V0TWludXRlcyhkYXRlKSk7XG4gICAgdmFyIHNlY29uZHMgPSBwYWRTdGFydChnZXRTZWNvbmRzKGRhdGUpKTtcbiAgICByZXR1cm4gXCJcIi5jb25jYXQoaG91cnMsIFwiOlwiKS5jb25jYXQobWludXRlcywgXCI6XCIpLmNvbmNhdChzZWNvbmRzKTtcbn1cbi8qKlxuICogUmV0dXJucyBsb2NhbCBtb250aCBpbiBJU08tbGlrZSBmb3JtYXQgKFlZWVktTU0pLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlIHRvIGdldCBtb250aCBpbiBJU08tbGlrZSBmb3JtYXQgZnJvbVxuICogQHJldHVybnMge3N0cmluZ30gTG9jYWwgbW9udGggaW4gSVNPLWxpa2UgZm9ybWF0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJU09Mb2NhbE1vbnRoKGRhdGUpIHtcbiAgICB2YXIgeWVhciA9IHBhZFN0YXJ0KGdldFllYXIoZGF0ZSksIDQpO1xuICAgIHZhciBtb250aCA9IHBhZFN0YXJ0KGdldE1vbnRoSHVtYW4oZGF0ZSkpO1xuICAgIHJldHVybiBcIlwiLmNvbmNhdCh5ZWFyLCBcIi1cIikuY29uY2F0KG1vbnRoKTtcbn1cbi8qKlxuICogUmV0dXJucyBsb2NhbCBkYXRlIGluIElTTy1saWtlIGZvcm1hdCAoWVlZWS1NTS1ERCkuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUgdG8gZ2V0IGRhdGUgaW4gSVNPLWxpa2UgZm9ybWF0IGZyb21cbiAqIEByZXR1cm5zIHtzdHJpbmd9IExvY2FsIGRhdGUgaW4gSVNPLWxpa2UgZm9ybWF0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJU09Mb2NhbERhdGUoZGF0ZSkge1xuICAgIHZhciB5ZWFyID0gcGFkU3RhcnQoZ2V0WWVhcihkYXRlKSwgNCk7XG4gICAgdmFyIG1vbnRoID0gcGFkU3RhcnQoZ2V0TW9udGhIdW1hbihkYXRlKSk7XG4gICAgdmFyIGRheSA9IHBhZFN0YXJ0KGdldERhdGUoZGF0ZSkpO1xuICAgIHJldHVybiBcIlwiLmNvbmNhdCh5ZWFyLCBcIi1cIikuY29uY2F0KG1vbnRoLCBcIi1cIikuY29uY2F0KGRheSk7XG59XG4vKipcbiAqIFJldHVybnMgbG9jYWwgZGF0ZSAmIHRpbWUgaW4gSVNPLWxpa2UgZm9ybWF0IChZWVlZLU1NLUREVGhoOm1tOnNzKS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZSB0byBnZXQgZGF0ZSAmIHRpbWUgaW4gSVNPLWxpa2UgZm9ybWF0IGZyb21cbiAqIEByZXR1cm5zIHtzdHJpbmd9IExvY2FsIGRhdGUgJiB0aW1lIGluIElTTy1saWtlIGZvcm1hdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SVNPTG9jYWxEYXRlVGltZShkYXRlKSB7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KGdldElTT0xvY2FsRGF0ZShkYXRlKSwgXCJUXCIpLmNvbmNhdChnZXRIb3Vyc01pbnV0ZXNTZWNvbmRzKGRhdGUpKTtcbn1cbiIsImV4cG9ydCB2YXIgQ0FMRU5EQVJfVFlQRVMgPSB7XG4gICAgR1JFR09SWTogJ2dyZWdvcnknLFxuICAgIEhFQlJFVzogJ2hlYnJldycsXG4gICAgSVNMQU1JQzogJ2lzbGFtaWMnLFxuICAgIElTT184NjAxOiAnaXNvODYwMScsXG59O1xuZXhwb3J0IHZhciBDQUxFTkRBUl9UWVBFX0xPQ0FMRVMgPSB7XG4gICAgZ3JlZ29yeTogW1xuICAgICAgICAnZW4tQ0EnLFxuICAgICAgICAnZW4tVVMnLFxuICAgICAgICAnZXMtQVInLFxuICAgICAgICAnZXMtQk8nLFxuICAgICAgICAnZXMtQ0wnLFxuICAgICAgICAnZXMtQ08nLFxuICAgICAgICAnZXMtQ1InLFxuICAgICAgICAnZXMtRE8nLFxuICAgICAgICAnZXMtRUMnLFxuICAgICAgICAnZXMtR1QnLFxuICAgICAgICAnZXMtSE4nLFxuICAgICAgICAnZXMtTVgnLFxuICAgICAgICAnZXMtTkknLFxuICAgICAgICAnZXMtUEEnLFxuICAgICAgICAnZXMtUEUnLFxuICAgICAgICAnZXMtUFInLFxuICAgICAgICAnZXMtU1YnLFxuICAgICAgICAnZXMtVkUnLFxuICAgICAgICAncHQtQlInLFxuICAgIF0sXG4gICAgaGVicmV3OiBbJ2hlJywgJ2hlLUlMJ10sXG4gICAgaXNsYW1pYzogW1xuICAgICAgICAvLyBhci1MQiwgYXItTUEgaW50ZW50aW9uYWxseSBtaXNzaW5nXG4gICAgICAgICdhcicsXG4gICAgICAgICdhci1BRScsXG4gICAgICAgICdhci1CSCcsXG4gICAgICAgICdhci1EWicsXG4gICAgICAgICdhci1FRycsXG4gICAgICAgICdhci1JUScsXG4gICAgICAgICdhci1KTycsXG4gICAgICAgICdhci1LVycsXG4gICAgICAgICdhci1MWScsXG4gICAgICAgICdhci1PTScsXG4gICAgICAgICdhci1RQScsXG4gICAgICAgICdhci1TQScsXG4gICAgICAgICdhci1TRCcsXG4gICAgICAgICdhci1TWScsXG4gICAgICAgICdhci1ZRScsXG4gICAgICAgICdkdicsXG4gICAgICAgICdkdi1NVicsXG4gICAgICAgICdwcycsXG4gICAgICAgICdwcy1BUicsXG4gICAgXSxcbn07XG5leHBvcnQgdmFyIFdFRUtEQVlTID0gWzAsIDEsIDIsIDMsIDQsIDUsIDZdO1xuIiwiaW1wb3J0IGdldFVzZXJMb2NhbGUgZnJvbSAnZ2V0LXVzZXItbG9jYWxlJztcbnZhciBmb3JtYXR0ZXJDYWNoZSA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIGdldEZvcm1hdHRlcihvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZvcm1hdHRlcihsb2NhbGUsIGRhdGUpIHtcbiAgICAgICAgdmFyIGxvY2FsZVdpdGhEZWZhdWx0ID0gbG9jYWxlIHx8IGdldFVzZXJMb2NhbGUoKTtcbiAgICAgICAgaWYgKCFmb3JtYXR0ZXJDYWNoZS5oYXMobG9jYWxlV2l0aERlZmF1bHQpKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZXJDYWNoZS5zZXQobG9jYWxlV2l0aERlZmF1bHQsIG5ldyBNYXAoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZvcm1hdHRlckNhY2hlTG9jYWxlID0gZm9ybWF0dGVyQ2FjaGUuZ2V0KGxvY2FsZVdpdGhEZWZhdWx0KTtcbiAgICAgICAgaWYgKCFmb3JtYXR0ZXJDYWNoZUxvY2FsZS5oYXMob3B0aW9ucykpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlckNhY2hlTG9jYWxlLnNldChvcHRpb25zLCBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGVXaXRoRGVmYXVsdCB8fCB1bmRlZmluZWQsIG9wdGlvbnMpLmZvcm1hdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlckNhY2hlTG9jYWxlLmdldChvcHRpb25zKShkYXRlKTtcbiAgICB9O1xufVxuLyoqXG4gKiBDaGFuZ2VzIHRoZSBob3VyIGluIGEgRGF0ZSB0byBlbnN1cmUgcmlnaHQgZGF0ZSBmb3JtYXR0aW5nIGV2ZW4gaWYgRFNUIGlzIG1lc3NlZCB1cC5cbiAqIFdvcmthcm91bmQgZm9yIGJ1ZyBpbiBXZWJLaXQgYW5kIEZpcmVmb3ggd2l0aCBoaXN0b3JpY2FsIGRhdGVzLlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlOlxuICogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NzUwNDY1XG4gKiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzg1NjQzXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gRGF0ZSB3aXRoIGhvdXIgc2V0IHRvIDEyLlxuICovXG5mdW5jdGlvbiB0b1NhZmVIb3VyKGRhdGUpIHtcbiAgICB2YXIgc2FmZURhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICByZXR1cm4gbmV3IERhdGUoc2FmZURhdGUuc2V0SG91cnMoMTIpKTtcbn1cbmZ1bmN0aW9uIGdldFNhZmVGb3JtYXR0ZXIob3B0aW9ucykge1xuICAgIHJldHVybiBmdW5jdGlvbiAobG9jYWxlLCBkYXRlKSB7IHJldHVybiBnZXRGb3JtYXR0ZXIob3B0aW9ucykobG9jYWxlLCB0b1NhZmVIb3VyKGRhdGUpKTsgfTtcbn1cbnZhciBmb3JtYXREYXRlT3B0aW9ucyA9IHtcbiAgICBkYXk6ICdudW1lcmljJyxcbiAgICBtb250aDogJ251bWVyaWMnLFxuICAgIHllYXI6ICdudW1lcmljJyxcbn07XG52YXIgZm9ybWF0RGF5T3B0aW9ucyA9IHsgZGF5OiAnbnVtZXJpYycgfTtcbnZhciBmb3JtYXRMb25nRGF0ZU9wdGlvbnMgPSB7XG4gICAgZGF5OiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICdsb25nJyxcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG59O1xudmFyIGZvcm1hdE1vbnRoT3B0aW9ucyA9IHsgbW9udGg6ICdsb25nJyB9O1xudmFyIGZvcm1hdE1vbnRoWWVhck9wdGlvbnMgPSB7XG4gICAgbW9udGg6ICdsb25nJyxcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG59O1xudmFyIGZvcm1hdFNob3J0V2Vla2RheU9wdGlvbnMgPSB7IHdlZWtkYXk6ICdzaG9ydCcgfTtcbnZhciBmb3JtYXRXZWVrZGF5T3B0aW9ucyA9IHsgd2Vla2RheTogJ2xvbmcnIH07XG52YXIgZm9ybWF0WWVhck9wdGlvbnMgPSB7IHllYXI6ICdudW1lcmljJyB9O1xuZXhwb3J0IHZhciBmb3JtYXREYXRlID0gZ2V0U2FmZUZvcm1hdHRlcihmb3JtYXREYXRlT3B0aW9ucyk7XG5leHBvcnQgdmFyIGZvcm1hdERheSA9IGdldFNhZmVGb3JtYXR0ZXIoZm9ybWF0RGF5T3B0aW9ucyk7XG5leHBvcnQgdmFyIGZvcm1hdExvbmdEYXRlID0gZ2V0U2FmZUZvcm1hdHRlcihmb3JtYXRMb25nRGF0ZU9wdGlvbnMpO1xuZXhwb3J0IHZhciBmb3JtYXRNb250aCA9IGdldFNhZmVGb3JtYXR0ZXIoZm9ybWF0TW9udGhPcHRpb25zKTtcbmV4cG9ydCB2YXIgZm9ybWF0TW9udGhZZWFyID0gZ2V0U2FmZUZvcm1hdHRlcihmb3JtYXRNb250aFllYXJPcHRpb25zKTtcbmV4cG9ydCB2YXIgZm9ybWF0U2hvcnRXZWVrZGF5ID0gZ2V0U2FmZUZvcm1hdHRlcihmb3JtYXRTaG9ydFdlZWtkYXlPcHRpb25zKTtcbmV4cG9ydCB2YXIgZm9ybWF0V2Vla2RheSA9IGdldFNhZmVGb3JtYXR0ZXIoZm9ybWF0V2Vla2RheU9wdGlvbnMpO1xuZXhwb3J0IHZhciBmb3JtYXRZZWFyID0gZ2V0U2FmZUZvcm1hdHRlcihmb3JtYXRZZWFyT3B0aW9ucyk7XG4iLCJpbXBvcnQgeyBnZXRZZWFyLCBnZXRNb250aCBhcyBnZXRNb250aEluZGV4LCBnZXRDZW50dXJ5U3RhcnQsIGdldFByZXZpb3VzQ2VudHVyeVN0YXJ0LCBnZXROZXh0Q2VudHVyeVN0YXJ0LCBnZXRDZW50dXJ5RW5kLCBnZXRQcmV2aW91c0NlbnR1cnlFbmQsIGdldENlbnR1cnlSYW5nZSwgZ2V0RGVjYWRlU3RhcnQsIGdldFByZXZpb3VzRGVjYWRlU3RhcnQsIGdldE5leHREZWNhZGVTdGFydCwgZ2V0RGVjYWRlRW5kLCBnZXRQcmV2aW91c0RlY2FkZUVuZCwgZ2V0RGVjYWRlUmFuZ2UsIGdldFllYXJTdGFydCwgZ2V0UHJldmlvdXNZZWFyU3RhcnQsIGdldE5leHRZZWFyU3RhcnQsIGdldFllYXJFbmQsIGdldFByZXZpb3VzWWVhckVuZCwgZ2V0WWVhclJhbmdlLCBnZXRNb250aFN0YXJ0LCBnZXRQcmV2aW91c01vbnRoU3RhcnQsIGdldE5leHRNb250aFN0YXJ0LCBnZXRNb250aEVuZCwgZ2V0UHJldmlvdXNNb250aEVuZCwgZ2V0TW9udGhSYW5nZSwgZ2V0RGF5U3RhcnQsIGdldERheUVuZCwgZ2V0RGF5UmFuZ2UsIH0gZnJvbSAnQHdvanRla21hai9kYXRlLXV0aWxzJztcbmltcG9ydCB7IENBTEVOREFSX1RZUEVTLCBXRUVLREFZUyB9IGZyb20gJy4vY29uc3QuanMnO1xuaW1wb3J0IHsgZm9ybWF0WWVhciBhcyBkZWZhdWx0Rm9ybWF0WWVhciB9IGZyb20gJy4vZGF0ZUZvcm1hdHRlci5qcyc7XG52YXIgU1VOREFZID0gV0VFS0RBWVNbMF07XG52YXIgRlJJREFZID0gV0VFS0RBWVNbNV07XG52YXIgU0FUVVJEQVkgPSBXRUVLREFZU1s2XTtcbi8qIFNpbXBsZSBnZXR0ZXJzIC0gZ2V0dGluZyBhIHByb3BlcnR5IG9mIGEgZ2l2ZW4gcG9pbnQgaW4gdGltZSAqL1xuLyoqXG4gKiBHZXRzIGRheSBvZiB0aGUgd2VlayBvZiBhIGdpdmVuIGRhdGUuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqIEBwYXJhbSB7Q2FsZW5kYXJUeXBlfSBbY2FsZW5kYXJUeXBlPVwiaXNvODYwMVwiXSBDYWxlbmRhciB0eXBlLlxuICogQHJldHVybnMge251bWJlcn0gRGF5IG9mIHRoZSB3ZWVrLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKGRhdGUsIGNhbGVuZGFyVHlwZSkge1xuICAgIGlmIChjYWxlbmRhclR5cGUgPT09IHZvaWQgMCkgeyBjYWxlbmRhclR5cGUgPSBDQUxFTkRBUl9UWVBFUy5JU09fODYwMTsgfVxuICAgIHZhciB3ZWVrZGF5ID0gZGF0ZS5nZXREYXkoKTtcbiAgICBzd2l0Y2ggKGNhbGVuZGFyVHlwZSkge1xuICAgICAgICBjYXNlIENBTEVOREFSX1RZUEVTLklTT184NjAxOlxuICAgICAgICAgICAgLy8gU2hpZnRzIGRheXMgb2YgdGhlIHdlZWsgc28gdGhhdCBNb25kYXkgaXMgMCwgU3VuZGF5IGlzIDZcbiAgICAgICAgICAgIHJldHVybiAod2Vla2RheSArIDYpICUgNztcbiAgICAgICAgY2FzZSBDQUxFTkRBUl9UWVBFUy5JU0xBTUlDOlxuICAgICAgICAgICAgcmV0dXJuICh3ZWVrZGF5ICsgMSkgJSA3O1xuICAgICAgICBjYXNlIENBTEVOREFSX1RZUEVTLkhFQlJFVzpcbiAgICAgICAgY2FzZSBDQUxFTkRBUl9UWVBFUy5HUkVHT1JZOlxuICAgICAgICAgICAgcmV0dXJuIHdlZWtkYXk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGNhbGVuZGFyIHR5cGUuJyk7XG4gICAgfVxufVxuLyoqXG4gKiBDZW50dXJ5XG4gKi9cbi8qKlxuICogR2V0cyB0aGUgeWVhciBvZiB0aGUgYmVnaW5uaW5nIG9mIGEgY2VudHVyeSBvZiBhIGdpdmVuIGRhdGUuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFllYXIgb2YgdGhlIGJlZ2lubmluZyBvZiBhIGNlbnR1cnkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCZWdpbk9mQ2VudHVyeVllYXIoZGF0ZSkge1xuICAgIHZhciBiZWdpbk9mQ2VudHVyeSA9IGdldENlbnR1cnlTdGFydChkYXRlKTtcbiAgICByZXR1cm4gZ2V0WWVhcihiZWdpbk9mQ2VudHVyeSk7XG59XG4vKipcbiAqIERlY2FkZVxuICovXG4vKipcbiAqIEdldHMgdGhlIHllYXIgb2YgdGhlIGJlZ2lubmluZyBvZiBhIGRlY2FkZSBvZiBhIGdpdmVuIGRhdGUuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFllYXIgb2YgdGhlIGJlZ2lubmluZyBvZiBhIGRlY2FkZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEJlZ2luT2ZEZWNhZGVZZWFyKGRhdGUpIHtcbiAgICB2YXIgYmVnaW5PZkRlY2FkZSA9IGdldERlY2FkZVN0YXJ0KGRhdGUpO1xuICAgIHJldHVybiBnZXRZZWFyKGJlZ2luT2ZEZWNhZGUpO1xufVxuLyoqXG4gKiBXZWVrXG4gKi9cbi8qKlxuICogUmV0dXJucyB0aGUgYmVnaW5uaW5nIG9mIGEgZ2l2ZW4gd2Vlay5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqIEBwYXJhbSB7Q2FsZW5kYXJUeXBlfSBbY2FsZW5kYXJUeXBlPVwiaXNvODYwMVwiXSBDYWxlbmRhciB0eXBlLlxuICogQHJldHVybnMge0RhdGV9IEJlZ2lubmluZyBvZiBhIGdpdmVuIHdlZWsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCZWdpbk9mV2VlayhkYXRlLCBjYWxlbmRhclR5cGUpIHtcbiAgICBpZiAoY2FsZW5kYXJUeXBlID09PSB2b2lkIDApIHsgY2FsZW5kYXJUeXBlID0gQ0FMRU5EQVJfVFlQRVMuSVNPXzg2MDE7IH1cbiAgICB2YXIgeWVhciA9IGdldFllYXIoZGF0ZSk7XG4gICAgdmFyIG1vbnRoSW5kZXggPSBnZXRNb250aEluZGV4KGRhdGUpO1xuICAgIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKSAtIGdldERheU9mV2VlayhkYXRlLCBjYWxlbmRhclR5cGUpO1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aEluZGV4LCBkYXkpO1xufVxuLyoqXG4gKiBHZXRzIHdlZWsgbnVtYmVyIGFjY29yZGluZyB0byBJU08gODYwMSBvciBVUyBzdGFuZGFyZC5cbiAqIEluIElTTyA4NjAxLCBBcmFiaWMgYW5kIEhlYnJldyB3ZWVrIDEgaXMgdGhlIG9uZSB3aXRoIEphbnVhcnkgNC5cbiAqIEluIFVTIGNhbGVuZGFyIHdlZWsgMSBpcyB0aGUgb25lIHdpdGggSmFudWFyeSAxLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlLlxuICogQHBhcmFtIHtDYWxlbmRhclR5cGV9IFtjYWxlbmRhclR5cGU9XCJpc284NjAxXCJdIENhbGVuZGFyIHR5cGUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBXZWVrIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtOdW1iZXIoZGF0ZSwgY2FsZW5kYXJUeXBlKSB7XG4gICAgaWYgKGNhbGVuZGFyVHlwZSA9PT0gdm9pZCAwKSB7IGNhbGVuZGFyVHlwZSA9IENBTEVOREFSX1RZUEVTLklTT184NjAxOyB9XG4gICAgdmFyIGNhbGVuZGFyVHlwZUZvcldlZWtOdW1iZXIgPSBjYWxlbmRhclR5cGUgPT09IENBTEVOREFSX1RZUEVTLkdSRUdPUlkgPyBDQUxFTkRBUl9UWVBFUy5HUkVHT1JZIDogQ0FMRU5EQVJfVFlQRVMuSVNPXzg2MDE7XG4gICAgdmFyIGJlZ2luT2ZXZWVrID0gZ2V0QmVnaW5PZldlZWsoZGF0ZSwgY2FsZW5kYXJUeXBlKTtcbiAgICB2YXIgeWVhciA9IGdldFllYXIoZGF0ZSkgKyAxO1xuICAgIHZhciBkYXlJbldlZWtPbmU7XG4gICAgdmFyIGJlZ2luT2ZGaXJzdFdlZWs7XG4gICAgLy8gTG9vayBmb3IgdGhlIGZpcnN0IHdlZWsgb25lIHRoYXQgZG9lcyBub3QgY29tZSBhZnRlciBhIGdpdmVuIGRhdGVcbiAgICBkbyB7XG4gICAgICAgIGRheUluV2Vla09uZSA9IG5ldyBEYXRlKHllYXIsIDAsIGNhbGVuZGFyVHlwZUZvcldlZWtOdW1iZXIgPT09IENBTEVOREFSX1RZUEVTLklTT184NjAxID8gNCA6IDEpO1xuICAgICAgICBiZWdpbk9mRmlyc3RXZWVrID0gZ2V0QmVnaW5PZldlZWsoZGF5SW5XZWVrT25lLCBjYWxlbmRhclR5cGUpO1xuICAgICAgICB5ZWFyIC09IDE7XG4gICAgfSB3aGlsZSAoZGF0ZSA8IGJlZ2luT2ZGaXJzdFdlZWspO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKChiZWdpbk9mV2Vlay5nZXRUaW1lKCkgLSBiZWdpbk9mRmlyc3RXZWVrLmdldFRpbWUoKSkgLyAoOC42NGU3ICogNykpICsgMTtcbn1cbi8qKlxuICogT3RoZXJzXG4gKi9cbi8qKlxuICogUmV0dXJucyB0aGUgYmVnaW5uaW5nIG9mIGEgZ2l2ZW4gcmFuZ2UuXG4gKlxuICogQHBhcmFtIHtSYW5nZVR5cGV9IHJhbmdlVHlwZSBSYW5nZSB0eXBlIChlLmcuICdkYXknKVxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gQmVnaW5uaW5nIG9mIGEgZ2l2ZW4gcmFuZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCZWdpbihyYW5nZVR5cGUsIGRhdGUpIHtcbiAgICBzd2l0Y2ggKHJhbmdlVHlwZSkge1xuICAgICAgICBjYXNlICdjZW50dXJ5JzpcbiAgICAgICAgICAgIHJldHVybiBnZXRDZW50dXJ5U3RhcnQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0RGVjYWRlU3RhcnQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgcmV0dXJuIGdldFllYXJTdGFydChkYXRlKTtcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgcmV0dXJuIGdldE1vbnRoU3RhcnQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0RGF5U3RhcnQoZGF0ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJhbmdlVHlwZTogXCIuY29uY2F0KHJhbmdlVHlwZSkpO1xuICAgIH1cbn1cbi8qKlxuICogUmV0dXJucyB0aGUgYmVnaW5uaW5nIG9mIGEgcHJldmlvdXMgZ2l2ZW4gcmFuZ2UuXG4gKlxuICogQHBhcmFtIHtSYW5nZVR5cGV9IHJhbmdlVHlwZSBSYW5nZSB0eXBlIChlLmcuICdkYXknKVxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gQmVnaW5uaW5nIG9mIGEgcHJldmlvdXMgZ2l2ZW4gcmFuZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCZWdpblByZXZpb3VzKHJhbmdlVHlwZSwgZGF0ZSkge1xuICAgIHN3aXRjaCAocmFuZ2VUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2NlbnR1cnknOlxuICAgICAgICAgICAgcmV0dXJuIGdldFByZXZpb3VzQ2VudHVyeVN0YXJ0KGRhdGUpO1xuICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgcmV0dXJuIGdldFByZXZpb3VzRGVjYWRlU3RhcnQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgcmV0dXJuIGdldFByZXZpb3VzWWVhclN0YXJ0KGRhdGUpO1xuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0UHJldmlvdXNNb250aFN0YXJ0KGRhdGUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCByYW5nZVR5cGU6IFwiLmNvbmNhdChyYW5nZVR5cGUpKTtcbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGJlZ2lubmluZyBvZiBhIG5leHQgZ2l2ZW4gcmFuZ2UuXG4gKlxuICogQHBhcmFtIHtSYW5nZVR5cGV9IHJhbmdlVHlwZSBSYW5nZSB0eXBlIChlLmcuICdkYXknKVxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gQmVnaW5uaW5nIG9mIGEgbmV4dCBnaXZlbiByYW5nZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEJlZ2luTmV4dChyYW5nZVR5cGUsIGRhdGUpIHtcbiAgICBzd2l0Y2ggKHJhbmdlVHlwZSkge1xuICAgICAgICBjYXNlICdjZW50dXJ5JzpcbiAgICAgICAgICAgIHJldHVybiBnZXROZXh0Q2VudHVyeVN0YXJ0KGRhdGUpO1xuICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgcmV0dXJuIGdldE5leHREZWNhZGVTdGFydChkYXRlKTtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TmV4dFllYXJTdGFydChkYXRlKTtcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgcmV0dXJuIGdldE5leHRNb250aFN0YXJ0KGRhdGUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCByYW5nZVR5cGU6IFwiLmNvbmNhdChyYW5nZVR5cGUpKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVnaW5QcmV2aW91czIocmFuZ2VUeXBlLCBkYXRlKSB7XG4gICAgc3dpdGNoIChyYW5nZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnZGVjYWRlJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRQcmV2aW91c0RlY2FkZVN0YXJ0KGRhdGUsIC0xMDApO1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRQcmV2aW91c1llYXJTdGFydChkYXRlLCAtMTApO1xuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0UHJldmlvdXNNb250aFN0YXJ0KGRhdGUsIC0xMik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJhbmdlVHlwZTogXCIuY29uY2F0KHJhbmdlVHlwZSkpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRCZWdpbk5leHQyKHJhbmdlVHlwZSwgZGF0ZSkge1xuICAgIHN3aXRjaCAocmFuZ2VUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TmV4dERlY2FkZVN0YXJ0KGRhdGUsIDEwMCk7XG4gICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgcmV0dXJuIGdldE5leHRZZWFyU3RhcnQoZGF0ZSwgMTApO1xuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TmV4dE1vbnRoU3RhcnQoZGF0ZSwgMTIpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCByYW5nZVR5cGU6IFwiLmNvbmNhdChyYW5nZVR5cGUpKTtcbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGVuZCBvZiBhIGdpdmVuIHJhbmdlLlxuICpcbiAqIEBwYXJhbSB7UmFuZ2VUeXBlfSByYW5nZVR5cGUgUmFuZ2UgdHlwZSAoZS5nLiAnZGF5JylcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlLlxuICogQHJldHVybnMge0RhdGV9IEVuZCBvZiBhIGdpdmVuIHJhbmdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kKHJhbmdlVHlwZSwgZGF0ZSkge1xuICAgIHN3aXRjaCAocmFuZ2VUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2NlbnR1cnknOlxuICAgICAgICAgICAgcmV0dXJuIGdldENlbnR1cnlFbmQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0RGVjYWRlRW5kKGRhdGUpO1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRZZWFyRW5kKGRhdGUpO1xuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TW9udGhFbmQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0RGF5RW5kKGRhdGUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCByYW5nZVR5cGU6IFwiLmNvbmNhdChyYW5nZVR5cGUpKTtcbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGVuZCBvZiBhIHByZXZpb3VzIGdpdmVuIHJhbmdlLlxuICpcbiAqIEBwYXJhbSB7UmFuZ2VUeXBlfSByYW5nZVR5cGUgUmFuZ2UgdHlwZSAoZS5nLiAnZGF5JylcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlLlxuICogQHJldHVybnMge0RhdGV9IEVuZCBvZiBhIHByZXZpb3VzIGdpdmVuIHJhbmdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kUHJldmlvdXMocmFuZ2VUeXBlLCBkYXRlKSB7XG4gICAgc3dpdGNoIChyYW5nZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnY2VudHVyeSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0UHJldmlvdXNDZW50dXJ5RW5kKGRhdGUpO1xuICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgcmV0dXJuIGdldFByZXZpb3VzRGVjYWRlRW5kKGRhdGUpO1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRQcmV2aW91c1llYXJFbmQoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRQcmV2aW91c01vbnRoRW5kKGRhdGUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCByYW5nZVR5cGU6IFwiLmNvbmNhdChyYW5nZVR5cGUpKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kUHJldmlvdXMyKHJhbmdlVHlwZSwgZGF0ZSkge1xuICAgIHN3aXRjaCAocmFuZ2VUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0UHJldmlvdXNEZWNhZGVFbmQoZGF0ZSwgLTEwMCk7XG4gICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgcmV0dXJuIGdldFByZXZpb3VzWWVhckVuZChkYXRlLCAtMTApO1xuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0UHJldmlvdXNNb250aEVuZChkYXRlLCAtMTIpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCByYW5nZVR5cGU6IFwiLmNvbmNhdChyYW5nZVR5cGUpKTtcbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgYmVnaW5uaW5nIGFuZCB0aGUgZW5kIG9mIGEgZ2l2ZW4gcmFuZ2UuXG4gKlxuICogQHBhcmFtIHtSYW5nZVR5cGV9IHJhbmdlVHlwZSBSYW5nZSB0eXBlIChlLmcuICdkYXknKVxuICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZVtdfSBCZWdpbm5pbmcgYW5kIGVuZCBvZiBhIGdpdmVuIHJhbmdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZ2UocmFuZ2VUeXBlLCBkYXRlKSB7XG4gICAgc3dpdGNoIChyYW5nZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnY2VudHVyeSc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q2VudHVyeVJhbmdlKGRhdGUpO1xuICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgcmV0dXJuIGdldERlY2FkZVJhbmdlKGRhdGUpO1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRZZWFyUmFuZ2UoZGF0ZSk7XG4gICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRNb250aFJhbmdlKGRhdGUpO1xuICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgcmV0dXJuIGdldERheVJhbmdlKGRhdGUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCByYW5nZVR5cGU6IFwiLmNvbmNhdChyYW5nZVR5cGUpKTtcbiAgICB9XG59XG4vKipcbiAqIENyZWF0ZXMgYSByYW5nZSBvdXQgb2YgdHdvIHZhbHVlcywgZW5zdXJpbmcgdGhleSBhcmUgaW4gb3JkZXIgYW5kIGNvdmVyaW5nIGVudGlyZSBwZXJpb2QgcmFuZ2VzLlxuICpcbiAqIEBwYXJhbSB7UmFuZ2VUeXBlfSByYW5nZVR5cGUgUmFuZ2UgdHlwZSAoZS5nLiAnZGF5JylcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZTEgRmlyc3QgZGF0ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZTIgU2Vjb25kIGRhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZVtdfSBCZWdpbm5pbmcgYW5kIGVuZCBvZiBhIGdpdmVuIHJhbmdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVSYW5nZShyYW5nZVR5cGUsIGRhdGUxLCBkYXRlMikge1xuICAgIHZhciByYXdOZXh0VmFsdWUgPSBbZGF0ZTEsIGRhdGUyXS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmdldFRpbWUoKSAtIGIuZ2V0VGltZSgpOyB9KTtcbiAgICByZXR1cm4gW2dldEJlZ2luKHJhbmdlVHlwZSwgcmF3TmV4dFZhbHVlWzBdKSwgZ2V0RW5kKHJhbmdlVHlwZSwgcmF3TmV4dFZhbHVlWzFdKV07XG59XG5mdW5jdGlvbiB0b1llYXJMYWJlbChsb2NhbGUsIGZvcm1hdFllYXIsIGRhdGVzKSB7XG4gICAgcmV0dXJuIGRhdGVzLm1hcChmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gKGZvcm1hdFllYXIgfHwgZGVmYXVsdEZvcm1hdFllYXIpKGxvY2FsZSwgZGF0ZSk7IH0pLmpvaW4oJyDigJMgJyk7XG59XG4vKipcbiAqIEBjYWxsYmFjayBGb3JtYXRZZWFyXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlIExvY2FsZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlLlxuICogQHJldHVybnMge3N0cmluZ30gRm9ybWF0dGVkIHllYXIuXG4gKi9cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyBsYWJlbGxpbmcgYSBjZW50dXJ5IG9mIGEgZ2l2ZW4gZGF0ZS5cbiAqIEZvciBleGFtcGxlLCBmb3IgMjAxNyBpdCB3aWxsIHJldHVybiAyMDAxLTIxMDAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZSBMb2NhbGUuXG4gKiBAcGFyYW0ge0Zvcm1hdFllYXJ9IGZvcm1hdFllYXIgRnVuY3Rpb24gdG8gZm9ybWF0IGEgeWVhci5cbiAqIEBwYXJhbSB7RGF0ZXxzdHJpbmd8bnVtYmVyfSBkYXRlIERhdGUgb3IgYSB5ZWFyIGFzIGEgc3RyaW5nIG9yIGFzIGEgbnVtYmVyLlxuICogQHJldHVybnMge3N0cmluZ30gU3RyaW5nIGxhYmVsbGluZyBhIGNlbnR1cnkgb2YgYSBnaXZlbiBkYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2VudHVyeUxhYmVsKGxvY2FsZSwgZm9ybWF0WWVhciwgZGF0ZSkge1xuICAgIHJldHVybiB0b1llYXJMYWJlbChsb2NhbGUsIGZvcm1hdFllYXIsIGdldENlbnR1cnlSYW5nZShkYXRlKSk7XG59XG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgbGFiZWxsaW5nIGEgZGVjYWRlIG9mIGEgZ2l2ZW4gZGF0ZS5cbiAqIEZvciBleGFtcGxlLCBmb3IgMjAxNyBpdCB3aWxsIHJldHVybiAyMDExLTIwMjAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZSBMb2NhbGUuXG4gKiBAcGFyYW0ge0Zvcm1hdFllYXJ9IGZvcm1hdFllYXIgRnVuY3Rpb24gdG8gZm9ybWF0IGEgeWVhci5cbiAqIEBwYXJhbSB7RGF0ZXxzdHJpbmd8bnVtYmVyfSBkYXRlIERhdGUgb3IgYSB5ZWFyIGFzIGEgc3RyaW5nIG9yIGFzIGEgbnVtYmVyLlxuICogQHJldHVybnMge3N0cmluZ30gU3RyaW5nIGxhYmVsbGluZyBhIGRlY2FkZSBvZiBhIGdpdmVuIGRhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWNhZGVMYWJlbChsb2NhbGUsIGZvcm1hdFllYXIsIGRhdGUpIHtcbiAgICByZXR1cm4gdG9ZZWFyTGFiZWwobG9jYWxlLCBmb3JtYXRZZWFyLCBnZXREZWNhZGVSYW5nZShkYXRlKSk7XG59XG4vKipcbiAqIFJldHVybnMgYSBib29sZWFuIGRldGVybWluaW5nIHdoZXRoZXIgYSBnaXZlbiBkYXRlIGlzIHRoZSBjdXJyZW50IGRheSBvZiB0aGUgd2Vlay5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIGEgZ2l2ZW4gZGF0ZSBpcyB0aGUgY3VycmVudCBkYXkgb2YgdGhlIHdlZWsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0N1cnJlbnREYXlPZldlZWsoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERheSgpID09PSBuZXcgRGF0ZSgpLmdldERheSgpO1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgYm9vbGVhbiBkZXRlcm1pbmluZyB3aGV0aGVyIGEgZ2l2ZW4gZGF0ZSBpcyBhIHdlZWtlbmQgZGF5LlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlLlxuICogQHBhcmFtIHtDYWxlbmRhclR5cGV9IFtjYWxlbmRhclR5cGU9XCJpc284NjAxXCJdIENhbGVuZGFyIHR5cGUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBhIGdpdmVuIGRhdGUgaXMgYSB3ZWVrZW5kIGRheS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzV2Vla2VuZChkYXRlLCBjYWxlbmRhclR5cGUpIHtcbiAgICBpZiAoY2FsZW5kYXJUeXBlID09PSB2b2lkIDApIHsgY2FsZW5kYXJUeXBlID0gQ0FMRU5EQVJfVFlQRVMuSVNPXzg2MDE7IH1cbiAgICB2YXIgd2Vla2RheSA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgc3dpdGNoIChjYWxlbmRhclR5cGUpIHtcbiAgICAgICAgY2FzZSBDQUxFTkRBUl9UWVBFUy5JU0xBTUlDOlxuICAgICAgICBjYXNlIENBTEVOREFSX1RZUEVTLkhFQlJFVzpcbiAgICAgICAgICAgIHJldHVybiB3ZWVrZGF5ID09PSBGUklEQVkgfHwgd2Vla2RheSA9PT0gU0FUVVJEQVk7XG4gICAgICAgIGNhc2UgQ0FMRU5EQVJfVFlQRVMuSVNPXzg2MDE6XG4gICAgICAgIGNhc2UgQ0FMRU5EQVJfVFlQRVMuR1JFR09SWTpcbiAgICAgICAgICAgIHJldHVybiB3ZWVrZGF5ID09PSBTQVRVUkRBWSB8fCB3ZWVrZGF5ID09PSBTVU5EQVk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGNhbGVuZGFyIHR5cGUuJyk7XG4gICAgfVxufVxuIiwiJ3VzZSBjbGllbnQnO1xuaW1wb3J0IHsganN4IGFzIF9qc3gsIEZyYWdtZW50IGFzIF9GcmFnbWVudCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgZ2V0VXNlckxvY2FsZSB9IGZyb20gJ2dldC11c2VyLWxvY2FsZSc7XG5pbXBvcnQgeyBnZXRDZW50dXJ5TGFiZWwsIGdldERlY2FkZUxhYmVsLCBnZXRCZWdpbk5leHQsIGdldEJlZ2luTmV4dDIsIGdldEJlZ2luUHJldmlvdXMsIGdldEJlZ2luUHJldmlvdXMyLCBnZXRFbmRQcmV2aW91cywgZ2V0RW5kUHJldmlvdXMyLCB9IGZyb20gJy4uL3NoYXJlZC9kYXRlcy5qcyc7XG5pbXBvcnQgeyBmb3JtYXRNb250aFllYXIgYXMgZGVmYXVsdEZvcm1hdE1vbnRoWWVhciwgZm9ybWF0WWVhciBhcyBkZWZhdWx0Rm9ybWF0WWVhciwgfSBmcm9tICcuLi9zaGFyZWQvZGF0ZUZvcm1hdHRlci5qcyc7XG52YXIgY2xhc3NOYW1lID0gJ3JlYWN0LWNhbGVuZGFyX19uYXZpZ2F0aW9uJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdmlnYXRpb24oX2EpIHtcbiAgICB2YXIgYWN0aXZlU3RhcnREYXRlID0gX2EuYWN0aXZlU3RhcnREYXRlLCBkcmlsbFVwID0gX2EuZHJpbGxVcCwgX2IgPSBfYS5mb3JtYXRNb250aFllYXIsIGZvcm1hdE1vbnRoWWVhciA9IF9iID09PSB2b2lkIDAgPyBkZWZhdWx0Rm9ybWF0TW9udGhZZWFyIDogX2IsIF9jID0gX2EuZm9ybWF0WWVhciwgZm9ybWF0WWVhciA9IF9jID09PSB2b2lkIDAgPyBkZWZhdWx0Rm9ybWF0WWVhciA6IF9jLCBsb2NhbGUgPSBfYS5sb2NhbGUsIG1heERhdGUgPSBfYS5tYXhEYXRlLCBtaW5EYXRlID0gX2EubWluRGF0ZSwgX2QgPSBfYS5uYXZpZ2F0aW9uQXJpYUxhYmVsLCBuYXZpZ2F0aW9uQXJpYUxhYmVsID0gX2QgPT09IHZvaWQgMCA/ICcnIDogX2QsIG5hdmlnYXRpb25BcmlhTGl2ZSA9IF9hLm5hdmlnYXRpb25BcmlhTGl2ZSwgbmF2aWdhdGlvbkxhYmVsID0gX2EubmF2aWdhdGlvbkxhYmVsLCBfZSA9IF9hLm5leHQyQXJpYUxhYmVsLCBuZXh0MkFyaWFMYWJlbCA9IF9lID09PSB2b2lkIDAgPyAnJyA6IF9lLCBfZiA9IF9hLm5leHQyTGFiZWwsIG5leHQyTGFiZWwgPSBfZiA9PT0gdm9pZCAwID8gJ8K7JyA6IF9mLCBfZyA9IF9hLm5leHRBcmlhTGFiZWwsIG5leHRBcmlhTGFiZWwgPSBfZyA9PT0gdm9pZCAwID8gJycgOiBfZywgX2ggPSBfYS5uZXh0TGFiZWwsIG5leHRMYWJlbCA9IF9oID09PSB2b2lkIDAgPyAn4oC6JyA6IF9oLCBfaiA9IF9hLnByZXYyQXJpYUxhYmVsLCBwcmV2MkFyaWFMYWJlbCA9IF9qID09PSB2b2lkIDAgPyAnJyA6IF9qLCBfayA9IF9hLnByZXYyTGFiZWwsIHByZXYyTGFiZWwgPSBfayA9PT0gdm9pZCAwID8gJ8KrJyA6IF9rLCBfbCA9IF9hLnByZXZBcmlhTGFiZWwsIHByZXZBcmlhTGFiZWwgPSBfbCA9PT0gdm9pZCAwID8gJycgOiBfbCwgX20gPSBfYS5wcmV2TGFiZWwsIHByZXZMYWJlbCA9IF9tID09PSB2b2lkIDAgPyAn4oC5JyA6IF9tLCBzZXRBY3RpdmVTdGFydERhdGUgPSBfYS5zZXRBY3RpdmVTdGFydERhdGUsIHNob3dEb3VibGVWaWV3ID0gX2Euc2hvd0RvdWJsZVZpZXcsIHZpZXcgPSBfYS52aWV3LCB2aWV3cyA9IF9hLnZpZXdzO1xuICAgIHZhciBkcmlsbFVwQXZhaWxhYmxlID0gdmlld3MuaW5kZXhPZih2aWV3KSA+IDA7XG4gICAgdmFyIHNob3VsZFNob3dQcmV2TmV4dDJCdXR0b25zID0gdmlldyAhPT0gJ2NlbnR1cnknO1xuICAgIHZhciBwcmV2aW91c0FjdGl2ZVN0YXJ0RGF0ZSA9IGdldEJlZ2luUHJldmlvdXModmlldywgYWN0aXZlU3RhcnREYXRlKTtcbiAgICB2YXIgcHJldmlvdXNBY3RpdmVTdGFydERhdGUyID0gc2hvdWxkU2hvd1ByZXZOZXh0MkJ1dHRvbnNcbiAgICAgICAgPyBnZXRCZWdpblByZXZpb3VzMih2aWV3LCBhY3RpdmVTdGFydERhdGUpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIHZhciBuZXh0QWN0aXZlU3RhcnREYXRlID0gZ2V0QmVnaW5OZXh0KHZpZXcsIGFjdGl2ZVN0YXJ0RGF0ZSk7XG4gICAgdmFyIG5leHRBY3RpdmVTdGFydERhdGUyID0gc2hvdWxkU2hvd1ByZXZOZXh0MkJ1dHRvbnNcbiAgICAgICAgPyBnZXRCZWdpbk5leHQyKHZpZXcsIGFjdGl2ZVN0YXJ0RGF0ZSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHByZXZCdXR0b25EaXNhYmxlZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChwcmV2aW91c0FjdGl2ZVN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZpb3VzQWN0aXZlRW5kRGF0ZSA9IGdldEVuZFByZXZpb3VzKHZpZXcsIGFjdGl2ZVN0YXJ0RGF0ZSk7XG4gICAgICAgIHJldHVybiBtaW5EYXRlICYmIG1pbkRhdGUgPj0gcHJldmlvdXNBY3RpdmVFbmREYXRlO1xuICAgIH0pKCk7XG4gICAgdmFyIHByZXYyQnV0dG9uRGlzYWJsZWQgPSBzaG91bGRTaG93UHJldk5leHQyQnV0dG9ucyAmJlxuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzQWN0aXZlU3RhcnREYXRlMi5nZXRGdWxsWWVhcigpIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByZXZpb3VzQWN0aXZlRW5kRGF0ZSA9IGdldEVuZFByZXZpb3VzMih2aWV3LCBhY3RpdmVTdGFydERhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIG1pbkRhdGUgJiYgbWluRGF0ZSA+PSBwcmV2aW91c0FjdGl2ZUVuZERhdGU7XG4gICAgICAgIH0pKCk7XG4gICAgdmFyIG5leHRCdXR0b25EaXNhYmxlZCA9IG1heERhdGUgJiYgbWF4RGF0ZSA8IG5leHRBY3RpdmVTdGFydERhdGU7XG4gICAgdmFyIG5leHQyQnV0dG9uRGlzYWJsZWQgPSBzaG91bGRTaG93UHJldk5leHQyQnV0dG9ucyAmJiBtYXhEYXRlICYmIG1heERhdGUgPCBuZXh0QWN0aXZlU3RhcnREYXRlMjtcbiAgICBmdW5jdGlvbiBvbkNsaWNrUHJldmlvdXMoKSB7XG4gICAgICAgIHNldEFjdGl2ZVN0YXJ0RGF0ZShwcmV2aW91c0FjdGl2ZVN0YXJ0RGF0ZSwgJ3ByZXYnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25DbGlja1ByZXZpb3VzMigpIHtcbiAgICAgICAgc2V0QWN0aXZlU3RhcnREYXRlKHByZXZpb3VzQWN0aXZlU3RhcnREYXRlMiwgJ3ByZXYyJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uQ2xpY2tOZXh0KCkge1xuICAgICAgICBzZXRBY3RpdmVTdGFydERhdGUobmV4dEFjdGl2ZVN0YXJ0RGF0ZSwgJ25leHQnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25DbGlja05leHQyKCkge1xuICAgICAgICBzZXRBY3RpdmVTdGFydERhdGUobmV4dEFjdGl2ZVN0YXJ0RGF0ZTIsICduZXh0MicpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJMYWJlbChkYXRlKSB7XG4gICAgICAgIHZhciBsYWJlbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHZpZXcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjZW50dXJ5JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldENlbnR1cnlMYWJlbChsb2NhbGUsIGZvcm1hdFllYXIsIGRhdGUpO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXREZWNhZGVMYWJlbChsb2NhbGUsIGZvcm1hdFllYXIsIGRhdGUpO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0WWVhcihsb2NhbGUsIGRhdGUpO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE1vbnRoWWVhcihsb2NhbGUsIGRhdGUpO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmlldzogXCIuY29uY2F0KHZpZXcsIFwiLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0aW9uTGFiZWxcbiAgICAgICAgICAgID8gbmF2aWdhdGlvbkxhYmVsKHtcbiAgICAgICAgICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgICAgICBsb2NhbGU6IGxvY2FsZSB8fCBnZXRVc2VyTG9jYWxlKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHZpZXc6IHZpZXcsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBsYWJlbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyQnV0dG9uKCkge1xuICAgICAgICB2YXIgbGFiZWxDbGFzc05hbWUgPSBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX19sYWJlbFwiKTtcbiAgICAgICAgcmV0dXJuIChfanN4cyhcImJ1dHRvblwiLCB7IFwiYXJpYS1sYWJlbFwiOiBuYXZpZ2F0aW9uQXJpYUxhYmVsLCBcImFyaWEtbGl2ZVwiOiBuYXZpZ2F0aW9uQXJpYUxpdmUsIGNsYXNzTmFtZTogbGFiZWxDbGFzc05hbWUsIGRpc2FibGVkOiAhZHJpbGxVcEF2YWlsYWJsZSwgb25DbGljazogZHJpbGxVcCwgc3R5bGU6IHsgZmxleEdyb3c6IDEgfSwgdHlwZTogXCJidXR0b25cIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJcIi5jb25jYXQobGFiZWxDbGFzc05hbWUsIFwiX19sYWJlbFRleHQgXCIpLmNvbmNhdChsYWJlbENsYXNzTmFtZSwgXCJfX2xhYmVsVGV4dC0tZnJvbVwiKSwgY2hpbGRyZW46IHJlbmRlckxhYmVsKGFjdGl2ZVN0YXJ0RGF0ZSkgfSksIHNob3dEb3VibGVWaWV3ID8gKF9qc3hzKF9GcmFnbWVudCwgeyBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcIlwiLmNvbmNhdChsYWJlbENsYXNzTmFtZSwgXCJfX2RpdmlkZXJcIiksIGNoaWxkcmVuOiBcIiBcXHUyMDEzIFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJcIi5jb25jYXQobGFiZWxDbGFzc05hbWUsIFwiX19sYWJlbFRleHQgXCIpLmNvbmNhdChsYWJlbENsYXNzTmFtZSwgXCJfX2xhYmVsVGV4dC0tdG9cIiksIGNoaWxkcmVuOiByZW5kZXJMYWJlbChuZXh0QWN0aXZlU3RhcnREYXRlKSB9KV0gfSkpIDogbnVsbF0gfSkpO1xuICAgIH1cbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIGNoaWxkcmVuOiBbcHJldjJMYWJlbCAhPT0gbnVsbCAmJiBzaG91bGRTaG93UHJldk5leHQyQnV0dG9ucyA/IChfanN4KFwiYnV0dG9uXCIsIHsgXCJhcmlhLWxhYmVsXCI6IHByZXYyQXJpYUxhYmVsLCBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJfX2Fycm93IFwiKS5jb25jYXQoY2xhc3NOYW1lLCBcIl9fcHJldjItYnV0dG9uXCIpLCBkaXNhYmxlZDogcHJldjJCdXR0b25EaXNhYmxlZCwgb25DbGljazogb25DbGlja1ByZXZpb3VzMiwgdHlwZTogXCJidXR0b25cIiwgY2hpbGRyZW46IHByZXYyTGFiZWwgfSkpIDogbnVsbCwgcHJldkxhYmVsICE9PSBudWxsICYmIChfanN4KFwiYnV0dG9uXCIsIHsgXCJhcmlhLWxhYmVsXCI6IHByZXZBcmlhTGFiZWwsIGNsYXNzTmFtZTogXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIl9fYXJyb3cgXCIpLmNvbmNhdChjbGFzc05hbWUsIFwiX19wcmV2LWJ1dHRvblwiKSwgZGlzYWJsZWQ6IHByZXZCdXR0b25EaXNhYmxlZCwgb25DbGljazogb25DbGlja1ByZXZpb3VzLCB0eXBlOiBcImJ1dHRvblwiLCBjaGlsZHJlbjogcHJldkxhYmVsIH0pKSwgcmVuZGVyQnV0dG9uKCksIG5leHRMYWJlbCAhPT0gbnVsbCAmJiAoX2pzeChcImJ1dHRvblwiLCB7IFwiYXJpYS1sYWJlbFwiOiBuZXh0QXJpYUxhYmVsLCBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJfX2Fycm93IFwiKS5jb25jYXQoY2xhc3NOYW1lLCBcIl9fbmV4dC1idXR0b25cIiksIGRpc2FibGVkOiBuZXh0QnV0dG9uRGlzYWJsZWQsIG9uQ2xpY2s6IG9uQ2xpY2tOZXh0LCB0eXBlOiBcImJ1dHRvblwiLCBjaGlsZHJlbjogbmV4dExhYmVsIH0pKSwgbmV4dDJMYWJlbCAhPT0gbnVsbCAmJiBzaG91bGRTaG93UHJldk5leHQyQnV0dG9ucyA/IChfanN4KFwiYnV0dG9uXCIsIHsgXCJhcmlhLWxhYmVsXCI6IG5leHQyQXJpYUxhYmVsLCBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJfX2Fycm93IFwiKS5jb25jYXQoY2xhc3NOYW1lLCBcIl9fbmV4dDItYnV0dG9uXCIpLCBkaXNhYmxlZDogbmV4dDJCdXR0b25EaXNhYmxlZCwgb25DbGljazogb25DbGlja05leHQyLCB0eXBlOiBcImJ1dHRvblwiLCBjaGlsZHJlbjogbmV4dDJMYWJlbCB9KSkgOiBudWxsXSB9KSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IENoaWxkcmVuLCBjbG9uZUVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5mdW5jdGlvbiB0b1BlcmNlbnQobnVtKSB7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KG51bSwgXCIlXCIpO1xufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRmxleChfYSkge1xuICAgIHZhciBjaGlsZHJlbiA9IF9hLmNoaWxkcmVuLCBjbGFzc05hbWUgPSBfYS5jbGFzc05hbWUsIGNvdW50ID0gX2EuY291bnQsIGRpcmVjdGlvbiA9IF9hLmRpcmVjdGlvbiwgb2Zmc2V0ID0gX2Eub2Zmc2V0LCBzdHlsZSA9IF9hLnN0eWxlLCB3cmFwID0gX2Eud3JhcCwgb3RoZXJQcm9wcyA9IF9fcmVzdChfYSwgW1wiY2hpbGRyZW5cIiwgXCJjbGFzc05hbWVcIiwgXCJjb3VudFwiLCBcImRpcmVjdGlvblwiLCBcIm9mZnNldFwiLCBcInN0eWxlXCIsIFwid3JhcFwiXSk7XG4gICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIF9fYXNzaWduKHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIHN0eWxlOiBfX2Fzc2lnbih7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogZGlyZWN0aW9uLCBmbGV4V3JhcDogd3JhcCA/ICd3cmFwJyA6ICdub3dyYXAnIH0sIHN0eWxlKSB9LCBvdGhlclByb3BzLCB7IGNoaWxkcmVuOiBDaGlsZHJlbi5tYXAoY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBtYXJnaW5JbmxpbmVTdGFydCA9IG9mZnNldCAmJiBpbmRleCA9PT0gMCA/IHRvUGVyY2VudCgoMTAwICogb2Zmc2V0KSAvIGNvdW50KSA6IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gY2xvbmVFbGVtZW50KGNoaWxkLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgY2hpbGQucHJvcHMpLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGZsZXhCYXNpczogdG9QZXJjZW50KDEwMCAvIGNvdW50KSxcbiAgICAgICAgICAgICAgICAgICAgZmxleFNocmluazogMCxcbiAgICAgICAgICAgICAgICAgICAgZmxleEdyb3c6IDAsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogbWFyZ2luSW5saW5lU3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbklubGluZVN0YXJ0OiBtYXJnaW5JbmxpbmVTdGFydCxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luSW5saW5lRW5kOiAwLFxuICAgICAgICAgICAgICAgIH0gfSkpO1xuICAgICAgICB9KSB9KSkpO1xufVxuIiwiaW1wb3J0IHsgZ2V0UmFuZ2UgfSBmcm9tICcuL2RhdGVzLmpzJztcbi8qKlxuICogUmV0dXJucyBhIHZhbHVlIG5vIHNtYWxsZXIgdGhhbiBtaW4gYW5kIG5vIGxhcmdlciB0aGFuIG1heC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IHZhbHVlIFZhbHVlIHRvIHJldHVybi5cbiAqIEBwYXJhbSB7RGF0ZX0gbWluIE1pbmltdW0gcmV0dXJuIHZhbHVlLlxuICogQHBhcmFtIHtEYXRlfSBtYXggTWF4aW11bSByZXR1cm4gdmFsdWUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVmFsdWUgYmV0d2VlbiBtaW4gYW5kIG1heC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJldHdlZW4odmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgaWYgKG1pbiAmJiBtaW4gPiB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbWluO1xuICAgIH1cbiAgICBpZiAobWF4ICYmIG1heCA8IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbHVlV2l0aGluUmFuZ2UodmFsdWUsIHJhbmdlKSB7XG4gICAgcmV0dXJuIHJhbmdlWzBdIDw9IHZhbHVlICYmIHJhbmdlWzFdID49IHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUmFuZ2VXaXRoaW5SYW5nZShncmVhdGVyUmFuZ2UsIHNtYWxsZXJSYW5nZSkge1xuICAgIHJldHVybiBncmVhdGVyUmFuZ2VbMF0gPD0gc21hbGxlclJhbmdlWzBdICYmIGdyZWF0ZXJSYW5nZVsxXSA+PSBzbWFsbGVyUmFuZ2VbMV07XG59XG5leHBvcnQgZnVuY3Rpb24gZG9SYW5nZXNPdmVybGFwKHJhbmdlMSwgcmFuZ2UyKSB7XG4gICAgcmV0dXJuIGlzVmFsdWVXaXRoaW5SYW5nZShyYW5nZTFbMF0sIHJhbmdlMikgfHwgaXNWYWx1ZVdpdGhpblJhbmdlKHJhbmdlMVsxXSwgcmFuZ2UyKTtcbn1cbmZ1bmN0aW9uIGdldFJhbmdlQ2xhc3NOYW1lcyh2YWx1ZVJhbmdlLCBkYXRlUmFuZ2UsIGJhc2VDbGFzc05hbWUpIHtcbiAgICB2YXIgaXNSYW5nZSA9IGRvUmFuZ2VzT3ZlcmxhcChkYXRlUmFuZ2UsIHZhbHVlUmFuZ2UpO1xuICAgIHZhciBjbGFzc2VzID0gW107XG4gICAgaWYgKGlzUmFuZ2UpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGJhc2VDbGFzc05hbWUpO1xuICAgICAgICB2YXIgaXNSYW5nZVN0YXJ0ID0gaXNWYWx1ZVdpdGhpblJhbmdlKHZhbHVlUmFuZ2VbMF0sIGRhdGVSYW5nZSk7XG4gICAgICAgIHZhciBpc1JhbmdlRW5kID0gaXNWYWx1ZVdpdGhpblJhbmdlKHZhbHVlUmFuZ2VbMV0sIGRhdGVSYW5nZSk7XG4gICAgICAgIGlmIChpc1JhbmdlU3RhcnQpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIlN0YXJ0XCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSYW5nZUVuZCkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwiXCIuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiRW5kXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSYW5nZVN0YXJ0ICYmIGlzUmFuZ2VFbmQpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIkJvdGhFbmRzXCIpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2xhc3Nlcztcbn1cbmZ1bmN0aW9uIGlzQ29tcGxldGVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWVbMF0gIT09IG51bGwgJiYgdmFsdWVbMV0gIT09IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaWxlQ2xhc3NlcyhhcmdzKSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyByZXF1aXJlZCcpO1xuICAgIH1cbiAgICB2YXIgdmFsdWUgPSBhcmdzLnZhbHVlLCBkYXRlID0gYXJncy5kYXRlLCBob3ZlciA9IGFyZ3MuaG92ZXI7XG4gICAgdmFyIGNsYXNzTmFtZSA9ICdyZWFjdC1jYWxlbmRhcl9fdGlsZSc7XG4gICAgdmFyIGNsYXNzZXMgPSBbY2xhc3NOYW1lXTtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgfVxuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBkYXRlUmFuZ2UgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGVUeXBlID0gYXJncy5kYXRlVHlwZTtcbiAgICAgICAgaWYgKCFkYXRlVHlwZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRlVHlwZSBpcyByZXF1aXJlZCB3aGVuIGRhdGUgaXMgbm90IGFuIGFycmF5IG9mIHR3byBkYXRlcycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnZXRSYW5nZShkYXRlVHlwZSwgZGF0ZSk7XG4gICAgfSkoKTtcbiAgICBpZiAoaXNWYWx1ZVdpdGhpblJhbmdlKG5vdywgZGF0ZVJhbmdlKSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIi0tbm93XCIpKTtcbiAgICB9XG4gICAgaWYgKCF2YWx1ZSB8fCAhaXNDb21wbGV0ZVZhbHVlKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gY2xhc3NlcztcbiAgICB9XG4gICAgdmFyIHZhbHVlUmFuZ2UgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmFsdWVUeXBlID0gYXJncy52YWx1ZVR5cGU7XG4gICAgICAgIGlmICghdmFsdWVUeXBlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZhbHVlVHlwZSBpcyByZXF1aXJlZCB3aGVuIHZhbHVlIGlzIG5vdCBhbiBhcnJheSBvZiB0d28gZGF0ZXMnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2V0UmFuZ2UodmFsdWVUeXBlLCB2YWx1ZSk7XG4gICAgfSkoKTtcbiAgICBpZiAoaXNSYW5nZVdpdGhpblJhbmdlKHZhbHVlUmFuZ2UsIGRhdGVSYW5nZSkpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCItLWFjdGl2ZVwiKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRvUmFuZ2VzT3ZlcmxhcCh2YWx1ZVJhbmdlLCBkYXRlUmFuZ2UpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiLS1oYXNBY3RpdmVcIikpO1xuICAgIH1cbiAgICB2YXIgdmFsdWVSYW5nZUNsYXNzTmFtZXMgPSBnZXRSYW5nZUNsYXNzTmFtZXModmFsdWVSYW5nZSwgZGF0ZVJhbmdlLCBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiLS1yYW5nZVwiKSk7XG4gICAgY2xhc3Nlcy5wdXNoLmFwcGx5KGNsYXNzZXMsIHZhbHVlUmFuZ2VDbGFzc05hbWVzKTtcbiAgICB2YXIgdmFsdWVBcnJheSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgIGlmIChob3ZlciAmJiB2YWx1ZUFycmF5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB2YXIgaG92ZXJSYW5nZSA9IGhvdmVyID4gdmFsdWVSYW5nZVswXSA/IFt2YWx1ZVJhbmdlWzBdLCBob3Zlcl0gOiBbaG92ZXIsIHZhbHVlUmFuZ2VbMF1dO1xuICAgICAgICB2YXIgaG92ZXJSYW5nZUNsYXNzTmFtZXMgPSBnZXRSYW5nZUNsYXNzTmFtZXMoaG92ZXJSYW5nZSwgZGF0ZVJhbmdlLCBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiLS1ob3ZlclwiKSk7XG4gICAgICAgIGNsYXNzZXMucHVzaC5hcHBseShjbGFzc2VzLCBob3ZlclJhbmdlQ2xhc3NOYW1lcyk7XG4gICAgfVxuICAgIHJldHVybiBjbGFzc2VzO1xufVxuIiwiaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBGbGV4IGZyb20gJy4vRmxleC5qcyc7XG5pbXBvcnQgeyBnZXRUaWxlQ2xhc3NlcyB9IGZyb20gJy4vc2hhcmVkL3V0aWxzLmpzJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRpbGVHcm91cChfYSkge1xuICAgIHZhciBjbGFzc05hbWUgPSBfYS5jbGFzc05hbWUsIF9iID0gX2EuY291bnQsIGNvdW50ID0gX2IgPT09IHZvaWQgMCA/IDMgOiBfYiwgZGF0ZVRyYW5zZm9ybSA9IF9hLmRhdGVUcmFuc2Zvcm0sIGRhdGVUeXBlID0gX2EuZGF0ZVR5cGUsIGVuZCA9IF9hLmVuZCwgaG92ZXIgPSBfYS5ob3Zlciwgb2Zmc2V0ID0gX2Eub2Zmc2V0LCByZW5kZXJUaWxlID0gX2EucmVuZGVyVGlsZSwgc3RhcnQgPSBfYS5zdGFydCwgX2MgPSBfYS5zdGVwLCBzdGVwID0gX2MgPT09IHZvaWQgMCA/IDEgOiBfYywgdmFsdWUgPSBfYS52YWx1ZSwgdmFsdWVUeXBlID0gX2EudmFsdWVUeXBlO1xuICAgIHZhciB0aWxlcyA9IFtdO1xuICAgIGZvciAodmFyIHBvaW50ID0gc3RhcnQ7IHBvaW50IDw9IGVuZDsgcG9pbnQgKz0gc3RlcCkge1xuICAgICAgICB2YXIgZGF0ZSA9IGRhdGVUcmFuc2Zvcm0ocG9pbnQpO1xuICAgICAgICB0aWxlcy5wdXNoKHJlbmRlclRpbGUoe1xuICAgICAgICAgICAgY2xhc3NlczogZ2V0VGlsZUNsYXNzZXMoe1xuICAgICAgICAgICAgICAgIGRhdGU6IGRhdGUsXG4gICAgICAgICAgICAgICAgZGF0ZVR5cGU6IGRhdGVUeXBlLFxuICAgICAgICAgICAgICAgIGhvdmVyOiBob3ZlcixcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgdmFsdWVUeXBlOiB2YWx1ZVR5cGUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGRhdGU6IGRhdGUsXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIChfanN4KEZsZXgsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIGNvdW50OiBjb3VudCwgb2Zmc2V0OiBvZmZzZXQsIHdyYXA6IHRydWUsIGNoaWxkcmVuOiB0aWxlcyB9KSk7XG59XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGlsZShwcm9wcykge1xuICAgIHZhciBhY3RpdmVTdGFydERhdGUgPSBwcm9wcy5hY3RpdmVTdGFydERhdGUsIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4sIGNsYXNzZXMgPSBwcm9wcy5jbGFzc2VzLCBkYXRlID0gcHJvcHMuZGF0ZSwgZm9ybWF0QWJiciA9IHByb3BzLmZvcm1hdEFiYnIsIGxvY2FsZSA9IHByb3BzLmxvY2FsZSwgbWF4RGF0ZSA9IHByb3BzLm1heERhdGUsIG1heERhdGVUcmFuc2Zvcm0gPSBwcm9wcy5tYXhEYXRlVHJhbnNmb3JtLCBtaW5EYXRlID0gcHJvcHMubWluRGF0ZSwgbWluRGF0ZVRyYW5zZm9ybSA9IHByb3BzLm1pbkRhdGVUcmFuc2Zvcm0sIG9uQ2xpY2sgPSBwcm9wcy5vbkNsaWNrLCBvbk1vdXNlT3ZlciA9IHByb3BzLm9uTW91c2VPdmVyLCBzdHlsZSA9IHByb3BzLnN0eWxlLCB0aWxlQ2xhc3NOYW1lUHJvcHMgPSBwcm9wcy50aWxlQ2xhc3NOYW1lLCB0aWxlQ29udGVudFByb3BzID0gcHJvcHMudGlsZUNvbnRlbnQsIHRpbGVEaXNhYmxlZCA9IHByb3BzLnRpbGVEaXNhYmxlZCwgdmlldyA9IHByb3BzLnZpZXc7XG4gICAgdmFyIHRpbGVDbGFzc05hbWUgPSB1c2VNZW1vKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSB7IGFjdGl2ZVN0YXJ0RGF0ZTogYWN0aXZlU3RhcnREYXRlLCBkYXRlOiBkYXRlLCB2aWV3OiB2aWV3IH07XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGlsZUNsYXNzTmFtZVByb3BzID09PSAnZnVuY3Rpb24nID8gdGlsZUNsYXNzTmFtZVByb3BzKGFyZ3MpIDogdGlsZUNsYXNzTmFtZVByb3BzO1xuICAgIH0sIFthY3RpdmVTdGFydERhdGUsIGRhdGUsIHRpbGVDbGFzc05hbWVQcm9wcywgdmlld10pO1xuICAgIHZhciB0aWxlQ29udGVudCA9IHVzZU1lbW8oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IHsgYWN0aXZlU3RhcnREYXRlOiBhY3RpdmVTdGFydERhdGUsIGRhdGU6IGRhdGUsIHZpZXc6IHZpZXcgfTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aWxlQ29udGVudFByb3BzID09PSAnZnVuY3Rpb24nID8gdGlsZUNvbnRlbnRQcm9wcyhhcmdzKSA6IHRpbGVDb250ZW50UHJvcHM7XG4gICAgfSwgW2FjdGl2ZVN0YXJ0RGF0ZSwgZGF0ZSwgdGlsZUNvbnRlbnRQcm9wcywgdmlld10pO1xuICAgIHJldHVybiAoX2pzeHMoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IGNsc3goY2xhc3NlcywgdGlsZUNsYXNzTmFtZSksIGRpc2FibGVkOiAobWluRGF0ZSAmJiBtaW5EYXRlVHJhbnNmb3JtKG1pbkRhdGUpID4gZGF0ZSkgfHxcbiAgICAgICAgICAgIChtYXhEYXRlICYmIG1heERhdGVUcmFuc2Zvcm0obWF4RGF0ZSkgPCBkYXRlKSB8fFxuICAgICAgICAgICAgKHRpbGVEaXNhYmxlZCA9PT0gbnVsbCB8fCB0aWxlRGlzYWJsZWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRpbGVEaXNhYmxlZCh7IGFjdGl2ZVN0YXJ0RGF0ZTogYWN0aXZlU3RhcnREYXRlLCBkYXRlOiBkYXRlLCB2aWV3OiB2aWV3IH0pKSwgb25DbGljazogb25DbGljayA/IGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gb25DbGljayhkYXRlLCBldmVudCk7IH0gOiB1bmRlZmluZWQsIG9uRm9jdXM6IG9uTW91c2VPdmVyID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gb25Nb3VzZU92ZXIoZGF0ZSk7IH0gOiB1bmRlZmluZWQsIG9uTW91c2VPdmVyOiBvbk1vdXNlT3ZlciA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9uTW91c2VPdmVyKGRhdGUpOyB9IDogdW5kZWZpbmVkLCBzdHlsZTogc3R5bGUsIHR5cGU6IFwiYnV0dG9uXCIsIGNoaWxkcmVuOiBbZm9ybWF0QWJiciA/IF9qc3goXCJhYmJyXCIsIHsgXCJhcmlhLWxhYmVsXCI6IGZvcm1hdEFiYnIobG9jYWxlLCBkYXRlKSwgY2hpbGRyZW46IGNoaWxkcmVuIH0pIDogY2hpbGRyZW4sIHRpbGVDb250ZW50XSB9KSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldERlY2FkZVN0YXJ0LCBnZXREZWNhZGVFbmQsIGdldENlbnR1cnlTdGFydCB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5pbXBvcnQgVGlsZSBmcm9tICcuLi9UaWxlLmpzJztcbmltcG9ydCB7IGdldERlY2FkZUxhYmVsIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGVzLmpzJztcbmltcG9ydCB7IGZvcm1hdFllYXIgYXMgZGVmYXVsdEZvcm1hdFllYXIgfSBmcm9tICcuLi9zaGFyZWQvZGF0ZUZvcm1hdHRlci5qcyc7XG52YXIgY2xhc3NOYW1lID0gJ3JlYWN0LWNhbGVuZGFyX19jZW50dXJ5LXZpZXdfX2RlY2FkZXNfX2RlY2FkZSc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZWNhZGUoX2EpIHtcbiAgICB2YXIgX2IgPSBfYS5jbGFzc2VzLCBjbGFzc2VzID0gX2IgPT09IHZvaWQgMCA/IFtdIDogX2IsIGN1cnJlbnRDZW50dXJ5ID0gX2EuY3VycmVudENlbnR1cnksIF9jID0gX2EuZm9ybWF0WWVhciwgZm9ybWF0WWVhciA9IF9jID09PSB2b2lkIDAgPyBkZWZhdWx0Rm9ybWF0WWVhciA6IF9jLCBvdGhlclByb3BzID0gX19yZXN0KF9hLCBbXCJjbGFzc2VzXCIsIFwiY3VycmVudENlbnR1cnlcIiwgXCJmb3JtYXRZZWFyXCJdKTtcbiAgICB2YXIgZGF0ZSA9IG90aGVyUHJvcHMuZGF0ZSwgbG9jYWxlID0gb3RoZXJQcm9wcy5sb2NhbGU7XG4gICAgdmFyIGNsYXNzZXNQcm9wcyA9IFtdO1xuICAgIGlmIChjbGFzc2VzKSB7XG4gICAgICAgIGNsYXNzZXNQcm9wcy5wdXNoLmFwcGx5KGNsYXNzZXNQcm9wcywgY2xhc3Nlcyk7XG4gICAgfVxuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgY2xhc3Nlc1Byb3BzLnB1c2goY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgaWYgKGdldENlbnR1cnlTdGFydChkYXRlKS5nZXRGdWxsWWVhcigpICE9PSBjdXJyZW50Q2VudHVyeSkge1xuICAgICAgICBjbGFzc2VzUHJvcHMucHVzaChcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiLS1uZWlnaGJvcmluZ0NlbnR1cnlcIikpO1xuICAgIH1cbiAgICByZXR1cm4gKF9qc3goVGlsZSwgX19hc3NpZ24oe30sIG90aGVyUHJvcHMsIHsgY2xhc3NlczogY2xhc3Nlc1Byb3BzLCBtYXhEYXRlVHJhbnNmb3JtOiBnZXREZWNhZGVFbmQsIG1pbkRhdGVUcmFuc2Zvcm06IGdldERlY2FkZVN0YXJ0LCB2aWV3OiBcImNlbnR1cnlcIiwgY2hpbGRyZW46IGdldERlY2FkZUxhYmVsKGxvY2FsZSwgZm9ybWF0WWVhciwgZGF0ZSkgfSkpKTtcbn1cbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgZ2V0RGVjYWRlU3RhcnQgfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IFRpbGVHcm91cCBmcm9tICcuLi9UaWxlR3JvdXAuanMnO1xuaW1wb3J0IERlY2FkZSBmcm9tICcuL0RlY2FkZS5qcyc7XG5pbXBvcnQgeyBnZXRCZWdpbk9mQ2VudHVyeVllYXIgfSBmcm9tICcuLi9zaGFyZWQvZGF0ZXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGVjYWRlcyhwcm9wcykge1xuICAgIHZhciBhY3RpdmVTdGFydERhdGUgPSBwcm9wcy5hY3RpdmVTdGFydERhdGUsIGhvdmVyID0gcHJvcHMuaG92ZXIsIHNob3dOZWlnaGJvcmluZ0NlbnR1cnkgPSBwcm9wcy5zaG93TmVpZ2hib3JpbmdDZW50dXJ5LCB2YWx1ZSA9IHByb3BzLnZhbHVlLCB2YWx1ZVR5cGUgPSBwcm9wcy52YWx1ZVR5cGUsIG90aGVyUHJvcHMgPSBfX3Jlc3QocHJvcHMsIFtcImFjdGl2ZVN0YXJ0RGF0ZVwiLCBcImhvdmVyXCIsIFwic2hvd05laWdoYm9yaW5nQ2VudHVyeVwiLCBcInZhbHVlXCIsIFwidmFsdWVUeXBlXCJdKTtcbiAgICB2YXIgc3RhcnQgPSBnZXRCZWdpbk9mQ2VudHVyeVllYXIoYWN0aXZlU3RhcnREYXRlKTtcbiAgICB2YXIgZW5kID0gc3RhcnQgKyAoc2hvd05laWdoYm9yaW5nQ2VudHVyeSA/IDExOSA6IDk5KTtcbiAgICByZXR1cm4gKF9qc3goVGlsZUdyb3VwLCB7IGNsYXNzTmFtZTogXCJyZWFjdC1jYWxlbmRhcl9fY2VudHVyeS12aWV3X19kZWNhZGVzXCIsIGRhdGVUcmFuc2Zvcm06IGdldERlY2FkZVN0YXJ0LCBkYXRlVHlwZTogXCJkZWNhZGVcIiwgZW5kOiBlbmQsIGhvdmVyOiBob3ZlciwgcmVuZGVyVGlsZTogZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IF9hLmRhdGUsIG90aGVyVGlsZVByb3BzID0gX19yZXN0KF9hLCBbXCJkYXRlXCJdKTtcbiAgICAgICAgICAgIHJldHVybiAoX2pzeChEZWNhZGUsIF9fYXNzaWduKHt9LCBvdGhlclByb3BzLCBvdGhlclRpbGVQcm9wcywgeyBhY3RpdmVTdGFydERhdGU6IGFjdGl2ZVN0YXJ0RGF0ZSwgY3VycmVudENlbnR1cnk6IHN0YXJ0LCBkYXRlOiBkYXRlIH0pLCBkYXRlLmdldFRpbWUoKSkpO1xuICAgICAgICB9LCBzdGFydDogc3RhcnQsIHN0ZXA6IDEwLCB2YWx1ZTogdmFsdWUsIHZhbHVlVHlwZTogdmFsdWVUeXBlIH0pKTtcbn1cbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IERlY2FkZXMgZnJvbSAnLi9DZW50dXJ5Vmlldy9EZWNhZGVzLmpzJztcbi8qKlxuICogRGlzcGxheXMgYSBnaXZlbiBjZW50dXJ5LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDZW50dXJ5Vmlldyhwcm9wcykge1xuICAgIGZ1bmN0aW9uIHJlbmRlckRlY2FkZXMoKSB7XG4gICAgICAgIHJldHVybiBfanN4KERlY2FkZXMsIF9fYXNzaWduKHt9LCBwcm9wcykpO1xuICAgIH1cbiAgICByZXR1cm4gX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyZWFjdC1jYWxlbmRhcl9fY2VudHVyeS12aWV3XCIsIGNoaWxkcmVuOiByZW5kZXJEZWNhZGVzKCkgfSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldFllYXJTdGFydCwgZ2V0WWVhckVuZCwgZ2V0RGVjYWRlU3RhcnQgfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IFRpbGUgZnJvbSAnLi4vVGlsZS5qcyc7XG5pbXBvcnQgeyBmb3JtYXRZZWFyIGFzIGRlZmF1bHRGb3JtYXRZZWFyIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGVGb3JtYXR0ZXIuanMnO1xudmFyIGNsYXNzTmFtZSA9ICdyZWFjdC1jYWxlbmRhcl9fZGVjYWRlLXZpZXdfX3llYXJzX195ZWFyJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFllYXIoX2EpIHtcbiAgICB2YXIgX2IgPSBfYS5jbGFzc2VzLCBjbGFzc2VzID0gX2IgPT09IHZvaWQgMCA/IFtdIDogX2IsIGN1cnJlbnREZWNhZGUgPSBfYS5jdXJyZW50RGVjYWRlLCBfYyA9IF9hLmZvcm1hdFllYXIsIGZvcm1hdFllYXIgPSBfYyA9PT0gdm9pZCAwID8gZGVmYXVsdEZvcm1hdFllYXIgOiBfYywgb3RoZXJQcm9wcyA9IF9fcmVzdChfYSwgW1wiY2xhc3Nlc1wiLCBcImN1cnJlbnREZWNhZGVcIiwgXCJmb3JtYXRZZWFyXCJdKTtcbiAgICB2YXIgZGF0ZSA9IG90aGVyUHJvcHMuZGF0ZSwgbG9jYWxlID0gb3RoZXJQcm9wcy5sb2NhbGU7XG4gICAgdmFyIGNsYXNzZXNQcm9wcyA9IFtdO1xuICAgIGlmIChjbGFzc2VzKSB7XG4gICAgICAgIGNsYXNzZXNQcm9wcy5wdXNoLmFwcGx5KGNsYXNzZXNQcm9wcywgY2xhc3Nlcyk7XG4gICAgfVxuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgY2xhc3Nlc1Byb3BzLnB1c2goY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgaWYgKGdldERlY2FkZVN0YXJ0KGRhdGUpLmdldEZ1bGxZZWFyKCkgIT09IGN1cnJlbnREZWNhZGUpIHtcbiAgICAgICAgY2xhc3Nlc1Byb3BzLnB1c2goXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIi0tbmVpZ2hib3JpbmdEZWNhZGVcIikpO1xuICAgIH1cbiAgICByZXR1cm4gKF9qc3goVGlsZSwgX19hc3NpZ24oe30sIG90aGVyUHJvcHMsIHsgY2xhc3NlczogY2xhc3Nlc1Byb3BzLCBtYXhEYXRlVHJhbnNmb3JtOiBnZXRZZWFyRW5kLCBtaW5EYXRlVHJhbnNmb3JtOiBnZXRZZWFyU3RhcnQsIHZpZXc6IFwiZGVjYWRlXCIsIGNoaWxkcmVuOiBmb3JtYXRZZWFyKGxvY2FsZSwgZGF0ZSkgfSkpKTtcbn1cbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgZ2V0WWVhclN0YXJ0IH0gZnJvbSAnQHdvanRla21hai9kYXRlLXV0aWxzJztcbmltcG9ydCBUaWxlR3JvdXAgZnJvbSAnLi4vVGlsZUdyb3VwLmpzJztcbmltcG9ydCBZZWFyIGZyb20gJy4vWWVhci5qcyc7XG5pbXBvcnQgeyBnZXRCZWdpbk9mRGVjYWRlWWVhciB9IGZyb20gJy4uL3NoYXJlZC9kYXRlcy5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBZZWFycyhwcm9wcykge1xuICAgIHZhciBhY3RpdmVTdGFydERhdGUgPSBwcm9wcy5hY3RpdmVTdGFydERhdGUsIGhvdmVyID0gcHJvcHMuaG92ZXIsIHNob3dOZWlnaGJvcmluZ0RlY2FkZSA9IHByb3BzLnNob3dOZWlnaGJvcmluZ0RlY2FkZSwgdmFsdWUgPSBwcm9wcy52YWx1ZSwgdmFsdWVUeXBlID0gcHJvcHMudmFsdWVUeXBlLCBvdGhlclByb3BzID0gX19yZXN0KHByb3BzLCBbXCJhY3RpdmVTdGFydERhdGVcIiwgXCJob3ZlclwiLCBcInNob3dOZWlnaGJvcmluZ0RlY2FkZVwiLCBcInZhbHVlXCIsIFwidmFsdWVUeXBlXCJdKTtcbiAgICB2YXIgc3RhcnQgPSBnZXRCZWdpbk9mRGVjYWRlWWVhcihhY3RpdmVTdGFydERhdGUpO1xuICAgIHZhciBlbmQgPSBzdGFydCArIChzaG93TmVpZ2hib3JpbmdEZWNhZGUgPyAxMSA6IDkpO1xuICAgIHJldHVybiAoX2pzeChUaWxlR3JvdXAsIHsgY2xhc3NOYW1lOiBcInJlYWN0LWNhbGVuZGFyX19kZWNhZGUtdmlld19feWVhcnNcIiwgZGF0ZVRyYW5zZm9ybTogZ2V0WWVhclN0YXJ0LCBkYXRlVHlwZTogXCJ5ZWFyXCIsIGVuZDogZW5kLCBob3ZlcjogaG92ZXIsIHJlbmRlclRpbGU6IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBfYS5kYXRlLCBvdGhlclRpbGVQcm9wcyA9IF9fcmVzdChfYSwgW1wiZGF0ZVwiXSk7XG4gICAgICAgICAgICByZXR1cm4gKF9qc3goWWVhciwgX19hc3NpZ24oe30sIG90aGVyUHJvcHMsIG90aGVyVGlsZVByb3BzLCB7IGFjdGl2ZVN0YXJ0RGF0ZTogYWN0aXZlU3RhcnREYXRlLCBjdXJyZW50RGVjYWRlOiBzdGFydCwgZGF0ZTogZGF0ZSB9KSwgZGF0ZS5nZXRUaW1lKCkpKTtcbiAgICAgICAgfSwgc3RhcnQ6IHN0YXJ0LCB2YWx1ZTogdmFsdWUsIHZhbHVlVHlwZTogdmFsdWVUeXBlIH0pKTtcbn1cbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IFllYXJzIGZyb20gJy4vRGVjYWRlVmlldy9ZZWFycy5qcyc7XG4vKipcbiAqIERpc3BsYXlzIGEgZ2l2ZW4gZGVjYWRlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZWNhZGVWaWV3KHByb3BzKSB7XG4gICAgZnVuY3Rpb24gcmVuZGVyWWVhcnMoKSB7XG4gICAgICAgIHJldHVybiBfanN4KFllYXJzLCBfX2Fzc2lnbih7fSwgcHJvcHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVhY3QtY2FsZW5kYXJfX2RlY2FkZS12aWV3XCIsIGNoaWxkcmVuOiByZW5kZXJZZWFycygpIH0pO1xufVxuIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBnZXRNb250aFN0YXJ0LCBnZXRNb250aEVuZCB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5pbXBvcnQgVGlsZSBmcm9tICcuLi9UaWxlLmpzJztcbmltcG9ydCB7IGZvcm1hdE1vbnRoIGFzIGRlZmF1bHRGb3JtYXRNb250aCwgZm9ybWF0TW9udGhZZWFyIGFzIGRlZmF1bHRGb3JtYXRNb250aFllYXIsIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGVGb3JtYXR0ZXIuanMnO1xudmFyIGNsYXNzTmFtZSA9ICdyZWFjdC1jYWxlbmRhcl9feWVhci12aWV3X19tb250aHNfX21vbnRoJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1vbnRoKF9hKSB7XG4gICAgdmFyIF9iID0gX2EuY2xhc3NlcywgY2xhc3NlcyA9IF9iID09PSB2b2lkIDAgPyBbXSA6IF9iLCBfYyA9IF9hLmZvcm1hdE1vbnRoLCBmb3JtYXRNb250aCA9IF9jID09PSB2b2lkIDAgPyBkZWZhdWx0Rm9ybWF0TW9udGggOiBfYywgX2QgPSBfYS5mb3JtYXRNb250aFllYXIsIGZvcm1hdE1vbnRoWWVhciA9IF9kID09PSB2b2lkIDAgPyBkZWZhdWx0Rm9ybWF0TW9udGhZZWFyIDogX2QsIG90aGVyUHJvcHMgPSBfX3Jlc3QoX2EsIFtcImNsYXNzZXNcIiwgXCJmb3JtYXRNb250aFwiLCBcImZvcm1hdE1vbnRoWWVhclwiXSk7XG4gICAgdmFyIGRhdGUgPSBvdGhlclByb3BzLmRhdGUsIGxvY2FsZSA9IG90aGVyUHJvcHMubG9jYWxlO1xuICAgIHJldHVybiAoX2pzeChUaWxlLCBfX2Fzc2lnbih7fSwgb3RoZXJQcm9wcywgeyBjbGFzc2VzOiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIGNsYXNzZXMsIHRydWUpLCBbY2xhc3NOYW1lXSwgZmFsc2UpLCBmb3JtYXRBYmJyOiBmb3JtYXRNb250aFllYXIsIG1heERhdGVUcmFuc2Zvcm06IGdldE1vbnRoRW5kLCBtaW5EYXRlVHJhbnNmb3JtOiBnZXRNb250aFN0YXJ0LCB2aWV3OiBcInllYXJcIiwgY2hpbGRyZW46IGZvcm1hdE1vbnRoKGxvY2FsZSwgZGF0ZSkgfSkpKTtcbn1cbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgZ2V0TW9udGhTdGFydCwgZ2V0WWVhciB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5pbXBvcnQgVGlsZUdyb3VwIGZyb20gJy4uL1RpbGVHcm91cC5qcyc7XG5pbXBvcnQgTW9udGggZnJvbSAnLi9Nb250aC5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNb250aHMocHJvcHMpIHtcbiAgICB2YXIgYWN0aXZlU3RhcnREYXRlID0gcHJvcHMuYWN0aXZlU3RhcnREYXRlLCBob3ZlciA9IHByb3BzLmhvdmVyLCB2YWx1ZSA9IHByb3BzLnZhbHVlLCB2YWx1ZVR5cGUgPSBwcm9wcy52YWx1ZVR5cGUsIG90aGVyUHJvcHMgPSBfX3Jlc3QocHJvcHMsIFtcImFjdGl2ZVN0YXJ0RGF0ZVwiLCBcImhvdmVyXCIsIFwidmFsdWVcIiwgXCJ2YWx1ZVR5cGVcIl0pO1xuICAgIHZhciBzdGFydCA9IDA7XG4gICAgdmFyIGVuZCA9IDExO1xuICAgIHZhciB5ZWFyID0gZ2V0WWVhcihhY3RpdmVTdGFydERhdGUpO1xuICAgIHJldHVybiAoX2pzeChUaWxlR3JvdXAsIHsgY2xhc3NOYW1lOiBcInJlYWN0LWNhbGVuZGFyX195ZWFyLXZpZXdfX21vbnRoc1wiLCBkYXRlVHJhbnNmb3JtOiBmdW5jdGlvbiAobW9udGhJbmRleCkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcih5ZWFyLCBtb250aEluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiBnZXRNb250aFN0YXJ0KGRhdGUpO1xuICAgICAgICB9LCBkYXRlVHlwZTogXCJtb250aFwiLCBlbmQ6IGVuZCwgaG92ZXI6IGhvdmVyLCByZW5kZXJUaWxlOiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gX2EuZGF0ZSwgb3RoZXJUaWxlUHJvcHMgPSBfX3Jlc3QoX2EsIFtcImRhdGVcIl0pO1xuICAgICAgICAgICAgcmV0dXJuIChfanN4KE1vbnRoLCBfX2Fzc2lnbih7fSwgb3RoZXJQcm9wcywgb3RoZXJUaWxlUHJvcHMsIHsgYWN0aXZlU3RhcnREYXRlOiBhY3RpdmVTdGFydERhdGUsIGRhdGU6IGRhdGUgfSksIGRhdGUuZ2V0VGltZSgpKSk7XG4gICAgICAgIH0sIHN0YXJ0OiBzdGFydCwgdmFsdWU6IHZhbHVlLCB2YWx1ZVR5cGU6IHZhbHVlVHlwZSB9KSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBNb250aHMgZnJvbSAnLi9ZZWFyVmlldy9Nb250aHMuanMnO1xuLyoqXG4gKiBEaXNwbGF5cyBhIGdpdmVuIHllYXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFllYXJWaWV3KHByb3BzKSB7XG4gICAgZnVuY3Rpb24gcmVuZGVyTW9udGhzKCkge1xuICAgICAgICByZXR1cm4gX2pzeChNb250aHMsIF9fYXNzaWduKHt9LCBwcm9wcykpO1xuICAgIH1cbiAgICByZXR1cm4gX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyZWFjdC1jYWxlbmRhcl9feWVhci12aWV3XCIsIGNoaWxkcmVuOiByZW5kZXJNb250aHMoKSB9KTtcbn1cbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgZ2V0RGF5U3RhcnQsIGdldERheUVuZCB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5pbXBvcnQgVGlsZSBmcm9tICcuLi9UaWxlLmpzJztcbmltcG9ydCB7IGlzV2Vla2VuZCB9IGZyb20gJy4uL3NoYXJlZC9kYXRlcy5qcyc7XG5pbXBvcnQgeyBmb3JtYXREYXkgYXMgZGVmYXVsdEZvcm1hdERheSwgZm9ybWF0TG9uZ0RhdGUgYXMgZGVmYXVsdEZvcm1hdExvbmdEYXRlLCB9IGZyb20gJy4uL3NoYXJlZC9kYXRlRm9ybWF0dGVyLmpzJztcbnZhciBjbGFzc05hbWUgPSAncmVhY3QtY2FsZW5kYXJfX21vbnRoLXZpZXdfX2RheXNfX2RheSc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXkoX2EpIHtcbiAgICB2YXIgY2FsZW5kYXJUeXBlID0gX2EuY2FsZW5kYXJUeXBlLCBfYiA9IF9hLmNsYXNzZXMsIGNsYXNzZXMgPSBfYiA9PT0gdm9pZCAwID8gW10gOiBfYiwgY3VycmVudE1vbnRoSW5kZXggPSBfYS5jdXJyZW50TW9udGhJbmRleCwgX2MgPSBfYS5mb3JtYXREYXksIGZvcm1hdERheSA9IF9jID09PSB2b2lkIDAgPyBkZWZhdWx0Rm9ybWF0RGF5IDogX2MsIF9kID0gX2EuZm9ybWF0TG9uZ0RhdGUsIGZvcm1hdExvbmdEYXRlID0gX2QgPT09IHZvaWQgMCA/IGRlZmF1bHRGb3JtYXRMb25nRGF0ZSA6IF9kLCBvdGhlclByb3BzID0gX19yZXN0KF9hLCBbXCJjYWxlbmRhclR5cGVcIiwgXCJjbGFzc2VzXCIsIFwiY3VycmVudE1vbnRoSW5kZXhcIiwgXCJmb3JtYXREYXlcIiwgXCJmb3JtYXRMb25nRGF0ZVwiXSk7XG4gICAgdmFyIGRhdGUgPSBvdGhlclByb3BzLmRhdGUsIGxvY2FsZSA9IG90aGVyUHJvcHMubG9jYWxlO1xuICAgIHZhciBjbGFzc2VzUHJvcHMgPSBbXTtcbiAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICBjbGFzc2VzUHJvcHMucHVzaC5hcHBseShjbGFzc2VzUHJvcHMsIGNsYXNzZXMpO1xuICAgIH1cbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGNsYXNzZXNQcm9wcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIGlmIChpc1dlZWtlbmQoZGF0ZSwgY2FsZW5kYXJUeXBlKSkge1xuICAgICAgICBjbGFzc2VzUHJvcHMucHVzaChcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiLS13ZWVrZW5kXCIpKTtcbiAgICB9XG4gICAgaWYgKGRhdGUuZ2V0TW9udGgoKSAhPT0gY3VycmVudE1vbnRoSW5kZXgpIHtcbiAgICAgICAgY2xhc3Nlc1Byb3BzLnB1c2goXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIi0tbmVpZ2hib3JpbmdNb250aFwiKSk7XG4gICAgfVxuICAgIHJldHVybiAoX2pzeChUaWxlLCBfX2Fzc2lnbih7fSwgb3RoZXJQcm9wcywgeyBjbGFzc2VzOiBjbGFzc2VzUHJvcHMsIGZvcm1hdEFiYnI6IGZvcm1hdExvbmdEYXRlLCBtYXhEYXRlVHJhbnNmb3JtOiBnZXREYXlFbmQsIG1pbkRhdGVUcmFuc2Zvcm06IGdldERheVN0YXJ0LCB2aWV3OiBcIm1vbnRoXCIsIGNoaWxkcmVuOiBmb3JtYXREYXkobG9jYWxlLCBkYXRlKSB9KSkpO1xufVxuIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBnZXRZZWFyLCBnZXRNb250aCwgZ2V0RGF5c0luTW9udGgsIGdldERheVN0YXJ0IH0gZnJvbSAnQHdvanRla21hai9kYXRlLXV0aWxzJztcbmltcG9ydCBUaWxlR3JvdXAgZnJvbSAnLi4vVGlsZUdyb3VwLmpzJztcbmltcG9ydCBEYXkgZnJvbSAnLi9EYXkuanMnO1xuaW1wb3J0IHsgZ2V0RGF5T2ZXZWVrIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGVzLmpzJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERheXMocHJvcHMpIHtcbiAgICB2YXIgYWN0aXZlU3RhcnREYXRlID0gcHJvcHMuYWN0aXZlU3RhcnREYXRlLCBjYWxlbmRhclR5cGUgPSBwcm9wcy5jYWxlbmRhclR5cGUsIGhvdmVyID0gcHJvcHMuaG92ZXIsIHNob3dGaXhlZE51bWJlck9mV2Vla3MgPSBwcm9wcy5zaG93Rml4ZWROdW1iZXJPZldlZWtzLCBzaG93TmVpZ2hib3JpbmdNb250aCA9IHByb3BzLnNob3dOZWlnaGJvcmluZ01vbnRoLCB2YWx1ZSA9IHByb3BzLnZhbHVlLCB2YWx1ZVR5cGUgPSBwcm9wcy52YWx1ZVR5cGUsIG90aGVyUHJvcHMgPSBfX3Jlc3QocHJvcHMsIFtcImFjdGl2ZVN0YXJ0RGF0ZVwiLCBcImNhbGVuZGFyVHlwZVwiLCBcImhvdmVyXCIsIFwic2hvd0ZpeGVkTnVtYmVyT2ZXZWVrc1wiLCBcInNob3dOZWlnaGJvcmluZ01vbnRoXCIsIFwidmFsdWVcIiwgXCJ2YWx1ZVR5cGVcIl0pO1xuICAgIHZhciB5ZWFyID0gZ2V0WWVhcihhY3RpdmVTdGFydERhdGUpO1xuICAgIHZhciBtb250aEluZGV4ID0gZ2V0TW9udGgoYWN0aXZlU3RhcnREYXRlKTtcbiAgICB2YXIgaGFzRml4ZWROdW1iZXJPZldlZWtzID0gc2hvd0ZpeGVkTnVtYmVyT2ZXZWVrcyB8fCBzaG93TmVpZ2hib3JpbmdNb250aDtcbiAgICB2YXIgZGF5T2ZXZWVrID0gZ2V0RGF5T2ZXZWVrKGFjdGl2ZVN0YXJ0RGF0ZSwgY2FsZW5kYXJUeXBlKTtcbiAgICB2YXIgb2Zmc2V0ID0gaGFzRml4ZWROdW1iZXJPZldlZWtzID8gMCA6IGRheU9mV2VlaztcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIG9uIHdoaWNoIGRheSBvZiB0aGUgbW9udGggdGhlIGdyaWQgc2hhbGwgc3RhcnQuIElmIHdlIHNpbXBseSBzaG93IGN1cnJlbnRcbiAgICAgKiBtb250aCwgd2Ugb2J2aW91c2x5IHN0YXJ0IG9uIGRheSBvbmUsIGJ1dCBpZiBzaG93TmVpZ2hib3JpbmdNb250aCBpcyBzZXQgdG9cbiAgICAgKiB0cnVlLCB3ZSBuZWVkIHRvIGZpbmQgdGhlIGJlZ2lubmluZyBvZiB0aGUgd2VlayB0aGUgZmlyc3QgZGF5IG9mIHRoZSBtb250aCBpcyBpbi5cbiAgICAgKi9cbiAgICB2YXIgc3RhcnQgPSAoaGFzRml4ZWROdW1iZXJPZldlZWtzID8gLWRheU9mV2VlayA6IDApICsgMTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIG9uIHdoaWNoIGRheSBvZiB0aGUgbW9udGggdGhlIGdyaWQgc2hhbGwgZW5kLiBJZiB3ZSBzaW1wbHkgc2hvdyBjdXJyZW50XG4gICAgICogbW9udGgsIHdlIG5lZWQgdG8gc3RvcCBvbiB0aGUgbGFzdCBkYXkgb2YgdGhlIG1vbnRoLCBidXQgaWYgc2hvd05laWdoYm9yaW5nTW9udGhcbiAgICAgKiBpcyBzZXQgdG8gdHJ1ZSwgd2UgbmVlZCB0byBmaW5kIHRoZSBlbmQgb2YgdGhlIHdlZWsgdGhlIGxhc3QgZGF5IG9mIHRoZSBtb250aCBpcyBpbi5cbiAgICAgKi9cbiAgICB2YXIgZW5kID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNob3dGaXhlZE51bWJlck9mV2Vla3MpIHtcbiAgICAgICAgICAgIC8vIEFsd2F5cyBzaG93IDYgd2Vla3NcbiAgICAgICAgICAgIHJldHVybiBzdGFydCArIDYgKiA3IC0gMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF5c0luTW9udGggPSBnZXREYXlzSW5Nb250aChhY3RpdmVTdGFydERhdGUpO1xuICAgICAgICBpZiAoc2hvd05laWdoYm9yaW5nTW9udGgpIHtcbiAgICAgICAgICAgIHZhciBhY3RpdmVFbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGFjdGl2ZUVuZERhdGUuc2V0RnVsbFllYXIoeWVhciwgbW9udGhJbmRleCwgZGF5c0luTW9udGgpO1xuICAgICAgICAgICAgYWN0aXZlRW5kRGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIHZhciBkYXlzVW50aWxFbmRPZlRoZVdlZWsgPSA3IC0gZ2V0RGF5T2ZXZWVrKGFjdGl2ZUVuZERhdGUsIGNhbGVuZGFyVHlwZSkgLSAxO1xuICAgICAgICAgICAgcmV0dXJuIGRheXNJbk1vbnRoICsgZGF5c1VudGlsRW5kT2ZUaGVXZWVrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXlzSW5Nb250aDtcbiAgICB9KSgpO1xuICAgIHJldHVybiAoX2pzeChUaWxlR3JvdXAsIHsgY2xhc3NOYW1lOiBcInJlYWN0LWNhbGVuZGFyX19tb250aC12aWV3X19kYXlzXCIsIGNvdW50OiA3LCBkYXRlVHJhbnNmb3JtOiBmdW5jdGlvbiAoZGF5KSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoSW5kZXgsIGRheSk7XG4gICAgICAgICAgICByZXR1cm4gZ2V0RGF5U3RhcnQoZGF0ZSk7XG4gICAgICAgIH0sIGRhdGVUeXBlOiBcImRheVwiLCBob3ZlcjogaG92ZXIsIGVuZDogZW5kLCByZW5kZXJUaWxlOiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gX2EuZGF0ZSwgb3RoZXJUaWxlUHJvcHMgPSBfX3Jlc3QoX2EsIFtcImRhdGVcIl0pO1xuICAgICAgICAgICAgcmV0dXJuIChfanN4KERheSwgX19hc3NpZ24oe30sIG90aGVyUHJvcHMsIG90aGVyVGlsZVByb3BzLCB7IGFjdGl2ZVN0YXJ0RGF0ZTogYWN0aXZlU3RhcnREYXRlLCBjYWxlbmRhclR5cGU6IGNhbGVuZGFyVHlwZSwgY3VycmVudE1vbnRoSW5kZXg6IG1vbnRoSW5kZXgsIGRhdGU6IGRhdGUgfSksIGRhdGUuZ2V0VGltZSgpKSk7XG4gICAgICAgIH0sIG9mZnNldDogb2Zmc2V0LCBzdGFydDogc3RhcnQsIHZhbHVlOiB2YWx1ZSwgdmFsdWVUeXBlOiB2YWx1ZVR5cGUgfSkpO1xufVxuIiwiaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IHsgZ2V0WWVhciwgZ2V0TW9udGgsIGdldE1vbnRoU3RhcnQgfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IEZsZXggZnJvbSAnLi4vRmxleC5qcyc7XG5pbXBvcnQgeyBnZXREYXlPZldlZWssIGlzQ3VycmVudERheU9mV2VlaywgaXNXZWVrZW5kIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGVzLmpzJztcbmltcG9ydCB7IGZvcm1hdFNob3J0V2Vla2RheSBhcyBkZWZhdWx0Rm9ybWF0U2hvcnRXZWVrZGF5LCBmb3JtYXRXZWVrZGF5IGFzIGRlZmF1bHRGb3JtYXRXZWVrZGF5LCB9IGZyb20gJy4uL3NoYXJlZC9kYXRlRm9ybWF0dGVyLmpzJztcbnZhciBjbGFzc05hbWUgPSAncmVhY3QtY2FsZW5kYXJfX21vbnRoLXZpZXdfX3dlZWtkYXlzJztcbnZhciB3ZWVrZGF5Q2xhc3NOYW1lID0gXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIl9fd2Vla2RheVwiKTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdlZWtkYXlzKHByb3BzKSB7XG4gICAgdmFyIGNhbGVuZGFyVHlwZSA9IHByb3BzLmNhbGVuZGFyVHlwZSwgX2EgPSBwcm9wcy5mb3JtYXRTaG9ydFdlZWtkYXksIGZvcm1hdFNob3J0V2Vla2RheSA9IF9hID09PSB2b2lkIDAgPyBkZWZhdWx0Rm9ybWF0U2hvcnRXZWVrZGF5IDogX2EsIF9iID0gcHJvcHMuZm9ybWF0V2Vla2RheSwgZm9ybWF0V2Vla2RheSA9IF9iID09PSB2b2lkIDAgPyBkZWZhdWx0Rm9ybWF0V2Vla2RheSA6IF9iLCBsb2NhbGUgPSBwcm9wcy5sb2NhbGUsIG9uTW91c2VMZWF2ZSA9IHByb3BzLm9uTW91c2VMZWF2ZTtcbiAgICB2YXIgYW55RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIGJlZ2luT2ZNb250aCA9IGdldE1vbnRoU3RhcnQoYW55RGF0ZSk7XG4gICAgdmFyIHllYXIgPSBnZXRZZWFyKGJlZ2luT2ZNb250aCk7XG4gICAgdmFyIG1vbnRoSW5kZXggPSBnZXRNb250aChiZWdpbk9mTW9udGgpO1xuICAgIHZhciB3ZWVrZGF5cyA9IFtdO1xuICAgIGZvciAodmFyIHdlZWtkYXkgPSAxOyB3ZWVrZGF5IDw9IDc7IHdlZWtkYXkgKz0gMSkge1xuICAgICAgICB2YXIgd2Vla2RheURhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aEluZGV4LCB3ZWVrZGF5IC0gZ2V0RGF5T2ZXZWVrKGJlZ2luT2ZNb250aCwgY2FsZW5kYXJUeXBlKSk7XG4gICAgICAgIHZhciBhYmJyID0gZm9ybWF0V2Vla2RheShsb2NhbGUsIHdlZWtkYXlEYXRlKTtcbiAgICAgICAgd2Vla2RheXMucHVzaChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbHN4KHdlZWtkYXlDbGFzc05hbWUsIGlzQ3VycmVudERheU9mV2Vlayh3ZWVrZGF5RGF0ZSkgJiYgXCJcIi5jb25jYXQod2Vla2RheUNsYXNzTmFtZSwgXCItLWN1cnJlbnRcIiksIGlzV2Vla2VuZCh3ZWVrZGF5RGF0ZSwgY2FsZW5kYXJUeXBlKSAmJiBcIlwiLmNvbmNhdCh3ZWVrZGF5Q2xhc3NOYW1lLCBcIi0td2Vla2VuZFwiKSksIGNoaWxkcmVuOiBfanN4KFwiYWJiclwiLCB7IFwiYXJpYS1sYWJlbFwiOiBhYmJyLCB0aXRsZTogYWJiciwgY2hpbGRyZW46IGZvcm1hdFNob3J0V2Vla2RheShsb2NhbGUsIHdlZWtkYXlEYXRlKS5yZXBsYWNlKCcuJywgJycpIH0pIH0sIHdlZWtkYXkpKTtcbiAgICB9XG4gICAgcmV0dXJuIChfanN4KEZsZXgsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIGNvdW50OiA3LCBvbkZvY3VzOiBvbk1vdXNlTGVhdmUsIG9uTW91c2VPdmVyOiBvbk1vdXNlTGVhdmUsIGNoaWxkcmVuOiB3ZWVrZGF5cyB9KSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBjbGFzc05hbWUgPSAncmVhY3QtY2FsZW5kYXJfX3RpbGUnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV2Vla051bWJlcihwcm9wcykge1xuICAgIHZhciBvbkNsaWNrV2Vla051bWJlciA9IHByb3BzLm9uQ2xpY2tXZWVrTnVtYmVyLCB3ZWVrTnVtYmVyID0gcHJvcHMud2Vla051bWJlcjtcbiAgICB2YXIgY2hpbGRyZW4gPSBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiB3ZWVrTnVtYmVyIH0pO1xuICAgIGlmIChvbkNsaWNrV2Vla051bWJlcikge1xuICAgICAgICB2YXIgZGF0ZV8xID0gcHJvcHMuZGF0ZSwgb25DbGlja1dlZWtOdW1iZXJfMSA9IHByb3BzLm9uQ2xpY2tXZWVrTnVtYmVyLCB3ZWVrTnVtYmVyXzEgPSBwcm9wcy53ZWVrTnVtYmVyLCBvdGhlclByb3BzID0gX19yZXN0KHByb3BzLCBbXCJkYXRlXCIsIFwib25DbGlja1dlZWtOdW1iZXJcIiwgXCJ3ZWVrTnVtYmVyXCJdKTtcbiAgICAgICAgcmV0dXJuIChfanN4KFwiYnV0dG9uXCIsIF9fYXNzaWduKHt9LCBvdGhlclByb3BzLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBvbkNsaWNrOiBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIG9uQ2xpY2tXZWVrTnVtYmVyXzEod2Vla051bWJlcl8xLCBkYXRlXzEsIGV2ZW50KTsgfSwgdHlwZTogXCJidXR0b25cIiwgY2hpbGRyZW46IGNoaWxkcmVuIH0pKSk7XG4gICAgICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N0eWxlL25vVXNlbGVzc0Vsc2U6IFR5cGVTY3JpcHQgaXMgdW5oYXBweSBpZiB3ZSByZW1vdmUgdGhpcyBlbHNlXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgZGF0ZSA9IHByb3BzLmRhdGUsIG9uQ2xpY2tXZWVrTnVtYmVyXzIgPSBwcm9wcy5vbkNsaWNrV2Vla051bWJlciwgd2Vla051bWJlcl8yID0gcHJvcHMud2Vla051bWJlciwgb3RoZXJQcm9wcyA9IF9fcmVzdChwcm9wcywgW1wiZGF0ZVwiLCBcIm9uQ2xpY2tXZWVrTnVtYmVyXCIsIFwid2Vla051bWJlclwiXSk7XG4gICAgICAgIHJldHVybiAoX2pzeChcImRpdlwiLCBfX2Fzc2lnbih7fSwgb3RoZXJQcm9wcywgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgY2hpbGRyZW46IGNoaWxkcmVuIH0pKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldFllYXIsIGdldE1vbnRoLCBnZXREYXRlLCBnZXREYXlzSW5Nb250aCB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5pbXBvcnQgV2Vla051bWJlciBmcm9tICcuL1dlZWtOdW1iZXIuanMnO1xuaW1wb3J0IEZsZXggZnJvbSAnLi4vRmxleC5qcyc7XG5pbXBvcnQgeyBnZXRCZWdpbk9mV2VlaywgZ2V0RGF5T2ZXZWVrLCBnZXRXZWVrTnVtYmVyIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGVzLmpzJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdlZWtOdW1iZXJzKHByb3BzKSB7XG4gICAgdmFyIGFjdGl2ZVN0YXJ0RGF0ZSA9IHByb3BzLmFjdGl2ZVN0YXJ0RGF0ZSwgY2FsZW5kYXJUeXBlID0gcHJvcHMuY2FsZW5kYXJUeXBlLCBvbkNsaWNrV2Vla051bWJlciA9IHByb3BzLm9uQ2xpY2tXZWVrTnVtYmVyLCBvbk1vdXNlTGVhdmUgPSBwcm9wcy5vbk1vdXNlTGVhdmUsIHNob3dGaXhlZE51bWJlck9mV2Vla3MgPSBwcm9wcy5zaG93Rml4ZWROdW1iZXJPZldlZWtzO1xuICAgIHZhciBudW1iZXJPZldlZWtzID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNob3dGaXhlZE51bWJlck9mV2Vla3MpIHtcbiAgICAgICAgICAgIHJldHVybiA2O1xuICAgICAgICB9XG4gICAgICAgIHZhciBudW1iZXJPZkRheXMgPSBnZXREYXlzSW5Nb250aChhY3RpdmVTdGFydERhdGUpO1xuICAgICAgICB2YXIgc3RhcnRXZWVrZGF5ID0gZ2V0RGF5T2ZXZWVrKGFjdGl2ZVN0YXJ0RGF0ZSwgY2FsZW5kYXJUeXBlKTtcbiAgICAgICAgdmFyIGRheXMgPSBudW1iZXJPZkRheXMgLSAoNyAtIHN0YXJ0V2Vla2RheSk7XG4gICAgICAgIHJldHVybiAxICsgTWF0aC5jZWlsKGRheXMgLyA3KTtcbiAgICB9KSgpO1xuICAgIHZhciBkYXRlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB5ZWFyID0gZ2V0WWVhcihhY3RpdmVTdGFydERhdGUpO1xuICAgICAgICB2YXIgbW9udGhJbmRleCA9IGdldE1vbnRoKGFjdGl2ZVN0YXJ0RGF0ZSk7XG4gICAgICAgIHZhciBkYXkgPSBnZXREYXRlKGFjdGl2ZVN0YXJ0RGF0ZSk7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IG51bWJlck9mV2Vla3M7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGdldEJlZ2luT2ZXZWVrKG5ldyBEYXRlKHllYXIsIG1vbnRoSW5kZXgsIGRheSArIGluZGV4ICogNyksIGNhbGVuZGFyVHlwZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSkoKTtcbiAgICB2YXIgd2Vla051bWJlcnMgPSBkYXRlcy5tYXAoZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIGdldFdlZWtOdW1iZXIoZGF0ZSwgY2FsZW5kYXJUeXBlKTsgfSk7XG4gICAgcmV0dXJuIChfanN4KEZsZXgsIHsgY2xhc3NOYW1lOiBcInJlYWN0LWNhbGVuZGFyX19tb250aC12aWV3X193ZWVrTnVtYmVyc1wiLCBjb3VudDogbnVtYmVyT2ZXZWVrcywgZGlyZWN0aW9uOiBcImNvbHVtblwiLCBvbkZvY3VzOiBvbk1vdXNlTGVhdmUsIG9uTW91c2VPdmVyOiBvbk1vdXNlTGVhdmUsIHN0eWxlOiB7IGZsZXhCYXNpczogJ2NhbGMoMTAwJSAqICgxIC8gOCknLCBmbGV4U2hyaW5rOiAwIH0sIGNoaWxkcmVuOiB3ZWVrTnVtYmVycy5tYXAoZnVuY3Rpb24gKHdlZWtOdW1iZXIsIHdlZWtJbmRleCkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBkYXRlc1t3ZWVrSW5kZXhdO1xuICAgICAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRlIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKF9qc3goV2Vla051bWJlciwgeyBkYXRlOiBkYXRlLCBvbkNsaWNrV2Vla051bWJlcjogb25DbGlja1dlZWtOdW1iZXIsIHdlZWtOdW1iZXI6IHdlZWtOdW1iZXIgfSwgd2Vla051bWJlcikpO1xuICAgICAgICB9KSB9KSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IERheXMgZnJvbSAnLi9Nb250aFZpZXcvRGF5cy5qcyc7XG5pbXBvcnQgV2Vla2RheXMgZnJvbSAnLi9Nb250aFZpZXcvV2Vla2RheXMuanMnO1xuaW1wb3J0IFdlZWtOdW1iZXJzIGZyb20gJy4vTW9udGhWaWV3L1dlZWtOdW1iZXJzLmpzJztcbmltcG9ydCB7IENBTEVOREFSX1RZUEVTLCBDQUxFTkRBUl9UWVBFX0xPQ0FMRVMgfSBmcm9tICcuL3NoYXJlZC9jb25zdC5qcyc7XG5mdW5jdGlvbiBnZXRDYWxlbmRhclR5cGVGcm9tTG9jYWxlKGxvY2FsZSkge1xuICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5lbnRyaWVzKENBTEVOREFSX1RZUEVfTE9DQUxFUyk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgX2IgPSBfYVtfaV0sIGNhbGVuZGFyVHlwZSA9IF9iWzBdLCBsb2NhbGVzID0gX2JbMV07XG4gICAgICAgICAgICBpZiAobG9jYWxlcy5pbmNsdWRlcyhsb2NhbGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGVuZGFyVHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gQ0FMRU5EQVJfVFlQRVMuSVNPXzg2MDE7XG59XG4vKipcbiAqIERpc3BsYXlzIGEgZ2l2ZW4gbW9udGguXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1vbnRoVmlldyhwcm9wcykge1xuICAgIHZhciBhY3RpdmVTdGFydERhdGUgPSBwcm9wcy5hY3RpdmVTdGFydERhdGUsIGxvY2FsZSA9IHByb3BzLmxvY2FsZSwgb25Nb3VzZUxlYXZlID0gcHJvcHMub25Nb3VzZUxlYXZlLCBzaG93Rml4ZWROdW1iZXJPZldlZWtzID0gcHJvcHMuc2hvd0ZpeGVkTnVtYmVyT2ZXZWVrcztcbiAgICB2YXIgX2EgPSBwcm9wcy5jYWxlbmRhclR5cGUsIGNhbGVuZGFyVHlwZSA9IF9hID09PSB2b2lkIDAgPyBnZXRDYWxlbmRhclR5cGVGcm9tTG9jYWxlKGxvY2FsZSkgOiBfYSwgZm9ybWF0U2hvcnRXZWVrZGF5ID0gcHJvcHMuZm9ybWF0U2hvcnRXZWVrZGF5LCBmb3JtYXRXZWVrZGF5ID0gcHJvcHMuZm9ybWF0V2Vla2RheSwgb25DbGlja1dlZWtOdW1iZXIgPSBwcm9wcy5vbkNsaWNrV2Vla051bWJlciwgc2hvd1dlZWtOdW1iZXJzID0gcHJvcHMuc2hvd1dlZWtOdW1iZXJzLCBjaGlsZFByb3BzID0gX19yZXN0KHByb3BzLCBbXCJjYWxlbmRhclR5cGVcIiwgXCJmb3JtYXRTaG9ydFdlZWtkYXlcIiwgXCJmb3JtYXRXZWVrZGF5XCIsIFwib25DbGlja1dlZWtOdW1iZXJcIiwgXCJzaG93V2Vla051bWJlcnNcIl0pO1xuICAgIGZ1bmN0aW9uIHJlbmRlcldlZWtkYXlzKCkge1xuICAgICAgICByZXR1cm4gKF9qc3goV2Vla2RheXMsIHsgY2FsZW5kYXJUeXBlOiBjYWxlbmRhclR5cGUsIGZvcm1hdFNob3J0V2Vla2RheTogZm9ybWF0U2hvcnRXZWVrZGF5LCBmb3JtYXRXZWVrZGF5OiBmb3JtYXRXZWVrZGF5LCBsb2NhbGU6IGxvY2FsZSwgb25Nb3VzZUxlYXZlOiBvbk1vdXNlTGVhdmUgfSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJXZWVrTnVtYmVycygpIHtcbiAgICAgICAgaWYgKCFzaG93V2Vla051bWJlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoX2pzeChXZWVrTnVtYmVycywgeyBhY3RpdmVTdGFydERhdGU6IGFjdGl2ZVN0YXJ0RGF0ZSwgY2FsZW5kYXJUeXBlOiBjYWxlbmRhclR5cGUsIG9uQ2xpY2tXZWVrTnVtYmVyOiBvbkNsaWNrV2Vla051bWJlciwgb25Nb3VzZUxlYXZlOiBvbk1vdXNlTGVhdmUsIHNob3dGaXhlZE51bWJlck9mV2Vla3M6IHNob3dGaXhlZE51bWJlck9mV2Vla3MgfSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJEYXlzKCkge1xuICAgICAgICByZXR1cm4gX2pzeChEYXlzLCBfX2Fzc2lnbih7IGNhbGVuZGFyVHlwZTogY2FsZW5kYXJUeXBlIH0sIGNoaWxkUHJvcHMpKTtcbiAgICB9XG4gICAgdmFyIGNsYXNzTmFtZSA9ICdyZWFjdC1jYWxlbmRhcl9fbW9udGgtdmlldyc7XG4gICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbHN4KGNsYXNzTmFtZSwgc2hvd1dlZWtOdW1iZXJzID8gXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIi0td2Vla051bWJlcnNcIikgOiAnJyksIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdmbGV4LWVuZCcsXG4gICAgICAgICAgICB9LCBjaGlsZHJlbjogW3JlbmRlcldlZWtOdW1iZXJzKCksIF9qc3hzKFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhHcm93OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgfSwgY2hpbGRyZW46IFtyZW5kZXJXZWVrZGF5cygpLCByZW5kZXJEYXlzKCldIH0pXSB9KSB9KSk7XG59XG4iLCIndXNlIGNsaWVudCc7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGZvcndhcmRSZWYsIHVzZUNhbGxiYWNrLCB1c2VJbXBlcmF0aXZlSGFuZGxlLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IE5hdmlnYXRpb24gZnJvbSAnLi9DYWxlbmRhci9OYXZpZ2F0aW9uLmpzJztcbmltcG9ydCBDZW50dXJ5VmlldyBmcm9tICcuL0NlbnR1cnlWaWV3LmpzJztcbmltcG9ydCBEZWNhZGVWaWV3IGZyb20gJy4vRGVjYWRlVmlldy5qcyc7XG5pbXBvcnQgWWVhclZpZXcgZnJvbSAnLi9ZZWFyVmlldy5qcyc7XG5pbXBvcnQgTW9udGhWaWV3IGZyb20gJy4vTW9udGhWaWV3LmpzJztcbmltcG9ydCB7IGdldEJlZ2luLCBnZXRCZWdpbk5leHQsIGdldEVuZCwgZ2V0VmFsdWVSYW5nZSB9IGZyb20gJy4vc2hhcmVkL2RhdGVzLmpzJztcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuL3NoYXJlZC91dGlscy5qcyc7XG52YXIgYmFzZUNsYXNzTmFtZSA9ICdyZWFjdC1jYWxlbmRhcic7XG52YXIgYWxsVmlld3MgPSBbJ2NlbnR1cnknLCAnZGVjYWRlJywgJ3llYXInLCAnbW9udGgnXTtcbnZhciBhbGxWYWx1ZVR5cGVzID0gWydkZWNhZGUnLCAneWVhcicsICdtb250aCcsICdkYXknXTtcbnZhciBkZWZhdWx0TWluRGF0ZSA9IG5ldyBEYXRlKCk7XG5kZWZhdWx0TWluRGF0ZS5zZXRGdWxsWWVhcigxLCAwLCAxKTtcbmRlZmF1bHRNaW5EYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xudmFyIGRlZmF1bHRNYXhEYXRlID0gbmV3IERhdGUoOC42NGUxNSk7XG5mdW5jdGlvbiB0b0RhdGUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbn1cbi8qKlxuICogUmV0dXJucyB2aWV3cyBhcnJheSB3aXRoIGRpc2FsbG93ZWQgdmFsdWVzIGN1dCBvZmYuXG4gKi9cbmZ1bmN0aW9uIGdldExpbWl0ZWRWaWV3cyhtaW5EZXRhaWwsIG1heERldGFpbCkge1xuICAgIHJldHVybiBhbGxWaWV3cy5zbGljZShhbGxWaWV3cy5pbmRleE9mKG1pbkRldGFpbCksIGFsbFZpZXdzLmluZGV4T2YobWF4RGV0YWlsKSArIDEpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBnaXZlbiB2aWV3IGlzIGFsbG93ZWQgd2l0aCBjdXJyZW50bHkgYXBwbGllZCBzZXR0aW5ncy5cbiAqL1xuZnVuY3Rpb24gaXNWaWV3QWxsb3dlZCh2aWV3LCBtaW5EZXRhaWwsIG1heERldGFpbCkge1xuICAgIHZhciB2aWV3cyA9IGdldExpbWl0ZWRWaWV3cyhtaW5EZXRhaWwsIG1heERldGFpbCk7XG4gICAgcmV0dXJuIHZpZXdzLmluZGV4T2YodmlldykgIT09IC0xO1xufVxuLyoqXG4gKiBHZXRzIGVpdGhlciBwcm92aWRlZCB2aWV3IGlmIGFsbG93ZWQgYnkgbWluRGV0YWlsIGFuZCBtYXhEZXRhaWwsIG9yIGdldHNcbiAqIHRoZSBkZWZhdWx0IHZpZXcgaWYgbm90IGFsbG93ZWQuXG4gKi9cbmZ1bmN0aW9uIGdldFZpZXcodmlldywgbWluRGV0YWlsLCBtYXhEZXRhaWwpIHtcbiAgICBpZiAoIXZpZXcpIHtcbiAgICAgICAgcmV0dXJuIG1heERldGFpbDtcbiAgICB9XG4gICAgaWYgKGlzVmlld0FsbG93ZWQodmlldywgbWluRGV0YWlsLCBtYXhEZXRhaWwpKSB7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cbiAgICByZXR1cm4gbWF4RGV0YWlsO1xufVxuLyoqXG4gKiBSZXR1cm5zIHZhbHVlIHR5cGUgdGhhdCBjYW4gYmUgcmV0dXJuZWQgd2l0aCBjdXJyZW50bHkgYXBwbGllZCBzZXR0aW5ncy5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWVUeXBlKHZpZXcpIHtcbiAgICB2YXIgaW5kZXggPSBhbGxWaWV3cy5pbmRleE9mKHZpZXcpO1xuICAgIHJldHVybiBhbGxWYWx1ZVR5cGVzW2luZGV4XTtcbn1cbmZ1bmN0aW9uIGdldFZhbHVlKHZhbHVlLCBpbmRleCkge1xuICAgIHZhciByYXdWYWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWVbaW5kZXhdIDogdmFsdWU7XG4gICAgaWYgKCFyYXdWYWx1ZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIHZhbHVlRGF0ZSA9IHRvRGF0ZShyYXdWYWx1ZSk7XG4gICAgaWYgKE51bWJlci5pc05hTih2YWx1ZURhdGUuZ2V0VGltZSgpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGU6IFwiLmNvbmNhdCh2YWx1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVEYXRlO1xufVxuZnVuY3Rpb24gZ2V0RGV0YWlsVmFsdWUoX2EsIGluZGV4KSB7XG4gICAgdmFyIHZhbHVlID0gX2EudmFsdWUsIG1pbkRhdGUgPSBfYS5taW5EYXRlLCBtYXhEYXRlID0gX2EubWF4RGF0ZSwgbWF4RGV0YWlsID0gX2EubWF4RGV0YWlsO1xuICAgIHZhciB2YWx1ZVBpZWNlID0gZ2V0VmFsdWUodmFsdWUsIGluZGV4KTtcbiAgICBpZiAoIXZhbHVlUGllY2UpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciB2YWx1ZVR5cGUgPSBnZXRWYWx1ZVR5cGUobWF4RGV0YWlsKTtcbiAgICB2YXIgZGV0YWlsVmFsdWVGcm9tID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRCZWdpbih2YWx1ZVR5cGUsIHZhbHVlUGllY2UpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRFbmQodmFsdWVUeXBlLCB2YWx1ZVBpZWNlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbmRleCB2YWx1ZTogXCIuY29uY2F0KGluZGV4KSk7XG4gICAgICAgIH1cbiAgICB9KSgpO1xuICAgIHJldHVybiBiZXR3ZWVuKGRldGFpbFZhbHVlRnJvbSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG59XG52YXIgZ2V0RGV0YWlsVmFsdWVGcm9tID0gZnVuY3Rpb24gKGFyZ3MpIHsgcmV0dXJuIGdldERldGFpbFZhbHVlKGFyZ3MsIDApOyB9O1xudmFyIGdldERldGFpbFZhbHVlVG8gPSBmdW5jdGlvbiAoYXJncykgeyByZXR1cm4gZ2V0RGV0YWlsVmFsdWUoYXJncywgMSk7IH07XG52YXIgZ2V0RGV0YWlsVmFsdWVBcnJheSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgcmV0dXJuIFtnZXREZXRhaWxWYWx1ZUZyb20sIGdldERldGFpbFZhbHVlVG9dLm1hcChmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuKGFyZ3MpOyB9KTtcbn07XG5mdW5jdGlvbiBnZXRBY3RpdmVTdGFydERhdGUoX2EpIHtcbiAgICB2YXIgbWF4RGF0ZSA9IF9hLm1heERhdGUsIG1heERldGFpbCA9IF9hLm1heERldGFpbCwgbWluRGF0ZSA9IF9hLm1pbkRhdGUsIG1pbkRldGFpbCA9IF9hLm1pbkRldGFpbCwgdmFsdWUgPSBfYS52YWx1ZSwgdmlldyA9IF9hLnZpZXc7XG4gICAgdmFyIHJhbmdlVHlwZSA9IGdldFZpZXcodmlldywgbWluRGV0YWlsLCBtYXhEZXRhaWwpO1xuICAgIHZhciB2YWx1ZUZyb20gPSBnZXREZXRhaWxWYWx1ZUZyb20oe1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIG1pbkRhdGU6IG1pbkRhdGUsXG4gICAgICAgIG1heERhdGU6IG1heERhdGUsXG4gICAgICAgIG1heERldGFpbDogbWF4RGV0YWlsLFxuICAgIH0pIHx8IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIGdldEJlZ2luKHJhbmdlVHlwZSwgdmFsdWVGcm9tKTtcbn1cbmZ1bmN0aW9uIGdldEluaXRpYWxBY3RpdmVTdGFydERhdGUoX2EpIHtcbiAgICB2YXIgYWN0aXZlU3RhcnREYXRlID0gX2EuYWN0aXZlU3RhcnREYXRlLCBkZWZhdWx0QWN0aXZlU3RhcnREYXRlID0gX2EuZGVmYXVsdEFjdGl2ZVN0YXJ0RGF0ZSwgZGVmYXVsdFZhbHVlID0gX2EuZGVmYXVsdFZhbHVlLCBkZWZhdWx0VmlldyA9IF9hLmRlZmF1bHRWaWV3LCBtYXhEYXRlID0gX2EubWF4RGF0ZSwgbWF4RGV0YWlsID0gX2EubWF4RGV0YWlsLCBtaW5EYXRlID0gX2EubWluRGF0ZSwgbWluRGV0YWlsID0gX2EubWluRGV0YWlsLCB2YWx1ZSA9IF9hLnZhbHVlLCB2aWV3ID0gX2EudmlldztcbiAgICB2YXIgcmFuZ2VUeXBlID0gZ2V0Vmlldyh2aWV3LCBtaW5EZXRhaWwsIG1heERldGFpbCk7XG4gICAgdmFyIHZhbHVlRnJvbSA9IGFjdGl2ZVN0YXJ0RGF0ZSB8fCBkZWZhdWx0QWN0aXZlU3RhcnREYXRlO1xuICAgIGlmICh2YWx1ZUZyb20pIHtcbiAgICAgICAgcmV0dXJuIGdldEJlZ2luKHJhbmdlVHlwZSwgdmFsdWVGcm9tKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldEFjdGl2ZVN0YXJ0RGF0ZSh7XG4gICAgICAgIG1heERhdGU6IG1heERhdGUsXG4gICAgICAgIG1heERldGFpbDogbWF4RGV0YWlsLFxuICAgICAgICBtaW5EYXRlOiBtaW5EYXRlLFxuICAgICAgICBtaW5EZXRhaWw6IG1pbkRldGFpbCxcbiAgICAgICAgdmFsdWU6IHZhbHVlIHx8IGRlZmF1bHRWYWx1ZSxcbiAgICAgICAgdmlldzogdmlldyB8fCBkZWZhdWx0VmlldyxcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldElzU2luZ2xlVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggPT09IDEpO1xufVxuZnVuY3Rpb24gYXJlRGF0ZXNFcXVhbChkYXRlMSwgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGF0ZTEgaW5zdGFuY2VvZiBEYXRlICYmIGRhdGUyIGluc3RhbmNlb2YgRGF0ZSAmJiBkYXRlMS5nZXRUaW1lKCkgPT09IGRhdGUyLmdldFRpbWUoKTtcbn1cbnZhciBDYWxlbmRhciA9IGZvcndhcmRSZWYoZnVuY3Rpb24gQ2FsZW5kYXIocHJvcHMsIHJlZikge1xuICAgIHZhciBhY3RpdmVTdGFydERhdGVQcm9wcyA9IHByb3BzLmFjdGl2ZVN0YXJ0RGF0ZSwgYWxsb3dQYXJ0aWFsUmFuZ2UgPSBwcm9wcy5hbGxvd1BhcnRpYWxSYW5nZSwgY2FsZW5kYXJUeXBlID0gcHJvcHMuY2FsZW5kYXJUeXBlLCBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsIGRlZmF1bHRBY3RpdmVTdGFydERhdGUgPSBwcm9wcy5kZWZhdWx0QWN0aXZlU3RhcnREYXRlLCBkZWZhdWx0VmFsdWUgPSBwcm9wcy5kZWZhdWx0VmFsdWUsIGRlZmF1bHRWaWV3ID0gcHJvcHMuZGVmYXVsdFZpZXcsIGZvcm1hdERheSA9IHByb3BzLmZvcm1hdERheSwgZm9ybWF0TG9uZ0RhdGUgPSBwcm9wcy5mb3JtYXRMb25nRGF0ZSwgZm9ybWF0TW9udGggPSBwcm9wcy5mb3JtYXRNb250aCwgZm9ybWF0TW9udGhZZWFyID0gcHJvcHMuZm9ybWF0TW9udGhZZWFyLCBmb3JtYXRTaG9ydFdlZWtkYXkgPSBwcm9wcy5mb3JtYXRTaG9ydFdlZWtkYXksIGZvcm1hdFdlZWtkYXkgPSBwcm9wcy5mb3JtYXRXZWVrZGF5LCBmb3JtYXRZZWFyID0gcHJvcHMuZm9ybWF0WWVhciwgX2EgPSBwcm9wcy5nb1RvUmFuZ2VTdGFydE9uU2VsZWN0LCBnb1RvUmFuZ2VTdGFydE9uU2VsZWN0ID0gX2EgPT09IHZvaWQgMCA/IHRydWUgOiBfYSwgaW5wdXRSZWYgPSBwcm9wcy5pbnB1dFJlZiwgbG9jYWxlID0gcHJvcHMubG9jYWxlLCBfYiA9IHByb3BzLm1heERhdGUsIG1heERhdGUgPSBfYiA9PT0gdm9pZCAwID8gZGVmYXVsdE1heERhdGUgOiBfYiwgX2MgPSBwcm9wcy5tYXhEZXRhaWwsIG1heERldGFpbCA9IF9jID09PSB2b2lkIDAgPyAnbW9udGgnIDogX2MsIF9kID0gcHJvcHMubWluRGF0ZSwgbWluRGF0ZSA9IF9kID09PSB2b2lkIDAgPyBkZWZhdWx0TWluRGF0ZSA6IF9kLCBfZSA9IHByb3BzLm1pbkRldGFpbCwgbWluRGV0YWlsID0gX2UgPT09IHZvaWQgMCA/ICdjZW50dXJ5JyA6IF9lLCBuYXZpZ2F0aW9uQXJpYUxhYmVsID0gcHJvcHMubmF2aWdhdGlvbkFyaWFMYWJlbCwgbmF2aWdhdGlvbkFyaWFMaXZlID0gcHJvcHMubmF2aWdhdGlvbkFyaWFMaXZlLCBuYXZpZ2F0aW9uTGFiZWwgPSBwcm9wcy5uYXZpZ2F0aW9uTGFiZWwsIG5leHQyQXJpYUxhYmVsID0gcHJvcHMubmV4dDJBcmlhTGFiZWwsIG5leHQyTGFiZWwgPSBwcm9wcy5uZXh0MkxhYmVsLCBuZXh0QXJpYUxhYmVsID0gcHJvcHMubmV4dEFyaWFMYWJlbCwgbmV4dExhYmVsID0gcHJvcHMubmV4dExhYmVsLCBvbkFjdGl2ZVN0YXJ0RGF0ZUNoYW5nZSA9IHByb3BzLm9uQWN0aXZlU3RhcnREYXRlQ2hhbmdlLCBvbkNoYW5nZVByb3BzID0gcHJvcHMub25DaGFuZ2UsIG9uQ2xpY2tEYXkgPSBwcm9wcy5vbkNsaWNrRGF5LCBvbkNsaWNrRGVjYWRlID0gcHJvcHMub25DbGlja0RlY2FkZSwgb25DbGlja01vbnRoID0gcHJvcHMub25DbGlja01vbnRoLCBvbkNsaWNrV2Vla051bWJlciA9IHByb3BzLm9uQ2xpY2tXZWVrTnVtYmVyLCBvbkNsaWNrWWVhciA9IHByb3BzLm9uQ2xpY2tZZWFyLCBvbkRyaWxsRG93biA9IHByb3BzLm9uRHJpbGxEb3duLCBvbkRyaWxsVXAgPSBwcm9wcy5vbkRyaWxsVXAsIG9uVmlld0NoYW5nZSA9IHByb3BzLm9uVmlld0NoYW5nZSwgcHJldjJBcmlhTGFiZWwgPSBwcm9wcy5wcmV2MkFyaWFMYWJlbCwgcHJldjJMYWJlbCA9IHByb3BzLnByZXYyTGFiZWwsIHByZXZBcmlhTGFiZWwgPSBwcm9wcy5wcmV2QXJpYUxhYmVsLCBwcmV2TGFiZWwgPSBwcm9wcy5wcmV2TGFiZWwsIF9mID0gcHJvcHMucmV0dXJuVmFsdWUsIHJldHVyblZhbHVlID0gX2YgPT09IHZvaWQgMCA/ICdzdGFydCcgOiBfZiwgc2VsZWN0UmFuZ2UgPSBwcm9wcy5zZWxlY3RSYW5nZSwgc2hvd0RvdWJsZVZpZXcgPSBwcm9wcy5zaG93RG91YmxlVmlldywgc2hvd0ZpeGVkTnVtYmVyT2ZXZWVrcyA9IHByb3BzLnNob3dGaXhlZE51bWJlck9mV2Vla3MsIF9nID0gcHJvcHMuc2hvd05hdmlnYXRpb24sIHNob3dOYXZpZ2F0aW9uID0gX2cgPT09IHZvaWQgMCA/IHRydWUgOiBfZywgc2hvd05laWdoYm9yaW5nQ2VudHVyeSA9IHByb3BzLnNob3dOZWlnaGJvcmluZ0NlbnR1cnksIHNob3dOZWlnaGJvcmluZ0RlY2FkZSA9IHByb3BzLnNob3dOZWlnaGJvcmluZ0RlY2FkZSwgX2ggPSBwcm9wcy5zaG93TmVpZ2hib3JpbmdNb250aCwgc2hvd05laWdoYm9yaW5nTW9udGggPSBfaCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9oLCBzaG93V2Vla051bWJlcnMgPSBwcm9wcy5zaG93V2Vla051bWJlcnMsIHRpbGVDbGFzc05hbWUgPSBwcm9wcy50aWxlQ2xhc3NOYW1lLCB0aWxlQ29udGVudCA9IHByb3BzLnRpbGVDb250ZW50LCB0aWxlRGlzYWJsZWQgPSBwcm9wcy50aWxlRGlzYWJsZWQsIHZhbHVlUHJvcHMgPSBwcm9wcy52YWx1ZSwgdmlld1Byb3BzID0gcHJvcHMudmlldztcbiAgICB2YXIgX2ogPSB1c2VTdGF0ZShkZWZhdWx0QWN0aXZlU3RhcnREYXRlKSwgYWN0aXZlU3RhcnREYXRlU3RhdGUgPSBfalswXSwgc2V0QWN0aXZlU3RhcnREYXRlU3RhdGUgPSBfalsxXTtcbiAgICB2YXIgX2sgPSB1c2VTdGF0ZShudWxsKSwgaG92ZXJTdGF0ZSA9IF9rWzBdLCBzZXRIb3ZlclN0YXRlID0gX2tbMV07XG4gICAgdmFyIF9sID0gdXNlU3RhdGUoQXJyYXkuaXNBcnJheShkZWZhdWx0VmFsdWUpXG4gICAgICAgID8gZGVmYXVsdFZhbHVlLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIChlbCAhPT0gbnVsbCA/IHRvRGF0ZShlbCkgOiBudWxsKTsgfSlcbiAgICAgICAgOiBkZWZhdWx0VmFsdWUgIT09IG51bGwgJiYgZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdG9EYXRlKGRlZmF1bHRWYWx1ZSlcbiAgICAgICAgICAgIDogbnVsbCksIHZhbHVlU3RhdGUgPSBfbFswXSwgc2V0VmFsdWVTdGF0ZSA9IF9sWzFdO1xuICAgIHZhciBfbSA9IHVzZVN0YXRlKGRlZmF1bHRWaWV3KSwgdmlld1N0YXRlID0gX21bMF0sIHNldFZpZXdTdGF0ZSA9IF9tWzFdO1xuICAgIHZhciBhY3RpdmVTdGFydERhdGUgPSBhY3RpdmVTdGFydERhdGVQcm9wcyB8fFxuICAgICAgICBhY3RpdmVTdGFydERhdGVTdGF0ZSB8fFxuICAgICAgICBnZXRJbml0aWFsQWN0aXZlU3RhcnREYXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZVN0YXJ0RGF0ZTogYWN0aXZlU3RhcnREYXRlUHJvcHMsXG4gICAgICAgICAgICBkZWZhdWx0QWN0aXZlU3RhcnREYXRlOiBkZWZhdWx0QWN0aXZlU3RhcnREYXRlLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0VmFsdWUsXG4gICAgICAgICAgICBkZWZhdWx0VmlldzogZGVmYXVsdFZpZXcsXG4gICAgICAgICAgICBtYXhEYXRlOiBtYXhEYXRlLFxuICAgICAgICAgICAgbWF4RGV0YWlsOiBtYXhEZXRhaWwsXG4gICAgICAgICAgICBtaW5EYXRlOiBtaW5EYXRlLFxuICAgICAgICAgICAgbWluRGV0YWlsOiBtaW5EZXRhaWwsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVQcm9wcyxcbiAgICAgICAgICAgIHZpZXc6IHZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgdmFyIHZhbHVlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhd1ZhbHVlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIEluIHRoZSBtaWRkbGUgb2YgcmFuZ2Ugc2VsZWN0aW9uLCB1c2UgdmFsdWUgZnJvbSBzdGF0ZVxuICAgICAgICAgICAgaWYgKHNlbGVjdFJhbmdlICYmIGdldElzU2luZ2xlVmFsdWUodmFsdWVTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVTdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVByb3BzICE9PSB1bmRlZmluZWQgPyB2YWx1ZVByb3BzIDogdmFsdWVTdGF0ZTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgaWYgKCFyYXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocmF3VmFsdWUpXG4gICAgICAgICAgICA/IHJhd1ZhbHVlLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIChlbCAhPT0gbnVsbCA/IHRvRGF0ZShlbCkgOiBudWxsKTsgfSlcbiAgICAgICAgICAgIDogcmF3VmFsdWUgIT09IG51bGxcbiAgICAgICAgICAgICAgICA/IHRvRGF0ZShyYXdWYWx1ZSlcbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgfSkoKTtcbiAgICB2YXIgdmFsdWVUeXBlID0gZ2V0VmFsdWVUeXBlKG1heERldGFpbCk7XG4gICAgdmFyIHZpZXcgPSBnZXRWaWV3KHZpZXdQcm9wcyB8fCB2aWV3U3RhdGUsIG1pbkRldGFpbCwgbWF4RGV0YWlsKTtcbiAgICB2YXIgdmlld3MgPSBnZXRMaW1pdGVkVmlld3MobWluRGV0YWlsLCBtYXhEZXRhaWwpO1xuICAgIHZhciBob3ZlciA9IHNlbGVjdFJhbmdlID8gaG92ZXJTdGF0ZSA6IG51bGw7XG4gICAgdmFyIGRyaWxsRG93bkF2YWlsYWJsZSA9IHZpZXdzLmluZGV4T2YodmlldykgPCB2aWV3cy5sZW5ndGggLSAxO1xuICAgIHZhciBkcmlsbFVwQXZhaWxhYmxlID0gdmlld3MuaW5kZXhPZih2aWV3KSA+IDA7XG4gICAgdmFyIGdldFByb2Nlc3NlZFZhbHVlID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBwcm9jZXNzRnVuY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3dpdGNoIChyZXR1cm5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldERldGFpbFZhbHVlRnJvbTtcbiAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGV0YWlsVmFsdWVUbztcbiAgICAgICAgICAgICAgICBjYXNlICdyYW5nZSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXREZXRhaWxWYWx1ZUFycmF5O1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCByZXR1cm5WYWx1ZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NGdW5jdGlvbih7XG4gICAgICAgICAgICBtYXhEYXRlOiBtYXhEYXRlLFxuICAgICAgICAgICAgbWF4RGV0YWlsOiBtYXhEZXRhaWwsXG4gICAgICAgICAgICBtaW5EYXRlOiBtaW5EYXRlLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICB9KTtcbiAgICB9LCBbbWF4RGF0ZSwgbWF4RGV0YWlsLCBtaW5EYXRlLCByZXR1cm5WYWx1ZV0pO1xuICAgIHZhciBzZXRBY3RpdmVTdGFydERhdGUgPSB1c2VDYWxsYmFjayhmdW5jdGlvbiAobmV4dEFjdGl2ZVN0YXJ0RGF0ZSwgYWN0aW9uKSB7XG4gICAgICAgIHNldEFjdGl2ZVN0YXJ0RGF0ZVN0YXRlKG5leHRBY3RpdmVTdGFydERhdGUpO1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgYWN0aXZlU3RhcnREYXRlOiBuZXh0QWN0aXZlU3RhcnREYXRlLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgdmlldzogdmlldyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG9uQWN0aXZlU3RhcnREYXRlQ2hhbmdlICYmICFhcmVEYXRlc0VxdWFsKGFjdGl2ZVN0YXJ0RGF0ZSwgbmV4dEFjdGl2ZVN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgICAgIG9uQWN0aXZlU3RhcnREYXRlQ2hhbmdlKGFyZ3MpO1xuICAgICAgICB9XG4gICAgfSwgW2FjdGl2ZVN0YXJ0RGF0ZSwgb25BY3RpdmVTdGFydERhdGVDaGFuZ2UsIHZhbHVlLCB2aWV3XSk7XG4gICAgdmFyIG9uQ2xpY2tUaWxlID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKHZhbHVlLCBldmVudCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3dpdGNoICh2aWV3KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2VudHVyeSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvbkNsaWNrRGVjYWRlO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvbkNsaWNrWWVhcjtcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9uQ2xpY2tNb250aDtcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvbkNsaWNrRGF5O1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmlldzogXCIuY29uY2F0KHZpZXcsIFwiLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlLCBldmVudCk7XG4gICAgfSwgW29uQ2xpY2tEYXksIG9uQ2xpY2tEZWNhZGUsIG9uQ2xpY2tNb250aCwgb25DbGlja1llYXIsIHZpZXddKTtcbiAgICB2YXIgZHJpbGxEb3duID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKG5leHRBY3RpdmVTdGFydERhdGUsIGV2ZW50KSB7XG4gICAgICAgIGlmICghZHJpbGxEb3duQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb25DbGlja1RpbGUobmV4dEFjdGl2ZVN0YXJ0RGF0ZSwgZXZlbnQpO1xuICAgICAgICB2YXIgbmV4dFZpZXcgPSB2aWV3c1t2aWV3cy5pbmRleE9mKHZpZXcpICsgMV07XG4gICAgICAgIGlmICghbmV4dFZpZXcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGVkIHRvIGRyaWxsIGRvd24gZnJvbSB0aGUgbG93ZXN0IHZpZXcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0QWN0aXZlU3RhcnREYXRlU3RhdGUobmV4dEFjdGl2ZVN0YXJ0RGF0ZSk7XG4gICAgICAgIHNldFZpZXdTdGF0ZShuZXh0Vmlldyk7XG4gICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgYWN0aW9uOiAnZHJpbGxEb3duJyxcbiAgICAgICAgICAgIGFjdGl2ZVN0YXJ0RGF0ZTogbmV4dEFjdGl2ZVN0YXJ0RGF0ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIHZpZXc6IG5leHRWaWV3LFxuICAgICAgICB9O1xuICAgICAgICBpZiAob25BY3RpdmVTdGFydERhdGVDaGFuZ2UgJiYgIWFyZURhdGVzRXF1YWwoYWN0aXZlU3RhcnREYXRlLCBuZXh0QWN0aXZlU3RhcnREYXRlKSkge1xuICAgICAgICAgICAgb25BY3RpdmVTdGFydERhdGVDaGFuZ2UoYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uVmlld0NoYW5nZSAmJiB2aWV3ICE9PSBuZXh0Vmlldykge1xuICAgICAgICAgICAgb25WaWV3Q2hhbmdlKGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbkRyaWxsRG93bikge1xuICAgICAgICAgICAgb25EcmlsbERvd24oYXJncyk7XG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIGFjdGl2ZVN0YXJ0RGF0ZSxcbiAgICAgICAgZHJpbGxEb3duQXZhaWxhYmxlLFxuICAgICAgICBvbkFjdGl2ZVN0YXJ0RGF0ZUNoYW5nZSxcbiAgICAgICAgb25DbGlja1RpbGUsXG4gICAgICAgIG9uRHJpbGxEb3duLFxuICAgICAgICBvblZpZXdDaGFuZ2UsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICB2aWV3LFxuICAgICAgICB2aWV3cyxcbiAgICBdKTtcbiAgICB2YXIgZHJpbGxVcCA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkcmlsbFVwQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5leHRWaWV3ID0gdmlld3Nbdmlld3MuaW5kZXhPZih2aWV3KSAtIDFdO1xuICAgICAgICBpZiAoIW5leHRWaWV3KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byBkcmlsbCB1cCBmcm9tIHRoZSBoaWdoZXN0IHZpZXcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5leHRBY3RpdmVTdGFydERhdGUgPSBnZXRCZWdpbihuZXh0VmlldywgYWN0aXZlU3RhcnREYXRlKTtcbiAgICAgICAgc2V0QWN0aXZlU3RhcnREYXRlU3RhdGUobmV4dEFjdGl2ZVN0YXJ0RGF0ZSk7XG4gICAgICAgIHNldFZpZXdTdGF0ZShuZXh0Vmlldyk7XG4gICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgYWN0aW9uOiAnZHJpbGxVcCcsXG4gICAgICAgICAgICBhY3RpdmVTdGFydERhdGU6IG5leHRBY3RpdmVTdGFydERhdGUsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICB2aWV3OiBuZXh0VmlldyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG9uQWN0aXZlU3RhcnREYXRlQ2hhbmdlICYmICFhcmVEYXRlc0VxdWFsKGFjdGl2ZVN0YXJ0RGF0ZSwgbmV4dEFjdGl2ZVN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgICAgIG9uQWN0aXZlU3RhcnREYXRlQ2hhbmdlKGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvblZpZXdDaGFuZ2UgJiYgdmlldyAhPT0gbmV4dFZpZXcpIHtcbiAgICAgICAgICAgIG9uVmlld0NoYW5nZShhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob25EcmlsbFVwKSB7XG4gICAgICAgICAgICBvbkRyaWxsVXAoYXJncyk7XG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIGFjdGl2ZVN0YXJ0RGF0ZSxcbiAgICAgICAgZHJpbGxVcEF2YWlsYWJsZSxcbiAgICAgICAgb25BY3RpdmVTdGFydERhdGVDaGFuZ2UsXG4gICAgICAgIG9uRHJpbGxVcCxcbiAgICAgICAgb25WaWV3Q2hhbmdlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgdmlldyxcbiAgICAgICAgdmlld3MsXG4gICAgXSk7XG4gICAgdmFyIG9uQ2hhbmdlID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKHJhd05leHRWYWx1ZSwgZXZlbnQpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgb25DbGlja1RpbGUocmF3TmV4dFZhbHVlLCBldmVudCk7XG4gICAgICAgIHZhciBpc0ZpcnN0VmFsdWVJblJhbmdlID0gc2VsZWN0UmFuZ2UgJiYgIWdldElzU2luZ2xlVmFsdWUocHJldmlvdXNWYWx1ZSk7XG4gICAgICAgIHZhciBuZXh0VmFsdWU7XG4gICAgICAgIGlmIChzZWxlY3RSYW5nZSkge1xuICAgICAgICAgICAgLy8gUmFuZ2Ugc2VsZWN0aW9uIHR1cm5lZCBvblxuICAgICAgICAgICAgaWYgKGlzRmlyc3RWYWx1ZUluUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAvLyBWYWx1ZSBoYXMgMCBvciAyIGVsZW1lbnRzIC0gZWl0aGVyIHdheSB3ZSdyZSBzdGFydGluZyBhIG5ldyBhcnJheVxuICAgICAgICAgICAgICAgIC8vIEZpcnN0IHZhbHVlXG4gICAgICAgICAgICAgICAgbmV4dFZhbHVlID0gZ2V0QmVnaW4odmFsdWVUeXBlLCByYXdOZXh0VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJldmlvdXNWYWx1ZSBpcyByZXF1aXJlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcmV2aW91c1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzVmFsdWUgbXVzdCBub3QgYmUgYW4gYXJyYXknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU2Vjb25kIHZhbHVlXG4gICAgICAgICAgICAgICAgbmV4dFZhbHVlID0gZ2V0VmFsdWVSYW5nZSh2YWx1ZVR5cGUsIHByZXZpb3VzVmFsdWUsIHJhd05leHRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSYW5nZSBzZWxlY3Rpb24gdHVybmVkIG9mZlxuICAgICAgICAgICAgbmV4dFZhbHVlID0gZ2V0UHJvY2Vzc2VkVmFsdWUocmF3TmV4dFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV4dEFjdGl2ZVN0YXJ0RGF0ZSA9IFxuICAgICAgICAvLyBSYW5nZSBzZWxlY3Rpb24gdHVybmVkIG9mZlxuICAgICAgICAhc2VsZWN0UmFuZ2UgfHxcbiAgICAgICAgICAgIC8vIFJhbmdlIHNlbGVjdGlvbiB0dXJuZWQgb24sIGZpcnN0IHZhbHVlXG4gICAgICAgICAgICBpc0ZpcnN0VmFsdWVJblJhbmdlIHx8XG4gICAgICAgICAgICAvLyBSYW5nZSBzZWxlY3Rpb24gdHVybmVkIG9uLCBzZWNvbmQgdmFsdWUsIGdvVG9SYW5nZVN0YXJ0T25TZWxlY3QgdG9nZ2xlZCBvblxuICAgICAgICAgICAgZ29Ub1JhbmdlU3RhcnRPblNlbGVjdFxuICAgICAgICAgICAgPyBnZXRBY3RpdmVTdGFydERhdGUoe1xuICAgICAgICAgICAgICAgIG1heERhdGU6IG1heERhdGUsXG4gICAgICAgICAgICAgICAgbWF4RGV0YWlsOiBtYXhEZXRhaWwsXG4gICAgICAgICAgICAgICAgbWluRGF0ZTogbWluRGF0ZSxcbiAgICAgICAgICAgICAgICBtaW5EZXRhaWw6IG1pbkRldGFpbCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmV4dFZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IHZpZXcsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgIHNldEFjdGl2ZVN0YXJ0RGF0ZVN0YXRlKG5leHRBY3RpdmVTdGFydERhdGUpO1xuICAgICAgICBzZXRWYWx1ZVN0YXRlKG5leHRWYWx1ZSk7XG4gICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgYWN0aW9uOiAnb25DaGFuZ2UnLFxuICAgICAgICAgICAgYWN0aXZlU3RhcnREYXRlOiBuZXh0QWN0aXZlU3RhcnREYXRlLFxuICAgICAgICAgICAgdmFsdWU6IG5leHRWYWx1ZSxcbiAgICAgICAgICAgIHZpZXc6IHZpZXcsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChvbkFjdGl2ZVN0YXJ0RGF0ZUNoYW5nZSAmJiAhYXJlRGF0ZXNFcXVhbChhY3RpdmVTdGFydERhdGUsIG5leHRBY3RpdmVTdGFydERhdGUpKSB7XG4gICAgICAgICAgICBvbkFjdGl2ZVN0YXJ0RGF0ZUNoYW5nZShhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob25DaGFuZ2VQcm9wcykge1xuICAgICAgICAgICAgaWYgKHNlbGVjdFJhbmdlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzU2luZ2xlVmFsdWUgPSBnZXRJc1NpbmdsZVZhbHVlKG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1NpbmdsZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlUHJvcHMobmV4dFZhbHVlIHx8IG51bGwsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYWxsb3dQYXJ0aWFsUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmV4dFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd2YWx1ZSBtdXN0IG5vdCBiZSBhbiBhcnJheScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlUHJvcHMoW25leHRWYWx1ZSB8fCBudWxsLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9uQ2hhbmdlUHJvcHMobmV4dFZhbHVlIHx8IG51bGwsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtcbiAgICAgICAgYWN0aXZlU3RhcnREYXRlLFxuICAgICAgICBhbGxvd1BhcnRpYWxSYW5nZSxcbiAgICAgICAgZ2V0UHJvY2Vzc2VkVmFsdWUsXG4gICAgICAgIGdvVG9SYW5nZVN0YXJ0T25TZWxlY3QsXG4gICAgICAgIG1heERhdGUsXG4gICAgICAgIG1heERldGFpbCxcbiAgICAgICAgbWluRGF0ZSxcbiAgICAgICAgbWluRGV0YWlsLFxuICAgICAgICBvbkFjdGl2ZVN0YXJ0RGF0ZUNoYW5nZSxcbiAgICAgICAgb25DaGFuZ2VQcm9wcyxcbiAgICAgICAgb25DbGlja1RpbGUsXG4gICAgICAgIHNlbGVjdFJhbmdlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgdmFsdWVUeXBlLFxuICAgICAgICB2aWV3LFxuICAgIF0pO1xuICAgIGZ1bmN0aW9uIG9uTW91c2VPdmVyKG5leHRIb3Zlcikge1xuICAgICAgICBzZXRIb3ZlclN0YXRlKG5leHRIb3Zlcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgc2V0SG92ZXJTdGF0ZShudWxsKTtcbiAgICB9XG4gICAgdXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsIGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7XG4gICAgICAgIGFjdGl2ZVN0YXJ0RGF0ZTogYWN0aXZlU3RhcnREYXRlLFxuICAgICAgICBkcmlsbERvd246IGRyaWxsRG93bixcbiAgICAgICAgZHJpbGxVcDogZHJpbGxVcCxcbiAgICAgICAgb25DaGFuZ2U6IG9uQ2hhbmdlLFxuICAgICAgICBzZXRBY3RpdmVTdGFydERhdGU6IHNldEFjdGl2ZVN0YXJ0RGF0ZSxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICB2aWV3OiB2aWV3LFxuICAgIH0pOyB9LCBbYWN0aXZlU3RhcnREYXRlLCBkcmlsbERvd24sIGRyaWxsVXAsIG9uQ2hhbmdlLCBzZXRBY3RpdmVTdGFydERhdGUsIHZhbHVlLCB2aWV3XSk7XG4gICAgZnVuY3Rpb24gcmVuZGVyQ29udGVudChuZXh0KSB7XG4gICAgICAgIHZhciBjdXJyZW50QWN0aXZlU3RhcnREYXRlID0gbmV4dFxuICAgICAgICAgICAgPyBnZXRCZWdpbk5leHQodmlldywgYWN0aXZlU3RhcnREYXRlKVxuICAgICAgICAgICAgOiBnZXRCZWdpbih2aWV3LCBhY3RpdmVTdGFydERhdGUpO1xuICAgICAgICB2YXIgb25DbGljayA9IGRyaWxsRG93bkF2YWlsYWJsZSA/IGRyaWxsRG93biA6IG9uQ2hhbmdlO1xuICAgICAgICB2YXIgY29tbW9uUHJvcHMgPSB7XG4gICAgICAgICAgICBhY3RpdmVTdGFydERhdGU6IGN1cnJlbnRBY3RpdmVTdGFydERhdGUsXG4gICAgICAgICAgICBob3ZlcjogaG92ZXIsXG4gICAgICAgICAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgICAgIG1heERhdGU6IG1heERhdGUsXG4gICAgICAgICAgICBtaW5EYXRlOiBtaW5EYXRlLFxuICAgICAgICAgICAgb25DbGljazogb25DbGljayxcbiAgICAgICAgICAgIG9uTW91c2VPdmVyOiBzZWxlY3RSYW5nZSA/IG9uTW91c2VPdmVyIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGlsZUNsYXNzTmFtZTogdGlsZUNsYXNzTmFtZSxcbiAgICAgICAgICAgIHRpbGVDb250ZW50OiB0aWxlQ29udGVudCxcbiAgICAgICAgICAgIHRpbGVEaXNhYmxlZDogdGlsZURpc2FibGVkLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgdmFsdWVUeXBlOiB2YWx1ZVR5cGUsXG4gICAgICAgIH07XG4gICAgICAgIHN3aXRjaCAodmlldykge1xuICAgICAgICAgICAgY2FzZSAnY2VudHVyeSc6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9qc3goQ2VudHVyeVZpZXcsIF9fYXNzaWduKHsgZm9ybWF0WWVhcjogZm9ybWF0WWVhciwgc2hvd05laWdoYm9yaW5nQ2VudHVyeTogc2hvd05laWdoYm9yaW5nQ2VudHVyeSB9LCBjb21tb25Qcm9wcykpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2RlY2FkZSc6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9qc3goRGVjYWRlVmlldywgX19hc3NpZ24oeyBmb3JtYXRZZWFyOiBmb3JtYXRZZWFyLCBzaG93TmVpZ2hib3JpbmdEZWNhZGU6IHNob3dOZWlnaGJvcmluZ0RlY2FkZSB9LCBjb21tb25Qcm9wcykpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3llYXInOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfanN4KFllYXJWaWV3LCBfX2Fzc2lnbih7IGZvcm1hdE1vbnRoOiBmb3JtYXRNb250aCwgZm9ybWF0TW9udGhZZWFyOiBmb3JtYXRNb250aFllYXIgfSwgY29tbW9uUHJvcHMpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdtb250aCc6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9qc3goTW9udGhWaWV3LCBfX2Fzc2lnbih7IGNhbGVuZGFyVHlwZTogY2FsZW5kYXJUeXBlLCBmb3JtYXREYXk6IGZvcm1hdERheSwgZm9ybWF0TG9uZ0RhdGU6IGZvcm1hdExvbmdEYXRlLCBmb3JtYXRTaG9ydFdlZWtkYXk6IGZvcm1hdFNob3J0V2Vla2RheSwgZm9ybWF0V2Vla2RheTogZm9ybWF0V2Vla2RheSwgb25DbGlja1dlZWtOdW1iZXI6IG9uQ2xpY2tXZWVrTnVtYmVyLCBvbk1vdXNlTGVhdmU6IHNlbGVjdFJhbmdlID8gb25Nb3VzZUxlYXZlIDogdW5kZWZpbmVkLCBzaG93Rml4ZWROdW1iZXJPZldlZWtzOiB0eXBlb2Ygc2hvd0ZpeGVkTnVtYmVyT2ZXZWVrcyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2hvd0ZpeGVkTnVtYmVyT2ZXZWVrc1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBzaG93RG91YmxlVmlldywgc2hvd05laWdoYm9yaW5nTW9udGg6IHNob3dOZWlnaGJvcmluZ01vbnRoLCBzaG93V2Vla051bWJlcnM6IHNob3dXZWVrTnVtYmVycyB9LCBjb21tb25Qcm9wcykpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2aWV3OiBcIi5jb25jYXQodmlldywgXCIuXCIpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJOYXZpZ2F0aW9uKCkge1xuICAgICAgICBpZiAoIXNob3dOYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKF9qc3goTmF2aWdhdGlvbiwgeyBhY3RpdmVTdGFydERhdGU6IGFjdGl2ZVN0YXJ0RGF0ZSwgZHJpbGxVcDogZHJpbGxVcCwgZm9ybWF0TW9udGhZZWFyOiBmb3JtYXRNb250aFllYXIsIGZvcm1hdFllYXI6IGZvcm1hdFllYXIsIGxvY2FsZTogbG9jYWxlLCBtYXhEYXRlOiBtYXhEYXRlLCBtaW5EYXRlOiBtaW5EYXRlLCBuYXZpZ2F0aW9uQXJpYUxhYmVsOiBuYXZpZ2F0aW9uQXJpYUxhYmVsLCBuYXZpZ2F0aW9uQXJpYUxpdmU6IG5hdmlnYXRpb25BcmlhTGl2ZSwgbmF2aWdhdGlvbkxhYmVsOiBuYXZpZ2F0aW9uTGFiZWwsIG5leHQyQXJpYUxhYmVsOiBuZXh0MkFyaWFMYWJlbCwgbmV4dDJMYWJlbDogbmV4dDJMYWJlbCwgbmV4dEFyaWFMYWJlbDogbmV4dEFyaWFMYWJlbCwgbmV4dExhYmVsOiBuZXh0TGFiZWwsIHByZXYyQXJpYUxhYmVsOiBwcmV2MkFyaWFMYWJlbCwgcHJldjJMYWJlbDogcHJldjJMYWJlbCwgcHJldkFyaWFMYWJlbDogcHJldkFyaWFMYWJlbCwgcHJldkxhYmVsOiBwcmV2TGFiZWwsIHNldEFjdGl2ZVN0YXJ0RGF0ZTogc2V0QWN0aXZlU3RhcnREYXRlLCBzaG93RG91YmxlVmlldzogc2hvd0RvdWJsZVZpZXcsIHZpZXc6IHZpZXcsIHZpZXdzOiB2aWV3cyB9KSk7XG4gICAgfVxuICAgIHZhciB2YWx1ZUFycmF5ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xzeChiYXNlQ2xhc3NOYW1lLCBzZWxlY3RSYW5nZSAmJiB2YWx1ZUFycmF5Lmxlbmd0aCA9PT0gMSAmJiBcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIi0tc2VsZWN0UmFuZ2VcIiksIHNob3dEb3VibGVWaWV3ICYmIFwiXCIuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiLS1kb3VibGVWaWV3XCIpLCBjbGFzc05hbWUpLCByZWY6IGlucHV0UmVmLCBjaGlsZHJlbjogW3JlbmRlck5hdmlnYXRpb24oKSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiX192aWV3Q29udGFpbmVyXCIpLCBvbkJsdXI6IHNlbGVjdFJhbmdlID8gb25Nb3VzZUxlYXZlIDogdW5kZWZpbmVkLCBvbk1vdXNlTGVhdmU6IHNlbGVjdFJhbmdlID8gb25Nb3VzZUxlYXZlIDogdW5kZWZpbmVkLCBjaGlsZHJlbjogW3JlbmRlckNvbnRlbnQoKSwgc2hvd0RvdWJsZVZpZXcgPyByZW5kZXJDb250ZW50KHRydWUpIDogbnVsbF0gfSldIH0pKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgQ2FsZW5kYXI7XG4iLCJmdW5jdGlvbiBnZXRSZWN0KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGVjdEVsZW1lbnRPdmVyZmxvdyhlbGVtZW50LCBjb250YWluZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQgY29sbGlkZWRUb3AoKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmVjdChlbGVtZW50KS50b3AgPCBnZXRSZWN0KGNvbnRhaW5lcikudG9wO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgY29sbGlkZWRCb3R0b20oKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmVjdChlbGVtZW50KS5ib3R0b20gPiBnZXRSZWN0KGNvbnRhaW5lcikuYm90dG9tO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgY29sbGlkZWRMZWZ0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJlY3QoZWxlbWVudCkubGVmdCA8IGdldFJlY3QoY29udGFpbmVyKS5sZWZ0O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgY29sbGlkZWRSaWdodCgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSZWN0KGVsZW1lbnQpLnJpZ2h0ID4gZ2V0UmVjdChjb250YWluZXIpLnJpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgb3ZlcmZsb3dUb3AoKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmVjdChjb250YWluZXIpLnRvcCAtIGdldFJlY3QoZWxlbWVudCkudG9wO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgb3ZlcmZsb3dCb3R0b20oKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmVjdChlbGVtZW50KS5ib3R0b20gLSBnZXRSZWN0KGNvbnRhaW5lcikuYm90dG9tO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgb3ZlcmZsb3dMZWZ0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJlY3QoY29udGFpbmVyKS5sZWZ0IC0gZ2V0UmVjdChlbGVtZW50KS5sZWZ0O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgb3ZlcmZsb3dSaWdodCgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSZWN0KGVsZW1lbnQpLnJpZ2h0IC0gZ2V0UmVjdChjb250YWluZXIpLnJpZ2h0O1xuICAgICAgICB9LFxuICAgIH07XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG52YXIgd2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChfX0RFVl9fKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAxID8gbGVuIC0gMSA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDE7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMV0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICtcbiAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgK1xuICAgICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHByaW50V2FybmluZy5hcHBseShudWxsLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuIiwiJ3VzZSBjbGllbnQnO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBDaGlsZHJlbiwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGRldGVjdEVsZW1lbnRPdmVyZmxvdyBmcm9tICdkZXRlY3QtZWxlbWVudC1vdmVyZmxvdyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xudmFyIGlzTXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCA9IGlzQnJvd3NlciAmJiAnTXV0YXRpb25PYnNlcnZlcicgaW4gd2luZG93O1xuZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHJpbmcpIHtcbiAgICByZXR1cm4gKHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKSk7XG59XG5mdW5jdGlvbiBmaW5kU2Nyb2xsQ29udGFpbmVyKGVsZW1lbnQpIHtcbiAgICB2YXIgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIG92ZXJmbG93ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocGFyZW50KS5vdmVyZmxvdztcbiAgICAgICAgaWYgKG92ZXJmbG93LnNwbGl0KCcgJykuZXZlcnkoZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8gPT09ICdhdXRvJyB8fCBvID09PSAnc2Nyb2xsJzsgfSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG59XG5mdW5jdGlvbiBhbGlnbkF4aXMoX2EpIHtcbiAgICB2YXIgYXhpcyA9IF9hLmF4aXMsIGNvbnRhaW5lciA9IF9hLmNvbnRhaW5lciwgZWxlbWVudCA9IF9hLmVsZW1lbnQsIGludmVydEF4aXMgPSBfYS5pbnZlcnRBeGlzLCBzY3JvbGxDb250YWluZXIgPSBfYS5zY3JvbGxDb250YWluZXIsIHNlY29uZGFyeSA9IF9hLnNlY29uZGFyeSwgc3BhY2luZyA9IF9hLnNwYWNpbmc7XG4gICAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgdmFyIHBhcmVudCA9IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50O1xuICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHNjcm9sbENvbnRhaW5lckNvbGxpc2lvbnMgPSBkZXRlY3RFbGVtZW50T3ZlcmZsb3cocGFyZW50LCBzY3JvbGxDb250YWluZXIpO1xuICAgIHZhciBkb2N1bWVudENvbGxpc2lvbnMgPSBkZXRlY3RFbGVtZW50T3ZlcmZsb3cocGFyZW50LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgIHZhciBpc1ggPSBheGlzID09PSAneCc7XG4gICAgdmFyIHN0YXJ0UHJvcGVydHkgPSBpc1ggPyAnbGVmdCcgOiAndG9wJztcbiAgICB2YXIgZW5kUHJvcGVydHkgPSBpc1ggPyAncmlnaHQnIDogJ2JvdHRvbSc7XG4gICAgdmFyIHNpemVQcm9wZXJ0eSA9IGlzWCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcbiAgICB2YXIgb3ZlcmZsb3dTdGFydFByb3BlcnR5ID0gXCJvdmVyZmxvd1wiLmNvbmNhdChjYXBpdGFsaXplKHN0YXJ0UHJvcGVydHkpKTtcbiAgICB2YXIgb3ZlcmZsb3dFbmRQcm9wZXJ0eSA9IFwib3ZlcmZsb3dcIi5jb25jYXQoY2FwaXRhbGl6ZShlbmRQcm9wZXJ0eSkpO1xuICAgIHZhciBzY3JvbGxQcm9wZXJ0eSA9IFwic2Nyb2xsXCIuY29uY2F0KGNhcGl0YWxpemUoc3RhcnRQcm9wZXJ0eSkpO1xuICAgIHZhciB1cHBlcmNhc2VkU2l6ZVByb3BlcnR5ID0gY2FwaXRhbGl6ZShzaXplUHJvcGVydHkpO1xuICAgIHZhciBvZmZzZXRTaXplUHJvcGVydHkgPSBcIm9mZnNldFwiLmNvbmNhdCh1cHBlcmNhc2VkU2l6ZVByb3BlcnR5KTtcbiAgICB2YXIgY2xpZW50U2l6ZVByb3BlcnR5ID0gXCJjbGllbnRcIi5jb25jYXQodXBwZXJjYXNlZFNpemVQcm9wZXJ0eSk7XG4gICAgdmFyIG1pblNpemVQcm9wZXJ0eSA9IFwibWluLVwiLmNvbmNhdChzaXplUHJvcGVydHkpO1xuICAgIHZhciBzY3JvbGxiYXJXaWR0aCA9IHNjcm9sbENvbnRhaW5lcltvZmZzZXRTaXplUHJvcGVydHldIC0gc2Nyb2xsQ29udGFpbmVyW2NsaWVudFNpemVQcm9wZXJ0eV07XG4gICAgdmFyIHN0YXJ0U3BhY2luZyA9IHR5cGVvZiBzcGFjaW5nID09PSAnb2JqZWN0JyA/IHNwYWNpbmdbc3RhcnRQcm9wZXJ0eV0gOiBzcGFjaW5nO1xuICAgIHZhciBhdmFpbGFibGVTdGFydFNwYWNlID0gLU1hdGgubWF4KHNjcm9sbENvbnRhaW5lckNvbGxpc2lvbnNbb3ZlcmZsb3dTdGFydFByb3BlcnR5XSwgZG9jdW1lbnRDb2xsaXNpb25zW292ZXJmbG93U3RhcnRQcm9wZXJ0eV0gKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbc2Nyb2xsUHJvcGVydHldKSAtIHN0YXJ0U3BhY2luZztcbiAgICB2YXIgZW5kU3BhY2luZyA9IHR5cGVvZiBzcGFjaW5nID09PSAnb2JqZWN0JyA/IHNwYWNpbmdbZW5kUHJvcGVydHldIDogc3BhY2luZztcbiAgICB2YXIgYXZhaWxhYmxlRW5kU3BhY2UgPSAtTWF0aC5tYXgoc2Nyb2xsQ29udGFpbmVyQ29sbGlzaW9uc1tvdmVyZmxvd0VuZFByb3BlcnR5XSwgZG9jdW1lbnRDb2xsaXNpb25zW292ZXJmbG93RW5kUHJvcGVydHldIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50W3Njcm9sbFByb3BlcnR5XSkgLVxuICAgICAgICBlbmRTcGFjaW5nIC1cbiAgICAgICAgc2Nyb2xsYmFyV2lkdGg7XG4gICAgaWYgKHNlY29uZGFyeSkge1xuICAgICAgICBhdmFpbGFibGVTdGFydFNwYWNlICs9IHBhcmVudFtjbGllbnRTaXplUHJvcGVydHldO1xuICAgICAgICBhdmFpbGFibGVFbmRTcGFjZSArPSBwYXJlbnRbY2xpZW50U2l6ZVByb3BlcnR5XTtcbiAgICB9XG4gICAgdmFyIG9mZnNldFNpemUgPSBlbGVtZW50W29mZnNldFNpemVQcm9wZXJ0eV07XG4gICAgZnVuY3Rpb24gZGlzcGxheVN0YXJ0KCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlW3N0YXJ0UHJvcGVydHldID0gJ2F1dG8nO1xuICAgICAgICBlbGVtZW50LnN0eWxlW2VuZFByb3BlcnR5XSA9IHNlY29uZGFyeSA/ICcwJyA6ICcxMDAlJztcbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzcGxheUVuZCgpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZVtzdGFydFByb3BlcnR5XSA9IHNlY29uZGFyeSA/ICcwJyA6ICcxMDAlJztcbiAgICAgICAgZWxlbWVudC5zdHlsZVtlbmRQcm9wZXJ0eV0gPSAnYXV0byc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc3BsYXlJZkZpdHMoYXZhaWxhYmxlU3BhY2UsIGRpc3BsYXkpIHtcbiAgICAgICAgdmFyIGZpdHMgPSBvZmZzZXRTaXplIDw9IGF2YWlsYWJsZVNwYWNlO1xuICAgICAgICBpZiAoZml0cykge1xuICAgICAgICAgICAgZGlzcGxheSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaXRzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkaXNwbGF5U3RhcnRJZkZpdHMoKSB7XG4gICAgICAgIHJldHVybiBkaXNwbGF5SWZGaXRzKGF2YWlsYWJsZVN0YXJ0U3BhY2UsIGRpc3BsYXlTdGFydCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc3BsYXlFbmRJZkZpdHMoKSB7XG4gICAgICAgIHJldHVybiBkaXNwbGF5SWZGaXRzKGF2YWlsYWJsZUVuZFNwYWNlLCBkaXNwbGF5RW5kKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzcGxheVdoZXJldmVyU2hyaW5rZWRGaXRzKCkge1xuICAgICAgICB2YXIgbW9yZVNwYWNlU3RhcnQgPSBhdmFpbGFibGVTdGFydFNwYWNlID4gYXZhaWxhYmxlRW5kU3BhY2U7XG4gICAgICAgIHZhciByYXdNaW5TaXplID0gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShtaW5TaXplUHJvcGVydHkpO1xuICAgICAgICB2YXIgbWluU2l6ZSA9IHJhd01pblNpemUgPyBwYXJzZUludChyYXdNaW5TaXplLCAxMCkgOiBudWxsO1xuICAgICAgICBmdW5jdGlvbiBzaHJpbmtUb1NpemUoc2l6ZSkge1xuICAgICAgICAgICAgd2FybmluZyghbWluU2l6ZSB8fCBzaXplID49IG1pblNpemUsIFwiPEZpdCAvPidzIGNoaWxkIHdpbGwgbm90IGZpdCBhbnl3aGVyZSB3aXRoIGl0cyBjdXJyZW50IFwiLmNvbmNhdChtaW5TaXplUHJvcGVydHksIFwiIG9mIFwiKS5jb25jYXQobWluU2l6ZSwgXCJweC5cIikpO1xuICAgICAgICAgICAgdmFyIG5ld1NpemUgPSBNYXRoLm1heChzaXplLCBtaW5TaXplIHx8IDApO1xuICAgICAgICAgICAgd2FybmluZyhmYWxzZSwgXCI8Rml0IC8+J3MgY2hpbGQgbmVlZGVkIHRvIGhhdmUgaXRzIFwiLmNvbmNhdChzaXplUHJvcGVydHksIFwiIGRlY3JlYXNlZCB0byBcIikuY29uY2F0KG5ld1NpemUsIFwicHguXCIpKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbc2l6ZVByb3BlcnR5XSA9IFwiXCIuY29uY2F0KG5ld1NpemUsIFwicHhcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vcmVTcGFjZVN0YXJ0KSB7XG4gICAgICAgICAgICBzaHJpbmtUb1NpemUoYXZhaWxhYmxlU3RhcnRTcGFjZSk7XG4gICAgICAgICAgICBkaXNwbGF5U3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNocmlua1RvU2l6ZShhdmFpbGFibGVFbmRTcGFjZSk7XG4gICAgICAgICAgICBkaXNwbGF5RW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGZpdHM7XG4gICAgaWYgKGludmVydEF4aXMpIHtcbiAgICAgICAgZml0cyA9IGRpc3BsYXlTdGFydElmRml0cygpIHx8IGRpc3BsYXlFbmRJZkZpdHMoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZpdHMgPSBkaXNwbGF5RW5kSWZGaXRzKCkgfHwgZGlzcGxheVN0YXJ0SWZGaXRzKCk7XG4gICAgfVxuICAgIGlmICghZml0cykge1xuICAgICAgICBkaXNwbGF5V2hlcmV2ZXJTaHJpbmtlZEZpdHMoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhbGlnbk1haW5BeGlzKGFyZ3MpIHtcbiAgICBhbGlnbkF4aXMoYXJncyk7XG59XG5mdW5jdGlvbiBhbGlnblNlY29uZGFyeUF4aXMoYXJncykge1xuICAgIGFsaWduQXhpcyhfX2Fzc2lnbihfX2Fzc2lnbih7fSwgYXJncyksIHsgYXhpczogYXJncy5heGlzID09PSAneCcgPyAneScgOiAneCcsIHNlY29uZGFyeTogdHJ1ZSB9KSk7XG59XG5mdW5jdGlvbiBhbGlnbkJvdGhBeGlzKGFyZ3MpIHtcbiAgICB2YXIgaW52ZXJ0QXhpcyA9IGFyZ3MuaW52ZXJ0QXhpcywgaW52ZXJ0U2Vjb25kYXJ5QXhpcyA9IGFyZ3MuaW52ZXJ0U2Vjb25kYXJ5QXhpcywgY29tbW9uQXJncyA9IF9fcmVzdChhcmdzLCBbXCJpbnZlcnRBeGlzXCIsIFwiaW52ZXJ0U2Vjb25kYXJ5QXhpc1wiXSk7XG4gICAgYWxpZ25NYWluQXhpcyhfX2Fzc2lnbihfX2Fzc2lnbih7fSwgY29tbW9uQXJncyksIHsgaW52ZXJ0QXhpczogaW52ZXJ0QXhpcyB9KSk7XG4gICAgYWxpZ25TZWNvbmRhcnlBeGlzKF9fYXNzaWduKF9fYXNzaWduKHt9LCBjb21tb25BcmdzKSwgeyBpbnZlcnRBeGlzOiBpbnZlcnRTZWNvbmRhcnlBeGlzIH0pKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZpdChfYSkge1xuICAgIHZhciBjaGlsZHJlbiA9IF9hLmNoaWxkcmVuLCBpbnZlcnRBeGlzID0gX2EuaW52ZXJ0QXhpcywgaW52ZXJ0U2Vjb25kYXJ5QXhpcyA9IF9hLmludmVydFNlY29uZGFyeUF4aXMsIF9iID0gX2EubWFpbkF4aXMsIG1haW5BeGlzID0gX2IgPT09IHZvaWQgMCA/ICd5JyA6IF9iLCBfYyA9IF9hLnNwYWNpbmcsIHNwYWNpbmcgPSBfYyA9PT0gdm9pZCAwID8gOCA6IF9jO1xuICAgIHZhciBjb250YWluZXIgPSB1c2VSZWYodW5kZWZpbmVkKTtcbiAgICB2YXIgZWxlbWVudCA9IHVzZVJlZih1bmRlZmluZWQpO1xuICAgIHZhciBlbGVtZW50V2lkdGggPSB1c2VSZWYodW5kZWZpbmVkKTtcbiAgICB2YXIgZWxlbWVudEhlaWdodCA9IHVzZVJlZih1bmRlZmluZWQpO1xuICAgIHZhciBzY3JvbGxDb250YWluZXIgPSB1c2VSZWYodW5kZWZpbmVkKTtcbiAgICB2YXIgZml0ID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXNjcm9sbENvbnRhaW5lci5jdXJyZW50IHx8ICFjb250YWluZXIuY3VycmVudCB8fCAhZWxlbWVudC5jdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1cnJlbnRFbGVtZW50V2lkdGggPSBlbGVtZW50LmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBjdXJyZW50RWxlbWVudEhlaWdodCA9IGVsZW1lbnQuY3VycmVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIC8vIE5vIG5lZWQgdG8gcmVjYWxjdWxhdGUgLSBhbHJlYWR5IGRpZCB0aGF0IGZvciBjdXJyZW50IGRpbWVuc2lvbnNcbiAgICAgICAgaWYgKGVsZW1lbnRXaWR0aC5jdXJyZW50ID09PSBjdXJyZW50RWxlbWVudFdpZHRoICYmXG4gICAgICAgICAgICBlbGVtZW50SGVpZ2h0LmN1cnJlbnQgPT09IGN1cnJlbnRFbGVtZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2F2ZSB0aGUgZGltZW5zaW9ucyBzbyB0aGF0IHdlIGtub3cgd2UgZG9uJ3QgbmVlZCB0byByZXBlYXQgdGhlIGZ1bmN0aW9uIGlmIHVuY2hhbmdlZFxuICAgICAgICBlbGVtZW50V2lkdGguY3VycmVudCA9IGN1cnJlbnRFbGVtZW50V2lkdGg7XG4gICAgICAgIGVsZW1lbnRIZWlnaHQuY3VycmVudCA9IGN1cnJlbnRFbGVtZW50SGVpZ2h0O1xuICAgICAgICB2YXIgcGFyZW50ID0gY29udGFpbmVyLmN1cnJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgLy8gQ29udGFpbmVyIHdhcyB1bm1vdW50ZWRcbiAgICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV2UgbmVlZCB0byBlbnN1cmUgdGhhdCA8Rml0IC8+J3MgY2hpbGQgaGFzIGEgYWJzb2x1dGUgcG9zaXRpb24uIE90aGVyd2lzZSxcbiAgICAgICAgICogd2Ugd291bGRuJ3QgYmUgYWJsZSB0byBwbGFjZSB0aGUgY2hpbGQgaW4gdGhlIGNvcnJlY3QgcG9zaXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LmN1cnJlbnQpO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBzdHlsZS5wb3NpdGlvbjtcbiAgICAgICAgaWYgKHBvc2l0aW9uICE9PSAnYWJzb2x1dGUnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmN1cnJlbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXZSBuZWVkIHRvIGVuc3VyZSB0aGF0IDxGaXQgLz4ncyBwYXJlbnQgaGFzIGEgcmVsYXRpdmUgb3IgYWJzb2x1dGUgcG9zaXRpb24uIE90aGVyd2lzZSxcbiAgICAgICAgICogd2Ugd291bGRuJ3QgYmUgYWJsZSB0byBwbGFjZSB0aGUgY2hpbGQgaW4gdGhlIGNvcnJlY3QgcG9zaXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgcGFyZW50U3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnQpO1xuICAgICAgICB2YXIgcGFyZW50UG9zaXRpb24gPSBwYXJlbnRTdHlsZS5wb3NpdGlvbjtcbiAgICAgICAgaWYgKHBhcmVudFBvc2l0aW9uICE9PSAncmVsYXRpdmUnICYmIHBhcmVudFBvc2l0aW9uICE9PSAnYWJzb2x1dGUnKSB7XG4gICAgICAgICAgICBwYXJlbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICB9XG4gICAgICAgIGFsaWduQm90aEF4aXMoe1xuICAgICAgICAgICAgYXhpczogbWFpbkF4aXMsXG4gICAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lci5jdXJyZW50LFxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudC5jdXJyZW50LFxuICAgICAgICAgICAgaW52ZXJ0QXhpczogaW52ZXJ0QXhpcyxcbiAgICAgICAgICAgIGludmVydFNlY29uZGFyeUF4aXM6IGludmVydFNlY29uZGFyeUF4aXMsXG4gICAgICAgICAgICBzY3JvbGxDb250YWluZXI6IHNjcm9sbENvbnRhaW5lci5jdXJyZW50LFxuICAgICAgICAgICAgc3BhY2luZzogc3BhY2luZyxcbiAgICAgICAgfSk7XG4gICAgfSwgW2ludmVydEF4aXMsIGludmVydFNlY29uZGFyeUF4aXMsIG1haW5BeGlzLCBzcGFjaW5nXSk7XG4gICAgdmFyIGNoaWxkID0gQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZml0KCk7XG4gICAgICAgIGZ1bmN0aW9uIG9uTXV0YXRpb24oKSB7XG4gICAgICAgICAgICBmaXQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkICYmIGVsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihvbk11dGF0aW9uKTtcbiAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LmN1cnJlbnQsIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydjbGFzcycsICdzdHlsZSddLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbZml0XSk7XG4gICAgZnVuY3Rpb24gYXNzaWduUmVmcyhkb21FbGVtZW50KSB7XG4gICAgICAgIGlmICghZG9tRWxlbWVudCB8fCAhKGRvbUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmN1cnJlbnQgPSBkb21FbGVtZW50O1xuICAgICAgICBzY3JvbGxDb250YWluZXIuY3VycmVudCA9IGZpbmRTY3JvbGxDb250YWluZXIoZG9tRWxlbWVudCk7XG4gICAgfVxuICAgIHJldHVybiAoX2pzeChcInNwYW5cIiwgeyByZWY6IGZ1bmN0aW9uIChkb21Db250YWluZXIpIHtcbiAgICAgICAgICAgIGlmICghZG9tQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyLmN1cnJlbnQgPSBkb21Db250YWluZXI7XG4gICAgICAgICAgICB2YXIgZG9tRWxlbWVudCA9IGRvbUNvbnRhaW5lciA9PT0gbnVsbCB8fCBkb21Db250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRvbUNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIGFzc2lnblJlZnMoZG9tRWxlbWVudCk7XG4gICAgICAgIH0sIHN0eWxlOiB7IGRpc3BsYXk6ICdjb250ZW50cycgfSwgY2hpbGRyZW46IGNoaWxkIH0pKTtcbn1cbiIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEaXZpZGVyKF9hKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gX2EuY2hpbGRyZW47XG4gICAgcmV0dXJuIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInJlYWN0LWRhdGUtcGlja2VyX19pbnB1dEdyb3VwX19kaXZpZGVyXCIsIGNoaWxkcmVuOiBjaGlsZHJlbiB9KTtcbn1cbiIsInZhciBhbGxvd2VkVmFyaWFudHMgPSBbJ25vcm1hbCcsICdzbWFsbC1jYXBzJ107XG4vKipcbiAqIEdldHMgZm9udCBDU1Mgc2hvcnRoYW5kIHByb3BlcnR5IGdpdmVuIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRvIGdldCBmb250IENTUyBzaG9ydGhhbmQgcHJvcGVydHkgZnJvbVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9udFNob3J0aGFuZChlbGVtZW50KSB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgaWYgKHN0eWxlLmZvbnQpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlLmZvbnQ7XG4gICAgfVxuICAgIHZhciBpc0ZvbnREZWZpbmVkID0gc3R5bGUuZm9udEZhbWlseSAhPT0gJyc7XG4gICAgaWYgKCFpc0ZvbnREZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIGZvbnRWYXJpYW50ID0gYWxsb3dlZFZhcmlhbnRzLmluY2x1ZGVzKHN0eWxlLmZvbnRWYXJpYW50KSA/IHN0eWxlLmZvbnRWYXJpYW50IDogJ25vcm1hbCc7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KHN0eWxlLmZvbnRTdHlsZSwgXCIgXCIpLmNvbmNhdChmb250VmFyaWFudCwgXCIgXCIpLmNvbmNhdChzdHlsZS5mb250V2VpZ2h0LCBcIiBcIikuY29uY2F0KHN0eWxlLmZvbnRTaXplLCBcIiAvIFwiKS5jb25jYXQoc3R5bGUubGluZUhlaWdodCwgXCIgXCIpLmNvbmNhdChzdHlsZS5mb250RmFtaWx5KTtcbn1cbnZhciBjYWNoZWRDYW52YXM7XG4vKipcbiAqIE1lYXN1cmVzIHRleHQgd2lkdGggZ2l2ZW4gdGV4dCBhbmQgZm9udCBDU1Mgc2hvcnRoYW5kLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRleHQgdG8gbWVhc3VyZVxuICogQHBhcmFtIHtzdHJpbmd9IGZvbnQgRm9udCB0byB1c2Ugd2hlbiBtZWFzdXJpbmcgdGhlIHRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lYXN1cmVUZXh0KHRleHQsIGZvbnQpIHtcbiAgICB2YXIgY2FudmFzID0gY2FjaGVkQ2FudmFzIHx8IChjYWNoZWRDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSk7XG4gICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAvLyBDb250ZXh0IHR5cGUgbm90IHN1cHBvcnRlZFxuICAgIGlmICghY29udGV4dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29udGV4dC5mb250ID0gZm9udDtcbiAgICB2YXIgd2lkdGggPSBjb250ZXh0Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoO1xuICAgIHJldHVybiBNYXRoLmNlaWwod2lkdGgpO1xufVxuLyoqXG4gKiBVcGRhdGVzIGlucHV0IGVsZW1lbnQgd2lkdGggdG8gZml0IGl0cyBjb250ZW50IGdpdmVuIGlucHV0IGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSW5wdXRXaWR0aChlbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBmb250ID0gZ2V0Rm9udFNob3J0aGFuZChlbGVtZW50KTtcbiAgICB2YXIgdGV4dCA9IGVsZW1lbnQudmFsdWUgfHwgZWxlbWVudC5wbGFjZWhvbGRlcjtcbiAgICB2YXIgd2lkdGggPSBtZWFzdXJlVGV4dCh0ZXh0LCBmb250KTtcbiAgICBpZiAod2lkdGggPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSBcIlwiLmNvbmNhdCh3aWR0aCwgXCJweFwiKTtcbiAgICByZXR1cm4gd2lkdGg7XG59XG5leHBvcnQgZGVmYXVsdCB1cGRhdGVJbnB1dFdpZHRoO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIEZyYWdtZW50IGFzIF9GcmFnbWVudCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmltcG9ydCB1cGRhdGVJbnB1dFdpZHRoLCB7IGdldEZvbnRTaG9ydGhhbmQgfSBmcm9tICd1cGRhdGUtaW5wdXQtd2lkdGgnO1xudmFyIGlzQnJvd3NlciA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdCA9IGlzQnJvd3NlciA/IHVzZUxheW91dEVmZmVjdCA6IHVzZUVmZmVjdDtcbnZhciBpc0lFT3JFZGdlTGVnYWN5ID0gaXNCcm93c2VyICYmIC8oTVNJRXxUcmlkZW50XFwvfEVkZ2VcXC8pLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xudmFyIGlzRmlyZWZveCA9IGlzQnJvd3NlciAmJiAvRmlyZWZveC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbmZ1bmN0aW9uIG9uRm9jdXMoZXZlbnQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmIChpc0lFT3JFZGdlTGVnYWN5KSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7IHJldHVybiB0YXJnZXQuc2VsZWN0KCk7IH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZUlucHV0V2lkdGhPbkxvYWQoZWxlbWVudCkge1xuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB1cGRhdGVJbnB1dFdpZHRoKGVsZW1lbnQpO1xuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG59XG5mdW5jdGlvbiB1cGRhdGVJbnB1dFdpZHRoT25Gb250TG9hZChlbGVtZW50KSB7XG4gICAgaWYgKCFkb2N1bWVudC5mb250cykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBmb250ID0gZ2V0Rm9udFNob3J0aGFuZChlbGVtZW50KTtcbiAgICBpZiAoIWZvbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgaXNGb250TG9hZGVkID0gZG9jdW1lbnQuZm9udHMuY2hlY2soZm9udCk7XG4gICAgaWYgKGlzRm9udExvYWRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uTG9hZGluZ0RvbmUoKSB7XG4gICAgICAgIHVwZGF0ZUlucHV0V2lkdGgoZWxlbWVudCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmZvbnRzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRpbmdkb25lJywgb25Mb2FkaW5nRG9uZSk7XG59XG5mdW5jdGlvbiBnZXRTZWxlY3Rpb25TdHJpbmcoaW5wdXQpIHtcbiAgICAvKipcbiAgICAgKiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKSByZXR1cm5zIGVtcHR5IHN0cmluZyBpbiBJRTExIGFuZCBGaXJlZm94LFxuICAgICAqIHNvIGFsdGVybmF0aXZlcyBjb21lIGZpcnN0LlxuICAgICAqL1xuICAgIGlmIChpbnB1dCAmJlxuICAgICAgICAnc2VsZWN0aW9uU3RhcnQnIGluIGlucHV0ICYmXG4gICAgICAgIGlucHV0LnNlbGVjdGlvblN0YXJ0ICE9PSBudWxsICYmXG4gICAgICAgICdzZWxlY3Rpb25FbmQnIGluIGlucHV0ICYmXG4gICAgICAgIGlucHV0LnNlbGVjdGlvbkVuZCAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gaW5wdXQudmFsdWUuc2xpY2UoaW5wdXQuc2VsZWN0aW9uU3RhcnQsIGlucHV0LnNlbGVjdGlvbkVuZCk7XG4gICAgfVxuICAgIGlmICgnZ2V0U2VsZWN0aW9uJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBtYWtlT25LZXlQcmVzcyhtYXhMZW5ndGgpIHtcbiAgICBpZiAobWF4TGVuZ3RoID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByZXZlbnRzIGtleXN0cm9rZXMgdGhhdCB3b3VsZCBub3QgcHJvZHVjZSBhIG51bWJlciBvciB3aGVuIHZhbHVlIGFmdGVyIGtleXN0cm9rZSB3b3VsZFxuICAgICAqIGV4Y2VlZCBtYXhMZW5ndGguXG4gICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG9uS2V5UHJlc3MoZXZlbnQpIHtcbiAgICAgICAgaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93b2p0ZWttYWovcmVhY3QtdGltZS1waWNrZXIvaXNzdWVzLzkyXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSA9IGV2ZW50LmtleSwgaW5wdXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHZhciB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgICB2YXIgaXNOdW1iZXJLZXkgPSBrZXkubGVuZ3RoID09PSAxICYmIC9cXGQvLnRlc3Qoa2V5KTtcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGdldFNlbGVjdGlvblN0cmluZyhpbnB1dCk7XG4gICAgICAgIGlmICghaXNOdW1iZXJLZXkgfHwgIShzZWxlY3Rpb24gfHwgdmFsdWUubGVuZ3RoIDwgbWF4TGVuZ3RoKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbnB1dChfYSkge1xuICAgIHZhciBhcmlhTGFiZWwgPSBfYS5hcmlhTGFiZWwsIGF1dG9Gb2N1cyA9IF9hLmF1dG9Gb2N1cywgY2xhc3NOYW1lID0gX2EuY2xhc3NOYW1lLCBkaXNhYmxlZCA9IF9hLmRpc2FibGVkLCBpbnB1dFJlZiA9IF9hLmlucHV0UmVmLCBtYXggPSBfYS5tYXgsIG1pbiA9IF9hLm1pbiwgbmFtZSA9IF9hLm5hbWUsIG5hbWVGb3JDbGFzcyA9IF9hLm5hbWVGb3JDbGFzcywgb25DaGFuZ2UgPSBfYS5vbkNoYW5nZSwgb25LZXlEb3duID0gX2Eub25LZXlEb3duLCBvbktleVVwID0gX2Eub25LZXlVcCwgX2IgPSBfYS5wbGFjZWhvbGRlciwgcGxhY2Vob2xkZXIgPSBfYiA9PT0gdm9pZCAwID8gJy0tJyA6IF9iLCByZXF1aXJlZCA9IF9hLnJlcXVpcmVkLCBzaG93TGVhZGluZ1plcm9zID0gX2Euc2hvd0xlYWRpbmdaZXJvcywgc3RlcCA9IF9hLnN0ZXAsIHZhbHVlID0gX2EudmFsdWU7XG4gICAgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghaW5wdXRSZWYgfHwgIWlucHV0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVJbnB1dFdpZHRoKGlucHV0UmVmLmN1cnJlbnQpO1xuICAgICAgICB1cGRhdGVJbnB1dFdpZHRoT25Mb2FkKGlucHV0UmVmLmN1cnJlbnQpO1xuICAgICAgICB1cGRhdGVJbnB1dFdpZHRoT25Gb250TG9hZChpbnB1dFJlZi5jdXJyZW50KTtcbiAgICB9LCBbaW5wdXRSZWYsIHZhbHVlXSk7XG4gICAgdmFyIGhhc0xlYWRpbmdaZXJvID0gc2hvd0xlYWRpbmdaZXJvcyAmJlxuICAgICAgICB2YWx1ZSAmJlxuICAgICAgICBOdW1iZXIodmFsdWUpIDwgMTAgJiZcbiAgICAgICAgKHZhbHVlID09PSAnMCcgfHwgIXZhbHVlLnRvU3RyaW5nKCkuc3RhcnRzV2l0aCgnMCcpKTtcbiAgICB2YXIgbWF4TGVuZ3RoID0gbWF4ID8gbWF4LnRvU3RyaW5nKCkubGVuZ3RoIDogbnVsbDtcbiAgICByZXR1cm4gKF9qc3hzKF9GcmFnbWVudCwgeyBjaGlsZHJlbjogW2hhc0xlYWRpbmdaZXJvID8gX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJfX2xlYWRpbmdaZXJvXCIpLCBjaGlsZHJlbjogXCIwXCIgfSkgOiBudWxsLCBfanN4KFwiaW5wdXRcIiwgeyBcImFyaWEtbGFiZWxcIjogYXJpYUxhYmVsLCBhdXRvQ29tcGxldGU6IFwib2ZmXCIsIGF1dG9Gb2N1czogYXV0b0ZvY3VzLCBjbGFzc05hbWU6IGNsc3goXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIl9faW5wdXRcIiksIFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJfX1wiKS5jb25jYXQobmFtZUZvckNsYXNzIHx8IG5hbWUpLCBoYXNMZWFkaW5nWmVybyAmJiBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX19pbnB1dC0taGFzTGVhZGluZ1plcm9cIikpLCBcImRhdGEtaW5wdXRcIjogXCJ0cnVlXCIsIGRpc2FibGVkOiBkaXNhYmxlZCwgaW5wdXRNb2RlOiBcIm51bWVyaWNcIiwgbWF4OiBtYXgsIG1pbjogbWluLCBuYW1lOiBuYW1lLCBvbkNoYW5nZTogb25DaGFuZ2UsIG9uRm9jdXM6IG9uRm9jdXMsIG9uS2V5RG93bjogb25LZXlEb3duLCBvbktleVByZXNzOiBtYWtlT25LZXlQcmVzcyhtYXhMZW5ndGgpLCBvbktleVVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlSW5wdXRXaWR0aChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob25LZXlVcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlVcChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXIsIFxuICAgICAgICAgICAgICAgIC8vIEFzc2VydGlvbiBpcyBuZWVkZWQgZm9yIFJlYWN0IDE4IGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgICAgICByZWY6IGlucHV0UmVmLCByZXF1aXJlZDogcmVxdWlyZWQsIHN0ZXA6IHN0ZXAsIHR5cGU6IFwibnVtYmVyXCIsIHZhbHVlOiB2YWx1ZSAhPT0gbnVsbCA/IHZhbHVlIDogJycgfSldIH0pKTtcbn1cbiIsIi8qKlxuICogUmV0dXJucyBhIHZhbHVlIG5vIHNtYWxsZXIgdGhhbiBtaW4gYW5kIG5vIGxhcmdlciB0aGFuIG1heC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IHZhbHVlIFZhbHVlIHRvIHJldHVybi5cbiAqIEBwYXJhbSB7RGF0ZX0gbWluIE1pbmltdW0gcmV0dXJuIHZhbHVlLlxuICogQHBhcmFtIHtEYXRlfSBtYXggTWF4aW11bSByZXR1cm4gdmFsdWUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVmFsdWUgYmV0d2VlbiBtaW4gYW5kIG1heC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJldHdlZW4odmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgaWYgKG1pbiAmJiBtaW4gPiB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbWluO1xuICAgIH1cbiAgICBpZiAobWF4ICYmIG1heCA8IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGlzVmFsaWROdW1iZXIobnVtKSB7XG4gICAgcmV0dXJuIG51bSAhPT0gbnVsbCAmJiBudW0gIT09IGZhbHNlICYmICFOdW1iZXIuaXNOYU4oTnVtYmVyKG51bSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVNaW4oKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBNYXRoLm1pbi5hcHBseShNYXRoLCBhcmdzLmZpbHRlcihpc1ZhbGlkTnVtYmVyKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2FmZU1heCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KE1hdGgsIGFyZ3MuZmlsdGVyKGlzVmFsaWROdW1iZXIpKTtcbn1cbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgZ2V0WWVhciwgZ2V0TW9udGhIdW1hbiwgZ2V0RGF0ZSwgZ2V0RGF5c0luTW9udGggfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQuanMnO1xuaW1wb3J0IHsgc2FmZU1pbiwgc2FmZU1heCB9IGZyb20gJy4uL3NoYXJlZC91dGlscy5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXlJbnB1dChfYSkge1xuICAgIHZhciBtYXhEYXRlID0gX2EubWF4RGF0ZSwgbWluRGF0ZSA9IF9hLm1pbkRhdGUsIG1vbnRoID0gX2EubW9udGgsIHllYXIgPSBfYS55ZWFyLCBvdGhlclByb3BzID0gX19yZXN0KF9hLCBbXCJtYXhEYXRlXCIsIFwibWluRGF0ZVwiLCBcIm1vbnRoXCIsIFwieWVhclwiXSk7XG4gICAgdmFyIGN1cnJlbnRNb250aE1heERheXMgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIW1vbnRoKSB7XG4gICAgICAgICAgICByZXR1cm4gMzE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdldERheXNJbk1vbnRoKG5ldyBEYXRlKE51bWJlcih5ZWFyKSwgTnVtYmVyKG1vbnRoKSAtIDEsIDEpKTtcbiAgICB9KSgpO1xuICAgIGZ1bmN0aW9uIGlzU2FtZU1vbnRoKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHllYXIgPT09IGdldFllYXIoZGF0ZSkudG9TdHJpbmcoKSAmJiBtb250aCA9PT0gZ2V0TW9udGhIdW1hbihkYXRlKS50b1N0cmluZygpO1xuICAgIH1cbiAgICB2YXIgbWF4RGF5ID0gc2FmZU1pbihjdXJyZW50TW9udGhNYXhEYXlzLCBtYXhEYXRlICYmIGlzU2FtZU1vbnRoKG1heERhdGUpICYmIGdldERhdGUobWF4RGF0ZSkpO1xuICAgIHZhciBtaW5EYXkgPSBzYWZlTWF4KDEsIG1pbkRhdGUgJiYgaXNTYW1lTW9udGgobWluRGF0ZSkgJiYgZ2V0RGF0ZShtaW5EYXRlKSk7XG4gICAgcmV0dXJuIF9qc3goSW5wdXQsIF9fYXNzaWduKHsgbWF4OiBtYXhEYXksIG1pbjogbWluRGF5LCBuYW1lOiBcImRheVwiIH0sIG90aGVyUHJvcHMpKTtcbn1cbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgZ2V0WWVhciwgZ2V0TW9udGhIdW1hbiB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dC5qcyc7XG5pbXBvcnQgeyBzYWZlTWluLCBzYWZlTWF4IH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzLmpzJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1vbnRoSW5wdXQoX2EpIHtcbiAgICB2YXIgbWF4RGF0ZSA9IF9hLm1heERhdGUsIG1pbkRhdGUgPSBfYS5taW5EYXRlLCB5ZWFyID0gX2EueWVhciwgb3RoZXJQcm9wcyA9IF9fcmVzdChfYSwgW1wibWF4RGF0ZVwiLCBcIm1pbkRhdGVcIiwgXCJ5ZWFyXCJdKTtcbiAgICBmdW5jdGlvbiBpc1NhbWVZZWFyKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUgJiYgeWVhciA9PT0gZ2V0WWVhcihkYXRlKS50b1N0cmluZygpO1xuICAgIH1cbiAgICB2YXIgbWF4TW9udGggPSBzYWZlTWluKDEyLCBtYXhEYXRlICYmIGlzU2FtZVllYXIobWF4RGF0ZSkgJiYgZ2V0TW9udGhIdW1hbihtYXhEYXRlKSk7XG4gICAgdmFyIG1pbk1vbnRoID0gc2FmZU1heCgxLCBtaW5EYXRlICYmIGlzU2FtZVllYXIobWluRGF0ZSkgJiYgZ2V0TW9udGhIdW1hbihtaW5EYXRlKSk7XG4gICAgcmV0dXJuIF9qc3goSW5wdXQsIF9fYXNzaWduKHsgbWF4OiBtYXhNb250aCwgbWluOiBtaW5Nb250aCwgbmFtZTogXCJtb250aFwiIH0sIG90aGVyUHJvcHMpKTtcbn1cbiIsImltcG9ydCBnZXRVc2VyTG9jYWxlIGZyb20gJ2dldC11c2VyLWxvY2FsZSc7XG52YXIgZm9ybWF0dGVyQ2FjaGUgPSBuZXcgTWFwKCk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybWF0dGVyKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZm9ybWF0dGVyKGxvY2FsZSwgZGF0ZSkge1xuICAgICAgICB2YXIgbG9jYWxlV2l0aERlZmF1bHQgPSBsb2NhbGUgfHwgZ2V0VXNlckxvY2FsZSgpO1xuICAgICAgICBpZiAoIWZvcm1hdHRlckNhY2hlLmhhcyhsb2NhbGVXaXRoRGVmYXVsdCkpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlckNhY2hlLnNldChsb2NhbGVXaXRoRGVmYXVsdCwgbmV3IE1hcCgpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZm9ybWF0dGVyQ2FjaGVMb2NhbGUgPSBmb3JtYXR0ZXJDYWNoZS5nZXQobG9jYWxlV2l0aERlZmF1bHQpO1xuICAgICAgICBpZiAoIWZvcm1hdHRlckNhY2hlTG9jYWxlLmhhcyhvcHRpb25zKSkge1xuICAgICAgICAgICAgZm9ybWF0dGVyQ2FjaGVMb2NhbGUuc2V0KG9wdGlvbnMsIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZVdpdGhEZWZhdWx0IHx8IHVuZGVmaW5lZCwgb3B0aW9ucykuZm9ybWF0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybWF0dGVyQ2FjaGVMb2NhbGUuZ2V0KG9wdGlvbnMpKGRhdGUpO1xuICAgIH07XG59XG4vKipcbiAqIENoYW5nZXMgdGhlIGhvdXIgaW4gYSBEYXRlIHRvIGVuc3VyZSByaWdodCBkYXRlIGZvcm1hdHRpbmcgZXZlbiBpZiBEU1QgaXMgbWVzc2VkIHVwLlxuICogV29ya2Fyb3VuZCBmb3IgYnVnIGluIFdlYktpdCBhbmQgRmlyZWZveCB3aXRoIGhpc3RvcmljYWwgZGF0ZXMuXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWU6XG4gKiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD03NTA0NjVcbiAqIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEzODU2NDNcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBEYXRlIHdpdGggaG91ciBzZXQgdG8gMTIuXG4gKi9cbmZ1bmN0aW9uIHRvU2FmZUhvdXIoZGF0ZSkge1xuICAgIHZhciBzYWZlRGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIHJldHVybiBuZXcgRGF0ZShzYWZlRGF0ZS5zZXRIb3VycygxMikpO1xufVxuZnVuY3Rpb24gZ2V0U2FmZUZvcm1hdHRlcihvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChsb2NhbGUsIGRhdGUpIHsgcmV0dXJuIGdldEZvcm1hdHRlcihvcHRpb25zKShsb2NhbGUsIHRvU2FmZUhvdXIoZGF0ZSkpOyB9O1xufVxudmFyIGZvcm1hdE1vbnRoT3B0aW9ucyA9IHsgbW9udGg6ICdsb25nJyB9O1xudmFyIGZvcm1hdFNob3J0TW9udGhPcHRpb25zID0geyBtb250aDogJ3Nob3J0JyB9O1xuZXhwb3J0IHZhciBmb3JtYXRNb250aCA9IGdldFNhZmVGb3JtYXR0ZXIoZm9ybWF0TW9udGhPcHRpb25zKTtcbmV4cG9ydCB2YXIgZm9ybWF0U2hvcnRNb250aCA9IGdldFNhZmVGb3JtYXR0ZXIoZm9ybWF0U2hvcnRNb250aE9wdGlvbnMpO1xuIiwidmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IHsgZ2V0WWVhciwgZ2V0TW9udGhIdW1hbiB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5pbXBvcnQgeyBmb3JtYXRNb250aCwgZm9ybWF0U2hvcnRNb250aCB9IGZyb20gJy4uL3NoYXJlZC9kYXRlRm9ybWF0dGVyLmpzJztcbmltcG9ydCB7IHNhZmVNaW4sIHNhZmVNYXggfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMuanMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTW9udGhTZWxlY3QoX2EpIHtcbiAgICB2YXIgYXJpYUxhYmVsID0gX2EuYXJpYUxhYmVsLCBhdXRvRm9jdXMgPSBfYS5hdXRvRm9jdXMsIGNsYXNzTmFtZSA9IF9hLmNsYXNzTmFtZSwgZGlzYWJsZWQgPSBfYS5kaXNhYmxlZCwgaW5wdXRSZWYgPSBfYS5pbnB1dFJlZiwgbG9jYWxlID0gX2EubG9jYWxlLCBtYXhEYXRlID0gX2EubWF4RGF0ZSwgbWluRGF0ZSA9IF9hLm1pbkRhdGUsIG9uQ2hhbmdlID0gX2Eub25DaGFuZ2UsIG9uS2V5RG93biA9IF9hLm9uS2V5RG93biwgX2IgPSBfYS5wbGFjZWhvbGRlciwgcGxhY2Vob2xkZXIgPSBfYiA9PT0gdm9pZCAwID8gJy0tJyA6IF9iLCByZXF1aXJlZCA9IF9hLnJlcXVpcmVkLCBzaG9ydCA9IF9hLnNob3J0LCB2YWx1ZSA9IF9hLnZhbHVlLCB5ZWFyID0gX2EueWVhcjtcbiAgICBmdW5jdGlvbiBpc1NhbWVZZWFyKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUgJiYgeWVhciA9PT0gZ2V0WWVhcihkYXRlKS50b1N0cmluZygpO1xuICAgIH1cbiAgICB2YXIgbWF4TW9udGggPSBzYWZlTWluKDEyLCBtYXhEYXRlICYmIGlzU2FtZVllYXIobWF4RGF0ZSkgJiYgZ2V0TW9udGhIdW1hbihtYXhEYXRlKSk7XG4gICAgdmFyIG1pbk1vbnRoID0gc2FmZU1heCgxLCBtaW5EYXRlICYmIGlzU2FtZVllYXIobWluRGF0ZSkgJiYgZ2V0TW9udGhIdW1hbihtaW5EYXRlKSk7XG4gICAgdmFyIGRhdGVzID0gX19zcHJlYWRBcnJheShbXSwgQXJyYXkoMTIpLCB0cnVlKS5tYXAoZnVuY3Rpb24gKGVsLCBpbmRleCkgeyByZXR1cm4gbmV3IERhdGUoMjAxOSwgaW5kZXgsIDEpOyB9KTtcbiAgICB2YXIgbmFtZSA9ICdtb250aCc7XG4gICAgdmFyIGZvcm1hdHRlciA9IHNob3J0ID8gZm9ybWF0U2hvcnRNb250aCA6IGZvcm1hdE1vbnRoO1xuICAgIHJldHVybiAoX2pzeHMoXCJzZWxlY3RcIiwgeyBcImFyaWEtbGFiZWxcIjogYXJpYUxhYmVsLCBhdXRvRm9jdXM6IGF1dG9Gb2N1cywgY2xhc3NOYW1lOiBjbHN4KFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJfX2lucHV0XCIpLCBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX19cIikuY29uY2F0KG5hbWUpKSwgXCJkYXRhLWlucHV0XCI6IFwidHJ1ZVwiLCBcImRhdGEtc2VsZWN0XCI6IFwidHJ1ZVwiLCBkaXNhYmxlZDogZGlzYWJsZWQsIG5hbWU6IG5hbWUsIG9uQ2hhbmdlOiBvbkNoYW5nZSwgb25LZXlEb3duOiBvbktleURvd24sIFxuICAgICAgICAvLyBBc3NlcnRpb24gaXMgbmVlZGVkIGZvciBSZWFjdCAxOCBjb21wYXRpYmlsaXR5XG4gICAgICAgIHJlZjogaW5wdXRSZWYsIHJlcXVpcmVkOiByZXF1aXJlZCwgdmFsdWU6IHZhbHVlICE9PSBudWxsID8gdmFsdWUgOiAnJywgY2hpbGRyZW46IFshdmFsdWUgJiYgX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiLCBjaGlsZHJlbjogcGxhY2Vob2xkZXIgfSksIGRhdGVzLm1hcChmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciBtb250aCA9IGdldE1vbnRoSHVtYW4oZGF0ZSk7XG4gICAgICAgICAgICAgICAgdmFyIGRpc2FibGVkID0gbW9udGggPCBtaW5Nb250aCB8fCBtb250aCA+IG1heE1vbnRoO1xuICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeChcIm9wdGlvblwiLCB7IGRpc2FibGVkOiBkaXNhYmxlZCwgdmFsdWU6IG1vbnRoLCBjaGlsZHJlbjogZm9ybWF0dGVyKGxvY2FsZSwgZGF0ZSkgfSwgbW9udGgpKTtcbiAgICAgICAgICAgIH0pXSB9KSk7XG59XG4iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tICdAd29qdGVrbWFqL2RhdGUtdXRpbHMnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQuanMnO1xuaW1wb3J0IHsgc2FmZU1heCwgc2FmZU1pbiB9IGZyb20gJy4uL3NoYXJlZC91dGlscy5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBZZWFySW5wdXQoX2EpIHtcbiAgICB2YXIgbWF4RGF0ZSA9IF9hLm1heERhdGUsIG1pbkRhdGUgPSBfYS5taW5EYXRlLCBfYiA9IF9hLnBsYWNlaG9sZGVyLCBwbGFjZWhvbGRlciA9IF9iID09PSB2b2lkIDAgPyAnLS0tLScgOiBfYiwgdmFsdWVUeXBlID0gX2EudmFsdWVUeXBlLCBvdGhlclByb3BzID0gX19yZXN0KF9hLCBbXCJtYXhEYXRlXCIsIFwibWluRGF0ZVwiLCBcInBsYWNlaG9sZGVyXCIsIFwidmFsdWVUeXBlXCJdKTtcbiAgICB2YXIgbWF4WWVhciA9IHNhZmVNaW4oMjc1NzYwLCBtYXhEYXRlICYmIGdldFllYXIobWF4RGF0ZSkpO1xuICAgIHZhciBtaW5ZZWFyID0gc2FmZU1heCgxLCBtaW5EYXRlICYmIGdldFllYXIobWluRGF0ZSkpO1xuICAgIHZhciB5ZWFyU3RlcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh2YWx1ZVR5cGUgPT09ICdjZW50dXJ5Jykge1xuICAgICAgICAgICAgcmV0dXJuIDEwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIChfanN4KElucHV0LCBfX2Fzc2lnbih7IG1heDogbWF4WWVhciwgbWluOiBtaW5ZZWFyLCBuYW1lOiBcInllYXJcIiwgcGxhY2Vob2xkZXI6IHBsYWNlaG9sZGVyLCBzdGVwOiB5ZWFyU3RlcCB9LCBvdGhlclByb3BzKSkpO1xufVxuIiwiaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGdldFllYXIsIGdldElTT0xvY2FsRGF0ZSwgZ2V0SVNPTG9jYWxNb250aCB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOYXRpdmVJbnB1dChfYSkge1xuICAgIHZhciBhcmlhTGFiZWwgPSBfYS5hcmlhTGFiZWwsIGRpc2FibGVkID0gX2EuZGlzYWJsZWQsIG1heERhdGUgPSBfYS5tYXhEYXRlLCBtaW5EYXRlID0gX2EubWluRGF0ZSwgbmFtZSA9IF9hLm5hbWUsIG9uQ2hhbmdlID0gX2Eub25DaGFuZ2UsIHJlcXVpcmVkID0gX2EucmVxdWlyZWQsIHZhbHVlID0gX2EudmFsdWUsIHZhbHVlVHlwZSA9IF9hLnZhbHVlVHlwZTtcbiAgICB2YXIgbmF0aXZlSW5wdXRUeXBlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoICh2YWx1ZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ251bWJlcic7XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdtb250aCc7XG4gICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZVR5cGUnKTtcbiAgICAgICAgfVxuICAgIH0pKCk7XG4gICAgdmFyIG5hdGl2ZVZhbHVlUGFyc2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoICh2YWx1ZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0WWVhcjtcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0SVNPTG9jYWxNb250aDtcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldElTT0xvY2FsRGF0ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlVHlwZScpO1xuICAgICAgICB9XG4gICAgfSkoKTtcbiAgICBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIHJldHVybiAoX2pzeChcImlucHV0XCIsIHsgXCJhcmlhLWxhYmVsXCI6IGFyaWFMYWJlbCwgZGlzYWJsZWQ6IGRpc2FibGVkLCBoaWRkZW46IHRydWUsIG1heDogbWF4RGF0ZSA/IG5hdGl2ZVZhbHVlUGFyc2VyKG1heERhdGUpIDogdW5kZWZpbmVkLCBtaW46IG1pbkRhdGUgPyBuYXRpdmVWYWx1ZVBhcnNlcihtaW5EYXRlKSA6IHVuZGVmaW5lZCwgbmFtZTogbmFtZSwgb25DaGFuZ2U6IG9uQ2hhbmdlLCBvbkZvY3VzOiBzdG9wUHJvcGFnYXRpb24sIHJlcXVpcmVkOiByZXF1aXJlZCwgc3R5bGU6IHtcbiAgICAgICAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB6SW5kZXg6ICctOTk5JyxcbiAgICAgICAgfSwgdHlwZTogbmF0aXZlSW5wdXRUeXBlLCB2YWx1ZTogdmFsdWUgPyBuYXRpdmVWYWx1ZVBhcnNlcih2YWx1ZSkgOiAnJyB9KSk7XG59XG4iLCJpbXBvcnQgeyBnZXREZWNhZGVTdGFydCwgZ2V0RGVjYWRlRW5kLCBnZXRZZWFyU3RhcnQsIGdldFllYXJFbmQsIGdldE1vbnRoU3RhcnQsIGdldE1vbnRoRW5kLCBnZXREYXlTdGFydCwgZ2V0RGF5RW5kLCB9IGZyb20gJ0B3b2p0ZWttYWovZGF0ZS11dGlscyc7XG4vKipcbiAqIFJldHVybnMgdGhlIGJlZ2lubmluZyBvZiBhIGdpdmVuIHJhbmdlLlxuICpcbiAqIEBwYXJhbSB7UmFuZ2VUeXBlfSByYW5nZVR5cGUgUmFuZ2UgdHlwZSAoZS5nLiAnZGF5JylcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVnaW4ocmFuZ2VUeXBlLCBkYXRlKSB7XG4gICAgc3dpdGNoIChyYW5nZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnZGVjYWRlJzpcbiAgICAgICAgICAgIHJldHVybiBnZXREZWNhZGVTdGFydChkYXRlKTtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICByZXR1cm4gZ2V0WWVhclN0YXJ0KGRhdGUpO1xuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TW9udGhTdGFydChkYXRlKTtcbiAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIHJldHVybiBnZXREYXlTdGFydChkYXRlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmFuZ2VUeXBlOiBcIi5jb25jYXQocmFuZ2VUeXBlKSk7XG4gICAgfVxufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlbmQgb2YgYSBnaXZlbiByYW5nZS5cbiAqXG4gKiBAcGFyYW0ge1JhbmdlVHlwZX0gcmFuZ2VUeXBlIFJhbmdlIHR5cGUgKGUuZy4gJ2RheScpXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZChyYW5nZVR5cGUsIGRhdGUpIHtcbiAgICBzd2l0Y2ggKHJhbmdlVHlwZSkge1xuICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgcmV0dXJuIGdldERlY2FkZUVuZChkYXRlKTtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICByZXR1cm4gZ2V0WWVhckVuZChkYXRlKTtcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgcmV0dXJuIGdldE1vbnRoRW5kKGRhdGUpO1xuICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgcmV0dXJuIGdldERheUVuZChkYXRlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmFuZ2VUeXBlOiBcIi5jb25jYXQocmFuZ2VUeXBlKSk7XG4gICAgfVxufVxuIiwiJ3VzZSBjbGllbnQnO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRZZWFyLCBnZXRNb250aEh1bWFuLCBnZXREYXRlIH0gZnJvbSAnQHdvanRla21hai9kYXRlLXV0aWxzJztcbmltcG9ydCBEaXZpZGVyIGZyb20gJy4vRGl2aWRlci5qcyc7XG5pbXBvcnQgRGF5SW5wdXQgZnJvbSAnLi9EYXRlSW5wdXQvRGF5SW5wdXQuanMnO1xuaW1wb3J0IE1vbnRoSW5wdXQgZnJvbSAnLi9EYXRlSW5wdXQvTW9udGhJbnB1dC5qcyc7XG5pbXBvcnQgTW9udGhTZWxlY3QgZnJvbSAnLi9EYXRlSW5wdXQvTW9udGhTZWxlY3QuanMnO1xuaW1wb3J0IFllYXJJbnB1dCBmcm9tICcuL0RhdGVJbnB1dC9ZZWFySW5wdXQuanMnO1xuaW1wb3J0IE5hdGl2ZUlucHV0IGZyb20gJy4vRGF0ZUlucHV0L05hdGl2ZUlucHV0LmpzJztcbmltcG9ydCB7IGdldEZvcm1hdHRlciB9IGZyb20gJy4vc2hhcmVkL2RhdGVGb3JtYXR0ZXIuanMnO1xuaW1wb3J0IHsgZ2V0QmVnaW4sIGdldEVuZCB9IGZyb20gJy4vc2hhcmVkL2RhdGVzLmpzJztcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuL3NoYXJlZC91dGlscy5qcyc7XG52YXIgZ2V0Rm9ybWF0dGVyT3B0aW9uc0NhY2hlID0ge307XG52YXIgZGVmYXVsdE1pbkRhdGUgPSBuZXcgRGF0ZSgpO1xuZGVmYXVsdE1pbkRhdGUuc2V0RnVsbFllYXIoMSwgMCwgMSk7XG5kZWZhdWx0TWluRGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbnZhciBkZWZhdWx0TWF4RGF0ZSA9IG5ldyBEYXRlKDguNjRlMTUpO1xudmFyIGFsbFZpZXdzID0gWydjZW50dXJ5JywgJ2RlY2FkZScsICd5ZWFyJywgJ21vbnRoJ107XG52YXIgYWxsVmFsdWVUeXBlcyA9IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgYWxsVmlld3Muc2xpY2UoMSksIHRydWUpLCBbJ2RheSddLCBmYWxzZSk7XG5mdW5jdGlvbiB0b0RhdGUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbn1cbi8qKlxuICogUmV0dXJucyB2YWx1ZSB0eXBlIHRoYXQgY2FuIGJlIHJldHVybmVkIHdpdGggY3VycmVudGx5IGFwcGxpZWQgc2V0dGluZ3MuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlVHlwZSh2aWV3KSB7XG4gICAgdmFyIGluZGV4ID0gYWxsVmlld3MuaW5kZXhPZih2aWV3KTtcbiAgICByZXR1cm4gYWxsVmFsdWVUeXBlc1tpbmRleF07XG59XG5mdW5jdGlvbiBnZXRWYWx1ZSh2YWx1ZSwgaW5kZXgpIHtcbiAgICB2YXIgcmF3VmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlW2luZGV4XSA6IHZhbHVlO1xuICAgIGlmICghcmF3VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciB2YWx1ZURhdGUgPSB0b0RhdGUocmF3VmFsdWUpO1xuICAgIGlmIChpc05hTih2YWx1ZURhdGUuZ2V0VGltZSgpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGU6IFwiLmNvbmNhdCh2YWx1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVEYXRlO1xufVxuZnVuY3Rpb24gZ2V0RGV0YWlsVmFsdWUoX2EsIGluZGV4KSB7XG4gICAgdmFyIHZhbHVlID0gX2EudmFsdWUsIG1pbkRhdGUgPSBfYS5taW5EYXRlLCBtYXhEYXRlID0gX2EubWF4RGF0ZSwgbWF4RGV0YWlsID0gX2EubWF4RGV0YWlsO1xuICAgIHZhciB2YWx1ZVBpZWNlID0gZ2V0VmFsdWUodmFsdWUsIGluZGV4KTtcbiAgICBpZiAoIXZhbHVlUGllY2UpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciB2YWx1ZVR5cGUgPSBnZXRWYWx1ZVR5cGUobWF4RGV0YWlsKTtcbiAgICB2YXIgZGV0YWlsVmFsdWVGcm9tID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRCZWdpbih2YWx1ZVR5cGUsIHZhbHVlUGllY2UpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRFbmQodmFsdWVUeXBlLCB2YWx1ZVBpZWNlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbmRleCB2YWx1ZTogXCIuY29uY2F0KGluZGV4KSk7XG4gICAgICAgIH1cbiAgICB9KSgpO1xuICAgIHJldHVybiBiZXR3ZWVuKGRldGFpbFZhbHVlRnJvbSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG59XG52YXIgZ2V0RGV0YWlsVmFsdWVGcm9tID0gZnVuY3Rpb24gKGFyZ3MpIHsgcmV0dXJuIGdldERldGFpbFZhbHVlKGFyZ3MsIDApOyB9O1xudmFyIGdldERldGFpbFZhbHVlVG8gPSBmdW5jdGlvbiAoYXJncykgeyByZXR1cm4gZ2V0RGV0YWlsVmFsdWUoYXJncywgMSk7IH07XG52YXIgZ2V0RGV0YWlsVmFsdWVBcnJheSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgcmV0dXJuIFtnZXREZXRhaWxWYWx1ZUZyb20sIGdldERldGFpbFZhbHVlVG9dLm1hcChmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuKGFyZ3MpOyB9KTtcbn07XG5mdW5jdGlvbiBpc0ludGVybmFsSW5wdXQoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmRhdGFzZXQuaW5wdXQgPT09ICd0cnVlJztcbn1cbmZ1bmN0aW9uIGZpbmRJbnB1dChlbGVtZW50LCBwcm9wZXJ0eSkge1xuICAgIHZhciBuZXh0RWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgZG8ge1xuICAgICAgICBuZXh0RWxlbWVudCA9IG5leHRFbGVtZW50W3Byb3BlcnR5XTtcbiAgICB9IHdoaWxlIChuZXh0RWxlbWVudCAmJiAhaXNJbnRlcm5hbElucHV0KG5leHRFbGVtZW50KSk7XG4gICAgcmV0dXJuIG5leHRFbGVtZW50O1xufVxuZnVuY3Rpb24gZm9jdXMoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJDdXN0b21JbnB1dHMocGxhY2Vob2xkZXIsIGVsZW1lbnRGdW5jdGlvbnMsIGFsbG93TXVsdGlwbGVJbnN0YW5jZXMpIHtcbiAgICB2YXIgdXNlZEZ1bmN0aW9ucyA9IFtdO1xuICAgIHZhciBwYXR0ZXJuID0gbmV3IFJlZ0V4cChPYmplY3Qua2V5cyhlbGVtZW50RnVuY3Rpb25zKVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gXCJcIi5jb25jYXQoZWwsIFwiK1wiKTsgfSlcbiAgICAgICAgLmpvaW4oJ3wnKSwgJ2cnKTtcbiAgICB2YXIgbWF0Y2hlcyA9IHBsYWNlaG9sZGVyLm1hdGNoKHBhdHRlcm4pO1xuICAgIHJldHVybiBwbGFjZWhvbGRlci5zcGxpdChwYXR0ZXJuKS5yZWR1Y2UoZnVuY3Rpb24gKGFyciwgZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGRpdmlkZXIgPSBlbGVtZW50ICYmIChcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLWFycmF5LWluZGV4LWtleVxuICAgICAgICBfanN4KERpdmlkZXIsIHsgY2hpbGRyZW46IGVsZW1lbnQgfSwgXCJzZXBhcmF0b3JfXCIuY29uY2F0KGluZGV4KSkpO1xuICAgICAgICBhcnIucHVzaChkaXZpZGVyKTtcbiAgICAgICAgdmFyIGN1cnJlbnRNYXRjaCA9IG1hdGNoZXMgJiYgbWF0Y2hlc1tpbmRleF07XG4gICAgICAgIGlmIChjdXJyZW50TWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciByZW5kZXJGdW5jdGlvbiA9IGVsZW1lbnRGdW5jdGlvbnNbY3VycmVudE1hdGNoXSB8fFxuICAgICAgICAgICAgICAgIGVsZW1lbnRGdW5jdGlvbnNbT2JqZWN0LmtleXMoZWxlbWVudEZ1bmN0aW9ucykuZmluZChmdW5jdGlvbiAoZWxlbWVudEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50TWF0Y2gubWF0Y2goZWxlbWVudEZ1bmN0aW9uKTtcbiAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICBpZiAoIXJlbmRlckZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYWxsb3dNdWx0aXBsZUluc3RhbmNlcyAmJiB1c2VkRnVuY3Rpb25zLmluY2x1ZGVzKHJlbmRlckZ1bmN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKGN1cnJlbnRNYXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChyZW5kZXJGdW5jdGlvbihjdXJyZW50TWF0Y2gsIGluZGV4KSk7XG4gICAgICAgICAgICAgICAgdXNlZEZ1bmN0aW9ucy5wdXNoKHJlbmRlckZ1bmN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH0sIFtdKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERhdGVJbnB1dChfYSkge1xuICAgIHZhciBhdXRvRm9jdXMgPSBfYS5hdXRvRm9jdXMsIGNsYXNzTmFtZSA9IF9hLmNsYXNzTmFtZSwgZGF5QXJpYUxhYmVsID0gX2EuZGF5QXJpYUxhYmVsLCBkYXlQbGFjZWhvbGRlciA9IF9hLmRheVBsYWNlaG9sZGVyLCBkaXNhYmxlZCA9IF9hLmRpc2FibGVkLCBmb3JtYXQgPSBfYS5mb3JtYXQsIF9iID0gX2EuaXNDYWxlbmRhck9wZW4sIGlzQ2FsZW5kYXJPcGVuUHJvcHMgPSBfYiA9PT0gdm9pZCAwID8gbnVsbCA6IF9iLCBsb2NhbGUgPSBfYS5sb2NhbGUsIG1heERhdGUgPSBfYS5tYXhEYXRlLCBfYyA9IF9hLm1heERldGFpbCwgbWF4RGV0YWlsID0gX2MgPT09IHZvaWQgMCA/ICdtb250aCcgOiBfYywgbWluRGF0ZSA9IF9hLm1pbkRhdGUsIG1vbnRoQXJpYUxhYmVsID0gX2EubW9udGhBcmlhTGFiZWwsIG1vbnRoUGxhY2Vob2xkZXIgPSBfYS5tb250aFBsYWNlaG9sZGVyLCBfZCA9IF9hLm5hbWUsIG5hbWUgPSBfZCA9PT0gdm9pZCAwID8gJ2RhdGUnIDogX2QsIG5hdGl2ZUlucHV0QXJpYUxhYmVsID0gX2EubmF0aXZlSW5wdXRBcmlhTGFiZWwsIG9uQ2hhbmdlUHJvcHMgPSBfYS5vbkNoYW5nZSwgb25JbnZhbGlkQ2hhbmdlID0gX2Eub25JbnZhbGlkQ2hhbmdlLCByZXF1aXJlZCA9IF9hLnJlcXVpcmVkLCBfZSA9IF9hLnJldHVyblZhbHVlLCByZXR1cm5WYWx1ZSA9IF9lID09PSB2b2lkIDAgPyAnc3RhcnQnIDogX2UsIHNob3dMZWFkaW5nWmVyb3MgPSBfYS5zaG93TGVhZGluZ1plcm9zLCB2YWx1ZVByb3BzID0gX2EudmFsdWUsIHllYXJBcmlhTGFiZWwgPSBfYS55ZWFyQXJpYUxhYmVsLCB5ZWFyUGxhY2Vob2xkZXIgPSBfYS55ZWFyUGxhY2Vob2xkZXI7XG4gICAgdmFyIF9mID0gdXNlU3RhdGUobnVsbCksIHllYXIgPSBfZlswXSwgc2V0WWVhciA9IF9mWzFdO1xuICAgIHZhciBfZyA9IHVzZVN0YXRlKG51bGwpLCBtb250aCA9IF9nWzBdLCBzZXRNb250aCA9IF9nWzFdO1xuICAgIHZhciBfaCA9IHVzZVN0YXRlKG51bGwpLCBkYXkgPSBfaFswXSwgc2V0RGF5ID0gX2hbMV07XG4gICAgdmFyIF9qID0gdXNlU3RhdGUobnVsbCksIHZhbHVlID0gX2pbMF0sIHNldFZhbHVlID0gX2pbMV07XG4gICAgdmFyIHllYXJJbnB1dCA9IHVzZVJlZihudWxsKTtcbiAgICB2YXIgbW9udGhJbnB1dCA9IHVzZVJlZihudWxsKTtcbiAgICB2YXIgbW9udGhTZWxlY3QgPSB1c2VSZWYobnVsbCk7XG4gICAgdmFyIGRheUlucHV0ID0gdXNlUmVmKG51bGwpO1xuICAgIHZhciBfayA9IHVzZVN0YXRlKGlzQ2FsZW5kYXJPcGVuUHJvcHMpLCBpc0NhbGVuZGFyT3BlbiA9IF9rWzBdLCBzZXRJc0NhbGVuZGFyT3BlbiA9IF9rWzFdO1xuICAgIHZhciBsYXN0UHJlc3NlZEtleSA9IHVzZVJlZih1bmRlZmluZWQpO1xuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldElzQ2FsZW5kYXJPcGVuKGlzQ2FsZW5kYXJPcGVuUHJvcHMpO1xuICAgIH0sIFtpc0NhbGVuZGFyT3BlblByb3BzXSk7XG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5leHRWYWx1ZSA9IGdldERldGFpbFZhbHVlRnJvbSh7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVQcm9wcyxcbiAgICAgICAgICAgIG1pbkRhdGU6IG1pbkRhdGUsXG4gICAgICAgICAgICBtYXhEYXRlOiBtYXhEYXRlLFxuICAgICAgICAgICAgbWF4RGV0YWlsOiBtYXhEZXRhaWwsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobmV4dFZhbHVlKSB7XG4gICAgICAgICAgICBzZXRZZWFyKGdldFllYXIobmV4dFZhbHVlKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHNldE1vbnRoKGdldE1vbnRoSHVtYW4obmV4dFZhbHVlKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHNldERheShnZXREYXRlKG5leHRWYWx1ZSkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBzZXRWYWx1ZShuZXh0VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0WWVhcihudWxsKTtcbiAgICAgICAgICAgIHNldE1vbnRoKG51bGwpO1xuICAgICAgICAgICAgc2V0RGF5KG51bGwpO1xuICAgICAgICAgICAgc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIHZhbHVlUHJvcHMsXG4gICAgICAgIG1pbkRhdGUsXG4gICAgICAgIG1heERhdGUsXG4gICAgICAgIG1heERldGFpbCxcbiAgICAgICAgLy8gVG9nZ2xpbmcgY2FsZW5kYXIgdmlzaWJpbGl0eSByZXNldHMgdmFsdWVzXG4gICAgICAgIGlzQ2FsZW5kYXJPcGVuLFxuICAgIF0pO1xuICAgIHZhciB2YWx1ZVR5cGUgPSBnZXRWYWx1ZVR5cGUobWF4RGV0YWlsKTtcbiAgICB2YXIgZm9ybWF0RGF0ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsZXZlbCA9IGFsbFZpZXdzLmluZGV4T2YobWF4RGV0YWlsKTtcbiAgICAgICAgdmFyIGZvcm1hdHRlck9wdGlvbnMgPSBnZXRGb3JtYXR0ZXJPcHRpb25zQ2FjaGVbbGV2ZWxdIHx8XG4gICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0geyB5ZWFyOiAnbnVtZXJpYycgfTtcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPj0gMikge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm1vbnRoID0gJ251bWVyaWMnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPj0gMykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmRheSA9ICdudW1lcmljJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2V0Rm9ybWF0dGVyT3B0aW9uc0NhY2hlW2xldmVsXSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICByZXR1cm4gZ2V0Rm9ybWF0dGVyKGZvcm1hdHRlck9wdGlvbnMpO1xuICAgIH0pKCk7XG4gICAgLyoqXG4gICAgICogR2V0cyBjdXJyZW50IHZhbHVlIGluIGEgZGVzaXJlZCBmb3JtYXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UHJvY2Vzc2VkVmFsdWUodmFsdWUpIHtcbiAgICAgICAgdmFyIHByb2Nlc3NGdW5jdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHJldHVyblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGV0YWlsVmFsdWVGcm9tO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXREZXRhaWxWYWx1ZVRvO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldERldGFpbFZhbHVlQXJyYXk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHJldHVyblZhbHVlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgICByZXR1cm4gcHJvY2Vzc0Z1bmN0aW9uKHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIG1pbkRhdGU6IG1pbkRhdGUsXG4gICAgICAgICAgICBtYXhEYXRlOiBtYXhEYXRlLFxuICAgICAgICAgICAgbWF4RGV0YWlsOiBtYXhEZXRhaWwsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgcGxhY2Vob2xkZXIgPSBmb3JtYXQgfHxcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB5ZWFyID0gMjAxNztcbiAgICAgICAgICAgIHZhciBtb250aEluZGV4ID0gMTE7XG4gICAgICAgICAgICB2YXIgZGF5ID0gMTE7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoSW5kZXgsIGRheSk7XG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkRGF0ZSA9IGZvcm1hdERhdGUobG9jYWxlLCBkYXRlKTtcbiAgICAgICAgICAgIHZhciBkYXRlUGllY2VzID0gWyd5ZWFyJywgJ21vbnRoJywgJ2RheSddO1xuICAgICAgICAgICAgdmFyIGRhdGVQaWVjZVJlcGxhY2VtZW50cyA9IFsneScsICdNJywgJ2QnXTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZvcm1hdERhdGVQaWVjZShuYW1lLCBkYXRlVG9Gb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVyT3B0aW9ucyA9IGdldEZvcm1hdHRlck9wdGlvbnNDYWNoZVtuYW1lXSB8fFxuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSAoX2EgPSB7fSwgX2FbbmFtZV0gPSAnbnVtZXJpYycsIF9hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZvcm1hdHRlck9wdGlvbnNDYWNoZVtuYW1lXSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0Rm9ybWF0dGVyKGZvcm1hdHRlck9wdGlvbnMpKGxvY2FsZSwgZGF0ZVRvRm9ybWF0KS5tYXRjaCgvXFxkezEsfS8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gZm9ybWF0dGVkRGF0ZTtcbiAgICAgICAgICAgIGRhdGVQaWVjZXMuZm9yRWFjaChmdW5jdGlvbiAoZGF0ZVBpZWNlLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IGZvcm1hdERhdGVQaWVjZShkYXRlUGllY2UsIGRhdGUpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVkRGF0ZVBpZWNlID0gbWF0Y2hbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlUGllY2VSZXBsYWNlbWVudCA9IGRhdGVQaWVjZVJlcGxhY2VtZW50c1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIucmVwbGFjZShmb3JtYXR0ZWREYXRlUGllY2UsIGRhdGVQaWVjZVJlcGxhY2VtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3dvanRla21hai9yZWFjdC1kYXRlLXBpY2tlci9pc3N1ZXMvMzk2XG4gICAgICAgICAgICBwbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyLnJlcGxhY2UoJzE3JywgJ3knKTtcbiAgICAgICAgICAgIHJldHVybiBwbGFjZWhvbGRlcjtcbiAgICAgICAgfSkoKTtcbiAgICB2YXIgZGl2aWRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkaXZpZGVycyA9IHBsYWNlaG9sZGVyLm1hdGNoKC9bXjAtOWEtel0vaSk7XG4gICAgICAgIHJldHVybiBkaXZpZGVycyA/IGRpdmlkZXJzWzBdIDogbnVsbDtcbiAgICB9KSgpO1xuICAgIGZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gZXZlbnQuY3VycmVudFRhcmdldCkge1xuICAgICAgICAgICAgLy8gV3JhcHBlciB3YXMgZGlyZWN0bHkgY2xpY2tlZFxuICAgICAgICAgICAgdmFyIGZpcnN0SW5wdXQgPSBldmVudC50YXJnZXQuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICBmb2N1cyhmaXJzdElucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgbGFzdFByZXNzZWRLZXkuY3VycmVudCA9IGV2ZW50LmtleTtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGNhc2UgZGl2aWRlcjoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IGV2ZW50LmtleSA9PT0gJ0Fycm93TGVmdCcgPyAncHJldmlvdXNFbGVtZW50U2libGluZycgOiAnbmV4dEVsZW1lbnRTaWJsaW5nJztcbiAgICAgICAgICAgICAgICB2YXIgbmV4dElucHV0ID0gZmluZElucHV0KGlucHV0LCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgZm9jdXMobmV4dElucHV0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25LZXlVcChldmVudCkge1xuICAgICAgICB2YXIga2V5ID0gZXZlbnQua2V5LCBpbnB1dCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdmFyIGlzTGFzdFByZXNzZWRLZXkgPSBsYXN0UHJlc3NlZEtleS5jdXJyZW50ID09PSBrZXk7XG4gICAgICAgIGlmICghaXNMYXN0UHJlc3NlZEtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpc051bWJlcktleSA9ICFpc05hTihOdW1iZXIoa2V5KSk7XG4gICAgICAgIGlmICghaXNOdW1iZXJLZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWF4ID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdtYXgnKTtcbiAgICAgICAgaWYgKCFtYXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdpdmVuIDEsIHRoZSBzbWFsbGVzdCBwb3NzaWJsZSBudW1iZXIgdGhlIHVzZXIgY291bGQgdHlwZSBieSBhZGRpbmcgYW5vdGhlciBkaWdpdCBpcyAxMC5cbiAgICAgICAgICogMTAgd291bGQgYmUgYSB2YWxpZCB2YWx1ZSBnaXZlbiBtYXggPSAxMiwgc28gd2Ugd29uJ3QganVtcCB0byB0aGUgbmV4dCBpbnB1dC5cbiAgICAgICAgICogSG93ZXZlciwgZ2l2ZW4gMiwgc21hbGxlcnMgcG9zc2libGUgbnVtYmVyIHdvdWxkIGJlIDIwLCBhbmQgdGh1cyBrZWVwaW5nIHRoZSBmb2N1cyBpblxuICAgICAgICAgKiB0aGlzIGZpZWxkIGRvZXNuJ3QgbWFrZSBzZW5zZS5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChOdW1iZXIodmFsdWUpICogMTAgPiBOdW1iZXIobWF4KSB8fCB2YWx1ZS5sZW5ndGggPj0gbWF4Lmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gJ25leHRFbGVtZW50U2libGluZyc7XG4gICAgICAgICAgICB2YXIgbmV4dElucHV0ID0gZmluZElucHV0KGlucHV0LCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICBmb2N1cyhuZXh0SW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCBhZnRlciBpbnRlcm5hbCBvbkNoYW5nZS4gQ2hlY2tzIGlucHV0IHZhbGlkaXR5LiBJZiBhbGwgZmllbGRzIGFyZSB2YWxpZCxcbiAgICAgKiBjYWxscyBwcm9wcy5vbkNoYW5nZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvbkNoYW5nZUV4dGVybmFsKCkge1xuICAgICAgICBpZiAoIW9uQ2hhbmdlUHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBmaWx0ZXJCb29sZWFuKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZvcm1FbGVtZW50cyA9IFtcbiAgICAgICAgICAgIGRheUlucHV0LmN1cnJlbnQsXG4gICAgICAgICAgICBtb250aElucHV0LmN1cnJlbnQsXG4gICAgICAgICAgICBtb250aFNlbGVjdC5jdXJyZW50LFxuICAgICAgICAgICAgeWVhcklucHV0LmN1cnJlbnQsXG4gICAgICAgIF0uZmlsdGVyKGZpbHRlckJvb2xlYW4pO1xuICAgICAgICB2YXIgdmFsdWVzID0ge307XG4gICAgICAgIGZvcm1FbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChmb3JtRWxlbWVudCkge1xuICAgICAgICAgICAgdmFsdWVzW2Zvcm1FbGVtZW50Lm5hbWVdID1cbiAgICAgICAgICAgICAgICAndmFsdWVBc051bWJlcicgaW4gZm9ybUVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgPyBmb3JtRWxlbWVudC52YWx1ZUFzTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIDogTnVtYmVyKGZvcm1FbGVtZW50LnZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBpc0V2ZXJ5VmFsdWVFbXB0eSA9IGZvcm1FbGVtZW50cy5ldmVyeShmdW5jdGlvbiAoZm9ybUVsZW1lbnQpIHsgcmV0dXJuICFmb3JtRWxlbWVudC52YWx1ZTsgfSk7XG4gICAgICAgIGlmIChpc0V2ZXJ5VmFsdWVFbXB0eSkge1xuICAgICAgICAgICAgb25DaGFuZ2VQcm9wcyhudWxsLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlzRXZlcnlWYWx1ZUZpbGxlZCA9IGZvcm1FbGVtZW50cy5ldmVyeShmdW5jdGlvbiAoZm9ybUVsZW1lbnQpIHsgcmV0dXJuIGZvcm1FbGVtZW50LnZhbHVlOyB9KTtcbiAgICAgICAgdmFyIGlzRXZlcnlWYWx1ZVZhbGlkID0gZm9ybUVsZW1lbnRzLmV2ZXJ5KGZ1bmN0aW9uIChmb3JtRWxlbWVudCkgeyByZXR1cm4gZm9ybUVsZW1lbnQudmFsaWRpdHkudmFsaWQ7IH0pO1xuICAgICAgICBpZiAoaXNFdmVyeVZhbHVlRmlsbGVkICYmIGlzRXZlcnlWYWx1ZVZhbGlkKSB7XG4gICAgICAgICAgICB2YXIgeWVhcl8xID0gTnVtYmVyKHZhbHVlcy55ZWFyIHx8IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgICAgICB2YXIgbW9udGhJbmRleCA9IE51bWJlcih2YWx1ZXMubW9udGggfHwgMSkgLSAxO1xuICAgICAgICAgICAgdmFyIGRheV8xID0gTnVtYmVyKHZhbHVlcy5kYXkgfHwgMSk7XG4gICAgICAgICAgICB2YXIgcHJvcG9zZWRWYWx1ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBwcm9wb3NlZFZhbHVlLnNldEZ1bGxZZWFyKHllYXJfMSwgbW9udGhJbmRleCwgZGF5XzEpO1xuICAgICAgICAgICAgcHJvcG9zZWRWYWx1ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzZWRWYWx1ZSA9IGdldFByb2Nlc3NlZFZhbHVlKHByb3Bvc2VkVmFsdWUpO1xuICAgICAgICAgICAgb25DaGFuZ2VQcm9wcyhwcm9jZXNzZWRWYWx1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb25JbnZhbGlkQ2hhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb25JbnZhbGlkQ2hhbmdlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIG5vbi1uYXRpdmUgZGF0ZSBpbnB1dCBpcyBjaGFuZ2VkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHZhciBfYSA9IGV2ZW50LnRhcmdldCwgbmFtZSA9IF9hLm5hbWUsIHZhbHVlID0gX2EudmFsdWU7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgc2V0WWVhcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgc2V0TW9udGgodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgICAgICBzZXREYXkodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG9uQ2hhbmdlRXh0ZXJuYWwoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gbmF0aXZlIGRhdGUgaW5wdXQgaXMgY2hhbmdlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvbkNoYW5nZU5hdGl2ZShldmVudCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGlmICghb25DaGFuZ2VQcm9wcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcm9jZXNzZWRWYWx1ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX2EgPSB2YWx1ZS5zcGxpdCgnLScpLCB5ZWFyU3RyaW5nID0gX2FbMF0sIG1vbnRoU3RyaW5nID0gX2FbMV0sIGRheVN0cmluZyA9IF9hWzJdO1xuICAgICAgICAgICAgdmFyIHllYXIgPSBOdW1iZXIoeWVhclN0cmluZyk7XG4gICAgICAgICAgICB2YXIgbW9udGhJbmRleCA9IE51bWJlcihtb250aFN0cmluZykgLSAxIHx8IDA7XG4gICAgICAgICAgICB2YXIgZGF5ID0gTnVtYmVyKGRheVN0cmluZykgfHwgMTtcbiAgICAgICAgICAgIHZhciBwcm9wb3NlZFZhbHVlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHByb3Bvc2VkVmFsdWUuc2V0RnVsbFllYXIoeWVhciwgbW9udGhJbmRleCwgZGF5KTtcbiAgICAgICAgICAgIHByb3Bvc2VkVmFsdWUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICByZXR1cm4gcHJvcG9zZWRWYWx1ZTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgb25DaGFuZ2VQcm9wcyhwcm9jZXNzZWRWYWx1ZSwgZmFsc2UpO1xuICAgIH1cbiAgICB2YXIgY29tbW9uSW5wdXRQcm9wcyA9IHtcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCxcbiAgICAgICAgbWF4RGF0ZTogbWF4RGF0ZSB8fCBkZWZhdWx0TWF4RGF0ZSxcbiAgICAgICAgbWluRGF0ZTogbWluRGF0ZSB8fCBkZWZhdWx0TWluRGF0ZSxcbiAgICAgICAgb25DaGFuZ2U6IG9uQ2hhbmdlLFxuICAgICAgICBvbktleURvd246IG9uS2V5RG93bixcbiAgICAgICAgb25LZXlVcDogb25LZXlVcCxcbiAgICAgICAgLy8gVGhpcyBpcyBvbmx5IGZvciBzaG93aW5nIHZhbGlkaXR5IHdoZW4gZWRpdGluZ1xuICAgICAgICByZXF1aXJlZDogQm9vbGVhbihyZXF1aXJlZCB8fCBpc0NhbGVuZGFyT3BlbiksXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZW5kZXJEYXkoY3VycmVudE1hdGNoLCBpbmRleCkge1xuICAgICAgICBpZiAoY3VycmVudE1hdGNoICYmIGN1cnJlbnRNYXRjaC5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCB0b2tlbjogXCIuY29uY2F0KGN1cnJlbnRNYXRjaCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaG93TGVhZGluZ1plcm9zRnJvbUZvcm1hdCA9IGN1cnJlbnRNYXRjaCAmJiBjdXJyZW50TWF0Y2gubGVuZ3RoID09PSAyO1xuICAgICAgICByZXR1cm4gKF9qc3goRGF5SW5wdXQsIF9fYXNzaWduKHt9LCBjb21tb25JbnB1dFByb3BzLCB7IGFyaWFMYWJlbDogZGF5QXJpYUxhYmVsLCBcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9uby1hdXRvZm9jdXNcbiAgICAgICAgICAgIGF1dG9Gb2N1czogaW5kZXggPT09IDAgJiYgYXV0b0ZvY3VzLCBpbnB1dFJlZjogZGF5SW5wdXQsIG1vbnRoOiBtb250aCwgcGxhY2Vob2xkZXI6IGRheVBsYWNlaG9sZGVyLCBzaG93TGVhZGluZ1plcm9zOiBzaG93TGVhZGluZ1plcm9zRnJvbUZvcm1hdCB8fCBzaG93TGVhZGluZ1plcm9zLCB2YWx1ZTogZGF5LCB5ZWFyOiB5ZWFyIH0pLCBcImRheVwiKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlck1vbnRoKGN1cnJlbnRNYXRjaCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRNYXRjaCAmJiBjdXJyZW50TWF0Y2gubGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgdG9rZW46IFwiLmNvbmNhdChjdXJyZW50TWF0Y2gpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudE1hdGNoLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIHJldHVybiAoX2pzeChNb250aFNlbGVjdCwgX19hc3NpZ24oe30sIGNvbW1vbklucHV0UHJvcHMsIHsgYXJpYUxhYmVsOiBtb250aEFyaWFMYWJlbCwgXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L25vLWF1dG9mb2N1c1xuICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogaW5kZXggPT09IDAgJiYgYXV0b0ZvY3VzLCBpbnB1dFJlZjogbW9udGhTZWxlY3QsIGxvY2FsZTogbG9jYWxlLCBwbGFjZWhvbGRlcjogbW9udGhQbGFjZWhvbGRlciwgc2hvcnQ6IGN1cnJlbnRNYXRjaC5sZW5ndGggPT09IDMsIHZhbHVlOiBtb250aCwgeWVhcjogeWVhciB9KSwgXCJtb250aFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNob3dMZWFkaW5nWmVyb3NGcm9tRm9ybWF0ID0gY3VycmVudE1hdGNoICYmIGN1cnJlbnRNYXRjaC5sZW5ndGggPT09IDI7XG4gICAgICAgIHJldHVybiAoX2pzeChNb250aElucHV0LCBfX2Fzc2lnbih7fSwgY29tbW9uSW5wdXRQcm9wcywgeyBhcmlhTGFiZWw6IG1vbnRoQXJpYUxhYmVsLCBcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9uby1hdXRvZm9jdXNcbiAgICAgICAgICAgIGF1dG9Gb2N1czogaW5kZXggPT09IDAgJiYgYXV0b0ZvY3VzLCBpbnB1dFJlZjogbW9udGhJbnB1dCwgcGxhY2Vob2xkZXI6IG1vbnRoUGxhY2Vob2xkZXIsIHNob3dMZWFkaW5nWmVyb3M6IHNob3dMZWFkaW5nWmVyb3NGcm9tRm9ybWF0IHx8IHNob3dMZWFkaW5nWmVyb3MsIHZhbHVlOiBtb250aCwgeWVhcjogeWVhciB9KSwgXCJtb250aFwiKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlclllYXIoY3VycmVudE1hdGNoLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gKF9qc3goWWVhcklucHV0LCBfX2Fzc2lnbih7fSwgY29tbW9uSW5wdXRQcm9wcywgeyBhcmlhTGFiZWw6IHllYXJBcmlhTGFiZWwsIFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L25vLWF1dG9mb2N1c1xuICAgICAgICAgICAgYXV0b0ZvY3VzOiBpbmRleCA9PT0gMCAmJiBhdXRvRm9jdXMsIGlucHV0UmVmOiB5ZWFySW5wdXQsIHBsYWNlaG9sZGVyOiB5ZWFyUGxhY2Vob2xkZXIsIHZhbHVlOiB5ZWFyLCB2YWx1ZVR5cGU6IHZhbHVlVHlwZSB9KSwgXCJ5ZWFyXCIpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyQ3VzdG9tSW5wdXRzSW50ZXJuYWwoKSB7XG4gICAgICAgIHZhciBlbGVtZW50RnVuY3Rpb25zID0ge1xuICAgICAgICAgICAgZDogcmVuZGVyRGF5LFxuICAgICAgICAgICAgTTogcmVuZGVyTW9udGgsXG4gICAgICAgICAgICB5OiByZW5kZXJZZWFyLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgYWxsb3dNdWx0aXBsZUluc3RhbmNlcyA9IHR5cGVvZiBmb3JtYXQgIT09ICd1bmRlZmluZWQnO1xuICAgICAgICByZXR1cm4gcmVuZGVyQ3VzdG9tSW5wdXRzKHBsYWNlaG9sZGVyLCBlbGVtZW50RnVuY3Rpb25zLCBhbGxvd011bHRpcGxlSW5zdGFuY2VzKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyTmF0aXZlSW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoX2pzeChOYXRpdmVJbnB1dCwgeyBhcmlhTGFiZWw6IG5hdGl2ZUlucHV0QXJpYUxhYmVsLCBkaXNhYmxlZDogZGlzYWJsZWQsIG1heERhdGU6IG1heERhdGUgfHwgZGVmYXVsdE1heERhdGUsIG1pbkRhdGU6IG1pbkRhdGUgfHwgZGVmYXVsdE1pbkRhdGUsIG5hbWU6IG5hbWUsIG9uQ2hhbmdlOiBvbkNoYW5nZU5hdGl2ZSwgcmVxdWlyZWQ6IHJlcXVpcmVkLCB2YWx1ZTogdmFsdWUsIHZhbHVlVHlwZTogdmFsdWVUeXBlIH0sIFwiZGF0ZVwiKSk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMsIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9uc1xuICAgIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIG9uQ2xpY2s6IG9uQ2xpY2ssIGNoaWxkcmVuOiBbcmVuZGVyTmF0aXZlSW5wdXQoKSwgcmVuZGVyQ3VzdG9tSW5wdXRzSW50ZXJuYWwoKV0gfSkpO1xufVxuIiwiJ3VzZSBjbGllbnQnO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBtYWtlRXZlbnRQcm9wcyBmcm9tICdtYWtlLWV2ZW50LXByb3BzJztcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IENhbGVuZGFyIGZyb20gJ3JlYWN0LWNhbGVuZGFyJztcbmltcG9ydCBGaXQgZnJvbSAncmVhY3QtZml0JztcbmltcG9ydCBEYXRlSW5wdXQgZnJvbSAnLi9EYXRlSW5wdXQuanMnO1xudmFyIGJhc2VDbGFzc05hbWUgPSAncmVhY3QtZGF0ZS1waWNrZXInO1xudmFyIG91dHNpZGVBY3Rpb25FdmVudHMgPSBbJ21vdXNlZG93bicsICdmb2N1c2luJywgJ3RvdWNoc3RhcnQnXTtcbnZhciBpY29uUHJvcHMgPSB7XG4gICAgeG1sbnM6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgd2lkdGg6IDE5LFxuICAgIGhlaWdodDogMTksXG4gICAgdmlld0JveDogJzAgMCAxOSAxOScsXG4gICAgc3Ryb2tlOiAnYmxhY2snLFxuICAgIHN0cm9rZVdpZHRoOiAyLFxufTtcbnZhciBDYWxlbmRhckljb24gPSAoX2pzeHMoXCJzdmdcIiwgX19hc3NpZ24oe30sIGljb25Qcm9wcywgeyBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiX19jYWxlbmRhci1idXR0b25fX2ljb24gXCIpLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIl9fYnV0dG9uX19pY29uXCIpLCBjaGlsZHJlbjogW19qc3goXCJyZWN0XCIsIHsgZmlsbDogXCJub25lXCIsIGhlaWdodDogXCIxNVwiLCB3aWR0aDogXCIxNVwiLCB4OiBcIjJcIiwgeTogXCIyXCIgfSksIF9qc3goXCJsaW5lXCIsIHsgeDE6IFwiNlwiLCB4MjogXCI2XCIsIHkxOiBcIjBcIiwgeTI6IFwiNFwiIH0pLCBfanN4KFwibGluZVwiLCB7IHgxOiBcIjEzXCIsIHgyOiBcIjEzXCIsIHkxOiBcIjBcIiwgeTI6IFwiNFwiIH0pXSB9KSkpO1xudmFyIENsZWFySWNvbiA9IChfanN4cyhcInN2Z1wiLCBfX2Fzc2lnbih7fSwgaWNvblByb3BzLCB7IGNsYXNzTmFtZTogXCJcIi5jb25jYXQoYmFzZUNsYXNzTmFtZSwgXCJfX2NsZWFyLWJ1dHRvbl9faWNvbiBcIikuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiX19idXR0b25fX2ljb25cIiksIGNoaWxkcmVuOiBbX2pzeChcImxpbmVcIiwgeyB4MTogXCI0XCIsIHgyOiBcIjE1XCIsIHkxOiBcIjRcIiwgeTI6IFwiMTVcIiB9KSwgX2pzeChcImxpbmVcIiwgeyB4MTogXCIxNVwiLCB4MjogXCI0XCIsIHkxOiBcIjRcIiwgeTI6IFwiMTVcIiB9KV0gfSkpKTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERhdGVQaWNrZXIocHJvcHMpIHtcbiAgICB2YXIgYXV0b0ZvY3VzID0gcHJvcHMuYXV0b0ZvY3VzLCBjYWxlbmRhckFyaWFMYWJlbCA9IHByb3BzLmNhbGVuZGFyQXJpYUxhYmVsLCBfYSA9IHByb3BzLmNhbGVuZGFySWNvbiwgY2FsZW5kYXJJY29uID0gX2EgPT09IHZvaWQgMCA/IENhbGVuZGFySWNvbiA6IF9hLCBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsIGNsZWFyQXJpYUxhYmVsID0gcHJvcHMuY2xlYXJBcmlhTGFiZWwsIF9iID0gcHJvcHMuY2xlYXJJY29uLCBjbGVhckljb24gPSBfYiA9PT0gdm9pZCAwID8gQ2xlYXJJY29uIDogX2IsIF9jID0gcHJvcHMuY2xvc2VDYWxlbmRhciwgc2hvdWxkQ2xvc2VDYWxlbmRhck9uU2VsZWN0ID0gX2MgPT09IHZvaWQgMCA/IHRydWUgOiBfYywgZGF0YVRlc3RpZCA9IHByb3BzW1wiZGF0YS10ZXN0aWRcIl0sIGRheUFyaWFMYWJlbCA9IHByb3BzLmRheUFyaWFMYWJlbCwgZGF5UGxhY2Vob2xkZXIgPSBwcm9wcy5kYXlQbGFjZWhvbGRlciwgZGlzYWJsZUNhbGVuZGFyID0gcHJvcHMuZGlzYWJsZUNhbGVuZGFyLCBkaXNhYmxlZCA9IHByb3BzLmRpc2FibGVkLCBmb3JtYXQgPSBwcm9wcy5mb3JtYXQsIGlkID0gcHJvcHMuaWQsIF9kID0gcHJvcHMuaXNPcGVuLCBpc09wZW5Qcm9wcyA9IF9kID09PSB2b2lkIDAgPyBudWxsIDogX2QsIGxvY2FsZSA9IHByb3BzLmxvY2FsZSwgbWF4RGF0ZSA9IHByb3BzLm1heERhdGUsIF9lID0gcHJvcHMubWF4RGV0YWlsLCBtYXhEZXRhaWwgPSBfZSA9PT0gdm9pZCAwID8gJ21vbnRoJyA6IF9lLCBtaW5EYXRlID0gcHJvcHMubWluRGF0ZSwgbW9udGhBcmlhTGFiZWwgPSBwcm9wcy5tb250aEFyaWFMYWJlbCwgbW9udGhQbGFjZWhvbGRlciA9IHByb3BzLm1vbnRoUGxhY2Vob2xkZXIsIF9mID0gcHJvcHMubmFtZSwgbmFtZSA9IF9mID09PSB2b2lkIDAgPyAnZGF0ZScgOiBfZiwgbmF0aXZlSW5wdXRBcmlhTGFiZWwgPSBwcm9wcy5uYXRpdmVJbnB1dEFyaWFMYWJlbCwgb25DYWxlbmRhckNsb3NlID0gcHJvcHMub25DYWxlbmRhckNsb3NlLCBvbkNhbGVuZGFyT3BlbiA9IHByb3BzLm9uQ2FsZW5kYXJPcGVuLCBvbkNoYW5nZVByb3BzID0gcHJvcHMub25DaGFuZ2UsIG9uRm9jdXNQcm9wcyA9IHByb3BzLm9uRm9jdXMsIG9uSW52YWxpZENoYW5nZSA9IHByb3BzLm9uSW52YWxpZENoYW5nZSwgX2cgPSBwcm9wcy5vcGVuQ2FsZW5kYXJPbkZvY3VzLCBvcGVuQ2FsZW5kYXJPbkZvY3VzID0gX2cgPT09IHZvaWQgMCA/IHRydWUgOiBfZywgcmVxdWlyZWQgPSBwcm9wcy5yZXF1aXJlZCwgX2ggPSBwcm9wcy5yZXR1cm5WYWx1ZSwgcmV0dXJuVmFsdWUgPSBfaCA9PT0gdm9pZCAwID8gJ3N0YXJ0JyA6IF9oLCBzaG91bGRDbG9zZUNhbGVuZGFyID0gcHJvcHMuc2hvdWxkQ2xvc2VDYWxlbmRhciwgc2hvdWxkT3BlbkNhbGVuZGFyID0gcHJvcHMuc2hvdWxkT3BlbkNhbGVuZGFyLCBzaG93TGVhZGluZ1plcm9zID0gcHJvcHMuc2hvd0xlYWRpbmdaZXJvcywgdmFsdWUgPSBwcm9wcy52YWx1ZSwgeWVhckFyaWFMYWJlbCA9IHByb3BzLnllYXJBcmlhTGFiZWwsIHllYXJQbGFjZWhvbGRlciA9IHByb3BzLnllYXJQbGFjZWhvbGRlciwgb3RoZXJQcm9wcyA9IF9fcmVzdChwcm9wcywgW1wiYXV0b0ZvY3VzXCIsIFwiY2FsZW5kYXJBcmlhTGFiZWxcIiwgXCJjYWxlbmRhckljb25cIiwgXCJjbGFzc05hbWVcIiwgXCJjbGVhckFyaWFMYWJlbFwiLCBcImNsZWFySWNvblwiLCBcImNsb3NlQ2FsZW5kYXJcIiwgJ2RhdGEtdGVzdGlkJywgXCJkYXlBcmlhTGFiZWxcIiwgXCJkYXlQbGFjZWhvbGRlclwiLCBcImRpc2FibGVDYWxlbmRhclwiLCBcImRpc2FibGVkXCIsIFwiZm9ybWF0XCIsIFwiaWRcIiwgXCJpc09wZW5cIiwgXCJsb2NhbGVcIiwgXCJtYXhEYXRlXCIsIFwibWF4RGV0YWlsXCIsIFwibWluRGF0ZVwiLCBcIm1vbnRoQXJpYUxhYmVsXCIsIFwibW9udGhQbGFjZWhvbGRlclwiLCBcIm5hbWVcIiwgXCJuYXRpdmVJbnB1dEFyaWFMYWJlbFwiLCBcIm9uQ2FsZW5kYXJDbG9zZVwiLCBcIm9uQ2FsZW5kYXJPcGVuXCIsIFwib25DaGFuZ2VcIiwgXCJvbkZvY3VzXCIsIFwib25JbnZhbGlkQ2hhbmdlXCIsIFwib3BlbkNhbGVuZGFyT25Gb2N1c1wiLCBcInJlcXVpcmVkXCIsIFwicmV0dXJuVmFsdWVcIiwgXCJzaG91bGRDbG9zZUNhbGVuZGFyXCIsIFwic2hvdWxkT3BlbkNhbGVuZGFyXCIsIFwic2hvd0xlYWRpbmdaZXJvc1wiLCBcInZhbHVlXCIsIFwieWVhckFyaWFMYWJlbFwiLCBcInllYXJQbGFjZWhvbGRlclwiXSk7XG4gICAgdmFyIF9qID0gdXNlU3RhdGUoaXNPcGVuUHJvcHMpLCBpc09wZW4gPSBfalswXSwgc2V0SXNPcGVuID0gX2pbMV07XG4gICAgdmFyIHdyYXBwZXIgPSB1c2VSZWYobnVsbCk7XG4gICAgdmFyIGNhbGVuZGFyV3JhcHBlciA9IHVzZVJlZihudWxsKTtcbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRJc09wZW4oaXNPcGVuUHJvcHMpO1xuICAgIH0sIFtpc09wZW5Qcm9wc10pO1xuICAgIGZ1bmN0aW9uIG9wZW5DYWxlbmRhcihfYSkge1xuICAgICAgICB2YXIgcmVhc29uID0gX2EucmVhc29uO1xuICAgICAgICBpZiAoc2hvdWxkT3BlbkNhbGVuZGFyKSB7XG4gICAgICAgICAgICBpZiAoIXNob3VsZE9wZW5DYWxlbmRhcih7IHJlYXNvbjogcmVhc29uIH0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldElzT3Blbih0cnVlKTtcbiAgICAgICAgaWYgKG9uQ2FsZW5kYXJPcGVuKSB7XG4gICAgICAgICAgICBvbkNhbGVuZGFyT3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBjbG9zZUNhbGVuZGFyID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciByZWFzb24gPSBfYS5yZWFzb247XG4gICAgICAgIGlmIChzaG91bGRDbG9zZUNhbGVuZGFyKSB7XG4gICAgICAgICAgICBpZiAoIXNob3VsZENsb3NlQ2FsZW5kYXIoeyByZWFzb246IHJlYXNvbiB9KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICBpZiAob25DYWxlbmRhckNsb3NlKSB7XG4gICAgICAgICAgICBvbkNhbGVuZGFyQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH0sIFtvbkNhbGVuZGFyQ2xvc2UsIHNob3VsZENsb3NlQ2FsZW5kYXJdKTtcbiAgICBmdW5jdGlvbiB0b2dnbGVDYWxlbmRhcigpIHtcbiAgICAgICAgaWYgKGlzT3Blbikge1xuICAgICAgICAgICAgY2xvc2VDYWxlbmRhcih7IHJlYXNvbjogJ2J1dHRvbkNsaWNrJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9wZW5DYWxlbmRhcih7IHJlYXNvbjogJ2J1dHRvbkNsaWNrJyB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSh2YWx1ZSwgc2hvdWxkQ2xvc2VDYWxlbmRhcikge1xuICAgICAgICBpZiAoc2hvdWxkQ2xvc2VDYWxlbmRhciA9PT0gdm9pZCAwKSB7IHNob3VsZENsb3NlQ2FsZW5kYXIgPSBzaG91bGRDbG9zZUNhbGVuZGFyT25TZWxlY3Q7IH1cbiAgICAgICAgaWYgKHNob3VsZENsb3NlQ2FsZW5kYXIpIHtcbiAgICAgICAgICAgIGNsb3NlQ2FsZW5kYXIoeyByZWFzb246ICdzZWxlY3QnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbkNoYW5nZVByb3BzKSB7XG4gICAgICAgICAgICBvbkNoYW5nZVByb3BzKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIGlmIChvbkZvY3VzUHJvcHMpIHtcbiAgICAgICAgICAgIG9uRm9jdXNQcm9wcyhldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAvLyBJbnRlcm5ldCBFeHBsb3JlciBzdGlsbCBmaXJlcyBvbkZvY3VzIG9uIGRpc2FibGVkIGVsZW1lbnRzXG4gICAgICAgIGRpc2FibGVkIHx8XG4gICAgICAgICAgICBpc09wZW4gfHxcbiAgICAgICAgICAgICFvcGVuQ2FsZW5kYXJPbkZvY3VzIHx8XG4gICAgICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC5zZWxlY3QgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9wZW5DYWxlbmRhcih7IHJlYXNvbjogJ2ZvY3VzJyB9KTtcbiAgICB9XG4gICAgdmFyIG9uS2V5RG93biA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgY2xvc2VDYWxlbmRhcih7IHJlYXNvbjogJ2VzY2FwZScgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbY2xvc2VDYWxlbmRhcl0pO1xuICAgIGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICBvbkNoYW5nZShudWxsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICB2YXIgb25PdXRzaWRlQWN0aW9uID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciB3cmFwcGVyRWwgPSB3cmFwcGVyLmN1cnJlbnQ7XG4gICAgICAgIHZhciBjYWxlbmRhcldyYXBwZXJFbCA9IGNhbGVuZGFyV3JhcHBlci5jdXJyZW50O1xuICAgICAgICAvLyBUcnkgZXZlbnQuY29tcG9zZWRQYXRoIGZpcnN0IHRvIGhhbmRsZSBjbGlja3MgaW5zaWRlIGEgU2hhZG93IERPTS5cbiAgICAgICAgdmFyIHRhcmdldCA9ICgnY29tcG9zZWRQYXRoJyBpbiBldmVudCA/IGV2ZW50LmNvbXBvc2VkUGF0aCgpWzBdIDogZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgaWYgKHRhcmdldCAmJlxuICAgICAgICAgICAgd3JhcHBlckVsICYmXG4gICAgICAgICAgICAhd3JhcHBlckVsLmNvbnRhaW5zKHRhcmdldCkgJiZcbiAgICAgICAgICAgICghY2FsZW5kYXJXcmFwcGVyRWwgfHwgIWNhbGVuZGFyV3JhcHBlckVsLmNvbnRhaW5zKHRhcmdldCkpKSB7XG4gICAgICAgICAgICBjbG9zZUNhbGVuZGFyKHsgcmVhc29uOiAnb3V0c2lkZUFjdGlvbicgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbY2FsZW5kYXJXcmFwcGVyLCBjbG9zZUNhbGVuZGFyLCB3cmFwcGVyXSk7XG4gICAgdmFyIGhhbmRsZU91dHNpZGVBY3Rpb25MaXN0ZW5lcnMgPSB1c2VDYWxsYmFjayhmdW5jdGlvbiAoc2hvdWxkTGlzdGVuKSB7XG4gICAgICAgIGlmIChzaG91bGRMaXN0ZW4gPT09IHZvaWQgMCkgeyBzaG91bGRMaXN0ZW4gPSBpc09wZW47IH1cbiAgICAgICAgb3V0c2lkZUFjdGlvbkV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKHNob3VsZExpc3Rlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIG9uT3V0c2lkZUFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBvbk91dHNpZGVBY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNob3VsZExpc3Rlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcbiAgICAgICAgfVxuICAgIH0sIFtpc09wZW4sIG9uT3V0c2lkZUFjdGlvbiwgb25LZXlEb3duXSk7XG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaGFuZGxlT3V0c2lkZUFjdGlvbkxpc3RlbmVycygpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaGFuZGxlT3V0c2lkZUFjdGlvbkxpc3RlbmVycyhmYWxzZSk7XG4gICAgICAgIH07XG4gICAgfSwgW2hhbmRsZU91dHNpZGVBY3Rpb25MaXN0ZW5lcnNdKTtcbiAgICBmdW5jdGlvbiByZW5kZXJJbnB1dHMoKSB7XG4gICAgICAgIHZhciB2YWx1ZUZyb20gPSAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV0pWzBdO1xuICAgICAgICB2YXIgYXJpYUxhYmVsUHJvcHMgPSB7XG4gICAgICAgICAgICBkYXlBcmlhTGFiZWw6IGRheUFyaWFMYWJlbCxcbiAgICAgICAgICAgIG1vbnRoQXJpYUxhYmVsOiBtb250aEFyaWFMYWJlbCxcbiAgICAgICAgICAgIG5hdGl2ZUlucHV0QXJpYUxhYmVsOiBuYXRpdmVJbnB1dEFyaWFMYWJlbCxcbiAgICAgICAgICAgIHllYXJBcmlhTGFiZWw6IHllYXJBcmlhTGFiZWwsXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwbGFjZWhvbGRlclByb3BzID0ge1xuICAgICAgICAgICAgZGF5UGxhY2Vob2xkZXI6IGRheVBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgbW9udGhQbGFjZWhvbGRlcjogbW9udGhQbGFjZWhvbGRlcixcbiAgICAgICAgICAgIHllYXJQbGFjZWhvbGRlcjogeWVhclBsYWNlaG9sZGVyLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIl9fd3JhcHBlclwiKSwgY2hpbGRyZW46IFtfanN4KERhdGVJbnB1dCwgX19hc3NpZ24oe30sIGFyaWFMYWJlbFByb3BzLCBwbGFjZWhvbGRlclByb3BzLCB7IFxuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvbm8tYXV0b2ZvY3VzXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogYXV0b0ZvY3VzLCBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiX19pbnB1dEdyb3VwXCIpLCBkaXNhYmxlZDogZGlzYWJsZWQsIGZvcm1hdDogZm9ybWF0LCBpc0NhbGVuZGFyT3BlbjogaXNPcGVuLCBsb2NhbGU6IGxvY2FsZSwgbWF4RGF0ZTogbWF4RGF0ZSwgbWF4RGV0YWlsOiBtYXhEZXRhaWwsIG1pbkRhdGU6IG1pbkRhdGUsIG5hbWU6IG5hbWUsIG9uQ2hhbmdlOiBvbkNoYW5nZSwgb25JbnZhbGlkQ2hhbmdlOiBvbkludmFsaWRDaGFuZ2UsIHJlcXVpcmVkOiByZXF1aXJlZCwgcmV0dXJuVmFsdWU6IHJldHVyblZhbHVlLCBzaG93TGVhZGluZ1plcm9zOiBzaG93TGVhZGluZ1plcm9zLCB2YWx1ZTogdmFsdWVGcm9tIH0pKSwgY2xlYXJJY29uICE9PSBudWxsICYmIChfanN4KFwiYnV0dG9uXCIsIHsgXCJhcmlhLWxhYmVsXCI6IGNsZWFyQXJpYUxhYmVsLCBjbGFzc05hbWU6IFwiXCIuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiX19jbGVhci1idXR0b24gXCIpLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIl9fYnV0dG9uXCIpLCBkaXNhYmxlZDogZGlzYWJsZWQsIG9uQ2xpY2s6IGNsZWFyLCBvbkZvY3VzOiBzdG9wUHJvcGFnYXRpb24sIHR5cGU6IFwiYnV0dG9uXCIsIGNoaWxkcmVuOiB0eXBlb2YgY2xlYXJJY29uID09PSAnZnVuY3Rpb24nID8gY3JlYXRlRWxlbWVudChjbGVhckljb24pIDogY2xlYXJJY29uIH0pKSwgY2FsZW5kYXJJY29uICE9PSBudWxsICYmICFkaXNhYmxlQ2FsZW5kYXIgJiYgKF9qc3goXCJidXR0b25cIiwgeyBcImFyaWEtZXhwYW5kZWRcIjogaXNPcGVuIHx8IGZhbHNlLCBcImFyaWEtbGFiZWxcIjogY2FsZW5kYXJBcmlhTGFiZWwsIGNsYXNzTmFtZTogXCJcIi5jb25jYXQoYmFzZUNsYXNzTmFtZSwgXCJfX2NhbGVuZGFyLWJ1dHRvbiBcIikuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiX19idXR0b25cIiksIGRpc2FibGVkOiBkaXNhYmxlZCwgb25DbGljazogdG9nZ2xlQ2FsZW5kYXIsIG9uRm9jdXM6IHN0b3BQcm9wYWdhdGlvbiwgdHlwZTogXCJidXR0b25cIiwgY2hpbGRyZW46IHR5cGVvZiBjYWxlbmRhckljb24gPT09ICdmdW5jdGlvbicgPyBjcmVhdGVFbGVtZW50KGNhbGVuZGFySWNvbikgOiBjYWxlbmRhckljb24gfSkpXSB9KSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlckNhbGVuZGFyKCkge1xuICAgICAgICBpZiAoaXNPcGVuID09PSBudWxsIHx8IGRpc2FibGVDYWxlbmRhcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbGVuZGFyUHJvcHMgPSBwcm9wcy5jYWxlbmRhclByb3BzLCBwb3J0YWxDb250YWluZXIgPSBwcm9wcy5wb3J0YWxDb250YWluZXIsIHZhbHVlID0gcHJvcHMudmFsdWU7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSBcIlwiLmNvbmNhdChiYXNlQ2xhc3NOYW1lLCBcIl9fY2FsZW5kYXJcIik7XG4gICAgICAgIHZhciBjbGFzc05hbWVzID0gY2xzeChjbGFzc05hbWUsIFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCItLVwiKS5jb25jYXQoaXNPcGVuID8gJ29wZW4nIDogJ2Nsb3NlZCcpKTtcbiAgICAgICAgdmFyIGNhbGVuZGFyID0gKF9qc3goQ2FsZW5kYXIsIF9fYXNzaWduKHsgbG9jYWxlOiBsb2NhbGUsIG1heERhdGU6IG1heERhdGUsIG1heERldGFpbDogbWF4RGV0YWlsLCBtaW5EYXRlOiBtaW5EYXRlLCBvbkNoYW5nZTogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBvbkNoYW5nZSh2YWx1ZSk7IH0sIHZhbHVlOiB2YWx1ZSB9LCBjYWxlbmRhclByb3BzKSkpO1xuICAgICAgICByZXR1cm4gcG9ydGFsQ29udGFpbmVyID8gKGNyZWF0ZVBvcnRhbChfanN4KFwiZGl2XCIsIHsgcmVmOiBjYWxlbmRhcldyYXBwZXIsIGNsYXNzTmFtZTogY2xhc3NOYW1lcywgY2hpbGRyZW46IGNhbGVuZGFyIH0pLCBwb3J0YWxDb250YWluZXIpKSA6IChfanN4KEZpdCwgeyBjaGlsZHJlbjogX2pzeChcImRpdlwiLCB7IHJlZjogZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVmICYmICFpc09wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZi5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBjbGFzc05hbWU6IGNsYXNzTmFtZXMsIGNoaWxkcmVuOiBjYWxlbmRhciB9KSB9KSk7XG4gICAgfVxuICAgIHZhciBldmVudFByb3BzID0gdXNlTWVtbyhmdW5jdGlvbiAoKSB7IHJldHVybiBtYWtlRXZlbnRQcm9wcyhvdGhlclByb3BzKTsgfSwgW290aGVyUHJvcHNdKTtcbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIF9fYXNzaWduKHsgY2xhc3NOYW1lOiBjbHN4KGJhc2VDbGFzc05hbWUsIFwiXCIuY29uY2F0KGJhc2VDbGFzc05hbWUsIFwiLS1cIikuY29uY2F0KGlzT3BlbiA/ICdvcGVuJyA6ICdjbG9zZWQnKSwgXCJcIi5jb25jYXQoYmFzZUNsYXNzTmFtZSwgXCItLVwiKS5jb25jYXQoZGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogJ2VuYWJsZWQnKSwgY2xhc3NOYW1lKSwgXCJkYXRhLXRlc3RpZFwiOiBkYXRhVGVzdGlkLCBpZDogaWQgfSwgZXZlbnRQcm9wcywgeyBvbkZvY3VzOiBvbkZvY3VzLCByZWY6IHdyYXBwZXIsIGNoaWxkcmVuOiBbcmVuZGVySW5wdXRzKCksIHJlbmRlckNhbGVuZGFyKCldIH0pKSk7XG59XG4iLCJpbXBvcnQgXCIuL3VpL1JlYWN0RGF0ZVBpY2tlci5jc3NcIjtcbmltcG9ydCBcInJlYWN0LWNhbGVuZGFyL2Rpc3QvQ2FsZW5kYXIuY3NzXCI7XG5pbXBvcnQgXCJyZWFjdC1kYXRlLXBpY2tlci9kaXN0L0RhdGVQaWNrZXIuY3NzXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tIFwicmVhY3QtZGF0ZS1waWNrZXJcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWN0RGF0ZVBpY2tlcih7XG4gICAgYXV0b0ZvY3VzLFxuICAgIGF1dG9TZWxlY3RUb2RheSxcbiAgICBkYXRlQXR0cixcbiAgICBkYXlQbGFjZWhvbGRlcixcbiAgICBtb250aFBsYWNlaG9sZGVyLFxuICAgIG9uQ2hhbmdlQWN0aW9uLFxuICAgIHJlYWRPbmx5U3R5bGUsXG4gICAgc2hvd0xlYWRpbmdaZXJvcyxcbiAgICB5ZWFyUGxhY2Vob2xkZXIsXG4gICAgLi4ucmVzdFxufSkge1xuICAgIGNvbnN0IGlkID0gcmVzdC5pZCB8fCBcIlwiO1xuICAgIGNvbnN0IHN0eWxlID0gcmVzdC5jbGFzcyB8fCBcIlwiO1xuICAgIGNvbnN0IHdpZGdldE5hbWUgPSByZXN0Lm5hbWUgfHwgXCJcIjtcbiAgICBjb25zdCBbY3VycmVudFZhbHVlLCBzZXRDdXJyZW50VmFsdWVdID0gdXNlU3RhdGUoKCkgPT4ge1xuICAgICAgICBpZiAoZGF0ZUF0dHIuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiICYmIGRhdGVBdHRyLmRpc3BsYXlWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVBdHRyLmRpc3BsYXlWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXV0b1NlbGVjdFRvZGF5ID8gbmV3IERhdGUoKSA6IG51bGw7XG4gICAgfSk7XG4gICAgY29uc3QgW2Rpc2FibGVkVmFsdWUsIHNldERpc2FibGVkVmFsdWVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGRhdGVBdHRyLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGRhdGVBdHRyLnNldFZhbHVlKG5ldyBEYXRlKGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlQXR0ci5kaXNwbGF5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZXRDdXJyZW50VmFsdWUoZGF0ZUF0dHIuZGlzcGxheVZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGVBdHRyLnJlYWRPbmx5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc2V0RGlzYWJsZWRWYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGVBdHRyLnJlYWRPbmx5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc2V0RGlzYWJsZWRWYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFthdXRvRm9jdXMsIGN1cnJlbnRWYWx1ZSwgZGF0ZUF0dHJdKTtcblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlSW5wdXRBY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKG9uQ2hhbmdlQWN0aW9uICYmIG9uQ2hhbmdlQWN0aW9uLmNhbkV4ZWN1dGUpIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlQWN0aW9uLmV4ZWN1dGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkaXNhYmxlZFZhbHVlICYmIGRpc2FibGVkVmFsdWUgPT09IHRydWUgJiYgcmVhZE9ubHlTdHlsZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZS1waWNrZXIgJHtzdHlsZX1gfT5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2Ake3dpZGdldE5hbWV9IGZvcm0tY29udHJvbC1zdGF0aWNgfT57Y3VycmVudFZhbHVlIHx8IGRhdGVBdHRyLmRpc3BsYXlWYWx1ZX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2ByZWFjdC1kYXRlLXBpY2tlciAke3N0eWxlfWB9PlxuICAgICAgICAgICAgICAgIHthdXRvRm9jdXMgPT09IGZhbHNlICYmIDxidXR0b24gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZS1waWNrZXItZmF1eC1idG5cIj48L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgPERhdGVQaWNrZXJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzPXthdXRvRm9jdXN9XG4gICAgICAgICAgICAgICAgICAgIHNob3dMZWFkaW5nWmVyb3M9e3Nob3dMZWFkaW5nWmVyb3N9XG4gICAgICAgICAgICAgICAgICAgIGlzT3Blbj17YXV0b0ZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBjYWxlbmRhckFyaWFMYWJlbD1cIlRvZ2dsZSBjYWxlbmRhclwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQXJpYUxhYmVsPVwiQ2xlYXIgdmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQ2FsZW5kYXI9e2Rpc2FibGVkVmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtkYXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlSW5wdXRBY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRWYWx1ZShkYXRlID8gbmV3IERhdGUoZGF0ZSkgOiBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1cnJlbnRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgZGF5UGxhY2Vob2xkZXI9e2RheVBsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICAgICAgICBtb250aFBsYWNlaG9sZGVyPXttb250aFBsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICAgICAgICB5ZWFyUGxhY2Vob2xkZXI9e3llYXJQbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIl9fc3ByZWFkQXJyYXkiLCJ0aGlzIiwidG8iLCJmcm9tIiwicGFjayIsImFyZ3VtZW50cyIsImxlbmd0aCIsImkiLCJsIiwiYXIiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImNvbmNhdCIsImNsaXBib2FyZEV2ZW50cyIsImNvbXBvc2l0aW9uRXZlbnRzIiwiZm9jdXNFdmVudHMiLCJmb3JtRXZlbnRzIiwiaW1hZ2VFdmVudHMiLCJrZXlib2FyZEV2ZW50cyIsIm1lZGlhRXZlbnRzIiwibW91c2VFdmVudHMiLCJkcmFnRXZlbnRzIiwic2VsZWN0aW9uRXZlbnRzIiwidG91Y2hFdmVudHMiLCJwb2ludGVyRXZlbnRzIiwidWlFdmVudHMiLCJ3aGVlbEV2ZW50cyIsImFuaW1hdGlvbkV2ZW50cyIsInRyYW5zaXRpb25FdmVudHMiLCJvdGhlckV2ZW50cyIsImNoYW5nZUV2ZW50cyIsImFsbEV2ZW50cyIsIm1ha2VFdmVudFByb3BzIiwicHJvcHMiLCJnZXRBcmdzIiwiZXZlbnRQcm9wcyIsImZvckVhY2giLCJldmVudE5hbWUiLCJldmVudEhhbmRsZXIiLCJldmVudCIsInIiLCJlIiwidCIsImYiLCJuIiwiaXNBcnJheSIsIm8iLCJjbHN4IiwiY29weVByb3BlcnR5IiwicHJvcGVydHkiLCJpZ25vcmVOb25Db25maWd1cmFibGUiLCJ0b0Rlc2NyaXB0b3IiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJmcm9tRGVzY3JpcHRvciIsImNhbkNvcHlQcm9wZXJ0eSIsImRlZmluZVByb3BlcnR5IiwidW5kZWZpbmVkIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwidmFsdWUiLCJjaGFuZ2VQcm90b3R5cGUiLCJmcm9tUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIndyYXBwZWRUb1N0cmluZyIsIndpdGhOYW1lIiwiZnJvbUJvZHkiLCJ0b1N0cmluZ0Rlc2NyaXB0b3IiLCJGdW5jdGlvbiIsInRvU3RyaW5nTmFtZSIsInRvU3RyaW5nIiwiY2hhbmdlVG9TdHJpbmciLCJuYW1lIiwidHJpbSIsIm5ld1RvU3RyaW5nIiwiYmluZCIsIm1pbWljRm4iLCJSZWZsZWN0Iiwib3duS2V5cyIsIm1vZHVsZSIsInJldCIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsImZ1bGZpbGxlZCIsInN0ZXAiLCJuZXh0IiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiX19pbXBvcnREZWZhdWx0IiwibW9kIiwiX19lc01vZHVsZSIsInBfZGVmZXJfMSIsInJlcXVpcmUiLCJtYXBBZ2VDbGVhbmVyIiwibWFwIiwicHJvY2Vzc2luZ0tleSIsInByb2Nlc3NpbmdUaW1lciIsInByb2Nlc3NpbmdEZWZlcnJlZCIsImNsZWFudXAiLCJzZXR1cFRpbWVyIiwiaXRlbSIsImRlZmF1bHQiLCJkZWxheSIsIkRhdGUiLCJub3ciLCJkZWxldGUiLCJzZXRUaW1lb3V0IiwidW5yZWYiLCJlbnRyeSIsIl9hIiwicmVzZXQiLCJjbGVhclRpbWVvdXQiLCJvcmlnaW5hbFNldCIsInNldCIsImtleSIsImhhcyIsImV4cG9ydHMiLCJyZXF1aXJlJCQxIiwiZGVjb3JhdG9ySW5zdGFuY2VNYXAiLCJXZWFrTWFwIiwiY2FjaGVTdG9yZSIsIm1lbSIsImZuIiwiY2FjaGVLZXkiLCJjYWNoZSIsIk1hcCIsIm1heEFnZSIsIm1lbW9pemVkIiwiYXJndW1lbnRzXyIsImNhY2hlSXRlbSIsImdldCIsImRhdGEiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsImRlY29yYXRvciIsIm9wdGlvbnMiLCJ0YXJnZXQiLCJwcm9wZXJ0eUtleSIsImRlc2NyaXB0b3IiLCJpbnB1dCIsIlR5cGVFcnJvciIsImNsZWFyIiwiaXNTdHJpbmciLCJlbCIsImlzVW5pcXVlIiwiaW5kZXgiLCJhcnIiLCJpbmRleE9mIiwiaXNBbGxMb3dlckNhc2UiLCJ0b0xvd2VyQ2FzZSIsImZpeENvbW1hcyIsInNwbGl0Iiwibm9ybWFsaXplTG9jYWxlIiwibG9jYWxlIiwiYWN0dWFsTG9jYWxlIiwiX2IiLCJfYyIsInNwbGl0RWwxIiwiX2QiLCJzcGxpdEVsMiIsInRvVXBwZXJDYXNlIiwiZ2V0VXNlckxvY2FsZXNJbnRlcm5hbCIsInVzZUZhbGxiYWNrTG9jYWxlIiwiZmFsbGJhY2tMb2NhbGUiLCJsYW5ndWFnZUxpc3QiLCJuYXZpZ2F0b3IiLCJyYXdMYW5ndWFnZXMiLCJsYW5ndWFnZXMiLCJfaSIsInJhd0xhbmd1YWdlc18xIiwicmF3TGFuZ3VhZ2VzSXRlbSIsInJhd0xhbmd1YWdlIiwibGFuZ3VhZ2UiLCJwdXNoIiwiZmlsdGVyIiwiZ2V0VXNlckxvY2FsZXMiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0VXNlckxvY2FsZUludGVybmFsIiwiZ2V0VXNlckxvY2FsZSIsIm1ha2VHZXRFZGdlT2ZOZWlnaGJvciIsImdldFBlcmlvZCIsImdldEVkZ2VPZlBlcmlvZCIsImRlZmF1bHRPZmZzZXQiLCJtYWtlR2V0RWRnZU9mTmVpZ2hib3JJbnRlcm5hbCIsImRhdGUiLCJvZmZzZXQiLCJwcmV2aW91c1BlcmlvZCIsIm1ha2VHZXRFbmQiLCJnZXRCZWdpbk9mTmV4dFBlcmlvZCIsIm1ha2VHZXRFbmRJbnRlcm5hbCIsImdldFRpbWUiLCJtYWtlR2V0UmFuZ2UiLCJnZXRTdGFydCIsImdldEVuZCIsIm1ha2VHZXRSYW5nZUludGVybmFsIiwiZ2V0WWVhciIsImdldEZ1bGxZZWFyIiwieWVhciIsInBhcnNlSW50IiwiaXNOYU4iLCJFcnJvciIsImdldE1vbnRoIiwiZ2V0TW9udGhIdW1hbiIsImdldERhdGUiLCJnZXRDZW50dXJ5U3RhcnQiLCJjZW50dXJ5U3RhcnRZZWFyIiwiY2VudHVyeVN0YXJ0RGF0ZSIsInNldEZ1bGxZZWFyIiwic2V0SG91cnMiLCJnZXRQcmV2aW91c0NlbnR1cnlTdGFydCIsImdldE5leHRDZW50dXJ5U3RhcnQiLCJnZXRDZW50dXJ5RW5kIiwiZ2V0UHJldmlvdXNDZW50dXJ5RW5kIiwiZ2V0Q2VudHVyeVJhbmdlIiwiZ2V0RGVjYWRlU3RhcnQiLCJkZWNhZGVTdGFydFllYXIiLCJkZWNhZGVTdGFydERhdGUiLCJnZXRQcmV2aW91c0RlY2FkZVN0YXJ0IiwiZ2V0TmV4dERlY2FkZVN0YXJ0IiwiZ2V0RGVjYWRlRW5kIiwiZ2V0UHJldmlvdXNEZWNhZGVFbmQiLCJnZXREZWNhZGVSYW5nZSIsImdldFllYXJTdGFydCIsInllYXJTdGFydERhdGUiLCJnZXRQcmV2aW91c1llYXJTdGFydCIsImdldE5leHRZZWFyU3RhcnQiLCJnZXRZZWFyRW5kIiwiZ2V0UHJldmlvdXNZZWFyRW5kIiwiZ2V0WWVhclJhbmdlIiwibWFrZUdldEVkZ2VPZk5laWdoYm9yTW9udGgiLCJtYWtlR2V0RWRnZU9mTmVpZ2hib3JNb250aEludGVybmFsIiwibW9udGgiLCJnZXRNb250aFN0YXJ0IiwibW9udGhTdGFydERhdGUiLCJnZXRQcmV2aW91c01vbnRoU3RhcnQiLCJnZXROZXh0TW9udGhTdGFydCIsImdldE1vbnRoRW5kIiwiZ2V0UHJldmlvdXNNb250aEVuZCIsImdldE1vbnRoUmFuZ2UiLCJtYWtlR2V0RWRnZU9mTmVpZ2hib3JEYXkiLCJtYWtlR2V0RWRnZU9mTmVpZ2hib3JEYXlJbnRlcm5hbCIsImRheSIsImdldERheVN0YXJ0IiwiZGF5U3RhcnREYXRlIiwiZ2V0TmV4dERheVN0YXJ0IiwiZ2V0RGF5RW5kIiwiZ2V0RGF5UmFuZ2UiLCJnZXREYXlzSW5Nb250aCIsInBhZFN0YXJ0IiwibnVtIiwidmFsIiwibnVtU3RyIiwiZ2V0SVNPTG9jYWxNb250aCIsImdldElTT0xvY2FsRGF0ZSIsIkNBTEVOREFSX1RZUEVTIiwiR1JFR09SWSIsIkhFQlJFVyIsIklTTEFNSUMiLCJJU09fODYwMSIsIkNBTEVOREFSX1RZUEVfTE9DQUxFUyIsImdyZWdvcnkiLCJoZWJyZXciLCJpc2xhbWljIiwiV0VFS0RBWVMiLCJmb3JtYXR0ZXJDYWNoZSIsImdldEZvcm1hdHRlciIsImZvcm1hdHRlciIsImxvY2FsZVdpdGhEZWZhdWx0IiwiZm9ybWF0dGVyQ2FjaGVMb2NhbGUiLCJJbnRsIiwiRGF0ZVRpbWVGb3JtYXQiLCJmb3JtYXQiLCJ0b1NhZmVIb3VyIiwic2FmZURhdGUiLCJnZXRTYWZlRm9ybWF0dGVyIiwiZm9ybWF0RGF5T3B0aW9ucyIsImZvcm1hdExvbmdEYXRlT3B0aW9ucyIsImZvcm1hdE1vbnRoT3B0aW9ucyIsImZvcm1hdE1vbnRoWWVhck9wdGlvbnMiLCJmb3JtYXRTaG9ydFdlZWtkYXlPcHRpb25zIiwid2Vla2RheSIsImZvcm1hdFdlZWtkYXlPcHRpb25zIiwiZm9ybWF0WWVhck9wdGlvbnMiLCJmb3JtYXREYXkiLCJmb3JtYXRMb25nRGF0ZSIsImZvcm1hdE1vbnRoIiwiZm9ybWF0TW9udGhZZWFyIiwiZm9ybWF0U2hvcnRXZWVrZGF5IiwiZm9ybWF0V2Vla2RheSIsImZvcm1hdFllYXIiLCJTVU5EQVkiLCJGUklEQVkiLCJTQVRVUkRBWSIsImdldERheU9mV2VlayIsImNhbGVuZGFyVHlwZSIsImdldERheSIsImdldEJlZ2luT2ZDZW50dXJ5WWVhciIsImJlZ2luT2ZDZW50dXJ5IiwiZ2V0QmVnaW5PZkRlY2FkZVllYXIiLCJiZWdpbk9mRGVjYWRlIiwiZ2V0QmVnaW5PZldlZWsiLCJtb250aEluZGV4IiwiZ2V0TW9udGhJbmRleCIsImdldFdlZWtOdW1iZXIiLCJjYWxlbmRhclR5cGVGb3JXZWVrTnVtYmVyIiwiYmVnaW5PZldlZWsiLCJkYXlJbldlZWtPbmUiLCJiZWdpbk9mRmlyc3RXZWVrIiwiTWF0aCIsInJvdW5kIiwiZ2V0QmVnaW4iLCJyYW5nZVR5cGUiLCJnZXRCZWdpblByZXZpb3VzIiwiZ2V0QmVnaW5OZXh0IiwiZ2V0QmVnaW5QcmV2aW91czIiLCJnZXRCZWdpbk5leHQyIiwiZ2V0RW5kUHJldmlvdXMiLCJnZXRFbmRQcmV2aW91czIiLCJnZXRSYW5nZSIsImdldFZhbHVlUmFuZ2UiLCJkYXRlMSIsImRhdGUyIiwicmF3TmV4dFZhbHVlIiwic29ydCIsImEiLCJiIiwidG9ZZWFyTGFiZWwiLCJkYXRlcyIsImRlZmF1bHRGb3JtYXRZZWFyIiwiam9pbiIsImdldENlbnR1cnlMYWJlbCIsImdldERlY2FkZUxhYmVsIiwiaXNDdXJyZW50RGF5T2ZXZWVrIiwiaXNXZWVrZW5kIiwiY2xhc3NOYW1lIiwiTmF2aWdhdGlvbiIsImFjdGl2ZVN0YXJ0RGF0ZSIsImRyaWxsVXAiLCJkZWZhdWx0Rm9ybWF0TW9udGhZZWFyIiwibWF4RGF0ZSIsIm1pbkRhdGUiLCJuYXZpZ2F0aW9uQXJpYUxhYmVsIiwibmF2aWdhdGlvbkFyaWFMaXZlIiwibmF2aWdhdGlvbkxhYmVsIiwiX2UiLCJuZXh0MkFyaWFMYWJlbCIsIl9mIiwibmV4dDJMYWJlbCIsIl9nIiwibmV4dEFyaWFMYWJlbCIsIl9oIiwibmV4dExhYmVsIiwiX2oiLCJwcmV2MkFyaWFMYWJlbCIsIl9rIiwicHJldjJMYWJlbCIsIl9sIiwicHJldkFyaWFMYWJlbCIsIl9tIiwicHJldkxhYmVsIiwic2V0QWN0aXZlU3RhcnREYXRlIiwic2hvd0RvdWJsZVZpZXciLCJ2aWV3Iiwidmlld3MiLCJkcmlsbFVwQXZhaWxhYmxlIiwic2hvdWxkU2hvd1ByZXZOZXh0MkJ1dHRvbnMiLCJwcmV2aW91c0FjdGl2ZVN0YXJ0RGF0ZSIsInByZXZpb3VzQWN0aXZlU3RhcnREYXRlMiIsIm5leHRBY3RpdmVTdGFydERhdGUiLCJuZXh0QWN0aXZlU3RhcnREYXRlMiIsInByZXZCdXR0b25EaXNhYmxlZCIsInByZXZpb3VzQWN0aXZlRW5kRGF0ZSIsInByZXYyQnV0dG9uRGlzYWJsZWQiLCJuZXh0QnV0dG9uRGlzYWJsZWQiLCJuZXh0MkJ1dHRvbkRpc2FibGVkIiwib25DbGlja1ByZXZpb3VzIiwib25DbGlja1ByZXZpb3VzMiIsIm9uQ2xpY2tOZXh0Iiwib25DbGlja05leHQyIiwicmVuZGVyTGFiZWwiLCJsYWJlbCIsInJlbmRlckJ1dHRvbiIsImxhYmVsQ2xhc3NOYW1lIiwiX2pzeHMiLCJkaXNhYmxlZCIsIm9uQ2xpY2siLCJzdHlsZSIsImZsZXhHcm93IiwidHlwZSIsImNoaWxkcmVuIiwiX2pzeCIsIl9GcmFnbWVudCIsIl9fYXNzaWduIiwiYXNzaWduIiwicyIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsIl9fcmVzdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwidG9QZXJjZW50IiwiRmxleCIsImNvdW50IiwiZGlyZWN0aW9uIiwid3JhcCIsIm90aGVyUHJvcHMiLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsImZsZXhXcmFwIiwiQ2hpbGRyZW4iLCJjaGlsZCIsIm1hcmdpbklubGluZVN0YXJ0IiwiY2xvbmVFbGVtZW50IiwiZmxleEJhc2lzIiwiZmxleFNocmluayIsIm92ZXJmbG93IiwibWFyZ2luTGVmdCIsIm1hcmdpbklubGluZUVuZCIsImJldHdlZW4iLCJtaW4iLCJtYXgiLCJpc1ZhbHVlV2l0aGluUmFuZ2UiLCJyYW5nZSIsImlzUmFuZ2VXaXRoaW5SYW5nZSIsImdyZWF0ZXJSYW5nZSIsInNtYWxsZXJSYW5nZSIsImRvUmFuZ2VzT3ZlcmxhcCIsInJhbmdlMSIsInJhbmdlMiIsImdldFJhbmdlQ2xhc3NOYW1lcyIsInZhbHVlUmFuZ2UiLCJkYXRlUmFuZ2UiLCJiYXNlQ2xhc3NOYW1lIiwiaXNSYW5nZSIsImNsYXNzZXMiLCJpc1JhbmdlU3RhcnQiLCJpc1JhbmdlRW5kIiwiaXNDb21wbGV0ZVZhbHVlIiwiZ2V0VGlsZUNsYXNzZXMiLCJhcmdzIiwiaG92ZXIiLCJkYXRlVHlwZSIsInZhbHVlVHlwZSIsInZhbHVlUmFuZ2VDbGFzc05hbWVzIiwidmFsdWVBcnJheSIsImhvdmVyUmFuZ2UiLCJob3ZlclJhbmdlQ2xhc3NOYW1lcyIsIlRpbGVHcm91cCIsImRhdGVUcmFuc2Zvcm0iLCJlbmQiLCJyZW5kZXJUaWxlIiwic3RhcnQiLCJ0aWxlcyIsInBvaW50IiwiVGlsZSIsImZvcm1hdEFiYnIiLCJtYXhEYXRlVHJhbnNmb3JtIiwibWluRGF0ZVRyYW5zZm9ybSIsIm9uTW91c2VPdmVyIiwidGlsZUNsYXNzTmFtZVByb3BzIiwidGlsZUNsYXNzTmFtZSIsInRpbGVDb250ZW50UHJvcHMiLCJ0aWxlQ29udGVudCIsInRpbGVEaXNhYmxlZCIsInVzZU1lbW8iLCJvbkZvY3VzIiwiRGVjYWRlIiwiY3VycmVudENlbnR1cnkiLCJjbGFzc2VzUHJvcHMiLCJEZWNhZGVzIiwic2hvd05laWdoYm9yaW5nQ2VudHVyeSIsIm90aGVyVGlsZVByb3BzIiwiQ2VudHVyeVZpZXciLCJyZW5kZXJEZWNhZGVzIiwiWWVhciIsImN1cnJlbnREZWNhZGUiLCJZZWFycyIsInNob3dOZWlnaGJvcmluZ0RlY2FkZSIsIkRlY2FkZVZpZXciLCJyZW5kZXJZZWFycyIsIk1vbnRoIiwiZGVmYXVsdEZvcm1hdE1vbnRoIiwiTW9udGhzIiwiWWVhclZpZXciLCJyZW5kZXJNb250aHMiLCJEYXkiLCJjdXJyZW50TW9udGhJbmRleCIsImRlZmF1bHRGb3JtYXREYXkiLCJkZWZhdWx0Rm9ybWF0TG9uZ0RhdGUiLCJEYXlzIiwic2hvd0ZpeGVkTnVtYmVyT2ZXZWVrcyIsInNob3dOZWlnaGJvcmluZ01vbnRoIiwiaGFzRml4ZWROdW1iZXJPZldlZWtzIiwiZGF5T2ZXZWVrIiwiZGF5c0luTW9udGgiLCJhY3RpdmVFbmREYXRlIiwiZGF5c1VudGlsRW5kT2ZUaGVXZWVrIiwid2Vla2RheUNsYXNzTmFtZSIsIldlZWtkYXlzIiwiZGVmYXVsdEZvcm1hdFNob3J0V2Vla2RheSIsImRlZmF1bHRGb3JtYXRXZWVrZGF5Iiwib25Nb3VzZUxlYXZlIiwiYW55RGF0ZSIsImJlZ2luT2ZNb250aCIsIndlZWtkYXlzIiwid2Vla2RheURhdGUiLCJhYmJyIiwidGl0bGUiLCJyZXBsYWNlIiwiV2Vla051bWJlciIsIm9uQ2xpY2tXZWVrTnVtYmVyIiwid2Vla051bWJlciIsImRhdGVfMSIsIm9uQ2xpY2tXZWVrTnVtYmVyXzEiLCJ3ZWVrTnVtYmVyXzEiLCJXZWVrTnVtYmVycyIsIm51bWJlck9mV2Vla3MiLCJudW1iZXJPZkRheXMiLCJzdGFydFdlZWtkYXkiLCJkYXlzIiwiY2VpbCIsIndlZWtOdW1iZXJzIiwid2Vla0luZGV4IiwiZ2V0Q2FsZW5kYXJUeXBlRnJvbUxvY2FsZSIsImVudHJpZXMiLCJsb2NhbGVzIiwiaW5jbHVkZXMiLCJNb250aFZpZXciLCJzaG93V2Vla051bWJlcnMiLCJjaGlsZFByb3BzIiwicmVuZGVyV2Vla2RheXMiLCJyZW5kZXJXZWVrTnVtYmVycyIsInJlbmRlckRheXMiLCJhbGlnbkl0ZW1zIiwid2lkdGgiLCJhbGxWaWV3cyIsImFsbFZhbHVlVHlwZXMiLCJkZWZhdWx0TWluRGF0ZSIsImRlZmF1bHRNYXhEYXRlIiwidG9EYXRlIiwiZ2V0TGltaXRlZFZpZXdzIiwibWluRGV0YWlsIiwibWF4RGV0YWlsIiwiaXNWaWV3QWxsb3dlZCIsImdldFZpZXciLCJnZXRWYWx1ZVR5cGUiLCJnZXRWYWx1ZSIsInJhd1ZhbHVlIiwidmFsdWVEYXRlIiwiZ2V0RGV0YWlsVmFsdWUiLCJ2YWx1ZVBpZWNlIiwiZGV0YWlsVmFsdWVGcm9tIiwiZ2V0RGV0YWlsVmFsdWVGcm9tIiwiZ2V0RGV0YWlsVmFsdWVUbyIsImdldERldGFpbFZhbHVlQXJyYXkiLCJnZXRBY3RpdmVTdGFydERhdGUiLCJ2YWx1ZUZyb20iLCJnZXRJbml0aWFsQWN0aXZlU3RhcnREYXRlIiwiZGVmYXVsdEFjdGl2ZVN0YXJ0RGF0ZSIsImRlZmF1bHRWYWx1ZSIsImRlZmF1bHRWaWV3IiwiZ2V0SXNTaW5nbGVWYWx1ZSIsImFyZURhdGVzRXF1YWwiLCJDYWxlbmRhciIsImZvcndhcmRSZWYiLCJyZWYiLCJhY3RpdmVTdGFydERhdGVQcm9wcyIsImFsbG93UGFydGlhbFJhbmdlIiwiZ29Ub1JhbmdlU3RhcnRPblNlbGVjdCIsImlucHV0UmVmIiwib25BY3RpdmVTdGFydERhdGVDaGFuZ2UiLCJvbkNoYW5nZVByb3BzIiwib25DaGFuZ2UiLCJvbkNsaWNrRGF5Iiwib25DbGlja0RlY2FkZSIsIm9uQ2xpY2tNb250aCIsIm9uQ2xpY2tZZWFyIiwib25EcmlsbERvd24iLCJvbkRyaWxsVXAiLCJvblZpZXdDaGFuZ2UiLCJyZXR1cm5WYWx1ZSIsInNlbGVjdFJhbmdlIiwic2hvd05hdmlnYXRpb24iLCJ2YWx1ZVByb3BzIiwidmlld1Byb3BzIiwidXNlU3RhdGUiLCJhY3RpdmVTdGFydERhdGVTdGF0ZSIsInNldEFjdGl2ZVN0YXJ0RGF0ZVN0YXRlIiwiaG92ZXJTdGF0ZSIsInNldEhvdmVyU3RhdGUiLCJ2YWx1ZVN0YXRlIiwic2V0VmFsdWVTdGF0ZSIsInZpZXdTdGF0ZSIsInNldFZpZXdTdGF0ZSIsImRyaWxsRG93bkF2YWlsYWJsZSIsImdldFByb2Nlc3NlZFZhbHVlIiwidXNlQ2FsbGJhY2siLCJwcm9jZXNzRnVuY3Rpb24iLCJhY3Rpb24iLCJvbkNsaWNrVGlsZSIsImNhbGxiYWNrIiwiZHJpbGxEb3duIiwibmV4dFZpZXciLCJwcmV2aW91c1ZhbHVlIiwiaXNGaXJzdFZhbHVlSW5SYW5nZSIsIm5leHRWYWx1ZSIsInBlcnNpc3QiLCJpc1NpbmdsZVZhbHVlIiwibmV4dEhvdmVyIiwidXNlSW1wZXJhdGl2ZUhhbmRsZSIsInJlbmRlckNvbnRlbnQiLCJjdXJyZW50QWN0aXZlU3RhcnREYXRlIiwiY29tbW9uUHJvcHMiLCJyZW5kZXJOYXZpZ2F0aW9uIiwib25CbHVyIiwiZ2V0UmVjdCIsImVsZW1lbnQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJkZXRlY3RFbGVtZW50T3ZlcmZsb3ciLCJjb250YWluZXIiLCJjb2xsaWRlZFRvcCIsInRvcCIsImNvbGxpZGVkQm90dG9tIiwiYm90dG9tIiwiY29sbGlkZWRMZWZ0IiwibGVmdCIsImNvbGxpZGVkUmlnaHQiLCJyaWdodCIsIm92ZXJmbG93VG9wIiwib3ZlcmZsb3dCb3R0b20iLCJvdmVyZmxvd0xlZnQiLCJvdmVyZmxvd1JpZ2h0Iiwid2FybmluZyIsInByaW50V2FybmluZyIsImxlbiIsImFyZ0luZGV4IiwibWVzc2FnZSIsImNvbnNvbGUiLCJlcnJvciIsIngiLCJjb25kaXRpb24iLCJpc0Jyb3dzZXIiLCJkb2N1bWVudCIsImlzTXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCIsIndpbmRvdyIsImNhcGl0YWxpemUiLCJzdHJpbmciLCJjaGFyQXQiLCJmaW5kU2Nyb2xsQ29udGFpbmVyIiwicGFyZW50IiwicGFyZW50RWxlbWVudCIsImdldENvbXB1dGVkU3R5bGUiLCJldmVyeSIsImRvY3VtZW50RWxlbWVudCIsImFsaWduQXhpcyIsImF4aXMiLCJpbnZlcnRBeGlzIiwic2Nyb2xsQ29udGFpbmVyIiwic2Vjb25kYXJ5Iiwic3BhY2luZyIsInNjcm9sbENvbnRhaW5lckNvbGxpc2lvbnMiLCJkb2N1bWVudENvbGxpc2lvbnMiLCJpc1giLCJzdGFydFByb3BlcnR5IiwiZW5kUHJvcGVydHkiLCJzaXplUHJvcGVydHkiLCJvdmVyZmxvd1N0YXJ0UHJvcGVydHkiLCJvdmVyZmxvd0VuZFByb3BlcnR5Iiwic2Nyb2xsUHJvcGVydHkiLCJ1cHBlcmNhc2VkU2l6ZVByb3BlcnR5Iiwib2Zmc2V0U2l6ZVByb3BlcnR5IiwiY2xpZW50U2l6ZVByb3BlcnR5IiwibWluU2l6ZVByb3BlcnR5Iiwic2Nyb2xsYmFyV2lkdGgiLCJzdGFydFNwYWNpbmciLCJhdmFpbGFibGVTdGFydFNwYWNlIiwiZW5kU3BhY2luZyIsImF2YWlsYWJsZUVuZFNwYWNlIiwib2Zmc2V0U2l6ZSIsImRpc3BsYXlTdGFydCIsImRpc3BsYXlFbmQiLCJkaXNwbGF5SWZGaXRzIiwiYXZhaWxhYmxlU3BhY2UiLCJmaXRzIiwiZGlzcGxheVN0YXJ0SWZGaXRzIiwiZGlzcGxheUVuZElmRml0cyIsImRpc3BsYXlXaGVyZXZlclNocmlua2VkRml0cyIsIm1vcmVTcGFjZVN0YXJ0IiwicmF3TWluU2l6ZSIsImdldFByb3BlcnR5VmFsdWUiLCJtaW5TaXplIiwic2hyaW5rVG9TaXplIiwic2l6ZSIsIm5ld1NpemUiLCJhbGlnbk1haW5BeGlzIiwiYWxpZ25TZWNvbmRhcnlBeGlzIiwiYWxpZ25Cb3RoQXhpcyIsImludmVydFNlY29uZGFyeUF4aXMiLCJjb21tb25BcmdzIiwiRml0IiwibWFpbkF4aXMiLCJ1c2VSZWYiLCJlbGVtZW50V2lkdGgiLCJlbGVtZW50SGVpZ2h0IiwiZml0IiwiY3VycmVudCIsImN1cnJlbnRFbGVtZW50V2lkdGgiLCJjbGllbnRXaWR0aCIsImN1cnJlbnRFbGVtZW50SGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwicG9zaXRpb24iLCJwYXJlbnRTdHlsZSIsInBhcmVudFBvc2l0aW9uIiwib25seSIsInVzZUVmZmVjdCIsIm9uTXV0YXRpb24iLCJtdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlRmlsdGVyIiwiYXNzaWduUmVmcyIsImRvbUVsZW1lbnQiLCJIVE1MRWxlbWVudCIsImRvbUNvbnRhaW5lciIsImZpcnN0RWxlbWVudENoaWxkIiwiRGl2aWRlciIsImFsbG93ZWRWYXJpYW50cyIsImdldEZvbnRTaG9ydGhhbmQiLCJmb250IiwiaXNGb250RGVmaW5lZCIsImZvbnRGYW1pbHkiLCJmb250VmFyaWFudCIsImZvbnRTdHlsZSIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsImxpbmVIZWlnaHQiLCJjYWNoZWRDYW52YXMiLCJtZWFzdXJlVGV4dCIsInRleHQiLCJjYW52YXMiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsImdldENvbnRleHQiLCJ1cGRhdGVJbnB1dFdpZHRoIiwicGxhY2Vob2xkZXIiLCJ1c2VJc29tb3JwaGljTGF5b3V0RWZmZWN0IiwidXNlTGF5b3V0RWZmZWN0IiwiaXNJRU9yRWRnZUxlZ2FjeSIsInRlc3QiLCJ1c2VyQWdlbnQiLCJpc0ZpcmVmb3giLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzZWxlY3QiLCJ1cGRhdGVJbnB1dFdpZHRoT25Mb2FkIiwicmVhZHlTdGF0ZSIsIm9uTG9hZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1cGRhdGVJbnB1dFdpZHRoT25Gb250TG9hZCIsImZvbnRzIiwiaXNGb250TG9hZGVkIiwiY2hlY2siLCJvbkxvYWRpbmdEb25lIiwiZ2V0U2VsZWN0aW9uU3RyaW5nIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJtYWtlT25LZXlQcmVzcyIsIm1heExlbmd0aCIsIm9uS2V5UHJlc3MiLCJpc051bWJlcktleSIsInByZXZlbnREZWZhdWx0IiwiSW5wdXQiLCJhcmlhTGFiZWwiLCJhdXRvRm9jdXMiLCJuYW1lRm9yQ2xhc3MiLCJvbktleURvd24iLCJvbktleVVwIiwicmVxdWlyZWQiLCJzaG93TGVhZGluZ1plcm9zIiwiaGFzTGVhZGluZ1plcm8iLCJzdGFydHNXaXRoIiwiYXV0b0NvbXBsZXRlIiwiaW5wdXRNb2RlIiwiaXNWYWxpZE51bWJlciIsInNhZmVNaW4iLCJzYWZlTWF4IiwiRGF5SW5wdXQiLCJjdXJyZW50TW9udGhNYXhEYXlzIiwiaXNTYW1lTW9udGgiLCJtYXhEYXkiLCJtaW5EYXkiLCJNb250aElucHV0IiwiaXNTYW1lWWVhciIsIm1heE1vbnRoIiwibWluTW9udGgiLCJmb3JtYXRTaG9ydE1vbnRoT3B0aW9ucyIsImZvcm1hdFNob3J0TW9udGgiLCJNb250aFNlbGVjdCIsInNob3J0IiwiWWVhcklucHV0IiwibWF4WWVhciIsIm1pblllYXIiLCJ5ZWFyU3RlcCIsIk5hdGl2ZUlucHV0IiwibmF0aXZlSW5wdXRUeXBlIiwibmF0aXZlVmFsdWVQYXJzZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJoaWRkZW4iLCJ2aXNpYmlsaXR5IiwiekluZGV4IiwiZ2V0Rm9ybWF0dGVyT3B0aW9uc0NhY2hlIiwiaXNJbnRlcm5hbElucHV0IiwiZGF0YXNldCIsImZpbmRJbnB1dCIsIm5leHRFbGVtZW50IiwiZm9jdXMiLCJyZW5kZXJDdXN0b21JbnB1dHMiLCJlbGVtZW50RnVuY3Rpb25zIiwiYWxsb3dNdWx0aXBsZUluc3RhbmNlcyIsInVzZWRGdW5jdGlvbnMiLCJwYXR0ZXJuIiwiUmVnRXhwIiwia2V5cyIsIm1hdGNoZXMiLCJtYXRjaCIsInJlZHVjZSIsImRpdmlkZXIiLCJjdXJyZW50TWF0Y2giLCJyZW5kZXJGdW5jdGlvbiIsImZpbmQiLCJlbGVtZW50RnVuY3Rpb24iLCJEYXRlSW5wdXQiLCJkYXlBcmlhTGFiZWwiLCJkYXlQbGFjZWhvbGRlciIsImlzQ2FsZW5kYXJPcGVuIiwiaXNDYWxlbmRhck9wZW5Qcm9wcyIsIm1vbnRoQXJpYUxhYmVsIiwibW9udGhQbGFjZWhvbGRlciIsIm5hdGl2ZUlucHV0QXJpYUxhYmVsIiwib25JbnZhbGlkQ2hhbmdlIiwieWVhckFyaWFMYWJlbCIsInllYXJQbGFjZWhvbGRlciIsInNldFllYXIiLCJzZXRNb250aCIsInNldERheSIsInNldFZhbHVlIiwieWVhcklucHV0IiwibW9udGhJbnB1dCIsIm1vbnRoU2VsZWN0IiwiZGF5SW5wdXQiLCJzZXRJc0NhbGVuZGFyT3BlbiIsImxhc3RQcmVzc2VkS2V5IiwiZm9ybWF0RGF0ZSIsImxldmVsIiwiZm9ybWF0dGVyT3B0aW9ucyIsImZvcm1hdHRlZERhdGUiLCJkYXRlUGllY2VzIiwiZGF0ZVBpZWNlUmVwbGFjZW1lbnRzIiwiZm9ybWF0RGF0ZVBpZWNlIiwiZGF0ZVRvRm9ybWF0IiwiZGF0ZVBpZWNlIiwiZm9ybWF0dGVkRGF0ZVBpZWNlIiwiZGF0ZVBpZWNlUmVwbGFjZW1lbnQiLCJkaXZpZGVycyIsImN1cnJlbnRUYXJnZXQiLCJmaXJzdElucHV0IiwibmV4dElucHV0IiwiaXNMYXN0UHJlc3NlZEtleSIsImdldEF0dHJpYnV0ZSIsIm9uQ2hhbmdlRXh0ZXJuYWwiLCJmaWx0ZXJCb29sZWFuIiwiQm9vbGVhbiIsImZvcm1FbGVtZW50cyIsInZhbHVlcyIsImZvcm1FbGVtZW50IiwidmFsdWVBc051bWJlciIsImlzRXZlcnlWYWx1ZUVtcHR5IiwiaXNFdmVyeVZhbHVlRmlsbGVkIiwiaXNFdmVyeVZhbHVlVmFsaWQiLCJ2YWxpZGl0eSIsInZhbGlkIiwieWVhcl8xIiwiZGF5XzEiLCJwcm9wb3NlZFZhbHVlIiwicHJvY2Vzc2VkVmFsdWUiLCJvbkNoYW5nZU5hdGl2ZSIsInllYXJTdHJpbmciLCJtb250aFN0cmluZyIsImRheVN0cmluZyIsImNvbW1vbklucHV0UHJvcHMiLCJyZW5kZXJEYXkiLCJzaG93TGVhZGluZ1plcm9zRnJvbUZvcm1hdCIsInJlbmRlck1vbnRoIiwicmVuZGVyWWVhciIsInJlbmRlckN1c3RvbUlucHV0c0ludGVybmFsIiwiZCIsIk0iLCJ5IiwicmVuZGVyTmF0aXZlSW5wdXQiLCJvdXRzaWRlQWN0aW9uRXZlbnRzIiwiaWNvblByb3BzIiwieG1sbnMiLCJoZWlnaHQiLCJ2aWV3Qm94Iiwic3Ryb2tlIiwic3Ryb2tlV2lkdGgiLCJDYWxlbmRhckljb24iLCJmaWxsIiwieDEiLCJ4MiIsInkxIiwieTIiLCJDbGVhckljb24iLCJEYXRlUGlja2VyIiwiY2FsZW5kYXJBcmlhTGFiZWwiLCJjYWxlbmRhckljb24iLCJjbGVhckFyaWFMYWJlbCIsImNsZWFySWNvbiIsImNsb3NlQ2FsZW5kYXIiLCJzaG91bGRDbG9zZUNhbGVuZGFyT25TZWxlY3QiLCJkYXRhVGVzdGlkIiwiZGlzYWJsZUNhbGVuZGFyIiwiaWQiLCJpc09wZW4iLCJpc09wZW5Qcm9wcyIsIm9uQ2FsZW5kYXJDbG9zZSIsIm9uQ2FsZW5kYXJPcGVuIiwib25Gb2N1c1Byb3BzIiwib3BlbkNhbGVuZGFyT25Gb2N1cyIsInNob3VsZENsb3NlQ2FsZW5kYXIiLCJzaG91bGRPcGVuQ2FsZW5kYXIiLCJzZXRJc09wZW4iLCJ3cmFwcGVyIiwiY2FsZW5kYXJXcmFwcGVyIiwib3BlbkNhbGVuZGFyIiwicmVhc29uIiwidG9nZ2xlQ2FsZW5kYXIiLCJvbk91dHNpZGVBY3Rpb24iLCJ3cmFwcGVyRWwiLCJjYWxlbmRhcldyYXBwZXJFbCIsImNvbXBvc2VkUGF0aCIsImNvbnRhaW5zIiwiaGFuZGxlT3V0c2lkZUFjdGlvbkxpc3RlbmVycyIsInNob3VsZExpc3RlbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXJJbnB1dHMiLCJhcmlhTGFiZWxQcm9wcyIsInBsYWNlaG9sZGVyUHJvcHMiLCJyZW5kZXJDYWxlbmRhciIsImNhbGVuZGFyUHJvcHMiLCJwb3J0YWxDb250YWluZXIiLCJjbGFzc05hbWVzIiwiY2FsZW5kYXIiLCJjcmVhdGVQb3J0YWwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJSZWFjdERhdGVQaWNrZXIiLCJhdXRvU2VsZWN0VG9kYXkiLCJkYXRlQXR0ciIsIm9uQ2hhbmdlQWN0aW9uIiwicmVhZE9ubHlTdHlsZSIsInJlc3QiLCJjbGFzcyIsIndpZGdldE5hbWUiLCJjdXJyZW50VmFsdWUiLCJzZXRDdXJyZW50VmFsdWUiLCJzdGF0dXMiLCJkaXNwbGF5VmFsdWUiLCJkaXNhYmxlZFZhbHVlIiwic2V0RGlzYWJsZWRWYWx1ZSIsInJlYWRPbmx5Iiwib25DaGFuZ2VJbnB1dEFjdGlvbiIsImNhbkV4ZWN1dGUiLCJleGVjdXRlIl0sIm1hcHBpbmdzIjoiOztJQUFBLElBQUlBLGVB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
