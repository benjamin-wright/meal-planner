export default function Home() {
  return (
    <main className="flex min-h-screen max-h-screen flex-col items-center justify-between p-4">
      <h1 className="text-5xl font-bold m-20">Welcome to <em className="text-gray-500">Meal Planner</em>!</h1>
      <ul className="flex flex-col items-stretch w-full overflow-y-auto">
        {[
          "planner",
          "recipies",
          "ingredients",
          "categories",
          "units",
        ].map((link) => (
          <li key={link} className="p-3 bg-slate-900 rounded-md mb-2 border-2">
            <a href={`/${link}`} className="block" >{link}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
