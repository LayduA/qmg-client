import {Troop, TROOP_POLYGONS} from "../logic/troop";
import PolygonView, {Point} from "./map/polygonView";
import {useEffect, useState} from "react";
import {getRegion} from "../logic/map/board";

type TroopViewProps = {
    troop: Troop
    scale: number
}

function TroopView ({troop, scale}: TroopViewProps) {

    const [supplied, setSupplied] = useState(troop.isSupplied());
    useEffect(() => {
        setSupplied(troop.isSupplied())
        console.log(troop.regionName)
    }, [troop, troop.supplyChain, troop.supplyChain.length])

    const anchor = getRegion(troop.regionName).props.anchor
    const troopPolygon: Point[] = TROOP_POLYGONS[troop.props.type].map((point) => [point[0] + anchor[0], point[1] + anchor[1]]);

    return <PolygonView
        points={troopPolygon}
        scale={scale}
        color={troop.props.nation.color}
        borderStyle={{
            color: supplied ? 'green': 'black',
            width: 2.5
        }}
        textOnHover={troop.toString()}
        opacity={1}
        onClick={(e) => {
            console.log('pouet');
            e.stopPropagation();
        }}
    />
}

export default TroopView;