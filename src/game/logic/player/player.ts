import {NationState} from "../state/nationState";

export class Player {
    public readonly nations: NationState[];
    public readonly name?: string

    constructor(nations: NationState[], name?: string) {
        this.nations = nations;
        if (name) this.name = name;
    }

}