import {Troop, TROOP_POLYGONS} from "../logic/troop";
import PolygonView, {Point} from "./map/polygonView";
import {useEffect, useState} from "react";
import {getRegion} from "../logic/map/board";
import {Nation} from "../logic/player/nation";

type TroopViewProps = {
    troop: Troop
    scale: number
    update: boolean
}

function TroopView ({troop, scale, update}: TroopViewProps) {

    const [supplied, setSupplied] = useState(false);
    useEffect(() => {
        setSupplied(troop.supplied)
    }, [troop, troop.supplied])

    const anchor = getRegion(troop.regionName).props.anchor
    const troopPolygon: Point[] = TROOP_POLYGONS[troop.props.type].map((point) => [point[0] + anchor[0], point[1] + anchor[1]]);

    return <PolygonView
        points={troopPolygon}
        scale={scale}
        color={Nation.getNation(troop.props.nationName).color}
        borderStyle={{
            color: supplied ? 'black' : 'darkred',
            width: 1.5
        }}
        textOnHover={troop.toString()}
        opacity={1}
        centered={true}
    />
}

export default TroopView;