import { useLocation, useNavigate } from "react-router-dom";
import { Backdrop } from "../backdrop/backdrop";
import { Header } from "../header/header";

import './page.css'

type Props = {
  children: React.ReactNode;
  title: string;
  onEdit?: (editing: boolean) => void;
}

export function Page({ children, title, onEdit }: Props) {
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
      <Header title={title} onNav={handleNav} onEdit={onEdit} />
    </>
  );
}
