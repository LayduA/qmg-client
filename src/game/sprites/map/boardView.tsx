import backgroundImg from '../../../resources/images/board.jpg'
import {Box} from "@mui/material";
import {board, RegionName} from "../../logic/map/board";
import React, {useEffect, useState} from "react";
import RegionView from "./regionView";
import {Region} from "../../logic/map/region";
import {Troop, TroopType} from "../../logic/troop";
import {Nation, NationName} from "../../logic/player/nation";
import TroopView from "../troopView";
import TeamPicker from "./teamPicker";

export type HighlightedRegion = {
    name: RegionName
    color?: string
}

function BoardView() {
    const [scale] = React.useState(1);
    const [highlightedRegions, setHighlightedRegions] = React.useState(new Array<HighlightedRegion>());

    const [nation, setNation] = useState(Nation.NATIONS[NationName.GERMANY]);
    const [troops, setTroops] = React.useState(new Array<Troop>());
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
                let state = '';
                let previousState = '';
                let iterating = true;

                for (const alliedNation of team) {
                    for (const troop of alliedNation.army) {
                        troop.supplied = false;
                    }
                }

                while (iterating) {
                    state = ''
                    for (const alliedNation of team) {

                        const trees = []
                        for (const troop of alliedNation.army.filter((troop: Troop) => troop.isOnSupplyZone())) {
                            trees.push(troop.tree(troops, []));
                        }
                        state = state + alliedNation.name + ": " + JSON.stringify(trees) + "\n";
                    }
                    iterating = previousState !== state;
                    previousState = state;
                }

                setUpdate(false);
            }
        }

        ,
        [nation, troops, update]
    )
    ;


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

export default BoardView;