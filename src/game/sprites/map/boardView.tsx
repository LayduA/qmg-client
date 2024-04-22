import backgroundImg from '../../../resources/images/board.jpg'
import {Box} from "@mui/material";
import {board, RegionName} from "../../logic/map/board";
import React from "react";
import RegionView from "./regionView";
import {Region} from "../../logic/map/region";

export type HighlightedRegion = {
    regionName: RegionName
    color?: string
}
function BoardView() {
    const [scale, setScale] = React.useState(1);
    const [highlightedRegions, setHighlightedRegions] = React.useState(new Array<HighlightedRegion>());

    const addHighlightedRegion = ({regionName, color}: HighlightedRegion): void => {
        if (!highlightedRegions.map((hr) => hr.regionName).includes(regionName)) {
            setHighlightedRegions(highlightedRegions.concat({regionName, color}));
        }
    }

    const removeHighlightedRegion = ({regionName, color}: HighlightedRegion): void => {
        setHighlightedRegions(highlightedRegions.filter((highlightedRegion) => highlightedRegion.regionName !== regionName));
    }

    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                width: `${Math.round(scale * 1608)}px`,
                height: `${Math.round(scale * 856)}px`,
                display: 'flex'
            }}
            onClick={() => setScale(scale + 0.1)}
        >
            <svg viewBox={`0 0 ${Math.round(scale * 1608)} ${Math.round(scale * 856)}`}
                 xmlns="http://www.w3.org/2000/svg">
                {board.map((region: Region) => {
                    return <RegionView
                        region={region}
                        scale={scale}
                        key={`regionview-${region.props.name}`}
                        highlightColor={highlightedRegions.reduce((acc: string|undefined, {regionName, color}) => {
                            if (!acc && regionName === region.props.name) {
                                acc = color;
                            }
                            return acc;
                        }, undefined)}
                        updateHighlightedRegions={[addHighlightedRegion, removeHighlightedRegion]}
                    />;
                })}
            </svg>
        </Box>
    );
}

export default BoardView;