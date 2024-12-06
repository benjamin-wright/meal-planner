import { Page } from "../components/page";
import { Database } from "../../database";
import { Unit } from "../../database/schemas";
import { DetailView, DetailViewGroup } from "../components/detail-view";
import { IconLink } from "../components/icon-link";
import Edit from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import {
  Card,
  CardActionArea,
  Fab,
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
import { ConfirmDialog } from "../components/confirm-dialog";
import Add from "@mui/icons-material/Add";

interface UnitsProps {
  database: Database;
}

export function Units({ database }: UnitsProps) {
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

    await database.units.delete(toDelete.id);
    setOpen(false);
    navigate("/units", { replace: true });
  }

  function onAdd() {
    navigate("/units/new");
  }

  function UnitView({ unit }: { unit: Unit }) {
    return (
      <DetailView title={unit.name}>
        <Box display="flex" flexDirection="column">
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Unit</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Abbr.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Conversion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unit.magnitudes.map((c) => (
                  <TableRow key={c.abbrev}>
                    <TableCell>{c.singular}</TableCell>
                    <TableCell>{c.abbrev}</TableCell>
                    <TableCell>{c.multiplier}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

  function NewUnit() {
    return (
      <Fab color="success" sx={{
        position: "fixed",
        bottom: "1em",
        right: "1em",
      }} onClick={onAdd}>
        <Add />
      </Fab>
    );
  }

  return (
    <Page title="Units">
      <DetailViewGroup>
        {data.units.map((unit) => (
          <UnitView key={unit.id} unit={unit} />
        ))}
      </DetailViewGroup>
      <NewUnit />
      <ConfirmDialog
        message={`Deleting "${toDelete?.name}"`}
        open={isOpen}
        onConfirm={onDelete}
        onCancel={() => setOpen(false)}
      />
    </Page>
  );
}
