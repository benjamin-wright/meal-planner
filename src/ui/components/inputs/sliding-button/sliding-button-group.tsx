import { createContext, useContext, useState } from "react";

type ContextProps = {
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;
}
export const SlidingButtonGroupContext = createContext<ContextProps | null>(null);

export function useSlidingButtonGroupContext() {
  const context = useContext(SlidingButtonGroupContext);

  if (!context) {
    throw new Error("useSlidingButtonGroupContext must be used within a SlidingButtonGroupProvider");
  }

  return context;
}

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