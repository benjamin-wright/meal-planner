
import { Page } from "../../components/layout/page/page";
import { Accordion } from "../../components/containers/accordion/accordion";
import { Drawer } from "../../components/containers/accordion/drawer";
import { ObjectSelect } from "../../components/inputs/object-select/object-select";
import { settings } from "../../../models/settings";
import { Unit } from "../../../models/units";
import { DescriptiveButton } from "../../components/inputs/descriptive-button/descriptive-button";

type Props = {
  version: string;
  settings: settings;
  volumeUnits: Unit[];
  weightUnits: Unit[];
  onHome: () => void;
  onSettingsUpdate: (settings: settings) => void;
  onBackup: (action: 'backup' | 'restore' | 'delete') => void;
  loading?: boolean;
};

export function SettingsView({ version, settings, volumeUnits, weightUnits, onHome, onSettingsUpdate, onBackup, loading }: Props) {
  return (
    <Page title="Settings" onHome={onHome}>
      <Accordion>
        <Drawer id="settings" title="settings" open>
          <ObjectSelect
            options={volumeUnits}
            value={volumeUnits.find(unit => unit.id === settings?.preferredVolumeUnit) ?? null}
            label="Default volume unit"
            onChange={(value) => onSettingsUpdate({ ...settings, preferredVolumeUnit: value?.id || settings.preferredVolumeUnit })}
            toDisplay={(unit) => unit.name}
            disabled={loading}
          />
          <ObjectSelect
            options={weightUnits}
            value={weightUnits.find(unit => unit.id === settings?.preferredWeightUnit) ?? null}
            label="Default weight unit"
            onChange={(value) => onSettingsUpdate({ ...settings, preferredWeightUnit: value?.id || settings.preferredWeightUnit })}
            toDisplay={(unit) => unit.name}
            disabled={loading}
          />
        </Drawer>
        <Drawer id="backup" title="backup">
          <DescriptiveButton
            description="Save the current application state to a JSON file on your device."
            content="Backup"
            kind="success"
            onClick={() => onBackup('backup')}
            disabled={loading}
          />
          <DescriptiveButton
            description="Restore the application state from a JSON file on your device."
            content="Restore"
            kind="error"
            onClick={() => onBackup('restore')}
            disabled={loading}
          />
          <DescriptiveButton
            description="Drop all data and reset the application to its initial state."
            content="Delete"
            kind="error"
            onClick={() => onBackup('delete')}
            disabled={loading}
          />
        </Drawer>
        <Drawer id="info" title="info">
          <p>Application Version: {version}</p>
        </Drawer>
      </Accordion>
    </Page>
  );
}