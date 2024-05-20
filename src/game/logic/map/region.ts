import {LogicElement} from "../logicElement";
import {Point} from "../../sprites/map/polygonView";
import {GameState} from "../state/gameState";
import {Troop} from "../armies/troop";
import {NationName} from "../state/nationState";

export enum RegionName {
    GERMANY = 'Allemagne',
    WESTERN_EUROPE = 'Europe de l\'Ouest',
    EASTERN_EUROPE = 'Europe de l\'Est',
    RUSSIA = 'Russie',
    UKRAINE = 'Ukraine',
    ITALY = 'Italie',
    KAZAKHSTAN = 'Kazakhstan',
    SIBERIA = 'Sibérie',
    NORTH_ATLANTIC = 'Atlantique Nord',
    SOUTH_ATLANTIC = 'Atlantique Sud',
    NORTH_SEA = 'Mer du Nord',
    DUMMY = 'DUMMY',
    EASTERN_UNITED_STATES = 'Côte Est des États-Unis',
    LATIN_AMERICA = 'Amérique Latine'
}

export type RegionProps = {
    name: RegionName
    neighbors: RegionName[]
    points: Point[]
    anchor: Point
    isSupplyZone: boolean
    isOcean: boolean
    color?: string
}

export class Region implements LogicElement {

    public readonly props: RegionProps;
    public suppliedBy: NationName[];
    public occupiers: Troop[];

    constructor(props: RegionProps, suppliedBy?: NationName[], occupiers?: Troop[]) {
        this.props = props
        this.suppliedBy = suppliedBy ?? [];
        this.occupiers = occupiers ?? [];
    }

    public getOccupiers(state: GameState): Troop[] {
        return state.nations.map(n => n.army).map(army => army.filter(t => t.regionName === this.props.name)).flat()
    }

    public addOccupier(newTroop: Troop): Region {
        // Add army to region
        return new Region(this.props, this.suppliedBy, this.occupiers.concat(newTroop));
    }

}

