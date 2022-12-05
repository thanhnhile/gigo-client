import { useState } from 'react';

const useLocalStorage = (key, initValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initValue;
    } catch (error) {
      console.log(error);
      return initValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  const removeValue = () => {
    const item = window.localStorage.getItem(key);
    if (item) {
      window.localStorage.removeItem(key);
      return true;
    }
    return false;
  };
  return { storedValue, setValue, removeValue };
};
export default useLocalStorage;
