import './centered-panel.css';

type Props = {
  children: React.ReactNode;
}

export function CenteredPanel({ children }: Props) {
  return (
    <div className="centered-panel">
      {children}
    </div>
  );
}
