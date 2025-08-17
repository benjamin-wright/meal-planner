import { Button } from '../../inputs/button/button';
import './dialog.css';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: (accept: boolean) => void;
}

export function Dialog({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <section className="dialog">
      <div className="dialog-inner">
        {children}
        <div className="button-row">
          <Button onClick={() => onClose(true)} content="OK" kind="success" />
          <Button onClick={() => onClose(false)} content="Close" kind="error" />
        </div>
      </div>
    </section>
  )
}