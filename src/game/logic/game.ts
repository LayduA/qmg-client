import {Player} from "./player/player";
import {GameState} from "./state/gameState";
import {board, validateBoard} from "./map/board";
import {Nation} from "./player/nation";

export class Game {

    public readonly state: GameState;

    public constructor() {
        Nation.initNations();
        const player1 = new Player([Nation.NATIONS[0]], 'Adrien');
        validateBoard(board);
        this.state = new GameState([player1], board);
        //const update = UpdateArmy.build(region1, player1);

    }
}