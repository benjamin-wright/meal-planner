import { useContext, useEffect, useState } from "react";
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
import Accordion from "@mui/material/Accordion";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Unit, UnitType } from "../../../models/units";
import { settings } from "../../../models/settings";
import { SelectID } from "../../components/select-id";
import { useForms } from "../../providers/forms";
import { DBFlags } from "../../../persistence/db-flags";

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
  const { db, dbName, unitStore, settingStore } = useContext(DBContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"restore" | "reset">("restore");
  const [backupData, setBackupData] = useState<string | null>(null);
  const { setMessage, setError } = useContext(AlertContext);
  const [weightUnits, setWeightUnits] = useState<Unit[]>([]);
  const [volumeUnits, setVolumeUnits] = useState<Unit[]>([]);
  const [settings, setSettings] = useState<settings>({ preferredVolumeUnit: 0, preferredWeightUnit: 0 });
  const { formsResult, pushForm } = useForms("settings");

  useEffect(() => {
    (async () => {
      if (!unitStore) {
        return;
      }

      setWeightUnits(await unitStore.getAllByType(UnitType.Weight));
      setVolumeUnits(await unitStore.getAllByType(UnitType.Volume));
    })();
  }, [unitStore]);

  useEffect(() => {
    (async () => {
      if (!settingStore) {
        return;
      }

      const settings = await settingStore.get();

      if (formsResult) {
        const { form, response } = formsResult;
        const type = form.body as UnitType;

        if (response) {
          switch (type) {
            case UnitType.Volume:
              settings.preferredVolumeUnit = response.response as number;
              break;
              case UnitType.Weight:
              settings.preferredWeightUnit = response.response as number;
              break;
          }
        }
      }

      setSettings(settings);
    })();
  }, [settingStore, formsResult]);

  function backup() {
    if (!db) {
      setError("Unable to access database");
      return;
    }

    exportData(db).then((blob) => {
      const url = URL.createObjectURL(new Blob([blob], { type: "application/json" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "meal-planner-backup.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function handleOpen(mode: "restore" | "reset") {
    setMode(mode);
    setDialogOpen(true);
  }

  function handleClose(ok: boolean) {
    setDialogOpen(false);
    if (!ok) {
      return;
    }

    switch (mode) {
      case "restore":
        if (!backupData) {
          return;
        }

        if (!db) {
          setError("Unable to access database");
          return;
        }

        importData(db, backupData)
          .then(() => setMessage("Data restored successfully"))
          .catch((err) => setError(err.message));

        return;
      case "reset":
        try {
          DBFlags.setReset(dbName);
          setMessage("Resetting application database...");
          setTimeout(() => window.location.reload(), 1000);
        } catch (err: any) {
          setError(err.message);
        }
    }
  }

  return (
    <Page title="Settings" showNav>
      <Accordion title="Settings" defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography variant="h6">Settings</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <SelectID
            id="volume-unit"
            label="Default volume unit"
            value={settings.preferredVolumeUnit}
            items={volumeUnits}
            toLabel={(unit: Unit) => unit.name}
            onChange={async (unitId: number) => {
              setSettings({ ...settings, preferredVolumeUnit: unitId });
              await settingStore?.put({ ...settings, preferredVolumeUnit: unitId });
            }}
            link="/units/new?type=volume"
            onNav={() => {
              pushForm({
                to: "units",
                from: "settings",
                link: location.pathname,
                body: UnitType.Volume,
              })
            }}
          />
          <SelectID
            id="weight-unit"
            label="Default weight unit"
            value={settings.preferredWeightUnit}
            items={weightUnits}
            toLabel={(unit: Unit) => unit.name}
            onChange={async (unitId: number) => {
              setSettings({ ...settings, preferredWeightUnit: unitId });
              await settingStore?.put({ ...settings, preferredWeightUnit: unitId });
            }}
            link="/units/new?type=weight"
            onNav={() => {
              pushForm({
                to: "units",
                from: "settings",
                link: location.pathname,
                body: UnitType.Weight,
              })
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion title="Backup">
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography variant="h6">Backup</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em"
          }}
        >
          <DescriptionButton text="backup" onClick={backup}>
            Save the current application state to a JSON file on your device.
          </DescriptionButton>
          <DescriptionButton text="restore" color="error" onFileLoad={(contents) => {
            setBackupData(contents);
            handleOpen("restore");
          }} onFileError={(err: any) => setError(err.message)}>
            Load a previous application state from a JSON file.
          </DescriptionButton>
          <DescriptionButton text="reset" color="error" onClick={() => handleOpen("reset")}>
            Drop all data and reset the application to its initial state.
          </DescriptionButton>
        </AccordionDetails>
      </Accordion>
      <Accordion title="Info">
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography variant="h6">Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Application Version: 1.0.2</Typography>
        </AccordionDetails>
      </Accordion>
      <CheckDialog open={dialogOpen} mode={mode} onClose={handleClose} />
    </Page >
  );
}
