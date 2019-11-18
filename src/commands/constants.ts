let platform: "prod"|"preprod"|"iot" = "prod"; // default to prod

if ((typeof(process) !== "undefined")
    && process.env.IF9_ENV
    && (process.env.IF9_ENV.match(/^prod|preprod|iot$/) !== null)) {
  platform = process.env.IF9_ENV as "prod"|"preprod"|"iot";
}

const endpoints = {
  iot: {
    if9: "https://if9.iot-row.jlrmotor.com/if9", // iot
    ifas : "https://ifas.iot-row.jlrmotor.com/ifas",
    ifop : "https://ifop.iot-row.jlrmotor.com/ifop",
  },
  preprod: {
    if9:   "https://if9.preprod-row.jlrmotor.com/if9", // pre-prod
    ifas: "https://ifas.preprod-row.jlrmotor.com/ifas",
    ifop : "https://ifop.preprod-row.jlrmotor.com/ifop",
  },
  prod: {
    if9:  "https://if9.prod-row.jlrmotor.com/if9",
    ifas: "https://ifas.prod-row.jlrmotor.com/ifas",
    ifop : "https://ifop.prod-row.jlrmotor.com/ifop",
  },
};

export const IF9_BASEURI = endpoints[platform].if9;
export const IFAS_BASEURI = endpoints[platform].ifas;
export const IFOP_BASEURI = endpoints[platform].ifop;
