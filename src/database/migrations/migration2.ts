import { Category } from "../schemas/categories";
import { IDatabaseTransport } from "../types";

export async function migration2(transport: IDatabaseTransport) {
  const categories = transport.store<Category>("categories");

  await categories.add(new Category("medicine", 1));
  await categories.add(new Category("fruit", 2));
  await categories.add(new Category("vegetables", 3));
  await categories.add(new Category("bread", 4));
  await categories.add(new Category("bakery", 5));
  await categories.add(new Category("oils", 6));
  await categories.add(new Category("pet", 7));
  await categories.add(new Category("meat", 8));
  await categories.add(new Category("home", 9));
  await categories.add(new Category("cooked meats", 10));
  await categories.add(new Category("dairy", 11));
  await categories.add(new Category("snacks", 12));
  await categories.add(new Category("cupboard", 13));
  await categories.add(new Category("drinks", 14));
  await categories.add(new Category("frozen", 15));
}
