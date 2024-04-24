import {Point} from "../sprites/map/polygonView";
import {Nation, NationName} from "./player/nation";
import {getRegion, RegionName} from "./map/board";

export enum TroopType {
    ARMY,
    NAVY,
    AIR_FORCE
}

export const TROOP_POLYGONS: Point[][] = [
    [
        [0, 21],
        [0, 15],
        [2, 11],
        [10, 11],
        [14, 1],
        [27, 1],
        [27, 0],
        [32, 0],
        [32, 1],
        [51, 1],
        [51, 7],
        [42, 7],
        [42, 9],
        [53, 9],
        [53, 14],
        [54, 14],
        [54, 19],
        [43, 25],
        [4, 25]],
    [[0, 15],
        [17, 15],
        [17, 9],
        [26, 9],
        [26, 2],
        [31, 2],
        [31, 7],
        [36, 7],
        [36, 0],
        [42, 0],
        [42, 5],
        [46, 5],
        [46, 14],
        [79, 14],
        [74, 26],
        [3, 26]],
    []
]

export class SupplyLink {
    public nodes: [RegionName, RegionName]
    public isAnchor: boolean

    public constructor(t1: RegionName, t2: RegionName, isAnchor: boolean) {
        this.nodes = [t1, t2];
        this.isAnchor = isAnchor;
    }

    public reverseToString() {
        return JSON.stringify([this.nodes[1], this.nodes[0]]);
    }

    public toString() {
        return JSON.stringify(this.nodes);
    }
}

export type TroopProps = {
    nationName: NationName,
    type: TroopType,
}

export class Troop {
    public readonly props: TroopProps

    public regionName: RegionName;

    public supplied: boolean;

    public constructor(props: TroopProps, regionName: RegionName) {
        this.props = props;
        this.regionName = regionName;

        this.supplied = false;
    }


    public tree(allTroops: Troop[], tree: Troop[], edges: SupplyLink[]): Troop[] {

        tree.push(this)

        if (this.props.type === TroopType.NAVY) {
            if (this.getAnchors(allTroops, []).length === 0) {
                this.supplied = false;
                return tree;
            }
            for (const anchor of this.getAnchors(allTroops, []).filter(troop => troop.props.nationName !== this.props.nationName)) {
                edges.push(new SupplyLink(anchor.regionName, this.regionName, true))
            }
        }
        this.supplied = true;

        for (const troop of this
            .getAdjacent(allTroops, tree)
            .filter((troop) => !troop.isOnSupplyZone() && !tree.includes(troop))) {
            troop.tree(allTroops, tree, edges)
            const newEdge = new SupplyLink(this.regionName, troop.regionName, false)
            if (!edges.some(edge => edge.toString() === newEdge.toString() || edge.toString() === newEdge.reverseToString())) {
                edges.push(newEdge);
            }
        }
        return tree;
    }

    public isOnSupplyZone(): boolean {
        return getRegion(this.regionName).props.isSupplyZone;
    }

    private getAdjacent(allTroops: Troop[], excluded: Troop[]): Troop[] {
        return allTroops
            .filter((troop) => !excluded.includes(troop) && troop.props.nationName === this.props.nationName &&
                getRegion(this.regionName)
                    .getNeighbors()
                    .map((reg) => reg.props.name).includes(troop.regionName));
    }

    private getAdjacentAllies(allTroops: Troop[], excluded: Troop[]): Troop[] {
        const allAllies = Nation.getNation(this.props.nationName).getTeam().map(nation => nation.army).flat();
        const adjacentRegionNames = getRegion(this.regionName).getNeighbors().map((reg) => reg.props.name);
        return allAllies.filter((troop) => adjacentRegionNames.includes(troop.regionName));
    }

    private getAnchors(allTroops: Troop[], excluded: Troop[]): Troop[] {
        if (this.props.type !== TroopType.NAVY) return [];
        return this.getAdjacentAllies(allTroops, excluded)
            .filter((troop) => troop.props.type === TroopType.ARMY && troop.supplied);
    }


    public toString(): string {
        return TroopType[this.props.type] + " of nation "
            + this.props.nationName
            + `\n(${this.supplied ? '' : 'NOT '}supplied)`
    }


}