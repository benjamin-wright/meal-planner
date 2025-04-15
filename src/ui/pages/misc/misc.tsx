import { useContext, useEffect, useState } from "react";
import { Page } from "../../components/page";
import { DBContext } from "../../providers/database";
import { Misc as model } from "../../../models/misc";
import { FloatingAddButton } from "../../components/floating-add-button";

export function Misc() {
  const { miscStore } = useContext(DBContext);
  const [misc, setMisc] = useState<model[]>([]);

  async function load() {
    if (!miscStore) return;

    const misc = await miscStore.getAll();
    setMisc(misc);
  }

  useEffect(() => {
    if (!miscStore) return;

    load();
  }, [miscStore]);

  return <Page title="Misc" returnTo="/data" showNav>
    <FloatingAddButton to="/misc/new" />
  </ Page>;
}
