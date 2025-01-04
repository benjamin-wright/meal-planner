import { Page } from "../../components/page";
import { DetailView, DetailViewGroup } from "../../components/detail-view";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UnitsLoaderResult } from "./units-loader";
import { useState } from "react";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { NewItemButton } from "../../components/new-item-button";
import { Magnitude, Unit } from "../../../models/units";

export function Units() {
  const [isOpen, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Unit | null>(null);
  const data = useLoaderData() as UnitsLoaderResult;
  const navigate = useNavigate();

  function onEdit(unit: Unit) {
    navigate(`/units/${unit.id}`);
  }

  async function onDelete() {
    if (toDelete?.id === undefined) {
      return;
    }

    await data.store.delete(toDelete.id);
    setOpen(false);
    navigate("/units", { replace: true });
  }

  function CountView({ singular, plural }: { singular?: string; plural?: string }) {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", width: "50%" }}>Singular</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "50%" }}>Plural</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{singular || "N/A"}</TableCell>
              <TableCell>{plural || "N/A"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function MagnitudeView({ magnitudes }: { magnitudes: Magnitude[] }) {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Abbr.</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Singular</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Plural</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Multiplier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {magnitudes.map((m: Magnitude) => (
              <TableRow key={m.abbrev}>
                <TableCell>{m.abbrev}</TableCell>
                <TableCell>{m.singular}</TableCell>
                <TableCell>{m.plural}</TableCell>
                <TableCell>{m.multiplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function UnitView({ unit }: { unit: Unit }) {
    return (
      <DetailView
        title={unit.name}
        onEdit={() => onEdit(unit)}
        onDelete={() => {
          setToDelete(unit)
          setOpen(true)
        }}
      >
        { unit.magnitudes.length > 0 && <MagnitudeView magnitudes={unit.magnitudes} /> }
        { unit.magnitudes.length === 0 && <CountView singular={unit.singular} plural={unit.plural} /> }
      </DetailView>
    );
  }

  return (
    <Page title="Units">
      <DetailViewGroup>
        {data.units.map((unit) => (
          <UnitView key={unit.id} unit={unit} />
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
