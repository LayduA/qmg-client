import {LogicElement} from "../logicElement";
import {Point} from "../../sprites/map/polygonView";

export enum RegionName {
    GERMANY = 'Allemagne',
    WESTERN_EUROPE = 'Europe de l\'Ouest',
    EASTERN_EUROPE = 'Europe de l\'Est',
    RUSSIA = 'Russie',
    UKRAINE = 'Ukraine',
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

    constructor(props: RegionProps) {
        this.props = props
    }

    public static dummyProps(): RegionProps {
        return {
            name: RegionName.DUMMY,
            neighbors: [],
            points: [],
            anchor: [0, 0],
            isSupplyZone: false,
            isOcean: false,
        }
    }

}

