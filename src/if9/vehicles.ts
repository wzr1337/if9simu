import { Request, Response } from "express";

export function getVehicles(req: Request, res: Response) {
  const resp = [{
      role: "Primary",
      userId: "166EA507BA6",
      vin: "SADFA2AN2J1Z23299",
    },
  ];
  res.status(200).json({
    vehicles: resp,
  });
}

export function getVehicleStatus(req: Request, res: Response) {
  return res.status(200).json({
    vehicleStatus: {
      coreStatus: [{
          key: "TU_STATUS_PRIMARY_VOLT",
          value: "4.1000000000000005",
        },
        {
          key: "TU_STATUS_PRIMARY_CHARGE_PERCENT",
          value: "90",
        },
        {
          key: "EXT_EXHAUST_FLUID_DISTANCE_TO_SERVICE_KM",
          value: "5300",
        },
        {
          key: "DOOR_IS_ALL_DOORS_LOCKED",
          value: "TRUE",
        },
        {
          key: "TU_STATUS_GSM_MODEM",
          value: "FUNCTIONING",
        },
        {
          key: "TU_STATUS_IMEI",
          value: "358492071374034",
        },
        {
          key: "CLIMATE_STATUS_TIMER1_DAY",
          value: "0",
        },
        {
          key: "BATTERY_STATUS",
          value: "BATTERY_1_1",
        },
        {
          key: "WASHER_FLUID_WARN",
          value: "NORMAL",
        },
        {
          key: "DOOR_FRONT_LEFT_POSITION",
          value: "CLOSED",
        },
        {
          key: "TU_STATUS_SLEEP_CYCLES_START_TIME",
          value: "2019-11-15T12:35:54.000Z",
        },
        {
          key: "DOOR_REAR_RIGHT_POSITION",
          value: "CLOSED",
        },
        {
          key: "TU_STATUS_GNSS_ANTENNA",
          value: "FUNCTIONING",
        },
        {
          key: "ENGINE_COOLANT_TEMP",
          value: "97",
        },
        {
          key: "DISTANCE_TO_EMPTY_FUEL",
          value: "269",
        },
        {
          key: "CLIMATE_STATUS_REMAINING_RUNTIME",
          value: "30",
        },
        {
          key: "ODOMETER_MILES_RESOLUTION",
          value: "false",
        },
        {
          key: "SERVICE_MODE_START",
          value: "1970-01-01T00:00:00+0000",
        },
        {
          key: "TYRE_STATUS_REAR_LEFT",
          value: "NORMAL",
        },
        {
          key: "ODOMETER_MILES",
          value: "7586",
        },
        {
          key: "TU_STATUS_SECONDARY_VOLT",
          value: "0.0",
        },
        {
          key: "ARM_REST_SECOND_ROW_STATUS",
          value: "UNKNOWN",
        },
        {
          key: "SRS_STATUS",
          value: "SRS_NOT_DEPLOYED",
        },
        {
          key: "DOOR_REAR_RIGHT_LOCK_STATUS",
          value: "LOCKED",
        },
        {
          key: "IS_PANIC_ALARM_TRIGGERED",
          value: "UNKNOWN",
        },
        {
          key: "DOOR_FRONT_RIGHT_POSITION",
          value: "CLOSED",
        },
        {
          key: "BRAKE_FLUID_WARN",
          value: "NORMAL",
        },
        {
          key: "DRV_SEAT_THIRD_ROW_INHIBITION",
          value: "UNKNOWN",
        },
        {
          key: "DOOR_REAR_LEFT_LOCK_STATUS",
          value: "LOCKED",
        },
        {
          key: "TU_STATUS_MOBILE_PHONE_CONNECTED",
          value: "TRUE",
        },
        {
          key: "TU_STATUS_SW_VERSION_CONFIG",
          value: "J7A3-70713-AN",
        },
        {
          key: "EXT_OIL_LEVEL_WARN",
          value: "NORMAL",
        },
        {
          key: "DRV_SEAT_THIRD_ROW_STATUS",
          value: "UNKNOWN",
        },
        {
          key: "TU_STATUS_MIC",
          value: "FUNCTIONING",
        },
        {
          key: "TU_STATUS_POWER",
          value: "MAIN_BATTERY",
        },
        {
          key: "DOOR_ENGINE_HOOD_POSITION",
          value: "CLOSED",
        },
        {
          key: "TRANSPORT_MODE_START",
          value: "1970-01-01T00:00:00+0000",
        },
        {
          key: "EXT_BULB_STATUS_LEFT_TURN_ANY",
          value: "0",
        },
        {
          key: "ENG_COOLANT_LEVEL_WARN",
          value: "NORMAL",
        },
        {
          key: "WINDOW_FRONT_RIGHT_STATUS",
          value: "CLOSED",
        },
        {
          key: "WINDOW_REAR_RIGHT_STATUS",
          value: "CLOSED",
        },
        {
          key: "TU_STATUS_INT_RTC",
          value: "FUNCTIONING",
        },
        {
          key: "TYRE_STATUS_FRONT_LEFT",
          value: "NORMAL",
        },
        {
          key: "THEFT_ALARM_STATUS",
          value: "ALARM_ARMED",
        },
        {
          key: "IS_SUNROOF_OPEN",
          value: "FALSE",
        },
        {
          key: "ODOMETER",
          value: "12209000",
        },
        {
          key: "EXT_KILOMETERS_TO_SERVICE",
          value: "9039",
        },
        {
          key: "TU_STATUS_DAYS_SINCE_GNSS_FIX",
          value: "3",
        },
        {
          key: "PAS_SEAT_SECOND_ROW_STATUS",
          value: "UNKNOWN",
        },
        {
          key: "TU_STATUS_BUTTONS",
          value: "FUNCTIONING",
        },
        {
          key: "PAS_SEAT_THIRD_ROW_STATUS",
          value: "UNKNOWN",
        },
        {
          key: "VEHICLE_STATE_TYPE",
          value: "KEY_REMOVED",
        },
        {
          key: "DOOR_ENGINE_HOOD_LOCK_STATUS",
          value: "LOCKED",
        },
        {
          key: "TYRE_STATUS_FRONT_RIGHT",
          value: "NORMAL",
        },
        {
          key: "PRIVACY_SWITCH",
          value: "FALSE",
        },
        {
          key: "TU_STATUS_EXT_POWER",
          value: "FUNCTIONING",
        },
        {
          key: "CLIMATE_STATUS_TIMER1_MINUTE",
          value: "0",
        },
        {
          key: "LATEST_COMPLETE_CONFIG_UPDATE",
          value: "2019-11-14T08:00:58+0000",
        },
        {
          key: "TU_STATUS_HANDSET",
          value: "UNCERTAIN",
        },
        {
          key: "BRAZIL_EVENT_MODE",
          value: "FALSE",
        },
        {
          key: "IS_CRASH_SITUATION",
          value: "FALSE",
        },
        {
          key: "DOOR_FRONT_RIGHT_LOCK_STATUS",
          value: "LOCKED",
        },
        {
          key: "TYRE_PRESSURE_REAR_RIGHT",
          value: "221",
        },
        {
          key: "TU_STATUS_CONFIG_VERSION",
          value: "16",
        },
        {
          key: "CLIMATE_STATUS_TIMER2_DAY",
          value: "0",
        },
        {
          key: "DOOR_FRONT_LEFT_LOCK_STATUS",
          value: "LOCKED",
        },
        {
          key: "WINDOW_REAR_LEFT_STATUS",
          value: "OPEN",
        },
        {
          key: "PAS_SEAT_FIRST_ROW_INHIBITION",
          value: "UNKNOWN",
        },
        {
          key: "DRV_SEAT_SECOND_ROW_STATUS",
          value: "UNKNOWN",
        },
        {
          key: "TU_STATUS_EXT_HANDSFREE",
          value: "BROKEN",
        },
        {
          key: "PAS_SEAT_FIRST_ROW_STATUS",
          value: "UNKNOWN",
        },
        {
          key: "CLIMATE_STATUS_FFH_REMAINING_RUNTIME",
          value: "0",
        },
        {
          key: "CLIMATE_STATUS_VENTING_TIME",
          value: "30",
        },
        {
          key: "TYRE_PRESSURE_FRONT_RIGHT",
          value: "249",
        },
        {
          key: "FUEL_LEVEL_PERC",
          value: "45",
        },
        {
          key: "CLIMATE_STATUS_TIMER2_MONTH",
          value: "0",
        },
        {
          key: "EXT_EXHAUST_FLUID_VOLUME_REFILL_LITRESX10",
          value: "80",
        },
        {
          key: "PAS_SEAT_THIRD_ROW_INHIBITION",
          value: "UNKNOWN",
        },
        {
          key: "EXT_EXHAUST_FLUID_WARN",
          value: "NORMAL",
        },
        {
          key: "DOOR_IS_BOOT_LOCKED",
          value: "TRUE",
        },
        {
          key: "TU_STATUS_SW_VERSION_SECONDARY",
          value: "J8A2-70712-BN",
        },
        {
          key: "DOOR_BOOT_POSITION",
          value: "CLOSED",
        },
        {
          key: "IS_HEAD_LIGHTS_ON",
          value: "UNKNOWN",
        },
        {
          key: "TU_STATUS_CRASH_INPUT",
          value: "FUNCTIONING",
        },
        {
          key: "SERVICE_MODE_STOP",
          value: "1970-01-01T00:00:00+0000",
        },
        {
          key: "TYRE_PRESSURE_FRONT_LEFT",
          value: "251",
        },
        {
          key: "CLIMATE_STATUS_TIMER2_MINUTE",
          value: "0",
        },
        {
          key: "IS_CAB_OPEN",
          value: "FALSE",
        },
        {
          key: "TU_STATUS_USES_EXTERNAL_GNSS",
          value: "FALSE",
        },
        {
          key: "ODOMETER_METER_RESOLUTION",
          value: "true",
        },
        {
          key: "TU_STATUS_GSM_EXT_ANTENNA",
          value: "FUNCTIONING",
        },
        {
          key: "CLIMATE_STATUS_TIMER2_HOUR",
          value: "0",
        },
        {
          key: "ARM_REST_SECOND_ROW_INHIBITION",
          value: "UNKNOWN",
        },
        {
          key: "ODOMETER_METER",
          value: "12209000",
        },
        {
          key: "BATTERY_VOLTAGE",
          value: "12.0",
        },
        {
          key: "TU_STATUS_SPEAKER",
          value: "FUNCTIONING",
        },
        {
          key: "TRANSPORT_MODE_STOP",
          value: "1970-01-01T00:00:00+0000",
        },
        {
          key: "ENGINE_BLOCK",
          value: "NORMAL_UNBLOCKED",
        },
        {
          key: "TYRE_PRESSURE_REAR_LEFT",
          value: "223",
        },
        {
          key: "CLIMATE_STATUS_TIMER_ACTIVATION_STATUS",
          value: "FALSE",
        },
        {
          key: "TU_STATUS_GNSS",
          value: "FUNCTIONING",
        },
        {
          key: "TU_STATUS_SW_VERSION_MAIN",
          value: "J9C3-70712-AN",
        },
        {
          key: "TU_STATUS_INT_POWER",
          value: "FUNCTIONING",
        },
        {
          key: "TU_STATUS_HW_VERSION",
          value: "J8A2-70719-CG",
        },
        {
          key: "PAS_SEAT_SECOND_ROW_INHIBITION",
          value: "UNKNOWN",
        },
        {
          key: "WINDOW_FRONT_LEFT_STATUS",
          value: "CLOSED",
        },
        {
          key: "DOOR_REAR_LEFT_POSITION",
          value: "CLOSED",
        },
        {
          key: "CLIMATE_STATUS_OPERATING_STATUS",
          value: "OFF",
        },
        {
          key: "CLIMATE_STATUS_TIMER1_HOUR",
          value: "0",
        },
        {
          key: "CLIMATE_STATUS_TIMER1_MONTH",
          value: "0",
        },
        {
          key: "EXT_PARTICULATE_FILTER_WARN",
          value: "CLEAR",
        },
        {
          key: "TU_STATUS_SERIAL_NUMBER",
          value: "803VIMU451603",
        },
        {
          key: "TYRE_STATUS_REAR_RIGHT",
          value: "NORMAL",
        },
        {
          key: "TU_ACTIVATION_STATUS",
          value: "PROVISIONED",
        },
        {
          key: "DRV_SEAT_SECOND_ROW_INHIBITION",
          value: "UNKNOWN",
        },
        {
          key: "DOOR_BOOT_LOCK_STATUS",
          value: "LOCKED",
        },
        {
          key: "TU_STATUS_CAN",
          value: "FUNCTIONING",
        },
      ],
      evStatus: [{
          key: "EV_IS_PLUGGED_IN",
          value: "UNKNOWN",
        },
        {
          key: "EV_IS_CHARGING",
          value: "UNKNOWN",
        },
        {
          key: "EV_IS_PRECONDITIONING",
          value: "UNKNOWN",
        },
        {
          key: "EV_CHARGE_TYPE",
          value: "UNKNOWN",
        },
      ],
    },
    // tslint:disable-next-line: object-literal-sort-keys
    vehicleAlerts: [{
        active: true,
        key: "WINDOW_OPEN",
        lastUpdatedTime: "2019-11-15T12:40:09+0000",
        value: "true",
      },
      {
        active: true,
        key: "ENGINE_ON",
        lastUpdatedTime: "2019-11-15T10:39:53+0000",
        value: "true",
      },
      {
        active: true,
        key: "FUEL_LEVEL_LTRS",
        lastUpdatedTime: "2018-04-18T08:51:40+0000",
        value: "8",
      },
      {
        active: true,
        key: "REMOTE_CLIMATE",
        lastUpdatedTime: "2019-11-14T08:01:02+0000",
        value: "true",
      },
    ],
    lastUpdatedTime: "2019-11-15T12:42:26+0000",
  });
}
