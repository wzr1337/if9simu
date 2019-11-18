import { IPosition } from "./position";
export interface IWaypoint {
    timestamp: Date;
    odometer: number;
    fuelConsumption?: any;
    electricalConsumption?: any;
    electricalRegeneration?: any;
    position: IPosition;
}
