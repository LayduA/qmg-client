import {Box, Typography} from "@mui/material";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {Nation} from "../logic/player/nation";

enum flags{
    GERMANY = '\uD83D\uDE00'
}

type PlayerProps = {
    name?: string,
    nations: Nation[]
}
function PlayerCard({ name, nations }: PlayerProps) {
    return (
        <Box
            key={`player-card-${name ?? nations[0]}`}
            sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '2%'
        }}>
            <Typography variant={'h2'}> {name ?? JSON.stringify(nations)}</Typography><span className={'fi fi-de'}></span>
        </Box>
    )
}

export default PlayerCard;