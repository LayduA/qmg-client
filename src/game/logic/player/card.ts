import {Player} from "./player";
import {NationName} from "../state/nationState";

export enum CardType {
    BUILD_ARMY,
    BUILD_NAVY,
    LAND_BATTLE,
    SEA_BATTLE,
    EVENT,
    RESPONSE,
    ECONOMIC_WARFARE,
    STATUS,
    AIR_POWER,
    BOLSTER
}

export class Card {

    public readonly name: string;
    public readonly type: CardType;
    public readonly visibleBy: NationName[]

    public constructor(name: string, type: CardType, visibleBy: NationName[]) {
        this.name = name;
        this.type = type;
        this.visibleBy = visibleBy;
    }
}

export class Deck {
    public readonly cards: Card[];

    public constructor(cards: Card[]) {
        this.cards = cards;
    }

    public drawFirst(): [Card, Card[]] {
        const card = this.cards[0];
        return [card, this.cards.slice(0)];
    }

    public static buildDeck(nation: NationName): Deck {
        switch (nation){
            case NationName.GERMANY:
                return new Deck([new Card('', CardType.BUILD_ARMY, [nation]), new Card('', CardType.BUILD_ARMY, [nation])])
            default:
                return new Deck([]);
        }
    }
}