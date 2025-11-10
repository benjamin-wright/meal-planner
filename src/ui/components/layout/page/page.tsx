import { useLocation, useNavigate } from "react-router-dom";
import { Backdrop } from "../backdrop/backdrop";
import { Header } from "../header/header";

import './page.css'

type Props = {
  children: React.ReactNode;
  title: string;
  onSorting?: (sorting: boolean) => void;
}

export function Page({ children, title, onSorting }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleNav() {
    if (location.key === 'default') {
      navigate('/', { replace: true });
    } else {
      navigate(-1);
    }
  }

  return (
    <>
      <Backdrop />
      <section className="page-content">
        {children}
      </section>
      <Header title={title} onNav={handleNav} onSorting={onSorting} />
    </>
  );
}
