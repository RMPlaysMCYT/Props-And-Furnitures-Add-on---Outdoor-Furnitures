import { system, world, Player } from "@minecraft/server";
import { ActionFormData, FormResponse, ActionFormResponse } from "@minecraft/server-ui";
import { BlocksDocumentation } from "./BlocksDocumentation";
import { RecipesDocumentation } from "./RecipesDocumentation";
import { AboutDocumentation } from "./AboutDocuemnetation";
export function OutDoorBookInit() {
  const form = new ActionFormData();
  form.title("Props and Furnitures Add-On - Outdoor Expansion");
  form.body(
    "Thank you for downloading and activated this expansion pack, however this add-on requires BASE Packs of Props and Furnitures Add-On \nFeatures:\n - Add Over 30 Furnitures with different styles \n-Survival Friendly\n\nThis Expansion is Open-Source However the BASE Add-On is Closed-Source, therefore it is not possible to use the BASE Add-On with this expansion pack."
  );
  form.button("Blocks");
  form.button("Recipes");
  form.button("About");
  form.button("Back");
  form.show(player).then((response) => {
    if (response.canceled) return;
    switch (response.selection) {
      case 0:
        BlocksDocumentation();
        break;
      case 1:
        RecipesDocumentation();
        break;
      case 2:
        AboutDocumentation();
        break;
      case 3:
        break;
    }
  });
}

world.beforeEvents.itemUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  if (item.typeId === "pafa_outdoor:book") {
    system.run(() => {
      OutDoorBookInit();
    });
  }
});
