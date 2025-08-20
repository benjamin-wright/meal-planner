import { useNavigate } from "react-router-dom";
import { Page } from "../../components/layout/page/page";
import { Button } from "../../components/inputs/button/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Page title="Huh?" onNav={() => navigate(-1)}>
      <section>
        <h1>Page not found</h1>
        <br />
        <Button id="back-button" onClick={() => navigate(-1)} content="go back" />
      </section>
    </Page>
  )
}
