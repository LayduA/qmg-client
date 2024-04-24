import backgroundImg from '../../../resources/images/board.jpg'
import {Box} from "@mui/material";
import {board, getRegion, RegionName} from "../../logic/map/board";
import React, {useEffect, useState} from "react";
import RegionView from "./regionView";
import {Region} from "../../logic/map/region";
import {SupplyLink, Troop, TroopType} from "../../logic/troop";
import {Nation, NationName} from "../../logic/player/nation";
import TroopView from "../troopView";
import TeamPicker from "./teamPicker";
import PolygonView from "./polygonView";

export type HighlightedRegion = {
    name: RegionName
    color?: string
}

function BoardView() {
    const [scale] = React.useState(1);
    const [highlightedRegions, setHighlightedRegions] = React.useState(new Array<HighlightedRegion>());
    const [nation, setNation] = useState(Nation.getNation(NationName.GERMANY));
    const [troops, setTroops] = React.useState(new Array<Troop>());
    const [supplyLines, setSupplyLines] = React.useState(new Array<SupplyLink[]>());
    const addHighlightedRegion = ({name, color}: HighlightedRegion): void => {
        if (!highlightedRegions.map((hr) => hr.name).includes(name)) {
            setHighlightedRegions(highlightedRegions.concat({name: name, color}));
        }
    }

    const addTroop = (region: Region) => {
        if (!nation.army.some((troop: Troop) => troop.regionName === region.props.name)) {
            nation.addTroop(region.props.isOcean ? TroopType.NAVY : TroopType.ARMY, region.props.name);
        } else {
            nation.removeTroop(region.props.name);
        }
        setTroops(Nation.NATIONS.map((nation) => nation.army).flat())
    }

    const removeHighlightedRegion = ({name, color}: HighlightedRegion): void => {
        setHighlightedRegions(highlightedRegions.filter((highlightedRegion) => highlightedRegion.name !== name));
    }

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (update) {
            const team = nation.getTeam();

            let iterating = true;

            for (const alliedNation of team) {
                for (const troop of alliedNation.army) {
                    troop.supplied = false;
                }
            }
            let previousState: RegionName[][][] = [];
            const allEdges: SupplyLink[][] = new Array<SupplyLink[]>(team.length);
            const state: RegionName[][][] = new Array<RegionName[][]>(team.length);
            while (iterating) {

                for (let i = 0; i < team.length; i++) {
                    const edges: SupplyLink[] = [];
                    const trees: Troop[][] = []
                    for (const troop of team[i].army.filter((troop: Troop) => troop.isOnSupplyZone())) {
                        trees.push(troop.tree(troops, [], edges));
                    }
                    state[i] = trees.map(tree => tree.map(troop => troop.regionName));
                    allEdges[i] = edges
                }
                iterating = JSON.stringify(previousState) !== JSON.stringify(state);
                previousState = state;
            }
            setSupplyLines(allEdges);
            setUpdate(false);
        }
    }, [nation, troops, update]);


    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                width: `${Math.round(scale * 1608)}px`,
                height: `${Math.round(scale * 856)}px`,
            }}
            //onClick={() => setScale(scale + 0.1)}
        >
            {supplyLines.map(supplyLine => {
                return supplyLine.map(link => {
                    return <PolygonView
                        key={`supply-line${JSON.stringify(supplyLine + JSON.stringify(link))}`}
                        points={link.nodes.map(regionName => getRegion(regionName).props.anchor)}
                        scale={scale}
                        opacity={1}
                        lineOnly
                        borderStyle={{
                            color: link.isAnchor ? 'yellow' : 'green',
                            width: 2.5
                        }}
                    />
                })
            })}
            <div className={'Prout'}>
                <TeamPicker setNation={setNation}/>
            </div>
            {board.map((region: Region) => {
                return <RegionView
                    region={region}
                    scale={scale}
                    key={`regionview-${region.props.name}`}
                    highlightColor={
                        highlightedRegions
                            .find((highlightedRegion) => highlightedRegion.name === region.props.name)?.color ??
                        undefined
                    }
                    updateHighlightedRegions={[addHighlightedRegion, removeHighlightedRegion]}
                    addTroop={addTroop}
                    setUpdate={setUpdate}
                />;
            })}
            {troops.map((troop) => {
                return (
                    <TroopView
                        key={`troop-${troop.props.type}-${troop.regionName}-${troop.props.nationName}`}
                        troop={troop}
                        scale={scale}
                        update={update}
                    />
                );
            })}

        </Box>
    );
}

function pathify(prepath: RegionName[]) {

}

export default BoardView;