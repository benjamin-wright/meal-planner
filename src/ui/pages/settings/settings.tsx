import { ChangeEvent, useContext, useState } from "react";
import { Page } from "../../components/page";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertContext } from "../../components/alerts";
import { useLoaderData } from "react-router-dom";
import { SettingsLoaderResult } from "./settings-loader";
import { exportData, importData } from "../../../persistence/exporter";
import { Units } from "../../../persistence/IndexedDB/units";
import { Categories } from "../../../persistence/IndexedDB/categories";
import { Ingredients } from "../../../persistence/IndexedDB/ingredients";

interface CheckDialogProps {
  open: boolean;
  mode: "backup" | "restore" | "reset";
  onClose: (ok: boolean) => void;
}

const BackupMessage = <>Are you sure you want to backup the entire application state? This will download a JSON file with all the data.</>;
const RestoreMessage = <>Are you sure you want to restore the entire application state? This will overwrite the current data with the data from the file.</>;
const ResetMessage = <>Are you sure you want to reset the entire application state? Lost data <em>cannot</em> be recovered!</>;

function CheckDialog({ open, mode, onClose }: CheckDialogProps) {
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
      <DialogTitle sx={{
        textTransform: "capitalize",
      }} >{mode} Application</DialogTitle>
      <DialogContent>
        {mode === "backup" && BackupMessage}
        {mode === "restore" && RestoreMessage}
        {mode === "reset" && ResetMessage}
      </DialogContent>
      <Stack direction="row" spacing={4}>
        <Button variant="contained" color={mode === "backup" ? "success" : "error"} onClick={() => onClose(true)}>
          {mode}
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
  const [mode, setMode] = useState<"backup" | "restore" | "reset">("backup");
  const [backupData, setBackupData] = useState<string | null>(null);
  const { setMessage, setError } = useContext(AlertContext);
  const data = useLoaderData() as SettingsLoaderResult;

  function handleOpen(mode: "backup" | "restore" | "reset") {
    setMode(mode);
    setDialogOpen(true);
  }

  function handleClose(ok: boolean) {
    setDialogOpen(false);
    if (!ok) {
      return;
    }

    switch(mode) {
      case "backup":
        exportData(new Units(data.db), new Categories(data.db), new Ingredients(data.db)).then((blob) => {
          console.info(blob);
          const url = URL.createObjectURL(new Blob([blob], { type: "application/json" }));
          const a = document.createElement("a");
          a.href = url;
          a.download = "meal-planner-backup.json";
          a.click();
          URL.revokeObjectURL(url);
        });

        return;
      case "restore":
        if (!backupData) {
          return;
        }

        importData(new Units(data.db), new Categories(data.db), new Ingredients(data.db), backupData)
          .then(() => setMessage("Data restored successfully"))
          .catch((err) => setError(err.message));

        return;
      case "reset":
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
      <Button variant="contained" color="success" onClick={()=>handleOpen("backup")}>
        Backup
      </Button>
      <Button variant="contained" component="label" color="error">
        Restore
        <input type="file" hidden onChange={(event: ChangeEvent<HTMLInputElement>)=>{
          const file = event.target.files?.item(0);
          if (!file) {
            return;
          }

          file.text().then((text) => {
            setBackupData(text);
            handleOpen("restore");
          }).catch((err) => {
            setError(err.message);
          });
        }} />
      </Button>
      <Button variant="contained" color="error" onClick={()=>handleOpen("reset")}>
        Reset
      </Button>
      <CheckDialog open={dialogOpen} mode={mode} onClose={handleClose} />
    </Page>
  );
}
