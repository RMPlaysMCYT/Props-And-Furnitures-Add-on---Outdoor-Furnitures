import { world } from "@minecraft/server";

var PafaSofaSystem = class {
  /**
   * Called every tick to update the block's state.
   * This function is responsible for updating the state of the block to
   * reflect the state of the connected chairs.
   * @param {BlockComponentTickEvent} event - The event that triggered this function
   * @returns {void}
   */
  onTick(event) {
    const { block } = event;
    const directionLook = block.permutation.getState("minecraft:cardinal_direction");
    const directionOffsetsPosition = {
      north: {
        right: { x: 1, y: 0, z: 0 },
        left: { x: -1, y: 0, z: 0 },
        tag: "pafa:SofaNorth",
      },
      south: {
        right: { x: -1, y: 0, z: 0 },
        left: { x: 1, y: 0, z: 0 },
        tag: "pafa:SofaSouth",
      },
      west: {
        right: { x: 0, y: 0, z: -1 },
        left: { x: 0, y: 0, z: 1 },
        tag: "pafa:SofaWest",
      },
      east: {
        right: { x: 0, y: 0, z: 1 },
        left: { x: 0, y: 0, z: -1 },
        tag: "pafa:SofaEast",
      },
    };
    const OffsetPosition = directionOffsetsPosition[directionLook];
    if (OffsetPosition) {
      const PafaSofaRight = block.offset(OffsetPosition.right);
      const PafaSofaLeft = block.offset(OffsetPosition.left);
      block.setPermutation(block.permutation.withState("pafa:sofa_left", PafaSofaLeft.hasTag(OffsetPosition.tag)));
      block.setPermutation(block.permutation.withState("pafa:sofa_right", PafaSofaRight.hasTag(OffsetPosition.tag)));
    }
  }
};

world.beforeEvents.worldInitialize.subscribe((event) => {
  event.blockComponentRegistry.registerCustomComponent("pafa:sofa_connections", new PafaSofaSystem());
});
