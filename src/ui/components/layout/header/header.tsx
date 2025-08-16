import House from "../../icons/house";
import { Icon } from "../../inputs/icon/icon";
import "./header.css";

type Props = {
  title: string;
  onHome?: () => void;
}

export function Header({ title, onHome }: Props) {
  return (
    <div className="header glazing">
      <Icon id="home" label="home" icon={<House />} onClick={onHome} />
      <h1>{title}</h1>
    </div>
  );
}