import React, {useState} from 'react';
import './App.css';
import {Game} from "./game/logic/game";
import {Player} from "./game/logic/player/player";
import PlayerCard, {Hand} from "./game/sprites/playerCard";
import Board, {HighlightedRegion} from "./game/sprites/map/boardView";
import {GameState} from "./game/logic/state/gameState";
import {Update} from "./game/logic/state/update/update";
import {NationName} from "./game/logic/state/nationState";
import TeamPicker from "./game/sprites/map/teamPicker";
import {RegionName} from "./game/logic/map/region";

function App() {

    const game = new Game();
    const [gameState, setGameState] = React.useState<GameState>(game.initialState);
    // Change to highlighted element (Troop, Region, Card, Player)
    const [highlightedRegions, setHighlightedRegions] = React.useState([] as HighlightedRegion[]);
    const [playingNation, setPlayingNation] = useState(gameState.getNation(NationName.GERMANY));

    const updateGameState = (update: Update) => {
        setGameState(gameState.update(update))
    }

    const makePlayerChoose = (choices: any[], then: (gameState: GameState, choice: any) => Update) => {
        console.log(choices);
        setHighlightedRegions(choices.map(r => ({name: r, color: 'green'} as HighlightedRegion)))
        const choice = playingNation.props.capital;
        const update = then(gameState, choice);
        updateGameState(update);
    }
    return (
        <div className="App">
            <header className="App-header">
                <TeamPicker setNation={setPlayingNation} gameState={gameState}/>
                <Board gameState={gameState} updateGameState={updateGameState} highlightedRegions={highlightedRegions}
                       playingNation={playingNation}/>
                <Hand gameState={gameState} nation={playingNation.props.name} makePlayerChoose={makePlayerChoose}/>
                <PlayerCard gameState={gameState} playerName={'Adrien'}/>
            </header>
        </div>
    );
}

export default App;
