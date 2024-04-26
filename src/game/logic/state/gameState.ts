import {Player} from "../player/player";
import {Update} from "./update/update";
import {NationName, NationState, Team} from "./nationState";
import {Troop} from "../map/troop";
import {Board} from "../map/board";

export class GameState {

    public readonly players: Player[];
    public readonly nations: NationState[];
    public readonly board: Board;

    constructor(players: Player[], nations: NationState[]) {
        this.players = players;
        this.nations = nations;
        this.board = new Board();
        this.board.validate();
    }

    public update(update: Update): GameState {
        return update.apply(this);
    }

    public getNation(name: NationName): NationState {
        const nation = this.nations.find(n => n.props.name === name);
        if (!nation) throw new Error(`Nation ${name} not found`);
        return nation;
    }

    public getTeam(team: Team): NationState[] {
        return this.nations.filter((n) => n.props.team === team);
    }

    public getNationTeam(nation: NationName): NationState[] {
        return this.getTeam(this.getNation(nation).props.team);
    }

    public updateNation(newNation: NationState): GameState {
        return new GameState(this.players, this.nations.filter(n => n.props.name !== newNation.props.name).concat(newNation));
    }

    public getAllTroops(name?: NationName): Troop[] {
        if (!name) {
            return this.nations.map(nation => nation.army).flat();
        }
        return this.getNation(name).army
    }
}