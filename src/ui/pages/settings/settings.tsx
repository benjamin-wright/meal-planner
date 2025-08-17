import { useContext, useEffect, useState } from "react";
import { Page } from "../../components/layout/page/page";
import { DBContext } from "../../providers/database";
import { useNavigate } from "react-router-dom";
import { settings } from "../../../models/settings";
import { Unit } from "../../../models/units";
import { SettingsController } from "../../../controllers/settings";
import { SettingsView } from "./settings-view";
import { loadFile, saveFile } from "../../../utils/browser";
import { AlertContext } from "../../providers/alerts";

type Props = {
  version: string;
};

function useSettingsController() {
  const { db, dbName, stores } = useContext(DBContext);
  if (!db || !stores) return { controller: null };

  const controller = new SettingsController(db, dbName, stores.settingStore, stores.unitStore);

  return { controller };
}

export function Settings({ version }: Props) {
  const { controller } = useSettingsController();
  const navigate = useNavigate();

  const { alert } = useContext(AlertContext);

  const [settings, setSettings] = useState<settings | undefined>(undefined);
  const [volumeUnits, setVolumeUnits] = useState<Unit[]>([]);
  const [weightUnits, setWeightUnits] = useState<Unit[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!controller) return;

      const settings = await controller.getSettings();
      const volumeUnits = await controller.getVolumeUnits();
      const weightUnits = await controller.getWeightUnits();

      setSettings(settings);
      setVolumeUnits(volumeUnits);
      setWeightUnits(weightUnits);
    };

    load();
  }, [controller]);

  function handleHome() {
    navigate("/");
  }

  if (!controller || !settings || !volumeUnits || !weightUnits) {
    return <Page title="Settings" onNav={handleHome}>
      <p>Loading...</p>
    </Page>;
  }

  function updateSettings(settings: settings) {
    controller?.updateSettings(settings);
    setSettings(settings);
  }

  async function handleBackup(action: 'backup' | 'restore' | 'reset') {
    if (!controller) return;
    setBusy(true);

    switch (action) {
      case 'backup':
        const data = await controller.backup();
        saveFile({ json: data, filename: "meal-planner-backup.json" });
        setBusy(false);
        break;
      case 'restore':
        try {
          const data = await loadFile();
          await controller.restore(data);
          alert({
            message: "Settings restored successfully.",
            severity: "info",
          });
        } catch (error) {
          let errorMessage = "Failed to restore settings from file";
          if (error instanceof Error) {
            errorMessage += ": " + error.message;
          }

          alert({
            message: errorMessage,
            severity: "error",
          });
        } finally {
          setBusy(false);
        }
        break;
      case 'reset':
        controller.reset();
        setTimeout(() => location.reload(), 2000);
        break;
    }
  }

  return (
    <SettingsView
      version={version}
      settings={settings}
      volumeUnits={volumeUnits}
      weightUnits={weightUnits}
      onNav={handleHome}
      onSettingsUpdate={updateSettings}
      onBackup={handleBackup}
      busy={busy}
    />
  );
}