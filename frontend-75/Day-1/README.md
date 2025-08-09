# 📅 Day 1 – [Aug 8 2025]

## 🖥 Frontend (GFE 75)

**Problem:** Debounce(https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/debounce)
**Goal:**
This Problem is about implementation of debounce function.

    Debounce function helps to run a function after certain timeout. **Debouce** function should have flush, cancel.
    **Cancel** should cancel delayed timeout and **flush** to invoke the pending function

**Approach:**

- To create debounce function First check if the func variable is typeof func
- Store the latest argument and context for invocation
- Use a timer to delay function execution
- Support immediate execution with the leading option
- Support delayed execution with the trailing option
- Clear previous timers bfore starting new one
- Provide a cancel method to abort pending execution
- Provide flush method to immediatly invoke pending calls]
- Return the last result fromt he debounced function
- Export for both ES modules and COmmon JS compatibility

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

// Example inputs and outputs
✓ Should call the functiononly once after rapid calls
✓ Should call the function immediately if leading is true
✓ Shuld cancel the debounced function
✓ Should flush the debounced function
✓ Should handle options correctly
✓ Should throw an error if the first argument is not a function
✓ Should preserve this/args context

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
