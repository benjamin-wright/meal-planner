import { createContext } from "react";

interface SlideOutGroupContextProps {
  selectedId?: string;
  setSelectedId: (id: string | undefined) => void;
}

export const SlideOutGroupContext = createContext<SlideOutGroupContextProps>({
  selectedId: undefined,
  setSelectedId: () => {},
});