import { useEffect } from "react";

export function useCleanup(callback: () => void) {
  let stackDepth = 0;

  useEffect(() => {
    stackDepth = history.state?.idx || 0;

    return () => {
      const currentDepth = history.state?.idx || 0;
      if (currentDepth < stackDepth) {
        callback();
      }
    };
  }, []);
}
