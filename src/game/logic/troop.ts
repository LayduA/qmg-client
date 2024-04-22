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


    public tree(allTroops: Troop[], excludes: Troop[]): Troop[] {

        if (this.props.type === TroopType.NAVY) {
            this.supplied = this.getAnchors(allTroops, []).length > 0;
        } else {
            this.supplied = true;
        }
        excludes.push(this)
        if (this.supplied) {
            for (const troop of this.getAdjacent(allTroops, excludes).filter((troop) => !troop.isOnSupplyZone())) {
                troop.tree(allTroops, excludes)
            }
        }
        return Array.from(new Set(excludes));
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
            + NationName[this.props.nationName]
            + `\n(${this.supplied ? '' : 'NOT ' }supplied)`
    }


}