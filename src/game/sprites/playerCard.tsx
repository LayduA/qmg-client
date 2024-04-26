import {Box, Typography} from "@mui/material";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {NationState} from "../logic/state/nationState";

enum Flag {
    GERMANY = 'fi fi de'
}

type PlayerProps = {
    name?: string,
    nations: NationState[]
}

function PlayerCard({name, nations}: PlayerProps) {
    return (
        <Box
            key={`player-card-${name ?? nations[0]}`}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2%'
            }}>
            <Typography variant={'h2'}> {name ?? JSON.stringify(nations)}</Typography><span
            className={Flag.GERMANY}></span>
        </Box>
    )
}

export default PlayerCard;