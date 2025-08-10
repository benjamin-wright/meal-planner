import { Backdrop } from "../../presentation/backdrop/backdrop";
import { Header } from "../header/header";

type Props = {
  children: React.ReactNode;
  title: string;
}

export function Page({ children, title }: Props) {
  return (
    <>
      <Backdrop />
      <Header title={title} />
      {children}
    </>
  );
}