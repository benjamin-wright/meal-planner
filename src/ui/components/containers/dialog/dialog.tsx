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
          <Button onClick={() => onClose(true)} content="OK" kind="success" />
          <Button onClick={() => onClose(false)} content="Cancel" kind="error" />
        </div>
      </div>
    </section>
  )
}