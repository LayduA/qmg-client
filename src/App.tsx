import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {Game} from "./game/logic/game";
import PlayerCard, {Hand} from "./game/sprites/playerCard";
import Board from "./game/sprites/map/boardView";
import {GameState} from "./game/logic/state/gameState";
import {Update} from "./game/logic/state/update/update";
import {NationName} from "./game/logic/state/nationState";
import TeamPicker from "./ui/teamPicker";
import {Card, CardEffect, Choosable} from "./game/logic/card/card";
import {SupplyLink, Troop} from "./game/logic/armies/troop";
import {RegionName} from "./game/logic/map/region";


export type HighlightedElement = {
    element: Choosable
    color?: string
}

export type AllTroops = {
    troops: Troop[],
    supplyPaths: RegionName[][],
    allEdges: SupplyLink[],
}

function App() {

    const game = new Game();
    const [gameState, setGameState] = React.useState<GameState>(game.initialState);
    const [highlightedElements, setHighlightedElements] = React.useState([] as HighlightedElement[]);
    const [playingNation, setPlayingNation] = useState(gameState.getNation(NationName.GERMANY));

    const [card, setCard] = React.useState<Card>();

    const [cardEffects, setCardEffects] = React.useState<CardEffect[]>();
    const effectIndex = React.useRef(0);

    const updateGameState = (update: Update) => {
        setGameState(gameState.update(update))
    }

    const supplyChains = useMemo(() => {

        // An array of supply links for all nations
        let allEdges: SupplyLink[] = new Array<SupplyLink>();
        let supplyPathsRegions: RegionName[][] = new Array<RegionName[]>();

        for (let i = 0; i < gameState.nations.length; i++) {
            const edges: SupplyLink[] = [];
            const supplyPaths: Troop[][] = []
            const nationName = Object.values(NationName)[i];
            for (const region of gameState.board.regions.filter(region => region.props.isSupplyZone)) {
                const troop = region.occupiers.find(t => t.props.nationName === nationName);
                if (troop){
                    supplyPaths.push(troop.tree(gameState, [], edges));
                }
            }
            supplyPathsRegions = supplyPathsRegions.concat(supplyPaths.map(tree => tree.map(troop => troop.regionName)));
            allEdges = allEdges.concat(edges);
        }

        //     count += 1;
        //     iterating = JSON.stringify(previousState) !== JSON.stringify(state);
        //     previousState = state;
        // }
        console.log(supplyPathsRegions, allEdges)
        return {supplyPaths: supplyPathsRegions, allEdges: allEdges} as AllTroops;
    }, [gameState]);

    useEffect(() => {
        if (!cardEffects) {
            setHighlightedElements([])
            return;
        }
        const choices = cardEffects[effectIndex.current].getChoices(gameState, supplyChains);
        setHighlightedElements(choices.map((choice: Choosable) => ({
            element: choice,
            color: 'green'
        })));
    }, [gameState, cardEffects]);

    const playCard = (playedCard: Card) => {
        if (!card) {
            console.log(`Card played: ${playedCard.props.name}`)
            effectIndex.current = 0;
            setCard(playedCard);
            setCardEffects(playedCard.cardEffects);
        }
    }

    const clickedElement = (element: Choosable) => {
        if (!cardEffects) return;
        if (cardEffects[effectIndex.current].getChoices(gameState, supplyChains).includes(element)) {
            console.log(`Chosen: ${element}`)
            const update = cardEffects[effectIndex.current].afterChoice(gameState, element);

            cardEffects[effectIndex.current].resolved = true;
            if (effectIndex.current < cardEffects.length - 1) { // There are other effects to be applied
                effectIndex.current = effectIndex.current + 1; // TODO: check if player has at least one choice
            } else {
                console.log('finished')
                setCard(undefined);
                setCardEffects(undefined);
            }
            updateGameState(update);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <TeamPicker setNation={setPlayingNation} gameState={gameState}/>
                <Board gameState={gameState} allTroops={supplyChains} highlightedElements={highlightedElements} clickedElement={clickedElement}/>
                <Hand gameState={gameState} nation={playingNation.props.name} playCard={playCard}/>
                <PlayerCard gameState={gameState} playerName={'Adrien'}/>
            </header>
        </div>
    );
}

export default App;

