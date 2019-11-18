export interface IHeaders {
  [header: string]: string;
}

export type TCommand = "CONNECT" | "DISCONNECT" | "SUBSCRIBE" | "SEND" | "MESSAGE" | "ACK";

export interface IStompFrame {
  command: TCommand;
  headers: IHeaders;
  body?: any;
}

export class StompFrame {

  public static version = "1.2";

  /**
   * Creates a STOMP frame from JavaScript Object
   *
   * @static
   * @param {IStompFrame} obj the message in object form
   * @returns {string} the message frame
   * @memberof StompFrame
   */
  public static toFrame(obj: IStompFrame): string {
    let frame = obj.command + "\n";
    const headers: string[] = [];
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
  public static fromFrame(frame: string): IStompFrame {
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
        if (null !== parts) { resp.headers[parts[1]] = parts[2]; }
      }
      return resp as IStompFrame;
    } else {
      return;
    }
  }

}
