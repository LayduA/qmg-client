import backgroundImg from '../../../resources/images/board.jpg'
import {Box} from "@mui/material";
import React, {useState} from "react";
import RegionView from "./regionView";
import {Region, RegionName} from "../../logic/map/region";
import {Troop, TroopType} from "../../logic/map/troop";
import {NationName} from "../../logic/state/nationState";
import TeamPicker from "./teamPicker";
import {GameState} from "../../logic/state/gameState";
import {UpdateArmy} from "../../logic/state/update/updateArmy";
import useArmies from "./useArmies";

export type HighlightedRegion = {
    name: RegionName
    color?: string
}

function BoardView({gameState, updateGameState}: { gameState: GameState, updateGameState: Function }) {
    const [scale] = React.useState(1);
    const [highlightedRegions, setHighlightedRegions] = React.useState(new Array<HighlightedRegion>());
    const [playingNation, setPlayingNation] = useState(gameState.getNation(NationName.GERMANY));
    const addHighlightedRegion = ({name, color}: HighlightedRegion): void => {
        if (!highlightedRegions.map((hr) => hr.name).includes(name)) {
            setHighlightedRegions(highlightedRegions.concat({name: name, color}));
        }
    }

    const addTroop = (region: Region) => {
        if (!gameState.getNation(playingNation.props.name).army.some((troop: Troop) => troop.regionName === region.props.name)){
            updateGameState(UpdateArmy.build(region.props.name, playingNation.props.name, region.props.isOcean ? TroopType.NAVY : TroopType.ARMY));
        } else {
            updateGameState(UpdateArmy.destroy(region.props.name, playingNation.props.name, region.props.isOcean ? TroopType.NAVY : TroopType.ARMY));
        }
    }

    const removeHighlightedRegion = ({name, color}: HighlightedRegion): void => {
        setHighlightedRegions(highlightedRegions.filter((highlightedRegion) => highlightedRegion.name !== name));
    }

    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                width: `${Math.round(scale * 1608)}px`,
                height: `${Math.round(scale * 856)}px`,
            }}
        >

            <div className={'Prout'}>
                <TeamPicker setNation={setPlayingNation} gameState={gameState}/>
            </div>
            {gameState.board.regions.map((region: Region) => {
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
                />;
            })}
            {useArmies(gameState, scale)}

        </Box>
    );
}

export default BoardView;