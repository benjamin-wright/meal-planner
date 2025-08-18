import './button-row.css';

type Props = {
  children?: React.ReactNode[];
  kind?: 'spaced';
}

export function ButtonRow({ children, kind }: Props) {
  const classes = ["button-row", ...(kind ? [`button-row--${kind}`] : [])].join(" ");
  return (
    <div className={classes}>
      {children}
    </div>
  );
}
