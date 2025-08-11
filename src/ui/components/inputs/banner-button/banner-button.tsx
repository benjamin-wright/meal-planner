import { Icon } from '../icon/icon';
import './banner-button.css';

type Props = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function BannerButton({ icon, label, onClick }: Props) {
  return(
    <button className="banner-button glazing" aria-label={`Go to ${label}`} onClick={() => onClick()}>
      <Icon icon={icon} size="small" />
      <span>{label}</span>
    </button>
  )
}