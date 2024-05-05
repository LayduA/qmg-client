import React, {useState} from 'react';
import './App.css';
import {Game} from "./game/logic/game";
import PlayerCard, {Hand} from "./game/sprites/playerCard";
import Board from "./game/sprites/map/boardView";
import {GameState} from "./game/logic/state/gameState";
import {Update} from "./game/logic/state/update/update";
import {NationName} from "./game/logic/state/nationState";
import TeamPicker from "./game/sprites/map/teamPicker";
import {RegionName} from "./game/logic/map/region";
import {Card} from "./game/logic/card/card";
import {Troop} from "./game/logic/map/troop";


type Choosable = RegionName | NationName | Card | Troop;

export type HighlightedElement = {
    element: Choosable
    color?: string
}

function App() {

    const game = new Game();
    const [gameState, setGameState] = React.useState<GameState>(game.initialState);
    const [highlightedElements, setHighlightedElements] = React.useState([] as HighlightedElement[]);
    const [playingNation, setPlayingNation] = useState(gameState.getNation(NationName.GERMANY));

    const [card, setCard] = React.useState<Card>();

    const updateGameState = (update: Update) => {
        setGameState(gameState.update(update))
    }
    const playCard = (playedCard: Card) => {
        if (!card) {
            console.log(`Card played: ${playedCard.props.name}`)
            setCard(playedCard);
            setHighlightedElements(playedCard.getChoices(gameState).map((choice: Choosable) => ({element: choice, color: 'green'})));
        }
    }

    const clickedElement = (element: Choosable) => {
        if (card?.getChoices(gameState).includes(element)){
            console.log(`Chosen: ${element}`)
            const update = card?.afterChoice(gameState, element);
            updateGameState(update);
            setHighlightedElements([]);
            setCard(undefined);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <TeamPicker setNation={setPlayingNation} gameState={gameState}/>
                <Board gameState={gameState} highlightedElements={highlightedElements} clickedElement={clickedElement}/>
                <Hand gameState={gameState} nation={playingNation.props.name} playCard={playCard}/>
                <PlayerCard gameState={gameState} playerName={'Adrien'}/>
            </header>
        </div>
    );
}

export default App;
