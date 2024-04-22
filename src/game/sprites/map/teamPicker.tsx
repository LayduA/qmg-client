import React, {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Nation, NationName} from "../../logic/player/nation";

function TeamPicker({setNation}: { setNation: Function }) {
    const [value, setValue] = useState<string>('GERMANY');

    const handleChange = (event: any) => {
        setValue(event.target.value);
        setNation(Nation.NATIONS[Number(NationName[event.target.value])]);
    }
    return (
        <FormControl sx={{
            position: "absolute",
        }}>
            <InputLabel id="nation-select-label">Nation</InputLabel>
            <Select
                labelId="nation-select-label"
                id="nation-select"
                value={value}
                label="Nation"
                onChange={handleChange}
                sx={{
                    backgroundColor: 'white',
                }}
            >
                {Object.keys(NationName).filter((key) => isNaN(Number(key))).map((nation) => (
                    <MenuItem key={`select-option-${nation}`} value={nation}>{nation}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default TeamPicker;