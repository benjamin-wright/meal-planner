import Back from "../../icons/back";
import House from "../../icons/house";
import { IconButton } from "../../inputs/icon-button/icon-button";
import "./header.css";

type Props = {
  title: string;
  onNav?: () => void;
}

export function Header({ title, onNav }: Props) {
  const icon = onNav ? <IconButton onClick={onNav} icon={<Back />} /> : <House />;

  return (
    <div className="header glazing">
      {icon}
      <h1>{title}</h1>
    </div>
  );
}