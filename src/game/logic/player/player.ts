import {Nation} from "./nation";

export class Player {
    public readonly nations: Nation[];
    public readonly name?: string

    constructor(nations: Nation[], name?: string) {
        this.nations = nations;
        if (name) this.name = name;
    }

}