import {GameState} from "../../logic/state/gameState";
import {SupplyLink, Troop} from "../../logic/armies/troop";
import React, {useMemo} from "react";
import TroopsOnRegion from "./troopsOnRegion";
import PolygonView from "./polygonView";
import {RegionName} from "../../logic/map/region";
import {AllTroops} from "../../../App";

function useArmies(allTroops: AllTroops, gameState: GameState, scale: number) {
    return useMemo(() => {
        const troops = gameState.board.regions.filter(region => region.occupiers.length > 0).map(region => {
            return (
                <TroopsOnRegion
                    key={`troops-${region.props.name}`}
                    gameState={gameState}
                    regionName={region.props.name}
                    troops={region.occupiers}
                    scale={scale}
                />
            );
        });

        const supplyLinks = (allTroops.allEdges.map(link => {
                return <PolygonView
                    key={`supply-line${JSON.stringify(link)}`}
                    points={link.nodes.map(regionName => gameState.board.getRegion(regionName).props.anchor)}
                    scale={scale}
                    opacity={1}
                    lineOnly
                    borderStyle={{
                        color: link.isAnchor ? 'yellow' : 'green',
                        width: 6
                    }}
                />
            })
        )

        return (
            <div>
                {supplyLinks}
                {troops}
            </div>
        )
    }, [gameState, scale]);
}

export default useArmies;