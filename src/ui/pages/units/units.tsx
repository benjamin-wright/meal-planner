import { Page } from "../../components/page";
import { DetailViewGroup } from "../../components/detail-view";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { FloatingAddButton } from "../../components/floating-add-button";
import { parseType, Unit, UnitType } from "../../../models/units";
import { DBContext } from "../../providers/database";
import { UnitView } from "./components/unit-view";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { settings } from "../../../models/settings";

function useTabs(params: URLSearchParams) {
  const [tab, setTab] = useState<UnitType>(UnitType.Count);

  useEffect(() => {
    const type = params.get("type");
    if (type) {
      const parsedType = parseType(type);
      if (parsedType) {
        console.info(`Setting tab to '${parsedType}'`);
        setTab(parsedType);
      } else {
        console.warn(`Invalid type: '${type}'`);
      }
    }
  }, [])

  return { tab, setTab };
}

function useUnits(tab: UnitType) {
  const { unitStore } = useContext(DBContext);
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    if (!unitStore) {
      return;
    }

    (async () => {
      const units = await unitStore.getAllByType(tab);
      setUnits(units);
    })();
  }, [unitStore, tab]);

  function deleteUnit(unit: Unit): Promise<void> | undefined {
    setUnits(units.filter((u) => u.id !== unit.id));
    return unitStore?.delete(unit.id);
  }

  return { units, unitStore, deleteUnit };
}

function useSettings() {
  const { settingStore } = useContext(DBContext);
  const [settings, setSettings] = useState<settings>({ preferredVolumeUnit: 0, preferredWeightUnit: 0 });

  useEffect(() => {
    if (!settingStore) {
      return;
    }

    (async () => {
      const settings = await settingStore.get();
      setSettings(settings);
    })();
  }, [settingStore]);

  return { settings };
}

export function Units() {
  const [search] = useSearchParams();

  const { settings } = useSettings();
  const { tab, setTab } = useTabs(search);
  const { units, deleteUnit } = useUnits(tab);

  const [toDelete, setToDelete] = useState<Unit | undefined>();
  const navigate = useNavigate();

  function handleEdit(unit: Unit) {
    navigate(`/units/${unit.id}`);
  }

  function handleDelete(unit: Unit) {
    setToDelete(unit);
  }

  async function onDelete(unit: Unit) {
    await deleteUnit(unit);
    setToDelete(undefined);
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

      <DetailViewGroup flexLayout bottomMargin="6em">
        {units.filter(unit => unit.type === tab).map((unit) => (
          <UnitView key={unit.id} unit={unit} isDefault={isDefault(unit)} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </DetailViewGroup>
      <FloatingAddButton to={`/units/new?type=${tab}`} />
      <ConfirmDialog
        message={`Deleting "${toDelete?.name}"`}
        item={toDelete}
        onConfirm={onDelete}
        onCancel={() => setToDelete(undefined)}
      />
    </Page>
  );
}
