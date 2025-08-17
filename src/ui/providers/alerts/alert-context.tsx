import { createContext } from "react";

export type Alert = {
  message: string;
  severity: "info" | "warning" | "error";
  undo?: () => void;
}

interface AlertContextProps {
  alert: (alert: Alert) => void;
}

export const AlertContext = createContext<AlertContextProps>({
  alert: () => {},
});