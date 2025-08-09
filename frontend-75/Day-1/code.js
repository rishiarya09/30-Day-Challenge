export default function debounce(func, wait, options = {}) {
  if (typeof func !== "function") throw new TypeError("Expected a function");
  let timeout = null;
  let lastArgs, lastThis;
  let leading = options.leading || false;
  let trailing = options.trailing !== false;
  let result;

  function invoke() {
    result = func.apply(lastThis, lastArgs);
    lastArgs = lastThis = null;
    console.log(`Function loaded`);
    return result;
  }

  function startTimer() {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (trailing && lastArgs) {
        return invoke();
      }
    }, wait);
  }

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;

    const callNow = leading && !timeout;
    startTimer();

    if (callNow) {
      invoke();
    }

    return result;
  }

  debounced.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastArgs = lastThis = null;
  };

  debounced.flush = function () {
    if (timeout && lastArgs) {
      clearTimeout(timeout);
      timeout = null;
      return invoke();
    }
    return result;
  };

  return debounced;
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined")
  module.exports = debounce;
