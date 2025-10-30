import { Page } from "../page/page";
import { Button } from "../../inputs/button/button";
import './form.css';

type Props = {
  title: string
  children: React.ReactNode
  onSubmit: () => void
  disableSubmit?: boolean
}

export function Form({ title, children, onSubmit, disableSubmit }: Props) {
  return <Page title={title}>
    <section className="form-section">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        {children}
      </form>
      <Button id="confirm-submit-button" onClick={() => onSubmit()} content="Save" kind="success" disabled={disableSubmit} />
    </section>
  </Page>;
}
