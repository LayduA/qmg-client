import {Region, RegionName} from "./region";
import {REGIONS} from "./regionData";
import {NationName} from "../state/nationState";
import {SupplyLink, Troop} from "../armies/troop";
import {Game} from "../game";


export class Board {
    public readonly regions: Region[];

    public constructor(regions?: Region[]) {
        if (!regions) {
            this.regions = REGIONS.map(props => new Region(props));
            // @ts-ignore
            this.regions.find(region => region.props.name === RegionName.GERMANY).suppliedBy = [NationName.GERMANY]
            // @ts-ignore
            this.regions.find(region => region.props.name === RegionName.ITALY).suppliedBy = [NationName.ITALY]
            // @ts-ignore
            this.regions.find(region => region.props.name === RegionName.EASTERN_UNITED_STATES).suppliedBy = [NationName.USA, NationName.JAPAN]
        } else {
            this.regions = regions.sort((a, b) => a.props.name < b.props.name ? -1 : 1);
        }
    }


    public validate(): void {
        for (const region of this.regions) {
            for (const neighbor of this.getNeighbors(region.props.name)) {
                if (!this.getNeighbors(neighbor.props.name).includes(region)) {
                    throw new Error(`Asymmetric neighbors : ${region.props.name} is not in ${neighbor.props.name}'s neighbors`);
                }
            }
        }
    }

    public getRegion(regionName: RegionName): Region {
        const region = this.regions.find((region) => region.props.name === regionName);
        if (!region) {
            throw new Error(`Unknown region ${regionName}`);
        }
        return region;
    }

    public getNeighbors(regionName: RegionName): Region[] {
        return this.regions.filter(region => region.props.neighbors.includes(regionName));
    }

    public addOccupierToRegion(regionName: RegionName, newTroop: Troop): Board {
        const newRegion = this.getRegion(regionName).addOccupier(newTroop);
        const newlySuppliedRegions = this.getNeighbors(regionName)
            .filter(region => !region.occupiers.some(t => t.props.nationName === newTroop.props.nationName))
            .filter(region => !region.occupiers.some(t => Game.getTeam(t.props.nationName) !== Game.getTeam(newTroop.props.nationName)))
            .map(region => new Region(region.props, region.suppliedBy.concat(newTroop.props.nationName), region.occupiers))
        const newlySuppliedRegionNames = newlySuppliedRegions.map(region => region.props.name);

        const unchangedRegions = this.regions.filter(region => region.props.name !== regionName && !newlySuppliedRegionNames.includes(region.props.name));

        const newBoard = new Board(unchangedRegions.concat(newRegion).concat(newlySuppliedRegions));
        console.log('supplyPaths')
        const supplyPathStarts = this.regions
            .filter(region => region.occupiers.some(t => t.props.nationName === newTroop.props.nationName) && region.props.isSupplyZone)
            .map(region => [region]);
        console.log(this.supplyPaths(newTroop.props.nationName, supplyPathStarts));
        return newBoard;
    }

    public supplyPaths(nationName: NationName, currentSupplyPaths: Region[][]) {
        // TODO: implement
        return currentSupplyPaths;
    }
}