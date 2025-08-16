import { useContext, useEffect, useState } from "react";
import { Page } from "../../components/layout/page/page";
import { DBContext } from "../../providers/database";
import { useNavigate } from "react-router-dom";
import { Accordion } from "../../components/containers/accordion/accordion";
import { Drawer } from "../../components/containers/accordion/drawer";
import { ObjectSelect } from "../../components/inputs/object-select/object-select";
import { settings } from "../../../models/settings";
import { Unit, UnitType } from "../../../models/units";
import { SettingsController } from "../../../controllers/settings";

type Props = {
  version: string;
};

function useSettingsController() {
  const { stores } = useContext(DBContext);
  if (!stores) return { controller: null };

  const controller = new SettingsController(stores.settingStore, stores.unitStore);

  return { controller };
}

type PageData = {
  settings: settings;
  volumeUnits: Unit[];
  weightUnits: Unit[];
}

export function Settings({ version }: Props) {
  const { controller } = useSettingsController();
  const navigate = useNavigate();

  const [ pageData, setPageData ] = useState<PageData>();

  useEffect(() => {
    const load = async () => {
      if (!controller) return;

      const settings = await controller.getSettings();
      const volumeUnits = await controller.getVolumeUnits();
      const weightUnits = await controller.getWeightUnits();

      setPageData({ settings, volumeUnits, weightUnits });
    };

    load();
  }, [controller]);

  const handleHome = () => navigate("/");

  if (!controller || !pageData) {
    return <Page title="Settings" onHome={handleHome}>
      <p>Loading...</p>
    </Page>;
  }

  function updateSettings(settings: settings) {
    controller?.updateSettings(settings);
    setPageData(prev => prev ? { ...prev, settings } : undefined);
  }

  const settings = pageData.settings;
  const volumeUnits = pageData.volumeUnits;
  const weightUnits = pageData.weightUnits;

  return (
    <Page title="Settings" onHome={handleHome}>
      <Accordion>
        <Drawer id="settings" title="settings" open>
          <ObjectSelect
            options={volumeUnits}
            value={volumeUnits.find(unit => unit.id === settings?.preferredVolumeUnit) ?? null}
            label="Default volume unit"
            onChange={(value) => updateSettings({ ...settings, preferredVolumeUnit: value?.id || settings.preferredVolumeUnit })}
            toDisplay={(unit) => unit.name}
            toKey={(unit) => unit?.id.toString() ?? ""}
          />
          <ObjectSelect
            options={weightUnits}
            value={weightUnits.find(unit => unit.id === settings?.preferredWeightUnit) ?? null}
            label="Default weight unit"
            onChange={(value) => updateSettings({ ...settings, preferredWeightUnit: value?.id || settings.preferredWeightUnit })}
            toDisplay={(unit) => unit.name}
            toKey={(unit) => unit?.id.toString() ?? ""}
          />
        </Drawer>
        <Drawer id="info" title="info">
          <p>Application Version: {version}</p>
        </Drawer>
      </Accordion>
    </Page>
  );
}