import { createContext, useState } from "react";

interface SlideOutGroupContextProps {
  selectedId?: string;
  setSelectedId: (id: string | undefined) => void;
}

export const SlideOutGroupContext = createContext<SlideOutGroupContextProps>({
  selectedId: undefined,
  setSelectedId: () => {},
});

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