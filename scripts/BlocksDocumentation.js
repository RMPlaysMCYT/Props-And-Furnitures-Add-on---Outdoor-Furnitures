import { OutDoorBookInit } from "./BookDocumentation";
import { ActionFormData } from "@minecraft/server-ui";

export function BlocksDocumentation() {
  const form = new ActionFormData();
  form.title("Outdoor Expansion Blocks Documentation");
  form.body(
    "These are the blocks which is available on this pack \n1. Patio Sofas - This sofas gives you comfort and coziness and it comes to 3 designs based on your likes \n \n2.Bench - This is great for outdoors especially on your own homes to your Minecraft World \n \n3. Chairs - These are great for you to sit and relax on your own homes \n \n4. Tables - These are great for you to work and study on your own homes \n\n5. Sleeping Beds- Great for outdoor relaxation"
  );
  form.button("Back");
  form.show(player).then((response) => {
    if (response.canceled) return;
    if (response.selection === 0) {
      OutDoorBookInit(player);
    }
  });
}
