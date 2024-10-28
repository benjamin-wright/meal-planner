import { useContext, useEffect, useState } from "react";
import { Page } from "../components/page";
import { Database } from "../../database";
import { Unit } from "../../database/schemas";
import { DetailView, DetailViewGroup } from "../components/detail-view";
import { IconLink } from "../components/icon-link";
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
import { AlertContext } from "../components/alerts";
import { useNavigate } from "react-router-dom";

interface UnitsProps {
  database: Database;
}

export function Units({ database }: UnitsProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [units, setUnits] = useState<Unit[] | null>(null);
  const { setMessage, setError } = useContext(AlertContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || loaded) {
      return;
    }

    setLoading(true);

    database.units
      .getAll()
      .then((newUnits) => {
        setUnits(newUnits);
        setLoaded(true);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to load units: ${error}`);
      });
  }, [loading, loaded, setError, database.units]);

  function onEdit(unit: Unit) {
    navigate(`/units/${unit.id}`);
  }

  async function onDelete(unit: Unit) {
    if (unit.id === undefined) {
      return;
    }

    await database.units.delete(unit.id);
    setUnits(units?.filter((u) => u.id !== unit.id) || []);
    setMessage(`Deleted unit '${unit.name}'`);
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
            <IconLink
              color="secondary"
              sx={{ minWidth: "0" }}
              onClick={() => onEdit(unit)}
            >
              <Edit />
            </IconLink>
            <IconLink
              color="error"
              sx={{ minWidth: "0" }}
              onClick={() => onDelete(unit)}
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
      {!loaded && <p>Loading...</p>}
      {loaded && units?.length === 0 && <p>No units found.</p>}
      {loaded && units?.length !== 0 && (
        <DetailViewGroup>
          {units?.map((unit) => <UnitView key={unit.id} unit={unit} />)}
        </DetailViewGroup>
      )}
    </Page>
  );
}
