import { world, BlockComponentTickEvent, system } from "@minecraft/server";
import { LEFT, RIGHT } from "./vec3";
import { BACKWARD, FORWARD } from "./vec3";

const XPosRight = {
  RIGHT: RIGHT,
};
const XPosLeft = {
  LEFT: LEFT,
};

const NegaXPosRight = {
  LEFT: LEFT,
};
const NegaXPosLeft = {
  RIGHT: RIGHT,
};

const ZPosRight = {
  FORWARD: BACKWARD,
};
const ZPosLeft = {
  BACKWARD: FORWARD,
};

const NegaZPosRight = {
  FORWARD: FORWARD,
};
const NegaZPosLeft = {
  BACKWARD: BACKWARD,
};

const ChairConnectSystem = (arg1: BlockComponentTickEvent): void => {
  const { block } = arg1;
  const directionLookOut = block.permutation.getState("minecraft:cardinal_direction");
  const directionOffSets = {
    north: {
      x: XPosRight,
      z: XPosRight,
      tag: "outdoor_chair_north",
    },
    south: {
      x: XPosLeft,
      z: XPosLeft,
      tag: "outdoor_chair_south",
    },
    west: {
      x: NegaXPosRight,
      z: NegaZPosRight,
      tag: "outdoor_chair_west",
    },
    east: {
      x: NegaXPosLeft,
      z: NegaZPosLeft,
      tag: "outdoor_chair_east",
    },
  };
  // const OffSetPosition = directionOffSets[directionLookOut];
};
