import { useContext, useState } from "react";
import { DBContext } from "../providers/database/db-context";
import { AlertContext } from "../providers/alerts";
import { loadFile, saveFile } from "../../utils/browser";
import { exportData, importData } from "../../persistence/exporter";
import { DBFlags } from "../../persistence/db-flags";

export function useSettings() {
  const { db, dbName } = useContext(DBContext);
  const [busy, setBusy] = useState(false);
  const { alert } = useContext(AlertContext);

  async function backup() {
    if (!db) return;

    setBusy(true);
    const data = await exportData(db);
    saveFile({ json: data, filename: "meal-planner-backup.json" });
    setBusy(false);
  }

  async function restore() {
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

  async function reset() {
    if (!dbName) return;

    setBusy(true);
    DBFlags.setReset(dbName);
    setTimeout(() => location.reload(), 2000);
  }

  return { busy, backup, restore, reset };
}
