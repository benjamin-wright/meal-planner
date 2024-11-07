import { Category } from "../schemas/categories";
import { IDatabaseTransport } from "../types";

export async function migration2(transport: IDatabaseTransport) {
  const categories = transport.store<Category>("categories");

  await categories.add(new Category("medicine"));
  await categories.add(new Category("fruit"));
  await categories.add(new Category("vegetables"));
  await categories.add(new Category("bread"));
  await categories.add(new Category("bakery"));
  await categories.add(new Category("oils"));
  await categories.add(new Category("pet"));
  await categories.add(new Category("meat"));
  await categories.add(new Category("home"));
  await categories.add(new Category("cooked meats"));
  await categories.add(new Category("dairy"));
  await categories.add(new Category("snacks"));
  await categories.add(new Category("cupboard"));
  await categories.add(new Category("drinks"));
  await categories.add(new Category("frozen"));
}
