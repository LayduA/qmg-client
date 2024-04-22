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
    public anchors: Troop[];

    public supplied: boolean; // Redundant with supplyChain, but easier to listen to

    public constructor(props: TroopProps, regionName: RegionName) {
        this.props = props;
        this.regionName = regionName;

        this.anchors = this.getAnchors();

        this.supplyChain = this.getSupplyChain();
        this.supplied = false;
        this.isSupplied();
        if (this.supplied) {
            this.notifyAdjacentOfAnchor([this]);
        }
        this.notifyAdjacentOfSupply([this]);

    }

    public getSupplyChain() {
        if (this.isOnSupplyZone()) {
            return [{source: this, via: [this]} as SupplyChain]
        } else {
            return this.getAdjacent().filter((adjacentTroop) => adjacentTroop.supplied).map((adjacentTroop) => { // For each adjacent troop
                return adjacentTroop.supplyChain.map((sc) => ( // For each supply chain of the troop
                    {source: sc.source, via: sc.via.concat(this)})
                )
            }).flat()
        }
    }

    public isSupplied(): boolean {
        const hasSupplyChain = this.supplyChain.length > 0
        if (this.props.type === TroopType.ARMY) {
            this.supplied = hasSupplyChain
        } else {
            this.supplied = hasSupplyChain && this.anchors.length > 0;
        }

        return this.supplied
    }

    private isOnSupplyZone(): boolean {
        return getRegion(this.regionName).props.isSupplyZone;
    }

    private notifyAdjacentOfSupply(alreadyNotified: Troop[]) {
        if (!this.supplied) return;
        const toNotify = this.getAdjacent().filter((t) => !t.isOnSupplyZone() && !alreadyNotified.includes(t))

        for (const troop of toNotify) {
            for (const mySC of this.supplyChain.filter((sc) => !sc.via.includes(troop))) {
                troop.addSupplyChain({source: mySC.source, via: mySC.via.concat(troop)})
                if (troop.supplied) {
                    troop.notifyAdjacentOfSupply(alreadyNotified.concat(this));
                }
            }
        }
    }

    private notifyAdjacentOfAnchor(alreadyNotified: Troop[]) {
        if (this.props.type !== TroopType.ARMY) return;
        const paths = this.supplyChain.map((sc) => sc.via)
        const toNotify = this.getAdjacentAllies()
            .filter((t) => t.props.type === TroopType.NAVY)
        for (const boat of toNotify) {
            const pathsWithout = paths.some((path) => !path.includes(boat))
            if(pathsWithout){
                boat.addAnchor(this)
            }
        }
    }

    private addAnchor(troop: Troop): void {
        if (this.props.type === TroopType.NAVY) {
            this.anchors.push(troop)
            this.isSupplied();
        }
    }

    private removeAnchor(troops: Troop[]): void {
        for (const troop of troops) {
            if (this.anchors.includes(troop)) {
                this.anchors.splice(this.anchors.indexOf(troop), 1);
            }
        }
    }

    private notifyAdjacentOfDestroy(remove: Troop[], alreadyNotified: Troop[]) {
        const toNotify = this.getAdjacent().filter((t) => !t.isOnSupplyZone() && !alreadyNotified.includes(t))
        for (const troop of toNotify) {
            const wasSupplied = troop.supplied
            troop.removeNodeFromSupplyChain(remove);
            const toRemove = (wasSupplied && !troop.supplied) ? (remove.concat(this)) : remove
            troop.notifyAdjacentOfDestroy(toRemove, alreadyNotified.concat(this));
        }

        const alliesToNotify = this.getAdjacentAllies().filter((t) => !alreadyNotified.includes(t));
        for (const ally of alliesToNotify) {
            ally.removeAnchor(remove)
        }
    }

    private getAdjacent(): Troop[] {
        return getRegion(this.regionName)
            .getNeighbors()
            .map((region) => region.troops.filter((troop) => troop.props.nation === this.props.nation))
            .flat()
    }

    private getAdjacentAllies(): Troop[] {
        return getRegion(this.regionName)
            .getNeighbors()
            .map((region) => region.troops.filter((troop) => troop.props.nation.team === this.props.nation.team))
            .flat()
    }

    private getAnchors(): Troop[] {
        if (this.props.type !== TroopType.NAVY) return [];
        return this.getAdjacentAllies().filter((troop) => troop.props.type === TroopType.ARMY && troop.supplied)
    }

    public equals(troop: Troop): boolean {
        return this.props.type === troop.props.type && this.props.nation === troop.props.nation && this.regionName === troop.regionName;
    }

    public destroy(): void {
        this.removeNodeFromSupplyChain([this])
        this.notifyAdjacentOfDestroy([this], [this])
    }

    public addSupplyChain(supplyChain: SupplyChain): void {
        // Turbo cursed condition just to say "if the supplychain doesnt already exist"
        if (!this.supplyChain.find(
            (sc) => sc.source === supplyChain.source &&
                JSON.stringify(sc.via.map((troop) => troop.regionName))
                === JSON.stringify(supplyChain.via.map((troop) => troop.regionName)))
        ) {
            this.supplyChain.push(supplyChain)
            this.isSupplied();
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
            + "\n anchors: "
            + this.anchors.map((troop) => troop.regionName + ` (${NationName[troop.props.nation.name]})`)
    }


    public removeNodeFromSupplyChain(remove: Troop[]) {
        this.supplyChain = this.supplyChain.filter((sc) => !sc.via.some((troop) => remove.includes(troop)))
        this.isSupplied();
    }

}