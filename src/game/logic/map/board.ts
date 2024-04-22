import {Region, RegionProps} from "./region";

export enum RegionName {
    GERMANY = 'Allemagne',
    WESTERN_EUROPE = 'Europe de l\'Ouest',
    EASTERN_EUROPE = 'Europe de l\'Est',
    RUSSIA = 'Russie',
    UKRAINE = 'Ukraine',
    KAZAKHSTAN = 'Kazakhstan',
    SIBERIA = 'Siberia',
    DUMMY = 'DUMMY',
}

const regionsInfo: RegionProps[] = [
    {
        name: RegionName.GERMANY,
        neighbors: [RegionName.WESTERN_EUROPE, RegionName.EASTERN_EUROPE],
        color: 'grey',
        isSupplyZone: true,
        isOcean: false,
        anchor: [560, 250],
        points: [
            [572, 194],
            [578, 195],
            [580, 198],
            [591, 194],
            [595, 201],
            [599, 201],
            [617, 191],
            [625, 196],
            [631, 190],
            [635, 189],
            [636, 184],
            [648, 190],
            [649, 202],
            [637, 208],
            [618, 206],
            [609, 216],
            [610, 222],
            [627, 233],
            [630, 250],
            [619, 257],
            [619, 268],
            [606, 281],
            [588, 281],
            [579, 276],
            [576, 280],
            [555, 281],
            [552, 258],
            [544, 245],
            [546, 239],
            [548, 227],
            [555, 223],
            [558, 214],
            [571, 207]
        ]
    },
    {
        name: RegionName.WESTERN_EUROPE,
        neighbors: [RegionName.GERMANY],
        color: 'green',
        isSupplyZone: true,
        isOcean: false,
        anchor: [495, 280],
        points: [
            [573, 161],
            [577, 163],
            [577, 175],
            [571, 186],
            [572, 194],
            [571, 207],
            [558, 214],
            [555, 223],
            [548, 227],
            [546, 239],
            [544, 245],
            [552, 258],
            [555, 281],
            [543, 298],
            [550, 314],
            [540, 328],
            [517, 320],
            [516, 330],
            [495, 349],
            [498, 359],
            [485, 372],
            [456, 373],
            [436, 363],
            [434, 348],
            [441, 330],
            [442, 295],
            [452, 290],
            [492, 302],
            [496, 273],
            [484, 255],
            [477, 252],
            [477, 245],
            [486, 243],
            [495, 248],
            [494, 237],
            [504, 242],
            [513, 234],
            [517, 226],
            [530, 219],
            [540, 201],
            [564, 195],
            [563, 173]
        ]
    },
    {
        name: RegionName.EASTERN_EUROPE,
        neighbors: [RegionName.GERMANY, RegionName.RUSSIA, RegionName.UKRAINE],
        color: 'green',
        isSupplyZone: false,
        isOcean: false,
        anchor: [620, 215],
        points: [
            [645, 261],
            [632, 262],
            [628, 267],
            [619, 268],
            [620, 257],
            [630, 250],
            [627, 233],
            [610, 222],
            [610, 216],
            [618, 206],
            [637, 208],
            [649, 202],
            [648, 190],
            [636, 184],
            [634, 171],
            [642, 162],
            [651, 170],
            [654, 160],
            [649, 156],
            [650, 143],
            [672, 145],
            [677, 185],
            [672, 189],
            [676, 203],
            [665, 240],
            [655, 249],
            [645, 248],
        ]
    },
    {
        name: RegionName.RUSSIA,
        neighbors: [RegionName.EASTERN_EUROPE, RegionName.UKRAINE, RegionName.SIBERIA],
        color: 'green',
        isSupplyZone: false,
        isOcean: false,
        anchor: [730, 150],
        points: [
            [680, 100],
            [780, 100],
            [780, 200],
            [680, 200]
        ]
    },
    {
        name: RegionName.UKRAINE,
        neighbors: [RegionName.EASTERN_EUROPE, RegionName.RUSSIA, RegionName.KAZAKHSTAN],
        color: 'green',
        isSupplyZone: true,
        isOcean: false,
        anchor: [730, 250],
        points: [
            [680, 200],
            [780, 200],
            [780, 300],
            [680, 300]
        ]
    },
    {
        name: RegionName.KAZAKHSTAN,
        neighbors: [RegionName.UKRAINE, RegionName.SIBERIA],
        color: 'green',
        isSupplyZone: false,
        isOcean: false,
        anchor: [830, 250],
        points: [
            [800, 200],
            [900, 200],
            [900, 300],
            [800, 300]
        ]
    },
    {
        name: RegionName.SIBERIA,
        neighbors: [RegionName.KAZAKHSTAN, RegionName.RUSSIA],
        color: 'green',
        isSupplyZone: false,
        isOcean: false,
        anchor: [880, 150],
        points: [
            [830, 100],
            [930, 100],
            [930, 200],
            [830, 200]
        ]
    },
];

export type Board = Region[]
export const board: Board = regionsInfo.map((props) => new Region(props));

export function getRegion(regionName: RegionName): Region {
    return getRegions([regionName])[0];
}

export function getRegions(regionNames: RegionName[]): Region[] {
    return regionNames.map((regionName) => {
        const region = board.find((reg) => reg.props.name === regionName);
        if (!region) throw new Error(`Unknown region ${regionName}`);
        return region;
    });
}
