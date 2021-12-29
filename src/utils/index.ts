import { useState, useEffect, useRef } from "react";

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];

    if (isVoid(value)) {
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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
        console.log("卸载：" + oldTitle);
      }
    };
  }, [keepOnUnmount, oldTitle]);
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
