import { Page } from "../page/page";

type Props = {
  title: string
  children: React.ReactNode
  onNav: () => void
  onSubmit: () => void
}

export function Form({ title, children, onNav, onSubmit }: Props) {
  return <Page title={title} onNav={onNav}>
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      {children}
    </form>
  </Page>;
}
