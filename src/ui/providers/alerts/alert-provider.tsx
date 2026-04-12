import { useState } from "react";
import { Alert, AlertContext } from "./alert-context";
import { AlertsView } from "./alerts-view";

let alertNumber = 0;
const ALERT_TIMEOUT_PERIOD = 5000;

export type RegisteredAlert = {
  alert: Alert,
  number: number,
  timeout: ReturnType<typeof setTimeout>,
  startTime: number,
  endTime: number
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<RegisteredAlert[]>([]);

  function handleAlert(alert: Alert) {
    const newAlert: RegisteredAlert = {
      alert,
      number: alertNumber++,
      timeout: setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.number !== newAlert.number));
      }, ALERT_TIMEOUT_PERIOD),
      startTime: Date.now(),
      endTime: Date.now() + ALERT_TIMEOUT_PERIOD
    };

    setAlerts((prev) => [...prev, newAlert]);
  }

  return (
    <AlertContext.Provider
      value={{ alert: handleAlert }}
    >
      {children}
      <AlertsView alerts={alerts} />
    </AlertContext.Provider>
  );
}
