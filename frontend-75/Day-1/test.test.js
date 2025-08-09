import debounce from "../Day-1/code.js";
import { jest } from "@jest/globals";

jest.useFakeTimers();

describe("Debounce Function", () => {
  it("Should call the functiononly once after rapid calls", () => {
    let mockFunc = jest.fn();
    let debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    // Fast-forward time
    jest.advanceTimersByTime(1000);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it("Should call the function immediately if leading is true", () => {
    let mockFunc = jest.fn();
    let debouncedFunc = debounce(mockFunc, 1000, {
      leading: true,
      trailing: false,
    });

    debouncedFunc();

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it("Shuld cancel the debounced function", () => {
    let mockFunc = jest.fn();
    let debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc();
    debouncedFunc.cancel();

    // Fast-forward time
    jest.advanceTimersByTime(1000);

    expect(mockFunc).toHaveBeenCalledTimes(0);
  });

  it("Should flush the debounced function", () => {
    let mockFunc = jest.fn();
    let debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc();
    debouncedFunc.flush();

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it("Should handle options correctly", () => {
    let mockFunc = jest.fn();
    let debouncedFunc = debounce(mockFunc, 1000, {
      leading: true,
      trailing: true,
    });

    debouncedFunc();
    jest.advanceTimersByTime(500);
    debouncedFunc();

    expect(mockFunc).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });

  it("Should throw an error if the first argument is not a function", () => {
    expect(() => {
      debounce("not a function", 1000);
    }).toThrow(TypeError);
  });

  it("Should preserve this/args context", () => {
    let context = {
      value: 42,
      fn(v) {
        return this.value + v;
      },
    };
    let debouncedFunc = debounce(context.fn, 1000);

    debouncedFunc.call(context, 8);
    expect(debouncedFunc.flush()).toBe(50); // 42 + 8
    debouncedFunc.call(context, 10);
    jest.advanceTimersByTime(1000);
    expect(debouncedFunc.flush()).toBe(52); // 42 + 10
  });
});
