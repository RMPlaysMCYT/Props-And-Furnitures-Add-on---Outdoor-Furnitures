import { world } from "@minecraft/server";
const UmbrellaConTag = "pafa_outdoor:umbrellaPillar";
class UmbrellaConTag_Manager {
  static updatePillarsAround(block) {
    let aboveBlock = undefined;
    try {
      aboveBlock = block.above(1);
    } catch {}
    let belowBlock = undefined;
    try {
      belowBlock = block.below(1);
    } catch {}
    const blocks = [aboveBlock, belowBlock, block];
    for (const pillar of blocks) {
      if (pillar != undefined && pillar.hasTag(UmbrellaConTag)) this.updatePillar(pillar);
    }
  }
  static updatePillar(block) {
    let aboveBlock = undefined;
    try {
      aboveBlock = block.above(1);
    } catch {}
    let belowBlock = undefined;
    try {
      belowBlock = block.below(1);
    } catch {}
    if (aboveBlock != undefined) {
      if (aboveBlock.hasTag(UmbrellaConTag)) {
        block.setPermutation(block.permutation.withState("pafa_outdoor:top_bit", true));
      } else block.setPermutation(block.permutation.withState("pafa_outdoor:top_bit", false));
    } else block.setPermutation(block.permutation.withState("pafa_outdoor:top_bit", false));
    if (belowBlock != undefined) {
      if (belowBlock.hasTag(UmbrellaConTag)) {
        block.setPermutation(block.permutation.withState("pafa_outdoor:bottom_bit", true));
      } else block.setPermutation(block.permutation.withState("pafa_outdoor:bottom_bit", false));
    } else block.setPermutation(block.permutation.withState("pafa_outdoor:bottom_bit", false));
  }
}
world.afterEvents.playerBreakBlock.subscribe((data) => {
  UmbrellaConTag_Manager.updatePillarsAround(data.block);
});
world.afterEvents.playerPlaceBlock.subscribe((data) => {
  UmbrellaConTag_Manager.updatePillarsAround(data.block);
});
