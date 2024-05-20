import backgroundImg from '../../../resources/images/board.jpg'
import {Box} from "@mui/material";
import React from "react";
import RegionView from "./regionView";
import {Region, RegionName} from "../../logic/map/region";
import {GameState} from "../../logic/state/gameState";
import useArmies from "./useArmies";
import {AllTroops, HighlightedElement} from "../../../App";

function BoardView({gameState, allTroops, highlightedElements, clickedElement}:
                       { gameState: GameState, allTroops: AllTroops, highlightedElements: HighlightedElement[], clickedElement: Function}) {

    const [scale] = React.useState(1);

    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                width: `${Math.round(scale * 1608)}px`,
                height: `${Math.round(scale * 856)}px`,
            }}
        >

            {useArmies(allTroops, gameState, scale)}
            {gameState.board.regions.map((region: Region) => {
                return <RegionView
                    region={region}
                    scale={scale}
                    key={`regionview-${region.props.name}`}
                    highlightColor={
                        highlightedElements.some((reg) => reg.element === region.props.name) ? 'green' : undefined
                    }
                    onClick={(regionName: RegionName) => {
                        clickedElement(regionName)
                    }}
                />;
            })}


        </Box>
    );
}

export default BoardView;