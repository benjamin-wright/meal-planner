import './accordion.css';
import { AccordionProvider } from './accordion-context';


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
