import { useContext, useState } from "react";
import { DBContext } from "../../providers/database/db-context";
import { SettingsView } from "./settings-view";
import { loadFile, saveFile } from "../../../utils/browser";
import { AlertContext } from "../../providers/alerts";
import { exportData, importData } from "../../../persistence/exporter";
import { DBFlags } from "../../../persistence/db-flags";

type Props = {
  version: string;
};

export function Settings({ version }: Props) {
  const { db, dbName } = useContext(DBContext);
  const [busy, setBusy] = useState(false);

  const { alert } = useContext(AlertContext);

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
      onBackup={onBackup}
      onRestore={onRestore}
      onReset={onReset}
      busy={busy}
    />
  );
}
