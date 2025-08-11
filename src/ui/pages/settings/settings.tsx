import { Page } from "../../components/layout/page/page";

type Props = {
  version: string;
};

export function Settings({ version }: Props) {
  return (
    <Page title="Settings">
      <h1>Settings</h1>
      <p>Version: {version}</p>
    </Page>
  );
}