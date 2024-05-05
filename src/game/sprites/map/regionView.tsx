import {Region} from "../../logic/map/region";
import PolygonView from "./polygonView";
import React from "react";

type RegionViewProps = {
    region: Region
    scale: number
    highlightColor?: string
    onClick: Function
}

function RegionView({region, scale, highlightColor, onClick}: RegionViewProps) {

    return (
        <div>
            <PolygonView
                points={region.props.points}
                scale={scale}
                color={highlightColor ?? region.props.color}
                opacity={highlightColor ? 0.5 : 0}
                textOnHover={region.props.name}
                onClick={(event) => {
                    onClick(region.props.name)
                }}/>
        </div>
    );
}

export default RegionView;
