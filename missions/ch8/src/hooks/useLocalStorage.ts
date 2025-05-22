import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (!item) return initialValue;

      try {
        return JSON.parse(item);
      } catch (parseError) {
        console.error(`JSON 파싱 오류 (${key}):`, parseError);
        window.localStorage.removeItem(key);
        return initialValue;
      }
    } catch (error) {
      console.error(`로컬 스토리지 접근 오류 (${key}):`, error);
      return initialValue;
    }
  });

  const setItem = (value: T | null) => {
    try {
      const valueToStore = value === null ? initialValue : value;

      const serializedValue = JSON.stringify(valueToStore);

      JSON.parse(serializedValue);

      setStoredValue(valueToStore as T);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`값 저장 오류 (${key}):`, error);
    }
  };

  const getItem = () => {
    return storedValue;
  };

  const removeItem = () => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`항목 제거 오류 (${key}):`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        if (!e.newValue) {
          setStoredValue(initialValue);
          return;
        }

        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (parseError) {
          console.error(`스토리지 이벤트 JSON 파싱 오류 (${key}):`, parseError);
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return { getItem, setItem, removeItem };
};
