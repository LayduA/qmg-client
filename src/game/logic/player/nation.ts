import {Troop, TroopType} from "../troop";
import {RegionName} from "../map/board";

export enum NationName {
    GERMANY,
    UK,
    JAPAN,
    USSR,
    ITALY,
    USA
}

enum Team {
    AXIS,
    ALLIES
}

export type Army = Troop[]

export class Nation {
    name: NationName;
    color: string;
    team: Team;
    army: Army;

    constructor(name: NationName, color: string, team: Team, army: Army) {
        this.name = name;
        this.team = team;
        this.army = army;
        this.color = color;
    }

    public static NATIONS: Nation[] = [];

    public static initNations() {
        this.NATIONS = [
            new Nation(NationName.GERMANY, 'darkgrey', Team.AXIS, []),
            new Nation(NationName.UK, 'yellow', Team.ALLIES, []),
            new Nation(NationName.JAPAN, 'lightgrey', Team.AXIS, []),
            new Nation(NationName.USSR, 'red', Team.ALLIES, []),
            new Nation(NationName.ITALY, 'purple', Team.AXIS, []),
            new Nation(NationName.USA, 'green', Team.ALLIES, []),
        ];
    }
    public addTroop(type: TroopType, regionName: RegionName){
        this.army.push(new Troop({nationName: this.name, type: type}, regionName))
    }

    public getTeam(){
        return ([this] as Nation[]).concat(Nation.NATIONS.filter((n) => n.team === this.team && n.name !== this.name));
    }

    public static getNation(nationName: NationName){
        const nation = Nation.NATIONS.find((n) => n.name === nationName);
        if (!nation) {
            throw new Error(`Nation not found: ${nationName}`);
        } else {
            return nation;
        }
    }

    public removeTroop(regionName: RegionName, type?: TroopType, ){
        this.army = this.army.filter((troop) => !(troop.regionName === regionName && (!type || type === troop.props.type)));
    }
}

