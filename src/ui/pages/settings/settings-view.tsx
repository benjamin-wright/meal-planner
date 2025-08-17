
import { Page } from "../../components/layout/page/page";
import { Accordion } from "../../components/containers/accordion/accordion";
import { Drawer } from "../../components/containers/accordion/drawer";
import { ObjectSelect } from "../../components/inputs/object-select/object-select";
import { settings } from "../../../models/settings";
import { Unit } from "../../../models/units";
import { DescriptiveButton } from "../../components/inputs/descriptive-button/descriptive-button";
import { useState } from "react";
import { Dialog } from "../../components/containers/dialog/dialog";

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
  const [ isOpen, setIsOpen ] = useState(false);
  const [ dialogAction, setDialogAction ] = useState<'restore' | 'delete'>('restore');

  function getDialogContent(action: 'restore' | 'delete') {
    switch (action) {
      case 'restore':
        return <p>Are you sure you want to restore?</p>;
      case 'delete':
        return <p>Are you sure you want to delete?</p>;
      default:
        return null;
    }
  }

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
            onClick={() => {
              setDialogAction('restore');
              setIsOpen(true);
            }}
            disabled={loading}
          />
          <DescriptiveButton
            description="Drop all data and reset the application to its initial state."
            content="Delete"
            kind="error"
            onClick={() => {
              setDialogAction('delete');
              setIsOpen(true);
            }}
            disabled={loading}
          />
        </Drawer>
        <Drawer id="info" title="info">
          <p>Application Version: {version}</p>
        </Drawer>
      </Accordion>
      <Dialog
        isOpen={isOpen}
        onClose={(accept) => {
          setIsOpen(false);
          if (accept) {
            onBackup(dialogAction);
          }
        }}
      >
        {getDialogContent(dialogAction)}
      </Dialog>
    </Page>
  );
}