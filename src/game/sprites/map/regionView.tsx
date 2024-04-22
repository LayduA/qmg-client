import {Region} from "../../logic/map/region";
import PolygonView from "./polygonView";
import React, {forwardRef, MouseEvent, ReactElement, Ref, useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from "@mui/material";
import Slide from "@mui/material/Slide";
import {TransitionProps} from "@mui/material/transitions";
import {HighlightedRegion} from "./boardView";
import {TroopType} from "../../logic/troop";
import TroopView from "../troopView";
import {NATIONS} from "../../logic/player/nation";

type RegionViewProps = {
    region: Region
    scale: number
    highlightColor?: string
    updateHighlightedRegions: [addHighlightedRegion: (region: HighlightedRegion) => void, removeHighlightedRegion: (region: HighlightedRegion) => void]
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function RegionView({region, scale, highlightColor, updateHighlightedRegions}: RegionViewProps) {
    const [open, setOpen] = useState(false);
    const [troops, setTroops] = useState(region.getTroops(NATIONS))

    const [addHighlightedRegion, removeHighlightedRegion] = updateHighlightedRegions;
    const handleClose = (event: MouseEvent<any>) => {
        event.stopPropagation();
        removeHighlightedRegion({regionName: region.props.name});
        setOpen(false)
    };
    const handleOpen = () => {
        //setOpen(true);
        addHighlightedRegion({regionName: region.props.name, color: 'white'});
    };

    return (
        <>
            <PolygonView
                points={region.props.points}
                scale={scale}
                color={highlightColor ?? 'black'}
                opacity={highlightColor ? 0.5 : 0}
                textOnHover={region.props.name}
                onClick={(event) => {
                    event.stopPropagation();
                    handleOpen();
                    if (troops.length === 0) {
                        region.addTroop({nation: NATIONS[0], type: TroopType.ARMY});
                        setTroops(region.getTroops(NATIONS))
                    } else {
                        region.removeTroop(troops[0].props)
                        setTroops(region.getTroops(NATIONS))
                    }
                }}/>
            {troops.map((troop) => (
                <TroopView
                    key={`troop-${region.props.name}-${troop.props.nation}`}
                    troop={troop}
                    scale={scale}
                />
            ))}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    alignItems: 'center',
                }}
            >
                <DialogTitle sx={{textTransform: 'capitalize'}} align={'center'}>{region.props.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {`Régions adjacentes: ${region.props.neighbors.join(', ')}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default RegionView;
