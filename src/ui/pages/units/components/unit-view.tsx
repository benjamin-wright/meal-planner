import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DetailView } from "../../../components/detail-view";
import { Magnitude, Unit, UnitType } from "../../../../models/units";
import { Card, Typography } from "@mui/material";

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

interface UnitViewProps {
  unit: Unit;
  onEdit: (unit: Unit) => void;
  onDelete: (unit: Unit) => void;
}

export function UnitView({ unit, onEdit, onDelete }: UnitViewProps) {
  return (
    <DetailView
      title={unit.name}
      onEdit={() => onEdit(unit)}
      onDelete={() => onDelete(unit)}
    >
      {unit.type !== UnitType.Count && (
        <Paper>
          <Typography sx={{ fontSize: "0.9em", padding: "0.5em 1em", marginBottom: "1em" }}>
            Base: {unit.base}
          </Typography>
        </Paper>
      )}
      {unit.type !== UnitType.Count && <MagnitudeView magnitudes={unit.magnitudes} />}
      {unit.type === UnitType.Count && <CountView singular={unit.singular} plural={unit.plural} />}
    </DetailView>
  );
}
