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

function useDatabase() {
  const { db, dbName, stores } = useContext(DBContext);
  const [controller, setController] = useState<SettingsController | null>(null);
  const [settings, setSettings] = useState<settings | undefined>(undefined);
  const [volumeUnits, setVolumeUnits] = useState<Unit[]>([]);
  const [weightUnits, setWeightUnits] = useState<Unit[]>([]);

  useEffect(() => {
    if (!db || !stores) return;

    const controller = new SettingsController(db, dbName, stores.settingStore, stores.unitStore);
    setController(controller);
  }, [db, stores])

  useEffect(() => {
    if (!controller) return;

    const loadSettings = async () => {
      const settings = await controller.getSettings();
      const volumeUnits = await controller.getVolumeUnits();
      const weightUnits = await controller.getWeightUnits();

      setSettings(settings);
      setVolumeUnits(volumeUnits);
      setWeightUnits(weightUnits);
    };

    loadSettings();
  }, [controller]);

  return { controller, settings, setSettings, volumeUnits, weightUnits };
}

export function Settings({ version }: Props) {
  const { controller, settings, setSettings, volumeUnits, weightUnits } = useDatabase();
  const [busy, setBusy] = useState(false);
  
  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);

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

  async function handleBackup() {
    if (!controller) return;
    setBusy(true);

    const data = await controller.backup();
    saveFile({ json: data, filename: "meal-planner-backup.json" });
    setBusy(false);
  }

  async function handleRestore() {
    if (!controller) return;
    setBusy(true);

    const data = await loadFile();
    await controller.restore(data);
    alert({
      message: "Settings restored successfully.",
      severity: "info",
    });
    setBusy(false);
  }

  function handleReset() {
    if (!controller) return;
    setBusy(true);

    controller.reset();
    setTimeout(() => location.reload(), 2000);
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
      onRestore={handleRestore}
      onReset={handleReset}
      busy={busy}
    />
  );
}