import { Magnitude } from "../../../../../models/units";

export function MagnitudeView({ magnitudes }: { magnitudes: Magnitude[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Abbr.</th>
          <th>Singular</th>
          <th>Plural</th>
          <th>Multiplier</th>
        </tr>
      </thead>
      <tbody>
        {magnitudes.map((m: Magnitude) => (
          <tr key={m.abbrev}>
            <td>{m.abbrev}</td>
            <td>{m.singular}</td>
            <td>{m.plural}</td>
            <td>{m.multiplier}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}