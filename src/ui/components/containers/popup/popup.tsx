import Check from '../../icons/check';
import Cancel from '../../icons/cross';
import { IconButton } from '../../inputs/icon-button/icon-button';
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
          <IconButton id="cancel-popup-button" icon={<Cancel />} onClick={() => onClose(false)} kind="error" circular label="Cancel popup" />
          <IconButton id="confirm-popup-button" icon={<Check />} onClick={() => onClose(true)} kind="success" circular label="Confirm popup" />
        </div>
      </div>
    </section>
  )
}
