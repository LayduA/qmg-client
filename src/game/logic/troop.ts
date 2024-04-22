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
    nation: Nation,
    type: TroopType,
}

type SupplyChain = {
    source: Troop
    via: Troop[]
}

export class Troop {
    public readonly props: TroopProps

    public regionName: RegionName;

    public supplyChain: SupplyChain[];

    public supplied: boolean; // Redundant with supplyChain, but easier to listen to

    public constructor(props: TroopProps, regionName: RegionName) {
        this.props = props;
        this.regionName = regionName;

        if (getRegion(regionName).props.isSupplyZone) {
            this.supplyChain = [{source: this, via: [this]} as SupplyChain]
        } else {
            this.supplyChain = this.getAdjacent().map((troop) => { // For each adjacent troop
                return troop.supplyChain.map((sc) => ( // For each supply chain of the troop
                    {source: sc.source, via: sc.via.concat(this)})
                )
            }).flat()
        }
        this.supplied = this.isSupplied();
        this.notifyAdjacentOfSupply([this])
    }

    public isSupplied(): boolean {
        return this.supplyChain.length > 0
    }

    private isOnSupplyZone(): boolean {
        return getRegion(this.regionName).props.isSupplyZone;
    }

    private notifyAdjacentOfSupply(alreadyNotified: Troop[]) {
        const toNotify = this.getAdjacent().filter((t) => !t.isOnSupplyZone() && !alreadyNotified.includes(t))

        for (const troop of toNotify) {
            for (const mySC of this.supplyChain.filter((sc) => !sc.via.includes(troop))) {
                troop.addSupplyChain({source: mySC.source, via: mySC.via.concat(troop)})
                troop.notifyAdjacentOfSupply(alreadyNotified.concat(this))
            }
        }
    }

    private notifyAdjacentOfDestroy(remove: Troop, alreadyNotified: Troop[]) {
        const toNotify = this.getAdjacent().filter((t) => !t.isOnSupplyZone() && !alreadyNotified.includes(t))

        for (const troop of toNotify) {
            troop.removeNodeFromSupplyChain(remove)
            troop.notifyAdjacentOfDestroy(remove, alreadyNotified.concat(this))
        }
    }

    private getAdjacent(): Troop[] {
        return getRegion(this.regionName)
            .getNeighbors()
            .map((region) => region.troops.filter((troop) => troop.props.nation === this.props.nation))
            .flat()
    }

    public equals(troop: Troop): boolean {
        return this.props.type === troop.props.type && this.props.nation === troop.props.nation && this.regionName === troop.regionName;
    }

    public destroy(): void {
        this.removeNodeFromSupplyChain(this)
        this.notifyAdjacentOfDestroy(this, [this])
    }

    public addSupplyChain(supplyChain: SupplyChain): void {
        // Turbo cursed condition just to say "if the supplychain doesnt already exist"
        if (!this.supplyChain.find(
            (sc) => sc.source === supplyChain.source &&
                JSON.stringify(sc.via.map((troop) => troop.regionName))
                === JSON.stringify(supplyChain.via.map((troop) => troop.regionName)))
        ) {
            this.supplyChain.push(supplyChain)
            this.supplied = this.isSupplied();
        }
        if (this.supplyChain.length === 1) {
            // We notify only if the troop goes from unsupplied to supplied
            this.notifyAdjacentOfSupply([this])
        }
    }

    public toString(): string {
        return TroopType[this.props.type] + " of nation "
            + NationName[this.props.nation.name]
            + "\n supply chain: "
            + this.supplyChain.map((sc) => `\n${sc.source.regionName} via ${sc.via.map((t) => t.regionName)}`)
    }


    public removeNodeFromSupplyChain(troop: Troop) {
        this.supplyChain = this.supplyChain.filter((sc) => !sc.via.includes(troop))
        this.supplied = this.isSupplied();
    }

}