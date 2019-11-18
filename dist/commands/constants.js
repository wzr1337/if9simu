"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let platform = "prod"; // default to prod
if ((typeof (process) !== "undefined")
    && process.env.IF9_ENV
    && (process.env.IF9_ENV.match(/^prod|preprod|iot$/) !== null)) {
    platform = process.env.IF9_ENV;
}
const endpoints = {
    iot: {
        if9: "https://if9.iot-row.jlrmotor.com/if9",
        ifas: "https://ifas.iot-row.jlrmotor.com/ifas",
        ifop: "https://ifop.iot-row.jlrmotor.com/ifop",
    },
    preprod: {
        if9: "https://if9.preprod-row.jlrmotor.com/if9",
        ifas: "https://ifas.preprod-row.jlrmotor.com/ifas",
        ifop: "https://ifop.preprod-row.jlrmotor.com/ifop",
    },
    prod: {
        if9: "https://if9.prod-row.jlrmotor.com/if9",
        ifas: "https://ifas.prod-row.jlrmotor.com/ifas",
        ifop: "https://ifop.prod-row.jlrmotor.com/ifop",
    },
};
exports.IF9_BASEURI = endpoints[platform].if9;
exports.IFAS_BASEURI = endpoints[platform].ifas;
exports.IFOP_BASEURI = endpoints[platform].ifop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksUUFBUSxHQUEyQixNQUFNLENBQUMsQ0FBQyxrQkFBa0I7QUFFakUsSUFBSSxDQUFDLE9BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLENBQUM7T0FDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO09BQ25CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7SUFDakUsUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBaUMsQ0FBQztDQUMxRDtBQUVELE1BQU0sU0FBUyxHQUFHO0lBQ2hCLEdBQUcsRUFBRTtRQUNILEdBQUcsRUFBRSxzQ0FBc0M7UUFDM0MsSUFBSSxFQUFHLHdDQUF3QztRQUMvQyxJQUFJLEVBQUcsd0NBQXdDO0tBQ2hEO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsR0FBRyxFQUFJLDBDQUEwQztRQUNqRCxJQUFJLEVBQUUsNENBQTRDO1FBQ2xELElBQUksRUFBRyw0Q0FBNEM7S0FDcEQ7SUFDRCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUcsdUNBQXVDO1FBQzdDLElBQUksRUFBRSx5Q0FBeUM7UUFDL0MsSUFBSSxFQUFHLHlDQUF5QztLQUNqRDtDQUNGLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3RDLFFBQUEsWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDeEMsUUFBQSxZQUFZLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyJ9