import {Player} from "../player/player";
import {Region} from "../map/region";

export class GameState {

    public readonly players: Player[];
    public readonly regions: Region[];

    constructor(players: Player[], regions: Region[]) {
        this.players = players;
        this.regions = regions;
    }
}