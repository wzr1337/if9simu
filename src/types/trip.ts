import { IPosition } from "./position";

export interface IBoundingBox {
    minLongitude: number;
    minLatitude: number;
    maxLongitude: number;
    maxLatitude: number;
}

export interface IRouteDetails {
    totalWaypoints: number;
    boundingBox: IBoundingBox;
}

export interface IScore {
    score: number;
    scoreStatus: string;
}

export interface ITripDetails {
    electricalConsumption?: any;
    electricalRegeneration?: any;
    fuelConsumption?: any;
    distance: number;
    startOdometer: number;
    startTime: Date;
    startPosition: IPosition;
    endOdometer: number;
    endTime: Date;
    endPosition: IPosition;
    totalEcoScore: IScore;
    throttleEcoScore: IScore;
    speedEcoScore: IScore;
    brakeEcoScore: IScore;
    averageSpeed: number;
    averageFuelConsumption: number;
}

export interface ITrip {
    id: number;
    name?: any;
    category?: any;
    routeDetails: IRouteDetails;
    tripDetails: ITripDetails;
}
