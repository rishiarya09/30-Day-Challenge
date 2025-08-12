export default function throttle(func, wait = 0, options = {}) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function as first argument');
  }
  let timeout = null;
  let lastArgs, lastThis;
  let lastCallTime = 0;
  let result;
  let leading = options.leading !== false;
  let trailing = options.trailing !== false;

  function invoke(time) {
    lastCallTime = time;
    result = func.apply(lastThis, lastArgs);
    lastArgs = lastThis = null;
    return result;
  }

  function startTimer(pendingFunc, wait) {
    timeout = setTimeout(pendingFunc, wait);
  }

  function trailingEdge() {
    timeout = null;
    if (trailing && lastArgs) {
      return invoke(Date.now());
    }
    lastArgs = lastThis = null;
    return result;
  }

  function throttled(...args) {
    const now = Date.now();
    if (!lastCallTime && !leading) lastCallTime = now;
    const remaining = wait - (now - lastCallTime);
    lastArgs = args;
    lastThis = this;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      invoke(now);
    } else if (!timeout && trailing) {
      startTimer(trailingEdge, remaining);
    }
    return result;
  }

  throttled.cancel = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastArgs = lastThis = null;
    lastCallTime = 0;
  };

  throttled.flush = function() {
    if (timeout && lastArgs) {
      clearTimeout(timeout);
      timeout = null;
      return invoke(Date.now());
    }
    return result;
  };

  return throttled;
}

// CommonJS export
module.exports = throttle;
