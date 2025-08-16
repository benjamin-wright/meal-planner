import { createContext, useContext, useState } from "react";

type ContextProps = {
  current?: string;
  toggle: (id: string) => void;
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

  const toggle = (id: string) => {
    setCurrent((prev) => (prev === id ? undefined : id));
  };

  return (
    <AccordionContext.Provider value={{ current, toggle }}>
      {children}
    </AccordionContext.Provider>
  );
};