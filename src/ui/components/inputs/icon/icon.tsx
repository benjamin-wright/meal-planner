import './icon.css';

type Props = {
  icon: React.ReactNode;
}

export function Icon({ icon }: Props) {
  return (
    <fieldset className="icon">
     {icon}
    </fieldset>
  );
}