import {Player} from "./player/player";
import {GameState} from "./state/gameState";
import {NationName, NationState, Team} from "./state/nationState";

export class Game {

    public initialState: GameState;

    public constructor() {
        const nations: NationState[] = [
            new NationState({name: NationName.GERMANY, color: 'grey', team: Team.AXIS}, []),
            new NationState({name: NationName.UK, color: 'goldenrod', team: Team.ALLIES}, []),
            new NationState({name: NationName.JAPAN, color: 'ivory', team: Team.AXIS}, []),
            new NationState({name: NationName.USSR, color: 'firebrick', team: Team.ALLIES}, []),
            new NationState({name: NationName.ITALY, color: 'rebeccapurple', team: Team.AXIS}, []),
            new NationState({name: NationName.USA, color: 'green', team: Team.ALLIES}, []),
        ];
        const player1 = new Player([nations[0]], 'Adrien');
        this.initialState = new GameState([player1], nations);
        //const update = UpdateArmy.build(region1, player1);
    }

}