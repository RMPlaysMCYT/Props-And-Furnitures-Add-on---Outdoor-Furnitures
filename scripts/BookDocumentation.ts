import { system, world } from "@minecraft/server";
import { ActionFormData, FormResponse, ActionFormResponse } from "@minecraft/server-ui";

function OutDoorBookInit() {
  const form = new ActionFormData();
  form.title("OutDoor Book");
  form.button("Back");
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
