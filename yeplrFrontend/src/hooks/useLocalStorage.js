import { useState, useEffect } from "react";

/** Customer hook for keeping data synced with localStorage */

const useLocalStorage = (key, firstValue = null) => {
  const INITIAL_VALUE = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(INITIAL_VALUE);

  useEffect(() => {
    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
};

export default useLocalStorage;
