import { useNavigate } from "react-router-dom";
import { Backdrop } from "../backdrop/backdrop";
import { Header } from "../header/header";

import './page.css'

type Props = {
  children: React.ReactNode;
  title: string;
}

export function Page({ children, title }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <Backdrop />
      <section className="page-content">
        {children}
      </section>
      <Header title={title} onNav={() => navigate(-1)} />
    </>
  );
}
