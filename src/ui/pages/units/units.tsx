import { Page } from "../../components/page";
import { DetailViewGroup } from "../../components/detail-view";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { FloatingAddButton } from "../../components/floating-add-button";
import { Unit, UnitType } from "../../../models/units";
import { DBContext } from "../../providers/database";
import { UnitView } from "./components/unit-view";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Settings } from "../../../models/settings";

export function Units() {
  const { unitStore, settingStore } = useContext(DBContext);
  const [search] = useSearchParams();

  const [tab, setTab] = useState<UnitType>(UnitType.Count);
  const [units, setUnits] = useState<Unit[]>([]);
  const [settings, setSettings] = useState<Settings>({ preferredVolumeUnit: 0, preferredWeightUnit: 0 });
  const [isOpen, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Unit | null>(null);
  const navigate = useNavigate();

  async function load() {
    if (!unitStore) {
      return;
    }

    const units = await unitStore.getAllByType(tab);
    setUnits(units);

    const type = UnitType[search.get("type") as keyof typeof UnitType];
    if (type) {
      setTab(type);
    }
  }

  useEffect(() => {
    load();
  }, [unitStore, tab]);

  useEffect(() => {
    if (!settingStore) {
      return;
    }

    settingStore.get().then((settings) => {
      setSettings(settings);
    });
  }, [settingStore]);

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

  function isDefault(unit: Unit): boolean {
    switch (unit.type) {
      case UnitType.Count:
        return false;
      case UnitType.Weight:
        return unit.id === settings.preferredWeightUnit;
      case UnitType.Volume:
        return unit.id === settings.preferredVolumeUnit;
      default:
        return false;
    }
  }

  return (
    <Page title="Units" returnTo="/data" showNav>
      <Tabs value={tab} onChange={(_event, value: UnitType) => setTab(value)} variant="fullWidth">
        <Tab label={UnitType.Count} value={UnitType.Count} />
        <Tab label={UnitType.Weight} value={UnitType.Weight} />
        <Tab label={UnitType.Volume} value={UnitType.Volume} />
      </Tabs>

      <DetailViewGroup>
        {units.filter(unit => unit.type === tab).map((unit) => (
          <UnitView key={unit.id} unit={unit} isDefault={isDefault(unit)} onEdit={handleEdit} onDelete={handleDelete} />
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
