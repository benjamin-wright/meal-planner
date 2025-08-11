import './accordion.css';

type Props = {
  children: React.ReactNode;
};

export function Accordion({ children }: Props) {
  return (
    <section className="accordion">
      {children}
    </section>
  );
}
