import { airBlocks, DirectionalStates, oppositeDirection, itemDecreased, BlockTypeVariants } from "./Others";
// import {  } from '../util/utils';
import { BlockPermutation, Direction, EquipmentSlot } from "@minecraft/server";

export class DropBreakBlockPost {
  onPlayerDestroy(e) {
    const { destroyedBlockPermutation, block } = e;
    const direction = destroyedBlockPermutation.getState(DirectionalStates);
    const lampPostBlock = block[oppositeDirection[direction]]();
    lampPostBlock.setPermutation(lampPostBlock.permutation.withState(`drop:${direction}`, false));
  }
}
export class DropLampPostPlace {
  onUseOn(e) {
    const { block, source, itemStack, blockFace } = e;
    const setBlock = airBlocks.includes(block.typeId) ? block : blockFace === Direction.Up ? block.above() : undefined;
    if (!setBlock || !airBlocks.includes(setBlock.typeId)) return;
    const topBlock = setBlock.above();
    if (!airBlocks.includes(topBlock.typeId)) return;
    setBlock.setType("drop:lamp_post_base");
    topBlock.setType(itemStack.typeId);
    source.dimension.playSound("place.copper", setBlock.center());
    decrementItemInHand(source);
  }
}
export class DropLampPostUpdate {
  constructor() {
    this.allowedBlocks = ["minecraft:lantern", "minecraft:soul_lantern"];
    this.onPlace = this.onPlace.bind(this);
    this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
  }
  findTopAirBlock(block, maxHeightCheck = 32) {
    if (maxHeightCheck <= 0) return undefined;
    const blockAbove = block.above();
    if (airBlocks.includes(blockAbove.typeId)) return blockAbove;
    if (blockAbove.typeId !== block.typeId) return undefined;
    return this.findTopAirBlock(blockAbove, maxHeightCheck - 1);
  }
  update(block) {
    block.setPermutation(block.permutation.withState("drop:top", !block.above().hasTag("drop:lamp_post")));
  }
  updateNearestBlock(block) {
    if (block.below()?.hasTag("drop:lamp_post")) this.update(block.below());
  }
  onPlace(e) {
    this.update(e.block);
    this.updateNearestBlock(e.block);
  }
  onPlayerDestroy(e) {
    this.updateNearestBlock(e.block);
  }
  onPlayerInteract(e) {
    const { block, face, dimension, player } = e;
    if (face === Direction.Up || face === Direction.Down) return;
    const item = player.getComponent("equippable")?.getEquipment(EquipmentSlot.Mainhand);
    if (!item) return;
    const blockId = block.typeId;
    if (item.typeId === blockId) {
      const topAirBlock = this.findTopAirBlock(block);
      if (!topAirBlock) return;
      decrementItemInHand(player);
      topAirBlock.setType(blockId);
      const sound = getBlockTypeVariant(blockId);
      dimension.playSound(`break.${sound === "default" ? "" : sound + "_wood_"}hanging_sign`, block.center());
      return;
    }
    if (this.allowedBlocks.includes(item.typeId)) {
      const faceState = face.toLowerCase();
      const blockLight = block[faceState]();
      if (airBlocks.includes(blockLight.typeId)) {
        block.setPermutation(block.permutation.withState(`drop:${faceState}`, true));
        blockLight.setPermutation(
          BlockPermutation.resolve(item.typeId.replace("minecraft:", "drop:lamp_post_"), {
            [DirectionalStates]: faceState,
          })
        );
        block.dimension.playSound("block.lantern.place", block.center());
        decrementItemInHand(player);
      }
    }
  }
}
