import {Troop, TROOP_POLYGONS} from "../../logic/armies/troop";
import PolygonView, {Point} from "./polygonView";
import {GameState} from "../../logic/state/gameState";
import {RegionName} from "../../logic/map/region";

type TroopViewProps = {
    gameState: GameState
    regionName: RegionName
    troops: Troop[]
    scale: number
}

function TroopsOnRegion({gameState, regionName, troops, scale}: TroopViewProps) {

    const region = gameState.board.getRegion(regionName);
    const anchor = region.props.anchor;

    return (
        <div>
            {troops.map((troop) => (
                <PolygonView
                    key={`troop-${regionName}-${troop.props.nationName}-${troop.props.type}`}
                    points={TROOP_POLYGONS[troop.props.type].map((point) => [point[0] + anchor[0], point[1] + anchor[1]])}
                    scale={scale}
                    color={gameState.getNation(troop.props.nationName).props.color}
                    borderStyle={{
                        color: region.suppliedBy.includes(troop.props.nationName) ? 'black' : 'darkred',
                        width: 1.5
                    }}
                    textOnHover={troop.toString()}
                    opacity={1}
                    centered={true}
                />
            ))}
        </div>
    )
}

export default TroopsOnRegion;