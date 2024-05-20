import {Player} from "../player/player";
import {Update} from "./update/update";
import {NationName, NationState, Team} from "./nationState";
import {SupplyLink, Troop, TroopType} from "../armies/troop";
import {Board} from "../map/board";
import {RegionName} from "../map/region";
import {AllTroops} from "../../../App";

export class GameState {

    public readonly players: Player[];
    public readonly nations: NationState[];
    public readonly board: Board;
    public readonly troops: Troop[];
    public readonly supplyPaths: Troop[][];

    constructor(players: Player[], nations: NationState[], board?: Board, troops?: Troop[], supplyPaths?: Troop[][]) {
        this.players = players;
        this.nations = nations;
        this.troops = troops ?? [];
        this.supplyPaths = supplyPaths ?? [];
        if(!board) {
            this.board = new Board();
            this.board.validate();
        }
        else {
            this.board = board
        }
    }

    public update(update: Update): GameState {
        const updatedState = update.apply(this);
        console.log(updatedState);
        return updatedState
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

    public computeSupplies(troops: Troop[]) {
        let iterating = true;

        // An array of paths => 2 dimensions
        let previousState: RegionName[][] = [];
        // An array of supply links for all nations
        let allEdges: SupplyLink[] = new Array<SupplyLink>();
        let allSupplyPaths: Troop[][] = new Array<Troop[]>();

        let count = 0;
        // while (iterating && count < 15) {

        for (let i = 0; i < this.nations.length; i++) {
            const edges: SupplyLink[] = [];
            const supplyPaths: Troop[][] = []
            const nationName = Object.values(NationName)[i];
            for (const troop of troops.filter((troop: Troop) => troop.props.nationName === nationName && troop.isOnSupplyZone(this))) {
                supplyPaths.push(troop.tree(this, [], edges));
            }
            allSupplyPaths = allSupplyPaths.concat(supplyPaths);
            allEdges = allEdges.concat(edges);
        }

        //     count += 1;
        //     iterating = JSON.stringify(previousState) !== JSON.stringify(state);
        //     previousState = state;
        // }
        console.log(allSupplyPaths, allEdges)
        return allSupplyPaths
    }

    public getTroopOptions(nationName: NationName, type: TroopType = TroopType.ARMY): RegionName[] {
        return this.board.regions
            .filter(region => region.suppliedBy.includes(nationName)) // supplied regions
            .filter(region => !region.occupiers.some(t => t.props.nationName === nationName && t.props.type === type)) // not already containing own army
            .filter(region => region.props.isOcean === (type === TroopType.NAVY))
            .map(region => region.props.name)
    }
}