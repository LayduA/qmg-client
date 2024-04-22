import {Player} from "./player/player";
import {GameState} from "./state/gameState";
import {board} from "./map/board";
import {NATIONS} from "./player/nation";

export class Game {

    public readonly state: GameState;

    public constructor() {
        const player1 = new Player([NATIONS[0]], 'Adrien');

        this.state = new GameState([player1], board);
        //const update = UpdateArmy.build(region1, player1);

    }
}