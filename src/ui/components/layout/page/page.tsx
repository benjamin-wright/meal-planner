import { Backdrop } from "../backdrop/backdrop";
import { Header } from "../header/header";

import './page.css'

type Props = {
  children: React.ReactNode;
  title: string;
  onNav?: () => void;
}

export function Page({ children, title, onNav }: Props) {
  return (
    <>
      <Backdrop />
      <section className="page-content">
        {children}
      </section>
      <Header title={title} onNav={onNav} />
    </>
  );
}