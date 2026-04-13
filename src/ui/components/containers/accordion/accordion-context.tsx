import { createContext, useContext } from "react";

type ContextProps = {
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;
  setInitial: (id: string) => void;
}

export const AccordionContext = createContext<ContextProps | null>(null);

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("useAccordionContext must be used within an AccordionProvider");
  }

  return context;
}