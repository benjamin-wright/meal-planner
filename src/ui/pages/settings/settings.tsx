import { ChangeEvent, useContext, useState } from "react";
import { Page } from "../../components/page";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertContext } from "../../providers/alerts";
import { exportData, importData } from "../../../persistence/exporter";
import { DBContext } from "../../providers/database";
import { DescriptionButton } from "../../components/description-button";

interface CheckDialogProps {
  open: boolean;
  mode: "restore" | "reset" | "nuke";
  onClose: (ok: boolean) => void;
}

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
        {mode === "restore" && RestoreMessage}
        {mode === "reset" && ResetMessage}
      </DialogContent>
      <Stack direction="row" spacing={4}>
        <Button variant="contained" color="error" onClick={() => onClose(true)}>
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
  const { db, unitStore, categoryStore, ingredientStore, recipieStore, mealStore } = useContext(DBContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"restore" | "reset" | "nuke">("restore");
  const [backupData, setBackupData] = useState<string | null>(null);
  const { setMessage, setError } = useContext(AlertContext);

  function backup() {
    if (!unitStore || !categoryStore || !ingredientStore || !recipieStore || !mealStore) {
      setError("Unable to access database");
      return;
    }
  
    exportData(unitStore, categoryStore, ingredientStore, recipieStore, mealStore).then((blob) => {
      const url = URL.createObjectURL(new Blob([blob], { type: "application/json" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "meal-planner-backup.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function handleOpen(mode: "restore" | "reset" | "nuke") {
    setMode(mode);
    setDialogOpen(true);
  }

  function handleClose(ok: boolean) {
    setDialogOpen(false);
    if (!ok || !db) {
      return;
    }

    switch(mode) {
      case "restore":
        if (!backupData) {
          return;
        }

        if (!unitStore || !categoryStore || !ingredientStore || !recipieStore || !mealStore) {
          setError("Unable to access database");
          return;
        }

        importData(unitStore, categoryStore, ingredientStore, recipieStore, mealStore, backupData)
          .then(() => setMessage("Data restored successfully"))
          .catch((err) => setError(err.message));

        return;
      case "reset":
        try {
          db.reset();
          setMessage("Application reset successfully, reloading...");
          setTimeout(() => window.location.reload(), 1000);
        } catch (err: any) {
          setError(err.message);
        }
    }
  }

  return (
    <Page title="Settings">
      <DescriptionButton text="Backup" onClick={backup}>
        Save the current application state to a JSON file on your device.
      </DescriptionButton>
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
