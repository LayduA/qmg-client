import backgroundImg from '../../../resources/images/board.jpg'
import {Box} from "@mui/material";
import {board, RegionName} from "../../logic/map/board";
import React from "react";
import RegionView from "./regionView";
import {Region} from "../../logic/map/region";

export type HighlightedRegion = {
    name: RegionName
    color?: string
}

function BoardView() {
    const [scale, setScale] = React.useState(1);
    const [highlightedRegions, setHighlightedRegions] = React.useState(new Array<HighlightedRegion>());

    const addHighlightedRegion = ({name, color}: HighlightedRegion): void => {
        if (!highlightedRegions.map((hr) => hr.name).includes(name)) {
            setHighlightedRegions(highlightedRegions.concat({name: name, color}));
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
            //onClick={() => setScale(scale + 0.1)}
        >
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
                    />;
            })}
        </Box>
    );
}

export default BoardView;