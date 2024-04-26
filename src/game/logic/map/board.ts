import {Region, RegionName} from "./region";
import {REGIONS} from "./regionData";


export class Board {
    public readonly regions: Region[];

    public constructor() {
        this.regions = REGIONS.map(props => new Region(props));
    }

    public validate(): void {
        for (const region of this.regions) {
            for (const neighbor of this.getNeighbors(region.props.name)) {
                if (!this.getNeighbors(neighbor.props.name).includes(region)){
                    throw new Error(`Asymmetric neighbors : ${region.props.name} is not in ${neighbor.props.name}'s neighbors`);
                }
            }
        }
    }

    public getRegion(regionName: RegionName): Region{
        const region = this.regions.find((region) => region.props.name === regionName);
        if (!region) {
            throw new Error(`Unknown region ${regionName}`);
        }
        return region;
    }

    public getNeighbors(regionName: RegionName): Region[] {
        return this.regions.filter(region => region.props.neighbors.includes(regionName));
    }
}