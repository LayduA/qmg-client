import React from 'react';
import './App.css';
import {Game} from "./game/logic/game";
import {Player} from "./game/logic/player/player";
import PlayerCard from "./game/sprites/playerCard";
import Board from "./game/sprites/map/boardView";

function App() {

    const game = new Game();
    return (
        <div className="App">
            <header className="App-header">
                <Board/>
                {game.state.players.map((player: Player) => {
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
