import { Page } from "../../components/page";
import { DetailViewGroup } from "../../components/detail-view";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { NewItemButton } from "../../components/new-item-button";
import { Unit } from "../../../models/units";
import { DBContext } from "../../providers/database";
import { UnitView } from "./components/unit-view";

export function Units() {
  const { unitStore } = useContext(DBContext);

  const [units, setUnits] = useState<Unit[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Unit | null>(null);
  const navigate = useNavigate();

  async function load() {
    if (!unitStore) {
      return;
    }

    const units = await unitStore.getAll();
    setUnits(units);
  }

  useEffect(() => {
    load();
  }, [unitStore])

  function handleEdit(unit: Unit) {
    navigate(`/units/${unit.id}`);
  }

  function handleDelete(unit: Unit) {
    setToDelete(unit);
    setOpen(true);
  }

  async function onDelete() {
    if (toDelete?.id === undefined) {
      return;
    }

    await unitStore?.delete(toDelete.id);
    setOpen(false);
    setUnits(units.filter((unit) => unit.id !== toDelete.id));
  }

  return (
    <Page title="Units">
      <DetailViewGroup>
        {units.map((unit) => (
          <UnitView key={unit.id} unit={unit} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </DetailViewGroup>
      <NewItemButton to="/units/new" />
      <ConfirmDialog
        message={`Deleting "${toDelete?.name}"`}
        open={isOpen}
        onConfirm={onDelete}
        onCancel={() => setOpen(false)}
      />
    </Page>
  );
}
