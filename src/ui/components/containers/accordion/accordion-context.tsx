import { createContext, useContext, useState } from "react";

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

export function AccordionProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<string>();
  const [initial, setInitial] = useState<string | undefined>();

  const toggle = (id: string) => {
    setInitial(undefined);
    setCurrent((prev) => {
      return (prev === id || initial === id ? undefined : id);
    });
  };

  const isOpen = (id: string) => {
    return current ? current === id : initial === id;
  }

  return (
    <AccordionContext.Provider value={{ toggle, isOpen, setInitial }}>
      {children}
    </AccordionContext.Provider>
  );
};