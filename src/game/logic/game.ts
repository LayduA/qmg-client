import {Player} from "./player/player";
import {GameState} from "./state/gameState";
import {NationName, NationState, Team} from "./state/nationState";
import {RegionName} from "./map/region";

export class Game {

    public initialState: GameState;

    public constructor() {
        const nations: NationState[] = [
            new NationState({name: NationName.GERMANY, capital: RegionName.GERMANY, color: 'grey', team: Team.AXIS}, []),
            new NationState({name: NationName.UK, capital: RegionName.DUMMY, color: 'goldenrod', team: Team.ALLIES}, []),
            new NationState({name: NationName.JAPAN, capital: RegionName.DUMMY, color: 'ivory', team: Team.AXIS}, []),
            new NationState({name: NationName.USSR, capital: RegionName.DUMMY, color: 'firebrick', team: Team.ALLIES}, []),
            new NationState({name: NationName.ITALY, capital: RegionName.DUMMY, color: 'rebeccapurple', team: Team.AXIS}, []),
            new NationState({name: NationName.USA, capital: RegionName.EASTERN_UNITED_STATES, color: 'green', team: Team.ALLIES}, []),
        ];
        const player1 = new Player([NationName.GERMANY], 'Adrien');
        this.initialState = new GameState([player1], nations);
        //const update = UpdateArmy.build(region1, player1);
    }

}