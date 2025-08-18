import { Collective } from "../../../../../models/units";

export function CountView({ collectives }: { collectives: Collective[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Singular</th>
          <th>Plural</th>
          {collectives.length > 1 && (
            <th>Multiplier</th>
          )}
        </tr>
      </thead>
      <tbody>
        {collectives.map((c: Collective, index: number) => (
          <tr key={index}>
            <td>{c.singular || "N/A"}</td>
            <td>{c.plural || "N/A"}</td>
            {collectives.length > 1 && (
              <td>{c.multiplier}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}