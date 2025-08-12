# 📅 Day 1 – [Aug 8 2025]

## 🖥 Frontend (GFE 75)

**Problem:** Throttle(https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/throttle)
**Goal:**
Implement a robust throttle function in JavaScript that ensures a given function is only called at most once per specified interval, regardless of how many times it is triggered. The function should support options for immediate execution (leading), delayed execution (trailing), cancellation, and flushing pending calls. It should validate input types, preserve context and arguments, and be compatible with both ES modules and CommonJS.

**Approach:**

- Validate that the provided argument is a function.
- Track the last arguments and context for invocation.
- Use a timer to manage throttling intervals.
- Support immediate execution with the leading option.
- Support delayed execution with the trailing option.
- Clear previous timers before starting a new one.
- Provide a cancel method to abort pending execution.
- Provide a flush method to immediately invoke pending calls.
- Return the last result from the throttled function.
- Export for both ES modules and CommonJS compatibility.

**Code:**

```javascript
// Your code here

    **invoke**
    if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
        timeout = null;
        if (trailing && lastArgs) {
            return invoke();
        }
        }, wait);

    **Cancel**
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastArgs = lastThis = null;

    **Flush**
    if (timeout && lastArgs) {
      clearTimeout(timeout);
      timeout = null;
      return invoke();
    }
    return result;
```

**Test Cases**

- ✓ Should call the functiononly once after rapid calls
- ✓ Should call the function immediately if leading is true
- ✓ Shuld cancel the debounced function
- ✓ Should flush the debounced function
- ✓ Should handle options correctly
- ✓ Should throw an error if the first argument is not a function
- ✓ Should preserve this/args context

**What I Learned**

- How to implement a debounce function from scratch.
- The importance of validating input types for robust code.
- Managing timers and function context in JavaScript.
- How `leading` and `trailing` options affect debounce behavior.
- Techniques to cancel or immediately invoke pending debounced calls.
- Writing utility methods (`cancel`, `flush`) for better API design.
- Handling edge cases and ensuring correct function invocation.
- Exporting modules for both ES and CommonJS compatibility.
- Writing and running Jest tests for timing-based functions.
- Debugging and refining code based on test results.
