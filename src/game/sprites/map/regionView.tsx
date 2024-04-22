import {Region} from "../../logic/map/region";
import PolygonView from "./polygonView";
import React, {forwardRef, MouseEvent, ReactElement, Ref, useEffect, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from "@mui/material";
import Slide from "@mui/material/Slide";
import {TransitionProps} from "@mui/material/transitions";
import {HighlightedRegion} from "./boardView";
import {Troop, TroopType} from "../../logic/troop";
import TroopView from "../troopView";
import {NationName, NATIONS} from "../../logic/player/nation";
import {RegionName} from "../../logic/map/board";

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

    const [addHighlightedRegion, removeHighlightedRegion] = updateHighlightedRegions;
    const handleClose = (event: MouseEvent<any>) => {
        event.stopPropagation();
        removeHighlightedRegion({name: region.props.name});
        setOpen(false)
    };
    const handleOpen = () => {
        setOpen(true);
        addHighlightedRegion({name: region.props.name, color: 'white'});
    };

    return (
        <div>
            <PolygonView
                points={region.props.points}
                scale={scale}
                color={highlightColor ?? region.props.color}
                opacity={0.4 ?? highlightColor ? 0.5 : 0}
                textOnHover={region.props.name}
                onClick={(event) => {
                    //handleOpen();
                    if (region.troops.length === 0) {
                        region.addTroop({
                            nation: region.props.name === RegionName.EASTERN_UNITED_STATES ? NATIONS[NationName.GERMANY] : NATIONS[NationName.GERMANY],
                            type: region.props.isOcean ? TroopType.NAVY : TroopType.ARMY});
                        addHighlightedRegion({name: region.props.name, color: 'white'});
                        removeHighlightedRegion({name: region.props.name});
                        //setTroops(region.troops)
                    } else {
                        region.removeTroop(region.troops[0].props)
                        addHighlightedRegion({name: region.props.name, color: 'white'});
                        removeHighlightedRegion({name: region.props.name});

                        //setTroops(region.getTroops(NATIONS))
                    }
                }}/>
            {region.troops.map((troop) => (
                <TroopView
                    key={`troop-${region.props.name}-${troop.props.nation}`}
                    troop={troop}
                    scale={scale}
                />
            ))}
            {getDialog(open, region, handleClose)}
        </div>
    );
}

export default RegionView;

function getDialog(open: boolean, region:Region, handleClose: any ) {
    return (
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
    )
}