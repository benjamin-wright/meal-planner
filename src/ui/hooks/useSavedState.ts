import { useState, useEffect } from "react";

export function useSavedState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T : defaultValue;
  });

  const setSavedState = (value: T) => {
    setState(value);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  useEffect(() => {
    const stackDepth = history.state?.idx || 0;

    return () => {
      const currentDepth = history.state?.idx || 0;
      if (currentDepth < stackDepth && typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    };
  }, [key]);

  return [state, setSavedState];
}
