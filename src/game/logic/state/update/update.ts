import {GameState} from "../gameState";

export abstract class Update {
    public abstract apply(previousState: GameState): GameState
}