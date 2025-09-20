import {
  BlockComponentPlayerInteractEvent,
  BlockComponentTickEvent,
  BlockCustomComponent,
  world,
  system,
} from "@minecraft/server";
import * as btch from "@minecraft/server";
import * as vec3 from "./vec3";

type CardinalDirection = "north" | "east" | "south" | "west";

const Sittable_ACTOR_TYPE = "pafa:pafa_seat2";

const onPlayerInteract = (arg1: BlockComponentPlayerInteractEvent, arg2: btch.CustomComponentParameters): void => {
  const { block, dimension, player } = arg1;
  const params = arg2.params as any;

  if (!player) return;

  const centro = block.center();

  if (vec3.distance(centro, player.location) > 2.5) {
    if (block.hasTag("outdoor_chair")) {
      player.onScreenDisplay.setActionBar({
        translate: "outdoor_chair.out_of_range",
      });
    }
    return;
  }
  const centralHeightY = centro.y;

  let height: number;
  try {
    height = centralHeightY + params.height;
  } catch {
    height = centralHeightY + 0.1;
  }

  const ChairLocationes = {
    x: centro.x,
    y: height,
    z: centro.z,
  };

  const ChairSittingPosition =
    dimension.getEntities({
      type: Sittable_ACTOR_TYPE,
      closest: 1,
      maxDistance: 0.5,
      location: ChairLocationes,
    }).length > 0;

  if (ChairSittingPosition) return;

  const blockDirectiones = block.permutation.getState("minecraft:cardinal_direction") as CardinalDirection;

  let SittableSpawnEvent: string;

  switch (blockDirectiones) {
    case "north":
      SittableSpawnEvent = `sittable_actor:r180`;
      break;
    case "east":
      SittableSpawnEvent = `sittable_actor:r270`;
      break;
    case "west":
      SittableSpawnEvent = `sittable_actor:r90`;
      break;
    default:
      SittableSpawnEvent = "minecraft:entity_spawned";
      break;
  }

  const sittable_anchorArea = dimension.spawnEntity(Sittable_ACTOR_TYPE, ChairLocationes, {
    spawnEvent: SittableSpawnEvent,
  });

  system.run(() => {
    const rideable = sittable_anchorArea.getComponent("rideable");
    if (!rideable) return;
    rideable.addRider(player);
  });
};

system.beforeEvents.startup.subscribe((InitEvent) => {
  InitEvent.blockComponentRegistry.registerCustomComponent("pafa_outdoor:ChairInteract", {
    onPlayerInteract,
  });
});
