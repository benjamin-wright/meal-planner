import { useContext } from "react";
import { Page } from "../../components/layout/page/page";
import { DBContext } from "../../providers/database";
import { useNavigate } from "react-router-dom";

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
      <p>Version: {version}</p>
    </Page>
  );
}