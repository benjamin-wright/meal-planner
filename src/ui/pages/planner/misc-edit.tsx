import { Form } from "../../components/form";

export function MiscEdit() {
  const returnTo = "/planner?tab=misc";

  return (
    <Form
      title="Planner - Misc: new"
      returnTo={returnTo}
      onSubmit={async () => {}}
    >
    </Form>
  );
}
