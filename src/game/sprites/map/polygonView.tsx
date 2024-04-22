import React, {MouseEventHandler} from "react";
import {utils} from "../../../utils";

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

    let pointsStr = ''
    for (const point of props.points) {
        pointsStr += `${Math.round(point[0] * props.scale)} ${Math.round(point[1] * props.scale)} `
    }
    return (
        <polygon
            style={{
                position: 'relative',
            }}
            points={pointsStr.trim()}
            stroke={props.borderStyle?.color ?? 'transparent'}
            strokeWidth={props.borderStyle?.width ?? 0}
            fill={props.color ?? 'black'}
            onClick={props.onClick}
            opacity={props.opacity ?? 0.5}
        >
            <title>{props.textOnHover ? utils.capitalize(props.textOnHover) : 'Polygone sans label'}</title>
        </polygon>
    )
}

export default PolygonView