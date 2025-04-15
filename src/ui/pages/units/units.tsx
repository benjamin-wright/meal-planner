import { Page } from "../../components/page";
import { DetailViewGroup } from "../../components/detail-view";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { FloatingAddButton } from "../../components/floating-add-button";
import { Unit } from "../../../models/units";
import { DBContext } from "../../providers/database";
import { UnitView } from "./components/unit-view";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export function Units() {
  const { unitStore } = useContext(DBContext);
  const [search] = useSearchParams();

  const [tab, setTab] = useState("count");
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

    const type = search.get("type");
    if (type) {
      setTab(type);
    }
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
    <Page title="Units" returnTo="/data" showNav>
      <Tabs value={tab} onChange={(_event, value) => setTab(value)} variant="fullWidth">
        <Tab label="Count" value="count" />
        <Tab label="Weight" value="weight" />
        <Tab label="Volume" value="volume" />
      </Tabs>

      <DetailViewGroup>
        {units.filter(unit => unit.type === tab).map((unit) => (
          <UnitView key={unit.id} unit={unit} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </DetailViewGroup>
      <FloatingAddButton to={`/units/new?type=${tab}`} />
      <ConfirmDialog
        message={`Deleting "${toDelete?.name}"`}
        open={isOpen}
        onConfirm={onDelete}
        onCancel={() => setOpen(false)}
      />
    </Page>
  );
}
