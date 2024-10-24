import { useState } from "react";
import { Page } from "../components/page";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import { Database } from "../database";
import { Slide, Snackbar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

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
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  function handleOpen() {
    setDialogOpen(true);
  }

  function handleClose(ok: boolean) {
    setDialogOpen(false);
    if (ok) {
      database
        .reset()
        .then(() => {
          setSuccessOpen(true);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  }

  return (
    <Page title="Settings" icon={<SettingsIcon />}>
      <Button variant="contained" color="error" onClick={handleOpen}>
        Reset
      </Button>
      <CheckDialog open={dialogOpen} onClose={handleClose} />
      <Snackbar
        open={successOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={() => setSuccessOpen(false)}
        message="Application reset successfully."
        TransitionComponent={Slide}
      />
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Page>
  );
}
