import { useNavigate } from "react-router-dom";
import { Page } from "../../components/layout/page/page";
import { Button } from "../../components/inputs/button/button";
import { CenteredPanel } from "../../components/containers/centered-panel/centered-panel";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Page title="Huh?" >
      <CenteredPanel>
        <h1>Page not found</h1>
        <p>Sorry, we couldn't find the page you were looking for.</p>
        <br />
        <Button id="back-button" onClick={() => navigate(-1)} content="go back" />
      </CenteredPanel>
    </Page>
  )
}
