import { BlockComponentPlayerInteractEvent, BlockComponentTickEvent, BlockCustomComponent } from "@minecraft/server";
import * as btch from "@minecraft/server";
import * as vec3 from "vec3";

type CardinalDirection = "north" | "east" | "south" | "west";

const SittableMob = "pafa_seat";

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
    height = centralHeightY + 1;
  }

  const ChairLocationes = {
    x: centro.x,
    y: height,
    z: centro.z,
  };

  const ChairSittingPosition = dimension.getEntities({
    type: Sittable_ACTOR_TYPE,
    closest: 2,
  });
};
