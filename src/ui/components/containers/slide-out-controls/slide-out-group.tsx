import { useState } from "react";
import { SlideOutGroupContext } from "./slide-out-group-context";
import "./slide-out-group.css";
import { AnimatePresence } from "motion/react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export function SlideOutGroup({ children }: Props) {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <SlideOutGroupContext.Provider value={{
      selectedId, setSelectedId: (id) => {
        setSelectedId(id)
      }
    }}>
      <AnimatePresence>
        <ul className="slide-out-group">
          {children}
        </ul>
      </AnimatePresence>
    </SlideOutGroupContext.Provider>
  );
}
