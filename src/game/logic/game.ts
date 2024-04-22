import {Player} from "./player/player";
import {GameState} from "./state/gameState";
import {board, getRegion, RegionName, validateBoard} from "./map/board";
import {NationName, NATIONS} from "./player/nation";
import {TroopType} from "./troop";

export class Game {

    public readonly state: GameState;

    public constructor() {
        const player1 = new Player([NATIONS[0]], 'Adrien');
        validateBoard(board);
        this.state = new GameState([player1], board);
        //const update = UpdateArmy.build(region1, player1);

    }
}