import React, {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {NationName} from "../../logic/state/nationState";
import {GameState} from "../../logic/state/gameState";

function TeamPicker({gameState, setNation}: { gameState: GameState, setNation: Function }) {
    const [value, setValue] = useState<string>(NationName.GERMANY);

    const handleChange = (event: any) => {
        setValue(event.target.value);
        setNation(gameState.getNation(event.target.value));
    }
    return (
        <FormControl sx={{
            position: "absolute",
        }}>
            <InputLabel id="nation-select-label">NationState</InputLabel>
            <Select
                labelId="nation-select-label"
                id="nation-select"
                value={value}
                label="NationState"
                onChange={handleChange}
                sx={{
                    backgroundColor: 'white',
                }}
            >
                {gameState.nations.map(nation => (
                    <MenuItem key={`select-option-${nation.props.name}`} value={nation.props.name}>{nation.props.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default TeamPicker;