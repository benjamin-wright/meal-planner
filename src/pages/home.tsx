import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="window">
      <section className="card title">
        <h1>Meal Planner</h1>
      </section>
      <section className="flex">
        {["planner", "recipies", "ingredients", "categories", "units"].map(
          (name) => (
            <Link key={name} to={`/${name}`} className="button">
              {name}
            </Link>
          )
        )}
      </section>
    </div>
  );
}
