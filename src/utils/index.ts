import { useState, useEffect } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result: any = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];

    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// export const useDebounce = (value, delay) => {
//   let [debounceValue, setDebounceValue] = useState(value);
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setDebounceValue(value);
//     }, delay);
//     return () => clearTimeout(timeout);
//   }, [value, delay]);

//   return debounceValue;
// };

// export const useDounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       func(...param);
//     }, delay);
//   };
// };
