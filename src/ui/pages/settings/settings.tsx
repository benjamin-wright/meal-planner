import { useContext, useState } from "react";
import { Page } from "../../components/page";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertContext } from "../../components/alerts";
import { useLoaderData } from "react-router-dom";
import { SettingsLoaderResult } from "./settings-loader";

interface CheckDialogProps {
  open: boolean;
  onClose: (ok: boolean) => void;
}

function CheckDialog({ open, onClose }: CheckDialogProps) {
  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          padding: "1em",
          alignItems: "center",
        },
      }}
    >
      <DialogTitle>Reset Application</DialogTitle>
      <DialogContent>
        Are you sure you want to reset the entire applicaiton state? Lost data{" "}
        <em>cannot</em> be recovered!
      </DialogContent>
      <Stack direction="row" spacing={4}>
        <Button variant="contained" color="error" onClick={() => onClose(true)}>
          Reset
        </Button>
        <Button variant="contained" onClick={() => onClose(false)}>
          Cancel
        </Button>
      </Stack>
    </Dialog>
  );
}

export function Settings() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setMessage, setError } = useContext(AlertContext);
  const data = useLoaderData() as SettingsLoaderResult;

  function handleOpen() {
    setDialogOpen(true);
  }

  function handleClose(ok: boolean) {
    setDialogOpen(false);
    if (ok) {
      try {
        data.db.reset();
        setMessage("Application reset successfully, reloading...");
        setTimeout(() => window.location.reload(), 1000);
      } catch (err: any) {
        setError(err.message);
      }
    }
  }

  return (
    <Page title="Settings">
      <Button variant="contained" color="error" onClick={handleOpen}>
        Reset
      </Button>
      <CheckDialog open={dialogOpen} onClose={handleClose} />
    </Page>
  );
}
