import { useContext, useEffect, useState } from "react";
import { Page } from "../../components/layout/page/page";
import { DBContext } from "../../providers/database";
import { useNavigate } from "react-router-dom";
import { settings } from "../../../models/settings";
import { Unit } from "../../../models/units";
import { SettingsController } from "../../../controllers/settings";
import { SettingsView } from "./settings-view";

type Props = {
  version: string;
};

function useSettingsController() {
  const { stores } = useContext(DBContext);
  if (!stores) return { controller: null };

  const controller = new SettingsController(stores.settingStore, stores.unitStore);

  return { controller };
}

export function Settings({ version }: Props) {
  const { controller } = useSettingsController();
  const navigate = useNavigate();

  const [settings, setSettings] = useState<settings | undefined>(undefined);
  const [volumeUnits, setVolumeUnits] = useState<Unit[]>([]);
  const [weightUnits, setWeightUnits] = useState<Unit[]>([]);

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

  const handleHome = () => navigate("/");

  if (!controller || !settings || !volumeUnits || !weightUnits) {
    return <Page title="Settings" onHome={handleHome}>
      <p>Loading...</p>
    </Page>;
  }

  function updateSettings(settings: settings) {
    controller?.updateSettings(settings);
    setSettings(settings);
  }

  async function handleBackup(action: 'backup' | 'restore' | 'delete') {
    if (!controller) return;

    switch (action) {
      case 'backup':
        controller.backup();
        break;
      case 'restore':
        controller.restore();
        break;
      case 'delete':
        controller.delete();
        break;
    }
  }

  return (
    <SettingsView
      version={version}
      settings={settings}
      volumeUnits={volumeUnits}
      weightUnits={weightUnits}
      onHome={handleHome}
      onSettingsUpdate={updateSettings}
      onBackup={handleBackup}
    />
  );
}