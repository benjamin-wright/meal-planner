import './banner-button.css';

type Props = {
  icon: React.ReactNode;
  label: string;
}

export function BannerButton({ icon, label }: Props) {
  return(
    <button className="banner-button glazing">
      {icon}
      <span>{label}</span>
    </button>
  )
}