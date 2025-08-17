import { createContext } from "react";

export type Alert = {
  message: string;
  severity: "success" | "info" | "error";
  undo?: () => void;
}

interface AlertContextProps {
  alert: (alert: Alert) => void;
}

export const AlertContext = createContext<AlertContextProps>({
  alert: () => {},
});