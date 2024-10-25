import { Alert, Slide, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

interface AlertContextProps {
  message?: string;
  error?: string;
  setMessage: (message: string) => void;
  setError: (error: string) => void;
}

export const AlertContext = createContext<AlertContextProps>({
  setMessage: () => {},
  setError: () => {},
});

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [alertOpen, setAlertOpen] = useState(false);

  function handleSetMessage(message: string) {
    setMessage(message);
    setError(undefined);
    setAlertOpen(true);
  }

  function handleSetError(error: string) {
    setMessage(undefined);
    setError(error);
    setAlertOpen(true);
  }

  return (
    <AlertContext.Provider
      value={{ setMessage: handleSetMessage, setError: handleSetError }}
    >
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        TransitionComponent={Slide}
      >
        <Alert severity={error ? "error" : "success"} sx={{ width: "100%" }}>
          {error || message || "No message"}
        </Alert>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
}
