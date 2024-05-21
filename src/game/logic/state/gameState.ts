import {Player} from "../player/player";
import {Update} from "./update/update";
import {NationName, NationState, Team} from "./nationState";
import {Troop, TroopType} from "../armies/troop";
import {Board} from "../map/board";
import {RegionName} from "../map/region";

export class GameState {

    public readonly players: Player[];
    public readonly nations: NationState[];
    public readonly board: Board;
    public readonly troops: Troop[];

    constructor(players: Player[], nations: NationState[], board?: Board, troops?: Troop[]) {
        this.players = players;
        this.nations = nations;
        this.troops = troops ?? [];
        if(!board) {
            this.board = new Board();
            this.board.validate();
        }
        else {
            this.board = board
        }
    }

    public update(update: Update): GameState {
        return update.apply(this)
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
        if (name) return this.troops.filter(t => t.props.nationName === name);
        return this.troops;
    }

    public getTroopOptions(nationName: NationName, type: TroopType = TroopType.ARMY): RegionName[] {
        return this.board.regions
            .filter(region => region.suppliedBy.includes(nationName)) // supplied regions
            .filter(region => !region.occupiers.some(t => t.props.nationName === nationName && t.props.type === type)) // not already containing own army
            .filter(region => region.props.isOcean === (type === TroopType.NAVY))
            .map(region => region.props.name)
    }
}