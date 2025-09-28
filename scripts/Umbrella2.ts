// import { world, Block } from "@minecraft/server";
// const pillarTag: string = "pafa_outdoor:umbrellaPillar";

// class pillar_Manager {
//   static updatePillarsAround(block: Block) {
//     let aboveBlock: Block = undefined;
//     try {
//       aboveBlock = block.above(1);
//     } catch {}
//     let belowBlock: Block = undefined;
//     try {
//       belowBlock = block.below(1);
//     } catch {}
//     const blocks: Block[] = [aboveBlock, belowBlock, block];
//     for (const pillar of blocks) {
//       if (pillar != undefined && pillar.hasTag(pillarTag)) this.updatePillar(pillar);
//     }
//   }
//   static updatePillar(block: Block) {
//     let aboveBlock: Block = undefined;
//     try {
//       aboveBlock = block.above(1);
//     } catch {}
//     let belowBlock: Block = undefined;
//     try {
//       belowBlock = block.below(1);
//     } catch {}
//     if (aboveBlock != undefined) {
//       if (aboveBlock.hasTag(pillarTag)) {
//         block.setPermutation(block.permutation.withState("pafa_outdoor:top_bit", true));
//       } else block.setPermutation(block.permutation.withState("pafa_outdoor:top_bit", false));
//     } else block.setPermutation(block.permutation.withState("pafa_outdoor:top_bit", false));
//     if (belowBlock != undefined) {
//       if (belowBlock.hasTag(pillarTag)) {
//         block.setPermutation(block.permutation.withState("pafa_outdoor:bottom_bit", true));
//       } else block.setPermutation(block.permutation.withState("pafa_outdoor:bottom_bit", false));
//     } else block.setPermutation(block.permutation.withState("pafa_outdoor:bottom_bit", false));
//   }
// }

// world.afterEvents.playerBreakBlock.subscribe((data) => {
//   pillar_Manager.updatePillarsAround(data.block);
// });
// world.afterEvents.playerPlaceBlock.subscribe((data) => {
//   pillar_Manager.updatePillarsAround(data.block);
// });
