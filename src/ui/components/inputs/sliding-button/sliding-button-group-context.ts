import { createContext, useContext } from "react";

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