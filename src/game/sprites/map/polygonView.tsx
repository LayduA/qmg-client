import React, {MouseEventHandler} from "react";
import {utils} from "../../../utils";
import {Box} from "@mui/material";

export type Point = [number, number]

type PolygonProps = {
    points: Point[],
    scale: number,
    color?: string,
    opacity?: number,
    borderStyle?: {
        color: string,
        width: number
    },
    textOnHover?: string,
    onClick?: MouseEventHandler
}

function PolygonView(props: PolygonProps) {

    const minX = Math.min(...props.points.map((point) => point[0]))
    const maxX = Math.max(...props.points.map((point) => point[0]))

    const minY = Math.min(...props.points.map((point) => point[1]))
    const maxY = Math.max(...props.points.map((point) => point[1]))

    const width = maxX - minX
    const height = maxY - minY

    let pointsStr = ''
    for (const point of props.points) {
        pointsStr += `${Math.round(point[0] - minX)} ${Math.round(point[1] - minY)} `
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                marginLeft: minX/8, // TODO: ??????
                marginTop: minY/8,
                width: width,
                height: height,
            }}
        >
            <svg viewBox={`0 0 ${width} ${height}`}
                 xmlns="http://www.w3.org/2000/svg"
            >
                <polygon
                    points={pointsStr.trim()}
                    stroke={props.borderStyle?.color ?? 'transparent'}
                    strokeWidth={props.borderStyle?.width ?? 0}
                    fill={props.color ?? 'black'}
                    opacity={props.opacity ?? 0.5}
                    onClick={props.onClick}
                >
                    <title>{props.textOnHover ? utils.capitalize(props.textOnHover) : 'Polygone sans label'}</title>
                </polygon>
            </svg>
        </Box>
    )
}

export default PolygonView