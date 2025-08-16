import { useContext } from "react";
import { Page } from "../../components/layout/page/page";
import { DBContext } from "../../providers/database";
import { useNavigate } from "react-router-dom";
import { Accordion } from "../../components/containers/accordion/accordion";
import { Drawer } from "../../components/containers/accordion/drawer";

type Props = {
  version: string;
};

export function Settings({ version }: Props) {
  const { stores } = useContext(DBContext);
  const navigate = useNavigate();

  const handleHome = () => {
    console.info("Navigating to home");
    navigate("/");
  };

  if (!stores) {
    return <Page title="Settings" onHome={handleHome}>
      <p>Loading...</p>
    </Page>;
  }

  return (
    <Page title="Settings" onHome={handleHome}>
      <Accordion>
        <Drawer id="settings" title="Settings" open>
          <p>Manage your general settings here.</p>
        </Drawer>
        <Drawer id="info" title="Info">
          <p>Version: {version}</p>
        </Drawer>
      </Accordion>
    </Page>
  );
}