import './accordion.css';
import { AccordionProvider } from './accordion-provider';

type Props = {
  children: React.ReactNode;
};

export function Accordion({ children }: Props) {
  return (
    <ul className="accordion">
      <AccordionProvider>
        {children}
      </AccordionProvider>
    </ul>
  );
}
