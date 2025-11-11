import { useState } from "react";
import { SlideOutGroupContext } from "./slide-out-group-context";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export function SlideOutGroup({ children }: Props) {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <SlideOutGroupContext.Provider value={{ selectedId, setSelectedId: (id) => {
      setSelectedId(id) 
    }}}>
      {children}
    </SlideOutGroupContext.Provider>
  );
}