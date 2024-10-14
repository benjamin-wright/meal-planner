import { useEffect } from "react";
import { Page } from "../components/page";
import { Database } from "../database";

interface UnitsProps {
  database: Database;
}

export function Units({ database }: UnitsProps) {
  useEffect(() => {
    database.units.getAll().then((units) => {
      console.log(units);
    });
  });

  return (
    <Page title="Units">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Abbreviation</th>
          </tr>
        </thead>
        <tbody>
          {/* {units.map((unit) => (
            <tr key={unit.id}>
              <td>{unit.name}</td>
              <td>{unit.abbreviation}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </Page>
  );
}
