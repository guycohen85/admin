import { useState, useEffect } from 'react';

function useLocalStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.localStorage);
}

function useSessionStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === null) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = () => {
    setValue(null);
  };

  return [value, setValue, remove];
}

export { useLocalStorage, useSessionStorage };
