import { useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import { Page } from "../../components/layout/page/page";
import { Accordion } from "../../components/containers/accordion/accordion";
import { Drawer } from "../../components/containers/accordion/drawer";
import { DescriptiveButton } from "../../components/inputs/descriptive-button/descriptive-button";
import { Dialog } from "../../components/containers/dialog/dialog";

type Props = {
  version: string;
};

export function Settings({ version }: Props) {
  const { busy, backup, restore, reset } = useSettings();

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
    <Page title="Settings">
      <Accordion>
        <Drawer id="backup" title="backup">
          <DescriptiveButton
            description="Save the current application state to a JSON file on your device."
            content="Backup"
            kind="success"
            onClick={backup}
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
        <Drawer id="info" title="info" open={true}>
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
                restore();
                break;
              case 'reset':
                reset();
                break;
            }
          }
        }}
      />
    </Page>
  );
}
