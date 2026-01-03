import { OutDoorBookInit } from "./BookDocumentation";
import { ActionFormData } from "@minecraft/server-ui";

export function RecipesDocumentation() {
  const form = new ActionFormData();
  form.title("Outdoor Expansion Recipes Documentation");
  form.body(
    "The Recipes are can be done on a stone cutter\n\nHow?\n\n1. Create a crate recipe on a crafting table\n2.Use the pafa:crate in the crafting table\n3. Create a recipe on a stone cutter\n4. Place a block and enjoy it"
  );
  form.button("Back");
  form.show(player).then((response) => {
    if (response.canceled) return;
    if (response.selection === 0) {
      OutDoorBookInit(player);
    }
  });
}
