import {RegionName, RegionProps} from "./region";

export const REGIONS: RegionProps[] = [
    {
        name: RegionName.WESTERN_EUROPE,
        neighbors: [RegionName.GERMANY, RegionName.NORTH_SEA, RegionName.ITALY],
        color: 'DarkOliveGreen',
        isSupplyZone: false, //TODO: change
        isOcean: false,
        anchor: [520, 280],
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
        name: RegionName.GERMANY,
        neighbors: [RegionName.WESTERN_EUROPE, RegionName.EASTERN_EUROPE, RegionName.ITALY],
        color: 'grey',
        isSupplyZone: true,
        isOcean: false,
        anchor: [590, 250],
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
        name: RegionName.ITALY,
        neighbors: [RegionName.WESTERN_EUROPE, RegionName.GERMANY],
        color: 'purple',
        isSupplyZone: true,
        isOcean: false,
        anchor: [600, 350],
        points: [
            [550, 300],
            [650, 300],
            [650, 400],
            [550, 400]
        ]
    },
    {
        name: RegionName.EASTERN_EUROPE,
        neighbors: [RegionName.GERMANY, RegionName.RUSSIA, RegionName.UKRAINE],
        color: 'DarkOliveGreen',
        isSupplyZone: false,
        isOcean: false,
        anchor: [650, 215],
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
        color: 'DarkOliveGreen',
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
        color: 'DarkOliveGreen',
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
        color: 'DarkOliveGreen',
        isSupplyZone: false,
        isOcean: false,
        anchor: [830, 255],
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
        color: 'DarkOliveGreen',
        isSupplyZone: false,
        isOcean: false,
        anchor: [880, 160],
        points: [
            [830, 100],
            [930, 100],
            [930, 200],
            [830, 200]
        ]
    },
    {
        name: RegionName.NORTH_ATLANTIC,
        neighbors: [RegionName.SOUTH_ATLANTIC, RegionName.NORTH_SEA, RegionName.EASTERN_UNITED_STATES, RegionName.LATIN_AMERICA],
        color: 'blue',
        isSupplyZone: false,
        isOcean: true,
        anchor: [250, 350],
        points: [
            [230, 300],
            [330, 300],
            [330, 400],
            [230, 400]
        ]
    },
    {
        name: RegionName.NORTH_SEA,
        neighbors: [RegionName.SOUTH_ATLANTIC, RegionName.WESTERN_EUROPE, RegionName.NORTH_ATLANTIC],
        color: 'blue',
        isSupplyZone: false,
        isOcean: true,
        anchor: [400, 250],
        points: [
            [380, 200],
            [480, 200],
            [480, 300],
            [380, 300]
        ]
    },
    {
        name: RegionName.SOUTH_ATLANTIC,
        neighbors: [RegionName.NORTH_SEA, RegionName.NORTH_ATLANTIC, RegionName.LATIN_AMERICA],
        color: 'blue',
        isSupplyZone: false,
        isOcean: true,
        anchor: [450, 650],
        points: [
            [400, 600],
            [500, 600],
            [500, 700],
            [400, 700]
        ]
    },
    {
        name: RegionName.EASTERN_UNITED_STATES,
        neighbors: [RegionName.NORTH_ATLANTIC],
        color: 'blue',
        isSupplyZone: true,
        isOcean: false,
        anchor: [150, 250],
        points: [
            [100, 200],
            [200, 200],
            [200, 300],
            [100, 300]
        ]
    },

    {
        name: RegionName.LATIN_AMERICA,
        neighbors: [RegionName.NORTH_ATLANTIC, RegionName.SOUTH_ATLANTIC],
        color: 'DarkOliveGreen',
        isSupplyZone: false,
        isOcean: false,
        anchor: [280, 550],
        points: [
            [230, 500],
            [330, 500],
            [330, 600],
            [230, 600]
        ]
    },
];