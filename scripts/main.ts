import { world, ItemComponentConsumeEvent, system } from "@minecraft/server";
import "./OutdoorChairComponent";
// import "./ChairConnect";
// import "./ConnectedChairs";
import "./Umbrella1";
import "./BookDocumentation";
import * as vec3 from "vec3";

world.afterEvents.playerSpawn.subscribe((event) => {
  const player = event.player;
  player.runCommand("give @s pafa_outdoor:book");
});
// import { PAFA_OutDoorChairComponent } from "./OutdoorChairComponent";
// world.beforeEvents.worldInitialize.subscribe((initEvent) => {
//   // // block
//   // initEvent.blockComponentRegistry.registerCustomComponent("starter:strawberry_grown", new GrownStrawberryCropComponent());
//   // initEvent.blockComponentRegistry.registerCustomComponent("starter:crop_grow", new CropGrowthComponent());

//   // // item
//   // initEvent.itemComponentRegistry.registerCustomComponent(
//   //   "starter:cause_hunger_on_eat",
//   //   new CauseHungerOnConsumeComponent()
//   // );
//   // initEvent.itemComponentRegistry.registerCustomComponent("starter:spray_water", {
//   //   onCompleteUse: sprayWater,
//   // });
//   // initEvent.itemComponentRegistry.registerCustomComponent("starter:gather_water", {
//   //   onUseOn: gatherWater,
//   // });
//   // initEvent.itemComponentRegistry.registerCustomComponent("starter:add_night_vision_on_consume", {
//   //   onConsume(arg: ItemComponentConsumeEvent) {
//   //     arg.source.addEffect("minecraft:night_vision", 600);
//   //   },
//   // });
//   initEvent.blockComponentRegistry.registerCustomComponent(
//     "pafa_outdoor:outdoor_chair",
//     new PAFA_OutDoorChairComponent()
//   );
// });
