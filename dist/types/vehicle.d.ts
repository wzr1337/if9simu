export interface IVehicle {
    userId: string;
    vin: string;
    role: "Primary";
}
export interface IEventStatus {
    status: string;
    statusTimestamp: string;
    startTime: string;
    serviceType: string;
    failureDescription: string;
    customerServiceId: string;
    vehicleId: string;
    active: true;
    initiator: "USER";
    eventTrigger: null;
    serviceCommand: null;
    serviceParameters: null;
}
export interface IVehicleStatus {
    vehicleStatus: {
        coreStatus: ICoreStatus;
        evStatus: IEvStatus;
    };
    vehicleAlerts: IVehicleAlerts;
    lastUpdatedTime: string;
}
export interface IGeoLocation {
    position: {
        longitude: number;
        latitude: number;
        timestamp: string;
        speed: number;
        heading: number;
        positionQuality: null;
    };
    calculatedPosition: {
        longitude: number;
        latitude: number;
        timestamp: string;
        speed: number;
        heading: number;
        positionQuality: null;
    };
}
export interface IAvailableService {
    serviceType: string;
    vehicleCapable: boolean;
    serviceEnabled: boolean;
}
export interface ICapability {
    capability: string;
    capabilityClass: string;
}
export interface ITelematicsDevice {
    serialNumber: string;
    imei?: any;
}
export interface IAttributes {
    engineCode: string;
    seatsQuantity: number;
    exteriorColorName: string;
    exteriorCode: string;
    interiorColorName?: any;
    interiorCode?: any;
    tyreDimensionCode?: any;
    tyreInflationPressureLightCode?: any;
    tyreInflationPressureHeavyCode?: any;
    fuelType: string;
    fuelTankVolume?: any;
    grossWeight: number;
    modelYear: number;
    constructionDate?: any;
    deliveryDate?: any;
    numberOfDoors: number;
    country: string;
    registrationNumber: string;
    carLocatorMapDistance?: any;
    vehicleBrand: string;
    vehicleType: string;
    vehicleTypeCode: string;
    bodyType: string;
    gearboxCode: string;
    availableServices: IAvailableService[];
    timeFullyAccessible?: any;
    timePartiallyAccessible?: any;
    subscriptionType?: any;
    capabilities: ICapability[];
    nickname: string;
    telematicsDevice: ITelematicsDevice;
    deviceState: string;
    roofType: string;
}
export interface ICoreStatus {
    tuStatusPrimaryVolt?: string;
    tuStatusPrimaryChargePercent?: string;
    extExhaustFluidDistanceToServiceKm?: string;
    tuStatusGsmModem?: string;
    doorIsAllDoorsLocked?: string;
    climateStatusTimer1Day?: string;
    tuStatusImei?: string;
    batteryStatus?: string;
    washerFluidWarn?: string;
    doorFrontLeftPosition?: string;
    tuStatusGnssAntenna?: string;
    doorRearRightPosition?: string;
    tuStatusSleepCyclesStartTime?: Date;
    engineCoolantTemp?: string;
    climateStatusRemainingRuntime?: string;
    distanceToEmptyFuel?: string;
    odometerMilesResolution?: string;
    tyreStatusRearLeft?: string;
    odometerMiles?: string;
    tuStatusSecondaryVolt?: string;
    srsStatus?: string;
    doorRearRightLockStatus?: string;
    isPanicAlarmTriggered?: string;
    brakeFluidWarn?: string;
    doorFrontRightPosition?: string;
    drvSeatThirdRowInhibition?: string;
    doorRearLeftLockStatus?: string;
    tuStatusMobilePhoneConnected?: string;
    drvSeatThirdRowStatus?: string;
    extOilLevelWarn?: string;
    tuStatusSwVersionConfig?: string;
    tuStatusMic?: string;
    doorEngineHoodPosition?: string;
    tuStatusPower?: string;
    extBulbStatusLeftTurnAny?: string;
    engCoolantLevelWarn?: string;
    tuStatusIntRtc?: string;
    windowRearRightStatus?: string;
    windowFrontRightStatus?: string;
    tyreStatusFrontLeft?: string;
    theftAlarmStatus?: string;
    isSunroofOpen?: string;
    ODOMETER?: string;
    extKilometersToService?: string;
    pasSeatSecondRowStatus?: string;
    tuStatusDaysSinceGnssFix?: string;
    tuStatusButtons?: string;
    pasSeatThirdRowStatus?: string;
    doorEngineHoodLockStatus?: string;
    vehicleStateType?: string;
    tyreStatusFrontRight?: string;
    climateStatusTimer1Minute?: string;
    tuStatusExtPower?: string;
    tuStatusHandset?: string;
    brazilEventMode?: string;
    doorFrontRightLockStatus?: string;
    isCrashSituation?: string;
    tyrePressureRearRight?: string;
    climateStatusTimer2Day?: string;
    tuStatusConfigVersion?: string;
    doorFrontLeftLockStatus?: string;
    windowRearLeftStatus?: string;
    pasSeatFirstRowInhibition?: string;
    drvSeatSecondRowStatus?: string;
    tuStatusExtHandsfree?: string;
    pasSeatFirstRowStatus?: string;
    climateStatusFfhRemainingRuntime?: string;
    climateStatusVentingTime?: string;
    tyrePressureFrontRight?: string;
    fuelLevelPerc?: string;
    climateStatusTimer2Month?: string;
    extExhaustFluidVolumeRefillLitresx10?: string;
    pasSeatThirdRowInhibition?: string;
    extExhaustFluidWarn?: string;
    doorIsBootLocked?: string;
    tuStatusSwVersionSecondary?: string;
    doorBootPosition?: string;
    isHeadLightsOn?: string;
    tuStatusCrashInput?: string;
    climateStatusTimer2Minute?: string;
    tyrePressureFrontLeft?: string;
    isCabOpen?: string;
    odometerMeterResolution?: string;
    tuStatusUsesExternalGnss?: string;
    climateStatusTimer2Hour?: string;
    tuStatusGsmExtAntenna?: string;
    odometerMeter?: string;
    batteryVoltage?: string;
    tuStatusSpeaker?: string;
    tyrePressureRearLeft?: string;
    engineBlock?: string;
    climateStatusTimerActivationStatus?: string;
    tuStatusGnss?: string;
    tuStatusIntPower?: string;
    tuStatusSwVersionMain?: string;
    tuStatusHwVersion?: string;
    pasSeatSecondRowInhibition?: string;
    windowFrontLeftStatus?: string;
    climateStatusOperatingStatus?: string;
    doorRearLeftPosition?: string;
    climateStatusTimer1Hour?: string;
    climateStatusTimer1Month?: string;
    extParticulateFilterWarn?: string;
    tyreStatusRearRight?: string;
    tuStatusSerialNumber?: string;
    drvSeatSecondRowInhibition?: string;
    tuActivationStatus?: string;
    doorBootLockStatus?: string;
    tuStatusCan?: string;
    privacySwitch?: string;
    serviceMode?: string;
}
export interface IEvStatus {
    evIsPluggedIn?: string;
    evIsCharging?: string;
    evIsPreconditioning?: string;
    evChargeType?: string;
    evChargingStatus?: string;
    evChargingMethod?: string;
}
export interface IVehicleAlert {
    value: string;
    lastUpdatedTime: Date;
    isActive: boolean;
}
export interface IVehicleAlerts {
    transportMode?: IVehicleAlert;
    engineOn?: IVehicleAlert;
    fuelLevelLtrs?: IVehicleAlert;
    remoteClimate?: IVehicleAlert;
    [alert: string]: IVehicleAlert;
}
