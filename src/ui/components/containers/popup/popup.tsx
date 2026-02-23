import { Button } from '../../inputs/button/button';
import './popup.css';

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  isOpen: boolean;
  onClose: (accept: boolean) => void;
}

export function Popup({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <section className="popup">
      <div className="popup-inner">
        {children}
        <div className="button-row">
          <Button id="confirm-popup-button" onClick={() => onClose(true)} content="OK" kind="success" label="Confirm popup" />
          <Button id="cancel-popup-button" onClick={() => onClose(false)} content="Cancel" kind="error" label="Cancel popup" />
        </div>
      </div>
    </section>
  )
}
