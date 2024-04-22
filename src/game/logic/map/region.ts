import {LogicElement} from "../logicElement";
import {Point} from "../../sprites/map/polygonView";
import {Troop, TroopProps} from "../troop";
import {board, RegionName} from "./board";
import {Nation} from "../player/nation";

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

    public troops: Troop[]

    constructor(props: RegionProps) {
        this.props = props
        this.troops = [];
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

    public addTroop({nation, type}: TroopProps): void {
        const troop = new Troop({nation, type}, this.props.name);
        this.troops.push(troop)
    }

    public removeTroop({nation, type}: TroopProps): void {
        const troop = this.troops.find((troop) => (troop.props.nation === nation && troop.props.type === type ))
        if (!troop) {
            throw new Error(`Trying to remove troop that does not exist in region ${this.props.name}`)
        }
        troop.destroy();
        this.troops.splice(this.troops.indexOf(troop), 1)
    }

    public getTroops(nations: Nation[]): Troop[] {
        return this.troops.filter((troop) => nations.includes(troop.props.nation));
    }


}