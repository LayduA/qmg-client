export enum NationName {
    GERMANY,
    UK,
    JAPAN,
    USSR,
    ITALY,
    USA
}

enum Team {
    AXIS,
    ALLIES
}
export type Nation = {
    name: NationName,
    color: string,
    team: Team
}

export const NATIONS: Nation[] = [
    {name: NationName.GERMANY, color: 'darkgrey', team: Team.AXIS},
    {name: NationName.UK, color: 'yellow', team: Team.ALLIES},
    {name: NationName.JAPAN, color: 'lightgrey', team: Team.AXIS},
    {name: NationName.USSR, color: 'red', team: Team.ALLIES},
    {name: NationName.ITALY, color: 'purple', team: Team.AXIS},
    {name: NationName.USA, color: 'green', team: Team.ALLIES},
]