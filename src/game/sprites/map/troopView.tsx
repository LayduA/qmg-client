import {Troop, TROOP_POLYGONS} from "../../logic/map/troop";
import PolygonView, {Point} from "./polygonView";
import {useEffect, useState} from "react";
import {GameState} from "../../logic/state/gameState";

type TroopViewProps = {
    gameState: GameState
    troop: Troop
    scale: number
}

function TroopView({gameState, troop, scale}: TroopViewProps) {

    const [supplied, setSupplied] = useState(false);
    useEffect(() => {
        setSupplied(troop.supplied)
    }, [troop, troop.supplied])

    const anchor = gameState.board.getRegion(troop.regionName).props.anchor
    const troopPolygon: Point[] = TROOP_POLYGONS[troop.props.type].map((point) => [point[0] + anchor[0], point[1] + anchor[1]]);

    return <PolygonView
        points={troopPolygon}
        scale={scale}
        color={gameState.getNation(troop.props.nationName).props.color}
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