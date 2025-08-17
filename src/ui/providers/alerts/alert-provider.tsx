import { useState } from "react";
import { Alert, AlertContext } from "./alert-context";
import { AlertsView } from "./alerts-view";

let alertNumber = 0;
const ALERT_TIMEOUT_PERIOD = 3000;

type RegisteredAlert = {
  alert: Alert,
  number: number,
  removeAt: number,
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<RegisteredAlert[]>([]);
  const [pendingTimeout, setPendingTimeout] = useState<number | null>(null);

  function handleAlert(alert: Alert) {
    const newAlert: RegisteredAlert = {
      alert,
      number: alertNumber++,
      removeAt: Date.now() + ALERT_TIMEOUT_PERIOD,
    };

    setAlerts((prev) => [...prev, newAlert]);
    resetTimeout();
  }

  function resetTimeout() {
    if (pendingTimeout) {
      clearTimeout(pendingTimeout);
    }

    if (alerts.length === 0) {
      setPendingTimeout(null);
      return;
    }

    const now = Date.now();
    const nextRemoveAt = alerts.reduce((min, a) => Math.min(min, a.removeAt), now + ALERT_TIMEOUT_PERIOD);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.removeAt < nextRemoveAt));
      resetTimeout();
    }, nextRemoveAt - now);
  }

  return (
    <AlertContext.Provider
      value={{ alert: handleAlert }}
    >
      {children}
      <AlertsView />
    </AlertContext.Provider>
  );
}
