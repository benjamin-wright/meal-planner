import SlideOutLink from "../components/slide-out-link";
import {
  faCalendar,
  faUtensils,
  faCarrot,
  faTags,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";

export function Home() {
  return (
    <div className="window">
      <section className="title">
        <h1>Meal Planner</h1>
      </section>
      <section className="flex">
        {[
          { name: "planner", icon: faCalendar },
          { name: "recipies", icon: faUtensils },
          { name: "ingredients", icon: faCarrot },
          { name: "categories", icon: faTags },
          { name: "units", icon: faBalanceScale },
        ].map((category, index) => (
          <SlideOutLink
            key={category.name}
            to={`/${category.name}`}
            icon={category.icon}
            content={category.name}
            delay={index * 100 + 200}
          />
        ))}
      </section>
    </div>
  );
}
