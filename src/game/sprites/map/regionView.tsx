import {Region} from "../../logic/map/region";
import PolygonView from "./polygonView";
import React from "react";
import {HighlightedRegion} from "./boardView";

type RegionViewProps = {
    region: Region
    scale: number
    highlightColor?: string
    updateHighlightedRegions: [addHighlightedRegion: (region: HighlightedRegion) => void, removeHighlightedRegion: (region: HighlightedRegion) => void]
    addTroop: any
    setUpdate: any
}

function RegionView({region, scale, highlightColor, setUpdate, addTroop}: RegionViewProps) {

    return (
        <div>
            <PolygonView
                points={region.props.points}
                scale={scale}
                color={highlightColor ?? region.props.color}
                opacity={0.4 ?? highlightColor ? 0.5 : 0}
                textOnHover={region.props.name}
                onClick={(event) => {
                    addTroop(region)
                    setUpdate(true);
                }}/>
        </div>
    );
}

export default RegionView;
