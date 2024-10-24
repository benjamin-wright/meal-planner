import { useEffect, useState } from "react";
import { Page } from "../components/page";
import { Database } from "../../database";
import { Unit } from "../../database/schemas";
import { Editable } from "../components/editable";

interface UnitsProps {
  database: Database;
}

export function Units({ database }: UnitsProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [units, setUnits] = useState<Unit[] | null>(null);

  useEffect(() => {
    if (loading || loaded) {
      return;
    }

    setLoading(true);

    database.units.getAll().then((newUnits) => {
      setUnits(newUnits);
      setLoaded(true);
      setLoading(false);
    });
  }, [loading, loaded, database.units]);

  return (
    <Page title="Units">
      {!loaded && <p>Loading...</p>}
      {loaded && units?.length === 0 && <p>No units found.</p>}
      {loaded &&
        units?.length !== 0 &&
        units?.map((unit) => (
          <Editable key={unit.id} title={unit.name}>
            <span>{unit.magnitudes.map((m) => m.abbrev).join(", ")}</span>
          </Editable>
        ))}
    </Page>
  );
}
