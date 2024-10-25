import { useContext, useState } from "react";
import { Page } from "../components/page";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Database } from "../../database";
import { AlertContext } from "../components/alerts";

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

interface SettingsProps {
  database: Database;
}

export function Settings({ database }: SettingsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setMessage, setError } = useContext(AlertContext);

  function handleOpen() {
    setDialogOpen(true);
  }

  function handleClose(ok: boolean) {
    setDialogOpen(false);
    if (ok) {
      database
        .reset()
        .then(() => {
          setMessage("Application reset successfully.");
        })
        .catch((error) => {
          setError(error.message);
        });
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
