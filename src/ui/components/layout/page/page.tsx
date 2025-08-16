import { Backdrop } from "../../presentation/backdrop/backdrop";
import { Header } from "../header/header";

import './page.css'

type Props = {
  children: React.ReactNode;
  title: string;
  onHome?: () => void;
}

export function Page({ children, title, onHome }: Props) {
  return (
    <>
      <Backdrop />
      <section className="page-content">
        {children}
      </section>
      <Header title={title} onHome={onHome} />
    </>
  );
}