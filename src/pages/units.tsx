import { useEffect, useState } from "react";
import { Page } from "../components/page";
import { Database } from "../database";
import { Unit } from "../database/schemas";
import Scale from "@mui/icons-material/Scale";

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

  function unitsTable() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {units?.map((unit) => (
            <tr key={unit.id}>
              <td>{unit.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <Page title="Units" icon={<Scale />}>
      {!loaded && <p>Loading...</p>}
      {loaded && units?.length === 0 && <p>No units found.</p>}
      {loaded && units?.length !== 0 && unitsTable()}
    </Page>
  );
}
