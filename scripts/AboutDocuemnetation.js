import { OutDoorBookInit } from "./BookDocumentation";
import { ActionFormData } from "@minecraft/server-ui";

export function AboutDocumentation() {
  const form = new ActionFormData();
  form.title("About");
  form.body("PROPS AND FURNITURES ADD-ON OUTDOOR EXPANSION \nCreated By: RMPlaysMC YT\nLicense: APACHE LICENSE 2.0");
  form.button("Back");
  form.show(player).then((response) => {
    if (response.canceled) return;
    if (response.selection === 0) {
      OutDoorBookInit(player);
    }
  });
}
