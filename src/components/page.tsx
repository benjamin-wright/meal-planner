import { Header } from "./header";
import { Footer } from "./footer";

interface PageProps {
  title: string;
  children?: React.ReactNode;
}

export function Page({ title, children }: PageProps) {
  return (
    <div className="window flex">
      <Header title={title} home />
      <section className="grower">{children}</section>
      <Footer />
    </div>
  );
}
