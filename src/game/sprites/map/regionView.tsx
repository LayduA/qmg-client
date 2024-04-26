import {Region} from "../../logic/map/region";
import PolygonView from "./polygonView";
import React from "react";
import {HighlightedRegion} from "./boardView";

type RegionViewProps = {
    region: Region
    scale: number
    highlightColor?: string
    updateHighlightedRegions: [addHighlightedRegion: (region: HighlightedRegion) => void, removeHighlightedRegion: (region: HighlightedRegion) => void]
    addTroop: Function
}

function RegionView({region, scale, highlightColor, addTroop}: RegionViewProps) {

    return (
        <div>
            <PolygonView
                points={region.props.points}
                scale={scale}
                color={highlightColor ?? region.props.color}
                opacity={highlightColor ? 0.5 : 0}
                textOnHover={region.props.name}
                onClick={(event) => {
                    addTroop(region)
                }}/>
        </div>
    );
}

export default RegionView;
