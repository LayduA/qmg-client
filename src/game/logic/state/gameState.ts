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

    public getTroopOptions(nationName: NationName, type: TroopType = TroopType.ARMY): RegionName[] {
        const nation = this.getNation(nationName)
        const candidates: RegionName[] = this.board.getRegion(nation.props.capital).getOccupiers(this).length > 0 ? [] : [nation.props.capital];
        for (const troop of nation.army.filter(t => t.supplied)) {
            for (const region of this.board.getNeighbors(troop.regionName).filter(region => region.props.isOcean === (type === TroopType.NAVY))) {
                if (candidates.includes(region.props.name)) continue; // If region already a candidate
                const occupiers = region.getOccupiers(this);
                if (occupiers.find(t => t.props.nationName === nationName)) continue; // If own army already occupies
                if (occupiers.find(t => this.getNation(t.props.nationName).props.team !== nation.props.team)) continue; // If enemy occupies
                if (type === TroopType.NAVY) {
                    const trp = new Troop({nationName: nationName, type: TroopType.NAVY}, region.props.name)
                    if (trp.getAnchors(this).length === 0) continue // Region has no anchors
                }
                candidates.push(region.props.name);
            }
        }
        return candidates;
    }
}