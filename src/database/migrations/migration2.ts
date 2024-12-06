import { Category } from "../schemas/categories";
import { IDatabaseTransport } from "../types";

export async function migration2(transport: IDatabaseTransport) {
  const categories = transport.store<Category>("categories");
  await categories.add(new Category("medicine", 0));
  await categories.add(new Category("fruit", 1));
  await categories.add(new Category("vegetables", 2));
  await categories.add(new Category("bread", 3));
  await categories.add(new Category("bakery", 4));
  await categories.add(new Category("oils", 5));
  await categories.add(new Category("pet", 6));
  await categories.add(new Category("meat", 7));
  await categories.add(new Category("home", 8));
  await categories.add(new Category("cooked meats", 9));
  await categories.add(new Category("dairy", 10));
  await categories.add(new Category("snacks", 11));
  await categories.add(new Category("cupboard", 12));
  await categories.add(new Category("drinks", 13));
  await categories.add(new Category("frozen", 14));
}
