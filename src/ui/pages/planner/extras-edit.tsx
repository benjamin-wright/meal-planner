import { Form } from "../../components/form";

export function ExtrasEdit() {
  const returnTo = "/planner?tab=extras";

  return (
    <Form
      title="Planner - Extras: new"
      returnTo={returnTo}
      onSubmit={async () => {}}
    >
    </Form>
  );
}
