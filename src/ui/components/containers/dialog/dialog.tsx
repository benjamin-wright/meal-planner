import { Button } from '../../inputs/button/button';
import './dialog.css';

type Props = {
  prompt: string;
  warning: string;
  isOpen: boolean;
  onClose: (accept: boolean) => void;
}

export function Dialog({ isOpen, onClose, prompt, warning }: Props) {
  if (!isOpen) return null;

  return (
    <section className="dialog">
      <div className="dialog-inner">
        <h2>{prompt}</h2>
        <p className="warning">{warning}</p>
        <div className="button-row">
          <Button id="confirm-delete-button" preventDefault onClick={() => onClose(true)} content="OK" kind="success" label="Confirm dialog" />
          <Button id="cancel-delete-button" preventDefault onClick={() => onClose(false)} content="Cancel" kind="error" label="Cancel dialog" />
        </div>
      </div>
    </section>
  )
}
