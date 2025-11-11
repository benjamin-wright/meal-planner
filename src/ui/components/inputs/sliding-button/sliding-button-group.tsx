import { useState } from "react";
import { SlidingButtonGroupContext } from "./sliding-button-group-context";

export function SlidingButtonGroup({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<string>();

  const toggle = (id: string) => {
    setCurrent((prev) => {
      return (prev === id ? undefined : id);
    });
  };

  const isOpen = (id: string) => {
    return current === id;
  }

  return (
    <SlidingButtonGroupContext.Provider value={{ toggle, isOpen }}>
      {children}
    </SlidingButtonGroupContext.Provider>
  );
};