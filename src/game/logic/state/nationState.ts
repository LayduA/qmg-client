import {Troop, TroopType} from "../map/troop";
import {RegionName} from "../map/region";
import {GameState} from "./gameState";
import {HighlightedRegion} from "../../sprites/map/boardView";
import {Deck} from "../card/card";

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

export type Army = Troop[];

export type Reserve = [
    number, // ARMY
    number, // NAVY
    number, // AIR FORCE
]

type NationProps = {
    name: NationName
    capital: RegionName
    color: string
    team: Team
}

export class NationState {
    props: NationProps;
    army: Army;
    reserve: Reserve;

    hand: Deck;

    drawDeck: Deck;
    discardDeck: Deck;
    statusDeck: Deck;
    responseDeck: Deck;


    constructor(props: NationProps, army: Army, reserve?: Reserve) {
        this.props = props
        this.army = army;
        this.reserve = reserve ?? this.buildReserve();
        this.hand = Deck.buildDeck(this.props.name);
        this.drawDeck = Deck.buildDeck(this.props.name);
        this.discardDeck = new Deck([]);
        this.statusDeck = new Deck([]);
        this.responseDeck = new Deck([]);
    }

    public addTroop(type: TroopType, regionName: RegionName) {
        if (!this.army.find(t => t.props.type === type && t.regionName === regionName)) {
            if (this.reserve[type] > 0) {
                return new NationState(
                    this.props,
                    this.army.concat(new Troop({type: type, nationName: this.props.name}, regionName)),
                    //@ts-ignore
                    this.reserve.map((troopAmount, i) => i === type ? troopAmount - 1 : troopAmount))
            }
        }
        return new NationState(this.props, this.army, this.reserve); //Still fire an update
    }

    public removeTroop(type: TroopType, regionName: RegionName,) {
        return new NationState(
            this.props,
            this.army.filter((troop) => !(troop.regionName === regionName && troop.props.type === type)),
            //@ts-ignore
            this.reserve.map((troopAmount, i) => i === type ? troopAmount + 1 : troopAmount)
        );
    }

    private buildReserve(): Reserve {
        switch (this.props.name) {
            case NationName.GERMANY:
                return [7, 3, 0];
            case NationName.UK:
                return [5, 5, 0];
            case NationName.JAPAN:
                return [5, 5, 0];
            case NationName.USSR:
                return [7, 1, 0];
            case NationName.ITALY:
                return [4, 3, 0];
            case NationName.USA:
                return [5, 6, 0];
            default:
                return [0, 0, 0];
        }
    }

}


