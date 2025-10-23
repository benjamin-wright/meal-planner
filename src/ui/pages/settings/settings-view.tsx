
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
  busy?: boolean;
  onNav: () => void;
  onSettingsUpdate: (settings: settings) => void;
  onBackup: () => void;
  onRestore: () => void;
  onReset: () => void;
};

export function SettingsView({ version, settings, volumeUnits, weightUnits, busy, onNav, onSettingsUpdate, onBackup, onRestore, onReset }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<'restore' | 'reset'>('restore');

  function getDialogPrompt(action: 'restore' | 'reset') {
    switch (action) {
      case 'restore':
        return "Are you sure you want to restore?";
      case 'reset':
        return "Are you sure you want to reset?";
    }
  }

  function getDialogWarning(action: 'restore' | 'reset') {
    switch (action) {
      case 'restore':
        return "This action will replace all current application data with the contents of the backup you select.";
      case 'reset':
        return "This action will wipe all application data and cannot be undone.";
    }
  }

  return (
    <Page title="Settings" onNav={onNav}>
      <Accordion>
        <Drawer id="units" title="units" open>
          <ObjectSelect
            id="preferred-volume-unit"
            options={volumeUnits}
            value={volumeUnits.find(unit => unit.id === settings?.preferredVolumeUnit)}
            label="Default volume unit"
            onChange={(value) => onSettingsUpdate({ ...settings, preferredVolumeUnit: value?.id || settings.preferredVolumeUnit })}
            toDisplay={(unit) => unit.name}
            disabled={busy}
          />
          <ObjectSelect
            id="preferred-weight-unit"
            options={weightUnits}
            value={weightUnits.find(unit => unit.id === settings?.preferredWeightUnit)}
            label="Default weight unit"
            onChange={(value) => onSettingsUpdate({ ...settings, preferredWeightUnit: value?.id || settings.preferredWeightUnit })}
            toDisplay={(unit) => unit.name}
            disabled={busy}
          />
        </Drawer>
        <Drawer id="backup" title="backup">
          <DescriptiveButton
            description="Save the current application state to a JSON file on your device."
            content="Backup"
            kind="success"
            onClick={onBackup}
            disabled={busy}
          />
          <DescriptiveButton
            description="Restore the application state from a JSON file on your device."
            content="Restore"
            kind="error"
            onClick={() => {
              setDialogAction('restore');
              setIsOpen(true);
            }}
            disabled={busy}
          />
          <DescriptiveButton
            description="Drop all data and reset the application to its initial state."
            content="Reset"
            kind="error"
            onClick={() => {
              setDialogAction('reset');
              setIsOpen(true);
            }}
            disabled={busy}
          />
        </Drawer>
        <Drawer id="info" title="info">
          <p>Application Version: {version}</p>
        </Drawer>
      </Accordion>
      <Dialog
        prompt={getDialogPrompt(dialogAction)}
        warning={getDialogWarning(dialogAction)}
        isOpen={isOpen}
        onClose={(accept) => {
          setIsOpen(false);
          if (accept) {
            switch (dialogAction) {
              case 'restore':
                onRestore();
                break;
              case 'reset':
                onReset();
                break;
            }
          }
        }}
      />
    </Page>
  );
}
