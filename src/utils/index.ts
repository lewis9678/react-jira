import { useState, useEffect } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

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

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// const { value, clear, removeIndex, add } = useArray(persons);
export const useArray = <T>(array: T[]) => {
  const [value, setValue] = useState(array);
  return {
    value,
    setValue,
    clear() {
      setValue([]);
    },
    removeIndex(index: number) {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
    add(item: T) {
      setValue([...value, item]);
    },
  };
};

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
