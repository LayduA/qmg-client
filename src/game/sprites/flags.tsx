import Box from "@mui/material/Box/Box";

export function GermanyFlag({sx}: any) {
    return (
        <Box
            sx={sx}
            alignContent={'center'}
        >
            <svg viewBox={`0 0 30 20`}>
                <polygon points="0 0 30 0 30 20 0 20" fill="red"/>
                <circle cx={15} cy={10} r={7} fill="white"/>
                <polygon
                    points="15 6 21 6 21 8 17 8 17 10 21 10 21 16 19 16 19 12 17 12 17 16 11 16 11 14 15 14 15 12 11 12 11 6 13 6 13 10 15 10"
                    fill="black"
                    transform="rotate(45,15,10) translate(-1.0, -1.0)"/>
            </svg>
        </Box>
    )
}