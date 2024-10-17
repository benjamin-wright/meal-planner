import { useEffect, useState } from "react";
import { Page } from "../components/page";
import { Database } from "../database";
import { Unit } from "../database/schemas";

interface UnitsProps {
  database: Database;
}

export function Units({ database }: UnitsProps) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [units, setUnits] = useState<Unit[] | null>(null);

  useEffect(() => {
    console.info("Loading units...");

    if (loaded) {
      return;
    }

    database.units.getAll().then((newUnits) => {
      setUnits(newUnits);
      setLoaded(true);
    });
  });

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
    <Page title="Units">
      {!loaded && <p>Loading...</p>}
      {loaded && units?.length === 0 && <p>No units found.</p>}
      {loaded && units?.length !== 0 && unitsTable()}
    </Page>
  );
}
