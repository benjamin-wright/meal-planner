import { useContext, useEffect, useState } from "react";
import { Page } from "../../components/layout/page/page";
import { DBContext } from "../../providers/database";
import { useNavigate } from "react-router-dom";
import { settings } from "../../../models/settings";
import { Unit, UnitType } from "../../../models/units";
import { SettingsView } from "./settings-view";
import { loadFile, saveFile } from "../../../utils/browser";
import { AlertContext } from "../../providers/alerts";
import { exportData, importData } from "../../../persistence/exporter";
import { DBFlags } from "../../../persistence/db-flags";

type Props = {
  version: string;
};

export function Settings({ version }: Props) {
  const { db, dbName, stores } = useContext(DBContext);
  const [volumeUnits, setVolumeUnits] = useState<Unit[]>([]);
  const [weightUnits, setWeightUnits] = useState<Unit[]>([]);
  const [settings, setSettings] = useState<settings | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      if (!db || !stores) return;

      setSettings(await stores.settingStore.get());
      setVolumeUnits((await stores.unitStore.getAllByType(UnitType.Volume)));
      setWeightUnits((await stores.unitStore.getAllByType(UnitType.Weight)));
    })();
  }, [db, dbName, stores]);

  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);

  function handleHome() {
    navigate("/");
  }

  if (!settings || !volumeUnits || !weightUnits) {
    return <Page title="Settings" onNav={handleHome}>
      <p>Loading...</p>
    </Page>;
  }

  function onHome() {
    navigate("/");
  }

  async function onSettingsUpdate(newSettings: settings) {
    if (!stores) return;

    setBusy(true);
    await stores.settingStore.put(newSettings);
    setSettings(newSettings);
    setBusy(false);
  }

  async function onBackup() {
    if (!db) return;

    setBusy(true);
    const data = await exportData(db);
    saveFile({ json: data, filename: "meal-planner-backup.json" });
    setBusy(false);
  }

  async function onRestore() {
    if (!db) return;

    setBusy(true);
    const data = await loadFile();
    await importData(db, data);
    alert({
      message: "Settings restored successfully.",
      severity: "info",
    });
    setBusy(false);
  }

  async function onReset() {
    if (!dbName) return;

    setBusy(true);
    DBFlags.setReset(dbName);
    setTimeout(() => location.reload(), 2000);
  }

  return (
    <SettingsView
      version={version}
      settings={settings}
      volumeUnits={volumeUnits}
      weightUnits={weightUnits}
      onNav={onHome}
      onSettingsUpdate={onSettingsUpdate}
      onBackup={onBackup}
      onRestore={onRestore}
      onReset={onReset}
      busy={busy}
    />
  );
}
