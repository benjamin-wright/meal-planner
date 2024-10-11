import { Header } from "../components";

type Unit = {
  id: number;
  name: string;
  abbreviation: string;
}

const units: Unit[] = [
  { id: 1, name: "Cup", abbreviation: "c" },
  { id: 2, name: "Fluid Ounce", abbreviation: "fl oz" },
]

export function Units() {
  return (
    <div className="window">
      <Header title="Units" home />
      <section>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Abbreviation</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.id}>
                <td>{unit.name}</td>
                <td>{unit.abbreviation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
