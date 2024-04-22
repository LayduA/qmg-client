import {LogicElement} from "../logicElement";
import {Point} from "../../sprites/map/polygonView";
import {board, RegionName} from "./board";

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

    public getNeighbors(): Region[] {
        return board.filter((region) => this.props.neighbors.includes(region.props.name));
    }

}