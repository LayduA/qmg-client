import React from 'react';
import './App.css';
import {Game} from "./game/logic/game";
import {Player} from "./game/logic/player/player";
import PlayerCard from "./game/sprites/playerCard";
import Board from "./game/sprites/map/boardView";
import {GameState} from "./game/logic/state/gameState";
import {Update} from "./game/logic/state/update/update";

function App() {

    const game = new Game();
    const [gameState, setGameState] = React.useState<GameState>(game.initialState);

    const updateGameState = (update: Update) => {
        setGameState(gameState.update(update))
    }
    return (
        <div className="App">
            <header className="App-header">
                <Board gameState={gameState} updateGameState={updateGameState}/>
                {gameState.players.map((player: Player) => {
                    return <PlayerCard
                        key={`player-card-${player.name ?? player.nations[0].toString()}`}
                        name={player.name ?? player.nations[0].toString()}
                        nations={player.nations}
                    />
                })}
            </header>
        </div>
    );
}

export default App;
