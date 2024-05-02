import {Box, Typography} from "@mui/material";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {GameState} from "../logic/state/gameState";
import PolygonView from "./map/polygonView";
import {TROOP_POLYGONS, TroopType} from "../logic/map/troop";
import {GermanyFlag} from "./flags";
import {Player} from "../logic/player/player";
import buildArmyImg from "../../resources/images/build_army.png";
import {NationName} from "../logic/state/nationState";
import {useState} from "react";
import {HighlightedRegion} from "./map/boardView";

function PlayerCard({gameState, playerName}: { gameState: GameState, playerName: string }) {

    const player = gameState.players.filter(p => p.name === playerName)[0];

    const [choosing, setChoosing] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {infoRibbon(gameState, player)}
        </Box>
    )
}

function infoRibbon(gameState: GameState, player: Player) {
    return (
        <Box
            key={`player-card-${player.name}`}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2%',
                alignItems: 'center'
            }}>
            <GermanyFlag sx={{width: 100, height: 100}}/>
            <Typography variant={'h2'}> {player.name} </Typography>

            {troopList(gameState, player, TroopType.ARMY)}
            {troopList(gameState, player, TroopType.NAVY)}
        </Box>
    )
}

function troopList(gameState: GameState, player: Player, type: TroopType) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateRows: '1fr 1fr 1fr',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridAutoFlow: 'column',
                gap: '5px',
                margin: '5px',
            }}
        >
            {[...Array(gameState.getNation(player.nations[0]).reserve[type])].map((e, i) =>
                <PolygonView points={TROOP_POLYGONS[type]} scale={1} relativePosition={true}
                             color={gameState.getNation(player.nations[0]).props.color}
                             borderStyle={{color: 'black', width: 2}} opacity={1}
                             key={`army-${player.name}-${i}`}/>
            )}
        </Box>
    );
}

export default PlayerCard;

export function Hand({gameState, nation, makePlayerChoose}: {
    gameState: GameState,
    nation: NationName,
    makePlayerChoose: Function
}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            {gameState.getNation(nation).hand.cards.map((c, index) => (
                <Box
                    key={`card-${nation}-${index}`}
                    sx={{
                        width: 250,
                        height: 340,
                        backgroundImage: `url(${buildArmyImg})`,
                    }}
                    onClick={() => {
                        if (c.getChoices) {
                            const choices = c.getChoices(gameState);
                            makePlayerChoose(choices, c.afterChoice);
                        }
                    }}
                >
                </Box>
            ))
            }
        </Box>
    );
}