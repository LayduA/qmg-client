import {NationName} from "../state/nationState";
import {RegionName} from "../map/region";
import {GameState} from "../state/gameState";
import {Update} from "../state/update/update";
import {UpdateArmy} from "../state/update/updateArmy";
import {TroopType} from "../map/troop";

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

export abstract class Card {

    public readonly props: CardProps;

    protected constructor(props: CardProps) {
        this.props = props;
    }
    public abstract getChoices: Function;
    public abstract afterChoice: Function;
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
        return new Deck([BUILD_ARMY(nation), BUILD_NAVY(nation)])
    }
}

type CardProps = {
    name: string;
    owner: NationName;
    type: CardType;
}
type RegionTargetProps = {
    getChoices: (gameState: GameState) => RegionName[] // gives all the choices of regions in which to build
    afterChoice: (gameState: GameState, choice: RegionName) => Update // What to do once a region has been chosen
}

export class RegionTargetCard extends Card {

    public readonly getChoices: (state: GameState) => RegionName[];
    public readonly afterChoice: (state: GameState, choice: RegionName) => Update;

    public constructor(props: RegionTargetProps & CardProps) {
        super({name: props.name, owner: props.owner, type: props.type});
        this.getChoices = props.getChoices;
        this.afterChoice = props.afterChoice;
    }
}

const BUILD_ARMY = (nation: NationName) => new RegionTargetCard({
    name: 'Build Army',
    owner: nation,
    type: CardType.BUILD_ARMY,
    getChoices: (gameState) => {
        return gameState.getTroopOptions(nation);
    },
    afterChoice: (gameState, choice) => {
        return UpdateArmy.build(choice, nation, TroopType.ARMY);
    }
});

const BUILD_NAVY = (nation: NationName) => new RegionTargetCard({
    name: 'Build Navy',
    owner: nation,
    type: CardType.BUILD_NAVY,
    getChoices: (gameState) => {
        return gameState.getTroopOptions(nation, TroopType.NAVY);
    },
    afterChoice: (gameState, choice) => {
        return UpdateArmy.build(choice, nation, TroopType.NAVY);
    }
});

enum Action {
    BATTLE_LAND, // target: army
    BATTLE_SEA, // -> navy
    BUILD_ARMY, // -> region
    BUILD_NAVY, // -> region
    RECRUIT_ARMY, // -> region
    RECRUIT_NAVY, // -> region
    PROTECT_ARMY, // -> army
    PROTECT_NAVY, // -> navy
    REMOVE_ARMY, // -> army
    REMOVE_NAVY, // -> navy
    ELIMINATE_ARMY, // -> army
    ELIMINATE_NAVY, // -> navy
    DISCARD_FROM_HAND, // -> nation
    DISCARD_FROM_DRAW, // -> nation
    DISCARD_FROM_TABLE, // -> card
    PLACE_ON_DECK, // -> card
    SHUFFLE_DRAW, // -> nation
    DRAW, // -> nation
    GAIN, // -> nation
    ACTIVATE_INSTEAD, // -> nation
    MODIFY_REGIONS, // -> special
    CANCEL_CARD, // -> card
    LOOK_DRAW, // -> nation
}

enum Conditions {
    ARMY_IN_REGIONS,
    NAVY_IN_REGIONS,
}

enum Triggers { // Modifiers: in certain regions, by certain players, troop is supplied, type of card, targeted player, source player, name of card
    ALWAYS,
    ARMY_BUILT,
    NAVY_BUILT,
    ARMY_RECRUITED,
    NAVY_RECRUITED,
    LAND_BATTLE,
    SEA_BATTLE,
    ARMY_TARGETED,
    NAVY_ABOUT_TO_BE_REMOVED,
    CARD_PLAYED,
}

enum Relations {
    OR,
    AND,
    THEN,
    TO,
    FOREACH,
    REPEAT
}

const GAIN = (nation: NationName, n: number) => {
    console.log(`${nation} has gained ${n} points`)
}