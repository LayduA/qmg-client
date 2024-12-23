import {Update} from "./update";
import {GameState} from "../gameState";
import {NationName, NationState} from "../nationState";
import {TroopType} from "../../map/troop";
import {RegionName} from "../../map/region";

enum UpdateArmyType {
    Build = 'BUILD', // Must be supplied
    Recruit = 'RECRUIT', // Doesn't need supply
    Destroy = 'DESTROY', // By battle
    Eliminate = 'ELIMINATE', // Not by battle
    Move = 'MOVE', // Only by using a construction card with no piece left OR cards

}

type AdditionalParam = { troopType: TroopType }

export class UpdateArmy extends Update {

    public readonly regionName: RegionName;
    public readonly updateArmyType: UpdateArmyType;
    public readonly targetNation: NationName;
    public readonly additionalParameters;

    //public readonly Trigger[]

    public constructor(regionName: RegionName, updateArmyType: UpdateArmyType, targetNation: NationName, additionalParameters: AdditionalParam) {
        super();
        this.regionName = regionName;
        this.updateArmyType = updateArmyType;
        this.targetNation = targetNation;
        this.additionalParameters = additionalParameters;
    }

    public static build(regionName: RegionName, targetNation: NationName, troopType: TroopType): UpdateArmy {
        return new UpdateArmy(regionName, UpdateArmyType.Build, targetNation, {troopType: troopType});
        //Triggers....
    }

    public static destroy(regionName: RegionName, targetNation: NationName, troopType: TroopType): UpdateArmy {
        return new UpdateArmy(regionName, UpdateArmyType.Destroy, targetNation, {troopType: troopType});
    }

    public apply(previousState: GameState): GameState {
        let newNationState: NationState | null = null;
        switch (this.updateArmyType) {
            case UpdateArmyType.Build:
                newNationState = previousState.getNation(this.targetNation).addTroop(this.additionalParameters.troopType, this.regionName);
                return previousState.updateNation(newNationState);
            case UpdateArmyType.Destroy:
                newNationState = previousState.getNation(this.targetNation).removeTroop(this.additionalParameters.troopType, this.regionName);
                return previousState.updateNation(newNationState);
            default:
                return previousState;
        }
    }

}