import './fat-icon-button.css';

type Props = {
  id: string;
  content: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function FatIconButton({ id, content, icon, onClick }: Props) {
  return (
    <button id={id} className="fat-icon-button glazing" onClick={onClick}>
      {icon}
      <p>{content}</p>
    </button>
  );
}