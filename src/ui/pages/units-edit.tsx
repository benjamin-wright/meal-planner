import { useEffect, useState } from "react";
import { Page } from "../components/page";
import { Database } from "../../database";
import { Unit } from "../../database/schemas";
import { Box, Card, TextField } from "@mui/material";
import { LoaderFunction, useLoaderData, useParams } from "react-router-dom";

export interface UnitsEditLoaderArgs {
  database: Database;
}

export interface UnitsEditLoaderResult {
  object?: Unit;
  units: Unit[];
}

export function unitsEditLoader({
  database,
}: UnitsEditLoaderArgs): LoaderFunction<UnitsEditLoaderResult> {
  return async ({ params }) => {
    const units = await database.units.getAll();

    if (params.unit) {
      const object = await database.units.get(Number.parseInt(params.unit, 10));
      return { object, units };
    }

    return { units };
  };
}

interface UnitsEditProps {
  database: Database;
}

export function UnitsEdit({ database }: UnitsEditProps) {
  const [loaded, setLoaded] = useState(false);
  const [object, setObject] = useState<Unit>({ name: "", magnitudes: [] });
  const data = useLoaderData() as UnitsEditLoaderResult;

  useEffect(() => {});

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
