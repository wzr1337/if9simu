"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StompFrame {
    /**
     * Creates a STOMP frame from JavaScript Object
     *
     * @static
     * @param {IStompFrame} obj the message in object form
     * @returns {string} the message frame
     * @memberof StompFrame
     */
    static toFrame(obj) {
        let frame = obj.command + "\n";
        const headers = [];
        for (const key in obj.headers) {
            if (obj.headers.hasOwnProperty(key)) {
                const element = obj.headers[key];
                headers.push(key + ":" + element);
            }
        }
        if (obj.body && obj.body.length > 0) {
            headers.push("content-length:" + Buffer.byteLength(obj.body));
        }
        frame += headers.join("\n");
        frame += "\n\n";
        if (obj.body && obj.body.length > 0) {
            frame += obj.body;
        }
        frame += "\x00";
        return frame;
    }
    /**
     * Creates an object from STOMP message fram
     *
     * @static
     * @param {string} frame the input frame received via the socket
     * @returns {IStompFrame} the STOMP message as a javascript object
     * @memberof StompFrame
     */
    static fromFrame(frame) {
        const matches = frame.match(/^([A-Z]+)\n((?:(?:.+\:.+)\n)+)\n((?:.*\n?)+)?\0$/);
        if (null !== matches) {
            const resp = {
                body: matches[3] ? matches[3].replace(/\n$/, "") : undefined,
                command: matches[1],
                headers: {},
            };
            const headers = matches[2].split("\n");
            for (const header of headers) {
                const parts = header.match(/(.*)\:(.*)/);
                if (null !== parts) {
                    resp.headers[parts[1]] = parts[2];
                }
            }
            return resp;
        }
        else {
            return;
        }
    }
}
StompFrame.version = "1.2";
exports.StompFrame = StompFrame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvbXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvc3RvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQTtJQUlFOzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQWdCO1FBQ3BDLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQy9CLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUM3QixLQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDN0IsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbkMsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2FBQ25DO1NBQ0Y7UUFDRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMvRDtRQUNELEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLEtBQUssSUFBSSxNQUFNLENBQUM7UUFDaEIsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuQyxLQUFLLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQztTQUNuQjtRQUNELEtBQUssSUFBSSxNQUFNLENBQUM7UUFDaEIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBYTtRQUNuQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7UUFFaEYsSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxHQUFHO2dCQUNYLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO2dCQUM1RCxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLEVBQUU7YUFDWixDQUFDO1lBQ0YsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtnQkFDNUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDekMsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO29CQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUFFO2FBQzNEO1lBQ0QsT0FBTyxJQUFtQixDQUFDO1NBQzVCO2FBQU07WUFDTCxPQUFPO1NBQ1I7SUFDSCxDQUFDOztBQXpEYSxrQkFBTyxHQUFHLEtBQUssQ0FBQztBQUZoQyxnQ0E2REMifQ==