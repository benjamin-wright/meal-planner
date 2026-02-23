import { Button } from '../../inputs/button/button';
import './popup.css';

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  title: string;
  isOpen: boolean;
  onClose: (accept: boolean) => void;
}

export function Popup({ title, isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <section className="popup">
      <div className="popup-inner">
        <h2>{title}</h2>
        <div className="popup-content">
          {children}
        </div>
        <div className="button-row">
          <Button id="confirm-popup-button" preventDefault onClick={() => onClose(true)} content="OK" kind="success" label="Confirm popup" />
          <Button id="cancel-popup-button" preventDefault onClick={() => onClose(false)} content="Cancel" kind="error" label="Cancel popup" />
        </div>
      </div>
    </section>
  )
}
