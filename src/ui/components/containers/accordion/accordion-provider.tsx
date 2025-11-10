import { useState } from "react";
import { AccordionContext } from "./accordion-context";

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