import {Update} from "./update";
import {Region} from "../map/region";
import {Player} from "../player/player";

enum UpdateArmyType {
    Build = 'BUILD', // Must be supplied
    Recruit = 'RECRUIT', // Doesn't need supply
    Destroy = 'DESTROY', // By battle
    Eliminate = 'ELIMINATE', // Not by battle
    Move = 'MOVE', // Only by using a construction card with no piece left OR cards

}
export class UpdateArmy extends Update{

    public readonly region: Region;
    public readonly type: UpdateArmyType;
    public readonly targetPlayer: Player;
    public constructor(region: Region, type: UpdateArmyType, targetPlayer: Player) {
        super();
        this.region = region;
        this.type = type;
        this.targetPlayer = targetPlayer;
    }

    public static build(region: Region, targetPlayer: Player): UpdateArmy {
        return new UpdateArmy(region, UpdateArmyType.Build, targetPlayer);
    }

}