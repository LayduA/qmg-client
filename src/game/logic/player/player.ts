export class Player {
    public readonly nations: NationName[];
    public readonly name?: string

    constructor(nations: NationName[], name?: string) {
        this.nations = nations;
        if (name) this.name = name;
    }

}