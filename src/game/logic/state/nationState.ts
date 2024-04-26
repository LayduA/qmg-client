import {Troop, TroopType} from "../map/troop";
import {RegionName} from "../map/region";

export enum NationName {
    GERMANY = "Allemagne",
    UK = "Royaume-Uni",
    JAPAN = "Japon",
    USSR = "URSS",
    ITALY = "Italie",
    USA = "États-Unis"
}

export enum Team {
    AXIS,
    ALLIES
}

export type Army = Troop[]

type NationProps = {
    name: NationName
    color: string
    team: Team
}

export class NationState {
    props: NationProps;
    army: Army;

    constructor(props: NationProps, army: Army) {
        this.props = props
        this.army = army;
    }

    public addTroop(type: TroopType, regionName: RegionName) {
        if (!this.army.find(t => t.props.type === type && t.regionName === regionName)) {
            return new NationState(this.props, this.army.concat(new Troop({
                type: type,
                nationName: this.props.name
            }, regionName)));
        }
        return new NationState(this.props, this.army); //Still fire an update
    }

    public removeTroop(type: TroopType, regionName: RegionName,) {
        return new NationState(this.props, this.army.filter((troop) => !(troop.regionName === regionName && (!type || type === troop.props.type))));
    }
}

