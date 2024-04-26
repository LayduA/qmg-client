import {GameState} from "../../logic/state/gameState";
import {SupplyLink, Troop} from "../../logic/map/troop";
import React, {useMemo} from "react";
import TroopView from "./troopView";
import PolygonView from "./polygonView";
import {RegionName} from "../../logic/map/region";

function useArmies(gameState: GameState, scale: number) {
    return useMemo(() => {
        let iterating = true;

        for (const nation of gameState.nations) {
            for (const troop of nation.army) {
                troop.supplied = false;
            }
        }
        let previousState: RegionName[][][] = [];
        const allEdges: SupplyLink[][] = new Array<SupplyLink[]>(gameState.nations.length);
        const state: RegionName[][][] = new Array<RegionName[][]>(gameState.nations.length);
        while (iterating) {

            for (let i = 0; i < gameState.nations.length; i++) {
                const edges: SupplyLink[] = [];
                const trees: Troop[][] = []
                for (const troop of gameState.nations[i].army.filter((troop: Troop) => troop.isOnSupplyZone(gameState))) {
                    trees.push(troop.tree(gameState, [], edges));
                }
                state[i] = trees.map(tree => tree.map(troop => troop.regionName));
                allEdges[i] = edges
            }
            iterating = JSON.stringify(previousState) !== JSON.stringify(state);
            previousState = state;
        }

        const troops = gameState.getAllTroops().map((troop) => {
            return (
                <TroopView
                    gameState={gameState}
                    key={`troop-${troop.props.type}-${troop.regionName}-${troop.props.nationName}`}
                    troop={troop}
                    scale={scale}
                />
            );
        });

        const supplyLinks = allEdges.map(supplyLine => {
            return supplyLine.map(link => {
                return <PolygonView
                    key={`supply-line${JSON.stringify(supplyLine + JSON.stringify(link))}`}
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
        })

        return (
            <div>
                {supplyLinks}
                {troops}
            </div>
        )
    }, [gameState, scale]);
}

export default useArmies;