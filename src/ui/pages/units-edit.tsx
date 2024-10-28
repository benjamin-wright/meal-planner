import { useEffect, useState } from "react";
import { Page } from "../components/page";
import { Database } from "../../database";
import { Unit } from "../../database/schemas";
import { Box, Card, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

interface UnitsEditProps {
  database: Database;
}

export function UnitsEdit({ database }: UnitsEditProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [object, setObject] = useState<Unit>({ name: "", magnitudes: [] });
  const params = useParams<{ unit: string }>();

  useEffect(() => {
    if (loading || loaded) {
      return;
    }

    if (!params.unit) {
      setLoaded(true);
      setObject({ name: "", magnitudes: [] });
      return;
    }

    const unit = Number.parseInt(params.unit, 10);
    if (isNaN(unit)) {
      setLoaded(true);
      setObject({ name: "", magnitudes: [] });
      return;
    }

    setLoading(true);
    database.units.get(unit).then((loadedUnit) => {
      setObject(loadedUnit);
      setLoaded(true);
      setLoading(false);
    });
  }, [loading, loaded, database.units, params.unit]);

  return (
    <Page title={object ? `Editing ${object.name}` : "New Unit"}>
      {!loaded && <p>Loading...</p>}
      {loaded && (
        <Card>
          <Box component="form" margin="0.5em">
            <TextField
              id="variant"
              variant="outlined"
              label="name"
              value={object.name}
              onChange={(e) =>
                setObject({ ...object, name: e.target.value.toLowerCase() })
              }
            />
          </Box>
        </Card>
      )}
    </Page>
  );
}