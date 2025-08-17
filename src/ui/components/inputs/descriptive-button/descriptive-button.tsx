import './descriptive-button.css';

type Props = {
  description: string;
  content: string;
  onClick: () => void;
  kind?: 'success' | 'error';
  disabled?: boolean;
}

export function DescriptiveButton({ description, content, kind, onClick, disabled }: Props) {
  return <fieldset className={`descriptive-button glazing`} disabled={disabled}>
    <p>{description}</p>
    <button className={kind} onClick={onClick}>{content}</button>
  </fieldset>;
}