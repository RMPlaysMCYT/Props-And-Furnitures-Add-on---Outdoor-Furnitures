import { world } from "@minecraft/server";

var PafaSofaSystem = class {
    onTick(event) {
        const { block } = event;
        const directionLook = block.permutation.getState('minecraft:cardinal_direction');
        const directionOffsetsPosition = {
            north: {
                right: { x: 1, y: 0, z: 0 },
                left: { x: -1, y: 0, z: 0 },
                tag: "pafa:SofaNorth"
            },
            south: {
                right: { x: -1, y: 0, z: 0 },
                left: { x: 1, y: 0, z: 0 },
                tag: "pafa:SofaSouth"
            },
            west: {
                right: { x: 0, y: 0, z: -1 },
                left: { x: 0, y: 0, z: 1 },
                tag: "pafa:SofaWest"
            },
            east: {
                right: { x: 0, y: 0, z: 1 },
                left: { x: 0, y: 0, z: -1 },
                tag: "pafa:SofaEast"
            }
        };
        const OffsetPosition = directionOffsetsPosition[directionLook];
        if (OffsetPosition) {
            const PafaSofaRight = block.offset(OffsetPosition.right);
            const PafaSofaLeft = block.offset(OffsetPosition.left);
            block.setPermutation(
                block.permutation.withState(
                    "pafa:sofa_left",
                    PafaSofaLeft.hasTag(OffsetPosition.tag)
                )
            )
            block.setPermutation(
                block.permutation.withState(
                    "pafa:sofa_right",PafaSofaRight.hasTag(OffsetPosition.tag)
                )
            )
        }
    };
}

world.beforeEvents.worldInitialize.subscribe(
    (
        event
    ) => {
        event.blockComponentRegistry.registerCustomComponent(
            "pafa:sofa_connections",
            new PafaSofaSystem()
        );
    }
);