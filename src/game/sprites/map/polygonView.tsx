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
    centered?: boolean
    lineOnly?: boolean
}

function PolygonView(props: PolygonProps) {

    const minX = Math.min(...props.points.map((point) => point[0])) - (props.borderStyle?.width ?? 0)
    const maxX = Math.max(...props.points.map((point) => point[0])) + (props.borderStyle?.width ?? 0)

    const minY = Math.min(...props.points.map((point) => point[1])) - (props.borderStyle?.width ?? 0)
    const maxY = Math.max(...props.points.map((point) => point[1])) + (props.borderStyle?.width ?? 0)

    const width = Math.max(maxX - minX, 8);
    const height = Math.max(maxY - minY, 8);

    const centered = !!props.centered;

    let pointsStr = ''
    for (const point of props.points) {
        pointsStr += `${Math.round(point[0] - minX)} ${Math.round(point[1] - minY)} `
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                marginLeft: (minX) / 8 - (centered ? width / 16 : 0), // TODO: ??????
                marginTop: (minY) / 8 - (centered ? height / 16 : 0),
                width: width,
                height: height,
            }}
        >
            <svg viewBox={`0 0 ${width} ${height}`}
                 xmlns="http://www.w3.org/2000/svg"
                 display={'block'}
            >
                {!props.lineOnly && <polygon
                    points={pointsStr.trim()}
                    stroke={props.borderStyle?.color ?? 'transparent'}
                    strokeWidth={props.borderStyle?.width ?? 0}
                    fill={props.color ?? 'black'}
                    opacity={props.opacity ?? 0.5}
                    onClick={props.onClick}
                >
                    <title>{props.textOnHover ? utils.capitalize(props.textOnHover) : 'Polygone sans label'}</title>
                </polygon>}
                {props.lineOnly && <polyline
                    points={pointsStr.trim()}
                    stroke={props.borderStyle?.color ?? 'transparent'}
                    strokeWidth={props.borderStyle?.width ?? 0}
                    opacity={props.opacity ?? 0.5}
                    fill={'none'}
                    strokeDasharray={'4'}
                    style={{
                        animation: 'alternate'
                    }}
                >
                    <animate
                        id={'p1'}
                        attributeName={'stroke-dashoffset'}
                        values={"40;0"}
                        dur={"2s"}
                        calcMode={"linear"}
                        repeatCount={'indefinite'}
                    />
                </polyline>}

            </svg>
        </Box>
    )
}

export default PolygonView