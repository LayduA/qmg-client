import {NationName, NationState} from "../state/nationState";

export class Player {
    public readonly nations: NationName[];
    public readonly name: string

    constructor(nations: NationName[], name: string) {
        this.nations = nations;
        this.name = name;
    }

}