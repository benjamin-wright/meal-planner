import { Page } from "../../components/page";
import { Unit } from "../../../database/schemas";
import { DetailView, DetailViewGroup } from "../../components/detail-view";
import { IconLink } from "../../components/icon-link";
import Edit from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UnitsLoaderResult } from "./units-loader";
import { useState } from "react";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { NewItemButton } from "../../components/new-item-button";
import { Magnitude } from "../../../models/units";

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
              <TableCell sx={{ fontWeight: "bold" }}>Singular</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Plural</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{singular}</TableCell>
              <TableCell>{plural}</TableCell>
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
              <TableCell sx={{ fontWeight: "bold" }}>Abbreviation</TableCell>
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
      <DetailView title={unit.name}>
        <Box display="flex" flexDirection="column">
          { unit.magnitudes.length > 0 && <MagnitudeView magnitudes={unit.magnitudes} /> }
          { !unit.magnitudes && <CountView singular={unit.singular} plural={unit.plural} /> }
          <Box
            display="flex"
            justifyContent="space-between"
            paddingTop="0.75em"
          >
            <IconLink sx={{ minWidth: "0" }} onClick={() => onEdit(unit)}>
              <Edit />
            </IconLink>
            <IconLink
              color="error"
              sx={{ minWidth: "0" }}
              onClick={() => {
                setToDelete(unit);
                setOpen(true);
              }}
            >
              <Delete />
            </IconLink>
          </Box>
        </Box>
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
